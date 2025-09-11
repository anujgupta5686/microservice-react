import express from "express";
const app = express();
const PORT = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Comment Server listen at port ${PORT}`)
})