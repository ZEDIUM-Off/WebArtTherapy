import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PcClientController } from './pc-client/pc-client.controller';
import { PhoneClientController } from './phone-client/phone-client.controller';
import { PhoneClientService } from './phone-client/phone-client.service';
import { PcClientService } from './pc-client/pc-client.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController, PcClientController, PhoneClientController],
  providers: [AppService, PhoneClientService, PcClientService, AppGateway],
})
export class AppModule {}
