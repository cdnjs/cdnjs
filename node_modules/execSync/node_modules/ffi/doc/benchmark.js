var ffi = require('../')
var ref = require('ref')
var util = require('util')

function measureIterationsOverTime(what, duration, f, granularity) {
  granularity = granularity || 1000

  var iterations  = 0
  var start       = Date.now()

  while (Date.now() < (start + duration)) {
    for (var i = 0; i < granularity; i++) {
      f()
    }
    iterations += granularity
  }

  var duration = Date.now() - start
  var persec   = (iterations / (Date.now() - start)) * 1000

  util.log('Executed ' + what + ' ' + iterations + ' times in '
      + duration + 'ms ' + '(' + persec + '/sec)')
}


var benchLibrary = new ffi.Library(null, {
  'strtoul': [ 'ulong',  [ 'string', 'pointer', 'int' ] ]
})

var string = '1234567890'
var strtoulPtr  = ref.NULL
var strtoulFunc = require('../test/build/Release/ffi_tests').strtoul
var blstrtoul = benchLibrary.strtoul

measureIterationsOverTime('Binding strtoul', 5000, function() {
  strtoulFunc(string, strtoulPtr, 0)
})

measureIterationsOverTime('ffi strtoul', 5000, function() {
  blstrtoul(string, strtoulPtr, 0)
})
