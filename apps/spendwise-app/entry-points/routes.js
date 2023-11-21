const url = require("url");

const handleRoutes = (req, res) => {

    var parsedurl = url.parse(req.url, true)

    if (req.method === "POST" && parsedurl.pathname === "/expenses" ){
        //Call handle frunction in expenseController.js
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({"message" : "Route not found"}));
    }

};

module.exports = handleRoutes