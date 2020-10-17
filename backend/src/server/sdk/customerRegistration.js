/**
 * @author Paul Koffi
 * @version 0.1
 */

const UserModel = require('../models/User');


/*************************************************************************************************
 *       ################################  USER    ############################################   *
 *************************************************************************************************/

/**
 * Retrouver tous les utilisateurs de notre DB
 *  @author Paul Koffi <http://paulkoffi.com>
 * @returns {Promise<any[]>}
 */
async function getUsers() {
    const users = await UserModel.find({});
    return users;
}


/**
 * Retrouver un utilisateur via son nom et prénom
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param name - nom de l'utilisateur
 * @param fname - prénom de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByName(name, fname) {
    return await UserModel.find({'firstName': fname, 'lastName': name});
}

/**
 * Retrouver un utilisateur via son adresse Mail
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param mail - adresse email de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmail(mail) {
    return UserModel.findOne({'email': mail});
}


/**
 * Retrouver un utilisateur via son id
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param id - id de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserById(id) {
    return await UserModel.findById(id);
}


/**
 * Retrouver un utilisateur via son email et son mot de passe
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param mail - adresse email de l'utilisateur
 *  @param password - mot de passe de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmailAndPassword(mail, password) {
    return  UserModel.findOne({'email': mail, 'password': password});
}


/**
 * Ajouter un nouveau utilisateur dans notre BD
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param name - nom de l'utilisateur
 * @param fname - prénom de l'utilisateur
 * @param email - adresse email de l'utilisateur
 * @param password - mot de passe de l'utilisateur
 * @param hobbies - centres d'intèrêt de l'utilisateur
 * @param age - age de l'utilisateur
 * @param gender - sexe de l'utilisateur
 */

async function addUser(fname, lname, email, password, nationality, birthday, gender) {
    if (lname !== undefined && fname !== undefined) {
        await UserModel.create({
            "firstName": fname,
            "lastName": lname,
            "email": email,
            "password": password,
            "nationality": nationality,
            "birthday": birthday,
            "gender": gender
        }, function (err, user) {
            if (err) console.log(err);
        });
    }
    return true;
}



/**
 * modifier l'email ou, & le password de l'utilisateur
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param email - adresse email de l'utilisateur
 * @param newEmail - nouvelle adresse email de l'utilisateur
 * @param password - mot de passe de l'utilisateur
 */
async function updateMailAndPassword(newEmail, password, email) {
    await UserModel.updateOne({"email": email}, {"email": newEmail, "password": password}, function (err, p) {
        if (err) console.log(err);
    });
    return true;
}


/**
 * Supprimer un utilisateur à partir de son adresse email
 *  @author Paul Koffi <http://paulkoffi.com>
 * @param email - adresse email de l'utilisateur
 */
async function removeUserByEmail(email) {
    await UserModel.findOneAndRemove({
        "email": email
    }, function (err, user) {
        if (err)
            return false;
    });
    return true;
}


module.exports = {
    getUsers,
    getUserByName,
    getUserByEmail,
    getUserById,
    getUserByEmailAndPassword,
    addUser,
    updateMailAndPassword,
    removeUserByEmail
};
