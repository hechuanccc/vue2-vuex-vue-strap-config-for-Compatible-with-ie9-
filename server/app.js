'use strict'

const express   = require('express')
const app       = express()

// RESOURCES
const imagebox    = require('./routes/imagebox')
const api         = require('./routes/api') 

//
app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})
app.use(express.static(__dirname + '/public'));

// APIS
app.get('/test', function (req, res, next) {
	console.log('in test')
	res.json({
		name: 'test'
	})
})
app.get('/imagebox', imagebox.upload)
app.get('/readapi', api.requestApi)
app.get('*', (req, res) => {res.sendFile(__dirname + '/public/index.html')})


app.listen(3001, () => {
    console.log(`app is listening at port:80`)
})
