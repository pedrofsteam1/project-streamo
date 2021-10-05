const express = require('express');
const path = require('path');
const DIST_DIR = path.join(__dirname, '../../../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(HTML_FILE); 
});


module.exports = router;