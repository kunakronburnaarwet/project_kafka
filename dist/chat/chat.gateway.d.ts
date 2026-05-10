import { Server, Socket } from 'socket.io';
import { Model } from 'mongoose';
import { MessageDocument } from './message.schema';
export declare class ChatGateway {
    private messageModel;
    server: Server;
    constructor(messageModel: Model<MessageDocument>);
    handleJoinRoom(client: Socket, room: string): void;
    handleMessage(client: Socket, payload: {
        content: string;
        sender: string;
        room: string;
    }): Promise<void>;
    handleGetMessages(client: Socket, room: string): Promise<void>;
}
