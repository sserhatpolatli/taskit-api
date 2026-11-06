const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/search', taskController.searchTasks);
router.get('/assignee/:assignee', taskController.getTasksByAssignee);

router.post('/', validationMiddleware, taskController.createTask); 
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validationMiddleware, taskController.updateTask); 
router.delete('/:id', taskController.deleteTask);

module.exports = router;