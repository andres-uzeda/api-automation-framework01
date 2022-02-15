const assert = require('chai').assert;
const request = require('../api/api_request');
const data = require('../config.json');
const user = require('../data/user.json');
let token;
let id;

describe('Automation Exercise - get user', () => {
    before(async () => {
        let CreateResponse = await request.postRequest(data.userUrl, user).then(res => res);
        id = CreateResponse.data.Id;
        let AuthResponse = await request.getAuthHeaderRequest(user.Email, user.Password).then(res => res.data);
        token = AuthResponse.TokenString;
    });

    it('Get User', async () => {
        let GetResponse = await request.getRequest(data.userUrl, token).then(res => res);
        assert.equal(GetResponse.status, 200);
        assert.equal(GetResponse.data.Email, user.Email);
        assert.equal(GetResponse.data.FullName, user.FullName);
    });

    after(async () => {
        await request.deleteRequest(data.userIdUrl, token, id);
    });
});