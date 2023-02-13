import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class UserAuth {
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  readonly usuario: string;
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly password: string;
}

export class UserLoginDTO extends UserAuth {}

export class UserRegisterDTO extends UserAuth {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsEmail()
  readonly email: string;
}
