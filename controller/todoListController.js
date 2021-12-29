'use strict';
const { Assign, Task } = require('../models/user');
const { validationResult} = require('express-validator');







exports.list_all_tasks = async function (req, res,next) {
  try {
    const task = await Task.find({user: req.user._id}, '_id user name').exec()
  res.status(200).json(task);
    
  } catch (error) {
    next();

    
  }
 
};

exports.create_a_task = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).send(errors.array());
  var todo = new Task(req.body);
  todo.user = req.user._id;
  
  
  try {
    
     await todo.save();

    const user = await Assign.findById({ _id: todo.user });
    user.tasks.push(todo);
    await user.save();
    res.status(200).json({ success: true, todo });

  } catch (error) {
    res.status(500).json({success: false, msg:error.message });
  

  }


 




};

exports.read_a_task = async function (req, res) {
  try {
    const data = await Task.findOne({
      _id: req.params.id
    });
   return  data ? res.status(200).json(data) : res.json({
      message: 'null'
    });

  } catch (error) {
    res.status(500).json(error.message);
  }

};

exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate({
    user: req.user._id
  }, req.body, {
    new: true
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function (req, res) {

  Task.findOneAndDelete({
    user: req.user._id
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({
      message: 'Task successfully deleted'
    });
  });
};