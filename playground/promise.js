//PromiseChaining
//how the Promise change
let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof  a === 'number' && typeof  b === 'number'){
                    resolve (a+b);
            }else {
                reject('arguments must be number');
            }
    }, 1500);
    });
};

asyncAdd (5, 7).then((res) => {
    console.log('Result: ', res);
return asyncAdd(res, 33); //nested promise, can use '33' to raise Err
}).then((res) => {
    console.log('Should be 45 ', res);
}).catch ((errorMessage) => {//get all Err.
    console.log ( errorMessage);
});

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