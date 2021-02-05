const GroupModel = require('../models/group')

async function getAllGroupsByEmail(userMail) {
    return await GroupModel.find({users: userMail});
}

async function sendAnInvitation(userMail, groupName){
    /** */
}

async function createAGroup(userMail,userName,groupName){
    /** */
}

async function supprimAGroup(userMail,userName,groupName){
    /** */
}

async function addNewMember(groupName, username, userMail){
    const result = await GroupModel.findOne({ 'groupName': groupName });
    const currentUsers = result.users;
    const currentUserNames = result.usersnames

    currentUsers.push(userMail);
    currentUserNames.push(username);

    console.log(`nouveau tableau ${currentUsers}`)

    const update  =  {
        $set: {
            users:
            currentUsers,
            usersnames: currentUserNames
        },
      };
    return await GroupModel.updateOne({ 'groupName': groupName }, update);
    // return 'yes'
}

async function quitAGroup(groupName, username, userMail){
    const result = await GroupModel.findOne({ 'groupName': groupName });

    const currentUsers = result.users;
    const currentUsersNames = result.usersnames

    const indexToRemoveUsersNames = currentUsersNames.indexOf(username);
    const indexToRemoveUsers = currentUsers.indexOf(userMail);

    if(indexToRemoveUsers > -1){
        currentUsers.splice(indexToRemoveUsers,1);
    }
    if(indexToRemoveUsersNames > -1){
        currentUsersNames.splice(indexToRemoveUsersNames,1);
    }
    const update  =  {
        $set: {
            users:
            currentUsers,
            usersnames: currentUsersNames
        },
      };
    return await GroupModel.updateOne({ 'groupName': groupName }, update);
}

module.exports = {
    getAllGroupsByEmail,
    addNewMember,
    quitAGroup
};