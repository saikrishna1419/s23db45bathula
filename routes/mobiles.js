const express = require('express');
const router = express.Router();
const mobile = require('../models/mobiles');

// List of all mobiles
router.get('/', async (req, res) => {
    try {
        const mobiles = await mobile.find();
        res.send(mobiles);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
});

// Get details for a specific mobile.
router.get('/:id', async (req, res) => {
    try {
        const detail = await mobile.findById(req.params.id);
        console.log("Fetched the mobile details " + detail);
        res.send(detail);
    } catch (error) {
        res.status(500).send(`{"error": "Document for id ${req.params.id} not found"}`);
    }
});

// Handle mobile create on POST.
router.post('/', async (req, res) => {
    const { mobile_name, mobile_model, mobile_price } = req.body;
    const newMobile = new mobile({ mobile_name, mobile_model, mobile_price });
    
    try {
        const result = await newMobile.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
});

// Handle mobile delete on DELETE.
router.delete('/:id', async (req, res) => {
    try {
        const result = await mobile.findByIdAndDelete(req.params.id);
        console.log("Removed the following Horse " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": "Error deleting ${err}"}`);
    }
});

// Handle mobile update on PUT.
router.put('/:id', async (req, res) => {
    try {
        const mobileUpdate = await mobile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Successfully Updated the Horse " + mobileUpdate);
        res.send(mobileUpdate);
    } catch (err) {
        res.status(500).send(`{"error": "${err}: Update for id ${req.params.id} failed"}`);
    }
});

module.exports = router;
