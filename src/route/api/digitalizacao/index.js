const router = require('express').Router();
const authMiddleware = require('../../../middleware/auth');
const multer = require('multer');
const upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } });

router.get('/:id', authMiddleware, (req, res) => {

    let id = req.params.id;
    let digitalizacao = dbDigitalizacoes.read(id);

    if (!digitalizacao) return res.status(400).json({ err: 'Digitalização não encontrada' });

    res.json(digitalizacao)
})

router.post('', [upload.none(), authMiddleware], (req, res) => {

    let digitalizacao = {
        name: req.body.name,
        htmlContent: req.body.htmlContent
    }

    if (!digitalizacao.name || !digitalizacao.htmlContent) return res.status(400).json({ err: 'Necessário campos name e htmlContent preenchidos' });

    let id = dbDigitalizacoes.write(digitalizacao, req.user.username, id);

    res.json({ ok: 'ok', id })
})

router.put('/:id', [upload.none(), authMiddleware], (req, res) => {

    let reqIid = req.params.id;
    let digitalizacao = dbDigitalizacoes.read(reqIid);

    if (!digitalizacao) return res.status(400).json({ err: 'Digitalização não encontrada' });

    digitalizacao = {
        name: req.body.name,
        htmlContent: req.body.htmlContent
    }

    if (!digitalizacao.name || !digitalizacao.htmlContent) return res.status(400).json({ err: 'Necessário campos name e htmlContent preenchidos' });

    let id = dbDigitalizacoes.write(digitalizacao, req.user.username, reqIid);

    res.json({ ok: 'ok', id })
})

router.delete('/:id', authMiddleware, (req, res) => {

    let id = req.params.id;
    let digitalizacao = dbDigitalizacoes.read(id);

    if (!digitalizacao) return res.status(400).json({ err: 'Digitalização não encontrada' });

    dbDigitalizacoes.delete(id);

    res.json({ ok: 'ok', id })
})

module.exports = app => app.use('/digitalizacao', router);