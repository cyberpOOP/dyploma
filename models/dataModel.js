const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Data instance should have a name"],
        unique: [true, "Such data already exists"]
    },
    urls:{
        type: [String],
        required: false,
        unique: [true, "Such instance already exists"],
        trim: true
    },
    article: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    media:{
        type: [String],
        required: false,
        unique: false,
        trim: true
    }
})


const Data = new mongoose.model("Data", dataSchema);

module.exports = Data;