import axios from "axios";
import express from "express"
import cors from "cors";
const app = express();
app.use(express.json());
const PORT = 8002;
app.use(cors({
    orgin: "http://localhost:5173",
    credentials: true
}))

const snippets = {};
app.get("/snippets", (_, res) => {
    return res.status(200).json(snippets)
})
app.post("/events", (req, res) => {
    const { type, data } = req.body;
    if (type === "SnippetCreated") {
        const { id, title } = data;
        snippets[id] = { id, title, comments: [] };
    }
    if (type === "CommentCreated") {
        const { id, content, snippetId } = data;
        snippets[snippetId].comments.push({ id, content })
    }
    return res.status(200).json({})
})

app.listen(PORT, () => {
    console.log(`Query server start at post ${PORT}`)
})