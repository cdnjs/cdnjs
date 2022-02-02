"use strict";

exports.__esModule = true;
exports.needsGlobalMessagingForBrowser = needsGlobalMessagingForBrowser;

var _src = require("cross-domain-utils/src");

function needsGlobalMessagingForBrowser() {
  if ((0, _src.getUserAgent)(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) {
    return true;
  }

  return false;
}