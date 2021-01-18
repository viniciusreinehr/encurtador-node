import mongoose from 'mongoose';

export default class DatabaseService
{
    connect()
    {
        mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }
}