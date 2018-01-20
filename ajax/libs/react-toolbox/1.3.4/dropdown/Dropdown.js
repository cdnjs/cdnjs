'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = exports.dropdownFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Input) {
  var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Dropdown);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: false,
        up: false
      }, _this.getDocumentEvents = function () {
        return {
          click: _this.handleDocumentClick,
          touchend: _this.handleDocumentClick
        };
      }, _this.open = function (event) {
        var client = event.target.getBoundingClientRect();
        var screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        var up = _this.props.auto ? client.top > screenHeight / 2 + client.height : false;
        if (_this.inputNode) _this.inputNode.blur();
        _this.setState({ active: true, up: up });
      }, _this.close = function () {
        if (_this.state.active) {
          _this.setState({ active: false });
        }
      }, _this.handleDocumentClick = function (event) {
        if (_this.state.active && !_events2.default.targetIsDescendant(event, _reactDom2.default.findDOMNode(_this))) {
          _this.setState({ active: false });
        }
      }, _this.handleClick = function (event) {
        _this.open(event);
        _events2.default.pauseEvent(event);
        if (_this.props.onClick) _this.props.onClick(event);
      }, _this.handleSelect = function (item, event) {
        if (_this.props.onBlur) _this.props.onBlur(event);
        if (!_this.props.disabled && _this.props.onChange) {
          if (_this.props.name) {
            event.target.name = _this.props.name;
          }
          _this.props.onChange(item, event);
          _this.close();
        }
      }, _this.getSelectedItem = function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.props.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.value === _this.props.value) return item;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!_this.props.allowBlank) {
          return _this.props.source[0];
        }
      }, _this.renderValue = function (item, idx) {
        var _classnames;

        var theme = _this.props.theme;

        var className = (0, _classnames5.default)((_classnames = {}, _defineProperty(_classnames, theme.selected, item.value === _this.props.value), _defineProperty(_classnames, theme.disabled, item.disabled), _classnames));
        return _react2.default.createElement(
          'li',
          { key: idx, className: className, onClick: !item.disabled ? _this.handleSelect.bind(_this, item.value) : null },
          _this.props.template ? _this.props.template(item) : item.label
        );
      }, _this.handleFocus = function (event) {
        event.stopPropagation();
        if (!_this.props.disabled) _this.open(event);
        if (_this.props.onFocus) _this.props.onFocus(event);
      }, _this.handleBlur = function (event) {
        event.stopPropagation();
        if (_this.state.active) _this.close();
        if (_this.props.onBlur) _this.props.onBlur(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Dropdown, [{
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
          _events2.default.addEventsToDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
          _events2.default.removeEventsFromDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.active) {
          _events2.default.removeEventsFromDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'renderTemplateValue',
      value: function renderTemplateValue(selected) {
        var _classnames2;

        var theme = this.props.theme;

        var className = (0, _classnames5.default)(theme.field, (_classnames2 = {}, _defineProperty(_classnames2, theme.errored, this.props.error), _defineProperty(_classnames2, theme.disabled, this.props.disabled), _defineProperty(_classnames2, theme.required, this.props.required), _classnames2));

        return _react2.default.createElement(
          'div',
          { className: className, onClick: this.handleClick },
          _react2.default.createElement(
            'div',
            { className: theme.templateValue + ' ' + theme.value },
            this.props.template(selected)
          ),
          this.props.label ? _react2.default.createElement(
            'label',
            { className: theme.label },
            this.props.label,
            this.props.required ? _react2.default.createElement(
              'span',
              { className: theme.required },
              ' * '
            ) : null
          ) : null,
          this.props.error ? _react2.default.createElement(
            'span',
            { className: theme.error },
            this.props.error
          ) : null
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames3,
            _this2 = this;

        var _props = this.props,
            allowBlank = _props.allowBlank,
            auto = _props.auto,
            required = _props.required,
            onChange = _props.onChange,
            onFocus = _props.onFocus,
            onBlur = _props.onBlur,
            source = _props.source,
            template = _props.template,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['allowBlank', 'auto', 'required', 'onChange', 'onFocus', 'onBlur', 'source', 'template', 'theme']);

        var selected = this.getSelectedItem();
        var className = (0, _classnames5.default)(theme.dropdown, (_classnames3 = {}, _defineProperty(_classnames3, theme.up, this.state.up), _defineProperty(_classnames3, theme.active, this.state.active), _defineProperty(_classnames3, theme.disabled, this.props.disabled), _defineProperty(_classnames3, theme.required, this.props.required), _classnames3), this.props.className);

        return _react2.default.createElement(
          'div',
          {
            className: className,
            'data-react-toolbox': 'dropdown',
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            tabIndex: '0'
          },
          _react2.default.createElement(Input, _extends({}, others, {
            tabIndex: '-1',
            className: theme.value,
            onClick: this.handleClick,
            required: this.props.required,
            readOnly: true,
            ref: function ref(node) {
              _this2.inputNode = node && node.getWrappedInstance();
            },
            type: template && selected ? 'hidden' : null,
            theme: theme,
            themeNamespace: 'input',
            value: selected && selected.label ? selected.label : ''
          })),
          template && selected ? this.renderTemplateValue(selected) : null,
          _react2.default.createElement(
            'ul',
            { className: theme.values, ref: 'values' },
            source.map(this.renderValue)
          )
        );
      }
    }]);

    return Dropdown;
  }(_react.Component);

  Dropdown.propTypes = {
    allowBlank: _react.PropTypes.bool,
    auto: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    label: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onClick: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    required: _react.PropTypes.bool,
    source: _react.PropTypes.array.isRequired,
    template: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      dropdown: _react.PropTypes.string,
      error: _react.PropTypes.string,
      errored: _react.PropTypes.string,
      field: _react.PropTypes.string,
      label: _react.PropTypes.string,
      required: _react.PropTypes.string,
      selected: _react.PropTypes.string,
      templateValue: _react.PropTypes.string,
      up: _react.PropTypes.string,
      value: _react.PropTypes.string,
      values: _react.PropTypes.string
    }),
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
  };
  Dropdown.defaultProps = {
    auto: true,
    className: '',
    allowBlank: true,
    disabled: false,
    required: false
  };


  return Dropdown;
};

var Dropdown = factory(_Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DROPDOWN)(Dropdown);
exports.dropdownFactory = factory;
exports.Dropdown = Dropdown;