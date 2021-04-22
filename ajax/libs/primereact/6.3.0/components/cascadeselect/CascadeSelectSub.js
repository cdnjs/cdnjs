"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CascadeSelectSub = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CascadeSelectSub = /*#__PURE__*/function (_Component) {
  _inherits(CascadeSelectSub, _Component);

  var _super = _createSuper(CascadeSelectSub);

  function CascadeSelectSub(props) {
    var _this;

    _classCallCheck(this, CascadeSelectSub);

    _this = _super.call(this, props);
    _this.state = {
      activeOption: null
    };
    _this.onOptionSelect = _this.onOptionSelect.bind(_assertThisInitialized(_this));
    _this.onOptionGroupSelect = _this.onOptionGroupSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascadeSelectSub, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.selectionPath && this.props.options && !this.props.dirty) {
        var _iterator = _createForOfIteratorHelper(this.props.options),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var option = _step.value;

            if (this.props.selectionPath.includes(option)) {
              this.setState({
                activeOption: option
              });
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (!this.props.root) {
        this.position();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.parentActive !== this.props.parentActive) {
        this.setState({
          activeOption: null
        });
      }
    }
  }, {
    key: "position",
    value: function position() {
      var parentItem = this.element.parentElement;

      var containerOffset = _DomHandler.default.getOffset(parentItem);

      var viewport = _DomHandler.default.getViewport();

      var sublistWidth = this.element.offsetParent ? this.element.offsetWidth : _DomHandler.default.getHiddenElementOuterWidth(this.element);

      var itemOuterWidth = _DomHandler.default.getOuterWidth(parentItem.children[0]);

      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - _DomHandler.default.calculateScrollbarWidth()) {
        this.element.style.left = '-100%';
      }
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(event) {
      if (this.props.onOptionSelect) {
        this.props.onOptionSelect(event);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event, option) {
      var listItem = event.currentTarget.parentElement;

      switch (event.key) {
        case 'Down':
        case 'ArrowDown':
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.children[0].focus();
          }

          break;

        case 'Up':
        case 'ArrowUp':
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.children[0].focus();
          }

          break;

        case 'Right':
        case 'ArrowRight':
          if (this.isOptionGroup(option)) {
            if (this.state.activeOption === option) {
              listItem.children[1].children[0].children[0].focus();
            } else {
              this.setState({
                activeOption: option
              });
            }
          }

          break;

        case 'Left':
        case 'ArrowLeft':
          this.setState({
            activeOption: null
          });
          var parentList = event.currentTarget.parentElement.parentElement.previousElementSibling;

          if (parentList) {
            parentList.focus();
          }

          break;

        case 'Enter':
          this.onOptionClick(event, option);
          break;

        case 'Tab':
        case 'Escape':
          if (this.props.onPanelHide) {
            this.props.onPanelHide();
            event.preventDefault();
          }

          break;

        default:
          break;
      }

      event.preventDefault();
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return _DomHandler.default.hasClass(nextItem, 'p-disabled') || !_DomHandler.default.hasClass(nextItem, 'p-cascadeselect-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return _DomHandler.default.hasClass(prevItem, 'p-disabled') || !_DomHandler.default.hasClass(prevItem, 'p-cascadeselect-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onOptionClick",
    value: function onOptionClick(event, option) {
      if (this.isOptionGroup(option)) {
        this.setState({
          activeOption: this.state.activeOption === option ? null : option
        });

        if (this.props.onOptionGroupSelect) {
          this.props.onOptionGroupSelect({
            originalEvent: event,
            value: option
          });
        }
      } else {
        if (this.props.onOptionSelect) {
          this.props.onOptionSelect({
            originalEvent: event,
            value: this.getOptionValue(option)
          });
        }
      }
    }
  }, {
    key: "onOptionGroupSelect",
    value: function onOptionGroupSelect(event) {
      if (this.props.onOptionGroupSelect) {
        this.props.onOptionGroupSelect(event);
      }
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? _ObjectUtils.default.resolveFieldData(option, this.props.optionLabel) : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? _ObjectUtils.default.resolveFieldData(option, this.props.optionValue) : option;
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return this.props.optionGroupLabel ? _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupLabel) : null;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupChildren[this.props.level]);
    }
  }, {
    key: "isOptionGroup",
    value: function isOptionGroup(option) {
      return Object.prototype.hasOwnProperty.call(option, this.props.optionGroupChildren[this.props.level]);
    }
  }, {
    key: "getOptionLabelToRender",
    value: function getOptionLabelToRender(option) {
      return this.isOptionGroup(option) ? this.getOptionGroupLabel(option) : this.getOptionLabel(option);
    }
  }, {
    key: "renderSubmenu",
    value: function renderSubmenu(option) {
      if (this.isOptionGroup(option) && this.state.activeOption === option) {
        return /*#__PURE__*/_react.default.createElement(CascadeSelectSub, {
          options: this.getOptionGroupChildren(option),
          className: "p-cascadeselect-sublist",
          selectionPath: this.props.selectionPath,
          optionLabel: this.props.optionLabel,
          optionValue: this.props.optionValue,
          level: this.props.level + 1,
          onOptionSelect: this.onOptionSelect,
          onOptionGroupSelect: this.onOptionGroupSelect,
          parentActive: this.state.activeOption === option,
          optionGroupLabel: this.props.optionGroupLabel,
          optionGroupChildren: this.props.optionGroupChildren,
          dirty: this.props.dirty,
          template: this.props.template,
          onPanelHide: this.props.onPanelHide
        });
      }

      return null;
    }
  }, {
    key: "renderOption",
    value: function renderOption(option, index) {
      var _this2 = this;

      var className = (0, _ClassNames.classNames)('p-cascadeselect-item', {
        'p-cascadeselect-item-group': this.isOptionGroup(option),
        'p-cascadeselect-item-active p-highlight': this.state.activeOption === option
      }, option.className);
      var submenu = this.renderSubmenu(option);
      var content = this.props.template ? _ObjectUtils.default.getJSXElement(this.props.template, this.getOptionValue(option)) : /*#__PURE__*/_react.default.createElement("span", {
        className: "p-cascadeselect-item-text"
      }, this.getOptionLabelToRender(option));

      var optionGroup = this.isOptionGroup(option) && /*#__PURE__*/_react.default.createElement("span", {
        className: "p-cascadeselect-group-icon pi pi-angle-right"
      });

      return /*#__PURE__*/_react.default.createElement("li", {
        key: this.getOptionLabelToRender(option) + '_' + index,
        className: className,
        style: option.style,
        role: "none"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-cascadeselect-item-content",
        onClick: function onClick(event) {
          return _this2.onOptionClick(event, option);
        },
        tabIndex: 0,
        onKeyDown: function onKeyDown(event) {
          return _this2.onKeyDown(event, option);
        }
      }, content, optionGroup, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)), submenu);
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this3 = this;

      if (this.props.options) {
        return this.props.options.map(function (option, index) {
          return _this3.renderOption(option, index);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var className = (0, _ClassNames.classNames)('p-cascadeselect-panel p-cascadeselect-items', this.props.className);
      var submenu = this.renderMenu();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          return _this4.element = el;
        },
        className: className,
        role: "listbox",
        "aria-orientation": "horizontal"
      }, submenu);
    }
  }]);

  return CascadeSelectSub;
}(_react.Component);

exports.CascadeSelectSub = CascadeSelectSub;

_defineProperty(CascadeSelectSub, "defaultProps", {
  options: null,
  selectionPath: false,
  className: null,
  optionLabel: null,
  optionValue: null,
  level: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  parentActive: null,
  dirty: null,
  root: null,
  template: null,
  onOptionSelect: null,
  onOptionGroupSelect: null
});

_defineProperty(CascadeSelectSub, "propTypes", {
  options: _propTypes.default.array,
  selectionPath: _propTypes.default.any,
  className: _propTypes.default.string,
  optionLabel: _propTypes.default.string,
  optionValue: _propTypes.default.string,
  level: _propTypes.default.number,
  optionGroupLabel: _propTypes.default.string,
  optionGroupChildren: _propTypes.default.array,
  parentActive: _propTypes.default.bool,
  dirty: _propTypes.default.bool,
  root: _propTypes.default.bool,
  template: _propTypes.default.any,
  onOptionSelect: _propTypes.default.func,
  onOptionGroupSelect: _propTypes.default.func
});