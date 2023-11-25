const ExpenseModel = require('../Models/ExpenseModel');


async function getExpenses(){
    //Code to get all expenses
    const expenses = await ExpenseModel.findAll();
    return expenses;
}

async function getExpensesByID(id){
    //Code to get expense by ID
    const expensebyId = await ExpenseModel.findByPk(id);
    if(!expensebyId){
        throw new Error("Expense not found")
    }
    return expensebyId;
}

async function createExpenses(data){
    //Code to create expense
    const createExpense = await ExpenseModel.create(data)
    return createExpense;
}

async function updateExpense(id, newData){
    //code to update expense
    const expenseData = await ExpenseModel.findByPk(id)

    if(!expenseData){
        throw new Error("Expense not found")
    }

    expenseData.set(newData)
    await expenseData.save()
    return expenseData;
}

async function deleteExpense(id){

    const expenseData = await ExpenseModel.findByPk(id)
    if(!expenseData){
        throw new Error("Expense with this ID doesn't found");
    }
    //code to delete expense
    const deletedExpense = await ExpenseModel.destroy({
        where: { id },
    });

    if(!deletedExpense){
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