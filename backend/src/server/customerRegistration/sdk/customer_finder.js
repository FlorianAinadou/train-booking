const CustomerModel = require('../models/customer_model');

async function getCustomerById(id) {
    return CustomerModel.findOne({'customerId': Number(id)});
}

module.exports = {
    getCustomerById
};