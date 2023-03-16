const express = require('express');
const app = express();

import { getBuyer, addBuyer, updateBuyer, deleteBuyer } from "./BuyerDBInterface.js";

const port = 3000;

/**
 * Get a buyer by username
 */
app.get('/buyers/:username', async (req, res) =>{
    const username = req.params.username;
    try {
        const buyer = await getBuyer(null, username, null);
        res.status(200).json(buyer);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});

/**
 * Add a new buyer
*/
app.post('/buyers', async (req, res) => {
    const { username, password, display_name, email, phone, address } = req.body;
    try {
        await addBuyer(username, password, display_name, email, phone, address);
        res.status(200).send("/buyers/" + username);
    }
    catch (err) {
        if (err.message == "Invalid username") {
            res.status(400).send(err.message);
        }
        else if (err.message == "Invalid email") {
            res.status(400).send(err.message);
        }
        else if (err.message == "Buyer already exists") {
            res.status(409).send(err.message);
        }
        else {
            res.status(500).send(err.message);
        }
    }
});

/**
 * Update a buyer, given buyer_id, if a field is null, use old value
*/
app.put('/buyers/:buyer_id', async (req, res) => {

    // Get buyer_id from request
    const buyer_id = req.params.buyer_id;

    // Get updated buyer info from request
    const { username, password, display_name, email, phone, address } = req.body;

    try {

        // Get old buyer info; if a field in request is null, use old value
        const buyer_old = await getBuyer(buyer_id, null, null);
        if (username == null) {
            username = buyer_old.username;
        }
        if (password == null) {
            password = buyer_old.password;
        }
        if (display_name == null) {
            display_name = buyer_old.display_name;
        }
        if (email == null) {
            email = buyer_old.email;
        }
        if (phone == null) {
            phone = buyer_old.phone;
        }
        if (address == null) {
            address = buyer_old.address;
        }

        // Update buyer
        await updateBuyer(buyer_id, username, password, display_name, email, phone, address);
        res.status(200).send("Buyer updated");
    }
    catch (err) {
        if (err.message == "Invalid username") {
            res.status(400).send(err.message);
        }
        else if (err.message == "Invalid email") {
            res.status(400).send(err.message);
        }
        else if (err.message == "Buyer does not exist") {
            res.status(404).send(err.message);
        }
        else {
            res.status(500).send(err.message);
        }
    }
});

/**
 * Delete a buyer
*/
app.delete('/buyers/:buyer_id', async (req, res) => {
    const buyer_id = req.params.buyer_id;
    try {
        await deleteBuyer(buyer_id);
        res.status(200).send("Buyer deleted");
    }
    catch (err) {
        if (err.message == "Buyer does not exist") {
            res.status(404).send(err.message);
        }
        else {
            res.status(500).send(err.message);
        }
    }
});