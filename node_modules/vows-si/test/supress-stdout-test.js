var assert = require('assert'),
    path = require('path'),
    vows = require('../lib/vows'),
    exec = require('child_process').exec;

function generateTopic(supress) {
    return function () {
        var cmd = '"' + process.execPath + '"' +  ' ./bin/vows ' + (supress ? '--supress-stdout ' : '') +
                  './test/fixtures/supress-stdout/output.js',
            options = {cwd: path.resolve(__dirname + '/../')},
            callback = this.callback;

        exec(cmd, options, function (err, stdout) {
            callback(null, {err: err, stdout: stdout});
        });
    };
}

vows.describe('vows/supress-stdout').addBatch({
    'Running vows for test/fixtures/supress-stdout/output.js': {
        'with --supress-stdout flag': {
            topic: generateTopic(true),                 
            'should be ok': function (result) {
                assert.isNull(result.err);
            },
            'should not contain output from stdout': function (result) {
                assert.equal(result.stdout.toString().indexOf('goo'), -1);
                // console.log output?
                // nope, just Chuck Testa!
            }
        },
        'without --supress-stdout flag': {
            topic: generateTopic(),
            'should be ok': function (result) {
                assert.isNull(result.err);
            },
            'should contain output from stdout': function (result) {
                assert.notEqual(result.stdout.toString().indexOf('goo'), -1);
            }
        }
    }
}).export(module);

