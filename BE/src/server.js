import express from "express"
import pool from "./config/database.js"
import {env} from "./config/environment.js"
import {APIs} from './routes/index.js'


const START_SERVER = () => {
    const app = express()
    app.use(express.json())
    app.use("/", APIs)
    // app.use("/api/tasks", API.taskRoutes)
    // app.get("/api/db-test", async (req, res) => {
    //     try {
    //         const [rows] = await pool.query("SELECT NOW() as now");
    //         res.json({ success: true, time: rows[0].now })
    //     } catch (err) {
    //         res.status(500).json({ success: false, error: err.message })
    //     }
    // })

    app.listen(env.APP_PORT, () => console.log(`Server running at http://localhost:${env.APP_PORT}`))
}


START_SERVER()


