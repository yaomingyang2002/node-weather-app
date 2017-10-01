const  request = require ('request');
const yargs = require ('yargs');

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

console.log(argv);
console.log(argv.a);
console.log((argv._).join(" "));
let inputAddress = argv.a +" " + (argv._).join(" ");
let encodedAddress = encodeURIComponent(inputAddress);
console.log(encodedAddress);

request ({
    url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log ('Unable to connect to Google server');
    }else if(response.body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address');
    }else if (`${body.status}` === 'OK'){
         console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
         console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
});