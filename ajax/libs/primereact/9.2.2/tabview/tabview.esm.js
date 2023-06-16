import * as React from 'react';
import { ariaLabel } from 'primereact/api';
import { useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { ObjectUtils, UniqueComponentId, classNames, DomHandler } from 'primereact/utils';

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

var TabViewBase = {
  defaultProps: {
    __TYPE: 'TabView',
    id: null,
    activeIndex: 0,
    className: null,
    onBeforeTabChange: null,
    onBeforeTabClose: null,
    onTabChange: null,
    onTabClose: null,
    panelContainerClassName: null,
    panelContainerStyle: null,
    renderActiveOnly: true,
    scrollable: false,
    style: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, TabViewBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, TabViewBase.defaultProps);
  }
};
var TabPanelBase = {
  defaultProps: {
    __TYPE: 'TabPanel',
    className: null,
    closable: false,
    contentClassName: null,
    contentStyle: null,
    disabled: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTemplate: null,
    leftIcon: null,
    rightIcon: null,
    style: null,
    children: undefined
  },
  getCProp: function getCProp(tab, name) {
    return ObjectUtils.getComponentProp(tab, name, TabPanelBase.defaultProps);
  },
  getCProps: function getCProps(tab) {
    return ObjectUtils.getComponentProps(tab, TabPanelBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(tab) {
    return ObjectUtils.getComponentDiffProps(tab, TabPanelBase.defaultProps);
  }
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TabPanel = function TabPanel() {};
var TabView = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = TabViewBase.getProps(inProps);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    backwardIsDisabledState = _React$useState4[0],
    setBackwardIsDisabledState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    forwardIsDisabledState = _React$useState6[0],
    setForwardIsDisabledState = _React$useState6[1];
  var _React$useState7 = React.useState([]),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    hiddenTabsState = _React$useState8[0],
    setHiddenTabsState = _React$useState8[1];
  var _React$useState9 = React.useState(props.activeIndex),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    activeIndexState = _React$useState10[0],
    setActiveIndexState = _React$useState10[1];
  var elementRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var navRef = React.useRef(null);
  var inkbarRef = React.useRef(null);
  var prevBtnRef = React.useRef(null);
  var nextBtnRef = React.useRef(null);
  var tabsRef = React.useRef({});
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var isSelected = function isSelected(index) {
    return index === activeIndex;
  };
  var getTabProp = function getTabProp(tab, name) {
    return TabPanelBase.getCProp(tab, name);
  };
  var shouldUseTab = function shouldUseTab(tab, index) {
    return ObjectUtils.isValidChild(tab, 'TabPanel') && hiddenTabsState.every(function (_i) {
      return _i !== index;
    });
  };
  var findVisibleActiveTab = function findVisibleActiveTab(i) {
    var tabsInfo = React.Children.map(props.children, function (tab, index) {
      if (shouldUseTab(tab, index)) {
        return {
          tab: tab,
          index: index
        };
      }
    });
    return tabsInfo.find(function (_ref) {
      var tab = _ref.tab,
        index = _ref.index;
      return !getTabProp(tab, 'disabled') && index >= i;
    }) || tabsInfo.reverse().find(function (_ref2) {
      var tab = _ref2.tab,
        index = _ref2.index;
      return !getTabProp(tab, 'disabled') && i > index;
    });
  };
  var onTabHeaderClose = function onTabHeaderClose(event, index) {
    event.preventDefault();

    // give caller a chance to stop the selection
    if (props.onBeforeTabClose && props.onBeforeTabClose({
      originalEvent: event,
      index: index
    }) === false) {
      return;
    }
    setHiddenTabsState([].concat(_toConsumableArray(hiddenTabsState), [index]));
    if (props.onTabClose) {
      props.onTabClose({
        originalEvent: event,
        index: index
      });
    }
  };
  var onTabHeaderClick = function onTabHeaderClick(event, tab, index) {
    if (event) {
      event.preventDefault();
    }
    if (!getTabProp(tab, 'disabled')) {
      // give caller a chance to stop the selection
      if (props.onBeforeTabChange && props.onBeforeTabChange({
        originalEvent: event,
        index: index
      }) === false) {
        return;
      }
      if (props.onTabChange) props.onTabChange({
        originalEvent: event,
        index: index
      });else setActiveIndexState(index);
    }
    updateScrollBar(index);
  };
  var _onKeyDown = function onKeyDown(event, tab, index) {
    if (event.key === 'Enter') {
      onTabHeaderClick(event, tab, index);
    }
  };
  var updateInkBar = function updateInkBar() {
    var tabHeader = tabsRef.current["tab_".concat(activeIndex)];
    inkbarRef.current.style.width = DomHandler.getWidth(tabHeader) + 'px';
    inkbarRef.current.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(navRef.current).left + 'px';
  };
  var updateScrollBar = function updateScrollBar(index) {
    var tabHeader = tabsRef.current["tab_".concat(index)];
    if (tabHeader && tabHeader.scrollIntoView) {
      tabHeader.scrollIntoView({
        block: 'nearest'
      });
    }
  };
  var updateButtonState = function updateButtonState() {
    var _contentRef$current = contentRef.current,
      scrollLeft = _contentRef$current.scrollLeft,
      scrollWidth = _contentRef$current.scrollWidth;
    var width = DomHandler.getWidth(contentRef.current);
    setBackwardIsDisabledState(scrollLeft === 0);
    setForwardIsDisabledState(scrollLeft === scrollWidth - width);
  };
  var onScroll = function onScroll(event) {
    props.scrollable && updateButtonState();
    event.preventDefault();
  };
  var getVisibleButtonWidths = function getVisibleButtonWidths() {
    return [prevBtnRef.current, nextBtnRef.current].reduce(function (acc, el) {
      return el ? acc + DomHandler.getWidth(el) : acc;
    }, 0);
  };
  var navBackward = function navBackward() {
    var width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    var pos = contentRef.current.scrollLeft - width;
    contentRef.current.scrollLeft = pos <= 0 ? 0 : pos;
  };
  var navForward = function navForward() {
    var width = DomHandler.getWidth(contentRef.current) - getVisibleButtonWidths();
    var pos = contentRef.current.scrollLeft + width;
    var lastPos = contentRef.current.scrollWidth - width;
    contentRef.current.scrollLeft = pos >= lastPos ? lastPos : pos;
  };
  var reset = function reset() {
    setBackwardIsDisabledState(true);
    setForwardIsDisabledState(false);
    setHiddenTabsState([]);
    if (props.onTabChange) props.onTabChange({
      index: activeIndex
    });else setActiveIndexState(props.activeIndex);
  };
  React.useEffect(function () {
    updateInkBar();
  });
  useMountEffect(function () {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });
  useUpdateEffect(function () {
    if (ObjectUtils.isNotEmpty(hiddenTabsState)) {
      var tabInfo = findVisibleActiveTab(hiddenTabsState[hiddenTabsState.length - 1]);
      tabInfo && onTabHeaderClick(null, tabInfo.tab, tabInfo.index);
    }
  }, [hiddenTabsState]);
  useUpdateEffect(function () {
    updateScrollBar(props.activeIndex);
  }, [props.activeIndex]);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      reset: reset,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createTabHeader = function createTabHeader(tab, index) {
    var selected = isSelected(index);
    var _TabPanelBase$getCPro = TabPanelBase.getCProps(tab),
      headerStyle = _TabPanelBase$getCPro.headerStyle,
      headerClassName = _TabPanelBase$getCPro.headerClassName,
      _style = _TabPanelBase$getCPro.style,
      _className = _TabPanelBase$getCPro.className,
      disabled = _TabPanelBase$getCPro.disabled,
      leftIcon = _TabPanelBase$getCPro.leftIcon,
      rightIcon = _TabPanelBase$getCPro.rightIcon,
      header = _TabPanelBase$getCPro.header,
      headerTemplate = _TabPanelBase$getCPro.headerTemplate,
      closable = _TabPanelBase$getCPro.closable;
    var style = _objectSpread(_objectSpread({}, headerStyle || {}), _style || {});
    var className = classNames('p-unselectable-text', {
      'p-tabview-selected p-highlight': selected,
      'p-disabled': disabled
    }, headerClassName, _className);
    var headerId = idState + '_header_' + index;
    var ariaControls = idState + '_content_' + index;
    var tabIndex = disabled ? null : 0;
    var leftIconElement = leftIcon && /*#__PURE__*/React.createElement("i", {
      className: leftIcon
    });
    var titleElement = /*#__PURE__*/React.createElement("span", {
      className: "p-tabview-title"
    }, header);
    var rightIconElement = rightIcon && /*#__PURE__*/React.createElement("i", {
      className: rightIcon
    });
    var closableIconElement = closable && /*#__PURE__*/React.createElement("i", {
      className: "p-tabview-close pi pi-times",
      onClick: function onClick(e) {
        return onTabHeaderClose(e, index);
      }
    });
    var content =
    /*#__PURE__*/
    // eslint-disable /
    React.createElement("a", {
      role: "tab",
      className: "p-tabview-nav-link",
      onClick: function onClick(e) {
        return onTabHeaderClick(e, tab, index);
      },
      id: headerId,
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e, tab, index);
      },
      "aria-controls": ariaControls,
      "aria-selected": selected,
      tabIndex: tabIndex
    }, leftIconElement, titleElement, rightIconElement, closableIconElement, /*#__PURE__*/React.createElement(Ripple, null))
    // eslint-enable /
    ;

    if (headerTemplate) {
      var defaultContentOptions = {
        className: 'p-tabview-nav-link',
        titleClassName: 'p-tabview-title',
        onClick: function onClick(e) {
          return onTabHeaderClick(e, tab, index);
        },
        onKeyDown: function onKeyDown(e) {
          return _onKeyDown(e, tab, index);
        },
        leftIconElement: leftIconElement,
        titleElement: titleElement,
        rightIconElement: rightIconElement,
        element: content,
        props: props,
        index: index,
        selected: selected,
        ariaControls: ariaControls
      };
      content = ObjectUtils.getJSXElement(headerTemplate, defaultContentOptions);
    }
    return /*#__PURE__*/React.createElement("li", {
      ref: function ref(el) {
        return tabsRef.current["tab_".concat(index)] = el;
      },
      className: className,
      style: style,
      role: "presentation"
    }, content);
  };
  var createTabHeaders = function createTabHeaders() {
    return React.Children.map(props.children, function (tab, index) {
      if (shouldUseTab(tab, index)) {
        return createTabHeader(tab, index);
      }
    });
  };
  var createNavigator = function createNavigator() {
    var headers = createTabHeaders();
    return /*#__PURE__*/React.createElement("div", {
      ref: contentRef,
      id: idState,
      className: "p-tabview-nav-content",
      style: props.style,
      onScroll: onScroll
    }, /*#__PURE__*/React.createElement("ul", {
      ref: navRef,
      className: "p-tabview-nav",
      role: "tablist"
    }, headers, /*#__PURE__*/React.createElement("li", {
      ref: inkbarRef,
      className: "p-tabview-ink-bar"
    })));
  };
  var createContent = function createContent() {
    var className = classNames('p-tabview-panels', props.panelContainerClassName);
    var contents = React.Children.map(props.children, function (tab, index) {
      if (shouldUseTab(tab, index) && (!props.renderActiveOnly || isSelected(index))) {
        var selected = isSelected(index);
        var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'contentStyle') || {}), getTabProp(tab, 'style') || {});
        var _className2 = classNames(getTabProp(tab, 'contentClassName'), getTabProp(tab, 'className'), 'p-tabview-panel', {
          'p-hidden': !selected
        });
        var contentId = idState + '_content_' + index;
        var ariaLabelledBy = idState + '_header_' + index;
        var _otherProps = TabPanelBase.getCOtherProps(tab);
        return /*#__PURE__*/React.createElement("div", _extends({}, _otherProps, {
          id: contentId,
          "aria-labelledby": ariaLabelledBy,
          "aria-hidden": !selected,
          className: _className2,
          style: style,
          role: "tabpanel"
        }), !props.renderActiveOnly ? getTabProp(tab, 'children') : selected && getTabProp(tab, 'children'));
      }
    });
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: props.panelContainerStyle
    }, contents);
  };
  var createPrevButton = function createPrevButton() {
    if (props.scrollable && !backwardIsDisabledState) {
      return /*#__PURE__*/React.createElement("button", {
        ref: prevBtnRef,
        className: "p-tabview-nav-prev p-tabview-nav-btn p-link",
        onClick: navBackward,
        type: "button",
        "aria-label": ariaLabel('previousPageLabel')
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-left"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createNextButton = function createNextButton() {
    if (props.scrollable && !forwardIsDisabledState) {
      return /*#__PURE__*/React.createElement("button", {
        ref: nextBtnRef,
        className: "p-tabview-nav-next p-tabview-nav-btn p-link",
        onClick: navForward,
        type: "button",
        "aria-label": ariaLabel('nextPageLabel')
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-right",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
  };
  var otherProps = TabViewBase.getOtherProps(props);
  var className = classNames('p-tabview p-component', {
    'p-tabview-scrollable': props.scrollable
  }, props.className);
  var navigator = createNavigator();
  var content = createContent();
  var prevButton = createPrevButton();
  var nextButton = createNextButton();
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    className: className
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-tabview-nav-container"
  }, prevButton, navigator, nextButton), content);
});
TabPanel.displayName = 'TabPanel';
TabView.displayName = 'TabView';

export { TabPanel, TabView };
