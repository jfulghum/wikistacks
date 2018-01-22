var express = require("express");
var app = express();
var morgan = require("morgan");
var nunjucks = require("nunjucks");
var router = require("./routes");
var bodyParser = require("body-parser");
const models = require("./models");

app.engine("html", nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


/* we could sync each model individually:
// we need to sync our models before we starting listening on the port:
models.User.sync({}) // a promise, when it resolves then then sync page.
.then(function() {
    return models.Page.sync({})
    // we are returning to ensure that the syncing is complete before we move on.
})
.then(function() {
    app.listen(9999, function() {
        console.log('listening on port 9999')
        // postgres is listening on 5432, so our app can't listen on 5432

        // we want our app to initialize only after the db is set up
    })
})
.catch(console.error);

alternativel, we can sync the entire db at once
*/

// the force: true parameter will drop the table first and re-create it afterwards.  - if you force, existing tables will be overwritten


models.db.sync({force: true})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


app.use(express.static(__dirname + "/public"))
app.use(router)
