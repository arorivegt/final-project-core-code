const { response, request } = require('express');
const { insertToDoTable } = require('../database/config');

const getToDO = async (req = request, res = response) => {
    return res.status(400).json({
        msj: 'get user correctly'
    })
}

const postToDo =  async (req = request, res = response) => {
    try { 
        const resultInsert = await insertToDoTable(1111,"prueba",false)
        console.log(resultInsert);
        return res.status(400).json({
            msj: `ToDO Insert Correctly ${resultInsert.lastID}`
        })
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    getToDO,
    postToDo,
}