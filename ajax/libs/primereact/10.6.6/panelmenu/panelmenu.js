this.primereact = this.primereact || {};
this.primereact.panelmenu = (function (exports, React, api, componentbase, csstransition, hooks, chevrondown, chevronright, utils, ripple) {
  'use strict';

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
    headerIcon: function headerIcon(_ref) {
      var item = _ref.item;
      return utils.classNames('p-menuitem-icon', item.icon);
    },
    headerSubmenuIcon: 'p-submenu-icon',
    headerLabel: 'p-menuitem-text',
    headerAction: 'p-panelmenu-header-link',
    panel: function panel(_ref2) {
      var item = _ref2.item;
      return utils.classNames('p-panelmenu-panel', item.className);
    },
    header: function header(_ref3) {
      var active = _ref3.active,
        item = _ref3.item;
      return utils.classNames('p-component p-panelmenu-header', {
        'p-highlight': active && !!item.items,
        'p-disabled': item.disabled
      });
    },
    headerContent: 'p-panelmenu-header-content',
    menuContent: 'p-panelmenu-content',
    root: 'p-panelmenu p-component',
    separator: 'p-menuitem-separator',
    toggleableContent: function toggleableContent(_ref4) {
      var active = _ref4.active;
      return utils.classNames('p-toggleable-content', {
        'p-toggleable-content-collapsed': !active
      });
    },
    icon: function icon(_ref5) {
      var item = _ref5.item;
      return utils.classNames('p-menuitem-icon', item.icon);
    },
    label: 'p-menuitem-text',
    submenuicon: 'p-submenu-icon',
    content: 'p-menuitem-content',
    action: function action(_ref6) {
      var item = _ref6.item;
      return utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
    },
    menuitem: function menuitem(_ref7) {
      var item = _ref7.item,
        focused = _ref7.focused,
        disabled = _ref7.disabled;
      return utils.classNames('p-menuitem', item.className, {
        'p-focus': focused,
        'p-disabled': disabled
      });
    },
    menu: 'p-panelmenu-root-list',
    submenu: 'p-submenu-list',
    transition: 'p-toggleable-content'
  };
  var styles = "\n@layer primereact {\n    .p-panelmenu .p-panelmenu-header-link {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        position: relative;\n        text-decoration: none;\n    }\n\n    .p-panelmenu .p-panelmenu-header-link:focus {\n        z-index: 1;\n    }\n\n    .p-panelmenu .p-submenu-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .p-panelmenu .p-menuitem-link {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        text-decoration: none;\n        text-decoration: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .p-panelmenu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
  var PanelMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'PanelMenu',
      id: null,
      model: null,
      style: null,
      submenuIcon: null,
      expandedKeys: null,
      className: null,
      onExpandedKeysChange: null,
      onOpen: null,
      onClose: null,
      multiple: false,
      transitionOptions: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  /* eslint-disable */
  var useUpdateEffect = function useUpdateEffect(fn, deps) {
    var mounted = React__namespace.useRef(false);
    return React__namespace.useEffect(function () {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      return fn && fn();
    }, deps);
  };
  /* eslint-enable */

  function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var PanelMenuSub = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var ptm = props.ptm,
      cx = props.cx;
    var elementRef = React__namespace.useRef(null);
    var _ptm = function _ptm(key, options) {
      return ptm(key, _objectSpread$2({
        hostName: props.hostName
      }, options));
    };
    var getPTOptions = function getPTOptions(processedItem, key, index) {
      return _ptm(key, {
        context: {
          item: processedItem,
          index: index,
          active: isItemActive(processedItem),
          focused: isItemFocused(processedItem),
          disabled: isItemDisabled(processedItem)
        }
      });
    };
    var getItemId = function getItemId(processedItem) {
      return "".concat(props.panelId, "_").concat(processedItem.key);
    };
    var getItemProp = function getItemProp(processedItem, name, params) {
      return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    };
    var isItemActive = function isItemActive(processedItem) {
      var _processedItem$item;
      return props.activeItemPath && props.activeItemPath.some(function (path) {
        return path.key === processedItem.key;
      }) || !!((_processedItem$item = processedItem.item) !== null && _processedItem$item !== void 0 && _processedItem$item.expanded);
    };
    var isItemVisible = function isItemVisible(processedItem) {
      return getItemProp(processedItem, 'visible') !== false;
    };
    var isItemDisabled = function isItemDisabled(processedItem) {
      return getItemProp(processedItem, 'disabled');
    };
    var isItemFocused = function isItemFocused(processedItem) {
      return props.focusedItemId === getItemId(processedItem);
    };
    var isItemGroup = function isItemGroup(processedItem) {
      return utils.ObjectUtils.isNotEmpty(processedItem.items);
    };
    var onItemClick = function onItemClick(event, processedItem) {
      if (!getItemProp(processedItem, 'url')) {
        event.preventDefault();
      }
      getItemProp(processedItem, 'command', {
        originalEvent: event,
        item: processedItem.item
      });
      onItemToggle({
        processedItem: processedItem,
        expanded: !isItemActive(processedItem)
      });
    };
    var onItemToggle = function onItemToggle(event) {
      props.onItemToggle(event);
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
    React__namespace.useImperativeHandle(ref, function () {
      return {
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var createSeparator = function createSeparator(index) {
      var key = props.id + '_sep_' + index;
      var separatorProps = mergeProps({
        id: key,
        key: key,
        className: cx('separator'),
        role: 'separator'
      }, _ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createSubmenu = function createSubmenu(processedItem, active) {
      var submenuRef = /*#__PURE__*/React__namespace.createRef();
      var toggleableContentProps = mergeProps({
        className: cx('toggleableContent', {
          active: active
        })
      }, _ptm('toggleableContent'));
      if (isItemVisible(processedItem) && isItemGroup(processedItem)) {
        var transitionProps = mergeProps({
          classNames: cx('transition'),
          timeout: {
            enter: 1000,
            exit: 450
          },
          "in": active,
          unmountOnExit: true
        }, _ptm('transition'));
        return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
          nodeRef: submenuRef
        }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
          ref: submenuRef
        }, toggleableContentProps), /*#__PURE__*/React__namespace.createElement(PanelMenuSub, {
          id: getItemId(processedItem) + '_list',
          role: "group",
          panelId: props.panelId,
          level: props.level + 1,
          focusedItemId: props.focusedItemId,
          activeItemPath: props.activeItemPath,
          onItemToggle: onItemToggle,
          menuProps: props.menuProps,
          model: processedItem.items,
          submenuIcon: props.submenuIcon,
          ptm: ptm,
          cx: cx
        })));
      }
      return null;
    };
    var createMenuItem = function createMenuItem(processedItem, index) {
      var item = processedItem.item;
      if (isItemVisible(processedItem) === false) {
        return null;
      }
      var key = getItemId(processedItem);
      var active = isItemActive(processedItem);
      var itemFocused = isItemFocused(processedItem);
      var disabled = isItemDisabled(item);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var iconProps = mergeProps({
        className: cx('icon', {
          item: item
        })
      }, getPTOptions(processedItem, 'icon', index));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$2({}, iconProps), {
        props: props.menuProps
      });
      var labelProps = mergeProps({
        className: cx('label')
      }, getPTOptions(processedItem, 'label', index));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var submenuIconClassName = 'p-panelmenu-icon';
      var submenuIconProps = mergeProps({
        className: cx('submenuicon')
      }, getPTOptions(processedItem, 'submenuicon', index));
      var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, submenuIconProps));
      var submenu = createSubmenu(processedItem, active);
      var actionProps = mergeProps({
        href: item.url || '#',
        className: cx('action', {
          item: item
        }),
        target: item.target,
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        tabIndex: '-1',
        'aria-hidden': true
      }, getPTOptions(processedItem, 'action', index));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, submenuIcon, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (item.template) {
        var defaultContentOptions = {
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          submenuIconClassName: submenuIconClassName,
          element: content,
          props: props,
          leaf: !item.items,
          active: active
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var contentProps = mergeProps({
        onClick: function onClick(event) {
          return onItemClick(event, processedItem);
        },
        className: cx('content')
      }, getPTOptions(processedItem, 'content', index));
      var menuitemProps = mergeProps({
        key: key,
        id: key,
        className: cx('menuitem', {
          item: item,
          focused: itemFocused,
          disabled: disabled
        }),
        style: item.style,
        role: 'treeitem',
        'aria-label': item.label,
        'aria-expanded': isItemGroup(item) ? active : undefined,
        'aria-level': props.level + 1,
        'aria-setsize': getAriaSetSize(),
        'aria-posinset': getAriaPosInset(index),
        'data-p-focused': itemFocused,
        'data-p-disabled': disabled
      }, getPTOptions(processedItem, 'menuitem', index));
      return /*#__PURE__*/React__namespace.createElement("li", menuitemProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, content), submenu);
    };
    var createItem = function createItem(item, index) {
      return getItemProp(item, 'separator') ? createSeparator(index) : createMenuItem(item, index);
    };
    var createMenu = function createMenu() {
      return props.model ? props.model.map(createItem) : null;
    };
    var menu = createMenu();
    var ptKey = props.root ? 'menu' : 'submenu';
    var menuProps = mergeProps({
      id: props.id,
      ref: elementRef,
      tabIndex: props.tabIndex,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onKeyDown: props.onKeyDown,
      'aria-activedescendant': props.ariaActivedescendant,
      role: props.role,
      className: utils.classNames(cx(ptKey), props.className)
    }, ptm(ptKey));
    return /*#__PURE__*/React__namespace.createElement("ul", menuProps, menu);
  }));
  PanelMenuSub.displayName = 'PanelMenuSub';

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var PanelMenuList = /*#__PURE__*/React__namespace.memo(function (props) {
    var ptm = props.ptm,
      cx = props.cx;
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      focusedItem = _React$useState4[0],
      setFocusedItem = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      focusedItemId = _React$useState6[0],
      setFocusedItemId = _React$useState6[1];
    var _React$useState7 = React__namespace.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      activeItemPath = _React$useState8[0],
      setActiveItemPath = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      processedItems = _React$useState10[0],
      setProcessedItems = _React$useState10[1];
    var _React$useState11 = React__namespace.useState([]),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      visibleItems = _React$useState12[0],
      setVisibleItems = _React$useState12[1];
    var searchValue = React__namespace.useRef(null);
    var searchTimeout = React__namespace.useRef(null);
    var elementRef = React__namespace.useRef(null);
    var getItemProp = function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    };
    var getItemLabel = function getItemLabel(processedItem) {
      return getItemProp(processedItem, 'label');
    };
    var isItemVisible = function isItemVisible(processedItem) {
      return getItemProp(processedItem, 'visible') !== false;
    };
    var isItemDisabled = function isItemDisabled(processedItem) {
      return getItemProp(processedItem, 'disabled');
    };
    var isItemActive = function isItemActive(processedItem) {
      return activeItemPath && activeItemPath.some(function (path) {
        return path.key === processedItem.parentKey;
      });
    };
    var isItemGroup = function isItemGroup(processedItem) {
      return utils.ObjectUtils.isNotEmpty(processedItem.items);
    };
    var getListElement = function getListElement() {
      return elementRef.current && elementRef.current.getElement();
    };
    var onFocus = function onFocus(event) {
      setFocused(true);
      var _focusedItem = focusedItem || (isElementInPanel(event, event.relatedTarget) ? findFirstItem() : findLastItem());
      setFocusedItem(_focusedItem);
    };
    var onBlur = function onBlur() {
      setFocused(false);
      setFocusedItem(null);
      searchValue.current = '';
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
        case 'Tab':
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
      var processedItem = utils.ObjectUtils.isNotEmpty(focusedItem) ? findNextItem(focusedItem) : findFirstItem();
      changeFocusedItem({
        originalEvent: event,
        processedItem: processedItem,
        focusOnNext: true
      });
      event.preventDefault();
    };
    var onArrowUpKey = function onArrowUpKey(event) {
      var processedItem = utils.ObjectUtils.isNotEmpty(focusedItem) ? findPrevItem(focusedItem) : findLastItem();
      changeFocusedItem({
        originalEvent: event,
        processedItem: processedItem,
        selfCheck: true
      });
      event.preventDefault();
    };
    var onArrowLeftKey = function onArrowLeftKey(event) {
      if (utils.ObjectUtils.isNotEmpty(focusedItem)) {
        var matched = activeItemPath.some(function (p) {
          return p.key === focusedItem.key;
        });
        if (matched) {
          setActiveItemPath(activeItemPath.filter(function (p) {
            return p.key !== focusedItem.key;
          }));
        } else {
          setFocusedItem(utils.ObjectUtils.isNotEmpty(focusedItem.parent) ? focusedItem.parent : focusedItem);
        }
        event.preventDefault();
      }
    };
    var onArrowRightKey = function onArrowRightKey(event) {
      if (utils.ObjectUtils.isNotEmpty(focusedItem)) {
        var grouped = isItemGroup(focusedItem);
        if (grouped) {
          var matched = activeItemPath.some(function (p) {
            return p.key === focusedItem.key;
          });
          if (matched) {
            onArrowDownKey(event);
          } else {
            var _activeItemPath = activeItemPath.filter(function (p) {
              return p.parentKey !== focusedItem.parentKey;
            });
            _activeItemPath.push(focusedItem);
            setActiveItemPath(_activeItemPath);
          }
        }
        event.preventDefault();
      }
    };
    var onHomeKey = function onHomeKey(event) {
      changeFocusedItem({
        originalEvent: event,
        processedItem: findFirstItem(),
        allowHeaderFocus: false
      });
      event.preventDefault();
    };
    var onEndKey = function onEndKey(event) {
      changeFocusedItem({
        originalEvent: event,
        processedItem: findLastItem(),
        focusOnNext: true,
        allowHeaderFocus: false
      });
      event.preventDefault();
    };
    var onEnterKey = function onEnterKey(event) {
      if (utils.ObjectUtils.isNotEmpty(focusedItem)) {
        var element = utils.DomHandler.findSingle(getListElement(), "li[id=\"".concat("".concat(focusedItemId), "\"]"));
        var anchorElement = element && (utils.DomHandler.findSingle(element, '[data-pc-section="action"]') || utils.DomHandler.findSingle(element, 'a,button'));
        anchorElement ? anchorElement.click() : element && element.click();
      }
      event.preventDefault();
    };
    var onSpaceKey = function onSpaceKey(event) {
      onEnterKey(event);
    };
    var onItemToggle = function onItemToggle(event) {
      var processedItem = event.processedItem,
        expanded = event.expanded;
      if (props.expandedKeys) {
        props.onToggle && props.onToggle({
          item: processedItem.item,
          expanded: expanded
        });
      } else {
        var _activeItemPath = activeItemPath.filter(function (p) {
          return p.parentKey !== processedItem.parentKey;
        });
        expanded && _activeItemPath.push(processedItem);
        setActiveItemPath(_activeItemPath);
      }
      if (processedItem.item) {
        processedItem.item = _objectSpread$1(_objectSpread$1({}, processedItem.item), {}, {
          expanded: expanded
        });
      }
      utils.DomHandler.focus(getListElement());
      setFocusedItem(processedItem);
    };
    var isElementInPanel = function isElementInPanel(event, element) {
      var panel = event.currentTarget.closest('[data-pc-section="panel"]');
      return panel && panel.contains(element);
    };
    var isItemMatched = function isItemMatched(processedItem) {
      return isValidItem(processedItem) && getItemLabel(processedItem).toLocaleLowerCase().startsWith(searchValue.current.toLocaleLowerCase());
    };
    var isVisibleItem = function isVisibleItem(processedItem) {
      return !!processedItem && (processedItem.level === 0 || isItemActive(processedItem)) && isItemVisible(processedItem);
    };
    var isValidItem = function isValidItem(processedItem) {
      return !!processedItem && !isItemDisabled(processedItem) && !getItemProp(processedItem, 'separator');
    };
    var findFirstItem = function findFirstItem() {
      return visibleItems.find(function (processedItem) {
        return isValidItem(processedItem);
      });
    };
    var findLastItem = function findLastItem() {
      return utils.ObjectUtils.findLast(visibleItems, function (processedItem) {
        return isValidItem(processedItem);
      });
    };
    var findNextItem = function findNextItem(processedItem) {
      var index = visibleItems.findIndex(function (item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index < visibleItems.length - 1 ? visibleItems.slice(index + 1).find(function (pItem) {
        return isValidItem(pItem);
      }) : undefined;
      return matchedItem || processedItem;
    };
    var findPrevItem = function findPrevItem(processedItem) {
      var index = visibleItems.findIndex(function (item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index > 0 ? utils.ObjectUtils.findLast(visibleItems.slice(0, index), function (pItem) {
        return isValidItem(pItem);
      }) : undefined;
      return matchedItem || processedItem;
    };
    var searchItems = function searchItems(event, _char) {
      searchValue.current = (searchValue.current || '') + _char;
      var matchedItem = null;
      var matched = false;
      if (utils.ObjectUtils.isNotEmpty(focusedItem)) {
        var focusedItemIndex = visibleItems.findIndex(function (processedItem) {
          return processedItem.key === focusedItem.key;
        });
        matchedItem = visibleItems.slice(focusedItemIndex).find(function (processedItem) {
          return isItemMatched(processedItem);
        });
        matchedItem = utils.ObjectUtils.isEmpty(matchedItem) ? visibleItems.slice(0, focusedItemIndex).find(function (processedItem) {
          return isItemMatched(processedItem);
        }) : matchedItem;
      } else {
        matchedItem = visibleItems.find(function (processedItem) {
          return isItemMatched(processedItem);
        });
      }
      if (utils.ObjectUtils.isNotEmpty(matchedItem)) {
        matched = true;
      }
      if (utils.ObjectUtils.isEmpty(matchedItem) && utils.ObjectUtils.isEmpty(focusedItem)) {
        matchedItem = findFirstItem();
      }
      if (utils.ObjectUtils.isNotEmpty(matchedItem)) {
        changeFocusedItem({
          originalEvent: event,
          processedItem: matchedItem,
          allowHeaderFocus: false
        });
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(function () {
        searchValue.current = '';
        searchTimeout.currentt = null;
      }, 500);
      return matched;
    };
    var changeFocusedItem = function changeFocusedItem(event) {
      var originalEvent = event.originalEvent,
        processedItem = event.processedItem,
        focusOnNext = event.focusOnNext,
        selfCheck = event.selfCheck,
        _event$allowHeaderFoc = event.allowHeaderFocus,
        allowHeaderFocus = _event$allowHeaderFoc === void 0 ? true : _event$allowHeaderFoc;
      if (utils.ObjectUtils.isNotEmpty(focusedItem) && focusedItem.key !== processedItem.key) {
        setFocusedItem(processedItem);
        scrollInView();
      } else if (allowHeaderFocus) {
        props.onHeaderFocus && props.onHeaderFocus({
          originalEvent: originalEvent,
          focusOnNext: focusOnNext,
          selfCheck: selfCheck
        });
      }
    };
    var scrollInView = function scrollInView() {
      var element = utils.DomHandler.findSingle(getListElement(), "li[id=\"".concat("".concat(focusedItemId), "\"]"));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    };
    var autoUpdateActiveItemPath = function autoUpdateActiveItemPath(expandedKeys) {
      var _activeItemPath = Object.entries(expandedKeys || {}).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          val = _ref2[1];
        if (val) {
          var processedItem = findProcessedItemByItemKey(key);
          processedItem && acc.push(processedItem);
        }
        return acc;
      }, []);
      setActiveItemPath(_activeItemPath);
    };
    var findProcessedItemByItemKey = function findProcessedItemByItemKey(key, processed) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _processedItems = processed ? processed : level === 0 && props.model;
      if (!_processedItems) {
        return null;
      }
      for (var i = 0; i < _processedItems.length; i++) {
        var processedItem = _processedItems[i];
        var processedKey = getItemProp(processedItem, 'key') || processedItem.key;
        if (processedKey === key) {
          return processedItem;
        }
        var matchedItem = findProcessedItemByItemKey(key, processedItem.items, level + 1);
        if (matchedItem) {
          return matchedItem;
        }
      }
    };
    var createProcessedItems = function createProcessedItems(items) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var processedItems = [];
      items && items.forEach(function (item, index) {
        var key = item.key ? item.key : (parentKey !== '' ? parentKey + '_' : '') + index;
        var newItem = {
          item: item,
          index: index,
          level: level,
          key: key,
          parent: parent,
          parentKey: parentKey
        };
        newItem.items = createProcessedItems(item.items, level + 1, newItem, key);
        processedItems.push(newItem);
      });
      return processedItems;
    };
    var flatItems = function flatItems(processedItems) {
      var processedFlattenItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      processedItems && processedItems.forEach(function (processedItem) {
        if (isVisibleItem(processedItem)) {
          processedFlattenItems.push(processedItem);
          flatItems(processedItem.items, processedFlattenItems);
        }
      });
      return processedFlattenItems;
    };
    React__namespace.useEffect(function () {
      var processed = createProcessedItems(props.model);
      setProcessedItems(processed);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.model]);
    React__namespace.useEffect(function () {
      var _visibleItems = flatItems(processedItems);
      setVisibleItems(_visibleItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [processedItems, activeItemPath]);
    React__namespace.useEffect(function () {
      autoUpdateActiveItemPath(props.expandedKeys);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.expandedKeys]);
    useUpdateEffect(function () {
      var _id = utils.ObjectUtils.isNotEmpty(focusedItem) ? "".concat(props.panelId, "_").concat(focusedItem.key) : null;
      setFocusedItemId(_id);
    }, [props.panelId, focusedItem]);
    return /*#__PURE__*/React__namespace.createElement(PanelMenuSub, {
      hostName: "PanelMenu",
      id: props.panelId + '_list',
      ref: elementRef,
      role: "tree",
      tabIndex: -1,
      ariaActivedescendant: focused ? focusedItemId : undefined,
      panelId: props.panelId,
      focusedItemId: focused ? focusedItemId : undefined,
      model: processedItems,
      activeItemPath: activeItemPath,
      menuProps: props.menuProps,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      onItemToggle: onItemToggle,
      level: 0,
      className: cx('submenu'),
      submenuIcon: props.submenuIcon,
      root: true,
      ptm: ptm,
      cx: cx
    });
  });
  PanelMenuList.displayName = 'PanelMenuList';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var PanelMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = PanelMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeItemState = _React$useState4[0],
      setActiveItemState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      activeItemsState = _React$useState6[0],
      setActiveItemsState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2);
      _React$useState8[0];
      var setAnimationDisabled = _React$useState8[1];
    var elementRef = React__namespace.useRef(null);
    var _PanelMenuBase$setMet = PanelMenuBase.setMetaData({
        props: props,
        state: {
          id: idState,
          activeItem: activeItemState
        }
      }),
      ptm = _PanelMenuBase$setMet.ptm,
      cx = _PanelMenuBase$setMet.cx,
      isUnstyled = _PanelMenuBase$setMet.isUnstyled;
    componentbase.useHandleStyle(PanelMenuBase.css.styles, isUnstyled, {
      name: 'panelmenu'
    });
    var onItemClick = function onItemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (item.items) {
        changeActiveItem(event, item);
      }
      if (!item.url) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var getItemProp = function getItemProp(item, name) {
      return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
    };
    var isItemActive = function isItemActive(item) {
      if (props.expandedKeys) {
        return props.expandedKeys[getItemProp(item, 'key')];
      }
      return props.multiple ? activeItemsState.some(function (subItem) {
        return utils.ObjectUtils.equals(item, subItem);
      }) : utils.ObjectUtils.equals(item, activeItemState);
    };
    var isItemVisible = function isItemVisible(item) {
      return getItemProp(item, 'visible') !== false;
    };
    var isItemDisabled = function isItemDisabled(item) {
      return getItemProp(item, 'disabled');
    };
    var isItemFocused = function isItemFocused(item) {
      return utils.ObjectUtils.equals(item, activeItemState);
    };
    var generatePanelId = function generatePanelId(index) {
      return "".concat(idState, "_").concat(index);
    };
    var generateHeaderId = function generateHeaderId(itemId, index) {
      return "".concat(itemId || generatePanelId(index), "_header");
    };
    var generateContentId = function generateContentId(itemId, index) {
      return "".concat(itemId || generatePanelId(index), "_content");
    };
    var onHeaderKeyDown = function onHeaderKeyDown(event, item) {
      switch (event.code) {
        case 'ArrowDown':
          onHeaderArrowDownKey(event);
          break;
        case 'ArrowUp':
          onHeaderArrowUpKey(event);
          break;
        case 'Home':
          onHeaderHomeKey(event);
          break;
        case 'End':
          onHeaderEndKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          onHeaderEnterKey(event, item);
          break;
      }
    };
    var onHeaderArrowDownKey = function onHeaderArrowDownKey(event) {
      var rootList = utils.DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? utils.DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? utils.DomHandler.focus(rootList) : updateFocusedHeader({
        originalEvent: event,
        focusOnNext: true
      });
      event.preventDefault();
    };
    var onHeaderArrowUpKey = function onHeaderArrowUpKey(event) {
      var prevHeader = findPrevHeader(event.currentTarget.parentElement) || findLastHeader();
      var rootList = utils.DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? utils.DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? utils.DomHandler.focus(rootList) : updateFocusedHeader({
        originalEvent: event,
        focusOnNext: false
      });
      event.preventDefault();
    };
    var onHeaderHomeKey = function onHeaderHomeKey(event) {
      changeFocusedHeader(event, findFirstHeader());
      event.preventDefault();
    };
    var onHeaderEndKey = function onHeaderEndKey(event) {
      changeFocusedHeader(event, findLastHeader());
      event.preventDefault();
    };
    var onHeaderEnterKey = function onHeaderEnterKey(event, item) {
      var headerAction = utils.DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
      headerAction ? headerAction.click() : onItemClick(event, item);
      event.preventDefault();
    };
    var findNextHeader = function findNextHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
      var headerElement = utils.DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? findNextHeader(headerElement.parentElement) : headerElement : null;
    };
    var findPrevHeader = function findPrevHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
      var headerElement = utils.DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? findPrevHeader(headerElement.parentElement) : headerElement : null;
    };
    var findFirstHeader = function findFirstHeader() {
      return findNextHeader(elementRef.current.firstElementChild, true);
    };
    var findLastHeader = function findLastHeader() {
      return findPrevHeader(elementRef.current.lastElementChild, true);
    };
    var updateFocusedHeader = function updateFocusedHeader(event) {
      var originalEvent = event.originalEvent,
        focusOnNext = event.focusOnNext,
        selfCheck = event.selfCheck;
      var panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
      var header = selfCheck ? utils.DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? findNextHeader(panelElement) : findPrevHeader(panelElement);
      header ? changeFocusedHeader(originalEvent, header) : focusOnNext ? onHeaderHomeKey(originalEvent) : onHeaderEndKey(originalEvent);
    };
    var changeActiveItem = function changeActiveItem(event, item) {
      if (!isItemDisabled(item)) {
        var active = isItemActive(item);
        var isExpanded = !active;
        var _activeItemState = activeItemState && utils.ObjectUtils.equals(item, activeItemState) ? null : item;
        setActiveItemState(_activeItemState);
        if (props.multiple) {
          var activeItems = activeItemsState;
          if (activeItemsState.some(function (subItem) {
            return utils.ObjectUtils.equals(item, subItem);
          })) {
            activeItems = activeItemsState.filter(function (subItem) {
              return !utils.ObjectUtils.equals(item, subItem);
            });
          } else {
            activeItems.push(item);
          }
          setActiveItemsState(activeItems);
        }
        changeExpandedKeys({
          item: item,
          expanded: isExpanded
        });
        isExpanded && event ? props.onOpen && props.onOpen({
          originalEvent: event,
          item: item
        }) : props.onClose && props.onClose({
          originalEvent: event,
          item: item
        });
      }
    };
    var changeExpandedKeys = function changeExpandedKeys(_ref) {
      var item = _ref.item,
        _ref$expanded = _ref.expanded,
        expanded = _ref$expanded === void 0 ? false : _ref$expanded;
      if (props.expandedKeys) {
        var _keys = _objectSpread({}, props.expandedKeys);
        if (expanded) {
          _keys[item.key] = true;
        } else {
          delete _keys[item.key];
        }
        props.onExpandedKeysChange && props.onExpandedKeysChange(_keys);
      }
    };
    var changeFocusedHeader = function changeFocusedHeader(event, element) {
      element && utils.DomHandler.focus(element);
    };
    var getPTOptions = function getPTOptions(item, key, index) {
      return ptm(key, {
        context: {
          active: isItemActive(item),
          focused: isItemFocused(item),
          disabled: isItemDisabled(item),
          index: index
        }
      });
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
      !idState && setIdState(utils.UniqueComponentId());
    });
    React__namespace.useEffect(function () {
      setAnimationDisabled(true);
      props.model && props.model.forEach(function (item) {
        if (item.expanded) {
          changeActiveItem(null, item);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.model]);
    var onEnter = function onEnter() {
      setAnimationDisabled(false);
    };
    var createPanel = function createPanel(item, index) {
      if (!isItemVisible(item)) {
        return null;
      }
      var key = item.id || idState + '_' + index;
      var active = isItemActive(item);
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var headerIconProps = mergeProps({
        className: cx('headerIcon', {
          item: item
        })
      }, getPTOptions(item, 'headerIcon', index));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, headerIconProps), {
        props: props
      });
      var submenuIconClassName = 'p-panelmenu-icon';
      var headerSubmenuIconProps = mergeProps({
        className: cx('headerSubmenuIcon')
      }, getPTOptions(item, 'headerSubmenuIcon', index));
      var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, headerSubmenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, headerSubmenuIconProps));
      var headerLabelProps = mergeProps({
        className: cx('headerLabel')
      }, getPTOptions(item, 'headerLabel', index));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", headerLabelProps, item.label);
      var menuContentRef = /*#__PURE__*/React__namespace.createRef();
      var headerActionProps = mergeProps({
        href: item.url || '#',
        tabIndex: '-1',
        className: cx('headerAction')
      }, getPTOptions(item, 'headerAction', index));
      var content = /*#__PURE__*/React__namespace.createElement("a", headerActionProps, submenuIcon, icon, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return onItemClick(event, item);
          },
          className: 'p-panelmenu-header-link',
          labelClassName: 'p-menuitem-text',
          submenuIconClassName: submenuIconClassName,
          iconClassName: iconClassName,
          element: content,
          props: props,
          leaf: !item.items,
          active: active
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var panelProps = mergeProps({
        key: key,
        id: (item === null || item === void 0 ? void 0 : item.id) || generatePanelId(index),
        className: cx('panel', {
          item: item
        }),
        style: item.style
      }, getPTOptions(item, 'panel', index));
      var headerProps = mergeProps({
        id: generateHeaderId(item === null || item === void 0 ? void 0 : item.id, index),
        className: cx('header', {
          active: active,
          item: item
        }),
        'aria-label': item.label,
        'aria-expanded': active,
        'aria-disabled': item.disabled,
        'aria-controls': generateContentId(item === null || item === void 0 ? void 0 : item.id, index),
        tabIndex: item.disabled ? null : '0',
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onHeaderKeyDown(event, item);
        },
        'data-p-disabled': item.disabled,
        'data-p-highlight': active,
        role: 'button',
        style: item.style
      }, getPTOptions(item, 'header', index));
      var headerContentProps = mergeProps({
        className: cx('headerContent')
      }, getPTOptions(item, 'headerContent', index));
      var menuContentProps = mergeProps({
        className: cx('menuContent')
      }, getPTOptions(item, 'menuContent', index));
      var toggleableContentProps = mergeProps({
        className: cx('toggleableContent', {
          active: active
        }),
        role: 'region',
        'aria-labelledby': generateHeaderId(item === null || item === void 0 ? void 0 : item.id, index)
      }, getPTOptions(item, 'toggleableContent', index));
      var transitionProps = mergeProps({
        classNames: cx('transition'),
        timeout: {
          enter: 1000,
          exit: 450
        },
        onEnter: onEnter,
        "in": active,
        unmountOnExit: true,
        options: props.transitionOptions
      }, getPTOptions(item, 'transition', index));
      return /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", headerProps, /*#__PURE__*/React__namespace.createElement("div", headerContentProps, content)), /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: menuContentRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        id: generateContentId(item === null || item === void 0 ? void 0 : item.id, index),
        ref: menuContentRef
      }, toggleableContentProps), /*#__PURE__*/React__namespace.createElement("div", menuContentProps, /*#__PURE__*/React__namespace.createElement(PanelMenuList, {
        panelId: (item === null || item === void 0 ? void 0 : item.id) || generatePanelId(index),
        menuProps: props,
        onToggle: changeExpandedKeys,
        onHeaderFocus: updateFocusedHeader,
        level: 0,
        model: item.items,
        expandedKeys: props.expandedKeys,
        className: "p-panelmenu-root-submenu",
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx
      })))));
    };
    var createPanels = function createPanels() {
      return props.model ? props.model.map(createPanel) : null;
    };
    var panels = createPanels();
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      id: props.id,
      style: props.style
    }, PanelMenuBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, panels);
  }));
  PanelMenu.displayName = 'PanelMenu';

  exports.PanelMenu = PanelMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.chevrondown, primereact.icons.chevronright, primereact.utils, primereact.ripple);
