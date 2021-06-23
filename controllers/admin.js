const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/admin');
const Admin = require('../models/admin');
const Checkout = require('../models/logout');



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

tod = mm + '/' + dd + '/' + yyyy;

let time = new Date(2019, 09, 03)

exports.signup = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed.');
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const host = req.body.host;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        name:name,
        email:email,
        phone:phone,
        host:host,
        password:hashedPw,
      });
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  Admin.findOne({ _id: mongoose.Types.ObjectId(userId) }, (err, foundAdmin) => {
 
    if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    if (foundAdmin === null) {
      res.send({ error: "NO ADMIN FOUND" });
      return;
    }
 
    foundAdmin.name = req.body.name;
    foundAdmin.email = req.body.email;
    foundAdmin.phone = req.body.phone;
    foundAdmin.password = req.body.password;
 
    foundAdmin.save((err) => {
        if (err) {
          console.error(err);
          res.send({ error: err });
          return;
        }
        console.log("ADMIN EDITED");
        res.send({status : "UPDATED"});
    });
  });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.body)
  User.deleteOne({ email: req.body.email}).then(user => {
      if (user) {
          return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
      }
  });
};
exports.postLogout = async (req,res) => {
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
