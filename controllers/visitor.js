const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/visitor');
const Admin = require('../models/admin');
const Host = require('../models/host');
const Checkout = require('../models/logout');
const mongoose = require("mongoose");
const router = require('express').Router();
const QRCode = require('qrcode');
const visitor = require('../models/visitor');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { Code } = require('bson');

// const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      // api_key:
      //   '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'
      api_key:'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'
    }
  })
);


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

tod = mm + '/' + dd + '/' + yyyy;

let time = new Date(2019, 09, 03)


exports.addVisitor = (req, res, next) => {
  const {name,phone,email,host_name,host_email,host_phone,why_visited} = req.body;
QRCode.toDataURL(`Name: ${name}
Email:${email}
Phone:${phone}
Host_name:${host_name}
Why_visited:${why_visited}`, function (err,url) {
  User.findOne({ email: email })
  //   .then(userDoc => {
  //     if (userDoc) {
  //       res.send('error', 'E-Mail exists already, please pick a different one'); 
  //     }
        const user = new User({
          name: name,
          phone: phone,
          email: email,
          status:'pending',
          check_in: Date.now(),
          check_out: '',
          host_name: host_name,
          host_email: host_email,
          host_phone: host_phone,
          why_visited: why_visited,
          created_at: Date.now(),
          qrcode: url
        });
        user.save()
      .then(result => {
        res.send(`Welcome! Please hold as we connect you to ${host_name}`);
        return transporter.sendMail({
          to:email,
          from:'obedampah17@gmail.com',
          subject: 'Signup succeeded!',
          html: `<h1>${host_name} welcomes You! Please scan the QR code attached to come in.`,
          attachments: [
            {filename: "downloadt-to-login.png",
            path: `${url}`
            }
          ]
        });
      });
    })
    }
 
;

exports.outVisitor = async (req,res) => {
  let logout = new Checkout () 
  try{
  let log = await logout.save()
  console.log("You are Checked Out!")
  res.json(log)
  }catch{
    error =>{
      
      res.json({error})
    }
  }
  };

  exports.statsVisitor = function(req, res){
    User.find(function(error, user){
      if(error) throw error
      else{
        Admin.find(function(error, admin){
          if(error) throw error
            else{
              Host.find(function(error, host){
                if(error) throw error
                else{
                  res.json({
                    User : User.length,
                    Admin : Admin.length,
                    Host : Host.length
                  })
                  
                }
              })
            }
          
        })
      }
    })}
