const express = require("express");
const mongodb = require("mongodb");

const myServer = express();
let db;
let connectionString = "mongodb+srv://personApp:person123@cluster0-lv9r2.mongodb.net/todo?retryWrites=true&w=majority";

myServer.use(express.json());
myServer.use(express.urlencoded({extended:false}));
myServer.use(express.static('public'));

mongodb.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true},function(err,client){
    db = client.db();
    myServer.listen(3000);
});

myServer.get("/",function(req,res){

    db.collection('todo').find().toArray(function(err,client){
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha256-2YQRJMXD7pIAPHiXr0s+vlRWA7GYJEK0ARns7k2sbHY=" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <title>To-Do App</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="twelve columns">
                        <h2>To-Do App</h2>
                        <form action="/add-value" method="POST" id="add-form">
                            <div class="row">
                                <div class="eight columns">
                                    <input type="text" name="newItem" id="new-value" class="u-full-width"  autocomplete="off">
                                </div>
                                <div class="four columns">
                                    <button type="submit" class="u-full-width">Add to list</button>
                                </div>
                            </div>
                        </form>
                        ${client.map(function(item){
                            return `<div class="row u-full-width" style="display:inline-block; border:1px solid #eee;padding: 15px;border-radius: 10px;">
                            <div class="ten columns">${item.item}</div>
                            <div class="two columns">
                                <i data-id="${item._id}" id="edit-me" style="cursor:pointer;" class="material-icons">edit</i>
                                <i data-id="${item._id}" id="delete-me" style="cursor:pointer;padding-left:30px;" class="material-icons">close</i>
                            </div>
                        </div>`
                        }).join('')}
                    </div>
                </div>
            </div>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="./browser.js"></script>
        </body>
        </html>`);
    });
});

myServer.post("/add-value",function(req,res){
    if(!(req.body.newItem=="")){
        db.collection('todo').insertOne({item:req.body.newItem},function(){
            res.redirect("/");
        });
    }
});

myServer.post("/edit-value",function(req,res){
    if(!(req.body.text=="")){
        db.collection('todo').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)},{$set:{item:req.body.text}},function(){
            res.send('success');
        });
    }
});

myServer.post("/delete-value",function(req,res){
    db.collection('todo').deleteOne({_id: new mongodb.ObjectID(req.body.id)},function(){
        res.send('success');
    });
});