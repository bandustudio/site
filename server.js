var http = require("http")
, express = require("express")
, consolidate = require("consolidate")
, _ = require("underscore")
, bodyParser = require('body-parser')
//, routes = require('./routes')
, mongoClient = require("mongodb").MongoClient
, app = express()

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(bodyParser.json({
    limit: '5mb'
}))

app.set('views', 'views') //Set the folder-name from where you serve the html page. 
app.use(express.static('./static')) //setting the folder name (public) where all the static files like css, js, images etc are made available
app.set('view engine', 'html')
app.engine('html', consolidate.underscore) //Use underscore to parse templates when we do res.render

var server = http.Server(app)
, portNumber = 8000
, io = require('socket.io')(server) //Creating a new socket.io instance by passing the HTTP server object
server.listen(portNumber, function() { //Runs the server on port 8000
    console.log('Server listening at port ' + portNumber)

    //var url = 'mongodb://localhost:27017/myUberApp' //Db name
    //var url = 'mongodb://user01:1234@ds241699.mlab.com:41699/ahorabondi'
    var url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;

    mongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.

        /*
        var drivers = db.collection('drivers');

        console.log("Seeding Database")

        drivers.insert(driversData, function(err, result) {
            if(err) throw err;
            console.log("Database seeded")
        })*/

        console.log("Connected to Database")

        app.get('/', function(req, res) {
            res.render('index.html')
        });

        app.post('/log', function(req, res) {
            res.render('log.html', {
                userId: req.query.userId
            });
        });

        app.get('/ops', function(req, res) {
            res.render('ops.html');
        });

        app.get('/quiero-participar', function(req, res) {
            res.render('quiero-participar.html');
        });

        app.get('/quienes-somos', function(req, res) {
            res.render('quienes-somos.html');
        });
    });
});

/* 1. Not all the template engines work uniformly with express, hence this library in js, (consolidate), is used to make the template engines work uniformly. Altough it doesn't have any 
modules of its own and any template engine to be used should be seprately installed!*/