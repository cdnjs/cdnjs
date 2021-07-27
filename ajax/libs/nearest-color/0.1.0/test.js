var nearestColor = require('./nearestColor');

var colors = {
  red: '#f00',
  yellow: '#ff0',
  blue: '#00f'
};

console.log(nearestColor('#800', colors)); // => { name: 'red', value: '#f00' }
console.log(nearestColor('#ffe', colors)); // => { name: 'yellow', value: '#ff0' }
