const CustomerModel = require('../models/customer_model');

async function getCustomerByEmail(id) {
    return CustomerModel.findOne({'customerId': Number(id)});
}

module.exports = {
    getCustomerByEmail
};