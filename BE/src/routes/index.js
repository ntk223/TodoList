import  express  from "express"
import {taskRoute} from './taskRoute.js'
import {userRoute} from './userRoute.js'

const Router = express.Router()

Router.use('/tasks', taskRoute)
Router.use('/users', userRoute)


export const APIs = Router