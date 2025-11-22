import request from 'supertest';
import app from '../src/index';

describe('GET /ping', () => {
    it('responds with json message "pong"', async () => {
        const response = await request(app).get('/ping');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'pong' });
    });
});
