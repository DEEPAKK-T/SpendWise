const http = require("http")
const Database = require("./Db/database")

const database = new Database()

//connecting to PostgreSQL
database.connect();


http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Hello Spend Wise");
    // handleRoutes(req, res)
}).listen(8080, () => {
    console.log("Server listening on PORT 8080")
})