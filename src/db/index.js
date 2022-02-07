const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./storage/db.json');
const db = low(adapter);
console.log(db)
db.defauts({
    users: {
        username: "cecas",
        password: "cecas",
        master: false,
        digitalizacoes: []
    }
}).write()

module.exports = db