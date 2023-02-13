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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CrearPasajeroDTO } from './dto/CrearPasajeroDTO';
import { PasajeroService } from './pasajero.service';

@Controller('pasajero')
export class PasajeroController {
  public constructor(private service: PasajeroService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAll() {
    try {
      return await this.service.getAll();
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byIdentificacion/:identification')
  public async findPasajeroByIdentificacion(
    @Param('identification') identification: string,
  ) {
    try {
      return await this.service.getPasajeroByIdentification(identification);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byPasaporte/:numero_pasaporte')
  public async findPasajeroByNumeroPasaporte(
    @Param('numero_pasaporte') numeroPasaporte: string,
  ) {
    try {
      return await this.service.getPasajeroByNumeroPasaporte(numeroPasaporte);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPasajero(@Body() pasajero: CrearPasajeroDTO) {
    try {
      await this.service.crearPasajero(pasajero);
      return { success: true, message: 'Pasajero creado con éxito' };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':numero_pasaporte')
  public async deletePasajero(
    @Param('numero_pasaporte') numeroPasaporte: string,
  ) {
    try {
      await this.service.deleteByNumeroPasaporte(numeroPasaporte);
      return { success: true, message: 'Pasajero eliminado con éxito' };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}
