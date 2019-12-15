/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v7.1.0
 * @link https://docs.atlassian.com/aui/latest/
 * @license SEE LICENSE IN LICENSE.md
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__5a5cadb0bb38614934785cd1cadaae84 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __1229637a5000a487cdf288734bfca586;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __6ea0b021a4217e5ffa04395c6bcc8e3f;
  
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
(typeof window === 'undefined' ? global : window).__987eb15e45180aa2f26b8780307c79d7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __5a5cadb0bb38614934785cd1cadaae84;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);