import request from 'supertest';
import app from '../../app.js';





import dotenv from "dotenv";

describe('Auth - register - /auth/register', () => {
   test("registration", async done => {
       const response = await request(app).post('/auth/register').send({
           email: 'testemail@test.com',
           password: 'Mike4980%%',
       })

       const { body, status  } = response
       console.log(body, status)
       expect(body).toHaveProperty('message');
       done()
   })

})






