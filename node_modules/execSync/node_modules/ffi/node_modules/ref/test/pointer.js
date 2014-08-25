
var assert = require('assert')
var weak = require('weak')
var ref = require('../')

describe('pointer', function () {

  var test = new Buffer('hello world')

  beforeEach(gc)

  it('should write and read back a pointer (Buffer) in a Buffer', function () {
    var buf = new Buffer(ref.sizeof.pointer)
    ref.writePointer(buf, 0, test)
    var out = ref.readPointer(buf, 0, test.length)
    assert.strictEqual(out.length, test.length)
    for (var i = 0, l = out.length; i < l; i++) {
      assert.strictEqual(out[i], test[i])
    }
    assert.strictEqual(ref.address(out), ref.address(test))
  })

  it('should retain references to a written pointer in a Buffer', function () {
    var child_gc = false
    var parent_gc = false
    var child = new Buffer('a pointer holding some data...')
    var parent = new Buffer(ref.sizeof.pointer)

    weak(child, function () { child_gc = true })
    weak(parent, function () { parent_gc = true })
    ref.writePointer(parent, 0, child)
    assert(!child_gc, '"child" has been garbage collected too soon')
    assert(!parent_gc, '"parent" has been garbage collected too soon')

    // try to GC `child`
    child = null
    gc()
    assert(!child_gc, '"child" has been garbage collected too soon')
    assert(!parent_gc, '"parent" has been garbage collected too soon')

    // now GC `parent`
    parent = null
    gc()
    assert(parent_gc, '"parent" has not been garbage collected')
    assert(child_gc, '"child" has not been garbage collected')
  })

  it('should throw an Error when reading from the NULL pointer', function () {
    assert.throws(function () {
      ref.NULL.readPointer()
    })
  })

  describe('offset', function () {

    it('should read two pointers next to each other in memory', function () {
      var buf = new Buffer(ref.sizeof.pointer * 2)
      var a = new Buffer('hello')
      var b = new Buffer('world')
      buf.writePointer(a, 0 * ref.sizeof.pointer)
      buf.writePointer(b, 1 * ref.sizeof.pointer)
      var _a = buf.readPointer(0 * ref.sizeof.pointer)
      var _b = buf.readPointer(1 * ref.sizeof.pointer)
      assert.equal(a.address(), _a.address())
      assert.equal(b.address(), _b.address())
    })

  })

})
