const http = require("http")
const Db = require("./Db/database")
const ExpenseController = require("./Controllers/ExpenseController")
const Utils = require("./Utils/Util")

// const database = new Database()

//connecting to PostgreSQL
Db.sequelize;


server = http.createServer(async function (req, res) {

    //GET /api/expenses
    if (req.url == "/api/expenses" && req.method == "GET") {
        console.log("Get all expense")
        const getAllExpenses = await ExpenseController.getExpenses()
        //setting status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the data
        res.end(JSON.stringify(getAllExpenses));
        //GET /api/expenses/:id
    } else if (req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "GET") {
        try {
            //get the id from the endpoint
            const id = req.url.split("/")[3]
            const getExpenseByID = await ExpenseController.getExpensesByID(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(getExpenseByID));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: error.message }))
        }
        //POST /api/expenses
    } else if (req.url == "/api/expenses" && req.method == "POST") {

        //get req data
        let expensedata = await Utils.getRequestData(req)
        //createExpense
        // console.log(expensedata)
        let createExpense = await ExpenseController.createExpenses(expensedata);
        // set the status code and content-type
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(createExpense));
        //UPDATE /api/expenses/:id
    } else if (req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "PUT") {
        try {
            //get the id of from the endpoint
            const id = req.url.split("/")[3]
            //get req data
            let newExpenseData = await Utils.getRequestData(req)
            const updateExpense = await ExpenseController.updateExpense(id, newExpenseData);
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updateExpense));

        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: error.message }))

        }
        //DELETE /api/expenses/:id
    } else if (req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "DELETE") {
        try {
            //get the id of from the endpoint
            const id = req.url.split("/")[3]
            const message = await ExpenseController.deleteExpense(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message: "Expense deleted successfully", id: id }));

        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({message: error.message}))

        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end({ "message": "Route Not Found" });
    }
});


server.listen(8080, () => {
    console.log("Server listening on PORT 8080")
})