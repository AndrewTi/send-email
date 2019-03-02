const validator = require('validator');
const nodeMailjet = require('node-mailjet');

const AppError = require('../../../libs/app-error');

const mailjet = nodeMailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

module.exports = {
    sendMail(req, res, next) {
        const {
            // required
            from,
            sendTo,
            body,

            // not required
            subject,
            name,
        } = req.body;

        if(!(from && validator.isEmail(from) && sendTo && validator.isEmail(sendTo) && body))
            return next(new AppError(400));

        mailjet
            .post("send", {
                'version': 'v3.1'
            })
            .request({
                "Messages": [{
                    "From": {
                        "Email": process.env.EMAIL,
                        "Name": "Mailjet Pilot"
                    },
                    "To": [{
                        "Email": sendTo,
                        "Name": 'Recieve'
                    }],
                    "Subject": subject || '',
                    "HTMLPart": `
                        <div>from: ${from}</div>
                        <div>name: ${name || ''}</div>
                        <div>body: ${body || ''}</div>
                    `,
                }]
            }).then(resp => {
                res.json({ok: true})
            }).catch(err => {
                console.log(err);

                res.json({ok: false})
            })
    }
}