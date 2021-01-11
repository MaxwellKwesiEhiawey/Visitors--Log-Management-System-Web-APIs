const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/visitor');
const mongoose = require("mongoose");
const router = require('express').Router();


exports.addVisitor = (req, res, next) => {
  const {name,phone,email,host_name,host_email,host_phone} = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        res.send('error', 'E-Mail exists already, please pick a different one'); 
      }
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
          add_visited: "",
          created_at: Date.now()
        });
        user.save()
      .then(result => {
        res.send('User created');
      });
    })
 
};

exports.postLogout = (req, res, next) => {
  
};
