const fs = require('fs').promises
const cuid = require('cuid')

const path = require('path')

const db = require('./db')

module.exports = {
    list,
    get,
    create,
    edit,
    remove,
}

const Product = db.model('Products', {
    _id: { type: String, default: cuid },
    description: String,
    imgThumb: String,
    img: String,
    link: String,
    userId: String,
    userName: String,
    userLink: String,
    tags: { type: [String], index: true }
    })

async function list(opt = {}) {
    const { offset = 0, limit = 25, tag} = opt
    const query = tag ? {tags: tag} : {}
    const products = await Product.find(query).sort({_id: 1}).skip(offset).limit(limit)

    return products
}

async function get(_id) {
    const product = await Product.findById(_id)
    return product
}


async function create (fields) {
    const product = await new Product(fields).save()
    return product
    }

async function edit(_id, change) {
    const product = await get(_id)
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
        })
    product.save()
    return product
}

async function remove(_id) {
    await Product.deleteOne({ _id })
}
