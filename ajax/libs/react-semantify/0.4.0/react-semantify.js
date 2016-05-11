(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Semantify = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes += ' ' + arg;
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui breadcrumb';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui form';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'form',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui grid';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui menu';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],6:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui message';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui table';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'table',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],8:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'column';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],9:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'content';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color', 'active']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        active: this.getActive() }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35,"./unit":16}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'field';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],11:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'fields';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],12:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'row';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],13:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'section';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor() }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/typeSelector":36,"./unit":16}],14:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'text';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'title';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color', 'active']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        active: this.getActive() }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35,"./unit":16}],16:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = _react2.default.createClass({
  displayName: 'exports',

  propTypes: {
    className: _react2.default.PropTypes.string.isRequired,
    type: _react2.default.PropTypes.string.isRequired,
    color: _react2.default.PropTypes.string.isRequired
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;
    var value = _props.value;
    var disabled = _props.disabled;
    var active = _props.active;
    var loading = _props.loading;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color', 'value', 'disabled', 'active', 'loading']);

    switch (type) {

      case 'link':
        return _react2.default.createElement(
          'a',
          _extends({}, other, {
            className: this._generateClassName(),
            'data-value': value }),
          this.props.children
        );

      case 'icon':
        return _react2.default.createElement(
          'i',
          _extends({}, other, {
            className: this._generateClassName(),
            'data-value': value }),
          this.props.children
        );

      case 'img':
        return _react2.default.createElement(
          'img',
          _extends({}, other, {
            className: this._generateClassName() }),
          this.props.children
        );

      case 'div':
      default:
        return _react2.default.createElement(
          'div',
          _extends({}, other, {
            className: this._generateClassName(),
            'data-value': value }),
          this.props.children
        );
    }
  },

  _generateClassName: function _generateClassName() {
    var className = this.props.className;

    if (this.props.color != 'null') {
      className += ' ' + this.props.color;
    }

    className += ' ' + (0, _classnames2.default)({
      'disabled': this.props.disabled,
      'active': this.props.active,
      'loading': this.props.loading,
      'focus': this.props.focus,
      'error': this.props.error,
      'completed': this.props.completed,
      'read-only': this.props.readOnly
    });

    return className;
  }
});

},{"classnames":1}],17:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui button';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var disabled = _props.disabled;
    var active = _props.active;
    var loading = _props.loading;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'disabled', 'active', 'loading']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: this.getColor(),
        disabled: this.getDisabled(),
        active: this.getActive(),
        loading: this.getLoading() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],18:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui divider';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName) },
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],19:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'flag';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(_unit2.default, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'icon',
      color: 'null' }));
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33}],20:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui header';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor(),
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35,"../mixins/typeSelector":36}],21:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'icon';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(_unit2.default, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'icon',
      color: this.getColor(),
      disabled: this.getDisabled(),
      loading: this.getLoading() }));
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],22:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui image';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var disabled = _props.disabled;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'disabled']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'img',
        color: 'null',
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],23:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui input';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    if (typeof this.props.children != 'undefined') {
      return _react2.default.createElement(
        _unit2.default,
        _extends({}, other, {
          className: this.getClassName(defaultClassName),
          type: 'div',
          color: 'null',
          loading: this.getLoading(),
          focus: this.getFocus(),
          error: this.getError() }),
        this.props.children
      );
    } else {
      return _react2.default.createElement(
        _unit2.default,
        {
          className: this.getClassName(defaultClassName),
          type: 'div',
          color: 'null',
          loading: this.getLoading(),
          focus: this.getFocus(),
          error: this.getError() },
        _react2.default.createElement('input', _extends({}, other, {
          placeholder: this.props.placeholder,
          type: this.props.type }))
      );
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],24:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui label';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/typeSelector":36}],25:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui list';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],26:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui loader';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        disabled: this.getDisabled(),
        active: this.getActive() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],27:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui rail';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],28:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui reveal';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],29:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui segment';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _colorSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(_unit2.default, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'div',
      color: this.getColor(),
      disabled: this.getDisabled(),
      loading: this.getLoading() }));
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],30:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'step';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        active: this.getActive(),
        completed: this.getCompleted(),
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],31:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui steps';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],32:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  // collections
  Breadcrumb: require('./collections/breadcrumb.js'),
  Form: require('./collections/form.js'),
  Grid: require('./collections/grid.js'),
  Menu: require('./collections/menu.js'),
  Message: require('./collections/message.js'),
  Table: require('./collections/table.js'),

  // commons
  Column: require('./commons/column.js'),
  Content: require('./commons/content.js'),
  Field: require('./commons/field.js'),
  Fields: require('./commons/fields.js'),
  Row: require('./commons/row.js'),
  Section: require('./commons/section.js'),
  Text: require('./commons/text.js'),
  Title: require('./commons/title.js'),

  // elements
  Button: require('./elements/button.js'),
  Divider: require('./elements/divider.js'),
  Flag: require('./elements/flag.js'),
  Header: require('./elements/header.js'),
  Icon: require('./elements/icon.js'),
  Image: require('./elements/image.js'),
  Input: require('./elements/input.js'),
  Label: require('./elements/label.js'),
  List: require('./elements/list.js'),
  Loader: require('./elements/loader.js'),
  Rail: require('./elements/rail.js'),
  Reveal: require('./elements/reveal.js'),
  Segment: require('./elements/segment.js'),
  Step: require('./elements/step.js'),
  Steps: require('./elements/steps.js'),

  // modules
  Accordion: require('./modules/accordion.js'),
  Checkbox: require('./modules/checkbox.js'),
  Dimmer: require('./modules/dimmer.js'),
  Dropdown: require('./modules/dropdown.js'),
  Modal: require('./modules/modal.js'),
  Popup: require('./modules/popup.js'),
  Progress: require('./modules/progress.js'),
  Rating: require('./modules/rating.js'),
  Search: require('./modules/search.js'),
  Shape: require('./modules/shape.js'),
  Sidebar: require('./modules/sidebar.js'),
  Sticky: require('./modules/sticky.js'),
  Tab: require('./modules/tab.js'),

  // views
  Ad: require('./views/advertisement.js'),
  Card: require('./views/card.js'),
  Comment: require('./views/comment.js'),
  Comments: require('./views/comments.js'),
  Feed: require('./views/feed.js'),
  Item: require('./views/item.js'),
  Items: require('./views/items.js'),
  Statistic: require('./views/statistic.js')
};

},{"./collections/breadcrumb.js":2,"./collections/form.js":3,"./collections/grid.js":4,"./collections/menu.js":5,"./collections/message.js":6,"./collections/table.js":7,"./commons/column.js":8,"./commons/content.js":9,"./commons/field.js":10,"./commons/fields.js":11,"./commons/row.js":12,"./commons/section.js":13,"./commons/text.js":14,"./commons/title.js":15,"./elements/button.js":17,"./elements/divider.js":18,"./elements/flag.js":19,"./elements/header.js":20,"./elements/icon.js":21,"./elements/image.js":22,"./elements/input.js":23,"./elements/label.js":24,"./elements/list.js":25,"./elements/loader.js":26,"./elements/rail.js":27,"./elements/reveal.js":28,"./elements/segment.js":29,"./elements/step.js":30,"./elements/steps.js":31,"./modules/accordion.js":37,"./modules/checkbox.js":38,"./modules/dimmer.js":39,"./modules/dropdown.js":40,"./modules/modal.js":41,"./modules/popup.js":42,"./modules/progress.js":43,"./modules/rating.js":44,"./modules/search.js":45,"./modules/shape.js":46,"./modules/sidebar.js":47,"./modules/sticky.js":48,"./modules/tab.js":49,"./views/advertisement.js":50,"./views/card.js":51,"./views/comment.js":52,"./views/comments.js":53,"./views/feed.js":54,"./views/item.js":55,"./views/items.js":56,"./views/statistic.js":57}],33:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {

  propTypes: {
    className: _react2.default.PropTypes.string
  },

  getClassName: function getClassName(defaultClassName, addClassName) {
    var classResult = defaultClassName;

    if (typeof this.props.className !== 'undefined') {
      classResult += ' ' + this.props.className;
    }

    if (typeof addClassName !== 'undefined') {
      if ((typeof addClassName === 'undefined' ? 'undefined' : _typeof(addClassName)) === 'object') {
        classResult += ' ' + (0, _classnames2.default)(addClassName);
      } else {
        classResult += ' ' + addClassName;
      }
    }

    return classResult;
  }
};

},{"classnames":1}],34:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorArray = ['black', 'yellow', 'green', 'blue', 'orange', 'purple', 'red', 'teal'];

module.exports = {

  propTypes: {
    color: _react2.default.PropTypes.oneOf(colorArray)
  },

  getColor: function getColor() {
    var color = 'null';

    if (typeof this.props.color !== 'undefined') {

      if (colorArray.indexOf(this.props.color) !== -1) {
        color = this.props.color;
      }
    }

    return color;
  }
};

},{}],35:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  propTypes: {
    disabled: _react2.default.PropTypes.bool,
    active: _react2.default.PropTypes.bool,
    loading: _react2.default.PropTypes.bool,
    focus: _react2.default.PropTypes.bool,
    error: _react2.default.PropTypes.bool,
    completed: _react2.default.PropTypes.bool,
    readOnly: _react2.default.PropTypes.bool,
    success: _react2.default.PropTypes.bool,
    warning: _react2.default.PropTypes.bool
  },

  getDisabled: function getDisabled() {
    var disabled = false;

    if (typeof this.props.disabled !== 'undefined') {
      disabled = this.props.disabled;
    }

    return disabled;
  },

  getActive: function getActive() {
    var active = false;

    if (typeof this.props.active !== 'undefined') {
      active = this.props.active;
    }

    return active;
  },

  getLoading: function getLoading() {
    var loading = false;

    if (typeof this.props.loading !== 'undefined') {
      loading = this.props.loading;
    }

    return loading;
  },

  getFocus: function getFocus() {
    var focus = false;

    if (typeof this.props.focus !== 'undefined') {
      focus = this.props.focus;
    }

    return focus;
  },

  getError: function getError() {
    var error = false;

    if (typeof this.props.error !== 'undefined') {
      error = this.props.error;
    }

    return error;
  },

  getCompleted: function getCompleted() {
    var completed = false;

    if (typeof this.props.completed !== 'undefined') {
      completed = this.props.completed;
    }

    return completed;
  },

  getReadOnly: function getReadOnly() {
    var readOnly = false;

    if (typeof this.props.readOnly !== 'undefined') {
      readOnly = this.props.readOnly;
    }

    return readOnly;
  },

  getSuccess: function getSuccess() {
    var success = false;

    if (typeof this.props.success !== 'undefined') {
      success = this.props.success;
    }

    return success;
  },

  getWarning: function getWarning() {
    var warning = false;

    if (typeof this.props.warning !== 'undefined') {
      warning = this.props.warning;
    }

    return warning;
  }
};

},{}],36:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeArray = ['div', 'link', 'icon'];

module.exports = {

  propTypes: {
    type: _react2.default.PropTypes.oneOf(typeArray)
  },

  getType: function getType() {
    var type = 'div';

    if (typeof this.props.type !== 'undefined') {
      if (typeArray.indexOf(this.props.type) !== -1) {
        type = this.props.type;
      }
    }
    return type;
  }
};

},{}],37:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui accordion';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName), ref: 'accordion' },
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.accordion).accordion();
      } else {
        $(this.refs.accordion).accordion(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33}],38:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui checkbox';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'disabled', 'readOnly']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        color: 'null',
        type: 'div',
        disabled: this.getDisabled(),
        readOnly: this.getReadOnly() }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(_reactDom2.default.findDOMNode(this)).checkbox();
      } else {
        $(_reactDom2.default.findDOMNode(this)).checkbox(this.props.init);
      }
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],39:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui dimmer';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var disabled = _props.disabled;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'disabled', 'active']);

    return _react2.default.createElement(
      _unit2.default,
      {
        className: this.getClassName(defaultClassName),
        color: 'null',
        type: 'div',
        disabled: this.getDisabled(),
        active: this.getActive() },
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(_reactDom2.default.findDOMNode(this)).dimmer();
      } else {
        $(_reactDom2.default.findDOMNode(this)).dimmer(this.props.init);
      }
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],40:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui dropdown';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var error = _props.error;
    var disable = _props.disable;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'error', 'disable', 'active']);

    if (this.getActive() || this.getDisabled()) {
      defaultClassName += ' simple';
    }

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        color: 'null',
        type: 'div',
        error: this.getError(),
        disable: this.getDisabled(),
        active: this.getActive() }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(_reactDom2.default.findDOMNode(this)).dropdown();
      } else {
        $(_reactDom2.default.findDOMNode(this)).dropdown(this.props.init);
      }
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],41:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui modal';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'active']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        color: 'null',
        type: 'div',
        active: this.getActive() }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(_reactDom2.default.findDOMNode(this)).modal();
      } else {
        $(_reactDom2.default.findDOMNode(this)).modal(this.props.init);
      }
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],42:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui popup';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName) },
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],43:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui progress';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var percent = _props.percent;
    var value = _props.value;
    var total = _props.total;
    var active = _props.active;
    var success = _props.success;
    var warning = _props.warning;
    var error = _props.error;
    var disabled = _props.disabled;

    var other = _objectWithoutProperties(_props, ['className', 'percent', 'value', 'total', 'active', 'success', 'warning', 'error', 'disabled']);

    var state = {
      active: this.getActive(),
      success: this.getSuccess(),
      warning: this.getWarning(),
      error: this.getError(),
      disabled: this.getDisabled()
    };

    return _react2.default.createElement(
      'div',
      _extends({}, other, {
        className: this.getClassName(defaultClassName, state),
        'data-percent': percent,
        'data-value': value,
        'data-total': total,
        ref: 'progress' }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.progress).progress();
      } else {
        $(this.refs.progress).progress(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35}],44:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui rating';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var rating = _props.rating;
    var maxRating = _props.maxRating;

    var other = _objectWithoutProperties(_props, ['className', 'rating', 'maxRating']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        'data-rating': rating,
        'data-max-rating': maxRating,
        ref: 'rating' }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.rating).rating();
      } else {
        $(this.refs.rating).rating(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33}],45:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui search';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'active']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        color: 'null',
        type: 'div',
        loading: this.getLoading() }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(_reactDom2.default.findDOMNode(this)).search();
      } else {
        $(_reactDom2.default.findDOMNode(this)).search(this.props.init);
      }
    }
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],46:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui shape';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName), ref: 'shape' }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.shape).shape();
      } else {
        $(this.refs.shape).shape(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33}],47:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui sidebar';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName), ref: 'sidebar' }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.sidebar).sidebar();
      } else {
        $(this.refs.sidebar).sidebar(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33}],48:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui sticky';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.getDOMNode()).sticky();
      } else {
        $(this.getDOMNode()).sticky(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33}],49:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui tab';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var active = _props.active;
    var loading = _props.loading;
    var tab = _props.tab;

    var other = _objectWithoutProperties(_props, ['className', 'active', 'loading', 'tab']);

    var state = {
      active: this.getActive(),
      loading: this.getLoading()
    };

    return _react2.default.createElement(
      'div',
      _extends({}, other, {
        className: this.getClassName(defaultClassName, state),
        'data-tab': tab,
        ref: 'tab' }),
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (typeof this.props.init != 'undefined') {
      if (this.props.init === false) {
        return;
      }

      if (this.props.init === true) {
        $(this.refs.tab).tab();
      } else {
        $(this.refs.tab).tab(this.props.init);
      }
    }
  }
});

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35}],50:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui ad';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],51:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui card';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],52:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'comment';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],53:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui comments';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],54:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui feed';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],55:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('../commons/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'item';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;

    var other = _objectWithoutProperties(_props, ['className', 'type']);

    return _react2.default.createElement(
      _unit2.default,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: 'null',
        value: this.props.value }),
      this.props.children
    );
  }
});

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/typeSelector":36}],56:[function(require,module,exports){
'use strict';

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui items';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string
  },

  render: function render() {
    var type = '';

    if (typeof this.props.type != 'undefined') {
      if (this.props.type == 'link') {
        type = 'link';
      }
    }

    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName, type) },
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}],57:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui statistic';

module.exports = _react2.default.createClass({
  displayName: 'exports',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: this.getClassName(defaultClassName) }),
      this.props.children
    );
  }
});

},{"../mixins/classGenerator":33}]},{},[32])(32)
});