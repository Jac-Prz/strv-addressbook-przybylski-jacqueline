const app = require('../server');
const request = require('supertest');

// there are no cookies in db

describe("not logged in", () => {
    test("no cookies found", (done) => {
        request(app)
            .get("/logout")
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    });
});

describe("normal request", () => {
    test("cookies were cleared", (done) => {
        request(app)
            .get("/logout")
            .send(
                req.cookies.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4aXN0aW5nQGVtYWlsLmNvbSIsImlhdCI6MTY2NDQzNjg1NywiZXhwIjoxNjY0NTIzMjU3fQ.LDRZkludX9b_lDnjtT3GI6bdIJBDvyCxB1JPBSt0Q5c'
            )
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});

