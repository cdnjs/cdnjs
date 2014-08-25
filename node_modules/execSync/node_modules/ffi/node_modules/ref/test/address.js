
var assert = require('assert')
var ref = require('../')

describe('address', function () {

  var buf = new Buffer('hello')

  it('should return 0 for the NULL pointer', function () {
    assert.strictEqual(0, ref.address(ref.NULL))
  })

  it('should give a positive value for any other Buffer', function () {
    var address = ref.address(buf)
    assert.equal(typeof address, 'number')
    assert(isFinite(address))
    assert(address > 0)
  })

  it('should accept an offset value for the 2nd argument', function () {
    var address = ref.address(buf)
    assert.equal(address + 0, ref.address(buf, 0))
    assert.equal(address + 1, ref.address(buf, 1))
    assert.equal(address + 2, ref.address(buf, 2))
    assert.equal(address + 3, ref.address(buf, 3))
    assert.equal(address + 4, ref.address(buf, 4))
    assert.equal(address + 5, ref.address(buf, 5))
  })

  it('should accept a negative offset value for the 2nd argument', function () {
    var address = ref.address(buf)
    assert.equal(address - 0, ref.address(buf, -0))
    assert.equal(address - 1, ref.address(buf, -1))
    assert.equal(address - 2, ref.address(buf, -2))
    assert.equal(address - 3, ref.address(buf, -3))
    assert.equal(address - 4, ref.address(buf, -4))
    assert.equal(address - 5, ref.address(buf, -5))
  })

  it('should have an offset of zero when none is given', function () {
    assert.equal(ref.address(buf), ref.address(buf, 0))
  })

  describe('inspect()', function () {

    it('should overwrite the default Buffer#inspect() to print the memory address', function () {
      assert(buf.inspect().indexOf(buf.hexAddress()) !== -1)
    })

  })

})
