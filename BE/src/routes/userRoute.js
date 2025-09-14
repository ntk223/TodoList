import express from "express"
import {userController} from '../controllers/userController.js'

const Router = express.Router()

Router.get("/", (req, res) => {
    res.send("User route is working")
})

// Router.get('/:id')
Router.put('/:id', userController.changeProfile)

export const userRoute = Router
