/**
 * @author team C
 * @version 0.1
 */

const UserModel = require('../models/Customer');


/*************************************************************************************************
 *       ################################  CUSTOMER    ############################################   *
 *************************************************************************************************/

/**
 * Retrouver tous les utilisateurs de notre DB
 *  @author Paul Marie
 * @returns {Promise<any[]>}
 */
async function getUsers() {
    const users = await UserModel.find({});
    return users;
}


/**
 * Retrouver un utilisateur via son nom et prénom
 *  @author Paul Marie
 * @param name - nom de l'utilisateur
 * @param fname - prénom de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByName(name, fname) {
    return await UserModel.find({'firstName': fname, 'lastName': name});
}

/**
 * Retrouver un utilisateur via son adresse Mail
 *  @author Paul Marie
 * @param mail - adresse email de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmail(mail) {
    return UserModel.findOne({'email': mail});
}


/**
 * Retrouver un utilisateur via son id
 *  @author Paul Marie
 * @param id - id de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserById(id) {
    return await UserModel.findById(id);
}


/**
 * Retrouver un utilisateur via son email et son mot de passe
 *  @author Paul Marie
 * @param mail - adresse email de l'utilisateur
 *  @param password - mot de passe de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmailAndPassword(mail, password) {
    return  UserModel.findOne({'email': mail, 'password': password});
}




module.exports = {
    getUsers,
    getUserByName,
    getUserByEmail,
    getUserById,
    getUserByEmailAndPassword
};
