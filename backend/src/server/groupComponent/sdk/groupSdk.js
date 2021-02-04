const GroupModel = require('../models/group')

async function getAllGroupsByEmail(userMail) {
    return await GroupModel.find({users: userMail});
}

async function addNewMember(groupName, username, userMail){
    const result = await GroupModel.findOne({ 'groupName': groupName });
    console.log(`the result is ${result}`)
    const currentUsers = result.users;
    const currentUserNames = result.usersnames
    const update  =  {
        $set: {
            users:
            currentUsers.push(userMail),
            usersnames: currentUserNames.push(username)
        },
      };
    return await GroupModel.updateOne({ 'groupName': groupName }, update);
}

module.exports = {
    getAllGroupsByEmail,
    addNewMember
};