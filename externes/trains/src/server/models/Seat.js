const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model definition

SeatSchema = new Schema({
    seatId : {
        type: Number,
        require: true
    },
    seatClasse : {
        type: String,
        require: true
    },
    price : {
        type : Number,
        require: true
    },
    taken : {
        type : Boolean,
        require : true
    }
});


mongoose.model('seat', SeatSchema);
const Seat = mongoose.model('seat');

module.exports = Seat;