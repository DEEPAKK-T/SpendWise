const http = require("http")
const Db = require("./db/database")
const ExpenseController = require("./controllers/expense.controller")
const Utils = require("./utils/util")
const UserController = require("./controllers/users.controller")
const LoginController = require("./controllers/auth.controller")
const jwt = require("jsonwebtoken")
const authenticateJwt = require("./middleware/authenticate.jwt")
require("dotenv").config()

// const database = new Database()

const port = process.env.PORT || 8080

//connecting to PostgreSQL
Db.sequelize;


server = http.createServer(async function (req, res) {

    switch (true) {

        //GET /api/expenses
        case req.url == "/api/expenses" && req.method == "GET":

            authenticateJwt(req, res, async () => {

                const getAllExpenses = await ExpenseController.getExpenses(req.user)
                //setting status code and content-type
                res.writeHead(200, { "Content-Type": "application/json" });
                //send the data
                res.end(JSON.stringify(getAllExpenses));

            })
            break;
        case req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "GET":
            authenticateJwt(req, res, async () => {
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

            })
            break;
        //POST /api/expenses
        case req.url == "/api/expenses" && req.method == "POST":

            authenticateJwt(req, res, async () => {
                //get req data
                let expensedata = await Utils.getRequestData(req)
                //createExpense
                console.log("req.user", req.user)
                console.log("req.expensedata", expensedata)
                let createExpense = await ExpenseController.createExpenses(expensedata, req.user);
                // set the status code and content-type
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(createExpense));
            })
            break;
        //UPDATE /api/expenses/:id
        case req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "PUT":
            authenticateJwt(req, res, async () => {
                try {
                    //get the id of from the endpoint
                    const id = req.url.split("/")[3]
                    //get req data
                    let newExpenseData = await Utils.getRequestData(req)
                    const updateExpense = await ExpenseController.updateExpense(id, newExpenseData, req.user);
                    // set the status code and content-type
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(updateExpense));

                } catch (error) {
                    if(error.message.startsWith("Forbidden")){
                        res.writeHead(403, { "Content-Type": "application/json" })
                    } else {
                        res.writeHead(404, { "Content-Type": "application/json" })
                    }
                    res.end(JSON.stringify({ message: error.message }))
                }
            });
            break;
        //DELETE /api/expenses/:id
        case (req.url.match(/\/api\/expenses\/([a-f0-9-]+)$/i) && req.method == "DELETE"):
            authenticateJwt(req, res, async () => {
                try {
                    //get the id of from the endpoint
                    const id = req.url.split("/")[3]
                    const message = await ExpenseController.deleteExpense(id, req.user);
                    // set the status code and content-type
                    res.writeHead(200, { "Content-Type": "application/json" });
                    // send the message
                    res.end(JSON.stringify({ message: "Expense deleted successfully", id: id }));

                } catch (error) {
                    res.writeHead(404, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({ message: error.message }))
                }

            })
            break;
        //POST /api/users
        case req.url == "/api/users" && req.method == "POST":
            try{
                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            const userData = await Utils.getRequestData(req);
            const username = userData.username;
            if (username.length < 3) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: "Username should contain atleast 3 characters"
                }))
                return
            } else if (username.length > 16) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: "More that 15 characters are not allowed for username"
                }))
                return
            } else if (username.indexOf(" ") >= 0) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: "White spaces are not allowed for username" }))
                return
            }
            else if (specialChars.test(username)) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: "Special Characters are not allowed for username" }))
                return
            }
            const createUser = await UserController.CreateNewUser(userData);
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createUser));

            }catch(error){
                if(error.message.startsWith("Bad Request") || error.message.startsWith("Validation")){
                    res.writeHead(400, { "Content-Type": "application/json" });
                } else {
                    res.writeHead(404, { "Content-Type": "application/json"});
                }
                res.end(JSON.stringify({ "message": error.message === "Validation error" ? "Validation error : username or email already taken" : error.message }))

            }
            break;
        //GET /api/users
        case req.url == "/api/users" && req.method == "GET":
            authenticateJwt(req, res, async () => {
                const getUsers = await UserController.GetAllUser();
                // set the status code and content-type
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(getUsers));
            });
            break;
        //PUT /api/users
        case req.url.match(/\/api\/users\/([a-f0-9-]+)$/i) && req.method == "PUT":

            authenticateJwt(req, res, async () => {
                try {

                    var userId = req.url.split("/")[3]
                    const newUserData = await Utils.getRequestData(req);
                    const updatedUser = await UserController.UpdateUser(userId, newUserData, req.user)
                    // set the status code and content-type
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(updatedUser));

                } catch (error) {
                    if(error.message.startsWith("Forbidden")){
                        res.writeHead(403, { "Content-Type": "application/json" });
                    } else{
                        res.writeHead(404, { "Content-Type": "application/json" });
                    }
                    res.end(JSON.stringify({ "message": error.message }));
                }
            })
            break;
        //DELETE /api/users
        case req.url.match(/\/api\/users\/([a-f0-9-]+)$/i) && req.method == "DELETE":
            authenticateJwt(req, res, async () => {
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
            })
            break;
        //POST /api/users/login
        case req.url == "/api/users/login" && req.method == "POST":
            try {
                const userLoginData = await Utils.getRequestData(req);
                const { accessToken, expiresIn } = await LoginController.Login(userLoginData);
                // set the status code and content-type
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ accessToken, expiresIn }));

            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "message": error.message }))
            }
            break;
        default:
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ "message": "Route Not Found" }));
    }
});


server.listen(port, () => {
    console.log("Server listening on PORT ", port)
})