const app = require('../server');
const request = require('supertest');

//integration tests for reg route

// 400 if missing email or password
// 401 if user doesnt exist
// if correct user: auth token sent, refresh token sent 


describe("send err if username or password is not recieved", () => {
    test("no pwd", (done) => {
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
    test("no email", (done) => {
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
    test("empty pwd", (done) => {
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
    test("empty email", (done) => {
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
    test("password instead of pwd", (done) => {
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

describe("email doesnt exist", () => {
    test("email doesnt exist", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "unregistered@email.com", 
                pwd: "unregistered-email"
            })
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
})

describe("normal request", () => {
    test("200 status code, cookie and access token sent", (done) => {
        request(app)
            .post("/auth")
            .expect("Content-Type", /json/)
            .send({
                email: "existing@email.com", 
                pwd: "existing-email"
            })
            .expect(200)
            .expect((res) => {
                res.accessToken && res.cookie
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
});