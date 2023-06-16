import request from 'supertest';
import app from '../../app.js';

import dotenv from "dotenv";
dotenv.config({path: "./config.env"});
mongoose.set('strictQuery', true);
import connectDB from '../../config/db.js';
import mongoose from "mongoose";



beforeAll(() => connectDB().then(r => console.log("MongoDB connected")))
afterAll(() => mongoose.connection.close())

describe('Product - allProduct - /products/:limit/:nextToken', () => {
    test("getAllProduct", async () => {
        const response = await request(app).get('/products/10/0')
        const { body, status  } = response
        if (status === 200) {
            expect(body).toHaveProperty("data");
            expect(body).toHaveProperty("nextToken")  ;
            expect(body).toHaveProperty("totalItems");
            expect(typeof body.data).toBe("object");
            expect( body.data.length).toBe(10);
        }
        console.log(body)
    })
})