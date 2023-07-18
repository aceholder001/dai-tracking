import {
    Module
} from '@nestjs/common';
import {
    ConfigModule
} from '@nestjs/config';

import DatabaseModule from './database/database.module';
import TransferModule from './transfer/transfer.module';

import {
    AppController
} from './app.controller';
import {
    AppService
} from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        TransferModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}