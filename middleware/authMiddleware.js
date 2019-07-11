const jwt = require('jsonwebtoken')
const check = (req, res) => {
    if (_authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
}

function _authenticate(token) { //token -> 123123789127389213
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, 'secret_key');
        return true;
    } catch (error) {
        return false
    }
}

function notAuthenticated(response) {
    response.status(401);
}

module.exports = {
    "check": check,
    "authenticate": _authenticate,
    "notAuthenticated": notAuthenticated
}