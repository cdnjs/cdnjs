ref
===
### Turn Buffer instances into "pointers"
[![Build Status](https://secure.travis-ci.org/TooTallNate/ref.svg)](https://travis-ci.org/TooTallNate/ref)
[![Build Status](https://ci.appveyor.com/api/projects/status/n8mswogp2im4uot8)](https://ci.appveyor.com/project/TooTallNate/ref)


This module is inspired by the old `Pointer` class from node-ffi, but with the
intent of using Node's fast `Buffer` instances instead of a slow C++ `Pointer`
class. These two concepts were previously very similar, but now this module
brings over the functionality that Pointers had and Buffers are missing, so
now Buffers are a lot more powerful.

### Features:

 * Get the memory address of any `Buffer` instance
 * Read/write references to JavaScript Objects into `Buffer` instances
 * Read/write `Buffer` instances' memory addresses to other `Buffer` instances
 * Read/write `int64_t` and `uint64_t` data values (Numbers or Strings)
 * A "type" convention, so that you can specify a buffer as an `int *`,
   and reference/dereference at will.
 * Offers a buffer instance representing the `NULL` pointer


Installation
------------

Install with `npm`:

``` bash
$ npm install ref
```


Examples
--------

#### referencing and derefencing

``` js
var ref = require('ref')

// so we can all agree that a buffer with the int value written
// to it could be represented as an "int *"
var buf = new Buffer(4)
buf.writeInt32LE(12345, 0)

// first, what is the memory address of the buffer?
console.log(buf.address())  // ← 140362165284824

// using `ref`, you can set the "type", and gain magic abilities!
buf.type = ref.types.int

// now we can dereference to get the "meaningful" value
console.log(buf.deref())  // ← 12345


// you can also get references to the original buffer if you need it.
// this buffer could be thought of as an "int **"
var one = buf.ref()

// and you can dereference all the way back down to an int
console.log(one.deref().deref())  // ← 12345
```

See the [full API Docs][docs] for more examples.


The "type" interface
--------------------

You can easily define your own "type" objects at attach to `Buffer` instances.
It just needs to be a regular JavaScript Object that contains the following
properties:

| **Name**      | **Data Type**                    | **Description**
|:--------------|:---------------------------------|:----------------------------------
| `size`        | Number                           | The size in bytes required to hold this type.
| `indirection` | Number                           | The current level of indirection of the buffer. Usually this would be _1_, and gets incremented on Buffers from `ref()` calls. A value of less than or equal to _0_ is invalid.
| `get`         | Function (buffer, offset)        | The function to invoke when dereferencing this type when the indirection level is _1_.
| `set`         | Function (buffer, offset, value) | The function to invoke when setting a value to a buffer instance.
| `name`        | String                           | _(optional)_ The name to use during debugging for this type.
| `alignment`   | Number                           | _(optional)_ The alignment of this type when placed in a struct. Defaults to the type's `size`.

For example, you could define a "bigint" type that dereferences into a
[`bigint`](https://github.com/substack/node-bigint) instance:

``` js
var ref = require('ref')
var bigint = require('bigint')

// define the "type" instance according to the spec
var BigintType = {
    size: ref.sizeof.int64
  , indirection: 1
  , get: function (buffer, offset) {
      // return a bigint instance from the buffer
      return bigint.fromBuffer(buffer)
    }
  , set: function (buffer, offset, value) {
      // 'value' would be a bigint instance
      var val = value.toString()
      return ref.writeInt64(buffer, offset || 0, val)
    }
}

// now we can create instances of the type from existing buffers.
// "buf" is some Buffer instance returned from some external data
// source, which should contain "bigint" binary data.
buf.type = BigintType

// and now you can create "bigint" instances using this generic "types" API
var val = buf.deref()
            .add('1234')
            .sqrt()
            .shiftLeft(5)
```

Build the docs
--------------

Install the dev dependencies:

``` bash
$ npm install
```

Generate the docs:

``` bash
$ npm run docs
```


License
-------

(The MIT License)

Copyright (c) 2012 Nathan Rajlich &lt;nathan@tootallnate.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[docs]: http://tootallnate.github.com/ref
