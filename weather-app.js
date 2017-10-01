const yargs = require ('yargs');
const axios =require ('axios');

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
let encodedAddress = encodeURIComponent(inputAddress);
let geocodeUrl  =  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

 axios.get(geocodeUrl )
     .then( (response) => {
        if (response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        console.log( '\n \n'+'Address: '+ response.data.results[0].formatted_address);

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        console.log(`Latitude: ${lat}, longitude: ${lng}`+'\n');
        let weatherUrl1 = `http://api.wunderground.com/api/3c0817c33c955f27/conditions/q/${lat},${lng}json`
        let weatherUrl2 = `http://api.wunderground.com/api/3c0817c33c955f27/forecast/q/${lat},${lng}json`

        return axios.get(weatherUrl1)
            .then ( (response) => {
                    console.log( 'The Current Condition:\n ');
                    console.log('      '+'Observation Time: '+response.data.current_observation.observation_time +'\n' +
                        '      '+'Weather:'+response.data.current_observation. weather+'\n'+
                        '      '+'Temperature: '+response.data.current_observation. temperature_string+'\n'+
                        '      '+ 'Feels like: '+response.data.current_observation. feelslike_string+'\n'+
                        '      '+ 'Humidity: '+response.data.current_observation. relative_humidity+'\n'+
                        '      '+  'Wind: '+response.data.current_observation. wind_string+'\n'+
                        '      '+ 'Pressure:'+response.data.current_observation. pressure_mb+'\n'+
                        '      '+ 'Visibility_km: '+response.data.current_observation.visibility_km +'\n'+
                        '      '+ 'UV index: '+response.data.current_observation.UV +'\n'
                    );//' '+response.data.current_observation. +'\n+'
                    // console.log (JSON.stringify(response.data.current_observation, undefined, 4));
                     return axios.get(weatherUrl2 );
                    });
     }) .then ( (response) => {
        console.log('The Forecast: \n ');
        console.log('   '+response.data.forecast.txt_forecast.forecastday[0].title+' (Today): \n'+'      '+ response.data.forecast.txt_forecast.forecastday[0].fcttext_metric +'\n');
        console.log('   '+response.data.forecast.txt_forecast.forecastday[1].title+': \n'+'      '+ response.data.forecast.txt_forecast.forecastday[1].fcttext_metric +'\n');
        console.log('   '+response.data.forecast.simpleforecast.forecastday[0].date.weekday+' \n'+
            '   High: '+response.data.forecast.simpleforecast.forecastday[0].high.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[0].high.celsius+'C)'+'\n'+
            '   Low:  '+response.data.forecast.simpleforecast.forecastday[0].low.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[0].low.celsius+'C)'+'\n'+
            '   Conditions:'+response.data.forecast.simpleforecast.forecastday[0].conditions+'\n');
        console.log('   '+response.data.forecast.simpleforecast.forecastday[1].date.weekday+' \n'+
            '   High: '+response.data.forecast.simpleforecast.forecastday[1].high.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[1].high.celsius+'C)'+'\n'+
            '   Low:  '+response.data.forecast.simpleforecast.forecastday[1].low.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[1].low.celsius+'C)'+'\n'+
            '   Conditions:'+response.data.forecast.simpleforecast.forecastday[1].conditions+'\n');
        console.log('   '+response.data.forecast.simpleforecast.forecastday[2].date.weekday+' \n'+
            '   High: '+response.data.forecast.simpleforecast.forecastday[2].high.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[2].high.celsius+'C)'+'\n'+
            '   Low:  '+response.data.forecast.simpleforecast.forecastday[2].low.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[2].low.celsius+'C)'+'\n'+
            '   Conditions:'+response.data.forecast.simpleforecast.forecastday[2].conditions+'\n');
        console.log('   '+response.data.forecast.simpleforecast.forecastday[3].date.weekday+' \n'+
            '   High: '+response.data.forecast.simpleforecast.forecastday[3].high.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[3].high.celsius+'C)'+'\n'+
            '   Low:  '+response.data.forecast.simpleforecast.forecastday[3].low.fahrenheit+'F ('+response.data.forecast.simpleforecast.forecastday[3].low.celsius+'C)'+'\n'+
            '   Conditions:'+response.data.forecast.simpleforecast.forecastday[3].conditions);
    })
    .catch( (e) => {
        if (e.code === 404){
            console.log('Unable to connect to API server.');
        } else{
            console.log(e.message);
        }
    });
