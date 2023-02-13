import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  encryptedPassword: string,
  passwordToCompare: string,
) => {
  return await bcrypt.compare(passwordToCompare, encryptedPassword);
};
