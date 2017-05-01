import express from 'express'
import Http from '../robot/http'

let router = express.Router()

router.get('/checkname', function (req, res, next) {
    Http.get(`http://192.168.0.114:8000/member/gamecategory/?mode=tree?platform=0`).then((data) => {
        console.log(data)
        res.json(data)
    })
})

module.exports = router
