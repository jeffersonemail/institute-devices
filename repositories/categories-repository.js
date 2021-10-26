const db = require("../db/db");

async function getConnection() {
    return await db.connect();
}

async function selectCategories(){
    var query = "SELECT Id, Name FROM category";
    return await getData(query);
}

async function selectCategoryById(id){
    var query = `SELECT Id, Name FROM category WHERE Id = ${id}`;
    return await getData(query);
}

async function saveCategory(category){
    isValid = isValidCategory(category);

    if (isValid.isValid) {
        var query = `INSERT INTO category (Name) VALUES ('${category.Name}')`;
        return await getData(query);
    } else {
        throw { status: 400, message: isValid.message };
    }
}

async function removeCategoryById(id){
    var query = `DELETE FROM category WHERE Id = ${id}`;
    return await getData(query);
}

async function getData(query) {
    var conn = await getConnection();
    const [rows] = await conn.query(query);
    return rows;
}

function isValidCategory(category) {
    if (category == {}) {
        return { isValid: false, message: "Empty or invalid body." }; 
    }
    if (category.Name == undefined) {
        return { isValid: false, message: "Missing fields on body." }; 
    }
    if (typeof category.Name != 'string') { 
        return { isValid: false, message: "Field Name must be a string." }; 
    }

    return { isValid: true };
}

module.exports = {selectCategories, selectCategoryById, removeCategoryById, saveCategory}