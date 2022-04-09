import axios from "axios";

const client = axios.create({
    baseURL: 'https://bazaara-342116.uk.r.appspot.com'
})

export default async function APIUtil(params, idToken) {

    const options = {
      method: params.method,
      url: client.baseURL + params.url,
      headers: {
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
             "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
             "Authorization": `${idToken}`
        }
    };
    
    // {
    //     name: 'Access-Control-Allow-Origin',
    //     value: '*'
    //   },
    //   {
    //     name: 'Access-Control-Allow-Methods',
    //     value: 'POST, GET, OPTIONS, PUT, DELETE'
    //   },
    //   {
    //     name: 'Access-Control-Allow-Headers',
    //     value: 'Origin, Content-Type, Accept, Authorization, X-Request-With'
    //   }

    client.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}