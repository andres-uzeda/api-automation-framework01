const axios = require('axios');
const data = require('../config.json');

exports.getAuthHeaderRequest = (userName, userPassword) => {
    const promise = axios.get(data.url.concat(data.authenticationUrl), {
        auth: {
            username: userName,
            password: userPassword
        }
    });
    const dataPromise = promise.then((response) => response);
    return dataPromise;
};

exports.getRequest = (url, token) => {
    const promise = axios.get(data.url.concat(url), {
        headers: {
            Token: token
        }
    });
    const dataPromise = promise.then((response) => response);
    return dataPromise;
};

exports.postRequest = (url, body) => {
    const promise = axios.post(data.url.concat(url), body);
    const dataPromise = promise.then((response) => response);
    return dataPromise;
};

exports.deleteRequest = (url, token, id) => {
    const promise = axios.delete(data.url.concat(url, id, '.json'), {
        headers: {
            Token: token
        }
    });
    const dataPromise = promise.then((response) => response);
    return dataPromise;
};

exports.updateRequest = (url, token, body, id) => {
    const promise = axios.put(data.url.concat(url, id, '.json'), body, {
        headers: {
            Token: token
        }
    });
    const dataPromise = promise.then((response) => response);
    return dataPromise;
};