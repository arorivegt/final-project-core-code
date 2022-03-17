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
    const connection = await dbConnection();
    await connection.exec(`CREATE TABLE IF NOT EXISTS TODO (
                    id NUMERIC PRIMARY KEY,
                    task_name TEXT,
                    is_complete NUMERIC
                   );
                `)

}

module.exports = {
    dbConnection,
    createToDoTable
}