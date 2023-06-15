import Product from "../models/Products.js";

const creteProduct = async (req, res) => {
    await Product.create(req.body).then(data => {
        res.status(200).send(data)
    })
        .catch(err => {
            res.status(500).send(err ? err : 'something went wrong during this operation')
        })
}

const getAllProducts = async (req, res) => {
    const limit = req.params.limit ? req.params.limit : 10;
    const nextToken = req.params.nextToken ? req.params.nextToken : 0;

    let response = {}

    let total = await Product.count()
    await Product.find().limit(limit).skip(nextToken)
        .then(r => res.status(200).send({
            data: r,
            totalItems: total,
            nextToken: parseInt(limit)
        }))
        .catch(err => {
            res.status(500).send(err ? err : 'something went wrong during this operation')
        })
}


const updateProducts = async (req, res) => {
    console.log(req.body)
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err ? err : 'something went wrong during this operation')
        })
}

const deleteProduct = async (req, res) => {
    await Product.deleteOne({_id: req.params.id})
        .then(r => res.status(200).send(r))
        .catch(err => {
            res.status(500).send(err ? err : 'something went wrong during this operation')
        })
}
const batchDeleteProduct = async (req, res) => {
    console.log(req.body)
    await Product.deleteMany({_id: {$in: req.body}})
        .then(r => res.status(200).send(r))
        .catch(err => {
            res.status(500).send(err ? err : 'something went wrong during this operation')
        });
}


export default {
    getAllProducts,
    updateProducts,
    deleteProduct,
    batchDeleteProduct,
    creteProduct
}