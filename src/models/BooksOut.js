const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const BookOutSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    turma : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : false
    },
    userId : {
        type: String,
        required : false
    },
    bookId : {
        type: String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required: false
    },
    alterAt : {
        type : Date,
        required: false
    },
    lastAlterBy : {//userId
        type : String,
        required: false
    }
})

BookOutSchema.plugin(mongoosePaginate)
mongoose.model('BookOut', BookOutSchema)