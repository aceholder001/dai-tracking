import {
    BigNumber,
    ethers
} from 'ethers';
import abiDecoder from 'abi-decoder';

import {
    NestFactory
} from '@nestjs/core';
import {
    AppModule
} from './app.module';
import TransferController from './transfer/transfer.controller';

import IDAI from '../abi/IDAI.json';

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

abiDecoder.addABI(IDAI);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    const controller = app.get(TransferController);
    const eth_websocket = new ethers.providers.WebSocketProvider('wss://eth-mainnet.alchemyapi.io/v2/KUbE1HmK9so2l8ZTBzE2yoFWnay7aX34');

    eth_websocket.on('block', async (block) => {
        let i;

        const blockWithTxs = (await eth_websocket.getBlock(block)).transactions;

        for (i = 0; i < blockWithTxs.length; i++) {
            const txReceipt = await eth_websocket.getTransactionReceipt(blockWithTxs[i]);
            
            if (txReceipt.to === DAI) {
                const decoded = abiDecoder.decodeLogs(txReceipt.logs);

                const from = decoded[0].events[0].value;
                const to = decoded[0].events[1].value;
                const value = decoded[0].events[2].value;

                controller.createTransfer(from, to, value);
                console.log(`${from} ~ ${to} : ${value}`);
            }
        }
    });


    await app.listen(3000);
}
bootstrap();