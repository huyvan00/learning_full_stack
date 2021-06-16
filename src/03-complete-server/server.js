const path = require('path')
const express = require('express')
const api = require('./api')
const port = process.env.PORT || 1337

app = express()

app.get('/', (req, res) => res.json({'hello': 'world'}))
app.get('/products', api.getProducts)

app.listen(port, () => console.log(`Server listening on ${port}`))
