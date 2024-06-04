const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'material should have a name'],
        trim: true,
        unique: false
    },
    data_ids:{
        type: [String]
    },
    articles: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    external_urls:{
        type: [String],
        required: false,
        unique: false,
        trim: true
    }
})

const Material = new mongoose.model("Material", materialSchema);

module.exports = Material;