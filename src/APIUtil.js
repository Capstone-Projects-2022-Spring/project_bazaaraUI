export default function APIUtil(params) {
    const axios = require("axios");
    
    let requestHeaders = {}
    params.headers.map((header) => {
        requestHeaders[header.name] = header.value
    })
    
    const options = {
      method: params.method,
      url: params.url,
      headers: requestHeaders
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
