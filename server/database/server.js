const express = require('express')
const cors = require('cors');
const { createToDoTable } = require('./config');
require('dotenv').config();

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.path = {
            todo: '/api/todo',
        }
        
        //connect to database and create ToDo Table
        this.createToDoTable();

        ///Middlewares -> there are a  new funcionality where is execute when we do a request and after the backed do something, 
        //the middlewares do something
        this.middlewares()

        this.routes();
    }


    async createToDoTable(){
        await createToDoTable();
    }

    
    middlewares(){
        //CORS
        this.app.use ( cors() );

        //read and parse body
        this.app.use( express.json() );
    }


    routes() {
        this.app.use(this.path.todo, require('../routes/todo'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listening on port',this.port)
        })
    }
}

module.exports = Server;