import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';


@Entity('user_phone')
export class UserPhone {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 11 })
    phone: string;

    @ManyToOne(() => User)
    user: User;
};