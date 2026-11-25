const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Model name-ah check pannunga
const Item = require('../models/item'); // Item model-um venum

// 1. Send Notification Route (Indha route dhaan missing!)
router.post('/send-notification', async (req, res) => {
    try {
        console.log("Notification Data Received:", req.body); // Check panna
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ message: "Notification sent successfully! 📩" });
    } catch (err) {
        console.error("Error saving notification:", err);
        res.status(500).json({ error: "Notification save panna mudiyala kuttyma." });
    }
});

// 2. Item Create & Get Routes (Pazhaya code-la irundhadhu)
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Inbox-kaga Messages Fetch panra Route
router.get('/notifications/:username', async (req, res) => {
    try {
        const messages = await Message.find({ receiverName: req.params.username })
                                     .sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Messages fetch panna mudiyala." });
    }
});

module.exports = router;