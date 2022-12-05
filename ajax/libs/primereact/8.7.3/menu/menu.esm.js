import * as React from 'react';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { ZIndexUtils, ObjectUtils, classNames, DomHandler, IconUtils } from 'primereact/utils';

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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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

var Menu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(!props.popup),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var menuRef = React.useRef(null);
  var targetRef = React.useRef(null);
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
    if (props.popup) {
      hide(event);
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
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
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
    ZIndexUtils.set('menu', menuRef.current, PrimeReact.autoZIndex, props.baseZIndex || PrimeReact.zIndex['menu']);
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
  };
  useUnmountEffect(function () {
    ZIndexUtils.clear(menuRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      toggle: toggle,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return menuRef.current;
      },
      getTarget: function getTarget() {
        return targetRef.current;
      }
    };
  });
  var createSubmenu = function createSubmenu(submenu, index) {
    var key = submenu.label + '_' + index;
    var className = classNames('p-submenu-header', {
      'p-disabled': submenu.disabled
    }, submenu.className);
    var items = submenu.items.map(createMenuItem);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: key
    }, /*#__PURE__*/React.createElement("li", {
      className: className,
      style: submenu.style,
      role: "presentation"
    }, submenu.label), items);
  };
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      className: "p-menu-separator",
      role: "separator"
    });
  };
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var className = classNames('p-menuitem', item.className);
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': item.disabled
    });
    var iconClassName = classNames('p-menuitem-icon', item.icon);
    var icon = IconUtils.getJSXIcon(item.icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props
    });
    var label = item.label && /*#__PURE__*/React.createElement("span", {
      className: "p-menuitem-text"
    }, item.label);
    var tabIndex = item.disabled ? null : 0;
    var key = item.label + '_' + index;
    var content = /*#__PURE__*/React.createElement("a", {
      href: item.url || '#',
      className: linkClassName,
      role: "menuitem",
      target: item.target,
      onClick: function onClick(event) {
        return onItemClick(event, item);
      },
      onKeyDown: function onKeyDown(event) {
        return onItemKeyDown(event);
      },
      tabIndex: tabIndex,
      "aria-disabled": item.disabled
    }, icon, label);
    if (item.template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event);
        },
        className: linkClassName,
        tabIndex: tabIndex,
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props
      };
      content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
    }
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      className: className,
      style: item.style,
      role: "none"
    }, content);
  };
  var createItem = function createItem(item, index) {
    return item.separator ? createSeparator(index) : item.items ? createSubmenu(item, index) : createMenuItem(item, index);
  };
  var createMenu = function createMenu() {
    return props.model.map(createItem);
  };
  var createElement = function createElement() {
    if (props.model) {
      var otherProps = ObjectUtils.findDiffKeys(props, Menu.defaultProps);
      var className = classNames('p-menu p-component', {
        'p-menu-overlay': props.popup
      }, props.className);
      var menuitems = createMenu();
      return /*#__PURE__*/React.createElement(CSSTransition, {
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
      }, /*#__PURE__*/React.createElement("div", _extends({
        ref: menuRef,
        id: props.id,
        className: className,
        style: props.style
      }, otherProps, {
        onClick: onPanelClick
      }), /*#__PURE__*/React.createElement("ul", {
        className: "p-menu-list p-reset",
        role: "menu"
      }, menuitems)));
    }
    return null;
  };
  var element = createElement();
  return props.popup ? /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  }) : element;
}));
Menu.displayName = 'Menu';
Menu.defaultProps = {
  __TYPE: 'Menu',
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

export { Menu };
