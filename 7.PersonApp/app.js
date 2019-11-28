const express = require("express");
const mongodb = require("mongodb");

let myServer = express();
myServer.use(express.urlencoded({extended:false}));

let db;

let connectionString = "mongodb+srv://personApp:person123@cluster0-lv9r2.mongodb.net/person?retryWrites=true&w=majority";

mongodb.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true},function(err,client){
    db = client.db();
    
    myServer.listen(3000);
});

myServer.get("/",function(req,res){
    res.send(`<form action="/result" method="POST">
        <input type="text" name="fName"></input>
        <button>submit</button>
    </form>`);
});

myServer.post("/result",function(req,res){
    db.collection('customer').insertOne({first_name: req.body.fName},function(){
        res.send(`<h2>Saved!</h2>`);
    })
});