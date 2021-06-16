const fs = require('fs').promises

const path = require('path')

module.exports = {
    listFromJSON,
    getProductById
}

const dataPath = path.join(__dirname, './products.json')

async function listFromJSON(opt = {}) {
    const { offset = 0, limit = 25, tag} = opt
    data = await fs.readFile(dataPath)
    return JSON.parse(data)
    .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0 )
    .slice(offset, offset + limit)
}

async function getProductById(id) {
    const products = JSON.parse(await fs.readFile(dataPath))
    for (let i = 0; i < products.length; i++) {
        if (products[i]._id === id) {return products[i]}
    }
    return null
}