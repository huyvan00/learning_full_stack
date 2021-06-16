const products = require('./products')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
    getProducts,
    getProduct
    })

async function getProducts(req, res) {
    const { limit = 25, offset = 0 , tag} = req.query
    dataProducts = await products.listFromJSON({
        offset: Number(offset),
        limit: Number(limit),
        tag
    })
    res.json(dataProducts)
}

async function getProduct(req, res, next) {
    const { id } = req.params
    const product = await products.getProductById(id)
    if (!product) return next()
    res.json(product)
}
