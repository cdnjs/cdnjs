import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/esm/typeof';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _callSuper from '@babel/runtime/helpers/esm/callSuper';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import clsx from 'clsx';
import React, { useEffect, useLayoutEffect, useRef, createRef, Component, useMemo, useState, useCallback } from 'react';
import { uncontrollable } from 'uncontrollable';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import * as dates from 'date-arithmetic';
import { inRange as inRange$1, lt, lte, gt, gte, eq, neq, startOf, endOf, add, min, max, minutes } from 'date-arithmetic';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import chunk from 'lodash/chunk';
import getPosition$1 from 'dom-helpers/position';
import * as animationFrame from 'dom-helpers/animationFrame';
import { Overlay } from 'react-overlays';
import getOffset from 'dom-helpers/offset';
import isEqual$1 from 'lodash/isEqual';
import getHeight from 'dom-helpers/height';
import qsa from 'dom-helpers/querySelectorAll';
import contains from 'dom-helpers/contains';
import closest from 'dom-helpers/closest';
import listen from 'dom-helpers/listen';
import findIndex from 'lodash/findIndex';
import range$1 from 'lodash/range';
import memoize from 'memoize-one';
import getWidth from 'dom-helpers/width';
import sortBy from 'lodash/sortBy';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import _toArray from '@babel/runtime/helpers/esm/toArray';
import addClass from 'dom-helpers/addClass';
import removeClass from 'dom-helpers/removeClass';
import defaults from 'lodash/defaults';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import transform from 'lodash/transform';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import isLeapYear from 'dayjs/plugin/isLeapYear';

function NoopWrapper(props) {
  return props.children;
}

var navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE'
};
var views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda'
};

var viewNames$1 = Object.keys(views).map(function (k) {
  return views[k];
});
PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
PropTypes.any;
PropTypes.func;

/**
 * accepts either an array of builtin view names:
 *
 * ```
 * views={['month', 'day', 'agenda']}
 * ```
 *
 * or an object hash of the view name and the component (or boolean for builtin)
 *
 * ```
 * views={{
 *   month: true,
 *   week: false,
 *   workweek: WorkWeekViewComponent,
 * }}
 * ```
 */

PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(viewNames$1)), PropTypes.objectOf(function (prop, key) {
  var isBuiltinView = viewNames$1.indexOf(key) !== -1 && typeof prop[key] === 'boolean';
  if (isBuiltinView) {
    return null;
  } else {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return PropTypes.elementType.apply(PropTypes, [prop, key].concat(args));
  }
})]);
PropTypes.oneOfType([PropTypes.oneOf(['overlap', 'no-overlap']), PropTypes.func]);

/* eslint no-fallthrough: off */
var MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
};
function firstVisibleDay(date, localizer) {
  var firstOfMonth = dates.startOf(date, 'month');
  return dates.startOf(firstOfMonth, 'week', localizer.startOfWeek());
}
function lastVisibleDay(date, localizer) {
  var endOfMonth = dates.endOf(date, 'month');
  return dates.endOf(endOfMonth, 'week', localizer.startOfWeek());
}
function visibleDays(date, localizer) {
  var current = firstVisibleDay(date, localizer),
    last = lastVisibleDay(date, localizer),
    days = [];
  while (dates.lte(current, last, 'day')) {
    days.push(current);
    current = dates.add(current, 1, 'day');
  }
  return days;
}
function ceil(date, unit) {
  var floor = dates.startOf(date, unit);
  return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit);
}
function range(start, end) {
  var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
  var current = start,
    days = [];
  while (dates.lte(current, end, unit)) {
    days.push(current);
    current = dates.add(current, 1, unit);
  }
  return days;
}
function merge(date, time) {
  if (time == null && date == null) return null;
  if (time == null) time = new Date();
  if (date == null) date = new Date();
  date = dates.startOf(date, 'day');
  date = dates.hours(date, dates.hours(time));
  date = dates.minutes(date, dates.minutes(time));
  date = dates.seconds(date, dates.seconds(time));
  return dates.milliseconds(date, dates.milliseconds(time));
}
function isJustDate(date) {
  return dates.hours(date) === 0 && dates.minutes(date) === 0 && dates.seconds(date) === 0 && dates.milliseconds(date) === 0;
}
function duration(start, end, unit, firstOfWeek) {
  if (unit === 'day') unit = 'date';
  return Math.abs(
  // eslint-disable-next-line import/namespace
  dates[unit](start, undefined, firstOfWeek) -
  // eslint-disable-next-line import/namespace
  dates[unit](end, undefined, firstOfWeek));
}
function diff(dateA, dateB, unit) {
  if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB);

  // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour
  return Math.round(Math.abs(+dates.startOf(dateA, unit) / MILLI[unit] - +dates.startOf(dateB, unit) / MILLI[unit]));
}

var localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
  invariant(result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');
  return result;
}

/**
 * This date conversion was moved out of TimeSlots.js, to
 * allow for localizer override
 * @param {Date} dt - The date to start from
 * @param {Number} minutesFromMidnight
 * @param {Number} offset
 * @returns {Date}
 */
function getSlotDate(dt, minutesFromMidnight, offset) {
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, minutesFromMidnight + offset, 0, 0);
}
function getDstOffset(start, end) {
  return start.getTimezoneOffset() - end.getTimezoneOffset();
}

// if the start is on a DST-changing day but *after* the moment of DST
// transition we need to add those extra minutes to our minutesFromMidnight
function getTotalMin(start, end) {
  return diff(start, end, 'minutes') + getDstOffset(start, end);
}
function getMinutesFromMidnight(start) {
  var daystart = startOf(start, 'day');
  return diff(daystart, start, 'minutes') + getDstOffset(daystart, start);
}

// These two are used by DateSlotMetrics
function continuesPrior(start, first) {
  return lt(start, first, 'day');
}
function continuesAfter(start, end, last) {
  var singleDayDuration = eq(start, end, 'minutes');
  return singleDayDuration ? gte(end, last, 'minutes') : gt(end, last, 'minutes');
}
function daySpan(start, end) {
  return duration(start, end, 'day');
}

// These two are used by eventLevels
function sortEvents$1(_ref) {
  var _ref$evtA = _ref.evtA,
    aStart = _ref$evtA.start,
    aEnd = _ref$evtA.end,
    aAllDay = _ref$evtA.allDay,
    _ref$evtB = _ref.evtB,
    bStart = _ref$evtB.start,
    bEnd = _ref$evtB.end,
    bAllDay = _ref$evtB.allDay;
  var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
  var durA = daySpan(aStart, aEnd);
  var durB = daySpan(bStart, bEnd);
  return startSort ||
  // sort by start Day first
  durB - durA ||
  // events spanning multiple days go first
  !!bAllDay - !!aAllDay ||
  // then allDay single day events
  +aStart - +bStart ||
  // then sort by start time
  +aEnd - +bEnd // then sort by end time
  ;
}
function inEventRange(_ref2) {
  var _ref2$event = _ref2.event,
    start = _ref2$event.start,
    end = _ref2$event.end,
    _ref2$range = _ref2.range,
    rangeStart = _ref2$range.start,
    rangeEnd = _ref2$range.end;
  var eStart = startOf(start, 'day');
  var startsBeforeEnd = lte(eStart, rangeEnd, 'day');
  // when the event is zero duration we need to handle a bit differently
  var sameMin = neq(eStart, end, 'minutes');
  var endsAfterStart = sameMin ? gt(end, rangeStart, 'minutes') : gte(end, rangeStart, 'minutes');
  return startsBeforeEnd && endsAfterStart;
}

// other localizers treats 'day' and 'date' equality very differently, so we
// abstract the change the 'localizer.eq(date1, date2, 'day') into this
// new method, where they can be treated correctly by the localizer overrides
function isSameDate(date1, date2) {
  return eq(date1, date2, 'day');
}
function startAndEndAreDateOnly(start, end) {
  return isJustDate(start) && isJustDate(end);
}
var DateLocalizer = /*#__PURE__*/_createClass(function DateLocalizer(spec) {
  var _this = this;
  _classCallCheck(this, DateLocalizer);
  invariant(typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
  invariant(typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
  this.propType = spec.propType || localePropType;
  this.formats = spec.formats;
  this.format = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _format.apply(void 0, [_this, spec.format].concat(args));
  };
  // These date arithmetic methods can be overriden by the localizer
  this.startOfWeek = spec.firstOfWeek;
  this.merge = spec.merge || merge;
  this.inRange = spec.inRange || inRange$1;
  this.lt = spec.lt || lt;
  this.lte = spec.lte || lte;
  this.gt = spec.gt || gt;
  this.gte = spec.gte || gte;
  this.eq = spec.eq || eq;
  this.neq = spec.neq || neq;
  this.startOf = spec.startOf || startOf;
  this.endOf = spec.endOf || endOf;
  this.add = spec.add || add;
  this.range = spec.range || range;
  this.diff = spec.diff || diff;
  this.ceil = spec.ceil || ceil;
  this.min = spec.min || min;
  this.max = spec.max || max;
  this.minutes = spec.minutes || minutes;
  this.daySpan = spec.daySpan || daySpan;
  this.firstVisibleDay = spec.firstVisibleDay || firstVisibleDay;
  this.lastVisibleDay = spec.lastVisibleDay || lastVisibleDay;
  this.visibleDays = spec.visibleDays || visibleDays;
  this.getSlotDate = spec.getSlotDate || getSlotDate;
  this.getTimezoneOffset = spec.getTimezoneOffset || function (value) {
    return value.getTimezoneOffset();
  };
  this.getDstOffset = spec.getDstOffset || getDstOffset;
  this.getTotalMin = spec.getTotalMin || getTotalMin;
  this.getMinutesFromMidnight = spec.getMinutesFromMidnight || getMinutesFromMidnight;
  this.continuesPrior = spec.continuesPrior || continuesPrior;
  this.continuesAfter = spec.continuesAfter || continuesAfter;
  this.sortEvents = spec.sortEvents || sortEvents$1;
  this.inEventRange = spec.inEventRange || inEventRange;
  this.isSameDate = spec.isSameDate || isSameDate;
  this.startAndEndAreDateOnly = spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
  this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
});
function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
  var formats = _objectSpread(_objectSpread({}, localizer.formats), formatOverrides);
  return _objectSpread(_objectSpread({}, localizer), {}, {
    messages: messages,
    startOfWeek: function startOfWeek() {
      return localizer.startOfWeek(culture);
    },
    format: function format(value, _format2) {
      return localizer.format(value, formats[_format2] || _format2, culture);
    }
  });
}

var Toolbar = /*#__PURE__*/function (_React$Component) {
  function Toolbar() {
    var _this;
    _classCallCheck(this, Toolbar);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Toolbar, [].concat(args));
    _this.navigate = function (action) {
      _this.props.onNavigate(action);
    };
    _this.view = function (view) {
      _this.props.onView(view);
    };
    return _this;
  }
  _inherits(Toolbar, _React$Component);
  return _createClass(Toolbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        messages = _this$props.localizer.messages,
        label = _this$props.label;
      return /*#__PURE__*/React.createElement("div", {
        className: "rbc-toolbar"
      }, /*#__PURE__*/React.createElement("span", {
        className: "rbc-btn-group"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.TODAY)
      }, messages.today), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.PREVIOUS)
      }, messages.previous), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.NEXT)
      }, messages.next)), /*#__PURE__*/React.createElement("span", {
        className: "rbc-toolbar-label"
      }, label), /*#__PURE__*/React.createElement("span", {
        className: "rbc-btn-group"
      }, this.viewNamesGroup(messages)));
    }
  }, {
    key: "viewNamesGroup",
    value: function viewNamesGroup(messages) {
      var _this2 = this;
      var viewNames = this.props.views;
      var view = this.props.view;
      if (viewNames.length > 1) {
        return viewNames.map(function (name) {
          return /*#__PURE__*/React.createElement("button", {
            type: "button",
            key: name,
            className: clsx({
              'rbc-active': view === name
            }),
            onClick: _this2.view.bind(null, name)
          }, messages[name]);
        });
      }
    }
  }]);
}(React.Component);

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

var defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Agenda',
  noEventsInRange: 'There are no events in this range.',
  showMore: function showMore(total) {
    return "+".concat(total, " more");
  }
};
function messages(msgs) {
  return _objectSpread(_objectSpread({}, defaultMessages), msgs);
}

function useClickOutside(_ref) {
  var ref = _ref.ref,
    callback = _ref.callback;
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

var _excluded$7 = ["style", "className", "event", "selected", "isAllDay", "onSelect", "onDoubleClick", "onKeyPress", "localizer", "continuesPrior", "continuesAfter", "accessors", "getters", "children", "components", "slotStart", "slotEnd"];
var EventCell = /*#__PURE__*/function (_React$Component) {
  function EventCell() {
    _classCallCheck(this, EventCell);
    return _callSuper(this, EventCell, arguments);
  }
  _inherits(EventCell, _React$Component);
  return _createClass(EventCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        style = _this$props.style,
        className = _this$props.className,
        event = _this$props.event,
        selected = _this$props.selected,
        isAllDay = _this$props.isAllDay,
        onSelect = _this$props.onSelect,
        _onDoubleClick = _this$props.onDoubleClick,
        onKeyPress = _this$props.onKeyPress,
        localizer = _this$props.localizer,
        continuesPrior = _this$props.continuesPrior,
        continuesAfter = _this$props.continuesAfter,
        accessors = _this$props.accessors,
        getters = _this$props.getters,
        children = _this$props.children,
        _this$props$component = _this$props.components,
        Event = _this$props$component.event,
        EventWrapper = _this$props$component.eventWrapper,
        slotStart = _this$props.slotStart,
        slotEnd = _this$props.slotEnd,
        props = _objectWithoutProperties(_this$props, _excluded$7);
      delete props.resizable;
      var title = accessors.title(event);
      var tooltip = accessors.tooltip(event);
      var end = accessors.end(event);
      var start = accessors.start(event);
      var allDay = accessors.allDay(event);
      var showAsAllDay = isAllDay || allDay || localizer.diff(start, localizer.ceil(end, 'day'), 'day') > 1;
      var userProps = getters.eventProp(event, start, end, selected);
      var content = /*#__PURE__*/React.createElement("div", {
        className: "rbc-event-content",
        title: tooltip || undefined
      }, Event ? /*#__PURE__*/React.createElement(Event, {
        event: event,
        continuesPrior: continuesPrior,
        continuesAfter: continuesAfter,
        title: title,
        isAllDay: allDay,
        localizer: localizer,
        slotStart: slotStart,
        slotEnd: slotEnd
      }) : title);
      return /*#__PURE__*/React.createElement(EventWrapper, Object.assign({}, this.props, {
        type: "date"
      }), /*#__PURE__*/React.createElement("div", Object.assign({}, props, {
        style: _objectSpread(_objectSpread({}, userProps.style), style),
        className: clsx('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-allday': showAsAllDay,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter
        }),
        onClick: function onClick(e) {
          return onSelect && onSelect(event, e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return _onDoubleClick && _onDoubleClick(event, e);
        },
        onKeyDown: function onKeyDown(e) {
          return onKeyPress && onKeyPress(event, e);
        }
      }), typeof children === 'function' ? children(content) : content));
    }
  }]);
}(React.Component);

function isSelected(event, selected) {
  if (!event || selected == null) return false;
  return isEqual$1(event, selected);
}
function slotWidth(rowBox, slots) {
  var rowWidth = rowBox.right - rowBox.left;
  var cellWidth = rowWidth / slots;
  return cellWidth;
}
function getSlotAtX(rowBox, x, rtl, slots) {
  var cellWidth = slotWidth(rowBox, slots);
  return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
}
function pointInBox(box, _ref) {
  var x = _ref.x,
    y = _ref.y;
  return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}
function dateCellSelection(start, rowBox, box, slots, rtl) {
  var startIdx = -1;
  var endIdx = -1;
  var lastSlotIdx = slots - 1;
  var cellWidth = slotWidth(rowBox, slots);

  // cell under the mouse
  var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots);

  // Identify row as either the initial row
  // or the row under the current mouse point
  var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
  var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;

  // this row's position relative to the start point
  var isAboveStart = start.y > rowBox.bottom;
  var isBelowStart = rowBox.top > start.y;
  var isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom;

  // this row is between the current and start rows, so entirely selected
  if (isBetween) {
    startIdx = 0;
    endIdx = lastSlotIdx;
  }
  if (isCurrentRow) {
    if (isBelowStart) {
      startIdx = 0;
      endIdx = currentSlot;
    } else if (isAboveStart) {
      startIdx = currentSlot;
      endIdx = lastSlotIdx;
    }
  }
  if (isStartRow) {
    // select the cell under the initial point
    startIdx = endIdx = rtl ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth) : Math.floor((start.x - rowBox.left) / cellWidth);
    if (isCurrentRow) {
      if (currentSlot < startIdx) startIdx = currentSlot;else endIdx = currentSlot; //select current range
    } else if (start.y < box.y) {
      // the current row is below start row
      // select cells to the right of the start cell
      endIdx = lastSlotIdx;
    } else {
      // select cells to the left of the start cell
      startIdx = 0;
    }
  }
  return {
    startIdx: startIdx,
    endIdx: endIdx
  };
}

/**
 * Changes to react-overlays cause issue with auto positioning,
 * so we need to manually calculate the position of the popper,
 * and constrain it to the Month container.
 */
function getPosition(_ref) {
  var target = _ref.target,
    offset = _ref.offset,
    container = _ref.container,
    box = _ref.box;
  var _getOffset = getOffset(target),
    top = _getOffset.top,
    left = _getOffset.left,
    width = _getOffset.width,
    height = _getOffset.height;
  var _getOffset2 = getOffset(container),
    cTop = _getOffset2.top,
    cLeft = _getOffset2.left,
    cWidth = _getOffset2.width,
    cHeight = _getOffset2.height;
  var _getOffset3 = getOffset(box),
    bWidth = _getOffset3.width,
    bHeight = _getOffset3.height;
  var viewBottom = cTop + cHeight;
  var viewRight = cLeft + cWidth;
  var bottom = top + bHeight;
  var right = left + bWidth;
  var x = offset.x,
    y = offset.y;
  var topOffset = bottom > viewBottom ? top - bHeight - y : top + y + height;
  var leftOffset = right > viewRight ? left + x - bWidth + width : left + x;
  return {
    topOffset: topOffset,
    leftOffset: leftOffset
  };
}
function Pop(_ref2) {
  var containerRef = _ref2.containerRef,
    accessors = _ref2.accessors,
    getters = _ref2.getters,
    selected = _ref2.selected,
    components = _ref2.components,
    localizer = _ref2.localizer,
    position = _ref2.position,
    show = _ref2.show,
    events = _ref2.events,
    slotStart = _ref2.slotStart,
    slotEnd = _ref2.slotEnd,
    onSelect = _ref2.onSelect,
    onDoubleClick = _ref2.onDoubleClick,
    onKeyPress = _ref2.onKeyPress,
    handleDragStart = _ref2.handleDragStart,
    popperRef = _ref2.popperRef,
    target = _ref2.target,
    offset = _ref2.offset;
  useClickOutside({
    ref: popperRef,
    callback: show
  });
  useLayoutEffect(function () {
    var _getPosition = getPosition({
        target: target,
        offset: offset,
        container: containerRef.current,
        box: popperRef.current
      }),
      topOffset = _getPosition.topOffset,
      leftOffset = _getPosition.leftOffset;
    popperRef.current.style.top = "".concat(topOffset, "px");
    popperRef.current.style.left = "".concat(leftOffset, "px");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset.x, offset.y, target]);
  var width = position.width;
  var style = {
    minWidth: width + width / 2
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "rbc-overlay",
    ref: popperRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "rbc-overlay-header"
  }, localizer.format(slotStart, 'dayHeaderFormat')), events.map(function (event, idx) {
    return /*#__PURE__*/React.createElement(EventCell, {
      key: idx,
      type: "popup",
      localizer: localizer,
      event: event,
      getters: getters,
      onSelect: onSelect,
      accessors: accessors,
      components: components,
      onDoubleClick: onDoubleClick,
      onKeyPress: onKeyPress,
      continuesPrior: localizer.lt(accessors.end(event), slotStart, 'day'),
      continuesAfter: localizer.gte(accessors.start(event), slotEnd, 'day'),
      slotStart: slotStart,
      slotEnd: slotEnd,
      selected: isSelected(event, selected),
      draggable: true,
      onDragStart: function onDragStart() {
        return handleDragStart(event);
      },
      onDragEnd: function onDragEnd() {
        return show();
      }
    });
  }));
}
var Popup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Pop, Object.assign({}, props, {
    popperRef: ref
  }));
});
Popup.propTypes = {
  accessors: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  selected: PropTypes.object,
  components: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  slotStart: PropTypes.instanceOf(Date).isRequired,
  slotEnd: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  handleDragStart: PropTypes.func,
  style: PropTypes.object,
  offset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

function CalOverlay(_ref) {
  var containerRef = _ref.containerRef,
    _ref$popupOffset = _ref.popupOffset,
    popupOffset = _ref$popupOffset === void 0 ? 5 : _ref$popupOffset,
    overlay = _ref.overlay,
    accessors = _ref.accessors,
    localizer = _ref.localizer,
    components = _ref.components,
    getters = _ref.getters,
    selected = _ref.selected,
    handleSelectEvent = _ref.handleSelectEvent,
    handleDoubleClickEvent = _ref.handleDoubleClickEvent,
    handleKeyPressEvent = _ref.handleKeyPressEvent,
    handleDragStart = _ref.handleDragStart,
    onHide = _ref.onHide,
    overlayDisplay = _ref.overlayDisplay;
  var popperRef = useRef(null);
  if (!overlay.position) return null;
  var offset = popupOffset;
  if (!isNaN(popupOffset)) {
    offset = {
      x: popupOffset,
      y: popupOffset
    };
  }
  var position = overlay.position,
    events = overlay.events,
    date = overlay.date,
    end = overlay.end;
  return /*#__PURE__*/React.createElement(Overlay, {
    rootClose: true,
    flip: true,
    show: true,
    placement: "bottom",
    onHide: onHide,
    target: overlay.target
  }, function (_ref2) {
    var props = _ref2.props;
    return /*#__PURE__*/React.createElement(Popup, Object.assign({}, props, {
      containerRef: containerRef,
      ref: popperRef,
      target: overlay.target,
      offset: offset,
      accessors: accessors,
      getters: getters,
      selected: selected,
      components: components,
      localizer: localizer,
      position: position,
      show: overlayDisplay,
      events: events,
      slotStart: date,
      slotEnd: end,
      onSelect: handleSelectEvent,
      onDoubleClick: handleDoubleClickEvent,
      onKeyPress: handleKeyPressEvent,
      handleDragStart: handleDragStart
    }));
  });
}
var PopOverlay = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(CalOverlay, Object.assign({}, props, {
    containerRef: ref
  }));
});
PopOverlay.propTypes = {
  popupOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })]),
  overlay: PropTypes.shape({
    position: PropTypes.object,
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
  }),
  accessors: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  selected: PropTypes.object,
  handleSelectEvent: PropTypes.func,
  handleDoubleClickEvent: PropTypes.func,
  handleKeyPressEvent: PropTypes.func,
  handleDragStart: PropTypes.func,
  onHide: PropTypes.func,
  overlayDisplay: PropTypes.func
};

function addEventListener(type, handler) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  return listen(target, type, handler, {
    passive: false
  });
}
function isOverContainer(container, x, y) {
  return !container || contains(container, document.elementFromPoint(x, y));
}
function getEventNodeFromPoint(node, _ref) {
  var clientX = _ref.clientX,
    clientY = _ref.clientY;
  var target = document.elementFromPoint(clientX, clientY);
  return closest(target, '.rbc-event', node);
}
function getShowMoreNodeFromPoint(node, _ref2) {
  var clientX = _ref2.clientX,
    clientY = _ref2.clientY;
  var target = document.elementFromPoint(clientX, clientY);
  return closest(target, '.rbc-show-more', node);
}
function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds);
}
function isShowMore(node, bounds) {
  return !!getShowMoreNodeFromPoint(node, bounds);
}
function getEventCoordinates(e) {
  var target = e;
  if (e.touches && e.touches.length) {
    target = e.touches[0];
  }
  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY
  };
}
var clickTolerance = 5;
var clickInterval = 250;
var Selection = /*#__PURE__*/function () {
  function Selection(node) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$global = _ref3.global,
      global = _ref3$global === void 0 ? false : _ref3$global,
      _ref3$longPressThresh = _ref3.longPressThreshold,
      longPressThreshold = _ref3$longPressThresh === void 0 ? 250 : _ref3$longPressThresh,
      _ref3$validContainers = _ref3.validContainers,
      validContainers = _ref3$validContainers === void 0 ? [] : _ref3$validContainers;
    _classCallCheck(this, Selection);
    this._initialEvent = null;
    this.selecting = false;
    this.isDetached = false;
    this.container = node;
    this.globalMouse = !node || global;
    this.longPressThreshold = longPressThreshold;
    this.validContainers = validContainers;
    this._listeners = Object.create(null);
    this._handleInitialEvent = this._handleInitialEvent.bind(this);
    this._handleMoveEvent = this._handleMoveEvent.bind(this);
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
    this._keyListener = this._keyListener.bind(this);
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
    this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this);

    // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    this._removeTouchMoveWindowListener = addEventListener('touchmove', function () {}, window);
    this._removeKeyDownListener = addEventListener('keydown', this._keyListener);
    this._removeKeyUpListener = addEventListener('keyup', this._keyListener);
    this._removeDropFromOutsideListener = addEventListener('drop', this._dropFromOutsideListener);
    this._removeDragOverFromOutsideListener = addEventListener('dragover', this._dragOverFromOutsideListener);
    this._addInitialEventListener();
  }
  return _createClass(Selection, [{
    key: "on",
    value: function on(type, handler) {
      var handlers = this._listeners[type] || (this._listeners[type] = []);
      handlers.push(handler);
      return {
        remove: function remove() {
          var idx = handlers.indexOf(handler);
          if (idx !== -1) handlers.splice(idx, 1);
        }
      };
    }
  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var result;
      var handlers = this._listeners[type] || [];
      handlers.forEach(function (fn) {
        if (result === undefined) result = fn.apply(void 0, args);
      });
      return result;
    }
  }, {
    key: "teardown",
    value: function teardown() {
      this._initialEvent = null;
      this._initialEventData = null;
      this._selectRect = null;
      this.selecting = false;
      this._lastClickData = null;
      this.isDetached = true;
      this._listeners = Object.create(null);
      this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener();
      this._removeInitialEventListener && this._removeInitialEventListener();
      this._removeEndListener && this._removeEndListener();
      this._onEscListener && this._onEscListener();
      this._removeMoveListener && this._removeMoveListener();
      this._removeKeyUpListener && this._removeKeyUpListener();
      this._removeKeyDownListener && this._removeKeyDownListener();
      this._removeDropFromOutsideListener && this._removeDropFromOutsideListener();
      this._removeDragOverFromOutsideListener && this._removeDragOverFromOutsideListener();
    }
  }, {
    key: "isSelected",
    value: function isSelected(node) {
      var box = this._selectRect;
      if (!box || !this.selecting) return false;
      return objectsCollide(box, getBoundsForNode(node));
    }
  }, {
    key: "filter",
    value: function filter(items) {
      var box = this._selectRect;

      //not selecting
      if (!box || !this.selecting) return [];
      return items.filter(this.isSelected, this);
    }

    // Adds a listener that will call the handler only after the user has pressed on the screen
    // without moving their finger for 250ms.
  }, {
    key: "_addLongPressListener",
    value: function _addLongPressListener(handler, initialEvent) {
      var _this = this;
      var timer = null;
      var removeTouchMoveListener = null;
      var removeTouchEndListener = null;
      var handleTouchStart = function handleTouchStart(initialEvent) {
        timer = setTimeout(function () {
          cleanup();
          handler(initialEvent);
        }, _this.longPressThreshold);
        removeTouchMoveListener = addEventListener('touchmove', function () {
          return cleanup();
        });
        removeTouchEndListener = addEventListener('touchend', function () {
          return cleanup();
        });
      };
      var removeTouchStartListener = addEventListener('touchstart', handleTouchStart);
      var cleanup = function cleanup() {
        if (timer) {
          clearTimeout(timer);
        }
        if (removeTouchMoveListener) {
          removeTouchMoveListener();
        }
        if (removeTouchEndListener) {
          removeTouchEndListener();
        }
        timer = null;
        removeTouchMoveListener = null;
        removeTouchEndListener = null;
      };
      if (initialEvent) {
        handleTouchStart(initialEvent);
      }
      return function () {
        cleanup();
        removeTouchStartListener();
      };
    }

    // Listen for mousedown and touchstart events. When one is received, disable the other and setup
    // future event handling based on the type of event.
  }, {
    key: "_addInitialEventListener",
    value: function _addInitialEventListener() {
      var _this2 = this;
      var removeMouseDownListener = addEventListener('mousedown', function (e) {
        _this2._removeInitialEventListener();
        _this2._handleInitialEvent(e);
        _this2._removeInitialEventListener = addEventListener('mousedown', _this2._handleInitialEvent);
      });
      var removeTouchStartListener = addEventListener('touchstart', function (e) {
        _this2._removeInitialEventListener();
        _this2._removeInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
      });
      this._removeInitialEventListener = function () {
        removeMouseDownListener();
        removeTouchStartListener();
      };
    }
  }, {
    key: "_dropFromOutsideListener",
    value: function _dropFromOutsideListener(e) {
      var _getEventCoordinates = getEventCoordinates(e),
        pageX = _getEventCoordinates.pageX,
        pageY = _getEventCoordinates.pageY,
        clientX = _getEventCoordinates.clientX,
        clientY = _getEventCoordinates.clientY;
      this.emit('dropFromOutside', {
        x: pageX,
        y: pageY,
        clientX: clientX,
        clientY: clientY
      });
      e.preventDefault();
    }
  }, {
    key: "_dragOverFromOutsideListener",
    value: function _dragOverFromOutsideListener(e) {
      var _getEventCoordinates2 = getEventCoordinates(e),
        pageX = _getEventCoordinates2.pageX,
        pageY = _getEventCoordinates2.pageY,
        clientX = _getEventCoordinates2.clientX,
        clientY = _getEventCoordinates2.clientY;
      this.emit('dragOverFromOutside', {
        x: pageX,
        y: pageY,
        clientX: clientX,
        clientY: clientY
      });
      e.preventDefault();
    }
  }, {
    key: "_handleInitialEvent",
    value: function _handleInitialEvent(e) {
      this._initialEvent = e;
      if (this.isDetached) {
        return;
      }
      var _getEventCoordinates3 = getEventCoordinates(e),
        clientX = _getEventCoordinates3.clientX,
        clientY = _getEventCoordinates3.clientY,
        pageX = _getEventCoordinates3.pageX,
        pageY = _getEventCoordinates3.pageY;
      var node = this.container(),
        collides,
        offsetData;

      // Right clicks
      if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;
      if (!this.globalMouse && node && !contains(node, e.target)) {
        var _normalizeDistance = normalizeDistance(0),
          top = _normalizeDistance.top,
          left = _normalizeDistance.left,
          bottom = _normalizeDistance.bottom,
          right = _normalizeDistance.right;
        offsetData = getBoundsForNode(node);
        collides = objectsCollide({
          top: offsetData.top - top,
          left: offsetData.left - left,
          bottom: offsetData.bottom + bottom,
          right: offsetData.right + right
        }, {
          top: pageY,
          left: pageX
        });
        if (!collides) return;
      }
      var result = this.emit('beforeSelect', this._initialEventData = {
        isTouch: /^touch/.test(e.type),
        x: pageX,
        y: pageY,
        clientX: clientX,
        clientY: clientY
      });
      if (result === false) return;
      switch (e.type) {
        case 'mousedown':
          this._removeEndListener = addEventListener('mouseup', this._handleTerminatingEvent);
          this._onEscListener = addEventListener('keydown', this._handleTerminatingEvent);
          this._removeMoveListener = addEventListener('mousemove', this._handleMoveEvent);
          break;
        case 'touchstart':
          this._handleMoveEvent(e);
          this._removeEndListener = addEventListener('touchend', this._handleTerminatingEvent);
          this._removeMoveListener = addEventListener('touchmove', this._handleMoveEvent);
          break;
      }
    }

    // Check whether provided event target element
    // - is contained within a valid container
  }, {
    key: "_isWithinValidContainer",
    value: function _isWithinValidContainer(e) {
      var eventTarget = e.target;
      var containers = this.validContainers;
      if (!containers || !containers.length || !eventTarget) {
        return true;
      }
      return containers.some(function (target) {
        return !!eventTarget.closest(target);
      });
    }
  }, {
    key: "_handleTerminatingEvent",
    value: function _handleTerminatingEvent(e) {
      var selecting = this.selecting;
      var bounds = this._selectRect;
      // If it's not in selecting state, it's a click event
      if (!selecting && e.type.includes('key')) {
        e = this._initialEvent;
      }
      this.selecting = false;
      this._removeEndListener && this._removeEndListener();
      this._removeMoveListener && this._removeMoveListener();
      this._selectRect = null;
      this._initialEvent = null;
      this._initialEventData = null;
      if (!e) return;
      var inRoot = !this.container || contains(this.container(), e.target);
      var isWithinValidContainer = this._isWithinValidContainer(e);
      if (e.key === 'Escape' || !isWithinValidContainer) {
        return this.emit('reset');
      }
      if (!selecting && inRoot) {
        return this._handleClickEvent(e);
      }

      // User drag-clicked in the Selectable area
      if (selecting) return this.emit('select', bounds);
      return this.emit('reset');
    }
  }, {
    key: "_handleClickEvent",
    value: function _handleClickEvent(e) {
      var _getEventCoordinates4 = getEventCoordinates(e),
        pageX = _getEventCoordinates4.pageX,
        pageY = _getEventCoordinates4.pageY,
        clientX = _getEventCoordinates4.clientX,
        clientY = _getEventCoordinates4.clientY;
      var now = new Date().getTime();
      if (this._lastClickData && now - this._lastClickData.timestamp < clickInterval) {
        // Double click event
        this._lastClickData = null;
        return this.emit('doubleClick', {
          x: pageX,
          y: pageY,
          clientX: clientX,
          clientY: clientY
        });
      }

      // Click event
      this._lastClickData = {
        timestamp: now
      };
      return this.emit('click', {
        x: pageX,
        y: pageY,
        clientX: clientX,
        clientY: clientY
      });
    }
  }, {
    key: "_handleMoveEvent",
    value: function _handleMoveEvent(e) {
      if (this._initialEventData === null || this.isDetached) {
        return;
      }
      var _this$_initialEventDa = this._initialEventData,
        x = _this$_initialEventDa.x,
        y = _this$_initialEventDa.y;
      var _getEventCoordinates5 = getEventCoordinates(e),
        pageX = _getEventCoordinates5.pageX,
        pageY = _getEventCoordinates5.pageY;
      var w = Math.abs(x - pageX);
      var h = Math.abs(y - pageY);
      var left = Math.min(pageX, x),
        top = Math.min(pageY, y),
        old = this.selecting;
      var click = this.isClick(pageX, pageY);
      // Prevent emitting selectStart event until mouse is moved.
      // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.
      if (click && !old && !(w || h)) {
        return;
      }
      if (!old && !click) {
        this.emit('selectStart', this._initialEventData);
      }
      if (!click) {
        this.selecting = true;
        this._selectRect = {
          top: top,
          left: left,
          x: pageX,
          y: pageY,
          right: left + w,
          bottom: top + h
        };
        this.emit('selecting', this._selectRect);
      }
      e.preventDefault();
    }
  }, {
    key: "_keyListener",
    value: function _keyListener(e) {
      this.ctrl = e.metaKey || e.ctrlKey;
    }
  }, {
    key: "isClick",
    value: function isClick(pageX, pageY) {
      var _this$_initialEventDa2 = this._initialEventData,
        x = _this$_initialEventDa2.x,
        y = _this$_initialEventDa2.y,
        isTouch = _this$_initialEventDa2.isTouch;
      return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
    }
  }]);
}();
/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance() {
  var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  if (_typeof(distance) !== 'object') distance = {
    top: distance,
    left: distance,
    right: distance,
    bottom: distance
  };
  return distance;
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
function objectsCollide(nodeA, nodeB) {
  var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var _getBoundsForNode = getBoundsForNode(nodeA),
    aTop = _getBoundsForNode.top,
    aLeft = _getBoundsForNode.left,
    _getBoundsForNode$rig = _getBoundsForNode.right,
    aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig,
    _getBoundsForNode$bot = _getBoundsForNode.bottom,
    aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot;
  var _getBoundsForNode2 = getBoundsForNode(nodeB),
    bTop = _getBoundsForNode2.top,
    bLeft = _getBoundsForNode2.left,
    _getBoundsForNode2$ri = _getBoundsForNode2.right,
    bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri,
    _getBoundsForNode2$bo = _getBoundsForNode2.bottom,
    bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo;
  return !(
  // 'a' bottom doesn't touch 'b' top

  aBottom - tolerance < bTop ||
  // 'a' top doesn't touch 'b' bottom
  aTop + tolerance > bBottom ||
  // 'a' right doesn't touch 'b' left
  aRight - tolerance < bLeft ||
  // 'a' left doesn't touch 'b' right
  aLeft + tolerance > bRight);
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;
  var rect = node.getBoundingClientRect(),
    left = rect.left + pageOffset('left'),
    top = rect.top + pageOffset('top');
  return {
    top: top,
    left: left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}
function pageOffset(dir) {
  if (dir === 'left') return window.pageXOffset || document.body.scrollLeft || 0;
  if (dir === 'top') return window.pageYOffset || document.body.scrollTop || 0;
}

var BackgroundCells = /*#__PURE__*/function (_React$Component) {
  function BackgroundCells(props, context) {
    var _this;
    _classCallCheck(this, BackgroundCells);
    _this = _callSuper(this, BackgroundCells, [props, context]);
    _this.state = {
      selecting: false
    };
    _this.containerRef = /*#__PURE__*/createRef();
    return _this;
  }
  _inherits(BackgroundCells, _React$Component);
  return _createClass(BackgroundCells, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.selectable && this.props.selectable) this._selectable();
      if (prevProps.selectable && !this.props.selectable) this._teardownSelectable();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        range = _this$props.range,
        getNow = _this$props.getNow,
        getters = _this$props.getters,
        currentDate = _this$props.date,
        Wrapper = _this$props.components.dateCellWrapper,
        localizer = _this$props.localizer;
      var _this$state = this.state,
        selecting = _this$state.selecting,
        startIdx = _this$state.startIdx,
        endIdx = _this$state.endIdx;
      var current = getNow();
      return /*#__PURE__*/React.createElement("div", {
        className: "rbc-row-bg",
        ref: this.containerRef
      }, range.map(function (date, index) {
        var selected = selecting && index >= startIdx && index <= endIdx;
        var _getters$dayProp = getters.dayProp(date),
          className = _getters$dayProp.className,
          style = _getters$dayProp.style;
        return /*#__PURE__*/React.createElement(Wrapper, {
          key: index,
          value: date,
          range: range
        }, /*#__PURE__*/React.createElement("div", {
          style: style,
          className: clsx('rbc-day-bg', className, selected && 'rbc-selected-cell', localizer.isSameDate(date, current) && 'rbc-today', currentDate && localizer.neq(currentDate, date, 'month') && 'rbc-off-range-bg')
        }));
      }));
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
      var _this2 = this;
      var node = this.containerRef.current;
      var selector = this._selector = new Selection(this.props.container, {
        longPressThreshold: this.props.longPressThreshold
      });
      var selectorClicksHandler = function selectorClicksHandler(point, actionType) {
        if (!isEvent(node, point) && !isShowMore(node, point)) {
          var rowBox = getBoundsForNode(node);
          var _this2$props = _this2.props,
            range = _this2$props.range,
            rtl = _this2$props.rtl;
          if (pointInBox(rowBox, point)) {
            var currentCell = getSlotAtX(rowBox, point.x, rtl, range.length);
            _this2._selectSlot({
              startIdx: currentCell,
              endIdx: currentCell,
              action: actionType,
              box: point
            });
          }
        }
        _this2._initial = {};
        _this2.setState({
          selecting: false
        });
      };
      selector.on('selecting', function (box) {
        var _this2$props2 = _this2.props,
          range = _this2$props2.range,
          rtl = _this2$props2.rtl;
        var startIdx = -1;
        var endIdx = -1;
        if (!_this2.state.selecting) {
          notify(_this2.props.onSelectStart, [box]);
          _this2._initial = {
            x: box.x,
            y: box.y
          };
        }
        if (selector.isSelected(node)) {
          var nodeBox = getBoundsForNode(node);
          var _dateCellSelection = dateCellSelection(_this2._initial, nodeBox, box, range.length, rtl);
          startIdx = _dateCellSelection.startIdx;
          endIdx = _dateCellSelection.endIdx;
        }
        _this2.setState({
          selecting: true,
          startIdx: startIdx,
          endIdx: endIdx
        });
      });
      selector.on('beforeSelect', function (box) {
        if (_this2.props.selectable !== 'ignoreEvents') return;
        return !isEvent(_this2.containerRef.current, box);
      });
      selector.on('click', function (point) {
        return selectorClicksHandler(point, 'click');
      });
      selector.on('doubleClick', function (point) {
        return selectorClicksHandler(point, 'doubleClick');
      });
      selector.on('select', function (bounds) {
        _this2._selectSlot(_objectSpread(_objectSpread({}, _this2.state), {}, {
          action: 'select',
          bounds: bounds
        }));
        _this2._initial = {};
        _this2.setState({
          selecting: false
        });
        notify(_this2.props.onSelectEnd, [_this2.state]);
      });
    }
  }, {
    key: "_teardownSelectable",
    value: function _teardownSelectable() {
      if (!this._selector) return;
      this._selector.teardown();
      this._selector = null;
    }
  }, {
    key: "_selectSlot",
    value: function _selectSlot(_ref) {
      var endIdx = _ref.endIdx,
        startIdx = _ref.startIdx,
        action = _ref.action,
        bounds = _ref.bounds,
        box = _ref.box;
      if (endIdx !== -1 && startIdx !== -1) this.props.onSelectSlot && this.props.onSelectSlot({
        start: startIdx,
        end: endIdx,
        action: action,
        bounds: bounds,
        box: box,
        resourceId: this.props.resourceId
      });
    }
  }]);
}(React.Component);

/* eslint-disable react/prop-types */
var EventRowMixin = {
  propTypes: {
    slotMetrics: PropTypes.object.isRequired,
    selected: PropTypes.object,
    isAllDay: PropTypes.bool,
    accessors: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onKeyPress: PropTypes.func
  },
  defaultProps: {
    segments: [],
    selected: {}
  },
  renderEvent: function renderEvent(props, event) {
    var selected = props.selected;
      props.isAllDay;
      var accessors = props.accessors,
      getters = props.getters,
      onSelect = props.onSelect,
      onDoubleClick = props.onDoubleClick,
      onKeyPress = props.onKeyPress,
      localizer = props.localizer,
      slotMetrics = props.slotMetrics,
      components = props.components,
      resizable = props.resizable;
    var continuesPrior = slotMetrics.continuesPrior(event);
    var continuesAfter = slotMetrics.continuesAfter(event);
    return /*#__PURE__*/React.createElement(EventCell, {
      event: event,
      getters: getters,
      localizer: localizer,
      accessors: accessors,
      components: components,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      onKeyPress: onKeyPress,
      continuesPrior: continuesPrior,
      continuesAfter: continuesAfter,
      slotStart: slotMetrics.first,
      slotEnd: slotMetrics.last,
      selected: isSelected(event, selected),
      resizable: resizable
    });
  },
  renderSpan: function renderSpan(slots, len, key) {
    var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' ';
    var per = Math.abs(len) / slots * 100 + '%';
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "rbc-row-segment"
      // IE10/11 need max-width. flex-basis doesn't respect box-sizing
      ,
      style: {
        WebkitFlexBasis: per,
        flexBasis: per,
        maxWidth: per
      }
    }, content);
  }
};

var EventRow = /*#__PURE__*/function (_React$Component) {
  function EventRow() {
    _classCallCheck(this, EventRow);
    return _callSuper(this, EventRow, arguments);
  }
  _inherits(EventRow, _React$Component);
  return _createClass(EventRow, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots,
        className = _this$props.className;
      var lastEnd = 1;
      return /*#__PURE__*/React.createElement("div", {
        className: clsx(className, 'rbc-row')
      }, segments.reduce(function (row, _ref, li) {
        var event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span;
        var key = '_lvl_' + li;
        var gap = left - lastEnd;
        var content = EventRowMixin.renderEvent(_this.props, event);
        if (gap) row.push(EventRowMixin.renderSpan(slots, gap, "".concat(key, "_gap")));
        row.push(EventRowMixin.renderSpan(slots, span, key, content));
        lastEnd = right + 1;
        return row;
      }, []));
    }
  }]);
}(React.Component);
EventRow.defaultProps = _objectSpread({}, EventRowMixin.defaultProps);

function endOfRange(_ref) {
  var dateRange = _ref.dateRange,
    _ref$unit = _ref.unit,
    unit = _ref$unit === void 0 ? 'day' : _ref$unit,
    localizer = _ref.localizer;
  return {
    first: dateRange[0],
    last: localizer.add(dateRange[dateRange.length - 1], 1, unit)
  };
}

// properly calculating segments requires working with dates in
// the timezone we're working with, so we use the localizer
function eventSegments(event, range, accessors, localizer) {
  var _endOfRange = endOfRange({
      dateRange: range,
      localizer: localizer
    }),
    first = _endOfRange.first,
    last = _endOfRange.last;
  var slots = localizer.diff(first, last, 'day');
  var start = localizer.max(localizer.startOf(accessors.start(event), 'day'), first);
  var end = localizer.min(localizer.ceil(accessors.end(event), 'day'), last);
  var padding = findIndex(range, function (x) {
    return localizer.isSameDate(x, start);
  });
  var span = localizer.diff(start, end, 'day');
  span = Math.min(span, slots);
  // The segmentOffset is necessary when adjusting for timezones
  // ahead of the browser timezone
  span = Math.max(span - localizer.segmentOffset, 1);
  return {
    event: event,
    span: span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  };
}
function eventLevels(rowSegments) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var i,
    j,
    seg,
    levels = [],
    extra = [];
  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];
    for (j = 0; j < levels.length; j++) if (!segsOverlap(seg, levels[j])) break;
    if (j >= limit) {
      extra.push(seg);
    } else {
      (levels[j] || (levels[j] = [])).push(seg);
    }
  }
  for (i = 0; i < levels.length; i++) {
    levels[i].sort(function (a, b) {
      return a.left - b.left;
    }); //eslint-disable-line
  }
  return {
    levels: levels,
    extra: extra
  };
}
function inRange(e, start, end, accessors, localizer) {
  var event = {
    start: accessors.start(e),
    end: accessors.end(e)
  };
  var range = {
    start: start,
    end: end
  };
  return localizer.inEventRange({
    event: event,
    range: range
  });
}
function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function (otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
  });
}
function sortWeekEvents(events, accessors, localizer) {
  var base = _toConsumableArray(events);
  var multiDayEvents = [];
  var standardEvents = [];
  base.forEach(function (event) {
    var startCheck = accessors.start(event);
    var endCheck = accessors.end(event);
    if (localizer.daySpan(startCheck, endCheck) > 1) {
      multiDayEvents.push(event);
    } else {
      standardEvents.push(event);
    }
  });
  var multiSorted = multiDayEvents.sort(function (a, b) {
    return sortEvents(a, b, accessors, localizer);
  });
  var standardSorted = standardEvents.sort(function (a, b) {
    return sortEvents(a, b, accessors, localizer);
  });
  return [].concat(_toConsumableArray(multiSorted), _toConsumableArray(standardSorted));
}
function sortEvents(eventA, eventB, accessors, localizer) {
  var evtA = {
    start: accessors.start(eventA),
    end: accessors.end(eventA),
    allDay: accessors.allDay(eventA)
  };
  var evtB = {
    start: accessors.start(eventB),
    end: accessors.end(eventB),
    allDay: accessors.allDay(eventB)
  };
  return localizer.sortEvents({
    evtA: evtA,
    evtB: evtB
  });
}

// Modified: Check if a segment spans through this slot (including events that started earlier)
var isSegmentInSlot$1 = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};
var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function (seg) {
    return isSegmentInSlot$1(seg, slot);
  }).map(function (seg) {
    return seg.event;
  });
};
var EventEndingRow = /*#__PURE__*/function (_React$Component) {
  function EventEndingRow() {
    _classCallCheck(this, EventEndingRow);
    return _callSuper(this, EventEndingRow, arguments);
  }
  _inherits(EventEndingRow, _React$Component);
  return _createClass(EventEndingRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots;
      var rowSegments = eventLevels(segments).levels[0];
      var current = 1,
        lastEnd = 1,
        row = [];
      while (current <= slots) {
        var key = '_lvl_' + current;

        // Find segment that starts at or spans through current slot
        var _ref = rowSegments.filter(function (seg) {
            return isSegmentInSlot$1(seg, current);
          })[0] || {},
          event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span;
        if (!event) {
          // No visible event starts at this slot, but check if we need a "more" button
          // for hidden events that span this slot
          var hiddenEvents = this.getHiddenEventsForSlot(segments, current);
          if (hiddenEvents.length > 0) {
            var _gap = current - lastEnd;
            if (_gap) {
              row.push(EventRowMixin.renderSpan(slots, _gap, key + '_gap'));
            }
            row.push(EventRowMixin.renderSpan(slots, 1, key, this.renderShowMore(segments, current)));
            lastEnd = current = current + 1;
            continue;
          }
          current++;
          continue;
        }
        var gap = Math.max(0, left - lastEnd);
        if (this.canRenderSlotEvent(left, span)) {
          var content = EventRowMixin.renderEvent(this.props, event);
          if (gap) {
            row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'));
          }
          row.push(EventRowMixin.renderSpan(slots, span, key, content));
          lastEnd = current = right + 1;
        } else {
          if (gap) {
            row.push(EventRowMixin.renderSpan(slots, gap, key + '_gap'));
          }
          row.push(EventRowMixin.renderSpan(slots, 1, key, this.renderShowMore(segments, current)));
          lastEnd = current = current + 1;
        }
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "rbc-row"
      }, row);
    }

    // New helper method to find hidden events for a slot
  }, {
    key: "getHiddenEventsForSlot",
    value: function getHiddenEventsForSlot(segments, slot) {
      // Get all events (visible and hidden) for this slot
      var allEventsInSlot = eventsInSlot(segments, slot);

      // Get visible events for this slot from the first level
      var rowSegments = eventLevels(segments).levels[0];
      var visibleEventsInSlot = rowSegments.filter(function (seg) {
        return isSegmentInSlot$1(seg, slot);
      }).map(function (seg) {
        return seg.event;
      });

      // Return events that are in allEventsInSlot but not in visibleEventsInSlot
      return allEventsInSlot.filter(function (event) {
        return !visibleEventsInSlot.some(function (visEvent) {
          return visEvent === event;
        });
      });
    }
  }, {
    key: "canRenderSlotEvent",
    value: function canRenderSlotEvent(slot, span) {
      var segments = this.props.segments;
      return range$1(slot, slot + span).every(function (s) {
        var count = eventsInSlot(segments, s).length;
        return count === 1;
      });
    }
  }, {
    key: "renderShowMore",
    value: function renderShowMore(segments, slot) {
      var _this = this;
      var _this$props2 = this.props,
        localizer = _this$props2.localizer,
        slotMetrics = _this$props2.slotMetrics,
        components = _this$props2.components;
      var events = slotMetrics.getEventsForSlot(slot);
      var remainingEvents = eventsInSlot(segments, slot);
      var count = remainingEvents.length;
      if (components !== null && components !== void 0 && components.showMore) {
        var ShowMore = components.showMore;
        // The received slot seems to be 1-based, but the range we use to pull the date is 0-based
        var slotDate = slotMetrics.getDateForSlot(slot - 1);
        return count ? /*#__PURE__*/React.createElement(ShowMore, {
          localizer: localizer,
          slotDate: slotDate,
          slot: slot,
          count: count,
          events: events,
          remainingEvents: remainingEvents
        }) : false;
      }
      return count ? /*#__PURE__*/React.createElement("button", {
        type: "button",
        key: 'sm_' + slot,
        className: clsx('rbc-button-link', 'rbc-show-more'),
        onClick: function onClick(e) {
          return _this.showMore(slot, e);
        }
      }, localizer.messages.showMore(count, remainingEvents, events)) : false;
    }
  }, {
    key: "showMore",
    value: function showMore(slot, e) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onShowMore(slot, e.target);
    }
  }]);
}(React.Component);
EventEndingRow.defaultProps = _objectSpread({}, EventRowMixin.defaultProps);

var ScrollableWeekWrapper = function ScrollableWeekWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "rbc-row-content-scroll-container"
  }, children);
};

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};
var isEqual = function isEqual(a, b) {
  return a[0].range === b[0].range && a[0].events === b[0].events;
};
function getSlotMetrics$1() {
  return memoize(function (options) {
    var range = options.range,
      events = options.events,
      maxRows = options.maxRows,
      minRows = options.minRows,
      accessors = options.accessors,
      localizer = options.localizer;
    var _endOfRange = endOfRange({
        dateRange: range,
        localizer: localizer
      }),
      first = _endOfRange.first,
      last = _endOfRange.last;
    var segments = events.map(function (evt) {
      return eventSegments(evt, range, accessors, localizer);
    });
    var _eventLevels = eventLevels(segments, Math.max(maxRows - 1, 1)),
      levels = _eventLevels.levels,
      extra = _eventLevels.extra;
    // Subtract 1 from minRows to not include showMore button row when
    // it would be rendered
    var minEventRows = extra.length > 0 ? minRows - 1 : minRows;
    while (levels.length < minEventRows) levels.push([]);
    return {
      first: first,
      last: last,
      levels: levels,
      extra: extra,
      range: range,
      slots: range.length,
      clone: function clone(args) {
        var metrics = getSlotMetrics$1();
        return metrics(_objectSpread(_objectSpread({}, options), args));
      },
      getDateForSlot: function getDateForSlot(slotNumber) {
        return range[slotNumber];
      },
      getSlotForDate: function getSlotForDate(date) {
        return range.find(function (r) {
          return localizer.isSameDate(r, date);
        });
      },
      getEventsForSlot: function getEventsForSlot(slot) {
        return segments.filter(function (seg) {
          return isSegmentInSlot(seg, slot);
        }).map(function (seg) {
          return seg.event;
        });
      },
      continuesPrior: function continuesPrior(event) {
        return localizer.continuesPrior(accessors.start(event), first);
      },
      continuesAfter: function continuesAfter(event) {
        var start = accessors.start(event);
        var end = accessors.end(event);
        return localizer.continuesAfter(start, end, last);
      }
    };
  }, isEqual);
}

var DateContentRow = /*#__PURE__*/function (_React$Component) {
  function DateContentRow() {
    var _this;
    _classCallCheck(this, DateContentRow);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DateContentRow, [].concat(args));
    _this.handleSelectSlot = function (slot) {
      var _this$props = _this.props,
        range = _this$props.range,
        onSelectSlot = _this$props.onSelectSlot;
      onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
    };
    _this.handleShowMore = function (slot, target) {
      var _this$props2 = _this.props,
        range = _this$props2.range,
        onShowMore = _this$props2.onShowMore;
      var metrics = _this.slotMetrics(_this.props);
      var row = qsa(_this.containerRef.current, '.rbc-row-bg')[0];
      var cell;
      if (row) cell = row.children[slot - 1];
      var events = metrics.getEventsForSlot(slot);
      onShowMore(events, range[slot - 1], cell, slot, target);
    };
    _this.getContainer = function () {
      var container = _this.props.container;
      return container ? container() : _this.containerRef.current;
    };
    _this.renderHeadingCell = function (date, index) {
      var _this$props3 = _this.props,
        renderHeader = _this$props3.renderHeader,
        getNow = _this$props3.getNow,
        localizer = _this$props3.localizer;
      return renderHeader({
        date: date,
        key: "header_".concat(index),
        className: clsx('rbc-date-cell', localizer.isSameDate(date, getNow()) && 'rbc-now')
      });
    };
    _this.renderDummy = function () {
      var _this$props4 = _this.props,
        className = _this$props4.className,
        range = _this$props4.range,
        renderHeader = _this$props4.renderHeader,
        showAllEvents = _this$props4.showAllEvents;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        ref: _this.containerRef
      }, /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable')
      }, renderHeader && /*#__PURE__*/React.createElement("div", {
        className: "rbc-row",
        ref: _this.headingRowRef
      }, range.map(_this.renderHeadingCell)), /*#__PURE__*/React.createElement("div", {
        className: "rbc-row",
        ref: _this.eventRowRef
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-row-segment"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-event"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-event-content"
      }, "\xA0"))))));
    };
    _this.containerRef = /*#__PURE__*/createRef();
    _this.headingRowRef = /*#__PURE__*/createRef();
    _this.eventRowRef = /*#__PURE__*/createRef();
    _this.slotMetrics = getSlotMetrics$1();
    return _this;
  }
  _inherits(DateContentRow, _React$Component);
  return _createClass(DateContentRow, [{
    key: "getRowLimit",
    value: function getRowLimit() {
      var _this$headingRowRef;
      /* Guessing this only gets called on the dummyRow */
      var eventHeight = getHeight(this.eventRowRef.current);
      var headingHeight = (_this$headingRowRef = this.headingRowRef) !== null && _this$headingRowRef !== void 0 && _this$headingRowRef.current ? getHeight(this.headingRowRef.current) : 0;
      var eventSpace = getHeight(this.containerRef.current) - headingHeight;
      return Math.max(Math.floor(eventSpace / eventHeight), 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        date = _this$props5.date,
        rtl = _this$props5.rtl,
        range = _this$props5.range,
        className = _this$props5.className,
        selected = _this$props5.selected,
        selectable = _this$props5.selectable,
        renderForMeasure = _this$props5.renderForMeasure,
        accessors = _this$props5.accessors,
        getters = _this$props5.getters,
        components = _this$props5.components,
        getNow = _this$props5.getNow,
        renderHeader = _this$props5.renderHeader,
        onSelect = _this$props5.onSelect,
        localizer = _this$props5.localizer,
        onSelectStart = _this$props5.onSelectStart,
        onSelectEnd = _this$props5.onSelectEnd,
        onDoubleClick = _this$props5.onDoubleClick,
        onKeyPress = _this$props5.onKeyPress,
        resourceId = _this$props5.resourceId,
        longPressThreshold = _this$props5.longPressThreshold,
        isAllDay = _this$props5.isAllDay,
        resizable = _this$props5.resizable,
        showAllEvents = _this$props5.showAllEvents;
      if (renderForMeasure) return this.renderDummy();
      var metrics = this.slotMetrics(this.props);
      var levels = metrics.levels,
        extra = metrics.extra;
      var ScrollableWeekComponent = showAllEvents ? ScrollableWeekWrapper : NoopWrapper;
      var WeekWrapper = components.weekWrapper;
      var eventRowProps = {
        selected: selected,
        accessors: accessors,
        getters: getters,
        localizer: localizer,
        components: components,
        onSelect: onSelect,
        onDoubleClick: onDoubleClick,
        onKeyPress: onKeyPress,
        resourceId: resourceId,
        slotMetrics: metrics,
        resizable: resizable
      };
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        role: "rowgroup",
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement(BackgroundCells, {
        localizer: localizer,
        date: date,
        getNow: getNow,
        rtl: rtl,
        range: range,
        selectable: selectable,
        container: this.getContainer,
        getters: getters,
        onSelectStart: onSelectStart,
        onSelectEnd: onSelectEnd,
        onSelectSlot: this.handleSelectSlot,
        components: components,
        longPressThreshold: longPressThreshold,
        resourceId: resourceId
      }), /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable'),
        role: "row"
      }, renderHeader && /*#__PURE__*/React.createElement("div", {
        className: "rbc-row ",
        ref: this.headingRowRef
      }, range.map(this.renderHeadingCell)), /*#__PURE__*/React.createElement(ScrollableWeekComponent, null, /*#__PURE__*/React.createElement(WeekWrapper, Object.assign({
        isAllDay: isAllDay
      }, eventRowProps, {
        rtl: this.props.rtl
      }), levels.map(function (segs, idx) {
        return /*#__PURE__*/React.createElement(EventRow, Object.assign({
          key: idx,
          segments: segs
        }, eventRowProps));
      }), !!extra.length && /*#__PURE__*/React.createElement(EventEndingRow, Object.assign({
        segments: extra,
        onShowMore: this.handleShowMore
      }, eventRowProps))))));
    }
  }]);
}(React.Component);
DateContentRow.defaultProps = {
  minRows: 0,
  maxRows: Infinity
};

var Header = function Header(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/React.createElement("span", {
    role: "columnheader",
    "aria-sort": "none"
  }, label);
};

var DateHeader = function DateHeader(_ref) {
  var label = _ref.label,
    drilldownView = _ref.drilldownView,
    onDrillDown = _ref.onDrillDown;
  if (!drilldownView) {
    return /*#__PURE__*/React.createElement("span", null, label);
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rbc-button-link",
    onClick: onDrillDown
  }, label);
};

var _excluded$6 = ["date", "className"];
var eventsForWeek = function eventsForWeek(evts, start, end, accessors, localizer) {
  return evts.filter(function (e) {
    return inRange(e, start, end, accessors, localizer);
  });
};
var MonthView = /*#__PURE__*/function (_React$Component) {
  function MonthView() {
    var _this;
    _classCallCheck(this, MonthView);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MonthView, [].concat(_args));
    _this.getContainer = function () {
      return _this.containerRef.current;
    };
    _this.renderWeek = function (week, weekIdx) {
      var _this$props = _this.props,
        events = _this$props.events,
        components = _this$props.components,
        selectable = _this$props.selectable,
        getNow = _this$props.getNow,
        selected = _this$props.selected,
        date = _this$props.date,
        localizer = _this$props.localizer,
        longPressThreshold = _this$props.longPressThreshold,
        accessors = _this$props.accessors,
        getters = _this$props.getters,
        showAllEvents = _this$props.showAllEvents;
      var _this$state = _this.state,
        needLimitMeasure = _this$state.needLimitMeasure,
        rowLimit = _this$state.rowLimit;

      // let's not mutate props
      var weeksEvents = eventsForWeek(_toConsumableArray(events), week[0], week[week.length - 1], accessors, localizer);
      var sorted = sortWeekEvents(weeksEvents, accessors, localizer);
      return /*#__PURE__*/React.createElement(DateContentRow, {
        key: weekIdx,
        ref: weekIdx === 0 ? _this.slotRowRef : undefined,
        container: _this.getContainer,
        className: "rbc-month-row",
        getNow: getNow,
        date: date,
        range: week,
        events: sorted,
        maxRows: showAllEvents ? Infinity : rowLimit,
        selected: selected,
        selectable: selectable,
        components: components,
        accessors: accessors,
        getters: getters,
        localizer: localizer,
        renderHeader: _this.readerDateHeading,
        renderForMeasure: needLimitMeasure,
        onShowMore: _this.handleShowMore,
        onSelect: _this.handleSelectEvent,
        onDoubleClick: _this.handleDoubleClickEvent,
        onKeyPress: _this.handleKeyPressEvent,
        onSelectSlot: _this.handleSelectSlot,
        longPressThreshold: longPressThreshold,
        rtl: _this.props.rtl,
        resizable: _this.props.resizable,
        showAllEvents: showAllEvents
      });
    };
    _this.readerDateHeading = function (_ref) {
      var date = _ref.date,
        className = _ref.className,
        props = _objectWithoutProperties(_ref, _excluded$6);
      var _this$props2 = _this.props,
        currentDate = _this$props2.date,
        getDrilldownView = _this$props2.getDrilldownView,
        localizer = _this$props2.localizer;
      var isOffRange = localizer.neq(currentDate, date, 'month');
      var isCurrent = localizer.isSameDate(date, currentDate);
      var drilldownView = getDrilldownView(date);
      var label = localizer.format(date, 'dateFormat');
      var DateHeaderComponent = _this.props.components.dateHeader || DateHeader;
      return /*#__PURE__*/React.createElement("div", Object.assign({}, props, {
        className: clsx(className, isOffRange && 'rbc-off-range', isCurrent && 'rbc-current'),
        role: "cell"
      }), /*#__PURE__*/React.createElement(DateHeaderComponent, {
        label: label,
        date: date,
        drilldownView: drilldownView,
        isOffRange: isOffRange,
        onDrillDown: function onDrillDown(e) {
          return _this.handleHeadingClick(date, drilldownView, e);
        }
      }));
    };
    _this.handleSelectSlot = function (range, slotInfo) {
      _this._pendingSelection = _this._pendingSelection.concat(range);
      clearTimeout(_this._selectTimer);
      _this._selectTimer = setTimeout(function () {
        return _this.selectDates(slotInfo);
      });
    };
    _this.handleHeadingClick = function (date, view, e) {
      e.preventDefault();
      _this.clearSelection();
      notify(_this.props.onDrillDown, [date, view]);
    };
    _this.handleSelectEvent = function () {
      _this.clearSelection();
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function () {
      _this.clearSelection();
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleKeyPressEvent = function () {
      _this.clearSelection();
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleShowMore = function (events, date, cell, slot, target) {
      var _this$props3 = _this.props,
        popup = _this$props3.popup,
        onDrillDown = _this$props3.onDrillDown,
        onShowMore = _this$props3.onShowMore,
        getDrilldownView = _this$props3.getDrilldownView,
        doShowMoreDrillDown = _this$props3.doShowMoreDrillDown;
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection();
      if (popup) {
        var position = getPosition$1(cell, _this.containerRef.current);
        _this.setState({
          overlay: {
            date: date,
            events: events,
            position: position,
            target: target
          }
        });
      } else if (doShowMoreDrillDown) {
        notify(onDrillDown, [date, getDrilldownView(date) || views.DAY]);
      }
      notify(onShowMore, [events, date, slot]);
    };
    _this.overlayDisplay = function () {
      _this.setState({
        overlay: null
      });
    };
    _this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      date: null
    };
    _this.containerRef = /*#__PURE__*/createRef();
    _this.slotRowRef = /*#__PURE__*/createRef();
    _this._bgRows = [];
    _this._pendingSelection = [];
    return _this;
  }
  _inherits(MonthView, _React$Component);
  return _createClass(MonthView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var running;
      if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
      window.addEventListener('resize', this._resizeListener = function () {
        if (!running) {
          animationFrame.request(function () {
            running = false;
            _this2.setState({
              needLimitMeasure: true
            }); //eslint-disable-line
          });
        }
      }, false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._resizeListener, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        date = _this$props4.date,
        localizer = _this$props4.localizer,
        className = _this$props4.className,
        month = localizer.visibleDays(date, localizer),
        weeks = chunk(month, 7);
      this._weekCount = weeks.length;
      return /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-month-view', className),
        role: "table",
        "aria-label": "Month View",
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-row rbc-month-header",
        role: "row"
      }, this.renderHeaders(weeks[0])), weeks.map(this.renderWeek), this.props.popup && this.renderOverlay());
    }
  }, {
    key: "renderHeaders",
    value: function renderHeaders(row) {
      var _this$props5 = this.props,
        localizer = _this$props5.localizer,
        components = _this$props5.components;
      var first = row[0];
      var last = row[row.length - 1];
      var HeaderComponent = components.header || Header;
      return localizer.range(first, last, 'day').map(function (day, idx) {
        return /*#__PURE__*/React.createElement("div", {
          key: 'header_' + idx,
          className: "rbc-header"
        }, /*#__PURE__*/React.createElement(HeaderComponent, {
          date: day,
          localizer: localizer,
          label: localizer.format(day, 'weekdayFormat')
        }));
      });
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var _this$state$overlay,
        _this$state2,
        _this3 = this;
      var overlay = (_this$state$overlay = (_this$state2 = this.state) === null || _this$state2 === void 0 ? void 0 : _this$state2.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
      var _this$props6 = this.props,
        accessors = _this$props6.accessors,
        localizer = _this$props6.localizer,
        components = _this$props6.components,
        getters = _this$props6.getters,
        selected = _this$props6.selected,
        popupOffset = _this$props6.popupOffset,
        handleDragStart = _this$props6.handleDragStart;
      var onHide = function onHide() {
        return _this3.setState({
          overlay: null
        });
      };
      return /*#__PURE__*/React.createElement(PopOverlay, {
        overlay: overlay,
        accessors: accessors,
        localizer: localizer,
        components: components,
        getters: getters,
        selected: selected,
        popupOffset: popupOffset,
        ref: this.containerRef,
        handleKeyPressEvent: this.handleKeyPressEvent,
        handleSelectEvent: this.handleSelectEvent,
        handleDoubleClickEvent: this.handleDoubleClickEvent,
        handleDragStart: handleDragStart,
        show: !!overlay.position,
        overlayDisplay: this.overlayDisplay,
        onHide: onHide
      });

      /* return (
        <Overlay
          rootClose
          placement="bottom"
          show={!!overlay.position}
          onHide={() => this.setState({ overlay: null })}
          target={() => overlay.target}
        >
          {({ props }) => (
            <Popup
              {...props}
              popupOffset={popupOffset}
              accessors={accessors}
              getters={getters}
              selected={selected}
              components={components}
              localizer={localizer}
              position={overlay.position}
              show={this.overlayDisplay}
              events={overlay.events}
              slotStart={overlay.date}
              slotEnd={overlay.end}
              onSelect={this.handleSelectEvent}
              onDoubleClick={this.handleDoubleClickEvent}
              onKeyPress={this.handleKeyPressEvent}
              handleDragStart={this.props.handleDragStart}
            />
          )}
        </Overlay>
      ) */
    }
  }, {
    key: "measureRowLimit",
    value: function measureRowLimit() {
      this.setState({
        needLimitMeasure: false,
        rowLimit: this.slotRowRef.current.getRowLimit()
      });
    }
  }, {
    key: "selectDates",
    value: function selectDates(slotInfo) {
      var slots = this._pendingSelection.slice();
      this._pendingSelection = [];
      slots.sort(function (a, b) {
        return +a - +b;
      });
      var start = new Date(slots[0]);
      var end = new Date(slots[slots.length - 1]);
      end.setDate(slots[slots.length - 1].getDate() + 1);
      notify(this.props.onSelectSlot, {
        slots: slots,
        start: start,
        end: end,
        action: slotInfo.action,
        bounds: slotInfo.bounds,
        box: slotInfo.box
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      clearTimeout(this._selectTimer);
      this._pendingSelection = [];
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref2, state) {
      var date = _ref2.date,
        localizer = _ref2.localizer;
      return {
        date: date,
        needLimitMeasure: localizer.neq(date, state.date, 'month')
      };
    }
  }]);
}(React.Component);
MonthView.range = function (date, _ref3) {
  var localizer = _ref3.localizer;
  var start = localizer.firstVisibleDay(date, localizer);
  var end = localizer.lastVisibleDay(date, localizer);
  return {
    start: start,
    end: end
  };
};
MonthView.navigate = function (date, action, _ref4) {
  var localizer = _ref4.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'month');
    case navigate.NEXT:
      return localizer.add(date, 1, 'month');
    default:
      return date;
  }
};
MonthView.title = function (date, _ref5) {
  var localizer = _ref5.localizer;
  return localizer.format(date, 'monthHeaderFormat');
};

var getKey = function getKey(_ref) {
  var min = _ref.min,
    max = _ref.max,
    step = _ref.step,
    slots = _ref.slots,
    localizer = _ref.localizer;
  return "".concat(+localizer.startOf(min, 'minutes')) + "".concat(+localizer.startOf(max, 'minutes')) + "".concat(step, "-").concat(slots);
};
function getSlotMetrics(_ref2) {
  var start = _ref2.min,
    end = _ref2.max,
    step = _ref2.step,
    timeslots = _ref2.timeslots,
    localizer = _ref2.localizer;
  var key = getKey({
    start: start,
    end: end,
    step: step,
    timeslots: timeslots,
    localizer: localizer
  });

  // DST differences are handled inside the localizer
  var totalMin = 1 + localizer.getTotalMin(start, end);
  var minutesFromMidnight = localizer.getMinutesFromMidnight(start);
  var numGroups = Math.ceil((totalMin - 1) / (step * timeslots));
  var numSlots = numGroups * timeslots;
  var groups = new Array(numGroups);
  var slots = new Array(numSlots);
  // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities
  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots);
    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot;
      var minFromStart = slotIdx * step;
      // A date with total minutes calculated from the start of the day
      slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(start, minutesFromMidnight, minFromStart);
    }
  }

  // Necessary to be able to select up until the last timeslot in a day
  var lastSlotMinFromStart = slots.length * step;
  slots.push(localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart));
  function positionFromDate(date) {
    var diff = localizer.diff(start, date, 'minutes') + localizer.getDstOffset(start, date);
    return Math.min(diff, totalMin);
  }
  return {
    groups: groups,
    update: function update(args) {
      if (getKey(args) !== key) return getSlotMetrics(args);
      return this;
    },
    dateIsInGroup: function dateIsInGroup(date, groupIndex) {
      var nextGroup = groups[groupIndex + 1];
      return localizer.inRange(date, groups[groupIndex][0], nextGroup ? nextGroup[0] : end, 'minutes');
    },
    nextSlot: function nextSlot(slot) {
      // We cannot guarantee that the slot object must be in slots,
      // because after each update, a new slots array will be created.
      var next = slots[Math.min(slots.findIndex(function (s) {
        return s === slot || localizer.eq(s, slot);
      }) + 1, slots.length - 1)];
      // in the case of the last slot we won't a long enough range so manually get it
      if (localizer.eq(next, slot)) next = localizer.add(slot, step, 'minutes');
      return next;
    },
    closestSlotToPosition: function closestSlotToPosition(percent) {
      var slot = Math.min(slots.length - 1, Math.max(0, Math.floor(percent * numSlots)));
      return slots[slot];
    },
    closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
      var range = Math.abs(boundaryRect.top - boundaryRect.bottom);
      return this.closestSlotToPosition((point.y - boundaryRect.top) / range);
    },
    closestSlotFromDate: function closestSlotFromDate(date) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (localizer.lt(date, start, 'minutes')) return slots[0];
      if (localizer.gt(date, end, 'minutes')) return slots[slots.length - 1];
      var diffMins = localizer.diff(start, date, 'minutes');
      return slots[(diffMins - diffMins % step) / step + offset];
    },
    startsBeforeDay: function startsBeforeDay(date) {
      return localizer.lt(date, start, 'day');
    },
    startsAfterDay: function startsAfterDay(date) {
      return localizer.gt(date, end, 'day');
    },
    startsBefore: function startsBefore(date) {
      return localizer.lt(localizer.merge(start, date), start, 'minutes');
    },
    startsAfter: function startsAfter(date) {
      return localizer.gt(localizer.merge(end, date), end, 'minutes');
    },
    getRange: function getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
      if (!ignoreMin) rangeStart = localizer.min(end, localizer.max(start, rangeStart));
      if (!ignoreMax) rangeEnd = localizer.min(end, localizer.max(start, rangeEnd));
      var rangeStartMin = positionFromDate(rangeStart);
      var rangeEndMin = positionFromDate(rangeEnd);
      var top = rangeEndMin > step * numSlots && !localizer.eq(end, rangeEnd) ? (rangeStartMin - step) / (step * numSlots) * 100 : rangeStartMin / (step * numSlots) * 100;
      return {
        top: top,
        height: rangeEndMin / (step * numSlots) * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd
      };
    },
    getCurrentTimePosition: function getCurrentTimePosition(rangeStart) {
      var rangeStartMin = positionFromDate(rangeStart);
      var top = rangeStartMin / (step * numSlots) * 100;
      return top;
    }
  };
}

var Event = /*#__PURE__*/function () {
  function Event(data, _ref) {
    var accessors = _ref.accessors,
      slotMetrics = _ref.slotMetrics;
    _classCallCheck(this, Event);
    var _slotMetrics$getRange = slotMetrics.getRange(accessors.start(data), accessors.end(data)),
      start = _slotMetrics$getRange.start,
      startDate = _slotMetrics$getRange.startDate,
      end = _slotMetrics$getRange.end,
      endDate = _slotMetrics$getRange.endDate,
      top = _slotMetrics$getRange.top,
      height = _slotMetrics$getRange.height;
    this.start = start;
    this.end = end;
    this.startMs = +startDate;
    this.endMs = +endDate;
    this.top = top;
    this.height = height;
    this.data = data;
  }

  /**
   * The event's width without any overlap.
   */
  return _createClass(Event, [{
    key: "_width",
    get: function get() {
      // The container event's width is determined by the maximum number of
      // events in any of its rows.
      if (this.rows) {
        var columns = this.rows.reduce(function (max, row) {
          return Math.max(max, row.leaves.length + 1);
        },
        // add itself
        0) + 1; // add the container

        return 100 / columns;
      }

      // The row event's width is the space left by the container, divided
      // among itself and its leaves.
      if (this.leaves) {
        var availableWidth = 100 - this.container._width;
        return availableWidth / (this.leaves.length + 1);
      }

      // The leaf event's width is determined by its row's width
      return this.row._width;
    }

    /**
     * The event's calculated width, possibly with extra width added for
     * overlapping effect.
     */
  }, {
    key: "width",
    get: function get() {
      var noOverlap = this._width;
      var overlap = Math.min(100, this._width * 1.7);

      // Containers can always grow.
      if (this.rows) {
        return overlap;
      }

      // Rows can grow if they have leaves.
      if (this.leaves) {
        return this.leaves.length > 0 ? overlap : noOverlap;
      }

      // Leaves can grow unless they're the last item in a row.
      var leaves = this.row.leaves;
      var index = leaves.indexOf(this);
      return index === leaves.length - 1 ? noOverlap : overlap;
    }
  }, {
    key: "xOffset",
    get: function get() {
      // Containers have no offset.
      if (this.rows) return 0;

      // Rows always start where their container ends.
      if (this.leaves) return this.container._width;

      // Leaves are spread out evenly on the space left by its row.
      var _this$row = this.row,
        leaves = _this$row.leaves,
        xOffset = _this$row.xOffset,
        _width = _this$row._width;
      var index = leaves.indexOf(this) + 1;
      return xOffset + index * _width;
    }
  }]);
}();
/**
 * Return true if event a and b is considered to be on the same row.
 */
function onSameRow(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference ||
    // A's start slot overlaps with b's end slot.
    b.start > a.start && b.start < a.end
  );
}
function sortByRender(events) {
  var sortedByTime = sortBy(events, ['startMs', function (e) {
    return -e.endMs;
  }]);
  var sorted = [];
  while (sortedByTime.length > 0) {
    var event = sortedByTime.shift();
    sorted.push(event);
    for (var i = 0; i < sortedByTime.length; i++) {
      var test = sortedByTime[i];

      // Still inside this event, look for next.
      if (event.endMs > test.startMs) continue;

      // We've found the first event of the next event group.
      // If that event is not right next to our current event, we have to
      // move it here.
      if (i > 0) {
        var _event = sortedByTime.splice(i, 1)[0];
        sorted.push(_event);
      }

      // We've already found the next event group, so stop looking.
      break;
    }
  }
  return sorted;
}
function getStyledEvents$1(_ref2) {
  var events = _ref2.events,
    minimumStartDifference = _ref2.minimumStartDifference,
    slotMetrics = _ref2.slotMetrics,
    accessors = _ref2.accessors;
  // Create proxy events and order them so that we don't have
  // to fiddle with z-indexes.
  var proxies = events.map(function (event) {
    return new Event(event, {
      slotMetrics: slotMetrics,
      accessors: accessors
    });
  });
  var eventsInRenderOrder = sortByRender(proxies);

  // Group overlapping events, while keeping order.
  // Every event is always one of: container, row or leaf.
  // Containers can contain rows, and rows can contain leaves.
  var containerEvents = [];
  var _loop = function _loop() {
    var event = eventsInRenderOrder[i];

    // Check if this event can go into a container event.
    var container = containerEvents.find(function (c) {
      return c.end > event.start || Math.abs(event.start - c.start) < minimumStartDifference;
    });

    // Couldn't find a container — that means this event is a container.
    if (!container) {
      event.rows = [];
      containerEvents.push(event);
      return 1; // continue
    }

    // Found a container for the event.
    event.container = container;

    // Check if the event can be placed in an existing row.
    // Start looking from behind.
    var row = null;
    for (var j = container.rows.length - 1; !row && j >= 0; j--) {
      if (onSameRow(container.rows[j], event, minimumStartDifference)) {
        row = container.rows[j];
      }
    }
    if (row) {
      // Found a row, so add it.
      row.leaves.push(event);
      event.row = row;
    } else {
      // Couldn't find a row – that means this event is a row.
      event.leaves = [];
      container.rows.push(event);
    }
  };
  for (var i = 0; i < eventsInRenderOrder.length; i++) {
    if (_loop()) continue;
  }

  // Return the original events, along with their styles.
  return eventsInRenderOrder.map(function (event) {
    return {
      event: event.data,
      style: {
        top: event.top,
        height: event.height,
        width: event.width,
        xOffset: Math.max(0, event.xOffset)
      }
    };
  });
}

function getMaxIdxDFS(node, maxIdx, visited) {
  for (var i = 0; i < node.friends.length; ++i) {
    if (visited.indexOf(node.friends[i]) > -1) continue;
    maxIdx = maxIdx > node.friends[i].idx ? maxIdx : node.friends[i].idx;
    // TODO : trace it by not object but kinda index or something for performance
    visited.push(node.friends[i]);
    var newIdx = getMaxIdxDFS(node.friends[i], maxIdx, visited);
    maxIdx = maxIdx > newIdx ? maxIdx : newIdx;
  }
  return maxIdx;
}
function noOverlap (_ref) {
  var events = _ref.events,
    minimumStartDifference = _ref.minimumStartDifference,
    slotMetrics = _ref.slotMetrics,
    accessors = _ref.accessors;
  var styledEvents = getStyledEvents$1({
    events: events,
    minimumStartDifference: minimumStartDifference,
    slotMetrics: slotMetrics,
    accessors: accessors
  });
  styledEvents.sort(function (a, b) {
    a = a.style;
    b = b.style;
    if (a.top !== b.top) return a.top > b.top ? 1 : -1;else if (a.height !== b.height) return a.top + a.height < b.top + b.height ? 1 : -1;else return 0;
  });
  for (var i = 0; i < styledEvents.length; ++i) {
    styledEvents[i].friends = [];
    delete styledEvents[i].style.left;
    delete styledEvents[i].style.left;
    delete styledEvents[i].idx;
    delete styledEvents[i].size;
  }
  for (var _i2 = 0; _i2 < styledEvents.length - 1; ++_i2) {
    var se1 = styledEvents[_i2];
    var y1 = se1.style.top;
    var y2 = se1.style.top + se1.style.height;
    for (var j = _i2 + 1; j < styledEvents.length; ++j) {
      var se2 = styledEvents[j];
      var y3 = se2.style.top;
      var y4 = se2.style.top + se2.style.height;
      if (y3 >= y1 && y4 <= y2 || y4 > y1 && y4 <= y2 || y3 >= y1 && y3 < y2) {
        // TODO : hashmap would be effective for performance
        se1.friends.push(se2);
        se2.friends.push(se1);
      }
    }
  }
  for (var _i4 = 0; _i4 < styledEvents.length; ++_i4) {
    var se = styledEvents[_i4];
    var bitmap = [];
    for (var _j2 = 0; _j2 < 100; ++_j2) bitmap.push(1); // 1 means available

    for (var _j4 = 0; _j4 < se.friends.length; ++_j4) if (se.friends[_j4].idx !== undefined) bitmap[se.friends[_j4].idx] = 0; // 0 means reserved

    se.idx = bitmap.indexOf(1);
  }
  for (var _i6 = 0; _i6 < styledEvents.length; ++_i6) {
    var size = 0;
    if (styledEvents[_i6].size) continue;
    var allFriends = [];
    var maxIdx = getMaxIdxDFS(styledEvents[_i6], 0, allFriends);
    size = 100 / (maxIdx + 1);
    styledEvents[_i6].size = size;
    for (var _j6 = 0; _j6 < allFriends.length; ++_j6) allFriends[_j6].size = size;
  }
  for (var _i8 = 0; _i8 < styledEvents.length; ++_i8) {
    var e = styledEvents[_i8];
    e.style.left = e.idx * e.size;

    // stretch to maximum
    var _maxIdx = 0;
    for (var _j8 = 0; _j8 < e.friends.length; ++_j8) {
      var idx = e.friends[_j8].idx;
      _maxIdx = _maxIdx > idx ? _maxIdx : idx;
    }
    if (_maxIdx <= e.idx) e.size = 100 - e.idx * e.size;

    // padding between events
    // for this feature, `width` is not percentage based unit anymore
    // it will be used with calc()
    var padding = e.idx === 0 ? 0 : 3;
    e.style.width = "calc(".concat(e.size, "% - ").concat(padding, "px)");
    e.style.height = "calc(".concat(e.style.height, "% - 2px)");
    e.style.xOffset = "calc(".concat(e.style.left, "% + ").concat(padding, "px)");
  }
  return styledEvents;
}

/*eslint no-unused-vars: "off"*/

var DefaultAlgorithms = {
  overlap: getStyledEvents$1,
  'no-overlap': noOverlap
};
function isFunction(a) {
  return !!(a && a.constructor && a.call && a.apply);
}

//
function getStyledEvents(_ref) {
  _ref.events;
    _ref.minimumStartDifference;
    _ref.slotMetrics;
    _ref.accessors;
    var dayLayoutAlgorithm = _ref.dayLayoutAlgorithm;
  var algorithm = dayLayoutAlgorithm;
  if (dayLayoutAlgorithm in DefaultAlgorithms) algorithm = DefaultAlgorithms[dayLayoutAlgorithm];
  if (!isFunction(algorithm)) {
    // invalid algorithm
    return [];
  }
  return algorithm.apply(this, arguments);
}

var TimeSlotGroup = /*#__PURE__*/function (_Component) {
  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup);
    return _callSuper(this, TimeSlotGroup, arguments);
  }
  _inherits(TimeSlotGroup, _Component);
  return _createClass(TimeSlotGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        renderSlot = _this$props.renderSlot,
        resource = _this$props.resource,
        group = _this$props.group,
        getters = _this$props.getters,
        _this$props$component = _this$props.components,
        _this$props$component2 = _this$props$component === void 0 ? {} : _this$props$component,
        _this$props$component3 = _this$props$component2.timeSlotWrapper,
        Wrapper = _this$props$component3 === void 0 ? NoopWrapper : _this$props$component3;
      var groupProps = getters ? getters.slotGroupProp(group) : {};
      return /*#__PURE__*/React.createElement("div", Object.assign({
        className: "rbc-timeslot-group"
      }, groupProps), group.map(function (value, idx) {
        var slotProps = getters ? getters.slotProp(value, resource) : {};
        return /*#__PURE__*/React.createElement(Wrapper, {
          key: idx,
          value: value,
          resource: resource
        }, /*#__PURE__*/React.createElement("div", Object.assign({}, slotProps, {
          className: clsx('rbc-time-slot', slotProps.className)
        }), renderSlot && renderSlot(value, idx)));
      }));
    }
  }]);
}(Component);

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%';
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  var style = props.style,
    className = props.className,
    event = props.event,
    accessors = props.accessors,
    rtl = props.rtl,
    selected = props.selected,
    label = props.label,
    continuesPrior = props.continuesPrior,
    continuesAfter = props.continuesAfter,
    getters = props.getters,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    isBackgroundEvent = props.isBackgroundEvent,
    onKeyPress = props.onKeyPress,
    _props$components = props.components,
    Event = _props$components.event,
    EventWrapper = _props$components.eventWrapper;
  var title = accessors.title(event);
  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event);
  var userProps = getters.eventProp(event, start, end, selected);
  var inner = [/*#__PURE__*/React.createElement("div", {
    key: "1",
    className: "rbc-event-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    key: "2",
    className: "rbc-event-content"
  }, Event ? /*#__PURE__*/React.createElement(Event, {
    event: event,
    title: title
  }) : title)];
  var height = style.height,
    top = style.top,
    width = style.width,
    xOffset = style.xOffset;
  var eventStyle = _objectSpread(_objectSpread({}, userProps.style), {}, _defineProperty({
    top: stringifyPercent(top),
    height: stringifyPercent(height),
    width: stringifyPercent(width)
  }, rtl ? 'right' : 'left', stringifyPercent(xOffset)));
  return /*#__PURE__*/React.createElement(EventWrapper, Object.assign({
    type: "time"
  }, props), /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    style: eventStyle,
    onKeyDown: onKeyPress,
    title: tooltip ? (typeof label === 'string' ? label + ': ' : '') + tooltip : undefined,
    className: clsx(isBackgroundEvent ? 'rbc-background-event' : 'rbc-event', className, userProps.className, {
      'rbc-selected': selected,
      'rbc-event-continues-earlier': continuesPrior,
      'rbc-event-continues-later': continuesAfter
    })
  }, inner));
}

var DayColumnWrapper = function DayColumnWrapper(_ref) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    innerRef = _ref.innerRef;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style,
    ref: innerRef
  }, children);
};
var DayColumnWrapper$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(DayColumnWrapper, Object.assign({}, props, {
    innerRef: ref
  }));
});

var _excluded$5 = ["dayProp"],
  _excluded2$1 = ["eventContainerWrapper", "timeIndicatorWrapper"];
var DayColumn = /*#__PURE__*/function (_React$Component) {
  function DayColumn() {
    var _this;
    _classCallCheck(this, DayColumn);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DayColumn, [].concat(_args));
    _this.state = {
      selecting: false,
      timeIndicatorPosition: null
    };
    _this.intervalTriggered = false;
    _this.renderEvents = function (_ref) {
      var events = _ref.events,
        isBackgroundEvent = _ref.isBackgroundEvent;
      var _this$props = _this.props,
        rtl = _this$props.rtl,
        selected = _this$props.selected,
        accessors = _this$props.accessors,
        localizer = _this$props.localizer,
        getters = _this$props.getters,
        components = _this$props.components,
        step = _this$props.step,
        timeslots = _this$props.timeslots,
        dayLayoutAlgorithm = _this$props.dayLayoutAlgorithm,
        resizable = _this$props.resizable;
      var _this2 = _this,
        slotMetrics = _this2.slotMetrics;
      var messages = localizer.messages;
      var styledEvents = getStyledEvents({
        events: events,
        accessors: accessors,
        slotMetrics: slotMetrics,
        minimumStartDifference: Math.ceil(step * timeslots / 2),
        dayLayoutAlgorithm: dayLayoutAlgorithm
      });
      return styledEvents.map(function (_ref2, idx) {
        var _accessors$eventId;
        var event = _ref2.event,
          style = _ref2.style;
        var end = accessors.end(event);
        var start = accessors.start(event);
        var key = (_accessors$eventId = accessors.eventId(event)) !== null && _accessors$eventId !== void 0 ? _accessors$eventId : 'evt_' + idx;
        var format = 'eventTimeRangeFormat';
        var label;
        var startsBeforeDay = slotMetrics.startsBeforeDay(start);
        var startsAfterDay = slotMetrics.startsAfterDay(end);
        if (startsBeforeDay) format = 'eventTimeRangeEndFormat';else if (startsAfterDay) format = 'eventTimeRangeStartFormat';
        if (startsBeforeDay && startsAfterDay) label = messages.allDay;else label = localizer.format({
          start: start,
          end: end
        }, format);
        var continuesPrior = startsBeforeDay || slotMetrics.startsBefore(start);
        var continuesAfter = startsAfterDay || slotMetrics.startsAfter(end);
        return /*#__PURE__*/React.createElement(TimeGridEvent, {
          style: style,
          event: event,
          label: label,
          key: key,
          getters: getters,
          rtl: rtl,
          components: components,
          continuesPrior: continuesPrior,
          continuesAfter: continuesAfter,
          accessors: accessors,
          resource: _this.props.resource,
          selected: isSelected(event, selected),
          onClick: function onClick(e) {
            return _this._select(_objectSpread(_objectSpread(_objectSpread({}, event), _this.props.resource && {
              sourceResource: _this.props.resource
            }), isBackgroundEvent && {
              isBackgroundEvent: true
            }), e);
          },
          onDoubleClick: function onDoubleClick(e) {
            return _this._doubleClick(event, e);
          },
          isBackgroundEvent: isBackgroundEvent,
          onKeyPress: function onKeyPress(e) {
            return _this._keyPress(event, e);
          },
          resizable: resizable
        });
      });
    };
    _this._selectable = function () {
      var node = _this.containerRef.current;
      var _this$props2 = _this.props,
        longPressThreshold = _this$props2.longPressThreshold,
        localizer = _this$props2.localizer;
      var selector = _this._selector = new Selection(function () {
        return node;
      }, {
        longPressThreshold: longPressThreshold
      });
      var maybeSelect = function maybeSelect(box) {
        var onSelecting = _this.props.onSelecting;
        var current = _this.state || {};
        var state = selectionState(box);
        var start = state.startDate,
          end = state.endDate;
        if (onSelecting) {
          if (localizer.eq(current.startDate, start, 'minutes') && localizer.eq(current.endDate, end, 'minutes') || onSelecting({
            start: start,
            end: end,
            resourceId: _this.props.resource
          }) === false) return;
        }
        if (_this.state.start !== state.start || _this.state.end !== state.end || _this.state.selecting !== state.selecting) {
          _this.setState(state);
        }
      };
      var selectionState = function selectionState(point) {
        var currentSlot = _this.slotMetrics.closestSlotFromPoint(point, getBoundsForNode(node));
        if (!_this.state.selecting) {
          _this._initialSlot = currentSlot;
        }
        var initialSlot = _this._initialSlot;
        if (localizer.lte(initialSlot, currentSlot)) {
          currentSlot = _this.slotMetrics.nextSlot(currentSlot);
        } else if (localizer.gt(initialSlot, currentSlot)) {
          initialSlot = _this.slotMetrics.nextSlot(initialSlot);
        }
        var selectRange = _this.slotMetrics.getRange(localizer.min(initialSlot, currentSlot), localizer.max(initialSlot, currentSlot));
        return _objectSpread(_objectSpread({}, selectRange), {}, {
          selecting: true,
          top: "".concat(selectRange.top, "%"),
          height: "".concat(selectRange.height, "%")
        });
      };
      var selectorClicksHandler = function selectorClicksHandler(box, actionType) {
        if (!isEvent(_this.containerRef.current, box)) {
          var _selectionState = selectionState(box),
            startDate = _selectionState.startDate,
            endDate = _selectionState.endDate;
          _this._selectSlot({
            startDate: startDate,
            endDate: endDate,
            action: actionType,
            box: box
          });
        }
        _this.setState({
          selecting: false
        });
      };
      selector.on('selecting', maybeSelect);
      selector.on('selectStart', maybeSelect);
      selector.on('beforeSelect', function (box) {
        if (_this.props.selectable !== 'ignoreEvents') return;
        return !isEvent(_this.containerRef.current, box);
      });
      selector.on('click', function (box) {
        return selectorClicksHandler(box, 'click');
      });
      selector.on('doubleClick', function (box) {
        return selectorClicksHandler(box, 'doubleClick');
      });
      selector.on('select', function (bounds) {
        if (_this.state.selecting) {
          _this._selectSlot(_objectSpread(_objectSpread({}, _this.state), {}, {
            action: 'select',
            bounds: bounds
          }));
          _this.setState({
            selecting: false
          });
        }
      });
      selector.on('reset', function () {
        if (_this.state.selecting) {
          _this.setState({
            selecting: false
          });
        }
      });
    };
    _this._teardownSelectable = function () {
      if (!_this._selector) return;
      _this._selector.teardown();
      _this._selector = null;
    };
    _this._selectSlot = function (_ref3) {
      var startDate = _ref3.startDate,
        endDate = _ref3.endDate,
        action = _ref3.action,
        bounds = _ref3.bounds,
        box = _ref3.box;
      var current = startDate,
        slots = [];
      while (_this.props.localizer.lte(current, endDate)) {
        slots.push(current);
        current = new Date(+current + _this.props.step * 60 * 1000); // using Date ensures not to create an endless loop the day DST begins
      }
      notify(_this.props.onSelectSlot, {
        slots: slots,
        start: startDate,
        end: endDate,
        resourceId: _this.props.resource,
        action: action,
        bounds: bounds,
        box: box
      });
    };
    _this._select = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this._doubleClick = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this._keyPress = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.slotMetrics = getSlotMetrics(_this.props);
    _this.containerRef = /*#__PURE__*/createRef();
    return _this;
  }
  _inherits(DayColumn, _React$Component);
  return _createClass(DayColumn, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
      if (this.props.isNow) {
        this.setTimeIndicatorPositionUpdateInterval();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
      this.clearTimeIndicatorInterval();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.selectable && !prevProps.selectable) this._selectable();
      if (!this.props.selectable && prevProps.selectable) this._teardownSelectable();
      var _this$props3 = this.props,
        getNow = _this$props3.getNow,
        isNow = _this$props3.isNow,
        localizer = _this$props3.localizer,
        date = _this$props3.date,
        min = _this$props3.min,
        max = _this$props3.max;
      var getNowChanged = localizer.neq(prevProps.getNow(), getNow(), 'minutes');
      if (prevProps.isNow !== isNow || getNowChanged) {
        this.clearTimeIndicatorInterval();
        if (isNow) {
          var tail = !getNowChanged && localizer.eq(prevProps.date, date, 'minutes') && prevState.timeIndicatorPosition === this.state.timeIndicatorPosition;
          this.setTimeIndicatorPositionUpdateInterval(tail);
        }
      } else if (isNow && (localizer.neq(prevProps.min, min, 'minutes') || localizer.neq(prevProps.max, max, 'minutes'))) {
        this.positionTimeIndicator();
      }
    }

    /**
     * @param tail {Boolean} - whether `positionTimeIndicator` call should be
     *   deferred or called upon setting interval (`true` - if deferred);
     */
  }, {
    key: "setTimeIndicatorPositionUpdateInterval",
    value: function setTimeIndicatorPositionUpdateInterval() {
      var _this3 = this;
      var tail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.intervalTriggered && !tail) {
        this.positionTimeIndicator();
      }
      this._timeIndicatorTimeout = window.setTimeout(function () {
        _this3.intervalTriggered = true;
        _this3.positionTimeIndicator();
        _this3.setTimeIndicatorPositionUpdateInterval();
      }, 60000);
    }
  }, {
    key: "clearTimeIndicatorInterval",
    value: function clearTimeIndicatorInterval() {
      this.intervalTriggered = false;
      window.clearTimeout(this._timeIndicatorTimeout);
    }
  }, {
    key: "positionTimeIndicator",
    value: function positionTimeIndicator() {
      var _this$props4 = this.props,
        min = _this$props4.min,
        max = _this$props4.max,
        getNow = _this$props4.getNow;
      var current = getNow();
      if (current >= min && current <= max) {
        var top = this.slotMetrics.getCurrentTimePosition(current);
        this.intervalTriggered = true;
        this.setState({
          timeIndicatorPosition: top
        });
      } else {
        this.clearTimeIndicatorInterval();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        date = _this$props5.date,
        max = _this$props5.max,
        rtl = _this$props5.rtl,
        isNow = _this$props5.isNow,
        resource = _this$props5.resource,
        accessors = _this$props5.accessors,
        localizer = _this$props5.localizer,
        _this$props5$getters = _this$props5.getters,
        dayProp = _this$props5$getters.dayProp,
        getters = _objectWithoutProperties(_this$props5$getters, _excluded$5),
        _this$props5$componen = _this$props5.components,
        EventContainer = _this$props5$componen.eventContainerWrapper,
        TimeIndicatorWrapper = _this$props5$componen.timeIndicatorWrapper,
        components = _objectWithoutProperties(_this$props5$componen, _excluded2$1);
      this.slotMetrics = this.slotMetrics.update(this.props);
      var slotMetrics = this.slotMetrics;
      var _this$state = this.state,
        selecting = _this$state.selecting,
        top = _this$state.top,
        height = _this$state.height,
        startDate = _this$state.startDate,
        endDate = _this$state.endDate;
      var selectDates = {
        start: startDate,
        end: endDate
      };
      var _dayProp = dayProp(max, resource),
        className = _dayProp.className,
        style = _dayProp.style;
      var timeIndicatorProps = {
        className: 'rbc-current-time-indicator',
        style: {
          top: "".concat(this.state.timeIndicatorPosition, "%")
        }
      };
      var DayColumnWrapperComponent = components.dayColumnWrapper || DayColumnWrapper$1;
      return /*#__PURE__*/React.createElement(DayColumnWrapperComponent, {
        ref: this.containerRef,
        date: date,
        style: style,
        className: clsx(className, 'rbc-day-slot', 'rbc-time-column', isNow && 'rbc-now', isNow && 'rbc-today',
        // WHY
        selecting && 'rbc-slot-selecting'),
        slotMetrics: slotMetrics,
        resource: resource
      }, slotMetrics.groups.map(function (grp, idx) {
        return /*#__PURE__*/React.createElement(TimeSlotGroup, {
          key: idx,
          group: grp,
          resource: resource,
          getters: getters,
          components: components
        });
      }), /*#__PURE__*/React.createElement(EventContainer, {
        localizer: localizer,
        resource: resource,
        accessors: accessors,
        getters: getters,
        components: components,
        slotMetrics: slotMetrics
      }, /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-events-container', rtl && 'rtl')
      }, this.renderEvents({
        events: this.props.backgroundEvents,
        isBackgroundEvent: true
      }), this.renderEvents({
        events: this.props.events
      }))), selecting && /*#__PURE__*/React.createElement("div", {
        className: "rbc-slot-selection",
        style: {
          top: top,
          height: height
        }
      }, /*#__PURE__*/React.createElement("span", null, localizer.format(selectDates, 'selectRangeFormat'))), isNow && this.intervalTriggered && /*#__PURE__*/React.createElement(TimeIndicatorWrapper, timeIndicatorProps, /*#__PURE__*/React.createElement("div", timeIndicatorProps)));
    }
  }]);
}(React.Component);
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2
};

var ResourceHeader = function ResourceHeader(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/React.createElement(React.Fragment, null, label);
};

var TimeGridHeader = /*#__PURE__*/function (_React$Component) {
  function TimeGridHeader() {
    var _this;
    _classCallCheck(this, TimeGridHeader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, TimeGridHeader, [].concat(args));
    _this.handleHeaderClick = function (date, view, e) {
      e.preventDefault();
      notify(_this.props.onDrillDown, [date, view]);
    };
    _this.renderRow = function (resource) {
      var _this$props = _this.props,
        events = _this$props.events,
        rtl = _this$props.rtl,
        selectable = _this$props.selectable,
        getNow = _this$props.getNow,
        range = _this$props.range,
        getters = _this$props.getters,
        localizer = _this$props.localizer,
        accessors = _this$props.accessors,
        components = _this$props.components,
        resizable = _this$props.resizable;
      var resourceId = accessors.resourceId(resource);
      var eventsToDisplay = resource ? events.filter(function (event) {
        return accessors.resource(event) === resourceId;
      }) : events;
      return /*#__PURE__*/React.createElement(DateContentRow, {
        isAllDay: true,
        rtl: rtl,
        getNow: getNow,
        minRows: 2
        // Add +1 to include showMore button row in the row limit
        ,
        maxRows: _this.props.allDayMaxRows + 1,
        range: range,
        events: eventsToDisplay,
        resourceId: resourceId,
        className: "rbc-allday-cell",
        selectable: selectable,
        selected: _this.props.selected,
        components: components,
        accessors: accessors,
        getters: getters,
        localizer: localizer,
        onSelect: _this.props.onSelectEvent,
        onShowMore: _this.props.onShowMore,
        onDoubleClick: _this.props.onDoubleClickEvent,
        onKeyPress: _this.props.onKeyPressEvent,
        onSelectSlot: _this.props.onSelectSlot,
        longPressThreshold: _this.props.longPressThreshold,
        resizable: resizable
      });
    };
    return _this;
  }
  _inherits(TimeGridHeader, _React$Component);
  return _createClass(TimeGridHeader, [{
    key: "renderHeaderCells",
    value: function renderHeaderCells(range) {
      var _this2 = this;
      var _this$props2 = this.props,
        localizer = _this$props2.localizer,
        getDrilldownView = _this$props2.getDrilldownView,
        getNow = _this$props2.getNow,
        dayProp = _this$props2.getters.dayProp,
        _this$props2$componen = _this$props2.components.header,
        HeaderComponent = _this$props2$componen === void 0 ? Header : _this$props2$componen;
      var today = getNow();
      return range.map(function (date, i) {
        var drilldownView = getDrilldownView(date);
        var label = localizer.format(date, 'dayFormat');
        var _dayProp = dayProp(date),
          className = _dayProp.className,
          style = _dayProp.style;
        var header = /*#__PURE__*/React.createElement(HeaderComponent, {
          date: date,
          label: label,
          localizer: localizer
        });
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: style,
          className: clsx('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today')
        }, drilldownView ? /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "rbc-button-link",
          onClick: function onClick(e) {
            return _this2.handleHeaderClick(date, drilldownView, e);
          }
        }, header) : /*#__PURE__*/React.createElement("span", null, header));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props,
        width = _this$props3.width,
        rtl = _this$props3.rtl,
        resources = _this$props3.resources,
        range = _this$props3.range,
        events = _this$props3.events,
        getNow = _this$props3.getNow,
        accessors = _this$props3.accessors,
        selectable = _this$props3.selectable,
        components = _this$props3.components,
        getters = _this$props3.getters,
        scrollRef = _this$props3.scrollRef,
        localizer = _this$props3.localizer,
        isOverflowing = _this$props3.isOverflowing,
        _this$props3$componen = _this$props3.components,
        TimeGutterHeader = _this$props3$componen.timeGutterHeader,
        _this$props3$componen2 = _this$props3$componen.resourceHeader,
        ResourceHeaderComponent = _this$props3$componen2 === void 0 ? ResourceHeader : _this$props3$componen2,
        resizable = _this$props3.resizable;
      var style = {};
      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] = "".concat(scrollbarSize() - 1, "px");
      }
      var groupedEvents = resources.groupEvents(events);
      return /*#__PURE__*/React.createElement("div", {
        style: style,
        ref: scrollRef,
        className: clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-label rbc-time-header-gutter",
        style: {
          width: width,
          minWidth: width,
          maxWidth: width
        }
      }, TimeGutterHeader && /*#__PURE__*/React.createElement(TimeGutterHeader, null)), resources.map(function (_ref, idx) {
        var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          resource = _ref2[1];
        return /*#__PURE__*/React.createElement("div", {
          className: "rbc-time-header-content",
          key: id || idx
        }, resource && /*#__PURE__*/React.createElement("div", {
          className: "rbc-row rbc-row-resource",
          key: "resource_".concat(idx)
        }, /*#__PURE__*/React.createElement("div", {
          className: "rbc-header"
        }, /*#__PURE__*/React.createElement(ResourceHeaderComponent, {
          index: idx,
          label: accessors.resourceTitle(resource),
          resource: resource
        }))), /*#__PURE__*/React.createElement("div", {
          className: "rbc-row rbc-time-header-cell".concat(range.length <= 1 ? ' rbc-time-header-cell-single-day' : '')
        }, _this3.renderHeaderCells(range)), /*#__PURE__*/React.createElement(DateContentRow, {
          isAllDay: true,
          rtl: rtl,
          getNow: getNow,
          minRows: 2
          // Add +1 to include showMore button row in the row limit
          ,
          maxRows: _this3.props.allDayMaxRows + 1,
          range: range,
          events: groupedEvents.get(id) || [],
          resourceId: resource && id,
          className: "rbc-allday-cell",
          selectable: selectable,
          selected: _this3.props.selected,
          components: components,
          accessors: accessors,
          getters: getters,
          localizer: localizer,
          onSelect: _this3.props.onSelectEvent,
          onShowMore: _this3.props.onShowMore,
          onDoubleClick: _this3.props.onDoubleClickEvent,
          onKeyDown: _this3.props.onKeyPressEvent,
          onSelectSlot: _this3.props.onSelectSlot,
          longPressThreshold: _this3.props.longPressThreshold,
          resizable: resizable
        }));
      }));
    }
  }]);
}(React.Component);

var TimeGridHeaderResources = /*#__PURE__*/function (_React$Component) {
  function TimeGridHeaderResources() {
    var _this;
    _classCallCheck(this, TimeGridHeaderResources);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, TimeGridHeaderResources, [].concat(args));
    _this.handleHeaderClick = function (date, view, e) {
      e.preventDefault();
      notify(_this.props.onDrillDown, [date, view]);
    };
    return _this;
  }
  _inherits(TimeGridHeaderResources, _React$Component);
  return _createClass(TimeGridHeaderResources, [{
    key: "renderHeaderCells",
    value: function renderHeaderCells(range) {
      var _this2 = this;
      var _this$props = this.props,
        localizer = _this$props.localizer,
        getDrilldownView = _this$props.getDrilldownView,
        getNow = _this$props.getNow,
        dayProp = _this$props.getters.dayProp,
        _this$props$component = _this$props.components,
        _this$props$component2 = _this$props$component.header,
        HeaderComponent = _this$props$component2 === void 0 ? Header : _this$props$component2,
        _this$props$component3 = _this$props$component.resourceHeader,
        ResourceHeaderComponent = _this$props$component3 === void 0 ? ResourceHeader : _this$props$component3,
        resources = _this$props.resources,
        accessors = _this$props.accessors,
        events = _this$props.events,
        rtl = _this$props.rtl,
        selectable = _this$props.selectable,
        components = _this$props.components,
        getters = _this$props.getters,
        resizable = _this$props.resizable;
      var today = getNow();
      var groupedEvents = resources.groupEvents(events);
      return range.map(function (date, idx) {
        var drilldownView = getDrilldownView(date);
        var label = localizer.format(date, 'dayFormat');
        var _dayProp = dayProp(date),
          className = _dayProp.className,
          style = _dayProp.style;
        var header = /*#__PURE__*/React.createElement(HeaderComponent, {
          date: date,
          label: label,
          localizer: localizer
        });
        return /*#__PURE__*/React.createElement("div", {
          key: idx,
          className: "rbc-time-header-content rbc-resource-grouping"
        }, /*#__PURE__*/React.createElement("div", {
          className: "rbc-row rbc-time-header-cell".concat(range.length <= 1 ? ' rbc-time-header-cell-single-day' : '')
        }, /*#__PURE__*/React.createElement("div", {
          style: style,
          className: clsx('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today')
        }, drilldownView ? /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "rbc-button-link",
          onClick: function onClick(e) {
            return _this2.handleHeaderClick(date, drilldownView, e);
          }
        }, header) : /*#__PURE__*/React.createElement("span", null, header))), /*#__PURE__*/React.createElement("div", {
          className: "rbc-row"
        }, resources.map(function (_ref, idx) {
          var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            resource = _ref2[1];
          return /*#__PURE__*/React.createElement("div", {
            key: "resource_".concat(id, "_").concat(idx),
            className: clsx('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today')
          }, /*#__PURE__*/React.createElement(ResourceHeaderComponent, {
            index: idx,
            label: accessors.resourceTitle(resource),
            resource: resource
          }));
        })), /*#__PURE__*/React.createElement("div", {
          className: "rbc-row rbc-m-b-negative-3 rbc-h-full"
        }, resources.map(function (_ref3, idx) {
          var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            resource = _ref4[1];
          // Filter the grouped events by the current date.
          var filteredEvents = (groupedEvents.get(id) || []).filter(function (event) {
            return localizer.isSameDate(event.start, date) || localizer.isSameDate(event.end, date);
          });
          return /*#__PURE__*/React.createElement(DateContentRow, {
            key: "resource_".concat(id, "_").concat(idx),
            isAllDay: true,
            rtl: rtl,
            getNow: getNow,
            minRows: 2,
            maxRows: _this2.props.allDayMaxRows + 1,
            range: [date] // This ensures that only the single day is rendered
            ,
            events: filteredEvents // Only show filtered events for this day.
            ,
            resourceId: resource && id,
            className: "rbc-allday-cell",
            selectable: selectable,
            selected: _this2.props.selected,
            components: components,
            accessors: accessors,
            getters: getters,
            localizer: localizer,
            onSelect: _this2.props.onSelectEvent,
            onShowMore: _this2.props.onShowMore,
            onDoubleClick: _this2.props.onDoubleClickEvent,
            onKeyDown: _this2.props.onKeyPressEvent,
            onSelectSlot: _this2.props.onSelectSlot,
            longPressThreshold: _this2.props.longPressThreshold,
            resizable: resizable
          });
        })));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        width = _this$props2.width,
        rtl = _this$props2.rtl,
        range = _this$props2.range,
        scrollRef = _this$props2.scrollRef,
        isOverflowing = _this$props2.isOverflowing,
        TimeGutterHeader = _this$props2.components.timeGutterHeader;
      var style = {};
      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] = "".concat(scrollbarSize() - 1, "px");
      }
      return /*#__PURE__*/React.createElement("div", {
        style: style,
        ref: scrollRef,
        className: clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-label rbc-time-header-gutter",
        style: {
          width: width,
          minWidth: width,
          maxWidth: width
        }
      }, TimeGutterHeader && /*#__PURE__*/React.createElement(TimeGutterHeader, null)), this.renderHeaderCells(range));
    }
  }]);
}(React.Component);

/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST(_ref) {
  var min = _ref.min,
    max = _ref.max,
    localizer = _ref.localizer;
  if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
    return {
      start: localizer.add(min, -1, 'day'),
      end: localizer.add(max, -1, 'day')
    };
  }
  return {
    start: min,
    end: max
  };
}
var TimeGutter = function TimeGutter(_ref2) {
  var min = _ref2.min,
    max = _ref2.max,
    timeslots = _ref2.timeslots,
    step = _ref2.step,
    localizer = _ref2.localizer,
    getNow = _ref2.getNow,
    resource = _ref2.resource,
    components = _ref2.components,
    getters = _ref2.getters,
    gutterRef = _ref2.gutterRef;
  var TimeGutterWrapper = components.timeGutterWrapper;
  var _useMemo = useMemo(function () {
      return adjustForDST({
        min: min,
        max: max,
        localizer: localizer
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min === null || min === void 0 ? void 0 : min.toISOString(), max === null || max === void 0 ? void 0 : max.toISOString(), localizer]),
    start = _useMemo.start,
    end = _useMemo.end;
  var _useState = useState(getSlotMetrics({
      min: start,
      max: end,
      timeslots: timeslots,
      step: step,
      localizer: localizer
    })),
    _useState2 = _slicedToArray(_useState, 2),
    slotMetrics = _useState2[0],
    setSlotMetrics = _useState2[1];
  useEffect(function () {
    if (slotMetrics) {
      setSlotMetrics(slotMetrics.update({
        min: start,
        max: end,
        timeslots: timeslots,
        step: step,
        localizer: localizer
      }));
    }
    /**
     * We don't want this to fire when slotMetrics is updated as it would recursively bomb
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start === null || start === void 0 ? void 0 : start.toISOString(), end === null || end === void 0 ? void 0 : end.toISOString(), timeslots, step]);
  var renderSlot = useCallback(function (value, idx) {
    if (idx) return null; // don't return the first (0) idx

    var isNow = slotMetrics.dateIsInGroup(getNow(), idx);
    return /*#__PURE__*/React.createElement("span", {
      className: clsx('rbc-label', isNow && 'rbc-now')
    }, localizer.format(value, 'timeGutterFormat'));
  }, [slotMetrics, localizer, getNow]);
  return /*#__PURE__*/React.createElement(TimeGutterWrapper, {
    slotMetrics: slotMetrics
  }, /*#__PURE__*/React.createElement("div", {
    className: "rbc-time-gutter rbc-time-column",
    ref: gutterRef
  }, slotMetrics.groups.map(function (grp, idx) {
    return /*#__PURE__*/React.createElement(TimeSlotGroup, {
      key: idx,
      group: grp,
      resource: resource,
      components: components,
      renderSlot: renderSlot,
      getters: getters
    });
  })));
};
var TimeGutter$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(TimeGutter, Object.assign({
    gutterRef: ref
  }, props));
});

var NONE = {};
function Resources(resources, accessors) {
  return {
    map: function map(fn) {
      if (!resources) return [fn([NONE, null], 0)];
      return resources.map(function (resource, idx) {
        return fn([accessors.resourceId(resource), resource], idx);
      });
    },
    groupEvents: function groupEvents(events) {
      var eventsByResource = new Map();
      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events);
        return eventsByResource;
      }
      events.forEach(function (event) {
        var id = accessors.resource(event) || NONE;
        if (Array.isArray(id)) {
          id.forEach(function (item) {
            var resourceEvents = eventsByResource.get(item) || [];
            resourceEvents.push(event);
            eventsByResource.set(item, resourceEvents);
          });
        } else {
          var resourceEvents = eventsByResource.get(id) || [];
          resourceEvents.push(event);
          eventsByResource.set(id, resourceEvents);
        }
      });
      return eventsByResource;
    }
  };
}

var TimeGrid = /*#__PURE__*/function (_Component) {
  function TimeGrid(props) {
    var _this;
    _classCallCheck(this, TimeGrid);
    _this = _callSuper(this, TimeGrid, [props]);
    _this.handleScroll = function (e) {
      if (_this.scrollRef.current) {
        _this.scrollRef.current.scrollLeft = e.target.scrollLeft;
      }
    };
    _this.handleResize = function () {
      animationFrame.cancel(_this.rafHandle);
      _this.rafHandle = animationFrame.request(_this.checkOverflow);
    };
    _this.handleKeyPressEvent = function () {
      _this.clearSelection();
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleSelectEvent = function () {
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection();
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function () {
      _this.clearSelection();
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleShowMore = function (events, date, cell, slot, target) {
      var _this$props = _this.props,
        popup = _this$props.popup,
        onDrillDown = _this$props.onDrillDown,
        onShowMore = _this$props.onShowMore,
        getDrilldownView = _this$props.getDrilldownView,
        doShowMoreDrillDown = _this$props.doShowMoreDrillDown;
      _this.clearSelection();
      if (popup) {
        var position = getPosition$1(cell, _this.containerRef.current);
        _this.setState({
          overlay: {
            date: date,
            events: events,
            position: _objectSpread(_objectSpread({}, position), {}, {
              width: '200px'
            }),
            target: target
          }
        });
      } else if (doShowMoreDrillDown) {
        notify(onDrillDown, [date, getDrilldownView(date) || views.DAY]);
      }
      notify(onShowMore, [events, date, slot]);
    };
    _this.handleSelectAllDaySlot = function (slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot;
      var start = new Date(slots[0]);
      var end = new Date(slots[slots.length - 1]);
      end.setDate(slots[slots.length - 1].getDate() + 1);
      notify(onSelectSlot, {
        slots: slots,
        start: start,
        end: end,
        action: slotInfo.action,
        resourceId: slotInfo.resourceId
      });
    };
    _this.overlayDisplay = function () {
      _this.setState({
        overlay: null
      });
    };
    _this.checkOverflow = function () {
      if (_this._updatingOverflow) return;
      var content = _this.contentRef.current;
      if (!(content !== null && content !== void 0 && content.scrollHeight)) return;
      var isOverflowing = content.scrollHeight > content.clientHeight;
      if (_this.state.isOverflowing !== isOverflowing) {
        _this._updatingOverflow = true;
        _this.setState({
          isOverflowing: isOverflowing
        }, function () {
          _this._updatingOverflow = false;
        });
      }
    };
    _this.memoizedResources = memoize(function (resources, accessors) {
      return Resources(resources, accessors);
    });
    _this.state = {
      gutterWidth: undefined,
      isOverflowing: null
    };
    _this.scrollRef = /*#__PURE__*/React.createRef();
    _this.contentRef = /*#__PURE__*/React.createRef();
    _this.containerRef = /*#__PURE__*/React.createRef();
    _this._scrollRatio = null;
    _this.gutterRef = /*#__PURE__*/createRef();
    return _this;
  }
  _inherits(TimeGrid, _Component);
  return _createClass(TimeGrid, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate() {
      this.checkOverflow();
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.width == null) {
        this.measureGutter();
      }
      this.calculateScroll();
      this.applyScroll();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      animationFrame.cancel(this.rafHandle);
      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.applyScroll();
    }
  }, {
    key: "renderDayColumn",
    value: function renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now) {
      var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max;
      var daysEvents = (groupedEvents.get(id) || []).filter(function (event) {
        return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
      });
      var daysBackgroundEvents = (groupedBackgroundEvents.get(id) || []).filter(function (event) {
        return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
      });
      return /*#__PURE__*/React.createElement(DayColumn, Object.assign({}, this.props, {
        localizer: localizer,
        min: localizer.merge(date, min),
        max: localizer.merge(date, max),
        resource: resource && id,
        components: components,
        isNow: localizer.isSameDate(date, now),
        key: "".concat(id, "-").concat(date),
        date: date,
        events: daysEvents,
        backgroundEvents: daysBackgroundEvents,
        dayLayoutAlgorithm: dayLayoutAlgorithm
      }));
    }
  }, {
    key: "renderResourcesFirst",
    value: function renderResourcesFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm) {
      var _this2 = this;
      return resources.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          resource = _ref2[1];
        return range.map(function (date) {
          return _this2.renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now);
        });
      });
    }
  }, {
    key: "renderRangeFirst",
    value: function renderRangeFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm) {
      var _this3 = this;
      return range.map(function (date) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            minHeight: '100%',
            flex: 1
          },
          key: date
        }, resources.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            resource = _ref4[1];
          return /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            },
            key: accessors.resourceId(resource)
          }, _this3.renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now));
        }));
      });
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(range, events, backgroundEvents, now) {
      var _this$props3 = this.props,
        accessors = _this$props3.accessors,
        localizer = _this$props3.localizer,
        resourceGroupingLayout = _this$props3.resourceGroupingLayout,
        components = _this$props3.components,
        dayLayoutAlgorithm = _this$props3.dayLayoutAlgorithm;
      var resources = this.memoizedResources(this.props.resources, accessors);
      var groupedEvents = resources.groupEvents(events);
      var groupedBackgroundEvents = resources.groupEvents(backgroundEvents);
      if (!resourceGroupingLayout) {
        return this.renderResourcesFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm);
      } else {
        return this.renderRangeFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$allDayMax;
      var _this$props4 = this.props,
        events = _this$props4.events,
        backgroundEvents = _this$props4.backgroundEvents,
        range = _this$props4.range,
        width = _this$props4.width,
        rtl = _this$props4.rtl,
        selected = _this$props4.selected,
        getNow = _this$props4.getNow,
        resources = _this$props4.resources,
        components = _this$props4.components,
        accessors = _this$props4.accessors,
        getters = _this$props4.getters,
        localizer = _this$props4.localizer,
        min = _this$props4.min,
        max = _this$props4.max,
        showMultiDayTimes = _this$props4.showMultiDayTimes,
        longPressThreshold = _this$props4.longPressThreshold,
        resizable = _this$props4.resizable,
        resourceGroupingLayout = _this$props4.resourceGroupingLayout;
      width = width || this.state.gutterWidth;
      var start = range[0],
        end = range[range.length - 1];
      this.slots = range.length;
      var allDayEvents = [],
        rangeEvents = [],
        rangeBackgroundEvents = [];
      events.forEach(function (event) {
        if (inRange(event, start, end, accessors, localizer)) {
          var eStart = accessors.start(event),
            eEnd = accessors.end(event);
          if (accessors.allDay(event) || localizer.startAndEndAreDateOnly(eStart, eEnd) || !showMultiDayTimes && !localizer.isSameDate(eStart, eEnd)) {
            allDayEvents.push(event);
          } else {
            rangeEvents.push(event);
          }
        }
      });
      backgroundEvents.forEach(function (event) {
        if (inRange(event, start, end, accessors, localizer)) {
          rangeBackgroundEvents.push(event);
        }
      });
      allDayEvents.sort(function (a, b) {
        return sortEvents(a, b, accessors, localizer);
      });
      var headerProps = {
        range: range,
        events: allDayEvents,
        width: width,
        rtl: rtl,
        getNow: getNow,
        localizer: localizer,
        selected: selected,
        allDayMaxRows: this.props.showAllEvents ? Infinity : (_this$props$allDayMax = this.props.allDayMaxRows) !== null && _this$props$allDayMax !== void 0 ? _this$props$allDayMax : Infinity,
        resources: this.memoizedResources(resources, accessors),
        selectable: this.props.selectable,
        accessors: accessors,
        getters: getters,
        components: components,
        scrollRef: this.scrollRef,
        isOverflowing: this.state.isOverflowing,
        longPressThreshold: longPressThreshold,
        onSelectSlot: this.handleSelectAllDaySlot,
        onSelectEvent: this.handleSelectEvent,
        onShowMore: this.handleShowMore,
        onDoubleClickEvent: this.props.onDoubleClickEvent,
        onKeyPressEvent: this.props.onKeyPressEvent,
        onDrillDown: this.props.onDrillDown,
        getDrilldownView: this.props.getDrilldownView,
        resizable: resizable
      };
      return /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-time-view', resources && 'rbc-time-view-resources'),
        ref: this.containerRef
      }, resources && resources.length > 1 && resourceGroupingLayout ? /*#__PURE__*/React.createElement(TimeGridHeaderResources, headerProps) : /*#__PURE__*/React.createElement(TimeGridHeader, headerProps), this.props.popup && this.renderOverlay(), /*#__PURE__*/React.createElement("div", {
        ref: this.contentRef,
        className: "rbc-time-content",
        onScroll: this.handleScroll
      }, /*#__PURE__*/React.createElement(TimeGutter$1, {
        date: start,
        ref: this.gutterRef,
        localizer: localizer,
        min: localizer.merge(start, min),
        max: localizer.merge(start, max),
        step: this.props.step,
        getNow: this.props.getNow,
        timeslots: this.props.timeslots,
        components: components,
        className: "rbc-time-gutter",
        getters: getters
      }), this.renderEvents(range, rangeEvents, rangeBackgroundEvents, getNow())));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var _this$state$overlay,
        _this$state,
        _this4 = this;
      var overlay = (_this$state$overlay = (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
      var _this$props5 = this.props,
        accessors = _this$props5.accessors,
        localizer = _this$props5.localizer,
        components = _this$props5.components,
        getters = _this$props5.getters,
        selected = _this$props5.selected,
        popupOffset = _this$props5.popupOffset,
        handleDragStart = _this$props5.handleDragStart;
      var onHide = function onHide() {
        return _this4.setState({
          overlay: null
        });
      };
      return /*#__PURE__*/React.createElement(PopOverlay, {
        overlay: overlay,
        accessors: accessors,
        localizer: localizer,
        components: components,
        getters: getters,
        selected: selected,
        popupOffset: popupOffset,
        ref: this.containerRef,
        handleKeyPressEvent: this.handleKeyPressEvent,
        handleSelectEvent: this.handleSelectEvent,
        handleDoubleClickEvent: this.handleDoubleClickEvent,
        handleDragStart: handleDragStart,
        show: !!overlay.position,
        overlayDisplay: this.overlayDisplay,
        onHide: onHide
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      clearTimeout(this._selectTimer);
      this._pendingSelection = [];
    }
  }, {
    key: "measureGutter",
    value: function measureGutter() {
      var _this5 = this;
      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }
      this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function () {
        var _this5$gutterRef;
        var width = (_this5$gutterRef = _this5.gutterRef) !== null && _this5$gutterRef !== void 0 && _this5$gutterRef.current ? getWidth(_this5.gutterRef.current) : undefined;
        if (width && _this5.state.gutterWidth !== width) {
          _this5.setState({
            gutterWidth: width
          });
        }
      });
    }
  }, {
    key: "applyScroll",
    value: function applyScroll() {
      // If auto-scroll is disabled, we don't actually apply the scroll
      if (this._scrollRatio != null && this.props.enableAutoScroll === true) {
        var content = this.contentRef.current;
        content.scrollTop = content.scrollHeight * this._scrollRatio;
        // Only do this once
        this._scrollRatio = null;
      }
    }
  }, {
    key: "calculateScroll",
    value: function calculateScroll() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var min = props.min,
        max = props.max,
        scrollToTime = props.scrollToTime,
        localizer = props.localizer;
      var diffMillis = localizer.diff(localizer.merge(scrollToTime, min), scrollToTime, 'milliseconds');
      var totalMillis = localizer.diff(min, max, 'milliseconds');
      this._scrollRatio = diffMillis / totalMillis;
    }
  }]);
}(Component);
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2,
  // To be compatible with old versions, default as `false`.
  resourceGroupingLayout: false
};

var _excluded$4 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
var Day = /*#__PURE__*/function (_React$Component) {
  function Day() {
    _classCallCheck(this, Day);
    return _callSuper(this, Day, arguments);
  }
  _inherits(Day, _React$Component);
  return _createClass(Day, [{
    key: "render",
    value: function render() {
      /**
       * This allows us to default min, max, and scrollToTime
       * using our localizer. This is necessary until such time
       * as TODO: TimeGrid is converted to a functional component.
       */
      var _this$props = this.props,
        date = _this$props.date,
        localizer = _this$props.localizer,
        _this$props$min = _this$props.min,
        min = _this$props$min === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$min,
        _this$props$max = _this$props.max,
        max = _this$props$max === void 0 ? localizer.endOf(new Date(), 'day') : _this$props$max,
        _this$props$scrollToT = _this$props.scrollToTime,
        scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$scrollToT,
        _this$props$enableAut = _this$props.enableAutoScroll,
        enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut,
        props = _objectWithoutProperties(_this$props, _excluded$4);
      var range = Day.range(date, {
        localizer: localizer
      });
      return /*#__PURE__*/React.createElement(TimeGrid, Object.assign({}, props, {
        range: range,
        eventOffset: 10,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
        enableAutoScroll: enableAutoScroll
      }));
    }
  }]);
}(React.Component);
Day.range = function (date, _ref) {
  var localizer = _ref.localizer;
  return [localizer.startOf(date, 'day')];
};
Day.navigate = function (date, action, _ref2) {
  var localizer = _ref2.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'day');
    case navigate.NEXT:
      return localizer.add(date, 1, 'day');
    default:
      return date;
  }
};
Day.title = function (date, _ref3) {
  var localizer = _ref3.localizer;
  return localizer.format(date, 'dayHeaderFormat');
};

var _excluded$3 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
var Week = /*#__PURE__*/function (_React$Component) {
  function Week() {
    _classCallCheck(this, Week);
    return _callSuper(this, Week, arguments);
  }
  _inherits(Week, _React$Component);
  return _createClass(Week, [{
    key: "render",
    value: function render() {
      /**
       * This allows us to default min, max, and scrollToTime
       * using our localizer. This is necessary until such time
       * as TimeGrid is converted to a functional component.
       */
      var _this$props = this.props,
        date = _this$props.date,
        localizer = _this$props.localizer,
        _this$props$min = _this$props.min,
        min = _this$props$min === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$min,
        _this$props$max = _this$props.max,
        max = _this$props$max === void 0 ? localizer.endOf(new Date(), 'day') : _this$props$max,
        _this$props$scrollToT = _this$props.scrollToTime,
        scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$scrollToT,
        _this$props$enableAut = _this$props.enableAutoScroll,
        enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut,
        props = _objectWithoutProperties(_this$props, _excluded$3);
      var range = Week.range(date, this.props);
      return /*#__PURE__*/React.createElement(TimeGrid, Object.assign({}, props, {
        range: range,
        eventOffset: 15,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
        enableAutoScroll: enableAutoScroll
      }));
    }
  }]);
}(React.Component);
Week.defaultProps = TimeGrid.defaultProps;
Week.navigate = function (date, action, _ref) {
  var localizer = _ref.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');
    case navigate.NEXT:
      return localizer.add(date, 1, 'week');
    default:
      return date;
  }
};
Week.range = function (date, _ref2) {
  var localizer = _ref2.localizer;
  var firstOfWeek = localizer.startOfWeek();
  var start = localizer.startOf(date, 'week', firstOfWeek);
  var end = localizer.endOf(date, 'week', firstOfWeek);
  return localizer.range(start, end);
};
Week.title = function (date, _ref3) {
  var localizer = _ref3.localizer;
  var _Week$range = Week.range(date, {
      localizer: localizer
    }),
    _Week$range2 = _toArray(_Week$range),
    start = _Week$range2[0],
    rest = _Week$range2.slice(1);
  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};

var _excluded$2 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
function workWeekRange(date, options) {
  return Week.range(date, options).filter(function (d) {
    return [6, 0].indexOf(d.getDay()) === -1;
  });
}
var WorkWeek = /*#__PURE__*/function (_React$Component) {
  function WorkWeek() {
    _classCallCheck(this, WorkWeek);
    return _callSuper(this, WorkWeek, arguments);
  }
  _inherits(WorkWeek, _React$Component);
  return _createClass(WorkWeek, [{
    key: "render",
    value: function render() {
      /**
       * This allows us to default min, max, and scrollToTime
       * using our localizer. This is necessary until such time
       * as TimeGrid is converted to a functional component.
       */
      var _this$props = this.props,
        date = _this$props.date,
        localizer = _this$props.localizer,
        _this$props$min = _this$props.min,
        min = _this$props$min === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$min,
        _this$props$max = _this$props.max,
        max = _this$props$max === void 0 ? localizer.endOf(new Date(), 'day') : _this$props$max,
        _this$props$scrollToT = _this$props.scrollToTime,
        scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$scrollToT,
        _this$props$enableAut = _this$props.enableAutoScroll,
        enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut,
        props = _objectWithoutProperties(_this$props, _excluded$2);
      var range = workWeekRange(date, this.props);
      return /*#__PURE__*/React.createElement(TimeGrid, Object.assign({}, props, {
        range: range,
        eventOffset: 15,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
        enableAutoScroll: enableAutoScroll
      }));
    }
  }]);
}(React.Component);
WorkWeek.defaultProps = TimeGrid.defaultProps;
WorkWeek.range = workWeekRange;
WorkWeek.navigate = Week.navigate;
WorkWeek.title = function (date, _ref) {
  var localizer = _ref.localizer;
  var _workWeekRange = workWeekRange(date, {
      localizer: localizer
    }),
    _workWeekRange2 = _toArray(_workWeekRange),
    start = _workWeekRange2[0],
    rest = _workWeekRange2.slice(1);
  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};

var DEFAULT_LENGTH = 30;
function Agenda(_ref) {
  var accessors = _ref.accessors,
    components = _ref.components,
    date = _ref.date,
    events = _ref.events,
    getters = _ref.getters,
    _ref$length = _ref.length,
    length = _ref$length === void 0 ? DEFAULT_LENGTH : _ref$length,
    localizer = _ref.localizer,
    onDoubleClickEvent = _ref.onDoubleClickEvent,
    onSelectEvent = _ref.onSelectEvent,
    selected = _ref.selected;
  var headerRef = useRef(null);
  var dateColRef = useRef(null);
  var timeColRef = useRef(null);
  var contentRef = useRef(null);
  var tbodyRef = useRef(null);
  useEffect(function () {
    _adjustHeader();
  });
  var renderDay = function renderDay(day, events, dayKey) {
    var Event = components.event,
      AgendaDate = components.date;
    events = events.filter(function (e) {
      return inRange(e, localizer.startOf(day, 'day'), localizer.endOf(day, 'day'), accessors, localizer);
    });
    return events.map(function (event, idx) {
      var title = accessors.title(event);
      var end = accessors.end(event);
      var start = accessors.start(event);
      var userProps = getters.eventProp(event, start, end, isSelected(event, selected));
      var dateLabel = idx === 0 && localizer.format(day, 'agendaDateFormat');
      var first = idx === 0 ? /*#__PURE__*/React.createElement("td", {
        rowSpan: events.length,
        className: "rbc-agenda-date-cell"
      }, AgendaDate ? /*#__PURE__*/React.createElement(AgendaDate, {
        day: day,
        label: dateLabel
      }) : dateLabel) : false;
      return /*#__PURE__*/React.createElement("tr", {
        key: dayKey + '_' + idx,
        className: userProps.className,
        style: userProps.style
      }, first, /*#__PURE__*/React.createElement("td", {
        className: "rbc-agenda-time-cell"
      }, timeRangeLabel(day, event)), /*#__PURE__*/React.createElement("td", {
        className: "rbc-agenda-event-cell",
        onClick: function onClick(e) {
          return onSelectEvent && onSelectEvent(event, e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return onDoubleClickEvent && onDoubleClickEvent(event, e);
        }
      }, Event ? /*#__PURE__*/React.createElement(Event, {
        event: event,
        title: title
      }) : title));
    }, []);
  };
  var timeRangeLabel = function timeRangeLabel(day, event) {
    var labelClass = '',
      TimeComponent = components.time,
      label = localizer.messages.allDay;
    var end = accessors.end(event);
    var start = accessors.start(event);
    if (!accessors.allDay(event)) {
      if (localizer.eq(start, end)) {
        label = localizer.format(start, 'agendaTimeFormat');
      } else if (localizer.isSameDate(start, end)) {
        label = localizer.format({
          start: start,
          end: end
        }, 'agendaTimeRangeFormat');
      } else if (localizer.isSameDate(day, start)) {
        label = localizer.format(start, 'agendaTimeFormat');
      } else if (localizer.isSameDate(day, end)) {
        label = localizer.format(end, 'agendaTimeFormat');
      }
    }
    if (localizer.gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
    if (localizer.lt(day, end, 'day')) labelClass += ' rbc-continues-after';
    return /*#__PURE__*/React.createElement("span", {
      className: labelClass.trim()
    }, TimeComponent ? /*#__PURE__*/React.createElement(TimeComponent, {
      event: event,
      day: day,
      label: label
    }) : label);
  };
  var _adjustHeader = function _adjustHeader() {
    if (!tbodyRef.current) return;
    var header = headerRef.current;
    var firstRow = tbodyRef.current.firstChild;
    if (!firstRow) return;
    var isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
    var _widths = [];
    var widths = _widths;
    _widths = [getWidth(firstRow.children[0]), getWidth(firstRow.children[1])];
    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = _widths[0] + 'px';
      timeColRef.current.style.width = _widths[1] + 'px';
    }
    if (isOverflowing) {
      addClass(header, 'rbc-header-overflowing');
      header.style.marginRight = scrollbarSize() + 'px';
    } else {
      removeClass(header, 'rbc-header-overflowing');
    }
  };
  var messages = localizer.messages;
  var end = localizer.add(date, length, 'day');
  var range = localizer.range(date, end, 'day');
  events = events.filter(function (event) {
    return inRange(event, localizer.startOf(date, 'day'), localizer.endOf(end, 'day'), accessors, localizer);
  });
  events.sort(function (a, b) {
    return +accessors.start(a) - +accessors.start(b);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "rbc-agenda-view"
  }, events.length !== 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    ref: headerRef,
    className: "rbc-agenda-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "rbc-header",
    ref: dateColRef
  }, messages.date), /*#__PURE__*/React.createElement("th", {
    className: "rbc-header",
    ref: timeColRef
  }, messages.time), /*#__PURE__*/React.createElement("th", {
    className: "rbc-header"
  }, messages.event)))), /*#__PURE__*/React.createElement("div", {
    className: "rbc-agenda-content",
    ref: contentRef
  }, /*#__PURE__*/React.createElement("table", {
    className: "rbc-agenda-table"
  }, /*#__PURE__*/React.createElement("tbody", {
    ref: tbodyRef
  }, range.map(function (day, idx) {
    return renderDay(day, events, idx);
  }))))) : /*#__PURE__*/React.createElement("span", {
    className: "rbc-agenda-empty"
  }, messages.noEventsInRange));
}
Agenda.range = function (start, _ref2) {
  var _ref2$length = _ref2.length,
    length = _ref2$length === void 0 ? DEFAULT_LENGTH : _ref2$length,
    localizer = _ref2.localizer;
  var end = localizer.add(start, length, 'day');
  return {
    start: start,
    end: end
  };
};
Agenda.navigate = function (date, action, _ref3) {
  var _ref3$length = _ref3.length,
    length = _ref3$length === void 0 ? DEFAULT_LENGTH : _ref3$length,
    localizer = _ref3.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -length, 'day');
    case navigate.NEXT:
      return localizer.add(date, length, 'day');
    default:
      return date;
  }
};
Agenda.title = function (start, _ref4) {
  var _ref4$length = _ref4.length,
    length = _ref4$length === void 0 ? DEFAULT_LENGTH : _ref4$length,
    localizer = _ref4.localizer;
  var end = localizer.add(start, length, 'day');
  return localizer.format({
    start: start,
    end: end
  }, 'agendaHeaderFormat');
};

var VIEWS = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, views.MONTH, MonthView), views.WEEK, Week), views.WORK_WEEK, WorkWeek), views.DAY, Day), views.AGENDA, Agenda);

var _excluded$1 = ["action", "date", "today"];
function moveDate(View, _ref) {
  var action = _ref.action,
    date = _ref.date,
    today = _ref.today,
    props = _objectWithoutProperties(_ref, _excluded$1);
  View = typeof View === 'string' ? VIEWS[View] : View;
  switch (action) {
    case navigate.TODAY:
      date = today || new Date();
      break;
    case navigate.DATE:
      break;
    default:
      invariant(View && typeof View.navigate === 'function', 'Calendar View components must implement a static `.navigate(date, action)` method.s');
      date = View.navigate(date, action, props);
  }
  return date;
}

/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
function accessor(data, field) {
  var value = null;
  if (typeof field === 'function') value = field(data);else if (typeof field === 'string' && _typeof(data) === 'object' && data != null && field in data) value = data[field];
  return value;
}
var wrapAccessor = function wrapAccessor(acc) {
  return function (data) {
    return accessor(data, acc);
  };
};

var _excluded = ["view", "date", "getNow", "onNavigate"],
  _excluded2 = ["view", "toolbar", "events", "backgroundEvents", "resourceGroupingLayout", "style", "className", "elementProps", "date", "getNow", "length", "showMultiDayTimes", "onShowMore", "doShowMoreDrillDown", "components", "formats", "messages", "culture"];
function viewNames(_views) {
  if (Array.isArray(_views)) {
    return _views;
  }
  var views = [];
  for (var _i = 0, _Object$entries = Object.entries(_views); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (value) {
      views.push(key);
    }
  }
  return views;
}
function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}
var Calendar = /*#__PURE__*/function (_React$Component) {
  function Calendar() {
    var _this;
    _classCallCheck(this, Calendar);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Calendar, [].concat(_args));
    _this.getViews = function () {
      var views = _this.props.views;
      if (Array.isArray(views)) {
        return transform(views, function (obj, name) {
          return obj[name] = VIEWS[name];
        }, {});
      }
      if (_typeof(views) === 'object') {
        return mapValues(views, function (value, key) {
          if (value === true) {
            return VIEWS[key];
          }
          return value;
        });
      }
      return VIEWS;
    };
    _this.getView = function () {
      var views = _this.getViews();
      return views[_this.props.view];
    };
    _this.getDrilldownView = function (date) {
      var _this$props = _this.props,
        view = _this$props.view,
        drilldownView = _this$props.drilldownView,
        getDrilldownView = _this$props.getDrilldownView;
      if (!getDrilldownView) return drilldownView;
      return getDrilldownView(date, view, Object.keys(_this.getViews()));
    };
    /**
     *
     * @param date
     * @param viewComponent
     * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
     * parameter. It appears when range change on view changing. It could be handy
     * when you need to have both: range and view type at once, i.e. for manage rbc
     * state via url
     */
    _this.handleRangeChange = function (date, viewComponent, view) {
      var _this$props2 = _this.props,
        onRangeChange = _this$props2.onRangeChange,
        localizer = _this$props2.localizer;
      if (onRangeChange) {
        if (viewComponent.range) {
          onRangeChange(viewComponent.range(date, {
            localizer: localizer
          }), view);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.error('onRangeChange prop not supported for this view');
          }
        }
      }
    };
    _this.handleNavigate = function (action, newDate) {
      var _this$props3 = _this.props,
        view = _this$props3.view,
        date = _this$props3.date,
        getNow = _this$props3.getNow,
        onNavigate = _this$props3.onNavigate,
        props = _objectWithoutProperties(_this$props3, _excluded);
      var ViewComponent = _this.getView();
      var today = getNow();
      date = moveDate(ViewComponent, _objectSpread(_objectSpread({}, props), {}, {
        action: action,
        date: newDate || date || today,
        today: today
      }));
      onNavigate(date, view, action);
      _this.handleRangeChange(date, ViewComponent);
    };
    _this.handleViewChange = function (view) {
      if (view !== _this.props.view && isValidView(view, _this.props)) {
        _this.props.onView(view);
      }
      var views = _this.getViews();
      _this.handleRangeChange(_this.props.date || _this.props.getNow(), views[view], view);
    };
    _this.handleSelectEvent = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleKeyPressEvent = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleSelectSlot = function (slotInfo) {
      notify(_this.props.onSelectSlot, slotInfo);
    };
    _this.handleDrillDown = function (date, view) {
      var onDrillDown = _this.props.onDrillDown;
      if (onDrillDown) {
        onDrillDown(date, view, _this.drilldownView);
        return;
      }
      if (view) _this.handleViewChange(view);
      _this.handleNavigate(navigate.DATE, date);
    };
    _this.state = {
      context: Calendar.getContext(_this.props)
    };
    return _this;
  }
  _inherits(Calendar, _React$Component);
  return _createClass(Calendar, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        view = _this$props4.view,
        toolbar = _this$props4.toolbar,
        events = _this$props4.events,
        backgroundEvents = _this$props4.backgroundEvents,
        resourceGroupingLayout = _this$props4.resourceGroupingLayout,
        style = _this$props4.style,
        className = _this$props4.className,
        elementProps = _this$props4.elementProps,
        current = _this$props4.date,
        getNow = _this$props4.getNow,
        length = _this$props4.length,
        showMultiDayTimes = _this$props4.showMultiDayTimes,
        onShowMore = _this$props4.onShowMore,
        doShowMoreDrillDown = _this$props4.doShowMoreDrillDown;
        _this$props4.components;
        _this$props4.formats;
        _this$props4.messages;
        _this$props4.culture;
        var props = _objectWithoutProperties(_this$props4, _excluded2);
      current = current || getNow();
      var View = this.getView();
      var _this$state$context = this.state.context,
        accessors = _this$state$context.accessors,
        components = _this$state$context.components,
        getters = _this$state$context.getters,
        localizer = _this$state$context.localizer,
        viewNames = _this$state$context.viewNames;
      var CalToolbar = components.toolbar || Toolbar;
      var label = View.title(current, {
        localizer: localizer,
        length: length
      });
      return /*#__PURE__*/React.createElement("div", Object.assign({}, elementProps, {
        className: clsx(className, 'rbc-calendar', props.rtl && 'rbc-rtl'),
        style: style
      }), toolbar && /*#__PURE__*/React.createElement(CalToolbar, {
        date: current,
        view: view,
        views: viewNames,
        label: label,
        onView: this.handleViewChange,
        onNavigate: this.handleNavigate,
        localizer: localizer
      }), /*#__PURE__*/React.createElement(View, Object.assign({}, props, {
        events: events,
        backgroundEvents: backgroundEvents,
        date: current,
        getNow: getNow,
        length: length,
        localizer: localizer,
        getters: getters,
        components: components,
        accessors: accessors,
        showMultiDayTimes: showMultiDayTimes,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onDoubleClickEvent: this.handleDoubleClickEvent,
        onKeyPressEvent: this.handleKeyPressEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore: onShowMore,
        doShowMoreDrillDown: doShowMoreDrillDown,
        resourceGroupingLayout: resourceGroupingLayout
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        context: Calendar.getContext(nextProps)
      };
    }
  }, {
    key: "getContext",
    value: function getContext(_ref2) {
      var startAccessor = _ref2.startAccessor,
        endAccessor = _ref2.endAccessor,
        allDayAccessor = _ref2.allDayAccessor,
        tooltipAccessor = _ref2.tooltipAccessor,
        titleAccessor = _ref2.titleAccessor,
        resourceAccessor = _ref2.resourceAccessor,
        resourceIdAccessor = _ref2.resourceIdAccessor,
        resourceTitleAccessor = _ref2.resourceTitleAccessor,
        eventIdAccessor = _ref2.eventIdAccessor,
        eventPropGetter = _ref2.eventPropGetter,
        backgroundEventPropGetter = _ref2.backgroundEventPropGetter,
        slotPropGetter = _ref2.slotPropGetter,
        slotGroupPropGetter = _ref2.slotGroupPropGetter,
        dayPropGetter = _ref2.dayPropGetter,
        view = _ref2.view,
        views = _ref2.views,
        localizer = _ref2.localizer,
        culture = _ref2.culture,
        _ref2$messages = _ref2.messages,
        messages$1 = _ref2$messages === void 0 ? {} : _ref2$messages,
        _ref2$components = _ref2.components,
        components = _ref2$components === void 0 ? {} : _ref2$components,
        _ref2$formats = _ref2.formats,
        formats = _ref2$formats === void 0 ? {} : _ref2$formats;
      var names = viewNames(views);
      var msgs = messages(messages$1);
      return {
        viewNames: names,
        localizer: mergeWithDefaults(localizer, culture, formats, msgs),
        getters: {
          eventProp: function eventProp() {
            return eventPropGetter && eventPropGetter.apply(void 0, arguments) || {};
          },
          backgroundEventProp: function backgroundEventProp() {
            return backgroundEventPropGetter && backgroundEventPropGetter.apply(void 0, arguments) || {};
          },
          slotProp: function slotProp() {
            return slotPropGetter && slotPropGetter.apply(void 0, arguments) || {};
          },
          slotGroupProp: function slotGroupProp() {
            return slotGroupPropGetter && slotGroupPropGetter.apply(void 0, arguments) || {};
          },
          dayProp: function dayProp() {
            return dayPropGetter && dayPropGetter.apply(void 0, arguments) || {};
          }
        },
        components: defaults(components[view] || {}, omit(components, names), {
          eventWrapper: NoopWrapper,
          backgroundEventWrapper: NoopWrapper,
          eventContainerWrapper: NoopWrapper,
          dateCellWrapper: NoopWrapper,
          weekWrapper: NoopWrapper,
          timeSlotWrapper: NoopWrapper,
          timeGutterWrapper: NoopWrapper,
          timeIndicatorWrapper: NoopWrapper
        }),
        accessors: {
          start: wrapAccessor(startAccessor),
          end: wrapAccessor(endAccessor),
          allDay: wrapAccessor(allDayAccessor),
          tooltip: wrapAccessor(tooltipAccessor),
          title: wrapAccessor(titleAccessor),
          resource: wrapAccessor(resourceAccessor),
          resourceId: wrapAccessor(resourceIdAccessor),
          resourceTitle: wrapAccessor(resourceTitleAccessor),
          eventId: wrapAccessor(eventIdAccessor)
        }
      };
    }
  }]);
}(React.Component);
Calendar.defaultProps = {
  events: [],
  backgroundEvents: [],
  elementProps: {},
  popup: false,
  toolbar: true,
  view: views.MONTH,
  views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
  step: 30,
  length: 30,
  allDayMaxRows: Infinity,
  doShowMoreDrillDown: true,
  drilldownView: views.DAY,
  titleAccessor: 'title',
  tooltipAccessor: 'title',
  allDayAccessor: 'allDay',
  startAccessor: 'start',
  endAccessor: 'end',
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'title',
  eventIdAccessor: 'id',
  longPressThreshold: 250,
  getNow: function getNow() {
    return new Date();
  },
  dayLayoutAlgorithm: 'overlap'
};
var Calendar$1 = uncontrollable(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});

var weekRangeFormat$5 = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, 'MMMM DD', culture) + ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture);
};
var dateRangeFormat$5 = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture);
};
var timeRangeFormat$5 = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end;
  return local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture);
};
var timeRangeStartFormat$5 = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 'LT', culture) + ' – ';
};
var timeRangeEndFormat$5 = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 'LT', culture);
};
var formats$5 = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat$5,
  eventTimeRangeFormat: timeRangeFormat$5,
  eventTimeRangeStartFormat: timeRangeStartFormat$5,
  eventTimeRangeEndFormat: timeRangeEndFormat$5,
  timeGutterFormat: 'LT',
  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat$5,
  agendaHeaderFormat: dateRangeFormat$5,
  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat$5
};
function fixUnit$2(unit) {
  var datePart = unit ? unit.toLowerCase() : unit;
  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }
  return datePart;
}
function moment (moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m;
  };
  function getTimezoneOffset(date) {
    // ensures this gets cast to timezone
    return moment(date).toDate().getTimezoneOffset();
  }
  function getDstOffset(start, end) {
    var _st$_z$name, _st$_z;
    // convert to moment, in case
    // Calculate the offset in the timezone of the Events (local)
    // not in the timezone of the calendar (moment.tz)
    var st = moment(start).local();
    var ed = moment(end).local();
    // if not using moment timezone
    if (!moment.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset();
    }
    /**
     * If using moment-timezone, and a timezone has been applied, then
     * use this to get the proper timezone offset, otherwise default
     * the timezone to the browser local
     */
    var tzName = (_st$_z$name = st === null || st === void 0 ? void 0 : (_st$_z = st._z) === null || _st$_z === void 0 ? void 0 : _st$_z.name) !== null && _st$_z$name !== void 0 ? _st$_z$name : moment.tz.guess();
    var startOffset = moment.tz.zone(tzName).utcOffset(+st);
    var endOffset = moment.tz.zone(tzName).utcOffset(+ed);
    return startOffset - endOffset;
  }
  function getDayStartDstOffset(start) {
    var dayStart = moment(start).startOf('day');
    return getDstOffset(dayStart, start);
  }

  /*** BEGIN localized date arithmetic methods with moment ***/
  function defineComparators(a, b, unit) {
    var datePart = fixUnit$2(unit);
    var dtA = datePart ? moment(a).startOf(datePart) : moment(a);
    var dtB = datePart ? moment(b).startOf(datePart) : moment(b);
    return [dtA, dtB, datePart];
  }
  function startOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit$2(unit);
    if (datePart) {
      return moment(date).startOf(datePart).toDate();
    }
    return moment(date).toDate();
  }
  function endOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit$2(unit);
    if (datePart) {
      return moment(date).endOf(datePart).toDate();
    }
    return moment(date).toDate();
  }

  // moment comparison operations *always* convert both sides to moment objects
  // prior to running the comparisons
  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
      _defineComparators2 = _slicedToArray(_defineComparators, 3),
      dtA = _defineComparators2[0],
      dtB = _defineComparators2[1],
      datePart = _defineComparators2[2];
    return dtA.isSame(dtB, datePart);
  }
  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }
  function gt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
      _defineComparators4 = _slicedToArray(_defineComparators3, 3),
      dtA = _defineComparators4[0],
      dtB = _defineComparators4[1],
      datePart = _defineComparators4[2];
    return dtA.isAfter(dtB, datePart);
  }
  function lt(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
      _defineComparators6 = _slicedToArray(_defineComparators5, 3),
      dtA = _defineComparators6[0],
      dtB = _defineComparators6[1],
      datePart = _defineComparators6[2];
    return dtA.isBefore(dtB, datePart);
  }
  function gte(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit),
      _defineComparators8 = _slicedToArray(_defineComparators7, 3),
      dtA = _defineComparators8[0],
      dtB = _defineComparators8[1],
      datePart = _defineComparators8[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function lte(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit),
      _defineComparators10 = _slicedToArray(_defineComparators9, 3),
      dtA = _defineComparators10[0],
      dtB = _defineComparators10[1],
      datePart = _defineComparators10[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function inRange(day, min, max) {
    var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day';
    var datePart = fixUnit$2(unit);
    var mDay = moment(day);
    var mMin = moment(min);
    var mMax = moment(max);
    return mDay.isBetween(mMin, mMax, datePart, '[]');
  }
  function min(dateA, dateB) {
    var dtA = moment(dateA);
    var dtB = moment(dateB);
    var minDt = moment.min(dtA, dtB);
    return minDt.toDate();
  }
  function max(dateA, dateB) {
    var dtA = moment(dateA);
    var dtB = moment(dateB);
    var maxDt = moment.max(dtA, dtB);
    return maxDt.toDate();
  }
  function merge(date, time) {
    if (!date && !time) return null;
    var tm = moment(time).format('HH:mm:ss');
    var dt = moment(date).startOf('day').format('MM/DD/YYYY');
    // We do it this way to avoid issues when timezone switching
    return moment("".concat(dt, " ").concat(tm), 'MM/DD/YYYY HH:mm:ss').toDate();
  }
  function add(date, adder, unit) {
    var datePart = fixUnit$2(unit);
    return moment(date).add(adder, datePart).toDate();
  }
  function range(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit$2(unit);
    // because the add method will put these in tz, we have to start that way
    var current = moment(start).toDate();
    var days = [];
    while (lte(current, end)) {
      days.push(current);
      current = add(current, 1, datePart);
    }
    return days;
  }
  function ceil(date, unit) {
    var datePart = fixUnit$2(unit);
    var floor = startOf(date, datePart);
    return eq(floor, date) ? floor : add(floor, 1, datePart);
  }
  function diff(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit$2(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    var dtA = moment(a);
    var dtB = moment(b);
    return dtB.diff(dtA, datePart);
  }
  function minutes(date) {
    var dt = moment(date);
    return dt.minutes();
  }
  function firstOfWeek(culture) {
    var data = culture ? moment.localeData(culture) : moment.localeData();
    return data ? data.firstDayOfWeek() : 0;
  }
  function firstVisibleDay(date) {
    return moment(date).startOf('month').startOf('week').toDate();
  }
  function lastVisibleDay(date) {
    return moment(date).endOf('month').endOf('week').toDate();
  }
  function visibleDays(date) {
    var current = firstVisibleDay(date);
    var last = lastVisibleDay(date);
    var days = [];
    while (lte(current, last)) {
      days.push(current);
      current = add(current, 1, 'd');
    }
    return days;
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return moment(dt).startOf('day').minute(minutesFromMidnight + offset).toDate();
  }

  // moment will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }
  function getMinutesFromMidnight(start) {
    var dayStart = moment(start).startOf('day');
    var day = moment(start);
    return day.diff(dayStart, 'minutes') + getDayStartDstOffset(start);
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    var mStart = moment(start);
    var mFirst = moment(first);
    return mStart.isBefore(mFirst, 'day');
  }
  function continuesAfter(start, end, last) {
    var mEnd = moment(end);
    var mLast = moment(last);
    return mEnd.isSameOrAfter(mLast, 'minutes');
  }
  function daySpan(start, end) {
    var mStart = moment(start);
    var mEnd = moment(end);
    var dur = moment.duration(mEnd.diff(mStart));
    return dur.days();
  }

  // These two are used by eventLevels
  function sortEvents(_ref6) {
    var _ref6$evtA = _ref6.evtA,
      aStart = _ref6$evtA.start,
      aEnd = _ref6$evtA.end,
      aAllDay = _ref6$evtA.allDay,
      _ref6$evtB = _ref6.evtB,
      bStart = _ref6$evtB.start,
      bEnd = _ref6$evtB.end,
      bAllDay = _ref6$evtB.allDay;
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
    var durA = daySpan(aStart, aEnd);
    var durB = daySpan(bStart, bEnd);
    return startSort ||
    // sort by start Day first
    durB - durA ||
    // events spanning multiple days go first
    !!bAllDay - !!aAllDay ||
    // then allDay single day events
    +aStart - +bStart ||
    // then sort by start time *don't need moment conversion here
    +aEnd - +bEnd // then sort by end time *don't need moment conversion here either
    ;
  }
  function inEventRange(_ref7) {
    var _ref7$event = _ref7.event,
      start = _ref7$event.start,
      end = _ref7$event.end,
      _ref7$range = _ref7.range,
      rangeStart = _ref7$range.start,
      rangeEnd = _ref7$range.end;
    var startOfDay = moment(start).startOf('day');
    var eEnd = moment(end);
    var rStart = moment(rangeStart);
    var rEnd = moment(rangeEnd);
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, 'day');
    // when the event is zero duration we need to handle a bit differently
    var sameMin = !startOfDay.isSame(eEnd, 'minutes');
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, 'minutes') : eEnd.isSameOrAfter(rStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  }
  function isSameDate(date1, date2) {
    var dt = moment(date1);
    var dt2 = moment(date2);
    return dt.isSame(dt2, 'day');
  }

  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */
  function browserTZOffset() {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    var dt = new Date();
    var neg = /-/.test(dt.toString()) ? '-' : '';
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    // moment correctly provides positive/negative offset, as expected
    var mtOffset = moment().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    formats: formats$5,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
    format: function format(value, _format, culture) {
      return locale(moment(value), culture).format(_format);
    },
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    eq: eq,
    neq: neq,
    merge: merge,
    inRange: inRange,
    startOf: startOf,
    endOf: endOf,
    range: range,
    add: add,
    diff: diff,
    ceil: ceil,
    min: min,
    max: max,
    minutes: minutes,
    getSlotDate: getSlotDate,
    getTimezoneOffset: getTimezoneOffset,
    getDstOffset: getDstOffset,
    getTotalMin: getTotalMin,
    getMinutesFromMidnight: getMinutesFromMidnight,
    continuesPrior: continuesPrior,
    continuesAfter: continuesAfter,
    sortEvents: sortEvents,
    inEventRange: inEventRange,
    isSameDate: isSameDate,
    daySpan: daySpan,
    browserTZOffset: browserTZOffset
  });
}

function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's';
}
var weekRangeFormat$4 = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, 'MMMM dd', culture) + ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture);
};
var dateRangeFormat$4 = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, 'D', culture) + ' – ' + local.format(end, 'D', culture);
};
var timeRangeFormat$4 = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end;
  return local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture);
};
var timeRangeStartFormat$4 = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 't', culture) + ' – ';
};
var timeRangeEndFormat$4 = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 't', culture);
};
var formats$4 = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEE',
  selectRangeFormat: timeRangeFormat$4,
  eventTimeRangeFormat: timeRangeFormat$4,
  eventTimeRangeStartFormat: timeRangeStartFormat$4,
  eventTimeRangeEndFormat: timeRangeEndFormat$4,
  timeGutterFormat: 't',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'EEEE MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$4,
  agendaHeaderFormat: dateRangeFormat$4,
  agendaDateFormat: 'EEE MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat$4
};
function fixUnit$1(unit) {
  var datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;
  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }
  return datePart;
}

// Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)
function luxon (DateTime) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$firstDayOfWeek = _ref6.firstDayOfWeek,
    firstDayOfWeek = _ref6$firstDayOfWeek === void 0 ? 7 : _ref6$firstDayOfWeek;
  function formatDate(value, format) {
    return DateTime.fromJSDate(value).toFormat(format);
  }
  function formatDateWithCulture(value, culture, format) {
    return DateTime.fromJSDate(value).setLocale(culture).toFormat(format);
  }

  /*** BEGIN localized date arithmetic methods with Luxon ***/
  function defineComparators(a, b, unit) {
    var datePart = fixUnit$1(unit);
    var dtA = datePart ? DateTime.fromJSDate(a).startOf(datePart) : DateTime.fromJSDate(a);
    var dtB = datePart ? DateTime.fromJSDate(b).startOf(datePart) : DateTime.fromJSDate(b);
    return [dtA, dtB, datePart];
  }

  // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday
  function startOfDTWeek(dtObj) {
    var weekday = dtObj.weekday;
    if (weekday === firstDayOfWeek) {
      return dtObj.startOf('day'); // already beginning of week
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf('week'); // fow is Monday, which is Luxon default
    }
    var diff = firstDayOfWeek === 7 ? weekday : weekday + (7 - firstDayOfWeek);
    return dtObj.minus({
      day: diff
    }).startOf('day');
  }
  function endOfDTWeek(dtObj) {
    var weekday = dtObj.weekday;
    var eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1;
    if (weekday === eow) {
      return dtObj.endOf('day'); // already last day of the week
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf('week'); // use Luxon default (Sunday)
    }
    var fromDate = firstDayOfWeek > eow ? dtObj.plus({
      day: firstDayOfWeek - eow
    }) : dtObj;
    return fromDate.set({
      weekday: eow
    }).endOf('day');
  }

  // This returns a DateTime instance
  function startOfDT() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit$1(unit);
    if (datePart) {
      var dt = DateTime.fromJSDate(date);
      return datePart.includes('week') ? startOfDTWeek(dt) : dt.startOf(datePart);
    }
    return DateTime.fromJSDate(date);
  }
  function firstOfWeek() {
    return firstDayOfWeek;
  }

  // This returns a JS Date from a DateTime instance
  function startOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    return startOfDT(date, unit).toJSDate();
  }

  // This returns a DateTime instance
  function endOfDT() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit$1(unit);
    if (datePart) {
      var dt = DateTime.fromJSDate(date);
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart);
    }
    return DateTime.fromJSDate(date);
  }
  function endOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    return endOfDT(date, unit).toJSDate();
  }
  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
      _defineComparators2 = _slicedToArray(_defineComparators, 2),
      dtA = _defineComparators2[0],
      dtB = _defineComparators2[1];
    return +dtA == +dtB;
  }
  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }
  function gt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
      _defineComparators4 = _slicedToArray(_defineComparators3, 2),
      dtA = _defineComparators4[0],
      dtB = _defineComparators4[1];
    return +dtA > +dtB;
  }
  function lt(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
      _defineComparators6 = _slicedToArray(_defineComparators5, 2),
      dtA = _defineComparators6[0],
      dtB = _defineComparators6[1];
    return +dtA < +dtB;
  }
  function gte(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit),
      _defineComparators8 = _slicedToArray(_defineComparators7, 2),
      dtA = _defineComparators8[0],
      dtB = _defineComparators8[1];
    return +dtA >= +dtB;
  }
  function lte(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit),
      _defineComparators10 = _slicedToArray(_defineComparators9, 2),
      dtA = _defineComparators10[0],
      dtB = _defineComparators10[1];
    return +dtA <= +dtB;
  }
  function inRange(day, min, max) {
    var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day';
    var datePart = fixUnit$1(unit);
    var mDay = startOfDT(day, datePart);
    var mMin = startOfDT(min, datePart);
    var mMax = startOfDT(max, datePart);
    return +mDay >= +mMin && +mDay <= +mMax;
  }
  function min(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA);
    var dtB = DateTime.fromJSDate(dateB);
    var minDt = DateTime.min(dtA, dtB);
    return minDt.toJSDate();
  }
  function max(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA);
    var dtB = DateTime.fromJSDate(dateB);
    var maxDt = DateTime.max(dtA, dtB);
    return maxDt.toJSDate();
  }
  function merge(date, time) {
    if (!date && !time) return null;
    var tm = DateTime.fromJSDate(time);
    var dt = startOfDT(date, 'day');
    return dt.set({
      hour: tm.hour,
      minute: tm.minute,
      second: tm.second,
      millisecond: tm.millisecond
    }).toJSDate();
  }
  function add(date, adder, unit) {
    var datePart = fixUnit$1(unit);
    return DateTime.fromJSDate(date).plus(_defineProperty({}, datePart, adder)).toJSDate();
  }
  function range(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit$1(unit);
    var current = DateTime.fromJSDate(start).toJSDate(); // this is to get it to tz
    var days = [];
    while (lte(current, end)) {
      days.push(current);
      current = add(current, 1, datePart);
    }
    return days;
  }
  function ceil(date, unit) {
    var datePart = fixUnit$1(unit);
    var floor = startOf(date, datePart);
    return eq(floor, date) ? floor : add(floor, 1, datePart);
  }
  function diff(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit$1(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    var dtA = DateTime.fromJSDate(a);
    var dtB = DateTime.fromJSDate(b);
    return Math.floor(dtB.diff(dtA, datePart, {
      conversionAccuracy: 'longterm'
    }).toObject()[datePart]);
  }
  function firstVisibleDay(date) {
    var startOfMonth = startOfDT(date, 'month');
    return startOfDTWeek(startOfMonth).toJSDate();
  }
  function lastVisibleDay(date) {
    var endOfMonth = endOfDT(date, 'month');
    return endOfDTWeek(endOfMonth).toJSDate();
  }
  function visibleDays(date) {
    var current = firstVisibleDay(date);
    var last = lastVisibleDay(date);
    var days = [];
    while (lte(current, last)) {
      days.push(current);
      current = add(current, 1, 'day');
    }
    return days;
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return startOfDT(dt, 'day').set({
      minutes: minutesFromMidnight + offset
    }).toJSDate();
  }

  // Luxon will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }
  function getMinutesFromMidnight(start) {
    var dayStart = startOfDT(start, 'day');
    var day = DateTime.fromJSDate(start);
    return Math.round(day.diff(dayStart, 'minutes', {
      conversionAccuracy: 'longterm'
    }).toObject().minutes);
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    return lt(start, first);
  }
  function continuesAfter(start, end, last) {
    return gte(end, last);
  }
  function daySpan(start, end) {
    var dtStart = DateTime.fromJSDate(start);
    var dtEnd = DateTime.fromJSDate(end);
    return dtEnd.diff(dtStart).as('days');
  }

  // These two are used by eventLevels
  function sortEvents(_ref7) {
    var _ref7$evtA = _ref7.evtA,
      aStart = _ref7$evtA.start,
      aEnd = _ref7$evtA.end,
      aAllDay = _ref7$evtA.allDay,
      _ref7$evtB = _ref7.evtB,
      bStart = _ref7$evtB.start,
      bEnd = _ref7$evtB.end,
      bAllDay = _ref7$evtB.allDay;
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
    var durA = daySpan(aStart, aEnd);
    var durB = daySpan(bStart, bEnd);
    return startSort ||
    // sort by start Day first
    durB - durA ||
    // events spanning multiple days go first
    !!bAllDay - !!aAllDay ||
    // then allDay single day events
    +aStart - +bStart ||
    // then sort by start time *don't need moment conversion here
    +aEnd - +bEnd // then sort by end time *don't need moment conversion here either
    ;
  }
  function inEventRange(_ref8) {
    var _ref8$event = _ref8.event,
      start = _ref8$event.start,
      end = _ref8$event.end,
      _ref8$range = _ref8.range,
      rangeStart = _ref8$range.start,
      rangeEnd = _ref8$range.end;
    var eStart = startOf(start, 'day');
    var startsBeforeEnd = lte(eStart, rangeEnd, 'day');
    // when the event is zero duration we need to handle a bit differently
    var sameMin = neq(eStart, end, 'minutes');
    var endsAfterStart = sameMin ? gt(end, rangeStart, 'minutes') : gte(end, rangeStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  }

  // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year
  function isSameDate(date1, date2) {
    var dt = DateTime.fromJSDate(date1);
    var dt2 = DateTime.fromJSDate(date2);
    return dt.hasSame(dt2, 'day');
  }

  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */
  function browserTZOffset() {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    var dt = new Date();
    var neg = /-/.test(dt.toString()) ? '-' : '';
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    // moment correctly provides positive/negative offset, as expected
    var mtOffset = DateTime.local().offset;
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    format: function format(value, _format, culture) {
      if (culture) {
        return formatDateWithCulture(value, culture, _format);
      }
      return formatDate(value, _format);
    },
    formats: formats$4,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    eq: eq,
    neq: neq,
    merge: merge,
    inRange: inRange,
    startOf: startOf,
    endOf: endOf,
    range: range,
    add: add,
    diff: diff,
    ceil: ceil,
    min: min,
    max: max,
    getSlotDate: getSlotDate,
    getTotalMin: getTotalMin,
    getMinutesFromMidnight: getMinutesFromMidnight,
    continuesPrior: continuesPrior,
    continuesAfter: continuesAfter,
    sortEvents: sortEvents,
    inEventRange: inEventRange,
    isSameDate: isSameDate,
    daySpan: daySpan,
    browserTZOffset: browserTZOffset
  });
}

var dateRangeFormat$3 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, 'd', culture) + ' – ' + local.format(end, 'd', culture);
};
var timeRangeFormat$3 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture);
};
var timeRangeStartFormat$3 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, 't', culture) + ' – ';
};
var timeRangeEndFormat$3 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return ' – ' + local.format(end, 't', culture);
};
var weekRangeFormat$3 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end;
  return local.format(start, 'MMM dd', culture) + ' – ' + local.format(end, eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};
var formats$3 = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat$3,
  eventTimeRangeFormat: timeRangeFormat$3,
  eventTimeRangeStartFormat: timeRangeStartFormat$3,
  eventTimeRangeEndFormat: timeRangeEndFormat$3,
  timeGutterFormat: 't',
  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$3,
  agendaHeaderFormat: dateRangeFormat$3,
  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat$3
};
function oldGlobalize (globalize) {
  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
  }
  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }
  return new DateLocalizer({
    firstOfWeek: firstOfWeek,
    formats: formats$3,
    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  });
}

// TODO: fix the globalizeLocalizer to work with globalize 1.x

var dateRangeFormat$2 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, {
    date: 'short'
  }, culture) + ' – ' + local.format(end, {
    date: 'short'
  }, culture);
};
var timeRangeFormat$2 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, {
    time: 'short'
  }, culture) + ' – ' + local.format(end, {
    time: 'short'
  }, culture);
};
var timeRangeStartFormat$2 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, {
    time: 'short'
  }, culture) + ' – ';
};
var timeRangeEndFormat$2 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return ' – ' + local.format(end, {
    time: 'short'
  }, culture);
};
var weekRangeFormat$2 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end;
  return local.format(start, 'MMM dd', culture) + ' – ' + local.format(end, eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};
var formats$2 = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',
  selectRangeFormat: timeRangeFormat$2,
  eventTimeRangeFormat: timeRangeFormat$2,
  eventTimeRangeStartFormat: timeRangeStartFormat$2,
  eventTimeRangeEndFormat: timeRangeEndFormat$2,
  timeGutterFormat: {
    time: 'short'
  },
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'eeee MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$2,
  agendaHeaderFormat: dateRangeFormat$2,
  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: {
    time: 'short'
  },
  agendaTimeRangeFormat: timeRangeFormat$2
};
function globalize (globalize) {
  var locale = function locale(culture) {
    return culture ? globalize(culture) : globalize;
  };

  // return the first day of the week from the locale data. Defaults to 'world'
  // territory if no territory is derivable from CLDR.
  // Failing to use CLDR supplemental (not loaded?), revert to the original
  // method of getting first day of week.
  function firstOfWeek(culture) {
    try {
      var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var cldr = locale(culture).cldr;
      var territory = cldr.attributes.territory;
      var weekData = cldr.get('supplemental').weekData;
      var firstDay = weekData.firstDay[territory || '001'];
      return days.indexOf(firstDay);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to accurately determine first day of the week.' + ' Is supplemental data loaded into CLDR?');
      }
      // maybe cldr supplemental is not loaded? revert to original method
      var date = new Date();
      //cldr-data doesn't seem to be zero based
      var localeDay = Math.max(parseInt(locale(culture).formatDate(date, {
        raw: 'e'
      }), 10) - 1, 0);
      return Math.abs(date.getDay() - localeDay);
    }
  }
  if (!globalize.load) return oldGlobalize(globalize);
  return new DateLocalizer({
    firstOfWeek: firstOfWeek,
    formats: formats$2,
    format: function format(value, _format, culture) {
      _format = typeof _format === 'string' ? {
        raw: _format
      } : _format;
      return locale(culture).formatDate(value, _format);
    }
  });
}

var dateRangeFormat$1 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return "".concat(local.format(start, 'P', culture), " \u2013 ").concat(local.format(end, 'P', culture));
};
var timeRangeFormat$1 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return "".concat(local.format(start, 'p', culture), " \u2013 ").concat(local.format(end, 'p', culture));
};
var timeRangeStartFormat$1 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return "".concat(local.format(start, 'h:mma', culture), " \u2013 ");
};
var timeRangeEndFormat$1 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return " \u2013 ".concat(local.format(end, 'h:mma', culture));
};
var weekRangeFormat$1 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end;
  return "".concat(local.format(start, 'MMMM dd', culture), " \u2013 ").concat(local.format(end, eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture));
};
var formats$1 = {
  dateFormat: 'dd',
  dayFormat: 'dd eee',
  weekdayFormat: 'ccc',
  selectRangeFormat: timeRangeFormat$1,
  eventTimeRangeFormat: timeRangeFormat$1,
  eventTimeRangeStartFormat: timeRangeStartFormat$1,
  eventTimeRangeEndFormat: timeRangeEndFormat$1,
  timeGutterFormat: 'p',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$1,
  agendaHeaderFormat: dateRangeFormat$1,
  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 'p',
  agendaTimeRangeFormat: timeRangeFormat$1
};
var dateFnsLocalizer = function dateFnsLocalizer(_ref6) {
  var startOfWeek = _ref6.startOfWeek,
    getDay = _ref6.getDay,
    _format = _ref6.format,
    locales = _ref6.locales;
  return new DateLocalizer({
    formats: formats$1,
    firstOfWeek: function firstOfWeek(culture) {
      return getDay(startOfWeek(new Date(), {
        locale: locales[culture]
      }));
    },
    format: function format(value, formatString, culture) {
      return _format(new Date(value), formatString, {
        locale: locales[culture]
      });
    }
  });
};

var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end;
  return local.format(start, 'MMMM DD', culture) + ' – ' +
  // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture);
};
var dateRangeFormat = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end;
  return local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture);
};
var timeRangeFormat = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end;
  return local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture);
};
var timeRangeStartFormat = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 'LT', culture) + ' – ';
};
var timeRangeEndFormat = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 'LT', culture);
};
var formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 'LT',
  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat
};
function fixUnit(unit) {
  var datePart = unit ? unit.toLowerCase() : unit;
  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }
  return datePart;
}
function dayjs (dayjsLib) {
  // load dayjs plugins
  dayjsLib.extend(isBetween);
  dayjsLib.extend(isSameOrAfter);
  dayjsLib.extend(isSameOrBefore);
  dayjsLib.extend(localeData);
  dayjsLib.extend(localizedFormat);
  dayjsLib.extend(minMax);
  dayjsLib.extend(utc);
  dayjsLib.extend(isLeapYear);
  var locale = function locale(dj, c) {
    return c ? dj.locale(c) : dj;
  };

  // if the timezone plugin is loaded,
  // then use the timezone aware version
  var dayjs = dayjsLib.tz ? dayjsLib.tz : dayjsLib;
  function getTimezoneOffset(date) {
    // ensures this gets cast to timezone
    return dayjs(date).toDate().getTimezoneOffset();
  }
  function getDstOffset(start, end) {
    var _st$tz$$x$$timezone;
    // convert to dayjs, in case
    var st = dayjs(start);
    var ed = dayjs(end);
    // if not using the dayjs timezone plugin
    if (!dayjs.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset();
    }
    /**
     * If a default timezone has been applied, then
     * use this to get the proper timezone offset, otherwise default
     * the timezone to the browser local
     */
    var tzName = (_st$tz$$x$$timezone = st.tz().$x.$timezone) !== null && _st$tz$$x$$timezone !== void 0 ? _st$tz$$x$$timezone : dayjsLib.tz.guess();
    // invert offsets to be inline with moment.js
    var startOffset = -dayjs.tz(+st, tzName).utcOffset();
    var endOffset = -dayjs.tz(+ed, tzName).utcOffset();
    return startOffset - endOffset;
  }
  function getDayStartDstOffset(start) {
    var dayStart = dayjs(start).startOf('day');
    return getDstOffset(dayStart, start);
  }

  /*** BEGIN localized date arithmetic methods with dayjs ***/
  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit);
    var dtA = datePart ? dayjs(a).startOf(datePart) : dayjs(a);
    var dtB = datePart ? dayjs(b).startOf(datePart) : dayjs(b);
    return [dtA, dtB, datePart];
  }
  function startOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit(unit);
    if (datePart) {
      return dayjs(date).startOf(datePart).toDate();
    }
    return dayjs(date).toDate();
  }
  function endOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit(unit);
    if (datePart) {
      return dayjs(date).endOf(datePart).toDate();
    }
    return dayjs(date).toDate();
  }

  // dayjs comparison operations *always* convert both sides to dayjs objects
  // prior to running the comparisons
  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
      _defineComparators2 = _slicedToArray(_defineComparators, 3),
      dtA = _defineComparators2[0],
      dtB = _defineComparators2[1],
      datePart = _defineComparators2[2];
    return dtA.isSame(dtB, datePart);
  }
  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }
  function gt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
      _defineComparators4 = _slicedToArray(_defineComparators3, 3),
      dtA = _defineComparators4[0],
      dtB = _defineComparators4[1],
      datePart = _defineComparators4[2];
    return dtA.isAfter(dtB, datePart);
  }
  function lt(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
      _defineComparators6 = _slicedToArray(_defineComparators5, 3),
      dtA = _defineComparators6[0],
      dtB = _defineComparators6[1],
      datePart = _defineComparators6[2];
    return dtA.isBefore(dtB, datePart);
  }
  function gte(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit),
      _defineComparators8 = _slicedToArray(_defineComparators7, 3),
      dtA = _defineComparators8[0],
      dtB = _defineComparators8[1],
      datePart = _defineComparators8[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function lte(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit),
      _defineComparators10 = _slicedToArray(_defineComparators9, 3),
      dtA = _defineComparators10[0],
      dtB = _defineComparators10[1],
      datePart = _defineComparators10[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function inRange(day, min, max) {
    var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day';
    var datePart = fixUnit(unit);
    var djDay = dayjs(day);
    var djMin = dayjs(min);
    var djMax = dayjs(max);
    return djDay.isBetween(djMin, djMax, datePart, '[]');
  }
  function min(dateA, dateB) {
    var dtA = dayjs(dateA);
    var dtB = dayjs(dateB);
    var minDt = dayjsLib.min(dtA, dtB);
    return minDt.toDate();
  }
  function max(dateA, dateB) {
    var dtA = dayjs(dateA);
    var dtB = dayjs(dateB);
    var maxDt = dayjsLib.max(dtA, dtB);
    return maxDt.toDate();
  }
  function merge(date, time) {
    if (!date && !time) return null;
    var tm = dayjs(time).format('HH:mm:ss');
    var dt = dayjs(date).startOf('day').format('MM/DD/YYYY');
    // We do it this way to avoid issues when timezone switching
    var mergedDateTime = dayjs("".concat(dt, " ").concat(tm)).toDate();
    return dayjsLib(mergedDateTime).utc(true).toDate();
  }
  function add(date, adder, unit) {
    var datePart = fixUnit(unit);
    return dayjs(date).add(adder, datePart).toDate();
  }
  function range(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit);
    // because the add method will put these in tz, we have to start that way
    var current = dayjs(start).toDate();
    var days = [];
    while (lte(current, end)) {
      days.push(current);
      current = add(current, 1, datePart);
    }
    return days;
  }
  function ceil(date, unit) {
    var datePart = fixUnit(unit);
    var floor = startOf(date, datePart);
    return eq(floor, date) ? floor : add(floor, 1, datePart);
  }
  function diff(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit);
    // don't use 'defineComparators' here, as we don't want to mutate the values
    var dtA = dayjs(a);
    var dtB = dayjs(b);
    return dtB.diff(dtA, datePart);
  }
  function minutes(date) {
    var dt = dayjs(date);
    return dt.minutes();
  }
  function firstOfWeek(culture) {
    var data = culture ? dayjsLib.localeData(culture) : dayjsLib.localeData();
    return data ? data.firstDayOfWeek() : 0;
  }
  function firstVisibleDay(date) {
    var firstDayOfMonth = dayjs(date).startOf('month');
    var firstDayOfWeek = dayjs(firstDayOfMonth).startOf('week');
    // special handling for leapyears until Dayjs patches it
    if (dayjs(firstDayOfMonth).isLeapYear()) {
      var day = firstDayOfMonth.toDate().getDay(),
        _diff = firstDayOfMonth.toDate().getDate() - day + (day == 0 ? -6 : 1);
      firstDayOfWeek.date(_diff);
    }
    return firstDayOfWeek.toDate();
  }
  function lastVisibleDay(date) {
    return dayjs(date).endOf('month').endOf('week').toDate();
  }
  function visibleDays(date) {
    var current = firstVisibleDay(date);
    var last = lastVisibleDay(date);
    var days = [];
    while (lte(current, last)) {
      days.push(current);
      current = add(current, 1, 'd');
    }
    return days;
  }
  /*** END localized date arithmetic methods with dayjs ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using dayjs to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return dayjs(dt).startOf('day').minute(minutesFromMidnight + offset).toDate();
  }

  // dayjs will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }
  function getMinutesFromMidnight(start) {
    var dayStart = dayjs(start).startOf('day');
    var day = dayjs(start);
    return day.diff(dayStart, 'minutes') + getDayStartDstOffset(start);
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    var djStart = dayjs(start);
    var djFirst = dayjs(first);
    return djStart.isBefore(djFirst, 'day');
  }
  function continuesAfter(start, end, last) {
    var djEnd = dayjs(end);
    var djLast = dayjs(last);
    return djEnd.isSameOrAfter(djLast, 'minutes');
  }
  function daySpan(start, end) {
    var startDay = dayjs(start);
    var endDay = dayjs(end);
    return endDay.diff(startDay, 'day');
  }

  // These two are used by eventLevels
  function sortEvents(_ref6) {
    var _ref6$evtA = _ref6.evtA,
      aStart = _ref6$evtA.start,
      aEnd = _ref6$evtA.end,
      aAllDay = _ref6$evtA.allDay,
      _ref6$evtB = _ref6.evtB,
      bStart = _ref6$evtB.start,
      bEnd = _ref6$evtB.end,
      bAllDay = _ref6$evtB.allDay;
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
    var durA = daySpan(aStart, aEnd);
    var durB = daySpan(bStart, bEnd);
    return startSort ||
    // sort by start Day first
    durB - durA ||
    // events spanning multiple days go first
    !!bAllDay - !!aAllDay ||
    // then allDay single day events
    +aStart - +bStart ||
    // then sort by start time *don't need dayjs conversion here
    +aEnd - +bEnd // then sort by end time *don't need dayjs conversion here either
    ;
  }
  function inEventRange(_ref7) {
    var _ref7$event = _ref7.event,
      start = _ref7$event.start,
      end = _ref7$event.end,
      _ref7$range = _ref7.range,
      rangeStart = _ref7$range.start,
      rangeEnd = _ref7$range.end;
    var startOfDay = dayjs(start).startOf('day');
    var eEnd = dayjs(end);
    var rStart = dayjs(rangeStart);
    var rEnd = dayjs(rangeEnd);
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, 'day');
    // when the event is zero duration we need to handle a bit differently
    var sameMin = !startOfDay.isSame(eEnd, 'minutes');
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, 'minutes') : eEnd.isSameOrAfter(rStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  }
  function isSameDate(date1, date2) {
    var dt = dayjs(date1);
    var dt2 = dayjs(date2);
    return dt.isSame(dt2, 'day');
  }

  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */
  function browserTZOffset() {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    var dt = new Date();
    var neg = /-/.test(dt.toString()) ? '-' : '';
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    // dayjs correctly provides positive/negative offset, as expected
    var mtOffset = dayjs().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    formats: formats,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
    format: function format(value, _format, culture) {
      return locale(dayjs(value), culture).format(_format);
    },
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    eq: eq,
    neq: neq,
    merge: merge,
    inRange: inRange,
    startOf: startOf,
    endOf: endOf,
    range: range,
    add: add,
    diff: diff,
    ceil: ceil,
    min: min,
    max: max,
    minutes: minutes,
    getSlotDate: getSlotDate,
    getTimezoneOffset: getTimezoneOffset,
    getDstOffset: getDstOffset,
    getTotalMin: getTotalMin,
    getMinutesFromMidnight: getMinutesFromMidnight,
    continuesPrior: continuesPrior,
    continuesAfter: continuesAfter,
    sortEvents: sortEvents,
    inEventRange: inEventRange,
    isSameDate: isSameDate,
    browserTZOffset: browserTZOffset
  });
}

var components = {
  eventWrapper: NoopWrapper,
  timeSlotWrapper: NoopWrapper,
  dateCellWrapper: NoopWrapper
};

export { Calendar$1 as Calendar, DateLocalizer, navigate as Navigate, views as Views, components, dateFnsLocalizer, dayjs as dayjsLocalizer, globalize as globalizeLocalizer, luxon as luxonLocalizer, moment as momentLocalizer, moveDate as move };
