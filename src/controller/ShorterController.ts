import express from 'express';
import shortid from 'shortid';
import { Link, ILink } from '@model/link';

export default class ShorterController
{
    constructor ( ) {
        shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ¹²');
    }

    async Main(request: express.Request, response: express.Response)
    {
        try {
            const id = shortid.generate();
            const date = new Date();
            const expiration = new Date(date.getTime() + Number(process.env.EXPIRATION_DATE));

            const link: ILink = new Link({
                link: request.body.url,
                token: id,
                expiration_date: expiration
            });

            await link.save();

            if (!link) {
                throw new Error('Não foi possivel salvar as informações!');
            }

            response.status(200);
            response.json({
                newUrl: `${process.env.URL}${id}`
            });
        } catch (e) {
            response.status(404);
            response.json({
                'error': true,
                'message': e.message
            });
        }
    }
}