import express from "express"
import {env} from "./config/environment.js"
import {APIs} from './routes/index.js'
import cors from "cors"
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js"
import { corsOptions } from "./config/cors.js"
const START_SERVER = () => {
    const app = express()
    app.use(cors(corsOptions))

    app.use(express.json())
    app.use("/", APIs)
    // Xử lý lỗi tập trung
    app.use(errorHandlingMiddleware)
    app.listen(env.APP_PORT, () => console.log(`Server running at http://localhost:${env.APP_PORT}`))
}


START_SERVER()


