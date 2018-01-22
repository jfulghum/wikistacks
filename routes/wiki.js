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
        res.redirect(page.route)
        // res.render("wikipage", {
        //     page
        // })
        // what is the difference between the res.render & res.redirect?
    })
    .catch(next);
})

wikiRouter.get("/add", function( req, res, next){
    // res.render('../views/views/addpage.html')
    res.render('addpage');
})

//:anything is a wildcard so we have to put this below /add. or we'll never get to add!
wikiRouter.get("/:urlTitle", function(req, res, next){
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(page){
       // res.json(page)
       res.render("wikipage", {
           page
       })
    }).catch(next)
})
// findAll is searching for multiple instances only.
// findOne is searching for one instance. 