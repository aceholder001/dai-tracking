import {
    Module
} from '@nestjs/common';
import {
    TypeOrmModule
} from '@nestjs/typeorm';

import Transfer from './transfer.entity';
import Blacklist from './blacklist.entity';

import TransferController from './transfer.controller';
import TransferService from './transfer.service';
import TransferGateway from './transfer.gateway';


@Module({
    imports: [
        TypeOrmModule.forFeature([Transfer]),
        TypeOrmModule.forFeature([Blacklist])
    ],
    controllers: [TransferController],
    providers: [
        TransferService,
        TransferGateway
    ],
})
export default class TransferModule {}