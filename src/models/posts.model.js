const mongoose = require('mongoose');
const moment = require('moment');

const local = moment();

const dataSchema = new mongoose.Schema({
  de: String,
  para: String,
  assunto: String,
  textoGrande: String,
  createdAt: { type: String, default: local.format('DD-MM-YYYY HH:mm:ss') },
  updatedAt: { type: String, default: local.format('DD-MM-YYYY HH:mm:ss') },
});

const posts = mongoose.model('Posts', dataSchema);
module.exports = posts;