const express = require('express');
const { NoteModel } = require('../model/Note.model');

const noteRouter = express.Router();

noteRouter.post('/create', async (req, res) => {
    // const { title, body, category } = req.body;
    // console.log(req.body);
    try {
        const newNote = new NoteModel(req.body);
        await newNote.save();
        res.status(200).send({ msg: "New noted created." })
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})



noteRouter.get('/', async (req, res) => {
    try {
        const notes = await NoteModel.find({ authorId: req.body.authorId });
        res.status(200).send(notes)
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})



noteRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const note = await NoteModel.findOne({ _id: id });
        res.status(200).send(note)
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})



noteRouter.patch('/update/:noteId', async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId })
    try {
        if (req.body.authorId !== note.authorId) {
            res.status(200).send({ msg: "You are not authorized to do this.." })
        }
        else {
            await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
            res.status(200).send({ msg: `The note with id:${noteId} has been updated.` })
        }
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})


noteRouter.delete('/delete/:noteId', async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId })
    try {
        if (req.body.authorId !== note.authorId) {
            res.status(200).send({ msg: "You are not authorized to do this.." })
        }
        else {
            await NoteModel.findByIdAndDelete({ _id: noteId });
            res.status(200).send({ msg: `The note with id:${noteId} has been deleted.` })
        }
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = {
    noteRouter
}