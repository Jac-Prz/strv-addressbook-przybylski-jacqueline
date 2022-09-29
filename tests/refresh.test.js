const request = require('supertest');
const app = require('../server');
const User = require('../model/User');

//if testing locally, remove secure:true from cookies (authController, logoutController, registerController)

beforeEach(async () => {
    await request(app).post('/register')
        .send({
            email: "refresh.test@email.com",
            pwd: "refresh1234"
        });
});

afterEach(async () => { await User.deleteMany() });

describe("user is registered and refresh token is recieved in get request to /refresh", () => {

    test('should respond with 200', async () => {
        const user = await User.findOne({ email: "refresh.test@email.com" })
        expect(user.refreshToken)
        const refreshResponse = await request(app).get('/refresh')
            .set('Cookie', `jwt=${user.refreshToken}`)
            .set('Content-Type', `application/json`)
            .expect(200);
    });

    test('should send a new access token', async () => {
        const user = await User.findOne({ email: "refresh.test@email.com" });
        expect(user.refreshToken);
        const refreshResponse = await request(app).get('/refresh')
            .set('Cookie', `jwt=${user.refreshToken}`)
            .set('Content-Type', `application/json`);
        expect(refreshResponse.body.accessToken).toBeDefined();
        expect(refreshResponse.body.accessToken.length).toBeGreaterThan(100);
    });

});

describe("no refresh token is recieved in get request to /refresh", () => {

    test('should respond with 401', async () => {
        const user = await User.findOne({ email: "refresh.test@email.com" });
        const refreshResponse = await request(app).get('/refresh')
            .expect(401);
    });

    test('should not send accessToken', async () => {
        const user = await User.findOne({ email: "refresh.test@email.com" });
        const refreshResponse = await request(app).get('/refresh');
        expect(refreshResponse.body.accessToken).toBeUndefined();
    });

});

