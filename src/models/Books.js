const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const BookSchema = new mongoose.Schema({
    title : {
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

BookSchema.plugin(mongoosePaginate)
mongoose.model('Book', BookSchema)