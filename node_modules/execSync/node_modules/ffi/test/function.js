
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })

describe('Function "type"', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ffi.Function)
  })

  var voidFn = ffi.Function('void', [])

  it('should return a "type" object when invoked with a return type and array of arguments types', function () {
    assert(voidFn)
    assert.equal('function', typeof voidFn.get)
    assert.equal('function', typeof voidFn.set)
  })

  it('should be accepted as a return "type" to a ForeignFunction', function () {
    var fn = ffi.ForeignFunction(ref.NULL, voidFn, []);
  })

  it('should be accepted as an argument "type" to a ForeignFunction', function () {
    var fn = ffi.ForeignFunction(ref.NULL, 'void', [ voidFn ]);
  })

  it('should work as expected using the "callback_func" static bindings', function () {
    var fn = ffi.Function('int', [ 'int' ])
    var callback_func = ffi.ForeignFunction(bindings.callback_func, fn, [ fn ]);

    var abs = callback_func(Math.abs)
    assert.equal('function', typeof abs)

    assert.equal(Math.abs(-5), abs(-5))
    assert.equal(Math.abs(-9), abs(-9))
    assert.equal(Math.abs(-69), abs(-69))
    assert.equal(Math.abs(3), abs(3))
  })

})
