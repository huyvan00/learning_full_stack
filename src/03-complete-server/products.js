const fs = require('fs').promises

const path = require('path')

module.exports = {
    listFromJSON
}

async function listFromJSON(opt = {}) {
    const { offset = 0, limit = 25} = opt

    const dataPath = path.join(__dirname, './products.json')
    data = await fs.readFile(dataPath)
    return JSON.parse(data).slice(offset, offset + limit)
}