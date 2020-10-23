const TrainsList = require('../models/Train');


async function getTrainByForm(departureStation, arrivalStation ) {
    let list = await TrainsList.getTrainList();
    let listToReturn=[];
    list.forEach(train => {
        if (train["routes"].includes(departureStation) && train["routes"].includes(arrivalStation)){
            if (train["routes"].findIndex(station => station === arrivalStation)-train["routes"].findIndex(station => station === departureStation)>0)
            listToReturn.push(train)
        }
    });
    return listToReturn
}

module.exports = {
    getTrainByForm
};
