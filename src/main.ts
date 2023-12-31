import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ExpressAdapter} from "@nestjs/platform-express";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new Logger()});
  await app.listen(3000);
}
bootstrap();