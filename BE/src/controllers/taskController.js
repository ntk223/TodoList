import { taskService } from '../services/taskService.js';
import asyncHandler from '../utils/asyncHandler.js';
const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
})

const createTask = async (req, res) => {
    const newTask = req.body;
    const createdTask = await taskService.createTask(newTask);
    res.status(201).json(createdTask);
}

const getTaskById = (req, res) => {
    res.send(`Get task with ID: ${req.params.id}`)
}

const updateTask = asyncHandler(async (req, res) => {
    const fields = req.body;
    if (Object.keys(fields).length === 0) {
        return res.status(400).send('No fields to update.');
    }
    const updatedTask = await taskService.updateTask(req.params.id, fields);
    res.status(200).json(updatedTask);
    
})

const deleteTask = asyncHandler(async (req, res) => {
    const deleted = await taskService.deleteTask(req.params.id)
    if (deleted) {
        return res.json('Delete Success')
    }
    else {
        res.status(404).send(`Task with ID: ${req.params.id} not found.`);
    }
})

const getTaskByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    const tasks = await taskService.getTaskByUserId(userId);
    res.json(tasks);
})


export const taskController = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskByUserId,
}
