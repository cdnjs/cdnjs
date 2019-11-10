var colors = require('colors');
var glob = require('glob');

function libsToRun() {
  var onlyRunLib,
      args = process.argv;

  for (var i = 0; i < args.length; i++) {
    if (args[i].slice(0, 6) === '--only') {
      onlyRunLib = args[i].slice(7);

      if (glob.sync(`./ajax/libs/${onlyRunLib}/`).length === 0) {
        warningMessage = "Couldn't find lib " + onlyRunLib;
        console.log(warningMessage.red);
      }

      break;
    }
  }

  return onlyRunLib || '*';
}

module.exports = libsToRun;
