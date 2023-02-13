import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { validationSchema } from './config/enviromentValidationSchema';
import { PasajeroModule } from './pasajeros/pasajero.module';
import { VueloModule } from './vuelos/vuelos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UsuariosModule,
    PasajeroModule,
    VueloModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
