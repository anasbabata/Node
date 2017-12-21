require('dotenv').config()
var app = require('./app');
var port = process.env.PORT;
var url = process.env.DB_URL;
const bodyParser= require('body-parser')

var MongoClient = require('mongodb').MongoClient;

var db

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/babata", (err, dataBase) => {
  if(err) return console.log(err)
  	db = dataBase
  	app.listen(port, () => {
  	console.log("listenning on port 3000")
  })
});

// Including body parser

app.use(bodyParser.urlencoded({extended: true}))


// CRUD-READ

app.get('/', function(req, res) {
  res.sendFile('/home/abdoul/Desktop/Babata/UserManager/index.html')
})

// CRUD-CREATE

app.post('/quotes', (req, res) => {
  db.db('babata').collection.save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// Dispalying Colleections to the user

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function(err,result)
})