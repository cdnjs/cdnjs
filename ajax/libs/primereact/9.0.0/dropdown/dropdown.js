this.primereact = this.primereact || {};
this.primereact.dropdown = (function (exports, React, PrimeReact, hooks, overlayservice, tooltip, utils, csstransition, portal, virtualscroller, ripple) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  var DropdownBase = {
    defaultProps: {
      __TYPE: 'Dropdown',
      appendTo: null,
      ariaLabel: null,
      ariaLabelledBy: null,
      autoFocus: false,
      className: null,
      clearIcon: 'pi pi-times',
      dataKey: null,
      disabled: false,
      dropdownIcon: 'pi pi-chevron-down',
      editable: false,
      emptyFilterMessage: null,
      emptyMessage: null,
      filter: false,
      filterBy: null,
      filterInputAutoFocus: true,
      filterLocale: undefined,
      filterMatchMode: 'contains',
      filterPlaceholder: null,
      filterTemplate: null,
      focusInputRef: null,
      id: null,
      inputId: null,
      inputRef: null,
      itemTemplate: null,
      maxLength: null,
      name: null,
      onBlur: null,
      onChange: null,
      onContextMenu: null,
      onFilter: null,
      onFocus: null,
      onHide: null,
      onMouseDown: null,
      onShow: null,
      optionDisabled: null,
      optionGroupChildren: null,
      optionGroupLabel: null,
      optionGroupTemplate: null,
      optionLabel: null,
      optionValue: null,
      options: null,
      panelClassName: null,
      panelStyle: null,
      placeholder: null,
      required: false,
      resetFilterOnHide: false,
      scrollHeight: '200px',
      showClear: false,
      showFilterClear: false,
      showOnFocus: false,
      style: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      transitionOptions: null,
      value: null,
      valueTemplate: null,
      virtualScrollerOptions: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, DropdownBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, DropdownBase.defaultProps);
    }
  };

  var DropdownItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          option: props.option
        });
      }
    };
    var className = utils.classNames('p-dropdown-item', {
      'p-highlight': props.selected,
      'p-disabled': props.disabled,
      'p-dropdown-item-empty': !props.label || props.label.length === 0
    }, props.option && props.option.className);
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : props.label;
    return /*#__PURE__*/React__namespace.createElement("li", {
      className: className,
      style: props.style,
      onClick: onClick,
      "aria-label": props.label,
      key: props.label,
      role: "option",
      "aria-selected": props.selected
    }, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  DropdownItem.displayName = 'DropdownItem';

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var DropdownPanel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var virtualScrollerRef = React__namespace.useRef(null);
    var filterInputRef = React__namespace.useRef(null);
    var isEmptyFilter = !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
    var filterOptions = {
      filter: function filter(e) {
        return onFilterInputChange(e);
      },
      reset: function reset() {
        return props.resetFilter();
      }
    };
    var onEnter = function onEnter() {
      props.onEnter(function () {
        if (virtualScrollerRef.current) {
          var selectedIndex = props.getSelectedOptionIndex();
          if (selectedIndex !== -1) {
            setTimeout(function () {
              return virtualScrollerRef.current.scrollToIndex(selectedIndex);
            }, 0);
          }
        }
      });
    };
    var onEntered = function onEntered() {
      props.onEntered(function () {
        if (props.filter && props.filterInputAutoFocus) {
          utils.DomHandler.focus(filterInputRef.current, false);
        }
      });
    };
    var onFilterInputChange = function onFilterInputChange(event) {
      virtualScrollerRef.current && virtualScrollerRef.current.scrollToIndex(0);
      props.onFilterInputChange && props.onFilterInputChange(event);
    };
    var createGroupChildren = function createGroupChildren(optionGroup, style) {
      var groupChildren = props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = j + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        return /*#__PURE__*/React__namespace.createElement(DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: props.isSelected(option),
          disabled: disabled,
          onClick: props.onOptionClick
        });
      });
    };
    var createEmptyMessage = function createEmptyMessage(emptyMessage, isFilter) {
      var message = utils.ObjectUtils.getJSXElement(emptyMessage, props) || PrimeReact.localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: "p-dropdown-empty-message"
      }, message);
    };
    var createItem = function createItem(option, index) {
      var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = {
        height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
      };
      if (props.optionGroupLabel) {
        var groupContent = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : props.getOptionGroupLabel(option);
        var groupChildrenContent = createGroupChildren(option, style);
        var key = index + '_' + props.getOptionGroupRenderKey(option);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
          key: key
        }, /*#__PURE__*/React__namespace.createElement("li", {
          className: "p-dropdown-item-group",
          style: style
        }, groupContent), groupChildrenContent);
      } else {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = index + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        return /*#__PURE__*/React__namespace.createElement(DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: props.isSelected(option),
          disabled: disabled,
          onClick: props.onOptionClick
        });
      }
    };
    var createItems = function createItems() {
      if (utils.ObjectUtils.isNotEmpty(props.visibleOptions)) {
        return props.visibleOptions.map(createItem);
      } else if (props.hasFilter) {
        return createEmptyMessage(props.emptyFilterMessage, true);
      }
      return createEmptyMessage(props.emptyMessage);
    };
    var createFilterClearIcon = function createFilterClearIcon() {
      if (props.showFilterClear && props.filterValue) {
        var ariaLabel = PrimeReact.localeOption('clear');
        return /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-dropdown-filter-clear-icon pi pi-times",
          "aria-label": ariaLabel,
          onClick: function onClick() {
            return props.onFilterClearIconClick(function () {
              return utils.DomHandler.focus(filterInputRef.current);
            });
          }
        });
      }
      return null;
    };
    var createFilter = function createFilter() {
      if (props.filter) {
        var clearIcon = createFilterClearIcon();
        var containerClassName = utils.classNames('p-dropdown-filter-container', {
          'p-dropdown-clearable-filter': !!clearIcon
        });
        var content = /*#__PURE__*/React__namespace.createElement("div", {
          className: containerClassName
        }, /*#__PURE__*/React__namespace.createElement("input", {
          ref: filterInputRef,
          type: "text",
          autoComplete: "off",
          className: "p-dropdown-filter p-inputtext p-component",
          placeholder: props.filterPlaceholder,
          onKeyDown: props.onFilterInputKeyDown,
          onChange: onFilterInputChange,
          value: props.filterValue
        }), clearIcon, /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-dropdown-filter-icon pi pi-search"
        }));
        if (props.filterTemplate) {
          var defaultContentOptions = {
            className: containerClassName,
            element: content,
            filterOptions: filterOptions,
            filterInputKeyDown: props.onFilterInputKeyDown,
            filterInputChange: onFilterInputChange,
            filterIconClassName: 'p-dropdown-filter-icon pi pi-search',
            clearIcon: clearIcon,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dropdown-header"
        }, content);
      }
      return null;
    };
    var createContent = function createContent() {
      if (props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
          style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
            height: props.scrollHeight
          }),
          className: utils.classNames('p-dropdown-items-wrapper', props.virtualScrollerOptions.className),
          items: props.visibleOptions,
          autoSize: true,
          onLazyLoad: function onLazyLoad(event) {
            return props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
              filter: props.filterValue
            }));
          },
          itemTemplate: function itemTemplate(item, options) {
            return item && createItem(item, options.index, options);
          },
          contentTemplate: function contentTemplate(options) {
            var className = utils.classNames('p-dropdown-items', options.className);
            var content = isEmptyFilter ? createEmptyMessage() : options.children;
            return /*#__PURE__*/React__namespace.createElement("ul", {
              ref: options.contentRef,
              className: className,
              role: "listbox"
            }, content);
          }
        });
        return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
          ref: virtualScrollerRef
        }, virtualScrollerProps));
      } else {
        var items = createItems();
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dropdown-items-wrapper",
          style: {
            maxHeight: props.scrollHeight || 'auto'
          }
        }, /*#__PURE__*/React__namespace.createElement("ul", {
          className: "p-dropdown-items",
          role: "listbox"
        }, items));
      }
    };
    var createElement = function createElement() {
      var className = utils.classNames('p-dropdown-panel p-component', props.panelClassName, {
        'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': PrimeReact__default["default"].ripple === false
      });
      var filter = createFilter();
      var content = createContent();
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: ref,
        classNames: "p-connected-overlay",
        "in": props["in"],
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntering: props.onEntering,
        onEntered: onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: ref,
        className: className,
        style: props.panelStyle,
        onClick: props.onClick
      }, filter, content));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  DropdownPanel.displayName = 'DropdownPanel';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var Dropdown = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = DropdownBase.getProps(inProps);
    var _React$useState = React__namespace.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterState = _React$useState2[0],
      setFilterState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      focusedState = _React$useState4[0],
      setFocusedState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      overlayVisibleState = _React$useState6[0],
      setOverlayVisibleState = _React$useState6[1];
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var focusInputRef = React__namespace.useRef(props.focusInputRef);
    var searchTimeout = React__namespace.useRef(null);
    var searchValue = React__namespace.useRef(null);
    var currentSearchChar = React__namespace.useRef(null);
    var isLazy = props.virtualScrollerOptions && props.virtualScrollerOptions.lazy;
    var hasFilter = utils.ObjectUtils.isNotEmpty(filterState);
    var appendTo = props.appendTo || PrimeReact__default["default"].appendTo;
    var _useOverlayListener = hooks.useOverlayListener({
        target: elementRef,
        overlay: overlayRef,
        listener: function listener(event, _ref) {
          var type = _ref.type,
            valid = _ref.valid;
          if (valid) {
            type === 'outside' ? !isClearClicked(event) && hide() : hide();
          }
        },
        when: overlayVisibleState
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var getVisibleOptions = function getVisibleOptions() {
      if (hasFilter && !isLazy) {
        var filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
        var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
        if (props.optionGroupLabel) {
          var filteredGroups = [];
          var _iterator = _createForOfIteratorHelper(props.options),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optgroup = _step.value;
              var filteredSubOptions = PrimeReact.FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
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
          return PrimeReact.FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
        }
      } else {
        return props.options;
      }
    };
    var isClearClicked = function isClearClicked(event) {
      return utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || utils.DomHandler.hasClass(event.target, 'p-dropdown-filter-clear-icon');
    };
    var onClick = function onClick(event) {
      if (props.disabled) {
        return;
      }
      props.onClick && props.onClick(event);

      // do not continue if the user defined click wants to prevent it
      if (event.defaultPrevented) {
        return;
      }
      if (utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
        return;
      } else if (!overlayRef.current || !(overlayRef.current && overlayRef.current.contains(event.target))) {
        utils.DomHandler.focus(focusInputRef.current);
        overlayVisibleState ? hide() : show();
      }
    };
    var onInputFocus = function onInputFocus(event) {
      if (props.showOnFocus && !overlayVisibleState) {
        show();
      }
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };
    var onInputBlur = function onInputBlur(event) {
      setFocusedState(false);
      if (props.onBlur) {
        setTimeout(function () {
          var currentValue = inputRef.current ? inputRef.current.value : undefined;
          props.onBlur({
            originalEvent: event.originalEvent,
            value: currentValue,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: props.name,
              id: props.id,
              value: currentValue
            }
          });
        }, 200);
      }
    };
    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          onDownKey(event);
          break;

        //up
        case 38:
          onUpKey(event);
          break;

        //space and enter
        case 32:
        case 13:
          overlayVisibleState ? hide() : show();
          event.preventDefault();
          break;

        //escape and tab
        case 27:
        case 9:
          hide();
          break;
        default:
          search(event);
          break;
      }
    };
    var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          onDownKey(event);
          break;

        //up
        case 38:
          onUpKey(event);
          break;

        //enter and escape
        case 13:
        case 27:
          hide();
          event.preventDefault();
          break;
      }
    };
    var onUpKey = function onUpKey(event) {
      if (visibleOptions) {
        var prevOption = findPrevOption(getSelectedOptionIndex());
        if (prevOption) {
          selectItem({
            originalEvent: event,
            option: prevOption
          });
        }
      }
      event.preventDefault();
    };
    var onDownKey = function onDownKey(event) {
      if (visibleOptions) {
        if (!overlayVisibleState && event.altKey) {
          show();
        } else {
          var nextOption = findNextOption(getSelectedOptionIndex());
          if (nextOption) {
            selectItem({
              originalEvent: event,
              option: nextOption
            });
          }
        }
      }
      event.preventDefault();
    };
    var findNextOption = function findNextOption(index) {
      if (props.optionGroupLabel) {
        var groupIndex = index === -1 ? 0 : index.group;
        var optionIndex = index === -1 ? -1 : index.option;
        var option = findNextOptionInList(getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex + 1 !== visibleOptions.length) return findNextOption({
          group: groupIndex + 1,
          option: -1
        });else return null;
      }
      return findNextOptionInList(visibleOptions, index);
    };
    var findNextOptionInList = function findNextOptionInList(list, index) {
      var i = index + 1;
      if (i === list.length) {
        return null;
      }
      var option = list[i];
      return isOptionDisabled(option) ? findNextOptionInList(i) : option;
    };
    var findPrevOption = function findPrevOption(index) {
      if (index === -1) {
        return null;
      }
      if (props.optionGroupLabel) {
        var groupIndex = index.group;
        var optionIndex = index.option;
        var option = findPrevOptionInList(getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex > 0) return findPrevOption({
          group: groupIndex - 1,
          option: getOptionGroupChildren(visibleOptions[groupIndex - 1]).length
        });else return null;
      }
      return findPrevOptionInList(visibleOptions, index);
    };
    var findPrevOptionInList = function findPrevOptionInList(list, index) {
      var i = index - 1;
      if (i < 0) {
        return null;
      }
      var option = list[i];
      return isOptionDisabled(option) ? findPrevOption(i) : option;
    };
    var search = function search(event) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      var _char = event.key;
      if (_char === 'Shift' || _char === 'Control' || _char === 'Alt') {
        return;
      }
      if (currentSearchChar.current === _char) searchValue.current = _char;else searchValue.current = searchValue.current ? searchValue.current + _char : _char;
      currentSearchChar.current = _char;
      if (searchValue.current) {
        var searchIndex = getSelectedOptionIndex();
        var newOption = props.optionGroupLabel ? searchOptionInGroup(searchIndex) : searchOption(searchIndex + 1);
        if (newOption) {
          selectItem({
            originalEvent: event,
            option: newOption
          });
        }
      }
      searchTimeout.current = setTimeout(function () {
        searchValue.current = null;
      }, 250);
    };
    var searchOption = function searchOption(index) {
      if (searchValue.current) {
        return searchOptionInRange(index, visibleOptions.length) || searchOptionInRange(0, index);
      }
      return null;
    };
    var searchOptionInRange = function searchOptionInRange(start, end) {
      for (var i = start; i < end; i++) {
        var opt = visibleOptions[i];
        if (matchesSearchValue(opt)) {
          return opt;
        }
      }
      return null;
    };
    var searchOptionInGroup = function searchOptionInGroup(index) {
      var searchIndex = index === -1 ? {
        group: 0,
        option: -1
      } : index;
      for (var i = searchIndex.group; i < visibleOptions.length; i++) {
        var groupOptions = getOptionGroupChildren(visibleOptions[i]);
        for (var j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
          if (matchesSearchValue(groupOptions[j])) {
            return groupOptions[j];
          }
        }
      }
      for (var _i = 0; _i <= searchIndex.group; _i++) {
        var _groupOptions = getOptionGroupChildren(visibleOptions[_i]);
        for (var _j = 0; _j < (searchIndex.group === _i ? searchIndex.option : _groupOptions.length); _j++) {
          if (matchesSearchValue(_groupOptions[_j])) {
            return _groupOptions[_j];
          }
        }
      }
      return null;
    };
    var matchesSearchValue = function matchesSearchValue(option) {
      var label = getOptionLabel(option);
      if (!label) {
        return false;
      }
      label = label.toLocaleLowerCase(props.filterLocale);
      return label.startsWith(searchValue.current.toLocaleLowerCase(props.filterLocale));
    };
    var onEditableInputChange = function onEditableInputChange(event) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event.originalEvent,
          value: event.target.value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: event.target.value
          }
        });
      }
    };
    var onEditableInputFocus = function onEditableInputFocus(event) {
      setFocusedState(true);
      hide();
      props.onFocus && props.onFocus(event);
    };
    var onOptionClick = function onOptionClick(event) {
      var option = event.option;
      if (!option.disabled) {
        selectItem(event);
        utils.DomHandler.focus(focusInputRef.current);
      }
      hide();
    };
    var onFilterInputChange = function onFilterInputChange(event) {
      var filter = event.target.value;
      setFilterState(filter);
      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          filter: filter
        });
      }
    };
    var onFilterClearIconClick = function onFilterClearIconClick(callback) {
      resetFilter(callback);
    };
    var resetFilter = function resetFilter(callback) {
      setFilterState('');
      props.onFilter && props.onFilter({
        filter: ''
      });
      callback && callback();
    };
    var clear = function clear(event) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: undefined,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: undefined
          }
        });
      }
      updateEditableLabel();
    };
    var selectItem = function selectItem(event) {
      if (selectedOption !== event.option) {
        updateEditableLabel(event.option);
        var optionValue = getOptionValue(event.option);
        if (props.onChange) {
          props.onChange({
            originalEvent: event.originalEvent,
            value: optionValue,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: props.name,
              id: props.id,
              value: optionValue
            }
          });
        }
      }
    };
    var getSelectedOptionIndex = function getSelectedOptionIndex(options) {
      options = options || visibleOptions;
      if (props.value != null && options) {
        if (props.optionGroupLabel) {
          for (var i = 0; i < options.length; i++) {
            var selectedOptionIndex = findOptionIndexInList(props.value, getOptionGroupChildren(options[i]));
            if (selectedOptionIndex !== -1) {
              return {
                group: i,
                option: selectedOptionIndex
              };
            }
          }
        } else {
          return findOptionIndexInList(props.value, options);
        }
      }
      return -1;
    };
    var equalityKey = function equalityKey() {
      return props.optionValue ? null : props.dataKey;
    };
    var findOptionIndexInList = function findOptionIndexInList(value, list) {
      var key = equalityKey();
      return list.findIndex(function (item) {
        return utils.ObjectUtils.equals(value, getOptionValue(item), key);
      });
    };
    var isSelected = function isSelected(option) {
      return utils.ObjectUtils.equals(props.value, getOptionValue(option), equalityKey());
    };
    var show = function show() {
      setOverlayVisibleState(true);
    };
    var hide = function hide() {
      setOverlayVisibleState(false);
    };
    var onOverlayEnter = function onOverlayEnter(callback) {
      utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
      alignOverlay();
      callback && callback();
    };
    var onOverlayEntered = function onOverlayEntered(callback) {
      callback && callback();
      bindOverlayListener();
      props.onShow && props.onShow();
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      if (props.filter && props.resetFilterOnHide) {
        resetFilter();
      }
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var alignOverlay = function alignOverlay() {
      utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
    };
    var scrollInView = function scrollInView() {
      var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
      if (highlightItem && highlightItem.scrollIntoView) {
        highlightItem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
    };
    var updateEditableLabel = function updateEditableLabel(option) {
      if (inputRef.current) {
        inputRef.current.value = option ? getOptionLabel(option) : props.value || '';
      }
    };
    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
    };
    var getOptionRenderKey = function getOptionRenderKey(option) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
    };
    var isOptionDisabled = function isOptionDisabled(option) {
      if (props.optionDisabled) {
        return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
      }
      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    };
    var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
    };
    var updateInputField = function updateInputField() {
      if (props.editable && inputRef.current) {
        var label = selectedOption ? getOptionLabel(selectedOption) : null;
        var value = label || props.value || '';
        inputRef.current.value = value;
      }
    };
    var getSelectedOption = function getSelectedOption() {
      var index = getSelectedOptionIndex(props.options);
      return index !== -1 ? props.optionGroupLabel ? getOptionGroupChildren(props.options[index.group])[index.option] : props.options[index] : null;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        focus: function focus() {
          return utils.DomHandler.focus(focusInputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getOverlay: function getOverlay() {
          return overlayRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        },
        getFocusInput: function getFocusInput() {
          return focusInputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
      utils.ObjectUtils.combinedRefs(focusInputRef, props.focusInputRef);
    }, [inputRef, props.inputRef, focusInputRef, props.focusInputRef]);
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focus(focusInputRef.current, props.autoFocus);
      }
    });
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState && props.value) {
        scrollInView();
      }
    }, [overlayVisibleState, props.value]);
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState && filterState && props.filter) {
        alignOverlay();
      }
    }, [overlayVisibleState, filterState, props.filter]);
    hooks.useUpdateEffect(function () {
      if (filterState && (!props.options || props.options.length === 0)) {
        setFilterState('');
      }
      updateInputField();
      if (inputRef.current) {
        inputRef.current.selectedIndex = 1;
      }
    });
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    var createHiddenSelect = function createHiddenSelect() {
      var option = {
        value: '',
        label: props.placeholder
      };
      if (selectedOption) {
        var optionValue = getOptionValue(selectedOption);
        option = {
          value: _typeof(optionValue) === 'object' ? props.options.findIndex(function (o) {
            return o === optionValue;
          }) : optionValue,
          label: getOptionLabel(selectedOption)
        };
      }
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hidden-accessible p-dropdown-hidden-select"
      }, /*#__PURE__*/React__namespace.createElement("select", {
        ref: inputRef,
        required: props.required,
        defaultValue: option.value,
        name: props.name,
        tabIndex: -1,
        "aria-hidden": "true"
      }, /*#__PURE__*/React__namespace.createElement("option", {
        value: option.value
      }, option.label)));
    };
    var createKeyboardHelper = function createKeyboardHelper() {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React__namespace.createElement("input", _extends({
        ref: focusInputRef,
        id: props.inputId,
        type: "text",
        readOnly: true,
        "aria-haspopup": "listbox",
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onKeyDown: onInputKeyDown,
        disabled: props.disabled,
        tabIndex: props.tabIndex
      }, ariaProps)));
    };
    var createLabel = function createLabel() {
      var label = utils.ObjectUtils.isNotEmpty(selectedOption) ? getOptionLabel(selectedOption) : null;
      if (props.editable) {
        var value = label || props.value || '';
        return /*#__PURE__*/React__namespace.createElement("input", _extends({
          ref: inputRef,
          type: "text",
          defaultValue: value,
          className: "p-dropdown-label p-inputtext",
          disabled: props.disabled,
          placeholder: props.placeholder,
          maxLength: props.maxLength,
          onInput: onEditableInputChange,
          onFocus: onEditableInputFocus,
          onBlur: onInputBlur,
          "aria-haspopup": "listbox"
        }, ariaProps));
      } else {
        var _className = utils.classNames('p-dropdown-label p-inputtext', {
          'p-placeholder': label === null && props.placeholder,
          'p-dropdown-label-empty': label === null && !props.placeholder
        });
        var content = props.valueTemplate ? utils.ObjectUtils.getJSXElement(props.valueTemplate, selectedOption, props) : label || props.placeholder || 'empty';
        return /*#__PURE__*/React__namespace.createElement("span", {
          ref: inputRef,
          className: _className
        }, content);
      }
    };
    var createClearIcon = function createClearIcon() {
      if (props.value != null && props.showClear && !props.disabled) {
        var iconClassName = utils.classNames('p-dropdown-clear-icon p-clickable');
        var iconProps = {
          className: iconClassName,
          onPointerUp: clear
        };
        return utils.IconUtils.getJSXIcon(props.clearIcon, iconProps);
      }
      return null;
    };
    var createDropdownIcon = function createDropdownIcon() {
      var iconClassName = utils.classNames('p-dropdown-trigger-icon p-clickable');
      var icon = utils.IconUtils.getJSXIcon(props.dropdownIcon, {
        className: iconClassName
      });
      var ariaLabel = props.placeholder || props.ariaLabel;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dropdown-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": overlayVisibleState,
        "aria-label": ariaLabel
      }, icon);
    };
    var visibleOptions = getVisibleOptions();
    var selectedOption = getSelectedOption();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = DropdownBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-dropdown p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-focus': focusedState,
      'p-dropdown-clearable': props.showClear && !props.disabled,
      'p-inputwrapper-filled': utils.ObjectUtils.isNotEmpty(props.value),
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    }, props.className);
    var hiddenSelect = createHiddenSelect();
    var keyboardHelper = createKeyboardHelper();
    var labelElement = createLabel();
    var dropdownIcon = createDropdownIcon();
    var clearIcon = createClearIcon();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick,
      onMouseDown: props.onMouseDown,
      onContextMenu: props.onContextMenu
    }), keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React__namespace.createElement(DropdownPanel, _extends({
      ref: overlayRef,
      visibleOptions: visibleOptions
    }, props, {
      appendTo: appendTo,
      onClick: onPanelClick,
      onOptionClick: onOptionClick,
      filterValue: filterState,
      hasFilter: hasFilter,
      onFilterClearIconClick: onFilterClearIconClick,
      resetFilter: resetFilter,
      onFilterInputKeyDown: onFilterInputKeyDown,
      onFilterInputChange: onFilterInputChange,
      getOptionLabel: getOptionLabel,
      getOptionRenderKey: getOptionRenderKey,
      isOptionDisabled: isOptionDisabled,
      getOptionGroupChildren: getOptionGroupChildren,
      getOptionGroupLabel: getOptionGroupLabel,
      getOptionGroupRenderKey: getOptionGroupRenderKey,
      isSelected: isSelected,
      getSelectedOptionIndex: getSelectedOptionIndex,
      "in": overlayVisibleState,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Dropdown.displayName = 'Dropdown';

  exports.Dropdown = Dropdown;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.overlayservice, primereact.tooltip, primereact.utils, primereact.csstransition, primereact.portal, primereact.virtualscroller, primereact.ripple);
