const mongoose = require('mongoose');
const Schema = mongoose.Schema;

InvitationSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver : {
        type:String,
        required: true
    }
});


mongoose.model('invitation', InvitationSchema);
const Invitation = mongoose.model('invitation');

module.exports = Invitation;
