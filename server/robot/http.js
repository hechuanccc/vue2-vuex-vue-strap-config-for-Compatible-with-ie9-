import request from 'request'
let Promise = require('bluebird')

export default class Http {
    /**
     * http get
     * **/
    static get (options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    return console.log(error)
                }
                if (response.body === 'success') {
                    return resolve(response.body)
                }
                if (response && response.statusCode === 401) {
                    if (!options.res.headersSent) {
                        options.res.clearCookie('access_token')
                        options.res.clearCookie('g')
                        options.res.clearCookie('refresh_token')
                        resolve({
                            redirect: true
                        })
                    }
                } else {
                    let data = response.body
                    if (!options.noParse) {
                        try {
                            data = JSON.parse(response.body)
                        } catch (e) {
                            console.log('error uri ' + options.uri || options.url)
                            console.log(e)
                        }
                    }
                    resolve(data)
                }
            })
            .on('error', function (err) {
                console.log(err)
            })
        })
    }

    /**
     * http post
     * **/

    static post (options) {
        return new Promise((resolve, reject) => {
            request.post(options, (error, response, body) => {
                if (response && response.statusCode === 401) {
                    if (!options.res.headersSent) {
                        options.res.clearCookie('access_token')
                        options.res.clearCookie('g')
                        options.res.clearCookie('refresh_token')
                        resolve({
                            redirect: true
                        })
                    }
                } else if (!error) {
                    resolve(response)
                } else if (error) {
                    reject(error)
                }
            })
            .on('error', function (err) {
                console.log(err)
            })
        })
    }

    /**
     * http post
     * **/

    static put (options) {
        return new Promise((resolve, reject) => {
            request.put(options, (error, response, body) => {
                if (response && response.statusCode === 401) {
                    if (!options.res.headersSent) {
                        options.res.clearCookie('access_token')
                        options.res.clearCookie('g')
                        options.res.clearCookie('refresh_token')
                        resolve({
                            redirect: true
                        })
                    }
                } else if (!error) {
                    resolve(response)
                } else if (error) {
                    reject(error)
                }
            })
            .on('error', function (err) {
                console.log(err)
            })
        })
    }
}

