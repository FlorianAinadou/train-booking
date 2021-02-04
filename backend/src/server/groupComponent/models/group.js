const mongoose = require('mongoose');
const Schema = mongoose.Schema;

GroupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    usersnames: {
        type: Array,
        required: true
    },
    travelsNumber: {
        type: Number,
        required: true
    },
    users: {
        type: Array,
        require: true
    }
});


mongoose.model('group', GroupSchema);
const Group = mongoose.model('group');

module.exports = Group;
