import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { useMatchMedia, useEventListener, useResizeListener, useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { AngleDownIcon } from 'primereact/icons/angledown';
import { AngleRightIcon } from 'primereact/icons/angleright';
import { BarsIcon } from 'primereact/icons/bars';
import { Ripple } from 'primereact/ripple';
import { UniqueComponentId, DomHandler, ZIndexUtils, classNames, mergeProps, ObjectUtils, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

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

var MegaMenuBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'MegaMenu',
    id: null,
    model: null,
    style: null,
    className: null,
    orientation: 'horizontal',
    breakpoint: undefined,
    scrollHeight: '400px',
    start: null,
    submenuIcon: null,
    menuIcon: null,
    end: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MegaMenu = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MegaMenuBase.getProps(inProps, context);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeItemState = _React$useState2[0],
    setActiveItemState = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    attributeSelectorState = _React$useState4[0],
    setAttributeSelectorState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    mobileActiveState = _React$useState6[0],
    setMobileActiveState = _React$useState6[1];
  var elementRef = React.useRef(null);
  var styleElementRef = React.useRef(null);
  var menuButtonRef = React.useRef(null);
  var horizontal = props.orientation === 'horizontal';
  var vertical = props.orientation === 'vertical';
  var isMobileMode = useMatchMedia("screen and (max-width: ".concat(props.breakpoint, ")"), !!props.breakpoint);
  var _MegaMenuBase$setMeta = MegaMenuBase.setMetaData({
      props: props,
      state: {
        activeItem: activeItemState,
        attributeSelector: attributeSelectorState,
        mobileActive: mobileActiveState
      }
    }),
    ptm = _MegaMenuBase$setMeta.ptm;
  var getPTOptions = function getPTOptions(item, key) {
    return ptm(key, {
      context: {
        active: activeItemState === item
      }
    });
  };
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        if ((!isMobileMode || mobileActiveState) && isOutsideClicked(event)) {
          setActiveItemState(null);
          setMobileActiveState(false);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindDocumentClickListener = _useEventListener2[0];
  var _useResizeListener = useResizeListener({
      listener: function listener() {
        if (!isMobileMode || mobileActiveState) {
          setActiveItemState(null);
          setMobileActiveState(false);
        }
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
    bindDocumentResizeListener = _useResizeListener2[0];
  var onLeafClick = function onLeafClick(event, item) {
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
    setActiveItemState(null);
    setMobileActiveState(false);
  };
  var onCategoryMouseEnter = function onCategoryMouseEnter(event, item) {
    if (item.disabled || isMobileMode) {
      event.preventDefault();
      return;
    }
    if (activeItemState) {
      setActiveItemState(item);
    }
  };
  var onCategoryClick = function onCategoryClick(event, item) {
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
        item: props.item
      });
    }
    if (item.items) {
      activeItemState && activeItemState === item ? setActiveItemState(null) : setActiveItemState(item);
    }
    event.preventDefault();
  };
  var onCategoryKeyDown = function onCategoryKeyDown(event, item) {
    var listItem = event.currentTarget.parentElement;
    switch (event.which) {
      //down
      case 40:
        horizontal ? expandMenu(item) : navigateToNextItem(listItem);
        event.preventDefault();
        break;

      //up
      case 38:
        vertical ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
        event.preventDefault();
        break;

      //right
      case 39:
        horizontal ? navigateToNextItem(listItem) : expandMenu(item);
        event.preventDefault();
        break;

      //left
      case 37:
        horizontal ? navigateToPrevItem(listItem) : item.items && item === activeItemState && collapseMenu();
        event.preventDefault();
        break;
    }
  };
  var expandMenu = function expandMenu(item) {
    if (item.items) {
      setActiveItemState(item);
    }
  };
  var collapseMenu = function collapseMenu(item) {
    setActiveItemState(null);
  };
  var toggle = function toggle(event) {
    event.preventDefault();
    setMobileActiveState(function (prevMobileActive) {
      return !prevMobileActive;
    });
    setActiveItemState(null);
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? findPrevItem(prevItem) : prevItem : null;
  };
  var navigateToNextItem = function navigateToNextItem(listItem) {
    var nextItem = findNextItem(listItem);
    nextItem && nextItem.children[0].focus();
  };
  var navigateToPrevItem = function navigateToPrevItem(listItem) {
    var prevItem = findPrevItem(listItem);
    prevItem && prevItem.children[0].focus();
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target) || menuButtonRef.current && menuButtonRef.current.contains(event.target));
  };
  var getColumnClassName = function getColumnClassName(category) {
    var length = category.items ? category.items.length : 0;
    var columnClass;
    switch (length) {
      case 2:
        columnClass = 'p-megamenu-col-6';
        break;
      case 3:
        columnClass = 'p-megamenu-col-4';
        break;
      case 4:
        columnClass = 'p-megamenu-col-3';
        break;
      case 6:
        columnClass = 'p-megamenu-col-2';
        break;
      default:
        columnClass = 'p-megamenu-col-12';
        break;
    }
    return columnClass;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (props.breakpoint) {
      !attributeSelectorState && setAttributeSelectorState(UniqueComponentId());
    }
    bindDocumentClickListener();
    bindDocumentResizeListener();
  });
  useUpdateEffect(function () {
    var currentPanel = DomHandler.findSingle(elementRef.current, '.p-menuitem-active > .p-megamenu-panel');
    if (activeItemState && !isMobileMode) {
      ZIndexUtils.set('menu', currentPanel, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['menu'] || PrimeReact.zIndex['menu']);
    }
    if (isMobileMode) {
      currentPanel && currentPanel.previousElementSibling.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
    return function () {
      ZIndexUtils.clear(currentPanel);
    };
  }, [activeItemState]);
  var createSeparator = function createSeparator(index) {
    var key = 'separator_' + index;
    var separatorProps = mergeProps({
      key: key,
      className: 'p-menu-separator',
      role: 'separator'
    }, ptm('separator'));
    return /*#__PURE__*/React.createElement("li", separatorProps);
  };
  var createSubmenuIcon = function createSubmenuIcon(item) {
    if (item.items) {
      var iconClassName = 'p-submenu-icon';
      var submenuIconProps = mergeProps({
        className: iconClassName
      }, ptm('submenuIcon'));
      var icon = vertical ? props.submenuIcon || /*#__PURE__*/React.createElement(AngleRightIcon, submenuIconProps) : props.submenuIcon || /*#__PURE__*/React.createElement(AngleDownIcon, submenuIconProps);
      var submenuIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, submenuIconProps), {
        props: props
      });
      return submenuIcon;
    }
    return null;
  };
  var createSubmenuItem = function createSubmenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    if (item.separator) {
      return createSeparator(index);
    } else {
      var key = item.label + '_' + index;
      var _className = classNames('p-menuitem', item.className);
      var linkClassName = classNames('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var iconClassName = classNames(item.icon, 'p-menuitem-icon');
      var icon = IconUtils.getJSXIcon(item.icon, {
        className: 'p-menuitem-icon'
      }, {
        props: props
      });
      var label = item.label && /*#__PURE__*/React.createElement("span", {
        className: "p-menuitem-text"
      }, item.label);
      var actionProps = mergeProps({
        href: item.url || '#',
        className: linkClassName,
        target: item.target,
        onClick: function onClick(event) {
          return onLeafClick(event, item);
        },
        role: 'menuitem',
        'aria-disabled': item.disabled
      }, getPTOptions(item, 'action'));
      var submenuItemProps = mergeProps({
        key: key,
        id: item.id,
        className: _className,
        style: item.style,
        role: 'none'
      }, getPTOptions(item, 'submenuItem'));
      var content = /*#__PURE__*/React.createElement("a", actionProps, icon, label, /*#__PURE__*/React.createElement(Ripple, null));
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return onLeafClick(event, item);
          },
          className: linkClassName,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: props
        };
        content = ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement("li", submenuItemProps, content);
    }
  };
  var createSubmenu = function createSubmenu(submenu) {
    if (submenu.visible === false) {
      return null;
    }
    var className = classNames('p-megamenu-submenu-header', {
      'p-disabled': submenu.disabled
    }, submenu.className);
    var items = submenu.items.map(createSubmenuItem);
    var submenuHeaderProps = mergeProps({
      id: submenu.id,
      className: className,
      style: submenu.style,
      role: 'presentation'
    }, ptm('submenuHeader'));
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: submenu.label
    }, /*#__PURE__*/React.createElement("li", submenuHeaderProps, submenu.label), items);
  };
  var createSubmenus = function createSubmenus(column) {
    return column.map(createSubmenu);
  };
  var createColumn = function createColumn(category, column, index, columnClassName) {
    var key = category.label + '_column_' + index;
    var submenus = createSubmenus(column);
    var columnProps = mergeProps({
      key: key,
      className: columnClassName
    }, ptm('column'));
    var submenuProps = mergeProps({
      className: 'p-megamenu-submenu',
      role: 'menu'
    }, ptm('submenu'));
    return /*#__PURE__*/React.createElement("div", columnProps, /*#__PURE__*/React.createElement("ul", submenuProps, submenus));
  };
  var createColumns = function createColumns(category) {
    if (category.items) {
      var columnClassName = getColumnClassName(category);
      return category.items.map(function (column, index) {
        return createColumn(category, column, index, columnClassName);
      });
    }
    return null;
  };
  var createCategoryPanel = function createCategoryPanel(category) {
    if (category.items) {
      var columns = createColumns(category);
      var panelProps = mergeProps({
        className: 'p-megamenu-panel'
      }, ptm('panel'));
      var gridProps = mergeProps({
        className: 'p-megamenu-grid'
      }, ptm('grid'));
      return /*#__PURE__*/React.createElement("div", panelProps, /*#__PURE__*/React.createElement("div", gridProps, columns));
    }
    return null;
  };
  var createStyle = function createStyle() {
    if (!styleElementRef.current) {
      styleElementRef.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
      var selector = "".concat(attributeSelectorState);
      var innerHTML = "\n@media screen and (max-width: ".concat(props.breakpoint, ") {\n    .p-megamenu[").concat(selector, "] > .p-megamenu-root-list .p-menuitem-active .p-megamenu-panel {\n        position: relative;\n        left: 0 !important;\n        box-shadow: none;\n        border-radius: 0;\n        background: inherit;\n    }\n\n    .p-megamenu[").concat(selector, "] .p-menuitem-active > .p-menuitem-link > .p-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-megamenu[").concat(selector, "] .p-megamenu-grid {\n        flex-wrap: wrap;\n    }\n\n    ").concat(horizontal ? "\n.p-megamenu[".concat(selector, "] .p-megamenu-button {\n    display: flex;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal {\n    position: relative;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-horizontal .p-megamenu-root-list {\n    display: none;\n}\n\n.p-megamenu-horizontal[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: auto;\n    flex: 1;\n    padding: 0;\n}\n\n.p-megamenu[").concat(selector, "].p-megamenu-mobile-active .p-megamenu-root-list {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    width: 100%;\n    top: 100%;\n    left: 0;\n    z-index: 1;\n}\n        ") : '', "\n\n    ").concat(vertical ? "\n.p-megamenu-vertical[".concat(selector, "] {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-root-list {\n    max-height: ").concat(props.scrollHeight, ";\n    overflow: ").concat(props.scrollHeight ? 'auto' : '', ";\n}\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] {\n    width: 100%;\n    padding: 0;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-megamenu-submenu {\n    width: 100%;\n}\n\n.p-megamenu-vertical[").concat(selector, "] div[class*=\"p-megamenu-col-\"] .p-megamenu-submenu-header {\n    background: inherit;\n}\n\n.p-megamenu-vertical[").concat(selector, "] .p-submenu-icon:before {\n    content: \"\\e930\";\n}\n        ") : '', "\n}\n");
      styleElementRef.current.innerHTML = innerHTML;
    }
  };
  var destroyStyle = function destroyStyle() {
    styleElementRef.current = DomHandler.removeInlineStyle(styleElementRef.current);
  };
  useUpdateEffect(function () {
    if (attributeSelectorState && elementRef.current) {
      elementRef.current.setAttribute(attributeSelectorState, '');
      createStyle();
    }
    return function () {
      destroyStyle();
    };
  }, [attributeSelectorState, props.breakpoint]);
  var createCategory = function createCategory(category, index) {
    var className = classNames('p-menuitem', {
      'p-menuitem-active': category === activeItemState
    }, category.className);
    var linkClassName = classNames('p-menuitem-link', {
      'p-disabled': category.disabled
    });
    var iconProps = mergeProps({
      className: 'p-menuitem-icon'
    }, getPTOptions(category, 'icon'));
    var icon = IconUtils.getJSXIcon(category.icon, _objectSpread({}, iconProps), {
      props: props
    });
    var labelProps = mergeProps({
      className: 'p-menuitem-text'
    }, getPTOptions(category, 'label'));
    var label = category.label && /*#__PURE__*/React.createElement("span", labelProps, category.label);
    var itemContent = category.template ? ObjectUtils.getJSXElement(category.template, category) : null;
    var submenuIcon = createSubmenuIcon(category);
    var panel = createCategoryPanel(category);
    var headerActionProps = mergeProps({
      href: category.url || '#',
      className: linkClassName,
      target: category.target,
      onClick: function onClick(e) {
        return onCategoryClick(e, category);
      },
      onKeyDown: function onKeyDown(e) {
        return onCategoryKeyDown(e, category);
      },
      role: 'menuitem',
      'aria-haspopup': category.items != null
    }, getPTOptions(category, 'headerAction'));
    var menuItemProps = mergeProps({
      key: category.label + '_' + index,
      id: category.id,
      className: className,
      style: category.style,
      onMouseEnter: function onMouseEnter(e) {
        return onCategoryMouseEnter(e, category);
      },
      role: 'none'
    }, getPTOptions(category, 'menuitem'));
    return /*#__PURE__*/React.createElement("li", menuItemProps, /*#__PURE__*/React.createElement("a", headerActionProps, icon, label, itemContent, submenuIcon, /*#__PURE__*/React.createElement(Ripple, null)), panel);
  };
  var createMenu = function createMenu() {
    var menuProps = mergeProps({
      className: 'p-megamenu-root-list',
      role: 'menubar'
    }, ptm('menu'));
    if (props.model) {
      return /*#__PURE__*/React.createElement("ul", menuProps, props.model.map(function (item, index) {
        return createCategory(item, index);
      }));
    }
    return null;
  };
  var createStartContent = function createStartContent() {
    var startProps = mergeProps({
      className: 'p-megamenu-start'
    }, ptm('start'));
    if (props.start) {
      var _start = ObjectUtils.getJSXElement(props.start, props);
      return /*#__PURE__*/React.createElement("div", startProps, _start);
    }
    return null;
  };
  var createEndContent = function createEndContent() {
    var endProps = mergeProps({
      className: 'p-megamenu-end'
    }, ptm('end'));
    if (props.end) {
      var _end = ObjectUtils.getJSXElement(props.end, props);
      return /*#__PURE__*/React.createElement("div", endProps, _end);
    }
    return null;
  };
  var createMenuButton = function createMenuButton() {
    if (props.orientation === 'vertical' || props.model && props.model.length < 1) {
      return null;
    }
    var icon = props.menuIcon || /*#__PURE__*/React.createElement(BarsIcon, null);
    var menuIcon = IconUtils.getJSXIcon(icon, undefined, {
      props: props
    });
    /* eslint-disable */
    var button = /*#__PURE__*/React.createElement("a", {
      ref: menuButtonRef,
      href: '#',
      role: "button",
      tabIndex: 0,
      className: "p-megamenu-button",
      onClick: toggle
    }, menuIcon);
    /* eslint-enable */

    return button;
  };
  var className = classNames('p-megamenu p-component', {
    'p-megamenu-horizontal': props.orientation === 'horizontal',
    'p-megamenu-vertical': props.orientation === 'vertical',
    'p-megamenu-mobile-active': mobileActiveState
  }, props.className);
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, MegaMenuBase.getOtherProps(props), ptm('root'));
  var menu = createMenu();
  var start = createStartContent();
  var end = createEndContent();
  var menuButton = createMenuButton();
  return /*#__PURE__*/React.createElement("div", rootProps, start, menuButton, menu, end);
}));
MegaMenu.displayName = 'MegaMenu';

export { MegaMenu };
