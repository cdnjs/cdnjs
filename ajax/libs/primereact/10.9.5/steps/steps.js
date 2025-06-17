this.primereact = this.primereact || {};
this.primereact.steps = (function (exports, React, api, componentbase, hooks, utils) {
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    icon: function icon(_ref) {
      var item = _ref.item;
      return utils.classNames('p-menuitem-icon', item.icon);
    },
    label: 'p-steps-title',
    step: 'p-steps-number',
    action: 'p-menuitem-link',
    menuitem: function menuitem(_ref2) {
      var active = _ref2.active,
        disabled = _ref2.disabled,
        item = _ref2.item;
      return utils.classNames('p-steps-item', item.className, {
        'p-highlight p-steps-current': active,
        'p-disabled': disabled
      });
    },
    root: function root(_ref3) {
      var props = _ref3.props;
      return utils.classNames('p-steps p-component', {
        'p-readonly': props.readOnly
      });
    }
  };
  var styles = "\n@layer primereact {\n    .p-steps {\n        position: relative;\n    }\n\n    .p-steps ol {\n        padding: 0;\n        margin: 0;\n        list-style-type: none;\n        display: flex;\n    }\n\n    .p-steps-item {\n        position: relative;\n        display: flex;\n        justify-content: center;\n        flex: 1 1 auto;\n    }\n\n    .p-steps-item .p-menuitem-link {\n        display: inline-flex;\n        flex-direction: column;\n        align-items: center;\n        overflow: hidden;\n        text-decoration: none;\n    }\n\n    .p-steps.p-readonly .p-steps-item {\n        cursor: auto;\n    }\n\n    .p-steps-item.p-steps-current .p-menuitem-link {\n        cursor: default;\n    }\n\n    .p-steps-title {\n        white-space: nowrap;\n    }\n\n    .p-steps-number {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-steps-title {\n        display: block;\n    }\n}\n";
  var StepsBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Steps',
      id: null,
      model: null,
      activeIndex: 0,
      readOnly: true,
      style: null,
      className: null,
      onSelect: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    },
    getCProp: function getCProp(step, name) {
      return utils.ObjectUtils.getComponentProp(step, name, StepsBase.defaultProps);
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Steps = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = StepsBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var listRef = React__namespace.useRef(null);
    var count = React__namespace.Children.count(props.children);
    var metaData = {
      props: props,
      state: {
        id: idState,
        activeIndex: props.activeIndex
      }
    };
    var _StepsBase$setMetaDat = StepsBase.setMetaData(_objectSpread({}, metaData)),
      ptm = _StepsBase$setMetaDat.ptm,
      ptmo = _StepsBase$setMetaDat.ptmo,
      cx = _StepsBase$setMetaDat.cx,
      isUnstyled = _StepsBase$setMetaDat.isUnstyled;
    componentbase.useHandleStyle(StepsBase.css.styles, isUnstyled, {
      name: 'steps'
    });
    var getStepPT = function getStepPT(step, key, index) {
      var stepMetaData = {
        // props: step.props,
        parent: metaData,
        context: {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          active: index === props.activeIndex,
          disabled: getStepProp(step, 'disabled')
        }
      };
      return mergeProps(ptm("step.".concat(key), {
        step: stepMetaData
      }), ptm("steps.".concat(key), {
        steps: stepMetaData
      }), ptm("steps.".concat(key), stepMetaData), ptmo(getStepProp(step, 'pt'), key, stepMetaData));
    };
    var getStepProp = function getStepProp(step, name) {
      return StepsBase.getCProp(step, name);
    };
    var itemClick = function itemClick(event, item, index) {
      if (props.readOnly || item.disabled) {
        event.preventDefault();
        return;
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          item: item,
          index: index
        });
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item,
          index: index
        });
      }
      if (!item.url) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var onItemKeyDown = function onItemKeyDown(event, item, index) {
      if (props.readOnly) {
        return;
      }
      switch (event.code) {
        case 'ArrowRight':
          navigateToNextItem(event.target);
          event.preventDefault();
          break;
        case 'ArrowLeft':
          navigateToPrevItem(event.target);
          event.preventDefault();
          break;
        case 'Home':
          navigateToFirstItem(event.target);
          event.preventDefault();
          break;
        case 'End':
          navigateToLastItem(event.target);
          event.preventDefault();
          break;
        case 'Tab':
          //no op
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          itemClick(event, item, index);
          event.preventDefault();
          break;
      }
    };
    var navigateToNextItem = function navigateToNextItem(target) {
      var nextItem = findNextItem(target);
      nextItem && setFocusToMenuitem(target, nextItem);
    };
    var navigateToPrevItem = function navigateToPrevItem(target) {
      var prevItem = findPrevItem(target);
      prevItem && setFocusToMenuitem(target, prevItem);
    };
    var navigateToFirstItem = function navigateToFirstItem(target) {
      var firstItem = findFirstItem();
      firstItem && setFocusToMenuitem(target, firstItem);
    };
    var navigateToLastItem = function navigateToLastItem(target) {
      var lastItem = findLastItem();
      lastItem && setFocusToMenuitem(target, lastItem);
    };
    var findNextItem = function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? nextItem.children[0] : null;
    };
    var findPrevItem = function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? prevItem.children[0] : null;
    };
    var findFirstItem = function findFirstItem() {
      var firstSibling = utils.DomHandler.findSingle(listRef.current, '[data-pc-section="menuitem"]');
      return firstSibling ? firstSibling.children[0] : null;
    };
    var findLastItem = function findLastItem() {
      var siblings = utils.DomHandler.find(listRef.current, '[data-pc-section="menuitem"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    };
    var setFocusToMenuitem = function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = '-1';
      focusableItem.tabIndex = '0';
      setTimeout(function () {
        return focusableItem.focus();
      }, 0);
    };
    var setFocusToFirstItem = function setFocusToFirstItem() {
      var firstItem = findFirstItem();
      firstItem.tabIndex = '0';
      firstItem.focus();
    };
    var createItem = function createItem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var key = item.id || idState + '_' + index;
      var active = index === props.activeIndex;
      var disabled = item.disabled || index !== props.activeIndex && props.readOnly;
      var iconClassName = utils.classNames('p-menuitem-icon', item.icon);
      var iconProps = mergeProps({
        className: cx('icon', {
          item: item
        })
      }, getStepPT(item, 'icon', index));
      var icon = utils.IconUtils.getJSXIcon(item.icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = mergeProps({
        className: cx('label')
      }, getStepPT(item, 'label', index));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var stepProps = mergeProps({
        className: cx('step')
      }, getStepPT(item, 'step', index));
      var actionProps = mergeProps({
        href: item.url || '#',
        className: cx('action'),
        tabIndex: '-1',
        onFocus: function onFocus(event) {
          return event.stopPropagation();
        },
        target: item.target,
        onKeyDown: function onKeyDown(event) {
          return onItemKeyDown(event, item, index);
        },
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        }
      }, getStepPT(item, 'action', index));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, /*#__PURE__*/React__namespace.createElement("span", stepProps, index + 1), icon, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item, index);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-steps-title',
          numberClassName: 'p-steps-number',
          iconClassName: iconClassName,
          'aria-current': active,
          element: content,
          props: props,
          active: active,
          disabled: disabled
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var menuItemProps = mergeProps({
        id: key,
        className: cx('menuitem', {
          active: active,
          disabled: disabled,
          item: item
        }),
        style: item.style
      }, ptm('menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuItemProps, {
        key: key
      }), content);
    };
    var createItems = function createItems() {
      var menuProps = mergeProps({
        ref: listRef,
        tabIndex: props.readOnly ? null : '0',
        onFocus: function onFocus() {
          if (!props.readOnly) {
            setFocusToFirstItem();
          }
        },
        onBlur: function onBlur() {
          return setFocusToFirstItem;
        }
      }, ptm('menu'));
      if (props.model) {
        var _items = props.model.map(createItem);
        return /*#__PURE__*/React__namespace.createElement("ol", menuProps, _items);
      }
      return null;
    };
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      style: props.style
    }, StepsBase.getOtherProps(props), ptm('root'));
    var items = createItems();
    return /*#__PURE__*/React__namespace.createElement("nav", rootProps, items);
  }));
  Steps.displayName = 'Steps';

  exports.Steps = Steps;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
