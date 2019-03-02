const route = require('express').Router();

const {
    sendMail
} = require('../controllers/mail');

route
    .post('/send', sendMail);

module.exports = route;