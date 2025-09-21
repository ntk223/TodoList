import express from "express"
import {taskController} from "../controllers/taskController.js"
import { taskValidation } from "../validations/taskValidation.js"
import verifyToken from "../middlewares/verifyToken.js"

const Router = express.Router()
Router.use(verifyToken) // Apply auth middleware to all task routes
Router.get("/", taskController.getAllTasks)
Router.post("/", taskValidation.createTaskValidation, taskController.createTask)
Router.get("/:uid", taskController.getTaskByUserId)
Router.put("/:id", taskValidation.updateTaskValidation, taskController.updateTask)
Router.delete("/:id", taskController.deleteTask)

export const taskRoute = Router
