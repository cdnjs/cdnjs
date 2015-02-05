/**
 * The CoffeeScript plugin
 */
define('seajs/plugin-coffee', ['./plugin-base', 'coffee'], function(require) {

  var plugin = require('./plugin-base')
  var CoffeeScript = require('coffee')


  plugin.add({
    name: 'coffee',

    ext: ['.coffee'],

    fetch: function(url, callback) {
      CoffeeScript.load(url, callback)
    }
  })

});

