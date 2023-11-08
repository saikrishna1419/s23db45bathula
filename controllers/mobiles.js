var horses = require('../models/mobiles');

// List of all Horses
exports.mobiles_list = async function (req, res) {
    try {
        themobiles = await mobiles.find();
        res.send(themobiles);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Get details for a specific mobile.
exports.mobiles_detail = async function (req, res) {
    try {
        const detail = await mobiles.findById(req.params.id);
        console.log("Fetched the mobiles details " + detail);
        res.send(detail);
    } catch (error) {
        res.status(500).send(`{"error": "Document for id ${req.params.id} not found"}`);
    }
};


// Handle mobile create on POST.
exports.mobiles_create_post = async function (req, res) {
    console.log(req.body);
    let document = new mobiles();
    document.mobile_name = req.body.mobile_name;
    document.mobile_model = req.body.mobile_model ;
    document.mobile_price = req.body.mobile_price;
    try {
        let results = await document.save();
        res.send(results);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle mobile delete form on DELETE.
exports.mobiles_delete = async function (req, res) {
    try {
        result = await mobiles.findByIdAndDelete(req.params.id);
        console.log("Removed the following mobile " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": "Error deleting ${err}"}`);
    }
};

// Handle Horse update form on PUT.
exports.mobiles_update_put = async function (req, res) {
    try {
        let mobilesUpdate = await mobiles.findById(req.params.id);
        if (req.body.mobile_name)
            mobilesUpdate.mobile_name = req.body.mobile_name;
        if (req.body.mobile_model)
            mobilesUpdate.mobile_model = req.body.mobile_model;
        if (req.body.mobile_price)
            mobilesUpdate.mobile_price = req.body.mobile_price;
        let result = await mobilesUpdate.save();
        console.log("Successfully Updated the mobile " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": "${err}: Update for id ${req.params.id} failed"}`);
    }
};

// VIEWS
// Handle a show all view

exports.mobiles_view_all_Page = async function (req, res) {
    try {
        themobiles = await mobiles.find();
        res.render('mobiles', { title: 'mobiles Search Results', results: themobiles });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
