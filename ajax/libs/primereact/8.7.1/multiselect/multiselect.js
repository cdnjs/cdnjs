this.primereact = this.primereact || {};
this.primereact.multiselect = (function (exports, React, PrimeReact, hooks, overlayservice, tooltip, utils, csstransition, portal, virtualscroller, inputtext, ripple) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        focusedState = _React$useState2[0],
        setFocusedState = _React$useState2[1];

    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);

    var onClick = function onClick(event) {
      if (!props.disabled && !props.readOnly && props.onChange) {
        var _checked = isChecked();

        var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement;
        var isInputToggled = event.target === inputRef.current;
        var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;

        if (isInputToggled || isCheckboxToggled) {
          var value = _checked ? props.falseValue : props.trueValue;
          props.onChange({
            originalEvent: event,
            value: props.value,
            checked: value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              type: 'checkbox',
              name: props.name,
              id: props.id,
              value: props.value,
              checked: value
            }
          });
        }

        utils.DomHandler.focus(inputRef.current);
        event.preventDefault();
      }
    };

    var onFocus = function onFocus() {
      setFocusedState(true);
    };

    var onBlur = function onBlur() {
      setFocusedState(false);
    };

    var onKeyDown = function onKeyDown(event) {
      if (event.code === 'Space') {
        onClick(event);
      }
    };

    var isChecked = function isChecked() {
      return props.checked === props.trueValue;
    };

    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUpdateEffect(function () {
      inputRef.current.checked = isChecked();
    }, [props.checked, props.trueValue]);
    var checked = isChecked();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Checkbox.defaultProps);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-checkbox p-component', {
      'p-checkbox-checked': checked,
      'p-checkbox-disabled': props.disabled,
      'p-checkbox-focused': focusedState
    }, props.className);
    var boxClass = utils.classNames('p-checkbox-box', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
    var icon = utils.IconUtils.getJSXIcon(checked ? props.icon : '', {
      className: 'p-checkbox-icon p-c'
    }, {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick,
      onContextMenu: props.onContextMenu,
      onMouseDown: props.onMouseDown
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef,
      type: "checkbox",
      id: props.inputId,
      name: props.name,
      tabIndex: props.tabIndex,
      defaultChecked: checked,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required
    }, ariaProps))), /*#__PURE__*/React__namespace.createElement("div", {
      className: boxClass
    }, icon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Checkbox.displayName = 'Checkbox';
  Checkbox.defaultProps = {
    __TYPE: 'Checkbox',
    id: null,
    inputRef: null,
    inputId: null,
    value: null,
    name: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    style: null,
    className: null,
    disabled: false,
    required: false,
    readOnly: false,
    tabIndex: null,
    icon: 'pi pi-check',
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null
  };

  var MultiSelectHeader = /*#__PURE__*/React__namespace.memo(function (props) {
    var filterOptions = {
      filter: function filter(e) {
        return onFilter(e);
      },
      reset: function reset() {
        return props.resetFilter();
      }
    };

    var onFilter = function onFilter(event) {
      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          query: event.target.value
        });
      }
    };

    var onSelectAll = function onSelectAll(event) {
      if (props.onSelectAll) {
        props.onSelectAll({
          originalEvent: event,
          checked: props.selectAll
        });
      }

      event.preventDefault();
    };

    var createFilterElement = function createFilterElement() {
      if (props.filter) {
        var containerClassName = utils.classNames('p-multiselect-filter-container');
        var content = /*#__PURE__*/React__namespace.createElement("div", {
          className: containerClassName
        }, /*#__PURE__*/React__namespace.createElement(inputtext.InputText, {
          type: "text",
          role: "textbox",
          value: props.filterValue,
          onChange: onFilter,
          className: "p-multiselect-filter",
          placeholder: props.filterPlaceholder
        }), /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-multiselect-filter-icon pi pi-search"
        }));

        if (props.filterTemplate) {
          var defaultContentOptions = {
            className: containerClassName,
            element: content,
            filterOptions: filterOptions,
            onFilter: onFilter,
            filterIconClassName: 'p-multeselect-filter-icon pi pi-search',
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }

        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, content);
      }

      return null;
    };

    var filterElement = createFilterElement();
    var checkboxElement = props.showSelectAll && /*#__PURE__*/React__namespace.createElement(Checkbox, {
      checked: props.selectAll,
      onChange: onSelectAll,
      role: "checkbox",
      "aria-checked": props.selectAll
    });
    var closeElement = /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: "p-multiselect-close p-link",
      "aria-label": PrimeReact.localeOption('close'),
      onClick: props.onClose
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-multiselect-close-icon pi pi-times",
      "aria-hidden": "true"
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    var element = /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-multiselect-header"
    }, checkboxElement, filterElement, closeElement);

    if (props.template) {
      var defaultOptions = {
        className: 'p-multiselect-header',
        checkboxElement: checkboxElement,
        checked: props.selectAll,
        onChange: onSelectAll,
        filterElement: filterElement,
        closeElement: closeElement,
        closeElementClassName: 'p-multiselect-close p-link',
        closeIconClassName: 'p-multiselect-close-icon pi pi-times',
        onCloseClick: props.onClose,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }

    return element;
  });
  MultiSelectHeader.displayName = 'MultiSelectHeader';

  var MultiSelectItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          option: props.option
        });
      }

      event.preventDefault();
    };

    var onKeyDown = function onKeyDown(event) {
      if (props.onKeyDown) {
        props.onKeyDown({
          originalEvent: event,
          option: props.option
        });
      }
    };

    var className = utils.classNames('p-multiselect-item', {
      'p-highlight': props.selected,
      'p-disabled': props.disabled
    }, props.option.className);
    var checkboxClassName = utils.classNames('p-checkbox-box', {
      'p-highlight': props.selected
    });
    var checkboxIcon = utils.classNames('p-checkbox-icon p-c', {
      'pi pi-check': props.selected
    });
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : props.label;
    var tabIndex = props.disabled ? null : props.tabIndex || 0;
    return /*#__PURE__*/React__namespace.createElement("li", {
      className: className,
      style: props.style,
      onClick: onClick,
      tabIndex: tabIndex,
      onKeyDown: onKeyDown,
      role: "option",
      "aria-selected": props.selected
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-checkbox p-component"
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: checkboxClassName
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: checkboxIcon
    }))), /*#__PURE__*/React__namespace.createElement("span", null, content), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  MultiSelectItem.displayName = 'MultiSelectItem';

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var MultiSelectPanel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var virtualScrollerRef = React__namespace.useRef(null);

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

    var onFilterInputChange = function onFilterInputChange(event) {
      if (virtualScrollerRef.current) {
        virtualScrollerRef.current.scrollToIndex(0);
      }

      props.onFilterInputChange && props.onFilterInputChange(event);
    };

    var isEmptyFilter = function isEmptyFilter() {
      return !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
    };

    var createHeader = function createHeader() {
      return /*#__PURE__*/React__namespace.createElement(MultiSelectHeader, {
        filter: props.filter,
        filterValue: props.filterValue,
        filterTemplate: props.filterTemplate,
        onFilter: onFilterInputChange,
        filterPlaceholder: props.filterPlaceholder,
        onClose: props.onCloseClick,
        showSelectAll: props.showSelectAll,
        selectAll: props.isAllSelected(),
        onSelectAll: props.onSelectAll,
        template: props.panelHeaderTemplate
      });
    };

    var createFooter = function createFooter() {
      if (props.panelFooterTemplate) {
        var content = utils.ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-multiselect-footer"
        }, content);
      }

      return null;
    };

    var createGroupChildren = function createGroupChildren(optionGroup, style) {
      var groupChildren = props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = j + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        var tabIndex = disabled ? null : props.tabIndex || 0;
        var selected = props.isSelected(option);
        return /*#__PURE__*/React__namespace.createElement(MultiSelectItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: selected,
          onClick: props.onOptionSelect,
          onKeyDown: props.onOptionKeyDown,
          tabIndex: tabIndex,
          disabled: disabled
        });
      });
    };

    var createEmptyFilter = function createEmptyFilter() {
      var emptyFilterMessage = utils.ObjectUtils.getJSXElement(props.emptyFilterMessage, props) || PrimeReact.localeOption('emptyFilterMessage');
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: "p-multiselect-empty-message"
      }, emptyFilterMessage);
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
          className: "p-multiselect-item-group",
          style: style
        }, groupContent), groupChildrenContent);
      } else {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = index + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        var tabIndex = disabled ? null : props.tabIndex || 0;
        var selected = props.isSelected(option);
        return /*#__PURE__*/React__namespace.createElement(MultiSelectItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: selected,
          onClick: props.onOptionSelect,
          onKeyDown: props.onOptionKeyDown,
          tabIndex: tabIndex,
          disabled: disabled
        });
      }
    };

    var createItems = function createItems() {
      if (utils.ObjectUtils.isNotEmpty(props.visibleOptions)) {
        return props.visibleOptions.map(createItem);
      } else if (props.hasFilter) {
        return createEmptyFilter();
      }

      return null;
    };

    var createContent = function createContent() {
      if (props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
          style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
            height: props.scrollHeight
          }),
          className: utils.classNames('p-multiselect-items-wrapper', props.virtualScrollerOptions.className),
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
            var className = utils.classNames('p-multiselect-items p-component', options.className);
            var content = isEmptyFilter() ? createEmptyFilter() : options.children;
            return /*#__PURE__*/React__namespace.createElement("ul", {
              ref: options.contentRef,
              className: className,
              role: "listbox",
              "aria-multiselectable": true
            }, content);
          }
        });

        return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
          ref: virtualScrollerRef
        }, virtualScrollerProps));
      } else {
        var items = createItems();
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-multiselect-items-wrapper",
          style: {
            maxHeight: props.scrollHeight
          }
        }, /*#__PURE__*/React__namespace.createElement("ul", {
          className: "p-multiselect-items p-component",
          role: "listbox",
          "aria-multiselectable": true
        }, items));
      }
    };

    var createElement = function createElement() {
      var allowOptionSelect = props.allowOptionSelect();
      var panelClassName = utils.classNames('p-multiselect-panel p-component', {
        'p-multiselect-limited': !allowOptionSelect
      }, props.panelClassName);
      var header = createHeader();
      var content = createContent();
      var footer = createFooter();
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
        onEntered: props.onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: ref,
        className: panelClassName,
        style: props.panelStyle,
        onClick: props.onClick
      }, header, content, footer));
    };

    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  MultiSelectPanel.displayName = 'MultiSelectPanel';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var MultiSelect = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
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
    var inputRef = React__namespace.useRef(props.inputRef);
    var labelRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var hasFilter = filterState && filterState.trim().length > 0;
    var empty = utils.ObjectUtils.isEmpty(props.value);
    var equalityKey = props.optionValue ? null : props.dataKey;

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

    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };

    var allowOptionSelect = function allowOptionSelect() {
      return !props.selectionLimit || !props.value || props.value && props.value.length < props.selectionLimit;
    };

    var onOptionSelect = function onOptionSelect(event) {
      var originalEvent = event.originalEvent,
          option = event.option;

      if (props.disabled || isOptionDisabled(option)) {
        return;
      }

      var optionValue = getOptionValue(option);
      var isUsed = isOptionValueUsed(option);
      var selected = isSelected(option);
      var allowSelect = allowOptionSelect();
      if (selected) updateModel(originalEvent, props.value.filter(function (val) {
        return !utils.ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
      }));else if (allowSelect) updateModel(originalEvent, [].concat(_toConsumableArray(props.value || []), [optionValue]));
    };

    var onOptionKeyDown = function onOptionKeyDown(event) {
      var originalEvent = event.originalEvent;
      var listItem = originalEvent.currentTarget;

      switch (originalEvent.which) {
        //down
        case 40:
          var nextItem = findNextItem(listItem);
          nextItem && nextItem.focus();
          originalEvent.preventDefault();
          break;
        //up

        case 38:
          var prevItem = findPrevItem(listItem);
          prevItem && prevItem.focus();
          originalEvent.preventDefault();
          break;
        //enter and space

        case 13:
        case 32:
          onOptionSelect(event);
          originalEvent.preventDefault();
          break;
        //escape

        case 27:
          hide();
          utils.DomHandler.focus(inputRef.current);
          break;
      }
    };

    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-disabled') || utils.DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? findNextItem(nextItem) : nextItem : null;
    };

    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-disabled') || utils.DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? findPrevItem(prevItem) : prevItem : null;
    };

    var onClick = function onClick(event) {
      if (!props.disabled && !isPanelClicked(event) && !utils.DomHandler.hasClass(event.target, 'p-multiselect-token-icon') && !isClearClicked(event)) {
        overlayVisibleState ? hide() : show();
        utils.DomHandler.focus(inputRef.current);
        event.preventDefault();
      }
    };

    var onKeyDown = function onKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          if (!overlayVisibleState && event.altKey) {
            show();
            event.preventDefault();
          }

          break;
        //space

        case 32:
          overlayVisibleState ? hide() : show();
          event.preventDefault();
          break;
        //escape

        case 27:
          hide();
          break;
        //tab

        case 9:
          if (overlayVisibleState) {
            var firstFocusableElement = utils.DomHandler.getFirstFocusableElement(overlayRef.current);

            if (firstFocusableElement) {
              firstFocusableElement.focus();
              event.preventDefault();
            }
          }

          break;
      }
    };

    var onSelectAll = function onSelectAll(event) {
      if (props.onSelectAll) {
        props.onSelectAll(event);
      } else {
        var value = null;

        if (event.checked) {
          value = [];

          if (visibleOptions) {
            var selectedOptions = visibleOptions.filter(function (option) {
              return isOptionDisabled(option) && isSelected(option);
            });
            value = selectedOptions.map(function (option) {
              return getOptionValue(option);
            });
          }
        } else if (visibleOptions) {
          var options = visibleOptions.filter(function (option) {
            return !isOptionDisabled(option);
          });

          if (props.optionGroupLabel) {
            value = [];
            options.forEach(function (optionGroup) {
              return value = [].concat(_toConsumableArray(value), _toConsumableArray(getOptionGroupChildren(optionGroup).filter(function (option) {
                return !isOptionDisabled(option);
              }).map(function (option) {
                return getOptionValue(option);
              })));
            });
          } else {
            value = options.map(function (option) {
              return getOptionValue(option);
            });
          }
        }

        updateModel(event.originalEvent, value);
      }
    };

    var updateModel = function updateModel(event, value) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };

    var onFilterInputChange = function onFilterInputChange(event) {
      var filter = event.query;
      setFilterState(filter);

      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          filter: filter
        });
      }
    };

    var resetFilter = function resetFilter() {
      setFilterState('');
      props.onFilter && props.onFilter({
        filter: ''
      });
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

    var show = function show() {
      setOverlayVisibleState(true);
    };

    var hide = function hide() {
      setOverlayVisibleState(false);
    };

    var onOverlayEnter = function onOverlayEnter(callback) {
      utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
      alignOverlay();
      scrollInView();
      callback && callback();
    };

    var onOverlayEntered = function onOverlayEntered() {
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
      utils.DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
    };

    var isClearClicked = function isClearClicked(event) {
      return utils.DomHandler.hasClass(event.target, 'p-multiselect-clear-icon');
    };

    var isPanelClicked = function isPanelClicked(event) {
      return overlayRef.current && overlayRef.current.contains(event.target);
    };

    var onCloseClick = function onCloseClick(event) {
      hide();
      utils.DomHandler.focus(inputRef.current);
      event.preventDefault();
      event.stopPropagation();
    };

    var getSelectedOptionIndex = function getSelectedOptionIndex() {
      if (props.value != null && props.options) {
        if (props.optionGroupLabel) {
          var groupIndex = 0;
          var optionIndex = props.options.findIndex(function (optionGroup, i) {
            return (groupIndex = i) && findOptionIndexInList(props.value, getOptionGroupChildren(optionGroup)) !== -1;
          });
          return optionIndex !== -1 ? {
            group: groupIndex,
            option: optionIndex
          } : -1;
        } else {
          return findOptionIndexInList(props.value, props.options);
        }
      }

      return -1;
    };

    var findOptionIndexInList = function findOptionIndexInList(value, list) {
      return list.findIndex(function (item) {
        return value.some(function (val) {
          return utils.ObjectUtils.equals(val, getOptionValue(item), equalityKey);
        });
      });
    };

    var isSelected = function isSelected(option) {
      if (props.value) {
        var optionValue = getOptionValue(option);
        var isUsed = isOptionValueUsed(option);
        return props.value.some(function (val) {
          return utils.ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
        });
      }

      return false;
    };

    var getLabelByValue = function getLabelByValue(val) {
      var option;

      if (props.options) {
        if (props.optionGroupLabel) {
          var _iterator = _createForOfIteratorHelper(props.options),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optionGroup = _step.value;
              option = findOptionByValue(val, getOptionGroupChildren(optionGroup));

              if (option) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          option = findOptionByValue(val, props.options);
        }
      }

      return option ? getOptionLabel(option) : null;
    };

    var findOptionByValue = function findOptionByValue(val, list) {
      return list.find(function (option) {
        return utils.ObjectUtils.equals(getOptionValue(option), val, equalityKey);
      });
    };

    var onFocus = function onFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };

    var onBlur = function onBlur(event) {
      setFocusedState(false);
      props.onBlur && props.onBlur(event);
    };

    var isAllSelected = function isAllSelected() {
      if (props.onSelectAll) {
        return props.selectAll;
      } else {
        if (utils.ObjectUtils.isEmpty(visibleOptions)) {
          return false;
        }

        var options = visibleOptions.filter(function (option) {
          return !isOptionDisabled(option);
        });

        if (props.optionGroupLabel) {
          var _iterator2 = _createForOfIteratorHelper(options),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var optionGroup = _step2.value;
              var visibleOptionsGroupChildren = getOptionGroupChildren(optionGroup).filter(function (option) {
                return !isOptionDisabled(option);
              });
              return !visibleOptionsGroupChildren.some(function (option) {
                return !isSelected(option);
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          return !options.some(function (option) {
            return !isSelected(option);
          });
        }
      }

      return true;
    };

    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    };

    var getOptionValue = function getOptionValue(option) {
      if (props.optionValue) {
        var data = utils.ObjectUtils.resolveFieldData(option, props.optionValue);
        return data !== null ? data : option;
      }

      return option && option['value'] !== undefined ? option['value'] : option;
    };

    var getOptionRenderKey = function getOptionRenderKey(option) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
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

    var isOptionDisabled = function isOptionDisabled(option) {
      if (props.optionDisabled) {
        return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
      }

      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    };

    var isOptionValueUsed = function isOptionValueUsed(option) {
      return props.optionValue || option && option['value'] !== undefined;
    };

    var removeChip = function removeChip(event, item) {
      var value = props.value.filter(function (val) {
        return !utils.ObjectUtils.equals(val, item, equalityKey);
      });
      updateModel(event, value);
    };

    var getSelectedItemsLabel = function getSelectedItemsLabel() {
      var pattern = /{(.*?)}/;

      if (pattern.test(props.selectedItemsLabel)) {
        return props.selectedItemsLabel.replace(props.selectedItemsLabel.match(pattern)[0], props.value.length + '');
      }

      return props.selectedItemsLabel;
    };

    var getLabel = function getLabel() {
      var label;

      if (!empty && !props.fixedPlaceholder) {
        if (utils.ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
          return getSelectedItemsLabel();
        } else {
          return props.value.reduce(function (acc, value, index) {
            return acc + (index !== 0 ? ',' : '') + getLabelByValue(value);
          }, '');
        }
      }

      return label;
    };

    var getLabelContent = function getLabelContent() {
      if (props.selectedItemTemplate) {
        if (!empty) {
          if (utils.ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
            return getSelectedItemsLabel();
          } else {
            return props.value.map(function (val, index) {
              var item = utils.ObjectUtils.getJSXElement(props.selectedItemTemplate, val);
              return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
                key: index
              }, item);
            });
          }
        } else {
          return utils.ObjectUtils.getJSXElement(props.selectedItemTemplate);
        }
      } else {
        if (props.display === 'chip' && !empty) {
          var value = props.value.slice(0, props.maxSelectedLabels || props.value.length);
          return value.map(function (val) {
            var label = getLabelByValue(val);
            var icon = !props.disabled && utils.IconUtils.getJSXIcon(props.removeIcon, {
              className: 'p-multiselect-token-icon',
              onClick: function onClick(e) {
                return removeChip(e, val);
              }
            }, {
              props: props
            });
            return /*#__PURE__*/React__namespace.createElement("div", {
              className: "p-multiselect-token",
              key: label
            }, /*#__PURE__*/React__namespace.createElement("span", {
              className: "p-multiselect-token-label"
            }, label), icon);
          });
        }

        return getLabel();
      }
    };

    var getVisibleOptions = function getVisibleOptions() {
      if (hasFilter) {
        var filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
        var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];

        if (props.optionGroupLabel) {
          var filteredGroups = [];

          var _iterator3 = _createForOfIteratorHelper(props.options),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var optgroup = _step3.value;
              var filteredSubOptions = PrimeReact.FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);

              if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), _defineProperty({}, props.optionGroupChildren, filteredSubOptions)));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          return filteredGroups;
        } else {
          return PrimeReact.FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
        }
      } else {
        return props.options;
      }
    };

    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return elementRef.current;
        },
        getOverlay: function getOverlay() {
          return overlayRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState && hasFilter) {
        alignOverlay();
      }
    }, [overlayVisibleState, hasFilter]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });

    var createClearIcon = function createClearIcon() {
      if (!empty && props.showClear && !props.disabled) {
        return /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-multiselect-clear-icon pi pi-times",
          onClick: function onClick(e) {
            return updateModel(e, null);
          }
        });
      }

      return null;
    };

    var createLabel = function createLabel() {
      var content = getLabelContent();
      var className = utils.classNames('p-multiselect-label', {
        'p-placeholder': empty && props.placeholder,
        'p-multiselect-label-empty': empty && !props.placeholder && !props.selectedItemTemplate,
        'p-multiselect-items-label': !empty && props.display !== 'chip' && props.value.length > props.maxSelectedLabels
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: labelRef,
        className: "p-multiselect-label-container"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: className
      }, content || props.placeholder || 'empty'));
    };

    var visibleOptions = getVisibleOptions();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = utils.ObjectUtils.findDiffKeys(props, MultiSelect.defaultProps);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-multiselect p-component p-inputwrapper', {
      'p-multiselect-chip': props.display === 'chip',
      'p-disabled': props.disabled,
      'p-multiselect-clearable': props.showClear && !props.disabled,
      'p-focus': focusedState,
      'p-inputwrapper-filled': utils.ObjectUtils.isNotEmpty(props.value),
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    }, props.className);
    var label = createLabel();
    var clearIcon = createClearIcon();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      style: props.style,
      className: className
    }, otherProps, {
      onClick: onClick
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef,
      id: props.inputId,
      name: props.name,
      readOnly: true,
      type: "text",
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      role: "listbox",
      "aria-expanded": overlayVisibleState,
      disabled: props.disabled,
      tabIndex: props.tabIndex
    }, ariaProps))), label, clearIcon, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-multiselect-trigger"
    }, utils.IconUtils.getJSXIcon(props.dropdownIcon, {
      className: 'p-multiselect-trigger-icon p-c'
    }, {
      props: props
    })), /*#__PURE__*/React__namespace.createElement(MultiSelectPanel, _extends({
      ref: overlayRef,
      visibleOptions: visibleOptions
    }, props, {
      onClick: onPanelClick,
      onOverlayHide: hide,
      filterValue: filterState,
      hasFilter: hasFilter,
      onFilterInputChange: onFilterInputChange,
      resetFilter: resetFilter,
      onCloseClick: onCloseClick,
      onSelectAll: onSelectAll,
      getOptionLabel: getOptionLabel,
      getOptionRenderKey: getOptionRenderKey,
      isOptionDisabled: isOptionDisabled,
      getOptionGroupChildren: getOptionGroupChildren,
      getOptionGroupLabel: getOptionGroupLabel,
      getOptionGroupRenderKey: getOptionGroupRenderKey,
      isSelected: isSelected,
      getSelectedOptionIndex: getSelectedOptionIndex,
      isAllSelected: isAllSelected,
      onOptionSelect: onOptionSelect,
      allowOptionSelect: allowOptionSelect,
      onOptionKeyDown: onOptionKeyDown,
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
  MultiSelect.displayName = 'MultiSelect';
  MultiSelect.defaultProps = {
    __TYPE: 'MultiSelect',
    appendTo: null,
    ariaLabelledBy: null,
    className: null,
    dataKey: null,
    disabled: false,
    display: 'comma',
    dropdownIcon: 'pi pi-chevron-down',
    emptyFilterMessage: null,
    filter: false,
    filterBy: null,
    filterLocale: undefined,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterTemplate: null,
    fixedPlaceholder: false,
    id: null,
    inputId: null,
    inputRef: null,
    itemTemplate: null,
    maxSelectedLabels: null,
    name: null,
    onBlur: null,
    onChange: null,
    onFilter: null,
    onFocus: null,
    onHide: null,
    onSelectAll: null,
    onShow: null,
    optionDisabled: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    optionLabel: null,
    optionValue: null,
    options: null,
    panelClassName: null,
    panelFooterTemplate: null,
    panelHeaderTemplate: null,
    panelStyle: null,
    placeholder: null,
    removeIcon: 'pi pi-times-circle',
    resetFilterOnHide: false,
    scrollHeight: '200px',
    selectAll: false,
    selectedItemTemplate: null,
    selectedItemsLabel: '{0} items selected',
    selectionLimit: null,
    showClear: false,
    showSelectAll: true,
    style: null,
    tabIndex: 0,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    value: null,
    virtualScrollerOptions: null
  };

  exports.MultiSelect = MultiSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.overlayservice, primereact.tooltip, primereact.utils, primereact.csstransition, primereact.portal, primereact.virtualscroller, primereact.inputtext, primereact.ripple);
