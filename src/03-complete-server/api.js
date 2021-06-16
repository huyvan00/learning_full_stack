const products = require('./products')

module.exports = {
    getProducts,
    getProduct
}

async function getProducts(req, res) {
    
    const { limit = 25, offset = 0 , tag} = req.query
    try {
        dataProducts = await products.listFromJSON({
            offset: Number(offset),
            limit: Number(limit),
            tag
        })
        res.json(dataProducts)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
    
}

async function getProduct(req, res, next) {
    const { id } = req.params
    try {
        const product = await products.getProductById(id)
        if (!product) return next()
        res.json(product)
    }
    catch (err) {
        res.status(500).json({ error: err.message})
    }

}
