const express = require('express')		//import express framework 
const router = express.Router()			//created router object using express framework

// Require the controllers so that routes can be forwareded to appropriate function
const controller = require('../controllers/status.controller')

// Routes the API to the appropriate function in controller.js
router.post('/add', controller.add)
router.get('/temperature', controller.temperature)
router.get('/humidity', controller.humidity)
router.get('/pir', controller.pir)
//router.get('/room', controller.room)
router.get('/', controller.home)

//export the module
module.exports = router
