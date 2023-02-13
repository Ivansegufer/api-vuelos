import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPasajero } from '../common/Interfaces/pasajero.interface';
import { PASAJERO } from '../common/models/models';
import { CrearPasajeroDTO } from './dto/CrearPasajeroDTO';

@Injectable()
export class PasajeroService {
  public constructor(
    @InjectModel(PASAJERO.name)
    private readonly pasajeroModel: Model<IPasajero>,
  ) {}
  public async getPasajeroByIdentification(identificacion: string) {
    const pasajeroFound = await this.pasajeroModel.findOne({ identificacion });
    if (!pasajeroFound)
      throw new NotFoundException(
        `Pasajero con identificacion ${identificacion} no existe`,
      );
    return pasajeroFound;
  }

  public async getPasajeroByNumeroPasaporte(numeroPasaporte: string) {
    const pasajeroFound = await this.pasajeroModel.findOne({
      numero_pasaporte: numeroPasaporte,
    });
    if (!pasajeroFound)
      throw new NotFoundException(
        `Pasajero con número de pasaporte ${numeroPasaporte} no existe`,
      );
    return pasajeroFound;
  }

  public async crearPasajero(pasajeroToCreate: CrearPasajeroDTO) {
    const pasajeroFound = await this.pasajeroModel.findOne({
      $or: [
        { email: pasajeroToCreate.email },
        { identificacion: pasajeroToCreate.identificacion },
        { numero_pasaporte: pasajeroToCreate.numero_pasaporte },
      ],
    });

    if (pasajeroFound) throw new BadRequestException('El pasajero ya existe');

    this.pasajeroModel.create({
      email: pasajeroToCreate.email,
      identificacion: pasajeroToCreate.identificacion,
      numero_pasaporte: pasajeroToCreate.numero_pasaporte,
      nombre: pasajeroToCreate.name,
    });
  }

  public async deleteByNumeroPasaporte(numeroPasaporte: string) {
    const pasajeroFound = await this.pasajeroModel.findOne({
      numero_pasaporte: numeroPasaporte,
    });

    if (!pasajeroFound) throw new NotFoundException('Pasajero no encontrado');

    await this.pasajeroModel.deleteOne({
      numero_pasaporte: numeroPasaporte,
    });
  }

  public getAll() {
    return this.pasajeroModel.find();
  }
}
