'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var portal = require('primereact/portal');
var utils = require('primereact/utils');
var ripple = require('primereact/ripple');

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

var TieredMenuSub = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeItemState = _React$useState2[0],
      setActiveItemState = _React$useState2[1];

  var elementRef = React__namespace.useRef(null);

  var _useEventListener = hooks.useEventListener({
    type: 'click',
    listener: function listener(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setActiveItemState(null);
      }
    }
  }),
      _useEventListener2 = _slicedToArray(_useEventListener, 1),
      bindDocumentClickListener = _useEventListener2[0];

  var position = function position() {
    if (elementRef.current) {
      var parentItem = elementRef.current.parentElement;
      var containerOffset = utils.DomHandler.getOffset(parentItem);
      var viewport = utils.DomHandler.getViewport();
      var sublistWidth = elementRef.current.offsetParent ? elementRef.current.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(elementRef.current);
      var itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);

      if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - utils.DomHandler.calculateScrollbarWidth()) {
        utils.DomHandler.addClass(elementRef.current, 'p-submenu-list-flipped');
      }
    }
  };

  var onItemMouseEnter = function onItemMouseEnter(event, item) {
    if (item.disabled) {
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

    if (props.root) {
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
    setActiveItemState(null);
    props.onLeafClick && props.onLeafClick(event);
    props.onHide && props.onHide(event);
  };

  hooks.useMountEffect(function () {
    bindDocumentClickListener();
  });
  hooks.useUpdateEffect(function () {
    if (!props.parentActive) {
      setActiveItemState(null);
    }

    if (!props.root && props.parentActive) {
      position();
    }
  }, [props.parentActive]);

  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      className: "p-menu-separator",
      role: "separator"
    });
  };

  var createSubmenu = function createSubmenu(item) {
    if (item.items) {
      return /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
        menuProps: props.menuProps,
        model: item.items,
        onLeafClick: onLeafClick,
        popup: props.popup,
        onKeyDown: onChildItemKeyDown,
        parentActive: item === activeItemState
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
    var submenuIconClassName = 'p-submenu-icon pi pi-angle-right';
    var icon = utils.IconUtils.getJSXIcon(_icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props.menuProps
    });

    var label = _label && /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-menuitem-text"
    }, _label);

    var submenuIcon = items && /*#__PURE__*/React__namespace.createElement("span", {
      className: submenuIconClassName
    });
    var submenu = createSubmenu(item);
    var content = /*#__PURE__*/React__namespace.createElement("a", {
      href: url || '#',
      className: linkClassName,
      target: target,
      role: "menuitem",
      "aria-haspopup": items != null,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event, item);
      },
      "aria-disabled": disabled
    }, icon, label, submenuIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));

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

    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      id: item,
      className: className,
      style: style,
      onMouseEnter: function onMouseEnter(event) {
        return onItemMouseEnter(event, item);
      },
      role: "none"
    }, content, submenu);
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
  return /*#__PURE__*/React__namespace.createElement("ul", {
    ref: elementRef,
    className: className,
    role: props.root ? 'menubar' : 'menu',
    "aria-orientation": "horizontal"
  }, submenu);
});
TieredMenuSub.displayName = 'TieredMenuSub';

var TieredMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(!props.popup),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];

  var menuRef = React__namespace.useRef(null);
  var targetRef = React__namespace.useRef(null);

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

  var onEnter = function onEnter() {
    if (props.autoZIndex) {
      utils.ZIndexUtils.set('menu', menuRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['menu']);
    }

    utils.DomHandler.absolutePosition(menuRef.current, targetRef.current);
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
  };

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
    var otherProps = utils.ObjectUtils.findDiffKeys(props, TieredMenu.defaultProps);
    var className = utils.classNames('p-tieredmenu p-component', {
      'p-tieredmenu-overlay': props.popup
    }, props.className);
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
    }, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: menuRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onPanelClick
    }), /*#__PURE__*/React__namespace.createElement(TieredMenuSub, {
      menuProps: props,
      model: props.model,
      root: true,
      popup: props.popup,
      onHide: hide
    })));
  };

  var element = createElement();
  return props.popup ? /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
TieredMenu.displayName = 'TieredMenu';
TieredMenu.defaultProps = {
  __TYPE: 'TieredMenu',
  id: null,
  model: null,
  popup: false,
  style: null,
  className: null,
  autoZIndex: true,
  baseZIndex: 0,
  appendTo: null,
  transitionOptions: null,
  onShow: null,
  onHide: null
};

exports.TieredMenu = TieredMenu;
