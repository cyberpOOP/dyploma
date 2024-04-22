const mongoose = require('mongoose')

const courseSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course should have a name'],
        unique: false,
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Course should have a description'],
        unique: false,
        trim: true
    },
    //TODO add content_id[], authors[], members[] and progression fields
})

const Course = new mongoose.model("Course", courseSchema);
module.exports = Course;