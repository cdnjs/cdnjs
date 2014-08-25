
var assert = require('assert')
  , ref = require('ref')
  , Array = require('ref-array')
  , Struct = require('ref-struct')
  , ffi = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })

describe('ForeignFunction', function () {

  afterEach(gc)

  // these structs are also defined in ffi_tests.cc
  var box = Struct({
      width: ref.types.int
    , height: ref.types.int
  })

  var arst = Struct({
      num: 'int'
    , array: Array('double', 20)
  })

  it('should call the static "abs" bindings', function () {
    var _abs = bindings.abs
    var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
    assert.equal('function', typeof abs)
    assert.equal(1234, abs(-1234))
  })

  it('should throw an Error with a meaningful message when type\'s `set()` throws', function () {
    var _abs = bindings.abs
    var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
    assert.throws(function () {
      abs('a string?!?!')
    }, /error setting argument 0/)
  })

  it('should call the static "atoi" bindings', function () {
    var _atoi = bindings.atoi
    var atoi = ffi.ForeignFunction(_atoi, 'int', [ 'string' ])
    assert.equal('function', typeof atoi)
    assert.equal(1234, atoi('1234'))
  })

  it('should call the static "double_box" bindings', function () {
    var double_box = ffi.ForeignFunction(bindings.double_box, box, [ box ])
    var b = new box
    assert(b instanceof box)
    b.width = 4
    b.height = 5
    var out = double_box(b)
    // double_box writes to its input "box" struct, so make sure that the one we
    // passed in remains unaffected (since we passed it in by value, not pointer)
    assert.equal(4, b.width)
    assert.equal(5, b.height)
    assert(out instanceof box)
    assert.equal(8, out.width)
    assert.equal(10, out.height)
    assert.notEqual(b.ref().address(), out.ref().address())
  })

  it('should call the static "double_box_ptr" bindings', function () {
    var boxPtr = ref.refType(box)
    var double_box_ptr = ffi.ForeignFunction(bindings.double_box_ptr, box, [ boxPtr ])
    var b = new box
    b.width = 4
    b.height = 5
    var out = double_box_ptr(b.ref())
    // double_box_ptr writes to its input "box" struct, so make sure that the one
    // we passed in has it's values changed (since we passed it in by pointer)
    assert.equal(8, b.width)
    assert.equal(10, b.height)
    assert(out instanceof box)
    assert.equal(8, out.width)
    assert.equal(10, out.height)
    assert.notEqual(b.ref().address(), out.ref().address())
  })

  it('should call the static "area_box" bindings', function () {
    var area_box = ffi.ForeignFunction(bindings.area_box, ref.types.int, [ box ])
    var b = new box({ width: 5, height: 20 })
    var rtn = area_box(b)
    assert.equal('number', typeof rtn)
    assert.equal(100, rtn)
  })

  it('should call the static "area_box_ptr" bindings', function () {
    var boxPtr = ref.refType(box)
    var area_box = ffi.ForeignFunction(bindings.area_box_ptr, ref.types.int, [ boxPtr ])
    var b = new box({ width: 5, height: 20 })
    var rtn = area_box(b.ref())
    assert.equal('number', typeof rtn)
    assert.equal(100, rtn)
  })

  it('should call the static "create_box" bindings', function () {
    var create_box = ffi.ForeignFunction(bindings.create_box, box, [ 'int', 'int' ])
    var rtn = create_box(1, 2)
    assert(rtn instanceof box)
    assert.equal(1, rtn.width)
    assert.equal(2, rtn.height)
  })

  it('should call the static "add_boxes" bindings', function () {
    var count = 3
    var boxes = new Buffer(box.size * count)
    box.set(boxes, box.size * 0, { width: 1, height: 10 })
    box.set(boxes, box.size * 1, { width: 2, height: 20 })
    box.set(boxes, box.size * 2, { width: 3, height: 30 })
    var boxPtr = ref.refType(box)
    var add_boxes = ffi.ForeignFunction(bindings.add_boxes, box, [ boxPtr, 'int' ])
    var rtn = add_boxes(boxes, count)
    assert(rtn instanceof box)
    assert.equal(6, rtn.width)
    assert.equal(60, rtn.height)
  })

  it('should call the static "int_array" bindings', function () {
    var IntArray = Array('int')
    var int_array = ffi.ForeignFunction(bindings.int_array, IntArray, [ IntArray ])
    var array = new IntArray([ 1, 2, 3, 4, 5, -1 ])
    var out = int_array(array)
    out.length = array.length
    assert.equal(2, out[0])
    assert.equal(4, out[1])
    assert.equal(6, out[2])
    assert.equal(8, out[3])
    assert.equal(10, out[4])
    assert.equal(-1, out[5])
  })

  it('should call the static "array_in_struct" bindings', function () {
    var array_in_struct = ffi.ForeignFunction(bindings.array_in_struct, arst, [ arst ])
    var a = new arst
    assert.equal(20, a.array.length)
    a.num = 69
    for (var i = 0; i < 20; i++) {
      a.array[i] = i / 3.14;
    }

    var b = array_in_struct(a)
    assert(b instanceof arst)
    assert.equal(138, b.num)
    assert.equal(20, b.array.length)
    for (var i = 0; i < 20; i++) {
      // Math.round() because of floating point rounding erros
      assert.equal(i, Math.round(b.array[i]))
    }
  })

  it('should not call the "ref()" function of its arguments', function () {
    var void_ptr_arg = ffi.ForeignFunction(bindings.abs, 'void *', [ 'void *' ])
    var b = new Buffer(0)
    b.ref = assert.bind(null, 0, '"ref()" should not be called')
    void_ptr_arg(b)
  })

  describe('async', function () {

    it('should call the static "abs" bindings asynchronously', function (done) {
      var _abs = bindings.abs
      var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
      assert.equal('function', typeof abs.async)

      // invoke asynchronously
      abs.async(-1234, function (err, res) {
        assert.equal(null, err)
        assert.equal(1234, res)
        done()
      })
    })

    it('should invoke the callback with an Error with a meaningful message when type\'s `set()` throws', function (done) {
      var _abs = bindings.abs
      var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])

      abs.async('a string!?!?', function (err, res) {
          assert(err)
          assert(/error setting argument 0/.test(err.message))
          assert.equal('undefined', typeof res)
          done()
      });
    })

  })

})
