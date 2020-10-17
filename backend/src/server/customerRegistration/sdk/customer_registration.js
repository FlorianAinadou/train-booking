const CustomerModel = require('../models/customer_model');

async function addCustomer(request_body) {
    const customer = request_body
    return CustomerModel.create(customer);
}

module.exports = {
    addCustomer
};