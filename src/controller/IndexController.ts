import express from 'express';

export default class IndexController
{
    Main(request: express.Request, response: express.Response)
    {
        response.send("Encurtador de URL");
    }
}