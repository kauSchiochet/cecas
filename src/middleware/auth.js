const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ err: 'Token de autenticação não providenciado' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ err: 'Token error' })

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({ err: 'Token mal formatado' });

    jwt.verify(token, authConfig.hash, (err, decoded) => {
        if (err)
            return res.status(401).send({ err: 'Token invalido' });

        req.user = decoded.user;

        return next();
    })

}