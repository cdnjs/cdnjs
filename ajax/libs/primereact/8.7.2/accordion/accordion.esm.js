import * as React from 'react';
import { ariaLabel } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useMountEffect } from 'primereact/hooks';
import { UniqueComponentId, ObjectUtils, classNames, IconUtils } from 'primereact/utils';

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

function _defineProperty(obj, key, value) {
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

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AccordionTab = function AccordionTab() {};

var shouldUseTab = function shouldUseTab(tab) {
  return tab && tab.props.__TYPE === 'AccordionTab';
};

var Accordion = /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var onTabHeaderClick = function onTabHeaderClick(event, tab, index) {
    if (!tab.props.disabled) {
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

  var isSelected = function isSelected(index) {
    return props.multiple ? activeIndex && activeIndex.some(function (i) {
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
    var style = _objectSpread(_objectSpread({}, tab.props.style || {}), tab.props.headerStyle || {});

    var className = classNames('p-accordion-header', {
      'p-highlight': selected,
      'p-disabled': tab.props.disabled
    }, tab.props.headerClassName, tab.props.className);
    var headerId = idState + '_header_' + index;
    var ariaControls = idState + '_content_' + index;
    var tabIndex = tab.props.disabled ? -1 : tab.props.tabIndex;
    var header = tab.props.headerTemplate ? ObjectUtils.getJSXElement(tab.props.headerTemplate, tab.props) : /*#__PURE__*/React.createElement("span", {
      className: "p-accordion-header-text"
    }, tab.props.header);
    var icon = IconUtils.getJSXIcon(selected ? props.collapseIcon : props.expandIcon, {
      className: 'p-accordion-toggle-icon'
    }, {
      props: props,
      selected: selected
    });
    var label = selected ? ariaLabel('collapseLabel') : ariaLabel('expandLabel');
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/React.createElement("a", {
      href: '#' + ariaControls,
      id: headerId,
      className: "p-accordion-header-link",
      "aria-controls": ariaControls,
      role: "tab",
      "aria-expanded": selected,
      onClick: function onClick(e) {
        return onTabHeaderClick(e, tab, index);
      },
      tabIndex: tabIndex,
      "aria-label": label
    }, icon, header));
  };

  var createTabContent = function createTabContent(tab, selected, index) {
    var style = _objectSpread(_objectSpread({}, tab.props.style || {}), tab.props.contentStyle || {});

    var className = classNames('p-toggleable-content', tab.props.contentClassName, tab.props.className);
    var contentId = idState + '_content_' + index;
    var ariaLabelledby = idState + '_header_' + index;
    var contentRef = /*#__PURE__*/React.createRef();
    return /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: contentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": selected,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React.createElement("div", {
      ref: contentRef,
      id: contentId,
      className: className,
      style: style,
      role: "region",
      "aria-labelledby": ariaLabelledby
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-accordion-content"
    }, tab.props.children)));
  };

  var createTab = function createTab(tab, index) {
    if (shouldUseTab(tab)) {
      var key = idState + '_' + index;
      var selected = isSelected(index);

      var _otherProps = ObjectUtils.findDiffKeys(tab.props, AccordionTab.defaultProps);

      var tabHeader = createTabHeader(tab, selected, index);
      var tabContent = createTabContent(tab, selected, index);
      var tabClassName = classNames('p-accordion-tab', {
        'p-accordion-tab-active': selected
      });
      return /*#__PURE__*/React.createElement("div", _extends({
        key: key,
        className: tabClassName
      }, _otherProps), tabHeader, tabContent);
    }

    return null;
  };

  var createTabs = function createTabs() {
    return React.Children.map(props.children, createTab);
  };

  var otherProps = ObjectUtils.findDiffKeys(props, Accordion.defaultProps);
  var className = classNames('p-accordion p-component', props.className);
  var tabs = createTabs();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: idState,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), tabs);
});
AccordionTab.displayName = 'AccordionTab';
AccordionTab.defaultProps = {
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
  tabIndex: 0
};
Accordion.displayName = 'Accordion';
Accordion.defaultProps = {
  __TYPE: 'Accordion',
  id: null,
  activeIndex: null,
  className: null,
  style: null,
  multiple: false,
  expandIcon: 'pi pi-chevron-right',
  collapseIcon: 'pi pi-chevron-down',
  transitionOptions: null,
  onTabOpen: null,
  onTabClose: null,
  onTabChange: null
};

export { Accordion, AccordionTab };
