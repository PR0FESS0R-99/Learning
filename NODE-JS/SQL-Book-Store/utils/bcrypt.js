const bcrypt = require('bcrypt')

const Compire = async (plainText, hashedText) => {
    const isMatch = await bcrypt.compare(plainText, hashedText);
    return isMatch
}

const CreateHash = async (plainText) => {
    const salt = await bcrypt.genSalt(10);
    const hashedText = await bcrypt.hash(plainText, salt);
    return hashedText;
}

module.exports = { Compire, CreateHash };