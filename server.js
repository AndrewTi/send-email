require('dotenv').config({ path: 'configs/config.env' });

const express = require('express');
const bodyPar = require('body-parser');
const cors    = require('cors');

const api = require('./api');

const app = express();

app
    .use(cors())
    .use(bodyPar.json())
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