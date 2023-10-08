const chai = require('chai');
const expect = chai.expect;
const tokenGenerator = require('../utils');

describe('Token Generator', () => {
    it('should generate a valid token', () => {
        const userId = '12345';
        const result = tokenGenerator.generateToKen(userId);

        // Assuming a valid token is returned
        expect(result).to.have.property('token');
    });
    it('should return empty if userId is null', () => {
        const userId = null;
        const result = tokenGenerator.generateToKen(userId);

        // Assuming a valid token is returned
        expect(result).to.be.undefined;
    });
    it('should return empty if userId is empty string', () => {
        const userId = '';
        const result = tokenGenerator.generateToKen(userId);

        // Assuming a valid token is returned
        expect(result).to.be.undefined;
    });
    it('should return empty if userId is undefined', () => {
        const userId = undefined;
        const result = tokenGenerator.generateToKen(userId);

        // Assuming a valid token is returned
        expect(result).to.be.undefined;
    });
});
