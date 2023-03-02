import { Controller, Get, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ResponseModel } from './common/models/api.model';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

@Controller()
//@UseInterceptors(new TransformInterceptor()) //file wise interceptors
export class AppController {
  @Get()
  getHello() {
    return ResponseModel('server up and running.');
  }
}
