
1.2.7 / 2014-07-06
==================

 * test: add test case for race condition in #153
 * factorial: fix Windows build instructions
 * example: turn factorial readme to Markdown
 * example: add Windows libfactorial.dll compile command
 * package: remove "expect.js" dev dependency
 * test: remove final `expect.js` usage
 * jshintrc: enable "laxbreak"
 * travis: remove IRC notifications from Travis
 * test: properly re-add Mocha's uncaught listeners
 * test: add a try/catch test after the callback is GC'd
 * src: fix race condition when callback is invoked from thread pool (@nikmikov, #154)
 * change Node.js versions used on Travis CI for testing (@Mithgol, #151)
 * use SVG to display Travis CI build testing status (@Mithgol, #149)

1.2.6 / 2013-10-08
==================

 * just a minor documentation typo fix (Jason May, #126)
 * example: fix "factorial" example on Windows (#127)
 * package: add "keywords" section
 * callback: store a reference to the CIF struct on the ffi closure Buffer instance (#125)

1.2.5 / 2013-04-06
==================

 * type: make detecting "long" and "ulong" ffi_types work
 * travis: don't test node v0.7.x, test node v0.10.x

1.2.4 / 2013-02-18
==================

 * FreeBSD 32-bit support (Dave Osborne)
 * libffi: don't build libffi as a "thin" archive (CentOS 5 support, #110)

1.2.3 / 2012-12-20
==================

 * FreeBSD 64-bit support (Dave Osborne)

1.2.2 / 2012-12-15
==================

 * fix nasty bug in async FFI'd function on node v0.9.x

1.2.1 / 2012-12-15
==================

 * add node >= v0.9.4 support

1.2.0 / 2012-10-13
==================

 * type: full support for "ref-array" arguments and return types
 * type: add basic support for basic ref types without a `ffi_type` prop set
 * don't call the "ref()" function on passed in arguments
 * libffi: fix unused variable warnings
 * add `Function` "type" for functions/callbacks that accept/return C Functions
 * dynamic_library: use RTLD_LAZY by default
 * export all the RTLD_* symbols from the native binding
 * foreign_function: better error messages when a type's "set()" function throws
 * callback: make catching callbacks that throw JS exceptions work as expected
 * callback: more meaningful error message when a type's "set()" function throws
 * callback: fix pointer return values

1.1.3 / 2012-09-25
==================

 * callback: use `IsEmpty()` instead of an explicit NULL check
 * test: use "bindings" to load the bindings for the variadic tests
 * ffi: use HandleScope in WrapPointer() (fixes ffi calls in a tight loop, see #74)
 * test: fix typo in test name
 * libffi: disable the C4267 implicit conversion warnings on Windows
 * libffi: remove "as.bat" from the gyp file

1.1.2 / 2012-09-16
==================

 * callback: throw an Error if the callback function has been garbage collected
 * test: 100% tests passing on Windows!

1.1.1 / 2012-09-16
==================

 * libffi: define "FFI_MMAP_EXEC_WRIT" on OS X (#71)
 * added a new test case that calls a callback function directly (#72)

1.1.0 / 2012-09-11
==================

 * properly "gyp-ify" libffi
   - added "libffi.gyp"
   - no more "hacks" in binding.gyp
   - no need for MozillaBuild on Windows anymore!

1.0.7 / 2012-08-03
==================

 * export `FFI_FIRST_ABI`
 * export abi_enum values for ARM processors (100% tests passing on Raspberry Pi!)

1.0.6 / 2012-07-22
==================

 * VariadicForeignFunction: apply a tweak to prevent false positives on ffi id's

1.0.5 / 2012-07-22
==================

 * DynamicLibrary: use 'string' instead of "char *"
 * DynamicLibrary: set the "name" property of the returned Buffer when get() is called
 * test: add some "DynamicLibrary" tests
 * VariadicForeignFunction: quick hack fix for the key caching name collision

1.0.4 / 2012-07-12
==================

 * exit early when not compiling from within a MozillaBuild window on Windows

1.0.3 / 2012-07-9
=================

 * refactor the README
 * fix deprecation warning for using the `Utf8String` type (renamed to `CString`)
 * remove circular `require()` calls (Justin Freitag)
 * use the node-gyp `--directory` flag for `npm test` command

1.0.2 / 2012-06-20
==================

 * Fix Windows build (32-bit at least). Fixes #51.

1.0.1 / 2012-06-13
==================

 * Refactor the variadic function generator to allow for an overridden "returnType"

1.0.0 / 2012-05-31
==================

 * Add a `VariadicForeignFunction` function for vararg C functions
 * Various cleanup
 * Don't export the native bindings (`ffi.Bindings` is gone)
 * Use the `ref()` function when available, then fall back to `ref.alloc()`
 * Add a few more tests

1.0.0-alpha1 / 2012-05-29
=========================

 * Readme improvements
 * Node >= v0.7.9 compatability

1.0.0-alpha / 2012-05-25
========================

 * Alpha release of v1.0.0

< 1.0.0
=======

 * Prehistoric: see `git log`
