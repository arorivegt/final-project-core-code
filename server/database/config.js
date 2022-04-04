const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
require('dotenv').config();

const dbConnection = async()   => {
    try{
        const db = await open({
            filename: process.env.DATABASE,
            driver: sqlite3.Database
        })
        console.log('Databse is connected');
        return db;
    }catch( err ){
        throw new Error('Error when you try to initialize the database')
    }
}

const createToDo = async() =>  {
    const db = await dbConnection();
    await db.exec(`CREATE TABLE IF NOT EXISTS TODO (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    task_name TEXT,
                    description TEXT,
                    is_complete NUMERIC DEFAULT 0
                   );
                `)
    await db.close()
}

const selectAllToDo = async() => {
    const db = await dbConnection();
    const result = await db.all(`SELECT * FROM TODO`)
    await db.close()
    return result;
}

const selectToDoById = async(id) => {
    const db = await dbConnection();
    const result = await db.get(`SELECT * FROM TODO WHERE id = ?`, id)
    await db.close()
    return result;
}

const insertToDo = async(task_name, description = "", is_complete = false) => {
    const db = await dbConnection();
    const result = await db.run(`INSERT INTO TODO(task_name, description, is_complete)  
                                 VALUES (?,?,?)`, task_name,description,is_complete)
    await db.close()
    return result;
}

const updateToDo = async(id, task_name, description = "", is_complete = false) => {
    const db = await dbConnection();
    const result = await db.run(`UPDATE TODO SET task_name = ?, description = ?, is_complete= ?  
                                WHERE id = ?`, task_name,description,is_complete,id)
    await db.close()
    return result;
}

const deleteAllToDo = async() => {
    const db = await dbConnection();
    const result = await db.run(`DELETE FROM TODO`)
    await db.close()
    return result;
}

const deleteDBToDoById = async(id) => {
    const db = await dbConnection();
    const result = await db.run(`DELETE FROM TODO WHERE id = ?`, id)
    await db.close()
    return result;
}

module.exports = {
    dbConnection,
    createToDo,
    selectAllToDo,
    selectToDoById,
    insertToDo,
    updateToDo,
    deleteAllToDo,
    deleteDBToDoById
}