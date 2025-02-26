import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyRespnseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const myRespnseObj: MyRespnseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myRespnseObj.statusCode = exception.getStatus();
      myRespnseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myRespnseObj.statusCode = 200;
      myRespnseObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      myRespnseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myRespnseObj.response = 'Internal Server Error';
    }
    response.status(myRespnseObj.statusCode).json(myRespnseObj);

    this.logger.error(myRespnseObj.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
