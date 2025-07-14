this.primereact = this.primereact || {};
this.primereact.menubar = (function (exports, React, PrimeReact, hooks, bars, utils, componentbase, ripple, angleright, angledown) {
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

  var MenubarBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Menubar',
      id: null,
      model: null,
      style: null,
      className: null,
      start: null,
      submenuIcon: null,
      menuIcon: null,
      end: null,
      children: undefined
    }
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var MenubarSub = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeItemState = _React$useState2[0],
      setActiveItemState = _React$useState2[1];
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
          if (ref && ref.current && !ref.current.contains(event.target)) {
            setActiveItemState(null);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 1),
      bindDocumentClickListener = _useEventListener2[0];
    var onItemMouseEnter = function onItemMouseEnter(event, item) {
      if (item.disabled || props.mobileActive) {
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
      if (item.items) activeItemState && item === activeItemState ? setActiveItemState(null) : setActiveItemState(item);else onLeafClick();
    };
    var onItemKeyDown = function onItemKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;
      switch (event.which) {
        //down
        case 40:
          if (props.root) item.items && expandSubmenu(item, listItem);else navigateToNextItem(listItem);
          event.preventDefault();
          break;

        //up
        case 38:
          !props.root && navigateToPrevItem(listItem);
          event.preventDefault();
          break;

        //right
        case 39:
          if (props.root) {
            var nextItem = findNextItem(listItem);
            nextItem && nextItem.children[0].focus();
          } else {
            item.items && expandSubmenu(item, listItem);
          }
          event.preventDefault();
          break;

        //left
        case 37:
          props.root && navigateToPrevItem(listItem);
          event.preventDefault();
          break;
      }
      props.onKeyDown && props.onKeyDown(event, listItem);
    };
    var onChildItemKeyDown = function onChildItemKeyDown(event, childListItem) {
      if (props.root) {
        //up
        if (event.which === 38 && childListItem.previousElementSibling == null) {
          collapseMenu(childListItem);
        }
      } else {
        //left
        if (event.which === 37) {
          collapseMenu(childListItem);
        }
      }
    };
    var expandSubmenu = function expandSubmenu(item, listItem) {
      setActiveItemState(item);
      setTimeout(function () {
        listItem.children[1].children[0].children[0].focus();
      }, 50);
    };
    var collapseMenu = function collapseMenu(listItem) {
      setActiveItemState(null);
      listItem.parentElement.previousElementSibling.focus();
    };
    var navigateToNextItem = function navigateToNextItem(listItem) {
      var nextItem = findNextItem(listItem);
      nextItem && nextItem.children[0].focus();
    };
    var navigateToPrevItem = function navigateToPrevItem(listItem) {
      var prevItem = findPrevItem(listItem);
      prevItem && prevItem.children[0].focus();
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? utils.DomHandler.hasClass(nextItem, 'p-disabled') || !utils.DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? utils.DomHandler.hasClass(prevItem, 'p-disabled') || !utils.DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
    };
    var onLeafClick = function onLeafClick() {
      setActiveItemState(null);
      props.onLeafClick && props.onLeafClick();
    };
    hooks.useMountEffect(function () {
      bindDocumentClickListener();
    });
    hooks.useUpdateEffect(function () {
      !props.parentActive && setActiveItemState(null);
    }, [props.parentActive]);
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
        return /*#__PURE__*/React__namespace.createElement(MenubarSub, {
          menuProps: props.menuProps,
          model: item.items,
          mobileActive: props.mobileActive,
          onLeafClick: onLeafClick,
          onKeyDown: onChildItemKeyDown,
          parentActive: item === activeItemState,
          submenuIcon: props.submenuIcon,
          ptm: props.ptm
        });
      }
      return null;
    };
    var createMenuitem = function createMenuitem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var key = item.label + '_' + index;
      var className = utils.classNames('p-menuitem', {
        'p-menuitem-active': activeItemState === item
      }, item.className);
      var linkClassName = utils.classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var iconProps = utils.mergeProps({
        className: 'p-menuitem-icon'
      }, getPTOptions(item, 'icon'));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
        props: props.menuProps
      });
      var labelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, getPTOptions(item, 'label'));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var submenuIconClassName = 'p-submenu-icon';
      var submenuIconProps = utils.mergeProps({
        className: submenuIconClassName
      }, getPTOptions(item, 'submenuIcon'));
      var submenuIcon = item.items && utils.IconUtils.getJSXIcon(!props.root ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angleright.AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(angledown.AngleDownIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
        props: _objectSpread$1({
          menuProps: props.menuProps
        }, props)
      });
      var submenu = createSubmenu(item);
      var actionProps = utils.mergeProps({
        href: item.url || '#',
        role: 'menuitem',
        className: linkClassName,
        target: item.target,
        'aria-haspopup': item.items != null,
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event, item);
        }
      }, getPTOptions(item, 'action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (item.template) {
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
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var menuitemProps = utils.mergeProps({
        key: key,
        role: 'none',
        id: item.id,
        className: className,
        style: item.style,
        onMouseEnter: function onMouseEnter(event) {
          return onItemMouseEnter(event, item);
        }
      }, getPTOptions(item, 'menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuitemProps, content, submenu);
    };
    var createItem = function createItem(item, index) {
      return item.separator ? createSeparator(index) : createMenuitem(item, index);
    };
    var createMenu = function createMenu() {
      return props.model ? props.model.map(createItem) : null;
    };
    var role = props.root ? 'menubar' : 'menu';
    var className = utils.classNames({
      'p-submenu-list': !props.root,
      'p-menubar-root-list': props.root
    });
    var submenu = createMenu();
    var menuProps = utils.mergeProps({
      ref: ref,
      className: className,
      role: role
    }, props.ptm('menu'));
    return /*#__PURE__*/React__namespace.createElement("ul", menuProps, submenu);
  }));
  MenubarSub.displayName = 'MenubarSub';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var Menubar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = MenubarBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mobileActiveState = _React$useState2[0],
      setMobileActiveState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var rootMenuRef = React__namespace.useRef(null);
    var menuButtonRef = React__namespace.useRef(null);
    var _MenubarBase$setMetaD = MenubarBase.setMetaData({
        props: props,
        state: {
          mobileActive: mobileActiveState
        }
      }),
      ptm = _MenubarBase$setMetaD.ptm;
    var _useEventListener = hooks.useEventListener({
        type: 'click',
        listener: function listener(event) {
          if (mobileActiveState && isOutsideClicked(event)) {
            setMobileActiveState(false);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentClickListener = _useEventListener2[0],
      unbindDocumentClickListener = _useEventListener2[1];
    var toggle = function toggle(event) {
      event.preventDefault();
      setMobileActiveState(function (prevMobileActive) {
        return !prevMobileActive;
      });
    };
    var onLeafClick = function onLeafClick() {
      setMobileActiveState(false);
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return rootMenuRef.current !== event.target && !rootMenuRef.current.contains(event.target) && menuButtonRef.current !== event.target && !menuButtonRef.current.contains(event.target);
    };
    hooks.useUpdateEffect(function () {
      if (mobileActiveState) {
        utils.ZIndexUtils.set('menu', rootMenuRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['menu'] || PrimeReact__default["default"].zIndex['menu']);
        bindDocumentClickListener();
      } else {
        unbindDocumentClickListener();
        utils.ZIndexUtils.clear(rootMenuRef.current);
      }
    }, [mobileActiveState]);
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(rootMenuRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        toggle: toggle,
        getElement: function getElement() {
          return elementRef.current;
        },
        getRootMenu: function getRootMenu() {
          return rootMenuRef.current;
        },
        getMenuButton: function getMenuButton() {
          return menuButtonRef.current;
        }
      };
    });
    var createStartContent = function createStartContent() {
      if (props.start) {
        var _start = utils.ObjectUtils.getJSXElement(props.start, props);
        var startProps = utils.mergeProps({
          className: 'p-menubar-start'
        }, ptm('start'));
        return /*#__PURE__*/React__namespace.createElement("div", startProps, _start);
      }
      return null;
    };
    var createEndContent = function createEndContent() {
      if (props.end) {
        var _end = utils.ObjectUtils.getJSXElement(props.end, props);
        var endProps = utils.mergeProps({
          className: 'p-menubar-end'
        }, ptm('end'));
        return /*#__PURE__*/React__namespace.createElement("div", endProps, _end);
      }
      return null;
    };
    var createMenuButton = function createMenuButton() {
      if (props.model && props.model.length < 1) {
        return null;
      }
      var buttonProps = utils.mergeProps({
        ref: menuButtonRef,
        href: '#',
        role: 'button',
        tabIndex: 0,
        className: 'p-menubar-button',
        onClick: function onClick(e) {
          return toggle(e);
        }
      }, ptm('button'));
      var popupIconProps = utils.mergeProps(ptm('popupIcon'));
      var icon = props.menuIcon || /*#__PURE__*/React__namespace.createElement(bars.BarsIcon, popupIconProps);
      var menuIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, popupIconProps), {
        props: props
      });

      /* eslint-disable */
      var button = /*#__PURE__*/React__namespace.createElement("a", buttonProps, menuIcon);
      /* eslint-enable */

      return button;
    };
    var className = utils.classNames('p-menubar p-component', {
      'p-menubar-mobile-active': mobileActiveState
    }, props.className);
    var start = createStartContent();
    var end = createEndContent();
    var menuButton = createMenuButton();
    var submenu = /*#__PURE__*/React__namespace.createElement(MenubarSub, {
      ref: rootMenuRef,
      menuProps: props,
      model: props.model,
      root: true,
      mobileActive: mobileActiveState,
      onLeafClick: onLeafClick,
      submenuIcon: props.submenuIcon,
      ptm: ptm
    });
    var rootProps = utils.mergeProps({
      id: props.id,
      className: className,
      style: props.style
    }, MenubarBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, start, menuButton, submenu, end);
  }));
  Menubar.displayName = 'Menubar';

  exports.Menubar = Menubar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.icons.bars, primereact.utils, primereact.componentbase, primereact.ripple, primereact.icons.angleright, primereact.icons.angledown);
