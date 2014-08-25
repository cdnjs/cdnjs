
/**
 * Module dependencies.
 */

var ref = require('ref')
  , assert = require('assert')
  , bindings = require('./bindings')
  , Callback = require('./callback')
  , ForeignFunction = require('./foreign_function')
  , debug = require('debug')('ffi:FunctionType')
 
/**
 * Module exports.
 */

module.exports = Function

/**
 * Creates and returns a "type" object for a C "function pointer".
 *
 * @api public
 */

function Function (retType, argTypes, abi) {
  if (!(this instanceof Function)) {
    return new Function(retType, argTypes, abi)
  }

  debug('creating new FunctionType')

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument')
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument')

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  this.retType = ref.coerceType(retType)
  this.argTypes = argTypes.map(ref.coerceType)
  this.abi = null == abi ? bindings.FFI_DEFAULT_ABI : abi
}

/**
 * The "ffi_type" is set for node-ffi functions.
 */

Function.prototype.ffi_type = bindings.FFI_TYPES.pointer

/**
 * The "size" is always pointer-sized.
 */

Function.prototype.size = ref.sizeof.pointer

/**
 * The "alignment" is always pointer-aligned.
 */

Function.prototype.alignment = ref.alignof.pointer

/**
 * The "indirection" is always 1 to ensure that our get()/set() get called.
 */

Function.prototype.indirection = 1

/**
 * Returns a ffi.Callback pointer (Buffer) of this function type for the
 * given `fn` Function.
 */

Function.prototype.toPointer = function toPointer (fn) {
  return Callback(this.retType, this.argTypes, this.abi, fn)
}

/**
 * Returns a ffi.ForeignFunction (Function) of this function type for the
 * given `buf` Buffer.
 */

Function.prototype.toFunction = function toFunction (buf) {
  return ForeignFunction(buf, this.retType, this.argTypes, this.abi)
}

/**
 * get function; return a ForeignFunction instance.
 */

Function.prototype.get = function get (buffer, offset) {
  debug('ffi FunctionType "get" function')
  var ptr = buffer.readPointer(offset)
  return this.toFunction(ptr)
}

/**
 * set function; return a Callback buffer.
 */

Function.prototype.set = function set (buffer, offset, value) {
  debug('ffi FunctionType "set" function')
  var ptr
  if ('function' == typeof value) {
    ptr = this.toPointer(value)
  } else if (Buffer.isBuffer(value)) {
    ptr = value
  } else {
    throw new Error('don\'t know how to set callback function for: ' + value)
  }
  buffer.writePointer(ptr, offset)
}
