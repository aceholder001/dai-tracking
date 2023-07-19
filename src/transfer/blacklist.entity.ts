import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Blacklist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;
};