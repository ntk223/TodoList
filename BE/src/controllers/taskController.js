
const getAllTasks = (req, res) => {
    res.send("Get all tasks")
}

const createTask = (req, res) => {
    res.send("Create a new task")
}

const getTaskById = (req, res) => {
    res.send(`Get task with ID: ${req.params.id}`)
}

const updateTask = (req, res) => {
    res.send(`Update task with ID: ${req.params.id}`)
}

const deleteTask = (req, res) => {
    res.send(`Delete task with ID: ${req.params.id}`)
}

export const taskController = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
}
