var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var mobile_controller = require('../controllers/mobiles');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a mobile.
router.post('/mobiles', mobile_controller.mobile_create_post);
// DELETE request to delete mobile.
router.delete('/mobiles/:id', mobile_controller.mobile_delete);
// PUT request to update mobile.
router.put('/mobiles/:id', mobile_controller.mobile_update_put);
// GET request for one mobile.
router.get('/mobiles/:id', mobile_controller.mobile_detail);
// GET request for list of all mobile items.
router.get('/mobiles', mobile_controller.mobile_list);
module.exports = router;