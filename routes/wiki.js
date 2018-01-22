var express = require('express');
var wikiRouter = express.Router();
const models = require("../models");
const Page = models.Page;
const User = models.User;

module.exports = wikiRouter

wikiRouter.get('/', function(req, res, next){
    res.redirect('/');
})

wikiRouter.post('/', function(req, res, next){
    User.findOrCreate({
        where: {
            name: req.body.authorName,
            email: req.body.authorEmail
        }
    })
    .spread(function (user, createdPageBool) {
        return Page.create(req.body)
            .then(function (page) {
                return page.setAuthor(user);
            });
    })
    .then(function(createdPage){
        res.redirect(createdPage.route);
    })
    .catch(next);
    
});

// when you use find or create, it returns an array, the first value in the array returns the whole object and the second value in the array is whether it was found or it was created

// when you're defining a relationship use "setAuthor" as opposed to manually defining the prop on the page instance.

// we dont need to explicity tell sequelize to setAuthor(user.Id)

// you can't set the author to a page that doesn't exist, hence it must come after the save

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
