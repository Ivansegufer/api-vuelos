import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USUARIO } from '../common/models/models';
import { UsuarioSchema } from './schema/usuarios.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USUARIO.name,
        useFactory: () => {
          return UsuarioSchema;
        },
      },
    ]),
    JwtModule.register({
      secret: 'vuelossecret', // TODO: Configurarlo en variable de entorno
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [UsuariosController, AuthController],
  providers: [UsuariosService, AuthService, JwtStrategy],
})
export class UsuariosModule {}
