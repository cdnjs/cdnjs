(function (global, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('moment'));
  } else if (typeof define === 'function' && define.amd) {
    define(['moment'], factory);
  } else {
    global.moment = factory(global.moment);
  }
}(this, function (moment) {
  var frozenProto;
  var momentProto = moment.fn;

  var create = Object.create || function createObject(proto) {
    function FrozenMoment() {}
    FrozenMoment.prototype = proto;
    return new FrozenMoment();
  };

  var includes = Array.prototype.includes || function arrayIncludes(value) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
      if (this[i] === value) {
        return true;
      }
    }
    return false;
  };

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
    'isDSTShifted',
    // Frozen Moment
    'freeze'
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

  function frozenMethodGenerator(name) {
    return function () {
      var thawed = this.thaw();
      var result = thawed[name].apply(thawed, arguments);
      return (moment.isMoment(result) ? result.freeze() : result);
    };
  }
  function frozenIfArgumentsMethodGenerator(name) {
    return function () {
      if (arguments.length) {
        var thawed = this.thaw();
        var result = thawed[name].apply(thawed, arguments);
        return (moment.isMoment(result) ? result.freeze() : result);
      }
      return momentProto[name].apply(this);
    };
  }

  function mixin(dest, props) {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        dest[prop] = props[prop];
      }
    }
  }
  function freeze() {
    var props = momentProto.clone.apply(this);
    var frozen = create(frozenProto);
    mixin(frozen, props);
    return frozen;
  }
  function thaw() {
    return momentProto.clone.call(this);
  }

  function buildFrozenPrototype() {
    for (var key in momentProto) {

      if (key === "freeze") {
        // never wrap Frozen Moment's freeze method
        continue;
      }

      if (momentProto.hasOwnProperty(key)
          && typeof momentProto[key] === 'function'
          && !includes.call(immutableMethods, key)) {

        if (!includes.call(mutatorsIfArguments, key)) {
          frozenProto[key] = frozenMethodGenerator(key);
        } else {
          frozenProto[key] = frozenIfArgumentsMethodGenerator(key);
        }

      }
    }

    frozenProto.isFrozen = function isFrozen() {
      return true;
    };
    frozenProto.clone = freeze;
    frozenProto.thaw = thaw;
  }


  // wire up prototypes

  momentProto.isFrozen = function isFrozen() {
    return false;
  };
  momentProto.freeze = freeze;

  moment.frozen = function frozen() {
    return moment.apply(this, arguments).freeze();
  };
  moment.frozenUtc = function frozenUtc() {
    return moment.utc.apply(this, arguments).freeze();
  };
  moment.frozen.autowrap = buildFrozenPrototype;
  moment.frozen.unwrap = function unwrapMethods(/* names... */) {
    var length = arguments.length;
    for (var i = 0, name = arguments[i]; i < length; i++) {
      if (frozenProto[name]) {
        delete frozenProto[name];
      }
      immutableMethods.push(name);
    }
  };

  frozenProto = moment.frozen.fn = create(momentProto);
  buildFrozenPrototype();
  return moment;

}));
