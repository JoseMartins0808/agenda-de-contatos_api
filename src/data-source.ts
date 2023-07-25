import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'node:path';
import 'dotenv/config';

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

// const userRepository
// const contactRepository
// const userEmailRepository
// const userPhoneRepository
// const contactEmailRepository
// const contactPhoneRepository


export {
    AppDataSource,
    // userRepository, contactRepository, userEmailRepository, 
    // userPhoneRepository, contactEmailRepository, contactPhoneRepository
};