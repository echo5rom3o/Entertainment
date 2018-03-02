var express=require("express");
var session=require("express-session")
var app=express();
var mongo=require("mongodb" ).MongoClient;
const path = require('path');
var setting={
	db:"mongodb://localhost:27017/Entertainment"
}
app.use(session({secret:"secret",saveUninitialized:true,resave: true}));
app.use("/css",express.static(path.join(__dirname+"/public/css")) );
app.use("/interface",express.static(path.join(__dirname+"/public/interface")));

app.set("view engine","ejs");
var connect=new Promise((resolve)=>{
	
	mongo.connect(setting.db,function(err,db){
		if(err)
			console.log("Database could not connect")
		else{
			resolve( db)
		}
	})
	
})

connect.then((db)=>{
	app.get("/",function(req,res){
		res.render("index",{script:"script",loadList:[]});
	});

	app.get("/series/\*",function(req,res){
		res.render("index",{script:"serie"});
	});
	
	app.post("/newseries",function(req){
		db.collection("serie").insertOne({series:req.params.serie})
	});
	
	app.post("/newtranslator",function(){
		db.collection("translator").insertOne({series:req.params.serie})
	});
})

app.listen(80)
