const url = require("url");
const expenseController = require("./api/controllers/expenseController")

class Router {
    controller
    constructor(req, res, controller) {
        this.controller = controller
        this.initRoutes(req, res) 
    }

    initRoutes(req, res) {
        var parsedurl = url.parse(req.url, true)

        if (req.method === "POST" && parsedurl.pathname === "/expenses" ){
            //Call handle frunction in expenseController.js
            try{
                this.controller.createExpense(req, res)
            }catch(error){
                console.log("Logs ", error)
            }
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message" : "Route not found"}));
        }
    }
}


const handleRoutes = (req, res) => {

    var parsedurl = url.parse(req.url, true)

    if (req.method === "POST" && parsedurl.pathname === "/expenses" ){
        //Call handle frunction in expenseController.js
        try{
            this.controller
        }catch(error){
            console.log("Logs ", error)
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({"message" : "Route not found"}));
    }

};

module.exports = handleRoutes