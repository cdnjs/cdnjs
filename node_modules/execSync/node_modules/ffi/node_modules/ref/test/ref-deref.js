
var assert = require('assert')
var ref = require('../')

describe('ref(), deref()', function () {

  beforeEach(gc)

  it('should work 1 layer deep', function () {
    var test = new Buffer('one layer deep')
    var one = ref.ref(test)
    var _test = ref.deref(one)
    assert.equal(test.length, _test.length)
    assert.equal(test.toString(), _test.toString())
  })

  it('should work 2 layers deep', function () {
    var test = new Buffer('two layers deep')
    var one = ref.ref(test)
    var two = ref.ref(one)
    var _one = ref.deref(two)
    var _test = ref.deref(_one)
    assert.equal(ref.address(one), ref.address(_one))
    assert.equal(ref.address(test), ref.address(_test))
    assert.equal(one.length, _one.length)
    assert.equal(test.length, _test.length)
    assert.equal(test.toString(), _test.toString())
  })

  it('should throw when derefing a Buffer with no "type"', function () {
    var test = new Buffer('???')
    assert.throws(function () {
      ref.deref(test)
    }, /unknown "type"/)
  })

  it('should throw when derefing a Buffer with no "type" 2', function () {
    var test = new Buffer('???')
    var r = ref.ref(test)
    var _test = ref.deref(r)
    assert.equal(ref.address(test), ref.address(_test))
    assert.throws(function () {
      ref.deref(_test)
    }, /unknown "type"/)
  })

  it('should deref() a "char" type properly', function () {
    var test = new Buffer(ref.sizeof.char)
    test.type = ref.types.char
    test[0] = 50
    assert.equal(50, ref.deref(test))
    test[0] = 127
    assert.equal(127, ref.deref(test))
  })

  it('should not throw when calling ref()/deref() on a `void` type', function () {
    var test = ref.alloc(ref.types.void)
    assert.strictEqual(null, test.deref())
  })

})
