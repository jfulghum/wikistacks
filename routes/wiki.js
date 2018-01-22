var express = require('express');
var wikiRouter = express.Router();
const models = require("../models");
const Page = models.Page;

module.exports = wikiRouter

wikiRouter.get('/', function(req, res, next){
    res.redirect('/');
})

wikiRouter.post('/', function(req, res, next){

        // here we are creating a new instance of the Page class. using the build method returns an unsaved object, which you explicity have to save
    const page = Page.build({
        title: req.body.title,
        content: req.body.pageContent,
    });

    page.save()
    .then(function() {
        res.redirect('/')
    })
    .catch(next);
})

wikiRouter.get("/add", function( req, res, next){
    // res.render('../views/views/addpage.html')
    res.render('addpage');
})

