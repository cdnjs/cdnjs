this.primereact = this.primereact || {};
this.primereact.dropdown = (function (exports, React, core, virtualscroller, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var DropdownItem = /*#__PURE__*/function (_Component) {
    _inherits(DropdownItem, _Component);

    var _super = _createSuper$2(DropdownItem);

    function DropdownItem(props) {
      var _this;

      _classCallCheck(this, DropdownItem);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DropdownItem, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            option: this.props.option
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-dropdown-item', {
          'p-highlight': this.props.selected,
          'p-disabled': this.props.disabled,
          'p-dropdown-item-empty': !this.props.label || this.props.label.length === 0
        }, this.props.option.className);
        var content = this.props.template ? core.ObjectUtils.getJSXElement(this.props.template, this.props.option) : this.props.label;
        return /*#__PURE__*/React__default['default'].createElement("li", {
          className: className,
          onClick: this.onClick,
          "aria-label": this.props.label,
          key: this.props.label,
          role: "option",
          "aria-selected": this.props.selected
        }, content, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }
    }]);

    return DropdownItem;
  }(React.Component);

  _defineProperty(DropdownItem, "defaultProps", {
    option: null,
    label: null,
    template: null,
    selected: false,
    disabled: false,
    onClick: null
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var DropdownPanelComponent = /*#__PURE__*/function (_Component) {
    _inherits(DropdownPanelComponent, _Component);

    var _super = _createSuper$1(DropdownPanelComponent);

    function DropdownPanelComponent(props) {
      var _this;

      _classCallCheck(this, DropdownPanelComponent);

      _this = _super.call(this, props);
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DropdownPanelComponent, [{
      key: "onEnter",
      value: function onEnter() {
        var _this2 = this;

        this.props.onEnter(function () {
          if (_this2.virtualScrollerRef) {
            var selectedIndex = _this2.props.getSelectedOptionIndex();

            if (selectedIndex !== -1) {
              _this2.virtualScrollerRef.scrollToIndex(selectedIndex);
            }
          }
        });
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        var _this3 = this;

        this.props.onEntered(function () {
          if (_this3.props.filter && _this3.props.filterInputAutoFocus) {
            _this3.filterInput.focus();
          }
        });
      }
    }, {
      key: "onFilterInputChange",
      value: function onFilterInputChange(event) {
        if (this.virtualScrollerRef) {
          this.virtualScrollerRef.scrollToIndex(0);
        }

        this.props.onFilterInputChange && this.props.onFilterInputChange(event);
      }
    }, {
      key: "isEmptyFilter",
      value: function isEmptyFilter() {
        return !(this.props.visibleOptions && this.props.visibleOptions.length) && this.props.hasFilter();
      }
    }, {
      key: "renderGroupChildren",
      value: function renderGroupChildren(optionGroup) {
        var _this4 = this;

        var groupChildren = this.props.getOptionGroupChildren(optionGroup);
        return groupChildren.map(function (option, j) {
          var optionLabel = _this4.props.getOptionLabel(option);

          var optionKey = j + '_' + _this4.props.getOptionRenderKey(option);

          var disabled = _this4.props.isOptionDisabled(option);

          return /*#__PURE__*/React__default['default'].createElement(DropdownItem, {
            key: optionKey,
            label: optionLabel,
            option: option,
            template: _this4.props.itemTemplate,
            selected: _this4.props.isSelected(option),
            disabled: disabled,
            onClick: _this4.props.onOptionClick
          });
        });
      }
    }, {
      key: "renderEmptyMessage",
      value: function renderEmptyMessage(emptyMessage) {
        var message = core.ObjectUtils.getJSXElement(emptyMessage, this.props);
        return /*#__PURE__*/React__default['default'].createElement("li", {
          className: "p-dropdown-empty-message"
        }, message);
      }
    }, {
      key: "renderItem",
      value: function renderItem(option, index) {
        if (this.props.optionGroupLabel) {
          var groupContent = this.props.optionGroupTemplate ? core.ObjectUtils.getJSXElement(this.props.optionGroupTemplate, option, index) : this.props.getOptionGroupLabel(option);
          var groupChildrenContent = this.renderGroupChildren(option);
          var key = index + '_' + this.props.getOptionGroupRenderKey(option);
          return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
            key: key
          }, /*#__PURE__*/React__default['default'].createElement("li", {
            className: "p-dropdown-item-group"
          }, groupContent), groupChildrenContent);
        } else {
          var optionLabel = this.props.getOptionLabel(option);
          var optionKey = index + '_' + this.props.getOptionRenderKey(option);
          var disabled = this.props.isOptionDisabled(option);
          return /*#__PURE__*/React__default['default'].createElement(DropdownItem, {
            key: optionKey,
            label: optionLabel,
            option: option,
            template: this.props.itemTemplate,
            selected: this.props.isSelected(option),
            disabled: disabled,
            onClick: this.props.onOptionClick
          });
        }
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this5 = this;

        if (this.props.visibleOptions && this.props.visibleOptions.length) {
          return this.props.visibleOptions.map(function (option, index) {
            return _this5.renderItem(option, index);
          });
        } else if (this.props.hasFilter()) {
          return this.renderEmptyMessage(this.props.emptyFilterMessage);
        }

        return this.renderEmptyMessage(this.props.emptyMessage);
      }
    }, {
      key: "renderFilterClearIcon",
      value: function renderFilterClearIcon() {
        var _this6 = this;

        if (this.props.showFilterClear && this.props.filterValue) {
          return /*#__PURE__*/React__default['default'].createElement("i", {
            className: "p-dropdown-filter-clear-icon pi pi-times",
            onClick: function onClick() {
              return _this6.props.onFilterClearIconClick(function () {
                return _this6.filterInput.focus();
              });
            }
          });
        }

        return null;
      }
    }, {
      key: "renderFilter",
      value: function renderFilter() {
        var _this7 = this;

        if (this.props.filter) {
          var clearIcon = this.renderFilterClearIcon();
          var containerClassName = core.classNames('p-dropdown-filter-container', {
            'p-dropdown-clearable-filter': !!clearIcon
          });
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-dropdown-header"
          }, /*#__PURE__*/React__default['default'].createElement("div", {
            className: containerClassName
          }, /*#__PURE__*/React__default['default'].createElement("input", {
            ref: function ref(el) {
              return _this7.filterInput = el;
            },
            type: "text",
            autoComplete: "off",
            className: "p-dropdown-filter p-inputtext p-component",
            placeholder: this.props.filterPlaceholder,
            onKeyDown: this.props.onFilterInputKeyDown,
            onChange: this.onFilterInputChange,
            value: this.props.filterValue
          }), clearIcon, /*#__PURE__*/React__default['default'].createElement("i", {
            className: "p-dropdown-filter-icon pi pi-search"
          })));
        }

        return null;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this8 = this;

        if (this.props.virtualScrollerOptions) {
          var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions), {
            style: _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions.style), {
              height: this.props.scrollHeight
            }),
            className: core.classNames('p-dropdown-items-wrapper', this.props.virtualScrollerOptions.className),
            items: this.props.visibleOptions,
            onLazyLoad: function onLazyLoad(event) {
              return _this8.props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
                filter: _this8.props.filterValue
              }));
            },
            itemTemplate: function itemTemplate(item, options) {
              return item && _this8.renderItem(item, options.index);
            },
            contentTemplate: function contentTemplate(options) {
              var className = core.classNames('p-dropdown-items', options.className);
              var content = _this8.isEmptyFilter() ? _this8.renderEmptyMessage() : options.children;
              return /*#__PURE__*/React__default['default'].createElement("ul", {
                ref: options.ref,
                className: className,
                role: "listbox"
              }, content);
            }
          });

          return /*#__PURE__*/React__default['default'].createElement(virtualscroller.VirtualScroller, _extends({
            ref: function ref(el) {
              return _this8.virtualScrollerRef = el;
            }
          }, virtualScrollerProps));
        } else {
          var items = this.renderItems();
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-dropdown-items-wrapper",
            style: {
              maxHeight: this.props.scrollHeight || 'auto'
            }
          }, /*#__PURE__*/React__default['default'].createElement("ul", {
            className: "p-dropdown-items",
            role: "listbox"
          }, items));
        }
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var className = core.classNames('p-dropdown-panel p-component', this.props.panelClassName);
        var filter = this.renderFilter();
        var content = this.renderContent();
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.props.forwardRef,
          classNames: "p-connected-overlay",
          in: this.props.in,
          timeout: {
            enter: 120,
            exit: 100
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntering: this.props.onEntering,
          onEntered: this.onEntered,
          onExit: this.props.onExit,
          onExited: this.props.onExited
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: this.props.forwardRef,
          className: className,
          style: this.props.panelStyle,
          onClick: this.props.onClick
        }, filter, content));
      }
    }, {
      key: "render",
      value: function render() {
        var element = this.renderElement();
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: element,
          appendTo: this.props.appendTo
        });
      }
    }]);

    return DropdownPanelComponent;
  }(React.Component);

  var DropdownPanel = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(DropdownPanelComponent, _extends({
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
  var Dropdown = /*#__PURE__*/function (_Component) {
    _inherits(Dropdown, _Component);

    var _super = _createSuper(Dropdown);

    function Dropdown(props) {
      var _this;

      _classCallCheck(this, Dropdown);

      _this = _super.call(this, props);
      _this.state = {
        filter: '',
        focused: false,
        overlayVisible: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
      _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
      _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
      _this.onEditableInputChange = _this.onEditableInputChange.bind(_assertThisInitialized(_this));
      _this.onEditableInputFocus = _this.onEditableInputFocus.bind(_assertThisInitialized(_this));
      _this.onOptionClick = _this.onOptionClick.bind(_assertThisInitialized(_this));
      _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
      _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
      _this.onFilterClearIconClick = _this.onFilterClearIconClick.bind(_assertThisInitialized(_this));
      _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
      _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
      _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
      _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
      _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
      _this.resetFilter = _this.resetFilter.bind(_assertThisInitialized(_this));
      _this.clear = _this.clear.bind(_assertThisInitialized(_this));
      _this.hasFilter = _this.hasFilter.bind(_assertThisInitialized(_this));
      _this.getOptionLabel = _this.getOptionLabel.bind(_assertThisInitialized(_this));
      _this.getOptionRenderKey = _this.getOptionRenderKey.bind(_assertThisInitialized(_this));
      _this.isOptionDisabled = _this.isOptionDisabled.bind(_assertThisInitialized(_this));
      _this.getOptionGroupChildren = _this.getOptionGroupChildren.bind(_assertThisInitialized(_this));
      _this.getOptionGroupLabel = _this.getOptionGroupLabel.bind(_assertThisInitialized(_this));
      _this.getOptionGroupRenderKey = _this.getOptionGroupRenderKey.bind(_assertThisInitialized(_this));
      _this.getSelectedOptionIndex = _this.getSelectedOptionIndex.bind(_assertThisInitialized(_this));
      _this.isSelected = _this.isSelected.bind(_assertThisInitialized(_this));
      _this.overlayRef = /*#__PURE__*/React.createRef();
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(Dropdown, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.disabled) {
          return;
        }

        if (core.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
          return;
        } else if (!this.overlayRef.current || !(this.overlayRef.current && this.overlayRef.current.contains(event.target))) {
          this.focusInput.focus();

          if (this.state.overlayVisible) {
            this.hideOverlay();
          } else {
            this.showOverlay();
          }
        }
      }
    }, {
      key: "onInputFocus",
      value: function onInputFocus(event) {
        var _this2 = this;

        event.persist();

        if (this.props.showOnFocus && !this.state.overlayVisible) {
          this.showOverlay();
        }

        this.setState({
          focused: true
        }, function () {
          if (_this2.props.onFocus) {
            _this2.props.onFocus(event);
          }
        });
      }
    }, {
      key: "onInputBlur",
      value: function onInputBlur(event) {
        var _this3 = this;

        event.persist();
        this.setState({
          focused: false
        }, function () {
          if (_this3.props.onBlur) {
            _this3.props.onBlur(event);
          }
        });
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
      key: "onInputKeyDown",
      value: function onInputKeyDown(event) {
        switch (event.which) {
          //down
          case 40:
            this.onDownKey(event);
            break;
          //up

          case 38:
            this.onUpKey(event);
            break;
          //space

          case 32:
            if (this.state.overlayVisible) this.hideOverlay();else this.showOverlay();
            event.preventDefault();
            break;
          //enter

          case 13:
            this.hideOverlay();
            event.preventDefault();
            break;
          //escape and tab

          case 27:
          case 9:
            this.hideOverlay();
            break;

          default:
            this.search(event);
            break;
        }
      }
    }, {
      key: "onFilterInputKeyDown",
      value: function onFilterInputKeyDown(event) {
        switch (event.which) {
          //down
          case 40:
            this.onDownKey(event);
            break;
          //up

          case 38:
            this.onUpKey(event);
            break;
          //enter and escape

          case 13:
          case 27:
            this.hideOverlay();
            event.preventDefault();
            break;
        }
      }
    }, {
      key: "onUpKey",
      value: function onUpKey(event) {
        var visibleOptions = this.getVisibleOptions();

        if (visibleOptions) {
          var prevOption = this.findPrevOption(this.getSelectedOptionIndex());

          if (prevOption) {
            this.selectItem({
              originalEvent: event,
              option: prevOption
            });
          }
        }

        event.preventDefault();
      }
    }, {
      key: "onDownKey",
      value: function onDownKey(event) {
        var visibleOptions = this.getVisibleOptions();

        if (visibleOptions) {
          if (!this.state.overlayVisible && event.altKey) {
            this.showOverlay();
          } else {
            var nextOption = this.findNextOption(this.getSelectedOptionIndex());

            if (nextOption) {
              this.selectItem({
                originalEvent: event,
                option: nextOption
              });
            }
          }
        }

        event.preventDefault();
      }
    }, {
      key: "findNextOption",
      value: function findNextOption(index) {
        var visibleOptions = this.getVisibleOptions();

        if (this.props.optionGroupLabel) {
          var groupIndex = index === -1 ? 0 : index.group;
          var optionIndex = index === -1 ? -1 : index.option;
          var option = this.findNextOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
          if (option) return option;else if (groupIndex + 1 !== visibleOptions.length) return this.findNextOption({
            group: groupIndex + 1,
            option: -1
          });else return null;
        } else {
          return this.findNextOptionInList(visibleOptions, index);
        }
      }
    }, {
      key: "findNextOptionInList",
      value: function findNextOptionInList(list, index) {
        var i = index + 1;

        if (i === list.length) {
          return null;
        }

        var option = list[i];
        if (this.isOptionDisabled(option)) return this.findNextOptionInList(i);else return option;
      }
    }, {
      key: "findPrevOption",
      value: function findPrevOption(index) {
        if (index === -1) {
          return null;
        }

        var visibleOptions = this.getVisibleOptions();

        if (this.props.optionGroupLabel) {
          var groupIndex = index.group;
          var optionIndex = index.option;
          var option = this.findPrevOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
          if (option) return option;else if (groupIndex > 0) return this.findPrevOption({
            group: groupIndex - 1,
            option: this.getOptionGroupChildren(visibleOptions[groupIndex - 1]).length
          });else return null;
        } else {
          return this.findPrevOptionInList(visibleOptions, index);
        }
      }
    }, {
      key: "findPrevOptionInList",
      value: function findPrevOptionInList(list, index) {
        var i = index - 1;

        if (i < 0) {
          return null;
        }

        var option = list[i];
        if (this.isOptionDisabled(option)) return this.findPrevOption(i);else return option;
      }
    }, {
      key: "search",
      value: function search(event) {
        var _this4 = this;

        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }

        var char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;else this.searchValue = this.searchValue ? this.searchValue + char : char;

        if (this.searchValue) {
          var searchIndex = this.getSelectedOptionIndex();
          var newOption = this.props.optionGroupLabel ? this.searchOptionInGroup(searchIndex) : this.searchOption(++searchIndex);

          if (newOption) {
            this.selectItem({
              originalEvent: event,
              option: newOption
            });
            this.selectedOptionUpdated = true;
          }
        }

        this.searchTimeout = setTimeout(function () {
          _this4.searchValue = null;
        }, 250);
      }
    }, {
      key: "searchOption",
      value: function searchOption(index) {
        var option;

        if (this.searchValue) {
          var visibleOptions = this.getVisibleOptions();
          option = this.searchOptionInRange(index, visibleOptions.length);

          if (!option) {
            option = this.searchOptionInRange(0, index);
          }
        }

        return option;
      }
    }, {
      key: "searchOptionInRange",
      value: function searchOptionInRange(start, end) {
        var visibleOptions = this.getVisibleOptions();

        for (var i = start; i < end; i++) {
          var opt = visibleOptions[i];

          if (this.matchesSearchValue(opt)) {
            return opt;
          }
        }

        return null;
      }
    }, {
      key: "searchOptionInGroup",
      value: function searchOptionInGroup(index) {
        var searchIndex = index === -1 ? {
          group: 0,
          option: -1
        } : index;
        var visibleOptions = this.getVisibleOptions();

        for (var i = searchIndex.group; i < visibleOptions.length; i++) {
          var groupOptions = this.getOptionGroupChildren(visibleOptions[i]);

          for (var j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
            if (this.matchesSearchValue(groupOptions[j])) {
              return groupOptions[j];
            }
          }
        }

        for (var _i = 0; _i <= searchIndex.group; _i++) {
          var _groupOptions = this.getOptionGroupChildren(visibleOptions[_i]);

          for (var _j = 0; _j < (searchIndex.group === _i ? searchIndex.option : _groupOptions.length); _j++) {
            if (this.matchesSearchValue(_groupOptions[_j])) {
              return _groupOptions[_j];
            }
          }
        }

        return null;
      }
    }, {
      key: "matchesSearchValue",
      value: function matchesSearchValue(option) {
        var label = this.getOptionLabel(option).toLocaleLowerCase(this.props.filterLocale);
        return label.startsWith(this.searchValue.toLocaleLowerCase(this.props.filterLocale));
      }
    }, {
      key: "onEditableInputChange",
      value: function onEditableInputChange(event) {
        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event.originalEvent,
            value: event.target.value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: event.target.value
            }
          });
        }
      }
    }, {
      key: "onEditableInputFocus",
      value: function onEditableInputFocus(event) {
        var _this5 = this;

        event.persist();
        this.setState({
          focused: true
        }, function () {
          _this5.hideOverlay();

          if (_this5.props.onFocus) {
            _this5.props.onFocus(event);
          }
        });
      }
    }, {
      key: "onOptionClick",
      value: function onOptionClick(event) {
        var option = event.option;

        if (!option.disabled) {
          this.selectItem(event);
          this.focusInput.focus();
        }

        this.hideOverlay();
      }
    }, {
      key: "onFilterInputChange",
      value: function onFilterInputChange(event) {
        var _this6 = this;

        var filter = event.target.value;
        this.setState({
          filter: filter
        }, function () {
          if (_this6.props.onFilter) {
            _this6.props.onFilter({
              originalEvent: event,
              filter: filter
            });
          }
        });
      }
    }, {
      key: "onFilterClearIconClick",
      value: function onFilterClearIconClick(callback) {
        this.resetFilter(callback);
      }
    }, {
      key: "resetFilter",
      value: function resetFilter(callback) {
        var _this7 = this;

        var filter = '';
        this.setState({
          filter: filter
        }, function () {
          _this7.props.onFilter && _this7.props.onFilter({
            filter: filter
          });
          callback && callback();
        });
      }
    }, {
      key: "clear",
      value: function clear(event) {
        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event,
            value: undefined,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: undefined
            }
          });
        }

        this.updateEditableLabel();
      }
    }, {
      key: "selectItem",
      value: function selectItem(event) {
        var currentSelectedOption = this.getSelectedOption();

        if (currentSelectedOption !== event.option) {
          this.updateEditableLabel(event.option);
          var optionValue = this.getOptionValue(event.option);

          if (this.props.onChange) {
            this.props.onChange({
              originalEvent: event.originalEvent,
              value: optionValue,
              stopPropagation: function stopPropagation() {},
              preventDefault: function preventDefault() {},
              target: {
                name: this.props.name,
                id: this.props.id,
                value: optionValue
              }
            });
          }
        }
      }
    }, {
      key: "getSelectedOption",
      value: function getSelectedOption() {
        var index = this.getSelectedOptionIndex();
        var visibleOptions = this.getVisibleOptions();
        return index !== -1 ? this.props.optionGroupLabel ? this.getOptionGroupChildren(visibleOptions[index.group])[index.option] : visibleOptions[index] : null;
      }
    }, {
      key: "getSelectedOptionIndex",
      value: function getSelectedOptionIndex() {
        var visibleOptions = this.getVisibleOptions();

        if (this.props.value != null && visibleOptions) {
          if (this.props.optionGroupLabel) {
            for (var i = 0; i < visibleOptions.length; i++) {
              var selectedOptionIndex = this.findOptionIndexInList(this.props.value, this.getOptionGroupChildren(visibleOptions[i]));

              if (selectedOptionIndex !== -1) {
                return {
                  group: i,
                  option: selectedOptionIndex
                };
              }
            }
          } else {
            return this.findOptionIndexInList(this.props.value, visibleOptions);
          }
        }

        return -1;
      }
    }, {
      key: "findOptionIndexInList",
      value: function findOptionIndexInList(value, list) {
        var key = this.equalityKey();

        for (var i = 0; i < list.length; i++) {
          if (core.ObjectUtils.equals(value, this.getOptionValue(list[i]), key)) {
            return i;
          }
        }

        return -1;
      }
    }, {
      key: "isSelected",
      value: function isSelected(option) {
        return core.ObjectUtils.equals(this.props.value, this.getOptionValue(option), this.equalityKey());
      }
    }, {
      key: "equalityKey",
      value: function equalityKey() {
        return this.props.optionValue ? null : this.props.dataKey;
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
          overlayVisible: false
        });
      }
    }, {
      key: "onOverlayEnter",
      value: function onOverlayEnter(callback) {
        core.ZIndexUtils.set('overlay', this.overlayRef.current);
        this.alignOverlay();
        callback && callback();
      }
    }, {
      key: "onOverlayEntered",
      value: function onOverlayEntered(callback) {
        this.bindDocumentClickListener();
        this.bindScrollListener();
        this.bindResizeListener();
        callback && callback();
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
        if (this.props.filter && this.props.resetFilterOnHide) {
          this.resetFilter();
        }

        core.ZIndexUtils.clear(this.overlayRef.current);
        this.props.onHide && this.props.onHide();
      }
    }, {
      key: "alignOverlay",
      value: function alignOverlay() {
        core.DomHandler.alignOverlay(this.overlayRef.current, this.input.parentElement, this.props.appendTo || PrimeReact__default['default'].appendTo);
      }
    }, {
      key: "scrollInView",
      value: function scrollInView() {
        var highlightItem = core.DomHandler.findSingle(this.overlayRef.current, 'li.p-highlight');

        if (highlightItem) {
          highlightItem.scrollIntoView({
            block: 'nearest',
            inline: 'start'
          });
        }
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this8 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this8.state.overlayVisible && _this8.isOutsideClicked(event)) {
              _this8.hideOverlay();
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
        var _this9 = this;

        if (!this.scrollHandler) {
          this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.container, function () {
            if (_this9.state.overlayVisible) {
              _this9.hideOverlay();
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
        var _this10 = this;

        if (!this.resizeListener) {
          this.resizeListener = function () {
            if (_this10.state.overlayVisible && !core.DomHandler.isTouchDevice()) {
              _this10.hideOverlay();
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
        return this.container && !(this.container.isSameNode(event.target) || this.isClearClicked(event) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
      }
    }, {
      key: "isClearClicked",
      value: function isClearClicked(event) {
        return core.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon');
      }
    }, {
      key: "updateEditableLabel",
      value: function updateEditableLabel(option) {
        if (this.input) {
          this.input.value = option ? this.getOptionLabel(option) : this.props.value || '';
        }
      }
    }, {
      key: "hasFilter",
      value: function hasFilter() {
        return this.state.filter && this.state.filter.trim().length > 0;
      }
    }, {
      key: "getOptionLabel",
      value: function getOptionLabel(option) {
        return this.props.optionLabel ? core.ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
      }
    }, {
      key: "getOptionValue",
      value: function getOptionValue(option) {
        return this.props.optionValue ? core.ObjectUtils.resolveFieldData(option, this.props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
      }
    }, {
      key: "getOptionRenderKey",
      value: function getOptionRenderKey(option) {
        return this.props.dataKey ? core.ObjectUtils.resolveFieldData(option, this.props.dataKey) : this.getOptionLabel(option);
      }
    }, {
      key: "isOptionDisabled",
      value: function isOptionDisabled(option) {
        if (this.props.optionDisabled) {
          return core.ObjectUtils.isFunction(this.props.optionDisabled) ? this.props.optionDisabled(option) : core.ObjectUtils.resolveFieldData(option, this.props.optionDisabled);
        }

        return option && option['disabled'] !== undefined ? option['disabled'] : false;
      }
    }, {
      key: "getOptionGroupRenderKey",
      value: function getOptionGroupRenderKey(optionGroup) {
        return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
      }
    }, {
      key: "getOptionGroupLabel",
      value: function getOptionGroupLabel(optionGroup) {
        return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
      }
    }, {
      key: "getOptionGroupChildren",
      value: function getOptionGroupChildren(optionGroup) {
        return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren);
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        return this.inputRef.current.checkValidity();
      }
    }, {
      key: "getVisibleOptions",
      value: function getVisibleOptions() {
        if (this.hasFilter()) {
          var filterValue = this.state.filter.trim().toLocaleLowerCase(this.props.filterLocale);
          var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];

          if (this.props.optionGroupLabel) {
            var filteredGroups = [];

            var _iterator = _createForOfIteratorHelper(this.props.options),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var optgroup = _step.value;
                var filteredSubOptions = core.FilterUtils.filter(this.getOptionGroupChildren(optgroup), searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);

                if (filteredSubOptions && filteredSubOptions.length) {
                  filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                    items: filteredSubOptions
                  }));
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return filteredGroups;
          } else {
            return core.FilterUtils.filter(this.props.options, searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);
          }
        } else {
          return this.props.options;
        }
      }
    }, {
      key: "updateInputField",
      value: function updateInputField() {
        if (this.props.editable && this.input) {
          var selectedOption = this.getSelectedOption();
          var label = selectedOption ? this.getOptionLabel(selectedOption) : null;
          var value = label || this.props.value || '';
          this.input.value = value;
        }
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

        if (this.props.autoFocus && this.focusInput) {
          this.focusInput.focus();
        }

        if (this.props.tooltip) {
          this.renderTooltip();
        }

        this.updateInputField();
        this.inputRef.current.selectedIndex = 1;
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

        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }

        core.ZIndexUtils.clear(this.overlayRef.current);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.state.overlayVisible) {
          if (this.props.filter) {
            this.alignOverlay();
          }

          if (prevProps.value !== this.props.value) {
            this.scrollInView();
          }
        }

        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }

        if (this.state.filter && (!this.props.options || this.props.options.length === 0)) {
          this.setState({
            filter: ''
          });
        }

        this.updateInputField();
        this.inputRef.current.selectedIndex = 1;
      }
    }, {
      key: "renderHiddenSelect",
      value: function renderHiddenSelect(selectedOption) {
        var placeHolderOption = /*#__PURE__*/React__default['default'].createElement("option", {
          value: ""
        }, this.props.placeholder);
        var option = selectedOption ? /*#__PURE__*/React__default['default'].createElement("option", {
          value: selectedOption.value
        }, this.getOptionLabel(selectedOption)) : null;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-hidden-accessible p-dropdown-hidden-select"
        }, /*#__PURE__*/React__default['default'].createElement("select", {
          ref: this.inputRef,
          required: this.props.required,
          name: this.props.name,
          tabIndex: -1,
          "aria-hidden": "true"
        }, placeHolderOption, option));
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = core.tip({
          target: this.container,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderKeyboardHelper",
      value: function renderKeyboardHelper() {
        var _this11 = this;

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default['default'].createElement("input", {
          ref: function ref(el) {
            return _this11.focusInput = el;
          },
          id: this.props.inputId,
          type: "text",
          readOnly: true,
          "aria-haspopup": "listbox",
          onFocus: this.onInputFocus,
          onBlur: this.onInputBlur,
          onKeyDown: this.onInputKeyDown,
          disabled: this.props.disabled,
          tabIndex: this.props.tabIndex,
          "aria-label": this.props.ariaLabel,
          "aria-labelledby": this.props.ariaLabelledBy
        }));
      }
    }, {
      key: "renderLabel",
      value: function renderLabel(selectedOption) {
        var _this12 = this;

        var label = selectedOption ? this.getOptionLabel(selectedOption) : null;

        if (this.props.editable) {
          var value = label || this.props.value || '';
          return /*#__PURE__*/React__default['default'].createElement("input", {
            ref: function ref(el) {
              return _this12.input = el;
            },
            type: "text",
            defaultValue: value,
            className: "p-dropdown-label p-inputtext",
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            onInput: this.onEditableInputChange,
            onFocus: this.onEditableInputFocus,
            onBlur: this.onInputBlur,
            "aria-label": this.props.ariaLabel,
            "aria-labelledby": this.props.ariaLabelledBy,
            "aria-haspopup": "listbox"
          });
        } else {
          var className = core.classNames('p-dropdown-label p-inputtext', {
            'p-placeholder': label === null && this.props.placeholder,
            'p-dropdown-label-empty': label === null && !this.props.placeholder
          });
          var content = this.props.valueTemplate ? core.ObjectUtils.getJSXElement(this.props.valueTemplate, selectedOption, this.props) : label || this.props.placeholder || 'empty';
          return /*#__PURE__*/React__default['default'].createElement("span", {
            ref: function ref(el) {
              return _this12.input = el;
            },
            className: className
          }, content);
        }
      }
    }, {
      key: "renderClearIcon",
      value: function renderClearIcon() {
        if (this.props.value != null && this.props.showClear && !this.props.disabled) {
          return /*#__PURE__*/React__default['default'].createElement("i", {
            className: "p-dropdown-clear-icon pi pi-times",
            onClick: this.clear
          });
        }

        return null;
      }
    }, {
      key: "renderDropdownIcon",
      value: function renderDropdownIcon() {
        var _this13 = this;

        var iconClassName = core.classNames('p-dropdown-trigger-icon p-clickable', this.props.dropdownIcon);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this13.trigger = el;
          },
          className: "p-dropdown-trigger",
          role: "button",
          "aria-haspopup": "listbox",
          "aria-expanded": this.state.overlayVisible
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var _this14 = this;

        var className = core.classNames('p-dropdown p-component p-inputwrapper', this.props.className, {
          'p-disabled': this.props.disabled,
          'p-focus': this.state.focused,
          'p-dropdown-clearable': this.props.showClear && !this.props.disabled,
          'p-inputwrapper-filled': this.props.value,
          'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
        });
        var visibleOptions = this.getVisibleOptions();
        var selectedOption = this.getSelectedOption();
        var hiddenSelect = this.renderHiddenSelect(selectedOption);
        var keyboardHelper = this.renderKeyboardHelper();
        var labelElement = this.renderLabel(selectedOption);
        var dropdownIcon = this.renderDropdownIcon();
        var clearIcon = this.renderClearIcon();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          ref: function ref(el) {
            return _this14.container = el;
          },
          className: className,
          style: this.props.style,
          onClick: this.onClick,
          onMouseDown: this.props.onMouseDown,
          onContextMenu: this.props.onContextMenu
        }, keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React__default['default'].createElement(DropdownPanel, _extends({
          ref: this.overlayRef,
          visibleOptions: visibleOptions
        }, this.props, {
          onClick: this.onPanelClick,
          onOptionClick: this.onOptionClick,
          filterValue: this.state.filter,
          hasFilter: this.hasFilter,
          onFilterClearIconClick: this.onFilterClearIconClick,
          onFilterInputKeyDown: this.onFilterInputKeyDown,
          onFilterInputChange: this.onFilterInputChange,
          getOptionLabel: this.getOptionLabel,
          getOptionRenderKey: this.getOptionRenderKey,
          isOptionDisabled: this.isOptionDisabled,
          getOptionGroupChildren: this.getOptionGroupChildren,
          getOptionGroupLabel: this.getOptionGroupLabel,
          getOptionGroupRenderKey: this.getOptionGroupRenderKey,
          isSelected: this.isSelected,
          getSelectedOptionIndex: this.getSelectedOptionIndex,
          in: this.state.overlayVisible,
          onEnter: this.onOverlayEnter,
          onEntered: this.onOverlayEntered,
          onExit: this.onOverlayExit,
          onExited: this.onOverlayExited
        })));
      }
    }]);

    return Dropdown;
  }(React.Component);

  _defineProperty(Dropdown, "defaultProps", {
    id: null,
    inputRef: null,
    name: null,
    value: null,
    options: null,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    optionGroupTemplate: null,
    valueTemplate: null,
    itemTemplate: null,
    style: null,
    className: null,
    virtualScrollerOptions: null,
    scrollHeight: '200px',
    filter: false,
    filterBy: null,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterLocale: undefined,
    emptyMessage: 'No records found',
    emptyFilterMessage: 'No results found',
    editable: false,
    placeholder: null,
    required: false,
    disabled: false,
    appendTo: null,
    tabIndex: null,
    autoFocus: false,
    filterInputAutoFocus: true,
    resetFilterOnHide: false,
    showFilterClear: false,
    panelClassName: null,
    panelStyle: null,
    dataKey: null,
    inputId: null,
    showClear: false,
    maxLength: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    transitionOptions: null,
    dropdownIcon: 'pi pi-chevron-down',
    showOnFocus: false,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onMouseDown: null,
    onContextMenu: null,
    onShow: null,
    onHide: null,
    onFilter: null
  });

  exports.Dropdown = Dropdown;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core, primereact.virtualscroller, primereact.api));
