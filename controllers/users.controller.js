const UsersModel = require("../models/user.model")
const crypto = require('crypto-js');


async function CreateNewUser(data) {

    //Check if username already exists
    const userNameAlreadyExists = await UsersModel.findOne({
        where:{
            username: data.username,
        } 
    });
    if(userNameAlreadyExists){
        throw new Error("Bad Request: Username already exists")
    }
    //Creating user in DB
    // Hash the password before saving it
    const hashedPassword = crypto.SHA256(data.password.toString()).toString();
    data.password = hashedPassword;
    const createUser = await UsersModel.create(data)
    return createUser;
}

async function UpdateUser(userId, newData, loggedInUserData) {
    //Check if user exists
    const getUser = await UsersModel.findByPk(userId);

    if (!getUser) {
        throw new Error("User not found")
    }

    //Check for user to update only his profile
    if (loggedInUserData.usertype !== "admin") {
        if (getUser.username !== loggedInUserData.username) {
            throw new Error("Forbidden - You do not have permission to perform this operation")
        }
    }

    //Update User
    getUser.set(newData)
    await getUser.save();
    return getUser
}

async function DeleteUser(id, loggedInUserData) {

    //check if user exists
    const getUser = await UsersModel.findByPk(userId);

    if (!getUser) {
        throw new Error("User not found")
    }

    //Only admin can delete users
    if (loggedInUserData.usertype !== "admin") {
            throw new Error("Forbidden - You do not have permission to perform this operation")
    }

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