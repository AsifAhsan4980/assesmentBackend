import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

        product_name: {
            type: String,
            require: [true, "Please provide a product name"],
        },
        unit_price: {
            type: Number,
            require: [true, "Please provide a price"],
        },
        category_name: {
            type: String,
            require: false,
        },
        available_since: {
            type: String,
            require: false
        },

        category_id: {
            type: Number,
            require: false
        },
        status: {
            type: Boolean,
            require: false
        }
    },
    {
        timestamps: true
    })

const Product = mongoose.model("products", ProductSchema)

export default Product