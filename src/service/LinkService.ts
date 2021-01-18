import { ILink, Link } from "@model/link";
import DatabaseService from "./DatabaseService";

export default class LinkService
{
    constructor(
        private db = new DatabaseService()
    ) { }

    async create(url, token)
    {
        try {
            if (!url)
                throw new Error('Request failed: Parameter `url` is required.');

            if (!token)
                throw new Error('Request failed: Parameter `token` is required.');

            const date = new Date();
            const expiration = new Date(date.getTime() + Number(process.env.EXPIRATION_TIME));

            this.db.connect();

            const link: ILink = new Link({
                link: url,
                token: token,
                expiration_date: expiration
            });

            await link.save();

            if (!link)
                throw new Error('Request fail: Link doesn`t can be save.');

            return `${link.token}`;
        } catch (e) {
            return null;
        }
    }

    async get(token)
    {
        if (!token)
            throw new Error('Request failed: Parameter `token` is required.');

        this.db.connect();

        const link: ILink = await Link.findOne({ token: token });

        if (!link)
            throw new Error('Request failed: Link not found.');

        const expiration = link.expiration_date;
        const now = new Date();
        if (expiration.getTime() < now.getTime()) {
            throw new Error(`Request failed: Expired link in: ${expiration.toLocaleString()}.`);
        }

        return link.link;
    }

    isUrl(url)
    {
        const pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(url);
    }
}