const ExpenseModel = require('../models/expense.model');


async function getExpenses(loggedInUserData) {
    //get all expenses
    if (loggedInUserData.usertype === "admin") {
        const expenses = await ExpenseModel.findAll();
        return expenses;
    }
    //get all expenses by loggedIn user
    const expenses = await ExpenseModel.findAll({
        where: {
            paidBy: loggedInUserData.username,
        },
    });
    return expenses;
}

async function getExpensesByID(id) {
    //Code to get expense by ID
    const expensebyId = await ExpenseModel.findByPk(id);
    if (!expensebyId) {
        throw new Error("Expense not found")
    }
    return expensebyId;
}

async function createExpenses(data, loggedInUserData) {
    //Code to create expense
    data.paidBy = loggedInUserData.username;
    const createExpense = await ExpenseModel.create(data)
    return createExpense;
}

async function updateExpense(id, newData, loggedInUserData) {
    //code to update expense
    const expenseData = await ExpenseModel.findByPk(id)

    if (!expenseData) {
        throw new Error("Expense not found")
    }

    if (loggedInUserData.usertype !== "admin") {
        if (expenseData.paidBy !== loggedInUserData.username) {
            throw new Error("Forbidden - You do not have permission to perform this operation")
        }
    }

    expenseData.set(newData)
    await expenseData.save()
    return expenseData;
}

async function deleteExpense(id, loggedInUserData) {

    const expenseData = await ExpenseModel.findByPk(id)
    if (!expenseData) {
        throw new Error("Expense with this ID doesn't found");
    }

    if (loggedInUserData.usertype !== "admin") {
        if (expenseData.paidBy !== loggedInUserData.username) {
            throw new Error("Forbidden - You do not have permission to perform this operation")
        }
    }
    //code to delete expense
    const deletedExpense = await ExpenseModel.destroy({
        where: { id },
    });

    if (!deletedExpense) {
        throw new Error("Expense not found");
    }

    return deletedExpense;
}


module.exports = {
    getExpenses,
    getExpensesByID,
    createExpenses,
    updateExpense,
    deleteExpense
}