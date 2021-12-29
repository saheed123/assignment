const { Assign, Task } = require('../models/user');



const _ = require('lodash');


const {
  validationResult
} = require('express-validator');
const bcrypt = require('bcrypt');
exports.postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(
      errors.array()
    );
  }
  var user = new Assign(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'confirm']));
  user.password = await bcrypt.hash(user.password, 10);
  user.confirm = user.password;
  user.fullname = user.fullname;
  user.tasks = [];
  const token = user.generateToken();
  const fullname = user.fullname();
  const {
    _id,
    password,
    confirm,
    tasks,
    ...other
  } = user._doc;
  try {
    await user.save();
    res.header('x-auth-token', token).status(200).json({
      ...other,
      token,
      fullname
    });

  } catch (ex) {
    next(ex);

  }




}
exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  try {

    const user = await Assign.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(400).send('invalid!!! email not registered');
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) {
      return res.status(400).send('invalid password');
    }
    const accessToken = user.generateToken();

    const {
      _id,
      password,
      confirm,
      ...other
    } = user._doc;
    res.header('x-auth-token', accessToken).status(200).json({
      ...other,
      accessToken
    });





  } catch (error) {
    next(error);

  }





}
exports.updateUser = async (req, res) => {
  

  if (req.body.password) {
    req.body.password = bcrypt.hash(req.body.password, 10)
  }
  try {
    const updateUser = await Assign.findOneAndUpdate(req.user._id, {
      $set: req.body
    }, {
      new: true
    });
    updateUser ? res.status(200).json({
      message: 'successfully updated'
    }) : res.status(400).json({
      message: 'not found'
    });

  } catch (error) {
    res.status(500).json(error);

  }

}
exports.deleteUser = async (req, res, next) => {

  try {
    
     

    await Assign.findByIdAndDelete({ _id: req.user._id });
    await Task.deleteMany({ user: req.user._id});
    return res.status(200).json({ message: 'successfully deleted' });
    


  } catch (error) {
    
    next();

  }










}
exports.findUser = async (req, res, next) => {
 const assign = await Assign.findOne({ _id: req.user._id });

  res.status(200).json(assign);
}
exports.logout = async (req, res, next) => {
  req.logout();
  res.status(200).json({
    message: 'logout successfull'
  });

}
exports.findall = async (req, res, next) => {
  try {
    const all = await Assign.find({});


    return res.status(200).json(all);
    

    
  } catch (error) {
  
    next();

    
  }
  





}