const mongoose = require('mongoose')	//imported mongoose to define a schema
const Schema = mongoose.Schema			//created a schema object with mongoose

//define a schema for the DB entries
let StatusSchema = new Schema({
  
  timeStamp: {type: Date, required: true},
  temperature: {type: Number, required: true},
  humidity: {type: Number, required: true},
  pir: {type: Number, required: true},
  room: {type: String, required: true},
  
})

// export the module
module.exports = mongoose.model('Status', StatusSchema)
