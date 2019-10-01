const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    userId : {
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
        default : Date.now(),
        required: false
    },
    lastAlterBy : {
        type : Date,
        default : Date.now(),
        required: false
    }
})

BookSchema.plugin(mongoosePaginate)
mongoose.model('Book', BookSchema)