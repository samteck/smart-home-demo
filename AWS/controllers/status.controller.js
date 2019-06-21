const Status = require('../models/status.model')	//import the model file where schema is defined

//store the latest DB entry ID
var id

//this function will take the json from request and store the values in mongoDB
exports.add = function (req, res) {
  console.log("inside add funciton")
  let status = new Status(
    {
      timeStamp: Date.now(),
      temperature: req.body.T,
      humidity: req.body.H,
      pir: req.body.P,
      room: req.body.Room
      
    }
  )
  status.save(function (err,a) {
    if (err) {
      return next(err)
    }
    id = a._id
    console.log("Successfully added Slot details at : " + Date.now() + " with mongoDB ID : " + id)
    res.send('Slots Details Successfully saved')
  })
}

//this function will fetch temperature from DB
exports.temperature = function (req, res) {
  Status.findById(id, function (err, status) {
    if (err) return next(err)
    console.log("====>  /temperature call at : " + Date.now() + " from IP Address : " + req.ip)
    res.send("The temperature for " + status.room + " is : " + String(status.temperature))
  })
}

//this function will fetch the humidity from the DB
exports.humidity = function (req, res) {
   Status.findById(id, function (err, status) {
    if (err) return next(err)
    console.log("====>  /humidity call at : " + Date.now() + " from IP Address : " + req.ip)    
    res.send("The Humidity for " + status.room + " is : " + String(status.humidity))
  })
}

//this function will fetch the IR from the DB
exports.pir = function (req, res) {
   Status.findById(id, function (err, status) {
    if (err) return next(err)
    console.log("====>  /pir call at : " + Date.now() + " from IP Address : " + req.ip)
    res.send("The PIR sensor value for " + status.room + " is : " + String(status.pir))
  })
}

// this function will fetch the IR from the DB
// exports.room = function (req, res) {
//    Status.findById(id, function (err, status) {
//     if (err) return next(err)
//     console.log("====>  /occupiedSlots call at : " + Date.now() + " from IP Address : " + req.ip)
//     res.send(status.occupiedSlot)
//     res.send("hello bro")
//   })
// }

//this function will be called on home page
exports.home = function (req, res) {
  console.log("==========> Someone navigated to homepage at : " + Date.now())
  res.send("You have landed the home page, please navigate to appropriate API")
}
