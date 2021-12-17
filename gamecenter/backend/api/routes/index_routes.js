const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the GameCenter API');
});


module.exports = router;