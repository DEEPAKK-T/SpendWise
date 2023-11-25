const UsersModel = require("../Models/UserModel")
const crypto = require('crypto-js');


async function Login(loggedInUserData){

    //Get user data by username
    const getUser = await UsersModel.findOne({
        where: {
            username: loggedInUserData.username
        }
    });

    if(!getUser){
        throw new Error("User doesn't exists please register")
    }
    
    const loggedInUserHashedPassword = crypto.SHA256(loggedInUserData.password.toString()).toString();
    if(loggedInUserHashedPassword != getUser.password){
        throw new Error("Invalid Password. Please login with Valid Password")
    }

    return getUser;

}

module.exports = {Login};