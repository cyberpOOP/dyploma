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
    members_ids:{
        type: [String],
        required: false
    },
    content_ids:{
        type: [String],
        required: false
    },
    authors_ids:{
      type: [String],
      required: [true, 'Course should have an author']
    }
})

const Course = new mongoose.model("Course", courseSchema);
module.exports = Course;