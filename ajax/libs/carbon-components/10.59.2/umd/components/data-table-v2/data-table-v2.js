(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../data-table/data-table"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../data-table/data-table"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dataTable);
    global.dataTableV2 = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _dataTable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _dataTable = _interopRequireDefault(_dataTable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var _default = _dataTable.default;
  _exports.default = _default;
});