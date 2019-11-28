let express = require ("../node_modules/express");

let myServer = express()

myServer.get("/",function(req,res){
    res.send(`
        <h2>Express server</h2>
    `)
});

myServer.listen(3000)