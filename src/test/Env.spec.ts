describe('env', () => {
    it('is expiration time defined', () => {
        expect(process.env.EXPIRATION_TIME).toBeDefined();
    });

    it('is database string defined', () => {
        expect(process.env.DB_STRING).toBeDefined();
    });
    
    it('is URL defined', () => {
        expect(process.env.URL).toBeDefined();
    });
    
    it('is PORT defined', () => {
        expect(process.env.PORT).toBeDefined();
    });
})