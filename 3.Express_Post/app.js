let express = require ("../node_modules/express");

let myServer = express();

myServer.get("/",function(req,res){
    res.send(`
        <h2>Express server running!</h2>
        <form action="/result" method="POST">
            Text here: <input type="text"/><button>Submit</button>
        </form>
    `)
});

myServer.post("/result",function(req,res){
    res.send(`
        <h2>Result page</h2>
    `)
})

myServer.listen(3000);