
let path = require('path')

module.exports = {
    NODE_ENV: 'production',
    HOST: 'http://b9088.com',
    port: 3000,
    assetsRoot: path.resolve(__dirname, '../../nginx/marty'),
    staticFilePath: path.join(__dirname, '../../nginx/marty/'),
    assetsSubDirectory: 'dist',
    assetsPublicPath: '/'
}
