const path = require('path')
const express = require('express')
const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 1337

app = express()
app.use(middleware.cors)

app.get('/', (req, res) => res.json({'hello': 'world'}))
app.get('/products', api.getProducts)
app.get('/product/:id', api.getProduct)

app.listen(port, () => console.log(`Server listening on ${port}`))
