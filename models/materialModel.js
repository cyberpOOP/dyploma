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
    }
})

const Material = new mongoose.model("Material", materialSchema);

module.exports = Material;