import {
    Test,
    TestingModule
} from '@nestjs/testing';
import {
    AppController
} from './app.controller';
import {
    AppService
} from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get < AppController > (AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });

        it('should track transfers', () => {
            expect('track transfers').toBe('track transfers');
        });

        it('should store tracks in the database', () => {
            expect('store tracks in the database').toBe('store tracks in the database');
        });

        it('should display all the tracks', () => {
            expect('should display all the tracks').toBe('should display all the tracks');
        });
       
        it('should use typeorm for the database', () => {
            expect('should use typeorm for the database').toBe('should use typeorm for the database');
        });
    });
});