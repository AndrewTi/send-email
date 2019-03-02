const route = require('express').Router();

const mail = require('./routes/mail');

route.use('/mails', mail);

module.exports = route;