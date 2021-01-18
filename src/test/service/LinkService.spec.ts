import { Link } from "@model/link";
import LinkService from "@service/LinkService";
import mockingoose from 'mockingoose';

describe('link service success', () => {
    it('create a shortened link', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            link: 'http://wisereducacao.com',
            token: '123abc12',
            expiration_date: '2021-01-18T06:24:39.334+00:00',
            updated_at: '2021-01-17T20:17:59.351+00:00',
            created_at: '2021-01-17T20:17:59.351+00:00'
        };
    
        mockingoose(Link).toReturn(_doc, 'save');

        const linkToShort = 'http://wisereducacao.com';
        const service = new LinkService();

        await service.create(linkToShort, '123abc12').then(newLink => {
            expect(newLink).toEqual('123abc12');
        });
    });

    it('get a shortened link', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            link: 'http://wisereducacao.com',
            token: '123abc34',
            expiration_date: '2021-01-20T06:24:39.334+00:00',
            updated_at: '2021-01-17T20:17:59.351+00:00',
            created_at: '2021-01-17T20:17:59.351+00:00'
        };
    
        mockingoose(Link).toReturn(_doc, 'findOne');

        const token = '123abc34';
        const service = new LinkService();

        await service.get(token).then(response => {
            expect(response).toEqual('http://wisereducacao.com');
        });
    });
})

describe('link service failure', () => {
    it('create a shortened link without link', async () => {
        try {
            const linkToShort = null;
            const service = new LinkService();

            await service.create(linkToShort, 'a3sd1');

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Request failed: Parameter `url` is required.');
        }
    });

    it('create a shortened link without token', async () => {
        try {
            const linkToShort = 'http://wisereducacao.com';
            const service = new LinkService();

            await service.create(linkToShort, null);

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Request failed: Parameter `token` is required.');
        }
    });

    it('get a link without token', async () => {
        try {
            const service = new LinkService();

            await service.get(null);

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Request failed: Parameter `token` is required.');
        }
    });

    it('get an expired link', async () => {
        try {
            const _doc = {
                _id: '507f191e810c19729de860ea',
                link: 'http://wisereducacao.com',
                token: '123abc34',
                expiration_date: '2021-01-18T06:24:39.334+00:00',
                updated_at: '2021-01-17T20:17:59.351+00:00',
                created_at: '2021-01-17T20:17:59.351+00:00'
            };
        
            mockingoose(Link).toReturn(_doc, 'findOne');

            const token = '123abc34';
            const service = new LinkService();

            await service.get(token);

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Request failed: Expired link in: 2021-1-18 3:24:39.');
        }
    });

    it('get a non-existent link', async () => {
        try {
            const _doc = null;
        
            mockingoose(Link).toReturn(_doc, 'findOne');

            const token = 'asd231';
            const service = new LinkService();

            await service.get(token);

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('Request failed: Link not found.');
        }
    });
})