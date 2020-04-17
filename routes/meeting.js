const express = require('express');
const router = express.Router();
const { getMeetingById } = require('../services/meeting-service');

router.get('/:id', (req, res) => {
    //res.send('called');
    res.send(getMeetingById(req.params.id));
})
module.exports = router;