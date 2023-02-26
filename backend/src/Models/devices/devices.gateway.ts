import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IData, Device } from './entities/device.entity';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//     transports: ['polling', 'websocket'],
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Content-Type, Accept',
//   },
//   allowEIO3: true,
// })
@WebSocketGateway({ cors: '*' })
export class DevicesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('DevicesGateway');

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client disconnected: ${client.id}`);
    client.emit('connection', 'Successfully connected to WebSocket server!');
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('new_device')
  async newDevice(data: any) {
    console.log(data);
    this.server.emit('new_device', data);
  }

  @SubscribeMessage('device_data_update')
  async deviceDataUpdate(id: string, data: any) {
    this.server.emit('device_data_update', {
      id,
      data,
    });
  }
}
