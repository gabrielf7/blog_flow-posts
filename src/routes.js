const express = require('express');
const routes = express.Router();
const user = require('./controller/user.controller');
const posts = require('./controller/posts.controller');

// autenticacao
routes.post('/autenticacao/', user.autenticacao);

// Usuarios
routes.get('/user', user.index);
routes.post('/user/new_user', user.create);
routes.get('/user/listar_user', user.listar);
routes.get('/user/listar_detalhes/:_id', user.listarDetalhes);
routes.delete('/user/deletar_user/:_id', user.deletar);
routes.put('/user/atualizar_user', user.atualizar);

// posts
routes.get('/posts', posts.index_post);
routes.post('/posts/new_post', posts.create_post);
routes.get('/posts/listar_post', posts.listar);
routes.get('/posts/listar_detalhes/:_id', posts.listarDetalhes);
routes.delete('/posts/deletar_post/:_id', posts.deletar);
routes.put('/posts/atualizar_post', posts.atualizar);

module.exports = routes;