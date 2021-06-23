const { validationResult } = require('express-validator');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Host = require('../models/host');
const host = require('../models/host');


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
// exports.updateHost = (req, res) => {
//   const userId = req.query.uid;
//   const data = req.body;
//   Host.findOne({ _id: mongoose.Types.ObjectId(userId) }, (err, foundHost) => {
//     if (err) {
//         console.error(err);
//         res.send({ error: err });
//         return;
//         }
//     if (foundHost === null) {
//       res.send({ error: "NO HOST FOUND" });
//       return;
//     }

//     foundHost.name = req.body.name;
//     foundHost.email = req.body.email;
//     foundHost.phone = req.body.phone;
//     foundHost.address = req.body.address;

//     foundHost.save((err) => {
//         if (err) {
//           console.error(err);
//           res.send({ error: err });
//           return;
//         }
//         console.log("HOST EDITED");
//         res.send({status : "UPDATED"});
//     });
//   });
// };
exports.updateHost = (req, res, next) => {
  const userId = req.params.id;
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
    foundHost.password = req.body.password;
    foundHost.save((err) => {
        if (err) {
          console.error(err);
          res.send({ error: err });
          return;
        }
        console.log("HOST EDITED");
        res.send({status : "HOST UPDATED"});
    });
  });
};

//Delete - if any time the host leaves the organisation
exports.deleteHost = (req, res, next) => {
  Host.deleteOne({ email: req.body.email}).then(user => {
      if (user) {
          return res.status(200).json({message: 'Host deleted successfully. Refreshing data...', success: true});
      }
  });
};
