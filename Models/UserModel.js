const { DataTypes } = require("sequelize")
const sequelize = require("../Db/database")

const UserModel = sequelize.define("users", {
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
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