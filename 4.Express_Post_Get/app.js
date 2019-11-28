const express = require("../node_modules/express");

const myApp = express();

myApp.get("/",function(req,res){
    res.send(`
        <h2>Express server running!</h2>
        <form action="/result" method="POST">
            Text here: <input type="text"/>
            <button>Submit</button>
        </form>
    `)
});

myApp.post("/result",function(req,res){
    res.send(`<h2>Express server running!</h2>
    <a href="/">homepage</a>`);
});


//if we access /result from address bar
myApp.get("/result",function(req,res){
    res.send(`<h2>Page not found</h2>`);
});

myApp.listen(3000);
