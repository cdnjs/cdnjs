(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//-----------------------------------------------------------------------------
// Contstants
//-----------------------------------------------------------------------------

var moment = require('moment');

var INTERVALS = {
  year:   true,
  month:  true,
  week:   true,
  day:    true,
  hour:   true,
  minute: true,
  second: true
};


//-----------------------------------------------------------------------------
// Date Ranges
//-----------------------------------------------------------------------------

/**
 * DateRange class to store ranges and query dates.
 *
 * @param {(Moment|Date)} start Start of interval
 * @param {(Moment|Date)} end End of interval
 *
 * @constructor
 */
function DateRange(start, end) {
  this.start = moment(start);
  this.end   = moment(end);
}

/**
 * Deep clone range.
 *
 * @return {!DateRange}
 */
DateRange.prototype.clone = function() {
  return moment().range(this.start, this.end);
};

/**
 * Determine if the current interval contains a given moment/date/range.
 *
 * @param {(Moment|Date|DateRange)} other Date to check
 * @param {!boolean} exclusive True if the to value is exclusive
 *
 * @return {!boolean}
 */
DateRange.prototype.contains = function(other, exclusive) {
  var start = this.start;
  var end   = this.end;

  if (other instanceof DateRange) {
    return start <= other.start && (end > other.end || (end.isSame(other.end) && !exclusive));
  }
  else {
    return start <= other && (end > other || (end.isSame(other) && !exclusive));
  }
};

/**
 * Determine if the current date range overlaps a given date range.
 *
 * @param {!DateRange} range Date range to check
 *
 * @return {!boolean}
 */
DateRange.prototype.overlaps = function(range) {
  return this.intersect(range) !== null;
};

/**
 * Determine the intersecting periods from one or more date ranges.
 *
 * @param {!DateRange} other A date range to intersect with this one
 *
 * @return {DateRange}
 */
DateRange.prototype.intersect = function(other) {
  var start = this.start;
  var end   = this.end;

  if ((start <= other.start) && (other.start < end) && (end < other.end)) {
    return new DateRange(other.start, end);
  }
  else if ((other.start < start) && (start < other.end) && (other.end <= end)) {
    return new DateRange(start, other.end);
  }
  else if ((other.start < start) && (start <= end) && (end < other.end)) {
    return this;
  }
  else if ((start <= other.start) && (other.start <= other.end) && (other.end <= end)) {
    return other;
  }

  return null;
};

/**
 * Merge date ranges if they intersect.
 *
 * @param {!DateRange} other A date range to add to this one
 *
 * @return {DateRange}
 */
DateRange.prototype.add = function(other) {
  if (this.overlaps(other)) {
    return new DateRange(moment.min(this.start, other.start), moment.max(this.end, other.end));
  }

  return null;
};

/**
 * Subtract one range from another.
 *
 * @param {!DateRange} other A date range to substract from this one
 *
 * @return {!Array<DateRange>}
 */
DateRange.prototype.subtract = function(other) {
  var start = this.start;
  var end   = this.end;

  if (this.intersect(other) === null) {
    return [this];
  }
  else if ((other.start <= start) && (start < end) && (end <= other.end)) {
    return [];
  }
  else if ((other.start <= start) && (start < other.end) && (other.end < end)) {
    return [new DateRange(other.end, end)];
  }
  else if ((start < other.start) && (other.start < end) && (end <= other.end)) {
    return [new DateRange(start, other.start)];
  }
  else if ((start < other.start) && (other.start < other.end) && (other.end < end)) {
    return [new DateRange(start, other.start), new DateRange(other.end, end)];
  }
};

/**
 * Iterate over the date range by a given date range, executing a function
 * for each sub-range.
 *
 * @param {(!DateRange|String)} range Date range to be used for iteration or
 *                                    shorthand string (shorthands:
 *                                    http://momentjs.com/docs/#/manipulating/add/)
 * @param {!function(Moment)} hollaback Function to execute for each sub-range
 * @param {!boolean} exclusive Indicate that the end of the range should not
 * be included in the iter.
 *
 * @return {DateRange} `this`
 */
DateRange.prototype.by = function(range, hollaback, exclusive) {
  if (typeof range === 'string') {
    _byString.call(this, range, hollaback, exclusive);
  }
  else {
    _byRange.call(this, range, hollaback, exclusive);
  }
  return this;
};

/**
 * @private
 */
function _byString(interval, hollaback, exclusive) {
  var current = moment(this.start);

  while (this.contains(current, exclusive)) {
    hollaback.call(this, current.clone());
    current.add(1, interval);
  }
}

/**
 * @private
 */
function _byRange(interval, hollaback, exclusive) {
  var div = this / interval;
  var l = Math.floor(div);

  if (l === Infinity) { return; }
  if (l === div && exclusive) {
    l--;
  }

  for (var i = 0; i <= l; i++) {
    hollaback.call(this, moment(this.start.valueOf() + interval.valueOf() * i));
  }
}

/**
 * Date range in milliseconds. Allows basic coercion math of date ranges.
 *
 * @return {!number}
 */
DateRange.prototype.valueOf = function() {
  return this.end - this.start;
};

/**
 * Center date of the range.
 *
 * @return {!Moment}
 */
DateRange.prototype.center = function() {
  var center = this.start + this.diff() / 2;
  return moment(center);
};

/**
 * Date range toDate
 *
 * @return {!Array<Date>}
 */
DateRange.prototype.toDate = function() {
  return [this.start.toDate(), this.end.toDate()];
};

/**
 * Determine if this date range is the same as another.
 *
 * @param {!DateRange} other Another date range to compare to
 *
 * @return {!boolean}
 */
DateRange.prototype.isSame = function(other) {
  return this.start.isSame(other.start) && this.end.isSame(other.end);
};

/**
 * The difference of the end vs start.
 *
 * @param {number} unit Unit of difference, if no unit is passed in
 *                      milliseconds are returned. E.g.: `"days"`, `"months"`,
 *                      etc...
 *
 * @return {!number}
 */
DateRange.prototype.diff = function(unit) {
  return this.end.diff(this.start, unit);
};


//-----------------------------------------------------------------------------
// Moment Extensions
//-----------------------------------------------------------------------------

/**
 * Build a date range.
 *
 * @param {(Moment|Date)} start Start of range
 * @param {(Moment|Date)} end End of range
 *
 * @this {Moment}
 *
 * @return {!DateRange}
 */
moment.range = function(start, end) {
  if (start in INTERVALS) {
    return new DateRange(moment(this).startOf(start), moment(this).endOf(start));
  }
  else {
    return new DateRange(start, end);
  }
};

/**
 * Expose constructor
 *
 * @const
 */
moment.range.constructor = DateRange;

/**
 * @deprecated
 */
moment.fn.range = moment.range;

/**
 * Check if the current moment is within a given date range.
 *
 * @param {!DateRange} range Date range to check
 *
 * @this {Moment}
 *
 * @return {!boolean}
 */
moment.fn.within = function(range) {
  return range.contains(this._d);
};


//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------

module.exports = DateRange;

},{"moment":undefined}]},{},[1]);
