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

  var version = "0.1.1";

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
    : u.isObject(x) || u.isString(x) ?
      // Output valid JSON and JS source strings.
      // See http://timelessrepo.com/json-isnt-a-javascript-subset
      JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
    : x;
};

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
  /* jshint evil: true */
  return f==null || u.isFunction(f) ? f :
    u.namedfunc(f, Function('x', 'return x[' + u.field(f).map(u.str).join('][') + '];'));
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
var json = typeof JSON !== 'undefined' ? JSON : require('jsonify');

module.exports = function (obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer = opts.replacer || function(key, value) { return value; };

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (parent, key, node, level) {
        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return json.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys = objectKeys(node).sort(cmp && cmp(node));
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue = json.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    })({ '': obj }, '', obj, 0);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () { return true };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

},{"jsonify":8}],8:[function(require,module,exports){
exports.parse = require('./lib/parse');
exports.stringify = require('./lib/stringify');

},{"./lib/parse":9,"./lib/stringify":10}],9:[function(require,module,exports){
var at, // The index of the current character
    ch, // The current character
    escapee = {
        '"':  '"',
        '\\': '\\',
        '/':  '/',
        b:    '\b',
        f:    '\f',
        n:    '\n',
        r:    '\r',
        t:    '\t'
    },
    text,

    error = function (m) {
        // Call error when something is wrong.
        throw {
            name:    'SyntaxError',
            message: m,
            at:      at,
            text:    text
        };
    },
    
    next = function (c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }
        
        // Get the next character. When there are no more characters,
        // return the empty string.
        
        ch = text.charAt(at);
        at += 1;
        return ch;
    },
    
    number = function () {
        // Parse a number value.
        var number,
            string = '';
        
        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error("Bad number");
        } else {
            return number;
        }
    },
    
    string = function () {
        // Parse a string value.
        var hex,
            i,
            string = '',
            uffff;
        
        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    },

    white = function () {

// Skip whitespace.

        while (ch && ch <= ' ') {
            next();
        }
    },

    word = function () {

// true, false, or null.

        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    },

    value,  // Place holder for the value function.

    array = function () {

// Parse an array value.

        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    },

    object = function () {

// Parse an object value.

        var key,
            object = {};

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                object[key] = value();
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error("Bad object");
    };

value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

    white();
    switch (ch) {
    case '{':
        return object();
    case '[':
        return array();
    case '"':
        return string();
    case '-':
        return number();
    default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

module.exports = function (source, reviver) {
    var result;
    
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? (function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, value);
    }({'': result}, '')) : result;
};

},{}],10:[function(require,module,exports){
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;

function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function str(key, holder) {
    // Produce a string from holder[key].
    var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];
    
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    
    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
    
    // What happens next depends on the value's type.
    switch (typeof value) {
        case 'string':
            return quote(value);
        
        case 'number':
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';
        
        case 'boolean':
        case 'null':
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);
            
        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];
            
            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                
                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            
            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            
        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ?
            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
            '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

module.exports = function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    
    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
        indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function'
    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {'': value});
};

},{}],11:[function(require,module,exports){
"use strict";
(function (AggregateOp) {
    AggregateOp[AggregateOp["VALUES"] = 'values'] = "VALUES";
    AggregateOp[AggregateOp["COUNT"] = 'count'] = "COUNT";
    AggregateOp[AggregateOp["VALID"] = 'valid'] = "VALID";
    AggregateOp[AggregateOp["MISSING"] = 'missing'] = "MISSING";
    AggregateOp[AggregateOp["DISTINCT"] = 'distinct'] = "DISTINCT";
    AggregateOp[AggregateOp["SUM"] = 'sum'] = "SUM";
    AggregateOp[AggregateOp["MEAN"] = 'mean'] = "MEAN";
    AggregateOp[AggregateOp["AVERAGE"] = 'average'] = "AVERAGE";
    AggregateOp[AggregateOp["VARIANCE"] = 'variance'] = "VARIANCE";
    AggregateOp[AggregateOp["VARIANCEP"] = 'variancep'] = "VARIANCEP";
    AggregateOp[AggregateOp["STDEV"] = 'stdev'] = "STDEV";
    AggregateOp[AggregateOp["STDEVP"] = 'stdevp'] = "STDEVP";
    AggregateOp[AggregateOp["MEDIAN"] = 'median'] = "MEDIAN";
    AggregateOp[AggregateOp["Q1"] = 'q1'] = "Q1";
    AggregateOp[AggregateOp["Q3"] = 'q3'] = "Q3";
    AggregateOp[AggregateOp["MODESKEW"] = 'modeskew'] = "MODESKEW";
    AggregateOp[AggregateOp["MIN"] = 'min'] = "MIN";
    AggregateOp[AggregateOp["MAX"] = 'max'] = "MAX";
    AggregateOp[AggregateOp["ARGMIN"] = 'argmin'] = "ARGMIN";
    AggregateOp[AggregateOp["ARGMAX"] = 'argmax'] = "ARGMAX";
})(exports.AggregateOp || (exports.AggregateOp = {}));
var AggregateOp = exports.AggregateOp;
exports.AGGREGATE_OPS = [
    AggregateOp.VALUES,
    AggregateOp.COUNT,
    AggregateOp.VALID,
    AggregateOp.MISSING,
    AggregateOp.DISTINCT,
    AggregateOp.SUM,
    AggregateOp.MEAN,
    AggregateOp.AVERAGE,
    AggregateOp.VARIANCE,
    AggregateOp.VARIANCEP,
    AggregateOp.STDEV,
    AggregateOp.STDEVP,
    AggregateOp.MEDIAN,
    AggregateOp.Q1,
    AggregateOp.Q3,
    AggregateOp.MODESKEW,
    AggregateOp.MIN,
    AggregateOp.MAX,
    AggregateOp.ARGMIN,
    AggregateOp.ARGMAX,
];
exports.SHARED_DOMAIN_OPS = [
    AggregateOp.MEAN,
    AggregateOp.AVERAGE,
    AggregateOp.STDEV,
    AggregateOp.STDEVP,
    AggregateOp.MEDIAN,
    AggregateOp.Q1,
    AggregateOp.Q3,
    AggregateOp.MIN,
    AggregateOp.MAX,
];

},{}],12:[function(require,module,exports){
"use strict";
(function (AxisOrient) {
    AxisOrient[AxisOrient["TOP"] = 'top'] = "TOP";
    AxisOrient[AxisOrient["RIGHT"] = 'right'] = "RIGHT";
    AxisOrient[AxisOrient["LEFT"] = 'left'] = "LEFT";
    AxisOrient[AxisOrient["BOTTOM"] = 'bottom'] = "BOTTOM";
})(exports.AxisOrient || (exports.AxisOrient = {}));
var AxisOrient = exports.AxisOrient;
exports.defaultAxisConfig = {
    offset: undefined,
    grid: undefined,
    labels: true,
    labelMaxLength: 25,
    tickSize: undefined,
    characterWidth: 6
};
exports.defaultFacetAxisConfig = {
    axisWidth: 0,
    labels: true,
    grid: false,
    tickSize: 0
};

},{}],13:[function(require,module,exports){
"use strict";
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

},{"./channel":14}],14:[function(require,module,exports){
"use strict";
var util_1 = require('./util');
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
    Channel[Channel["LABEL"] = 'label'] = "LABEL";
    Channel[Channel["PATH"] = 'path'] = "PATH";
    Channel[Channel["ORDER"] = 'order'] = "ORDER";
    Channel[Channel["OPACITY"] = 'opacity'] = "OPACITY";
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
exports.LABEL = Channel.LABEL;
exports.PATH = Channel.PATH;
exports.ORDER = Channel.ORDER;
exports.OPACITY = Channel.OPACITY;
exports.CHANNELS = [exports.X, exports.Y, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.PATH, exports.ORDER, exports.OPACITY, exports.TEXT, exports.DETAIL, exports.LABEL];
exports.UNIT_CHANNELS = util_1.without(exports.CHANNELS, [exports.ROW, exports.COLUMN]);
exports.UNIT_SCALE_CHANNELS = util_1.without(exports.UNIT_CHANNELS, [exports.PATH, exports.ORDER, exports.DETAIL, exports.TEXT, exports.LABEL]);
exports.NONSPATIAL_CHANNELS = util_1.without(exports.UNIT_CHANNELS, [exports.X, exports.Y]);
exports.NONSPATIAL_SCALE_CHANNELS = util_1.without(exports.UNIT_SCALE_CHANNELS, [exports.X, exports.Y]);
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
        case exports.ORDER:
        case exports.OPACITY:
        case exports.ROW:
        case exports.COLUMN:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, line: true, area: true, text: true
            };
        case exports.SIZE:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
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
        case exports.OPACITY:
        case exports.LABEL:
        case exports.DETAIL:
            return {
                measure: true,
                dimension: true
            };
        case exports.ROW:
        case exports.COLUMN:
        case exports.SHAPE:
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
function hasScale(channel) {
    return !util_1.contains([exports.DETAIL, exports.PATH, exports.TEXT, exports.LABEL, exports.ORDER], channel);
}
exports.hasScale = hasScale;

},{"./util":61}],15:[function(require,module,exports){
"use strict";
var axis_1 = require('../axis');
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var type_1 = require('../type');
var util_1 = require('../util');
var common_1 = require('./common');
function parseAxisComponent(model, axisChannels) {
    return axisChannels.reduce(function (axis, channel) {
        if (model.axis(channel)) {
            axis[channel] = parseAxis(channel, model);
        }
        return axis;
    }, {});
}
exports.parseAxisComponent = parseAxisComponent;
function parseInnerAxis(channel, model) {
    var isCol = channel === channel_1.COLUMN, isRow = channel === channel_1.ROW, type = isCol ? 'x' : isRow ? 'y' : channel;
    var def = {
        type: type,
        scale: model.scaleName(channel),
        grid: true,
        tickSize: 0,
        properties: {
            labels: {
                text: { value: '' }
            },
            axis: {
                stroke: { value: 'transparent' }
            }
        }
    };
    var axis = model.axis(channel);
    ['layer', 'ticks', 'values', 'subdivide'].forEach(function (property) {
        var method;
        var value = (method = exports[property]) ?
            method(model, channel, def) :
            axis[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    var props = model.axis(channel).properties || {};
    ['grid'].forEach(function (group) {
        var value = properties[group] ?
            properties[group](model, channel, props[group] || {}, def) :
            props[group];
        if (value !== undefined && util_1.keys(value).length > 0) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.parseInnerAxis = parseInnerAxis;
function parseAxis(channel, model) {
    var isCol = channel === channel_1.COLUMN, isRow = channel === channel_1.ROW, type = isCol ? 'x' : isRow ? 'y' : channel;
    var axis = model.axis(channel);
    var def = {
        type: type,
        scale: model.scaleName(channel)
    };
    util_1.extend(def, common_1.formatMixins(model, channel, model.axis(channel).format));
    [
        'grid', 'layer', 'offset', 'orient', 'tickSize', 'ticks', 'tickSizeEnd', 'title', 'titleOffset',
        'tickPadding', 'tickSize', 'tickSizeMajor', 'tickSizeMinor', 'values', 'subdivide'
    ].forEach(function (property) {
        var method;
        var value = (method = exports[property]) ?
            method(model, channel, def) :
            axis[property];
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
            properties[group](model, channel, props[group] || {}, def) :
            props[group];
        if (value !== undefined && util_1.keys(value).length > 0) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.parseAxis = parseAxis;
function offset(model, channel) {
    return model.axis(channel).offset;
}
exports.offset = offset;
function gridShow(model, channel) {
    var grid = model.axis(channel).grid;
    if (grid !== undefined) {
        return grid;
    }
    return !model.isOrdinalScale(channel) && !model.fieldDef(channel).bin;
}
exports.gridShow = gridShow;
function grid(model, channel) {
    if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
        return undefined;
    }
    return gridShow(model, channel) && ((channel === channel_1.Y || channel === channel_1.X) && !(model.parent() && model.parent().isFacet()));
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
        return axis_1.AxisOrient.TOP;
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
    return undefined;
}
exports.tickSize = tickSize;
function tickSizeEnd(model, channel) {
    var tickSizeEnd = model.axis(channel).tickSizeEnd;
    if (tickSizeEnd !== undefined) {
        return tickSizeEnd;
    }
    return undefined;
}
exports.tickSizeEnd = tickSizeEnd;
function title(model, channel) {
    var axis = model.axis(channel);
    if (axis.title !== undefined) {
        return axis.title;
    }
    var fieldTitle = fielddef_1.title(model.fieldDef(channel));
    var maxLength;
    if (axis.titleMaxLength) {
        maxLength = axis.titleMaxLength;
    }
    else if (channel === channel_1.X && !model.isOrdinalScale(channel_1.X)) {
        var unitModel = model;
        maxLength = unitModel.config().cell.width / model.axis(channel_1.X).characterWidth;
    }
    else if (channel === channel_1.Y && !model.isOrdinalScale(channel_1.Y)) {
        var unitModel = model;
        maxLength = unitModel.config().cell.height / model.axis(channel_1.Y).characterWidth;
    }
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
function titleOffset(model, channel) {
    var titleOffset = model.axis(channel).titleOffset;
    if (titleOffset !== undefined) {
        return titleOffset;
    }
    return undefined;
}
exports.titleOffset = titleOffset;
var properties;
(function (properties) {
    function axis(model, channel, axisPropsSpec) {
        var axis = model.axis(channel);
        return util_1.extend(axis.axisColor !== undefined ?
            { stroke: { value: axis.axisColor } } :
            {}, axis.axisWidth !== undefined ?
            { strokeWidth: { value: axis.axisWidth } } :
            {}, axisPropsSpec || {});
    }
    properties.axis = axis;
    function grid(model, channel, gridPropsSpec) {
        var axis = model.axis(channel);
        return util_1.extend(axis.gridColor !== undefined ? { stroke: { value: axis.gridColor } } : {}, axis.gridOpacity !== undefined ? { strokeOpacity: { value: axis.gridOpacity } } : {}, axis.gridWidth !== undefined ? { strokeWidth: { value: axis.gridWidth } } : {}, axis.gridDash !== undefined ? { strokeDashOffset: { value: axis.gridDash } } : {}, gridPropsSpec || {});
    }
    properties.grid = grid;
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
        if (axis.labelAngle !== undefined) {
            labelsSpec.angle = { value: axis.labelAngle };
        }
        else {
            if (channel === channel_1.X && (fielddef_1.isDimension(fieldDef) || fieldDef.type === type_1.TEMPORAL)) {
                labelsSpec.angle = { value: 270 };
            }
        }
        if (axis.labelAlign !== undefined) {
            labelsSpec.align = { value: axis.labelAlign };
        }
        else {
            if (labelsSpec.angle) {
                if (labelsSpec.angle.value === 270) {
                    labelsSpec.align = {
                        value: def.orient === 'top' ? 'left' :
                            def.type === 'x' ? 'right' :
                                'center'
                    };
                }
                else if (labelsSpec.angle.value === 90) {
                    labelsSpec.align = { value: 'center' };
                }
            }
        }
        if (axis.labelBaseline !== undefined) {
            labelsSpec.baseline = { value: axis.labelBaseline };
        }
        else {
            if (labelsSpec.angle) {
                if (labelsSpec.angle.value === 270) {
                    labelsSpec.baseline = { value: def.type === 'x' ? 'middle' : 'bottom' };
                }
                else if (labelsSpec.angle.value === 90) {
                    labelsSpec.baseline = { value: 'bottom' };
                }
            }
        }
        if (axis.tickLabelColor !== undefined) {
            labelsSpec.stroke = { value: axis.tickLabelColor };
        }
        if (axis.tickLabelFont !== undefined) {
            labelsSpec.font = { value: axis.tickLabelFont };
        }
        if (axis.tickLabelFontSize !== undefined) {
            labelsSpec.fontSize = { value: axis.tickLabelFontSize };
        }
        return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
    }
    properties.labels = labels;
    function ticks(model, channel, ticksPropsSpec) {
        var axis = model.axis(channel);
        return util_1.extend(axis.tickColor !== undefined ? { stroke: { value: axis.tickColor } } : {}, axis.tickWidth !== undefined ? { strokeWidth: { value: axis.tickWidth } } : {}, ticksPropsSpec || {});
    }
    properties.ticks = ticks;
    function title(model, channel, titlePropsSpec) {
        var axis = model.axis(channel);
        return util_1.extend(axis.titleColor !== undefined ? { stroke: { value: axis.titleColor } } : {}, axis.titleFont !== undefined ? { font: { value: axis.titleFont } } : {}, axis.titleFontSize !== undefined ? { fontSize: { value: axis.titleFontSize } } : {}, axis.titleFontWeight !== undefined ? { fontWeight: { value: axis.titleFontWeight } } : {}, titlePropsSpec || {});
    }
    properties.title = title;
})(properties = exports.properties || (exports.properties = {}));

},{"../axis":12,"../channel":14,"../fielddef":52,"../type":60,"../util":61,"./common":16}],16:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var sort_1 = require('../sort');
var type_1 = require('../type');
var util_1 = require('../util');
var facet_1 = require('./facet');
var layer_1 = require('./layer');
var timeunit_1 = require('../timeunit');
var unit_1 = require('./unit');
var spec_1 = require('../spec');
function buildModel(spec, parent, parentGivenName) {
    if (spec_1.isFacetSpec(spec)) {
        return new facet_1.FacetModel(spec, parent, parentGivenName);
    }
    if (spec_1.isLayerSpec(spec)) {
        return new layer_1.LayerModel(spec, parent, parentGivenName);
    }
    if (spec_1.isUnitSpec(spec)) {
        return new unit_1.UnitModel(spec, parent, parentGivenName);
    }
    console.error('Invalid spec.');
    return null;
}
exports.buildModel = buildModel;
exports.STROKE_CONFIG = ['stroke', 'strokeWidth',
    'strokeDash', 'strokeDashOffset', 'strokeOpacity', 'opacity'];
exports.FILL_CONFIG = ['fill', 'fillOpacity',
    'opacity'];
exports.FILL_STROKE_CONFIG = util_1.union(exports.STROKE_CONFIG, exports.FILL_CONFIG);
function applyColorAndOpacity(p, model) {
    var filled = model.config().mark.filled;
    var colorFieldDef = model.fieldDef(channel_1.COLOR);
    var opacityFieldDef = model.fieldDef(channel_1.OPACITY);
    if (filled) {
        applyMarkConfig(p, model, exports.FILL_CONFIG);
    }
    else {
        applyMarkConfig(p, model, exports.STROKE_CONFIG);
    }
    var colorValue;
    var opacityValue;
    if (model.has(channel_1.COLOR)) {
        colorValue = {
            scale: model.scaleName(channel_1.COLOR),
            field: model.field(channel_1.COLOR, colorFieldDef.type === type_1.ORDINAL ? { prefn: 'rank_' } : {})
        };
    }
    else if (colorFieldDef && colorFieldDef.value) {
        colorValue = { value: colorFieldDef.value };
    }
    if (model.has(channel_1.OPACITY)) {
        opacityValue = {
            scale: model.scaleName(channel_1.OPACITY),
            field: model.field(channel_1.OPACITY, opacityFieldDef.type === type_1.ORDINAL ? { prefn: 'rank_' } : {})
        };
    }
    else if (opacityFieldDef && opacityFieldDef.value) {
        opacityValue = { value: opacityFieldDef.value };
    }
    if (colorValue !== undefined) {
        if (filled) {
            p.fill = colorValue;
        }
        else {
            p.stroke = colorValue;
        }
    }
    else {
        p[filled ? 'fill' : 'stroke'] = p[filled ? 'fill' : 'stroke'] ||
            { value: model.config().mark.color };
    }
    if (opacityValue !== undefined) {
        p.opacity = opacityValue;
    }
}
exports.applyColorAndOpacity = applyColorAndOpacity;
function applyConfig(properties, config, propsList) {
    propsList.forEach(function (property) {
        var value = config[property];
        if (value !== undefined) {
            properties[property] = { value: value };
        }
    });
    return properties;
}
exports.applyConfig = applyConfig;
function applyMarkConfig(marksProperties, model, propsList) {
    return applyConfig(marksProperties, model.config().mark, propsList);
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
        case channel_1.OPACITY:
        case channel_1.SHAPE:
        case channel_1.SIZE:
            return model.legend(channel).shortTimeLabels;
        case channel_1.TEXT:
            return model.config().mark.shortTimeLabels;
        case channel_1.LABEL:
    }
    return false;
}
function sortField(orderChannelDef) {
    return (orderChannelDef.sort === sort_1.SortOrder.DESCENDING ? '-' : '') + fielddef_1.field(orderChannelDef);
}
exports.sortField = sortField;
function timeFormat(model, channel) {
    var fieldDef = model.fieldDef(channel);
    return timeunit_1.format(fieldDef.timeUnit, isAbbreviated(model, channel, fieldDef));
}
exports.timeFormat = timeFormat;

},{"../channel":14,"../fielddef":52,"../sort":57,"../spec":58,"../timeunit":59,"../type":60,"../util":61,"./facet":32,"./layer":33,"./unit":48}],17:[function(require,module,exports){
"use strict";
var data_1 = require('../data');
var spec_1 = require('../spec');
var util_1 = require('../util');
var common_1 = require('./common');
function compile(inputSpec) {
    var spec = spec_1.normalize(inputSpec);
    var model = common_1.buildModel(spec, null, '');
    model.parse();
    return assemble(model);
}
exports.compile = compile;
function assemble(model) {
    var config = model.config();
    var output = util_1.extend({
        width: 1,
        height: 1,
        padding: 'auto'
    }, config.viewport ? { viewport: config.viewport } : {}, config.background ? { background: config.background } : {}, {
        data: [].concat(model.assembleData([]), model.assembleLayout([])),
        marks: [assembleRootGroup(model)]
    });
    return {
        spec: output
    };
}
function assembleRootGroup(model) {
    var rootGroup = util_1.extend({
        name: model.name('root'),
        type: 'group',
    }, model.description() ? { description: model.description() } : {}, {
        from: { data: data_1.LAYOUT },
        properties: {
            update: util_1.extend({
                width: { field: 'width' },
                height: { field: 'height' }
            }, model.assembleParentGroupProperties(model.config().cell))
        }
    });
    return util_1.extend(rootGroup, model.assembleGroup());
}
exports.assembleRootGroup = assembleRootGroup;

},{"../data":50,"../spec":58,"../util":61,"./common":16}],18:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var encoding_1 = require('../encoding');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var util_1 = require('../util');
function initMarkConfig(mark, encoding, config) {
    return util_1.extend(['filled', 'opacity', 'orient', 'align'].reduce(function (cfg, property) {
        var value = config.mark[property];
        switch (property) {
            case 'filled':
                if (value === undefined) {
                    cfg[property] = mark !== mark_1.POINT && mark !== mark_1.LINE && mark !== mark_1.RULE;
                }
                break;
            case 'opacity':
                if (value === undefined && util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], mark)) {
                    if (!encoding_1.isAggregate(encoding) || encoding_1.has(encoding, channel_1.DETAIL)) {
                        cfg[property] = 0.7;
                    }
                }
                break;
            case 'orient':
                var xIsMeasure = fielddef_1.isMeasure(encoding.x);
                var yIsMeasure = fielddef_1.isMeasure(encoding.y);
                if (xIsMeasure && !yIsMeasure) {
                    if (mark === mark_1.TICK) {
                        cfg[property] = 'vertical';
                    }
                    else {
                        cfg[property] = 'horizontal';
                    }
                }
                else if (!xIsMeasure && yIsMeasure) {
                    if (mark === mark_1.TICK) {
                        cfg[property] = 'horizontal';
                    }
                    else {
                        cfg[property] = 'vertical';
                    }
                }
                break;
            case 'align':
                if (value === undefined) {
                    cfg[property] = encoding_1.has(encoding, channel_1.X) ? 'center' : 'right';
                }
        }
        return cfg;
    }, {}), config.mark);
}
exports.initMarkConfig = initMarkConfig;

},{"../channel":14,"../encoding":51,"../fielddef":52,"../mark":54,"../util":61}],19:[function(require,module,exports){
"use strict";
var bin_1 = require('../../bin');
var channel_1 = require('../../channel');
var fielddef_1 = require('../../fielddef');
var util_1 = require('../../util');
var bin;
(function (bin_2) {
    function parse(model) {
        return model.reduce(function (binComponent, fieldDef, channel) {
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
                var transform = [binTrans];
                var isOrdinalColor = model.isOrdinalScale(channel) || channel === channel_1.COLOR;
                if (isOrdinalColor) {
                    transform.push({
                        type: 'formula',
                        field: fielddef_1.field(fieldDef, { binSuffix: '_range' }),
                        expr: fielddef_1.field(fieldDef, { datum: true, binSuffix: '_start' }) +
                            ' + \'-\' + ' +
                            fielddef_1.field(fieldDef, { datum: true, binSuffix: '_end' })
                    });
                }
                var key = util_1.hash(bin) + '_' + fieldDef.field + 'oc:' + isOrdinalColor;
                binComponent[key] = transform;
            }
            return binComponent;
        }, {});
    }
    bin_2.parseUnit = parse;
    function parseFacet(model) {
        var binComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            util_1.extend(binComponent, childDataComponent.bin);
            delete childDataComponent.bin;
        }
        return binComponent;
    }
    bin_2.parseFacet = parseFacet;
    function parseLayer(model) {
        var binComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source) {
                util_1.extend(binComponent, childDataComponent.bin);
                delete childDataComponent.bin;
            }
        });
        return binComponent;
    }
    bin_2.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.flatten(util_1.vals(component.bin));
    }
    bin_2.assemble = assemble;
})(bin = exports.bin || (exports.bin = {}));

},{"../../bin":13,"../../channel":14,"../../fielddef":52,"../../util":61}],20:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var type_1 = require('../../type');
var util_1 = require('../../util');
var colorRank;
(function (colorRank) {
    function parseUnit(model) {
        var colorRankComponent = {};
        if (model.has(channel_1.COLOR) && model.fieldDef(channel_1.COLOR).type === type_1.ORDINAL) {
            colorRankComponent[model.field(channel_1.COLOR)] = [{
                    type: 'sort',
                    by: model.field(channel_1.COLOR)
                }, {
                    type: 'rank',
                    field: model.field(channel_1.COLOR),
                    output: {
                        rank: model.field(channel_1.COLOR, { prefn: 'rank_' })
                    }
                }];
        }
        return colorRankComponent;
    }
    colorRank.parseUnit = parseUnit;
    function parseFacet(model) {
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            var colorRankComponent = childDataComponent.colorRank;
            delete childDataComponent.colorRank;
            return colorRankComponent;
        }
        return {};
    }
    colorRank.parseFacet = parseFacet;
    function parseLayer(model) {
        var colorRankComponent = {};
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source) {
                util_1.extend(colorRankComponent, childDataComponent.colorRank);
                delete childDataComponent.colorRank;
            }
        });
        return colorRankComponent;
    }
    colorRank.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.flatten(util_1.vals(component.colorRank));
    }
    colorRank.assemble = assemble;
})(colorRank = exports.colorRank || (exports.colorRank = {}));

},{"../../channel":14,"../../type":60,"../../util":61}],21:[function(require,module,exports){
"use strict";
var util_1 = require('../../util');
var source_1 = require('./source');
var formatparse_1 = require('./formatparse');
var nullfilter_1 = require('./nullfilter');
var filter_1 = require('./filter');
var bin_1 = require('./bin');
var formula_1 = require('./formula');
var nonpositivenullfilter_1 = require('./nonpositivenullfilter');
var summary_1 = require('./summary');
var stackscale_1 = require('./stackscale');
var timeunit_1 = require('./timeunit');
var timeunitdomain_1 = require('./timeunitdomain');
var colorrank_1 = require('./colorrank');
function parseUnitData(model) {
    return {
        formatParse: formatparse_1.formatParse.parseUnit(model),
        nullFilter: nullfilter_1.nullFilter.parseUnit(model),
        filter: filter_1.filter.parseUnit(model),
        nonPositiveFilter: nonpositivenullfilter_1.nonPositiveFilter.parseUnit(model),
        source: source_1.source.parseUnit(model),
        bin: bin_1.bin.parseUnit(model),
        calculate: formula_1.formula.parseUnit(model),
        timeUnit: timeunit_1.timeUnit.parseUnit(model),
        timeUnitDomain: timeunitdomain_1.timeUnitDomain.parseUnit(model),
        summary: summary_1.summary.parseUnit(model),
        stackScale: stackscale_1.stackScale.parseUnit(model),
        colorRank: colorrank_1.colorRank.parseUnit(model)
    };
}
exports.parseUnitData = parseUnitData;
function parseFacetData(model) {
    return {
        formatParse: formatparse_1.formatParse.parseFacet(model),
        nullFilter: nullfilter_1.nullFilter.parseFacet(model),
        filter: filter_1.filter.parseFacet(model),
        nonPositiveFilter: nonpositivenullfilter_1.nonPositiveFilter.parseFacet(model),
        source: source_1.source.parseFacet(model),
        bin: bin_1.bin.parseFacet(model),
        calculate: formula_1.formula.parseFacet(model),
        timeUnit: timeunit_1.timeUnit.parseFacet(model),
        timeUnitDomain: timeunitdomain_1.timeUnitDomain.parseFacet(model),
        summary: summary_1.summary.parseFacet(model),
        stackScale: stackscale_1.stackScale.parseFacet(model),
        colorRank: colorrank_1.colorRank.parseFacet(model)
    };
}
exports.parseFacetData = parseFacetData;
function parseLayerData(model) {
    return {
        filter: filter_1.filter.parseLayer(model),
        formatParse: formatparse_1.formatParse.parseLayer(model),
        nullFilter: nullfilter_1.nullFilter.parseLayer(model),
        nonPositiveFilter: nonpositivenullfilter_1.nonPositiveFilter.parseLayer(model),
        source: source_1.source.parseLayer(model),
        bin: bin_1.bin.parseLayer(model),
        calculate: formula_1.formula.parseLayer(model),
        timeUnit: timeunit_1.timeUnit.parseLayer(model),
        timeUnitDomain: timeunitdomain_1.timeUnitDomain.parseLayer(model),
        summary: summary_1.summary.parseLayer(model),
        stackScale: stackscale_1.stackScale.parseLayer(model),
        colorRank: colorrank_1.colorRank.parseLayer(model)
    };
}
exports.parseLayerData = parseLayerData;
function assembleData(model, data) {
    var component = model.component.data;
    var sourceData = source_1.source.assemble(model, component);
    if (sourceData) {
        data.push(sourceData);
    }
    summary_1.summary.assemble(component, model).forEach(function (summaryData) {
        data.push(summaryData);
    });
    if (data.length > 0) {
        var dataTable = data[data.length - 1];
        var colorRankTransform = colorrank_1.colorRank.assemble(component);
        if (colorRankTransform.length > 0) {
            dataTable.transform = (dataTable.transform || []).concat(colorRankTransform);
        }
        var nonPositiveFilterTransform = nonpositivenullfilter_1.nonPositiveFilter.assemble(component);
        if (nonPositiveFilterTransform.length > 0) {
            dataTable.transform = (dataTable.transform || []).concat(nonPositiveFilterTransform);
        }
    }
    else {
        if (util_1.keys(component.colorRank).length > 0) {
            throw new Error('Invalid colorRank not merged');
        }
        else if (util_1.keys(component.nonPositiveFilter).length > 0) {
            throw new Error('Invalid nonPositiveFilter not merged');
        }
    }
    var stackData = stackscale_1.stackScale.assemble(component);
    if (stackData) {
        data.push(stackData);
    }
    timeunitdomain_1.timeUnitDomain.assemble(component).forEach(function (timeUnitDomainData) {
        data.push(timeUnitDomainData);
    });
    return data;
}
exports.assembleData = assembleData;

},{"../../util":61,"./bin":19,"./colorrank":20,"./filter":22,"./formatparse":23,"./formula":24,"./nonpositivenullfilter":25,"./nullfilter":26,"./source":27,"./stackscale":28,"./summary":29,"./timeunit":30,"./timeunitdomain":31}],22:[function(require,module,exports){
"use strict";
var filter;
(function (filter_1) {
    function parse(model) {
        return model.transform().filter;
    }
    filter_1.parseUnit = parse;
    function parseFacet(model) {
        var filterComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source && childDataComponent.filter) {
            filterComponent =
                (filterComponent ? filterComponent + ' && ' : '') +
                    childDataComponent.filter;
            delete childDataComponent.filter;
        }
        return filterComponent;
    }
    filter_1.parseFacet = parseFacet;
    function parseLayer(model) {
        var filterComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && childDataComponent.filter && childDataComponent.filter === filterComponent) {
                delete childDataComponent.filter;
            }
        });
        return filterComponent;
    }
    filter_1.parseLayer = parseLayer;
    function assemble(component) {
        var filter = component.filter;
        return filter ? [{
                type: 'filter',
                test: filter
            }] : [];
    }
    filter_1.assemble = assemble;
})(filter = exports.filter || (exports.filter = {}));

},{}],23:[function(require,module,exports){
"use strict";
var fielddef_1 = require('../../fielddef');
var type_1 = require('../../type');
var util_1 = require('../../util');
var formatParse;
(function (formatParse) {
    function parse(model) {
        var calcFieldMap = (model.transform().calculate || []).reduce(function (fieldMap, formula) {
            fieldMap[formula.field] = true;
            return fieldMap;
        }, {});
        var parseComponent = {};
        model.forEach(function (fieldDef) {
            if (fieldDef.type === type_1.TEMPORAL) {
                parseComponent[fieldDef.field] = 'date';
            }
            else if (fieldDef.type === type_1.QUANTITATIVE) {
                if (fielddef_1.isCount(fieldDef) || calcFieldMap[fieldDef.field]) {
                    return;
                }
                parseComponent[fieldDef.field] = 'number';
            }
        });
        return parseComponent;
    }
    formatParse.parseUnit = parse;
    function parseFacet(model) {
        var parseComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source && childDataComponent.formatParse) {
            util_1.extend(parseComponent, childDataComponent.formatParse);
            delete childDataComponent.formatParse;
        }
        return parseComponent;
    }
    formatParse.parseFacet = parseFacet;
    function parseLayer(model) {
        var parseComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.formatParse, parseComponent)) {
                util_1.extend(parseComponent, childDataComponent.formatParse);
                delete childDataComponent.formatParse;
            }
        });
        return parseComponent;
    }
    formatParse.parseLayer = parseLayer;
})(formatParse = exports.formatParse || (exports.formatParse = {}));

},{"../../fielddef":52,"../../type":60,"../../util":61}],24:[function(require,module,exports){
"use strict";
var util_1 = require('../../util');
var formula;
(function (formula_1) {
    function parse(model) {
        return (model.transform().calculate || []).reduce(function (formulaComponent, formula) {
            formulaComponent[util_1.hash(formula)] = formula;
            return formulaComponent;
        }, {});
    }
    formula_1.parseUnit = parse;
    function parseFacet(model) {
        var formulaComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            util_1.extend(formulaComponent, childDataComponent.calculate);
            delete childDataComponent.calculate;
        }
        return formulaComponent;
    }
    formula_1.parseFacet = parseFacet;
    function parseLayer(model) {
        var formulaComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source && childDataComponent.calculate) {
                util_1.extend(formulaComponent || {}, childDataComponent.calculate);
                delete childDataComponent.calculate;
            }
        });
        return formulaComponent;
    }
    formula_1.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.vals(component.calculate).reduce(function (transform, formula) {
            transform.push(util_1.extend({ type: 'formula' }, formula));
            return transform;
        }, []);
    }
    formula_1.assemble = assemble;
})(formula = exports.formula || (exports.formula = {}));

},{"../../util":61}],25:[function(require,module,exports){
"use strict";
var scale_1 = require('../../scale');
var util_1 = require('../../util');
var nonPositiveFilter;
(function (nonPositiveFilter_1) {
    function parseUnit(model) {
        return model.channels().reduce(function (nonPositiveComponent, channel) {
            var scale = model.scale(channel);
            if (!model.field(channel) || !scale) {
                return nonPositiveComponent;
            }
            nonPositiveComponent[model.field(channel)] = scale.type === scale_1.ScaleType.LOG;
            return nonPositiveComponent;
        }, {});
    }
    nonPositiveFilter_1.parseUnit = parseUnit;
    function parseFacet(model) {
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            var nonPositiveFilterComponent = childDataComponent.nonPositiveFilter;
            delete childDataComponent.nonPositiveFilter;
            return nonPositiveFilterComponent;
        }
        return {};
    }
    nonPositiveFilter_1.parseFacet = parseFacet;
    function parseLayer(model) {
        var nonPositiveFilter = {};
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.nonPositiveFilter, nonPositiveFilter)) {
                util_1.extend(nonPositiveFilter, childDataComponent.nonPositiveFilter);
                delete childDataComponent.nonPositiveFilter;
            }
        });
        return nonPositiveFilter;
    }
    nonPositiveFilter_1.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.keys(component.nonPositiveFilter).filter(function (field) {
            return component.nonPositiveFilter[field];
        }).map(function (field) {
            return {
                type: 'filter',
                test: 'datum.' + field + ' > 0'
            };
        });
    }
    nonPositiveFilter_1.assemble = assemble;
})(nonPositiveFilter = exports.nonPositiveFilter || (exports.nonPositiveFilter = {}));

},{"../../scale":55,"../../util":61}],26:[function(require,module,exports){
"use strict";
var util_1 = require('../../util');
var DEFAULT_NULL_FILTERS = {
    nominal: false,
    ordinal: false,
    quantitative: true,
    temporal: true
};
var nullFilter;
(function (nullFilter) {
    function parse(model) {
        var filterNull = model.transform().filterNull;
        return model.reduce(function (aggregator, fieldDef) {
            if (filterNull ||
                (filterNull === undefined && fieldDef.field && fieldDef.field !== '*' && DEFAULT_NULL_FILTERS[fieldDef.type])) {
                aggregator[fieldDef.field] = true;
            }
            else {
                aggregator[fieldDef.field] = false;
            }
            return aggregator;
        }, {});
    }
    nullFilter.parseUnit = parse;
    function parseFacet(model) {
        var nullFilterComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            util_1.extend(nullFilterComponent, childDataComponent.nullFilter);
            delete childDataComponent.nullFilter;
        }
        return nullFilterComponent;
    }
    nullFilter.parseFacet = parseFacet;
    function parseLayer(model) {
        var nullFilterComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.nullFilter, nullFilterComponent)) {
                util_1.extend(nullFilterComponent, childDataComponent.nullFilter);
                delete childDataComponent.nullFilter;
            }
        });
        return nullFilterComponent;
    }
    nullFilter.parseLayer = parseLayer;
    function assemble(component) {
        var filteredFields = util_1.keys(component.nullFilter).filter(function (field) {
            return component.nullFilter[field];
        });
        return filteredFields.length > 0 ?
            [{
                    type: 'filter',
                    test: filteredFields.map(function (fieldName) {
                        return 'datum.' + fieldName + '!==null';
                    }).join(' && ')
                }] : [];
    }
    nullFilter.assemble = assemble;
})(nullFilter = exports.nullFilter || (exports.nullFilter = {}));

},{"../../util":61}],27:[function(require,module,exports){
"use strict";
var data_1 = require('../../data');
var util_1 = require('../../util');
var nullfilter_1 = require('./nullfilter');
var filter_1 = require('./filter');
var bin_1 = require('./bin');
var formula_1 = require('./formula');
var timeunit_1 = require('./timeunit');
var source;
(function (source) {
    function parse(model) {
        var data = model.data();
        if (data) {
            var sourceData = { name: model.dataName(data_1.SOURCE) };
            if (data.values && data.values.length > 0) {
                sourceData.values = model.data().values;
                sourceData.format = { type: 'json' };
            }
            else if (data.url) {
                sourceData.url = data.url;
                var defaultExtension = /(?:\.([^.]+))?$/.exec(sourceData.url)[1];
                if (!util_1.contains(['json', 'csv', 'tsv'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                sourceData.format = { type: model.data().formatType || defaultExtension };
            }
            return sourceData;
        }
        else if (!model.parent()) {
            return { name: model.dataName(data_1.SOURCE) };
        }
        return undefined;
    }
    source.parseUnit = parse;
    function parseFacet(model) {
        var sourceData = parse(model);
        if (!model.child().component.data.source) {
            model.child().renameData(model.child().dataName(data_1.SOURCE), model.dataName(data_1.SOURCE));
        }
        return sourceData;
    }
    source.parseFacet = parseFacet;
    function parseLayer(model) {
        var sourceData = parse(model);
        model.children().forEach(function (child) {
            var childData = child.component.data;
            if (model.compatibleSource(child)) {
                var canMerge = !childData.filter && !childData.formatParse && !childData.nullFilter;
                if (canMerge) {
                    child.renameData(child.dataName(data_1.SOURCE), model.dataName(data_1.SOURCE));
                    delete childData.source;
                }
                else {
                    childData.source = {
                        name: child.dataName(data_1.SOURCE),
                        source: model.dataName(data_1.SOURCE)
                    };
                }
            }
        });
        return sourceData;
    }
    source.parseLayer = parseLayer;
    function assemble(model, component) {
        if (component.source) {
            var sourceData = component.source;
            if (component.formatParse) {
                component.source.format = component.source.format || {};
                component.source.format.parse = component.formatParse;
            }
            sourceData.transform = [].concat(nullfilter_1.nullFilter.assemble(component), formula_1.formula.assemble(component), filter_1.filter.assemble(component), bin_1.bin.assemble(component), timeunit_1.timeUnit.assemble(component));
            return sourceData;
        }
        return null;
    }
    source.assemble = assemble;
})(source = exports.source || (exports.source = {}));

},{"../../data":50,"../../util":61,"./bin":19,"./filter":22,"./formula":24,"./nullfilter":26,"./timeunit":30}],28:[function(require,module,exports){
"use strict";
var data_1 = require('../../data');
var fielddef_1 = require('../../fielddef');
var stackScale;
(function (stackScale) {
    function parseUnit(model) {
        var stackProps = model.stack();
        if (stackProps) {
            var groupbyChannel = stackProps.groupbyChannel;
            var fieldChannel = stackProps.fieldChannel;
            return {
                name: model.dataName(data_1.STACKED_SCALE),
                source: model.dataName(data_1.SUMMARY),
                transform: [{
                        type: 'aggregate',
                        groupby: [model.field(groupbyChannel)],
                        summarize: [{ ops: ['sum'], field: model.field(fieldChannel) }]
                    }]
            };
        }
        return null;
    }
    stackScale.parseUnit = parseUnit;
    ;
    function parseFacet(model) {
        var child = model.child();
        var childDataComponent = child.component.data;
        if (!childDataComponent.source && childDataComponent.stackScale) {
            var stackComponent = childDataComponent.stackScale;
            var newName = model.dataName(data_1.STACKED_SCALE);
            child.renameData(stackComponent.name, newName);
            stackComponent.name = newName;
            stackComponent.source = model.dataName(data_1.SUMMARY);
            stackComponent.transform[0].groupby = model.reduce(function (groupby, fieldDef) {
                groupby.push(fielddef_1.field(fieldDef));
                return groupby;
            }, stackComponent.transform[0].groupby);
            delete childDataComponent.stackScale;
            return stackComponent;
        }
        return null;
    }
    stackScale.parseFacet = parseFacet;
    function parseLayer(model) {
        return null;
    }
    stackScale.parseLayer = parseLayer;
    function assemble(component) {
        return component.stackScale;
    }
    stackScale.assemble = assemble;
})(stackScale = exports.stackScale || (exports.stackScale = {}));

},{"../../data":50,"../../fielddef":52}],29:[function(require,module,exports){
"use strict";
var aggregate_1 = require('../../aggregate');
var data_1 = require('../../data');
var fielddef_1 = require('../../fielddef');
var util_1 = require('../../util');
var summary;
(function (summary) {
    function addDimension(dims, fieldDef) {
        if (fieldDef.bin) {
            dims[fielddef_1.field(fieldDef, { binSuffix: '_start' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: '_mid' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: '_end' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: '_range' })] = true;
        }
        else {
            dims[fielddef_1.field(fieldDef)] = true;
        }
        return dims;
    }
    function parseUnit(model) {
        var dims = {};
        var meas = {};
        model.forEach(function (fieldDef, channel) {
            if (fieldDef.aggregate) {
                if (fieldDef.aggregate === aggregate_1.AggregateOp.COUNT) {
                    meas['*'] = meas['*'] || {};
                    meas['*']['count'] = true;
                }
                else {
                    meas[fieldDef.field] = meas[fieldDef.field] || {};
                    meas[fieldDef.field][fieldDef.aggregate] = true;
                }
            }
            else {
                addDimension(dims, fieldDef);
            }
        });
        return [{
                name: model.dataName(data_1.SUMMARY),
                dimensions: dims,
                measures: meas
            }];
    }
    summary.parseUnit = parseUnit;
    function parseFacet(model) {
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source && childDataComponent.summary) {
            var summaryComponents = childDataComponent.summary.map(function (summaryComponent) {
                summaryComponent.dimensions = model.reduce(addDimension, summaryComponent.dimensions);
                var summaryNameWithoutPrefix = summaryComponent.name.substr(model.child().name('').length);
                model.child().renameData(summaryComponent.name, summaryNameWithoutPrefix);
                summaryComponent.name = summaryNameWithoutPrefix;
                return summaryComponent;
            });
            delete childDataComponent.summary;
            return summaryComponents;
        }
        return [];
    }
    summary.parseFacet = parseFacet;
    function mergeMeasures(parentMeasures, childMeasures) {
        for (var field_1 in childMeasures) {
            if (childMeasures.hasOwnProperty(field_1)) {
                var ops = childMeasures[field_1];
                for (var op in ops) {
                    if (ops.hasOwnProperty(op)) {
                        if (field_1 in parentMeasures) {
                            parentMeasures[field_1][op] = true;
                        }
                        else {
                            parentMeasures[field_1] = { op: true };
                        }
                    }
                }
            }
        }
    }
    function parseLayer(model) {
        var summaries = {};
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source && childDataComponent.summary) {
                childDataComponent.summary.forEach(function (childSummary) {
                    var key = util_1.hash(childSummary.dimensions);
                    if (key in summaries) {
                        mergeMeasures(summaries[key].measures, childSummary.measures);
                    }
                    else {
                        childSummary.name = model.dataName(data_1.SUMMARY) + '_' + util_1.keys(summaries).length;
                        summaries[key] = childSummary;
                    }
                    child.renameData(child.dataName(data_1.SUMMARY), summaries[key].name);
                    delete childDataComponent.summary;
                });
            }
        });
        return util_1.vals(summaries);
    }
    summary.parseLayer = parseLayer;
    function assemble(component, model) {
        if (!component.summary) {
            return [];
        }
        return component.summary.reduce(function (summaryData, summaryComponent) {
            var dims = summaryComponent.dimensions;
            var meas = summaryComponent.measures;
            var groupby = util_1.keys(dims);
            var summarize = util_1.reduce(meas, function (aggregator, fnDictSet, field) {
                aggregator[field] = util_1.keys(fnDictSet);
                return aggregator;
            }, {});
            if (util_1.keys(meas).length > 0) {
                summaryData.push({
                    name: summaryComponent.name,
                    source: model.dataName(data_1.SOURCE),
                    transform: [{
                            type: 'aggregate',
                            groupby: groupby,
                            summarize: summarize
                        }]
                });
            }
            return summaryData;
        }, []);
    }
    summary.assemble = assemble;
})(summary = exports.summary || (exports.summary = {}));

},{"../../aggregate":11,"../../data":50,"../../fielddef":52,"../../util":61}],30:[function(require,module,exports){
"use strict";
var fielddef_1 = require('../../fielddef');
var type_1 = require('../../type');
var util_1 = require('../../util');
var time_1 = require('./../time');
var timeUnit;
(function (timeUnit) {
    function parse(model) {
        return model.reduce(function (timeUnitComponent, fieldDef, channel) {
            var ref = fielddef_1.field(fieldDef, { nofn: true, datum: true });
            if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
                var hash = fielddef_1.field(fieldDef);
                timeUnitComponent[hash] = {
                    type: 'formula',
                    field: fielddef_1.field(fieldDef),
                    expr: time_1.parseExpression(fieldDef.timeUnit, ref)
                };
            }
            return timeUnitComponent;
        }, {});
    }
    timeUnit.parseUnit = parse;
    function parseFacet(model) {
        var timeUnitComponent = parse(model);
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source) {
            util_1.extend(timeUnitComponent, childDataComponent.timeUnit);
            delete childDataComponent.timeUnit;
        }
        return timeUnitComponent;
    }
    timeUnit.parseFacet = parseFacet;
    function parseLayer(model) {
        var timeUnitComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source) {
                util_1.extend(timeUnitComponent, childDataComponent.timeUnit);
                delete childDataComponent.timeUnit;
            }
        });
        return timeUnitComponent;
    }
    timeUnit.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.vals(component.timeUnit);
    }
    timeUnit.assemble = assemble;
})(timeUnit = exports.timeUnit || (exports.timeUnit = {}));

},{"../../fielddef":52,"../../type":60,"../../util":61,"./../time":47}],31:[function(require,module,exports){
"use strict";
var util_1 = require('../../util');
var time_1 = require('./../time');
var timeUnitDomain;
(function (timeUnitDomain) {
    function parse(model) {
        return model.reduce(function (timeUnitDomainMap, fieldDef, channel) {
            if (fieldDef.timeUnit) {
                var domain = time_1.rawDomain(fieldDef.timeUnit, channel);
                if (domain) {
                    timeUnitDomainMap[fieldDef.timeUnit] = true;
                }
            }
            return timeUnitDomainMap;
        }, {});
    }
    timeUnitDomain.parseUnit = parse;
    function parseFacet(model) {
        return util_1.extend(parse(model), model.child().component.data.timeUnitDomain);
    }
    timeUnitDomain.parseFacet = parseFacet;
    function parseLayer(model) {
        return util_1.extend(parse(model), model.children().forEach(function (child) {
            return child.component.data.timeUnitDomain;
        }));
    }
    timeUnitDomain.parseLayer = parseLayer;
    function assemble(component) {
        return util_1.keys(component.timeUnitDomain).reduce(function (timeUnitData, tu) {
            var timeUnit = tu;
            var domain = time_1.rawDomain(timeUnit, null);
            if (domain) {
                timeUnitData.push({
                    name: timeUnit,
                    values: domain,
                    transform: [{
                            type: 'formula',
                            field: 'date',
                            expr: time_1.parseExpression(timeUnit, 'datum.data', true)
                        }]
                });
            }
            return timeUnitData;
        }, []);
    }
    timeUnitDomain.assemble = assemble;
})(timeUnitDomain = exports.timeUnitDomain || (exports.timeUnitDomain = {}));

},{"../../util":61,"./../time":47}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var axis_1 = require('../axis');
var channel_1 = require('../channel');
var config_1 = require('../config');
var data_1 = require('../data');
var encoding_1 = require('../encoding');
var fielddef_1 = require('../fielddef');
var scale_1 = require('../scale');
var type_1 = require('../type');
var util_1 = require('../util');
var axis_2 = require('./axis');
var common_1 = require('./common');
var data_2 = require('./data/data');
var layout_1 = require('./layout');
var model_1 = require('./model');
var scale_2 = require('./scale');
var FacetModel = (function (_super) {
    __extends(FacetModel, _super);
    function FacetModel(spec, parent, parentGivenName) {
        _super.call(this, spec, parent, parentGivenName);
        var config = this._config = this._initConfig(spec.config, parent);
        var child = this._child = common_1.buildModel(spec.spec, this, this.name('child'));
        var facet = this._facet = this._initFacet(spec.facet);
        this._scale = this._initScale(facet, config, child);
        this._axis = this._initAxis(facet, config, child);
    }
    FacetModel.prototype._initConfig = function (specConfig, parent) {
        return util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), specConfig, parent ? parent.config() : {});
    };
    FacetModel.prototype._initFacet = function (facet) {
        facet = util_1.duplicate(facet);
        var model = this;
        encoding_1.channelMappingForEach(this.channels(), facet, function (fieldDef, channel) {
            if (!fielddef_1.isDimension(fieldDef)) {
                model.addWarning(channel + ' encoding should be ordinal.');
            }
            if (fieldDef.type) {
                fieldDef.type = type_1.getFullName(fieldDef.type);
            }
        });
        return facet;
    };
    FacetModel.prototype._initScale = function (facet, config, child) {
        return [channel_1.ROW, channel_1.COLUMN].reduce(function (_scale, channel) {
            if (facet[channel]) {
                var scaleSpec = facet[channel].scale || {};
                _scale[channel] = util_1.extend({
                    type: scale_1.ScaleType.ORDINAL,
                    round: config.facet.scale.round,
                    padding: (channel === channel_1.ROW && child.has(channel_1.Y)) || (channel === channel_1.COLUMN && child.has(channel_1.X)) ?
                        config.facet.scale.padding : 0
                }, scaleSpec);
            }
            return _scale;
        }, {});
    };
    FacetModel.prototype._initAxis = function (facet, config, child) {
        return [channel_1.ROW, channel_1.COLUMN].reduce(function (_axis, channel) {
            if (facet[channel]) {
                var axisSpec = facet[channel].axis;
                if (axisSpec !== false) {
                    var modelAxis = _axis[channel] = util_1.extend({}, config.facet.axis, axisSpec === true ? {} : axisSpec || {});
                    if (channel === channel_1.ROW) {
                        var yAxis = child.axis(channel_1.Y);
                        if (yAxis && yAxis.orient !== axis_1.AxisOrient.RIGHT && !modelAxis.orient) {
                            modelAxis.orient = axis_1.AxisOrient.RIGHT;
                        }
                        if (child.has(channel_1.X) && !modelAxis.labelAngle) {
                            modelAxis.labelAngle = modelAxis.orient === axis_1.AxisOrient.RIGHT ? 90 : 270;
                        }
                    }
                }
            }
            return _axis;
        }, {});
    };
    FacetModel.prototype.facet = function () {
        return this._facet;
    };
    FacetModel.prototype.has = function (channel) {
        return !!this._facet[channel];
    };
    FacetModel.prototype.child = function () {
        return this._child;
    };
    FacetModel.prototype.hasSummary = function () {
        var summary = this.component.data.summary;
        for (var i = 0; i < summary.length; i++) {
            if (util_1.keys(summary[i].measures).length > 0) {
                return true;
            }
        }
        return false;
    };
    FacetModel.prototype.dataTable = function () {
        return (this.hasSummary() ? data_1.SUMMARY : data_1.SOURCE) + '';
    };
    FacetModel.prototype.fieldDef = function (channel) {
        return this.facet()[channel];
    };
    FacetModel.prototype.stack = function () {
        return null;
    };
    FacetModel.prototype.parseData = function () {
        this.child().parseData();
        this.component.data = data_2.parseFacetData(this);
    };
    FacetModel.prototype.parseSelectionData = function () {
    };
    FacetModel.prototype.parseLayoutData = function () {
        this.child().parseLayoutData();
        this.component.layout = layout_1.parseFacetLayout(this);
    };
    FacetModel.prototype.parseScale = function () {
        var child = this.child();
        var model = this;
        child.parseScale();
        var scaleComponent = this.component.scale = scale_2.parseScaleComponent(this);
        util_1.keys(child.component.scale).forEach(function (channel) {
            if (true) {
                scaleComponent[channel] = child.component.scale[channel];
                util_1.vals(scaleComponent[channel]).forEach(function (scale) {
                    var scaleNameWithoutPrefix = scale.name.substr(child.name('').length);
                    var newName = model.scaleName(scaleNameWithoutPrefix);
                    child.renameScale(scale.name, newName);
                    scale.name = newName;
                });
                delete child.component.scale[channel];
            }
        });
    };
    FacetModel.prototype.parseMark = function () {
        this.child().parseMark();
        this.component.mark = util_1.extend({
            name: this.name('cell'),
            type: 'group',
            from: util_1.extend(this.dataTable() ? { data: this.dataTable() } : {}, {
                transform: [{
                        type: 'facet',
                        groupby: [].concat(this.has(channel_1.ROW) ? [this.field(channel_1.ROW)] : [], this.has(channel_1.COLUMN) ? [this.field(channel_1.COLUMN)] : [])
                    }]
            }),
            properties: {
                update: getFacetGroupProperties(this)
            }
        }, this.child().assembleGroup());
    };
    FacetModel.prototype.parseAxis = function () {
        this.child().parseAxis();
        this.component.axis = axis_2.parseAxisComponent(this, [channel_1.ROW, channel_1.COLUMN]);
    };
    FacetModel.prototype.parseAxisGroup = function () {
        var xAxisGroup = parseAxisGroup(this, channel_1.X);
        var yAxisGroup = parseAxisGroup(this, channel_1.Y);
        this.component.axisGroup = util_1.extend(xAxisGroup ? { x: xAxisGroup } : {}, yAxisGroup ? { y: yAxisGroup } : {});
    };
    FacetModel.prototype.parseGridGroup = function () {
        var child = this.child();
        this.component.gridGroup = util_1.extend(!child.has(channel_1.X) && this.has(channel_1.COLUMN) ? { column: getColumnGridGroups(this) } : {}, !child.has(channel_1.Y) && this.has(channel_1.ROW) ? { row: getRowGridGroups(this) } : {});
    };
    FacetModel.prototype.parseLegend = function () {
        this.child().parseLegend();
        this.component.legend = this._child.component.legend;
        this._child.component.legend = {};
    };
    FacetModel.prototype.assembleParentGroupProperties = function () {
        return null;
    };
    FacetModel.prototype.assembleData = function (data) {
        data_2.assembleData(this, data);
        return this._child.assembleData(data);
    };
    FacetModel.prototype.assembleLayout = function (layoutData) {
        this._child.assembleLayout(layoutData);
        return layout_1.assembleLayout(this, layoutData);
    };
    FacetModel.prototype.assembleMarks = function () {
        return [].concat(util_1.vals(this.component.axisGroup), util_1.flatten(util_1.vals(this.component.gridGroup)), this.component.mark);
    };
    FacetModel.prototype.channels = function () {
        return [channel_1.ROW, channel_1.COLUMN];
    };
    FacetModel.prototype.mapping = function () {
        return this.facet();
    };
    FacetModel.prototype.isFacet = function () {
        return true;
    };
    return FacetModel;
}(model_1.Model));
exports.FacetModel = FacetModel;
function getFacetGroupProperties(model) {
    var child = model.child();
    var mergedCellConfig = util_1.extend({}, child.config().cell, child.config().facet.cell);
    return util_1.extend({
        x: model.has(channel_1.COLUMN) ? {
            scale: model.scaleName(channel_1.COLUMN),
            field: model.field(channel_1.COLUMN),
            offset: model.scale(channel_1.COLUMN).padding / 2
        } : { value: model.config().facet.scale.padding / 2 },
        y: model.has(channel_1.ROW) ? {
            scale: model.scaleName(channel_1.ROW),
            field: model.field(channel_1.ROW),
            offset: model.scale(channel_1.ROW).padding / 2
        } : { value: model.config().facet.scale.padding / 2 },
        width: { field: { parent: model.child().sizeName('width') } },
        height: { field: { parent: model.child().sizeName('height') } }
    }, child.assembleParentGroupProperties(mergedCellConfig));
}
function parseAxisGroup(model, channel) {
    var axisGroup = null;
    var child = model.child();
    if (child.has(channel)) {
        if (child.axis(channel)) {
            if (true) {
                axisGroup = channel === channel_1.X ? getXAxesGroup(model) : getYAxesGroup(model);
                if (child.axis(channel) && axis_2.gridShow(child, channel)) {
                    child.component.axis[channel] = axis_2.parseInnerAxis(channel, child);
                }
                else {
                    delete child.component.axis[channel];
                }
            }
            else {
            }
        }
    }
    return axisGroup;
}
function getXAxesGroup(model) {
    var hasCol = model.has(channel_1.COLUMN);
    return util_1.extend({
        name: model.name('x-axes'),
        type: 'group'
    }, hasCol ? {
        from: {
            data: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.COLUMN)],
                    summarize: { '*': ['count'] }
                }]
        }
    } : {}, {
        properties: {
            update: {
                width: { field: { parent: model.child().sizeName('width') } },
                height: {
                    field: { group: 'height' }
                },
                x: hasCol ? {
                    scale: model.scaleName(channel_1.COLUMN),
                    field: model.field(channel_1.COLUMN),
                    offset: model.scale(channel_1.COLUMN).padding / 2
                } : {
                    value: model.config().facet.scale.padding / 2
                }
            }
        },
        axes: [axis_2.parseAxis(channel_1.X, model.child())]
    });
}
function getYAxesGroup(model) {
    var hasRow = model.has(channel_1.ROW);
    return util_1.extend({
        name: model.name('y-axes'),
        type: 'group'
    }, hasRow ? {
        from: {
            data: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.ROW)],
                    summarize: { '*': ['count'] }
                }]
        }
    } : {}, {
        properties: {
            update: {
                width: {
                    field: { group: 'width' }
                },
                height: { field: { parent: model.child().sizeName('height') } },
                y: hasRow ? {
                    scale: model.scaleName(channel_1.ROW),
                    field: model.field(channel_1.ROW),
                    offset: model.scale(channel_1.ROW).padding / 2
                } : {
                    value: model.config().facet.scale.padding / 2
                }
            }
        },
        axes: [axis_2.parseAxis(channel_1.Y, model.child())]
    });
}
function getRowGridGroups(model) {
    var facetGridConfig = model.config().facet.grid;
    var rowGrid = {
        name: model.name('row-grid'),
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
                x: { value: 0, offset: -facetGridConfig.offset },
                x2: { field: { group: 'width' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [rowGrid, {
            name: model.name('row-grid-end'),
            type: 'rule',
            properties: {
                update: {
                    y: { field: { group: 'height' } },
                    x: { value: 0, offset: -facetGridConfig.offset },
                    x2: { field: { group: 'width' }, offset: facetGridConfig.offset },
                    stroke: { value: facetGridConfig.color },
                    strokeOpacity: { value: facetGridConfig.opacity },
                    strokeWidth: { value: 0.5 }
                }
            }
        }];
}
function getColumnGridGroups(model) {
    var facetGridConfig = model.config().facet.grid;
    var columnGrid = {
        name: model.name('column-grid'),
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
                y: { value: 0, offset: -facetGridConfig.offset },
                y2: { field: { group: 'height' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [columnGrid, {
            name: model.name('column-grid-end'),
            type: 'rule',
            properties: {
                update: {
                    x: { field: { group: 'width' } },
                    y: { value: 0, offset: -facetGridConfig.offset },
                    y2: { field: { group: 'height' }, offset: facetGridConfig.offset },
                    stroke: { value: facetGridConfig.color },
                    strokeOpacity: { value: facetGridConfig.opacity },
                    strokeWidth: { value: 0.5 }
                }
            }
        }];
}

},{"../axis":12,"../channel":14,"../config":49,"../data":50,"../encoding":51,"../fielddef":52,"../scale":55,"../type":60,"../util":61,"./axis":15,"./common":16,"./data/data":21,"./layout":34,"./model":44,"./scale":45}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require('../util');
var config_1 = require('../config');
var data_1 = require('./data/data');
var layout_1 = require('./layout');
var model_1 = require('./model');
var common_1 = require('./common');
var vega_schema_1 = require('../vega.schema');
var LayerModel = (function (_super) {
    __extends(LayerModel, _super);
    function LayerModel(spec, parent, parentGivenName) {
        var _this = this;
        _super.call(this, spec, parent, parentGivenName);
        this._config = this._initConfig(spec.config, parent);
        this._children = spec.layers.map(function (layer, i) {
            return common_1.buildModel(layer, _this, _this.name('layer_' + i));
        });
    }
    LayerModel.prototype._initConfig = function (specConfig, parent) {
        return util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), specConfig, parent ? parent.config() : {});
    };
    LayerModel.prototype.has = function (channel) {
        return false;
    };
    LayerModel.prototype.children = function () {
        return this._children;
    };
    LayerModel.prototype.isOrdinalScale = function (channel) {
        return this._children[0].isOrdinalScale(channel);
    };
    LayerModel.prototype.dataTable = function () {
        return this._children[0].dataTable();
    };
    LayerModel.prototype.fieldDef = function (channel) {
        return null;
    };
    LayerModel.prototype.stack = function () {
        return null;
    };
    LayerModel.prototype.parseData = function () {
        this._children.forEach(function (child) {
            child.parseData();
        });
        this.component.data = data_1.parseLayerData(this);
    };
    LayerModel.prototype.parseSelectionData = function () {
    };
    LayerModel.prototype.parseLayoutData = function () {
        this._children.forEach(function (child, i) {
            child.parseLayoutData();
        });
        this.component.layout = layout_1.parseLayerLayout(this);
    };
    LayerModel.prototype.parseScale = function () {
        var model = this;
        var scaleComponent = this.component.scale = {};
        this._children.forEach(function (child) {
            child.parseScale();
            if (true) {
                util_1.keys(child.component.scale).forEach(function (channel) {
                    var childScales = child.component.scale[channel];
                    if (!childScales) {
                        return;
                    }
                    var modelScales = scaleComponent[channel];
                    if (modelScales && modelScales.main) {
                        var modelDomain = modelScales.main.domain;
                        var childDomain = childScales.main.domain;
                        if (util_1.isArray(modelDomain)) {
                            if (util_1.isArray(childScales.main.domain)) {
                                modelScales.main.domain = modelDomain.concat(childDomain);
                            }
                            else {
                                model.addWarning('custom domain scale cannot be unioned with default field-based domain');
                            }
                        }
                        else {
                            var unionedFields = vega_schema_1.isUnionedDomain(modelDomain) ? modelDomain.fields : [modelDomain];
                            if (util_1.isArray(childDomain)) {
                                model.addWarning('custom domain scale cannot be unioned with default field-based domain');
                            }
                            var fields = vega_schema_1.isDataRefDomain(childDomain) ? unionedFields.concat([childDomain]) :
                                vega_schema_1.isUnionedDomain(childDomain) ? unionedFields.concat(childDomain.fields) :
                                    unionedFields;
                            fields = util_1.unique(fields, util_1.hash);
                            if (fields.length > 1) {
                                modelScales.main.domain = { fields: fields };
                            }
                            else {
                                modelScales.main.domain = fields[0];
                            }
                        }
                        modelScales.colorLegend = modelScales.colorLegend ? modelScales.colorLegend : childScales.colorLegend;
                        modelScales.binColorLegend = modelScales.binColorLegend ? modelScales.binColorLegend : childScales.binColorLegend;
                    }
                    else {
                        scaleComponent[channel] = childScales;
                    }
                    util_1.vals(childScales).forEach(function (scale) {
                        var scaleNameWithoutPrefix = scale.name.substr(child.name('').length);
                        var newName = model.scaleName(scaleNameWithoutPrefix);
                        child.renameScale(scale.name, newName);
                        scale.name = newName;
                    });
                    delete childScales[channel];
                });
            }
        });
    };
    LayerModel.prototype.parseMark = function () {
        this._children.forEach(function (child) {
            child.parseMark();
        });
    };
    LayerModel.prototype.parseAxis = function () {
        var axisComponent = this.component.axis = {};
        this._children.forEach(function (child) {
            child.parseAxis();
            if (true) {
                util_1.keys(child.component.axis).forEach(function (channel) {
                    if (!axisComponent[channel]) {
                        axisComponent[channel] = child.component.axis[channel];
                    }
                });
            }
        });
    };
    LayerModel.prototype.parseAxisGroup = function () {
        return null;
    };
    LayerModel.prototype.parseGridGroup = function () {
        return null;
    };
    LayerModel.prototype.parseLegend = function () {
        var legendComponent = this.component.legend = {};
        this._children.forEach(function (child) {
            child.parseLegend();
            if (true) {
                util_1.keys(child.component.legend).forEach(function (channel) {
                    if (!legendComponent[channel]) {
                        legendComponent[channel] = child.component.legend[channel];
                    }
                });
            }
        });
    };
    LayerModel.prototype.assembleParentGroupProperties = function () {
        return null;
    };
    LayerModel.prototype.assembleData = function (data) {
        data_1.assembleData(this, data);
        this._children.forEach(function (child) {
            child.assembleData(data);
        });
        return data;
    };
    LayerModel.prototype.assembleLayout = function (layoutData) {
        this._children.forEach(function (child) {
            child.assembleLayout(layoutData);
        });
        return layout_1.assembleLayout(this, layoutData);
    };
    LayerModel.prototype.assembleMarks = function () {
        return util_1.flatten(this._children.map(function (child) {
            return child.assembleMarks();
        }));
    };
    LayerModel.prototype.channels = function () {
        return [];
    };
    LayerModel.prototype.mapping = function () {
        return null;
    };
    LayerModel.prototype.isLayer = function () {
        return true;
    };
    LayerModel.prototype.compatibleSource = function (child) {
        var sourceUrl = this.data().url;
        var childData = child.component.data;
        var compatible = !childData.source || (sourceUrl && sourceUrl === childData.source.url);
        return compatible;
    };
    return LayerModel;
}(model_1.Model));
exports.LayerModel = LayerModel;

},{"../config":49,"../util":61,"../vega.schema":63,"./common":16,"./data/data":21,"./layout":34,"./model":44}],34:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var data_1 = require('../data');
var scale_1 = require('../scale');
var util_1 = require('../util');
var mark_1 = require('../mark');
var time_1 = require('./time');
function assembleLayout(model, layoutData) {
    var layoutComponent = model.component.layout;
    if (!layoutComponent.width && !layoutComponent.height) {
        return layoutData;
    }
    if (true) {
        var distinctFields = util_1.keys(util_1.extend(layoutComponent.width.distinct, layoutComponent.height.distinct));
        var formula = layoutComponent.width.formula.concat(layoutComponent.height.formula)
            .map(function (formula) {
            return util_1.extend({ type: 'formula' }, formula);
        });
        return [
            distinctFields.length > 0 ? {
                name: model.dataName(data_1.LAYOUT),
                source: model.dataTable(),
                transform: [{
                        type: 'aggregate',
                        summarize: distinctFields.map(function (field) {
                            return { field: field, ops: ['distinct'] };
                        })
                    }].concat(formula)
            } : {
                name: model.dataName(data_1.LAYOUT),
                values: [{}],
                transform: formula
            }
        ];
    }
}
exports.assembleLayout = assembleLayout;
function parseUnitLayout(model) {
    return {
        width: parseUnitSizeLayout(model, channel_1.X),
        height: parseUnitSizeLayout(model, channel_1.Y)
    };
}
exports.parseUnitLayout = parseUnitLayout;
function parseUnitSizeLayout(model, channel) {
    var cellConfig = model.config().cell;
    var nonOrdinalSize = channel === channel_1.X ? cellConfig.width : cellConfig.height;
    return {
        distinct: getDistinct(model, channel),
        formula: [{
                field: model.channelSizeName(channel),
                expr: unitSizeExpr(model, channel, nonOrdinalSize)
            }]
    };
}
function unitSizeExpr(model, channel, nonOrdinalSize) {
    if (model.has(channel)) {
        if (model.isOrdinalScale(channel)) {
            var scale = model.scale(channel);
            return '(' + cardinalityFormula(model, channel) +
                ' + ' + scale.padding +
                ') * ' + scale.bandSize;
        }
        else {
            return nonOrdinalSize + '';
        }
    }
    else {
        if (model.mark() === mark_1.TEXT && channel === channel_1.X) {
            return model.config().scale.textBandWidth + '';
        }
        return model.config().scale.bandSize + '';
    }
}
function parseFacetLayout(model) {
    return {
        width: parseFacetSizeLayout(model, channel_1.COLUMN),
        height: parseFacetSizeLayout(model, channel_1.ROW)
    };
}
exports.parseFacetLayout = parseFacetLayout;
function parseFacetSizeLayout(model, channel) {
    var childLayoutComponent = model.child().component.layout;
    var sizeType = channel === channel_1.ROW ? 'height' : 'width';
    var childSizeComponent = childLayoutComponent[sizeType];
    if (true) {
        var distinct = util_1.extend(getDistinct(model, channel), childSizeComponent.distinct);
        var formula = childSizeComponent.formula.concat([{
                field: model.channelSizeName(channel),
                expr: facetSizeFormula(model, channel, model.child().channelSizeName(channel))
            }]);
        delete childLayoutComponent[sizeType];
        return {
            distinct: distinct,
            formula: formula
        };
    }
}
function facetSizeFormula(model, channel, innerSize) {
    var scale = model.scale(channel);
    if (model.has(channel)) {
        return '(datum.' + innerSize + ' + ' + scale.padding + ')' + ' * ' + cardinalityFormula(model, channel);
    }
    else {
        return 'datum.' + innerSize + ' + ' + model.config().facet.scale.padding;
    }
}
function parseLayerLayout(model) {
    return {
        width: parseLayerSizeLayout(model, channel_1.X),
        height: parseLayerSizeLayout(model, channel_1.Y)
    };
}
exports.parseLayerLayout = parseLayerLayout;
function parseLayerSizeLayout(model, channel) {
    if (true) {
        var childLayoutComponent = model.children()[0].component.layout;
        var sizeType_1 = channel === channel_1.Y ? 'height' : 'width';
        var childSizeComponent = childLayoutComponent[sizeType_1];
        var distinct = childSizeComponent.distinct;
        var formula = [{
                field: model.channelSizeName(channel),
                expr: childSizeComponent.formula[0].expr
            }];
        model.children().forEach(function (child) {
            delete child.component.layout[sizeType_1];
        });
        return {
            distinct: distinct,
            formula: formula
        };
    }
}
function getDistinct(model, channel) {
    if (model.has(channel) && model.isOrdinalScale(channel)) {
        var scale = model.scale(channel);
        if (scale.type === scale_1.ScaleType.ORDINAL && !(scale.domain instanceof Array)) {
            var distinctField = model.field(channel);
            var distinct = {};
            distinct[distinctField] = true;
            return distinct;
        }
    }
    return {};
}
function cardinalityFormula(model, channel) {
    var scale = model.scale(channel);
    if (scale.domain instanceof Array) {
        return scale.domain.length;
    }
    var timeUnit = model.fieldDef(channel).timeUnit;
    var timeUnitDomain = timeUnit ? time_1.rawDomain(timeUnit, channel) : null;
    return timeUnitDomain !== null ? timeUnitDomain.length :
        model.field(channel, { datum: true, prefn: 'distinct_' });
}

},{"../channel":14,"../data":50,"../mark":54,"../scale":55,"../util":61,"./time":47}],35:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var type_1 = require('../type');
var util_1 = require('../util');
var common_1 = require('./common');
var scale_1 = require('./scale');
function parseLegendComponent(model) {
    return [channel_1.COLOR, channel_1.SIZE, channel_1.SHAPE].reduce(function (legendComponent, channel) {
        if (model.legend(channel)) {
            legendComponent[channel] = parseLegend(model, channel);
        }
        return legendComponent;
    }, {});
}
exports.parseLegendComponent = parseLegendComponent;
function getLegendDefWithScale(model, channel) {
    switch (channel) {
        case channel_1.COLOR:
            var fieldDef = model.fieldDef(channel_1.COLOR);
            var scale = model.scaleName(useColorLegendScale(fieldDef) ?
                scale_1.COLOR_LEGEND :
                channel_1.COLOR);
            return model.config().mark.filled ? { fill: scale } : { stroke: scale };
        case channel_1.SIZE:
            return { size: model.scaleName(channel_1.SIZE) };
        case channel_1.SHAPE:
            return { shape: model.scaleName(channel_1.SHAPE) };
    }
    return null;
}
function parseLegend(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    var def = getLegendDefWithScale(model, channel);
    def.title = title(legend, fieldDef);
    def.offset = offset(legend, fieldDef);
    util_1.extend(def, formatMixins(legend, model, channel));
    ['orient', 'values'].forEach(function (property) {
        var value = legend[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    var props = (typeof legend !== 'boolean' && legend.properties) || {};
    ['title', 'symbols', 'legend', 'labels'].forEach(function (group) {
        var value = properties[group] ?
            properties[group](fieldDef, props[group], model, channel) :
            props[group];
        if (value !== undefined && util_1.keys(value).length > 0) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.parseLegend = parseLegend;
function offset(legend, fieldDef) {
    if (legend.offset !== undefined) {
        return legend.offset;
    }
    return 0;
}
exports.offset = offset;
function orient(legend, fieldDef) {
    var orient = legend.orient;
    if (orient) {
        return orient;
    }
    return 'vertical';
}
exports.orient = orient;
function title(legend, fieldDef) {
    if (typeof legend !== 'boolean' && legend.title) {
        return legend.title;
    }
    return fielddef_1.title(fieldDef);
}
exports.title = title;
function formatMixins(legend, model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (fieldDef.bin) {
        return {};
    }
    return common_1.formatMixins(model, channel, typeof legend !== 'boolean' ? legend.format : undefined);
}
exports.formatMixins = formatMixins;
function useColorLegendScale(fieldDef) {
    return fieldDef.type === type_1.ORDINAL || fieldDef.bin || fieldDef.timeUnit;
}
exports.useColorLegendScale = useColorLegendScale;
var properties;
(function (properties) {
    function symbols(fieldDef, symbolsSpec, model, channel) {
        var symbols = {};
        var mark = model.mark();
        var legend = model.legend(channel);
        switch (mark) {
            case mark_1.BAR:
            case mark_1.TICK:
            case mark_1.TEXT:
                symbols.shape = { value: 'square' };
                break;
            case mark_1.CIRCLE:
            case mark_1.SQUARE:
                symbols.shape = { value: mark };
                break;
            case mark_1.POINT:
            case mark_1.LINE:
            case mark_1.AREA:
                break;
        }
        var filled = model.config().mark.filled;
        var config = channel === channel_1.COLOR ?
            util_1.without(common_1.FILL_STROKE_CONFIG, [filled ? 'fill' : 'stroke', 'strokeDash', 'strokeDashOffset']) :
            util_1.without(common_1.FILL_STROKE_CONFIG, ['strokeDash', 'strokeDashOffset']);
        config = util_1.without(config, ['strokeDash', 'strokeDashOffset']);
        common_1.applyMarkConfig(symbols, model, config);
        if (filled) {
            symbols.strokeWidth = { value: 0 };
        }
        var value;
        if (model.has(channel_1.COLOR) && channel === channel_1.COLOR) {
            if (useColorLegendScale(fieldDef)) {
                value = { scale: model.scaleName(channel_1.COLOR), field: 'data' };
            }
        }
        else if (model.fieldDef(channel_1.COLOR).value) {
            value = { value: model.fieldDef(channel_1.COLOR).value };
        }
        if (value !== undefined) {
            if (filled) {
                symbols.fill = value;
            }
            else {
                symbols.stroke = value;
            }
        }
        else if (channel !== channel_1.COLOR) {
            symbols[filled ? 'fill' : 'stroke'] = symbols[filled ? 'fill' : 'stroke'] ||
                { value: model.config().mark.color };
        }
        if (legend.symbolColor !== undefined) {
            symbols.fill = { value: legend.symbolColor };
        }
        if (legend.symbolShape !== undefined) {
            symbols.shape = { value: legend.symbolShape };
        }
        if (legend.symbolSize !== undefined) {
            symbols.size = { value: legend.symbolSize };
        }
        if (legend.symbolStrokeWidth !== undefined) {
            symbols.strokeWidth = { value: legend.symbolStrokeWidth };
        }
        symbols = util_1.extend(symbols, symbolsSpec || {});
        return util_1.keys(symbols).length > 0 ? symbols : undefined;
    }
    properties.symbols = symbols;
    function labels(fieldDef, labelsSpec, model, channel) {
        var legend = model.legend(channel);
        var labels = {};
        if (channel === channel_1.COLOR) {
            if (fieldDef.type === type_1.ORDINAL) {
                labelsSpec = util_1.extend({
                    text: {
                        scale: model.scaleName(scale_1.COLOR_LEGEND),
                        field: 'data'
                    }
                }, labelsSpec || {});
            }
            else if (fieldDef.bin) {
                labelsSpec = util_1.extend({
                    text: {
                        scale: model.scaleName(scale_1.COLOR_LEGEND_LABEL),
                        field: 'data'
                    }
                }, labelsSpec || {});
            }
            else if (fieldDef.timeUnit) {
                labelsSpec = util_1.extend({
                    text: {
                        template: '{{ datum.data | time:\'' + common_1.timeFormat(model, channel) + '\'}}'
                    }
                }, labelsSpec || {});
            }
        }
        if (legend.labelAlign !== undefined) {
            labels.align = { value: legend.labelAlign };
        }
        if (legend.labelColor !== undefined) {
            labels.stroke = { value: legend.labelColor };
        }
        if (legend.labelFont !== undefined) {
            labels.font = { value: legend.labelFont };
        }
        if (legend.labelFontSize !== undefined) {
            labels.fontSize = { value: legend.labelFontSize };
        }
        if (legend.labelBaseline !== undefined) {
            labels.baseline = { value: legend.labelBaseline };
        }
        labels = util_1.extend(labels, labelsSpec || {});
        return util_1.keys(labels).length > 0 ? labels : undefined;
    }
    properties.labels = labels;
    function title(fieldDef, titleSpec, model, channel) {
        var legend = model.legend(channel);
        var titles = {};
        if (legend.titleColor !== undefined) {
            titles.stroke = { value: legend.titleColor };
        }
        if (legend.titleFont !== undefined) {
            titles.font = { value: legend.titleFont };
        }
        if (legend.titleFontSize !== undefined) {
            titles.fontSize = { value: legend.titleFontSize };
        }
        if (legend.titleFontWeight !== undefined) {
            titles.fontWeight = { value: legend.titleFontWeight };
        }
        titles = util_1.extend(titles, titleSpec || {});
        return util_1.keys(titles).length > 0 ? titles : undefined;
    }
    properties.title = title;
})(properties = exports.properties || (exports.properties = {}));

},{"../channel":14,"../fielddef":52,"../mark":54,"../type":60,"../util":61,"./common":16,"./scale":45}],36:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var fielddef_1 = require('../../fielddef');
var common_1 = require('../common');
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
        var xFieldDef = model.encoding().x;
        if (stack && channel_1.X === stack.fieldChannel) {
            p.x = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(xFieldDef)) {
            p.x = { scale: model.scaleName(channel_1.X), field: model.field(channel_1.X) };
        }
        else if (fielddef_1.isDimension(xFieldDef)) {
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
        var yFieldDef = model.encoding().y;
        if (stack && channel_1.Y === stack.fieldChannel) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(yFieldDef)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y)
            };
        }
        else if (fielddef_1.isDimension(yFieldDef)) {
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
        common_1.applyColorAndOpacity(p, model);
        common_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    area.properties = properties;
    function labels(model) {
        return undefined;
    }
    area.labels = labels;
})(area = exports.area || (exports.area = {}));

},{"../../channel":14,"../../fielddef":52,"../common":16}],37:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var fielddef_1 = require('../../fielddef');
var common_1 = require('../common');
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
        var xFieldDef = model.encoding().x;
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
        else if (fielddef_1.isMeasure(xFieldDef)) {
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
                p.width = { value: sizeValue(model, channel_1.X) };
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
                value: sizeValue(model, (channel_1.X))
            };
        }
        var yFieldDef = model.encoding().y;
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
        else if (fielddef_1.isMeasure(yFieldDef)) {
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
                p.height = { value: sizeValue(model, channel_1.Y) };
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
                value: sizeValue(model, channel_1.Y)
            };
        }
        common_1.applyColorAndOpacity(p, model);
        return p;
    }
    bar.properties = properties;
    function sizeValue(model, channel) {
        var fieldDef = model.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        var markConfig = model.config().mark;
        if (markConfig.barSize) {
            return markConfig.barSize;
        }
        return model.isOrdinalScale(channel) ?
            model.scale(channel).bandSize - 1 :
            !model.has(channel) ?
                model.config().scale.bandSize - 1 :
                markConfig.barThinSize;
    }
    function labels(model) {
        return undefined;
    }
    bar.labels = labels;
})(bar = exports.bar || (exports.bar = {}));

},{"../../channel":14,"../../fielddef":52,"../common":16}],38:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var common_1 = require('../common');
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
        common_1.applyColorAndOpacity(p, model);
        common_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        var size = sizeValue(model);
        if (size) {
            p.strokeWidth = { value: size };
        }
        return p;
    }
    line.properties = properties;
    function sizeValue(model) {
        var fieldDef = model.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        return model.config().mark.lineSize;
    }
    function labels(model) {
        return undefined;
    }
    line.labels = labels;
})(line = exports.line || (exports.line = {}));

},{"../../channel":14,"../common":16}],39:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var mark_1 = require('../../mark');
var stack_1 = require('../stack');
var util_1 = require('../../util');
var area_1 = require('./area');
var bar_1 = require('./bar');
var line_1 = require('./line');
var point_1 = require('./point');
var text_1 = require('./text');
var tick_1 = require('./tick');
var rule_1 = require('./rule');
var common_1 = require('../common');
var markCompiler = {
    area: area_1.area,
    bar: bar_1.bar,
    line: line_1.line,
    point: point_1.point,
    text: text_1.text,
    tick: tick_1.tick,
    rule: rule_1.rule,
    circle: point_1.circle,
    square: point_1.square
};
function parseMark(model) {
    if (util_1.contains([mark_1.LINE, mark_1.AREA], model.mark())) {
        return parsePathMark(model);
    }
    else {
        return parseNonPathMark(model);
    }
}
exports.parseMark = parseMark;
function parsePathMark(model) {
    var mark = model.mark();
    var isFaceted = model.parent() && model.parent().isFacet();
    var dataFrom = { data: model.dataTable() };
    var details = detailFields(model);
    var pathMarks = [
        {
            name: model.name('marks'),
            type: markCompiler[mark].markType(),
            from: util_1.extend(isFaceted || details.length > 0 ? {} : dataFrom, { transform: [{ type: 'sort', by: sortPathBy(model) }] }),
            properties: { update: markCompiler[mark].properties(model) }
        }
    ];
    if (details.length > 0) {
        var facetTransform = { type: 'facet', groupby: details };
        var transform = mark === mark_1.AREA && model.stack() ?
            [stack_1.imputeTransform(model), stack_1.stackTransform(model), facetTransform] :
            [].concat(facetTransform, model.has(channel_1.ORDER) ? [{ type: 'sort', by: sortBy(model) }] : []);
        return [{
                name: model.name('pathgroup'),
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
function parseNonPathMark(model) {
    var mark = model.mark();
    var isFaceted = model.parent() && model.parent().isFacet();
    var dataFrom = { data: model.dataTable() };
    var marks = [];
    if (mark === mark_1.TEXT &&
        model.has(channel_1.COLOR) &&
        model.config().mark.applyColorToBackground && !model.has(channel_1.X) && !model.has(channel_1.Y)) {
        marks.push(util_1.extend({
            name: model.name('background'),
            type: 'rect'
        }, isFaceted ? {} : { from: dataFrom }, { properties: { update: text_1.text.background(model) } }));
    }
    marks.push(util_1.extend({
        name: model.name('marks'),
        type: markCompiler[mark].markType()
    }, (!isFaceted || model.stack() || model.has(channel_1.ORDER)) ? {
        from: util_1.extend(isFaceted ? {} : dataFrom, model.stack() ?
            { transform: [stack_1.stackTransform(model)] } :
            model.has(channel_1.ORDER) ?
                { transform: [{ type: 'sort', by: sortBy(model) }] } :
                {})
    } : {}, { properties: { update: markCompiler[mark].properties(model) } }));
    if (model.has(channel_1.LABEL) && markCompiler[mark].labels) {
        var labelProperties = markCompiler[mark].labels(model);
        if (labelProperties !== undefined) {
            marks.push(util_1.extend({
                name: model.name('label'),
                type: 'text'
            }, isFaceted ? {} : { from: dataFrom }, { properties: { update: labelProperties } }));
        }
    }
    return marks;
}
function sortBy(model) {
    if (model.has(channel_1.ORDER)) {
        var channelDef = model.encoding().order;
        if (channelDef instanceof Array) {
            return channelDef.map(common_1.sortField);
        }
        else {
            return common_1.sortField(channelDef);
        }
    }
    return null;
}
function sortPathBy(model) {
    if (model.mark() === mark_1.LINE && model.has(channel_1.PATH)) {
        var channelDef = model.encoding().path;
        if (channelDef instanceof Array) {
            return channelDef.map(common_1.sortField);
        }
        else {
            return common_1.sortField(channelDef);
        }
    }
    else {
        return '-' + model.field(model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X);
    }
}
function detailFields(model) {
    return [channel_1.COLOR, channel_1.DETAIL, channel_1.OPACITY, channel_1.SHAPE].reduce(function (details, channel) {
        if (model.has(channel) && !model.fieldDef(channel).aggregate) {
            details.push(model.field(channel));
        }
        return details;
    }, []);
}

},{"../../channel":14,"../../mark":54,"../../util":61,"../common":16,"../stack":46,"./area":36,"./bar":37,"./line":38,"./point":40,"./rule":41,"./text":42,"./tick":43}],40:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var fielddef_1 = require('../../fielddef');
var common_1 = require('../common');
var point;
(function (point) {
    function markType() {
        return 'symbol';
    }
    point.markType = markType;
    function properties(model, fixedShape) {
        var p = {};
        var config = model.config();
        p.x = x(model.encoding().x, model.scaleName(channel_1.X), config);
        p.y = y(model.encoding().y, model.scaleName(channel_1.Y), config);
        p.size = size(model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), config);
        p.shape = shape(model.encoding().shape, model.scaleName(channel_1.SHAPE), model.scale(channel_1.SHAPE), config, fixedShape);
        common_1.applyColorAndOpacity(p, model);
        return p;
    }
    point.properties = properties;
    function x(fieldDef, scaleName, config) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
                };
            }
        }
        return { value: config.scale.bandSize / 2 };
    }
    function y(fieldDef, scaleName, config) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
                };
            }
        }
        return { value: config.scale.bandSize / 2 };
    }
    function size(fieldDef, scaleName, scale, config) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { scaleType: scale.type })
                };
            }
            else if (fieldDef.value !== undefined) {
                return { value: fieldDef.value };
            }
        }
        return { value: config.mark.size };
    }
    function shape(fieldDef, scaleName, scale, config, fixedShape) {
        if (fixedShape) {
            return { value: fixedShape };
        }
        else if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { scaleType: scale.type })
                };
            }
            else if (fieldDef.value) {
                return { value: fieldDef.value };
            }
        }
        return { value: config.mark.shape };
    }
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

},{"../../channel":14,"../../fielddef":52,"../common":16}],41:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var common_1 = require('../common');
var rule;
(function (rule) {
    function markType() {
        return 'rule';
    }
    rule.markType = markType;
    function properties(model) {
        var p = {};
        if (model.has(channel_1.X)) {
            p.x = position(model, channel_1.X);
            p.y = { value: 0 };
            p.y2 = {
                field: { group: 'height' }
            };
        }
        if (model.has(channel_1.Y)) {
            p.y = position(model, channel_1.Y);
            p.x = { value: 0 };
            p.x2 = {
                field: { group: 'width' }
            };
        }
        common_1.applyColorAndOpacity(p, model);
        if (model.has(channel_1.SIZE)) {
            p.strokeWidth = {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            };
        }
        else {
            p.strokeWidth = { value: sizeValue(model) };
        }
        return p;
    }
    rule.properties = properties;
    function position(model, channel) {
        return {
            scale: model.scaleName(channel),
            field: model.field(channel, { binSuffix: '_mid' })
        };
    }
    function sizeValue(model) {
        var fieldDef = model.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        return model.config().mark.ruleSize;
    }
    function labels(model) {
        return undefined;
    }
    rule.labels = labels;
})(rule = exports.rule || (exports.rule = {}));

},{"../../channel":14,"../common":16}],42:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var common_1 = require('../common');
var util_1 = require('../../util');
var type_1 = require('../../type');
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
            fill: {
                scale: model.scaleName(channel_1.COLOR),
                field: model.field(channel_1.COLOR, model.fieldDef(channel_1.COLOR).type === type_1.ORDINAL ? { prefn: 'rank_' } : {})
            }
        };
    }
    text.background = background;
    function properties(model) {
        var p = {};
        common_1.applyMarkConfig(p, model, ['angle', 'align', 'baseline', 'dx', 'dy', 'font', 'fontWeight',
            'fontStyle', 'radius', 'theta', 'text']);
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
                p.x = { value: model.config().scale.textBandWidth / 2 };
            }
        }
        if (model.has(channel_1.Y)) {
            p.y = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.y = { value: model.config().scale.bandSize / 2 };
        }
        if (model.has(channel_1.SIZE)) {
            p.fontSize = {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            };
        }
        else {
            p.fontSize = { value: sizeValue(model) };
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
            common_1.applyColorAndOpacity(p, model);
        }
        if (model.has(channel_1.TEXT)) {
            if (util_1.contains([type_1.QUANTITATIVE, type_1.TEMPORAL], model.fieldDef(channel_1.TEXT).type)) {
                var format = model.config().mark.format;
                util_1.extend(p, common_1.formatMixins(model, channel_1.TEXT, format));
            }
            else {
                p.text = { field: model.field(channel_1.TEXT) };
            }
        }
        else if (fieldDef.value) {
            p.text = { value: fieldDef.value };
        }
        return p;
    }
    text.properties = properties;
    function sizeValue(model) {
        var fieldDef = model.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        return model.config().mark.fontSize;
    }
})(text = exports.text || (exports.text = {}));

},{"../../channel":14,"../../type":60,"../../util":61,"../common":16}],43:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var common_1 = require('../common');
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
            p.xc = { value: model.config().scale.bandSize / 2 };
        }
        if (model.has(channel_1.Y)) {
            p.yc = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { binSuffix: '_mid' })
            };
        }
        else {
            p.yc = { value: model.config().scale.bandSize / 2 };
        }
        if (model.config().mark.orient === 'horizontal') {
            p.width = model.has(channel_1.SIZE) ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: sizeValue(model, channel_1.X)
            };
            p.height = { value: model.config().mark.tickThickness };
        }
        else {
            p.width = { value: model.config().mark.tickThickness };
            p.height = model.has(channel_1.SIZE) ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: sizeValue(model, channel_1.Y)
            };
        }
        common_1.applyColorAndOpacity(p, model);
        return p;
    }
    tick.properties = properties;
    function sizeValue(model, channel) {
        var fieldDef = model.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        var scaleConfig = model.config().scale;
        var markConfig = model.config().mark;
        if (markConfig.tickSize) {
            return markConfig.tickSize;
        }
        var bandSize = model.has(channel) ?
            model.scale(channel).bandSize :
            scaleConfig.bandSize;
        return bandSize / 1.5;
    }
    function labels(model) {
        return undefined;
    }
    tick.labels = labels;
})(tick = exports.tick || (exports.tick = {}));

},{"../../channel":14,"../common":16}],44:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var encoding_1 = require('../encoding');
var fielddef_1 = require('../fielddef');
var scale_1 = require('../scale');
var util_1 = require('../util');
var NameMap = (function () {
    function NameMap() {
        this._nameMap = {};
    }
    NameMap.prototype.rename = function (oldName, newName) {
        this._nameMap[oldName] = newName;
    };
    NameMap.prototype.get = function (name) {
        while (this._nameMap[name]) {
            name = this._nameMap[name];
        }
        return name;
    };
    return NameMap;
}());
var Model = (function () {
    function Model(spec, parent, parentGivenName) {
        this._warnings = [];
        this._parent = parent;
        this._name = spec.name || parentGivenName;
        this._dataNameMap = parent ? parent._dataNameMap : new NameMap();
        this._scaleNameMap = parent ? parent._scaleNameMap : new NameMap();
        this._sizeNameMap = parent ? parent._sizeNameMap : new NameMap();
        this._data = spec.data;
        this._description = spec.description;
        this._transform = spec.transform;
        this.component = { data: null, layout: null, mark: null, scale: null, axis: null, axisGroup: null, gridGroup: null, legend: null };
    }
    Model.prototype.parse = function () {
        this.parseData();
        this.parseSelectionData();
        this.parseLayoutData();
        this.parseScale();
        this.parseAxis();
        this.parseLegend();
        this.parseAxisGroup();
        this.parseGridGroup();
        this.parseMark();
    };
    Model.prototype.assembleScales = function () {
        return util_1.flatten(util_1.vals(this.component.scale).map(function (scales) {
            var arr = [scales.main];
            if (scales.colorLegend) {
                arr.push(scales.colorLegend);
            }
            if (scales.binColorLegend) {
                arr.push(scales.binColorLegend);
            }
            return arr;
        }));
    };
    Model.prototype.assembleAxes = function () {
        return util_1.vals(this.component.axis);
    };
    Model.prototype.assembleLegends = function () {
        return util_1.vals(this.component.legend);
    };
    Model.prototype.assembleGroup = function () {
        var group = {};
        group.marks = this.assembleMarks();
        var scales = this.assembleScales();
        if (scales.length > 0) {
            group.scales = scales;
        }
        var axes = this.assembleAxes();
        if (axes.length > 0) {
            group.axes = axes;
        }
        var legends = this.assembleLegends();
        if (legends.length > 0) {
            group.legends = legends;
        }
        return group;
    };
    Model.prototype.reduce = function (f, init, t) {
        return encoding_1.channelMappingReduce(this.channels(), this.mapping(), f, init, t);
    };
    Model.prototype.forEach = function (f, t) {
        encoding_1.channelMappingForEach(this.channels(), this.mapping(), f, t);
    };
    Model.prototype.parent = function () {
        return this._parent;
    };
    Model.prototype.name = function (text, delimiter) {
        if (delimiter === void 0) { delimiter = '_'; }
        return (this._name ? this._name + delimiter : '') + text;
    };
    Model.prototype.description = function () {
        return this._description;
    };
    Model.prototype.data = function () {
        return this._data;
    };
    Model.prototype.renameData = function (oldName, newName) {
        this._dataNameMap.rename(oldName, newName);
    };
    Model.prototype.dataName = function (dataSourceType) {
        return this._dataNameMap.get(this.name(String(dataSourceType)));
    };
    Model.prototype.renameSize = function (oldName, newName) {
        this._sizeNameMap.rename(oldName, newName);
    };
    Model.prototype.channelSizeName = function (channel) {
        return this.sizeName(channel === channel_1.X || channel === channel_1.COLUMN ? 'width' : 'height');
    };
    Model.prototype.sizeName = function (size) {
        return this._sizeNameMap.get(this.name(size, '_'));
    };
    Model.prototype.transform = function () {
        return this._transform || {};
    };
    Model.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: this.scale(channel).type === scale_1.ScaleType.ORDINAL ? '_range' : '_start'
            }, opt);
        }
        return fielddef_1.field(fieldDef, opt);
    };
    Model.prototype.scale = function (channel) {
        return this._scale[channel];
    };
    Model.prototype.isOrdinalScale = function (channel) {
        var scale = this.scale(channel);
        return scale && scale.type === scale_1.ScaleType.ORDINAL;
    };
    Model.prototype.renameScale = function (oldName, newName) {
        this._scaleNameMap.rename(oldName, newName);
    };
    Model.prototype.scaleName = function (channel) {
        return this._scaleNameMap.get(this.name(channel + ''));
    };
    Model.prototype.sort = function (channel) {
        return (this.mapping()[channel] || {}).sort;
    };
    Model.prototype.axis = function (channel) {
        return this._axis[channel];
    };
    Model.prototype.legend = function (channel) {
        return this._legend[channel];
    };
    Model.prototype.config = function () {
        return this._config;
    };
    Model.prototype.addWarning = function (message) {
        util_1.warning(message);
        this._warnings.push(message);
    };
    Model.prototype.warnings = function () {
        return this._warnings;
    };
    Model.prototype.isUnit = function () {
        return false;
    };
    Model.prototype.isFacet = function () {
        return false;
    };
    Model.prototype.isLayer = function () {
        return false;
    };
    return Model;
}());
exports.Model = Model;

},{"../channel":14,"../encoding":51,"../fielddef":52,"../scale":55,"../util":61}],45:[function(require,module,exports){
"use strict";
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var config_1 = require('../config');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var scale_1 = require('../scale');
var timeunit_1 = require('../timeunit');
var type_1 = require('../type');
var util_1 = require('../util');
var time_1 = require('./time');
exports.COLOR_LEGEND = 'color_legend';
exports.COLOR_LEGEND_LABEL = 'color_legend_label';
function parseScaleComponent(model) {
    return model.channels().reduce(function (scale, channel) {
        if (model.scale(channel)) {
            var fieldDef = model.fieldDef(channel);
            var scales = {
                main: parseMainScale(model, fieldDef, channel)
            };
            if (channel === channel_1.COLOR && model.legend(channel_1.COLOR) && (fieldDef.type === type_1.ORDINAL || fieldDef.bin || fieldDef.timeUnit)) {
                scales.colorLegend = parseColorLegendScale(model, fieldDef);
                if (fieldDef.bin) {
                    scales.binColorLegend = parseBinColorLegendLabel(model, fieldDef);
                }
            }
            scale[channel] = scales;
        }
        return scale;
    }, {});
}
exports.parseScaleComponent = parseScaleComponent;
function parseMainScale(model, fieldDef, channel) {
    var scale = model.scale(channel);
    var sort = model.sort(channel);
    var scaleDef = {
        name: model.scaleName(channel),
        type: scale.type,
    };
    scaleDef.domain = domain(scale, model, channel);
    util_1.extend(scaleDef, rangeMixins(scale, model, channel));
    if (sort && (typeof sort === 'string' ? sort : sort.order) === 'descending') {
        scaleDef.reverse = true;
    }
    [
        'round',
        'clamp', 'nice',
        'exponent', 'zero',
        'padding', 'points'
    ].forEach(function (property) {
        var value = exports[property](scale, channel, fieldDef, model);
        if (value !== undefined) {
            scaleDef[property] = value;
        }
    });
    return scaleDef;
}
function parseColorLegendScale(model, fieldDef) {
    return {
        name: model.scaleName(exports.COLOR_LEGEND),
        type: scale_1.ScaleType.ORDINAL,
        domain: {
            data: model.dataTable(),
            field: model.field(channel_1.COLOR, (fieldDef.bin || fieldDef.timeUnit) ? {} : { prefn: 'rank_' }),
            sort: true
        },
        range: { data: model.dataTable(), field: model.field(channel_1.COLOR), sort: true }
    };
}
function parseBinColorLegendLabel(model, fieldDef) {
    return {
        name: model.scaleName(exports.COLOR_LEGEND_LABEL),
        type: scale_1.ScaleType.ORDINAL,
        domain: {
            data: model.dataTable(),
            field: model.field(channel_1.COLOR),
            sort: true
        },
        range: {
            data: model.dataTable(),
            field: fielddef_1.field(fieldDef, { binSuffix: '_range' }),
            sort: {
                field: model.field(channel_1.COLOR, { binSuffix: '_start' }),
                op: 'min'
            }
        }
    };
}
function scaleType(scale, fieldDef, channel, mark) {
    if (!channel_1.hasScale(channel)) {
        return null;
    }
    if (util_1.contains([channel_1.ROW, channel_1.COLUMN, channel_1.SHAPE], channel)) {
        return scale_1.ScaleType.ORDINAL;
    }
    if (scale.type !== undefined) {
        return scale.type;
    }
    switch (fieldDef.type) {
        case type_1.NOMINAL:
            return scale_1.ScaleType.ORDINAL;
        case type_1.ORDINAL:
            if (channel === channel_1.COLOR) {
                return scale_1.ScaleType.LINEAR;
            }
            return scale_1.ScaleType.ORDINAL;
        case type_1.TEMPORAL:
            if (channel === channel_1.COLOR) {
                return scale_1.ScaleType.TIME;
            }
            if (fieldDef.timeUnit) {
                switch (fieldDef.timeUnit) {
                    case timeunit_1.TimeUnit.HOURS:
                    case timeunit_1.TimeUnit.DAY:
                    case timeunit_1.TimeUnit.MONTH:
                        return scale_1.ScaleType.ORDINAL;
                    default:
                        return scale_1.ScaleType.TIME;
                }
            }
            return scale_1.ScaleType.TIME;
        case type_1.QUANTITATIVE:
            if (fieldDef.bin) {
                return util_1.contains([channel_1.X, channel_1.Y, channel_1.COLOR], channel) ? scale_1.ScaleType.LINEAR : scale_1.ScaleType.ORDINAL;
            }
            return scale_1.ScaleType.LINEAR;
    }
    return null;
}
exports.scaleType = scaleType;
function domain(scale, model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (scale.domain) {
        return scale.domain;
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
        if (stack.offset === config_1.StackOffset.NORMALIZE) {
            return [0, 1];
        }
        return {
            data: model.dataName(data_1.STACKED_SCALE),
            field: model.field(channel, { prefn: 'sum_' })
        };
    }
    var useRawDomain = _useRawDomain(scale, model, channel), sort = domainSort(model, channel, scale.type);
    if (useRawDomain) {
        return {
            data: data_1.SOURCE,
            field: model.field(channel, { noAggregate: true })
        };
    }
    else if (fieldDef.bin) {
        if (scale.type === scale_1.ScaleType.ORDINAL) {
            return {
                data: model.dataTable(),
                field: model.field(channel, { binSuffix: '_range' }),
                sort: {
                    field: model.field(channel, { binSuffix: '_start' }),
                    op: 'min'
                }
            };
        }
        else if (channel === channel_1.COLOR) {
            return {
                data: model.dataTable(),
                field: model.field(channel, { binSuffix: '_start' })
            };
        }
        else {
            return {
                data: model.dataTable(),
                field: [
                    model.field(channel, { binSuffix: '_start' }),
                    model.field(channel, { binSuffix: '_end' })
                ]
            };
        }
    }
    else if (sort) {
        return {
            data: sort.op ? data_1.SOURCE : model.dataTable(),
            field: (fieldDef.type === type_1.ORDINAL && channel === channel_1.COLOR) ? model.field(channel, { prefn: 'rank_' }) : model.field(channel),
            sort: sort
        };
    }
    else {
        return {
            data: model.dataTable(),
            field: (fieldDef.type === type_1.ORDINAL && channel === channel_1.COLOR) ? model.field(channel, { prefn: 'rank_' }) : model.field(channel),
        };
    }
}
exports.domain = domain;
function domainSort(model, channel, scaleType) {
    if (scaleType !== scale_1.ScaleType.ORDINAL) {
        return undefined;
    }
    var sort = model.sort(channel);
    if (util_1.contains(['ascending', 'descending', undefined], sort)) {
        return true;
    }
    if (typeof sort !== 'string') {
        return {
            op: sort.op,
            field: sort.field
        };
    }
    return undefined;
}
exports.domainSort = domainSort;
function _useRawDomain(scale, model, channel) {
    var fieldDef = model.fieldDef(channel);
    return scale.useRawDomain &&
        fieldDef.aggregate &&
        aggregate_1.SHARED_DOMAIN_OPS.indexOf(fieldDef.aggregate) >= 0 &&
        ((fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) ||
            (fieldDef.type === type_1.TEMPORAL && util_1.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type)));
}
function rangeMixins(scale, model, channel) {
    var fieldDef = model.fieldDef(channel);
    var scaleConfig = model.config().scale;
    if (scale.type === scale_1.ScaleType.ORDINAL && scale.bandSize && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return { bandSize: scale.bandSize };
    }
    if (scale.range && !util_1.contains([channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN], channel)) {
        return { range: scale.range };
    }
    switch (channel) {
        case channel_1.ROW:
            return { range: 'height' };
        case channel_1.COLUMN:
            return { range: 'width' };
    }
    var unitModel = model;
    switch (channel) {
        case channel_1.X:
            return {
                rangeMin: 0,
                rangeMax: unitModel.config().cell.width
            };
        case channel_1.Y:
            return {
                rangeMin: unitModel.config().cell.height,
                rangeMax: 0
            };
        case channel_1.SIZE:
            if (unitModel.mark() === mark_1.BAR) {
                if (scaleConfig.barSizeRange !== undefined) {
                    return { range: scaleConfig.barSizeRange };
                }
                var dimension = model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X;
                return { range: [model.config().mark.barThinSize, model.scale(dimension).bandSize] };
            }
            else if (unitModel.mark() === mark_1.TEXT) {
                return { range: scaleConfig.fontSizeRange };
            }
            else if (unitModel.mark() === mark_1.RULE) {
                return { range: scaleConfig.ruleSizeRange };
            }
            else if (unitModel.mark() === mark_1.TICK) {
                return { range: scaleConfig.tickSizeRange };
            }
            if (scaleConfig.pointSizeRange !== undefined) {
                return { range: scaleConfig.pointSizeRange };
            }
            var bandSize = pointBandSize(unitModel);
            return { range: [9, (bandSize - 2) * (bandSize - 2)] };
        case channel_1.SHAPE:
            return { range: scaleConfig.shapeRange };
        case channel_1.COLOR:
            if (fieldDef.type === type_1.NOMINAL) {
                return { range: scaleConfig.nominalColorRange };
            }
            return { range: scaleConfig.sequentialColorRange };
        case channel_1.OPACITY:
            return { range: scaleConfig.opacity };
    }
    return {};
}
exports.rangeMixins = rangeMixins;
function pointBandSize(model) {
    var scaleConfig = model.config().scale;
    var hasX = model.has(channel_1.X);
    var hasY = model.has(channel_1.Y);
    var xIsMeasure = fielddef_1.isMeasure(model.encoding().x);
    var yIsMeasure = fielddef_1.isMeasure(model.encoding().y);
    if (hasX && hasY) {
        return xIsMeasure !== yIsMeasure ?
            model.scale(xIsMeasure ? channel_1.Y : channel_1.X).bandSize :
            Math.min(model.scale(channel_1.X).bandSize || scaleConfig.bandSize, model.scale(channel_1.Y).bandSize || scaleConfig.bandSize);
    }
    else if (hasY) {
        return yIsMeasure ? model.config().scale.bandSize : model.scale(channel_1.Y).bandSize;
    }
    else if (hasX) {
        return xIsMeasure ? model.config().scale.bandSize : model.scale(channel_1.X).bandSize;
    }
    return model.config().scale.bandSize;
}
function clamp(scale) {
    if (util_1.contains([scale_1.ScaleType.LINEAR, scale_1.ScaleType.POW, scale_1.ScaleType.SQRT,
        scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type)) {
        return scale.clamp;
    }
    return undefined;
}
exports.clamp = clamp;
function exponent(scale) {
    if (scale.type === scale_1.ScaleType.POW) {
        return scale.exponent;
    }
    return undefined;
}
exports.exponent = exponent;
function nice(scale, channel, fieldDef) {
    if (util_1.contains([scale_1.ScaleType.LINEAR, scale_1.ScaleType.POW, scale_1.ScaleType.SQRT, scale_1.ScaleType.LOG,
        scale_1.ScaleType.TIME, scale_1.ScaleType.UTC, scale_1.ScaleType.QUANTIZE], scale.type)) {
        if (scale.nice !== undefined) {
            return scale.nice;
        }
        if (util_1.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type)) {
            return time_1.smallestUnit(fieldDef.timeUnit);
        }
        return util_1.contains([channel_1.X, channel_1.Y], channel);
    }
    return undefined;
}
exports.nice = nice;
function padding(scale, channel) {
    if (scale.type === scale_1.ScaleType.ORDINAL && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return scale.padding;
    }
    return undefined;
}
exports.padding = padding;
function points(scale, channel, __, model) {
    if (scale.type === scale_1.ScaleType.ORDINAL && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return true;
    }
    return undefined;
}
exports.points = points;
function round(scale, channel) {
    if (util_1.contains([channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN, channel_1.SIZE], channel) && scale.round !== undefined) {
        return scale.round;
    }
    return undefined;
}
exports.round = round;
function zero(scale, channel, fieldDef) {
    if (!util_1.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC, scale_1.ScaleType.ORDINAL], scale.type)) {
        if (scale.zero !== undefined) {
            return scale.zero;
        }
        return !fieldDef.bin && util_1.contains([channel_1.X, channel_1.Y], channel);
    }
    return undefined;
}
exports.zero = zero;

},{"../aggregate":11,"../channel":14,"../config":49,"../data":50,"../fielddef":52,"../mark":54,"../scale":55,"../timeunit":59,"../type":60,"../util":61,"./time":47}],46:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var scale_1 = require('../scale');
var config_1 = require('../config');
var mark_1 = require('../mark');
var fielddef_1 = require('../fielddef');
var encoding_1 = require('../encoding');
var util_1 = require('../util');
var common_1 = require('./common');
function compileStackProperties(mark, encoding, scale, config) {
    var stackFields = getStackFields(mark, encoding, scale);
    if (stackFields.length > 0 &&
        util_1.contains([mark_1.BAR, mark_1.AREA], mark) &&
        config.mark.stacked !== config_1.StackOffset.NONE &&
        encoding_1.isAggregate(encoding)) {
        var isXMeasure = encoding_1.has(encoding, channel_1.X) && fielddef_1.isMeasure(encoding.x), isYMeasure = encoding_1.has(encoding, channel_1.Y) && fielddef_1.isMeasure(encoding.y);
        if (isXMeasure && !isYMeasure) {
            return {
                groupbyChannel: channel_1.Y,
                fieldChannel: channel_1.X,
                stackFields: stackFields,
                offset: config.mark.stacked
            };
        }
        else if (isYMeasure && !isXMeasure) {
            return {
                groupbyChannel: channel_1.X,
                fieldChannel: channel_1.Y,
                stackFields: stackFields,
                offset: config.mark.stacked
            };
        }
    }
    return null;
}
exports.compileStackProperties = compileStackProperties;
function getStackFields(mark, encoding, scaleMap) {
    return [channel_1.COLOR, channel_1.DETAIL, channel_1.OPACITY, channel_1.SIZE].reduce(function (fields, channel) {
        var channelEncoding = encoding[channel];
        if (encoding_1.has(encoding, channel)) {
            if (util_1.isArray(channelEncoding)) {
                channelEncoding.forEach(function (fieldDef) {
                    fields.push(fielddef_1.field(fieldDef));
                });
            }
            else {
                var fieldDef = channelEncoding;
                var scale = scaleMap[channel];
                fields.push(fielddef_1.field(fieldDef, {
                    binSuffix: scale && scale.type === scale_1.ScaleType.ORDINAL ? '_range' : '_start'
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
    var encoding = model.encoding();
    var sortby = model.has(channel_1.ORDER) ?
        (util_1.isArray(encoding[channel_1.ORDER]) ? encoding[channel_1.ORDER] : [encoding[channel_1.ORDER]]).map(common_1.sortField) :
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
    if (stack.offset) {
        transform.offset = stack.offset;
    }
    return transform;
}
exports.stackTransform = stackTransform;

},{"../channel":14,"../config":49,"../encoding":51,"../fielddef":52,"../mark":54,"../scale":55,"../util":61,"./common":16}],47:[function(require,module,exports){
"use strict";
var util_1 = require('../util');
var channel_1 = require('../channel');
var timeunit_1 = require('../timeunit');
function smallestUnit(timeUnit) {
    if (!timeUnit) {
        return undefined;
    }
    if (timeUnit.indexOf('second') > -1) {
        return 'second';
    }
    if (timeUnit.indexOf('minute') > -1) {
        return 'minute';
    }
    if (timeUnit.indexOf('hour') > -1) {
        return 'hour';
    }
    if (timeUnit.indexOf('day') > -1 || timeUnit.indexOf('date') > -1) {
        return 'day';
    }
    if (timeUnit.indexOf('month') > -1) {
        return 'month';
    }
    if (timeUnit.indexOf('year') > -1) {
        return 'year';
    }
    return undefined;
}
exports.smallestUnit = smallestUnit;
function parseExpression(timeUnit, fieldRef, onlyRef) {
    if (onlyRef === void 0) { onlyRef = false; }
    var out = 'datetime(';
    var timeString = timeUnit.toString();
    function get(fun, addComma) {
        if (addComma === void 0) { addComma = true; }
        if (onlyRef) {
            return fieldRef + (addComma ? ', ' : '');
        }
        else {
            return fun + '(' + fieldRef + ')' + (addComma ? ', ' : '');
        }
    }
    if (timeString.indexOf('year') > -1) {
        out += get('year');
    }
    else {
        out += '2006, ';
    }
    if (timeString.indexOf('month') > -1) {
        out += get('month');
    }
    else {
        out += '0, ';
    }
    if (timeString.indexOf('day') > -1) {
        out += get('day', false) + '+1, ';
    }
    else if (timeString.indexOf('date') > -1) {
        out += get('date');
    }
    else {
        out += '1, ';
    }
    if (timeString.indexOf('hours') > -1) {
        out += get('hours');
    }
    else {
        out += '0, ';
    }
    if (timeString.indexOf('minutes') > -1) {
        out += get('minutes');
    }
    else {
        out += '0, ';
    }
    if (timeString.indexOf('seconds') > -1) {
        out += get('seconds');
    }
    else {
        out += '0, ';
    }
    if (timeString.indexOf('milliseconds') > -1) {
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
        case timeunit_1.TimeUnit.SECONDS:
            return util_1.range(0, 60);
        case timeunit_1.TimeUnit.MINUTES:
            return util_1.range(0, 60);
        case timeunit_1.TimeUnit.HOURS:
            return util_1.range(0, 24);
        case timeunit_1.TimeUnit.DAY:
            return util_1.range(0, 7);
        case timeunit_1.TimeUnit.DATE:
            return util_1.range(1, 32);
        case timeunit_1.TimeUnit.MONTH:
            return util_1.range(0, 12);
    }
    return null;
}
exports.rawDomain = rawDomain;

},{"../channel":14,"../timeunit":59,"../util":61}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var config_1 = require('../config');
var data_1 = require('../data');
var vlEncoding = require('../encoding');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var scale_1 = require('../scale');
var type_1 = require('../type');
var util_1 = require('../util');
var axis_1 = require('./axis');
var common_1 = require('./common');
var config_2 = require('./config');
var data_2 = require('./data/data');
var legend_1 = require('./legend');
var layout_1 = require('./layout');
var model_1 = require('./model');
var mark_2 = require('./mark/mark');
var scale_2 = require('./scale');
var stack_1 = require('./stack');
var UnitModel = (function (_super) {
    __extends(UnitModel, _super);
    function UnitModel(spec, parent, parentGivenName) {
        _super.call(this, spec, parent, parentGivenName);
        var mark = this._mark = spec.mark;
        var encoding = this._encoding = this._initEncoding(mark, spec.encoding || {});
        var config = this._config = this._initConfig(spec.config, parent, mark, encoding);
        var scale = this._scale = this._initScale(mark, encoding, config);
        this._axis = this._initAxis(encoding, config);
        this._legend = this._initLegend(encoding, config);
        this._stack = stack_1.compileStackProperties(mark, encoding, scale, config);
    }
    UnitModel.prototype._initEncoding = function (mark, encoding) {
        encoding = util_1.duplicate(encoding);
        vlEncoding.forEach(encoding, function (fieldDef, channel) {
            if (!channel_1.supportMark(channel, mark)) {
                console.warn(channel, 'dropped as it is incompatible with', mark);
                delete fieldDef.field;
                return;
            }
            if (fieldDef.type) {
                fieldDef.type = type_1.getFullName(fieldDef.type);
            }
            if ((channel === channel_1.PATH || channel === channel_1.ORDER) && !fieldDef.aggregate && fieldDef.type === type_1.QUANTITATIVE) {
                fieldDef.aggregate = aggregate_1.AggregateOp.MIN;
            }
        });
        return encoding;
    };
    UnitModel.prototype._initConfig = function (specConfig, parent, mark, encoding) {
        var config = util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), parent ? parent.config() : {}, specConfig);
        config.mark = config_2.initMarkConfig(mark, encoding, config);
        return config;
    };
    UnitModel.prototype._initScale = function (mark, encoding, config) {
        return channel_1.UNIT_SCALE_CHANNELS.reduce(function (_scale, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var scaleSpec = encoding[channel].scale || {};
                var channelDef = encoding[channel];
                var _scaleType = scale_2.scaleType(scaleSpec, channelDef, channel, mark);
                _scale[channel] = util_1.extend({
                    type: _scaleType,
                    round: config.scale.round,
                    padding: config.scale.padding,
                    useRawDomain: config.scale.useRawDomain,
                    bandSize: channel === channel_1.X && _scaleType === scale_1.ScaleType.ORDINAL && mark === mark_1.TEXT ?
                        config.scale.textBandWidth : config.scale.bandSize
                }, scaleSpec);
            }
            return _scale;
        }, {});
    };
    UnitModel.prototype._initAxis = function (encoding, config) {
        return [channel_1.X, channel_1.Y].reduce(function (_axis, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var axisSpec = encoding[channel].axis;
                if (axisSpec !== false) {
                    _axis[channel] = util_1.extend({}, config.axis, axisSpec === true ? {} : axisSpec || {});
                }
            }
            return _axis;
        }, {});
    };
    UnitModel.prototype._initLegend = function (encoding, config) {
        return channel_1.NONSPATIAL_SCALE_CHANNELS.reduce(function (_legend, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var legendSpec = encoding[channel].legend;
                if (legendSpec !== false) {
                    _legend[channel] = util_1.extend({}, config.legend, legendSpec === true ? {} : legendSpec || {});
                }
            }
            return _legend;
        }, {});
    };
    UnitModel.prototype.parseData = function () {
        this.component.data = data_2.parseUnitData(this);
    };
    UnitModel.prototype.parseSelectionData = function () {
    };
    UnitModel.prototype.parseLayoutData = function () {
        this.component.layout = layout_1.parseUnitLayout(this);
    };
    UnitModel.prototype.parseScale = function () {
        this.component.scale = scale_2.parseScaleComponent(this);
    };
    UnitModel.prototype.parseMark = function () {
        this.component.mark = mark_2.parseMark(this);
    };
    UnitModel.prototype.parseAxis = function () {
        this.component.axis = axis_1.parseAxisComponent(this, [channel_1.X, channel_1.Y]);
    };
    UnitModel.prototype.parseAxisGroup = function () {
        return null;
    };
    UnitModel.prototype.parseGridGroup = function () {
        return null;
    };
    UnitModel.prototype.parseLegend = function () {
        this.component.legend = legend_1.parseLegendComponent(this);
    };
    UnitModel.prototype.assembleData = function (data) {
        return data_2.assembleData(this, data);
    };
    UnitModel.prototype.assembleLayout = function (layoutData) {
        return layout_1.assembleLayout(this, layoutData);
    };
    UnitModel.prototype.assembleMarks = function () {
        return this.component.mark;
    };
    UnitModel.prototype.assembleParentGroupProperties = function (cellConfig) {
        return common_1.applyConfig({}, cellConfig, common_1.FILL_STROKE_CONFIG.concat(['clip']));
    };
    UnitModel.prototype.channels = function () {
        return channel_1.UNIT_CHANNELS;
    };
    UnitModel.prototype.mapping = function () {
        return this.encoding();
    };
    UnitModel.prototype.stack = function () {
        return this._stack;
    };
    UnitModel.prototype.toSpec = function (excludeConfig, excludeData) {
        var encoding = util_1.duplicate(this._encoding);
        var spec;
        spec = {
            mark: this._mark,
            encoding: encoding
        };
        if (!excludeConfig) {
            spec.config = util_1.duplicate(this._config);
        }
        if (!excludeData) {
            spec.data = util_1.duplicate(this._data);
        }
        return spec;
    };
    UnitModel.prototype.mark = function () {
        return this._mark;
    };
    UnitModel.prototype.has = function (channel) {
        return vlEncoding.has(this._encoding, channel);
    };
    UnitModel.prototype.encoding = function () {
        return this._encoding;
    };
    UnitModel.prototype.fieldDef = function (channel) {
        return this._encoding[channel] || {};
    };
    UnitModel.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: this.scale(channel).type === scale_1.ScaleType.ORDINAL ? '_range' : '_start'
            }, opt);
        }
        return fielddef_1.field(fieldDef, opt);
    };
    UnitModel.prototype.dataTable = function () {
        return this.dataName(vlEncoding.isAggregate(this._encoding) ? data_1.SUMMARY : data_1.SOURCE);
    };
    UnitModel.prototype.isUnit = function () {
        return true;
    };
    return UnitModel;
}(model_1.Model));
exports.UnitModel = UnitModel;

},{"../aggregate":11,"../channel":14,"../config":49,"../data":50,"../encoding":51,"../fielddef":52,"../mark":54,"../scale":55,"../type":60,"../util":61,"./axis":15,"./common":16,"./config":18,"./data/data":21,"./layout":34,"./legend":35,"./mark/mark":39,"./model":44,"./scale":45,"./stack":46}],49:[function(require,module,exports){
"use strict";
var scale_1 = require('./scale');
var axis_1 = require('./axis');
var legend_1 = require('./legend');
exports.defaultCellConfig = {
    width: 200,
    height: 200
};
exports.defaultFacetCellConfig = {
    stroke: '#ccc',
    strokeWidth: 1
};
var defaultFacetGridConfig = {
    color: '#000000',
    opacity: 0.4,
    offset: 0
};
exports.defaultFacetConfig = {
    scale: scale_1.defaultFacetScaleConfig,
    axis: axis_1.defaultFacetAxisConfig,
    grid: defaultFacetGridConfig,
    cell: exports.defaultFacetCellConfig
};
(function (FontWeight) {
    FontWeight[FontWeight["NORMAL"] = 'normal'] = "NORMAL";
    FontWeight[FontWeight["BOLD"] = 'bold'] = "BOLD";
})(exports.FontWeight || (exports.FontWeight = {}));
var FontWeight = exports.FontWeight;
(function (Shape) {
    Shape[Shape["CIRCLE"] = 'circle'] = "CIRCLE";
    Shape[Shape["SQUARE"] = 'square'] = "SQUARE";
    Shape[Shape["CROSS"] = 'cross'] = "CROSS";
    Shape[Shape["DIAMOND"] = 'diamond'] = "DIAMOND";
    Shape[Shape["TRIANGLEUP"] = 'triangle-up'] = "TRIANGLEUP";
    Shape[Shape["TRIANGLEDOWN"] = 'triangle-down'] = "TRIANGLEDOWN";
})(exports.Shape || (exports.Shape = {}));
var Shape = exports.Shape;
(function (HorizontalAlign) {
    HorizontalAlign[HorizontalAlign["LEFT"] = 'left'] = "LEFT";
    HorizontalAlign[HorizontalAlign["RIGHT"] = 'right'] = "RIGHT";
    HorizontalAlign[HorizontalAlign["CENTER"] = 'center'] = "CENTER";
})(exports.HorizontalAlign || (exports.HorizontalAlign = {}));
var HorizontalAlign = exports.HorizontalAlign;
(function (VerticalAlign) {
    VerticalAlign[VerticalAlign["TOP"] = 'top'] = "TOP";
    VerticalAlign[VerticalAlign["MIDDLE"] = 'middle'] = "MIDDLE";
    VerticalAlign[VerticalAlign["BOTTOM"] = 'bottom'] = "BOTTOM";
})(exports.VerticalAlign || (exports.VerticalAlign = {}));
var VerticalAlign = exports.VerticalAlign;
(function (FontStyle) {
    FontStyle[FontStyle["NORMAL"] = 'normal'] = "NORMAL";
    FontStyle[FontStyle["ITALIC"] = 'italic'] = "ITALIC";
})(exports.FontStyle || (exports.FontStyle = {}));
var FontStyle = exports.FontStyle;
(function (StackOffset) {
    StackOffset[StackOffset["ZERO"] = 'zero'] = "ZERO";
    StackOffset[StackOffset["CENTER"] = 'center'] = "CENTER";
    StackOffset[StackOffset["NORMALIZE"] = 'normalize'] = "NORMALIZE";
    StackOffset[StackOffset["NONE"] = 'none'] = "NONE";
})(exports.StackOffset || (exports.StackOffset = {}));
var StackOffset = exports.StackOffset;
(function (Interpolate) {
    Interpolate[Interpolate["LINEAR"] = 'linear'] = "LINEAR";
    Interpolate[Interpolate["LINEAR_CLOSED"] = 'linear-closed'] = "LINEAR_CLOSED";
    Interpolate[Interpolate["STEP"] = 'step'] = "STEP";
    Interpolate[Interpolate["STEP_BEFORE"] = 'step-before'] = "STEP_BEFORE";
    Interpolate[Interpolate["STEP_AFTER"] = 'step-after'] = "STEP_AFTER";
    Interpolate[Interpolate["BASIS"] = 'basis'] = "BASIS";
    Interpolate[Interpolate["BASIS_OPEN"] = 'basis-open'] = "BASIS_OPEN";
    Interpolate[Interpolate["BASIS_CLOSED"] = 'basis-closed'] = "BASIS_CLOSED";
    Interpolate[Interpolate["CARDINAL"] = 'cardinal'] = "CARDINAL";
    Interpolate[Interpolate["CARDINAL_OPEN"] = 'cardinal-open'] = "CARDINAL_OPEN";
    Interpolate[Interpolate["CARDINAL_CLOSED"] = 'cardinal-closed'] = "CARDINAL_CLOSED";
    Interpolate[Interpolate["BUNDLE"] = 'bundle'] = "BUNDLE";
    Interpolate[Interpolate["MONOTONE"] = 'monotone'] = "MONOTONE";
})(exports.Interpolate || (exports.Interpolate = {}));
var Interpolate = exports.Interpolate;
exports.defaultMarkConfig = {
    color: '#4682b4',
    shape: Shape.CIRCLE,
    strokeWidth: 2,
    size: 30,
    barThinSize: 2,
    ruleSize: 1,
    tickThickness: 1,
    fontSize: 10,
    baseline: VerticalAlign.MIDDLE,
    text: 'Abc',
    shortTimeLabels: false,
    applyColorToBackground: false
};
exports.defaultConfig = {
    numberFormat: 's',
    timeFormat: '%Y-%m-%d',
    cell: exports.defaultCellConfig,
    mark: exports.defaultMarkConfig,
    scale: scale_1.defaultScaleConfig,
    axis: axis_1.defaultAxisConfig,
    legend: legend_1.defaultLegendConfig,
    facet: exports.defaultFacetConfig,
};

},{"./axis":12,"./legend":53,"./scale":55}],50:[function(require,module,exports){
"use strict";
var type_1 = require('./type');
(function (DataFormat) {
    DataFormat[DataFormat["JSON"] = 'json'] = "JSON";
    DataFormat[DataFormat["CSV"] = 'csv'] = "CSV";
    DataFormat[DataFormat["TSV"] = 'tsv'] = "TSV";
})(exports.DataFormat || (exports.DataFormat = {}));
var DataFormat = exports.DataFormat;
(function (DataTable) {
    DataTable[DataTable["SOURCE"] = 'source'] = "SOURCE";
    DataTable[DataTable["SUMMARY"] = 'summary'] = "SUMMARY";
    DataTable[DataTable["STACKED_SCALE"] = 'stacked_scale'] = "STACKED_SCALE";
    DataTable[DataTable["LAYOUT"] = 'layout'] = "LAYOUT";
})(exports.DataTable || (exports.DataTable = {}));
var DataTable = exports.DataTable;
exports.SUMMARY = DataTable.SUMMARY;
exports.SOURCE = DataTable.SOURCE;
exports.STACKED_SCALE = DataTable.STACKED_SCALE;
exports.LAYOUT = DataTable.LAYOUT;
exports.types = {
    'boolean': type_1.Type.NOMINAL,
    'number': type_1.Type.QUANTITATIVE,
    'integer': type_1.Type.QUANTITATIVE,
    'date': type_1.Type.TEMPORAL,
    'string': type_1.Type.NOMINAL
};

},{"./type":60}],51:[function(require,module,exports){
"use strict";
var channel_1 = require('./channel');
var util_1 = require('./util');
function countRetinal(encoding) {
    var count = 0;
    if (encoding.color) {
        count++;
    }
    if (encoding.opacity) {
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
    return util_1.any(channel_1.CHANNELS, function (channel) {
        if (has(encoding, channel) && encoding[channel].aggregate) {
            return true;
        }
        return false;
    });
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
    channelMappingForEach(channel_1.CHANNELS, encoding, f, thisArg);
}
exports.forEach = forEach;
function channelMappingForEach(channels, mapping, f, thisArg) {
    var i = 0;
    channels.forEach(function (channel) {
        if (has(mapping, channel)) {
            if (util_1.isArray(mapping[channel])) {
                mapping[channel].forEach(function (fieldDef) {
                    f.call(thisArg, fieldDef, channel, i++);
                });
            }
            else {
                f.call(thisArg, mapping[channel], channel, i++);
            }
        }
    });
}
exports.channelMappingForEach = channelMappingForEach;
function map(encoding, f, thisArg) {
    return channelMappingMap(channel_1.CHANNELS, encoding, f, thisArg);
}
exports.map = map;
function channelMappingMap(channels, mapping, f, thisArg) {
    var arr = [];
    channels.forEach(function (channel) {
        if (has(mapping, channel)) {
            if (util_1.isArray(mapping[channel])) {
                mapping[channel].forEach(function (fieldDef) {
                    arr.push(f.call(thisArg, fieldDef, channel));
                });
            }
            else {
                arr.push(f.call(thisArg, mapping[channel], channel));
            }
        }
    });
    return arr;
}
exports.channelMappingMap = channelMappingMap;
function reduce(encoding, f, init, thisArg) {
    return channelMappingReduce(channel_1.CHANNELS, encoding, f, init, thisArg);
}
exports.reduce = reduce;
function channelMappingReduce(channels, mapping, f, init, thisArg) {
    var r = init;
    channel_1.CHANNELS.forEach(function (channel) {
        if (has(mapping, channel)) {
            if (util_1.isArray(mapping[channel])) {
                mapping[channel].forEach(function (fieldDef) {
                    r = f.call(thisArg, r, fieldDef, channel);
                });
            }
            else {
                r = f.call(thisArg, r, mapping[channel], channel);
            }
        }
    });
    return r;
}
exports.channelMappingReduce = channelMappingReduce;

},{"./channel":14,"./util":61}],52:[function(require,module,exports){
"use strict";
var aggregate_1 = require('./aggregate');
var scale_1 = require('./scale');
var timeunit_1 = require('./timeunit');
var type_1 = require('./type');
var util_1 = require('./util');
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
        var binSuffix = opt.binSuffix || (opt.scaleType === scale_1.ScaleType.ORDINAL ?
            '_range' :
            '_start');
        return prefix + 'bin_' + field + binSuffix;
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
exports.COUNT_TITLE = 'Number of Records';
function count() {
    return { field: '*', aggregate: aggregate_1.AggregateOp.COUNT, type: type_1.QUANTITATIVE, title: exports.COUNT_TITLE };
}
exports.count = count;
function isCount(fieldDef) {
    return fieldDef.aggregate === aggregate_1.AggregateOp.COUNT;
}
exports.isCount = isCount;
function cardinality(fieldDef, stats, filterNull) {
    if (filterNull === void 0) { filterNull = {}; }
    var stat = stats[fieldDef.field], type = fieldDef.type;
    if (fieldDef.bin) {
        var bin_1 = fieldDef.bin;
        var maxbins = (typeof bin_1 === 'boolean') ? undefined : bin_1.maxbins;
        if (maxbins === undefined) {
            maxbins = 10;
        }
        var bins = util_1.getbins(stat, maxbins);
        return (bins.stop - bins.start) / bins.step;
    }
    if (type === type_1.TEMPORAL) {
        var timeUnit = fieldDef.timeUnit;
        switch (timeUnit) {
            case timeunit_1.TimeUnit.SECONDS: return 60;
            case timeunit_1.TimeUnit.MINUTES: return 60;
            case timeunit_1.TimeUnit.HOURS: return 24;
            case timeunit_1.TimeUnit.DAY: return 7;
            case timeunit_1.TimeUnit.DATE: return 31;
            case timeunit_1.TimeUnit.MONTH: return 12;
            case timeunit_1.TimeUnit.YEAR:
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
    if (fieldDef.title != null) {
        return fieldDef.title;
    }
    if (isCount(fieldDef)) {
        return exports.COUNT_TITLE;
    }
    var fn = fieldDef.aggregate || fieldDef.timeUnit || (fieldDef.bin && 'bin');
    if (fn) {
        return fn.toString().toUpperCase() + '(' + fieldDef.field + ')';
    }
    else {
        return fieldDef.field;
    }
}
exports.title = title;

},{"./aggregate":11,"./scale":55,"./timeunit":59,"./type":60,"./util":61}],53:[function(require,module,exports){
"use strict";
exports.defaultLegendConfig = {
    orient: undefined,
    shortTimeLabels: false
};

},{}],54:[function(require,module,exports){
"use strict";
(function (Mark) {
    Mark[Mark["AREA"] = 'area'] = "AREA";
    Mark[Mark["BAR"] = 'bar'] = "BAR";
    Mark[Mark["LINE"] = 'line'] = "LINE";
    Mark[Mark["POINT"] = 'point'] = "POINT";
    Mark[Mark["TEXT"] = 'text'] = "TEXT";
    Mark[Mark["TICK"] = 'tick'] = "TICK";
    Mark[Mark["RULE"] = 'rule'] = "RULE";
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
exports.RULE = Mark.RULE;
exports.CIRCLE = Mark.CIRCLE;
exports.SQUARE = Mark.SQUARE;

},{}],55:[function(require,module,exports){
"use strict";
(function (ScaleType) {
    ScaleType[ScaleType["LINEAR"] = 'linear'] = "LINEAR";
    ScaleType[ScaleType["LOG"] = 'log'] = "LOG";
    ScaleType[ScaleType["POW"] = 'pow'] = "POW";
    ScaleType[ScaleType["SQRT"] = 'sqrt'] = "SQRT";
    ScaleType[ScaleType["QUANTILE"] = 'quantile'] = "QUANTILE";
    ScaleType[ScaleType["QUANTIZE"] = 'quantize'] = "QUANTIZE";
    ScaleType[ScaleType["ORDINAL"] = 'ordinal'] = "ORDINAL";
    ScaleType[ScaleType["TIME"] = 'time'] = "TIME";
    ScaleType[ScaleType["UTC"] = 'utc'] = "UTC";
})(exports.ScaleType || (exports.ScaleType = {}));
var ScaleType = exports.ScaleType;
(function (NiceTime) {
    NiceTime[NiceTime["SECOND"] = 'second'] = "SECOND";
    NiceTime[NiceTime["MINUTE"] = 'minute'] = "MINUTE";
    NiceTime[NiceTime["HOUR"] = 'hour'] = "HOUR";
    NiceTime[NiceTime["DAY"] = 'day'] = "DAY";
    NiceTime[NiceTime["WEEK"] = 'week'] = "WEEK";
    NiceTime[NiceTime["MONTH"] = 'month'] = "MONTH";
    NiceTime[NiceTime["YEAR"] = 'year'] = "YEAR";
})(exports.NiceTime || (exports.NiceTime = {}));
var NiceTime = exports.NiceTime;
exports.defaultScaleConfig = {
    round: true,
    textBandWidth: 90,
    bandSize: 21,
    padding: 1,
    useRawDomain: false,
    opacity: [0.3, 0.8],
    nominalColorRange: 'category10',
    sequentialColorRange: ['#AFC6A3', '#09622A'],
    shapeRange: 'shapes',
    fontSizeRange: [8, 40],
    ruleSizeRange: [1, 5],
    tickSizeRange: [1, 20]
};
exports.defaultFacetScaleConfig = {
    round: true,
    padding: 16
};

},{}],56:[function(require,module,exports){
"use strict";
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
            fieldDef.field = fieldDef.field.substr(a.toString().length + 1);
            if (a === aggregate_1.AggregateOp.COUNT && fieldDef.field.length === 0) {
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

},{"./aggregate":11,"./encoding":51,"./mark":54,"./timeunit":59,"./type":60}],57:[function(require,module,exports){
"use strict";
(function (SortOrder) {
    SortOrder[SortOrder["ASCENDING"] = 'ascending'] = "ASCENDING";
    SortOrder[SortOrder["DESCENDING"] = 'descending'] = "DESCENDING";
    SortOrder[SortOrder["NONE"] = 'none'] = "NONE";
})(exports.SortOrder || (exports.SortOrder = {}));
var SortOrder = exports.SortOrder;

},{}],58:[function(require,module,exports){
"use strict";
var encoding_1 = require('./encoding');
var channel_1 = require('./channel');
var vlEncoding = require('./encoding');
var mark_1 = require('./mark');
var util_1 = require('./util');
function isFacetSpec(spec) {
    return spec['facet'] !== undefined;
}
exports.isFacetSpec = isFacetSpec;
function isExtendedUnitSpec(spec) {
    if (isSomeUnitSpec(spec)) {
        var hasRow = encoding_1.has(spec.encoding, channel_1.ROW);
        var hasColumn = encoding_1.has(spec.encoding, channel_1.COLUMN);
        return hasRow || hasColumn;
    }
    return false;
}
exports.isExtendedUnitSpec = isExtendedUnitSpec;
function isUnitSpec(spec) {
    if (isSomeUnitSpec(spec)) {
        return !isExtendedUnitSpec(spec);
    }
    return false;
}
exports.isUnitSpec = isUnitSpec;
function isSomeUnitSpec(spec) {
    return spec['mark'] !== undefined;
}
exports.isSomeUnitSpec = isSomeUnitSpec;
function isLayerSpec(spec) {
    return spec['layers'] !== undefined;
}
exports.isLayerSpec = isLayerSpec;
function normalize(spec) {
    if (isExtendedUnitSpec(spec)) {
        var hasRow = encoding_1.has(spec.encoding, channel_1.ROW);
        var hasColumn = encoding_1.has(spec.encoding, channel_1.COLUMN);
        var encoding = util_1.duplicate(spec.encoding);
        delete encoding.column;
        delete encoding.row;
        return util_1.extend(spec.name ? { name: spec.name } : {}, spec.description ? { description: spec.description } : {}, { data: spec.data }, spec.transform ? { transform: spec.transform } : {}, {
            facet: util_1.extend(hasRow ? { row: spec.encoding.row } : {}, hasColumn ? { column: spec.encoding.column } : {}),
            spec: {
                mark: spec.mark,
                encoding: encoding
            }
        }, spec.config ? { config: spec.config } : {});
    }
    return spec;
}
exports.normalize = normalize;
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
    return spec;
}
exports.getCleanSpec = getCleanSpec;
function isStack(spec) {
    return (vlEncoding.has(spec.encoding, channel_1.COLOR) || vlEncoding.has(spec.encoding, channel_1.SHAPE)) &&
        (spec.mark === mark_1.BAR || spec.mark === mark_1.AREA) &&
        (!spec.config || !spec.config.mark.stacked !== false) &&
        vlEncoding.isAggregate(spec.encoding);
}
exports.isStack = isStack;
function transpose(spec) {
    var oldenc = spec.encoding;
    var encoding = util_1.duplicate(spec.encoding);
    encoding.x = oldenc.y;
    encoding.y = oldenc.x;
    encoding.row = oldenc.column;
    encoding.column = oldenc.row;
    spec.encoding = encoding;
    return spec;
}
exports.transpose = transpose;

},{"./channel":14,"./encoding":51,"./mark":54,"./util":61}],59:[function(require,module,exports){
"use strict";
(function (TimeUnit) {
    TimeUnit[TimeUnit["YEAR"] = 'year'] = "YEAR";
    TimeUnit[TimeUnit["MONTH"] = 'month'] = "MONTH";
    TimeUnit[TimeUnit["DAY"] = 'day'] = "DAY";
    TimeUnit[TimeUnit["DATE"] = 'date'] = "DATE";
    TimeUnit[TimeUnit["HOURS"] = 'hours'] = "HOURS";
    TimeUnit[TimeUnit["MINUTES"] = 'minutes'] = "MINUTES";
    TimeUnit[TimeUnit["SECONDS"] = 'seconds'] = "SECONDS";
    TimeUnit[TimeUnit["MILLISECONDS"] = 'milliseconds'] = "MILLISECONDS";
    TimeUnit[TimeUnit["YEARMONTH"] = 'yearmonth'] = "YEARMONTH";
    TimeUnit[TimeUnit["YEARMONTHDAY"] = 'yearmonthday'] = "YEARMONTHDAY";
    TimeUnit[TimeUnit["YEARMONTHDATE"] = 'yearmonthdate'] = "YEARMONTHDATE";
    TimeUnit[TimeUnit["YEARDAY"] = 'yearday'] = "YEARDAY";
    TimeUnit[TimeUnit["YEARDATE"] = 'yeardate'] = "YEARDATE";
    TimeUnit[TimeUnit["YEARMONTHDAYHOURS"] = 'yearmonthdayhours'] = "YEARMONTHDAYHOURS";
    TimeUnit[TimeUnit["YEARMONTHDAYHOURSMINUTES"] = 'yearmonthdayhoursminutes'] = "YEARMONTHDAYHOURSMINUTES";
    TimeUnit[TimeUnit["YEARMONTHDAYHOURSMINUTESSECONDS"] = 'yearmonthdayhoursminutesseconds'] = "YEARMONTHDAYHOURSMINUTESSECONDS";
    TimeUnit[TimeUnit["HOURSMINUTES"] = 'hoursminutes'] = "HOURSMINUTES";
    TimeUnit[TimeUnit["HOURSMINUTESSECONDS"] = 'hoursminutesseconds'] = "HOURSMINUTESSECONDS";
    TimeUnit[TimeUnit["MINUTESSECONDS"] = 'minutesseconds'] = "MINUTESSECONDS";
    TimeUnit[TimeUnit["SECONDSMILLISECONDS"] = 'secondsmilliseconds'] = "SECONDSMILLISECONDS";
})(exports.TimeUnit || (exports.TimeUnit = {}));
var TimeUnit = exports.TimeUnit;
exports.TIMEUNITS = [
    TimeUnit.YEAR,
    TimeUnit.MONTH,
    TimeUnit.DAY,
    TimeUnit.DATE,
    TimeUnit.HOURS,
    TimeUnit.MINUTES,
    TimeUnit.SECONDS,
    TimeUnit.MILLISECONDS,
    TimeUnit.YEARMONTH,
    TimeUnit.YEARMONTHDAY,
    TimeUnit.YEARMONTHDATE,
    TimeUnit.YEARDAY,
    TimeUnit.YEARDATE,
    TimeUnit.YEARMONTHDAYHOURS,
    TimeUnit.YEARMONTHDAYHOURSMINUTES,
    TimeUnit.YEARMONTHDAYHOURSMINUTESSECONDS,
    TimeUnit.HOURSMINUTES,
    TimeUnit.HOURSMINUTESSECONDS,
    TimeUnit.MINUTESSECONDS,
    TimeUnit.SECONDSMILLISECONDS,
];
function format(timeUnit, abbreviated) {
    if (abbreviated === void 0) { abbreviated = false; }
    if (!timeUnit) {
        return undefined;
    }
    var timeString = timeUnit.toString();
    var dateComponents = [];
    if (timeString.indexOf('year') > -1) {
        dateComponents.push(abbreviated ? '%y' : '%Y');
    }
    if (timeString.indexOf('month') > -1) {
        dateComponents.push(abbreviated ? '%b' : '%B');
    }
    if (timeString.indexOf('day') > -1) {
        dateComponents.push(abbreviated ? '%a' : '%A');
    }
    else if (timeString.indexOf('date') > -1) {
        dateComponents.push('%d');
    }
    var timeComponents = [];
    if (timeString.indexOf('hours') > -1) {
        timeComponents.push('%H');
    }
    if (timeString.indexOf('minutes') > -1) {
        timeComponents.push('%M');
    }
    if (timeString.indexOf('seconds') > -1) {
        timeComponents.push('%S');
    }
    if (timeString.indexOf('milliseconds') > -1) {
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

},{}],60:[function(require,module,exports){
"use strict";
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

},{}],61:[function(require,module,exports){
"use strict";
var stringify = require('json-stable-stringify');
var util_1 = require('datalib/src/util');
exports.keys = util_1.keys;
exports.extend = util_1.extend;
exports.duplicate = util_1.duplicate;
exports.isArray = util_1.isArray;
exports.vals = util_1.vals;
exports.truncate = util_1.truncate;
exports.toMap = util_1.toMap;
exports.isObject = util_1.isObject;
exports.isString = util_1.isString;
exports.isNumber = util_1.isNumber;
exports.isBoolean = util_1.isBoolean;
var generate_1 = require('datalib/src/generate');
exports.range = generate_1.range;
var encoding_1 = require('./encoding');
exports.has = encoding_1.has;
var channel_1 = require('./channel');
exports.Channel = channel_1.Channel;
var util_2 = require('datalib/src/util');
function hash(a) {
    if (util_2.isString(a) || util_2.isNumber(a) || util_2.isBoolean(a)) {
        return String(a);
    }
    return stringify(a);
}
exports.hash = hash;
function contains(array, item) {
    return array.indexOf(item) > -1;
}
exports.contains = contains;
function without(array, excludedItems) {
    return array.filter(function (item) {
        return !contains(excludedItems, item);
    });
}
exports.without = without;
function union(array, other) {
    return array.concat(without(other, array));
}
exports.union = union;
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
function flatten(arrays) {
    return [].concat.apply([], arrays);
}
exports.flatten = flatten;
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
var dlBin = require('datalib/src/bins/bins');
function getbins(stats, maxbins) {
    return dlBin({
        min: stats.min,
        max: stats.max,
        maxbins: maxbins
    });
}
exports.getbins = getbins;
function unique(values, f) {
    var results = [];
    var u = {}, v, i, n;
    for (i = 0, n = values.length; i < n; ++i) {
        v = f ? f(values[i]) : values[i];
        if (v in u) {
            continue;
        }
        u[v] = 1;
        results.push(values[i]);
    }
    return results;
}
exports.unique = unique;
;
function warning(message) {
    console.warn('[VL Warning]', message);
}
exports.warning = warning;
function error(message) {
    console.error('[VL Error]', message);
}
exports.error = error;
function differ(dict, other) {
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (other[key] && dict[key] && other[key] !== dict[key]) {
                return true;
            }
        }
    }
    return false;
}
exports.differ = differ;

},{"./channel":14,"./encoding":51,"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6,"json-stable-stringify":7}],62:[function(require,module,exports){
"use strict";
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

},{"./mark":54,"./util":61}],63:[function(require,module,exports){
"use strict";
var util_1 = require('./util');
function isUnionedDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'fields' in domain;
    }
    return false;
}
exports.isUnionedDomain = isUnionedDomain;
function isDataRefDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'data' in domain;
    }
    return false;
}
exports.isDataRefDomain = isDataRefDomain;

},{"./util":61}],64:[function(require,module,exports){
"use strict";
var vlBin = require('./bin');
var vlChannel = require('./channel');
var vlConfig = require('./config');
var vlData = require('./data');
var vlEncoding = require('./encoding');
var vlFieldDef = require('./fielddef');
var vlCompile = require('./compile/compile');
var vlShorthand = require('./shorthand');
var vlSpec = require('./spec');
var vlTimeUnit = require('./timeunit');
var vlType = require('./type');
var vlValidate = require('./validate');
var vlUtil = require('./util');
exports.bin = vlBin;
exports.channel = vlChannel;
exports.compile = vlCompile.compile;
exports.config = vlConfig;
exports.data = vlData;
exports.encoding = vlEncoding;
exports.fieldDef = vlFieldDef;
exports.shorthand = vlShorthand;
exports.spec = vlSpec;
exports.timeUnit = vlTimeUnit;
exports.type = vlType;
exports.util = vlUtil;
exports.validate = vlValidate;
exports.version = '1.0.11';

},{"./bin":13,"./channel":14,"./compile/compile":17,"./config":49,"./data":50,"./encoding":51,"./fielddef":52,"./shorthand":56,"./spec":58,"./timeunit":59,"./type":60,"./util":61,"./validate":62}]},{},[64])(64)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvc3RhY2sudHMiLCJzcmMvY29tcGlsZS90aW1lLnRzIiwic3JjL2NvbXBpbGUvdW5pdC50cyIsInNyYy9jb25maWcudHMiLCJzcmMvZGF0YS50cyIsInNyYy9lbmNvZGluZy50cyIsInNyYy9maWVsZGRlZi50cyIsInNyYy9sZWdlbmQudHMiLCJzcmMvbWFyay50cyIsInNyYy9zY2FsZS50cyIsInNyYy9zaG9ydGhhbmQudHMiLCJzcmMvc29ydC50cyIsInNyYy9zcGVjLnRzIiwic3JjL3RpbWV1bml0LnRzIiwic3JjL3R5cGUudHMiLCJzcmMvdXRpbC50cyIsInNyYy92YWxpZGF0ZS50cyIsInNyYy92ZWdhLnNjaGVtYS50cyIsInNyYy92bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDekpBLFdBQVksV0FBVztJQUNuQixvQ0FBUyxRQUFlLFlBQUEsQ0FBQTtJQUN4QixtQ0FBUSxPQUFjLFdB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QUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLEdBQUcsV0FBQyxHQUFHLFdBQUMsQ0FBQztnQkFDdEUsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDO1lBQ3JGLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLFdBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssV0FBSSxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxXQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzdDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsY0FBYyxFQUFDLENBQUM7WUFDN0MsQ0FBQztZQUVELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQ3ZELEtBQUssZUFBSztZQUNSLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsVUFBVSxFQUFDLENBQUM7UUFDekMsS0FBSyxlQUFLO1lBQ1IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxjQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixFQUFDLENBQUM7WUFDaEQsQ0FBQztZQUVELE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsb0JBQW9CLEVBQUMsQ0FBQztRQUNuRCxLQUFLLGlCQUFPO1lBQ1YsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNaLENBQUM7QUF4RWUsbUJBQVcsY0F3RTFCLENBQUE7QUFFRCx1QkFBdUIsS0FBZ0I7SUFDckMsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztJQUV6QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUM7SUFFMUIsSUFBTSxVQUFVLEdBQUcsb0JBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsSUFBTSxVQUFVLEdBQUcsb0JBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVO1lBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFdBQUMsR0FBRyxXQUFDLENBQUMsQ0FBQyxRQUFRO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQ04sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsRUFDL0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FDaEQsQ0FBQztJQUNOLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDdkMsQ0FBQztBQUVELGVBQXNCLEtBQVk7SUFHaEMsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQVMsQ0FBQyxHQUFHLEVBQUUsaUJBQVMsQ0FBQyxJQUFJO1FBQ3ZELGlCQUFTLENBQUMsR0FBRyxFQUFFLGlCQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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Syx1QkFBVyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUN2QixDQUFDO1lBQ0QsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNILENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUMsSUFBSSxFQUFFLEdBQUcsb0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEUsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNILENBQUM7SUFHRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBckNlLHFCQUFhLGdCQXFD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aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKCdkMy10aW1lJywgWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgZmFjdG9yeSgoZ2xvYmFsLmQzX3RpbWUgPSB7fSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHQwID0gbmV3IERhdGU7XG4gIHZhciB0MSA9IG5ldyBEYXRlO1xuICBmdW5jdGlvbiBuZXdJbnRlcnZhbChmbG9vcmksIG9mZnNldGksIGNvdW50LCBmaWVsZCkge1xuXG4gICAgZnVuY3Rpb24gaW50ZXJ2YWwoZGF0ZSkge1xuICAgICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoK2RhdGUpKSwgZGF0ZTtcbiAgICB9XG5cbiAgICBpbnRlcnZhbC5mbG9vciA9IGludGVydmFsO1xuXG4gICAgaW50ZXJ2YWwucm91bmQgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgZDAgPSBuZXcgRGF0ZSgrZGF0ZSksXG4gICAgICAgICAgZDEgPSBuZXcgRGF0ZShkYXRlIC0gMSk7XG4gICAgICBmbG9vcmkoZDApLCBmbG9vcmkoZDEpLCBvZmZzZXRpKGQxLCAxKTtcbiAgICAgIHJldHVybiBkYXRlIC0gZDAgPCBkMSAtIGRhdGUgPyBkMCA6IGQxO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5jZWlsID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoZGF0ZSAtIDEpKSwgb2Zmc2V0aShkYXRlLCAxKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwub2Zmc2V0ID0gZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgcmV0dXJuIG9mZnNldGkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSwgc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCkpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQgLSAxKTtcbiAgICAgIHN0b3AgPSBuZXcgRGF0ZSgrc3RvcCk7XG4gICAgICBzdGVwID0gc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICBpZiAoIShzdGFydCA8IHN0b3ApIHx8ICEoc3RlcCA+IDApKSByZXR1cm4gcmFuZ2U7IC8vIGFsc28gaGFuZGxlcyBJbnZhbGlkIERhdGVcbiAgICAgIG9mZnNldGkoc3RhcnQsIDEpLCBmbG9vcmkoc3RhcnQpO1xuICAgICAgaWYgKHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHdoaWxlIChvZmZzZXRpKHN0YXJ0LCBzdGVwKSwgZmxvb3JpKHN0YXJ0KSwgc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5maWx0ZXIgPSBmdW5jdGlvbih0ZXN0KSB7XG4gICAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB3aGlsZSAoZmxvb3JpKGRhdGUpLCAhdGVzdChkYXRlKSkgZGF0ZS5zZXRUaW1lKGRhdGUgLSAxKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgICAgd2hpbGUgKC0tc3RlcCA+PSAwKSB3aGlsZSAob2Zmc2V0aShkYXRlLCAxKSwgIXRlc3QoZGF0ZSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgaW50ZXJ2YWwuY291bnQgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgICAgZmxvb3JpKHQwKSwgZmxvb3JpKHQxKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY291bnQodDAsIHQxKSk7XG4gICAgICB9O1xuXG4gICAgICBpbnRlcnZhbC5ldmVyeSA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICAgIHJldHVybiAhaXNGaW5pdGUoc3RlcCkgfHwgIShzdGVwID4gMCkgPyBudWxsXG4gICAgICAgICAgICA6ICEoc3RlcCA+IDEpID8gaW50ZXJ2YWxcbiAgICAgICAgICAgIDogaW50ZXJ2YWwuZmlsdGVyKGZpZWxkXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbihkKSB7IHJldHVybiBmaWVsZChkKSAlIHN0ZXAgPT09IDA7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGludGVydmFsLmNvdW50KDAsIGQpICUgc3RlcCA9PT0gMDsgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnZhbDtcbiAgfTtcblxuICB2YXIgbWlsbGlzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAvLyBub29wXG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQgLSBzdGFydDtcbiAgfSk7XG5cbiAgLy8gQW4gb3B0aW1pemVkIGltcGxlbWVudGF0aW9uIGZvciB0aGlzIHNpbXBsZSBjYXNlLlxuICBtaWxsaXNlY29uZC5ldmVyeSA9IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gTWF0aC5mbG9vcihrKTtcbiAgICBpZiAoIWlzRmluaXRlKGspIHx8ICEoayA+IDApKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIShrID4gMSkpIHJldHVybiBtaWxsaXNlY29uZDtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRUaW1lKE1hdGguZmxvb3IoZGF0ZSAvIGspICogayk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gaztcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDFlMyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDFlMztcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFNlY29uZHMoMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNmU0O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9KTtcblxuICB2YXIgaG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9KTtcblxuICB2YXIgZGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHdlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xuICB2YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcbiAgdmFyIHR1ZXNkYXkgPSB3ZWVrZGF5KDIpO1xuICB2YXIgd2VkbmVzZGF5ID0gd2Vla2RheSgzKTtcbiAgdmFyIHRodXJzZGF5ID0gd2Vla2RheSg0KTtcbiAgdmFyIGZyaWRheSA9IHdlZWtkYXkoNSk7XG4gIHZhciBzYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbiAgdmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXREYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHllYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldE1vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgdXRjU2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWlsbGlzZWNvbmRzKDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDFlMyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDFlMztcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ1NlY29uZHMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y01pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNmU0O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTWludXRlcygpO1xuICB9KTtcblxuICB2YXIgdXRjSG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbnV0ZXMoMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENIb3VycygpO1xuICB9KTtcblxuICB2YXIgdXRjRGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENEYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB1dGNXZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIChkYXRlLmdldFVUQ0RheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHV0Y1N1bmRheSA9IHV0Y1dlZWtkYXkoMCk7XG4gIHZhciB1dGNNb25kYXkgPSB1dGNXZWVrZGF5KDEpO1xuICB2YXIgdXRjVHVlc2RheSA9IHV0Y1dlZWtkYXkoMik7XG4gIHZhciB1dGNXZWRuZXNkYXkgPSB1dGNXZWVrZGF5KDMpO1xuICB2YXIgdXRjVGh1cnNkYXkgPSB1dGNXZWVrZGF5KDQpO1xuICB2YXIgdXRjRnJpZGF5ID0gdXRjV2Vla2RheSg1KTtcbiAgdmFyIHV0Y1NhdHVyZGF5ID0gdXRjV2Vla2RheSg2KTtcblxuICB2YXIgdXRjTW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ0RhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ01vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENNb250aCgpIC0gc3RhcnQuZ2V0VVRDTW9udGgoKSArIChlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNb250aCgpO1xuICB9KTtcblxuICB2YXIgdXRjWWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciBtaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZC5yYW5nZTtcbiAgdmFyIHNlY29uZHMgPSBzZWNvbmQucmFuZ2U7XG4gIHZhciBtaW51dGVzID0gbWludXRlLnJhbmdlO1xuICB2YXIgaG91cnMgPSBob3VyLnJhbmdlO1xuICB2YXIgZGF5cyA9IGRheS5yYW5nZTtcbiAgdmFyIHN1bmRheXMgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb25kYXlzID0gbW9uZGF5LnJhbmdlO1xuICB2YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xuICB2YXIgd2VkbmVzZGF5cyA9IHdlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHRodXJzZGF5cyA9IHRodXJzZGF5LnJhbmdlO1xuICB2YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbiAgdmFyIHNhdHVyZGF5cyA9IHNhdHVyZGF5LnJhbmdlO1xuICB2YXIgd2Vla3MgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb250aHMgPSBtb250aC5yYW5nZTtcbiAgdmFyIHllYXJzID0geWVhci5yYW5nZTtcblxuICB2YXIgdXRjTWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgdmFyIHV0Y01pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgdmFyIHV0Y1NlY29uZHMgPSB1dGNTZWNvbmQucmFuZ2U7XG4gIHZhciB1dGNNaW51dGVzID0gdXRjTWludXRlLnJhbmdlO1xuICB2YXIgdXRjSG91cnMgPSB1dGNIb3VyLnJhbmdlO1xuICB2YXIgdXRjRGF5cyA9IHV0Y0RheS5yYW5nZTtcbiAgdmFyIHV0Y1N1bmRheXMgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb25kYXlzID0gdXRjTW9uZGF5LnJhbmdlO1xuICB2YXIgdXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5LnJhbmdlO1xuICB2YXIgdXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5LnJhbmdlO1xuICB2YXIgdXRjRnJpZGF5cyA9IHV0Y0ZyaWRheS5yYW5nZTtcbiAgdmFyIHV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5LnJhbmdlO1xuICB2YXIgdXRjV2Vla3MgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb250aHMgPSB1dGNNb250aC5yYW5nZTtcbiAgdmFyIHV0Y1llYXJzID0gdXRjWWVhci5yYW5nZTtcblxuICB2YXIgdmVyc2lvbiA9IFwiMC4xLjFcIjtcblxuICBleHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy5zZWNvbmRzID0gc2Vjb25kcztcbiAgZXhwb3J0cy5taW51dGVzID0gbWludXRlcztcbiAgZXhwb3J0cy5ob3VycyA9IGhvdXJzO1xuICBleHBvcnRzLmRheXMgPSBkYXlzO1xuICBleHBvcnRzLnN1bmRheXMgPSBzdW5kYXlzO1xuICBleHBvcnRzLm1vbmRheXMgPSBtb25kYXlzO1xuICBleHBvcnRzLnR1ZXNkYXlzID0gdHVlc2RheXM7XG4gIGV4cG9ydHMud2VkbmVzZGF5cyA9IHdlZG5lc2RheXM7XG4gIGV4cG9ydHMudGh1cnNkYXlzID0gdGh1cnNkYXlzO1xuICBleHBvcnRzLmZyaWRheXMgPSBmcmlkYXlzO1xuICBleHBvcnRzLnNhdHVyZGF5cyA9IHNhdHVyZGF5cztcbiAgZXhwb3J0cy53ZWVrcyA9IHdlZWtzO1xuICBleHBvcnRzLm1vbnRocyA9IG1vbnRocztcbiAgZXhwb3J0cy55ZWFycyA9IHllYXJzO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gdXRjTWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmRzID0gdXRjTWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnV0Y1NlY29uZHMgPSB1dGNTZWNvbmRzO1xuICBleHBvcnRzLnV0Y01pbnV0ZXMgPSB1dGNNaW51dGVzO1xuICBleHBvcnRzLnV0Y0hvdXJzID0gdXRjSG91cnM7XG4gIGV4cG9ydHMudXRjRGF5cyA9IHV0Y0RheXM7XG4gIGV4cG9ydHMudXRjU3VuZGF5cyA9IHV0Y1N1bmRheXM7XG4gIGV4cG9ydHMudXRjTW9uZGF5cyA9IHV0Y01vbmRheXM7XG4gIGV4cG9ydHMudXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5cztcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5cztcbiAgZXhwb3J0cy51dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheXM7XG4gIGV4cG9ydHMudXRjRnJpZGF5cyA9IHV0Y0ZyaWRheXM7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXlzO1xuICBleHBvcnRzLnV0Y1dlZWtzID0gdXRjV2Vla3M7XG4gIGV4cG9ydHMudXRjTW9udGhzID0gdXRjTW9udGhzO1xuICBleHBvcnRzLnV0Y1llYXJzID0gdXRjWWVhcnM7XG4gIGV4cG9ydHMubWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgZXhwb3J0cy5zZWNvbmQgPSBzZWNvbmQ7XG4gIGV4cG9ydHMubWludXRlID0gbWludXRlO1xuICBleHBvcnRzLmhvdXIgPSBob3VyO1xuICBleHBvcnRzLmRheSA9IGRheTtcbiAgZXhwb3J0cy5zdW5kYXkgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9uZGF5ID0gbW9uZGF5O1xuICBleHBvcnRzLnR1ZXNkYXkgPSB0dWVzZGF5O1xuICBleHBvcnRzLndlZG5lc2RheSA9IHdlZG5lc2RheTtcbiAgZXhwb3J0cy50aHVyc2RheSA9IHRodXJzZGF5O1xuICBleHBvcnRzLmZyaWRheSA9IGZyaWRheTtcbiAgZXhwb3J0cy5zYXR1cmRheSA9IHNhdHVyZGF5O1xuICBleHBvcnRzLndlZWsgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9udGggPSBtb250aDtcbiAgZXhwb3J0cy55ZWFyID0geWVhcjtcbiAgZXhwb3J0cy51dGNTZWNvbmQgPSB1dGNTZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWludXRlID0gdXRjTWludXRlO1xuICBleHBvcnRzLnV0Y0hvdXIgPSB1dGNIb3VyO1xuICBleHBvcnRzLnV0Y0RheSA9IHV0Y0RheTtcbiAgZXhwb3J0cy51dGNTdW5kYXkgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuICBleHBvcnRzLnV0Y1R1ZXNkYXkgPSB1dGNUdWVzZGF5O1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheSA9IHV0Y1dlZG5lc2RheTtcbiAgZXhwb3J0cy51dGNUaHVyc2RheSA9IHV0Y1RodXJzZGF5O1xuICBleHBvcnRzLnV0Y0ZyaWRheSA9IHV0Y0ZyaWRheTtcbiAgZXhwb3J0cy51dGNTYXR1cmRheSA9IHV0Y1NhdHVyZGF5O1xuICBleHBvcnRzLnV0Y1dlZWsgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9udGggPSB1dGNNb250aDtcbiAgZXhwb3J0cy51dGNZZWFyID0gdXRjWWVhcjtcbiAgZXhwb3J0cy5pbnRlcnZhbCA9IG5ld0ludGVydmFsO1xuXG59KSk7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgdGltZSA9IHJlcXVpcmUoJy4uL3RpbWUnKSxcbiAgICBFUFNJTE9OID0gMWUtMTU7XG5cbmZ1bmN0aW9uIGJpbnMob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZGV0ZXJtaW5lIHJhbmdlXG4gIHZhciBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMTUsXG4gICAgICBiYXNlID0gb3B0LmJhc2UgfHwgMTAsXG4gICAgICBsb2diID0gTWF0aC5sb2coYmFzZSksXG4gICAgICBkaXYgPSBvcHQuZGl2IHx8IFs1LCAyXSxcbiAgICAgIG1pbiA9IG9wdC5taW4sXG4gICAgICBtYXggPSBvcHQubWF4LFxuICAgICAgc3BhbiA9IG1heCAtIG1pbixcbiAgICAgIHN0ZXAsIGxldmVsLCBtaW5zdGVwLCBwcmVjaXNpb24sIHYsIGksIGVwcztcblxuICBpZiAob3B0LnN0ZXApIHtcbiAgICAvLyBpZiBzdGVwIHNpemUgaXMgZXhwbGljaXRseSBnaXZlbiwgdXNlIHRoYXRcbiAgICBzdGVwID0gb3B0LnN0ZXA7XG4gIH0gZWxzZSBpZiAob3B0LnN0ZXBzKSB7XG4gICAgLy8gaWYgcHJvdmlkZWQsIGxpbWl0IGNob2ljZSB0byBhY2NlcHRhYmxlIHN0ZXAgc2l6ZXNcbiAgICBzdGVwID0gb3B0LnN0ZXBzW01hdGgubWluKFxuICAgICAgb3B0LnN0ZXBzLmxlbmd0aCAtIDEsXG4gICAgICBiaXNlY3Qob3B0LnN0ZXBzLCBzcGFuL21heGIsIDAsIG9wdC5zdGVwcy5sZW5ndGgpXG4gICAgKV07XG4gIH0gZWxzZSB7XG4gICAgLy8gZWxzZSB1c2Ugc3BhbiB0byBkZXRlcm1pbmUgc3RlcCBzaXplXG4gICAgbGV2ZWwgPSBNYXRoLmNlaWwoTWF0aC5sb2cobWF4YikgLyBsb2diKTtcbiAgICBtaW5zdGVwID0gb3B0Lm1pbnN0ZXAgfHwgMDtcbiAgICBzdGVwID0gTWF0aC5tYXgoXG4gICAgICBtaW5zdGVwLFxuICAgICAgTWF0aC5wb3coYmFzZSwgTWF0aC5yb3VuZChNYXRoLmxvZyhzcGFuKSAvIGxvZ2IpIC0gbGV2ZWwpXG4gICAgKTtcblxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4YikgeyBzdGVwICo9IGJhc2U7IH1cblxuICAgIC8vIGRlY3JlYXNlIHN0ZXAgc2l6ZSBpZiBhbGxvd2VkXG4gICAgZm9yIChpPTA7IGk8ZGl2Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gc3RlcCAvIGRpdltpXTtcbiAgICAgIGlmICh2ID49IG1pbnN0ZXAgJiYgc3BhbiAvIHYgPD0gbWF4Yikgc3RlcCA9IHY7XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHByZWNpc2lvbiwgbWluIGFuZCBtYXhcbiAgdiA9IE1hdGgubG9nKHN0ZXApO1xuICBwcmVjaXNpb24gPSB2ID49IDAgPyAwIDogfn4oLXYgLyBsb2diKSArIDE7XG4gIGVwcyA9IE1hdGgucG93KGJhc2UsIC1wcmVjaXNpb24gLSAxKTtcbiAgbWluID0gTWF0aC5taW4obWluLCBNYXRoLmZsb29yKG1pbiAvIHN0ZXAgKyBlcHMpICogc3RlcCk7XG4gIG1heCA9IE1hdGguY2VpbChtYXggLyBzdGVwKSAqIHN0ZXA7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogbWluLFxuICAgIHN0b3A6ICBtYXgsXG4gICAgc3RlcDogIHN0ZXAsXG4gICAgdW5pdDogIHtwcmVjaXNpb246IHByZWNpc2lvbn0sXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufVxuXG5mdW5jdGlvbiBiaXNlY3QoYSwgeCwgbG8sIGhpKSB7XG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgaWYgKHV0aWwuY21wKGFbbWlkXSwgeCkgPCAwKSB7IGxvID0gbWlkICsgMTsgfVxuICAgIGVsc2UgeyBoaSA9IG1pZDsgfVxuICB9XG4gIHJldHVybiBsbztcbn1cblxuZnVuY3Rpb24gdmFsdWUodikge1xuICByZXR1cm4gdGhpcy5zdGVwICogTWF0aC5mbG9vcih2IC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGluZGV4KHYpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKHYgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBkYXRlX3ZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMudW5pdC5kYXRlKHZhbHVlLmNhbGwodGhpcywgdikpO1xufVxuXG5mdW5jdGlvbiBkYXRlX2luZGV4KHYpIHtcbiAgcmV0dXJuIGluZGV4LmNhbGwodGhpcywgdGhpcy51bml0LnVuaXQodikpO1xufVxuXG5iaW5zLmRhdGUgPSBmdW5jdGlvbihvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGRhdGUgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGZpbmQgdGltZSBzdGVwLCB0aGVuIGJpblxuICB2YXIgdW5pdHMgPSBvcHQudXRjID8gdGltZS51dGMgOiB0aW1lLFxuICAgICAgZG1pbiA9IG9wdC5taW4sXG4gICAgICBkbWF4ID0gb3B0Lm1heCxcbiAgICAgIG1heGIgPSBvcHQubWF4YmlucyB8fCAyMCxcbiAgICAgIG1pbmIgPSBvcHQubWluYmlucyB8fCA0LFxuICAgICAgc3BhbiA9ICgrZG1heCkgLSAoK2RtaW4pLFxuICAgICAgdW5pdCA9IG9wdC51bml0ID8gdW5pdHNbb3B0LnVuaXRdIDogdW5pdHMuZmluZChzcGFuLCBtaW5iLCBtYXhiKSxcbiAgICAgIHNwZWMgPSBiaW5zKHtcbiAgICAgICAgbWluOiAgICAgdW5pdC5taW4gIT0gbnVsbCA/IHVuaXQubWluIDogdW5pdC51bml0KGRtaW4pLFxuICAgICAgICBtYXg6ICAgICB1bml0Lm1heCAhPSBudWxsID8gdW5pdC5tYXggOiB1bml0LnVuaXQoZG1heCksXG4gICAgICAgIG1heGJpbnM6IG1heGIsXG4gICAgICAgIG1pbnN0ZXA6IHVuaXQubWluc3RlcCxcbiAgICAgICAgc3RlcHM6ICAgdW5pdC5zdGVwXG4gICAgICB9KTtcblxuICBzcGVjLnVuaXQgPSB1bml0O1xuICBzcGVjLmluZGV4ID0gZGF0ZV9pbmRleDtcbiAgaWYgKCFvcHQucmF3KSBzcGVjLnZhbHVlID0gZGF0ZV92YWx1ZTtcbiAgcmV0dXJuIHNwZWM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbnM7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIGdlbiA9IG1vZHVsZS5leHBvcnRzO1xuXG5nZW4ucmVwZWF0ID0gZnVuY3Rpb24odmFsLCBuKSB7XG4gIHZhciBhID0gQXJyYXkobiksIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgYVtpXSA9IHZhbDtcbiAgcmV0dXJuIGE7XG59O1xuXG5nZW4uemVyb3MgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiBnZW4ucmVwZWF0KDAsIG4pO1xufTtcblxuZ2VuLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgc3RlcCA9IDE7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICB9XG4gIGlmICgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXAgPT0gSW5maW5pdHkpIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgcmFuZ2UnKTtcbiAgdmFyIHJhbmdlID0gW10sIGkgPSAtMSwgajtcbiAgaWYgKHN0ZXAgPCAwKSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpID4gc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgZWxzZSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpIDwgc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuZ2VuLnJhbmRvbSA9IHt9O1xuXG5nZW4ucmFuZG9tLnVuaWZvcm0gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICBtYXggPSBtaW4gPT09IHVuZGVmaW5lZCA/IDEgOiBtaW47XG4gICAgbWluID0gMDtcbiAgfVxuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWluICsgZCAqIE1hdGgucmFuZG9tKCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID49IG1pbiAmJiB4IDw9IG1heCkgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCA8IG1pbiA/IDAgOiB4ID4gbWF4ID8gMSA6ICh4IC0gbWluKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gbWluICsgcCpkIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIGIgPSBhO1xuICAgIGEgPSAwO1xuICB9XG4gIHZhciBkID0gYiAtIGE7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKGQgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPT09IE1hdGguZmxvb3IoeCkgJiYgeCA+PSBhICYmIHggPCBiKSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciB2ID0gTWF0aC5mbG9vcih4KTtcbiAgICByZXR1cm4gdiA8IGEgPyAwIDogdiA+PSBiID8gMSA6ICh2IC0gYSArIDEpIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBhIC0gMSArIE1hdGguZmxvb3IocCpkKSA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLm5vcm1hbCA9IGZ1bmN0aW9uKG1lYW4sIHN0ZGV2KSB7XG4gIG1lYW4gPSBtZWFuIHx8IDA7XG4gIHN0ZGV2ID0gc3RkZXYgfHwgMTtcbiAgdmFyIG5leHQ7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSAwLCB5ID0gMCwgcmRzLCBjO1xuICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSBuZXh0O1xuICAgICAgbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICByZHMgPSB4KnggKyB5Knk7XG4gICAgfSB3aGlsZSAocmRzID09PSAwIHx8IHJkcyA+IDEpO1xuICAgIGMgPSBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocmRzKS9yZHMpOyAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybVxuICAgIG5leHQgPSBtZWFuICsgeSpjKnN0ZGV2O1xuICAgIHJldHVybiBtZWFuICsgeCpjKnN0ZGV2O1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciBleHAgPSBNYXRoLmV4cChNYXRoLnBvdyh4LW1lYW4sIDIpIC8gKC0yICogTWF0aC5wb3coc3RkZXYsIDIpKSk7XG4gICAgcmV0dXJuICgxIC8gKHN0ZGV2ICogTWF0aC5zcXJ0KDIqTWF0aC5QSSkpKSAqIGV4cDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBmcm9tIFdlc3QgKDIwMDkpXG4gICAgLy8gQmV0dGVyIEFwcHJveGltYXRpb25zIHRvIEN1bXVsYXRpdmUgTm9ybWFsIEZ1bmN0aW9uc1xuICAgIHZhciBjZCxcbiAgICAgICAgeiA9ICh4IC0gbWVhbikgLyBzdGRldixcbiAgICAgICAgWiA9IE1hdGguYWJzKHopO1xuICAgIGlmIChaID4gMzcpIHtcbiAgICAgIGNkID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1bSwgZXhwID0gTWF0aC5leHAoLVoqWi8yKTtcbiAgICAgIGlmIChaIDwgNy4wNzEwNjc4MTE4NjU0Nykge1xuICAgICAgICBzdW0gPSAzLjUyNjI0OTY1OTk4OTExZS0wMiAqIFogKyAwLjcwMDM4MzA2NDQ0MzY4ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYuMzczOTYyMjAzNTMxNjU7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAzMy45MTI4NjYwNzgzODM7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxMTIuMDc5MjkxNDk3ODcxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIxLjIxMzU5NjE2OTkzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMC4yMDY4Njc5MTIzNzY7XG4gICAgICAgIGNkID0gZXhwICogc3VtO1xuICAgICAgICBzdW0gPSA4LjgzODgzNDc2NDgzMTg0ZS0wMiAqIFogKyAxLjc1NTY2NzE2MzE4MjY0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTYuMDY0MTc3NTc5MjA3O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgODYuNzgwNzMyMjAyOTQ2MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDI5Ni41NjQyNDg3Nzk2NzQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2MzcuMzMzNjMzMzc4ODMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNzkzLjgyNjUxMjUxOTk0ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDQ0MC40MTM3MzU4MjQ3NTI7XG4gICAgICAgIGNkID0gY2QgLyBzdW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdW0gPSBaICsgMC42NTtcbiAgICAgICAgc3VtID0gWiArIDQgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAzIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMiAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDEgLyBzdW07XG4gICAgICAgIGNkID0gZXhwIC8gc3VtIC8gMi41MDY2MjgyNzQ2MzE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6ID4gMCA/IDEgLSBjZCA6IGNkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBvZiBQcm9iaXQgZnVuY3Rpb24gdXNpbmcgaW52ZXJzZSBlcnJvciBmdW5jdGlvbi5cbiAgICBpZiAocCA8PSAwIHx8IHAgPj0gMSkgcmV0dXJuIE5hTjtcbiAgICB2YXIgeCA9IDIqcCAtIDEsXG4gICAgICAgIHYgPSAoOCAqIChNYXRoLlBJIC0gMykpIC8gKDMgKiBNYXRoLlBJICogKDQtTWF0aC5QSSkpLFxuICAgICAgICBhID0gKDIgLyAoTWF0aC5QSSp2KSkgKyAoTWF0aC5sb2coMSAtIE1hdGgucG93KHgsMikpIC8gMiksXG4gICAgICAgIGIgPSBNYXRoLmxvZygxIC0gKHgqeCkpIC8gdixcbiAgICAgICAgcyA9ICh4ID4gMCA/IDEgOiAtMSkgKiBNYXRoLnNxcnQoTWF0aC5zcXJ0KChhKmEpIC0gYikgLSBhKTtcbiAgICByZXR1cm4gbWVhbiArIHN0ZGV2ICogTWF0aC5TUVJUMiAqIHM7XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ib290c3RyYXAgPSBmdW5jdGlvbihkb21haW4sIHNtb290aCkge1xuICAvLyBHZW5lcmF0ZXMgYSBib290c3RyYXAgc2FtcGxlIGZyb20gYSBzZXQgb2Ygb2JzZXJ2YXRpb25zLlxuICAvLyBTbW9vdGggYm9vdHN0cmFwcGluZyBhZGRzIHJhbmRvbSB6ZXJvLWNlbnRlcmVkIG5vaXNlIHRvIHRoZSBzYW1wbGVzLlxuICB2YXIgdmFsID0gZG9tYWluLmZpbHRlcih1dGlsLmlzVmFsaWQpLFxuICAgICAgbGVuID0gdmFsLmxlbmd0aCxcbiAgICAgIGVyciA9IHNtb290aCA/IGdlbi5yYW5kb20ubm9ybWFsKDAsIHNtb290aCkgOiBudWxsO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWxbfn4oTWF0aC5yYW5kb20oKSpsZW4pXSArIChlcnIgPyBlcnIoKSA6IDApO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIHJldHVybiBmO1xufTsiLCJ2YXIgZDNfdGltZSA9IHJlcXVpcmUoJ2QzLXRpbWUnKTtcblxudmFyIHRlbXBEYXRlID0gbmV3IERhdGUoKSxcbiAgICBiYXNlRGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDEpLnNldEZ1bGxZZWFyKDApLCAvLyBKYW4gMSwgMCBBRFxuICAgIHV0Y0Jhc2VEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMCwgMCwgMSkpLnNldFVUQ0Z1bGxZZWFyKDApO1xuXG5mdW5jdGlvbiBkYXRlKGQpIHtcbiAgcmV0dXJuICh0ZW1wRGF0ZS5zZXRUaW1lKCtkKSwgdGVtcERhdGUpO1xufVxuXG4vLyBjcmVhdGUgYSB0aW1lIHVuaXQgZW50cnlcbmZ1bmN0aW9uIGVudHJ5KHR5cGUsIGRhdGUsIHVuaXQsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHZhciBlID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0ZTogZGF0ZSxcbiAgICB1bml0OiB1bml0XG4gIH07XG4gIGlmIChzdGVwKSB7XG4gICAgZS5zdGVwID0gc3RlcDtcbiAgfSBlbHNlIHtcbiAgICBlLm1pbnN0ZXAgPSAxO1xuICB9XG4gIGlmIChtaW4gIT0gbnVsbCkgZS5taW4gPSBtaW47XG4gIGlmIChtYXggIT0gbnVsbCkgZS5tYXggPSBtYXg7XG4gIHJldHVybiBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUodHlwZSwgdW5pdCwgYmFzZSwgc3RlcCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIGVudHJ5KHR5cGUsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5vZmZzZXQoYmFzZSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5jb3VudChiYXNlLCBkKTsgfSxcbiAgICBzdGVwLCBtaW4sIG1heCk7XG59XG5cbnZhciBsb2NhbGUgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS5zZWNvbmQsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLm1pbnV0ZSwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUuaG91ciwgICBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS5kYXksICAgIGJhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUubW9udGgsICBiYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnllYXIsICAgYmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFNlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldEhvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCA0K2QpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCBkICUgMTIsIDEpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciB1dGMgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS51dGNTZWNvbmQsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLnV0Y01pbnV0ZSwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUudXRjSG91ciwgICB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS51dGNEYXksICAgIHV0Y0Jhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUudXRjTW9udGgsICB1dGNCYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnV0Y1llYXIsICAgdXRjQmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0hvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCA0K2QpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIGQgJSAxMiwgMSkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciBTVEVQUyA9IFtcbiAgWzMxNTM2ZTYsIDVdLCAgLy8gMS15ZWFyXG4gIFs3Nzc2ZTYsIDRdLCAgIC8vIDMtbW9udGhcbiAgWzI1OTJlNiwgNF0sICAgLy8gMS1tb250aFxuICBbMTIwOTZlNSwgM10sICAvLyAyLXdlZWtcbiAgWzYwNDhlNSwgM10sICAgLy8gMS13ZWVrXG4gIFsxNzI4ZTUsIDNdLCAgIC8vIDItZGF5XG4gIFs4NjRlNSwgM10sICAgIC8vIDEtZGF5XG4gIFs0MzJlNSwgMl0sICAgIC8vIDEyLWhvdXJcbiAgWzIxNmU1LCAyXSwgICAgLy8gNi1ob3VyXG4gIFsxMDhlNSwgMl0sICAgIC8vIDMtaG91clxuICBbMzZlNSwgMl0sICAgICAvLyAxLWhvdXJcbiAgWzE4ZTUsIDFdLCAgICAgLy8gMzAtbWludXRlXG4gIFs5ZTUsIDFdLCAgICAgIC8vIDE1LW1pbnV0ZVxuICBbM2U1LCAxXSwgICAgICAvLyA1LW1pbnV0ZVxuICBbNmU0LCAxXSwgICAgICAvLyAxLW1pbnV0ZVxuICBbM2U0LCAwXSwgICAgICAvLyAzMC1zZWNvbmRcbiAgWzE1ZTMsIDBdLCAgICAgLy8gMTUtc2Vjb25kXG4gIFs1ZTMsIDBdLCAgICAgIC8vIDUtc2Vjb25kXG4gIFsxZTMsIDBdICAgICAgIC8vIDEtc2Vjb25kXG5dO1xuXG5mdW5jdGlvbiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKSB7XG4gIHZhciBzdGVwID0gU1RFUFNbMF0sIGksIG4sIGJpbnM7XG5cbiAgZm9yIChpPTEsIG49U1RFUFMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHN0ZXAgPSBTVEVQU1tpXTtcbiAgICBpZiAoc3BhbiA+IHN0ZXBbMF0pIHtcbiAgICAgIGJpbnMgPSBzcGFuIC8gc3RlcFswXTtcbiAgICAgIGlmIChiaW5zID4gbWF4Yikge1xuICAgICAgICByZXR1cm4gdW5pdHNbU1RFUFNbaS0xXVsxXV07XG4gICAgICB9XG4gICAgICBpZiAoYmlucyA+PSBtaW5iKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tzdGVwWzFdXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuaXRzW1NURVBTW24tMV1bMV1dO1xufVxuXG5mdW5jdGlvbiB0b1VuaXRNYXAodW5pdHMpIHtcbiAgdmFyIG1hcCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj11bml0cy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgbWFwW3VuaXRzW2ldLnR5cGVdID0gdW5pdHNbaV07XG4gIH1cbiAgbWFwLmZpbmQgPSBmdW5jdGlvbihzcGFuLCBtaW5iLCBtYXhiKSB7XG4gICAgcmV0dXJuIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpO1xuICB9O1xuICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvVW5pdE1hcChsb2NhbGUpO1xubW9kdWxlLmV4cG9ydHMudXRjID0gdG9Vbml0TWFwKHV0Yyk7IiwidmFyIHUgPSBtb2R1bGUuZXhwb3J0cztcblxuLy8gdXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIEZOQU1FID0gJ19fbmFtZV9fJztcblxudS5uYW1lZGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBmKSB7IHJldHVybiAoZltGTkFNRV0gPSBuYW1lLCBmKTsgfTtcblxudS5uYW1lID0gZnVuY3Rpb24oZikgeyByZXR1cm4gZj09bnVsbCA/IG51bGwgOiBmW0ZOQU1FXTsgfTtcblxudS5pZGVudGl0eSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg7IH07XG5cbnUudHJ1ZSA9IHUubmFtZWRmdW5jKCd0cnVlJywgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9KTtcblxudS5mYWxzZSA9IHUubmFtZWRmdW5jKCdmYWxzZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuXG51LmR1cGxpY2F0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG5cbnUuZXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYik7XG59O1xuXG51LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKHZhciB4LCBuYW1lLCBpPTEsIGxlbj1hcmd1bWVudHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgeCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKG5hbWUgaW4geCkgeyBvYmpbbmFtZV0gPSB4W25hbWVdOyB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbnUubGVuZ3RoID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHgubGVuZ3RoICE9IG51bGwgPyB4Lmxlbmd0aCA6IG51bGw7XG59O1xuXG51LmtleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXlzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSBrZXlzLnB1c2goayk7XG4gIHJldHVybiBrZXlzO1xufTtcblxudS52YWxzID0gZnVuY3Rpb24oeCkge1xuICB2YXIgdmFscyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkgdmFscy5wdXNoKHhba10pO1xuICByZXR1cm4gdmFscztcbn07XG5cbnUudG9NYXAgPSBmdW5jdGlvbihsaXN0LCBmKSB7XG4gIHJldHVybiAoZiA9IHUuJChmKSkgP1xuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialtmKHgpXSA9IDEsIG9iaik7IH0sIHt9KSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW3hdID0gMSwgb2JqKTsgfSwge30pO1xufTtcblxudS5rZXlzdHIgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgLy8gdXNlIHRvIGVuc3VyZSBjb25zaXN0ZW50IGtleSBnZW5lcmF0aW9uIGFjcm9zcyBtb2R1bGVzXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgaWYgKCFuKSByZXR1cm4gJyc7XG4gIGZvciAodmFyIHM9U3RyaW5nKHZhbHVlc1swXSksIGk9MTsgaTxuOyArK2kpIHtcbiAgICBzICs9ICd8JyArIFN0cmluZyh2YWx1ZXNbaV0pO1xuICB9XG4gIHJldHVybiBzO1xufTtcblxuLy8gdHlwZSBjaGVja2luZyBmdW5jdGlvbnNcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudS5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbnUuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudS5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnUuaXNOdW1iZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59O1xuXG51LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn07XG5cbnUuaXNEYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnUuaXNWYWxpZCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmo7XG59O1xuXG51LmlzQnVmZmVyID0gKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgQnVmZmVyLmlzQnVmZmVyKSB8fCB1LmZhbHNlO1xuXG4vLyB0eXBlIGNvZXJjaW9uIGZ1bmN0aW9uc1xuXG51Lm51bWJlciA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiArcztcbn07XG5cbnUuYm9vbGVhbiA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBzPT09J2ZhbHNlJyA/IGZhbHNlIDogISFzO1xufTtcblxuLy8gcGFyc2UgYSBkYXRlIHdpdGggb3B0aW9uYWwgZDMudGltZS1mb3JtYXQgZm9ybWF0XG51LmRhdGUgPSBmdW5jdGlvbihzLCBmb3JtYXQpIHtcbiAgdmFyIGQgPSBmb3JtYXQgPyBmb3JtYXQgOiBEYXRlO1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IGQucGFyc2Uocyk7XG59O1xuXG51LmFycmF5ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsID8gKHUuaXNBcnJheSh4KSA/IHggOiBbeF0pIDogW107XG59O1xuXG51LnN0ciA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHUuaXNBcnJheSh4KSA/ICdbJyArIHgubWFwKHUuc3RyKSArICddJ1xuICAgIDogdS5pc09iamVjdCh4KSB8fCB1LmlzU3RyaW5nKHgpID9cbiAgICAgIC8vIE91dHB1dCB2YWxpZCBKU09OIGFuZCBKUyBzb3VyY2Ugc3RyaW5ncy5cbiAgICAgIC8vIFNlZSBodHRwOi8vdGltZWxlc3NyZXBvLmNvbS9qc29uLWlzbnQtYS1qYXZhc2NyaXB0LXN1YnNldFxuICAgICAgSlNPTi5zdHJpbmdpZnkoeCkucmVwbGFjZSgnXFx1MjAyOCcsJ1xcXFx1MjAyOCcpLnJlcGxhY2UoJ1xcdTIwMjknLCAnXFxcXHUyMDI5JylcbiAgICA6IHg7XG59O1xuXG4vLyBkYXRhIGFjY2VzcyBmdW5jdGlvbnNcblxudmFyIGZpZWxkX3JlID0gL1xcWyguKj8pXFxdfFteLlxcW10rL2c7XG5cbnUuZmllbGQgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiBTdHJpbmcoZikubWF0Y2goZmllbGRfcmUpLm1hcChmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGRbMF0gIT09ICdbJyA/IGQgOlxuICAgICAgZFsxXSAhPT0gXCInXCIgJiYgZFsxXSAhPT0gJ1wiJyA/IGQuc2xpY2UoMSwgLTEpIDpcbiAgICAgIGQuc2xpY2UoMiwgLTIpLnJlcGxhY2UoL1xcXFwoW1wiJ10pL2csICckMScpO1xuICB9KTtcbn07XG5cbnUuYWNjZXNzb3IgPSBmdW5jdGlvbihmKSB7XG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIEZ1bmN0aW9uKCd4JywgJ3JldHVybiB4WycgKyB1LmZpZWxkKGYpLm1hcCh1LnN0cikuam9pbignXVsnKSArICddOycpKTtcbn07XG5cbi8vIHNob3J0LWN1dCBmb3IgYWNjZXNzb3JcbnUuJCA9IHUuYWNjZXNzb3I7XG5cbnUubXV0YXRvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiB1LmlzU3RyaW5nKGYpICYmIChzPXUuZmllbGQoZikpLmxlbmd0aCA+IDEgP1xuICAgIGZ1bmN0aW9uKHgsIHYpIHtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzLmxlbmd0aC0xOyArK2kpIHggPSB4W3NbaV1dO1xuICAgICAgeFtzW2ldXSA9IHY7XG4gICAgfSA6XG4gICAgZnVuY3Rpb24oeCwgdikgeyB4W2ZdID0gdjsgfTtcbn07XG5cblxudS4kZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIG9wKSB7XG4gIHJldHVybiBmdW5jdGlvbihmKSB7XG4gICAgZiA9IHUuJChmKSB8fCB1LmlkZW50aXR5O1xuICAgIHZhciBuID0gbmFtZSArICh1Lm5hbWUoZikgPyAnXycrdS5uYW1lKGYpIDogJycpO1xuICAgIHJldHVybiB1Lm5hbWVkZnVuYyhuLCBmdW5jdGlvbihkKSB7IHJldHVybiBvcChmKGQpKTsgfSk7XG4gIH07XG59O1xuXG51LiR2YWxpZCAgPSB1LiRmdW5jKCd2YWxpZCcsIHUuaXNWYWxpZCk7XG51LiRsZW5ndGggPSB1LiRmdW5jKCdsZW5ndGgnLCB1Lmxlbmd0aCk7XG5cbnUuJGluID0gZnVuY3Rpb24oZiwgdmFsdWVzKSB7XG4gIGYgPSB1LiQoZik7XG4gIHZhciBtYXAgPSB1LmlzQXJyYXkodmFsdWVzKSA/IHUudG9NYXAodmFsdWVzKSA6IHZhbHVlcztcbiAgcmV0dXJuIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICEhbWFwW2YoZCldOyB9O1xufTtcblxuLy8gY29tcGFyaXNvbiAvIHNvcnRpbmcgZnVuY3Rpb25zXG5cbnUuY29tcGFyYXRvciA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgdmFyIHNpZ24gPSBbXTtcbiAgaWYgKHNvcnQgPT09IHVuZGVmaW5lZCkgc29ydCA9IFtdO1xuICBzb3J0ID0gdS5hcnJheShzb3J0KS5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBzID0gMTtcbiAgICBpZiAgICAgIChmWzBdID09PSAnLScpIHsgcyA9IC0xOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIGVsc2UgaWYgKGZbMF0gPT09ICcrJykgeyBzID0gKzE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgc2lnbi5wdXNoKHMpO1xuICAgIHJldHVybiB1LmFjY2Vzc29yKGYpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBpLCBuLCBmLCB4LCB5O1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07IHggPSBmKGEpOyB5ID0gZihiKTtcbiAgICAgIGlmICh4IDwgeSkgcmV0dXJuIC0xICogc2lnbltpXTtcbiAgICAgIGlmICh4ID4geSkgcmV0dXJuIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGEgPj0gYikge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiBOYU47XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxudS5wYWQgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgcGFkY2hhcikge1xuICBwYWRjaGFyID0gcGFkY2hhciB8fCBcIiBcIjtcbiAgdmFyIGQgPSBsZW5ndGggLSBzLmxlbmd0aDtcbiAgaWYgKGQgPD0gMCkgcmV0dXJuIHM7XG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gc3RycmVwKGQsIHBhZGNoYXIpICsgcztcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gc3RycmVwKE1hdGguZmxvb3IoZC8yKSwgcGFkY2hhcikgK1xuICAgICAgICAgcyArIHN0cnJlcChNYXRoLmNlaWwoZC8yKSwgcGFkY2hhcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzICsgc3RycmVwKGQsIHBhZGNoYXIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJyZXAobiwgc3RyKSB7XG4gIHZhciBzID0gXCJcIiwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBzICs9IHN0cjtcbiAgcmV0dXJuIHM7XG59XG5cbnUudHJ1bmNhdGUgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgd29yZCwgZWxsaXBzaXMpIHtcbiAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICBpZiAobGVuIDw9IGxlbmd0aCkgcmV0dXJuIHM7XG4gIGVsbGlwc2lzID0gZWxsaXBzaXMgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhlbGxpcHNpcykgOiAnXFx1MjAyNic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIiwidmFyIGpzb24gPSB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OIDogcmVxdWlyZSgnanNvbmlmeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIG9wdHMgPSB7IGNtcDogb3B0cyB9O1xuICAgIHZhciBzcGFjZSA9IG9wdHMuc3BhY2UgfHwgJyc7XG4gICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHNwYWNlID0gQXJyYXkoc3BhY2UrMSkuam9pbignICcpO1xuICAgIHZhciBjeWNsZXMgPSAodHlwZW9mIG9wdHMuY3ljbGVzID09PSAnYm9vbGVhbicpID8gb3B0cy5jeWNsZXMgOiBmYWxzZTtcbiAgICB2YXIgcmVwbGFjZXIgPSBvcHRzLnJlcGxhY2VyIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gICAgdmFyIGNtcCA9IG9wdHMuY21wICYmIChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhb2JqID0geyBrZXk6IGEsIHZhbHVlOiBub2RlW2FdIH07XG4gICAgICAgICAgICAgICAgdmFyIGJvYmogPSB7IGtleTogYiwgdmFsdWU6IG5vZGVbYl0gfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhb2JqLCBib2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSkob3B0cy5jbXApO1xuXG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN0cmluZ2lmeSAocGFyZW50LCBrZXksIG5vZGUsIGxldmVsKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzcGFjZSA/ICgnXFxuJyArIG5ldyBBcnJheShsZXZlbCArIDEpLmpvaW4oc3BhY2UpKSA6ICcnO1xuICAgICAgICB2YXIgY29sb25TZXBhcmF0b3IgPSBzcGFjZSA/ICc6ICcgOiAnOic7XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS50b0pTT04gJiYgdHlwZW9mIG5vZGUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS50b0pTT04oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSByZXBsYWNlci5jYWxsKHBhcmVudCwga2V5LCBub2RlKTtcblxuICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fCBub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbi5zdHJpbmdpZnkobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc3RyaW5naWZ5KG5vZGUsIGksIG5vZGVbaV0sIGxldmVsKzEpIHx8IGpzb24uc3RyaW5naWZ5KG51bGwpO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICddJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWVuLmluZGV4T2Yobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN5Y2xlcykgcmV0dXJuIGpzb24uc3RyaW5naWZ5KCdfX2N5Y2xlX18nKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHNlZW4ucHVzaChub2RlKTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKG5vZGUpLnNvcnQoY21wICYmIGNtcChub2RlKSk7XG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHJpbmdpZnkobm9kZSwga2V5LCBub2RlW2tleV0sIGxldmVsKzEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGpzb24uc3RyaW5naWZ5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgKyBjb2xvblNlcGFyYXRvclxuICAgICAgICAgICAgICAgICAgICArIHZhbHVlO1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChpbmRlbnQgKyBzcGFjZSArIGtleVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW4uc3BsaWNlKHNlZW4uaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gJ3snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICd9JztcbiAgICAgICAgfVxuICAgIH0pKHsgJyc6IG9iaiB9LCAnJywgb2JqLCAwKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZSB9O1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuIiwiZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5leHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuIiwidmFyIGF0LCAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgY2gsIC8vIFRoZSBjdXJyZW50IGNoYXJhY3RlclxuICAgIGVzY2FwZWUgPSB7XG4gICAgICAgICdcIic6ICAnXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAgICAgJy8nOiAgJy8nLFxuICAgICAgICBiOiAgICAnXFxiJyxcbiAgICAgICAgZjogICAgJ1xcZicsXG4gICAgICAgIG46ICAgICdcXG4nLFxuICAgICAgICByOiAgICAnXFxyJyxcbiAgICAgICAgdDogICAgJ1xcdCdcbiAgICB9LFxuICAgIHRleHQsXG5cbiAgICBlcnJvciA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIC8vIENhbGwgZXJyb3Igd2hlbiBzb21ldGhpbmcgaXMgd3JvbmcuXG4gICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIG5hbWU6ICAgICdTeW50YXhFcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICAgICAgYXQ6ICAgICAgYXQsXG4gICAgICAgICAgICB0ZXh0OiAgICB0ZXh0XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBuZXh0ID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgLy8gSWYgYSBjIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgdmVyaWZ5IHRoYXQgaXQgbWF0Y2hlcyB0aGUgY3VycmVudCBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChjICYmIGMgIT09IGNoKSB7XG4gICAgICAgICAgICBlcnJvcihcIkV4cGVjdGVkICdcIiArIGMgKyBcIicgaW5zdGVhZCBvZiAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IGNoYXJhY3Rlci4gV2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzLFxuICAgICAgICAvLyByZXR1cm4gdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgICAgXG4gICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xuICAgICAgICBhdCArPSAxO1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfSxcbiAgICBcbiAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxuICAgICAgICB2YXIgbnVtYmVyLFxuICAgICAgICAgICAgc3RyaW5nID0gJyc7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2ggPT09ICctJykge1xuICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xuICAgICAgICAgICAgbmV4dCgnLScpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnLic7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnVtYmVyID0gK3N0cmluZztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgc3RyaW5nIHZhbHVlLlxuICAgICAgICB2YXIgaGV4LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdWZmZmY7XG4gICAgICAgIFxuICAgICAgICAvLyBXaGVuIHBhcnNpbmcgZm9yIHN0cmluZyB2YWx1ZXMsIHdlIG11c3QgbG9vayBmb3IgXCIgYW5kIFxcIGNoYXJhY3RlcnMuXG4gICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAndScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXggPSBwYXJzZUludChuZXh0KCksIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGhleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gdWZmZmYgKiAxNiArIGhleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHVmZmZmKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXNjYXBlZVtjaF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xuICAgIH0sXG5cbiAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICAgIHdoaWxlIChjaCAmJiBjaCA8PSAnICcpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3b3JkID0gZnVuY3Rpb24gKCkge1xuXG4vLyB0cnVlLCBmYWxzZSwgb3IgbnVsbC5cblxuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgbmV4dCgndCcpO1xuICAgICAgICAgICAgbmV4dCgncicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgbmV4dCgnZicpO1xuICAgICAgICAgICAgbmV4dCgnYScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgncycpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIG5leHQoJ24nKTtcbiAgICAgICAgICAgIG5leHQoJ3UnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICB9LFxuXG4gICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cblxuICAgIGFycmF5ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBhcnJheSB2YWx1ZS5cblxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgICAgICAgbmV4dCgnWycpO1xuICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTsgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh2YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcbiAgICB9LFxuXG4gICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICBuZXh0KCd7Jyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDsgICAvLyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgIGtleSA9IHN0cmluZygpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgbmV4dCgnOicpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ0R1cGxpY2F0ZSBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICAgIH07XG5cbnZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIEpTT04gdmFsdWUuIEl0IGNvdWxkIGJlIGFuIG9iamVjdCwgYW4gYXJyYXksIGEgc3RyaW5nLCBhIG51bWJlcixcbi8vIG9yIGEgd29yZC5cblxuICAgIHdoaXRlKCk7XG4gICAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgJ3snOlxuICAgICAgICByZXR1cm4gb2JqZWN0KCk7XG4gICAgY2FzZSAnWyc6XG4gICAgICAgIHJldHVybiBhcnJheSgpO1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgcmV0dXJuIHN0cmluZygpO1xuICAgIGNhc2UgJy0nOlxuICAgICAgICByZXR1cm4gbnVtYmVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNoID49ICcwJyAmJiBjaCA8PSAnOScgPyBudW1iZXIoKSA6IHdvcmQoKTtcbiAgICB9XG59O1xuXG4vLyBSZXR1cm4gdGhlIGpzb25fcGFyc2UgZnVuY3Rpb24uIEl0IHdpbGwgaGF2ZSBhY2Nlc3MgdG8gYWxsIG9mIHRoZSBhYm92ZVxuLy8gZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgcmV2aXZlcikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgXG4gICAgdGV4dCA9IHNvdXJjZTtcbiAgICBhdCA9IDA7XG4gICAgY2ggPSAnICc7XG4gICAgcmVzdWx0ID0gdmFsdWUoKTtcbiAgICB3aGl0ZSgpO1xuICAgIGlmIChjaCkge1xuICAgICAgICBlcnJvcihcIlN5bnRheCBlcnJvclwiKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsXG4gICAgLy8gcGFzc2luZyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byB0aGUgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGVcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbiwgc3RhcnRpbmcgd2l0aCBhIHRlbXBvcmFyeSByb290IG9iamVjdCB0aGF0IGhvbGRzIHRoZSByZXN1bHRcbiAgICAvLyBpbiBhbiBlbXB0eSBrZXkuIElmIHRoZXJlIGlzIG5vdCBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHNpbXBseSByZXR1cm4gdGhlXG4gICAgLy8gcmVzdWx0LlxuXG4gICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID8gKGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcbiAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfSh7Jyc6IHJlc3VsdH0sICcnKSkgOiByZXN1bHQ7XG59O1xuIiwidmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBnYXAsXG4gICAgaW5kZW50LFxuICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICB9LFxuICAgIHJlcDtcblxuZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuICAgIC8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4gICAgLy8gT3RoZXJ3aXNlIHdlIG11c3QgYWxzbyByZXBsYWNlIHRoZSBvZmZlbmRpbmcgY2hhcmFjdGVycyB3aXRoIHNhZmUgZXNjYXBlXG4gICAgLy8gc2VxdWVuY2VzLlxuICAgIFxuICAgIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIGMgPT09ICdzdHJpbmcnID8gYyA6XG4gICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICB9KSArICdcIicgOiAnXCInICsgc3RyaW5nICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG4gICAgLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICBwYXJ0aWFsLFxuICAgICAgICB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgIFxuICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSk7XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuICAgIC8vIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuICAgICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiAnbnVsbCc7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4gICAgICAgICAgICAvLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlICdudWxsJy4gVGhlIGNhc2UgaXMgaW5jbHVkZWQgaGVyZSBpblxuICAgICAgICAgICAgLy8gdGhlIHJlbW90ZSBjaGFuY2UgdGhhdCB0aGlzIGdldHMgZml4ZWQgc29tZWRheS5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICAgIHBhcnRpYWwgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQXJyYXkuaXNBcnJheVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBlbGVtZW50cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLCBhbmRcbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZW0gaW4gYnJhY2tldHMuXG4gICAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ1tdJyA6IGdhcCA/XG4gICAgICAgICAgICAgICAgICAgICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nIDpcbiAgICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlXG4gICAgICAgICAgICAvLyBzdHJpbmdpZmllZC5cbiAgICAgICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAvLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4gICAgICAgIC8vIGFuZCB3cmFwIHRoZW0gaW4gYnJhY2VzLlxuXG4gICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICd7fScgOiBnYXAgP1xuICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgIHZhciBpO1xuICAgIGdhcCA9ICcnO1xuICAgIGluZGVudCA9ICcnO1xuICAgIFxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbiAgICAvLyBtYW55IHNwYWNlcy5cbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG4gICAgZWxzZSBpZiAodHlwZW9mIHNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4gICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvci5cbiAgICByZXAgPSByZXBsYWNlcjtcbiAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nXG4gICAgJiYgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHJlcGxhY2VyLmxlbmd0aCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFrZSBhIGZha2Ugcm9vdCBvYmplY3QgY29udGFpbmluZyBvdXIgdmFsdWUgdW5kZXIgdGhlIGtleSBvZiAnJy5cbiAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuICAgIHJldHVybiBzdHIoJycsIHsnJzogdmFsdWV9KTtcbn07XG4iLCJcbmV4cG9ydCBlbnVtIEFnZ3JlZ2F0ZU9wIHtcbiAgICBWQUxVRVMgPSAndmFsdWVzJyBhcyBhbnksXG4gICAgQ09VTlQgPSAnY291bnQnIGFzIGFueSxcbiAgICBWQUxJRCA9ICd2YWxpZCcgYXMgYW55LFxuICAgIE1JU1NJTkcgPSAnbWlzc2luZycgYXMgYW55LFxuICAgIERJU1RJTkNUID0gJ2Rpc3RpbmN0JyBhcyBhbnksXG4gICAgU1VNID0gJ3N1bScgYXMgYW55LFxuICAgIE1FQU4gPSAnbWVhbicgYXMgYW55LFxuICAgIEFWRVJBR0UgPSAnYXZlcmFnZScgYXMgYW55LFxuICAgIFZBUklBTkNFID0gJ3ZhcmlhbmNlJyBhcyBhbnksXG4gICAgVkFSSUFOQ0VQID0gJ3ZhcmlhbmNlcCcgYXMgYW55LFxuICAgIFNUREVWID0gJ3N0ZGV2JyBhcyBhbnksXG4gICAgU1RERVZQID0gJ3N0ZGV2cCcgYXMgYW55LFxuICAgIE1FRElBTiA9ICdtZWRpYW4nIGFzIGFueSxcbiAgICBRMSA9ICdxMScgYXMgYW55LFxuICAgIFEzID0gJ3EzJyBhcyBhbnksXG4gICAgTU9ERVNLRVcgPSAnbW9kZXNrZXcnIGFzIGFueSxcbiAgICBNSU4gPSAnbWluJyBhcyBhbnksXG4gICAgTUFYID0gJ21heCcgYXMgYW55LFxuICAgIEFSR01JTiA9ICdhcmdtaW4nIGFzIGFueSxcbiAgICBBUkdNQVggPSAnYXJnbWF4JyBhcyBhbnksXG59XG5cbmV4cG9ydCBjb25zdCBBR0dSRUdBVEVfT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLlZBTFVFUyxcbiAgICBBZ2dyZWdhdGVPcC5DT1VOVCxcbiAgICBBZ2dyZWdhdGVPcC5WQUxJRCxcbiAgICBBZ2dyZWdhdGVPcC5NSVNTSU5HLFxuICAgIEFnZ3JlZ2F0ZU9wLkRJU1RJTkNULFxuICAgIEFnZ3JlZ2F0ZU9wLlNVTSxcbiAgICBBZ2dyZWdhdGVPcC5NRUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFWRVJBR0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0VQLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWUCxcbiAgICBBZ2dyZWdhdGVPcC5NRURJQU4sXG4gICAgQWdncmVnYXRlT3AuUTEsXG4gICAgQWdncmVnYXRlT3AuUTMsXG4gICAgQWdncmVnYXRlT3AuTU9ERVNLRVcsXG4gICAgQWdncmVnYXRlT3AuTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLk1BWCxcbiAgICBBZ2dyZWdhdGVPcC5BUkdNSU4sXG4gICAgQWdncmVnYXRlT3AuQVJHTUFYLFxuXTtcblxuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLk1FQU4sXG4gICAgQWdncmVnYXRlT3AuQVZFUkFHRSxcbiAgICBBZ2dyZWdhdGVPcC5TVERFVixcbiAgICBBZ2dyZWdhdGVPcC5TVERFVlAsXG4gICAgQWdncmVnYXRlT3AuTUVESUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLlExLFxuICAgIEFnZ3JlZ2F0ZU9wLlEzLFxuICAgIEFnZ3JlZ2F0ZU9wLk1JTixcbiAgICBBZ2dyZWdhdGVPcC5NQVgsXG5dO1xuXG4vLyBUT0RPOiBtb3ZlIHN1cHBvcnRlZFR5cGVzLCBzdXBwb3J0ZWRFbnVtcyBmcm9tIHNjaGVtYSB0byBoZXJlXG4iLCJcbmV4cG9ydCBlbnVtIEF4aXNPcmllbnQge1xuICAgIFRPUCA9ICd0b3AnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXNDb25maWcge1xuICAvLyAtLS0tLS0tLS0tIEdlbmVyYWwgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGF4aXMgbGluZVxuICAgKi9cbiAgYXhpc1dpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogQSBzdHJpbmcgaW5kaWNhdGluZyBpZiB0aGUgYXhpcyAoYW5kIGFueSBncmlkbGluZXMpIHNob3VsZCBiZSBwbGFjZWQgYWJvdmUgb3IgYmVsb3cgdGhlIGRhdGEgbWFya3MuXG4gICAqL1xuICBsYXllcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQXhpcyAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBDb2xvciBvZiBheGlzIGxpbmUuXG4gICAqL1xuICBheGlzQ29sb3I/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBHcmlkIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0ZSBpZiBncmlkbGluZXMgc2hvdWxkIGJlIGNyZWF0ZWQgaW4gYWRkaXRpb24gdG8gdGlja3MuIElmIGBncmlkYCBpcyB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBST1cgYW5kIENPTC4gRm9yIFggYW5kIFksIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3IgcXVhbnRpdGF0aXZlIGFuZCB0aW1lIGZpZWxkcyBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBncmlkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29sb3Igb2YgZ3JpZGxpbmVzLlxuICAgKi9cbiAgZ3JpZENvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBncmlkIGRhc2ggYXJyYXkuXG4gICAqL1xuICBncmlkRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgb2YgZ3JpZCAodmFsdWUgYmV0d2VlbiBbMCwxXSlcbiAgICovXG4gIGdyaWRPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JpZFdpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gTGFiZWxzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIGxhYmVscy5cbiAgICovXG4gIGxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxBbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgYWxpZ25tZW50IGZvciB0aGUgTGFiZWwuXG4gICAqL1xuICBsYWJlbEFsaWduPzogc3RyaW5nO1xuICAvKipcbiAgICogVGV4dCBiYXNlbGluZSBmb3IgdGhlIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxCYXNlbGluZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRydW5jYXRlIGxhYmVscyB0aGF0IGFyZSB0b28gbG9uZy5cbiAgICogQG1pbmltdW0gMVxuICAgKi9cbiAgbGFiZWxNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIGFuZCBkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2tzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIElmIHByb3ZpZGVkLCBzZXRzIHRoZSBudW1iZXIgb2YgbWlub3IgdGlja3MgYmV0d2VlbiBtYWpvciB0aWNrcyAodGhlIHZhbHVlIDkgcmVzdWx0cyBpbiBkZWNpbWFsIHN1YmRpdmlzaW9uKS4gT25seSBhcHBsaWNhYmxlIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuXG4gICAqL1xuICBzdWJkaXZpZGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBIGRlc2lyZWQgbnVtYmVyIG9mIHRpY2tzLCBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLiBUaGUgcmVzdWx0aW5nIG51bWJlciBtYXkgYmUgZGlmZmVyZW50IHNvIHRoYXQgdmFsdWVzIGFyZSBcIm5pY2VcIiAobXVsdGlwbGVzIG9mIDIsIDUsIDEwKSBhbmQgbGllIHdpdGhpbiB0aGUgdW5kZXJseWluZyBzY2FsZSdzIHJhbmdlLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrcz86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBheGlzJ3MgdGljay5cbiAgICovXG4gIHRpY2tDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSB0aWNrIGxhYmVsLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGlja0xhYmVsQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSB0aWNrIGxhYmVsLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiBsYWJlbCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udFNpemU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBwYWRkaW5nLCBpbiBwaXhlbHMsIGJldHdlZW4gdGlja3MgYW5kIHRleHQgbGFiZWxzLlxuICAgKi9cbiAgdGlja1BhZGRpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciwgbWlub3IgYW5kIGVuZCB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemVNYWpvcj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1pbm9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1pbm9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZUVuZD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdpZHRoLCBpbiBwaXhlbHMsIG9mIHRpY2tzLlxuICAgKi9cbiAgdGlja1dpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGl0bGUgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ29sb3Igb2YgdGhlIHRpdGxlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGl0bGVDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogRm9udCBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250U2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogV2VpZ2h0IG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcblxuICAvKipcbiAgICogQSB0aXRsZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgKi9cbiAgdGl0bGVPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBNYXggbGVuZ3RoIGZvciBheGlzIHRpdGxlIGlmIHRoZSB0aXRsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBmcm9tIHRoZSBmaWVsZCdzIGRlc2NyaXB0aW9uLiBCeSBkZWZhdWx0LCB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gY2VsbCBzaXplIGFuZCBjaGFyYWN0ZXJXaWR0aCBwcm9wZXJ0eS5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGl0bGVNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDaGFyYWN0ZXIgd2lkdGggZm9yIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5pbmcgdGl0bGUgbWF4IGxlbmd0aC5cbiAgICovXG4gIGNoYXJhY3RlcldpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3RoZXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGF4aXMgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE86IHJlcGxhY2Vcbn1cblxuLy8gVE9ETzogYWRkIGNvbW1lbnQgZm9yIHByb3BlcnRpZXMgdGhhdCB3ZSByZWx5IG9uIFZlZ2EncyBkZWZhdWx0IHRvIHByb2R1Y2Vcbi8vIG1vcmUgY29uY2lzZSBWZWdhIG91dHB1dC5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBvZmZzZXQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSAwXG4gIGdyaWQ6IHVuZGVmaW5lZCwgLy8gYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXG4gIGxhYmVsczogdHJ1ZSxcbiAgbGFiZWxNYXhMZW5ndGg6IDI1LFxuICB0aWNrU2l6ZTogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDZcbiAgY2hhcmFjdGVyV2lkdGg6IDZcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBheGlzV2lkdGg6IDAsXG4gIGxhYmVsczogdHJ1ZSxcbiAgZ3JpZDogZmFsc2UsXG4gIHRpY2tTaXplOiAwXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXMgZXh0ZW5kcyBBeGlzQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQgdmFsdWUgZGV0ZXJtaW5lZCBieSBjb25maWcuZm9ybWF0IGFueXdheVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBheGlzLiBPbmUgb2YgdG9wLCBib3R0b20sIGxlZnQgb3IgcmlnaHQuIFRoZSBvcmllbnRhdGlvbiBjYW4gYmUgdXNlZCB0byBmdXJ0aGVyIHNwZWNpYWxpemUgdGhlIGF4aXMgdHlwZSAoZS5nLiwgYSB5IGF4aXMgb3JpZW50ZWQgZm9yIHRoZSByaWdodCBlZGdlIG9mIHRoZSBjaGFydCkuXG4gICAqL1xuICBvcmllbnQ/OiBBeGlzT3JpZW50O1xuICAvKipcbiAgICogQSB0aXRsZSBmb3IgdGhlIGF4aXMuIFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LlxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHZhbHVlcz86IG51bWJlcltdO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsLCBST1csIENPTFVNTiwgU0hBUEUsIFNJWkV9IGZyb20gJy4vY2hhbm5lbCc7XG5cbi8qKlxuICogQmlubmluZyBwcm9wZXJ0aWVzIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBiaW4gZGF0YSBvciBub3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmluIHtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1pbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1heD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgYmFzZSB0byB1c2UgZm9yIGF1dG9tYXRpYyBiaW4gZGV0ZXJtaW5hdGlvbiAoZGVmYXVsdCBpcyBiYXNlIDEwKS5cbiAgICovXG4gIGJhc2U/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBleGFjdCBzdGVwIHNpemUgdG8gdXNlIGJldHdlZW4gYmlucy4gSWYgcHJvdmlkZWQsIG9wdGlvbnMgc3VjaCBhcyBtYXhiaW5zIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIHN0ZXA/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbGxvd2FibGUgc3RlcCBzaXplcyB0byBjaG9vc2UgZnJvbS5cbiAgICovXG4gIHN0ZXBzPzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBBIG1pbmltdW0gYWxsb3dhYmxlIHN0ZXAgc2l6ZSAocGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgaW50ZWdlciB2YWx1ZXMpLlxuICAgKi9cbiAgbWluc3RlcD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNjYWxlIGZhY3RvcnMgaW5kaWNhdGluZyBhbGxvd2FibGUgc3ViZGl2aXNpb25zLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBbNSwgMl0sIHdoaWNoIGluZGljYXRlcyB0aGF0IGZvciBiYXNlIDEwIG51bWJlcnMgKHRoZSBkZWZhdWx0IGJhc2UpLCB0aGUgbWV0aG9kIG1heSBjb25zaWRlciBkaXZpZGluZyBiaW4gc2l6ZXMgYnkgNSBhbmQvb3IgMi4gRm9yIGV4YW1wbGUsIGZvciBhbiBpbml0aWFsIHN0ZXAgc2l6ZSBvZiAxMCwgdGhlIG1ldGhvZCBjYW4gY2hlY2sgaWYgYmluIHNpemVzIG9mIDIgKD0gMTAvNSksIDUgKD0gMTAvMiksIG9yIDEgKD0gMTAvKDUqMikpIG1pZ2h0IGFsc28gc2F0aXNmeSB0aGUgZ2l2ZW4gY29uc3RyYWludHMuXG4gICAqL1xuICBkaXY/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIE1heGltdW0gbnVtYmVyIG9mIGJpbnMuXG4gICAqIEBtaW5pbXVtIDJcbiAgICovXG4gIG1heGJpbnM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvTWF4QmlucyhjaGFubmVsOiBDaGFubmVsKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSVpFOlxuICAgICAgLy8gRmFjZXRzIGFuZCBTaXplIHNob3VsZG4ndCBoYXZlIHRvbyBtYW55IGJpbnNcbiAgICAgIC8vIFdlIGNob29zZSA2IGxpa2Ugc2hhcGUgdG8gc2ltcGxpZnkgdGhlIHJ1bGVcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIDY7IC8vIFZlZ2EncyBcInNoYXBlXCIgaGFzIDYgZGlzdGluY3QgdmFsdWVzXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAxMDtcbiAgfVxufVxuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBlbmNvZGluZyBjaGFubmVscyAoVmlzdWFsIHZhcmlhYmxlcylcbiAqIHN1Y2ggYXMgJ3gnLCAneScsICdjb2xvcicuXG4gKi9cblxuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWlucywgd2l0aG91dH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFggPSAneCcgYXMgYW55LFxuICBZID0gJ3knIGFzIGFueSxcbiAgUk9XID0gJ3JvdycgYXMgYW55LFxuICBDT0xVTU4gPSAnY29sdW1uJyBhcyBhbnksXG4gIFNIQVBFID0gJ3NoYXBlJyBhcyBhbnksXG4gIFNJWkUgPSAnc2l6ZScgYXMgYW55LFxuICBDT0xPUiA9ICdjb2xvcicgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgREVUQUlMID0gJ2RldGFpbCcgYXMgYW55LFxuICBMQUJFTCA9ICdsYWJlbCcgYXMgYW55LFxuICBQQVRIID0gJ3BhdGgnIGFzIGFueSxcbiAgT1JERVIgPSAnb3JkZXInIGFzIGFueSxcbiAgT1BBQ0lUWSA9ICdvcGFjaXR5JyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IFggPSBDaGFubmVsLlg7XG5leHBvcnQgY29uc3QgWSA9IENoYW5uZWwuWTtcbmV4cG9ydCBjb25zdCBST1cgPSBDaGFubmVsLlJPVztcbmV4cG9ydCBjb25zdCBDT0xVTU4gPSBDaGFubmVsLkNPTFVNTjtcbmV4cG9ydCBjb25zdCBTSEFQRSA9IENoYW5uZWwuU0hBUEU7XG5leHBvcnQgY29uc3QgU0laRSA9IENoYW5uZWwuU0laRTtcbmV4cG9ydCBjb25zdCBDT0xPUiA9IENoYW5uZWwuQ09MT1I7XG5leHBvcnQgY29uc3QgVEVYVCA9IENoYW5uZWwuVEVYVDtcbmV4cG9ydCBjb25zdCBERVRBSUwgPSBDaGFubmVsLkRFVEFJTDtcbmV4cG9ydCBjb25zdCBMQUJFTCA9IENoYW5uZWwuTEFCRUw7XG5leHBvcnQgY29uc3QgUEFUSCA9IENoYW5uZWwuUEFUSDtcbmV4cG9ydCBjb25zdCBPUkRFUiA9IENoYW5uZWwuT1JERVI7XG5leHBvcnQgY29uc3QgT1BBQ0lUWSA9IENoYW5uZWwuT1BBQ0lUWTtcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxTID0gW1gsIFksIFJPVywgQ09MVU1OLCBTSVpFLCBTSEFQRSwgQ09MT1IsIFBBVEgsIE9SREVSLCBPUEFDSVRZLCBURVhULCBERVRBSUwsIExBQkVMXTtcblxuZXhwb3J0IGNvbnN0IFVOSVRfQ0hBTk5FTFMgPSB3aXRob3V0KENIQU5ORUxTLCBbUk9XLCBDT0xVTU5dKTtcbmV4cG9ydCBjb25zdCBVTklUX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbUEFUSCwgT1JERVIsIERFVEFJTCwgVEVYVCwgTEFCRUxdKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbWCwgWV0pO1xuZXhwb3J0IGNvbnN0IE5PTlNQQVRJQUxfU0NBTEVfQ0hBTk5FTFMgPSB3aXRob3V0KFVOSVRfU0NBTEVfQ0hBTk5FTFMsIFtYLCBZXSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkTWFyayB7XG4gIHBvaW50PzogYm9vbGVhbjtcbiAgdGljaz86IGJvb2xlYW47XG4gIHJ1bGU/OiBib29sZWFuO1xuICBjaXJjbGU/OiBib29sZWFuO1xuICBzcXVhcmU/OiBib29sZWFuO1xuICBiYXI/OiBib29sZWFuO1xuICBsaW5lPzogYm9vbGVhbjtcbiAgYXJlYT86IGJvb2xlYW47XG4gIHRleHQ/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgYSBwYXJ0aWN1bGFyIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsICBjaGFubmVsIG5hbWVcbiAqIEBwYXJhbSBtYXJrIHRoZSBtYXJrIHR5cGVcbiAqIEByZXR1cm4gd2hldGhlciB0aGUgbWFyayBzdXBwb3J0cyB0aGUgY2hhbm5lbFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydE1hcmsoY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyaykge1xuICByZXR1cm4gISFnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWwpW21hcmtdO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGRpY3Rpb25hcnkgc2hvd2luZyB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbFxuICogQHJldHVybiBBIGRpY3Rpb25hcnkgbWFwcGluZyBtYXJrIHR5cGVzIHRvIGJvb2xlYW4gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsOiBDaGFubmVsKTogU3VwcG9ydGVkTWFyayB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIERFVEFJTDpcbiAgICBjYXNlIE9SREVSOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7IC8vIGFsbCBtYXJrc1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgbGluZTogdHJ1ZSwgYXJlYTogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtwb2ludDogdHJ1ZX07XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHt0ZXh0OiB0cnVlfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge2xpbmU6IHRydWV9O1xuICB9XG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwb3J0ZWRSb2xlIHtcbiAgbWVhc3VyZTogYm9vbGVhbjtcbiAgZGltZW5zaW9uOiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgZGltZW5zaW9uIC8gbWVhc3VyZSByb2xlXG4gKiBAcGFyYW0gIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgcm9sZSB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZFJvbGUoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZFJvbGUge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgTEFCRUw6XG4gICAgY2FzZSBERVRBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IHRydWUsXG4gICAgICAgIGRpbWVuc2lvbjogZmFsc2VcbiAgICAgIH07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogZmFsc2UsXG4gICAgICAgIGRpbWVuc2lvbjogdHJ1ZVxuICAgICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZW5jb2RpbmcgY2hhbm5lbCcgKyBjaGFubmVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1NjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgcmV0dXJuICFjb250YWlucyhbREVUQUlMLCBQQVRILCBURVhULCBMQUJFTCwgT1JERVJdLCBjaGFubmVsKTtcbn1cbiIsImltcG9ydCB7QXhpc09yaWVudH0gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7dGl0bGUgYXMgZmllbGREZWZUaXRsZSwgaXNEaW1lbnNpb259IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywga2V5cywgZXh0ZW5kLCB0cnVuY2F0ZSwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnQXhpc30gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge2Zvcm1hdE1peGluc30gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIGxldCBleHBvcnRzO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBeGlzQ29tcG9uZW50KG1vZGVsOiBNb2RlbCwgYXhpc0NoYW5uZWxzOiBDaGFubmVsW10pOiBEaWN0PFZnQXhpcz4ge1xuICByZXR1cm4gYXhpc0NoYW5uZWxzLnJlZHVjZShmdW5jdGlvbihheGlzLCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmF4aXMoY2hhbm5lbCkpIHtcbiAgICAgIGF4aXNbY2hhbm5lbF0gPSBwYXJzZUF4aXMoY2hhbm5lbCwgbW9kZWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXhpcztcbiAgfSwge30gYXMgRGljdDxWZ0F4aXM+KTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIGlubmVyIGF4aXMgZm9yIHNob3dpbmcgZ3JpZCBmb3Igc2hhcmVkIGF4aXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUlubmVyQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZGluZyB0aWNrcyBhcyB3ZWxsXG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgZ3JpZDogdHJ1ZSxcbiAgICB0aWNrU2l6ZTogMCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsYWJlbHM6IHtcbiAgICAgICAgdGV4dDoge3ZhbHVlOiAnJ31cbiAgICAgIH0sXG4gICAgICBheGlzOiB7XG4gICAgICAgIHN0cm9rZToge3ZhbHVlOiAndHJhbnNwYXJlbnQnfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICBbJ2xheWVyJywgJ3RpY2tzJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgbGV0IG1ldGhvZDogKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmOmFueSk9PmFueTtcblxuICAgIGNvbnN0IHZhbHVlID0gKG1ldGhvZCA9IGV4cG9ydHNbcHJvcGVydHldKSA/XG4gICAgICAgICAgICAgICAgICAvLyBjYWxsaW5nIGF4aXMuZm9ybWF0LCBheGlzLmdyaWQsIC4uLlxuICAgICAgICAgICAgICAgICAgbWV0aG9kKG1vZGVsLCBjaGFubmVsLCBkZWYpIDpcbiAgICAgICAgICAgICAgICAgIGF4aXNbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwcm9wcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCkucHJvcGVydGllcyB8fCB7fTtcblxuICAvLyBGb3Igbm93LCBvbmx5IG5lZWQgdG8gYWRkIGdyaWQgcHJvcGVydGllcyBoZXJlIGJlY2F1c2UgaW5uZXJBeGlzIGlzIG9ubHkgZm9yIHJlbmRlcmluZyBncmlkLlxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZCBvdGhlciBwcm9wZXJ0aWVzIGZvciBpbm5lckF4aXNcbiAgWydncmlkJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tncm91cF0gP1xuICAgICAgcHJvcGVydGllc1tncm91cF0obW9kZWwsIGNoYW5uZWwsIHByb3BzW2dyb3VwXSB8fCB7fSwgZGVmKSA6XG4gICAgICBwcm9wc1tncm91cF07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAvLyBUT0RPOiByZXBsYWNlIGFueSB3aXRoIFZlZ2EgQXhpcyBJbnRlcmZhY2VcbiAgbGV0IGRlZjogYW55ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKVxuICB9O1xuXG4gIC8vIGZvcm1hdCBtaXhpbnMgKGFkZCBmb3JtYXQgYW5kIGZvcm1hdFR5cGUpXG4gIGV4dGVuZChkZWYsIGZvcm1hdE1peGlucyhtb2RlbCwgY2hhbm5lbCwgbW9kZWwuYXhpcyhjaGFubmVsKS5mb3JtYXQpKTtcblxuICAvLyAxLjIuIEFkZCBwcm9wZXJ0aWVzXG4gIFtcbiAgICAvLyBhKSBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlcyAoc28gaXQgaGFzIGF4aXNbcHJvcGVydHldIG1ldGhvZHMpIC0tIGNhbGwgcnVsZSBmdW5jdGlvbnNcbiAgICAnZ3JpZCcsICdsYXllcicsICdvZmZzZXQnLCAnb3JpZW50JywgJ3RpY2tTaXplJywgJ3RpY2tzJywgJ3RpY2tTaXplRW5kJywgJ3RpdGxlJywgJ3RpdGxlT2Zmc2V0JyxcbiAgICAvLyBiKSBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXMsIG9ubHkgcHJvZHVjZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgc2NoZW1hLCBvciBleHBsaWNpdCB2YWx1ZSBpZiBzcGVjaWZpZWRcbiAgICAndGlja1BhZGRpbmcnLCAndGlja1NpemUnLCAndGlja1NpemVNYWpvcicsICd0aWNrU2l6ZU1pbm9yJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgW1xuICAgICdheGlzJywgJ2xhYmVscycsIC8vIGhhdmUgc3BlY2lhbCBydWxlc1xuICAgICdncmlkJywgJ3RpdGxlJywgJ3RpY2tzJywgJ21ham9yVGlja3MnLCAnbWlub3JUaWNrcycgLy8gb25seSBkZWZhdWx0IHZhbHVlc1xuICBdLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiBtb2RlbC5heGlzKGNoYW5uZWwpLm9mZnNldDtcbn1cblxuLy8gVE9ETzogd2UgbmVlZCB0byByZWZhY3RvciB0aGlzIG1ldGhvZCBhZnRlciB3ZSB0YWtlIGNhcmUgb2YgY29uZmlnIHJlZmFjdG9yaW5nXG4vKipcbiAqIERlZmF1bHQgcnVsZXMgZm9yIHdoZXRoZXIgdG8gc2hvdyBhIGdyaWQgc2hvdWxkIGJlIHNob3duIGZvciBhIGNoYW5uZWwuXG4gKiBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3Igb3JkaW5hbCBzY2FsZXMgdGhhdCBhcmUgbm90IGJpbm5lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JpZFNob3cobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGdyaWQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmdyaWQ7XG4gIGlmIChncmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuXG4gIHJldHVybiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyaWQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjaGFubmVsID09PSBST1cgfHwgY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gbmV2ZXIgYXBwbHkgZ3JpZCBmb3IgUk9XIGFuZCBDT0xVTU4gc2luY2Ugd2UgbWFudWFsbHkgY3JlYXRlIHJ1bGUtZ3JvdXAgZm9yIHRoZW1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGdyaWRTaG93KG1vZGVsLCBjaGFubmVsKSAmJiAoXG4gICAgLy8gVE9ETyByZWZhY3RvciB0aGlzIGNsZWFubHkgLS0gZXNzZW50aWFsbHkgdGhlIGNvbmRpdGlvbiBiZWxvdyBpcyB3aGV0aGVyXG4gICAgLy8gdGhlIGF4aXMgaXMgYSBzaGFyZWQgLyB1bmlvbiBheGlzLlxuICAgIChjaGFubmVsID09PSBZIHx8IGNoYW5uZWwgPT09IFgpICYmICEobW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXIobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWYpIHtcbiAgY29uc3QgbGF5ZXIgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmxheWVyO1xuICBpZiAobGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICBpZiAoZGVmLmdyaWQpIHtcbiAgICAvLyBpZiBncmlkIGlzIHRydWUsIG5lZWQgdG8gcHV0IGxheWVyIG9uIHRoZSBiYWNrIHNvIHRoYXQgZ3JpZCBpcyBiZWhpbmQgbWFya3NcbiAgICByZXR1cm4gJ2JhY2snO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIG90aGVyd2lzZSByZXR1cm4gdW5kZWZpbmVkIGFuZCB1c2UgVmVnYSdzIGRlZmF1bHQuXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3JpZW50KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBvcmllbnQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLm9yaWVudDtcbiAgaWYgKG9yaWVudCkge1xuICAgIHJldHVybiBvcmllbnQ7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gRklYTUUgdGVzdCBhbmQgZGVjaWRlXG4gICAgcmV0dXJuIEF4aXNPcmllbnQuVE9QO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja3MgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tzO1xuICBpZiAodGlja3MgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIC8vIEZJWE1FIGRlcGVuZHMgb24gc2NhbGUgdHlwZSB0b29cbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbikge1xuICAgIC8vIFZlZ2EncyBkZWZhdWx0IHRpY2tzIG9mdGVuIGxlYWQgdG8gYSBsb3Qgb2YgbGFiZWwgb2NjbHVzaW9uIG9uIFggd2l0aG91dCA5MCBkZWdyZWUgcm90YXRpb25cbiAgICByZXR1cm4gNTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrU2l6ZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja1NpemUgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tTaXplO1xuICBpZiAodGlja1NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrU2l6ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemVFbmQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplRW5kID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZUVuZDtcbiAgaWYgKHRpY2tTaXplRW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aWNrU2l6ZUVuZDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gIGlmIChheGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYXhpcy50aXRsZTtcbiAgfVxuXG4gIC8vIGlmIG5vdCBkZWZpbmVkLCBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBheGlzIHRpdGxlIGZyb20gZmllbGQgZGVmXG4gIGNvbnN0IGZpZWxkVGl0bGUgPSBmaWVsZERlZlRpdGxlKG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpKTtcblxuICBsZXQgbWF4TGVuZ3RoO1xuICBpZiAoYXhpcy50aXRsZU1heExlbmd0aCkge1xuICAgIG1heExlbmd0aCA9IGF4aXMudGl0bGVNYXhMZW5ndGg7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWCAmJiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoWCkpIHtcbiAgICBjb25zdCB1bml0TW9kZWw6IFVuaXRNb2RlbCA9IG1vZGVsIGFzIGFueTsgLy8gb25seSB1bml0IG1vZGVsIGhhcyBjaGFubmVsIHhcbiAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUsIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZSwgd2UgY2FuIGd1ZXNzIG1heCBsZW5ndGhcbiAgICBtYXhMZW5ndGggPSB1bml0TW9kZWwuY29uZmlnKCkuY2VsbC53aWR0aCAvIG1vZGVsLmF4aXMoWCkuY2hhcmFjdGVyV2lkdGg7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWSAmJiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoWSkpIHtcbiAgICBjb25zdCB1bml0TW9kZWw6IFVuaXRNb2RlbCA9IG1vZGVsIGFzIGFueTsgLy8gb25seSB1bml0IG1vZGVsIGhhcyBjaGFubmVsIHlcbiAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUsIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZSwgd2UgY2FuIGd1ZXNzIG1heCBsZW5ndGhcbiAgICBtYXhMZW5ndGggPSB1bml0TW9kZWwuY29uZmlnKCkuY2VsbC5oZWlnaHQgLyBtb2RlbC5heGlzKFkpLmNoYXJhY3RlcldpZHRoO1xuICB9XG5cbiAgLy8gRklYTUU6IHdlIHNob3VsZCB1c2UgdGVtcGxhdGUgdG8gdHJ1bmNhdGUgaW5zdGVhZFxuICByZXR1cm4gbWF4TGVuZ3RoID8gdHJ1bmNhdGUoZmllbGRUaXRsZSwgbWF4TGVuZ3RoKSA6IGZpZWxkVGl0bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZU9mZnNldChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGl0bGVPZmZzZXQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpdGxlT2Zmc2V0O1xuICBpZiAodGl0bGVPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRpdGxlT2Zmc2V0O1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgcHJvcGVydGllcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBheGlzKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgYXhpc1Byb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuYXhpc0NvbG9yICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZToge3ZhbHVlOiBheGlzLmF4aXNDb2xvcn0gfSA6XG4gICAgICAgIHt9LFxuICAgICAgYXhpcy5heGlzV2lkdGggIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIHsgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogYXhpcy5heGlzV2lkdGh9IH0gOlxuICAgICAgICB7fSxcbiAgICAgIGF4aXNQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdyaWQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBncmlkUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy5ncmlkQ29sb3IgIT09IHVuZGVmaW5lZCA/IHsgc3Ryb2tlOiB7dmFsdWU6IGF4aXMuZ3JpZENvbG9yfX0gOiB7fSxcbiAgICAgIGF4aXMuZ3JpZE9wYWNpdHkgIT09IHVuZGVmaW5lZCA/IHtzdHJva2VPcGFjaXR5OiB7dmFsdWU6IGF4aXMuZ3JpZE9wYWNpdHl9IH0gOiB7fSxcbiAgICAgIGF4aXMuZ3JpZFdpZHRoICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlV2lkdGggOiB7dmFsdWU6IGF4aXMuZ3JpZFdpZHRofSB9IDoge30sXG4gICAgICBheGlzLmdyaWREYXNoICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlRGFzaE9mZnNldCA6IHt2YWx1ZTogYXhpcy5ncmlkRGFzaH0gfSA6IHt9LFxuICAgICAgZ3JpZFByb3BzU3BlYyB8fCB7fVxuICAgICk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgbGFiZWxzU3BlYywgZGVmKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIGlmICghYXhpcy5sYWJlbHMpIHtcbiAgICAgIHJldHVybiBleHRlbmQoe1xuICAgICAgICB0ZXh0OiAnJ1xuICAgICAgfSwgbGFiZWxzU3BlYyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5zKFtOT01JTkFMLCBPUkRJTkFMXSwgZmllbGREZWYudHlwZSkgJiYgYXhpcy5sYWJlbE1heExlbmd0aCkge1xuICAgICAgLy8gVE9ETyByZXBsYWNlIHRoaXMgd2l0aCBWZWdhJ3MgbGFiZWxNYXhMZW5ndGggb25jZSBpdCBpcyBpbnRyb2R1Y2VkXG4gICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHRlbXBsYXRlOiAne3sgZGF0dW0uZGF0YSB8IHRydW5jYXRlOicgKyBheGlzLmxhYmVsTWF4TGVuZ3RoICsgJ319J1xuICAgICAgICB9XG4gICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICB9XG5cbiAgICAvLyBMYWJlbCBBbmdsZVxuICAgIGlmIChheGlzLmxhYmVsQW5nbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEFuZ2xlfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXV0byByb3RhdGUgZm9yIFggYW5kIFJvd1xuICAgICAgaWYgKGNoYW5uZWwgPT09IFggJiYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSB8fCBmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogMjcwfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sYWJlbEFsaWduICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6IGF4aXMubGFiZWxBbGlnbn07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF1dG8gc2V0IGFsaWduIGlmIHJvdGF0ZWRcbiAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7XG4gICAgICAgICAgICB2YWx1ZTogZGVmLm9yaWVudCA9PT0gJ3RvcCcgPyAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgZGVmLnR5cGUgPT09ICd4JyA/ICdyaWdodCcgOlxuICAgICAgICAgICAgICAgICAgICdjZW50ZXInXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6ICdjZW50ZXInfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQmFzZWxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEJhc2VsaW5lfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgLy8gQXV0byBzZXQgYmFzZWxpbmUgaWYgcm90YXRlZFxuICAgICAgICAvLyBUT0RPOiBjb25zaWRlciBvdGhlciB2YWx1ZSBiZXNpZGVzIDI3MCwgOTBcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6IGRlZi50eXBlID09PSAneCcgPyAnbWlkZGxlJyA6ICdib3R0b20nfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6ICdib3R0b20nfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5zdHJva2UgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbEZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnQgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsRm9udH07XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnRTaXplID0ge3ZhbHVlOiBheGlzLnRpY2tMYWJlbEZvbnRTaXplfTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cyhsYWJlbHNTcGVjKS5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBsYWJlbHNTcGVjO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpY2tzKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgdGlja3NQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLnRpY2tDb2xvciAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZSA6IHt2YWx1ZTogYXhpcy50aWNrQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGlja1dpZHRoICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlV2lkdGg6IHt2YWx1ZTogYXhpcy50aWNrV2lkdGh9IH0gOiB7fSxcbiAgICAgIHRpY2tzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHRpdGxlUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy50aXRsZUNvbG9yICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlIDoge3ZhbHVlOiBheGlzLnRpdGxlQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250ICE9PSB1bmRlZmluZWQgPyB7Zm9udDoge3ZhbHVlOiBheGlzLnRpdGxlRm9udH19IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udFNpemUgIT09IHVuZGVmaW5lZCA/IHtmb250U2l6ZToge3ZhbHVlOiBheGlzLnRpdGxlRm9udFNpemV9fSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCA/IHtmb250V2VpZ2h0OiB7dmFsdWU6IGF4aXMudGl0bGVGb250V2VpZ2h0fX0gOiB7fSxcblxuICAgICAgdGl0bGVQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBTSVpFLCBDT0xPUiwgT1BBQ0lUWSwgU0hBUEUsIFRFWFQsIExBQkVMLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkLCBPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7UVVBTlRJVEFUSVZFLCBPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCB1bmlvbn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge2Zvcm1hdCBhcyB0aW1lRm9ybWF0RXhwcn0gZnJvbSAnLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge1NwZWMsIGlzVW5pdFNwZWMsIGlzRmFjZXRTcGVjLCBpc0xheWVyU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWwoc3BlYzogU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpOiBNb2RlbCB7XG4gIGlmIChpc0ZhY2V0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiBuZXcgRmFjZXRNb2RlbChzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG4gIH1cblxuICBpZiAoaXNMYXllclNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IExheWVyTW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzVW5pdFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IFVuaXRNb2RlbChzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIHNwZWMuJyk7XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBUT0RPOiBmaWd1cmUgaWYgd2UgcmVhbGx5IG5lZWQgb3BhY2l0eSBpbiBib3RoXG5leHBvcnQgY29uc3QgU1RST0tFX0NPTkZJRyA9IFsnc3Ryb2tlJywgJ3N0cm9rZVdpZHRoJyxcbiAgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCcsICdzdHJva2VPcGFjaXR5JywgJ29wYWNpdHknXTtcblxuZXhwb3J0IGNvbnN0IEZJTExfQ09ORklHID0gWydmaWxsJywgJ2ZpbGxPcGFjaXR5JyxcbiAgJ29wYWNpdHknXTtcblxuZXhwb3J0IGNvbnN0IEZJTExfU1RST0tFX0NPTkZJRyA9IHVuaW9uKFNUUk9LRV9DT05GSUcsIEZJTExfQ09ORklHKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3QgZmlsbGVkID0gbW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQ7XG4gIGNvbnN0IGNvbG9yRmllbGREZWYgPSBtb2RlbC5maWVsZERlZihDT0xPUik7XG4gIGNvbnN0IG9wYWNpdHlGaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKE9QQUNJVFkpO1xuXG4gIC8vIEFwcGx5IGZpbGwgc3Ryb2tlIGNvbmZpZyBmaXJzdCBzbyB0aGF0IGNvbG9yIGZpZWxkIC8gdmFsdWUgY2FuIG92ZXJyaWRlXG4gIC8vIGZpbGwgLyBzdHJva2VcbiAgaWYgKGZpbGxlZCkge1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgRklMTF9DT05GSUcpO1xuICB9IGVsc2Uge1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgU1RST0tFX0NPTkZJRyk7XG4gIH1cblxuICBsZXQgY29sb3JWYWx1ZTtcbiAgbGV0IG9wYWNpdHlWYWx1ZTtcbiAgaWYgKG1vZGVsLmhhcyhDT0xPUikpIHtcbiAgICBjb2xvclZhbHVlID0ge1xuICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIGNvbG9yRmllbGREZWYudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGNvbG9yRmllbGREZWYgJiYgY29sb3JGaWVsZERlZi52YWx1ZSkge1xuICAgIGNvbG9yVmFsdWUgPSB7IHZhbHVlOiBjb2xvckZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAobW9kZWwuaGFzKE9QQUNJVFkpKSB7XG4gICAgb3BhY2l0eVZhbHVlID0ge1xuICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShPUEFDSVRZKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChPUEFDSVRZLCBvcGFjaXR5RmllbGREZWYudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKG9wYWNpdHlGaWVsZERlZiAmJiBvcGFjaXR5RmllbGREZWYudmFsdWUpIHtcbiAgICBvcGFjaXR5VmFsdWUgPSB7IHZhbHVlOiBvcGFjaXR5RmllbGREZWYudmFsdWUgfTtcbiAgfVxuXG4gIGlmIChjb2xvclZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZmlsbGVkKSB7XG4gICAgICBwLmZpbGwgPSBjb2xvclZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnN0cm9rZSA9IGNvbG9yVmFsdWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFwcGx5IGNvbG9yIGNvbmZpZyBpZiB0aGVyZSBpcyBubyBmaWxsIC8gc3Ryb2tlIGNvbmZpZ1xuICAgIHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gcFtmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgIHt2YWx1ZTogbW9kZWwuY29uZmlnKCkubWFyay5jb2xvcn07XG4gIH1cblxuICBpZiAob3BhY2l0eVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwLm9wYWNpdHkgPSBvcGFjaXR5VmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29uZmlnKHByb3BlcnRpZXMsIGNvbmZpZywgcHJvcHNMaXN0OiBzdHJpbmdbXSkge1xuICBwcm9wc0xpc3QuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gY29uZmlnW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcHJvcGVydGllc1twcm9wZXJ0eV0gPSB7IHZhbHVlOiB2YWx1ZSB9O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBwcm9wZXJ0aWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNYXJrQ29uZmlnKG1hcmtzUHJvcGVydGllcywgbW9kZWw6IFVuaXRNb2RlbCwgcHJvcHNMaXN0OiBzdHJpbmdbXSkge1xuICByZXR1cm4gYXBwbHlDb25maWcobWFya3NQcm9wZXJ0aWVzLCBtb2RlbC5jb25maWcoKS5tYXJrLCBwcm9wc0xpc3QpO1xufVxuXG5cbi8qKlxuICogQnVpbGRzIGFuIG9iamVjdCB3aXRoIGZvcm1hdCBhbmQgZm9ybWF0VHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSBmb3JtYXQgZXhwbGljaXRseSBzcGVjaWZpZWQgZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNaXhpbnMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBmb3JtYXQ6IHN0cmluZykge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIGlmKCFjb250YWlucyhbUVVBTlRJVEFUSVZFLCBURU1QT1JBTF0sIGZpZWxkRGVmLnR5cGUpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgbGV0IGRlZjogYW55ID0ge307XG5cbiAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgZGVmLmZvcm1hdFR5cGUgPSAndGltZSc7XG4gIH1cblxuICBpZiAoZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWYuZm9ybWF0ID0gZm9ybWF0O1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAoZmllbGREZWYudHlwZSkge1xuICAgICAgY2FzZSBRVUFOVElUQVRJVkU6XG4gICAgICAgIGRlZi5mb3JtYXQgPSBtb2RlbC5jb25maWcoKS5udW1iZXJGb3JtYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBURU1QT1JBTDpcbiAgICAgICAgZGVmLmZvcm1hdCA9IHRpbWVGb3JtYXQobW9kZWwsIGNoYW5uZWwpIHx8IG1vZGVsLmNvbmZpZygpLnRpbWVGb3JtYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGFubmVsID09PSBURVhUKSB7XG4gICAgLy8gdGV4dCBkb2VzIG5vdCBzdXBwb3J0IGZvcm1hdCBhbmQgZm9ybWF0VHlwZVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2EvaXNzdWVzLzUwNVxuXG4gICAgY29uc3QgZmlsdGVyID0gKGRlZi5mb3JtYXRUeXBlIHx8ICdudW1iZXInKSArIChkZWYuZm9ybWF0ID8gJzpcXCcnICsgZGVmLmZvcm1hdCArICdcXCcnIDogJycpO1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB7XG4gICAgICAgIHRlbXBsYXRlOiAne3snICsgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBkYXR1bTogdHJ1ZSB9KSArICcgfCAnICsgZmlsdGVyICsgJ319J1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZGVmO1xufVxuXG5mdW5jdGlvbiBpc0FiYnJldmlhdGVkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5zaG9ydFRpbWVMYWJlbHM7XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgY2FzZSBTSEFQRTpcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4gbW9kZWwubGVnZW5kKGNoYW5uZWwpLnNob3J0VGltZUxhYmVscztcbiAgICBjYXNlIFRFWFQ6XG4gICAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkubWFyay5zaG9ydFRpbWVMYWJlbHM7XG4gICAgY2FzZSBMQUJFTDpcbiAgICAgIC8vIFRPRE8oIzg5Nyk6IGltcGxlbWVudCB3aGVuIHdlIGhhdmUgbGFiZWxcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cblxuXG4vKiogUmV0dXJuIGZpZWxkIHJlZmVyZW5jZSB3aXRoIHBvdGVudGlhbCBcIi1cIiBwcmVmaXggZm9yIGRlc2NlbmRpbmcgc29ydCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRGaWVsZChvcmRlckNoYW5uZWxEZWY6IE9yZGVyQ2hhbm5lbERlZikge1xuICByZXR1cm4gKG9yZGVyQ2hhbm5lbERlZi5zb3J0ID09PSBTb3J0T3JkZXIuREVTQ0VORElORyA/ICctJyA6ICcnKSArIGZpZWxkKG9yZGVyQ2hhbm5lbERlZik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdGltZSBmb3JtYXQgdXNlZCBmb3IgYXhpcyBsYWJlbHMgZm9yIGEgdGltZSB1bml0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZUZvcm1hdChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBzdHJpbmcge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICByZXR1cm4gdGltZUZvcm1hdEV4cHIoZmllbGREZWYudGltZVVuaXQsIGlzQWJicmV2aWF0ZWQobW9kZWwsIGNoYW5uZWwsIGZpZWxkRGVmKSk7XG59XG4iLCIvKipcbiAqIE1vZHVsZSBmb3IgY29tcGlsaW5nIFZlZ2EtbGl0ZSBzcGVjIGludG8gVmVnYSBzcGVjLlxuICovXG5cbmltcG9ydCB7TEFZT1VUfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtub3JtYWxpemUsIEV4dGVuZGVkU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZShpbnB1dFNwZWM6IEV4dGVuZGVkU3BlYykge1xuICAvLyAxLiBDb252ZXJ0IGlucHV0IHNwZWMgaW50byBhIG5vcm1hbCBmb3JtXG4gIC8vIChEZWNvbXBvc2UgYWxsIGV4dGVuZGVkIHVuaXQgc3BlY3MgaW50byBjb21wb3NpdGlvbiBvZiB1bml0IHNwZWMuKVxuICBjb25zdCBzcGVjID0gbm9ybWFsaXplKGlucHV0U3BlYyk7XG5cbiAgLy8gMi4gSW5zdGFudGlhdGUgdGhlIG1vZGVsIHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzXG4gIGNvbnN0IG1vZGVsID0gYnVpbGRNb2RlbChzcGVjLCBudWxsLCAnJyk7XG5cbiAgLy8gMy4gUGFyc2UgZWFjaCBwYXJ0IG9mIHRoZSBtb2RlbCB0byBwcm9kdWNlIGNvbXBvbmVudHMgdGhhdCB3aWxsIGJlIGFzc2VtYmxlZCBsYXRlclxuICAvLyBXZSB0cmF2ZXJzZSB0aGUgd2hvbGUgdHJlZSB0byBwYXJzZSBvbmNlIGZvciBlYWNoIHR5cGUgb2YgY29tcG9uZW50c1xuICAvLyAoZS5nLiwgZGF0YSwgbGF5b3V0LCBtYXJrLCBzY2FsZSkuXG4gIC8vIFBsZWFzZSBzZWUgaW5zaWRlIG1vZGVsLnBhcnNlKCkgZm9yIG9yZGVyIGZvciBjb21waWxhdGlvbi5cbiAgbW9kZWwucGFyc2UoKTtcblxuICAvLyA0LiBBc3NlbWJsZSBhIFZlZ2EgU3BlYyBmcm9tIHRoZSBwYXJzZWQgY29tcG9uZW50cyBpbiAzLlxuICByZXR1cm4gYXNzZW1ibGUobW9kZWwpO1xufVxuXG5mdW5jdGlvbiBhc3NlbWJsZShtb2RlbDogTW9kZWwpIHtcbiAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgLy8gVE9ETzogY2hhbmdlIHR5cGUgdG8gYmVjb21lIFZnU3BlY1xuICBjb25zdCBvdXRwdXQgPSBleHRlbmQoXG4gICAge1xuICAgICAgLy8gU2V0IHNpemUgdG8gMSBiZWNhdXNlIHdlIHJlbHkgb24gcGFkZGluZyBhbnl3YXlcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgcGFkZGluZzogJ2F1dG8nXG4gICAgfSxcbiAgICBjb25maWcudmlld3BvcnQgPyB7IHZpZXdwb3J0OiBjb25maWcudmlld3BvcnQgfSA6IHt9LFxuICAgIGNvbmZpZy5iYWNrZ3JvdW5kID8geyBiYWNrZ3JvdW5kOiBjb25maWcuYmFja2dyb3VuZCB9IDoge30sXG4gICAge1xuICAgICAgLy8gVE9ETzogc2lnbmFsOiBtb2RlbC5hc3NlbWJsZVNlbGVjdGlvblNpZ25hbFxuICAgICAgZGF0YTogW10uY29uY2F0KFxuICAgICAgICBtb2RlbC5hc3NlbWJsZURhdGEoW10pLFxuICAgICAgICBtb2RlbC5hc3NlbWJsZUxheW91dChbXSlcbiAgICAgICAgLy8gVE9ETzogbW9kZWwuYXNzZW1ibGVTZWxlY3Rpb25EYXRhXG4gICAgICApLFxuICAgICAgbWFya3M6IFthc3NlbWJsZVJvb3RHcm91cChtb2RlbCldXG4gICAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzcGVjOiBvdXRwdXRcbiAgICAvLyBUT0RPOiBhZGQgd2FybmluZyAvIGVycm9ycyBoZXJlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZVJvb3RHcm91cChtb2RlbDogTW9kZWwpIHtcbiAgbGV0IHJvb3RHcm91cDphbnkgPSBleHRlbmQoe1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgncm9vdCcpLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICB9LFxuICAgIG1vZGVsLmRlc2NyaXB0aW9uKCkgPyB7ZGVzY3JpcHRpb246IG1vZGVsLmRlc2NyaXB0aW9uKCl9IDoge30sXG4gICAge1xuICAgICAgZnJvbToge2RhdGE6IExBWU9VVH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZTogZXh0ZW5kKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiB7ZmllbGQ6ICd3aWR0aCd9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6ICdoZWlnaHQnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbW9kZWwuYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMobW9kZWwuY29uZmlnKCkuY2VsbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBleHRlbmQocm9vdEdyb3VwLCBtb2RlbC5hc3NlbWJsZUdyb3VwKCkpO1xufVxuIiwiaW1wb3J0IHtYLCBERVRBSUx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge2lzQWdncmVnYXRlLCBoYXN9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7aXNNZWFzdXJlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1BPSU5ULCBMSU5FLCBUSUNLLCBDSVJDTEUsIFNRVUFSRSwgUlVMRSwgTWFya30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIEF1Z21lbnQgY29uZmlnLm1hcmsgd2l0aCBydWxlLWJhc2VkIGRlZmF1bHQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1hcmtDb25maWcobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZykge1xuICAgcmV0dXJuIGV4dGVuZChcbiAgICAgWydmaWxsZWQnLCAnb3BhY2l0eScsICdvcmllbnQnLCAnYWxpZ24nXS5yZWR1Y2UoZnVuY3Rpb24oY2ZnLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgICAgY29uc3QgdmFsdWUgPSBjb25maWcubWFya1twcm9wZXJ0eV07XG4gICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgY2FzZSAnZmlsbGVkJzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAvLyBQb2ludCwgbGluZSwgYW5kIHJ1bGUgYXJlIG5vdCBmaWxsZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBtYXJrICE9PSBQT0lOVCAmJiBtYXJrICE9PSBMSU5FICYmIG1hcmsgIT09IFJVTEU7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgY29udGFpbnMoW1BPSU5ULCBUSUNLLCBDSVJDTEUsIFNRVUFSRV0sIG1hcmspKSB7XG4gICAgICAgICAgICAgLy8gcG9pbnQtYmFzZWQgbWFya3MgYW5kIGJhclxuICAgICAgICAgICAgIGlmICghaXNBZ2dyZWdhdGUoZW5jb2RpbmcpIHx8IGhhcyhlbmNvZGluZywgREVUQUlMKSkge1xuICAgICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IDAuNztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcmllbnQnOlxuICAgICAgICAgICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKGVuY29kaW5nLngpO1xuICAgICAgICAgICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKGVuY29kaW5nLnkpO1xuXG4gICAgICAgICAgIC8vIFdoZW4gdW5hbWJpZ3VvdXMsIGRvIG5vdCBhbGxvdyBvdmVycmlkaW5nXG4gICAgICAgICAgIGlmICh4SXNNZWFzdXJlICYmICF5SXNNZWFzdXJlKSB7XG4gICAgICAgICAgICAgaWYgKG1hcmsgPT09IFRJQ0spIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAndmVydGljYWwnOyAvLyBpbXBsaWNpdGx5IHZlcnRpY2FsXG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAnaG9yaXpvbnRhbCc7IC8vIGltcGxpY2l0bHkgaG9yaXpvbnRhbFxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSBlbHNlIGlmICgheElzTWVhc3VyZSAmJiB5SXNNZWFzdXJlKSB7XG4gICAgICAgICAgICAgaWYgKG1hcmsgPT09IFRJQ0spIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAndmVydGljYWwnO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIC8vIEluIGFtYmlndW91cyBjYXNlcyAoUXhRIG9yIE94TykgdXNlIHNwZWNpZmllZCB2YWx1ZVxuICAgICAgICAgICAvLyAoYW5kIGltcGxpY2l0bHkgdmVydGljYWwgYnkgZGVmYXVsdC4pXG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgLy8gdGV4dC1vbmx5XG4gICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBoYXMoZW5jb2RpbmcsIFgpID8gJ2NlbnRlcicgOiAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGNmZztcbiAgICAgfSwge30pLFxuICAgICBjb25maWcubWFya1xuICAgKTtcbn1cbiIsImltcG9ydCB7YXV0b01heEJpbnN9IGZyb20gJy4uLy4uL2Jpbic7XG5pbXBvcnQge0NoYW5uZWwsIENPTE9SfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7ZmllbGQsIEZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgZmxhdHRlbiwgaGFzaCwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBiaW4ge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PFZnVHJhbnNmb3JtW10+IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGJpbkNvbXBvbmVudCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBjb25zdCBiaW4gPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG4gICAgICBpZiAoYmluKSB7XG4gICAgICAgIGxldCBiaW5UcmFucyA9IGV4dGVuZCh7XG4gICAgICAgICAgdHlwZTogJ2JpbicsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkRGVmLmZpZWxkLFxuICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgc3RhcnQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgICBtaWQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pLFxuICAgICAgICAgICAgZW5kOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgICAvLyBpZiBiaW4gaXMgYW4gb2JqZWN0LCBsb2FkIHBhcmFtZXRlciBoZXJlIVxuICAgICAgICAgIHR5cGVvZiBiaW4gPT09ICdib29sZWFuJyA/IHt9IDogYmluXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFiaW5UcmFucy5tYXhiaW5zICYmICFiaW5UcmFucy5zdGVwKSB7XG4gICAgICAgICAgLy8gaWYgYm90aCBtYXhiaW5zIGFuZCBzdGVwIGFyZSBub3Qgc3BlY2lmaWVkLCBuZWVkIHRvIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lIGJpblxuICAgICAgICAgIGJpblRyYW5zLm1heGJpbnMgPSBhdXRvTWF4QmlucyhjaGFubmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IFtiaW5UcmFuc107XG4gICAgICAgIGNvbnN0IGlzT3JkaW5hbENvbG9yID0gbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgfHwgY2hhbm5lbCA9PT0gQ09MT1I7XG4gICAgICAgIC8vIGNvbG9yIHJhbXAgaGFzIHR5cGUgbGluZWFyIG9yIHRpbWVcbiAgICAgICAgaWYgKGlzT3JkaW5hbENvbG9yKSB7XG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSksXG4gICAgICAgICAgICBleHByOiBmaWVsZChmaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSArXG4gICAgICAgICAgICAnICsgXFwnLVxcJyArICcgK1xuICAgICAgICAgICAgZmllbGQoZmllbGREZWYsIHsgZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRklYTUU6IGN1cnJlbnQgbWVyZ2luZyBsb2dpYyBjYW4gcHJvZHVjZSByZWR1bmRhbnQgdHJhbnNmb3JtcyB3aGVuIGEgZmllbGQgaXMgYmlubmVkIGZvciBjb2xvciBhbmQgZm9yIG5vbi1jb2xvclxuICAgICAgICBjb25zdCBrZXkgPSBoYXNoKGJpbikgKyAnXycgKyBmaWVsZERlZi5maWVsZCArICdvYzonICsgaXNPcmRpbmFsQ29sb3I7XG4gICAgICAgIGJpbkNvbXBvbmVudFtrZXldID0gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgYmluQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBGSVhNRTogY3VycmVudCBtZXJnaW5nIGxvZ2ljIGNhbiBwcm9kdWNlIHJlZHVuZGFudCB0cmFuc2Zvcm1zIHdoZW4gYSBmaWVsZCBpcyBiaW5uZWQgZm9yIGNvbG9yIGFuZCBmb3Igbm9uLWNvbG9yXG4gICAgICBleHRlbmQoYmluQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuYmluKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuYmluO1xuICAgIH1cbiAgICByZXR1cm4gYmluQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgYmluQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKGJpbkNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmJpbik7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuYmluO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKGNvbXBvbmVudC5iaW4pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDT0xPUn0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09SRElOQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGZsYXR0ZW4sIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuLyoqXG4gKiBXZSBuZWVkIHRvIGFkZCBhIHJhbmsgdHJhbnNmb3JtIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGUgcmFuayB2YWx1ZSBhc1xuICogaW5wdXQgZm9yIGNvbG9yIHJhbXAncyBsaW5lYXIgc2NhbGUuXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgY29sb3JSYW5rIHtcbiAgLyoqXG4gICAqIFJldHVybiBoYXNoIGRpY3QgZnJvbSBhIGNvbG9yIGZpZWxkJ3MgbmFtZSB0byB0aGUgc29ydCBhbmQgcmFuayB0cmFuc2Zvcm1zXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBNb2RlbCkge1xuICAgIGxldCBjb2xvclJhbmtDb21wb25lbnQ6IERpY3Q8VmdUcmFuc2Zvcm1bXT4gPSB7fTtcbiAgICBpZiAobW9kZWwuaGFzKENPTE9SKSAmJiBtb2RlbC5maWVsZERlZihDT0xPUikudHlwZSA9PT0gT1JESU5BTCkge1xuICAgICAgY29sb3JSYW5rQ29tcG9uZW50W21vZGVsLmZpZWxkKENPTE9SKV0gPSBbe1xuICAgICAgICB0eXBlOiAnc29ydCcsXG4gICAgICAgIGJ5OiBtb2RlbC5maWVsZChDT0xPUilcbiAgICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ3JhbmsnLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICByYW5rOiBtb2RlbC5maWVsZChDT0xPUiwgeyBwcmVmbjogJ3JhbmtfJyB9KVxuICAgICAgICB9XG4gICAgICB9XTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIGNvbnNpZGVyIG1lcmdpbmdcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIFRPRE86IHdlIGhhdmUgdG8gc2VlIGlmIGNvbG9yIGhhcyB1bmlvbiBzY2FsZSBoZXJlXG5cbiAgICAgIC8vIEZvciBub3csIGxldCdzIGFzc3VtZSBpdCBhbHdheXMgaGFzIHVuaW9uIHNjYWxlXG4gICAgICBjb25zdCBjb2xvclJhbmtDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbms7XG4gICAgICByZXR1cm4gY29sb3JSYW5rQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgRGljdDxWZ1RyYW5zZm9ybVtdPjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGNvbG9yUmFua0NvbXBvbmVudCA9IHt9IGFzIERpY3Q8VmdUcmFuc2Zvcm1bXT47XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgICBleHRlbmQoY29sb3JSYW5rQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbms7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sb3JSYW5rQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBmbGF0dGVuKHZhbHMoY29tcG9uZW50LmNvbG9yUmFuaykpO1xuICB9XG59XG4iLCJpbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uLy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2tleXMsIERpY3QsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLy4uL3VuaXQnO1xuXG5pbXBvcnQge3NvdXJjZX0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHtmb3JtYXRQYXJzZX0gZnJvbSAnLi9mb3JtYXRwYXJzZSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7bm9uUG9zaXRpdmVGaWx0ZXJ9IGZyb20gJy4vbm9ucG9zaXRpdmVudWxsZmlsdGVyJztcbmltcG9ydCB7c3VtbWFyeX0gZnJvbSAnLi9zdW1tYXJ5JztcbmltcG9ydCB7c3RhY2tTY2FsZX0gZnJvbSAnLi9zdGFja3NjYWxlJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHt0aW1lVW5pdERvbWFpbn0gZnJvbSAnLi90aW1ldW5pdGRvbWFpbic7XG5pbXBvcnQge2NvbG9yUmFua30gZnJvbSAnLi9jb2xvcnJhbmsnO1xuXG5cbi8qKlxuICogQ29tcG9zYWJsZSBjb21wb25lbnQgaW5zdGFuY2Ugb2YgYSBtb2RlbCdzIGRhdGEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUNvbXBvbmVudCB7XG4gIHNvdXJjZTogVmdEYXRhO1xuXG4gIC8qKiBNYXBwaW5nIGZyb20gZmllbGQgbmFtZSB0byBwcmltaXRpdmUgZGF0YSB0eXBlLiAgKi9cbiAgZm9ybWF0UGFyc2U6IERpY3Q8c3RyaW5nPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiBmaWVsZHMgZm9yIG51bGwgZmlsdGVyaW5nICovXG4gIG51bGxGaWx0ZXI6IERpY3Q8Ym9vbGVhbj47XG5cbiAgLyoqIEhhc2hzZXQgb2YgYSBmb3JtdWxhIG9iamVjdCAqL1xuICBjYWxjdWxhdGU6IERpY3Q8Rm9ybXVsYT47XG5cbiAgLyoqIEZpbHRlciB0ZXN0IGV4cHJlc3Npb24gKi9cbiAgZmlsdGVyOiBzdHJpbmc7XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBhIGJpbiBwYXJhbWV0ZXIgaGFzaCB0byB0cmFuc2Zvcm1zIG9mIHRoZSBiaW5uZWQgZmllbGQgKi9cbiAgYmluOiBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYW4gb3V0cHV0IGZpZWxkIG5hbWUgKGhhc2gpIHRvIHRoZSB0aW1lIHVuaXQgdHJhbnNmb3JtICAqL1xuICB0aW1lVW5pdDogRGljdDxWZ1RyYW5zZm9ybT47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgZmllbGRzIHRvIGJlIGZpbHRlcmVkICovXG4gIG5vblBvc2l0aXZlRmlsdGVyOiBEaWN0PGJvb2xlYW4+O1xuXG4gIC8qKiBEYXRhIHNvdXJjZSBmb3IgZmVlZGluZyBzdGFja2VkIHNjYWxlLiAqL1xuICAvLyBUT0RPOiBuZWVkIHRvIHJldmlzZSBpZiBzaW5nbGUgVmdEYXRhIGlzIHN1ZmZpY2llbnQgd2l0aCBsYXllciAvIGNvbmNhdFxuICBzdGFja1NjYWxlOiBWZ0RhdGE7XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBhbiBvdXRwdXQgZmllbGQgbmFtZSAoaGFzaCkgdG8gdGhlIHNvcnQgYW5kIHJhbmsgdHJhbnNmb3JtcyAgKi9cbiAgY29sb3JSYW5rOiBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIHRpbWUgdW5pdHMgdGhhdCBuZWVkIHRoZWlyIG93biBkYXRhIHNvdXJjZXMgZm9yIHNjYWxlIGRvbWFpbiAqL1xuICB0aW1lVW5pdERvbWFpbjogU3RyaW5nU2V0O1xuXG4gIC8qKiBBcnJheSBvZiBzdW1tYXJ5IGNvbXBvbmVudCBvYmplY3QgZm9yIHByb2R1Y2luZyBzdW1tYXJ5IChhZ2dyZWdhdGUpIGRhdGEgc291cmNlICovXG4gIHN1bW1hcnk6IFN1bW1hcnlDb21wb25lbnRbXTtcbn1cblxuLyoqXG4gKiBDb21wb3NhYmxlIGNvbXBvbmVudCBmb3IgYSBtb2RlbCdzIHN1bW1hcnkgZGF0YVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN1bW1hcnlDb21wb25lbnQge1xuICAvKiogTmFtZSBvZiB0aGUgc3VtbWFyeSBkYXRhIHNvdXJjZSAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFN0cmluZyBzZXQgZm9yIGFsbCBkaW1lbnNpb24gZmllbGRzICAqL1xuICBkaW1lbnNpb25zOiBTdHJpbmdTZXQ7XG5cbiAgLyoqIGRpY3Rpb25hcnkgbWFwcGluZyBmaWVsZCBuYW1lIHRvIHN0cmluZyBzZXQgb2YgYWdncmVnYXRlIG9wcyAqL1xuICBtZWFzdXJlczogRGljdDxTdHJpbmdTZXQ+O1xufVxuXG4vLyBUT0RPOiBzcGxpdCB0aGlzIGZpbGUgaW50byBtdWx0aXBsZSBmaWxlcyBhbmQgcmVtb3ZlIHRoaXMgbGludGVyIGZsYWdcbi8qIHRzbGludDpkaXNhYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0RGF0YShtb2RlbDogVW5pdE1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgZm9ybWF0UGFyc2U6IGZvcm1hdFBhcnNlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlVW5pdChtb2RlbCksXG4gICAgbm9uUG9zaXRpdmVGaWx0ZXI6IG5vblBvc2l0aXZlRmlsdGVyLnBhcnNlVW5pdChtb2RlbCksXG5cbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGJpbjogYmluLnBhcnNlVW5pdChtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlVW5pdChtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlVW5pdChtb2RlbCksXG4gICAgdGltZVVuaXREb21haW46IHRpbWVVbml0RG9tYWluLnBhcnNlVW5pdChtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VVbml0KG1vZGVsKSxcbiAgICBjb2xvclJhbms6IGNvbG9yUmFuay5wYXJzZVVuaXQobW9kZWwpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0RGF0YShtb2RlbDogRmFjZXRNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBudWxsRmlsdGVyOiBudWxsRmlsdGVyLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcblxuICAgIHNvdXJjZTogc291cmNlLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGJpbjogYmluLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICB0aW1lVW5pdDogdGltZVVuaXQucGFyc2VGYWNldChtb2RlbCksXG4gICAgdGltZVVuaXREb21haW46IHRpbWVVbml0RG9tYWluLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VGYWNldChtb2RlbCksXG4gICAgc3RhY2tTY2FsZTogc3RhY2tTY2FsZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBjb2xvclJhbms6IGNvbG9yUmFuay5wYXJzZUZhY2V0KG1vZGVsKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllckRhdGEobW9kZWw6IExheWVyTW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICAvLyBmaWx0ZXIgYW5kIGZvcm1hdFBhcnNlIGNvdWxkIGNhdXNlIHVzIHRvIG5vdCBiZSBhYmxlIHRvIG1lcmdlIGludG8gcGFyZW50XG4gICAgLy8gc28gbGV0J3MgcGFyc2UgdGhlbSBmaXJzdFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBudWxsRmlsdGVyOiBudWxsRmlsdGVyLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcblxuICAgIC8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgaGVyZSBkb2VzIG5vdCBhZmZlY3Qgd2hldGhlciB3ZSBjYW4gbWVyZ2UgY2hpbGQgZGF0YSBpbnRvIHBhcmVudCBvciBub3RcbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VMYXllcihtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VMYXllcihtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VMYXllcihtb2RlbClcbiAgfTtcbn1cblxuXG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG4vKipcbiAqIENyZWF0ZXMgVmVnYSBEYXRhIGFycmF5IGZyb20gYSBnaXZlbiBjb21waWxlZCBtb2RlbCBhbmQgYXBwZW5kIGFsbCBvZiB0aGVtIHRvIHRoZSBnaXZlbiBhcnJheVxuICpcbiAqIEBwYXJhbSAgbW9kZWxcbiAqIEBwYXJhbSAgZGF0YSBhcnJheVxuICogQHJldHVybiBtb2RpZmllZCBkYXRhIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZURhdGEobW9kZWw6IE1vZGVsLCBkYXRhOiBWZ0RhdGFbXSkge1xuICBjb25zdCBjb21wb25lbnQgPSBtb2RlbC5jb21wb25lbnQuZGF0YTtcblxuICBjb25zdCBzb3VyY2VEYXRhID0gc291cmNlLmFzc2VtYmxlKG1vZGVsLCBjb21wb25lbnQpO1xuICBpZiAoc291cmNlRGF0YSkge1xuICAgIGRhdGEucHVzaChzb3VyY2VEYXRhKTtcbiAgfVxuXG4gIHN1bW1hcnkuYXNzZW1ibGUoY29tcG9uZW50LCBtb2RlbCkuZm9yRWFjaChmdW5jdGlvbihzdW1tYXJ5RGF0YSkge1xuICAgIGRhdGEucHVzaChzdW1tYXJ5RGF0YSk7XG4gIH0pO1xuXG4gIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkYXRhVGFibGUgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG5cbiAgICAvLyBjb2xvciByYW5rXG4gICAgY29uc3QgY29sb3JSYW5rVHJhbnNmb3JtID0gY29sb3JSYW5rLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gICAgaWYgKGNvbG9yUmFua1RyYW5zZm9ybS5sZW5ndGggPiAwKSB7XG4gICAgICBkYXRhVGFibGUudHJhbnNmb3JtID0gKGRhdGFUYWJsZS50cmFuc2Zvcm0gfHwgW10pLmNvbmNhdChjb2xvclJhbmtUcmFuc2Zvcm0pO1xuICAgIH1cblxuICAgIC8vIG5vblBvc2l0aXZlRmlsdGVyXG4gICAgY29uc3Qgbm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0gPSBub25Qb3NpdGl2ZUZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpO1xuICAgIGlmIChub25Qb3NpdGl2ZUZpbHRlclRyYW5zZm9ybS5sZW5ndGggPiAwKSB7XG4gICAgICBkYXRhVGFibGUudHJhbnNmb3JtID0gKGRhdGFUYWJsZS50cmFuc2Zvcm0gfHwgW10pLmNvbmNhdChub25Qb3NpdGl2ZUZpbHRlclRyYW5zZm9ybSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChrZXlzKGNvbXBvbmVudC5jb2xvclJhbmspLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2xvclJhbmsgbm90IG1lcmdlZCcpO1xuICAgIH0gZWxzZSBpZiAoa2V5cyhjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBub25Qb3NpdGl2ZUZpbHRlciBub3QgbWVyZ2VkJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhY2tcbiAgLy8gVE9ETzogcmV2aXNlIGlmIHRoaXMgYWN0dWFsbHkgc2hvdWxkIGJlIGFuIGFycmF5XG4gIGNvbnN0IHN0YWNrRGF0YSA9IHN0YWNrU2NhbGUuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgaWYgKHN0YWNrRGF0YSkge1xuICAgIGRhdGEucHVzaChzdGFja0RhdGEpO1xuICB9XG5cbiAgdGltZVVuaXREb21haW4uYXNzZW1ibGUoY29tcG9uZW50KS5mb3JFYWNoKGZ1bmN0aW9uKHRpbWVVbml0RG9tYWluRGF0YSkge1xuICAgIGRhdGEucHVzaCh0aW1lVW5pdERvbWFpbkRhdGEpO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBmaWx0ZXIge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiBtb2RlbC50cmFuc2Zvcm0oKS5maWx0ZXI7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgZmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlIGJ1dCBoYXMgZmlsdGVyLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIpIHtcbiAgICAgIC8vIG1lcmdlIGJ5IGFkZGluZyAmJlxuICAgICAgZmlsdGVyQ29tcG9uZW50ID1cbiAgICAgICAgKGZpbHRlckNvbXBvbmVudCA/IGZpbHRlckNvbXBvbmVudCArICcgJiYgJyA6ICcnKSArXG4gICAgICAgIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgYGZpbHRlci5wYXJzZUxheWVyYCBtZXRob2QgaXMgY2FsbGVkIGJlZm9yZSBgc291cmNlLnBhcnNlTGF5ZXJgXG4gICAgbGV0IGZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIgPT09IGZpbHRlckNvbXBvbmVudCkge1xuICAgICAgICAvLyBzYW1lIGZpbHRlciBpbiBjaGlsZCBzbyB3ZSBjYW4ganVzdCBkZWxldGUgaXRcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBjb21wb25lbnQuZmlsdGVyO1xuICAgIHJldHVybiBmaWx0ZXIgPyBbe1xuICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICB0ZXN0OiBmaWx0ZXJcbiAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0ZpZWxkRGVmLCBpc0NvdW50fSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybWF0UGFyc2Uge1xuICAvLyBUT0RPOiBuZWVkIHRvIHRha2UgY2FsY3VsYXRlIGludG8gYWNjb3VudCBhY3Jvc3MgbGV2ZWxzIHdoZW4gbWVyZ2luZ1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PHN0cmluZz4ge1xuICAgIGNvbnN0IGNhbGNGaWVsZE1hcCA9IChtb2RlbC50cmFuc2Zvcm0oKS5jYWxjdWxhdGUgfHwgW10pLnJlZHVjZShmdW5jdGlvbihmaWVsZE1hcCwgZm9ybXVsYSkge1xuICAgICAgZmllbGRNYXBbZm9ybXVsYS5maWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZpZWxkTWFwO1xuICAgIH0sIHt9KTtcblxuICAgIGxldCBwYXJzZUNvbXBvbmVudDogRGljdDxzdHJpbmc+ID0ge307XG4gICAgLy8gdXNlIGZvckVhY2ggcmF0aGVyIHRoYW4gcmVkdWNlIHNvIHRoYXQgaXQgY2FuIHJldHVybiB1bmRlZmluZWRcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBwYXJzZSBuZWVkZWRcbiAgICBtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIGlmIChpc0NvdW50KGZpZWxkRGVmKSB8fCBjYWxjRmllbGRNYXBbZmllbGREZWYuZmllbGRdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdudW1iZXInO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCBidXQgaGFzIGl0cyBvd24gcGFyc2UsIHRoZW4gbWVyZ2VcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgIGV4dGVuZChwYXJzZUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSwgcGFyc2VDb21wb25lbnQpKSB7XG4gICAgICAgIC8vIG1lcmdlIHBhcnNlIHVwIGlmIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGFuIGluY29tcGF0aWJsZSBwYXJzZVxuICAgICAgICBleHRlbmQocGFyc2VDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlQ29tcG9uZW50O1xuICB9XG5cbiAgLy8gQXNzZW1ibGUgZm9yIGZvcm1hdFBhcnNlIGlzIGFuIGlkZW50aXR5IGZ1bmN0aW9uLCBubyBuZWVkIHRvIGRlY2xhcmVcbn1cbiIsImltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBoYXNoLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybXVsYSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8Rm9ybXVsYT4ge1xuICAgIHJldHVybiAobW9kZWwudHJhbnNmb3JtKCkuY2FsY3VsYXRlIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oZm9ybXVsYUNvbXBvbmVudCwgZm9ybXVsYSkge1xuICAgICAgZm9ybXVsYUNvbXBvbmVudFtoYXNoKGZvcm11bGEpXSA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PEZvcm11bGE+KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQoZm9ybXVsYUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZSk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpIHtcbiAgICAgICAgZXh0ZW5kKGZvcm11bGFDb21wb25lbnQgfHwge30sIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gdmFscyhjb21wb25lbnQuY2FsY3VsYXRlKS5yZWR1Y2UoZnVuY3Rpb24odHJhbnNmb3JtLCBmb3JtdWxhKSB7XG4gICAgICB0cmFuc2Zvcm0ucHVzaChleHRlbmQoeyB0eXBlOiAnZm9ybXVsYScgfSwgZm9ybXVsYSkpO1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIEZpbHRlciBub24tcG9zaXRpdmUgdmFsdWUgZm9yIGxvZyBzY2FsZVxuICovXG5leHBvcnQgbmFtZXNwYWNlIG5vblBvc2l0aXZlRmlsdGVyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpOiBEaWN0PGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbW9kZWwuY2hhbm5lbHMoKS5yZWR1Y2UoZnVuY3Rpb24obm9uUG9zaXRpdmVDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICBpZiAoIW1vZGVsLmZpZWxkKGNoYW5uZWwpIHx8ICFzY2FsZSkge1xuICAgICAgICAvLyBkb24ndCBzZXQgYW55dGhpbmdcbiAgICAgICAgcmV0dXJuIG5vblBvc2l0aXZlQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgbm9uUG9zaXRpdmVDb21wb25lbnRbbW9kZWwuZmllbGQoY2hhbm5lbCldID0gc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLkxPRztcbiAgICAgIHJldHVybiBub25Qb3NpdGl2ZUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PGJvb2xlYW4+KTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIGNvbnNpZGVyIG1lcmdpbmdcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIEZvciBub3csIGxldCdzIGFzc3VtZSBpdCBhbHdheXMgaGFzIHVuaW9uIHNjYWxlXG4gICAgICBjb25zdCBub25Qb3NpdGl2ZUZpbHRlckNvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICByZXR1cm4gbm9uUG9zaXRpdmVGaWx0ZXJDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBEaWN0PGJvb2xlYW4+O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBub3RlIHRoYXQgd2UgcnVuIHRoaXMgYmVmb3JlIHNvdXJjZS5wYXJzZUxheWVyXG4gICAgbGV0IG5vblBvc2l0aXZlRmlsdGVyID0ge30gYXMgRGljdDxib29sZWFuPjtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpICYmICFkaWZmZXIoY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyLCBub25Qb3NpdGl2ZUZpbHRlcikpIHtcbiAgICAgICAgZXh0ZW5kKG5vblBvc2l0aXZlRmlsdGVyLCBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vblBvc2l0aXZlRmlsdGVyO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBrZXlzKGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gT25seSBmaWx0ZXIgZmllbGRzIChrZXlzKSB3aXRoIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcltmaWVsZF07XG4gICAgfSkubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogJ2RhdHVtLicgKyBmaWVsZCArICcgPiAwJ1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3QgREVGQVVMVF9OVUxMX0ZJTFRFUlMgPSB7XG4gIG5vbWluYWw6IGZhbHNlLFxuICBvcmRpbmFsOiBmYWxzZSxcbiAgcXVhbnRpdGF0aXZlOiB0cnVlLFxuICB0ZW1wb3JhbDogdHJ1ZVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBudWxsRmlsdGVyIHtcbiAgLyoqIFJldHVybiBIYXNoc2V0IG9mIGZpZWxkcyBmb3IgbnVsbCBmaWx0ZXJpbmcgKGtleT1maWVsZCwgdmFsdWUgPSB0cnVlKS4gKi9cbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgY29uc3QgZmlsdGVyTnVsbCA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlck51bGw7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihhZ2dyZWdhdG9yLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWx0ZXJOdWxsIHx8XG4gICAgICAgIChmaWx0ZXJOdWxsID09PSB1bmRlZmluZWQgJiYgZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQgIT09ICcqJyAmJiBERUZBVUxUX05VTExfRklMVEVSU1tmaWVsZERlZi50eXBlXSkpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmaW5lIHRoaXMgc28gd2Uga25vdyB0aGF0IHdlIGRvbid0IGZpbHRlciBudWxscyBmb3IgdGhpcyBmaWVsZFxuICAgICAgICAvLyB0aGlzIG1ha2VzIGl0IGVhc2llciB0byBtZXJnZSBpbnRvIHBhcmVudHNcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuXG4gICAgLy8gRklYTUU6IG51bGwgZmlsdGVycyBhcmUgbm90IHByb3Blcmx5IHByb3BhZ2F0ZWQgcmlnaHQgbm93XG4gICAgbGV0IG51bGxGaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyLCBudWxsRmlsdGVyQ29tcG9uZW50KSkge1xuICAgICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKiBDb252ZXJ0IHRoZSBoYXNoc2V0IG9mIGZpZWxkcyB0byBhIGZpbHRlciB0cmFuc2Zvcm0uICAqL1xuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgY29uc3QgZmlsdGVyZWRGaWVsZHMgPSBrZXlzKGNvbXBvbmVudC5udWxsRmlsdGVyKS5maWx0ZXIoKGZpZWxkKSA9PiB7XG4gICAgICAvLyBvbmx5IGluY2x1ZGUgZmllbGRzIHRoYXQgaGFzIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5udWxsRmlsdGVyW2ZpZWxkXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRGaWVsZHMubGVuZ3RoID4gMCA/XG4gICAgICBbe1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogZmlsdGVyZWRGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkTmFtZSkge1xuICAgICAgICAgIHJldHVybiAnZGF0dW0uJyArIGZpZWxkTmFtZSArICchPT1udWxsJztcbiAgICAgICAgfSkuam9pbignICYmICcpXG4gICAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge1NPVVJDRX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2NvbnRhaW5zfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7bnVsbEZpbHRlcn0gZnJvbSAnLi9udWxsZmlsdGVyJztcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQge2Jpbn0gZnJvbSAnLi9iaW4nO1xuaW1wb3J0IHtmb3JtdWxhfSBmcm9tICcuL2Zvcm11bGEnO1xuaW1wb3J0IHt0aW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc291cmNlIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogVmdEYXRhIHtcbiAgICBsZXQgZGF0YSA9IG1vZGVsLmRhdGEoKTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICAvLyBJZiBkYXRhIGlzIGV4cGxpY2l0bHkgcHJvdmlkZWRcblxuICAgICAgbGV0IHNvdXJjZURhdGE6IFZnRGF0YSA9IHsgbmFtZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKSB9O1xuICAgICAgaWYgKGRhdGEudmFsdWVzICYmIGRhdGEudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc291cmNlRGF0YS52YWx1ZXMgPSBtb2RlbC5kYXRhKCkudmFsdWVzO1xuICAgICAgICBzb3VyY2VEYXRhLmZvcm1hdCA9IHsgdHlwZTogJ2pzb24nIH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgIHNvdXJjZURhdGEudXJsID0gZGF0YS51cmw7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBleHRlbnNpb24gZnJvbSBVUkwgdXNpbmcgc25pcHBldCBmcm9tXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjgwOTI5L2hvdy10by1leHRyYWN0LWV4dGVuc2lvbi1mcm9tLWZpbGVuYW1lLXN0cmluZy1pbi1qYXZhc2NyaXB0XG4gICAgICAgIGxldCBkZWZhdWx0RXh0ZW5zaW9uID0gLyg/OlxcLihbXi5dKykpPyQvLmV4ZWMoc291cmNlRGF0YS51cmwpWzFdO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKFsnanNvbicsICdjc3YnLCAndHN2J10sIGRlZmF1bHRFeHRlbnNpb24pKSB7XG4gICAgICAgICAgZGVmYXVsdEV4dGVuc2lvbiA9ICdqc29uJztcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2VEYXRhLmZvcm1hdCA9IHsgdHlwZTogbW9kZWwuZGF0YSgpLmZvcm1hdFR5cGUgfHwgZGVmYXVsdEV4dGVuc2lvbiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gICAgfSBlbHNlIGlmICghbW9kZWwucGFyZW50KCkpIHtcbiAgICAgIC8vIElmIGRhdGEgaXMgbm90IGV4cGxpY2l0bHkgcHJvdmlkZWQgYnV0IHRoZSBtb2RlbCBpcyBhIHJvb3QsXG4gICAgICAvLyBuZWVkIHRvIHByb2R1Y2UgYSBzb3VyY2UgYXMgd2VsbFxuICAgICAgcmV0dXJuIHsgbmFtZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKSB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IHNvdXJjZURhdGEgPSBwYXJzZShtb2RlbCk7XG4gICAgaWYgKCFtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhLnNvdXJjZSkge1xuICAgICAgLy8gSWYgdGhlIGNoaWxkIGRvZXMgbm90IGhhdmUgaXRzIG93biBzb3VyY2UsIGhhdmUgdG8gcmVuYW1lIGl0cyBzb3VyY2UuXG4gICAgICBtb2RlbC5jaGlsZCgpLnJlbmFtZURhdGEobW9kZWwuY2hpbGQoKS5kYXRhTmFtZShTT1VSQ0UpLCBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IHNvdXJjZURhdGEgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSkge1xuICAgICAgICAvLyB3ZSBjYW5ub3QgbWVyZ2UgaWYgdGhlIGNoaWxkIGhhcyBmaWx0ZXJzIGRlZmluZWQgZXZlbiBhZnRlciB3ZSB0cmllZCB0byBtb3ZlIHRoZW0gdXBcbiAgICAgICAgY29uc3QgY2FuTWVyZ2UgPSAhY2hpbGREYXRhLmZpbHRlciAmJiAhY2hpbGREYXRhLmZvcm1hdFBhcnNlICYmICFjaGlsZERhdGEubnVsbEZpbHRlcjtcbiAgICAgICAgaWYgKGNhbk1lcmdlKSB7XG4gICAgICAgICAgLy8gcmVuYW1lIHNvdXJjZSBiZWNhdXNlIHdlIGNhbiBqdXN0IHJlbW92ZSBpdFxuICAgICAgICAgIGNoaWxkLnJlbmFtZURhdGEoY2hpbGQuZGF0YU5hbWUoU09VUkNFKSwgbW9kZWwuZGF0YU5hbWUoU09VUkNFKSk7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkRGF0YS5zb3VyY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2hpbGQgZG9lcyBub3QgaGF2ZSBkYXRhIGRlZmluZWQgb3IgdGhlIHNhbWUgc291cmNlIHNvIGp1c3QgdXNlIHRoZSBwYXJlbnRzIHNvdXJjZVxuICAgICAgICAgIGNoaWxkRGF0YS5zb3VyY2UgPSB7XG4gICAgICAgICAgICBuYW1lOiBjaGlsZC5kYXRhTmFtZShTT1VSQ0UpLFxuICAgICAgICAgICAgc291cmNlOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKG1vZGVsOiBNb2RlbCwgY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgaWYgKGNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSBjb21wb25lbnQuc291cmNlO1xuXG4gICAgICBpZiAoY29tcG9uZW50LmZvcm1hdFBhcnNlKSB7XG4gICAgICAgIGNvbXBvbmVudC5zb3VyY2UuZm9ybWF0ID0gY29tcG9uZW50LnNvdXJjZS5mb3JtYXQgfHwge307XG4gICAgICAgIGNvbXBvbmVudC5zb3VyY2UuZm9ybWF0LnBhcnNlID0gY29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgICAgfVxuXG4gICAgICAvLyBudWxsIGZpbHRlciBjb21lcyBmaXJzdCBzbyB0cmFuc2Zvcm1zIGFyZSBub3QgcGVyZm9ybWVkIG9uIG51bGwgdmFsdWVzXG4gICAgICAvLyB0aW1lIGFuZCBiaW4gc2hvdWxkIGNvbWUgYmVmb3JlIGZpbHRlciBzbyB3ZSBjYW4gZmlsdGVyIGJ5IHRpbWUgYW5kIGJpblxuICAgICAgc291cmNlRGF0YS50cmFuc2Zvcm0gPSBbXS5jb25jYXQoXG4gICAgICAgIG51bGxGaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgZm9ybXVsYS5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBmaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgYmluLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIHRpbWVVbml0LmFzc2VtYmxlKGNvbXBvbmVudClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtTVEFDS0VEX1NDQUxFLCBTVU1NQVJZfSBmcm9tICcuLi8uLi9kYXRhJztcbmltcG9ydCB7ZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vLi4vdW5pdCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG4vKipcbiAqIFN0YWNrZWQgc2NhbGUgZGF0YSBzb3VyY2UsIGZvciBmZWVkaW5nIHRoZSBzaGFyZWQgc2NhbGUuXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2Ugc3RhY2tTY2FsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IFVuaXRNb2RlbCk6IFZnRGF0YSB7XG4gICAgY29uc3Qgc3RhY2tQcm9wcyA9IG1vZGVsLnN0YWNrKCk7XG5cbiAgICBpZiAoc3RhY2tQcm9wcykge1xuICAgICAgLy8gcHJvZHVjZSBzdGFja2VkIHNjYWxlXG4gICAgICBjb25zdCBncm91cGJ5Q2hhbm5lbCA9IHN0YWNrUHJvcHMuZ3JvdXBieUNoYW5uZWw7XG4gICAgICBjb25zdCBmaWVsZENoYW5uZWwgPSBzdGFja1Byb3BzLmZpZWxkQ2hhbm5lbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpLCAvLyBhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAvLyBncm91cCBieSBjaGFubmVsIGFuZCBvdGhlciBmYWNldHNcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoZ3JvdXBieUNoYW5uZWwpXSxcbiAgICAgICAgICAvLyBwcm9kdWNlIHN1bSBvZiB0aGUgZmllbGQncyB2YWx1ZSBlLmcuLCBzdW0gb2Ygc3VtLCBzdW0gb2YgZGlzdGluY3RcbiAgICAgICAgICBzdW1tYXJpemU6IFt7IG9wczogWydzdW0nXSwgZmllbGQ6IG1vZGVsLmZpZWxkKGZpZWxkQ2hhbm5lbCkgfV1cbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIGJ1dCBoYXMgc3RhY2sgc2NhbGUgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlKSB7XG4gICAgICBsZXQgc3RhY2tDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQuc3RhY2tTY2FsZTtcblxuICAgICAgY29uc3QgbmV3TmFtZSA9IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpO1xuICAgICAgY2hpbGQucmVuYW1lRGF0YShzdGFja0NvbXBvbmVudC5uYW1lLCBuZXdOYW1lKTtcbiAgICAgIHN0YWNrQ29tcG9uZW50Lm5hbWUgPSBuZXdOYW1lO1xuXG4gICAgICAvLyBSZWZlciB0byBmYWNldCdzIHN1bW1hcnkgaW5zdGVhZCAoYWx3YXlzIHN1bW1hcnkgYmVjYXVzZSBzdGFja2VkIG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGlvbilcbiAgICAgIHN0YWNrQ29tcG9uZW50LnNvdXJjZSA9IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpO1xuXG4gICAgICAvLyBBZGQgbW9yZSBkaW1lbnNpb25zIGZvciByb3cvY29sdW1uXG4gICAgICBzdGFja0NvbXBvbmVudC50cmFuc2Zvcm1bMF0uZ3JvdXBieSA9IG1vZGVsLnJlZHVjZShmdW5jdGlvbihncm91cGJ5LCBmaWVsZERlZikge1xuICAgICAgICBncm91cGJ5LnB1c2goZmllbGQoZmllbGREZWYpKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwYnk7XG4gICAgICB9LCBzdGFja0NvbXBvbmVudC50cmFuc2Zvcm1bMF0uZ3JvdXBieSk7XG5cbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3RhY2tTY2FsZTtcbiAgICAgIHJldHVybiBzdGFja0NvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gY29tcG9uZW50LnN0YWNrU2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uLy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtmaWVsZCwgRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7a2V5cywgdmFscywgcmVkdWNlLCBoYXNoLCBEaWN0LCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50LCBTdW1tYXJ5Q29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3VtbWFyeSB7XG4gIGZ1bmN0aW9uIGFkZERpbWVuc2lvbihkaW1zOiB7IFtmaWVsZDogc3RyaW5nXTogYm9vbGVhbiB9LCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSldID0gdHJ1ZTtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSldID0gdHJ1ZTtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX2VuZCcgfSldID0gdHJ1ZTtcblxuICAgICAgLy8gY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgIC8vIGlmIChzY2FsZVR5cGUoc2NhbGUsIGZpZWxkRGVmLCBjaGFubmVsLCBtb2RlbC5tYXJrKCkpID09PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gYWxzbyBwcm9kdWNlIGJpbl9yYW5nZSBpZiB0aGUgYmlubmVkIGZpZWxkIHVzZSBvcmRpbmFsIHNjYWxlXG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSldID0gdHJ1ZTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZildID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpbXM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgLyogc3RyaW5nIHNldCBmb3IgZGltZW5zaW9ucyAqL1xuICAgIGxldCBkaW1zOiBTdHJpbmdTZXQgPSB7fTtcblxuICAgIC8qIGRpY3Rpb25hcnkgbWFwcGluZyBmaWVsZCBuYW1lID0+IGRpY3Qgc2V0IG9mIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9ucyAqL1xuICAgIGxldCBtZWFzOiBEaWN0PFN0cmluZ1NldD4gPSB7fTtcblxuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UKSB7XG4gICAgICAgICAgbWVhc1snKiddID0gbWVhc1snKiddIHx8IHt9O1xuICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLXN0cmluZy1saXRlcmFsICovXG4gICAgICAgICAgbWVhc1snKiddWydjb3VudCddID0gdHJ1ZTtcbiAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXN0cmluZy1saXRlcmFsICovXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVhc1tmaWVsZERlZi5maWVsZF0gPSBtZWFzW2ZpZWxkRGVmLmZpZWxkXSB8fCB7fTtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXVtmaWVsZERlZi5hZ2dyZWdhdGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkRGltZW5zaW9uKGRpbXMsIGZpZWxkRGVmKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBbe1xuICAgICAgbmFtZTogbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSksXG4gICAgICBkaW1lbnNpb25zOiBkaW1zLFxuICAgICAgbWVhc3VyZXM6IG1lYXNcbiAgICB9XTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UgYnV0IGhhcyBhIHN1bW1hcnkgZGF0YSBzb3VyY2UsIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICBsZXQgc3VtbWFyeUNvbXBvbmVudHMgPSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeS5tYXAoZnVuY3Rpb24oc3VtbWFyeUNvbXBvbmVudCkge1xuICAgICAgICAvLyBhZGQgZmFjZXQgZmllbGRzIGFzIGRpbWVuc2lvbnNcbiAgICAgICAgc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zID0gbW9kZWwucmVkdWNlKGFkZERpbWVuc2lvbiwgc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zKTtcblxuICAgICAgICBjb25zdCBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXggPSBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUuc3Vic3RyKG1vZGVsLmNoaWxkKCkubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgbW9kZWwuY2hpbGQoKS5yZW5hbWVEYXRhKHN1bW1hcnlDb21wb25lbnQubmFtZSwgc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4KTtcbiAgICAgICAgc3VtbWFyeUNvbXBvbmVudC5uYW1lID0gc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4O1xuICAgICAgICByZXR1cm4gc3VtbWFyeUNvbXBvbmVudDtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnk7XG4gICAgICByZXR1cm4gc3VtbWFyeUNvbXBvbmVudHM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlTWVhc3VyZXMocGFyZW50TWVhc3VyZXM6IERpY3Q8RGljdDxib29sZWFuPj4sIGNoaWxkTWVhc3VyZXM6IERpY3Q8RGljdDxib29sZWFuPj4pIHtcbiAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGNoaWxkTWVhc3VyZXMpIHtcbiAgICAgIGlmIChjaGlsZE1lYXN1cmVzLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuICAgICAgICAvLyB3aGVuIHdlIG1lcmdlIGEgbWVhc3VyZSwgd2UgZWl0aGVyIGhhdmUgdG8gYWRkIGFuIGFnZ3JlZ2F0aW9uIG9wZXJhdG9yIG9yIGV2ZW4gYSBuZXcgZmllbGRcbiAgICAgICAgY29uc3Qgb3BzID0gY2hpbGRNZWFzdXJlc1tmaWVsZF07XG4gICAgICAgIGZvciAoY29uc3Qgb3AgaW4gb3BzKSB7XG4gICAgICAgICAgaWYgKG9wcy5oYXNPd25Qcm9wZXJ0eShvcCkpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZCBpbiBwYXJlbnRNZWFzdXJlcykge1xuICAgICAgICAgICAgICAvLyBhZGQgb3BlcmF0b3IgdG8gZXhpc3RpbmcgbWVhc3VyZSBmaWVsZFxuICAgICAgICAgICAgICBwYXJlbnRNZWFzdXJlc1tmaWVsZF1bb3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcmVudE1lYXN1cmVzW2ZpZWxkXSA9IHsgb3A6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgLy8gSW5kZXggYnkgdGhlIGZpZWxkcyB3ZSBhcmUgZ3JvdXBpbmcgYnlcbiAgICBsZXQgc3VtbWFyaWVzID0ge30gYXMgRGljdDxTdW1tYXJ5Q29tcG9uZW50PjtcblxuICAgIC8vIENvbWJpbmUgc3VtbWFyaWVzIGZvciBjaGlsZHJlbiB0aGF0IGRvbid0IGhhdmUgYSBkaXN0aW5jdCBzb3VyY2VcbiAgICAvLyAoZWl0aGVyIGhhdmluZyBpdHMgb3duIGRhdGEgc291cmNlLCBvciBpdHMgb3duIHRyYW5mb3JtYXRpb24gb2YgdGhlIHNhbWUgZGF0YSBzb3VyY2UpLlxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBzdW1tYXJpZXMgaWYgd2UgY2FuXG4gICAgICAgIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5LmZvckVhY2goKGNoaWxkU3VtbWFyeSkgPT4ge1xuICAgICAgICAgIC8vIFRoZSBrZXkgaXMgYSBoYXNoIGJhc2VkIG9uIHRoZSBkaW1lbnNpb25zO1xuICAgICAgICAgIC8vIHdlIHVzZSBpdCB0byBmaW5kIG91dCB3aGV0aGVyIHdlIGhhdmUgYSBzdW1tYXJ5IHRoYXQgdXNlcyB0aGUgc2FtZSBncm91cCBieSBmaWVsZHMuXG4gICAgICAgICAgY29uc3Qga2V5ID0gaGFzaChjaGlsZFN1bW1hcnkuZGltZW5zaW9ucyk7XG4gICAgICAgICAgaWYgKGtleSBpbiBzdW1tYXJpZXMpIHtcbiAgICAgICAgICAgIC8vIHllcywgdGhlcmUgaXMgYSBzdW1tYXJ5IGhhdCB3ZSBuZWVkIHRvIG1lcmdlIGludG9cbiAgICAgICAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgZGltZW5zaW9ucyBhcmUgdGhlIHNhbWUgc28gd2Ugb25seSBuZWVkIHRvIG1lcmdlIHRoZSBtZWFzdXJlc1xuICAgICAgICAgICAgbWVyZ2VNZWFzdXJlcyhzdW1tYXJpZXNba2V5XS5tZWFzdXJlcywgY2hpbGRTdW1tYXJ5Lm1lYXN1cmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2l2ZSB0aGUgc3VtbWFyeSBhIG5ldyBuYW1lXG4gICAgICAgICAgICBjaGlsZFN1bW1hcnkubmFtZSA9IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpICsgJ18nICsga2V5cyhzdW1tYXJpZXMpLmxlbmd0aDtcbiAgICAgICAgICAgIHN1bW1hcmllc1trZXldID0gY2hpbGRTdW1tYXJ5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbW92ZSBzdW1tYXJ5IGZyb20gY2hpbGRcbiAgICAgICAgICBjaGlsZC5yZW5hbWVEYXRhKGNoaWxkLmRhdGFOYW1lKFNVTU1BUlkpLCBzdW1tYXJpZXNba2V5XS5uYW1lKTtcbiAgICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHMoc3VtbWFyaWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlbWJsZSB0aGUgc3VtbWFyeS4gTmVlZHMgYSByZW5hbWUgZnVuY3Rpb24gYmVjYXVzZSB3ZSBjYW5ub3QgZ3VhcmFudGVlIHRoYXQgdGhlXG4gICAqIHBhcmVudCBkYXRhIGJlZm9yZSB0aGUgY2hpbGRyZW4gZGF0YS5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQsIG1vZGVsOiBNb2RlbCk6IFZnRGF0YVtdIHtcbiAgICBpZiAoIWNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc3VtbWFyeS5yZWR1Y2UoZnVuY3Rpb24oc3VtbWFyeURhdGEsIHN1bW1hcnlDb21wb25lbnQpIHtcbiAgICAgIGNvbnN0IGRpbXMgPSBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnM7XG4gICAgICBjb25zdCBtZWFzID0gc3VtbWFyeUNvbXBvbmVudC5tZWFzdXJlcztcblxuICAgICAgY29uc3QgZ3JvdXBieSA9IGtleXMoZGltcyk7XG5cbiAgICAgIC8vIHNob3J0LWZvcm1hdCBzdW1tYXJpemUgb2JqZWN0IGZvciBWZWdhJ3MgYWdncmVnYXRlIHRyYW5zZm9ybVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS93aWtpL0RhdGEtVHJhbnNmb3JtcyMtYWdncmVnYXRlXG4gICAgICBjb25zdCBzdW1tYXJpemUgPSByZWR1Y2UobWVhcywgZnVuY3Rpb24oYWdncmVnYXRvciwgZm5EaWN0U2V0LCBmaWVsZCkge1xuICAgICAgICBhZ2dyZWdhdG9yW2ZpZWxkXSA9IGtleXMoZm5EaWN0U2V0KTtcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0b3I7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIGlmIChrZXlzKG1lYXMpLmxlbmd0aCA+IDApIHsgLy8gaGFzIGFnZ3JlZ2F0ZVxuICAgICAgICBzdW1tYXJ5RGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUsXG4gICAgICAgICAgc291cmNlOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpLFxuICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgZ3JvdXBieTogZ3JvdXBieSxcbiAgICAgICAgICAgIHN1bW1hcml6ZTogc3VtbWFyaXplXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VtbWFyeURhdGE7XG4gICAgfSwgW10pO1xuICB9XG59XG4iLCJpbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtmaWVsZCwgRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZUV4cHJlc3Npb259IGZyb20gJy4vLi4vdGltZSc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIHRpbWVVbml0IHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxWZ1RyYW5zZm9ybT4ge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXRDb21wb25lbnQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgcmVmID0gZmllbGQoZmllbGREZWYsIHsgbm9mbjogdHJ1ZSwgZGF0dW06IHRydWUgfSk7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgZmllbGREZWYudGltZVVuaXQpIHtcblxuICAgICAgICBjb25zdCBoYXNoID0gZmllbGQoZmllbGREZWYpO1xuXG4gICAgICAgIHRpbWVVbml0Q29tcG9uZW50W2hhc2hdID0ge1xuICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpLFxuICAgICAgICAgIGV4cHI6IHBhcnNlRXhwcmVzc2lvbihmaWVsZERlZi50aW1lVW5pdCwgcmVmKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCB0aW1lVW5pdENvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKHRpbWVVbml0Q29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdDtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgdGltZVVuaXRDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKHRpbWVVbml0Q29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICAvLyBqdXN0IGpvaW4gdGhlIHZhbHVlcywgd2hpY2ggYXJlIGFscmVhZHkgdHJhbnNmb3Jtc1xuICAgIHJldHVybiB2YWxzKGNvbXBvbmVudC50aW1lVW5pdCk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi8uLi90aW1ldW5pdCc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgU3RyaW5nU2V0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5pbXBvcnQge3BhcnNlRXhwcmVzc2lvbiwgcmF3RG9tYWlufSBmcm9tICcuLy4uL3RpbWUnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSB0aW1lVW5pdERvbWFpbiB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFN0cmluZ1NldCB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdERvbWFpbk1hcCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgY29uc3QgZG9tYWluID0gcmF3RG9tYWluKGZpZWxkRGVmLnRpbWVVbml0LCBjaGFubmVsKTtcbiAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgIHRpbWVVbml0RG9tYWluTWFwW2ZpZWxkRGVmLnRpbWVVbml0XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lVW5pdERvbWFpbk1hcDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICAvLyBhbHdheXMgbWVyZ2Ugd2l0aCBjaGlsZFxuICAgIHJldHVybiBleHRlbmQocGFyc2UobW9kZWwpLCBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhLnRpbWVVbml0RG9tYWluKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gYWx3YXlzIG1lcmdlIHdpdGggY2hpbGRyZW5cbiAgICByZXR1cm4gZXh0ZW5kKHBhcnNlKG1vZGVsKSwgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgcmV0dXJuIGNoaWxkLmNvbXBvbmVudC5kYXRhLnRpbWVVbml0RG9tYWluO1xuICAgIH0pKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGtleXMoY29tcG9uZW50LnRpbWVVbml0RG9tYWluKS5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXREYXRhLCB0dTogYW55KSB7XG4gICAgICBjb25zdCB0aW1lVW5pdDogVGltZVVuaXQgPSB0dTsgLy8gY2FzdCBzdHJpbmcgYmFjayB0byBlbnVtXG4gICAgICBjb25zdCBkb21haW4gPSByYXdEb21haW4odGltZVVuaXQsIG51bGwpOyAvLyBGSVhNRSBmaXggcmF3RG9tYWluIHNpZ25hdHVyZVxuICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICB0aW1lVW5pdERhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZTogdGltZVVuaXQsXG4gICAgICAgICAgdmFsdWVzOiBkb21haW4sXG4gICAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgICAgZmllbGQ6ICdkYXRlJyxcbiAgICAgICAgICAgIGV4cHI6IHBhcnNlRXhwcmVzc2lvbih0aW1lVW5pdCwgJ2RhdHVtLmRhdGEnLCB0cnVlKVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0RGF0YTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7QXhpc09yaWVudCwgQXhpc30gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtGYWNldH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ0ZvckVhY2h9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWYsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7RmFjZXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHZhbHMsIGZsYXR0ZW4sIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhLCBWZ01hcmtHcm91cH0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge3BhcnNlQXhpcywgcGFyc2VJbm5lckF4aXMsIGdyaWRTaG93LCBwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZUZhY2V0RGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VGYWNldExheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3BhcnNlU2NhbGVDb21wb25lbnR9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgRmFjZXRNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfZmFjZXQ6IEZhY2V0O1xuXG4gIHByaXZhdGUgX2NoaWxkOiBNb2RlbDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBGYWNldFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgLy8gQ29uZmlnIG11c3QgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIGNoaWxkIGFzIGl0IGdldHMgY2FzY2FkZWQgdG8gdGhlIGNoaWxkXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcblxuICAgIGNvbnN0IGNoaWxkICA9IHRoaXMuX2NoaWxkID0gYnVpbGRNb2RlbChzcGVjLnNwZWMsIHRoaXMsIHRoaXMubmFtZSgnY2hpbGQnKSk7XG5cbiAgICBjb25zdCBmYWNldCAgPSB0aGlzLl9mYWNldCA9IHRoaXMuX2luaXRGYWNldChzcGVjLmZhY2V0KTtcbiAgICB0aGlzLl9zY2FsZSAgPSB0aGlzLl9pbml0U2NhbGUoZmFjZXQsIGNvbmZpZywgY2hpbGQpO1xuICAgIHRoaXMuX2F4aXMgICA9IHRoaXMuX2luaXRBeGlzKGZhY2V0LCBjb25maWcsIGNoaWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHNwZWNDb25maWcsIHBhcmVudCA/IHBhcmVudC5jb25maWcoKSA6IHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGYWNldChmYWNldDogRmFjZXQpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZmFjZXQgPSBkdXBsaWNhdGUoZmFjZXQpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgZmFjZXQsIGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgLy8gVE9ETzogaWYgaGFzIG5vIGZpZWxkIC8gZGF0dW0sIHRoZW4gZHJvcCB0aGUgZmllbGRcblxuICAgICAgaWYgKCFpc0RpbWVuc2lvbihmaWVsZERlZikpIHtcbiAgICAgICAgbW9kZWwuYWRkV2FybmluZyhjaGFubmVsICsgJyBlbmNvZGluZyBzaG91bGQgYmUgb3JkaW5hbC4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhY2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKGZhY2V0OiBGYWNldCwgY29uZmlnOiBDb25maWcsIGNoaWxkOiBNb2RlbCk6IERpY3Q8U2NhbGU+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX3NjYWxlLCBjaGFubmVsKSB7XG4gICAgICBpZiAoZmFjZXRbY2hhbm5lbF0pIHtcblxuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSBmYWNldFtjaGFubmVsXS5zY2FsZSB8fCB7fTtcbiAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICAgICAgICByb3VuZDogY29uZmlnLmZhY2V0LnNjYWxlLnJvdW5kLFxuXG4gICAgICAgICAgLy8gVE9ETzogcmV2aXNlIHRoaXMgcnVsZSBmb3IgbXVsdGlwbGUgbGV2ZWwgb2YgbmVzdGluZ1xuICAgICAgICAgIHBhZGRpbmc6IChjaGFubmVsID09PSBST1cgJiYgY2hpbGQuaGFzKFkpKSB8fCAoY2hhbm5lbCA9PT0gQ09MVU1OICYmIGNoaWxkLmhhcyhYKSkgP1xuICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mYWNldC5zY2FsZS5wYWRkaW5nIDogMFxuICAgICAgICB9LCBzY2FsZVNwZWMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXhpcyhmYWNldDogRmFjZXQsIGNvbmZpZzogQ29uZmlnLCBjaGlsZDogTW9kZWwpOiBEaWN0PEF4aXM+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX2F4aXMsIGNoYW5uZWwpIHtcbiAgICAgIGlmIChmYWNldFtjaGFubmVsXSkge1xuICAgICAgICBjb25zdCBheGlzU3BlYyA9IGZhY2V0W2NoYW5uZWxdLmF4aXM7XG4gICAgICAgIGlmIChheGlzU3BlYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbEF4aXMgPSBfYXhpc1tjaGFubmVsXSA9IGV4dGVuZCh7fSxcbiAgICAgICAgICAgIGNvbmZpZy5mYWNldC5heGlzLFxuICAgICAgICAgICAgYXhpc1NwZWMgPT09IHRydWUgPyB7fSA6IGF4aXNTcGVjIHx8IHt9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChjaGFubmVsID09PSBST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzOiBhbnkgPSBjaGlsZC5heGlzKFkpO1xuICAgICAgICAgICAgaWYgKHlBeGlzICYmIHlBeGlzLm9yaWVudCAhPT0gQXhpc09yaWVudC5SSUdIVCAmJiAhbW9kZWxBeGlzLm9yaWVudCkge1xuICAgICAgICAgICAgICBtb2RlbEF4aXMub3JpZW50ID0gQXhpc09yaWVudC5SSUdIVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCBjaGlsZC5oYXMoWCkgJiYgIW1vZGVsQXhpcy5sYWJlbEFuZ2xlKSB7XG4gICAgICAgICAgICAgIG1vZGVsQXhpcy5sYWJlbEFuZ2xlID0gbW9kZWxBeGlzLm9yaWVudCA9PT0gQXhpc09yaWVudC5SSUdIVCA/IDkwIDogMjcwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9heGlzO1xuICAgIH0sIHt9IGFzIERpY3Q8QXhpcz4pO1xuICB9XG5cbiAgcHVibGljIGZhY2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9mYWNldDtcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2ZhY2V0W2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGNoaWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzU3VtbWFyeSgpIHtcbiAgICBjb25zdCBzdW1tYXJ5ID0gdGhpcy5jb21wb25lbnQuZGF0YS5zdW1tYXJ5O1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHN1bW1hcnkubGVuZ3RoIDsgaSsrKSB7XG4gICAgICBpZiAoa2V5cyhzdW1tYXJ5W2ldLm1lYXN1cmVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmhhc1N1bW1hcnkoKSA/IFNVTU1BUlkgOiBTT1VSQ0UpICsgJyc7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldCgpW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCkge1xuICAgIHJldHVybiBudWxsOyAvLyB0aGlzIGlzIG9ubHkgYSBwcm9wZXJ0eSBmb3IgVW5pdE1vZGVsXG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZURhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5kYXRhID0gcGFyc2VGYWNldERhdGEodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTZWxlY3Rpb25EYXRhKCkge1xuICAgIC8vIFRPRE86IEBhcnZpbmQgY2FuIHdyaXRlIHRoaXNcbiAgICAvLyBXZSBtaWdodCBuZWVkIHRvIHNwbGl0IHRoaXMgaW50byBjb21waWxlU2VsZWN0aW9uRGF0YSBhbmQgY29tcGlsZVNlbGVjdGlvblNpZ25hbHM/XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMYXlvdXREYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZUZhY2V0TGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkKCk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBzY2FsZXMgZm9yIGZpZWxkIHJlZmVyZW5jZSBvZiBwYXJlbnQgZGF0YSAoZS5nLiwgZm9yIFNQTE9NKVxuXG4gICAgLy8gRmlyc3QsIGFkZCBzY2FsZSBmb3Igcm93IGFuZCBjb2x1bW4uXG4gICAgbGV0IHNjYWxlQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuc2NhbGUgPSBwYXJzZVNjYWxlQ29tcG9uZW50KHRoaXMpO1xuXG4gICAgLy8gVGhlbiwgbW92ZSBzaGFyZWQvdW5pb24gZnJvbSBpdHMgY2hpbGQgc3BlYy5cbiAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5zY2FsZSkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAvLyBUT0RPOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggc2NhbGUsIG5lZWQgdG8gcmVuYW1lXG4gICAgICAgIHZhbHMoc2NhbGVDb21wb25lbnRbY2hhbm5lbF0pLmZvckVhY2goZnVuY3Rpb24oc2NhbGUpIHtcbiAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuc2NhbGVOYW1lKHNjYWxlTmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICAgIGNoaWxkLnJlbmFtZVNjYWxlKHNjYWxlLm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmNlIHB1dCBpbiBwYXJlbnQsIGp1c3QgcmVtb3ZlIHRoZSBjaGlsZCdzIHNjYWxlLlxuICAgICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VNYXJrKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5tYXJrID0gZXh0ZW5kKFxuICAgICAge1xuICAgICAgICBuYW1lOiB0aGlzLm5hbWUoJ2NlbGwnKSxcbiAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAgIHRoaXMuZGF0YVRhYmxlKCkgPyB7ZGF0YTogdGhpcy5kYXRhVGFibGUoKX0gOiB7fSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdmYWNldCcsXG4gICAgICAgICAgICAgIGdyb3VwYnk6IFtdLmNvbmNhdChcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhST1cpID8gW3RoaXMuZmllbGQoUk9XKV0gOiBbXSxcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhDT0xVTU4pID8gW3RoaXMuZmllbGQoQ09MVU1OKV0gOiBbXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVwZGF0ZTogZ2V0RmFjZXRHcm91cFByb3BlcnRpZXModGhpcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIENhbGwgY2hpbGQncyBhc3NlbWJsZUdyb3VwIHRvIGFkZCBtYXJrcywgc2NhbGVzLCBheGVzLCBhbmQgbGVnZW5kcy5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4gY2FsbCBjaGlsZCdzIGFzc2VtYmxlR3JvdXAoKSBoZXJlIGJlY2F1c2UgcGFyc2VNYXJrKClcbiAgICAgIC8vIGlzIHRoZSBsYXN0IG1ldGhvZCBpbiBjb21waWxlKCkgYW5kIHRodXMgdGhlIGNoaWxkIGlzIGNvbXBsZXRlbHkgY29tcGlsZWRcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLmNoaWxkKCkuYXNzZW1ibGVHcm91cCgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlQXhpcygpO1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1JPVywgQ09MVU1OXSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgLy8gVE9ETzogd2l0aCBuZXN0aW5nLCB3ZSBtaWdodCBuZWVkIHRvIGNvbnNpZGVyIGNhbGxpbmcgY2hpbGRcbiAgICAvLyB0aGlzLmNoaWxkKCkucGFyc2VBeGlzR3JvdXAoKTtcblxuICAgIGNvbnN0IHhBeGlzR3JvdXAgPSBwYXJzZUF4aXNHcm91cCh0aGlzLCBYKTtcbiAgICBjb25zdCB5QXhpc0dyb3VwID0gcGFyc2VBeGlzR3JvdXAodGhpcywgWSk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5heGlzR3JvdXAgPSBleHRlbmQoXG4gICAgICB4QXhpc0dyb3VwID8ge3g6IHhBeGlzR3JvdXB9IDoge30sXG4gICAgICB5QXhpc0dyb3VwID8ge3k6IHlBeGlzR3JvdXB9IDoge31cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIC8vIFRPRE86IHdpdGggbmVzdGluZywgd2UgbWlnaHQgbmVlZCB0byBjb25zaWRlciBjYWxsaW5nIGNoaWxkXG4gICAgLy8gdGhpcy5jaGlsZCgpLnBhcnNlR3JpZEdyb3VwKCk7XG5cbiAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGQoKTtcblxuICAgIHRoaXMuY29tcG9uZW50LmdyaWRHcm91cCA9IGV4dGVuZChcbiAgICAgICFjaGlsZC5oYXMoWCkgJiYgdGhpcy5oYXMoQ09MVU1OKSA/IHsgY29sdW1uOiBnZXRDb2x1bW5HcmlkR3JvdXBzKHRoaXMpIH0gOiB7fSxcbiAgICAgICFjaGlsZC5oYXMoWSkgJiYgdGhpcy5oYXMoUk9XKSA/IHsgcm93OiBnZXRSb3dHcmlkR3JvdXBzKHRoaXMpIH0gOiB7fVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgaW5kZXBlbmRlbnQgbm9uLXBvc2l0aW9uIHNjYWxlIGFjcm9zcyBmYWNldHNcbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgZmllbGQgcmVmZXJlbmNlIG9mIHBhcmVudCBkYXRhIChlLmcuLCBmb3IgU1BMT00pXG5cbiAgICAvLyBGb3Igbm93LCBhc3N1bWluZyB0aGF0IG5vbi1wb3NpdGlvbmFsIHNjYWxlcyBhcmUgYWx3YXlzIHNoYXJlZCBhY3Jvc3MgZmFjZXRzXG4gICAgLy8gVGh1cywganVzdCBtb3ZlIGFsbCBsZWdlbmRzIGZyb20gaXRzIGNoaWxkXG4gICAgdGhpcy5jb21wb25lbnQubGVnZW5kID0gdGhpcy5fY2hpbGQuY29tcG9uZW50LmxlZ2VuZDtcbiAgICB0aGlzLl9jaGlsZC5jb21wb25lbnQubGVnZW5kID0ge307XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFByZWZpeCB0cmF2ZXJzYWwg4oCTIHBhcmVudCBkYXRhIG1pZ2h0IGJlIHJlZmVycmVkIGJ5IGNoaWxkcmVuIGRhdGFcbiAgICBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkLmFzc2VtYmxlRGF0YShkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQb3N0Zml4IHRyYXZlcnNhbCDigJMgbGF5b3V0IGlzIGFzc2VtYmxlZCBib3R0b20tdXBcbiAgICB0aGlzLl9jaGlsZC5hc3NlbWJsZUxheW91dChsYXlvdXREYXRhKTtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChcbiAgICAgIC8vIGF4aXNHcm91cCBpcyBhIG1hcHBpbmcgdG8gVmdNYXJrR3JvdXBcbiAgICAgIHZhbHModGhpcy5jb21wb25lbnQuYXhpc0dyb3VwKSxcbiAgICAgIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5ncmlkR3JvdXApKSxcbiAgICAgIHRoaXMuY29tcG9uZW50Lm1hcmtcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcHBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZhY2V0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8vIFRPRE86IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIGZpbGUgaW50byBGYWNldE1vZGVsIGlmIHBvc3NpYmxlXG5cbmZ1bmN0aW9uIGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgY29uc3QgbWVyZ2VkQ2VsbENvbmZpZyA9IGV4dGVuZCh7fSwgY2hpbGQuY29uZmlnKCkuY2VsbCwgY2hpbGQuY29uZmlnKCkuZmFjZXQuY2VsbCk7XG5cbiAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICB4OiBtb2RlbC5oYXMoQ09MVU1OKSA/IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShDT0xVTU4pLnBhZGRpbmcgLyAyXG4gICAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgeTogbW9kZWwuaGFzKFJPVykgPyB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgd2lkdGg6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnd2lkdGgnKX19LFxuICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ2hlaWdodCcpfX1cbiAgICB9LFxuICAgIGNoaWxkLmFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKG1lcmdlZENlbGxDb25maWcpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXhpc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8vIFRPRE86IGFkZCBhIGNhc2Ugd2hlcmUgaW5uZXIgc3BlYyBpcyBub3QgYSB1bml0IChmYWNldC9sYXllci9jb25jYXQpXG4gIGxldCBheGlzR3JvdXAgPSBudWxsO1xuXG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgaWYgKGNoaWxkLmhhcyhjaGFubmVsKSkge1xuICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBpZiAodHJ1ZSkgeyAvLyB0aGUgY2hhbm5lbCBoYXMgc2hhcmVkIGF4ZXNcblxuICAgICAgICAvLyBhZGQgYSBncm91cCBmb3IgdGhlIHNoYXJlZCBheGVzXG4gICAgICAgIGF4aXNHcm91cCA9IGNoYW5uZWwgPT09IFggPyBnZXRYQXhlc0dyb3VwKG1vZGVsKSA6IGdldFlBeGVzR3JvdXAobW9kZWwpO1xuXG4gICAgICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpICYmIGdyaWRTaG93KGNoaWxkLCBjaGFubmVsKSkgeyAvLyBzaG93IGlubmVyIGdyaWRcbiAgICAgICAgICAvLyBhZGQgaW5uZXIgYXhpcyAoYWthIGF4aXMgdGhhdCBzaG93cyBvbmx5IGdyaWQgdG8gKVxuICAgICAgICAgIGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdID0gcGFyc2VJbm5lckF4aXMoY2hhbm5lbCwgY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGluZGVwZW5kZW50IGF4ZXMgc3VwcG9ydFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXhpc0dyb3VwO1xufVxuXG5cbmZ1bmN0aW9uIGdldFhBeGVzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwpOiBWZ01hcmtHcm91cCB7XG4gIGNvbnN0IGhhc0NvbCA9IG1vZGVsLmhhcyhDT0xVTU4pO1xuICByZXR1cm4gZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3gtYXhlcycpLFxuICAgICAgdHlwZTogJ2dyb3VwJ1xuICAgIH0sXG4gICAgaGFzQ29sID8ge1xuICAgICAgZnJvbTogeyAvLyBUT0RPOiBpZiB3ZSBkbyBmYWNldCB0cmFuc2Zvcm0gYXQgdGhlIHBhcmVudCBsZXZlbCB3ZSBjYW4gc2FtZSBzb21lIHRyYW5zZm9ybSBoZXJlXG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCd3aWR0aCcpfX0sXG4gICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHg6IGhhc0NvbCA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKENPTFVNTikucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFgsIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0WUF4ZXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCk6IFZnTWFya0dyb3VwIHtcbiAgY29uc3QgaGFzUm93ID0gbW9kZWwuaGFzKFJPVyk7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgneS1heGVzJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNSb3cgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ3dpZHRoJ31cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlaWdodDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCdoZWlnaHQnKX19LFxuICAgICAgICAgIHk6IGhhc1JvdyA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFksIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0Um93R3JpZEdyb3Vwcyhtb2RlbDogTW9kZWwpOiBhbnlbXSB7IC8vIFRPRE86IFZnTWFya3NcbiAgY29uc3QgZmFjZXRHcmlkQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuZmFjZXQuZ3JpZDtcblxuICBjb25zdCByb3dHcmlkID0ge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3Jvdy1ncmlkJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe3R5cGU6ICdmYWNldCcsIGdyb3VwYnk6IFttb2RlbC5maWVsZChST1cpXX1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeToge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKVxuICAgICAgICB9LFxuICAgICAgICB4OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFtyb3dHcmlkLCB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgncm93LWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7IGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfX0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfV07XG59XG5cbmZ1bmN0aW9uIGdldENvbHVtbkdyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55IHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBmYWNldEdyaWRDb25maWcgPSBtb2RlbC5jb25maWcoKS5mYWNldC5ncmlkO1xuXG4gIGNvbnN0IGNvbHVtbkdyaWQgPSB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldH0sXG4gICAgICAgIHkyOiB7ZmllbGQ6IHtncm91cDogJ2hlaWdodCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gW2NvbHVtbkdyaWQsICB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7IGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9fSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9XTtcbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2tleXMsIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBmbGF0dGVuLCB1bmlxdWUsIGlzQXJyYXksIHZhbHMsIGhhc2gsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0xheWVyU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VMYXllckRhdGF9IGZyb20gJy4vZGF0YS9kYXRhJztcbmltcG9ydCB7YXNzZW1ibGVMYXlvdXQsIHBhcnNlTGF5ZXJMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7VmdEYXRhLCBWZ0F4aXMsIFZnTGVnZW5kLCBpc1VuaW9uZWREb21haW4sIGlzRGF0YVJlZkRvbWFpbiwgVmdEYXRhUmVmfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cblxuZXhwb3J0IGNsYXNzIExheWVyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBVbml0TW9kZWxbXTtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBMYXllclNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHNwZWMubGF5ZXJzLm1hcCgobGF5ZXIsIGkpID0+IHtcbiAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgbW9kZWwgaGFzIHRvIGJlIGEgdW5pdCBtb2RlbCBiZWFjdXNlIHdlIHBhc3MgaW4gYSB1bml0IHNwZWNcbiAgICAgIHJldHVybiBidWlsZE1vZGVsKGxheWVyLCB0aGlzLCB0aGlzLm5hbWUoJ2xheWVyXycgKyBpKSkgYXMgVW5pdE1vZGVsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgc3BlY0NvbmZpZywgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30pO1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gICAgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBhbnkgY2hhbm5lbHNcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAvLyBzaW5jZSB3ZSBhc3N1bWUgc2hhcmVkIHNjYWxlcyB3ZSBjYW4ganVzdCBhc2sgdGhlIGZpcnN0IGNoaWxkXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuWzBdLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpOiBzdHJpbmcge1xuICAgIC8vIEZJWE1FOiBkb24ndCBqdXN0IHVzZSB0aGUgZmlyc3QgY2hpbGRcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uZGF0YVRhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBmaWVsZCBkZWZzXG4gIH1cblxuICBwdWJsaWMgc3RhY2soKSB7XG4gICAgcmV0dXJuIG51bGw7IC8vIHRoaXMgaXMgb25seSBhIHByb3BlcnR5IGZvciBVbml0TW9kZWxcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLnBhcnNlRGF0YSgpO1xuICAgIH0pO1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZUxheWVyRGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgLy8gVE9ETzogY29ycmVjdGx5IHVuaW9uIG9yZGluYWwgc2NhbGVzIHJhdGhlciB0aGFuIGp1c3QgdXNpbmcgdGhlIGxheW91dCBvZiB0aGUgZmlyc3QgY2hpbGRcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgY2hpbGQucGFyc2VMYXlvdXREYXRhKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQubGF5b3V0ID0gcGFyc2VMYXllckxheW91dCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNjYWxlKCkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgIGxldCBzY2FsZUNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LnNjYWxlID0ge30gYXMgRGljdDxTY2FsZUNvbXBvbmVudHM+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgICAvLyBGSVhNRTogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBzY2FsZVxuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LnNjYWxlKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICBsZXQgY2hpbGRTY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcbiAgICAgICAgICBpZiAoIWNoaWxkU2NhbGVzKSB7XG4gICAgICAgICAgICAvLyB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhbnkgc2NhbGVzIHNvIHdlIGhhdmUgbm90aGluZyB0byBtZXJnZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG1vZGVsU2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSBzY2FsZUNvbXBvbmVudFtjaGFubmVsXTtcbiAgICAgICAgICBpZiAobW9kZWxTY2FsZXMgJiYgbW9kZWxTY2FsZXMubWFpbikge1xuICAgICAgICAgICAgLy8gU2NhbGVzIGFyZSB1bmlvbmVkIGJ5IGNvbWJpbmluZyB0aGUgZG9tYWluIG9mIHRoZSBtYWluIHNjYWxlLlxuICAgICAgICAgICAgLy8gT3RoZXIgc2NhbGVzIHRoYXQgYXJlIHVzZWQgZm9yIG9yZGluYWwgbGVnZW5kcyBhcmUgYXBwZW5kZWQuXG4gICAgICAgICAgICBjb25zdCBtb2RlbERvbWFpbiA9IG1vZGVsU2NhbGVzLm1haW4uZG9tYWluO1xuICAgICAgICAgICAgY29uc3QgY2hpbGREb21haW4gPSBjaGlsZFNjYWxlcy5tYWluLmRvbWFpbjtcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkobW9kZWxEb21haW4pKSB7XG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkU2NhbGVzLm1haW4uZG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsU2NhbGVzLm1haW4uZG9tYWluID0gbW9kZWxEb21haW4uY29uY2F0KGNoaWxkRG9tYWluKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKCdjdXN0b20gZG9tYWluIHNjYWxlIGNhbm5vdCBiZSB1bmlvbmVkIHdpdGggZGVmYXVsdCBmaWVsZC1iYXNlZCBkb21haW4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgdW5pb25lZEZpZWxkcyA9IGlzVW5pb25lZERvbWFpbihtb2RlbERvbWFpbikgPyBtb2RlbERvbWFpbi5maWVsZHMgOiBbbW9kZWxEb21haW5dIGFzIFZnRGF0YVJlZltdO1xuXG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkRG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGZpZWxkcyA9IGlzRGF0YVJlZkRvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChbY2hpbGREb21haW5dKSA6XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRvbWFpbiBpcyBpdHNlbGYgYSB1bmlvbiBkb21haW4sIGNvbmNhdFxuICAgICAgICAgICAgICAgIGlzVW5pb25lZERvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChjaGlsZERvbWFpbi5maWVsZHMpIDpcbiAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gaWdub3JlIGV4cGxpY2l0IGRhdGEgZG9tYWlucyBmb3Igbm93IGJlY2F1c2UgdmVnYSBkb2VzIG5vdCBzdXBwb3J0IHVuaW9uaW5nIHRoZW1cbiAgICAgICAgICAgICAgICAgIHVuaW9uZWRGaWVsZHM7XG4gICAgICAgICAgICAgIGZpZWxkcyA9IHVuaXF1ZShmaWVsZHMsIGhhc2gpO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBpZiBhbGwgZG9tYWlucyB1c2UgdGhlIHNhbWUgZGF0YSwgd2UgY2FuIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSB7IGZpZWxkczogZmllbGRzIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSBmaWVsZHNbMF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNvbG9yIGxlZ2VuZCBhbmQgY29sb3IgbGVnZW5kIGJpbiBzY2FsZXMgaWYgd2UgZG9uJ3QgaGF2ZSB0aGVtIHlldFxuICAgICAgICAgICAgbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgPSBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA/IG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kIDogY2hpbGRTY2FsZXMuY29sb3JMZWdlbmQ7XG4gICAgICAgICAgICBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA9IG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kID8gbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgOiBjaGlsZFNjYWxlcy5iaW5Db2xvckxlZ2VuZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZFNjYWxlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW5hbWUgY2hpbGQgc2NhbGVzIHRvIHBhcmVudCBzY2FsZXNcbiAgICAgICAgICB2YWxzKGNoaWxkU2NhbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5zY2FsZU5hbWUoc2NhbGVOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgICAgICBjaGlsZC5yZW5hbWVTY2FsZShzY2FsZS5uYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVsZXRlIGNoaWxkU2NhbGVzW2NoYW5uZWxdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU1hcmsoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VNYXJrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIGxldCBheGlzQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuYXhpcyA9IHt9IGFzIERpY3Q8VmdBeGlzW10+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VBeGlzKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmF4aXMpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgbXVsdGlwbGUgYXhlcyBmb3Igc2hhcmVkIHNjYWxlXG5cbiAgICAgICAgICAvLyBqdXN0IHVzZSB0aGUgZmlyc3QgYXhpcyBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWF4aXNDb21wb25lbnRbY2hhbm5lbF0pIHtcbiAgICAgICAgICAgIGF4aXNDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpc0dyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGVnZW5kKCkge1xuICAgIGxldCBsZWdlbmRDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSB7fSBhcyBEaWN0PFZnTGVnZW5kPjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmxlZ2VuZCkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgLy8ganVzdCB1c2UgdGhlIGZpcnN0IGxlZ2VuZCBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSkge1xuICAgICAgICAgICAgbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGQuY29tcG9uZW50LmxlZ2VuZFtjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQcmVmaXggdHJhdmVyc2FsIOKAkyBwYXJlbnQgZGF0YSBtaWdodCBiZSByZWZlcnJlZCB0byBieSBjaGlsZHJlbiBkYXRhXG4gICAgYXNzZW1ibGVEYXRhKHRoaXMsIGRhdGEpO1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5hc3NlbWJsZURhdGEoZGF0YSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUG9zdGZpeCB0cmF2ZXJzYWwg4oCTIGxheW91dCBpcyBhc3NlbWJsZWQgYm90dG9tLXVwXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFzc2VtYmxlTGF5b3V0KGxheW91dERhdGEpO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCk6IGFueVtdIHtcbiAgICAvLyBvbmx5IGNoaWxkcmVuIGhhdmUgbWFya3NcbiAgICByZXR1cm4gZmxhdHRlbih0aGlzLl9jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuYXNzZW1ibGVNYXJrcygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2hpbGQgZWl0aGVyIGhhcyBubyBzb3VyY2UgZGVmaW5lZCBvciB1c2VzIHRoZSBzYW1lIHVybC5cbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8ga25vdyB3aGV0aGVyIGl0IGlzIHBvc3NpYmxlIHRvIG1vdmUgYSBmaWx0ZXIgdXAuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UgdGggY2hpbGQgaGFzIGJlZW4gcGFyc2VkLlxuICAgKi9cbiAgcHVibGljIGNvbXBhdGlibGVTb3VyY2UoY2hpbGQ6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IHNvdXJjZVVybCA9IHRoaXMuZGF0YSgpLnVybDtcbiAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICBjb25zdCBjb21wYXRpYmxlID0gIWNoaWxkRGF0YS5zb3VyY2UgfHwgKHNvdXJjZVVybCAmJiBzb3VyY2VVcmwgPT09IGNoaWxkRGF0YS5zb3VyY2UudXJsKTtcbiAgICByZXR1cm4gY29tcGF0aWJsZTtcbiAgfVxufVxuIiwiXG5pbXBvcnQge0NoYW5uZWwsIFgsIFksIFJPVywgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7TEFZT1VUfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgU3RyaW5nU2V0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtURVhUIGFzIFRFWFRfTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cmF3RG9tYWlufSBmcm9tICcuL3RpbWUnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIEZJWE1FOiBmb3IgbmVzdGluZyB4IGFuZCB5LCB3ZSBuZWVkIHRvIGRlY2xhcmUgeCx5IGxheW91dCBzZXBhcmF0ZWx5IGJlZm9yZSBqb2luaW5nIGxhdGVyXG4vLyBGb3Igbm93LCBsZXQncyBhbHdheXMgYXNzdW1lIHNoYXJlZCBzY2FsZVxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRDb21wb25lbnQge1xuICB3aWR0aDogU2l6ZUNvbXBvbmVudDtcbiAgaGVpZ2h0OiBTaXplQ29tcG9uZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemVDb21wb25lbnQge1xuICAvKiogRmllbGQgdGhhdCB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBkaXN0aW5jdCAqL1xuICBkaXN0aW5jdDogU3RyaW5nU2V0O1xuXG4gIC8qKiBBcnJheSBvZiBmb3JtdWxhcyAqL1xuICBmb3JtdWxhOiBGb3JtdWxhW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZUxheW91dChtb2RlbDogTW9kZWwsIGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICBjb25zdCBsYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jb21wb25lbnQubGF5b3V0O1xuICBpZiAoIWxheW91dENvbXBvbmVudC53aWR0aCAmJiAhbGF5b3V0Q29tcG9uZW50LmhlaWdodCkge1xuICAgIHJldHVybiBsYXlvdXREYXRhOyAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBpZiAodHJ1ZSkgeyAvLyBpZiBib3RoIGFyZSBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgZGF0YSBzb3VyY2UgZm9yIHdpZHRoIGFuZCBmb3IgaGVpZ2h0XG4gICAgY29uc3QgZGlzdGluY3RGaWVsZHMgPSBrZXlzKGV4dGVuZChsYXlvdXRDb21wb25lbnQud2lkdGguZGlzdGluY3QsIGxheW91dENvbXBvbmVudC5oZWlnaHQuZGlzdGluY3QpKTtcbiAgICBjb25zdCBmb3JtdWxhID0gbGF5b3V0Q29tcG9uZW50LndpZHRoLmZvcm11bGEuY29uY2F0KGxheW91dENvbXBvbmVudC5oZWlnaHQuZm9ybXVsYSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZm9ybXVsYSkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt0eXBlOiAnZm9ybXVsYSd9LCBmb3JtdWxhKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGRpc3RpbmN0RmllbGRzLmxlbmd0aCA+IDAgPyB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgc3VtbWFyaXplOiBkaXN0aW5jdEZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IGZpZWxkLCBvcHM6IFsnZGlzdGluY3QnXSB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XS5jb25jYXQoZm9ybXVsYSlcbiAgICAgIH0gOiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHZhbHVlczogW3t9XSxcbiAgICAgICAgdHJhbnNmb3JtOiBmb3JtdWxhXG4gICAgICB9XG4gICAgXTtcbiAgfVxuICAvLyBGSVhNRTogaW1wbGVtZW50XG4gIC8vIG90aGVyd2lzZSwgd2UgbmVlZCB0byBqb2luIHdpZHRoIGFuZCBoZWlnaHQgKGNyb3NzKVxufVxuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXRMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFgpLFxuICAgIGhlaWdodDogcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbCwgWSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIC8vIFRPRE86IHRoaW5rIGFib3V0IHdoZXRoZXIgdGhpcyBjb25maWcgaGFzIHRvIGJlIHRoZSBjZWxsIG9yIGZhY2V0IGNlbGwgY29uZmlnXG4gIGNvbnN0IGNlbGxDb25maWcgPSBtb2RlbC5jb25maWcoKS5jZWxsO1xuICBjb25zdCBub25PcmRpbmFsU2l6ZSA9IGNoYW5uZWwgPT09IFggPyBjZWxsQ29uZmlnLndpZHRoIDogY2VsbENvbmZpZy5oZWlnaHQ7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXN0aW5jdDogZ2V0RGlzdGluY3QobW9kZWwsIGNoYW5uZWwpLFxuICAgIGZvcm11bGE6IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogdW5pdFNpemVFeHByKG1vZGVsLCBjaGFubmVsLCBub25PcmRpbmFsU2l6ZSlcbiAgICB9XVxuICB9O1xufVxuXG5mdW5jdGlvbiB1bml0U2l6ZUV4cHIobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgbm9uT3JkaW5hbFNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICBpZiAobW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICByZXR1cm4gJygnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKSArXG4gICAgICAgICcgKyAnICsgc2NhbGUucGFkZGluZyArXG4gICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVF9NQVJLICYmIGNoYW5uZWwgPT09IFgpIHtcbiAgICAgIC8vIGZvciB0ZXh0IHRhYmxlIHdpdGhvdXQgeC95IHNjYWxlIHdlIG5lZWQgd2lkZXIgYmFuZFNpemVcbiAgICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5zY2FsZS50ZXh0QmFuZFdpZHRoICsgJyc7XG4gICAgfVxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSArICcnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0TGF5b3V0KG1vZGVsOiBGYWNldE1vZGVsKTogTGF5b3V0Q29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogcGFyc2VGYWNldFNpemVMYXlvdXQobW9kZWwsIENPTFVNTiksXG4gICAgaGVpZ2h0OiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbCwgUk9XKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbDogRmFjZXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICBjb25zdCBjaGlsZExheW91dENvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmxheW91dDtcbiAgY29uc3Qgc2l6ZVR5cGUgPSBjaGFubmVsID09PSBST1cgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIGNvbnN0IGNoaWxkU2l6ZUNvbXBvbmVudDogU2l6ZUNvbXBvbmVudCA9IGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcblxuICBpZiAodHJ1ZSkgeyAvLyBhc3N1bWUgc2hhcmVkIHNjYWxlXG4gICAgLy8gRm9yIHNoYXJlZCBzY2FsZSwgd2UgY2FuIHNpbXBseSBtZXJnZSB0aGUgbGF5b3V0IGludG8gb25lIGRhdGEgc291cmNlXG5cbiAgICBjb25zdCBkaXN0aW5jdCA9IGV4dGVuZChnZXREaXN0aW5jdChtb2RlbCwgY2hhbm5lbCksIGNoaWxkU2l6ZUNvbXBvbmVudC5kaXN0aW5jdCk7XG4gICAgY29uc3QgZm9ybXVsYSA9IGNoaWxkU2l6ZUNvbXBvbmVudC5mb3JtdWxhLmNvbmNhdChbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IGZhY2V0U2l6ZUZvcm11bGEobW9kZWwsIGNoYW5uZWwsIG1vZGVsLmNoaWxkKCkuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpKVxuICAgIH1dKTtcblxuICAgIGRlbGV0ZSBjaGlsZExheW91dENvbXBvbmVudFtzaXplVHlwZV07XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICAgIGZvcm11bGE6IGZvcm11bGFcbiAgICB9O1xuICB9XG4gIC8vIEZJWE1FIGltcGxlbWVudCBpbmRlcGVuZGVudCBzY2FsZSBhcyB3ZWxsXG4gIC8vIFRPRE86IC0gYWxzbyBjb25zaWRlciB3aGVuIGNoaWxkcmVuIGhhdmUgZGlmZmVyZW50IGRhdGEgc291cmNlXG59XG5cbmZ1bmN0aW9uIGZhY2V0U2l6ZUZvcm11bGEobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBpbm5lclNpemU6IHN0cmluZykge1xuICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICBpZiAobW9kZWwuaGFzKGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuICcoZGF0dW0uJyArIGlubmVyU2l6ZSArICcgKyAnICsgc2NhbGUucGFkZGluZyArICcpJyArICcgKiAnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ2RhdHVtLicgKyBpbm5lclNpemUgKyAnICsgJyArIG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmc7IC8vIG5lZWQgdG8gYWRkIG91dGVyIHBhZGRpbmcgZm9yIGZhY2V0XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXJMYXlvdXQobW9kZWw6IExheWVyTW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbCwgWCksXG4gICAgaGVpZ2h0OiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbCwgWSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMYXllclNpemVMYXlvdXQobW9kZWw6IExheWVyTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBTaXplQ29tcG9uZW50IHtcbiAgaWYgKHRydWUpIHtcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcbiAgICAvLyBUT0RPOiBkb24ndCBqdXN0IHRha2UgdGhlIGxheW91dCBmcm9tIHRoZSBmaXJzdCBjaGlsZFxuXG4gICAgY29uc3QgY2hpbGRMYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jaGlsZHJlbigpWzBdLmNvbXBvbmVudC5sYXlvdXQ7XG4gICAgY29uc3Qgc2l6ZVR5cGUgPSBjaGFubmVsID09PSBZID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIGNvbnN0IGNoaWxkU2l6ZUNvbXBvbmVudDogU2l6ZUNvbXBvbmVudCA9IGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0O1xuICAgIGNvbnN0IGZvcm11bGEgPSBbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IGNoaWxkU2l6ZUNvbXBvbmVudC5mb3JtdWxhWzBdLmV4cHJcbiAgICB9XTtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQubGF5b3V0W3NpemVUeXBlXTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBkaXN0aW5jdDogZGlzdGluY3QsXG4gICAgICBmb3JtdWxhOiBmb3JtdWxhXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXN0aW5jdChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBTdHJpbmdTZXQge1xuICBpZiAobW9kZWwuaGFzKGNoYW5uZWwpICYmIG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgIShzY2FsZS5kb21haW4gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIC8vIGlmIGV4cGxpY2l0IGRvbWFpbiBpcyBkZWNsYXJlZCwgdXNlIGFycmF5IGxlbmd0aFxuICAgICAgY29uc3QgZGlzdGluY3RGaWVsZCA9IG1vZGVsLmZpZWxkKGNoYW5uZWwpO1xuICAgICAgbGV0IGRpc3RpbmN0OiBTdHJpbmdTZXQgPSB7fTtcbiAgICAgIGRpc3RpbmN0W2Rpc3RpbmN0RmllbGRdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkaXN0aW5jdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG4vLyBUT0RPOiByZW5hbWUgdG8gY2FyZGluYWxpdHlFeHByXG5mdW5jdGlvbiBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChzY2FsZS5kb21haW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBzY2FsZS5kb21haW4ubGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgdGltZVVuaXQgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS50aW1lVW5pdDtcbiAgY29uc3QgdGltZVVuaXREb21haW4gPSB0aW1lVW5pdCA/IHJhd0RvbWFpbih0aW1lVW5pdCwgY2hhbm5lbCkgOiBudWxsO1xuXG4gIHJldHVybiB0aW1lVW5pdERvbWFpbiAhPT0gbnVsbCA/IHRpbWVVbml0RG9tYWluLmxlbmd0aCA6XG4gICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtkYXR1bTogdHJ1ZSwgcHJlZm46ICdkaXN0aW5jdF8nfSk7XG59XG4iLCJpbXBvcnQge0NPTE9SLCBTSVpFLCBTSEFQRSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi4vbGVnZW5kJztcbmltcG9ydCB7dGl0bGUgYXMgZmllbGRUaXRsZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtBUkVBLCBCQVIsIFRJQ0ssIFRFWFQsIExJTkUsIFBPSU5ULCBDSVJDTEUsIFNRVUFSRX0gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge09SRElOQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHdpdGhvdXQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHLCBmb3JtYXRNaXhpbnMgYXMgdXRpbEZvcm1hdE1peGlucywgdGltZUZvcm1hdH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtDT0xPUl9MRUdFTkQsIENPTE9SX0xFR0VORF9MQUJFTH0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcbmltcG9ydCB7VmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMZWdlbmRDb21wb25lbnQobW9kZWw6IFVuaXRNb2RlbCk6IERpY3Q8VmdMZWdlbmQ+IHtcbiAgcmV0dXJuIFtDT0xPUiwgU0laRSwgU0hBUEVdLnJlZHVjZShmdW5jdGlvbihsZWdlbmRDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICBpZiAobW9kZWwubGVnZW5kKGNoYW5uZWwpKSB7XG4gICAgICBsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0gPSBwYXJzZUxlZ2VuZChtb2RlbCwgY2hhbm5lbCk7XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmRDb21wb25lbnQ7XG4gIH0sIHt9IGFzIERpY3Q8VmdMZWdlbmQ+KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGVnZW5kRGVmV2l0aFNjYWxlKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBWZ0xlZ2VuZCB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKENPTE9SKTtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGVOYW1lKHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWYpID9cbiAgICAgICAgLy8gVG8gcHJvZHVjZSBvcmRpbmFsIGxlZ2VuZCAobGlzdCwgcmF0aGVyIHRoYW4gbGluZWFyIHJhbmdlKSB3aXRoIGNvcnJlY3QgbGFiZWxzOlxuICAgICAgICAvLyAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlc1xuICAgICAgICAvLyAtIEZvciBhIGZpZWxkIHdpdGggYmluIG9yIHRpbWVVbml0LCBwcm92aWRlIGFuIGlkZW50aXR5IG9yZGluYWwgc2NhbGVcbiAgICAgICAgLy8gKG1hcHBpbmcgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVtc2VsdmVzKVxuICAgICAgICBDT0xPUl9MRUdFTkQgOlxuICAgICAgICBDT0xPUlxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkID8geyBmaWxsOiBzY2FsZSB9IDogeyBzdHJva2U6IHNjYWxlIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHsgc2l6ZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7IHNoYXBlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogVmdMZWdlbmQge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG5cbiAgbGV0IGRlZjogVmdMZWdlbmQgPSBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWwsIGNoYW5uZWwpO1xuXG4gIC8vIDEuMSBBZGQgcHJvcGVydGllcyB3aXRoIHNwZWNpYWwgcnVsZXNcbiAgZGVmLnRpdGxlID0gdGl0bGUobGVnZW5kLCBmaWVsZERlZik7XG5cbiAgZGVmLm9mZnNldCA9IG9mZnNldChsZWdlbmQsIGZpZWxkRGVmKTtcblxuICBleHRlbmQoZGVmLCBmb3JtYXRNaXhpbnMobGVnZW5kLCBtb2RlbCwgY2hhbm5lbCkpO1xuXG4gIC8vIDEuMiBBZGQgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzXG4gIFsnb3JpZW50JywgJ3ZhbHVlcyddLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxlZ2VuZFtwcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQucHJvcGVydGllcykgfHwge307XG4gIFsndGl0bGUnLCAnc3ltYm9scycsICdsZWdlbmQnLCAnbGFiZWxzJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGxldCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKGZpZWxkRGVmLCBwcm9wc1tncm91cF0sIG1vZGVsLCBjaGFubmVsKSA6IC8vIGFwcGx5IHJ1bGVcbiAgICAgIHByb3BzW2dyb3VwXTsgLy8gbm8gcnVsZSAtLSBqdXN0IGRlZmF1bHQgdmFsdWVzXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldChsZWdlbmQ6IExlZ2VuZCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGlmIChsZWdlbmQub2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbGVnZW5kLm9mZnNldDtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChsZWdlbmQ6IExlZ2VuZCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGNvbnN0IG9yaWVudCA9IGxlZ2VuZC5vcmllbnQ7XG4gIGlmIChvcmllbnQpIHtcbiAgICByZXR1cm4gb3JpZW50O1xuICB9XG4gIHJldHVybiAndmVydGljYWwnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobGVnZW5kOiBMZWdlbmQsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICBpZiAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC50aXRsZSkge1xuICAgIHJldHVybiBsZWdlbmQudGl0bGU7XG4gIH1cblxuICByZXR1cm4gZmllbGRUaXRsZShmaWVsZERlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNaXhpbnMobGVnZW5kOiBMZWdlbmQsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICAvLyBJZiB0aGUgY2hhbm5lbCBpcyBiaW5uZWQsIHdlIHNob3VsZCBub3Qgc2V0IHRoZSBmb3JtYXQgYmVjYXVzZSB3ZSBoYXZlIGEgcmFuZ2UgbGFiZWxcbiAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJldHVybiB1dGlsRm9ybWF0TWl4aW5zKG1vZGVsLCBjaGFubmVsLCB0eXBlb2YgbGVnZW5kICE9PSAnYm9vbGVhbicgPyBsZWdlbmQuZm9ybWF0IDogdW5kZWZpbmVkKTtcbn1cblxuLy8gd2UgaGF2ZSB0byB1c2Ugc3BlY2lhbCBzY2FsZXMgZm9yIG9yZGluYWwgb3IgYmlubmVkIGZpZWxkcyBmb3IgdGhlIGNvbG9yIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiB1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQ7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgcHJvcGVydGllcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBzeW1ib2xzKGZpZWxkRGVmOiBGaWVsZERlZiwgc3ltYm9sc1NwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBsZXQgc3ltYm9sczphbnkgPSB7fTtcbiAgICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcblxuICAgIHN3aXRjaCAobWFyaykge1xuICAgICAgY2FzZSBCQVI6XG4gICAgICBjYXNlIFRJQ0s6XG4gICAgICBjYXNlIFRFWFQ6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6ICdzcXVhcmUnfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENJUkNMRTpcbiAgICAgIGNhc2UgU1FVQVJFOlxuICAgICAgICBzeW1ib2xzLnNoYXBlID0geyB2YWx1ZTogbWFyayB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUE9JTlQ6XG4gICAgICBjYXNlIExJTkU6XG4gICAgICBjYXNlIEFSRUE6XG4gICAgICAgIC8vIHVzZSBkZWZhdWx0IGNpcmNsZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBmaWxsZWQgPSBtb2RlbC5jb25maWcoKS5tYXJrLmZpbGxlZDtcblxuXG4gICAgbGV0IGNvbmZpZyA9IGNoYW5uZWwgPT09IENPTE9SID9cbiAgICAgICAgLyogRm9yIGNvbG9yJ3MgbGVnZW5kLCBkbyBub3Qgc2V0IGZpbGwgKHdoZW4gZmlsbGVkKSBvciBzdHJva2UgKHdoZW4gdW5maWxsZWQpIHByb3BlcnR5IGZyb20gY29uZmlnIGJlY2F1c2UgdGhlIHRoZSBsZWdlbmQncyBgZmlsbGAgb3IgYHN0cm9rZWAgc2NhbGUgc2hvdWxkIGhhdmUgcHJlY2VkZW5jZSAqL1xuICAgICAgICB3aXRob3V0KEZJTExfU1RST0tFX0NPTkZJRywgWyBmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJywgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKSA6XG4gICAgICAgIC8qIEZvciBvdGhlciBsZWdlbmQsIG5vIG5lZWQgdG8gb21pdC4gKi9cbiAgICAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKTtcblxuICAgIGNvbmZpZyA9IHdpdGhvdXQoY29uZmlnLCBbJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhzeW1ib2xzLCBtb2RlbCwgY29uZmlnKTtcblxuICAgIGlmIChmaWxsZWQpIHtcbiAgICAgIHN5bWJvbHMuc3Ryb2tlV2lkdGggPSB7IHZhbHVlOiAwIH07XG4gICAgfVxuXG4gICAgbGV0IHZhbHVlO1xuICAgIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICBpZiAodXNlQ29sb3JMZWdlbmRTY2FsZShmaWVsZERlZikpIHtcbiAgICAgICAgLy8gZm9yIGNvbG9yIGxlZ2VuZCBzY2FsZSwgd2UgbmVlZCB0byBvdmVycmlkZVxuICAgICAgICB2YWx1ZSA9IHsgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksIGZpZWxkOiAnZGF0YScgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSkge1xuICAgICAgdmFsdWUgPSB7IHZhbHVlOiBtb2RlbC5maWVsZERlZihDT0xPUikudmFsdWUgfTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gYXBwbHkgdGhlIHZhbHVlXG4gICAgICBpZiAoZmlsbGVkKSB7XG4gICAgICAgIHN5bWJvbHMuZmlsbCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ltYm9scy5zdHJva2UgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoYW5uZWwgIT09IENPTE9SKSB7XG4gICAgICAvLyBGb3Igbm9uLWNvbG9yIGxlZ2VuZCwgYXBwbHkgY29sb3IgY29uZmlnIGlmIHRoZXJlIGlzIG5vIGZpbGwgLyBzdHJva2UgY29uZmlnLlxuICAgICAgLy8gKEZvciBjb2xvciwgZG8gbm90IG92ZXJyaWRlIHNjYWxlIHNwZWNpZmllZCEpXG4gICAgICBzeW1ib2xzW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICAgIHt2YWx1ZTogbW9kZWwuY29uZmlnKCkubWFyay5jb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLmZpbGwgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTaGFwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLnNoYXBlID0ge3ZhbHVlOiBsZWdlbmQuc3ltYm9sU2hhcGV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLnNpemUgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFN0cm9rZVdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc3Ryb2tlV2lkdGggPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTdHJva2VXaWR0aH07XG4gICAgfVxuXG4gICAgc3ltYm9scyA9IGV4dGVuZChzeW1ib2xzLCBzeW1ib2xzU3BlYyB8fCB7fSk7XG5cbiAgICByZXR1cm4ga2V5cyhzeW1ib2xzKS5sZW5ndGggPiAwID8gc3ltYm9scyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMoZmllbGREZWY6IEZpZWxkRGVmLCBsYWJlbHNTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgbGV0IGxhYmVsczphbnkgPSB7fTtcblxuICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkQpLFxuICAgICAgICAgICAgZmllbGQ6ICdkYXRhJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORF9MQUJFTCksXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bS5kYXRhIHwgdGltZTpcXCcnICsgdGltZUZvcm1hdChtb2RlbCwgY2hhbm5lbCkgKyAnXFwnfX0nXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQWxpZ24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmFsaWduID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxBbGlnbn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5zdHJva2UgPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbENvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsRm9udCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuZm9udCA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsRm9udH07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEZvbnRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5mb250U2l6ZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsRm9udFNpemV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxCYXNlbGluZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuYmFzZWxpbmUgPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEJhc2VsaW5lfTtcbiAgICB9XG5cbiAgICBsYWJlbHMgPSBleHRlbmQobGFiZWxzLCBsYWJlbHNTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKGxhYmVscykubGVuZ3RoID4gMCA/IGxhYmVscyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aXRsZShmaWVsZERlZjogRmllbGREZWYsIHRpdGxlU3BlYywgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcblxuICAgIGxldCB0aXRsZXM6YW55ID0ge307XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLnN0cm9rZSA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpdGxlcy5mb250ID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVGb250fTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnRTaXplID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVGb250U2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnRXZWlnaHQgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnRXZWlnaHR9O1xuICAgIH1cblxuICAgIHRpdGxlcyA9IGV4dGVuZCh0aXRsZXMsIHRpdGxlU3BlYyB8fCB7fSk7XG5cbiAgICByZXR1cm4ga2V5cyh0aXRsZXMpLmxlbmd0aCA+IDAgPyB0aXRsZXMgOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7WCwgWX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2lzRGltZW5zaW9uLCBpc01lYXN1cmV9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBhcmVhIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnYXJlYSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgY29uc3Qgb3JpZW50ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQ7XG4gICAgaWYgKG9yaWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwLm9yaWVudCA9IHsgdmFsdWU6IG9yaWVudCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICBjb25zdCB4RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLng7XG4gICAgLy8geFxuICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoeEZpZWxkRGVmKSkgeyAvLyBNZWFzdXJlXG4gICAgICBwLnggPSB7IHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksIGZpZWxkOiBtb2RlbC5maWVsZChYKSB9O1xuICAgIH0gZWxzZSBpZiAoaXNEaW1lbnNpb24oeEZpZWxkRGVmKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB4MlxuICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHlcbiAgICBjb25zdCB5RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLnk7XG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZSh5RmllbGREZWYpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKHlGaWVsZERlZikpIHtcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7IC8vICd2ZXJ0aWNhbCcgb3IgdW5kZWZpbmVkIGFyZSB2ZXJ0aWNhbFxuICAgICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFsnaW50ZXJwb2xhdGUnLCAndGVuc2lvbiddKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIFNJWkUsIENoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtpc01lYXN1cmV9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBiYXIge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICBjb25zdCBvcmllbnQgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICBjb25zdCB4RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLng7XG4gICAgLy8geCwgeDIsIGFuZCB3aWR0aCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgLy8gJ3gnIGlzIGEgc3RhY2tlZCBtZWFzdXJlLCB0aHVzIHVzZSA8ZmllbGQ+X3N0YXJ0IGFuZCA8ZmllbGQ+X2VuZCBmb3IgeCwgeDIuXG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgICBwLngyID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZSh4RmllbGREZWYpKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcC54ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgIH07XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxcbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgICB9O1xuICAgICAgICBwLndpZHRoID0ge3ZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFgpfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFgpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgIT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyBGb3IgdmVydGljYWwgY2hhcnQgdGhhdCBoYXMgYmlubmVkIFggYW5kIHNpemUsXG4gICAgICAgIC8vIGNlbnRlciBiYXIgYW5kIGFwcGx5IHNpemUgdG8gd2lkdGguXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLndpZHRoID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyB4IGlzIGRpbWVuc2lvbiBvciB1bnNwZWNpZmllZFxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkgeyAvLyBpcyBvcmRpbmFsXG4gICAgICAgcC54YyA9IHtcbiAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICB9O1xuICAgICB9IGVsc2UgeyAvLyBubyB4XG4gICAgICAgIHAueCA9IHsgdmFsdWU6IDAsIG9mZnNldDogMiB9O1xuICAgICAgfVxuXG4gICAgICBwLndpZHRoID0gbW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gJ2hvcml6b250YWwnID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIHZlcnRpY2FsIChleHBsaWNpdCBcInZlcnRpY2FsXCIgb3IgdW5kZWZpbmVkKVxuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgLy8gb3RoZXJ3aXNlLCB1c2UgZml4ZWQgc2l6ZVxuICAgICAgICAgIHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIChYKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCB5RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLnk7XG4gICAgLy8geSwgeTIgJiBoZWlnaHQgLS0gd2UgbXVzdCBzcGVjaWZ5IHR3byBvZiB0aGVzZSBpbiBhbGwgY29uZGl0aW9uc1xuICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8geSBpcyBzdGFja2VkIG1lYXN1cmVcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICAgIHAueTIgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKHlGaWVsZERlZikpIHtcbiAgICAgIGlmIChvcmllbnQgIT09ICdob3Jpem9udGFsJykgeyAvLyB2ZXJ0aWNhbCAoZXhwbGljaXQgJ3ZlcnRpY2FsJyBvciB1bmRlZmluZWQpXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgfTtcbiAgICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFkpIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihZKS5iaW4pIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgLy8gRm9yIGhvcml6b250YWwgY2hhcnQgdGhhdCBoYXMgYmlubmVkIFkgYW5kIHNpemUsXG4gICAgICAgIC8vIGNlbnRlciBiYXIgYW5kIGFwcGx5IHNpemUgdG8gaGVpZ2h0LlxuICAgICAgICBwLnljID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC5oZWlnaHQgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2ltcGx5IHVzZSA8ZmllbGQ+X3N0YXJ0LCA8ZmllbGQ+X2VuZFxuICAgICAgICBwLnkgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KSxcbiAgICAgICAgICBvZmZzZXQ6IDFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyB5IGlzIG9yZGluYWwgb3IgdW5zcGVjaWZpZWRcblxuICAgICAgaWYgKG1vZGVsLmhhcyhZKSkgeyAvLyBpcyBvcmRpbmFsXG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7IC8vIE5vIFlcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSxcbiAgICAgICAgICBvZmZzZXQ6IC0xXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHAuaGVpZ2h0ID0gbW9kZWwuaGFzKFNJWkUpICAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJyA/IHtcbiAgICAgICAgICAvLyBhcHBseSBzaXplIHNjYWxlIGlmIGhhcyBzaXplIGFuZCBpcyBob3Jpem9udGFsXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrQ29uZmlnID0gbW9kZWwuY29uZmlnKCkubWFyaztcbiAgICBpZiAobWFya0NvbmZpZy5iYXJTaXplKSB7XG4gICAgICByZXR1cm4gbWFya0NvbmZpZy5iYXJTaXplO1xuICAgIH1cbiAgICAvLyBCQVIncyBzaXplIGlzIGFwcGxpZWQgb24gZWl0aGVyIFggb3IgWVxuICAgIHJldHVybiBtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSA/XG4gICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIG9yIHNpbmdsZSBiYXIsIHdlIGNhbiB1c2UgYmFuZFNpemUgLSAxXG4gICAgICAgIC8vICgtMSBzbyB0aGF0IHRoZSBib3JkZXIgb2YgdGhlIGJhciBmYWxscyBvbiBleGFjdCBwaXhlbClcbiAgICAgICAgbW9kZWwuc2NhbGUoY2hhbm5lbCkuYmFuZFNpemUgLSAxIDpcbiAgICAgICFtb2RlbC5oYXMoY2hhbm5lbCkgP1xuICAgICAgICBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAtIDEgOlxuICAgICAgICAvLyBvdGhlcndpc2UsIHNldCB0byB0aGluQmFyV2lkdGggYnkgZGVmYXVsdFxuICAgICAgICBtYXJrQ29uZmlnLmJhclRoaW5TaXplO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjNjQpOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtYLCBZLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIGxpbmUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdsaW5lJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC54ID0geyB2YWx1ZTogMCB9O1xuICAgIH1cblxuICAgIC8vIHlcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnkgPSB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuXG4gICAgLy8gc2l6ZSBhcyBhIGNoYW5uZWwgaXMgbm90IHN1cHBvcnRlZCBpbiBWZWdhIHlldC5cbiAgICBjb25zdCBzaXplID0gc2l6ZVZhbHVlKG1vZGVsKTtcbiAgICBpZiAoc2l6ZSkge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IHNpemUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5tYXJrLmxpbmVTaXplO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7T3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5cbmltcG9ydCB7WCwgWSwgQ09MT1IsIFRFWFQsIFNIQVBFLCBQQVRILCBPUkRFUiwgT1BBQ0lUWSwgREVUQUlMLCBMQUJFTH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0FSRUEsIExJTkUsIFRFWFQgYXMgVEVYVE1BUkt9IGZyb20gJy4uLy4uL21hcmsnO1xuaW1wb3J0IHtpbXB1dGVUcmFuc2Zvcm0sIHN0YWNrVHJhbnNmb3JtfSBmcm9tICcuLi9zdGFjayc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHthcmVhfSBmcm9tICcuL2FyZWEnO1xuaW1wb3J0IHtiYXJ9IGZyb20gJy4vYmFyJztcbmltcG9ydCB7bGluZX0gZnJvbSAnLi9saW5lJztcbmltcG9ydCB7cG9pbnQsIGNpcmNsZSwgc3F1YXJlfSBmcm9tICcuL3BvaW50JztcbmltcG9ydCB7dGV4dH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB7dGlja30gZnJvbSAnLi90aWNrJztcbmltcG9ydCB7cnVsZX0gZnJvbSAnLi9ydWxlJztcbmltcG9ydCB7c29ydEZpZWxkfSBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBtYXJrQ29tcGlsZXIgPSB7XG4gIGFyZWE6IGFyZWEsXG4gIGJhcjogYmFyLFxuICBsaW5lOiBsaW5lLFxuICBwb2ludDogcG9pbnQsXG4gIHRleHQ6IHRleHQsXG4gIHRpY2s6IHRpY2ssXG4gIHJ1bGU6IHJ1bGUsXG4gIGNpcmNsZTogY2lyY2xlLFxuICBzcXVhcmU6IHNxdWFyZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWFyayhtb2RlbDogVW5pdE1vZGVsKTogYW55W10ge1xuICBpZiAoY29udGFpbnMoW0xJTkUsIEFSRUFdLCBtb2RlbC5tYXJrKCkpKSB7XG4gICAgcmV0dXJuIHBhcnNlUGF0aE1hcmsobW9kZWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXJzZU5vblBhdGhNYXJrKG1vZGVsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVBhdGhNYXJrKG1vZGVsOiBVbml0TW9kZWwpIHsgLy8gVE9ETzogZXh0cmFjdCB0aGlzIGludG8gY29tcGlsZVBhdGhNYXJrXG4gIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gIC8vIFRPRE86IHJlcGxhY2UgdGhpcyB3aXRoIG1vcmUgZ2VuZXJhbCBjYXNlIGZvciBjb21wb3NpdGlvblxuICBjb25zdCBpc0ZhY2V0ZWQgPSBtb2RlbC5wYXJlbnQoKSAmJiBtb2RlbC5wYXJlbnQoKS5pc0ZhY2V0KCk7XG4gIGNvbnN0IGRhdGFGcm9tID0ge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpfTtcbiAgY29uc3QgZGV0YWlscyA9IGRldGFpbEZpZWxkcyhtb2RlbCk7XG5cbiAgbGV0IHBhdGhNYXJrczogYW55ID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ21hcmtzJyksXG4gICAgICB0eXBlOiBtYXJrQ29tcGlsZXJbbWFya10ubWFya1R5cGUoKSxcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBJZiBoYXMgc3ViZmFjZXQgZm9yIGxpbmUvYXJlYSBncm91cCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgb3V0ZXIgc3ViZmFjZXQgZ3JvdXAgYmVsb3cuXG4gICAgICAgIC8vIElmIGhhcyBubyBzdWJmYWNldCwgYWRkIGZyb20uZGF0YS5cbiAgICAgICAgaXNGYWNldGVkIHx8IGRldGFpbHMubGVuZ3RoID4gMCA/IHt9IDogZGF0YUZyb20sXG5cbiAgICAgICAgLy8gc29ydCB0cmFuc2Zvcm1cbiAgICAgICAge3RyYW5zZm9ybTogW3sgdHlwZTogJ3NvcnQnLCBieTogc29ydFBhdGhCeShtb2RlbCl9XX1cbiAgICAgICksXG4gICAgICBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH1cbiAgICB9XG4gIF07XG5cbiAgaWYgKGRldGFpbHMubGVuZ3RoID4gMCkgeyAvLyBoYXZlIGxldmVsIG9mIGRldGFpbHMgLSBuZWVkIHRvIGZhY2V0IGxpbmUgaW50byBzdWJncm91cHNcbiAgICBjb25zdCBmYWNldFRyYW5zZm9ybSA9IHsgdHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogZGV0YWlscyB9O1xuICAgIGNvbnN0IHRyYW5zZm9ybTogYW55W10gPSBtYXJrID09PSBBUkVBICYmIG1vZGVsLnN0YWNrKCkgP1xuICAgICAgLy8gRm9yIHN0YWNrZWQgYXJlYSwgd2UgbmVlZCB0byBpbXB1dGUgbWlzc2luZyB0dXBsZXMgYW5kIHN0YWNrIHZhbHVlc1xuICAgICAgLy8gKE1hcmsgbGF5ZXIgb3JkZXIgZG9lcyBub3QgbWF0dGVyIGZvciBzdGFja2VkIGNoYXJ0cylcbiAgICAgIFtpbXB1dGVUcmFuc2Zvcm0obW9kZWwpLCBzdGFja1RyYW5zZm9ybShtb2RlbCksIGZhY2V0VHJhbnNmb3JtXSA6XG4gICAgICAvLyBGb3Igbm9uLXN0YWNrZWQgcGF0aCAobGluZS9hcmVhKSwgd2UgbmVlZCB0byBmYWNldCBhbmQgcG9zc2libHkgc29ydFxuICAgICAgW10uY29uY2F0KFxuICAgICAgICBmYWNldFRyYW5zZm9ybSxcbiAgICAgICAgLy8gaWYgbW9kZWwgaGFzIGBvcmRlcmAsIHRoZW4gc29ydCBtYXJrJ3MgbGF5ZXIgb3JkZXIgYnkgYG9yZGVyYCBmaWVsZChzKVxuICAgICAgICBtb2RlbC5oYXMoT1JERVIpID8gW3t0eXBlOidzb3J0JywgYnk6IHNvcnRCeShtb2RlbCl9XSA6IFtdXG4gICAgICApO1xuXG4gICAgcmV0dXJuIFt7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdwYXRoZ3JvdXAnKSxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaXNGYWNldGVkID8ge30gOiBkYXRhRnJvbSxcbiAgICAgICAge3RyYW5zZm9ybTogdHJhbnNmb3JtfVxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXJrczogcGF0aE1hcmtzXG4gICAgfV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhdGhNYXJrcztcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZU5vblBhdGhNYXJrKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgY29uc3QgaXNGYWNldGVkID0gbW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpO1xuICBjb25zdCBkYXRhRnJvbSA9IHtkYXRhOiBtb2RlbC5kYXRhVGFibGUoKX07XG5cbiAgbGV0IG1hcmtzID0gW107IC8vIFRPRE86IHZnTWFya3NcbiAgaWYgKG1hcmsgPT09IFRFWFRNQVJLICYmXG4gICAgbW9kZWwuaGFzKENPTE9SKSAmJlxuICAgIG1vZGVsLmNvbmZpZygpLm1hcmsuYXBwbHlDb2xvclRvQmFja2dyb3VuZCAmJiAhbW9kZWwuaGFzKFgpICYmICFtb2RlbC5oYXMoWSlcbiAgKSB7XG4gICAgLy8gYWRkIGJhY2tncm91bmQgdG8gJ3RleHQnIG1hcmtzIGlmIGhhcyBjb2xvclxuICAgIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgICAge1xuICAgICAgICBuYW1lOiBtb2RlbC5uYW1lKCdiYWNrZ3JvdW5kJyksXG4gICAgICAgIHR5cGU6ICdyZWN0J1xuICAgICAgfSxcbiAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmUuXG4gICAgICBpc0ZhY2V0ZWQgPyB7fSA6IHtmcm9tOiBkYXRhRnJvbX0sXG4gICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiB0ZXh0LmJhY2tncm91bmQobW9kZWwpIH0gfVxuICAgICkpO1xuICB9XG5cbiAgbWFya3MucHVzaChleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgnbWFya3MnKSxcbiAgICAgIHR5cGU6IG1hcmtDb21waWxlclttYXJrXS5tYXJrVHlwZSgpXG4gICAgfSxcbiAgICAvLyBBZGQgYGZyb21gIGlmIG5lZWRlZFxuICAgICghaXNGYWNldGVkIHx8IG1vZGVsLnN0YWNrKCkgfHwgbW9kZWwuaGFzKE9SREVSKSkgPyB7XG4gICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgIC8vIElmIGZhY2V0ZWQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmVcbiAgICAgICAgaXNGYWNldGVkID8ge30gOiBkYXRhRnJvbSxcbiAgICAgICAgLy8gYGZyb20udHJhbnNmb3JtYFxuICAgICAgICBtb2RlbC5zdGFjaygpID8gLy8gU3RhY2tlZCBDaGFydCBuZWVkIHN0YWNrIHRyYW5zZm9ybVxuICAgICAgICAgIHsgdHJhbnNmb3JtOiBbc3RhY2tUcmFuc2Zvcm0obW9kZWwpXSB9IDpcbiAgICAgICAgbW9kZWwuaGFzKE9SREVSKSA/XG4gICAgICAgICAgLy8gaWYgbm9uLXN0YWNrZWQsIGRldGFpbCBmaWVsZCBkZXRlcm1pbmVzIHRoZSBsYXllciBvcmRlciBvZiBlYWNoIG1hcmtcbiAgICAgICAgICB7IHRyYW5zZm9ybTogW3t0eXBlOidzb3J0JywgYnk6IHNvcnRCeShtb2RlbCl9XSB9IDpcbiAgICAgICAgICB7fVxuICAgICAgKVxuICAgIH0gOiB7fSxcbiAgICAvLyBwcm9wZXJ0aWVzIGdyb3Vwc1xuICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IG1hcmtDb21waWxlclttYXJrXS5wcm9wZXJ0aWVzKG1vZGVsKSB9IH1cbiAgKSk7XG5cbiAgaWYgKG1vZGVsLmhhcyhMQUJFTCkgJiYgbWFya0NvbXBpbGVyW21hcmtdLmxhYmVscykge1xuICAgIGNvbnN0IGxhYmVsUHJvcGVydGllcyA9IG1hcmtDb21waWxlclttYXJrXS5sYWJlbHMobW9kZWwpO1xuXG4gICAgLy8gY2hlY2sgaWYgd2UgaGF2ZSBsYWJlbCBtZXRob2QgZm9yIGN1cnJlbnQgbWFyayB0eXBlLlxuICAgIGlmIChsYWJlbFByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkgeyAvLyBJZiBsYWJlbCBpcyBzdXBwb3J0ZWRcbiAgICAgIC8vIGFkZCBsYWJlbCBncm91cFxuICAgICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBtb2RlbC5uYW1lKCdsYWJlbCcpLFxuICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICB9LFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmUuXG4gICAgICAgIGlzRmFjZXRlZCA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgICAgLy8gUHJvcGVydGllc1xuICAgICAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiBsYWJlbFByb3BlcnRpZXMgfSB9XG4gICAgICApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFya3M7XG59XG5cbmZ1bmN0aW9uIHNvcnRCeShtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICBpZiAobW9kZWwuaGFzKE9SREVSKSkge1xuICAgIGxldCBjaGFubmVsRGVmID0gbW9kZWwuZW5jb2RpbmcoKS5vcmRlcjtcbiAgICBpZiAoY2hhbm5lbERlZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAvLyBzb3J0IGJ5IG11bHRpcGxlIGZpZWxkc1xuICAgICAgcmV0dXJuIGNoYW5uZWxEZWYubWFwKHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNvcnQgYnkgb25lIGZpZWxkXG4gICAgICByZXR1cm4gc29ydEZpZWxkKGNoYW5uZWxEZWYgYXMgT3JkZXJDaGFubmVsRGVmKTsgLy8gaGF2ZSB0byBhZGQgT3JkZXJDaGFubmVsRGVmIHRvIG1ha2UgdHNpZnkgbm90IGNvbXBsYWluaW5nXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsOyAvLyB1c2UgZGVmYXVsdCBvcmRlclxufVxuXG4vKipcbiAqIFJldHVybiBwYXRoIG9yZGVyIGZvciBzb3J0IHRyYW5zZm9ybSdzIGJ5IHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIHNvcnRQYXRoQnkobW9kZWw6IFVuaXRNb2RlbCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gTElORSAmJiBtb2RlbC5oYXMoUEFUSCkpIHtcbiAgICAvLyBGb3Igb25seSBsaW5lLCBzb3J0IGJ5IHRoZSBwYXRoIGZpZWxkIGlmIGl0IGlzIHNwZWNpZmllZC5cbiAgICBjb25zdCBjaGFubmVsRGVmID0gbW9kZWwuZW5jb2RpbmcoKS5wYXRoO1xuICAgIGlmIChjaGFubmVsRGVmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vIHNvcnQgYnkgbXVsdGlwbGUgZmllbGRzXG4gICAgICByZXR1cm4gY2hhbm5lbERlZi5tYXAoc29ydEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc29ydCBieSBvbmUgZmllbGRcbiAgICAgIHJldHVybiBzb3J0RmllbGQoY2hhbm5lbERlZiBhcyBPcmRlckNoYW5uZWxEZWYpOyAvLyBoYXZlIHRvIGFkZCBPcmRlckNoYW5uZWxEZWYgdG8gbWFrZSB0c2lmeSBub3QgY29tcGxhaW5pbmdcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIGJvdGggbGluZSBhbmQgYXJlYSwgd2Ugc29ydCB2YWx1ZXMgYmFzZWQgb24gZGltZW5zaW9uIGJ5IGRlZmF1bHRcbiAgICByZXR1cm4gJy0nICsgbW9kZWwuZmllbGQobW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJyA/IFkgOiBYKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgbGlzdCBvZiBkZXRhaWwgZmllbGRzIChmb3IgJ2NvbG9yJywgJ3NoYXBlJywgb3IgJ2RldGFpbCcgY2hhbm5lbHMpXG4gKiB0aGF0IHRoZSBtb2RlbCdzIHNwZWMgY29udGFpbnMuXG4gKi9cbmZ1bmN0aW9uIGRldGFpbEZpZWxkcyhtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nW10ge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIE9QQUNJVFksIFNIQVBFXS5yZWR1Y2UoZnVuY3Rpb24oZGV0YWlscywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmFnZ3JlZ2F0ZSkge1xuICAgICAgZGV0YWlscy5wdXNoKG1vZGVsLmZpZWxkKGNoYW5uZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH0sIFtdKTtcbn1cbiIsImltcG9ydCB7WCwgWSwgU0hBUEUsIFNJWkV9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0NoYW5uZWxEZWZXaXRoTGVnZW5kLCBGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGV9IGZyb20gJy4uLy4uL3NjYWxlJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBwb2ludCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsLCBmaXhlZFNoYXBlPzogc3RyaW5nKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBwLnNpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBtb2RlbC5zY2FsZShTSVpFKSwgY29uZmlnKTtcblxuICAgIHAuc2hhcGUgPSBzaGFwZShtb2RlbC5lbmNvZGluZygpLnNoYXBlLCBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpLCBtb2RlbC5zY2FsZShTSEFQRSksIGNvbmZpZywgZml4ZWRTaGFwZSk7XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogYW55IHtcbiAgICAvLyB4XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBhbnkge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnKTogYW55IHtcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7c2NhbGVUeXBlOiBzY2FsZS50eXBlfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLnNpemUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNoYXBlKGZpZWxkRGVmOiBDaGFubmVsRGVmV2l0aExlZ2VuZCwgc2NhbGVOYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSwgY29uZmlnOiBDb25maWcsIGZpeGVkU2hhcGU/OiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIHNoYXBlXG4gICAgaWYgKGZpeGVkU2hhcGUpIHsgLy8gc3F1YXJlIGFuZCBjaXJjbGUgbWFya3NcbiAgICAgIHJldHVybiB7IHZhbHVlOiBmaXhlZFNoYXBlIH07XG4gICAgfSBlbHNlIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHtzY2FsZVR5cGU6IHNjYWxlLnR5cGV9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLnNoYXBlIH07XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBjaXJjbGUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIHJldHVybiBwb2ludC5wcm9wZXJ0aWVzKG1vZGVsLCAnY2lyY2xlJyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIHNxdWFyZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdzcXVhcmUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIFNJWkUsIENoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHJ1bGUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdydWxlJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG5cbiAgICAvLyB2ZXJ0aWNhbFxuICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgIHAueCA9IHBvc2l0aW9uKG1vZGVsLCBYKTtcblxuICAgICAgcC55ID0geyB2YWx1ZTogMCB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBob3Jpem9udGFsXG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55ID0gcG9zaXRpb24obW9kZWwsIFkpO1xuXG4gICAgICBwLnggPSB7IHZhbHVlOiAwIH07XG4gICAgICBwLngyID0ge1xuICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRklYTUU6IHRoaXMgZnVuY3Rpb24gd291bGQgb3ZlcndyaXRlIHN0cm9rZVdpZHRoIGJ1dCBzaG91bGRuJ3RcbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG5cbiAgICAvLyBzaXplXG4gICAgaWYgKG1vZGVsLmhhcyhTSVpFKSkge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnN0cm9rZVdpZHRoID0geyB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsKSB9O1xuICAgIH1cblxuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zaXRpb24obW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZVZhbHVlKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFNJWkUpO1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIGZpZWxkRGVmLnZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5tYXJrLnJ1bGVTaXplO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7WCwgWSwgQ09MT1IsIFRFWFQsIFNJWkV9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseU1hcmtDb25maWcsIGFwcGx5Q29sb3JBbmRPcGFjaXR5LCBmb3JtYXRNaXhpbnN9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge2V4dGVuZCwgY29udGFpbnN9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcblxuZXhwb3J0IG5hbWVzcGFjZSB0ZXh0IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAndGV4dCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZChtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHk6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9LFxuICAgICAgZmlsbDoge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBtb2RlbC5maWVsZERlZihDT0xPUikudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCxcbiAgICAgIFsnYW5nbGUnLCAnYWxpZ24nLCAnYmFzZWxpbmUnLCAnZHgnLCAnZHknLCAnZm9udCcsICdmb250V2VpZ2h0JyxcbiAgICAgICAgJ2ZvbnRTdHlsZScsICdyYWRpdXMnLCAndGhldGEnLCAndGV4dCddKTtcblxuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoVEVYVCk7XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgeyAvLyBUT0RPOiBzdXBwb3J0IHgudmFsdWUsIHguZGF0dW1cbiAgICAgIGlmIChtb2RlbC5oYXMoVEVYVCkgJiYgbW9kZWwuZmllbGREZWYoVEVYVCkudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIHAueCA9IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSwgb2Zmc2V0OiAtNSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkuc2NhbGUudGV4dEJhbmRXaWR0aCAvIDIgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC55ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gICAgfVxuXG4gICAgLy8gc2l6ZVxuICAgIGlmIChtb2RlbC5oYXMoU0laRSkpIHtcbiAgICAgIHAuZm9udFNpemUgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5mb250U2l6ZSA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCkgfTtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwuY29uZmlnKCkubWFyay5hcHBseUNvbG9yVG9CYWNrZ3JvdW5kICYmICFtb2RlbC5oYXMoWCkgJiYgIW1vZGVsLmhhcyhZKSkge1xuICAgICAgcC5maWxsID0ge3ZhbHVlOiAnYmxhY2snfTsgLy8gVE9ETzogYWRkIHJ1bGVzIGZvciBzd2FwcGluZyBiZXR3ZWVuIGJsYWNrIGFuZCB3aGl0ZVxuXG4gICAgICAvLyBvcGFjaXR5XG4gICAgICBjb25zdCBvcGFjaXR5ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcGFjaXR5O1xuICAgICAgaWYgKG9wYWNpdHkpIHsgcC5vcGFjaXR5ID0geyB2YWx1ZTogb3BhY2l0eSB9OyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgfVxuXG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKG1vZGVsLmhhcyhURVhUKSkge1xuICAgICAgaWYgKGNvbnRhaW5zKFtRVUFOVElUQVRJVkUsIFRFTVBPUkFMXSwgbW9kZWwuZmllbGREZWYoVEVYVCkudHlwZSkpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gbW9kZWwuY29uZmlnKCkubWFyay5mb3JtYXQ7XG4gICAgICAgIGV4dGVuZChwLCBmb3JtYXRNaXhpbnMobW9kZWwsIFRFWFQsIGZvcm1hdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC50ZXh0ID0geyBmaWVsZDogbW9kZWwuZmllbGQoVEVYVCkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICBwLnRleHQgPSB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgIH1cblxuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZVZhbHVlKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFNJWkUpO1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIGZpZWxkRGVmLnZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5tYXJrLmZvbnRTaXplO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIFNJWkUsIENoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRpY2sge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54YyA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueGMgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55YyA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueWMgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgIHAud2lkdGggPSBtb2RlbC5oYXMoU0laRSk/IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFgpXG4gICAgICAgIH07XG4gICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHAud2lkdGggPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICAgIHAuaGVpZ2h0ID0gbW9kZWwuaGFzKFNJWkUpPyB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuICAgIGNvbnN0IG1hcmtDb25maWcgPSBtb2RlbC5jb25maWcoKS5tYXJrO1xuXG4gICAgaWYgKG1hcmtDb25maWcudGlja1NpemUpIHtcbiAgICAgIHJldHVybiBtYXJrQ29uZmlnLnRpY2tTaXplO1xuICAgIH1cbiAgICBjb25zdCBiYW5kU2l6ZSA9IG1vZGVsLmhhcyhjaGFubmVsKSA/XG4gICAgICBtb2RlbC5zY2FsZShjaGFubmVsKS5iYW5kU2l6ZSA6XG4gICAgICBzY2FsZUNvbmZpZy5iYW5kU2l6ZTtcbiAgICByZXR1cm4gYmFuZFNpemUgLyAxLjU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhLCBEYXRhVGFibGV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ1JlZHVjZSwgY2hhbm5lbE1hcHBpbmdGb3JFYWNofSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0Jhc2VTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtleHRlbmQsIGZsYXR0ZW4sIHZhbHMsIHdhcm5pbmcsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnTWFya0dyb3VwLCBWZ1NjYWxlLCBWZ0F4aXMsIFZnTGVnZW5kfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHtMYXlvdXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcblxuLyoqXG4gKiBDb21wb3NhYmxlIENvbXBvbmVudHMgdGhhdCBhcmUgaW50ZXJtZWRpYXRlIHJlc3VsdHMgb2YgdGhlIHBhcnNpbmcgcGhhc2Ugb2YgdGhlXG4gKiBjb21waWxhdGlvbnMuICBUaGVzZSBjb21wb3NhYmxlIGNvbXBvbmVudHMgd2lsbCBiZSBhc3NlbWJsZWQgaW4gdGhlIGxhc3RcbiAqIGNvbXBpbGF0aW9uIHN0ZXAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IHtcbiAgZGF0YTogRGF0YUNvbXBvbmVudDtcbiAgbGF5b3V0OiBMYXlvdXRDb21wb25lbnQ7XG4gIHNjYWxlOiBEaWN0PFNjYWxlQ29tcG9uZW50cz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnQXhpcyBkZWZpbml0aW9uICovXG4gIC8vIFRPRE86IGlmIHdlIGFsbG93IG11bHRpcGxlIGF4ZXMgKGUuZy4sIGR1YWwgYXhpcyksIHRoaXMgd2lsbCBiZWNvbWUgVmdBeGlzW11cbiAgYXhpczogRGljdDxWZ0F4aXM+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBWZ0xlZ2VuZCBkZWZpbml0aW9uICovXG4gIGxlZ2VuZDogRGljdDxWZ0xlZ2VuZD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGF4aXMgbWFyayBncm91cCBmb3IgZmFjZXQgYW5kIGNvbmNhdCAqL1xuICBheGlzR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXA+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBncmlkIG1hcmsgZ3JvdXAgZm9yIGZhY2V0IChhbmQgY29uY2F0PykgKi9cbiAgZ3JpZEdyb3VwOiBEaWN0PFZnTWFya0dyb3VwW10+O1xuXG4gIG1hcms6IFZnTWFya0dyb3VwW107XG59XG5cbmNsYXNzIE5hbWVNYXAge1xuICBwcml2YXRlIF9uYW1lTWFwOiBEaWN0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbmFtZU1hcCA9IHt9IGFzIERpY3Q8c3RyaW5nPjtcbiAgfVxuXG4gIHB1YmxpYyByZW5hbWUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lTWFwW29sZE5hbWVdID0gbmV3TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBJZiB0aGUgbmFtZSBhcHBlYXJzIGluIHRoZSBfbmFtZU1hcCwgd2UgbmVlZCB0byByZWFkIGl0cyBuZXcgbmFtZS5cbiAgICAvLyBXZSBoYXZlIHRvIGxvb3Agb3ZlciB0aGUgZGljdCBqdXN0IGluIGNhc2UsIHRoZSBuZXcgbmFtZSBhbHNvIGdldHMgcmVuYW1lZC5cbiAgICB3aGlsZSAodGhpcy5fbmFtZU1hcFtuYW1lXSkge1xuICAgICAgbmFtZSA9IHRoaXMuX25hbWVNYXBbbmFtZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IE1vZGVsO1xuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9kZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBfZGF0YTogRGF0YTtcblxuICAvKiogTmFtZSBtYXAgZm9yIGRhdGEgc291cmNlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9kYXRhTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNjYWxlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9zY2FsZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgLyoqIE5hbWUgbWFwIGZvciBzaXplLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NpemVOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG4gIHByb3RlY3RlZCBfc2NhbGU6IERpY3Q8U2NhbGU+O1xuXG4gIHByb3RlY3RlZCBfYXhpczogRGljdDxBeGlzPjtcblxuICBwcm90ZWN0ZWQgX2xlZ2VuZDogRGljdDxMZWdlbmQ+O1xuXG4gIHByb3RlY3RlZCBfY29uZmlnOiBDb25maWc7XG5cbiAgcHJvdGVjdGVkIF93YXJuaW5nczogc3RyaW5nW10gPSBbXTtcblxuICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogQmFzZVNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXG4gICAgLy8gSWYgbmFtZSBpcyBub3QgcHJvdmlkZWQsIGFsd2F5cyB1c2UgcGFyZW50J3MgZ2l2ZW5OYW1lIHRvIGF2b2lkIG5hbWUgY29uZmxpY3RzLlxuICAgIHRoaXMuX25hbWUgPSBzcGVjLm5hbWUgfHwgcGFyZW50R2l2ZW5OYW1lO1xuXG4gICAgLy8gU2hhcmVkIG5hbWUgbWFwc1xuICAgIHRoaXMuX2RhdGFOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9kYXRhTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zY2FsZU5hbWVNYXAgOiBuZXcgTmFtZU1hcCgpO1xuICAgIHRoaXMuX3NpemVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zaXplTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG5cbiAgICB0aGlzLl9kYXRhID0gc3BlYy5kYXRhO1xuXG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBzcGVjLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3RyYW5zZm9ybSA9IHNwZWMudHJhbnNmb3JtO1xuXG4gICAgdGhpcy5jb21wb25lbnQgPSB7ZGF0YTogbnVsbCwgbGF5b3V0OiBudWxsLCBtYXJrOiBudWxsLCBzY2FsZTogbnVsbCwgYXhpczogbnVsbCwgYXhpc0dyb3VwOiBudWxsLCBncmlkR3JvdXA6IG51bGwsIGxlZ2VuZDogbnVsbH07XG4gIH1cblxuXG4gIHB1YmxpYyBwYXJzZSgpIHtcbiAgICB0aGlzLnBhcnNlRGF0YSgpO1xuICAgIHRoaXMucGFyc2VTZWxlY3Rpb25EYXRhKCk7XG4gICAgdGhpcy5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLnBhcnNlU2NhbGUoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWVcbiAgICB0aGlzLnBhcnNlQXhpcygpOyAvLyBkZXBlbmRzIG9uIHNjYWxlIG5hbWVcbiAgICB0aGlzLnBhcnNlTGVnZW5kKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzR3JvdXAoKTsgLy8gZGVwZW5kcyBvbiBjaGlsZCBheGlzXG4gICAgdGhpcy5wYXJzZUdyaWRHcm91cCgpO1xuICAgIHRoaXMucGFyc2VNYXJrKCk7IC8vIGRlcGVuZHMgb24gZGF0YSBuYW1lIGFuZCBzY2FsZSBuYW1lLCBheGlzR3JvdXAsIGdyaWRHcm91cCBhbmQgY2hpbGRyZW4ncyBzY2FsZSwgYXhpcywgbGVnZW5kIGFuZCBtYXJrLlxuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZVNlbGVjdGlvbkRhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VMYXlvdXREYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2NhbGUoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VNYXJrKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpcygpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxlZ2VuZCgpO1xuXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGVzZSB0d28gbWV0aG9kcyBtYWtlIHNlbnNlIGZvciBzaGFyZWQgc2NhbGUgY29uY2F0XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUF4aXNHcm91cCgpO1xuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VHcmlkR3JvdXAoKTtcblxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICAvLyBUT0RPOiBmb3IgQXJ2aW5kIHRvIHdyaXRlXG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvblNpZ25hbChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuICAvLyBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVTZWxlY3Rpb25EYXRhKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG5cbiAgcHVibGljIGFzc2VtYmxlU2NhbGVzKCk6IFZnU2NhbGVbXSB7XG4gICAgLy8gRklYTUU6IHdyaXRlIGFzc2VtYmxlU2NhbGVzKCkgaW4gc2NhbGUudHMgdGhhdFxuICAgIC8vIGhlbHAgYXNzZW1ibGUgc2NhbGUgZG9tYWlucyB3aXRoIHNjYWxlIHNpZ25hdHVyZSBhcyB3ZWxsXG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5zY2FsZSkubWFwKChzY2FsZXM6IFNjYWxlQ29tcG9uZW50cykgPT4ge1xuICAgICAgbGV0IGFyciA9IFtzY2FsZXMubWFpbl07XG4gICAgICBpZiAoc2NhbGVzLmNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5jb2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoc2NhbGVzLmJpbkNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5iaW5Db2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZU1hcmtzKCk6IGFueVtdOyAvLyBUT0RPOiBWZ01hcmtHcm91cFtdXG5cbiAgcHVibGljIGFzc2VtYmxlQXhlcygpOiBWZ0F4aXNbXSB7XG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQuYXhpcyk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMZWdlbmRzKCk6IGFueVtdIHsgLy8gVE9ETzogVmdMZWdlbmRbXVxuICAgIHJldHVybiB2YWxzKHRoaXMuY29tcG9uZW50LmxlZ2VuZCk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVHcm91cCgpIHtcbiAgICBsZXQgZ3JvdXA6IFZnTWFya0dyb3VwID0ge307XG5cbiAgICAvLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHNjYWxlcyB0byBjb21lIGJlZm9yZSBtYXJrcyBpbiB0aGUgb3V0cHV0IHNwZWMuXG5cbiAgICBncm91cC5tYXJrcyA9IHRoaXMuYXNzZW1ibGVNYXJrcygpO1xuICAgIGNvbnN0IHNjYWxlcyA9IHRoaXMuYXNzZW1ibGVTY2FsZXMoKTtcbiAgICBpZiAoc2NhbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLnNjYWxlcyA9IHNjYWxlcztcbiAgICB9XG5cbiAgICBjb25zdCBheGVzID0gdGhpcy5hc3NlbWJsZUF4ZXMoKTtcbiAgICBpZiAoYXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5heGVzID0gYXhlcztcbiAgICB9XG5cbiAgICBjb25zdCBsZWdlbmRzID0gdGhpcy5hc3NlbWJsZUxlZ2VuZHMoKTtcbiAgICBpZiAobGVnZW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5sZWdlbmRzID0gbGVnZW5kcztcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoY2VsbENvbmZpZzogQ2VsbENvbmZpZyk7XG5cbiAgcHVibGljIGFic3RyYWN0IGNoYW5uZWxzKCk6IENoYW5uZWxbXTtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbWFwcGluZygpO1xuXG4gIHB1YmxpYyByZWR1Y2UoZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwpID0+IGFueSwgaW5pdCwgdD86IGFueSkge1xuICAgIHJldHVybiBjaGFubmVsTWFwcGluZ1JlZHVjZSh0aGlzLmNoYW5uZWxzKCksIHRoaXMubWFwcGluZygpLCBmLCBpbml0LCB0KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoKGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6bnVtYmVyKSA9PiB2b2lkLCB0PzogYW55KSB7XG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIHQpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbjtcblxuICBwdWJsaWMgcGFyZW50KCk6IE1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIG5hbWUodGV4dDogc3RyaW5nLCBkZWxpbWl0ZXI6IHN0cmluZyA9ICdfJykge1xuICAgIHJldHVybiAodGhpcy5fbmFtZSA/IHRoaXMuX25hbWUgKyBkZWxpbWl0ZXIgOiAnJykgKyB0ZXh0O1xuICB9XG5cbiAgcHVibGljIGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZURhdGEob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICAgdGhpcy5fZGF0YU5hbWVNYXAucmVuYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGF0YSBzb3VyY2UgbmFtZSBmb3IgdGhlIGdpdmVuIGRhdGEgc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEZvciB1bml0IHNwZWMsIHRoaXMgaXMgYWx3YXlzIHNpbXBseSB0aGUgc3BlYy5uYW1lICsgJy0nICsgZGF0YVNvdXJjZVR5cGUuXG4gICAqIFdlIGFscmVhZHkgdXNlIHRoZSBuYW1lIG1hcCBzbyB0aGF0IG1hcmtzIGFuZCBzY2FsZXMgdXNlIHRoZSBjb3JyZWN0IGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZGF0YU5hbWUoZGF0YVNvdXJjZVR5cGU6IERhdGFUYWJsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFOYW1lTWFwLmdldCh0aGlzLm5hbWUoU3RyaW5nKGRhdGFTb3VyY2VUeXBlKSkpO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNpemUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaXplTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbFNpemVOYW1lKGNoYW5uZWw6IENoYW5uZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNpemVOYW1lKGNoYW5uZWwgPT09IFggfHwgY2hhbm5lbCA9PT0gQ09MVU1OID8gJ3dpZHRoJyA6ICdoZWlnaHQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzaXplTmFtZShzaXplOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICByZXR1cm4gdGhpcy5fc2l6ZU5hbWVNYXAuZ2V0KHRoaXMubmFtZShzaXplLCAnXycpKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBkYXRhVGFibGUoKTogc3RyaW5nO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oKTogVHJhbnNmb3JtIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpbiBoYXMgZGVmYXVsdCBzdWZmaXggdGhhdCBkZXBlbmRzIG9uIHNjYWxlVHlwZVxuICAgICAgb3B0ID0gZXh0ZW5kKHtcbiAgICAgICAgYmluU3VmZml4OiB0aGlzLnNjYWxlKGNoYW5uZWwpLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgfSwgb3B0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmO1xuXG4gIHB1YmxpYyBzY2FsZShjaGFubmVsOiBDaGFubmVsKTogU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZVtjaGFubmVsXTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbmFtZSB0byBoYXNPcmRpbmFsU2NhbGVcbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2NhbGUoY2hhbm5lbCk7XG4gICAgcmV0dXJuIHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNjYWxlKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIC8qKiByZXR1cm5zIHNjYWxlIG5hbWUgZm9yIGEgZ2l2ZW4gY2hhbm5lbCAqL1xuICBwdWJsaWMgc2NhbGVOYW1lKGNoYW5uZWw6IENoYW5uZWx8c3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGVOYW1lTWFwLmdldCh0aGlzLm5hbWUoY2hhbm5lbCArICcnKSk7XG4gIH1cblxuICBwdWJsaWMgc29ydChjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuICh0aGlzLm1hcHBpbmcoKVtjaGFubmVsXSB8fCB7fSkuc29ydDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzdGFjaygpO1xuXG4gIHB1YmxpYyBheGlzKGNoYW5uZWw6IENoYW5uZWwpOiBBeGlzIHtcbiAgICByZXR1cm4gdGhpcy5fYXhpc1tjaGFubmVsXTtcbiAgfVxuXG4gIHB1YmxpYyBsZWdlbmQoY2hhbm5lbDogQ2hhbm5lbCk6IExlZ2VuZCB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZ2VuZFtjaGFubmVsXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNwZWMgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjb25maWcoKTogQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgcHVibGljIGFkZFdhcm5pbmcobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgd2FybmluZyhtZXNzYWdlKTtcbiAgICB0aGlzLl93YXJuaW5ncy5wdXNoKG1lc3NhZ2UpO1xuICB9XG5cbiAgcHVibGljIHdhcm5pbmdzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fd2FybmluZ3M7XG4gIH1cblxuICAvKipcbiAgICogVHlwZSBjaGVja3NcbiAgICovXG4gIHB1YmxpYyBpc1VuaXQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHB1YmxpYyBpc0ZhY2V0KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBwdWJsaWMgaXNMYXllcigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSB2YXIgZXhwb3J0cztcblxuaW1wb3J0IHtTSEFSRURfRE9NQUlOX09QU30gZnJvbSAnLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIFNIQVBFLCBTSVpFLCBDT0xPUiwgT1BBQ0lUWSwgVEVYVCwgaGFzU2NhbGUsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7U09VUkNFLCBTVEFDS0VEX1NDQUxFfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TWFyaywgQkFSLCBURVhUIGFzIFRFWFRfTUFSSywgUlVMRSwgVElDS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFFVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdTY2FsZX0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cmF3RG9tYWluLCBzbWFsbGVzdFVuaXR9IGZyb20gJy4vdGltZSc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcblxuLyoqXG4gKiBDb2xvciBSYW1wJ3Mgc2NhbGUgZm9yIGxlZ2VuZHMuICBUaGlzIHNjYWxlIGhhcyB0byBiZSBvcmRpbmFsIHNvIHRoYXQgaXRzXG4gKiBsZWdlbmRzIHNob3cgYSBsaXN0IG9mIG51bWJlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBDT0xPUl9MRUdFTkQgPSAnY29sb3JfbGVnZW5kJztcblxuLy8gc2NhbGUgdXNlZCB0byBnZXQgbGFiZWxzIGZvciBiaW5uZWQgY29sb3Igc2NhbGVzXG5leHBvcnQgY29uc3QgQ09MT1JfTEVHRU5EX0xBQkVMID0gJ2NvbG9yX2xlZ2VuZF9sYWJlbCc7XG5cblxuLy8gRklYTUU6IFdpdGggbGF5ZXIgYW5kIGNvbmNhdCwgc2NhbGVDb21wb25lbnQgc2hvdWxkIGRlY29tcG9zZSBiZXR3ZWVuXG4vLyBTY2FsZVNpZ25hdHVyZSBhbmQgU2NhbGVEb21haW5bXS5cbi8vIEJhc2ljYWxseSwgaWYgdHdvIHVuaXQgc3BlY3MgaGFzIHRoZSBzYW1lIHNjYWxlLCBzaWduYXR1cmUgZm9yIGEgcGFydGljdWxhciBjaGFubmVsLFxuLy8gdGhlIHNjYWxlIGNhbiBiZSB1bmlvbmVkIGJ5IGNvbWJpbmluZyB0aGUgZG9tYWluLlxuZXhwb3J0IHR5cGUgU2NhbGVDb21wb25lbnQgPSBWZ1NjYWxlO1xuXG5leHBvcnQgdHlwZSBTY2FsZUNvbXBvbmVudHMgPSB7XG4gIG1haW46IFNjYWxlQ29tcG9uZW50O1xuICBjb2xvckxlZ2VuZD86IFNjYWxlQ29tcG9uZW50LFxuICBiaW5Db2xvckxlZ2VuZD86IFNjYWxlQ29tcG9uZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNjYWxlQ29tcG9uZW50KG1vZGVsOiBNb2RlbCk6IERpY3Q8U2NhbGVDb21wb25lbnRzPiB7XG4gIHJldHVybiBtb2RlbC5jaGFubmVscygpLnJlZHVjZShmdW5jdGlvbihzY2FsZTogRGljdDxTY2FsZUNvbXBvbmVudHM+LCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAobW9kZWwuc2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgICAgICAgY29uc3Qgc2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgbWFpbjogcGFyc2VNYWluU2NhbGUobW9kZWwsIGZpZWxkRGVmLCBjaGFubmVsKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIHNjYWxlcyBuZWVkZWQgdG8gc3VwcG9ydCBvcmRpbmFsIGxlZ2VuZHMgKGxpc3Qgb2YgdmFsdWVzKVxuICAgICAgICAvLyBmb3IgY29sb3IgcmFtcC5cbiAgICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SICYmIG1vZGVsLmxlZ2VuZChDT0xPUikgJiYgKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgfHwgZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSkge1xuICAgICAgICAgIHNjYWxlcy5jb2xvckxlZ2VuZCA9IHBhcnNlQ29sb3JMZWdlbmRTY2FsZShtb2RlbCwgZmllbGREZWYpO1xuICAgICAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgICAgIHNjYWxlcy5iaW5Db2xvckxlZ2VuZCA9IHBhcnNlQmluQ29sb3JMZWdlbmRMYWJlbChtb2RlbCwgZmllbGREZWYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNjYWxlW2NoYW5uZWxdID0gc2NhbGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGVDb21wb25lbnRzPik7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtYWluIHNjYWxlIGZvciBlYWNoIGNoYW5uZWwuICAoT25seSBjb2xvciBjYW4gaGF2ZSBtdWx0aXBsZSBzY2FsZXMuKVxuICovXG5mdW5jdGlvbiBwYXJzZU1haW5TY2FsZShtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcblxuICBsZXQgc2NhbGVEZWY6IGFueSA9IHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgdHlwZTogc2NhbGUudHlwZSxcbiAgfTtcblxuICBzY2FsZURlZi5kb21haW4gPSBkb21haW4oc2NhbGUsIG1vZGVsLCBjaGFubmVsKTtcbiAgZXh0ZW5kKHNjYWxlRGVmLCByYW5nZU1peGlucyhzY2FsZSwgbW9kZWwsIGNoYW5uZWwpKTtcblxuICBpZiAoc29ydCAmJiAodHlwZW9mIHNvcnQgPT09ICdzdHJpbmcnID8gc29ydCA6IHNvcnQub3JkZXIpID09PSAnZGVzY2VuZGluZycpIHtcbiAgICBzY2FsZURlZi5yZXZlcnNlID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFkZCBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gIFtcbiAgICAvLyBnZW5lcmFsIHByb3BlcnRpZXNcbiAgICAncm91bmQnLFxuICAgIC8vIHF1YW50aXRhdGl2ZSAvIHRpbWVcbiAgICAnY2xhbXAnLCAnbmljZScsXG4gICAgLy8gcXVhbnRpdGF0aXZlXG4gICAgJ2V4cG9uZW50JywgJ3plcm8nLFxuICAgIC8vIG9yZGluYWxcbiAgICAncGFkZGluZycsICdwb2ludHMnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gZXhwb3J0c1twcm9wZXJ0eV0oc2NhbGUsIGNoYW5uZWwsIGZpZWxkRGVmLCBtb2RlbCk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjYWxlRGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNjYWxlRGVmO1xufVxuXG4vKipcbiAqICBSZXR1cm4gYSBzY2FsZSAgZm9yIHByb2R1Y2luZyBvcmRpbmFsIHNjYWxlIGZvciBsZWdlbmRzLlxuICogIC0gRm9yIGFuIG9yZGluYWwgZmllbGQsIHByb3ZpZGUgYW4gb3JkaW5hbCBzY2FsZSB0aGF0IG1hcHMgcmFuayB2YWx1ZXMgdG8gZmllbGQgdmFsdWVcbiAqICAtIEZvciBhIGZpZWxkIHdpdGggYmluIG9yIHRpbWVVbml0LCBwcm92aWRlIGFuIGlkZW50aXR5IG9yZGluYWwgc2NhbGVcbiAqICAgIChtYXBwaW5nIHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlbXNlbHZlcylcbiAqL1xuZnVuY3Rpb24gcGFyc2VDb2xvckxlZ2VuZFNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmKTogU2NhbGVDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkQpLFxuICAgIHR5cGU6IFNjYWxlVHlwZS5PUkRJTkFMLFxuICAgIGRvbWFpbjoge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAvLyB1c2UgcmFua188ZmllbGQ+IGZvciBvcmRpbmFsIHR5cGUsIGZvciBiaW4gYW5kIHRpbWVVbml0IHVzZSBkZWZhdWx0IGZpZWxkXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIChmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQpID8ge30gOiB7cHJlZm46ICdyYW5rXyd9KSxcbiAgICAgIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksIHNvcnQ6IHRydWV9XG4gIH07XG59XG5cbi8qKlxuICogIFJldHVybiBhbiBhZGRpdGlvbmFsIHNjYWxlIGZvciBiaW4gbGFiZWxzIGJlY2F1c2Ugd2UgbmVlZCB0byBtYXAgYmluX3N0YXJ0IHRvIGJpbl9yYW5nZSBpbiBsZWdlbmRzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQmluQ29sb3JMZWdlbmRMYWJlbChtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IFNjYWxlQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EX0xBQkVMKSxcbiAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSxcbiAgICAgIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVUeXBlKHNjYWxlOiBTY2FsZSwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsLCBtYXJrOiBNYXJrKTogU2NhbGVUeXBlIHtcbiAgaWYgKCFoYXNTY2FsZShjaGFubmVsKSkge1xuICAgIC8vIFRoZXJlIGlzIG5vIHNjYWxlIGZvciB0aGVzZSBjaGFubmVsc1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgY2FuJ3QgdXNlIGxpbmVhci90aW1lIGZvciByb3csIGNvbHVtbiBvciBzaGFwZVxuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgaWYgKHNjYWxlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY2FsZS50eXBlO1xuICB9XG5cbiAgc3dpdGNoIChmaWVsZERlZi50eXBlKSB7XG4gICAgY2FzZSBOT01JTkFMOlxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgIGNhc2UgT1JESU5BTDpcbiAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgICByZXR1cm4gU2NhbGVUeXBlLkxJTkVBUjsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICBjYXNlIFRFTVBPUkFMOlxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgICAgIGNhc2UgVGltZVVuaXQuREFZOlxuICAgICAgICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICAgICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIGRhdGUsIHllYXIsIG1pbnV0ZSwgc2Vjb25kLCB5ZWFybW9udGgsIG1vbnRoZGF5LCAuLi5cbiAgICAgICAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xuXG4gICAgY2FzZSBRVUFOVElUQVRJVkU6XG4gICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIHJldHVybiBjb250YWlucyhbWCwgWSwgQ09MT1JdLCBjaGFubmVsKSA/IFNjYWxlVHlwZS5MSU5FQVIgOiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuTElORUFSO1xuICB9XG5cbiAgLy8gc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXNcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW4oc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6Q2hhbm5lbCk6IGFueSB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgaWYgKHNjYWxlLmRvbWFpbikgeyAvLyBleHBsaWNpdCB2YWx1ZVxuICAgIHJldHVybiBzY2FsZS5kb21haW47XG4gIH1cblxuICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRlbXBvcmFsIHNjYWxlXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIGlmIChyYXdEb21haW4oZmllbGREZWYudGltZVVuaXQsIGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBmaWVsZERlZi50aW1lVW5pdCxcbiAgICAgICAgZmllbGQ6ICdkYXRlJ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgICAgb3A6ICdtaW4nXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEZvciBzdGFjaywgdXNlIFNUQUNLRUQgZGF0YS5cbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBpZiAoc3RhY2sgJiYgY2hhbm5lbCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgaWYoc3RhY2sub2Zmc2V0ID09PSBTdGFja09mZnNldC5OT1JNQUxJWkUpIHtcbiAgICAgIHJldHVybiBbMCwgMV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhTmFtZShTVEFDS0VEX1NDQUxFKSxcbiAgICAgIC8vIFNUQUNLRURfU0NBTEUgcHJvZHVjZXMgc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3N1bV8nfSlcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgdXNlUmF3RG9tYWluID0gX3VzZVJhd0RvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwpLFxuICBzb3J0ID0gZG9tYWluU29ydChtb2RlbCwgY2hhbm5lbCwgc2NhbGUudHlwZSk7XG5cbiAgaWYgKHVzZVJhd0RvbWFpbikgeyAvLyB1c2VSYXdEb21haW4gLSBvbmx5IFEvVFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBTT1VSQ0UsXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwge25vQWdncmVnYXRlOiB0cnVlfSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW5cbiAgICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICAgIC8vIG9yZGluYWwgYmluIHNjYWxlIHRha2VzIGRvbWFpbiBmcm9tIGJpbl9yYW5nZSwgb3JkZXJlZCBieSBiaW5fc3RhcnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfcmFuZ2UnIH0pLFxuICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgICBvcDogJ21pbicgLy8gbWluIG9yIG1heCBkb2Vzbid0IG1hdHRlciBzaW5jZSBzYW1lIF9yYW5nZSB3b3VsZCBoYXZlIHRoZSBzYW1lIF9zdGFydFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIC8vIEN1cnJlbnRseSwgYmlubmVkIG9uIGNvbG9yIHVzZXMgbGluZWFyIHNjYWxlIGFuZCB0aHVzIHVzZSBfc3RhcnQgcG9pbnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlciBsaW5lYXIgYmluIHNjYWxlIG1lcmdlcyBib3RoIGJpbl9zdGFydCBhbmQgYmluX2VuZCBmb3Igbm9uLW9yZGluYWwgc2NhbGVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICBmaWVsZDogW1xuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgICBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIF1cbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2UgaWYgKHNvcnQpIHsgLy8gaGF2ZSBzb3J0IC0tIG9ubHkgZm9yIG9yZGluYWxcbiAgICByZXR1cm4ge1xuICAgICAgLy8gSWYgc29ydCBieSBhZ2dyZWdhdGlvbiBvZiBhIHNwZWNpZmllZCBzb3J0IGZpZWxkLCB3ZSBuZWVkIHRvIHVzZSBTT1VSQ0UgdGFibGUsXG4gICAgICAvLyBzbyB3ZSBjYW4gYWdncmVnYXRlIHZhbHVlcyBmb3IgdGhlIHNjYWxlIGluZGVwZW5kZW50bHkgZnJvbSB0aGUgbWFpbiBhZ2dyZWdhdGlvbi5cbiAgICAgIGRhdGE6IHNvcnQub3AgPyBTT1VSQ0UgOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCAmJiBjaGFubmVsID09PSBDT0xPUikgPyBtb2RlbC5maWVsZChjaGFubmVsLCB7cHJlZm46ICdyYW5rXyd9KSA6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgc29ydDogc29ydFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMICYmIGNoYW5uZWwgPT09IENPTE9SKSA/IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3JhbmtfJ30pIDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9tYWluU29ydChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHNjYWxlVHlwZTogU2NhbGVUeXBlKTogYW55IHtcbiAgaWYgKHNjYWxlVHlwZSAhPT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3Qgc29ydCA9IG1vZGVsLnNvcnQoY2hhbm5lbCk7XG4gIGlmIChjb250YWlucyhbJ2FzY2VuZGluZycsICdkZXNjZW5kaW5nJywgdW5kZWZpbmVkIC8qIGRlZmF1bHQgPWFzY2VuZGluZyovXSwgc29ydCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFNvcnRlZCBiYXNlZCBvbiBhbiBhZ2dyZWdhdGUgY2FsY3VsYXRpb24gb3ZlciBhIHNwZWNpZmllZCBzb3J0IGZpZWxkIChvbmx5IGZvciBvcmRpbmFsIHNjYWxlKVxuICBpZiAodHlwZW9mIHNvcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wOiBzb3J0Lm9wLFxuICAgICAgZmllbGQ6IHNvcnQuZmllbGRcbiAgICB9O1xuICB9XG5cbiAgLy8gc29ydCA9PT0gJ25vbmUnXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdXNlUmF3RG9tYWluIHNob3VsZCBiZSBhY3RpdmF0ZWQgZm9yIHRoaXMgc2NhbGUuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0b25zIGFwcGxpZXM6XG4gKiAxLiBgdXNlUmF3RG9tYWluYCBpcyBlbmFibGVkIGVpdGhlciB0aHJvdWdoIHNjYWxlIG9yIGNvbmZpZ1xuICogMi4gQWdncmVnYXRpb24gZnVuY3Rpb24gaXMgbm90IGBjb3VudGAgb3IgYHN1bWBcbiAqIDMuIFRoZSBzY2FsZSBpcyBxdWFudGl0YXRpdmUgb3IgdGltZSBzY2FsZS5cbiAqL1xuZnVuY3Rpb24gX3VzZVJhd0RvbWFpbiAoc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICByZXR1cm4gc2NhbGUudXNlUmF3RG9tYWluICYmIC8vICBpZiB1c2VSYXdEb21haW4gaXMgZW5hYmxlZFxuICAgIC8vIG9ubHkgYXBwbGllZCB0byBhZ2dyZWdhdGUgdGFibGVcbiAgICBmaWVsZERlZi5hZ2dyZWdhdGUgJiZcbiAgICAvLyBvbmx5IGFjdGl2YXRlZCBpZiB1c2VkIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2VzIHZhbHVlcyByYW5naW5nIGluIHRoZSBkb21haW4gb2YgdGhlIHNvdXJjZSBkYXRhXG4gICAgU0hBUkVEX0RPTUFJTl9PUFMuaW5kZXhPZihmaWVsZERlZi5hZ2dyZWdhdGUpID49IDAgJiZcbiAgICAoXG4gICAgICAvLyBRIGFsd2F5cyB1c2VzIHF1YW50aXRhdGl2ZSBzY2FsZSBleGNlcHQgd2hlbiBpdCdzIGJpbm5lZC5cbiAgICAgIC8vIEJpbm5lZCBmaWVsZCBoYXMgc2ltaWxhciB2YWx1ZXMgaW4gYm90aCB0aGUgc291cmNlIHRhYmxlIGFuZCB0aGUgc3VtbWFyeSB0YWJsZVxuICAgICAgLy8gYnV0IHRoZSBzdW1tYXJ5IHRhYmxlIGhhcyBmZXdlciB2YWx1ZXMsIHRoZXJlZm9yZSBiaW5uZWQgZmllbGRzIGRyYXdcbiAgICAgIC8vIGRvbWFpbiB2YWx1ZXMgZnJvbSB0aGUgc3VtbWFyeSB0YWJsZS5cbiAgICAgIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikgfHxcbiAgICAgIC8vIFQgdXNlcyBub24tb3JkaW5hbCBzY2FsZSB3aGVuIHRoZXJlJ3Mgbm8gdW5pdCBvciB3aGVuIHRoZSB1bml0IGlzIG5vdCBvcmRpbmFsLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKVxuICAgICk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlTWl4aW5zKHNjYWxlOiBTY2FsZSwgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogYW55IHtcbiAgLy8gVE9ETzogbmVlZCB0byBhZGQgcnVsZSBmb3IgcXVhbnRpbGUsIHF1YW50aXplLCB0aHJlc2hvbGQgc2NhbGVcblxuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBzY2FsZS5iYW5kU2l6ZSAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIHtiYW5kU2l6ZTogc2NhbGUuYmFuZFNpemV9O1xuICB9XG5cbiAgaWYgKHNjYWxlLnJhbmdlICYmICFjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU5dLCBjaGFubmVsKSkge1xuICAgIC8vIGV4cGxpY2l0IHZhbHVlIChEbyBub3QgYWxsb3cgZXhwbGljaXQgdmFsdWVzIGZvciBYLCBZLCBST1csIENPTFVNTilcbiAgICByZXR1cm4ge3JhbmdlOiBzY2FsZS5yYW5nZX07XG4gIH1cbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgICByZXR1cm4ge3JhbmdlOiAnaGVpZ2h0J307XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4ge3JhbmdlOiAnd2lkdGgnfTtcbiAgfVxuXG4gIC8vIElmIG5vdCBST1cgLyBDT0xVTU4sIHdlIGNhbiBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgdW5pdCBzcGVjLlxuICBjb25zdCB1bml0TW9kZWwgPSBtb2RlbCBhcyBVbml0TW9kZWw7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICAgIC8vIHdlIGNhbid0IHVzZSB7cmFuZ2U6IFwid2lkdGhcIn0gaGVyZSBzaW5jZSB3ZSBwdXQgc2NhbGUgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgIC8vIG5vdCBpbnNpZGUgdGhlIGNlbGwsIHNvIHNjYWxlIGlzIHJldXNhYmxlIGZvciBheGVzIGdyb3VwXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlTWluOiAwLFxuICAgICAgICByYW5nZU1heDogdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLy8gRml4ZWQgY2VsbCB3aWR0aCBmb3Igbm9uLW9yZGluYWxcbiAgICAgIH07XG4gICAgY2FzZSBZOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLmhlaWdodCwgLy8gRml4ZWQgY2VsbCBoZWlnaHQgZm9yIG5vbi1vcmRpbmFsXG4gICAgICAgIHJhbmdlTWF4OiAwXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcblxuICAgICAgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IEJBUikge1xuICAgICAgICBpZiAoc2NhbGVDb25maWcuYmFyU2l6ZVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2V9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAnaG9yaXpvbnRhbCcgPyBZIDogWDtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogW21vZGVsLmNvbmZpZygpLm1hcmsuYmFyVGhpblNpemUsIG1vZGVsLnNjYWxlKGRpbWVuc2lvbikuYmFuZFNpemVdfTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gVEVYVF9NQVJLKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLmZvbnRTaXplUmFuZ2UgfTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gUlVMRSkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5ydWxlU2l6ZVJhbmdlIH07XG4gICAgICB9IGVsc2UgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IFRJQ0spIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcudGlja1NpemVSYW5nZSB9O1xuICAgICAgfVxuICAgICAgLy8gZWxzZSAtLSBwb2ludCwgc3F1YXJlLCBjaXJjbGVcbiAgICAgIGlmIChzY2FsZUNvbmZpZy5wb2ludFNpemVSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnBvaW50U2l6ZVJhbmdlfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFuZFNpemUgPSBwb2ludEJhbmRTaXplKHVuaXRNb2RlbCk7XG5cbiAgICAgIHJldHVybiB7cmFuZ2U6IFs5LCAoYmFuZFNpemUgLSAyKSAqIChiYW5kU2l6ZSAtIDIpXX07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNoYXBlUmFuZ2V9O1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gTk9NSU5BTCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5ub21pbmFsQ29sb3JSYW5nZX07XG4gICAgICB9XG4gICAgICAvLyBlbHNlIC0tIG9yZGluYWwsIHRpbWUsIG9yIHF1YW50aXRhdGl2ZVxuICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcuc2VxdWVudGlhbENvbG9yUmFuZ2V9O1xuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLm9wYWNpdHl9O1xuICB9XG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gcG9pbnRCYW5kU2l6ZShtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IHNjYWxlQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuc2NhbGU7XG5cbiAgY29uc3QgaGFzWCA9IG1vZGVsLmhhcyhYKTtcbiAgY29uc3QgaGFzWSA9IG1vZGVsLmhhcyhZKTtcblxuICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKG1vZGVsLmVuY29kaW5nKCkueCk7XG4gIGNvbnN0IHlJc01lYXN1cmUgPSBpc01lYXN1cmUobW9kZWwuZW5jb2RpbmcoKS55KTtcblxuICBpZiAoaGFzWCAmJiBoYXNZKSB7XG4gICAgcmV0dXJuIHhJc01lYXN1cmUgIT09IHlJc01lYXN1cmUgP1xuICAgICAgbW9kZWwuc2NhbGUoeElzTWVhc3VyZSA/IFkgOiBYKS5iYW5kU2l6ZSA6XG4gICAgICBNYXRoLm1pbihcbiAgICAgICAgbW9kZWwuc2NhbGUoWCkuYmFuZFNpemUgfHwgc2NhbGVDb25maWcuYmFuZFNpemUsXG4gICAgICAgIG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplXG4gICAgICApO1xuICB9IGVsc2UgaWYgKGhhc1kpIHtcbiAgICByZXR1cm4geUlzTWVhc3VyZSA/IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIDogbW9kZWwuc2NhbGUoWSkuYmFuZFNpemU7XG4gIH0gZWxzZSBpZiAoaGFzWCkge1xuICAgIHJldHVybiB4SXNNZWFzdXJlID8gbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgOiBtb2RlbC5zY2FsZShYKS5iYW5kU2l6ZTtcbiAgfVxuICByZXR1cm4gbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcChzY2FsZTogU2NhbGUpIHtcbiAgLy8gT25seSB3b3JrcyBmb3Igc2NhbGUgd2l0aCBib3RoIGNvbnRpbnVvdXMgZG9tYWluIGNvbnRpbnVvdXMgcmFuZ2VcbiAgLy8gKERvZXNuJ3Qgd29yayBmb3IgcXVhbnRpemUsIHF1YW50aWxlLCB0aHJlc2hvbGQsIG9yZGluYWwpXG4gIGlmIChjb250YWlucyhbU2NhbGVUeXBlLkxJTkVBUiwgU2NhbGVUeXBlLlBPVywgU2NhbGVUeXBlLlNRUlQsXG4gICAgICAgIFNjYWxlVHlwZS5MT0csIFNjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpIHtcbiAgICByZXR1cm4gc2NhbGUuY2xhbXA7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9uZW50KHNjYWxlOiBTY2FsZSkge1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLlBPVykge1xuICAgIHJldHVybiBzY2FsZS5leHBvbmVudDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmljZShzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IGJvb2xlYW4gfCBOaWNlVGltZSB7XG4gIGlmIChjb250YWlucyhbU2NhbGVUeXBlLkxJTkVBUiwgU2NhbGVUeXBlLlBPVywgU2NhbGVUeXBlLlNRUlQsIFNjYWxlVHlwZS5MT0csXG4gICAgICAgIFNjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDLCBTY2FsZVR5cGUuUVVBTlRJWkVdLCBzY2FsZS50eXBlKSkge1xuXG4gICAgaWYgKHNjYWxlLm5pY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHNjYWxlLm5pY2U7XG4gICAgfVxuICAgIGlmIChjb250YWlucyhbU2NhbGVUeXBlLlRJTUUsIFNjYWxlVHlwZS5VVENdLCBzY2FsZS50eXBlKSkge1xuICAgICAgcmV0dXJuIHNtYWxsZXN0VW5pdChmaWVsZERlZi50aW1lVW5pdCkgYXMgYW55O1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbnMoW1gsIFldLCBjaGFubmVsKTsgLy8gcmV0dXJuIHRydWUgZm9yIHF1YW50aXRhdGl2ZSBYL1lcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAvKiBQYWRkaW5nIGlzIG9ubHkgYWxsb3dlZCBmb3IgWCBhbmQgWS5cbiAgICpcbiAgICogQmFzaWNhbGx5IGl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0byBhZGQgcGFkZGluZyBmb3IgY29sb3IgYW5kIHNpemUuXG4gICAqXG4gICAqIFdlIGRvIG5vdCB1c2UgZDMgc2NhbGUncyBwYWRkaW5nIGZvciByb3cvY29sdW1uIGJlY2F1c2UgcGFkZGluZyB0aGVyZVxuICAgKiBpcyBhIHJhdGlvIChbMCwgMV0pIGFuZCBpdCBjYXVzZXMgdGhlIHBhZGRpbmcgdG8gYmUgZGVjaW1hbHMuXG4gICAqIFRoZXJlZm9yZSwgd2UgbWFudWFsbHkgY2FsY3VsYXRlIHBhZGRpbmcgaW4gdGhlIGxheW91dCBieSBvdXJzZWx2ZXMuXG4gICAqL1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBzY2FsZS5wYWRkaW5nO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludHMoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBfXywgbW9kZWw6IE1vZGVsKSB7XG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpKSB7XG4gICAgLy8gV2UgYWx3YXlzIHVzZSBvcmRpbmFsIHBvaW50IHNjYWxlIGZvciB4IGFuZCB5LlxuICAgIC8vIFRodXMgYHBvaW50c2AgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIHNjYWxlJ3Mgc2NoZW1hLlxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKGNvbnRhaW5zKFtYLCBZLCBST1csIENPTFVNTiwgU0laRV0sIGNoYW5uZWwpICYmIHNjYWxlLnJvdW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2NhbGUucm91bmQ7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gemVybyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAvLyBvbmx5IGFwcGxpY2FibGUgZm9yIG5vbi1vcmRpbmFsIHNjYWxlXG4gIGlmICghY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDLCBTY2FsZVR5cGUuT1JESU5BTF0sIHNjYWxlLnR5cGUpKSB7XG4gICAgaWYgKHNjYWxlLnplcm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHNjYWxlLnplcm87XG4gICAgfVxuICAgIC8vIEJ5IGRlZmF1bHQsIHJldHVybiB0cnVlIG9ubHkgZm9yIG5vbi1iaW5uZWQsIHF1YW50aXRhdGl2ZSB4LXNjYWxlIG9yIHktc2NhbGUuXG4gICAgcmV0dXJuICFmaWVsZERlZi5iaW4gJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0NoYW5uZWwsIFgsIFksIENPTE9SLCBERVRBSUwsIE9SREVSLCBPUEFDSVRZLCBTSVpFfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7QkFSLCBBUkVBLCBNYXJrfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7ZmllbGQsIGlzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtoYXMsIGlzQWdncmVnYXRlfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge2lzQXJyYXksIGNvbnRhaW5zLCBEaWN0fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtzb3J0RmllbGR9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTdGFja1Byb3BlcnRpZXMge1xuICAvKiogRGltZW5zaW9uIGF4aXMgb2YgdGhlIHN0YWNrICgneCcgb3IgJ3knKS4gKi9cbiAgZ3JvdXBieUNoYW5uZWw6IENoYW5uZWw7XG4gIC8qKiBNZWFzdXJlIGF4aXMgb2YgdGhlIHN0YWNrICgneCcgb3IgJ3knKS4gKi9cbiAgZmllbGRDaGFubmVsOiBDaGFubmVsO1xuXG4gIC8qKiBTdGFjay1ieSBmaWVsZCBuYW1lcyAoZnJvbSAnY29sb3InIGFuZCAnZGV0YWlsJykgKi9cbiAgc3RhY2tGaWVsZHM6IHN0cmluZ1tdO1xuXG4gIC8qKiBTdGFjayBvZmZzZXQgcHJvcGVydHkuICovXG4gIG9mZnNldDogU3RhY2tPZmZzZXQ7XG59XG5cbi8vIFRPRE86IHB1dCBhbGwgdmVnYSBpbnRlcmZhY2UgaW4gb25lIHBsYWNlXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrVHJhbnNmb3JtIHtcbiAgdHlwZTogc3RyaW5nO1xuICBvZmZzZXQ/OiBhbnk7XG4gIGdyb3VwYnk6IGFueTtcbiAgZmllbGQ6IGFueTtcbiAgc29ydGJ5OiBhbnk7XG4gIG91dHB1dDogYW55O1xufVxuXG4vKiogQ29tcGlsZSBzdGFjayBwcm9wZXJ0aWVzIGZyb20gYSBnaXZlbiBzcGVjICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVN0YWNrUHJvcGVydGllcyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIHNjYWxlOiBEaWN0PFNjYWxlPiwgY29uZmlnOiBDb25maWcpIHtcbiAgY29uc3Qgc3RhY2tGaWVsZHMgPSBnZXRTdGFja0ZpZWxkcyhtYXJrLCBlbmNvZGluZywgc2NhbGUpO1xuXG4gIGlmIChzdGFja0ZpZWxkcy5sZW5ndGggPiAwICYmXG4gICAgICBjb250YWlucyhbQkFSLCBBUkVBXSwgbWFyaykgJiZcbiAgICAgIGNvbmZpZy5tYXJrLnN0YWNrZWQgIT09IFN0YWNrT2Zmc2V0Lk5PTkUgJiZcbiAgICAgIGlzQWdncmVnYXRlKGVuY29kaW5nKSkge1xuXG4gICAgY29uc3QgaXNYTWVhc3VyZSA9IGhhcyhlbmNvZGluZywgWCkgJiYgaXNNZWFzdXJlKGVuY29kaW5nLngpLFxuICAgIGlzWU1lYXN1cmUgPSBoYXMoZW5jb2RpbmcsIFkpICYmIGlzTWVhc3VyZShlbmNvZGluZy55KTtcblxuICAgIGlmIChpc1hNZWFzdXJlICYmICFpc1lNZWFzdXJlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncm91cGJ5Q2hhbm5lbDogWSxcbiAgICAgICAgZmllbGRDaGFubmVsOiBYLFxuICAgICAgICBzdGFja0ZpZWxkczogc3RhY2tGaWVsZHMsXG4gICAgICAgIG9mZnNldDogY29uZmlnLm1hcmsuc3RhY2tlZFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzWU1lYXN1cmUgJiYgIWlzWE1lYXN1cmUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyb3VwYnlDaGFubmVsOiBYLFxuICAgICAgICBmaWVsZENoYW5uZWw6IFksXG4gICAgICAgIHN0YWNrRmllbGRzOiBzdGFja0ZpZWxkcyxcbiAgICAgICAgb2Zmc2V0OiBjb25maWcubWFyay5zdGFja2VkXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIENvbXBpbGUgc3RhY2stYnkgZmllbGQgbmFtZXMgZnJvbSAoZnJvbSAnY29sb3InIGFuZCAnZGV0YWlsJykgKi9cbmZ1bmN0aW9uIGdldFN0YWNrRmllbGRzKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgc2NhbGVNYXA6IERpY3Q8U2NhbGU+KSB7XG4gIHJldHVybiBbQ09MT1IsIERFVEFJTCwgT1BBQ0lUWSwgU0laRV0ucmVkdWNlKGZ1bmN0aW9uKGZpZWxkcywgY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShjaGFubmVsRW5jb2RpbmcpKSB7XG4gICAgICAgIGNoYW5uZWxFbmNvZGluZy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgZmllbGRzLnB1c2goZmllbGQoZmllbGREZWYpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWVsZERlZjogRmllbGREZWYgPSBjaGFubmVsRW5jb2Rpbmc7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gc2NhbGVNYXBbY2hhbm5lbF07XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmLCB7XG4gICAgICAgICAgYmluU3VmZml4OiBzY2FsZSAmJiBzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGRzO1xuICB9LCBbXSk7XG59XG5cbi8vIGltcHV0ZSBkYXRhIGZvciBzdGFja2VkIGFyZWFcbmV4cG9ydCBmdW5jdGlvbiBpbXB1dGVUcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnaW1wdXRlJyxcbiAgICBmaWVsZDogbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKSxcbiAgICBncm91cGJ5OiBzdGFjay5zdGFja0ZpZWxkcyxcbiAgICBvcmRlcmJ5OiBbbW9kZWwuZmllbGQoc3RhY2suZ3JvdXBieUNoYW5uZWwpXSxcbiAgICBtZXRob2Q6ICd2YWx1ZScsXG4gICAgdmFsdWU6IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrVHJhbnNmb3JtKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBjb25zdCBlbmNvZGluZyA9IG1vZGVsLmVuY29kaW5nKCk7XG4gIGNvbnN0IHNvcnRieSA9IG1vZGVsLmhhcyhPUkRFUikgP1xuICAgIChpc0FycmF5KGVuY29kaW5nW09SREVSXSkgPyBlbmNvZGluZ1tPUkRFUl0gOiBbZW5jb2RpbmdbT1JERVJdXSkubWFwKHNvcnRGaWVsZCkgOlxuICAgIC8vIGRlZmF1bHQgPSBkZXNjZW5kaW5nIGJ5IHN0YWNrRmllbGRzXG4gICAgc3RhY2suc3RhY2tGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgIHJldHVybiAnLScgKyBmaWVsZDtcbiAgICB9KTtcblxuICBjb25zdCB2YWxOYW1lID0gbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKTtcblxuICAvLyBhZGQgc3RhY2sgdHJhbnNmb3JtIHRvIG1hcmtcbiAgbGV0IHRyYW5zZm9ybTogU3RhY2tUcmFuc2Zvcm0gPSB7XG4gICAgdHlwZTogJ3N0YWNrJyxcbiAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoc3RhY2suZ3JvdXBieUNoYW5uZWwpXSxcbiAgICBmaWVsZDogbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKSxcbiAgICBzb3J0Ynk6IHNvcnRieSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIHN0YXJ0OiB2YWxOYW1lICsgJ19zdGFydCcsXG4gICAgICBlbmQ6IHZhbE5hbWUgKyAnX2VuZCdcbiAgICB9XG4gIH07XG5cbiAgaWYgKHN0YWNrLm9mZnNldCkge1xuICAgIHRyYW5zZm9ybS5vZmZzZXQgPSBzdGFjay5vZmZzZXQ7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybTtcbn1cbiIsImltcG9ydCB7Y29udGFpbnMsIHJhbmdlfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFNIQVBFLCBDT0xPUiwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5cbi8qKiByZXR1cm5zIHRoZSBzbWFsbGVzdCBuaWNlIHVuaXQgZm9yIHNjYWxlLm5pY2UgKi9cbmV4cG9ydCBmdW5jdGlvbiBzbWFsbGVzdFVuaXQodGltZVVuaXQpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdzZWNvbmQnKSA+IC0xKSB7XG4gICAgcmV0dXJuICdzZWNvbmQnO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ21pbnV0ZScpID4gLTEpIHtcbiAgICByZXR1cm4gJ21pbnV0ZSc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignaG91cicpID4gLTEpIHtcbiAgICByZXR1cm4gJ2hvdXInO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ2RheScpID4gLTEgfHwgdGltZVVuaXQuaW5kZXhPZignZGF0ZScpID4gLTEpIHtcbiAgICByZXR1cm4gJ2RheSc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignbW9udGgnKSA+IC0xKSB7XG4gICAgcmV0dXJuICdtb250aCc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZigneWVhcicpID4gLTEpIHtcbiAgICByZXR1cm4gJ3llYXInO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24odGltZVVuaXQ6IFRpbWVVbml0LCBmaWVsZFJlZjogc3RyaW5nLCBvbmx5UmVmID0gZmFsc2UpOiBzdHJpbmcge1xuICBsZXQgb3V0ID0gJ2RhdGV0aW1lKCc7XG4gIGxldCB0aW1lU3RyaW5nID0gdGltZVVuaXQudG9TdHJpbmcoKTtcblxuICBmdW5jdGlvbiBnZXQoZnVuOiBzdHJpbmcsIGFkZENvbW1hID0gdHJ1ZSkge1xuICAgIGlmIChvbmx5UmVmKSB7XG4gICAgICByZXR1cm4gZmllbGRSZWYgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuICsgJygnICsgZmllbGRSZWYgKyAnKScgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ3llYXInKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgneWVhcicpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMjAwNiwgJzsgLy8gSmFudWFyeSAxIDIwMDYgaXMgYSBTdW5kYXlcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21vbnRoJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ21vbnRoJyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbW9udGggc3RhcnRzIGF0IDAgaW4gamF2YXNjcmlwdFxuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIC8vIG5lZWQgdG8gYWRkIDEgYmVjYXVzZSBkYXlzIHN0YXJ0IGF0IDFcbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignZGF5JykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ2RheScsIGZhbHNlKSArICcrMSwgJztcbiAgfSBlbHNlIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ2RhdGUnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnZGF0ZScpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMSwgJztcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ2hvdXJzJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ2hvdXJzJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbWludXRlcycpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdtaW51dGVzJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignc2Vjb25kcycpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdzZWNvbmRzJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbWlsbGlzZWNvbmRzJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ21pbGxpc2Vjb25kcycsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAnO1xuICB9XG5cbiAgcmV0dXJuIG91dCArICcpJztcbn1cblxuLyoqIEdlbmVyYXRlIHRoZSBjb21wbGV0ZSByYXcgZG9tYWluLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhd0RvbWFpbih0aW1lVW5pdDogVGltZVVuaXQsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEUsIENPTE9SXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNjApO1xuICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5IT1VSUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCAyNCk7XG4gICAgY2FzZSBUaW1lVW5pdC5EQVk6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNyk7XG4gICAgY2FzZSBUaW1lVW5pdC5EQVRFOlxuICAgICAgcmV0dXJuIHJhbmdlKDEsIDMyKTtcbiAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDEyKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi4vYWdncmVnYXRlJztcbmltcG9ydCB7QXhpc30gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge1gsIFksIFRFWFQsIFBBVEgsIE9SREVSLCBDaGFubmVsLCBVTklUX0NIQU5ORUxTLCAgVU5JVF9TQ0FMRV9DSEFOTkVMUywgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUywgc3VwcG9ydE1hcmt9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWcsIENlbGxDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4uL2VuY29kaW5nJzsgLy8gVE9ETzogcmVtb3ZlXG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtNYXJrLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWUsIFFVQU5USVRBVElWRX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2R1cGxpY2F0ZSwgZXh0ZW5kLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2FwcGx5Q29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUd9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7aW5pdE1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZVVuaXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge3BhcnNlTGVnZW5kQ29tcG9uZW50fSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZVVuaXRMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZU1hcmt9IGZyb20gJy4vbWFyay9tYXJrJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudCwgc2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7Y29tcGlsZVN0YWNrUHJvcGVydGllcywgU3RhY2tQcm9wZXJ0aWVzfSBmcm9tICcuL3N0YWNrJztcblxuLyoqXG4gKiBJbnRlcm5hbCBtb2RlbCBvZiBWZWdhLUxpdGUgc3BlY2lmaWNhdGlvbiBmb3IgdGhlIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY2xhc3MgVW5pdE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuXG4gIHByaXZhdGUgX21hcms6IE1hcms7XG4gIHByaXZhdGUgX2VuY29kaW5nOiBFbmNvZGluZztcbiAgcHJpdmF0ZSBfc3RhY2s6IFN0YWNrUHJvcGVydGllcztcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjLCBwYXJlbnQ6IE1vZGVsLCBwYXJlbnRHaXZlbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcblxuICAgIGNvbnN0IG1hcmsgPSB0aGlzLl9tYXJrID0gc3BlYy5tYXJrO1xuICAgIGNvbnN0IGVuY29kaW5nID0gdGhpcy5fZW5jb2RpbmcgPSB0aGlzLl9pbml0RW5jb2RpbmcobWFyaywgc3BlYy5lbmNvZGluZyB8fCB7fSk7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50LCBtYXJrLCBlbmNvZGluZyk7XG5cbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuX3NjYWxlID0gIHRoaXMuX2luaXRTY2FsZShtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICB0aGlzLl9heGlzID0gdGhpcy5faW5pdEF4aXMoZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fbGVnZW5kID0gdGhpcy5faW5pdExlZ2VuZChlbmNvZGluZywgY29uZmlnKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdGFja1xuICAgIHRoaXMuX3N0YWNrID0gY29tcGlsZVN0YWNrUHJvcGVydGllcyhtYXJrLCBlbmNvZGluZywgc2NhbGUsIGNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RW5jb2RpbmcobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgLy8gY2xvbmUgdG8gcHJldmVudCBzaWRlIGVmZmVjdCB0byB0aGUgb3JpZ2luYWwgc3BlY1xuICAgIGVuY29kaW5nID0gZHVwbGljYXRlKGVuY29kaW5nKTtcblxuICAgIHZsRW5jb2RpbmcuZm9yRWFjaChlbmNvZGluZywgZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoIXN1cHBvcnRNYXJrKGNoYW5uZWwsIG1hcmspKSB7XG4gICAgICAgIC8vIERyb3AgdW5zdXBwb3J0ZWQgY2hhbm5lbFxuXG4gICAgICAgIC8vIEZJWE1FIGNvbnNvbGlkYXRlIHdhcm5pbmcgbWV0aG9kXG4gICAgICAgIGNvbnNvbGUud2FybihjaGFubmVsLCAnZHJvcHBlZCBhcyBpdCBpcyBpbmNvbXBhdGlibGUgd2l0aCcsIG1hcmspO1xuICAgICAgICBkZWxldGUgZmllbGREZWYuZmllbGQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoY2hhbm5lbCA9PT0gUEFUSCB8fCBjaGFubmVsID09PSBPUkRFUikgJiYgIWZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJiBmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgZmllbGREZWYuYWdncmVnYXRlID0gQWdncmVnYXRlT3AuTUlOO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBlbmNvZGluZztcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsLCBtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICBsZXQgY29uZmlnID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30sIHNwZWNDb25maWcpO1xuICAgIGNvbmZpZy5tYXJrID0gaW5pdE1hcmtDb25maWcobWFyaywgZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTY2FsZShtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogRGljdDxTY2FsZT4ge1xuICAgIHJldHVybiBVTklUX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfc2NhbGUsIGNoYW5uZWwpIHtcbiAgICAgIGlmICh2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3Qgc2NhbGVTcGVjID0gZW5jb2RpbmdbY2hhbm5lbF0uc2NhbGUgfHwge307XG4gICAgICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBlbmNvZGluZ1tjaGFubmVsXTtcblxuICAgICAgICBjb25zdCBfc2NhbGVUeXBlID0gc2NhbGVUeXBlKHNjYWxlU3BlYywgY2hhbm5lbERlZiwgY2hhbm5lbCwgbWFyayk7XG5cbiAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiBfc2NhbGVUeXBlLFxuICAgICAgICAgIHJvdW5kOiBjb25maWcuc2NhbGUucm91bmQsXG4gICAgICAgICAgcGFkZGluZzogY29uZmlnLnNjYWxlLnBhZGRpbmcsXG4gICAgICAgICAgdXNlUmF3RG9tYWluOiBjb25maWcuc2NhbGUudXNlUmF3RG9tYWluLFxuICAgICAgICAgIGJhbmRTaXplOiBjaGFubmVsID09PSBYICYmIF9zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIG1hcmsgPT09IFRFWFRNQVJLID9cbiAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zY2FsZS50ZXh0QmFuZFdpZHRoIDogY29uZmlnLnNjYWxlLmJhbmRTaXplXG4gICAgICAgIH0sIHNjYWxlU3BlYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGU+KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBeGlzKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PEF4aXM+IHtcbiAgICByZXR1cm4gW1gsIFldLnJlZHVjZShmdW5jdGlvbihfYXhpcywgY2hhbm5lbCkge1xuICAgICAgLy8gUG9zaXRpb24gQXhpc1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgICBjb25zdCBheGlzU3BlYyA9IGVuY29kaW5nW2NoYW5uZWxdLmF4aXM7XG4gICAgICAgIGlmIChheGlzU3BlYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBfYXhpc1tjaGFubmVsXSA9IGV4dGVuZCh7fSxcbiAgICAgICAgICAgIGNvbmZpZy5heGlzLFxuICAgICAgICAgICAgYXhpc1NwZWMgPT09IHRydWUgPyB7fSA6IGF4aXNTcGVjIHx8ICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfYXhpcztcbiAgICB9LCB7fSBhcyBEaWN0PEF4aXM+KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRMZWdlbmQoZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IERpY3Q8TGVnZW5kPiB7XG4gICAgcmV0dXJuIE5PTlNQQVRJQUxfU0NBTEVfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKF9sZWdlbmQsIGNoYW5uZWwpIHtcbiAgICAgIGlmICh2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3QgbGVnZW5kU3BlYyA9IGVuY29kaW5nW2NoYW5uZWxdLmxlZ2VuZDtcbiAgICAgICAgaWYgKGxlZ2VuZFNwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2xlZ2VuZFtjaGFubmVsXSA9IGV4dGVuZCh7fSwgY29uZmlnLmxlZ2VuZCxcbiAgICAgICAgICAgIGxlZ2VuZFNwZWMgPT09IHRydWUgPyB7fSA6IGxlZ2VuZFNwZWMgfHwgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9sZWdlbmQ7XG4gICAgfSwge30gYXMgRGljdDxMZWdlbmQ+KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5jb21wb25lbnQuZGF0YSA9IHBhcnNlVW5pdERhdGEodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTZWxlY3Rpb25EYXRhKCkge1xuICAgIC8vIFRPRE86IEBhcnZpbmQgY2FuIHdyaXRlIHRoaXNcbiAgICAvLyBXZSBtaWdodCBuZWVkIHRvIHNwbGl0IHRoaXMgaW50byBjb21waWxlU2VsZWN0aW9uRGF0YSBhbmQgY29tcGlsZVNlbGVjdGlvblNpZ25hbHM/XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMYXlvdXREYXRhKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmxheW91dCA9IHBhcnNlVW5pdExheW91dCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNjYWxlKCkge1xuICAgIHRoaXMuY29tcG9uZW50LnNjYWxlID0gcGFyc2VTY2FsZUNvbXBvbmVudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU1hcmsoKSB7XG4gICAgdGhpcy5jb21wb25lbnQubWFyayA9IHBhcnNlTWFyayh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgdGhpcy5jb21wb25lbnQuYXhpcyA9IHBhcnNlQXhpc0NvbXBvbmVudCh0aGlzLCBbWCwgWV0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpc0dyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGVnZW5kKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmxlZ2VuZCA9IHBhcnNlTGVnZW5kQ29tcG9uZW50KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4gYXNzZW1ibGVEYXRhKHRoaXMsIGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTGF5b3V0KGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXJrO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKGNlbGxDb25maWc6IENlbGxDb25maWcpIHtcbiAgICByZXR1cm4gYXBwbHlDb25maWcoe30sIGNlbGxDb25maWcsIEZJTExfU1RST0tFX0NPTkZJRy5jb25jYXQoWydjbGlwJ10pKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpIHtcbiAgICByZXR1cm4gVU5JVF9DSEFOTkVMUztcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBwaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmVuY29kaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhY2soKTogU3RhY2tQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2s7XG4gIH1cblxuICBwdWJsaWMgdG9TcGVjKGV4Y2x1ZGVDb25maWc/LCBleGNsdWRlRGF0YT8pIHtcbiAgICBjb25zdCBlbmNvZGluZyA9IGR1cGxpY2F0ZSh0aGlzLl9lbmNvZGluZyk7XG4gICAgbGV0IHNwZWM6IGFueTtcblxuICAgIHNwZWMgPSB7XG4gICAgICBtYXJrOiB0aGlzLl9tYXJrLFxuICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgfTtcblxuICAgIGlmICghZXhjbHVkZUNvbmZpZykge1xuICAgICAgc3BlYy5jb25maWcgPSBkdXBsaWNhdGUodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAoIWV4Y2x1ZGVEYXRhKSB7XG4gICAgICBzcGVjLmRhdGEgPSBkdXBsaWNhdGUodGhpcy5fZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGRlZmF1bHRzXG4gICAgcmV0dXJuIHNwZWM7XG4gIH1cblxuICBwdWJsaWMgbWFyaygpOiBNYXJrIHtcbiAgICByZXR1cm4gdGhpcy5fbWFyaztcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLmhhcyh0aGlzLl9lbmNvZGluZywgY2hhbm5lbCk7XG4gIH1cblxuICBwdWJsaWMgZW5jb2RpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VuY29kaW5nO1xuICB9XG5cbiAgcHVibGljIGZpZWxkRGVmKGNoYW5uZWw6IENoYW5uZWwpOiBGaWVsZERlZiB7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgfHwge31cbiAgICAvLyBDdXJyZW50bHkgd2UgaGF2ZSBpdCB0byBwcmV2ZW50IG51bGwgcG9pbnRlciBleGNlcHRpb24uXG4gICAgcmV0dXJuIHRoaXMuX2VuY29kaW5nW2NoYW5uZWxdIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpbiBoYXMgZGVmYXVsdCBzdWZmaXggdGhhdCBkZXBlbmRzIG9uIHNjYWxlVHlwZVxuICAgICAgb3B0ID0gZXh0ZW5kKHtcbiAgICAgICAgYmluU3VmZml4OiB0aGlzLnNjYWxlKGNoYW5uZWwpLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgfSwgb3B0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFOYW1lKHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUodGhpcy5fZW5jb2RpbmcpID8gU1VNTUFSWSA6IFNPVVJDRSk7XG4gIH1cblxuICBwdWJsaWMgaXNVbml0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQge1NjYWxlQ29uZmlnLCBGYWNldFNjYWxlQ29uZmlnLCBkZWZhdWx0U2NhbGVDb25maWcsIGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7QXhpc0NvbmZpZywgZGVmYXVsdEF4aXNDb25maWcsIGRlZmF1bHRGYWNldEF4aXNDb25maWd9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge0xlZ2VuZENvbmZpZywgZGVmYXVsdExlZ2VuZENvbmZpZ30gZnJvbSAnLi9sZWdlbmQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxDb25maWcge1xuICB3aWR0aD86IG51bWJlcjtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuXG4gIGNsaXA/OiBib29sZWFuO1xuXG4gIC8vIEZJTExfU1RST0tFX0NPTkZJR1xuICAvKipcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgZmlsbD86IHN0cmluZztcbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG4gIHN0cm9rZT86IHN0cmluZztcbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIHN0cm9rZU9wYWNpdHk/OiBudW1iZXI7XG4gIC8qKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuICovXG4gIHN0cm9rZURhc2g/OiBudW1iZXJbXTtcbiAgLyoqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LiAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENlbGxDb25maWc6IENlbGxDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgc3Ryb2tlOiAnI2NjYycsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgc2NhbGU/OiBGYWNldFNjYWxlQ29uZmlnO1xuICBheGlzPzogQXhpc0NvbmZpZztcbiAgZ3JpZD86IEZhY2V0R3JpZENvbmZpZztcbiAgY2VsbD86IENlbGxDb25maWc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRHcmlkQ29uZmlnIHtcbiAgLyoqIEBmb3JtYXQgY29sb3IgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIG9wYWNpdHk/OiBudW1iZXI7XG4gIG9mZnNldD86IG51bWJlcjtcbn1cblxuY29uc3QgZGVmYXVsdEZhY2V0R3JpZENvbmZpZzogRmFjZXRHcmlkQ29uZmlnID0ge1xuICBjb2xvcjogJyMwMDAwMDAnLFxuICBvcGFjaXR5OiAwLjQsXG4gIG9mZnNldDogMFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldENvbmZpZzogRmFjZXRDb25maWcgPSB7XG4gIHNjYWxlOiBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZyxcbiAgYXhpczogZGVmYXVsdEZhY2V0QXhpc0NvbmZpZyxcbiAgZ3JpZDogZGVmYXVsdEZhY2V0R3JpZENvbmZpZyxcbiAgY2VsbDogZGVmYXVsdEZhY2V0Q2VsbENvbmZpZ1xufTtcblxuZXhwb3J0IGVudW0gRm9udFdlaWdodCB7XG4gICAgTk9STUFMID0gJ25vcm1hbCcgYXMgYW55LFxuICAgIEJPTEQgPSAnYm9sZCcgYXMgYW55XG59XG5cbmV4cG9ydCBlbnVtIFNoYXBlIHtcbiAgICBDSVJDTEUgPSAnY2lyY2xlJyBhcyBhbnksXG4gICAgU1FVQVJFID0gJ3NxdWFyZScgYXMgYW55LFxuICAgIENST1NTID0gJ2Nyb3NzJyBhcyBhbnksXG4gICAgRElBTU9ORCA9ICdkaWFtb25kJyBhcyBhbnksXG4gICAgVFJJQU5HTEVVUCA9ICd0cmlhbmdsZS11cCcgYXMgYW55LFxuICAgIFRSSUFOR0xFRE9XTiA9ICd0cmlhbmdsZS1kb3duJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEhvcml6b250YWxBbGlnbiB7XG4gICAgTEVGVCA9ICdsZWZ0JyBhcyBhbnksXG4gICAgUklHSFQgPSAncmlnaHQnIGFzIGFueSxcbiAgICBDRU5URVIgPSAnY2VudGVyJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ24ge1xuICAgIFRPUCA9ICd0b3AnIGFzIGFueSxcbiAgICBNSURETEUgPSAnbWlkZGxlJyBhcyBhbnksXG4gICAgQk9UVE9NID0gJ2JvdHRvbScgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBGb250U3R5bGUge1xuICAgIE5PUk1BTCA9ICdub3JtYWwnIGFzIGFueSxcbiAgICBJVEFMSUMgPSAnaXRhbGljJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIFN0YWNrT2Zmc2V0IHtcbiAgICBaRVJPID0gJ3plcm8nIGFzIGFueSxcbiAgICBDRU5URVIgPSAnY2VudGVyJyBhcyBhbnksXG4gICAgTk9STUFMSVpFID0gJ25vcm1hbGl6ZScgYXMgYW55LFxuICAgIE5PTkUgPSAnbm9uZScgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBJbnRlcnBvbGF0ZSB7XG4gICAgLyoqIHBpZWNld2lzZSBsaW5lYXIgc2VnbWVudHMsIGFzIGluIGEgcG9seWxpbmUgKi9cbiAgICBMSU5FQVIgPSAnbGluZWFyJyBhcyBhbnksXG4gICAgLyoqIGNsb3NlIHRoZSBsaW5lYXIgc2VnbWVudHMgdG8gZm9ybSBhIHBvbHlnb24gKi9cbiAgICBMSU5FQVJfQ0xPU0VEID0gJ2xpbmVhci1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVAgPSAnc3RlcCcgYXMgYW55LFxuICAgIC8qKiBhbHRlcm5hdGUgYmV0d2VlbiB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBzZWdtZW50cywgYXMgaW4gYSBzdGVwIGZ1bmN0aW9uICovXG4gICAgU1RFUF9CRUZPUkUgPSAnc3RlcC1iZWZvcmUnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVBfQUZURVIgPSAnc3RlcC1hZnRlcicgYXMgYW55LFxuICAgIC8qKiBhIEItc3BsaW5lLCB3aXRoIGNvbnRyb2wgcG9pbnQgZHVwbGljYXRpb24gb24gdGhlIGVuZHMgKi9cbiAgICBCQVNJUyA9ICdiYXNpcycgYXMgYW55LFxuICAgIC8qKiBhbiBvcGVuIEItc3BsaW5lOyBtYXkgbm90IGludGVyc2VjdCB0aGUgc3RhcnQgb3IgZW5kICovXG4gICAgQkFTSVNfT1BFTiA9ICdiYXNpcy1vcGVuJyBhcyBhbnksXG4gICAgLyoqIGEgY2xvc2VkIEItc3BsaW5lLCBhcyBpbiBhIGxvb3AgKi9cbiAgICBCQVNJU19DTE9TRUQgPSAnYmFzaXMtY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGEgQ2FyZGluYWwgc3BsaW5lLCB3aXRoIGNvbnRyb2wgcG9pbnQgZHVwbGljYXRpb24gb24gdGhlIGVuZHMgKi9cbiAgICBDQVJESU5BTCA9ICdjYXJkaW5hbCcgYXMgYW55LFxuICAgIC8qKiBhbiBvcGVuIENhcmRpbmFsIHNwbGluZTsgbWF5IG5vdCBpbnRlcnNlY3QgdGhlIHN0YXJ0IG9yIGVuZCwgYnV0IHdpbGwgaW50ZXJzZWN0IG90aGVyIGNvbnRyb2wgcG9pbnRzICovXG4gICAgQ0FSRElOQUxfT1BFTiA9ICdjYXJkaW5hbC1vcGVuJyBhcyBhbnksXG4gICAgLyoqIGEgY2xvc2VkIENhcmRpbmFsIHNwbGluZSwgYXMgaW4gYSBsb29wICovXG4gICAgQ0FSRElOQUxfQ0xPU0VEID0gJ2NhcmRpbmFsLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBlcXVpdmFsZW50IHRvIGJhc2lzLCBleGNlcHQgdGhlIHRlbnNpb24gcGFyYW1ldGVyIGlzIHVzZWQgdG8gc3RyYWlnaHRlbiB0aGUgc3BsaW5lICovXG4gICAgQlVORExFID0gJ2J1bmRsZScgYXMgYW55LFxuICAgIC8qKiBjdWJpYyBpbnRlcnBvbGF0aW9uIHRoYXQgcHJlc2VydmVzIG1vbm90b25pY2l0eSBpbiB5ICovXG4gICAgTU9OT1RPTkUgPSAnbW9ub3RvbmUnIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIHtcblxuICAvLyAtLS0tLS0tLS0tIENvbG9yIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNoYXBlXFwncyBjb2xvciBzaG91bGQgYmUgdXNlZCBhcyBmaWxsIGNvbG9yIGluc3RlYWQgb2Ygc3Ryb2tlIGNvbG9yLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGljYWJsZSBmb3IgXCJiYXJcIiwgXCJwb2ludFwiLCBhbmQgXCJhcmVhXCIuXG4gICAqIEFsbCBtYXJrcyBleGNlcHQgXCJwb2ludFwiIG1hcmtzIGFyZSBmaWxsZWQgYnkgZGVmYXVsdC5cbiAgICogU2VlIE1hcmsgRG9jdW1lbnRhdGlvbiAoaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL21hcmtzLmh0bWwpXG4gICAqIGZvciB1c2FnZSBleGFtcGxlLlxuICAgKi9cbiAgZmlsbGVkPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIERlZmF1bHQgY29sb3IuXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogRGVmYXVsdCBGaWxsIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgZmlsbD86IHN0cmluZztcbiAgLyoqXG4gICAqIERlZmF1bHQgU3Ryb2tlIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG5cbiAgLy8gLS0tLS0tLS0tLSBPcGFjaXR5IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgb3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gU3Ryb2tlIFN0eWxlIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKi9cbiAgc3Ryb2tlRGFzaD86IG51bWJlcltdO1xuICAvKipcbiAgICogVGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBpbnRvIHdoaWNoIHRvIGJlZ2luIGRyYXdpbmcgd2l0aCB0aGUgc3Ryb2tlIGRhc2ggYXJyYXkuXG4gICAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gU3RhY2tpbmc6IEJhciAmIEFyZWEgLS0tLS0tLS0tLVxuICBzdGFja2VkPzogU3RhY2tPZmZzZXQ7XG5cbiAgLy8gLS0tLS0tLS0tLSBPcmllbnRhdGlvbjogQmFyLCBUaWNrLCBMaW5lLCBBcmVhIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiBhIG5vbi1zdGFja2VkIGJhciwgdGljaywgYXJlYSwgYW5kIGxpbmUgY2hhcnRzLlxuICAgKiBUaGUgdmFsdWUgaXMgZWl0aGVyIGhvcml6b250YWwgKGRlZmF1bHQpIG9yIHZlcnRpY2FsLlxuICAgKiAtIEZvciBiYXIsIHJ1bGUgYW5kIHRpY2ssIHRoaXMgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzaXplIG9mIHRoZSBiYXIgYW5kIHRpY2tcbiAgICogc2hvdWxkIGJlIGFwcGxpZWQgdG8geCBvciB5IGRpbWVuc2lvbi5cbiAgICogLSBGb3IgYXJlYSwgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBvcmllbnQgcHJvcGVydHkgb2YgdGhlIFZlZ2Egb3V0cHV0LlxuICAgKiAtIEZvciBsaW5lLCB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIHNvcnQgb3JkZXIgb2YgdGhlIHBvaW50cyBpbiB0aGUgbGluZVxuICAgKiBpZiBgY29uZmlnLnNvcnRMaW5lQnlgIGlzIG5vdCBzcGVjaWZpZWQuXG4gICAqIEZvciBzdGFja2VkIGNoYXJ0cywgdGhpcyBpcyBhbHdheXMgZGV0ZXJtaW5lZCBieSB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHN0YWNrO1xuICAgKiB0aGVyZWZvcmUgZXhwbGljaXRseSBzcGVjaWZpZWQgdmFsdWUgd2lsbCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgb3JpZW50Pzogc3RyaW5nO1xuXG4gIC8vIC0tLS0tLS0tLS0gSW50ZXJwb2xhdGlvbjogTGluZSAvIGFyZWEgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIGxpbmUgaW50ZXJwb2xhdGlvbiBtZXRob2QgdG8gdXNlLiBPbmUgb2YgbGluZWFyLCBzdGVwLWJlZm9yZSwgc3RlcC1hZnRlciwgYmFzaXMsIGJhc2lzLW9wZW4sIGNhcmRpbmFsLCBjYXJkaW5hbC1vcGVuLCBtb25vdG9uZS5cbiAgICovXG4gIGludGVycG9sYXRlPzogSW50ZXJwb2xhdGU7XG4gIC8qKlxuICAgKiBEZXBlbmRpbmcgb24gdGhlIGludGVycG9sYXRpb24gdHlwZSwgc2V0cyB0aGUgdGVuc2lvbiBwYXJhbWV0ZXIuXG4gICAqL1xuICB0ZW5zaW9uPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gTGluZSAtLS0tLS0tLS1cbiAgLyoqXG4gICAqIFNpemUgb2YgbGluZSBtYXJrLlxuICAgKi9cbiAgbGluZVNpemU/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBSdWxlIC0tLS0tLS0tLVxuICAvKipcbiAgICogU2l6ZSBvZiBydWxlIG1hcmsuXG4gICAqL1xuICBydWxlU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIEJhciAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgYmFycy4gIElmIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCBzaXplIGlzICBgYmFuZFNpemUtMWAsXG4gICAqIHdoaWNoIHByb3ZpZGVzIDEgcGl4ZWwgb2Zmc2V0IGJldHdlZW4gYmFycy5cbiAgICovXG4gIGJhclNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgYmFycyBvbiBjb250aW51b3VzIHNjYWxlcy5cbiAgICovXG4gIGJhclRoaW5TaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHN5bWJvbCBzaGFwZSB0byB1c2UuIE9uZSBvZiBjaXJjbGUgKGRlZmF1bHQpLCBzcXVhcmUsIGNyb3NzLCBkaWFtb25kLCB0cmlhbmdsZS11cCwgb3IgdHJpYW5nbGUtZG93bi5cbiAgICovXG4gIHNoYXBlPzogU2hhcGU7XG5cbiAgLy8gLS0tLS0tLS0tLSBQb2ludCBTaXplIChQb2ludCAvIFNxdWFyZSAvIENpcmNsZSkgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHBpeGVsIGFyZWEgZWFjaCB0aGUgcG9pbnQuIEZvciBleGFtcGxlOiBpbiB0aGUgY2FzZSBvZiBjaXJjbGVzLCB0aGUgcmFkaXVzIGlzIGRldGVybWluZWQgaW4gcGFydCBieSB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHNpemUgdmFsdWUuXG4gICAqL1xuICBzaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGljayAtLS0tLS0tLS0tXG4gIC8qKiBUaGUgd2lkdGggb2YgdGhlIHRpY2tzLiAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcblxuICAvKiogVGhpY2tuZXNzIG9mIHRoZSB0aWNrIG1hcmsuICovXG4gIHRpY2tUaGlja25lc3M/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBUZXh0IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIGxlZnQsIHJpZ2h0LCBjZW50ZXIuXG4gICAqL1xuICBhbGlnbj86IEhvcml6b250YWxBbGlnbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgdGV4dCwgaW4gZGVncmVlcy5cbiAgICovXG4gIGFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIHRvcCwgbWlkZGxlLCBib3R0b20uXG4gICAqL1xuICBiYXNlbGluZT86IFZlcnRpY2FsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR4PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIG9mZnNldCwgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRoZSB0ZXh0IGxhYmVsIGFuZCBpdHMgYW5jaG9yIHBvaW50LiBUaGUgb2Zmc2V0IGlzIGFwcGxpZWQgYWZ0ZXIgcm90YXRpb24gYnkgdGhlIGFuZ2xlIHByb3BlcnR5LlxuICAgKi9cbiAgZHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIHJhZGlhbCBvZmZzZXQsIGluIHBpeGVscywgb2YgdGhlIHRleHQgbGFiZWwgZnJvbSB0aGUgb3JpZ2luIGRldGVybWluZWQgYnkgdGhlIHggYW5kIHkgcHJvcGVydGllcy5cbiAgICovXG4gIHJhZGl1cz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFBvbGFyIGNvb3JkaW5hdGUgYW5nbGUsIGluIHJhZGlhbnMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuIFZhbHVlcyBmb3IgdGhldGEgZm9sbG93IHRoZSBzYW1lIGNvbnZlbnRpb24gb2YgYXJjIG1hcmsgc3RhcnRBbmdsZSBhbmQgZW5kQW5nbGUgcHJvcGVydGllczogYW5nbGVzIGFyZSBtZWFzdXJlZCBpbiByYWRpYW5zLCB3aXRoIDAgaW5kaWNhdGluZyBcIm5vcnRoXCIuXG4gICAqL1xuICB0aGV0YT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB0eXBlZmFjZSB0byBzZXQgdGhlIHRleHQgaW4gKGUuZy4sIEhlbHZldGljYSBOZXVlKS5cbiAgICovXG4gIGZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplLCBpbiBwaXhlbHMuXG4gICAqL1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb250IHN0eWxlIChlLmcuLCBpdGFsaWMpLlxuICAgKi9cbiAgZm9udFN0eWxlPzogRm9udFN0eWxlO1xuICAvKipcbiAgICogVGhlIGZvbnQgd2VpZ2h0IChlLmcuLCBib2xkKS5cbiAgICovXG4gIGZvbnRXZWlnaHQ/OiBGb250V2VpZ2h0O1xuICAvLyBWZWdhLUxpdGUgb25seSBmb3IgdGV4dCBvbmx5XG4gIC8qKlxuICAgKiBUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciB0ZXh0IHZhbHVlLiBJZiBub3QgZGVmaW5lZCwgdGhpcyB3aWxsIGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseS5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIFRleHRcbiAgICovXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNvbG9yIGZpZWxkIHRvIGJhY2tncm91bmQgY29sb3IgaW5zdGVhZCBvZiB0aGUgdGV4dC5cbiAgICovXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7XG4gIGNvbG9yOiAnIzQ2ODJiNCcsXG4gIHNoYXBlOiBTaGFwZS5DSVJDTEUsXG4gIHN0cm9rZVdpZHRoOiAyLFxuICBzaXplOiAzMCxcbiAgYmFyVGhpblNpemU6IDIsXG4gIC8vIGxpbmVTaXplIGlzIHVuZGVmaW5lZCBieSBkZWZhdWx0LCBhbmQgcmVmZXIgdG8gdmFsdWUgZnJvbSBzdHJva2VXaWR0aFxuICBydWxlU2l6ZTogMSxcbiAgdGlja1RoaWNrbmVzczogMSxcblxuICBmb250U2l6ZTogMTAsXG4gIGJhc2VsaW5lOiBWZXJ0aWNhbEFsaWduLk1JRERMRSxcbiAgdGV4dDogJ0FiYycsXG5cbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZSxcbiAgYXBwbHlDb2xvclRvQmFja2dyb3VuZDogZmFsc2Vcbn07XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAvLyBUT0RPOiBhZGQgdGhpcyBiYWNrIG9uY2Ugd2UgaGF2ZSB0b3AtZG93biBsYXlvdXQgYXBwcm9hY2hcbiAgLy8gd2lkdGg/OiBudW1iZXI7XG4gIC8vIGhlaWdodD86IG51bWJlcjtcbiAgLy8gcGFkZGluZz86IG51bWJlcnxzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgb24tc2NyZWVuIHZpZXdwb3J0LCBpbiBwaXhlbHMuIElmIG5lY2Vzc2FyeSwgY2xpcHBpbmcgYW5kIHNjcm9sbGluZyB3aWxsIGJlIGFwcGxpZWQuXG4gICAqL1xuICB2aWV3cG9ydD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENTUyBjb2xvciBwcm9wZXJ0eSB0byB1c2UgYXMgYmFja2dyb3VuZCBvZiB2aXN1YWxpemF0aW9uLiBEZWZhdWx0IGlzIGBcInRyYW5zcGFyZW50XCJgLlxuICAgKi9cbiAgYmFja2dyb3VuZD86IHN0cmluZztcblxuICAvKipcbiAgICogRDMgTnVtYmVyIGZvcm1hdCBmb3IgYXhpcyBsYWJlbHMgYW5kIHRleHQgdGFibGVzLiBGb3IgZXhhbXBsZSBcInNcIiBmb3IgU0kgdW5pdHMuXG4gICAqL1xuICBudW1iZXJGb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLlxuICAgKi9cbiAgdGltZUZvcm1hdD86IHN0cmluZztcblxuICBjZWxsPzogQ2VsbENvbmZpZztcbiAgbWFyaz86IE1hcmtDb25maWc7XG4gIHNjYWxlPzogU2NhbGVDb25maWc7XG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuICBsZWdlbmQ/OiBMZWdlbmRDb25maWc7XG5cbiAgZmFjZXQ/OiBGYWNldENvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IENvbmZpZyA9IHtcbiAgbnVtYmVyRm9ybWF0OiAncycsXG4gIHRpbWVGb3JtYXQ6ICclWS0lbS0lZCcsXG5cbiAgY2VsbDogZGVmYXVsdENlbGxDb25maWcsXG4gIG1hcms6IGRlZmF1bHRNYXJrQ29uZmlnLFxuICBzY2FsZTogZGVmYXVsdFNjYWxlQ29uZmlnLFxuICBheGlzOiBkZWZhdWx0QXhpc0NvbmZpZyxcbiAgbGVnZW5kOiBkZWZhdWx0TGVnZW5kQ29uZmlnLFxuXG4gIGZhY2V0OiBkZWZhdWx0RmFjZXRDb25maWcsXG59O1xuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhLlxuICovXG5pbXBvcnQge1R5cGV9IGZyb20gJy4vdHlwZSc7XG5cbmV4cG9ydCBlbnVtIERhdGFGb3JtYXQge1xuICAgIEpTT04gPSAnanNvbicgYXMgYW55LFxuICAgIENTViA9ICdjc3YnIGFzIGFueSxcbiAgICBUU1YgPSAndHN2JyBhcyBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSB7XG4gIGZvcm1hdFR5cGU/OiBEYXRhRm9ybWF0O1xuICB1cmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQYXNzIGFycmF5IG9mIG9iamVjdHMgaW5zdGVhZCBvZiBhIHVybCB0byBhIGZpbGUuXG4gICAqL1xuICB2YWx1ZXM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGVudW0gRGF0YVRhYmxlIHtcbiAgU09VUkNFID0gJ3NvdXJjZScgYXMgYW55LFxuICBTVU1NQVJZID0gJ3N1bW1hcnknIGFzIGFueSxcbiAgU1RBQ0tFRF9TQ0FMRSA9ICdzdGFja2VkX3NjYWxlJyBhcyBhbnksXG4gIExBWU9VVCA9ICdsYXlvdXQnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgU1VNTUFSWSA9IERhdGFUYWJsZS5TVU1NQVJZO1xuZXhwb3J0IGNvbnN0IFNPVVJDRSA9IERhdGFUYWJsZS5TT1VSQ0U7XG5leHBvcnQgY29uc3QgU1RBQ0tFRF9TQ0FMRSA9IERhdGFUYWJsZS5TVEFDS0VEX1NDQUxFO1xuZXhwb3J0IGNvbnN0IExBWU9VVCA9IERhdGFUYWJsZS5MQVlPVVQ7XG5cbi8qKiBNYXBwaW5nIGZyb20gZGF0YWxpYidzIGluZmVycmVkIHR5cGUgdG8gVmVnYS1saXRlJ3MgdHlwZSAqL1xuLy8gVE9ETzogY29uc2lkZXIgaWYgd2UgY2FuIHJlbW92ZVxuZXhwb3J0IGNvbnN0IHR5cGVzID0ge1xuICAnYm9vbGVhbic6IFR5cGUuTk9NSU5BTCxcbiAgJ251bWJlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnaW50ZWdlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnZGF0ZSc6IFR5cGUuVEVNUE9SQUwsXG4gICdzdHJpbmcnOiBUeXBlLk5PTUlOQUxcbn07XG4iLCIvLyB1dGlsaXR5IGZvciBlbmNvZGluZyBtYXBwaW5nXG5pbXBvcnQge0ZpZWxkRGVmLCBQb3NpdGlvbkNoYW5uZWxEZWYsIEZhY2V0Q2hhbm5lbERlZiwgQ2hhbm5lbERlZldpdGhMZWdlbmQsIE9yZGVyQ2hhbm5lbERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge0NoYW5uZWwsIENIQU5ORUxTfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtpc0FycmF5LCBhbnkgYXMgYW55SW59IGZyb20gJy4vdXRpbCc7XG5cbi8vIFRPRE86IG9uY2Ugd2UgZGVjb21wb3NlIGZhY2V0LCByZW5hbWUgdGhpcyB0byBFbmNvZGluZ1xuZXhwb3J0IGludGVyZmFjZSBVbml0RW5jb2Rpbmcge1xuICB4PzogUG9zaXRpb25DaGFubmVsRGVmO1xuICB5PzogUG9zaXRpb25DaGFubmVsRGVmO1xuICBjb2xvcj86IENoYW5uZWxEZWZXaXRoTGVnZW5kO1xuICBvcGFjaXR5PzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG4gIHNpemU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcbiAgc2hhcGU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDsgLy8gVE9ETzogbWF5YmUgZGlzdGluZ3Vpc2ggb3JkaW5hbC1vbmx5XG4gIGRldGFpbD86IEZpZWxkRGVmIHwgRmllbGREZWZbXTtcbiAgdGV4dD86IEZpZWxkRGVmO1xuICBsYWJlbD86IEZpZWxkRGVmO1xuXG4gIHBhdGg/OiBPcmRlckNoYW5uZWxEZWYgfCBPcmRlckNoYW5uZWxEZWZbXTtcbiAgb3JkZXI/OiBPcmRlckNoYW5uZWxEZWYgfCBPcmRlckNoYW5uZWxEZWZbXTtcbn1cblxuLy8gVE9ETzogb25jZSB3ZSBkZWNvbXBvc2UgZmFjZXQsIHJlbmFtZSB0aGlzIHRvIEV4dGVuZGVkRW5jb2RpbmdcbmV4cG9ydCBpbnRlcmZhY2UgRW5jb2RpbmcgZXh0ZW5kcyBVbml0RW5jb2Rpbmcge1xuICByb3c/OiBGYWNldENoYW5uZWxEZWY7XG4gIGNvbHVtbj86IEZhY2V0Q2hhbm5lbERlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50UmV0aW5hbChlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgaWYgKGVuY29kaW5nLmNvbG9yKSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLm9wYWNpdHkpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcuc2l6ZSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaGFwZSkgeyBjb3VudCsrOyB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gQ0hBTk5FTFMuZmlsdGVyKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gaGFzKGVuY29kaW5nLCBjaGFubmVsKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nICYmIGVuY29kaW5nW2NoYW5uZWxdO1xuICByZXR1cm4gY2hhbm5lbEVuY29kaW5nICYmIChcbiAgICBjaGFubmVsRW5jb2RpbmcuZmllbGQgIT09IHVuZGVmaW5lZCB8fFxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFueUluKENIQU5ORUxTLCAoY2hhbm5lbCkgPT4ge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpICYmIGVuY29kaW5nW2NoYW5uZWxdLmFnZ3JlZ2F0ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nKTogRmllbGREZWZbXSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZmllbGREZWYpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGNoYW5uZWxNYXBwaW5nRm9yRWFjaChDSEFOTkVMUywgZW5jb2RpbmcsIGYsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdGb3JFYWNoKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgaSA9IDA7XG4gIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsLCBpKyspO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGYuY2FsbCh0aGlzQXJnLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBpKyspO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nTWFwKENIQU5ORUxTLCBlbmNvZGluZywgZiAsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdNYXAoY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IGFyciA9IFtdO1xuICBjaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICByZXR1cm4gY2hhbm5lbE1hcHBpbmdSZWR1Y2UoQ0hBTk5FTFMsIGVuY29kaW5nLCBmLCBpbml0LCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nUmVkdWNlKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgciA9IGluaXQ7XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBmaWVsZERlZiwgY2hhbm5lbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcjtcbn1cbiIsIi8vIHV0aWxpdHkgZm9yIGEgZmllbGQgZGVmaW5pdGlvbiBvYmplY3RcblxuaW1wb3J0IHtBZ2dyZWdhdGVPcCwgQUdHUkVHQVRFX09QU30gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtBeGlzfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtCaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtTb3J0RmllbGQsIFNvcnRPcmRlcn0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHtUeXBlLCBOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgZ2V0YmlucywgdG9NYXB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogIEludGVyZmFjZSBmb3IgYW55IGtpbmQgb2YgRmllbGREZWY7XG4gKiAgRm9yIHNpbXBsaWNpdHksIHdlIGRvIG5vdCBkZWNsYXJlIG11bHRpcGxlIGludGVyZmFjZXMgb2YgRmllbGREZWYgbGlrZVxuICogIHdlIGRvIGZvciBKU09OIHNjaGVtYS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWVsZERlZiB7XG4gIGZpZWxkPzogc3RyaW5nO1xuICB0eXBlPzogVHlwZTtcbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuO1xuXG4gIC8vIGZ1bmN0aW9uXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG4gIGJpbj86IGJvb2xlYW4gfCBCaW47XG4gIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0ZU9wO1xuXG4gIC8vIG1ldGFkYXRhXG4gIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgYWdncmVnYXRlID0ge1xuICB0eXBlOiAnc3RyaW5nJyxcbiAgZW51bTogQUdHUkVHQVRFX09QUyxcbiAgc3VwcG9ydGVkRW51bXM6IHtcbiAgICBxdWFudGl0YXRpdmU6IEFHR1JFR0FURV9PUFMsXG4gICAgb3JkaW5hbDogWydtZWRpYW4nLCdtaW4nLCdtYXgnXSxcbiAgICBub21pbmFsOiBbXSxcbiAgICB0ZW1wb3JhbDogWydtZWFuJywgJ21lZGlhbicsICdtaW4nLCAnbWF4J10sIC8vIFRPRE86IHJldmlzZSB3aGF0IHNob3VsZCB0aW1lIHN1cHBvcnRcbiAgICAnJzogWydjb3VudCddXG4gIH0sXG4gIHN1cHBvcnRlZFR5cGVzOiB0b01hcChbUVVBTlRJVEFUSVZFLCBOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTCwgJyddKVxufTtcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhTY2FsZSBleHRlbmRzIEZpZWxkRGVmIHtcbiAgc2NhbGU/OiBTY2FsZTtcbiAgc29ydD86IFNvcnRGaWVsZCB8IFNvcnRPcmRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbkNoYW5uZWxEZWYgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgYXhpcz86IGJvb2xlYW4gfCBBeGlzO1xufVxuZXhwb3J0IGludGVyZmFjZSBDaGFubmVsRGVmV2l0aExlZ2VuZCBleHRlbmRzIENoYW5uZWxEZWZXaXRoU2NhbGUge1xuICBsZWdlbmQ/OiBMZWdlbmQ7XG59XG5cbi8vIERldGFpbFxuXG4vLyBPcmRlciBQYXRoIGhhdmUgbm8gc2NhbGVcblxuZXhwb3J0IGludGVyZmFjZSBPcmRlckNoYW5uZWxEZWYgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNvcnQ/OiBTb3J0T3JkZXI7XG59XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgdG8gZGlzdGluZ3Vpc2ggb3JkaW5hbE9ubHlTY2FsZSBmcm9tIHNjYWxlXG5leHBvcnQgdHlwZSBGYWNldENoYW5uZWxEZWYgPSBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkUmVmT3B0aW9uIHtcbiAgLyoqIGV4Y2x1ZGUgYmluLCBhZ2dyZWdhdGUsIHRpbWVVbml0ICovXG4gIG5vZm4/OiBib29sZWFuO1xuICAvKiogZXhjbHVkZSBhZ2dyZWdhdGlvbiBmdW5jdGlvbiAqL1xuICBub0FnZ3JlZ2F0ZT86IGJvb2xlYW47XG4gIC8qKiBpbmNsdWRlICdkYXR1bS4nICovXG4gIGRhdHVtPzogYm9vbGVhbjtcbiAgLyoqIHJlcGxhY2UgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIGZuPzogc3RyaW5nO1xuICAvKiogcHJlcGVuZCBmbiB3aXRoIGN1c3RvbSBmdW5jdGlvbiBwcmVmaXggKi9cbiAgcHJlZm4/OiBzdHJpbmc7XG4gIC8qKiBzY2FsZVR5cGUgKi9cbiAgc2NhbGVUeXBlPzogU2NhbGVUeXBlO1xuICAvKiogYXBwZW5kIHN1ZmZpeCB0byB0aGUgZmllbGQgcmVmIGZvciBiaW4gKGRlZmF1bHQ9J19zdGFydCcpICovXG4gIGJpblN1ZmZpeD86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiAoZ2VuZXJhbCkgKi9cbiAgc3VmZml4Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGQoZmllbGREZWY6IEZpZWxkRGVmLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgY29uc3QgcHJlZml4ID0gKG9wdC5kYXR1bSA/ICdkYXR1bS4nIDogJycpICsgKG9wdC5wcmVmbiB8fCAnJyk7XG4gIGNvbnN0IHN1ZmZpeCA9IG9wdC5zdWZmaXggfHwgJyc7XG4gIGNvbnN0IGZpZWxkID0gZmllbGREZWYuZmllbGQ7XG5cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdjb3VudCcgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAob3B0LmZuKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIG9wdC5mbiArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi5iaW4pIHtcbiAgICBjb25zdCBiaW5TdWZmaXggPSBvcHQuYmluU3VmZml4IHx8IChcbiAgICAgIG9wdC5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID9cbiAgICAgICAgLy8gRm9yIG9yZGluYWwgc2NhbGUgdHlwZSwgdXNlIGBfcmFuZ2VgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19yYW5nZScgOlxuICAgICAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUgb3IgdW5rbm93biwgdXNlIGBfc3RhcnRgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19zdGFydCdcbiAgICApO1xuICAgIHJldHVybiBwcmVmaXggKyAnYmluXycgKyBmaWVsZCArIGJpblN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgIW9wdC5ub0FnZ3JlZ2F0ZSAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGREZWYuYWdncmVnYXRlICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLnRpbWVVbml0ICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSB8fCAhIWZpZWxkRGVmLmJpbiB8fFxuICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiAhIWZpZWxkRGVmLnRpbWVVbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZWFzdXJlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgIV9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IENPVU5UX1RJVExFID0gJ051bWJlciBvZiBSZWNvcmRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50KCk6IEZpZWxkRGVmIHtcbiAgcmV0dXJuIHsgZmllbGQ6ICcqJywgYWdncmVnYXRlOiBBZ2dyZWdhdGVPcC5DT1VOVCwgdHlwZTogUVVBTlRJVEFUSVZFLCB0aXRsZTogQ09VTlRfVElUTEUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ291bnQoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UO1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpcywgYW5kIHRoZSBnZXRiaW5zIG1ldGhvZFxuLy8gRklYTUUgdGhpcyBkZXBlbmRzIG9uIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiBjYXJkaW5hbGl0eShmaWVsZERlZjogRmllbGREZWYsIHN0YXRzLCBmaWx0ZXJOdWxsID0ge30pIHtcbiAgLy8gRklYTUUgbmVlZCB0byB0YWtlIGZpbHRlciBpbnRvIGFjY291bnRcblxuICBjb25zdCBzdGF0ID0gc3RhdHNbZmllbGREZWYuZmllbGRdLFxuICB0eXBlID0gZmllbGREZWYudHlwZTtcblxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgLy8gbmVlZCB0byByZWFzc2lnbiBiaW4sIG90aGVyd2lzZSBjb21waWxhdGlvbiB3aWxsIGZhaWwgZHVlIHRvIGEgVFMgYnVnLlxuICAgIGNvbnN0IGJpbiA9IGZpZWxkRGVmLmJpbjtcbiAgICBsZXQgbWF4YmlucyA9ICh0eXBlb2YgYmluID09PSAnYm9vbGVhbicpID8gdW5kZWZpbmVkIDogYmluLm1heGJpbnM7XG4gICAgaWYgKG1heGJpbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4YmlucyA9IDEwO1xuICAgIH1cblxuICAgIGNvbnN0IGJpbnMgPSBnZXRiaW5zKHN0YXQsIG1heGJpbnMpO1xuICAgIHJldHVybiAoYmlucy5zdG9wIC0gYmlucy5zdGFydCkgLyBiaW5zLnN0ZXA7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgY29uc3QgdGltZVVuaXQgPSBmaWVsZERlZi50aW1lVW5pdDtcbiAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSUzogcmV0dXJuIDI0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVk6IHJldHVybiA3O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVRFOiByZXR1cm4gMzE7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOiByZXR1cm4gMTI7XG4gICAgICBjYXNlIFRpbWVVbml0LllFQVI6XG4gICAgICAgIGNvbnN0IHllYXJzdGF0ID0gc3RhdHNbJ3llYXJfJyArIGZpZWxkRGVmLmZpZWxkXTtcblxuICAgICAgICBpZiAoIXllYXJzdGF0KSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgcmV0dXJuIHllYXJzdGF0LmRpc3RpbmN0IC1cbiAgICAgICAgICAoc3RhdC5taXNzaW5nID4gMCAmJiBmaWx0ZXJOdWxsW3R5cGVdID8gMSA6IDApO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2UgdXNlIGNhbGN1bGF0aW9uIGJlbG93XG4gIH1cbiAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG51bGxcbiAgcmV0dXJuIHN0YXQuZGlzdGluY3QgLVxuICAgIChzdGF0Lm1pc3NpbmcgPiAwICYmIGZpbHRlck51bGxbdHlwZV0gPyAxIDogMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShmaWVsZERlZjogRmllbGREZWYpIHtcbiAgaWYgKGZpZWxkRGVmLnRpdGxlICE9IG51bGwpIHtcbiAgICByZXR1cm4gZmllbGREZWYudGl0bGU7XG4gIH1cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIENPVU5UX1RJVExFO1xuICB9XG4gIGNvbnN0IGZuID0gZmllbGREZWYuYWdncmVnYXRlIHx8IGZpZWxkRGVmLnRpbWVVbml0IHx8IChmaWVsZERlZi5iaW4gJiYgJ2JpbicpO1xuICBpZiAoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpICsgJygnICsgZmllbGREZWYuZmllbGQgKyAnKSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpZWxkRGVmLmZpZWxkO1xuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIExlZ2VuZENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIGxlZ2VuZC4gT25lIG9mIFwibGVmdFwiIG9yIFwicmlnaHRcIi4gVGhpcyBkZXRlcm1pbmVzIGhvdyB0aGUgbGVnZW5kIGlzIHBvc2l0aW9uZWQgd2l0aGluIHRoZSBzY2VuZS4gVGhlIGRlZmF1bHQgaXMgXCJyaWdodFwiLlxuICAgKi9cbiAgb3JpZW50Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG9mZnNldCwgaW4gcGl4ZWxzLCBieSB3aGljaCB0byBkaXNwbGFjZSB0aGUgbGVnZW5kIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGVuY2xvc2luZyBncm91cCBvciBkYXRhIHJlY3RhbmdsZS5cbiAgICovXG4gIG9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBwYWRkaW5nLCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIGxlbmdlbmQgYW5kIGF4aXMuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1hcmdpbiBhcm91bmQgdGhlIGxlZ2VuZCwgaW4gcGl4ZWxzXG4gICAqL1xuICBtYXJnaW4/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGdyYWRpZW50IHN0cm9rZSwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIGdyYWRpZW50U3Ryb2tlQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50IHN0cm9rZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGdyYWRpZW50LCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudEhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JhZGllbnQsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50V2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgYWxpZ25tZW50IG9mIHRoZSBsZWdlbmQgbGFiZWwsIGNhbiBiZSBsZWZ0LCBtaWRkbGUgb3IgcmlnaHQuXG4gICAqL1xuICBsYWJlbEFsaWduPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBiYXNlbGluZSBvZiBsZWdlbmQgbGFiZWwsIGNhbiBiZSB0b3AsIG1pZGRsZSBvciBib3R0b20uXG4gICAqL1xuICBsYWJlbEJhc2VsaW5lPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgbGFiZWwsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICBsYWJlbENvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIGxlbmdlbmQgbGFiZWwuXG4gICAqL1xuICBsYWJlbEZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIGxlbmdlbmQgbGFibGUuXG4gICAqL1xuICBsYWJlbEZvbnRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgbGVnZW5kIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCBzeW1ib2wsXG4gICAqL1xuICBzeW1ib2xDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzaGFwZSBvZiB0aGUgbGVnZW5kIHN5bWJvbCwgY2FuIGJlIHRoZSAnY2lyY2xlJywgJ3NxdWFyZScsICdjcm9zcycsICdkaWFtb25kJyxcbiAgICogJ3RyaWFuZ2xlLXVwJywgJ3RyaWFuZ2xlLWRvd24nLlxuICAgKi9cbiAgc3ltYm9sU2hhcGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgbGVuZ2VuZCBzeW1ib2wsIGluIHBpeGVscy5cbiAgICovXG4gIHN5bWJvbFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHN5bWJvbCdzIHN0cm9rZS5cbiAgICovXG4gIHN5bWJvbFN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGxlZ2VuZCBzdHlsaW5nLlxuICAgKi9cbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIHRpdGxlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGl0bGVDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGZvbnQgd2VpZ2h0IG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRXZWlnaHQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gbGVnZW5kIHN0eWxpbmcuXG4gICAqL1xuICBwcm9wZXJ0aWVzPzogYW55OyAvLyBUT0RPKCM5NzUpIHJlcGxhY2Ugd2l0aCBjb25maWcgcHJvcGVydGllc1xufVxuXG4vKipcbiAqIFByb3BlcnRpZXMgb2YgYSBsZWdlbmQgb3IgYm9vbGVhbiBmbGFnIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHNob3cgaXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kIGV4dGVuZHMgTGVnZW5kQ29uZmlnIHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbGVnZW5kIGxhYmVscy4gVmVnYSB1c2VzIEQzXFwncyBmb3JtYXQgcGF0dGVybi5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIEEgdGl0bGUgZm9yIHRoZSBsZWdlbmQuIChTaG93cyBmaWVsZCBuYW1lIGFuZCBpdHMgZnVuY3Rpb24gYnkgZGVmYXVsdC4pXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIEV4cGxpY2l0bHkgc2V0IHRoZSB2aXNpYmxlIGxlZ2VuZCB2YWx1ZXMuXG4gICAqL1xuICB2YWx1ZXM/OiBBcnJheTxhbnk+O1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdExlZ2VuZENvbmZpZzogTGVnZW5kQ29uZmlnID0ge1xuICBvcmllbnQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSBcInJpZ2h0XCJcbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZVxufTtcbiIsImV4cG9ydCBlbnVtIE1hcmsge1xuICBBUkVBID0gJ2FyZWEnIGFzIGFueSxcbiAgQkFSID0gJ2JhcicgYXMgYW55LFxuICBMSU5FID0gJ2xpbmUnIGFzIGFueSxcbiAgUE9JTlQgPSAncG9pbnQnIGFzIGFueSxcbiAgVEVYVCA9ICd0ZXh0JyBhcyBhbnksXG4gIFRJQ0sgPSAndGljaycgYXMgYW55LFxuICBSVUxFID0gJ3J1bGUnIGFzIGFueSxcbiAgQ0lSQ0xFID0gJ2NpcmNsZScgYXMgYW55LFxuICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IEFSRUEgPSBNYXJrLkFSRUE7XG5leHBvcnQgY29uc3QgQkFSID0gTWFyay5CQVI7XG5leHBvcnQgY29uc3QgTElORSA9IE1hcmsuTElORTtcbmV4cG9ydCBjb25zdCBQT0lOVCA9IE1hcmsuUE9JTlQ7XG5leHBvcnQgY29uc3QgVEVYVCA9IE1hcmsuVEVYVDtcbmV4cG9ydCBjb25zdCBUSUNLID0gTWFyay5USUNLO1xuZXhwb3J0IGNvbnN0IFJVTEUgPSBNYXJrLlJVTEU7XG5cbmV4cG9ydCBjb25zdCBDSVJDTEUgPSBNYXJrLkNJUkNMRTtcbmV4cG9ydCBjb25zdCBTUVVBUkUgPSBNYXJrLlNRVUFSRTtcbiIsImV4cG9ydCBlbnVtIFNjYWxlVHlwZSB7XG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIExPRyA9ICdsb2cnIGFzIGFueSxcbiAgICBQT1cgPSAncG93JyBhcyBhbnksXG4gICAgU1FSVCA9ICdzcXJ0JyBhcyBhbnksXG4gICAgUVVBTlRJTEUgPSAncXVhbnRpbGUnIGFzIGFueSxcbiAgICBRVUFOVElaRSA9ICdxdWFudGl6ZScgYXMgYW55LFxuICAgIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICAgIFRJTUUgPSAndGltZScgYXMgYW55LFxuICAgIFVUQyAgPSAndXRjJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIE5pY2VUaW1lIHtcbiAgICBTRUNPTkQgPSAnc2Vjb25kJyBhcyBhbnksXG4gICAgTUlOVVRFID0gJ21pbnV0ZScgYXMgYW55LFxuICAgIEhPVVIgPSAnaG91cicgYXMgYW55LFxuICAgIERBWSA9ICdkYXknIGFzIGFueSxcbiAgICBXRUVLID0gJ3dlZWsnIGFzIGFueSxcbiAgICBNT05USCA9ICdtb250aCcgYXMgYW55LFxuICAgIFlFQVIgPSAneWVhcicgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlQ29uZmlnIHtcbiAgLyoqXG4gICAqIElmIHRydWUsIHJvdW5kcyBudW1lcmljIG91dHB1dCB2YWx1ZXMgdG8gaW50ZWdlcnMuXG4gICAqIFRoaXMgY2FuIGJlIGhlbHBmdWwgZm9yIHNuYXBwaW5nIHRvIHRoZSBwaXhlbCBncmlkLlxuICAgKiAoT25seSBhdmFpbGFibGUgZm9yIGB4YCwgYHlgLCBgc2l6ZWAsIGByb3dgLCBhbmQgYGNvbHVtbmAgc2NhbGVzLilcbiAgICovXG4gIHJvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqICBEZWZhdWx0IGJhbmQgd2lkdGggZm9yIGB4YCBvcmRpbmFsIHNjYWxlIHdoZW4gaXMgbWFyayBpcyBgdGV4dGAuXG4gICAqICBAbWluaW11bSAwXG4gICAqL1xuICB0ZXh0QmFuZFdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBiYW5kIHNpemUgZm9yICgxKSBgeWAgb3JkaW5hbCBzY2FsZSxcbiAgICogYW5kICgyKSBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIHRoZSBtYXJrIGlzIG5vdCBgdGV4dGAuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJhbmRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3Igb3BhY2l0eS5cbiAgICovXG4gIG9wYWNpdHk/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIERlZmF1bHQgcGFkZGluZyBmb3IgYHhgIGFuZCBgeWAgb3JkaW5hbCBzY2FsZXMuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBVc2VzIHRoZSBzb3VyY2UgZGF0YSByYW5nZSBhcyBzY2FsZSBkb21haW4gaW5zdGVhZCBvZiBhZ2dyZWdhdGVkIGRhdGEgZm9yIGFnZ3JlZ2F0ZSBheGlzLlxuICAgKiBUaGlzIHByb3BlcnR5IG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgd2l0aGluIHRoZSByYXcgZGF0YSBkb21haW4gKGBcIm1lYW5cImAsIGBcImF2ZXJhZ2VcImAsIGBcInN0ZGV2XCJgLCBgXCJzdGRldnBcImAsIGBcIm1lZGlhblwiYCwgYFwicTFcImAsIGBcInEzXCJgLCBgXCJtaW5cImAsIGBcIm1heFwiYCkuIEZvciBvdGhlciBhZ2dyZWdhdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyBvdXRzaWRlIG9mIHRoZSByYXcgZGF0YSBkb21haW4gKGUuZy4gYFwiY291bnRcImAsIGBcInN1bVwiYCksIHRoaXMgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICovXG4gIHVzZVJhd0RvbWFpbj86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIG5vbWluYWwgY29sb3Igc2NhbGUgKi9cbiAgbm9taW5hbENvbG9yUmFuZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIG9yZGluYWwgLyBjb250aW51b3VzIGNvbG9yIHNjYWxlICovXG4gIHNlcXVlbnRpYWxDb2xvclJhbmdlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBzaGFwZSAqL1xuICBzaGFwZVJhbmdlPzogc3RyaW5nfHN0cmluZ1tdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBiYXJTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgZm9udCBzaXplIHNjYWxlICovXG4gIGZvbnRTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgcnVsZSBzdHJva2Ugd2lkdGhzICovXG4gIHJ1bGVTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgdGljayBzcGFucyAqL1xuICB0aWNrU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGJhciBzaXplIHNjYWxlICovXG4gIHBvaW50U2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLy8gbmljZSBzaG91bGQgZGVwZW5kcyBvbiB0eXBlIChxdWFudGl0YXRpdmUgb3IgdGVtcG9yYWwpLCBzb1xuICAvLyBsZXQncyBub3QgbWFrZSBhIGNvbmZpZy5cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTY2FsZUNvbmZpZzogU2NhbGVDb25maWcgPSB7XG4gIHJvdW5kOiB0cnVlLFxuICB0ZXh0QmFuZFdpZHRoOiA5MCxcbiAgYmFuZFNpemU6IDIxLFxuICBwYWRkaW5nOiAxLFxuICB1c2VSYXdEb21haW46IGZhbHNlLFxuICBvcGFjaXR5OiBbMC4zLCAwLjhdLFxuXG4gIG5vbWluYWxDb2xvclJhbmdlOiAnY2F0ZWdvcnkxMCcsXG4gIHNlcXVlbnRpYWxDb2xvclJhbmdlOiBbJyNBRkM2QTMnLCAnIzA5NjIyQSddLCAvLyB0YWJsZWF1IGdyZWVuc1xuICBzaGFwZVJhbmdlOiAnc2hhcGVzJyxcbiAgZm9udFNpemVSYW5nZTogWzgsIDQwXSxcbiAgcnVsZVNpemVSYW5nZTogWzEsIDVdLFxuICB0aWNrU2l6ZVJhbmdlOiBbMSwgMjBdXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0U2NhbGVDb25maWcge1xuICByb3VuZD86IGJvb2xlYW47XG4gIHBhZGRpbmc/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZzogRmFjZXRTY2FsZUNvbmZpZyA9IHtcbiAgcm91bmQ6IHRydWUsXG4gIHBhZGRpbmc6IDE2XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlIHtcbiAgdHlwZT86IFNjYWxlVHlwZTtcbiAgLyoqXG4gICAqIFRoZSBkb21haW4gb2YgdGhlIHNjYWxlLCByZXByZXNlbnRpbmcgdGhlIHNldCBvZiBkYXRhIHZhbHVlcy4gRm9yIHF1YW50aXRhdGl2ZSBkYXRhLCB0aGlzIGNhbiB0YWtlIHRoZSBmb3JtIG9mIGEgdHdvLWVsZW1lbnQgYXJyYXkgd2l0aCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gRm9yIG9yZGluYWwvY2F0ZWdvcmljYWwgZGF0YSwgdGhpcyBtYXkgYmUgYW4gYXJyYXkgb2YgdmFsaWQgaW5wdXQgdmFsdWVzLiBUaGUgZG9tYWluIG1heSBhbHNvIGJlIHNwZWNpZmllZCBieSBhIHJlZmVyZW5jZSB0byBhIGRhdGEgc291cmNlLlxuICAgKi9cbiAgZG9tYWluPzogc3RyaW5nIHwgbnVtYmVyW10gfCBzdHJpbmdbXTsgLy8gVE9ETzogZGVjbGFyZSB2Z0RhdGFEb21haW5cbiAgLyoqXG4gICAqIFRoZSByYW5nZSBvZiB0aGUgc2NhbGUsIHJlcHJlc2VudGluZyB0aGUgc2V0IG9mIHZpc3VhbCB2YWx1ZXMuIEZvciBudW1lcmljIHZhbHVlcywgdGhlIHJhbmdlIGNhbiB0YWtlIHRoZSBmb3JtIG9mIGEgdHdvLWVsZW1lbnQgYXJyYXkgd2l0aCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gRm9yIG9yZGluYWwgb3IgcXVhbnRpemVkIGRhdGEsIHRoZSByYW5nZSBtYXkgYnkgYW4gYXJyYXkgb2YgZGVzaXJlZCBvdXRwdXQgdmFsdWVzLCB3aGljaCBhcmUgbWFwcGVkIHRvIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgZG9tYWluLiBGb3Igb3JkaW5hbCBzY2FsZXMgb25seSwgdGhlIHJhbmdlIGNhbiBiZSBkZWZpbmVkIHVzaW5nIGEgRGF0YVJlZjogdGhlIHJhbmdlIHZhbHVlcyBhcmUgdGhlbiBkcmF3biBkeW5hbWljYWxseSBmcm9tIGEgYmFja2luZyBkYXRhIHNldC5cbiAgICovXG4gIHJhbmdlPzogc3RyaW5nIHwgbnVtYmVyW10gfCBzdHJpbmdbXTsgLy8gVE9ETzogZGVjbGFyZSB2Z1JhbmdlRG9tYWluXG4gIC8qKlxuICAgKiBJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC5cbiAgICovXG4gIHJvdW5kPzogYm9vbGVhbjtcblxuICAvLyBvcmRpbmFsXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFwcGxpZXMgc3BhY2luZyBhbW9uZyBvcmRpbmFsIGVsZW1lbnRzIGluIHRoZSBzY2FsZSByYW5nZS4gVGhlIGFjdHVhbCBlZmZlY3QgZGVwZW5kcyBvbiBob3cgdGhlIHNjYWxlIGlzIGNvbmZpZ3VyZWQuIElmIHRoZSBfX3BvaW50c19fIHBhcmFtZXRlciBpcyBgdHJ1ZWAsIHRoZSBwYWRkaW5nIHZhbHVlIGlzIGludGVycHJldGVkIGFzIGEgbXVsdGlwbGUgb2YgdGhlIHNwYWNpbmcgYmV0d2VlbiBwb2ludHMuIEEgcmVhc29uYWJsZSB2YWx1ZSBpcyAxLjAsIHN1Y2ggdGhhdCB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgd2lsbCBiZSBvZmZzZXQgZnJvbSB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBieSBoYWxmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHBvaW50cy4gT3RoZXJ3aXNlLCBwYWRkaW5nIGlzIHR5cGljYWxseSBpbiB0aGUgcmFuZ2UgWzAsIDFdIGFuZCBjb3JyZXNwb25kcyB0byB0aGUgZnJhY3Rpb24gb2Ygc3BhY2UgaW4gdGhlIHJhbmdlIGludGVydmFsIHRvIGFsbG9jYXRlIHRvIHBhZGRpbmcuIEEgdmFsdWUgb2YgMC41IG1lYW5zIHRoYXQgdGhlIHJhbmdlIGJhbmQgd2lkdGggd2lsbCBiZSBlcXVhbCB0byB0aGUgcGFkZGluZyB3aWR0aC4gRm9yIG1vcmUsIHNlZSB0aGUgW0QzIG9yZGluYWwgc2NhbGUgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL21ib3N0b2NrL2QzL3dpa2kvT3JkaW5hbC1TY2FsZXMpLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvLyB0eXBpY2FsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB2YWx1ZXMgdGhhdCBleGNlZWQgdGhlIGRhdGEgZG9tYWluIGFyZSBjbGFtcGVkIHRvIGVpdGhlciB0aGUgbWluaW11bSBvciBtYXhpbXVtIHJhbmdlIHZhbHVlXG4gICAqL1xuICBjbGFtcD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiBzcGVjaWZpZWQsIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSB2YWx1ZSByYW5nZS4gSWYgc3BlY2lmaWVkIGFzIGEgdHJ1ZSBib29sZWFuLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgbnVtYmVyIHJhbmdlIChlLmcuLCA3IGluc3RlYWQgb2YgNi45NikuIElmIHNwZWNpZmllZCBhcyBhIHN0cmluZywgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IHZhbHVlIHJhbmdlLiBGb3IgdGltZSBhbmQgdXRjIHNjYWxlIHR5cGVzIG9ubHksIHRoZSBuaWNlIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBkZXNpcmVkIHRpbWUgaW50ZXJ2YWwuXG4gICAqL1xuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lO1xuICAvKipcbiAgICogU2V0cyB0aGUgZXhwb25lbnQgb2YgdGhlIHNjYWxlIHRyYW5zZm9ybWF0aW9uLiBGb3IgcG93IHNjYWxlIHR5cGVzIG9ubHksIG90aGVyd2lzZSBpZ25vcmVkLlxuICAgKi9cbiAgZXhwb25lbnQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCBlbnN1cmVzIHRoYXQgYSB6ZXJvIGJhc2VsaW5lIHZhbHVlIGlzIGluY2x1ZGVkIGluIHRoZSBzY2FsZSBkb21haW4uIFRoaXMgb3B0aW9uIGlzIGlnbm9yZWQgZm9yIG5vbi1xdWFudGl0YXRpdmUgc2NhbGVzLlxuICAgKi9cbiAgemVybz86IGJvb2xlYW47XG5cbiAgLy8gVmVnYS1MaXRlIG9ubHlcbiAgLyoqXG4gICAqIFVzZXMgdGhlIHNvdXJjZSBkYXRhIHJhbmdlIGFzIHNjYWxlIGRvbWFpbiBpbnN0ZWFkIG9mIGFnZ3JlZ2F0ZWQgZGF0YSBmb3IgYWdncmVnYXRlIGF4aXMuXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0ZSBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyB3aXRoaW4gdGhlIHJhdyBkYXRhIGRvbWFpbiAoYFwibWVhblwiYCwgYFwiYXZlcmFnZVwiYCwgYFwic3RkZXZcImAsIGBcInN0ZGV2cFwiYCwgYFwibWVkaWFuXCJgLCBgXCJxMVwiYCwgYFwicTNcImAsIGBcIm1pblwiYCwgYFwibWF4XCJgKS4gRm9yIG90aGVyIGFnZ3JlZ2F0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIG91dHNpZGUgb2YgdGhlIHJhdyBkYXRhIGRvbWFpbiAoZS5nLiBgXCJjb3VudFwiYCwgYFwic3VtXCJgKSwgdGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxuICAgKi9cbiAgdXNlUmF3RG9tYWluPzogYm9vbGVhbjtcbn1cbiIsIi8qKiBtb2R1bGUgZm9yIHNob3J0aGFuZCAqL1xuXG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG5pbXBvcnQge0FnZ3JlZ2F0ZU9wLCBBR0dSRUdBVEVfT1BTfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge1RJTUVVTklUU30gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge1NIT1JUX1RZUEUsIFRZUEVfRlJPTV9TSE9SVF9UWVBFfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcblxuZXhwb3J0IGNvbnN0IERFTElNID0gJ3wnO1xuZXhwb3J0IGNvbnN0IEFTU0lHTiA9ICc9JztcbmV4cG9ydCBjb25zdCBUWVBFID0gJywnO1xuZXhwb3J0IGNvbnN0IEZVTkMgPSAnXyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW4oc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IHN0cmluZyB7XG4gIHJldHVybiAnbWFyaycgKyBBU1NJR04gKyBzcGVjLm1hcmsgK1xuICAgIERFTElNICsgc2hvcnRlbkVuY29kaW5nKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc2hvcnRoYW5kOiBzdHJpbmcsIGRhdGE/LCBjb25maWc/KSB7XG4gIGxldCBzcGxpdCA9IHNob3J0aGFuZC5zcGxpdChERUxJTSksXG4gICAgbWFyayA9IHNwbGl0LnNoaWZ0KCkuc3BsaXQoQVNTSUdOKVsxXS50cmltKCksXG4gICAgZW5jb2RpbmcgPSBwYXJzZUVuY29kaW5nKHNwbGl0LmpvaW4oREVMSU0pKTtcblxuICBsZXQgc3BlYzpFeHRlbmRlZFVuaXRTcGVjID0ge1xuICAgIG1hcms6IE1hcmtbbWFya10sXG4gICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gIH07XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHNwZWMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgaWYgKGNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5jb25maWcgPSBjb25maWc7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRW5jb2RpbmcoZW5jb2Rpbmc6IEVuY29kaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZsRW5jb2RpbmcubWFwKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZiwgY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsICsgQVNTSUdOICsgc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgfSkuam9pbihERUxJTSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVuY29kaW5nKGVuY29kaW5nU2hvcnRoYW5kOiBzdHJpbmcpOiBFbmNvZGluZyB7XG4gIHJldHVybiBlbmNvZGluZ1Nob3J0aGFuZC5zcGxpdChERUxJTSkucmVkdWNlKGZ1bmN0aW9uKG0sIGUpIHtcbiAgICBjb25zdCBzcGxpdCA9IGUuc3BsaXQoQVNTSUdOKSxcbiAgICAgICAgZW5jdHlwZSA9IHNwbGl0WzBdLnRyaW0oKSxcbiAgICAgICAgZmllbGREZWZTaG9ydGhhbmQgPSBzcGxpdFsxXTtcblxuICAgIG1bZW5jdHlwZV0gPSBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kKTtcbiAgICByZXR1cm4gbTtcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZik6IHN0cmluZyB7XG4gIHJldHVybiAoZmllbGREZWYuYWdncmVnYXRlID8gZmllbGREZWYuYWdncmVnYXRlICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLnRpbWVVbml0ID8gZmllbGREZWYudGltZVVuaXQgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuYmluID8gJ2JpbicgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuZmllbGQgfHwgJycpICsgVFlQRSArIFNIT1JUX1RZUEVbZmllbGREZWYudHlwZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWZzKGZpZWxkRGVmczogRmllbGREZWZbXSwgZGVsaW0gPSBERUxJTSk6IHN0cmluZyB7XG4gIHJldHVybiBmaWVsZERlZnMubWFwKHNob3J0ZW5GaWVsZERlZikuam9pbihkZWxpbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kOiBzdHJpbmcpOiBGaWVsZERlZiB7XG4gIGNvbnN0IHNwbGl0ID0gZmllbGREZWZTaG9ydGhhbmQuc3BsaXQoVFlQRSk7XG5cbiAgbGV0IGZpZWxkRGVmOiBGaWVsZERlZiA9IHtcbiAgICBmaWVsZDogc3BsaXRbMF0udHJpbSgpLFxuICAgIHR5cGU6IFRZUEVfRlJPTV9TSE9SVF9UWVBFW3NwbGl0WzFdLnRyaW0oKV1cbiAgfTtcblxuICAvLyBjaGVjayBhZ2dyZWdhdGUgdHlwZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFHR1JFR0FURV9PUFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgYSA9IEFHR1JFR0FURV9PUFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoYSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGEudG9TdHJpbmcoKS5sZW5ndGggKyAxKTtcbiAgICAgIGlmIChhID09PSBBZ2dyZWdhdGVPcC5DT1VOVCAmJiBmaWVsZERlZi5maWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZmllbGREZWYuZmllbGQgPSAnKic7XG4gICAgICB9XG4gICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBUSU1FVU5JVFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdHUgPSBUSU1FVU5JVFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YodHUgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihmaWVsZERlZi5maWVsZC5sZW5ndGggKyAxKTtcbiAgICAgIGZpZWxkRGVmLnRpbWVVbml0ID0gdHU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBiaW5cbiAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoJ2Jpbl8nKSA9PT0gMCkge1xuICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKDQpO1xuICAgIGZpZWxkRGVmLmJpbiA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gZmllbGREZWY7XG59XG4iLCJpbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5cbmV4cG9ydCBlbnVtIFNvcnRPcmRlciB7XG4gICAgQVNDRU5ESU5HID0gJ2FzY2VuZGluZycgYXMgYW55LFxuICAgIERFU0NFTkRJTkcgPSAnZGVzY2VuZGluZycgYXMgYW55LFxuICAgIE5PTkUgPSAnbm9uZScgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRGaWVsZCB7XG4gIC8qKlxuICAgKiBUaGUgZmllbGQgbmFtZSB0byBhZ2dyZWdhdGUgb3Zlci5cbiAgICovXG4gIGZpZWxkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc29ydCBhZ2dyZWdhdGlvbiBvcGVyYXRvclxuICAgKi9cbiAgb3A6IEFnZ3JlZ2F0ZU9wO1xuXG4gIG9yZGVyPzogU29ydE9yZGVyO1xufVxuIiwiLyogVXRpbGl0aWVzIGZvciBhIFZlZ2EtTGl0ZSBzcGVjaWZpY2lhdGlvbiAqL1xuXG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL2ZpZWxkZGVmJztcbi8vIFBhY2thZ2Ugb2YgZGVmaW5pbmcgVmVnYS1saXRlIFNwZWNpZmljYXRpb24ncyBqc29uIHNjaGVtYVxuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHtFbmNvZGluZywgVW5pdEVuY29kaW5nLCBoYXN9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGYWNldH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge01hcmt9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge1RyYW5zZm9ybX0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuXG5pbXBvcnQge0NPTE9SLCBTSEFQRSwgUk9XLCBDT0xVTU59IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtCQVIsIEFSRUF9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2R1cGxpY2F0ZSwgZXh0ZW5kfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VTcGVjIHtcbiAgbmFtZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGRhdGE/OiBEYXRhO1xuICB0cmFuc2Zvcm0/OiBUcmFuc2Zvcm07XG4gIGNvbmZpZz86IENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgbWFyazogTWFyaztcbiAgZW5jb2Rpbmc/OiBVbml0RW5jb2Rpbmc7XG59XG5cbi8qKlxuICogU2NoZW1hIGZvciBhIHVuaXQgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24sIHdpdGggdGhlIHN5bnRhY3RpYyBzdWdhciBleHRlbnNpb25zOlxuICogLSBgcm93YCBhbmQgYGNvbHVtbmAgYXJlIGluY2x1ZGVkIGluIHRoZSBlbmNvZGluZy5cbiAqIC0gKEZ1dHVyZSkgbGFiZWwsIGJveCBwbG90XG4gKlxuICogTm90ZTogdGhlIHNwZWMgY291bGQgY29udGFpbiBmYWNldC5cbiAqXG4gKiBAcmVxdWlyZWQgW1wibWFya1wiLCBcImVuY29kaW5nXCJdXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIEEgbmFtZSBmb3IgdGhlIHNwZWNpZmljYXRpb24uIFRoZSBuYW1lIGlzIHVzZWQgdG8gYW5ub3RhdGUgbWFya3MsIHNjYWxlIG5hbWVzLCBhbmQgbW9yZS5cbiAgICovXG4gIG1hcms6IE1hcms7XG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICBmYWNldDogRmFjZXQ7XG4gIHNwZWM6IExheWVyU3BlYyB8IFVuaXRTcGVjO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheWVyU3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgbGF5ZXJzOiBVbml0U3BlY1tdO1xufVxuXG4vKiogVGhpcyBpcyBmb3IgdGhlIGZ1dHVyZSBzY2hlbWEgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRGYWNldFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIGZhY2V0OiBGYWNldDtcblxuICBzcGVjOiBFeHRlbmRlZFVuaXRTcGVjIHwgRmFjZXRTcGVjO1xufVxuXG5leHBvcnQgdHlwZSBFeHRlbmRlZFNwZWMgPSBFeHRlbmRlZFVuaXRTcGVjIHwgRmFjZXRTcGVjIHwgTGF5ZXJTcGVjO1xuZXhwb3J0IHR5cGUgU3BlYyA9IFVuaXRTcGVjIHwgRmFjZXRTcGVjIHwgTGF5ZXJTcGVjO1xuXG4vKiBDdXN0b20gdHlwZSBndWFyZHMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmFjZXRTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgRmFjZXRTcGVjIHtcbiAgcmV0dXJuIHNwZWNbJ2ZhY2V0J10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXh0ZW5kZWRVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEV4dGVuZGVkVW5pdFNwZWMge1xuICBpZiAoaXNTb21lVW5pdFNwZWMoc3BlYykpIHtcbiAgICBjb25zdCBoYXNSb3cgPSBoYXMoc3BlYy5lbmNvZGluZywgUk9XKTtcbiAgICBjb25zdCBoYXNDb2x1bW4gPSBoYXMoc3BlYy5lbmNvZGluZywgQ09MVU1OKTtcblxuICAgIHJldHVybiBoYXNSb3cgfHwgaGFzQ29sdW1uO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIFVuaXRTcGVjIHtcbiAgaWYgKGlzU29tZVVuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuICFpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYyk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NvbWVVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEV4dGVuZGVkVW5pdFNwZWMgfCBVbml0U3BlYyB7XG4gIHJldHVybiBzcGVjWydtYXJrJ10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGF5ZXJTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgTGF5ZXJTcGVjIHtcbiAgcmV0dXJuIHNwZWNbJ2xheWVycyddICE9PSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogRGVjb21wb3NlIGV4dGVuZGVkIHVuaXQgc3BlY3MgaW50byBjb21wb3NpdGlvbiBvZiBwdXJlIHVuaXQgc3BlY3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUoc3BlYzogRXh0ZW5kZWRTcGVjKTogU3BlYyB7XG4gIGlmIChpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYykpIHtcbiAgICBjb25zdCBoYXNSb3cgPSBoYXMoc3BlYy5lbmNvZGluZywgUk9XKTtcbiAgICBjb25zdCBoYXNDb2x1bW4gPSBoYXMoc3BlYy5lbmNvZGluZywgQ09MVU1OKTtcblxuICAgIC8vIFRPRE86IEBhcnZpbmQgcGxlYXNlICBhZGQgaW50ZXJhY3Rpb24gc3ludGF4IGhlcmVcbiAgICBsZXQgZW5jb2RpbmcgPSBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZyk7XG4gICAgZGVsZXRlIGVuY29kaW5nLmNvbHVtbjtcbiAgICBkZWxldGUgZW5jb2Rpbmcucm93O1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIHNwZWMubmFtZSA/IHsgbmFtZTogc3BlYy5uYW1lIH0gOiB7fSxcbiAgICAgIHNwZWMuZGVzY3JpcHRpb24gPyB7IGRlc2NyaXB0aW9uOiBzcGVjLmRlc2NyaXB0aW9uIH0gOiB7fSxcbiAgICAgIHsgZGF0YTogc3BlYy5kYXRhIH0sXG4gICAgICBzcGVjLnRyYW5zZm9ybSA/IHsgdHJhbnNmb3JtOiBzcGVjLnRyYW5zZm9ybSB9IDoge30sXG4gICAgICB7XG4gICAgICAgIGZhY2V0OiBleHRlbmQoXG4gICAgICAgICAgaGFzUm93ID8geyByb3c6IHNwZWMuZW5jb2Rpbmcucm93IH0gOiB7fSxcbiAgICAgICAgICBoYXNDb2x1bW4gPyB7IGNvbHVtbjogc3BlYy5lbmNvZGluZy5jb2x1bW4gfSA6IHt9XG4gICAgICAgICksXG4gICAgICAgIHNwZWM6IHtcbiAgICAgICAgICBtYXJrOiBzcGVjLm1hcmssXG4gICAgICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzcGVjLmNvbmZpZyA/IHsgY29uZmlnOiBzcGVjLmNvbmZpZyB9IDoge31cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHNwZWM7XG59XG5cbi8vIFRPRE86IGFkZCB2bC5zcGVjLnZhbGlkYXRlICYgbW92ZSBzdHVmZiBmcm9tIHZsLnZhbGlkYXRlIHRvIGhlcmVcblxuZXhwb3J0IGZ1bmN0aW9uIGFsd2F5c05vT2NjbHVzaW9uKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBib29sZWFuIHtcbiAgLy8gRklYTUUgcmF3IE94USB3aXRoICMgb2Ygcm93cyA9ICMgb2YgT1xuICByZXR1cm4gdmxFbmNvZGluZy5pc0FnZ3JlZ2F0ZShzcGVjLmVuY29kaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRGVmcyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRmllbGREZWZbXSB7XG4gIC8vIFRPRE86IHJlZmFjdG9yIHRoaXMgb25jZSB3ZSBoYXZlIGNvbXBvc2l0aW9uXG4gIHJldHVybiB2bEVuY29kaW5nLmZpZWxkRGVmcyhzcGVjLmVuY29kaW5nKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGVhblNwZWMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEV4dGVuZGVkVW5pdFNwZWMge1xuICAvLyBUT0RPOiBtb3ZlIHRvU3BlYyB0byBoZXJlIVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RhY2soc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHZsRW5jb2RpbmcuaGFzKHNwZWMuZW5jb2RpbmcsIENPTE9SKSB8fCB2bEVuY29kaW5nLmhhcyhzcGVjLmVuY29kaW5nLCBTSEFQRSkpICYmXG4gICAgKHNwZWMubWFyayA9PT0gQkFSIHx8IHNwZWMubWFyayA9PT0gQVJFQSkgJiZcbiAgICAoIXNwZWMuY29uZmlnIHx8ICFzcGVjLmNvbmZpZy5tYXJrLnN0YWNrZWQgIT09IGZhbHNlKSAmJlxuICAgIHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUoc3BlYy5lbmNvZGluZyk7XG59XG5cbi8vIFRPRE8gcmV2aXNlXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgY29uc3Qgb2xkZW5jID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICBlbmNvZGluZy54ID0gb2xkZW5jLnk7XG4gIGVuY29kaW5nLnkgPSBvbGRlbmMueDtcbiAgZW5jb2Rpbmcucm93ID0gb2xkZW5jLmNvbHVtbjtcbiAgZW5jb2RpbmcuY29sdW1uID0gb2xkZW5jLnJvdztcbiAgc3BlYy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICByZXR1cm4gc3BlYztcbn1cbiIsIlxuZXhwb3J0IGVudW0gVGltZVVuaXQge1xuICAgIFlFQVIgPSAneWVhcicgYXMgYW55LFxuICAgIE1PTlRIID0gJ21vbnRoJyBhcyBhbnksXG4gICAgREFZID0gJ2RheScgYXMgYW55LFxuICAgIERBVEUgPSAnZGF0ZScgYXMgYW55LFxuICAgIEhPVVJTID0gJ2hvdXJzJyBhcyBhbnksXG4gICAgTUlOVVRFUyA9ICdtaW51dGVzJyBhcyBhbnksXG4gICAgU0VDT05EUyA9ICdzZWNvbmRzJyBhcyBhbnksXG4gICAgTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcycgYXMgYW55LFxuICAgIFlFQVJNT05USCA9ICd5ZWFybW9udGgnIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVkgPSAneWVhcm1vbnRoZGF5JyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFURSA9ICd5ZWFybW9udGhkYXRlJyBhcyBhbnksXG4gICAgWUVBUkRBWSA9ICd5ZWFyZGF5JyBhcyBhbnksXG4gICAgWUVBUkRBVEUgPSAneWVhcmRhdGUnIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVlIT1VSUyA9ICd5ZWFybW9udGhkYXlob3VycycgYXMgYW55LFxuICAgIFlFQVJNT05USERBWUhPVVJTTUlOVVRFUyA9ICd5ZWFybW9udGhkYXlob3Vyc21pbnV0ZXMnIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVlIT1VSU01JTlVURVNTRUNPTkRTID0gJ3llYXJtb250aGRheWhvdXJzbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgICBIT1VSU01JTlVURVMgPSAnaG91cnNtaW51dGVzJyBhcyBhbnksXG4gICAgSE9VUlNNSU5VVEVTU0VDT05EUyA9ICdob3Vyc21pbnV0ZXNzZWNvbmRzJyBhcyBhbnksXG4gICAgTUlOVVRFU1NFQ09ORFMgPSAnbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgICBTRUNPTkRTTUlMTElTRUNPTkRTID0gJ3NlY29uZHNtaWxsaXNlY29uZHMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGNvbnN0IFRJTUVVTklUUyA9IFtcbiAgICBUaW1lVW5pdC5ZRUFSLFxuICAgIFRpbWVVbml0Lk1PTlRILFxuICAgIFRpbWVVbml0LkRBWSxcbiAgICBUaW1lVW5pdC5EQVRFLFxuICAgIFRpbWVVbml0LkhPVVJTLFxuICAgIFRpbWVVbml0Lk1JTlVURVMsXG4gICAgVGltZVVuaXQuU0VDT05EUyxcbiAgICBUaW1lVW5pdC5NSUxMSVNFQ09ORFMsXG4gICAgVGltZVVuaXQuWUVBUk1PTlRILFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWSxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVRFLFxuICAgIFRpbWVVbml0LllFQVJEQVksXG4gICAgVGltZVVuaXQuWUVBUkRBVEUsXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFZSE9VUlMsXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFZSE9VUlNNSU5VVEVTLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWUhPVVJTTUlOVVRFU1NFQ09ORFMsXG4gICAgVGltZVVuaXQuSE9VUlNNSU5VVEVTLFxuICAgIFRpbWVVbml0LkhPVVJTTUlOVVRFU1NFQ09ORFMsXG4gICAgVGltZVVuaXQuTUlOVVRFU1NFQ09ORFMsXG4gICAgVGltZVVuaXQuU0VDT05EU01JTExJU0VDT05EUyxcbl07XG5cbi8qKiByZXR1cm5zIHRoZSB0ZW1wbGF0ZSBuYW1lIHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh0aW1lVW5pdDogVGltZVVuaXQsIGFiYnJldmlhdGVkID0gZmFsc2UpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxldCB0aW1lU3RyaW5nID0gdGltZVVuaXQudG9TdHJpbmcoKTtcblxuICBsZXQgZGF0ZUNvbXBvbmVudHMgPSBbXTtcblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCd5ZWFyJykgPiAtMSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goYWJicmV2aWF0ZWQgPyAnJXknIDogJyVZJyk7XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdtb250aCcpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyViJyA6ICclQicpO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignZGF5JykgPiAtMSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goYWJicmV2aWF0ZWQgPyAnJWEnIDogJyVBJyk7XG4gIH0gZWxzZSBpZiAodGltZVN0cmluZy5pbmRleE9mKCdkYXRlJykgPiAtMSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goJyVkJyk7XG4gIH1cblxuICBsZXQgdGltZUNvbXBvbmVudHMgPSBbXTtcblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdob3VycycpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclSCcpO1xuICB9XG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbnV0ZXMnKSA+IC0xKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJU0nKTtcbiAgfVxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdzZWNvbmRzJykgPiAtMSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVTJyk7XG4gIH1cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbWlsbGlzZWNvbmRzJykgPiAtMSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVMJyk7XG4gIH1cblxuICBsZXQgb3V0ID0gW107XG4gIGlmIChkYXRlQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2goZGF0ZUNvbXBvbmVudHMuam9pbignLScpKTtcbiAgfVxuICBpZiAodGltZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKHRpbWVDb21wb25lbnRzLmpvaW4oJzonKSk7XG4gIH1cblxuICByZXR1cm4gb3V0Lmxlbmd0aCA+IDAgPyBvdXQuam9pbignICcpIDogdW5kZWZpbmVkO1xufVxuIiwiLyoqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhIHR5cGUgKi9cblxuZXhwb3J0IGVudW0gVHlwZSB7XG4gIFFVQU5USVRBVElWRSA9ICdxdWFudGl0YXRpdmUnIGFzIGFueSxcbiAgT1JESU5BTCA9ICdvcmRpbmFsJyBhcyBhbnksXG4gIFRFTVBPUkFMID0gJ3RlbXBvcmFsJyBhcyBhbnksXG4gIE5PTUlOQUwgPSAnbm9taW5hbCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBRVUFOVElUQVRJVkUgPSBUeXBlLlFVQU5USVRBVElWRTtcbmV4cG9ydCBjb25zdCBPUkRJTkFMID0gVHlwZS5PUkRJTkFMO1xuZXhwb3J0IGNvbnN0IFRFTVBPUkFMID0gVHlwZS5URU1QT1JBTDtcbmV4cG9ydCBjb25zdCBOT01JTkFMID0gVHlwZS5OT01JTkFMO1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBmdWxsIHR5cGUgbmFtZXMgdG8gc2hvcnQgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBTSE9SVF9UWVBFID0ge1xuICBxdWFudGl0YXRpdmU6ICdRJyxcbiAgdGVtcG9yYWw6ICdUJyxcbiAgbm9taW5hbDogJ04nLFxuICBvcmRpbmFsOiAnTydcbn07XG4vKipcbiAqIE1hcHBpbmcgZnJvbSBzaG9ydCB0eXBlIG5hbWVzIHRvIGZ1bGwgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBUWVBFX0ZST01fU0hPUlRfVFlQRSA9IHtcbiAgUTogUVVBTlRJVEFUSVZFLFxuICBUOiBURU1QT1JBTCxcbiAgTzogT1JESU5BTCxcbiAgTjogTk9NSU5BTFxufTtcblxuLyoqXG4gKiBHZXQgZnVsbCwgbG93ZXJjYXNlIHR5cGUgbmFtZSBmb3IgYSBnaXZlbiB0eXBlLlxuICogQHBhcmFtICB0eXBlXG4gKiBAcmV0dXJuIEZ1bGwgdHlwZSBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbE5hbWUodHlwZTogVHlwZSk6IFR5cGUge1xuICBjb25zdCB0eXBlU3RyaW5nID0gPGFueT50eXBlOyAgLy8gZm9yY2UgdHlwZSBhcyBzdHJpbmcgc28gd2UgY2FuIHRyYW5zbGF0ZSBzaG9ydCB0eXBlc1xuICByZXR1cm4gVFlQRV9GUk9NX1NIT1JUX1RZUEVbdHlwZVN0cmluZy50b1VwcGVyQ2FzZSgpXSB8fCAvLyBzaG9ydCB0eXBlIGlzIHVwcGVyY2FzZSBieSBkZWZhdWx0XG4gICAgICAgICB0eXBlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9kYXRhbGliLmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9qc29uLXN0YWJsZS1zdHJpbmdpZnkuZC50c1wiLz5cblxuaW1wb3J0ICogYXMgc3RyaW5naWZ5IGZyb20gJ2pzb24tc3RhYmxlLXN0cmluZ2lmeSc7XG5leHBvcnQge2tleXMsIGV4dGVuZCwgZHVwbGljYXRlLCBpc0FycmF5LCB2YWxzLCB0cnVuY2F0ZSwgdG9NYXAsIGlzT2JqZWN0LCBpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbn0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5leHBvcnQge3JhbmdlfSBmcm9tICdkYXRhbGliL3NyYy9nZW5lcmF0ZSc7XG5leHBvcnQge2hhc30gZnJvbSAnLi9lbmNvZGluZydcbmV4cG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuZXhwb3J0IHtDaGFubmVsfSBmcm9tICcuL2NoYW5uZWwnO1xuXG5pbXBvcnQge2lzU3RyaW5nLCBpc051bWJlciwgaXNCb29sZWFufSBmcm9tICdkYXRhbGliL3NyYy91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2goYTogYW55KSB7XG4gIGlmIChpc1N0cmluZyhhKSB8fCBpc051bWJlcihhKSB8fCBpc0Jvb2xlYW4oYSkpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpO1xuICB9XG4gIHJldHVybiBzdHJpbmdpZnkoYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluczxUPihhcnJheTogQXJyYXk8VD4sIGl0ZW06IFQpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSkgPiAtMTtcbn1cblxuLyoqIFJldHVybnMgdGhlIGFycmF5IHdpdGhvdXQgdGhlIGVsZW1lbnRzIGluIGl0ZW0gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRob3V0PFQ+KGFycmF5OiBBcnJheTxUPiwgZXhjbHVkZWRJdGVtczogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFjb250YWlucyhleGNsdWRlZEl0ZW1zLCBpdGVtKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxUPihhcnJheTogQXJyYXk8VD4sIG90aGVyOiBBcnJheTxUPikge1xuICByZXR1cm4gYXJyYXkuY29uY2F0KHdpdGhvdXQob3RoZXIsIGFycmF5KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgb2JqLmZvckVhY2guY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKG9iaiwgZjogKGEsIGksIGQsIGssIG8pID0+IGFueSwgaW5pdCwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5yZWR1Y2UpIHtcbiAgICByZXR1cm4gb2JqLnJlZHVjZS5jYWxsKHRoaXNBcmcsIGYsIGluaXQpO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGluaXQgPSBmLmNhbGwodGhpc0FyZywgaW5pdCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5pdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcC5jYWxsKHRoaXNBcmcsIGYpO1xuICB9IGVsc2Uge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBvdXRwdXQucHVzaChmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW55PFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoZihhcnJba10sIGssIGkrKykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGw8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmICghZihhcnJba10sIGssIGkrKykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycmF5czogYW55W10pIHtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcChkZXN0LCAuLi5zcmM6IGFueVtdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVzdCA9IGRlZXBNZXJnZV8oZGVzdCwgc3JjW2ldKTtcbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG5cbi8vIHJlY3Vyc2l2ZWx5IG1lcmdlcyBzcmMgaW50byBkZXN0XG5mdW5jdGlvbiBkZWVwTWVyZ2VfKGRlc3QsIHNyYykge1xuICBpZiAodHlwZW9mIHNyYyAhPT0gJ29iamVjdCcgfHwgc3JjID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmb3IgKGxldCBwIGluIHNyYykge1xuICAgIGlmICghc3JjLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHNyY1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzcmNbcF0gIT09ICdvYmplY3QnIHx8IHNyY1twXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IHNyY1twXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0W3BdICE9PSAnb2JqZWN0JyB8fCBkZXN0W3BdID09PSBudWxsKSB7XG4gICAgICBkZXN0W3BdID0gbWVyZ2VEZWVwKHNyY1twXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBbXSA6IHt9LCBzcmNbcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZURlZXAoZGVzdFtwXSwgc3JjW3BdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59XG5cbi8vIEZJWE1FIHJlbW92ZSB0aGlzXG5pbXBvcnQgKiBhcyBkbEJpbiBmcm9tICdkYXRhbGliL3NyYy9iaW5zL2JpbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldGJpbnMoc3RhdHMsIG1heGJpbnMpIHtcbiAgcmV0dXJuIGRsQmluKHtcbiAgICBtaW46IHN0YXRzLm1pbixcbiAgICBtYXg6IHN0YXRzLm1heCxcbiAgICBtYXhiaW5zOiBtYXhiaW5zXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlPFQ+KHZhbHVlczogVFtdLCBmPzogKGl0ZW06IFQpID0+IHN0cmluZykge1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGkgPSAwLCBuID0gdmFsdWVzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB1W3ZdID0gMTtcbiAgICByZXN1bHRzLnB1c2godmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLndhcm4oJ1tWTCBXYXJuaW5nXScsIG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogYW55KSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1tWTCBFcnJvcl0nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaWN0PFQ+IHtcbiAgW2tleTogc3RyaW5nXTogVDtcbn1cblxuZXhwb3J0IHR5cGUgU3RyaW5nU2V0ID0gRGljdDxib29sZWFuPjtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBkaWNpdG9uYXJpZXMgZGlzYWdyZWUuIEFwcGxpZXMgb25seSB0byBkZWZpb25lZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXI8VD4oZGljdDogRGljdDxUPiwgb3RoZXI6IERpY3Q8VD4pIHtcbiAgZm9yIChsZXQga2V5IGluIGRpY3QpIHtcbiAgICBpZiAoZGljdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBpZiAob3RoZXJba2V5XSAmJiBkaWN0W2tleV0gJiYgb3RoZXJba2V5XSAhPT0gZGljdFtrZXldKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQge0V4dGVuZGVkVW5pdFNwZWN9IGZyb20gJy4vc3BlYyc7XG5cbi8vIFRPRE86IG1vdmUgdG8gdmwuc3BlYy52YWxpZGF0b3I/XG5cbmltcG9ydCB7dG9NYXB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0JBUn0gZnJvbSAnLi9tYXJrJztcblxuaW50ZXJmYWNlIFJlcXVpcmVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIEVuY29kaW5nIENoYW5uZWxzIGZvciBlYWNoIG1hcmsgdHlwZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IHtcbiAgdGV4dDogWyd0ZXh0J10sXG4gIGxpbmU6IFsneCcsICd5J10sXG4gIGFyZWE6IFsneCcsICd5J11cbn07XG5cbmludGVyZmFjZSBTdXBwb3J0ZWRDaGFubmVsTWFwIHtcbiAgW21hcms6IHN0cmluZ106IHtcbiAgICBbY2hhbm5lbDogc3RyaW5nXTogbnVtYmVyXG4gIH07XG59XG5cbi8qKlxuICogU3VwcG9ydGVkIEVuY29kaW5nIENoYW5uZWwgZm9yIGVhY2ggbWFyayB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEU6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSB7XG4gIGJhcjogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdzaXplJywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgbGluZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksIC8vIFRPRE86IGFkZCBzaXplIHdoZW4gVmVnYSBzdXBwb3J0c1xuICBhcmVhOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgdGljazogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGNpcmNsZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgc3F1YXJlOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ3NpemUnLCAnZGV0YWlsJ10pLFxuICBwb2ludDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCcsICdzaGFwZSddKSxcbiAgdGV4dDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3NpemUnLCAnY29sb3InLCAndGV4dCddKSAvLyBUT0RPKCM3MjQpIHJldmlzZVxufTtcblxuLy8gVE9ETzogY29uc2lkZXIgaWYgd2Ugc2hvdWxkIGFkZCB2YWxpZGF0ZSBtZXRob2QgYW5kXG4vLyByZXF1aXJlcyBaU2NoZW1hIGluIHRoZSBtYWluIHZlZ2EtbGl0ZSByZXBvXG5cbi8qKlxuICogRnVydGhlciBjaGVjayBpZiBlbmNvZGluZyBtYXBwaW5nIG9mIGEgc3BlYyBpcyBpbnZhbGlkIGFuZFxuICogcmV0dXJuIGVycm9yIGlmIGl0IGlzIGludmFsaWQuXG4gKlxuICogVGhpcyBjaGVja3MgaWZcbiAqICgxKSBhbGwgdGhlIHJlcXVpcmVkIGVuY29kaW5nIGNoYW5uZWxzIGZvciB0aGUgbWFyayB0eXBlIGFyZSBzcGVjaWZpZWRcbiAqICgyKSBhbGwgdGhlIHNwZWNpZmllZCBlbmNvZGluZyBjaGFubmVscyBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBtYXJrIHR5cGVcbiAqIEBwYXJhbSAge1t0eXBlXX0gc3BlYyBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtSZXF1aXJlZENoYW5uZWxNYXAgID0gRGVmYXVsdFJlcXVpcmVkQ2hhbm5lbE1hcH0gIHJlcXVpcmVkQ2hhbm5lbE1hcFxuICogQHBhcmFtICB7U3VwcG9ydGVkQ2hhbm5lbE1hcCA9IERlZmF1bHRTdXBwb3J0ZWRDaGFubmVsTWFwfSBzdXBwb3J0ZWRDaGFubmVsTWFwXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybiBvbmUgcmVhc29uIHdoeSB0aGUgZW5jb2RpbmcgaXMgaW52YWxpZCxcbiAqICAgICAgICAgICAgICAgICAgb3IgbnVsbCBpZiB0aGUgZW5jb2RpbmcgaXMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmNvZGluZ01hcHBpbmdFcnJvcihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjLFxuICByZXF1aXJlZENoYW5uZWxNYXA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVAsXG4gIHN1cHBvcnRlZENoYW5uZWxNYXA6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEVcbiAgKSB7XG4gIGxldCBtYXJrID0gc3BlYy5tYXJrO1xuICBsZXQgZW5jb2RpbmcgPSBzcGVjLmVuY29kaW5nO1xuICBsZXQgcmVxdWlyZWRDaGFubmVscyA9IHJlcXVpcmVkQ2hhbm5lbE1hcFttYXJrXTtcbiAgbGV0IHN1cHBvcnRlZENoYW5uZWxzID0gc3VwcG9ydGVkQ2hhbm5lbE1hcFttYXJrXTtcblxuICBmb3IgKGxldCBpIGluIHJlcXVpcmVkQ2hhbm5lbHMpIHsgLy8gYWxsIHJlcXVpcmVkIGNoYW5uZWxzIGFyZSBpbiBlbmNvZGluZ2BcbiAgICBpZiAoIShyZXF1aXJlZENoYW5uZWxzW2ldIGluIGVuY29kaW5nKSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIGVuY29kaW5nIGNoYW5uZWwgXFxcIicgKyByZXF1aXJlZENoYW5uZWxzW2ldICtcbiAgICAgICAgJ1xcXCIgZm9yIG1hcmsgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGNoYW5uZWwgaW4gZW5jb2RpbmcpIHsgLy8gYWxsIGNoYW5uZWxzIGluIGVuY29kaW5nIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAoIXN1cHBvcnRlZENoYW5uZWxzW2NoYW5uZWxdKSB7XG4gICAgICByZXR1cm4gJ0VuY29kaW5nIGNoYW5uZWwgXFxcIicgKyBjaGFubmVsICtcbiAgICAgICAgJ1xcXCIgaXMgbm90IHN1cHBvcnRlZCBieSBtYXJrIHR5cGUgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXJrID09PSBCQVIgJiYgIWVuY29kaW5nLnggJiYgIWVuY29kaW5nLnkpIHtcbiAgICByZXR1cm4gJ01pc3NpbmcgYm90aCB4IGFuZCB5IGZvciBiYXInO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1NjYWxlVHlwZSwgTmljZVRpbWV9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZnRGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgc291cmNlPzogc3RyaW5nO1xuICB2YWx1ZXM/OiBhbnk7XG4gIGZvcm1hdD86IGFueTtcbiAgdXJsPzogYW55O1xuICB0cmFuc2Zvcm0/OiBhbnk7XG59XG5cbnR5cGUgVmdQYXJlbnRSZWYgPSB7XG4gIHBhcmVudDogc3RyaW5nXG59O1xuXG50eXBlIFZnRmllbGRSZWYgPSBzdHJpbmcgfCBWZ1BhcmVudFJlZiB8IFZnUGFyZW50UmVmW107XG5cbmV4cG9ydCB0eXBlIFZnRGF0YVJlZiA9IHtcbiAgZGF0YTogc3RyaW5nLFxuICBmaWVsZDogVmdGaWVsZFJlZixcbiAgc29ydDogYm9vbGVhbiB8IHtcbiAgICBmaWVsZDogVmdGaWVsZFJlZixcbiAgICBvcDogc3RyaW5nXG4gIH1cbn07XG5cbmV4cG9ydCB0eXBlIFVuaW9uZWREb21haW4gPSB7XG4gIGZpZWxkczogVmdEYXRhUmVmW11cbn07XG5cbmV4cG9ydCB0eXBlIFZnU2NhbGUgPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgdHlwZTogU2NhbGVUeXBlLFxuICBkb21haW4/OiBhbnlbXSB8IFVuaW9uZWREb21haW4gfCBWZ0RhdGFSZWYsXG4gIGRvbWFpbk1pbj86IGFueSxcbiAgZG9tYWluTWF4PzogYW55XG4gIHJhbmdlPzogYW55W10gfCBWZ0RhdGFSZWYgfCBzdHJpbmcsXG4gIHJhbmdlTWluPzogYW55LFxuICByYW5nZU1heD86IGFueSxcblxuICBiYW5kU2l6ZT86IG51bWJlcixcbiAgY2xhbXA/OiBib29sZWFuLFxuICBleHBvbmVudD86IG51bWJlcixcbiAgbmljZT86IGJvb2xlYW4gfCBOaWNlVGltZSxcbiAgcGFkZGluZz86IG51bWJlcixcbiAgcG9pbnRzPzogYm9vbGVhbixcbiAgcmV2ZXJzZT86IGJvb2xlYW4sXG4gIHJvdW5kPzogYm9vbGVhbixcbiAgemVybz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5pb25lZERvbWFpbihkb21haW46IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZik6IGRvbWFpbiBpcyBVbmlvbmVkRG9tYWluIHtcbiAgaWYgKCFpc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gJ2ZpZWxkcycgaW4gZG9tYWluO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YVJlZkRvbWFpbihkb21haW46IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZik6IGRvbWFpbiBpcyBWZ0RhdGFSZWYge1xuICBpZiAoIWlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiAnZGF0YScgaW4gZG9tYWluO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gVE9ETzogZGVjbGFyZVxuZXhwb3J0IHR5cGUgVmdNYXJrR3JvdXAgPSBhbnk7XG5leHBvcnQgdHlwZSBWZ0F4aXMgPSBhbnk7XG5leHBvcnQgdHlwZSBWZ0xlZ2VuZCA9IGFueTtcbmV4cG9ydCB0eXBlIFZnVHJhbnNmb3JtID0gYW55O1xuIiwiaW1wb3J0ICogYXMgdmxCaW4gZnJvbSAnLi9iaW4nO1xuaW1wb3J0ICogYXMgdmxDaGFubmVsIGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgKiBhcyB2bENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyB2bERhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEZpZWxkRGVmIGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0ICogYXMgdmxDb21waWxlIGZyb20gJy4vY29tcGlsZS9jb21waWxlJztcbmltcG9ydCAqIGFzIHZsU2hvcnRoYW5kIGZyb20gJy4vc2hvcnRoYW5kJztcbmltcG9ydCAqIGFzIHZsU3BlYyBmcm9tICcuL3NwZWMnO1xuaW1wb3J0ICogYXMgdmxUaW1lVW5pdCBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCAqIGFzIHZsVHlwZSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxWYWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlJztcbmltcG9ydCAqIGFzIHZsVXRpbCBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgYmluID0gdmxCaW47XG5leHBvcnQgY29uc3QgY2hhbm5lbCA9IHZsQ2hhbm5lbDtcbmV4cG9ydCBjb25zdCBjb21waWxlID0gdmxDb21waWxlLmNvbXBpbGU7XG5leHBvcnQgY29uc3QgY29uZmlnID0gdmxDb25maWc7XG5leHBvcnQgY29uc3QgZGF0YSA9IHZsRGF0YTtcbmV4cG9ydCBjb25zdCBlbmNvZGluZyA9IHZsRW5jb2Rpbmc7XG5leHBvcnQgY29uc3QgZmllbGREZWYgPSB2bEZpZWxkRGVmO1xuZXhwb3J0IGNvbnN0IHNob3J0aGFuZCA9IHZsU2hvcnRoYW5kO1xuZXhwb3J0IGNvbnN0IHNwZWMgPSB2bFNwZWM7XG5leHBvcnQgY29uc3QgdGltZVVuaXQgPSB2bFRpbWVVbml0O1xuZXhwb3J0IGNvbnN0IHR5cGUgPSB2bFR5cGU7XG5leHBvcnQgY29uc3QgdXRpbCA9IHZsVXRpbDtcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHZsVmFsaWRhdGU7XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJ19fVkVSU0lPTl9fJztcbiJdfQ==
