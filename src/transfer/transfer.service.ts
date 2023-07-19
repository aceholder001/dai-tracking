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
import Blacklist from './blacklist.entity';

export default class TransferService {
    constructor(
        @InjectRepository(Transfer) private transferRepository: Repository < Transfer > ,
        @InjectRepository(Blacklist) private blacklistRepository: Repository < Blacklist >
    ) {}

    async getBlacklist() {
        const list = await this.blacklistRepository.find();
        return list;
    }

    async getAllTransfers() {
        const list = await this.blacklistRepository.find();
        const transfers = await this.transferRepository.find();

        return transfers.filter(transfer => list.find(item => String(item.address) === String(transfer.from)) === undefined);
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

    async createBlacklist(address: string) {
        const newBlacklist = await this.blacklistRepository.create({
            address: address
        });

        await this.blacklistRepository.save(newBlacklist);
        return newBlacklist;
    }
}