const express = require("../node_modules/express");

const myApp = express();

myApp.get("/",function(req,res){
    res.send(`<h2>working!!</h2>`)
});

myApp.listen(3000);

//installed nodemon package.
//instead of 'node app', we can use 'nodemon app' command (only if we install it globally)
//add "watch": "nodemon app" under scripts in package.json
//npm run watch