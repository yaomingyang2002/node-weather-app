const yargs = require ('yargs');
const geocode = require ('./geocode/geocode.js');
const weather = require ('./weather/weather.js');

const argv = yargs
        .options({
            a:  {
                demand:  true,
                alias:  'address',
                describe:  'Address to fetch weather for',
                string:  true
            }
        })
        .help( )
        . alias('help',  'h')
        .argv;

let inputAddress = argv.a +" " + (argv._).join(" ");

geocode.geocodeAddress(inputAddress, (errorMessage, results) =>  {
    if (errorMessage) {
        console.log (errorMessage);
    } else {
        console.log (results.address);
        console.log (results.latitude);
        console.log (results.longitude);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log (errorMessage);
            } else {
                console.log (JSON.stringify(weatherResults, undefined, 4));
                console.log (weatherResults);
            }
        });
    }
});

// lat, lng, callback
// weather.getWeather(45.4521679, -73.4714256, (errorMessage, weatherResults) => {
//     if (errorMessage) {
//         console.log (errorMessage);
//     } else {
//         console.log (JSON.stringify(weatherResults, undefined, 2));
//     }
// });


