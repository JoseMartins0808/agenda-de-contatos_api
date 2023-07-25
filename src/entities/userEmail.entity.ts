import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_email')
export class UserEmail {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @ManyToOne(() => User)
    user: User;
};