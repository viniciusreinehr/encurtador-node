import express from 'express';
import { Link, ILink } from './../model/link';

export class RedirectController
{
    async Main(request: express.Request, response: express.Response)
    {
        {
            try {
                const link: ILink = await Link.findOne({ token: request.params.token });
        
                if (!link) {
                    throw 'URL não localizada!';
                }
        
                const expiration = link.expiration_date;
                const now = new Date();
                if (expiration.getTime() < now.getTime()) {
                    throw `Data de expiração: ${expiration.toLocaleString()} e agora é ${now.toLocaleString()}`;
                }
        
                response.redirect(link.link);
            } catch (e) {
                response.status(404);
                response.send(e);
            }
        }
    }
}