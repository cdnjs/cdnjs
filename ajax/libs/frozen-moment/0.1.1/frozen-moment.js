(function (global, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('moment'));
  } else if (typeof define === 'function' && define.amd) {
    define(['moment'], factory);
  } else {
    global.moment = factory(global.moment);
  }
}(this, function (moment) {

  var immutableMethods = [
    // Get
    'weeksInYear',
    'isoWeeksInYear',
    'get',
    'max',
    'min',
    // Display
    'format',
    'fromNow',
    'from',
    'calendar',
    'diff',
    'valueOf',
    'unix',
    'daysInMonth',
    'toArray',
    'toJSON',
    'toISOString',
    // Query
    'isBefore',
    'isSame',
    'isAfter',
    'isBetween',
    'isLeapYear',
    'isDST',
    'isDSTShifted'
  ];

  // moment has a lot of overloaded getters and setters, where calling the
  // method with no arguments will run an immutable getter, and calling the
  // method with one or more arguments will run a mutating setter.
  var mutatorsIfArguments = [
    // Get + Set
    'millisecond', 'milliseconds',
    'second', 'seconds',
    'minute', 'minutes',
    'hour', 'hours',
    'date', 'dates',
    'day', 'days',
    'weekday',
    'isoWeekday',
    'dayOfYear',
    'week', 'weeks',
    'isoWeek', 'isoWeeks',
    'month', 'months',
    'quarter',
    'year', 'years',
    'weekYear',
    'isoWeekYear',
    'set'
  ];

  function frozenMethodGenerator(orig) {
    return function () {
      return orig.apply(this.freeze(), arguments);
    };
  }
  function frozenIfArgumentsMethodGenerator(orig) {
    return function () {
      if (arguments.length) {
        return orig.apply(this.freeze(), arguments);
      }
      return orig.apply(this);
    };
  }
  function mixin(dest, props) {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        dest[prop] = props[prop];
      }
    }
  }

  var frozenProto = Object.create(moment.fn);
  for (var key in moment.fn) {
    var func = moment.fn[key];

    if (moment.fn.hasOwnProperty(key)
        && typeof func === 'function'
        && immutableMethods.indexOf(key) === -1) {

      if (mutatorsIfArguments.indexOf(key) === -1) {
        frozenProto[key] = frozenMethodGenerator(func);
      } else {
        frozenProto[key] = frozenIfArgumentsMethodGenerator(func);
      }

    }
  }
  frozenProto.thaw = function () {
    return this.clone();
  };
  frozenProto.isFrozen = function () {
    return true;
  };

  moment.fn.isFrozen = function () {
    return false;
  };
  moment.fn.freeze = function () {
    var props = moment.fn.clone.apply(this);
    var frozen = Object.create(frozenProto);
    mixin(frozen, props);
    return frozen;
  };

  return moment;

}));
