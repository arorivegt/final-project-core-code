const { Router } = require('express');
const { 
    getToDo,
    getToDOById,
    postToDo, 
    putToDo,
    deleteToDo,
    deleteToDoById
} = require('../controllers/todo.controller');

const router = Router();

/**
 * {{url}}/api/todo
 */

//get all toDo
router.get('/', getToDo);

//get a toDo by id - public
router.get('/:id', getToDOById);

//create toDo - private - everyone with a valid token
router.post('/', postToDo);

//update toDo - private - everyone with a valid token
router.put('/:id', putToDo);

//delete All toDo - private - everyone with a valid token and if it's admin
router.delete('/', deleteToDo);

//delete toDo by id - private - everyone with a valid token and if it's admin
router.delete('/:id', deleteToDoById);

module.exports = router;