
/**
 * Module dependencies.
 */

var Type = require('./type')
  , assert = require('assert')
  , debug = require('debug')('ffi:cif')
  , ref = require('ref')
  , bindings = require('./bindings')
  , POINTER_SIZE = ref.sizeof.pointer
  , ffi_prep_cif = bindings.ffi_prep_cif
  , FFI_CIF_SIZE = bindings.FFI_CIF_SIZE
  , FFI_DEFAULT_ABI = bindings.FFI_DEFAULT_ABI
  // status codes
  , FFI_OK = bindings.FFI_OK
  , FFI_BAD_TYPEDEF = bindings.FFI_BAD_TYPEDEF
  , FFI_BAD_ABI = bindings.FFI_BAD_ABI

/**
 * JS wrapper for the `ffi_prep_cif` function.
 * Returns a Buffer instance representing a `ffi_cif *` instance.
 */

function CIF (rtype, types, abi) {
  debug('creating `ffi_cif *` instance')

  // the return and arg types are expected to be coerced at this point...
  assert(!!rtype, 'expected a return "type" object as the first argument')
  assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument')

  // the buffer that will contain the return `ffi_cif *` instance
  var cif = new Buffer(FFI_CIF_SIZE)

  var numArgs = types.length
  var _argtypesptr = new Buffer(numArgs * POINTER_SIZE)
  var _rtypeptr = Type(rtype)

  for (var i = 0; i < numArgs; i++) {
    var type = types[i]
    var ffiType = Type(type)

    _argtypesptr.writePointer(ffiType, i * POINTER_SIZE)
  }

  // prevent GC of the arg type and rtn type buffers (not sure if this is required)
  cif.rtnTypePtr = _rtypeptr
  cif.argTypesPtr = _argtypesptr

  if (typeof abi === 'undefined') {
    debug('no ABI specified (this is OK), using FFI_DEFAULT_ABI')
    abi = FFI_DEFAULT_ABI
  }

  var status = ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi)

  if (status !== FFI_OK) {
    switch (status) {
      case FFI_BAD_TYPEDEF:
        var err = new Error('ffi_prep_cif() returned an FFI_BAD_TYPEDEF error')
        err.code = 'FFI_BAD_TYPEDEF'
        err.errno = status
        throw err
        break;
      case FFI_BAD_ABI:
        var err = new Error('ffi_prep_cif() returned an FFI_BAD_ABI error')
        err.code = 'FFI_BAD_ABI'
        err.errno = status
        throw err
        break;
      default:
        throw new Error('ffi_prep_cif() returned an error: ' + status)
        break;
    }
  }

  return cif
}
module.exports = CIF
