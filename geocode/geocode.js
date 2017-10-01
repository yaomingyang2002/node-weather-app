const  request = require ('request');

// let inputAddress = argv.a +" " + (argv._).join(" ");
let geocodeAddress= (inputAddress, callback) => {
    let encodedAddress = encodeURIComponent(inputAddress);
    console.log(encodedAddress);

    request ({
        url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback ('Unable to connect to Google server');
        }else if(response.body.status === 'ZERO_RESULTS') {
             callback('Unable to find that address');
        }else if (`${body.status}` === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude:  body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports. geocodeAddress = geocodeAddress ;


