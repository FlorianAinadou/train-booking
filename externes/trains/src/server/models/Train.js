const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model definition

TrainSchema = new Schema({
    trainId : {
        type: Number,
        require: true
    },
    date : {
        type: Date,
        require: true
    },
    routes : {
        type : Array,
        require: true
    },
    full : {
        type : Boolean,
        require: true
    },
    seats : {
        type : Array,
        require: true
    },
    firstRemainingSeats : {
        type : Number,
        require: true
    },
    secondRemainingSeats : {
        type : Number,
        require: true
    }
});


mongoose.model('train', TrainSchema);
const Train = mongoose.model('train');

module.exports = Train;