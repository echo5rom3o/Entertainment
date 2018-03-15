var express=require("express");
var session=require("express-session")
var bodyParser=require("body-parser")
var app=express();
var mongo=require("mongodb" ).MongoClient;
const path = require('path');
var mongodirect=require("mongodb" )
var setting=require("./setting.json")
const safelookup=require("safe-browse-url-lookup")({apiKey:setting.safe});
var server= require("http").Server(app)
var io=require("socket.io")(server)

app.use(session({secret:"secret",saveUninitialized:true,resave: true}));
app.use("/css",express.static(path.join(__dirname+"/public/css")) );
app.use("/interface",express.static(path.join(__dirname+"/public/interface")));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");

var connect=new Promise((resolve)=>{
	mongo.connect(setting.db,function(err,db){
		if(err)
			console.log("Database could not connect")
		else{
			resolve(db.db(setting.name));
		}
	})
	
})

connect.then((db)=>{
	function noSpecial(character,regex){
		if(typeof character == "string")
		return character.replace(regex||/[^A-Z a-z 0-9]/,"");
	}
	app.get("/",function(req,res){
		var latestlist;
		var popularlist;
		var suggestedlist;
		Promise.all([
			getLinks().then((value)=>{latestlist=value}),
			getLinks({order:{popular:1}}).then((value)=>{popularlist=value}),
			getLinks().then((value)=>{suggestedlist=value})
		]).then(()=>{
			res.render("index",{script:"script",data:{latestlist:latestlist,suggestedlist:suggestedlist,popularlist:popularlist}});
		})
	});
	
	//Create a page
	app.get("/page/\*",function(req,res){
		db.collection("links")
		res.render("index",{script:"page",summary:"",link:""});
	});
	
	//Create a group
	app.get("/group/\*",function(req,res){
		res.render("index",{script:"group"});
	});
	//Post
	app.post("/group",function(req,res){
		res.render("index",{script:"group"});
	});
	
	//Create a link
	app.post("/link",function(req,res){
		try{
			var serie=noSpecial(req.body.serie);
			var type=noSpecial(req.body.type);
			var release=noSpecial(req.body.release)||"";
			var group=noSpecial(req.body.group);
			var site=req.body.site;
			if(!(typeof site=="string"&&/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(   site)))
				site=false
			//Built in client should made sure
			if(type&&site){
				safelookup.checkSingle(site).then((data)=>{
					if(data){
						res.render("index",{script:"link",data:{link:"Unable to add. Url may have malicious content. Scanned with Google Safe."}});
					}
					else{
						db.collection("links").insertOne({serie:serie,category:type,site:site,release:release||"1",group:group,release:release,popular:0});
						res.render("index",{script:"link",data:{link:"success"}});
					}
				})
			}
		}
		catch(e){
			console.log(e)
		}
	});
	//Post
	app.get("/link",function(req,res){
		res.render("index",{script:"link",data:{}});
	});
	
	app.get("/linkredirect/\*",function(req,res){
		if(typeof req.query.url == "string"&&req.query.url.match(/[a-z 0-9]/)){
			db.collection("links").findOneAndUpdate({"_id":mongodirect.ObjectID(req.query.url)},{$inc:{popular:1}}).then((db)=>{
				res.redirect(db.value.site)
			})
		}
	})
	
	function getLinks(opt){
		opt=opt||{}
		return new Promise((resolve)=>{db.collection("links").find(opt.category||{}).sort(opt.order||{_id:-1}).limit(opt.limit||30).toArray().then((list)=>{
			if(list)
			resolve(list.slice(opt.start||0))
		})
		})
	}
	
	io.on("connect",(socket)=>{
		socket.on("filter",(options,callback)=>{
			getLinks(options).then(callback)
		})
	})
})


server.listen(80)
