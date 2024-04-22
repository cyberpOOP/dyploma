const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    url:{
        type: String,
        required: [true, "Data instance should have an url"],
        unique: [true, "Such instance already exists"],
        trim: true
    },
    article:{
        type: String,
        required: false,
        unique: false,
        trim: true
    }
})


const Data = new mongoose.model("Data", dataSchema);

module.exports = Data;