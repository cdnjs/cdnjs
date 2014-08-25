
var assert = require('assert')
var ref = require('../')

describe('bool', function () {

  var buf = ref.alloc('bool')

  it('should return JS "false" for a value of 0', function () {
    buf[0] = 0
    assert.strictEqual(false, ref.get(buf))
  })

  it('should return JS "true" for a value of 1', function () {
    buf[0] = 1
    assert.strictEqual(true, ref.get(buf))
  })

  it('should write a JS "false" value as 0', function () {
    ref.set(buf, 0, false)
    assert.strictEqual(0, buf[0])
  })

  it('should write a JS "true" value as 1', function () {
    ref.set(buf, 0, true)
    assert.strictEqual(1, buf[0])
  })

  it('should allow uint8 number values to be written to it', function () {
    var val = 255
    ref.set(buf, 0, val)
    assert.strictEqual(true, ref.get(buf))
    assert.strictEqual(val, buf[0])
  })

})
