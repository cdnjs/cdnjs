var vows = require('../../../lib/vows'),
    assert = require('assert');

var obvious;
vows.describe('failing').addBatch({
  'Obvious test': obvious = {
    topic: function () {
      this.callback(null, false);
    },
    'should work': function (result) {
      assert.ok(result);
    }
    // but it won't
  },
  'Obvious test #2': obvious,
  'Obvious test #3': obvious,
  'Obvious test #4': obvious
}).export(module);
