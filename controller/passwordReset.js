const crypto = require('crypto');
const {Assign} = require('../models/user');
const Token = require('../models/token');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmails');
const bcrypt = require('bcrypt');
const {
  verifyANDuPDATE
} = require('../config/verifyToken');
const passwordReset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({
      errors: errors.array()
    });
  }
  const user = await Assign.findOne({
    email: req.body.email
  });
  if (!user) {

    return res.status(400).send({message :'email not available in the database'});
  }
  const token = await Token.findOne({
    _userId: user._id
  });
  if (token) {
    await token.deleteOne();
  }
  let reset = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(reset, 10);
  const value = new Token({
    _userId: user._id,
    token: hash,
    createdAt: Date.now(),

  })
  try {
    await value.save();
    console.log(value);
    const link = `${process.env.CLIENT_URL}/passwordreset/${value.token}/${user._id}`;
    await sendEmail(user.email, 'password reset', link, {name: user.fullname});

    res.send('password reset link sent to' + '\t' + user.email);
    return link;

  } catch (error) {
    res.status(500).json(error.message);

  }
}
module.exports = passwordReset;