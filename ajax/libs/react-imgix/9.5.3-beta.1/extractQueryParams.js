"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractQueryParams;

function extractQueryParams(src) {
  var splitSrc = src.split("?");
  var url = splitSrc[0];
  var query = splitSrc[1];

  if (!query) {
    return [url, {}];
  }

  var paramsPairs = query.split("&");
  var params = {};
  var len = paramsPairs.length;

  for (var i = 0; i < len; i++) {
    var param = paramsPairs[i];
    var splitParam = param.split("=");
    var key = splitParam[0];
    var val = splitParam[1];
    params[key] = decodeURIComponent(val);
  }

  return [url, params];
}
//# sourceMappingURL=extractQueryParams.js.map