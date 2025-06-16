this.primereact = this.primereact || {};
this.primereact.calendar = (function (exports, React, PrimeReact, button, componentbase, hooks, calendar, chevrondown, chevronleft, chevronright, chevronup, inputtext, overlayservice, ripple, utils, csstransition, portal) {
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
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _arrayLikeToArray$1(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray$1(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray$1(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread();
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
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
  }

  var styles = "\n@layer primereact {\n    .p-calendar {\n        position: relative;\n        display: inline-flex;\n        max-width: 100%;\n    }\n\n    .p-calendar .p-inputtext {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-calendar-w-btn-right .p-inputtext {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-calendar-w-btn-right .p-datepicker-trigger {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    .p-calendar-w-btn-left .p-inputtext {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    .p-calendar-w-btn-left .p-datepicker-trigger {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    /* Fluid */\n    .p-fluid .p-calendar {\n        display: flex;\n    }\n\n    .p-fluid .p-calendar .p-inputtext {\n        width: 1%;\n    }\n\n    /* Datepicker */\n    .p-calendar .p-datepicker {\n        min-width: 100%;\n    }\n\n    .p-datepicker {\n        width: auto;\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n\n    .p-datepicker-inline {\n        display: inline-block;\n        position: static;\n        overflow-x: auto;\n    }\n\n    /* Header */\n    .p-datepicker-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-datepicker-header .p-datepicker-title {\n        margin: 0 auto;\n    }\n\n    .p-datepicker-prev,\n    .p-datepicker-next {\n        cursor: pointer;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Multiple Month DatePicker */\n    .p-datepicker-multiple-month .p-datepicker-group-container {\n        display: flex;\n    }\n\n    .p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group {\n        flex: 1 1 auto;\n    }\n\n    /* Multiple Month DatePicker */\n    .p-datepicker-multiple-month .p-datepicker-group-container {\n        display: flex;\n    }\n\n    /* DatePicker Table */\n    .p-datepicker table {\n        width: 100%;\n        border-collapse: collapse;\n    }\n\n    .p-datepicker td > span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        margin: 0 auto;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Month Picker */\n    .p-monthpicker-month {\n        width: 33.3%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /*  Button Bar */\n    .p-datepicker-buttonbar {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n\n    /* Time Picker */\n    .p-timepicker {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-timepicker button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-timepicker > div {\n        display: flex;\n        align-items: center;\n        flex-direction: column;\n    }\n\n    /* Touch UI */\n    .p-datepicker-touch-ui,\n    .p-calendar .p-datepicker-touch-ui {\n        position: fixed;\n        top: 50%;\n        left: 50%;\n        min-width: 80vw;\n        transform: translate(-50%, -50%);\n    }\n\n    /* Year Picker */\n    .p-yearpicker-year {\n        width: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n}\n";
  var classes = {
    root: function root(_ref) {
      var props = _ref.props,
        focusedState = _ref.focusedState,
        isFilled = _ref.isFilled,
        panelVisible = _ref.panelVisible;
      return utils.classNames('p-calendar p-component p-inputwrapper', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "p-calendar-w-btn p-calendar-w-btn-".concat(props.iconPos), props.showIcon), 'p-calendar-disabled', props.disabled), 'p-invalid', props.invalid), 'p-calendar-timeonly', props.timeOnly), 'p-inputwrapper-filled', props.value || isFilled), 'p-inputwrapper-focus', focusedState), 'p-focus', focusedState || panelVisible));
    },
    input: function input(_ref2) {
      var props = _ref2.props,
        context = _ref2.context;
      return utils.classNames('p-inputtext p-component', {
        'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
      });
    },
    dropdownButton: 'p-datepicker-trigger',
    buttonbar: 'p-datepicker-buttonbar',
    todayButton: 'p-button-text',
    clearButton: 'p-button-text',
    footer: 'p-datepicker-footer',
    yearPicker: 'p-yearpicker',
    year: function year(_ref3) {
      var isYearSelected = _ref3.isYearSelected,
        y = _ref3.y,
        isMonthYearDisabled = _ref3.isMonthYearDisabled;
      return utils.classNames('p-yearpicker-year', {
        'p-highlight': isYearSelected(y),
        'p-disabled': isMonthYearDisabled(-1, y)
      });
    },
    monthPicker: 'p-monthpicker',
    month: function month(_ref4) {
      var isMonthSelected = _ref4.isMonthSelected,
        isMonthYearDisabled = _ref4.isMonthYearDisabled,
        i = _ref4.i,
        currentYear = _ref4.currentYear;
      return utils.classNames('p-monthpicker-month', {
        'p-highlight': isMonthSelected(i),
        'p-disabled': isMonthYearDisabled(i, currentYear)
      });
    },
    hourPicker: 'p-hour-picker',
    secondPicker: 'p-second-picker',
    minutePicker: 'p-minute-picker',
    millisecondPicker: 'p-millisecond-picker',
    ampmPicker: 'p-ampm-picker',
    separatorContainer: 'p-separator',
    dayLabel: function dayLabel(_ref5) {
      var className = _ref5.className;
      return className;
    },
    day: function day(_ref6) {
      var date = _ref6.date;
      return utils.classNames({
        'p-datepicker-other-month': date.otherMonth,
        'p-datepicker-today': date.today
      });
    },
    panel: function panel(_ref7) {
      var panelClassName = _ref7.panelClassName;
      return panelClassName;
    },
    previousIcon: 'p-datepicker-prev-icon',
    previousButton: 'p-datepicker-prev',
    nextIcon: 'p-datepicker-next-icon',
    nextButton: 'p-datepicker-next',
    incrementButton: 'p-link',
    decrementButton: 'p-link',
    title: 'p-datepicker-title',
    timePicker: 'p-timepicker',
    monthTitle: 'p-datepicker-month p-link',
    yearTitle: 'p-datepicker-year p-link',
    decadeTitle: 'p-datepicker-decade',
    header: 'p-datepicker-header',
    groupContainer: 'p-datepicker-group-container',
    group: 'p-datepicker-group',
    select: function select(_ref8) {
      var props = _ref8.props;
      return props.monthNavigator && props.view !== 'month' ? 'p-datepicker-month' : props.yearNavigator ? 'p-datepicker-year' : undefined;
    },
    weekHeader: 'p-datepicker-weekheader p-disabled',
    weekNumber: 'p-datepicker-weeknumber',
    weekLabelContainer: 'p-disabled',
    container: 'p-datepicker-calendar-container',
    table: 'p-datepicker-calendar',
    transition: 'p-connected-overlay'
  };
  var CalendarBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Calendar',
      appendTo: null,
      ariaLabelledBy: null,
      ariaLabel: null,
      autoZIndex: true,
      autoFocus: false,
      baseZIndex: 0,
      className: null,
      clearButtonClassName: 'p-button-secondary',
      dateFormat: null,
      dateTemplate: null,
      decadeTemplate: null,
      decrementIcon: null,
      disabled: false,
      disabledDates: null,
      disabledDays: null,
      enabledDates: null,
      footerTemplate: null,
      formatDateTime: null,
      headerTemplate: null,
      hideOnDateTimeSelect: false,
      hideOnRangeSelection: false,
      hourFormat: '24',
      icon: null,
      iconPos: 'right',
      id: null,
      incrementIcon: null,
      inline: false,
      inputClassName: null,
      inputId: null,
      inputMode: 'none',
      inputRef: null,
      inputStyle: null,
      variant: null,
      invalid: false,
      keepInvalid: false,
      locale: null,
      mask: null,
      maskSlotChar: '_',
      maxDate: null,
      maxDateCount: null,
      minDate: null,
      monthNavigator: false,
      monthNavigatorTemplate: null,
      name: null,
      nextIcon: null,
      numberOfMonths: 1,
      onBlur: null,
      onChange: null,
      onClearButtonClick: null,
      onFocus: null,
      onHide: null,
      onInput: null,
      onMonthChange: null,
      onSelect: null,
      onShow: null,
      onTodayButtonClick: null,
      onViewDateChange: null,
      onVisibleChange: null,
      panelClassName: null,
      panelStyle: null,
      parseDateTime: null,
      placeholder: null,
      prevIcon: null,
      readOnlyInput: false,
      required: false,
      selectOtherMonths: false,
      selectionMode: 'single',
      shortYearCutoff: '+10',
      showButtonBar: false,
      showIcon: false,
      showMillisec: false,
      showMinMaxRange: false,
      showOnFocus: true,
      showOtherMonths: true,
      showSeconds: false,
      showTime: false,
      showWeek: false,
      stepHour: 1,
      stepMillisec: 1,
      stepMinute: 1,
      stepSecond: 1,
      style: null,
      tabIndex: null,
      timeOnly: false,
      todayButtonClassName: 'p-button-secondary',
      tooltip: null,
      tooltipOptions: null,
      touchUI: false,
      transitionOptions: null,
      value: null,
      view: 'date',
      viewDate: null,
      visible: false,
      yearNavigator: false,
      yearNavigatorTemplate: null,
      yearRange: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  var CalendarPanel = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var cx = props.cx;
    var mergeProps = hooks.useMergeProps();
    var createElement = function createElement() {
      var panelProps = mergeProps({
        className: cx('panel', {
          panelClassName: props.className
        }),
        style: props.style,
        role: props.inline ? null : 'dialog',
        id: props.id,
        'aria-label': PrimeReact.localeOption('chooseDate', props.locale),
        'aria-modal': props.inline ? null : 'true',
        onClick: props.onClick,
        onMouseUp: props.onMouseUp
      }, props.ptm('panel', {
        hostName: props.hostName
      }));
      var transitionProps = mergeProps({
        classNames: cx('transition'),
        "in": props["in"],
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: props.onEnter,
        onEntered: props.onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, props.ptm('transition', {
        hostName: props.hostName
      }));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: ref
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: ref
      }, panelProps), props.children));
    };
    var element = createElement();
    return props.inline ? element : /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  });
  CalendarPanel.displayName = 'CalendarPanel';

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  var Calendar = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = CalendarBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      overlayVisibleState = _React$useState4[0],
      setOverlayVisibleState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      viewDateState = _React$useState6[0],
      setViewDateState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(props.id),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      idState = _React$useState8[0],
      setIdState = _React$useState8[1];
    var isCloseOnEscape = overlayVisibleState && props.closeOnEscape;
    var overlayDisplayOrder = hooks.useDisplayOrder('overlay-panel', isCloseOnEscape);
    var metaData = {
      props: props,
      state: {
        focused: focusedState,
        overlayVisible: overlayVisibleState,
        viewDate: viewDateState
      }
    };
    var _CalendarBase$setMeta = CalendarBase.setMetaData(metaData),
      ptm = _CalendarBase$setMeta.ptm,
      cx = _CalendarBase$setMeta.cx,
      isUnstyled = _CalendarBase$setMeta.isUnstyled;
    hooks.useGlobalOnEscapeKey({
      callback: function callback() {
        hide();
      },
      when: overlayVisibleState && overlayDisplayOrder,
      priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.OVERLAY_PANEL, overlayDisplayOrder]
    });
    componentbase.useHandleStyle(CalendarBase.css.styles, isUnstyled, {
      name: 'calendar'
    });
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var navigation = React__namespace.useRef(null);
    var ignoreFocusFunctionality = React__namespace.useRef(false);
    var timePickerTimer = React__namespace.useRef(null);
    var viewStateChanged = React__namespace.useRef(false);
    var touchUIMask = React__namespace.useRef(null);
    var overlayEventListener = React__namespace.useRef(null);
    var touchUIMaskClickListener = React__namespace.useRef(null);
    var isOverlayClicked = React__namespace.useRef(false);
    var previousButton = React__namespace.useRef(false);
    var nextButton = React__namespace.useRef(false);
    var viewChangedWithKeyDown = React__namespace.useRef(false);
    var onChangeRef = React__namespace.useRef(null);
    var isClearClicked = React__namespace.useRef(false);
    var _React$useState9 = React__namespace.useState('date'),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      currentView = _React$useState10[0],
      setCurrentView = _React$useState10[1];
    var _React$useState11 = React__namespace.useState(null),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      currentMonth = _React$useState12[0],
      setCurrentMonth = _React$useState12[1];
    var _React$useState13 = React__namespace.useState(null),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      currentYear = _React$useState14[0],
      setCurrentYear = _React$useState14[1];
    var _React$useState15 = React__namespace.useState([]),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      yearOptions = _React$useState16[0],
      setYearOptions = _React$useState16[1];
    var previousValue = hooks.usePrevious(props.value);
    var visible = props.inline || (props.onVisibleChange ? props.visible : overlayVisibleState);
    var attributeSelector = utils.UniqueComponentId();
    var panelId = idState + '_panel';
    var _useOverlayListener = hooks.useOverlayListener({
        target: elementRef,
        overlay: overlayRef,
        listener: function listener(event, _ref) {
          var type = _ref.type,
            valid = _ref.valid;
          if (valid) {
            type === 'outside' ? !isOverlayClicked.current && !isNavIconClicked(event.target) && hide('outside') : hide();
          }
          isOverlayClicked.current = false;
        },
        when: !(props.touchUI || props.inline) && visible,
        type: 'mousedown'
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var getDateFormat = function getDateFormat() {
      return props.dateFormat || PrimeReact.localeOption('dateFormat', props.locale);
    };
    var onInputFocus = function onInputFocus(event) {
      if (ignoreFocusFunctionality.current) {
        setFocusedState(true);
        ignoreFocusFunctionality.current = false;
      } else {
        if (props.showOnFocus && !visible) {
          show();
        }
        setFocusedState(true);
        props.onFocus && props.onFocus(event);
      }
    };
    var onInputBlur = function onInputBlur(event) {
      updateInputfield(props.value);
      props.onBlur && props.onBlur(event);
      setFocusedState(false);
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          {
            if (!overlayVisibleState) {
              show();
            } else {
              focusToFirstCell();
              event.preventDefault();
            }
            break;
          }
        case 'Escape':
          {
            hide();
            props.touchUI && disableModality();
            break;
          }
        case 'Tab':
          {
            if (overlayRef && overlayRef.current) {
              utils.DomHandler.getFocusableElements(overlayRef.current).forEach(function (el) {
                return el.tabIndex = '-1';
              });
              hide();
              props.touchUI && disableModality();
            }
            break;
          }
      }
    };
    var onUserInput = function onUserInput(event) {
      updateValueOnInput(event, event.target.value);
      props.onInput && props.onInput(event);
    };
    var updateValueOnInput = function updateValueOnInput(event, rawValue, invalidCallback) {
      try {
        var value = parseValueFromString(props.timeOnly ? rawValue.replace('_', '') : rawValue);
        if (isValidSelection(value)) {
          validateDate(value);
          updateModel(event, value);
          var date = value.length ? value[0] : value;
          updateViewDate(event, date);
        }
      } catch (err) {
        //invalid date
        if (invalidCallback) {
          invalidCallback();
        } else {
          var _value = props.keepInvalid ? rawValue : null;
          updateModel(event, _value);
        }
      }
    };
    var onViewDateSelect = function onViewDateSelect(_ref2) {
      var event = _ref2.event,
        date = _ref2.date;
      if (date && props.onSelect) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        onDateSelect(event, {
          day: day,
          month: month,
          year: year,
          selectable: isSelectable(day, month, year)
        }, null, true);
      }
    };
    var reFocusInputField = function reFocusInputField() {
      if (!props.inline && inputRef.current) {
        ignoreFocusFunctionality.current = true;
        utils.DomHandler.focus(inputRef.current);
      }
    };
    var isValidSelection = function isValidSelection(value) {
      var isValid = true;
      if (isSingleSelection()) {
        if (!(isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false) && isSelectableTime(value))) {
          isValid = false;
        }
      } else if (value.every(function (v) {
        return isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false) && isSelectableTime(v);
      })) {
        if (isRangeSelection()) {
          isValid = value.length > 1 && value[1] >= value[0];
        }
      }
      return isValid;
    };
    var onButtonClick = function onButtonClick() {
      visible ? hide() : show();
    };
    var onPrevButtonClick = function onPrevButtonClick(event) {
      navigation.current = {
        backward: true,
        button: true
      };
      navBackward(event);
    };
    var onNextButtonClick = function onNextButtonClick(event) {
      navigation.current = {
        backward: false,
        button: true
      };
      navForward(event);
    };
    var onContainerButtonKeydown = function onContainerButtonKeydown(event) {
      switch (event.code) {
        case 'Tab':
          !props.inline && trapFocus(event);
          break;
        case 'Escape':
          hide(null, reFocusInputField);
          event.preventDefault();
          break;
      }
    };
    var onPickerKeyDown = function onPickerKeyDown(event, type, direction) {
      if (event.key === 'Enter' || event.key === 'Space') {
        onTimePickerElementMouseDown(event, type, direction);
        event.preventDefault();
        return;
      }
      onContainerButtonKeydown(event);
    };
    var onPickerKeyUp = function onPickerKeyUp(event) {
      if (event.key === 'Enter' || event.key === 'Space') {
        onTimePickerElementMouseUp();
        event.preventDefault();
        return;
      }
    };
    var trapFocus = function trapFocus(event) {
      event === null || event === void 0 || event.preventDefault();
      var focusableElements = utils.DomHandler.getFocusableElements(overlayRef.current);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event !== null && event !== void 0 && event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) {
              focusableElements[focusableElements.length - 1].focus();
            } else {
              focusableElements[focusedIndex - 1].focus();
            }
          } else if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) {
            focusableElements[0].focus();
          } else {
            focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    };
    var updateFocus = function updateFocus() {
      if (navigation.current) {
        if (navigation.current.button) {
          initFocusableCell();
          if (navigation.current.backward) {
            previousButton.current.focus();
          } else {
            nextButton.current.focus();
          }
        } else {
          var cell;
          if (navigation.current.backward) {
            var cells = utils.DomHandler.find(overlayRef.current, 'table td span:not([data-p-disabled="true"])');
            cell = cells[cells.length - 1];
          } else {
            cell = utils.DomHandler.findSingle(overlayRef.current, 'table td span:not([data-p-disabled="true"])');
          }
          if (cell) {
            cell.tabIndex = '0';
            cell.focus();
          }
        }
        navigation.current = null;
      } else {
        initFocusableCell();
      }
    };
    var initFocusableCell = function initFocusableCell() {
      var cell;
      if (currentView === 'month') {
        var cells = utils.DomHandler.find(overlayRef.current, '[data-pc-section="monthpicker"] [data-pc-section="month"]');
        var selectedCell = utils.DomHandler.findSingle(overlayRef.current, '[data-pc-section="monthpicker"] [data-pc-section="month"][data-p-highlight="true"]');
        cells.forEach(function (cell) {
          return cell.tabIndex = -1;
        });
        cell = selectedCell || cells[0];
      } else {
        cell = utils.DomHandler.findSingle(overlayRef.current, 'span[data-p-highlight="true"]');
        if (!cell) {
          var todayCell = utils.DomHandler.findSingle(overlayRef.current, 'td.p-datepicker-today span:not(.p-disabled)');
          cell = todayCell || utils.DomHandler.findSingle(overlayRef.current, 'table td span:not([data-p-disabled="true"])');
        }
      }
      if (cell) {
        cell.tabIndex = '0';
      }
    };
    var focusToFirstCell = function focusToFirstCell() {
      if (currentView) {
        var cell;
        if (currentView === 'date') {
          cell = utils.DomHandler.findSingle(overlayRef.current, 'span[data-p-highlight="true"]');
          if (!cell) {
            var todayCell = utils.DomHandler.findSingle(overlayRef.current, 'td.p-datepicker-today span:not(.p-disabled)');
            cell = todayCell || utils.DomHandler.findSingle(overlayRef.current, 'table td span:not([data-p-disabled="true"])');
          }
        } else if (currentView === 'month' || currentView === 'year') {
          cell = utils.DomHandler.findSingle(overlayRef.current, 'span[data-p-highlight="true"]');
          if (!cell) {
            cell = utils.DomHandler.findSingle(overlayRef.current, "[data-pc-section=\"".concat(currentView, "picker\"] [data-pc-section=\"").concat(currentView, "\"]:not([data-p-disabled=\"true\"])"));
          }
        }
        if (cell) {
          cell.tabIndex = '0';
          cell && cell.focus();
        }
      }
    };
    var navBackward = function navBackward(event) {
      if (props.disabled) {
        event.preventDefault();
        return;
      }
      var newViewDate = cloneDate(getViewDate());
      newViewDate.setDate(1);
      if (currentView === 'date') {
        if (newViewDate.getMonth() === 0) {
          var newYear = decrementYear();
          newViewDate.setMonth(11);
          newViewDate.setFullYear(newYear);
          props.onMonthChange && props.onMonthChange({
            month: 11,
            year: newYear
          });
          setCurrentMonth(11);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() - 1);
          props.onMonthChange && props.onMonthChange({
            month: currentMonth - 1,
            year: currentYear
          });
          setCurrentMonth(function (prevState) {
            return prevState - 1;
          });
        }
      } else if (currentView === 'month') {
        var _newYear = newViewDate.getFullYear() - 1;
        if (props.yearNavigator) {
          var minYear = parseInt(props.yearRange.split(':')[0], 10);
          if (_newYear < minYear) {
            _newYear = minYear;
          }
        }
        newViewDate.setFullYear(_newYear);
      }
      if (currentView === 'month') {
        newViewDate.setFullYear(decrementYear());
      } else if (currentView === 'year') {
        newViewDate.setFullYear(decrementDecade());
      }
      updateViewDate(event, newViewDate);
      event.preventDefault();
    };
    var navForward = function navForward(event) {
      if (props.disabled) {
        event.preventDefault();
        return;
      }
      var newViewDate = cloneDate(getViewDate());
      newViewDate.setDate(1);
      if (currentView === 'date') {
        if (newViewDate.getMonth() === 11) {
          var newYear = incrementYear();
          newViewDate.setMonth(0);
          newViewDate.setFullYear(newYear);
          props.onMonthChange && props.onMonthChange({
            month: 0,
            year: newYear
          });
          setCurrentMonth(0);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() + 1);
          props.onMonthChange && props.onMonthChange({
            month: currentMonth + 1,
            year: currentYear
          });
          setCurrentMonth(function (prevState) {
            return prevState + 1;
          });
        }
      } else if (currentView === 'month') {
        var _newYear2 = newViewDate.getFullYear() + 1;
        if (props.yearNavigator) {
          var maxYear = parseInt(props.yearRange.split(':')[1], 10);
          if (_newYear2 > maxYear) {
            _newYear2 = maxYear;
          }
        }
        newViewDate.setFullYear(_newYear2);
      }
      if (currentView === 'month') {
        newViewDate.setFullYear(incrementYear());
      } else if (currentView === 'year') {
        newViewDate.setFullYear(incrementDecade());
      }
      updateViewDate(event, newViewDate);
      event.preventDefault();
    };
    var populateYearOptions = function populateYearOptions(start, end) {
      var _yearOptions = [];
      for (var i = start; i <= end; i++) {
        yearOptions.push(i);
      }
      setYearOptions(_yearOptions);
    };
    var decrementYear = function decrementYear() {
      var year = getViewYear();
      var _currentYear = year - 1;
      setCurrentYear(_currentYear);
      if (props.yearNavigator && _currentYear < yearOptions[0]) {
        var difference = yearOptions[yearOptions.length - 1] - yearOptions[0];
        populateYearOptions(yearOptions[0] - difference, yearOptions[yearOptions.length - 1] - difference);
      }
      return _currentYear;
    };
    var incrementYear = function incrementYear() {
      var year = getViewYear();
      var _currentYear = year + 1;
      setCurrentYear(_currentYear);
      if (props.yearNavigator && _currentYear.current > yearOptions[yearOptions.length - 1]) {
        var difference = yearOptions[yearOptions.length - 1] - yearOptions[0];
        populateYearOptions(yearOptions[0] + difference, yearOptions[yearOptions.length - 1] + difference);
      }
      return _currentYear;
    };
    var onMonthDropdownChange = function onMonthDropdownChange(event, value) {
      var currentViewDate = getViewDate();
      var newViewDate = cloneDate(currentViewDate);
      newViewDate.setDate(1);
      newViewDate.setMonth(parseInt(value, 10));
      updateViewDate(event, newViewDate);
    };
    var onYearDropdownChange = function onYearDropdownChange(event, value) {
      var currentViewDate = getViewDate();
      var newViewDate = cloneDate(currentViewDate);
      newViewDate.setFullYear(parseInt(value, 10));
      updateViewDate(event, newViewDate);
    };
    var onTodayButtonClick = function onTodayButtonClick(event) {
      var today = new Date();
      var dateMeta = {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        today: true,
        selectable: true
      };
      var timeMeta = {
        hours: today.getHours(),
        minutes: today.getMinutes(),
        seconds: today.getSeconds(),
        milliseconds: today.getMilliseconds()
      };
      updateViewDate(event, today);
      onDateSelect(event, dateMeta, timeMeta);
      props.onTodayButtonClick && props.onTodayButtonClick(event);
    };
    var onClearButtonClick = function onClearButtonClick(event) {
      isClearClicked.current = true;
      updateModel(event, null);
      updateInputfield(null);
      setCurrentYear(new Date().getFullYear()); // #7581
      hide();
      props.onClearButtonClick && props.onClearButtonClick(event);
    };
    var onPanelClick = function onPanelClick(event) {
      if (!props.inline) {
        overlayservice.OverlayService.emit('overlay-click', {
          originalEvent: event,
          target: elementRef.current
        });
      }
    };
    var onPanelMouseUp = function onPanelMouseUp(event) {
      onPanelClick(event);
    };
    var onTimePickerElementMouseDown = function onTimePickerElementMouseDown(event, type, direction) {
      if (!props.disabled) {
        _repeat(event, null, type, direction);
        event.preventDefault();
      }
    };
    var onTimePickerElementMouseUp = function onTimePickerElementMouseUp() {
      if (!props.disabled) {
        clearTimePickerTimer();
      }
    };
    var onTimePickerElementMouseLeave = function onTimePickerElementMouseLeave() {
      if (!props.disabled) {
        clearTimePickerTimer();
      }
    };
    var _repeat = function repeat(event, interval, type, direction) {
      clearTimePickerTimer();
      timePickerTimer.current = setTimeout(function () {
        _repeat(event, 100, type, direction);
      }, interval || 500);
      switch (type) {
        case 0:
          if (direction === 1) {
            incrementHour(event);
          } else {
            decrementHour(event);
          }
          break;
        case 1:
          if (direction === 1) {
            incrementMinute(event);
          } else {
            decrementMinute(event);
          }
          break;
        case 2:
          if (direction === 1) {
            incrementSecond(event);
          } else {
            decrementSecond(event);
          }
          break;
        case 3:
          if (direction === 1) {
            incrementMilliSecond(event);
          } else {
            decrementMilliSecond(event);
          }
          break;
      }
    };
    var clearTimePickerTimer = function clearTimePickerTimer() {
      if (timePickerTimer.current) {
        clearTimeout(timePickerTimer.current);
      }
    };
    var roundMinutesToStep = function roundMinutesToStep(minutes) {
      if (props.stepMinute) {
        return Math.round(minutes / props.stepMinute) * props.stepMinute;
      }
      return minutes;
    };
    var incrementHour = function incrementHour(event) {
      var currentTime = getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour + props.stepHour;
      newHour = newHour >= 24 ? newHour - 24 : newHour;
      if (validateHour(newHour, currentTime)) {
        if (props.maxDate && props.maxDate.toDateString() === currentTime.toDateString() && props.maxDate.getHours() === newHour) {
          if (props.maxDate.getMinutes() < currentTime.getMinutes()) {
            if (props.maxDate.getSeconds() < currentTime.getSeconds()) {
              if (props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                updateTime(event, newHour, props.maxDate.getMinutes(), props.maxDate.getSeconds(), props.maxDate.getMilliseconds());
              } else {
                updateTime(event, newHour, props.maxDate.getMinutes(), props.maxDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              updateTime(event, newHour, props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else if (props.maxDate.getMinutes() === currentTime.getMinutes()) {
            if (props.maxDate.getSeconds() < currentTime.getSeconds()) {
              if (props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                updateTime(event, newHour, props.maxDate.getMinutes(), props.maxDate.getSeconds(), props.maxDate.getMilliseconds());
              } else {
                updateTime(event, newHour, props.maxDate.getMinutes(), props.maxDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              updateTime(event, newHour, props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            updateTime(event, newHour, roundMinutesToStep(currentTime.getMinutes()), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, newHour, roundMinutesToStep(currentTime.getMinutes()), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var decrementHour = function decrementHour(event) {
      var currentTime = getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour - props.stepHour;
      newHour = newHour < 0 ? newHour + 24 : newHour;
      if (validateHour(newHour, currentTime)) {
        if (props.minDate && props.minDate.toDateString() === currentTime.toDateString() && props.minDate.getHours() === newHour) {
          if (props.minDate.getMinutes() > currentTime.getMinutes()) {
            if (props.minDate.getSeconds() > currentTime.getSeconds()) {
              if (props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                updateTime(event, newHour, props.minDate.getMinutes(), props.minDate.getSeconds(), props.minDate.getMilliseconds());
              } else {
                updateTime(event, newHour, props.minDate.getMinutes(), props.minDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              updateTime(event, newHour, props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else if (props.minDate.getMinutes() === currentTime.getMinutes()) {
            if (props.minDate.getSeconds() > currentTime.getSeconds()) {
              if (props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                updateTime(event, newHour, props.minDate.getMinutes(), props.minDate.getSeconds(), props.minDate.getMilliseconds());
              } else {
                updateTime(event, newHour, props.minDate.getMinutes(), props.minDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              updateTime(event, newHour, props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            updateTime(event, newHour, roundMinutesToStep(currentTime.getMinutes()), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, newHour, roundMinutesToStep(currentTime.getMinutes()), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var doStepMinute = function doStepMinute(currentMinute, step) {
      if (props.stepMinute <= 1) {
        return step ? currentMinute + step : currentMinute;
      }
      if (!step) {
        step = props.stepMinute;
        if (currentMinute % step === 0) {
          return currentMinute;
        }
      }
      return Math.floor((currentMinute + step) / step) * step;
    };
    var incrementMinute = function incrementMinute(event) {
      var currentTime = getCurrentDateTime();
      var currentMinute = currentTime.getMinutes();
      var newMinute = doStepMinute(currentMinute, props.stepMinute);
      newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
      if (validateMinute(newMinute, currentTime)) {
        if (props.maxDate && props.maxDate.toDateString() === currentTime.toDateString() && props.maxDate.getMinutes() === newMinute) {
          if (props.maxDate.getSeconds() < currentTime.getSeconds()) {
            if (props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
              updateTime(event, currentTime.getHours(), newMinute, props.maxDate.getSeconds(), props.maxDate.getMilliseconds());
            } else {
              updateTime(event, currentTime.getHours(), newMinute, props.maxDate.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var decrementMinute = function decrementMinute(event) {
      var currentTime = getCurrentDateTime();
      var currentMinute = currentTime.getMinutes();
      var newMinute = doStepMinute(currentMinute, -props.stepMinute);
      newMinute = newMinute < 0 ? newMinute + 60 : newMinute;
      if (validateMinute(newMinute, currentTime)) {
        if (props.minDate && props.minDate.toDateString() === currentTime.toDateString() && props.minDate.getMinutes() === newMinute) {
          if (props.minDate.getSeconds() > currentTime.getSeconds()) {
            if (props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
              updateTime(event, currentTime.getHours(), newMinute, props.minDate.getSeconds(), props.minDate.getMilliseconds());
            } else {
              updateTime(event, currentTime.getHours(), newMinute, props.minDate.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var incrementSecond = function incrementSecond(event) {
      var currentTime = getCurrentDateTime();
      var currentSecond = currentTime.getSeconds();
      var newSecond = currentSecond + props.stepSecond;
      newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
      if (validateSecond(newSecond, currentTime)) {
        if (props.maxDate && props.maxDate.toDateString() === currentTime.toDateString() && props.maxDate.getSeconds() === newSecond) {
          if (props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
            updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, props.maxDate.getMilliseconds());
          } else {
            updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var decrementSecond = function decrementSecond(event) {
      var currentTime = getCurrentDateTime();
      var currentSecond = currentTime.getSeconds();
      var newSecond = currentSecond - props.stepSecond;
      newSecond = newSecond < 0 ? newSecond + 60 : newSecond;
      if (validateSecond(newSecond, currentTime)) {
        if (props.minDate && props.minDate.toDateString() === currentTime.toDateString() && props.minDate.getSeconds() === newSecond) {
          if (props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
            updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, props.minDate.getMilliseconds());
          } else {
            updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
        }
      }
      event.preventDefault();
    };
    var incrementMilliSecond = function incrementMilliSecond(event) {
      var currentTime = getCurrentDateTime();
      var currentMillisecond = currentTime.getMilliseconds();
      var newMillisecond = currentMillisecond + props.stepMillisec;
      newMillisecond = newMillisecond > 999 ? newMillisecond - 1000 : newMillisecond;
      if (validateMillisecond(newMillisecond, currentTime)) {
        updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
      }
      event.preventDefault();
    };
    var decrementMilliSecond = function decrementMilliSecond(event) {
      var currentTime = getCurrentDateTime();
      var currentMillisecond = currentTime.getMilliseconds();
      var newMillisecond = currentMillisecond - props.stepMillisec;
      newMillisecond = newMillisecond < 0 ? newMillisecond + 999 : newMillisecond;
      if (validateMillisecond(newMillisecond, currentTime)) {
        updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
      }
      event.preventDefault();
    };
    var toggleAmPm = function toggleAmPm(event) {
      var currentTime = getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour >= 12 ? currentHour - 12 : currentHour + 12;
      if (validateHour(convertTo24Hour(newHour, currentHour > 11), currentTime)) {
        updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      }
      event.preventDefault();
    };
    var getViewDate = function getViewDate(date) {
      var propValue = props.value;
      var viewDate = date || (props.onViewDateChange ? props.viewDate : viewDateState);
      if (Array.isArray(propValue)) {
        propValue = propValue[0];
      }
      return viewDate && isValidDate(viewDate) ? viewDate : propValue && isValidDate(propValue) ? propValue : new Date();
    };
    var getCurrentDateTime = function getCurrentDateTime() {
      if (isSingleSelection()) {
        return props.value && props.value instanceof Date ? cloneDate(props.value) : getViewDate();
      } else if (isMultipleSelection()) {
        if (props.value && props.value.length) {
          return cloneDate(props.value[props.value.length - 1]);
        }
      } else if (isRangeSelection()) {
        if (props.value && props.value.length) {
          var startDate = cloneDate(props.value[0]);
          var endDate = cloneDate(props.value[1]);
          return endDate || startDate;
        }
      }
      return new Date();
    };
    var cloneDate = function cloneDate(date) {
      return isValidDate(date) ? new Date(date.valueOf()) : date;
    };
    var isValidDate = function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    };
    var convertTo24Hour = function convertTo24Hour(hour, pm) {
      if (props.hourFormat === '12') {
        return hour === 12 ? pm ? 12 : 0 : pm ? hour + 12 : hour;
      }
      return hour;
    };
    var validateHour = function validateHour(hour, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;
      if (props.minDate && valueDateString && props.minDate.toDateString() === valueDateString) {
        if (props.minDate.getHours() > hour) {
          valid = false;
        }
      }
      if (props.maxDate && valueDateString && props.maxDate.toDateString() === valueDateString) {
        if (props.maxDate.getHours() < hour) {
          valid = false;
        }
      }
      return valid;
    };
    var validateMinute = function validateMinute(minute, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;
      if (props.minDate && valueDateString && props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === props.minDate.getHours()) {
          if (props.minDate.getMinutes() > minute) {
            valid = false;
          }
        }
      }
      if (props.maxDate && valueDateString && props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === props.maxDate.getHours()) {
          if (props.maxDate.getMinutes() < minute) {
            valid = false;
          }
        }
      }
      return valid;
    };
    var validateSecond = function validateSecond(second, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;
      if (props.minDate && valueDateString && props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === props.minDate.getHours() && value.getMinutes() === props.minDate.getMinutes()) {
          if (props.minDate.getSeconds() > second) {
            valid = false;
          }
        }
      }
      if (props.maxDate && valueDateString && props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === props.maxDate.getHours() && value.getMinutes() === props.maxDate.getMinutes()) {
          if (props.maxDate.getSeconds() < second) {
            valid = false;
          }
        }
      }
      return valid;
    };
    var validateMillisecond = function validateMillisecond(millisecond, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;
      if (props.minDate && valueDateString && props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === props.minDate.getHours() && value.getSeconds() === props.minDate.getSeconds() && value.getMinutes() === props.minDate.getMinutes()) {
          if (props.minDate.getMilliseconds() > millisecond) {
            valid = false;
          }
        }
      }
      if (props.maxDate && valueDateString && props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === props.maxDate.getHours() && value.getSeconds() === props.maxDate.getSeconds() && value.getMinutes() === props.maxDate.getMinutes()) {
          if (props.maxDate.getMilliseconds() < millisecond) {
            valid = false;
          }
        }
      }
      return valid;
    };
    var validateDate = function validateDate(value) {
      if (props.yearNavigator) {
        var _ref3 = props.yearRange ? props.yearRange.split(':').map(function (year) {
            return parseInt(year, 10);
          }) : [null, null],
          _ref4 = _slicedToArray(_ref3, 2),
          minRangeYear = _ref4[0],
          maxRangeYear = _ref4[1];
        var viewYear = value.getFullYear();
        var minYear = null;
        var maxYear = null;
        if (minRangeYear !== null) {
          minYear = props.minDate ? Math.max(props.minDate.getFullYear(), minRangeYear) : minRangeYear;
        } else {
          var _props$minDate;
          minYear = ((_props$minDate = props.minDate) === null || _props$minDate === void 0 ? void 0 : _props$minDate.getFullYear()) || minRangeYear;
        }
        if (maxRangeYear !== null) {
          maxYear = props.maxDate ? Math.min(props.maxDate.getFullYear(), maxRangeYear) : maxRangeYear;
        } else {
          var _props$maxDate;
          maxYear = ((_props$maxDate = props.maxDate) === null || _props$maxDate === void 0 ? void 0 : _props$maxDate.getFullYear()) || maxRangeYear;
        }
        if (minYear && minYear > viewYear) viewYear = minYear;
        if (maxYear && maxYear < viewYear) viewYear = maxYear;
        value.setFullYear(viewYear);
      }
      if (renderMonthsNavigator(0)) {
        var viewMonth = value.getMonth();
        var viewMonthWithMinMax = parseInt(isInMinYear(value) && Math.max(props.minDate.getMonth(), viewMonth).toString() || isInMaxYear(value) && Math.min(props.maxDate.getMonth(), viewMonth).toString() || viewMonth);
        value.setMonth(viewMonthWithMinMax);
      }
    };
    var updateTime = function updateTime(event, hour, minute, second, millisecond) {
      var newDateTime = getCurrentDateTime();
      newDateTime.setHours(hour);
      newDateTime.setMinutes(minute);
      newDateTime.setSeconds(second);
      newDateTime.setMilliseconds(millisecond);
      if (isMultipleSelection()) {
        if (props.value && props.value.length) {
          var value = _toConsumableArray(props.value);
          value[value.length - 1] = newDateTime;
          newDateTime = value;
        } else {
          newDateTime = [newDateTime];
        }
      } else if (isRangeSelection()) {
        if (props.value && props.value.length) {
          var startDate = props.value[0];
          var endDate = props.value[1];
          newDateTime = endDate ? [startDate, newDateTime] : [newDateTime, null];
        } else {
          newDateTime = [newDateTime, null];
        }
      }
      updateModel(event, newDateTime);
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          value: newDateTime
        });
      }
      updateInputfield(newDateTime);
    };
    var updateViewDate = function updateViewDate(event, value) {
      validateDate(value);
      if (props.onViewDateChange && event) {
        props.onViewDateChange({
          originalEvent: event,
          value: value
        });
      } else {
        viewStateChanged.current = true;
        setViewDateState(value);
      }
      if (!value) onClearButtonClick(event);
    };
    var setNavigationState = function setNavigationState(newViewDate) {
      if (!newViewDate || !props.showMinMaxRange || props.view !== 'date' || !overlayRef.current) {
        return;
      }
      var navPrev = utils.DomHandler.findSingle(overlayRef.current, '[data-pc-section="previousbutton"]');
      var navNext = utils.DomHandler.findSingle(overlayRef.current, '[data-pc-section="nextbutton"]');
      if (props.disabled) {
        !isUnstyled() && utils.DomHandler.addClass(navPrev, 'p-disabled');
        navPrev.setAttribute('data-p-disabled', true);
        !isUnstyled() && utils.DomHandler.addClass(navNext, 'p-disabled');
        navNext.setAttribute('data-p-disabled', true);
        return;
      }

      // previous (check first day of month at 00:00:00)
      if (props.minDate) {
        var firstDayOfMonth = cloneDate(newViewDate);
        if (firstDayOfMonth.getMonth() === 0) {
          firstDayOfMonth.setMonth(11, 1);
          firstDayOfMonth.setFullYear(firstDayOfMonth.getFullYear() - 1);
        } else {
          firstDayOfMonth.setMonth(firstDayOfMonth.getMonth(), 1);
        }
        firstDayOfMonth.setHours(0);
        firstDayOfMonth.setMinutes(0);
        firstDayOfMonth.setSeconds(0);
        if (props.minDate > firstDayOfMonth) {
          utils.DomHandler.addClass(navPrev, 'p-disabled');
        } else {
          utils.DomHandler.removeClass(navPrev, 'p-disabled');
        }
      }

      // next (check last day of month at 11:59:59)
      if (props.maxDate) {
        var lastDayOfMonth = cloneDate(newViewDate);
        if (lastDayOfMonth.getMonth() === 11) {
          lastDayOfMonth.setMonth(0, 1);
          lastDayOfMonth.setFullYear(lastDayOfMonth.getFullYear() + 1);
        } else {
          lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1, 1);
        }
        lastDayOfMonth.setHours(0);
        lastDayOfMonth.setMinutes(0);
        lastDayOfMonth.setSeconds(0);
        lastDayOfMonth.setSeconds(-1);
        if (props.maxDate < lastDayOfMonth) {
          utils.DomHandler.addClass(navNext, 'p-disabled');
        } else {
          utils.DomHandler.removeClass(navNext, 'p-disabled');
        }
      }
    };
    var onDateCellKeydown = function onDateCellKeydown(event, date, groupIndex) {
      var cellContent = event.currentTarget;
      var cell = cellContent.parentElement;
      var cellIndex = utils.DomHandler.index(cell);
      switch (event.code) {
        case 'ArrowDown':
          {
            cellContent.tabIndex = '-1';
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
              var tableRowIndex = utils.DomHandler.index(cell.parentElement);
              var tableRows = Array.from(cell.parentElement.parentElement.children);
              var nextTableRows = tableRows.slice(tableRowIndex + 1);
              var hasNextFocusableDate = nextTableRows.find(function (el) {
                var focusCell = el.children[cellIndex].children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (hasNextFocusableDate) {
                var focusCell = hasNextFocusableDate.children[cellIndex].children[0];
                focusCell.tabIndex = '0';
                focusCell.focus();
              } else {
                navigation.current = {
                  backward: false
                };
                navForward(event);
              }
            } else {
              navigation.current = {
                backward: false
              };
              navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
          {
            cellContent.tabIndex = '-1';
            if (event.altKey) {
              hide(null, reFocusInputField);
            } else {
              var prevRow = cell.parentElement.previousElementSibling;
              if (prevRow) {
                var _tableRowIndex = utils.DomHandler.index(cell.parentElement);
                var _tableRows = Array.from(cell.parentElement.parentElement.children);
                var prevTableRows = _tableRows.slice(0, _tableRowIndex).reverse();
                var _hasNextFocusableDate = prevTableRows.find(function (el) {
                  var focusCell = el.children[cellIndex].children[0];
                  return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
                });
                if (_hasNextFocusableDate) {
                  var _focusCell = _hasNextFocusableDate.children[cellIndex].children[0];
                  _focusCell.tabIndex = '0';
                  _focusCell.focus();
                } else {
                  navigation.current = {
                    backward: true
                  };
                  navBackward(event);
                }
              } else {
                navigation.current = {
                  backward: true
                };
                navBackward(event);
              }
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cellContent.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              var cells = Array.from(cell.parentElement.children);
              var prevCells = cells.slice(0, cellIndex).reverse();
              var _hasNextFocusableDate2 = prevCells.find(function (el) {
                var focusCell = el.children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (_hasNextFocusableDate2) {
                var _focusCell2 = _hasNextFocusableDate2.children[0];
                _focusCell2.tabIndex = '0';
                _focusCell2.focus();
              } else {
                navigateToMonth(true, groupIndex, event);
              }
            } else {
              navigateToMonth(true, groupIndex, event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cellContent.tabIndex = '-1';
            var nextCell = cell.nextElementSibling;
            if (nextCell) {
              var _cells = Array.from(cell.parentElement.children);
              var nextCells = _cells.slice(cellIndex + 1);
              var _hasNextFocusableDate3 = nextCells.find(function (el) {
                var focusCell = el.children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (_hasNextFocusableDate3) {
                var _focusCell3 = _hasNextFocusableDate3.children[0];
                _focusCell3.tabIndex = '0';
                _focusCell3.focus();
              } else {
                navigateToMonth(false, groupIndex, event);
              }
            } else {
              navigateToMonth(false, groupIndex, event);
            }
            event.preventDefault();
            break;
          }
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          {
            onDateSelect(event, date);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            hide(null, reFocusInputField);
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            if (!props.inline) {
              trapFocus(event);
            }
            break;
          }
        case 'Home':
          {
            cellContent.tabIndex = '-1';
            var currentRow = cell.parentElement;
            var _focusCell4 = currentRow.children[0].children[0];
            if (utils.DomHandler.getAttribute(_focusCell4, 'data-p-disabled')) {
              navigateToMonth(groupIndex, true, event);
            } else {
              _focusCell4.tabIndex = '0';
              _focusCell4.focus();
            }
            event.preventDefault();
            break;
          }
        case 'End':
          {
            cellContent.tabIndex = '-1';
            var _currentRow = cell.parentElement;
            var _focusCell5 = _currentRow.children[_currentRow.children.length - 1].children[0];
            if (utils.DomHandler.getAttribute(_focusCell5, 'data-p-disabled')) {
              navigateToMonth(groupIndex, false, event);
            } else {
              _focusCell5.tabIndex = '0';
              _focusCell5.focus();
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            cellContent.tabIndex = '-1';
            if (event.shiftKey) {
              navigation.current = {
                backward: true
              };
              navBackward(event);
            } else {
              navigateToMonth(groupIndex, true, event);
            }
            event.preventDefault();
            break;
          }
        case 'PageDown':
          {
            cellContent.tabIndex = '-1';
            if (event.shiftKey) {
              navigation.current = {
                backward: false
              };
              navForward(event);
            } else {
              navigateToMonth(groupIndex, false, event);
            }
            event.preventDefault();
            break;
          }
      }
    };
    var navigateToMonth = function navigateToMonth(prev, groupIndex, event) {
      if (prev) {
        if (props.numberOfMonths === 1 || groupIndex === 0) {
          navigation.current = {
            backward: true
          };
          navBackward(event);
        } else {
          var prevMonthContainer = overlayRef.current.children[0].children[groupIndex - 1];
          var cells = utils.DomHandler.find(prevMonthContainer, 'table td span:not([data-p-disabled="true"])');
          var focusCell = cells[cells.length - 1];
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      } else if (props.numberOfMonths === 1 || groupIndex === props.numberOfMonths - 1) {
        navigation.current = {
          backward: false
        };
        navForward(event);
      } else {
        var nextMonthContainer = overlayRef.current.children[0].children[groupIndex + 1];
        var _focusCell6 = utils.DomHandler.findSingle(nextMonthContainer, 'table td span:not([data-p-disabled="true"])');
        _focusCell6.tabIndex = '0';
        _focusCell6.focus();
      }
    };
    var onMonthCellKeydown = function onMonthCellKeydown(event, index) {
      var cell = event.currentTarget;
      switch (event.code) {
        //arrows
        case 'ArrowUp':
        case 'ArrowDown':
          {
            cell.tabIndex = '-1';
            var cells = cell.parentElement.children;
            var cellIndex = utils.DomHandler.index(cell);
            var nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
            if (nextCell) {
              nextCell.tabIndex = '0';
              nextCell.focus();
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cell.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              prevCell.tabIndex = '0';
              prevCell.focus();
            } else {
              navigation.current = {
                backward: true
              };
              navBackward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cell.tabIndex = '-1';
            var _nextCell = cell.nextElementSibling;
            if (_nextCell) {
              _nextCell.tabIndex = '0';
              _nextCell.focus();
            } else {
              navigation.current = {
                backward: false
              };
              navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            if (event.shiftKey) {
              return;
            }
            navigation.current = {
              backward: true
            };
            navBackward(event);
            break;
          }
        case 'PageDown':
          {
            if (event.shiftKey) {
              return;
            }
            navigation.current = {
              backward: false
            };
            navForward(event);
            break;
          }
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          {
            if (props.view !== 'month') {
              viewChangedWithKeyDown.current = true;
            }
            onMonthSelect(event, index);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            hide(null, reFocusInputField);
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            trapFocus(event);
            break;
          }
      }
    };
    var onYearCellKeydown = function onYearCellKeydown(event, index) {
      var cell = event.currentTarget;
      switch (event.code) {
        //arrows
        case 'ArrowUp':
        case 'ArrowDown':
          {
            cell.tabIndex = '-1';
            var cells = cell.parentElement.children;
            var cellIndex = utils.DomHandler.index(cell);
            var nextCell = cells[event.code === 'ArrowDown' ? cellIndex + 2 : cellIndex - 2];
            if (nextCell) {
              nextCell.tabIndex = '0';
              nextCell.focus();
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cell.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              prevCell.tabIndex = '0';
              prevCell.focus();
            } else {
              navigation.current = {
                backward: true
              };
              navBackward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cell.tabIndex = '-1';
            var _nextCell2 = cell.nextElementSibling;
            if (_nextCell2) {
              _nextCell2.tabIndex = '0';
              _nextCell2.focus();
            } else {
              navigation.current = {
                backward: false
              };
              navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            if (event.shiftKey) {
              return;
            }
            navigation.current = {
              backward: true
            };
            navBackward(event);
            break;
          }
        case 'PageDown':
          {
            if (event.shiftKey) {
              return;
            }
            navigation.current = {
              backward: false
            };
            navForward(event);
            break;
          }
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          {
            if (props.view !== 'year') {
              viewChangedWithKeyDown.current = true;
            }
            onYearSelect(event, index);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            hide(null, reFocusInputField);
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            trapFocus(event);
            break;
          }
      }
    };
    var onDateSelect = function onDateSelect(event, dateMeta, timeMeta, isUpdateViewDate) {
      if (!event) {
        return;
      }
      if (props.disabled || !dateMeta.selectable) {
        event.preventDefault();
        return;
      }
      utils.DomHandler.find(overlayRef.current, 'table td span:not([data-p-disabled="true"])').forEach(function (cell) {
        return cell.tabIndex = -1;
      });
      event.currentTarget.focus();
      if (isMultipleSelection()) {
        if (isSelected(dateMeta)) {
          var value = props.value.filter(function (date) {
            return !isDateEquals(date, dateMeta);
          });
          updateModel(event, value);
          updateInputfield(value);
        } else if (!props.maxDateCount || !props.value || props.maxDateCount > props.value.length) {
          selectDate(event, dateMeta, timeMeta);
        }
      } else {
        selectDate(event, dateMeta, timeMeta);
      }
      if (!props.inline && isSingleSelection() && (!props.showTime || props.hideOnDateTimeSelect) && !isUpdateViewDate) {
        setTimeout(function () {
          hide('dateselect');
          reFocusInputField();
        }, 100);
        if (touchUIMask.current) {
          disableModality();
        }
      }
      event.preventDefault();
    };
    var selectTime = function selectTime(date, timeMeta) {
      if (props.showTime) {
        var hours;
        var minutes;
        var seconds;
        var milliseconds;
        if (timeMeta) {
          hours = timeMeta.hours;
          minutes = timeMeta.minutes;
          seconds = timeMeta.seconds;
          milliseconds = timeMeta.milliseconds;
        } else {
          var time = getCurrentDateTime();
          var _ref5 = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()];
          hours = _ref5[0];
          minutes = _ref5[1];
          seconds = _ref5[2];
          milliseconds = _ref5[3];
        }
        date.setHours(hours);
        date.setMinutes(doStepMinute(minutes));
        date.setSeconds(seconds);
        date.setMilliseconds(milliseconds);
      }
    };
    var selectDate = function selectDate(event, dateMeta, timeMeta) {
      var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      selectTime(date, timeMeta);
      if (props.minDate && props.minDate > date) {
        date = props.minDate;
      }
      if (props.maxDate && props.maxDate < date) {
        date = props.maxDate;
      }
      var selectedValues = date;
      if (isSingleSelection()) {
        updateModel(event, date);
      } else if (isMultipleSelection()) {
        selectedValues = props.value ? [].concat(_toConsumableArray(props.value), [date]) : [date];
        updateModel(event, selectedValues);
      } else if (isRangeSelection()) {
        if (props.value && props.value.length) {
          var startDate = props.value[0];
          var endDate = props.value[1];
          if (!endDate) {
            if (date.getTime() >= startDate.getTime()) {
              endDate = date;
            } else {
              endDate = startDate;
              startDate = date;
            }
          } else {
            startDate = date;
            endDate = null;
          }
          selectedValues = [startDate, endDate];
          updateModel(event, selectedValues);
          if (props.hideOnRangeSelection && endDate !== null) {
            setTimeout(function () {
              setOverlayVisibleState(false);
            }, 150);
          }
        } else {
          selectedValues = [date, null];
          updateModel(event, selectedValues);
        }
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          value: date
        });
      }
      updateInputfield(selectedValues);
    };
    var decrementDecade = function decrementDecade() {
      var _currentYear = currentYear - 10;
      setCurrentYear(_currentYear);
      return _currentYear;
    };
    var incrementDecade = function incrementDecade() {
      var _currentYear = currentYear + 10;
      setCurrentYear(_currentYear);
      return _currentYear;
    };
    var switchToMonthView = function switchToMonthView(event) {
      if (event && event.code && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space')) {
        viewChangedWithKeyDown.current = true;
      }
      setCurrentView('month');
      event.preventDefault();
    };
    var switchToYearView = function switchToYearView(event) {
      if (event && event.code && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space')) {
        viewChangedWithKeyDown.current = true;
      }
      setCurrentView('year');
      event.preventDefault();
    };
    var onMonthSelect = function onMonthSelect(event, month) {
      if (props.view === 'month') {
        var year = getViewYear();
        onDateSelect(event, {
          year: year,
          month: month,
          day: 1,
          selectable: true
        });
        event.preventDefault();
      } else {
        setCurrentMonth(month);
        createMonthsMeta(month, currentYear);
        var currentDate = cloneDate(getCurrentDateTime());
        currentDate.setDate(1); // #2948 always set to 1st of month
        currentDate.setMonth(month);
        currentDate.setYear(currentYear);
        setViewDateState(currentDate);
        setCurrentView('date');
        props.onMonthChange && props.onMonthChange({
          month: month + 1,
          year: currentYear
        });
        updateViewDate(event, currentDate);
        onViewDateSelect({
          event: event,
          date: currentDate
        });
      }
    };
    var getViewYear = function getViewYear() {
      return props.yearNavigator ? getViewDate().getFullYear() : currentYear;
    };
    var onYearSelect = function onYearSelect(event, year) {
      if (props.view === 'year') {
        onDateSelect(event, {
          year: year,
          month: 0,
          day: 1,
          selectable: true
        });
      } else {
        setCurrentYear(year);
        setCurrentView('month');
        props.onMonthChange && props.onMonthChange({
          month: currentMonth + 1,
          year: year
        });
      }
    };
    var updateModel = function updateModel(event, value) {
      if (props.onChange) {
        var newValue = cloneDate(value);
        viewStateChanged.current = true;
        onChangeRef.current({
          originalEvent: event,
          value: newValue,
          stopPropagation: function stopPropagation() {
            event === null || event === void 0 || event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event === null || event === void 0 || event.preventDefault();
          },
          target: {
            name: props.name,
            id: props.id,
            value: newValue
          }
        });
      }
    };
    var show = function show(type) {
      if (props.onVisibleChange) {
        props.onVisibleChange({
          visible: true,
          type: type
        });
      } else {
        setOverlayVisibleState(true);
        overlayEventListener.current = function (e) {
          if (!isOutsideClicked(e) && visible) {
            isOverlayClicked.current = true;
          }
        };
        overlayservice.OverlayService.on('overlay-click', overlayEventListener.current);
      }
    };
    var hide = function hide(type, callback) {
      var _hideCallback = function _hideCallback() {
        viewStateChanged.current = false;
        ignoreFocusFunctionality.current = false;
        isOverlayClicked.current = false;
        callback && callback();
        overlayservice.OverlayService.off('overlay-click', overlayEventListener.current);
        overlayEventListener.current = null;
      };
      props.touchUI && disableModality();
      if (props.onVisibleChange) {
        props.onVisibleChange({
          visible: type !== 'dateselect',
          // false only if selecting a value to close panel
          type: type,
          callback: _hideCallback
        });
      } else {
        setOverlayVisibleState(false);
        _hideCallback();
      }
    };
    var onOverlayEnter = function onOverlayEnter() {
      var styles = props.touchUI ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      } : !props.inline ? {
        position: 'absolute',
        top: '0',
        left: '0'
      } : undefined;
      utils.DomHandler.addStyles(overlayRef.current, styles);
      if (props.autoZIndex) {
        var key = props.touchUI ? 'modal' : 'overlay';
        utils.ZIndexUtils.set(key, overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, props.baseZIndex || context && context.zIndex[key] || PrimeReact__default["default"].zIndex[key]);
      }
      if (!props.touchUI && overlayRef && overlayRef.current && inputRef && inputRef.current && !appendDisabled()) {
        var inputWidth = utils.DomHandler.getOuterWidth(inputRef.current);

        // #5435 must have reasonable width if input is too small
        if (inputWidth < 220) {
          inputWidth = 220;
        }
        if (props.view === 'date') {
          overlayRef.current.style.width = utils.DomHandler.getOuterWidth(overlayRef.current) + 'px';
        } else {
          overlayRef.current.style.width = inputWidth + 'px';
        }

        // #5830 Tailwind does not need a min width it breaks the styling
        if (!isUnstyled()) {
          overlayRef.current.style.minWidth = inputWidth + 'px';
        }
      }
      alignOverlay();
    };
    var onOverlayEntered = function onOverlayEntered() {
      bindOverlayListener();
      props.onShow && props.onShow();
      setFocusedState(false);
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var appendDisabled = function appendDisabled() {
      var appendTo = props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo;
      return appendTo === 'self' || props.inline;
    };
    var alignOverlay = function alignOverlay() {
      if (props.touchUI) {
        enableModality();
      } else if (overlayRef && overlayRef.current && inputRef && inputRef.current) {
        utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
        if (appendDisabled()) {
          utils.DomHandler.relativePosition(overlayRef.current, inputRef.current);
        } else {
          utils.DomHandler.absolutePosition(overlayRef.current, inputRef.current);
        }
      }

      // #6093 Forcibly remove minWidth when in unstyled mode
      if (isUnstyled()) {
        overlayRef.current.style.minWidth = '';
      }
    };
    var enableModality = function enableModality() {
      if (!touchUIMask.current) {
        touchUIMask.current = document.createElement('div');
        touchUIMask.current.style.zIndex = String(utils.ZIndexUtils.get(overlayRef.current) - 1);
        !isUnstyled() && utils.DomHandler.addMultipleClasses(touchUIMask.current, 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay-enter');
        touchUIMaskClickListener.current = function () {
          disableModality();
          hide();
        };
        touchUIMask.current.addEventListener('click', touchUIMaskClickListener.current);
        document.body.appendChild(touchUIMask.current);
        utils.DomHandler.blockBodyScroll();
      }
    };
    var disableModality = function disableModality() {
      if (touchUIMask.current) {
        if (isUnstyled) {
          destroyMask();
        } else {
          !isUnstyled() && utils.DomHandler.addClass(touchUIMask.current, 'p-component-overlay-leave');
          if (utils.DomHandler.hasCSSAnimation(touchUIMask.current) > 0) {
            touchUIMask.current.addEventListener('animationend', function () {
              destroyMask();
            });
          } else {
            destroyMask();
          }
        }
      }
    };
    var destroyMask = function destroyMask() {
      if (touchUIMask.current) {
        touchUIMask.current.removeEventListener('click', touchUIMaskClickListener.current);
        touchUIMaskClickListener.current = null;
        document.body.removeChild(touchUIMask.current);
        touchUIMask.current = null;
      }
      var bodyChildren = document.body.children;
      var hasBlockerMasks;
      for (var i = 0; i < bodyChildren.length; i++) {
        var bodyChild = bodyChildren[i];
        if (utils.DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
          hasBlockerMasks = true;
          break;
        }
      }
      if (!hasBlockerMasks) {
        utils.DomHandler.unblockBodyScroll();
      }
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return elementRef.current && !(elementRef.current.isSameNode(event.target) || isNavIconClicked(event.target) || elementRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
    };
    var isNavIconClicked = function isNavIconClicked(target) {
      return previousButton.current && (previousButton.current.isSameNode(target) || previousButton.current.contains(target)) || nextButton.current && (nextButton.current.isSameNode(target) || nextButton.current.contains(target));
    };
    var getFirstDayOfMonthIndex = function getFirstDayOfMonthIndex(month, year) {
      var day = new Date();
      day.setDate(1);
      day.setMonth(month);
      day.setFullYear(year);
      var dayIndex = day.getDay() + getSundayIndex();
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    };
    var getDaysCountInMonth = function getDaysCountInMonth(month, year) {
      return 32 - daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };
    var getDaysCountInPrevMonth = function getDaysCountInPrevMonth(month, year) {
      var prev = getPreviousMonthAndYear(month, year);
      return getDaysCountInMonth(prev.month, prev.year);
    };
    var daylightSavingAdjust = function daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    };
    var getPreviousMonthAndYear = function getPreviousMonthAndYear(month, year) {
      var m;
      var y;
      if (month === 0) {
        m = 11;
        y = year - 1;
      } else {
        m = month - 1;
        y = year;
      }
      return {
        month: m,
        year: y
      };
    };
    var getNextMonthAndYear = function getNextMonthAndYear(month, year) {
      var m;
      var y;
      if (month === 11) {
        m = 0;
        y = year + 1;
      } else {
        m = month + 1;
        y = year;
      }
      return {
        month: m,
        year: y
      };
    };
    var getSundayIndex = function getSundayIndex() {
      var firstDayOfWeek = PrimeReact.localeOption('firstDayOfWeek', props.locale);
      return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    };
    var createWeekDaysMeta = function createWeekDaysMeta() {
      var weekDays = [];
      var _localeOptions = PrimeReact.localeOptions(props.locale),
        dayIndex = _localeOptions.firstDayOfWeek,
        dayNamesMin = _localeOptions.dayNamesMin;
      for (var i = 0; i < 7; i++) {
        weekDays.push(dayNamesMin[dayIndex]);
        dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
      }
      return weekDays;
    };
    var createMonthsMeta = function createMonthsMeta(month, year) {
      var months = [];
      for (var i = 0; i < props.numberOfMonths; i++) {
        var m = month + i;
        var y = year;
        if (m > 11) {
          m = m % 11 - 1;
          y = year + 1;
        }
        months.push(createMonthMeta(m, y));
      }
      return months;
    };
    var createMonthMeta = function createMonthMeta(month, year) {
      var dates = [];
      var firstDay = getFirstDayOfMonthIndex(month, year);
      var daysLength = getDaysCountInMonth(month, year);
      var prevMonthDaysLength = getDaysCountInPrevMonth(month, year);
      var dayNo = 1;
      var today = new Date();
      var weekNumbers = [];
      var monthRows = Math.ceil((daysLength + firstDay) / 7);
      for (var i = 0; i < monthRows; i++) {
        var week = [];
        if (i === 0) {
          for (var j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
            var prev = getPreviousMonthAndYear(month, year);
            week.push({
              day: j,
              month: prev.month,
              year: prev.year,
              otherMonth: true,
              today: isToday(today, j, prev.month, prev.year),
              selectable: isSelectable(j, prev.month, prev.year, true)
            });
          }
          var remainingDaysLength = 7 - week.length;
          for (var _j = 0; _j < remainingDaysLength; _j++) {
            week.push({
              day: dayNo,
              month: month,
              year: year,
              today: isToday(today, dayNo, month, year),
              selectable: isSelectable(dayNo, month, year, false)
            });
            dayNo++;
          }
        } else {
          for (var _j2 = 0; _j2 < 7; _j2++) {
            if (dayNo > daysLength) {
              var next = getNextMonthAndYear(month, year);
              week.push({
                day: dayNo - daysLength,
                month: next.month,
                year: next.year,
                otherMonth: true,
                today: isToday(today, dayNo - daysLength, next.month, next.year),
                selectable: isSelectable(dayNo - daysLength, next.month, next.year, true)
              });
            } else {
              week.push({
                day: dayNo,
                month: month,
                year: year,
                today: isToday(today, dayNo, month, year),
                selectable: isSelectable(dayNo, month, year, false)
              });
            }
            dayNo++;
          }
        }
        if (props.showWeek) {
          weekNumbers.push(getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
        }
        dates.push(week);
      }
      return {
        month: month,
        year: year,
        dates: dates,
        weekNumbers: weekNumbers
      };
    };
    var getWeekNumber = function getWeekNumber(date) {
      var checkDate = cloneDate(date);
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    var isSelectable = function isSelectable(day, month, year, otherMonth) {
      var validMin = true;
      var validMax = true;
      var validDate = true;
      var validDay = true;
      var validMonth = true;
      if (props.minDate) {
        if (props.minDate.getFullYear() > year) {
          validMin = false;
        } else if (props.minDate.getFullYear() === year) {
          if (month > -1 && props.minDate.getMonth() > month) {
            validMin = false;
          } else if (month > -1 && props.minDate.getMonth() === month) {
            if (day > 0 && props.minDate.getDate() > day) {
              validMin = false;
            }
          }
        }
      }
      if (props.maxDate) {
        if (props.maxDate.getFullYear() < year) {
          validMax = false;
        } else if (props.maxDate.getFullYear() === year) {
          if (month > -1 && props.maxDate.getMonth() < month) {
            validMax = false;
          } else if (month > -1 && props.maxDate.getMonth() === month) {
            if (day > 0 && props.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }
      if (props.disabledDates || props.enabledDates || props.disabledDays) {
        validDay = !isDayDisabled(day, month, year);
      }
      if (props.selectOtherMonths === false && otherMonth) {
        validMonth = false;
      }
      return validMin && validMax && validDate && validDay && validMonth;
    };
    var isSelectableTime = function isSelectableTime(value) {
      var validMin = true;
      var validMax = true;
      if (props.minDate && props.minDate.toDateString() === value.toDateString()) {
        if (props.minDate.getHours() > value.getHours()) {
          validMin = false;
        } else if (props.minDate.getHours() === value.getHours()) {
          if (props.minDate.getMinutes() > value.getMinutes()) {
            validMin = false;
          } else if (props.minDate.getMinutes() === value.getMinutes()) {
            if (props.minDate.getSeconds() > value.getSeconds()) {
              validMin = false;
            } else if (props.minDate.getSeconds() === value.getSeconds()) {
              if (props.minDate.getMilliseconds() > value.getMilliseconds()) {
                validMin = false;
              }
            }
          }
        }
      }
      if (props.maxDate && props.maxDate.toDateString() === value.toDateString()) {
        if (props.maxDate.getHours() < value.getHours()) {
          validMax = false;
        } else if (props.maxDate.getHours() === value.getHours()) {
          if (props.maxDate.getMinutes() < value.getMinutes()) {
            validMax = false;
          } else if (props.maxDate.getMinutes() === value.getMinutes()) {
            if (props.maxDate.getSeconds() < value.getSeconds()) {
              validMax = false;
            } else if (props.maxDate.getSeconds() === value.getSeconds()) {
              if (props.maxDate.getMilliseconds() < value.getMilliseconds()) {
                validMax = false;
              }
            }
          }
        }
      }
      return validMin && validMax;
    };
    var isSelected = function isSelected(dateMeta) {
      if (props.value) {
        if (isSingleSelection()) {
          return isDateEquals(props.value, dateMeta);
        } else if (isMultipleSelection()) {
          var selected = false;
          var _iterator = _createForOfIteratorHelper(props.value),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var date = _step.value;
              selected = isDateEquals(date, dateMeta);
              if (selected) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return selected;
        } else if (isRangeSelection()) {
          if (props.value[1]) {
            return isDateEquals(props.value[0], dateMeta) || isDateEquals(props.value[1], dateMeta) || isDateBetween(props.value[0], props.value[1], dateMeta);
          }
          return isDateEquals(props.value[0], dateMeta);
        }
      } else {
        return false;
      }
    };
    var isComparable = function isComparable() {
      return props.value != null && typeof props.value !== 'string';
    };
    var isMonthSelected = function isMonthSelected(month) {
      if (!isComparable()) return false;
      if (isMultipleSelection()) {
        return props.value.some(function (v) {
          return v.getMonth() === month && v.getFullYear() === currentYear;
        });
      } else if (isRangeSelection()) {
        var _props$value = _slicedToArray(props.value, 2),
          start = _props$value[0],
          end = _props$value[1];
        var startYear = start ? start.getFullYear() : null;
        var endYear = end ? end.getFullYear() : null;
        var startMonth = start ? start.getMonth() : null;
        var endMonth = end ? end.getMonth() : null;
        if (!end) {
          return startYear === currentYear && startMonth === month;
        } else {
          var currentDate = new Date(currentYear, month, 1);
          var startDate = new Date(startYear, startMonth, 1);
          var endDate = new Date(endYear, endMonth, 1);
          return currentDate >= startDate && currentDate <= endDate;
        }
      } else {
        return props.value.getMonth() === month && props.value.getFullYear() === currentYear;
      }
    };
    var isYearSelected = function isYearSelected(year) {
      if (!isComparable()) return false;
      if (isMultipleSelection()) {
        return props.value.some(function (v) {
          return v.getFullYear() === year;
        });
      } else if (isRangeSelection()) {
        var start = props.value[0] ? props.value[0].getFullYear() : null;
        var end = props.value[1] ? props.value[1].getFullYear() : null;
        return start === year || end === year || start < year && end > year;
      } else {
        return props.value.getFullYear() === year;
      }
    };
    var switchViewButtonDisabled = function switchViewButtonDisabled() {
      return props.numberOfMonths > 1 || props.disabled;
    };
    var isDateEquals = function isDateEquals(value, dateMeta) {
      if (value && value instanceof Date) {
        return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
      }
      return false;
    };
    var isDateBetween = function isDateBetween(start, end, dateMeta) {
      var between = false;
      if (start && end) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }
      return between;
    };
    var isSingleSelection = function isSingleSelection() {
      return props.selectionMode === 'single';
    };
    var isRangeSelection = function isRangeSelection() {
      return props.selectionMode === 'range';
    };
    var isMultipleSelection = function isMultipleSelection() {
      return props.selectionMode === 'multiple';
    };
    var isToday = function isToday(today, day, month, year) {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    var isDayDisabled = function isDayDisabled(day, month, year) {
      var isDisabled = false;

      // first check for disabled dates
      if (props.disabledDates) {
        if (props.disabledDates.some(function (d) {
          return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
        })) {
          isDisabled = true;
        }
      }

      // next if not disabled then check for disabled days
      if (!isDisabled && props.disabledDays && currentView === 'date') {
        var weekday = new Date(year, month, day);
        var weekdayNumber = weekday.getDay();
        if (props.disabledDays.indexOf(weekdayNumber) !== -1) {
          isDisabled = true;
        }
      }

      // last check for enabled dates to force dates enabled
      if (props.enabledDates) {
        var isEnabled = props.enabledDates.some(function (d) {
          return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
        });
        if (isEnabled) {
          isDisabled = false;
        } else if (!props.disabledDays && !props.disabledDates) {
          // disable other dates when only enabledDates are present
          isDisabled = true;
        }
      }
      return isDisabled;
    };
    var isMonthYearDisabled = function isMonthYearDisabled(month, year) {
      var daysCountInAllMonth = month === -1 ? new Array(12).fill(0).map(function (_, i) {
        return getDaysCountInMonth(i, year);
      }) : [getDaysCountInMonth(month, year)];
      for (var i = 0; i < daysCountInAllMonth.length; i++) {
        var monthDays = daysCountInAllMonth[i];
        var _month = month === -1 ? i : month;
        for (var day = 1; day <= monthDays; day++) {
          var isDateSelectable = isSelectable(day, _month, year);
          if (isDateSelectable) {
            return false;
          }
        }
      }
      return true;
    };
    var updateInputfield = function updateInputfield(value) {
      if (!inputRef.current) {
        return;
      }
      var formattedValue = '';
      if (value) {
        try {
          if (isSingleSelection()) {
            formattedValue = isValidDate(value) ? formatDateTime(value) : props.keepInvalid ? value : '';
          } else if (isMultipleSelection()) {
            for (var i = 0; i < value.length; i++) {
              var selectedValue = value[i];
              var dateAsString = isValidDate(selectedValue) ? formatDateTime(selectedValue) : '';
              formattedValue = formattedValue + dateAsString;
              if (i !== value.length - 1) {
                formattedValue = formattedValue + ', ';
              }
            }
          } else if (isRangeSelection()) {
            if (value && value.length) {
              var startDate = value[0];
              var endDate = value[1];
              formattedValue = isValidDate(startDate) ? formatDateTime(startDate) : '';
              if (endDate) {
                formattedValue = formattedValue + (isValidDate(endDate) ? ' - ' + formatDateTime(endDate) : '');
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }
      inputRef.current.value = formattedValue;
    };
    var formatDateTime = function formatDateTime(date) {
      if (props.formatDateTime) {
        return props.formatDateTime(date);
      }
      var formattedValue = null;
      if (date) {
        if (props.timeOnly) {
          formattedValue = formatTime(date);
        } else {
          formattedValue = formatDate(date, getDateFormat());
          if (props.showTime) {
            formattedValue = formattedValue + (' ' + formatTime(date));
          }
        }
      }
      return formattedValue;
    };
    var formatDate = function formatDate(date, format) {
      if (!date) {
        return '';
      }
      var iFormat;
      var lookAhead = function lookAhead(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      };
      var formatNumber = function formatNumber(match, value, len) {
        var num = '' + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      };
      var formatName = function formatName(match, value, shortNames, longNames) {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
      var output = '';
      var literal = false;
      var _localeOptions2 = PrimeReact.localeOptions(props.locale),
        dayNamesShort = _localeOptions2.dayNamesShort,
        dayNames = _localeOptions2.dayNames,
        monthNamesShort = _localeOptions2.monthNamesShort,
        monthNames = _localeOptions2.monthNames;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output = output + format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case 'd':
                output = output + formatNumber('d', date.getDate(), 2);
                break;
              case 'D':
                output = output + formatName('D', date.getDay(), dayNamesShort, dayNames);
                break;
              case 'o':
                output = output + formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;
              case 'm':
                output = output + formatNumber('m', date.getMonth() + 1, 2);
                break;
              case 'M':
                output = output + formatName('M', date.getMonth(), monthNamesShort, monthNames);
                break;
              case 'y':
                output = output + (lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
                break;
              case '@':
                output = output + date.getTime();
                break;
              case '!':
                output = output + (date.getTime() * 10000 + ticksTo1970);
                break;
              case "'":
                if (lookAhead("'")) {
                  output = output + "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output = output + format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    };
    var formatTime = function formatTime(date) {
      if (!date) {
        return '';
      }
      var output = '';
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();
      if (props.hourFormat === '12' && hours > 11 && hours !== 12) {
        hours = hours - 12;
      }
      if (props.hourFormat === '12') {
        output = output + (hours === 0 ? 12 : hours < 10 ? '0' + hours : hours);
      } else {
        output = output + (hours < 10 ? '0' + hours : hours);
      }
      output = output + ':';
      output = output + (minutes < 10 ? '0' + minutes : minutes);
      if (props.showSeconds) {
        output = output + ':';
        output = output + (seconds < 10 ? '0' + seconds : seconds);
      }
      if (props.showMillisec) {
        output = output + '.';
        output = output + (milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') + milliseconds : milliseconds);
      }
      if (props.hourFormat === '12') {
        output = output + (date.getHours() > 11 ? ' PM' : ' AM');
      }
      return output;
    };
    var parseValueFromString = function parseValueFromString(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }
      var value;
      if (isSingleSelection()) {
        value = parseDateTime(text);
      } else if (isMultipleSelection()) {
        var tokens = text.split(',');
        value = [];
        var _iterator2 = _createForOfIteratorHelper(tokens),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var token = _step2.value;
            value.push(parseDateTime(token.trim()));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (isRangeSelection()) {
        var _tokens = text.split(' - ');
        value = [];
        for (var i = 0; i < _tokens.length; i++) {
          value[i] = parseDateTime(_tokens[i].trim());
        }
      }
      return value;
    };
    var parseDateTime = function parseDateTime(text) {
      if (props.parseDateTime) {
        return props.parseDateTime(text);
      }
      var date;
      var parts = text.split(' ');
      if (props.timeOnly) {
        date = new Date();
        populateTime(date, parts[0], parts[1]);
      } else if (props.showTime) {
        date = parseDate(parts[0], getDateFormat());
        populateTime(date, parts[1], parts[2]);
      } else {
        date = parseDate(text, getDateFormat());
      }
      return date;
    };
    var populateTime = function populateTime(value, timeString, ampm) {
      if (props.hourFormat === '12' && ampm !== 'PM' && ampm !== 'AM') {
        throw new Error('Invalid Time');
      }
      var time = parseTime(timeString, ampm);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
      value.setMilliseconds(time.millisecond);
    };
    var parseTime = function parseTime(value, ampm) {
      value = props.showMillisec ? value.replace('.', ':') : value;
      var tokens = value.split(':');
      var validTokenLength = props.showSeconds ? 3 : 2;
      validTokenLength = props.showMillisec ? validTokenLength + 1 : validTokenLength;
      if (tokens.length !== validTokenLength || tokens[0].length !== 2 || tokens[1].length !== 2 || props.showSeconds && tokens[2].length !== 2 || props.showMillisec && tokens[3].length !== 3) {
        throw new Error('Invalid time');
      }
      var h = parseInt(tokens[0], 10);
      var m = parseInt(tokens[1], 10);
      var s = props.showSeconds ? parseInt(tokens[2], 10) : null;
      var ms = props.showMillisec ? parseInt(tokens[3], 10) : null;
      if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || props.hourFormat === '12' && h > 12 || props.showSeconds && (isNaN(s) || s > 59) || props.showMillisec && (isNaN(s) || s > 1000)) {
        throw new Error('Invalid time');
      } else {
        if (props.hourFormat === '12') {
          if (h !== 12 && ampm === 'PM') {
            h = h + 12;
          }
          if (h === 12 && ampm === 'AM') {
            h = h - 12;
          }
        }
        return {
          hour: h,
          minute: m,
          second: s,
          millisecond: ms
        };
      }
    };

    // Ported from jquery-ui datepicker parseDate
    var parseDate = function parseDate(value, format) {
      if (format == null || value == null) {
        throw new Error('Invalid arguments');
      }
      value = _typeof(value) === 'object' ? value.toString() : value + '';
      if (value === '') {
        return null;
      }
      var iFormat;
      var dim;
      var extra;
      var iValue = 0;
      var shortYearCutoff = typeof props.shortYearCutoff !== 'string' ? props.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(props.shortYearCutoff, 10);
      var year = -1;
      var month = -1;
      var day = -1;
      var doy = -1;
      var literal = false;
      var date;
      var lookAhead = function lookAhead(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      };
      var getNumber = function getNumber(match) {
        var isDoubled = lookAhead(match);
        var size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2;
        var minSize = match === 'y' ? size : 1;
        var digits = new RegExp('^\\d{' + minSize + ',' + size + '}');
        var num = value.substring(iValue).match(digits);
        if (!num) {
          throw new Error('Missing number at position ' + iValue);
        }
        iValue = iValue + num[0].length;
        return parseInt(num[0], 10);
      };
      var getName = function getName(match, shortNames, longNames) {
        var index = -1;
        var arr = lookAhead(match) ? longNames : shortNames;
        var names = [];
        for (var i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort(function (a, b) {
          return -(a[1].length - b[1].length);
        });
        for (var _i = 0; _i < names.length; _i++) {
          var name = names[_i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[_i][0];
            iValue = iValue + name.length;
            break;
          }
        }
        if (index !== -1) {
          return index + 1;
        }
        throw new Error('Unknown name at position ' + iValue);
      };
      var checkLiteral = function checkLiteral() {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw new Error('Unexpected literal at position ' + iValue);
        }
        iValue++;
      };
      if (props.view === 'month') {
        day = 1;
      }
      if (props.view === 'year') {
        day = 1;
        month = 1;
      }
      var _localeOptions3 = PrimeReact.localeOptions(props.locale),
        dayNamesShort = _localeOptions3.dayNamesShort,
        dayNames = _localeOptions3.dayNames,
        monthNamesShort = _localeOptions3.monthNamesShort,
        monthNames = _localeOptions3.monthNames;
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              day = getNumber('d');
              break;
            case 'D':
              getName('D', dayNamesShort, dayNames);
              break;
            case 'o':
              doy = getNumber('o');
              break;
            case 'm':
              month = getNumber('m');
              break;
            case 'M':
              month = getName('M', monthNamesShort, monthNames);
              break;
            case 'y':
              year = getNumber('y');
              break;
            case '@':
              date = new Date(getNumber('@'));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case '!':
              date = new Date((getNumber('!') - ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw new Error('Extra/unparsed characters found in date: ' + extra);
        }
      }
      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year = year + (new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100));
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = getDaysCountInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day = day - dim;
        } while (true);
      }
      date = daylightSavingAdjust(new Date(year, month - 1, day));
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw new Error('Invalid date'); // E.g. 31/02/00
      }
      return date;
    };
    var isInMinYear = function isInMinYear(viewDate) {
      return props.minDate && props.minDate.getFullYear() === viewDate.getFullYear();
    };
    var isInMaxYear = function isInMaxYear(viewDate) {
      return props.maxDate && props.maxDate.getFullYear() === viewDate.getFullYear();
    };
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useMountEffect(function () {
      var viewDate = getViewDate(props.viewDate);
      validateDate(viewDate);
      setViewDateState(viewDate);
      setCurrentMonth(viewDate.getMonth());
      setCurrentYear(viewDate.getFullYear());
      setCurrentView(props.view);
      if (!idState) {
        var uniqueId = utils.UniqueComponentId();
        !idState && setIdState(uniqueId);
      }
      if (props.inline) {
        overlayRef && overlayRef.current.setAttribute(attributeSelector, '');
        if (!props.disabled) {
          initFocusableCell();
          if (props.numberOfMonths === 1) {
            overlayRef.current.style.width = utils.DomHandler.getOuterWidth(overlayRef.current) + 'px';
          }
        }
      }
      if (props.value) {
        updateInputfield(props.value);
        setValue(props.value);
      }
      if (props.autoFocus) {
        // delay showing until rendered so `alignPanel()` method aligns the popup in the right location
        setTimeout(function () {
          return utils.DomHandler.focus(inputRef.current, props.autoFocus);
        }, 200);
      }
    });
    React__namespace.useEffect(function () {
      // see https://github.com/primefaces/primereact/issues/4030
      onChangeRef.current = props.onChange;
    }, [props.onChange]);
    React__namespace.useEffect(function () {
      var unbindMaskEvents = null;
      if (props.mask) {
        unbindMaskEvents = utils.mask(inputRef.current, {
          mask: props.mask,
          slotChar: props.maskSlotChar,
          readOnly: props.readOnlyInput || props.disabled,
          onChange: function onChange(e) {
            updateValueOnInput(e.originalEvent, e.value, function () {
              return false;
            });
          },
          onBlur: function onBlur(e) {
            updateValueOnInput(e, e.target.value);
          }
        }).unbindEvents;
      }
      return function () {
        props.mask && unbindMaskEvents && unbindMaskEvents();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.disabled, props.mask, props.readOnlyInput]);
    hooks.useUpdateEffect(function () {
      if (viewChangedWithKeyDown.current) {
        setCurrentView(props.view);
      }
      viewChangedWithKeyDown.current = false;
    }, [props.view]);
    hooks.useUpdateEffect(function () {
      if (visible && !props.inline) {
        focusToFirstCell();
      }
    }, [visible, currentView, props.inline]);
    hooks.useUpdateEffect(function () {
      if (!props.onViewDateChange && !viewStateChanged.current) {
        setValue(props.value);
      }
      if (props.viewDate) {
        var date = getViewDate(props.viewDate);
        updateViewDate(null, date);
        onViewDateSelect({
          event: null,
          date: date
        });
      }
    }, [props.onViewDateChange, props.value, props.viewDate]);
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState || props.visible) {
        // Github #5529
        setTimeout(function () {
          alignOverlay();
        });
      }
    }, [currentView, overlayVisibleState, props.visible]);
    hooks.useUpdateEffect(function () {
      var newDate = props.value;
      if (previousValue !== newDate) {
        var isInputFocused = document.activeElement === inputRef.current;

        // Do not update value in input if user types something in it:
        if (!isInputFocused) {
          updateInputfield(newDate);
        }

        // #3516 view date not updated when value set programatically
        if (!newDate) return;
        var viewDate = newDate;
        if (isMultipleSelection()) {
          if (newDate.length) {
            viewDate = newDate[newDate.length - 1];
          }
        } else if (isRangeSelection()) {
          if (newDate.length) {
            var startDate = newDate[0];
            var endDate = newDate[1];
            viewDate = endDate || startDate;
          }
        }
        if (viewDate instanceof Date) {
          validateDate(viewDate);
          setViewDateState(viewDate);
          setCurrentMonth(viewDate.getMonth());
          setCurrentYear(viewDate.getFullYear());
        }
      }
    }, [props.value, visible]);
    hooks.useUpdateEffect(function () {
      updateInputfield(props.value);
    }, [props.dateFormat, props.hourFormat, props.timeOnly, props.showSeconds, props.showMillisec, props.showTime, props.locale]);
    hooks.useUpdateEffect(function () {
      if (overlayRef.current) {
        setNavigationState(viewDateState);
        updateFocus();
      }
    });
    hooks.useUnmountEffect(function () {
      if (touchUIMask.current) {
        disableModality();
        touchUIMask.current = null;
      }
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        getCurrentDateTime: getCurrentDateTime,
        getViewDate: getViewDate,
        updateViewDate: updateViewDate,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getOverlay: function getOverlay() {
          return overlayRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    var setValue = function setValue(propValue) {
      if (Array.isArray(propValue)) {
        propValue = propValue[0];
      }
      var prevPropValue = previousValue;
      if (Array.isArray(prevPropValue)) {
        prevPropValue = prevPropValue[0];
      }
      var viewDate = props.viewDate && isValidDate(props.viewDate) ? props.viewDate : propValue && isValidDate(propValue) ? propValue : new Date();
      if (isClearClicked.current && props.showTime) {
        viewDate.setHours(0, 0, 0);
        isClearClicked.current = false;
      }
      if (!prevPropValue && propValue || propValue && propValue instanceof Date && propValue.getTime() !== prevPropValue.getTime()) {
        validateDate(viewDate);
      }
      setViewDateState(viewDate);
      viewStateChanged.current = true;
    };
    var createBackwardNavigator = function createBackwardNavigator(isVisible) {
      var navigatorProps = isVisible ? {
        onClick: onPrevButtonClick,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      } : {
        style: {
          visibility: 'hidden'
        }
      };
      var previousIconProps = mergeProps({
        className: cx('previousIcon')
      }, ptm('previousIcon'));
      var icon = props.prevIcon || /*#__PURE__*/React__namespace.createElement(chevronleft.ChevronLeftIcon, previousIconProps);
      var backwardNavigatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, previousIconProps), {
        props: props
      });
      var _localeOptions4 = PrimeReact.localeOptions(props.locale),
        prevDecade = _localeOptions4.prevDecade,
        prevYear = _localeOptions4.prevYear,
        prevMonth = _localeOptions4.prevMonth;
      var previousButtonLabel = currentView === 'year' ? prevDecade : currentView === 'month' ? prevYear : prevMonth;
      var previousButtonProps = mergeProps(_objectSpread({
        type: 'button',
        className: cx('previousButton'),
        'aria-label': previousButtonLabel
      }, navigatorProps), ptm('previousButton'));
      return /*#__PURE__*/React__namespace.createElement("button", _extends({
        ref: previousButton
      }, previousButtonProps), backwardNavigatorIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createForwardNavigator = function createForwardNavigator(isVisible) {
      var navigatorProps = isVisible ? {
        onClick: onNextButtonClick,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      } : {
        style: {
          visibility: 'hidden'
        }
      };
      var nextIconProps = mergeProps({
        className: cx('nextIcon')
      }, ptm('nextIcon'));
      var icon = props.nextIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, nextIconProps);
      var forwardNavigatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, nextIconProps), {
        props: props
      });
      var _localeOptions5 = PrimeReact.localeOptions(props.locale),
        nextDecade = _localeOptions5.nextDecade,
        nextYear = _localeOptions5.nextYear,
        nextMonth = _localeOptions5.nextMonth;
      var nextButtonLabel = currentView === 'year' ? nextDecade : currentView === 'month' ? nextYear : nextMonth;
      var nextButtonProps = mergeProps(_objectSpread({
        type: 'button',
        className: cx('nextButton'),
        'aria-label': nextButtonLabel
      }, navigatorProps), ptm('nextButton'));
      return /*#__PURE__*/React__namespace.createElement("button", _extends({
        ref: nextButton
      }, nextButtonProps), forwardNavigatorIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var renderMonthsNavigator = function renderMonthsNavigator(index) {
      return props.monthNavigator && props.view !== 'month' && (props.numberOfMonths === 1 || index === 0);
    };
    var createTitleMonthElement = function createTitleMonthElement(month, monthIndex) {
      var monthNames = PrimeReact.localeOption('monthNames', props.locale);
      if (renderMonthsNavigator(monthIndex)) {
        var viewDate = getViewDate();
        var viewMonth = viewDate.getMonth();
        var displayedMonthOptions = monthNames.map(function (month, index) {
          return (!isInMinYear(viewDate) || index >= props.minDate.getMonth()) && (!isInMaxYear(viewDate) || index <= props.maxDate.getMonth()) ? {
            label: month,
            value: index,
            index: index
          } : null;
        }).filter(function (option) {
          return !!option;
        });
        var displayedMonthNames = displayedMonthOptions.map(function (option) {
          return option.label;
        });
        var selectProps = mergeProps({
          className: cx('select'),
          onChange: function onChange(e) {
            return onMonthDropdownChange(e, e.target.value);
          },
          value: viewMonth
        }, ptm('select'));
        var _content = /*#__PURE__*/React__namespace.createElement("select", selectProps, displayedMonthOptions.map(function (option) {
          var optionProps = mergeProps({
            value: option.value
          }, ptm('option'));
          return /*#__PURE__*/React__namespace.createElement("option", _extends({}, optionProps, {
            key: option.label
          }), option.label);
        }));
        if (props.monthNavigatorTemplate) {
          var defaultContentOptions = {
            onChange: onMonthDropdownChange,
            className: 'p-datepicker-month',
            value: viewMonth,
            names: displayedMonthNames,
            options: displayedMonthOptions,
            element: _content,
            props: props
          };
          return utils.ObjectUtils.getJSXElement(props.monthNavigatorTemplate, defaultContentOptions);
        }
        return _content;
      }
      var monthTitleProps = mergeProps({
        className: cx('monthTitle'),
        onKeyDown: onContainerButtonKeydown,
        'aria-label': PrimeReact.localeOption('chooseMonth', props.locale),
        onClick: switchToMonthView,
        disabled: switchViewButtonDisabled()
      }, ptm('monthTitle'));
      return currentView === 'date' && /*#__PURE__*/React__namespace.createElement("button", monthTitleProps, monthNames[month]);
    };
    var createTitleYearElement = function createTitleYearElement(metaYear) {
      var viewDate = getViewDate();
      var viewYear = viewDate.getFullYear();
      var displayYear = props.numberOfMonths > 1 || props.yearNavigator ? metaYear : currentYear;
      if (props.yearNavigator) {
        var _yearOptions2 = [];
        if (props.yearRange) {
          var years = props.yearRange.split(':');
          var yearStart = parseInt(years[0], 10);
          var yearEnd = parseInt(years[1], 10);
          for (var i = yearStart; i <= yearEnd; i++) {
            _yearOptions2.push(i);
          }
        } else {
          var base = viewYear - viewYear % 10;
          for (var _i2 = 0; _i2 < 10; _i2++) {
            _yearOptions2.push(base + _i2);
          }
        }
        var displayedYearNames = _yearOptions2.filter(function (year) {
          return !(props.minDate && props.minDate.getFullYear() > year) && !(props.maxDate && props.maxDate.getFullYear() < year);
        });
        var selectProps = mergeProps({
          className: cx('select'),
          onChange: function onChange(e) {
            return onYearDropdownChange(e, e.target.value);
          },
          value: displayYear
        }, ptm('select'));
        var _content2 = /*#__PURE__*/React__namespace.createElement("select", selectProps, displayedYearNames.map(function (year) {
          var optionProps = mergeProps({
            value: year
          }, ptm('option'));
          return /*#__PURE__*/React__namespace.createElement("option", _extends({}, optionProps, {
            key: year
          }), year);
        }));
        if (props.yearNavigatorTemplate) {
          var options = displayedYearNames.map(function (name, i) {
            return {
              label: name,
              value: name,
              index: i
            };
          });
          var defaultContentOptions = {
            onChange: onYearDropdownChange,
            className: 'p-datepicker-year',
            value: viewYear,
            names: displayedYearNames,
            options: options,
            element: _content2,
            props: props
          };
          return utils.ObjectUtils.getJSXElement(props.yearNavigatorTemplate, defaultContentOptions);
        }
        return _content2;
      }
      var yearTitleProps = mergeProps({
        className: cx('yearTitle'),
        'aria-label': PrimeReact.localeOption('chooseYear', props.locale),
        onClick: function onClick(e) {
          return switchToYearView(e);
        },
        disabled: switchViewButtonDisabled()
      }, ptm('yearTitle'));
      return currentView !== 'year' && /*#__PURE__*/React__namespace.createElement("button", yearTitleProps, displayYear);
    };
    var createTitleDecadeElement = function createTitleDecadeElement() {
      var years = yearPickerValues();
      var decadeTitleProps = mergeProps({
        className: cx('decadeTitle')
      }, ptm('decadeTitle'));
      if (currentView === 'year') {
        var decadeTitleTextProps = mergeProps(ptm('decadeTitleText'));
        return /*#__PURE__*/React__namespace.createElement("span", decadeTitleProps, props.decadeTemplate ? props.decadeTemplate(years) : /*#__PURE__*/React__namespace.createElement("span", decadeTitleTextProps, "".concat(yearPickerValues()[0], " - ").concat(yearPickerValues()[yearPickerValues().length - 1])));
      }
      return null;
    };
    var createTitle = function createTitle(monthMetaData, index) {
      var month = createTitleMonthElement(monthMetaData.month, index);
      var year = createTitleYearElement(monthMetaData.year);
      var decade = createTitleDecadeElement();
      var titleProps = mergeProps({
        className: cx('title')
      }, ptm('title'));
      var showMonthAfterYear = PrimeReact.localeOption('showMonthAfterYear', props.locale);
      return /*#__PURE__*/React__namespace.createElement("div", titleProps, showMonthAfterYear ? year : month, showMonthAfterYear ? month : year, decade);
    };
    var createDayNames = function createDayNames(weekDays) {
      var weekDayProps = mergeProps(ptm('weekDay'));
      var tableHeaderCellProps = mergeProps({
        scope: 'col'
      }, ptm('tableHeaderCell'));
      var dayNames = weekDays.map(function (weekDay, index) {
        return /*#__PURE__*/React__namespace.createElement("th", _extends({}, tableHeaderCellProps, {
          key: "".concat(weekDay, "-").concat(index)
        }), /*#__PURE__*/React__namespace.createElement("span", weekDayProps, weekDay));
      });
      if (props.showWeek) {
        var weekHeaderProps = mergeProps({
          scope: 'col',
          className: cx('weekHeader'),
          'data-p-disabled': props.showWeek
        }, ptm('weekHeader', {
          context: {
            disabled: props.showWeek
          }
        }));
        var weekLabel = mergeProps(ptm('weekLabel'));
        var weekHeader = /*#__PURE__*/React__namespace.createElement("th", _extends({}, weekHeaderProps, {
          key: "wn"
        }), /*#__PURE__*/React__namespace.createElement("span", weekLabel, PrimeReact.localeOption('weekHeader', props.locale)));
        return [weekHeader].concat(_toConsumableArray(dayNames));
      }
      return dayNames;
    };
    var createDateCellContent = function createDateCellContent(date, className, groupIndex) {
      var content = props.dateTemplate ? props.dateTemplate(date) : date.day;
      var selected = isSelected(date);
      var dayLabelProps = mergeProps({
        className: cx('dayLabel', {
          className: className
        }),
        'aria-selected': selected,
        'aria-disabled': !date.selectable,
        onClick: function onClick(e) {
          return onDateSelect(e, date);
        },
        onKeyDown: function onKeyDown(e) {
          return onDateCellKeydown(e, date, groupIndex);
        },
        'data-p-highlight': selected,
        'data-p-disabled': !date.selectable
      }, ptm('dayLabel', {
        context: {
          selected: selected,
          disabled: !date.selectable
        }
      }));
      return /*#__PURE__*/React__namespace.createElement("span", dayLabelProps, content, selected && /*#__PURE__*/React__namespace.createElement("div", {
        "aria-live": "polite",
        className: "p-hidden-accessible",
        "data-p-hidden-accessible": true,
        pt: ptm('hiddenSelectedDay')
      }));
    };
    var createWeek = function createWeek(weekDates, weekNumber, groupIndex) {
      var week = weekDates.map(function (date) {
        var selected = isSelected(date);
        var dateClassName = utils.classNames({
          'p-highlight': selected,
          'p-disabled': !date.selectable
        });
        var content = date.otherMonth && !props.showOtherMonths ? null : createDateCellContent(date, dateClassName, groupIndex);
        var formattedValue = formatDate(new Date(date.year, date.month, date.day), getDateFormat());
        var dayProps = mergeProps({
          className: cx('day', {
            date: date
          }),
          'aria-label': formattedValue,
          'data-p-today': date.today,
          'data-p-other-month': date.otherMonth,
          'data-p-day': date.day,
          'data-p-month': date.month,
          'data-p-year': date.year
        }, ptm('day', {
          context: {
            date: date,
            today: date.today,
            otherMonth: date.otherMonth
          }
        }));
        return /*#__PURE__*/React__namespace.createElement("td", _extends({}, dayProps, {
          key: date.day
        }), content);
      });
      if (props.showWeek) {
        var weekNumberProps = mergeProps({
          className: cx('weekNumber')
        }, ptm('weekNumber'));
        var weekLabelContainerProps = mergeProps({
          className: cx('weekLabelContainer'),
          'data-p-disabled': props.showWeek
        }, ptm('weekLabelContainer', {
          context: {
            disabled: props.showWeek
          }
        }));
        var weekNumberCell = /*#__PURE__*/React__namespace.createElement("td", _extends({}, weekNumberProps, {
          key: 'wn' + weekNumber
        }), /*#__PURE__*/React__namespace.createElement("span", weekLabelContainerProps, weekNumber));
        return [weekNumberCell].concat(_toConsumableArray(week));
      }
      return week;
    };
    var createDates = function createDates(monthMetaData, groupIndex) {
      var tableBodyRowProps = mergeProps(ptm('tableBodyRowProps'));
      return monthMetaData.dates.map(function (weekDates, index) {
        return /*#__PURE__*/React__namespace.createElement("tr", _extends({}, tableBodyRowProps, {
          key: index
        }), createWeek(weekDates, monthMetaData.weekNumbers[index], groupIndex));
      });
    };
    var createDateViewGrid = function createDateViewGrid(monthMetaData, weekDays, groupIndex) {
      var dayNames = createDayNames(weekDays);
      var dates = createDates(monthMetaData, groupIndex);
      var containerProps = mergeProps({
        className: cx('container')
      }, ptm('container'));
      var tableProps = mergeProps({
        role: 'grid',
        className: cx('table')
      }, ptm('table'));
      var tableHeaderProps = mergeProps(ptm('tableHeader'));
      var tableHeaderRowProps = mergeProps(ptm('tableHeaderRow'));
      var tableBodyProps = mergeProps(ptm('tableBody'));
      return currentView === 'date' && /*#__PURE__*/React__namespace.createElement("div", _extends({}, containerProps, {
        key: utils.UniqueComponentId('calendar_container_')
      }), /*#__PURE__*/React__namespace.createElement("table", tableProps, /*#__PURE__*/React__namespace.createElement("thead", tableHeaderProps, /*#__PURE__*/React__namespace.createElement("tr", tableHeaderRowProps, dayNames)), /*#__PURE__*/React__namespace.createElement("tbody", tableBodyProps, dates)));
    };
    var createMonth = function createMonth(monthMetaData, index) {
      var weekDays = createWeekDaysMeta();
      var backwardNavigator = createBackwardNavigator(index === 0);
      var forwardNavigator = createForwardNavigator(props.numberOfMonths === 1 || index === props.numberOfMonths - 1);
      var title = createTitle(monthMetaData, index);
      var dateViewGrid = createDateViewGrid(monthMetaData, weekDays, index);
      var header = props.headerTemplate ? props.headerTemplate() : null;
      var monthKey = monthMetaData.month + '-' + monthMetaData.year;
      var groupProps = mergeProps({
        className: cx('group')
      }, ptm('group'));
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      return /*#__PURE__*/React__namespace.createElement("div", _extends({}, groupProps, {
        key: monthKey
      }), /*#__PURE__*/React__namespace.createElement("div", _extends({}, headerProps, {
        key: index
      }), header, backwardNavigator, title, forwardNavigator), dateViewGrid);
    };
    var createMonths = function createMonths(monthsMetaData) {
      var groups = monthsMetaData.map(createMonth);
      var groupContainerProps = mergeProps({
        className: cx('groupContainer')
      }, ptm('groupContainer'));
      return /*#__PURE__*/React__namespace.createElement("div", groupContainerProps, groups);
    };
    var createDateView = function createDateView() {
      var viewDate = getViewDate();
      var monthsMetaData = createMonthsMeta(viewDate.getMonth(), viewDate.getFullYear());
      var months = createMonths(monthsMetaData);
      return months;
    };
    var monthPickerValues = function monthPickerValues() {
      var monthPickerValues = [];
      var monthNamesShort = PrimeReact.localeOption('monthNamesShort', props.locale);
      for (var i = 0; i <= 11; i++) {
        monthPickerValues.push(monthNamesShort[i]);
      }
      return monthPickerValues;
    };
    var yearPickerValues = function yearPickerValues() {
      var yearPickerValues = [];
      var base = currentYear - currentYear % 10;
      for (var i = 0; i < 10; i++) {
        yearPickerValues.push(base + i);
      }
      return yearPickerValues;
    };
    var createMonthYearView = function createMonthYearView() {
      var backwardNavigator = createBackwardNavigator(true);
      var forwardNavigator = createForwardNavigator(true);
      var yearElement = createTitleYearElement(getViewDate().getFullYear());
      var decade = createTitleDecadeElement();
      var groupContainerProps = mergeProps({
        className: cx('groupContainer')
      }, ptm('groupContainer'));
      var groupProps = mergeProps({
        className: cx('group')
      }, ptm('group'));
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      var titleProps = mergeProps({
        className: cx('title')
      }, ptm('title'));
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", groupContainerProps, /*#__PURE__*/React__namespace.createElement("div", groupProps, /*#__PURE__*/React__namespace.createElement("div", headerProps, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", titleProps, yearElement, decade), forwardNavigator))));
    };
    var createDatePicker = function createDatePicker() {
      if (!props.timeOnly) {
        if (props.view === 'date') {
          return createDateView();
        }
        return createMonthYearView();
      }
      return null;
    };
    var incrementIconProps = mergeProps(ptm('incrementIcon'));
    var decrementIconProps = mergeProps(ptm('decrementIcon'));
    var incrementIcon = utils.IconUtils.getJSXIcon(props.incrementIcon || /*#__PURE__*/React__namespace.createElement(chevronup.ChevronUpIcon, incrementIconProps), _objectSpread({}, incrementIconProps), {
      props: props
    });
    var decrementIcon = utils.IconUtils.getJSXIcon(props.decrementIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, decrementIconProps), _objectSpread({}, decrementIconProps), {
      props: props
    });
    var createHourPicker = function createHourPicker() {
      var currentTime = getCurrentDateTime();
      var minute = doStepMinute(currentTime.getMinutes());
      var hour = currentTime.getHours();

      // #3770 account for step minutes rolling to next hour
      hour = minute > 59 ? hour + 1 : hour;
      if (props.hourFormat === '12') {
        if (hour === 0) {
          hour = 12;
        } else if (hour > 11 && hour !== 12) {
          hour = hour - 12;
        }
      }
      var hourProps = mergeProps(ptm('hour'));
      var _localeOptions6 = PrimeReact.localeOptions(props.locale),
        nextHour = _localeOptions6.nextHour,
        prevHour = _localeOptions6.prevHour;
      var hourDisplay = hour < 10 ? '0' + hour : hour;
      var hourPickerProps = mergeProps({
        className: cx('hourPicker')
      }, ptm('hourPicker'));
      var incrementButtonProps = mergeProps({
        type: 'button',
        className: cx('incrementButton'),
        'aria-label': nextHour,
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 0, 1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onPickerKeyDown(e, 0, 1);
        },
        onKeyUp: onPickerKeyUp
      }, ptm('incrementButton'));
      var decrementButtonProps = mergeProps({
        type: 'button',
        className: cx('decrementButton'),
        'aria-label': prevHour,
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 0, -1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onPickerKeyDown(e, 0, -1);
        },
        onKeyUp: onPickerKeyUp
      }, ptm('decrementButton'));
      return /*#__PURE__*/React__namespace.createElement("div", hourPickerProps, /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, incrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", hourProps, hourDisplay), /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, decrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    };
    var createMinutePicker = function createMinutePicker() {
      var currentTime = getCurrentDateTime();
      var minute = doStepMinute(currentTime.getMinutes());
      minute = minute > 59 ? minute - 60 : minute;
      var minuteProps = mergeProps(ptm('minute'));
      var _localeOptions7 = PrimeReact.localeOptions(props.locale),
        nextMinute = _localeOptions7.nextMinute,
        prevMinute = _localeOptions7.prevMinute;
      var minuteDisplay = minute < 10 ? '0' + minute : minute;
      var minutePickerProps = mergeProps({
        className: cx('minutePicker')
      }, ptm('minutePicker'));
      var incrementButtonProps = mergeProps({
        type: 'button',
        className: cx('incrementButton'),
        'aria-label': nextMinute,
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 1, 1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onPickerKeyDown(e, 1, 1);
        },
        onKeyUp: onPickerKeyUp
      }, ptm('incrementButton'));
      var decrementButtonProps = mergeProps({
        type: 'button',
        className: cx('decrementButton'),
        'aria-label': prevMinute,
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 1, -1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onPickerKeyDown(e, 1, -1);
        },
        onKeyUp: onPickerKeyUp
      }, ptm('decrementButton'));
      return /*#__PURE__*/React__namespace.createElement("div", minutePickerProps, /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, incrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", minuteProps, minuteDisplay), /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, decrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    };
    var createSecondPicker = function createSecondPicker() {
      if (props.showSeconds) {
        var currentTime = getCurrentDateTime();
        var _localeOptions8 = PrimeReact.localeOptions(props.locale),
          nextSecond = _localeOptions8.nextSecond,
          prevSecond = _localeOptions8.prevSecond;
        var secondProps = mergeProps(ptm('second'));
        var second = currentTime.getSeconds();
        var secondDisplay = second < 10 ? '0' + second : second;
        var secondPickerProps = mergeProps({
          className: cx('secondPicker')
        }, ptm('secondPicker'));
        var incrementButtonProps = mergeProps({
          type: 'button',
          className: cx('incrementButton'),
          'aria-label': nextSecond,
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 2, 1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onPickerKeyDown(e, 2, 1);
          },
          onKeyUp: onPickerKeyUp
        }, ptm('incrementButton'));
        var decrementButtonProps = mergeProps({
          type: 'button',
          className: cx('decrementButton'),
          'aria-label': prevSecond,
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 2, -1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onPickerKeyDown(e, 2, -1);
          },
          onKeyUp: onPickerKeyUp
        }, ptm('decrementButton'));
        return /*#__PURE__*/React__namespace.createElement("div", secondPickerProps, /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, incrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", secondProps, secondDisplay), /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, decrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createMiliSecondPicker = function createMiliSecondPicker() {
      if (props.showMillisec) {
        var currentTime = getCurrentDateTime();
        var _localeOptions9 = PrimeReact.localeOptions(props.locale),
          nextMilliSecond = _localeOptions9.nextMilliSecond,
          prevMilliSecond = _localeOptions9.prevMilliSecond;
        var millisecondProps = mergeProps(ptm('millisecond'));
        var millisecond = currentTime.getMilliseconds();
        var millisecondDisplay = millisecond < 100 ? (millisecond < 10 ? '00' : '0') + millisecond : millisecond;
        var millisecondPickerProps = mergeProps({
          className: cx('millisecondPicker')
        }, ptm('millisecondPicker'));
        var incrementButtonProps = mergeProps({
          type: 'button',
          className: cx('incrementButton'),
          'aria-label': nextMilliSecond,
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 3, 1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onPickerKeyDown(e, 3, 1);
          },
          onKeyUp: onPickerKeyUp
        }, ptm('incrementButton'));
        var decrementButtonProps = mergeProps({
          type: 'button',
          className: cx('decrementButton'),
          'aria-label': prevMilliSecond,
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 3, -1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onPickerKeyDown(e, 3, -1);
          },
          onKeyUp: onPickerKeyUp
        }, ptm('decrementButton'));
        return /*#__PURE__*/React__namespace.createElement("div", millisecondPickerProps, /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, incrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", millisecondProps, millisecondDisplay), /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, decrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createAmPmPicker = function createAmPmPicker() {
      if (props.hourFormat === '12') {
        var currentTime = getCurrentDateTime();
        var _localeOptions10 = PrimeReact.localeOptions(props.locale),
          am = _localeOptions10.am,
          pm = _localeOptions10.pm;
        var hour = currentTime.getHours();
        var display = hour > 11 ? 'PM' : 'AM';
        var ampmProps = mergeProps(ptm('ampm'));
        var ampmPickerProps = mergeProps({
          className: cx('ampmPicker')
        }, ptm('ampmPicker'));
        var incrementButtonProps = mergeProps({
          type: 'button',
          className: cx('incrementButton'),
          'aria-label': am,
          onClick: function onClick(e) {
            return toggleAmPm(e);
          }
        }, ptm('incrementButton'));
        var decrementButtonProps = mergeProps({
          type: 'button',
          className: cx('decrementButton'),
          'aria-label': pm,
          onClick: function onClick(e) {
            return toggleAmPm(e);
          }
        }, ptm('decrementButton'));
        return /*#__PURE__*/React__namespace.createElement("div", ampmPickerProps, /*#__PURE__*/React__namespace.createElement("button", incrementButtonProps, incrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", ampmProps, display), /*#__PURE__*/React__namespace.createElement("button", decrementButtonProps, decrementIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createSeparator = function createSeparator(separator) {
      var separatorContainerProps = mergeProps({
        className: cx('separatorContainer')
      }, ptm('separatorContainer'));
      var separatorProps = mergeProps(ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("div", separatorContainerProps, /*#__PURE__*/React__namespace.createElement("span", separatorProps, separator));
    };
    var createTimePicker = function createTimePicker() {
      if ((props.showTime || props.timeOnly) && currentView === 'date') {
        var timePickerProps = mergeProps({
          className: cx('timePicker')
        }, ptm('timePicker'));
        return /*#__PURE__*/React__namespace.createElement("div", timePickerProps, createHourPicker(), createSeparator(':'), createMinutePicker(), props.showSeconds && createSeparator(':'), createSecondPicker(), props.showMillisec && createSeparator('.'), createMiliSecondPicker(), props.hourFormat === '12' && createSeparator(':'), createAmPmPicker());
      }
      return null;
    };
    var createInputElement = function createInputElement() {
      if (!props.inline) {
        return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, {
          ref: inputRef,
          id: props.inputId,
          name: props.name,
          type: "text",
          role: "combobox",
          className: utils.classNames(props.inputClassName, cx('input', {
            context: context
          })),
          style: props.inputStyle,
          readOnly: props.readOnlyInput,
          disabled: props.disabled,
          required: props.required,
          autoComplete: "off",
          placeholder: props.placeholder,
          tabIndex: props.tabIndex,
          onInput: onUserInput,
          onFocus: onInputFocus,
          onBlur: onInputBlur,
          onKeyDown: onInputKeyDown,
          "aria-expanded": overlayVisibleState,
          "aria-autocomplete": "none",
          "aria-haspopup": "dialog",
          "aria-controls": panelId,
          "aria-labelledby": props.ariaLabelledBy,
          "aria-label": props.ariaLabel,
          inputMode: props.inputMode,
          tooltip: props.tooltip,
          tooltipOptions: props.tooltipOptions,
          pt: ptm('input'),
          unstyled: props.unstyled,
          __parentMetadata: {
            parent: metaData
          }
        });
      }
      return null;
    };
    var createButton = function createButton() {
      if (props.showIcon) {
        return /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          icon: props.icon || /*#__PURE__*/React__namespace.createElement(calendar.CalendarIcon, null),
          onClick: onButtonClick,
          tabIndex: "-1",
          disabled: props.disabled,
          "aria-haspopup": "dialog",
          "aria-label": PrimeReact.localeOption('chooseDate', props.locale),
          "aria-expanded": overlayVisibleState,
          "aria-controls": panelId,
          className: cx('dropdownButton'),
          pt: ptm('dropdownButton'),
          __parentMetadata: {
            parent: metaData
          }
        });
      }
      return null;
    };
    var createContent = function createContent() {
      var input = createInputElement();
      var button = createButton();
      if (props.iconPos === 'left') {
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, button, input);
      }
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, input, button);
    };
    var isPastMaxDateWithBuffer = function isPastMaxDateWithBuffer() {
      var bufferInSeconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var now = new Date();
      var maxDate = props.maxDate;
      return maxDate < now && Math.abs((now.getTime() - maxDate.getTime()) / 1000) > bufferInSeconds;
    };
    var createButtonBar = function createButtonBar() {
      if (props.showButtonBar) {
        var _localeOptions11 = PrimeReact.localeOptions(props.locale),
          today = _localeOptions11.today,
          clear = _localeOptions11.clear,
          now = _localeOptions11.now;
        var nowDate = new Date();
        var isHidden = props.minDate && props.minDate > nowDate || props.maxDate && isPastMaxDateWithBuffer();
        var buttonbarProps = mergeProps({
          className: cx('buttonbar')
        }, ptm('buttonbar'));
        return /*#__PURE__*/React__namespace.createElement("div", buttonbarProps, /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: props.showTime ? now : today,
          onClick: onTodayButtonClick,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          },
          className: utils.classNames(props.todayButtonClassName, cx('todayButton')),
          pt: ptm('todayButton'),
          style: isHidden ? {
            visibility: 'hidden'
          } : undefined
        }), /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: clear,
          onClick: onClearButtonClick,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          },
          className: utils.classNames(props.clearButtonClassName, cx('clearButton')),
          pt: ptm('clearButton')
        }));
      }
      return null;
    };
    var createFooter = function createFooter() {
      if (props.footerTemplate) {
        var _content3 = props.footerTemplate();
        var footerProps = mergeProps({
          className: cx('footer')
        }, ptm('footer'));
        return /*#__PURE__*/React__namespace.createElement("div", footerProps, _content3);
      }
      return null;
    };
    var createMonthPicker = function createMonthPicker() {
      if (currentView === 'month') {
        var monthPickerProps = mergeProps({
          className: cx('monthPicker')
        }, ptm('monthPicker'));
        return /*#__PURE__*/React__namespace.createElement("div", monthPickerProps, monthPickerValues().map(function (m, i) {
          var selected = isMonthSelected(i);
          var monthProps = mergeProps({
            className: cx('month', {
              isMonthSelected: isMonthSelected,
              isMonthYearDisabled: isMonthYearDisabled,
              i: i,
              currentYear: currentYear
            }),
            onClick: function onClick(event) {
              return onMonthSelect(event, i);
            },
            onKeyDown: function onKeyDown(event) {
              return onMonthCellKeydown(event, i);
            },
            'data-p-disabled': isMonthYearDisabled(i, currentYear),
            'data-p-highlight': selected
          }, ptm('month', {
            context: {
              month: m,
              monthIndex: i,
              selected: selected,
              disabled: isMonthYearDisabled(i, currentYear)
            }
          }));
          return /*#__PURE__*/React__namespace.createElement("span", _extends({}, monthProps, {
            key: "month".concat(i + 1)
          }), m, selected && /*#__PURE__*/React__namespace.createElement("div", {
            "aria-live": "polite",
            className: "p-hidden-accessible",
            "data-p-hidden-accessible": true,
            pt: ptm('hiddenMonth')
          }, m));
        }));
      }
      return null;
    };
    var createYearPicker = function createYearPicker() {
      if (currentView === 'year') {
        var yearPickerProps = mergeProps({
          className: cx('yearPicker')
        }, ptm('yearPicker'));
        return /*#__PURE__*/React__namespace.createElement("div", yearPickerProps, yearPickerValues().map(function (y, i) {
          var selected = isYearSelected(y);
          var yearProps = mergeProps({
            className: cx('year', {
              isYearSelected: isYearSelected,
              isMonthYearDisabled: isMonthYearDisabled,
              y: y
            }),
            onClick: function onClick(event) {
              return onYearSelect(event, y);
            },
            onKeyDown: function onKeyDown(event) {
              return onYearCellKeydown(event, y);
            },
            'data-p-highlight': isYearSelected(y),
            'data-p-disabled': isMonthYearDisabled(-1, y)
          }, ptm('year', {
            context: {
              year: y,
              yearIndex: i,
              selected: selected,
              disabled: isMonthYearDisabled(-1, y)
            }
          }));
          return /*#__PURE__*/React__namespace.createElement("span", _extends({}, yearProps, {
            key: "year".concat(i + 1)
          }), y, selected && /*#__PURE__*/React__namespace.createElement("div", {
            "aria-live": "polite",
            className: "p-hidden-accessible",
            "data-p-hidden-accessible": true,
            pt: ptm('hiddenYear')
          }, y));
        }));
      }
      return null;
    };
    var panelClassName = utils.classNames('p-datepicker p-component', props.panelClassName, {
      'p-datepicker-inline': props.inline,
      'p-disabled': props.disabled,
      'p-datepicker-timeonly': props.timeOnly,
      'p-datepicker-multiple-month': props.numberOfMonths > 1,
      'p-datepicker-monthpicker': currentView === 'month',
      'p-datepicker-touch-ui': props.touchUI,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact__default["default"].ripple === false
    });
    var content = createContent();
    var datePicker = createDatePicker();
    var timePicker = createTimePicker();
    var buttonBar = createButtonBar();
    var footer = createFooter();
    var monthPicker = createMonthPicker();
    var yearPicker = createYearPicker();
    var isFilled = utils.DomHandler.hasClass(inputRef.current, 'p-filled') && inputRef.current.value !== '';
    var rootProps = mergeProps({
      id: props.id,
      className: utils.classNames(props.className, cx('root', {
        focusedState: focusedState,
        isFilled: isFilled,
        panelVisible: visible
      })),
      style: props.style
    }, CalendarBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("span", _extends({
      ref: elementRef
    }, rootProps), content, /*#__PURE__*/React__namespace.createElement(CalendarPanel, {
      hostName: "Calendar",
      id: panelId,
      locale: props.locale,
      ref: overlayRef,
      className: panelClassName,
      style: props.panelStyle,
      appendTo: props.appendTo,
      inline: props.inline,
      onClick: onPanelClick,
      onMouseUp: onPanelMouseUp,
      "in": visible,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited,
      transitionOptions: props.transitionOptions,
      ptm: ptm,
      cx: cx
    }, datePicker, timePicker, monthPicker, yearPicker, buttonBar, footer));
  }));
  Calendar.displayName = 'Calendar';

  exports.Calendar = Calendar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.componentbase, primereact.hooks, primereact.icons.calendar, primereact.icons.chevrondown, primereact.icons.chevronleft, primereact.icons.chevronright, primereact.icons.chevronup, primereact.inputtext, primereact.overlayservice, primereact.ripple, primereact.utils, primereact.csstransition, primereact.portal);
