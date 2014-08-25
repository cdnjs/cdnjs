
0.0.6 / 2014-06-19
==================

  * package: update "ref" to v0.3.2
  * package: update "debug" to v1.0.1
  * test: remove v8 namespace import
  * test: use "bindings" module to load the native tests
  * README: add appveyor build badge
  * History: match `git changelog` syntax
  * package: loosely pin the deps
  * test: nan-ify tests
  * README: fix Travis badge
  * README: use svg for Travis badge
  * travis: test node v0.8, v0.10, and v0.11
  * add appveyor.yml file for Windows testing
  * package: remove "engines" field
  * package: beautify
  * add a couple comments

0.0.5 / 2013-01-24
==================

  * rename the backing buffer property to `ref.buffer`
  * add .jshintrc file
  * some minor optimizations

0.0.4 / 2012-09-26
==================

  * struct: correct the field alignment logic (TJ Fontaine)
  * test: add failing test from #1
  * test: more stucts with arrays tests
  * add support for "ref-array" types
  * add `toObject()`, `toJSON()`, and `inspect()` functions to struct instances
  * change `_pointer` to `buffer`
  * don't allow types with size == 0 like 'void'
  * test: add test case using "void *" as the type
  * test: fix deprecation warning
  * package: use the -C switch on node-gyp for the `npm test` command
  * travis: test node v0.7 and node v0.8
  * adjust the custom `toString()` output

0.0.3 / 2012-06-01
==================

  * set the "name" property of StructType instances
  * add a `toString()` override
  * fix a bug in the alignment calculation logic

0.0.2 / 2012-05-16
==================

  * Windows support (only the test suite needed tweaks)
  * make ref().deref() work
  * make string type identifiers work (type coersion)
  * don't make the constructors' prototype inherit from `Function.protoype`

0.0.1 / 2012-05-09
==================

  * Initial release
