var express=require("express");
var session=require("express-session")
var app=express();

app.use(session({secret:"secret",saveUninitialized:true,resave: true}));

