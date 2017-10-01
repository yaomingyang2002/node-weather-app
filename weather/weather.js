//api.openweathermap.org
const  request = require ('request');

let getWeather = (lat, lng, callback) => {
    request ({
        url:  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=d760b32f03d2bd286d612429690c3fa5`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the server');
        }else if (body.cod == 400 || body.cod == 401 ) {
        callback (body.message);
        }else if (body.cod == 200){
            callback(undefined, {
                forecast: body.main
            })
    }
});
};

module.exports.getWeather  = getWeather;