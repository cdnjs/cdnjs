Vows
====

> Asynchronous BDD & continuous integration for node.js

#### <http://vowsjs.org> #

introduction
------------
There are two reasons why we might want asynchronous testing. The first, and obvious reason is that node.js is asynchronous, and therefore our tests need to be. The second reason is to make test suites which target I/O libraries run much faster.

_Vows_ is an experiment in making this possible, while adding a minimum of overhead.

synopsis
--------

    var vows = require('vows'),
        assert = require('assert');

    vows.describe('Deep Thought').addBatch({
        'An instance of DeepThought': {
            topic: new DeepThought,

            'should know the answer to the ultimate question of life': function (deepThought) {
                assert.equal (deepThought.question('what is the answer to the universe?'), 42);
            }
        }
    });

coverage reporting
------------------
Code coverage reporting is available if _instrumented_ code is detected.  Currently only _instrumentation_ via [node-jscoverage](https://github.com/visionmedia/node-jscoverage) is supported.  When _instrumented_ code is detected and coverage reporting is enabled using any of the `--cover-plain`, `--cover-html`, or `--cover-json` options a code coverage map is generated.

### downloading and installing [node-jscoverage](https://github.com/visionmedia/node-jscoverage)
[node-jscoverage](https://github.com/visionmedia/node-jscoverage) is a binary package that needs to be compiled from source:

    $ git clone https://github.com/visionmedia/node-jscoverage.git
    $ cd node-jscoverage/
    $ ./configure
    checking for a BSD-compatible install... /usr/bin/install -c
    checking whether build environment is sane... yes
    [...]
    $ make && sudo make install

### instrumenting with jscoverage

    $ jscoverage myfile.js myfile-instrumented.js
    
installation
------------

    $ npm install vows

documentation
-------------

Head over to <http://vowsjs.org>

authors
-------

Alexis Sellier <<alexis@cloudhead.io>>, Charlie Robbins,

*...and many others*

