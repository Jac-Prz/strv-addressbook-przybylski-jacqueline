const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() })

test('should not be authorised if not registered', async () => {
    const response = await request(app).post('/auth')
        .send({
            email: "unregistered@email.com",
            pwd: "unregistered-email"
        })
        .expect(401)
})

test('should send 200 and access tokens if correct credentials', async () => {
    const regResponse = await request(app).post('/reg')
        .send({
            email: "authenticate.test@email.com",
            pwd: "auth1234"
        })
        .expect(201)
    const authResponse = await request(app).post('/auth')
        .send({
            email: "authenticate.test@email.com",
            pwd: "auth1234"
        })
        .expect(200)
        .expect((res) => {
            res.accessToken
        })
    const user = await User.findOne({email:"authenticate.test@email.com"})
        expect (user.refreshToken)
})


describe("issues with email / pwd", () => {
    test("if 400 when no pwd", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "testeroo@test.com"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
    test("if 400 when no email", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                pwd: "123456"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
    test("if 400 when empty pwd", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "testeroo@test.com",
                pwd: ""
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
    test("if 400 when empty email", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "",
                pwd: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
    test("if 400 when password instead of pwd", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "testeroo@test.com",
                password: "password"
            })
            .expect(400)
            .expect((res) => {
                res.body.message = 'Email and password are required.'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
});