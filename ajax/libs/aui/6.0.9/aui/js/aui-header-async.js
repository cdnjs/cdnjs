/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v6.0.9
 * @link https://docs.atlassian.com/aui/latest/
 * @license Apache-2.0
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__b8245847d12f0c6b6c1134e322f26bdd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __c691f08a5383388e1516125d04826fc6;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __6b9a4307ceda7eb3e2750cef13b49d91;
  
  var _skate2 = _interopRequireDefault(_skate);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Header = (0, _skate2.default)('aui-header', {
      type: _skate2.default.type.CLASSNAME,
      created: function created(element) {
          (0, _createHeader2.default)(element);
      }
  });
  
  exports.default = Header;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/js/aui-header-async.js
(typeof window === 'undefined' ? global : window).__ae8d8c05d77132954a1fbde56cd00139 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __b8245847d12f0c6b6c1134e322f26bdd;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);