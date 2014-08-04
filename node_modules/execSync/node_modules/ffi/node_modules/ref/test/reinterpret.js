
var assert = require('assert')
var weak = require('weak')
var ref = require('../')

describe('reinterpret()', function () {

  beforeEach(gc)

  it('should return a new Buffer instance at the same address', function () {
    var buf = new Buffer('hello world')
    var small = buf.slice(0, 0)
    assert.strictEqual(0, small.length)
    assert.strictEqual(buf.address(), small.address())
    var reinterpreted = small.reinterpret(buf.length)
    assert.strictEqual(buf.address(), reinterpreted.address())
    assert.strictEqual(buf.length, reinterpreted.length)
    assert.strictEqual(buf.toString(), reinterpreted.toString())
  })

  it('should retain a reference to the original Buffer when reinterpreted', function () {
    var origGCd = false
    var otherGCd = false
    var buf = new Buffer(1)
    weak(buf, function () { origGCd = true })
    var other = buf.reinterpret(0)
    weak(other, function () { otherGCd = true })

    assert(!origGCd, '"buf" has been garbage collected too soon')
    assert(!otherGCd, '"other" has been garbage collected too soon')

    // try to GC `buf`
    buf = null
    gc()
    assert(!origGCd, '"buf" has been garbage collected too soon')
    assert(!otherGCd, '"other" has been garbage collected too soon')

    // now GC `other`
    other = null
    gc()
    assert(otherGCd, '"other" has not been garbage collected')
    assert(origGCd, '"buf" has not been garbage collected')
  })

})
