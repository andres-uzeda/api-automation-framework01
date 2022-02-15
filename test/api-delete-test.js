const assert = require('chai').assert;
const request = require('../api/api_request');
const data = require('../config.json');
const user = require('../data/user.json');
let token;
let id;

describe('Automation Exercise - delete user', () => {
    before(async () => {
        let CreateResponse = await request.postRequest(data.userUrl, user).then(res => res);
        id = CreateResponse.data.Id;
        let AuthResponse = await request.getAuthHeaderRequest(user.Email, user.Password).then(res => res.data);
        token = AuthResponse.TokenString;
    });

    it('Delete User', async () => {
        let DeleteResponse = await request.deleteRequest(data.userIdUrl, token, id).then(res => res);
        assert.equal(DeleteResponse.status, 200);
        assert.equal(DeleteResponse.data.Email, user.Email);
        assert.equal(DeleteResponse.data.FullName, user.FullName);
    });
});