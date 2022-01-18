"use strict";

var Shim = require("./shim");
var FastSet = require("./_fast-set");
var PropertyChanges = require("./listen/property-changes");

module.exports = FastSet;

Object.addEach(FastSet.prototype, PropertyChanges.prototype);
