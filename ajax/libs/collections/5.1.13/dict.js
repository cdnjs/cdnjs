"use strict";

var Dict = require("./_dict");
var PropertyChanges = require("./listen/property-changes");
var MapChanges = require("./listen/map-changes");

// Burgled from https://github.com/domenic/dict

module.exports = Dict;
Object.addEach(Dict.prototype, PropertyChanges.prototype);
Object.addEach(Dict.prototype, MapChanges.prototype);
