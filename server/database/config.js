const sqlite3 = require("sqlite3")
const {open} = require("sqlite")

const dbConnection = async()   => {
    try{
        const db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        })

        console.log('Databse is connected');
        return db;
    }catch( err ){
        throw new Error('Error when you try to initialize the database')
    }
}

const createToDoTable = async() =>  {
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

const insertToDoTable = async(task_name, description = "", is_complete = false) => {
    const db = await dbConnection();
    const result = await db.run(`INSERT INTO TODO(task_name, description, is_complete)  
                                 VALUES (?,?,?)`, task_name,description,is_complete)
    await db.close()
    return result;
}

module.exports = {
    dbConnection,
    createToDoTable,
    insertToDoTable
}