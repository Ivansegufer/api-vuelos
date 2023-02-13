import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VUELO } from '../common/models/models';
import { VueloSchema } from './schema/vuelo.schema';
import { VueloController } from './vuelos.controller';
import { VueloService } from './vuelos.service';

@Module({
  controllers: [VueloController],
  providers: [VueloService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VUELO.name,
        useFactory: () => {
          return VueloSchema;
        },
      },
    ]),
  ],
})
export class VueloModule {}
