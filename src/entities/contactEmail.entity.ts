import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_email')
export class ContactEmail {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @ManyToOne(() => Contact, { onDelete: 'CASCADE' })
    contact?: Contact;
};