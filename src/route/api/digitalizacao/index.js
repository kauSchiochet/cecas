const router = require('express').Router();
const authMiddleware = require('../../../middleware/auth');
const multer = require('multer');
const upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } });

let testeHtmlContent = "";


router.get('/:id', (req, res) => {
    console.log('ok')
    console.log(req.params.id)
    res.send(testeHtmlContent)
})

router.post('', [upload.none(), authMiddleware], (req, res) => {
    console.log(req.body);
    testeHtmlContent = req.body.htmlContent;
    res.json({ ok: 'ok' })
})

router.delete('/:id',authMiddleware, (req, res) => {
    console.log('ok')
    console.log(req.params.id)
    res.send(testeHtmlContent)
})

router.put('/:id', authMiddleware, (req, res) => {
    console.log('ok')
    console.log(req.params.id)
    res.send(testeHtmlContent)
})

module.exports = app => app.use('/digitalizacao', router);