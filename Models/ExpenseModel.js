const { DataTypes } = require("sequelize")
const sequelize = require("../Db/database")


const ExpenseModel = sequelize.define("spendwise", {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paidBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    }
});

module.exports = ExpenseModel;