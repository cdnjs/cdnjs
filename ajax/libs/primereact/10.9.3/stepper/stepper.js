this.primereact = this.primereact || {};
this.primereact.stepper = (function (exports, React, api, componentbase, csstransition, hooks, utils) {
  'use strict';

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
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  var classes = {
    root: function root(_ref) {
      var props = _ref.props;
      return utils.classNames('p-stepper p-component', {
        'p-stepper-horizontal': props.orientation === 'horizontal',
        'p-stepper-vertical': props.orientation === 'vertical',
        'p-readonly': props.linear
      });
    },
    nav: 'p-stepper-nav',
    stepper: {
      header: function header(_ref2) {
        var isStepActive = _ref2.isStepActive,
          isItemDisabled = _ref2.isItemDisabled,
          index = _ref2.index,
          headerPosition = _ref2.headerPosition,
          orientation = _ref2.orientation;
        return utils.classNames('p-stepper-header', _defineProperty({
          'p-highlight': isStepActive(index),
          'p-disabled': isItemDisabled(index)
        }, "p-stepper-header-".concat(headerPosition), orientation === 'horizontal'));
      },
      action: 'p-stepper-action p-component',
      number: 'p-stepper-number',
      title: 'p-stepper-title',
      separator: 'p-stepper-separator',
      toggleableContent: 'p-stepper-toggleable-content',
      content: function content(_ref3) {
        var props = _ref3.props;
        return utils.classNames('p-stepper-content', {
          'p-toggleable-content': props.orientation === 'vertical'
        });
      },
      panel: function panel(_ref4) {
        var props = _ref4.props,
          isStepActive = _ref4.isStepActive,
          index = _ref4.index;
        return utils.classNames('p-stepper-panel', {
          'p-stepper-panel-active': props.orientation === 'vertical' && isStepActive(index)
        });
      }
    },
    panelContainer: 'p-stepper-panels',
    start: 'p-stepper-start',
    end: 'p-stepper-end'
  };
  var styles = "\n@layer primereact {\n    .p-stepper .p-stepper-nav {\n        position: relative;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        overflow-x: auto;\n    }\n\n    .p-stepper-vertical .p-stepper-nav {\n        flex-direction: column;\n    }\n\n    .p-stepper-header {\n        position: relative;\n        display: flex;\n        flex: 1 1 auto;\n        align-items: center;\n\n        &:last-of-type {\n            flex: initial;\n        }\n    }\n\n    .p-stepper-header-bottom {\n        align-items: flex-start;\n    }\n\n    .p-stepper-header-top {\n        align-items: flex-end;\n    }\n\n    .p-stepper-header-right, .p-stepper-header-left {\n        align-items: center;\n    }\n\n    .p-stepper-header .p-stepper-action {\n        border: 0 none;\n        display: inline-flex;\n        align-items: center;\n        text-decoration: none;\n        cursor: pointer;\n\n        &:focus-visible {\n            @include focused();\n        }\n    }\n\n    .p-stepper-header-bottom .p-stepper-action {\n        flex-direction: column;\n    }\n\n    .p-stepper-header-top .p-stepper-action {\n        flex-direction: column-reverse;\n    }\n\n    .p-stepper-header-left .p-stepper-action {\n        flex-direction: row-reverse;\n    }\n\n    .p-stepper.p-stepper-readonly .p-stepper-header {\n        cursor: auto;\n    }\n\n    .p-stepper-header.p-highlight .p-stepper-action {\n        cursor: default;\n    }\n\n    .p-stepper-title {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 100%;\n    }\n\n    .p-stepper-number {\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-stepper-separator {\n        flex: 1 1 0;\n    }\n}\n";
  var StepperBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Stepper',
      activeStep: 0,
      orientation: 'horizontal',
      headerPosition: 'right',
      linear: false,
      onChangeStep: null,
      start: null,
      end: null
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var StepperContent = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var cx = props.cx;
    var rootProps = mergeProps(_objectSpread$3(_objectSpread$3(_objectSpread$3({
      ref: ref,
      id: props.id,
      className: cx('stepper.content', {
        stepperpanel: props.stepperpanel,
        index: props.index
      }),
      role: 'tabpanel',
      'aria-labelledby': props.ariaLabelledby
    }, props.getStepPT(props.stepperpanel, 'root', props.index)), props.getStepPT(props.stepperpanel, 'content', props.index)), {}, {
      'data-p-active': props.active
    }));
    var createContent = function createContent() {
      var ComponentToRender = props.template;
      return /*#__PURE__*/React__namespace.createElement(ComponentToRender, {
        index: props.index,
        active: props.active,
        highlighted: props.highlighted,
        clickCallback: function clickCallback(event) {
          return props.onItemClick(event, props.index);
        },
        prevCallback: function prevCallback(event) {
          return props.prevCallback(event, props.index);
        },
        nextCallback: function nextCallback(event) {
          return props.nextCallback(event, props.index);
        }
      });
    };
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.template ? createContent() : props.stepperpanel);
  }));
  StepperContent.displayName = 'StepperContent';

  function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var StepperHeader = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var cx = props.cx;
    var buttonProps = mergeProps(_objectSpread$2({
      ref: ref,
      id: props.id,
      className: cx('stepper.action'),
      role: 'tab',
      type: 'button',
      tabIndex: props.disabled ? -1 : undefined,
      'aria-controls': props.ariaControls,
      onClick: function onClick(e) {
        return props.clickCallback(e, props.index);
      }
    }, props.getStepPT(props.stepperpanel, 'action', props.index)));
    var numberProps = mergeProps(_objectSpread$2({
      className: cx('stepper.number')
    }, props.getStepPT(props.stepperpanel, 'number', props.index)));
    var titleProps = mergeProps(_objectSpread$2({
      className: cx('stepper.title')
    }, props.getStepPT(props.stepperpanel, 'title', props.index)));
    return props.template ? props.template() : /*#__PURE__*/React__namespace.createElement("button", buttonProps, /*#__PURE__*/React__namespace.createElement("span", numberProps, props.index + 1), /*#__PURE__*/React__namespace.createElement("span", titleProps, props.getStepProp(props.stepperpanel, 'header')));
  }));
  StepperHeader.displayName = 'StepperHeader';

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var StepperSeparator = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var mergeProps = hooks.useMergeProps();
    var separatorProps = mergeProps(_objectSpread$1({
      ref: ref,
      'aria-hidden': true,
      className: props.separatorClass
    }, props.getStepPT(props.stepperpanel, 'separator', props.index)));
    return props.template ? props.template() : /*#__PURE__*/React__namespace.createElement("span", separatorProps);
  }));
  StepperSeparator.displayName = 'StepperSeparator';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var Stepper = /*#__PURE__*/React__default["default"].memo(/*#__PURE__*/React__default["default"].forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__default["default"].useContext(api.PrimeReactContext);
    var props = StepperBase.getProps(inProps, context);
    var start = utils.ObjectUtils.getJSXElement(props.start, props);
    var end = utils.ObjectUtils.getJSXElement(props.end, props);
    var _StepperBase$setMetaD = StepperBase.setMetaData({
        props: props
      }),
      ptm = _StepperBase$setMetaD.ptm,
      cx = _StepperBase$setMetaD.cx,
      isUnstyled = _StepperBase$setMetaD.isUnstyled,
      ptmo = _StepperBase$setMetaD.ptmo;
    var _React$useState = React__default["default"].useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__default["default"].useState(props.activeStep),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeStepState = _React$useState4[0],
      setActiveStepState = _React$useState4[1];
    var navRef = React__default["default"].useRef();
    componentbase.useHandleStyle(StepperBase.css.styles, isUnstyled, {
      name: 'stepper'
    });
    var startProps = mergeProps({
      className: cx('start')
    }, ptm('start'));
    var endProps = mergeProps({
      className: cx('end')
    }, ptm('end'));
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    hooks.useUpdateEffect(function () {
      if (props.activeStep >= 0 && props.activeStep <= stepperPanels().length - 1) {
        updateActiveStep(undefined, props.activeStep);
      }
    }, [props.activeStep]);
    var getStepProp = function getStepProp(step, name) {
      var _step$props;
      return step === null || step === void 0 || (_step$props = step.props) === null || _step$props === void 0 ? void 0 : _step$props[name];
    };
    var getStepKey = function getStepKey(step, index) {
      return getStepProp(step, 'header') || index;
    };
    var isStep = function isStep(child) {
      return child.type.displayName === 'StepperPanel';
    };
    var isStepActive = function isStepActive(index) {
      return activeStepState === index;
    };
    var isItemDisabled = function isItemDisabled(index) {
      return props.linear && !isStepActive(index);
    };
    var updateActiveStep = function updateActiveStep(event, index) {
      setActiveStepState(index);
      props.onChangeStep && props.onChangeStep({
        originalEvent: event,
        index: index
      });
    };
    var getStepHeaderActionId = function getStepHeaderActionId(index) {
      return "".concat(idState, "_").concat(index, "_header_action");
    };
    var getStepContentId = function getStepContentId(index) {
      return "".concat(idState, "_").concat(index, "content");
    };
    var stepperPanels = function stepperPanels() {
      return React__default["default"].Children.toArray(props.children).reduce(function (stepperpanels, child) {
        if (isStep(child)) {
          stepperpanels.push(child);
        } else if (child && Array.isArray(child)) {
          React__default["default"].Children.toArray(child.props.children).forEach(function (nestedChild) {
            if (isStep(nestedChild)) {
              stepperpanels.push(nestedChild);
            }
          });
        }
        return stepperpanels;
      }, []);
    };
    var _prevCallback = function prevCallback(event, index) {
      if (index !== 0) {
        updateActiveStep(event, index - 1);
      }
    };
    var _nextCallback = function nextCallback(event, index) {
      if (index !== stepperPanels().length - 1) {
        updateActiveStep(event, index + 1);
      }
    };
    var getStepPT = function getStepPT(step, key, index) {
      var count = stepperPanels().length;
      var stepMetaData = {
        props: step.props,
        parent: {
          props: props
        },
        context: {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          active: isStepActive(index),
          highlighted: index < activeStepState,
          disabled: isItemDisabled(index)
        }
      };
      return mergeProps(ptm("stepperpanel.".concat(key), {
        stepperpanel: stepMetaData
      }), ptm("stepperpanel.".concat(key), stepMetaData), ptmo(getStepProp(step, 'pt'), key, stepMetaData));
    };
    var onItemClick = function onItemClick(event, index) {
      if (props.linear) {
        event.preventDefault();
        return;
      }
      if (index !== activeStepState) {
        updateActiveStep(event, index);
      }
    };
    var createPanel = function createPanel() {
      return stepperPanels().map(function (step, index) {
        var _step$children, _step$children2;
        var panelProps = mergeProps(_objectSpread({
          className: utils.classNames(cx('stepper.header', {
            isStepActive: isStepActive,
            isItemDisabled: isItemDisabled,
            step: step,
            index: index,
            headerPosition: props.headerPosition,
            orientation: props.orientation
          })),
          'aria-current': isStepActive(index) && 'step',
          role: 'presentation',
          'data-p-highlight': isStepActive(index),
          'data-p-disabled': isItemDisabled(index),
          'data-p-active': isStepActive(index)
        }, getStepPT(step, 'header', index)));
        return /*#__PURE__*/React__default["default"].createElement("li", _extends({
          key: getStepKey(step, index)
        }, panelProps), /*#__PURE__*/React__default["default"].createElement(StepperHeader, {
          id: getStepHeaderActionId(index),
          template: (_step$children = step.children) === null || _step$children === void 0 ? void 0 : _step$children.header,
          stepperpanel: step,
          index: index,
          disabled: isItemDisabled(index),
          active: isStepActive(index),
          highlighted: index < activeStepState,
          ariaControls: getStepContentId(index),
          clickCallback: onItemClick,
          getStepPT: getStepPT,
          getStepProp: getStepProp,
          cx: cx
        }), index !== stepperPanels().length - 1 && /*#__PURE__*/React__default["default"].createElement(StepperSeparator, {
          template: (_step$children2 = step.children) === null || _step$children2 === void 0 ? void 0 : _step$children2.separator,
          separatorClass: cx('stepper.separator'),
          stepperpanel: step,
          index: index,
          active: isStepActive(index),
          highlighted: index < activeStepState,
          getStepPT: getStepPT
        }));
      });
    };
    React__default["default"].useImperativeHandle(ref, function () {
      return {
        getElement: function getElement() {
          return navRef.current;
        },
        getActiveStep: function getActiveStep() {
          return activeStepState;
        },
        setActiveStep: function setActiveStep(step) {
          return setActiveStepState(step);
        },
        nextCallback: function nextCallback(e) {
          return _nextCallback(e, activeStepState);
        },
        prevCallback: function prevCallback(e) {
          return _prevCallback(e, activeStepState);
        }
      };
    });
    var createPanelContent = function createPanelContent() {
      return stepperPanels().map(function (step, index) {
        var _step$children3;
        if (!isStepActive(index)) {
          return null;
        }
        return /*#__PURE__*/React__default["default"].createElement(StepperContent, {
          key: getStepContentId(index),
          id: getStepContentId(index),
          tempate: step === null || step === void 0 || (_step$children3 = step.children) === null || _step$children3 === void 0 ? void 0 : _step$children3.content,
          stepperpanel: step,
          index: index,
          active: isStepActive(index),
          highlighted: index < activeStepState,
          clickCallback: onItemClick,
          prevCallback: _prevCallback,
          nextCallback: _nextCallback,
          getStepPT: getStepPT,
          ariaLabelledby: getStepHeaderActionId(index),
          ptm: ptm,
          cx: cx
        });
      });
    };
    var createHorizontal = function createHorizontal() {
      var items = createPanel();
      var navProps = mergeProps({
        className: utils.classNames(cx('nav')),
        ref: navRef
      }, ptm('nav'));
      var panelContainerProps = mergeProps({
        className: cx('panelContainer')
      }, ptm('panelContainer'));
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("ul", navProps, items), /*#__PURE__*/React__default["default"].createElement("div", panelContainerProps, createPanelContent()));
    };
    var createVertical = function createVertical() {
      return stepperPanels().map(function (step, index) {
        var _step$children4, _step$children5, _step$children6;
        var contentRef = /*#__PURE__*/React__default["default"].createRef(null);
        var navProps = mergeProps(_objectSpread(_objectSpread(_objectSpread({
          ref: navRef,
          className: cx('stepper.panel', {
            props: props,
            index: index,
            isStepActive: isStepActive
          }),
          'aria-current': isStepActive(index) && 'step'
        }, getStepPT(step, 'root', index)), getStepPT(step, 'panel', index)), {}, {
          'data-p-highlight': isStepActive(index),
          'data-p-disabled': isItemDisabled(index),
          'data-p-active': isStepActive(index)
        }));
        var headerProps = mergeProps(_objectSpread({
          className: cx('stepper.header', {
            step: step,
            isStepActive: isStepActive,
            isItemDisabled: isItemDisabled,
            index: index
          })
        }, getStepPT(step, 'header', index)));
        var transitionProps = mergeProps(_objectSpread(_objectSpread({
          classNames: cx('stepper.content')
        }, getStepPT(step, 'transition', index)), {}, {
          timeout: {
            enter: 1000,
            exit: 450
          },
          "in": isStepActive(index),
          unmountOnExit: true
        }));
        var toggleableContentProps = mergeProps(_objectSpread({
          ref: contentRef,
          className: cx('stepper.toggleableContent')
        }, getStepPT(step, 'toggleableContent', index)));
        return /*#__PURE__*/React__default["default"].createElement("div", _extends({
          key: getStepKey(step, index)
        }, navProps), /*#__PURE__*/React__default["default"].createElement("div", headerProps, /*#__PURE__*/React__default["default"].createElement(StepperHeader, {
          id: getStepHeaderActionId(index),
          template: (_step$children4 = step.children) === null || _step$children4 === void 0 ? void 0 : _step$children4.header,
          stepperpanel: step,
          index: index,
          disabled: isItemDisabled(index),
          active: isStepActive(index),
          highlighted: index < activeStepState,
          ariaControls: getStepContentId(index),
          clickCallback: onItemClick,
          getStepPT: getStepPT,
          getStepProp: getStepProp,
          cx: cx
        })), /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, _extends({
          nodeRef: contentRef
        }, transitionProps), /*#__PURE__*/React__default["default"].createElement("div", toggleableContentProps, index !== stepperPanels().length - 1 && /*#__PURE__*/React__default["default"].createElement(StepperSeparator, {
          template: (_step$children5 = step.children) === null || _step$children5 === void 0 ? void 0 : _step$children5.separator,
          separatorClass: cx('stepper.separator'),
          stepperpanel: step,
          index: index,
          active: isStepActive(index),
          highlighted: index < activeStepState,
          getStepPT: getStepPT
        }), /*#__PURE__*/React__default["default"].createElement(StepperContent, {
          key: getStepContentId(index),
          id: getStepContentId(index),
          tempate: step === null || step === void 0 || (_step$children6 = step.children) === null || _step$children6 === void 0 ? void 0 : _step$children6.content,
          stepperpanel: step,
          index: index,
          active: isStepActive(index),
          highlighted: index < activeStepState,
          clickCallback: onItemClick,
          prevCallback: _prevCallback,
          nextCallback: _nextCallback,
          getStepPT: getStepPT,
          ariaLabelledby: getStepHeaderActionId(index),
          ptm: ptm,
          cx: cx
        }))));
      });
    };
    var rootProps = mergeProps({
      className: utils.classNames(cx('root')),
      role: 'tablist'
    }, StepperBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__default["default"].createElement("div", rootProps, start && /*#__PURE__*/React__default["default"].createElement("div", startProps, start), props.orientation === 'horizontal' && createHorizontal(), props.orientation === 'vertical' && createVertical(), end && /*#__PURE__*/React__default["default"].createElement("div", endProps, end));
  }));
  StepperBase.displayName = 'StepperBase';

  exports.Stepper = Stepper;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.utils);
