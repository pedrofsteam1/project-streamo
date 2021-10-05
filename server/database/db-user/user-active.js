const conn = require('../connectionDB');
const db = conn.connect();
const fs = require('fs');

const sendEmail = require('../db-email/send-email');


exports.sendActiveCod = function (dados, callback) {
    let query = 'SELECT email FROM Users WHERE email = ?';
    let values = [dados.email];

    db.query(query, values, function (err, res) {

        if (err) {
            callback('Erro: problem with the database. Cant process your request!');
        }

        if (res != '') {

            var http = require('http');

            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
                resp.on('data', function(ip) {

                    let cod = Math.floor(Math.random() * 999999);
                    const sub = 'Play RPG: Seu condigo de ativação';
                    const texto = '<p>Seu Código de ativação é: '+ cod +'</p><br><br><a href="http://'+ ip +':3000/user/active">LINK DE ATIVAÇÃO</a>';

                    sendEmail.sendEmail(dados.email, sub, texto,  function (work){
                        if (work) {
                            query = 'UPDATE Users SET cod_active = ? WHERE email = ?';
                            values = [cod, dados.email];

                            db.query(query, values, function(err, res) {
                                if(err) {
                                    callback('Erro: problem with the database. Cant process your request!');
                                }
                                else {
                                    callback(true);
                                }
                            });
                        }
                        else {
                            callback('Erro ao enviar email com codigo de ativação. Tente novamente ou entre em contato com o suporte clicando em Help no menu acima!');
                        }        
                    });
                });
            });          
        }   
    })
}



exports.ActiveAccount = function(dados, callback) {

    let query = 'SELECT email FROM Users WHERE email = ? AND status = ?';
    let values = [dados.email, 'y'];
    let id = '';

    db.query(query, values, function(err, res) {

        if(err) {

            callback('Erro: problem with the database. Cant process your request!');

        }
        if (res == '') {

            query = 'SELECT email, cod_active, user_id FROM Users WHERE email = ? AND cod_active = ?';
            values = [dados.email, dados.cod];

            db.query(query, values, function(err, res){

                if(err) {

                    callback('Erro: problem with the database. Cant process your request!');

                }
                if (res != '') {

                    id = res[0].user_id;
                    query = 'UPDATE Users SET status = ?, cod_active = ? WHERE email = ?';
                    values = ['y', '', dados.email];

                    db.query(query, values, function(err, res){

                        if(err) {

                            callback('Erro: problem with the database. Cant process your request!');
        
                        }
                        else {

                            let userFolder = '/var/www/projeto/public/users/' + id;

                            fs.mkdirSync(userFolder);

                            let libraryFolder = userFolder + '/library';
                            fs.mkdirSync(libraryFolder);

                            let tokensFolder = userFolder + '/library/tokens';
                            fs.mkdirSync(tokensFolder);

                            let mapsFolder = userFolder + '/library/maps';
                            fs.mkdirSync(mapsFolder);
                            

                            

                            callback(true);

                        }

                    });

                }
                else {

                    callback(false);

                }

            });

        }
        else {

            callback('Sua conta já está ativada!');

        }

    });
}