const conn = require('../connectionDB');
const db = conn.connect();


exports.signIn = function (dados, callback) {
    
    let query = 'SELECT email FROM Users WHERE email = ?';
    let values = [dados.email];

    db.query(query, values, function (err, res) {

        if(err) {  
            callback('Erro: problem with the database. Cant process your request!');
        }

        if (res != '') {
            query = 'SELECT email FROM Users WHERE email = ? AND password = ?';
            values = [dados.email, dados.pw];

            db.query(query, values, function (err, res) {

                if (err) {
                    callback('Erro: problem with the database. Cant process your request!');
                }

                if (res != '') {
                    query = 'SELECT * FROM Users WHERE email = ? AND password = ? AND status = ?';
                    values = [dados.email, dados.pw, "y"];

                    db.query(query, values, function (err, res) {

                        if(err) {
                            callback('Erro: problem with the database. Cant process your request!');
                        }
                        
                        if (res != '') {
                            callback({
                                'login': 'login',
                                'username': res[0].username,
                                'nome': res[0].nome,
                                'userId': res[0].user_id,
                            });
                        }
                        else {
                            callback({
                                'login': 'inativo'
                            });
                        }
                        
                    });
                }

                else {
                    callback({
                        'login': 'pw'
                    });
                }
            })
        }

        else {
            callback({
                'login': 'email'
            });
        }   
    })
}