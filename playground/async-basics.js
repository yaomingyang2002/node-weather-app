console.log('Starting app');

setTimeout( () => {
    console.log('Inside of callback');
}, 2000);// a callback function in another function

setTimeout( () =>{
    console.log('inside the 2nd timeout callback')
}, 0);

console.log('Finishing up');
