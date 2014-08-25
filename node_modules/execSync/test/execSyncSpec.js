/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var execSync = require('..');


describe('execSync', function() {

  it('should get stdout', function() {
    var stdout = execSync.stdout('echo capture_stderr >&2; node --help');
    assert.include(stdout, 'Usage: node');
    assert.include(stdout, 'capture_stderr');
  });

  it('should get code', function() {
    var code = execSync.code('exit 42');
    assert.equal(code, 42);
    var code = execSync.code('exit');
    assert.equal(code, 0);
  });


  it ('should execute and get everything', function() {
    var result = execSync.exec('echo my_bad 1>&2; echo foo; echo your_bad 1>&2; exit 42');
    assert.equal(result.stdout, 'my_bad\nfoo\nyour_bad\n');
    assert.equal(result.code, 42);
  });

});
