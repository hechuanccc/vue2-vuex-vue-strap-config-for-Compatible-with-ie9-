const config = require('../config/index')
const host = config.HOST
const prefix = host + '/member'
// 192.168.0.102
exports.api = {
    domain: host,
    static: prefix + '/static/',
    onlinepay: prefix + '/onlinepayment/',
    register: prefix + '/register/',
    login: prefix + '/login/',
    refresh_token: prefix + '/login/refresh/',
    verification: prefix + '/verification_code/',
    member: prefix + '/profile/',
    logout: host + '/logout/',
    withdraw: prefix + '/withdraw/',
    reset: prefix + '/password/',
    onlinepayee: prefix + '/paymenttype/',
    payment: prefix + '/payment/',
    paymentBoard: host + '/payment/', // borad url for performing a Form request
    paymenttype: prefix + '/paymenttype/',
    withdrawpassword: prefix + '/withdraw_password/',
    bank: prefix + '/bank/',
    bankinfo: prefix + '/bankinfo/',
    remitpayee: prefix + '/remitpayee/',
    remit: prefix + '/remit_transaction/',
    transaction: prefix + '/transaction/',
    gameprovider: host + '/member/provider/',
    game: host + '/member/game/',
    launchgame: host + '/game/launch/',
    betrecords: prefix + '/betrecord/',
    gamecategory: prefix + '/gamecategory/?mode=tree',
    gametype: prefix + '/gametype',
    gameaccounts: prefix + '/gameaccount/',
    gamemember: host + '/game/member/',
    transferrecord: host + '/member/transferrecord/',
    promotion: prefix + '/promotion/',
    agentapplication: host + '/manage/agentapplication/',
    notify: host + '/notify/',
    announcements: prefix + '/announcements',
    banners: prefix + '/banners',
    notifyreturn: host + '/notify/return',
    websit: prefix + '/website/home-page/',
    checkname: host + '/checkname',
    host: host
}
