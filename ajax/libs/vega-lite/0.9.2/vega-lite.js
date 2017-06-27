(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-time', ['exports'], factory) :
  factory((global.d3_time = {}));
}(this, function (exports) { 'use strict';

  var t0 = new Date;
  var t1 = new Date;
  function newInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.round = function(date) {
      var d0 = new Date(+date),
          d1 = new Date(date - 1);
      floori(d0), floori(d1), offseti(d1, 1);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), date;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = new Date(start - 1);
      stop = new Date(+stop);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      offseti(start, 1), floori(start);
      if (start < stop) range.push(new Date(+start));
      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) {
      interval.count = function(start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? function(d) { return field(d) % step === 0; }
                : function(d) { return interval.count(0, d) % step === 0; });
      };
    }

    return interval;
  };

  var millisecond = newInterval(function() {
    // noop
  }, function(date, step) {
    date.setTime(+date + step);
  }, function(start, end) {
    return end - start;
  });

  // An optimized implementation for this simple case.
  millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function(date) {
      date.setTime(Math.floor(date / k) * k);
    }, function(date, step) {
      date.setTime(+date + step * k);
    }, function(start, end) {
      return (end - start) / k;
    });
  };

  var second = newInterval(function(date) {
    date.setMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  }, function(date) {
    return date.getSeconds();
  });

  var minute = newInterval(function(date) {
    date.setSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  }, function(date) {
    return date.getMinutes();
  });

  var hour = newInterval(function(date) {
    date.setMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  }, function(date) {
    return date.getHours();
  });

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  }, function(date) {
    return date.getDate() - 1;
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function(date) {
    return date.getMonth();
  });

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date) {
    return date.getFullYear();
  });

  var utcSecond = newInterval(function(date) {
    date.setUTCMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  }, function(date) {
    return date.getUTCSeconds();
  });

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  }, function(date) {
    return date.getUTCMinutes();
  });

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  }, function(date) {
    return date.getUTCHours();
  });

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / 864e5;
  }, function(date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / 6048e5;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(1);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function(date) {
    return date.getUTCMonth();
  });

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date) {
    return date.getUTCFullYear();
  });

  var milliseconds = millisecond.range;
  var seconds = second.range;
  var minutes = minute.range;
  var hours = hour.range;
  var days = day.range;
  var sundays = sunday.range;
  var mondays = monday.range;
  var tuesdays = tuesday.range;
  var wednesdays = wednesday.range;
  var thursdays = thursday.range;
  var fridays = friday.range;
  var saturdays = saturday.range;
  var weeks = sunday.range;
  var months = month.range;
  var years = year.range;

  var utcMillisecond = millisecond;
  var utcMilliseconds = milliseconds;
  var utcSeconds = utcSecond.range;
  var utcMinutes = utcMinute.range;
  var utcHours = utcHour.range;
  var utcDays = utcDay.range;
  var utcSundays = utcSunday.range;
  var utcMondays = utcMonday.range;
  var utcTuesdays = utcTuesday.range;
  var utcWednesdays = utcWednesday.range;
  var utcThursdays = utcThursday.range;
  var utcFridays = utcFriday.range;
  var utcSaturdays = utcSaturday.range;
  var utcWeeks = utcSunday.range;
  var utcMonths = utcMonth.range;
  var utcYears = utcYear.range;

  var version = "0.1.0";

  exports.version = version;
  exports.milliseconds = milliseconds;
  exports.seconds = seconds;
  exports.minutes = minutes;
  exports.hours = hours;
  exports.days = days;
  exports.sundays = sundays;
  exports.mondays = mondays;
  exports.tuesdays = tuesdays;
  exports.wednesdays = wednesdays;
  exports.thursdays = thursdays;
  exports.fridays = fridays;
  exports.saturdays = saturdays;
  exports.weeks = weeks;
  exports.months = months;
  exports.years = years;
  exports.utcMillisecond = utcMillisecond;
  exports.utcMilliseconds = utcMilliseconds;
  exports.utcSeconds = utcSeconds;
  exports.utcMinutes = utcMinutes;
  exports.utcHours = utcHours;
  exports.utcDays = utcDays;
  exports.utcSundays = utcSundays;
  exports.utcMondays = utcMondays;
  exports.utcTuesdays = utcTuesdays;
  exports.utcWednesdays = utcWednesdays;
  exports.utcThursdays = utcThursdays;
  exports.utcFridays = utcFridays;
  exports.utcSaturdays = utcSaturdays;
  exports.utcWeeks = utcWeeks;
  exports.utcMonths = utcMonths;
  exports.utcYears = utcYears;
  exports.millisecond = millisecond;
  exports.second = second;
  exports.minute = minute;
  exports.hour = hour;
  exports.day = day;
  exports.sunday = sunday;
  exports.monday = monday;
  exports.tuesday = tuesday;
  exports.wednesday = wednesday;
  exports.thursday = thursday;
  exports.friday = friday;
  exports.saturday = saturday;
  exports.week = sunday;
  exports.month = month;
  exports.year = year;
  exports.utcSecond = utcSecond;
  exports.utcMinute = utcMinute;
  exports.utcHour = utcHour;
  exports.utcDay = utcDay;
  exports.utcSunday = utcSunday;
  exports.utcMonday = utcMonday;
  exports.utcTuesday = utcTuesday;
  exports.utcWednesday = utcWednesday;
  exports.utcThursday = utcThursday;
  exports.utcFriday = utcFriday;
  exports.utcSaturday = utcSaturday;
  exports.utcWeek = utcSunday;
  exports.utcMonth = utcMonth;
  exports.utcYear = utcYear;
  exports.interval = newInterval;

}));
},{}],3:[function(require,module,exports){
var util = require('../util'),
    time = require('../time'),
    EPSILON = 1e-15;

function bins(opt) {
  if (!opt) { throw Error("Missing binning options."); }

  // determine range
  var maxb = opt.maxbins || 15,
      base = opt.base || 10,
      logb = Math.log(base),
      div = opt.div || [5, 2],
      min = opt.min,
      max = opt.max,
      span = max - min,
      step, level, minstep, precision, v, i, eps;

  if (opt.step) {
    // if step size is explicitly given, use that
    step = opt.step;
  } else if (opt.steps) {
    // if provided, limit choice to acceptable step sizes
    step = opt.steps[Math.min(
      opt.steps.length - 1,
      bisect(opt.steps, span/maxb, 0, opt.steps.length)
    )];
  } else {
    // else use span to determine step size
    level = Math.ceil(Math.log(maxb) / logb);
    minstep = opt.minstep || 0;
    step = Math.max(
      minstep,
      Math.pow(base, Math.round(Math.log(span) / logb) - level)
    );

    // increase step size if too many bins
    do { step *= base; } while (Math.ceil(span/step) > maxb);

    // decrease step size if allowed
    for (i=0; i<div.length; ++i) {
      v = step / div[i];
      if (v >= minstep && span / v <= maxb) step = v;
    }
  }

  // update precision, min and max
  v = Math.log(step);
  precision = v >= 0 ? 0 : ~~(-v / logb) + 1;
  eps = Math.pow(base, -precision - 1);
  min = Math.min(min, Math.floor(min / step + eps) * step);
  max = Math.ceil(max / step) * step;

  return {
    start: min,
    stop:  max,
    step:  step,
    unit:  {precision: precision},
    value: value,
    index: index
  };
}

function bisect(a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (util.cmp(a[mid], x) < 0) { lo = mid + 1; }
    else { hi = mid; }
  }
  return lo;
}

function value(v) {
  return this.step * Math.floor(v / this.step + EPSILON);
}

function index(v) {
  return Math.floor((v - this.start) / this.step + EPSILON);
}

function date_value(v) {
  return this.unit.date(value.call(this, v));
}

function date_index(v) {
  return index.call(this, this.unit.unit(v));
}

bins.date = function(opt) {
  if (!opt) { throw Error("Missing date binning options."); }

  // find time step, then bin
  var units = opt.utc ? time.utc : time,
      dmin = opt.min,
      dmax = opt.max,
      maxb = opt.maxbins || 20,
      minb = opt.minbins || 4,
      span = (+dmax) - (+dmin),
      unit = opt.unit ? units[opt.unit] : units.find(span, minb, maxb),
      spec = bins({
        min:     unit.min != null ? unit.min : unit.unit(dmin),
        max:     unit.max != null ? unit.max : unit.unit(dmax),
        maxbins: maxb,
        minstep: unit.minstep,
        steps:   unit.step
      });

  spec.unit = unit;
  spec.index = date_index;
  if (!opt.raw) spec.value = date_value;
  return spec;
};

module.exports = bins;

},{"../time":5,"../util":6}],4:[function(require,module,exports){
var util = require('./util'),
    gen = module.exports = {};

gen.repeat = function(val, n) {
  var a = Array(n), i;
  for (i=0; i<n; ++i) a[i] = val;
  return a;
};

gen.zeros = function(n) {
  return gen.repeat(0, n);
};

gen.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error('Infinite range');
  var range = [], i = -1, j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};

gen.random = {};

gen.random.uniform = function(min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }
  var d = max - min;
  var f = function() {
    return min + d * Math.random();
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x >= min && x <= max) ? 1/d : 0;
  };
  f.cdf = function(x) {
    return x < min ? 0 : x > max ? 1 : (x - min) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? min + p*d : NaN;
  };
  return f;
};

gen.random.integer = function(a, b) {
  if (b === undefined) {
    b = a;
    a = 0;
  }
  var d = b - a;
  var f = function() {
    return a + Math.floor(d * Math.random());
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x === Math.floor(x) && x >= a && x < b) ? 1/d : 0;
  };
  f.cdf = function(x) {
    var v = Math.floor(x);
    return v < a ? 0 : v >= b ? 1 : (v - a + 1) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? a - 1 + Math.floor(p*d) : NaN;
  };
  return f;
};

gen.random.normal = function(mean, stdev) {
  mean = mean || 0;
  stdev = stdev || 1;
  var next;
  var f = function() {
    var x = 0, y = 0, rds, c;
    if (next !== undefined) {
      x = next;
      next = undefined;
      return x;
    }
    do {
      x = Math.random()*2-1;
      y = Math.random()*2-1;
      rds = x*x + y*y;
    } while (rds === 0 || rds > 1);
    c = Math.sqrt(-2*Math.log(rds)/rds); // Box-Muller transform
    next = mean + y*c*stdev;
    return mean + x*c*stdev;
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    var exp = Math.exp(Math.pow(x-mean, 2) / (-2 * Math.pow(stdev, 2)));
    return (1 / (stdev * Math.sqrt(2*Math.PI))) * exp;
  };
  f.cdf = function(x) {
    // Approximation from West (2009)
    // Better Approximations to Cumulative Normal Functions
    var cd,
        z = (x - mean) / stdev,
        Z = Math.abs(z);
    if (Z > 37) {
      cd = 0;
    } else {
      var sum, exp = Math.exp(-Z*Z/2);
      if (Z < 7.07106781186547) {
        sum = 3.52624965998911e-02 * Z + 0.700383064443688;
        sum = sum * Z + 6.37396220353165;
        sum = sum * Z + 33.912866078383;
        sum = sum * Z + 112.079291497871;
        sum = sum * Z + 221.213596169931;
        sum = sum * Z + 220.206867912376;
        cd = exp * sum;
        sum = 8.83883476483184e-02 * Z + 1.75566716318264;
        sum = sum * Z + 16.064177579207;
        sum = sum * Z + 86.7807322029461;
        sum = sum * Z + 296.564248779674;
        sum = sum * Z + 637.333633378831;
        sum = sum * Z + 793.826512519948;
        sum = sum * Z + 440.413735824752;
        cd = cd / sum;
      } else {
        sum = Z + 0.65;
        sum = Z + 4 / sum;
        sum = Z + 3 / sum;
        sum = Z + 2 / sum;
        sum = Z + 1 / sum;
        cd = exp / sum / 2.506628274631;
      }
    }
    return z > 0 ? 1 - cd : cd;
  };
  f.icdf = function(p) {
    // Approximation of Probit function using inverse error function.
    if (p <= 0 || p >= 1) return NaN;
    var x = 2*p - 1,
        v = (8 * (Math.PI - 3)) / (3 * Math.PI * (4-Math.PI)),
        a = (2 / (Math.PI*v)) + (Math.log(1 - Math.pow(x,2)) / 2),
        b = Math.log(1 - (x*x)) / v,
        s = (x > 0 ? 1 : -1) * Math.sqrt(Math.sqrt((a*a) - b) - a);
    return mean + stdev * Math.SQRT2 * s;
  };
  return f;
};

gen.random.bootstrap = function(domain, smooth) {
  // Generates a bootstrap sample from a set of observations.
  // Smooth bootstrapping adds random zero-centered noise to the samples.
  var val = domain.filter(util.isValid),
      len = val.length,
      err = smooth ? gen.random.normal(0, smooth) : null;
  var f = function() {
    return val[~~(Math.random()*len)] + (err ? err() : 0);
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  return f;
};
},{"./util":6}],5:[function(require,module,exports){
var d3_time = require('d3-time');

var tempDate = new Date(),
    baseDate = new Date(0, 0, 1).setFullYear(0), // Jan 1, 0 AD
    utcBaseDate = new Date(Date.UTC(0, 0, 1)).setUTCFullYear(0);

function date(d) {
  return (tempDate.setTime(+d), tempDate);
}

// create a time unit entry
function entry(type, date, unit, step, min, max) {
  var e = {
    type: type,
    date: date,
    unit: unit
  };
  if (step) {
    e.step = step;
  } else {
    e.minstep = 1;
  }
  if (min != null) e.min = min;
  if (max != null) e.max = max;
  return e;
}

function create(type, unit, base, step, min, max) {
  return entry(type,
    function(d) { return unit.offset(base, d); },
    function(d) { return unit.count(base, d); },
    step, min, max);
}

var locale = [
  create('second', d3_time.second, baseDate),
  create('minute', d3_time.minute, baseDate),
  create('hour',   d3_time.hour,   baseDate),
  create('day',    d3_time.day,    baseDate, [1, 7]),
  create('month',  d3_time.month,  baseDate, [1, 3, 6]),
  create('year',   d3_time.year,   baseDate),

  // periodic units
  entry('seconds',
    function(d) { return new Date(1970, 0, 1, 0, 0, d); },
    function(d) { return date(d).getSeconds(); },
    null, 0, 59
  ),
  entry('minutes',
    function(d) { return new Date(1970, 0, 1, 0, d); },
    function(d) { return date(d).getMinutes(); },
    null, 0, 59
  ),
  entry('hours',
    function(d) { return new Date(1970, 0, 1, d); },
    function(d) { return date(d).getHours(); },
    null, 0, 23
  ),
  entry('weekdays',
    function(d) { return new Date(1970, 0, 4+d); },
    function(d) { return date(d).getDay(); },
    [1], 0, 6
  ),
  entry('dates',
    function(d) { return new Date(1970, 0, d); },
    function(d) { return date(d).getDate(); },
    [1], 1, 31
  ),
  entry('months',
    function(d) { return new Date(1970, d % 12, 1); },
    function(d) { return date(d).getMonth(); },
    [1], 0, 11
  )
];

var utc = [
  create('second', d3_time.utcSecond, utcBaseDate),
  create('minute', d3_time.utcMinute, utcBaseDate),
  create('hour',   d3_time.utcHour,   utcBaseDate),
  create('day',    d3_time.utcDay,    utcBaseDate, [1, 7]),
  create('month',  d3_time.utcMonth,  utcBaseDate, [1, 3, 6]),
  create('year',   d3_time.utcYear,   utcBaseDate),

  // periodic units
  entry('seconds',
    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, 0, d)); },
    function(d) { return date(d).getUTCSeconds(); },
    null, 0, 59
  ),
  entry('minutes',
    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, d)); },
    function(d) { return date(d).getUTCMinutes(); },
    null, 0, 59
  ),
  entry('hours',
    function(d) { return new Date(Date.UTC(1970, 0, 1, d)); },
    function(d) { return date(d).getUTCHours(); },
    null, 0, 23
  ),
  entry('weekdays',
    function(d) { return new Date(Date.UTC(1970, 0, 4+d)); },
    function(d) { return date(d).getUTCDay(); },
    [1], 0, 6
  ),
  entry('dates',
    function(d) { return new Date(Date.UTC(1970, 0, d)); },
    function(d) { return date(d).getUTCDate(); },
    [1], 1, 31
  ),
  entry('months',
    function(d) { return new Date(Date.UTC(1970, d % 12, 1)); },
    function(d) { return date(d).getUTCMonth(); },
    [1], 0, 11
  )
];

var STEPS = [
  [31536e6, 5],  // 1-year
  [7776e6, 4],   // 3-month
  [2592e6, 4],   // 1-month
  [12096e5, 3],  // 2-week
  [6048e5, 3],   // 1-week
  [1728e5, 3],   // 2-day
  [864e5, 3],    // 1-day
  [432e5, 2],    // 12-hour
  [216e5, 2],    // 6-hour
  [108e5, 2],    // 3-hour
  [36e5, 2],     // 1-hour
  [18e5, 1],     // 30-minute
  [9e5, 1],      // 15-minute
  [3e5, 1],      // 5-minute
  [6e4, 1],      // 1-minute
  [3e4, 0],      // 30-second
  [15e3, 0],     // 15-second
  [5e3, 0],      // 5-second
  [1e3, 0]       // 1-second
];

function find(units, span, minb, maxb) {
  var step = STEPS[0], i, n, bins;

  for (i=1, n=STEPS.length; i<n; ++i) {
    step = STEPS[i];
    if (span > step[0]) {
      bins = span / step[0];
      if (bins > maxb) {
        return units[STEPS[i-1][1]];
      }
      if (bins >= minb) {
        return units[step[1]];
      }
    }
  }
  return units[STEPS[n-1][1]];
}

function toUnitMap(units) {
  var map = {}, i, n;
  for (i=0, n=units.length; i<n; ++i) {
    map[units[i].type] = units[i];
  }
  map.find = function(span, minb, maxb) {
    return find(units, span, minb, maxb);
  };
  return map;
}

module.exports = toUnitMap(locale);
module.exports.utc = toUnitMap(utc);
},{"d3-time":2}],6:[function(require,module,exports){
var buffer = require('buffer'),
    time = require('./time'),
    utc = time.utc;

var u = module.exports = {};

// utility functions

var FNAME = '__name__';

u.namedfunc = function(name, f) { return (f[FNAME] = name, f); };

u.name = function(f) { return f==null ? null : f[FNAME]; };

u.identity = function(x) { return x; };

u.true = u.namedfunc('true', function() { return true; });

u.false = u.namedfunc('false', function() { return false; });

u.duplicate = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

u.equal = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

u.extend = function(obj) {
  for (var x, name, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (name in x) { obj[name] = x[name]; }
  }
  return obj;
};

u.length = function(x) {
  return x != null && x.length != null ? x.length : null;
};

u.keys = function(x) {
  var keys = [], k;
  for (k in x) keys.push(k);
  return keys;
};

u.vals = function(x) {
  var vals = [], k;
  for (k in x) vals.push(x[k]);
  return vals;
};

u.toMap = function(list, f) {
  return (f = u.$(f)) ?
    list.reduce(function(obj, x) { return (obj[f(x)] = 1, obj); }, {}) :
    list.reduce(function(obj, x) { return (obj[x] = 1, obj); }, {});
};

u.keystr = function(values) {
  // use to ensure consistent key generation across modules
  var n = values.length;
  if (!n) return '';
  for (var s=String(values[0]), i=1; i<n; ++i) {
    s += '|' + String(values[i]);
  }
  return s;
};

// type checking functions

var toString = Object.prototype.toString;

u.isObject = function(obj) {
  return obj === Object(obj);
};

u.isFunction = function(obj) {
  return toString.call(obj) === '[object Function]';
};

u.isString = function(obj) {
  return typeof value === 'string' || toString.call(obj) === '[object String]';
};

u.isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

u.isNumber = function(obj) {
  return typeof obj === 'number' || toString.call(obj) === '[object Number]';
};

u.isBoolean = function(obj) {
  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
};

u.isDate = function(obj) {
  return toString.call(obj) === '[object Date]';
};

u.isValid = function(obj) {
  return obj != null && obj === obj;
};

u.isBuffer = (buffer.Buffer && buffer.Buffer.isBuffer) || u.false;

// type coercion functions

u.number = function(s) {
  return s == null || s === '' ? null : +s;
};

u.boolean = function(s) {
  return s == null || s === '' ? null : s==='false' ? false : !!s;
};

// parse a date with optional d3.time-format format
u.date = function(s, format) {
  var d = format ? format : Date;
  return s == null || s === '' ? null : d.parse(s);
};

u.array = function(x) {
  return x != null ? (u.isArray(x) ? x : [x]) : [];
};

u.str = function(x) {
  return u.isArray(x) ? '[' + x.map(u.str) + ']'
    : u.isObject(x) ? JSON.stringify(x)
    : u.isString(x) ? ('\''+util_escape_str(x)+'\'') : x;
};

var escape_str_re = /(^|[^\\])'/g;

function util_escape_str(x) {
  return x.replace(escape_str_re, '$1\\\'');
}

// data access functions

var field_re = /\[(.*?)\]|[^.\[]+/g;

u.field = function(f) {
  return String(f).match(field_re).map(function(d) {
    return d[0] !== '[' ? d :
      d[1] !== "'" && d[1] !== '"' ? d.slice(1, -1) :
      d.slice(2, -2).replace(/\\(["'])/g, '$1');
  });
};

u.accessor = function(f) {
  var s;
  return f==null || u.isFunction(f) ? f :
    u.namedfunc(f, (s = u.field(f)).length > 1 ?
      function(x) { return s.reduce(function(x,f) { return x[f]; }, x); } :
      function(x) { return x[f]; }
    );
};

// short-cut for accessor
u.$ = u.accessor;

u.mutator = function(f) {
  var s;
  return u.isString(f) && (s=u.field(f)).length > 1 ?
    function(x, v) {
      for (var i=0; i<s.length-1; ++i) x = x[s[i]];
      x[s[i]] = v;
    } :
    function(x, v) { x[f] = v; };
};


u.$func = function(name, op) {
  return function(f) {
    f = u.$(f) || u.identity;
    var n = name + (u.name(f) ? '_'+u.name(f) : '');
    return u.namedfunc(n, function(d) { return op(f(d)); });
  };
};

u.$valid  = u.$func('valid', u.isValid);
u.$length = u.$func('length', u.length);

u.$in = function(f, values) {
  f = u.$(f);
  var map = u.isArray(values) ? u.toMap(values) : values;
  return function(d) { return !!map[f(d)]; };
};

u.$year   = u.$func('year', time.year.unit);
u.$month  = u.$func('month', time.months.unit);
u.$date   = u.$func('date', time.dates.unit);
u.$day    = u.$func('day', time.weekdays.unit);
u.$hour   = u.$func('hour', time.hours.unit);
u.$minute = u.$func('minute', time.minutes.unit);
u.$second = u.$func('second', time.seconds.unit);

u.$utcYear   = u.$func('utcYear', utc.year.unit);
u.$utcMonth  = u.$func('utcMonth', utc.months.unit);
u.$utcDate   = u.$func('utcDate', utc.dates.unit);
u.$utcDay    = u.$func('utcDay', utc.weekdays.unit);
u.$utcHour   = u.$func('utcHour', utc.hours.unit);
u.$utcMinute = u.$func('utcMinute', utc.minutes.unit);
u.$utcSecond = u.$func('utcSecond', utc.seconds.unit);

// comparison / sorting functions

u.comparator = function(sort) {
  var sign = [];
  if (sort === undefined) sort = [];
  sort = u.array(sort).map(function(f) {
    var s = 1;
    if      (f[0] === '-') { s = -1; f = f.slice(1); }
    else if (f[0] === '+') { s = +1; f = f.slice(1); }
    sign.push(s);
    return u.accessor(f);
  });
  return function(a,b) {
    var i, n, f, x, y;
    for (i=0, n=sort.length; i<n; ++i) {
      f = sort[i]; x = f(a); y = f(b);
      if (x < y) return -1 * sign[i];
      if (x > y) return sign[i];
    }
    return 0;
  };
};

u.cmp = function(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else if (a >= b) {
    return 0;
  } else if (a === null) {
    return -1;
  } else if (b === null) {
    return 1;
  }
  return NaN;
};

u.numcmp = function(a, b) { return a - b; };

u.stablesort = function(array, sortBy, keyFn) {
  var indices = array.reduce(function(idx, v, i) {
    return (idx[keyFn(v)] = i, idx);
  }, {});

  array.sort(function(a, b) {
    var sa = sortBy(a),
        sb = sortBy(b);
    return sa < sb ? -1 : sa > sb ? 1
         : (indices[keyFn(a)] - indices[keyFn(b)]);
  });

  return array;
};


// string functions

u.pad = function(s, length, pos, padchar) {
  padchar = padchar || " ";
  var d = length - s.length;
  if (d <= 0) return s;
  switch (pos) {
    case 'left':
      return strrep(d, padchar) + s;
    case 'middle':
    case 'center':
      return strrep(Math.floor(d/2), padchar) +
         s + strrep(Math.ceil(d/2), padchar);
    default:
      return s + strrep(d, padchar);
  }
};

function strrep(n, str) {
  var s = "", i;
  for (i=0; i<n; ++i) s += str;
  return s;
}

u.truncate = function(s, length, pos, word, ellipsis) {
  var len = s.length;
  if (len <= length) return s;
  ellipsis = ellipsis !== undefined ? String(ellipsis) : '\u2026';
  var l = Math.max(0, length - ellipsis.length);

  switch (pos) {
    case 'left':
      return ellipsis + (word ? truncateOnWord(s,l,1) : s.slice(len-l));
    case 'middle':
    case 'center':
      var l1 = Math.ceil(l/2), l2 = Math.floor(l/2);
      return (word ? truncateOnWord(s,l1) : s.slice(0,l1)) +
        ellipsis + (word ? truncateOnWord(s,l2,1) : s.slice(len-l2));
    default:
      return (word ? truncateOnWord(s,l) : s.slice(0,l)) + ellipsis;
  }
};

function truncateOnWord(s, len, rev) {
  var cnt = 0, tok = s.split(truncate_word_re);
  if (rev) {
    s = (tok = tok.reverse())
      .filter(function(w) { cnt += w.length; return cnt <= len; })
      .reverse();
  } else {
    s = tok.filter(function(w) { cnt += w.length; return cnt <= len; });
  }
  return s.length ? s.join('').trim() : tok[0].slice(0, len);
}

var truncate_word_re = /([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/;

},{"./time":5,"buffer":1}],7:[function(require,module,exports){
exports.AGGREGATE_OPS = [
    'values', 'count', 'valid', 'missing', 'distinct',
    'sum', 'mean', 'average', 'variance', 'variancep', 'stdev',
    'stdevp', 'median', 'q1', 'q3', 'modeskew', 'min', 'max',
    'argmin', 'argmax'
];
exports.SHARED_DOMAIN_OPS = [
    'mean', 'average', 'stdev', 'stdevp', 'median', 'q1', 'q3', 'min', 'max'
];

},{}],8:[function(require,module,exports){
var channel_1 = require('./channel');
function autoMaxBins(channel) {
    switch (channel) {
        case channel_1.ROW:
        case channel_1.COLUMN:
        case channel_1.SHAPE:
            return 6;
        default:
            return 10;
    }
}
exports.autoMaxBins = autoMaxBins;

},{"./channel":9}],9:[function(require,module,exports){
(function (Channel) {
    Channel[Channel["X"] = 'x'] = "X";
    Channel[Channel["Y"] = 'y'] = "Y";
    Channel[Channel["ROW"] = 'row'] = "ROW";
    Channel[Channel["COLUMN"] = 'column'] = "COLUMN";
    Channel[Channel["SHAPE"] = 'shape'] = "SHAPE";
    Channel[Channel["SIZE"] = 'size'] = "SIZE";
    Channel[Channel["COLOR"] = 'color'] = "COLOR";
    Channel[Channel["TEXT"] = 'text'] = "TEXT";
    Channel[Channel["DETAIL"] = 'detail'] = "DETAIL";
})(exports.Channel || (exports.Channel = {}));
var Channel = exports.Channel;
exports.X = Channel.X;
exports.Y = Channel.Y;
exports.ROW = Channel.ROW;
exports.COLUMN = Channel.COLUMN;
exports.SHAPE = Channel.SHAPE;
exports.SIZE = Channel.SIZE;
exports.COLOR = Channel.COLOR;
exports.TEXT = Channel.TEXT;
exports.DETAIL = Channel.DETAIL;
exports.CHANNELS = [exports.X, exports.Y, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.TEXT, exports.DETAIL];
;
function supportMark(channel, mark) {
    return !!getSupportedMark(channel)[mark];
}
exports.supportMark = supportMark;
function getSupportedMark(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
            return {
                point: true, tick: true, circle: true, square: true,
                bar: true, line: true, area: true
            };
        case exports.ROW:
        case exports.COLUMN:
            return {
                point: true, tick: true, circle: true, square: true,
                bar: true, line: true, area: true, text: true
            };
        case exports.SIZE:
            return {
                point: true, tick: true, circle: true, square: true,
                bar: true, text: true
            };
        case exports.COLOR:
        case exports.DETAIL:
            return {
                point: true, tick: true, circle: true, square: true,
                bar: true, line: true, area: true, text: true
            };
        case exports.SHAPE:
            return { point: true };
        case exports.TEXT:
            return { text: true };
    }
    return {};
}
exports.getSupportedMark = getSupportedMark;
;
function getSupportedRole(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.COLOR:
            return {
                measure: true,
                dimension: true
            };
        case exports.ROW:
        case exports.COLUMN:
        case exports.SHAPE:
        case exports.DETAIL:
            return {
                measure: false,
                dimension: true
            };
        case exports.SIZE:
        case exports.TEXT:
            return {
                measure: true,
                dimension: false
            };
    }
    throw new Error('Invalid encoding channel' + channel);
}
exports.getSupportedRole = getSupportedRole;

},{}],10:[function(require,module,exports){
var channel_1 = require('../channel');
var data_1 = require('../data');
var vlFieldDef = require('../fielddef');
var vlEncoding = require('../encoding');
var layout_1 = require('./layout');
var mark_1 = require('../mark');
var schema = require('../schema/schema');
var schemaUtil = require('../schema/schemautil');
var type_1 = require('../type');
var util_1 = require('../util');
var time = require('./time');
var Model = (function () {
    function Model(spec, theme) {
        var defaults = schema.instantiate();
        this._spec = schemaUtil.merge(defaults, theme || {}, spec);
        vlEncoding.forEach(this._spec.encoding, function (fieldDef, channel) {
            if (fieldDef.type) {
                fieldDef.type = type_1.getFullName(fieldDef.type);
            }
        });
        this._stack = this.getStackProperties();
        this._layout = layout_1.compileLayout(this);
    }
    Model.prototype.getStackProperties = function () {
        var stackChannel = (this.has(channel_1.COLOR)) ? channel_1.COLOR : (this.has(channel_1.DETAIL)) ? channel_1.DETAIL : null;
        if (stackChannel &&
            (this.is(mark_1.BAR) || this.is(mark_1.AREA)) &&
            this.config('stack') !== false &&
            this.isAggregate()) {
            var isXMeasure = this.isMeasure(channel_1.X);
            var isYMeasure = this.isMeasure(channel_1.Y);
            if (isXMeasure && !isYMeasure) {
                return {
                    groupbyChannel: channel_1.Y,
                    fieldChannel: channel_1.X,
                    stackChannel: stackChannel,
                    config: this.config('stack')
                };
            }
            else if (isYMeasure && !isXMeasure) {
                return {
                    groupbyChannel: channel_1.X,
                    fieldChannel: channel_1.Y,
                    stackChannel: stackChannel,
                    config: this.config('stack')
                };
            }
        }
        return null;
    };
    Model.prototype.layout = function () {
        return this._layout;
    };
    Model.prototype.stack = function () {
        return this._stack;
    };
    Model.prototype.toSpec = function (excludeConfig, excludeData) {
        var encoding = util_1.duplicate(this._spec.encoding), spec;
        spec = {
            mark: this._spec.mark,
            encoding: encoding
        };
        if (!excludeConfig) {
            spec.config = util_1.duplicate(this._spec.config);
        }
        if (!excludeData) {
            spec.data = util_1.duplicate(this._spec.data);
        }
        var defaults = schema.instantiate();
        return schemaUtil.subtract(spec, defaults);
    };
    Model.prototype.mark = function () {
        return this._spec.mark;
    };
    Model.prototype.spec = function () {
        return this._spec;
    };
    Model.prototype.is = function (mark) {
        return this._spec.mark === mark;
    };
    Model.prototype.has = function (channel) {
        return this._spec.encoding[channel].field !== undefined;
    };
    Model.prototype.fieldDef = function (channel) {
        return this._spec.encoding[channel];
    };
    Model.prototype.field = function (channel, opt) {
        opt = opt || {};
        var fieldDef = this.fieldDef(channel);
        var f = (opt.datum ? 'datum.' : '') + (opt.prefn || ''), field = fieldDef.field;
        if (vlFieldDef.isCount(fieldDef)) {
            return f + 'count';
        }
        else if (opt.fn) {
            return f + opt.fn + '_' + field;
        }
        else if (!opt.nofn && fieldDef.bin) {
            var binSuffix = opt.binSuffix || '_start';
            return f + 'bin_' + field + binSuffix;
        }
        else if (!opt.nofn && !opt.noAggregate && fieldDef.aggregate) {
            return f + fieldDef.aggregate + '_' + field;
        }
        else if (!opt.nofn && fieldDef.timeUnit) {
            return f + fieldDef.timeUnit + '_' + field;
        }
        else {
            return f + field;
        }
    };
    Model.prototype.fieldTitle = function (channel) {
        if (vlFieldDef.isCount(this._spec.encoding[channel])) {
            return vlFieldDef.COUNT_DISPLAYNAME;
        }
        var fn = this._spec.encoding[channel].aggregate || this._spec.encoding[channel].timeUnit || (this._spec.encoding[channel].bin && 'bin');
        if (fn) {
            return fn.toUpperCase() + '(' + this._spec.encoding[channel].field + ')';
        }
        else {
            return this._spec.encoding[channel].field;
        }
    };
    Model.prototype.numberFormat = function (channel) {
        return this.config('numberFormat');
    };
    ;
    Model.prototype.map = function (f) {
        return vlEncoding.map(this._spec.encoding, f);
    };
    Model.prototype.reduce = function (f, init) {
        return vlEncoding.reduce(this._spec.encoding, f, init);
    };
    Model.prototype.forEach = function (f) {
        return vlEncoding.forEach(this._spec.encoding, f);
    };
    Model.prototype.isOrdinalScale = function (channel) {
        var fieldDef = this.fieldDef(channel);
        return fieldDef && (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) ||
            (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit &&
                time.scale.type(fieldDef.timeUnit, channel) === 'ordinal'));
    };
    Model.prototype.isDimension = function (channel) {
        return this.has(channel) &&
            vlFieldDef.isDimension(this.fieldDef(channel));
    };
    Model.prototype.isMeasure = function (channel) {
        return this.has(channel) &&
            vlFieldDef.isMeasure(this.fieldDef(channel));
    };
    Model.prototype.isAggregate = function () {
        return vlEncoding.isAggregate(this._spec.encoding);
    };
    Model.prototype.isFacet = function () {
        return this.has(channel_1.ROW) || this.has(channel_1.COLUMN);
    };
    Model.prototype.dataTable = function () {
        return this.isAggregate() ? data_1.SUMMARY : data_1.SOURCE;
    };
    Model.prototype.data = function () {
        return this._spec.data;
    };
    Model.prototype.hasValues = function () {
        var vals = this.data().values;
        return vals && vals.length;
    };
    Model.prototype.config = function (name) {
        return this._spec.config[name];
    };
    Model.prototype.markOpacity = function () {
        var opacity = this.config('marks').opacity;
        if (opacity) {
            return opacity;
        }
        else {
            if (util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], this.mark())) {
                if (!this.isAggregate() || this.has(channel_1.DETAIL)) {
                    return 0.7;
                }
            }
        }
        return undefined;
    };
    return Model;
})();
exports.Model = Model;

},{"../channel":9,"../data":21,"../encoding":22,"../fielddef":23,"../mark":24,"../schema/schema":37,"../schema/schemautil":38,"../type":43,"../util":44,"./layout":15,"./time":20}],11:[function(require,module,exports){
var util_1 = require('../util');
var type_1 = require('../type');
var channel_1 = require('../channel');
var time = require('./time');
function compileAxis(channel, model) {
    var isCol = channel === channel_1.COLUMN, isRow = channel === channel_1.ROW, type = isCol ? 'x' : isRow ? 'y' : channel;
    var def = {
        type: type,
        scale: channel
    };
    [
        'format', 'grid', 'layer', 'orient', 'tickSize', 'ticks', 'title',
        'offset', 'tickPadding', 'tickSize', 'tickSizeMajor', 'tickSizeMinor', 'tickSizeEnd',
        'titleOffset', 'values', 'subdivide'
    ].forEach(function (property) {
        var method;
        var value = (method = exports[property]) ?
            method(model, channel, def) :
            model.fieldDef(channel).axis[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    var props = model.fieldDef(channel).axis.properties || {};
    [
        'axis', 'labels',
        'grid', 'title', 'ticks', 'majorTicks', 'minorTicks'
    ].forEach(function (group) {
        var value = properties[group] ?
            properties[group](model, channel, props[group], def) :
            props[group];
        if (value !== undefined) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.compileAxis = compileAxis;
function format(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var format = fieldDef.axis.format;
    if (format !== undefined) {
        return format;
    }
    if (fieldDef.type === type_1.QUANTITATIVE) {
        return model.numberFormat(channel);
    }
    else if (fieldDef.type === type_1.TEMPORAL) {
        var timeUnit = fieldDef.timeUnit;
        if (!timeUnit) {
            return model.config('timeFormat');
        }
        else if (timeUnit === 'year') {
            return 'd';
        }
    }
    return undefined;
}
exports.format = format;
function grid(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var grid = fieldDef.axis.grid;
    if (grid !== undefined) {
        return grid;
    }
    return !model.isOrdinalScale(channel) && !fieldDef.bin;
}
exports.grid = grid;
function layer(model, channel, def) {
    var layer = model.fieldDef(channel).axis.layer;
    if (layer !== undefined) {
        return layer;
    }
    if (def.grid) {
        return 'back';
    }
    return undefined;
}
exports.layer = layer;
;
function orient(model, channel) {
    var orient = model.fieldDef(channel).axis.orient;
    if (orient) {
        return orient;
    }
    else if (channel === channel_1.COLUMN) {
        return 'top';
    }
    else if (channel === channel_1.ROW) {
        if (model.has(channel_1.Y) && model.fieldDef(channel_1.Y).axis.orient !== 'right') {
            return 'right';
        }
    }
    return undefined;
}
exports.orient = orient;
function ticks(model, channel) {
    var ticks = model.fieldDef(channel).axis.ticks;
    if (ticks !== undefined) {
        return ticks;
    }
    if (channel === channel_1.X && !model.fieldDef(channel).bin) {
        return 5;
    }
    return undefined;
}
exports.ticks = ticks;
function tickSize(model, channel) {
    var tickSize = model.fieldDef(channel).axis.tickSize;
    if (tickSize !== undefined) {
        return tickSize;
    }
    if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
        return 0;
    }
    return undefined;
}
exports.tickSize = tickSize;
function title(model, channel) {
    var axisSpec = model.fieldDef(channel).axis;
    if (axisSpec.title !== undefined) {
        return axisSpec.title;
    }
    var fieldTitle = model.fieldTitle(channel);
    var layout = model.layout();
    var maxLength;
    if (axisSpec.titleMaxLength) {
        maxLength = axisSpec.titleMaxLength;
    }
    else if (channel === channel_1.X && typeof layout.cellWidth === 'number') {
        maxLength = layout.cellWidth / model.config('characterWidth');
    }
    else if (channel === channel_1.Y && typeof layout.cellHeight === 'number') {
        maxLength = layout.cellHeight / model.config('characterWidth');
    }
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
var properties;
(function (properties) {
    function axis(model, channel, spec) {
        if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
            return util_1.extend({
                opacity: { value: 0 }
            }, spec || {});
        }
        return spec || undefined;
    }
    properties.axis = axis;
    function labels(model, channel, spec, def) {
        var fieldDef = model.fieldDef(channel);
        var filterName = time.labelTemplate(fieldDef.timeUnit, fieldDef.axis.shortTimeNames);
        if (fieldDef.type === type_1.TEMPORAL && filterName) {
            spec = util_1.extend({
                text: { template: '{{datum.data | ' + filterName + '}}' }
            }, spec || {});
        }
        if (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) && fieldDef.axis.labelMaxLength) {
            spec = util_1.extend({
                text: {
                    template: '{{ datum.data | truncate:' + fieldDef.axis.labelMaxLength + '}}'
                }
            }, spec || {});
        }
        switch (channel) {
            case channel_1.X:
                if (model.isDimension(channel_1.X) || fieldDef.type === type_1.TEMPORAL) {
                    spec = util_1.extend({
                        angle: { value: 270 },
                        align: { value: def.orient === 'top' ? 'left' : 'right' },
                        baseline: { value: 'middle' }
                    }, spec || {});
                }
                break;
            case channel_1.ROW:
                if (def.orient === 'right') {
                    spec = util_1.extend({
                        angle: { value: 90 },
                        align: { value: 'center' },
                        baseline: { value: 'bottom' }
                    }, spec || {});
                }
        }
        return spec || undefined;
    }
    properties.labels = labels;
})(properties || (properties = {}));

},{"../channel":9,"../type":43,"../util":44,"./time":20}],12:[function(require,module,exports){
var Model_1 = require('./Model');
var axis_1 = require('./axis');
var data_1 = require('./data');
var facet_1 = require('./facet');
var legend_1 = require('./legend');
var marks_1 = require('./marks');
var scale_1 = require('./scale');
var util_1 = require('../util');
var data_2 = require('../data');
var channel_1 = require('../channel');
var Model_2 = require('./Model');
exports.Model = Model_2.Model;
function compile(spec, theme) {
    var model = new Model_1.Model(spec, theme);
    var layout = model.layout();
    var rootGroup = util_1.extend({
        name: spec.name ? spec.name + '_root' : 'root',
        type: 'group',
    }, spec.description ? { description: spec.description } : {}, {
        from: { data: data_2.LAYOUT },
        properties: {
            update: {
                width: layout.width.field ?
                    { field: layout.width.field } :
                    { value: layout.width },
                height: layout.height.field ?
                    { field: layout.height.field } :
                    { value: layout.height }
            }
        }
    });
    var marks = marks_1.compileMarks(model);
    if (model.has(channel_1.ROW) || model.has(channel_1.COLUMN)) {
        util_1.extend(rootGroup, facet_1.facetMixins(model, marks));
    }
    else {
        rootGroup.marks = marks.map(function (mark) {
            mark.from = mark.from || {};
            mark.from.data = model.dataTable();
            return mark;
        });
        var scaleNames = model.map(function (_, channel) {
            return channel;
        });
        rootGroup.scales = scale_1.compileScales(scaleNames, model);
        var axes = (model.has(channel_1.X) ? [axis_1.compileAxis(channel_1.X, model)] : [])
            .concat(model.has(channel_1.Y) ? [axis_1.compileAxis(channel_1.Y, model)] : []);
        if (axes.length > 0) {
            rootGroup.axes = axes;
        }
    }
    var legends = legend_1.compileLegends(model);
    if (legends.length > 0) {
        rootGroup.legends = legends;
    }
    var FIT = 1;
    var output = util_1.extend(spec.name ? { name: spec.name } : {}, {
        width: layout.width.field ? FIT : layout.width,
        height: layout.height.field ? FIT : layout.height,
        padding: 'auto'
    }, ['viewport', 'background', 'scene'].reduce(function (topLevelConfig, property) {
        var value = model.config(property);
        if (value !== undefined) {
            topLevelConfig[property] = value;
        }
        return topLevelConfig;
    }, {}), {
        data: data_1.compileData(model),
        marks: [rootGroup]
    });
    return {
        spec: output
    };
}
exports.compile = compile;

},{"../channel":9,"../data":21,"../util":44,"./Model":10,"./axis":11,"./data":13,"./facet":14,"./legend":16,"./marks":17,"./scale":18}],13:[function(require,module,exports){
var vlFieldDef = require('../fielddef');
var util_1 = require('../util');
var bin_1 = require('../bin');
var channel_1 = require('../channel');
var data_1 = require('../data');
var time = require('./time');
var type_1 = require('../type');
function compileData(model) {
    var def = [source.def(model)];
    var summaryDef = summary.def(model);
    if (summaryDef) {
        def.push(summaryDef);
    }
    filterNonPositiveForLog(def[def.length - 1], model);
    var statsDef = layout.def(model);
    if (statsDef) {
        def.push(statsDef);
    }
    var stackDef = model.stack();
    if (stackDef) {
        def.push(stack.def(model, stackDef));
    }
    return def;
}
exports.compileData = compileData;
var source;
(function (source_1) {
    function def(model) {
        var source = { name: data_1.SOURCE };
        if (model.hasValues()) {
            source.values = model.data().values;
            source.format = { type: 'json' };
        }
        else {
            source.url = model.data().url;
            source.format = { type: model.data().formatType };
        }
        var parse = formatParse(model);
        if (parse) {
            source.format.parse = parse;
        }
        source.transform = transform(model);
        return source;
    }
    source_1.def = def;
    function formatParse(model) {
        var calcFieldMap = (model.data().calculate || []).reduce(function (fieldMap, formula) {
            fieldMap[formula.field] = true;
            return fieldMap;
        }, {});
        var parse;
        model.forEach(function (fieldDef) {
            if (fieldDef.type === type_1.TEMPORAL) {
                parse = parse || {};
                parse[fieldDef.field] = 'date';
            }
            else if (fieldDef.type === type_1.QUANTITATIVE) {
                if (vlFieldDef.isCount(fieldDef) || calcFieldMap[fieldDef.field]) {
                    return;
                }
                parse = parse || {};
                parse[fieldDef.field] = 'number';
            }
        });
        return parse;
    }
    function transform(model) {
        return nullFilterTransform(model).concat(formulaTransform(model), timeTransform(model), binTransform(model), filterTransform(model));
    }
    source_1.transform = transform;
    function timeTransform(model) {
        return model.reduce(function (transform, fieldDef, channel) {
            if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
                var field = model.field(channel, { nofn: true, datum: true });
                transform.push({
                    type: 'formula',
                    field: model.field(channel),
                    expr: time.formula(fieldDef.timeUnit, field)
                });
            }
            return transform;
        }, []);
    }
    source_1.timeTransform = timeTransform;
    function binTransform(model) {
        return model.reduce(function (transform, fieldDef, channel) {
            var bin = model.fieldDef(channel).bin;
            if (bin) {
                var binTrans = util_1.extend({
                    type: 'bin',
                    field: fieldDef.field,
                    output: {
                        start: model.field(channel, { binSuffix: '_start' }),
                        mid: model.field(channel, { binSuffix: '_mid' }),
                        end: model.field(channel, { binSuffix: '_end' })
                    }
                }, typeof bin === 'boolean' ? {} : bin);
                if (!binTrans.maxbins && !binTrans.step) {
                    binTrans.maxbins = bin_1.autoMaxBins(channel);
                }
                transform.push(binTrans);
            }
            return transform;
        }, []);
    }
    source_1.binTransform = binTransform;
    function nullFilterTransform(model) {
        var filterNull = model.config('filterNull');
        var filteredFields = util_1.keys(model.reduce(function (aggregator, fieldDef) {
            if (fieldDef.field && fieldDef.field !== '*' && filterNull[fieldDef.type]) {
                aggregator[fieldDef.field] = true;
            }
            return aggregator;
        }, {}));
        return filteredFields.length > 0 ?
            [{
                    type: 'filter',
                    test: filteredFields.map(function (fieldName) {
                        return 'datum.' + fieldName + '!==null';
                    }).join(' && ')
                }] : [];
    }
    source_1.nullFilterTransform = nullFilterTransform;
    function filterTransform(model) {
        var filter = model.data().filter;
        return filter ? [{
                type: 'filter',
                test: filter
            }] : [];
    }
    source_1.filterTransform = filterTransform;
    function formulaTransform(model) {
        return (model.data().calculate || []).reduce(function (transform, formula) {
            transform.push(util_1.extend({ type: 'formula' }, formula));
            return transform;
        }, []);
    }
    source_1.formulaTransform = formulaTransform;
})(source = exports.source || (exports.source = {}));
var layout;
(function (layout_1) {
    function def(model) {
        var summarize = [];
        var formulas = [];
        if (model.has(channel_1.X) && model.isOrdinalScale(channel_1.X)) {
            var xScale = model.fieldDef(channel_1.X).scale;
            var xHasDomain = xScale.domain instanceof Array;
            if (!xHasDomain) {
                summarize.push({
                    field: model.field(channel_1.X),
                    ops: ['distinct']
                });
            }
            var xCardinality = xHasDomain ? xScale.domain.length :
                model.field(channel_1.X, { datum: true, prefn: 'distinct_' });
            formulas.push({
                type: 'formula',
                field: 'cellWidth',
                expr: '(' + xCardinality + ' + ' + xScale.padding + ') * ' + xScale.bandWidth
            });
        }
        if (model.has(channel_1.Y) && model.isOrdinalScale(channel_1.Y)) {
            var yScale = model.fieldDef(channel_1.Y).scale;
            var yHasDomain = yScale.domain instanceof Array;
            if (!yHasDomain) {
                summarize.push({
                    field: model.field(channel_1.Y),
                    ops: ['distinct']
                });
            }
            var yCardinality = yHasDomain ? yScale.domain.length :
                model.field(channel_1.Y, { datum: true, prefn: 'distinct_' });
            formulas.push({
                type: 'formula',
                field: 'cellHeight',
                expr: '(' + yCardinality + ' + ' + yScale.padding + ') * ' + yScale.bandWidth
            });
        }
        var cellPadding = model.config('cell').padding;
        var layout = model.layout();
        if (model.has(channel_1.COLUMN)) {
            var cellWidth = layout.cellWidth.field ?
                'datum.' + layout.cellWidth.field :
                layout.cellWidth;
            var colScale = model.fieldDef(channel_1.COLUMN).scale;
            var colHasDomain = colScale.domain instanceof Array;
            if (!colHasDomain) {
                summarize.push({
                    field: model.field(channel_1.COLUMN),
                    ops: ['distinct']
                });
            }
            var colCardinality = colHasDomain ? colScale.domain.length :
                model.field(channel_1.COLUMN, { datum: true, prefn: 'distinct_' });
            formulas.push({
                type: 'formula',
                field: 'width',
                expr: cellWidth + ' * ' + colCardinality + ' + ' +
                    '(' + colCardinality + ' - 1) * ' + cellPadding
            });
        }
        if (model.has(channel_1.ROW)) {
            var cellHeight = layout.cellHeight.field ?
                'datum.' + layout.cellHeight.field :
                layout.cellHeight;
            var rowScale = model.fieldDef(channel_1.ROW).scale;
            var rowHasDomain = rowScale.domain instanceof Array;
            if (!rowHasDomain) {
                summarize.push({
                    field: model.field(channel_1.ROW),
                    ops: ['distinct']
                });
            }
            var rowCardinality = rowHasDomain ? rowScale.domain.length :
                model.field(channel_1.ROW, { datum: true, prefn: 'distinct_' });
            formulas.push({
                type: 'formula',
                field: 'height',
                expr: cellHeight + ' * ' + rowCardinality + ' + ' +
                    '(' + rowCardinality + ' - 1) * ' + cellPadding
            });
        }
        if (formulas.length > 0) {
            return summarize.length > 0 ? {
                name: data_1.LAYOUT,
                source: model.dataTable(),
                transform: [{
                        type: 'aggregate',
                        summarize: summarize
                    }].concat(formulas)
            } : {
                name: data_1.LAYOUT,
                values: [{}],
                transform: formulas
            };
        }
        return null;
    }
    layout_1.def = def;
})(layout = exports.layout || (exports.layout = {}));
var summary;
(function (summary) {
    function def(model) {
        var dims = {};
        var meas = {};
        var hasAggregate = false;
        model.forEach(function (fieldDef, channel) {
            if (fieldDef.aggregate) {
                hasAggregate = true;
                if (fieldDef.aggregate === 'count') {
                    meas['*'] = meas['*'] || {};
                    meas['*'].count = true;
                }
                else {
                    meas[fieldDef.field] = meas[fieldDef.field] || {};
                    meas[fieldDef.field][fieldDef.aggregate] = true;
                }
            }
            else {
                if (fieldDef.bin) {
                    dims[model.field(channel, { binSuffix: '_start' })] = model.field(channel, { binSuffix: '_start' });
                    dims[model.field(channel, { binSuffix: '_mid' })] = model.field(channel, { binSuffix: '_mid' });
                    dims[model.field(channel, { binSuffix: '_end' })] = model.field(channel, { binSuffix: '_end' });
                }
                else {
                    dims[fieldDef.field] = model.field(channel);
                }
            }
        });
        var groupby = util_1.vals(dims);
        var summarize = util_1.reduce(meas, function (aggregator, fnDictSet, field) {
            aggregator[field] = util_1.keys(fnDictSet);
            return aggregator;
        }, {});
        if (hasAggregate) {
            return {
                name: data_1.SUMMARY,
                source: data_1.SOURCE,
                transform: [{
                        type: 'aggregate',
                        groupby: groupby,
                        summarize: summarize
                    }]
            };
        }
        return null;
    }
    summary.def = def;
    ;
})(summary = exports.summary || (exports.summary = {}));
var stack;
(function (stack) {
    function def(model, stackProps) {
        var groupbyChannel = stackProps.groupbyChannel;
        var fieldChannel = stackProps.fieldChannel;
        var facetFields = (model.has(channel_1.COLUMN) ? [model.field(channel_1.COLUMN)] : [])
            .concat((model.has(channel_1.ROW) ? [model.field(channel_1.ROW)] : []));
        var stacked = {
            name: data_1.STACKED,
            source: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(groupbyChannel)].concat(facetFields),
                    summarize: [{ ops: ['sum'], field: model.field(fieldChannel) }]
                }]
        };
        if (facetFields && facetFields.length > 0) {
            stacked.transform.push({
                type: 'aggregate',
                groupby: facetFields,
                summarize: [{
                        ops: ['max'],
                        field: model.field(fieldChannel, { prefn: 'sum_' })
                    }]
            });
        }
        return stacked;
    }
    stack.def = def;
    ;
})(stack = exports.stack || (exports.stack = {}));
function filterNonPositiveForLog(dataTable, model) {
    model.forEach(function (_, channel) {
        if (model.fieldDef(channel).scale.type === 'log') {
            dataTable.transform.push({
                type: 'filter',
                test: model.field(channel, { datum: true }) + ' > 0'
            });
        }
    });
}
exports.filterNonPositiveForLog = filterNonPositiveForLog;

},{"../bin":8,"../channel":9,"../data":21,"../fielddef":23,"../type":43,"../util":44,"./time":20}],14:[function(require,module,exports){
var util = require('../util');
var channel_1 = require('../channel');
var axis_1 = require('./axis');
var scale_1 = require('./scale');
function facetMixins(model, marks) {
    var layout = model.layout();
    var cellWidth = !model.has(channel_1.COLUMN) ?
        { field: { group: 'width' } } :
        layout.cellWidth.field ?
            { scale: 'column', band: true } :
            { value: layout.cellWidth };
    var cellHeight = !model.has(channel_1.ROW) ?
        { field: { group: 'height' } } :
        layout.cellHeight.field ?
            { scale: 'row', band: true } :
            { value: layout.cellHeight };
    var facetGroupProperties = {
        width: cellWidth,
        height: cellHeight
    };
    var cellConfig = model.config('cell');
    ['fill', 'fillOpacity', 'stroke', 'strokeWidth',
        'strokeOpacity', 'strokeDash', 'strokeDashOffset']
        .forEach(function (property) {
        var value = cellConfig[property];
        if (value !== undefined) {
            facetGroupProperties[property] = value;
        }
    });
    var rootMarks = [], rootAxes = [], facetKeys = [], cellAxes = [];
    var hasRow = model.has(channel_1.ROW), hasCol = model.has(channel_1.COLUMN);
    if (hasRow) {
        if (!model.isDimension(channel_1.ROW)) {
            util.error('Row encoding should be ordinal.');
        }
        facetGroupProperties.y = {
            scale: channel_1.ROW,
            field: model.field(channel_1.ROW)
        };
        facetKeys.push(model.field(channel_1.ROW));
        rootAxes.push(axis_1.compileAxis(channel_1.ROW, model));
        if (model.has(channel_1.X)) {
            rootMarks.push(getXAxesGroup(model, cellWidth, hasCol));
        }
        rootMarks.push(getRowRulesGroup(model, cellHeight));
    }
    else {
        if (model.has(channel_1.X)) {
            cellAxes.push(axis_1.compileAxis(channel_1.X, model));
        }
    }
    if (hasCol) {
        if (!model.isDimension(channel_1.COLUMN)) {
            util.error('Col encoding should be ordinal.');
        }
        facetGroupProperties.x = {
            scale: channel_1.COLUMN,
            field: model.field(channel_1.COLUMN)
        };
        facetKeys.push(model.field(channel_1.COLUMN));
        rootAxes.push(axis_1.compileAxis(channel_1.COLUMN, model));
        if (model.has(channel_1.Y)) {
            rootMarks.push(getYAxesGroup(model, cellHeight, hasRow));
        }
        rootMarks.push(getColumnRulesGroup(model, cellWidth));
    }
    else {
        if (model.has(channel_1.Y)) {
            cellAxes.push(axis_1.compileAxis(channel_1.Y, model));
        }
    }
    var facetGroup = {
        name: 'cell',
        type: 'group',
        from: {
            data: model.dataTable(),
            transform: [{ type: 'facet', groupby: facetKeys }]
        },
        properties: {
            update: facetGroupProperties
        },
        marks: marks
    };
    if (cellAxes.length > 0) {
        facetGroup.axes = cellAxes;
    }
    rootMarks.push(facetGroup);
    var scaleNames = model.map(function (_, channel) {
        return channel;
    });
    return {
        marks: rootMarks,
        axes: rootAxes,
        scales: scale_1.compileScales(scaleNames, model)
    };
}
exports.facetMixins = facetMixins;
function getXAxesGroup(model, cellWidth, hasCol) {
    var xAxesGroup = {
        name: 'x-axes',
        type: 'group',
        properties: {
            update: {
                width: cellWidth,
                height: { field: { group: 'height' } },
                x: hasCol ? { scale: channel_1.COLUMN, field: model.field(channel_1.COLUMN) } : { value: 0 },
                y: { value: -model.config('cell').padding / 2 }
            }
        },
        axes: [axis_1.compileAxis(channel_1.X, model)]
    };
    if (hasCol) {
        xAxesGroup.from = {
            data: model.dataTable(),
            transform: { type: 'facet', groupby: [model.field(channel_1.COLUMN)] }
        };
    }
    return xAxesGroup;
}
function getYAxesGroup(model, cellHeight, hasRow) {
    var yAxesGroup = {
        name: 'y-axes',
        type: 'group',
        properties: {
            update: {
                width: { field: { group: 'width' } },
                height: cellHeight,
                x: { value: -model.config('cell').padding / 2 },
                y: hasRow ? { scale: channel_1.ROW, field: model.field(channel_1.ROW) } : { value: 0 }
            }
        },
        axes: [axis_1.compileAxis(channel_1.Y, model)]
    };
    if (hasRow) {
        yAxesGroup.from = {
            data: model.dataTable(),
            transform: { type: 'facet', groupby: [model.field(channel_1.ROW)] }
        };
    }
    return yAxesGroup;
}
function getRowRulesGroup(model, cellHeight) {
    var rowRulesOnTop = !model.has(channel_1.X) || model.fieldDef(channel_1.X).axis.orient !== 'top';
    var offset = model.config('cell').padding / 2 - 1;
    var rowRules = {
        name: 'row-rules',
        type: 'rule',
        from: {
            data: model.dataTable(),
            transform: [{ type: 'facet', groupby: [model.field(channel_1.ROW)] }]
        },
        properties: {
            update: {
                y: {
                    scale: 'row',
                    field: model.field(channel_1.ROW),
                    offset: (rowRulesOnTop ? -1 : 1) * offset
                },
                x: { value: 0, offset: -model.config('cell').gridOffset },
                x2: { field: { group: 'width' }, offset: model.config('cell').gridOffset },
                stroke: { value: model.config('cell').gridColor },
                strokeOpacity: { value: model.config('cell').gridOpacity }
            }
        }
    };
    if (rowRulesOnTop) {
        return rowRules;
    }
    return {
        name: 'row-rules-group',
        type: 'group',
        properties: {
            update: {
                y: cellHeight.value ?
                    cellHeight :
                    { field: { parent: 'cellHeight' } },
                width: { field: { group: 'width' } }
            }
        },
        marks: [rowRules]
    };
}
function getColumnRulesGroup(model, cellWidth) {
    var colRulesOnLeft = !model.has(channel_1.Y) || model.fieldDef(channel_1.Y).axis.orient === 'right';
    var offset = model.config('cell').padding / 2 - 1;
    var columnRules = {
        name: 'column-rules',
        type: 'rule',
        from: {
            data: model.dataTable(),
            transform: [{ type: 'facet', groupby: [model.field(channel_1.COLUMN)] }]
        },
        properties: {
            update: {
                x: {
                    scale: 'column',
                    field: model.field(channel_1.COLUMN),
                    offset: (colRulesOnLeft ? -1 : 1) * offset
                },
                y: { value: 0, offset: -model.config('cell').gridOffset },
                y2: { field: { group: 'height' }, offset: model.config('cell').gridOffset },
                stroke: { value: model.config('cell').gridColor },
                strokeOpacity: { value: model.config('cell').gridOpacity }
            }
        }
    };
    if (colRulesOnLeft) {
        return columnRules;
    }
    return {
        name: 'column-rules-group',
        type: 'group',
        properties: {
            update: {
                x: cellWidth.value ?
                    cellWidth :
                    { field: { parent: 'cellWidth' } },
                height: { field: { group: 'height' } }
            }
        },
        marks: [columnRules]
    };
}

},{"../channel":9,"../util":44,"./axis":11,"./scale":18}],15:[function(require,module,exports){
var channel_1 = require('../channel');
var mark_1 = require('../mark');
var data_1 = require('../data');
function compileLayout(model) {
    var cellWidth = getCellWidth(model);
    var cellHeight = getCellHeight(model);
    return {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        width: getWidth(model, cellWidth),
        height: getHeight(model, cellHeight)
    };
}
exports.compileLayout = compileLayout;
function getCellWidth(model) {
    if (model.has(channel_1.X)) {
        if (model.isOrdinalScale(channel_1.X)) {
            return { data: data_1.LAYOUT, field: 'cellWidth' };
        }
        return model.config('cell').width;
    }
    if (model.mark() === mark_1.TEXT) {
        return model.config('textCellWidth');
    }
    return model.fieldDef(channel_1.X).scale.bandWidth;
}
function getWidth(model, cellWidth) {
    if (model.has(channel_1.COLUMN)) {
        return { data: data_1.LAYOUT, field: 'width' };
    }
    return cellWidth;
}
function getCellHeight(model) {
    if (model.has(channel_1.Y)) {
        if (model.isOrdinalScale(channel_1.Y)) {
            return { data: data_1.LAYOUT, field: 'cellHeight' };
        }
        else {
            return model.config('cell').height;
        }
    }
    return model.fieldDef(channel_1.Y).scale.bandWidth;
}
function getHeight(model, cellHeight) {
    if (model.has(channel_1.ROW)) {
        return { data: data_1.LAYOUT, field: 'height' };
    }
    return cellHeight;
}

},{"../channel":9,"../data":21,"../mark":24}],16:[function(require,module,exports){
var util_1 = require('../util');
var channel_1 = require('../channel');
var time = require('./time');
var type_1 = require('../type');
var mark_1 = require('../mark');
function compileLegends(model) {
    var defs = [];
    if (model.has(channel_1.COLOR) && model.fieldDef(channel_1.COLOR).legend) {
        defs.push(compileLegend(model, channel_1.COLOR, {
            fill: channel_1.COLOR
        }));
    }
    if (model.has(channel_1.SIZE) && model.fieldDef(channel_1.SIZE).legend) {
        defs.push(compileLegend(model, channel_1.SIZE, {
            size: channel_1.SIZE
        }));
    }
    if (model.has(channel_1.SHAPE) && model.fieldDef(channel_1.SHAPE).legend) {
        defs.push(compileLegend(model, channel_1.SHAPE, {
            shape: channel_1.SHAPE
        }));
    }
    return defs;
}
exports.compileLegends = compileLegends;
function compileLegend(model, channel, def) {
    var legend = model.fieldDef(channel).legend;
    def.title = title(model, channel);
    ['orient', 'format', 'values'].forEach(function (property) {
        var value = legend[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    var props = (typeof legend !== 'boolean' && legend.properties) || {};
    ['title', 'labels', 'symbols', 'legend'].forEach(function (group) {
        var value = properties[group] ?
            properties[group](model, channel, props[group]) :
            props[group];
        if (value !== undefined) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.compileLegend = compileLegend;
function title(model, channel) {
    var legend = model.fieldDef(channel).legend;
    if (typeof legend !== 'boolean' && legend.title) {
        return legend.title;
    }
    return model.fieldTitle(channel);
}
exports.title = title;
var properties;
(function (properties) {
    function labels(model, channel, spec) {
        var fieldDef = model.fieldDef(channel);
        var timeUnit = fieldDef.timeUnit;
        if (fieldDef.type === type_1.TEMPORAL && timeUnit && time.labelTemplate(timeUnit)) {
            return util_1.extend({
                text: {
                    template: '{{datum.data | ' + time.labelTemplate(timeUnit) + '}}'
                }
            }, spec || {});
        }
        return spec;
    }
    properties.labels = labels;
    function symbols(model, channel, spec) {
        var symbols = {};
        var mark = model.mark();
        switch (mark) {
            case mark_1.BAR:
            case mark_1.TICK:
            case mark_1.TEXT:
                symbols.stroke = { value: 'transparent' };
                symbols.shape = { value: 'square' };
                break;
            case mark_1.CIRCLE:
            case mark_1.SQUARE:
                symbols.shape = { value: mark };
            case mark_1.POINT:
                if (model.config('marks').filled) {
                    if (model.has(channel_1.COLOR) && channel === channel_1.COLOR) {
                        symbols.fill = { scale: channel_1.COLOR, field: 'data' };
                    }
                    else {
                        symbols.fill = { value: model.fieldDef(channel_1.COLOR).value };
                    }
                    symbols.stroke = { value: 'transparent' };
                }
                else {
                    if (model.has(channel_1.COLOR) && channel === channel_1.COLOR) {
                        symbols.stroke = { scale: channel_1.COLOR, field: 'data' };
                    }
                    else {
                        symbols.stroke = { value: model.fieldDef(channel_1.COLOR).value };
                    }
                    symbols.fill = { value: 'transparent' };
                    symbols.strokeWidth = { value: model.config('marks').strokeWidth };
                }
                break;
            case mark_1.LINE:
            case mark_1.AREA:
                break;
        }
        var opacity = model.markOpacity();
        if (opacity) {
            symbols.opacity = { value: opacity };
        }
        symbols = util_1.extend(symbols, spec || {});
        return util_1.keys(symbols).length > 0 ? symbols : undefined;
    }
    properties.symbols = symbols;
})(properties || (properties = {}));

},{"../channel":9,"../mark":24,"../type":43,"../util":44,"./time":20}],17:[function(require,module,exports){
var channel_1 = require('../channel');
var mark_1 = require('../mark');
var type_1 = require('../type');
var stack_1 = require('./stack');
var MARKTYPES_MAP = {
    bar: 'rect',
    tick: 'rect',
    point: 'symbol',
    line: 'line',
    area: 'area',
    text: 'text',
    circle: 'symbol',
    square: 'symbol'
};
function compileMarks(model) {
    var mark = model.mark();
    if (mark === mark_1.LINE || mark === mark_1.AREA) {
        var sortBy = mark === mark_1.LINE ? model.config('sortLineBy') : undefined;
        if (!sortBy) {
            var sortField = (model.isMeasure(channel_1.X) && model.isDimension(channel_1.Y)) ? channel_1.Y : channel_1.X;
            sortBy = '-' + model.field(sortField);
        }
        var pathMarks = {
            type: MARKTYPES_MAP[mark],
            from: {
                transform: [{ type: 'sort', by: sortBy }]
            },
            properties: {
                update: properties[mark](model)
            }
        };
        var details = detailFields(model);
        if (details.length > 0) {
            var facetTransform = { type: 'facet', groupby: details };
            var transform = mark === mark_1.AREA && model.stack() ?
                [stack_1.imputeTransform(model), stack_1.stackTransform(model), facetTransform] :
                [facetTransform];
            return [{
                    name: mark + '-facet',
                    type: 'group',
                    from: {
                        transform: transform
                    },
                    properties: {
                        update: {
                            width: { field: { group: 'width' } },
                            height: { field: { group: 'height' } }
                        }
                    },
                    marks: [pathMarks]
                }];
        }
        else {
            return [pathMarks];
        }
    }
    else {
        var marks = [];
        if (mark === mark_1.TEXT && model.has(channel_1.COLOR)) {
            marks.push({
                type: 'rect',
                properties: { update: properties.textBackground(model) }
            });
        }
        var mainDef = {
            type: MARKTYPES_MAP[mark],
            properties: {
                update: properties[mark](model)
            }
        };
        var stack = model.stack();
        if (mark === mark_1.BAR && stack) {
            mainDef.from = {
                transform: [stack_1.stackTransform(model)]
            };
        }
        marks.push(mainDef);
        return marks;
    }
}
exports.compileMarks = compileMarks;
function applyMarksConfig(marksProperties, marksConfig, propsList) {
    propsList.forEach(function (property) {
        var value = marksConfig[property];
        if (value !== undefined) {
            marksProperties[property] = { value: value };
        }
    });
}
function detailFields(model) {
    return [channel_1.COLOR, channel_1.DETAIL, channel_1.SHAPE].reduce(function (details, channel) {
        if (model.has(channel) && !model.fieldDef(channel).aggregate) {
            details.push(model.field(channel));
        }
        return details;
    }, []);
}
var properties;
(function (properties) {
    function bar(model) {
        var stack = model.stack();
        var p = {};
        if (stack && channel_1.X === stack.fieldChannel) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X) + '_start'
            };
            p.x2 = {
                scale: channel_1.X,
                field: model.field(channel_1.X) + '_end'
            };
        }
        else if (model.fieldDef(channel_1.X).bin) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_start' }),
                offset: 1
            };
            p.x2 = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_end' })
            };
        }
        else if (model.isMeasure(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X)
            };
            if (!model.has(channel_1.Y) || model.isDimension(channel_1.Y)) {
                p.x2 = { value: 0 };
            }
        }
        else {
            if (model.has(channel_1.X)) {
                p.xc = {
                    scale: channel_1.X,
                    field: model.field(channel_1.X)
                };
            }
            else {
                p.x = { value: 0, offset: model.config('singleBarOffset') };
            }
        }
        if (!p.x2) {
            if (!model.has(channel_1.X) || model.isOrdinalScale(channel_1.X)) {
                if (model.has(channel_1.SIZE)) {
                    p.width = {
                        scale: channel_1.SIZE,
                        field: model.field(channel_1.SIZE)
                    };
                }
                else {
                    p.width = {
                        value: model.fieldDef(channel_1.X).scale.bandWidth,
                        offset: -1
                    };
                }
            }
            else {
                p.width = { value: 2 };
            }
        }
        if (stack && channel_1.Y === stack.fieldChannel) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y) + '_start'
            };
            p.y2 = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y) + '_end'
            };
        }
        else if (model.fieldDef(channel_1.Y).bin) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_start' })
            };
            p.y2 = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_end' }),
                offset: 1
            };
        }
        else if (model.isMeasure(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y)
            };
            p.y2 = { field: { group: 'height' } };
        }
        else {
            if (model.has(channel_1.Y)) {
                p.yc = {
                    scale: channel_1.Y,
                    field: model.field(channel_1.Y)
                };
            }
            else {
                p.y2 = {
                    field: { group: 'height' },
                    offset: -model.config('singleBarOffset')
                };
            }
            if (model.has(channel_1.SIZE)) {
                p.height = {
                    scale: channel_1.SIZE,
                    field: model.field(channel_1.SIZE)
                };
            }
            else {
                p.height = {
                    value: model.fieldDef(channel_1.Y).scale.bandWidth,
                    offset: -1
                };
            }
        }
        if (model.has(channel_1.COLOR)) {
            p.fill = {
                scale: channel_1.COLOR,
                field: model.field(channel_1.COLOR)
            };
        }
        else {
            p.fill = { value: model.fieldDef(channel_1.COLOR).value };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        return p;
    }
    properties.bar = bar;
    function point(model) {
        var p = {};
        var marksConfig = model.config('marks');
        if (model.has(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.X)) {
            p.x = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.Y)) {
            p.y = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.SIZE)) {
            p.size = {
                scale: channel_1.SIZE,
                field: model.field(channel_1.SIZE)
            };
        }
        else if (!model.has(channel_1.SIZE)) {
            p.size = { value: model.fieldDef(channel_1.SIZE).value };
        }
        if (model.has(channel_1.SHAPE)) {
            p.shape = {
                scale: channel_1.SHAPE,
                field: model.field(channel_1.SHAPE)
            };
        }
        else if (!model.has(channel_1.SHAPE)) {
            p.shape = { value: model.fieldDef(channel_1.SHAPE).value };
        }
        if (marksConfig.filled) {
            if (model.has(channel_1.COLOR)) {
                p.fill = {
                    scale: channel_1.COLOR,
                    field: model.field(channel_1.COLOR)
                };
            }
            else if (!model.has(channel_1.COLOR)) {
                p.fill = { value: model.fieldDef(channel_1.COLOR).value };
            }
        }
        else {
            if (model.has(channel_1.COLOR)) {
                p.stroke = {
                    scale: channel_1.COLOR,
                    field: model.field(channel_1.COLOR)
                };
            }
            else if (!model.has(channel_1.COLOR)) {
                p.stroke = { value: model.fieldDef(channel_1.COLOR).value };
            }
            p.strokeWidth = { value: model.config('marks').strokeWidth };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        return p;
    }
    properties.point = point;
    function line(model) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.X)) {
            p.x = { value: 0 };
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.Y)) {
            p.y = { field: { group: 'height' } };
        }
        if (model.has(channel_1.COLOR)) {
            p.stroke = {
                scale: channel_1.COLOR,
                field: model.field(channel_1.COLOR)
            };
        }
        else if (!model.has(channel_1.COLOR)) {
            p.stroke = { value: model.fieldDef(channel_1.COLOR).value };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        p.strokeWidth = { value: model.config('marks').strokeWidth };
        applyMarksConfig(p, model.config('marks'), ['interpolate', 'tension']);
        return p;
    }
    properties.line = line;
    function area(model) {
        var stack = model.stack();
        var p = {};
        if (stack && channel_1.X === stack.fieldChannel) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X) + '_start'
            };
            p.x2 = {
                scale: channel_1.X,
                field: model.field(channel_1.X) + '_end'
            };
        }
        else if (model.isMeasure(channel_1.X)) {
            p.x = { scale: channel_1.X, field: model.field(channel_1.X) };
            if (model.isDimension(channel_1.Y)) {
                p.x2 = {
                    scale: channel_1.X,
                    value: 0
                };
                p.orient = { value: 'horizontal' };
            }
        }
        else if (model.has(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else {
            p.x = { value: 0 };
        }
        if (stack && channel_1.Y === stack.fieldChannel) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y) + '_start'
            };
            p.y2 = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y) + '_end'
            };
        }
        else if (model.isMeasure(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y)
            };
            p.y2 = {
                scale: channel_1.Y,
                value: 0
            };
        }
        else if (model.has(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.y = { field: { group: 'height' } };
        }
        if (model.has(channel_1.COLOR)) {
            p.fill = {
                scale: channel_1.COLOR,
                field: model.field(channel_1.COLOR)
            };
        }
        else if (!model.has(channel_1.COLOR)) {
            p.fill = { value: model.fieldDef(channel_1.COLOR).value };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        applyMarksConfig(p, model.config('marks'), ['interpolate', 'tension']);
        return p;
    }
    properties.area = area;
    function tick(model) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
            if (model.isDimension(channel_1.X)) {
                p.x.offset = -model.fieldDef(channel_1.X).scale.bandWidth / 3;
            }
        }
        else if (!model.has(channel_1.X)) {
            p.x = { value: 0 };
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
            if (model.isDimension(channel_1.Y)) {
                p.y.offset = -model.fieldDef(channel_1.Y).scale.bandWidth / 3;
            }
        }
        else if (!model.has(channel_1.Y)) {
            p.y = { value: 0 };
        }
        if (!model.has(channel_1.X) || model.isDimension(channel_1.X)) {
            p.width = { value: model.fieldDef(channel_1.X).scale.bandWidth / 1.5 };
        }
        else {
            p.width = { value: 1 };
        }
        if (!model.has(channel_1.Y) || model.isDimension(channel_1.Y)) {
            p.height = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 1.5 };
        }
        else {
            p.height = { value: 1 };
        }
        if (model.has(channel_1.COLOR)) {
            p.fill = {
                scale: channel_1.COLOR,
                field: model.field(channel_1.COLOR)
            };
        }
        else {
            p.fill = { value: model.fieldDef(channel_1.COLOR).value };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        return p;
    }
    properties.tick = tick;
    function filled_point_props(shape) {
        return function (model) {
            var p = {};
            if (model.has(channel_1.X)) {
                p.x = {
                    scale: channel_1.X,
                    field: model.field(channel_1.X, { binSuffix: '_mid' })
                };
            }
            else if (!model.has(channel_1.X)) {
                p.x = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
            }
            if (model.has(channel_1.Y)) {
                p.y = {
                    scale: channel_1.Y,
                    field: model.field(channel_1.Y, { binSuffix: '_mid' })
                };
            }
            else if (!model.has(channel_1.Y)) {
                p.y = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
            }
            if (model.has(channel_1.SIZE)) {
                p.size = {
                    scale: channel_1.SIZE,
                    field: model.field(channel_1.SIZE)
                };
            }
            else if (!model.has(channel_1.X)) {
                p.size = { value: model.fieldDef(channel_1.SIZE).value };
            }
            p.shape = { value: shape };
            if (model.has(channel_1.COLOR)) {
                p.fill = {
                    scale: channel_1.COLOR,
                    field: model.field(channel_1.COLOR)
                };
            }
            else if (!model.has(channel_1.COLOR)) {
                p.fill = { value: model.fieldDef(channel_1.COLOR).value };
            }
            var opacity = model.markOpacity();
            if (opacity) {
                p.opacity = { value: opacity };
            }
            ;
            return p;
        };
    }
    properties.circle = filled_point_props('circle');
    properties.square = filled_point_props('square');
    function textBackground(model) {
        return {
            x: { value: 0 },
            y: { value: 0 },
            width: { field: { group: 'width' } },
            height: { field: { group: 'height' } },
            fill: { scale: channel_1.COLOR, field: model.field(channel_1.COLOR) }
        };
    }
    properties.textBackground = textBackground;
    function text(model) {
        var p = {};
        var fieldDef = model.fieldDef(channel_1.TEXT);
        var marksConfig = model.config('marks');
        if (model.has(channel_1.X)) {
            p.x = {
                scale: channel_1.X,
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.X)) {
            if (model.has(channel_1.TEXT) && model.fieldDef(channel_1.TEXT).type === type_1.QUANTITATIVE) {
                p.x = { field: { group: 'width' }, offset: -5 };
            }
            else {
                p.x = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
            }
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: channel_1.Y,
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else if (!model.has(channel_1.Y)) {
            p.y = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.SIZE)) {
            p.fontSize = {
                scale: channel_1.SIZE,
                field: model.field(channel_1.SIZE)
            };
        }
        else if (!model.has(channel_1.SIZE)) {
            p.fontSize = { value: marksConfig.fontSize };
        }
        var opacity = model.markOpacity();
        if (opacity) {
            p.opacity = { value: opacity };
        }
        ;
        if (model.has(channel_1.TEXT)) {
            if (model.fieldDef(channel_1.TEXT).type === type_1.QUANTITATIVE) {
                var numberFormat = marksConfig.format !== undefined ?
                    marksConfig.format : model.numberFormat(channel_1.TEXT);
                p.text = {
                    template: '{{' + model.field(channel_1.TEXT, { datum: true }) +
                        ' | number:\'' + numberFormat + '\'}}'
                };
            }
            else {
                p.text = { field: model.field(channel_1.TEXT) };
            }
        }
        else {
            p.text = { value: fieldDef.value };
        }
        applyMarksConfig(p, marksConfig, ['angle', 'align', 'baseline', 'dx', 'dy', 'fill', 'font', 'fontWeight',
            'fontStyle', 'radius', 'theta']);
        return p;
    }
    properties.text = text;
})(properties = exports.properties || (exports.properties = {}));

},{"../channel":9,"../mark":24,"../type":43,"./stack":19}],18:[function(require,module,exports){
var util_1 = require('../util');
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var data_1 = require('../data');
var time = require('./time');
var type_1 = require('../type');
var mark_1 = require('../mark');
function compileScales(names, model) {
    return names.reduce(function (a, channel) {
        var scaleDef = {
            name: channel,
            type: type(channel, model),
        };
        scaleDef.domain = domain(model, channel, scaleDef.type);
        util_1.extend(scaleDef, rangeMixins(model, channel, scaleDef.type));
        [
            'reverse', 'round',
            'clamp', 'nice',
            'exponent', 'zero',
            'bandWidth', 'outerPadding', 'padding', 'points'
        ].forEach(function (property) {
            var value = exports[property](model, channel, scaleDef.type);
            if (value !== undefined) {
                scaleDef[property] = value;
            }
        });
        return (a.push(scaleDef), a);
    }, []);
}
exports.compileScales = compileScales;
function type(channel, model) {
    var fieldDef = model.fieldDef(channel);
    switch (fieldDef.type) {
        case type_1.NOMINAL:
            return 'ordinal';
        case type_1.ORDINAL:
            var range = fieldDef.scale.range;
            return channel === channel_1.COLOR && (typeof range !== 'string') ? 'linear' : 'ordinal';
        case type_1.TEMPORAL:
            return time.scale.type(fieldDef.timeUnit, channel);
        case type_1.QUANTITATIVE:
            if (fieldDef.bin) {
                return channel === channel_1.ROW || channel === channel_1.COLUMN || channel === channel_1.SHAPE ? 'ordinal' : 'linear';
            }
            return fieldDef.scale.type;
    }
}
exports.type = type;
function domain(model, channel, type) {
    var fieldDef = model.fieldDef(channel);
    if (fieldDef.scale.domain) {
        return fieldDef.scale.domain;
    }
    if (fieldDef.type === type_1.TEMPORAL) {
        var range = time.scale.domain(fieldDef.timeUnit, channel);
        if (range) {
            return range;
        }
    }
    var stack = model.stack();
    if (stack && channel === stack.fieldChannel) {
        var facet = model.has(channel_1.ROW) || model.has(channel_1.COLUMN);
        return {
            data: data_1.STACKED,
            field: model.field(channel, {
                prefn: (facet ? 'max_' : '') + 'sum_'
            })
        };
    }
    var useRawDomain = _useRawDomain(model, channel);
    var sort = domainSort(model, channel, type);
    if (useRawDomain) {
        return {
            data: data_1.SOURCE,
            field: model.field(channel, { noAggregate: true })
        };
    }
    else if (fieldDef.bin) {
        return {
            data: model.dataTable(),
            field: type === 'ordinal' ?
                model.field(channel, { binSuffix: '_start' }) :
                [
                    model.field(channel, { binSuffix: '_start' }),
                    model.field(channel, { binSuffix: '_end' })
                ]
        };
    }
    else if (sort) {
        return {
            data: sort.op ? data_1.SOURCE : model.dataTable(),
            field: model.field(channel),
            sort: sort
        };
    }
    else {
        return {
            data: model.dataTable(),
            field: model.field(channel)
        };
    }
}
exports.domain = domain;
function domainSort(model, channel, type) {
    var sort = model.fieldDef(channel).sort;
    if (sort === 'ascending' || sort === 'descending') {
        return true;
    }
    if (type === 'ordinal' && typeof sort !== 'string') {
        return {
            op: sort.op,
            field: sort.field
        };
    }
    return undefined;
}
exports.domainSort = domainSort;
function reverse(model, channel) {
    var sort = model.fieldDef(channel).sort;
    return sort && (typeof sort === 'string' ?
        sort === 'descending' :
        sort.order === 'descending') ? true : undefined;
}
exports.reverse = reverse;
function _useRawDomain(model, channel) {
    var fieldDef = model.fieldDef(channel);
    return fieldDef.scale.useRawDomain &&
        fieldDef.aggregate &&
        aggregate_1.SHARED_DOMAIN_OPS.indexOf(fieldDef.aggregate) >= 0 &&
        ((fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) ||
            (fieldDef.type === type_1.TEMPORAL &&
                (!fieldDef.timeUnit || time.scale.type(fieldDef.timeUnit, channel) === 'linear')));
}
exports._useRawDomain = _useRawDomain;
function bandWidth(model, channel, scaleType) {
    if (scaleType === 'ordinal') {
        return model.fieldDef(channel).scale.bandWidth;
    }
    return undefined;
}
exports.bandWidth = bandWidth;
function clamp(model, channel) {
    return model.fieldDef(channel).scale.clamp;
}
exports.clamp = clamp;
function exponent(model, channel) {
    return model.fieldDef(channel).scale.exponent;
}
exports.exponent = exponent;
function nice(model, channel, scaleType) {
    if (model.fieldDef(channel).scale.nice !== undefined) {
        return model.fieldDef(channel).scale.nice;
    }
    switch (channel) {
        case channel_1.X:
        case channel_1.Y:
            if (scaleType === 'time' || scaleType === 'ordinal') {
                return undefined;
            }
            return true;
        case channel_1.ROW:
        case channel_1.COLUMN:
            return true;
    }
    return undefined;
}
exports.nice = nice;
function outerPadding(model, channel, scaleType) {
    if (scaleType === 'ordinal') {
        if (model.fieldDef(channel).scale.outerPadding !== undefined) {
            return model.fieldDef(channel).scale.outerPadding;
        }
    }
    return undefined;
}
exports.outerPadding = outerPadding;
function padding(model, channel, scaleType) {
    if (scaleType === 'ordinal') {
        return model.fieldDef(channel).scale.padding;
    }
    return undefined;
}
exports.padding = padding;
function points(model, channel, scaleType) {
    if (scaleType === 'ordinal') {
        if (model.fieldDef(channel).scale.points !== undefined) {
            return model.fieldDef(channel).scale.points;
        }
        switch (channel) {
            case channel_1.X:
            case channel_1.Y:
                return true;
        }
    }
    return undefined;
}
exports.points = points;
function rangeMixins(model, channel, scaleType) {
    var fieldDef = model.fieldDef(channel);
    if (fieldDef.scale.range) {
        return { range: fieldDef.scale.range };
    }
    switch (channel) {
        case channel_1.X:
            return { rangeMin: 0, rangeMax: model.layout().cellWidth };
        case channel_1.Y:
            if (scaleType === 'ordinal') {
                return { rangeMin: 0, rangeMax: model.layout().cellHeight };
            }
            return { rangeMin: model.layout().cellHeight, rangeMax: 0 };
        case channel_1.SIZE:
            if (model.is(mark_1.BAR)) {
                return {
                    range: [3, Math.max(model.fieldDef(channel_1.X).scale.bandWidth, model.fieldDef(channel_1.Y).scale.bandWidth)]
                };
            }
            else if (model.is(mark_1.TEXT)) {
                return { range: [8, 40] };
            }
            var bandWidth = Math.min(model.fieldDef(channel_1.X).scale.bandWidth, model.fieldDef(channel_1.Y).scale.bandWidth) - 1;
            return { range: [10, 0.8 * bandWidth * bandWidth] };
        case channel_1.SHAPE:
            return { range: 'shapes' };
        case channel_1.COLOR:
            if (scaleType === 'ordinal') {
                return { range: 'category10' };
            }
            else {
                return { range: ['#AFC6A3', '#09622A'] };
            }
        case channel_1.ROW:
            return { range: 'height' };
        case channel_1.COLUMN:
            return { range: 'width' };
    }
    return {};
}
exports.rangeMixins = rangeMixins;
function round(model, channel) {
    if (model.fieldDef(channel).scale.round !== undefined) {
        return model.fieldDef(channel).scale.round;
    }
    switch (channel) {
        case channel_1.X:
        case channel_1.Y:
        case channel_1.ROW:
        case channel_1.COLUMN:
        case channel_1.SIZE:
            return true;
    }
    return undefined;
}
exports.round = round;
function zero(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var timeUnit = fieldDef.timeUnit;
    if (fieldDef.scale.zero !== undefined) {
        return fieldDef.scale.zero;
    }
    if (fieldDef.type === type_1.TEMPORAL) {
        if (timeUnit === 'year') {
            return false;
        }
        return undefined;
    }
    if (fieldDef.bin) {
        return false;
    }
    return channel === channel_1.X || channel === channel_1.Y ?
        undefined :
        false;
}
exports.zero = zero;

},{"../aggregate":7,"../channel":9,"../data":21,"../mark":24,"../type":43,"../util":44,"./time":20}],19:[function(require,module,exports){
var util_1 = require('../util');
function imputeTransform(model) {
    var stack = model.stack();
    return {
        type: 'impute',
        field: model.field(stack.fieldChannel),
        groupby: [model.field(stack.stackChannel)],
        orderby: [model.field(stack.groupbyChannel)],
        method: 'value',
        value: 0
    };
}
exports.imputeTransform = imputeTransform;
function stackTransform(model) {
    var stack = model.stack();
    var sortby = stack.config.sort === 'descending' ?
        '-' + model.field(stack.stackChannel) :
        stack.config.sort === 'ascending' ?
            model.field(stack.stackChannel) :
            util_1.isObject(stack.config.sort) ?
                stack.config.sort :
                '-' + model.field(stack.stackChannel);
    var valName = model.field(stack.fieldChannel);
    var transform = {
        type: 'stack',
        groupby: [model.field(stack.groupbyChannel)],
        field: model.field(stack.fieldChannel),
        sortby: sortby,
        output: {
            start: valName + '_start',
            end: valName + '_end'
        }
    };
    if (stack.config.offset) {
        transform.offset = stack.config.offset;
    }
    return transform;
}
exports.stackTransform = stackTransform;

},{"../util":44}],20:[function(require,module,exports){
var util = require('../util');
var channel_1 = require('../channel');
function cardinality(fieldDef, stats, filterNull, type) {
    var timeUnit = fieldDef.timeUnit;
    switch (timeUnit) {
        case 'seconds': return 60;
        case 'minutes': return 60;
        case 'hours': return 24;
        case 'day': return 7;
        case 'date': return 31;
        case 'month': return 12;
        case 'year':
            var stat = stats[fieldDef.field], yearstat = stats['year_' + fieldDef.field];
            if (!yearstat) {
                return null;
            }
            return yearstat.distinct -
                (stat.missing > 0 && filterNull[type] ? 1 : 0);
    }
    return null;
}
exports.cardinality = cardinality;
function formula(timeUnit, field) {
    var fn = 'utc' + timeUnit;
    return fn + '(' + field + ')';
}
exports.formula = formula;
var scale;
(function (scale) {
    function type(timeUnit, channel) {
        if (channel === channel_1.COLOR) {
            return 'linear';
        }
        if (channel === channel_1.COLUMN || channel === channel_1.ROW) {
            return 'ordinal';
        }
        switch (timeUnit) {
            case 'hours':
            case 'day':
            case 'date':
            case 'month':
                return 'ordinal';
            case 'year':
            case 'second':
            case 'minute':
                return 'linear';
        }
        return 'time';
    }
    scale.type = type;
    function domain(timeUnit, channel) {
        var isColor = channel === channel_1.COLOR;
        switch (timeUnit) {
            case 'seconds':
            case 'minutes': return isColor ? [0, 59] : util.range(0, 60);
            case 'hours': return isColor ? [0, 23] : util.range(0, 24);
            case 'day': return isColor ? [0, 6] : util.range(0, 7);
            case 'date': return isColor ? [1, 31] : util.range(1, 32);
            case 'month': return isColor ? [0, 11] : util.range(0, 12);
        }
        return null;
    }
    scale.domain = domain;
})(scale = exports.scale || (exports.scale = {}));
function labelTemplate(timeUnit, abbreviated) {
    if (abbreviated === void 0) { abbreviated = false; }
    var postfix = abbreviated ? '-abbrev' : '';
    switch (timeUnit) {
        case 'day':
            return 'day' + postfix;
        case 'month':
            return 'month' + postfix;
    }
    return null;
}
exports.labelTemplate = labelTemplate;

},{"../channel":9,"../util":44}],21:[function(require,module,exports){
var type_1 = require('./type');
exports.SUMMARY = 'summary';
exports.SOURCE = 'source';
exports.STACKED = 'stacked';
exports.LAYOUT = 'layout';
exports.types = {
    'boolean': type_1.NOMINAL,
    'number': type_1.QUANTITATIVE,
    'integer': type_1.QUANTITATIVE,
    'date': type_1.TEMPORAL,
    'string': type_1.NOMINAL
};

},{"./type":43}],22:[function(require,module,exports){
var channel_1 = require('./channel');
function countRetinal(encoding) {
    var count = 0;
    if (encoding.color) {
        count++;
    }
    if (encoding.size) {
        count++;
    }
    if (encoding.shape) {
        count++;
    }
    return count;
}
exports.countRetinal = countRetinal;
function has(encoding, channel) {
    var fieldDef = encoding && encoding[channel];
    return fieldDef && fieldDef.field;
}
exports.has = has;
function isAggregate(encoding) {
    for (var k in encoding) {
        if (has(encoding, k) && encoding[k].aggregate) {
            return true;
        }
    }
    return false;
}
exports.isAggregate = isAggregate;
function fieldDefs(encoding) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (k) {
        if (has(encoding, k)) {
            arr.push(encoding[k]);
        }
    });
    return arr;
}
exports.fieldDefs = fieldDefs;
;
function forEach(encoding, f) {
    var i = 0;
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(encoding, channel)) {
            f(encoding[channel], channel, i++);
        }
    });
}
exports.forEach = forEach;
function map(encoding, f) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (k) {
        if (has(encoding, k)) {
            arr.push(f(encoding[k], k, encoding));
        }
    });
    return arr;
}
exports.map = map;
function reduce(encoding, f, init) {
    var r = init;
    channel_1.CHANNELS.forEach(function (k) {
        if (has(encoding, k)) {
            r = f(r, encoding[k], k, encoding);
        }
    });
    return r;
}
exports.reduce = reduce;

},{"./channel":9}],23:[function(require,module,exports){
var util_1 = require('./util');
var time = require('./compiler/time');
var type_1 = require('./type');
function _isFieldDimension(fieldDef) {
    return util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) || !!fieldDef.bin ||
        (fieldDef.type === type_1.TEMPORAL && !!fieldDef.timeUnit);
}
function isDimension(fieldDef) {
    return fieldDef && _isFieldDimension(fieldDef);
}
exports.isDimension = isDimension;
function isMeasure(fieldDef) {
    return fieldDef && !_isFieldDimension(fieldDef);
}
exports.isMeasure = isMeasure;
exports.COUNT_DISPLAYNAME = 'Number of Records';
function count() {
    return { field: '*', aggregate: 'count', type: type_1.QUANTITATIVE, displayName: exports.COUNT_DISPLAYNAME };
}
exports.count = count;
function isCount(fieldDef) {
    return fieldDef.aggregate === 'count';
}
exports.isCount = isCount;
function cardinality(fieldDef, stats, filterNull) {
    if (filterNull === void 0) { filterNull = {}; }
    var stat = stats[fieldDef.field];
    var type = fieldDef.type;
    if (fieldDef.bin) {
        var bin = fieldDef.bin;
        var maxbins = (typeof bin === 'boolean') ? undefined : bin.maxbins;
        if (maxbins === undefined) {
            maxbins = 10;
        }
        var bins = util_1.getbins(stat, maxbins);
        return (bins.stop - bins.start) / bins.step;
    }
    if (fieldDef.type === type_1.TEMPORAL) {
        var cardinality = time.cardinality(fieldDef, stats, filterNull, type);
        if (cardinality !== null) {
            return cardinality;
        }
    }
    if (fieldDef.aggregate) {
        return 1;
    }
    return stat.distinct -
        (stat.missing > 0 && filterNull[type] ? 1 : 0);
}
exports.cardinality = cardinality;

},{"./compiler/time":20,"./type":43,"./util":44}],24:[function(require,module,exports){
(function (Mark) {
    Mark[Mark["AREA"] = 'area'] = "AREA";
    Mark[Mark["BAR"] = 'bar'] = "BAR";
    Mark[Mark["LINE"] = 'line'] = "LINE";
    Mark[Mark["POINT"] = 'point'] = "POINT";
    Mark[Mark["TEXT"] = 'text'] = "TEXT";
    Mark[Mark["TICK"] = 'tick'] = "TICK";
    Mark[Mark["CIRCLE"] = 'circle'] = "CIRCLE";
    Mark[Mark["SQUARE"] = 'square'] = "SQUARE";
})(exports.Mark || (exports.Mark = {}));
var Mark = exports.Mark;
exports.AREA = Mark.AREA;
exports.BAR = Mark.BAR;
exports.LINE = Mark.LINE;
exports.POINT = Mark.POINT;
exports.TEXT = Mark.TEXT;
exports.TICK = Mark.TICK;
exports.CIRCLE = Mark.CIRCLE;
exports.SQUARE = Mark.SQUARE;

},{}],25:[function(require,module,exports){
exports.axis = {
    type: 'object',
    properties: {
        format: {
            type: 'string',
            default: undefined,
            description: 'The formatting pattern for axis labels. ' +
                'If not undefined, this will be determined by ' +
                'the max value ' +
                'of the field.'
        },
        grid: {
            type: 'boolean',
            default: undefined,
            description: 'A flag indicate if gridlines should be created in addition to ticks. If `grid` is unspecified, the default value is `true` for ROW and COL. For X and Y, the default value is `true` for quantitative and time fields and `false` otherwise.'
        },
        layer: {
            type: 'string',
            default: undefined,
            description: 'A string indicating if the axis (and any gridlines) should be placed above or below the data marks.'
        },
        orient: {
            type: 'string',
            default: undefined,
            enum: ['top', 'right', 'left', 'bottom'],
            description: 'The orientation of the axis. One of top, bottom, left or right. The orientation can be used to further specialize the axis type (e.g., a y axis oriented for the right edge of the chart).'
        },
        ticks: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are "nice" (multiples of 2, 5, 10) and lie within the underlying scale\'s range.'
        },
        title: {
            type: 'string',
            default: undefined,
            description: 'A title for the axis. (Shows field name and its function by default.)'
        },
        labelMaxLength: {
            type: 'integer',
            default: 25,
            minimum: 0,
            description: 'Truncate labels that are too long.'
        },
        titleMaxLength: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'Max length for axis title if the title is automatically generated from the field\'s description'
        },
        titleOffset: {
            type: 'integer',
            default: undefined,
            description: 'A title offset value for the axis.'
        },
        shortTimeNames: {
            type: 'boolean',
            default: false,
            description: 'Whether month names and weekday names should be abbreviated.'
        },
        properties: {
            type: 'object',
            default: undefined,
            description: 'Optional mark property definitions for custom axis styling.'
        }
    }
};

},{}],26:[function(require,module,exports){
var type_1 = require('../type');
var util_1 = require('../util');
exports.bin = {
    type: ['boolean', 'object'],
    default: false,
    properties: {
        min: {
            type: 'number',
            default: undefined,
            description: 'The minimum bin value to consider. If unspecified, the minimum value of the specified field is used.'
        },
        max: {
            type: 'number',
            default: undefined,
            description: 'The maximum bin value to consider. If unspecified, the maximum value of the specified field is used.'
        },
        base: {
            type: 'number',
            default: undefined,
            description: 'The number base to use for automatic bin determination (default is base 10).'
        },
        step: {
            type: 'number',
            default: undefined,
            description: 'An exact step size to use between bins. If provided, options such as maxbins will be ignored.'
        },
        steps: {
            type: 'array',
            default: undefined,
            description: 'An array of allowable step sizes to choose from.'
        },
        minstep: {
            type: 'number',
            default: undefined,
            description: 'A minimum allowable step size (particularly useful for integer values).'
        },
        div: {
            type: 'array',
            default: undefined,
            description: 'Scale factors indicating allowable subdivisions. The default value is [5, 2], which indicates that for base 10 numbers (the default base), the method may consider dividing bin sizes by 5 and/or 2. For example, for an initial step size of 10, the method can check if bin sizes of 2 (= 10/5), 5 (= 10/2), or 1 (= 10/(5*2)) might also satisfy the given constraints.'
        },
        maxbins: {
            type: 'integer',
            default: undefined,
            minimum: 2,
            description: 'Maximum number of bins.'
        }
    },
    supportedTypes: util_1.toMap([type_1.QUANTITATIVE])
};

},{"../type":43,"../util":44}],27:[function(require,module,exports){
exports.cellConfig = {
    type: 'object',
    properties: {
        width: {
            type: 'integer',
            default: 200
        },
        height: {
            type: 'integer',
            default: 200
        },
        padding: {
            type: 'integer',
            default: 16,
            description: 'default padding between facets.'
        },
        gridColor: {
            type: 'string',
            role: 'color',
            default: '#000000'
        },
        gridOpacity: {
            type: 'number',
            minimum: 0,
            maximum: 1,
            default: 0.25
        },
        gridOffset: {
            type: 'number',
            default: 6
        },
        fill: {
            type: 'string',
            role: 'color',
            default: 'rgba(0,0,0,0)'
        },
        fillOpacity: {
            type: 'number',
        },
        stroke: {
            type: 'string',
            role: 'color',
        },
        strokeWidth: {
            type: 'integer'
        },
        strokeOpacity: {
            type: 'number'
        },
        strokeDash: {
            type: 'array',
            default: undefined
        },
        strokeDashOffset: {
            type: 'integer',
            description: 'The offset (in pixels) into which to begin drawing with the stroke dash array.'
        }
    }
};

},{}],28:[function(require,module,exports){
exports.marksConfig = {
    type: 'object',
    properties: {
        filled: {
            type: 'boolean',
            default: false,
            description: 'Whether the shape\'s color should be used as fill color instead of stroke color.'
        },
        format: {
            type: 'string',
            default: '',
            description: 'The formatting pattern for text value.' +
                'If not defined, this will be determined automatically'
        },
        fill: {
            type: 'string',
            role: 'color',
            default: '#000000'
        },
        opacity: {
            type: 'number',
            default: undefined,
            minimum: 0,
            maximum: 1
        },
        strokeWidth: {
            type: 'integer',
            default: 2,
            minimum: 0
        },
        strokeDash: {
            type: 'array',
            default: undefined,
            description: 'An array of alternating stroke, space lengths for creating dashed or dotted lines.'
        },
        strokeDashOffset: {
            type: 'array',
            default: undefined,
            description: 'The offset (in pixels) into which to begin drawing with the stroke dash array.'
        },
        orient: {
            type: 'string',
            default: undefined,
            description: 'The orientation of this area mark. One of horizontal (the default) or vertical.'
        },
        interpolate: {
            type: 'string',
            default: undefined,
            description: 'The line interpolation method to use. One of linear, step-before, step-after, basis, basis-open, basis-closed, bundle, cardinal, cardinal-open, cardinal-closed, monotone.'
        },
        tension: {
            type: 'number',
            default: undefined,
            description: 'Depending on the interpolation type, sets the tension parameter.'
        },
        align: {
            type: 'string',
            default: 'right',
            enum: ['left', 'right', 'center'],
            description: 'The horizontal alignment of the text. One of left, right, center.'
        },
        angle: {
            type: 'number',
            default: undefined,
            description: 'The rotation angle of the text, in degrees.'
        },
        baseline: {
            type: 'string',
            default: 'middle',
            enum: ['top', 'middle', 'bottom'],
            description: 'The vertical alignment of the text. One of top, middle, bottom.'
        },
        dx: {
            type: 'number',
            default: undefined,
            description: 'The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the angle property.'
        },
        dy: {
            type: 'number',
            default: undefined,
            description: 'The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the angle property.'
        },
        font: {
            type: 'string',
            default: undefined,
            role: 'font',
            description: 'The typeface to set the text in (e.g., Helvetica Neue).'
        },
        fontStyle: {
            type: 'string',
            default: undefined,
            enum: ['normal', 'italic'],
            description: 'The font style (e.g., italic).'
        },
        fontWeight: {
            type: 'string',
            enum: ['normal', 'bold'],
            default: undefined,
            description: 'The font weight (e.g., bold).'
        },
        radius: {
            type: 'number',
            default: undefined,
            description: 'Polar coordinate radial offset, in pixels, of the text label from the origin determined by the x and y properties.'
        },
        theta: {
            type: 'number',
            default: undefined,
            description: 'Polar coordinate angle, in radians, of the text label from the origin determined by the x and y properties. Values for theta follow the same convention of arc mark startAngle and endAngle properties: angles are measured in radians, with 0 indicating "north".'
        }
    }
};

},{}],29:[function(require,module,exports){
var config_stack_schema_1 = require('./config.stack.schema');
var config_cell_schema_1 = require('./config.cell.schema');
var config_marks_schema_1 = require('./config.marks.schema');
exports.config = {
    type: 'object',
    properties: {
        viewport: {
            type: 'array',
            items: {
                type: 'integer'
            },
            default: undefined,
            description: 'The width and height of the on-screen viewport, in pixels. If necessary, clipping and scrolling will be applied.'
        },
        background: {
            type: 'string',
            role: 'color',
            default: undefined,
            description: 'CSS color property to use as background of visualization. Default is `"transparent"`.'
        },
        scene: {
            type: 'object',
            default: undefined,
            description: 'An object to style the top-level scenegraph root. Available properties include `fill`, `fillOpacity`, `stroke`, `strokeOpacity`, `strokeWidth`, `strokeDash`, `strokeDashOffset`'
        },
        filterNull: {
            type: 'object',
            properties: {
                nominal: { type: 'boolean', default: false },
                ordinal: { type: 'boolean', default: false },
                quantitative: { type: 'boolean', default: true },
                temporal: { type: 'boolean', default: true }
            }
        },
        textCellWidth: {
            type: 'integer',
            default: 90,
            minimum: 0
        },
        sortLineBy: {
            type: 'string',
            default: undefined,
            description: 'Data field to sort line by. ' +
                '\'-\' prefix can be added to suggest descending order.'
        },
        stack: config_stack_schema_1.stackConfig,
        cell: config_cell_schema_1.cellConfig,
        marks: config_marks_schema_1.marksConfig,
        singleBarOffset: {
            type: 'integer',
            default: 5,
            minimum: 0
        },
        characterWidth: {
            type: 'integer',
            default: 6
        },
        numberFormat: {
            type: 'string',
            default: 's',
            description: 'D3 Number format for axis labels and text tables.'
        },
        timeFormat: {
            type: 'string',
            default: '%Y-%m-%d',
            description: 'Date format for axis labels.'
        }
    }
};

},{"./config.cell.schema":27,"./config.marks.schema":28,"./config.stack.schema":30}],30:[function(require,module,exports){
exports.stackConfig = {
    type: ['boolean', 'object'],
    default: {},
    description: 'Enable stacking (for bar and area marks only).',
    properties: {
        sort: {
            oneOf: [{
                    type: 'string',
                    enum: ['ascending', 'descending']
                }, {
                    type: 'array',
                    items: { type: 'string' },
                }],
            description: 'Order of the stack. ' +
                'This can be either a string (either "descending" or "ascending")' +
                'or a list of fields to determine the order of stack layers.' +
                'By default, stack uses descending order.'
        },
        offset: {
            type: 'string',
            enum: ['zero', 'center', 'normalize']
        }
    }
};

},{}],31:[function(require,module,exports){
exports.data = {
    type: 'object',
    properties: {
        formatType: {
            type: 'string',
            enum: ['json', 'csv', 'tsv'],
            default: 'json'
        },
        url: {
            type: 'string',
            default: undefined
        },
        values: {
            type: 'array',
            default: undefined,
            description: 'Pass array of objects instead of a url to a file.',
            items: {
                type: 'object',
                additionalProperties: true
            }
        },
        filter: {
            type: 'string',
            default: undefined,
            description: 'A string containing the filter Vega expression. Use `datum` to refer to the current data object.'
        },
        calculate: {
            type: 'array',
            default: undefined,
            description: 'Calculate new field(s) using the provided expresssion(s). Calculation are applied before filter.',
            items: {
                type: 'object',
                properties: {
                    field: {
                        type: 'string',
                        description: 'The field in which to store the computed formula value.'
                    },
                    expr: {
                        type: 'string',
                        description: 'A string containing an expression for the formula. Use the variable `datum` to to refer to the current data object.'
                    }
                }
            }
        }
    }
};

},{}],32:[function(require,module,exports){
var schemautil_1 = require('./schemautil');
var util_1 = require('../util');
var axis_schema_1 = require('./axis.schema');
var legend_schema_1 = require('./legend.schema');
var sort_schema_1 = require('./sort.schema');
var fielddef_schema_1 = require('./fielddef.schema');
var requiredNameType = {
    required: ['field', 'type']
};
var x = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.typicalField), requiredNameType, {
    properties: {
        scale: {
            properties: {
                padding: { default: 1 },
                bandWidth: { default: 21 }
            }
        },
        axis: axis_schema_1.axis,
        sort: sort_schema_1.sort
    }
});
var y = util_1.duplicate(x);
var facet = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.onlyOrdinalField), requiredNameType, {
    properties: {
        axis: axis_schema_1.axis,
        sort: sort_schema_1.sort
    }
});
var row = schemautil_1.merge(util_1.duplicate(facet));
var column = schemautil_1.merge(util_1.duplicate(facet));
var size = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.typicalField), {
    properties: {
        legend: legend_schema_1.legend,
        sort: sort_schema_1.sort,
        value: {
            type: 'integer',
            default: 30,
            minimum: 0,
            description: 'Size of marks.'
        }
    }
});
var color = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.typicalField), {
    properties: {
        legend: legend_schema_1.legend,
        sort: sort_schema_1.sort,
        value: {
            type: 'string',
            role: 'color',
            default: '#4682b4',
            description: 'Color to be used for marks.'
        },
        scale: {
            type: 'object',
            properties: {
                quantitativeRange: {
                    type: 'array',
                    default: ['#AFC6A3', '#09622A'],
                    description: 'Color range to encode quantitative variables.',
                    minItems: 2,
                    maxItems: 2,
                    items: {
                        type: 'string',
                        role: 'color'
                    }
                }
            }
        }
    }
});
var shape = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.onlyOrdinalField), {
    properties: {
        legend: legend_schema_1.legend,
        sort: sort_schema_1.sort,
        value: {
            type: 'string',
            enum: ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-down'],
            default: 'circle',
            description: 'Mark to be used.'
        }
    }
});
var detail = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.onlyOrdinalField), {
    properties: {
        sort: sort_schema_1.sort
    }
});
var text = schemautil_1.merge(util_1.duplicate(fielddef_schema_1.typicalField), {
    properties: {
        sort: sort_schema_1.sort,
        value: {
            type: 'string',
            default: 'Abc'
        }
    }
});
exports.encoding = {
    type: 'object',
    properties: {
        x: x,
        y: y,
        row: row,
        column: column,
        size: size,
        color: color,
        shape: shape,
        text: text,
        detail: detail
    }
};

},{"../util":44,"./axis.schema":25,"./fielddef.schema":33,"./legend.schema":34,"./schemautil":38,"./sort.schema":39}],33:[function(require,module,exports){
var bin_schema_1 = require('./bin.schema');
var scale_schema_1 = require('./scale.schema');
var aggregate_1 = require('../aggregate');
var util_1 = require('../util');
var schemautil_1 = require('./schemautil');
var timeunit_1 = require('../timeunit');
var type_1 = require('../type');
exports.fieldDef = {
    type: 'object',
    properties: {
        field: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: [type_1.NOMINAL, type_1.ORDINAL, type_1.QUANTITATIVE, type_1.TEMPORAL]
        },
        timeUnit: {
            type: 'string',
            enum: timeunit_1.TIMEUNITS,
            supportedTypes: util_1.toMap([type_1.TEMPORAL])
        },
        bin: bin_schema_1.bin,
    }
};
exports.aggregate = {
    type: 'string',
    enum: aggregate_1.AGGREGATE_OPS,
    supportedEnums: {
        quantitative: aggregate_1.AGGREGATE_OPS,
        ordinal: ['median', 'min', 'max'],
        nominal: [],
        temporal: ['mean', 'median', 'min', 'max'],
        '': ['count']
    },
    supportedTypes: util_1.toMap([type_1.QUANTITATIVE, type_1.NOMINAL, type_1.ORDINAL, type_1.TEMPORAL, ''])
};
exports.typicalField = schemautil_1.merge(util_1.duplicate(exports.fieldDef), {
    properties: {
        aggregate: exports.aggregate,
        scale: scale_schema_1.typicalScale
    }
});
exports.onlyOrdinalField = schemautil_1.merge(util_1.duplicate(exports.fieldDef), {
    properties: {
        scale: scale_schema_1.ordinalOnlyScale
    }
});

},{"../aggregate":7,"../timeunit":42,"../type":43,"../util":44,"./bin.schema":26,"./scale.schema":36,"./schemautil":38}],34:[function(require,module,exports){
exports.legend = {
    default: true,
    description: 'Properties of a legend or boolean flag for determining whether to show it.',
    oneOf: [{
            type: 'object',
            properties: {
                orient: {
                    type: 'string',
                    default: undefined,
                    description: 'The orientation of the legend. One of "left" or "right". This determines how the legend is positioned within the scene. The default is "right".'
                },
                title: {
                    type: 'string',
                    default: undefined,
                    description: 'A title for the legend. (Shows field name and its function by default.)'
                },
                format: {
                    type: 'string',
                    default: undefined,
                    description: 'An optional formatting pattern for legend labels. Vega uses D3\'s format pattern.'
                },
                values: {
                    type: 'array',
                    default: undefined,
                    description: 'Explicitly set the visible legend values.'
                },
                properties: {
                    type: 'object',
                    default: undefined,
                    description: 'Optional mark property definitions for custom legend styling. '
                }
            }
        }, {
            type: 'boolean'
        }]
};

},{}],35:[function(require,module,exports){
exports.mark = {
    type: 'string',
    enum: ['point', 'tick', 'bar', 'line', 'area', 'circle', 'square', 'text']
};

},{}],36:[function(require,module,exports){
var util_1 = require('../util');
var schemautil_1 = require('./schemautil');
var type_1 = require('../type');
var scale = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: ['linear', 'log', 'pow', 'sqrt', 'quantile'],
            default: 'linear',
            supportedTypes: util_1.toMap([type_1.QUANTITATIVE])
        },
        domain: {
            default: undefined,
            type: ['array', 'object'],
            description: 'The domain of the scale, representing the set of data values. For quantitative data, this can take the form of a two-element array with minimum and maximum values. For ordinal/categorical data, this may be an array of valid input values. The domain may also be specified by a reference to a data source.'
        },
        range: {
            default: undefined,
            type: ['array', 'object', 'string'],
            description: 'The range of the scale, representing the set of visual values. For numeric values, the range can take the form of a two-element array with minimum and maximum values. For ordinal or quantized data, the range may by an array of desired output values, which are mapped to elements in the specified domain. For ordinal scales only, the range can be defined using a DataRef: the range values are then drawn dynamically from a backing data set.'
        },
        round: {
            default: undefined,
            type: 'boolean',
            description: 'If true, rounds numeric output values to integers. This can be helpful for snapping to the pixel grid.'
        }
    }
};
var ordinalScaleMixin = {
    properties: {
        bandWidth: {
            type: 'integer',
            minimum: 0,
            default: undefined
        },
        outerPadding: {
            type: 'number',
            default: undefined
        },
        padding: {
            type: 'number',
            default: undefined,
            description: 'Applies spacing among ordinal elements in the scale range. The actual effect depends on how the scale is configured. If the __points__ parameter is `true`, the padding value is interpreted as a multiple of the spacing between points. A reasonable value is 1.0, such that the first and last point will be offset from the minimum and maximum value by half the distance between points. Otherwise, padding is typically in the range [0, 1] and corresponds to the fraction of space in the range interval to allocate to padding. A value of 0.5 means that the range band width will be equal to the padding width. For more, see the [D3 ordinal scale documentation](https://github.com/mbostock/d3/wiki/Ordinal-Scales).'
        },
        points: {
            type: 'boolean',
            default: undefined,
            description: 'If true, distributes the ordinal values over a quantitative range at uniformly spaced points. The spacing of the points can be adjusted using the padding property. If false, the ordinal scale will construct evenly-spaced bands, rather than points.'
        }
    }
};
var typicalScaleMixin = {
    properties: {
        clamp: {
            type: 'boolean',
            default: true,
            description: 'If true, values that exceed the data domain are clamped to either the minimum or maximum range value'
        },
        nice: {
            default: undefined,
            oneOf: [
                {
                    type: 'boolean',
                    description: 'If true, modifies the scale domain to use a more human-friendly number range (e.g., 7 instead of 6.96).'
                }, {
                    type: 'string',
                    enum: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
                    description: 'If specified, modifies the scale domain to use a more human-friendly value range. For time and utc scale types only, the nice value should be a string indicating the desired time interval; legal values are "second", "minute", "hour", "day", "week", "month", or "year".'
                }
            ],
            supportedTypes: util_1.toMap([type_1.QUANTITATIVE, type_1.TEMPORAL]),
            description: ''
        },
        exponent: {
            type: 'number',
            default: undefined,
            description: 'Sets the exponent of the scale transformation. For pow scale types only, otherwise ignored.'
        },
        zero: {
            type: 'boolean',
            description: 'If true, ensures that a zero baseline value is included in the scale domain. This option is ignored for non-quantitative scales.',
            default: undefined,
            supportedTypes: util_1.toMap([type_1.QUANTITATIVE, type_1.TEMPORAL])
        },
        useRawDomain: {
            type: 'boolean',
            default: false,
            description: 'Uses the source data range as scale domain instead of ' +
                'aggregated data for aggregate axis. ' +
                'This option does not work with sum or count aggregate' +
                'as they might have a substantially larger scale range.'
        }
    }
};
exports.ordinalOnlyScale = schemautil_1.merge(util_1.duplicate(scale), ordinalScaleMixin);
exports.typicalScale = schemautil_1.merge(util_1.duplicate(scale), ordinalScaleMixin, typicalScaleMixin);

},{"../type":43,"../util":44,"./schemautil":38}],37:[function(require,module,exports){
var schemaUtil = require('./schemautil');
var mark_schema_1 = require('./mark.schema');
var config_schema_1 = require('./config.schema');
var data_schema_1 = require('./data.schema');
var encoding_schema_1 = require('./encoding.schema');
var fielddef_schema_1 = require('./fielddef.schema');
exports.aggregate = fielddef_schema_1.aggregate;
exports.util = schemaUtil;
exports.schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'Schema for Vega-lite specification',
    type: 'object',
    required: ['mark', 'encoding'],
    properties: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        data: data_schema_1.data,
        mark: mark_schema_1.mark,
        encoding: encoding_schema_1.encoding,
        config: config_schema_1.config
    }
};
function instantiate() {
    return schemaUtil.instantiate(exports.schema);
}
exports.instantiate = instantiate;
;

},{"./config.schema":29,"./data.schema":31,"./encoding.schema":32,"./fielddef.schema":33,"./mark.schema":35,"./schemautil":38}],38:[function(require,module,exports){
var util = require('../util');
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
;
function extend(instance, schema) {
    return merge(instantiate(schema), instance);
}
exports.extend = extend;
;
function instantiate(schema) {
    var val;
    if (schema === undefined) {
        return undefined;
    }
    else if ('default' in schema) {
        val = schema.default;
        return util.isObject(val) ? util.duplicate(val) : val;
    }
    else if (schema.type === 'object') {
        var instance = {};
        for (var name in schema.properties) {
            if (schema.properties.hasOwnProperty(name)) {
                val = instantiate(schema.properties[name]);
                if (val !== undefined) {
                    instance[name] = val;
                }
            }
        }
        return instance;
    }
    else if (schema.type === 'array') {
        return undefined;
    }
    return undefined;
}
exports.instantiate = instantiate;
;
function subtract(instance, defaults) {
    var changes = {};
    for (var prop in instance) {
        if (instance.hasOwnProperty(prop)) {
            var def = defaults[prop];
            var ins = instance[prop];
            if (!defaults || def !== ins) {
                if (typeof ins === 'object' && !util.isArray(ins) && def) {
                    var c = subtract(ins, def);
                    if (!isEmpty(c)) {
                        changes[prop] = c;
                    }
                }
                else if (util.isArray(ins)) {
                    if (util.isArray(def)) {
                        if (ins.length === def.length) {
                            var equal = true;
                            for (var i = 0; i < ins.length; i++) {
                                if (ins[i] !== def[i]) {
                                    equal = false;
                                    break;
                                }
                            }
                            if (equal) {
                                continue;
                            }
                        }
                    }
                    changes[prop] = ins;
                }
                else {
                    changes[prop] = ins;
                }
            }
        }
    }
    return changes;
}
exports.subtract = subtract;
;
function merge(dest) {
    var src = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        src[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < src.length; i++) {
        dest = merge_(dest, src[i]);
    }
    return dest;
}
exports.merge = merge;
;
function merge_(dest, src) {
    if (typeof src !== 'object' || src === null) {
        return dest;
    }
    for (var p in src) {
        if (!src.hasOwnProperty(p)) {
            continue;
        }
        if (src[p] === undefined) {
            continue;
        }
        if (typeof src[p] !== 'object' || src[p] === null) {
            dest[p] = src[p];
        }
        else if (typeof dest[p] !== 'object' || dest[p] === null) {
            dest[p] = merge(src[p].constructor === Array ? [] : {}, src[p]);
        }
        else {
            merge(dest[p], src[p]);
        }
    }
    return dest;
}

},{"../util":44}],39:[function(require,module,exports){
var aggregate_1 = require('../aggregate');
var type_1 = require('../type');
var util_1 = require('../util');
exports.sort = {
    default: 'ascending',
    supportedTypes: util_1.toMap([type_1.QUANTITATIVE, type_1.ORDINAL]),
    oneOf: [
        {
            type: 'string',
            enum: ['ascending', 'descending', 'unsorted']
        },
        {
            type: 'object',
            required: ['field', 'op'],
            properties: {
                field: {
                    type: 'string',
                    description: 'The field name to aggregate over.'
                },
                op: {
                    type: 'string',
                    enum: aggregate_1.AGGREGATE_OPS,
                    description: 'The field name to aggregate over.'
                },
                order: {
                    type: 'string',
                    enum: ['ascending', 'descending']
                }
            }
        }
    ]
};

},{"../aggregate":7,"../type":43,"../util":44}],40:[function(require,module,exports){
var aggregate_1 = require('./aggregate');
var timeunit_1 = require('./timeunit');
var type_1 = require('./type');
var vlEncoding = require('./encoding');
var mark_1 = require('./mark');
exports.DELIM = '|';
exports.ASSIGN = '=';
exports.TYPE = ',';
exports.FUNC = '_';
function shorten(spec) {
    return 'mark' + exports.ASSIGN + spec.mark +
        exports.DELIM + shortenEncoding(spec.encoding);
}
exports.shorten = shorten;
function parse(shorthand, data, config) {
    var split = shorthand.split(exports.DELIM), mark = split.shift().split(exports.ASSIGN)[1].trim(), encoding = parseEncoding(split.join(exports.DELIM));
    var spec = {
        mark: mark_1.Mark[mark],
        encoding: encoding
    };
    if (data !== undefined) {
        spec.data = data;
    }
    if (config !== undefined) {
        spec.config = config;
    }
    return spec;
}
exports.parse = parse;
function shortenEncoding(encoding) {
    return vlEncoding.map(encoding, function (fieldDef, channel) {
        return channel + exports.ASSIGN + shortenFieldDef(fieldDef);
    }).join(exports.DELIM);
}
exports.shortenEncoding = shortenEncoding;
function parseEncoding(encodingShorthand) {
    return encodingShorthand.split(exports.DELIM).reduce(function (m, e) {
        var split = e.split(exports.ASSIGN), enctype = split[0].trim(), fieldDefShorthand = split[1];
        m[enctype] = parseFieldDef(fieldDefShorthand);
        return m;
    }, {});
}
exports.parseEncoding = parseEncoding;
function shortenFieldDef(fieldDef) {
    return (fieldDef.aggregate ? fieldDef.aggregate + exports.FUNC : '') +
        (fieldDef.timeUnit ? fieldDef.timeUnit + exports.FUNC : '') +
        (fieldDef.bin ? 'bin' + exports.FUNC : '') +
        (fieldDef.field || '') + exports.TYPE + type_1.SHORT_TYPE[fieldDef.type];
}
exports.shortenFieldDef = shortenFieldDef;
function shortenFieldDefs(fieldDefs, delim) {
    if (delim === void 0) { delim = exports.DELIM; }
    return fieldDefs.map(shortenFieldDef).join(delim);
}
exports.shortenFieldDefs = shortenFieldDefs;
function parseFieldDef(fieldDefShorthand) {
    var split = fieldDefShorthand.split(exports.TYPE);
    var fieldDef = {
        field: split[0].trim(),
        type: type_1.TYPE_FROM_SHORT_TYPE[split[1].trim()]
    };
    for (var i = 0; i < aggregate_1.AGGREGATE_OPS.length; i++) {
        var a = aggregate_1.AGGREGATE_OPS[i];
        if (fieldDef.field.indexOf(a + '_') === 0) {
            fieldDef.field = fieldDef.field.substr(a.length + 1);
            if (a === 'count' && fieldDef.field.length === 0) {
                fieldDef.field = '*';
            }
            fieldDef.aggregate = a;
            break;
        }
    }
    for (var i = 0; i < timeunit_1.TIMEUNITS.length; i++) {
        var tu = timeunit_1.TIMEUNITS[i];
        if (fieldDef.field && fieldDef.field.indexOf(tu + '_') === 0) {
            fieldDef.field = fieldDef.field.substr(fieldDef.field.length + 1);
            fieldDef.timeUnit = tu;
            break;
        }
    }
    if (fieldDef.field && fieldDef.field.indexOf('bin_') === 0) {
        fieldDef.field = fieldDef.field.substr(4);
        fieldDef.bin = true;
    }
    return fieldDef;
}
exports.parseFieldDef = parseFieldDef;

},{"./aggregate":7,"./encoding":22,"./mark":24,"./timeunit":42,"./type":43}],41:[function(require,module,exports){
var Model_1 = require('./compiler/Model');
var channel_1 = require('./channel');
var vlEncoding = require('./encoding');
var mark_1 = require('./mark');
var util_1 = require('./util');
function alwaysNoOcclusion(spec) {
    return vlEncoding.isAggregate(spec.encoding);
}
exports.alwaysNoOcclusion = alwaysNoOcclusion;
function fieldDefs(spec) {
    return vlEncoding.fieldDefs(spec.encoding);
}
exports.fieldDefs = fieldDefs;
;
function getCleanSpec(spec) {
    return new Model_1.Model(spec).toSpec(true);
}
exports.getCleanSpec = getCleanSpec;
function isStack(spec) {
    return (vlEncoding.has(spec.encoding, channel_1.COLOR) || vlEncoding.has(spec.encoding, channel_1.SHAPE)) &&
        (spec.mark === mark_1.BAR || spec.mark === mark_1.AREA) &&
        (!spec.config || !spec.config.stack !== false) &&
        vlEncoding.isAggregate(spec.encoding);
}
exports.isStack = isStack;
function transpose(spec) {
    var oldenc = spec.encoding, encoding = util_1.duplicate(spec.encoding);
    encoding.x = oldenc.y;
    encoding.y = oldenc.x;
    encoding.row = oldenc.column;
    encoding.column = oldenc.row;
    spec.encoding = encoding;
    return spec;
}
exports.transpose = transpose;

},{"./channel":9,"./compiler/Model":10,"./encoding":22,"./mark":24,"./util":44}],42:[function(require,module,exports){
exports.TIMEUNITS = [
    'year', 'month', 'day', 'date', 'hours', 'minutes', 'seconds'
];

},{}],43:[function(require,module,exports){
(function (Type) {
    Type[Type["QUANTITATIVE"] = 'quantitative'] = "QUANTITATIVE";
    Type[Type["ORDINAL"] = 'ordinal'] = "ORDINAL";
    Type[Type["TEMPORAL"] = 'temporal'] = "TEMPORAL";
    Type[Type["NOMINAL"] = 'nominal'] = "NOMINAL";
})(exports.Type || (exports.Type = {}));
var Type = exports.Type;
exports.QUANTITATIVE = Type.QUANTITATIVE;
exports.ORDINAL = Type.ORDINAL;
exports.TEMPORAL = Type.TEMPORAL;
exports.NOMINAL = Type.NOMINAL;
exports.SHORT_TYPE = {
    quantitative: 'Q',
    temporal: 'T',
    nominal: 'N',
    ordinal: 'O'
};
exports.TYPE_FROM_SHORT_TYPE = {
    Q: exports.QUANTITATIVE,
    T: exports.TEMPORAL,
    O: exports.ORDINAL,
    N: exports.NOMINAL
};
function getFullName(type) {
    var typeString = type;
    return exports.TYPE_FROM_SHORT_TYPE[typeString.toUpperCase()] ||
        typeString.toLowerCase();
}
exports.getFullName = getFullName;

},{}],44:[function(require,module,exports){
var util_1 = require('datalib/src/util');
exports.keys = util_1.keys;
exports.extend = util_1.extend;
exports.duplicate = util_1.duplicate;
exports.isArray = util_1.isArray;
exports.vals = util_1.vals;
exports.truncate = util_1.truncate;
exports.toMap = util_1.toMap;
exports.isObject = util_1.isObject;
var generate_1 = require('datalib/src/generate');
exports.range = generate_1.range;
function contains(array, item) {
    return array.indexOf(item) > -1;
}
exports.contains = contains;
function forEach(obj, f, thisArg) {
    if (obj.forEach) {
        obj.forEach.call(thisArg, f);
    }
    else {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                f.call(thisArg, obj[k], k, obj);
            }
        }
    }
}
exports.forEach = forEach;
function reduce(obj, f, init, thisArg) {
    if (obj.reduce) {
        return obj.reduce.call(thisArg, f, init);
    }
    else {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                init = f.call(thisArg, init, obj[k], k, obj);
            }
        }
        return init;
    }
}
exports.reduce = reduce;
function map(obj, f, thisArg) {
    if (obj.map) {
        return obj.map.call(thisArg, f);
    }
    else {
        var output = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                output.push(f.call(thisArg, obj[k], k, obj));
            }
        }
        return output;
    }
}
exports.map = map;
function any(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (f(arr[k], k, i++)) {
            return true;
        }
    }
    return false;
}
exports.any = any;
function all(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (!f(arr[k], k, i++)) {
            return false;
        }
    }
    return true;
}
exports.all = all;
var dlBin = require('datalib/src/bins/bins');
function getbins(stats, maxbins) {
    return dlBin({
        min: stats.min,
        max: stats.max,
        maxbins: maxbins
    });
}
exports.getbins = getbins;
function error(message) {
    console.error('[VL Error]', message);
}
exports.error = error;

},{"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6}],45:[function(require,module,exports){
var util_1 = require('./util');
var mark_1 = require('./mark');
exports.DEFAULT_REQUIRED_CHANNEL_MAP = {
    text: ['text'],
    line: ['x', 'y'],
    area: ['x', 'y']
};
exports.DEFAULT_SUPPORTED_CHANNEL_TYPE = {
    bar: util_1.toMap(['row', 'column', 'x', 'y', 'size', 'color', 'detail']),
    line: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'detail']),
    area: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'detail']),
    tick: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'detail']),
    circle: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'size', 'detail']),
    square: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'size', 'detail']),
    point: util_1.toMap(['row', 'column', 'x', 'y', 'color', 'size', 'detail', 'shape']),
    text: util_1.toMap(['row', 'column', 'size', 'color', 'text'])
};
function getEncodingMappingError(spec, requiredChannelMap, supportedChannelMap) {
    if (requiredChannelMap === void 0) { requiredChannelMap = exports.DEFAULT_REQUIRED_CHANNEL_MAP; }
    if (supportedChannelMap === void 0) { supportedChannelMap = exports.DEFAULT_SUPPORTED_CHANNEL_TYPE; }
    var mark = spec.mark;
    var encoding = spec.encoding;
    var requiredChannels = requiredChannelMap[mark];
    var supportedChannels = supportedChannelMap[mark];
    for (var i in requiredChannels) {
        if (!(requiredChannels[i] in encoding)) {
            return 'Missing encoding channel \"' + requiredChannels[i] +
                '\" for mark \"' + mark + '\"';
        }
    }
    for (var channel in encoding) {
        if (!supportedChannels[channel]) {
            return 'Encoding channel \"' + channel +
                '\" is not supported by mark type \"' + mark + '\"';
        }
    }
    if (mark === mark_1.BAR && !encoding.x && !encoding.y) {
        return 'Missing both x and y for bar';
    }
    return null;
}
exports.getEncodingMappingError = getEncodingMappingError;

},{"./mark":24,"./util":44}],46:[function(require,module,exports){
var vlBin = require('./bin');
var vlChannel = require('./channel');
var vlData = require('./data');
var vlEncoding = require('./encoding');
var vlFieldDef = require('./fielddef');
var vlCompiler = require('./compiler/compiler');
var vlSchema = require('./schema/schema');
var vlShorthand = require('./shorthand');
var vlSpec = require('./spec');
var vlTimeUnit = require('./timeunit');
var vlType = require('./type');
var vlValidate = require('./validate');
var vlUtil = require('./util');
exports.bin = vlBin;
exports.channel = vlChannel;
exports.compiler = vlCompiler;
exports.compile = vlCompiler.compile;
exports.data = vlData;
exports.encoding = vlEncoding;
exports.fieldDef = vlFieldDef;
exports.schema = vlSchema;
exports.shorthand = vlShorthand;
exports.spec = vlSpec;
exports.timeUnit = vlTimeUnit;
exports.type = vlType;
exports.util = vlUtil;
exports.validate = vlValidate;
exports.version = '0.9.2';

},{"./bin":8,"./channel":9,"./compiler/compiler":12,"./data":21,"./encoding":22,"./fielddef":23,"./schema/schema":37,"./shorthand":40,"./spec":41,"./timeunit":42,"./type":43,"./util":44,"./validate":45}]},{},[46])(46)
});
//# sourceMappingURL=vega-lite.js.map
