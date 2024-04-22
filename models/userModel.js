const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'User should have a name'],
        unique: false,
        trim: true
    },
    email:{
        type: String,
        required: [true, "User should have an email"],
        unique: [true, "Such user exists"],
        trim: true
    },
    password:{
        type: String,
        require: [true, 'User should have a password'],
        trim: true,
        select: false
    },
    role:{
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'user'
    },
    status:{
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model("User", userSchema);

module.exports = User;