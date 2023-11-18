const http = require("http")

http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Hello Spend Wise");
}).listen(8080)