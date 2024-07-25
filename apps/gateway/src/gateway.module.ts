import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: 'ITEM_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
