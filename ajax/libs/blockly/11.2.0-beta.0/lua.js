// Shim for backwards-compatibility with bundlers that do not
// support the 'exports' clause in package.json, to allow them
// to load the blockly/lua submodule entrypoint.
module.exports = require('./lua_compressed.js');
