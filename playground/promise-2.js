const  request = require ('request');

let geocodeAddress = (inputAddress) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(inputAddress);
        console.log(encodedAddress);

        request ({
            url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject ('Unable to connect to Google server');
            }else if(response.body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            }else if (`${body.status}` === 'OK'){
                resolve ({
                address: body.results[0].formatted_address,
                latitude:  body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
                 });
            }
        });
    });
};

geocodeAddress('100083').then ((location) =>{
        console.log (JSON.stringify(location, undefined, 2));
}, (errMessage)=>{
        console.log ( errorMessage);
});


// let geocodeAddress= (inputAddress, callback) => {
//     let encodedAddress = encodeURIComponent(inputAddress);
//     console.log(encodedAddress);
//
//     request ({
//         url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             callback ('Unable to connect to Google server');
//         }else if(response.body.status === 'ZERO_RESULTS') {
//         callback('Unable to find that address');
//     }else if (`${body.status}` === 'OK'){
//         callback(undefined, {
//             address: body.results[0].formatted_address,
//             latitude:  body.results[0].geometry.location.lat,
//             longitude: body.results[0].geometry.location.lng
//         });
//     }
// });
// };
//
// module.exports. geocodeAddress = geocodeAddress ;

// let asyncAdd = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (typeof  a === 'number' && typeof  b === 'number'){
//                     resolve (a+b);
//             }else {
//                 reject('arguments must be number');
//             }
//     }, 1500);
//     });
// };
//
// asyncAdd (5, 7).then((res) => {
//     console.log('Result: ', res);
// return asyncAdd(res, 33); //nested promise, can use '33' to raise Err
// }).then((res) => {
//     console.log('Should be 45 ', res);
// }).catch ((errorMessage) => {//get all Err.
//     console.log ( errorMessage);
// });

// asyncAdd (5, 7).then((res) => {
//     console.log('Result: ', res);
//     return asyncAdd(res, 33); //nested promise, can use '33' to raise Err
// }, (errorMessage) => {
//     console.log ( errorMessage);
// }).then((res) => { //chain promise
//     console.log('Should be 45 ', res);
// }, (errorMessage) => {
//     console.log ( errorMessage);
// });

// //basic promise
// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => { // resolve or reject, only one
//         resolve ('Hey, it worked!');
//     }, 2500);
// });
//
// somePromise.then((message) => {
//     console.log ('Success:', message);
// }, (errorMessage) => {
//     console.log ('Error:', errorMessage);
// });