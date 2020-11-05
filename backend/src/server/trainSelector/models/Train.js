const rpa = require('request-promise');

// let TrainsList= null;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
const url = "http://127.0.0.1:8000/trainList";
const url2 = "http://127.0.0.1:8000/trainById/";


async function getTrainList() {
    // console.log("HELLLLLOOOOOOOOOOOOOOOOOOOOOO du début de la fonction");
    const result = await rpa(url);
    // console.log("HELLLLLOOOOOOOOOOOOOOOOOOOOOO après la requête");
    TrainsList = JSON.parse(result);
    // console.log("HELLLLLOOOOOOOOOOOOOOOOOOOOOO");
    return TrainsList;
}

async function getTrainById(id) {
    const result = await rpa(url2+id);
    Train = JSON.parse(result);
    return Train;
}


module.exports = {
    getTrainList,
    getTrainById
};
