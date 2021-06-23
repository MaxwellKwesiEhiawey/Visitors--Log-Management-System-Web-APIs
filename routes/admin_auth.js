const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('../controllers/admin');
const adminController = require('../controllers/admin');
const { body } = require('express-validator');
const User = require('../models/admin');
const logout = require('../models/logout');
const router = express.Router();
router.post(
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
  adminController.signup
);

router.post("/login", login);
///to logout///
router.post('/logout', adminController.postLogout);
// to update
router.put("/edit/:id", adminController.updateUser);

///to delete user///

router.post("/deleteUser", adminController.deleteUser);

module.exports = router;