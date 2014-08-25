
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , DynamicLibrary = ffi.DynamicLibrary

describe('DynamicLibrary', function () {

  it('should be a function', function () {
    assert.equal('function', typeof DynamicLibrary)
  })

  it('should return a "DynamicLibrary" instance when invoked', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
    var handle = DynamicLibrary(lib + ffi.LIB_EXT)
    assert(handle instanceof DynamicLibrary)
  })

  describe('get()', function () {

    it('should return a "pointer" Buffer to a symbol', function () {
      var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
      var handle = DynamicLibrary(lib + ffi.LIB_EXT)
      var symbol = handle.get('free')
      assert(Buffer.isBuffer(symbol))
      assert.equal(0, symbol.length)
    })

    it('should set the "name" property to the name of the symbol', function () {
      var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
      var handle = DynamicLibrary(lib + ffi.LIB_EXT)
      var name = 'free'
      var symbol = handle.get(name)
      assert.equal(name, symbol.name)
    })

  })

})
