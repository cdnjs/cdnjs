'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var InputTextareaComponent = /*#__PURE__*/function (_Component) {
  _inherits(InputTextareaComponent, _Component);

  var _super = _createSuper$1(InputTextareaComponent);

  function InputTextareaComponent(props) {
    var _this;

    _classCallCheck(this, InputTextareaComponent);

    _this = _super.call(this, props);
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyUp = _this.onKeyUp.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.elementRef = /*#__PURE__*/React.createRef(_this.props.forwardRef);
    return _this;
  }

  _createClass(InputTextareaComponent, [{
    key: "onFocus",
    value: function onFocus(e) {
      if (this.props.autoResize) {
        this.resize();
      }

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      if (this.props.autoResize) {
        this.resize();
      }

      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      if (this.props.autoResize) {
        this.resize();
      }

      if (this.props.onKeyUp) {
        this.props.onKeyUp(e);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      if (this.props.autoResize) {
        this.resize();
      }

      if (e.target.value.length > 0) core.DomHandler.addClass(e.target, 'p-filled');else core.DomHandler.removeClass(e.target, 'p-filled');

      if (this.props.onInput) {
        this.props.onInput(e);
      }
    }
  }, {
    key: "resize",
    value: function resize(initial) {
      var inputEl = this.elementRef && this.elementRef.current;

      if (inputEl && core.DomHandler.isVisible(inputEl)) {
        if (!this.cachedScrollHeight) {
          this.cachedScrollHeight = inputEl.scrollHeight;
          inputEl.style.overflow = "hidden";
        }

        if (this.cachedScrollHeight !== inputEl.scrollHeight || initial) {
          inputEl.style.height = '';
          inputEl.style.height = inputEl.scrollHeight + 'px';

          if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
            inputEl.style.overflowY = "scroll";
            inputEl.style.height = inputEl.style.maxHeight;
          } else {
            inputEl.style.overflow = "hidden";
          }

          this.cachedScrollHeight = inputEl.scrollHeight;
        }
      }
    }
  }, {
    key: "isFilled",
    value: function isFilled() {
      return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0 || this.elementRef && this.elementRef.current && this.elementRef.current.value.toString().length > 0;
    }
  }, {
    key: "updateForwardRef",
    value: function updateForwardRef() {
      var ref = this.props.forwardRef;

      if (ref) {
        if (typeof ref === 'function') {
          ref(this.elementRef.current);
        } else {
          ref.current = this.elementRef.current;
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateForwardRef();

      if (this.props.tooltip) {
        this.renderTooltip();
      }

      if (this.props.autoResize) {
        this.resize(true);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread$1({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }

      if (this.props.autoResize) {
        this.resize(true);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = core.tip({
        target: this.elementRef.current,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = core.classNames('p-inputtextarea p-inputtext p-component', {
        'p-disabled': this.props.disabled,
        'p-filled': this.isFilled(),
        'p-inputtextarea-resizable': this.props.autoResize
      }, this.props.className);
      var textareaProps = core.ObjectUtils.findDiffKeys(this.props, InputTextareaComponent.defaultProps);
      return /*#__PURE__*/React__default['default'].createElement("textarea", _extends({
        ref: this.elementRef
      }, textareaProps, {
        className: className,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyUp: this.onKeyUp,
        onInput: this.onInput
      }));
    }
  }]);

  return InputTextareaComponent;
}(React.Component);

_defineProperty(InputTextareaComponent, "defaultProps", {
  autoResize: false,
  tooltip: null,
  tooltipOptions: null,
  onInput: null,
  forwardRef: null
});

var InputTextarea = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default['default'].createElement(InputTextareaComponent, _extends({
    forwardRef: ref
  }, props));
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Mention = /*#__PURE__*/function (_Component) {
  _inherits(Mention, _Component);

  var _super = _createSuper(Mention);

  function Mention(props) {
    var _this;

    _classCallCheck(this, Mention);

    _this = _super.call(this, props);
    _this.state = {
      overlayVisible: false,
      focused: false,
      searching: false,
      trigger: null
    };
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntering = _this.onOverlayEntering.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.onKeyUp = _this.onKeyUp.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.overlayRef = /*#__PURE__*/React.createRef();
    _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
    return _this;
  }

  _createClass(Mention, [{
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
        searching: false,
        trigger: null
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      core.ZIndexUtils.set('overlay', this.overlayRef.current);
      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntering",
    value: function onOverlayEntering() {
      if (this.props.autoHighlight && this.props.suggestions && this.props.suggestions.length) {
        core.DomHandler.addClass(this.list.firstChild, 'p-highlight');
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
      core.ZIndexUtils.clear(this.overlayRef.current);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      var _this$state$trigger = this.state.trigger,
          key = _this$state$trigger.key,
          index = _this$state$trigger.index;
      var value = this.inputRef.current.value;
      var position = core.DomHandler.getCursorOffset(this.inputRef.current, value.substring(0, index - 1), value.substring(index), key);
      this.overlayRef.current.style.transformOrigin = 'top';
      this.overlayRef.current.style.left = "calc(".concat(position.left, "px + 1rem)");
      this.overlayRef.current.style.top = "calc(".concat(position.top, "px + 1.2rem)");
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      core.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "getTrigger",
    value: function getTrigger(value, key, start) {
      if (!this.state.trigger) {
        var triggerKey = Array.isArray(this.props.trigger) ? this.props.trigger.find(function (t) {
          return t === key;
        }) : this.props.trigger === key ? this.props.trigger : null;

        if (triggerKey) {
          return {
            key: triggerKey,
            index: start
          };
        }

        var latestSpaceIndex = value.substring(0, start).lastIndexOf(' ');
        var latestTrigger = this.getLatestTrigger(value, start);

        if (latestTrigger.index > latestSpaceIndex) {
          return latestTrigger;
        }
      }

      return this.state.trigger;
    }
  }, {
    key: "getLatestTrigger",
    value: function getLatestTrigger(value, start) {
      if (Array.isArray(this.props.trigger)) {
        var latestTrigger = {};
        this.props.trigger.forEach(function (t) {
          var index = value.substring(0, start).lastIndexOf(t);

          if (index !== -1 && (index > latestTrigger.index || !latestTrigger.index)) {
            latestTrigger = {
              key: t,
              index: index !== -1 ? index + 1 : -1
            };
          }
        });
        return latestTrigger;
      }

      var index = value.substring(0, start).lastIndexOf(this.props.trigger);
      return {
        key: this.props.trigger,
        index: index !== -1 ? index + 1 : -1
      };
    }
  }, {
    key: "onSearch",
    value: function onSearch(event) {
      var _this2 = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      var _event$target = event.target,
          value = _event$target.value,
          selectionStart = _event$target.selectionStart;
      var key = value.substring(selectionStart - 1, selectionStart);

      if (key === ' ') {
        this.hideOverlay();
        return;
      }

      var currentTrigger = this.getTrigger(value, key, selectionStart);

      if (currentTrigger && currentTrigger.index > -1) {
        var query = value.substring(currentTrigger.index, selectionStart);
        this.timeout = setTimeout(function () {
          _this2.search(event, query, currentTrigger);
        }, this.props.delay);
      }
    }
  }, {
    key: "search",
    value: function search(event, query, trigger) {
      if (this.props.onSearch) {
        this.setState({
          searching: true,
          trigger: trigger
        });
        this.props.onSearch({
          originalEvent: event,
          trigger: trigger.key,
          query: query
        });
      }
    }
  }, {
    key: "selectItem",
    value: function selectItem(event, suggestion) {
      var value = this.inputRef.current.value;
      var selectionStart = event.target.selectionStart;
      var trigger = this.state.trigger;
      var spaceIndex = value.indexOf(' ', trigger.index);
      var currentText = value.substring(trigger.index, spaceIndex > -1 ? spaceIndex : selectionStart);
      var selectedText = this.formatValue(suggestion).replace(/\s+/g, '');

      if (currentText.trim() !== selectedText) {
        var diff = 0;

        while (diff < selectedText.length) {
          var s_c = selectedText.charAt(diff);
          var c_c = currentText.charAt(diff);
          if (s_c === c_c || c_c === ' ') diff++;else break;
        }

        var prevText = value.substring(0, trigger.index);
        var nextText = value.substring(trigger.index + diff);
        this.inputRef.current.value = "".concat(prevText).concat(selectedText, " ").concat(nextText);
        this.props.onChange && this.props.onChange(event);
      }

      var cursorStart = trigger.index + selectedText.length + 1;
      this.inputRef.current.setSelectionRange(cursorStart, cursorStart);
      this.hideOverlay();
      this.props.onSelect && this.props.onSelect({
        originalEvent: event,
        suggestion: suggestion
      });
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      var _this3 = this;

      if (value) {
        var field = Array.isArray(this.props.field) ? this.props.field[this.props.trigger.findIndex(function (f) {
          return f === _this3.state.trigger.key;
        })] : this.props.field;
        return field ? core.ObjectUtils.resolveFieldData(value, field) : value;
      }

      return '';
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(event, suggestion) {
      this.inputRef.current.focus();
      this.selectItem(event, suggestion);
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this4 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        _this4.props.onFocus && _this4.props.onFocus(event);
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this5 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        _this5.props.onBlur && _this5.props.onBlur(event);
      });
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      this.props.onInput && this.props.onInput(event);
      if (event.target.value.length > 0) core.DomHandler.addClass(this.container, 'p-inputwrapper-filled');else core.DomHandler.removeClass(this.container, 'p-inputwrapper-filled');
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (event.which === 37 || event.which === 39) {
        this.onSearch(event);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.props.onChange && this.props.onChange(event);
      this.onSearch(event);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.state.overlayVisible) {
        var highlightItem = core.DomHandler.findSingle(this.overlayRef.current, 'li.p-highlight');

        switch (event.which) {
          //down
          case 40:
            if (highlightItem) {
              var nextElement = highlightItem.nextElementSibling;

              if (nextElement) {
                core.DomHandler.addClass(nextElement, 'p-highlight');
                core.DomHandler.removeClass(highlightItem, 'p-highlight');
                core.DomHandler.scrollInView(this.overlayRef.current, nextElement);
              }
            } else {
              highlightItem = core.DomHandler.findSingle(this.overlayRef.current, 'li');

              if (highlightItem) {
                core.DomHandler.addClass(highlightItem, 'p-highlight');
              }
            }

            event.preventDefault();
            break;
          //up

          case 38:
            if (highlightItem) {
              var previousElement = highlightItem.previousElementSibling;

              if (previousElement) {
                core.DomHandler.addClass(previousElement, 'p-highlight');
                core.DomHandler.removeClass(highlightItem, 'p-highlight');
                core.DomHandler.scrollInView(this.overlayRef.current, previousElement);
              }
            }

            event.preventDefault();
            break;
          //backspace

          case 8:
            var _event$target2 = event.target,
                value = _event$target2.value,
                selectionStart = _event$target2.selectionStart;
            var key = value.substring(selectionStart - 1, selectionStart);

            if (key === this.state.trigger.key) {
              this.hideOverlay();
            }

            break;
          //enter

          case 13:
            if (highlightItem) {
              this.selectItem(event, this.props.suggestions[core.DomHandler.index(highlightItem)]);
            }

            event.preventDefault();
            break;
          //escape

          case 27:
            this.hideOverlay();
            event.preventDefault();
            break;
        }
      }
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this6 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (event.which === 3) {
            // right click
            return;
          }

          if (_this6.state.overlayVisible && _this6.isOutsideClicked(event)) {
            _this6.hideOverlay();
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
      var _this7 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.container, function () {
          if (_this7.state.overlayVisible) {
            _this7.hideOverlay();
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
      var _this8 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this8.state.overlayVisible && !core.DomHandler.isAndroid()) {
            _this8.hideOverlay();
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
      return this.container && this.overlayRef && this.overlayRef.current && !this.overlayRef.current.contains(event.target);
    }
  }, {
    key: "isFilled",
    value: function isFilled() {
      return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0 || this.inputRef && this.inputRef.current && this.inputRef.current.value.toString().length > 0;
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
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.suggestions !== this.props.suggestions && this.state.searching) {
        this.props.suggestions && this.props.suggestions.length ? this.showOverlay() : this.hideOverlay();

        if (this.state.overlayVisible) {
          this.alignOverlay();
        }

        this.setState({
          searching: false
        });
      }

      if (!this.isFilled() && core.DomHandler.hasClass(this.container, 'p-inputwrapper-filled')) {
        core.DomHandler.removeClass(this.container, 'p-inputwrapper-filled');
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

      core.ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "renderItem",
    value: function renderItem(suggestion, index) {
      var _this9 = this;

      var content = this.props.itemTemplate ? core.ObjectUtils.getJSXElement(this.props.itemTemplate, suggestion, {
        trigger: this.state.trigger ? this.state.trigger.key : '',
        index: index
      }) : this.formatValue(suggestion);
      return /*#__PURE__*/React__default['default'].createElement("li", {
        key: index + '_item',
        className: "p-mention-item",
        onClick: function onClick(e) {
          return _this9.onItemClick(e, suggestion);
        }
      }, content, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this10 = this;

      if (this.props.suggestions) {
        var items = this.props.suggestions.map(function (suggestion, index) {
          return _this10.renderItem(suggestion, index);
        });
        return /*#__PURE__*/React__default['default'].createElement("ul", {
          ref: function ref(el) {
            return _this10.list = el;
          },
          className: "p-mention-items"
        }, items);
      }

      return null;
    }
  }, {
    key: "renderPanel",
    value: function renderPanel() {
      var panelClassName = core.classNames('p-mention-panel p-component', this.props.panelClassName);

      var panelStyle = _objectSpread({
        maxHeight: this.props.scrollHeight
      }, this.props.panelStyle);

      var header = core.ObjectUtils.getJSXElement(this.props.headerTemplate, this.props);
      var footer = core.ObjectUtils.getJSXElement(this.props.footerTemplate, this.props);
      var list = this.renderList();
      var panel = /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
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
        onEntering: this.onOverlayEntering,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.overlayRef,
        className: panelClassName,
        style: panelStyle,
        onClick: this.onPanelClick
      }, header, list, footer));
      return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
        element: panel,
        appendTo: "self"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      var containerClassName = core.classNames('p-mention p-component p-inputwrapper', {
        'p-inputwrapper-filled': this.isFilled(),
        'p-inputwrapper-focus': this.state.focused
      }, this.props.className);
      var inputClassName = core.classNames('p-mention-input', this.props.inputClassName);
      var inputProps = core.ObjectUtils.findDiffKeys(this.props, Mention.defaultProps);
      var panel = this.renderPanel();
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this11.container = el;
        },
        id: this.props.id,
        className: containerClassName,
        style: this.props.style
      }, /*#__PURE__*/React__default['default'].createElement(InputTextarea, _extends({
        ref: this.inputRef,
        id: this.props.inputId
      }, inputProps, {
        className: inputClassName,
        style: this.props.inputStyle,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onInput: this.onInput,
        onKeyUp: this.onKeyUp,
        onChange: this.onChange
      })), panel);
    }
  }]);

  return Mention;
}(React.Component);

_defineProperty(Mention, "defaultProps", {
  id: null,
  inputId: null,
  inputRef: null,
  style: null,
  className: null,
  trigger: '@',
  suggestions: null,
  field: null,
  inputStyle: null,
  inputClassName: null,
  panelClassName: null,
  panelStyle: null,
  scrollHeight: '200px',
  autoHighlight: true,
  delay: 0,
  headerTemplate: null,
  footerTemplate: null,
  itemTemplate: null,
  transitionOptions: null,
  onChange: null,
  onInput: null,
  onSearch: null,
  onSelect: null,
  onFocus: null,
  onBlur: null,
  onShow: null,
  onHide: null
});

exports.Mention = Mention;
