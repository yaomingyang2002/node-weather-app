//api.wunderground.com
const  request = require ('request');

let getWeather1 = (lat, lng, callback) => {
    request ({
        url:  `http://api.wunderground.com/api/3c0817c33c955f27/forecast/q/${lat},${lng}json`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback ('Unable to connect to darksky server');
        }else {
            callback(undefined, {
                forecast: body.forecast.txt_forecast
            })
        }
    });
};

module.exports.getWeather1  = getWeather1;