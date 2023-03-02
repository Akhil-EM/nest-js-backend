import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Module({})
export class EncryptionHelperModule {
  generateJwtToken(data: object, time = '') {
    if (time)
      return new JwtService({ privateKey: process.env.JWT_SECRET }).sign(data, {
        expiresIn: time,
      });

    return new JwtService({ privateKey: process.env.JWT_SECRET }).sign(data);
  }

  verifyJwtToken(token: string) {
    return new JwtService({ privateKey: process.env.JWT_SECRET }).verify(token);
  }

  async generatePasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  comparePassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }
}

export const encryptionHelper = new EncryptionHelperModule();
