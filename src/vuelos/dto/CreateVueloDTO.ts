import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVueloDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  readonly numero: number;
  @IsNumber()
  readonly horas_vuelo: number;
  @IsString()
  @IsNotEmpty()
  readonly destino: string;
  @IsString()
  @IsDateString()
  readonly fecha_salida: string;
}
