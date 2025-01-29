import express from "express";
import connectToMongo from "./utils/db.js";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./utils/corsOptions.js";
import rootRouter from "./routes/index.js"
import { authMiddleware } from "./middlewares/auth.js";
dotenv.config();
const PORT = 3000 | process.env.PORT

const app = express();
connectToMongo()

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => res.json({ msg: "help" }))
// app.get('/test', authMiddleware, (req, res) => console.log(req.userId))

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log('Server listening to port: ', PORT)
})