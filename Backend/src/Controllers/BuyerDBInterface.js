const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

import { Buyers } from "../firebase.js";
import { isValidUsername, isValidEmail } from "./UserUtils.js";

/**
 * Get a buyer by matching id or username or email (only one of the three)
 * 
 * @param {string} id - id of the buyer, null if not specified
 * @param {string} username - username of the buyer, null if not specified
 * @param {string} email - email of the buyer, null if not specified
 * 
 * @returns {object} - buyer object
 * 
 * @throws {Error} - if no id, username, or email is specified
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if buyer does not exist
 */
const getBuyer = async (id, username, email) => {
    if (id == null && username == null && email == null) {
        throw new Error("No id, username, or email specified");
    }
    if (id != null) {
        const buyer = await Buyers.doc(id).get();
        if (buyer.exists) {
            return buyer.data();
        }
    }
    if (username != null) {
        if (!isValidUsername(username)) { // Check validity of username
            throw new Error("Invalid username");
        }
        const buyer = await Buyers.where("username", "==", username).get();
        if (buyer.exists) {
            return buyer.data();
        }
    }
    if (email != null) {
        if (!isValidEmail(email)) { // Check validity of email
            throw new Error("Invalid email");
        }
        const buyer = await Buyers.where("email", "==", email).get();
        if (buyer.exists) {
            return buyer.data();
        }
    }
    throw new Error("Buyer does not exist");
}

/** 
 * Add a new buyer
 * 
 * @param {string} username - username of the buyer
 * @param {string} password - password of the buyer
 * @param {string} display_name - display name of the buyer
 * @param {string} email - email of the buyer
 * @param {string} phone - phone number of the buyer
 * @param {string} address - address of the buyer
 * 
 * @returns {void}
 * 
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if buyer already exists
*/
const addBuyer = async (username, password, display_name, email, phone, address) => {
    // Check validity of username (!= null, length > 0, no special characters)
    if (!isValidUsername(username)) {
        throw new Error("Invalid username");
    }
    // Check validity of email (!= null, length > 0, valid email address)
    if (!isValidEmail(email)) {
        throw new Error("Invalid email");
    }

    // Check if buyer already exists
    try {
        await getBuyer(null, username, email);
    }
    catch (err) {
        if (err.message == "Buyer does not exist") {
            // Buyer does not exist, so add a new buyer
            await Buyers.add({
                username: username,
                password: password,
                display_name: display_name,
                email: email,
                phone: phone,
                address: address
            })
                .catch(err => { throw new Error(err.message) });
            return;
        }
    }
    throw new Error("Buyer already exists");
}

/**
 * Update a buyer's information, if a field does not need to be updated, pass in the old value
 * 
 * @param {string} id - id of the buyer
 * @param {string} username - new username of the buyer
 * @param {string} password - new password of the buyer
 * @param {string} display_name - new display name of the buyer
 * @param {string} email - new email of the buyer
 * @param {string} phone - new phone number of the buyer
 * @param {string} address - new address of the buyer
 * 
 * @returns {void}
 * 
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if buyer does not exist
*/
const updateBuyer = async (id, username, password, display_name, email, phone, address) => {
    // Check validity of username (!= null, length > 0, no special characters)
    if (!isValidUsername(username)) {
        throw new Error("Invalid username");
    }
    // Check validity of email (!= null, length > 0, valid email address)
    if (!isValidEmail(email)) {
        throw new Error("Invalid email");
    } 
    // Check if buyer exists
    const buyer = await getBuyer(id, null, null);
    // Update buyer information
    await Buyers.doc(id).update({
        username: username,
        password: password,
        display_name: display_name,
        email: email,
        phone: phone,
        address: address
    });
}

/**
 * Delete a buyer
 * 
 * @param {string} id - id of the buyer
 * 
 * @returns {void}
 * 
 * @throws {Error} - if buyer does not exist
*/
const deleteBuyer = async (id) => {
    // Check if buyer exists
    const buyer = await getBuyer(id, null, null);
    // Delete buyer
    await Buyers.doc(id).delete();
}

export { 
    getBuyer, 
    addBuyer, 
    updateBuyer, 
    deleteBuyer 
};