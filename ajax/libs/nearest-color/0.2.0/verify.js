var colors = {
  red: '#f00',
  yellow: '#ff0',
  blue: '#00f'
};

var nearestColor = require('./nearestColor').from(colors);

console.log(nearestColor('#800')); // => { name: 'red', value: '#f00' }
console.log(nearestColor('#ffe')); // => { name: 'yellow', value: '#ff0' }
