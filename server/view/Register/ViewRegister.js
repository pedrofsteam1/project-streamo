const express = require('express');
const path = require('path');
const DIST_DIR = path.join(__dirname, '../../../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const User = require('../../modules/UserDB');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(HTML_FILE); 
});


router.post('/signUp', (req, res, next) => {
    const reg = require('../../modules/UserDB').UserSignUp(req.body);
    reg.then(e => {
        res.send(e);
    })
});


router.get('/userActive', async (req, res, next) => {
    const activation = await User.UserActivationAccount(req.query.id, req.query.cod);

    res.redirect('/login?acc=true');
});


module.exports = router;