const express = require('express');
const path = require('path');
const passport = require('passport');
const AuthMidWare = require('../modules/AuthMidWare').AuthMidWare;



exports.views = function (app) {

    app.post('/api/auth', (req, res, next) => {
        if(req.isAuthenticated()) { res.send(true) }
        else { res.send(false); }
    });

    app.post('/api/signIn', function(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {throw err};
            if (user === 'UserNotFound') {res.send('UserNotFound')}
            if (user === 'PasswordNotFound') {res.send('PasswordNotFound')}
            if (!user) {res.send(false)}
            else {
                req.login(user, (err) => {
                    if (err) console.log(err)
                    res.send(true)
                    console.log(req.user)
                })
            }
        })(req, res, next);
    })


    app.get('/api/logout', function(req, res){
        req.logout();
        res.send(true); 
    });
}