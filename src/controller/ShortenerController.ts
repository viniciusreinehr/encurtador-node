import express from 'express';
import shortid from 'shortid';
import LinkService from '@service/LinkService';

export default class ShortenerController
{
    constructor ( ) {
        shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ¹²');
    }

    Main(request: express.Request, response: express.Response)
    {
        try {
            if (!request.body.url) {
                throw new Error('É obrigatório o preenchimento da URL.');
            }

            const service = new LinkService();
            service.create(request.body.url, shortid.generate()).then(newLink => {
                response.status(200);
                response.json({
                    newUrl: `${process.env.URL}${newLink}`
                });
            });
        } catch (e) {
            response.status(500);
            response.json({
                'error': true,
                'message': e.message
            });
        }
    }
}