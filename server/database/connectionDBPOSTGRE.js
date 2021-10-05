

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const { Pool } = require('pg');
    const pool = new Pool({
        database: 'SGCB',
        user: 'admin20',
        password: '123qwe.',
        port: 5432,
        host: 'localhost',     
    });
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}


async function query(query, params) {

    const client = await connect();
    
    client.query('SET search_path TO sgcb_scm');

    try {
        
        var rows = '';
        if (params != '') {
            rows = await client.query(query, params);
        }
        else {
            rows = await client.query(query);
        }
        
        return rows;
    }

    
    finally {
        client.release();
    }  
}

module.exports = {
    query
}






