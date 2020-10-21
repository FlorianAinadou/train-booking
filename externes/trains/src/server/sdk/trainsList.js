const trainslist = require('../mocks/trainsListMocks.json')

async function getTrainsList() {
    return trainslist;
}

// async function getTrainsWithForm(departureDate, departureStation, arrivalStation) {
//     return TrainModel.find({'full': false, 'date': {$gt:new Date(departureDate)}, routes :{ $all: [ departureStation , arrivalStation ] } });
// }

module.exports = {
    getTrainsList
};
