'use strict'

const express = require('express')
const app = require('../build/dev-server')
const config = require('../config/index')
const api = require('./routes/api')

const port = process.env.PORT || config.port

app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})

app.use(express.static(__dirname + '/public'))

// APIS
app.get('/test', function (req, res, next) {
    res.json({
        'name': 'test'
    })
})
app.use('/api', api)
app.get('*', (req, res) => { res.sendFile(__dirname + '/public/index.html')})

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at222 http://localhost:' + port + '\n')
})
