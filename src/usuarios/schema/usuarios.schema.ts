import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    usuario: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UsuarioSchema.index({ usuario: 1 }, { unique: true });
UsuarioSchema.index({ email: 1 }, { unique: true });
