const https = require('https');
const axios = require('axios');

exports.handler = async (event, context) => {
    const url = event.queryStringParameters.q;
    const requestConfig = {
        responseType: 'stream',
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    };
    const response = await axios.get(url, requestConfig);
    const cert = response.data.socket.getPeerCertificate();
    return {
        statusCode: 200,
        body: JSON.stringify({ message: cert }),
    };
};