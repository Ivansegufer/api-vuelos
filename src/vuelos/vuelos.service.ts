import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVuelo } from 'src/common/Interfaces/vuelo.interface';
import { VUELO } from '../common/models/models';
import { CreateVueloDTO } from './dto/CreateVueloDTO';

@Injectable()
export class VueloService {
  public constructor(
    @InjectModel(VUELO.name)
    private readonly vueloModel: Model<IVuelo>,
  ) {}

  public async crearVuelo(vueloToCreate: CreateVueloDTO) {
    const vueloFound = await this.vueloModel.findOne({
      numero: vueloToCreate.numero,
    });

    if (vueloFound)
      throw new BadRequestException('El vuelo con ese número ya existe');

    this.vueloModel.create({
      nombre: vueloToCreate.name,
      numero: vueloToCreate.numero,
      destino: vueloToCreate.destino,
      horas_vuelo: vueloToCreate.horas_vuelo,
      fecha_salida: vueloToCreate.fecha_salida,
    });
  }

  public async deleteByNumero(numeroVuelo: number) {
    const vueloFound = await this.vueloModel.findOne({
      numero: numeroVuelo,
    });

    if (!vueloFound) throw new NotFoundException('Vuelo no encontrado');

    await this.vueloModel.deleteOne({
      numero: numeroVuelo,
    });
  }

  public async getByNumero(numeroVuelo: number) {
    const vueloFound = await this.vueloModel.findOne({
      numero: numeroVuelo,
    });

    if (!vueloFound) throw new NotFoundException('Vuelo no encontrado');

    return vueloFound;
  }

  public getAll() {
    return this.vueloModel.find();
  }
}
