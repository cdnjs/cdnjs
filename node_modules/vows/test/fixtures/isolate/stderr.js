var vows = require('../../../lib/vows'),
    assert = require('assert');

var obvious;
vows.describe('stderr').addBatch({
  'Obvious test': obvious = {
    topic: function () {
      this.callback(null, true);
    },
    'should work': function (result) {
      console.error('oh no!');
      assert.ok(result);
    }
  },
  'Obvious test #2': obvious,
  'Obvious test #3': obvious,
  'Obvious test #4': obvious
}).export(module);
