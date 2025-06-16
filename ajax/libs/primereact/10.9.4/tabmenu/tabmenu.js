this.primereact = this.primereact || {};
this.primereact.tabmenu = (function (exports, React, api, componentbase, hooks, ripple, utils) {
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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    icon: function icon(_ref) {
      var _icon = _ref._icon;
      return utils.classNames('p-menuitem-icon', _icon);
    },
    label: 'p-menuitem-text',
    action: 'p-menuitem-link',
    menuitem: function menuitem(_ref2) {
      var _className = _ref2._className,
        active = _ref2.active,
        disabled = _ref2.disabled;
      return utils.classNames('p-tabmenuitem', {
        'p-highlight': active,
        'p-disabled': disabled
      }, _className);
    },
    inkbar: 'p-tabmenu-ink-bar',
    menu: 'p-tabmenu-nav p-reset',
    root: 'p-tabmenu p-component'
  };
  var styles = "\n@layer primereact {\n    .p-tabmenu {\n        overflow-x: auto;\n    }\n\n    .p-tabmenu-nav {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        flex-wrap: nowrap;\n    }\n\n    .p-tabmenu-nav a {\n        cursor: pointer;\n        user-select: none;\n        display: flex;\n        align-items: center;\n        position: relative;\n        text-decoration: none;\n        text-decoration: none;\n        overflow: hidden;\n    }\n\n    .p-tabmenu-nav a:focus {\n        z-index: 1;\n    }\n\n    .p-tabmenu-nav .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-tabmenu-ink-bar {\n        display: none;\n        z-index: 1;\n    }\n\n    .p-tabmenu::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
  var TabMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'TabMenu',
      id: null,
      model: null,
      activeIndex: 0,
      ariaLabel: null,
      ariaLabelledBy: null,
      style: null,
      className: null,
      onTabChange: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var TabMenu = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TabMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.activeIndex),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeIndexState = _React$useState4[0],
      setActiveIndexState = _React$useState4[1];
    var elementRef = React__namespace.useRef(null);
    var inkbarRef = React__namespace.useRef(null);
    var navRef = React__namespace.useRef(null);
    var tabsRef = React__namespace.useRef({});
    var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
    var metaData = {
      props: props,
      state: {
        id: idState,
        activeIndex: activeIndex
      }
    };
    var _TabMenuBase$setMetaD = TabMenuBase.setMetaData(_objectSpread({}, metaData)),
      ptm = _TabMenuBase$setMetaD.ptm,
      cx = _TabMenuBase$setMetaD.cx,
      isUnstyled = _TabMenuBase$setMetaD.isUnstyled;
    var getPTOptions = function getPTOptions(key, item, index) {
      return ptm(key, {
        parent: metaData,
        context: {
          item: item,
          index: index
        }
      });
    };
    componentbase.useHandleStyle(TabMenuBase.css.styles, isUnstyled, {
      name: 'tabmenu'
    });
    var itemClick = function itemClick(event, item, index) {
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
      if (props.onTabChange) {
        props.onTabChange({
          originalEvent: event,
          value: item,
          index: index
        });
      } else {
        setActiveIndexState(index);
      }
      if (!item.url) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var isSelected = function isSelected(index) {
      return index === (activeIndex || 0);
    };
    var updateInkBar = function updateInkBar() {
      if (props.model) {
        var tabs = navRef.current.children;
        var inkHighlighted = false;
        for (var i = 0; i < tabs.length; i++) {
          var tab = tabs[i];
          if (utils.DomHandler.getAttribute(tab, 'data-p-highlight')) {
            inkbarRef.current.style.width = utils.DomHandler.getWidth(tab) + 'px';
            inkbarRef.current.style.left = utils.DomHandler.getOffset(tab).left - utils.DomHandler.getOffset(navRef.current).left + 'px';
            inkHighlighted = true;
          }
        }
        if (!inkHighlighted) {
          inkbarRef.current.style.width = '0px';
          inkbarRef.current.style.left = '0px';
        }
      }
    };
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      updateInkBar();
    });
    var onKeyDownItem = function onKeyDownItem(event, item, index) {
      switch (event.code) {
        case 'ArrowRight':
          navigateToNextItem(event.target);
          event.preventDefault();
          break;
        case 'ArrowLeft':
          navigateToPrevItem(event.target);
          event.preventDefault();
          break;
        case 'Home':
          navigateToFirstItem(event.target);
          event.preventDefault();
          break;
        case 'End':
          navigateToLastItem(event.target);
          event.preventDefault();
          break;
        case 'Space':
        case 'Enter':
        case 'NumpadEnter':
          itemClick(event, item, index);
          event.preventDefault();
          break;
        case 'Tab':
          onTabKey();
          break;
      }
    };
    var navigateToNextItem = function navigateToNextItem(target) {
      var nextItem = _findNextItem(target);
      nextItem && setFocusToMenuitem(target, nextItem);
    };
    var navigateToPrevItem = function navigateToPrevItem(target) {
      var prevItem = _findPrevItem(target);
      prevItem && setFocusToMenuitem(target, prevItem);
    };
    var navigateToFirstItem = function navigateToFirstItem(target) {
      var firstItem = findFirstItem();
      firstItem && setFocusToMenuitem(target, firstItem);
    };
    var navigateToLastItem = function navigateToLastItem(target) {
      var lastItem = findLastItem();
      lastItem && setFocusToMenuitem(target, lastItem);
    };
    var _findNextItem = function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? utils.DomHandler.getAttribute(nextItem, 'data-p-disabled') === true ? _findNextItem(nextItem.children[0]) : nextItem.children[0] : null;
    };
    var _findPrevItem = function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? utils.DomHandler.getAttribute(prevItem, 'data-p-disabled') === true ? _findPrevItem(prevItem.children[0]) : prevItem.children[0] : null;
    };
    var findFirstItem = function findFirstItem() {
      var firstSibling = utils.DomHandler.findSingle(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return firstSibling ? firstSibling.children[0] : null;
    };
    var findLastItem = function findLastItem() {
      var siblings = utils.DomHandler.find(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    };
    var setFocusToMenuitem = function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = '-1';
      focusableItem.tabIndex = '0';
      focusableItem.focus();
    };
    var onTabKey = function onTabKey() {
      var activeItem = utils.DomHandler.findSingle(navRef.current, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
      var focusedItem = utils.DomHandler.findSingle(navRef.current, '[data-pc-section="action"][tabindex="0"]');
      if (focusedItem !== activeItem.children[0]) {
        activeItem && (activeItem.children[0].tabIndex = '0');
        focusedItem.tabIndex = '-1';
      }
    };
    var createMenuItem = function createMenuItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var _className = item.className,
        style = item.style,
        disabled = item.disabled,
        _icon = item.icon,
        _label = item.label,
        template = item.template,
        url = item.url,
        target = item.target;
      var key = item.id || idState + '_' + index;
      var active = isSelected(index);
      var iconClassName = utils.classNames('p-menuitem-icon', _icon);
      var iconProps = mergeProps({
        className: cx('icon', {
          _icon: _icon
        })
      }, getPTOptions('icon', item, index));
      var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = mergeProps({
        className: cx('label')
      }, getPTOptions('label', item, index));
      var label = _label && /*#__PURE__*/React__namespace.createElement("span", labelProps, _label);
      var actionProps = mergeProps({
        href: url || '#',
        role: 'menuitem',
        'aria-label': _label,
        tabIndex: active ? '0' : '-1',
        className: cx('action'),
        target: target,
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        }
      }, getPTOptions('action', item, index));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item, index);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: props,
          active: active,
          index: index,
          disabled: disabled
        };
        content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
      }
      var menuItemProps = mergeProps({
        ref: tabsRef.current["tab_".concat(index)],
        id: key,
        onKeyDown: function onKeyDown(event) {
          return onKeyDownItem(event, item, index);
        },
        className: cx('menuitem', {
          _className: _className,
          active: active,
          disabled: disabled
        }),
        style: style,
        role: 'presentation',
        'data-p-highlight': active,
        'data-p-disabled': disabled || false,
        'aria-disabled': disabled
      }, getPTOptions('menuitem', item, index));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuItemProps, {
        key: key
      }), content);
    };
    var createItems = function createItems() {
      return props.model.map(createMenuItem);
    };
    if (props.model) {
      var items = createItems();
      var inkbarProps = mergeProps({
        ref: inkbarRef,
        role: 'none',
        className: cx('inkbar')
      }, ptm('inkbar'));
      var menuProps = mergeProps({
        ref: navRef,
        'aria-label': props.ariaLabel,
        'aria-labelledby': props.ariaLabelledBy,
        className: cx('menu'),
        role: 'menubar'
      }, ptm('menu'));
      var rootProps = mergeProps({
        id: props.id,
        ref: elementRef,
        className: utils.classNames(props.className, cx('root')),
        style: props.style
      }, TabMenuBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("ul", menuProps, items, /*#__PURE__*/React__namespace.createElement("li", inkbarProps)));
    }
    return null;
  }));
  TabMenu.displayName = 'TabMenu';

  exports.TabMenu = TabMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.ripple, primereact.utils);
