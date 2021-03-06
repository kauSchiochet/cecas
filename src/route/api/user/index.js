const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/auth');
const authMiddleware = require('../../../middleware/auth');
const dbUser = require('../../../db').user;
const dbDigitalizacoes = require('../../../db').digitalizacoes;

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.hash, {
        expiresIn: '4h'
    });
}

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    let user = dbUser.findByUsername(username);

    if (!user)
        return res.status(400).send({ err: 'Usuário não encontrado' });

    if (!bcrypt.compareSync(password, user.password))
        return res.status(401).send({ err: 'Senha invalida' });

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ user })
    });
})

router.get('/getdigitalizacoes', authMiddleware, (req, res) => {

    let digitalizacoes = [];

    if (req.user.master) {
        digitalizacoes = dbDigitalizacoes.readAll();
        for (let i = 0; i < digitalizacoes.length; i++) {
            const digitalizacao = digitalizacoes[i];
            digitalizacao.htmlContent = undefined;
        }
    }
    for (let i = 0; i < req.user.digitalizacoes.length; i++) {
        const id = req.user.digitalizacoes[i];
        let digitalizacao = dbDigitalizacoes.read(id);
        if(!digitalizacao) continue;
        digitalizacao.htmlContent = undefined;
        digitalizacoes.push(digitalizacao)
    }

    res.json(digitalizacoes);
})

router.post('/register', authMiddleware, (req, res) => {

    const { username, password } = req.body;

    if (!username, !password)
        return res.status(400).send({ err: 'Necessário informar usuário/senha' });

    let user = dbUser.findByUsername(username);

    if (user)
        return res.status(400).send({ err: 'Usuário já criado' });

    user = dbUser.newAndWrite(username, password);

    user.password = undefined;

    res.json({ user });
})

router.post('/changepassword', authMiddleware, (req, res) => {

    const { username, password, newPassword } = req.body;

    if (!username, !password)
        return res.status(400).send({ err: 'Necessário informar usuário/senha' });

    if (!user)
        return res.status(400).send({ err: 'Usuário não encontrado' });

    if (!bcrypt.compareSync(password, user.password))
        return res.status(401).send({ err: 'Senha invalida' });

    user = dbUser.newAndWrite(username, newPassword);

    user.password = undefined;

    res.json({ user });
})

module.exports = app => app.use('/user', router);