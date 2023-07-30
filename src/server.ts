import { AppDataSource } from './data-source';
import { application } from './app';


AppDataSource.initialize()
    .then(() => {
        console.log('Database connected')
        const PORT: number = 3001
        application.listen(PORT, () => {
            console.log('Server is running at port: ' + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })
