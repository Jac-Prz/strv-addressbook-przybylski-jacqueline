const app = require('../server');
const request = require('supertest');

//integration tests for auth route.

describe("send err if username or password is not recieved", () => {
    test("no pwd", (done) => {
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
    test("no email", (done) => {
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
    test("empty pwd", (done) => {
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
    test("empty email", (done) => {
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
    test("password instead of pwd", (done) => {
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

describe("normal request", () => {
    test("201 status code, cookie and access token sent", (done) => {
        request(app)
            .post("/reg")
            .expect("Content-Type", /json/)
            .send({
                email: "random@email.com", 
                pwd: "random-email"
            })
            .expect(201)
            .expect((res) => {
                res.accessToken && res.cookie
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
});

describe("duplicate emails", () => {
    test("email already exists", (done) => {
        request(app)
            .post("/reg")
            .expect("Content-Type", /json/)
            .send({
                email: "random@email.com", 
                pwd: "random-email"
            })
            .expect(409)
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
    test("delete duplicate", (done) => {
        request(app)
        .delete('/deleteUser')
        .send({email: "random@email.com" })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            return done()
        })
    })
})