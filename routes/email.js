var express = require('express');
var router = express.Router();
const { sendEmail } = require('../services/email-service');

/* GET users listing. */
router.post('/send', async function(req, res, next) {
    try{
        await sendEmail(req.body);
        res.send('Email sent successfully!');

    } catch(ex) {
        console.log(ex)
        res.status(500).send(ex);
    }
});

module.exports = router;
