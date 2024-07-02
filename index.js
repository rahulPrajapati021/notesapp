require("dotenv").config()
const app = require("./app")
const {connectDatabase} = require("./config/database")
const {User, Note} = require("./models/association")

connectDatabase()

const serverPort = process.env.PORT || 4040;

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})