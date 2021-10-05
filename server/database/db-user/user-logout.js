const conn = require('../connectionDB');
const db = conn.connect();


exports.Logout = function(req, callback) {
    req.session.destroy(function(err) {
        callback(true);
    })
}