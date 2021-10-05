const validator = require('email-validator');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const Emails = require('./Emails').SendEmail;

const UserSignUp = async (d) => {

    if (validator.validate(d.email)) {
        const conn = await require('../database/db').connect();

        const randomCode = Math.floor(100000 + Math.random() * 900000)
        const hash = bcrypt.hashSync(d.password, saltRounds);
        const query = `INSERT INTO tb_user (user_name, user_email, user_password, user_active, user_activation_code) 
                    VALUES (?, ?, ?, ?, ?)`;
        const param = [d.nome, d.email, hash, 'false', randomCode.toString()];

        try {
            const [rows] = await conn.query(query, param);

            if (rows.affectedRows > 0) {
                const sub = 'Link de ativação conta da Power Streaming';
                let msg = '<p>Clique no Link abaixo para ativar sua conta na Power Streaming</p><br><br>';
                msg += '<a href="http://10.0.0.216:3000/register/userActive?id='+ rows.insertId +'&cod='+ randomCode.toString() +'">LINK DE ATIVAÇÃO</a>';

                let send = await Emails(d.email, sub, msg);

                return send;
            }
        }
        catch (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') { return 'email' }
            else { return false }
        }
    }
    else {
        return 'invalidEmail';
    }  
}


const UserActivationAccount = async (id, code) => {
    try {
        const conn = await require('../database/db').connect();

        let query = 'UPDATE tb_user SET user_active = ? WHERE user_id = ? AND user_activation_code = ?';
        let param = ['true', id, code];

        const [rows] = await conn.query(query, param);

        if(rows.affectedRows > 0) { 
            return true
         }
 
         else { return false }
    }
    catch(err) {
        console.log(err);
        return false;
    }
}





module.exports = { UserSignUp, UserActivationAccount }