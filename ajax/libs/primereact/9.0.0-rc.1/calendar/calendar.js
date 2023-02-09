this.primereact = this.primereact || {};
this.primereact.calendar = (function (exports, React, PrimeReact, button, hooks, inputtext, overlayservice, ripple, utils, csstransition, portal) {
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

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
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
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  var CalendarBase = {
    defaultProps: {
      __TYPE: 'Calendar',
      appendTo: null,
      ariaLabelledBy: null,
      autoZIndex: true,
      baseZIndex: 0,
      className: null,
      clearButtonClassName: 'p-button-secondary',
      dateFormat: null,
      dateTemplate: null,
      decadeTemplate: null,
      disabled: false,
      disabledDates: null,
      disabledDays: null,
      footerTemplate: null,
      formatDateTime: null,
      headerTemplate: null,
      hideOnDateTimeSelect: false,
      hourFormat: '24',
      icon: 'pi pi-calendar',
      iconPos: 'right',
      id: null,
      inline: false,
      inputClassName: null,
      inputId: null,
      inputMode: 'none',
      inputRef: null,
      inputStyle: null,
      keepInvalid: false,
      locale: null,
      mask: null,
      maxDate: null,
      maxDateCount: null,
      minDate: null,
      monthNavigator: false,
      monthNavigatorTemplate: null,
      name: null,
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
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, CalendarBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, CalendarBase.defaultProps);
    }
  };

  var CalendarPanel = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var createElement = function createElement() {
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: ref,
        classNames: "p-connected-overlay",
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
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: ref,
        className: props.className,
        style: props.style,
        onClick: props.onClick,
        onMouseUp: props.onMouseUp
      }, props.children));
    };
    var element = createElement();
    return props.inline ? element : /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  });
  CalendarPanel.displayName = 'CalendarPanel';

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var Calendar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _classNames;
    var props = CalendarBase.getProps(inProps);
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
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var navigation = React__namespace.useRef(null);
    var ignoreFocusFunctionality = React__namespace.useRef(false);
    var isKeydown = React__namespace.useRef(false);
    var timePickerTimer = React__namespace.useRef(null);
    var viewStateChanged = React__namespace.useRef(false);
    var touchUIMask = React__namespace.useRef(null);
    var overlayEventListener = React__namespace.useRef(null);
    var touchUIMaskClickListener = React__namespace.useRef(null);
    var isOverlayClicked = React__namespace.useRef(false);
    var ignoreMaskChange = React__namespace.useRef(false);
    var _React$useState7 = React__namespace.useState('date'),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      currentView = _React$useState8[0],
      setCurrentView = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      currentMonth = _React$useState10[0],
      setCurrentMonth = _React$useState10[1];
    var _React$useState11 = React__namespace.useState(null),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      currentYear = _React$useState12[0],
      setCurrentYear = _React$useState12[1];
    var _React$useState13 = React__namespace.useState([]),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      yearOptions = _React$useState14[0],
      setYearOptions = _React$useState14[1];
    var previousValue = hooks.usePrevious(props.value);
    var visible = props.inline || (props.onVisibleChange ? props.visible : overlayVisibleState);
    var attributeSelector = utils.UniqueComponentId();
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
        when: !(props.touchUI || props.inline) && visible
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
      setFocusedState(false);
      !props.keepInvalid && updateInputfield(props.value);
      props.onBlur && props.onBlur(event);
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      isKeydown.current = true;
      switch (event.which) {
        //escape
        case 27:
          {
            hide();
            break;
          }

        //tab
        case 9:
          {
            visible && trapFocus(event);
            props.touchUI && disableModality();
            break;
          }
      }
    };
    var onUserInput = function onUserInput(event) {
      // IE 11 Workaround for input placeholder
      if (!isKeydown.current) {
        return;
      }
      isKeydown.current = false;
      updateValueOnInput(event, event.target.value);
      props.onInput && props.onInput(event);
    };
    var updateValueOnInput = function updateValueOnInput(event, rawValue) {
      try {
        var value = parseValueFromString(rawValue);
        if (isValidSelection(value)) {
          updateModel(event, value);
          updateViewDate(event, value.length ? value[0] : value);
        }
      } catch (err) {
        //invalid date
        var _value = props.keepInvalid ? rawValue : null;
        updateModel(event, _value);
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
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
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
      switch (event.which) {
        //tab
        case 9:
          trapFocus(event);
          break;

        //escape
        case 27:
          hide(null, reFocusInputField);
          event.preventDefault();
          break;
      }
    };
    var trapFocus = function trapFocus(event) {
      event.preventDefault();
      var focusableElements = utils.DomHandler.getFocusableElements(overlayRef.current);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    };
    var updateFocus = function updateFocus() {
      if (navigation.current) {
        if (navigation.current.button) {
          initFocusableCell();
          if (navigation.current.backward) utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-prev').focus();else utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-next').focus();
        } else {
          var cell;
          if (navigation.current.backward) {
            var cells = utils.DomHandler.find(overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
            cell = cells[cells.length - 1];
          } else {
            cell = utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
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
      if (props.view === 'month') {
        var cells = utils.DomHandler.find(overlayRef.current, '.p-monthpicker .p-monthpicker-month');
        var selectedCell = utils.DomHandler.findSingle(overlayRef.current, '.p-monthpicker .p-monthpicker-month.p-highlight');
        cells.forEach(function (cell) {
          return cell.tabIndex = -1;
        });
        cell = selectedCell || cells[0];
      } else {
        cell = utils.DomHandler.findSingle(overlayRef.current, 'span.p-highlight');
        if (!cell) {
          var todayCell = utils.DomHandler.findSingle(overlayRef.current, 'td.p-datepicker-today span:not(.p-disabled)');
          cell = todayCell || utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
        }
      }
      if (cell) {
        cell.tabIndex = '0';
      }
    };
    var navBackward = function navBackward(event) {
      if (props.disabled) {
        event.preventDefault();
        return;
      }
      var newViewDate = new Date(getViewDate().getTime());
      newViewDate.setDate(1);
      if (currentView === 'date') {
        if (newViewDate.getMonth() === 0) {
          newViewDate.setMonth(11);
          newViewDate.setFullYear(decrementYear());
          setCurrentMonth(11);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() - 1);
          setCurrentMonth(function (prevState) {
            return prevState - 1;
          });
        }
      } else if (currentView === 'month') {
        var newYear = newViewDate.getFullYear() - 1;
        if (props.yearNavigator) {
          var minYear = parseInt(props.yearRange.split(':')[0], 10);
          if (newYear < minYear) {
            newYear = minYear;
          }
        }
        newViewDate.setFullYear(newYear);
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
      var newViewDate = new Date(getViewDate().getTime());
      newViewDate.setDate(1);
      if (currentView === 'date') {
        if (newViewDate.getMonth() === 11) {
          newViewDate.setMonth(0);
          newViewDate.setFullYear(incrementYear());
          setCurrentMonth(0);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() + 1);
          setCurrentMonth(function (prevState) {
            return prevState + 1;
          });
        }
      } else if (currentView === 'month') {
        var newYear = newViewDate.getFullYear() + 1;
        if (props.yearNavigator) {
          var maxYear = parseInt(props.yearRange.split(':')[1], 10);
          if (newYear > maxYear) {
            newYear = maxYear;
          }
        }
        newViewDate.setFullYear(newYear);
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
      var _currentYear = currentYear - 1;
      setCurrentYear(_currentYear);
      if (props.yearNavigator && _currentYear < yearOptions[0]) {
        var difference = yearOptions[yearOptions.length - 1] - yearOptions[0];
        populateYearOptions(yearOptions[0] - difference, yearOptions[yearOptions.length - 1] - difference);
      }
      return _currentYear;
    };
    var incrementYear = function incrementYear() {
      var _currentYear = currentYear + 1;
      setCurrentYear(_currentYear);
      if (props.yearNavigator && _currentYear.current > yearOptions[yearOptions.length - 1]) {
        var difference = yearOptions[yearOptions.length - 1] - yearOptions[0];
        populateYearOptions(yearOptions[0] + difference, yearOptions[yearOptions.length - 1] + difference);
      }
      return _currentYear;
    };
    var onMonthDropdownChange = function onMonthDropdownChange(event, value) {
      var currentViewDate = getViewDate();
      var newViewDate = new Date(currentViewDate.getTime());
      newViewDate.setMonth(parseInt(value, 10));
      updateViewDate(event, newViewDate);
    };
    var onYearDropdownChange = function onYearDropdownChange(event, value) {
      var currentViewDate = getViewDate();
      var newViewDate = new Date(currentViewDate.getTime());
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
      updateModel(event, null);
      updateInputfield(null);
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
        repeat(event, null, type, direction);
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
    var repeat = function repeat(event, interval, type, direction) {
      clearTimePickerTimer();
      timePickerTimer.current = setTimeout(function () {
        repeat(event, 100, type, direction);
      }, interval || 500);
      switch (type) {
        case 0:
          if (direction === 1) incrementHour(event);else decrementHour(event);
          break;
        case 1:
          if (direction === 1) incrementMinute(event);else decrementMinute(event);
          break;
        case 2:
          if (direction === 1) incrementSecond(event);else decrementSecond(event);
          break;
        case 3:
          if (direction === 1) incrementMilliSecond(event);else decrementMilliSecond(event);
          break;
      }
    };
    var clearTimePickerTimer = function clearTimePickerTimer() {
      if (timePickerTimer.current) {
        clearTimeout(timePickerTimer.current);
      }
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
            updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
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
            updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
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
      if (validateHour(convertTo24Hour(newHour, !(currentHour > 11)), currentTime)) {
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
        return props.value && props.value instanceof Date ? props.value : getViewDate();
      } else if (isMultipleSelection()) {
        if (props.value && props.value.length) {
          return props.value[props.value.length - 1];
        }
      } else if (isRangeSelection()) {
        if (props.value && props.value.length) {
          var startDate = props.value[0];
          var endDate = props.value[1];
          return endDate || startDate;
        }
      }
      return new Date();
    };
    var isValidDate = function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    };
    var convertTo24Hour = function convertTo24Hour(hour, pm) {
      if (props.hourFormat == '12') {
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
        var viewYear = value.getFullYear();
        var minRangeYear = props.yearRange ? parseInt(props.yearRange.split(':')[0], 10) : null;
        var maxRangeYear = props.yearRange ? parseInt(props.yearRange.split(':')[1], 10) : null;
        var minYear = props.minDate && minRangeYear != null ? Math.max(props.minDate.getFullYear(), minRangeYear) : props.minDate || minRangeYear;
        var maxYear = props.maxDate && maxRangeYear != null ? Math.min(props.maxDate.getFullYear(), maxRangeYear) : props.maxDate || maxRangeYear;
        if (minYear && minYear > viewYear) {
          viewYear = minYear;
        }
        if (maxYear && maxYear < viewYear) {
          viewYear = maxYear;
        }
        value.setFullYear(viewYear);
      }
      if (props.monthNavigator && props.view !== 'month') {
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
      if (props.onViewDateChange) {
        props.onViewDateChange({
          originalEvent: event,
          value: value
        });
      } else {
        viewStateChanged.current = true;
        setViewDateState(value);
      }
      setCurrentMonth(value.getMonth());
      setCurrentYear(value.getFullYear());
    };
    var setNavigationState = function setNavigationState(newViewDate) {
      if (!props.showMinMaxRange || props.view !== 'date' || !overlayRef.current) {
        return;
      }
      var navPrev = utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-prev');
      var navNext = utils.DomHandler.findSingle(overlayRef.current, '.p-datepicker-next');
      if (props.disabled) {
        utils.DomHandler.addClass(navPrev, 'p-disabled');
        utils.DomHandler.addClass(navNext, 'p-disabled');
        return;
      }

      // previous (check first day of month at 00:00:00)
      if (props.minDate) {
        var firstDayOfMonth = new Date(newViewDate.getTime());
        if (firstDayOfMonth.getMonth() === 0) {
          firstDayOfMonth.setMonth(11, 1);
          firstDayOfMonth.setFullYear(firstDayOfMonth.getFullYear() - 1);
        } else {
          firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1, 1);
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
        var lastDayOfMonth = new Date(newViewDate.getTime());
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
      switch (event.which) {
        //down arrow
        case 40:
          {
            cellContent.tabIndex = '-1';
            var cellIndex = utils.DomHandler.index(cell);
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
              var focusCell = nextRow.children[cellIndex].children[0];
              if (utils.DomHandler.hasClass(focusCell, 'p-disabled')) {
                navigation.current = {
                  backward: false
                };
                navForward(event);
              } else {
                nextRow.children[cellIndex].children[0].tabIndex = '0';
                nextRow.children[cellIndex].children[0].focus();
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

        //up arrow
        case 38:
          {
            cellContent.tabIndex = '-1';
            var _cellIndex = utils.DomHandler.index(cell);
            var prevRow = cell.parentElement.previousElementSibling;
            if (prevRow) {
              var _focusCell = prevRow.children[_cellIndex].children[0];
              if (utils.DomHandler.hasClass(_focusCell, 'p-disabled')) {
                navigation.current = {
                  backward: true
                };
                navBackward(event);
              } else {
                _focusCell.tabIndex = '0';
                _focusCell.focus();
              }
            } else {
              navigation.current = {
                backward: true
              };
              navBackward(event);
            }
            event.preventDefault();
            break;
          }

        //left arrow
        case 37:
          {
            cellContent.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              var _focusCell2 = prevCell.children[0];
              if (utils.DomHandler.hasClass(_focusCell2, 'p-disabled')) {
                navigateToMonth(true, groupIndex, event);
              } else {
                _focusCell2.tabIndex = '0';
                _focusCell2.focus();
              }
            } else {
              navigateToMonth(true, groupIndex, event);
            }
            event.preventDefault();
            break;
          }

        //right arrow
        case 39:
          {
            cellContent.tabIndex = '-1';
            var nextCell = cell.nextElementSibling;
            if (nextCell) {
              var _focusCell3 = nextCell.children[0];
              if (utils.DomHandler.hasClass(_focusCell3, 'p-disabled')) {
                navigateToMonth(false, groupIndex, event);
              } else {
                _focusCell3.tabIndex = '0';
                _focusCell3.focus();
              }
            } else {
              navigateToMonth(false, groupIndex, event);
            }
            event.preventDefault();
            break;
          }

        //enter
        case 13:
          {
            onDateSelect(event, date);
            event.preventDefault();
            break;
          }

        //escape
        case 27:
          {
            hide(null, reFocusInputField);
            event.preventDefault();
            break;
          }

        //tab
        case 9:
          {
            trapFocus(event);
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
          var prevMonthContainer = overlayRef.current.children[groupIndex - 1];
          var cells = utils.DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');
          var focusCell = cells[cells.length - 1];
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      } else {
        if (props.numberOfMonths === 1 || groupIndex === props.numberOfMonths - 1) {
          navigation.current = {
            backward: false
          };
          navForward(event);
        } else {
          var nextMonthContainer = overlayRef.current.children[groupIndex + 1];
          var _focusCell4 = utils.DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');
          _focusCell4.tabIndex = '0';
          _focusCell4.focus();
        }
      }
    };
    var onDateSelect = function onDateSelect(event, dateMeta, timeMeta) {
      if (props.disabled || !dateMeta.selectable) {
        event.preventDefault();
        return;
      }
      utils.DomHandler.find(overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(function (cell) {
        return cell.tabIndex = -1;
      });
      event.currentTarget.focus();
      if (isMultipleSelection()) {
        if (isSelected(dateMeta)) {
          var value = props.value.filter(function (date, i) {
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
      if (!props.inline && isSingleSelection() && (!props.showTime || props.hideOnDateTimeSelect)) {
        setTimeout(function () {
          hide('dateselect');
        }, 100);
        if (touchUIMask.current) {
          disableModality();
        }
      }
      event.preventDefault();
    };
    var selectTime = function selectTime(date, timeMeta) {
      if (props.showTime) {
        var hours, minutes, seconds, milliseconds;
        if (timeMeta) {
          hours = timeMeta.hours;
          minutes = timeMeta.minutes;
          seconds = timeMeta.seconds;
          milliseconds = timeMeta.milliseconds;
        } else {
          var time = getCurrentDateTime();
          var _ref2 = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()];
          hours = _ref2[0];
          minutes = _ref2[1];
          seconds = _ref2[2];
          milliseconds = _ref2[3];
        }
        date.setHours(hours);
        date.setMinutes(minutes);
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
      setCurrentView('month');
      event.preventDefault();
    };
    var switchToYearView = function switchToYearView(event) {
      setCurrentView('year');
      event.preventDefault();
    };
    var onMonthSelect = function onMonthSelect(event, month) {
      if (props.view === 'month') {
        onDateSelect(event, {
          year: currentYear,
          month: month,
          day: 1,
          selectable: true
        });
        event.preventDefault();
      } else {
        setCurrentMonth(month);
        createMonthsMeta(month, currentYear);
        var currentDate = new Date(getCurrentDateTime().getTime());
        currentDate.setDate(1); // #2948 always set to 1st of month
        currentDate.setMonth(month);
        currentDate.setYear(currentYear);
        setViewDateState(currentDate);
        setCurrentView('date');
        props.onMonthChange && props.onMonthChange({
          month: month + 1,
          year: currentYear
        });
      }
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
        var newValue = value && value instanceof Date ? new Date(value.getTime()) : value;
        viewStateChanged.current = true;
        props.onChange({
          originalEvent: event,
          value: newValue,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
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
          if (!isOutsideClicked(e)) {
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
          visible: false,
          type: type,
          callback: _hideCallback
        });
      } else {
        setOverlayVisibleState(false);
        _hideCallback();
      }
    };
    var onOverlayEnter = function onOverlayEnter() {
      if (props.autoZIndex) {
        var key = props.touchUI ? 'modal' : 'overlay';
        utils.ZIndexUtils.set(key, overlayRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex[key]);
      }
      alignOverlay();
    };
    var onOverlayEntered = function onOverlayEntered() {
      bindOverlayListener();
      props.onShow && props.onShow();
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var appendDisabled = function appendDisabled() {
      return props.appendTo === 'self' || props.inline;
    };
    var alignOverlay = function alignOverlay() {
      if (props.touchUI) {
        enableModality();
      } else if (overlayRef && overlayRef.current && inputRef && inputRef.current) {
        utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current, props.appendTo || PrimeReact__default["default"].appendTo);
        if (appendDisabled()) {
          utils.DomHandler.relativePosition(overlayRef.current, inputRef.current);
        } else {
          if (currentView === 'date') {
            overlayRef.current.style.width = utils.DomHandler.getOuterWidth(overlayRef.current) + 'px';
            overlayRef.current.style.minWidth = utils.DomHandler.getOuterWidth(inputRef.current) + 'px';
          } else {
            overlayRef.current.style.width = utils.DomHandler.getOuterWidth(inputRef.current) + 'px';
          }
          utils.DomHandler.absolutePosition(overlayRef.current, inputRef.current);
        }
      }
    };
    var enableModality = function enableModality() {
      if (!touchUIMask.current) {
        touchUIMask.current = document.createElement('div');
        touchUIMask.current.style.zIndex = String(utils.ZIndexUtils.get(overlayRef.current) - 1);
        utils.DomHandler.addMultipleClasses(touchUIMask.current, 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay-enter');
        touchUIMaskClickListener.current = function () {
          disableModality();
          hide();
        };
        touchUIMask.current.addEventListener('click', touchUIMaskClickListener.current);
        document.body.appendChild(touchUIMask.current);
        utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    };
    var disableModality = function disableModality() {
      if (touchUIMask.current) {
        utils.DomHandler.addClass(touchUIMask.current, 'p-component-overlay-leave');
        touchUIMask.current.addEventListener('animationend', function () {
          destroyMask();
        });
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
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    };
    var isOutsideClicked = function isOutsideClicked(event) {
      return elementRef.current && !(elementRef.current.isSameNode(event.target) || isNavIconClicked(event.target) || elementRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
    };
    var isNavIconClicked = function isNavIconClicked(target) {
      return utils.DomHandler.hasClass(target, 'p-datepicker-prev') || utils.DomHandler.hasClass(target, 'p-datepicker-prev-icon') || utils.DomHandler.hasClass(target, 'p-datepicker-next') || utils.DomHandler.hasClass(target, 'p-datepicker-next-icon');
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
      var m, y;
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
      var m, y;
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
      var checkDate = new Date(date.getTime());
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
          if (props.minDate.getMonth() > month) {
            validMin = false;
          } else if (props.minDate.getMonth() === month) {
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
          if (props.maxDate.getMonth() < month) {
            validMax = false;
          } else if (props.maxDate.getMonth() === month) {
            if (day > 0 && props.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }
      if (props.disabledDates) {
        validDate = !isDateDisabled(day, month, year);
      }
      if (props.disabledDays) {
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
          if (props.value[1]) return isDateEquals(props.value[0], dateMeta) || isDateEquals(props.value[1], dateMeta) || isDateBetween(props.value[0], props.value[1], dateMeta);else {
            return isDateEquals(props.value[0], dateMeta);
          }
        }
      } else {
        return false;
      }
    };
    var isComparable = function isComparable() {
      return props.value != null && typeof props.value !== 'string';
    };
    var isMonthSelected = function isMonthSelected(month) {
      if (isComparable()) {
        var value = isRangeSelection() ? props.value[0] : props.value;
        return !isMultipleSelection() ? value.getMonth() === month && value.getFullYear() === currentYear : false;
      }
      return false;
    };
    var isYearSelected = function isYearSelected(year) {
      if (isComparable()) {
        var value = isRangeSelection() ? props.value[0] : props.value;
        return !isMultipleSelection() && isComparable() ? value.getFullYear() === year : false;
      }
      return false;
    };
    var switchViewButtonDisabled = function switchViewButtonDisabled() {
      return props.numberOfMonths > 1 || props.disabled;
    };
    var isDateEquals = function isDateEquals(value, dateMeta) {
      if (value && value instanceof Date) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;else return false;
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
    var isDateDisabled = function isDateDisabled(day, month, year) {
      return props.disabledDates ? props.disabledDates.some(function (d) {
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
      }) : false;
    };
    var isDayDisabled = function isDayDisabled(day, month, year) {
      if (props.disabledDays) {
        var weekday = new Date(year, month, day);
        var weekdayNumber = weekday.getDay();
        return props.disabledDays.indexOf(weekdayNumber) !== -1;
      }
      return false;
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
              formattedValue += dateAsString;
              if (i !== value.length - 1) {
                formattedValue += ', ';
              }
            }
          } else if (isRangeSelection()) {
            if (value && value.length) {
              var startDate = value[0];
              var endDate = value[1];
              formattedValue = isValidDate(startDate) ? formatDateTime(startDate) : '';
              if (endDate) {
                formattedValue += isValidDate(endDate) ? ' - ' + formatDateTime(endDate) : '';
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
            formattedValue += ' ' + formatTime(date);
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
        },
        formatNumber = function formatNumber(match, value, len) {
          var num = '' + value;
          if (lookAhead(match)) {
            while (num.length < len) {
              num = '0' + num;
            }
          }
          return num;
        },
        formatName = function formatName(match, value, shortNames, longNames) {
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
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case 'd':
                output += formatNumber('d', date.getDate(), 2);
                break;
              case 'D':
                output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                break;
              case 'o':
                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;
              case 'm':
                output += formatNumber('m', date.getMonth() + 1, 2);
                break;
              case 'M':
                output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                break;
              case 'y':
                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100;
                break;
              case '@':
                output += date.getTime();
                break;
              case '!':
                output += date.getTime() * 10000 + ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
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
        hours -= 12;
      }
      if (props.hourFormat === '12') {
        output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
      } else {
        output += hours < 10 ? '0' + hours : hours;
      }
      output += ':';
      output += minutes < 10 ? '0' + minutes : minutes;
      if (props.showSeconds) {
        output += ':';
        output += seconds < 10 ? '0' + seconds : seconds;
      }
      if (props.showMillisec) {
        output += '.';
        output += milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') + milliseconds : milliseconds;
      }
      if (props.hourFormat === '12') {
        output += date.getHours() > 11 ? ' PM' : ' AM';
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
      } else {
        if (props.showTime) {
          date = parseDate(parts[0], getDateFormat());
          populateTime(date, parts[1], parts[2]);
        } else {
          date = parseDate(text, getDateFormat());
        }
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
        if (props.hourFormat === '12' && h !== 12 && ampm === 'PM') {
          h += 12;
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
      var iFormat,
        dim,
        extra,
        iValue = 0,
        shortYearCutoff = typeof props.shortYearCutoff !== 'string' ? props.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(props.shortYearCutoff, 10),
        year = -1,
        month = -1,
        day = -1,
        doy = -1,
        literal = false,
        date,
        lookAhead = function lookAhead(match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        getNumber = function getNumber(match) {
          var isDoubled = lookAhead(match),
            size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2,
            minSize = match === 'y' ? size : 1,
            digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
            num = value.substring(iValue).match(digits);
          if (!num) {
            throw new Error('Missing number at position ' + iValue);
          }
          iValue += num[0].length;
          return parseInt(num[0], 10);
        },
        getName = function getName(match, shortNames, longNames) {
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
              iValue += name.length;
              break;
            }
          }
          if (index !== -1) {
            return index + 1;
          } else {
            throw new Error('Unknown name at position ' + iValue);
          }
        },
        checkLiteral = function checkLiteral() {
          if (value.charAt(iValue) !== format.charAt(iFormat)) {
            throw new Error('Unexpected literal at position ' + iValue);
          }
          iValue++;
        };
      if (props.view === 'month') {
        day = 1;
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
        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
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
          day -= dim;
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
      var unbindMaskEvents = null;
      var viewDate = getViewDate(props.viewDate);
      validateDate(viewDate);
      setViewDateState(viewDate);
      setCurrentMonth(viewDate.getMonth());
      setCurrentYear(viewDate.getFullYear());
      setCurrentView(props.view);
      if (props.inline) {
        overlayRef && overlayRef.current.setAttribute(attributeSelector, '');
        if (!props.disabled) {
          initFocusableCell();
          if (props.numberOfMonths === 1) {
            overlayRef.current.style.width = utils.DomHandler.getOuterWidth(overlayRef.current) + 'px';
          }
        }
      } else if (props.mask) {
        unbindMaskEvents = utils.mask(inputRef.current, {
          mask: props.mask,
          readOnly: props.readOnlyInput || props.disabled,
          onChange: function onChange(e) {
            !ignoreMaskChange.current && updateValueOnInput(e.originalEvent, e.value);
            ignoreMaskChange.current = false;
          },
          onBlur: function onBlur() {
            ignoreMaskChange.current = true;
          }
        }).unbindEvents;
      }
      if (props.value) {
        updateInputfield(props.value);
        setValue(props.value);
      }
      return function () {
        props.mask && unbindMaskEvents();
      };
    });
    hooks.useUpdateEffect(function () {
      setCurrentView(props.view);
    }, [props.view]);
    hooks.useUpdateEffect(function () {
      if (!props.onViewDateChange && !viewStateChanged.current) {
        setValue(props.value);
      }
    }, [props.onViewDateChange, props.value]);
    hooks.useUpdateEffect(function () {
      var newDate = props.value;
      if (previousValue !== newDate) {
        updateInputfield(newDate);

        // #3516 view date not updated when value set programatically
        if (!visible && newDate) {
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
      }
    }, [props.value, visible]);
    hooks.useUpdateEffect(function () {
      updateInputfield(props.value);
    }, [props.dateFormat, props.hourFormat, props.timeOnly, props.showSeconds, props.showMillisec]);
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
      if (!prevPropValue && propValue || propValue && propValue instanceof Date && propValue.getTime() !== prevPropValue.getTime()) {
        var viewDate = props.viewDate && isValidDate(props.viewDate) ? props.viewDate : propValue && isValidDate(propValue) ? propValue : new Date();
        validateDate(viewDate);
        setViewDateState(viewDate);
        viewStateChanged.current = true;
      }
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
      return /*#__PURE__*/React__namespace.createElement("button", _extends({
        type: "button",
        className: "p-datepicker-prev"
      }, navigatorProps), /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-datepicker-prev-icon pi pi-chevron-left"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
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
      return /*#__PURE__*/React__namespace.createElement("button", _extends({
        type: "button",
        className: "p-datepicker-next"
      }, navigatorProps), /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-datepicker-next-icon pi pi-chevron-right"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createTitleMonthElement = function createTitleMonthElement(month) {
      var monthNames = PrimeReact.localeOption('monthNames', props.locale);
      if (props.monthNavigator && props.view !== 'month') {
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
        var _content = /*#__PURE__*/React__namespace.createElement("select", {
          className: "p-datepicker-month",
          onChange: function onChange(e) {
            return onMonthDropdownChange(e, e.target.value);
          },
          value: viewMonth
        }, displayedMonthOptions.map(function (option) {
          return /*#__PURE__*/React__namespace.createElement("option", {
            key: option.label,
            value: option.value
          }, option.label);
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
      return currentView === 'date' && /*#__PURE__*/React__namespace.createElement("button", {
        className: "p-datepicker-month p-link",
        onClick: switchToMonthView,
        disabled: switchViewButtonDisabled()
      }, monthNames[month]);
    };
    var createTitleYearElement = function createTitleYearElement(metaYear) {
      if (props.yearNavigator) {
        var _yearOptions2 = [];
        var years = props.yearRange.split(':');
        var yearStart = parseInt(years[0], 10);
        var yearEnd = parseInt(years[1], 10);
        for (var i = yearStart; i <= yearEnd; i++) {
          _yearOptions2.push(i);
        }
        var viewDate = getViewDate();
        var viewYear = viewDate.getFullYear();
        var displayedYearNames = _yearOptions2.filter(function (year) {
          return !(props.minDate && props.minDate.getFullYear() > year) && !(props.maxDate && props.maxDate.getFullYear() < year);
        });
        var _content2 = /*#__PURE__*/React__namespace.createElement("select", {
          className: "p-datepicker-year",
          onChange: function onChange(e) {
            return onYearDropdownChange(e, e.target.value);
          },
          value: viewYear
        }, displayedYearNames.map(function (year) {
          return /*#__PURE__*/React__namespace.createElement("option", {
            key: year,
            value: year
          }, year);
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
      var displayYear = props.inline ? metaYear : currentYear;
      return currentView !== 'year' && /*#__PURE__*/React__namespace.createElement("button", {
        className: "p-datepicker-year p-link",
        onClick: switchToYearView,
        disabled: switchViewButtonDisabled()
      }, displayYear);
    };
    var createTitleDecadeElement = function createTitleDecadeElement() {
      var years = yearPickerValues();
      if (currentView === 'year') {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-datepicker-decade"
        }, props.decadeTemplate ? props.decadeTemplate(years) : /*#__PURE__*/React__namespace.createElement("span", null, "".concat(yearPickerValues()[0], " - ").concat(yearPickerValues()[yearPickerValues().length - 1])));
      }
      return null;
    };
    var createTitle = function createTitle(monthMetaData) {
      var month = createTitleMonthElement(monthMetaData.month);
      var year = createTitleYearElement(monthMetaData.year);
      var decade = createTitleDecadeElement();
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-title"
      }, month, year, decade);
    };
    var createDayNames = function createDayNames(weekDays) {
      var dayNames = weekDays.map(function (weekDay, index) {
        return /*#__PURE__*/React__namespace.createElement("th", {
          key: "".concat(weekDay, "-").concat(index),
          scope: "col"
        }, /*#__PURE__*/React__namespace.createElement("span", null, weekDay));
      });
      if (props.showWeek) {
        var weekHeader = /*#__PURE__*/React__namespace.createElement("th", {
          scope: "col",
          key: "wn",
          className: "p-datepicker-weekheader p-disabled"
        }, /*#__PURE__*/React__namespace.createElement("span", null, PrimeReact.localeOption('weekHeader', props.locale)));
        return [weekHeader].concat(_toConsumableArray(dayNames));
      }
      return dayNames;
    };
    var createDateCellContent = function createDateCellContent(date, className, groupIndex) {
      var content = props.dateTemplate ? props.dateTemplate(date) : date.day;
      return /*#__PURE__*/React__namespace.createElement("span", {
        className: className,
        onClick: function onClick(e) {
          return onDateSelect(e, date);
        },
        onKeyDown: function onKeyDown(e) {
          return onDateCellKeydown(e, date, groupIndex);
        }
      }, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createWeek = function createWeek(weekDates, weekNumber, groupIndex) {
      var week = weekDates.map(function (date) {
        var selected = isSelected(date);
        var cellClassName = utils.classNames({
          'p-datepicker-other-month': date.otherMonth,
          'p-datepicker-today': date.today
        });
        var dateClassName = utils.classNames({
          'p-highlight': selected,
          'p-disabled': !date.selectable
        });
        var content = date.otherMonth && !props.showOtherMonths ? null : createDateCellContent(date, dateClassName, groupIndex);
        return /*#__PURE__*/React__namespace.createElement("td", {
          key: date.day,
          className: cellClassName
        }, content);
      });
      if (props.showWeek) {
        var weekNumberCell = /*#__PURE__*/React__namespace.createElement("td", {
          key: 'wn' + weekNumber,
          className: "p-datepicker-weeknumber"
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-disabled"
        }, weekNumber));
        return [weekNumberCell].concat(_toConsumableArray(week));
      }
      return week;
    };
    var createDates = function createDates(monthMetaData, groupIndex) {
      return monthMetaData.dates.map(function (weekDates, index) {
        return /*#__PURE__*/React__namespace.createElement("tr", {
          key: index
        }, createWeek(weekDates, monthMetaData.weekNumbers[index], groupIndex));
      });
    };
    var createDateViewGrid = function createDateViewGrid(monthMetaData, weekDays, groupIndex) {
      var dayNames = createDayNames(weekDays);
      var dates = createDates(monthMetaData, groupIndex);
      return currentView === 'date' && /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-calendar-container"
      }, /*#__PURE__*/React__namespace.createElement("table", {
        className: "p-datepicker-calendar"
      }, /*#__PURE__*/React__namespace.createElement("thead", null, /*#__PURE__*/React__namespace.createElement("tr", null, dayNames)), /*#__PURE__*/React__namespace.createElement("tbody", null, dates)));
    };
    var createMonth = function createMonth(monthMetaData, index) {
      var weekDays = createWeekDaysMeta();
      var backwardNavigator = createBackwardNavigator(index === 0);
      var forwardNavigator = createForwardNavigator(props.numberOfMonths === 1 || index === props.numberOfMonths - 1);
      var title = createTitle(monthMetaData);
      var dateViewGrid = createDateViewGrid(monthMetaData, weekDays, index);
      var header = props.headerTemplate ? props.headerTemplate() : null;
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: monthMetaData.month,
        className: "p-datepicker-group"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-header"
      }, header, backwardNavigator, title, forwardNavigator), dateViewGrid);
    };
    var createMonths = function createMonths(monthsMetaData) {
      var groups = monthsMetaData.map(createMonth);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-group-container"
      }, groups);
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
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-group-container"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-group"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-header"
      }, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-datepicker-title"
      }, yearElement, decade), forwardNavigator))));
    };
    var createDatePicker = function createDatePicker() {
      if (!props.timeOnly) {
        if (props.view === 'date') {
          return createDateView();
        } else {
          return createMonthYearView();
        }
      }
      return null;
    };
    var createHourPicker = function createHourPicker() {
      var currentTime = getCurrentDateTime();
      var minute = doStepMinute(currentTime.getMinutes());
      var hour = currentTime.getHours();

      // #3770 account for step minutes rolling to next hour
      hour = minute > 59 ? hour + 1 : hour;
      if (props.hourFormat === '12') {
        if (hour === 0) hour = 12;else if (hour > 11 && hour !== 12) hour = hour - 12;
      }
      var hourDisplay = hour < 10 ? '0' + hour : hour;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hour-picker"
      }, /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 0, 1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "pi pi-chevron-up"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", null, hourDisplay), /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 0, -1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "pi pi-chevron-down"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    };
    var createMinutePicker = function createMinutePicker() {
      var currentTime = getCurrentDateTime();
      var minute = doStepMinute(currentTime.getMinutes());
      minute = minute > 59 ? minute - 60 : minute;
      var minuteDisplay = minute < 10 ? '0' + minute : minute;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-minute-picker"
      }, /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 1, 1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "pi pi-chevron-up"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", null, minuteDisplay), /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return onTimePickerElementMouseDown(e, 1, -1);
        },
        onMouseUp: onTimePickerElementMouseUp,
        onMouseLeave: onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "pi pi-chevron-down"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    };
    var createSecondPicker = function createSecondPicker() {
      if (props.showSeconds) {
        var currentTime = getCurrentDateTime();
        var second = currentTime.getSeconds();
        var secondDisplay = second < 10 ? '0' + second : second;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-second-picker"
        }, /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 2, 1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", null, secondDisplay), /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 2, -1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createMiliSecondPicker = function createMiliSecondPicker() {
      if (props.showMillisec) {
        var currentTime = getCurrentDateTime();
        var millisecond = currentTime.getMilliseconds();
        var millisecondDisplay = millisecond < 100 ? (millisecond < 10 ? '00' : '0') + millisecond : millisecond;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-millisecond-picker"
        }, /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 3, 1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", null, millisecondDisplay), /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return onTimePickerElementMouseDown(e, 3, -1);
          },
          onMouseUp: onTimePickerElementMouseUp,
          onMouseLeave: onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createAmPmPicker = function createAmPmPicker() {
      if (props.hourFormat === '12') {
        var currentTime = getCurrentDateTime();
        var hour = currentTime.getHours();
        var display = hour > 11 ? 'PM' : 'AM';
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-ampm-picker"
        }, /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onClick: toggleAmPm
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), /*#__PURE__*/React__namespace.createElement("span", null, display), /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-link",
          onClick: toggleAmPm
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
      }
      return null;
    };
    var createSeparator = function createSeparator(separator) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-separator"
      }, /*#__PURE__*/React__namespace.createElement("span", null, separator));
    };
    var createTimePicker = function createTimePicker() {
      if ((props.showTime || props.timeOnly) && currentView === 'date') {
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-timepicker"
        }, createHourPicker(), createSeparator(':'), createMinutePicker(), props.showSeconds && createSeparator(':'), createSecondPicker(), props.showMillisec && createSeparator('.'), createMiliSecondPicker(), props.hourFormat === '12' && createSeparator(':'), createAmPmPicker());
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
          className: props.inputClassName,
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
          "aria-labelledby": props.ariaLabelledBy,
          inputMode: props.inputMode,
          tooltip: props.tooltip,
          tooltipOptions: props.tooltipOptions
        });
      }
      return null;
    };
    var createButton = function createButton() {
      if (props.showIcon) {
        return /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          icon: props.icon,
          onClick: onButtonClick,
          tabIndex: "-1",
          disabled: props.disabled,
          className: "p-datepicker-trigger"
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
    var createButtonBar = function createButtonBar() {
      if (props.showButtonBar) {
        var todayClassName = utils.classNames('p-button-text', props.todayButtonClassName);
        var clearClassName = utils.classNames('p-button-text', props.clearButtonClassName);
        var _localeOptions4 = PrimeReact.localeOptions(props.locale),
          today = _localeOptions4.today,
          clear = _localeOptions4.clear;
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-datepicker-buttonbar"
        }, /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: today,
          onClick: onTodayButtonClick,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          },
          className: todayClassName
        }), /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: clear,
          onClick: onClearButtonClick,
          onKeyDown: function onKeyDown(e) {
            return onContainerButtonKeydown(e);
          },
          className: clearClassName
        }));
      }
      return null;
    };
    var createFooter = function createFooter() {
      if (props.footerTemplate) {
        var _content3 = props.footerTemplate();
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-datepicker-footer"
        }, _content3);
      }
      return null;
    };
    var createMonthPicker = function createMonthPicker() {
      if (currentView === 'month') {
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-monthpicker"
        }, monthPickerValues().map(function (m, i) {
          return /*#__PURE__*/React__namespace.createElement("span", {
            onClick: function onClick(event) {
              return onMonthSelect(event, i);
            },
            key: "month".concat(i + 1),
            className: utils.classNames('p-monthpicker-month', {
              'p-highlight': isMonthSelected(i),
              'p-disabled': !isSelectable(0, i, currentYear)
            })
          }, m);
        }));
      }
      return null;
    };
    var createYearPicker = function createYearPicker() {
      if (currentView === 'year') {
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-yearpicker"
        }, yearPickerValues().map(function (y, i) {
          return /*#__PURE__*/React__namespace.createElement("span", {
            onClick: function onClick(event) {
              return onYearSelect(event, y);
            },
            key: "year".concat(i + 1),
            className: utils.classNames('p-yearpicker-year', {
              'p-highlight': isYearSelected(y),
              'p-disabled': !(isSelectable(0, 0, y) || isSelectable(30, 11, y))
            })
          }, y);
        }));
      }
      return null;
    };
    var otherProps = CalendarBase.getOtherProps(props);
    var className = utils.classNames('p-calendar p-component p-inputwrapper', props.className, (_classNames = {}, _defineProperty(_classNames, "p-calendar-w-btn p-calendar-w-btn-".concat(props.iconPos), props.showIcon), _defineProperty(_classNames, 'p-calendar-disabled', props.disabled), _defineProperty(_classNames, 'p-calendar-timeonly', props.timeOnly), _defineProperty(_classNames, 'p-inputwrapper-filled', props.value || utils.DomHandler.hasClass(inputRef.current, 'p-filled') && inputRef.current.value !== ''), _defineProperty(_classNames, 'p-inputwrapper-focus', focusedState), _classNames));
    var panelClassName = utils.classNames('p-datepicker p-component', props.panelClassName, {
      'p-datepicker-inline': props.inline,
      'p-disabled': props.disabled,
      'p-datepicker-timeonly': props.timeOnly,
      'p-datepicker-multiple-month': props.numberOfMonths > 1,
      'p-datepicker-monthpicker': currentView === 'month',
      'p-datepicker-touch-ui': props.touchUI,
      'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
      'p-ripple-disabled': PrimeReact__default["default"].ripple === false
    });
    var content = createContent();
    var datePicker = createDatePicker();
    var timePicker = createTimePicker();
    var buttonBar = createButtonBar();
    var footer = createFooter();
    var monthPicker = createMonthPicker();
    var yearPicker = createYearPicker();
    return /*#__PURE__*/React__namespace.createElement("span", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps), content, /*#__PURE__*/React__namespace.createElement(CalendarPanel, {
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
      transitionOptions: props.transitionOptions
    }, datePicker, timePicker, monthPicker, yearPicker, buttonBar, footer));
  }));
  Calendar.displayName = 'Calendar';

  exports.Calendar = Calendar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.hooks, primereact.inputtext, primereact.overlayservice, primereact.ripple, primereact.utils, primereact.csstransition, primereact.portal);
