
var assert = require('assert')
var ref = require('../')

describe('alloc()', function () {

  it('should return a new Buffer of "bool" size', function () {
    var buf = ref.alloc(ref.types.bool)
    assert.equal(ref.sizeof.bool, buf.length)
  })

  it('should coerce string type names', function () {
    var buf = ref.alloc('bool')
    assert.strictEqual(ref.types.bool, buf.type)
  })

})
