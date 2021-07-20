"use strict";

exports.__esModule = true;
exports.cleanUpWindow = cleanUpWindow;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _global = require("./global");

function cleanUpWindow(win) {
  const requestPromises = (0, _global.windowStore)('requestPromises');

  for (const promise of requestPromises.get(win, [])) {
    promise.reject(new Error(`Window ${(0, _src.isWindowClosed)(win) ? 'closed' : 'cleaned up'} before response`)).catch(_src2.noop);
  }
}