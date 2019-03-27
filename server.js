require('dotenv').config({ path: 'configs/config.env' });

const express = require('express');
const bodyPar = require('body-parser');
const https   = require('https');
const http    = require('http');
const cors    = require('cors');
const fs      = require('fs');

const key = fs.readFileSync(process.env.SSL_PRIVATE_KEY, 'utf8');
const cert = fs.readFileSync(process.env.SSL_CERT, 'utf8');
const ca = fs.readFileSync(process.env.SSL_CA, 'utf8');


const options = {
    key,
    cert,
    ca
}

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

http.createServer(app).listen(process.env.PORT);
https.createServer(options, app).listen(process.env.SSL_PORT);