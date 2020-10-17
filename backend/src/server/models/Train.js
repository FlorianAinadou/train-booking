const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model definition

TrainSchema = new Schema({
    id : {
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
    }
});


mongoose.model('train', TrainSchema);
const Train = mongoose.model('train');

module.exports = Train;