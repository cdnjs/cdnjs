this.primereact = this.primereact || {};
this.primereact.accordion = (function (exports, React, api, componentbase, csstransition, hooks, chevrondown, chevronright, utils) {
  'use strict';

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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    root: 'p-accordion p-component',
    accordiontab: {
      root: function root(_ref) {
        var selected = _ref.selected;
        return utils.classNames('p-accordion-tab', {
          'p-accordion-tab-active': selected
        });
      },
      content: 'p-accordion-content',
      header: function header(_ref2) {
        var selected = _ref2.selected,
          getTabProp = _ref2.getTabProp,
          tab = _ref2.tab;
        return utils.classNames('p-accordion-header', {
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
  var AccordionBase = componentbase.ComponentBase.extend({
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
  var AccordionTabBase = componentbase.ComponentBase.extend({
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
      return utils.ObjectUtils.getComponentProp(tab, name, AccordionTabBase.defaultProps);
    },
    getCProps: function getCProps(tab) {
      return utils.ObjectUtils.getComponentProps(tab, AccordionTabBase.defaultProps);
    },
    getCOtherProps: function getCOtherProps(tab) {
      return utils.ObjectUtils.getComponentDiffProps(tab, AccordionTabBase.defaultProps);
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var AccordionTab = function AccordionTab() {};
  var Accordion = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = AccordionBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.activeIndex),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeIndexState = _React$useState4[0],
      setActiveIndexState = _React$useState4[1];
    var elementRef = React__namespace.useRef(null);
    var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
    var count = React__namespace.Children.count(props.children);
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
      cx = _AccordionBase$setMet.cx,
      isUnstyled = _AccordionBase$setMet.isUnstyled;
    componentbase.useHandleStyle(AccordionBase.css.styles, isUnstyled, {
      name: 'accordion'
    });
    var getTabProp = function getTabProp(tab, name) {
      return AccordionTabBase.getCProp(tab, name);
    };
    var getTabPT = function getTabPT(tab, key, index) {
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
      }), ptm("accordiontab.".concat(key), {
        accordiontab: tabMetaData
      }), ptm("accordiontab.".concat(key), tabMetaData), ptmo(getTabProp(tab, 'pt'), key, tabMetaData));
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
      var nextHeaderAction = _findNextHeaderAction(event.target.parentElement.parentElement);
      nextHeaderAction ? changeFocusedTab(nextHeaderAction) : onTabHomeKey(event);
      event.preventDefault();
    };
    var onTabArrowUpKey = function onTabArrowUpKey(event) {
      var prevHeaderAction = _findPrevHeaderAction(event.target.parentElement.parentElement);
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
    var _findNextHeaderAction = function findNextHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
      var headerElement = utils.DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? _findNextHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    };
    var _findPrevHeaderAction = function findPrevHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      var headerElement = utils.DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? _findPrevHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    };
    var findFirstHeaderAction = function findFirstHeaderAction() {
      return _findNextHeaderAction(elementRef.current.firstElementChild, true);
    };
    var findLastHeaderAction = function findLastHeaderAction() {
      return _findPrevHeaderAction(elementRef.current.lastElementChild, true);
    };
    var changeFocusedTab = function changeFocusedTab(element) {
      if (element) {
        utils.DomHandler.focus(element);
      }
    };
    var isSelected = function isSelected(index) {
      return props.multiple && Array.isArray(activeIndex) ? activeIndex && activeIndex.some(function (i) {
        return i === index;
      }) : activeIndex === index;
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
        className: cx('accordiontab.headertitle')
      }, getTabPT(tab, 'headertitle', index));
      var tabCProps = AccordionTabBase.getCProps(tab);
      var header = getTabProp(tab, 'headerTemplate') ? utils.ObjectUtils.getJSXElement(getTabProp(tab, 'headerTemplate'), tabCProps) : /*#__PURE__*/React__namespace.createElement("span", headerTitleProps, utils.ObjectUtils.getJSXElement(getTabProp(tab, 'header'), tabCProps));
      var headerIconProps = mergeProps({
        'aria-hidden': 'true',
        className: cx('accordiontab.headericon')
      }, getTabPT(tab, 'headericon', index));
      var icon = selected ? props.collapseIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, headerIconProps) : props.expandIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, headerIconProps);
      var toggleIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, headerIconProps), {
        props: props,
        selected: selected
      });
      var headerProps = mergeProps({
        className: utils.classNames(getTabProp(tab, 'headerClassName'), getTabProp(tab, 'className'), cx('accordiontab.header', {
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
        className: cx('accordiontab.headeraction'),
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
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, /*#__PURE__*/React__namespace.createElement("a", headerActionProps, toggleIcon, header));
    };
    var createTabContent = function createTabContent(tab, selected, index) {
      var style = _objectSpread(_objectSpread({}, getTabProp(tab, 'style') || {}), getTabProp(tab, 'contentStyle') || {});
      var contentId = idState + '_content_' + index;
      var ariaLabelledby = idState + '_header_' + index;
      var contentRef = /*#__PURE__*/React__namespace.createRef();
      var toggleableContentProps = mergeProps({
        id: contentId,
        ref: contentRef,
        className: utils.classNames(getTabProp(tab, 'contentClassName'), getTabProp(tab, 'className'), cx('accordiontab.toggleablecontent')),
        style: style,
        role: 'region',
        'aria-labelledby': ariaLabelledby
      }, getTabPT(tab, 'toggleablecontent', index));
      var contentProps = mergeProps({
        className: cx('accordiontab.content')
      }, getTabPT(tab, 'content', index));
      var transitionProps = mergeProps({
        classNames: cx('accordiontab.transition'),
        timeout: {
          enter: 1000,
          exit: 450
        },
        "in": selected,
        unmountOnExit: true,
        options: props.transitionOptions
      }, getTabPT(tab, 'transition', index));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: contentRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", toggleableContentProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, getTabProp(tab, 'children'))));
    };
    var createTab = function createTab(tab, index) {
      if (utils.ObjectUtils.isValidChild(tab, 'AccordionTab')) {
        var key = idState + '_' + index;
        var selected = isSelected(index);
        var tabHeader = createTabHeader(tab, selected, index);
        var tabContent = createTabContent(tab, selected, index);
        var _rootProps = mergeProps({
          className: cx('accordiontab.root', {
            selected: selected
          })
        }, AccordionTabBase.getCOtherProps(tab), getTabPT(tab, 'root', index));
        return /*#__PURE__*/React__namespace.createElement("div", _extends({}, _rootProps, {
          key: key
        }), tabHeader, tabContent);
      }
      return null;
    };
    var createTabs = function createTabs() {
      return React__namespace.Children.map(props.children, createTab);
    };
    var tabs = createTabs();
    var rootProps = mergeProps({
      className: utils.classNames(props.className, cx('root')),
      style: props.style
    }, AccordionBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: idState,
      ref: elementRef
    }, rootProps), tabs);
  });
  AccordionTab.displayName = 'AccordionTab';
  Accordion.displayName = 'Accordion';

  exports.Accordion = Accordion;
  exports.AccordionTab = AccordionTab;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.icons.chevrondown, primereact.icons.chevronright, primereact.utils);
