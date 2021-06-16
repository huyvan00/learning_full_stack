const products = require('./products')

module.exports = {
    getProducts
}

async function getProducts(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { limit = 25, offset = 0 } = req.query
    console.log(limit)
    console.log(offset)
    try {
        dataProducts = await products.listFromJSON({
            offset: Number(offset),
            limit: Number(limit)
        })
        res.json(dataProducts)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
    
}
