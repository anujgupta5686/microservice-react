import express from "express";
import commentRouter from "./routes/comment.js"
import cors from "cors"
const app = express();
const PORT = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173/create",
    credentials: true
}))
app.post("/events", (req, res) => {
    console.log("Receive Event", req.body.type);
    return res.status(200).json({})
})
app.use("/api/v1/snippet", commentRouter)

app.listen(PORT, () => {
    console.log(`Comment Server listen at port ${PORT}`)
})