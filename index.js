const http = require("http")
const Db = require("./Db/database")
const ExpenseController = require("./Controllers/ExpenseController")
const Utils = require("./Utils/Util")
const UserController = require("./Controllers/UsersController")

// const database = new Database()

//connecting to PostgreSQL
Db.sequelize;


server = http.createServer(async function (req, res) {

    switch (true) {

        //GET /api/expenses
        case req.url == "/api/expenses" && req.method == "GET":
            console.log("Get all expense")
            const getAllExpenses = await ExpenseController.getExpenses()
            //setting status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            //send the data
            res.end(JSON.stringify(getAllExpenses));
            //GET /api/expenses/:id
            break;
        case req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "GET":
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
            break;
        //POST /api/expenses
        case req.url == "/api/expenses" && req.method == "POST":

            //get req data
            let expensedata = await Utils.getRequestData(req)
            //createExpense
            // console.log(expensedata)
            let createExpense = await ExpenseController.createExpenses(expensedata);
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createExpense));
            break;
        //UPDATE /api/expenses/:id
        case req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "PUT":
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
            break;
        //DELETE /api/expenses/:id
        case (req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "DELETE"):
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
                res.end(JSON.stringify({ message: error.message }))

            }
            break;
        //POST /api/users
        case req.url == "/api/users" && req.method == "POST":
            const userData = await Utils.getRequestData(req);
            const createUser = await UserController.CreateNewUser(userData);
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createUser));
            break;
        //GET /api/users
        case req.url == "/api/users" && req.method == "GET":
            const getUsers = await UserController.GetAllUser();
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(getUsers));
            break;
        //PUT /api/users
        case req.url.match(/\/api\/users\/([a-f0-9-]+)$/i) && req.method == "PUT":
            try {

                var userId = req.url.split("/")[3]
                const newUserData = await Utils.getRequestData(req);
                const updatedUser = await UserController.UpdateUser(userId, newUserData)
                // set the status code and content-type
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(updatedUser));

            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "message": error.message }));

            }
            break;
        //DELETE /api/users
        case req.url.match(/\/api\/users\/([a-f0-9-]+)$/i) && req.method == "DELETE":
            try {
                var userId = req.url.split("/")[3]
                const deleteUser = await UserController.DeleteUser(userId)
                // set the status code and content-type
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "message": "User deleted successfully", id: userId }));

            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "message": error.message }))
            }
            break;
        default:
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end({ "message": "Route Not Found" });
    }
});


server.listen(8080, () => {
    console.log("Server listening on PORT 8080")
})