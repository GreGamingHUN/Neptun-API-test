var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('second.ejs', {
        tmp: tmp
    })
})


module.exports = router;