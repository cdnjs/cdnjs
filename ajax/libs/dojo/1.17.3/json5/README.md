These modules are adapted from the [JSON5](https://github.com/json5/json5) project. JSON5 was adopted by
the Dojo Toolkit for use by `dojo/parser` to facilitate parsing data attributes without using the unsafe
JavaScript function `eval()`. As such only the parsing related modules from JSON5 are included.

Updates from the JSON5 project can be incorporated into the Dojo Toolkit with the following process:

* Clone the [JSON5 repository](https://github.com/json5/json5.git)
* Convert the relevant files to ES5 syntax with TypeScript's compiler:
```bash
tsc lib/parse.js lib/unicode.js lib/util.js --allowJs --module ES6 --outDir dojo --removeComments --target ES5
```
* Visually compare the existing modules in `dojo/json5` with the newly converted modules to see what changes will need
to be made
* Copy the files from the `json5/dojo` folder to the `dojo/json5` folder
* Manual updates:
  * IMPORTANT: wrap the `lexStates` object property `default:` in quotes => `'default':`
  * convert indentation to tabs in each module
  * remove any trailing commas
  * convert each module to AMD syntax
* Update `json5/parse.js` to use `dojo/string` methods for ES5 String methods:
  * require `'../string'` as `dstring`
  * replace calls to `codePointAt` with `dstring.codePointAt(str, position)`
  * replace calls to `String.fromCodePoint` with `dstring.fromCodePoint`
* Run Dojo's JSON5 tests to ensure the updates were successful:
  * `dojo/node_modules/intern-geezer/client.html?config=tests/dojo.intern&suites=tests/unit/json5`
* Update the line below recording the most recent update

Current as of 2020-06-12, commit [32bb2cd](https://github.com/json5/json5/commit/32bb2cdae4864b2ac80a6d9b4045efc4cc54f47a)
