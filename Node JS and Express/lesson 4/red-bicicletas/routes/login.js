var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('session/login');
});

router.post('/', (req, res, next) =>{
    //passport
});


module.exports = router;