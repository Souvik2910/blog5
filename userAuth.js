const jwt = require('jsonwebtoken');

exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, "Sohini", (error, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}