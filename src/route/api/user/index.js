const router = require('express').Router();
const authConfig = require('../../../config/auth');
const authMiddleware = require('../../../middleware/auth');

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.hash, {
        // expiresIn: '1h'
    });
}

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    let user = {
        username: "cecas",
        password: "cecas"
    }

    if (!user)
        return res.status(400).send({ code: '03', err: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(401).send({ code: '04', err: 'Invalid Password' });

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ username: username })
    });
})

router.post('/getDigitalizacoes', authMiddleware, (req, res) => {

})


module.exports = app => app.use('/user', router);