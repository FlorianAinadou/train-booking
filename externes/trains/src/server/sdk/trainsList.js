const TrainModel = require('../models/Train');

async function getTrainsList() {
    return await TrainModel.find();
}

async function getTrainsById(id) {
    return await TrainModel.find({'_id': id});
}


module.exports = {
    getTrainsList,
    getTrainsById
};
