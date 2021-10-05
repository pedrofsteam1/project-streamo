const express = require('express');
const path = require('path');
const DIST_DIR = path.join(__dirname, '../../../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const passport = require('passport');

const checkActivation = (email) => {

}

const router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.sendFile(HTML_FILE); 
    }
    else {
        res.redirect('/main');
    }  
});


router.post('/api/signIn', passport.authenticate('local'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(true);
});


router.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});


module.exports = router;