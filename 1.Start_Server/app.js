let http = require("http");

let myServer = http.createServer(function(req,res){
    if(req.url == "/"){
        res.end("My first server")
    }
    if(req.url == "/about"){
        res.end("About page")
    }
    
    console.log(req.url)
})

myServer.listen(3000);