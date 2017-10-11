/*!
 * @atlassian/aui - Atlassian User Interface Framework
 * @version v6.1.0
 * @link https://docs.atlassian.com/aui/latest/
 * @license Apache-2.0
 * @author Atlassian Pty Ltd.
 */
// src/js/aui/header-async.js
(typeof window === 'undefined' ? global : window).__fae0462e29bd63fb914b125dd87e1d2d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createHeader = __12c1cac774790e994a4a3978d58742e5;
  
  var _createHeader2 = _interopRequireDefault(_createHeader);
  
  var _skate = __4fdc0d6ccd19e89737f0288402a35da8;
  
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
(typeof window === 'undefined' ? global : window).__3a800d18e38e7f0bbf2ebc1f6648c7a3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  __fae0462e29bd63fb914b125dd87e1d2d;
  
  exports.default = window.AJS;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);