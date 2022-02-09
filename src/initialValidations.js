const fs = require('fs');

(function () {
    let content_dot_env = 'DEFAULT_PASS_CECAS=\nSTORAGE_FOLDER=./storage\nUSER_JSON=/users.json\nGENERAL_JSON=/general.json\nDIGITALIZACOES_FOLDER=/digitalizacoes'
    if (!fs.existsSync('./.env')) {
        fs.writeFileSync('./.env', content_dot_env);
        require('dotenv').config();
    }
})();

let exit = false;

console.log('-----------------------------');

console.log('Estrutura .env');
console.log('---');
console.log('DEFAULT_PASS_CECAS=<senha_login_secas_inicial>');
console.log('STORAGE_FOLDER=<default: ./storage >');
console.log('USER_JSON=<default: /users.json >');
console.log('GENERAL_JSON=<default: /general.json >');
console.log('DIGITALIZACOES_FOLDER=<default: /digitalizacoes >');
console.log('---');

console.log('\nINI ---- Validações .env ----\n');

if (!process.env.DEFAULT_PASS_CECAS) {
    console.log('DEFAULT_PASS_CECAS não atribuido');
    exit = true;
}

if (!process.env.STORAGE_FOLDER) {
    console.log('STORAGE_FOLDER não atribuido');
    exit = true;
}

if (!process.env.USER_JSON) {
    console.log('USER_JSON não atribuido');
    exit = true;
}

if (!process.env.GENERAL_JSON) {
    console.log('GENERAL_JSON não atribuido');
    exit = true;
}

if (!process.env.DIGITALIZACOES_FOLDER) {
    console.log('DIGITALIZACOES_FOLDER não atribuido');
    exit = true;
}

if (!exit) console.log('Sem erros');

console.log('\nFIM ---- Validações .env ----');
console.log('-----------------------------');

if (exit) process.exit(1);
