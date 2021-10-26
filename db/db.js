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
    var query = "SELECT device.Id, device.Category, category.Name, device.Color, device.partNumber FROM device JOIN category ON category.Id = device.category";
    return await getData(query);
}

async function selectDeviceById(id){
    var query = `SELECT device.Id, device.Category, category.Name, device.Color, device.partNumber FROM device JOIN category ON category.Id = device.category WHERE device.Id = ${id}`;
    return await getData(query);
}

async function removeDeviceById(id){
    var query = `DELETE FROM device WHERE Id = ${id}`;
    return await getData(query);
}

async function getData(query) {
    const conn = await connect();
    const [rows] = await conn.query(query);
    return rows;
}

module.exports = {selectDevices, selectDeviceById, removeDeviceById}