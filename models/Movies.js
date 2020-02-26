const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: { type: String, unique: true, default: '' },
    rating: { type: String, default: '' },
    synopsis: { type: String, default: '', trim: true },
    releaseYear: { type: String, default: '' },
    genre: { type: String, default: '' },
    director: { type: String, default: '' },
    boxOffice: { type: String, default: '' }
});

module.exports = mongoose.model('movies', MovieSchema);
