const { DataTypes } = require("sequelize")
const sequelize = require("../db/database")

const UserModel = sequelize.define("users", {
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate: {
            isEmail: true, // built-in isEmail validator for basic email format validation
          },
          unique: true,
    },
    usertype : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    pwdExpiresIn : {
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP + interval \'30 days\'')
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    }
});

module.exports = UserModel;