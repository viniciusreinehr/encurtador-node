import mongoose from 'mongoose';

export default class DatabaseService
{
    async connect()
    {
        try {
            await mongoose.connect(process.env.DB_STRING, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
        } catch (e) {
            throw new Error(e.message);
        }
    }
}