const app = require('../server');
const request = require('supertest');
const User = require('../model/User');

afterEach(async () => { await User.deleteMany() });

describe("try to submit adresses entry without JWT / authentication", () => {
    test('should respond with 401', async () => {
        const response = await request(app).post('/addresses')
            .send({
                firstName: "Test",
                lastName: "AddressRoute",
                phone: "444 555 666",
                address: "test address"
            })
            .expect(401);
    });
});

describe("submit adresses entry with JWT / authentication", () => {
    test('should respond with 201 if correct access token', async () => {
        const reqResponse = await request(app).post('/register')
            .send({
                email: "random@email.com",
                pwd: "password"
            });
        const addressesResponse = await request(app).post('/addresses')
            .set('Authorization', `Bearer ${reqResponse.body.accessToken}`)
            .send({
                firstName: "Test",
                lastName: "AddressRoute",
                phone: "444 555 666",
                address: "12 Avenua Lane"
            })
            .expect(201);
    });
});
