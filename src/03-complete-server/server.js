const fs = require('fs').promises
const path = require('path')
const express = require('express')

const port = process.env.PORT || 1337

app = express()

app.get('/', (req, res) => res.json({'hello': 'world'}))
app.get('/product', getProduct)

app.listen(port, () => console.log(`Server listening on ${port}`))

async function getProduct(req, res) {
    const dataPath = path.join(__dirname, './products.json')
    try {
        data = await fs.readFile(dataPath)
        res.json(JSON.parse(data))
    }
    catch (err) {
        res.status(500).json({'error': err.message})
    }

}