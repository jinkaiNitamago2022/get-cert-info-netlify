const https = require('https');
const axios = require('axios');

exports.handler = async (event, context) => {
    const url = `https://${event.queryStringParameters.q}`;
    const requestConfig = {
        responseType: 'stream',
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    };

    try {
        const response = await axios.get(url, requestConfig);
        const cert = response.data.socket.getPeerCertificate();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: cert }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ errMessage: `${e.syscall} ${e.code}: ${e.hostname}` }),
        };
    }
};