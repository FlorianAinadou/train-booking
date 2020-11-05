const TrainsList = require('../models/Train');
const url = "http://127.0.0.1:8000/trainList";

async function getTrainByForm(departureStation, arrivalStation ) {
    // console.log("HELLLLLOOOOOOOOOOOOOOOOOOOOOO for SDK");
    let list = await TrainsList.getTrainList();
    // console.log(list);
    let listToReturn=[];
    list.forEach(train => {
        if (train["routes"].includes(departureStation) && train["routes"].includes(arrivalStation) && train["remainingSeats"] > 0 ){
            if (train["routes"].findIndex(station => station === arrivalStation)-train["routes"].findIndex(station => station === departureStation)>0)
                listToReturn.push(train)
        }
    });
    return listToReturn
}

async function getTrainById(id) {
    let train = await TrainsList.getTrainById(id);
    return train;
}


module.exports = {
    getTrainByForm,
    getTrainById
};
