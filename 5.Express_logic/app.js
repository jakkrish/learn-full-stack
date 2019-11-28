const express = require("../node_modules/express");

const ourApp = express();

//boilerplate
ourApp.use(express.urlencoded({extended:false}));

ourApp.get("/",function(req,res){
    res.send(`
    <h2>Express server running!</h2>
    <form action="/result" method="POST">
        Text here: <input name="txtname" type="text"/>
        <button>Submit</button>
    </form>
`);
});

ourApp.post("/result",function(req,res){
    if(req.body.txtname.toLowerCase() == "jay"){
        res.send(`<h2>Welcome</h2><a href="/">homepage</a>`);
    }else{
        res.send(`<h2>Access denied</h2><a href="/">homepage</a>`);
    }
});

ourApp.listen(3000);