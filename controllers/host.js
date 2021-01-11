const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Host = require('../models/host');


exports.createHost = (req, res) => {
  const host = req.body;
  
  //creating a host
  var host_updated = {...host, created_at : Date.now()};
  // console.log(host_updated);
  Host.create(host_updated, async(err, createdHost) => {
      if(err){
          console.error(err);
          res.send({error : err});
          return;
      }

      console.log("HOST CREATED");
      res.send(createdHost);
  })
};

exports.readHosts = (req, res) => {

  //finding all the host's list - for the home page
  Host.find({},(err,hosts) => {
      if(err){
          console.error(err);
          res.send({error : err});
          return;
      }

      console.log("HOSTS LIST READ");
      res.send(hosts);
  });
};

exports.readHost =  (req, res) => {
  const userId = req.query.uid;
  Host.find({_id : mongoose.Types.ObjectId(userId)}, (err, host) => {
    if (err) {
    console.error(err);
    res.send({ error: err });
    return;
    }
    if (host === null) {
      res.send({ error: "NO HOST FOUND" });
      return;
    } 

    console.log("HOST READ");
    res.send(host);
});
};

//Update - to edit the host info
exports.updateHost = (req, res) => {
  const userId = req.query.uid;
  const data = req.body;
  Host.findOne({ _id: mongoose.Types.ObjectId(userId) }, (err, foundHost) => {

    if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    if (foundHost === null) {
      res.send({ error: "NO HOST FOUND" });
      return;
    }

    foundHost.name = req.body.name;
    foundHost.email = req.body.email;
    foundHost.phone = req.body.phone;
    foundHost.address = req.body.address;

    foundHost.save((err) => {
        if (err) {
          console.error(err);
          res.send({ error: err });
          return;
        }
        console.log("HOST EDITED");
        res.send({status : "UPDATED"});
    });
  });
};

//Delete - if any time the host leaves the organisation
exports.deleteHost = (req, res) => {
  const userId = req.query.uid;
  Host.deleteOne({ _id: mongoose.Types.ObjectId(userId) }, (err) => {
    if(err){
        console.error(err);
        res.send({ error: err });
        return;
    }

    console.log("HOST DELETED");
    res.send({ status: "DELETED" });

  });
}
