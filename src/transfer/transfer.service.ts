import {
    NotFoundException
} from '@nestjs/common';
import {
    InjectRepository
} from '@nestjs/typeorm';

import {
    Repository
} from 'typeorm';

import Transfer from './transfer.entity';

export default class TransferService {
    constructor(
        @InjectRepository(Transfer) private transferRepository: Repository < Transfer > ,
    ) {}

    async getAllTransfers() {
        const transfers = await this.transferRepository.find();
        return transfers;
    }

    async getTransferById(id: number) {
        const transfer = await this.transferRepository.findOne({
            where: {
                id: id,
            },
        });
        if (transfer) {
            return transfer;
        }
        throw new NotFoundException('Could not find the transfer');
    }

    async createTransfer(from: string, to: string, value: string) {
        const newTransfer = await this.transferRepository.create({
            from: from,
            to: to,
            value: value,
            timestamp: new Date()
        });

        await this.transferRepository.save(newTransfer);
        return newTransfer;
    }
}