const { Router } = require('express');
const { getToDO, postToDo } = require('../controllers/todo.controller');

const router = Router();

/**
 * {{url}}/api/todo
 */

//get all toDo
router.get('/', getToDO);

//get a toDo by id - public
router.get('/:id', getToDO);

//create toDo - private - everyone with a valid token
router.post('/', postToDo);

//update toDo - private - everyone with a valid token
router.put('/', ( req, res) => {
    res.json({
        msj : "put"
    })
});

//deelete toDo - private - everyone with a valid token and if it's admin
router.delete('/', ( req, res) => {
    res.json({
        msj : "delete"
    })
});

module.exports = router;