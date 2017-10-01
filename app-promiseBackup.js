const yargs = require ('yargs');
const axios =require ('axios');

const argv = yargs
        .options({// demand individual options within the option constructor
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
        console.log('Address: '+ response.data.results[0].formatted_address);

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=d760b32f03d2bd286d612429690c3fa5`;
        // let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=25.7133732&lon=116.7637386&APPID=d760b32f03d2bd286d612429690c3fa5`;
        //weatherUrl =`http://api.wunderground.com/api/3c0817c33c955f27/forecast/q/${lat},${lng}json`
        //weatherUrl =`http://api.wunderground.com/api/3c0817c33c955f27/conditions/q/${lat},${lng}json`
        //weatherUrl = `http://api.wunderground.com/api/3c0817c33c955f27/forecast/q/25.7133732,116.7637386json`;
        //weatherUrl = http://api.wunderground.com/api/3c0817c33c955f27/conditions/q/25.7133732,116.7637386json
        //weatherUrl = `https://api.darksky.net/forecast/bf753acbb67b814031d2bf2d1f191748/${lat},${lng}`;
        //weatherUrl = `https://api.darksky.net/forecast/bf753acbb67b814031d2bf2d1f191748/25.7133732,116.7637386`;
        return axios.get(weatherUrl );
            // .then ( (response) => {
            //         console.log(`The current forecast is: `);
            //         console.log (JSON.stringify(response.data.main, undefined, 4))
            //         }); //move the .then() location have same result because in same block
     })  .then ( (response) => {
        console.log(`The current forecast: `);
        console.log (JSON.stringify(response.data.main, undefined, 4))
    })
    .catch( (e) => {
        if (e.code === 404){
            console.log('Unable to connect to API server.');
        } else{
            console.log(e.message);
        }
    });
