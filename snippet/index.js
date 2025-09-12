import express from "express";
import cors from "cors";
import snippetRouter from "./routes/snippet.js"
const app = express();
const PORT = 8000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173/create",
    credentials: true
}))

app.use("/api/v1/snippet", snippetRouter);
// http://localhost:8000/api/v1/snippet
app.listen(PORT, () => {
    console.log(`Snippet Server listen at port ${PORT}`)
})