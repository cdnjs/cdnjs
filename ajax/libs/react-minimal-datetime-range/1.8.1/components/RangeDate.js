"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTransitionGroup = require("react-transition-group");

var _locale = _interopRequireDefault(require("./locale.js"));

var _const = require("./const");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TODAY = new Date();
var YEAR = TODAY.getFullYear();
var MONTH = TODAY.getMonth() + 1;
var DATE = TODAY.getDate();
var ITEM_HEIGHT = 40;
var Index = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var selected = _ref.selected,
      setSelected = _ref.setSelected,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'en-us' : _ref$locale,
      _ref$defaultDateStart = _ref.defaultDateStart,
      defaultDateStart = _ref$defaultDateStart === void 0 ? '' : _ref$defaultDateStart,
      _ref$defaultDateEnd = _ref.defaultDateEnd,
      defaultDateEnd = _ref$defaultDateEnd === void 0 ? '' : _ref$defaultDateEnd,
      _ref$rangeDirection = _ref.rangeDirection,
      rangeDirection = _ref$rangeDirection === void 0 ? 'start' : _ref$rangeDirection,
      _ref$startDatePickedA = _ref.startDatePickedArray,
      startDatePickedArray = _ref$startDatePickedA === void 0 ? [] : _ref$startDatePickedA,
      _ref$endDatePickedArr = _ref.endDatePickedArray,
      endDatePickedArray = _ref$endDatePickedArr === void 0 ? [] : _ref$endDatePickedArr,
      _ref$handleChooseStar = _ref.handleChooseStartDate,
      handleChooseStartDate = _ref$handleChooseStar === void 0 ? function () {} : _ref$handleChooseStar,
      _ref$handleChooseEndD = _ref.handleChooseEndDate,
      handleChooseEndDate = _ref$handleChooseEndD === void 0 ? function () {} : _ref$handleChooseEndD,
      _ref$currentDateObjSt = _ref.currentDateObjStart,
      currentDateObjStart = _ref$currentDateObjSt === void 0 ? function () {} : _ref$currentDateObjSt,
      _ref$currentDateObjEn = _ref.currentDateObjEnd,
      currentDateObjEnd = _ref$currentDateObjEn === void 0 ? function () {} : _ref$currentDateObjEn,
      _ref$setCurrentDateOb = _ref.setCurrentDateObjStart,
      setCurrentDateObjStart = _ref$setCurrentDateOb === void 0 ? function () {} : _ref$setCurrentDateOb,
      _ref$setCurrentDateOb2 = _ref.setCurrentDateObjEnd,
      setCurrentDateObjEnd = _ref$setCurrentDateOb2 === void 0 ? function () {} : _ref$setCurrentDateOb2,
      _ref$markedDates = _ref.markedDates,
      markedDates = _ref$markedDates === void 0 ? [] : _ref$markedDates;
  var markedDatesHash = (0, _react.useMemo)(function () {
    var res = {};

    if (markedDates && markedDates.length) {
      var isValid = true;

      for (var i = 0; i < markedDates.length; i += 1) {
        if (!(0, _utils.isValidDate)(markedDates[i])) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        markedDates.forEach(function (d) {
          res[d] = true;
        });
      }
    }

    return res;
  }, [markedDates]);
  var LOCALE_DATA = (0, _react.useMemo)(function () {
    return _locale["default"][locale] ? _locale["default"][locale] : _locale["default"]['en-us'];
  }, [locale]);
  var defaultDateDateStart = DATE;
  var defaultDateMonthStart = MONTH;
  var defaultDateYearStart = YEAR;
  var defaultDateDateEnd = defaultDateDateStart;
  var defaultDateMonthEnd;
  var defaultDateYearEnd = defaultDateYearStart;

  if (defaultDateMonthStart === 12) {
    defaultDateMonthEnd = 1;
    defaultDateYearEnd = defaultDateYearStart + 1;
  } else {
    defaultDateMonthEnd = defaultDateMonthStart + 1;
  }

  var isDefaultDateValidStart = (0, _react.useMemo)(function () {
    return (0, _utils.isValidDate)(defaultDateStart);
  }, [defaultDateStart]);

  if (isDefaultDateValidStart) {
    var dateStr = defaultDateStart.split('-');
    defaultDateYearStart = Number(dateStr[0]);
    defaultDateMonthStart = Number(dateStr[1]);
    defaultDateDateStart = Number(dateStr[2]);
  }

  var isDefaultDateValidEnd = (0, _react.useMemo)(function () {
    return (0, _utils.isValidDate)(defaultDateEnd);
  }, [defaultDateEnd]);

  if (isDefaultDateValidEnd) {
    var _dateStr = defaultDateEnd.split('-');

    defaultDateYearEnd = Number(_dateStr[0]);
    defaultDateMonthEnd = Number(_dateStr[1]);
    defaultDateDateEnd = Number(_dateStr[2]); // special handle

    if (defaultDateMonthStart === 12) {
      defaultDateMonthEnd = 1;
      defaultDateYearEnd = defaultDateYearStart + 1;
    } else {
      defaultDateMonthEnd = defaultDateMonthStart + 1;
    }
  }

  var showPrevYearArrow = true;
  var showPrevMonthArrow = true;
  var showNextYearArrow = true;
  var showNextMonthArrow = true;

  if (currentDateObjStart.string && currentDateObjEnd.string) {
    if (rangeDirection === 'start') {
      if ((0, _const.isWith1Month)(currentDateObjStart.year, currentDateObjEnd.year, currentDateObjStart.month, currentDateObjEnd.month, 'add')) {
        showNextYearArrow = false;
        showNextMonthArrow = false;
      }
    } else {
      if ((0, _const.isWith1Month)(currentDateObjEnd.year, currentDateObjStart.year, currentDateObjEnd.month, currentDateObjStart.month, 'minus')) {
        showPrevYearArrow = false;
        showPrevMonthArrow = false;
      }
    }
  }

  var defaultDatesStart = (0, _const.getDaysArray)(defaultDateYearStart, defaultDateMonthStart);
  var defaultDatesEnd = (0, _const.getDaysArray)(defaultDateYearEnd, defaultDateMonthEnd);
  var defaultDateMonth;
  var defaultDateDate;
  var defaultDateYear;
  var defaultDates;
  var defaultYearStr;
  var defaultMonthStr;
  var defaultDateStr;

  if (rangeDirection === 'start') {
    defaultDateMonth = defaultDateMonthStart;
    defaultDateDate = defaultDateDateStart;
    defaultDateYear = defaultDateYearStart;
    defaultDates = defaultDatesStart;
    defaultYearStr = (0, _const.formatDateString)(defaultDateYearStart);
    defaultMonthStr = (0, _const.formatDateString)(defaultDateMonthStart);
    defaultDateStr = (0, _const.formatDateString)(defaultDateDateStart);
  } else {
    defaultDateMonth = defaultDateMonthEnd;
    defaultDateDate = defaultDateDateEnd;
    defaultDateYear = defaultDateYearEnd;
    defaultDates = defaultDatesEnd;
    defaultYearStr = (0, _const.formatDateString)(defaultDateYearEnd);
    defaultMonthStr = (0, _const.formatDateString)(defaultDateMonthEnd);
    defaultDateStr = (0, _const.formatDateString)(defaultDateDateEnd);
  }

  (0, _react.useEffect)(function () {
    if (rangeDirection === 'start') {
      setCurrentDateObjStart({
        year: defaultDateYear,
        month: defaultDateMonth,
        string: "".concat(defaultDateYear, "-").concat(defaultDateMonth)
      });
    } else {
      setCurrentDateObjEnd({
        year: defaultDateYear,
        month: defaultDateMonth,
        string: "".concat(defaultDateYear, "-").concat(defaultDateMonth)
      });
    }
  }, [rangeDirection, defaultDateYear, defaultDateMonth]);

  var _useState = (0, _react.useState)(defaultDates),
      _useState2 = _slicedToArray(_useState, 2),
      dates = _useState2[0],
      setDates = _useState2[1];

  var _useState3 = (0, _react.useState)({
    year: defaultYearStr,
    month: defaultMonthStr,
    string: "".concat(defaultYearStr, "-").concat(defaultMonthStr)
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      pickedYearMonth = _useState4[0],
      setPickedYearMonth = _useState4[1];

  var _useState5 = (0, _react.useState)({
    year: defaultYearStr,
    month: defaultMonthStr,
    date: defaultDateStr
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      defaultDateObj = _useState6[0],
      setDefaultDateObj = _useState6[1];

  var _useState7 = (0, _react.useState)({
    year: defaultYearStr,
    month: defaultMonthStr,
    date: defaultDateStr
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      pickedDateInfo = _useState8[0],
      setPickedDateInfo = _useState8[1];

  var _useState9 = (0, _react.useState)(_const.NEXT_TRANSITION),
      _useState10 = _slicedToArray(_useState9, 2),
      direction = _useState10[0],
      setDirection = _useState10[1];

  var _useState11 = (0, _react.useState)((0, _const.getYearSet)(defaultDateYear)),
      _useState12 = _slicedToArray(_useState11, 2),
      yearSelectorPanelList = _useState12[0],
      setYearSelectorPanelList = _useState12[1];

  var _useState13 = (0, _react.useState)(defaultDateYear),
      _useState14 = _slicedToArray(_useState13, 2),
      yearSelectorPanel = _useState14[0],
      setYearSelectorPanel = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      showMask = _useState16[0],
      setShowMask = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      showSelectorPanel = _useState18[0],
      setShowSelectorPanel = _useState18[1];

  var $monthSelectorPanel = (0, _react.useRef)(null);
  var onMouseDown = (0, _react.useCallback)(function () {}, []);
  var onMouseUp = (0, _react.useCallback)(function () {}, []);
  (0, _react.useEffect)(function () {
    setDates((0, _const.getDaysArray)(Number(pickedYearMonth.year), Number(pickedYearMonth.month)));
  }, [pickedYearMonth]);
  var pickYear = (0, _react.useCallback)(function (year, direction) {
    year = Number(year);

    if (direction === _const.PREV_TRANSITION) {
      year = year - 1;
    } else {
      year = year + 1;
    }

    var newData = _objectSpread(_objectSpread({}, pickedYearMonth), {}, {
      year: year,
      string: "".concat(year, "-").concat(pickedYearMonth.month)
    });

    setPickedYearMonth(newData);

    if (rangeDirection === 'start') {
      setCurrentDateObjStart(newData);
    } else {
      setCurrentDateObjEnd(newData);
    }

    setDirection(direction);
  }, [pickedYearMonth]);
  var pickMonth = (0, _react.useCallback)(function (month, direction) {
    month = Number(month);
    var year = Number(pickedYearMonth.year);

    if (direction === _const.PREV_TRANSITION) {
      if (month === 1) {
        month = 12;
        year = year - 1;
      } else {
        month = month - 1;
      }
    } else {
      if (month === 12) {
        month = 1;
        year = year + 1;
      } else {
        month = month + 1;
      }
    }

    var yearStr = String(year);
    var monthStr = (0, _const.formatDateString)(month);

    var newData = _objectSpread(_objectSpread({}, pickedYearMonth), {}, {
      year: yearStr,
      month: monthStr,
      string: "".concat(yearStr, "-").concat(monthStr)
    });

    setPickedYearMonth(newData);

    if (rangeDirection === 'start') {
      setCurrentDateObjStart(newData);
    } else {
      setCurrentDateObjEnd(newData);
    }

    setDirection(direction);
  }, [pickedYearMonth]);
  var pickDate = (0, _react.useCallback)(function (pickedDate) {}, []);
  var changeSelectorPanelYearSet = (0, _react.useCallback)(function (yearSelectorPanel, direction) {
    setDirection(direction);
    setYearSelectorPanel(yearSelectorPanel);
    setYearSelectorPanelList((0, _const.getYearSet)(yearSelectorPanel));
  }, []);
  var handleShowSelectorPanel = (0, _react.useCallback)(function () {
    setShowSelectorPanel(!showSelectorPanel);
    setShowMask(!showMask);
  }, [showSelectorPanel, showMask]);
  var transitionContainerStyle;
  var content;

  if (dates.length) {
    var row = dates.length / _const.WEEK_NUMBER;
    var rowIndex = 1;
    var rowObj = {};
    dates.map(function (item, key) {
      if (key < rowIndex * _const.WEEK_NUMBER) {
        if (!rowObj[rowIndex]) {
          rowObj[rowIndex] = [];
        }

        rowObj[rowIndex].push(item);
      } else {
        rowIndex = rowIndex + 1;

        if (!rowObj[rowIndex]) {
          rowObj[rowIndex] = [];
        }

        rowObj[rowIndex].push(item);
      }
    });
    content = /*#__PURE__*/_react["default"].createElement(CalendarBody, {
      selected: selected,
      setSelected: setSelected,
      startDatePickedArray: startDatePickedArray,
      endDatePickedArray: endDatePickedArray,
      handleChooseStartDate: handleChooseStartDate,
      handleChooseEndDate: handleChooseEndDate,
      rangeDirection: rangeDirection,
      data: rowObj,
      pickedYearMonth: pickedYearMonth,
      pickedDateInfo: pickedDateInfo,
      onClick: pickDate,
      key: pickedYearMonth.string,
      markedDatesHash: markedDatesHash
    });
    transitionContainerStyle = {
      height: "".concat(row * ITEM_HEIGHT, "px")
    };
  }

  var captionHtml = LOCALE_DATA.weeks.map(function (item, key) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "react-minimal-datetime-range-calendar__table-caption react-minimal-datetime-range-calendar__table-cel no-border",
      key: key
    }, item);
  });
  var selectorPanelClass = (0, _utils.cx)('react-minimal-datetime-range-dropdown', 'react-minimal-datetime-range-calendar__selector-panel', showSelectorPanel && 'visible');
  var selectorPanelMonthHtml = LOCALE_DATA.months.map(function (item, key) {
    var itemMonth = key + 1;
    var monthItemClass = (0, _utils.cx)('react-minimal-datetime-range-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
    var month = itemMonth - 1;
    var direction = _const.NEXT_TRANSITION;

    if (itemMonth < pickedYearMonth.month) {
      direction = _const.PREV_TRANSITION;
      month = itemMonth + 1;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: monthItemClass,
      onClick: itemMonth !== pickedYearMonth.month ? function () {
        return pickMonth(month, direction);
      } : function () {
        return;
      },
      key: key
    }, /*#__PURE__*/_react["default"].createElement("div", null, item));
  });
  var selectorPanelYearHtml;

  if (yearSelectorPanelList.length) {
    selectorPanelYearHtml = yearSelectorPanelList.map(function (item, key) {
      var yearItemClass = (0, _utils.cx)('react-minimal-datetime-range-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
      var year = item - 1;
      var direction = _const.NEXT_TRANSITION;

      if (item < pickedYearMonth.year) {
        direction = _const.PREV_TRANSITION;
        year = item + 1;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: yearItemClass,
        onClick: item !== pickedYearMonth.year ? function () {
          return pickYear(year, direction);
        } : function () {
          return;
        },
        key: key
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          verticalAlign: 'middle'
        }
      }, item));
    });
  }

  var classNames = direction == _const.NEXT_TRANSITION ? 'forward' : 'backward';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _utils.cx)('react-minimal-datetime-range-calendar', 'react-minimal-datetime-range-calendar--range')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-calendar__header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: selectorPanelClass,
    ref: $monthSelectorPanel,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onTouchEnd: onMouseDown,
    onTouchCancel: onMouseUp
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-dropdown-calendar__menu"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-dropdown-calendar__month"
  }, selectorPanelMonthHtml), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: '10px'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-0-5"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    style: {
      verticalAlign: 'middle'
    },
    onClick: function onClick() {
      return changeSelectorPanelYearSet(yearSelectorPanel - _const.SELECTOR_YEAR_SET_NUMBER, _const.PREV_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-9"
  }, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.TransitionGroup, {
    className: "react-minimal-datetime-range-calendar__selector-panel-year-set-container",
    childFactory: function childFactory(child) {
      return /*#__PURE__*/_react["default"].cloneElement(child, {
        classNames: classNames
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
    key: yearSelectorPanelList,
    timeout: {
      enter: 300,
      exit: 300
    },
    className: "react-minimal-datetime-range-dropdown-calendar__year",
    classNames: classNames
  }, /*#__PURE__*/_react["default"].createElement("div", null, selectorPanelYearHtml)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-0-5"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    style: {
      verticalAlign: 'middle'
    },
    onClick: function onClick() {
      return changeSelectorPanelYearSet(yearSelectorPanel + _const.SELECTOR_YEAR_SET_NUMBER, _const.NEXT_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-3"
  }, showPrevYearArrow && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range-calendar__previous",
    onClick: function onClick() {
      return pickYear(pickedYearMonth.year, _const.PREV_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fill: "none",
    d: "M24 24H0V0h24v24z"
  }))), showPrevMonthArrow && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-previous",
    onClick: function onClick() {
      return pickMonth(pickedYearMonth.month, _const.PREV_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-6"
  }, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.TransitionGroup, {
    className: "react-minimal-datetime-range-calendar__title-container",
    childFactory: function childFactory(child) {
      return /*#__PURE__*/_react["default"].cloneElement(child, {
        classNames: classNames
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
    key: pickedYearMonth.string,
    timeout: {
      enter: 300,
      exit: 300
    },
    className: "react-minimal-datetime-range-calendar__title",
    style: {
      left: '0'
    },
    classNames: classNames
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-minimal-datetime-range-calendar__clicker",
    onClick: handleShowSelectorPanel,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-minimal-datetime-range-calendar__clicker"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(LOCALE_DATA.months[pickedYearMonth.month - 1]))), /*#__PURE__*/_react["default"].createElement("span", null, "\xA0"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-minimal-datetime-range-calendar__clicker"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(pickedYearMonth.year))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range__col-3"
  }, showNextMonthArrow && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range-calendar__next",
    onClick: function onClick() {
      return pickMonth(pickedYearMonth.month, _const.NEXT_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }))), showNextYearArrow && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__col react-minimal-datetime-range-calendar__sub-next",
    onClick: function onClick() {
      return pickYear(pickedYearMonth.year, _const.NEXT_TRANSITION);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-calendar__content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-calendar__table"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-calendar__table-row"
  }, captionHtml)), /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.TransitionGroup, {
    className: "react-minimal-datetime-range-calendar__body-container",
    style: transitionContainerStyle,
    childFactory: function childFactory(child) {
      return /*#__PURE__*/_react["default"].cloneElement(child, {
        classNames: classNames
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
    key: pickedYearMonth.string,
    timeout: {
      enter: 300,
      exit: 300
    },
    classNames: classNames
  }, content))));
});
var CalendarBody = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var selected = _ref2.selected,
      setSelected = _ref2.setSelected,
      startDatePickedArray = _ref2.startDatePickedArray,
      endDatePickedArray = _ref2.endDatePickedArray,
      handleChooseStartDate = _ref2.handleChooseStartDate,
      handleChooseEndDate = _ref2.handleChooseEndDate,
      rangeDirection = _ref2.rangeDirection,
      _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? {} : _ref2$data,
      _ref2$pickedDateInfo = _ref2.pickedDateInfo,
      pickedDateInfo = _ref2$pickedDateInfo === void 0 ? {} : _ref2$pickedDateInfo,
      _ref2$pickedYearMonth = _ref2.pickedYearMonth,
      pickedYearMonth = _ref2$pickedYearMonth === void 0 ? {} : _ref2$pickedYearMonth,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? function () {} : _ref2$onClick,
      _ref2$markedDatesHash = _ref2.markedDatesHash,
      markedDatesHash = _ref2$markedDatesHash === void 0 ? {} : _ref2$markedDatesHash;
  var content = Object.keys(data).map(function (key) {
    var colHtml;

    if (data[key].length) {
      colHtml = data[key].map(function (item, key) {
        var itemDate = new Date("".concat(item.year, "-").concat(item.month, "-").concat(item.name));
        var isDisabled = pickedYearMonth.month !== item.month;
        var isPickedStart = false;
        var isPickedEnd = false;
        var isHighlight = false;

        if (isDisabled === false) {
          var starts = startDatePickedArray;
          var ends = endDatePickedArray;

          if (startDatePickedArray.length && endDatePickedArray.length) {
            var a = new Date(startDatePickedArray.join('-'));
            var b = new Date(endDatePickedArray.join('-'));
            starts = a < b ? startDatePickedArray : endDatePickedArray;
            ends = a > b ? startDatePickedArray : endDatePickedArray;
          }

          if (starts.length) {
            isPickedStart = starts[0] === item.year && starts[1] === item.month && starts[2] === item.name;
            var targetDate = new Date(starts.join('-'));

            if (!ends.length) {
              if (itemDate > targetDate) {
                isHighlight = true;
              }
            } else {
              if (itemDate > targetDate && itemDate < new Date(ends.join('-'))) {
                isHighlight = true;
              }
            }
          }

          if (ends.length) {
            isPickedEnd = ends[0] === item.year && ends[1] === item.month && ends[2] === item.name;
          }
        }

        var datePickerItemClass = (0, _utils.cx)('react-minimal-datetime-range-calendar__table-cel', 'react-minimal-datetime-range-calendar__date-item', 'range', isDisabled && 'disabled', isPickedStart && 'active', isPickedEnd && 'active', isHighlight && 'highlight', DATE == item.name && MONTH == item.month && YEAR == item.year && 'today', markedDatesHash["".concat(item.year, "-").concat(item.month, "-").concat(item.name)] && 'marked');
        return /*#__PURE__*/_react["default"].createElement(CalendarItem, {
          key: key,
          selected: selected,
          setSelected: setSelected,
          startDatePickedArray: startDatePickedArray,
          endDatePickedArray: endDatePickedArray,
          handleChooseStartDate: handleChooseStartDate,
          handleChooseEndDate: handleChooseEndDate,
          item: item,
          onClick: onClick,
          datePickerItemClass: datePickerItemClass
        });
      });
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "react-minimal-datetime-range-calendar__table-row",
      key: key
    }, colHtml);
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range-calendar__table slide"
  }, content);
});
var CalendarItem = /*#__PURE__*/(0, _react.memo)(function (_ref3) {
  var selected = _ref3.selected,
      setSelected = _ref3.setSelected,
      startDatePickedArray = _ref3.startDatePickedArray,
      endDatePickedArray = _ref3.endDatePickedArray,
      handleChooseStartDate = _ref3.handleChooseStartDate,
      handleChooseEndDate = _ref3.handleChooseEndDate,
      _ref3$item = _ref3.item,
      item = _ref3$item === void 0 ? {} : _ref3$item,
      _ref3$datePickerItemC = _ref3.datePickerItemClass,
      datePickerItemClass = _ref3$datePickerItemC === void 0 ? '' : _ref3$datePickerItemC,
      _ref3$onClick = _ref3.onClick,
      onClick = _ref3$onClick === void 0 ? function () {} : _ref3$onClick;
  var handleOnClick = (0, _react.useCallback)(function () {
    if (startDatePickedArray.length) {
      setSelected(true);
      handleChooseEndDate(item);
    } else {
      handleChooseStartDate(item);
    }

    if (selected) {
      handleChooseEndDate({
        year: '',
        month: '',
        name: '',
        value: ''
      });
      handleChooseStartDate(item);
      setSelected(false);
    }
  }, [item, selected, startDatePickedArray, endDatePickedArray]);
  var handleOnMouseOver = (0, _react.useCallback)(function () {
    if (!selected) {
      if (startDatePickedArray.length) {
        handleChooseEndDate(item);
      }
    }
  }, [item, selected, startDatePickedArray, endDatePickedArray]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(datePickerItemClass),
    onMouseOver: handleOnMouseOver,
    onClick: handleOnClick
  }, item.name);
});
var _default = Index;
exports["default"] = _default;