import { Document } from 'mongoose';

export interface IPasajero extends Document {
  nombre: string;
  identificacion: string;
  numero_pasaporte: string;
  email: string;
}
