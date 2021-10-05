

exports.authSession = function(req, callback) {
    if (req.session.token) {
        callback(true);
    } 
    else {
        callback(false);
    }
}