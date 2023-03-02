import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resources/users/users.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import { EncryptionHelperModule } from './common/helpers/encryption-helper.module';
import { SendMailModule } from './common/helpers/send-mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    EncryptionHelperModule,
    SendMailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
