const rp = require('request-promise');

let TrainsList= null;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
url = "http://127.0.0.1:8000/trainList/"

async function getTrainList() {
    const result = await rp(url);
    const tab = [];
    TrainsList = JSON.parse(result);
    return TrainsList;
}

module.exports = {
    getTrainList
};