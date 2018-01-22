var express = require('express');
var router = express.Router();
module.exports = router;
var wikiRouter = require('./wiki');
var userRouter = require('./user');
const models = require("../models");
const Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function(req, res, next){
    // res.render('index')
    Page.findAll()
    .then(function(pages){
        console.log(pages)
        res.render("index", {
            pages
        })
    }).catch(next)
})