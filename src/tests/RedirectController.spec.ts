import { Link } from '@model/link';

test('it should be ok', () => {
    const link = new Link();

    link.link = 'http://localhost/';

    expect(link.link).toEqual('http://localhost/');
})