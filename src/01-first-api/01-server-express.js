const express = require('express')
const EventEmitter = require('events')

const fs = require("fs")
const { RSA_NO_PADDING } = require('constants')

const port = process.env.PORT || 1337

const app = new express()

const chatEmitter = new EventEmitter()

chatEmitter.on('message', console.log)

app.get('/', respondText)
app.get('/json', respondJSON)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
app.get('/see', respondSEE)


function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end("Hi")
}

function respondJSON(req, res) {
    res.json({'text': 'Hi', 'number': [1, 2, 3]})
}

function respondEcho(req, res) {
    const { input = '' } = req.query
    
    res.json({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input.split('').reverse().join('')
        }
    )
}

function respondStatic(req, res) {
    const fileName = `${__dirname}/public/${req.params[0]}`
    fs.createReadStream(fileName).on('error', () => respondNotFound(req, res)).pipe(res)
}


function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}

function respondChat(req, res) {
    const { message } = req.query
    chatEmitter.emit('message', message)
    res.end()
}

function respondSEE(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    const onMessage = msg => res.write(`data: ${msg}\n\n`)
    chatEmitter.on('message', onMessage0)

    res.on('close', function() {
        chatEmitter.off('message', onMessage)
    })
}
app.listen(port, () => console.log(`Server listening on ${port}`))
