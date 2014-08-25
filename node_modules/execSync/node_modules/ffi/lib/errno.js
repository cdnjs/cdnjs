
/**
 * Implementation of errno. This is a #define :/
 * On Linux, it's a global variable with the symbol `errno`,
 * On Darwin it's a method execution called `__error`.
 * On Windows it's a method execution called `_errno`.
 */

/**
 * Module dependencies.
 */

var DynamicLibrary = require('./dynamic_library')
  , ForeignFunction = require('./foreign_function')
  , ref = require('ref')
  , errnoPtr = null
  , int = ref.types.int
  , intPtr = ref.refType(int)

if (process.platform == 'darwin' || process.platform == 'mac') {
  var __error = DynamicLibrary().get('__error')
  errnoPtr = ForeignFunction(__error, intPtr, [])
} else if (process.platform == 'win32') {
  var _errno = DynamicLibrary('msvcrt.dll').get('_errno')
  errnoPtr = ForeignFunction(_errno, intPtr, [])
} else {  // linux, sunos, etc.
  var errnoGlobal = DynamicLibrary().get('errno').reinterpret(int.size)
  errnoPtr = function () { return errnoGlobal }
  // set the errno type
  errnoGlobal.type = int
}


function errno () {
  return errnoPtr().deref()
}
module.exports = errno
