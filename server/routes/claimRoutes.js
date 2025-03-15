const express = require('express');
const multer = require('multer'); // For file uploads
// const Claim = require('../models/Claim');
const Claim = require('../models/Claims')
const router = express.Router();



// ✅ Patient: Submit a Claim (File Upload Supported)
router.post('/submit', async (req, res) => {
    const { name, email, claimAmount, description,imgUrl } = req.body;
    

    const newClaim = new Claim({
        name,
        email,
        claimAmount,
        description,
        imgUrl
    });

    await newClaim.save();
    res.status(201).json({ message: 'Claim submitted successfully',claimData:newClaim });
});

// ✅ Patient: View Submitted Claims
router.get('/my-claims/:email', async (req, res) => {
    const { email } = req.params;
    const claims = await Claim.find({ email }); // Fetch claims for the logged-in patient
    res.json(claims);
});

// ✅ Insurer: View All Claims with Filters
router.get('/all-claims', async (req, res) => {
    const { status, startDate, endDate, minAmount, maxAmount } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (startDate && endDate) filter.submissionDate = { $gte: startDate, $lte: endDate };
    if (minAmount && maxAmount) filter.claimAmount = { $gte: minAmount, $lte: maxAmount };

    const claims = await Claim.find(filter);
    res.json(claims);
});

// ✅ Insurer: Approve/Reject a Claim
router.put('/update/:id', async (req, res) => {
    const { status, approvedAmount, insurerComments } = req.body;

    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: 'Claim not found' });

    claim.status = status;
    claim.approvedAmount = approvedAmount || claim.claimAmount; // If no amount is provided, approve full amount
    claim.insurerComments = insurerComments;

    await claim.save();
    res.json({ message: 'Claim updated successfully' });
});

module.exports = router;
