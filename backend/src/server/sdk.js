const trainSelectorSdk = require('./sdk/trainSelector');
const customerRegistration = require('./sdk/customerRegistration');


const getTrainById = trainSelectorSdk.getTrainById;

const getUsers = customerRegistration.getUsers;
const getUserByName = customerRegistration.getUserByName;
const getUserByEmail = customerRegistration.getUserByEmail;
const getUserById = customerRegistration.getUserById;
const getUserByEmailAndPassword = customerRegistration.getUserByEmailAndPassword;
const addUser = customerRegistration.addUser;
const updateMailAndPassword = customerRegistration.updateMailAndPassword;
const removeUserByEmail = customerRegistration.removeUserByEmail;

module.exports = {
    getTrainById,

    getUsers,
    getUserByName,
    getUserByEmail,
    getUserById,
    getUserByEmailAndPassword,
    addUser,
    updateMailAndPassword,
    removeUserByEmail
};
