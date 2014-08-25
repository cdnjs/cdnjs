/**
 * The json plugin
 */
define('seajs/plugin-json', ['./plugin-base'], function(require) {

  var plugin = require('./plugin-base')
  var util = plugin.util


  plugin.add({
    name: 'json',

    ext: ['.json'],

    fetch: function(url, callback) {
      util.xhr(url, function(code) {
        util.globalEval('define(' + code + ')')
        callback()
      })
    }
  })

});

