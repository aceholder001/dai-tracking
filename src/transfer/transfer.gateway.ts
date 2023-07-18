import {
    Logger
} from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {
    Server,
    Socket
} from 'socket.io';
import TransferService from './transfer.service';

@WebSocketGateway({
    cors: true
})
export class TransferGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly transfersService: TransferService) {}

    private logger: Logger = new Logger('TransferGateway');

    @WebSocketServer() wss: Server;

    afterInit(server: Server) {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendTransfer(client: Socket, from: string, to: string, value: string): Promise < void > {
        const newMessage = await this.transfersService.createTransfer(from, to, value);
        this.wss.emit('receiveMessage', newMessage);
    }
}