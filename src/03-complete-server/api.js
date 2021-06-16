const products = require('./products')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
    listProducts,
    getProduct,
    createProducts,
    editProduct,
    deleteProduct
    })

async function listProducts(req, res) {
    const { limit = 25, offset = 0 , tag} = req.query
    dataProducts = await products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
    })
    res.json(dataProducts)
}

async function getProduct(req, res, next) {
    const { id } = req.params
    const product = await products.get(id)
    if (!product) return next()
    res.json(product)
}

async function createProducts(req, res, next) {
    const product = await products.create(req.body)
    res.json(req.body)
}

async function editProduct(req, res, next) {
    const change = req.body
    const product = await products.edit(req.params.id, change)
    res.json(product)
}

async function deleteProduct(req, res, next) {
    await products.remove(req.params.id)
    res.json({ Success: true })   
}
