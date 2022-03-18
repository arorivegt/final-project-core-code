const { response, request } = require('express');
const { 
    insertToDo, 
    selectAllToDo, 
    selectToDoById, 
    updateToDo, 
    deleteAllToDo,
    deleteDBToDoById
} = require('../database/config');

const getToDo = async (req = request, res = response) => {

    try {
        const result = await selectAllToDo()
        console.log(result);
        return res.status(400).json(result)
    } catch (error) {
        throw new Error(error)
    }
}

const getToDOById = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const result = await selectToDoById(id)
        console.log(result);
        return res.status(400).json(result)
    } catch (error) {
        throw new Error(error)
    }
}

const postToDo = async (req = request, res = response) => {
    try {
        const { task_name, description} = req.body;

        if(!task_name){
            return res.status(500).json({
                msj: "You need to send task name"
            })
        }

        const resultInsert = await insertToDo(task_name, description, false)
        console.log(resultInsert);
        return res.status(400).json({
            msj: `ToDO insert successfully ${resultInsert.lastID}`
        })
    } catch (error) {
        throw new Error(error)
    }
}

const putToDo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { task_name, description, is_complete} = req.body;
        const resultUpdate = await updateToDo(id, task_name, description, is_complete)
        console.log(resultUpdate);
        return res.status(400).json({
            msj: `ToDO udated successfully ${resultUpdate.lastID}`
        })
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToDo = async (req = request, res = response) => {
    try {

        const resultDelete = await deleteAllToDo()
        console.log(resultDelete);
        if(resultDelete.changes === 0){
            return res.status(500).json({
                msj: `Delete All Todo unsuccessfully`
            })
        }
        return res.status(400).json({
            msj: `All ToDO delete successfully`
        })
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToDoById = async (req = request, res = response) => {
    try {

        const { id } = req.params;
        const resultDelete = await deleteDBToDoById(id)
        console.log(resultDelete);

        if(resultDelete.changes === 0){
            return res.status(500).json({
                msj: `Delete Todo ${id} unsuccessfully`
            })
        }
        return res.status(400).json({
            msj: `Delete Todo ${id} successfully`
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getToDo,
    getToDOById,
    postToDo,
    putToDo,
    deleteToDo,
    deleteToDoById
}