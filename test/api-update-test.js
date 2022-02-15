const assert = require('chai').assert;
const request = require('../api/api_request');
const data = require('../config.json');
const user = require('../data/user.json');
let token;
let id;

describe('Automation Exercise - update user', () => {
    before(async () => {
        let CreateResponse = await request.postRequest(data.userUrl, user).then(res => res);
        id = CreateResponse.data.Id;
        let AuthResponse = await request.getAuthHeaderRequest(user.Email, user.Password).then(res => res.data);
        token = AuthResponse.TokenString;
    });

    it('Update User', async () => {
        let json = {"FullName":"newflow456"};
        let UpdateResponse = await request.updateRequest(data.userIdUrl, token, json, id).then(res => res);
        assert.equal(UpdateResponse.status, 200);
        assert.equal(UpdateResponse.data.FullName, json.FullName);
    });

    after(async () => {
        await request.deleteRequest(data.userIdUrl, token, id);
    });
});