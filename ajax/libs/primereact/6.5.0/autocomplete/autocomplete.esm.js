import React, { Component, createRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ObjectUtils, Ripple, classNames, CSSTransition, Portal, ZIndexUtils, DomHandler, OverlayService, ConnectedOverlayScrollHandler, UniqueComponentId, tip } from 'primereact/core';
import { VirtualScroller } from 'primereact/virtualscroller';
import PrimeReact from 'primereact/api';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AutoCompletePanelComponent = /*#__PURE__*/function (_Component) {
  _inherits(AutoCompletePanelComponent, _Component);

  var _super = _createSuper$1(AutoCompletePanelComponent);

  function AutoCompletePanelComponent() {
    _classCallCheck(this, AutoCompletePanelComponent);

    return _super.apply(this, arguments);
  }

  _createClass(AutoCompletePanelComponent, [{
    key: "getOptionGroupRenderKey",
    value: function getOptionGroupRenderKey(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
    }
  }, {
    key: "renderGroupChildren",
    value: function renderGroupChildren(optionGroup, i) {
      var _this = this;

      var groupChildren = this.props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (item, j) {
        var itemContent = _this.props.itemTemplate ? ObjectUtils.getJSXElement(_this.props.itemTemplate, item, j) : _this.props.field ? ObjectUtils.resolveFieldData(item, _this.props.field) : item;
        return /*#__PURE__*/React.createElement("li", {
          key: j + '_item',
          role: "option",
          "aria-selected": _this.props.ariaSelected === item,
          className: "p-autocomplete-item",
          onClick: function onClick(e) {
            return _this.props.onItemClick(e, item);
          },
          "data-group": i,
          "data-index": j
        }, itemContent, /*#__PURE__*/React.createElement(Ripple, null));
      });
    }
  }, {
    key: "renderItem",
    value: function renderItem(suggestion, index) {
      var _this2 = this;

      if (this.props.optionGroupLabel) {
        var groupContent = this.props.optionGroupTemplate ? ObjectUtils.getJSXElement(this.props.optionGroupTemplate, suggestion, index) : this.props.getOptionGroupLabel(suggestion);
        var groupChildrenContent = this.renderGroupChildren(suggestion, index);
        var key = index + '_' + this.getOptionGroupRenderKey(suggestion);
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: key
        }, /*#__PURE__*/React.createElement("li", {
          className: "p-autocomplete-item-group"
        }, groupContent), groupChildrenContent);
      } else {
        var itemContent = this.props.itemTemplate ? ObjectUtils.getJSXElement(this.props.itemTemplate, suggestion, index) : this.props.field ? ObjectUtils.resolveFieldData(suggestion, this.props.field) : suggestion;
        return /*#__PURE__*/React.createElement("li", {
          key: index + '_item',
          role: "option",
          "aria-selected": this.props.ariaSelected === suggestion,
          className: "p-autocomplete-item",
          onClick: function onClick(e) {
            return _this2.props.onItemClick(e, suggestion);
          }
        }, itemContent, /*#__PURE__*/React.createElement(Ripple, null));
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this3 = this;

      if (this.props.suggestions) {
        return this.props.suggestions.map(function (suggestion, index) {
          return _this3.renderItem(suggestion, index);
        });
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this4 = this;

      if (this.props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions), {
          style: _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions.style), {
            height: this.props.scrollHeight
          }),
          items: this.props.suggestions,
          itemTemplate: function itemTemplate(item, options) {
            return item && _this4.renderItem(item, options.index);
          },
          contentTemplate: function contentTemplate(options) {
            var className = classNames('p-autocomplete-items', options.className);
            return /*#__PURE__*/React.createElement("ul", {
              ref: options.ref,
              className: className,
              role: "listbox",
              id: _this4.props.listId
            }, options.children);
          }
        });

        return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
          ref: this.props.virtualScrollerRef
        }, virtualScrollerProps));
      } else {
        var items = this.renderItems();
        return /*#__PURE__*/React.createElement("ul", {
          className: "p-autocomplete-items",
          role: "listbox",
          id: this.props.listId
        }, items);
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var panelClassName = classNames('p-autocomplete-panel p-component', this.props.panelClassName);

      var panelStyle = _objectSpread$1({
        maxHeight: this.props.scrollHeight
      }, this.props.panelStyle);

      var content = this.renderContent();
      return /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: this.props.forwardRef,
        classNames: "p-connected-overlay",
        in: this.props.in,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.props.onEnter,
        onEntering: this.props.onEntering,
        onEntered: this.props.onEntered,
        onExit: this.props.onExit,
        onExited: this.props.onExited
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.props.forwardRef,
        className: panelClassName,
        style: panelStyle,
        onClick: this.props.onClick
      }, content));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return /*#__PURE__*/React.createElement(Portal, {
        element: element,
        appendTo: this.props.appendTo
      });
    }
  }]);

  return AutoCompletePanelComponent;
}(Component);

var AutoCompletePanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(AutoCompletePanelComponent, _extends({
    forwardRef: ref
  }, props));
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var AutoComplete = /*#__PURE__*/function (_Component) {
  _inherits(AutoComplete, _Component);

  var _super = _createSuper(AutoComplete);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _super.call(this, props);
    _this.state = {
      id: _this.props.id,
      searching: false,
      focused: false,
      overlayVisible: false
    };
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onDropdownClick = _this.onDropdownClick.bind(_assertThisInitialized(_this));
    _this.onMultiContainerClick = _this.onMultiContainerClick.bind(_assertThisInitialized(_this));
    _this.onMultiInputFocus = _this.onMultiInputFocus.bind(_assertThisInitialized(_this));
    _this.onMultiInputBlur = _this.onMultiInputBlur.bind(_assertThisInitialized(_this));
    _this.selectItem = _this.selectItem.bind(_assertThisInitialized(_this));
    _this.getOptionGroupLabel = _this.getOptionGroupLabel.bind(_assertThisInitialized(_this));
    _this.getOptionGroupChildren = _this.getOptionGroupChildren.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntering = _this.onOverlayEntering.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.overlayRef = /*#__PURE__*/createRef();
    _this.virtualScrollerRef = /*#__PURE__*/createRef();
    _this.inputRef = /*#__PURE__*/createRef(_this.props.inputRef);
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "onInputChange",
    value: function onInputChange(event) {
      var _this2 = this;

      //Cancel the search request if user types within the timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      var query = event.target.value;

      if (!this.props.multiple) {
        this.updateModel(event, query);
      }

      if (query.length === 0) {
        this.hideOverlay();

        if (this.props.onClear) {
          this.props.onClear(event);
        }
      } else {
        if (query.length >= this.props.minLength) {
          this.timeout = setTimeout(function () {
            _this2.search(event, query, 'input');
          }, this.props.delay);
        } else {
          this.hideOverlay();
        }
      }
    }
  }, {
    key: "search",
    value: function search(event, query, source) {
      //allow empty string but not undefined or null
      if (query === undefined || query === null) {
        return;
      } //do not search blank values on input change


      if (source === 'input' && query.trim().length === 0) {
        return;
      }

      if (this.props.completeMethod) {
        this.setState({
          searching: true
        });
        this.props.completeMethod({
          originalEvent: event,
          query: query
        });
      }
    }
  }, {
    key: "selectItem",
    value: function selectItem(event, option, preventInputFocus) {
      if (this.props.multiple) {
        this.inputRef.current.value = '';

        if (!this.isSelected(option)) {
          var newValue = this.props.value ? [].concat(_toConsumableArray(this.props.value), [option]) : [option];
          this.updateModel(event, newValue);
        }
      } else {
        this.updateInputField(option);
        this.updateModel(event, option);
      }

      if (this.props.onSelect) {
        this.props.onSelect({
          originalEvent: event,
          value: option
        });
      }

      if (!preventInputFocus) {
        this.inputRef.current.focus();
        this.hideOverlay();
      }
    }
  }, {
    key: "updateModel",
    value: function updateModel(event, value) {
      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.state.id,
            value: value
          }
        });
      }

      this.ariaSelected = value;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (value) {
        if (this.props.selectedItemTemplate && (this.props.multiple ? this.isSelected(value) : this.findOptionIndex(value) > -1)) {
          var resolvedFieldData = ObjectUtils.getJSXElement(this.props.selectedItemTemplate, value);
          return resolvedFieldData ? resolvedFieldData : value;
        } else if (this.props.field) {
          var _resolvedFieldData = ObjectUtils.resolveFieldData(value, this.props.field);

          return _resolvedFieldData !== null && _resolvedFieldData !== undefined ? _resolvedFieldData : value;
        } else return value;
      } else return '';
    }
  }, {
    key: "updateInputField",
    value: function updateInputField(value) {
      var formattedValue = this.formatValue(value);
      this.inputRef.current.value = formattedValue;
    }
  }, {
    key: "showOverlay",
    value: function showOverlay() {
      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      this.setState({
        overlayVisible: false,
        searching: false
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      ZIndexUtils.set('overlay', this.overlayRef.current);
      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntering",
    value: function onOverlayEntering() {
      if (this.props.autoHighlight && this.props.suggestions && this.props.suggestions.length) {
        DomHandler.addClass(this.overlayRef.current.firstChild.firstChild, 'p-highlight');
      }
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindDocumentClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
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
      var target = this.props.multiple ? this.multiContainer : this.inputRef.current;
      DomHandler.alignOverlay(this.overlayRef.current, target, this.props.appendTo || PrimeReact.appendTo);
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
    key: "onDropdownClick",
    value: function onDropdownClick(event) {
      this.inputRef.current.focus();
      if (this.props.dropdownMode === 'blank') this.search(event, '', 'dropdown');else if (this.props.dropdownMode === 'current') this.search(event, this.inputRef.current.value, 'dropdown');

      if (this.props.onDropdownClick) {
        this.props.onDropdownClick({
          originalEvent: event,
          query: this.inputRef.current.value
        });
      }
    }
  }, {
    key: "removeItem",
    value: function removeItem(event, index) {
      var removedValue = this.props.value[index];
      var newValue = this.props.value.filter(function (val, i) {
        return index !== i;
      });
      this.updateModel(event, newValue);

      if (this.props.onUnselect) {
        this.props.onUnselect({
          originalEvent: event,
          value: removedValue
        });
      }
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      if (this.state.overlayVisible) {
        var highlightItem = DomHandler.findSingle(this.overlayRef.current, 'li.p-highlight');

        switch (event.which) {
          //down
          case 40:
            if (highlightItem) {
              var nextElement = this.findNextItem(highlightItem);

              if (nextElement) {
                DomHandler.addClass(nextElement, 'p-highlight');
                DomHandler.removeClass(highlightItem, 'p-highlight');
                DomHandler.scrollInView(this.overlayRef.current, nextElement);
              }
            } else {
              highlightItem = DomHandler.findSingle(this.overlayRef.current, 'li');

              if (DomHandler.hasClass(highlightItem, 'p-autocomplete-item-group')) {
                highlightItem = this.findNextItem(highlightItem);
              }

              if (highlightItem) {
                DomHandler.addClass(highlightItem, 'p-highlight');
              }
            }

            event.preventDefault();
            break;
          //up

          case 38:
            if (highlightItem) {
              var previousElement = this.findPrevItem(highlightItem);

              if (previousElement) {
                DomHandler.addClass(previousElement, 'p-highlight');
                DomHandler.removeClass(highlightItem, 'p-highlight');
                DomHandler.scrollInView(this.overlayRef.current, previousElement);
              }
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            if (highlightItem) {
              this.selectHighlightItem(event, highlightItem);
              this.hideOverlay();
            }

            event.preventDefault();
            break;
          //escape

          case 27:
            this.hideOverlay();
            event.preventDefault();
            break;
          //tab

          case 9:
            if (highlightItem) {
              this.selectHighlightItem(event, highlightItem);
            }

            this.hideOverlay();
            break;
        }
      }

      if (this.props.multiple) {
        switch (event.which) {
          //backspace
          case 8:
            if (this.props.value && this.props.value.length && !this.inputRef.current.value) {
              var removedValue = this.props.value[this.props.value.length - 1];
              var newValue = this.props.value.slice(0, -1);
              this.updateModel(event, newValue);

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  value: removedValue
                });
              }
            }

            break;
        }
      }
    }
  }, {
    key: "selectHighlightItem",
    value: function selectHighlightItem(event, item) {
      if (this.props.optionGroupLabel) {
        var optionGroup = this.props.suggestions[item.dataset.group];
        this.selectItem(event, this.getOptionGroupChildren(optionGroup)[item.dataset.index]);
      } else {
        this.selectItem(event, this.props.suggestions[DomHandler.index(item)]);
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? DomHandler.hasClass(nextItem, 'p-autocomplete-item-group') ? this.findNextItem(nextItem) : nextItem : null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? DomHandler.hasClass(prevItem, 'p-autocomplete-item-group') ? this.findPrevItem(prevItem) : prevItem : null;
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this3.props.onFocus) {
          _this3.props.onFocus(event);
        }
      });
    }
  }, {
    key: "forceItemSelection",
    value: function forceItemSelection(event) {
      var valid = false;
      var inputValue = event.target.value.trim();

      if (this.props.suggestions) {
        var _iterator = _createForOfIteratorHelper(this.props.suggestions),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var itemValue = this.props.field ? ObjectUtils.resolveFieldData(item, this.props.field) : item;

            if (itemValue && inputValue === itemValue.trim()) {
              valid = true;
              this.selectItem(event, item, true);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (!valid) {
        this.inputRef.current.value = '';
        this.updateModel(event, null);

        if (this.props.onClear) {
          this.props.onClear(event);
        }
      }
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(event) {
      var _this4 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this4.props.forceSelection) {
          _this4.forceItemSelection(event);
        }

        if (_this4.props.onBlur) {
          _this4.props.onBlur(event);
        }
      });
    }
  }, {
    key: "onMultiContainerClick",
    value: function onMultiContainerClick(event) {
      this.inputRef.current.focus();

      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }, {
    key: "onMultiInputFocus",
    value: function onMultiInputFocus(event) {
      this.onInputFocus(event);
      DomHandler.addClass(this.multiContainer, 'p-focus');
    }
  }, {
    key: "onMultiInputBlur",
    value: function onMultiInputBlur(event) {
      this.onInputBlur(event);
      DomHandler.removeClass(this.multiContainer, 'p-focus');
    }
  }, {
    key: "isSelected",
    value: function isSelected(val) {
      var selected = false;

      if (this.props.value && this.props.value.length) {
        for (var i = 0; i < this.props.value.length; i++) {
          if (ObjectUtils.equals(this.props.value[i], val)) {
            selected = true;
            break;
          }
        }
      }

      return selected;
    }
  }, {
    key: "findOptionIndex",
    value: function findOptionIndex(option) {
      var index = -1;

      if (this.props.suggestions) {
        for (var i = 0; i < this.props.suggestions.length; i++) {
          if (ObjectUtils.equals(option, this.props.suggestions[i])) {
            index = i;
            break;
          }
        }
      }

      return index;
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return this.props.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel) : optionGroup;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren);
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this5 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (event.which === 3) {
            // right click
            return;
          }

          if (_this5.state.overlayVisible && _this5.isOutsideClicked(event)) {
            _this5.hideOverlay();
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this6 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.container, function () {
          if (_this6.state.overlayVisible) {
            _this6.hideOverlay();
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
      var _this7 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this7.state.overlayVisible && !DomHandler.isAndroid()) {
            _this7.hideOverlay();
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
      return this.container && this.overlayRef && this.overlayRef.current && !this.overlayRef.current.contains(event.target) && !this.isInputClicked(event);
    }
  }, {
    key: "isInputClicked",
    value: function isInputClicked(event) {
      if (this.props.multiple) return event.target === this.multiContainer || this.multiContainer.contains(event.target);else return event.target === this.inputRef.current;
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

      if (!this.state.id) {
        this.setState({
          id: UniqueComponentId()
        });
      }

      if (this.props.autoFocus && this.inputRef && this.inputRef.current) {
        this.inputRef.current.focus();
      }

      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.suggestions !== this.props.suggestions && this.state.searching) {
        if (this.props.suggestions && this.props.suggestions.length) {
          this.showOverlay();
        } else {
          this.hideOverlay();
        }

        this.setState({
          searching: false
        });
      }

      if (this.inputRef && this.inputRef.current && !this.props.multiple) {
        this.updateInputField(this.props.value);
      }

      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = tip({
        target: this.container,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderSimpleAutoComplete",
    value: function renderSimpleAutoComplete() {
      var inputClassName = classNames('p-autocomplete-input', this.props.inputClassName, {
        'p-autocomplete-dd-input': this.props.dropdown
      });
      return /*#__PURE__*/React.createElement(InputText, {
        ref: this.inputRef,
        id: this.props.inputId,
        type: this.props.type,
        name: this.props.name,
        defaultValue: this.formatValue(this.props.value),
        role: "searchbox",
        "aria-autocomplete": "list",
        "aria-controls": this.state.id + '_list',
        "aria-labelledby": this.props.ariaLabelledBy,
        className: inputClassName,
        style: this.props.inputStyle,
        autoComplete: "off",
        readOnly: this.props.readOnly,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        size: this.props.size,
        maxLength: this.props.maxlength,
        tabIndex: this.props.tabIndex,
        onBlur: this.onInputBlur,
        onFocus: this.onInputFocus,
        onChange: this.onInputChange,
        onMouseDown: this.props.onMouseDown,
        onKeyUp: this.props.onKeyUp,
        onKeyDown: this.onInputKeyDown,
        onKeyPress: this.props.onKeyPress,
        onContextMenu: this.props.onContextMenu,
        onClick: this.props.onClick,
        onDoubleClick: this.props.onDblClick
      });
    }
  }, {
    key: "renderChips",
    value: function renderChips() {
      var _this8 = this;

      if (this.props.value && this.props.value.length) {
        return this.props.value.map(function (val, index) {
          return /*#__PURE__*/React.createElement("li", {
            key: index + 'multi-item',
            className: "p-autocomplete-token p-highlight"
          }, /*#__PURE__*/React.createElement("span", {
            className: "p-autocomplete-token-label"
          }, _this8.formatValue(val)), !_this8.props.disabled && /*#__PURE__*/React.createElement("span", {
            className: "p-autocomplete-token-icon pi pi-times-circle",
            onClick: function onClick(e) {
              return _this8.removeItem(e, index);
            }
          }));
        });
      }

      return null;
    }
  }, {
    key: "renderMultiInput",
    value: function renderMultiInput() {
      return /*#__PURE__*/React.createElement("li", {
        className: "p-autocomplete-input-token"
      }, /*#__PURE__*/React.createElement("input", {
        ref: this.inputRef,
        type: this.props.type,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        role: "searchbox",
        "aria-autocomplete": "list",
        "aria-controls": this.state.id + '_list',
        "aria-labelledby": this.props.ariaLabelledBy,
        autoComplete: "off",
        tabIndex: this.props.tabIndex,
        onChange: this.onInputChange,
        id: this.props.inputId,
        name: this.props.name,
        style: this.props.inputStyle,
        className: this.props.inputClassName,
        maxLength: this.props.maxlength,
        onKeyUp: this.props.onKeyUp,
        onKeyDown: this.onInputKeyDown,
        onKeyPress: this.props.onKeyPress,
        onFocus: this.onMultiInputFocus,
        onBlur: this.onMultiInputBlur
      }));
    }
  }, {
    key: "renderMultipleAutoComplete",
    value: function renderMultipleAutoComplete() {
      var _this9 = this;

      var multiContainerClass = classNames('p-autocomplete-multiple-container p-component p-inputtext', {
        'p-disabled': this.props.disabled
      });
      var tokens = this.renderChips();
      var input = this.renderMultiInput();
      return /*#__PURE__*/React.createElement("ul", {
        ref: function ref(el) {
          _this9.multiContainer = el;
        },
        className: multiContainerClass,
        onContextMenu: this.props.onContextMenu,
        onMouseDown: this.props.onMouseDown,
        onClick: this.onMultiContainerClick,
        onDoubleClick: this.props.onDblClick
      }, tokens, input);
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown() {
      var _this10 = this;

      return /*#__PURE__*/React.createElement(Button, {
        ref: function ref(el) {
          return _this10.dropdownButton = el;
        },
        type: "button",
        icon: this.props.dropdownIcon,
        className: "p-autocomplete-dropdown",
        disabled: this.props.disabled,
        onClick: this.onDropdownClick
      });
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      if (this.state.searching) {
        return /*#__PURE__*/React.createElement("i", {
          className: "p-autocomplete-loader pi pi-spinner pi-spin"
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      var input, dropdown;
      var className = classNames('p-autocomplete p-component p-inputwrapper', this.props.className, {
        'p-autocomplete-dd': this.props.dropdown,
        'p-autocomplete-multiple': this.props.multiple,
        'p-inputwrapper-filled': this.props.value,
        'p-inputwrapper-focus': this.state.focused
      });
      var loader = this.renderLoader();
      if (this.props.multiple) input = this.renderMultipleAutoComplete();else input = this.renderSimpleAutoComplete();

      if (this.props.dropdown) {
        dropdown = this.renderDropdown();
      }

      return /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this11.container = el;
        },
        id: this.state.id,
        style: this.props.style,
        className: className,
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible,
        "aria-owns": this.state.id + '_list'
      }, input, loader, dropdown, /*#__PURE__*/React.createElement(AutoCompletePanel, _extends({
        ref: this.overlayRef,
        virtualScrollerRef: this.virtualScrollerRef
      }, this.props, {
        listId: this.state.id + '_list',
        onItemClick: this.selectItem,
        ariaSelected: this.ariaSelected,
        onClick: this.onPanelClick,
        getOptionGroupLabel: this.getOptionGroupLabel,
        getOptionGroupChildren: this.getOptionGroupChildren,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntering: this.onOverlayEntering,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      })));
    }
  }]);

  return AutoComplete;
}(Component);

_defineProperty(AutoComplete, "defaultProps", {
  id: null,
  inputRef: null,
  value: null,
  name: null,
  type: 'text',
  suggestions: null,
  field: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  optionGroupTemplate: null,
  forceSelection: false,
  autoHighlight: false,
  virtualScrollerOptions: null,
  scrollHeight: '200px',
  dropdown: false,
  dropdownMode: 'blank',
  multiple: false,
  minLength: 1,
  delay: 300,
  style: null,
  className: null,
  inputId: null,
  inputStyle: null,
  inputClassName: null,
  panelClassName: null,
  panelStyle: null,
  placeholder: null,
  readOnly: false,
  disabled: false,
  maxlength: null,
  size: null,
  appendTo: null,
  tabIndex: null,
  autoFocus: false,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  completeMethod: null,
  itemTemplate: null,
  selectedItemTemplate: null,
  transitionOptions: null,
  dropdownIcon: 'pi pi-chevron-down',
  onChange: null,
  onFocus: null,
  onBlur: null,
  onSelect: null,
  onUnselect: null,
  onDropdownClick: null,
  onClick: null,
  onDblClick: null,
  onMouseDown: null,
  onKeyUp: null,
  onKeyPress: null,
  onContextMenu: null,
  onClear: null,
  onShow: null,
  onHide: null
});

export { AutoComplete };
