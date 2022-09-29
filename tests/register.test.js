const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() });

describe('valid registration credentials', () => {

    test('should respond with 201', async () => {
        const response = await request(app).post('/register')
            .send({
                email: "random@email.com",
                pwd: "password"
            })
            .expect(201);
    });

    test('should send an access token', async () => {
        const response = await request(app).post('/register')
            .send({
                email: "random@email.com",
                pwd: "password"
            });
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.accessToken.length).toBeGreaterThan(100);
    });

    test('user password should be hashed', async () => {
        const response = await request(app).post('/register')
            .send({
                email: "random@email.com",
                pwd: "password"
            });
        const user = await User.findOne({ email: "random@email.com" });
        expect(user.password).not.toBe('password');
    });

    test('refresh token should be saved to db', async () => {
        const response = await request(app).post('/register')
            .send({
                email: "random@email.com",
                pwd: "password"
            });
        const user = await User.findOne({ email: "random@email.com" });
        expect(user.refreshToken).toBeDefined();
        expect(user.refreshToken.length).toBeGreaterThan(100);
    });

});

describe("email already exists in db", () => {

    test("should respond with 409", async () => {
        const firstReg = await request(app).post("/register")
            .send({
                email: "random@email.com",
                pwd: "password"
            });
        const duplicateEmail = await request(app).post("/register")
            .send({
                email: "random@email.com",
                pwd: "password"
            })
            .expect(409);
    });

});



describe("invalid req data (email / pwd)", () => {

    test("no pwd - should send 400", async () => {
        const response = await request(app).post("/register")
            .send({
                email: "test@test.com"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
    });

    test("no email - should send 400", async () => {
        const response = await request(app).post("/register")
            .send({
                pwd: "123456"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
    });

    test("should send 400 if empty pwd", async () => {
        const response = await request(app).post("/register")
            .send({
                email: "test@test.com",
                pwd: ""
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
    });

    test("should send 400 if empty email", async () => {
        const response = await request(app).post("/register")
            .send({
                email: "",
                pwd: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
    });

    test("should send 400 if password instead of pwd", async () => {
        const response = await request(app).post("/register")
            .send({
                email: "test@test.com",
                password: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
    });

});

