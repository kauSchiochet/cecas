const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        const filename_upload = `${novoNomeArquivo}.${extensaoArquivo}`;

        if (req.body.images == undefined) req.body.images = [];
        req.body.images.push(filename_upload);

        // Indica o novo nome do arquivo:
        cb(null, filename_upload)
    }
})

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send("abrindo pag id:" + req.query.id)
});

/*
app.post('/api/cadastro', upload.array('images'), (req, res) => {
    console.log(req.body);
    const{ name, description, images } = req.body;
    console.log(name);
    console.log(description);
    console.log(images);
    res.json({ok: 'ok'})
})
*/

let testeHtmlContent = "";

app.post('/api/cadastro', upload.none(), (req, res) => {
    console.log(req.body);
    testeHtmlContent = req.body.htmlContent;
    res.json({ ok: 'ok' })
})

app.get('/api/get', (req, res) => {
    res.send(testeHtmlContent)
})

app.listen('3000');