const express = require('express')				//import express framework
const app = express()							//create an express app
const bodyParser = require('body-parser')		//import body-parser to get values from POST body
const route = require('./routes/status.route')	//import route file to forward requests
const mongoose = require('mongoose')			//import mongoose to interact with DB

// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/havells'
let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//for express app use body parser and where to route the API's
app.use(bodyParser.json())
app.use('/', route)

//defined the port and started the app on defined port
let port = 3000
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port)
})
