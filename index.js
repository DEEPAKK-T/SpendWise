const http = require("http")
const Db = require("./Db/database")
const ExpenseController = require("./Controllers/ExpenseController")
const Utils = require("./Utils/Util")
const UserController = require("./Controllers/UsersController")
const LoginController = require("./Controllers/LoginController")
const jwt = require("jsonwebtoken")
const authenticateJwt = require("./Middleware/AuthenticateJwt")
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

                const getAllExpenses = await ExpenseController.getExpenses()
                //setting status code and content-type
                res.writeHead(200, { "Content-Type": "application/json" });
                //send the data
                res.end(JSON.stringify(getAllExpenses));

            })

            // var token = req.headers["authorization"]

            // console.log("accessToken", token)
            // if (!token) {
            //     res.writeHead(401, { "Content-Type": "application/json" });
            //     res.end(JSON.stringify({ message: "Unauthorized" }));
            // } else {
            //     var accessToken = token.split(" ")[1]
            //     jwt.verify(accessToken, "iuy7uyiu7yiu", async (err, user) => {
            //         // const decoded = jwt.decode(token.split(' ')[1]);
            //         // console.log('Decoded Token Payload:', decoded);
            //         if (err) {
            //             console.log("error", err)
            //             res.writeHead(403, { "Content-Type": "application/json " });
            //             res.end(JSON.stringify({ message: "Forbidden" }))
            //         } else {
            //             const getAllExpenses = await ExpenseController.getExpenses()
            //             //setting status code and content-type
            //             res.writeHead(200, { "Content-Type": "application/json" });
            //             //send the data
            //             res.end(JSON.stringify(getAllExpenses));

            //         }

            //     })
            // }
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
                // console.log(expensedata)
                let createExpense = await ExpenseController.createExpenses(expensedata);
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
                    const updateExpense = await ExpenseController.updateExpense(id, newExpenseData);
                    // set the status code and content-type
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(updateExpense));

                } catch (error) {
                    res.writeHead(404, { "Content-Type": "application/json" })
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
                    const message = await ExpenseController.deleteExpense(id);
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
                    const updatedUser = await UserController.UpdateUser(userId, newUserData)
                    // set the status code and content-type
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(updatedUser));

                } catch (error) {
                    res.writeHead(404, { "Content-Type": "application/json" });
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
            res.end({ "message": "Route Not Found" });
    }
});


server.listen(port, () => {
    console.log("Server listening on PORT ", port)
})