const GroupModel = require('../models/group')

async function getAllGroupsByEmail(userMail) {
    return await GroupModel.find({users: userMail});
}

module.exports = {
    getAllGroupsByEmail
};