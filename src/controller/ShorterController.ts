import express from 'express';
import shortid from 'shortid';
import { Link, ILink } from './../model/link';

export class ShorterController
{
    constructor ( ) {
        shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ¹²');
    }

    async Main(request: express.Request, response: express.Response)
    {
        const id = shortid.generate();
        const date = new Date();
        let expiration = new Date(date.getTime() + parseInt(process.env.EXPIRATION_DATE));

        const link: ILink = new Link({
            link: request.body.url,
            token: id,
            expiration_date: expiration
        });

        await link.save();

        response.json({
            newUrl: `${process.env.URL}${id}`
        });
    }
}