var path   = require('path'),
    events = require('events'),
    assert = require('assert'),
    fs     = require('fs'),
    vows   = require('../lib/vows');
    
function doSomethingAsync(callback) {
  	var err = null;
  	var testValue = 'a';

  	process.nextTick(function() {
  		  callback(err, testValue);
  	});
}

function doSomethingAsyncWithError(callback) {
  	var err = true;
  	var testValue = 'a';

  	process.nextTick(function() {
  		  callback(err, testValue);
  	});
}


vows.describe('vows/error').addBatch({
	'Generate success response to async function': {
    		topic: function() {
    			  doSomethingAsync(this.callback)
    		},
    		'Validate success': function(err, testValue) {
    			  assert.ok(!err);
    		},
    		'Validate testValue': function(err, testValue) {
    			  assert.equal(testValue, 'a');
    		}
  	},

  	'Generate error response to async function': {
    		topic: function() {
    			  doSomethingAsyncWithError(this.callback)
    		},
    		'Validate error': function(err, testValue) {
    			  assert.ok(err);
    		},
    		'Validate testValue': function(err, testValue) {
    			  // This assertion fails. It shouldn't.
    			  assert.equal(testValue, 'a');
    		}
  	}
}).export(module)