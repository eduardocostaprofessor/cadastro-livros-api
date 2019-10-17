const express = require('express')
const routes = express.Router()

/*
 * controllers
 */
const UserController = require('./controllers/UserController')
const BookController = require('./controllers/BookController')
const BookOutController = require('./controllers/BookOutController')

/*
 * rotas
 */

// users
/**
 * Carrega todos os usuários
 * @route GET /api/users
 * @group Usuários - Operações em usuários
 * @returns {object} 200 - 
 *      Retorna um Array de Objetos com todos os usuários e dados de paginação
 *      
 * @returns {Error}  Error - Unexpected error
 */
routes.get('/users', UserController.readAll)

/**
 * Carrega todos os usuários
 * @route GET /api/users/:id
 * @param {string} user.query
 * @group Usuários - Operações em usuários
 * @returns {object} 200 - 
 *      Retorna um Array de Objetos com todos os usuários e dados de paginação
 * 
 *      example code
 *      
 * @returns {Error}  Error - Unexpected error
 */
routes.get('/users/:id', UserController.read)

/**
 * Carrega todos os usuários
 * @route POST /api/usersLogin
 * @group Usuários - Operações em usuários
 * @param {string} user.body.required - Passar um  json no body user e password {"user" : "eduardo.costa", "password" : "111}
 * 
 * 
 * @returns {User.model} 200 - 
 *      Retorna um Array de Objetos com todos os usuários e dados de paginação
 * 
 *      example code
 *      
 * @returns {Error}  Error - Unexpected error
 */
routes.post('/usersLogin/', UserController.login)
routes.post('/users', UserController.insert)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)


//books
routes.get('/books', BookController.readAll)
routes.get('/books/:id', BookController.read)
routes.post('/books', BookController.insert)
routes.put('/books/:id', BookController.update)
routes.delete('/books/:id', BookController.delete)

//books out
routes.post('/booksOut', BookOutController.insert)

module.exports = routes