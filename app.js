var express = require("express");
var app = express();
var morgan = require("morgan");
var nunjucks = require("nunjucks");
var router = require("./routes");
var bodyParser = require("body-parser");

app.engine("html", nunjucks.render); 
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var server = app.listen(9999, function(){
    console.log('listening on port 9999')
});

app.use(express.static("public"))
app.use(router)