import express from "express"
import {taskController} from "../controllers/taskController.js"

const Router = express.Router()

Router.get("/", taskController.getAllTasks)
Router.post("/", taskController.createTask)
Router.get("/:id", taskController.getTaskById)
Router.put("/:id", taskController.updateTask)
Router.delete("/:id", taskController.deleteTask)

export const taskRoute = Router
