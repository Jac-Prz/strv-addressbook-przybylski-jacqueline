const app = require('../server');
const request = require('supertest');
const User = require('../model/User')

afterEach(async () => { await User.deleteMany() })


test("if 204 when not logged in", async () => {
    const response = request(app).get("/logout")
        .expect(204)
});


test("should clear refresh token from db", async () => {
    const regResponse = await request(app).post('/reg')
        .send({
            email: "logout.test@email.com",
            pwd: "logout1234"
        })
        .expect(201)
    const logoutResponse = request(app).get("/logout")
        .expect(204)
    const user = await User.findOne({ email: "logout.test@email.com" })
    expect(!user.refreshToken)

})
