const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
// 10.34.23.182 localhost
mongoose.connect('mongodb://localhost:27017/blog_flow-posts', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('MongoDB conectado com sucesso')
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(routes);
app.get('/', function (req, res) {
  res.json('Página inicial - Home');
});

app.listen(5000, function () {
  console.log('Servidor rodando de boas na porta 5000 do localhost');
});
