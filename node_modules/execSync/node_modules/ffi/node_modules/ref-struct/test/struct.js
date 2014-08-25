
var assert = require('assert')
  , ref = require('ref')
  , ArrayType = require('ref-array')
  , Struct = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'struct_tests' })

describe('Struct', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof Struct)
  })

  it('should return a struct constuctor function', function () {
    var S = Struct()
    assert.equal('function', typeof S)
  })

  it('should throw when the same field name is speicified more than once', function () {
    var S = Struct({ a: ref.types.int })
    assert.throws(function () {
      S.defineProperty('a', ref.types.int)
    })
  })

  it('should throw when given a type with "size" == 0', function () {
    assert.throws(function () {
      Struct({ v: 'void' })
    })
  })

  it('should work in a simple case', function () {
    var SimpleStruct = Struct({
        'first': ref.types.byte
      , 'last':  ref.types.byte
    })
    assert.equal(2, SimpleStruct.size)
    assert.equal(1, SimpleStruct.alignment)

    var ss = new SimpleStruct({ first: 50, last: 100 })
    assert.equal(50, ss.first)
    assert.equal(100, ss.last)
  })

  it('should work in a more complex case', function () {
    var MegaStruct = Struct({
        'byteVal': ref.types.byte
      , 'int8Val': ref.types.int8
      , 'int16Val': ref.types.int16
      , 'uint16Val': ref.types.uint16
      , 'int32Val': ref.types.int32
      , 'uint32Val': ref.types.uint32
      , 'floatVal': ref.types.float
      , 'doubleVal': ref.types.double
      , 'pointer': ref.refType('void')
    })
    var msTestPtr = new Buffer(1)
    var ms = new MegaStruct({
        byteVal: 100
      , int8Val: -100
      , int16Val: -1000
      , uint16Val: 1000
      , int32Val: -10000
      , uint32Val: 10000
      , floatVal: 1.25
      , doubleVal: 1000.0005
      , pointerVal: msTestPtr
    })
    assert.equal(100, ms.byteVal)
    assert.equal(-100, ms.int8Val)
    assert.equal(-1000, ms.int16Val)
    assert.equal(1000, ms.uint16Val)
    assert.equal(-10000, ms.int32Val)
    assert.equal(10000, ms.uint32Val)
    assert.equal(1.25, ms.floatVal)
    assert.equal(1000.0005, ms.doubleVal)
    assert.equal(ms.pointerVal.address(), msTestPtr.address())
  })

  it('should allow Struct nesting', function () {

    var ChildStruct = Struct({
        'a': ref.types.int
      , 'b': ref.types.int
    })
    var ParentStruct = Struct({
        'childA': ChildStruct
      , 'childB': ChildStruct
    })

    var ps = new ParentStruct({
        childA: { a: 100, b: 200 }
      , childB: { a: 300, b: 400 }
    })

    assert.equal(100, ps.childA.a)
    assert.equal(200, ps.childA.b)
    assert.equal(300, ps.childB.a)
    assert.equal(400, ps.childB.b)
  })

  describe('string type identifiers', function () {

    it('should work with string type identifiers', function () {
      var S = Struct({
          'int': 'int'
        , 'long': 'long'
        , 'string': 'string'
      })

      assert.strictEqual(ref.types.int, S.fields.int.type)
      assert.strictEqual(ref.types.long, S.fields.long.type)
      assert.strictEqual(ref.types.CString, S.fields.string.type)
    })

    it('should work as expected with "void *" as a type', function () {
      var S = Struct({
        'ptr1': 'void *',
        'ptr2': 'void *'
      })
      var s = new S()
      var b = new Buffer(1)
      s.ptr1 = ref.NULL
      s.ptr2 = b
      assert.equal(ref.NULL.address(), s.ptr1.address())
      assert.equal(b.address(), s.ptr2.address())
    })

  })

  describe('ref(), deref()', function () {

    it('should work to ref() and then deref() 1 level deep', function () {
      var S = Struct({ d: 'double' })
      var s = new S({ d: Math.PI })
      var sref = s.ref()
      assert(Buffer.isBuffer(sref))
      var _s = sref.deref()
      assert(_s instanceof S)
      assert.equal(Math.PI, _s.d)
    })

  })

  describe('offsets and sizeofs', function () {

    function test (structType, testNumber) {
      describe('Struct test' + testNumber, function () {
        it('should have its `size` matching sizeof()', function () {
          var expectedSize = bindings['test' + testNumber + ' sizeof']
          assert.equal(expectedSize, structType.size, 'test' + testNumber +
            ': sizeof(): expected ' + structType.size + ' to equal ' + expectedSize)
        })
        it('should have its `alignment` matching __alignof__()', function () {
          var expectedAlignment = bindings['test' + testNumber + ' alignof']
          assert.equal(expectedAlignment, structType.alignment, 'test' + testNumber +
            ': __alignof__(): expected ' + structType.alignment + ' to equal ' + expectedAlignment)
        })
        Object.keys(structType.fields).forEach(function (name) {
          it('should have a matching offsetof() for "' + name + '"', function () {
            var expectedOffset = bindings['test' + testNumber + ' offsetof ' + name]
            var offset = structType.fields[name].offset
            assert.equal(expectedOffset, offset, 'test' + testNumber +
              ': offsetof(' + name + '): expected ' + offset + ' to equal ' + expectedOffset)
          })
        })
      })
    }

    var test1 = Struct({
        'a': ref.types.int
      , 'b': ref.types.int
      , 'c': ref.types.double
    })
    test(test1, 1)

    var test2 = Struct({
        'a': ref.types.int
      , 'b': ref.types.double
      , 'c': ref.types.int
    })
    test(test2, 2)

    var test3 = Struct({
        'a': ref.types.double
      , 'b': ref.types.int
      , 'c': ref.types.int
    })
    test(test3, 3)

    var test4 = Struct({
        'a': ref.types.double
      , 'b': ref.types.double
      , 'c': ref.types.int
    })
    test(test4, 4)

    var test5 = Struct({
        'a': ref.types.int
      , 'b': ref.types.double
      , 'c': ref.types.double
    })
    test(test5, 5)

    var test6 = Struct({
        'a': ref.types.char
      , 'b': ref.types.short
      , 'c': ref.types.int
    })
    test(test6, 6)

    var test7 = Struct({
        'a': ref.types.int
      , 'b': ref.types.short
      , 'c': ref.types.char
    })
    test(test7, 7)

    var test8 = Struct({
        'a': ref.types.int
      , 'b': ref.types.short
      , 'c': ref.types.char
      , 'd': ref.types.char
    })
    test(test8, 8)

    var test9 = Struct({
        'a': ref.types.int
      , 'b': ref.types.short
      , 'c': ref.types.char
      , 'd': ref.types.char
      , 'e': ref.types.char
    })
    test(test9, 9)

    var test10 = Struct({
        'a': test1
      , 'b': ref.types.char
    })
    test(test10, 10)

    var test11 = Struct()
    test11.defineProperty('a', ref.types.size_t)
    test11.defineProperty('b', ref.types.ushort)
    test11.defineProperty('c', ref.types.ushort)
    // this struct contains an Array of `test11 *` structs, so `test11 **`...
    var test11_ptr_ptr = ref.refType(ref.refType(test11))
    test11.defineProperty('d', test11_ptr_ptr)
    test(test11, 11)

    var test12 = Struct({
        'a': ref.refType(ref.types.char)
      , 'b': ref.types.int
    })
    test(test12, 12)

    var test13 = Struct({
        'a': ref.types.char
      , 'b': ArrayType('char', 2)
    })
    test(test13, 13)

    var test14 = Struct({
        'a': ref.types.char
      , 'b': ArrayType('char', 2)
      , 'c': ref.types.short
      , 'd': ref.types.char
    })
    test(test14, 14)

    var test15 = Struct({
        'a': test1
      , 'b': test1
    })
    test(test15, 15)

    var test16 = Struct({
        'a': ArrayType('double', 10)
      , 'b': ArrayType('char', 3)
      , 'c': ArrayType('int', 6)
    })
    test(test16, 16)

    var test17 = Struct({
        'a': ArrayType('char', 3)
    })
    test(test17, 17)

    var test18 = Struct({
        'a': ArrayType(test17, 100)
    })
    test(test18, 18)

    // this example from libdespotify
    // see: https://github.com/TooTallNate/ref-struct/issues/1
    var STRING_LENGTH = 256;
    var test19 = Struct();
    test19.defineProperty('has_meta_data', 'bool');
    test19.defineProperty('playable', 'bool');
    test19.defineProperty('geo_restricted', 'bool');
    test19.defineProperty('track_id', ArrayType('uchar', 33));
    test19.defineProperty('file_id', ArrayType('uchar', 41));
    test19.defineProperty('file_bitrate', 'uint');
    test19.defineProperty('album_id', ArrayType('uchar', 33));
    test19.defineProperty('cover_id', ArrayType('uchar', 41));
    test19.defineProperty('key','uchar *');
    test19.defineProperty('allowed', 'char *');
    test19.defineProperty('forbidden', 'char *');
    test19.defineProperty('title', ArrayType('char', STRING_LENGTH));
    test19.defineProperty('artist', 'void *');
    test19.defineProperty('album', ArrayType('char', STRING_LENGTH));
    test19.defineProperty('length', 'int');
    test19.defineProperty('tracknumber', 'int');
    test19.defineProperty('year', 'int');
    test19.defineProperty('popularity', 'float');
    test19.defineProperty('next', ref.refType(test19));
    test(test19, 19);

  })

})
