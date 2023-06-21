import request from 'supertest';
import app from '../../app.js';
const jwt = require('jsonwebtoken');
import dotenv from "dotenv";
dotenv.config({path: "./config.env"});
mongoose.set('strictQuery', true);
import connectDB from '../../config/db.js';
import mongoose from "mongoose";
import Product from "../../models/Products.js";


let authToken = jwt.sign({
    id: "648b241a379b3b19ffd27f40",
    username: "abc",
    email: "oran.mohammed@falltrack.net",
    role: 'user',
    flag: true
}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
}, {})


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
            expect( body.data).toHaveLength(10);
        }
        console.log(body)
    })
})

describe('Product - create - /products/create', () => {
    it('should create a new product', async () => {
        const newProduct = {
            "product_name": "Mango",
            "category_id": 10,
            "category_name": "SPF 15",
            "unit_price": 47.4,
            "status": true,
            "available_since": "8/25/2022"
        }

        const response = await request(app)
            .post('/products/create')
            .send(newProduct)
            .set('Authorization', `Bearer ${authToken}`);
        const { body, status  } = response
        console.log(body, status)

        if (status === 401){

        } else if (status === 200) {
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(newProduct);

            // Check if the product is saved in the database
        }
        else {
            expect(response.status).toBe(404);
        }


    });
})

describe('Product - update - /products/single/:id', () => {
    it('should update a product with id', async () => {
        const newProduct = {
            "product_name": "Orange",
            "category_id": 10,
            "category_name": "SPF 15",
            "unit_price": 47.4,
            "status": true,
            "available_since": "8/25/2022"
        }

        const response = await request(app)
            .put('/products/single/6492d9b9288d70b0f91843db')
            .send(newProduct)
            .set('Authorization', `Bearer ${authToken}`);
        const { body, status  } = response
        console.log(body, status)

        if (status === 401){

        } else if (status === 200) {
            expect(response.status).toBe(200);
            // expect(response.body).toMatchObject(newProduct);

            // Check if the product is saved in the database
        }
        else {
            expect(response.status).toBe(404);
        }
    });
})


describe('Product - delete - /products/single/:id', () => {
    it('should delete a product with id', async () => {
        const response = await request(app)
            .delete('/products/single/6492d9b9288d70b0f91843db')
            .set('Authorization', `Bearer ${authToken}`);
        const { body, status  } = response
        console.log(body, status)

        if (status === 401){

        } else if (status === 200) {
            expect(response.status).toBe(200);
            expect(response.body.acknowledged).toBe(true);
            expect(response.body.deletedCount).toBe(1);

            // Check if the product is saved in the database
        }
        else {
            expect(response.status).toBe(404);
        }
    });
})