
import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {

    test('should return env options', ()=> {


        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'juanbetancourt0013@gmail.com',
            MAILER_SECRET_KEY: 'pvup sofa rnqm wphm',
            PROD: false,
            MONGO_URL: 'mongodb://juan:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'juan',
            MONGO_PASS: '123456789'
        });


    });


    test('should return error if not found env', async() => {
    
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    
    })

})