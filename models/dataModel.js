const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Data instance should have a name"],
        unique: [true, "Such data already exists"]
    },
    media_url:{
        type: String,
        required: false,
        unique: false,
        trim: true
    }
})


const Data = new mongoose.model("Data", dataSchema);

module.exports = Data;