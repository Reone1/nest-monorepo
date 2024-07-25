import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
