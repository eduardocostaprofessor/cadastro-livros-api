const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')

const app = express(); //inicia o app
app.use(express.json())
app.use(cors())

let porta = process.env.PORT || 3002

// iniciando o DB
mongoose.connect(
    'mongodb://localhost:27017/controle-de-livros', 
    {useNewUrlParser: true} 
)
// models
requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'))

app.listen(porta)