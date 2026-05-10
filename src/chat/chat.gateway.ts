import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { content: string; sender: string; room: string }): Promise<void> {
    const message = new this.messageModel(payload);
    await message.save();
    this.server.to(payload.room).emit('message', message);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, room: string): Promise<void> {
    const messages = await this.messageModel.find({ room }).sort({ timestamp: 1 }).exec();
    client.emit('messages', messages);
  }
}
