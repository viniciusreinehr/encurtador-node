import express from 'express';
import mongoose from 'mongoose';
import { Link, ILink } from '@model/link';

export default class RedirectController
{
    async Main(request: express.Request, response: express.Response)
    {
        try {
            await mongoose.connect(process.env.DB_STRING, {
                useNewUrlParser: true,
                useCreateIndex: true
            });

            const link: ILink = await Link.findOne({ token: request.params.token });

            if (!link) {
                throw new Error('URL não localizada!');
            }

            const expiration = link.expiration_date;
            const now = new Date();
            if (expiration.getTime() < now.getTime()) {
                throw new Error(`Data de expiração: ${expiration.toLocaleString()} e agora é ${now.toLocaleString()}`);
            }
            
            response.redirect(link.link);
        } catch (e) {
            response.status(404);
            response.json({
                'error': true,
                'message': e.message
            });
        }
    }
}