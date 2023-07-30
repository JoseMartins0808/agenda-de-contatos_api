import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactEmail } from './contactEmail.entity';
import { ContactPhone } from './contactPhone.entity';
import { User } from './user.entity';

@Entity('contacts')
export class Contact {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    full_name: string;

    @OneToMany(() => ContactEmail, email => email.contact, { onDelete: 'CASCADE' })
    emails: ContactEmail[];

    @OneToMany(() => ContactPhone, phone => phone.contact, { onDelete: 'CASCADE' })
    phones: ContactPhone[];

    @Column({ type: 'date' })
    registerDate: string | Date;

    @ManyToOne(() => User, user => user.contacts)
    user: User;

    @BeforeInsert()
    insertRegisterDate(): void {
        const today = new Date().toLocaleDateString();
        this.registerDate = today;
    };
};