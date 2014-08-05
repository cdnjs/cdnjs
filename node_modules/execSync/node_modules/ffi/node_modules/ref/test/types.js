
var assert = require('assert')
var ref = require('../')

describe('types', function () {

  describe('refType()', function () {

    it('should return a new "type" with its `indirection` level increased by 1', function () {
      var int = ref.types.int
      var intPtr = ref.refType(int)
      assert.equal(int.size, intPtr.size)
      assert.equal(int.indirection + 1, intPtr.indirection)
    })

    it('should coerce string types', function () {
      var intPtr = ref.refType('int')
      assert.equal(2, intPtr.indirection)
      assert.equal(intPtr.size, ref.types.int.size)
    })

  })

  describe('derefType()', function () {

    it('should return a new "type" with its `indirection` level decreased by 1', function () {
      var intPtr = Object.create(ref.types.int)
      intPtr.indirection++
      var int = ref.derefType(intPtr)
      assert.equal(intPtr.size, intPtr.size)
      assert.equal(intPtr.indirection - 1, int.indirection)
    })

    it('should throw an Error when given a "type" with its `indirection` level already at 1', function () {
      assert.throws(function () {
        ref.derefType(ref.types.int)
      })
    })

  })

  describe('size', function () {
    Object.keys(ref.types).forEach(function (name) {
      if (name === 'void') return
      it('sizeof(' + name + ') should be >= 1', function () {
        var type = ref.types[name]
        assert.equal('number', typeof type.size)
        assert(type.size >= 1)
      })
    })
  })

  describe('alignment', function () {
    Object.keys(ref.types).forEach(function (name) {
      if (name === 'void') return
      it('alignof(' + name + ') should be >= 1', function () {
        var type = ref.types[name]
        assert.equal('number', typeof type.alignment)
        assert(type.alignment >= 1)
      })
    })
  })

})
