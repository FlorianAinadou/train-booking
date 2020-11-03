const rpa = require('request-promise');

let TrainsList= null;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
const url = "http://localhost:8000/trainList";

async function getTrainList() {
    const result = await rpa(url);
    TrainsList = JSON.parse(result);
    return TrainsList;
}

module.exports = {
    getTrainList
};