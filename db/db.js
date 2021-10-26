async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://instituto:instituto!@localhost:3306/devices");
    console.log("MySQL server is connected!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}