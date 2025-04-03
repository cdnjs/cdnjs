this.primereact = this.primereact || {};
this.primereact.autocomplete = (function (exports, React, PrimeReact, button, componentbase, hooks, chevrondown, spinner, timescircle, inputtext, overlayservice, tooltip, utils, csstransition, portal, ripple, virtualscroller) {
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

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        focusedState = _ref.focusedState;
      return utils.classNames('p-autocomplete p-component p-inputwrapper', {
        'p-autocomplete-dd': props.dropdown,
        'p-autocomplete-multiple': props.multiple,
        'p-inputwrapper-filled': props.value,
        'p-invalid': props.invalid,
        'p-inputwrapper-focus': focusedState
      });
    },
    container: function container(_ref2) {
      var props = _ref2.props,
        context = _ref2.context;
      return utils.classNames('p-autocomplete-multiple-container p-component p-inputtext', {
        'p-disabled': props.disabled,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    loadingIcon: 'p-autocomplete-loader',
    dropdownButton: 'p-autocomplete-dropdown',
    removeTokenIcon: 'p-autocomplete-token-icon',
    token: 'p-autocomplete-token p-highlight',
    tokenLabel: 'p-autocomplete-token-label',
    inputToken: 'p-autocomplete-input-token',
    input: function input(_ref3) {
      var props = _ref3.props,
        context = _ref3.context;
      return utils.classNames('p-autocomplete-input', {
        'p-autocomplete-dd-input': props.dropdown,
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    panel: function panel(_ref4) {
      var context = _ref4.context;
      return utils.classNames('p-autocomplete-panel p-component', {
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
    },
    listWrapper: 'p-autocomplete-items-wrapper',
    list: function list(_ref5) {
      var virtualScrollerOptions = _ref5.virtualScrollerOptions,
        options = _ref5.options;
      return virtualScrollerOptions ? utils.classNames('p-autocomplete-items', options.className) : 'p-autocomplete-items';
    },
    emptyMessage: 'p-autocomplete-item',
    item: function item(_ref6) {
      var suggestion = _ref6.suggestion,
        optionGroupLabel = _ref6.optionGroupLabel,
        selected = _ref6.selected;
      return optionGroupLabel ? utils.classNames('p-autocomplete-item', {
        'p-disabled': suggestion.disabled
      }, {
        selected: selected
      }) : utils.classNames('p-autocomplete-item', {
        'p-disabled': suggestion.disabled
      }, {
        'p-highlight': selected
      });
    },
    itemGroup: 'p-autocomplete-item-group',
    footer: 'p-autocomplete-footer',
    transition: 'p-connected-overlay'
  };
  var styles = "\n@layer primereact {\n    .p-autocomplete {\n        display: inline-flex;\n        position: relative;\n    }\n    \n    .p-autocomplete-loader {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-autocomplete-dd .p-autocomplete-input {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n    \n    .p-autocomplete-dd .p-autocomplete-input,\n    .p-autocomplete-dd .p-autocomplete-multiple-container {\n         border-top-right-radius: 0;\n         border-bottom-right-radius: 0;\n     }\n    \n    .p-autocomplete-dd .p-autocomplete-dropdown {\n         border-top-left-radius: 0;\n         border-bottom-left-radius: 0px;\n    }\n    \n    .p-autocomplete .p-autocomplete-panel {\n        min-width: 100%;\n    }\n    \n    .p-autocomplete-panel {\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n    \n    .p-autocomplete-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n    \n    .p-autocomplete-item {\n        cursor: pointer;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-autocomplete-multiple-container {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        cursor: text;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-autocomplete-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n    \n    .p-autocomplete-token-icon {\n        cursor: pointer;\n    }\n    \n    .p-autocomplete-input-token {\n        flex: 1 1 auto;\n        display: inline-flex;\n    }\n    \n    .p-autocomplete-input-token input {\n        border: 0 none;\n        outline: 0 none;\n        background-color: transparent;\n        margin: 0;\n        padding: 0;\n        box-shadow: none;\n        border-radius: 0;\n        width: 100%;\n    }\n    \n    .p-fluid .p-autocomplete {\n        display: flex;\n    }\n    \n    .p-fluid .p-autocomplete-dd .p-autocomplete-input {\n        width: 1%;\n    }\n    \n    .p-autocomplete-items-wrapper {\n        overflow: auto;\n    } \n}\n";
  var AutoCompleteBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'AutoComplete',
      id: null,
      appendTo: null,
      autoFocus: false,
      autoHighlight: false,
      className: null,
      completeMethod: null,
      delay: 300,
      disabled: false,
      dropdown: false,
      dropdownAriaLabel: null,
      dropdownAutoFocus: true,
      dropdownIcon: null,
      dropdownMode: 'blank',
      emptyMessage: null,
      field: null,
      forceSelection: false,
      inputClassName: null,
      inputId: null,
      inputRef: null,
      inputStyle: null,
      variant: null,
      invalid: false,
      itemTemplate: null,
      loadingIcon: null,
      maxLength: null,
      minLength: 1,
      multiple: false,
      name: null,
      onBlur: null,
      onChange: null,
      onClear: null,
      onClick: null,
      onContextMenu: null,
      onDblClick: null,
      onDropdownClick: null,
      onFocus: null,
      onHide: null,
      onKeyPress: null,
      onKeyUp: null,
      onMouseDown: null,
      onSelect: null,
      onShow: null,
      onUnselect: null,
      optionGroupChildren: null,
      optionGroupLabel: null,
      optionGroupTemplate: null,
      panelClassName: null,
      panelFooterTemplate: null,
      panelStyle: null,
      placeholder: null,
      readOnly: false,
      removeTokenIcon: null,
      scrollHeight: '200px',
      selectedItemTemplate: null,
      selectionLimit: null,
      showEmptyMessage: false,
      size: null,
      style: null,
      suggestions: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      transitionOptions: null,
      type: 'text',
      value: null,
      virtualScrollerOptions: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var AutoCompletePanel = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var ptm = props.ptm,
      cx = props.cx;
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var _ptm = function _ptm(key, options) {
      return ptm(key, _objectSpread$1({
        hostName: props.hostName
      }, options));
    };
    var getPTOptions = function getPTOptions(item, key) {
      return _ptm(key, {
        context: {
          selected: props.selectedItem.current === item,
          disabled: item.disabled
        }
      });
    };
    var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionRenderKey = function getOptionRenderKey(option) {
      return utils.ObjectUtils.resolveFieldData(option, props.field);
    };
    var createFooter = function createFooter() {
      if (props.panelFooterTemplate) {
        var content = utils.ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
        var footerProps = mergeProps({
          className: cx('footer')
        }, _ptm('footer'));
        return /*#__PURE__*/React__namespace.createElement("div", footerProps, content);
      }
      return null;
    };
    var findKeyIndex = function findKeyIndex(array, key, value) {
      return array.findIndex(function (obj) {
        return obj[key] === value;
      });
    };
    var latestKey = React__namespace.useRef({
      key: null,
      index: 0,
      keyIndex: 0
    });
    var createLabelItem = function createLabelItem(item, key, index, labelItemProps) {
      var content = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, item, index) : props.getOptionGroupLabel(item) || item;
      var itemGroupProps = mergeProps(_objectSpread$1({
        index: index,
        className: cx('itemGroup'),
        'data-p-highlight': false
      }, labelItemProps), _ptm('itemGroup'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({}, itemGroupProps, {
        key: key ? key : null
      }), content);
    };
    var isOptionSelected = function isOptionSelected(item) {
      if (props.selectedItem && props.selectedItem.current && Array.isArray(props.selectedItem.current)) {
        return props.selectedItem.current.some(function (selectedItem) {
          return utils.ObjectUtils.deepEquals(selectedItem, item);
        });
      } else {
        return utils.ObjectUtils.deepEquals(props.selectedItem.current, item);
      }
    };
    var createListItem = function createListItem(item, key, index, listItemProps) {
      var selected = isOptionSelected(item);
      var content = props.itemTemplate ? utils.ObjectUtils.getJSXElement(props.itemTemplate, item, index) : props.field ? utils.ObjectUtils.resolveFieldData(item, props.field) : item;
      var itemProps = mergeProps(_objectSpread$1({
        index: index,
        role: 'option',
        className: cx('item', {
          optionGroupLabel: props.optionGroupLabel,
          suggestion: item,
          selected: selected
        }),
        onClick: function onClick(e) {
          return props.onItemClick(e, item);
        },
        'aria-selected': selected
      }, listItemProps), getPTOptions(item, 'item'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({
        key: key
      }, itemProps), content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createGroupChildren = function createGroupChildren(optionGroup, i) {
      var groupChildren = props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (item, j) {
        var key = i + '_' + j;
        var itemProps = mergeProps({
          'data-group': i,
          'data-index': j,
          'data-p-disabled': item.disabled
        });
        return createListItem(item, key, j, itemProps);
      });
    };
    var createItem = function createItem(suggestion, index) {
      var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = {
        height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
      };
      if (props.optionGroupLabel) {
        if (props.virtualScrollerOptions) {
          var keyIndex = findKeyIndex(props.suggestions, props.optionGroupLabel, suggestion);
          if (keyIndex !== -1) {
            latestKey.current = {
              key: suggestion,
              index: index,
              keyIndex: keyIndex
            };
            var _key = index + '_' + getOptionGroupRenderKey(suggestion);
            return createLabelItem(suggestion, _key, index, {
              style: style
            });
          }
          var _key2 = index + '_' + latestKey.current.keyIndex;
          var _itemProps = mergeProps({
            style: style,
            'data-group': latestKey.current.keyIndex,
            'data-index': index - latestKey.current.index - 1,
            'data-p-disabled': suggestion.disabled
          });
          return createListItem(suggestion, _key2, index, _itemProps);
        }
        var childrenContent = createGroupChildren(suggestion, index);
        var _key3 = index + '_' + getOptionGroupRenderKey(suggestion);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
          key: _key3
        }, createLabelItem(suggestion, undefined, index, {
          style: style
        }), childrenContent);
      }
      var key = "".concat(index, "_").concat(utils.ObjectUtils.isObject(suggestion) ? getOptionRenderKey(suggestion) : suggestion);
      var itemProps = mergeProps({
        style: style,
        'data-p-disabled': suggestion.disabled
      }, getPTOptions(suggestion, 'item'));
      return createListItem(suggestion, key, index, itemProps);
    };
    var createItems = function createItems() {
      return props.suggestions ? props.suggestions.map(createItem) : null;
    };
    var flattenGroupedItems = function flattenGroupedItems(items) {
      try {
        return items === null || items === void 0 ? void 0 : items.map(function (item) {
          return [item === null || item === void 0 ? void 0 : item[props === null || props === void 0 ? void 0 : props.optionGroupLabel]].concat(_toConsumableArray(item === null || item === void 0 ? void 0 : item[props === null || props === void 0 ? void 0 : props.optionGroupChildren]));
        }).flat();
      } catch (e) {}
    };
    var createContent = function createContent() {
      if (props.showEmptyMessage && utils.ObjectUtils.isEmpty(props.suggestions)) {
        var emptyMessage = props.emptyMessage || PrimeReact.localeOption('emptyMessage');
        var emptyMessageProps = mergeProps({
          className: cx('emptyMessage')
        }, _ptm('emptyMessage'));
        var _listProps = mergeProps({
          className: cx('list')
        }, _ptm('list'));
        return /*#__PURE__*/React__namespace.createElement("ul", _listProps, /*#__PURE__*/React__namespace.createElement("li", emptyMessageProps, emptyMessage));
      }
      if (props.virtualScrollerOptions) {
        var _items = props.suggestions ? props.optionGroupLabel ? flattenGroupedItems(props === null || props === void 0 ? void 0 : props.suggestions) : props.suggestions : null;
        var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
          style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
            height: props.scrollHeight
          }),
          autoSize: true,
          items: _items,
          itemTemplate: function itemTemplate(item, options) {
            return item && createItem(item, options.index, options);
          },
          contentTemplate: function contentTemplate(options) {
            var listProps = mergeProps({
              id: props.listId,
              ref: options.contentRef,
              style: options.style,
              className: cx('list', {
                virtualScrollerProps: virtualScrollerProps,
                options: options
              }),
              role: 'listbox'
            }, _ptm('list'));
            return /*#__PURE__*/React__namespace.createElement("ul", listProps, options.children);
          }
        });
        return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
          ref: props.virtualScrollerRef
        }, virtualScrollerProps, {
          pt: _ptm('virtualScroller'),
          __parentMetadata: {
            parent: props.metaData
          }
        }));
      }
      var items = createItems();
      var listProps = mergeProps({
        id: props.listId,
        className: cx('list'),
        role: 'listbox'
      }, _ptm('list'));
      var listWrapperProps = mergeProps({
        className: cx('listWrapper'),
        style: {
          maxHeight: props.scrollHeight || 'auto'
        }
      }, _ptm('listWrapper'));
      return /*#__PURE__*/React__namespace.createElement("div", listWrapperProps, /*#__PURE__*/React__namespace.createElement("ul", listProps, items));
    };
    var createElement = function createElement() {
      var style = _objectSpread$1({}, props.panelStyle || {});
      var content = createContent();
      var footer = createFooter();
      var panelProps = mergeProps({
        className: utils.classNames(props.panelClassName, cx('panel', {
          context: context
        })),
        style: style,
        onClick: function onClick(e) {
          return props.onClick(e);
        }
      }, _ptm('panel'));
      var transitionProps = mergeProps({
        classNames: cx('transition'),
        "in": props["in"],
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: props.onEnter,
        onEntering: props.onEntering,
        onEntered: props.onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, _ptm('transition'));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: ref
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: ref
      }, panelProps), content, footer));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  AutoCompletePanel.displayName = 'AutoCompletePanel';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var AutoComplete = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = AutoCompleteBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      searchingState = _React$useState4[0],
      setSearchingState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      focusedState = _React$useState6[0],
      setFocusedState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      overlayVisibleState = _React$useState8[0],
      setOverlayVisibleState = _React$useState8[1];
    var metaData = {
      props: props,
      state: {
        id: idState,
        searching: searchingState,
        focused: focusedState,
        overlayVisible: overlayVisibleState
      }
    };
    var _AutoCompleteBase$set = AutoCompleteBase.setMetaData(metaData),
      ptm = _AutoCompleteBase$set.ptm,
      cx = _AutoCompleteBase$set.cx,
      sx = _AutoCompleteBase$set.sx,
      isUnstyled = _AutoCompleteBase$set.isUnstyled;
    componentbase.useHandleStyle(AutoCompleteBase.css.styles, isUnstyled, {
      name: 'autocomplete'
    });
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var multiContainerRef = React__namespace.useRef(null);
    var virtualScrollerRef = React__namespace.useRef(null);
    var timeout = React__namespace.useRef(null);
    var selectedItem = React__namespace.useRef(null);
    var _useOverlayListener = hooks.useOverlayListener({
        target: elementRef,
        overlay: overlayRef,
        listener: function listener(event, _ref) {
          var type = _ref.type,
            valid = _ref.valid;
          if (valid) {
            type === 'outside' ? !isInputClicked(event) && hide() : hide();
          }
        },
        when: overlayVisibleState
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var isInputClicked = function isInputClicked(event) {
      return props.multiple ? event.target === multiContainerRef.current || multiContainerRef.current.contains(event.target) : event.target === inputRef.current;
    };
    var onInputChange = function onInputChange(event) {
      //Cancel the search request if user types within the timeout
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      var query = event.target.value;
      if (!props.multiple) {
        updateModel(event, query);
      }
      if (utils.ObjectUtils.isEmpty(query)) {
        hide();
        props.onClear && props.onClear(event);
      } else if (query.length >= props.minLength) {
        timeout.current = setTimeout(function () {
          search(event, query, 'input');
        }, props.delay);
      } else {
        hide();
      }
    };
    var search = function search(event, query, source) {
      //allow empty string but not undefined or null
      if (query === undefined || query === null) {
        return;
      }

      //do not search blank values on input change
      if (source === 'input' && query.trim().length === 0) {
        return;
      }
      if (props.completeMethod) {
        setSearchingState(true);
        props.completeMethod({
          originalEvent: event,
          query: query
        });
      }
    };
    var selectItem = function selectItem(event, option, preventInputFocus) {
      if (props.multiple) {
        inputRef.current.value = '';

        // allows empty value/selectionlimit and within sectionlimit
        if (!isSelected(option) && isAllowMoreValues()) {
          var newValue = props.value ? [].concat(_toConsumableArray(props.value), [option]) : [option];
          updateModel(event, newValue);
        }
      } else {
        updateInputField(option);
        updateModel(event, option);
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          value: option
        });
      }
      if (!preventInputFocus) {
        utils.DomHandler.focus(inputRef.current);
        hide();
      }
    };
    var updateModel = function updateModel(event, value) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            name: props.name,
            id: idState,
            value: value
          }
        });
      }
      selectedItem.current = utils.ObjectUtils.isNotEmpty(value) ? value : null;
    };
    var formatValue = function formatValue(value) {
      if (utils.ObjectUtils.isEmpty(value)) return '';
      if (typeof value === 'string') return value;
      if (props.selectedItemTemplate) {
        var valueFromTemplate = utils.ObjectUtils.getJSXElement(props.selectedItemTemplate, value);
        return props.multiple || typeof valueFromTemplate === 'string' ? valueFromTemplate : value;
      }
      if (props.field) {
        var _ObjectUtils$resolveF;
        return (_ObjectUtils$resolveF = utils.ObjectUtils.resolveFieldData(value, props.field)) !== null && _ObjectUtils$resolveF !== void 0 ? _ObjectUtils$resolveF : value;
      }
      return value;
    };
    var updateInputField = function updateInputField(value) {
      inputRef.current.value = formatValue(value);
    };
    var show = function show() {
      setOverlayVisibleState(true);
    };
    var hide = function hide() {
      setOverlayVisibleState(false);
      setSearchingState(false);
    };
    var onOverlayEnter = function onOverlayEnter() {
      utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.overlay || PrimeReact__default["default"].zIndex.overlay);
      utils.DomHandler.addStyles(overlayRef.current, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      alignOverlay();
    };
    var onOverlayEntering = function onOverlayEntering() {
      if (props.autoHighlight && props.suggestions && props.suggestions.length) {
        autoHighlightFirstOption();
      }
    };
    var autoHighlightFirstOption = function autoHighlightFirstOption() {
      var _getScrollableElement;
      var element = (_getScrollableElement = getScrollableElement()) === null || _getScrollableElement === void 0 || (_getScrollableElement = _getScrollableElement.firstChild) === null || _getScrollableElement === void 0 ? void 0 : _getScrollableElement.firstChild;
      if (element) {
        !isUnstyled() && utils.DomHandler.addClass(element, 'p-highlight');
        element.setAttribute('data-p-highlight', true);
      }
    };
    var onOverlayEntered = function onOverlayEntered() {
      bindOverlayListener();
      props.onShow && props.onShow();
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var alignOverlay = function alignOverlay() {
      var target = props.multiple ? multiContainerRef.current : inputRef.current;
      utils.DomHandler.alignOverlay(overlayRef.current, target, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
    };
    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };
    var onDropdownClick = function onDropdownClick(event) {
      if (props.dropdownAutoFocus) {
        utils.DomHandler.focus(inputRef.current, props.dropdownAutoFocus);
      }
      if (props.dropdownMode === 'blank') {
        search(event, '', 'dropdown');
      } else if (props.dropdownMode === 'current') {
        search(event, inputRef.current.value, 'dropdown');
      }
      if (props.onDropdownClick) {
        props.onDropdownClick({
          originalEvent: event,
          query: inputRef.current.value
        });
      }
    };
    var removeItem = function removeItem(event, index) {
      var removedValue = props.value[index];
      var newValue = props.value.filter(function (_, i) {
        return index !== i;
      });
      updateModel(event, newValue);
      if (props.onUnselect) {
        props.onUnselect({
          originalEvent: event,
          value: removedValue
        });
      }
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      if (overlayVisibleState) {
        var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li[data-p-highlight="true"]');
        switch (event.which) {
          //down
          case 40:
            if (highlightItem) {
              var nextElement = _findNextItem(highlightItem);
              if (nextElement) {
                !isUnstyled() && utils.DomHandler.addClass(nextElement, 'p-highlight');
                nextElement.setAttribute('data-p-highlight', true);
                !isUnstyled() && utils.DomHandler.removeClass(highlightItem, 'p-highlight');
                highlightItem.setAttribute('data-p-highlight', false);
                utils.DomHandler.scrollInView(getScrollableElement(), nextElement);
              }
            } else {
              highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li');
              if (utils.DomHandler.getAttribute(highlightItem, 'data-pc-section') === 'itemgroup') {
                highlightItem = _findNextItem(highlightItem);
              }
              if (highlightItem) {
                !isUnstyled() && utils.DomHandler.addClass(highlightItem, 'p-highlight');
                highlightItem.setAttribute('data-p-highlight', true);
              }
            }
            event.preventDefault();
            break;

          //up
          case 38:
            if (highlightItem) {
              var previousElement = _findPrevItem(highlightItem);
              if (previousElement) {
                !isUnstyled() && utils.DomHandler.addClass(previousElement, 'p-highlight');
                previousElement.setAttribute('data-p-highlight', true);
                !isUnstyled() && utils.DomHandler.removeClass(highlightItem, 'p-highlight');
                highlightItem.setAttribute('data-p-highlight', false);
                utils.DomHandler.scrollInView(getScrollableElement(), previousElement);
              }
            }
            event.preventDefault();
            break;

          //enter
          case 13:
            if (highlightItem) {
              selectHighlightItem(event, highlightItem);
              hide();
              event.preventDefault();
            }
            break;

          //escape
          case 27:
            hide();
            event.preventDefault();
            break;

          //tab
          case 9:
            if (highlightItem) {
              selectHighlightItem(event, highlightItem);
            }
            hide();
            break;
        }
      }
      if (props.multiple) {
        switch (event.which) {
          //backspace
          case 8:
            if (props.value && props.value.length && !inputRef.current.value) {
              var removedValue = props.value[props.value.length - 1];
              var newValue = props.value.slice(0, -1);
              updateModel(event, newValue);
              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  value: removedValue
                });
              }
            }
            break;
        }
      }
    };
    var selectHighlightItem = function selectHighlightItem(event, item) {
      if (props.optionGroupLabel) {
        var optionGroup = props.suggestions[item.dataset.group];
        selectItem(event, getOptionGroupChildren(optionGroup)[item.dataset.index]);
      } else {
        selectItem(event, props.suggestions[item.getAttribute('index')]);
      }
    };
    var _findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.getAttribute(nextItem, 'data-pc-section') === 'itemgroup' ? _findNextItem(nextItem) : nextItem : null;
    };
    var _findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.getAttribute(prevItem, 'data-pc-section') === 'itemgroup' ? _findPrevItem(prevItem) : prevItem : null;
    };
    var onInputFocus = function onInputFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };
    var forceItemSelection = function forceItemSelection(event) {
      if (props.multiple) {
        inputRef.current.value = '';
        return;
      }
      var inputValue = utils.ObjectUtils.trim(event.target.value).toLowerCase();
      var allItems = (props.suggestions || []).flatMap(function (group) {
        return group.items ? group.items : [group];
      });
      var item = allItems.find(function (it) {
        var value = props.field ? utils.ObjectUtils.resolveFieldData(it, props.field) : it;
        var trimmedValue = value ? utils.ObjectUtils.trim(value).toLowerCase() : '';
        return trimmedValue && inputValue === trimmedValue;
      });
      if (item) {
        selectItem(event, item, true);
      } else {
        inputRef.current.value = '';
        updateModel(event, null);
        props.onClear && props.onClear(event);
      }
    };
    var onInputBlur = function onInputBlur(event) {
      setFocusedState(false);
      if (props.forceSelection) {
        forceItemSelection(event);
      }
      props.onBlur && props.onBlur(event);
    };
    var onMultiContainerClick = function onMultiContainerClick(event) {
      utils.DomHandler.focus(inputRef.current);
      props.onClick && props.onClick(event);
    };
    var onMultiInputFocus = function onMultiInputFocus(event) {
      onInputFocus(event);
      !isUnstyled() && utils.DomHandler.addClass(multiContainerRef.current, 'p-focus');
      multiContainerRef.current.setAttribute('data-p-focus', true);
    };
    var onMultiInputBlur = function onMultiInputBlur(event) {
      onInputBlur(event);
      !isUnstyled() && utils.DomHandler.removeClass(multiContainerRef.current, 'p-focus');
      multiContainerRef.current.setAttribute('data-p-focus', false);
    };
    var isSelected = function isSelected(val) {
      return props.value ? props.value.some(function (v) {
        return utils.ObjectUtils.equals(v, val);
      }) : false;
    };
    var getScrollableElement = function getScrollableElement() {
      var _overlayRef$current;
      return overlayRef === null || overlayRef === void 0 || (_overlayRef$current = overlayRef.current) === null || _overlayRef$current === void 0 ? void 0 : _overlayRef$current.firstChild;
    };
    var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
      return props.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel) : optionGroup;
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
    };
    var isAllowMoreValues = function isAllowMoreValues() {
      return !props.value || !props.selectionLimit || props.value.length < props.selectionLimit;
    };
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
      if (props.autoFocus) {
        utils.DomHandler.focus(inputRef.current, props.autoFocus);
      }
      alignOverlay();
    });
    hooks.useUpdateEffect(function () {
      if (searchingState && props.autoHighlight && props.suggestions && props.suggestions.length) {
        autoHighlightFirstOption();
      }
    }, [searchingState]);
    hooks.useUpdateEffect(function () {
      if (searchingState) {
        utils.ObjectUtils.isNotEmpty(props.suggestions) || props.showEmptyMessage ? show() : hide();
        setSearchingState(false);
      }
    }, [props.suggestions]);
    hooks.useUpdateEffect(function () {
      if (inputRef.current && !props.multiple) {
        updateInputField(props.value);
      }
      if (overlayVisibleState) {
        alignOverlay();
      }
    });
    hooks.useUnmountEffect(function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        search: search,
        show: show,
        hide: hide,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
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
        getVirtualScroller: function getVirtualScroller() {
          return virtualScrollerRef.current;
        }
      };
    });
    var createSimpleAutoComplete = function createSimpleAutoComplete() {
      var value = formatValue(props.value);
      var ariaControls = overlayVisibleState ? idState + '_list' : null;
      return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
        ref: inputRef,
        id: props.inputId,
        type: props.type,
        name: props.name,
        defaultValue: value,
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-controls": ariaControls,
        "aria-haspopup": "listbox",
        "aria-expanded": overlayVisibleState,
        className: utils.classNames(props.inputClassName, cx('input', {
          context: context
        })),
        style: props.inputStyle,
        autoComplete: "off",
        readOnly: props.readOnly,
        required: props.required,
        disabled: props.disabled,
        placeholder: props.placeholder,
        size: props.size,
        maxLength: props.maxLength,
        tabIndex: props.tabIndex,
        onBlur: onInputBlur,
        onFocus: onInputFocus,
        onChange: onInputChange,
        onMouseDown: props.onMouseDown,
        onKeyUp: props.onKeyUp,
        onKeyDown: onInputKeyDown,
        onKeyPress: props.onKeyPress,
        onContextMenu: props.onContextMenu,
        onClick: props.onClick,
        onDoubleClick: props.onDblClick,
        pt: ptm('input'),
        unstyled: props.unstyled
      }, ariaProps, {
        __parentMetadata: {
          parent: metaData
        }
      }));
    };
    var createChips = function createChips() {
      if (utils.ObjectUtils.isNotEmpty(props.value)) {
        return props.value.map(function (val, index) {
          var key = index + 'multi-item';
          var removeTokenIconProps = mergeProps({
            className: cx('removeTokenIcon'),
            onClick: function onClick(e) {
              return removeItem(e, index);
            }
          }, ptm('removeTokenIcon'));
          var icon = props.removeTokenIcon || /*#__PURE__*/React__namespace.createElement(timescircle.TimesCircleIcon, removeTokenIconProps);
          var removeTokenIcon = !props.disabled && utils.IconUtils.getJSXIcon(icon, _objectSpread({}, removeTokenIconProps), {
            props: props
          });
          var tokenProps = mergeProps({
            className: cx('token')
          }, ptm('token'));
          var tokenLabelProps = mergeProps({
            className: cx('tokenLabel')
          }, ptm('tokenLabel'));
          return /*#__PURE__*/React__namespace.createElement("li", _extends({
            key: key
          }, tokenProps), /*#__PURE__*/React__namespace.createElement("span", tokenLabelProps, formatValue(val)), removeTokenIcon);
        });
      }
      selectedItem.current = null;
      return null;
    };
    var createMultiInput = function createMultiInput(allowMoreValues) {
      var ariaControls = overlayVisibleState ? idState + '_list' : null;
      var inputTokenProps = mergeProps({
        className: cx('inputToken')
      }, ptm('inputToken'));
      var inputProps = mergeProps(_objectSpread({
        id: props.inputId,
        ref: inputRef,
        'aria-autocomplete': 'list',
        'aria-controls': ariaControls,
        'aria-expanded': overlayVisibleState,
        'aria-haspopup': 'listbox',
        autoComplete: 'off',
        className: props.inputClassName,
        disabled: props.disabled,
        maxLength: props.maxLength,
        name: props.name,
        onBlur: onMultiInputBlur,
        onChange: allowMoreValues ? onInputChange : undefined,
        onFocus: onMultiInputFocus,
        onKeyDown: allowMoreValues ? onInputKeyDown : undefined,
        onKeyPress: props.onKeyPress,
        onKeyUp: props.onKeyUp,
        placeholder: allowMoreValues ? props.placeholder : undefined,
        readOnly: props.readOnly || !allowMoreValues,
        required: props.required,
        role: 'combobox',
        style: props.inputStyle,
        tabIndex: props.tabIndex,
        type: props.type
      }, ariaProps), ptm('input'));
      return /*#__PURE__*/React__namespace.createElement("li", inputTokenProps, /*#__PURE__*/React__namespace.createElement("input", inputProps));
    };
    var createMultipleAutoComplete = function createMultipleAutoComplete() {
      var allowMoreValues = isAllowMoreValues();
      var tokens = createChips();
      var input = createMultiInput(allowMoreValues);
      var containerProps = mergeProps({
        ref: multiContainerRef,
        className: cx('container', {
          context: context
        }),
        onClick: allowMoreValues ? onMultiContainerClick : undefined,
        onContextMenu: props.onContextMenu,
        onMouseDown: props.onMouseDown,
        onDoubleClick: props.onDblClick,
        'data-p-focus': focusedState,
        'data-p-disabled': props.disabled
      }, ptm('container'));
      return /*#__PURE__*/React__namespace.createElement("ul", containerProps, tokens, input);
    };
    var createDropdown = function createDropdown() {
      if (props.dropdown) {
        var ariaLabel = props.dropdownAriaLabel || props.placeholder || PrimeReact.localeOption('choose');
        return /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          icon: props.dropdownIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, null),
          className: cx('dropdownButton'),
          disabled: props.disabled,
          onClick: onDropdownClick,
          "aria-label": ariaLabel,
          pt: ptm('dropdownButton'),
          __parentMetadata: {
            parent: metaData
          }
        });
      }
      return null;
    };
    var createLoader = function createLoader() {
      if (searchingState) {
        var loadingIconProps = mergeProps({
          className: cx('loadingIcon')
        }, ptm('loadingIcon'));
        var icon = props.loadingIcon || /*#__PURE__*/React__namespace.createElement(spinner.SpinnerIcon, _extends({}, loadingIconProps, {
          spin: true
        }));
        var loaderIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, loadingIconProps), {
          props: props
        });
        return loaderIcon;
      }
      return null;
    };
    var createInput = function createInput() {
      return props.multiple ? createMultipleAutoComplete() : createSimpleAutoComplete();
    };
    var listId = idState + '_list';
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = AutoCompleteBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var loader = createLoader();
    var input = createInput();
    var dropdown = createDropdown();
    var rootProps = mergeProps({
      id: idState,
      ref: elementRef,
      style: props.style,
      className: utils.classNames(props.className, cx('root', {
        focusedState: focusedState
      }))
    }, otherProps, ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", rootProps, input, loader, dropdown, /*#__PURE__*/React__namespace.createElement(AutoCompletePanel, _extends({
      hostName: "AutoComplete",
      ref: overlayRef,
      virtualScrollerRef: virtualScrollerRef
    }, props, {
      listId: listId,
      onItemClick: selectItem,
      selectedItem: selectedItem,
      onClick: onPanelClick,
      getOptionGroupLabel: getOptionGroupLabel,
      getOptionGroupChildren: getOptionGroupChildren,
      "in": overlayVisibleState,
      onEnter: onOverlayEnter,
      onEntering: onOverlayEntering,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited,
      ptm: ptm,
      cx: cx,
      sx: sx
    }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip,
      pt: ptm('tooltip')
    }, props.tooltipOptions)));
  }));
  AutoComplete.displayName = 'AutoComplete';

  exports.AutoComplete = AutoComplete;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.componentbase, primereact.hooks, primereact.icons.chevrondown, primereact.icons.spinner, primereact.icons.timescircle, primereact.inputtext, primereact.overlayservice, primereact.tooltip, primereact.utils, primereact.csstransition, primereact.portal, primereact.ripple, primereact.virtualscroller);
