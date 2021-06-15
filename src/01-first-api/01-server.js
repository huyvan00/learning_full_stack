const http = require("http")
const querystring = require("querystring")
const fs = require("fs")

const port = process.env.PORT || 1337

const server = http.createServer(function (req, res) {
    if (req.url === '/') return respondText(req, res)
    if (req.url === '/json') return respondJSON(req, res)
    if (req.url.match(/^\/echo/)) return respondEcho(req, res)
    if (req.url.match(/^\/static/)) return respondStatic(req, res)

    respondNotFound(req, res)
})


function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end("Hi")
}

function respondJSON(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({'text': 'Hi', 'number': [1, 2, 3]}))
}

function respondEcho(req, res) {
    const { input = '' } = querystring.parse(
        req.url.split('?').slice(1).join('')
    )

    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input.split('').reverse().join('')
        })
    )
}

function respondStatic(req, res) {
    const fileName = `${__dirname}/public${req.url.split('/static')[1]}`
    fs.createReadStream(fileName).on('error', () => respondNotFound(req, res)).pipe(res)
}
function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}


server.listen(port)

console.log(`Server listening on ${port}`)