const TrainModel = require('../models/Train');

async function getTrainsList() {
    return await TrainModel.find();
}

async function getTrainsById(id) {
    return await TrainModel.find({'_id': id});
}

async function addATrain(newTrainId, newSeats){
    return await TrainModel.create({
        trainId: newTrainId,
        date: Date.now(),
        routes: [
            'Nice','Lyon','Paris'
        ],
        full: false,
        seats : newSeats,
        firstRemainingSeats: 50,
        secondRemainingSeats: 100,
    });
}

async function removeSeat(trainId, seatClasse) {
    const result = await TrainModel.findOne({ '_id': trainId });
    if (determineClasse(seatClasse)){
        const currentFirstRemainingSeats = result.firstRemainingSeats;
        const update = {
            $set: {
                firsRemainingSeats: currentFirstRemainingSeats -1
            },
        };
        return await TrainModel.updateOne({ '_id': trainId }, update);
    }else{
        const currentSecondRemainingSeats = result.secondRemainingSeats;
        const update = {
            $set: {
                secondRemainingSeats: currentSecondRemainingSeats -1
            },
        };
        return await TrainModel.updateOne({ '_id': trainId }, update);
    }
}

async function relieveSeat(trainId) {
    const result = await TrainModel.findOne({ '_id': trainId });
    if (determineClasse(seatClasse)){
        const currentFirstRemainingSeats = result.firstRemainingSeats;
        const update = {
            $set: {
                firsRemainingSeats: currentFirstRemainingSeats + 1
            },
        };
        return await TrainModel.updateOne({ '_id': trainId }, update);
    }else{
        const currentSecondRemainingSeats = result.secondRemainingSeats;
        const update = {
            $set: {
                secondRemainingSeats: currentSecondRemainingSeats + 1
            },
        };
        return await TrainModel.updateOne({ '_id': trainId }, update);
    }
}

function determineClasse(seatClasse) {
    if(seatClasse === 'First'){
        return true;
    }
    return false;
}


module.exports = {
    getTrainsList,
    getTrainsById,
    removeSeat,
    relieveSeat,
    addATrain
};
