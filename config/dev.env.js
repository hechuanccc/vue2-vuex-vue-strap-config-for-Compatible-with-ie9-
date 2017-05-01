
const path = require('path')

module.exports = {
    NODE_ENV: 'development',
    HOST: 'http://b9088.com',
    port: 3000,
    proxyTable: {},
    index: path.resolve(__dirname, 'server/public/index.html'),
    admin: path.resolve(__dirname, 'server/public/admin.html'),
    assetsRoot: path.resolve(__dirname, 'server/public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
}
