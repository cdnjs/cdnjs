import React, { Component, createRef } from 'react';
import { DomHandler, ObjectUtils, classNames, Ripple, OverlayService, ZIndexUtils, ConnectedOverlayScrollHandler, CSSTransition, Portal } from 'primereact/core';
import PrimeReact from 'primereact/api';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CascadeSelectSub = /*#__PURE__*/function (_Component) {
  _inherits(CascadeSelectSub, _Component);

  var _super = _createSuper$1(CascadeSelectSub);

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
        var _iterator = _createForOfIteratorHelper$1(this.props.options),
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
      var containerOffset = DomHandler.getOffset(parentItem);
      var viewport = DomHandler.getViewport();
      var sublistWidth = this.element.offsetParent ? this.element.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.element);
      var itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
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
      }

      event.preventDefault();
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-cascadeselect-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-cascadeselect-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
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
      return this.props.optionLabel ? ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? ObjectUtils.resolveFieldData(option, this.props.optionValue) : option;
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return this.props.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel) : null;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren[this.props.level]);
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
        return /*#__PURE__*/React.createElement(CascadeSelectSub, {
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

      var className = classNames('p-cascadeselect-item', {
        'p-cascadeselect-item-group': this.isOptionGroup(option),
        'p-cascadeselect-item-active p-highlight': this.state.activeOption === option
      }, option.className);
      var submenu = this.renderSubmenu(option);
      var content = this.props.template ? ObjectUtils.getJSXElement(this.props.template, this.getOptionValue(option)) : /*#__PURE__*/React.createElement("span", {
        className: "p-cascadeselect-item-text"
      }, this.getOptionLabelToRender(option));
      var optionGroup = this.isOptionGroup(option) && /*#__PURE__*/React.createElement("span", {
        className: "p-cascadeselect-group-icon pi pi-angle-right"
      });
      return /*#__PURE__*/React.createElement("li", {
        key: this.getOptionLabelToRender(option) + '_' + index,
        className: className,
        style: option.style,
        role: "none"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-cascadeselect-item-content",
        onClick: function onClick(event) {
          return _this2.onOptionClick(event, option);
        },
        tabIndex: 0,
        onKeyDown: function onKeyDown(event) {
          return _this2.onKeyDown(event, option);
        }
      }, content, optionGroup, /*#__PURE__*/React.createElement(Ripple, null)), submenu);
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

      var className = classNames('p-cascadeselect-panel p-cascadeselect-items', this.props.className);
      var submenu = this.renderMenu();
      return /*#__PURE__*/React.createElement("ul", {
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
}(Component);

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CascadeSelect = /*#__PURE__*/function (_Component) {
  _inherits(CascadeSelect, _Component);

  var _super = _createSuper(CascadeSelect);

  function CascadeSelect(props) {
    var _this;

    _classCallCheck(this, CascadeSelect);

    _this = _super.call(this, props);
    _this.state = {
      focused: false,
      overlayVisible: false
    };
    _this.dirty = false;
    _this.selectionPath = null;
    _this.overlayRef = /*#__PURE__*/createRef();
    _this.inputRef = /*#__PURE__*/createRef(_this.props.inputRef);
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onOptionSelect = _this.onOptionSelect.bind(_assertThisInitialized(_this));
    _this.onOptionGroupSelect = _this.onOptionGroupSelect.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascadeSelect, [{
    key: "onOptionSelect",
    value: function onOptionSelect(event) {
      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: event.value
        });
      }

      this.updateSelectionPath();
      this.hide();
      this.inputRef.current.focus();
    }
  }, {
    key: "onOptionGroupSelect",
    value: function onOptionGroupSelect(event) {
      this.dirty = true;

      if (this.props.onGroupChange) {
        this.props.onGroupChange(event);
      }
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? ObjectUtils.resolveFieldData(option, this.props.optionValue) : option;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup, level) {
      return ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren[level]);
    }
  }, {
    key: "isOptionGroup",
    value: function isOptionGroup(option, level) {
      return Object.prototype.hasOwnProperty.call(option, this.props.optionGroupChildren[level]);
    }
  }, {
    key: "updateSelectionPath",
    value: function updateSelectionPath() {
      var path;

      if (this.props.value != null && this.props.options) {
        var _iterator = _createForOfIteratorHelper(this.props.options),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var option = _step.value;
            path = this.findModelOptionInGroup(option, 0);

            if (path) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.selectionPath = path;
    }
  }, {
    key: "findModelOptionInGroup",
    value: function findModelOptionInGroup(option, level) {
      if (this.isOptionGroup(option, level)) {
        var selectedOption;

        var _iterator2 = _createForOfIteratorHelper(this.getOptionGroupChildren(option, level)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var childOption = _step2.value;
            selectedOption = this.findModelOptionInGroup(childOption, level + 1);

            if (selectedOption) {
              selectedOption.unshift(option);
              return selectedOption;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (ObjectUtils.equals(this.props.value, this.getOptionValue(option), this.props.dataKey)) {
        return [option];
      }

      return null;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.disabled) {
        return;
      }

      var overlay = this.overlayRef ? this.overlayRef.current : null;

      if (!overlay || !overlay.contains(event.target)) {
        this.inputRef.current.focus();

        if (this.state.overlayVisible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          if (this.state.overlayVisible) {
            DomHandler.findSingle(this.overlayRef.current, '.p-cascadeselect-item').children[0].focus();
          } else if (event.altKey && this.props.options && this.props.options.length) {
            this.show();
          }

          event.preventDefault();
          break;
        //space

        case 32:
          if (this.state.overlayVisible) this.hide();else this.show();
          event.preventDefault();
          break;
        //tab

        case 9:
          this.hide();
          break;
      }
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.props.onBeforeShow) {
        this.props.onBeforeShow();
      }

      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.props.onBeforeHide) {
        this.props.onBeforeHide();
      }

      this.setState({
        overlayVisible: false
      }, function () {
        _this2.inputRef.current.focus();
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      ZIndexUtils.set('overlay', this.overlayRef.current);
      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.dirty = false;
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      ZIndexUtils.clear(this.overlayRef.current);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      DomHandler.alignOverlay(this.overlayRef.current, this.label.parentElement, this.props.appendTo || PrimeReact.appendTo);
    }
  }, {
    key: "bindOutsideClickListener",
    value: function bindOutsideClickListener() {
      var _this3 = this;

      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this3.state.overlayVisible && _this3.isOutsideClicked(event)) {
            _this3.hide();
          }
        };

        document.addEventListener('click', this.outsideClickListener);
      }
    }
  }, {
    key: "unbindOutsideClickListener",
    value: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this4 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.container, function () {
          if (_this4.state.overlayVisible) {
            _this4.hide();
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "bindResizeListener",
    value: function bindResizeListener() {
      var _this5 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this5.state.overlayVisible && !DomHandler.isAndroid()) {
            _this5.hide();
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    }
  }, {
    key: "unbindResizeListener",
    value: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
    }
  }, {
    key: "updateInputRef",
    value: function updateInputRef() {
      var ref = this.props.inputRef;

      if (ref) {
        if (typeof ref === 'function') {
          ref(this.inputRef.current);
        } else {
          ref.current = this.inputRef.current;
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInputRef();
      this.updateSelectionPath();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.updateSelectionPath();
      }
    }
  }, {
    key: "renderKeyboardHelper",
    value: function renderKeyboardHelper() {
      var value = this.props.value ? this.getOptionLabel(this.props.value) : null;
      return /*#__PURE__*/React.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React.createElement("input", {
        ref: this.inputRef,
        type: "text",
        id: this.props.inputId,
        name: this.props.name,
        defaultValue: value,
        readOnly: true,
        disabled: this.props.disabled,
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyDown: this.onInputKeyDown,
        tabIndex: this.props.tabIndex,
        "aria-haspopup": "listbox",
        "aria-labelledby": this.props.ariaLabelledBy
      }));
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this6 = this;

      var label = this.props.value ? this.getOptionLabel(this.props.value) : this.props.placeholder || 'p-emptylabel';
      var labelClassName = classNames('p-cascadeselect-label ', {
        'p-placeholder': label === this.props.placeholder,
        'p-cascadeselect-label-empty': !this.props.value && label === 'p-emptylabel'
      });
      return /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this6.label = el;
        },
        className: labelClassName
      }, label);
    }
  }, {
    key: "renderDropdownIcon",
    value: function renderDropdownIcon() {
      var iconClassName = classNames('p-cascadeselect-trigger-icon', this.props.dropdownIcon);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-cascadeselect-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var overlay = /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-connected-overlay",
        in: this.state.overlayVisible,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.overlayRef,
        className: "p-cascadeselect-panel p-component",
        onClick: this.onPanelClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-cascadeselect-items-wrapper"
      }, /*#__PURE__*/React.createElement(CascadeSelectSub, {
        options: this.props.options,
        selectionPath: this.selectionPath,
        className: "p-cascadeselect-items",
        optionLabel: this.props.optionLabel,
        optionValue: this.props.optionValue,
        level: 0,
        optionGroupLabel: this.props.optionGroupLabel,
        optionGroupChildren: this.props.optionGroupChildren,
        onOptionSelect: this.onOptionSelect,
        onOptionGroupSelect: this.onOptionGroupSelect,
        root: true,
        template: this.props.itemTemplate,
        onPanelHide: this.hide
      }))));
      return /*#__PURE__*/React.createElement(Portal, {
        element: overlay,
        appendTo: this.props.appendTo
      });
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this7 = this;

      var className = classNames('p-cascadeselect p-component p-inputwrapper', this.props.className, {
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused,
        'p-inputwrapper-filled': this.props.value,
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      });
      var keyboardHelper = this.renderKeyboardHelper();
      var labelElement = this.renderLabel();
      var dropdownIcon = this.renderDropdownIcon();
      var overlay = this.renderOverlay();
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        ref: function ref(el) {
          return _this7.container = el;
        },
        className: className,
        style: this.props.style,
        onClick: this.onClick
      }, keyboardHelper, labelElement, dropdownIcon, overlay);
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return element;
    }
  }]);

  return CascadeSelect;
}(Component);

_defineProperty(CascadeSelect, "defaultProps", {
  id: null,
  inputRef: null,
  style: null,
  className: null,
  value: null,
  name: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  placeholder: null,
  itemTemplate: null,
  disabled: false,
  dataKey: null,
  inputId: null,
  tabIndex: null,
  ariaLabelledBy: null,
  appendTo: null,
  transitionOptions: null,
  dropdownIcon: 'pi pi-chevron-down',
  onChange: null,
  onGroupChange: null,
  onBeforeShow: null,
  onBeforeHide: null,
  onShow: null,
  onHide: null
});

export { CascadeSelect };
