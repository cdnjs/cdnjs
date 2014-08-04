
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })
  , sprintfPtr = bindings.sprintf

describe('variadic arguments', function () {

  afterEach(gc)

  it('should work with vararg C functions', function () {
    var buf = new Buffer(100)
    var sprintfGen = ffi.VariadicForeignFunction(sprintfPtr, 'int', [ 'pointer', 'string' ])

    sprintfGen()(buf, 'hello world!')
    assert.equal(buf.readCString(), 'hello world!')

    sprintfGen('int')(buf, '%d', 42)
    assert.equal(buf.readCString(), '42')

    sprintfGen('double')(buf, '%10.2f', 3.14)
    assert.equal(buf.readCString(), '      3.14')

    sprintfGen('string')(buf, ' %s ', 'test')
    assert.equal(buf.readCString(), ' test ')
  })

  it('should return the same Function instance when the same arguments are used', function () {
    var sprintfGen = ffi.VariadicForeignFunction(sprintfPtr, 'int', [ 'pointer', 'string' ])

    var one = sprintfGen('int')
    var two = sprintfGen(ref.types.int)

    assert.strictEqual(one, two)
  })

})
