require("dotenv").config()
require("./db")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:5173" , credentials: true}))

app.listen(process.env.PORT,() => console.log("Server running on port: ",process.env.PORT))