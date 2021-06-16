const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 1337

app = express()
app.use(middleware.cors)
app.use(express.json())
app.get('/', (req, res) => res.json({'hello': 'world'}))
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)

app.post('/products', api.createProducts)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on ${port}`))
