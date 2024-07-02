const express = require("express")
const { verifyToken } = require("../middleware/verfiyToken")
const router = express.Router()
const {test, getAllNotes, getOneNote, createNote, updateNote, deleteNote} = require("../controllers/notesController")

router.use(verifyToken)

router.get("/test", test)
router.get("/getAllNotes", getAllNotes)
router.get("/getOneNote/:id", getOneNote)
router.post("/createNote", createNote)
router.put("/updateNote/:id", updateNote)
router.delete("/deleteNote/:id", deleteNote)


module.exports = router