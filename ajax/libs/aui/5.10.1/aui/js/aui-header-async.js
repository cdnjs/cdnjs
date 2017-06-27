/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v5.10.1
 * @link https://docs.atlassian.com/aui/latest/
 * @license Apache-2.0
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__469b2016bfd42afc92690fa5c0b88f9f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __d22fbd253c421021dd510fb3c4fcd828;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __0e8fe5f46f722f07c64d1f183c324dd8;
  
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
(typeof window === 'undefined' ? global : window).__7732ae654cca02eae7e5b1592377f1c1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __469b2016bfd42afc92690fa5c0b88f9f;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);