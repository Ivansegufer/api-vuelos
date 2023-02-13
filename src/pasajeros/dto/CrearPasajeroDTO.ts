import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CrearPasajeroDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  @Length(10)
  readonly identificacion: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(9)
  @Length(9)
  readonly numero_pasaporte: string;
  @IsString()
  @IsEmail()
  readonly email: string;
}
