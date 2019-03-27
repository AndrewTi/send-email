require('dotenv').config({ path: 'configs/config.env' });

const express = require('express');
const bodyPar = require('body-parser');
const cors    = require('cors');

const api = require('./api');

const app = express();

app
    .use(cors())
    .use(bodyPar.json())
    .get('/.well-known/acme-challenge/1SyDwT7uEWEVALi6q64AH1NC4DvcntiXsWSbOG2QHr8', (req, res, next) => {
        res.end('1SyDwT7uEWEVALi6q64AH1NC4DvcntiXsWSbOG2QHr8.4baKHStynxUCgJlxm4TlJz0Ist8ifARJTUP0TIfjUeI');
    })
    .use('/api', api)
    .use((err, req, res, next) => {
        if(err.name == "CustomError") {
            res.status(err.statusCode || 200);
            
            if(err) {
                return res.json({
                    error: true,
                    ok: false,
                    code: err.statusCode || 500,
                    message: err.message
                });
            }
        }
    })

app.listen(process.env.PORT);