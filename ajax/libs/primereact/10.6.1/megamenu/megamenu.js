this.primereact = this.primereact || {};
this.primereact.megamenu = (function (exports, React, PrimeReact, componentbase, hooks, angledown, angleright, bars, ripple, utils) {
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

  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
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
        mobileActiveState = _ref.mobileActiveState;
      return utils.classNames('p-megamenu p-component', {
        'p-megamenu-horizontal': props.orientation === 'horizontal',
        'p-megamenu-vertical': props.orientation === 'vertical',
        'p-megamenu-mobile-active': mobileActiveState
      });
    },
    content: 'p-menuitem-content',
    separator: 'p-menuitem-separator',
    submenuIcon: 'p-submenu-icon',
    action: function action(_ref2) {
      var item = _ref2.item;
      return utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
    },
    submenuItem: function submenuItem(_ref3) {
      var focused = _ref3.focused,
        disabled = _ref3.disabled,
        active = _ref3.active;
      return utils.classNames('p-menuitem', {
        'p-menuitem-active': active,
        'p-focus': focused,
        'p-disabled': disabled
      });
    },
    submenuHeader: function submenuHeader(_ref4) {
      var disabled = _ref4.disabled;
      return utils.classNames('p-megamenu-submenu-header p-submenu-header', {
        'p-disabled': disabled
      });
    },
    submenu: 'p-submenu-list p-megamenu-submenu',
    panel: 'p-megamenu-panel',
    grid: 'p-megamenu-grid',
    icon: 'p-menuitem-icon',
    label: 'p-menuitem-text',
    column: function column(_ref5) {
      var category = _ref5.category;
      var length = category.items ? category.items.length : 0;
      var columnClass;
      switch (length) {
        case 2:
          columnClass = 'p-megamenu-col-6';
          break;
        case 3:
          columnClass = 'p-megamenu-col-4';
          break;
        case 4:
          columnClass = 'p-megamenu-col-3';
          break;
        case 6:
          columnClass = 'p-megamenu-col-2';
          break;
        default:
          columnClass = 'p-megamenu-col-12';
          break;
      }
      return columnClass;
    },
    menuButton: 'p-megamenu-button',
    menuitem: function menuitem(_ref6) {
      var category = _ref6.category,
        activeItemState = _ref6.activeItemState,
        focused = _ref6.focused,
        disabled = _ref6.disabled;
      return utils.classNames('p-menuitem', {
        'p-menuitem-active p-highlight': activeItemState && activeItemState.item === category,
        'p-focus': focused,
        'p-disabled': disabled
      });
    },
    menubar: 'p-megamenu-root-list',
    menu: 'p-megamenu-root-list',
    start: 'p-megamenu-start',
    end: 'p-megamenu-end'
  };
  var styles = "\n@layer primereact {\n    .p-megamenu {\n        display: flex;\n    }\n\n    .p-megamenu-root-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-megamenu-root-list > .p-menuitem {\n        position: relative;\n    }\n\n    .p-megamenu .p-menuitem-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-megamenu .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-megamenu-panel {\n        display: none;\n        position: absolute;\n        width: auto;\n        z-index: 1;\n    }\n\n    .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n        display: block;\n    }\n\n    .p-megamenu-submenu {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    /* Horizontal */\n    .p-megamenu-horizontal {\n        align-items: center;\n    }\n\n    .p-megamenu-horizontal .p-megamenu-root-list {\n        display: flex;\n        align-items: center;\n        flex-wrap: wrap;\n    }\n\n    .p-megamenu-horizontal .p-megamenu-custom,\n    .p-megamenu-horizontal .p-megamenu-end {\n        margin-left: auto;\n        align-self: center;\n    }\n\n    /* Vertical */\n    .p-megamenu-vertical {\n        flex-direction: column;\n    }\n\n    .p-megamenu-vertical .p-megamenu-root-list {\n        flex-direction: column;\n    }\n\n    .p-megamenu-vertical .p-megamenu-root-list > .p-menuitem-active > .p-megamenu-panel {\n        left: 100%;\n        top: 0;\n    }\n\n    .p-megamenu-vertical .p-megamenu-root-list > .p-menuitem > .p-menuitem-content > .p-menuitem-link  > .p-submenu-icon {\n        margin-left: auto;\n    }\n\n    .p-megamenu-grid {\n        display: flex;\n    }\n\n    .p-megamenu-col-2,\n    .p-megamenu-col-3,\n    .p-megamenu-col-4,\n    .p-megamenu-col-6,\n    .p-megamenu-col-12 {\n        flex: 0 0 auto;\n        padding: 0.5rem;\n    }\n\n    .p-megamenu-col-2 {\n        width: 16.6667%;\n    }\n\n    .p-megamenu-col-3 {\n        width: 25%;\n    }\n\n    .p-megamenu-col-4 {\n        width: 33.3333%;\n    }\n\n    .p-megamenu-col-6 {\n        width: 50%;\n    }\n\n    .p-megamenu-col-12 {\n        width: 100%;\n    }\n\n    .p-megamenu-button {\n        display: none;\n        cursor: pointer;\n        align-items: center;\n        justify-content: center;\n        text-decoration: none;\n    }\n}\n";
  var MegaMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'MegaMenu',
      id: null,
      model: null,
      style: null,
      className: null,
      orientation: 'horizontal',
      breakpoint: undefined,
      scrollHeight: '400px',
      start: null,
      submenuIcon: null,
      onFocus: null,
      onBlur: null,
      tabIndex: 0,
      menuIcon: null,
      end: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var MegaMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = MegaMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeItemState = _React$useState4[0],
      setActiveItemState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      focused = _React$useState6[0],
      setFocused = _React$useState6[1];
    var _React$useState7 = React__namespace.useState({
        index: -1,
        key: '',
        parentKey: ''
      }),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      focusedItemInfo = _React$useState8[0],
      setFocusedItemInfo = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      focusedItemId = _React$useState10[0],
      setFocusedItemId = _React$useState10[1];
    var _React$useState11 = React__namespace.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      dirty = _React$useState12[0],
      setDirty = _React$useState12[1];
    var _React$useState13 = React__namespace.useState(null),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      processedItems = _React$useState14[0],
      setProcessedItems = _React$useState14[1];
    var _React$useState15 = React__namespace.useState([]),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      visibleItems = _React$useState16[0],
      setVisibleItems = _React$useState16[1];
    var _React$useState17 = React__namespace.useState(null),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      attributeSelectorState = _React$useState18[0],
      setAttributeSelectorState = _React$useState18[1];
    var _React$useState19 = React__namespace.useState(false),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      mobileActiveState = _React$useState20[0],
      setMobileActiveState = _React$useState20[1];
    var _React$useState21 = React__namespace.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      focusTrigger = _React$useState22[0],
      setFocusTrigger = _React$useState22[1];
    var searchValue = React__namespace.useRef('');
    var searchTimeout = React__namespace.useRef(null);
    var elementRef = React__namespace.useRef(null);
    var menubarRef = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var menuButtonRef = React__namespace.useRef(null);
    var horizontal = props.orientation === 'horizontal';
    var vertical = props.orientation === 'vertical';
    var isMobileMode = hooks.useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
    var _MegaMenuBase$setMeta = MegaMenuBase.setMetaData({
        props: props,
        state: {
          id: idState,
          activeItem: activeItemState && activeItemState.item,
          attributeSelector: attributeSelectorState,
          mobileActive: mobileActiveState
        }
      }),
      ptm = _MegaMenuBase$setMeta.ptm,
      cx = _MegaMenuBase$setMeta.cx,
      isUnstyled = _MegaMenuBase$setMeta.isUnstyled;
    componentbase.useHandleStyle(MegaMenuBase.css.styles, isUnstyled, {
      name: 'megamenu'
    });
    var getPTOptions = function getPTOptions(processedItem, key, index) {
      return ptm(key, {
        context: {
          active: isItemActive(processedItem),
          focused: isItemFocused(processedItem),
          disabled: isItemDisabled(processedItem),
          item: processedItem,
          index: index
        }
      });
    };
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (isOutsideClicked(event)) {
            hide();
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentClickListener = _useEventListener2[0],
      unbindDocumentClickListener = _useEventListener2[1];
    var _useResizeListener = hooks.useResizeListener({
        type: 'resize',
        listener: function listener() {
          hide();
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
      bindDocumentResizeListener = _useResizeListener2[0],
      unbindDocumentResizeListener = _useResizeListener2[1];
    var bindListeners = function bindListeners() {
      bindDocumentClickListener();
      bindDocumentResizeListener();
    };
    var unbindListeners = function unbindListeners() {
      unbindDocumentClickListener();
      unbindDocumentResizeListener();
    };
    var onLeafClick = function onLeafClick(event) {
      var originalEvent = event.originalEvent,
        processedItem = event.processedItem;
      var item = processedItem.item;
      if (item.disabled) {
        originalEvent.preventDefault();
        return;
      }
      if (!item.url) {
        originalEvent.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: originalEvent,
          item: item
        });
      }
      var grouped = isProccessedItemGroup(processedItem);
      var selected = isSelected(processedItem);
      if (selected) {
        var index = processedItem.index,
          key = processedItem.key,
          parentKey = processedItem.parentKey;
        setActiveItemState(null);
        setFocusedItemInfo({
          index: index,
          key: key,
          parentKey: parentKey
        });
      } else if (grouped) {
        onItemChange(event);
      } else {
        var rootProcessedItemIndex = activeItemState ? activeItemState.index : -1;
        var rootProcessedItemKey = activeItemState ? activeItemState.key : '';
        hide(originalEvent);
        setFocusedItemInfo({
          index: rootProcessedItemIndex,
          key: rootProcessedItemKey,
          parentKey: ''
        });
        setMobileActiveState(false);
      }
    };
    var onItemChange = function onItemChange(event) {
      var processedItem = event.processedItem,
        isFocus = event.isFocus;
      if (utils.ObjectUtils.isEmpty(processedItem)) {
        return;
      }
      var index = processedItem.index,
        key = processedItem.key,
        parentKey = processedItem.parentKey,
        items = processedItem.items;
      var grouped = utils.ObjectUtils.isNotEmpty(items);
      grouped && setActiveItemState(processedItem);
      setFocusedItemInfo({
        index: index,
        key: key,
        parentKey: parentKey
      });
      grouped && setDirty(true);
      isFocus && utils.DomHandler.focus(menubarRef.current);
    };
    var onCategoryMouseEnter = function onCategoryMouseEnter(event) {
      if (!mobileActiveState && dirty) {
        onItemChange(event);
      }
    };
    var onCategoryClick = function onCategoryClick(event) {
      var originalEvent = event.originalEvent,
        processedItem = event.processedItem;
      var item = processedItem.item;
      if (item.disabled) {
        originalEvent.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: originalEvent,
          item: props.item
        });
      }
      if (!item.url) {
        originalEvent.preventDefault();
        originalEvent.stopPropagation();
      }
      var grouped = isProccessedItemGroup(processedItem);
      var root = utils.ObjectUtils.isEmpty(processedItem.parent);
      var selected = isSelected(processedItem);
      if (selected) {
        var index = processedItem.index,
          key = processedItem.key,
          parentKey = processedItem.parentKey;
        setActiveItemState(null);
        setFocusedItemInfo({
          index: index,
          key: key,
          parentKey: parentKey
        });
        setDirty(!root);
      } else if (grouped) {
        onItemChange(event);
      } else {
        var rootProcessedItem = root ? processedItem : activeItemState;
        hide();
        changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
        setMobileActiveState(false);
        utils.DomHandler.focus(menubarRef.current);
      }
    };
    var show = function show() {
      setFocusedItemInfo({
        index: findFirstFocusedItemIndex(),
        level: 0,
        parentKey: ''
      });
    };
    var hide = function hide(isFocus) {
      if (mobileActiveState) {
        setMobileActiveState(false);
        setTimeout(function () {
          utils.DomHandler.focus(menuButtonRef.current);
        }, 0);
      }
      setActiveItemState(null);
      if (isFocus) {
        setFocusedItemInfo({
          index: -1,
          key: '',
          parentKey: ''
        });
        utils.DomHandler.focus(menubarRef.current);
      }
      setDirty(false);
    };
    var toggle = function toggle(event) {
      event.preventDefault();
      if (mobileActiveState) {
        setMobileActiveState(false);
        utils.ZIndexUtils.clear(menubarRef.current);
        hide();
      } else {
        setMobileActiveState(true);
        utils.ZIndexUtils.set('menu', menubarRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.menu || PrimeReact__default["default"].zIndex.menu);
        setTimeout(function () {
          show();
        }, 1);
      }
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target) || menuButtonRef.current && menuButtonRef.current.contains(event.target));
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      var uniqueId = utils.UniqueComponentId();
      !idState && setIdState(uniqueId);
      if (props.breakpoint) {
        !attributeSelectorState && setAttributeSelectorState(uniqueId);
      }
    });
    hooks.useUpdateEffect(function () {
      if (attributeSelectorState && elementRef.current) {
        elementRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
      return function () {
        destroyStyle();
      };
    }, [attributeSelectorState, props.breakpoint]);
    hooks.useUpdateEffect(function () {
      if (mobileActiveState) {
        bindListeners();
      } else {
        unbindListeners();
      }
    }, [mobileActiveState]);
    hooks.useUpdateEffect(function () {
      if (focusTrigger) {
        var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
        changeFocusedItemInfo(itemIndex);
        setFocusTrigger(false);
      }
    }, [focusTrigger]);
    hooks.useUpdateEffect(function () {
      var currentPanel = utils.DomHandler.findSingle(elementRef.current, '.p-menuitem-active > .p-megamenu-panel');
      if (activeItemState) {
        bindListeners();
        if (!isMobileMode) {
          utils.ZIndexUtils.set('menu', currentPanel, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.menu || PrimeReact__default["default"].zIndex.menu);
        }
      } else {
        unbindListeners();
      }
      if (isMobileMode) {
        currentPanel && currentPanel.previousElementSibling.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
      return function () {
        unbindListeners();
        utils.ZIndexUtils.clear(currentPanel);
      };
    }, [activeItemState, isMobileMode]);
    hooks.useUpdateEffect(function () {
      var _focusedItemId = utils.ObjectUtils.isNotEmpty(focusedItemInfo.key) ? "".concat(idState, "_").concat(focusedItemInfo.key) : null;
      setFocusedItemId(_focusedItemId);
    }, [focusedItemInfo]);
    React__namespace.useEffect(function () {
      var itemsToProcess = props.model || [];
      var processed = createProcessedItems(itemsToProcess, 0, null, '');
      setProcessedItems(processed);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.model]);
    hooks.useUpdateEffect(function () {
      var processedItem = utils.ObjectUtils.isNotEmpty(activeItemState) ? activeItemState : null;
      var _visibleItems = processedItem && processedItem.key === focusedItemInfo.parentKey ? processedItem.items.reduce(function (items, col) {
        col.forEach(function (submenu) {
          submenu.items.forEach(function (a) {
            items.push(a);
          });
        });
        return items;
      }, []) : processedItems;
      setVisibleItems(_visibleItems);
    }, [focusedItemInfo, activeItemState, processedItems]);
    var onFocus = function onFocus(event) {
      setFocused(true);
      if (focusedItemInfo.index === -1) {
        var index = findFirstFocusedItemIndex();
        var processedItem = findVisibleItem(index);
        setFocusedItemInfo({
          index: index,
          key: processedItem.key,
          parentKey: processedItem.parentKey
        });
      }
      props.onFocus && props.onFocus(event);
    };
    var onBlur = function onBlur(event) {
      setFocused(false);
      setFocusedItemInfo({
        index: -1,
        key: '',
        parentKey: ''
      });
      searchValue.current = '';
      setDirty(false);
      props.onBlur && props.onBlur(event);
    };
    var onKeyDown = function onKeyDown(event) {
      var metaKey = event.metaKey || event.ctrlKey;
      switch (event.code) {
        case 'ArrowDown':
          onArrowDownKey(event);
          break;
        case 'ArrowUp':
          onArrowUpKey(event);
          break;
        case 'ArrowLeft':
          onArrowLeftKey(event);
          break;
        case 'ArrowRight':
          onArrowRightKey(event);
          break;
        case 'Home':
          onHomeKey(event);
          break;
        case 'End':
          onEndKey(event);
          break;
        case 'Space':
          onSpaceKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
          onEnterKey(event);
          break;
        case 'Escape':
          onEscapeKey(event);
          break;
        case 'Tab':
          onTabKey(event);
          break;
        case 'PageDown':
        case 'PageUp':
        case 'Backspace':
        case 'ShiftLeft':
        case 'ShiftRight':
          //NOOP
          break;
        default:
          if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
            searchItems(event, event.key);
          }
          break;
      }
    };
    var onArrowDownKey = function onArrowDownKey(event) {
      event.preventDefault();
      if (horizontal) {
        var _focusedItemInfo = focusedItemInfo;
        if (utils.ObjectUtils.isNotEmpty(activeItemState) && activeItemState.key === focusedItemInfo.key) {
          (({
            index: -1,
            key: '',
            parentKey: activeItemState.key
          })), _readOnlyError("_focusedItemInfo");
          setFocusedItemInfo(_focusedItemInfo);
        } else {
          var processedItem = findVisibleItem(focusedItemInfo.index);
          var grouped = isProccessedItemGroup(processedItem);
          if (grouped) {
            onItemChange({
              originalEvent: event,
              processedItem: processedItem
            });
            (({
              index: -1,
              key: processedItem.key,
              parentKey: processedItem.parentKey
            })), _readOnlyError("_focusedItemInfo");
            setFocusedItemInfo(_focusedItemInfo);
            searchValue.current = '';
          }
        }
        setTimeout(function () {
          return setFocusTrigger(true);
        }, 0);
      } else {
        var itemIndex = focusedItemInfo.index !== -1 ? findNextItemIndex(focusedItemInfo.index) : findFirstFocusedItemIndex();
        changeFocusedItemInfo(itemIndex);
      }
    };
    var onArrowUpKey = function onArrowUpKey(event) {
      var processedItem = findVisibleItem(focusedItemInfo.index);
      var grouped = isProccessedItemGroup(processedItem);
      if (event.altKey && horizontal) {
        if (focusedItemInfo.index !== -1) {
          if (!grouped && utils.ObjectUtils.isNotEmpty(activeItemState)) {
            if (focusedItemInfo.index === 0) {
              setFocusedItemInfo({
                index: activeItemState.index,
                key: activeItemState.key,
                parentKey: activeItemState.parentKey
              });
              setActiveItemState(null);
            } else {
              changeFocusedItemInfo(findFirstItemIndex());
            }
          }
        }
      } else {
        var itemIndex = focusedItemInfo.index !== -1 ? findPrevItemIndex(focusedItemInfo.index) : findLastFocusedItemIndex();
        changeFocusedItemInfo(itemIndex);
      }
      event.preventDefault();
    };
    var onArrowLeftKey = function onArrowLeftKey(event) {
      var processedItem = findVisibleItem(focusedItemInfo.index);
      var grouped = isProccessedItemGroup(processedItem);
      if (grouped) {
        if (horizontal) {
          var itemIndex = focusedItemInfo.index !== -1 ? findPrevItemIndex(focusedItemInfo.index) : findLastFocusedItemIndex();
          changeFocusedItemInfo(itemIndex);
        }
      } else {
        if (vertical && utils.ObjectUtils.isNotEmpty(activeItemState)) {
          if (processedItem.columnIndex === 0) {
            setFocusedItemInfo({
              index: activeItemState.index,
              key: activeItemState.key,
              parentKey: activeItemState.parentKey
            });
            setActiveItemState(null);
          }
        }
        var columnIndex = processedItem.columnIndex - 1;
        var _itemIndex = visibleItems.findIndex(function (item) {
          return item.columnIndex === columnIndex;
        });
        _itemIndex !== -1 && changeFocusedItemInfo(_itemIndex);
      }
      event.preventDefault();
    };
    var onArrowRightKey = function onArrowRightKey(event) {
      event.preventDefault();
      var processedItem = findVisibleItem(focusedItemInfo.index);
      var grouped = isProccessedItemGroup(processedItem);
      if (grouped) {
        if (vertical) {
          if (utils.ObjectUtils.isNotEmpty(activeItemState) && activeItemState.key === processedItem.key) {
            setFocusedItemInfo({
              index: -1,
              key: '',
              parentKey: activeItemState.key
            });
          } else {
            var _processedItem = findVisibleItem(focusedItemInfo.index);
            var _grouped = isProccessedItemGroup(_processedItem);
            if (_grouped) {
              onItemChange({
                originalEvent: event,
                processedItem: _processedItem
              });
              setFocusedItemInfo({
                index: -1,
                key: _processedItem.key,
                parentKey: _processedItem.parentKey
              });
              searchValue.current = '';
            }
          }
        }
        setTimeout(function () {
          return setFocusTrigger(true);
        }, 0);
      } else {
        var columnIndex = processedItem.columnIndex + 1;
        var itemIndex = visibleItems.findIndex(function (item) {
          return item.columnIndex === columnIndex;
        });
        itemIndex !== -1 && changeFocusedItemInfo(itemIndex);
      }
    };
    var onHomeKey = function onHomeKey(event) {
      changeFocusedItemInfo(findFirstItemIndex());
      event.preventDefault();
    };
    var onEndKey = function onEndKey(event) {
      changeFocusedItemInfo(findLastItemIndex());
      event.preventDefault();
    };
    var onEnterKey = function onEnterKey(event) {
      if (focusedItemInfo.index !== -1) {
        var element = utils.DomHandler.findSingle(menubarRef.current, "li[id=\"".concat(focusedItemId, "\"]"));
        var anchorElement = element && utils.DomHandler.findSingle(element, 'a[data-pc-section="action"]');
        anchorElement ? anchorElement.click() : element && element.click();
      }
      event.preventDefault();
    };
    var onSpaceKey = function onSpaceKey(event) {
      onEnterKey(event);
    };
    var onEscapeKey = function onEscapeKey(event) {
      if (utils.ObjectUtils.isNotEmpty(activeItemState)) {
        setFocusedItemInfo({
          index: activeItemState.index,
          key: activeItemState.key
        });
        setActiveItemState(null);
      }
      event.preventDefault();
    };
    var onTabKey = function onTabKey(event) {
      if (focusedItemInfo.index !== -1) {
        var processedItem = findVisibleItem(focusedItemInfo.index);
        var grouped = isProccessedItemGroup(processedItem);
        !grouped && onItemChange({
          originalEvent: event,
          processedItem: processedItem
        });
      }
      hide();
    };
    var isItemMatched = function isItemMatched(processedItem) {
      var label = getProccessedItemLabel(processedItem);
      return isValidItem(processedItem) && label && label.toLocaleLowerCase().startsWith(searchValue.current.toLocaleLowerCase());
    };
    var isValidItem = function isValidItem(processedItem) {
      return !!processedItem && !isItemDisabled(processedItem.item) && !isItemSeparator(processedItem.item);
    };
    var isValidSelectedItem = function isValidSelectedItem(processedItem) {
      return isValidItem(processedItem) && isSelected(processedItem);
    };
    var isSelected = function isSelected(processedItem) {
      return utils.ObjectUtils.isNotEmpty(activeItemState) ? activeItemState.key === processedItem.key : false;
    };
    var findFirstItemIndex = function findFirstItemIndex() {
      return visibleItems.findIndex(function (processedItem) {
        return isValidItem(processedItem);
      });
    };
    var findLastItemIndex = function findLastItemIndex() {
      return utils.ObjectUtils.findLastIndex(visibleItems, function (processedItem) {
        return isValidItem(processedItem);
      });
    };
    var findNextItemIndex = function findNextItemIndex(index) {
      var matchedItemIndex = index < visibleItems.length - 1 ? visibleItems.slice(index + 1).findIndex(function (processedItem) {
        return isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    };
    var findPrevItemIndex = function findPrevItemIndex(index) {
      var matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(visibleItems.slice(0, index), function (processedItem) {
        return isValidItem(processedItem);
      }) : -1;
      return matchedItemIndex > -1 ? matchedItemIndex : index;
    };
    var findSelectedItemIndex = function findSelectedItemIndex() {
      return visibleItems && visibleItems.findIndex(function (processedItem) {
        return isValidSelectedItem(processedItem);
      });
    };
    var findFirstFocusedItemIndex = function findFirstFocusedItemIndex() {
      var selectedIndex = findSelectedItemIndex();
      return selectedIndex < 0 ? findFirstItemIndex() : selectedIndex;
    };
    var findLastFocusedItemIndex = function findLastFocusedItemIndex() {
      var selectedIndex = findSelectedItemIndex();
      return selectedIndex < 0 ? findLastItemIndex() : selectedIndex;
    };
    var findVisibleItem = function findVisibleItem(index) {
      return utils.ObjectUtils.isNotEmpty(visibleItems) ? visibleItems[index] : null;
    };
    var getProccessedItemLabel = function getProccessedItemLabel(processedItem) {
      return processedItem && processedItem.item ? getItemLabel(processedItem) : undefined;
    };
    var searchItems = function searchItems(event, _char) {
      searchValue.current = (searchValue.current || '') + _char;
      var itemIndex = -1;
      var matched = false;
      if (focusedItemInfo.index !== -1) {
        itemIndex = visibleItems.slice(focusedItemInfo.index).findIndex(function (processedItem) {
          return isItemMatched(processedItem);
        });
        itemIndex = itemIndex === -1 ? visibleItems.slice(0, focusedItemInfo.index).findIndex(function (processedItem) {
          return isItemMatched(processedItem);
        }) : itemIndex + focusedItemInfo.index;
      } else {
        itemIndex = visibleItems.findIndex(function (processedItem) {
          return isItemMatched(processedItem);
        });
      }
      if (itemIndex !== -1) {
        matched = true;
      }
      if (itemIndex === -1 && focusedItemInfo.index === -1) {
        itemIndex = findFirstFocusedItemIndex();
      }
      if (itemIndex !== -1) {
        changeFocusedItemInfo(itemIndex);
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout.current = setTimeout(function () {
        searchValue.current = '';
        searchTimeout.current = null;
      }, 500);
      return matched;
    };
    var changeFocusedItemInfo = function changeFocusedItemInfo(index) {
      var processedItem = findVisibleItem(index);
      var key = utils.ObjectUtils.isNotEmpty(processedItem) ? processedItem.key : '';
      setFocusedItemInfo(_objectSpread(_objectSpread({}, focusedItemInfo), {}, {
        index: index,
        key: key
      }));
      scrollInView();
    };
    var scrollInView = function scrollInView() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var id = index !== -1 ? "".concat(idState, "_").concat(index) : focusedItemId;
      var element = utils.DomHandler.findSingle(menubarRef.current, "li[id=\"".concat(id, "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    };
    var getItemId = function getItemId(processedItem) {
      return "".concat(idState, "_").concat(processedItem.key);
    };
    var getItemProp = function getItemProp(processedItem, name, params) {
      return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    };
    var getItemLabel = function getItemLabel(processedItem) {
      return getItemProp(processedItem, 'label');
    };
    var isItemActive = function isItemActive(processedItem) {
      return utils.ObjectUtils.isNotEmpty(activeItemState) ? activeItemState.key === processedItem.key : false;
    };
    var isItemVisible = function isItemVisible(processedItem) {
      return getItemProp(processedItem, 'visible') !== false;
    };
    var isItemDisabled = function isItemDisabled(processedItem) {
      return getItemProp(processedItem, 'disabled');
    };
    var isItemFocused = function isItemFocused(processedItem) {
      return focusedItemId === getItemId(processedItem);
    };
    var isItemGroup = function isItemGroup(processedItem) {
      return utils.ObjectUtils.isNotEmpty(processedItem.items);
    };
    var isItemSeparator = function isItemSeparator(item) {
      return getItemProp(item, 'separator');
    };
    var isProccessedItemGroup = function isProccessedItemGroup(processedItem) {
      return processedItem && utils.ObjectUtils.isNotEmpty(processedItem.items);
    };
    var getAriaSetSize = function getAriaSetSize() {
      return props.model.filter(function (processedItem) {
        return isItemVisible(processedItem) && !getItemProp(processedItem, 'separator');
      }).length;
    };
    var getAriaPosInset = function getAriaPosInset(index) {
      return index - props.model.slice(0, index).filter(function (processedItem) {
        return isItemVisible(processedItem) && getItemProp(processedItem, 'separator');
      }).length + 1;
    };
    var createProcessedItems = function createProcessedItems(items) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var columnIndex = arguments.length > 4 ? arguments[4] : undefined;
      var _processedItems = [];
      items && items.forEach(function (item, index) {
        var key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
        var newItem = {
          item: item,
          index: index,
          level: level,
          key: key,
          parent: parent,
          parentKey: parentKey,
          columnIndex: columnIndex !== undefined ? columnIndex : parent && parent.columnIndex !== undefined ? parent.columnIndex : index
        };
        newItem.items = level === 0 && item.items && item.items.length > 0 ? item.items.map(function (_items, _index) {
          return createProcessedItems(_items, level + 1, newItem, key, _index);
        }) : createProcessedItems(item.items, level + 1, newItem, key);
        _processedItems.push(newItem);
      });
      return _processedItems;
    };
    var createSeparator = function createSeparator(index) {
      var key = idState + '_separator__' + index;
      var separatorProps = mergeProps({
        id: key,
        key: key,
        className: cx('separator'),
        role: 'separator'
      }, ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createSubmenuIcon = function createSubmenuIcon(item) {
      if (item.items) {
        var submenuIconProps = mergeProps({
          className: cx('submenuIcon')
        }, ptm('submenuIcon'));
        var icon = vertical ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, submenuIconProps);
        var submenuIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, submenuIconProps), {
          props: props
        });
        return submenuIcon;
      }
      return null;
    };
    var createSubmenuItem = function createSubmenuItem(processedItem, index) {
      var item = processedItem.item;
      if (item.visible === false) {
        return null;
      }
      if (item.separator) {
        return createSeparator(index);
      }
      var key = getItemId(processedItem);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconProps = mergeProps({
        className: utils.classNames(item.icon, cx('icon'))
      }, ptm('icon'));
      var labelProps = mergeProps({
        className: cx('label')
      }, ptm('label'));
      var iconClassName = utils.classNames(item.icon, 'p-menuitem-icon');
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var actionProps = mergeProps({
        href: item.url || '#',
        className: cx('action', {
          item: item
        }),
        target: item.target,
        tabIndex: '-1',
        'aria-hidden': true
      }, getPTOptions(processedItem, 'action', index));
      var isFocused = isItemFocused(processedItem);
      var isDisabled = isItemDisabled(processedItem);
      var isGroup = isItemGroup(processedItem);
      var isActive = isItemActive(processedItem);
      var submenuItemProps = mergeProps({
        key: key,
        id: key,
        'aria-label': getItemLabel(processedItem),
        'aria-disabled': isDisabled,
        'aria-haspopup': isGroup ? 'menu' : undefined,
        'aria-level': '2',
        'aria-expanded': isGroup ? isActive : undefined,
        'aria-setsize': getAriaSetSize(),
        'aria-posinset': getAriaPosInset(index),
        'data-p-highlight': isActive,
        'data-p-disabled': isDisabled,
        'data-p-focused': isFocused,
        className: utils.classNames(item.className, cx('submenuItem', {
          focused: isFocused,
          disabled: isDisabled,
          active: isActive
        })),
        style: item.style,
        role: 'menuitem'
      }, getPTOptions(processedItem, 'submenuItem', index));
      var contentProps = mergeProps({
        onClick: function onClick(event) {
          return onLeafClick({
            originalEvent: event,
            processedItem: processedItem
          });
        },
        className: cx('content')
      }, getPTOptions(processedItem, 'content', index));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (item.template) {
        var defaultContentOptions = {
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("li", submenuItemProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, content));
    };
    var createSubmenu = function createSubmenu(submenu, index) {
      if (!isItemVisible(submenu)) {
        return null;
      }
      var items = submenu.items.map(createSubmenuItem);
      var key = submenu.id || idState + '_sub_' + index;
      var label = getItemLabel(submenu);
      var isDisabled = isItemDisabled(submenu);
      var submenuHeaderProps = mergeProps({
        id: key,
        key: key,
        className: utils.classNames(submenu.className, cx('submenuHeader', {
          disabled: isDisabled
        })),
        style: submenu.style,
        role: 'presentation',
        'data-p-disabled': isDisabled
      }, ptm('submenuHeader'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: key
      }, /*#__PURE__*/React__namespace.createElement("li", submenuHeaderProps, label), items);
    };
    var createSubmenus = function createSubmenus(column) {
      return column.map(createSubmenu);
    };
    var createColumn = function createColumn(processedItem, processedColumn, index) {
      var category = processedItem.item;
      var key = category.label + '_column_' + index;
      var submenus = createSubmenus(processedColumn);
      var columnProps = mergeProps({
        key: key,
        className: cx('column', {
          category: category
        })
      }, ptm('column'));
      var display = activeItemState && activeItemState.item === category ? 'block' : 'none';
      var submenuProps = mergeProps({
        role: 'menu',
        tabIndex: props.disabled ? null : props.tabIndex || '0',
        className: cx('submenu'),
        style: {
          display: display
        }
      }, ptm('submenu'));
      return /*#__PURE__*/React__namespace.createElement("div", columnProps, /*#__PURE__*/React__namespace.createElement("ul", submenuProps, submenus));
    };
    var createColumns = function createColumns(category) {
      if (category.items) {
        return category.items.map(function (column, index) {
          return createColumn(category, column, index);
        });
      }
      return null;
    };
    var createCategoryPanel = function createCategoryPanel(processedItem) {
      var category = processedItem.item;
      if (category.items) {
        var columns = createColumns(processedItem);
        var panelProps = mergeProps({
          className: cx('panel')
        }, ptm('panel'));
        var gridProps = mergeProps({
          className: cx('grid')
        }, ptm('grid'));
        return /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", gridProps, columns));
      }
      return null;
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
        var selector = "".concat(attributeSelectorState);
        var innerHTML = "\n                    @media screen and (max-width: ".concat(props.breakpoint, ") {\n                        .p-megamenu[").concat(selector, "] > .p-megamenu-root-list .p-menuitem-active .p-megamenu-panel {\n                            position: relative;\n                            left: 0;\n                            box-shadow: none;\n                            border-radius: 0;\n                            background: inherit;\n                        }\n\n                        .p-megamenu[").concat(selector, "] {\n                            width: 100%;\n                            position: relative;\n                            padding: 0.5rem;\n                        }\n\n                        .p-megamenu[").concat(selector, "] .p-megamenu-grid {\n                            flex-wrap: wrap;\n                        }\n\n                        .p-megamenu[").concat(selector, "] .p-megamenu-button {\n                            display: flex;\n                        }\n\n                        .p-megamenu[").concat(selector, "] .p-megamenu-root-list {\n                            display: none;\n                        }\n\n                        .p-megamenu[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n                            width: 100%;\n                        }\n\n                        .p-megamenu[").concat(selector, "].p-megamenu-mobile-active .p-megamenu-root-list {\n                            left: 0;\n                            top: 100%;\n                            z-index: 1;\n                            width: 100%;\n                            display: flex;\n                            padding: 0.5rem 0;\n                            position: absolute;\n                            flex-direction: column;\n                        }\n\n                        .p-megamenu[").concat(selector, "] .p-menuitem  > .p-menuitem-content >  .p-menuitem-link > .p-submenu-icon {\n                            margin-left: auto;\n                        }\n                        \n                        .p-megamenu[").concat(selector, "] .p-submenu-list .p-menuitem-content .p-menuitem-link {\n                            padding-left: 2.25rem;\n                        }\n\n                        ").concat(horizontal ? "\n                                    .p-megamenu[".concat(selector, "] .p-menuitem-active  > .p-menuitem-content >  .p-menuitem-link > .p-submenu-icon {\n                                        transform: rotate(-180deg);\n                                    }\n                            ") : '', "\n\n                        ").concat(vertical ? "                                                                   \n                                    .p-megamenu[".concat(selector, "] .p-menuitem  > .p-menuitem-content >  .p-menuitem-link > .p-submenu-icon {\n                                        transform: rotate(90deg);\n                                    }\n\n                                    .p-megamenu[").concat(selector, "] .p-menuitem-active  > .p-menuitem-content >  .p-menuitem-link > .p-submenu-icon {\n                                        transform: rotate(-90deg);\n                                    }\n                            ") : '', "\n                    }\n                ");
        styleElementRef.current.innerHTML = innerHTML;
      }
    };
    var destroyStyle = function destroyStyle() {
      styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
    };
    var createCategory = function createCategory(processedItem, index) {
      var category = processedItem.item;
      var iconProps = mergeProps({
        className: cx('icon')
      }, getPTOptions(processedItem, 'icon', index));
      var icon = utils.IconUtils.getJSXIcon(category.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = mergeProps({
        className: cx('label')
      }, getPTOptions(processedItem, 'label', index));
      var label = category.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, category.label);
      var submenuIcon = createSubmenuIcon(category);
      var panel = createCategoryPanel(processedItem);
      var headerActionProps = mergeProps({
        href: category.url || '#',
        className: cx('action', {
          item: category
        }),
        target: category.target,
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        tabIndex: '-1',
        'aria-hidden': true
      }, getPTOptions(processedItem, 'action', index));
      var itemContent = category.template ? utils.ObjectUtils.getJSXElement(category.template, category, headerActionProps) : /*#__PURE__*/React__namespace.createElement("a", headerActionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      var key = getItemId(processedItem);
      var isFocused = isItemFocused(processedItem);
      var isDisabled = isItemDisabled(processedItem);
      var menuItemProps = mergeProps(_defineProperty({
        key: key,
        id: key,
        className: utils.classNames(category.className, cx('menuitem', {
          category: category,
          activeItemState: activeItemState,
          focused: isFocused,
          disabled: isDisabled
        })),
        'aria-label': getItemLabel(category),
        'aria-level': '1',
        'aria-setsize': getAriaSetSize(),
        'aria-posinset': getAriaPosInset(index),
        'aria-expanded': isItemGroup(processedItem) ? isItemActive(processedItem) : undefined,
        'aria-haspopup': isItemGroup(processedItem) ? 'menu' : undefined,
        'aria-disabled': isItemDisabled(processedItem),
        'data-p-highlight': isItemActive(category),
        'data-p-disabled': isDisabled,
        'data-p-focused': isFocused,
        style: category.style,
        role: 'menuitem'
      }, "data-p-disabled", category.disabled || false), getPTOptions(processedItem, 'menuitem', index));
      var contentProps = mergeProps({
        onClick: function onClick(event) {
          return onCategoryClick({
            originalEvent: event,
            processedItem: processedItem
          });
        },
        onMouseEnter: function onMouseEnter(e) {
          return onCategoryMouseEnter({
            originalEvent: e,
            processedItem: processedItem
          });
        },
        className: cx('content')
      }, getPTOptions(processedItem, 'content', index));
      return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, itemContent), panel);
    };
    var createMenu = function createMenu() {
      var menuProps = mergeProps({
        ref: menubarRef,
        tabIndex: props.disabled ? null : props.tabIndex || '0',
        className: cx('menu'),
        onFocus: onFocus,
        onBlur: onBlur,
        onKeyDown: onKeyDown,
        'aria-label': props.ariaLabel,
        'aria-labelledby': props.ariaLabelledBy,
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        'aria-activedescendant': focused ? focusedItemId : null,
        id: idState + '_list',
        role: 'menubar'
      }, ptm('menu'));
      if (processedItems) {
        return /*#__PURE__*/React__namespace.createElement("ul", menuProps, processedItems.map(function (item, index) {
          return createCategory(item, index);
        }));
      }
      return null;
    };
    var createStartContent = function createStartContent() {
      var startProps = mergeProps({
        className: cx('start')
      }, ptm('start'));
      if (props.start) {
        var _start = utils.ObjectUtils.getJSXElement(props.start, props);
        return /*#__PURE__*/React__namespace.createElement("div", startProps, _start);
      }
      return null;
    };
    var createEndContent = function createEndContent() {
      var endProps = mergeProps({
        className: cx('end')
      }, ptm('end'));
      if (props.end) {
        var _end = utils.ObjectUtils.getJSXElement(props.end, props);
        return /*#__PURE__*/React__namespace.createElement("div", endProps, _end);
      }
      return null;
    };
    var createMenuButton = function createMenuButton() {
      if (props.model && props.model.length < 1) {
        return null;
      }
      var menuButtonProps = mergeProps({
        className: cx('menuButton'),
        href: '#',
        role: 'button',
        'aria-haspopup': props.model && props.model.length > 0 ? true : false,
        'aria-expanded': mobileActiveState,
        'aria-controls': idState,
        'aria-label': PrimeReact.ariaLabel('navigation'),
        tabIndex: 0,
        onClick: function onClick(e) {
          return toggle(e);
        }
      }, ptm('menuButton'));
      var menuButtonIconProps = mergeProps(ptm('menuButtonIcon'));
      var icon = props.menuIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, menuButtonIconProps);
      var menuIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, menuButtonIconProps), {
        props: props
      });
      /* eslint-disable */
      var button = /*#__PURE__*/React__namespace.createElement("a", _extends({
        ref: menuButtonRef
      }, menuButtonProps), menuIcon);
      /* eslint-enable */

      return button;
    };
    var rootProps = mergeProps({
      className: utils.classNames(props.className, cx('root', {
        mobileActiveState: mobileActiveState
      })),
      id: idState,
      style: props.style
    }, MegaMenuBase.getOtherProps(props), ptm('root'));
    var menu = createMenu();
    var start = createStartContent();
    var end = createEndContent();
    var menuButton = createMenuButton();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef
    }, rootProps), start, menuButton, menu, end);
  }));
  MegaMenu.displayName = 'MegaMenu';

  exports.MegaMenu = MegaMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.icons.angledown, primereact.icons.angleright, primereact.icons.bars, primereact.ripple, primereact.utils);
