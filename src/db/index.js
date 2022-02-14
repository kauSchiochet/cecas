const fs = require('fs');
const bcrypt = require('bcryptjs');

const storageFolder = process.env.STORAGE_FOLDER;
const usersJson = storageFolder + process.env.USER_JSON;
const generalJson = storageFolder + process.env.GENERAL_JSON;
const digitalizacoesFolder = storageFolder + process.env.DIGITALIZACOES_FOLDER;

(function () {
    if (!fs.existsSync(storageFolder))
        fs.mkdirSync(storageFolder);

    if (!fs.existsSync(digitalizacoesFolder))
        fs.mkdirSync(digitalizacoesFolder);

    let warning = storageFolder + '/.não editar dados desta pasta.txt';
    if (!fs.existsSync(warning))
        fs.writeFileSync(warning, 'É de extrema importancia não editar dados contidos neste pasta para o correto funcionamento do servidor');
})()

const db = {
    general: {
        data: {},
        get: () => {
            return db.utils.copy(db.general.data);
        },
        write: (dataEx) => {
            let data = JSON.stringify((dataEx ? dataEx : db.general.data));
            fs.writeFileSync(generalJson, data);
        },
        read: () => {
            try {
                db.general.data = readFile();
            } catch {
                db.general.write(db.general.default);
                db.general.data = readFile();
            }

            function readFile() {
                let rawdata = fs.readFileSync(generalJson);
                return JSON.parse(rawdata);
            }
        },
        default: {
            lastDitalizacoesId: 0
        }
    },
    user: {
        data: [],
        get: () => {
            db.user.read();
            return db.utils.copy(db.user.data);
        },
        write: (dataEx) => {
            let data = JSON.stringify((dataEx ? dataEx : db.user.data));
            fs.writeFileSync(usersJson, data);
        },
        newAndWrite: (username, password) => {
            let user = {
                username,
                password: bcrypt.hashSync(password, 10),
                master: false,
                digitalizacoes: []

            }

            db.user.data.push(user);
            db.user.write();
            return user;
        },
        changePassword: (user, password) => {
            user.password = bcrypt.hashSync(password, 10);
            db.user.replaceUserObj(user);
            return user;
        },
        read: () => {
            try {
                db.user.data = readFile();
            } catch {
                db.user.write(db.user.default);
                db.user.data = readFile();
            }

            function readFile() {
                let rawdata = fs.readFileSync(usersJson);
                return JSON.parse(rawdata);
            }
        },
        findByUsername: (username) => {
            return db.utils.copy(db.user.data.find(x => x.username == username));
        },
        replaceUserObj: (user) => {
            let finded = false;

            for (let i = 0; i < db.user.data.length; i++) {
                const userData = db.user.data[i];
                if (userData.username == user.username) {
                    db.user.data[i] = user;
                    finded = true;
                }
            }

            db.user.write();
        },
        default: [{
            username: 'cecas',
            password: bcrypt.hashSync(process.env.DEFAULT_PASS_CECAS, 10),
            master: true,
            digitalizacoes: []
        }]
    },
    digitalizacoes: {
        read: (id) => {
            let digitalizacao = undefined;
            try {
                digitalizacao = readFile();
            } catch { };

            return digitalizacao;

            function readFile() {
                let rawdata = fs.readFileSync(db.digitalizacoes.makePathFile(id));
                return JSON.parse(rawdata);
            }
        },
        readAll: () => {
            let digitalizacoes = [];
            try {

                let files = fs.readdirSync(digitalizacoesFolder);

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    let rawdata = fs.readFileSync(digitalizacoesFolder + '/' + file);
                    digitalizacoes.push(JSON.parse(rawdata));
                }

            } catch { };

            return digitalizacoes;
        },
        write: (dataEx, username, id) => {
            let idEx = id;

            if (idEx > db.general.data.lastDitalizacoesId) {
                db.general.data.lastDitalizacoesId = idEx
                db.general.write();
            } else if (!idEx) {
                idEx = ++db.general.data.lastDitalizacoesId;
                db.general.write();
            }

            let user = db.user.data.find(x => x.username == username);
            if (!user.digitalizacoes.find(x => x == idEx))
                user.digitalizacoes.push(idEx);

            db.user.replaceUserObj(user);

            dataEx.id = idEx;
            let data = JSON.stringify(dataEx);

            fs.writeFileSync(db.digitalizacoes.makePathFile(idEx), data);
            return idEx;
        },
        delete: (id) => {
            fs.unlinkSync(db.digitalizacoes.makePathFile(id));
        },
        makePathFile: (id) => {
            return digitalizacoesFolder + '/' + id + '.json';
        }
    },
    utils: {
        copy: (data) => {
            return JSON.parse(JSON.stringify(data));
        }
    }
};

db.general.read(); // para inicializar as config gerais
db.user.read(); // para inicializar os usuários

//console.log(db.user.data)
//console.log(db.user.findByUsername('cecas'));

//db.digitalizacoes.write({ name: '123', htmlContent: 'OPA 2 KK' }, 'cecas');
//console.log(db.general.get());

//console.log(db.digitalizacoes.readAll()); // para inicializar os usuários


module.exports = db;