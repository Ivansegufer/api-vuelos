import { ValidationPipe } from '@nestjs/common';

const globalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});

export default [globalValidationPipe];
