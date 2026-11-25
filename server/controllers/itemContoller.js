const Item = require('../models/item');

// 1. Create New Item
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body); // Image illadhanaala direct req.body
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Get All Items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Send Message (Notification)
exports.sendMessage = async (req, res) => {
    const { itemId, senderName, message } = req.body;
    try {
        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.messages.push({ senderName, message });
        await item.save();
        res.status(200).json({ message: "Notification sent!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Get Notifications
exports.getNotifications = async (req, res) => {
    const { username } = req.params;
    try {
        // Logged-in user name-la irukira items and adhu kulla irukira messages fetch panrom
        const items = await Item.find({ studentName: username });
        let notifications = [];
        items.forEach(item => {
            item.messages.forEach(msg => {
                notifications.push({
                    itemName: item.itemName,
                    from: msg.senderName,
                    text: msg.message,
                    date: msg.date
                });
            });
        });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};