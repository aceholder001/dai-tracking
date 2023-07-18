import {
    Body,
    Controller,
    Get,
    Param,
    Post
} from '@nestjs/common';

import Message from './transfer.entity';
import TransferService from './transfer.service';

@Controller('transfers')
export default class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Get()
    async getAllTransfers(): Promise < Message[] > {
        const transfers = await this.transferService.getAllTransfers();
        return transfers;
    }

    @Get(':id')
    async getTransferById(@Param('id') id: string): Promise < Message > {
        const transfer = await this.transferService.getTransferById(Number(id));
        return transfer;
    }

    @Post()
    async createTransfer(@Body('from') from: string, @Body('to') to: string, @Body('value') value: string): Promise < Message > {
        const transfer = await this.transferService.createTransfer(from, to, value);
        return transfer;
    }
}