require('dotenv').config();

const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const morgan = require('morgan');
const { client } = require ('./db');

client.connect();

server.use(morgan('dev'));

server.use(express.json())

server.listen (PORT, () => {
    console.log ('The server is up on port', PORT)
});

server.use ((req, res, next) => {
    console.log ("___Body Logger START___");
    console.log (req.body);
    console.log ("___Body Logger END___");

    next ();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);