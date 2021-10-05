const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
 
 
module.exports = async function(passport){

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const db = require('../database/db');
            const user = await db.findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy(async (email, password, done) => {
            try {
                const db = require('../database/db');
                const user = await db.findUserByEmail(email);

                // usuário inexistente
                if (!user) {
                    return done(null, 'UserNotFound');
                }

                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.user_password);
                if (!isValid) {
                    return done(null, 'PasswordNotFound')
                }
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}