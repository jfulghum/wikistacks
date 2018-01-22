var express = require('express');
var router = express.Router();
module.exports = router;
var wikiRouter = require('./wiki');
var userRouter = require('./user');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function(req, res){
    res.render('index')
})