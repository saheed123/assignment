const {
  Assign
} = require('../models/user');
const {
  check
} = require('express-validator');


module.exports = {

  registerValidator: [
    check('firstname', 'fullname is required').notEmpty().withMessage('firstname field must not be empty'),
    check('lastname', 'fullname is required').notEmpty().withMessage('lastname field must not be empty'),
    check('email', 'email is required').notEmpty().withMessage(' email field must not be empty').isEmail().withMessage('must be an email')
    .custom((value, {
      req
    }) => {
      return Assign.findOne({
          email: req.body.email
        })
        .then(user => {
          if (user) {
            return Promise.reject(`email ${user.email} is already in use`)
          }
        })

    }),
    check('password', 'password must not be empty').notEmpty().withMessage('password field must not be empty').isLength({
      min: 7
    }).withMessage('length must be more 7 or more'),
    check('confirm', 'password must be same').exists().custom((value, {
      req
    }) => {
      return value === req.body.password
    }),



  ],
  loginValidator: [
    check('email', 'email must not be empty').notEmpty().isEmail(),
    check('password', 'password is required').notEmpty()
  ],
  passwordReset: [
    check('email', 'email is required').notEmpty().withMessage(' email field must not be empty').isEmail().withMessage('not a valid email')
  ],
  task: [
    check('name', 'must not be empty').notEmpty().withMessage('must not be empty')
  ]


}