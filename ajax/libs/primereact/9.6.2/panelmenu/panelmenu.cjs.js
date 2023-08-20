'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var chevrondown = require('primereact/icons/chevrondown');
var chevronright = require('primereact/icons/chevronright');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var PanelMenuBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Panel',
    id: null,
    model: null,
    style: null,
    submenuIcon: null,
    className: null,
    multiple: false,
    transitionOptions: null,
    children: undefined
  }
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PanelMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var getPTOptions = function getPTOptions(item, key) {
    return props.ptm(key, {
      context: {
        active: isItemActive(item)
      }
    });
  };
  var findActiveItem = function findActiveItem() {
    if (props.model) {
      if (props.multiple) {
        return props.model.filter(function (item) {
          return item.expanded;
        });
      } else {
        var activeItem = null;
        props.model.forEach(function (item) {
          if (item.expanded) {
            if (!activeItem) activeItem = item;else item.expanded = false;
          }
        });
        return activeItem;
      }
    }
    return null;
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
    var activeItem = activeItemState;
    var active = isItemActive(item);
    if (active) {
      item.expanded = false;
      setActiveItemState(props.multiple ? activeItem.filter(function (a_item) {
        return a_item !== item;
      }) : null);
    } else {
      if (!props.multiple && activeItem) {
        activeItem.expanded = false;
      }
      item.expanded = true;
      setActiveItemState(props.multiple ? [].concat(_toConsumableArray(activeItem || []), [item]) : item);
    }
  };
  var isItemActive = function isItemActive(item) {
    return activeItemState && (props.multiple ? activeItemState.indexOf(item) > -1 : activeItemState === item);
  };
  hooks.useMountEffect(function () {
    setActiveItemState(findActiveItem());
  });
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = utils.mergeProps({
      key: key,
      className: 'p-menu-separator'
    }, props.ptm('separator'));
    return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item, active) {
    var className = utils.classNames('p-toggleable-content', {
      'p-toggleable-content-collapsed': !active
    });
    var submenuRef = /*#__PURE__*/React__namespace.createRef();
    var toggleableContentProps = utils.mergeProps({
      ref: submenuRef,
      className: className
    }, props.ptm('toggleableContent'));
    if (item.items) {
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: submenuRef,
        classNames: "p-toggleable-content",
        timeout: {
          enter: 1000,
          exit: 450
        },
        "in": active,
        unmountOnExit: true
      }, /*#__PURE__*/React__namespace.createElement("div", toggleableContentProps, /*#__PURE__*/React__namespace.createElement(PanelMenuSub, {
        menuProps: props.menuProps,
        model: item.items,
        multiple: props.multiple,
        submenuIcon: props.submenuIcon,
        ptm: props.ptm
      })));
    }
    return null;
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = item.label + '_' + index;
    var active = isItemActive(item);
    var className = utils.classNames('p-menuitem', item.className);
    var linkClassName = utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var iconProps = utils.mergeProps({
      className: iconClassName
    }, getPTOptions(item, 'icon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = utils.mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(item, 'label'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
    var submenuIconClassName = 'p-panelmenu-icon';
    var submenuIconProps = utils.mergeProps({
      className: submenuIconClassName
    }, getPTOptions(item, 'submenuicon'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, submenuIconProps));
    var submenu = createSubmenu(item, active);
    var actionProps = utils.mergeProps({
      href: item.url || '#',
      className: linkClassName,
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      role: 'menuitem',
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'action'));
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, submenuIcon, icon, label);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
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
    var menuitemProps = utils.mergeProps({
      key: key,
      id: item.id,
      className: className,
      style: item.style,
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
  var className = utils.classNames('p-submenu-list', props.className);
  var menu = createMenu();
  var menuProps = utils.mergeProps({
    className: className,
    role: 'tree'
  }, props.ptm('menu'));
  return /*#__PURE__*/React__namespace.createElement("ul", menuProps, menu);
});
PanelMenuSub.displayName = 'PanelMenuSub';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PanelMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
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
  var _React$useState5 = React__namespace.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    animationDisabled = _React$useState6[0],
    setAnimationDisabled = _React$useState6[1];
  var elementRef = React__namespace.useRef(null);
  var headerId = idState + '_header';
  var contentId = idState + '_content';
  var _PanelMenuBase$setMet = PanelMenuBase.setMetaData({
      props: props,
      state: {
        id: idState,
        activeItem: activeItemState,
        animationDisabled: animationDisabled
      }
    }),
    ptm = _PanelMenuBase$setMet.ptm;
  var findActiveItem = function findActiveItem() {
    if (props.model) {
      if (props.multiple) {
        return props.model.filter(function (item) {
          return item.expanded;
        });
      } else {
        var activeItem = null;
        props.model.forEach(function (item) {
          if (item.expanded) {
            if (!activeItem) activeItem = item;else item.expanded = false;
          }
        });
        return activeItem;
      }
    }
    return null;
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
    var activeItem = activeItemState;
    var active = isItemActive(item);
    if (active) {
      item.expanded = false;
      setActiveItemState(props.multiple ? activeItem.filter(function (a_item) {
        return a_item !== item;
      }) : null);
    } else {
      if (!props.multiple && activeItem) {
        activeItem.expanded = false;
      }
      item.expanded = true;
      setActiveItemState(props.multiple ? [].concat(_toConsumableArray(activeItem || []), [item]) : item);
    }
  };
  var isItemActive = function isItemActive(item) {
    return activeItemState && (props.multiple ? activeItemState.indexOf(item) > -1 : activeItemState === item);
  };
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      context: {
        active: isItemActive(item)
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
    if (!idState) {
      setIdState(utils.UniqueComponentId());
    }
    setActiveItemState(findActiveItem());
  });
  hooks.useUpdateEffect(function () {
    setAnimationDisabled(true);
    setActiveItemState(findActiveItem());
  }, [props.model]);
  var onEnter = function onEnter() {
    setAnimationDisabled(false);
  };
  var createPanel = function createPanel(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = item.label + '_' + index;
    var active = isItemActive(item);
    var className = utils.classNames('p-panelmenu-panel', item.className);
    var headerClassName = utils.classNames('p-component p-panelmenu-header', {
      'p-highlight': active,
      'p-disabled': item.disabled
    });
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var headerIconProps = utils.mergeProps({
      className: iconClassName
    }, getPTOptions(item, 'headerIcon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, headerIconProps), {
      props: props
    });
    var submenuIconClassName = 'p-panelmenu-icon';
    var headerSubmenuIconProps = utils.mergeProps({
      className: submenuIconClassName
    }, getPTOptions(item, 'headerSubmenuIcon'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, headerSubmenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, headerSubmenuIconProps));
    var headerLabelProps = utils.mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(item, 'headerLabel'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", headerLabelProps, item.label);
    var contentWrapperClassName = utils.classNames('p-toggleable-content', {
      'p-toggleable-content-collapsed': !active
    });
    var menuContentRef = /*#__PURE__*/React__namespace.createRef();
    var headerActionProps = utils.mergeProps({
      href: item.url || '#',
      className: 'p-panelmenu-header-link',
      onClick: function onClick(e) {
        return onItemClick(e, item);
      },
      'aria-expanded': active,
      id: headerId,
      'aria-controls': contentId,
      'aria-disabled': item.disabled
    }, getPTOptions(item, 'headerAction'));
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
    var panelProps = utils.mergeProps({
      key: key,
      className: className,
      style: item.style
    }, getPTOptions(item, 'panel'));
    var headerProps = utils.mergeProps({
      className: headerClassName,
      style: item.style
    }, getPTOptions(item, 'header'));
    var menuContentProps = utils.mergeProps({
      className: 'p-panelmenu-content'
    }, getPTOptions(item, 'menuContent'));
    var headerToggleableContentProps = utils.mergeProps({
      ref: menuContentRef,
      className: contentWrapperClassName,
      role: 'region',
      id: contentId,
      'aria-labelledby': headerId
    }, getPTOptions(item, 'headerToggleableContent'));
    return /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", headerProps, content), /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: menuContentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      onEnter: onEnter,
      disabled: animationDisabled,
      "in": active,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React__namespace.createElement("div", headerToggleableContentProps, /*#__PURE__*/React__namespace.createElement("div", menuContentProps, /*#__PURE__*/React__namespace.createElement(PanelMenuSub, {
      menuProps: props,
      model: item.items,
      className: "p-panelmenu-root-submenu",
      multiple: props.multiple,
      submenuIcon: props.submenuIcon,
      ptm: ptm
    })))));
  };
  var createPanels = function createPanels() {
    return props.model ? props.model.map(createPanel) : null;
  };
  var className = utils.classNames('p-panelmenu p-component', props.className);
  var panels = createPanels();
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, PanelMenuBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, panels);
}));
PanelMenu.displayName = 'PanelMenu';

exports.PanelMenu = PanelMenu;
