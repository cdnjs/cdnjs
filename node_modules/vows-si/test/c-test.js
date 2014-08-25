var vows = require('../lib/vows'),
    assert = require('assert');

vows.describe("Vows test file starts with c").addBatch({

  "The test file": {
    topic: function () {
        return { flag: true };
    },
    "is run": function (topic) {
        assert.isTrue(topic.flag);
    }
  }
}).export(module);
