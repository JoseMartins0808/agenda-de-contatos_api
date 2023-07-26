import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactEmail } from './contactEmail.entity';
import { ContactPhone } from './contactPhone.entity';

@Entity('contacts')
export class Contact {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    full_name: string;

    @OneToMany(() => ContactEmail, email => email.contact)
    emails: ContactEmail[];

    @OneToMany(() => ContactPhone, phone => phone.contact)
    phones: ContactPhone[];

    @Column({ type: 'date' })
    registerDate: string | Date;

    @BeforeInsert()
    insertRegisterDate(): void {
        const today = new Date().toLocaleDateString();
        this.registerDate = today;
    };
};