const router = require('express').Router();
const dbDigitalizacoes = require('../db').digitalizacoes;

require('./api')(router);

router.get('/digitalizacao/:id', (req, res) => {

    let id = req.params.id;
    let digitalizacao = dbDigitalizacoes.read(id);

    if (!digitalizacao) return res.status(400).json({ error: 'Digitalização não encontrada' });

    return res.send(digitalizacao.htmlContent);
})

module.exports = app => app.use('', router);