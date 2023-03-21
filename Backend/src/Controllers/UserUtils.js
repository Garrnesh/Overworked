/**
 * Check validity of username
 * 
 * @param {string} username - username to check
 * 
 * @returns {boolean} - true if username is valid, false otherwise
 */
const isValidUsername = (username) => {
    return username != null && username.length > 0 && /^[a-zA-Z0-9]+$/.test(username);
}

/**
 * Check validity of email address
 * 
 * @param {string} email - email address to check
 * 
 * @returns {boolean} - true if email address is valid, false otherwise
 */
const isValidEmail = (email) => {
    return email != null && email.length > 0 && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
}

export { isValidUsername, isValidEmail };