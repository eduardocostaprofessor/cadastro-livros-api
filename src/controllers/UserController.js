const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')

module.exports = {

    async readAll(req, res) {
        const { page = 1 } = req.query
        const users = await User.paginate({}, { page, limit: 5 })
        return res.json(users)
    },

    async read(req, res) {
        const users = await User.findById(req.params.id)
        return res.json(users)
    },

    async insert(req, res) {
        const { user } = req.body

        try {
            if (await User.findOne({ user })) return res.send({ error: 'usuário já registrado' })

            const userCreated = await User.create(req.body)
            userCreated.password = undefined
            return res.json(userCreated)
        } catch (error) {
            return res.send({ erro: 'Erro ao buscar o usuário' })
        }
    },

    async update(req, res) {
        try {
            const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

            return res.json(users)
        } catch (error) {
            return res.json({error: 'Usuário não encontrado'})    
        }
    },

    async delete(req, res) {
        const { id } = req.params
        
        try {
            await User.findByIdAndRemove(id)

            return res.json('Apagado com sucesso')
        } catch (error) {
            res.send({error: "Não foi possível remover o usuário"})            
        }
    },

    async login(req, res) {
        const { user, password } = req.body
        
        if (!user || !password) return res.send({ error: 'Dados insuficientes' })

        try {
            const userFinded = await User.findOne({ user }).select('+password')
            if (!userFinded) return res.send({ error: 'Erro Usuário não registrado' })

            const passOk = await bcrypt.compare(password, userFinded.password)//true/false
            
            if (!passOk) return res.send({ error: 'Erro ao autenticar o usuário' })
            
            userFinded.password = undefined
            return res.send(userFinded)

        } catch (error) {
            return res.send({ error: 'Erro ao buscar o usuário' })
        }
    },

}