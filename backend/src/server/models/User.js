const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    nationality: {
        type: String,
    },
    birthday: {
        type: Date
    }
});


mongoose.model('user', UserSchema);
const User = mongoose.model('user');

module.exports = User;
