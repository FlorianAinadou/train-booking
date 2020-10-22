const TrainModel = require('../models/Train');

async function getTrainsList() {
    return TrainModel.find();
}

module.exports = {
    getTrainsList
};
