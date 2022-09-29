const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach( async() => { await User.deleteMany() } )

test('should sign up a new user with 201', async () => {
    const response = await request(app).post('/reg')
        .send({
            email: "random@email.com",
            pwd: "password"
        })
        .expect(201)
        .expect((res) => {
            res.accesstoken
        })
        const user = await User.findOne({email:"random@email.com"})
        expect (user.password).not.toBe('password')
        expect (user.refreshToken)
})

test("should send 409 when email already exists", async () => {
    const firstRequest = await request(app).post("/reg")
        .send({
            email: "random@email.com",
            pwd: "password"
        })
        .expect(201)
    const secondRequest = await request(app).post("/reg")   
        .send({
            email: "random@email.com",
            pwd: "password"
        })
        .expect(409)
});


describe("invalid req data (email / pwd)", () => {
    test("should send 400 if no pwd", (done) => {
        request(app)
            .post("/reg")
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
    test("should send 400 if no email", (done) => {
        request(app)
            .post("/reg")
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
    test("should send 400 if empty pwd", (done) => {
        request(app)
            .post("/reg")
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
    test("should send 400 if empty email", (done) => {
        request(app)
            .post("/reg")
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
    test("should send 400 if password instead of pwd", (done) => {
        request(app)
            .post("/reg")
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

