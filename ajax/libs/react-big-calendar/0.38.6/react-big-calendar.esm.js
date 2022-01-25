import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import PropTypes from 'prop-types';
import React, { Component, useRef, useEffect } from 'react';
import { uncontrollable } from 'uncontrollable';
import clsx from 'clsx';
import invariant from 'invariant';
import { startOf, endOf, lte, add, eq, hours, minutes, seconds, milliseconds, inRange as inRange$1, lt, gt, gte, neq, min, max } from 'date-arithmetic';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import { findDOMNode } from 'react-dom';
import chunk from 'lodash-es/chunk';
import getPosition from 'dom-helpers/position';
import { request, cancel } from 'dom-helpers/animationFrame';
import getOffset from 'dom-helpers/offset';
import getScrollTop from 'dom-helpers/scrollTop';
import getScrollLeft from 'dom-helpers/scrollLeft';
import isEqual$1 from 'lodash-es/isEqual';
import Overlay from 'react-overlays/Overlay';
import getHeight from 'dom-helpers/height';
import qsa from 'dom-helpers/querySelectorAll';
import contains from 'dom-helpers/contains';
import closest from 'dom-helpers/closest';
import listen from 'dom-helpers/listen';
import findIndex from 'lodash-es/findIndex';
import range$1 from 'lodash-es/range';
import memoize from 'memoize-one';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import sortBy from 'lodash-es/sortBy';
import getWidth from 'dom-helpers/width';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import addClass from 'dom-helpers/addClass';
import removeClass from 'dom-helpers/removeClass';
import omit from 'lodash-es/omit';
import defaults from 'lodash-es/defaults';
import transform from 'lodash-es/transform';
import mapValues from 'lodash-es/mapValues';

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

var viewNames = Object.keys(views).map(function (k) {
  return views[k];
});
var accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
var dateFormat = PropTypes.any;
var dateRangeFormat = PropTypes.func;
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

var views$1 = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(viewNames)), PropTypes.objectOf(function (prop, key) {
  var isBuiltinView = viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean';

  if (isBuiltinView) {
    return null;
  } else {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return PropTypes.elementType.apply(PropTypes, [prop, key].concat(args));
  }
})]);
var DayLayoutAlgorithmPropType = PropTypes.oneOfType([PropTypes.oneOf(['overlap', 'no-overlap']), PropTypes.func]);

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

/* eslint no-fallthrough: off */
var MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24
};
function firstVisibleDay(date, localizer) {
  var firstOfMonth = startOf(date, 'month');
  return startOf(firstOfMonth, 'week', localizer.startOfWeek());
}
function lastVisibleDay(date, localizer) {
  var endOfMonth = endOf(date, 'month');
  return endOf(endOfMonth, 'week', localizer.startOfWeek());
}
function visibleDays(date, localizer) {
  var current = firstVisibleDay(date, localizer),
      last = lastVisibleDay(date, localizer),
      days = [];

  while (lte(current, last, 'day')) {
    days.push(current);
    current = add(current, 1, 'day');
  }

  return days;
}
function ceil(date, unit) {
  var floor = startOf(date, unit);
  return eq(floor, date) ? floor : add(floor, 1, unit);
}
function range(start, end, unit) {
  if (unit === void 0) {
    unit = 'day';
  }

  var current = start,
      days = [];

  while (lte(current, end, unit)) {
    days.push(current);
    current = add(current, 1, unit);
  }

  return days;
}
function merge(date, time) {
  if (time == null && date == null) return null;
  if (time == null) time = new Date();
  if (date == null) date = new Date();
  date = startOf(date, 'day');
  date = hours(date, hours(time));
  date = minutes(date, minutes(time));
  date = seconds(date, seconds(time));
  return milliseconds(date, milliseconds(time));
}
function isJustDate(date) {
  return hours(date) === 0 && minutes(date) === 0 && seconds(date) === 0 && milliseconds(date) === 0;
}
function diff(dateA, dateB, unit) {
  if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB); // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour

  return Math.round(Math.abs(+startOf(dateA, unit) / MILLI[unit] - +startOf(dateB, unit) / MILLI[unit]));
}

var localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);

function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
  !(result == null || typeof result === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, '`localizer format(..)` must return a string, null, or undefined') : invariant(false) : void 0;
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
} // if the start is on a DST-changing day but *after* the moment of DST
// transition we need to add those extra minutes to our minutesFromMidnight


function getTotalMin(start, end) {
  return diff(start, end, 'minutes') + getDstOffset(start, end);
}

function getMinutesFromMidnight(start) {
  var daystart = startOf(start, 'day');
  return diff(daystart, start, 'minutes') + getDstOffset(daystart, start);
} // These two are used by DateSlotMetrics


function continuesPrior(start, first) {
  return lt(start, first, 'day');
}

function continuesAfter(start, end, last) {
  var singleDayDuration = eq(start, end, 'minutes');
  return singleDayDuration ? gte(end, last, 'minutes') : gt(end, last, 'minutes');
} // These two are used by eventLevels


function sortEvents(_ref) {
  var _ref$evtA = _ref.evtA,
      aStart = _ref$evtA.start,
      aEnd = _ref$evtA.end,
      aAllDay = _ref$evtA.allDay,
      _ref$evtB = _ref.evtB,
      bStart = _ref$evtB.start,
      bEnd = _ref$evtB.end,
      bAllDay = _ref$evtB.allDay;
  var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
  var durA = diff(aStart, ceil(aEnd, 'day'), 'day');
  var durB = diff(bStart, ceil(bEnd, 'day'), 'day');
  return startSort || // sort by start Day first
  Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
  !!bAllDay - !!aAllDay || // then allDay single day events
  +aStart - +bStart || // then sort by start time
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
  var startsBeforeEnd = lte(eStart, rangeEnd, 'day'); // when the event is zero duration we need to handle a bit differently

  var sameMin = neq(eStart, end, 'minutes');
  var endsAfterStart = sameMin ? gt(end, rangeStart, 'minutes') : gte(end, rangeStart, 'minutes');
  return startsBeforeEnd && endsAfterStart;
} // other localizers treats 'day' and 'date' equality very differently, so we
// abstract the change the 'localizer.eq(date1, date2, 'day') into this
// new method, where they can be treated correctly by the localizer overrides


function isSameDate(date1, date2) {
  return eq(date1, date2, 'day');
}

function startAndEndAreDateOnly(start, end) {
  return isJustDate(start) && isJustDate(end);
}

var DateLocalizer = function DateLocalizer(spec) {
  var _this = this;

  !(typeof spec.format === 'function') ? process.env.NODE_ENV !== "production" ? invariant(false, 'date localizer `format(..)` must be a function') : invariant(false) : void 0;
  !(typeof spec.firstOfWeek === 'function') ? process.env.NODE_ENV !== "production" ? invariant(false, 'date localizer `firstOfWeek(..)` must be a function') : invariant(false) : void 0;
  this.propType = spec.propType || localePropType;
  this.formats = spec.formats;

  this.format = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _format.apply(void 0, [_this, spec.format].concat(args));
  }; // These date arithmetic methods can be overriden by the localizer


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
  this.firstVisibleDay = spec.firstVisibleDay || firstVisibleDay;
  this.lastVisibleDay = spec.lastVisibleDay || lastVisibleDay;
  this.visibleDays = spec.visibleDays || visibleDays;
  this.getSlotDate = spec.getSlotDate || getSlotDate;
  this.getTotalMin = spec.getTotalMin || getTotalMin;
  this.getMinutesFromMidnight = spec.getMinutesFromMidnight || getMinutesFromMidnight;
  this.continuesPrior = spec.continuesPrior || continuesPrior;
  this.continuesAfter = spec.continuesAfter || continuesAfter;
  this.sortEvents = spec.sortEvents || sortEvents;
  this.inEventRange = spec.inEventRange || inEventRange;
  this.isSameDate = spec.isSameDate || isSameDate;
  this.startAndEndAreDateOnly = spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
  this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
};
function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
  var formats = _extends({}, localizer.formats, formatOverrides);

  return _extends({}, localizer, {
    messages: messages,
    startOfWeek: function startOfWeek() {
      return localizer.startOfWeek(culture);
    },
    format: function format(value, _format2) {
      return localizer.format(value, formats[_format2] || _format2, culture);
    }
  });
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
    return "+" + total + " more";
  }
};
function messages(msgs) {
  return _extends({}, defaultMessages, msgs);
}

var _excluded = ["style", "className", "event", "selected", "isAllDay", "onSelect", "onDoubleClick", "onKeyPress", "localizer", "continuesPrior", "continuesAfter", "accessors", "getters", "children", "components", "slotStart", "slotEnd"];

var EventCell = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(EventCell, _React$Component);

  function EventCell() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = EventCell.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        className = _this$props.className,
        event = _this$props.event,
        selected = _this$props.selected,
        isAllDay = _this$props.isAllDay,
        onSelect = _this$props.onSelect,
        _onDoubleClick = _this$props.onDoubleClick,
        _onKeyPress = _this$props.onKeyPress,
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
        props = _objectWithoutPropertiesLoose(_this$props, _excluded);

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
    return /*#__PURE__*/React.createElement(EventWrapper, _extends({}, this.props, {
      type: "date"
    }), /*#__PURE__*/React.createElement("div", _extends({}, props, {
      tabIndex: 0,
      style: _extends({}, userProps.style, style),
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
      onKeyPress: function onKeyPress(e) {
        return _onKeyPress && _onKeyPress(event, e);
      }
    }), typeof children === 'function' ? children(content) : content));
  };

  return EventCell;
}(React.Component);

EventCell.propTypes = process.env.NODE_ENV !== "production" ? {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),
  resizable: PropTypes.bool,
  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object,
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func
} : {};

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
  var cellWidth = slotWidth(rowBox, slots); // cell under the mouse

  var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots); // Identify row as either the initial row
  // or the row under the current mouse point

  var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
  var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y; // this row's position relative to the start point

  var isAboveStart = start.y > rowBox.bottom;
  var isBelowStart = rowBox.top > start.y;
  var isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom; // this row is between the current and start rows, so entirely selected

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

var Popup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Popup, _React$Component);

  function Popup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        _this$props$popupOffs = _this$props.popupOffset,
        popupOffset = _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
        popperRef = _this$props.popperRef,
        _getOffset = getOffset(popperRef.current),
        top = _getOffset.top,
        left = _getOffset.left,
        width = _getOffset.width,
        height = _getOffset.height,
        viewBottom = window.innerHeight + getScrollTop(window),
        viewRight = window.innerWidth + getScrollLeft(window),
        bottom = top + height,
        right = left + width;

    if (bottom > viewBottom || right > viewRight) {
      var topOffset, leftOffset;
      if (bottom > viewBottom) topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0);
      if (right > viewRight) leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0);
      this.setState({
        topOffset: topOffset,
        leftOffset: leftOffset
      }); //eslint-disable-line
    }
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props2 = this.props,
        events = _this$props2.events,
        selected = _this$props2.selected,
        getters = _this$props2.getters,
        accessors = _this$props2.accessors,
        components = _this$props2.components,
        onSelect = _this$props2.onSelect,
        onDoubleClick = _this$props2.onDoubleClick,
        onKeyPress = _this$props2.onKeyPress,
        slotStart = _this$props2.slotStart,
        slotEnd = _this$props2.slotEnd,
        localizer = _this$props2.localizer,
        popperRef = _this$props2.popperRef;
    var width = this.props.position.width,
        topOffset = (this.state || {}).topOffset || 0,
        leftOffset = (this.state || {}).leftOffset || 0;
    var style = {
      top: -topOffset,
      left: -leftOffset,
      minWidth: width + width / 2
    };
    return /*#__PURE__*/React.createElement("div", {
      style: _extends({}, this.props.style, style),
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
          return _this.props.handleDragStart(event);
        },
        onDragEnd: function onDragEnd() {
          return _this.props.show();
        }
      });
    }));
  };

  return Popup;
}(React.Component);

Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  position: PropTypes.object,
  popupOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })]),
  events: PropTypes.array,
  selected: PropTypes.object,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  handleDragStart: PropTypes.func,
  show: PropTypes.func,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.number,
  popperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.Element
  })])
} : {};
/**
 * The Overlay component, of react-overlays, creates a ref that is passed to the Popup, and
 * requires proper ref forwarding to be used without error
 */

var Popup$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Popup, _extends({
    popperRef: ref
  }, props));
});

function addEventListener(type, handler, target) {
  if (target === void 0) {
    target = document;
  }

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
function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds);
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
  function Selection(node, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$global = _ref2.global,
        global = _ref2$global === void 0 ? false : _ref2$global,
        _ref2$longPressThresh = _ref2.longPressThreshold,
        longPressThreshold = _ref2$longPressThresh === void 0 ? 250 : _ref2$longPressThresh;

    this.isDetached = false;
    this.container = node;
    this.globalMouse = !node || global;
    this.longPressThreshold = longPressThreshold;
    this._listeners = Object.create(null);
    this._handleInitialEvent = this._handleInitialEvent.bind(this);
    this._handleMoveEvent = this._handleMoveEvent.bind(this);
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
    this._keyListener = this._keyListener.bind(this);
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
    this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this); // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
    // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356

    this._removeTouchMoveWindowListener = addEventListener('touchmove', function () {}, window);
    this._removeKeyDownListener = addEventListener('keydown', this._keyListener);
    this._removeKeyUpListener = addEventListener('keyup', this._keyListener);
    this._removeDropFromOutsideListener = addEventListener('drop', this._dropFromOutsideListener);
    this._removeDragOverFromOutsideListener = addEventListener('dragover', this._dragOverFromOutsideListener);

    this._addInitialEventListener();
  }

  var _proto = Selection.prototype;

  _proto.on = function on(type, handler) {
    var handlers = this._listeners[type] || (this._listeners[type] = []);
    handlers.push(handler);
    return {
      remove: function remove() {
        var idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      }
    };
  };

  _proto.emit = function emit(type) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result;
    var handlers = this._listeners[type] || [];
    handlers.forEach(function (fn) {
      if (result === undefined) result = fn.apply(void 0, args);
    });
    return result;
  };

  _proto.teardown = function teardown() {
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
  };

  _proto.isSelected = function isSelected(node) {
    var box = this._selectRect;
    if (!box || !this.selecting) return false;
    return objectsCollide(box, getBoundsForNode(node));
  };

  _proto.filter = function filter(items) {
    var box = this._selectRect; //not selecting

    if (!box || !this.selecting) return [];
    return items.filter(this.isSelected, this);
  } // Adds a listener that will call the handler only after the user has pressed on the screen
  // without moving their finger for 250ms.
  ;

  _proto._addLongPressListener = function _addLongPressListener(handler, initialEvent) {
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
  } // Listen for mousedown and touchstart events. When one is received, disable the other and setup
  // future event handling based on the type of event.
  ;

  _proto._addInitialEventListener = function _addInitialEventListener() {
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
  };

  _proto._dropFromOutsideListener = function _dropFromOutsideListener(e) {
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
  };

  _proto._dragOverFromOutsideListener = function _dragOverFromOutsideListener(e) {
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
  };

  _proto._handleInitialEvent = function _handleInitialEvent(e) {
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
        offsetData; // Right clicks

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
  };

  _proto._handleTerminatingEvent = function _handleTerminatingEvent(e) {
    var _getEventCoordinates4 = getEventCoordinates(e),
        pageX = _getEventCoordinates4.pageX,
        pageY = _getEventCoordinates4.pageY;

    this.selecting = false;
    this._removeEndListener && this._removeEndListener();
    this._removeMoveListener && this._removeMoveListener();
    if (!this._initialEventData) return;
    var inRoot = !this.container || contains(this.container(), e.target);
    var bounds = this._selectRect;
    var click = this.isClick(pageX, pageY);
    this._initialEventData = null;

    if (e.key === 'Escape') {
      return this.emit('reset');
    }

    if (!inRoot) {
      return this.emit('reset');
    }

    if (click && inRoot) {
      return this._handleClickEvent(e);
    } // User drag-clicked in the Selectable area


    if (!click) return this.emit('select', bounds);
  };

  _proto._handleClickEvent = function _handleClickEvent(e) {
    var _getEventCoordinates5 = getEventCoordinates(e),
        pageX = _getEventCoordinates5.pageX,
        pageY = _getEventCoordinates5.pageY,
        clientX = _getEventCoordinates5.clientX,
        clientY = _getEventCoordinates5.clientY;

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
    } // Click event


    this._lastClickData = {
      timestamp: now
    };
    return this.emit('click', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY
    });
  };

  _proto._handleMoveEvent = function _handleMoveEvent(e) {
    if (this._initialEventData === null || this.isDetached) {
      return;
    }

    var _this$_initialEventDa = this._initialEventData,
        x = _this$_initialEventDa.x,
        y = _this$_initialEventDa.y;

    var _getEventCoordinates6 = getEventCoordinates(e),
        pageX = _getEventCoordinates6.pageX,
        pageY = _getEventCoordinates6.pageY;

    var w = Math.abs(x - pageX);
    var h = Math.abs(y - pageY);
    var left = Math.min(pageX, x),
        top = Math.min(pageY, y),
        old = this.selecting; // Prevent emitting selectStart event until mouse is moved.
    // in Chrome on Windows, mouseMove event may be fired just after mouseDown event.

    if (this.isClick(pageX, pageY) && !old && !(w || h)) {
      return;
    }

    this.selecting = true;
    this._selectRect = {
      top: top,
      left: left,
      x: pageX,
      y: pageY,
      right: left + w,
      bottom: top + h
    };

    if (!old) {
      this.emit('selectStart', this._initialEventData);
    }

    if (!this.isClick(pageX, pageY)) this.emit('selecting', this._selectRect);
    e.preventDefault();
  };

  _proto._keyListener = function _keyListener(e) {
    this.ctrl = e.metaKey || e.ctrlKey;
  };

  _proto.isClick = function isClick(pageX, pageY) {
    var _this$_initialEventDa2 = this._initialEventData,
        x = _this$_initialEventDa2.x,
        y = _this$_initialEventDa2.y,
        isTouch = _this$_initialEventDa2.isTouch;
    return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
  };

  return Selection;
}();
/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */


function normalizeDistance(distance) {
  if (distance === void 0) {
    distance = 0;
  }

  if (typeof distance !== 'object') distance = {
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


function objectsCollide(nodeA, nodeB, tolerance) {
  if (tolerance === void 0) {
    tolerance = 0;
  }

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

  return !(aBottom - tolerance < bTop || // 'a' top doesn't touch 'b' bottom
  aTop + tolerance > bBottom || // 'a' right doesn't touch 'b' left
  aRight - tolerance < bLeft || // 'a' left doesn't touch 'b' right
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
  _inheritsLoose(BackgroundCells, _React$Component);

  function BackgroundCells(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.state = {
      selecting: false
    };
    return _this;
  }

  var _proto = BackgroundCells.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  };

  _proto.render = function render() {
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
      className: "rbc-row-bg"
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
  };

  _proto._selectable = function _selectable() {
    var _this2 = this;

    var node = findDOMNode(this);
    var selector = this._selector = new Selection(this.props.container, {
      longPressThreshold: this.props.longPressThreshold
    });

    var selectorClicksHandler = function selectorClicksHandler(point, actionType) {
      if (!isEvent(findDOMNode(_this2), point)) {
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
      return !isEvent(findDOMNode(_this2), box);
    });
    selector.on('click', function (point) {
      return selectorClicksHandler(point, 'click');
    });
    selector.on('doubleClick', function (point) {
      return selectorClicksHandler(point, 'doubleClick');
    });
    selector.on('select', function (bounds) {
      _this2._selectSlot(_extends({}, _this2.state, {
        action: 'select',
        bounds: bounds
      }));

      _this2._initial = {};

      _this2.setState({
        selecting: false
      });

      notify(_this2.props.onSelectEnd, [_this2.state]);
    });
  };

  _proto._teardownSelectable = function _teardownSelectable() {
    if (!this._selector) return;

    this._selector.teardown();

    this._selector = null;
  };

  _proto._selectSlot = function _selectSlot(_ref) {
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
  };

  return BackgroundCells;
}(React.Component);

BackgroundCells.propTypes = process.env.NODE_ENV !== "production" ? {
  date: PropTypes.instanceOf(Date),
  getNow: PropTypes.func.isRequired,
  getters: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  container: PropTypes.func,
  dayPropGetter: PropTypes.func,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,
  onSelectSlot: PropTypes.func.isRequired,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  rtl: PropTypes.bool,
  type: PropTypes.string,
  resourceId: PropTypes.any,
  localizer: PropTypes.any
} : {};

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
    var selected = props.selected,
        _ = props.isAllDay,
        accessors = props.accessors,
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
  renderSpan: function renderSpan(slots, len, key, content) {
    if (content === void 0) {
      content = ' ';
    }

    var per = Math.abs(len) / slots * 100 + '%';
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "rbc-row-segment" // IE10/11 need max-width. flex-basis doesn't respect box-sizing
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
  _inheritsLoose(EventRow, _React$Component);

  function EventRow() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = EventRow.prototype;

  _proto.render = function render() {
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
      if (gap) row.push(EventRowMixin.renderSpan(slots, gap, key + "_gap"));
      row.push(EventRowMixin.renderSpan(slots, span, key, content));
      lastEnd = right + 1;
      return row;
    }, []));
  };

  return EventRow;
}(React.Component);

EventRow.propTypes = process.env.NODE_ENV !== "production" ? _extends({
  segments: PropTypes.array
}, EventRowMixin.propTypes) : {};
EventRow.defaultProps = _extends({}, EventRowMixin.defaultProps);

function endOfRange(_ref) {
  var dateRange = _ref.dateRange,
      _ref$unit = _ref.unit,
      unit = _ref$unit === void 0 ? 'day' : _ref$unit,
      localizer = _ref.localizer;
  return {
    first: dateRange[0],
    last: localizer.add(dateRange[dateRange.length - 1], 1, unit)
  };
} // properly calculating segments requires working with dates in
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
  span = Math.min(span, slots); // The segmentOffset is necessary when adjusting for timezones
  // ahead of the browser timezone

  span = Math.max(span - localizer.segmentOffset, 1);
  return {
    event: event,
    span: span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  };
}
function eventLevels(rowSegments, limit) {
  if (limit === void 0) {
    limit = Infinity;
  }

  var i,
      j,
      seg,
      levels = [],
      extra = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++) {
      if (!segsOverlap(seg, levels[j])) break;
    }

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
function sortEvents$1(eventA, eventB, accessors, localizer) {
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

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function (seg) {
    return isSegmentInSlot(seg, slot);
  }).length;
};

var EventEndingRow = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(EventEndingRow, _React$Component);

  function EventEndingRow() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = EventEndingRow.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots;
    var rowSegments = eventLevels(segments).levels[0];
    var current = 1,
        lastEnd = 1,
        row = [];

    while (current <= slots) {
      var key = '_lvl_' + current;

      var _ref = rowSegments.filter(function (seg) {
        return isSegmentInSlot(seg, current);
      })[0] || {},
          event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span; //eslint-disable-line


      if (!event) {
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
  };

  _proto.canRenderSlotEvent = function canRenderSlotEvent(slot, span) {
    var segments = this.props.segments;
    return range$1(slot, slot + span).every(function (s) {
      var count = eventsInSlot(segments, s);
      return count === 1;
    });
  };

  _proto.renderShowMore = function renderShowMore(segments, slot) {
    var _this = this;

    var localizer = this.props.localizer;
    var count = eventsInSlot(segments, slot);
    return count ? /*#__PURE__*/React.createElement("a", {
      key: 'sm_' + slot,
      href: "#",
      className: 'rbc-show-more',
      onClick: function onClick(e) {
        return _this.showMore(slot, e);
      }
    }, localizer.messages.showMore(count)) : false;
  };

  _proto.showMore = function showMore(slot, e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onShowMore(slot, e.target);
  };

  return EventEndingRow;
}(React.Component);

EventEndingRow.propTypes = process.env.NODE_ENV !== "production" ? _extends({
  segments: PropTypes.array,
  slots: PropTypes.number,
  onShowMore: PropTypes.func
}, EventRowMixin.propTypes) : {};
EventEndingRow.defaultProps = _extends({}, EventRowMixin.defaultProps);

var ScrollableWeekWrapper = function ScrollableWeekWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "rbc-row-content-scroll-container"
  }, children);
};

var isSegmentInSlot$1 = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var isEqual = function isEqual(a, b) {
  return a[0].range === b[0].range && a[0].events === b[0].events;
};

function getSlotMetrics() {
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

    while (levels.length < minRows) {
      levels.push([]);
    }

    return {
      first: first,
      last: last,
      levels: levels,
      extra: extra,
      range: range,
      slots: range.length,
      clone: function clone(args) {
        var metrics = getSlotMetrics();
        return metrics(_extends({}, options, args));
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
          return isSegmentInSlot$1(seg, slot);
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
  _inheritsLoose(DateContentRow, _React$Component);

  function DateContentRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

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

      var row = qsa(findDOMNode(_assertThisInitialized(_this)), '.rbc-row-bg')[0];
      var cell;
      if (row) cell = row.children[slot - 1];
      var events = metrics.getEventsForSlot(slot);
      onShowMore(events, range[slot - 1], cell, slot, target);
    };

    _this.createHeadingRef = function (r) {
      _this.headingRow = r;
    };

    _this.createEventRef = function (r) {
      _this.eventRow = r;
    };

    _this.getContainer = function () {
      var container = _this.props.container;
      return container ? container() : findDOMNode(_assertThisInitialized(_this));
    };

    _this.renderHeadingCell = function (date, index) {
      var _this$props3 = _this.props,
          renderHeader = _this$props3.renderHeader,
          getNow = _this$props3.getNow,
          localizer = _this$props3.localizer;
      return renderHeader({
        date: date,
        key: "header_" + index,
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
        className: className
      }, /*#__PURE__*/React.createElement("div", {
        className: clsx('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable')
      }, renderHeader && /*#__PURE__*/React.createElement("div", {
        className: "rbc-row",
        ref: _this.createHeadingRef
      }, range.map(_this.renderHeadingCell)), /*#__PURE__*/React.createElement("div", {
        className: "rbc-row",
        ref: _this.createEventRef
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-row-segment"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-event"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-event-content"
      }, "\xA0"))))));
    };

    _this.slotMetrics = getSlotMetrics();
    return _this;
  }

  var _proto = DateContentRow.prototype;

  _proto.getRowLimit = function getRowLimit() {
    var eventHeight = getHeight(this.eventRow);
    var headingHeight = this.headingRow ? getHeight(this.headingRow) : 0;
    var eventSpace = getHeight(findDOMNode(this)) - headingHeight;
    return Math.max(Math.floor(eventSpace / eventHeight), 1);
  };

  _proto.render = function render() {
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
      role: "rowgroup"
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
      ref: this.createHeadingRef
    }, range.map(this.renderHeadingCell)), /*#__PURE__*/React.createElement(ScrollableWeekComponent, null, /*#__PURE__*/React.createElement(WeekWrapper, _extends({
      isAllDay: isAllDay
    }, eventRowProps), levels.map(function (segs, idx) {
      return /*#__PURE__*/React.createElement(EventRow, _extends({
        key: idx,
        segments: segs
      }, eventRowProps));
    }), !!extra.length && /*#__PURE__*/React.createElement(EventEndingRow, _extends({
      segments: extra,
      onShowMore: this.handleShowMore
    }, eventRowProps))))));
  };

  return DateContentRow;
}(React.Component);

DateContentRow.propTypes = process.env.NODE_ENV !== "production" ? {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  range: PropTypes.array.isRequired,
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  resourceId: PropTypes.any,
  renderForMeasure: PropTypes.bool,
  renderHeader: PropTypes.func,
  container: PropTypes.func,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,
  onShowMore: PropTypes.func,
  showAllEvents: PropTypes.bool,
  onSelectSlot: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  dayPropGetter: PropTypes.func,
  getNow: PropTypes.func.isRequired,
  isAllDay: PropTypes.bool,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired
} : {};
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

Header.propTypes = process.env.NODE_ENV !== "production" ? {
  label: PropTypes.node
} : {};

var DateHeader = function DateHeader(_ref) {
  var label = _ref.label,
      drilldownView = _ref.drilldownView,
      onDrillDown = _ref.onDrillDown;

  if (!drilldownView) {
    return /*#__PURE__*/React.createElement("span", null, label);
  }

  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onDrillDown,
    role: "cell"
  }, label);
};

DateHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drilldownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool
} : {};

var _excluded$1 = ["date", "className"];

var eventsForWeek = function eventsForWeek(evts, start, end, accessors, localizer) {
  return evts.filter(function (e) {
    return inRange(e, start, end, accessors, localizer);
  });
};

var MonthView = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MonthView, _React$Component);

  function MonthView() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

    _this.getContainer = function () {
      return findDOMNode(_assertThisInitialized(_this));
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
          rowLimit = _this$state.rowLimit; // let's not mutate props

      var weeksEvents = eventsForWeek([].concat(events), week[0], week[week.length - 1], accessors, localizer);
      weeksEvents.sort(function (a, b) {
        return sortEvents$1(a, b, accessors, localizer);
      });
      return /*#__PURE__*/React.createElement(DateContentRow, {
        key: weekIdx,
        ref: weekIdx === 0 ? _this.slotRowRef : undefined,
        container: _this.getContainer,
        className: "rbc-month-row",
        getNow: getNow,
        date: date,
        range: week,
        events: weeksEvents,
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
          props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

      var _this$props2 = _this.props,
          currentDate = _this$props2.date,
          getDrilldownView = _this$props2.getDrilldownView,
          localizer = _this$props2.localizer;
      var isOffRange = localizer.neq(date, currentDate, 'month');
      var isCurrent = localizer.isSameDate(date, currentDate);
      var drilldownView = getDrilldownView(date);
      var label = localizer.format(date, 'dateFormat');
      var DateHeaderComponent = _this.props.components.dateHeader || DateHeader;
      return /*#__PURE__*/React.createElement("div", _extends({}, props, {
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
          doShowMoreDrillDown = _this$props3.doShowMoreDrillDown; //cancel any pending selections so only the event click goes through.

      _this.clearSelection();

      if (popup) {
        var position = getPosition(cell, findDOMNode(_assertThisInitialized(_this)));

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

    _this._bgRows = [];
    _this._pendingSelection = [];
    _this.slotRowRef = /*#__PURE__*/React.createRef();
    _this.state = {
      rowLimit: 5,
      needLimitMeasure: true
    };
    return _this;
  }

  var _proto = MonthView.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(_ref2) {
    var date = _ref2.date;
    var _this$props4 = this.props,
        propsDate = _this$props4.date,
        localizer = _this$props4.localizer;
    this.setState({
      needLimitMeasure: localizer.neq(date, propsDate, 'month')
    });
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var running;
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
    window.addEventListener('resize', this._resizeListener = function () {
      if (!running) {
        request(function () {
          running = false;

          _this2.setState({
            needLimitMeasure: true
          }); //eslint-disable-line

        });
      }
    }, false);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        date = _this$props5.date,
        localizer = _this$props5.localizer,
        className = _this$props5.className,
        month = localizer.visibleDays(date, localizer),
        weeks = chunk(month, 7);
    this._weekCount = weeks.length;
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('rbc-month-view', className),
      role: "table",
      "aria-label": "Month View"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rbc-row rbc-month-header",
      role: "row"
    }, this.renderHeaders(weeks[0])), weeks.map(this.renderWeek), this.props.popup && this.renderOverlay());
  };

  _proto.renderHeaders = function renderHeaders(row) {
    var _this$props6 = this.props,
        localizer = _this$props6.localizer,
        components = _this$props6.components;
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
  };

  _proto.renderOverlay = function renderOverlay() {
    var _this3 = this;

    var overlay = this.state && this.state.overlay || {};
    var _this$props7 = this.props,
        accessors = _this$props7.accessors,
        localizer = _this$props7.localizer,
        components = _this$props7.components,
        getters = _this$props7.getters,
        selected = _this$props7.selected,
        popupOffset = _this$props7.popupOffset;
    return /*#__PURE__*/React.createElement(Overlay, {
      rootClose: true,
      placement: "bottom",
      show: !!overlay.position,
      onHide: function onHide() {
        return _this3.setState({
          overlay: null
        });
      },
      target: function target() {
        return overlay.target;
      }
    }, function (_ref3) {
      var props = _ref3.props;
      return /*#__PURE__*/React.createElement(Popup$1, _extends({}, props, {
        popupOffset: popupOffset,
        accessors: accessors,
        getters: getters,
        selected: selected,
        components: components,
        localizer: localizer,
        position: overlay.position,
        show: _this3.overlayDisplay,
        events: overlay.events,
        slotStart: overlay.date,
        slotEnd: overlay.end,
        onSelect: _this3.handleSelectEvent,
        onDoubleClick: _this3.handleDoubleClickEvent,
        onKeyPress: _this3.handleKeyPressEvent,
        handleDragStart: _this3.props.handleDragStart
      }));
    });
  };

  _proto.measureRowLimit = function measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.slotRowRef.current.getRowLimit()
    });
  };

  _proto.selectDates = function selectDates(slotInfo) {
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
  };

  _proto.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  };

  return MonthView;
}(React.Component);

MonthView.propTypes = process.env.NODE_ENV !== "production" ? {
  events: PropTypes.array.isRequired,
  date: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  step: PropTypes.number,
  getNow: PropTypes.func.isRequired,
  scrollToTime: PropTypes.instanceOf(Date),
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,
  onNavigate: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  showAllEvents: PropTypes.bool,
  doShowMoreDrillDown: PropTypes.bool,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  popup: PropTypes.bool,
  handleDragStart: PropTypes.func,
  popupOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })])
} : {};

MonthView.range = function (date, _ref4) {
  var localizer = _ref4.localizer;
  var start = localizer.firstVisibleDay(date, localizer);
  var end = localizer.lastVisibleDay(date, localizer);
  return {
    start: start,
    end: end
  };
};

MonthView.navigate = function (date, action, _ref5) {
  var localizer = _ref5.localizer;

  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'month');

    case navigate.NEXT:
      return localizer.add(date, 1, 'month');

    default:
      return date;
  }
};

MonthView.title = function (date, _ref6) {
  var localizer = _ref6.localizer;
  return localizer.format(date, 'monthHeaderFormat');
};

var getKey = function getKey(_ref) {
  var min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      slots = _ref.slots,
      localizer = _ref.localizer;
  return "" + +localizer.startOf(min, 'minutes') + ("" + +localizer.startOf(max, 'minutes')) + (step + "-" + slots);
};

function getSlotMetrics$1(_ref2) {
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
  }); // DST differences are handled inside the localizer

  var totalMin = 1 + localizer.getTotalMin(start, end);
  var minutesFromMidnight = localizer.getMinutesFromMidnight(start);
  var numGroups = Math.ceil((totalMin - 1) / (step * timeslots));
  var numSlots = numGroups * timeslots;
  var groups = new Array(numGroups);
  var slots = new Array(numSlots); // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities

  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots);

    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot;
      var minFromStart = slotIdx * step; // A date with total minutes calculated from the start of the day

      slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(start, minutesFromMidnight, minFromStart);
    }
  } // Necessary to be able to select up until the last timeslot in a day


  var lastSlotMinFromStart = slots.length * step;
  slots.push(localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart));

  function positionFromDate(date) {
    var diff = localizer.getTotalMin(start, date);
    return Math.min(diff, totalMin);
  }

  return {
    groups: groups,
    update: function update(args) {
      if (getKey(args) !== key) return getSlotMetrics$1(args);
      return this;
    },
    dateIsInGroup: function dateIsInGroup(date, groupIndex) {
      var nextGroup = groups[groupIndex + 1];
      return localizer.inRange(date, groups[groupIndex][0], nextGroup ? nextGroup[0] : end, 'minutes');
    },
    nextSlot: function nextSlot(slot) {
      var next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)]; // in the case of the last slot we won't a long enough range so manually get it

      if (next === slot) next = localizer.add(slot, step, 'minutes');
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
    closestSlotFromDate: function closestSlotFromDate(date, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      if (localizer.lt(date, start, 'minutes')) return slots[0];
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


  _createClass(Event, [{
    key: "_width",
    get: function get() {
      // The container event's width is determined by the maximum number of
      // events in any of its rows.
      if (this.rows) {
        var columns = this.rows.reduce(function (max, row) {
          return Math.max(max, row.leaves.length + 1);
        }, // add itself
        0) + 1; // add the container

        return 100 / columns;
      }

      var availableWidth = 100 - this.container._width; // The row event's width is the space left by the container, divided
      // among itself and its leaves.

      if (this.leaves) {
        return availableWidth / (this.leaves.length + 1);
      } // The leaf event's width is determined by its row's width


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
      var overlap = Math.min(100, this._width * 1.7); // Containers can always grow.

      if (this.rows) {
        return overlap;
      } // Rows can grow if they have leaves.


      if (this.leaves) {
        return this.leaves.length > 0 ? overlap : noOverlap;
      } // Leaves can grow unless they're the last item in a row.


      var leaves = this.row.leaves;
      var index = leaves.indexOf(this);
      return index === leaves.length - 1 ? noOverlap : overlap;
    }
  }, {
    key: "xOffset",
    get: function get() {
      // Containers have no offset.
      if (this.rows) return 0; // Rows always start where their container ends.

      if (this.leaves) return this.container._width; // Leaves are spread out evenly on the space left by its row.

      var _this$row = this.row,
          leaves = _this$row.leaves,
          xOffset = _this$row.xOffset,
          _width = _this$row._width;
      var index = leaves.indexOf(this) + 1;
      return xOffset + index * _width;
    }
  }]);

  return Event;
}();
/**
 * Return true if event a and b is considered to be on the same row.
 */


function onSameRow(a, b, minimumStartDifference) {
  return (// Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference || b.start > a.start && b.start < a.end
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
      var test = sortedByTime[i]; // Still inside this event, look for next.

      if (event.endMs > test.startMs) continue; // We've found the first event of the next event group.
      // If that event is not right next to our current event, we have to
      // move it here.

      if (i > 0) {
        var _event = sortedByTime.splice(i, 1)[0];
        sorted.push(_event);
      } // We've already found the next event group, so stop looking.


      break;
    }
  }

  return sorted;
}

function getStyledEvents(_ref2) {
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
  var eventsInRenderOrder = sortByRender(proxies); // Group overlapping events, while keeping order.
  // Every event is always one of: container, row or leaf.
  // Containers can contain rows, and rows can contain leaves.

  var containerEvents = [];

  var _loop = function _loop(i) {
    var event = eventsInRenderOrder[i]; // Check if this event can go into a container event.

    var container = containerEvents.find(function (c) {
      return c.end > event.start || Math.abs(event.start - c.start) < minimumStartDifference;
    }); // Couldn't find a container — that means this event is a container.

    if (!container) {
      event.rows = [];
      containerEvents.push(event);
      return "continue";
    } // Found a container for the event.


    event.container = container; // Check if the event can be placed in an existing row.
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
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  } // Return the original events, along with their styles.


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
    maxIdx = maxIdx > node.friends[i].idx ? maxIdx : node.friends[i].idx; // TODO : trace it by not object but kinda index or something for performance

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
  var styledEvents = getStyledEvents({
    events: events,
    minimumStartDifference: minimumStartDifference,
    slotMetrics: slotMetrics,
    accessors: accessors
  });
  styledEvents.sort(function (a, b) {
    a = a.style;
    b = b.style;
    if (a.top !== b.top) return a.top > b.top ? 1 : -1;else return a.top + a.height < b.top + b.height ? 1 : -1;
  });

  for (var i = 0; i < styledEvents.length; ++i) {
    styledEvents[i].friends = [];
    delete styledEvents[i].style.left;
    delete styledEvents[i].style.left;
    delete styledEvents[i].idx;
    delete styledEvents[i].size;
  }

  for (var _i = 0; _i < styledEvents.length - 1; ++_i) {
    var se1 = styledEvents[_i];
    var y1 = se1.style.top;
    var y2 = se1.style.top + se1.style.height;

    for (var j = _i + 1; j < styledEvents.length; ++j) {
      var se2 = styledEvents[j];
      var y3 = se2.style.top;
      var y4 = se2.style.top + se2.style.height; // be friends when overlapped

      if (y3 <= y1 && y1 < y4 || y1 <= y3 && y3 < y2) {
        // TODO : hashmap would be effective for performance
        se1.friends.push(se2);
        se2.friends.push(se1);
      }
    }
  }

  for (var _i2 = 0; _i2 < styledEvents.length; ++_i2) {
    var se = styledEvents[_i2];
    var bitmap = [];

    for (var _j = 0; _j < 100; ++_j) {
      bitmap.push(1);
    } // 1 means available


    for (var _j2 = 0; _j2 < se.friends.length; ++_j2) {
      if (se.friends[_j2].idx !== undefined) bitmap[se.friends[_j2].idx] = 0;
    } // 0 means reserved


    se.idx = bitmap.indexOf(1);
  }

  for (var _i3 = 0; _i3 < styledEvents.length; ++_i3) {
    var size = 0;
    if (styledEvents[_i3].size) continue;
    var allFriends = [];
    var maxIdx = getMaxIdxDFS(styledEvents[_i3], 0, allFriends);
    size = 100 / (maxIdx + 1);
    styledEvents[_i3].size = size;

    for (var _j3 = 0; _j3 < allFriends.length; ++_j3) {
      allFriends[_j3].size = size;
    }
  }

  for (var _i4 = 0; _i4 < styledEvents.length; ++_i4) {
    var e = styledEvents[_i4];
    e.style.left = e.idx * e.size; // stretch to maximum

    var _maxIdx = 0;

    for (var _j4 = 0; _j4 < e.friends.length; ++_j4) {
      var idx = e.friends[_j4];
      _maxIdx = _maxIdx > idx ? _maxIdx : idx;
    }

    if (_maxIdx <= e.idx) e.size = 100 - e.idx * e.size; // padding between events
    // for this feature, `width` is not percentage based unit anymore
    // it will be used with calc()

    var padding = e.idx === 0 ? 0 : 3;
    e.style.width = "calc(" + e.size + "% - " + padding + "px)";
    e.style.height = "calc(" + e.style.height + "% - 2px)";
    e.style.xOffset = "calc(" + e.style.left + "% + " + padding + "px)";
  }

  return styledEvents;
}

/*eslint no-unused-vars: "off"*/
var DefaultAlgorithms = {
  overlap: getStyledEvents,
  'no-overlap': noOverlap
};

function isFunction(a) {
  return !!(a && a.constructor && a.call && a.apply);
} //


function getStyledEvents$1(_ref) {
  var events = _ref.events,
      minimumStartDifference = _ref.minimumStartDifference,
      slotMetrics = _ref.slotMetrics,
      accessors = _ref.accessors,
      dayLayoutAlgorithm = _ref.dayLayoutAlgorithm;
  var algorithm = dayLayoutAlgorithm;
  if (dayLayoutAlgorithm in DefaultAlgorithms) algorithm = DefaultAlgorithms[dayLayoutAlgorithm];

  if (!isFunction(algorithm)) {
    // invalid algorithm
    return [];
  }

  return algorithm.apply(this, arguments);
}

var TimeSlotGroup = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TimeSlotGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        renderSlot = _this$props.renderSlot,
        resource = _this$props.resource,
        group = _this$props.group,
        getters = _this$props.getters,
        _this$props$component = _this$props.components;
    _this$props$component = _this$props$component === void 0 ? {} : _this$props$component;
    var _this$props$component2 = _this$props$component.timeSlotWrapper,
        Wrapper = _this$props$component2 === void 0 ? NoopWrapper : _this$props$component2;
    var groupProps = getters ? getters.slotGroupProp() : {};
    return /*#__PURE__*/React.createElement("div", _extends({
      className: "rbc-timeslot-group"
    }, groupProps), group.map(function (value, idx) {
      var slotProps = getters ? getters.slotProp(value, resource) : {};
      return /*#__PURE__*/React.createElement(Wrapper, {
        key: idx,
        value: value,
        resource: resource
      }, /*#__PURE__*/React.createElement("div", _extends({}, slotProps, {
        className: clsx('rbc-time-slot', slotProps.className)
      }), renderSlot && renderSlot(value, idx)));
    }));
  };

  return TimeSlotGroup;
}(Component);
TimeSlotGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object
} : {};

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%';
}
/* eslint-disable react/prop-types */


function TimeGridEvent(props) {
  var _extends2, _extends3;

  var style = props.style,
      className = props.className,
      event = props.event,
      accessors = props.accessors,
      rtl = props.rtl,
      selected = props.selected,
      label = props.label,
      continuesEarlier = props.continuesEarlier,
      continuesLater = props.continuesLater,
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
  var height = style.height,
      top = style.top,
      width = style.width,
      xOffset = style.xOffset;
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
  var eventStyle = isBackgroundEvent ? _extends({}, userProps.style, (_extends2 = {
    top: stringifyPercent(top),
    height: stringifyPercent(height),
    // Adding 10px to take events container right margin into account
    width: "calc(" + width + " + 10px)"
  }, _extends2[rtl ? 'right' : 'left'] = stringifyPercent(Math.max(0, xOffset)), _extends2)) : _extends({}, userProps.style, (_extends3 = {
    top: stringifyPercent(top),
    width: stringifyPercent(width),
    height: stringifyPercent(height)
  }, _extends3[rtl ? 'right' : 'left'] = stringifyPercent(xOffset), _extends3));
  return /*#__PURE__*/React.createElement(EventWrapper, _extends({
    type: "time"
  }, props), /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    style: eventStyle,
    onKeyPress: onKeyPress,
    title: tooltip ? (typeof label === 'string' ? label + ': ' : '') + tooltip : undefined,
    className: clsx(isBackgroundEvent ? 'rbc-background-event' : 'rbc-event', className, userProps.className, {
      'rbc-selected': selected,
      'rbc-event-continues-earlier': continuesEarlier,
      'rbc-event-continues-later': continuesLater
    })
  }, inner));
}

var DayColumnWrapper = function DayColumnWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children);
};

var _excluded$2 = ["dayProp"],
    _excluded2 = ["eventContainerWrapper"];

var DayColumn = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DayColumn, _React$Component);

  function DayColumn() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
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

      var _assertThisInitialize = _assertThisInitialized(_this),
          slotMetrics = _assertThisInitialize.slotMetrics;

      var messages = localizer.messages;
      var styledEvents = getStyledEvents$1({
        events: events,
        accessors: accessors,
        slotMetrics: slotMetrics,
        minimumStartDifference: Math.ceil(step * timeslots / 2),
        dayLayoutAlgorithm: dayLayoutAlgorithm
      });
      return styledEvents.map(function (_ref2, idx) {
        var event = _ref2.event,
            style = _ref2.style;
        var end = accessors.end(event);
        var start = accessors.start(event);
        var format = 'eventTimeRangeFormat';
        var label;
        var startsBeforeDay = slotMetrics.startsBeforeDay(start);
        var startsAfterDay = slotMetrics.startsAfterDay(end);
        if (startsBeforeDay) format = 'eventTimeRangeEndFormat';else if (startsAfterDay) format = 'eventTimeRangeStartFormat';
        if (startsBeforeDay && startsAfterDay) label = messages.allDay;else label = localizer.format({
          start: start,
          end: end
        }, format);
        var continuesEarlier = startsBeforeDay || slotMetrics.startsBefore(start);
        var continuesLater = startsAfterDay || slotMetrics.startsAfter(end);
        return /*#__PURE__*/React.createElement(TimeGridEvent, {
          style: style,
          event: event,
          label: label,
          key: 'evt_' + idx,
          getters: getters,
          rtl: rtl,
          components: components,
          continuesEarlier: continuesEarlier,
          continuesLater: continuesLater,
          accessors: accessors,
          selected: isSelected(event, selected),
          onClick: function onClick(e) {
            return _this._select(event, e);
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
      var node = findDOMNode(_assertThisInitialized(_this));
      var _this$props2 = _this.props,
          longPressThreshold = _this$props2.longPressThreshold,
          localizer = _this$props2.localizer;
      var selector = _this._selector = new Selection(function () {
        return findDOMNode(_assertThisInitialized(_this));
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

        return _extends({}, selectRange, {
          selecting: true,
          top: selectRange.top + "%",
          height: selectRange.height + "%"
        });
      };

      var selectorClicksHandler = function selectorClicksHandler(box, actionType) {
        if (!isEvent(findDOMNode(_assertThisInitialized(_this)), box)) {
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
        return !isEvent(findDOMNode(_assertThisInitialized(_this)), box);
      });
      selector.on('click', function (box) {
        return selectorClicksHandler(box, 'click');
      });
      selector.on('doubleClick', function (box) {
        return selectorClicksHandler(box, 'doubleClick');
      });
      selector.on('select', function (bounds) {
        if (_this.state.selecting) {
          _this._selectSlot(_extends({}, _this.state, {
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

    _this.slotMetrics = getSlotMetrics$1(_this.props);
    return _this;
  }

  var _proto = DayColumn.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable();

    if (this.props.isNow) {
      this.setTimeIndicatorPositionUpdateInterval();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();

    this.clearTimeIndicatorInterval();
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
    this.slotMetrics = this.slotMetrics.update(nextProps);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
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
  ;

  _proto.setTimeIndicatorPositionUpdateInterval = function setTimeIndicatorPositionUpdateInterval(tail) {
    var _this2 = this;

    if (tail === void 0) {
      tail = false;
    }

    if (!this.intervalTriggered && !tail) {
      this.positionTimeIndicator();
    }

    this._timeIndicatorTimeout = window.setTimeout(function () {
      _this2.intervalTriggered = true;

      _this2.positionTimeIndicator();

      _this2.setTimeIndicatorPositionUpdateInterval();
    }, 60000);
  };

  _proto.clearTimeIndicatorInterval = function clearTimeIndicatorInterval() {
    this.intervalTriggered = false;
    window.clearTimeout(this._timeIndicatorTimeout);
  };

  _proto.positionTimeIndicator = function positionTimeIndicator() {
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
  };

  _proto.render = function render() {
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
        getters = _objectWithoutPropertiesLoose(_this$props5$getters, _excluded$2),
        _this$props5$componen = _this$props5.components,
        EventContainer = _this$props5$componen.eventContainerWrapper,
        components = _objectWithoutPropertiesLoose(_this$props5$componen, _excluded2);

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

    var _dayProp = dayProp(max),
        className = _dayProp.className,
        style = _dayProp.style;

    var DayColumnWrapperComponent = components.dayColumnWrapper || DayColumnWrapper;
    return /*#__PURE__*/React.createElement(DayColumnWrapperComponent, {
      date: date,
      style: style,
      className: clsx(className, 'rbc-day-slot', 'rbc-time-column', isNow && 'rbc-now', isNow && 'rbc-today', // WHY
      selecting && 'rbc-slot-selecting')
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
    }, /*#__PURE__*/React.createElement("span", null, localizer.format(selectDates, 'selectRangeFormat'))), isNow && this.intervalTriggered && /*#__PURE__*/React.createElement("div", {
      className: "rbc-current-time-indicator",
      style: {
        top: this.state.timeIndicatorPosition + "%"
      }
    }));
  };

  return DayColumn;
}(React.Component);

DayColumn.propTypes = process.env.NODE_ENV !== "production" ? {
  events: PropTypes.array.isRequired,
  backgroundEvents: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,
  isNow: PropTypes.bool,
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  showMultiDayTimes: PropTypes.bool,
  culture: PropTypes.string,
  timeslots: PropTypes.number,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  eventOffset: PropTypes.number,
  longPressThreshold: PropTypes.number,
  onSelecting: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onDoubleClickEvent: PropTypes.func.isRequired,
  onKeyPressEvent: PropTypes.func,
  className: PropTypes.string,
  dragThroughEvents: PropTypes.bool,
  resource: PropTypes.any,
  dayLayoutAlgorithm: DayLayoutAlgorithmPropType
} : {};
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2
};

var TimeGutter = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TimeGutter, _Component);

  function TimeGutter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.renderSlot = function (value, idx) {
      if (idx !== 0) return null;
      var _this$props = _this.props,
          localizer = _this$props.localizer,
          getNow = _this$props.getNow;

      var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx);

      return /*#__PURE__*/React.createElement("span", {
        className: clsx('rbc-label', isNow && 'rbc-now')
      }, localizer.format(value, 'timeGutterFormat'));
    };

    var _this$props2 = _this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        timeslots = _this$props2.timeslots,
        step = _this$props2.step,
        _localizer = _this$props2.localizer;
    _this.slotMetrics = getSlotMetrics$1({
      min: min,
      max: max,
      timeslots: timeslots,
      step: step,
      localizer: _localizer
    });
    return _this;
  }

  var _proto = TimeGutter.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    this.slotMetrics = this.slotMetrics.update(nextProps);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        resource = _this$props3.resource,
        components = _this$props3.components,
        getters = _this$props3.getters;
    return /*#__PURE__*/React.createElement("div", {
      className: "rbc-time-gutter rbc-time-column"
    }, this.slotMetrics.groups.map(function (grp, idx) {
      return /*#__PURE__*/React.createElement(TimeSlotGroup, {
        key: idx,
        group: grp,
        resource: resource,
        components: components,
        renderSlot: _this2.renderSlot,
        getters: getters
      });
    }));
  };

  return TimeGutter;
}(Component);
TimeGutter.propTypes = process.env.NODE_ENV !== "production" ? {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  timeslots: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  getNow: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object,
  localizer: PropTypes.object.isRequired,
  resource: PropTypes.string
} : {};

var ResourceHeader = function ResourceHeader(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/React.createElement(React.Fragment, null, label);
};

ResourceHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  label: PropTypes.node,
  index: PropTypes.number,
  resource: PropTypes.object
} : {};

var TimeGridHeader = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TimeGridHeader, _React$Component);

  function TimeGridHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

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
        minRows: 2,
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
        onDoubleClick: _this.props.onDoubleClickEvent,
        onKeyPress: _this.props.onKeyPressEvent,
        onSelectSlot: _this.props.onSelectSlot,
        longPressThreshold: _this.props.longPressThreshold,
        resizable: resizable
      });
    };

    return _this;
  }

  var _proto = TimeGridHeader.prototype;

  _proto.renderHeaderCells = function renderHeaderCells(range) {
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
      }, drilldownView ? /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          return _this2.handleHeaderClick(date, drilldownView, e);
        }
      }, header) : /*#__PURE__*/React.createElement("span", null, header));
    });
  };

  _proto.render = function render() {
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
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + "px";
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
      var id = _ref[0],
          resource = _ref[1];
      return /*#__PURE__*/React.createElement("div", {
        className: "rbc-time-header-content",
        key: id || idx
      }, resource && /*#__PURE__*/React.createElement("div", {
        className: "rbc-row rbc-row-resource",
        key: "resource_" + idx
      }, /*#__PURE__*/React.createElement("div", {
        className: "rbc-header"
      }, /*#__PURE__*/React.createElement(ResourceHeaderComponent, {
        index: idx,
        label: accessors.resourceTitle(resource),
        resource: resource
      }))), /*#__PURE__*/React.createElement("div", {
        className: "rbc-row rbc-time-header-cell" + (range.length <= 1 ? ' rbc-time-header-cell-single-day' : '')
      }, _this3.renderHeaderCells(range)), /*#__PURE__*/React.createElement(DateContentRow, {
        isAllDay: true,
        rtl: rtl,
        getNow: getNow,
        minRows: 2,
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
        onDoubleClick: _this3.props.onDoubleClickEvent,
        onKeyPress: _this3.props.onKeyPressEvent,
        onSelectSlot: _this3.props.onSelectSlot,
        longPressThreshold: _this3.props.longPressThreshold,
        resizable: resizable
      }));
    }));
  };

  return TimeGridHeader;
}(React.Component);

TimeGridHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,
  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,
  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any
} : {};

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
        var resourceEvents = eventsByResource.get(id) || [];
        resourceEvents.push(event);
        eventsByResource.set(id, resourceEvents);
      });
      return eventsByResource;
    }
  };
}

var TimeGrid = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TimeGrid, _Component);

  function TimeGrid(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.handleScroll = function (e) {
      if (_this.scrollRef.current) {
        _this.scrollRef.current.scrollLeft = e.target.scrollLeft;
      }
    };

    _this.handleResize = function () {
      cancel(_this.rafHandle);
      _this.rafHandle = request(_this.checkOverflow);
    };

    _this.gutterRef = function (ref) {
      _this.gutter = ref && findDOMNode(ref);
    };

    _this.handleSelectAlldayEvent = function () {
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      notify(_this.props.onSelectEvent, args);
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

    _this.checkOverflow = function () {
      if (_this._updatingOverflow) return;
      var content = _this.contentRef.current;
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
    _this._scrollRatio = null;
    return _this;
  }

  var _proto = TimeGrid.prototype;

  _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    this.calculateScroll();
  };

  _proto.componentDidMount = function componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter();
    }

    this.applyScroll();
    window.addEventListener('resize', this.handleResize);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    cancel(this.rafHandle);

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter();
    }

    this.applyScroll(); //this.checkOverflow()
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var _this$props = this.props,
        range = _this$props.range,
        scrollToTime = _this$props.scrollToTime,
        localizer = _this$props.localizer; // When paginating, reset scroll

    if (localizer.neq(nextProps.range[0], range[0], 'minutes') || localizer.neq(nextProps.scrollToTime, scrollToTime, 'minutes')) {
      this.calculateScroll(nextProps);
    }
  };

  _proto.renderEvents = function renderEvents(range, events, backgroundEvents, now) {
    var _this2 = this;

    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        components = _this$props2.components,
        accessors = _this$props2.accessors,
        localizer = _this$props2.localizer,
        dayLayoutAlgorithm = _this$props2.dayLayoutAlgorithm;
    var resources = this.memoizedResources(this.props.resources, accessors);
    var groupedEvents = resources.groupEvents(events);
    var groupedBackgroundEvents = resources.groupEvents(backgroundEvents);
    return resources.map(function (_ref, i) {
      var id = _ref[0],
          resource = _ref[1];
      return range.map(function (date, jj) {
        var daysEvents = (groupedEvents.get(id) || []).filter(function (event) {
          return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
        });
        var daysBackgroundEvents = (groupedBackgroundEvents.get(id) || []).filter(function (event) {
          return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
        });
        return /*#__PURE__*/React.createElement(DayColumn, _extends({}, _this2.props, {
          localizer: localizer,
          min: localizer.merge(date, min),
          max: localizer.merge(date, max),
          resource: resource && id,
          components: components,
          isNow: localizer.isSameDate(date, now),
          key: i + '-' + jj,
          date: date,
          events: daysEvents,
          backgroundEvents: daysBackgroundEvents,
          dayLayoutAlgorithm: dayLayoutAlgorithm
        }));
      });
    });
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        events = _this$props3.events,
        backgroundEvents = _this$props3.backgroundEvents,
        range = _this$props3.range,
        width = _this$props3.width,
        rtl = _this$props3.rtl,
        selected = _this$props3.selected,
        getNow = _this$props3.getNow,
        resources = _this$props3.resources,
        components = _this$props3.components,
        accessors = _this$props3.accessors,
        getters = _this$props3.getters,
        localizer = _this$props3.localizer,
        min = _this$props3.min,
        max = _this$props3.max,
        showMultiDayTimes = _this$props3.showMultiDayTimes,
        longPressThreshold = _this$props3.longPressThreshold,
        resizable = _this$props3.resizable;
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
      return sortEvents$1(a, b, accessors, localizer);
    });
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('rbc-time-view', resources && 'rbc-time-view-resources')
    }, /*#__PURE__*/React.createElement(TimeGridHeader, {
      range: range,
      events: allDayEvents,
      width: width,
      rtl: rtl,
      getNow: getNow,
      localizer: localizer,
      selected: selected,
      resources: this.memoizedResources(resources, accessors),
      selectable: this.props.selectable,
      accessors: accessors,
      getters: getters,
      components: components,
      scrollRef: this.scrollRef,
      isOverflowing: this.state.isOverflowing,
      longPressThreshold: longPressThreshold,
      onSelectSlot: this.handleSelectAllDaySlot,
      onSelectEvent: this.handleSelectAlldayEvent,
      onDoubleClickEvent: this.props.onDoubleClickEvent,
      onKeyPressEvent: this.props.onKeyPressEvent,
      onDrillDown: this.props.onDrillDown,
      getDrilldownView: this.props.getDrilldownView,
      resizable: resizable
    }), /*#__PURE__*/React.createElement("div", {
      ref: this.contentRef,
      className: "rbc-time-content",
      onScroll: this.handleScroll
    }, /*#__PURE__*/React.createElement(TimeGutter, {
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
  };

  _proto.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  };

  _proto.measureGutter = function measureGutter() {
    var _this3 = this;

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
    }

    this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function () {
      var width = getWidth(_this3.gutter);

      if (width && _this3.state.gutterWidth !== width) {
        _this3.setState({
          gutterWidth: width
        });
      }
    });
  };

  _proto.applyScroll = function applyScroll() {
    if (this._scrollRatio != null) {
      var content = this.contentRef.current;
      content.scrollTop = content.scrollHeight * this._scrollRatio; // Only do this once

      this._scrollRatio = null;
    }
  };

  _proto.calculateScroll = function calculateScroll(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        min = _props.min,
        max = _props.max,
        scrollToTime = _props.scrollToTime,
        localizer = _props.localizer;
    var diffMillis = scrollToTime - localizer.startOf(scrollToTime, 'day');
    var totalMillis = localizer.diff(min, max, 'milliseconds');
    this._scrollRatio = diffMillis / totalMillis;
  };

  return TimeGrid;
}(Component);
TimeGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  events: PropTypes.array.isRequired,
  backgroundEvents: PropTypes.array.isRequired,
  resources: PropTypes.array,
  step: PropTypes.number,
  timeslots: PropTypes.number,
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,
  scrollToTime: PropTypes.instanceOf(Date).isRequired,
  showMultiDayTimes: PropTypes.bool,
  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,
  onNavigate: PropTypes.func,
  onSelectSlot: PropTypes.func,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  dayLayoutAlgorithm: DayLayoutAlgorithmPropType
} : {};
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2
};

var _excluded$3 = ["date", "localizer", "min", "max", "scrollToTime"];

var Day = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Day, _React$Component);

  function Day() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Day.prototype;

  _proto.render = function render() {
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
        props = _objectWithoutPropertiesLoose(_this$props, _excluded$3);

    var range = Day.range(date, {
      localizer: localizer
    });
    return /*#__PURE__*/React.createElement(TimeGrid, _extends({}, props, {
      range: range,
      eventOffset: 10,
      localizer: localizer,
      min: min,
      max: max,
      scrollToTime: scrollToTime
    }));
  };

  return Day;
}(React.Component);

Day.propTypes = process.env.NODE_ENV !== "production" ? {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date)
} : {};

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

var _excluded$4 = ["date", "localizer", "min", "max", "scrollToTime"];

var Week = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Week, _React$Component);

  function Week() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Week.prototype;

  _proto.render = function render() {
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
        props = _objectWithoutPropertiesLoose(_this$props, _excluded$4);

    var range = Week.range(date, this.props);
    return /*#__PURE__*/React.createElement(TimeGrid, _extends({}, props, {
      range: range,
      eventOffset: 15,
      localizer: localizer,
      min: min,
      max: max,
      scrollToTime: scrollToTime
    }));
  };

  return Week;
}(React.Component);

Week.propTypes = process.env.NODE_ENV !== "production" ? {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date)
} : {};
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
      start = _Week$range[0],
      rest = _Week$range.slice(1);

  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};

var _excluded$5 = ["date", "localizer", "min", "max", "scrollToTime"];

function workWeekRange(date, options) {
  return Week.range(date, options).filter(function (d) {
    return [6, 0].indexOf(d.getDay()) === -1;
  });
}

var WorkWeek = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(WorkWeek, _React$Component);

  function WorkWeek() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = WorkWeek.prototype;

  _proto.render = function render() {
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
        props = _objectWithoutPropertiesLoose(_this$props, _excluded$5);

    var range = workWeekRange(date, this.props);
    return /*#__PURE__*/React.createElement(TimeGrid, _extends({}, props, {
      range: range,
      eventOffset: 15,
      localizer: localizer,
      min: min,
      max: max,
      scrollToTime: scrollToTime
    }));
  };

  return WorkWeek;
}(React.Component);

WorkWeek.propTypes = process.env.NODE_ENV !== "production" ? {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date)
} : {};
WorkWeek.defaultProps = TimeGrid.defaultProps;
WorkWeek.range = workWeekRange;
WorkWeek.navigate = Week.navigate;

WorkWeek.title = function (date, _ref) {
  var localizer = _ref.localizer;

  var _workWeekRange = workWeekRange(date, {
    localizer: localizer
  }),
      start = _workWeekRange[0],
      rest = _workWeekRange.slice(1);

  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};

function Agenda(_ref) {
  var accessors = _ref.accessors,
      components = _ref.components,
      date = _ref.date,
      events = _ref.events,
      getters = _ref.getters,
      length = _ref.length,
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

Agenda.propTypes = process.env.NODE_ENV !== "production" ? {
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array,
  getters: PropTypes.object.isRequired,
  length: PropTypes.number.isRequired,
  localizer: PropTypes.object.isRequired,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  selected: PropTypes.object
} : {};
Agenda.defaultProps = {
  length: 30
};

Agenda.range = function (start, _ref2) {
  var _ref2$length = _ref2.length,
      length = _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length,
      localizer = _ref2.localizer;
  var end = localizer.add(start, length, 'day');
  return {
    start: start,
    end: end
  };
};

Agenda.navigate = function (date, action, _ref3) {
  var _ref3$length = _ref3.length,
      length = _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length,
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
      length = _ref4$length === void 0 ? Agenda.defaultProps.length : _ref4$length,
      localizer = _ref4.localizer;
  var end = localizer.add(start, length, 'day');
  return localizer.format({
    start: start,
    end: end
  }, 'agendaHeaderFormat');
};

var _VIEWS;
var VIEWS = (_VIEWS = {}, _VIEWS[views.MONTH] = MonthView, _VIEWS[views.WEEK] = Week, _VIEWS[views.WORK_WEEK] = WorkWeek, _VIEWS[views.DAY] = Day, _VIEWS[views.AGENDA] = Agenda, _VIEWS);

var _excluded$6 = ["action", "date", "today"];
function moveDate(View, _ref) {
  var action = _ref.action,
      date = _ref.date,
      today = _ref.today,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$6);

  View = typeof View === 'string' ? VIEWS[View] : View;

  switch (action) {
    case navigate.TODAY:
      date = today || new Date();
      break;

    case navigate.DATE:
      break;

    default:
      !(View && typeof View.navigate === 'function') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Calendar View components must implement a static `.navigate(date, action)` method.s') : invariant(false) : void 0;
      date = View.navigate(date, action, props);
  }

  return date;
}

var Toolbar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Toolbar, _React$Component);

  function Toolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.navigate = function (action) {
      _this.props.onNavigate(action);
    };

    _this.view = function (view) {
      _this.props.onView(view);
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.render = function render() {
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
  };

  _proto.viewNamesGroup = function viewNamesGroup(messages) {
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
  };

  return Toolbar;
}(React.Component);

Toolbar.propTypes = process.env.NODE_ENV !== "production" ? {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
} : {};

/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
function accessor$1(data, field) {
  var value = null;
  if (typeof field === 'function') value = field(data);else if (typeof field === 'string' && typeof data === 'object' && data != null && field in data) value = data[field];
  return value;
}
var wrapAccessor = function wrapAccessor(acc) {
  return function (data) {
    return accessor$1(data, acc);
  };
};

var _excluded$7 = ["view", "date", "getNow", "onNavigate"],
    _excluded2$1 = ["view", "toolbar", "events", "backgroundEvents", "style", "className", "elementProps", "date", "getNow", "length", "showMultiDayTimes", "onShowMore", "doShowMoreDrillDown", "components", "formats", "messages", "culture"];

function viewNames$1(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames$1(_views);
  return names.indexOf(view) !== -1;
}

var Calendar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  function Calendar() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

    _this.getViews = function () {
      var views = _this.props.views;

      if (Array.isArray(views)) {
        return transform(views, function (obj, name) {
          return obj[name] = VIEWS[name];
        }, {});
      }

      if (typeof views === 'object') {
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
          props = _objectWithoutPropertiesLoose(_this$props3, _excluded$7);

      var ViewComponent = _this.getView();

      var today = getNow();
      date = moveDate(ViewComponent, _extends({}, props, {
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
      context: _this.getContext(_this.props)
    };
    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      context: this.getContext(nextProps)
    });
  };

  _proto.getContext = function getContext(_ref2) {
    var startAccessor = _ref2.startAccessor,
        endAccessor = _ref2.endAccessor,
        allDayAccessor = _ref2.allDayAccessor,
        tooltipAccessor = _ref2.tooltipAccessor,
        titleAccessor = _ref2.titleAccessor,
        resourceAccessor = _ref2.resourceAccessor,
        resourceIdAccessor = _ref2.resourceIdAccessor,
        resourceTitleAccessor = _ref2.resourceTitleAccessor,
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
    var names = viewNames$1(views);
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
        timeSlotWrapper: NoopWrapper
      }),
      accessors: {
        start: wrapAccessor(startAccessor),
        end: wrapAccessor(endAccessor),
        allDay: wrapAccessor(allDayAccessor),
        tooltip: wrapAccessor(tooltipAccessor),
        title: wrapAccessor(titleAccessor),
        resource: wrapAccessor(resourceAccessor),
        resourceId: wrapAccessor(resourceIdAccessor),
        resourceTitle: wrapAccessor(resourceTitleAccessor)
      }
    };
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        view = _this$props4.view,
        toolbar = _this$props4.toolbar,
        events = _this$props4.events,
        _this$props4$backgrou = _this$props4.backgroundEvents,
        backgroundEvents = _this$props4$backgrou === void 0 ? [] : _this$props4$backgrou,
        style = _this$props4.style,
        className = _this$props4.className,
        elementProps = _this$props4.elementProps,
        current = _this$props4.date,
        getNow = _this$props4.getNow,
        length = _this$props4.length,
        showMultiDayTimes = _this$props4.showMultiDayTimes,
        onShowMore = _this$props4.onShowMore,
        doShowMoreDrillDown = _this$props4.doShowMoreDrillDown,
        _0 = _this$props4.components,
        _1 = _this$props4.formats,
        _2 = _this$props4.messages,
        _3 = _this$props4.culture,
        props = _objectWithoutPropertiesLoose(_this$props4, _excluded2$1);

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
    return /*#__PURE__*/React.createElement("div", _extends({}, elementProps, {
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
    }), /*#__PURE__*/React.createElement(View, _extends({}, props, {
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
      doShowMoreDrillDown: doShowMoreDrillDown
    })));
  }
  /**
   *
   * @param date
   * @param viewComponent
   * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
   * parameter. It appears when range change on view changing. It could be handy
   * when you need to have both: range and view type at once, i.e. for manage rbc
   * state via url
   */
  ;

  return Calendar;
}(React.Component);

Calendar.defaultProps = {
  elementProps: {},
  popup: false,
  toolbar: true,
  view: views.MONTH,
  views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
  step: 30,
  length: 30,
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
  longPressThreshold: 250,
  getNow: function getNow() {
    return new Date();
  },
  dayLayoutAlgorithm: 'overlap'
};
Calendar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The localizer used for formatting dates and times according to the `format` and `culture`
   *
   * globalize
   * ```js
   * import {globalizeLocalizer} from 'react-big-calendar'
   * import globalize from 'globalize'
   *
   * const localizer = globalizeLocalizer(globalize)
   * ```
   * moment
   * ```js
   * import {momentLocalizer} from 'react-big-calendar'
   * import moment from 'moment'
   * // and, for optional time zone support
   * import 'moment-timezone'
   *
   * moment.tz.setDefault('America/Los_Angeles')
   * // end optional time zone support
   *
   * const localizer = momentLocalizer(moment)
   * ```
   *
   * Luxon
   * ```js
   * import {luxonLocalizer} from 'react-big-calendar'
   * import {DateTime, Settings} from 'luxon'
   * // only use `Settings` if you require optional time zone support
   * Settings.defaultZone = 'America/Los_Angeles'
   * // end optional time zone support
   *
   * // Luxon uses the Intl API, which currently does not contain `weekInfo`
   * // to determine which weekday is the start of the week by `culture`.
   * // The `luxonLocalizer` defaults this to Sunday, which differs from
   * // the Luxon default of Monday. The localizer requires this option
   * // to change the display, and the date math for determining the
   * // start of a week. Luxon uses non-zero based values for `weekday`.
   * const localizer = luxonLocalizer(DateTime, {firstDayOfWeek: 7})
   * ```
   */
  localizer: PropTypes.object.isRequired,

  /**
   * Props passed to main calendar `<div>`.
   *
   */
  elementProps: PropTypes.object,

  /**
   * The current date value of the calendar. Determines the visible view range.
   * If `date` is omitted then the result of `getNow` is used; otherwise the
   * current date is used.
   *
   * @controllable onNavigate
   */
  date: PropTypes.instanceOf(Date),

  /**
   * The current view of the calendar.
   *
   * @default 'month'
   * @controllable onView
   */
  view: PropTypes.string,

  /**
   * The initial view set for the Calendar.
   * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
   * @default 'month'
   */
  defaultView: PropTypes.string,

  /**
   * An array of event objects to display on the calendar. Events objects
   * can be any shape, as long as the Calendar knows how to retrieve the
   * following details of the event:
   *
   *  - start time
   *  - end time
   *  - title
   *  - whether its an "all day" event or not
   *  - any resource the event may be related to
   *
   * Each of these properties can be customized or generated dynamically by
   * setting the various "accessor" props. Without any configuration the default
   * event should look like:
   *
   * ```js
   * Event {
   *   title: string,
   *   start: Date,
   *   end: Date,
   *   allDay?: boolean
   *   resource?: any,
   * }
   * ```
   */
  events: PropTypes.arrayOf(PropTypes.object),

  /**
   * An array of background event objects to display on the calendar. Background
   * Events behave similarly to Events but are not factored into Event overlap logic,
   * allowing them to sit behind any Events that may occur during the same period.
   * Background Events objects can be any shape, as long as the Calendar knows how to
   * retrieve the following details of the event:
   *
   *  - start time
   *  - end time
   *
   * Each of these properties can be customized or generated dynamically by
   * setting the various "accessor" props. Without any configuration the default
   * event should look like:
   *
   * ```js
   * BackgroundEvent {
   *   start: Date,
   *   end: Date,
   * }
   * ```
   */
  backgroundEvents: PropTypes.arrayOf(PropTypes.object),

  /**
   * Accessor for the event title, used to display event information. Should
   * resolve to a `renderable` value.
   *
   * ```js
   * string | (event: Object) => string
   * ```
   *
   * @type {(func|string)}
   */
  titleAccessor: accessor,

  /**
   * Accessor for the event tooltip. Should
   * resolve to a `renderable` value. Removes the tooltip if null.
   *
   * ```js
   * string | (event: Object) => string
   * ```
   *
   * @type {(func|string)}
   */
  tooltipAccessor: accessor,

  /**
   * Determines whether the event should be considered an "all day" event and ignore time.
   * Must resolve to a `boolean` value.
   *
   * ```js
   * string | (event: Object) => boolean
   * ```
   *
   * @type {(func|string)}
   */
  allDayAccessor: accessor,

  /**
   * The start date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  startAccessor: accessor,

  /**
   * The end date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  endAccessor: accessor,

  /**
   * Returns the id of the `resource` that the event is a member of. This
   * id should match at least one resource in the `resources` array.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  resourceAccessor: accessor,

  /**
   * An array of resource objects that map events to a specific resource.
   * Resource objects, like events, can be any shape or have any properties,
   * but should be uniquly identifiable via the `resourceIdAccessor`, as
   * well as a "title" or name as provided by the `resourceTitleAccessor` prop.
   */
  resources: PropTypes.arrayOf(PropTypes.object),

  /**
   * Provides a unique identifier for each resource in the `resources` array
   *
   * ```js
   * string | (resource: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  resourceIdAccessor: accessor,

  /**
   * Provides a human readable name for the resource object, used in headers.
   *
   * ```js
   * string | (resource: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  resourceTitleAccessor: accessor,

  /**
   * Determines the current date/time which is highlighted in the views.
   *
   * The value affects which day is shaded and which time is shown as
   * the current time. It also affects the date used by the Today button in
   * the toolbar.
   *
   * Providing a value here can be useful when you are implementing time zones
   * using the `startAccessor` and `endAccessor` properties.
   *
   * @type {func}
   * @default () => new Date()
   */
  getNow: PropTypes.func,

  /**
   * Callback fired when the `date` value changes.
   *
   * @controllable date
   */
  onNavigate: PropTypes.func,

  /**
   * Callback fired when the `view` value changes.
   *
   * @controllable view
   */
  onView: PropTypes.func,

  /**
   * Callback fired when date header, or the truncated events links are clicked
   *
   */
  onDrillDown: PropTypes.func,

  /**
   *
   * ```js
   * (dates: Date[] | { start: Date; end: Date }, view: 'month'|'week'|'work_week'|'day'|'agenda'|undefined) => void
   * ```
   *
   * Callback fired when the visible date range changes. Returns an Array of dates
   * or an object with start and end dates for BUILTIN views. Optionally new `view`
   * will be returned when callback called after view change.
   *
   * Custom views may return something different.
   */
  onRangeChange: PropTypes.func,

  /**
   * A callback fired when a date selection is made. Only fires when `selectable` is `true`.
   *
   * ```js
   * (
   *   slotInfo: {
   *     start: Date,
   *     end: Date,
   *     resourceId:  (number|string),
   *     slots: Array<Date>,
   *     action: "select" | "click" | "doubleClick",
   *     bounds: ?{ // For "select" action
   *       x: number,
   *       y: number,
   *       top: number,
   *       right: number,
   *       left: number,
   *       bottom: number,
   *     },
   *     box: ?{ // For "click" or "doubleClick" actions
   *       clientX: number,
   *       clientY: number,
   *       x: number,
   *       y: number,
   *     },
   *   }
   * ) => any
   * ```
   */
  onSelectSlot: PropTypes.func,

  /**
   * Callback fired when a calendar event is selected.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => any
   * ```
   *
   * @controllable selected
   */
  onSelectEvent: PropTypes.func,

  /**
   * Callback fired when a calendar event is clicked twice.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => void
   * ```
   */
  onDoubleClickEvent: PropTypes.func,

  /**
   * Callback fired when a focused calendar event receives a key press.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => void
   * ```
   */
  onKeyPressEvent: PropTypes.func,

  /**
   * Callback fired when dragging a selection in the Time views.
   *
   * Returning `false` from the handler will prevent a selection.
   *
   * ```js
   * (range: { start: Date, end: Date, resourceId: (number|string) }) => ?boolean
   * ```
   */
  onSelecting: PropTypes.func,

  /**
   * Callback fired when a +{count} more is clicked
   *
   * ```js
   * (events: Object, date: Date) => any
   * ```
   */
  onShowMore: PropTypes.func,

  /**
   * Displays all events on the month view instead of
   * having some hidden behind +{count} more. This will
   * cause the rows in the month view to be scrollable if
   * the number of events exceed the height of the row.
   */
  showAllEvents: PropTypes.bool,

  /**
   * The selected event, if any.
   */
  selected: PropTypes.object,

  /**
   * An array of built-in view names to allow the calendar to display.
   * accepts either an array of builtin view names,
   *
   * ```jsx
   * views={['month', 'day', 'agenda']}
   * ```
   * or an object hash of the view name and the component (or boolean for builtin).
   *
   * ```jsx
   * views={{
   *   month: true,
   *   week: false,
   *   myweek: WorkWeekViewComponent,
   * }}
   * ```
   *
   * Custom views can be any React component, that implements the following
   * interface:
   *
   * ```js
   * interface View {
   *   static title(date: Date, { formats: DateFormat[], culture: string?, ...props }): string
   *   static navigate(date: Date, action: 'PREV' | 'NEXT' | 'DATE'): Date
   * }
   * ```
   *
   * @type Views ('month'|'week'|'work_week'|'day'|'agenda')
   * @View
   ['month', 'week', 'day', 'agenda']
   */
  views: views$1,

  /**
   * Determines whether the drill down should occur when clicking on the "+_x_ more" link.
   * If `popup` is false, and `doShowMoreDrillDown` is true, the drill down will occur as usual.
   * If `popup` is false, and `doShowMoreDrillDown` is false, the drill down will not occur and the `onShowMore` function will trigger.
   */
  doShowMoreDrillDown: PropTypes.bool,

  /**
   * The string name of the destination view for drill-down actions, such
   * as clicking a date header, or the truncated events links. If
   * `getDrilldownView` is also specified it will be used instead.
   *
   * Set to `null` to disable drill-down actions.
   *
   * ```js
   * <Calendar
   *   drilldownView="agenda"
   * />
   * ```
   */
  drilldownView: PropTypes.string,

  /**
   * Functionally equivalent to `drilldownView`, but accepts a function
   * that can return a view name. It's useful for customizing the drill-down
   * actions depending on the target date and triggering view.
   *
   * Return `null` to disable drill-down actions.
   *
   * ```js
   * <Calendar
   *   getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>
   *     if (currentViewName === 'month' && configuredViewNames.includes('week'))
   *       return 'week'
   *
   *     return null;
   *   }}
   * />
   * ```
   */
  getDrilldownView: PropTypes.func,

  /**
   * Determines the end date from date prop in the agenda view
   * date prop + length (in number of days) = end date
   */
  length: PropTypes.number,

  /**
   * Determines whether the toolbar is displayed
   */
  toolbar: PropTypes.bool,

  /**
   * Show truncated events in an overlay when you click the "+_x_ more" link.
   */
  popup: PropTypes.bool,

  /**
   * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
   *
   * ```jsx
   * <Calendar popupOffset={30}/>
   * <Calendar popupOffset={{x: 30, y: 20}}/>
   * ```
   */
  popupOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })]),

  /**
   * Allows mouse selection of ranges of dates/times.
   *
   * The 'ignoreEvents' option prevents selection code from running when a
   * drag begins over an event. Useful when you want custom event click or drag
   * logic
   */
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),

  /**
   * Specifies the number of milliseconds the user must press and hold on the screen for a touch
   * to be considered a "long press." Long presses are used for time slot selection on touch
   * devices.
   *
   * @type {number}
   * @default 250
   */
  longPressThreshold: PropTypes.number,

  /**
   * Determines the selectable time increments in week and day views, in minutes.
   */
  step: PropTypes.number,

  /**
   * The number of slots per "section" in the time grid views. Adjust with `step`
   * to change the default of 1 hour long groups, with 30 minute slots.
   */
  timeslots: PropTypes.number,

  /**
   *Switch the calendar to a `right-to-left` read direction.
   */
  rtl: PropTypes.bool,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the event node.
   *
   * ```js
   * (
   * 	event: Object,
   * 	start: Date,
   * 	end: Date,
   * 	isSelected: boolean
   * ) => { className?: string, style?: Object }
   * ```
   */
  eventPropGetter: PropTypes.func,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the time-slot node. Caution! Styles that change layout or
   * position may break the calendar in unexpected ways.
   *
   * ```js
   * (date: Date, resourceId: (number|string)) => { className?: string, style?: Object }
   * ```
   */
  slotPropGetter: PropTypes.func,

  /**
   * Optionally provide a function that returns an object of props to be applied
   * to the time-slot group node. Useful to dynamically change the sizing of time nodes.
   * ```js
   * () => { style?: Object }
   * ```
   */
  slotGroupPropGetter: PropTypes.func,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the day background. Caution! Styles that change layout or
   * position may break the calendar in unexpected ways.
   *
   * ```js
   * (date: Date) => { className?: string, style?: Object }
   * ```
   */
  dayPropGetter: PropTypes.func,

  /**
   * Support to show multi-day events with specific start and end times in the
   * main time grid (rather than in the all day header).
   *
   * **Note: This may cause calendars with several events to look very busy in
   * the week and day views.**
   */
  showMultiDayTimes: PropTypes.bool,

  /**
   * Constrains the minimum _time_ of the Day and Week views.
   */
  min: PropTypes.instanceOf(Date),

  /**
   * Constrains the maximum _time_ of the Day and Week views.
   */
  max: PropTypes.instanceOf(Date),

  /**
   * Determines how far down the scroll pane is initially scrolled down.
   */
  scrollToTime: PropTypes.instanceOf(Date),

  /**
   * Specify a specific culture code for the Calendar.
   *
   * **Note: it's generally better to handle this globally via your i18n library.**
   */
  culture: PropTypes.string,

  /**
   * Localizer specific formats, tell the Calendar how to format and display dates.
   *
   * `format` types are dependent on the configured localizer; Moment, Luxon and Globalize
   * accept strings of tokens according to their own specification, such as: `'DD mm yyyy'`.
   *
   * ```jsx
   * let formats = {
   *   dateFormat: 'dd',
   *
   *   dayFormat: (date, , localizer) =>
   *     localizer.format(date, 'DDD', culture),
   *
   *   dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
   *     localizer.format(start, { date: 'short' }, culture) + ' – ' +
   *     localizer.format(end, { date: 'short' }, culture)
   * }
   *
   * <Calendar formats={formats} />
   * ```
   *
   * All localizers accept a function of
   * the form `(date: Date, culture: ?string, localizer: Localizer) -> string`
   */
  formats: PropTypes.shape({
    /**
     * Format for the day of the month heading in the Month view.
     * e.g. "01", "02", "03", etc
     */
    dateFormat: dateFormat,

    /**
     * A day of the week format for Week and Day headings,
     * e.g. "Wed 01/04"
     *
     */
    dayFormat: dateFormat,

    /**
     * Week day name format for the Month week day headings,
     * e.g: "Sun", "Mon", "Tue", etc
     *
     */
    weekdayFormat: dateFormat,

    /**
     * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
     */
    timeGutterFormat: dateFormat,

    /**
     * Toolbar header format for the Month view, e.g "2015 April"
     *
     */
    monthHeaderFormat: dateFormat,

    /**
     * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
     */
    dayRangeHeaderFormat: dateRangeFormat,

    /**
     * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
     */
    dayHeaderFormat: dateFormat,

    /**
     * Toolbar header format for the Agenda view, e.g. "4/1/2015 – 5/1/2015"
     */
    agendaHeaderFormat: dateRangeFormat,

    /**
     * A time range format for selecting time slots, e.g "8:00am – 2:00pm"
     */
    selectRangeFormat: dateRangeFormat,
    agendaDateFormat: dateFormat,
    agendaTimeFormat: dateFormat,
    agendaTimeRangeFormat: dateRangeFormat,

    /**
     * Time range displayed on events.
     */
    eventTimeRangeFormat: dateRangeFormat,

    /**
     * An optional event time range for events that continue onto another day
     */
    eventTimeRangeStartFormat: dateFormat,

    /**
     * An optional event time range for events that continue from another day
     */
    eventTimeRangeEndFormat: dateFormat
  }),

  /**
   * Customize how different sections of the calendar render by providing custom Components.
   * In particular the `Event` component can be specified for the entire calendar, or you can
   * provide an individual component for each view type.
   *
   * ```jsx
   * let components = {
   *   event: MyEvent, // used by each view (Month, Day, Week)
   *   eventWrapper: MyEventWrapper,
   *   eventContainerWrapper: MyEventContainerWrapper,
   *   dateCellWrapper: MyDateCellWrapper,
   *   timeSlotWrapper: MyTimeSlotWrapper,
   *   timeGutterHeader: MyTimeGutterWrapper,
   *   resourceHeader: MyResourceHeader,
   *   toolbar: MyToolbar,
   *   agenda: {
   *   	 event: MyAgendaEvent, // with the agenda view use a different component to render events
   *     time: MyAgendaTime,
   *     date: MyAgendaDate,
   *   },
   *   day: {
   *     header: MyDayHeader,
   *     event: MyDayEvent,
   *   },
   *   week: {
   *     header: MyWeekHeader,
   *     event: MyWeekEvent,
   *   },
   *   month: {
   *     header: MyMonthHeader,
   *     dateHeader: MyMonthDateHeader,
   *     event: MyMonthEvent,
   *   }
   * }
   * <Calendar components={components} />
   * ```
   */
  components: PropTypes.shape({
    event: PropTypes.elementType,
    eventWrapper: PropTypes.elementType,
    eventContainerWrapper: PropTypes.elementType,
    dateCellWrapper: PropTypes.elementType,
    dayColumnWrapper: PropTypes.elementType,
    timeSlotWrapper: PropTypes.elementType,
    timeGutterHeader: PropTypes.elementType,
    resourceHeader: PropTypes.elementType,
    toolbar: PropTypes.elementType,
    agenda: PropTypes.shape({
      date: PropTypes.elementType,
      time: PropTypes.elementType,
      event: PropTypes.elementType
    }),
    day: PropTypes.shape({
      header: PropTypes.elementType,
      event: PropTypes.elementType
    }),
    week: PropTypes.shape({
      header: PropTypes.elementType,
      event: PropTypes.elementType
    }),
    month: PropTypes.shape({
      header: PropTypes.elementType,
      dateHeader: PropTypes.elementType,
      event: PropTypes.elementType
    })
  }),

  /**
   * String messages used throughout the component, override to provide localizations
   *
   * ```jsx
   * const messages = {
   *   date: 'Date',
   *   time: 'Time',
   *   event: 'Event',
   *   allDay: 'All Day',
   *   week: 'Week',
   *   work_week: 'Work Week',
   *   day: 'Day',
   *   month: 'Month',
   *   previous: 'Back',
   *   next: 'Next',
   *   yesterday: 'Yesterday',
   *   tomorrow: 'Tomorrow',
   *   today: 'Today',
   *   agenda: 'Agenda',
   *
   *   noEventsInRange: 'There are no events in this range.',
   *
   *   showMore: total => `+${total} more`,
   * }
   *
   * <Calendar messages={messages} />
   * ```
   */
  messages: PropTypes.shape({
    allDay: PropTypes.node,
    previous: PropTypes.node,
    next: PropTypes.node,
    today: PropTypes.node,
    month: PropTypes.node,
    week: PropTypes.node,
    day: PropTypes.node,
    agenda: PropTypes.node,
    date: PropTypes.node,
    time: PropTypes.node,
    event: PropTypes.node,
    noEventsInRange: PropTypes.node,
    showMore: PropTypes.func
  }),

  /**
   * A day event layout(arrangement) algorithm.
   *
   * `overlap` allows events to be overlapped.
   *
   * `no-overlap` resizes events to avoid overlap.
   *
   * or custom `Function(events, minimumStartDifference, slotMetrics, accessors)`
   */
  dayLayoutAlgorithm: DayLayoutAlgorithmPropType
} : {};
var Calendar$1 = uncontrollable(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});

var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'MMMM DD', culture) + ' – ' + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture);
};

var dateRangeFormat$1 = function dateRangeFormat(_ref2, culture, local) {
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
  agendaHeaderFormat: dateRangeFormat$1,
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

function moment (moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m;
  };
  /*** BEGIN localized date arithmetic methods with moment ***/


  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit);
    var dtA = datePart ? moment(a).startOf(datePart) : moment(a);
    var dtB = datePart ? moment(b).startOf(datePart) : moment(b);
    return [dtA, dtB, datePart];
  }

  function startOf(date, unit) {
    if (date === void 0) {
      date = null;
    }

    var datePart = fixUnit(unit);

    if (datePart) {
      return moment(date).startOf(datePart).toDate();
    }

    return moment(date).toDate();
  }

  function endOf(date, unit) {
    if (date === void 0) {
      date = null;
    }

    var datePart = fixUnit(unit);

    if (datePart) {
      return moment(date).endOf(datePart).toDate();
    }

    return moment(date).toDate();
  } // moment comparison operations *always* convert both sides to moment objects
  // prior to running the comparisons


  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
        dtA = _defineComparators[0],
        dtB = _defineComparators[1],
        datePart = _defineComparators[2];

    return dtA.isSame(dtB, datePart);
  }

  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }

  function gt(a, b, unit) {
    var _defineComparators2 = defineComparators(a, b, unit),
        dtA = _defineComparators2[0],
        dtB = _defineComparators2[1],
        datePart = _defineComparators2[2];

    return dtA.isAfter(dtB, datePart);
  }

  function lt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
        dtA = _defineComparators3[0],
        dtB = _defineComparators3[1],
        datePart = _defineComparators3[2];

    return dtA.isBefore(dtB, datePart);
  }

  function gte(a, b, unit) {
    var _defineComparators4 = defineComparators(a, b, unit),
        dtA = _defineComparators4[0],
        dtB = _defineComparators4[1],
        datePart = _defineComparators4[2];

    return dtA.isSameOrBefore(dtB, datePart);
  }

  function lte(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
        dtA = _defineComparators5[0],
        dtB = _defineComparators5[1],
        datePart = _defineComparators5[2];

    return dtA.isSameOrBefore(dtB, datePart);
  }

  function inRange(day, min, max, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

    var datePart = fixUnit(unit);
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
    var dt = moment(date).startOf('day').format('MM/DD/YYYY'); // We do it this way to avoid issues when timezone switching

    return moment(dt + " " + tm, 'MM/DD/YYYY HH:mm:ss').toDate();
  }

  function add(date, adder, unit) {
    var datePart = fixUnit(unit);
    return moment(date).add(adder, datePart).toDate();
  }

  function range(start, end, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

    var datePart = fixUnit(unit); // because the add method will put these in tz, we have to start that way

    var current = moment(start).toDate();
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

  function diff(a, b, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

    var datePart = fixUnit(unit); // don't use 'defineComparators' here, as we don't want to mutate the values

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
  } // moment will automatically handle DST differences in it's calculations


  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }

  function getMinutesFromMidnight(start) {
    var dayStart = moment(start).startOf('day');
    var day = moment(start);
    return day.diff(dayStart, 'minutes');
  } // These two are used by DateSlotMetrics


  function continuesPrior(start, first) {
    var mStart = moment(start);
    var mFirst = moment(first);
    return mStart.isBefore(mFirst, 'day');
  }

  function continuesAfter(start, end, last) {
    var mEnd = moment(end);
    var mLast = moment(last);
    return mEnd.isSameOrAfter(mLast, 'minutes');
  } // These two are used by eventLevels


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
    var durA = diff(aStart, ceil(aEnd, 'day'), 'day');
    var durB = diff(bStart, ceil(bEnd, 'day'), 'day');
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need moment conversion here
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
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, 'day'); // when the event is zero duration we need to handle a bit differently

    var sameMin = !startOfDay.isSame(eEnd, 'minutes');
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, 'minutes') : eEnd.isSameOrAfter(rStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  } // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year


  function isSameDate(date1, date2) {
    var dt = moment(date1);
    var dt2 = moment(date2);
    return dt.isSame(dt2, 'date');
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
    var comparator = Number("" + neg + Math.abs(dtOffset)); // moment correctly provides positive/negative offset, as expected

    var mtOffset = moment().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }

  return new DateLocalizer({
    formats: formats,
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

function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's';
}

var weekRangeFormat$1 = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'MMMM dd', culture) + ' – ' + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture);
};

var dateRangeFormat$2 = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 'D', culture) + ' – ' + local.format(end, 'D', culture);
};

var timeRangeFormat$1 = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
      end = _ref3.end;
  return local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture);
};

var timeRangeStartFormat$1 = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 't', culture) + ' – ';
};

var timeRangeEndFormat$1 = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 't', culture);
};

var formats$1 = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEE',
  selectRangeFormat: timeRangeFormat$1,
  eventTimeRangeFormat: timeRangeFormat$1,
  eventTimeRangeStartFormat: timeRangeStartFormat$1,
  eventTimeRangeEndFormat: timeRangeEndFormat$1,
  timeGutterFormat: 't',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'EEEE MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$1,
  agendaHeaderFormat: dateRangeFormat$2,
  agendaDateFormat: 'EEE MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat$1
};

function fixUnit$1(unit) {
  var datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;

  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }

  return datePart;
} // Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)


function luxon (DateTime, _temp) {
  var _ref6 = _temp === void 0 ? {} : _temp,
      _ref6$firstDayOfWeek = _ref6.firstDayOfWeek,
      firstDayOfWeek = _ref6$firstDayOfWeek === void 0 ? 7 : _ref6$firstDayOfWeek;

  function formatDate(value, format) {
    return DateTime.fromJSDate(value).toFormat(format);
  }

  function formatDateWithCulture(value, culture, format) {
    return DateTime.fromJSDate(value).setLocale(culture).format(format);
  }
  /*** BEGIN localized date arithmetic methods with Luxon ***/


  function defineComparators(a, b, unit) {
    var datePart = fixUnit$1(unit);
    var dtA = datePart ? DateTime.fromJSDate(a).startOf(datePart) : DateTime.fromJSDate(a);
    var dtB = datePart ? DateTime.fromJSDate(b).startOf(datePart) : DateTime.fromJSDate(b);
    return [dtA, dtB, datePart];
  } // Since Luxon (and current Intl API) has no support
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
  } // This returns a DateTime instance


  function startOfDT(date, unit) {
    if (date === void 0) {
      date = new Date();
    }

    var datePart = fixUnit$1(unit);

    if (datePart) {
      var dt = DateTime.fromJSDate(date);
      return datePart.includes('week') ? startOfDTWeek(dt) : dt.startOf(datePart);
    }

    return DateTime.fromJSDate(date);
  }

  function firstOfWeek() {
    return firstDayOfWeek;
  } // This returns a JS Date from a DateTime instance


  function startOf(date, unit) {
    if (date === void 0) {
      date = new Date();
    }

    return startOfDT(date, unit).toJSDate();
  } // This returns a DateTime instance


  function endOfDT(date, unit) {
    if (date === void 0) {
      date = new Date();
    }

    var datePart = fixUnit$1(unit);

    if (datePart) {
      var dt = DateTime.fromJSDate(date);
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart);
    }

    return DateTime.fromJSDate(date);
  }

  function endOf(date, unit) {
    if (date === void 0) {
      date = new Date();
    }

    return endOfDT(date, unit).toJSDate();
  }

  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
        dtA = _defineComparators[0],
        dtB = _defineComparators[1];

    return +dtA == +dtB;
  }

  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }

  function gt(a, b, unit) {
    var _defineComparators2 = defineComparators(a, b, unit),
        dtA = _defineComparators2[0],
        dtB = _defineComparators2[1];

    return +dtA > +dtB;
  }

  function lt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
        dtA = _defineComparators3[0],
        dtB = _defineComparators3[1];

    return +dtA < +dtB;
  }

  function gte(a, b, unit) {
    var _defineComparators4 = defineComparators(a, b, unit),
        dtA = _defineComparators4[0],
        dtB = _defineComparators4[1];

    return +dtA >= +dtB;
  }

  function lte(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
        dtA = _defineComparators5[0],
        dtB = _defineComparators5[1];

    return +dtA <= +dtB;
  }

  function inRange(day, min, max, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

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
    var _DateTime$fromJSDate$;

    var datePart = fixUnit$1(unit);
    return DateTime.fromJSDate(date).plus((_DateTime$fromJSDate$ = {}, _DateTime$fromJSDate$[datePart] = adder, _DateTime$fromJSDate$)).toJSDate();
  }

  function range(start, end, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

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

  function diff(a, b, unit) {
    if (unit === void 0) {
      unit = 'day';
    }

    var datePart = fixUnit$1(unit); // don't use 'defineComparators' here, as we don't want to mutate the values

    var dtA = DateTime.fromJSDate(a);
    var dtB = DateTime.fromJSDate(b);
    return Math.round(dtB.diff(dtA, datePart, {
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
  } // Luxon will automatically handle DST differences in it's calculations


  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }

  function getMinutesFromMidnight(start) {
    var dayStart = startOfDT(start, 'day');
    var day = DateTime.fromJSDate(start);
    return Math.round(day.diff(dayStart, 'minutes', {
      conversionAccuracy: 'longterm'
    }).toObject().minutes);
  } // These two are used by DateSlotMetrics


  function continuesPrior(start, first) {
    return lt(start, first);
  }

  function continuesAfter(start, end, last) {
    return gte(end, last);
  } // These two are used by eventLevels


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
    var durA = diff(aStart, ceil(aEnd, 'day'), 'day');
    var durB = diff(bStart, ceil(bEnd, 'day'), 'day');
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need moment conversion here
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
    var startsBeforeEnd = lte(eStart, rangeEnd, 'day'); // when the event is zero duration we need to handle a bit differently

    var sameMin = neq(eStart, end, 'minutes');
    var endsAfterStart = sameMin ? gt(end, rangeStart, 'minutes') : gte(end, rangeStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  } // moment treats 'day' and 'date' equality very different
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
    var comparator = Number("" + neg + Math.abs(dtOffset)); // moment correctly provides positive/negative offset, as expected

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
    formats: formats$1,
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
    browserTZOffset: browserTZOffset
  });
}

var dateRangeFormat$3 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'd', culture) + ' – ' + local.format(end, 'd', culture);
};

var timeRangeFormat$2 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture);
};

var timeRangeStartFormat$2 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, 't', culture) + ' – ';
};

var timeRangeEndFormat$2 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return ' – ' + local.format(end, 't', culture);
};

var weekRangeFormat$2 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
      end = _ref5.end;
  return local.format(start, 'MMM dd', culture) + ' – ' + local.format(end, eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

var formats$2 = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat$2,
  eventTimeRangeFormat: timeRangeFormat$2,
  eventTimeRangeStartFormat: timeRangeStartFormat$2,
  eventTimeRangeEndFormat: timeRangeEndFormat$2,
  timeGutterFormat: 't',
  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$2,
  agendaHeaderFormat: dateRangeFormat$3,
  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat$2
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
    formats: formats$2,
    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  });
}

var dateRangeFormat$4 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, {
    date: 'short'
  }, culture) + ' – ' + local.format(end, {
    date: 'short'
  }, culture);
};

var timeRangeFormat$3 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, {
    time: 'short'
  }, culture) + ' – ' + local.format(end, {
    time: 'short'
  }, culture);
};

var timeRangeStartFormat$3 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, {
    time: 'short'
  }, culture) + ' – ';
};

var timeRangeEndFormat$3 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return ' – ' + local.format(end, {
    time: 'short'
  }, culture);
};

var weekRangeFormat$3 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
      end = _ref5.end;
  return local.format(start, 'MMM dd', culture) + ' – ' + local.format(end, eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

var formats$3 = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',
  selectRangeFormat: timeRangeFormat$3,
  eventTimeRangeFormat: timeRangeFormat$3,
  eventTimeRangeStartFormat: timeRangeStartFormat$3,
  eventTimeRangeEndFormat: timeRangeEndFormat$3,
  timeGutterFormat: {
    time: 'short'
  },
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'eeee MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$3,
  agendaHeaderFormat: dateRangeFormat$4,
  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: {
    time: 'short'
  },
  agendaTimeRangeFormat: timeRangeFormat$3
};
function globalize (globalize) {
  var locale = function locale(culture) {
    return culture ? globalize(culture) : globalize;
  }; // return the first day of the week from the locale data. Defaults to 'world'
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
      } // maybe cldr supplemental is not loaded? revert to original method


      var date = new Date(); //cldr-data doesn't seem to be zero based

      var localeDay = Math.max(parseInt(locale(culture).formatDate(date, {
        raw: 'e'
      }), 10) - 1, 0);
      return Math.abs(date.getDay() - localeDay);
    }
  }

  if (!globalize.load) return oldGlobalize(globalize);
  return new DateLocalizer({
    firstOfWeek: firstOfWeek,
    formats: formats$3,
    format: function format(value, _format, culture) {
      _format = typeof _format === 'string' ? {
        raw: _format
      } : _format;
      return locale(culture).formatDate(value, _format);
    }
  });
}

var dateRangeFormat$5 = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'P', culture) + " \u2013 " + local.format(end, 'P', culture);
};

var timeRangeFormat$4 = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 'p', culture) + " \u2013 " + local.format(end, 'p', culture);
};

var timeRangeStartFormat$4 = function timeRangeStartFormat(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, 'h:mma', culture) + " \u2013 ";
};

var timeRangeEndFormat$4 = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end;
  return " \u2013 " + local.format(end, 'h:mma', culture);
};

var weekRangeFormat$4 = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
      end = _ref5.end;
  return local.format(start, 'MMMM dd', culture) + " \u2013 " + local.format(end, eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture);
};

var formats$4 = {
  dateFormat: 'dd',
  dayFormat: 'dd eee',
  weekdayFormat: 'cccc',
  selectRangeFormat: timeRangeFormat$4,
  eventTimeRangeFormat: timeRangeFormat$4,
  eventTimeRangeStartFormat: timeRangeStartFormat$4,
  eventTimeRangeEndFormat: timeRangeEndFormat$4,
  timeGutterFormat: 'p',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat$4,
  agendaHeaderFormat: dateRangeFormat$5,
  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 'p',
  agendaTimeRangeFormat: timeRangeFormat$4
};

var dateFnsLocalizer = function dateFnsLocalizer(_ref6) {
  var startOfWeek = _ref6.startOfWeek,
      getDay = _ref6.getDay,
      _format = _ref6.format,
      locales = _ref6.locales;
  return new DateLocalizer({
    formats: formats$4,
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

var components = {
  eventWrapper: NoopWrapper,
  timeSlotWrapper: NoopWrapper,
  dateCellWrapper: NoopWrapper
};

export { Calendar$1 as Calendar, DateLocalizer, navigate as Navigate, views as Views, components, dateFnsLocalizer, globalize as globalizeLocalizer, luxon as luxonLocalizer, moment as momentLocalizer, moveDate as move };
