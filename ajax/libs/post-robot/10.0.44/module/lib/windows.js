"use strict";

exports.__esModule = true;
exports.markWindowKnown = markWindowKnown;
exports.isWindowKnown = isWindowKnown;

var _global = require("../global");

function markWindowKnown(win) {
  const knownWindows = (0, _global.windowStore)('knownWindows');
  knownWindows.set(win, true);
}

function isWindowKnown(win) {
  const knownWindows = (0, _global.windowStore)('knownWindows');
  return knownWindows.get(win, false);
}