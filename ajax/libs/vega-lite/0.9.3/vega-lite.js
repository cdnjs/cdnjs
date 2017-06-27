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
    while (Math.ceil(span/step) > maxb) { step *= base; }

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
    gen = module.exports;

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
(function (Buffer){
var u = module.exports;

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

u.isBuffer = (typeof Buffer === 'function' && Buffer.isBuffer) || u.false;

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

}).call(this,require("buffer").Buffer)

},{"buffer":1}],7:[function(require,module,exports){
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
        case channel_1.SIZE:
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
    Channel[Channel["PATH"] = 'path'] = "PATH";
    Channel[Channel["TEXT"] = 'text'] = "TEXT";
    Channel[Channel["DETAIL"] = 'detail'] = "DETAIL";
    Channel[Channel["LABEL"] = 'label'] = "LABEL";
})(exports.Channel || (exports.Channel = {}));
var Channel = exports.Channel;
exports.X = Channel.X;
exports.Y = Channel.Y;
exports.ROW = Channel.ROW;
exports.COLUMN = Channel.COLUMN;
exports.SHAPE = Channel.SHAPE;
exports.SIZE = Channel.SIZE;
exports.COLOR = Channel.COLOR;
exports.PATH = Channel.PATH;
exports.TEXT = Channel.TEXT;
exports.DETAIL = Channel.DETAIL;
exports.LABEL = Channel.LABEL;
exports.CHANNELS = [exports.X, exports.Y, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.PATH, exports.TEXT, exports.DETAIL, exports.LABEL];
;
function supportMark(channel, mark) {
    return !!getSupportedMark(channel)[mark];
}
exports.supportMark = supportMark;
function getSupportedMark(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.COLOR:
        case exports.DETAIL:
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
        case exports.SHAPE:
            return { point: true };
        case exports.TEXT:
            return { text: true };
        case exports.PATH:
            return { line: true };
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
        case exports.LABEL:
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
        case exports.PATH:
            return {
                measure: false,
                dimension: true
            };
    }
    throw new Error('Invalid encoding channel' + channel);
}
exports.getSupportedRole = getSupportedRole;

},{}],10:[function(require,module,exports){
var axis_schema_1 = require('../schema/axis.schema');
var legend_schema_1 = require('../schema/legend.schema');
var schemautil_1 = require('../schema/schemautil');
var schema = require('../schema/schema');
var schemaUtil = require('../schema/schemautil');
var channel_1 = require('../channel');
var data_1 = require('../data');
var vlFieldDef = require('../fielddef');
var vlEncoding = require('../encoding');
var mark_1 = require('../mark');
var type_1 = require('../type');
var util_1 = require('../util');
var config_1 = require('./config');
var layout_1 = require('./layout');
var stack_1 = require('./stack');
var scale_1 = require('./scale');
var Model = (function () {
    function Model(spec) {
        var defaults = schema.instantiate();
        this._spec = schemaUtil.mergeDeep(defaults, spec);
        vlEncoding.forEach(this._spec.encoding, function (fieldDef, channel) {
            if (!channel_1.supportMark(channel, this._spec.mark)) {
                console.warn(channel, 'dropped as it is incompatible with', this._spec.mark);
                delete this._spec.encoding[channel].field;
            }
            if (fieldDef.type) {
                fieldDef.type = type_1.getFullName(fieldDef.type);
            }
            if (fieldDef.axis === true) {
                fieldDef.axis = schemautil_1.instantiate(axis_schema_1.axis);
            }
            if (fieldDef.legend === true) {
                fieldDef.legend = schemautil_1.instantiate(legend_schema_1.legend);
            }
            if (channel === channel_1.ROW && fieldDef.scale.padding === undefined) {
                fieldDef.scale.padding = this.has(channel_1.Y) ? 16 : 0;
            }
            if (channel === channel_1.COLUMN && fieldDef.scale.padding === undefined) {
                fieldDef.scale.padding = this.has(channel_1.X) ? 16 : 0;
            }
        }, this);
        this._stack = stack_1.compileStackProperties(this._spec);
        this._spec.config.mark = config_1.compileMarkConfig(this._spec, this._stack);
        this._layout = layout_1.compileLayout(this);
    }
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
        return vlEncoding.has(this._spec.encoding, channel);
    };
    Model.prototype.fieldDef = function (channel) {
        return this._spec.encoding[channel];
    };
    Model.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: scale_1.type(fieldDef, channel, this.mark()) === 'ordinal' ? '_range' : '_start'
            }, opt);
        }
        return vlFieldDef.field(fieldDef, opt);
    };
    Model.prototype.fieldTitle = function (channel) {
        return vlFieldDef.title(this._spec.encoding[channel]);
    };
    Model.prototype.channels = function () {
        return vlEncoding.channels(this._spec.encoding);
    };
    Model.prototype.map = function (f, t) {
        return vlEncoding.map(this._spec.encoding, f, t);
    };
    Model.prototype.reduce = function (f, init, t) {
        return vlEncoding.reduce(this._spec.encoding, f, init, t);
    };
    Model.prototype.forEach = function (f, t) {
        vlEncoding.forEach(this._spec.encoding, f, t);
    };
    Model.prototype.isOrdinalScale = function (channel) {
        var fieldDef = this.fieldDef(channel);
        return fieldDef && (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) ||
            (fieldDef.type === type_1.TEMPORAL && scale_1.type(fieldDef, channel, this.mark()) === 'ordinal'));
    };
    Model.prototype.isDimension = function (channel) {
        return vlFieldDef.isDimension(this.fieldDef(channel));
    };
    Model.prototype.isMeasure = function (channel) {
        return vlFieldDef.isMeasure(this.fieldDef(channel));
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
    Model.prototype.transform = function () {
        return this._spec.transform;
    };
    Model.prototype.hasValues = function () {
        var vals = this.data().values;
        return vals && vals.length;
    };
    Model.prototype.config = function () {
        return this._spec.config;
    };
    Model.prototype.axis = function (channel) {
        var axis = this.fieldDef(channel).axis;
        return typeof axis !== 'boolean' ? axis : {};
    };
    Model.prototype.legend = function (channel) {
        var legend = this.fieldDef(channel).legend;
        return typeof legend !== 'boolean' ? legend : {};
    };
    Model.prototype.scaleName = function (channel) {
        var name = this.spec().name;
        return (name ? name + '-' : '') + channel;
    };
    Model.prototype.sizeValue = function (channel) {
        if (channel === void 0) { channel = channel_1.SIZE; }
        var value = this.fieldDef(channel_1.SIZE).value;
        if (value !== undefined) {
            return value;
        }
        switch (this.mark()) {
            case mark_1.TEXT:
                return 10;
            case mark_1.BAR:
                return !this.has(channel) || this.isOrdinalScale(channel) ?
                    this.fieldDef(channel).scale.bandWidth - 1 :
                    2;
            case mark_1.TICK:
                return this.fieldDef(channel).scale.bandWidth / 1.5;
        }
        return 30;
    };
    return Model;
})();
exports.Model = Model;

},{"../channel":9,"../data":29,"../encoding":30,"../fielddef":31,"../mark":32,"../schema/axis.schema":33,"../schema/legend.schema":43,"../schema/schema":46,"../schema/schemautil":47,"../type":53,"../util":54,"./config":13,"./layout":16,"./scale":25,"./stack":26}],11:[function(require,module,exports){
var util_1 = require('../util');
var type_1 = require('../type');
var channel_1 = require('../channel');
var util_2 = require('./util');
function compileAxis(channel, model) {
    var isCol = channel === channel_1.COLUMN, isRow = channel === channel_1.ROW, type = isCol ? 'x' : isRow ? 'y' : channel;
    var def = {
        type: type,
        scale: model.scaleName(channel)
    };
    util_1.extend(def, util_2.formatMixins(model, channel, model.axis(channel).format));
    [
        'grid', 'layer', 'orient', 'tickSize', 'ticks', 'title',
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
    var props = model.axis(channel).properties || {};
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
function grid(model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
        return undefined;
    }
    var grid = model.axis(channel).grid;
    if (grid !== undefined) {
        return grid;
    }
    return !model.isOrdinalScale(channel) && !fieldDef.bin;
}
exports.grid = grid;
function layer(model, channel, def) {
    var layer = model.axis(channel).layer;
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
    var orient = model.axis(channel).orient;
    if (orient) {
        return orient;
    }
    else if (channel === channel_1.COLUMN) {
        return 'top';
    }
    else if (channel === channel_1.ROW) {
        if (model.has(channel_1.Y) && model.axis(channel_1.Y).orient !== 'right') {
            return 'right';
        }
    }
    return undefined;
}
exports.orient = orient;
function ticks(model, channel) {
    var ticks = model.axis(channel).ticks;
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
    var tickSize = model.axis(channel).tickSize;
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
    var axis = model.axis(channel);
    if (axis.title !== undefined) {
        return axis.title;
    }
    var fieldTitle = model.fieldTitle(channel);
    var layout = model.layout();
    var cellWidth = layout.cellWidth;
    var cellHeight = layout.cellHeight;
    var maxLength;
    if (axis.titleMaxLength) {
        maxLength = axis.titleMaxLength;
    }
    else if (channel === channel_1.X && typeof cellWidth === 'number') {
        maxLength = cellWidth / model.axis(channel_1.X).characterWidth;
    }
    else if (channel === channel_1.Y && typeof cellHeight === 'number') {
        maxLength = cellHeight / model.axis(channel_1.Y).characterWidth;
    }
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
var properties;
(function (properties) {
    function axis(model, channel, axisPropsSpec) {
        if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
            return util_1.extend({
                opacity: { value: 0 }
            }, axisPropsSpec || {});
        }
        return axisPropsSpec || undefined;
    }
    properties.axis = axis;
    function labels(model, channel, labelsSpec, def) {
        var fieldDef = model.fieldDef(channel);
        var axis = model.axis(channel);
        if (!axis.labels) {
            return util_1.extend({
                text: ''
            }, labelsSpec);
        }
        if (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) && axis.labelMaxLength) {
            labelsSpec = util_1.extend({
                text: {
                    template: '{{ datum.data | truncate:' + axis.labelMaxLength + '}}'
                }
            }, labelsSpec || {});
        }
        switch (channel) {
            case channel_1.X:
                if (model.isDimension(channel_1.X) || fieldDef.type === type_1.TEMPORAL) {
                    labelsSpec = util_1.extend({
                        angle: { value: 270 },
                        align: { value: def.orient === 'top' ? 'left' : 'right' },
                        baseline: { value: 'middle' }
                    }, labelsSpec || {});
                }
                break;
            case channel_1.ROW:
                if (def.orient === 'right') {
                    labelsSpec = util_1.extend({
                        angle: { value: 90 },
                        align: { value: 'center' },
                        baseline: { value: 'bottom' }
                    }, labelsSpec || {});
                }
        }
        return labelsSpec || undefined;
    }
    properties.labels = labels;
})(properties = exports.properties || (exports.properties = {}));

},{"../channel":9,"../type":53,"../util":54,"./util":28}],12:[function(require,module,exports){
var Model_1 = require('./Model');
var axis_1 = require('./axis');
var data_1 = require('./data');
var facet_1 = require('./facet');
var legend_1 = require('./legend');
var mark_1 = require('./mark');
var scale_1 = require('./scale');
var util_1 = require('../util');
var data_2 = require('../data');
var channel_1 = require('../channel');
var Model_2 = require('./Model');
exports.Model = Model_2.Model;
function compile(spec) {
    var model = new Model_1.Model(spec);
    var layout = model.layout();
    var FIT = 1;
    var config = model.config();
    var output = util_1.extend(spec.name ? { name: spec.name } : {}, {
        width: typeof layout.width !== 'number' ? FIT : layout.width,
        height: typeof layout.height !== 'number' ? FIT : layout.height,
        padding: 'auto'
    }, config.viewport ? { viewport: config.viewport } : {}, config.background ? { background: config.background } : {}, util_1.keys(config.scene).length > 0 ? scene(config) : {}, {
        data: data_1.compileData(model),
        marks: [compileRootGroup(model)]
    });
    return {
        spec: output
    };
}
exports.compile = compile;
function scene(config) {
    return ['fill', 'fillOpacity', 'stroke', 'strokeWidth',
        'strokeOpacity', 'strokeDash', 'strokeDashOffset'].
        reduce(function (topLevelConfig, property) {
        var value = config.scene[property];
        if (value !== undefined) {
            topLevelConfig.scene = topLevelConfig.scene || {};
            topLevelConfig.scene[property] = { value: value };
        }
        return topLevelConfig;
    }, {});
}
function compileRootGroup(model) {
    var spec = model.spec();
    var width = model.layout().width;
    var height = model.layout().height;
    var rootGroup = util_1.extend({
        name: spec.name ? spec.name + '-root' : 'root',
        type: 'group',
    }, spec.description ? { description: spec.description } : {}, {
        from: { data: data_2.LAYOUT },
        properties: {
            update: {
                width: typeof width !== 'number' ?
                    { field: width.field } :
                    { value: width },
                height: typeof height !== 'number' ?
                    { field: height.field } :
                    { value: height }
            }
        }
    });
    var marks = mark_1.compileMark(model);
    if (model.has(channel_1.ROW) || model.has(channel_1.COLUMN)) {
        util_1.extend(rootGroup, facet_1.facetMixins(model, marks));
    }
    else {
        rootGroup.marks = marks;
        rootGroup.scales = scale_1.compileScales(model.channels(), model);
        var axes = (model.has(channel_1.X) && model.fieldDef(channel_1.X).axis ? [axis_1.compileAxis(channel_1.X, model)] : [])
            .concat(model.has(channel_1.Y) && model.fieldDef(channel_1.Y).axis ? [axis_1.compileAxis(channel_1.Y, model)] : []);
        if (axes.length > 0) {
            rootGroup.axes = axes;
        }
    }
    var legends = legend_1.compileLegends(model);
    if (legends.length > 0) {
        rootGroup.legends = legends;
    }
    return rootGroup;
}
exports.compileRootGroup = compileRootGroup;

},{"../channel":9,"../data":29,"../util":54,"./Model":10,"./axis":11,"./data":14,"./facet":15,"./legend":17,"./mark":24,"./scale":25}],13:[function(require,module,exports){
var channel_1 = require('../channel');
var encoding_1 = require('../encoding');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var util_1 = require('../util');
function compileMarkConfig(spec, stack) {
    return util_1.extend(['filled', 'opacity', 'orient', 'align'].reduce(function (cfg, property) {
        var value = spec.config.mark[property];
        switch (property) {
            case 'filled':
                if (value === undefined) {
                    cfg[property] = spec.mark !== mark_1.POINT;
                }
                break;
            case 'opacity':
                if (value === undefined && util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], spec.mark)) {
                    if (!encoding_1.isAggregate(spec.encoding) || encoding_1.has(spec.encoding, channel_1.DETAIL)) {
                        cfg[property] = 0.7;
                    }
                }
                break;
            case 'orient':
                if (stack) {
                    cfg[property] = stack.groupbyChannel === channel_1.Y ? 'horizontal' : undefined;
                }
                if (value === undefined) {
                    cfg[property] = fielddef_1.isMeasure(spec.encoding[channel_1.X]) && !fielddef_1.isMeasure(spec.encoding[channel_1.Y]) ?
                        'horizontal' :
                        undefined;
                }
                break;
            case 'align':
                if (value === undefined) {
                    cfg[property] = encoding_1.has(spec.encoding, channel_1.X) ? 'center' : 'right';
                }
        }
        return cfg;
    }, {}), spec.config.mark);
}
exports.compileMarkConfig = compileMarkConfig;

},{"../channel":9,"../encoding":30,"../fielddef":31,"../mark":32,"../util":54}],14:[function(require,module,exports){
var vlFieldDef = require('../fielddef');
var util_1 = require('../util');
var bin_1 = require('../bin');
var channel_1 = require('../channel');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var type_1 = require('../type');
var scale_1 = require('./scale');
var time_1 = require('./time');
var DEFAULT_NULL_FILTERS = {
    nominal: false,
    ordinal: false,
    quantitative: true,
    temporal: true
};
function compileData(model) {
    var def = [source.def(model)];
    var summaryDef = summary.def(model);
    if (summaryDef) {
        def.push(summaryDef);
    }
    filterNonPositiveForLog(def[def.length - 1], model);
    var layoutDef = layout.def(model);
    if (layoutDef) {
        def.push(layoutDef);
    }
    var stackDef = model.stack();
    if (stackDef) {
        def.push(stack.def(model, stackDef));
    }
    return def.concat(dates.defs(model));
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
        var calcFieldMap = (model.transform().calculate || []).reduce(function (fieldMap, formula) {
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
        return nullFilterTransform(model).concat(formulaTransform(model), filterTransform(model), binTransform(model), timeTransform(model));
    }
    source_1.transform = transform;
    function timeTransform(model) {
        return model.reduce(function (transform, fieldDef, channel) {
            var ref = fielddef_1.field(fieldDef, { nofn: true, datum: true });
            if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
                transform.push({
                    type: 'formula',
                    field: fielddef_1.field(fieldDef),
                    expr: time_1.parseExpression(fieldDef.timeUnit, ref)
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
                        start: fielddef_1.field(fieldDef, { binSuffix: '_start' }),
                        mid: fielddef_1.field(fieldDef, { binSuffix: '_mid' }),
                        end: fielddef_1.field(fieldDef, { binSuffix: '_end' })
                    }
                }, typeof bin === 'boolean' ? {} : bin);
                if (!binTrans.maxbins && !binTrans.step) {
                    binTrans.maxbins = bin_1.autoMaxBins(channel);
                }
                transform.push(binTrans);
                if (scale_1.type(fieldDef, channel, model.mark()) === 'ordinal') {
                    transform.push({
                        type: 'formula',
                        field: fielddef_1.field(fieldDef, { binSuffix: '_range' }),
                        expr: fielddef_1.field(fieldDef, { datum: true, binSuffix: '_start' }) +
                            '+ \'-\' +' +
                            fielddef_1.field(fieldDef, { datum: true, binSuffix: '_end' })
                    });
                }
            }
            return transform;
        }, []);
    }
    source_1.binTransform = binTransform;
    function nullFilterTransform(model) {
        var filterNull = model.transform().filterNull;
        var filteredFields = util_1.keys(model.reduce(function (aggregator, fieldDef) {
            if (filterNull ||
                (filterNull === undefined && fieldDef.field && fieldDef.field !== '*' && DEFAULT_NULL_FILTERS[fieldDef.type])) {
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
        var filter = model.transform().filter;
        return filter ? [{
                type: 'filter',
                test: filter
            }] : [];
    }
    source_1.filterTransform = filterTransform;
    function formulaTransform(model) {
        return (model.transform().calculate || []).reduce(function (transform, formula) {
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
        var layout = model.layout();
        if (model.has(channel_1.COLUMN)) {
            var layoutCellWidth = layout.cellWidth;
            var cellWidth = typeof layoutCellWidth !== 'number' ?
                'datum.' + layoutCellWidth.field :
                layoutCellWidth;
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
                expr: '(' + cellWidth + ' + ' + colScale.padding + ')' + ' * ' + colCardinality
            });
        }
        if (model.has(channel_1.ROW)) {
            var layoutCellHeight = layout.cellHeight;
            var cellHeight = typeof layoutCellHeight !== 'number' ?
                'datum.' + layoutCellHeight.field :
                layoutCellHeight;
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
                expr: '(' + cellHeight + '+' + rowScale.padding + ')' + ' * ' + rowCardinality
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
                    dims[fielddef_1.field(fieldDef, { binSuffix: '_start' })] = fielddef_1.field(fieldDef, { binSuffix: '_start' });
                    dims[fielddef_1.field(fieldDef, { binSuffix: '_mid' })] = fielddef_1.field(fieldDef, { binSuffix: '_mid' });
                    dims[fielddef_1.field(fieldDef, { binSuffix: '_end' })] = fielddef_1.field(fieldDef, { binSuffix: '_end' });
                    if (scale_1.type(fieldDef, channel, model.mark()) === 'ordinal') {
                        dims[fielddef_1.field(fieldDef, { binSuffix: '_range' })] = fielddef_1.field(fieldDef, { binSuffix: '_range' });
                    }
                }
                else {
                    dims[fielddef_1.field(fieldDef)] = fielddef_1.field(fieldDef);
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
            name: data_1.STACKED_SCALE,
            source: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(groupbyChannel)].concat(facetFields),
                    summarize: [{ ops: ['sum'], field: model.field(fieldChannel) }]
                }]
        };
        return stacked;
    }
    stack.def = def;
    ;
})(stack = exports.stack || (exports.stack = {}));
var dates;
(function (dates) {
    function defs(model) {
        var alreadyAdded = {};
        return model.reduce(function (aggregator, fieldDef, channel) {
            if (fieldDef.timeUnit) {
                var domain = time_1.rawDomain(fieldDef.timeUnit, channel);
                if (domain && !alreadyAdded[fieldDef.timeUnit]) {
                    alreadyAdded[fieldDef.timeUnit] = true;
                    aggregator.push({
                        name: fieldDef.timeUnit,
                        values: domain,
                        transform: [{
                                type: 'formula',
                                field: 'date',
                                expr: time_1.parseExpression(fieldDef.timeUnit, 'datum.data', true)
                            }]
                    });
                }
            }
            return aggregator;
        }, []);
    }
    dates.defs = defs;
})(dates = exports.dates || (exports.dates = {}));
function filterNonPositiveForLog(dataTable, model) {
    model.forEach(function (_, channel) {
        var scale = model.fieldDef(channel).scale;
        if (scale && scale.type === 'log') {
            dataTable.transform.push({
                type: 'filter',
                test: model.field(channel, { datum: true }) + ' > 0'
            });
        }
    });
}
exports.filterNonPositiveForLog = filterNonPositiveForLog;

},{"../bin":8,"../channel":9,"../data":29,"../fielddef":31,"../type":53,"../util":54,"./scale":25,"./time":27}],15:[function(require,module,exports){
var util = require('../util');
var util_1 = require('../util');
var channel_1 = require('../channel');
var axis_1 = require('./axis');
var scale_1 = require('./scale');
function facetMixins(model, marks) {
    var layout = model.layout();
    var cellConfig = model.config().cell;
    var cellWidth = !model.has(channel_1.COLUMN) ?
        { field: { group: 'width' } } :
        typeof layout.cellWidth !== 'number' ?
            { scale: model.scaleName(channel_1.COLUMN), band: true } :
            { value: layout.cellWidth };
    var cellHeight = !model.has(channel_1.ROW) ?
        { field: { group: 'height' } } :
        typeof layout.cellHeight !== 'number' ?
            { scale: model.scaleName(channel_1.ROW), band: true } :
            { value: layout.cellHeight };
    var facetGroupProperties = {
        width: cellWidth,
        height: cellHeight
    };
    ['clip', 'fill', 'fillOpacity', 'stroke', 'strokeWidth',
        'strokeOpacity', 'strokeDash', 'strokeDashOffset']
        .forEach(function (property) {
        var value = cellConfig[property];
        if (value !== undefined) {
            facetGroupProperties[property] = { value: value };
        }
    });
    var rootMarks = [], rootAxes = [], facetKeys = [], cellAxes = [];
    var hasRow = model.has(channel_1.ROW), hasCol = model.has(channel_1.COLUMN);
    if (hasRow) {
        if (!model.isDimension(channel_1.ROW)) {
            util.error('Row encoding should be ordinal.');
        }
        facetGroupProperties.y = {
            scale: model.scaleName(channel_1.ROW),
            field: model.field(channel_1.ROW),
            offset: model.fieldDef(channel_1.ROW).scale.padding / 2
        };
        facetKeys.push(model.field(channel_1.ROW));
        rootAxes.push(axis_1.compileAxis(channel_1.ROW, model));
        if (model.has(channel_1.X)) {
            rootMarks.push(getXAxesGroup(model, cellWidth, hasCol));
        }
        var rowAxis = model.fieldDef(channel_1.ROW).axis;
        if (typeof rowAxis === 'boolean' || rowAxis.grid !== false) {
            rootMarks.push(getRowGridGroup(model, cellHeight));
        }
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
            scale: model.scaleName(channel_1.COLUMN),
            field: model.field(channel_1.COLUMN),
            offset: model.fieldDef(channel_1.COLUMN).scale.padding / 2
        };
        facetKeys.push(model.field(channel_1.COLUMN));
        rootAxes.push(axis_1.compileAxis(channel_1.COLUMN, model));
        if (model.has(channel_1.Y)) {
            rootMarks.push(getYAxesGroup(model, cellHeight, hasRow));
        }
        var colAxis = model.fieldDef(channel_1.COLUMN).axis;
        if (typeof colAxis === 'boolean' || colAxis.grid !== false) {
            rootMarks.push(getColumnGridGroup(model, cellWidth));
        }
    }
    else {
        if (model.has(channel_1.Y)) {
            cellAxes.push(axis_1.compileAxis(channel_1.Y, model));
        }
    }
    var name = model.spec().name;
    var facetGroup = {
        name: (name ? name + '-' : '') + 'cell',
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
    return {
        marks: rootMarks,
        axes: rootAxes,
        scales: scale_1.compileScales(model.channels(), model)
    };
}
exports.facetMixins = facetMixins;
function getXAxesGroup(model, cellWidth, hasCol) {
    var name = model.spec().name;
    return util_1.extend({
        name: (name ? name + '-' : '') + 'x-axes',
        type: 'group'
    }, hasCol ? {
        from: {
            data: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.COLUMN)],
                    summarize: { '*': 'count' }
                }]
        }
    } : {}, {
        properties: {
            update: {
                width: cellWidth,
                height: { field: { group: 'height' } },
                x: hasCol ? { scale: model.scaleName(channel_1.COLUMN), field: model.field(channel_1.COLUMN) } : { value: 0 }
            }
        },
        axes: [axis_1.compileAxis(channel_1.X, model)]
    });
}
function getYAxesGroup(model, cellHeight, hasRow) {
    var name = model.spec().name;
    return util_1.extend({
        name: (name ? name + '-' : '') + 'y-axes',
        type: 'group'
    }, hasRow ? {
        from: {
            data: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.ROW)],
                    summarize: { '*': 'count' }
                }]
        }
    } : {}, {
        properties: {
            update: {
                width: { field: { group: 'width' } },
                height: cellHeight,
                y: hasRow ? { scale: model.scaleName(channel_1.ROW), field: model.field(channel_1.ROW) } : { value: 0 }
            }
        },
        axes: [axis_1.compileAxis(channel_1.Y, model)]
    });
}
function getRowGridGroup(model, cellHeight) {
    var name = model.spec().name;
    var cellConfig = model.config().cell;
    var rowGrid = {
        name: (name ? name + '-' : '') + 'row-grid',
        type: 'rule',
        from: {
            data: model.dataTable(),
            transform: [{ type: 'facet', groupby: [model.field(channel_1.ROW)] }]
        },
        properties: {
            update: {
                y: {
                    scale: model.scaleName(channel_1.ROW),
                    field: model.field(channel_1.ROW)
                },
                x: { value: 0, offset: -cellConfig.gridOffset },
                x2: { field: { group: 'width' }, offset: cellConfig.gridOffset },
                stroke: { value: cellConfig.gridColor },
                strokeOpacity: { value: cellConfig.gridOpacity }
            }
        }
    };
    var rowGridOnTop = !model.has(channel_1.X) || model.axis(channel_1.X).orient !== 'top';
    if (rowGridOnTop) {
        return rowGrid;
    }
    return {
        name: (name ? name + '-' : '') + 'row-grid-group',
        type: 'group',
        properties: {
            update: {
                y: cellHeight.value ? {
                    value: cellHeight,
                    offset: model.fieldDef(channel_1.ROW).scale.padding
                } : {
                    field: { parent: 'cellHeight' },
                    offset: model.fieldDef(channel_1.ROW).scale.padding
                },
                width: { field: { group: 'width' } }
            }
        },
        marks: [rowGrid]
    };
}
function getColumnGridGroup(model, cellWidth) {
    var name = model.spec().name;
    var cellConfig = model.config().cell;
    var columnGrid = {
        name: (name ? name + '-' : '') + 'column-grid',
        type: 'rule',
        from: {
            data: model.dataTable(),
            transform: [{ type: 'facet', groupby: [model.field(channel_1.COLUMN)] }]
        },
        properties: {
            update: {
                x: {
                    scale: model.scaleName(channel_1.COLUMN),
                    field: model.field(channel_1.COLUMN)
                },
                y: { value: 0, offset: -cellConfig.gridOffset },
                y2: { field: { group: 'height' }, offset: cellConfig.gridOffset },
                stroke: { value: cellConfig.gridColor },
                strokeOpacity: { value: cellConfig.gridOpacity }
            }
        }
    };
    var columnGridOnLeft = !model.has(channel_1.Y) || model.axis(channel_1.Y).orient === 'right';
    if (columnGridOnLeft) {
        return columnGrid;
    }
    return {
        name: (name ? name + '-' : '') + 'column-grid-group',
        type: 'group',
        properties: {
            update: {
                x: cellWidth.value ? {
                    value: cellWidth,
                    offset: model.fieldDef(channel_1.COLUMN).scale.padding
                } : {
                    field: { parent: 'cellWidth' },
                    offset: model.fieldDef(channel_1.COLUMN).scale.padding
                },
                height: { field: { group: 'height' } }
            }
        },
        marks: [columnGrid]
    };
}

},{"../channel":9,"../util":54,"./axis":11,"./scale":25}],16:[function(require,module,exports){
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
        return model.config().cell.width;
    }
    if (model.mark() === mark_1.TEXT) {
        return model.config().textCellWidth;
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
            return model.config().cell.height;
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

},{"../channel":9,"../data":29,"../mark":32}],17:[function(require,module,exports){
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var util_1 = require('../util');
var util_2 = require('./util');
function compileLegends(model) {
    var defs = [];
    if (model.has(channel_1.COLOR) && model.fieldDef(channel_1.COLOR).legend) {
        defs.push(compileLegend(model, channel_1.COLOR, {
            fill: model.scaleName(channel_1.COLOR)
        }));
    }
    if (model.has(channel_1.SIZE) && model.fieldDef(channel_1.SIZE).legend) {
        defs.push(compileLegend(model, channel_1.SIZE, {
            size: model.scaleName(channel_1.SIZE)
        }));
    }
    if (model.has(channel_1.SHAPE) && model.fieldDef(channel_1.SHAPE).legend) {
        defs.push(compileLegend(model, channel_1.SHAPE, {
            shape: model.scaleName(channel_1.SHAPE)
        }));
    }
    return defs;
}
exports.compileLegends = compileLegends;
function compileLegend(model, channel, def) {
    var fieldDef = model.fieldDef(channel);
    var legend = fieldDef.legend;
    def.title = title(fieldDef);
    util_1.extend(def, formatMixins(model, channel));
    ['orient', 'values'].forEach(function (property) {
        var value = legend[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    var props = (typeof legend !== 'boolean' && legend.properties) || {};
    ['title', 'symbols', 'legend'].forEach(function (group) {
        var value = properties[group] ?
            properties[group](fieldDef, props[group], model, channel) :
            props[group];
        if (value !== undefined) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.compileLegend = compileLegend;
function title(fieldDef) {
    var legend = fieldDef.legend;
    if (typeof legend !== 'boolean' && legend.title) {
        return legend.title;
    }
    return fielddef_1.title(fieldDef);
}
exports.title = title;
function formatMixins(model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (fieldDef.bin) {
        return {};
    }
    var legend = fieldDef.legend;
    return util_2.formatMixins(model, channel, typeof legend !== 'boolean' ? legend.format : undefined);
}
exports.formatMixins = formatMixins;
var properties;
(function (properties) {
    function symbols(fieldDef, symbolsSpec, model, channel) {
        var symbols = {};
        var mark = model.mark();
        switch (mark) {
            case mark_1.BAR:
            case mark_1.TICK:
            case mark_1.TEXT:
                symbols.shape = { value: 'square' };
                symbols.stroke = { value: 'transparent' };
                util_2.applyMarkConfig(symbols, model, util_2.FILL_STROKE_CONFIG);
                break;
            case mark_1.CIRCLE:
            case mark_1.SQUARE:
                symbols.shape = { value: mark };
            case mark_1.POINT:
                if (model.config().mark.filled) {
                    symbols.stroke = { value: 'transparent' };
                    util_2.applyMarkConfig(symbols, model, util_2.FILL_STROKE_CONFIG);
                    if (model.has(channel_1.COLOR) && channel === channel_1.COLOR) {
                        symbols.fill = { scale: model.scaleName(channel_1.COLOR), field: 'data' };
                    }
                    else {
                        symbols.fill = { value: model.fieldDef(channel_1.COLOR).value };
                    }
                }
                else {
                    symbols.fill = { value: 'transparent' };
                    util_2.applyMarkConfig(symbols, model, util_2.FILL_STROKE_CONFIG);
                    if (model.has(channel_1.COLOR) && channel === channel_1.COLOR) {
                        symbols.stroke = { scale: model.scaleName(channel_1.COLOR), field: 'data' };
                    }
                    else {
                        symbols.stroke = { value: model.fieldDef(channel_1.COLOR).value };
                    }
                }
                break;
            case mark_1.LINE:
            case mark_1.AREA:
                symbols.stroke = { value: 'transparent' };
                util_2.applyMarkConfig(symbols, model, util_2.FILL_STROKE_CONFIG);
                break;
        }
        symbols = util_1.extend(symbols, symbolsSpec || {});
        return util_1.keys(symbols).length > 0 ? symbols : undefined;
    }
    properties.symbols = symbols;
})(properties || (properties = {}));

},{"../channel":9,"../fielddef":31,"../mark":32,"../util":54,"./util":28}],18:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var area;
(function (area) {
    function markType() {
        return 'area';
    }
    area.markType = markType;
    function properties(model) {
        var p = {};
        var orient = model.config().mark.orient;
        if (orient !== undefined) {
            p.orient = { value: orient };
        }
        var stack = model.stack();
        if (stack && channel_1.X === stack.fieldChannel) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { suffix: '_start' })
            };
        }
        else if (model.isMeasure(channel_1.X)) {
            p.x = { scale: model.scaleName(channel_1.X), field: model.field(channel_1.X) };
        }
        else if (model.isDimension(channel_1.X)) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        if (orient === 'horizontal') {
            if (stack && channel_1.X === stack.fieldChannel) {
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { suffix: '_end' })
                };
            }
            else {
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    value: 0
                };
            }
        }
        if (stack && channel_1.Y === stack.fieldChannel) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { suffix: '_start' })
            };
        }
        else if (model.isMeasure(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y)
            };
        }
        else if (model.isDimension(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        if (orient !== 'horizontal') {
            if (stack && channel_1.Y === stack.fieldChannel) {
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { suffix: '_end' })
                };
            }
            else {
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    value: 0
                };
            }
        }
        util_1.applyColorAndOpacity(p, model);
        util_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    area.properties = properties;
    function labels(model) {
        return undefined;
    }
    area.labels = labels;
})(area = exports.area || (exports.area = {}));

},{"../channel":9,"./util":28}],19:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var bar;
(function (bar) {
    function markType() {
        return 'rect';
    }
    bar.markType = markType;
    function properties(model) {
        var p = {};
        var orient = model.config().mark.orient;
        var stack = model.stack();
        if (stack && channel_1.X === stack.fieldChannel) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { suffix: '_start' })
            };
            p.x2 = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { suffix: '_end' })
            };
        }
        else if (model.isMeasure(channel_1.X)) {
            if (orient === 'horizontal') {
                p.x = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X)
                };
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    value: 0
                };
            }
            else {
                p.xc = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X)
                };
                p.width = { value: model.sizeValue(channel_1.X) };
            }
        }
        else if (model.fieldDef(channel_1.X).bin) {
            if (model.has(channel_1.SIZE) && orient !== 'horizontal') {
                p.xc = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: '_mid' })
                };
                p.width = {
                    scale: model.scaleName(channel_1.SIZE),
                    field: model.field(channel_1.SIZE)
                };
            }
            else {
                p.x = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: '_start' }),
                    offset: 1
                };
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: '_end' })
                };
            }
        }
        else {
            if (model.has(channel_1.X)) {
                p.xc = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X)
                };
            }
            else {
                p.x = { value: 0, offset: 2 };
            }
            p.width = model.has(channel_1.SIZE) && orient !== 'horizontal' ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: model.sizeValue(channel_1.X)
            };
        }
        if (stack && channel_1.Y === stack.fieldChannel) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { suffix: '_start' })
            };
            p.y2 = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { suffix: '_end' })
            };
        }
        else if (model.isMeasure(channel_1.Y)) {
            if (orient !== 'horizontal') {
                p.y = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y)
                };
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    value: 0
                };
            }
            else {
                p.yc = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y)
                };
                p.height = { value: model.sizeValue(channel_1.Y) };
            }
        }
        else if (model.fieldDef(channel_1.Y).bin) {
            if (model.has(channel_1.SIZE) && orient === 'horizontal') {
                p.yc = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: '_mid' })
                };
                p.height = {
                    scale: model.scaleName(channel_1.SIZE),
                    field: model.field(channel_1.SIZE)
                };
            }
            else {
                p.y = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: '_start' })
                };
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: '_end' }),
                    offset: 1
                };
            }
        }
        else {
            if (model.has(channel_1.Y)) {
                p.yc = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y)
                };
            }
            else {
                p.y2 = {
                    field: { group: 'height' },
                    offset: -1
                };
            }
            p.height = model.has(channel_1.SIZE) && orient === 'horizontal' ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: model.sizeValue(channel_1.Y)
            };
        }
        util_1.applyColorAndOpacity(p, model);
        return p;
    }
    bar.properties = properties;
    function labels(model) {
        return undefined;
    }
    bar.labels = labels;
})(bar = exports.bar || (exports.bar = {}));

},{"../channel":9,"./util":28}],20:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var line;
(function (line) {
    function markType() {
        return 'line';
    }
    line.markType = markType;
    function properties(model) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else {
            p.x = { value: 0 };
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.y = { field: { group: 'height' } };
        }
        util_1.applyColorAndOpacity(p, model, util_1.ColorMode.ALWAYS_STROKED);
        util_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    line.properties = properties;
    function labels(model) {
        return undefined;
    }
    line.labels = labels;
})(line = exports.line || (exports.line = {}));

},{"../channel":9,"./util":28}],21:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var point;
(function (point) {
    function markType() {
        return 'symbol';
    }
    point.markType = markType;
    function properties(model, fixedShape) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else {
            p.x = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.y = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.SIZE)) {
            p.size = {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            };
        }
        else {
            p.size = { value: model.sizeValue() };
        }
        if (fixedShape) {
            p.shape = { value: fixedShape };
        }
        else if (model.has(channel_1.SHAPE)) {
            p.shape = {
                scale: model.scaleName(channel_1.SHAPE),
                field: model.field(channel_1.SHAPE)
            };
        }
        else {
            p.shape = { value: model.fieldDef(channel_1.SHAPE).value };
        }
        util_1.applyColorAndOpacity(p, model, fixedShape ? util_1.ColorMode.FILLED_BY_DEFAULT : util_1.ColorMode.STROKED_BY_DEFAULT);
        return p;
    }
    point.properties = properties;
    function labels(model) {
    }
    point.labels = labels;
})(point = exports.point || (exports.point = {}));
var circle;
(function (circle) {
    function markType() {
        return 'symbol';
    }
    circle.markType = markType;
    function properties(model) {
        return point.properties(model, 'circle');
    }
    circle.properties = properties;
    function labels(model) {
        return undefined;
    }
    circle.labels = labels;
})(circle = exports.circle || (exports.circle = {}));
var square;
(function (square) {
    function markType() {
        return 'symbol';
    }
    square.markType = markType;
    function properties(model) {
        return point.properties(model, 'square');
    }
    square.properties = properties;
    function labels(model) {
        return undefined;
    }
    square.labels = labels;
})(square = exports.square || (exports.square = {}));

},{"../channel":9,"./util":28}],22:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var util_2 = require('../util');
var type_1 = require('../type');
var text;
(function (text) {
    function markType() {
        return 'text';
    }
    text.markType = markType;
    function background(model) {
        return {
            x: { value: 0 },
            y: { value: 0 },
            width: { field: { group: 'width' } },
            height: { field: { group: 'height' } },
            fill: { scale: model.scaleName(channel_1.COLOR), field: model.field(channel_1.COLOR) }
        };
    }
    text.background = background;
    function properties(model) {
        var p = {};
        var fieldDef = model.fieldDef(channel_1.TEXT);
        if (model.has(channel_1.X)) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else {
            if (model.has(channel_1.TEXT) && model.fieldDef(channel_1.TEXT).type === type_1.QUANTITATIVE) {
                p.x = { field: { group: 'width' }, offset: -5 };
            }
            else {
                p.x = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
            }
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.y = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.SIZE)) {
            p.fontSize = {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            };
        }
        else {
            p.fontSize = { value: model.sizeValue() };
        }
        if (model.config().mark.applyColorToBackground && !model.has(channel_1.X) && !model.has(channel_1.Y)) {
            p.fill = { value: 'black' };
            var opacity = model.config().mark.opacity;
            if (opacity) {
                p.opacity = { value: opacity };
            }
            ;
        }
        else {
            util_1.applyColorAndOpacity(p, model);
        }
        if (model.has(channel_1.TEXT)) {
            if (util_2.contains([type_1.QUANTITATIVE, type_1.TEMPORAL], model.fieldDef(channel_1.TEXT).type)) {
                var format = model.config().mark.format;
                util_2.extend(p, util_1.formatMixins(model, channel_1.TEXT, format));
            }
            else {
                p.text = { field: model.field(channel_1.TEXT) };
            }
        }
        else {
            p.text = { value: fieldDef.value };
        }
        util_1.applyMarkConfig(p, model, ['angle', 'align', 'baseline', 'dx', 'dy', 'font', 'fontWeight',
            'fontStyle', 'radius', 'theta']);
        return p;
    }
    text.properties = properties;
})(text = exports.text || (exports.text = {}));

},{"../channel":9,"../type":53,"../util":54,"./util":28}],23:[function(require,module,exports){
var channel_1 = require('../channel');
var util_1 = require('./util');
var tick;
(function (tick) {
    function markType() {
        return 'rect';
    }
    tick.markType = markType;
    function properties(model) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.xc = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { binSuffix: '_mid' })
            };
        }
        else {
            p.xc = { value: model.fieldDef(channel_1.X).scale.bandWidth / 2 };
        }
        if (model.has(channel_1.Y)) {
            p.yc = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.yc = { value: model.fieldDef(channel_1.Y).scale.bandWidth / 2 };
        }
        if (model.config().mark.orient === 'horizontal') {
            p.width = { value: model.config().mark.thickness };
            p.height = { value: model.sizeValue(channel_1.Y) };
        }
        else {
            p.width = { value: model.sizeValue(channel_1.X) };
            p.height = { value: model.config().mark.thickness };
        }
        util_1.applyColorAndOpacity(p, model, util_1.ColorMode.ALWAYS_FILLED);
        return p;
    }
    tick.properties = properties;
    function labels(model) {
        return undefined;
    }
    tick.labels = labels;
})(tick = exports.tick || (exports.tick = {}));

},{"../channel":9,"./util":28}],24:[function(require,module,exports){
var channel_1 = require('../channel');
var mark_1 = require('../mark');
var stack_1 = require('./stack');
var util_1 = require('../util');
var mark_area_1 = require('./mark-area');
var mark_bar_1 = require('./mark-bar');
var mark_line_1 = require('./mark-line');
var mark_point_1 = require('./mark-point');
var mark_text_1 = require('./mark-text');
var mark_tick_1 = require('./mark-tick');
var markCompiler = {
    area: mark_area_1.area,
    bar: mark_bar_1.bar,
    line: mark_line_1.line,
    point: mark_point_1.point,
    text: mark_text_1.text,
    tick: mark_tick_1.tick,
    circle: mark_point_1.circle,
    square: mark_point_1.square
};
function compileMark(model) {
    var mark = model.mark();
    var name = model.spec().name;
    var isFaceted = model.has(channel_1.ROW) || model.has(channel_1.COLUMN);
    var dataFrom = { data: model.dataTable() };
    var markConfig = model.config().mark;
    var sortBy = markConfig.sortBy;
    if (mark === mark_1.LINE || mark === mark_1.AREA) {
        var details = detailFields(model);
        var pathOrder = getPathOrder(model);
        var pathMarks = [util_1.extend(name ? { name: name + '-marks' } : {}, {
                type: markCompiler[mark].markType(),
                from: util_1.extend(isFaceted || details.length > 0 ? {} : dataFrom, { transform: [{ type: 'sort', by: pathOrder }] }),
                properties: { update: markCompiler[mark].properties(model) }
            })];
        if (details.length > 0) {
            var facetTransform = { type: 'facet', groupby: details };
            var transform = [].concat((sortBy ? [{ type: 'sort', by: sortBy }] : []), mark === mark_1.AREA && model.stack() ?
                [stack_1.imputeTransform(model), stack_1.stackTransform(model), facetTransform] :
                [facetTransform]);
            return [{
                    name: (name ? name + '-' : '') + mark + '-facet',
                    type: 'group',
                    from: util_1.extend(isFaceted ? {} : dataFrom, { transform: transform }),
                    properties: {
                        update: {
                            width: { field: { group: 'width' } },
                            height: { field: { group: 'height' } }
                        }
                    },
                    marks: pathMarks
                }];
        }
        else {
            return pathMarks;
        }
    }
    else {
        var marks = [];
        if (mark === mark_1.TEXT &&
            model.has(channel_1.COLOR) &&
            model.config().mark.applyColorToBackground && !model.has(channel_1.X) && !model.has(channel_1.Y)) {
            marks.push(util_1.extend(name ? { name: name + '-background' } : {}, { type: 'rect' }, isFaceted ? {} : { from: dataFrom }, { properties: { update: mark_text_1.text.background(model) } }));
        }
        marks.push(util_1.extend(name ? { name: name + '-marks' } : {}, { type: markCompiler[mark].markType() }, (!isFaceted || model.stack() || sortBy) ? {
            from: util_1.extend(isFaceted ? {} : dataFrom, model.stack() || sortBy ? { transform: [].concat((model.stack() ? [stack_1.stackTransform(model)] : []), sortBy ? [{ type: 'sort', by: sortBy }] : []) } : {})
        } : {}, { properties: { update: markCompiler[mark].properties(model) } }));
        if (model.has(channel_1.LABEL) && markCompiler[mark].labels) {
            var labelProperties = markCompiler[mark].labels(model);
            if (labelProperties !== undefined) {
                marks.push(util_1.extend(name ? { name: name + '-label' } : {}, { type: 'text' }, isFaceted ? {} : { from: dataFrom }, { properties: { update: labelProperties } }));
            }
        }
        return marks;
    }
}
exports.compileMark = compileMark;
function getPathOrder(model) {
    if (model.mark() === mark_1.LINE && model.has(channel_1.PATH)) {
        if (util_1.isArray(model.spec().encoding[channel_1.PATH])) {
            return model.spec().encoding[channel_1.PATH].map(function (fieldDef) {
                return (fieldDef.sort === 'descending' ? '-' : '') + fieldDef.field;
            });
        }
        else {
            var fieldDef = model.fieldDef(channel_1.PATH);
            return (fieldDef.sort === 'descending' ? '-' : '') + fieldDef.field;
        }
    }
    else {
        return '-' + model.field(model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X);
    }
}
function detailFields(model) {
    return [channel_1.COLOR, channel_1.DETAIL, channel_1.SHAPE].reduce(function (details, channel) {
        if (model.has(channel) && !model.fieldDef(channel).aggregate) {
            details.push(model.field(channel));
        }
        return details;
    }, []);
}

},{"../channel":9,"../mark":32,"../util":54,"./mark-area":18,"./mark-bar":19,"./mark-line":20,"./mark-point":21,"./mark-text":22,"./mark-tick":23,"./stack":26}],25:[function(require,module,exports){
var util_1 = require('../util');
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var type_1 = require('../type');
var mark_1 = require('../mark');
var time_1 = require('./time');
function compileScales(channels, model) {
    return channels.filter(function (channel) {
        return channel !== channel_1.DETAIL && channel !== channel_1.PATH;
    })
        .map(function (channel) {
        var fieldDef = model.fieldDef(channel);
        var scaleDef = {
            name: model.scaleName(channel),
            type: type(fieldDef, channel, model.mark()),
        };
        scaleDef.domain = domain(model, channel, scaleDef.type);
        util_1.extend(scaleDef, rangeMixins(model, channel, scaleDef.type));
        [
            'reverse', 'round',
            'clamp', 'nice',
            'exponent', 'zero',
            'outerPadding', 'padding', 'points'
        ].forEach(function (property) {
            var value = exports[property](model, channel, scaleDef.type);
            if (value !== undefined) {
                scaleDef[property] = value;
            }
        });
        return scaleDef;
    });
}
exports.compileScales = compileScales;
function type(fieldDef, channel, mark) {
    if (channel === channel_1.DETAIL || channel === channel_1.PATH) {
        return null;
    }
    switch (fieldDef.type) {
        case type_1.NOMINAL:
            return 'ordinal';
        case type_1.ORDINAL:
            return 'ordinal';
        case type_1.TEMPORAL:
            if (channel === channel_1.COLOR) {
                return 'time';
            }
            if (util_1.contains([channel_1.ROW, channel_1.COLUMN, channel_1.SHAPE], channel)) {
                return 'ordinal';
            }
            if (fieldDef.scale.type !== undefined) {
                return fieldDef.scale.type;
            }
            if (fieldDef.timeUnit) {
                switch (fieldDef.timeUnit) {
                    case 'hours':
                    case 'day':
                    case 'month':
                        return 'ordinal';
                    case 'date':
                    case 'year':
                    case 'second':
                    case 'minute':
                        return util_1.contains([mark_1.BAR, mark_1.TICK], mark) &&
                            fielddef_1.isDimension(fieldDef) ? 'ordinal' : 'time';
                    default:
                        return 'ordinal';
                }
            }
            return 'time';
        case type_1.QUANTITATIVE:
            if (fieldDef.bin) {
                return util_1.contains([channel_1.X, channel_1.Y, channel_1.COLOR], channel) ? 'linear' : 'ordinal';
            }
            if (fieldDef.scale.type !== undefined) {
                return fieldDef.scale.type;
            }
            return 'linear';
    }
}
exports.type = type;
function domain(model, channel, scaleType) {
    var fieldDef = model.fieldDef(channel);
    if (fieldDef.scale.domain) {
        return fieldDef.scale.domain;
    }
    if (fieldDef.type === type_1.TEMPORAL) {
        if (time_1.rawDomain(fieldDef.timeUnit, channel)) {
            return {
                data: fieldDef.timeUnit,
                field: 'date'
            };
        }
        return {
            data: model.dataTable(),
            field: model.field(channel),
            sort: {
                field: model.field(channel),
                op: 'min'
            }
        };
    }
    var stack = model.stack();
    if (stack && channel === stack.fieldChannel) {
        if (stack.config.offset === 'normalize') {
            return [0, 1];
        }
        return {
            data: data_1.STACKED_SCALE,
            field: model.field(channel, { prefn: 'sum_' })
        };
    }
    var useRawDomain = _useRawDomain(model, channel, scaleType);
    var sort = domainSort(model, channel, scaleType);
    if (useRawDomain) {
        return {
            data: data_1.SOURCE,
            field: model.field(channel, { noAggregate: true })
        };
    }
    else if (fieldDef.bin) {
        return scaleType === 'ordinal' ? {
            data: model.dataTable(),
            field: model.field(channel, { binSuffix: '_range' }),
            sort: {
                field: model.field(channel, { binSuffix: '_start' }),
                op: 'min'
            }
        } : channel === channel_1.COLOR ? {
            data: model.dataTable(),
            field: model.field(channel, { binSuffix: '_start' })
        } : {
            data: model.dataTable(),
            field: [
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
function domainSort(model, channel, scaleType) {
    var sort = model.fieldDef(channel).sort;
    if (sort === 'ascending' || sort === 'descending') {
        return true;
    }
    if (scaleType === 'ordinal' && typeof sort !== 'string') {
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
function _useRawDomain(model, channel, scaleType) {
    var fieldDef = model.fieldDef(channel);
    return fieldDef.scale.useRawDomain &&
        fieldDef.aggregate &&
        aggregate_1.SHARED_DOMAIN_OPS.indexOf(fieldDef.aggregate) >= 0 &&
        ((fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) ||
            (fieldDef.type === type_1.TEMPORAL && scaleType === 'linear'));
}
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
    if (scaleType === 'ordinal' && channel !== channel_1.ROW && channel !== channel_1.COLUMN) {
        return model.fieldDef(channel).scale.padding;
    }
    return undefined;
}
exports.padding = padding;
function points(model, channel, scaleType) {
    if (scaleType === 'ordinal') {
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
    if (scaleType === 'ordinal' && fieldDef.scale.bandWidth) {
        return { bandWidth: fieldDef.scale.bandWidth };
    }
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
                var dimension = model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X;
                return { range: [2, model.fieldDef(dimension).scale.bandWidth] };
            }
            else if (model.is(mark_1.TEXT)) {
                return { range: [8, 40] };
            }
            else {
                var xIsMeasure = model.isMeasure(channel_1.X);
                var yIsMeasure = model.isMeasure(channel_1.Y);
                var bandWidth_1 = xIsMeasure !== yIsMeasure ?
                    model.fieldDef(xIsMeasure ? channel_1.Y : channel_1.X).scale.bandWidth :
                    Math.min(model.fieldDef(channel_1.X).scale.bandWidth, model.fieldDef(channel_1.Y).scale.bandWidth);
                return { range: [10, (bandWidth_1 - 2) * (bandWidth_1 - 2)] };
            }
        case channel_1.SHAPE:
            return { range: 'shapes' };
        case channel_1.COLOR:
            if (fieldDef.type === type_1.NOMINAL
                || fieldDef.type === type_1.ORDINAL) {
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

},{"../aggregate":7,"../channel":9,"../data":29,"../fielddef":31,"../mark":32,"../type":53,"../util":54,"./time":27}],26:[function(require,module,exports){
var config_stack_schema_1 = require('../schema/config.stack.schema');
var schemautil_1 = require('../schema/schemautil');
var channel_1 = require('../channel');
var mark_1 = require('../mark');
var fielddef_1 = require('../fielddef');
var encoding_1 = require('../encoding');
var util_1 = require('../util');
var scale_1 = require('./scale');
function compileStackProperties(spec) {
    var stackFields = getStackFields(spec);
    if (stackFields.length > 0 &&
        util_1.contains([mark_1.BAR, mark_1.AREA], spec.mark) &&
        spec.config.stack !== false &&
        encoding_1.isAggregate(spec.encoding)) {
        var isXMeasure = encoding_1.has(spec.encoding, channel_1.X) && fielddef_1.isMeasure(spec.encoding.x);
        var isYMeasure = encoding_1.has(spec.encoding, channel_1.Y) && fielddef_1.isMeasure(spec.encoding.y);
        if (isXMeasure && !isYMeasure) {
            return {
                groupbyChannel: channel_1.Y,
                fieldChannel: channel_1.X,
                stackFields: stackFields,
                config: spec.config.stack === true ? schemautil_1.instantiate(config_stack_schema_1.stackConfig) : spec.config.stack
            };
        }
        else if (isYMeasure && !isXMeasure) {
            return {
                groupbyChannel: channel_1.X,
                fieldChannel: channel_1.Y,
                stackFields: stackFields,
                config: spec.config.stack === true ? schemautil_1.instantiate(config_stack_schema_1.stackConfig) : spec.config.stack
            };
        }
    }
    return null;
}
exports.compileStackProperties = compileStackProperties;
function getStackFields(spec) {
    return [channel_1.COLOR, channel_1.DETAIL].reduce(function (fields, channel) {
        var channelEncoding = spec.encoding[channel];
        if (encoding_1.has(spec.encoding, channel)) {
            if (util_1.isArray(channelEncoding)) {
                channelEncoding.forEach(function (fieldDef) {
                    fields.push(fielddef_1.field(fieldDef));
                });
            }
            else {
                var fieldDef = channelEncoding;
                fields.push(fielddef_1.field(fieldDef, {
                    binSuffix: scale_1.type(fieldDef, channel, spec.mark) === 'ordinal' ? '_range' : '_start'
                }));
            }
        }
        return fields;
    }, []);
}
function imputeTransform(model) {
    var stack = model.stack();
    return {
        type: 'impute',
        field: model.field(stack.fieldChannel),
        groupby: stack.stackFields,
        orderby: [model.field(stack.groupbyChannel)],
        method: 'value',
        value: 0
    };
}
exports.imputeTransform = imputeTransform;
function stackTransform(model) {
    var stack = model.stack();
    var sortby = stack.config.sort === 'ascending' ?
        stack.stackFields :
        util_1.isArray(stack.config.sort) ?
            stack.config.sort :
            stack.stackFields.map(function (field) {
                return '-' + field;
            });
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

},{"../channel":9,"../encoding":30,"../fielddef":31,"../mark":32,"../schema/config.stack.schema":39,"../schema/schemautil":47,"../util":54,"./scale":25}],27:[function(require,module,exports){
var util_1 = require('../util');
var channel_1 = require('../channel');
function format(timeUnit, abbreviated) {
    if (abbreviated === void 0) { abbreviated = false; }
    if (!timeUnit) {
        return undefined;
    }
    var dateComponents = [];
    if (timeUnit.indexOf('year') > -1) {
        dateComponents.push(abbreviated ? '%y' : '%Y');
    }
    if (timeUnit.indexOf('month') > -1) {
        dateComponents.push(abbreviated ? '%b' : '%B');
    }
    if (timeUnit.indexOf('day') > -1) {
        dateComponents.push(abbreviated ? '%a' : '%A');
    }
    else if (timeUnit.indexOf('date') > -1) {
        dateComponents.push('%d');
    }
    var timeComponents = [];
    if (timeUnit.indexOf('hour') > -1) {
        timeComponents.push('%H');
    }
    if (timeUnit.indexOf('minute') > -1) {
        timeComponents.push('%M');
    }
    if (timeUnit.indexOf('second') > -1) {
        timeComponents.push('%S');
    }
    if (timeUnit.indexOf('milliseconds') > -1) {
        timeComponents.push('%L');
    }
    var out = [];
    if (dateComponents.length > 0) {
        out.push(dateComponents.join('-'));
    }
    if (timeComponents.length > 0) {
        out.push(timeComponents.join(':'));
    }
    return out.length > 0 ? out.join(' ') : undefined;
}
exports.format = format;
function parseExpression(timeUnit, fieldRef, onlyRef) {
    if (onlyRef === void 0) { onlyRef = false; }
    var out = 'datetime(';
    function get(fun, addComma) {
        if (addComma === void 0) { addComma = true; }
        if (onlyRef) {
            return fieldRef + (addComma ? ', ' : '');
        }
        else {
            return fun + '(' + fieldRef + ')' + (addComma ? ', ' : '');
        }
    }
    if (timeUnit.indexOf('year') > -1) {
        out += get('year');
    }
    else {
        out += '2006, ';
    }
    if (timeUnit.indexOf('month') > -1) {
        out += get('month');
    }
    else {
        out += '0, ';
    }
    if (timeUnit.indexOf('day') > -1) {
        out += get('day', false) + '+1, ';
    }
    else if (timeUnit.indexOf('date') > -1) {
        out += get('date');
    }
    else {
        out += '1, ';
    }
    if (timeUnit.indexOf('hours') > -1) {
        out += get('hours');
    }
    else {
        out += '0, ';
    }
    if (timeUnit.indexOf('minutes') > -1) {
        out += get('minutes');
    }
    else {
        out += '0, ';
    }
    if (timeUnit.indexOf('seconds') > -1) {
        out += get('seconds');
    }
    else {
        out += '0, ';
    }
    if (timeUnit.indexOf('milliseconds') > -1) {
        out += get('milliseconds', false);
    }
    else {
        out += '0';
    }
    return out + ')';
}
exports.parseExpression = parseExpression;
function rawDomain(timeUnit, channel) {
    if (util_1.contains([channel_1.ROW, channel_1.COLUMN, channel_1.SHAPE, channel_1.COLOR], channel)) {
        return null;
    }
    switch (timeUnit) {
        case 'seconds':
            return util_1.range(0, 60);
        case 'minutes':
            return util_1.range(0, 60);
        case 'hours':
            return util_1.range(0, 24);
        case 'day':
            return util_1.range(0, 7);
        case 'date':
            return util_1.range(1, 32);
        case 'month':
            return util_1.range(0, 12);
    }
    return null;
}
exports.rawDomain = rawDomain;

},{"../channel":9,"../util":54}],28:[function(require,module,exports){
var channel_1 = require('../channel');
var type_1 = require('../type');
var time_1 = require('./time');
var util_1 = require('../util');
(function (ColorMode) {
    ColorMode[ColorMode["ALWAYS_FILLED"] = 0] = "ALWAYS_FILLED";
    ColorMode[ColorMode["ALWAYS_STROKED"] = 1] = "ALWAYS_STROKED";
    ColorMode[ColorMode["FILLED_BY_DEFAULT"] = 2] = "FILLED_BY_DEFAULT";
    ColorMode[ColorMode["STROKED_BY_DEFAULT"] = 3] = "STROKED_BY_DEFAULT";
})(exports.ColorMode || (exports.ColorMode = {}));
var ColorMode = exports.ColorMode;
exports.FILL_STROKE_CONFIG = ['fill', 'fillOpacity',
    'stroke', 'strokeWidth', 'strokeDash', 'strokeDashOffset', 'strokeOpacity',
    'opacity'];
function applyColorAndOpacity(p, model, colorMode) {
    if (colorMode === void 0) { colorMode = ColorMode.STROKED_BY_DEFAULT; }
    var filled = colorMode === ColorMode.ALWAYS_FILLED ? true :
        colorMode === ColorMode.ALWAYS_STROKED ? false :
            model.config().mark.filled !== undefined ? model.config().mark.filled :
                colorMode === ColorMode.FILLED_BY_DEFAULT ? true :
                    false;
    applyMarkConfig(p, model, exports.FILL_STROKE_CONFIG);
    if (filled) {
        if (model.has(channel_1.COLOR)) {
            p.fill = {
                scale: model.scaleName(channel_1.COLOR),
                field: model.field(channel_1.COLOR)
            };
        }
        else {
            p.fill = { value: model.fieldDef(channel_1.COLOR).value };
        }
    }
    else {
        if (model.has(channel_1.COLOR)) {
            p.stroke = {
                scale: model.scaleName(channel_1.COLOR),
                field: model.field(channel_1.COLOR)
            };
        }
        else {
            p.stroke = { value: model.fieldDef(channel_1.COLOR).value };
        }
    }
}
exports.applyColorAndOpacity = applyColorAndOpacity;
function applyMarkConfig(marksProperties, model, propsList) {
    propsList.forEach(function (property) {
        var value = model.config().mark[property];
        if (value !== undefined) {
            marksProperties[property] = { value: value };
        }
    });
}
exports.applyMarkConfig = applyMarkConfig;
function formatMixins(model, channel, format) {
    var fieldDef = model.fieldDef(channel);
    if (!util_1.contains([type_1.QUANTITATIVE, type_1.TEMPORAL], fieldDef.type)) {
        return {};
    }
    var def = {};
    if (fieldDef.type === type_1.TEMPORAL) {
        def.formatType = 'time';
    }
    if (format !== undefined) {
        def.format = format;
    }
    else {
        switch (fieldDef.type) {
            case type_1.QUANTITATIVE:
                def.format = model.config().numberFormat;
                break;
            case type_1.TEMPORAL:
                def.format = timeFormat(model, channel) || model.config().timeFormat;
                break;
        }
    }
    if (channel === channel_1.TEXT) {
        var filter = (def.formatType || 'number') + (def.format ? ':\'' + def.format + '\'' : '');
        return {
            text: {
                template: '{{' + model.field(channel, { datum: true }) + ' | ' + filter + '}}'
            }
        };
    }
    return def;
}
exports.formatMixins = formatMixins;
function isAbbreviated(model, channel, fieldDef) {
    switch (channel) {
        case channel_1.ROW:
        case channel_1.COLUMN:
        case channel_1.X:
        case channel_1.Y:
            return model.axis(channel).shortTimeLabels;
        case channel_1.COLOR:
        case channel_1.SHAPE:
        case channel_1.SIZE:
            return model.legend(channel).shortTimeLabels;
        case channel_1.TEXT:
            return model.config().mark.shortTimeLabels;
        case channel_1.LABEL:
    }
}
function timeFormat(model, channel) {
    var fieldDef = model.fieldDef(channel);
    return time_1.format(fieldDef.timeUnit, isAbbreviated(model, channel, fieldDef));
}
exports.timeFormat = timeFormat;

},{"../channel":9,"../type":53,"../util":54,"./time":27}],29:[function(require,module,exports){
var type_1 = require('./type');
exports.SUMMARY = 'summary';
exports.SOURCE = 'source';
exports.STACKED_SCALE = 'stacked_scale';
exports.LAYOUT = 'layout';
exports.types = {
    'boolean': type_1.NOMINAL,
    'number': type_1.QUANTITATIVE,
    'integer': type_1.QUANTITATIVE,
    'date': type_1.TEMPORAL,
    'string': type_1.NOMINAL
};

},{"./type":53}],30:[function(require,module,exports){
var channel_1 = require('./channel');
var util_1 = require('./util');
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
function channels(encoding) {
    return channel_1.CHANNELS.filter(function (channel) {
        return has(encoding, channel);
    });
}
exports.channels = channels;
function has(encoding, channel) {
    var channelEncoding = encoding && encoding[channel];
    return channelEncoding && (channelEncoding.field !== undefined ||
        (util_1.isArray(channelEncoding) && channelEncoding.length > 0));
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
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(encoding, channel)) {
            if (util_1.isArray(encoding[channel])) {
                encoding[channel].forEach(function (fieldDef) {
                    arr.push(fieldDef);
                });
            }
            else {
                arr.push(encoding[channel]);
            }
        }
    });
    return arr;
}
exports.fieldDefs = fieldDefs;
;
function forEach(encoding, f, thisArg) {
    var i = 0;
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(encoding, channel)) {
            if (util_1.isArray(encoding[channel])) {
                encoding[channel].forEach(function (fieldDef) {
                    f.call(thisArg, fieldDef, channel, i++);
                });
            }
            else {
                f.call(thisArg, encoding[channel], channel, i++);
            }
        }
    });
}
exports.forEach = forEach;
function map(encoding, f, thisArg) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(encoding, channel)) {
            if (util_1.isArray(encoding[channel])) {
                encoding[channel].forEach(function (fieldDef) {
                    arr.push(f.call(thisArg, fieldDef, channel, encoding));
                });
            }
            else {
                arr.push(f.call(thisArg, encoding[channel], channel, encoding));
            }
        }
    });
    return arr;
}
exports.map = map;
function reduce(encoding, f, init, thisArg) {
    var r = init;
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(encoding, channel)) {
            if (util_1.isArray(encoding[channel])) {
                encoding[channel].forEach(function (fieldDef) {
                    r = f.call(thisArg, r, fieldDef, channel, encoding);
                });
            }
            else {
                r = f.call(thisArg, r, encoding[channel], channel, encoding);
            }
        }
    });
    return r;
}
exports.reduce = reduce;

},{"./channel":9,"./util":54}],31:[function(require,module,exports){
var util_1 = require('./util');
var type_1 = require('./type');
function field(fieldDef, opt) {
    if (opt === void 0) { opt = {}; }
    var prefix = (opt.datum ? 'datum.' : '') + (opt.prefn || '');
    var suffix = opt.suffix || '';
    var field = fieldDef.field;
    if (isCount(fieldDef)) {
        return prefix + 'count' + suffix;
    }
    else if (opt.fn) {
        return prefix + opt.fn + '_' + field + suffix;
    }
    else if (!opt.nofn && fieldDef.bin) {
        return prefix + 'bin_' + field + (opt.binSuffix || suffix || '_start');
    }
    else if (!opt.nofn && !opt.noAggregate && fieldDef.aggregate) {
        return prefix + fieldDef.aggregate + '_' + field + suffix;
    }
    else if (!opt.nofn && fieldDef.timeUnit) {
        return prefix + fieldDef.timeUnit + '_' + field + suffix;
    }
    else {
        return prefix + field;
    }
}
exports.field = field;
function _isFieldDimension(fieldDef) {
    return util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) || !!fieldDef.bin ||
        (fieldDef.type === type_1.TEMPORAL && !!fieldDef.timeUnit);
}
function isDimension(fieldDef) {
    return fieldDef && fieldDef.field && _isFieldDimension(fieldDef);
}
exports.isDimension = isDimension;
function isMeasure(fieldDef) {
    return fieldDef && fieldDef.field && !_isFieldDimension(fieldDef);
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
        var timeUnit = fieldDef.timeUnit;
        switch (timeUnit) {
            case 'seconds': return 60;
            case 'minutes': return 60;
            case 'hours': return 24;
            case 'day': return 7;
            case 'date': return 31;
            case 'month': return 12;
            case 'year':
                var yearstat = stats['year_' + fieldDef.field];
                if (!yearstat) {
                    return null;
                }
                return yearstat.distinct -
                    (stat.missing > 0 && filterNull[type] ? 1 : 0);
        }
    }
    if (fieldDef.aggregate) {
        return 1;
    }
    return stat.distinct -
        (stat.missing > 0 && filterNull[type] ? 1 : 0);
}
exports.cardinality = cardinality;
function title(fieldDef) {
    if (isCount(fieldDef)) {
        return exports.COUNT_DISPLAYNAME;
    }
    var fn = fieldDef.aggregate || fieldDef.timeUnit || (fieldDef.bin && 'bin');
    if (fn) {
        return fn.toUpperCase() + '(' + fieldDef.field + ')';
    }
    else {
        return fieldDef.field;
    }
}
exports.title = title;

},{"./type":53,"./util":54}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
exports.axis = {
    type: 'object',
    properties: {
        format: {
            type: 'string',
            default: undefined,
            description: 'The formatting pattern for axis labels. If undefined, a good format is automatically determined. Vega-Lite uses D3\'s format pattern and automatically switches to datetime formatters.'
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
        offset: {
            type: 'number',
            default: undefined,
            description: 'The offset, in pixels, by which to displace the axis from the edge of the enclosing group or data rectangle.'
        },
        orient: {
            type: 'string',
            default: undefined,
            enum: ['top', 'right', 'left', 'bottom'],
            description: 'The orientation of the axis. One of top, bottom, left or right. The orientation can be used to further specialize the axis type (e.g., a y axis oriented for the right edge of the chart).'
        },
        subdivide: {
            type: 'number',
            default: undefined,
            description: 'If provided, sets the number of minor ticks between major ticks (the value 9 results in decimal subdivision). Only applicable for axes visualizing quantitative scales.'
        },
        ticks: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are "nice" (multiples of 2, 5, 10) and lie within the underlying scale\'s range.'
        },
        tickPadding: {
            type: 'integer',
            default: undefined,
            description: 'The padding, in pixels, between ticks and text labels.'
        },
        tickSize: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'The size, in pixels, of major, minor and end ticks.'
        },
        tickSizeMajor: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'The size, in pixels, of major ticks.'
        },
        tickSizeMinor: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'The size, in pixels, of minor ticks.'
        },
        tickSizeEnd: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'The size, in pixels, of end ticks.'
        },
        title: {
            type: 'string',
            default: undefined,
            description: 'A title for the axis. (Shows field name and its function by default.)'
        },
        titleOffset: {
            type: 'integer',
            default: undefined,
            description: 'A title offset value for the axis.'
        },
        values: {
            type: 'array',
            default: undefined
        },
        properties: {
            type: 'object',
            description: 'Optional mark property definitions for custom axis styling.'
        },
        characterWidth: {
            type: 'integer',
            default: 6,
            description: 'Character width for automatically determining title max length.'
        },
        labelMaxLength: {
            type: 'integer',
            default: 25,
            minimum: 1,
            description: 'Truncate labels that are too long.'
        },
        labels: {
            type: 'boolean',
            default: true,
            description: 'Enable or disable labels.'
        },
        shortTimeLabels: {
            type: 'boolean',
            default: false,
            description: 'Whether month and day names should be abbreviated.'
        },
        titleMaxLength: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'Max length for axis title if the title is automatically generated from the field\'s description.' +
                'By default, this is automatically based on cell size and characterWidth property.'
        }
    }
};

},{}],34:[function(require,module,exports){
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

},{"../type":53,"../util":54}],35:[function(require,module,exports){
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
        gridColor: {
            type: 'string',
            role: 'color',
            default: '#000000'
        },
        gridOpacity: {
            type: 'number',
            minimum: 0,
            maximum: 1,
            default: 0.4
        },
        gridOffset: {
            type: 'number',
            default: 0
        },
        clip: {
            type: 'boolean',
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

},{}],36:[function(require,module,exports){
exports.markConfig = {
    type: 'object',
    properties: {
        filled: {
            type: 'boolean',
            default: undefined,
            description: 'Whether the shape\'s color should be used as fill color instead of stroke color. ' +
                'This is only applicable for "bar", "point", and "area". ' +
                'All marks except "point" marks are filled by default.'
        },
        sortBy: {
            default: undefined,
            oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } }
            ],
            description: 'Sort layer of marks by a given field or fields.'
        },
        fill: {
            type: 'string',
            role: 'color',
            default: undefined
        },
        fillOpacity: {
            type: 'number',
            default: undefined,
            minimum: 0,
            maximum: 1
        },
        stroke: {
            type: 'string',
            role: 'color',
            default: undefined
        },
        strokeOpacity: {
            type: 'number',
            default: undefined,
            minimum: 0,
            maximum: 1
        },
        opacity: {
            type: 'number',
            default: undefined,
            minimum: 0,
            maximum: 1
        },
        strokeWidth: {
            type: 'number',
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
            description: 'The orientation of a non-stacked bar, area, and line charts.' +
                'The value is either horizontal (default) or vertical.' +
                'For area, this property determines the orient property of the Vega output.' +
                'For line, this property determines the sort order of the points in the line if `config.sortLineBy` is not specified.' +
                'For stacked charts, this is always determined by the orientation of the stack; ' +
                'therefore explicitly specified value will be ignored.'
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
        thickness: {
            type: 'number',
            default: 1,
            description: 'Thickness of the tick mark.'
        },
        align: {
            type: 'string',
            default: undefined,
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
        },
        format: {
            type: 'string',
            default: undefined,
            description: 'The formatting pattern for text value. If not defined, this will be determined automatically. '
        },
        shortTimeLabels: {
            type: 'boolean',
            default: false,
            description: 'Whether month names and weekday names should be abbreviated.'
        },
        applyColorToBackground: {
            type: 'boolean',
            default: false,
            description: 'Apply color field to background color instead of the text.'
        }
    }
};

},{}],37:[function(require,module,exports){
exports.sceneConfig = {
    type: 'object',
    properties: {
        fill: {
            type: 'string',
            role: 'color'
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
            type: 'array'
        },
        strokeDashOffset: {
            type: 'integer',
            description: 'The offset (in pixels) into which to begin drawing with the stroke dash array.'
        }
    }
};

},{}],38:[function(require,module,exports){
var config_stack_schema_1 = require('./config.stack.schema');
var config_cell_schema_1 = require('./config.cell.schema');
var config_marks_schema_1 = require('./config.marks.schema');
var config_scene_schema_1 = require('./config.scene.schema');
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
        numberFormat: {
            type: 'string',
            default: 's',
            description: 'D3 Number format for axis labels and text tables. For example "s" for SI units.'
        },
        timeFormat: {
            type: 'string',
            default: '%Y-%m-%d',
            description: 'Default datetime format for axis and legend labels. The format can be set directly on each axis and legend.'
        },
        textCellWidth: {
            type: 'integer',
            default: 90,
            minimum: 0
        },
        stack: config_stack_schema_1.stackConfig,
        cell: config_cell_schema_1.cellConfig,
        mark: config_marks_schema_1.markConfig,
        scene: config_scene_schema_1.sceneConfig
    }
};

},{"./config.cell.schema":35,"./config.marks.schema":36,"./config.scene.schema":37,"./config.stack.schema":39}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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
        }
    }
};

},{}],41:[function(require,module,exports){
var schemautil_1 = require('./schemautil');
var util_1 = require('../util');
var axis_schema_1 = require('./axis.schema');
var fielddef_schema_1 = require('./fielddef.schema');
var legend_schema_1 = require('./legend.schema');
var sort_schema_1 = require('./sort.schema');
var x = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.typicalField), {
    required: ['field', 'type'],
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
var row = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.facetField));
var column = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.facetField));
var size = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.typicalField), {
    properties: {
        legend: legend_schema_1.legend,
        sort: sort_schema_1.sort,
        value: {
            type: 'integer',
            default: undefined,
            minimum: 0,
            description: 'Size of marks. By default, this is 30 for point, square, and circle, and 10 for text.'
        }
    }
});
var color = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.typicalField), {
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
var shape = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.onlyOrdinalField), {
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
var path = {
    default: undefined,
    oneOf: [util_1.duplicate(fielddef_schema_1.fieldDef), {
            type: 'array',
            items: util_1.duplicate(fielddef_schema_1.fieldDef)
        }]
};
var detail = {
    default: undefined,
    oneOf: [util_1.duplicate(fielddef_schema_1.fieldDef), {
            type: 'array',
            items: util_1.duplicate(fielddef_schema_1.fieldDef)
        }]
};
var text = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.typicalField), {
    properties: {
        sort: sort_schema_1.sort,
        value: {
            type: 'string',
            default: 'Abc'
        }
    }
});
var label = schemautil_1.mergeDeep(util_1.duplicate(fielddef_schema_1.typicalField), {
    properies: {
        sort: sort_schema_1.sort
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
        path: path,
        text: text,
        detail: detail,
        label: label
    }
};

},{"../util":54,"./axis.schema":33,"./fielddef.schema":42,"./legend.schema":43,"./schemautil":47,"./sort.schema":48}],42:[function(require,module,exports){
var axis_schema_1 = require('./axis.schema');
var bin_schema_1 = require('./bin.schema');
var scale_schema_1 = require('./scale.schema');
var sort_schema_1 = require('./sort.schema');
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
exports.typicalField = schemautil_1.mergeDeep(util_1.duplicate(exports.fieldDef), {
    properties: {
        aggregate: exports.aggregate,
        scale: scale_schema_1.typicalScale
    }
});
exports.onlyOrdinalField = schemautil_1.mergeDeep(util_1.duplicate(exports.fieldDef), {
    properties: {
        scale: scale_schema_1.ordinalOnlyScale
    }
});
exports.facetField = schemautil_1.mergeDeep(util_1.duplicate(exports.onlyOrdinalField), {
    required: ['field', 'type'],
    properties: {
        axis: axis_schema_1.axis,
        sort: sort_schema_1.sort
    }
});

},{"../aggregate":7,"../timeunit":52,"../type":53,"../util":54,"./axis.schema":33,"./bin.schema":34,"./scale.schema":45,"./schemautil":47,"./sort.schema":48}],43:[function(require,module,exports){
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
                },
                shortTimeLabels: {
                    type: 'boolean',
                    default: false,
                    description: 'Whether month names and weekday names should be abbreviated.'
                }
            },
        }, {
            type: 'boolean'
        }]
};

},{}],44:[function(require,module,exports){
exports.mark = {
    type: 'string',
    enum: ['point', 'tick', 'bar', 'line', 'area', 'circle', 'square', 'text']
};

},{}],45:[function(require,module,exports){
var util_1 = require('../util');
var schemautil_1 = require('./schemautil');
var type_1 = require('../type');
var scale = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: ['linear', 'log', 'pow', 'sqrt', 'quantile', 'ordinal'],
            default: undefined,
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
exports.ordinalOnlyScale = schemautil_1.mergeDeep(util_1.duplicate(scale), ordinalScaleMixin);
exports.typicalScale = schemautil_1.mergeDeep(util_1.duplicate(scale), ordinalScaleMixin, typicalScaleMixin);

},{"../type":53,"../util":54,"./schemautil":47}],46:[function(require,module,exports){
var schemaUtil = require('./schemautil');
var mark_schema_1 = require('./mark.schema');
var config_schema_1 = require('./config.schema');
var data_schema_1 = require('./data.schema');
var encoding_schema_1 = require('./encoding.schema');
var transform_schema_1 = require('./transform.schema');
var fielddef_schema_1 = require('./fielddef.schema');
exports.aggregate = fielddef_schema_1.aggregate;
exports.util = schemaUtil;
exports.schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'Schema for Vega-Lite specification',
    type: 'object',
    required: ['mark', 'encoding'],
    properties: {
        name: {
            type: 'string',
            description: 'A name for the specification. The name is used to annotate marks, scale names, and more.'
        },
        description: {
            type: 'string'
        },
        data: data_schema_1.data,
        transform: transform_schema_1.transform,
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

},{"./config.schema":38,"./data.schema":40,"./encoding.schema":41,"./fielddef.schema":42,"./mark.schema":44,"./schemautil":47,"./transform.schema":49}],47:[function(require,module,exports){
var util = require('../util');
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
;
function extend(instance, schema) {
    return mergeDeep(instantiate(schema), instance);
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
function mergeDeep(dest) {
    var src = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        src[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < src.length; i++) {
        dest = deepMerge_(dest, src[i]);
    }
    return dest;
}
exports.mergeDeep = mergeDeep;
;
function deepMerge_(dest, src) {
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
            dest[p] = mergeDeep(src[p].constructor === Array ? [] : {}, src[p]);
        }
        else {
            mergeDeep(dest[p], src[p]);
        }
    }
    return dest;
}

},{"../util":54}],48:[function(require,module,exports){
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

},{"../aggregate":7,"../type":53,"../util":54}],49:[function(require,module,exports){
exports.transform = {
    type: 'object',
    properties: {
        filterNull: {
            type: 'boolean',
            default: undefined,
            description: 'Filter null values from the data. If set to true, all rows with null values are filtered. If false, no rows are filtered. Set the property to undefined to filter only quantitative and temporal fields.'
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

},{}],50:[function(require,module,exports){
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

},{"./aggregate":7,"./encoding":30,"./mark":32,"./timeunit":52,"./type":53}],51:[function(require,module,exports){
var Model_1 = require('./compile/Model');
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

},{"./channel":9,"./compile/Model":10,"./encoding":30,"./mark":32,"./util":54}],52:[function(require,module,exports){
exports.TIMEUNITS = [
    'year', 'month', 'day', 'date', 'hours', 'minutes', 'seconds', 'milliseconds',
    'yearmonth', 'yearmonthday', 'yearmonthdate', 'yearday', 'yeardate',
    'yearmonthdayhours', 'yearmonthdayhoursminutes', 'hoursminutes',
    'hoursminutesseconds', 'minutesseconds', 'secondsmilliseconds'
];

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6}],55:[function(require,module,exports){
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

},{"./mark":32,"./util":54}],56:[function(require,module,exports){
var vlBin = require('./bin');
var vlChannel = require('./channel');
var vlData = require('./data');
var vlEncoding = require('./encoding');
var vlFieldDef = require('./fielddef');
var vlCompile = require('./compile/compile');
var vlSchema = require('./schema/schema');
var vlShorthand = require('./shorthand');
var vlSpec = require('./spec');
var vlTimeUnit = require('./timeunit');
var vlType = require('./type');
var vlValidate = require('./validate');
var vlUtil = require('./util');
exports.bin = vlBin;
exports.channel = vlChannel;
exports.compile = vlCompile.compile;
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
exports.version = '0.9.3';

},{"./bin":8,"./channel":9,"./compile/compile":12,"./data":29,"./encoding":30,"./fielddef":31,"./schema/schema":46,"./shorthand":50,"./spec":51,"./timeunit":52,"./type":53,"./util":54,"./validate":55}]},{},[56])(56)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwic3JjL2FnZ3JlZ2F0ZS50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL01vZGVsLnRzIiwic3JjL2NvbXBpbGUvYXhpcy50cyIsInNyYy9jb21waWxlL2NvbXBpbGUudHMiLCJzcmMvY29tcGlsZS9jb25maWcudHMiLCJzcmMvY29tcGlsZS9kYXRhLnRzIiwic3JjL2NvbXBpbGUvZmFjZXQudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrLWFyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrLWJhci50cyIsInNyYy9jb21waWxlL21hcmstbGluZS50cyIsInNyYy9jb21waWxlL21hcmstcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrLXRleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrLXRpY2sudHMiLCJzcmMvY29tcGlsZS9tYXJrLnRzIiwic3JjL2NvbXBpbGUvc2NhbGUudHMiLCJzcmMvY29tcGlsZS9zdGFjay50cyIsInNyYy9jb21waWxlL3RpbWUudHMiLCJzcmMvY29tcGlsZS91dGlsLnRzIiwic3JjL2RhdGEudHMiLCJzcmMvZW5jb2RpbmcudHMiLCJzcmMvZmllbGRkZWYudHMiLCJzcmMvbWFyay50cyIsInNyYy9zY2hlbWEvYXhpcy5zY2hlbWEudHMiLCJzcmMvc2NoZW1hL2Jpbi5zY2hlbWEudHMiLCJzcmMvc2NoZW1hL2NvbmZpZy5jZWxsLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLm1hcmtzLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLnNjZW5lLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLnN0YWNrLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvZGF0YS5zY2hlbWEudHMiLCJzcmMvc2NoZW1hL2VuY29kaW5nLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvZmllbGRkZWYuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9sZWdlbmQuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9tYXJrLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvc2NhbGUuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9zY2hlbWEudHMiLCJzcmMvc2NoZW1hL3NjaGVtYXV0aWwudHMiLCJzcmMvc2NoZW1hL3NvcnQuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS90cmFuc2Zvcm0uc2NoZW1hLnRzIiwic3JjL3Nob3J0aGFuZC50cyIsInNyYy9zcGVjLnRzIiwic3JjL3RpbWV1bml0LnRzIiwic3JjL3R5cGUudHMiLCJzcmMvdXRpbC50cyIsInNyYy92YWxpZGF0ZS50cyIsInNyYy92bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxU2EscUJBQWEsR0FBRztJQUMzQixRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVTtJQUNqRCxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU87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QWlCLENBQUMsQ0FBQTtBQUM1QyxJQUFZLFdBQVcsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUMzQyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVwQixXQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ1osZUFBTyxHQUFHLFNBQVMsQ0FBQztBQUNwQixlQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUM1QixZQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsZ0JBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsZ0JBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsY0FBTSxHQUFHLFFBQVEsQ0FBQztBQUNsQixpQkFBUyxHQUFHLFdBQVcsQ0FBQztBQUN4QixZQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsZ0JBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsWUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLFlBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxnQkFBUSxHQUFHLFVBQVUsQ0FBQztBQUV0QixlQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ2QzLXRpbWUnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfdGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcbiAgdmFyIHQxID0gbmV3IERhdGU7XG4gIGZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQsIGZpZWxkKSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdDAuc2V0VGltZSgrc3RhcnQpLCB0MS5zZXRUaW1lKCtlbmQpO1xuICAgICAgICBmbG9vcmkodDApLCBmbG9vcmkodDEpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICAgIH07XG5cbiAgICAgIGludGVydmFsLmV2ZXJ5ID0gZnVuY3Rpb24oc3RlcCkge1xuICAgICAgICBzdGVwID0gTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgICAgcmV0dXJuICFpc0Zpbml0ZShzdGVwKSB8fCAhKHN0ZXAgPiAwKSA/IG51bGxcbiAgICAgICAgICAgIDogIShzdGVwID4gMSkgPyBpbnRlcnZhbFxuICAgICAgICAgICAgOiBpbnRlcnZhbC5maWx0ZXIoZmllbGRcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGZpZWxkKGQpICUgc3RlcCA9PT0gMDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24oZCkgeyByZXR1cm4gaW50ZXJ2YWwuY291bnQoMCwgZCkgJSBzdGVwID09PSAwOyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9O1xuXG4gIHZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIG5vb3BcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xuICB9KTtcblxuICAvLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG4gIG1pbGxpc2Vjb25kLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLmZsb29yKGspO1xuICAgIGlmICghaXNGaW5pdGUoaykgfHwgIShrID4gMCkpIHJldHVybiBudWxsO1xuICAgIGlmICghKGsgPiAxKSkgcmV0dXJuIG1pbGxpc2Vjb25kO1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gaykgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBrO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gd2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN1bmRheSA9IHdlZWtkYXkoMCk7XG4gIHZhciBtb25kYXkgPSB3ZWVrZGF5KDEpO1xuICB2YXIgdHVlc2RheSA9IHdlZWtkYXkoMik7XG4gIHZhciB3ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xuICB2YXIgdGh1cnNkYXkgPSB3ZWVrZGF5KDQpO1xuICB2YXIgZnJpZGF5ID0gd2Vla2RheSg1KTtcbiAgdmFyIHNhdHVyZGF5ID0gd2Vla2RheSg2KTtcblxuICB2YXIgbW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldERhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9KTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNTZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgdXRjTWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNIb3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNEYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gKGRhdGUuZ2V0VVRDRGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbiAgdmFyIHV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG4gIHZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbiAgdmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG4gIHZhciB1dGNUaHVyc2RheSA9IHV0Y1dlZWtkYXkoNCk7XG4gIHZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuICB2YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNZZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xuICB2YXIgc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcbiAgdmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG4gIHZhciBob3VycyA9IGhvdXIucmFuZ2U7XG4gIHZhciBkYXlzID0gZGF5LnJhbmdlO1xuICB2YXIgc3VuZGF5cyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG4gIHZhciB0dWVzZGF5cyA9IHR1ZXNkYXkucmFuZ2U7XG4gIHZhciB3ZWRuZXNkYXlzID0gd2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG4gIHZhciBmcmlkYXlzID0gZnJpZGF5LnJhbmdlO1xuICB2YXIgc2F0dXJkYXlzID0gc2F0dXJkYXkucmFuZ2U7XG4gIHZhciB3ZWVrcyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbnRocyA9IG1vbnRoLnJhbmdlO1xuICB2YXIgeWVhcnMgPSB5ZWFyLnJhbmdlO1xuXG4gIHZhciB1dGNNaWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICB2YXIgdXRjTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICB2YXIgdXRjU2Vjb25kcyA9IHV0Y1NlY29uZC5yYW5nZTtcbiAgdmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG4gIHZhciB1dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG4gIHZhciB1dGNEYXlzID0gdXRjRGF5LnJhbmdlO1xuICB2YXIgdXRjU3VuZGF5cyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbmRheXMgPSB1dGNNb25kYXkucmFuZ2U7XG4gIHZhciB1dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXkucmFuZ2U7XG4gIHZhciB1dGNGcmlkYXlzID0gdXRjRnJpZGF5LnJhbmdlO1xuICB2YXIgdXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWVrcyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbnRocyA9IHV0Y01vbnRoLnJhbmdlO1xuICB2YXIgdXRjWWVhcnMgPSB1dGNZZWFyLnJhbmdlO1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjEuMFwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnNlY29uZHMgPSBzZWNvbmRzO1xuICBleHBvcnRzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICBleHBvcnRzLmhvdXJzID0gaG91cnM7XG4gIGV4cG9ydHMuZGF5cyA9IGRheXM7XG4gIGV4cG9ydHMuc3VuZGF5cyA9IHN1bmRheXM7XG4gIGV4cG9ydHMubW9uZGF5cyA9IG1vbmRheXM7XG4gIGV4cG9ydHMudHVlc2RheXMgPSB0dWVzZGF5cztcbiAgZXhwb3J0cy53ZWRuZXNkYXlzID0gd2VkbmVzZGF5cztcbiAgZXhwb3J0cy50aHVyc2RheXMgPSB0aHVyc2RheXM7XG4gIGV4cG9ydHMuZnJpZGF5cyA9IGZyaWRheXM7XG4gIGV4cG9ydHMuc2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuICBleHBvcnRzLndlZWtzID0gd2Vla3M7XG4gIGV4cG9ydHMubW9udGhzID0gbW9udGhzO1xuICBleHBvcnRzLnllYXJzID0geWVhcnM7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmQgPSB1dGNNaWxsaXNlY29uZDtcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZHMgPSB1dGNNaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMudXRjU2Vjb25kcyA9IHV0Y1NlY29uZHM7XG4gIGV4cG9ydHMudXRjTWludXRlcyA9IHV0Y01pbnV0ZXM7XG4gIGV4cG9ydHMudXRjSG91cnMgPSB1dGNIb3VycztcbiAgZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbiAgZXhwb3J0cy51dGNTdW5kYXlzID0gdXRjU3VuZGF5cztcbiAgZXhwb3J0cy51dGNNb25kYXlzID0gdXRjTW9uZGF5cztcbiAgZXhwb3J0cy51dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXlzO1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXlzO1xuICBleHBvcnRzLnV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5cztcbiAgZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbiAgZXhwb3J0cy51dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheXM7XG4gIGV4cG9ydHMudXRjV2Vla3MgPSB1dGNXZWVrcztcbiAgZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG4gIGV4cG9ydHMudXRjWWVhcnMgPSB1dGNZZWFycztcbiAgZXhwb3J0cy5taWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICBleHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy5taW51dGUgPSBtaW51dGU7XG4gIGV4cG9ydHMuaG91ciA9IGhvdXI7XG4gIGV4cG9ydHMuZGF5ID0gZGF5O1xuICBleHBvcnRzLnN1bmRheSA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb25kYXkgPSBtb25kYXk7XG4gIGV4cG9ydHMudHVlc2RheSA9IHR1ZXNkYXk7XG4gIGV4cG9ydHMud2VkbmVzZGF5ID0gd2VkbmVzZGF5O1xuICBleHBvcnRzLnRodXJzZGF5ID0gdGh1cnNkYXk7XG4gIGV4cG9ydHMuZnJpZGF5ID0gZnJpZGF5O1xuICBleHBvcnRzLnNhdHVyZGF5ID0gc2F0dXJkYXk7XG4gIGV4cG9ydHMud2VlayA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb250aCA9IG1vbnRoO1xuICBleHBvcnRzLnllYXIgPSB5ZWFyO1xuICBleHBvcnRzLnV0Y1NlY29uZCA9IHV0Y1NlY29uZDtcbiAgZXhwb3J0cy51dGNNaW51dGUgPSB1dGNNaW51dGU7XG4gIGV4cG9ydHMudXRjSG91ciA9IHV0Y0hvdXI7XG4gIGV4cG9ydHMudXRjRGF5ID0gdXRjRGF5O1xuICBleHBvcnRzLnV0Y1N1bmRheSA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb25kYXkgPSB1dGNNb25kYXk7XG4gIGV4cG9ydHMudXRjVHVlc2RheSA9IHV0Y1R1ZXNkYXk7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG4gIGV4cG9ydHMudXRjRnJpZGF5ID0gdXRjRnJpZGF5O1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5ID0gdXRjU2F0dXJkYXk7XG4gIGV4cG9ydHMudXRjV2VlayA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuICBleHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyO1xuICBleHBvcnRzLmludGVydmFsID0gbmV3SW50ZXJ2YWw7XG5cbn0pKTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi4vdGltZScpLFxuICAgIEVQU0lMT04gPSAxZS0xNTtcblxuZnVuY3Rpb24gYmlucyhvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBkZXRlcm1pbmUgcmFuZ2VcbiAgdmFyIG1heGIgPSBvcHQubWF4YmlucyB8fCAxNSxcbiAgICAgIGJhc2UgPSBvcHQuYmFzZSB8fCAxMCxcbiAgICAgIGxvZ2IgPSBNYXRoLmxvZyhiYXNlKSxcbiAgICAgIGRpdiA9IG9wdC5kaXYgfHwgWzUsIDJdLFxuICAgICAgbWluID0gb3B0Lm1pbixcbiAgICAgIG1heCA9IG9wdC5tYXgsXG4gICAgICBzcGFuID0gbWF4IC0gbWluLFxuICAgICAgc3RlcCwgbGV2ZWwsIG1pbnN0ZXAsIHByZWNpc2lvbiwgdiwgaSwgZXBzO1xuXG4gIGlmIChvcHQuc3RlcCkge1xuICAgIC8vIGlmIHN0ZXAgc2l6ZSBpcyBleHBsaWNpdGx5IGdpdmVuLCB1c2UgdGhhdFxuICAgIHN0ZXAgPSBvcHQuc3RlcDtcbiAgfSBlbHNlIGlmIChvcHQuc3RlcHMpIHtcbiAgICAvLyBpZiBwcm92aWRlZCwgbGltaXQgY2hvaWNlIHRvIGFjY2VwdGFibGUgc3RlcCBzaXplc1xuICAgIHN0ZXAgPSBvcHQuc3RlcHNbTWF0aC5taW4oXG4gICAgICBvcHQuc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgIGJpc2VjdChvcHQuc3RlcHMsIHNwYW4vbWF4YiwgMCwgb3B0LnN0ZXBzLmxlbmd0aClcbiAgICApXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVzZSBzcGFuIHRvIGRldGVybWluZSBzdGVwIHNpemVcbiAgICBsZXZlbCA9IE1hdGguY2VpbChNYXRoLmxvZyhtYXhiKSAvIGxvZ2IpO1xuICAgIG1pbnN0ZXAgPSBvcHQubWluc3RlcCB8fCAwO1xuICAgIHN0ZXAgPSBNYXRoLm1heChcbiAgICAgIG1pbnN0ZXAsXG4gICAgICBNYXRoLnBvdyhiYXNlLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gbG9nYikgLSBsZXZlbClcbiAgICApO1xuXG4gICAgLy8gaW5jcmVhc2Ugc3RlcCBzaXplIGlmIHRvbyBtYW55IGJpbnNcbiAgICB3aGlsZSAoTWF0aC5jZWlsKHNwYW4vc3RlcCkgPiBtYXhiKSB7IHN0ZXAgKj0gYmFzZTsgfVxuXG4gICAgLy8gZGVjcmVhc2Ugc3RlcCBzaXplIGlmIGFsbG93ZWRcbiAgICBmb3IgKGk9MDsgaTxkaXYubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBzdGVwIC8gZGl2W2ldO1xuICAgICAgaWYgKHYgPj0gbWluc3RlcCAmJiBzcGFuIC8gdiA8PSBtYXhiKSBzdGVwID0gdjtcbiAgICB9XG4gIH1cblxuICAvLyB1cGRhdGUgcHJlY2lzaW9uLCBtaW4gYW5kIG1heFxuICB2ID0gTWF0aC5sb2coc3RlcCk7XG4gIHByZWNpc2lvbiA9IHYgPj0gMCA/IDAgOiB+figtdiAvIGxvZ2IpICsgMTtcbiAgZXBzID0gTWF0aC5wb3coYmFzZSwgLXByZWNpc2lvbiAtIDEpO1xuICBtaW4gPSBNYXRoLm1pbihtaW4sIE1hdGguZmxvb3IobWluIC8gc3RlcCArIGVwcykgKiBzdGVwKTtcbiAgbWF4ID0gTWF0aC5jZWlsKG1heCAvIHN0ZXApICogc3RlcDtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBtaW4sXG4gICAgc3RvcDogIG1heCxcbiAgICBzdGVwOiAgc3RlcCxcbiAgICB1bml0OiAge3ByZWNpc2lvbjogcHJlY2lzaW9ufSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpc2VjdChhLCB4LCBsbywgaGkpIHtcbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICBpZiAodXRpbC5jbXAoYVttaWRdLCB4KSA8IDApIHsgbG8gPSBtaWQgKyAxOyB9XG4gICAgZWxzZSB7IGhpID0gbWlkOyB9XG4gIH1cbiAgcmV0dXJuIGxvO1xufVxuXG5mdW5jdGlvbiB2YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnN0ZXAgKiBNYXRoLmZsb29yKHYgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gaW5kZXgodikge1xuICByZXR1cm4gTWF0aC5mbG9vcigodiAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGRhdGVfdmFsdWUodikge1xuICByZXR1cm4gdGhpcy51bml0LmRhdGUodmFsdWUuY2FsbCh0aGlzLCB2KSk7XG59XG5cbmZ1bmN0aW9uIGRhdGVfaW5kZXgodikge1xuICByZXR1cm4gaW5kZXguY2FsbCh0aGlzLCB0aGlzLnVuaXQudW5pdCh2KSk7XG59XG5cbmJpbnMuZGF0ZSA9IGZ1bmN0aW9uKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgZGF0ZSBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZmluZCB0aW1lIHN0ZXAsIHRoZW4gYmluXG4gIHZhciB1bml0cyA9IG9wdC51dGMgPyB0aW1lLnV0YyA6IHRpbWUsXG4gICAgICBkbWluID0gb3B0Lm1pbixcbiAgICAgIGRtYXggPSBvcHQubWF4LFxuICAgICAgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDIwLFxuICAgICAgbWluYiA9IG9wdC5taW5iaW5zIHx8IDQsXG4gICAgICBzcGFuID0gKCtkbWF4KSAtICgrZG1pbiksXG4gICAgICB1bml0ID0gb3B0LnVuaXQgPyB1bml0c1tvcHQudW5pdF0gOiB1bml0cy5maW5kKHNwYW4sIG1pbmIsIG1heGIpLFxuICAgICAgc3BlYyA9IGJpbnMoe1xuICAgICAgICBtaW46ICAgICB1bml0Lm1pbiAhPSBudWxsID8gdW5pdC5taW4gOiB1bml0LnVuaXQoZG1pbiksXG4gICAgICAgIG1heDogICAgIHVuaXQubWF4ICE9IG51bGwgPyB1bml0Lm1heCA6IHVuaXQudW5pdChkbWF4KSxcbiAgICAgICAgbWF4YmluczogbWF4YixcbiAgICAgICAgbWluc3RlcDogdW5pdC5taW5zdGVwLFxuICAgICAgICBzdGVwczogICB1bml0LnN0ZXBcbiAgICAgIH0pO1xuXG4gIHNwZWMudW5pdCA9IHVuaXQ7XG4gIHNwZWMuaW5kZXggPSBkYXRlX2luZGV4O1xuICBpZiAoIW9wdC5yYXcpIHNwZWMudmFsdWUgPSBkYXRlX3ZhbHVlO1xuICByZXR1cm4gc3BlYztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmlucztcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgZ2VuID0gbW9kdWxlLmV4cG9ydHM7XG5cbmdlbi5yZXBlYXQgPSBmdW5jdGlvbih2YWwsIG4pIHtcbiAgdmFyIGEgPSBBcnJheShuKSwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBhW2ldID0gdmFsO1xuICByZXR1cm4gYTtcbn07XG5cbmdlbi56ZXJvcyA9IGZ1bmN0aW9uKG4pIHtcbiAgcmV0dXJuIGdlbi5yZXBlYXQoMCwgbik7XG59O1xuXG5nZW4ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICBzdGVwID0gMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gIH1cbiAgaWYgKChzdG9wIC0gc3RhcnQpIC8gc3RlcCA9PSBJbmZpbml0eSkgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSByYW5nZScpO1xuICB2YXIgcmFuZ2UgPSBbXSwgaSA9IC0xLCBqO1xuICBpZiAoc3RlcCA8IDApIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPiBzdG9wKSByYW5nZS5wdXNoKGopO1xuICBlbHNlIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPCBzdG9wKSByYW5nZS5wdXNoKGopO1xuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5nZW4ucmFuZG9tID0ge307XG5cbmdlbi5yYW5kb20udW5pZm9ybSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgIG1heCA9IG1pbiA9PT0gdW5kZWZpbmVkID8gMSA6IG1pbjtcbiAgICBtaW4gPSAwO1xuICB9XG4gIHZhciBkID0gbWF4IC0gbWluO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaW4gKyBkICogTWF0aC5yYW5kb20oKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPj0gbWluICYmIHggPD0gbWF4KSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4IDwgbWluID8gMCA6IHggPiBtYXggPyAxIDogKHggLSBtaW4pIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBtaW4gKyBwKmQgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYiA9IGE7XG4gICAgYSA9IDA7XG4gIH1cbiAgdmFyIGQgPSBiIC0gYTtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYSArIE1hdGguZmxvb3IoZCAqIE1hdGgucmFuZG9tKCkpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA9PT0gTWF0aC5mbG9vcih4KSAmJiB4ID49IGEgJiYgeCA8IGIpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIHYgPSBNYXRoLmZsb29yKHgpO1xuICAgIHJldHVybiB2IDwgYSA/IDAgOiB2ID49IGIgPyAxIDogKHYgLSBhICsgMSkgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IGEgLSAxICsgTWF0aC5mbG9vcihwKmQpIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20ubm9ybWFsID0gZnVuY3Rpb24obWVhbiwgc3RkZXYpIHtcbiAgbWVhbiA9IG1lYW4gfHwgMDtcbiAgc3RkZXYgPSBzdGRldiB8fCAxO1xuICB2YXIgbmV4dDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgeCA9IDAsIHkgPSAwLCByZHMsIGM7XG4gICAgaWYgKG5leHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeCA9IG5leHQ7XG4gICAgICBuZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGRvIHtcbiAgICAgIHggPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHkgPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHJkcyA9IHgqeCArIHkqeTtcbiAgICB9IHdoaWxlIChyZHMgPT09IDAgfHwgcmRzID4gMSk7XG4gICAgYyA9IE1hdGguc3FydCgtMipNYXRoLmxvZyhyZHMpL3Jkcyk7IC8vIEJveC1NdWxsZXIgdHJhbnNmb3JtXG4gICAgbmV4dCA9IG1lYW4gKyB5KmMqc3RkZXY7XG4gICAgcmV0dXJuIG1lYW4gKyB4KmMqc3RkZXY7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIGV4cCA9IE1hdGguZXhwKE1hdGgucG93KHgtbWVhbiwgMikgLyAoLTIgKiBNYXRoLnBvdyhzdGRldiwgMikpKTtcbiAgICByZXR1cm4gKDEgLyAoc3RkZXYgKiBNYXRoLnNxcnQoMipNYXRoLlBJKSkpICogZXhwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIGZyb20gV2VzdCAoMjAwOSlcbiAgICAvLyBCZXR0ZXIgQXBwcm94aW1hdGlvbnMgdG8gQ3VtdWxhdGl2ZSBOb3JtYWwgRnVuY3Rpb25zXG4gICAgdmFyIGNkLFxuICAgICAgICB6ID0gKHggLSBtZWFuKSAvIHN0ZGV2LFxuICAgICAgICBaID0gTWF0aC5hYnMoeik7XG4gICAgaWYgKFogPiAzNykge1xuICAgICAgY2QgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3VtLCBleHAgPSBNYXRoLmV4cCgtWipaLzIpO1xuICAgICAgaWYgKFogPCA3LjA3MTA2NzgxMTg2NTQ3KSB7XG4gICAgICAgIHN1bSA9IDMuNTI2MjQ5NjU5OTg5MTFlLTAyICogWiArIDAuNzAwMzgzMDY0NDQzNjg4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNi4zNzM5NjIyMDM1MzE2NTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDMzLjkxMjg2NjA3ODM4MztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDExMi4wNzkyOTE0OTc4NzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjEuMjEzNTk2MTY5OTMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIwLjIwNjg2NzkxMjM3NjtcbiAgICAgICAgY2QgPSBleHAgKiBzdW07XG4gICAgICAgIHN1bSA9IDguODM4ODM0NzY0ODMxODRlLTAyICogWiArIDEuNzU1NjY3MTYzMTgyNjQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxNi4wNjQxNzc1NzkyMDc7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA4Ni43ODA3MzIyMDI5NDYxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjk2LjU2NDI0ODc3OTY3NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYzNy4zMzM2MzMzNzg4MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA3OTMuODI2NTEyNTE5OTQ4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNDQwLjQxMzczNTgyNDc1MjtcbiAgICAgICAgY2QgPSBjZCAvIHN1bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bSA9IFogKyAwLjY1O1xuICAgICAgICBzdW0gPSBaICsgNCAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDMgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAyIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMSAvIHN1bTtcbiAgICAgICAgY2QgPSBleHAgLyBzdW0gLyAyLjUwNjYyODI3NDYzMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHogPiAwID8gMSAtIGNkIDogY2Q7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIG9mIFByb2JpdCBmdW5jdGlvbiB1c2luZyBpbnZlcnNlIGVycm9yIGZ1bmN0aW9uLlxuICAgIGlmIChwIDw9IDAgfHwgcCA+PSAxKSByZXR1cm4gTmFOO1xuICAgIHZhciB4ID0gMipwIC0gMSxcbiAgICAgICAgdiA9ICg4ICogKE1hdGguUEkgLSAzKSkgLyAoMyAqIE1hdGguUEkgKiAoNC1NYXRoLlBJKSksXG4gICAgICAgIGEgPSAoMiAvIChNYXRoLlBJKnYpKSArIChNYXRoLmxvZygxIC0gTWF0aC5wb3coeCwyKSkgLyAyKSxcbiAgICAgICAgYiA9IE1hdGgubG9nKDEgLSAoeCp4KSkgLyB2LFxuICAgICAgICBzID0gKHggPiAwID8gMSA6IC0xKSAqIE1hdGguc3FydChNYXRoLnNxcnQoKGEqYSkgLSBiKSAtIGEpO1xuICAgIHJldHVybiBtZWFuICsgc3RkZXYgKiBNYXRoLlNRUlQyICogcztcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmJvb3RzdHJhcCA9IGZ1bmN0aW9uKGRvbWFpbiwgc21vb3RoKSB7XG4gIC8vIEdlbmVyYXRlcyBhIGJvb3RzdHJhcCBzYW1wbGUgZnJvbSBhIHNldCBvZiBvYnNlcnZhdGlvbnMuXG4gIC8vIFNtb290aCBib290c3RyYXBwaW5nIGFkZHMgcmFuZG9tIHplcm8tY2VudGVyZWQgbm9pc2UgdG8gdGhlIHNhbXBsZXMuXG4gIHZhciB2YWwgPSBkb21haW4uZmlsdGVyKHV0aWwuaXNWYWxpZCksXG4gICAgICBsZW4gPSB2YWwubGVuZ3RoLFxuICAgICAgZXJyID0gc21vb3RoID8gZ2VuLnJhbmRvbS5ub3JtYWwoMCwgc21vb3RoKSA6IG51bGw7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbFt+fihNYXRoLnJhbmRvbSgpKmxlbildICsgKGVyciA/IGVycigpIDogMCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59OyIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpO1xuXG52YXIgdGVtcERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGJhc2VEYXRlID0gbmV3IERhdGUoMCwgMCwgMSkuc2V0RnVsbFllYXIoMCksIC8vIEphbiAxLCAwIEFEXG4gICAgdXRjQmFzZURhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygwLCAwLCAxKSkuc2V0VVRDRnVsbFllYXIoMCk7XG5cbmZ1bmN0aW9uIGRhdGUoZCkge1xuICByZXR1cm4gKHRlbXBEYXRlLnNldFRpbWUoK2QpLCB0ZW1wRGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIHRpbWUgdW5pdCBlbnRyeVxuZnVuY3Rpb24gZW50cnkodHlwZSwgZGF0ZSwgdW5pdCwgc3RlcCwgbWluLCBtYXgpIHtcbiAgdmFyIGUgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIHVuaXQ6IHVuaXRcbiAgfTtcbiAgaWYgKHN0ZXApIHtcbiAgICBlLnN0ZXAgPSBzdGVwO1xuICB9IGVsc2Uge1xuICAgIGUubWluc3RlcCA9IDE7XG4gIH1cbiAgaWYgKG1pbiAhPSBudWxsKSBlLm1pbiA9IG1pbjtcbiAgaWYgKG1heCAhPSBudWxsKSBlLm1heCA9IG1heDtcbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0eXBlLCB1bml0LCBiYXNlLCBzdGVwLCBtaW4sIG1heCkge1xuICByZXR1cm4gZW50cnkodHlwZSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0Lm9mZnNldChiYXNlLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0LmNvdW50KGJhc2UsIGQpOyB9LFxuICAgIHN0ZXAsIG1pbiwgbWF4KTtcbn1cblxudmFyIGxvY2FsZSA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnNlY29uZCwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUubWludXRlLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS5ob3VyLCAgIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLmRheSwgICAgYmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS5tb250aCwgIGJhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUueWVhciwgICBiYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0U2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0SG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDQrZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIGQgJSAxMiwgMSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIHV0YyA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnV0Y1NlY29uZCwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUudXRjTWludXRlLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS51dGNIb3VyLCAgIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLnV0Y0RheSwgICAgdXRjQmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS51dGNNb250aCwgIHV0Y0Jhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUudXRjWWVhciwgICB1dGNCYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ1NlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDSG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDQrZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgZCAlIDEyLCAxKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIFNURVBTID0gW1xuICBbMzE1MzZlNiwgNV0sICAvLyAxLXllYXJcbiAgWzc3NzZlNiwgNF0sICAgLy8gMy1tb250aFxuICBbMjU5MmU2LCA0XSwgICAvLyAxLW1vbnRoXG4gIFsxMjA5NmU1LCAzXSwgIC8vIDItd2Vla1xuICBbNjA0OGU1LCAzXSwgICAvLyAxLXdlZWtcbiAgWzE3MjhlNSwgM10sICAgLy8gMi1kYXlcbiAgWzg2NGU1LCAzXSwgICAgLy8gMS1kYXlcbiAgWzQzMmU1LCAyXSwgICAgLy8gMTItaG91clxuICBbMjE2ZTUsIDJdLCAgICAvLyA2LWhvdXJcbiAgWzEwOGU1LCAyXSwgICAgLy8gMy1ob3VyXG4gIFszNmU1LCAyXSwgICAgIC8vIDEtaG91clxuICBbMThlNSwgMV0sICAgICAvLyAzMC1taW51dGVcbiAgWzllNSwgMV0sICAgICAgLy8gMTUtbWludXRlXG4gIFszZTUsIDFdLCAgICAgIC8vIDUtbWludXRlXG4gIFs2ZTQsIDFdLCAgICAgIC8vIDEtbWludXRlXG4gIFszZTQsIDBdLCAgICAgIC8vIDMwLXNlY29uZFxuICBbMTVlMywgMF0sICAgICAvLyAxNS1zZWNvbmRcbiAgWzVlMywgMF0sICAgICAgLy8gNS1zZWNvbmRcbiAgWzFlMywgMF0gICAgICAgLy8gMS1zZWNvbmRcbl07XG5cbmZ1bmN0aW9uIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIHN0ZXAgPSBTVEVQU1swXSwgaSwgbiwgYmlucztcblxuICBmb3IgKGk9MSwgbj1TVEVQUy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tTVEVQU1tpLTFdWzFdXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaW5zID49IG1pbmIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pdHNbU1RFUFNbbi0xXVsxXV07XG59XG5cbmZ1bmN0aW9uIHRvVW5pdE1hcCh1bml0cykge1xuICB2YXIgbWFwID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPXVuaXRzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBtYXBbdW5pdHNbaV0udHlwZV0gPSB1bml0c1tpXTtcbiAgfVxuICBtYXAuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgICByZXR1cm4gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yik7XG4gIH07XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Vbml0TWFwKGxvY2FsZSk7XG5tb2R1bGUuZXhwb3J0cy51dGMgPSB0b1VuaXRNYXAodXRjKTsiLCJ2YXIgdSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgRk5BTUUgPSAnX19uYW1lX18nO1xuXG51Lm5hbWVkZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIGYpIHsgcmV0dXJuIChmW0ZOQU1FXSA9IG5hbWUsIGYpOyB9O1xuXG51Lm5hbWUgPSBmdW5jdGlvbihmKSB7IHJldHVybiBmPT1udWxsID8gbnVsbCA6IGZbRk5BTUVdOyB9O1xuXG51LmlkZW50aXR5ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geDsgfTtcblxudS50cnVlID0gdS5uYW1lZGZ1bmMoJ3RydWUnLCBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0pO1xuXG51LmZhbHNlID0gdS5uYW1lZGZ1bmMoJ2ZhbHNlJywgZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSk7XG5cbnUuZHVwbGljYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufTtcblxudS5lcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKTtcbn07XG5cbnUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gIGZvciAodmFyIHgsIG5hbWUsIGk9MSwgbGVuPWFyZ3VtZW50cy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICB4ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAobmFtZSBpbiB4KSB7IG9ialtuYW1lXSA9IHhbbmFtZV07IH1cbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxudS5sZW5ndGggPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgeC5sZW5ndGggIT0gbnVsbCA/IHgubGVuZ3RoIDogbnVsbDtcbn07XG5cbnUua2V5cyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGtleXMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIGtleXMucHVzaChrKTtcbiAgcmV0dXJuIGtleXM7XG59O1xuXG51LnZhbHMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciB2YWxzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSB2YWxzLnB1c2goeFtrXSk7XG4gIHJldHVybiB2YWxzO1xufTtcblxudS50b01hcCA9IGZ1bmN0aW9uKGxpc3QsIGYpIHtcbiAgcmV0dXJuIChmID0gdS4kKGYpKSA/XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW2YoeCldID0gMSwgb2JqKTsgfSwge30pIDpcbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbeF0gPSAxLCBvYmopOyB9LCB7fSk7XG59O1xuXG51LmtleXN0ciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAvLyB1c2UgdG8gZW5zdXJlIGNvbnNpc3RlbnQga2V5IGdlbmVyYXRpb24gYWNyb3NzIG1vZHVsZXNcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBpZiAoIW4pIHJldHVybiAnJztcbiAgZm9yICh2YXIgcz1TdHJpbmcodmFsdWVzWzBdKSwgaT0xOyBpPG47ICsraSkge1xuICAgIHMgKz0gJ3wnICsgU3RyaW5nKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG4vLyB0eXBlIGNoZWNraW5nIGZ1bmN0aW9uc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG51LmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufTtcblxudS5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG51LmlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG51LmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudS5pc051bWJlciA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG5cbnUuaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufTtcblxudS5pc0RhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxudS5pc1ZhbGlkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iajtcbn07XG5cbnUuaXNCdWZmZXIgPSAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBCdWZmZXIuaXNCdWZmZXIpIHx8IHUuZmFsc2U7XG5cbi8vIHR5cGUgY29lcmNpb24gZnVuY3Rpb25zXG5cbnUubnVtYmVyID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6ICtzO1xufTtcblxudS5ib29sZWFuID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IHM9PT0nZmFsc2UnID8gZmFsc2UgOiAhIXM7XG59O1xuXG4vLyBwYXJzZSBhIGRhdGUgd2l0aCBvcHRpb25hbCBkMy50aW1lLWZvcm1hdCBmb3JtYXRcbnUuZGF0ZSA9IGZ1bmN0aW9uKHMsIGZvcm1hdCkge1xuICB2YXIgZCA9IGZvcm1hdCA/IGZvcm1hdCA6IERhdGU7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogZC5wYXJzZShzKTtcbn07XG5cbnUuYXJyYXkgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgPyAodS5pc0FycmF5KHgpID8geCA6IFt4XSkgOiBbXTtcbn07XG5cbnUuc3RyID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gdS5pc0FycmF5KHgpID8gJ1snICsgeC5tYXAodS5zdHIpICsgJ10nXG4gICAgOiB1LmlzT2JqZWN0KHgpID8gSlNPTi5zdHJpbmdpZnkoeClcbiAgICA6IHUuaXNTdHJpbmcoeCkgPyAoJ1xcJycrdXRpbF9lc2NhcGVfc3RyKHgpKydcXCcnKSA6IHg7XG59O1xuXG52YXIgZXNjYXBlX3N0cl9yZSA9IC8oXnxbXlxcXFxdKScvZztcblxuZnVuY3Rpb24gdXRpbF9lc2NhcGVfc3RyKHgpIHtcbiAgcmV0dXJuIHgucmVwbGFjZShlc2NhcGVfc3RyX3JlLCAnJDFcXFxcXFwnJyk7XG59XG5cbi8vIGRhdGEgYWNjZXNzIGZ1bmN0aW9uc1xuXG52YXIgZmllbGRfcmUgPSAvXFxbKC4qPylcXF18W14uXFxbXSsvZztcblxudS5maWVsZCA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIFN0cmluZyhmKS5tYXRjaChmaWVsZF9yZSkubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZFswXSAhPT0gJ1snID8gZCA6XG4gICAgICBkWzFdICE9PSBcIidcIiAmJiBkWzFdICE9PSAnXCInID8gZC5zbGljZSgxLCAtMSkgOlxuICAgICAgZC5zbGljZSgyLCAtMikucmVwbGFjZSgvXFxcXChbXCInXSkvZywgJyQxJyk7XG4gIH0pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIChzID0gdS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBzLnJlZHVjZShmdW5jdGlvbih4LGYpIHsgcmV0dXJuIHhbZl07IH0sIHgpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHhbZl07IH1cbiAgICApO1xufTtcblxuLy8gc2hvcnQtY3V0IGZvciBhY2Nlc3NvclxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxuXG51LiRmdW5jID0gZnVuY3Rpb24obmFtZSwgb3ApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGYpIHtcbiAgICBmID0gdS4kKGYpIHx8IHUuaWRlbnRpdHk7XG4gICAgdmFyIG4gPSBuYW1lICsgKHUubmFtZShmKSA/ICdfJyt1Lm5hbWUoZikgOiAnJyk7XG4gICAgcmV0dXJuIHUubmFtZWRmdW5jKG4sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG9wKGYoZCkpOyB9KTtcbiAgfTtcbn07XG5cbnUuJHZhbGlkICA9IHUuJGZ1bmMoJ3ZhbGlkJywgdS5pc1ZhbGlkKTtcbnUuJGxlbmd0aCA9IHUuJGZ1bmMoJ2xlbmd0aCcsIHUubGVuZ3RoKTtcblxudS4kaW4gPSBmdW5jdGlvbihmLCB2YWx1ZXMpIHtcbiAgZiA9IHUuJChmKTtcbiAgdmFyIG1hcCA9IHUuaXNBcnJheSh2YWx1ZXMpID8gdS50b01hcCh2YWx1ZXMpIDogdmFsdWVzO1xuICByZXR1cm4gZnVuY3Rpb24oZCkgeyByZXR1cm4gISFtYXBbZihkKV07IH07XG59O1xuXG4vLyBjb21wYXJpc29uIC8gc29ydGluZyBmdW5jdGlvbnNcblxudS5jb21wYXJhdG9yID0gZnVuY3Rpb24oc29ydCkge1xuICB2YXIgc2lnbiA9IFtdO1xuICBpZiAoc29ydCA9PT0gdW5kZWZpbmVkKSBzb3J0ID0gW107XG4gIHNvcnQgPSB1LmFycmF5KHNvcnQpLm1hcChmdW5jdGlvbihmKSB7XG4gICAgdmFyIHMgPSAxO1xuICAgIGlmICAgICAgKGZbMF0gPT09ICctJykgeyBzID0gLTE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgZWxzZSBpZiAoZlswXSA9PT0gJysnKSB7IHMgPSArMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBzaWduLnB1c2gocyk7XG4gICAgcmV0dXJuIHUuYWNjZXNzb3IoZik7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oYSxiKSB7XG4gICAgdmFyIGksIG4sIGYsIHgsIHk7XG4gICAgZm9yIChpPTAsIG49c29ydC5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBmID0gc29ydFtpXTsgeCA9IGYoYSk7IHkgPSBmKGIpO1xuICAgICAgaWYgKHggPCB5KSByZXR1cm4gLTEgKiBzaWduW2ldO1xuICAgICAgaWYgKHggPiB5KSByZXR1cm4gc2lnbltpXTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG59O1xuXG51LmNtcCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGEgPCBiKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoYSA+PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoYSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChiID09PSBudWxsKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn07XG5cbnUubnVtY21wID0gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAtIGI7IH07XG5cbnUuc3RhYmxlc29ydCA9IGZ1bmN0aW9uKGFycmF5LCBzb3J0QnksIGtleUZuKSB7XG4gIHZhciBpbmRpY2VzID0gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGlkeCwgdiwgaSkge1xuICAgIHJldHVybiAoaWR4W2tleUZuKHYpXSA9IGksIGlkeCk7XG4gIH0sIHt9KTtcblxuICBhcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgc2EgPSBzb3J0QnkoYSksXG4gICAgICAgIHNiID0gc29ydEJ5KGIpO1xuICAgIHJldHVybiBzYSA8IHNiID8gLTEgOiBzYSA+IHNiID8gMVxuICAgICAgICAgOiAoaW5kaWNlc1trZXlGbihhKV0gLSBpbmRpY2VzW2tleUZuKGIpXSk7XG4gIH0pO1xuXG4gIHJldHVybiBhcnJheTtcbn07XG5cblxuLy8gc3RyaW5nIGZ1bmN0aW9uc1xuXG51LnBhZCA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCBwYWRjaGFyKSB7XG4gIHBhZGNoYXIgPSBwYWRjaGFyIHx8IFwiIFwiO1xuICB2YXIgZCA9IGxlbmd0aCAtIHMubGVuZ3RoO1xuICBpZiAoZCA8PSAwKSByZXR1cm4gcztcbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBzdHJyZXAoZCwgcGFkY2hhcikgKyBzO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBzdHJyZXAoTWF0aC5mbG9vcihkLzIpLCBwYWRjaGFyKSArXG4gICAgICAgICBzICsgc3RycmVwKE1hdGguY2VpbChkLzIpLCBwYWRjaGFyKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHMgKyBzdHJyZXAoZCwgcGFkY2hhcik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0cnJlcChuLCBzdHIpIHtcbiAgdmFyIHMgPSBcIlwiLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHMgKz0gc3RyO1xuICByZXR1cm4gcztcbn1cblxudS50cnVuY2F0ZSA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCB3b3JkLCBlbGxpcHNpcykge1xuICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gIGlmIChsZW4gPD0gbGVuZ3RoKSByZXR1cm4gcztcbiAgZWxsaXBzaXMgPSBlbGxpcHNpcyAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKGVsbGlwc2lzKSA6ICdcXHUyMDI2JztcbiAgdmFyIGwgPSBNYXRoLm1heCgwLCBsZW5ndGggLSBlbGxpcHNpcy5sZW5ndGgpO1xuXG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCwxKSA6IHMuc2xpY2UobGVuLWwpKTtcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICB2YXIgbDEgPSBNYXRoLmNlaWwobC8yKSwgbDIgPSBNYXRoLmZsb29yKGwvMik7XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwxKSA6IHMuc2xpY2UoMCxsMSkpICtcbiAgICAgICAgZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDIsMSkgOiBzLnNsaWNlKGxlbi1sMikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwpIDogcy5zbGljZSgwLGwpKSArIGVsbGlwc2lzO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZU9uV29yZChzLCBsZW4sIHJldikge1xuICB2YXIgY250ID0gMCwgdG9rID0gcy5zcGxpdCh0cnVuY2F0ZV93b3JkX3JlKTtcbiAgaWYgKHJldikge1xuICAgIHMgPSAodG9rID0gdG9rLnJldmVyc2UoKSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KVxuICAgICAgLnJldmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBzID0gdG9rLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pO1xuICB9XG4gIHJldHVybiBzLmxlbmd0aCA/IHMuam9pbignJykudHJpbSgpIDogdG9rWzBdLnNsaWNlKDAsIGxlbik7XG59XG5cbnZhciB0cnVuY2F0ZV93b3JkX3JlID0gLyhbXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTIwMjhcXHUyMDI5XFx1MzAwMFxcdUZFRkZdKS87XG4iLCJleHBvcnQgY29uc3QgQUdHUkVHQVRFX09QUyA9IFtcbiAgJ3ZhbHVlcycsICdjb3VudCcsICd2YWxpZCcsICdtaXNzaW5nJywgJ2Rpc3RpbmN0JyxcbiAgJ3N1bScsICdtZWFuJywgJ2F2ZXJhZ2UnLCAndmFyaWFuY2UnLCAndmFyaWFuY2VwJywgJ3N0ZGV2JyxcbiAgJ3N0ZGV2cCcsICdtZWRpYW4nLCAncTEnLCAncTMnLCAnbW9kZXNrZXcnLCAnbWluJywgJ21heCcsXG4gICdhcmdtaW4nLCAnYXJnbWF4J1xuXTtcblxuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BTID0gW1xuICAnbWVhbicsICdhdmVyYWdlJywgJ3N0ZGV2JywgJ3N0ZGV2cCcsICdtZWRpYW4nLCAncTEnLCAncTMnLCAnbWluJywgJ21heCdcbl07XG5cbi8vIFRPRE86IG1vdmUgc3VwcG9ydGVkVHlwZXMsIHN1cHBvcnRlZEVudW1zIGZyb20gc2NoZW1hIHRvIGhlcmVcbiIsImltcG9ydCB7Q2hhbm5lbCwgUk9XLCBDT0xVTU4sIFNIQVBFLCBTSVpFfSBmcm9tICcuL2NoYW5uZWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXV0b01heEJpbnMoY2hhbm5lbDogQ2hhbm5lbCk6IG51bWJlciB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgU0laRTpcbiAgICAgIC8vIEZhY2V0cyBhbmQgU2l6ZSBzaG91bGRuJ3QgaGF2ZSB0b28gbWFueSBiaW5zXG4gICAgICAvLyBXZSBjaG9vc2UgNiBsaWtlIHNoYXBlIHRvIHNpbXBsaWZ5IHRoZSBydWxlXG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiA2OyAvLyBWZWdhJ3MgXCJzaGFwZVwiIGhhcyA2IGRpc3RpbmN0IHZhbHVlc1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gMTA7XG4gIH1cbn1cbiIsIi8qXG4gKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZW5jb2RpbmcgY2hhbm5lbHMgKFZpc3VhbCB2YXJpYWJsZXMpXG4gKiBzdWNoIGFzICd4JywgJ3knLCAnY29sb3InLlxuICovXG5cbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFggPSAneCcgYXMgYW55LFxuICBZID0gJ3knIGFzIGFueSxcbiAgUk9XID0gJ3JvdycgYXMgYW55LFxuICBDT0xVTU4gPSAnY29sdW1uJyBhcyBhbnksXG4gIFNIQVBFID0gJ3NoYXBlJyBhcyBhbnksXG4gIFNJWkUgPSAnc2l6ZScgYXMgYW55LFxuICBDT0xPUiA9ICdjb2xvcicgYXMgYW55LFxuICBQQVRIID0gJ3BhdGgnIGFzIGFueSxcbiAgVEVYVCA9ICd0ZXh0JyBhcyBhbnksXG4gIERFVEFJTCA9ICdkZXRhaWwnIGFzIGFueSxcbiAgTEFCRUwgPSAnbGFiZWwnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgWCA9IENoYW5uZWwuWDtcbmV4cG9ydCBjb25zdCBZID0gQ2hhbm5lbC5ZO1xuZXhwb3J0IGNvbnN0IFJPVyA9IENoYW5uZWwuUk9XO1xuZXhwb3J0IGNvbnN0IENPTFVNTiA9IENoYW5uZWwuQ09MVU1OO1xuZXhwb3J0IGNvbnN0IFNIQVBFID0gQ2hhbm5lbC5TSEFQRTtcbmV4cG9ydCBjb25zdCBTSVpFID0gQ2hhbm5lbC5TSVpFO1xuZXhwb3J0IGNvbnN0IENPTE9SID0gQ2hhbm5lbC5DT0xPUjtcbmV4cG9ydCBjb25zdCBQQVRIID0gQ2hhbm5lbC5QQVRIO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBDaGFubmVsLlRFWFQ7XG5leHBvcnQgY29uc3QgREVUQUlMID0gQ2hhbm5lbC5ERVRBSUw7XG5leHBvcnQgY29uc3QgTEFCRUwgPSBDaGFubmVsLkxBQkVMO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTFMgPSBbWCwgWSwgUk9XLCBDT0xVTU4sIFNJWkUsIFNIQVBFLCBDT0xPUiwgUEFUSCwgVEVYVCwgREVUQUlMLCBMQUJFTF07XG5cbmludGVyZmFjZSBTdXBwb3J0ZWRNYXJrIHtcbiAgcG9pbnQ/OiBib29sZWFuO1xuICB0aWNrPzogYm9vbGVhbjtcbiAgY2lyY2xlPzogYm9vbGVhbjtcbiAgc3F1YXJlPzogYm9vbGVhbjtcbiAgYmFyPzogYm9vbGVhbjtcbiAgbGluZT86IGJvb2xlYW47XG4gIGFyZWE/OiBib29sZWFuO1xuICB0ZXh0PzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGEgcGFydGljdWxhciBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbCAgY2hhbm5lbCBuYW1lXG4gKiBAcGFyYW0gbWFyayB0aGUgbWFyayB0eXBlXG4gKiBAcmV0dXJuIHdoZXRoZXIgdGhlIG1hcmsgc3VwcG9ydHMgdGhlIGNoYW5uZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRNYXJrKGNoYW5uZWw6IENoYW5uZWwsIG1hcms6IE1hcmspIHtcbiAgcmV0dXJuICEhZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsKVttYXJrXTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBkaWN0aW9uYXJ5IHNob3dpbmcgd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgbWFyayB0eXBlLlxuICogQHBhcmFtIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgbWFyayB0eXBlcyB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZE1hcmsoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZE1hcmsge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBERVRBSUw6XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4geyAvLyBhbGwgbWFya3NcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIGxpbmU6IHRydWUsIGFyZWE6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cG9pbnQ6IHRydWV9O1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7dGV4dDogdHJ1ZX07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtsaW5lOiB0cnVlfTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmludGVyZmFjZSBTdXBwb3J0ZWRSb2xlIHtcbiAgbWVhc3VyZTogYm9vbGVhbjtcbiAgZGltZW5zaW9uOiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgZGltZW5zaW9uIC8gbWVhc3VyZSByb2xlXG4gKiBAcGFyYW0gIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgcm9sZSB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZFJvbGUoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZFJvbGUge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBMQUJFTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IHRydWUsXG4gICAgICAgIGRpbWVuc2lvbjogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICBjYXNlIFNIQVBFOlxuICAgIGNhc2UgREVUQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogZmFsc2UsXG4gICAgICAgIGRpbWVuc2lvbjogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiBmYWxzZVxuICAgICAgfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBlbmNvZGluZyBjaGFubmVsJyArIGNoYW5uZWwpO1xufVxuIiwiaW1wb3J0IHtTcGVjfSBmcm9tICcuLi9zY2hlbWEvc2NoZW1hJztcbmltcG9ydCB7QXhpcywgYXhpcyBhcyBheGlzU2NoZW1hfSBmcm9tICcuLi9zY2hlbWEvYXhpcy5zY2hlbWEnO1xuaW1wb3J0IHtMZWdlbmQsIGxlZ2VuZCBhcyBsZWdlbmRTY2hlbWF9IGZyb20gJy4uL3NjaGVtYS9sZWdlbmQuc2NoZW1hJztcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4uL3NjaGVtYS9lbmNvZGluZy5zY2hlbWEnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge2luc3RhbnRpYXRlfSBmcm9tICcuLi9zY2hlbWEvc2NoZW1hdXRpbCc7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSAnLi4vc2NoZW1hL3NjaGVtYSc7XG5pbXBvcnQgKiBhcyBzY2hlbWFVdGlsIGZyb20gJy4uL3NjaGVtYS9zY2hlbWF1dGlsJztcblxuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgU0laRSwgVEVYVCwgQ2hhbm5lbCwgc3VwcG9ydE1hcmt9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0ICogYXMgdmxGaWVsZERlZiBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0ZpZWxkUmVmT3B0aW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7TWFyaywgQkFSLCBUSUNLLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcblxuaW1wb3J0IHtnZXRGdWxsTmFtZSwgTk9NSU5BTCwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgZHVwbGljYXRlLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2NvbXBpbGVNYXJrQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2NvbXBpbGVMYXlvdXQsIExheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtjb21waWxlU3RhY2tQcm9wZXJ0aWVzLCBTdGFja1Byb3BlcnRpZXN9IGZyb20gJy4vc3RhY2snO1xuaW1wb3J0IHt0eXBlIGFzIHNjYWxlVHlwZX0gZnJvbSAnLi9zY2FsZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgbW9kZWwgb2YgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24gZm9yIHRoZSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfc3BlYzogU3BlYztcbiAgcHJpdmF0ZSBfc3RhY2s6IFN0YWNrUHJvcGVydGllcztcbiAgcHJpdmF0ZSBfbGF5b3V0OiBMYXlvdXQ7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogU3BlYykge1xuICAgIHZhciBkZWZhdWx0cyA9IHNjaGVtYS5pbnN0YW50aWF0ZSgpO1xuICAgIHRoaXMuX3NwZWMgPSBzY2hlbWFVdGlsLm1lcmdlRGVlcChkZWZhdWx0cywgc3BlYyk7XG5cbiAgICB2bEVuY29kaW5nLmZvckVhY2godGhpcy5fc3BlYy5lbmNvZGluZywgZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoIXN1cHBvcnRNYXJrKGNoYW5uZWwsIHRoaXMuX3NwZWMubWFyaykpIHtcbiAgICAgICAgLy8gRHJvcCB1bnN1cHBvcnRlZCBjaGFubmVsXG5cbiAgICAgICAgLy8gRklYTUUgY29uc29saWRhdGUgd2FybmluZyBtZXRob2RcbiAgICAgICAgY29uc29sZS53YXJuKGNoYW5uZWwsICdkcm9wcGVkIGFzIGl0IGlzIGluY29tcGF0aWJsZSB3aXRoJywgdGhpcy5fc3BlYy5tYXJrKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3NwZWMuZW5jb2RpbmdbY2hhbm5lbF0uZmllbGQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERlZi50eXBlKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgc2hvcnQgdHlwZSB0byBmdWxsIHR5cGVcbiAgICAgICAgZmllbGREZWYudHlwZSA9IGdldEZ1bGxOYW1lKGZpZWxkRGVmLnR5cGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPIGluc3RhbnRpYXRlIGJpbiBoZXJlXG5cbiAgICAgIGlmIChmaWVsZERlZi5heGlzID09PSB0cnVlKSB7XG4gICAgICAgIGZpZWxkRGVmLmF4aXMgPSBpbnN0YW50aWF0ZShheGlzU2NoZW1hKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLmxlZ2VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBmaWVsZERlZi5sZWdlbmQgPSBpbnN0YW50aWF0ZShsZWdlbmRTY2hlbWEpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgZGVmYXVsdCBwYWRkaW5nIGZvciBST1cgYW5kIENPTFVNTlxuICAgICAgaWYgKGNoYW5uZWwgPT09IFJPVyAmJiBmaWVsZERlZi5zY2FsZS5wYWRkaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmllbGREZWYuc2NhbGUucGFkZGluZyA9IHRoaXMuaGFzKFkpID8gMTYgOiAwO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTFVNTiAmJiBmaWVsZERlZi5zY2FsZS5wYWRkaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmllbGREZWYuc2NhbGUucGFkZGluZyA9IHRoaXMuaGFzKFgpID8gMTYgOiAwO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHN0YWNrXG4gICAgdGhpcy5fc3RhY2sgPSBjb21waWxlU3RhY2tQcm9wZXJ0aWVzKHRoaXMuX3NwZWMpO1xuICAgIHRoaXMuX3NwZWMuY29uZmlnLm1hcmsgPSBjb21waWxlTWFya0NvbmZpZyh0aGlzLl9zcGVjLCB0aGlzLl9zdGFjayk7XG4gICAgdGhpcy5fbGF5b3V0ID0gY29tcGlsZUxheW91dCh0aGlzKTtcblxuICB9XG5cbiAgcHVibGljIGxheW91dCgpOiBMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLl9sYXlvdXQ7XG4gIH1cblxuICBwdWJsaWMgc3RhY2soKTogU3RhY2tQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2s7XG4gIH1cblxuICBwdWJsaWMgdG9TcGVjKGV4Y2x1ZGVDb25maWc/LCBleGNsdWRlRGF0YT8pIHtcbiAgICB2YXIgZW5jb2RpbmcgPSBkdXBsaWNhdGUodGhpcy5fc3BlYy5lbmNvZGluZyksXG4gICAgICBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fc3BlYy5tYXJrLFxuICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgfTtcblxuICAgIGlmICghZXhjbHVkZUNvbmZpZykge1xuICAgICAgc3BlYy5jb25maWcgPSBkdXBsaWNhdGUodGhpcy5fc3BlYy5jb25maWcpO1xuICAgIH1cblxuICAgIGlmICghZXhjbHVkZURhdGEpIHtcbiAgICAgIHNwZWMuZGF0YSA9IGR1cGxpY2F0ZSh0aGlzLl9zcGVjLmRhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHZhciBkZWZhdWx0cyA9IHNjaGVtYS5pbnN0YW50aWF0ZSgpO1xuICAgIHJldHVybiBzY2hlbWFVdGlsLnN1YnRyYWN0KHNwZWMsIGRlZmF1bHRzKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXJrKCk6IE1hcmsge1xuICAgIHJldHVybiB0aGlzLl9zcGVjLm1hcms7XG4gIH1cblxuICBwdWJsaWMgc3BlYygpOiBTcGVjIHtcbiAgICByZXR1cm4gdGhpcy5fc3BlYztcbiAgfVxuXG4gIHB1YmxpYyBpcyhtYXJrOiBNYXJrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWMubWFyayA9PT0gbWFyaztcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLmhhcyh0aGlzLl9zcGVjLmVuY29kaW5nLCBjaGFubmVsKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIHJldHVybiB0aGlzLl9zcGVjLmVuY29kaW5nW2NoYW5uZWxdO1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogc2NhbGVUeXBlKGZpZWxkRGVmLCBjaGFubmVsLCB0aGlzLm1hcmsoKSkgPT09ICdvcmRpbmFsJyA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgIH0sIG9wdCk7XG4gICAgfVxuICAgIHJldHVybiB2bEZpZWxkRGVmLmZpZWxkKGZpZWxkRGVmLCBvcHQpO1xuICB9XG5cbiAgcHVibGljIGZpZWxkVGl0bGUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZsRmllbGREZWYudGl0bGUodGhpcy5fc3BlYy5lbmNvZGluZ1tjaGFubmVsXSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKTogQ2hhbm5lbFtdIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5jaGFubmVscyh0aGlzLl9zcGVjLmVuY29kaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXAoZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgZTogRW5jb2RpbmcpID0+IGFueSwgdD86IGFueSkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLm1hcCh0aGlzLl9zcGVjLmVuY29kaW5nLCBmLCB0KTtcbiAgfVxuXG4gIHB1YmxpYyByZWR1Y2UoZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGU6IEVuY29kaW5nKSA9PiBhbnksIGluaXQsIHQ/OiBhbnkpIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5yZWR1Y2UodGhpcy5fc3BlYy5lbmNvZGluZywgZiwgaW5pdCwgdCk7XG4gIH1cblxuICBwdWJsaWMgZm9yRWFjaChmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOm51bWJlcikgPT4gdm9pZCwgdD86IGFueSkge1xuICAgIHZsRW5jb2RpbmcuZm9yRWFjaCh0aGlzLl9zcGVjLmVuY29kaW5nLCBmLCB0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc09yZGluYWxTY2FsZShjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpO1xuICAgIHJldHVybiBmaWVsZERlZiAmJiAoXG4gICAgICBjb250YWlucyhbTk9NSU5BTCwgT1JESU5BTF0sIGZpZWxkRGVmLnR5cGUpIHx8XG4gICAgICAoIGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIHNjYWxlVHlwZShmaWVsZERlZiwgY2hhbm5lbCwgdGhpcy5tYXJrKCkpID09PSAnb3JkaW5hbCcgKVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0RpbWVuc2lvbihjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIHZsRmllbGREZWYuaXNEaW1lbnNpb24odGhpcy5maWVsZERlZihjaGFubmVsKSk7XG4gIH1cblxuICBwdWJsaWMgaXNNZWFzdXJlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gdmxGaWVsZERlZi5pc01lYXN1cmUodGhpcy5maWVsZERlZihjaGFubmVsKSk7XG4gIH1cblxuICBwdWJsaWMgaXNBZ2dyZWdhdGUoKSB7XG4gICAgcmV0dXJuIHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUodGhpcy5fc3BlYy5lbmNvZGluZyk7XG4gIH1cblxuICBwdWJsaWMgaXNGYWNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXMoUk9XKSB8fCB0aGlzLmhhcyhDT0xVTU4pO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0FnZ3JlZ2F0ZSgpID8gU1VNTUFSWSA6IFNPVVJDRTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVjLmRhdGE7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVjLnRyYW5zZm9ybTtcbiAgfVxuXG4gIC8qKiByZXR1cm5zIHdoZXRoZXIgdGhlIGVuY29kaW5nIGhhcyB2YWx1ZXMgZW1iZWRkZWQgKi9cbiAgcHVibGljIGhhc1ZhbHVlcygpIHtcbiAgICB2YXIgdmFscyA9IHRoaXMuZGF0YSgpLnZhbHVlcztcbiAgICByZXR1cm4gdmFscyAmJiB2YWxzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNwZWMgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWMuY29uZmlnO1xuICB9XG5cbiAgcHVibGljIGF4aXMoY2hhbm5lbDogQ2hhbm5lbCk6IEF4aXMge1xuICAgIGNvbnN0IGF4aXMgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpLmF4aXM7XG5cbiAgICAvLyBUaGlzIGxpbmUgc2hvdWxkIGFjdHVhbGx5IGFsd2F5cyByZXR1cm4gYXhpcyBvYmplY3Qgc2luY2Ugd2UgYWxyZWFkeVxuICAgIC8vIHJlcGxhY2UgYm9vbGVhbiBheGlzIHdpdGggcHJvcGVydGllcy5cbiAgICByZXR1cm4gdHlwZW9mIGF4aXMgIT09ICdib29sZWFuJyA/IGF4aXMgOiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBsZWdlbmQoY2hhbm5lbDogQ2hhbm5lbCk6IExlZ2VuZCB7XG4gICAgY29uc3QgbGVnZW5kID0gdGhpcy5maWVsZERlZihjaGFubmVsKS5sZWdlbmQ7XG5cbiAgICAvLyBUaGlzIGxpbmUgc2hvdWxkIGFjdHVhbGx5IGFsd2F5cyByZXR1cm4gbGVnZW5kIG9iamVjdCBzaW5jZSB3ZSBhbHJlYWR5XG4gICAgLy8gcmVwbGFjZSBib29sZWFuIGxlZ2VuZCB3aXRoIHByb3BlcnRpZXMuXG4gICAgcmV0dXJuIHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyA/IGxlZ2VuZCA6IHt9O1xuICB9XG5cbiAgLyoqIHJldHVybnMgc2NhbGUgbmFtZSBmb3IgYSBnaXZlbiBjaGFubmVsICovXG4gIHB1YmxpYyBzY2FsZU5hbWUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuc3BlYygpLm5hbWU7XG4gICAgcmV0dXJuIChuYW1lID8gbmFtZSArICctJyA6ICcnKSArIGNoYW5uZWw7XG4gIH1cblxuICBwdWJsaWMgc2l6ZVZhbHVlKGNoYW5uZWw6IENoYW5uZWwgPSBTSVpFKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmZpZWxkRGVmKFNJWkUpLnZhbHVlO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5tYXJrKCkpIHtcbiAgICAgIGNhc2UgVEVYVE1BUks6XG4gICAgICAgIHJldHVybiAxMDsgLy8gZm9udCBzaXplIDEwIGJ5IGRlZmF1bHRcbiAgICAgIGNhc2UgQkFSOlxuICAgICAgICAvLyBCQVIncyBzaXplIGlzIGFwcGxpZWQgb24gZWl0aGVyIFggb3IgWVxuICAgICAgICByZXR1cm4gIXRoaXMuaGFzKGNoYW5uZWwpIHx8IHRoaXMuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgP1xuICAgICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIG9yIHNpbmdsZSBiYXIsIHdlIGNhbiB1c2UgYmFuZFdpZHRoIC0gMVxuICAgICAgICAgIC8vICgtMSBzbyB0aGF0IHRoZSBib3JkZXIgb2YgdGhlIGJhciBmYWxscyBvbiBleGFjdCBwaXhlbClcbiAgICAgICAgICB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLmJhbmRXaWR0aCAtIDEgOlxuICAgICAgICAgIC8vIG90aGVyd2lzZSwgc2V0IHRvIDIgYnkgZGVmYXVsdFxuICAgICAgICAgIDI7XG4gICAgICBjYXNlIFRJQ0s6XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLmJhbmRXaWR0aCAvIDEuNTtcbiAgICB9XG4gICAgcmV0dXJuIDMwO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZCwgdHJ1bmNhdGV9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Zm9ybWF0TWl4aW5zfSBmcm9tICcuL3V0aWwnO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvYmxvYi9tYXN0ZXIvZG9jL3NwZWMubWQjMTEtYW1iaWVudC1kZWNsYXJhdGlvbnNcbmRlY2xhcmUgbGV0IGV4cG9ydHM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbClcbiAgfTtcblxuICAvLyBmb3JtYXQgbWl4aW5zIChhZGQgZm9ybWF0IGFuZCBmb3JtYXRUeXBlKVxuICBleHRlbmQoZGVmLCBmb3JtYXRNaXhpbnMobW9kZWwsIGNoYW5uZWwsIG1vZGVsLmF4aXMoY2hhbm5lbCkuZm9ybWF0KSk7XG5cbiAgLy8gMS4yLiBBZGQgcHJvcGVydGllc1xuICBbXG4gICAgLy8gYSkgcHJvcGVydGllcyB3aXRoIHNwZWNpYWwgcnVsZXMgKHNvIGl0IGhhcyBheGlzW3Byb3BlcnR5XSBtZXRob2RzKSAtLSBjYWxsIHJ1bGUgZnVuY3Rpb25zXG4gICAgJ2dyaWQnLCAnbGF5ZXInLCAnb3JpZW50JywgJ3RpY2tTaXplJywgJ3RpY2tzJywgJ3RpdGxlJyxcbiAgICAvLyBiKSBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXMsIG9ubHkgcHJvZHVjZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgc2NoZW1hLCBvciBleHBsaWNpdCB2YWx1ZSBpZiBzcGVjaWZpZWRcbiAgICAnb2Zmc2V0JywgJ3RpY2tQYWRkaW5nJywgJ3RpY2tTaXplJywgJ3RpY2tTaXplTWFqb3InLCAndGlja1NpemVNaW5vcicsICd0aWNrU2l6ZUVuZCcsXG4gICAgJ3RpdGxlT2Zmc2V0JywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBtb2RlbC5maWVsZERlZihjaGFubmVsKS5heGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgW1xuICAgICdheGlzJywgJ2xhYmVscycsIC8vIGhhdmUgc3BlY2lhbCBydWxlc1xuICAgICdncmlkJywgJ3RpdGxlJywgJ3RpY2tzJywgJ21ham9yVGlja3MnLCAnbWlub3JUaWNrcycgLy8gb25seSBkZWZhdWx0IHZhbHVlc1xuICBdLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JpZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgaWYgKGNoYW5uZWwgPT09IFJPVyB8fCBjaGFubmVsID09PSBDT0xVTU4pIHtcbiAgICAvLyBuZXZlciBhcHBseSBncmlkIGZvciBST1cgYW5kIENPTFVNTiBzaW5jZSB3ZSBtYW51YWxseSBjcmVhdGUgcnVsZS1ncm91cCBmb3IgdGhlbVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBncmlkID0gbW9kZWwuYXhpcyhjaGFubmVsKS5ncmlkO1xuICBpZiAoZ3JpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICAvLyBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3Igb3JkaW5hbCBzY2FsZXNcbiAgLy8gdGhhdCBhcmUgbm90IGJpbm5lZFxuICByZXR1cm4gIW1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpICYmICFmaWVsZERlZi5iaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXllcihtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZikge1xuICBjb25zdCBsYXllciA9IG1vZGVsLmF4aXMoY2hhbm5lbCkubGF5ZXI7XG4gIGlmIChsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIGlmIChkZWYuZ3JpZCkge1xuICAgIC8vIGlmIGdyaWQgaXMgdHJ1ZSwgbmVlZCB0byBwdXQgbGF5ZXIgb24gdGhlIGJhY2sgc28gdGhhdCBncmlkIGlzIGJlaGluZCBtYXJrc1xuICAgIHJldHVybiAnYmFjayc7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gb3RoZXJ3aXNlIHJldHVybiB1bmRlZmluZWQgYW5kIHVzZSBWZWdhJ3MgZGVmYXVsdC5cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmllbnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IG9yaWVudCA9IG1vZGVsLmF4aXMoY2hhbm5lbCkub3JpZW50O1xuICBpZiAob3JpZW50KSB7XG4gICAgcmV0dXJuIG9yaWVudDtcbiAgfSBlbHNlIGlmIChjaGFubmVsID09PSBDT0xVTU4pIHtcbiAgICAvLyBGSVhNRSB0ZXN0IGFuZCBkZWNpZGVcbiAgICByZXR1cm4gJ3RvcCc7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gUk9XKSB7XG4gICAgaWYgKG1vZGVsLmhhcyhZKSAmJiBtb2RlbC5heGlzKFkpLm9yaWVudCAhPT0gJ3JpZ2h0Jykge1xuICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja3MgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tzO1xuICBpZiAodGlja3MgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIC8vIEZJWE1FIGRlcGVuZHMgb24gc2NhbGUgdHlwZSB0b29cbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbikge1xuICAgIC8vIFZlZ2EncyBkZWZhdWx0IHRpY2tzIG9mdGVuIGxlYWQgdG8gYSBsb3Qgb2YgbGFiZWwgb2NjbHVzaW9uIG9uIFggd2l0aG91dCA5MCBkZWdyZWUgcm90YXRpb25cbiAgICByZXR1cm4gNTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrU2l6ZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja1NpemUgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tTaXplO1xuICBpZiAodGlja1NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrU2l6ZTtcbiAgfVxuICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcbiAgaWYgKGF4aXMudGl0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBheGlzLnRpdGxlO1xuICB9XG5cbiAgLy8gaWYgbm90IGRlZmluZWQsIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lIGF4aXMgdGl0bGUgZnJvbSBmaWVsZCBkZWZcbiAgY29uc3QgZmllbGRUaXRsZSA9IG1vZGVsLmZpZWxkVGl0bGUoY2hhbm5lbCk7XG4gIGNvbnN0IGxheW91dCA9IG1vZGVsLmxheW91dCgpO1xuICBjb25zdCBjZWxsV2lkdGggPSBsYXlvdXQuY2VsbFdpZHRoO1xuICBjb25zdCBjZWxsSGVpZ2h0ID0gbGF5b3V0LmNlbGxIZWlnaHQ7XG5cbiAgbGV0IG1heExlbmd0aDtcbiAgaWYgKGF4aXMudGl0bGVNYXhMZW5ndGgpIHtcbiAgICBtYXhMZW5ndGggPSBheGlzLnRpdGxlTWF4TGVuZ3RoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFggJiYgdHlwZW9mIGNlbGxXaWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBHdWVzcyBtYXggbGVuZ3RoIGlmIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZVxuICAgIG1heExlbmd0aCA9IGNlbGxXaWR0aCAvIG1vZGVsLmF4aXMoWCkuY2hhcmFjdGVyV2lkdGg7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWSAmJiB0eXBlb2YgY2VsbEhlaWdodCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBHdWVzcyBtYXggbGVuZ3RoIGlmIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZVxuICAgIG1heExlbmd0aCA9IGNlbGxIZWlnaHQgLyBtb2RlbC5heGlzKFkpLmNoYXJhY3RlcldpZHRoO1xuICB9XG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMpIHtcbiAgICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgICAgLy8gaGlkZSBheGlzIGZvciBmYWNldHNcbiAgICAgIHJldHVybiBleHRlbmQoe1xuICAgICAgICBvcGFjaXR5OiB7dmFsdWU6IDB9XG4gICAgICB9LCBheGlzUHJvcHNTcGVjIHx8IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIGF4aXNQcm9wc1NwZWMgfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGxhYmVsc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICBpZiAoIWF4aXMubGFiZWxzKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIGlmIChjb250YWlucyhbTk9NSU5BTCwgT1JESU5BTF0sIGZpZWxkRGVmLnR5cGUpICYmIGF4aXMubGFiZWxNYXhMZW5ndGgpIHtcbiAgICAgIC8vIFRPRE8gcmVwbGFjZSB0aGlzIHdpdGggVmVnYSdzIGxhYmVsTWF4TGVuZ3RoIG9uY2UgaXQgaXMgaW50cm9kdWNlZFxuICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJ3t7IGRhdHVtLmRhdGEgfCB0cnVuY2F0ZTonICsgYXhpcy5sYWJlbE1heExlbmd0aCArICd9fSdcbiAgICAgICAgfVxuICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgfVxuXG4gICAgIC8vIGZvciB4LWF4aXMsIHNldCB0aWNrcyBmb3IgUSBvciByb3RhdGUgc2NhbGUgZm9yIG9yZGluYWwgc2NhbGVcbiAgICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICAgIGNhc2UgWDpcbiAgICAgICAgaWYgKG1vZGVsLmlzRGltZW5zaW9uKFgpIHx8IGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgICBhbmdsZToge3ZhbHVlOiAyNzB9LFxuICAgICAgICAgICAgYWxpZ246IHt2YWx1ZTogZGVmLm9yaWVudCA9PT0gJ3RvcCcgPyAnbGVmdCc6ICdyaWdodCd9LFxuICAgICAgICAgICAgYmFzZWxpbmU6IHt2YWx1ZTogJ21pZGRsZSd9XG4gICAgICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJPVzpcbiAgICAgICAgaWYgKGRlZi5vcmllbnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICAgIGFuZ2xlOiB7dmFsdWU6IDkwfSxcbiAgICAgICAgICAgIGFsaWduOiB7dmFsdWU6ICdjZW50ZXInfSxcbiAgICAgICAgICAgIGJhc2VsaW5lOiB7dmFsdWU6ICdib3R0b20nfVxuICAgICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVsc1NwZWMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBmb3IgY29tcGlsaW5nIFZlZ2EtbGl0ZSBzcGVjIGludG8gVmVnYSBzcGVjLlxuICovXG5pbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcblxuaW1wb3J0IHtjb21waWxlQXhpc30gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7Y29tcGlsZURhdGF9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge2ZhY2V0TWl4aW5zfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7Y29tcGlsZUxlZ2VuZHN9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7Y29tcGlsZU1hcmt9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2NvbXBpbGVTY2FsZXN9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXN9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZfSBmcm9tICcuLi9jaGFubmVsJztcblxuZXhwb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKHNwZWMpIHtcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoc3BlYyk7XG4gIGNvbnN0IGxheW91dCA9IG1vZGVsLmxheW91dCgpO1xuXG4gIC8vIEZJWE1FIHJlcGxhY2UgRklUIHdpdGggYXBwcm9wcmlhdGUgbWVjaGFuaXNtIG9uY2UgVmVnYSBoYXMgaXRcbiAgY29uc3QgRklUID0gMTtcblxuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAvLyBUT0RPOiBjaGFuZ2UgdHlwZSB0byBiZWNvbWUgVmdTcGVjXG4gIGNvbnN0IG91dHB1dCA9IGV4dGVuZChcbiAgICBzcGVjLm5hbWUgPyB7IG5hbWU6IHNwZWMubmFtZSB9IDoge30sXG4gICAge1xuICAgICAgd2lkdGg6IHR5cGVvZiBsYXlvdXQud2lkdGggIT09ICdudW1iZXInID8gRklUIDogbGF5b3V0LndpZHRoLFxuICAgICAgaGVpZ2h0OiB0eXBlb2YgbGF5b3V0LmhlaWdodCAhPT0gJ251bWJlcicgPyBGSVQgOiBsYXlvdXQuaGVpZ2h0LFxuICAgICAgcGFkZGluZzogJ2F1dG8nXG4gICAgfSxcbiAgICBjb25maWcudmlld3BvcnQgPyB7IHZpZXdwb3J0OiBjb25maWcudmlld3BvcnQgfSA6IHt9LFxuICAgIGNvbmZpZy5iYWNrZ3JvdW5kID8geyBiYWNrZ3JvdW5kOiBjb25maWcuYmFja2dyb3VuZCB9IDoge30sXG4gICAga2V5cyhjb25maWcuc2NlbmUpLmxlbmd0aCA+IDAgPyBzY2VuZShjb25maWcpIDoge30sXG4gICAge1xuICAgICAgZGF0YTogY29tcGlsZURhdGEobW9kZWwpLFxuICAgICAgbWFya3M6IFtjb21waWxlUm9vdEdyb3VwKG1vZGVsKV1cbiAgICB9KTtcblxuICByZXR1cm4ge1xuICAgIHNwZWM6IG91dHB1dFxuICAgIC8vIFRPRE86IGFkZCB3YXJuaW5nIC8gZXJyb3JzIGhlcmVcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2NlbmUoY29uZmlnKSB7XG4gIHJldHVybiBbJ2ZpbGwnLCAnZmlsbE9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZVdpZHRoJyxcbiAgICAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnXS5cbiAgICAgIHJlZHVjZShmdW5jdGlvbih0b3BMZXZlbENvbmZpZzogYW55LCBwcm9wZXJ0eSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBjb25maWcuc2NlbmVbcHJvcGVydHldO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG9wTGV2ZWxDb25maWcuc2NlbmUgPSB0b3BMZXZlbENvbmZpZy5zY2VuZSB8fCB7fTtcbiAgICAgICAgdG9wTGV2ZWxDb25maWcuc2NlbmVbcHJvcGVydHldID0ge3ZhbHVlOiB2YWx1ZX07XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9wTGV2ZWxDb25maWc7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVSb290R3JvdXAobW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IHNwZWMgPSBtb2RlbC5zcGVjKCk7XG4gIGNvbnN0IHdpZHRoID0gbW9kZWwubGF5b3V0KCkud2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IG1vZGVsLmxheW91dCgpLmhlaWdodDtcblxuICBsZXQgcm9vdEdyb3VwOmFueSA9IGV4dGVuZCh7XG4gICAgICBuYW1lOiBzcGVjLm5hbWUgPyBzcGVjLm5hbWUgKyAnLXJvb3QnIDogJ3Jvb3QnLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICB9LFxuICAgIHNwZWMuZGVzY3JpcHRpb24gPyB7ZGVzY3JpcHRpb246IHNwZWMuZGVzY3JpcHRpb259IDoge30sXG4gICAge1xuICAgICAgZnJvbToge2RhdGE6IExBWU9VVH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB0eXBlb2Ygd2lkdGggIT09ICdudW1iZXInID9cbiAgICAgICAgICAgICAgICAge2ZpZWxkOiB3aWR0aC5maWVsZH0gOlxuICAgICAgICAgICAgICAgICB7dmFsdWU6IHdpZHRofSxcbiAgICAgICAgICBoZWlnaHQ6IHR5cGVvZiBoZWlnaHQgIT09ICdudW1iZXInID9cbiAgICAgICAgICAgICAgICAgIHtmaWVsZDogaGVpZ2h0LmZpZWxkfSA6XG4gICAgICAgICAgICAgICAgICB7dmFsdWU6IGhlaWdodH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gIGNvbnN0IG1hcmtzID0gY29tcGlsZU1hcmsobW9kZWwpO1xuXG4gIC8vIFNtYWxsIE11bHRpcGxlc1xuICBpZiAobW9kZWwuaGFzKFJPVykgfHwgbW9kZWwuaGFzKENPTFVNTikpIHtcbiAgICAvLyBwdXQgdGhlIG1hcmtzIGluc2lkZSBhIGZhY2V0IGNlbGwncyBncm91cFxuICAgIGV4dGVuZChyb290R3JvdXAsIGZhY2V0TWl4aW5zKG1vZGVsLCBtYXJrcykpO1xuICB9IGVsc2Uge1xuICAgIHJvb3RHcm91cC5tYXJrcyA9IG1hcmtzO1xuICAgIHJvb3RHcm91cC5zY2FsZXMgPSBjb21waWxlU2NhbGVzKG1vZGVsLmNoYW5uZWxzKCksIG1vZGVsKTtcblxuICAgIHZhciBheGVzID0gKG1vZGVsLmhhcyhYKSAmJiBtb2RlbC5maWVsZERlZihYKS5heGlzID8gW2NvbXBpbGVBeGlzKFgsIG1vZGVsKV0gOiBbXSlcbiAgICAgIC5jb25jYXQobW9kZWwuaGFzKFkpICYmIG1vZGVsLmZpZWxkRGVmKFkpLmF4aXMgPyBbY29tcGlsZUF4aXMoWSwgbW9kZWwpXSA6IFtdKTtcbiAgICBpZiAoYXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICByb290R3JvdXAuYXhlcyA9IGF4ZXM7XG4gICAgfVxuICB9XG5cbiAgLy8gbGVnZW5kcyAoc2ltaWxhciBmb3IgZWl0aGVyIGZhY2V0cyBvciBub24tZmFjZXRzXG4gIHZhciBsZWdlbmRzID0gY29tcGlsZUxlZ2VuZHMobW9kZWwpO1xuICBpZiAobGVnZW5kcy5sZW5ndGggPiAwKSB7XG4gICAgcm9vdEdyb3VwLmxlZ2VuZHMgPSBsZWdlbmRzO1xuICB9XG4gIHJldHVybiByb290R3JvdXA7XG59XG4iLCJpbXBvcnQge1NwZWN9IGZyb20gJy4uL3NjaGVtYS9zY2hlbWEnO1xuaW1wb3J0IHtTdGFja1Byb3BlcnRpZXN9IGZyb20gJy4vc3RhY2snO1xuXG5pbXBvcnQge1gsIFksIERFVEFJTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2lzQWdncmVnYXRlLCBoYXN9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7aXNNZWFzdXJlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1BPSU5ULCBUSUNLLCBDSVJDTEUsIFNRVUFSRX0gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIEF1Z21lbnQgY29uZmlnLm1hcmsgd2l0aCBydWxlLWJhc2VkIGRlZmF1bHQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU1hcmtDb25maWcoc3BlYzogU3BlYywgc3RhY2s6IFN0YWNrUHJvcGVydGllcykge1xuICAgcmV0dXJuIGV4dGVuZChcbiAgICAgWydmaWxsZWQnLCAnb3BhY2l0eScsICdvcmllbnQnLCAnYWxpZ24nXS5yZWR1Y2UoZnVuY3Rpb24oY2ZnLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgICAgY29uc3QgdmFsdWUgPSBzcGVjLmNvbmZpZy5tYXJrW3Byb3BlcnR5XTtcbiAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICBjYXNlICdmaWxsZWQnOlxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgIC8vIG9ubHkgcG9pbnQgaXMgbm90IGZpbGxlZCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IHNwZWMubWFyayAhPT0gUE9JTlQ7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgY29udGFpbnMoW1BPSU5ULCBUSUNLLCBDSVJDTEUsIFNRVUFSRV0sIHNwZWMubWFyaykpIHtcbiAgICAgICAgICAgICAvLyBwb2ludC1iYXNlZCBtYXJrcyBhbmQgYmFyXG4gICAgICAgICAgICAgaWYgKCFpc0FnZ3JlZ2F0ZShzcGVjLmVuY29kaW5nKSB8fCBoYXMoc3BlYy5lbmNvZGluZywgREVUQUlMKSkge1xuICAgICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IDAuNztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcmllbnQnOlxuICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAvLyBGb3Igc3RhY2tlZCBjaGFydCwgZXhwbGljaXRseSBzcGVjaWZpZWQgb3JpZW50IHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gc3RhY2suZ3JvdXBieUNoYW5uZWwgPT09IFkgPyAnaG9yaXpvbnRhbCcgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gaXNNZWFzdXJlKHNwZWMuZW5jb2RpbmdbWF0pICYmICAhaXNNZWFzdXJlKHNwZWMuZW5jb2RpbmdbWV0pID9cbiAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgaWYgWCBpcyBtZWFzdXJlIGFuZCBZIGlzIGRpbWVuc2lvbiBvciB1bnNwZWNpZmllZFxuICAgICAgICAgICAgICAgJ2hvcml6b250YWwnIDpcbiAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsICh1bmRlZmluZWQpIG90aGVyd2lzZS4gIFRoaXMgaW5jbHVkZXMgd2hlblxuICAgICAgICAgICAgICAgLy8gLSBZIGlzIG1lYXN1cmUgYW5kIFggaXMgZGltZW5zaW9uIG9yIHVuc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAvLyAtIGJvdGggWCBhbmQgWSBhcmUgbWVhc3VyZXMgb3IgYm90aCBhcmUgZGltZW5zaW9uXG4gICAgICAgICAgICAgICB1bmRlZmluZWQ7ICAvL1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgLy8gdGV4dC1vbmx5XG4gICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBoYXMoc3BlYy5lbmNvZGluZywgWCkgPyAnY2VudGVyJyA6ICdyaWdodCc7XG4gICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgICByZXR1cm4gY2ZnO1xuICAgICB9LCB7fSksXG4gICAgIHNwZWMuY29uZmlnLm1hcmtcbiAgICk7XG59XG4iLCJpbXBvcnQgKiBhcyB2bEZpZWxkRGVmIGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCB2YWxzLCByZWR1Y2V9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9zY2hlbWEvZmllbGRkZWYuc2NoZW1hJztcbmltcG9ydCB7U3RhY2tQcm9wZXJ0aWVzfSBmcm9tICcuL3N0YWNrJztcblxuaW1wb3J0IHthdXRvTWF4Qmluc30gZnJvbSAnLi4vYmluJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgWSwgUk9XLCBDT0xVTU59IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTT1VSQ0UsIFNUQUNLRURfU0NBTEUsIExBWU9VVCwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHt0eXBlIGFzIHNjYWxlVHlwZX0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge3BhcnNlRXhwcmVzc2lvbiwgcmF3RG9tYWlufSBmcm9tICcuL3RpbWUnO1xuXG5jb25zdCBERUZBVUxUX05VTExfRklMVEVSUyA9IHtcbiAgbm9taW5hbDogZmFsc2UsXG4gIG9yZGluYWw6IGZhbHNlLFxuICBxdWFudGl0YXRpdmU6IHRydWUsXG4gIHRlbXBvcmFsOiB0cnVlXG59O1xuXG4vKipcbiAqIENyZWF0ZSBWZWdhJ3MgZGF0YSBhcnJheSBmcm9tIGEgZ2l2ZW4gbW9kZWwuXG4gKlxuICogQHBhcmFtICBtb2RlbFxuICogQHJldHVybiBBcnJheSBvZiBWZWdhIGRhdGEuXG4gKiAgICAgICAgICAgICAgICAgVGhpcyBhbHdheXMgaW5jbHVkZXMgYSBcInNvdXJjZVwiIGRhdGEgdGFibGUuXG4gKiAgICAgICAgICAgICAgICAgSWYgdGhlIG1vZGVsIGNvbnRhaW5zIGFnZ3JlZ2F0ZSB2YWx1ZSwgdGhpcyB3aWxsIGFsc28gY3JlYXRlXG4gKiAgICAgICAgICAgICAgICAgYWdncmVnYXRlIHRhYmxlIGFzIHdlbGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlRGF0YShtb2RlbDogTW9kZWwpOiBWZ0RhdGFbXSB7XG4gIGNvbnN0IGRlZiA9IFtzb3VyY2UuZGVmKG1vZGVsKV07XG5cbiAgY29uc3Qgc3VtbWFyeURlZiA9IHN1bW1hcnkuZGVmKG1vZGVsKTtcbiAgaWYgKHN1bW1hcnlEZWYpIHtcbiAgICBkZWYucHVzaChzdW1tYXJ5RGVmKTtcbiAgfVxuXG4gIC8vIGFwcGVuZCBub24tcG9zaXRpdmUgZmlsdGVyIGF0IHRoZSBlbmQgZm9yIHRoZSBkYXRhIHRhYmxlXG4gIGZpbHRlck5vblBvc2l0aXZlRm9yTG9nKGRlZltkZWYubGVuZ3RoIC0gMV0sIG1vZGVsKTtcblxuICAvLyBhZGQgc3RhdHMgZm9yIGxheW91dCBjYWxjdWxhdGlvblxuICBjb25zdCBsYXlvdXREZWYgPSBsYXlvdXQuZGVmKG1vZGVsKTtcbiAgaWYobGF5b3V0RGVmKSB7XG4gICAgZGVmLnB1c2gobGF5b3V0RGVmKTtcbiAgfVxuXG4gIC8vIFN0YWNrXG4gIGNvbnN0IHN0YWNrRGVmID0gbW9kZWwuc3RhY2soKTtcbiAgaWYgKHN0YWNrRGVmKSB7XG4gICAgZGVmLnB1c2goc3RhY2suZGVmKG1vZGVsLCBzdGFja0RlZikpO1xuICB9XG5cbiAgcmV0dXJuIGRlZi5jb25jYXQoXG4gICAgZGF0ZXMuZGVmcyhtb2RlbCkgLy8gVGltZSBkb21haW4gdGFibGVzXG4gICk7XG59XG5cbi8vIFRPRE86IENvbnNvbGlkYXRlIGFsbCBWZWdhIGludGVyZmFjZXNcbmludGVyZmFjZSBWZ0RhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgdmFsdWVzPzogYW55O1xuICBmb3JtYXQ/OiBhbnk7XG4gIHVybD86IGFueTtcbiAgdHJhbnNmb3JtPzogYW55O1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHNvdXJjZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBkZWYobW9kZWw6IE1vZGVsKTogVmdEYXRhIHtcbiAgICB2YXIgc291cmNlOlZnRGF0YSA9IHtuYW1lOiBTT1VSQ0V9O1xuXG4gICAgLy8gRGF0YSBzb3VyY2UgKHVybCBvciBpbmxpbmUpXG4gICAgaWYgKG1vZGVsLmhhc1ZhbHVlcygpKSB7XG4gICAgICBzb3VyY2UudmFsdWVzID0gbW9kZWwuZGF0YSgpLnZhbHVlcztcbiAgICAgIHNvdXJjZS5mb3JtYXQgPSB7dHlwZTogJ2pzb24nfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291cmNlLnVybCA9IG1vZGVsLmRhdGEoKS51cmw7XG4gICAgICBzb3VyY2UuZm9ybWF0ID0ge3R5cGU6IG1vZGVsLmRhdGEoKS5mb3JtYXRUeXBlfTtcbiAgICB9XG5cbiAgICAvLyBTZXQgZGF0YSdzIGZvcm1hdC5wYXJzZSBpZiBuZWVkZWRcbiAgICB2YXIgcGFyc2UgPSBmb3JtYXRQYXJzZShtb2RlbCk7XG4gICAgaWYgKHBhcnNlKSB7XG4gICAgICBzb3VyY2UuZm9ybWF0LnBhcnNlID0gcGFyc2U7XG4gICAgfVxuXG4gICAgc291cmNlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybShtb2RlbCk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFBhcnNlKG1vZGVsOiBNb2RlbCkge1xuICAgIGNvbnN0IGNhbGNGaWVsZE1hcCA9IChtb2RlbC50cmFuc2Zvcm0oKS5jYWxjdWxhdGUgfHwgW10pLnJlZHVjZShmdW5jdGlvbihmaWVsZE1hcCwgZm9ybXVsYSkge1xuICAgICAgZmllbGRNYXBbZm9ybXVsYS5maWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZpZWxkTWFwO1xuICAgIH0sIHt9KTtcblxuICAgIGxldCBwYXJzZTtcbiAgICAvLyB1c2UgZm9yRWFjaCByYXRoZXIgdGhhbiByZWR1Y2Ugc28gdGhhdCBpdCBjYW4gcmV0dXJuIHVuZGVmaW5lZFxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIHBhcnNlIG5lZWRlZFxuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICAgICAgcGFyc2UgPSBwYXJzZSB8fCB7fTtcbiAgICAgICAgcGFyc2VbZmllbGREZWYuZmllbGRdID0gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgaWYgKHZsRmllbGREZWYuaXNDb3VudChmaWVsZERlZikgfHwgY2FsY0ZpZWxkTWFwW2ZpZWxkRGVmLmZpZWxkXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZSA9IHBhcnNlIHx8IHt9O1xuICAgICAgICBwYXJzZVtmaWVsZERlZi5maWVsZF0gPSAnbnVtYmVyJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2U7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgVmVnYSB0cmFuc2Zvcm1zIGZvciB0aGUgc291cmNlIGRhdGEgdGFibGUuICBUaGlzIGNhbiBpbmNsdWRlXG4gICAqIHRyYW5zZm9ybXMgZm9yIHRpbWUgdW5pdCwgYmlubmluZyBhbmQgZmlsdGVyaW5nLlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBudWxsIGZpbHRlciBjb21lcyBmaXJzdCBzbyB0cmFuc2Zvcm1zIGFyZSBub3QgcGVyZm9ybWVkIG9uIG51bGwgdmFsdWVzXG4gICAgLy8gdGltZSBhbmQgYmluIHNob3VsZCBjb21lIGJlZm9yZSBmaWx0ZXIgc28gd2UgY2FuIGZpbHRlciBieSB0aW1lIGFuZCBiaW5cbiAgICByZXR1cm4gbnVsbEZpbHRlclRyYW5zZm9ybShtb2RlbCkuY29uY2F0KFxuICAgICAgZm9ybXVsYVRyYW5zZm9ybShtb2RlbCksXG4gICAgICBmaWx0ZXJUcmFuc2Zvcm0obW9kZWwpLFxuICAgICAgYmluVHJhbnNmb3JtKG1vZGVsKSxcbiAgICAgIHRpbWVUcmFuc2Zvcm0obW9kZWwpXG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aW1lVHJhbnNmb3JtKG1vZGVsOiBNb2RlbCkge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24odHJhbnNmb3JtLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHJlZiA9IGZpZWxkKGZpZWxkRGVmLCB7IG5vZm46IHRydWUsIGRhdHVtOiB0cnVlIH0pO1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKSxcbiAgICAgICAgICBleHByOiBwYXJzZUV4cHJlc3Npb24oZmllbGREZWYudGltZVVuaXQsIHJlZilcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBiaW5UcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0cmFuc2Zvcm0sIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgYmluID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuYmluO1xuICAgICAgaWYgKGJpbikge1xuICAgICAgICBsZXQgYmluVHJhbnMgPSBleHRlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ2JpbicsXG4gICAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGQsXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX3N0YXJ0J30pLFxuICAgICAgICAgICAgICBtaWQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KSxcbiAgICAgICAgICAgICAgZW5kOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19lbmQnfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIGlmIGJpbiBpcyBhbiBvYmplY3QsIGxvYWQgcGFyYW1ldGVyIGhlcmUhXG4gICAgICAgICAgdHlwZW9mIGJpbiA9PT0gJ2Jvb2xlYW4nID8ge30gOiBiaW5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWJpblRyYW5zLm1heGJpbnMgJiYgIWJpblRyYW5zLnN0ZXApIHtcbiAgICAgICAgICAvLyBpZiBib3RoIG1heGJpbnMgYW5kIHN0ZXAgYXJlIHNwZWNpZmllZCwgbmVlZCB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBiaW5cbiAgICAgICAgICBiaW5UcmFucy5tYXhiaW5zID0gYXV0b01heEJpbnMoY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2Zvcm0ucHVzaChiaW5UcmFucyk7XG4gICAgICAgIGlmIChzY2FsZVR5cGUoZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSkgPT09ICdvcmRpbmFsJykge1xuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KSxcbiAgICAgICAgICAgIGV4cHI6IGZpZWxkKGZpZWxkRGVmLCB7ZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19zdGFydCd9KSArXG4gICAgICAgICAgICAgICAgICAnKyBcXCctXFwnICsnICtcbiAgICAgICAgICAgICAgICAgIGZpZWxkKGZpZWxkRGVmLCB7ZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19lbmQnfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBBbiBhcnJheSB0aGF0IG1pZ2h0IGNvbnRhaW4gYSBmaWx0ZXIgdHJhbnNmb3JtIGZvciBmaWx0ZXJpbmcgbnVsbCB2YWx1ZSBiYXNlZCBvbiBmaWx0ZXJOdWwgY29uZmlnXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gbnVsbEZpbHRlclRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgICBjb25zdCBmaWx0ZXJOdWxsID0gbW9kZWwudHJhbnNmb3JtKCkuZmlsdGVyTnVsbDtcbiAgICBjb25zdCBmaWx0ZXJlZEZpZWxkcyA9IGtleXMobW9kZWwucmVkdWNlKGZ1bmN0aW9uKGFnZ3JlZ2F0b3IsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgICAgaWYgKGZpbHRlck51bGwgfHxcbiAgICAgICAgKGZpbHRlck51bGwgPT09IHVuZGVmaW5lZCAmJiBmaWVsZERlZi5maWVsZCAmJiBmaWVsZERlZi5maWVsZCAhPT0gJyonICYmIERFRkFVTFRfTlVMTF9GSUxURVJTW2ZpZWxkRGVmLnR5cGVdKSkge1xuICAgICAgICBhZ2dyZWdhdG9yW2ZpZWxkRGVmLmZpZWxkXSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICB9LCB7fSkpO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkRmllbGRzLmxlbmd0aCA+IDAgP1xuICAgICAgW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlcmVkRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJ2RhdHVtLicgKyBmaWVsZE5hbWUgKyAnIT09bnVsbCc7XG4gICAgICAgIH0pLmpvaW4oJyAmJiAnKVxuICAgICAgfV0gOiBbXTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJUcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gICAgdmFyIGZpbHRlciA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlcjtcbiAgICByZXR1cm4gZmlsdGVyID8gW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlclxuICAgIH1dIDogW107XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZm9ybXVsYVRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgICByZXR1cm4gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKHRyYW5zZm9ybSwgZm9ybXVsYSkge1xuICAgICAgdHJhbnNmb3JtLnB1c2goZXh0ZW5kKHt0eXBlOiAnZm9ybXVsYSd9LCBmb3JtdWxhKSk7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGxheW91dCB7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGRlZihtb2RlbDogTW9kZWwpOiBWZ0RhdGEge1xuICAgIGxldCBzdW1tYXJpemUgPSBbXTtcbiAgICBsZXQgZm9ybXVsYXMgPSBbXTtcblxuICAgIC8vIFRPRE86IGhhbmRsZSBcImZpdFwiIG1vZGVcbiAgICBpZiAobW9kZWwuaGFzKFgpICYmIG1vZGVsLmlzT3JkaW5hbFNjYWxlKFgpKSB7XG4gICAgICBjb25zdCB4U2NhbGUgPSBtb2RlbC5maWVsZERlZihYKS5zY2FsZTtcbiAgICAgIGNvbnN0IHhIYXNEb21haW4gPSB4U2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXk7XG4gICAgICBpZiAoIXhIYXNEb21haW4pIHtcbiAgICAgICAgc3VtbWFyaXplLnB1c2goe1xuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKSxcbiAgICAgICAgICBvcHM6IFsnZGlzdGluY3QnXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHhDYXJkaW5hbGl0eSA9IHhIYXNEb21haW4gPyB4U2NhbGUuZG9tYWluLmxlbmd0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmZpZWxkKFgsIHtkYXR1bTogdHJ1ZSwgcHJlZm46ICdkaXN0aW5jdF8nfSk7XG4gICAgICBmb3JtdWxhcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICBmaWVsZDogJ2NlbGxXaWR0aCcsXG4gICAgICAgIGV4cHI6ICcoJyArIHhDYXJkaW5hbGl0eSArICcgKyAnICsgeFNjYWxlLnBhZGRpbmcgKyAnKSAqICcgKyB4U2NhbGUuYmFuZFdpZHRoXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwuaGFzKFkpICYmIG1vZGVsLmlzT3JkaW5hbFNjYWxlKFkpKSB7XG4gICAgICBjb25zdCB5U2NhbGUgPSBtb2RlbC5maWVsZERlZihZKS5zY2FsZTtcbiAgICAgIGNvbnN0IHlIYXNEb21haW4gPSB5U2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICAgIGlmICgheUhhc0RvbWFpbikge1xuICAgICAgICBzdW1tYXJpemUucHVzaCh7XG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpLFxuICAgICAgICAgIG9wczogWydkaXN0aW5jdCddXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB5Q2FyZGluYWxpdHkgPSB5SGFzRG9tYWluID8geVNjYWxlLmRvbWFpbi5sZW5ndGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5maWVsZChZLCB7ZGF0dW06IHRydWUsIHByZWZuOiAnZGlzdGluY3RfJ30pO1xuICAgICAgZm9ybXVsYXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgZmllbGQ6ICdjZWxsSGVpZ2h0JyxcbiAgICAgICAgZXhwcjogJygnICsgeUNhcmRpbmFsaXR5ICsgJyArICcgKyB5U2NhbGUucGFkZGluZyArICcpICogJyArIHlTY2FsZS5iYW5kV2lkdGhcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGxheW91dCA9IG1vZGVsLmxheW91dCgpO1xuXG4gICAgaWYgKG1vZGVsLmhhcyhDT0xVTU4pKSB7XG4gICAgICBjb25zdCBsYXlvdXRDZWxsV2lkdGggPSBsYXlvdXQuY2VsbFdpZHRoO1xuICAgICAgY29uc3QgY2VsbFdpZHRoID0gdHlwZW9mIGxheW91dENlbGxXaWR0aCAhPT0gJ251bWJlcicgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdHVtLicgKyBsYXlvdXRDZWxsV2lkdGguZmllbGQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2VsbFdpZHRoO1xuICAgICAgY29uc3QgY29sU2NhbGUgPSBtb2RlbC5maWVsZERlZihDT0xVTU4pLnNjYWxlO1xuICAgICAgY29uc3QgY29sSGFzRG9tYWluID0gY29sU2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXk7XG4gICAgICBpZiAoIWNvbEhhc0RvbWFpbikge1xuICAgICAgICBzdW1tYXJpemUucHVzaCh7XG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgb3BzOiBbJ2Rpc3RpbmN0J11cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbENhcmRpbmFsaXR5ID0gY29sSGFzRG9tYWluID8gY29sU2NhbGUuZG9tYWluLmxlbmd0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmllbGQoQ09MVU1OLCB7ZGF0dW06IHRydWUsIHByZWZuOiAnZGlzdGluY3RfJ30pO1xuICAgICAgZm9ybXVsYXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgZmllbGQ6ICd3aWR0aCcsXG4gICAgICAgIGV4cHI6ICcoJyArIGNlbGxXaWR0aCArICcgKyAnICsgY29sU2NhbGUucGFkZGluZyArICcpJyArICcgKiAnICsgY29sQ2FyZGluYWxpdHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChtb2RlbC5oYXMoUk9XKSkge1xuICAgICAgY29uc3QgbGF5b3V0Q2VsbEhlaWdodCA9IGxheW91dC5jZWxsSGVpZ2h0O1xuICAgICAgY29uc3QgY2VsbEhlaWdodCA9IHR5cGVvZiBsYXlvdXRDZWxsSGVpZ2h0ICE9PSAnbnVtYmVyJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0dW0uJyArIGxheW91dENlbGxIZWlnaHQuZmllbGQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2VsbEhlaWdodDtcbiAgICAgIGNvbnN0IHJvd1NjYWxlID0gbW9kZWwuZmllbGREZWYoUk9XKS5zY2FsZTtcbiAgICAgIGNvbnN0IHJvd0hhc0RvbWFpbiA9IHJvd1NjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5O1xuICAgICAgaWYgKCFyb3dIYXNEb21haW4pIHtcbiAgICAgICAgc3VtbWFyaXplLnB1c2goe1xuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgICAgIG9wczogWydkaXN0aW5jdCddXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByb3dDYXJkaW5hbGl0eSA9IHJvd0hhc0RvbWFpbiA/IHJvd1NjYWxlLmRvbWFpbi5sZW5ndGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmZpZWxkKFJPVywge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcbiAgICAgIGZvcm11bGFzLnB1c2goe1xuICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgIGZpZWxkOiAnaGVpZ2h0JyxcbiAgICAgICAgZXhwcjogJygnICsgY2VsbEhlaWdodCArICcrJyArIHJvd1NjYWxlLnBhZGRpbmcgKyAnKScgKyAnICogJyArIHJvd0NhcmRpbmFsaXR5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybXVsYXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHN1bW1hcml6ZS5sZW5ndGggPiAwID8ge1xuICAgICAgICBuYW1lOiBMQVlPVVQsXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgc3VtbWFyaXplOiBzdW1tYXJpemVcbiAgICAgICAgICB9XS5jb25jYXQoZm9ybXVsYXMpXG4gICAgICB9IDoge1xuICAgICAgICBuYW1lOiBMQVlPVVQsXG4gICAgICAgIHZhbHVlczogW3t9XSxcbiAgICAgICAgdHJhbnNmb3JtOiBmb3JtdWxhc1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBzdW1tYXJ5IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGRlZihtb2RlbDogTW9kZWwpOlZnRGF0YSB7XG4gICAgLyogZGljdCBzZXQgZm9yIGRpbWVuc2lvbnMgKi9cbiAgICB2YXIgZGltcyA9IHt9O1xuXG4gICAgLyogZGljdGlvbmFyeSBtYXBwaW5nIGZpZWxkIG5hbWUgPT4gZGljdCBzZXQgb2YgYWdncmVnYXRpb24gZnVuY3Rpb25zICovXG4gICAgdmFyIG1lYXMgPSB7fTtcblxuICAgIHZhciBoYXNBZ2dyZWdhdGUgPSBmYWxzZTtcblxuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgICAgIGhhc0FnZ3JlZ2F0ZSA9IHRydWU7XG4gICAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUgPT09ICdjb3VudCcpIHtcbiAgICAgICAgICBtZWFzWycqJ10gPSBtZWFzWycqJ10gfHwge307XG4gICAgICAgICAgbWVhc1snKiddLmNvdW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXSA9IG1lYXNbZmllbGREZWYuZmllbGRdIHx8IHt9O1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdW2ZpZWxkRGVmLmFnZ3JlZ2F0ZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19zdGFydCd9KV0gPSBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19zdGFydCd9KTtcbiAgICAgICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KV0gPSBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19taWQnfSk7XG4gICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19lbmQnfSldID0gZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfZW5kJ30pO1xuXG4gICAgICAgICAgaWYgKHNjYWxlVHlwZShmaWVsZERlZiwgY2hhbm5lbCwgbW9kZWwubWFyaygpKSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICAgICAgICAvLyBhbHNvIHByb2R1Y2UgYmluX3JhbmdlIGlmIHRoZSBiaW5uZWQgZmllbGQgdXNlIG9yZGluYWwgc2NhbGVcbiAgICAgICAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfcmFuZ2UnfSldID0gZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfcmFuZ2UnfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpbXNbZmllbGQoZmllbGREZWYpXSA9IGZpZWxkKGZpZWxkRGVmKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGdyb3VwYnkgPSB2YWxzKGRpbXMpO1xuXG4gICAgLy8gc2hvcnQtZm9ybWF0IHN1bW1hcml6ZSBvYmplY3QgZm9yIFZlZ2EncyBhZ2dyZWdhdGUgdHJhbnNmb3JtXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS93aWtpL0RhdGEtVHJhbnNmb3JtcyMtYWdncmVnYXRlXG4gICAgdmFyIHN1bW1hcml6ZSA9IHJlZHVjZShtZWFzLCBmdW5jdGlvbihhZ2dyZWdhdG9yLCBmbkRpY3RTZXQsIGZpZWxkKSB7XG4gICAgICBhZ2dyZWdhdG9yW2ZpZWxkXSA9IGtleXMoZm5EaWN0U2V0KTtcbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIHt9KTtcblxuICAgIGlmIChoYXNBZ2dyZWdhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFNVTU1BUlksXG4gICAgICAgIHNvdXJjZTogU09VUkNFLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogZ3JvdXBieSxcbiAgICAgICAgICBzdW1tYXJpemU6IHN1bW1hcml6ZVxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBzdGFjayB7XG4gIC8qKlxuICAgKiBBZGQgc3RhY2tlZCBkYXRhIHNvdXJjZSwgZm9yIGZlZWRpbmcgdGhlIHNoYXJlZCBzY2FsZS5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWYobW9kZWw6IE1vZGVsLCBzdGFja1Byb3BzOiBTdGFja1Byb3BlcnRpZXMpOlZnRGF0YSB7XG4gICAgdmFyIGdyb3VwYnlDaGFubmVsID0gc3RhY2tQcm9wcy5ncm91cGJ5Q2hhbm5lbDtcbiAgICB2YXIgZmllbGRDaGFubmVsID0gc3RhY2tQcm9wcy5maWVsZENoYW5uZWw7XG4gICAgdmFyIGZhY2V0RmllbGRzID0gKG1vZGVsLmhhcyhDT0xVTU4pID8gW21vZGVsLmZpZWxkKENPTFVNTildIDogW10pXG4gICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCgobW9kZWwuaGFzKFJPVykgPyBbbW9kZWwuZmllbGQoUk9XKV0gOiBbXSkpO1xuXG4gICAgdmFyIHN0YWNrZWQ6VmdEYXRhID0ge1xuICAgICAgbmFtZTogU1RBQ0tFRF9TQ0FMRSxcbiAgICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAvLyBncm91cCBieSBjaGFubmVsIGFuZCBvdGhlciBmYWNldHNcbiAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKGdyb3VwYnlDaGFubmVsKV0uY29uY2F0KGZhY2V0RmllbGRzKSxcbiAgICAgICAgLy8gcHJvZHVjZSBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICAgIHN1bW1hcml6ZTogW3tvcHM6IFsnc3VtJ10sIGZpZWxkOiBtb2RlbC5maWVsZChmaWVsZENoYW5uZWwpfV1cbiAgICAgIH1dXG4gICAgfTtcblxuICAgIHJldHVybiBzdGFja2VkO1xuICB9O1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIGRhdGVzIHtcbiAgLyoqXG4gICAqIEFkZCBkYXRhIHNvdXJjZSBmb3Igd2l0aCBkYXRlcyBmb3IgYWxsIG1vbnRocywgZGF5cywgaG91cnMsIC4uLiBhcyBuZWVkZWQuXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gZGVmcyhtb2RlbDogTW9kZWwpIHtcbiAgICBsZXQgYWxyZWFkeUFkZGVkID0ge307XG5cbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGFnZ3JlZ2F0b3IsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCk7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWFscmVhZHlBZGRlZFtmaWVsZERlZi50aW1lVW5pdF0pIHtcbiAgICAgICAgICBhbHJlYWR5QWRkZWRbZmllbGREZWYudGltZVVuaXRdID0gdHJ1ZTtcbiAgICAgICAgICBhZ2dyZWdhdG9yLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogZmllbGREZWYudGltZVVuaXQsXG4gICAgICAgICAgICB2YWx1ZXM6IGRvbWFpbixcbiAgICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgICAgICBmaWVsZDogJ2RhdGUnLFxuICAgICAgICAgICAgICBleHByOiBwYXJzZUV4cHJlc3Npb24oZmllbGREZWYudGltZVVuaXQsICdkYXR1bS5kYXRhJywgdHJ1ZSlcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9uUG9zaXRpdmVGb3JMb2coZGF0YVRhYmxlLCBtb2RlbDogTW9kZWwpIHtcbiAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihfLCBjaGFubmVsKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS5zY2FsZTtcbiAgICBpZiAoc2NhbGUgJiYgc2NhbGUudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgIGRhdGFUYWJsZS50cmFuc2Zvcm0ucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmaWx0ZXInLFxuICAgICAgICB0ZXN0OiBtb2RlbC5maWVsZChjaGFubmVsLCB7ZGF0dW06IHRydWV9KSArICcgPiAwJ1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuXG5pbXBvcnQge2NvbXBpbGVBeGlzfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtjb21waWxlU2NhbGVzfSBmcm9tICcuL3NjYWxlJztcblxuLyoqXG4gKiByZXR1cm4gbWl4aW5zIHRoYXQgY29udGFpbnMgbWFya3MsIHNjYWxlcywgYW5kIGF4ZXMgZm9yIHRoZSByb290R3JvdXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhY2V0TWl4aW5zKG1vZGVsOiBNb2RlbCwgbWFya3MpIHtcbiAgY29uc3QgbGF5b3V0ID0gbW9kZWwubGF5b3V0KCk7XG4gIGNvbnN0IGNlbGxDb25maWcgPSBtb2RlbC5jb25maWcoKS5jZWxsO1xuICBjb25zdCBjZWxsV2lkdGg6IGFueSA9ICFtb2RlbC5oYXMoQ09MVU1OKSA/XG4gICAgICB7ZmllbGQ6IHtncm91cDogJ3dpZHRoJ319IDogICAgIC8vIGNlbGxXaWR0aCA9IHdpZHRoIC0tIGp1c3QgdXNlIGdyb3VwJ3NcbiAgICB0eXBlb2YgbGF5b3V0LmNlbGxXaWR0aCAhPT0gJ251bWJlcicgP1xuICAgICAge3NjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSwgYmFuZDogdHJ1ZX0gOiAvLyBiYW5kU2l6ZSBvZiB0aGUgc2NhbGVcbiAgICAgIHt2YWx1ZTogbGF5b3V0LmNlbGxXaWR0aH07ICAgICAgLy8gc3RhdGljIHZhbHVlXG5cbiAgY29uc3QgY2VsbEhlaWdodDogYW55ID0gIW1vZGVsLmhhcyhST1cpID9cbiAgICAgIHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J319IDogIC8vIGNlbGxIZWlnaHQgPSBoZWlnaHQgLS0ganVzdCB1c2UgZ3JvdXAnc1xuICAgIHR5cGVvZiBsYXlvdXQuY2VsbEhlaWdodCAhPT0gJ251bWJlcicgP1xuICAgICAge3NjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSwgYmFuZDogdHJ1ZX0gOiAgLy8gYmFuZFNpemUgb2YgdGhlIHNjYWxlXG4gICAgICB7dmFsdWU6IGxheW91dC5jZWxsSGVpZ2h0fTsgICAvLyBzdGF0aWMgdmFsdWVcblxuICBsZXQgZmFjZXRHcm91cFByb3BlcnRpZXM6IGFueSA9IHtcbiAgICB3aWR0aDogY2VsbFdpZHRoLFxuICAgIGhlaWdodDogY2VsbEhlaWdodFxuICB9O1xuXG4gIC8vIGFkZCBjb25maWdzIHRoYXQgYXJlIHRoZSByZXN1bHRpbmcgZ3JvdXAgbWFya3MgcHJvcGVydGllc1xuICBbJ2NsaXAnLCAnZmlsbCcsICdmaWxsT3BhY2l0eScsICdzdHJva2UnLCAnc3Ryb2tlV2lkdGgnLFxuICAgICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddXG4gICAgLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY2VsbENvbmZpZ1twcm9wZXJ0eV07XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmYWNldEdyb3VwUHJvcGVydGllc1twcm9wZXJ0eV0gPSB7dmFsdWU6IHZhbHVlfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICBsZXQgcm9vdE1hcmtzID0gW10sIHJvb3RBeGVzID0gW10sIGZhY2V0S2V5cyA9IFtdLCBjZWxsQXhlcyA9IFtdO1xuICBjb25zdCBoYXNSb3cgPSBtb2RlbC5oYXMoUk9XKSwgaGFzQ29sID0gbW9kZWwuaGFzKENPTFVNTik7XG5cbiAgLy8gVE9ETygjOTApOiBhZGQgcHJvcGVydHkgdG8ga2VlcCBheGVzIGluIGNlbGxzIGV2ZW4gaWYgcm93IGlzIGVuY29kZWRcbiAgaWYgKGhhc1Jvdykge1xuICAgIGlmICghbW9kZWwuaXNEaW1lbnNpb24oUk9XKSkge1xuICAgICAgLy8gVE9ETzogYWRkIGVycm9yIHRvIG1vZGVsIGluc3RlYWRcbiAgICAgIHV0aWwuZXJyb3IoJ1JvdyBlbmNvZGluZyBzaG91bGQgYmUgb3JkaW5hbC4nKTtcbiAgICB9XG4gICAgZmFjZXRHcm91cFByb3BlcnRpZXMueSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgb2Zmc2V0OiBtb2RlbC5maWVsZERlZihST1cpLnNjYWxlLnBhZGRpbmcgLyAyXG4gICAgfTtcblxuICAgIGZhY2V0S2V5cy5wdXNoKG1vZGVsLmZpZWxkKFJPVykpO1xuICAgIHJvb3RBeGVzLnB1c2goY29tcGlsZUF4aXMoUk9XLCBtb2RlbCkpO1xuICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgIC8vIElmIGhhcyBYLCBwcmVwZW5kIGEgZ3JvdXAgZm9yIHNoYXJlZCB4LWF4ZXMgaW4gdGhlIHJvb3QgZ3JvdXAncyBtYXJrc1xuICAgICAgcm9vdE1hcmtzLnB1c2goZ2V0WEF4ZXNHcm91cChtb2RlbCwgY2VsbFdpZHRoLCBoYXNDb2wpKTtcbiAgICB9XG4gICAgY29uc3Qgcm93QXhpcyA9IG1vZGVsLmZpZWxkRGVmKFJPVykuYXhpcztcbiAgICBpZiAodHlwZW9mIHJvd0F4aXMgPT09ICdib29sZWFuJyB8fCByb3dBeGlzLmdyaWQgIT09IGZhbHNlKSB7XG4gICAgICByb290TWFya3MucHVzaChnZXRSb3dHcmlkR3JvdXAobW9kZWwsIGNlbGxIZWlnaHQpKTtcbiAgICB9XG4gIH0gZWxzZSB7IC8vIGRvZXNuJ3QgaGF2ZSByb3dcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7IC8vIGtlZXAgeCBheGlzIGluIHRoZSBjZWxsXG4gICAgICBjZWxsQXhlcy5wdXNoKGNvbXBpbGVBeGlzKFgsIG1vZGVsKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETygjOTApOiBhZGQgcHJvcGVydHkgdG8ga2VlcCBheGVzIGluIGNlbGxzIGV2ZW4gaWYgY29sdW1uIGlzIGVuY29kZWRcbiAgaWYgKGhhc0NvbCkge1xuICAgIGlmICghbW9kZWwuaXNEaW1lbnNpb24oQ09MVU1OKSkge1xuICAgICAgLy8gVE9ETzogYWRkIGVycm9yIHRvIG1vZGVsIGluc3RlYWRcbiAgICAgIHV0aWwuZXJyb3IoJ0NvbCBlbmNvZGluZyBzaG91bGQgYmUgb3JkaW5hbC4nKTtcbiAgICB9XG4gICAgZmFjZXRHcm91cFByb3BlcnRpZXMueCA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pLFxuICAgICAgb2Zmc2V0OiBtb2RlbC5maWVsZERlZihDT0xVTU4pLnNjYWxlLnBhZGRpbmcgLyAyXG4gICAgfTtcblxuICAgIGZhY2V0S2V5cy5wdXNoKG1vZGVsLmZpZWxkKENPTFVNTikpO1xuICAgIHJvb3RBeGVzLnB1c2goY29tcGlsZUF4aXMoQ09MVU1OLCBtb2RlbCkpO1xuXG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgLy8gSWYgaGFzIFksIHByZXBlbmQgYSBncm91cCBmb3Igc2hhcmVkIHktYXhlcyBpbiB0aGUgcm9vdCBncm91cCdzIG1hcmtzXG4gICAgICByb290TWFya3MucHVzaChnZXRZQXhlc0dyb3VwKG1vZGVsLCBjZWxsSGVpZ2h0LCBoYXNSb3cpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xBeGlzID0gbW9kZWwuZmllbGREZWYoQ09MVU1OKS5heGlzO1xuICAgIGlmICh0eXBlb2YgY29sQXhpcyA9PT0gJ2Jvb2xlYW4nIHx8IGNvbEF4aXMuZ3JpZCAhPT0gZmFsc2UpIHtcbiAgICAgIHJvb3RNYXJrcy5wdXNoKGdldENvbHVtbkdyaWRHcm91cChtb2RlbCwgY2VsbFdpZHRoKSk7XG4gICAgfVxuICB9IGVsc2UgeyAvLyBkb2Vzbid0IGhhdmUgY29sdW1uXG4gICAgaWYgKG1vZGVsLmhhcyhZKSkgeyAvLyBrZWVwIHkgYXhpcyBpbiB0aGUgY2VsbFxuICAgICAgY2VsbEF4ZXMucHVzaChjb21waWxlQXhpcyhZLCBtb2RlbCkpO1xuICAgIH1cbiAgfVxuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIGxldCBmYWNldEdyb3VwOiBhbnkgPSB7XG4gICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ2NlbGwnLFxuICAgIHR5cGU6ICdncm91cCcsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogZmFjZXRLZXlzfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZTogZmFjZXRHcm91cFByb3BlcnRpZXNcbiAgICB9LFxuICAgIG1hcmtzOiBtYXJrc1xuICB9O1xuICBpZiAoY2VsbEF4ZXMubGVuZ3RoID4gMCkge1xuICAgIGZhY2V0R3JvdXAuYXhlcyA9IGNlbGxBeGVzO1xuICB9XG4gIHJvb3RNYXJrcy5wdXNoKGZhY2V0R3JvdXApO1xuXG4gIHJldHVybiB7XG4gICAgbWFya3M6IHJvb3RNYXJrcyxcbiAgICBheGVzOiByb290QXhlcyxcbiAgICAvLyBhc3N1bWluZyBlcXVhbCBjZWxsV2lkdGggaGVyZVxuICAgIHNjYWxlczogY29tcGlsZVNjYWxlcyhcbiAgICAgIG1vZGVsLmNoYW5uZWxzKCksIC8vIFRPRE86IHdpdGggbmVzdGluZywgbm90IGFsbCBzY2FsZSBtaWdodCBiZSBhIHJvb3QtbGV2ZWxcbiAgICAgIG1vZGVsXG4gICAgKVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRYQXhlc0dyb3VwKG1vZGVsOiBNb2RlbCwgY2VsbFdpZHRoLCBoYXNDb2w6IGJvb2xlYW4pIHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIHJldHVybiBleHRlbmQoe1xuICAgICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3gtYXhlcycsXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNDb2wgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogJ2NvdW50J30gLy8ganVzdCBhIHBsYWNlaG9sZGVyIGFnZ3JlZ2F0aW9uXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSA6IHt9LFxuICAgIHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IGNlbGxXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J319LFxuICAgICAgICAgIHg6IGhhc0NvbCA/IHtzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pfSA6IHt2YWx1ZTogMH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtjb21waWxlQXhpcyhYLCBtb2RlbCldXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFlBeGVzR3JvdXAobW9kZWw6IE1vZGVsLCBjZWxsSGVpZ2h0LCBoYXNSb3c6IGJvb2xlYW4pIHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIHJldHVybiBleHRlbmQoe1xuICAgICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3ktYXhlcycsXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNSb3cgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogJ2NvdW50J30gLy8ganVzdCBhIHBsYWNlaG9sZGVyIGFnZ3JlZ2F0aW9uXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSA6IHt9LFxuICAgIHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfX0sXG4gICAgICAgICAgaGVpZ2h0OiBjZWxsSGVpZ2h0LFxuICAgICAgICAgIHk6IGhhc1JvdyA/IHtzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksIGZpZWxkOiBtb2RlbC5maWVsZChST1cpfSA6IHt2YWx1ZTogMH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtjb21waWxlQXhpcyhZLCBtb2RlbCldXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJvd0dyaWRHcm91cChtb2RlbDogTW9kZWwsIGNlbGxIZWlnaHQpOiBhbnkgeyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IG5hbWUgPSBtb2RlbC5zcGVjKCkubmFtZTtcbiAgY29uc3QgY2VsbENvbmZpZyA9IG1vZGVsLmNvbmZpZygpLmNlbGw7XG5cbiAgY29uc3Qgcm93R3JpZCA9IHtcbiAgICBuYW1lOiAobmFtZSA/IG5hbWUgKyAnLScgOiAnJykgKyAncm93LWdyaWQnLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBmcm9tOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3t0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBbbW9kZWwuZmllbGQoUk9XKV19XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHk6IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVylcbiAgICAgICAgfSxcbiAgICAgICAgeDoge3ZhbHVlOiAwLCBvZmZzZXQ6IC1jZWxsQ29uZmlnLmdyaWRPZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBjZWxsQ29uZmlnLmdyaWRPZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBjZWxsQ29uZmlnLmdyaWRDb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBjZWxsQ29uZmlnLmdyaWRPcGFjaXR5IH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgcm93R3JpZE9uVG9wID0gIW1vZGVsLmhhcyhYKSB8fCBtb2RlbC5heGlzKFgpLm9yaWVudCAhPT0gJ3RvcCc7XG4gIGlmIChyb3dHcmlkT25Ub3ApIHsgLy8gb24gdG9wIC0gbm8gbmVlZCB0byBhZGQgb2Zmc2V0XG4gICAgcmV0dXJuIHJvd0dyaWQ7XG4gIH0gLy8gb3RoZXJ3aXNlLCBuZWVkIHRvIG9mZnNldCBhbGwgZ3JpZCBieSBjZWxsSGVpZ2h0XG4gIHJldHVybiB7XG4gICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3Jvdy1ncmlkLWdyb3VwJyxcbiAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICAvLyBhZGQgZ3JvdXAgb2Zmc2V0ID0gYGNlbGxIZWlnaHQgKyBwYWRkaW5nYCB0byBhdm9pZCBjbGFzaGluZyB3aXRoIGF4aXNcbiAgICAgICAgeTogY2VsbEhlaWdodC52YWx1ZSA/IHtcbiAgICAgICAgICAgIC8vIElmIGNlbGxIZWlnaHQgY29udGFpbnMgdmFsdWUsIGp1c3QgdXNlIGl0LlxuICAgICAgICAgICAgdmFsdWU6IGNlbGxIZWlnaHQsXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLmZpZWxkRGVmKFJPVykuc2NhbGUucGFkZGluZ1xuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gZ2V0IGl0IGZyb20gbGF5b3V0IGRhdGEgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgICAgICAgIGZpZWxkOiB7cGFyZW50OiAnY2VsbEhlaWdodCd9LFxuICAgICAgICAgICAgb2Zmc2V0OiBtb2RlbC5maWVsZERlZihST1cpLnNjYWxlLnBhZGRpbmdcbiAgICAgICAgICB9LFxuICAgICAgICAvLyBpbmNsdWRlIHdpZHRoIHNvIGl0IGNhbiBiZSByZWZlcnJlZCBpbnNpZGUgcm93LWdyaWRcbiAgICAgICAgd2lkdGg6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfX1cbiAgICAgIH1cbiAgICB9LFxuICAgIG1hcmtzOiBbcm93R3JpZF1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29sdW1uR3JpZEdyb3VwKG1vZGVsOiBNb2RlbCwgY2VsbFdpZHRoKTogYW55IHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIGNvbnN0IGNlbGxDb25maWcgPSBtb2RlbC5jb25maWcoKS5jZWxsO1xuXG4gIGNvbnN0IGNvbHVtbkdyaWQgPSB7XG4gICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ2NvbHVtbi1ncmlkJyxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtY2VsbENvbmZpZy5ncmlkT2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogY2VsbENvbmZpZy5ncmlkT2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogY2VsbENvbmZpZy5ncmlkQ29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogY2VsbENvbmZpZy5ncmlkT3BhY2l0eSB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNvbHVtbkdyaWRPbkxlZnQgPSAhbW9kZWwuaGFzKFkpIHx8IG1vZGVsLmF4aXMoWSkub3JpZW50ID09PSAncmlnaHQnO1xuICBpZiAoY29sdW1uR3JpZE9uTGVmdCkgeyAvLyBvbiBsZWZ0LCBubyBuZWVkIHRvIGFkZCBnbG9iYWwgb2Zmc2V0XG4gICAgcmV0dXJuIGNvbHVtbkdyaWQ7XG4gIH0gLy8gb3RoZXJ3aXNlLCBuZWVkIHRvIG9mZnNldCBhbGwgZ3JpZCBieSBjZWxsV2lkdGhcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAobmFtZSA/IG5hbWUgKyAnLScgOiAnJykgKyAnY29sdW1uLWdyaWQtZ3JvdXAnLFxuICAgIHR5cGU6ICdncm91cCcsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIC8vIEFkZCBncm91cCBvZmZzZXQgPSBgY2VsbFdpZHRoICsgcGFkZGluZ2AgdG8gYXZvaWQgY2xhc2hpbmcgd2l0aCBheGlzXG4gICAgICAgIHg6IGNlbGxXaWR0aC52YWx1ZSA/IHtcbiAgICAgICAgICAgICAvLyBJZiBjZWxsV2lkdGggY29udGFpbnMgdmFsdWUsIGp1c3QgdXNlIGl0LlxuICAgICAgICAgICAgIHZhbHVlOiBjZWxsV2lkdGgsXG4gICAgICAgICAgICAgb2Zmc2V0OiBtb2RlbC5maWVsZERlZihDT0xVTU4pLnNjYWxlLnBhZGRpbmdcbiAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gZ2V0IGl0IGZyb20gbGF5b3V0IGRhdGEgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgICAgICAgICBmaWVsZDoge3BhcmVudDogJ2NlbGxXaWR0aCd9LFxuICAgICAgICAgICAgIG9mZnNldDogbW9kZWwuZmllbGREZWYoQ09MVU1OKS5zY2FsZS5wYWRkaW5nXG4gICAgICAgICAgIH0sXG4gICAgICAgIC8vIGluY2x1ZGUgaGVpZ2h0IHNvIGl0IGNhbiBiZSByZWZlcnJlZCBpbnNpZGUgY29sdW1uLWdyaWRcbiAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtncm91cDogJ2hlaWdodCd9fVxuICAgICAgfVxuICAgIH0sXG4gICAgbWFya3M6IFtjb2x1bW5HcmlkXVxuICB9O1xufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIFRFWFR9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtURVhUIGFzIFRFWFRfTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5cbmludGVyZmFjZSBEYXRhUmVmIHtcbiAgZGF0YT86IHN0cmluZztcbiAgZmllbGQ/OiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheW91dCB7XG4gIGNlbGxXaWR0aDogTGF5b3V0VmFsdWU7XG4gIGNlbGxIZWlnaHQ6IExheW91dFZhbHVlO1xuICB3aWR0aDogTGF5b3V0VmFsdWU7XG4gIGhlaWdodDogTGF5b3V0VmFsdWU7XG59XG5cbi8vIHZhbHVlIHRoYXQgd2UgY2FuIHB1dCBpbiBzY2FsZSdzIGRvbWFpbi9yYW5nZSAoZWl0aGVyIGEgbnVtYmVyLCBvciBhIGRhdGEgcmVmKVxudHlwZSBMYXlvdXRWYWx1ZSA9IG51bWJlciB8IERhdGFSZWY7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTGF5b3V0KG1vZGVsOiBNb2RlbCk6IExheW91dCB7XG4gIGNvbnN0IGNlbGxXaWR0aCA9IGdldENlbGxXaWR0aChtb2RlbCk7XG4gIGNvbnN0IGNlbGxIZWlnaHQgPSBnZXRDZWxsSGVpZ2h0KG1vZGVsKTtcbiAgcmV0dXJuIHtcbiAgICAvLyB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSB3aG9sZSBjZWxsXG4gICAgY2VsbFdpZHRoOiBjZWxsV2lkdGgsXG4gICAgY2VsbEhlaWdodDogY2VsbEhlaWdodCxcbiAgICAvLyB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjaGFydFxuICAgIHdpZHRoOiBnZXRXaWR0aChtb2RlbCwgY2VsbFdpZHRoKSxcbiAgICBoZWlnaHQ6IGdldEhlaWdodChtb2RlbCwgY2VsbEhlaWdodClcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbFdpZHRoKG1vZGVsOiBNb2RlbCk6IExheW91dFZhbHVlIHtcbiAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgIGlmIChtb2RlbC5pc09yZGluYWxTY2FsZShYKSkgeyAvLyBjYWxjdWxhdGUgaW4gZGF0YVxuICAgICAgcmV0dXJuIHtkYXRhOiBMQVlPVVQsIGZpZWxkOiAnY2VsbFdpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5jZWxsLndpZHRoO1xuICB9XG4gIGlmIChtb2RlbC5tYXJrKCkgPT09IFRFWFRfTUFSSykge1xuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS50ZXh0Q2VsbFdpZHRoO1xuICB9XG4gIHJldHVybiBtb2RlbC5maWVsZERlZihYKS5zY2FsZS5iYW5kV2lkdGg7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoKG1vZGVsOiBNb2RlbCwgY2VsbFdpZHRoOiBMYXlvdXRWYWx1ZSk6IExheW91dFZhbHVlIHtcbiAgaWYgKG1vZGVsLmhhcyhDT0xVTU4pKSB7IC8vIGNhbGN1bGF0ZSBpbiBkYXRhXG4gICAgcmV0dXJuIHtkYXRhOiBMQVlPVVQsIGZpZWxkOiAnd2lkdGgnfTtcbiAgfVxuICByZXR1cm4gY2VsbFdpZHRoO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSGVpZ2h0KG1vZGVsOiBNb2RlbCk6IExheW91dFZhbHVlIHtcbiAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgIGlmIChtb2RlbC5pc09yZGluYWxTY2FsZShZKSkgeyAvLyBjYWxjdWxhdGUgaW4gZGF0YVxuICAgICAgcmV0dXJuIHtkYXRhOiBMQVlPVVQsIGZpZWxkOiAnY2VsbEhlaWdodCd9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkuY2VsbC5oZWlnaHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RlbC5maWVsZERlZihZKS5zY2FsZS5iYW5kV2lkdGg7XG59XG5cbmZ1bmN0aW9uIGdldEhlaWdodChtb2RlbDogTW9kZWwsIGNlbGxIZWlnaHQ6IExheW91dFZhbHVlKTogTGF5b3V0VmFsdWUge1xuICBpZiAobW9kZWwuaGFzKFJPVykpIHtcbiAgICByZXR1cm4ge2RhdGE6IExBWU9VVCwgZmllbGQ6ICdoZWlnaHQnfTtcbiAgfVxuICByZXR1cm4gY2VsbEhlaWdodDtcbn1cbiIsImltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL3NjaGVtYS9maWVsZGRlZi5zY2hlbWEnO1xuXG5pbXBvcnQge0NPTE9SLCBTSVpFLCBTSEFQRSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkVGl0bGV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QVJFQSwgQkFSLCBUSUNLLCBURVhULCBMSU5FLCBQT0lOVCwgQ0lSQ0xFLCBTUVVBUkV9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtleHRlbmQsIGtleXN9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHLCBmb3JtYXRNaXhpbnMgYXMgdXRpbEZvcm1hdE1peGluc30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVMZWdlbmRzKG1vZGVsOiBNb2RlbCkge1xuICB2YXIgZGVmcyA9IFtdO1xuXG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIG1vZGVsLmZpZWxkRGVmKENPTE9SKS5sZWdlbmQpIHtcbiAgICBkZWZzLnB1c2goY29tcGlsZUxlZ2VuZChtb2RlbCwgQ09MT1IsIHtcbiAgICAgIGZpbGw6IG1vZGVsLnNjYWxlTmFtZShDT0xPUilcbiAgICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIHRoaXMgc2hvdWxkIGJlIHN0cm9rZSBmb3IgbGluZVxuICAgIH0pKTtcbiAgfVxuXG4gIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgbW9kZWwuZmllbGREZWYoU0laRSkubGVnZW5kKSB7XG4gICAgZGVmcy5wdXNoKGNvbXBpbGVMZWdlbmQobW9kZWwsIFNJWkUsIHtcbiAgICAgIHNpemU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKVxuICAgIH0pKTtcbiAgfVxuXG4gIGlmIChtb2RlbC5oYXMoU0hBUEUpICYmIG1vZGVsLmZpZWxkRGVmKFNIQVBFKS5sZWdlbmQpIHtcbiAgICBkZWZzLnB1c2goY29tcGlsZUxlZ2VuZChtb2RlbCwgU0hBUEUsIHtcbiAgICAgIHNoYXBlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpXG4gICAgfSkpO1xuICB9XG4gIHJldHVybiBkZWZzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUxlZ2VuZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZikge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBsZWdlbmQgPSBmaWVsZERlZi5sZWdlbmQ7XG5cbiAgLy8gMS4xIEFkZCBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlc1xuICBkZWYudGl0bGUgPSB0aXRsZShmaWVsZERlZik7XG5cbiAgZXh0ZW5kKGRlZiwgZm9ybWF0TWl4aW5zKG1vZGVsLCBjaGFubmVsKSk7XG5cbiAgLy8gMS4yIEFkZCBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXNcbiAgWydvcmllbnQnLCAndmFsdWVzJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gbGVnZW5kW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC5wcm9wZXJ0aWVzKSB8fCB7fTtcbiAgWyd0aXRsZScsICdzeW1ib2xzJywgJ2xlZ2VuZCddLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBsZXQgdmFsdWUgPSBwcm9wZXJ0aWVzW2dyb3VwXSA/XG4gICAgICBwcm9wZXJ0aWVzW2dyb3VwXShmaWVsZERlZiwgcHJvcHNbZ3JvdXBdLCBtb2RlbCwgY2hhbm5lbCkgOiAvLyBhcHBseSBydWxlXG4gICAgICBwcm9wc1tncm91cF07IC8vIG5vIHJ1bGUgLS0ganVzdCBkZWZhdWx0IHZhbHVlc1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGNvbnN0IGxlZ2VuZCA9IGZpZWxkRGVmLmxlZ2VuZDtcbiAgaWYgKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQudGl0bGUpIHtcbiAgICByZXR1cm4gbGVnZW5kLnRpdGxlO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkVGl0bGUoZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TWl4aW5zKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIC8vIElmIHRoZSBjaGFubmVsIGlzIGJpbm5lZCwgd2Ugc2hvdWxkIG5vdCBzZXQgdGhlIGZvcm1hdCBiZWNhdXNlIHdlIGhhdmUgYSByYW5nZSBsYWJlbFxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3QgbGVnZW5kID0gZmllbGREZWYubGVnZW5kO1xuICByZXR1cm4gdXRpbEZvcm1hdE1peGlucyhtb2RlbCwgY2hhbm5lbCwgdHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nID8gbGVnZW5kLmZvcm1hdCA6IHVuZGVmaW5lZCk7XG59XG5cbm5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbHMoZmllbGREZWY6IEZpZWxkRGVmLCBzeW1ib2xzU3BlYywgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgbGV0IHN5bWJvbHM6YW55ID0ge307XG4gICAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcblxuICAgIHN3aXRjaCAobWFyaykge1xuICAgICAgY2FzZSBCQVI6XG4gICAgICBjYXNlIFRJQ0s6XG4gICAgICBjYXNlIFRFWFQ6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6ICdzcXVhcmUnfTtcblxuICAgICAgICAvLyBzZXQgc3Ryb2tlIHRvIHRyYW5zcGFyZW50IGJ5IGRlZmF1bHQgdW5sZXNzIHRoZXJlIGlzIGEgY29uZmlnIGZvciBzdHJva2VcbiAgICAgICAgc3ltYm9scy5zdHJva2UgPSB7dmFsdWU6ICd0cmFuc3BhcmVudCd9O1xuICAgICAgICBhcHBseU1hcmtDb25maWcoc3ltYm9scywgbW9kZWwsIEZJTExfU1RST0tFX0NPTkZJRyk7XG5cbiAgICAgICAgLy8gbm8gbmVlZCB0byBhcHBseSBjb2xvciB0byBmaWxsIGFzIHRoZXkgYXJlIHNldCBhdXRvbWF0aWNhbGx5XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIENJUkNMRTpcbiAgICAgIGNhc2UgU1FVQVJFOlxuICAgICAgICBzeW1ib2xzLnNoYXBlID0ge3ZhbHVlOiBtYXJrfTtcbiAgICAgICAgLyogZmFsbCB0aHJvdWdoICovXG4gICAgICBjYXNlIFBPSU5UOlxuICAgICAgICAvLyBmaWxsIG9yIHN0cm9rZVxuICAgICAgICBpZiAobW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQpIHsgLy8gZmlsbGVkXG4gICAgICAgICAgLy8gc2V0IHN0cm9rZSB0byB0cmFuc3BhcmVudCBieSBkZWZhdWx0IHVubGVzcyB0aGVyZSBpcyBhIGNvbmZpZyBmb3Igc3Ryb2tlXG4gICAgICAgICAgc3ltYm9scy5zdHJva2UgPSB7dmFsdWU6ICd0cmFuc3BhcmVudCd9O1xuICAgICAgICAgIGFwcGx5TWFya0NvbmZpZyhzeW1ib2xzLCBtb2RlbCwgRklMTF9TVFJPS0VfQ09ORklHKTtcblxuICAgICAgICAgIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgICAgICBzeW1ib2xzLmZpbGwgPSB7c2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksIGZpZWxkOiAnZGF0YSd9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzeW1ib2xzLmZpbGwgPSB7dmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZX07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBzdHJva2VkXG4gICAgICAgICAgLy8gc2V0IGZpbGwgdG8gdHJhbnNwYXJlbnQgYnkgZGVmYXVsdCB1bmxlc3MgdGhlcmUgaXMgYSBjb25maWcgZm9yIHN0cm9rZVxuICAgICAgICAgIHN5bWJvbHMuZmlsbCA9IHt2YWx1ZTogJ3RyYW5zcGFyZW50J307XG4gICAgICAgICAgYXBwbHlNYXJrQ29uZmlnKHN5bWJvbHMsIG1vZGVsLCBGSUxMX1NUUk9LRV9DT05GSUcpO1xuXG4gICAgICAgICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgICAgIHN5bWJvbHMuc3Ryb2tlID0ge3NjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLCBmaWVsZDogJ2RhdGEnfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ltYm9scy5zdHJva2UgPSB7dmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZX07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExJTkU6XG4gICAgICBjYXNlIEFSRUE6XG4gICAgICAgIC8vIHNldCBzdHJva2UgdG8gdHJhbnNwYXJlbnQgYnkgZGVmYXVsdCB1bmxlc3MgdGhlcmUgaXMgYSBjb25maWcgZm9yIHN0cm9rZVxuICAgICAgICBzeW1ib2xzLnN0cm9rZSA9IHt2YWx1ZTogJ3RyYW5zcGFyZW50J307XG4gICAgICAgIGFwcGx5TWFya0NvbmZpZyhzeW1ib2xzLCBtb2RlbCwgRklMTF9TVFJPS0VfQ09ORklHKTtcblxuICAgICAgICAvLyBUT0RPIHVzZSBzaGFwZSBoZXJlIGFmdGVyIGltcGxlbWVudGluZyAjNTA4XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN5bWJvbHMgPSBleHRlbmQoc3ltYm9scywgc3ltYm9sc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMoc3ltYm9scykubGVuZ3RoID4gMCA/IHN5bWJvbHMgOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtYLCBZfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IG5hbWVzcGFjZSBhcmVhIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnYXJlYSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICB2YXIgcDogYW55ID0ge307XG5cbiAgICBjb25zdCBvcmllbnQgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudDtcbiAgICBpZiAob3JpZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHAub3JpZW50ID0geyB2YWx1ZTogb3JpZW50IH07XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICAgIC8vIHhcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobW9kZWwuaXNNZWFzdXJlKFgpKSB7IC8vIE1lYXN1cmVcbiAgICAgIHAueCA9IHsgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSwgZmllbGQ6IG1vZGVsLmZpZWxkKFgpIH07XG4gICAgfSBlbHNlIGlmIChtb2RlbC5pc0RpbWVuc2lvbihYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB4MlxuICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHlcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobW9kZWwuaXNNZWFzdXJlKFkpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmlzRGltZW5zaW9uKFkpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChvcmllbnQgIT09ICdob3Jpem9udGFsJykgeyAvLyAndmVydGljYWwnIG9yIHVuZGVmaW5lZCBhcmUgdmVydGljYWxcbiAgICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7WCwgWSwgU0laRX0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuL3V0aWwnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgYmFyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncmVjdCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICBjb25zdCBvcmllbnQgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICAvLyB4LCB4MiwgYW5kIHdpZHRoIC0tIHdlIG11c3Qgc3BlY2lmeSB0d28gb2YgdGhlc2UgaW4gYWxsIGNvbmRpdGlvbnNcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgICAvLyAneCcgaXMgYSBzdGFja2VkIG1lYXN1cmUsIHRodXMgdXNlIDxmaWVsZD5fc3RhcnQgYW5kIDxmaWVsZD5fZW5kIGZvciB4LCB4Mi5cbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICAgIHAueDIgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobW9kZWwuaXNNZWFzdXJlKFgpKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcC54ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgIH07XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxcbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgICB9O1xuICAgICAgICBwLndpZHRoID0ge3ZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWCl9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoWCkuYmluKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIC8vIEZvciB2ZXJ0aWNhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWCBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byB3aWR0aC5cbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHggaXMgZGltZW5zaW9uIG9yIHVuc3BlY2lmaWVkXG4gICAgICBpZiAobW9kZWwuaGFzKFgpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICBwLnhjID0ge1xuICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgIH07XG4gICAgIH0gZWxzZSB7IC8vIG5vIHhcbiAgICAgICAgcC54ID0geyB2YWx1ZTogMCwgb2Zmc2V0OiAyIH07XG4gICAgICB9XG5cbiAgICAgIHAud2lkdGggPSBtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ICE9PSAnaG9yaXpvbnRhbCcgPyB7XG4gICAgICAgICAgLy8gYXBwbHkgc2l6ZSBzY2FsZSBpZiBoYXMgc2l6ZSBhbmQgaXMgdmVydGljYWwgKGV4cGxpY2l0IFwidmVydGljYWxcIiBvciB1bmRlZmluZWQpXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAvLyBvdGhlcndpc2UsIHVzZSBmaXhlZCBzaXplXG4gICAgICAgICAgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZShYKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIHksIHkyICYgaGVpZ2h0IC0tIHdlIG11c3Qgc3BlY2lmeSB0d28gb2YgdGhlc2UgaW4gYWxsIGNvbmRpdGlvbnNcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIHkgaXMgc3RhY2tlZCBtZWFzdXJlXG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgICBwLnkyID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmlzTWVhc3VyZShZKSkge1xuICAgICAgaWYgKG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7IC8vIHZlcnRpY2FsIChleHBsaWNpdCAndmVydGljYWwnIG9yIHVuZGVmaW5lZClcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgIH07XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZShZKSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoWSkuYmluKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIC8vIEZvciBob3Jpem9udGFsIGNoYXJ0IHRoYXQgaGFzIGJpbm5lZCBZIGFuZCBzaXplLFxuICAgICAgICAvLyBjZW50ZXIgYmFyIGFuZCBhcHBseSBzaXplIHRvIGhlaWdodC5cbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAuaGVpZ2h0ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXBseSB1c2UgPGZpZWxkPl9zdGFydCwgPGZpZWxkPl9lbmRcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX2VuZCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8geSBpcyBvcmRpbmFsIG9yIHVuc3BlY2lmaWVkXG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHsgLy8gaXMgb3JkaW5hbFxuICAgICAgICBwLnljID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgeyAvLyBObyBZXG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0sXG4gICAgICAgICAgb2Zmc2V0OiAtMVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBwLmhlaWdodCA9IG1vZGVsLmhhcyhTSVpFKSAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcgPyB7XG4gICAgICAgICAgLy8gYXBwbHkgc2l6ZSBzY2FsZSBpZiBoYXMgc2l6ZSBhbmQgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZShZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IE1vZGVsKSB7XG4gICAgLy8gVE9ETygjNjQpOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgYXBwbHlNYXJrQ29uZmlnLCBDb2xvck1vZGV9IGZyb20gJy4vdXRpbCc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBsaW5lIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnbGluZSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICB2YXIgcDogYW55ID0ge307XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC54ID0geyB2YWx1ZTogMCB9O1xuICAgIH1cblxuICAgIC8vIHlcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnkgPSB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwsIENvbG9yTW9kZS5BTFdBWVNfU1RST0tFRCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7WCwgWSwgU0hBUEUsIFNJWkV9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgQ29sb3JNb2RlfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHBvaW50IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCwgZml4ZWRTaGFwZT86IHN0cmluZykge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIHZhciBwOiBhbnkgPSB7fTtcblxuICAgIC8vIHhcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnggPSB7IHZhbHVlOiBtb2RlbC5maWVsZERlZihYKS5zY2FsZS5iYW5kV2lkdGggLyAyIH07XG4gICAgfVxuXG4gICAgLy8geVxuICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKFkpLnNjYWxlLmJhbmRXaWR0aCAvIDIgfTtcbiAgICB9XG5cbiAgICAvLyBzaXplXG4gICAgaWYgKG1vZGVsLmhhcyhTSVpFKSkge1xuICAgICAgcC5zaXplID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAuc2l6ZSA9IHsgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZSgpIH07XG4gICAgfVxuXG4gICAgLy8gc2hhcGVcbiAgICBpZiAoZml4ZWRTaGFwZSkgeyAvLyBzcXVhcmUgYW5kIGNpcmNsZSBtYXJrc1xuICAgICAgcC5zaGFwZSA9IHsgdmFsdWU6IGZpeGVkU2hhcGUgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmhhcyhTSEFQRSkpIHtcbiAgICAgIHAuc2hhcGUgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0hBUEUpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnNoYXBlID0geyB2YWx1ZTogbW9kZWwuZmllbGREZWYoU0hBUEUpLnZhbHVlIH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwsXG4gICAgICAvLyBzcXVhcmUgYW5kIGNpcmNsZSBhcmUgZmlsbGVkIGJ5IGRlZmF1bHQsIGJ1dCBwb2ludCBpcyBzdHJva2VkIGJ5IGRlZmF1bHQuXG4gICAgICBmaXhlZFNoYXBlID8gQ29sb3JNb2RlLkZJTExFRF9CWV9ERUZBVUxUIDogQ29sb3JNb2RlLlNUUk9LRURfQllfREVGQVVMVFxuICAgICk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGNpcmNsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ2NpcmNsZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIHNxdWFyZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ3NxdWFyZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSVpFfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlNYXJrQ29uZmlnLCBhcHBseUNvbG9yQW5kT3BhY2l0eSwgZm9ybWF0TWl4aW5zfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtleHRlbmQsIGNvbnRhaW5zfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7UVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgdGV4dCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3RleHQnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJhY2tncm91bmQobW9kZWw6IE1vZGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHk6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9LFxuICAgICAgZmlsbDogeyBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSwgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSB9XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFRFWFQpO1xuXG4gICAgLy8geFxuICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoVEVYVCkgJiYgbW9kZWwuZmllbGREZWYoVEVYVCkudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIHAueCA9IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSwgb2Zmc2V0OiAtNSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZTogbW9kZWwuZmllbGREZWYoWCkuc2NhbGUuYmFuZFdpZHRoIC8gMiB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogc3VwcG9ydCB4LnZhbHVlXG4gICAgfVxuXG4gICAgLy8geVxuICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKFkpLnNjYWxlLmJhbmRXaWR0aCAvIDIgfTtcbiAgICAgIC8vIFRPRE86IHN1cHBvcnQgeC52YWx1ZVxuICAgIH1cblxuICAgIC8vIHNpemVcbiAgICBpZiAobW9kZWwuaGFzKFNJWkUpKSB7XG4gICAgICBwLmZvbnRTaXplID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAuZm9udFNpemUgPSB7IHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoKSB9O1xuICAgIH1cblxuICAgIGlmIChtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLmZpbGwgPSB7dmFsdWU6ICdibGFjayd9OyAvLyBUT0RPOiBhZGQgcnVsZXMgZm9yIHN3YXBwaW5nIGJldHdlZW4gYmxhY2sgYW5kIHdoaXRlXG5cbiAgICAgIC8vIG9wYWNpdHlcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9wYWNpdHk7XG4gICAgICBpZiAob3BhY2l0eSkgeyBwLm9wYWNpdHkgPSB7IHZhbHVlOiBvcGFjaXR5IH07IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8vIHRleHRcbiAgICBpZiAobW9kZWwuaGFzKFRFWFQpKSB7XG4gICAgICBpZiAoY29udGFpbnMoW1FVQU5USVRBVElWRSwgVEVNUE9SQUxdLCBtb2RlbC5maWVsZERlZihURVhUKS50eXBlKSkge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBtb2RlbC5jb25maWcoKS5tYXJrLmZvcm1hdDtcbiAgICAgICAgZXh0ZW5kKHAsIGZvcm1hdE1peGlucyhtb2RlbCwgVEVYVCwgZm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnRleHQgPSB7IGZpZWxkOiBtb2RlbC5maWVsZChURVhUKSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwLnRleHQgPSB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgIH1cblxuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCxcbiAgICAgIFsnYW5nbGUnLCAnYWxpZ24nLCAnYmFzZWxpbmUnLCAnZHgnLCAnZHknLCAnZm9udCcsICdmb250V2VpZ2h0JyxcbiAgICAgICAgJ2ZvbnRTdHlsZScsICdyYWRpdXMnLCAndGhldGEnXSk7XG5cbiAgICByZXR1cm4gcDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgQ29sb3JNb2RlfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRpY2sge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCkge1xuICAgIHZhciBwOiBhbnkgPSB7fTtcblxuICAgIC8vIHhcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICBwLnhjID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC54YyA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKFgpLnNjYWxlLmJhbmRXaWR0aCAvIDIgfTtcbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55YyA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueWMgPSB7IHZhbHVlOiBtb2RlbC5maWVsZERlZihZKS5zY2FsZS5iYW5kV2lkdGggLyAyIH07XG4gICAgfVxuXG4gICAgaWYgKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHAud2lkdGggPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLnRoaWNrbmVzcyB9O1xuICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWSkgfTsgLy8gVE9ETygjOTMyKSBzdXBwb3J0IHNpemUgY2hhbm5lbFxuICAgIH0gZWxzZSB7XG4gICAgICBwLndpZHRoID0geyB2YWx1ZTogbW9kZWwuc2l6ZVZhbHVlKFgpIH07IC8vIFRPRE8oIzkzMikgc3VwcG9ydCBzaXplIGNoYW5uZWxcbiAgICAgIHAuaGVpZ2h0ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkubWFyay50aGlja25lc3MgfTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCwgQ29sb3JNb2RlLkFMV0FZU19GSUxMRUQpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSEFQRSwgUEFUSCwgREVUQUlMLCBST1csIENPTFVNTiwgTEFCRUx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtBUkVBLCBMSU5FLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7aW1wdXRlVHJhbnNmb3JtLCBzdGFja1RyYW5zZm9ybX0gZnJvbSAnLi9zdGFjayc7XG5pbXBvcnQge2V4dGVuZCwgaXNBcnJheX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2FyZWF9IGZyb20gJy4vbWFyay1hcmVhJztcbmltcG9ydCB7YmFyfSBmcm9tICcuL21hcmstYmFyJztcbmltcG9ydCB7bGluZX0gZnJvbSAnLi9tYXJrLWxpbmUnO1xuaW1wb3J0IHtwb2ludCwgY2lyY2xlLCBzcXVhcmV9IGZyb20gJy4vbWFyay1wb2ludCc7XG5pbXBvcnQge3RleHR9IGZyb20gJy4vbWFyay10ZXh0JztcbmltcG9ydCB7dGlja30gZnJvbSAnLi9tYXJrLXRpY2snO1xuXG5jb25zdCBtYXJrQ29tcGlsZXIgPSB7XG4gIGFyZWE6IGFyZWEsXG4gIGJhcjogYmFyLFxuICBsaW5lOiBsaW5lLFxuICBwb2ludDogcG9pbnQsXG4gIHRleHQ6IHRleHQsXG4gIHRpY2s6IHRpY2ssXG4gIGNpcmNsZTogY2lyY2xlLFxuICBzcXVhcmU6IHNxdWFyZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVNYXJrKG1vZGVsOiBNb2RlbCk6IGFueVtdIHtcbiAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgY29uc3QgbmFtZSA9IG1vZGVsLnNwZWMoKS5uYW1lO1xuICBjb25zdCBpc0ZhY2V0ZWQgPSBtb2RlbC5oYXMoUk9XKSB8fCBtb2RlbC5oYXMoQ09MVU1OKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuICBjb25zdCBtYXJrQ29uZmlnID0gbW9kZWwuY29uZmlnKCkubWFyaztcbiAgY29uc3Qgc29ydEJ5ID0gbWFya0NvbmZpZy5zb3J0Qnk7XG5cbiAgaWYgKG1hcmsgPT09IExJTkUgfHwgbWFyayA9PT0gQVJFQSkgeyAvLyBUT0RPOiBleHRyYWN0IHRoaXMgaW50byBjb21waWxlUGF0aE1hcmtcbiAgICBjb25zdCBkZXRhaWxzID0gZGV0YWlsRmllbGRzKG1vZGVsKTtcblxuICAgIGNvbnN0IHBhdGhPcmRlciA9IGdldFBhdGhPcmRlcihtb2RlbCk7XG5cbiAgICBsZXQgcGF0aE1hcmtzOiBhbnkgPSBbZXh0ZW5kKFxuICAgICAgbmFtZSA/IHsgbmFtZTogbmFtZSArICctbWFya3MnIH0gOiB7fSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKCksXG4gICAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgICAgLy8gSWYgaGFzIHN1YmZhY2V0IGZvciBsaW5lL2FyZWEgZ3JvdXAsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIG91dGVyIHN1YmZhY2V0IGdyb3VwIGJlbG93LlxuICAgICAgICAgIC8vIElmIGhhcyBubyBzdWJmYWNldCwgYWRkIGZyb20uZGF0YS5cbiAgICAgICAgICBpc0ZhY2V0ZWQgfHwgZGV0YWlscy5sZW5ndGggPiAwID8ge30gOiBkYXRhRnJvbSxcblxuICAgICAgICAgIC8vIHNvcnQgdHJhbnNmb3JtXG4gICAgICAgICAge3RyYW5zZm9ybTogW3sgdHlwZTogJ3NvcnQnLCBieTogcGF0aE9yZGVyfV19XG4gICAgICAgICksXG4gICAgICAgIHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfVxuICAgICAgfVxuICAgICldO1xuXG4gICAgaWYgKGRldGFpbHMubGVuZ3RoID4gMCkgeyAvLyBoYXZlIGxldmVsIG9mIGRldGFpbHMgLSBuZWVkIHRvIGZhY2V0IGxpbmUgaW50byBzdWJncm91cHNcbiAgICAgIGNvbnN0IGZhY2V0VHJhbnNmb3JtID0geyB0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBkZXRhaWxzIH07XG4gICAgICBjb25zdCB0cmFuc2Zvcm06IGFueVtdID0gW10uY29uY2F0KFxuICAgICAgICAoc29ydEJ5ID8gW3t0eXBlOiAnc29ydCcsIGJ5OiBzb3J0Qnl9XSA6IFtdKSxcbiAgICAgICAgbWFyayA9PT0gQVJFQSAmJiBtb2RlbC5zdGFjaygpID9cbiAgICAgICAgICAvLyBGb3Igc3RhY2tlZCBhcmVhLCB3ZSBuZWVkIHRvIGltcHV0ZSBtaXNzaW5nIHR1cGxlcyBhbmQgc3RhY2sgdmFsdWVzXG4gICAgICAgICAgW2ltcHV0ZVRyYW5zZm9ybShtb2RlbCksIHN0YWNrVHJhbnNmb3JtKG1vZGVsKSwgZmFjZXRUcmFuc2Zvcm1dIDpcbiAgICAgICAgICBbZmFjZXRUcmFuc2Zvcm1dXG4gICAgICAgICk7XG5cbiAgICAgIHJldHVybiBbe1xuICAgICAgICBuYW1lOiAobmFtZSA/IG5hbWUgKyAnLScgOiAnJykgKyBtYXJrICsgJy1mYWNldCcsXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zZm9ybX1cbiAgICAgICAgKSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtzOiBwYXRoTWFya3NcbiAgICAgIH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGF0aE1hcmtzO1xuICAgIH1cbiAgfSBlbHNlIHsgLy8gb3RoZXIgbWFyayB0eXBlXG4gICAgLy8gVE9ETzogZXh0cmFjdCB0aGlzIGludG8gY29tcGlsZU5vblBhdGhNYXJrXG5cbiAgICBsZXQgbWFya3MgPSBbXTsgLy8gVE9ETzogdmdNYXJrc1xuICAgIGlmIChtYXJrID09PSBURVhUTUFSSyAmJlxuICAgICAgbW9kZWwuaGFzKENPTE9SKSAmJlxuICAgICAgbW9kZWwuY29uZmlnKCkubWFyay5hcHBseUNvbG9yVG9CYWNrZ3JvdW5kICYmICFtb2RlbC5oYXMoWCkgJiYgIW1vZGVsLmhhcyhZKVxuICAgICkge1xuICAgICAgLy8gYWRkIGJhY2tncm91bmQgdG8gJ3RleHQnIG1hcmtzIGlmIGhhcyBjb2xvclxuICAgICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICAgIG5hbWUgPyB7IG5hbWU6IG5hbWUgKyAnLWJhY2tncm91bmQnIH0gOiB7fSxcbiAgICAgICAge3R5cGU6ICdyZWN0J30sXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHtwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogdGV4dC5iYWNrZ3JvdW5kKG1vZGVsKSB9IH1cbiAgICAgICkpO1xuICAgIH1cblxuICAgIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgICAgbmFtZSA/IHsgbmFtZTogbmFtZSArICctbWFya3MnIH0gOiB7fSxcbiAgICAgIHsgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKCkgfSxcbiAgICAgIC8vIEFkZCBgZnJvbWAgaWYgbmVlZGVkXG4gICAgICAoIWlzRmFjZXRlZCB8fCBtb2RlbC5zdGFjaygpIHx8IHNvcnRCeSkgPyB7XG4gICAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgICAvLyBJZiBmYWNldGVkLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmVcbiAgICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAgIC8vIFN0YWNrZWQgQ2hhcnQgbmVlZCBhZGRpdGlvbmFsIHRyYW5zZm9ybVxuICAgICAgICAgIG1vZGVsLnN0YWNrKCkgfHwgc29ydEJ5ID8geyB0cmFuc2Zvcm06IFtdLmNvbmNhdChcbiAgICAgICAgICAgICAgKG1vZGVsLnN0YWNrKCkgPyBbc3RhY2tUcmFuc2Zvcm0obW9kZWwpXSA6IFtdKSxcbiAgICAgICAgICAgICAgc29ydEJ5ID8gW3t0eXBlOidzb3J0JywgYnk6IHNvcnRCeX1dIDogW11cbiAgICAgICAgICApfSA6IHt9XG4gICAgICAgIClcbiAgICAgIH0gOiB7fSxcbiAgICAgIC8vIHByb3BlcnRpZXMgZ3JvdXBzXG4gICAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfSB9XG4gICAgKSk7XG5cbiAgICBpZiAobW9kZWwuaGFzKExBQkVMKSAmJiBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKSB7XG4gICAgICBjb25zdCBsYWJlbFByb3BlcnRpZXMgPSBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKG1vZGVsKTtcblxuICAgICAgLy8gY2hlY2sgaWYgd2UgaGF2ZSBsYWJlbCBtZXRob2QgZm9yIGN1cnJlbnQgbWFyayB0eXBlLlxuICAgICAgaWYgKGxhYmVsUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7IC8vIElmIGxhYmVsIGlzIHN1cHBvcnRlZFxuICAgICAgICAvLyBhZGQgbGFiZWwgZ3JvdXBcbiAgICAgICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICAgICAgbmFtZSA/IHsgbmFtZTogbmFtZSArICctbGFiZWwnIH0gOiB7fSxcbiAgICAgICAgICB7dHlwZTogJ3RleHQnfSxcbiAgICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IHtmcm9tOiBkYXRhRnJvbX0sXG4gICAgICAgICAgLy8gUHJvcGVydGllc1xuICAgICAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IGxhYmVsUHJvcGVydGllcyB9IH1cbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtzO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIHBhdGggb3JkZXIgZm9yIHNvcnQgdHJhbnNmb3JtJ3MgYnkgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aE9yZGVyKG1vZGVsOiBNb2RlbCkge1xuICBpZiAobW9kZWwubWFyaygpID09PSBMSU5FICYmIG1vZGVsLmhhcyhQQVRIKSkge1xuICAgIC8vIEZvciBvbmx5IGxpbmUsIHNvcnQgYnkgdGhlIHBhdGggZmllbGQgaWYgaXQgaXMgc3BlY2lmaWVkLlxuXG4gICAgaWYgKGlzQXJyYXkobW9kZWwuc3BlYygpLmVuY29kaW5nW1BBVEhdKSkgeyAvLyBtdWx0aXBsZSBQQVRIIGZpZWxkc1xuICAgICAgcmV0dXJuIG1vZGVsLnNwZWMoKS5lbmNvZGluZ1tQQVRIXS5tYXAoZnVuY3Rpb24oZmllbGREZWYpe1xuICAgICAgICAvLyBhZGQgLSBwcmVmaXggZm9yIGRlc2NlbmRpbmdcbiAgICAgICAgcmV0dXJuIChmaWVsZERlZi5zb3J0ID09PSAnZGVzY2VuZGluZycgPyAnLScgOiAnJykgKyBmaWVsZERlZi5maWVsZDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7IC8vIFNpbmdsZSBQQVRIIGZpZWxkXG4gICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFBBVEgpO1xuICAgICAgLy8gYWRkIC0gcHJlZml4IGZvciBkZXNjZW5kaW5nXG4gICAgICByZXR1cm4gKGZpZWxkRGVmLnNvcnQgPT09ICdkZXNjZW5kaW5nJyA/ICctJyA6ICcnKSArIGZpZWxkRGVmLmZpZWxkO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIC8vIEZvciBib3RoIGxpbmUgYW5kIGFyZWEsIHdlIHNvcnQgdmFsdWVzIGJhc2VkIG9uIGRpbWVuc2lvbiBieSBkZWZhdWx0XG4gICAgcmV0dXJuICctJyArIG1vZGVsLmZpZWxkKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAnaG9yaXpvbnRhbCcgPyBZIDogWCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpc3Qgb2YgZGV0YWlsIGZpZWxkcyAoZm9yICdjb2xvcicsICdzaGFwZScsIG9yICdkZXRhaWwnIGNoYW5uZWxzKVxuICogdGhhdCB0aGUgbW9kZWwncyBzcGVjIGNvbnRhaW5zLlxuICovXG5mdW5jdGlvbiBkZXRhaWxGaWVsZHMobW9kZWw6IE1vZGVsKTogc3RyaW5nW10ge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIFNIQVBFXS5yZWR1Y2UoZnVuY3Rpb24oZGV0YWlscywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmFnZ3JlZ2F0ZSkge1xuICAgICAgZGV0YWlscy5wdXNoKG1vZGVsLmZpZWxkKGNoYW5uZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH0sIFtdKTtcbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSB2YXIgZXhwb3J0cztcblxuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5cbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7U0hBUkVEX0RPTUFJTl9PUFN9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBTSEFQRSwgU0laRSwgQ09MT1IsIFBBVEgsIFRFWFQsIERFVEFJTCwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1RBQ0tFRF9TQ0FMRX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge2lzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFFVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtNYXJrLCBCQVIsIFRFWFQgYXMgVEVYVF9NQVJLLCBUSUNLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7cmF3RG9tYWlufSBmcm9tICcuL3RpbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVNjYWxlcyhjaGFubmVsczogQ2hhbm5lbFtdLCBtb2RlbDogTW9kZWwpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmZpbHRlcihmdW5jdGlvbihjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbCAhPT0gREVUQUlMICYmIGNoYW5uZWwgIT09IFBBVEg7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICAgIHZhciBzY2FsZURlZjogYW55ID0ge1xuICAgICAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgICAgIHR5cGU6IHR5cGUoZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSksXG4gICAgICB9O1xuXG4gICAgICBzY2FsZURlZi5kb21haW4gPSBkb21haW4obW9kZWwsIGNoYW5uZWwsIHNjYWxlRGVmLnR5cGUpO1xuICAgICAgZXh0ZW5kKHNjYWxlRGVmLCByYW5nZU1peGlucyhtb2RlbCwgY2hhbm5lbCwgc2NhbGVEZWYudHlwZSkpO1xuXG4gICAgICAvLyBBZGQgb3B0aW9uYWwgcHJvcGVydGllc1xuICAgICAgW1xuICAgICAgICAvLyBnZW5lcmFsIHByb3BlcnRpZXNcbiAgICAgICAgJ3JldmVyc2UnLCAncm91bmQnLFxuICAgICAgICAvLyBxdWFudGl0YXRpdmUgLyB0aW1lXG4gICAgICAgICdjbGFtcCcsICduaWNlJyxcbiAgICAgICAgLy8gcXVhbnRpdGF0aXZlXG4gICAgICAgICdleHBvbmVudCcsICd6ZXJvJyxcbiAgICAgICAgLy8gb3JkaW5hbFxuICAgICAgICAnb3V0ZXJQYWRkaW5nJywgJ3BhZGRpbmcnLCAncG9pbnRzJ1xuICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIFRPRE8gaW5jbHVkZSBmaWVsZERlZiBhcyBwYXJ0IG9mIHRoZSBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZXhwb3J0c1twcm9wZXJ0eV0obW9kZWwsIGNoYW5uZWwsIHNjYWxlRGVmLnR5cGUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNjYWxlRGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHNjYWxlRGVmO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHlwZShmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwsIG1hcms6IE1hcmspOiBzdHJpbmcge1xuICBpZiAoY2hhbm5lbCA9PT0gREVUQUlMIHx8IGNoYW5uZWwgPT09IFBBVEgpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gbm8gc2NhbGUgZm9yIERFVEFJTCBhbmQgUEFUSFxuICB9XG5cbiAgc3dpdGNoIChmaWVsZERlZi50eXBlKSB7XG4gICAgY2FzZSBOT01JTkFMOlxuICAgICAgcmV0dXJuICdvcmRpbmFsJztcbiAgICBjYXNlIE9SRElOQUw6XG4gICAgICByZXR1cm4gJ29yZGluYWwnO1xuICAgIGNhc2UgVEVNUE9SQUw6XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgLy8gRklYTUUoIzg5MCkgaWYgdXNlciBzcGVjaWZ5IHNjYWxlLnJhbmdlIGFzIG9yZGluYWwgcHJlc2V0cywgdGhlbiB0aGlzIHNob3VsZCBiZSBvcmRpbmFsLlxuICAgICAgICAvLyBBbHNvLCBpZiB3ZSBzdXBwb3J0IGNvbG9yIHJhbXAsIHRoaXMgc2hvdWxkIGJlIG9yZGluYWwgdG9vLlxuICAgICAgICByZXR1cm4gJ3RpbWUnOyAvLyB0aW1lIGhhcyBvcmRlciwgc28gdXNlIGludGVycG9sYXRlZCBvcmRpbmFsIGNvbG9yIHNjYWxlLlxuICAgICAgfVxuICAgICAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEVdLCBjaGFubmVsKSkge1xuICAgICAgICByZXR1cm4gJ29yZGluYWwnO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkRGVmLnNjYWxlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmllbGREZWYuc2NhbGUudHlwZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4gJ29yZGluYWwnO1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIC8vIFJldHVybnMgb3JkaW5hbCBpZiAoMSkgdGhlIGNoYW5uZWwgaXMgWCBvciBZLCBhbmRcbiAgICAgICAgICAgIC8vICgyKSBpcyB0aGUgZGltZW5zaW9uIG9mIEJBUiBvciBUSUNLIG1hcmsuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgcmV0dXJuIGxpbmVhci5cbiAgICAgICAgICAgIHJldHVybiBjb250YWlucyhbQkFSLCBUSUNLXSwgbWFyaykgJiZcbiAgICAgICAgICAgICAgaXNEaW1lbnNpb24oZmllbGREZWYpID8gJ29yZGluYWwnIDogJ3RpbWUnO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyB5ZWFybW9udGgsIG1vbnRoZGF5LCAuLi5cbiAgICAgICAgICAgIHJldHVybiAnb3JkaW5hbCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAndGltZSc7XG5cbiAgICBjYXNlIFFVQU5USVRBVElWRTpcbiAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgLy8gVE9ETygjODkwKTogSWRlYWxseSBiaW5uZWQgQ09MT1Igc2hvdWxkIGJlIGFuIG9yZGluYWwgc2NhbGVcbiAgICAgICAgLy8gSG93ZXZlciwgY3VycmVudGx5IG9yZGluYWwgc2NhbGUgZG9lc24ndCBzdXBwb3J0IGNvbG9yIHJhbXAgeWV0LlxuICAgICAgICByZXR1cm4gY29udGFpbnMoW1gsIFksIENPTE9SXSwgY2hhbm5lbCkgPyAnbGluZWFyJyA6ICdvcmRpbmFsJztcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZERlZi5zY2FsZS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkRGVmLnNjYWxlLnR5cGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ2xpbmVhcic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpbihtb2RlbDogTW9kZWwsIGNoYW5uZWw6Q2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpIHtcbiAgdmFyIGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgaWYgKGZpZWxkRGVmLnNjYWxlLmRvbWFpbikgeyAvLyBleHBsaWNpdCB2YWx1ZVxuICAgIHJldHVybiBmaWVsZERlZi5zY2FsZS5kb21haW47XG4gIH1cblxuICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRlbXBvcmFsIHNjYWxlXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIGlmIChyYXdEb21haW4oZmllbGREZWYudGltZVVuaXQsIGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBmaWVsZERlZi50aW1lVW5pdCxcbiAgICAgICAgZmllbGQ6ICdkYXRlJ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgICAgb3A6ICdtaW4nXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEZvciBzdGFjaywgdXNlIFNUQUNLRUQgZGF0YS5cbiAgdmFyIHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgaWYgKHN0YWNrICYmIGNoYW5uZWwgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgIGlmKHN0YWNrLmNvbmZpZy5vZmZzZXQgPT09ICdub3JtYWxpemUnKSB7XG4gICAgICByZXR1cm4gWzAsIDFdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogU1RBQ0tFRF9TQ0FMRSxcbiAgICAgIC8vIFNUQUNLRURfU0NBTEUgcHJvZHVjZXMgc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3N1bV8nfSlcbiAgICB9O1xuICB9XG5cbiAgdmFyIHVzZVJhd0RvbWFpbiA9IF91c2VSYXdEb21haW4obW9kZWwsIGNoYW5uZWwsIHNjYWxlVHlwZSk7XG4gIHZhciBzb3J0ID0gZG9tYWluU29ydChtb2RlbCwgY2hhbm5lbCwgc2NhbGVUeXBlKTtcblxuICBpZiAodXNlUmF3RG9tYWluKSB7IC8vIHVzZVJhd0RvbWFpbiAtIG9ubHkgUS9UXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IFNPVVJDRSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7bm9BZ2dyZWdhdGU6IHRydWV9KVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpblxuICAgIHJldHVybiBzY2FsZVR5cGUgPT09ICdvcmRpbmFsJyA/IHtcbiAgICAgIC8vIG9yZGluYWwgYmluIHNjYWxlIHRha2VzIGRvbWFpbiBmcm9tIGJpbl9yYW5nZSwgb3JkZXJlZCBieSBiaW5fc3RhcnRcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3JhbmdlJyB9KSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgb3A6ICdtaW4nIC8vIG1pbiBvciBtYXggZG9lc24ndCBtYXR0ZXIgc2luY2Ugc2FtZSBfcmFuZ2Ugd291bGQgaGF2ZSB0aGUgc2FtZSBfc3RhcnRcbiAgICAgIH1cbiAgICB9IDogY2hhbm5lbCA9PT0gQ09MT1IgPyB7XG4gICAgICAvLyBDdXJyZW50bHksIGJpbm5lZCBvbiBjb2xvciB1c2VzIGxpbmVhciBzY2FsZSBhbmQgdGh1cyB1c2UgX3N0YXJ0IHBvaW50XG4gICAgICAvLyBUT0RPOiBUaGlzIGlkZWFsbHkgc2hvdWxkIGJlY29tZSBvcmRpbmFsIHNjYWxlIG9uY2Ugb3JkaW5hbCBzY2FsZSBzdXBwb3J0cyBjb2xvciByYW1wLlxuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgfSA6IHtcbiAgICAgIC8vIG90aGVyIGxpbmVhciBiaW4gc2NhbGUgbWVyZ2VzIGJvdGggYmluX3N0YXJ0IGFuZCBiaW5fZW5kIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogW1xuICAgICAgICBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIF1cbiAgICB9O1xuICB9IGVsc2UgaWYgKHNvcnQpIHsgLy8gaGF2ZSBzb3J0IC0tIG9ubHkgZm9yIG9yZGluYWxcbiAgICByZXR1cm4ge1xuICAgICAgLy8gSWYgc29ydCBieSBhZ2dyZWdhdGlvbiBvZiBhIHNwZWNpZmllZCBzb3J0IGZpZWxkLCB3ZSBuZWVkIHRvIHVzZSBTT1VSQ0UgdGFibGUsXG4gICAgICAvLyBzbyB3ZSBjYW4gYWdncmVnYXRlIHZhbHVlcyBmb3IgdGhlIHNjYWxlIGluZGVwZW5kZW50bHkgZnJvbSB0aGUgbWFpbiBhZ2dyZWdhdGlvbi5cbiAgICAgIGRhdGE6IHNvcnQub3AgPyBTT1VSQ0UgOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHNvcnRcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpblNvcnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IHN0cmluZyk6IGFueSB7XG4gIHZhciBzb3J0ID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuc29ydDtcbiAgaWYgKHNvcnQgPT09ICdhc2NlbmRpbmcnIHx8IHNvcnQgPT09ICdkZXNjZW5kaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gU29ydGVkIGJhc2VkIG9uIGFuIGFnZ3JlZ2F0ZSBjYWxjdWxhdGlvbiBvdmVyIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQgKG9ubHkgZm9yIG9yZGluYWwgc2NhbGUpXG4gIGlmIChzY2FsZVR5cGUgPT09ICdvcmRpbmFsJyAmJiB0eXBlb2Ygc29ydCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2UobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHZhciBzb3J0ID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuc29ydDtcbiAgcmV0dXJuIHNvcnQgJiYgKHR5cGVvZiBzb3J0ID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgIHNvcnQgPT09ICdkZXNjZW5kaW5nJyA6XG4gICAgICAgICAgICAgICAgICAgIHNvcnQub3JkZXIgPT09ICdkZXNjZW5kaW5nJ1xuICAgICAgICAgICAgICAgICApID8gdHJ1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdXNlUmF3RG9tYWluIHNob3VsZCBiZSBhY3RpdmF0ZWQgZm9yIHRoaXMgc2NhbGUuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0b25zIGFwcGxpZXM6XG4gKiAxLiBgdXNlUmF3RG9tYWluYCBpcyBlbmFibGVkIGVpdGhlciB0aHJvdWdoIHNjYWxlIG9yIGNvbmZpZ1xuICogMi4gQWdncmVnYXRpb24gZnVuY3Rpb24gaXMgbm90IGBjb3VudGAgb3IgYHN1bWBcbiAqIDMuIFRoZSBzY2FsZSBpcyBxdWFudGl0YXRpdmUgb3IgdGltZSBzY2FsZS5cbiAqL1xuZnVuY3Rpb24gX3VzZVJhd0RvbWFpbiAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IHN0cmluZykge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIHJldHVybiBmaWVsZERlZi5zY2FsZS51c2VSYXdEb21haW4gJiYgLy8gIGlmIHVzZVJhd0RvbWFpbiBpcyBlbmFibGVkXG4gICAgLy8gb25seSBhcHBsaWVkIHRvIGFnZ3JlZ2F0ZSB0YWJsZVxuICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJlxuICAgIC8vIG9ubHkgYWN0aXZhdGVkIGlmIHVzZWQgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZXMgdmFsdWVzIHJhbmdpbmcgaW4gdGhlIGRvbWFpbiBvZiB0aGUgc291cmNlIGRhdGFcbiAgICBTSEFSRURfRE9NQUlOX09QUy5pbmRleE9mKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkgPj0gMCAmJlxuICAgIChcbiAgICAgIC8vIFEgYWx3YXlzIHVzZXMgcXVhbnRpdGF0aXZlIHNjYWxlIGV4Y2VwdCB3aGVuIGl0J3MgYmlubmVkLlxuICAgICAgLy8gQmlubmVkIGZpZWxkIGhhcyBzaW1pbGFyIHZhbHVlcyBpbiBib3RoIHRoZSBzb3VyY2UgdGFibGUgYW5kIHRoZSBzdW1tYXJ5IHRhYmxlXG4gICAgICAvLyBidXQgdGhlIHN1bW1hcnkgdGFibGUgaGFzIGZld2VyIHZhbHVlcywgdGhlcmVmb3JlIGJpbm5lZCBmaWVsZHMgZHJhd1xuICAgICAgLy8gZG9tYWluIHZhbHVlcyBmcm9tIHRoZSBzdW1tYXJ5IHRhYmxlLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSAmJiAhZmllbGREZWYuYmluKSB8fFxuICAgICAgLy8gVCB1c2VzIG5vbi1vcmRpbmFsIHNjYWxlIHdoZW4gdGhlcmUncyBubyB1bml0IG9yIHdoZW4gdGhlIHVuaXQgaXMgbm90IG9yZGluYWwuXG4gICAgICAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgc2NhbGVUeXBlID09PSAnbGluZWFyJylcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFuZFdpZHRoKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpIHtcbiAgaWYgKHNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgcmV0dXJuIG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLmJhbmRXaWR0aDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8vIG9ubHkgcmV0dXJuIHZhbHVlIGlmIGV4cGxpY2l0IHZhbHVlIGlzIHNwZWNpZmllZC5cbiAgcmV0dXJuIG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLmNsYW1wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb25lbnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8vIG9ubHkgcmV0dXJuIHZhbHVlIGlmIGV4cGxpY2l0IHZhbHVlIGlzIHNwZWNpZmllZC5cbiAgcmV0dXJuIG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLmV4cG9uZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmljZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHNjYWxlVHlwZTogc3RyaW5nKSB7XG4gIGlmIChtb2RlbC5maWVsZERlZihjaGFubmVsKS5zY2FsZS5uaWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBleHBsaWNpdCB2YWx1ZVxuICAgIHJldHVybiBtb2RlbC5maWVsZERlZihjaGFubmVsKS5zY2FsZS5uaWNlO1xuICB9XG5cbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOiAvKiBmYWxsIHRocm91Z2ggKi9cbiAgICBjYXNlIFk6XG4gICAgICBpZiAoc2NhbGVUeXBlID09PSAndGltZScgfHwgc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBST1c6IC8qIGZhbGwgdGhyb3VnaCAqL1xuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVyUGFkZGluZyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHNjYWxlVHlwZTogc3RyaW5nKSB7XG4gIGlmIChzY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgIGlmIChtb2RlbC5maWVsZERlZihjaGFubmVsKS5zY2FsZS5vdXRlclBhZGRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLm91dGVyUGFkZGluZzsgLy8gZXhwbGljaXQgdmFsdWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmcobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IHN0cmluZykge1xuICBpZiAoc2NhbGVUeXBlID09PSAnb3JkaW5hbCcgJiYgY2hhbm5lbCAhPT0gUk9XICYmIGNoYW5uZWwgIT09IENPTFVNTikge1xuICAgIHJldHVybiBtb2RlbC5maWVsZERlZihjaGFubmVsKS5zY2FsZS5wYWRkaW5nO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludHMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IHN0cmluZykge1xuICBpZiAoc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICAgIGNhc2UgWDpcbiAgICAgIGNhc2UgWTpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlTWl4aW5zKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpOiBhbnkge1xuICB2YXIgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICBpZiAoc2NhbGVUeXBlID09PSAnb3JkaW5hbCcgJiYgZmllbGREZWYuc2NhbGUuYmFuZFdpZHRoKSB7XG4gICAgcmV0dXJuIHtiYW5kV2lkdGg6IGZpZWxkRGVmLnNjYWxlLmJhbmRXaWR0aH07XG4gIH1cblxuICBpZiAoZmllbGREZWYuc2NhbGUucmFuZ2UpIHsgLy8gZXhwbGljaXQgdmFsdWVcbiAgICByZXR1cm4ge3JhbmdlOiBmaWVsZERlZi5zY2FsZS5yYW5nZX07XG4gIH1cblxuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgICAvLyB3ZSBjYW4ndCB1c2Uge3JhbmdlOiBcIndpZHRoXCJ9IGhlcmUgc2luY2Ugd2UgcHV0IHNjYWxlIGluIHRoZSByb290IGdyb3VwXG4gICAgICAvLyBub3QgaW5zaWRlIHRoZSBjZWxsLCBzbyBzY2FsZSBpcyByZXVzYWJsZSBmb3IgYXhlcyBncm91cFxuICAgICAgcmV0dXJuIHtyYW5nZU1pbjogMCwgcmFuZ2VNYXg6IG1vZGVsLmxheW91dCgpLmNlbGxXaWR0aH07XG4gICAgY2FzZSBZOlxuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHtyYW5nZTogXCJoZWlnaHRcIn0gaGVyZSBmb3IgdGhlIHNhbWUgcmVhc29uXG4gICAgICBpZiAoc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZU1pbjogMCwgcmFuZ2VNYXg6IG1vZGVsLmxheW91dCgpLmNlbGxIZWlnaHR9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtyYW5nZU1pbjogbW9kZWwubGF5b3V0KCkuY2VsbEhlaWdodCwgcmFuZ2VNYXg6IDB9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIGlmIChtb2RlbC5pcyhCQVIpKSB7XG4gICAgICAgIC8vIFRPRE86IGRldGVybWluZSBiYW5kU2l6ZSBmb3IgYmluLCB3aGljaCBhY3R1YWxseSB1c2VzIGxpbmVhciBzY2FsZVxuICAgICAgICBjb25zdCBkaW1lbnNpb24gPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gJ2hvcml6b250YWwnID8gWSA6IFg7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IFsyLCBtb2RlbC5maWVsZERlZihkaW1lbnNpb24pLnNjYWxlLmJhbmRXaWR0aF19O1xuICAgICAgfSBlbHNlIGlmIChtb2RlbC5pcyhURVhUX01BUkspKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IFs4LCA0MF19O1xuICAgICAgfSBlbHNlIHsgLy8gcG9pbnQsIHNxdWFyZSwgY2lyY2xlXG4gICAgICAgIGNvbnN0IHhJc01lYXN1cmUgPSBtb2RlbC5pc01lYXN1cmUoWCk7XG4gICAgICAgIGNvbnN0IHlJc01lYXN1cmUgPSBtb2RlbC5pc01lYXN1cmUoWSk7XG5cbiAgICAgICAgY29uc3QgYmFuZFdpZHRoID0geElzTWVhc3VyZSAhPT0geUlzTWVhc3VyZSA/XG4gICAgICAgICAgbW9kZWwuZmllbGREZWYoeElzTWVhc3VyZSA/IFkgOiBYKS5zY2FsZS5iYW5kV2lkdGggOlxuICAgICAgICAgIE1hdGgubWluKG1vZGVsLmZpZWxkRGVmKFgpLnNjYWxlLmJhbmRXaWR0aCwgbW9kZWwuZmllbGREZWYoWSkuc2NhbGUuYmFuZFdpZHRoKTtcblxuICAgICAgICByZXR1cm4ge3JhbmdlOiBbMTAsIChiYW5kV2lkdGggLSAyKSAqIChiYW5kV2lkdGggLSAyKV19O1xuICAgICAgfVxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3JhbmdlOiAnc2hhcGVzJ307XG4gICAgY2FzZSBDT0xPUjpcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBOT01JTkFMXG4gICAgICAgIHx8IGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgLy8gRklYTUUgcmVtb3ZlIHRoaXMgb25jZSB3ZSBzdXBwb3J0IGNvbG9yIHJhbXAgZm9yIG9yZGluYWxcbiAgICAgICkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiAnY2F0ZWdvcnkxMCd9O1xuICAgICAgfSBlbHNlIHsgLy8gdGltZSBvciBxdWFudGl0YXRpdmVcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogWycjQUZDNkEzJywgJyMwOTYyMkEnXX07IC8vIHRhYmxlYXUgZ3JlZW5zXG4gICAgICB9XG4gICAgY2FzZSBST1c6XG4gICAgICByZXR1cm4ge3JhbmdlOiAnaGVpZ2h0J307XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4ge3JhbmdlOiAnd2lkdGgnfTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnNjYWxlLnJvdW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuc2NhbGUucm91bmQ7XG4gIH1cblxuICAvLyBGSVhNRTogcmV2aXNlIGlmIHJvdW5kIGlzIGFscmVhZHkgdGhlIGRlZmF1bHQgdmFsdWVcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOiAvKiBmYWxsIHRocm91Z2ggKi9cbiAgICBjYXNlIFk6XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8obW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHZhciBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICB2YXIgdGltZVVuaXQgPSBmaWVsZERlZi50aW1lVW5pdDtcblxuICBpZiAoZmllbGREZWYuc2NhbGUuemVybyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gZXhwbGljaXQgdmFsdWVcbiAgICByZXR1cm4gZmllbGREZWYuc2NhbGUuemVybztcbiAgfVxuXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIGlmICh0aW1lVW5pdCA9PT0gJ3llYXInKSB7XG4gICAgICAvLyB5ZWFyIGlzIHVzaW5nIGxpbmVhciBzY2FsZSwgYnV0IHNob3VsZCBub3QgaW5jbHVkZSB6ZXJvXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHRpbWVVbml0IG9yIHRoZSB0aW1lVW5pdCB1c2VzIG9yZGluYWwgc2NhbGUsXG4gICAgLy8gemVybyBwcm9wZXJ0eSBpcyBpZ25vcmVkIGJ5IHZlZ2Egc28gd2Ugc2hvdWxkIG5vdCBnZW5lcmF0ZSB0aGVtIGFueSB3YXlcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAvLyBSZXR1cm5zIGZhbHNlICh1bmRlZmluZWQpIGJ5IGRlZmF1bHQgb2YgYmluXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGNoYW5uZWwgPT09IFggfHwgY2hhbm5lbCA9PT0gWSA/XG4gICAgLy8gaWYgbm90IGJpbiAvIHRlbXBvcmFsLCByZXR1cm5zIHVuZGVmaW5lZCBmb3IgWCBhbmQgWSBlbmNvZGluZ1xuICAgIC8vIHNpbmNlIHplcm8gaXMgdHJ1ZSBieSBkZWZhdWx0IGluIHZlZ2EgZm9yIGxpbmVhciBzY2FsZVxuICAgIHVuZGVmaW5lZCA6XG4gICAgZmFsc2U7XG59XG4iLCJpbXBvcnQge1NwZWN9IGZyb20gJy4uL3NjaGVtYS9zY2hlbWEnO1xuaW1wb3J0IHtzdGFja0NvbmZpZyBhcyBzdGFja0NvbmZpZ1NjaGVtYX0gZnJvbSAnLi4vc2NoZW1hL2NvbmZpZy5zdGFjay5zY2hlbWEnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge2luc3RhbnRpYXRlfSBmcm9tICcuLi9zY2hlbWEvc2NoZW1hdXRpbCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgWSwgQ09MT1IsIERFVEFJTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0JBUiwgQVJFQX0gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2ZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7aGFzLCBpc0FnZ3JlZ2F0ZX0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FycmF5LCBjb250YWluc30gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7dHlwZSBhcyBzY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrUHJvcGVydGllcyB7XG4gIC8qKiBEaW1lbnNpb24gYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBncm91cGJ5Q2hhbm5lbDogQ2hhbm5lbDtcbiAgLyoqIE1lYXN1cmUgYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBmaWVsZENoYW5uZWw6IENoYW5uZWw7XG5cbiAgLyoqIFN0YWNrLWJ5IGZpZWxkIG5hbWVzIChmcm9tICdjb2xvcicgYW5kICdkZXRhaWwnKSAqL1xuICBzdGFja0ZpZWxkczogc3RyaW5nW107XG5cbiAgLyoqIFN0YWNrIGNvbmZpZyBmb3IgdGhlIHN0YWNrIHRyYW5zZm9ybS4gKi9cbiAgY29uZmlnOiBhbnk7XG59XG5cbi8vIFRPRE86IHB1dCBhbGwgdmVnYSBpbnRlcmZhY2UgaW4gb25lIHBsYWNlXG5pbnRlcmZhY2UgU3RhY2tUcmFuc2Zvcm0ge1xuICB0eXBlOiBzdHJpbmc7XG4gIG9mZnNldD86IGFueTtcbiAgZ3JvdXBieTogYW55O1xuICBmaWVsZDogYW55O1xuICBzb3J0Ynk6IGFueTtcbiAgb3V0cHV0OiBhbnk7XG59XG5cbi8qKiBDb21waWxlIHN0YWNrIHByb3BlcnRpZXMgZnJvbSBhIGdpdmVuIHNwZWMgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlU3RhY2tQcm9wZXJ0aWVzKHNwZWM6IFNwZWMpIHtcbiAgY29uc3Qgc3RhY2tGaWVsZHMgPSBnZXRTdGFja0ZpZWxkcyhzcGVjKTtcblxuICBpZiAoc3RhY2tGaWVsZHMubGVuZ3RoID4gMCAmJlxuICAgICAgY29udGFpbnMoW0JBUiwgQVJFQV0sIHNwZWMubWFyaykgJiZcbiAgICAgIHNwZWMuY29uZmlnLnN0YWNrICE9PSBmYWxzZSAmJlxuICAgICAgaXNBZ2dyZWdhdGUoc3BlYy5lbmNvZGluZykpIHtcblxuICAgIHZhciBpc1hNZWFzdXJlID0gaGFzKHNwZWMuZW5jb2RpbmcsIFgpICYmIGlzTWVhc3VyZShzcGVjLmVuY29kaW5nLngpO1xuICAgIHZhciBpc1lNZWFzdXJlID0gaGFzKHNwZWMuZW5jb2RpbmcsIFkpICYmIGlzTWVhc3VyZShzcGVjLmVuY29kaW5nLnkpO1xuXG4gICAgaWYgKGlzWE1lYXN1cmUgJiYgIWlzWU1lYXN1cmUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyb3VwYnlDaGFubmVsOiBZLFxuICAgICAgICBmaWVsZENoYW5uZWw6IFgsXG4gICAgICAgIHN0YWNrRmllbGRzOiBzdGFja0ZpZWxkcyxcbiAgICAgICAgY29uZmlnOiBzcGVjLmNvbmZpZy5zdGFjayA9PT0gdHJ1ZSAgPyBpbnN0YW50aWF0ZShzdGFja0NvbmZpZ1NjaGVtYSkgOiBzcGVjLmNvbmZpZy5zdGFja1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzWU1lYXN1cmUgJiYgIWlzWE1lYXN1cmUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyb3VwYnlDaGFubmVsOiBYLFxuICAgICAgICBmaWVsZENoYW5uZWw6IFksXG4gICAgICAgIHN0YWNrRmllbGRzOiBzdGFja0ZpZWxkcyxcbiAgICAgICAgY29uZmlnOiBzcGVjLmNvbmZpZy5zdGFjayA9PT0gdHJ1ZSAgPyBpbnN0YW50aWF0ZShzdGFja0NvbmZpZ1NjaGVtYSkgOiBzcGVjLmNvbmZpZy5zdGFja1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBDb21waWxlIHN0YWNrLWJ5IGZpZWxkIG5hbWVzIGZyb20gKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG5mdW5jdGlvbiBnZXRTdGFja0ZpZWxkcyhzcGVjOiBTcGVjKSB7XG4gIHJldHVybiBbQ09MT1IsIERFVEFJTF0ucmVkdWNlKGZ1bmN0aW9uKGZpZWxkcywgY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IHNwZWMuZW5jb2RpbmdbY2hhbm5lbF07XG4gICAgaWYgKGhhcyhzcGVjLmVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoY2hhbm5lbEVuY29kaW5nKSkge1xuICAgICAgICBjaGFubmVsRW5jb2RpbmcuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmllbGREZWY6IEZpZWxkRGVmID0gY2hhbm5lbEVuY29kaW5nO1xuICAgICAgICBmaWVsZHMucHVzaChmaWVsZChmaWVsZERlZiwge1xuICAgICAgICAgIGJpblN1ZmZpeDogc2NhbGVUeXBlKGZpZWxkRGVmLCBjaGFubmVsLCBzcGVjLm1hcmspID09PSAnb3JkaW5hbCcgPyAnX3JhbmdlJyA6ICdfc3RhcnQnXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkcztcbiAgfSwgW10pO1xufVxuXG4vLyBpbXB1dGUgZGF0YSBmb3Igc3RhY2tlZCBhcmVhXG5leHBvcnQgZnVuY3Rpb24gaW1wdXRlVHJhbnNmb3JtKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2ltcHV0ZScsXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgZ3JvdXBieTogc3RhY2suc3RhY2tGaWVsZHMsXG4gICAgb3JkZXJieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsKV0sXG4gICAgbWV0aG9kOiAndmFsdWUnLFxuICAgIHZhbHVlOiAwXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja1RyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBjb25zdCBzb3J0YnkgPSBzdGFjay5jb25maWcuc29ydCA9PT0gJ2FzY2VuZGluZycgP1xuICAgICAgICAgICAgICAgICAgIHN0YWNrLnN0YWNrRmllbGRzIDpcbiAgICAgICAgICAgICAgICAgaXNBcnJheShzdGFjay5jb25maWcuc29ydCkgP1xuICAgICAgICAgICAgICAgICAgIHN0YWNrLmNvbmZpZy5zb3J0IDpcbiAgICAgICAgICAgICAgICAgICAvLyBkZXNjZW5kaW5nLCBvciBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgc3RhY2suc3RhY2tGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy0nICsgZmllbGQ7XG4gICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgY29uc3QgdmFsTmFtZSA9IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCk7XG5cbiAgLy8gYWRkIHN0YWNrIHRyYW5zZm9ybSB0byBtYXJrXG4gIHZhciB0cmFuc2Zvcm06IFN0YWNrVHJhbnNmb3JtID0ge1xuICAgIHR5cGU6ICdzdGFjaycsXG4gICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsKV0sXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgc29ydGJ5OiBzb3J0YnksXG4gICAgb3V0cHV0OiB7XG4gICAgICBzdGFydDogdmFsTmFtZSArICdfc3RhcnQnLFxuICAgICAgZW5kOiB2YWxOYW1lICsgJ19lbmQnXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGFjay5jb25maWcub2Zmc2V0KSB7XG4gICAgdHJhbnNmb3JtLm9mZnNldCA9IHN0YWNrLmNvbmZpZy5vZmZzZXQ7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybTtcbn1cbiIsImltcG9ydCB7Y29udGFpbnMsIHJhbmdlfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFNIQVBFLCBDT0xPUiwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5cbi8qKiByZXR1cm5zIHRoZSB0ZW1wbGF0ZSBuYW1lIHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh0aW1lVW5pdCwgYWJicmV2aWF0ZWQgPSBmYWxzZSk6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGV0IGRhdGVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ3llYXInKSA+IC0xKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChhYmJyZXZpYXRlZCA/ICcleScgOiAnJVknKTtcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdtb250aCcpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyViJyA6ICclQicpO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ2RheScpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKHRpbWVVbml0LmluZGV4T2YoJ2RhdGUnKSA+IC0xKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaCgnJWQnKTtcbiAgfVxuXG4gIGxldCB0aW1lQ29tcG9uZW50cyA9IFtdO1xuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdob3VyJykgPiAtMSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVIJyk7XG4gIH1cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ21pbnV0ZScpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclTScpO1xuICB9XG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdzZWNvbmQnKSA+IC0xKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJVMnKTtcbiAgfVxuICBpZiAodGltZVVuaXQuaW5kZXhPZignbWlsbGlzZWNvbmRzJykgPiAtMSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVMJyk7XG4gIH1cblxuICBsZXQgb3V0ID0gW107XG4gIGlmIChkYXRlQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2goZGF0ZUNvbXBvbmVudHMuam9pbignLScpKTtcbiAgfVxuICBpZiAodGltZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKHRpbWVDb21wb25lbnRzLmpvaW4oJzonKSk7XG4gIH1cblxuICByZXR1cm4gb3V0Lmxlbmd0aCA+IDAgPyBvdXQuam9pbignICcpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHRpbWVVbml0OiBzdHJpbmcsIGZpZWxkUmVmOiBzdHJpbmcsIG9ubHlSZWYgPSBmYWxzZSk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSAnZGF0ZXRpbWUoJztcblxuICBmdW5jdGlvbiBnZXQoZnVuOiBzdHJpbmcsIGFkZENvbW1hID0gdHJ1ZSkge1xuICAgIGlmIChvbmx5UmVmKSB7XG4gICAgICByZXR1cm4gZmllbGRSZWYgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuICsgJygnICsgZmllbGRSZWYgKyAnKScgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCd5ZWFyJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ3llYXInKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzIwMDYsICc7IC8vIEphbnVhcnkgMSAyMDA2IGlzIGEgU3VuZGF5XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignbW9udGgnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnbW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtb250aCBzdGFydHMgYXQgMCBpbiBqYXZhc2NyaXB0XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgLy8gbmVlZCB0byBhZGQgMSBiZWNhdXNlIGRheXMgc3RhcnQgYXQgMVxuICBpZiAodGltZVVuaXQuaW5kZXhPZignZGF5JykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ2RheScsIGZhbHNlKSArICcrMSwgJztcbiAgfSBlbHNlIGlmICh0aW1lVW5pdC5pbmRleE9mKCdkYXRlJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ2RhdGUnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzEsICc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignaG91cnMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnaG91cnMnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignbWludXRlcycpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdtaW51dGVzJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ3NlY29uZHMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnc2Vjb25kcycpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdtaWxsaXNlY29uZHMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnbWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCc7XG4gIH1cblxuICByZXR1cm4gb3V0ICsgJyknO1xufVxuXG4vKiogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHJhdyBkb21haW4uICovXG5leHBvcnQgZnVuY3Rpb24gcmF3RG9tYWluKHRpbWVVbml0OiBzdHJpbmcsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEUsIENPTE9SXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNjApO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHJldHVybiByYW5nZSgwLCAyNCk7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA3KTtcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiByYW5nZSgxLCAzMik7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDEyKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9zY2hlbWEvZmllbGRkZWYuc2NoZW1hJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIFNJWkUsIENPTE9SLCBTSEFQRSwgVEVYVCwgTEFCRUwsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Zm9ybWF0IGFzIHRpbWVGb3JtYXRFeHByfSBmcm9tICcuL3RpbWUnO1xuaW1wb3J0IHtjb250YWluc30gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBlbnVtIENvbG9yTW9kZSB7XG4gIEFMV0FZU19GSUxMRUQsXG4gIEFMV0FZU19TVFJPS0VELFxuICBGSUxMRURfQllfREVGQVVMVCxcbiAgU1RST0tFRF9CWV9ERUZBVUxUXG59XG5cbmV4cG9ydCBjb25zdCBGSUxMX1NUUk9LRV9DT05GSUcgPSBbJ2ZpbGwnLCAnZmlsbE9wYWNpdHknLFxuICAnc3Ryb2tlJywgJ3N0cm9rZVdpZHRoJywgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCcsICdzdHJva2VPcGFjaXR5JyxcbiAgJ29wYWNpdHknXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsOiBNb2RlbCwgY29sb3JNb2RlOiBDb2xvck1vZGUgPSBDb2xvck1vZGUuU1RST0tFRF9CWV9ERUZBVUxUKSB7XG4gIGNvbnN0IGZpbGxlZCA9IGNvbG9yTW9kZSA9PT0gQ29sb3JNb2RlLkFMV0FZU19GSUxMRUQgPyB0cnVlIDpcbiAgICBjb2xvck1vZGUgPT09IENvbG9yTW9kZS5BTFdBWVNfU1RST0tFRCA/IGZhbHNlIDpcbiAgICAgIG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkICE9PSB1bmRlZmluZWQgPyBtb2RlbC5jb25maWcoKS5tYXJrLmZpbGxlZCA6XG4gICAgICAgIGNvbG9yTW9kZSA9PT0gQ29sb3JNb2RlLkZJTExFRF9CWV9ERUZBVUxUID8gdHJ1ZSA6XG4gICAgICAgICAgZmFsc2U7IC8vIENvbG9yTW9kZS5TVFJPS0VEX0JZX0RFRkFVTFRcblxuICAvLyBBcHBseSBmaWxsIGFuZCBzdHJva2UgY29uZmlnIGZpcnN0XG4gIC8vIHNvIHRoYXQgYGNvbG9yLnZhbHVlYCBjYW4gb3ZlcnJpZGUgYGZpbGxgIGFuZCBgc3Ryb2tlYCBjb25maWdcbiAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBGSUxMX1NUUk9LRV9DT05GSUcpO1xuXG4gIGlmIChmaWxsZWQpIHtcbiAgICBpZiAobW9kZWwuaGFzKENPTE9SKSkge1xuICAgICAgcC5maWxsID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5maWxsID0geyB2YWx1ZTogbW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgICBwLnN0cm9rZSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUilcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAuc3Ryb2tlID0geyB2YWx1ZTogbW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hcmtDb25maWcobWFya3NQcm9wZXJ0aWVzLCBtb2RlbDogTW9kZWwsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcHJvcHNMaXN0LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG1vZGVsLmNvbmZpZygpLm1hcmtbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXJrc1Byb3BlcnRpZXNbcHJvcGVydHldID0geyB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qKlxuICogQnVpbGRzIGFuIG9iamVjdCB3aXRoIGZvcm1hdCBhbmQgZm9ybWF0VHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSBmb3JtYXQgZXhwbGljaXRseSBzcGVjaWZpZWQgZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNaXhpbnMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBmb3JtYXQ6IHN0cmluZykge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIGlmKCFjb250YWlucyhbUVVBTlRJVEFUSVZFLCBURU1QT1JBTF0sIGZpZWxkRGVmLnR5cGUpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgbGV0IGRlZjogYW55ID0ge307XG5cbiAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgZGVmLmZvcm1hdFR5cGUgPSAndGltZSc7XG4gIH1cblxuICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWYuZm9ybWF0ID0gZm9ybWF0O1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAoZmllbGREZWYudHlwZSkge1xuICAgICAgY2FzZSBRVUFOVElUQVRJVkU6XG4gICAgICAgIGRlZi5mb3JtYXQgPSBtb2RlbC5jb25maWcoKS5udW1iZXJGb3JtYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBURU1QT1JBTDpcbiAgICAgICAgZGVmLmZvcm1hdCA9IHRpbWVGb3JtYXQobW9kZWwsIGNoYW5uZWwpIHx8IG1vZGVsLmNvbmZpZygpLnRpbWVGb3JtYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGFubmVsID09PSBURVhUKSB7XG4gICAgLy8gdGV4dCBkb2VzIG5vdCBzdXBwb3J0IGZvcm1hdCBhbmQgZm9ybWF0VHlwZVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2EvaXNzdWVzLzUwNVxuXG4gICAgY29uc3QgZmlsdGVyID0gKGRlZi5mb3JtYXRUeXBlIHx8ICdudW1iZXInKSArIChkZWYuZm9ybWF0ID8gJzpcXCcnICsgZGVmLmZvcm1hdCArICdcXCcnIDogJycpO1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB7XG4gICAgICAgIHRlbXBsYXRlOiAne3snICsgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBkYXR1bTogdHJ1ZSB9KSArICcgfCAnICsgZmlsdGVyICsgJ319J1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZGVmO1xufVxuXG5mdW5jdGlvbiBpc0FiYnJldmlhdGVkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5zaG9ydFRpbWVMYWJlbHM7XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIFNIQVBFOlxuICAgIGNhc2UgU0laRTpcbiAgICAgIHJldHVybiBtb2RlbC5sZWdlbmQoY2hhbm5lbCkuc2hvcnRUaW1lTGFiZWxzO1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5tYXJrLnNob3J0VGltZUxhYmVscztcbiAgICBjYXNlIExBQkVMOlxuICAgICAgLy8gVE9ETygjODk3KTogaW1wbGVtZW50IHdoZW4gd2UgaGF2ZSBsYWJlbFxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdGltZSBmb3JtYXQgdXNlZCBmb3IgYXhpcyBsYWJlbHMgZm9yIGEgdGltZSB1bml0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZUZvcm1hdChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBzdHJpbmcge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICByZXR1cm4gdGltZUZvcm1hdEV4cHIoZmllbGREZWYudGltZVVuaXQsIGlzQWJicmV2aWF0ZWQobW9kZWwsIGNoYW5uZWwsIGZpZWxkRGVmKSk7XG59XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGRhdGEuXG4gKi9cblxuaW1wb3J0IHtOT01JTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuXG5leHBvcnQgY29uc3QgU1VNTUFSWSA9ICdzdW1tYXJ5JztcbmV4cG9ydCBjb25zdCBTT1VSQ0UgPSAnc291cmNlJztcbmV4cG9ydCBjb25zdCBTVEFDS0VEX1NDQUxFID0gJ3N0YWNrZWRfc2NhbGUnO1xuZXhwb3J0IGNvbnN0IExBWU9VVCA9ICdsYXlvdXQnO1xuXG4vKiogTWFwcGluZyBmcm9tIGRhdGFsaWIncyBpbmZlcnJlZCB0eXBlIHRvIFZlZ2EtbGl0ZSdzIHR5cGUgKi9cbi8vIFRPRE86IEFMTF9DQVBTXG5leHBvcnQgY29uc3QgdHlwZXMgPSB7XG4gICdib29sZWFuJzogTk9NSU5BTCxcbiAgJ251bWJlcic6IFFVQU5USVRBVElWRSxcbiAgJ2ludGVnZXInOiBRVUFOVElUQVRJVkUsXG4gICdkYXRlJzogVEVNUE9SQUwsXG4gICdzdHJpbmcnOiBOT01JTkFMXG59O1xuIiwiLy8gdXRpbGl0eSBmb3IgZW5jb2RpbmcgbWFwcGluZ1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi9zY2hlbWEvZW5jb2Rpbmcuc2NoZW1hJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge0NoYW5uZWwsIENIQU5ORUxTfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY291bnRSZXRpbmFsKGVuY29kaW5nOiBFbmNvZGluZykge1xuICB2YXIgY291bnQgPSAwO1xuICBpZiAoZW5jb2RpbmcuY29sb3IpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcuc2l6ZSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaGFwZSkgeyBjb3VudCsrOyB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gQ0hBTk5FTFMuZmlsdGVyKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gaGFzKGVuY29kaW5nLCBjaGFubmVsKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nICYmIGVuY29kaW5nW2NoYW5uZWxdO1xuICByZXR1cm4gY2hhbm5lbEVuY29kaW5nICYmIChcbiAgICBjaGFubmVsRW5jb2RpbmcuZmllbGQgIT09IHVuZGVmaW5lZCB8fFxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgZm9yICh2YXIgayBpbiBlbmNvZGluZykge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGspICYmIGVuY29kaW5nW2tdLmFnZ3JlZ2F0ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRGVmcyhlbmNvZGluZzogRW5jb2RpbmcpOiBGaWVsZERlZltdIHtcbiAgdmFyIGFyciA9IFtdO1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoZW5jb2RpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIGVuY29kaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmaWVsZERlZik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2goZW5jb2RpbmdbY2hhbm5lbF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTogbnVtYmVyKSA9PiB2b2lkLFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgdmFyIGkgPSAwO1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoZW5jb2RpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIGVuY29kaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICAgIGYuY2FsbCh0aGlzQXJnLCBmaWVsZERlZiwgY2hhbm5lbCwgaSsrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgZW5jb2RpbmdbY2hhbm5lbF0sIGNoYW5uZWwsIGkrKyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgZTogRW5jb2RpbmcpID0+IGFueSxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIHZhciBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsLCBlbmNvZGluZykpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGYuY2FsbCh0aGlzQXJnLCBlbmNvZGluZ1tjaGFubmVsXSwgY2hhbm5lbCwgZW5jb2RpbmcpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgZTogRW5jb2RpbmcpID0+IGFueSxcbiAgICBpbml0LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgdmFyIHIgPSBpbml0O1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoZW5jb2RpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIGVuY29kaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICAgIHIgPSBmLmNhbGwodGhpc0FyZywgciwgZmllbGREZWYsIGNoYW5uZWwsIGVuY29kaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByID0gZi5jYWxsKHRoaXNBcmcsIHIsIGVuY29kaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBlbmNvZGluZyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHI7XG59XG4iLCIvLyB1dGlsaXR5IGZvciBhIGZpZWxkIGRlZmluaXRpb24gb2JqZWN0XG5cbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge2NvbnRhaW5zLCBnZXRiaW5zfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRSZWZPcHRpb24ge1xuICAvKiogZXhjbHVkZSBiaW4sIGFnZ3JlZ2F0ZSwgdGltZVVuaXQgKi9cbiAgbm9mbj86IGJvb2xlYW47XG4gIC8qKiBleGNsdWRlIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9uICovXG4gIG5vQWdncmVnYXRlPzogYm9vbGVhbjtcbiAgLyoqIGluY2x1ZGUgJ2RhdHVtLicgKi9cbiAgZGF0dW0/OiBib29sZWFuO1xuICAvKiogcmVwbGFjZSBmbiB3aXRoIGN1c3RvbSBmdW5jdGlvbiBwcmVmaXggKi9cbiAgZm4/OiBzdHJpbmc7XG4gIC8qKiBwcmVwZW5kIGZuIHdpdGggY3VzdG9tIGZ1bmN0aW9uIHByZWZpeCAqL1xuICBwcmVmbj86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiBmb3IgYmluIChkZWZhdWx0PSdfc3RhcnQnKSAqL1xuICBiaW5TdWZmaXg/OiBzdHJpbmc7XG4gIC8qKiBhcHBlbmQgc3VmZml4IHRvIHRoZSBmaWVsZCByZWYgKGdlbmVyYWwpICovXG4gIHN1ZmZpeD86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkKGZpZWxkRGVmOiBGaWVsZERlZiwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gIGNvbnN0IHByZWZpeCA9IChvcHQuZGF0dW0gPyAnZGF0dW0uJyA6ICcnKSArIChvcHQucHJlZm4gfHwgJycpO1xuICBjb25zdCBzdWZmaXggPSBvcHQuc3VmZml4IHx8ICcnO1xuICBjb25zdCBmaWVsZCA9IGZpZWxkRGVmLmZpZWxkO1xuXG4gIGlmIChpc0NvdW50KGZpZWxkRGVmKSkge1xuICAgIHJldHVybiBwcmVmaXggKyAnY291bnQnICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKG9wdC5mbikge1xuICAgIHJldHVybiBwcmVmaXggKyBvcHQuZm4gKyAnXycgKyBmaWVsZCArIHN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgZmllbGREZWYuYmluKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdiaW5fJyArIGZpZWxkICsgKG9wdC5iaW5TdWZmaXggfHwgc3VmZml4IHx8ICdfc3RhcnQnKTtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgIW9wdC5ub0FnZ3JlZ2F0ZSAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGREZWYuYWdncmVnYXRlICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLnRpbWVVbml0ICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSB8fCAhIWZpZWxkRGVmLmJpbiB8fFxuICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiAhIWZpZWxkRGVmLnRpbWVVbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZWFzdXJlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgIV9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IENPVU5UX0RJU1BMQVlOQU1FID0gJ051bWJlciBvZiBSZWNvcmRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50KCk6IEZpZWxkRGVmIHtcbiAgcmV0dXJuIHsgZmllbGQ6ICcqJywgYWdncmVnYXRlOiAnY291bnQnLCB0eXBlOiBRVUFOVElUQVRJVkUsIGRpc3BsYXlOYW1lOiBDT1VOVF9ESVNQTEFZTkFNRSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb3VudChmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9PT0gJ2NvdW50Jztcbn1cblxuLy8gRklYTUUgcmVtb3ZlIHRoaXMsIGFuZCB0aGUgZ2V0YmlucyBtZXRob2Rcbi8vIEZJWE1FIHRoaXMgZGVwZW5kcyBvbiBjaGFubmVsXG5leHBvcnQgZnVuY3Rpb24gY2FyZGluYWxpdHkoZmllbGREZWY6IEZpZWxkRGVmLCBzdGF0cywgZmlsdGVyTnVsbCA9IHt9KSB7XG4gIC8vIEZJWE1FIG5lZWQgdG8gdGFrZSBmaWx0ZXIgaW50byBhY2NvdW50XG5cbiAgdmFyIHN0YXQgPSBzdGF0c1tmaWVsZERlZi5maWVsZF07XG4gIHZhciB0eXBlID0gZmllbGREZWYudHlwZTtcblxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgLy8gbmVlZCB0byByZWFzc2lnbiBiaW4sIG90aGVyd2lzZSBjb21waWxhdGlvbiB3aWxsIGZhaWwgZHVlIHRvIGEgVFMgYnVnLlxuICAgIGNvbnN0IGJpbiA9IGZpZWxkRGVmLmJpbjtcbiAgICBsZXQgbWF4YmlucyA9ICh0eXBlb2YgYmluID09PSAnYm9vbGVhbicpID8gdW5kZWZpbmVkIDogYmluLm1heGJpbnM7XG4gICAgaWYgKG1heGJpbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4YmlucyA9IDEwO1xuICAgIH1cblxuICAgIHZhciBiaW5zID0gZ2V0YmlucyhzdGF0LCBtYXhiaW5zKTtcbiAgICByZXR1cm4gKGJpbnMuc3RvcCAtIGJpbnMuc3RhcnQpIC8gYmlucy5zdGVwO1xuICB9XG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIHZhciB0aW1lVW5pdCA9IGZpZWxkRGVmLnRpbWVVbml0O1xuICAgIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICAgIGNhc2UgJ3NlY29uZHMnOiByZXR1cm4gNjA7XG4gICAgICBjYXNlICdtaW51dGVzJzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSAnaG91cnMnOiByZXR1cm4gMjQ7XG4gICAgICBjYXNlICdkYXknOiByZXR1cm4gNztcbiAgICAgIGNhc2UgJ2RhdGUnOiByZXR1cm4gMzE7XG4gICAgICBjYXNlICdtb250aCc6IHJldHVybiAxMjtcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICB2YXIgeWVhcnN0YXQgPSBzdGF0c1sneWVhcl8nICsgZmllbGREZWYuZmllbGRdO1xuXG4gICAgICAgIGlmICgheWVhcnN0YXQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4geWVhcnN0YXQuZGlzdGluY3QgLVxuICAgICAgICAgIChzdGF0Lm1pc3NpbmcgPiAwICYmIGZpbHRlck51bGxbdHlwZV0gPyAxIDogMCk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSB1c2UgY2FsY3VsYXRpb24gYmVsb3dcbiAgfVxuICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyByZW1vdmUgbnVsbFxuICByZXR1cm4gc3RhdC5kaXN0aW5jdCAtXG4gICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICBpZiAoaXNDb3VudChmaWVsZERlZikpIHtcbiAgICByZXR1cm4gQ09VTlRfRElTUExBWU5BTUU7XG4gIH1cbiAgdmFyIGZuID0gZmllbGREZWYuYWdncmVnYXRlIHx8IGZpZWxkRGVmLnRpbWVVbml0IHx8IChmaWVsZERlZi5iaW4gJiYgJ2JpbicpO1xuICBpZiAoZm4pIHtcbiAgICByZXR1cm4gZm4udG9VcHBlckNhc2UoKSArICcoJyArIGZpZWxkRGVmLmZpZWxkICsgJyknO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmaWVsZERlZi5maWVsZDtcbiAgfVxufVxuIiwiZXhwb3J0IGVudW0gTWFyayB7XG4gIEFSRUEgPSAnYXJlYScgYXMgYW55LFxuICBCQVIgPSAnYmFyJyBhcyBhbnksXG4gIExJTkUgPSAnbGluZScgYXMgYW55LFxuICBQT0lOVCA9ICdwb2ludCcgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgVElDSyA9ICd0aWNrJyBhcyBhbnksXG4gIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgU1FVQVJFID0gJ3NxdWFyZScgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBBUkVBID0gTWFyay5BUkVBO1xuZXhwb3J0IGNvbnN0IEJBUiA9IE1hcmsuQkFSO1xuZXhwb3J0IGNvbnN0IExJTkUgPSBNYXJrLkxJTkU7XG5leHBvcnQgY29uc3QgUE9JTlQgPSBNYXJrLlBPSU5UO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBNYXJrLlRFWFQ7XG5leHBvcnQgY29uc3QgVElDSyA9IE1hcmsuVElDSztcblxuZXhwb3J0IGNvbnN0IENJUkNMRSA9IE1hcmsuQ0lSQ0xFO1xuZXhwb3J0IGNvbnN0IFNRVUFSRSA9IE1hcmsuU1FVQVJFO1xuIiwiZXhwb3J0IGludGVyZmFjZSBBeGlzIHtcbiAgLy8gVmVnYSBBeGlzIFByb3BlcnRpZXNcbiAgZm9ybWF0Pzogc3RyaW5nO1xuICBncmlkPzogYm9vbGVhbjtcbiAgbGF5ZXI/OiBzdHJpbmc7XG4gIG9mZnNldD86IG51bWJlcjtcbiAgb3JpZW50Pzogc3RyaW5nO1xuICBzdWJkaXZpZGU/OiBudW1iZXI7XG4gIHRpY2tzPzogbnVtYmVyO1xuICB0aWNrUGFkZGluZz86IG51bWJlcjtcbiAgdGlja1NpemU/OiBudW1iZXI7XG4gIHRpY2tTaXplTWFqb3I/OiBudW1iZXI7XG4gIHRpY2tTaXplTWlub3I/OiBudW1iZXI7XG4gIHRpY2tTaXplRW5kPzogbnVtYmVyO1xuICB0aXRsZT86IHN0cmluZztcbiAgdGl0bGVPZmZzZXQ/OiBudW1iZXI7XG4gIHZhbHVlcz86IG51bWJlcltdO1xuICBwcm9wZXJ0aWVzPzogYW55OyAvLyBUT0RPOiBkZWNsYXJlIFZnQXhpc1Byb3BlcnRpZXNcbiAgLy8gVmVnYS1MaXRlIG9ubHlcbiAgY2hhcmFjdGVyV2lkdGg/OiBudW1iZXI7XG4gIGxhYmVsTWF4TGVuZ3RoPzogbnVtYmVyO1xuICBsYWJlbHM/OiBib29sZWFuO1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuICB0aXRsZU1heExlbmd0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHZhciBheGlzID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczoge1xuICAgIC8qIFZlZ2EgQXhpcyBQcm9wZXJ0aWVzICovXG4gICAgZm9ybWF0OiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCwgIC8vIGF1dG9cbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgYXhpcyBsYWJlbHMuIElmIHVuZGVmaW5lZCwgYSBnb29kIGZvcm1hdCBpcyBhdXRvbWF0aWNhbGx5IGRldGVybWluZWQuIFZlZ2EtTGl0ZSB1c2VzIEQzXFwncyBmb3JtYXQgcGF0dGVybiBhbmQgYXV0b21hdGljYWxseSBzd2l0Y2hlcyB0byBkYXRldGltZSBmb3JtYXR0ZXJzLidcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQSBmbGFnIGluZGljYXRlIGlmIGdyaWRsaW5lcyBzaG91bGQgYmUgY3JlYXRlZCBpbiBhZGRpdGlvbiB0byB0aWNrcy4gSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIFJPVyBhbmQgQ09MLiBGb3IgWCBhbmQgWSwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBxdWFudGl0YXRpdmUgYW5kIHRpbWUgZmllbGRzIGFuZCBgZmFsc2VgIG90aGVyd2lzZS4nXG4gICAgfSxcbiAgICBsYXllcjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0Egc3RyaW5nIGluZGljYXRpbmcgaWYgdGhlIGF4aXMgKGFuZCBhbnkgZ3JpZGxpbmVzKSBzaG91bGQgYmUgcGxhY2VkIGFib3ZlIG9yIGJlbG93IHRoZSBkYXRhIG1hcmtzLidcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLidcbiAgICB9LFxuICAgIG9yaWVudDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBlbnVtOiBbJ3RvcCcsICdyaWdodCcsICdsZWZ0JywgJ2JvdHRvbSddLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgb3JpZW50YXRpb24gb2YgdGhlIGF4aXMuIE9uZSBvZiB0b3AsIGJvdHRvbSwgbGVmdCBvciByaWdodC4gVGhlIG9yaWVudGF0aW9uIGNhbiBiZSB1c2VkIHRvIGZ1cnRoZXIgc3BlY2lhbGl6ZSB0aGUgYXhpcyB0eXBlIChlLmcuLCBhIHkgYXhpcyBvcmllbnRlZCBmb3IgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIGNoYXJ0KS4nXG4gICAgfSxcbiAgICBzdWJkaXZpZGU6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdJZiBwcm92aWRlZCwgc2V0cyB0aGUgbnVtYmVyIG9mIG1pbm9yIHRpY2tzIGJldHdlZW4gbWFqb3IgdGlja3MgKHRoZSB2YWx1ZSA5IHJlc3VsdHMgaW4gZGVjaW1hbCBzdWJkaXZpc2lvbikuIE9ubHkgYXBwbGljYWJsZSBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLidcbiAgICB9LFxuICAgIHRpY2tzOiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBtaW5pbXVtOiAwLFxuICAgICAgZGVzY3JpcHRpb246ICdBIGRlc2lyZWQgbnVtYmVyIG9mIHRpY2tzLCBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLiBUaGUgcmVzdWx0aW5nIG51bWJlciBtYXkgYmUgZGlmZmVyZW50IHNvIHRoYXQgdmFsdWVzIGFyZSBcIm5pY2VcIiAobXVsdGlwbGVzIG9mIDIsIDUsIDEwKSBhbmQgbGllIHdpdGhpbiB0aGUgdW5kZXJseWluZyBzY2FsZVxcJ3MgcmFuZ2UuJ1xuICAgIH0sXG4gICAgdGlja1BhZGRpbmc6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aWNrcyBhbmQgdGV4dCBsYWJlbHMuJ1xuICAgIH0sXG4gICAgdGlja1NpemU6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIG1pbmltdW06IDAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yLCBtaW5vciBhbmQgZW5kIHRpY2tzLidcbiAgICB9LFxuICAgIHRpY2tTaXplTWFqb3I6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIG1pbmltdW06IDAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yIHRpY2tzLidcbiAgICB9LFxuICAgIHRpY2tTaXplTWlub3I6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIG1pbmltdW06IDAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1pbm9yIHRpY2tzLidcbiAgICB9LFxuICAgIHRpY2tTaXplRW5kOiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBtaW5pbXVtOiAwLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBlbmQgdGlja3MuJ1xuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdBIHRpdGxlIGZvciB0aGUgYXhpcy4gKFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LiknXG4gICAgfSxcbiAgICB0aXRsZU9mZnNldDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLCAgLy8gYXV0b1xuICAgICAgZGVzY3JpcHRpb246ICdBIHRpdGxlIG9mZnNldCB2YWx1ZSBmb3IgdGhlIGF4aXMuJ1xuICAgIH0sXG4gICAgdmFsdWVzOiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGF4aXMgc3R5bGluZy4nXG4gICAgfSxcbiAgICAvKiBWZWdhLWxpdGUgb25seSAqL1xuICAgIGNoYXJhY3RlcldpZHRoOiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICBkZWZhdWx0OiA2LFxuICAgICAgZGVzY3JpcHRpb246ICdDaGFyYWN0ZXIgd2lkdGggZm9yIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5pbmcgdGl0bGUgbWF4IGxlbmd0aC4nXG4gICAgfSxcbiAgICBsYWJlbE1heExlbmd0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVmYXVsdDogMjUsXG4gICAgICBtaW5pbXVtOiAxLFxuICAgICAgZGVzY3JpcHRpb246ICdUcnVuY2F0ZSBsYWJlbHMgdGhhdCBhcmUgdG9vIGxvbmcuJ1xuICAgIH0sXG4gICAgbGFiZWxzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSBsYWJlbHMuJ1xuICAgIH0sXG4gICAgc2hvcnRUaW1lTGFiZWxzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnV2hldGhlciBtb250aCBhbmQgZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC4nXG4gICAgfSxcbiAgICB0aXRsZU1heExlbmd0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgbWluaW11bTogMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTWF4IGxlbmd0aCBmb3IgYXhpcyB0aXRsZSBpZiB0aGUgdGl0bGUgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgZnJvbSB0aGUgZmllbGRcXCdzIGRlc2NyaXB0aW9uLicgK1xuICAgICAgJ0J5IGRlZmF1bHQsIHRoaXMgaXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiBjZWxsIHNpemUgYW5kIGNoYXJhY3RlcldpZHRoIHByb3BlcnR5LidcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQge1FVQU5USVRBVElWRX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge3RvTWFwfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCaW4ge1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgYmFzZT86IG51bWJlcjtcbiAgc3RlcD86IG51bWJlcjtcbiAgc3RlcHM/OiBudW1iZXJbXTtcbiAgbWluc3RlcD86IG51bWJlcjtcbiAgZGl2PzogbnVtYmVyW107XG4gIG1heGJpbnM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB2YXIgYmluID0ge1xuICB0eXBlOiBbJ2Jvb2xlYW4nLCAnb2JqZWN0J10sXG4gIGRlZmF1bHQ6IGZhbHNlLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgbWluOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG1pbmltdW0gYmluIHZhbHVlIHRvIGNvbnNpZGVyLiBJZiB1bnNwZWNpZmllZCwgdGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyB1c2VkLidcbiAgICB9LFxuICAgIG1heDoge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBtYXhpbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC4nXG4gICAgfSxcbiAgICBiYXNlOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG51bWJlciBiYXNlIHRvIHVzZSBmb3IgYXV0b21hdGljIGJpbiBkZXRlcm1pbmF0aW9uIChkZWZhdWx0IGlzIGJhc2UgMTApLidcbiAgICB9LFxuICAgIHN0ZXA6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdBbiBleGFjdCBzdGVwIHNpemUgdG8gdXNlIGJldHdlZW4gYmlucy4gSWYgcHJvdmlkZWQsIG9wdGlvbnMgc3VjaCBhcyBtYXhiaW5zIHdpbGwgYmUgaWdub3JlZC4nXG4gICAgfSxcbiAgICBzdGVwczoge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQW4gYXJyYXkgb2YgYWxsb3dhYmxlIHN0ZXAgc2l6ZXMgdG8gY2hvb3NlIGZyb20uJ1xuICAgIH0sXG4gICAgbWluc3RlcDoge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0EgbWluaW11bSBhbGxvd2FibGUgc3RlcCBzaXplIChwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBpbnRlZ2VyIHZhbHVlcykuJ1xuICAgIH0sXG4gICAgZGl2OiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdTY2FsZSBmYWN0b3JzIGluZGljYXRpbmcgYWxsb3dhYmxlIHN1YmRpdmlzaW9ucy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgWzUsIDJdLCB3aGljaCBpbmRpY2F0ZXMgdGhhdCBmb3IgYmFzZSAxMCBudW1iZXJzICh0aGUgZGVmYXVsdCBiYXNlKSwgdGhlIG1ldGhvZCBtYXkgY29uc2lkZXIgZGl2aWRpbmcgYmluIHNpemVzIGJ5IDUgYW5kL29yIDIuIEZvciBleGFtcGxlLCBmb3IgYW4gaW5pdGlhbCBzdGVwIHNpemUgb2YgMTAsIHRoZSBtZXRob2QgY2FuIGNoZWNrIGlmIGJpbiBzaXplcyBvZiAyICg9IDEwLzUpLCA1ICg9IDEwLzIpLCBvciAxICg9IDEwLyg1KjIpKSBtaWdodCBhbHNvIHNhdGlzZnkgdGhlIGdpdmVuIGNvbnN0cmFpbnRzLidcbiAgICB9LFxuICAgIG1heGJpbnM6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIG1pbmltdW06IDIsXG4gICAgICBkZXNjcmlwdGlvbjogJ01heGltdW0gbnVtYmVyIG9mIGJpbnMuJ1xuICAgIH1cbiAgfSxcbiAgc3VwcG9ydGVkVHlwZXM6IHRvTWFwKFtRVUFOVElUQVRJVkVdKSAvLyBUT0RPOiBhZGQgTyBhZnRlciBmaW5pc2hpbmcgIzgxXG59O1xuIiwiZXhwb3J0IGludGVyZmFjZSBDZWxsQ29uZmlnIHtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcblxuICBncmlkQ29sb3I/OiBzdHJpbmc7XG4gIGdyaWRPcGFjaXR5PzogbnVtYmVyO1xuICBncmlkT2Zmc2V0PzogbnVtYmVyO1xuXG4gIGZpbGw/OiBzdHJpbmc7XG4gIGZpbGxPcGFjaXR5PzogbnVtYmVyO1xuICBzdHJva2U/OiBzdHJpbmc7XG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICBzdHJva2VPcGFjaXR5PyA6bnVtYmVyO1xuICBzdHJva2VEYXNoPzogbnVtYmVyO1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgY2VsbENvbmZpZyA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVmYXVsdDogMjAwXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IDIwMFxuICAgIH0sXG4gICAgZ3JpZENvbG9yOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIHJvbGU6ICdjb2xvcicsXG4gICAgICBkZWZhdWx0OiAnIzAwMDAwMCdcbiAgICB9LFxuICAgIGdyaWRPcGFjaXR5OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIG1pbmltdW06IDAsXG4gICAgICBtYXhpbXVtOiAxLFxuICAgICAgZGVmYXVsdDogMC40XG4gICAgfSxcbiAgICBncmlkT2Zmc2V0OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgLy8gR3JvdXAgcHJvcGVydGllc1xuICAgIGNsaXA6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICB9LFxuICAgIGZpbGw6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgcm9sZTogJ2NvbG9yJyxcbiAgICAgIGRlZmF1bHQ6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH0sXG4gICAgZmlsbE9wYWNpdHk6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgIH0sXG4gICAgc3Ryb2tlOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIHJvbGU6ICdjb2xvcicsXG4gICAgfSxcbiAgICBzdHJva2VXaWR0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgfSxcbiAgICBzdHJva2VPcGFjaXR5OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgIH0sXG4gICAgc3Ryb2tlRGFzaDoge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgc3Ryb2tlRGFzaE9mZnNldDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS4nXG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIHtcbiAgZmlsbGVkPzogYm9vbGVhbjtcbiAgc29ydEJ5PzogU3RyaW5nIHwgU3RyaW5nW107XG5cbiAgLy8gR2VuZXJhbCBWZWdhXG4gIG9wYWNpdHk/OiBudW1iZXI7XG5cbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIHN0cm9rZURhc2g/OiBudW1iZXJbXTtcbiAgc3Ryb2tlRGFzaE9mZnNldD86IG51bWJlcltdO1xuICBmaWxsPzogc3RyaW5nO1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcbiAgc3Ryb2tlPzogc3RyaW5nO1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8vIEJhciAvIGFyZWFcbiAgb3JpZW50Pzogc3RyaW5nO1xuICAvLyBMaW5lIC8gYXJlYVxuICBpbnRlcnBvbGF0ZT86IHN0cmluZztcbiAgdGVuc2lvbj86IG51bWJlcjtcblxuICAvLyBUaWNrLW9ubHlcbiAgdGhpY2tuZXNzPzogbnVtYmVyO1xuXG4gIC8vIFRleHQtb25seVxuICBhbGlnbj86IHN0cmluZztcbiAgYW5nbGU/OiBudW1iZXI7XG4gIGJhc2VsaW5lPzogc3RyaW5nO1xuICBkeD86IG51bWJlcjtcbiAgZHk/OiBudW1iZXI7XG4gIHJhZGl1cz86IG51bWJlcjtcbiAgdGhldGE/OiBudW1iZXI7XG4gIGZvbnQ/OiBzdHJpbmc7XG4gIGZvbnRTdHlsZT86IHN0cmluZztcbiAgZm9udFdlaWdodD86IHN0cmluZztcbiAgLy8gVmVnYS1MaXRlIG9ubHkgZm9yIHRleHQgb25seVxuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG5cbiAgYXBwbHlDb2xvclRvQmFja2dyb3VuZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBtYXJrQ29uZmlnID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczoge1xuICAgIC8vIFZlZ2EtTGl0ZSBzcGVjaWFsXG4gICAgZmlsbGVkOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1doZXRoZXIgdGhlIHNoYXBlXFwncyBjb2xvciBzaG91bGQgYmUgdXNlZCBhcyBmaWxsIGNvbG9yIGluc3RlYWQgb2Ygc3Ryb2tlIGNvbG9yLiAnICtcbiAgICAgICAgJ1RoaXMgaXMgb25seSBhcHBsaWNhYmxlIGZvciBcImJhclwiLCBcInBvaW50XCIsIGFuZCBcImFyZWFcIi4gJyArXG4gICAgICAgICdBbGwgbWFya3MgZXhjZXB0IFwicG9pbnRcIiBtYXJrcyBhcmUgZmlsbGVkIGJ5IGRlZmF1bHQuJ1xuICAgIH0sXG4gICAgc29ydEJ5OiB7XG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBvbmVPZjogW1xuICAgICAgICB7dHlwZTogJ3N0cmluZyd9LFxuICAgICAgICB7dHlwZTogJ2FycmF5JywgaXRlbXM6e3R5cGU6J3N0cmluZyd9fVxuICAgICAgXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU29ydCBsYXllciBvZiBtYXJrcyBieSBhIGdpdmVuIGZpZWxkIG9yIGZpZWxkcy4nXG4gICAgfSxcbiAgICAvLyBHZW5lcmFsIFZlZ2FcbiAgICBmaWxsOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIHJvbGU6ICdjb2xvcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWRcbiAgICB9LFxuICAgIGZpbGxPcGFjaXR5OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCwgIC8vIGF1dG9cbiAgICAgIG1pbmltdW06IDAsXG4gICAgICBtYXhpbXVtOiAxXG4gICAgfSxcbiAgICBzdHJva2U6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgcm9sZTogJ2NvbG9yJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgc3Ryb2tlT3BhY2l0eToge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsICAvLyBhdXRvXG4gICAgICBtaW5pbXVtOiAwLFxuICAgICAgbWF4aW11bTogMVxuICAgIH0sXG4gICAgb3BhY2l0eToge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsICAvLyBhdXRvXG4gICAgICBtaW5pbXVtOiAwLFxuICAgICAgbWF4aW11bTogMVxuICAgIH0sXG4gICAgc3Ryb2tlV2lkdGg6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogMixcbiAgICAgIG1pbmltdW06IDBcbiAgICB9LFxuICAgIHN0cm9rZURhc2g6IHtcbiAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0FuIGFycmF5IG9mIGFsdGVybmF0aW5nIHN0cm9rZSwgc3BhY2UgbGVuZ3RocyBmb3IgY3JlYXRpbmcgZGFzaGVkIG9yIGRvdHRlZCBsaW5lcy4nXG4gICAgfSxcbiAgICBzdHJva2VEYXNoT2Zmc2V0OiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS4nXG4gICAgfSxcblxuICAgIC8vIGJhciAvIGFyZWFcbiAgICBvcmllbnQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgb3JpZW50YXRpb24gb2YgYSBub24tc3RhY2tlZCBiYXIsIGFyZWEsIGFuZCBsaW5lIGNoYXJ0cy4nICtcbiAgICAgICAnVGhlIHZhbHVlIGlzIGVpdGhlciBob3Jpem9udGFsIChkZWZhdWx0KSBvciB2ZXJ0aWNhbC4nICtcbiAgICAgICAnRm9yIGFyZWEsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgb3JpZW50IHByb3BlcnR5IG9mIHRoZSBWZWdhIG91dHB1dC4nICtcbiAgICAgICAnRm9yIGxpbmUsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgc29ydCBvcmRlciBvZiB0aGUgcG9pbnRzIGluIHRoZSBsaW5lIGlmIGBjb25maWcuc29ydExpbmVCeWAgaXMgbm90IHNwZWNpZmllZC4nICtcbiAgICAgICAnRm9yIHN0YWNrZWQgY2hhcnRzLCB0aGlzIGlzIGFsd2F5cyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3RhY2s7ICcgK1xuICAgICAgICd0aGVyZWZvcmUgZXhwbGljaXRseSBzcGVjaWZpZWQgdmFsdWUgd2lsbCBiZSBpZ25vcmVkLidcbiAgICB9LFxuXG4gICAgLy8gbGluZSAvIGFyZWFcbiAgICBpbnRlcnBvbGF0ZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAvLyBUT0RPIGJldHRlciBkZXNjcmliZSB0aGF0IHNvbWUgb2YgdGhlbSBpc24ndCBzdXBwb3J0ZWQgaW4gYXJlYVxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgbGluZSBpbnRlcnBvbGF0aW9uIG1ldGhvZCB0byB1c2UuIE9uZSBvZiBsaW5lYXIsIHN0ZXAtYmVmb3JlLCBzdGVwLWFmdGVyLCBiYXNpcywgYmFzaXMtb3BlbiwgYmFzaXMtY2xvc2VkLCBidW5kbGUsIGNhcmRpbmFsLCBjYXJkaW5hbC1vcGVuLCBjYXJkaW5hbC1jbG9zZWQsIG1vbm90b25lLidcbiAgICB9LFxuICAgIHRlbnNpb246IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdEZXBlbmRpbmcgb24gdGhlIGludGVycG9sYXRpb24gdHlwZSwgc2V0cyB0aGUgdGVuc2lvbiBwYXJhbWV0ZXIuJ1xuICAgIH0sXG5cbiAgICAvLyBUaWNrLW9ubHlcbiAgICB0aGlja25lc3M6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogMSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhpY2tuZXNzIG9mIHRoZSB0aWNrIG1hcmsuJ1xuICAgIH0sXG5cbiAgICAvLyB0ZXh0LW9ubHlcbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBlbnVtOiBbJ2xlZnQnLCAncmlnaHQnLCAnY2VudGVyJ10sXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIGxlZnQsIHJpZ2h0LCBjZW50ZXIuJ1xuICAgIH0sXG4gICAgYW5nbGU6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIHRleHQsIGluIGRlZ3JlZXMuJ1xuICAgIH0sXG4gICAgYmFzZWxpbmU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVmYXVsdDogJ21pZGRsZScsXG4gICAgICBlbnVtOiBbJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJ10sXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiB0b3AsIG1pZGRsZSwgYm90dG9tLidcbiAgICB9LFxuICAgIGR4OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGhvcml6b250YWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuJ1xuICAgIH0sXG4gICAgZHk6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgdmVydGljYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuJ1xuICAgIH0sXG4gICAgZm9udDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICByb2xlOiAnZm9udCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSB0eXBlZmFjZSB0byBzZXQgdGhlIHRleHQgaW4gKGUuZy4sIEhlbHZldGljYSBOZXVlKS4nXG4gICAgfSxcbiAgICAvLyBmb250U2l6ZSBleGNsdWRlZCBhcyB3ZSB1c2Ugc2l6ZS52YWx1ZVxuICAgIGZvbnRTdHlsZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBlbnVtOiBbJ25vcm1hbCcsICdpdGFsaWMnXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGZvbnQgc3R5bGUgKGUuZy4sIGl0YWxpYykuJ1xuICAgIH0sXG4gICAgZm9udFdlaWdodDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBlbnVtOiBbJ25vcm1hbCcsICdib2xkJ10sXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBmb250IHdlaWdodCAoZS5nLiwgYm9sZCkuJ1xuICAgIH0sXG4gICAgcmFkaXVzOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUG9sYXIgY29vcmRpbmF0ZSByYWRpYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuJ1xuICAgIH0sXG4gICAgdGhldGE6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdQb2xhciBjb29yZGluYXRlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgdGV4dCBsYWJlbCBmcm9tIHRoZSBvcmlnaW4gZGV0ZXJtaW5lZCBieSB0aGUgeCBhbmQgeSBwcm9wZXJ0aWVzLiBWYWx1ZXMgZm9yIHRoZXRhIGZvbGxvdyB0aGUgc2FtZSBjb252ZW50aW9uIG9mIGFyYyBtYXJrIHN0YXJ0QW5nbGUgYW5kIGVuZEFuZ2xlIHByb3BlcnRpZXM6IGFuZ2xlcyBhcmUgbWVhc3VyZWQgaW4gcmFkaWFucywgd2l0aCAwIGluZGljYXRpbmcgXCJub3J0aFwiLidcbiAgICB9LFxuICAgIC8vIHRleHQtb25seSAmIFZMIG9ubHlcbiAgICBmb3JtYXQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLCAgLy8gYXV0b1xuICAgICAgZGVzY3JpcHRpb246ICdUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciB0ZXh0IHZhbHVlLiBJZiBub3QgZGVmaW5lZCwgdGhpcyB3aWxsIGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseS4gJ1xuICAgIH0sXG4gICAgc2hvcnRUaW1lTGFiZWxzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnV2hldGhlciBtb250aCBuYW1lcyBhbmQgd2Vla2RheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuJ1xuICAgIH0sXG4gICAgYXBwbHlDb2xvclRvQmFja2dyb3VuZDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0FwcGx5IGNvbG9yIGZpZWxkIHRvIGJhY2tncm91bmQgY29sb3IgaW5zdGVhZCBvZiB0aGUgdGV4dC4nXG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGludGVyZmFjZSBTY2VuZUNvbmZpZyB7XG4gIGZpbGw/OiBzdHJpbmc7XG4gIGZpbGxPcGFjaXR5PzogbnVtYmVyO1xuICBzdHJva2U/OiBzdHJpbmc7XG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICBzdHJva2VPcGFjaXR5PyA6bnVtYmVyO1xuICBzdHJva2VEYXNoPzogbnVtYmVyO1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3Qgc2NlbmVDb25maWcgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgZmlsbDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICByb2xlOiAnY29sb3InXG4gICAgfSxcbiAgICBmaWxsT3BhY2l0eToge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgfSxcbiAgICBzdHJva2U6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgcm9sZTogJ2NvbG9yJyxcbiAgICB9LFxuICAgIHN0cm9rZVdpZHRoOiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICB9LFxuICAgIHN0cm9rZU9wYWNpdHk6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSxcbiAgICBzdHJva2VEYXNoOiB7XG4gICAgICB0eXBlOiAnYXJyYXknXG4gICAgfSxcbiAgICBzdHJva2VEYXNoT2Zmc2V0OiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LidcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQge1N0YWNrQ29uZmlnLCBzdGFja0NvbmZpZ30gZnJvbSAnLi9jb25maWcuc3RhY2suc2NoZW1hJztcbmltcG9ydCB7Q2VsbENvbmZpZywgY2VsbENvbmZpZ30gZnJvbSAnLi9jb25maWcuY2VsbC5zY2hlbWEnO1xuaW1wb3J0IHtNYXJrQ29uZmlnLCBtYXJrQ29uZmlnfSBmcm9tICcuL2NvbmZpZy5tYXJrcy5zY2hlbWEnO1xuaW1wb3J0IHtTY2VuZUNvbmZpZywgc2NlbmVDb25maWd9IGZyb20gJy4vY29uZmlnLnNjZW5lLnNjaGVtYSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgcGFkZGluZz86IG51bWJlcnxzdHJpbmc7XG4gIHZpZXdwb3J0PzogbnVtYmVyO1xuICBiYWNrZ3JvdW5kPzogc3RyaW5nO1xuXG4gIGNlbGw/OiBDZWxsQ29uZmlnO1xuICBtYXJrPzogTWFya0NvbmZpZztcbiAgc2NlbmU/OiBTY2VuZUNvbmZpZztcbiAgc3RhY2s/OiBTdGFja0NvbmZpZztcblxuICAvLyBUT0RPOiByZXZpc2VcbiAgdGV4dENlbGxXaWR0aD86IGFueTtcbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuICB0aW1lRm9ybWF0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczoge1xuICAgIC8vIHRlbXBsYXRlXG4gICAgLy8gVE9ETzogYWRkIHRoaXMgYmFjayBvbmNlIHdlIGhhdmUgdG9wLWRvd24gbGF5b3V0IGFwcHJvYWNoXG4gICAgLy8gd2lkdGg6IHtcbiAgICAvLyAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAvLyAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIC8vIH0sXG4gICAgLy8gaGVpZ2h0OiB7XG4gICAgLy8gICB0eXBlOiAnaW50ZWdlcicsXG4gICAgLy8gICBkZWZhdWx0OiB1bmRlZmluZWRcbiAgICAvLyB9LFxuICAgIC8vIHBhZGRpbmc6IHtcbiAgICAvLyAgIHR5cGU6IFsnbnVtYmVyJywgJ3N0cmluZyddLFxuICAgIC8vICAgZGVmYXVsdDogJ2F1dG8nXG4gICAgLy8gfSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIGl0ZW1zOiB7XG4gICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgfSxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG9uLXNjcmVlbiB2aWV3cG9ydCwgaW4gcGl4ZWxzLiBJZiBuZWNlc3NhcnksIGNsaXBwaW5nIGFuZCBzY3JvbGxpbmcgd2lsbCBiZSBhcHBsaWVkLidcbiAgICB9LFxuICAgIGJhY2tncm91bmQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgcm9sZTogJ2NvbG9yJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1NTIGNvbG9yIHByb3BlcnR5IHRvIHVzZSBhcyBiYWNrZ3JvdW5kIG9mIHZpc3VhbGl6YXRpb24uIERlZmF1bHQgaXMgYFwidHJhbnNwYXJlbnRcImAuJ1xuICAgIH0sXG5cbiAgICAvLyBmb3JtYXRzXG4gICAgbnVtYmVyRm9ybWF0OiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlZmF1bHQ6ICdzJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRDMgTnVtYmVyIGZvcm1hdCBmb3IgYXhpcyBsYWJlbHMgYW5kIHRleHQgdGFibGVzLiBGb3IgZXhhbXBsZSBcInNcIiBmb3IgU0kgdW5pdHMuJ1xuICAgIH0sXG4gICAgdGltZUZvcm1hdDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiAnJVktJW0tJWQnLFxuICAgICAgZGVzY3JpcHRpb246ICdEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLidcbiAgICB9LFxuXG4gICAgdGV4dENlbGxXaWR0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgZGVmYXVsdDogOTAsXG4gICAgICBtaW5pbXVtOiAwXG4gICAgfSxcblxuICAgIC8vIG5lc3RlZFxuICAgIHN0YWNrOiBzdGFja0NvbmZpZyxcbiAgICBjZWxsOiBjZWxsQ29uZmlnLFxuICAgIG1hcms6IG1hcmtDb25maWcsXG4gICAgc2NlbmU6IHNjZW5lQ29uZmlnXG4gIH1cbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIFN0YWNrQ29uZmlnIHtcbiAgc29ydD86IHN0cmluZ3xzdHJpbmdbXTtcbiAgb2Zmc2V0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3Qgc3RhY2tDb25maWcgPSB7XG4gIHR5cGU6IFsnYm9vbGVhbicsICdvYmplY3QnXSxcbiAgZGVmYXVsdDoge30sXG4gIGRlc2NyaXB0aW9uOiAnRW5hYmxlIHN0YWNraW5nIChmb3IgYmFyIGFuZCBhcmVhIG1hcmtzIG9ubHkpLicsXG4gIHByb3BlcnRpZXM6IHtcbiAgICBzb3J0OiB7XG4gICAgICBvbmVPZjogW3tcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGVudW06IFsnYXNjZW5kaW5nJywgJ2Rlc2NlbmRpbmcnXVxuICAgICAgfSx7XG4gICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIGl0ZW1zOiB7dHlwZTogJ3N0cmluZyd9LFxuICAgICAgfV0sXG4gICAgICBkZXNjcmlwdGlvbjogJ09yZGVyIG9mIHRoZSBzdGFjay4gJyArXG4gICAgICAgICdUaGlzIGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcgKGVpdGhlciBcImRlc2NlbmRpbmdcIiBvciBcImFzY2VuZGluZ1wiKScgK1xuICAgICAgICAnb3IgYSBsaXN0IG9mIGZpZWxkcyB0byBkZXRlcm1pbmUgdGhlIG9yZGVyIG9mIHN0YWNrIGxheWVycy4nICtcbiAgICAgICAgJ0J5IGRlZmF1bHQsIHN0YWNrIHVzZXMgZGVzY2VuZGluZyBvcmRlci4nXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZW51bTogWyd6ZXJvJywgJ2NlbnRlcicsICdub3JtYWxpemUnXVxuICAgICAgLy8gVE9ETygjNjIwKSByZWZlciB0byBWZWdhIHNwZWMgb25jZSBpdCBkb2Vzbid0IHRocm93IGVycm9yXG4gICAgICAvLyBlbnVtOiB2Z1N0YWNrU2NoZW1hLnByb3BlcnRpZXMub2Zmc2V0Lm9uZU9mWzBdLmVudW1cbiAgICB9XG4gIH1cbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICBmb3JtYXRUeXBlPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIHZhbHVlcz86IGFueVtdO1xufVxuXG5leHBvcnQgdmFyIGRhdGEgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgLy8gZGF0YSBzb3VyY2VcbiAgICBmb3JtYXRUeXBlOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGVudW06IFsnanNvbicsICdjc3YnLCAndHN2J10sXG4gICAgICBkZWZhdWx0OiAnanNvbidcbiAgICB9LFxuICAgIHVybDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWRcbiAgICB9LFxuICAgIHZhbHVlczoge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUGFzcyBhcnJheSBvZiBvYmplY3RzIGluc3RlYWQgb2YgYSB1cmwgdG8gYSBmaWxlLicsXG4gICAgICBpdGVtczoge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQge21lcmdlRGVlcH0gZnJvbSAnLi9zY2hlbWF1dGlsJztcbmltcG9ydCB7ZHVwbGljYXRlfSBmcm9tICcuLi91dGlsJztcblxuXG5pbXBvcnQge2F4aXN9IGZyb20gJy4vYXhpcy5zY2hlbWEnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGREZWYsIGZhY2V0RmllbGQsIG9ubHlPcmRpbmFsRmllbGQsIHR5cGljYWxGaWVsZH0gZnJvbSAnLi9maWVsZGRlZi5zY2hlbWEnO1xuaW1wb3J0IHtsZWdlbmR9IGZyb20gJy4vbGVnZW5kLnNjaGVtYSc7XG5pbXBvcnQge3NvcnR9IGZyb20gJy4vc29ydC5zY2hlbWEnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVuY29kaW5nIHtcbiAgeD86IEZpZWxkRGVmO1xuICB5PzogRmllbGREZWY7XG4gIHJvdz86IEZpZWxkRGVmO1xuICBjb2x1bW4/OiBGaWVsZERlZjtcbiAgY29sb3I/OiBGaWVsZERlZjtcbiAgc2l6ZT86IEZpZWxkRGVmO1xuICBzaGFwZT86IEZpZWxkRGVmO1xuICBwYXRoPzogRmllbGREZWYgfCBGaWVsZERlZltdO1xuICBkZXRhaWw/OiBGaWVsZERlZiB8IEZpZWxkRGVmW107XG4gIHRleHQ/OiBGaWVsZERlZjtcbiAgbGFiZWw/OiBGaWVsZERlZjtcbn1cblxudmFyIHggPSBtZXJnZURlZXAoZHVwbGljYXRlKHR5cGljYWxGaWVsZCksIHtcbiAgcmVxdWlyZWQ6IFsnZmllbGQnLCAndHlwZSddLCAvLyBUT0RPOiByZW1vdmUgaWYgcG9zc2libGVcbiAgcHJvcGVydGllczoge1xuICAgIHNjYWxlOiB7Ly8gcmVwbGFjaW5nIGRlZmF1bHQgdmFsdWVzIGZvciBqdXN0IHRoZXNlIHR3byBheGVzXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBhZGRpbmc6IHtkZWZhdWx0OiAxfSxcbiAgICAgICAgYmFuZFdpZHRoOiB7ZGVmYXVsdDogMjF9XG4gICAgICB9XG4gICAgfSxcbiAgICBheGlzOiBheGlzLFxuICAgIHNvcnQ6IHNvcnRcbiAgfVxufSk7XG5cbnZhciB5ID0gZHVwbGljYXRlKHgpO1xuXG52YXIgcm93ID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZShmYWNldEZpZWxkKSk7XG52YXIgY29sdW1uID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZShmYWNldEZpZWxkKSk7XG5cbnZhciBzaXplID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZSh0eXBpY2FsRmllbGQpLCB7XG4gIHByb3BlcnRpZXM6IHtcbiAgICBsZWdlbmQ6IGxlZ2VuZCxcbiAgICBzb3J0OiBzb3J0LFxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBtaW5pbXVtOiAwLFxuICAgICAgZGVzY3JpcHRpb246ICdTaXplIG9mIG1hcmtzLiBCeSBkZWZhdWx0LCB0aGlzIGlzIDMwIGZvciBwb2ludCwgc3F1YXJlLCBhbmQgY2lyY2xlLCBhbmQgMTAgZm9yIHRleHQuJ1xuICAgIH1cbiAgfVxufSk7XG5cbnZhciBjb2xvciA9IG1lcmdlRGVlcChkdXBsaWNhdGUodHlwaWNhbEZpZWxkKSwge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgbGVnZW5kOiBsZWdlbmQsXG4gICAgc29ydDogc29ydCxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICByb2xlOiAnY29sb3InLFxuICAgICAgZGVmYXVsdDogJyM0NjgyYjQnLFxuICAgICAgZGVzY3JpcHRpb246ICdDb2xvciB0byBiZSB1c2VkIGZvciBtYXJrcy4nXG4gICAgfSxcbiAgICBzY2FsZToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHF1YW50aXRhdGl2ZVJhbmdlOiB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBkZWZhdWx0OiBbJyNBRkM2QTMnLCAnIzA5NjIyQSddLCAvLyB0YWJsZWF1IGdyZWVuc1xuICAgICAgICAgIC8vIGRlZmF1bHQ6IFsnI2NjZWNlNicsICcjMDA0NDFiJ10sIC8vIEJ1R24uOSBbMi04XVxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ29sb3IgcmFuZ2UgdG8gZW5jb2RlIHF1YW50aXRhdGl2ZSB2YXJpYWJsZXMuJyxcbiAgICAgICAgICBtaW5JdGVtczogMixcbiAgICAgICAgICBtYXhJdGVtczogMixcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICByb2xlOiAnY29sb3InXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxudmFyIHNoYXBlID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZShvbmx5T3JkaW5hbEZpZWxkKSwge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgbGVnZW5kOiBsZWdlbmQsXG4gICAgc29ydDogc29ydCxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBlbnVtOiBbJ2NpcmNsZScsICdzcXVhcmUnLCAnY3Jvc3MnLCAnZGlhbW9uZCcsICd0cmlhbmdsZS11cCcsICd0cmlhbmdsZS1kb3duJ10sXG4gICAgICBkZWZhdWx0OiAnY2lyY2xlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTWFyayB0byBiZSB1c2VkLidcbiAgICB9XG4gIH1cbn0pO1xuXG52YXIgcGF0aCA9IHtcbiAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICBvbmVPZjogW2R1cGxpY2F0ZShmaWVsZERlZiksIHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBkdXBsaWNhdGUoZmllbGREZWYpXG4gIH1dXG59O1xuXG52YXIgZGV0YWlsID0ge1xuICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gIG9uZU9mOiBbZHVwbGljYXRlKGZpZWxkRGVmKSwge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IGR1cGxpY2F0ZShmaWVsZERlZilcbiAgfV1cbn07XG5cbi8vIHdlIG9ubHkgcHV0IGFnZ3JlZ2F0ZWQgbWVhc3VyZSBpbiBwaXZvdCB0YWJsZVxudmFyIHRleHQgPSBtZXJnZURlZXAoZHVwbGljYXRlKHR5cGljYWxGaWVsZCksIHtcbiAgcHJvcGVydGllczoge1xuICAgIHNvcnQ6IHNvcnQsXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVmYXVsdDogJ0FiYydcbiAgICB9XG4gIH1cbn0pO1xuXG52YXIgbGFiZWwgPSBtZXJnZURlZXAoZHVwbGljYXRlKHR5cGljYWxGaWVsZCksIHtcbiAgcHJvcGVyaWVzOiB7XG4gICAgc29ydDogc29ydFxuICB9XG59KTtcblxuZXhwb3J0IHZhciBlbmNvZGluZyA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICB4OiB4LFxuICAgIHk6IHksXG4gICAgcm93OiByb3csXG4gICAgY29sdW1uOiBjb2x1bW4sXG4gICAgc2l6ZTogc2l6ZSxcbiAgICBjb2xvcjogY29sb3IsXG4gICAgc2hhcGU6IHNoYXBlLFxuICAgIHBhdGg6IHBhdGgsXG4gICAgdGV4dDogdGV4dCxcbiAgICBkZXRhaWw6IGRldGFpbCxcbiAgICBsYWJlbDogbGFiZWxcbiAgfVxufTtcbiIsImltcG9ydCB7YXhpcywgQXhpc30gZnJvbSAnLi9heGlzLnNjaGVtYSc7XG5pbXBvcnQge2JpbiwgQmlufSBmcm9tICcuL2Jpbi5zY2hlbWEnO1xuaW1wb3J0IHtMZWdlbmR9IGZyb20gJy4vbGVnZW5kLnNjaGVtYSc7XG5pbXBvcnQge3R5cGljYWxTY2FsZSwgb3JkaW5hbE9ubHlTY2FsZSwgU2NhbGV9IGZyb20gJy4vc2NhbGUuc2NoZW1hJztcbmltcG9ydCB7c29ydCwgU29ydH0gZnJvbSAnLi9zb3J0LnNjaGVtYSc7XG5cbmltcG9ydCB7QUdHUkVHQVRFX09QU30gZnJvbSAnLi4vYWdncmVnYXRlJztcbmltcG9ydCB7dG9NYXAsIGR1cGxpY2F0ZX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge21lcmdlRGVlcH0gZnJvbSAnLi9zY2hlbWF1dGlsJztcbmltcG9ydCB7VElNRVVOSVRTfSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFFVQU5USVRBVElWRSwgVEVNUE9SQUwsIFR5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG4vKipcbiAqICBJbnRlcmZhY2UgZm9yIGFueSBraW5kIG9mIEZpZWxkRGVmO1xuICogIEZvciBzaW1wbGljaXR5LCB3ZSBkbyBub3QgZGVjbGFyZSBtdWx0aXBsZSBpbnRlcmZhY2VzIG9mIEZpZWxkRGVmIGxpa2VcbiAqICB3ZSBkbyBmb3IgSlNPTiBzY2hlbWEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGREZWYge1xuICBmaWVsZD86IHN0cmluZztcbiAgdHlwZT86IFR5cGU7XG4gIHZhbHVlPzogYW55O1xuXG4gIC8vIGZ1bmN0aW9uXG4gIHRpbWVVbml0Pzogc3RyaW5nO1xuICBiaW4/OiBib29sZWFuIHwgQmluO1xuXG4gIGFnZ3JlZ2F0ZT86IHN0cmluZztcbiAgc29ydD86IFNvcnQgfCBzdHJpbmc7XG5cbiAgLy8gb3ZlcnJpZGUgdmVnYSBjb21wb25lbnRzXG4gIGF4aXM/OiBBeGlzIHwgYm9vbGVhbjtcbiAgbGVnZW5kPzogTGVnZW5kIHwgYm9vbGVhbjtcbiAgc2NhbGU/OiBTY2FsZTtcblxuICAvLyBUT0RPOiBtYXliZSBleHRlbmQgdGhpcyBpbiBvdGhlciBhcHA/XG4gIC8vIHVudXNlZCBtZXRhZGF0YSAtLSBmb3Igb3RoZXIgYXBwbGljYXRpb25cbiAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB2YXIgZmllbGREZWYgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgZmllbGQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGVudW06IFtOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMXVxuICAgIH0sXG4gICAgdGltZVVuaXQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZW51bTogVElNRVVOSVRTLFxuICAgICAgc3VwcG9ydGVkVHlwZXM6IHRvTWFwKFtURU1QT1JBTF0pXG4gICAgfSxcbiAgICBiaW46IGJpbixcbiAgfVxufTtcblxuZXhwb3J0IHZhciBhZ2dyZWdhdGUgPSB7XG4gIHR5cGU6ICdzdHJpbmcnLFxuICBlbnVtOiBBR0dSRUdBVEVfT1BTLFxuICBzdXBwb3J0ZWRFbnVtczoge1xuICAgIHF1YW50aXRhdGl2ZTogQUdHUkVHQVRFX09QUyxcbiAgICBvcmRpbmFsOiBbJ21lZGlhbicsJ21pbicsJ21heCddLFxuICAgIG5vbWluYWw6IFtdLFxuICAgIHRlbXBvcmFsOiBbJ21lYW4nLCAnbWVkaWFuJywgJ21pbicsICdtYXgnXSwgLy8gVE9ETzogcmV2aXNlIHdoYXQgc2hvdWxkIHRpbWUgc3VwcG9ydFxuICAgICcnOiBbJ2NvdW50J11cbiAgfSxcbiAgc3VwcG9ydGVkVHlwZXM6IHRvTWFwKFtRVUFOVElUQVRJVkUsIE5PTUlOQUwsIE9SRElOQUwsIFRFTVBPUkFMLCAnJ10pXG59O1xuXG5leHBvcnQgdmFyIHR5cGljYWxGaWVsZCA9IG1lcmdlRGVlcChkdXBsaWNhdGUoZmllbGREZWYpLCB7XG4gIHByb3BlcnRpZXM6IHtcbiAgICBhZ2dyZWdhdGU6IGFnZ3JlZ2F0ZSxcbiAgICBzY2FsZTogdHlwaWNhbFNjYWxlXG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIG9ubHlPcmRpbmFsRmllbGQgPSBtZXJnZURlZXAoZHVwbGljYXRlKGZpZWxkRGVmKSwge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgc2NhbGU6IG9yZGluYWxPbmx5U2NhbGVcbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgZmFjZXRGaWVsZCA9IG1lcmdlRGVlcChkdXBsaWNhdGUob25seU9yZGluYWxGaWVsZCksIHtcbiAgcmVxdWlyZWQ6IFsnZmllbGQnLCAndHlwZSddLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgYXhpczogYXhpcyxcbiAgICBzb3J0OiBzb3J0XG4gIH1cbn0pO1xuIiwiZXhwb3J0IGludGVyZmFjZSBMZWdlbmQge1xuICBvcmllbnQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIHZhbHVlcz86IEFycmF5PGFueT47XG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE8gZGVjbGFyZSBWZ0xlZ2VuZFByb3BlcnRpZXNcblxuICAvLyBWZWdhLUxpdGUgb25seVxuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdmFyIGxlZ2VuZCA9IHtcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgZGVzY3JpcHRpb246ICdQcm9wZXJ0aWVzIG9mIGEgbGVnZW5kIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBzaG93IGl0LicsXG4gIG9uZU9mOiBbe1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG9yaWVudDoge1xuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBvcmllbnRhdGlvbiBvZiB0aGUgbGVnZW5kLiBPbmUgb2YgXCJsZWZ0XCIgb3IgXCJyaWdodFwiLiBUaGlzIGRldGVybWluZXMgaG93IHRoZSBsZWdlbmQgaXMgcG9zaXRpb25lZCB3aXRoaW4gdGhlIHNjZW5lLiBUaGUgZGVmYXVsdCBpcyBcInJpZ2h0XCIuJ1xuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSB0aXRsZSBmb3IgdGhlIGxlZ2VuZC4gKFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LiknXG4gICAgICB9LFxuICAgICAgZm9ybWF0OiB7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQW4gb3B0aW9uYWwgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBsZWdlbmQgbGFiZWxzLiBWZWdhIHVzZXMgRDNcXCdzIGZvcm1hdCBwYXR0ZXJuLidcbiAgICAgIH0sXG4gICAgICB2YWx1ZXM6IHtcbiAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0V4cGxpY2l0bHkgc2V0IHRoZSB2aXNpYmxlIGxlZ2VuZCB2YWx1ZXMuJ1xuICAgICAgfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gbGVnZW5kIHN0eWxpbmcuICdcbiAgICAgIH0sXG5cbiAgICAgIC8qIFZlZ2EtbGl0ZSBvbmx5ICovXG4gICAgICBzaG9ydFRpbWVMYWJlbHM6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC4nXG4gICAgICB9XG4gICAgfSxcbiAgfSwge1xuICAgIHR5cGU6ICdib29sZWFuJ1xuICB9XVxufTtcbiIsImV4cG9ydCB2YXIgbWFyayA9IHtcbiAgdHlwZTogJ3N0cmluZycsXG4gIGVudW06IFsncG9pbnQnLCAndGljaycsICdiYXInLCAnbGluZScsICdhcmVhJywgJ2NpcmNsZScsICdzcXVhcmUnLCAndGV4dCddXG59O1xuIiwiaW1wb3J0IHt0b01hcCwgZHVwbGljYXRlIGFzIGNsb25lfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7bWVyZ2VEZWVwfSBmcm9tICcuL3NjaGVtYXV0aWwnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZSB7XG4gIHR5cGU/OiBzdHJpbmc7XG4gIGRvbWFpbj86IGFueTsgLy8gVE9ETzogZGVjbGFyZSB2Z0RhdGFEb21haW5cbiAgcmFuZ2U/OiBhbnk7IC8vIFRPRE86IGRlY2xhcmUgdmdSYW5nZURvbWFpblxuICByb3VuZD86IGJvb2xlYW47XG5cbiAgLy8gb3JkaW5hbFxuICBiYW5kV2lkdGg/OiBudW1iZXI7XG4gIG91dGVyUGFkZGluZz86IG51bWJlcjtcbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvLyB0eXBpY2FsXG4gIGNsYW1wPzogYm9vbGVhbjtcbiAgbmljZT86IGJvb2xlYW58c3RyaW5nO1xuICBleHBvbmVudD86IG51bWJlcjtcbiAgemVybz86IGJvb2xlYW47XG5cbiAgLy8gY29sb3IgY2hhbm5lbCBvbmx5XG4gIHF1YW50aXRhdGl2ZVJhbmdlPyA6IHN0cmluZ1tdO1xuXG4gIC8vIFZlZ2EtTGl0ZSBvbmx5XG4gIHVzZVJhd0RvbWFpbj86IGJvb2xlYW47XG59XG5cbnZhciBzY2FsZSA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIC8vIFRPRE86IHJlZmVyIHRvIFZlZ2EncyBzY2FsZSBzY2hlbWFcbiAgcHJvcGVydGllczoge1xuICAgIC8qIENvbW1vbiBTY2FsZSBQcm9wZXJ0aWVzICovXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBlbnVtOiBbJ2xpbmVhcicsICdsb2cnLCAncG93JywgJ3NxcnQnLCAncXVhbnRpbGUnLCAnb3JkaW5hbCddLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgc3VwcG9ydGVkVHlwZXM6IHRvTWFwKFtRVUFOVElUQVRJVkVdKVxuICAgIH0sXG4gICAgZG9tYWluOiB7XG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICB0eXBlOiBbJ2FycmF5JywgJ29iamVjdCddLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgZG9tYWluIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgZGF0YSB2YWx1ZXMuIEZvciBxdWFudGl0YXRpdmUgZGF0YSwgdGhpcyBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsL2NhdGVnb3JpY2FsIGRhdGEsIHRoaXMgbWF5IGJlIGFuIGFycmF5IG9mIHZhbGlkIGlucHV0IHZhbHVlcy4gVGhlIGRvbWFpbiBtYXkgYWxzbyBiZSBzcGVjaWZpZWQgYnkgYSByZWZlcmVuY2UgdG8gYSBkYXRhIHNvdXJjZS4nXG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgdHlwZTogWydhcnJheScsICdvYmplY3QnLCAnc3RyaW5nJ10sXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSByYW5nZSBvZiB0aGUgc2NhbGUsIHJlcHJlc2VudGluZyB0aGUgc2V0IG9mIHZpc3VhbCB2YWx1ZXMuIEZvciBudW1lcmljIHZhbHVlcywgdGhlIHJhbmdlIGNhbiB0YWtlIHRoZSBmb3JtIG9mIGEgdHdvLWVsZW1lbnQgYXJyYXkgd2l0aCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gRm9yIG9yZGluYWwgb3IgcXVhbnRpemVkIGRhdGEsIHRoZSByYW5nZSBtYXkgYnkgYW4gYXJyYXkgb2YgZGVzaXJlZCBvdXRwdXQgdmFsdWVzLCB3aGljaCBhcmUgbWFwcGVkIHRvIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgZG9tYWluLiBGb3Igb3JkaW5hbCBzY2FsZXMgb25seSwgdGhlIHJhbmdlIGNhbiBiZSBkZWZpbmVkIHVzaW5nIGEgRGF0YVJlZjogdGhlIHJhbmdlIHZhbHVlcyBhcmUgdGhlbiBkcmF3biBkeW5hbWljYWxseSBmcm9tIGEgYmFja2luZyBkYXRhIHNldC4nXG4gICAgfSxcbiAgICByb3VuZDoge1xuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLCAvLyBUT0RPOiByZXZpc2UgZGVmYXVsdFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVzY3JpcHRpb246ICdJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC4nXG4gICAgfVxuICB9XG59O1xuXG5cbnZhciBvcmRpbmFsU2NhbGVNaXhpbiA9IHtcbiAgcHJvcGVydGllczoge1xuICAgIGJhbmRXaWR0aDoge1xuICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgbWluaW11bTogMCxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgLyogT3JkaW5hbCBTY2FsZSBQcm9wZXJ0aWVzICovXG4gICAgb3V0ZXJQYWRkaW5nOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgICAgLy8gVE9ETzogYWRkIGRlc2NyaXB0aW9uIG9uY2UgaXQgaXMgZG9jdW1lbnRlZCBpbiBWZWdhXG4gICAgfSxcbiAgICBwYWRkaW5nOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQXBwbGllcyBzcGFjaW5nIGFtb25nIG9yZGluYWwgZWxlbWVudHMgaW4gdGhlIHNjYWxlIHJhbmdlLiBUaGUgYWN0dWFsIGVmZmVjdCBkZXBlbmRzIG9uIGhvdyB0aGUgc2NhbGUgaXMgY29uZmlndXJlZC4gSWYgdGhlIF9fcG9pbnRzX18gcGFyYW1ldGVyIGlzIGB0cnVlYCwgdGhlIHBhZGRpbmcgdmFsdWUgaXMgaW50ZXJwcmV0ZWQgYXMgYSBtdWx0aXBsZSBvZiB0aGUgc3BhY2luZyBiZXR3ZWVuIHBvaW50cy4gQSByZWFzb25hYmxlIHZhbHVlIGlzIDEuMCwgc3VjaCB0aGF0IHRoZSBmaXJzdCBhbmQgbGFzdCBwb2ludCB3aWxsIGJlIG9mZnNldCBmcm9tIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIGJ5IGhhbGYgdGhlIGRpc3RhbmNlIGJldHdlZW4gcG9pbnRzLiBPdGhlcndpc2UsIHBhZGRpbmcgaXMgdHlwaWNhbGx5IGluIHRoZSByYW5nZSBbMCwgMV0gYW5kIGNvcnJlc3BvbmRzIHRvIHRoZSBmcmFjdGlvbiBvZiBzcGFjZSBpbiB0aGUgcmFuZ2UgaW50ZXJ2YWwgdG8gYWxsb2NhdGUgdG8gcGFkZGluZy4gQSB2YWx1ZSBvZiAwLjUgbWVhbnMgdGhhdCB0aGUgcmFuZ2UgYmFuZCB3aWR0aCB3aWxsIGJlIGVxdWFsIHRvIHRoZSBwYWRkaW5nIHdpZHRoLiBGb3IgbW9yZSwgc2VlIHRoZSBbRDMgb3JkaW5hbCBzY2FsZSBkb2N1bWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vbWJvc3RvY2svZDMvd2lraS9PcmRpbmFsLVNjYWxlcykuJ1xuICAgIH1cbiAgfVxufTtcblxudmFyIHR5cGljYWxTY2FsZU1peGluID0ge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgLyogUXVhbnRpdGF0aXZlIGFuZCB0ZW1wb3JhbCBTY2FsZSBQcm9wZXJ0aWVzICovXG4gICAgY2xhbXA6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0lmIHRydWUsIHZhbHVlcyB0aGF0IGV4Y2VlZCB0aGUgZGF0YSBkb21haW4gYXJlIGNsYW1wZWQgdG8gZWl0aGVyIHRoZSBtaW5pbXVtIG9yIG1heGltdW0gcmFuZ2UgdmFsdWUnXG4gICAgfSxcbiAgICBuaWNlOiB7XG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBvbmVPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgdHJ1ZSwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IG51bWJlciByYW5nZSAoZS5nLiwgNyBpbnN0ZWFkIG9mIDYuOTYpLidcbiAgICAgICAgfSx7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgZW51bTogWydzZWNvbmQnLCAnbWludXRlJywgJ2hvdXInLCAnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCAneWVhciddLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgc3BlY2lmaWVkLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIEZvciB0aW1lIGFuZCB1dGMgc2NhbGUgdHlwZXMgb25seSwgdGhlIG5pY2UgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIGRlc2lyZWQgdGltZSBpbnRlcnZhbDsgbGVnYWwgdmFsdWVzIGFyZSBcInNlY29uZFwiLCBcIm1pbnV0ZVwiLCBcImhvdXJcIiwgXCJkYXlcIiwgXCJ3ZWVrXCIsIFwibW9udGhcIiwgb3IgXCJ5ZWFyXCIuJ1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgLy8gRklYTUUgdGhpcyBwYXJ0IG1pZ2h0IGJyZWFrIHBvbGVzdGFyXG4gICAgICBzdXBwb3J0ZWRUeXBlczogdG9NYXAoW1FVQU5USVRBVElWRSwgVEVNUE9SQUxdKSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgIH0sXG5cbiAgICAvKiBRdWFudGl0YXRpdmUgU2NhbGUgUHJvcGVydGllcyAqL1xuICAgIGV4cG9uZW50OiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZXhwb25lbnQgb2YgdGhlIHNjYWxlIHRyYW5zZm9ybWF0aW9uLiBGb3IgcG93IHNjYWxlIHR5cGVzIG9ubHksIG90aGVyd2lzZSBpZ25vcmVkLidcbiAgICB9LFxuICAgIHplcm86IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnSWYgdHJ1ZSwgZW5zdXJlcyB0aGF0IGEgemVybyBiYXNlbGluZSB2YWx1ZSBpcyBpbmNsdWRlZCBpbiB0aGUgc2NhbGUgZG9tYWluLiBUaGlzIG9wdGlvbiBpcyBpZ25vcmVkIGZvciBub24tcXVhbnRpdGF0aXZlIHNjYWxlcy4nLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgc3VwcG9ydGVkVHlwZXM6IHRvTWFwKFtRVUFOVElUQVRJVkUsIFRFTVBPUkFMXSlcbiAgICB9LFxuXG4gICAgLyogVmVnYS1saXRlIG9ubHkgUHJvcGVydGllcyAqL1xuICAgIHVzZVJhd0RvbWFpbjoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VzZXMgdGhlIHNvdXJjZSBkYXRhIHJhbmdlIGFzIHNjYWxlIGRvbWFpbiBpbnN0ZWFkIG9mICcgK1xuICAgICAgICAgICAgICAgICAgICdhZ2dyZWdhdGVkIGRhdGEgZm9yIGFnZ3JlZ2F0ZSBheGlzLiAnICtcbiAgICAgICAgICAgICAgICAgICAnVGhpcyBvcHRpb24gZG9lcyBub3Qgd29yayB3aXRoIHN1bSBvciBjb3VudCBhZ2dyZWdhdGUnICtcbiAgICAgICAgICAgICAgICAgICAnYXMgdGhleSBtaWdodCBoYXZlIGEgc3Vic3RhbnRpYWxseSBsYXJnZXIgc2NhbGUgcmFuZ2UuJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHZhciBvcmRpbmFsT25seVNjYWxlID0gbWVyZ2VEZWVwKGNsb25lKHNjYWxlKSwgb3JkaW5hbFNjYWxlTWl4aW4pO1xuZXhwb3J0IHZhciB0eXBpY2FsU2NhbGUgPSBtZXJnZURlZXAoY2xvbmUoc2NhbGUpLCBvcmRpbmFsU2NhbGVNaXhpbiwgdHlwaWNhbFNjYWxlTWl4aW4pO1xuIiwiLy8gUGFja2FnZSBvZiBkZWZpbmluZyBWZWdhLWxpdGUgU3BlY2lmaWNhdGlvbidzIGpzb24gc2NoZW1hXG5cbmltcG9ydCAqIGFzIHNjaGVtYVV0aWwgZnJvbSAnLi9zY2hlbWF1dGlsJztcbmltcG9ydCB7bWFya30gZnJvbSAnLi9tYXJrLnNjaGVtYSc7XG5pbXBvcnQge2NvbmZpZywgQ29uZmlnfSBmcm9tICcuL2NvbmZpZy5zY2hlbWEnO1xuaW1wb3J0IHtkYXRhLCBEYXRhfSBmcm9tICcuL2RhdGEuc2NoZW1hJztcbmltcG9ydCB7ZW5jb2RpbmcsIEVuY29kaW5nfSBmcm9tICcuL2VuY29kaW5nLnNjaGVtYSc7XG5pbXBvcnQge01hcmt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHt0cmFuc2Zvcm0sIFRyYW5zZm9ybX0gZnJvbSAnLi90cmFuc2Zvcm0uc2NoZW1hJztcblxuZXhwb3J0IGludGVyZmFjZSBTcGVjIHtcbiAgbmFtZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGRhdGE/OiBEYXRhO1xuICB0cmFuc2Zvcm0/OiBUcmFuc2Zvcm07XG4gIG1hcms/OiBNYXJrO1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xuICBjb25maWc/OiBDb25maWc7XG59XG5cbi8vIFRPRE8gcmVtb3ZlIHRoaXNcbmV4cG9ydCB7YWdncmVnYXRlfSBmcm9tICcuL2ZpZWxkZGVmLnNjaGVtYSc7XG5cbmV4cG9ydCB2YXIgdXRpbCA9IHNjaGVtYVV0aWw7XG5cbi8qKiBAdHlwZSBPYmplY3QgU2NoZW1hIG9mIGEgdmVnYS1saXRlIHNwZWNpZmljYXRpb24gKi9cbmV4cG9ydCB2YXIgc2NoZW1hID0ge1xuICAkc2NoZW1hOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEjJyxcbiAgZGVzY3JpcHRpb246ICdTY2hlbWEgZm9yIFZlZ2EtTGl0ZSBzcGVjaWZpY2F0aW9uJyxcbiAgdHlwZTogJ29iamVjdCcsXG4gIHJlcXVpcmVkOiBbJ21hcmsnLCAnZW5jb2RpbmcnXSxcbiAgcHJvcGVydGllczoge1xuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVzY3JpcHRpb246ICdBIG5hbWUgZm9yIHRoZSBzcGVjaWZpY2F0aW9uLiBUaGUgbmFtZSBpcyB1c2VkIHRvIGFubm90YXRlIG1hcmtzLCBzY2FsZSBuYW1lcywgYW5kIG1vcmUuJ1xuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBkYXRhOiBkYXRhLFxuICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgIG1hcms6IG1hcmssXG4gICAgZW5jb2Rpbmc6IGVuY29kaW5nLFxuICAgIGNvbmZpZzogY29uZmlnXG4gIH1cbn07XG5cbi8qKiBJbnN0YW50aWF0ZSBhIHZlcmJvc2Ugdmwgc3BlYyBmcm9tIHRoZSBzY2hlbWEgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZSgpIHtcbiAgcmV0dXJuIHNjaGVtYVV0aWwuaW5zdGFudGlhdGUoc2NoZW1hKTtcbn07XG4iLCJpbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uL3V0aWwnO1xuXG5mdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKGluc3RhbmNlLCBzY2hlbWEpIHtcbiAgcmV0dXJuIG1lcmdlRGVlcChpbnN0YW50aWF0ZShzY2hlbWEpLCBpbnN0YW5jZSk7XG59O1xuXG4vLyBpbnN0YW50aWF0ZSBhIHNjaGVtYVxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlKHNjaGVtYSkge1xuICB2YXIgdmFsO1xuICBpZiAoc2NoZW1hID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKCdkZWZhdWx0JyBpbiBzY2hlbWEpIHtcbiAgICB2YWwgPSBzY2hlbWEuZGVmYXVsdDtcbiAgICByZXR1cm4gdXRpbC5pc09iamVjdCh2YWwpID8gdXRpbC5kdXBsaWNhdGUodmFsKSA6IHZhbDtcbiAgfSBlbHNlIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSB7fTtcbiAgICBmb3IgKHZhciBuYW1lIGluIHNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgdmFsID0gaW5zdGFudGlhdGUoc2NoZW1hLnByb3BlcnRpZXNbbmFtZV0pO1xuICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpbnN0YW5jZVtuYW1lXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG4vLyByZW1vdmUgYWxsIGRlZmF1bHRzIGZyb20gYW4gaW5zdGFuY2VcbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChpbnN0YW5jZSwgZGVmYXVsdHMpIHtcbiAgdmFyIGNoYW5nZXM6IGFueSA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICB2YXIgZGVmID0gZGVmYXVsdHNbcHJvcF07XG4gICAgICB2YXIgaW5zID0gaW5zdGFuY2VbcHJvcF07XG4gICAgICAvLyBOb3RlOiBkb2VzIG5vdCBwcm9wZXJseSBzdWJ0cmFjdCBhcnJheXNcbiAgICAgIGlmICghZGVmYXVsdHMgfHwgZGVmICE9PSBpbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnMgPT09ICdvYmplY3QnICYmICF1dGlsLmlzQXJyYXkoaW5zKSAmJiBkZWYpIHtcbiAgICAgICAgICB2YXIgYyA9IHN1YnRyYWN0KGlucywgZGVmKTtcbiAgICAgICAgICBpZiAoIWlzRW1wdHkoYykpIHtcbiAgICAgICAgICAgIGNoYW5nZXNbcHJvcF0gPSBjO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh1dGlsLmlzQXJyYXkoaW5zKSkge1xuICAgICAgICAgIGlmICh1dGlsLmlzQXJyYXkoZGVmKSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgZWFjaCBpdGVtIGluIHRoZSBhcnJheVxuICAgICAgICAgICAgaWYgKGlucy5sZW5ndGggPT09IGRlZi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdmFyIGVxdWFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zW2ldICE9PSBkZWZbaV0pIHtcbiAgICAgICAgICAgICAgICAgIGVxdWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGVxdWFsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7IC8vIGNvbnRpbnVlIHdpdGggbmV4dCBwcm9wZXJ0eVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5nZXNbcHJvcF0gPSBpbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlc1twcm9wXSA9IGlucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2hhbmdlcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yICh2YXIgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuIiwiaW1wb3J0IHtBR0dSRUdBVEVfT1BTfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtPUkRJTkFMLCBRVUFOVElUQVRJVkV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHt0b01hcH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydCB7XG4gIGZpZWxkOiBzdHJpbmc7XG4gIG9wOiBzdHJpbmc7XG4gIG9yZGVyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdmFyIHNvcnQgPSB7XG4gIGRlZmF1bHQ6ICdhc2NlbmRpbmcnLFxuICBzdXBwb3J0ZWRUeXBlczogdG9NYXAoW1FVQU5USVRBVElWRSwgT1JESU5BTF0pLFxuICBvbmVPZjogW1xuICAgIHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZW51bTogWydhc2NlbmRpbmcnLCAnZGVzY2VuZGluZycsICd1bnNvcnRlZCddXG4gICAgfSxcbiAgICB7IC8vIHNvcnQgYnkgYWdncmVnYXRpb24gb2YgYW5vdGhlciBmaWVsZFxuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICByZXF1aXJlZDogWydmaWVsZCcsICdvcCddLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWVsZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGZpZWxkIG5hbWUgdG8gYWdncmVnYXRlIG92ZXIuJ1xuICAgICAgICB9LFxuICAgICAgICBvcDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGVudW06IEFHR1JFR0FURV9PUFMsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgZmllbGQgbmFtZSB0byBhZ2dyZWdhdGUgb3Zlci4nXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgZW51bTogWydhc2NlbmRpbmcnLCAnZGVzY2VuZGluZyddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF1cbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG4gIGZpbHRlcj86IHN0cmluZztcbiAgZmlsdGVyTnVsbD86IGJvb2xlYW47XG4gIGNhbGN1bGF0ZT86IFZnRm9ybXVsYVtdO1xufVxuXG4vLyBUT0RPIG1vdmUgYWxsIFZlZ2EgaW50ZXJmYWNlcyB0byBvbmUgY2VudHJhbCBwb3NpdGlvblxuZXhwb3J0IGludGVyZmFjZSBWZ0Zvcm11bGEge1xuICBmaWVsZDogc3RyaW5nO1xuICBleHByOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm0gPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgZmlsdGVyTnVsbDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgZGVzY3JpcHRpb246ICdGaWx0ZXIgbnVsbCB2YWx1ZXMgZnJvbSB0aGUgZGF0YS4gSWYgc2V0IHRvIHRydWUsIGFsbCByb3dzIHdpdGggbnVsbCB2YWx1ZXMgYXJlIGZpbHRlcmVkLiBJZiBmYWxzZSwgbm8gcm93cyBhcmUgZmlsdGVyZWQuIFNldCB0aGUgcHJvcGVydHkgdG8gdW5kZWZpbmVkIHRvIGZpbHRlciBvbmx5IHF1YW50aXRhdGl2ZSBhbmQgdGVtcG9yYWwgZmllbGRzLidcbiAgICB9LFxuICAgIGZpbHRlcjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0Egc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGZpbHRlciBWZWdhIGV4cHJlc3Npb24uIFVzZSBgZGF0dW1gIHRvIHJlZmVyIHRvIHRoZSBjdXJyZW50IGRhdGEgb2JqZWN0LidcbiAgICB9LFxuICAgIGNhbGN1bGF0ZToge1xuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2FsY3VsYXRlIG5ldyBmaWVsZChzKSB1c2luZyB0aGUgcHJvdmlkZWQgZXhwcmVzc3Npb24ocykuIENhbGN1bGF0aW9uIGFyZSBhcHBsaWVkIGJlZm9yZSBmaWx0ZXIuJyxcbiAgICAgIGl0ZW1zOiB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgZmllbGQgaW4gd2hpY2ggdG8gc3RvcmUgdGhlIGNvbXB1dGVkIGZvcm11bGEgdmFsdWUuJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcjoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Egc3RyaW5nIGNvbnRhaW5pbmcgYW4gZXhwcmVzc2lvbiBmb3IgdGhlIGZvcm11bGEuIFVzZSB0aGUgdmFyaWFibGUgYGRhdHVtYCB0byB0byByZWZlciB0byB0aGUgY3VycmVudCBkYXRhIG9iamVjdC4nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiLyoqIG1vZHVsZSBmb3Igc2hvcnRoYW5kICovXG5cbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vc2NoZW1hL2VuY29kaW5nLnNjaGVtYSc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL3NjaGVtYS9maWVsZGRlZi5zY2hlbWEnO1xuaW1wb3J0IHtTcGVjfSBmcm9tICcuL3NjaGVtYS9zY2hlbWEnO1xuXG5pbXBvcnQge0FHR1JFR0FURV9PUFN9IGZyb20gJy4vYWdncmVnYXRlJztcbmltcG9ydCB7VElNRVVOSVRTfSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7U0hPUlRfVFlQRSwgVFlQRV9GUk9NX1NIT1JUX1RZUEV9IGZyb20gJy4vdHlwZSc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuXG5leHBvcnQgY29uc3QgREVMSU0gPSAnfCc7XG5leHBvcnQgY29uc3QgQVNTSUdOID0gJz0nO1xuZXhwb3J0IGNvbnN0IFRZUEUgPSAnLCc7XG5leHBvcnQgY29uc3QgRlVOQyA9ICdfJztcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbihzcGVjOiBTcGVjKTogc3RyaW5nIHtcbiAgcmV0dXJuICdtYXJrJyArIEFTU0lHTiArIHNwZWMubWFyayArXG4gICAgREVMSU0gKyBzaG9ydGVuRW5jb2Rpbmcoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzaG9ydGhhbmQ6IHN0cmluZywgZGF0YT8sIGNvbmZpZz8pIHtcbiAgbGV0IHNwbGl0ID0gc2hvcnRoYW5kLnNwbGl0KERFTElNKSxcbiAgICBtYXJrID0gc3BsaXQuc2hpZnQoKS5zcGxpdChBU1NJR04pWzFdLnRyaW0oKSxcbiAgICBlbmNvZGluZyA9IHBhcnNlRW5jb2Rpbmcoc3BsaXQuam9pbihERUxJTSkpO1xuXG4gIGxldCBzcGVjOlNwZWMgPSB7XG4gICAgbWFyazogTWFya1ttYXJrXSxcbiAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgfTtcblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5kYXRhID0gZGF0YTtcbiAgfVxuICBpZiAoY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICBzcGVjLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5FbmNvZGluZyhlbmNvZGluZzogRW5jb2RpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmxFbmNvZGluZy5tYXAoZW5jb2RpbmcsIGZ1bmN0aW9uKGZpZWxkRGVmLCBjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwgKyBBU1NJR04gKyBzaG9ydGVuRmllbGREZWYoZmllbGREZWYpO1xuICB9KS5qb2luKERFTElNKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW5jb2RpbmcoZW5jb2RpbmdTaG9ydGhhbmQ6IHN0cmluZyk6IEVuY29kaW5nIHtcbiAgcmV0dXJuIGVuY29kaW5nU2hvcnRoYW5kLnNwbGl0KERFTElNKS5yZWR1Y2UoZnVuY3Rpb24obSwgZSkge1xuICAgIHZhciBzcGxpdCA9IGUuc3BsaXQoQVNTSUdOKSxcbiAgICAgICAgZW5jdHlwZSA9IHNwbGl0WzBdLnRyaW0oKSxcbiAgICAgICAgZmllbGREZWZTaG9ydGhhbmQgPSBzcGxpdFsxXTtcblxuICAgIG1bZW5jdHlwZV0gPSBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kKTtcbiAgICByZXR1cm4gbTtcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZik6IHN0cmluZyB7XG4gIHJldHVybiAoZmllbGREZWYuYWdncmVnYXRlID8gZmllbGREZWYuYWdncmVnYXRlICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLnRpbWVVbml0ID8gZmllbGREZWYudGltZVVuaXQgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuYmluID8gJ2JpbicgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuZmllbGQgfHwgJycpICsgVFlQRSArIFNIT1JUX1RZUEVbZmllbGREZWYudHlwZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWZzKGZpZWxkRGVmczogRmllbGREZWZbXSwgZGVsaW0gPSBERUxJTSk6IHN0cmluZyB7XG4gIHJldHVybiBmaWVsZERlZnMubWFwKHNob3J0ZW5GaWVsZERlZikuam9pbihkZWxpbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kOiBzdHJpbmcpOiBGaWVsZERlZiB7XG4gIHZhciBzcGxpdCA9IGZpZWxkRGVmU2hvcnRoYW5kLnNwbGl0KFRZUEUpO1xuXG4gIHZhciBmaWVsZERlZjogRmllbGREZWYgPSB7XG4gICAgZmllbGQ6IHNwbGl0WzBdLnRyaW0oKSxcbiAgICB0eXBlOiBUWVBFX0ZST01fU0hPUlRfVFlQRVtzcGxpdFsxXS50cmltKCldXG4gIH07XG5cbiAgLy8gY2hlY2sgYWdncmVnYXRlIHR5cGVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBBR0dSRUdBVEVfT1BTLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGEgPSBBR0dSRUdBVEVfT1BTW2ldO1xuICAgIGlmIChmaWVsZERlZi5maWVsZC5pbmRleE9mKGEgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihhLmxlbmd0aCArIDEpO1xuICAgICAgaWYgKGEgPT09ICdjb3VudCcgJiYgZmllbGREZWYuZmllbGQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZpZWxkRGVmLmZpZWxkID0gJyonO1xuICAgICAgfVxuICAgICAgZmllbGREZWYuYWdncmVnYXRlID0gYTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgVElNRVVOSVRTLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1ID0gVElNRVVOSVRTW2ldO1xuICAgIGlmIChmaWVsZERlZi5maWVsZCAmJiBmaWVsZERlZi5maWVsZC5pbmRleE9mKHR1ICsgJ18nKSA9PT0gMCkge1xuICAgICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoZmllbGREZWYuZmllbGQubGVuZ3RoICsgMSk7XG4gICAgICBmaWVsZERlZi50aW1lVW5pdCA9IHR1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2sgYmluXG4gIGlmIChmaWVsZERlZi5maWVsZCAmJiBmaWVsZERlZi5maWVsZC5pbmRleE9mKCdiaW5fJykgPT09IDApIHtcbiAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cig0KTtcbiAgICBmaWVsZERlZi5iaW4gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkRGVmO1xufVxuIiwiLyogVXRpbGl0aWVzIGZvciBhIFZlZ2EtTGl0ZSBzcGVjaWZpY2lhdGlvbiAqL1xuXG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL3NjaGVtYS9maWVsZGRlZi5zY2hlbWEnO1xuaW1wb3J0IHtTcGVjfSBmcm9tICcuL3NjaGVtYS9zY2hlbWEnO1xuXG5pbXBvcnQge01vZGVsfSBmcm9tICcuL2NvbXBpbGUvTW9kZWwnO1xuaW1wb3J0IHtDT0xPUiwgU0hBUEV9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtCQVIsIEFSRUF9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2R1cGxpY2F0ZX0gZnJvbSAnLi91dGlsJztcblxuLy8gVE9ETzogYWRkIHZsLnNwZWMudmFsaWRhdGUgJiBtb3ZlIHN0dWZmIGZyb20gdmwudmFsaWRhdGUgdG8gaGVyZVxuXG5leHBvcnQgZnVuY3Rpb24gYWx3YXlzTm9PY2NsdXNpb24oc3BlYzogU3BlYyk6IGJvb2xlYW4ge1xuICAvLyBGSVhNRSByYXcgT3hRIHdpdGggIyBvZiByb3dzID0gIyBvZiBPXG4gIHJldHVybiB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGREZWZzKHNwZWM6IFNwZWMpOiBGaWVsZERlZltdIHtcbiAgLy8gVE9ETzogcmVmYWN0b3IgdGhpcyBvbmNlIHdlIGhhdmUgY29tcG9zaXRpb25cbiAgcmV0dXJuIHZsRW5jb2RpbmcuZmllbGREZWZzKHNwZWMuZW5jb2RpbmcpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsZWFuU3BlYyhzcGVjOiBTcGVjKTogU3BlYyB7XG4gIC8vIFRPRE86IG1vdmUgdG9TcGVjIHRvIGhlcmUhXG4gIHJldHVybiBuZXcgTW9kZWwoc3BlYykudG9TcGVjKHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdGFjayhzcGVjOiBTcGVjKTogYm9vbGVhbiB7XG4gIHJldHVybiAodmxFbmNvZGluZy5oYXMoc3BlYy5lbmNvZGluZywgQ09MT1IpIHx8IHZsRW5jb2RpbmcuaGFzKHNwZWMuZW5jb2RpbmcsIFNIQVBFKSkgJiZcbiAgICAoc3BlYy5tYXJrID09PSBCQVIgfHwgc3BlYy5tYXJrID09PSBBUkVBKSAmJlxuICAgICghc3BlYy5jb25maWcgfHwgIXNwZWMuY29uZmlnLnN0YWNrICE9PSBmYWxzZSkgJiZcbiAgICB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHNwZWMuZW5jb2RpbmcpO1xufVxuXG4vLyBUT0RPIHJldmlzZVxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShzcGVjOiBTcGVjKTogU3BlYyB7XG4gIHZhciBvbGRlbmMgPSBzcGVjLmVuY29kaW5nLFxuICAgIGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICBlbmNvZGluZy54ID0gb2xkZW5jLnk7XG4gIGVuY29kaW5nLnkgPSBvbGRlbmMueDtcbiAgZW5jb2Rpbmcucm93ID0gb2xkZW5jLmNvbHVtbjtcbiAgZW5jb2RpbmcuY29sdW1uID0gb2xkZW5jLnJvdztcbiAgc3BlYy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICByZXR1cm4gc3BlYztcbn1cbiIsImV4cG9ydCBjb25zdCBUSU1FVU5JVFMgPSBbXG4gICd5ZWFyJywgJ21vbnRoJywgJ2RheScsICdkYXRlJywgJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcycsICdtaWxsaXNlY29uZHMnLFxuICAneWVhcm1vbnRoJywgJ3llYXJtb250aGRheScsICd5ZWFybW9udGhkYXRlJywgJ3llYXJkYXknLCAneWVhcmRhdGUnLFxuICAneWVhcm1vbnRoZGF5aG91cnMnLCAneWVhcm1vbnRoZGF5aG91cnNtaW51dGVzJywgJ2hvdXJzbWludXRlcycsXG4gICdob3Vyc21pbnV0ZXNzZWNvbmRzJywgJ21pbnV0ZXNzZWNvbmRzJywgJ3NlY29uZHNtaWxsaXNlY29uZHMnXG5dO1xuIiwiLyoqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhIHR5cGUgKi9cblxuZXhwb3J0IGVudW0gVHlwZSB7XG4gIFFVQU5USVRBVElWRSA9ICdxdWFudGl0YXRpdmUnIGFzIGFueSxcbiAgT1JESU5BTCA9ICdvcmRpbmFsJyBhcyBhbnksXG4gIFRFTVBPUkFMID0gJ3RlbXBvcmFsJyBhcyBhbnksXG4gIE5PTUlOQUwgPSAnbm9taW5hbCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBRVUFOVElUQVRJVkUgPSBUeXBlLlFVQU5USVRBVElWRTtcbmV4cG9ydCBjb25zdCBPUkRJTkFMID0gVHlwZS5PUkRJTkFMO1xuZXhwb3J0IGNvbnN0IFRFTVBPUkFMID0gVHlwZS5URU1QT1JBTDtcbmV4cG9ydCBjb25zdCBOT01JTkFMID0gVHlwZS5OT01JTkFMO1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBmdWxsIHR5cGUgbmFtZXMgdG8gc2hvcnQgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBTSE9SVF9UWVBFID0ge1xuICBxdWFudGl0YXRpdmU6ICdRJyxcbiAgdGVtcG9yYWw6ICdUJyxcbiAgbm9taW5hbDogJ04nLFxuICBvcmRpbmFsOiAnTydcbn07XG4vKipcbiAqIE1hcHBpbmcgZnJvbSBzaG9ydCB0eXBlIG5hbWVzIHRvIGZ1bGwgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBUWVBFX0ZST01fU0hPUlRfVFlQRSA9IHtcbiAgUTogUVVBTlRJVEFUSVZFLFxuICBUOiBURU1QT1JBTCxcbiAgTzogT1JESU5BTCxcbiAgTjogTk9NSU5BTFxufTtcblxuLyoqXG4gKiBHZXQgZnVsbCwgbG93ZXJjYXNlIHR5cGUgbmFtZSBmb3IgYSBnaXZlbiB0eXBlLlxuICogQHBhcmFtICB0eXBlXG4gKiBAcmV0dXJuIEZ1bGwgdHlwZSBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbE5hbWUodHlwZTogVHlwZSk6IFR5cGUge1xuICBjb25zdCB0eXBlU3RyaW5nID0gPGFueT50eXBlOyAgLy8gZm9yY2UgdHlwZSBhcyBzdHJpbmcgc28gd2UgY2FuIHRyYW5zbGF0ZSBzaG9ydCB0eXBlc1xuICByZXR1cm4gVFlQRV9GUk9NX1NIT1JUX1RZUEVbdHlwZVN0cmluZy50b1VwcGVyQ2FzZSgpXSB8fCAvLyBzaG9ydCB0eXBlIGlzIHVwcGVyY2FzZSBieSBkZWZhdWx0XG4gICAgICAgICB0eXBlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9kYXRhbGliLmQudHNcIi8+XG5cbmV4cG9ydCB7a2V5cywgZXh0ZW5kLCBkdXBsaWNhdGUsIGlzQXJyYXksIHZhbHMsIHRydW5jYXRlLCB0b01hcCwgaXNPYmplY3R9IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuZXhwb3J0IHtyYW5nZX0gZnJvbSAnZGF0YWxpYi9zcmMvZ2VuZXJhdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMoYXJyYXk6IEFycmF5PGFueT4sIGl0ZW06IGFueSkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmcpIHtcbiAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgb2JqLmZvckVhY2guY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKG9iaiwgZjogKGEsIGksIGQsIGssIG8pID0+IGFueSwgaW5pdCwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5yZWR1Y2UpIHtcbiAgICByZXR1cm4gb2JqLnJlZHVjZS5jYWxsKHRoaXNBcmcsIGYsIGluaXQpO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGluaXQgPSBmLmNhbGwodGhpc0FyZywgaW5pdCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5pdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcC5jYWxsKHRoaXNBcmcsIGYpO1xuICB9IGVsc2Uge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBvdXRwdXQucHVzaChmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW55KGFycjogQXJyYXk8YW55PiwgZjogKGQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICB2YXIgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmIChmKGFycltrXSwgaywgaSsrKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsbChhcnI6IEFycmF5PGFueT4sIGY6IChkLCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgdmFyIGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoIWYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0IGRsQmluID0gcmVxdWlyZSgnZGF0YWxpYi9zcmMvYmlucy9iaW5zJyk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0YmlucyhzdGF0cywgbWF4Ymlucykge1xuICByZXR1cm4gZGxCaW4oe1xuICAgIG1pbjogc3RhdHMubWluLFxuICAgIG1heDogc3RhdHMubWF4LFxuICAgIG1heGJpbnM6IG1heGJpbnNcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvcihtZXNzYWdlOiBhbnkpIHtcbiAgY29uc29sZS5lcnJvcignW1ZMIEVycm9yXScsIG1lc3NhZ2UpO1xufVxuIiwiaW1wb3J0IHtTcGVjfSBmcm9tICcuL3NjaGVtYS9zY2hlbWEnO1xuXG4vLyBUT0RPOiBtb3ZlIHRvIHZsLnNwZWMudmFsaWRhdG9yP1xuXG5pbXBvcnQge3RvTWFwfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtCQVJ9IGZyb20gJy4vbWFyayc7XG5cbmludGVyZmFjZSBSZXF1aXJlZENoYW5uZWxNYXAge1xuICBbbWFyazogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBFbmNvZGluZyBDaGFubmVscyBmb3IgZWFjaCBtYXJrIHR5cGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQOiBSZXF1aXJlZENoYW5uZWxNYXAgPSB7XG4gIHRleHQ6IFsndGV4dCddLFxuICBsaW5lOiBbJ3gnLCAneSddLFxuICBhcmVhOiBbJ3gnLCAneSddXG59O1xuXG5pbnRlcmZhY2UgU3VwcG9ydGVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiB7XG4gICAgW2NoYW5uZWw6IHN0cmluZ106IG51bWJlclxuICB9O1xufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBFbmNvZGluZyBDaGFubmVsIGZvciBlYWNoIG1hcmsgdHlwZVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0ge1xuICBiYXI6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnc2l6ZScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGxpbmU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLCAvLyBUT0RPOiBhZGQgc2l6ZSB3aGVuIFZlZ2Egc3VwcG9ydHNcbiAgYXJlYTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIHRpY2s6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLFxuICBjaXJjbGU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnXSksXG4gIHNxdWFyZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgcG9pbnQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnLCAnc2hhcGUnXSksXG4gIHRleHQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICdzaXplJywgJ2NvbG9yJywgJ3RleHQnXSkgLy8gVE9ETygjNzI0KSByZXZpc2Vcbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHNob3VsZCBhZGQgdmFsaWRhdGUgbWV0aG9kIGFuZFxuLy8gcmVxdWlyZXMgWlNjaGVtYSBpbiB0aGUgbWFpbiB2ZWdhLWxpdGUgcmVwb1xuXG4vKipcbiAqIEZ1cnRoZXIgY2hlY2sgaWYgZW5jb2RpbmcgbWFwcGluZyBvZiBhIHNwZWMgaXMgaW52YWxpZCBhbmRcbiAqIHJldHVybiBlcnJvciBpZiBpdCBpcyBpbnZhbGlkLlxuICpcbiAqIFRoaXMgY2hlY2tzIGlmXG4gKiAoMSkgYWxsIHRoZSByZXF1aXJlZCBlbmNvZGluZyBjaGFubmVscyBmb3IgdGhlIG1hcmsgdHlwZSBhcmUgc3BlY2lmaWVkXG4gKiAoMikgYWxsIHRoZSBzcGVjaWZpZWQgZW5jb2RpbmcgY2hhbm5lbHMgYXJlIHN1cHBvcnRlZCBieSB0aGUgbWFyayB0eXBlXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNwZWMgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UmVxdWlyZWRDaGFubmVsTWFwICA9IERlZmF1bHRSZXF1aXJlZENoYW5uZWxNYXB9ICByZXF1aXJlZENoYW5uZWxNYXBcbiAqIEBwYXJhbSAge1N1cHBvcnRlZENoYW5uZWxNYXAgPSBEZWZhdWx0U3VwcG9ydGVkQ2hhbm5lbE1hcH0gc3VwcG9ydGVkQ2hhbm5lbE1hcFxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm4gb25lIHJlYXNvbiB3aHkgdGhlIGVuY29kaW5nIGlzIGludmFsaWQsXG4gKiAgICAgICAgICAgICAgICAgIG9yIG51bGwgaWYgdGhlIGVuY29kaW5nIGlzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5jb2RpbmdNYXBwaW5nRXJyb3Ioc3BlYzogU3BlYyxcbiAgcmVxdWlyZWRDaGFubmVsTWFwOiBSZXF1aXJlZENoYW5uZWxNYXAgPSBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQLFxuICBzdXBwb3J0ZWRDaGFubmVsTWFwOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0gREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFXG4gICkge1xuICBsZXQgbWFyayA9IHNwZWMubWFyaztcbiAgbGV0IGVuY29kaW5nID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IHJlcXVpcmVkQ2hhbm5lbHMgPSByZXF1aXJlZENoYW5uZWxNYXBbbWFya107XG4gIGxldCBzdXBwb3J0ZWRDaGFubmVscyA9IHN1cHBvcnRlZENoYW5uZWxNYXBbbWFya107XG5cbiAgZm9yIChsZXQgaSBpbiByZXF1aXJlZENoYW5uZWxzKSB7IC8vIGFsbCByZXF1aXJlZCBjaGFubmVscyBhcmUgaW4gZW5jb2RpbmdgXG4gICAgaWYgKCEocmVxdWlyZWRDaGFubmVsc1tpXSBpbiBlbmNvZGluZykpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBlbmNvZGluZyBjaGFubmVsIFxcXCInICsgcmVxdWlyZWRDaGFubmVsc1tpXSArXG4gICAgICAgICdcXFwiIGZvciBtYXJrIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBjaGFubmVsIGluIGVuY29kaW5nKSB7IC8vIGFsbCBjaGFubmVscyBpbiBlbmNvZGluZyBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKCFzdXBwb3J0ZWRDaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgcmV0dXJuICdFbmNvZGluZyBjaGFubmVsIFxcXCInICsgY2hhbm5lbCArXG4gICAgICAgICdcXFwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbWFyayB0eXBlIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBpZiAobWFyayA9PT0gQkFSICYmICFlbmNvZGluZy54ICYmICFlbmNvZGluZy55KSB7XG4gICAgcmV0dXJuICdNaXNzaW5nIGJvdGggeCBhbmQgeSBmb3IgYmFyJztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0ICogYXMgdmxCaW4gZnJvbSAnLi9iaW4nO1xuaW1wb3J0ICogYXMgdmxDaGFubmVsIGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgKiBhcyB2bERhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEZpZWxkRGVmIGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0ICogYXMgdmxDb21waWxlIGZyb20gJy4vY29tcGlsZS9jb21waWxlJztcbmltcG9ydCAqIGFzIHZsU2NoZW1hIGZyb20gJy4vc2NoZW1hL3NjaGVtYSc7XG5pbXBvcnQgKiBhcyB2bFNob3J0aGFuZCBmcm9tICcuL3Nob3J0aGFuZCc7XG5pbXBvcnQgKiBhcyB2bFNwZWMgZnJvbSAnLi9zcGVjJztcbmltcG9ydCAqIGFzIHZsVGltZVVuaXQgZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQgKiBhcyB2bFR5cGUgZnJvbSAnLi90eXBlJztcbmltcG9ydCAqIGFzIHZsVmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZSc7XG5pbXBvcnQgKiBhcyB2bFV0aWwgZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNvbnN0IGJpbiA9IHZsQmluO1xuZXhwb3J0IGNvbnN0IGNoYW5uZWwgPSB2bENoYW5uZWw7XG5leHBvcnQgY29uc3QgY29tcGlsZSA9IHZsQ29tcGlsZS5jb21waWxlO1xuZXhwb3J0IGNvbnN0IGRhdGEgPSB2bERhdGE7XG5leHBvcnQgY29uc3QgZW5jb2RpbmcgPSB2bEVuY29kaW5nO1xuZXhwb3J0IGNvbnN0IGZpZWxkRGVmID0gdmxGaWVsZERlZjtcbmV4cG9ydCBjb25zdCBzY2hlbWEgPSB2bFNjaGVtYTtcbmV4cG9ydCBjb25zdCBzaG9ydGhhbmQgPSB2bFNob3J0aGFuZDtcbmV4cG9ydCBjb25zdCBzcGVjID0gdmxTcGVjO1xuZXhwb3J0IGNvbnN0IHRpbWVVbml0ID0gdmxUaW1lVW5pdDtcbmV4cG9ydCBjb25zdCB0eXBlID0gdmxUeXBlO1xuZXhwb3J0IGNvbnN0IHV0aWwgPSB2bFV0aWw7XG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSB2bFZhbGlkYXRlO1xuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICdfX1ZFUlNJT05fXyc7XG4iXX0=
