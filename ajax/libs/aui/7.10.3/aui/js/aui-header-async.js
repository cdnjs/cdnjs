/*!!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v7.10.3
 * @link https://docs.atlassian.com/aui/latest/
 * @license SEE LICENSE IN LICENSE.md
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__7a14aa99d33ce9de8c0cd0ff3fcda57d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __e5dcf9f88d5550bb3a8b593cea6f6d48;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __925085afe37c9c6789b788cc0b7c856e;
  
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
(typeof window === 'undefined' ? global : window).__35a9b2509338433750b38e16c9e516c8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __7a14aa99d33ce9de8c0cd0ff3fcda57d;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);