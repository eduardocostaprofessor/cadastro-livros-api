const mongoose = require('mongoose')

//model que vai usar
const Note = mongoose.model('Book')


module.exports = {

    async readAll(req, res) {
        const { page = 1 } = req.query
        const userId = req.body.userId
        await Book.find({userId})
        notes = await Book.paginate({}, { page, limit: 5 })

        return res.json(notes)
    },

    async read(req, res) {
        const userId = req.body.userId
        const noteId = req.params.id

        const notes = await Book.find({ _id: noteId, userId })

        return res.json(notes)
    },

    async insert(req, res) {

        if (typeof req.body.userId === "undefined")
            return res.json({ error: "favor informar o usuário" })

        const notes = await Book.create(req.body)

        return res.json(notes)
    },

    async update(req, res) {
        const notes = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(notes)
    },

    async delete(req, res) {
        await Book.findByIdAndRemove(req.params.id)

        return res.json('Apagado com sucesso')
    }
}