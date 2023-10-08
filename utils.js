const Jwt = require('jsonwebtoken');

// Load environment variables from .env file
require('dotenv').config();

module.exports = {
    generateToKen: (userId) => {
        if (!userId) {
            return;
        }

        const token = Jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION_HOURS});
        return {token};
    }
}
