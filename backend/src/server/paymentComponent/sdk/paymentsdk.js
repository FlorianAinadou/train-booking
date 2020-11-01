const rp = require('request-promise');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
url = "http://wakanda_externe_bank_service:7000/paid/"

async function pay(idCard,price) {
    const result = await rp(url+""+idCard+"/"+price);
    bankResponse = JSON.parse(result);
    return bankResponse;
}

module.exports = {
    pay
};