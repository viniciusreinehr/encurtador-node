import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AddressInfo } from 'net'
import ShorterController from '@controller/ShorterController';
import RedirectController from '@controller/RedirectController';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/:token', (new RedirectController()).Main);

app.post('/encurtador', (new ShorterController()).Main);

const porta = Number(process.env.PORT) || 8081;
const server = app.listen(porta, '127.0.0.1', () => {
    const {port, address} = server.address() as AddressInfo;
    console.log(`Server listening on: http://${address}:${port}`);
});