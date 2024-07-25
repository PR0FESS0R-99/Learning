const mysql = require('mysql2/promise');

const connectionOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

function handleDisconnect() {
    pool = mysql.createPool(connectionOptions);

    pool.on('connection', function (connection) {
        console.log('New database connection established');
    });

    pool.on('error', function (err) {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Attempting to reconnect...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = pool;
