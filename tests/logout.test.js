const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

beforeEach(async () => {
    register = await request(app).post('/register')
        .send({
            email: "logout.test@email.com",
            pwd: "logout1234"
        });
});

afterEach(async () => { await User.deleteMany() });

describe("no cookies in the logout request", () => {
    test("should respond with 204", async () => {
        const response = request(app).get("/logout")
            .expect(204)
    });
});

describe("logout and remove refresh tokens", () => {
    test("should clear refresh token from db", async () => {
        const user = await User.findOne({ email: "logout.test@email.com" });
        const logoutResponse = await request(app).get("/logout")
            .set('Cookie', `jwt=${user.refreshToken}`)
            .set('Content-Type', `application/json`)
            .expect(204);
        const userAfterLogout = await User.findOne({ email: "logout.test@email.com" });
        expect(userAfterLogout.refreshToken).toHaveLength(0);
    });
});

