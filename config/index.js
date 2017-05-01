
let config
let prodConfig = require('./prod.env')
let devConig = require('./dev.env')

if (process.env.NODE_ENV === 'production') {
    config = Object.assign({}, devConig, prodConfig)
} else {
    config = devConig
}

module.exports = config
