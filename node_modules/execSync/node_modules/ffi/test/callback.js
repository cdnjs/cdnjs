
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , int = ref.types.int
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer from a JS function', function () {
    var callback = ffi.Callback('void', [ ], function (val) { })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable by an ffi\'d ForeignFunction', function () {
    var funcPtr = ffi.Callback(int, [ int ], Math.abs)
    var func = ffi.ForeignFunction(funcPtr, int, [ int ])
    assert.equal(1234, func(-1234))
  })

  it('should work with a "void" return type', function () {
    var funcPtr = ffi.Callback('void', [ ], function (val) { })
    var func = ffi.ForeignFunction(funcPtr, 'void', [ ])
    assert.strictEqual(null, func())
  })

  it('should not call "set()" of a pointer type', function () {
    var voidType = Object.create(ref.types.void)
    voidType.get = function () {
      throw new Error('"get()" should not be called')
    }
    voidType.set = function () {
      throw new Error('"set()" should not be called')
    }
    var voidPtr = ref.refType(voidType)
    var called = false
    var cb = ffi.Callback(voidPtr, [ voidPtr ], function (ptr) {
      called = true
      assert.equal(0, ptr.address())
      return ptr
    })

    var fn = ffi.ForeignFunction(cb, voidPtr, [ voidPtr ])
    assert(!called)
    var nul = fn(ref.NULL)
    assert(called)
    assert(Buffer.isBuffer(nul))
    assert.equal(0, nul.address())
  })

  it('should throw an Error when invoked through a ForeignFunction and throws', function () {
    var cb = ffi.Callback('void', [ ], function () {
      throw new Error('callback threw')
    })
    var fn = ffi.ForeignFunction(cb, 'void', [ ])
    assert.throws(function () {
      fn()
    }, /callback threw/)
  })

  it('should throw an Error with a meaningful message when a type\'s "set()" throws', function () {
    var cb = ffi.Callback('int', [ ], function () {
      return 'a string!?!?'
    })
    var fn = ffi.ForeignFunction(cb, 'int', [ ])
    assert.throws(function () {
      fn()
    }, /error setting return value/)
  })

  it('should throw an Error when invoked after the callback gets garbage collected', function () {
    var cb = ffi.Callback('void', [ ], function () {})

    // register the callback function
    bindings.set_cb(cb)

    // should be ok
    bindings.call_cb()

    cb = null // KILL!!
    gc()

    // should throw an Error synchronously
    try {
      bindings.call_cb()
      assert(false) // shouldn't get here
    } catch (e) {
      assert(/ffi/.test(e.message))
    }
  })

  describe('async', function () {

    it('should be invokable asynchronously by an ffi\'d ForeignFunction', function (done) {
      var funcPtr = ffi.Callback(int, [ int ], Math.abs)
      var func = ffi.ForeignFunction(funcPtr, int, [ int ])
      func.async(-9999, function (err, res) {
        assert.equal(null, err)
        assert.equal(9999, res)
        done()
      })
    })

    /**
     * See https://github.com/rbranson/node-ffi/issues/153.
     */

    it('multiple callback invocations from uv thread pool should be properly synchronized', function (done) {
      this.timeout(10000)
      var iterations = 30000
      var cb = ffi.Callback('string', ['string'], function (val) {
        if (val === "ping" && --iterations > 0) {
	  return "pong"
        }
	return "end"
      })
      var pingPongFn = ffi.ForeignFunction(bindings.play_ping_pong, 'void', [ 'pointer' ])
      pingPongFn.async(cb, function (err, ret) {
        assert.equal(iterations, 0)
	done()
      })
    })

    /**
     * See https://github.com/rbranson/node-ffi/issues/72.
     * This is a tough issue. If we pass the ffi_closure Buffer to some foreign
     * C function, we really don't know *when* it's safe to dispose of the Buffer,
     * so it's left up to the developer.
     *
     * In this case, we wrap the responsibility in a simple "kill()" function
     * that, when called, destroys of its references to the ffi_closure Buffer.
     */

    it('should work being invoked multiple times', function (done) {
      var invokeCount = 0
      var cb = ffi.Callback('void', [ ], function () {
        invokeCount++
      })

      var kill = (function (cb) {
        // register the callback function
        bindings.set_cb(cb)
        return function () {
          var c = cb
          cb = null // kill
          c = null // kill!!!
        }
      })(cb)

      // destroy the outer "cb". now "kill()" holds the "cb" reference
      cb = null

      // invoke the callback a couple times
      assert.equal(0, invokeCount)
      bindings.call_cb()
      assert.equal(1, invokeCount)
      bindings.call_cb()
      assert.equal(2, invokeCount)

      setTimeout(function () {
        // invoke it once more for shits and giggles
        bindings.call_cb()
        assert.equal(3, invokeCount)

        gc() // ensure the outer "cb" Buffer is collected
        process.nextTick(finish)
      }, 25)

      function finish () {
        bindings.call_cb()
        assert.equal(4, invokeCount)

        kill()
        gc() // now ensure the inner "cb" Buffer is collected

        // should throw an Error synchronously
        try {
          bindings.call_cb()
          assert(false) // shouldn't get here
        } catch (e) {
          assert(/ffi/.test(e.message))
        }

        done()
      }
    })

    it('should throw an Error when invoked after the callback gets garbage collected', function (done) {
      var cb = ffi.Callback('void', [ ], function () {})

      // register the callback function
      bindings.set_cb(cb)

      // should be ok
      bindings.call_cb()

      // hijack the "uncaughtException" event for this test
      var listeners = process.listeners('uncaughtException').slice()
      process.removeAllListeners('uncaughtException')
      process.once('uncaughtException', function (e) {
        assert(/ffi/.test(e.message))

        // re-add Mocha's listeners
        listeners.forEach(function (fn) {
          process.on('uncaughtException', fn)
        })

        done()
      })

      cb = null // KILL!!
      gc()

      // should generate an "uncaughtException" asynchronously
      bindings.call_cb_async()
    })

  })

})
