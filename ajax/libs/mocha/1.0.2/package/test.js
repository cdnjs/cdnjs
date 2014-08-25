
var assert = require('assert')

suite('foo', function(){
  test('should bar', function(done){
    setTimeout(function(){
      assert.equal(1,2 )
      done();
    }, 100);
  })

  test('should baz', function(){
    
  })
})