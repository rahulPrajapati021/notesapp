const Note = require("../models/Note");
const {getUserIdByEmail} = require("../functions/userFunctions");
const { notify } = require("../app");
const { Sequelize } = require("sequelize");

async function test(req, res) {
    res.status(200).json({msg: "test"})
}

// routes -
// getAllNotes
async function getAllNotes(req, res) {
    let userId = await getUserIdByEmail(req.userEmail)
    let notes = await Note.findAll({where: {UserId: userId}});
    res.status(200).json({msg: "all_notes", data: notes})
}
// getOneNote
async function getOneNote(req, res) {
    let noteId = req.params.id;
    if(!noteId) {
        return res.status(400).json({msg: "note id is required"})
    }
    let userId = await getUserIdByEmail(req.userEmail);
    let note = await Note.findOne({where: {[Sequelize.Op.and]: [{UserId: userId}, {id: noteId}]}})
    res.json({msg: "one_note", data: note})
}
// createNote
async function createNote(req, res) {
    let {title, content} = req.body
    if(!content) {
        return res.status(400).json({msg: "content cannot be empty"})
    }
    let id = await getUserIdByEmail(req.userEmail)
    let note = await Note.create({title: title, content: content, UserId: id})
    res.json({msg: "created_note", data: note})
}
// updateNote
async function updateNote(req, res) {
    let noteId = req.params.id
    let {title, content} = req.body;
    if(!noteId) {
        return res.status(400).json({msg: "note id is required"})
    }
    let UserId = await getUserIdByEmail(req.userEmail)
    if(!content) {
        return res.status(400).json({msg: "content cannot be empty"})
    }
    let note = await Note.findByPk(noteId)
    if(!note) {
        return res.status(400).json({msg: "Note doesn't exists"})
    }
    if(note.UserId != UserId) {
        return res.status(401).json({msg: "Unatuhorized to edit the note"})
    }
    await note.update({title, content})

    res.json({msg: "updated_note", data: note})
}
// deleteNote
async function deleteNote(req, res) {
    let noteId = req.params.id
    if(!noteId) {
        return res.status(400).json({msg: "Note id is required"})
    }
    let userId = await getUserIdByEmail(req.userEmail)
    let note = await Note.findByPk(noteId)
    if(!note) {
        return res.status(400).json({msg: "Note doesn't exists"})
    }
    if(note.UserId != userId) {
        return res.status(401).json({msg: "Note doesn't exists"})
    }
    note.destroy()
    res.json({msg: "deleted_note", data: note})
}

module.exports = {test, getAllNotes, getOneNote, createNote, updateNote, deleteNote}