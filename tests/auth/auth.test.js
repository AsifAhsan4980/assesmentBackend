import request from 'supertest';
import app from '../../app.js';

import dotenv from "dotenv";
dotenv.config({path: "./config.env"});
mongoose.set('strictQuery', true);
import connectDB from '../../config/db.js';
import mongoose from "mongoose";



beforeAll(() => connectDB().then(r => console.log("MongoDB connected")))
afterAll(() => mongoose.connection.close())


describe('Auth - register - /auth/register', (done) => {
   test("registration", async () => {
       const response = await request(app).post('/auth/register').send({
           email: 'testemail@test.com',
           password: 'Mike4980%%',
       })

       const { body, status  } = response
       console.log(body, status)
       if (status === 200){
           expect(body).toHaveProperty("email");
           expect(status).toBe(200);
       }else{
           expect(body).toHaveProperty("message");
           expect(status).toBe(400);
       }

   }, 10000)

})

describe('Auth - login - /auth/login', () => {

    test("login", async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testemail@test.com',
            password: 'Mike4980%%',
        })

        const { body, status  } = response
        console.log(body, status)
        if (status === 200){
            expect(body).toHaveProperty("email");
            expect(body).toHaveProperty("token");
            expect(status).toBe(200);
        }else{
            expect(body).toHaveProperty("message");
            expect(status).toBe(400);
        }

    }, 10000)
})








