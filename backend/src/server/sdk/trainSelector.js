const TrainModel = require('../models/Train');

async function getTrainById(id) {
    return TrainModel.findOne({'trainId': Number(id)});
}

async function getTrainsWithForm(departureDate, departureStation, arrivalStation) {
    return TrainModel.find({'full': false, 'date': {$gt:new Date(departureDate)}, routes :{ $all: [ departureStation , arrivalStation ] } });
}

module.exports = {
    getTrainById,
    getTrainsWithForm
};