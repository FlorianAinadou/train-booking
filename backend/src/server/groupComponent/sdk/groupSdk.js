const GroupModel = require('../models/group')

async function getAllGroupsByEmail(userMail) {
    return await GroupModel.find({users: userMail});
}

async function sendAnInvitation(userMail, groupName){
    /** */
}

async function createAGroup(groupName, username, userMail){
    /** */
    const alreadyexist = await GroupModel.find({'groupName': groupName});
    console.log(`the rsult is ${alreadyexist}`)
    if (alreadyexist === null){
        await GroupModel.create({
            "groupName": groupName,
            "owner": userMail,
            "users": [userMail],
            "usersnames": [username],
            "travelsNumber": 0
        }, function (err, group) {
            if (err) console.log(err);
        });
        return 'Successful'
    }
}

async function deleteAGroup(groupName,userMail){
    return await GroupModel.deleteOne({'owner': userMail, 'groupName': groupName});
}

async function addNewMember(groupName, username, userMail){
    const result = await GroupModel.findOne({ 'groupName': groupName });
    const currentUsers = result.users;
    const currentUserNames = result.usersnames

    currentUsers.push(userMail);
    currentUserNames.push(username);

    const update  =  {
        $set: {
            users:
            currentUsers,
            usersnames: currentUserNames
        },
      };
    return await GroupModel.updateOne({ 'groupName': groupName }, update);
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
    quitAGroup,
    createAGroup,
    deleteAGroup
};