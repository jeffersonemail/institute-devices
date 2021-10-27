
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const { user, pass, host, port, database } = require('../config');
    const connection = await mysql.createConnection(`mysql://${user}:${pass}@${host}:${port}/${database}`);
    console.log("MySQL server is connected!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}