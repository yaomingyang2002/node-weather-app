//api.darksky.net/forecast/
const  request = require ('request');

let getWeather2 = (lat, lng, callback) => {
    request ({
        url:  `https://api.darksky.net/forecast/bf753acbb67b814031d2bf2d1f191748/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        // if (!body) {
        if (error) {
        callback ('Unable to connect to darksky server');
        // callback (response);
    }else  if (body.code  ==  400) {
        callback('Unable to find that address');
    }else if(body.latitude){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature:  body.currently.apparentTemperature
            })
    }
});

};

module.exports.getWeather2  = getWeather2;