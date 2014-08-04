
var assert = require('assert')
var ref = require('../')

describe('char', function () {

  it('should accept a JS String, and write the first char\'s code', function () {
    var val = 'a'

    var buf = ref.alloc('char', val)
    assert.strictEqual(val.charCodeAt(0), buf.deref())

    buf = ref.alloc('uchar', val)
    assert.strictEqual(val.charCodeAt(0), buf.deref())
  })

})
