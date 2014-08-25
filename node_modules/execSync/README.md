# execSync

Executes shell commands synchronously.

## Motivation

Simplifies build scripts.

Express 3 has asynchronous templates and helper functions are synchronous.
Some of my helper functions invoke compilers with async interfaces. I use
this library in DEVELOPMENT mode to precompile files on the fly through the
command line.

**NOT RECOMMENDED** on production servers.


## Install

    npm install execSync

## Usage

Require it

    var execSync = require('execSync');

Execute shell commands. `exec` interlaces stdout and stderr to `result.stdout`.

    var result = execSync.exec('echo $USER; echo some_err 1>&2; exit 1');
    console.log('return code ' + result.code);
    console.log('stdout + stderr ' + result.stdout);

## Legacy helper functions

Capture STDOUT

    var user = execSync.stdout('echo $USER');
    console.log('Hello ' + user);

Get result code

    var code = execSync.code('echo $HOME');
    console.log('result ' + code);

