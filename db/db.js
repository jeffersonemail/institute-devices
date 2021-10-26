async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://instituto:instituto!@localhost:3306/devices");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectDevices(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM devices;');
    return rows;
}

module.exports = {selectDevices}