import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import path from 'node:path';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { Contact } from './entities/contact.entity';
import { UserEmail } from './entities/userEmail.entity';
import { UserPhone } from './entities/userPhone.entity';
import { ContactEmail } from './entities/contactEmail.entity';
import { ContactPhone } from './entities/contactPhone.entity';

function DataSourceConfig(): DataSourceOptions {

    const entitiesPath: string = path.join(__dirname, 'entities/**.{js,ts}');
    const migrationsPath: string = path.join(__dirname, 'migrations/**.{js,ts}');

    if (!process.env.DATABASE_URL) throw new Error('Enviroment variable DATABASE_URL does not exists');

    return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
const userEmailRepository: Repository<UserEmail> = AppDataSource.getRepository(UserEmail);
const userPhoneRepository: Repository<UserPhone> = AppDataSource.getRepository(UserPhone);
const contactEmailRepository: Repository<ContactEmail> = AppDataSource.getRepository(ContactEmail);
const contactPhoneRepository: Repository<ContactPhone> = AppDataSource.getRepository(ContactPhone);

export {
    AppDataSource,
    userRepository, contactRepository, userEmailRepository,
    userPhoneRepository, contactEmailRepository, contactPhoneRepository
};