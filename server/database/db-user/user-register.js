const conn = require('../connectionDB');
const db = conn.connect();
const userActive = require('./user-active');
const sendEmail = require('../db-email/send-email');

exports.insertUser = function(dados, callback) {
 
    let query = 'SELECT email FROM Users WHERE email = ?';
    let values = [dados.email];
    var work;

    db.query(query, values, function(e, res) {
        if (e) {
            callback('Erro: problem with the database. Cant process your request!');
        }
        if(res == '') {
            query = 'INSERT INTO Users (nome, username, email, password, status, tipo, termo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            values = [dados.nome, dados.username, dados.email, dados.pw1, 'n', 'user', dados.termo];

            db.query(query, values, function(e, res) {
                if (e) {
                    callback('Erro: problem with the database. Cant process your request!');
                } 
                else { 
                    userActive.sendActiveCod(dados, function (work) {
                        callback(work);
                    });     
                }
            });
        }
        else {
            work = false;
            callback(work);
        }            
    }); 
}


exports.sendEmailRecover = function (dados, callback) {

    let query = 'SELECT email FROM Users WHERE email = ?';
    let values = [dados.email];
    
    db.query(query, values, function(err, res){

        if (err) {
            callback('Erro: problem with the database. Cant process your request!');
        }
        if (res != '') {
            let cod = Math.floor(Math.random() * 999999);
            const sub = 'Play RPG: Seu condigo para recuperação de senha';
            const msg = '<p>Seu Código de recuperação é: '+ cod + '</p>';

            sendEmail.sendEmail(dados.email, sub, msg, function(work) {

                if (work == true) {

                    query = 'UPDATE Users SET cod_recov = ? WHERE email = ?';
                    values = [cod, dados.email];

                    db.query(query, values, function(err, res) {

                        if (err) {
                            callback('Erro: problem with the database. Cant process your request!');
                        }
                        else {
                            callback(true);
                        }
                    });
                }
                else {
                    callback('Não foi possivel enviar o codigo para o email informado!');
                }      
            });
        }
        else {
            callback(false);
        }
    });  
}


exports.sendCodRecover = function(dados, callback) {

    let query = 'SELECT email FROM Users WHERE email = ? AND cod_recov = ?';
    let values = [dados.email, dados.cod];

    db.query(query, values, function(err, res) {

        if (err) {

            callback('Erro: problem with the database. Cant process your request!');

        }
        if (res != '') {

            callback(true);

        }
        else {

            callback(false);

        }
    });
}


exports.sendPwRecover = function(dados, callback) {
    
    let query = 'SELECT email FROM Users WHERE email = ? AND cod_recov = ?';
    let values = [dados.email, dados.cod];

    db.query(query, values, function(err, res) {
        
        if (err) {

            callback('Erro: problem with the database. Cant process your request!');

        }
        if (res != '') {
            
            query = 'UPDATE Users SET password = ?, cod_recov = ? WHERE email = ?';
            values = [dados.pw, null, dados.email];

            db.query(query, values, function(err, res){

                if (err) {
                    callback('Erro: problem with the database. Cant process your request!');
                }
                else {
                    callback(true);
                }

            });

        }
        else {

            callback(false);

        }
    });
}
