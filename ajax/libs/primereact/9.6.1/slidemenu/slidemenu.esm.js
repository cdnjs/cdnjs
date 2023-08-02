import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronLeftIcon } from 'primereact/icons/chevronleft';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { classNames, mergeProps, IconUtils, ObjectUtils, ZIndexUtils, DomHandler } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { AngleRightIcon } from 'primereact/icons/angleright';

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

var SlideMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SlideMenu',
    appendTo: null,
    autoZIndex: true,
    backIcon: null,
    backLabel: 'Back',
    baseZIndex: 0,
    className: null,
    easing: 'ease-out',
    effectDuration: 250,
    id: null,
    menuWidth: 190,
    model: null,
    onHide: null,
    onShow: null,
    onNavigate: null,
    popup: false,
    style: null,
    submenuIcon: null,
    transitionOptions: null,
    viewportHeight: 175,
    children: undefined
  }
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SlideMenuSub = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var _React$useState3 = React.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    renderSubMenu = _React$useState4[0],
    setRenderSubMenu = _React$useState4[1];
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        active: activeItemState === item
      }
    });
  };
  var onItemClick = function onItemClick(event, item, index) {
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
    if (item.items) {
      var key = createKey(item, index);
      setRenderSubMenu(_objectSpread$1(_objectSpread$1({}, renderSubMenu), {}, _defineProperty({}, key, true)));
      setActiveItemState(item);
      props.onForward();
    }
  };
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = mergeProps({
      key: key,
      className: 'p-slidemenu-separator'
    }, props.ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item, index) {
    var shouldRender = renderSubMenu[createKey(item, index)];
    if (item.items && shouldRender) {
      return /*#__PURE__*/React.createElement(SlideMenuSub, {
        menuProps: props.menuProps,
        model: item.items,
        index: props.index + 1,
        menuWidth: props.menuWidth,
        effectDuration: props.effectDuration,
        onForward: props.onForward,
        parentActive: item === activeItemState,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm
      });
    }
    return null;
  };
  var createKey = function createKey(item, index) {
    return item.label + '_' + index;
  };
  var createMenuitem = function createMenuitem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = createKey(item, index);
    var active = activeItemState === item;
    var className = classNames('p-menuitem', {
      'p-menuitem-active': active,
      'p-disabled': item.disabled
    }, item.className);
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var iconProps = mergeProps({
      className: 'p-menuitem-icon'
    }, getPTOptions(item, 'icon'));
    var icon = IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var submenuIconClassName = 'p-submenu-icon';
    var submenuIconProps = mergeProps({
      className: submenuIconClassName
    }, getPTOptions(item, 'submenuIcon'));
    var labelProps = mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(item, 'label'));
    var submenuIcon = item.items && IconUtils.getJSXIcon(props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps), _objectSpread$1({}, submenuIconProps), {
      props: props
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", labelProps, item.label);
    var submenu = createSubmenu(item, index);
    var actionProps = mergeProps({
      href: item.url || '#',
      className: 'p-menuitem-link',
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item, index);
      },
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, submenuIcon);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item, index);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        submenuIconClassName: submenuIconClassName,
        element: content,
        props: props,
        active: active
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    var menuitemProps = mergeProps({
      id: item.id,
      key: key,
      className: className,
      style: item.style
    }, getPTOptions(item, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuitemProps, content, submenu);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : createMenuitem(item, index);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var style = {
    width: props.menuWidth + 'px',
    left: props.root ? -1 * props.level * props.menuWidth + 'px' : props.menuWidth + 'px',
    transitionProperty: props.root ? 'left' : 'none',
    transitionDuration: props.effectDuration + 'ms',
    transitionTimingFunction: props.easing
  };
  var className = classNames({
    'p-slidemenu-rootlist': props.root,
    'p-submenu-list': !props.root,
    'p-active-submenu': props.parentActive
  });
  var items = createItems();
  var menuProps = mergeProps({
    className: className,
    style: style
  }, props.ptm('menu'));
  return /*#__PURE__*/React.createElement("ul", menuProps, items);
});
SlideMenuSub.displayName = 'SlideMenuSub';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SlideMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = SlideMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    levelState = _React$useState2[0],
    setLevelState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visibleState = _React$useState4[0],
    setVisibleState = _React$useState4[1];
  var _SlideMenuBase$setMet = SlideMenuBase.setMetaData({
      props: props,
      state: {
        visible: visibleState,
        level: levelState
      }
    }),
    ptm = _SlideMenuBase$setMet.ptm;
  var menuRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var backward = React.useRef(null);
  var slideMenuContent = React.useRef(null);
  var _useOverlayListener = useOverlayListener({
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
      OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: targetRef.current
      });
    }
  };
  var navigateForward = function navigateForward() {
    setLevelState(function (prevLevel) {
      return prevLevel + 1;
    });
  };
  var navigateBack = function navigateBack() {
    setLevelState(function (prevLevel) {
      return prevLevel - 1;
    });
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
    targetRef.current = event.currentTarget;
    setVisibleState(false);
    props.onHide && props.onHide(event);
  };
  var onEnter = function onEnter() {
    if (props.autoZIndex) {
      ZIndexUtils.set('menu', menuRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    }
    DomHandler.absolutePosition(menuRef.current, targetRef.current);
  };
  var onEntered = function onEntered() {
    bindOverlayListener();
  };
  var onExit = function onExit() {
    targetRef.current = null;
    unbindOverlayListener();
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(menuRef.current);
    setLevelState(0);
  };
  useUpdateEffect(function () {
    setLevelState(0);
  }, [props.model]);
  useUpdateEffect(function () {
    props.onNavigate && props.onNavigate({
      level: levelState
    });
  }, [levelState]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(menuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      navigateForward: navigateForward,
      navigateBack: navigateBack,
      setLevelState: setLevelState,
      getElement: function getElement() {
        return menuRef.current;
      }
    };
  });
  var createBackward = function createBackward() {
    var className = classNames('p-slidemenu-backward', {
      'p-hidden': levelState === 0
    });
    var iconClassName = 'p-slidemenu-backward-icon';
    var previousIconProps = mergeProps({
      className: iconClassName
    }, ptm('previousIcon'));
    var icon = props.backIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousIconProps);
    var backIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, previousIconProps), {
      props: props
    });
    var previousLabelProps = mergeProps(ptm('previousLabel'));
    var previousProps = mergeProps({
      ref: backward,
      className: className,
      onClick: function onClick(e) {
        return navigateBack();
      }
    }, ptm('previous'));
    return /*#__PURE__*/React.createElement("div", previousProps, backIcon, /*#__PURE__*/React.createElement("span", previousLabelProps, props.backLabel));
  };
  var createElement = function createElement() {
    var className = classNames('p-slidemenu p-component', {
      'p-slidemenu-overlay': props.popup
    }, props.className);
    var wrapperStyle = {
      height: props.viewportHeight + 'px'
    };
    var backward = createBackward();
    var rootProps = mergeProps({
      ref: menuRef,
      id: props.id,
      className: className,
      style: props.style,
      onClick: function onClick(e) {
        return onPanelClick(e);
      }
    }, SlideMenuBase.getOtherProps(props), ptm('root'));
    var wrapperProps = mergeProps({
      className: 'p-slidemenu-wrapper',
      style: wrapperStyle
    }, ptm('wrapper'));
    var contentProps = mergeProps({
      ref: slideMenuContent,
      className: 'p-slidemenu-content'
    }, ptm('content'));
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: menuRef,
      classNames: "p-connected-overlay",
      "in": !props.popup || visibleState,
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
    }, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement(SlideMenuSub, {
      menuProps: props,
      model: props.model,
      root: true,
      index: 0,
      menuWidth: props.menuWidth,
      effectDuration: props.effectDuration,
      level: levelState,
      parentActive: levelState === 0,
      onForward: navigateForward,
      submenuIcon: props.submenuIcon,
      ptm: ptm
    })), backward)));
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
SlideMenu.displayName = 'SlideMenu';

export { SlideMenu };
