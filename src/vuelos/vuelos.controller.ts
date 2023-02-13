import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CreateVueloDTO } from './dto/CreateVueloDTO';
import { VueloService } from './vuelos.service';

@Controller('vuelo')
export class VueloController {
  public constructor(private service: VueloService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAll() {
    try {
      return await this.service.getAll();
    } catch (err) {
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byNumero/:numero_vuelo')
  public async findVueloByNumero(
    @Param('numero_vuelo', ParseIntPipe) numeroVuelo: number,
  ) {
    try {
      return await this.service.getByNumero(numeroVuelo);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createVuelo(@Body() vuelo: CreateVueloDTO) {
    try {
      await this.service.crearVuelo(vuelo);
      return { success: true, message: 'Vuelo creado con éxito' };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':numero_vuelo')
  public async deleteVuelo(
    @Param('numero_vuelo', ParseIntPipe) numeroVuelo: number,
  ) {
    try {
      await this.service.deleteByNumero(numeroVuelo);
      return { success: true, message: 'Vuelo eliminado con éxito' };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
