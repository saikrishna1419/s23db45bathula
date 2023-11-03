var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const query = req.query
    console.log('row ${query.rows}');
    console.log('cols ${query.cols}');
    res.render('board', { title: 'Board Display', query: query });
});

module.exports = router;
