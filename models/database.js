require('dotenv').config();

const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const dbPorts = process.env.dbPort;


mongoose.connect('mongodb://localhost/assignment', { useNewUrlParser: true },(error) => {
  if (error) {
    console.log('connection error');
  }
  else {
    console.log(`connection successfull on localhost ${hostname} database port ${dbPorts}`);
  }
});