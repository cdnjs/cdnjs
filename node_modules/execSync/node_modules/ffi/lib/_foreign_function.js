
/**
 * Module dependencies.
 */

var assert = require('assert')
  , debug = require('debug')('ffi:_ForeignFunction')
  , ref = require('ref')
  , bindings = require('./bindings')
  , POINTER_SIZE = ref.sizeof.pointer
  , FFI_ARG_SIZE = bindings.FFI_ARG_SIZE


function ForeignFunction (cif, funcPtr, returnType, argTypes) {
  debug('creating new ForeignFunction', funcPtr)

  var numArgs = argTypes.length
  var argsArraySize = numArgs * POINTER_SIZE

  // "result" must point to storage that is sizeof(long) or larger. For smaller
  // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
  // hold the return value
  var resultSize = returnType.size >= ref.sizeof.long ? returnType.size : FFI_ARG_SIZE
  assert(resultSize > 0)

  /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */

  var proxy = function () {
    debug('invoking proxy function')

    if (arguments.length !== numArgs) {
      throw new TypeError('Expected ' + numArgs +
          ' arguments, got ' + arguments.length)
    }

    // storage buffers for input arguments and the return value
    var result = new Buffer(resultSize)
      , argsList = new Buffer(argsArraySize)

    // write arguments to storage areas
    var i, argType, val, valPtr
    try {
      for (i = 0; i < numArgs; i++) {
        argType = argTypes[i]
        val = arguments[i]
        valPtr = ref.alloc(argType, val)
        argsList.writePointer(valPtr, i * POINTER_SIZE)
      }
    } catch (e) {
      e.message = 'error setting argument ' + i + ' - ' + e.message
      throw e
    }

    // invoke the `ffi_call()` function
    bindings.ffi_call(cif, funcPtr, result, argsList)

    result.type = returnType
    return result.deref()
  }

  /**
   * The asynchronous version of the proxy function.
   */

  proxy.async = function () {
    debug('invoking async proxy function')

    var argc = arguments.length
    if (argc !== numArgs + 1) {
      throw new TypeError('Expected ' + (numArgs + 1) +
          ' arguments, got ' + argc)
    }

    var callback = arguments[argc - 1]
    if (typeof callback !== 'function') {
      throw new TypeError('Expected a callback function as argument number: ' +
          (argc - 1))
    }

    // storage buffers for input arguments and the return value
    var result = new Buffer(resultSize)
    var argsList = new Buffer(argsArraySize)

    // write arguments to storage areas
    var i, argType, val, valPtr
    try {
      for (i = 0; i < numArgs; i++) {
        argType = argTypes[i]
        val = arguments[i]
        valPtr = ref.alloc(argType, val)
        argsList.writePointer(valPtr, i * POINTER_SIZE)
      }
    } catch (e) {
      e.message = 'error setting argument ' + i + ' - ' + e.message
      return process.nextTick(callback.bind(null, e));
    }

    // invoke the `ffi_call()` function asynchronously
    bindings.ffi_call_async(cif, funcPtr, result, argsList, function (err) {
      // make sure that the 4 Buffers passed in above don't get GC'd while we're
      // doing work on the thread pool...
      cif = cif;
      funcPtr = funcPtr;
      argsList = argsList;

      // now invoke the user-provided callback function
      if (err) {
        callback(err)
      } else {
        result.type = returnType
        callback(null, result.deref())
      }
    })
  }

  return proxy
}
module.exports = ForeignFunction
