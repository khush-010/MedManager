var bcrypt = require('bcryptjs');


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash
}

async function checkPassword(password,hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error checking password');
    }
}

module.exports = {
    hashPassword,
    checkPassword
}