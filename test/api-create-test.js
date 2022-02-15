const assert = require('chai').assert;
const request = require('../api/api_request');
const data = require('../config.json');
const user = require('../data/user.json');
let token;
let id;

describe('Automation Exercise - Create user', () => {
    it('Create User', async () => {
        let CreateResponse = await request.postRequest(data.userUrl, user).then(res => res);
        id = CreateResponse.data.Id;
        assert.equal(CreateResponse.status, 200);
        assert.equal(CreateResponse.data.Email, user.Email);
        assert.equal(CreateResponse.data.FullName, user.FullName);
        let AuthResponse = await request.getAuthHeaderRequest(user.Email, user.Password).then(res => res.data);
        token = AuthResponse.TokenString;
    });

    after(async () => {
        await request.deleteRequest(data.userIdUrl, token, id);
    });
});