import LinkService from '../service/LinkService';
import express from 'express';
import shortid from 'shortid';

export default class ShortenerController
{
    constructor ( ) {
        shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ¹²');
    }

    Main(request: express.Request, response: express.Response)
    {
        try {
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