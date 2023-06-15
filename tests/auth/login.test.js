import request from "supertest";
import app from "../../app.js";



describe('Auth - login - /auth/login', () => {
    test("registration", async done => {
        const response = await request(app).post('/auth/login').send({
            email: 'testemail@test.com',
            password: 'Mike4980%%',
        })

        const { body, status  } = response
        console.log(body, status)
        expect(body).toHaveProperty('message');
        done()
    })

})