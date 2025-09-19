import express from "express"
import {env} from "./config/environment.js"
import {APIs} from './routes/index.js'
import cors from "cors"
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js"
const START_SERVER = () => {
    const app = express()
    // Cho phép frontend localhost:5173 truy cập
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // nếu có dùng cookie
    }));
    app.use(express.json())
    app.use("/", APIs)
    // Xử lý lỗi tập trung
    app.use(errorHandlingMiddleware)
    app.listen(env.APP_PORT, () => console.log(`Server running at http://localhost:${env.APP_PORT}`))
}


START_SERVER()


