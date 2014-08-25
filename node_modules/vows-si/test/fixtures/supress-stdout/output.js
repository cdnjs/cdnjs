var vows = require('../../../lib/vows'),
    assert = require('assert');

vows.describe('output').addBatch({
  'outputting': {
    topic: function () {
      console.log('goo');
      this.callback(null, true);
    },
    'should work': function (result) {
      console.log('goo');
      assert.ok(result);
    }
  },
}).export(module);

