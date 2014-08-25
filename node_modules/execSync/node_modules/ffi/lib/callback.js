
/**
 * Module dependencies.
 */

var ref = require('ref')
  , CIF = require('./cif')
  , assert = require('assert')
  , debug = require('debug')('ffi:Callback')
  , _Callback = require('./bindings').Callback

/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 */

function Callback (retType, argTypes, abi, func) {
  debug('creating new Callback')

  if (typeof abi === 'function') {
    func = abi
    abi = void(0)
  }

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument')
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument')
  assert.equal(typeof func, 'function', 'expected a function as the third argument')

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  retType = ref.coerceType(retType)
  argTypes = argTypes.map(ref.coerceType)

  // create the `ffi_cif *` instance
  var cif = CIF(retType, argTypes, abi)
  var argc = argTypes.length

  var callback = _Callback(cif, retType.size, argc, function (retval, params) {
    debug('Callback function being invoked')

    var args = []
    for (var i = 0; i < argc; i++) {
      var type = argTypes[i]
      var argPtr = params.readPointer(i * ref.sizeof.pointer, type.size)
      argPtr.type = type
      args.push(argPtr.deref())
    }

    // Invoke the user-given function
    var result = func.apply(null, args)
    try {
      ref.set(retval, 0, result, retType)
    } catch (e) {
      e.message = 'error setting return value - ' + e.message
      throw e
    }
  })

  // store reference to the CIF Buffer so that it doesn't get
  // garbage collected before the callback Buffer does
  callback._cif = cif;

  return callback
}
module.exports = Callback
