exports.connect = function(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin20',
        password: '123qwe.',
        database: 'PowerDB'
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}