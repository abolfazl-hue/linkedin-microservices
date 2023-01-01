import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const rmqService = app.get(RmqService)
  app.connectMicroservice(rmqService.getOptions('EMAIL'))

  const configService = app.get(ConfigService)
  await app.startAllMicroservices()
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
