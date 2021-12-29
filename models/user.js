const mongoose = require('mongoose');
const token = require('jsonwebtoken');
require('dotenv').config();

const AssignSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,



  },
  lastname: {
    type: String,
    required: true

  },
   email: {
    type: String,
    required: true,
    unique: true



  },
  password: {
    type: String,
    required: true,



  },
  confirm: {
    type: String,
    required: true


  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
  
    
  ,

  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }


});
var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    Required: [true, 'Kindly enter the name of the task'],
    trim: true,
    maxlength: [30, 'name must be more than thirty']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assign',
    required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
  
    default: false
  }
});


AssignSchema.methods.generateToken = function () {
  const accessToken = token.sign({
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    isAdmin: this.isAdmin,
    tasks: this.tasks
  }, process.env.JWT_SEC, {
    expiresIn: '2d'
  });
  return accessToken;

}
AssignSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
})
AssignSchema.methods.findUserWithSameName = function () {
  return this.model("Assign")
    .find({
      fullname: this.fullname
    })
    .exec();
}


AssignSchema.methods.fullname = function () {
  return ` ${this.firstname} ${this.lastname}`;
}


const Task = mongoose.model('Task', TaskSchema);


const Assign = mongoose.model('Assign', AssignSchema);

module.exports = { Assign,Task};