import * as mongoose from 'mongoose';

export const PasajeroSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    identificacion: { type: String, required: true },
    numero_pasaporte: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

PasajeroSchema.index({ identificacion: 1 }, { unique: true });
PasajeroSchema.index({ numero_pasaporte: 1 }, { unique: true });
PasajeroSchema.index({ email: 1 }, { unique: true });
