const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
require('dotenv/config');

const app = express(); //inicia o app
app.use(express.json())
app.use(cors())

let porta = process.env.PORT || 3002

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// iniciando o DB
mongoose.connect(
    // 'mongodb://localhost:27017/controle-de-livros', 
    process.env.MONGO_URL, 
    {useNewUrlParser: true} 
    )
    // models
requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'))

app.listen(porta)