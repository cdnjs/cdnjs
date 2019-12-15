/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v7.6.0
 * @link https://docs.atlassian.com/aui/latest/
 * @license SEE LICENSE IN LICENSE.md
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__2099962405af1a8893c5b00b1120bf59 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __fb3fd0e488fb6e56f8392c8bc7434da4;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __bb6ec7268c91759bbe10bd46d924551e;
  
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
(typeof window === 'undefined' ? global : window).__d1bf2850f98e3b981a4cc4cffe7c22fd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __2099962405af1a8893c5b00b1120bf59;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);