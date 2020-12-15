const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const atividadeSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    duracao: {
        type: Number,
        required: true,
    }
})

atividadeSchema.plugin(normalize);

var Atividades = mongoose.model('Atividade', atividadeSchema);

module.exports = Atividades;
