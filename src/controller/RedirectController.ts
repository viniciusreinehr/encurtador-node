import LinkService from '@service/LinkService';
import express from 'express';
export default class RedirectController
{
    Main(request: express.Request, response: express.Response)
    {
        try {
            const service = new LinkService();
            service.get(request.params.token).then(res => response.redirect(res));
        } catch (e) {
            response.status(500);
            response.json({
                'error': true,
                'message': e.message
            });
        }
    }
}