import {
    Module
} from '@nestjs/common';
import {
    TypeOrmModule
} from '@nestjs/typeorm';

import Transfer from './transfer.entity';

import TransferController from './transfer.controller';
import TransferService from './transfer.service';


@Module({
    imports: [TypeOrmModule.forFeature([Transfer])],
    controllers: [TransferController],
    providers: [TransferService],
})
export default class TransferModule {}