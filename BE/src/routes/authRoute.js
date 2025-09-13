import express from "express"
import { authController } from "../controllers/authController.js"

const Router = express.Router()

Router.post("/login",  authController.login)

export const authRoute = Router
