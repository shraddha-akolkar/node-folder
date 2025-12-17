const express = require('express');
const { addTodo, getAllTodos, gettTodos, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const { authenticate } = require('../controllers/user.controller');

const router = express.Router();

router.post('/add-todo', authenticate, addTodo);
router.get('/all-todos', authenticate, getAllTodos);
router.get('/:id', authenticate, gettTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;