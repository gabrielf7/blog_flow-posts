const mongoose = require('mongoose');
const moment = require('moment');

const local = moment();

const dataSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  createdAt: { type: String, default: local.format('DD-MM-YYYY HH:mm:ss') },
  updatedAt: { type: String, default: local.format('DD-MM-YYYY HH:mm:ss') },
});

const users = mongoose.model('Users', dataSchema);
module.exports = users;