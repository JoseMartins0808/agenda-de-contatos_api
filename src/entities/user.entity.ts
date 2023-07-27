import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEmail } from './userEmail.entity';
import { UserPhone } from './userPhone.entity';
import { getRounds, hashSync } from 'bcryptjs';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120 })
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

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'date' })
    registerDate: string | Date;

    @Column({ type: 'date', nullable: true })
    deletedAt: string | Date;

    @BeforeInsert()
    insertRegisterDate(): void {
        const today = new Date().toLocaleDateString();
        this.registerDate = today;
    };

    @BeforeInsert()
    @BeforeUpdate()
    encryptPassword(): void {
        const isEncrypted: number | null = getRounds(this.password);

        if (!isEncrypted) {
            this.password = hashSync(this.password, 8);
        };
    };
};