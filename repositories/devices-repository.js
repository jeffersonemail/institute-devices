const db = require("../db/db");

async function getConnection() {
    return await db.connect();
}

async function selectDevices(){
    var query = "SELECT device.Id, device.Category, category.Name, device.Color, device.partNumber FROM device JOIN category ON category.Id = device.category";
    return await getData(query);
}

async function selectDeviceById(id){
    var query = `SELECT device.Id, device.Category, category.Name, device.Color, device.partNumber FROM device JOIN category ON category.Id = device.category WHERE device.Id = ${id}`;
    return await getData(query);
}

async function saveDevice(device){
    isValid = isValidDevice(device);

    if (isValid.isValid) {
        var query = `INSERT INTO device (Category, Color, partNumber) VALUES (${device.Category}, '${device.Color}', ${device.partNumber})`;
        return await getData(query);
    } else {
        throw { status: 400, message: isValid.message };
    }
}

async function removeDeviceById(id){
    var query = `DELETE FROM device WHERE Id = ${id}`;
    return await getData(query);
}

async function getData(query) {
    var conn = await getConnection();
    const [rows] = await conn.query(query);
    return rows;
}

function isValidDevice(device) {
    if (device == {}) {
        return { isValid: false, message: "Empty or invalid body." }; 
    }
    if (device.Category == undefined || device.Color == undefined || device.partNumber == undefined ) {
        return { isValid: false, message: "Missing fields on body." }; 
    }
    if (typeof device.Category != 'number') { 
        return { isValid: false, message: "Field Category must be a number." }; 
    }
    if (typeof device.partNumber != 'number') { 
        return { isValid: false, message: "Field partNumber must be a number." }; 
    }
    if (typeof device.Color != 'string') { 
        return { isValid: false, message: "Field Color must be a string." }; 
    }

    return { isValid: true };
}

module.exports = {selectDevices, selectDeviceById, removeDeviceById, saveDevice}