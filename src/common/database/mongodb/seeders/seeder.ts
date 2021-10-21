import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../../../models';
import CountrySeeder from './country-seeder';
import StatesCitiesSeeder from './states-cities-seeder';
import { MONGO_URL } from '../../../../config/environments';

seeder({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    MongooseModule.forFeature(allModels),
  ],
}).run([StatesCitiesSeeder]);
