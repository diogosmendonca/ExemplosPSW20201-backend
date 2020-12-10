const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const projetoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    sigla: {
        type: String,
        required: true,
    }
})

projetoSchema.plugin(normalize);

var Projetos = mongoose.model('Projeto', projetoSchema);

module.exports = Projetos;
