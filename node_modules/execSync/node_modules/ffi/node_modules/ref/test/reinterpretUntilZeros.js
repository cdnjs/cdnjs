
var fs = require('fs')
var assert = require('assert')
var weak = require('weak')
var ref = require('../')

describe('reinterpretUntilZeros()', function () {

  beforeEach(gc)

  it('should return a new Buffer instance up until the first 0', function () {
    var buf = new Buffer('hello\0world')
    var buf2 = buf.reinterpretUntilZeros(1)
    assert.equal(buf2.length, 'hello'.length)
    assert.equal(buf2.toString(), 'hello')
  })

  it('should return a new Buffer instance up until the first 2-byte sequence of 0s', function () {
    var str = 'hello world'
    var buf = new Buffer(50)
    var len = buf.write(str, 'ucs2')
    buf.writeInt16LE(0, len) // NULL terminate the string

    var buf2 = buf.reinterpretUntilZeros(2)
    assert.equal(str.length, buf2.length / 2)
    assert.equal(buf2.toString('ucs2'), str)
  })

  it('should return a large Buffer instance > 10,000 bytes with UTF16-LE char bytes', function () {
    var data = fs.readFileSync(__dirname + '/utf16le.bin');
    var strBuf = ref.reinterpretUntilZeros(data, 2);
    assert(strBuf.length > 10000);
    var str = strBuf.toString('ucs2');
    // the data in `utf16le.bin` should be a JSON parsable string
    assert(JSON.parse(str));
  })

})
