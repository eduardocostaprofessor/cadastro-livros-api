const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const bcrypt = require('bcrypt')


/**
 * @typedef User
 * @property {string} name
 * @property {string} user
 * @property {string} password
 */
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    user : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true,
        select: false //não devolve este campo após a criação
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

//Roda antes de salvar o usuário
UserSchema.pre('save', async function(next){
    user = this
    // se nao teve alteração no campo senha, continua - next()
    if(!user.isModified('password')) return next()
    
    //criptografa a senha
    user.password = await bcrypt.hash(user.password, 10)
    return next()
})

UserSchema.plugin(mongoosePaginate)
mongoose.model('User', UserSchema)