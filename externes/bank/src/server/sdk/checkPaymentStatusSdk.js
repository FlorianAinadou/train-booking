const accounts = require('../../../mocks/customerAccounts.json');

async function checkPaymentStatus(idCard, price) {
    console.log(idCard);
    console.log(price);
    for (account of accounts) {
        if( account['idCard'].localeCompare(idCard) === 0){
            const p = account['amount'] - price;
            return p >= 0;
        }
    }
    return {"data": false}
}


async function getAccounts() {
    return accounts
}

module.exports = {
    checkPaymentStatus,
    getAccounts
};
