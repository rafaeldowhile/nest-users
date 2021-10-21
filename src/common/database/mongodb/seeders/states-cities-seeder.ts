import { Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { State } from '../../../../models/state';
import { City } from '../../../../models/city';
import * as fs from 'fs';

@Injectable()
export default class StatesCitiesSeeder implements Seeder {
  constructor(
    @InjectModel(State.name) private readonly state: Model<State>,
    @InjectModel(City.name) private readonly city: Model<City>,
  ) {}

  async drop(): Promise<any> {
    await this.state.deleteMany({});
    await this.city.deleteMany({});
  }

  async seed(): Promise<any> {
    const statesRaw = fs.readFileSync('./states_cities.json', {
      encoding: 'utf8',
    });

    const states = JSON.parse(statesRaw);

    for (const state of states) {
      let existingState = await this.state.findOne({ code: state.code }).exec();

      if (!existingState) {
        existingState = new this.state({
          name: state.name,
          code: state.code,
        });
        await existingState.save();
        console.log(`state saved ${existingState.name}`);
      }

      for (const city of state.cities) {
        const newCity = new this.city({
          name: city.name,
          ibgeCode: city.ibge,
          state: existingState._id,
        });
        newCity.save();
        console.log(`saved city ${newCity.name}`);
      }
    }
  }
}
