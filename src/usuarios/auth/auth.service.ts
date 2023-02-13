import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsuario } from '../../common/Interfaces/usuario.interface';
import { USUARIO } from '../../common/models/models';
import { UserLoginDTO, UserRegisterDTO } from '../dto/auth.dto';
import { comparePasswords, encryptPassword } from '../utils/password-manager';

@Injectable()
export class AuthService {
  public constructor(
    @InjectModel(USUARIO.name) private readonly usuarioModel: Model<IUsuario>,
    private readonly jwtAuthService: JwtService,
  ) {}

  public async login(
    userToLogin: UserLoginDTO,
  ): Promise<never | { success: true; token: string }> {
    const userFound = await this.usuarioModel.findOne({
      usuario: userToLogin.usuario,
    });

    if (!userFound) throw new NotFoundException('Usuario no encontrado');

    const success = await comparePasswords(
      userFound.password,
      userToLogin.password,
    );
    if (!success) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      usuario: userFound.usuario,
      email: userFound.email,
    };
    const token = await this.jwtAuthService.signAsync(payload);

    return {
      success: true,
      token: token,
    };
  }

  public async register(
    userToRegister: UserRegisterDTO,
  ): Promise<never | void> {
    const userFound = await this.usuarioModel.findOne({
      $or: [
        { email: userToRegister.email },
        { usuario: userToRegister.usuario },
      ],
    });

    if (userFound)
      throw new BadRequestException('El usuario o correo ya existen');

    const passwordEncrypted = await encryptPassword(userToRegister.password);

    await this.usuarioModel.create({
      ...userToRegister,
      password: passwordEncrypted,
      nombre: userToRegister.name,
    });
  }
}
