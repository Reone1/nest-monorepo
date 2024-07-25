import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ItemModule } from './item.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ItemModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  );
  await app.listen();
}
bootstrap();
