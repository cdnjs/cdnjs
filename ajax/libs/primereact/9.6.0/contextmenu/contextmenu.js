this.primereact = this.primereact || {};
this.primereact.contextmenu = (function (exports, React, PrimeReact, csstransition, hooks, portal, utils, componentbase, ripple, angleright) {
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

  var ContextMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'ContextMenu',
      id: null,
      model: null,
      style: null,
      className: null,
      global: false,
      autoZIndex: true,
      baseZIndex: 0,
      breakpoint: undefined,
      scrollHeight: '400px',
      appendTo: null,
      transitionOptions: null,
      onShow: null,
      onHide: null,
      submenuIcon: null,
      children: undefined
    }
  });

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ContextMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeItemState = _React$useState2[0],
      setActiveItemState = _React$useState2[1];
    var submenuRef = React__namespace.useRef(null);
    var active = props.root || !props.resetMenu;
    var getPTOptions = function getPTOptions(item, key) {
      return props.ptm(key, {
        context: {
          active: activeItemState === item
        }
      });
    };
    if (props.resetMenu === true && activeItemState !== null) {
      setActiveItemState(null);
    }
    var onItemMouseEnter = function onItemMouseEnter(event, item) {
      if (item.disabled || props.isMobileMode) {
        event.preventDefault();
        return;
      }
      setActiveItemState(item);
    };
    var onItemClick = function onItemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (!item.url) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (props.isMobileMode && item.items) {
        if (activeItemState && item === activeItemState) setActiveItemState(null);else setActiveItemState(item);
      }
      if (!item.items) {
        props.onLeafClick(event);
      }
    };
    var position = function position() {
      if (!props.isMobileMode) {
        var parentItem = submenuRef.current.parentElement;
        var containerOffset = utils.DomHandler.getOffset(parentItem);
        var viewport = utils.DomHandler.getViewport();
        var sublistWidth = submenuRef.current.offsetParent ? submenuRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(submenuRef.current);
        var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
        var top = parseInt(containerOffset.top, 10) + submenuRef.current.offsetHeight - utils.DomHandler.getWindowScrollTop();
        if (top > viewport.height) {
          submenuRef.current.style.top = viewport.height - top + 'px';
        } else {
          submenuRef.current.style.top = '0px';
        }
        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
          submenuRef.current.style.left = -1 * sublistWidth + 'px';
        } else {
          submenuRef.current.style.left = itemOuterWidth + 'px';
        }
      }
    };
    var onEnter = function onEnter() {
      position();
    };
    hooks.useUpdateEffect(function () {
      active && position();
    });
    var createSeparator = function createSeparator(index) {
      var separatorProps = utils.mergeProps({
        role: 'separator',
        key: 'separator_' + index,
        className: 'p-menu-separator'
      }, props.ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createSubmenu = function createSubmenu(item) {
      if (item.items) {
        return /*#__PURE__*/React__namespace.createElement(ContextMenuSub, {
          menuProps: props.menuProps,
          model: item.items,
          resetMenu: item !== activeItemState,
          onLeafClick: props.onLeafClick,
          isMobileMode: props.isMobileMode,
          submenuIcon: props.submenuIcon,
          ptm: props.ptm
        });
      }
      return null;
    };
    var createMenuItem = function createMenuItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var active = activeItemState === item;
      var key = item.label + '_' + index;
      var className = utils.classNames('p-menuitem', {
        'p-menuitem-active': active
      }, item.className);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = 'p-menuitem-icon';
      var iconProps = utils.mergeProps({
        className: iconClassName
      }, getPTOptions(item, 'icon'));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
        props: props.menuProps
      });
      var submenuIconClassName = 'p-submenu-icon';
      var submenuIconProps = utils.mergeProps({
        className: submenuIconClassName
      }, getPTOptions(item, 'submenuIcon'));
      var labelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, getPTOptions(item, 'label'));
      var submenuIcon = item.items && utils.IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps), _objectSpread({}, submenuIconProps), {
        props: props.menuProps
      });
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var submenu = createSubmenu(item);
      var actionProps = utils.mergeProps({
        href: item.url || '#',
        className: linkClassName,
        target: item.target,
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        role: 'menuitem',
        'aria-haspopup': item.items != null,
        'aria-disabled': item.disabled
      }, getPTOptions(item, 'action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      var menuitemProps = utils.mergeProps({
        id: item.id,
        role: 'none',
        className: className,
        style: item.style,
        key: key,
        onMouseEnter: function onMouseEnter(event) {
          return onItemMouseEnter(event, item);
        }
      }, getPTOptions(item, 'menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuitemProps, content, submenu);
    };
    var createItem = function createItem(item, index) {
      return item.separator ? createSeparator(index) : createMenuItem(item, index);
    };
    var createMenu = function createMenu() {
      return props.model ? props.model.map(createItem) : null;
    };
    var className = utils.classNames({
      'p-submenu-list': !props.root
    });
    var submenu = createMenu();
    var menuProps = utils.mergeProps({
      ref: submenuRef,
      className: className
    }, props.ptm('menu'));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: submenuRef,
      classNames: "p-contextmenusub",
      "in": active,
      timeout: {
        enter: 0,
        exit: 0
      },
      unmountOnExit: true,
      onEnter: onEnter
    }, /*#__PURE__*/React__namespace.createElement("ul", menuProps, submenu));
  });
  ContextMenuSub.displayName = 'ContextMenuSub';

  var ContextMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = ContextMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      reshowState = _React$useState4[0],
      setReshowState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      resetMenuState = _React$useState6[0],
      setResetMenuState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      attributeSelectorState = _React$useState8[0],
      setAttributeSelectorState = _React$useState8[1];
    var _ContextMenuBase$setM = ContextMenuBase.setMetaData({
        props: props,
        state: {
          visible: visibleState,
          reshow: reshowState,
          resetMenu: resetMenuState,
          attributeSelector: attributeSelectorState
        }
      }),
      ptm = _ContextMenuBase$setM.ptm;
    var menuRef = React__namespace.useRef(null);
    var currentEvent = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var isMobileMode = hooks.useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (isOutsideClicked(event) && event.button !== 2) {
            hide(event);
            setResetMenuState(true);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentClickListener = _useEventListener2[0],
      unbindDocumentClickListener = _useEventListener2[1];
    var _useEventListener3 = hooks.useEventListener({
        type: 'contextmenu',
        when: props.global,
        listener: function listener(event) {
          show(event);
        }
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 1),
      bindDocumentContextMenuListener = _useEventListener4[0];
    var _useResizeListener = hooks.useResizeListener({
        listener: function listener(event) {
          if (visibleState && !utils.DomHandler.isTouchDevice()) {
            hide(event);
          }
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
      bindDocumentResizeListener = _useResizeListener2[0],
      unbindDocumentResizeListener = _useResizeListener2[1];
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce);
        var selector = "".concat(attributeSelectorState);
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-contextmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-contextmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n}\n");
        styleElementRef.current.innerHTML = innerHTML;
      }
    };
    var destroyStyle = function destroyStyle() {
      styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
    };
    var onMenuClick = function onMenuClick() {
      setResetMenuState(false);
    };
    var onMenuMouseEnter = function onMenuMouseEnter() {
      setResetMenuState(false);
    };
    var show = function show(event) {
      event.stopPropagation();
      event.preventDefault();
      currentEvent.current = event;
      if (visibleState) {
        setReshowState(true);
      } else {
        setVisibleState(true);
        props.onShow && props.onShow(currentEvent.current);
      }
    };
    var hide = function hide(event) {
      currentEvent.current = event;
      setVisibleState(false);
      setReshowState(false);
      props.onHide && props.onHide(currentEvent.current);
    };
    var onEnter = function onEnter() {
      if (props.autoZIndex) {
        utils.ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
      }
      position(currentEvent.current);
      if (attributeSelectorState && props.breakpoint) {
        menuRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
    };
    var onEntered = function onEntered() {
      bindDocumentListeners();
    };
    var onExit = function onExit() {
      unbindDocumentListeners();
      utils.ZIndexUtils.clear(menuRef.current);
    };
    var onExited = function onExited() {
      utils.ZIndexUtils.clear(menuRef.current);
      destroyStyle();
    };
    var position = function position(event) {
      if (event) {
        var left = event.pageX + 1;
        var top = event.pageY + 1;
        var width = menuRef.current.offsetParent ? menuRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(menuRef.current);
        var height = menuRef.current.offsetParent ? menuRef.current.offsetHeight : utils.DomHandler.getHiddenElementOuterHeight(menuRef.current);
        var viewport = utils.DomHandler.getViewport();

        //flip
        if (left + width - document.body.scrollLeft > viewport.width) {
          left -= width;
        }

        //flip
        if (top + height - document.body.scrollTop > viewport.height) {
          top -= height;
        }

        //fit
        if (left < document.body.scrollLeft) {
          left = document.body.scrollLeft;
        }

        //fit
        if (top < document.body.scrollTop) {
          top = document.body.scrollTop;
        }
        menuRef.current.style.left = left + 'px';
        menuRef.current.style.top = top + 'px';
      }
    };
    var onLeafClick = function onLeafClick(event) {
      setResetMenuState(true);
      hide(event);
      event.stopPropagation();
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return menuRef && menuRef.current && !(menuRef.current.isSameNode(event.target) || menuRef.current.contains(event.target));
    };
    var bindDocumentListeners = function bindDocumentListeners() {
      bindDocumentResizeListener();
      bindDocumentClickListener();
    };
    var unbindDocumentListeners = function unbindDocumentListeners() {
      unbindDocumentResizeListener();
      unbindDocumentClickListener();
    };
    hooks.useMountEffect(function () {
      if (props.breakpoint) {
        !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
      }
    });
    hooks.useUpdateEffect(function () {
      props.global && bindDocumentContextMenuListener();
    }, [props.global]);
    hooks.useUpdateEffect(function () {
      if (attributeSelectorState && menuRef.current) {
        menuRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
      return function () {
        destroyStyle();
      };
    }, [attributeSelectorState, props.breakpoint]);
    hooks.useUpdateEffect(function () {
      if (visibleState) {
        setVisibleState(false);
        setReshowState(false);
        setResetMenuState(true);
      } else if (!reshowState && !visibleState && resetMenuState) {
        show(currentEvent.current);
      }
    }, [reshowState]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(menuRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return menuRef.current;
        }
      };
    });
    var createContextMenu = function createContextMenu() {
      var className = utils.classNames('p-contextmenu p-component', props.className, {
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      });
      var rootProps = utils.mergeProps({
        id: props.id,
        ref: menuRef,
        className: className,
        style: props.style,
        onClick: function onClick(e) {
          return onMenuClick();
        },
        onMouseEnter: function onMouseEnter(e) {
          return onMenuMouseEnter();
        }
      }, ContextMenuBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: menuRef,
        classNames: "p-contextmenu",
        "in": visibleState,
        timeout: {
          enter: 250,
          exit: 0
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntered: onEntered,
        onExit: onExit,
        onExited: onExited
      }, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(ContextMenuSub, {
        menuProps: props,
        model: props.model,
        root: true,
        resetMenu: resetMenuState,
        onLeafClick: onLeafClick,
        isMobileMode: isMobileMode,
        submenuIcon: props.submenuIcon,
        ptm: ptm
      })));
    };
    var element = createContextMenu();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  ContextMenu.displayName = 'ContextMenu';

  exports.ContextMenu = ContextMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.portal, primereact.utils, primereact.componentbase, primereact.ripple, primereact.icons.angleright);
