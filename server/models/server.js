const express = require('express')
const cors = require('cors');
const { createToDoTable } = require('../database/config');

class Server {

    constructor(){
        this.app = express()
        this.port = 30000;
        
        //connect to database
        this.connectDataBase();

        ///Middlewares -> there are a  new funcionality where is execute when we do a request and after the backed do something, 
        //the middlewares do something
        this.middlewares()
    }


    async connectDataBase(){
        await createToDoTable();
    }

    
    middlewares(){

        //CORS
        this.app.use ( cors() );

        //read and parse body
        this.app.use( express.json() );

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listening on port',this.port)
        })
    }
}

module.exports = Server;