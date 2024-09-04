// Shim for backwards-compatibility with bundlers that do not
// support the 'exports' clause in package.json, to allow them
// to load the blockly/blocks submodule entrypoint.
module.exports = require('./blocks_compressed.js');
