import sqlite3 from 'sqlite3'
const dbConnection = async() => {
    try{
        // open the database
        const db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        })

        console.log('Databse is connected');
    }catch( err ){
        throw new Error('Error when you try to initialize the database')
    }
}

module.exports = {
    dbConnection
}