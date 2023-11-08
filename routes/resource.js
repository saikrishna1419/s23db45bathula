var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var mobiles_controller = require('../controllers/mobiles');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/mobiles', mobiles_controller.mobiles_create_post);
// DELETE request to delete Costume.
router.delete('/mobiles/:id', mobiles_controller.mobiles_delete);
// PUT request to update Costume.
router.put('/mobiles/:id', mobiles_controller.mobiles_update_put);
// GET request for one Costume.
router.get('/mobiles/:id', mobiles_controller.mobiles_detail);
// GET request for list of all Costume items.
router.get('/mobiles', mobiles_controller.mobiles_list);
module.exports = router;