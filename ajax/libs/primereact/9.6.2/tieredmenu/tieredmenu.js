this.primereact = this.primereact || {};
this.primereact.tieredmenu = (function (exports, React, PrimeReact, csstransition, hooks, overlayservice, portal, utils, componentbase, ripple, angleright) {
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

  var TieredMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'TieredMenu',
      id: null,
      model: null,
      popup: false,
      style: null,
      className: null,
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
  var TieredMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeItemState = _React$useState2[0],
      setActiveItemState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var getPTOptions = function getPTOptions(item, key) {
      return props.ptm(key, {
        context: {
          active: activeItemState === item
        }
      });
    };
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (!props.isMobileMode && elementRef.current && !elementRef.current.contains(event.target)) {
            setActiveItemState(null);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 1),
      bindDocumentClickListener = _useEventListener2[0];
    var _useResizeListener = hooks.useResizeListener({
        listener: function listener() {
          !props.isMobileMode && setActiveItemState(null);
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
      bindDocumentResizeListener = _useResizeListener2[0];
    var position = function position() {
      if (elementRef.current) {
        var parentItem = elementRef.current.parentElement;
        var containerOffset = utils.DomHandler.getOffset(parentItem);
        var viewport = utils.DomHandler.getViewport();
        var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(elementRef.current);
        var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);
        var top = parseInt(containerOffset.top, 10) + elementRef.current.offsetHeight - utils.DomHandler.getWindowScrollTop();
        if (top > viewport.height) {
          elementRef.current.style.top = viewport.height - top + 'px';
        } else {
          elementRef.current.style.top = '0px';
        }
        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
          utils.DomHandler.addClass(elementRef.current, 'p-submenu-list-flipped');
        }
      }
    };
    var onItemMouseEnter = function onItemMouseEnter(event, item) {
      if (item.disabled || props.isMobileMode) {
        event.preventDefault();
        return;
      }
      if (props.root) {
        if (activeItemState || props.popup) {
          setActiveItemState(item);
        }
      } else {
        setActiveItemState(item);
      }
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
      if (props.root || props.isMobileMode) {
        if (item.items) {
          if (activeItemState && item === activeItemState) setActiveItemState(null);else setActiveItemState(item);
        }
      }
      if (!item.items) {
        onLeafClick(event);
      }
    };
    var onItemKeyDown = function onItemKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;
      switch (event.which) {
        //down
        case 40:
          var nextItem = findNextItem(listItem);
          nextItem && nextItem.children[0].focus();
          event.preventDefault();
          break;

        //up
        case 38:
          var prevItem = findPrevItem(listItem);
          prevItem && prevItem.children[0].focus();
          event.preventDefault();
          break;

        //right
        case 39:
          if (item.items) {
            setActiveItemState(item);
            setTimeout(function () {
              listItem.children[1].children[0].children[0].focus();
            }, 50);
          }
          event.preventDefault();
          break;
      }
      props.onKeyDown && props.onKeyDown(event, listItem);
    };
    var onChildItemKeyDown = function onChildItemKeyDown(event, childListItem) {
      //left
      if (event.which === 37) {
        setActiveItemState(null);
        childListItem.parentElement.previousElementSibling.focus();
      }
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-disabled') || !utils.DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-disabled') || !utils.DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
    };
    var onLeafClick = function onLeafClick(event) {
      if (!props.isMobileMode || props.popup) {
        setActiveItemState(null);
        props.onLeafClick && props.onLeafClick(event);
        props.onHide && props.onHide(event);
      }
    };
    hooks.useMountEffect(function () {
      bindDocumentClickListener();
      bindDocumentResizeListener();
    });
    hooks.useUpdateEffect(function () {
      if (!props.parentActive) {
        setActiveItemState(null);
      }
      if (!props.root && props.parentActive && !props.isMobileMode) {
        position();
      }
    }, [props.parentActive]);
    hooks.useUpdateEffect(function () {
      props.onItemToggle && props.onItemToggle();
    }, [activeItemState]);
    var createSeparator = function createSeparator(index) {
      var key = 'separator_' + index;
      var separatorProps = utils.mergeProps({
        key: key,
        className: 'p-menu-separator',
        role: 'separator'
      }, props.ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createSubmenu = function createSubmenu(item) {
      if (item.items) {
        return /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
          menuProps: props.menuProps,
          model: item.items,
          onLeafClick: onLeafClick,
          popup: props.popup,
          onKeyDown: onChildItemKeyDown,
          parentActive: item === activeItemState,
          isMobileMode: props.isMobileMode,
          onItemToggle: props.onItemToggle,
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
      item.id;
        var _className = item.className,
        style = item.style,
        disabled = item.disabled,
        _icon = item.icon,
        _label = item.label,
        items = item.items,
        target = item.target,
        url = item.url,
        template = item.template;
      var key = _label + '_' + index;
      var active = activeItemState === item;
      var className = utils.classNames('p-menuitem', {
        'p-menuitem-active': active
      }, _className);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', _icon);
      var iconProps = utils.mergeProps({
        className: iconClassName
      }, getPTOptions(item, 'icon'));
      var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
        props: props.menuProps
      });
      var labelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, getPTOptions(item, 'label'));
      var label = _label && /*#__PURE__*/React__namespace.createElement("span", labelProps, _label);
      var submenuIconClassName = 'p-submenu-icon';
      var submenuIconProps = utils.mergeProps({
        className: submenuIconClassName
      }, getPTOptions(item, 'submenuIcon'));
      var submenuIcon = item.items && utils.IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps), _objectSpread({}, submenuIconProps), {
        props: props.menuProps
      });
      var submenu = createSubmenu(item);
      var actionProps = utils.mergeProps({
        href: url || '#',
        className: linkClassName,
        target: target,
        role: 'menuitem',
        'aria-haspopup': items != null,
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event, item);
        },
        'aria-disabled': disabled
      }, getPTOptions(item, 'action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return onItemClick(event, item);
          },
          onKeyDown: function onKeyDown(event) {
            return onItemKeyDown(event, item);
          },
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          submenuIconClassName: submenuIconClassName,
          element: content,
          props: props,
          active: active,
          disabled: disabled
        };
        content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
      }
      var menuitemProps = utils.mergeProps({
        key: key,
        id: item.id,
        className: className,
        style: style,
        onMouseEnter: function onMouseEnter(event) {
          return onItemMouseEnter(event, item);
        },
        role: 'none'
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
      ref: elementRef,
      className: className,
      role: props.root ? 'menubar' : 'menu',
      'aria-orientation': 'horizontal'
    }, props.ptm('menu'));
    return /*#__PURE__*/React__namespace.createElement("ul", menuProps, submenu);
  });
  TieredMenuSub.displayName = 'TieredMenuSub';

  var TieredMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = TieredMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(!props.popup),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      attributeSelectorState = _React$useState4[0],
      setAttributeSelectorState = _React$useState4[1];
    var _TieredMenuBase$setMe = TieredMenuBase.setMetaData({
        props: props,
        state: {
          visible: visibleState,
          attributeSelector: attributeSelectorState
        }
      }),
      ptm = _TieredMenuBase$setMe.ptm;
    var menuRef = React__namespace.useRef(null);
    var targetRef = React__namespace.useRef(null);
    var styleElementRef = React__namespace.useRef(null);
    var isMobileMode = hooks.useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
    var _useOverlayListener = hooks.useOverlayListener({
        target: targetRef,
        overlay: menuRef,
        listener: function listener(event, _ref) {
          var valid = _ref.valid;
          valid && hide(event);
        },
        when: visibleState
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var onPanelClick = function onPanelClick(event) {
      if (props.popup) {
        overlayservice.OverlayService.emit('overlay-click', {
          originalEvent: event,
          target: targetRef.current
        });
      }
    };
    var toggle = function toggle(event) {
      if (props.popup) {
        visibleState ? hide(event) : show(event);
      }
    };
    var show = function show(event) {
      targetRef.current = event.currentTarget;
      setVisibleState(true);
      props.onShow && props.onShow(event);
    };
    var hide = function hide(event) {
      if (props.popup) {
        targetRef.current = event.currentTarget;
        setVisibleState(false);
        props.onHide && props.onHide(event);
      }
    };
    var onItemToggle = function onItemToggle() {
      if (props.popup && isMobileMode) {
        utils.DomHandler.absolutePosition(menuRef.current, targetRef.current);
      }
    };
    var createStyle = function createStyle() {
      if (!styleElementRef.current) {
        styleElementRef.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce);
        var selector = "".concat(attributeSelectorState);
        var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-tieredmenu[").concat(selector, "] > ul {\n        max-height: ").concat(props.scrollHeight, ";\n        overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-list {\n        position: relative;\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-submenu-list {\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        padding: 0 0 0 calc(var(--inline-spacing) * 2); /* @todo */\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-tieredmenu[").concat(selector, "] .p-submenu-icon:before {\n        content: \"\\e930\";\n    }\n\n    ").concat(!props.popup ? ".p-tieredmenu[".concat(selector, "] { width: 100%; }") : '', "\n}\n");
        styleElementRef.current.innerHTML = innerHTML;
      }
    };
    var destroyStyle = function destroyStyle() {
      styleElementRef.current = utils.DomHandler.removeInlineStyle(styleElementRef.current);
    };
    var onEnter = function onEnter() {
      if (props.autoZIndex) {
        utils.ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
      }
      utils.DomHandler.absolutePosition(menuRef.current, targetRef.current);
      if (attributeSelectorState && props.breakpoint) {
        menuRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
    };
    var onEntered = function onEntered() {
      bindOverlayListener();
    };
    var onExit = function onExit() {
      targetRef.current = null;
      unbindOverlayListener();
    };
    var onExited = function onExited() {
      utils.ZIndexUtils.clear(menuRef.current);
      destroyStyle();
    };
    hooks.useMountEffect(function () {
      if (props.breakpoint) {
        !attributeSelectorState && setAttributeSelectorState(utils.UniqueComponentId());
      }
    });
    hooks.useUpdateEffect(function () {
      if (attributeSelectorState && menuRef.current) {
        menuRef.current.setAttribute(attributeSelectorState, '');
        createStyle();
      }
      return function () {
        destroyStyle();
      };
    }, [attributeSelectorState, props.breakpoint]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(menuRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        toggle: toggle,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return menuRef.current;
        }
      };
    });
    var createElement = function createElement() {
      TieredMenuBase.getOtherProps(props);
      var className = utils.classNames('p-tieredmenu p-component', {
        'p-tieredmenu-overlay': props.popup,
        'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
      }, props.className);
      var rootProps = utils.mergeProps({
        ref: menuRef,
        id: props.id,
        className: className,
        style: props.style,
        onClick: onPanelClick
      }, TieredMenuBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: menuRef,
        classNames: "p-connected-overlay",
        "in": visibleState,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntered: onEntered,
        onExit: onExit,
        onExited: onExited
      }, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
        menuProps: props,
        model: props.model,
        root: true,
        popup: props.popup,
        onHide: hide,
        isMobileMode: isMobileMode,
        onItemToggle: onItemToggle,
        submenuIcon: props.submenuIcon,
        ptm: ptm
      })));
    };
    var element = createElement();
    return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    }) : element;
  }));
  TieredMenu.displayName = 'TieredMenu';

  exports.TieredMenu = TieredMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.overlayservice, primereact.portal, primereact.utils, primereact.componentbase, primereact.ripple, primereact.icons.angleright);
