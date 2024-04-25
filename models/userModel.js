const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email is invalid']
    },
    password:{
        type: String,
        require: [true, 'User should have a password'],
        trim: true,
        select: false,
        minlength: [8, 'Password should have at least 8 symbols']
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

userSchema.methods.checkPassword = async function(checkPass, userPass){
    return checkPass === userPass
}

const User = new mongoose.model("User", userSchema);

module.exports = User;