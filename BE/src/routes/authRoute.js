import express from "express"
import { authController } from "../controllers/authController.js"

const Router = express.Router()

Router.post("/login",  authController.login)

Router.post("/register", authController.register)

Router.post("/refresh", authController.refreshToken)

export const authRoute = Router
