const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send("abrindo pag id:" + req.query.id)
});

app.get('/getimg', (req, res) => {
    res.send('enviando img do projeto id:' + req.query.id)
})

app.post('/api/cadastro', (req, res) => {
    console.log(req.body)
    res.json({ok: 'ok'})
})

app.listen('3000')