'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var chevrondown = require('primereact/icons/chevrondown');
var chevronright = require('primereact/icons/chevronright');
var utils = require('primereact/utils');

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
  headerIcon: function headerIcon(_ref) {
    var item = _ref.item;
    return utils.classNames('p-menuitem-icon', item.icon);
  },
  headerSubmenuIcon: 'p-panelmenu-icon',
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
  menuContent: 'p-panelmenu-content',
  root: function root(_ref4) {
    var props = _ref4.props;
    return utils.classNames('p-panelmenu p-component', props.className);
  },
  separator: 'p-menu-separator',
  toggleableContent: function toggleableContent(_ref5) {
    var active = _ref5.active;
    return utils.classNames('p-toggleable-content', {
      'p-toggleable-content-collapsed': !active
    });
  },
  icon: function icon(_ref6) {
    var item = _ref6.item;
    return utils.classNames('p-menuitem-icon', item.icon);
  },
  label: 'p-menuitem-text',
  submenuicon: 'p-panelmenu-icon',
  action: function action(_ref7) {
    var item = _ref7.item;
    return utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
  },
  menuitem: function menuitem(_ref8) {
    var item = _ref8.item;
    return utils.classNames('p-menuitem', item.className);
  },
  menu: 'p-submenu-list',
  submenu: 'p-submenu-list',
  transition: 'p-toggleable-content'
};
var styles = "\n@layer primereact {\n    .p-panelmenu .p-panelmenu-header-link {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        position: relative;\n        text-decoration: none;\n    }\n    \n    .p-panelmenu .p-panelmenu-header-link:focus {\n        z-index: 1;\n    }\n    \n    .p-panelmenu .p-submenu-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n    \n    .p-panelmenu .p-menuitem-link {\n        display: flex;\n        align-items: center;\n        user-select: none;\n        cursor: pointer;\n        text-decoration: none;\n    }\n    \n    .p-panelmenu .p-menuitem-text {\n        line-height: 1;\n    }\n}\n";
var PanelMenuBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'PanelMenu',
    id: null,
    model: null,
    style: null,
    submenuIcon: null,
    className: null,
    multiple: false,
    transitionOptions: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PanelMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var ptm = props.ptm,
    cx = props.cx;
  var _ptm = function _ptm(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var getPTOptions = function getPTOptions(item, key) {
    return _ptm(key, {
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
    var key = props.id + '_sep_' + index;
    var separatorProps = utils.mergeProps({
      id: key,
      key: key,
      className: cx('separator'),
      role: 'separator'
    }, _ptm('separator'));
    return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
  };
  var createSubmenu = function createSubmenu(item, active, index) {
    var submenuRef = /*#__PURE__*/React__namespace.createRef();
    var toggleableContentProps = utils.mergeProps({
      className: cx('toggleableContent', {
        active: active
      })
    }, _ptm('toggleableContent'));
    if (item.items) {
      var transitionProps = utils.mergeProps({
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
        id: props.id + '_' + index,
        menuProps: props.menuProps,
        model: item.items,
        multiple: props.multiple,
        submenuIcon: props.submenuIcon,
        ptm: ptm,
        cx: cx
      })));
    }
    return null;
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var key = item.id || props.id + '_' + index;
    var active = isItemActive(item);
    var linkClassName = utils.classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var iconProps = utils.mergeProps({
      className: cx('icon', {
        item: item
      })
    }, getPTOptions(item, 'icon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread$1({}, iconProps), {
      props: props.menuProps
    });
    var labelProps = utils.mergeProps({
      className: cx('label')
    }, getPTOptions(item, 'label'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
    var submenuIconClassName = 'p-panelmenu-icon';
    var submenuIconProps = utils.mergeProps({
      className: cx('submenuicon')
    }, getPTOptions(item, 'submenuicon'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, submenuIconProps));
    var submenu = createSubmenu(item, active, index);
    var actionProps = utils.mergeProps({
      href: item.url || '#',
      className: cx('action', {
        item: item
      }),
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
      id: key,
      className: cx('menuitem', {
        item: item
      }),
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
  var menu = createMenu();
  var ptKey = props.root ? 'menu' : 'submenu';
  var menuProps = utils.mergeProps({
    className: utils.classNames(cx(ptKey), props.className),
    role: 'tree'
  }, ptm(ptKey));
  return /*#__PURE__*/React__namespace.createElement("ul", menuProps, menu);
});
PanelMenuSub.displayName = 'PanelMenuSub';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
    ptm = _PanelMenuBase$setMet.ptm,
    cx = _PanelMenuBase$setMet.cx,
    isUnstyled = _PanelMenuBase$setMet.isUnstyled;
  componentbase.useHandleStyle(PanelMenuBase.css.styles, isUnstyled, {
    name: 'panelmenu'
  });
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
      if (item.items) {
        item.expanded = true;
        setActiveItemState(props.multiple ? [].concat(_toConsumableArray(activeItem || []), [item]) : item);
      }
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
    var key = item.id || idState + '_' + index;
    var active = isItemActive(item);
    var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
    var headerIconProps = utils.mergeProps({
      className: cx('headerIcon', {
        item: item
      })
    }, getPTOptions(item, 'headerIcon'));
    var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, headerIconProps), {
      props: props
    });
    var submenuIconClassName = 'p-panelmenu-icon';
    var headerSubmenuIconProps = utils.mergeProps({
      className: cx('headerSubmenuIcon')
    }, getPTOptions(item, 'headerSubmenuIcon'));
    var submenuIcon = item.items && utils.IconUtils.getJSXIcon(active ? props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, headerSubmenuIconProps) : props.submenuIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, headerSubmenuIconProps));
    var headerLabelProps = utils.mergeProps({
      className: cx('headerLabel')
    }, getPTOptions(item, 'headerLabel'));
    var label = item.label && /*#__PURE__*/React__namespace.createElement("span", headerLabelProps, item.label);
    var menuContentRef = /*#__PURE__*/React__namespace.createRef();
    var headerActionProps = utils.mergeProps({
      href: item.url || '#',
      className: cx('headerAction'),
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
      className: cx('panel', {
        item: item
      }),
      style: item.style
    }, getPTOptions(item, 'panel'));
    var headerProps = utils.mergeProps({
      className: cx('header', {
        active: active,
        item: item
      }),
      style: item.style
    }, getPTOptions(item, 'header'));
    var menuContentProps = utils.mergeProps({
      className: cx('menuContent')
    }, getPTOptions(item, 'menuContent'));
    var toggleableContentProps = utils.mergeProps({
      className: cx('toggleableContent', {
        active: active
      }),
      role: 'region',
      'aria-labelledby': headerId
    }, getPTOptions(item, 'toggleableContent'));
    var transitionProps = utils.mergeProps({
      classNames: cx('transition'),
      timeout: {
        enter: 1000,
        exit: 450
      },
      onEnter: onEnter,
      disabled: animationDisabled,
      "in": active,
      unmountOnExit: true,
      options: props.transitionOptions
    }, getPTOptions(item, 'transition'));
    return /*#__PURE__*/React__namespace.createElement("div", panelProps, /*#__PURE__*/React__namespace.createElement("div", headerProps, content), /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
      nodeRef: menuContentRef
    }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: contentId,
      ref: menuContentRef
    }, toggleableContentProps), /*#__PURE__*/React__namespace.createElement("div", menuContentProps, /*#__PURE__*/React__namespace.createElement(PanelMenuSub, {
      hostName: "PanelMenu",
      id: key,
      menuProps: props,
      model: item.items,
      className: "p-panelmenu-root-submenu",
      multiple: props.multiple,
      submenuIcon: props.submenuIcon,
      root: true,
      ptm: ptm,
      cx: cx
    })))));
  };
  var createPanels = function createPanels() {
    return props.model ? props.model.map(createPanel) : null;
  };
  var panels = createPanels();
  var rootProps = utils.mergeProps({
    className: cx('root'),
    style: props.style
  }, PanelMenuBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), panels);
}));
PanelMenu.displayName = 'PanelMenu';

exports.PanelMenu = PanelMenu;
