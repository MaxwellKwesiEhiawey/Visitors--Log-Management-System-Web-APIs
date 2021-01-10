const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('../controllers/auth');
const authController = require('../controllers/auth');
const { body } = require('express-validator/check');
const User = require('../models/users');
const router = express.Router();
router.put(
  '/signup',
  [ 
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
      body('phone')
      .trim()
      .not()
      .isEmpty(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
      body('host')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);



router.post("/login", login);

///to logout///

// router.post('/logout', authController.postLogout);

///to delete user///

// router.post("/deleteUser", authController.deleteUser);

module.exports = router;