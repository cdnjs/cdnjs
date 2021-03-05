"use strict";

var _extends = require("@babel/runtime/helpers/extends"), _objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties"), _classCallCheck = require("@babel/runtime/helpers/classCallCheck"), _createClass = require("@babel/runtime/helpers/createClass"), _inherits = require("@babel/runtime/helpers/inherits"), index = require("./index-98d6b651.cjs.prod.js"), React = require("react");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _extends__default = _interopDefault(_extends), _objectWithoutProperties__default = _interopDefault(_objectWithoutProperties), _classCallCheck__default = _interopDefault(_classCallCheck), _createClass__default = _interopDefault(_createClass), _inherits__default = _interopDefault(_inherits), React__default = _interopDefault(React), defaultProps = {
  defaultInputValue: "",
  defaultMenuIsOpen: !1,
  defaultValue: null
}, manageState = function(SelectComponent) {
  var _class, _temp;
  return _temp = _class = function(_Component) {
    _inherits__default.default(StateManager, _Component);
    var _super = index._createSuper(StateManager);
    function StateManager() {
      var _this;
      _classCallCheck__default.default(this, StateManager);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      return (_this = _super.call.apply(_super, [ this ].concat(args))).select = void 0, 
      _this.state = {
        inputValue: void 0 !== _this.props.inputValue ? _this.props.inputValue : _this.props.defaultInputValue,
        menuIsOpen: void 0 !== _this.props.menuIsOpen ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
        value: void 0 !== _this.props.value ? _this.props.value : _this.props.defaultValue
      }, _this.onChange = function(value, actionMeta) {
        _this.callProp("onChange", value, actionMeta), _this.setState({
          value: value
        });
      }, _this.onInputChange = function(value, actionMeta) {
        var newValue = _this.callProp("onInputChange", value, actionMeta);
        _this.setState({
          inputValue: void 0 !== newValue ? newValue : value
        });
      }, _this.onMenuOpen = function() {
        _this.callProp("onMenuOpen"), _this.setState({
          menuIsOpen: !0
        });
      }, _this.onMenuClose = function() {
        _this.callProp("onMenuClose"), _this.setState({
          menuIsOpen: !1
        });
      }, _this;
    }
    return _createClass__default.default(StateManager, [ {
      key: "focus",
      value: function() {
        this.select.focus();
      }
    }, {
      key: "blur",
      value: function() {
        this.select.blur();
      }
    }, {
      key: "getProp",
      value: function(key) {
        return void 0 !== this.props[key] ? this.props[key] : this.state[key];
      }
    }, {
      key: "callProp",
      value: function(name) {
        if ("function" == typeof this.props[name]) {
          for (var _this$props, _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
          return (_this$props = this.props)[name].apply(_this$props, args);
        }
      }
    }, {
      key: "render",
      value: function() {
        var _this2 = this, _this$props2 = this.props;
        _this$props2.defaultInputValue, _this$props2.defaultMenuIsOpen, _this$props2.defaultValue;
        var props = _objectWithoutProperties__default.default(_this$props2, [ "defaultInputValue", "defaultMenuIsOpen", "defaultValue" ]);
        return React__default.default.createElement(SelectComponent, _extends__default.default({}, props, {
          ref: function(_ref) {
            _this2.select = _ref;
          },
          inputValue: this.getProp("inputValue"),
          menuIsOpen: this.getProp("menuIsOpen"),
          onChange: this.onChange,
          onInputChange: this.onInputChange,
          onMenuClose: this.onMenuClose,
          onMenuOpen: this.onMenuOpen,
          value: this.getProp("value")
        }));
      }
    } ]), StateManager;
  }(React.Component), _class.defaultProps = defaultProps, _temp;
};

exports.manageState = manageState;
