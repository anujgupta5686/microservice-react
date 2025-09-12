import express from "express"
import axios from "axios";
const app = express();

const PORT = 8005;

app.use(express.json());
app.post("/events", (req, res) => {
    const events = req.body;
    axios.post("http://localhost:8000/events", events) //Snippet Service
    axios.post("http://localhost:8001/events", events) // Comment Service
    axios.post("http://localhost:8002/events", events) //Query Service
    return res.status(200).json({});
})
app.listen(PORT, () => {
    console.log(`Message Broker server start at post ${PORT}`)
})