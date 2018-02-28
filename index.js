var express=require("express");
var session=require("express-session")
var app=express();
const path = require('path');

app.use(session({secret:"secret",saveUninitialized:true,resave: true}));

app.use("/css",express.static(path.join(__dirname+"/public/css")) );
app.use("/interface",express.static(path.join(__dirname+"/public/interface")));
app.get("/",function(req,res){
	res.sendFile(path.join(__dirname+"/public/index.html"))
});
app.get("/series/\*",function(req,res){
	res.sendFile(path.join(__dirname+"/public/series.html"))
});
app.listen(80)