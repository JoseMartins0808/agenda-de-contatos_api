import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEmail } from './userEmail.entity';
import { UserPhone } from './userPhone.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    full_name: string;

    @Column({ type: 'varchar', length: 60, unique: true })
    username: string;

    @OneToMany(() => UserEmail, email => email.user)
    emails: UserEmail[];

    @OneToMany(() => UserPhone, phone => phone.user)
    phones: UserPhone[];

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @Column({ type: 'date' })
    registerDate: string | Date;

    @BeforeInsert()
    insertRegisterDate(): void {
        const today = new Date().toLocaleDateString();
        this.registerDate = today;
    };
};