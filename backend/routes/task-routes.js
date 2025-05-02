const express = require('express');
const router = express.Router();
const taskService = require('../database/task-database-service');

// GET /tasks - Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const newTask = await taskService.createTask(title, description);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// PUT /tasks/:id - Update task status
router.put('/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean' });
    }

    try {
        const result = await taskService.updateTaskStatus(taskId, completed);
        res.json(result);
    } catch (error) {
        if (error.message === 'Task not found') {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(500).json({ error: 'Failed to update task' });
        }
    }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        await taskService.deleteTask(taskId);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Task not found') {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
});

module.exports = router; 