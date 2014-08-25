
/**
 * Module dependencies.
 */

var CIF_var = require('./cif_var')
  , Type = require('./type')
  , _ForeignFunction = require('./_foreign_function')
  , assert = require('assert')
  , debug = require('debug')('ffi:VariadicForeignFunction')
  , ref = require('ref')
  , bindings = require('./bindings')
  , POINTER_SIZE = ref.sizeof.pointer
  , FFI_ARG_SIZE = bindings.FFI_ARG_SIZE

/**
 * For when you want to call to a C function with variable amount of arguments.
 * i.e. `printf()`.
 *
 * This function takes care of caching and reusing ForeignFunction instances that
 * contain the same ffi_type argument signature.
 */

function VariadicForeignFunction (funcPtr, returnType, fixedArgTypes, abi) {
  debug('creating new VariadicForeignFunction', funcPtr)

  // the cache of ForeignFunction instances that this
  // VariadicForeignFunction has created so far
  var cache = {}

  // check args
  assert(Buffer.isBuffer(funcPtr), 'expected Buffer as first argument')
  assert(!!returnType, 'expected a return "type" object as the second argument')
  assert(Array.isArray(fixedArgTypes), 'expected Array of arg "type" objects as the third argument')

  var numFixedArgs = fixedArgTypes.length

  // normalize the "types" (they could be strings,
  // so turn into real type instances)
  fixedArgTypes = fixedArgTypes.map(ref.coerceType)

  // get the names of the fixed arg types
  var fixedKey = fixedArgTypes.map(function (type) {
    return getId(type)
  })


  // what gets returned is another function that needs to be invoked with the rest
  // of the variadic types that are being invoked from the function.
  function variadic_function_generator () {
    debug('variadic_function_generator invoked')

    // first get the types of variadic args we are working with
    var argTypes = fixedArgTypes.slice()
    var key = fixedKey.slice()

    for (var i = 0; i < arguments.length; i++) {
      var type = ref.coerceType(arguments[i])
      argTypes.push(type)

      var ffi_type = Type(type)
      assert(ffi_type.name)
      key.push(getId(type))
    }

    // now figure out the return type
    var rtnType = ref.coerceType(variadic_function_generator.returnType)
    var rtnName = getId(rtnType)
    assert(rtnName)

    // first let's generate the key and see if we got a cache-hit
    key = rtnName + key.join('')

    var func = cache[key]
    if (func) {
      debug('cache hit for key:', key)
    } else {
      // create the `ffi_cif *` instance
      debug('creating the variadic ffi_cif instance for key:', key)
      var cif = CIF_var(returnType, argTypes, numFixedArgs, abi)
      func = cache[key] = _ForeignFunction(cif, funcPtr, rtnType, argTypes)
    }
    return func
  }

  // set the return type. we set it as a property of the function generator to
  // allow for monkey patching the return value in the very rare case where the
  // return type is variadic as well
  variadic_function_generator.returnType = returnType

  return variadic_function_generator
}

module.exports = VariadicForeignFunction

var idKey = '_ffiId'
function getId (type) {
  if (!type.hasOwnProperty(idKey)) {
    type[idKey] = (((1+Math.random())*0x10000)|0).toString(16)
  }
  return type[idKey]
}
