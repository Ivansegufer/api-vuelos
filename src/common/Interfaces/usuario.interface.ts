import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  usuario: string;
  email: string;
  password: string;
}
