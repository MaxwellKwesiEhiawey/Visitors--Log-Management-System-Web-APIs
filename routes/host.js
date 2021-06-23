const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('../controllers/host');
const hostController = require('../controllers/host');
const { body } = require('express-validator');
const Host = require('../models/host');
const router = express.Router();

router.post("/addhost", hostController.createHost); // create new host

router.get("/read/hosts", hostController.readHosts); // read hosts

router.get("/read", hostController.readHosts); //read a host

router.put("/edit/:id", hostController.updateHost);   // to update host details

router.delete("/del", hostController.deleteHost) //to delete form worker


module.exports = router;