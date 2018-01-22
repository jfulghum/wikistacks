var express = require('express');
var wikiRouter = express.Router();
module.exports = wikiRouter 

wikiRouter.get('/', function(req, res, next){
    res.redirect('/');
})

wikiRouter.post('/', function(req, res, next){
    res.json(res.body)
    console.log("req.body", req.body.authorName)
    //we opened our dev console, refreshed, 
    //in network, doc, headers, in form data, we found our body!
})

wikiRouter.get("/add", function( req, res, next){
    // res.render('../views/views/addpage.html')
    res.render('addpage');
})

