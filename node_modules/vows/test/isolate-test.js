var vows = require('../lib/vows'),
    assert = require('assert'),
    path = require('path'),
    os = require('os'),
    exec = require('child_process').exec;

function generateTopic(args, file) {
  return function () {
    var cmd = '"' + process.execPath + '"' +  ' ./bin/vows' + ' -i ' + (args || '') +
              ' ./test/fixtures/isolate/' + file,
        options = {cwd: path.resolve(__dirname + '/../')},
        callback = this.callback;

    exec(cmd, options, function (err, stdout, stderr) {
      callback(null, {
        err: err,
        stdout: stdout,
        stderr: stderr
      });
    });
  }
}

function assertExecOk(r) {
  assert.isNull(r.err);
}

function assertExecNotOk(r) {
  assert.isNotNull(r.err);
}

function parseResults(stdout) {
  var results = stdout.split('\n');

  // win32 may console.log data which need to filter out invalid JSON at start of results
  //TODO: do we need to filter out any console.log data as we are expecting only valid json
  // any console.log used for dedugging may break parseResults
  if(process.platform === 'win32') {
    while(results.length > 0 && results[0].charAt(0) !== '{') {
      results.shift();
    }
  }

  return results.map(function (s) {
    if (!s) return;
    return JSON.parse(s);
  }).filter(function (s) {return s});
}

function assertResultTypePresent(results, type) {
  assert.ok(results.some(function (result) {
    return result[0] == type;
  }));
}

function assertResultsFinish(results, expected) {
  var finish = results[results.length - 1];
  assert.equal(finish[0], 'finish');

  finish = finish[1];

  Object.keys(expected).forEach(function (key) {
    assert.equal(finish[key], expected[key]);
  });
}

vows.describe('vows/isolate').addBatch({
  'Running vows with -i flag for test/fixtures/isolate/': {
    'passing.js': {
      'with default reporter': {
        topic: generateTopic(null, 'passing.js'),
        'should be ok': assertExecOk
      },
      'with json reporter': {
        topic: generateTopic('--json', 'passing.js'),
        'should be ok': assertExecOk,
        'should have correct output': function (r) {
            var results = parseResults(r.stdout)

          assertResultTypePresent(results, 'subject');
          assertResultTypePresent(results, 'end');

          assertResultsFinish(results, {
            total: 4,
            honored: 4
          });
        }
      }
    },
    'failing.js': {
      'with json reporter': {
        topic: generateTopic('--json', 'failing.js'),
        'should be not ok': assertExecNotOk,
        'should have correct output though': function (r) {
          var results = parseResults(r.stdout);

          assertResultsFinish(results, {
            total: 4,
            broken: 4
          });
        }
      }
    },
    'stderr.js': {
      'with json reporter': {
        topic: generateTopic('--json', 'stderr.js'),
        'should be ok': assertExecOk,
        'should have stderr': function (r) {
          assert.equal(r.stderr,
                       ['oh no!', 'oh no!', 'oh no!', 'oh no!', ''].join('\n'));
        },
        'should have correct output': function (r) {
            var results=  parseResults(r.stdout);

          assertResultsFinish(results, {
            total: 4,
            honored: 4
          });
        }
      }
    },
    'log.js': {
      'with json reporter': {
        topic: generateTopic('--json', 'log.js'),
        'should be ok': assertExecOk,
        'should have correct output': function (r) {
          var results=  parseResults(r.stdout);

          assertResultsFinish(results, {
            total: 4,
            honored: 4
          });
        }
      }
    },
    'all tests (*)': {
      'with json reporter': {
        topic: generateTopic('--json', '*'),
        'should be not ok': assertExecNotOk,
        'should have correct output': function (r) {
            var results=  parseResults(r.stdout);

          assertResultsFinish(results, {
            total: 16,
            broken: 4,
            honored: 12
          });
        }
      }
    }
  }
}).export(module);
