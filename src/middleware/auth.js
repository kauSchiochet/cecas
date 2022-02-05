const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ code: '07', err: 'No token provided' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ code: '08', err: 'Token error' })

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({ code: '09', err: 'Token malformated' });

    jwt.verify(token, authConfig.hash, (err, decoded) => {
        if (err)
            return res.status(401).send({ code: '10', err: 'Invalid token' });

        req.username = decoded.username;

        return next();
    })

}