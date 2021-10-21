const axios = require('axios');
const fs = require('fs');

/**
 * Consultar os dados dos estados e criar um json para importação no mongodb.
 *
 * Ref: https://servicodados.ibge.gov.br/api/docs/localidades
 *
 * @returns {Promise<void>}
 */
const start = async () => {
  const states = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  );

  const result = [];

  for (const state of states.data) {
    console.log(`processing ${state.sigla}`);
    const cities = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/municipios`,
    );

    const tmpState = {
      code: state.sigla,
      name: state.nome,
      cities: [],
    };

    for (const city of cities.data) {
      tmpState.cities.push({
        ibge: city.id,
        name: city.nome,
      });
    }

    result.push(tmpState);
  }

  const json = JSON.stringify(result);
  fs.writeFile('states_cities.json', json, 'utf8', () => {
    console.log('done!');
  });
};

start();

// const statesRaw = fs.readFileSync('./states_cities.json', {
//   encoding: 'utf8',
// });
// const states = JSON.parse(statesRaw);
//
// console.log(states);
