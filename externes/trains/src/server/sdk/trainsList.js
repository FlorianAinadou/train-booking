const TrainModel = require('../models/Train');

async function getTrainsList() {
    return await TrainModel.find();
}

async function getTrainsById(id) {
    return await TrainModel.find({'_id': id});
}

async function removeSeat(trainId) {
    const result = await TrainModel.findOne({ '_id': trainId });
    // console.log(result.remainingSeats);
    const actualRemainingSeats = result.remainingSeats;
    // console.log(actualRemainingSeats)
    const update  =  {
        $set: {
            remainingSeats:
            actualRemainingSeats-1
        },
      };
    return await TrainModel.updateOne({ '_id': trainId }, update);
}

async function relieveSeat(trainId) {
    const result = await TrainModel.findOne({ '_id': trainId });
    // console.log(result.remainingSeats);
    const actualRemainingSeats = result.remainingSeats;
    // console.log(actualRemainingSeats)
    const update  =  {
        $set: {
            remainingSeats:
            actualRemainingSeats+1
        },
      };
    return await TrainModel.updateOne({ '_id': trainId }, update);
}


module.exports = {
    getTrainsList,
    getTrainsById,
    removeSeat,
    relieveSeat
};
