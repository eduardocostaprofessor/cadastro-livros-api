const mongoose = require('mongoose')

//model que vai usar
const BookOut = mongoose.model('BookOut')


module.exports = {

    async readAll(req, res) {
        const { page = 1 } = req.query
        const userId = req.body.userId
        await BookOut.find({ userId })
        notes = await BookOut.paginate({}, { page, limit: 5 })

        return res.json(notes)
    },

    async read(req, res) {
        const bookId = req.params.id

        try {
            const books = await BookOut.find({ _id: bookId })

            if(books.length == 0) return res.json({ error: 'Livro não registrado' })

            return res.json(books)
        } catch (error) {
            return res.json({ error: 'Erro ao buscar o livro' })
        }

    },

    async insert(req, res) {
        const books = req.body;
    
        // if (typeof books.userId === "undefined") return res.json({ error: "favor informar o usuário" })

        try {
            const bookInserted = await BookOut.create(books)

            return res.json(bookInserted)
        } catch (error) {
            // return res.json({error: 'Erro ao cadastrar o livro'})
            return res.json({error: error})
        }
    },

    async update(req, res) {
        const notes = await BookOut.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(notes)
    },

    async delete(req, res) {
        
        try {
            if (!await BookOut.findByIdAndRemove(req.params.id)) return res.json({ error: 'Livro não registrado'} )
            
            await BookOut.findByIdAndRemove(req.params.id)
            
            return res.json('Apagado com sucesso')
        } catch (error) {
            return res.json({ error: 'Erro ao apagar o livro' })
        }

    }
}