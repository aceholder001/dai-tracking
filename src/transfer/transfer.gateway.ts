import {
    Injectable,
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

@WebSocketGateway(80, {
    cors: {
        origin: '*',
    },
})
export default class TransferGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly transfersService: TransferService) {}

    private logger: Logger = new Logger('TransferGateway');

    @WebSocketServer() wss: Server;

    afterInit(server: Server) {
        console.log('afterInit');
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('connected');
        this.logger.log(`Client Connected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendTransfer(client: Socket, from: string, to: string, value: string): Promise < void > {
        const newMessage = await this.transfersService.getAllTransfers();
        this.wss.emit('receiveMessage', newMessage.map(message => `${message.from} ~ ${message.to} : ${message.value}`).join('\n'));
    }
}