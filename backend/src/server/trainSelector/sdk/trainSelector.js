const TrainsList = require('../models/Train');


async function getTrainByForm(departureStation, arrivalStation ) {
    console.log("HELLLLLOOOOOOOOOOOOOOOOOOOOOO for SDK");

    let list = await TrainsList.getTrainList();
    console.log(list)
    let listToReturn=[];
    list.forEach(train => {
        if (train["routes"].includes(departureStation) && train["routes"].includes(arrivalStation)){
            if (train["routes"].findIndex(station => station === arrivalStation)-train["routes"].findIndex(station => station === departureStation)>0)
            listToReturn.push(train)
        }
    })
    return listToReturn
}

module.exports = {
    getTrainByForm
};
