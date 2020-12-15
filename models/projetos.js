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
    },
    atividades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Atividade'
    }]
})

projetoSchema.plugin(normalize);

var Projetos = mongoose.model('Projeto', projetoSchema);

module.exports = Projetos;
