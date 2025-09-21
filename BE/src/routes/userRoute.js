import express from "express"
import {userController} from '../controllers/userController.js'
import verifyToken from "../middlewares/verifyToken.js"
const Router = express.Router()
Router.use(verifyToken) // Apply auth middleware to all user routes

Router.get("/", (req, res) => {
    res.send("User route is working")
})

// Router.get('/:id')
Router.put('/:id', userController.changeProfile)

export const userRoute = Router
