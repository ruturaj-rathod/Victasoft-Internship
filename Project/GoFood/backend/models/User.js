const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT, {
        expiresIn: 1000 * 60 * 60 * 24
    });
}

module.exports = mongoose.model('user', UserSchema);