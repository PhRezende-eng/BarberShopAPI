import routes from "./router";
import express from "express";

const app = express()

app.use(express.json())
app.use(routes)

export default app