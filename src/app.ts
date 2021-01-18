import express from 'express';
import * as bodyParser from 'body-parser';

import ShortenerController from '@controller/ShortenerController';
import RedirectController from '@controller/RedirectController';
import IndexController from '@controller/IndexController';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/', (new IndexController()).Main);

app.get('/:token', (new RedirectController()).Main);

app.post('/encurtador', (new ShortenerController()).Main);

const porta = Number(process.env.PORT) || 8081;

app.listen(porta);