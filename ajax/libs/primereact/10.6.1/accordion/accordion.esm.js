'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useMountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { ObjectUtils, classNames, UniqueComponentId, IconUtils, DomHandler } from 'primereact/utils';

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
  root: 'p-accordion p-component',
  tab: {
    root: function root(_ref) {
      var selected = _ref.selected;
      return classNames('p-accordion-tab', {
        'p-accordion-tab-active': selected
      });
    },
    content: 'p-accordion-content',
    header: function header(_ref2) {
      var selected = _ref2.selected,
        getTabProp = _ref2.getTabProp,
        tab = _ref2.tab;
      return classNames('p-accordion-header', {
        'p-highlight': selected,
        'p-disabled': getTabProp(tab, 'disabled')
      });
    },
    headeraction: 'p-accordion-header-link',
    headericon: 'p-accordion-toggle-icon',
    headertitle: 'p-accordion-header-text',
    toggleablecontent: 'p-toggleable-content',
    transition: 'p-toggleable-content'
  }
};
var styles = "\n@layer primereact {\n    .p-accordion-header-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        user-select: none;\n        position: relative;\n        text-decoration: none;\n    }\n    \n    .p-accordion-header-link:focus {\n        z-index: 1;\n    }\n    \n    .p-accordion-header-text {\n        line-height: 1;\n        width: 100%;\n    }\n}\n";
var AccordionBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Accordion',
    id: null,
    activeIndex: null,
    className: null,
    style: null,
    multiple: false,
    expandIcon: null,
    collapseIcon: null,
    transitionOptions: null,
    onTabOpen: null,
    onTabClose: null,
    onTabChange: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});
var AccordionTabBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AccordionTab',
    className: null,
    contentClassName: null,
    contentStyle: null,
    disabled: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTemplate: null,
    style: null,
    tabIndex: 0,
    children: undefined
  },
  getCProp: function getCProp(tab, name) {
    return ObjectUtils.getComponentProp(tab, name, AccordionTabBase.defaultProps);
  },
  getCProps: function getCProps(tab) {
    return ObjectUtils.getComponentProps(tab, AccordionTabBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(tab) {
    return ObjectUtils.getComponentDiffProps(tab, AccordionTabBase.defaultProps);
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var AccordionTab = function AccordionTab() {};
var Accordion = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = AccordionBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(props.activeIndex),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeIndexState = _React$useState4[0],
    setActiveIndexState = _React$useState4[1];
  var elementRef = React.useRef(null);
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var count = React.Children.count(props.children);
  var metaData = {
    props: props,
    state: {
      id: idState,
      activeIndex: activeIndexState
    }
  };
  var _AccordionBase$setMet = AccordionBase.setMetaData(_objectSpread({}, metaData)),
    ptm = _AccordionBase$setMet.ptm,
    ptmo = _AccordionBase$setMet.ptmo,
    cx = _AccordionBase$setMet.cx;
    _AccordionBase$setMet.sx;
    var isUnstyled = _AccordionBase$setMet.isUnstyled;
  useHandleStyle(AccordionBase.css.styles, isUnstyled, {
    name: 'accordion'
  });
  var getTabProp = function getTabProp(tab, name) {
    return AccordionTabBase.getCProp(tab, name);
  };
  var getTabPT = function getTabPT(tab, key, index) {
    AccordionTabBase.getCProps(tab);
    var tabMetaData = {
      // props: atProps, /* @todo */
      parent: metaData,
      context: {
        index: index,
        count: count,
        first: index === 0,
        last: index === count - 1,
        selected: isSelected(index),
        disabled: getTabProp(tab, 'disabled')
      }
    };
    return mergeProps(ptm("tab.".concat(key), {
      tab: tabMetaData
    }), ptm("tab.".concat(key), {
      tab: tabMetaData
    }), ptm("tab.".concat(key), tabMetaData), ptmo(getTabProp(tab, 'pt'), key, tabMetaData));
  };
  var onTabHeaderClick = function onTabHeaderClick(event, tab, index) {
    changeActiveIndex(event, tab, index);
  };
  var changeActiveIndex = function changeActiveIndex(event, tab, index) {
    if (!getTabProp(tab, 'disabled')) {
      var selected = isSelected(index);
      var newActiveIndex = null;
      if (props.multiple) {
        var indexes = activeIndex || [];
        newActiveIndex = selected ? indexes.filter(function (i) {
          return i !== index;
        }) : [].concat(_toConsumableArray(indexes), [index]);
      } else {
        newActiveIndex = selected ? null : index;
      }
      var callback = selected ? props.onTabClose : props.onTabOpen;
      callback && callback({
        originalEvent: event,
        index: index
      });
      if (props.onTabChange) {
        props.onTabChange({
          originalEvent: event,
          index: newActiveIndex
        });
      } else {
        setActiveIndexState(newActiveIndex);
      }
    }
    event.preventDefault();
  };
  var onTabHeaderKeyDown = function onTabHeaderKeyDown(event, tab, index) {
    switch (event.code) {
      case 'ArrowDown':
        onTabArrowDownKey(event);
        break;
      case 'ArrowUp':
        onTabArrowUpKey(event);
        break;
      case 'Home':
        onTabHomeKey(event);
        break;
      case 'End':
        onTabEndKey(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        onTabEnterKey(event, tab, index);
        break;
    }
  };
  var onTabArrowDownKey = function onTabArrowDownKey(event) {
    var nextHeaderAction = findNextHeaderAction(event.target.parentElement.parentElement);
    nextHeaderAction ? changeFocusedTab(nextHeaderAction) : onTabHomeKey(event);
    event.preventDefault();
  };
  var onTabArrowUpKey = function onTabArrowUpKey(event) {
    var prevHeaderAction = findPrevHeaderAction(event.target.parentElement.parentElement);
    prevHeaderAction ? changeFocusedTab(prevHeaderAction) : onTabEndKey(event);
    event.preventDefault();
  };
  var onTabHomeKey = function onTabHomeKey(event) {
    var firstHeaderAction = findFirstHeaderAction();
    changeFocusedTab(firstHeaderAction);
    event.preventDefault();
  };
  var onTabEndKey = function onTabEndKey(event) {
    var lastHeaderAction = findLastHeaderAction();
    changeFocusedTab(lastHeaderAction);
    event.preventDefault();
  };
  var onTabEnterKey = function onTabEnterKey(event, tab, index) {
    changeActiveIndex(event, tab, index);
    event.preventDefault();
  };
  var findNextHeaderAction = function findNextHeaderAction(tabElement) {
    var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
    var headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
    return headerElement ? DomHandler.getAttribute(headerElement, 'data-p-disabled') ? findNextHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
  };
  var findPrevHeaderAction = function findPrevHeaderAction(tabElement) {
    var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
    var headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
    return headerElement ? DomHandler.getAttribute(headerElement, 'data-p-disabled') ? findPrevHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
  };
  var findFirstHeaderAction = function findFirstHeaderAction() {
    return findNextHeaderAction(elementRef.current.firstElementChild, true);
  };
  var findLastHeaderAction = function findLastHeaderAction() {
    return findPrevHeaderAction(elementRef.current.lastElementChild, true);
  };
  var changeFocusedTab = function changeFocusedTab(element) {
    if (element) {
      DomHandler.focus(element);
    }
  };
  var isSelected = function isSelected(index) {
    return props.multiple && Array.isArray(activeIndex) ? activeIndex && activeIndex.some(function (i) {
      return i === index;
    }) : activeIndex === index;
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
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  if (!idState) {
    return null;
  }
  var createTabHeader = function createTabHeader(tab, selected, index) {
    var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'style') || {}), getTabProp(tab, 'headerStyle') || {});
    var headerId = idState + '_header_' + index;
    var ariaControls = idState + '_content_' + index;
    var tabIndex = getTabProp(tab, 'disabled') ? -1 : getTabProp(tab, 'tabIndex');
    var headerTitleProps = mergeProps({
      className: cx('tab.headertitle')
    }, getTabPT(tab, 'headertitle', index));
    var tabCProps = AccordionTabBase.getCProps(tab);
    var header = getTabProp(tab, 'headerTemplate') ? ObjectUtils.getJSXElement(getTabProp(tab, 'headerTemplate'), tabCProps) : /*#__PURE__*/React.createElement("span", headerTitleProps, ObjectUtils.getJSXElement(getTabProp(tab, 'header'), tabCProps));
    var headerIconProps = mergeProps({
      'aria-hidden': 'true',
      className: cx('tab.headericon')
    }, getTabPT(tab, 'headericon', index));
    var icon = selected ? props.collapseIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, headerIconProps) : props.expandIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, headerIconProps);
    var toggleIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, headerIconProps), {
      props: props,
      selected: selected
    });
    var headerProps = mergeProps({
      className: classNames(getTabProp(tab, 'headerClassName'), getTabProp(tab, 'className'), cx('tab.header', {
        selected: selected,
        getTabProp: getTabProp,
        tab: tab
      })),
      style: style,
      'data-p-highlight': selected,
      'data-p-disabled': getTabProp(tab, 'disabled')
    }, getTabPT(tab, 'header', index));
    var headerActionProps = mergeProps({
      id: headerId,
      href: '#' + ariaControls,
      className: cx('tab.headeraction'),
      role: 'button',
      tabIndex: tabIndex,
      onClick: function onClick(e) {
        return onTabHeaderClick(e, tab, index);
      },
      onKeyDown: function onKeyDown(e) {
        return onTabHeaderKeyDown(e, tab, index);
      },
      'aria-disabled': getTabProp(tab, 'disabled'),
      'aria-controls': ariaControls,
      'aria-expanded': selected
    }, getTabPT(tab, 'headeraction', index));
    return /*#__PURE__*/React.createElement("div", headerProps, /*#__PURE__*/React.createElement("a", headerActionProps, toggleIcon, header));
  };
  var createTabContent = function createTabContent(tab, selected, index) {
    var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'style') || {}), getTabProp(tab, 'contentStyle') || {});
    var contentId = idState + '_content_' + index;
    var ariaLabelledby = idState + '_header_' + index;
    var contentRef = /*#__PURE__*/React.createRef();
    var toggleableContentProps = mergeProps({
      id: contentId,
      ref: contentRef,
      className: classNames(getTabProp(tab, 'contentClassName'), getTabProp(tab, 'className'), cx('tab.toggleablecontent')),
      style: style,
      role: 'region',
      'aria-labelledby': ariaLabelledby
    }, getTabPT(tab, 'toggleablecontent', index));
    var contentProps = mergeProps({
      className: cx('tab.content')
    }, getTabPT(tab, 'content', index));
    var transitionProps = mergeProps({
      classNames: cx('tab.transition'),
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": selected,
      unmountOnExit: true,
      options: props.transitionOptions
    }, getTabPT(tab, 'transition', index));
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: contentRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", toggleableContentProps, /*#__PURE__*/React.createElement("div", contentProps, getTabProp(tab, 'children'))));
  };
  var createTab = function createTab(tab, index) {
    if (ObjectUtils.isValidChild(tab, 'AccordionTab')) {
      var key = idState + '_' + index;
      var selected = isSelected(index);
      var tabHeader = createTabHeader(tab, selected, index);
      var tabContent = createTabContent(tab, selected, index);
      var _rootProps = mergeProps({
        key: key,
        className: cx('tab.root', {
          selected: selected
        })
      }, AccordionTabBase.getCOtherProps(tab), getTabPT(tab, 'root', index));
      return /*#__PURE__*/React.createElement("div", _rootProps, tabHeader, tabContent);
    }
    return null;
  };
  var createTabs = function createTabs() {
    return React.Children.map(props.children, createTab);
  };
  var tabs = createTabs();
  var rootProps = mergeProps({
    className: classNames(props.className, cx('root')),
    style: props.style
  }, AccordionBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", _extends({
    id: idState,
    ref: elementRef
  }, rootProps), tabs);
});
AccordionTab.displayName = 'AccordionTab';
Accordion.displayName = 'Accordion';

export { Accordion, AccordionTab };
