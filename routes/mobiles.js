var express = require('express');
const mobile_controlers = require('../controllers/mobiles');
var router = express.Router();

// Define the secured function
function secured(req, res, next) {
    if (req.user) {
      return next();
    }
    res.redirect('/login');
  }
  
/* GET mobile */
router.get('/', mobile_controlers.mobile_view_all_Page);
module.exports = router;

// GET request for one costume.
router.get('/mobiles/:id', mobile_controlers.mobile_detail);

/* GET detail costume page */
router.get('/detail', mobile_controlers.mobile_view_one_Page);

/* GET create costume page */
router.get('/create', secured, mobile_controlers.mobile_create_Page);

/* GET create update page */
router.get('/update', secured, mobile_controlers.mobile_update_Page);

/* GET delete costume page */
router.get('/delete', secured, mobile_controlers.mobile_delete_Page);
