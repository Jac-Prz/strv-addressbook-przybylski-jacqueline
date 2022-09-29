const request = require('supertest');
const app = require('../server');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() });

test('new access token is sent', async () => {
    const regResponse = await request(app).post('/reg')
        .send({
            email: "refresh.test@email.com",
            pwd: "refresh1234"
        })
        .expect(201)
    const user = await User.findOne({ email: "refresh.test@email.com" })
    expect (user.refreshToken)
    const refreshResponse = await request(app).get('/refresh')
    .set('Authorization', `Bearer ${user.refreshToken}`)
        .expect(200)
        .expect((res) => {
            res.accessToken
        })
})

test('no access token is sent', async () => {
    const regResponse = await request(app).post('/reg')
        .send({
            email: "refresh.test@email.com",
            pwd: "refresh1234"
        })
        .expect(201)
    const user = await User.findOne({ email: "refresh.test@email.com" })
    const refreshResponse = await request(app).get('/refresh')
        .expect(401)
        .expect((res) => {
            res.accessToken
        })
})


