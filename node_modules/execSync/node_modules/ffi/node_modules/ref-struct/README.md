ref-struct
==========
### Create ABI-compliant "[struct][]" instances on top of Buffers
[![Build Status](https://secure.travis-ci.org/TooTallNate/ref-struct.svg)](https://travis-ci.org/TooTallNate/ref-struct)
[![Build Status](https://ci.appveyor.com/api/projects/status/6v4h5v5kh9kmtke8)](https://ci.appveyor.com/project/TooTallNate/ref-struct)


This module offers a "struct" implementation on top of Node.js Buffers
using the ref "type" interface.

Installation
------------

Install with `npm`:

``` bash
$ npm install ref-struct
```


Examples
--------

Say you wanted to emulate the `timeval` struct from the stdlib:

``` c
struct timeval {
  time_t       tv_sec;   /* seconds since Jan. 1, 1970 */
  suseconds_t  tv_usec;  /* and microseconds */
};
```

``` js
var ref = require('ref')
var StructType = require('ref-struct')

// define the time types
var time_t = ref.types.long
var suseconds_t = ref.types.long

// define the "timeval" struct type
var timeval = StructType({
  tv_sec: time_t,
  tv_usec: suseconds_t
})

// now we can create instances of it
var tv = new timeval
```

#### With `node-ffi`

This gets very powerful when combined with `node-ffi` to invoke C functions:

``` js
var ffi = require('ffi')

var tv = new timeval
gettimeofday(tv.ref(), null)
```

#### Progressive API

You can build up a Struct "type" incrementally (useful when interacting with a
parser) using the `defineProperty()` function. But as soon as you _create_ an
instance of the struct type, then the struct type is finalized, and no more
properties may be added to it.

``` js
var ref = require('ref')
var StructType = require('ref-struct')

var MyStruct = Struct()
MyStruct.defineProperty('width', ref.types.int)
MyStruct.defineProperty('height', ref.types.int)

var i = new MyStruct({ width: 5, height: 10 })

MyStruct.defineProperty('weight', ref.types.int)
// AssertionError: an instance of this Struct type has already been created, cannot add new "fields" anymore
//      at Function.defineProperty (/Users/nrajlich/ref-struct/lib/struct.js:180:3)
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

[struct]: http://wikipedia.org/wiki/Struct_(C_programming_language)
