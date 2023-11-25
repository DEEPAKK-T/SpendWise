const UsersModel = require("../Models/UserModel")
const crypto = require('crypto-js');


async function CreateNewUser(data) {
    //Creating user in DB
    // Hash the password before saving it
    const hashedPassword = crypto.SHA256(data.password.toString()).toString();
    data.password = hashedPassword;
    const createUser = await UsersModel.create(data)
    return createUser;
}

async function UpdateUser(userId, newData) {
    //Update User
    const getUser = await UsersModel.findByPk(userId);

    if (!getUser) {
        throw new Error("User not found")
    }

    getUser.set(newData)
    await getUser.save();
    return getUser
}

async function DeleteUser(id) {
    //Delete User
    const deletedUser = await UsersModel.destroy({
        where: { id },
    });

    if (!deletedUser) {
        throw new Error("User not found")
    }

    return deletedUser;
}

async function GetAllUser() {

    //Get All Users
    const getUsers = await UsersModel.findAll({
        attributes: {
            exclude: ['password', 'pwdExpiresIn'],
        },
    });
    return getUsers;

}

module.exports = {

    CreateNewUser,
    UpdateUser,
    DeleteUser,
    GetAllUser

}