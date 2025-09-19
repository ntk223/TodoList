import {body} from 'express-validator'
import validate from '../middlewares/validate.js';

const createTaskValidation = [
    body("title").notEmpty().withMessage("Title is required")
    .isLength({max: 100}).withMessage("Title can be at most 100 characters long"),
    body("description").optional()
    .isLength({max: 255}).withMessage("Description can be at most 255 characters long"),   
    body("priority").isIn(["low", "medium", "high"]).withMessage("Priority must be one of: low, medium, high"),
    body("due_date").isISO8601().withMessage("Due date must be a valid date"),
    body("user_id").isInt().withMessage("User ID must be an integer"),
    validate,
];

const taskTest = {
    title: "Test Task",
    description: "This is a test task",
    priority: "medium",
    due_date: "2023-10-10",
    user_id: 1
};

const updateTaskValidation = [
    body("title").optional().isLength({max: 100}).withMessage("Title can be at most 100 characters long"),
    body("description").optional().isLength({max: 255}).withMessage("Description can be at most 255 characters long"),   
    body("priority").optional().isIn(["low", "medium", "high"]).withMessage("Priority must be one of: low, medium, high"),
    body("due_date").optional().isISO8601().withMessage("Due date must be a valid date"),
    validate,
];
export const taskValidation = {
    createTaskValidation,
    updateTaskValidation
}
