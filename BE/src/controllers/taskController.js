import {taskModel} from '../models/taskModel.js';

const getAllTasks = async (req, res) => {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
}

const createTask = async (req, res) => {
    const newTask = req.body;
    const createdTask = await taskModel.createTask(newTask);
    res.status(201).json(createdTask);
}

const getTaskById = (req, res) => {
    res.send(`Get task with ID: ${req.params.id}`)
}

const updateTask = async (req, res) => {
    const fields = req.body;
    if (Object.keys(fields).length === 0) {
        return res.status(400).send('No fields to update.');
    }
    const updatedTask = await taskModel.updateTask(req.params.id, fields);
    if (updatedTask) {
        res.status(200).json(updatedTask);
    } else {
        res.status(404).send(`Task with ID: ${req.params.id} not found.`);
    }
}

const deleteTask = async (req, res) => {
    const deleted = await taskModel.deleteTask(req.params.id)
    if (deleted) {
        return res.json('Delete Success')
    }
    else {
        res.status(404).send(`Task with ID: ${req.params.id} not found.`);
    }
}

const getTaskByUserId = async (req, res) => {
    const userId = req.params.uid;
    const tasks = await taskModel.getTaskByUserId(userId);
    res.json(tasks);
}


export const taskController = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskByUserId,
}
