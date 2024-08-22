const LoginModel = require('../model/login_model');
const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];

    const result = await LoginModel.findOne({
        token: token,

    });
    if (token == null) return res.sendStatus(401);
    if (result == null) return res.status(404).json({
        "success": false,
        "message": "Unauthorized"
    });

    jwt.verify(token, 'SECRET', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });

}
module.exports = authenticateToken;