
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')

describe('types', function () {

  describe('`ffi_type` to ref type matchups', function () {

    Object.keys(ref.types).forEach(function (name) {
      it('should match a valid `ffi_type` for "' + name + '"', function () {
        var type = ref.types[name]
        var ffi_type = ffi.ffiType(type)
        assert(Buffer.isBuffer(ffi_type))
      })
    })

    it('should match a valid `ffi_type` for "ref" type without a cached value', function () {
      // simulate a ref type without a "ffi_type" property set
      var type = Object.create(ref.types.void)
      type.ffi_type = undefined

      var ffi_type = ffi.ffiType(type)
      assert(Buffer.isBuffer(ffi_type))
    })

    it('should match a valid `ffi_type` for `CString` without a cached value', function () {
      // simulate a ref type without a "ffi_type" property set
      var type = Object.create(ref.types.CString)
      type.ffi_type = undefined

      var ffi_type = ffi.ffiType(type)
      assert(Buffer.isBuffer(ffi_type))
    })

    it('should match a valid `ffi_type` for `ulong` without a cached value', function () {
      // simulate a ref type without a "ffi_type" property set
      var type = Object.create(ref.types.ulong)
      type.ffi_type = undefined

      var ffi_type = ffi.ffiType(type)
      assert(Buffer.isBuffer(ffi_type))
    })

  })

})
