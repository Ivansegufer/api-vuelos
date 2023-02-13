import { Document } from 'mongoose';

export interface IVuelo extends Document {
  nombre: string;
  numero: number;
  destino: string;
  horas_vuelo: number;
  fecha_salida: string;
}
