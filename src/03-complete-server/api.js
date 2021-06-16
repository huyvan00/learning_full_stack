const products = require('./products')

module.exports = {
    getProducts
}

async function getProducts(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        dataProducts = await products.listFromJSON()
        res.json(dataProducts)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
    
}
