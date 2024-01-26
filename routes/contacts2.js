const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');  
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('contacts').find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const contact = await mongodb.getDb().collection('contacts').findOne({ _id: userId });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Error getting contact by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const contact = req.body;
        const result = await mongodb.getDb().collection('contacts').insertOne(contact);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const updatedContact = req.body;
        const result = await mongodb.getDb().collection('contacts').updateOne({ _id: userId }, { $set: updatedContact });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
