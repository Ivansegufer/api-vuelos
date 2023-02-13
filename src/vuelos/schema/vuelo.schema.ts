import * as mongoose from 'mongoose';

export const VueloSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    numero: { type: Number, required: true },
    destino: { type: String, required: true },
    horas_vuelo: { type: Number, required: true },
    fecha_salida: { type: Date, required: true },
  },
  { timestamps: true },
);

VueloSchema.index({ numero: 1 }, { unique: true });
