const crypto = require('crypto');
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
    passwordDate: {
        type: Date,
        default: Date.now() - 1000
    },
    passwordResetToken: String,
    passwordResetExpired: Date,
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

userSchema.pre('save', function(next){
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordDate = Date.now() - 1000;
    next();
})

userSchema.methods.checkPassword = async function(checkPass, userPass){
    return checkPass === userPass
}

userSchema.methods.changedPassword = function(JWTTimeStamp){
    if (this.passwordDate){
        const passTime = parseInt(this.passwordDate.getTime() /1000, 10);

        return JWTTimeStamp < passTime
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpired = Date.now() + 10 * 60000;

    return resetToken;
}

const User = new mongoose.model("User", userSchema);

module.exports = User;