var vows = require('../lib/vows'),
    assert = require('assert');

vows.describe("Vows test file with underscore").addBatch({

  "The test file": {
    topic: function () {
        return { flag: true };
    },
    "is run": function (topic) {
        assert.isTrue(topic.flag);
    }
  }
}).export(module);
