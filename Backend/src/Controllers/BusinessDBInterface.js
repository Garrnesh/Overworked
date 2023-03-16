const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

import { Business } from "../firebase.js";
import { isValidUsername, isValidEmail } from "./UserUtils.js";

/**
 * Get a business by matching id or username or email (only one of the three)
 * 
 * @param {string} id - id of the business, null if not specified
 * @param {string} username - username of the business, null if not specified
 * @param {string} email - email of the business, null if not specified
 * 
 * @returns {object} - business object
 * 
 * @throws {Error} - if no id, username, or email is specified
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if business does not exist
 */
const getBusiness = async (id, username, email) => {
    if (id == null && username == null && email == null) {
        throw new Error("No id, username, or email specified");
    }
    if (id != null) {
        const business = await Business.doc(id).get();
        if (business.exists) {
            return business.data();
        }
    }
    if (username != null) {
        if (!isValidUsername(username)) { // Check validity of username
            throw new Error("Invalid username");
        }
        const business = await Business.where("username", "==", username).get();
        if (business.exists) {
            return business.data();
        }
    }
    if (email != null) {
        if (!isValidEmail(email)) { // Check validity of email
            throw new Error("Invalid email");
        }
        const business = await Business.where("email", "==", email).get();
        if (business.exists) {
            return business.data();
        }
    }
    throw new Error("Business does not exist");
}

/** 
 * Add a new business
 * 
 * @param {string} username - username of the business
 * @param {string} password - password of the business
 * @param {string} display_name - display name of the business
 * @param {string} email - email of the business
 * @param {string} phone - phone number of the business
 * @param {string} shop_id - shop id of the business
 * 
 * @returns {void}
 * 
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if business already exists
*/
const addBusiness = async (username, password, display_name, email, phone, shop_id) => {
    // Check validity of username (!= null, length > 0, no special characters)
    if (!isValidUsername(username)) {
        throw new Error("Invalid username");
    }
    // Check validity of email (!= null, length > 0, valid email address)
    if (!isValidEmail(email)) {
        throw new Error("Invalid email");
    }

    // Check if business already exists
    try {
        await getbusiness(null, username, email);
    }
    catch (err) {
        if (err.message == "Business does not exist") {
            // Business does not exist, so add a new business
            await Businesss.add({
                username: username,
                password: password,
                display_name: display_name,
                email: email,
                phone: phone,
                shop_id: shop_id
            })
                .catch(err => { throw new Error(err.message) });
            return;
        }
    }
    throw new Error("Business already exists");
}

/**
 * Update a business's information, if a field does not need to be updated, pass in the old value
 * 
 * @param {string} id - id of the business
 * @param {string} username - new username of the business
 * @param {string} password - new password of the business
 * @param {string} display_name - new display name of the business
 * @param {string} email - new email of the business
 * @param {string} phone - new phone number of the business
 * @param {string} shop_id - new shop id of the business
 * 
 * @returns {void}
 * 
 * @throws {Error} - if username is invalid
 * @throws {Error} - if email is invalid
 * @throws {Error} - if business does not exist
*/
const updateBusiness = async (id, username, password, display_name, email, phone, shop_id) => {
    // Check validity of username (!= null, length > 0, no special characters)
    if (!isValidUsername(username)) {
        throw new Error("Invalid username");
    }
    // Check validity of email (!= null, length > 0, valid email address)
    if (!isValidEmail(email)) {
        throw new Error("Invalid email");
    } 
    // Check if business exists
    const business = await getBusiness(id, null, null);
    // Update business information
    await Business.doc(id).update({
        username: username,
        password: password,
        display_name: display_name,
        email: email,
        phone: phone,
        shop_id: shop_id
    });
}

/**
 * Delete a business
 * 
 * @param {string} id - id of the business
 * 
 * @returns {void}
 * 
 * @throws {Error} - if business does not exist
*/
const deleteBusiness = async (id) => {
    // Check if business exists
    const business = await getBusiness(id, null, null);
    // Delete business
    await Businesss.doc(id).delete();
}

export { 
    getBusiness, 
    addBusiness, 
    updateBusiness, 
    deleteBusiness 
};