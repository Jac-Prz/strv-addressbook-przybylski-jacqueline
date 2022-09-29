const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() });

describe("email is not in db", () => {
    test('should return 401', async () => {
        const response = await request(app).post('/auth')
            .send({
                email: "unregistered@email.com",
                pwd: "unregistered-email"
            })
            .expect(401);
    });
});

describe("correct credentials", () => {

    beforeEach(async () => {
        await request(app).post('/register').send({
            email: "authenticate.test@email.com",
            pwd: "auth1234"
        });
    });

    test('should respond with 200', async () => {
        const authResponse = await request(app).post('/auth')
            .send({
                email: "authenticate.test@email.com",
                pwd: "auth1234"
            })
            .expect(200);
    });

    test('should send an access token', async () => {
        const authResponse = await request(app).post('/auth')
            .send({
                email: "authenticate.test@email.com",
                pwd: "auth1234"
            });
        expect(authResponse.body.accessToken.length).toBeGreaterThan(100);
    });

    test('should save refresh token to db', async () => {
        const authResponse = await request(app).post('/auth')
            .send({
                email: "authenticate.test@email.com",
                pwd: "auth1234"
            });
        const user = await User.findOne({ email: "authenticate.test@email.com" });
        expect(user.refreshToken.length).toBeGreaterThan(100);
    });

    test('should save refresh token to db', async () => {
        const authResponse = await request(app).post('/auth')
            .send({
                email: "authenticate.test@email.com",
                pwd: "auth1234"
            });
        const user = await User.findOne({ email: "authenticate.test@email.com" });
        expect(user.refreshToken).toBeDefined();
    });
});

describe("invalid req data (email / pwd)", () => {

    test("no pwd - should send 400", async () => {
        const response = await request(app).post("/auth")
            .send({
                email: "test@test.com"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            });
    });

    test("no email - should send 400", async () => {
        const response = await request(app).post("/auth")
            .send({
                pwd: "123456"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            });
    });

    test("should send 400 if empty pwd", async () => {
        const response = await request(app).post("/auth")
            .send({
                email: "test@test.com",
                pwd: ""
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            });
    });

    test("should send 400 if empty email", async () => {
        const response = await request(app).post("/auth")
            .send({
                email: "",
                pwd: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            });
    });

    test("should send 400 if password instead of pwd", async () => {
        const response = await request(app).post("/auth")
            .send({
                email: "test@test.com",
                password: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            });
    });

});