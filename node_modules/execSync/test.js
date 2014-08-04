var execSync = require('.');
var user = execSync.stdout('echo $USER');
console.log('Hello ' + user);

var result = execSync.code('echo $HOME');
console.log('result '+result);
