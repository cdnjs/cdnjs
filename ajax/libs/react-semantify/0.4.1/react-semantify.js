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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui breadcrumb';

var Breadcrumb = _react2.default.createClass({
  displayName: 'Breadcrumb',

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

exports.default = Breadcrumb;

},{"../mixins/classGenerator":33}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui form';

var Form = _react2.default.createClass({
  displayName: 'Form',

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

exports.default = Form;

},{"../mixins/classGenerator":33}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui grid';

var Grid = _react2.default.createClass({
  displayName: 'Grid',

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

exports.default = Grid;

},{"../mixins/classGenerator":33}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui menu';

var Menu = _react2.default.createClass({
  displayName: 'Menu',

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

exports.default = Menu;

},{"../mixins/classGenerator":33}],6:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui message';

var Message = _react2.default.createClass({
  displayName: 'Message',

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

exports.default = Message;

},{"../mixins/classGenerator":33}],7:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui table';

var Table = _react2.default.createClass({
  displayName: 'Table',

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

exports.default = Table;

},{"../mixins/classGenerator":33}],8:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'column';

var Column = _react2.default.createClass({
  displayName: 'Column',

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

exports.default = Column;

},{"../mixins/classGenerator":33}],9:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('./unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'content';

var Content = _react2.default.createClass({
  displayName: 'Content',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color', 'active']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        active: this.getActive() }),
      this.props.children
    );
  }
});

exports.default = Content;

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35,"./unit":16}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'field';

var Field = _react2.default.createClass({
  displayName: 'Field',

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

exports.default = Field;

},{"../mixins/classGenerator":33}],11:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'fields';

var Fields = _react2.default.createClass({
  displayName: 'Fields',

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

exports.default = Fields;

},{"../mixins/classGenerator":33}],12:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'row';

var Row = _react2.default.createClass({
  displayName: 'Row',

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

exports.default = Row;

},{"../mixins/classGenerator":33}],13:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('./unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'section';

var Section = _react2.default.createClass({
  displayName: 'Section',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor() }),
      this.props.children
    );
  }
});

exports.default = Section;

},{"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/typeSelector":36,"./unit":16}],14:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'text';

var Text = _react2.default.createClass({
  displayName: 'Text',

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

exports.default = Text;

},{"../mixins/classGenerator":33}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('./unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'title';

var Title = _react2.default.createClass({
  displayName: 'Title',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color', 'active']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        active: this.getActive() }),
      this.props.children
    );
  }
});

exports.default = Title;

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35,"./unit":16}],16:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unit = undefined;

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Unit = exports.Unit = _react2.default.createClass({
  displayName: 'Unit',

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui button';

var Button = _react2.default.createClass({
  displayName: 'Button',

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
      _unit.Unit,
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

exports.default = Button;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui divider';

var Divider = _react2.default.createClass({
  displayName: 'Divider',

  mixins: [_classGenerator2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName) },
      this.props.children
    );
  }
});

exports.default = Divider;

},{"../mixins/classGenerator":33}],19:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'flag';

var Flag = _react2.default.createClass({
  displayName: 'Flag',

  mixins: [_classGenerator2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(_unit.Unit, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'icon',
      color: 'null' }));
  }
});

exports.default = Flag;

},{"../commons/unit":16,"../mixins/classGenerator":33}],20:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui header';

var Header = _react2.default.createClass({
  displayName: 'Header',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor(),
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

exports.default = Header;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35,"../mixins/typeSelector":36}],21:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'icon';

var Icon = _react2.default.createClass({
  displayName: 'Icon',

  mixins: [_classGenerator2.default, _colorSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(_unit.Unit, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'icon',
      color: this.getColor(),
      disabled: this.getDisabled(),
      loading: this.getLoading() }));
  }
});

exports.default = Icon;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],22:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui image';

var Image = _react2.default.createClass({
  displayName: 'Image',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var disabled = _props.disabled;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'disabled']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'img',
        color: 'null',
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

exports.default = Image;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],23:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui input';

var Input = _react2.default.createClass({
  displayName: 'Input',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    if (typeof this.props.children != 'undefined') {
      return _react2.default.createElement(
        _unit.Unit,
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
        _unit.Unit,
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

exports.default = Input;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],24:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui label';

var Label = _react2.default.createClass({
  displayName: 'Label',

  mixins: [_classGenerator2.default, _colorSelector2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'type', 'color']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: this.getColor() }),
      this.props.children
    );
  }
});

exports.default = Label;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/typeSelector":36}],25:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui list';

var List = _react2.default.createClass({
  displayName: 'List',

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

exports.default = List;

},{"../mixins/classGenerator":33}],26:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui loader';

var Loader = _react2.default.createClass({
  displayName: 'Loader',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit.Unit,
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

exports.default = Loader;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],27:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui rail';

var Rail = _react2.default.createClass({
  displayName: 'Rail',

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

exports.default = Rail;

},{"../mixins/classGenerator":33}],28:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui reveal';

var Reveal = _react2.default.createClass({
  displayName: 'Reveal',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: 'div',
        color: 'null',
        disabled: this.getDisabled() }),
      this.props.children
    );
  }
});

exports.default = Reveal;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],29:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _colorSelector = require('../mixins/colorSelector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui segment';

var Segment = _react2.default.createClass({
  displayName: 'Segment',

  mixins: [_classGenerator2.default, _colorSelector2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;

    var other = _objectWithoutProperties(_props, ['className', 'color']);

    return _react2.default.createElement(_unit.Unit, _extends({}, other, {
      className: this.getClassName(defaultClassName),
      type: 'div',
      color: this.getColor(),
      disabled: this.getDisabled(),
      loading: this.getLoading() }));
  }
});

exports.default = Segment;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/colorSelector":34,"../mixins/stateSelector":35}],30:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'step';

var Step = _react2.default.createClass({
  displayName: 'Step',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _unit.Unit,
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

exports.default = Step;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],31:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui steps';

var Steps = _react2.default.createClass({
  displayName: 'Steps',

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

exports.default = Steps;

},{"../mixins/classGenerator":33}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Statistic = exports.Items = exports.Item = exports.Feed = exports.Comments = exports.Comment = exports.Card = exports.Ad = exports.Tab = exports.Sticky = exports.Sidebar = exports.Shape = exports.Search = exports.Rating = exports.Progress = exports.Popup = exports.Modal = exports.Dropdown = exports.Dimmer = exports.Checkbox = exports.Accordion = exports.Steps = exports.Step = exports.Segment = exports.Reveal = exports.Rail = exports.Loader = exports.List = exports.Label = exports.Input = exports.Image = exports.Icon = exports.Header = exports.Flag = exports.Divider = exports.Button = exports.Title = exports.Text = exports.Section = exports.Row = exports.Fields = exports.Field = exports.Content = exports.Column = exports.Table = exports.Message = exports.Menu = exports.Grid = exports.Form = exports.Breadcrumb = undefined;

var _breadcrumb = require('./collections/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _form = require('./collections/form');

var _form2 = _interopRequireDefault(_form);

var _grid = require('./collections/grid');

var _grid2 = _interopRequireDefault(_grid);

var _menu = require('./collections/menu');

var _menu2 = _interopRequireDefault(_menu);

var _message = require('./collections/message');

var _message2 = _interopRequireDefault(_message);

var _table = require('./collections/table');

var _table2 = _interopRequireDefault(_table);

var _column = require('./commons/column');

var _column2 = _interopRequireDefault(_column);

var _content = require('./commons/content');

var _content2 = _interopRequireDefault(_content);

var _field = require('./commons/field');

var _field2 = _interopRequireDefault(_field);

var _fields = require('./commons/fields');

var _fields2 = _interopRequireDefault(_fields);

var _row = require('./commons/row');

var _row2 = _interopRequireDefault(_row);

var _section = require('./commons/section');

var _section2 = _interopRequireDefault(_section);

var _text = require('./commons/text');

var _text2 = _interopRequireDefault(_text);

var _title = require('./commons/title');

var _title2 = _interopRequireDefault(_title);

var _button = require('./elements/button');

var _button2 = _interopRequireDefault(_button);

var _divider = require('./elements/divider');

var _divider2 = _interopRequireDefault(_divider);

var _flag = require('./elements/flag');

var _flag2 = _interopRequireDefault(_flag);

var _header = require('./elements/header');

var _header2 = _interopRequireDefault(_header);

var _icon = require('./elements/icon');

var _icon2 = _interopRequireDefault(_icon);

var _image = require('./elements/image');

var _image2 = _interopRequireDefault(_image);

var _input = require('./elements/input');

var _input2 = _interopRequireDefault(_input);

var _label = require('./elements/label');

var _label2 = _interopRequireDefault(_label);

var _list = require('./elements/list');

var _list2 = _interopRequireDefault(_list);

var _loader = require('./elements/loader');

var _loader2 = _interopRequireDefault(_loader);

var _rail = require('./elements/rail');

var _rail2 = _interopRequireDefault(_rail);

var _reveal = require('./elements/reveal');

var _reveal2 = _interopRequireDefault(_reveal);

var _segment = require('./elements/segment');

var _segment2 = _interopRequireDefault(_segment);

var _step = require('./elements/step');

var _step2 = _interopRequireDefault(_step);

var _steps = require('./elements/steps');

var _steps2 = _interopRequireDefault(_steps);

var _accordion = require('./modules/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _checkbox = require('./modules/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _dimmer = require('./modules/dimmer');

var _dimmer2 = _interopRequireDefault(_dimmer);

var _dropdown = require('./modules/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _popup = require('./modules/popup');

var _popup2 = _interopRequireDefault(_popup);

var _progress = require('./modules/progress');

var _progress2 = _interopRequireDefault(_progress);

var _rating = require('./modules/rating');

var _rating2 = _interopRequireDefault(_rating);

var _search = require('./modules/search');

var _search2 = _interopRequireDefault(_search);

var _shape = require('./modules/shape');

var _shape2 = _interopRequireDefault(_shape);

var _sidebar = require('./modules/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _sticky = require('./modules/sticky');

var _sticky2 = _interopRequireDefault(_sticky);

var _tab = require('./modules/tab');

var _tab2 = _interopRequireDefault(_tab);

var _advertisement = require('./views/advertisement');

var _advertisement2 = _interopRequireDefault(_advertisement);

var _card = require('./views/card');

var _card2 = _interopRequireDefault(_card);

var _comment = require('./views/comment');

var _comment2 = _interopRequireDefault(_comment);

var _comments = require('./views/comments');

var _comments2 = _interopRequireDefault(_comments);

var _feed = require('./views/feed');

var _feed2 = _interopRequireDefault(_feed);

var _item = require('./views/item');

var _item2 = _interopRequireDefault(_item);

var _items = require('./views/items');

var _items2 = _interopRequireDefault(_items);

var _statistic = require('./views/statistic');

var _statistic2 = _interopRequireDefault(_statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Breadcrumb = _breadcrumb2.default;
// collections

exports.Form = _form2.default;
exports.Grid = _grid2.default;
exports.Menu = _menu2.default;
exports.Message = _message2.default;
exports.Table = _table2.default;

// commons

exports.Column = _column2.default;
exports.Content = _content2.default;
exports.Field = _field2.default;
exports.Fields = _fields2.default;
exports.Row = _row2.default;
exports.Section = _section2.default;
exports.Text = _text2.default;
exports.Title = _title2.default;

// elements

exports.Button = _button2.default;
exports.Divider = _divider2.default;
exports.Flag = _flag2.default;
exports.Header = _header2.default;
exports.Icon = _icon2.default;
exports.Image = _image2.default;
exports.Input = _input2.default;
exports.Label = _label2.default;
exports.List = _list2.default;
exports.Loader = _loader2.default;
exports.Rail = _rail2.default;
exports.Reveal = _reveal2.default;
exports.Segment = _segment2.default;
exports.Step = _step2.default;
exports.Steps = _steps2.default;

// modules

exports.Accordion = _accordion2.default;
exports.Checkbox = _checkbox2.default;
exports.Dimmer = _dimmer2.default;
exports.Dropdown = _dropdown2.default;
exports.Modal = _modal2.default;
exports.Popup = _popup2.default;
exports.Progress = _progress2.default;
exports.Rating = _rating2.default;
exports.Search = _search2.default;
exports.Shape = _shape2.default;
exports.Sidebar = _sidebar2.default;
exports.Sticky = _sticky2.default;
exports.Tab = _tab2.default;

// views

exports.Ad = _advertisement2.default;
exports.Card = _card2.default;
exports.Comment = _comment2.default;
exports.Comments = _comments2.default;
exports.Feed = _feed2.default;
exports.Item = _item2.default;
exports.Items = _items2.default;
exports.Statistic = _statistic2.default;

},{"./collections/breadcrumb":2,"./collections/form":3,"./collections/grid":4,"./collections/menu":5,"./collections/message":6,"./collections/table":7,"./commons/column":8,"./commons/content":9,"./commons/field":10,"./commons/fields":11,"./commons/row":12,"./commons/section":13,"./commons/text":14,"./commons/title":15,"./elements/button":17,"./elements/divider":18,"./elements/flag":19,"./elements/header":20,"./elements/icon":21,"./elements/image":22,"./elements/input":23,"./elements/label":24,"./elements/list":25,"./elements/loader":26,"./elements/rail":27,"./elements/reveal":28,"./elements/segment":29,"./elements/step":30,"./elements/steps":31,"./modules/accordion":37,"./modules/checkbox":38,"./modules/dimmer":39,"./modules/dropdown":40,"./modules/modal":41,"./modules/popup":42,"./modules/progress":43,"./modules/rating":44,"./modules/search":45,"./modules/shape":46,"./modules/sidebar":47,"./modules/sticky":48,"./modules/tab":49,"./views/advertisement":50,"./views/card":51,"./views/comment":52,"./views/comments":53,"./views/feed":54,"./views/item":55,"./views/items":56,"./views/statistic":57}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

exports.default = {

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorArray = ['black', 'yellow', 'green', 'blue', 'orange', 'purple', 'red', 'teal'];

exports.default = {

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeArray = ['div', 'link', 'icon'];

exports.default = {

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui accordion';

var Accordion = _react2.default.createClass({
  displayName: 'Accordion',

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

exports.default = Accordion;

},{"../mixins/classGenerator":33}],38:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui checkbox';

var Checkbox = _react2.default.createClass({
  displayName: 'Checkbox',

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
      _unit.Unit,
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

exports.default = Checkbox;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui dimmer';

var Dimmer = _react2.default.createClass({
  displayName: 'Dimmer',

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
      _unit.Unit,
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

exports.default = Dimmer;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],40:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui dropdown';

var Dropdown = _react2.default.createClass({
  displayName: 'Dropdown',

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
      _unit.Unit,
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

exports.default = Dropdown;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],41:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui modal';

var Modal = _react2.default.createClass({
  displayName: 'Modal',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'active']);

    return _react2.default.createElement(
      _unit.Unit,
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

exports.default = Modal;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui popup';

var Popup = _react2.default.createClass({
  displayName: 'Popup',

  mixins: [_classGenerator2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassName(defaultClassName) },
      this.props.children
    );
  }
});

exports.default = Popup;

},{"../mixins/classGenerator":33}],43:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui progress';

var Progress = _react2.default.createClass({
  displayName: 'Progress',

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

exports.default = Progress;

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35}],44:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui rating';

var Rating = _react2.default.createClass({
  displayName: 'Rating',

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

exports.default = Rating;

},{"../mixins/classGenerator":33}],45:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui search';

var Search = _react2.default.createClass({
  displayName: 'Search',

  mixins: [_classGenerator2.default, _stateSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var color = _props.color;
    var type = _props.type;
    var active = _props.active;

    var other = _objectWithoutProperties(_props, ['className', 'color', 'type', 'active']);

    return _react2.default.createElement(
      _unit.Unit,
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

exports.default = Search;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/stateSelector":35}],46:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui shape';

var Shap = _react2.default.createClass({
  displayName: 'Shap',

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

exports.default = Shap;

},{"../mixins/classGenerator":33}],47:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui sidebar';

var Sidebar = _react2.default.createClass({
  displayName: 'Sidebar',

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

exports.default = Sidebar;

},{"../mixins/classGenerator":33}],48:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui sticky';

var Sticky = _react2.default.createClass({
  displayName: 'Sticky',

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

exports.default = Sticky;

},{"../mixins/classGenerator":33}],49:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _stateSelector = require('../mixins/stateSelector');

var _stateSelector2 = _interopRequireDefault(_stateSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui tab';

var Tab = _react2.default.createClass({
  displayName: 'Tab',

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

exports.default = Tab;

},{"../mixins/classGenerator":33,"../mixins/stateSelector":35}],50:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui ad';

var Ad = _react2.default.createClass({
  displayName: 'Ad',

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

exports.default = Ad;

},{"../mixins/classGenerator":33}],51:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui card';

var Card = _react2.default.createClass({
  displayName: 'Card',

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

exports.default = Card;

},{"../mixins/classGenerator":33}],52:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'comment';

var Comment = _react2.default.createClass({
  displayName: 'Comment',

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

exports.default = Comment;

},{"../mixins/classGenerator":33}],53:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui comments';

var Comments = _react2.default.createClass({
  displayName: 'Comments',

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

exports.default = Comments;

},{"../mixins/classGenerator":33}],54:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui feed';

var Feed = _react2.default.createClass({
  displayName: 'Feed',

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

exports.default = Feed;

},{"../mixins/classGenerator":33}],55:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

var _typeSelector = require('../mixins/typeSelector');

var _typeSelector2 = _interopRequireDefault(_typeSelector);

var _unit = require('../commons/unit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'item';

var Item = _react2.default.createClass({
  displayName: 'Item',

  mixins: [_classGenerator2.default, _typeSelector2.default],

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var type = _props.type;

    var other = _objectWithoutProperties(_props, ['className', 'type']);

    return _react2.default.createElement(
      _unit.Unit,
      _extends({}, other, {
        className: this.getClassName(defaultClassName),
        type: this.getType(),
        color: 'null',
        value: this.props.value }),
      this.props.children
    );
  }
});

exports.default = Item;

},{"../commons/unit":16,"../mixins/classGenerator":33,"../mixins/typeSelector":36}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClassName = 'ui items';

var Items = _react2.default.createClass({
  displayName: 'Items',

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

exports.default = Items;

},{"../mixins/classGenerator":33}],57:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classGenerator = require('../mixins/classGenerator');

var _classGenerator2 = _interopRequireDefault(_classGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultClassName = 'ui statistic';

var Statistic = _react2.default.createClass({
  displayName: 'Statistic',

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

exports.default = Statistic;

},{"../mixins/classGenerator":33}]},{},[32])(32)
});