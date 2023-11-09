var express = require('express');
const mobile_controlers= require('../controllers/mobiles');
var router = express.Router();
/* GET mobile */
router.get('/', mobile_controlers.mobile_view_all_Page );
module.exports = router;