var express = require("express")
	,app = express()
	,Mongolian = require("mongolian");
	
var port = process.env.PORT || 3000;
var mongoServer = new Mongolian( process.env.MONGOHQ_URL || "mongo://hicho:1234@127.0.0.1:27017/scoreBoard");
var scoreBoard = require("./scoreBoard/server.js");

app.use("/public", express["static"](__dirname + "/public"));
app.use(express.bodyParser());
app.set("view engine", "jade");
app.set("view options", {layout:false});
app.set("views", __dirname + "/views");

app.get('/', function(req, res){
	res.render("index");
})

app.listen(3000);

// scoreBoard
scoreBoard.init(app, mongoServer);
