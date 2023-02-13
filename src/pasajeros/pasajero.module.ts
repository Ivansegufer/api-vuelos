import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PASAJERO } from '../common/models/models';
import { PasajeroController } from './pasajero.controller';
import { PasajeroService } from './pasajero.service';
import { PasajeroSchema } from './schema/pasajero.schema';

@Module({
  controllers: [PasajeroController],
  providers: [PasajeroService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASAJERO.name,
        useFactory: () => {
          return PasajeroSchema;
        },
      },
    ]),
  ],
})
export class PasajeroModule {}
