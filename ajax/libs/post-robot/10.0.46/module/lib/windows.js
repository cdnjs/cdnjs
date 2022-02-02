"use strict";

exports.__esModule = true;
exports.isWindowKnown = isWindowKnown;
exports.markWindowKnown = markWindowKnown;

var _global = require("../global");

function markWindowKnown(win) {
  const knownWindows = (0, _global.windowStore)('knownWindows');
  knownWindows.set(win, true);
}

function isWindowKnown(win) {
  const knownWindows = (0, _global.windowStore)('knownWindows');
  return knownWindows.get(win, false);
}