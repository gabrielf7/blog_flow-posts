const Posts = require('../models/posts.model');

module.exports = ({
  async index_post(req, res) {
    res.json('Area dos Posts');
  },
  async create_post(req, res) {
    const { de, para, assunto, textoGrande } = req.body;
    let data = {};
    data = { de, para, assunto, textoGrande };
    post = await Posts.create(data);
    if (res.status === 500) {
      return res.status(500).json("Erro, servidor inativo.");
    }
    return res.status(200).json(post);
  },
  async listar(req, res) {
    const post = await Posts.find();
    res.json(post);
  },
  async listarDetalhes(req, res) {
    const { _id } = req.params;
    const post = await Posts.findOne({ _id });
    if (!post) {
      res.status(500);
    } else {
      res.json(post);
    }
  },
  async deletar(req, res) {
    const { _id } = req.params;
    const post = await Posts.findByIdAndDelete({ _id });
    res.json(post);
  },
  async atualizar(req, res) {
    const { _id, de, para, assunto, textoGrande } = req.body;
    let data = { de, para, assunto, textoGrande };
    const post = await Posts.findByIdAndUpdate({ _id }, data, { new: true });
    res.json(post);
  }
});