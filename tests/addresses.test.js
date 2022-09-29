const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() })

test('should not be authorised without access token', async () => {
    const response = await request(app).post('/addresses')
        .send({
            firstName: "Test",
            lastName: "AddressRoute",
            phone: "444 555 666",
            address: "12 Avenua Lane"
        })
        .expect(401)
})

test('should make new addressook entry', async () => {
    const reqResponse = await request(app).post('/reg')
        .send({
            email: "random@email.com",
            pwd: "password"
        })
        .expect(201)

    const addressesResponse = await request(app).post('/addresses')
        .set('Authorization', `Bearer ${reqResponse.body.accessToken}`)
        .send({
            firstName: "Test",
            lastName: "AddressRoute",
            phone: "444 555 666",
            address: "12 Avenua Lane"
        })
        .expect(201)
})
