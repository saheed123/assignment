require('./models/database');
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const route = require('./route/routes');
const morgan = require('morgan');

app.use(morgan('tiny'));
const port = process.env.CLIENT_PORT;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());






app.use('/', route)

app.listen(port, () => { console.log(`app listening on port ${port} `) });
