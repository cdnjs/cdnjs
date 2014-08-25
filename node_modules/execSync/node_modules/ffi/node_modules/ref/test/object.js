
var assert = require('assert')
var weak = require('weak')
var ref = require('../')

describe('Object', function () {

  var obj = {
      foo: 'bar'
    , test: Math.random()
    , now: new Date()
  }

  beforeEach(gc)

  it('should write and read back an Object in a Buffer', function () {
    var buf = new Buffer(ref.sizeof.Object)
    ref.writeObject(buf, 0, obj)
    var out = ref.readObject(buf)
    assert.strictEqual(obj, out)
    assert.deepEqual(obj, out)
  })

  it('should retain references to written Objects', function () {
    var o_gc = false
    var buf_gc = false
    var o = { foo: 'bar' }
    var buf = new Buffer(ref.sizeof.Object)

    weak(o, function () { o_gc = true })
    weak(buf, function () { buf_gc = true })
    ref.writeObject(buf, 0, o)
    assert(!o_gc, '"o" has been garbage collected too soon')
    assert(!buf_gc, '"buf" has been garbage collected too soon')

    // try to GC `o`
    o = null
    gc()
    assert(!o_gc, '"o" has been garbage collected too soon')
    assert(!buf_gc, '"buf" has been garbage collected too soon')

    // now GC `buf`
    buf = null
    gc()
    assert(buf_gc, '"buf" has not been garbage collected')
    assert(o_gc, '"o" has not been garbage collected')
  })

  it('should throw an Error when reading an Object from the NULL pointer', function () {
    assert.throws(function () {
      ref.NULL.readObject()
    })
  })

  describe('offset', function () {

    it('should read two Objects next to each other in memory', function () {
      var buf = new Buffer(ref.sizeof.pointer * 2)
      var a = {}
      var b = {}
      buf.writeObject(a, 0 * ref.sizeof.pointer)
      buf.writeObject(b, 1 * ref.sizeof.pointer)
      var _a = buf.readObject(0 * ref.sizeof.pointer)
      var _b = buf.readObject(1 * ref.sizeof.pointer)
      assert.strictEqual(a, _a)
      assert.strictEqual(b, _b)
    })

  })

})
