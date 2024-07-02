const express = require("express");
const app = express();
const cors = require("cors")


app.use(express.static('dist'));


app.use(cors({
    origin: true,
    credentials: true
}))

//cookie parser

const cookieParser = require("cookie-parser")

app.use(cookieParser())

app.use(express.json())




// auth router
const authRoutes = require("./routes/authRoutes")

app.use('/api/auth', authRoutes)

//notes router
const notesRoute = require("./routes/notesRoutes")
app.use('/api/notes', notesRoute)

module.exports = app;
