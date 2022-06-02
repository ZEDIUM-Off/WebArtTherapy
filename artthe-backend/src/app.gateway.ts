import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('qr-scanned')
  handleScanned(client: Socket, id: string): void {
    this.logger.log(`A qr-code as been scanned: ${id}`);
    this.server.emit('pc-reload', { PCID: id, telSocketID: client.id });
  }

  @SubscribeMessage('ready')
  handleReady(client: Socket): void {
    this.logger.log(`Client ready: ${client.id}`);
    client.emit('redirect', 'pc-client/run');
  }

  @SubscribeMessage('wait for peer')
  handlePeer(client: Socket, ids): void {
    this.logger.log(`Client waiting for peer: ${client.id}`);
    this.server.emit('signal peer', {
      PCID: ids.PCID,
      PEERID: ids.PEERID,
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('init');
  }
}
