import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UserLoginDTO, UserRegisterDTO } from '../dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  public constructor(
    //private readonly service: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  public async loginUser(@Body() user: UserLoginDTO) {
    try {
      return await this.authService.login(user);
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Post('register')
  public async create(@Body() user: UserRegisterDTO) {
    try {
      await this.authService.register(user);
      return { success: true, message: 'Usuario creado con éxito' };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
