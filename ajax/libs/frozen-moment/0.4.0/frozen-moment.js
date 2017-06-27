(function (global, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('moment'));
  } else if (typeof define === 'function' && define.amd) {
    define(['moment'], factory);
  } else {
    global.moment = factory(global.moment);
  }
}(this, function (moment) {
  if (!moment) {
    throw new Error('frozen-moment cannot find moment');
  }

  function FrozenMoment() {}
  function FrozenDuration() {}
  var momentProto = moment.fn;
  var durationProto = moment.duration.fn;

  var includes = Array.prototype.includes || function arrayIncludes(value) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
      if (this[i] === value) {
        return true;
      }
    }
    return false;
  };

  var immutableMomentMethods = [
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
    'isSameOrAfter',
    'isSameOrBefore',
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
  var momentMutatorsIfArguments = [
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

  var immutableDurationMethods = [
    'humanize',
    'asMilliseconds',
    'asSeconds',
    'asMinutes',
    'asHours',
    'asDays',
    'asWeeks',
    'asMonths',
    'asYears',
    'as',
    'get',
    'format',
    'valueOf',
    'toJSON',
    'toISOString',
    'toString',
    // Frozen Moment
    'freeze'
  ];

  // moment has a lot of overloaded getters and setters, where calling the
  // method with no arguments will run an immutable getter, and calling the
  // method with one or more arguments will run a mutating setter.
  var durationMutatorsIfArguments = [
    'milliseconds',
    'seconds',
    'minutes',
    'hours',
    'days',
    'weeks',
    'months',
    'years'
  ];

  function frozenMethodGenerator(name, isMoment) {
    return function () {
      var thawed = this.thaw();
      var result = thawed[name].apply(thawed, arguments);
      return (isMoment(result) ? result.freeze() : result);
    };
  }
  function frozenIfArgumentsMethodGenerator(name, isMoment, upstreamProto) {
    return function () {
      if (arguments.length) {
        var thawed = this.thaw();
        var result = thawed[name].apply(thawed, arguments);
        return (isMoment(result) ? result.freeze() : result);
      }
      return upstreamProto[name].apply(this);
    };
  }

  function mixin(dest, props) {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        dest[prop] = props[prop];
      }
    }
  }
  function freezeMoment() {
    var props = momentProto.clone.apply(this);
    var frozen = new FrozenMoment();
    mixin(frozen, props);
    return frozen;
  }
  function thawMoment() {
    return momentProto.clone.call(this);
  }

  function buildFrozenPrototype() {
    function MomentSubclass() {}
    MomentSubclass.prototype = momentProto;
    var frozenProto = new MomentSubclass();

    for (var key in momentProto) {
      if (key === "freeze") {
        // never wrap Frozen Moment's freeze method
        continue;
      }

      if (momentProto.hasOwnProperty(key)
          && typeof momentProto[key] === 'function'
          && !includes.call(immutableMomentMethods, key)) {

        if (!includes.call(momentMutatorsIfArguments, key)) {
          frozenProto[key] = frozenMethodGenerator(key, moment.isMoment);
        } else {
          frozenProto[key] = frozenIfArgumentsMethodGenerator(key, moment.isMoment, momentProto);
        }
      }
    }

    frozenProto.isFrozen = function isFrozen() {
      return true;
    };
    frozenProto.clone = freezeMoment;
    frozenProto.thaw = thawMoment;

    FrozenMoment.prototype = moment.frozen.fn = frozenProto;
  }


  function freezeDuration() {
    var props = moment.duration(this);
    var frozen = new FrozenDuration();
    mixin(frozen, props);
    return frozen;
  }
  function thawDuration() {
    return moment.duration(this);
  }

  function buildFrozenDurationPrototype() {
    function DurationSubclass() {}
    DurationSubclass.prototype = durationProto;
    var frozenProto = new DurationSubclass();

    for (var key in durationProto) {
      if (key === "freeze") {
        // never wrap Frozen Moment's freeze method
        continue;
      }

      if (durationProto.hasOwnProperty(key)
          && typeof durationProto[key] === 'function'
          && !includes.call(immutableDurationMethods, key)) {

        if (!includes.call(durationMutatorsIfArguments, key)) {
          frozenProto[key] = frozenMethodGenerator(key, moment.isDuration);
        } else {
          frozenProto[key] = frozenIfArgumentsMethodGenerator(key, moment.isDuration, durationProto);
        }
      }
    }

    frozenProto.isFrozen = function isFrozen() {
      return true;
    };
    frozenProto.clone = freezeDuration;
    frozenProto.thaw = thawDuration;

    FrozenDuration.prototype = moment.frozenDuration.fn = frozenProto;
  }


  // wire up prototypes

  momentProto.isFrozen = function isFrozen() {
    return false;
  };
  momentProto.freeze = freezeMoment;

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
      if (FrozenMoment.prototype[name]) {
        delete FrozenMoment.prototype[name];
      }
      immutableMomentMethods.push(name);
    }
  };

  durationProto.isFrozen = function isFrozen() {
    return false;
  };
  durationProto.freeze = freezeDuration;

  moment.frozenDuration = function frozen() {
    return moment.duration.apply(this, arguments).freeze();
  };

  buildFrozenPrototype();
  buildFrozenDurationPrototype();
  return moment;

}));
