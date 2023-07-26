import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';


@Entity('contact_phone')
export class ContactPhone {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 11 })
    phone: string;

    @ManyToOne(() => Contact)
    contact: Contact;
};