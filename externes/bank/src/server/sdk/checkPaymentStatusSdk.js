const accounts = require('../../../mocks/customerAccounts.json')

async function checkPaymentStatus(idCard, price) {
    for (account of accounts) {
        if(account['idCard'] === idCard && (account['amount'] - price) >= 0){
            return {"data": true}
        }
        return {"data": false}
    }
}

async function getAccounts() {
    return accounts
}

module.exports = {
    checkPaymentStatus,
    getAccounts
};
