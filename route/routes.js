const express = require('express');

const route = express.Router();
const resetPassword = require('../controller/passwordReset');
const changePassword = require('../controller/changePassword');
const {
  loginUser,
  updateUser,
  deleteUser,
  findUser,
  postUser,
  logout,
  findall
} = require('../controller/userController');
const {
  verifyToken
} = require('../config/verifyToken');
const admin = require('../config/admin');
const {
  list_all_tasks,
  create_a_task,
  read_a_task,
  update_a_task,
  delete_a_task
} = require('../controller/todoListController');
const {
  loginValidator,
  registerValidator,
  passwordReset,
  task
} = require('../config/validator');
route.post('/register', registerValidator, postUser);
route.post('/login', loginValidator, loginUser);
route.post('/passwordReset', passwordReset, resetPassword);
route.post('/passwordReset/:userId/:token', changePassword);
route.put('/register/update',registerValidator,verifyToken, updateUser);
route.delete('/register/delete',[verifyToken,admin], deleteUser);
route.get('/me', verifyToken, findUser);
route.get('/all',[verifyToken,admin], findall);
route.get('/task/all',verifyToken, list_all_tasks);
route.post('/task/create',task,verifyToken, create_a_task);
route.get('/task/read/:id',verifyToken,read_a_task);
route.put('/task/updateTask', [verifyToken,admin], update_a_task);
route.delete('/task/delete', delete_a_task);

route.get('/logout', logout);


module.exports = route;