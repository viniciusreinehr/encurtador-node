import mongoose from 'mongoose';

export default class DatabaseService
{
    async connect()
    {
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    }
}