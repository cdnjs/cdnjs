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
                        return '(datum.' + fieldName + '!==null' +
                            ' && !isNaN(datum.' + fieldName + '))';
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
        var data = this.data();
        var childData = child.component.data;
        var compatible = !childData.source || (data && data.url === childData.source.url);
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
        var config = model.config();
        var _orient = orient(config.mark.orient);
        if (_orient) {
            p.orient = _orient;
        }
        p.x = x(model.encoding().x, model.scaleName(channel_1.X), model.stack());
        var _x2 = x2(model.encoding().x, model.scaleName(channel_1.X), model.stack(), config.mark.orient);
        if (_x2) {
            p.x2 = _x2;
        }
        p.y = y(model.encoding().y, model.scaleName(channel_1.Y), model.stack());
        var _y2 = y2(model.encoding().y, model.scaleName(channel_1.Y), model.stack(), config.mark.orient);
        if (_y2) {
            p.y2 = _y2;
        }
        common_1.applyColorAndOpacity(p, model);
        common_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    area.properties = properties;
    function orient(orient) {
        if (orient) {
            return { value: orient };
        }
        return undefined;
    }
    function x(fieldDef, scaleName, stack) {
        if (stack && channel_1.X === stack.fieldChannel) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(fieldDef)) {
            return { scale: scaleName, field: fielddef_1.field(fieldDef) };
        }
        else if (fielddef_1.isDimension(fieldDef)) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
            };
        }
        return undefined;
    }
    function x2(fieldDef, scaleName, stack, orient) {
        if (orient === 'horizontal') {
            if (stack && channel_1.X === stack.fieldChannel) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { suffix: '_end' })
                };
            }
            else {
                return {
                    scale: scaleName,
                    value: 0
                };
            }
        }
        return undefined;
    }
    function y(fieldDef, scaleName, stack) {
        if (stack && channel_1.Y === stack.fieldChannel) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(fieldDef)) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef)
            };
        }
        else if (fielddef_1.isDimension(fieldDef)) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
            };
        }
        return undefined;
    }
    function y2(fieldDef, scaleName, stack, orient) {
        if (orient !== 'horizontal') {
            if (stack && channel_1.Y === stack.fieldChannel) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { suffix: '_end' })
                };
            }
            else {
                return {
                    scale: scaleName,
                    value: 0
                };
            }
        }
        return undefined;
    }
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
var fielddef_1 = require('../../fielddef');
var common_1 = require('../common');
var line;
(function (line) {
    function markType() {
        return 'line';
    }
    line.markType = markType;
    function properties(model) {
        var p = {};
        var config = model.config();
        p.x = x(model.encoding().x, model.scaleName(channel_1.X), config);
        p.y = y(model.encoding().y, model.scaleName(channel_1.Y), config);
        var _size = size(model.encoding().size, config);
        if (_size) {
            p.strokeWidth = _size;
        }
        common_1.applyColorAndOpacity(p, model);
        common_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    line.properties = properties;
    function x(fieldDef, scaleName, config) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
                };
            }
        }
        return { value: 0 };
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
        return { field: { group: 'height' } };
    }
    function size(fieldDef, config) {
        if (fieldDef && fieldDef.value !== undefined) {
            return { value: fieldDef.value };
        }
        return { value: config.mark.lineSize };
    }
    function labels(model) {
        return undefined;
    }
    line.labels = labels;
})(line = exports.line || (exports.line = {}));

},{"../../channel":14,"../../fielddef":52,"../common":16}],39:[function(require,module,exports){
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
var fielddef_1 = require('../../fielddef');
var common_1 = require('../common');
var tick;
(function (tick) {
    function markType() {
        return 'rect';
    }
    tick.markType = markType;
    function properties(model) {
        var p = {};
        var config = model.config();
        p.xc = x(model.encoding().x, model.scaleName(channel_1.X), config);
        p.yc = y(model.encoding().y, model.scaleName(channel_1.Y), config);
        if (config.mark.orient === 'horizontal') {
            p.width = size(model.encoding().size, model.scaleName(channel_1.SIZE), config, (model.scale(channel_1.X) || {}).bandSize);
            p.height = { value: config.mark.tickThickness };
        }
        else {
            p.width = { value: config.mark.tickThickness };
            p.height = size(model.encoding().size, model.scaleName(channel_1.SIZE), config, (model.scale(channel_1.Y) || {}).bandSize);
        }
        common_1.applyColorAndOpacity(p, model);
        return p;
    }
    tick.properties = properties;
    function x(fieldDef, scaleName, config) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
                };
            }
            else if (fieldDef.value) {
                return { value: fieldDef.value };
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
            else if (fieldDef.value) {
                return { value: fieldDef.value };
            }
        }
        return { value: config.scale.bandSize / 2 };
    }
    function size(fieldDef, scaleName, config, scaleBandSize) {
        if (fieldDef) {
            if (fieldDef.field) {
                return {
                    scale: scaleName,
                    field: fieldDef.field
                };
            }
            else if (fieldDef.value !== undefined) {
                return { value: fieldDef.value };
            }
        }
        if (config.mark.tickSize) {
            return { value: config.mark.tickSize };
        }
        var bandSize = scaleBandSize !== undefined ?
            scaleBandSize :
            config.scale.bandSize;
        return { value: bandSize / 1.5 };
    }
    function labels(model) {
        return undefined;
    }
    tick.labels = labels;
})(tick = exports.tick || (exports.tick = {}));

},{"../../channel":14,"../../fielddef":52,"../common":16}],44:[function(require,module,exports){
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
exports.version = '1.0.12';

},{"./bin":13,"./channel":14,"./compile/compile":17,"./config":49,"./data":50,"./encoding":51,"./fielddef":52,"./shorthand":56,"./spec":58,"./timeunit":59,"./type":60,"./util":61,"./validate":62}]},{},[64])(64)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvc3RhY2sudHMiLCJzcmMvY29tcGlsZS90aW1lLnRzIiwic3JjL2NvbXBpbGUvdW5pdC50cyIsInNyYy9jb25maWcudHMiLCJzcmMvZGF0YS50cyIsInNyYy9lbmNvZGluZy50cyIsInNyYy9maWVsZGRlZi50cyIsInNyYy9sZWdlbmQudHMiLCJzcmMvbWFyay50cyIsInNyYy9zY2FsZS50cyIsInNyYy9zaG9ydGhhbmQudHMiLCJzcmMvc29ydC50cyIsInNyYy9zcGVjLnRzIiwic3JjL3RpbWV1bml0LnRzIiwic3JjL3R5cGUudHMiLCJzcmMvdXRpbC50cyIsInNyYy92YWxpZGF0ZS50cyIsInNyYy92ZWdhLnNjaGVtYS50cyIsInNyYy92bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDekpBLFdBQVksV0FBVztJQUNuQixvQ0FBUyxRQUFlLFlBQUEsQ0FBQTtJQUN4QixtQ0FBUSxPQUFjLFdB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Q0FBQyxDQUFBO0FBQzNDLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQ2pDLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQ2pDLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRXBCLFdBQUcsR0FBRyxLQUFLLENBQUM7QUFDWixlQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLGVBQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQzVCLGNBQU0sR0FBRyxRQUFRLENBQUM7QUFDbEIsWUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLGlCQUFTLEdBQUcsV0FBVyxDQUFDO0FBQ3hCLFlBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxnQkFBUSxHQUFHLFVBQVUsQ0FBQztBQUN0QixZQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsWUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBRXRCLGVBQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZScsIFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0MCA9IG5ldyBEYXRlO1xuICB2YXIgdDEgPSBuZXcgRGF0ZTtcbiAgZnVuY3Rpb24gbmV3SW50ZXJ2YWwoZmxvb3JpLCBvZmZzZXRpLCBjb3VudCwgZmllbGQpIHtcblxuICAgIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gICAgfVxuXG4gICAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICAgIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGQwID0gbmV3IERhdGUoK2RhdGUpLFxuICAgICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgICAgZmxvb3JpKGQwKSwgZmxvb3JpKGQxKSwgb2Zmc2V0aShkMSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLm9mZnNldCA9IGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgdmFyIHJhbmdlID0gW107XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgICBzdG9wID0gbmV3IERhdGUoK3N0b3ApO1xuICAgICAgc3RlcCA9IHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgICBvZmZzZXRpKHN0YXJ0LCAxKSwgZmxvb3JpKHN0YXJ0KTtcbiAgICAgIGlmIChzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICAgIHdoaWxlICgtLXN0ZXAgPj0gMCkgd2hpbGUgKG9mZnNldGkoZGF0ZSwgMSksICF0ZXN0KGRhdGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGludGVydmFsLmNvdW50ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICB0MC5zZXRUaW1lKCtzdGFydCksIHQxLnNldFRpbWUoK2VuZCk7XG4gICAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvdW50KHQwLCB0MSkpO1xuICAgICAgfTtcblxuICAgICAgaW50ZXJ2YWwuZXZlcnkgPSBmdW5jdGlvbihzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgICByZXR1cm4gIWlzRmluaXRlKHN0ZXApIHx8ICEoc3RlcCA+IDApID8gbnVsbFxuICAgICAgICAgICAgOiAhKHN0ZXAgPiAxKSA/IGludGVydmFsXG4gICAgICAgICAgICA6IGludGVydmFsLmZpbHRlcihmaWVsZFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24oZCkgeyByZXR1cm4gZmllbGQoZCkgJSBzdGVwID09PSAwOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbihkKSB7IHJldHVybiBpbnRlcnZhbC5jb3VudCgwLCBkKSAlIHN0ZXAgPT09IDA7IH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJ2YWw7XG4gIH07XG5cbiAgdmFyIG1pbGxpc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gbm9vcFxuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kIC0gc3RhcnQ7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgbWlsbGlzZWNvbmQuZXZlcnkgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGguZmxvb3Ioayk7XG4gICAgaWYgKCFpc0Zpbml0ZShrKSB8fCAhKGsgPiAwKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCEoayA+IDEpKSByZXR1cm4gbWlsbGlzZWNvbmQ7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKGRhdGUgLyBrKSAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGs7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciBtaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgc3VuZGF5ID0gd2Vla2RheSgwKTtcbiAgdmFyIG1vbmRheSA9IHdlZWtkYXkoMSk7XG4gIHZhciB0dWVzZGF5ID0gd2Vla2RheSgyKTtcbiAgdmFyIHdlZG5lc2RheSA9IHdlZWtkYXkoMyk7XG4gIHZhciB0aHVyc2RheSA9IHdlZWtkYXkoNCk7XG4gIHZhciBmcmlkYXkgPSB3ZWVrZGF5KDUpO1xuICB2YXIgc2F0dXJkYXkgPSB3ZWVrZGF5KDYpO1xuXG4gIHZhciBtb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0RGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1NlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB1dGNTdW5kYXkgPSB1dGNXZWVrZGF5KDApO1xuICB2YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbiAgdmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xuICB2YXIgdXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcbiAgdmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbiAgdmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG4gIHZhciB1dGNTYXR1cmRheSA9IHV0Y1dlZWtkYXkoNik7XG5cbiAgdmFyIHV0Y01vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENEYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDTW9udGgoKSAtIHN0YXJ0LmdldFVUQ01vbnRoKCkgKyAoZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgbWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmQucmFuZ2U7XG4gIHZhciBzZWNvbmRzID0gc2Vjb25kLnJhbmdlO1xuICB2YXIgbWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcbiAgdmFyIGhvdXJzID0gaG91ci5yYW5nZTtcbiAgdmFyIGRheXMgPSBkYXkucmFuZ2U7XG4gIHZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9uZGF5cyA9IG1vbmRheS5yYW5nZTtcbiAgdmFyIHR1ZXNkYXlzID0gdHVlc2RheS5yYW5nZTtcbiAgdmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB0aHVyc2RheXMgPSB0aHVyc2RheS5yYW5nZTtcbiAgdmFyIGZyaWRheXMgPSBmcmlkYXkucmFuZ2U7XG4gIHZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcbiAgdmFyIHdlZWtzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9udGhzID0gbW9udGgucmFuZ2U7XG4gIHZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbiAgdmFyIHV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIHZhciB1dGNNaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIHZhciB1dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xuICB2YXIgdXRjTWludXRlcyA9IHV0Y01pbnV0ZS5yYW5nZTtcbiAgdmFyIHV0Y0hvdXJzID0gdXRjSG91ci5yYW5nZTtcbiAgdmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG4gIHZhciB1dGNTdW5kYXlzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9uZGF5cyA9IHV0Y01vbmRheS5yYW5nZTtcbiAgdmFyIHV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheS5yYW5nZTtcbiAgdmFyIHV0Y0ZyaWRheXMgPSB1dGNGcmlkYXkucmFuZ2U7XG4gIHZhciB1dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZWtzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9udGhzID0gdXRjTW9udGgucmFuZ2U7XG4gIHZhciB1dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuMS4xXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZHM7XG4gIGV4cG9ydHMubWludXRlcyA9IG1pbnV0ZXM7XG4gIGV4cG9ydHMuaG91cnMgPSBob3VycztcbiAgZXhwb3J0cy5kYXlzID0gZGF5cztcbiAgZXhwb3J0cy5zdW5kYXlzID0gc3VuZGF5cztcbiAgZXhwb3J0cy5tb25kYXlzID0gbW9uZGF5cztcbiAgZXhwb3J0cy50dWVzZGF5cyA9IHR1ZXNkYXlzO1xuICBleHBvcnRzLndlZG5lc2RheXMgPSB3ZWRuZXNkYXlzO1xuICBleHBvcnRzLnRodXJzZGF5cyA9IHRodXJzZGF5cztcbiAgZXhwb3J0cy5mcmlkYXlzID0gZnJpZGF5cztcbiAgZXhwb3J0cy5zYXR1cmRheXMgPSBzYXR1cmRheXM7XG4gIGV4cG9ydHMud2Vla3MgPSB3ZWVrcztcbiAgZXhwb3J0cy5tb250aHMgPSBtb250aHM7XG4gIGV4cG9ydHMueWVhcnMgPSB5ZWFycztcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZCA9IHV0Y01pbGxpc2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IHV0Y01pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gdXRjU2Vjb25kcztcbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuICBleHBvcnRzLnV0Y0RheXMgPSB1dGNEYXlzO1xuICBleHBvcnRzLnV0Y1N1bmRheXMgPSB1dGNTdW5kYXlzO1xuICBleHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheXM7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuICBleHBvcnRzLnV0Y0ZyaWRheXMgPSB1dGNGcmlkYXlzO1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5cztcbiAgZXhwb3J0cy51dGNXZWVrcyA9IHV0Y1dlZWtzO1xuICBleHBvcnRzLnV0Y01vbnRocyA9IHV0Y01vbnRocztcbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMuc2Vjb25kID0gc2Vjb25kO1xuICBleHBvcnRzLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgZXhwb3J0cy5ob3VyID0gaG91cjtcbiAgZXhwb3J0cy5kYXkgPSBkYXk7XG4gIGV4cG9ydHMuc3VuZGF5ID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbmRheSA9IG1vbmRheTtcbiAgZXhwb3J0cy50dWVzZGF5ID0gdHVlc2RheTtcbiAgZXhwb3J0cy53ZWRuZXNkYXkgPSB3ZWRuZXNkYXk7XG4gIGV4cG9ydHMudGh1cnNkYXkgPSB0aHVyc2RheTtcbiAgZXhwb3J0cy5mcmlkYXkgPSBmcmlkYXk7XG4gIGV4cG9ydHMuc2F0dXJkYXkgPSBzYXR1cmRheTtcbiAgZXhwb3J0cy53ZWVrID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbnRoID0gbW9udGg7XG4gIGV4cG9ydHMueWVhciA9IHllYXI7XG4gIGV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG4gIGV4cG9ydHMudXRjU3VuZGF5ID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbmRheSA9IHV0Y01vbmRheTtcbiAgZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjVHVlc2RheTtcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXkgPSB1dGNXZWRuZXNkYXk7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXkgPSB1dGNUaHVyc2RheTtcbiAgZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNGcmlkYXk7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNTYXR1cmRheTtcbiAgZXhwb3J0cy51dGNXZWVrID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbnRoID0gdXRjTW9udGg7XG4gIGV4cG9ydHMudXRjWWVhciA9IHV0Y1llYXI7XG4gIGV4cG9ydHMuaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcblxufSkpOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHRpbWUgPSByZXF1aXJlKCcuLi90aW1lJyksXG4gICAgRVBTSUxPTiA9IDFlLTE1O1xuXG5mdW5jdGlvbiBiaW5zKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGRldGVybWluZSByYW5nZVxuICB2YXIgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDE1LFxuICAgICAgYmFzZSA9IG9wdC5iYXNlIHx8IDEwLFxuICAgICAgbG9nYiA9IE1hdGgubG9nKGJhc2UpLFxuICAgICAgZGl2ID0gb3B0LmRpdiB8fCBbNSwgMl0sXG4gICAgICBtaW4gPSBvcHQubWluLFxuICAgICAgbWF4ID0gb3B0Lm1heCxcbiAgICAgIHNwYW4gPSBtYXggLSBtaW4sXG4gICAgICBzdGVwLCBsZXZlbCwgbWluc3RlcCwgcHJlY2lzaW9uLCB2LCBpLCBlcHM7XG5cbiAgaWYgKG9wdC5zdGVwKSB7XG4gICAgLy8gaWYgc3RlcCBzaXplIGlzIGV4cGxpY2l0bHkgZ2l2ZW4sIHVzZSB0aGF0XG4gICAgc3RlcCA9IG9wdC5zdGVwO1xuICB9IGVsc2UgaWYgKG9wdC5zdGVwcykge1xuICAgIC8vIGlmIHByb3ZpZGVkLCBsaW1pdCBjaG9pY2UgdG8gYWNjZXB0YWJsZSBzdGVwIHNpemVzXG4gICAgc3RlcCA9IG9wdC5zdGVwc1tNYXRoLm1pbihcbiAgICAgIG9wdC5zdGVwcy5sZW5ndGggLSAxLFxuICAgICAgYmlzZWN0KG9wdC5zdGVwcywgc3Bhbi9tYXhiLCAwLCBvcHQuc3RlcHMubGVuZ3RoKVxuICAgICldO1xuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdXNlIHNwYW4gdG8gZGV0ZXJtaW5lIHN0ZXAgc2l6ZVxuICAgIGxldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nKG1heGIpIC8gbG9nYik7XG4gICAgbWluc3RlcCA9IG9wdC5taW5zdGVwIHx8IDA7XG4gICAgc3RlcCA9IE1hdGgubWF4KFxuICAgICAgbWluc3RlcCxcbiAgICAgIE1hdGgucG93KGJhc2UsIE1hdGgucm91bmQoTWF0aC5sb2coc3BhbikgLyBsb2diKSAtIGxldmVsKVxuICAgICk7XG5cbiAgICAvLyBpbmNyZWFzZSBzdGVwIHNpemUgaWYgdG9vIG1hbnkgYmluc1xuICAgIHdoaWxlIChNYXRoLmNlaWwoc3Bhbi9zdGVwKSA+IG1heGIpIHsgc3RlcCAqPSBiYXNlOyB9XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBkYXRlIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIHVuaXRzID0gb3B0LnV0YyA/IHRpbWUudXRjIDogdGltZSxcbiAgICAgIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBnZW4gPSBtb2R1bGUuZXhwb3J0cztcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluID09PSB1bmRlZmluZWQgPyAxIDogbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPCBtaW4gPyAwIDogeCA+IG1heCA/IDEgOiAoeCAtIG1pbikgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IG1pbiArIHAqZCA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICBiID0gYTtcbiAgICBhID0gMDtcbiAgfVxuICB2YXIgZCA9IGIgLSBhO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihkICogTWF0aC5yYW5kb20oKSk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID09PSBNYXRoLmZsb29yKHgpICYmIHggPj0gYSAmJiB4IDwgYikgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgdiA9IE1hdGguZmxvb3IoeCk7XG4gICAgcmV0dXJuIHYgPCBhID8gMCA6IHYgPj0gYiA/IDEgOiAodiAtIGEgKyAxKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gYSAtIDEgKyBNYXRoLmZsb29yKHAqZCkgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ub3JtYWwgPSBmdW5jdGlvbihtZWFuLCBzdGRldikge1xuICBtZWFuID0gbWVhbiB8fCAwO1xuICBzdGRldiA9IHN0ZGV2IHx8IDE7XG4gIHZhciBuZXh0O1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gMCwgeSA9IDAsIHJkcywgYztcbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4ID0gbmV4dDtcbiAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgZG8ge1xuICAgICAgeCA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgcmRzID0geCp4ICsgeSp5O1xuICAgIH0gd2hpbGUgKHJkcyA9PT0gMCB8fCByZHMgPiAxKTtcbiAgICBjID0gTWF0aC5zcXJ0KC0yKk1hdGgubG9nKHJkcykvcmRzKTsgLy8gQm94LU11bGxlciB0cmFuc2Zvcm1cbiAgICBuZXh0ID0gbWVhbiArIHkqYypzdGRldjtcbiAgICByZXR1cm4gbWVhbiArIHgqYypzdGRldjtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZXhwID0gTWF0aC5leHAoTWF0aC5wb3coeC1tZWFuLCAyKSAvICgtMiAqIE1hdGgucG93KHN0ZGV2LCAyKSkpO1xuICAgIHJldHVybiAoMSAvIChzdGRldiAqIE1hdGguc3FydCgyKk1hdGguUEkpKSkgKiBleHA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gZnJvbSBXZXN0ICgyMDA5KVxuICAgIC8vIEJldHRlciBBcHByb3hpbWF0aW9ucyB0byBDdW11bGF0aXZlIE5vcm1hbCBGdW5jdGlvbnNcbiAgICB2YXIgY2QsXG4gICAgICAgIHogPSAoeCAtIG1lYW4pIC8gc3RkZXYsXG4gICAgICAgIFogPSBNYXRoLmFicyh6KTtcbiAgICBpZiAoWiA+IDM3KSB7XG4gICAgICBjZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdW0sIGV4cCA9IE1hdGguZXhwKC1aKlovMik7XG4gICAgICBpZiAoWiA8IDcuMDcxMDY3ODExODY1NDcpIHtcbiAgICAgICAgc3VtID0gMy41MjYyNDk2NTk5ODkxMWUtMDIgKiBaICsgMC43MDAzODMwNjQ0NDM2ODg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2LjM3Mzk2MjIwMzUzMTY1O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMzMuOTEyODY2MDc4MzgzO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTEyLjA3OTI5MTQ5Nzg3MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMS4yMTM1OTYxNjk5MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjAuMjA2ODY3OTEyMzc2O1xuICAgICAgICBjZCA9IGV4cCAqIHN1bTtcbiAgICAgICAgc3VtID0gOC44Mzg4MzQ3NjQ4MzE4NGUtMDIgKiBaICsgMS43NTU2NjcxNjMxODI2NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDE2LjA2NDE3NzU3OTIwNztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDg2Ljc4MDczMjIwMjk0NjE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyOTYuNTY0MjQ4Nzc5Njc0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNjM3LjMzMzYzMzM3ODgzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDc5My44MjY1MTI1MTk5NDg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA0NDAuNDEzNzM1ODI0NzUyO1xuICAgICAgICBjZCA9IGNkIC8gc3VtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtID0gWiArIDAuNjU7XG4gICAgICAgIHN1bSA9IFogKyA0IC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMyAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDIgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAxIC8gc3VtO1xuICAgICAgICBjZCA9IGV4cCAvIHN1bSAvIDIuNTA2NjI4Mjc0NjMxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geiA+IDAgPyAxIC0gY2QgOiBjZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gb2YgUHJvYml0IGZ1bmN0aW9uIHVzaW5nIGludmVyc2UgZXJyb3IgZnVuY3Rpb24uXG4gICAgaWYgKHAgPD0gMCB8fCBwID49IDEpIHJldHVybiBOYU47XG4gICAgdmFyIHggPSAyKnAgLSAxLFxuICAgICAgICB2ID0gKDggKiAoTWF0aC5QSSAtIDMpKSAvICgzICogTWF0aC5QSSAqICg0LU1hdGguUEkpKSxcbiAgICAgICAgYSA9ICgyIC8gKE1hdGguUEkqdikpICsgKE1hdGgubG9nKDEgLSBNYXRoLnBvdyh4LDIpKSAvIDIpLFxuICAgICAgICBiID0gTWF0aC5sb2coMSAtICh4KngpKSAvIHYsXG4gICAgICAgIHMgPSAoeCA+IDAgPyAxIDogLTEpICogTWF0aC5zcXJ0KE1hdGguc3FydCgoYSphKSAtIGIpIC0gYSk7XG4gICAgcmV0dXJuIG1lYW4gKyBzdGRldiAqIE1hdGguU1FSVDIgKiBzO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uYm9vdHN0cmFwID0gZnVuY3Rpb24oZG9tYWluLCBzbW9vdGgpIHtcbiAgLy8gR2VuZXJhdGVzIGEgYm9vdHN0cmFwIHNhbXBsZSBmcm9tIGEgc2V0IG9mIG9ic2VydmF0aW9ucy5cbiAgLy8gU21vb3RoIGJvb3RzdHJhcHBpbmcgYWRkcyByYW5kb20gemVyby1jZW50ZXJlZCBub2lzZSB0byB0aGUgc2FtcGxlcy5cbiAgdmFyIHZhbCA9IGRvbWFpbi5maWx0ZXIodXRpbC5pc1ZhbGlkKSxcbiAgICAgIGxlbiA9IHZhbC5sZW5ndGgsXG4gICAgICBlcnIgPSBzbW9vdGggPyBnZW4ucmFuZG9tLm5vcm1hbCgwLCBzbW9vdGgpIDogbnVsbDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsW35+KE1hdGgucmFuZG9tKCkqbGVuKV0gKyAoZXJyID8gZXJyKCkgOiAwKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIGQzX3RpbWUgPSByZXF1aXJlKCdkMy10aW1lJyk7XG5cbnZhciB0ZW1wRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgYmFzZURhdGUgPSBuZXcgRGF0ZSgwLCAwLCAxKS5zZXRGdWxsWWVhcigwKSwgLy8gSmFuIDEsIDAgQURcbiAgICB1dGNCYXNlRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDAsIDAsIDEpKS5zZXRVVENGdWxsWWVhcigwKTtcblxuZnVuY3Rpb24gZGF0ZShkKSB7XG4gIHJldHVybiAodGVtcERhdGUuc2V0VGltZSgrZCksIHRlbXBEYXRlKTtcbn1cblxuLy8gY3JlYXRlIGEgdGltZSB1bml0IGVudHJ5XG5mdW5jdGlvbiBlbnRyeSh0eXBlLCBkYXRlLCB1bml0LCBzdGVwLCBtaW4sIG1heCkge1xuICB2YXIgZSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGU6IGRhdGUsXG4gICAgdW5pdDogdW5pdFxuICB9O1xuICBpZiAoc3RlcCkge1xuICAgIGUuc3RlcCA9IHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgZS5taW5zdGVwID0gMTtcbiAgfVxuICBpZiAobWluICE9IG51bGwpIGUubWluID0gbWluO1xuICBpZiAobWF4ICE9IG51bGwpIGUubWF4ID0gbWF4O1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIHVuaXQsIGJhc2UsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBlbnRyeSh0eXBlLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQub2Zmc2V0KGJhc2UsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQuY291bnQoYmFzZSwgZCk7IH0sXG4gICAgc3RlcCwgbWluLCBtYXgpO1xufVxuXG52YXIgbG9jYWxlID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUuc2Vjb25kLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS5taW51dGUsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLmhvdXIsICAgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUuZGF5LCAgICBiYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLm1vbnRoLCAgYmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS55ZWFyLCAgIGJhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgNCtkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgZCAlIDEyLCAxKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgdXRjID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUudXRjU2Vjb25kLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS51dGNNaW51dGUsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLnV0Y0hvdXIsICAgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUudXRjRGF5LCAgICB1dGNCYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLnV0Y01vbnRoLCAgdXRjQmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS51dGNZZWFyLCAgIHV0Y0Jhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDU2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgNCtkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCBkICUgMTIsIDEpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgU1RFUFMgPSBbXG4gIFszMTUzNmU2LCA1XSwgIC8vIDEteWVhclxuICBbNzc3NmU2LCA0XSwgICAvLyAzLW1vbnRoXG4gIFsyNTkyZTYsIDRdLCAgIC8vIDEtbW9udGhcbiAgWzEyMDk2ZTUsIDNdLCAgLy8gMi13ZWVrXG4gIFs2MDQ4ZTUsIDNdLCAgIC8vIDEtd2Vla1xuICBbMTcyOGU1LCAzXSwgICAvLyAyLWRheVxuICBbODY0ZTUsIDNdLCAgICAvLyAxLWRheVxuICBbNDMyZTUsIDJdLCAgICAvLyAxMi1ob3VyXG4gIFsyMTZlNSwgMl0sICAgIC8vIDYtaG91clxuICBbMTA4ZTUsIDJdLCAgICAvLyAzLWhvdXJcbiAgWzM2ZTUsIDJdLCAgICAgLy8gMS1ob3VyXG4gIFsxOGU1LCAxXSwgICAgIC8vIDMwLW1pbnV0ZVxuICBbOWU1LCAxXSwgICAgICAvLyAxNS1taW51dGVcbiAgWzNlNSwgMV0sICAgICAgLy8gNS1taW51dGVcbiAgWzZlNCwgMV0sICAgICAgLy8gMS1taW51dGVcbiAgWzNlNCwgMF0sICAgICAgLy8gMzAtc2Vjb25kXG4gIFsxNWUzLCAwXSwgICAgIC8vIDE1LXNlY29uZFxuICBbNWUzLCAwXSwgICAgICAvLyA1LXNlY29uZFxuICBbMWUzLCAwXSAgICAgICAvLyAxLXNlY29uZFxuXTtcblxuZnVuY3Rpb24gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yikge1xuICB2YXIgc3RlcCA9IFNURVBTWzBdLCBpLCBuLCBiaW5zO1xuXG4gIGZvciAoaT0xLCBuPVNURVBTLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdGVwID0gU1RFUFNbaV07XG4gICAgaWYgKHNwYW4gPiBzdGVwWzBdKSB7XG4gICAgICBiaW5zID0gc3BhbiAvIHN0ZXBbMF07XG4gICAgICBpZiAoYmlucyA+IG1heGIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW1NURVBTW2ktMV1bMV1dO1xuICAgICAgfVxuICAgICAgaWYgKGJpbnMgPj0gbWluYikge1xuICAgICAgICByZXR1cm4gdW5pdHNbc3RlcFsxXV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bml0c1tTVEVQU1tuLTFdWzFdXTtcbn1cblxuZnVuY3Rpb24gdG9Vbml0TWFwKHVuaXRzKSB7XG4gIHZhciBtYXAgPSB7fSwgaSwgbjtcbiAgZm9yIChpPTAsIG49dW5pdHMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIG1hcFt1bml0c1tpXS50eXBlXSA9IHVuaXRzW2ldO1xuICB9XG4gIG1hcC5maW5kID0gZnVuY3Rpb24oc3BhbiwgbWluYiwgbWF4Yikge1xuICAgIHJldHVybiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKTtcbiAgfTtcbiAgcmV0dXJuIG1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1VuaXRNYXAobG9jYWxlKTtcbm1vZHVsZS5leHBvcnRzLnV0YyA9IHRvVW5pdE1hcCh1dGMpOyIsInZhciB1ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Lmxlbmd0aCAhPSBudWxsID8geC5sZW5ndGggOiBudWxsO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCwgZikge1xuICByZXR1cm4gKGYgPSB1LiQoZikpID9cbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbZih4KV0gPSAxLCBvYmopOyB9LCB7fSkgOlxuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialt4XSA9IDEsIG9iaik7IH0sIHt9KTtcbn07XG5cbnUua2V5c3RyID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIC8vIHVzZSB0byBlbnN1cmUgY29uc2lzdGVudCBrZXkgZ2VuZXJhdGlvbiBhY3Jvc3MgbW9kdWxlc1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGlmICghbikgcmV0dXJuICcnO1xuICBmb3IgKHZhciBzPVN0cmluZyh2YWx1ZXNbMF0pLCBpPTE7IGk8bjsgKytpKSB7XG4gICAgcyArPSAnfCcgKyBTdHJpbmcodmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbi8vIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnUuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG51LmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnUuaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbnUuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG51LmlzTnVtYmVyID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxudS5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG51LmlzRGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG51LmlzVmFsaWQgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqO1xufTtcblxudS5pc0J1ZmZlciA9ICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIEJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbi8vIHBhcnNlIGEgZGF0ZSB3aXRoIG9wdGlvbmFsIGQzLnRpbWUtZm9ybWF0IGZvcm1hdFxudS5kYXRlID0gZnVuY3Rpb24ocywgZm9ybWF0KSB7XG4gIHZhciBkID0gZm9ybWF0ID8gZm9ybWF0IDogRGF0ZTtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBkLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgfHwgdS5pc1N0cmluZyh4KSA/XG4gICAgICAvLyBPdXRwdXQgdmFsaWQgSlNPTiBhbmQgSlMgc291cmNlIHN0cmluZ3MuXG4gICAgICAvLyBTZWUgaHR0cDovL3RpbWVsZXNzcmVwby5jb20vanNvbi1pc250LWEtamF2YXNjcmlwdC1zdWJzZXRcbiAgICAgIEpTT04uc3RyaW5naWZ5KHgpLnJlcGxhY2UoJ1xcdTIwMjgnLCdcXFxcdTIwMjgnKS5yZXBsYWNlKCdcXHUyMDI5JywgJ1xcXFx1MjAyOScpXG4gICAgOiB4O1xufTtcblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnZhciBmaWVsZF9yZSA9IC9cXFsoLio/KVxcXXxbXi5cXFtdKy9nO1xuXG51LmZpZWxkID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gU3RyaW5nKGYpLm1hdGNoKGZpZWxkX3JlKS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkWzBdICE9PSAnWycgPyBkIDpcbiAgICAgIGRbMV0gIT09IFwiJ1wiICYmIGRbMV0gIT09ICdcIicgPyBkLnNsaWNlKDEsIC0xKSA6XG4gICAgICBkLnNsaWNlKDIsIC0yKS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCAnJDEnKTtcbiAgfSk7XG59O1xuXG51LmFjY2Vzc29yID0gZnVuY3Rpb24oZikge1xuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gZj09bnVsbCB8fCB1LmlzRnVuY3Rpb24oZikgPyBmIDpcbiAgICB1Lm5hbWVkZnVuYyhmLCBGdW5jdGlvbigneCcsICdyZXR1cm4geFsnICsgdS5maWVsZChmKS5tYXAodS5zdHIpLmpvaW4oJ11bJykgKyAnXTsnKSk7XG59O1xuXG4vLyBzaG9ydC1jdXQgZm9yIGFjY2Vzc29yXG51LiQgPSB1LmFjY2Vzc29yO1xuXG51Lm11dGF0b3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gdS5pc1N0cmluZyhmKSAmJiAocz11LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICBmdW5jdGlvbih4LCB2KSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8cy5sZW5ndGgtMTsgKytpKSB4ID0geFtzW2ldXTtcbiAgICAgIHhbc1tpXV0gPSB2O1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHgsIHYpIHsgeFtmXSA9IHY7IH07XG59O1xuXG5cbnUuJGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24oZikge1xuICAgIGYgPSB1LiQoZikgfHwgdS5pZGVudGl0eTtcbiAgICB2YXIgbiA9IG5hbWUgKyAodS5uYW1lKGYpID8gJ18nK3UubmFtZShmKSA6ICcnKTtcbiAgICByZXR1cm4gdS5uYW1lZGZ1bmMobiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gb3AoZihkKSk7IH0pO1xuICB9O1xufTtcblxudS4kdmFsaWQgID0gdS4kZnVuYygndmFsaWQnLCB1LmlzVmFsaWQpO1xudS4kbGVuZ3RoID0gdS4kZnVuYygnbGVuZ3RoJywgdS5sZW5ndGgpO1xuXG51LiRpbiA9IGZ1bmN0aW9uKGYsIHZhbHVlcykge1xuICBmID0gdS4kKGYpO1xuICB2YXIgbWFwID0gdS5pc0FycmF5KHZhbHVlcykgPyB1LnRvTWFwKHZhbHVlcykgOiB2YWx1ZXM7XG4gIHJldHVybiBmdW5jdGlvbihkKSB7IHJldHVybiAhIW1hcFtmKGQpXTsgfTtcbn07XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLGIpIHtcbiAgICB2YXIgaSwgbiwgZiwgeCwgeTtcbiAgICBmb3IgKGk9MCwgbj1zb3J0Lmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGYgPSBzb3J0W2ldOyB4ID0gZihhKTsgeSA9IGYoYik7XG4gICAgICBpZiAoeCA8IHkpIHJldHVybiAtMSAqIHNpZ25baV07XG4gICAgICBpZiAoeCA+IHkpIHJldHVybiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChhID49IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChhID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gTmFOO1xufTtcblxudS5udW1jbXAgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcblxudS5zdGFibGVzb3J0ID0gZnVuY3Rpb24oYXJyYXksIHNvcnRCeSwga2V5Rm4pIHtcbiAgdmFyIGluZGljZXMgPSBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oaWR4LCB2LCBpKSB7XG4gICAgcmV0dXJuIChpZHhba2V5Rm4odildID0gaSwgaWR4KTtcbiAgfSwge30pO1xuXG4gIGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzYSA9IHNvcnRCeShhKSxcbiAgICAgICAgc2IgPSBzb3J0QnkoYik7XG4gICAgcmV0dXJuIHNhIDwgc2IgPyAtMSA6IHNhID4gc2IgPyAxXG4gICAgICAgICA6IChpbmRpY2VzW2tleUZuKGEpXSAtIGluZGljZXNba2V5Rm4oYildKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4vLyBzdHJpbmcgZnVuY3Rpb25zXG5cbnUucGFkID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHBhZGNoYXIpIHtcbiAgcGFkY2hhciA9IHBhZGNoYXIgfHwgXCIgXCI7XG4gIHZhciBkID0gbGVuZ3RoIC0gcy5sZW5ndGg7XG4gIGlmIChkIDw9IDApIHJldHVybiBzO1xuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIHN0cnJlcChkLCBwYWRjaGFyKSArIHM7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIHN0cnJlcChNYXRoLmZsb29yKGQvMiksIHBhZGNoYXIpICtcbiAgICAgICAgIHMgKyBzdHJyZXAoTWF0aC5jZWlsKGQvMiksIHBhZGNoYXIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcyArIHN0cnJlcChkLCBwYWRjaGFyKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RycmVwKG4sIHN0cikge1xuICB2YXIgcyA9IFwiXCIsIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgcyArPSBzdHI7XG4gIHJldHVybiBzO1xufVxuXG51LnRydW5jYXRlID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHdvcmQsIGVsbGlwc2lzKSB7XG4gIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgaWYgKGxlbiA8PSBsZW5ndGgpIHJldHVybiBzO1xuICBlbGxpcHNpcyA9IGVsbGlwc2lzICE9PSB1bmRlZmluZWQgPyBTdHJpbmcoZWxsaXBzaXMpIDogJ1xcdTIwMjYnO1xuICB2YXIgbCA9IE1hdGgubWF4KDAsIGxlbmd0aCAtIGVsbGlwc2lzLmxlbmd0aCk7XG5cbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsLDEpIDogcy5zbGljZShsZW4tbCkpO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHZhciBsMSA9IE1hdGguY2VpbChsLzIpLCBsMiA9IE1hdGguZmxvb3IobC8yKTtcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDEpIDogcy5zbGljZSgwLGwxKSkgK1xuICAgICAgICBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMiwxKSA6IHMuc2xpY2UobGVuLWwyKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCkgOiBzLnNsaWNlKDAsbCkpICsgZWxsaXBzaXM7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHRydW5jYXRlT25Xb3JkKHMsIGxlbiwgcmV2KSB7XG4gIHZhciBjbnQgPSAwLCB0b2sgPSBzLnNwbGl0KHRydW5jYXRlX3dvcmRfcmUpO1xuICBpZiAocmV2KSB7XG4gICAgcyA9ICh0b2sgPSB0b2sucmV2ZXJzZSgpKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pXG4gICAgICAucmV2ZXJzZSgpO1xuICB9IGVsc2Uge1xuICAgIHMgPSB0b2suZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSk7XG4gIH1cbiAgcmV0dXJuIHMubGVuZ3RoID8gcy5qb2luKCcnKS50cmltKCkgOiB0b2tbMF0uc2xpY2UoMCwgbGVuKTtcbn1cblxudmFyIHRydW5jYXRlX3dvcmRfcmUgPSAvKFtcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MjAyOFxcdTIwMjlcXHUzMDAwXFx1RkVGRl0pLztcbiIsInZhciBqc29uID0gdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnID8gSlNPTiA6IHJlcXVpcmUoJ2pzb25pZnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSBvcHRzID0geyBjbXA6IG9wdHMgfTtcbiAgICB2YXIgc3BhY2UgPSBvcHRzLnNwYWNlIHx8ICcnO1xuICAgIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdudW1iZXInKSBzcGFjZSA9IEFycmF5KHNwYWNlKzEpLmpvaW4oJyAnKTtcbiAgICB2YXIgY3ljbGVzID0gKHR5cGVvZiBvcHRzLmN5Y2xlcyA9PT0gJ2Jvb2xlYW4nKSA/IG9wdHMuY3ljbGVzIDogZmFsc2U7XG4gICAgdmFyIHJlcGxhY2VyID0gb3B0cy5yZXBsYWNlciB8fCBmdW5jdGlvbihrZXksIHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuICAgIHZhciBjbXAgPSBvcHRzLmNtcCAmJiAoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW9iaiA9IHsga2V5OiBhLCB2YWx1ZTogbm9kZVthXSB9O1xuICAgICAgICAgICAgICAgIHZhciBib2JqID0geyBrZXk6IGIsIHZhbHVlOiBub2RlW2JdIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYoYW9iaiwgYm9iaik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0pKG9wdHMuY21wKTtcblxuICAgIHZhciBzZWVuID0gW107XG4gICAgcmV0dXJuIChmdW5jdGlvbiBzdHJpbmdpZnkgKHBhcmVudCwga2V5LCBub2RlLCBsZXZlbCkge1xuICAgICAgICB2YXIgaW5kZW50ID0gc3BhY2UgPyAoJ1xcbicgKyBuZXcgQXJyYXkobGV2ZWwgKyAxKS5qb2luKHNwYWNlKSkgOiAnJztcbiAgICAgICAgdmFyIGNvbG9uU2VwYXJhdG9yID0gc3BhY2UgPyAnOiAnIDogJzonO1xuXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUudG9KU09OICYmIHR5cGVvZiBub2RlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUudG9KU09OKCk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gcmVwbGFjZXIuY2FsbChwYXJlbnQsIGtleSwgbm9kZSk7XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcgfHwgbm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb24uc3RyaW5naWZ5KG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHN0cmluZ2lmeShub2RlLCBpLCBub2RlW2ldLCBsZXZlbCsxKSB8fCBqc29uLnN0cmluZ2lmeShudWxsKTtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChpbmRlbnQgKyBzcGFjZSArIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdbJyArIG91dC5qb2luKCcsJykgKyBpbmRlbnQgKyAnXSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2Vlbi5pbmRleE9mKG5vZGUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChjeWNsZXMpIHJldHVybiBqc29uLnN0cmluZ2lmeSgnX19jeWNsZV9fJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSlNPTicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBzZWVuLnB1c2gobm9kZSk7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gb2JqZWN0S2V5cyhub2RlKS5zb3J0KGNtcCAmJiBjbXAobm9kZSkpO1xuICAgICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc3RyaW5naWZ5KG5vZGUsIGtleSwgbm9kZVtrZXldLCBsZXZlbCsxKTtcblxuICAgICAgICAgICAgICAgIGlmKCF2YWx1ZSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBqc29uLnN0cmluZ2lmeShrZXkpXG4gICAgICAgICAgICAgICAgICAgICsgY29sb25TZXBhcmF0b3JcbiAgICAgICAgICAgICAgICAgICAgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goaW5kZW50ICsgc3BhY2UgKyBrZXlWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWVuLnNwbGljZShzZWVuLmluZGV4T2Yobm9kZSksIDEpO1xuICAgICAgICAgICAgcmV0dXJuICd7JyArIG91dC5qb2luKCcsJykgKyBpbmRlbnQgKyAnfSc7XG4gICAgICAgIH1cbiAgICB9KSh7ICcnOiBvYmogfSwgJycsIG9iaiwgMCk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWUgfTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufTtcbiIsImV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpO1xuZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2xpYi9zdHJpbmdpZnknKTtcbiIsInZhciBhdCwgLy8gVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGNoYXJhY3RlclxuICAgIGNoLCAvLyBUaGUgY3VycmVudCBjaGFyYWN0ZXJcbiAgICBlc2NhcGVlID0ge1xuICAgICAgICAnXCInOiAgJ1wiJyxcbiAgICAgICAgJ1xcXFwnOiAnXFxcXCcsXG4gICAgICAgICcvJzogICcvJyxcbiAgICAgICAgYjogICAgJ1xcYicsXG4gICAgICAgIGY6ICAgICdcXGYnLFxuICAgICAgICBuOiAgICAnXFxuJyxcbiAgICAgICAgcjogICAgJ1xccicsXG4gICAgICAgIHQ6ICAgICdcXHQnXG4gICAgfSxcbiAgICB0ZXh0LFxuXG4gICAgZXJyb3IgPSBmdW5jdGlvbiAobSkge1xuICAgICAgICAvLyBDYWxsIGVycm9yIHdoZW4gc29tZXRoaW5nIGlzIHdyb25nLlxuICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBuYW1lOiAgICAnU3ludGF4RXJyb3InLFxuICAgICAgICAgICAgbWVzc2FnZTogbSxcbiAgICAgICAgICAgIGF0OiAgICAgIGF0LFxuICAgICAgICAgICAgdGV4dDogICAgdGV4dFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgXG4gICAgbmV4dCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIC8vIElmIGEgYyBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQsIHZlcmlmeSB0aGF0IGl0IG1hdGNoZXMgdGhlIGN1cnJlbnQgY2hhcmFjdGVyLlxuICAgICAgICBpZiAoYyAmJiBjICE9PSBjaCkge1xuICAgICAgICAgICAgZXJyb3IoXCJFeHBlY3RlZCAnXCIgKyBjICsgXCInIGluc3RlYWQgb2YgJ1wiICsgY2ggKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEdldCB0aGUgbmV4dCBjaGFyYWN0ZXIuIFdoZW4gdGhlcmUgYXJlIG5vIG1vcmUgY2hhcmFjdGVycyxcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBlbXB0eSBzdHJpbmcuXG4gICAgICAgIFxuICAgICAgICBjaCA9IHRleHQuY2hhckF0KGF0KTtcbiAgICAgICAgYXQgKz0gMTtcbiAgICAgICAgcmV0dXJuIGNoO1xuICAgIH0sXG4gICAgXG4gICAgbnVtYmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBQYXJzZSBhIG51bWJlciB2YWx1ZS5cbiAgICAgICAgdmFyIG51bWJlcixcbiAgICAgICAgICAgIHN0cmluZyA9ICcnO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNoID09PSAnLScpIHtcbiAgICAgICAgICAgIHN0cmluZyA9ICctJztcbiAgICAgICAgICAgIG5leHQoJy0nKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaCA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gJy4nO1xuICAgICAgICAgICAgd2hpbGUgKG5leHQoKSAmJiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaCA9PT0gJ2UnIHx8IGNoID09PSAnRScpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG51bWJlciA9ICtzdHJpbmc7XG4gICAgICAgIGlmICghaXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgICAgICAgZXJyb3IoXCJCYWQgbnVtYmVyXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgc3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBQYXJzZSBhIHN0cmluZyB2YWx1ZS5cbiAgICAgICAgdmFyIGhleCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIHVmZmZmO1xuICAgICAgICBcbiAgICAgICAgLy8gV2hlbiBwYXJzaW5nIGZvciBzdHJpbmcgdmFsdWVzLCB3ZSBtdXN0IGxvb2sgZm9yIFwiIGFuZCBcXCBjaGFyYWN0ZXJzLlxuICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ3UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4ID0gcGFyc2VJbnQobmV4dCgpLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShoZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZmZmZiA9IHVmZmZmICogMTYgKyBoZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh1ZmZmZik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVzY2FwZWVbY2hdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGVzY2FwZWVbY2hdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiQmFkIHN0cmluZ1wiKTtcbiAgICB9LFxuXG4gICAgd2hpdGUgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFNraXAgd2hpdGVzcGFjZS5cblxuICAgICAgICB3aGlsZSAoY2ggJiYgY2ggPD0gJyAnKSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgd29yZCA9IGZ1bmN0aW9uICgpIHtcblxuLy8gdHJ1ZSwgZmFsc2UsIG9yIG51bGwuXG5cbiAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgIG5leHQoJ3QnKTtcbiAgICAgICAgICAgIG5leHQoJ3InKTtcbiAgICAgICAgICAgIG5leHQoJ3UnKTtcbiAgICAgICAgICAgIG5leHQoJ2UnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgIG5leHQoJ2YnKTtcbiAgICAgICAgICAgIG5leHQoJ2EnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIG5leHQoJ3MnKTtcbiAgICAgICAgICAgIG5leHQoJ2UnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY2FzZSAnbic6XG4gICAgICAgICAgICBuZXh0KCduJyk7XG4gICAgICAgICAgICBuZXh0KCd1Jyk7XG4gICAgICAgICAgICBuZXh0KCdsJyk7XG4gICAgICAgICAgICBuZXh0KCdsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIlVuZXhwZWN0ZWQgJ1wiICsgY2ggKyBcIidcIik7XG4gICAgfSxcblxuICAgIHZhbHVlLCAgLy8gUGxhY2UgaG9sZGVyIGZvciB0aGUgdmFsdWUgZnVuY3Rpb24uXG5cbiAgICBhcnJheSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUGFyc2UgYW4gYXJyYXkgdmFsdWUuXG5cbiAgICAgICAgdmFyIGFycmF5ID0gW107XG5cbiAgICAgICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgICAgICAgIG5leHQoJ1snKTtcbiAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICddJykge1xuICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7ICAgLy8gZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2godmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICddJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCddJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgYXJyYXlcIik7XG4gICAgfSxcblxuICAgIG9iamVjdCA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUGFyc2UgYW4gb2JqZWN0IHZhbHVlLlxuXG4gICAgICAgIHZhciBrZXksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcblxuICAgICAgICBpZiAoY2ggPT09ICd7Jykge1xuICAgICAgICAgICAgbmV4dCgneycpO1xuICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgnfScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7ICAgLy8gZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2gpIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBzdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIG5leHQoJzonKTtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yKCdEdXBsaWNhdGUga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlKCk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd9Jykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoJywnKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiQmFkIG9iamVjdFwiKTtcbiAgICB9O1xuXG52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUGFyc2UgYSBKU09OIHZhbHVlLiBJdCBjb3VsZCBiZSBhbiBvYmplY3QsIGFuIGFycmF5LCBhIHN0cmluZywgYSBudW1iZXIsXG4vLyBvciBhIHdvcmQuXG5cbiAgICB3aGl0ZSgpO1xuICAgIHN3aXRjaCAoY2gpIHtcbiAgICBjYXNlICd7JzpcbiAgICAgICAgcmV0dXJuIG9iamVjdCgpO1xuICAgIGNhc2UgJ1snOlxuICAgICAgICByZXR1cm4gYXJyYXkoKTtcbiAgICBjYXNlICdcIic6XG4gICAgICAgIHJldHVybiBzdHJpbmcoKTtcbiAgICBjYXNlICctJzpcbiAgICAgICAgcmV0dXJuIG51bWJlcigpO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjaCA+PSAnMCcgJiYgY2ggPD0gJzknID8gbnVtYmVyKCkgOiB3b3JkKCk7XG4gICAgfVxufTtcblxuLy8gUmV0dXJuIHRoZSBqc29uX3BhcnNlIGZ1bmN0aW9uLiBJdCB3aWxsIGhhdmUgYWNjZXNzIHRvIGFsbCBvZiB0aGUgYWJvdmVcbi8vIGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzb3VyY2UsIHJldml2ZXIpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIFxuICAgIHRleHQgPSBzb3VyY2U7XG4gICAgYXQgPSAwO1xuICAgIGNoID0gJyAnO1xuICAgIHJlc3VsdCA9IHZhbHVlKCk7XG4gICAgd2hpdGUoKTtcbiAgICBpZiAoY2gpIHtcbiAgICAgICAgZXJyb3IoXCJTeW50YXggZXJyb3JcIik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSByZXZpdmVyIGZ1bmN0aW9uLCB3ZSByZWN1cnNpdmVseSB3YWxrIHRoZSBuZXcgc3RydWN0dXJlLFxuICAgIC8vIHBhc3NpbmcgZWFjaCBuYW1lL3ZhbHVlIHBhaXIgdG8gdGhlIHJldml2ZXIgZnVuY3Rpb24gZm9yIHBvc3NpYmxlXG4gICAgLy8gdHJhbnNmb3JtYXRpb24sIHN0YXJ0aW5nIHdpdGggYSB0ZW1wb3Jhcnkgcm9vdCBvYmplY3QgdGhhdCBob2xkcyB0aGUgcmVzdWx0XG4gICAgLy8gaW4gYW4gZW1wdHkga2V5LiBJZiB0aGVyZSBpcyBub3QgYSByZXZpdmVyIGZ1bmN0aW9uLCB3ZSBzaW1wbHkgcmV0dXJuIHRoZVxuICAgIC8vIHJlc3VsdC5cblxuICAgIHJldHVybiB0eXBlb2YgcmV2aXZlciA9PT0gJ2Z1bmN0aW9uJyA/IChmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XG4gICAgICAgIHZhciBrLCB2LCB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsdWUsIGspO1xuICAgICAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdmFsdWVba107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgIH0oeycnOiByZXN1bHR9LCAnJykpIDogcmVzdWx0O1xufTtcbiIsInZhciBjeCA9IC9bXFx1MDAwMFxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgIGVzY2FwYWJsZSA9IC9bXFxcXFxcXCJcXHgwMC1cXHgxZlxceDdmLVxceDlmXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZ2FwLFxuICAgIGluZGVudCxcbiAgICBtZXRhID0geyAgICAvLyB0YWJsZSBvZiBjaGFyYWN0ZXIgc3Vic3RpdHV0aW9uc1xuICAgICAgICAnXFxiJzogJ1xcXFxiJyxcbiAgICAgICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgICAgICdcXG4nOiAnXFxcXG4nLFxuICAgICAgICAnXFxmJzogJ1xcXFxmJyxcbiAgICAgICAgJ1xccic6ICdcXFxccicsXG4gICAgICAgICdcIicgOiAnXFxcXFwiJyxcbiAgICAgICAgJ1xcXFwnOiAnXFxcXFxcXFwnXG4gICAgfSxcbiAgICByZXA7XG5cbmZ1bmN0aW9uIHF1b3RlKHN0cmluZykge1xuICAgIC8vIElmIHRoZSBzdHJpbmcgY29udGFpbnMgbm8gY29udHJvbCBjaGFyYWN0ZXJzLCBubyBxdW90ZSBjaGFyYWN0ZXJzLCBhbmQgbm9cbiAgICAvLyBiYWNrc2xhc2ggY2hhcmFjdGVycywgdGhlbiB3ZSBjYW4gc2FmZWx5IHNsYXAgc29tZSBxdW90ZXMgYXJvdW5kIGl0LlxuICAgIC8vIE90aGVyd2lzZSB3ZSBtdXN0IGFsc28gcmVwbGFjZSB0aGUgb2ZmZW5kaW5nIGNoYXJhY3RlcnMgd2l0aCBzYWZlIGVzY2FwZVxuICAgIC8vIHNlcXVlbmNlcy5cbiAgICBcbiAgICBlc2NhcGFibGUubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gZXNjYXBhYmxlLnRlc3Qoc3RyaW5nKSA/ICdcIicgKyBzdHJpbmcucmVwbGFjZShlc2NhcGFibGUsIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHZhciBjID0gbWV0YVthXTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjID09PSAnc3RyaW5nJyA/IGMgOlxuICAgICAgICAgICAgJ1xcXFx1JyArICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgfSkgKyAnXCInIDogJ1wiJyArIHN0cmluZyArICdcIic7XG59XG5cbmZ1bmN0aW9uIHN0cihrZXksIGhvbGRlcikge1xuICAgIC8vIFByb2R1Y2UgYSBzdHJpbmcgZnJvbSBob2xkZXJba2V5XS5cbiAgICB2YXIgaSwgICAgICAgICAgLy8gVGhlIGxvb3AgY291bnRlci5cbiAgICAgICAgaywgICAgICAgICAgLy8gVGhlIG1lbWJlciBrZXkuXG4gICAgICAgIHYsICAgICAgICAgIC8vIFRoZSBtZW1iZXIgdmFsdWUuXG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgbWluZCA9IGdhcCxcbiAgICAgICAgcGFydGlhbCxcbiAgICAgICAgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICBcbiAgICAvLyBJZiB0aGUgdmFsdWUgaGFzIGEgdG9KU09OIG1ldGhvZCwgY2FsbCBpdCB0byBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihrZXkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBJZiB3ZSB3ZXJlIGNhbGxlZCB3aXRoIGEgcmVwbGFjZXIgZnVuY3Rpb24sIHRoZW4gY2FsbCB0aGUgcmVwbGFjZXIgdG9cbiAgICAvLyBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cbiAgICBpZiAodHlwZW9mIHJlcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWx1ZSA9IHJlcC5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIC8vIFdoYXQgaGFwcGVucyBuZXh0IGRlcGVuZHMgb24gdGhlIHZhbHVlJ3MgdHlwZS5cbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHF1b3RlKHZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIEVuY29kZSBub24tZmluaXRlIG51bWJlcnMgYXMgbnVsbC5cbiAgICAgICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogJ251bGwnO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiBvciBudWxsLCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nLiBOb3RlOlxuICAgICAgICAgICAgLy8gdHlwZW9mIG51bGwgZG9lcyBub3QgcHJvZHVjZSAnbnVsbCcuIFRoZSBjYXNlIGlzIGluY2x1ZGVkIGhlcmUgaW5cbiAgICAgICAgICAgIC8vIHRoZSByZW1vdGUgY2hhbmNlIHRoYXQgdGhpcyBnZXRzIGZpeGVkIHNvbWVkYXkuXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuICdudWxsJztcbiAgICAgICAgICAgIGdhcCArPSBpbmRlbnQ7XG4gICAgICAgICAgICBwYXJ0aWFsID0gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGlhbFtpXSA9IHN0cihpLCB2YWx1ZSkgfHwgJ251bGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBKb2luIGFsbCBvZiB0aGUgZWxlbWVudHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcywgYW5kXG4gICAgICAgICAgICAgICAgLy8gd3JhcCB0aGVtIGluIGJyYWNrZXRzLlxuICAgICAgICAgICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICdbXScgOiBnYXAgP1xuICAgICAgICAgICAgICAgICAgICAnW1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICddJyA6XG4gICAgICAgICAgICAgICAgICAgICdbJyArIHBhcnRpYWwuam9pbignLCcpICsgJ10nO1xuICAgICAgICAgICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIHRoZSByZXBsYWNlciBpcyBhbiBhcnJheSwgdXNlIGl0IHRvIHNlbGVjdCB0aGUgbWVtYmVycyB0byBiZVxuICAgICAgICAgICAgLy8gc3RyaW5naWZpZWQuXG4gICAgICAgICAgICBpZiAocmVwICYmIHR5cGVvZiByZXAgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcmVwLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IHJlcFtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBpdGVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBrZXlzIGluIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gSm9pbiBhbGwgb2YgdGhlIG1lbWJlciB0ZXh0cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLFxuICAgICAgICAvLyBhbmQgd3JhcCB0aGVtIGluIGJyYWNlcy5cblxuICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAne30nIDogZ2FwID9cbiAgICAgICAgICAgICd7XFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ30nIDpcbiAgICAgICAgICAgICd7JyArIHBhcnRpYWwuam9pbignLCcpICsgJ30nO1xuICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICB2YXIgaTtcbiAgICBnYXAgPSAnJztcbiAgICBpbmRlbnQgPSAnJztcbiAgICBcbiAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCBtYWtlIGFuIGluZGVudCBzdHJpbmcgY29udGFpbmluZyB0aGF0XG4gICAgLy8gbWFueSBzcGFjZXMuXG4gICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNwYWNlOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluZGVudCArPSAnICc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB1c2VkIGFzIHRoZSBpbmRlbnQgc3RyaW5nLlxuICAgIGVsc2UgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW5kZW50ID0gc3BhY2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSByZXBsYWNlciwgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uIG9yIGFuIGFycmF5LlxuICAgIC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3IuXG4gICAgcmVwID0gcmVwbGFjZXI7XG4gICAgaWYgKHJlcGxhY2VyICYmIHR5cGVvZiByZXBsYWNlciAhPT0gJ2Z1bmN0aW9uJ1xuICAgICYmICh0eXBlb2YgcmVwbGFjZXIgIT09ICdvYmplY3QnIHx8IHR5cGVvZiByZXBsYWNlci5sZW5ndGggIT09ICdudW1iZXInKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT04uc3RyaW5naWZ5Jyk7XG4gICAgfVxuICAgIFxuICAgIC8vIE1ha2UgYSBmYWtlIHJvb3Qgb2JqZWN0IGNvbnRhaW5pbmcgb3VyIHZhbHVlIHVuZGVyIHRoZSBrZXkgb2YgJycuXG4gICAgLy8gUmV0dXJuIHRoZSByZXN1bHQgb2Ygc3RyaW5naWZ5aW5nIHRoZSB2YWx1ZS5cbiAgICByZXR1cm4gc3RyKCcnLCB7Jyc6IHZhbHVlfSk7XG59O1xuIiwiXG5leHBvcnQgZW51bSBBZ2dyZWdhdGVPcCB7XG4gICAgVkFMVUVTID0gJ3ZhbHVlcycgYXMgYW55LFxuICAgIENPVU5UID0gJ2NvdW50JyBhcyBhbnksXG4gICAgVkFMSUQgPSAndmFsaWQnIGFzIGFueSxcbiAgICBNSVNTSU5HID0gJ21pc3NpbmcnIGFzIGFueSxcbiAgICBESVNUSU5DVCA9ICdkaXN0aW5jdCcgYXMgYW55LFxuICAgIFNVTSA9ICdzdW0nIGFzIGFueSxcbiAgICBNRUFOID0gJ21lYW4nIGFzIGFueSxcbiAgICBBVkVSQUdFID0gJ2F2ZXJhZ2UnIGFzIGFueSxcbiAgICBWQVJJQU5DRSA9ICd2YXJpYW5jZScgYXMgYW55LFxuICAgIFZBUklBTkNFUCA9ICd2YXJpYW5jZXAnIGFzIGFueSxcbiAgICBTVERFViA9ICdzdGRldicgYXMgYW55LFxuICAgIFNUREVWUCA9ICdzdGRldnAnIGFzIGFueSxcbiAgICBNRURJQU4gPSAnbWVkaWFuJyBhcyBhbnksXG4gICAgUTEgPSAncTEnIGFzIGFueSxcbiAgICBRMyA9ICdxMycgYXMgYW55LFxuICAgIE1PREVTS0VXID0gJ21vZGVza2V3JyBhcyBhbnksXG4gICAgTUlOID0gJ21pbicgYXMgYW55LFxuICAgIE1BWCA9ICdtYXgnIGFzIGFueSxcbiAgICBBUkdNSU4gPSAnYXJnbWluJyBhcyBhbnksXG4gICAgQVJHTUFYID0gJ2FyZ21heCcgYXMgYW55LFxufVxuXG5leHBvcnQgY29uc3QgQUdHUkVHQVRFX09QUyA9IFtcbiAgICBBZ2dyZWdhdGVPcC5WQUxVRVMsXG4gICAgQWdncmVnYXRlT3AuQ09VTlQsXG4gICAgQWdncmVnYXRlT3AuVkFMSUQsXG4gICAgQWdncmVnYXRlT3AuTUlTU0lORyxcbiAgICBBZ2dyZWdhdGVPcC5ESVNUSU5DVCxcbiAgICBBZ2dyZWdhdGVPcC5TVU0sXG4gICAgQWdncmVnYXRlT3AuTUVBTixcbiAgICBBZ2dyZWdhdGVPcC5BVkVSQUdFLFxuICAgIEFnZ3JlZ2F0ZU9wLlZBUklBTkNFLFxuICAgIEFnZ3JlZ2F0ZU9wLlZBUklBTkNFUCxcbiAgICBBZ2dyZWdhdGVPcC5TVERFVixcbiAgICBBZ2dyZWdhdGVPcC5TVERFVlAsXG4gICAgQWdncmVnYXRlT3AuTUVESUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLlExLFxuICAgIEFnZ3JlZ2F0ZU9wLlEzLFxuICAgIEFnZ3JlZ2F0ZU9wLk1PREVTS0VXLFxuICAgIEFnZ3JlZ2F0ZU9wLk1JTixcbiAgICBBZ2dyZWdhdGVPcC5NQVgsXG4gICAgQWdncmVnYXRlT3AuQVJHTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFSR01BWCxcbl07XG5cbmV4cG9ydCBjb25zdCBTSEFSRURfRE9NQUlOX09QUyA9IFtcbiAgICBBZ2dyZWdhdGVPcC5NRUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFWRVJBR0UsXG4gICAgQWdncmVnYXRlT3AuU1RERVYsXG4gICAgQWdncmVnYXRlT3AuU1RERVZQLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FRElBTixcbiAgICBBZ2dyZWdhdGVPcC5RMSxcbiAgICBBZ2dyZWdhdGVPcC5RMyxcbiAgICBBZ2dyZWdhdGVPcC5NSU4sXG4gICAgQWdncmVnYXRlT3AuTUFYLFxuXTtcblxuLy8gVE9ETzogbW92ZSBzdXBwb3J0ZWRUeXBlcywgc3VwcG9ydGVkRW51bXMgZnJvbSBzY2hlbWEgdG8gaGVyZVxuIiwiXG5leHBvcnQgZW51bSBBeGlzT3JpZW50IHtcbiAgICBUT1AgPSAndG9wJyBhcyBhbnksXG4gICAgUklHSFQgPSAncmlnaHQnIGFzIGFueSxcbiAgICBMRUZUID0gJ2xlZnQnIGFzIGFueSxcbiAgICBCT1RUT00gPSAnYm90dG9tJyBhcyBhbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBeGlzQ29uZmlnIHtcbiAgLy8gLS0tLS0tLS0tLSBHZW5lcmFsIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBheGlzIGxpbmVcbiAgICovXG4gIGF4aXNXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEEgc3RyaW5nIGluZGljYXRpbmcgaWYgdGhlIGF4aXMgKGFuZCBhbnkgZ3JpZGxpbmVzKSBzaG91bGQgYmUgcGxhY2VkIGFib3ZlIG9yIGJlbG93IHRoZSBkYXRhIG1hcmtzLlxuICAgKi9cbiAgbGF5ZXI/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0LCBpbiBwaXhlbHMsIGJ5IHdoaWNoIHRvIGRpc3BsYWNlIHRoZSBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGVuY2xvc2luZyBncm91cCBvciBkYXRhIHJlY3RhbmdsZS5cbiAgICovXG4gIG9mZnNldD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIEF4aXMgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ29sb3Igb2YgYXhpcyBsaW5lLlxuICAgKi9cbiAgYXhpc0NvbG9yPzogc3RyaW5nO1xuXG4gIC8vIC0tLS0tLS0tLS0gR3JpZCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGUgaWYgZ3JpZGxpbmVzIHNob3VsZCBiZSBjcmVhdGVkIGluIGFkZGl0aW9uIHRvIHRpY2tzLiBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3IgUk9XIGFuZCBDT0wuIEZvciBYIGFuZCBZLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIHF1YW50aXRhdGl2ZSBhbmQgdGltZSBmaWVsZHMgYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ3JpZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENvbG9yIG9mIGdyaWRsaW5lcy5cbiAgICovXG4gIGdyaWRDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBpbnRvIHdoaWNoIHRvIGJlZ2luIGRyYXdpbmcgd2l0aCB0aGUgZ3JpZCBkYXNoIGFycmF5LlxuICAgKi9cbiAgZ3JpZERhc2g/OiBudW1iZXJbXTtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IG9mIGdyaWQgKHZhbHVlIGJldHdlZW4gWzAsMV0pXG4gICAqL1xuICBncmlkT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGdyaWQgd2lkdGgsIGluIHBpeGVscy5cbiAgICovXG4gIGdyaWRXaWR0aD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIExhYmVscyAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBFbmFibGUgb3IgZGlzYWJsZSBsYWJlbHMuXG4gICAqL1xuICBsYWJlbHM/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBheGlzIGxhYmVscy5cbiAgICovXG4gIGxhYmVsQW5nbGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUZXh0IGFsaWdubWVudCBmb3IgdGhlIExhYmVsLlxuICAgKi9cbiAgbGFiZWxBbGlnbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRleHQgYmFzZWxpbmUgZm9yIHRoZSBsYWJlbC5cbiAgICovXG4gIGxhYmVsQmFzZWxpbmU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUcnVuY2F0ZSBsYWJlbHMgdGhhdCBhcmUgdG9vIGxvbmcuXG4gICAqIEBtaW5pbXVtIDFcbiAgICovXG4gIGxhYmVsTWF4TGVuZ3RoPzogbnVtYmVyO1xuICAvKipcbiAgICogV2hldGhlciBtb250aCBhbmQgZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG5cbiAgLy8gLS0tLS0tLS0tLSBUaWNrcyAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBJZiBwcm92aWRlZCwgc2V0cyB0aGUgbnVtYmVyIG9mIG1pbm9yIHRpY2tzIGJldHdlZW4gbWFqb3IgdGlja3MgKHRoZSB2YWx1ZSA5IHJlc3VsdHMgaW4gZGVjaW1hbCBzdWJkaXZpc2lvbikuIE9ubHkgYXBwbGljYWJsZSBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLlxuICAgKi9cbiAgc3ViZGl2aWRlPzogbnVtYmVyO1xuICAvKipcbiAgICogQSBkZXNpcmVkIG51bWJlciBvZiB0aWNrcywgZm9yIGF4ZXMgdmlzdWFsaXppbmcgcXVhbnRpdGF0aXZlIHNjYWxlcy4gVGhlIHJlc3VsdGluZyBudW1iZXIgbWF5IGJlIGRpZmZlcmVudCBzbyB0aGF0IHZhbHVlcyBhcmUgXCJuaWNlXCIgKG11bHRpcGxlcyBvZiAyLCA1LCAxMCkgYW5kIGxpZSB3aXRoaW4gdGhlIHVuZGVybHlpbmcgc2NhbGUncyByYW5nZS5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja3M/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgYXhpcydzIHRpY2suXG4gICAqL1xuICB0aWNrQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgdGljayBsYWJlbCwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIHRpY2tMYWJlbENvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBvZiB0aGUgdGljayBsYWJlbC5cbiAgICovXG4gIHRpY2tMYWJlbEZvbnQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmb250IHNpemUgb2YgbGFiZWwsIGluIHBpeGVscy5cbiAgICovXG4gIHRpY2tMYWJlbEZvbnRTaXplPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFkZGluZywgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRpY2tzIGFuZCB0ZXh0IGxhYmVscy5cbiAgICovXG4gIHRpY2tQYWRkaW5nPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgbWFqb3IsIG1pbm9yIGFuZCBlbmQgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgbWFqb3IgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplTWFqb3I/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtaW5vciB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemVNaW5vcj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIGVuZCB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemVFbmQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCwgaW4gcGl4ZWxzLCBvZiB0aWNrcy5cbiAgICovXG4gIHRpY2tXaWR0aD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFRpdGxlIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIENvbG9yIG9mIHRoZSB0aXRsZSwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIHRpdGxlQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZvbnQgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFNpemU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdlaWdodCBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRXZWlnaHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGl0bGUgb2Zmc2V0IHZhbHVlIGZvciB0aGUgYXhpcy5cbiAgICovXG4gIHRpdGxlT2Zmc2V0PzogbnVtYmVyO1xuICAvKipcbiAgICogTWF4IGxlbmd0aCBmb3IgYXhpcyB0aXRsZSBpZiB0aGUgdGl0bGUgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgZnJvbSB0aGUgZmllbGQncyBkZXNjcmlwdGlvbi4gQnkgZGVmYXVsdCwgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIGNlbGwgc2l6ZSBhbmQgY2hhcmFjdGVyV2lkdGggcHJvcGVydHkuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpdGxlTWF4TGVuZ3RoPzogbnVtYmVyO1xuICAvKipcbiAgICogQ2hhcmFjdGVyIHdpZHRoIGZvciBhdXRvbWF0aWNhbGx5IGRldGVybWluaW5nIHRpdGxlIG1heCBsZW5ndGguXG4gICAqL1xuICBjaGFyYWN0ZXJXaWR0aD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIE90aGVyIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBheGlzIHN0eWxpbmcuXG4gICAqL1xuICBwcm9wZXJ0aWVzPzogYW55OyAvLyBUT0RPOiByZXBsYWNlXG59XG5cbi8vIFRPRE86IGFkZCBjb21tZW50IGZvciBwcm9wZXJ0aWVzIHRoYXQgd2UgcmVseSBvbiBWZWdhJ3MgZGVmYXVsdCB0byBwcm9kdWNlXG4vLyBtb3JlIGNvbmNpc2UgVmVnYSBvdXRwdXQuXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0QXhpc0NvbmZpZzogQXhpc0NvbmZpZyA9IHtcbiAgb2Zmc2V0OiB1bmRlZmluZWQsIC8vIGltcGxpY2l0bHkgMFxuICBncmlkOiB1bmRlZmluZWQsIC8vIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lZFxuICBsYWJlbHM6IHRydWUsXG4gIGxhYmVsTWF4TGVuZ3RoOiAyNSxcbiAgdGlja1NpemU6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSA2XG4gIGNoYXJhY3RlcldpZHRoOiA2XG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0QXhpc0NvbmZpZzogQXhpc0NvbmZpZyA9IHtcbiAgYXhpc1dpZHRoOiAwLFxuICBsYWJlbHM6IHRydWUsXG4gIGdyaWQ6IGZhbHNlLFxuICB0aWNrU2l6ZTogMFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBBeGlzIGV4dGVuZHMgQXhpc0NvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxBbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgZm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0IHZhbHVlIGRldGVybWluZWQgYnkgY29uZmlnLmZvcm1hdCBhbnl3YXlcbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYXhpcy4gT25lIG9mIHRvcCwgYm90dG9tLCBsZWZ0IG9yIHJpZ2h0LiBUaGUgb3JpZW50YXRpb24gY2FuIGJlIHVzZWQgdG8gZnVydGhlciBzcGVjaWFsaXplIHRoZSBheGlzIHR5cGUgKGUuZy4sIGEgeSBheGlzIG9yaWVudGVkIGZvciB0aGUgcmlnaHQgZWRnZSBvZiB0aGUgY2hhcnQpLlxuICAgKi9cbiAgb3JpZW50PzogQXhpc09yaWVudDtcbiAgLyoqXG4gICAqIEEgdGl0bGUgZm9yIHRoZSBheGlzLiBTaG93cyBmaWVsZCBuYW1lIGFuZCBpdHMgZnVuY3Rpb24gYnkgZGVmYXVsdC5cbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuICB2YWx1ZXM/OiBudW1iZXJbXTtcbn1cbiIsImltcG9ydCB7Q2hhbm5lbCwgUk9XLCBDT0xVTU4sIFNIQVBFLCBTSVpFfSBmcm9tICcuL2NoYW5uZWwnO1xuXG4vKipcbiAqIEJpbm5pbmcgcHJvcGVydGllcyBvciBib29sZWFuIGZsYWcgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdG8gYmluIGRhdGEgb3Igbm90LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJpbiB7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBiaW4gdmFsdWUgdG8gY29uc2lkZXIuIElmIHVuc3BlY2lmaWVkLCB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkIGlzIHVzZWQuXG4gICAqL1xuICBtaW4/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBiaW4gdmFsdWUgdG8gY29uc2lkZXIuIElmIHVuc3BlY2lmaWVkLCB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkIGlzIHVzZWQuXG4gICAqL1xuICBtYXg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIGJhc2UgdG8gdXNlIGZvciBhdXRvbWF0aWMgYmluIGRldGVybWluYXRpb24gKGRlZmF1bHQgaXMgYmFzZSAxMCkuXG4gICAqL1xuICBiYXNlPzogbnVtYmVyO1xuICAvKipcbiAgICogQW4gZXhhY3Qgc3RlcCBzaXplIHRvIHVzZSBiZXR3ZWVuIGJpbnMuIElmIHByb3ZpZGVkLCBvcHRpb25zIHN1Y2ggYXMgbWF4YmlucyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqL1xuICBzdGVwPzogbnVtYmVyO1xuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWxsb3dhYmxlIHN0ZXAgc2l6ZXMgdG8gY2hvb3NlIGZyb20uXG4gICAqL1xuICBzdGVwcz86IG51bWJlcltdO1xuICAvKipcbiAgICogQSBtaW5pbXVtIGFsbG93YWJsZSBzdGVwIHNpemUgKHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIGludGVnZXIgdmFsdWVzKS5cbiAgICovXG4gIG1pbnN0ZXA/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBTY2FsZSBmYWN0b3JzIGluZGljYXRpbmcgYWxsb3dhYmxlIHN1YmRpdmlzaW9ucy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgWzUsIDJdLCB3aGljaCBpbmRpY2F0ZXMgdGhhdCBmb3IgYmFzZSAxMCBudW1iZXJzICh0aGUgZGVmYXVsdCBiYXNlKSwgdGhlIG1ldGhvZCBtYXkgY29uc2lkZXIgZGl2aWRpbmcgYmluIHNpemVzIGJ5IDUgYW5kL29yIDIuIEZvciBleGFtcGxlLCBmb3IgYW4gaW5pdGlhbCBzdGVwIHNpemUgb2YgMTAsIHRoZSBtZXRob2QgY2FuIGNoZWNrIGlmIGJpbiBzaXplcyBvZiAyICg9IDEwLzUpLCA1ICg9IDEwLzIpLCBvciAxICg9IDEwLyg1KjIpKSBtaWdodCBhbHNvIHNhdGlzZnkgdGhlIGdpdmVuIGNvbnN0cmFpbnRzLlxuICAgKi9cbiAgZGl2PzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBNYXhpbXVtIG51bWJlciBvZiBiaW5zLlxuICAgKiBAbWluaW11bSAyXG4gICAqL1xuICBtYXhiaW5zPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0b01heEJpbnMoY2hhbm5lbDogQ2hhbm5lbCk6IG51bWJlciB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgU0laRTpcbiAgICAgIC8vIEZhY2V0cyBhbmQgU2l6ZSBzaG91bGRuJ3QgaGF2ZSB0b28gbWFueSBiaW5zXG4gICAgICAvLyBXZSBjaG9vc2UgNiBsaWtlIHNoYXBlIHRvIHNpbXBsaWZ5IHRoZSBydWxlXG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiA2OyAvLyBWZWdhJ3MgXCJzaGFwZVwiIGhhcyA2IGRpc3RpbmN0IHZhbHVlc1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gMTA7XG4gIH1cbn1cbiIsIi8qXG4gKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZW5jb2RpbmcgY2hhbm5lbHMgKFZpc3VhbCB2YXJpYWJsZXMpXG4gKiBzdWNoIGFzICd4JywgJ3knLCAnY29sb3InLlxuICovXG5cbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcbmltcG9ydCB7Y29udGFpbnMsIHdpdGhvdXR9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBlbnVtIENoYW5uZWwge1xuICBYID0gJ3gnIGFzIGFueSxcbiAgWSA9ICd5JyBhcyBhbnksXG4gIFJPVyA9ICdyb3cnIGFzIGFueSxcbiAgQ09MVU1OID0gJ2NvbHVtbicgYXMgYW55LFxuICBTSEFQRSA9ICdzaGFwZScgYXMgYW55LFxuICBTSVpFID0gJ3NpemUnIGFzIGFueSxcbiAgQ09MT1IgPSAnY29sb3InIGFzIGFueSxcbiAgVEVYVCA9ICd0ZXh0JyBhcyBhbnksXG4gIERFVEFJTCA9ICdkZXRhaWwnIGFzIGFueSxcbiAgTEFCRUwgPSAnbGFiZWwnIGFzIGFueSxcbiAgUEFUSCA9ICdwYXRoJyBhcyBhbnksXG4gIE9SREVSID0gJ29yZGVyJyBhcyBhbnksXG4gIE9QQUNJVFkgPSAnb3BhY2l0eScgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBYID0gQ2hhbm5lbC5YO1xuZXhwb3J0IGNvbnN0IFkgPSBDaGFubmVsLlk7XG5leHBvcnQgY29uc3QgUk9XID0gQ2hhbm5lbC5ST1c7XG5leHBvcnQgY29uc3QgQ09MVU1OID0gQ2hhbm5lbC5DT0xVTU47XG5leHBvcnQgY29uc3QgU0hBUEUgPSBDaGFubmVsLlNIQVBFO1xuZXhwb3J0IGNvbnN0IFNJWkUgPSBDaGFubmVsLlNJWkU7XG5leHBvcnQgY29uc3QgQ09MT1IgPSBDaGFubmVsLkNPTE9SO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBDaGFubmVsLlRFWFQ7XG5leHBvcnQgY29uc3QgREVUQUlMID0gQ2hhbm5lbC5ERVRBSUw7XG5leHBvcnQgY29uc3QgTEFCRUwgPSBDaGFubmVsLkxBQkVMO1xuZXhwb3J0IGNvbnN0IFBBVEggPSBDaGFubmVsLlBBVEg7XG5leHBvcnQgY29uc3QgT1JERVIgPSBDaGFubmVsLk9SREVSO1xuZXhwb3J0IGNvbnN0IE9QQUNJVFkgPSBDaGFubmVsLk9QQUNJVFk7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMUyA9IFtYLCBZLCBST1csIENPTFVNTiwgU0laRSwgU0hBUEUsIENPTE9SLCBQQVRILCBPUkRFUiwgT1BBQ0lUWSwgVEVYVCwgREVUQUlMLCBMQUJFTF07XG5cbmV4cG9ydCBjb25zdCBVTklUX0NIQU5ORUxTID0gd2l0aG91dChDSEFOTkVMUywgW1JPVywgQ09MVU1OXSk7XG5leHBvcnQgY29uc3QgVU5JVF9TQ0FMRV9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9DSEFOTkVMUywgW1BBVEgsIE9SREVSLCBERVRBSUwsIFRFWFQsIExBQkVMXSk7XG5leHBvcnQgY29uc3QgTk9OU1BBVElBTF9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9DSEFOTkVMUywgW1gsIFldKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX1NDQUxFX0NIQU5ORUxTLCBbWCwgWV0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHBvcnRlZE1hcmsge1xuICBwb2ludD86IGJvb2xlYW47XG4gIHRpY2s/OiBib29sZWFuO1xuICBydWxlPzogYm9vbGVhbjtcbiAgY2lyY2xlPzogYm9vbGVhbjtcbiAgc3F1YXJlPzogYm9vbGVhbjtcbiAgYmFyPzogYm9vbGVhbjtcbiAgbGluZT86IGJvb2xlYW47XG4gIGFyZWE/OiBib29sZWFuO1xuICB0ZXh0PzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGEgcGFydGljdWxhciBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbCAgY2hhbm5lbCBuYW1lXG4gKiBAcGFyYW0gbWFyayB0aGUgbWFyayB0eXBlXG4gKiBAcmV0dXJuIHdoZXRoZXIgdGhlIG1hcmsgc3VwcG9ydHMgdGhlIGNoYW5uZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRNYXJrKGNoYW5uZWw6IENoYW5uZWwsIG1hcms6IE1hcmspIHtcbiAgcmV0dXJuICEhZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsKVttYXJrXTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBkaWN0aW9uYXJ5IHNob3dpbmcgd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgbWFyayB0eXBlLlxuICogQHBhcmFtIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgbWFyayB0eXBlcyB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZE1hcmsoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZE1hcmsge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBERVRBSUw6XG4gICAgY2FzZSBPUkRFUjpcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4geyAvLyBhbGwgbWFya3NcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIHJ1bGU6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIGxpbmU6IHRydWUsIGFyZWE6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIHJ1bGU6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cG9pbnQ6IHRydWV9O1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7dGV4dDogdHJ1ZX07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtsaW5lOiB0cnVlfTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkUm9sZSB7XG4gIG1lYXN1cmU6IGJvb2xlYW47XG4gIGRpbWVuc2lvbjogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGRpbWVuc2lvbiAvIG1lYXN1cmUgcm9sZVxuICogQHBhcmFtICBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIHJvbGUgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRSb2xlKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRSb2xlIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIExBQkVMOlxuICAgIGNhc2UgREVUQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcbiAgICBjYXNlIFRFWFQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IGZhbHNlXG4gICAgICB9O1xuICAgIGNhc2UgUEFUSDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVuY29kaW5nIGNoYW5uZWwnICsgY2hhbm5lbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNTY2FsZShjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiAhY29udGFpbnMoW0RFVEFJTCwgUEFUSCwgVEVYVCwgTEFCRUwsIE9SREVSXSwgY2hhbm5lbCk7XG59XG4iLCJpbXBvcnQge0F4aXNPcmllbnR9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkRGVmVGl0bGUsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGtleXMsIGV4dGVuZCwgdHJ1bmNhdGUsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0F4aXN9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtmb3JtYXRNaXhpbnN9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSBsZXQgZXhwb3J0cztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpc0NvbXBvbmVudChtb2RlbDogTW9kZWwsIGF4aXNDaGFubmVsczogQ2hhbm5lbFtdKTogRGljdDxWZ0F4aXM+IHtcbiAgcmV0dXJuIGF4aXNDaGFubmVscy5yZWR1Y2UoZnVuY3Rpb24oYXhpcywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBheGlzW2NoYW5uZWxdID0gcGFyc2VBeGlzKGNoYW5uZWwsIG1vZGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGF4aXM7XG4gIH0sIHt9IGFzIERpY3Q8VmdBeGlzPik7XG59XG5cbi8qKlxuICogTWFrZSBhbiBpbm5lciBheGlzIGZvciBzaG93aW5nIGdyaWQgZm9yIHNoYXJlZCBheGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbm5lckF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGRpbmcgdGlja3MgYXMgd2VsbFxuXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IHdpdGggVmVnYSBBeGlzIEludGVyZmFjZVxuICBsZXQgZGVmOiBhbnkgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKGNoYW5uZWwpLFxuICAgIGdyaWQ6IHRydWUsXG4gICAgdGlja1NpemU6IDAsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbGFiZWxzOiB7XG4gICAgICAgIHRleHQ6IHt2YWx1ZTogJyd9XG4gICAgICB9LFxuICAgICAgYXhpczoge1xuICAgICAgICBzdHJva2U6IHt2YWx1ZTogJ3RyYW5zcGFyZW50J31cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgWydsYXllcicsICd0aWNrcycsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgLy8gRm9yIG5vdywgb25seSBuZWVkIHRvIGFkZCBncmlkIHByb3BlcnRpZXMgaGVyZSBiZWNhdXNlIGlubmVyQXhpcyBpcyBvbmx5IGZvciByZW5kZXJpbmcgZ3JpZC5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGQgb3RoZXIgcHJvcGVydGllcyBmb3IgaW5uZXJBeGlzXG4gIFsnZ3JpZCddLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbClcbiAgfTtcblxuICAvLyBmb3JtYXQgbWl4aW5zIChhZGQgZm9ybWF0IGFuZCBmb3JtYXRUeXBlKVxuICBleHRlbmQoZGVmLCBmb3JtYXRNaXhpbnMobW9kZWwsIGNoYW5uZWwsIG1vZGVsLmF4aXMoY2hhbm5lbCkuZm9ybWF0KSk7XG5cbiAgLy8gMS4yLiBBZGQgcHJvcGVydGllc1xuICBbXG4gICAgLy8gYSkgcHJvcGVydGllcyB3aXRoIHNwZWNpYWwgcnVsZXMgKHNvIGl0IGhhcyBheGlzW3Byb3BlcnR5XSBtZXRob2RzKSAtLSBjYWxsIHJ1bGUgZnVuY3Rpb25zXG4gICAgJ2dyaWQnLCAnbGF5ZXInLCAnb2Zmc2V0JywgJ29yaWVudCcsICd0aWNrU2l6ZScsICd0aWNrcycsICd0aWNrU2l6ZUVuZCcsICd0aXRsZScsICd0aXRsZU9mZnNldCcsXG4gICAgLy8gYikgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzLCBvbmx5IHByb2R1Y2UgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIHNjaGVtYSwgb3IgZXhwbGljaXQgdmFsdWUgaWYgc3BlY2lmaWVkXG4gICAgJ3RpY2tQYWRkaW5nJywgJ3RpY2tTaXplJywgJ3RpY2tTaXplTWFqb3InLCAndGlja1NpemVNaW5vcicsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBsZXQgbWV0aG9kOiAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWY6YW55KT0+YW55O1xuXG4gICAgY29uc3QgdmFsdWUgPSAobWV0aG9kID0gZXhwb3J0c1twcm9wZXJ0eV0pID9cbiAgICAgICAgICAgICAgICAgIC8vIGNhbGxpbmcgYXhpcy5mb3JtYXQsIGF4aXMuZ3JpZCwgLi4uXG4gICAgICAgICAgICAgICAgICBtZXRob2QobW9kZWwsIGNoYW5uZWwsIGRlZikgOlxuICAgICAgICAgICAgICAgICAgYXhpc1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gbW9kZWwuYXhpcyhjaGFubmVsKS5wcm9wZXJ0aWVzIHx8IHt9O1xuXG4gIFtcbiAgICAnYXhpcycsICdsYWJlbHMnLCAvLyBoYXZlIHNwZWNpYWwgcnVsZXNcbiAgICAnZ3JpZCcsICd0aXRsZScsICd0aWNrcycsICdtYWpvclRpY2tzJywgJ21pbm9yVGlja3MnIC8vIG9ubHkgZGVmYXVsdCB2YWx1ZXNcbiAgXS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW2dyb3VwXSA/XG4gICAgICBwcm9wZXJ0aWVzW2dyb3VwXShtb2RlbCwgY2hhbm5lbCwgcHJvcHNbZ3JvdXBdIHx8IHt9LCBkZWYpIDpcbiAgICAgIHByb3BzW2dyb3VwXTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5vZmZzZXQ7XG59XG5cbi8vIFRPRE86IHdlIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBtZXRob2QgYWZ0ZXIgd2UgdGFrZSBjYXJlIG9mIGNvbmZpZyByZWZhY3RvcmluZ1xuLyoqXG4gKiBEZWZhdWx0IHJ1bGVzIGZvciB3aGV0aGVyIHRvIHNob3cgYSBncmlkIHNob3VsZCBiZSBzaG93biBmb3IgYSBjaGFubmVsLlxuICogSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIG9yZGluYWwgc2NhbGVzIHRoYXQgYXJlIG5vdCBiaW5uZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRTaG93KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBncmlkID0gbW9kZWwuYXhpcyhjaGFubmVsKS5ncmlkO1xuICBpZiAoZ3JpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICByZXR1cm4gIW1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIG5ldmVyIGFwcGx5IGdyaWQgZm9yIFJPVyBhbmQgQ09MVU1OIHNpbmNlIHdlIG1hbnVhbGx5IGNyZWF0ZSBydWxlLWdyb3VwIGZvciB0aGVtXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBncmlkU2hvdyhtb2RlbCwgY2hhbm5lbCkgJiYgKFxuICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBjbGVhbmx5IC0tIGVzc2VudGlhbGx5IHRoZSBjb25kaXRpb24gYmVsb3cgaXMgd2hldGhlclxuICAgIC8vIHRoZSBheGlzIGlzIGEgc2hhcmVkIC8gdW5pb24gYXhpcy5cbiAgICAoY2hhbm5lbCA9PT0gWSB8fCBjaGFubmVsID09PSBYKSAmJiAhKG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmKSB7XG4gIGNvbnN0IGxheWVyID0gbW9kZWwuYXhpcyhjaGFubmVsKS5sYXllcjtcbiAgaWYgKGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgaWYgKGRlZi5ncmlkKSB7XG4gICAgLy8gaWYgZ3JpZCBpcyB0cnVlLCBuZWVkIHRvIHB1dCBsYXllciBvbiB0aGUgYmFjayBzbyB0aGF0IGdyaWQgaXMgYmVoaW5kIG1hcmtzXG4gICAgcmV0dXJuICdiYWNrJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBvdGhlcndpc2UgcmV0dXJuIHVuZGVmaW5lZCBhbmQgdXNlIFZlZ2EncyBkZWZhdWx0LlxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgb3JpZW50ID0gbW9kZWwuYXhpcyhjaGFubmVsKS5vcmllbnQ7XG4gIGlmIChvcmllbnQpIHtcbiAgICByZXR1cm4gb3JpZW50O1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIEZJWE1FIHRlc3QgYW5kIGRlY2lkZVxuICAgIHJldHVybiBBeGlzT3JpZW50LlRPUDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tzID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrcztcbiAgaWYgKHRpY2tzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICAvLyBGSVhNRSBkZXBlbmRzIG9uIHNjYWxlIHR5cGUgdG9vXG4gIGlmIChjaGFubmVsID09PSBYICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW4pIHtcbiAgICAvLyBWZWdhJ3MgZGVmYXVsdCB0aWNrcyBvZnRlbiBsZWFkIHRvIGEgbG90IG9mIGxhYmVsIG9jY2x1c2lvbiBvbiBYIHdpdGhvdXQgOTAgZGVncmVlIHJvdGF0aW9uXG4gICAgcmV0dXJuIDU7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZTtcbiAgaWYgKHRpY2tTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja1NpemU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTaXplRW5kKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCB0aWNrU2l6ZUVuZCA9IG1vZGVsLmF4aXMoY2hhbm5lbCkudGlja1NpemVFbmQ7XG4gIGlmICh0aWNrU2l6ZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGlja1NpemVFbmQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICBpZiAoYXhpcy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGF4aXMudGl0bGU7XG4gIH1cblxuICAvLyBpZiBub3QgZGVmaW5lZCwgYXV0b21hdGljYWxseSBkZXRlcm1pbmUgYXhpcyB0aXRsZSBmcm9tIGZpZWxkIGRlZlxuICBjb25zdCBmaWVsZFRpdGxlID0gZmllbGREZWZUaXRsZShtb2RlbC5maWVsZERlZihjaGFubmVsKSk7XG5cbiAgbGV0IG1heExlbmd0aDtcbiAgaWYgKGF4aXMudGl0bGVNYXhMZW5ndGgpIHtcbiAgICBtYXhMZW5ndGggPSBheGlzLnRpdGxlTWF4TGVuZ3RoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFgpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB4XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLyBtb2RlbC5heGlzKFgpLmNoYXJhY3RlcldpZHRoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFkgJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFkpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB5XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0IC8gbW9kZWwuYXhpcyhZKS5jaGFyYWN0ZXJXaWR0aDtcbiAgfVxuXG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVPZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpdGxlT2Zmc2V0ID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aXRsZU9mZnNldDtcbiAgaWYgKHRpdGxlT2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aXRsZU9mZnNldDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLmF4aXNDb2xvciAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgeyBzdHJva2U6IHt2YWx1ZTogYXhpcy5heGlzQ29sb3J9IH0gOlxuICAgICAgICB7fSxcbiAgICAgIGF4aXMuYXhpc1dpZHRoICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMuYXhpc1dpZHRofSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZ3JpZFByb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuZ3JpZENvbG9yICE9PSB1bmRlZmluZWQgPyB7IHN0cm9rZToge3ZhbHVlOiBheGlzLmdyaWRDb2xvcn19IDoge30sXG4gICAgICBheGlzLmdyaWRPcGFjaXR5ICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlT3BhY2l0eToge3ZhbHVlOiBheGlzLmdyaWRPcGFjaXR5fSB9IDoge30sXG4gICAgICBheGlzLmdyaWRXaWR0aCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZVdpZHRoIDoge3ZhbHVlOiBheGlzLmdyaWRXaWR0aH0gfSA6IHt9LFxuICAgICAgYXhpcy5ncmlkRGFzaCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZURhc2hPZmZzZXQgOiB7dmFsdWU6IGF4aXMuZ3JpZERhc2h9IH0gOiB7fSxcbiAgICAgIGdyaWRQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGxhYmVsc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICBpZiAoIWF4aXMubGFiZWxzKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIGlmIChjb250YWlucyhbTk9NSU5BTCwgT1JESU5BTF0sIGZpZWxkRGVmLnR5cGUpICYmIGF4aXMubGFiZWxNYXhMZW5ndGgpIHtcbiAgICAgIC8vIFRPRE8gcmVwbGFjZSB0aGlzIHdpdGggVmVnYSdzIGxhYmVsTWF4TGVuZ3RoIG9uY2UgaXQgaXMgaW50cm9kdWNlZFxuICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogJ3t7IGRhdHVtLmRhdGEgfCB0cnVuY2F0ZTonICsgYXhpcy5sYWJlbE1heExlbmd0aCArICd9fSdcbiAgICAgICAgfVxuICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgfVxuXG4gICAgLy8gTGFiZWwgQW5nbGVcbiAgICBpZiAoYXhpcy5sYWJlbEFuZ2xlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsc1NwZWMuYW5nbGUgPSB7dmFsdWU6IGF4aXMubGFiZWxBbmdsZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF1dG8gcm90YXRlIGZvciBYIGFuZCBSb3dcbiAgICAgIGlmIChjaGFubmVsID09PSBYICYmIChpc0RpbWVuc2lvbihmaWVsZERlZikgfHwgZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuYW5nbGUgPSB7dmFsdWU6IDI3MH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGFiZWxBbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmFsaWduID0ge3ZhbHVlOiBheGlzLmxhYmVsQWxpZ259O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBdXRvIHNldCBhbGlnbiBpZiByb3RhdGVkXG4gICAgICAvLyBUT0RPOiBjb25zaWRlciBvdGhlciB2YWx1ZSBiZXNpZGVzIDI3MCwgOTBcbiAgICAgIGlmIChsYWJlbHNTcGVjLmFuZ2xlKSB7XG4gICAgICAgIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSAyNzApIHtcbiAgICAgICAgICBsYWJlbHNTcGVjLmFsaWduID0ge1xuICAgICAgICAgICAgdmFsdWU6IGRlZi5vcmllbnQgPT09ICd0b3AnID8gJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgIGRlZi50eXBlID09PSAneCcgPyAncmlnaHQnIDpcbiAgICAgICAgICAgICAgICAgICAnY2VudGVyJ1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gOTApIHtcbiAgICAgICAgICBsYWJlbHNTcGVjLmFsaWduID0ge3ZhbHVlOiAnY2VudGVyJ307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sYWJlbEJhc2VsaW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6IGF4aXMubGFiZWxCYXNlbGluZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsYWJlbHNTcGVjLmFuZ2xlKSB7XG4gICAgICAgIC8vIEF1dG8gc2V0IGJhc2VsaW5lIGlmIHJvdGF0ZWRcbiAgICAgICAgLy8gVE9ETzogY29uc2lkZXIgb3RoZXIgdmFsdWUgYmVzaWRlcyAyNzAsIDkwXG4gICAgICAgIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSAyNzApIHtcbiAgICAgICAgICBsYWJlbHNTcGVjLmJhc2VsaW5lID0ge3ZhbHVlOiBkZWYudHlwZSA9PT0gJ3gnID8gJ21pZGRsZScgOiAnYm90dG9tJ307XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gOTApIHtcbiAgICAgICAgICBsYWJlbHNTcGVjLmJhc2VsaW5lID0ge3ZhbHVlOiAnYm90dG9tJ307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXhpcy50aWNrTGFiZWxDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuc3Ryb2tlID0ge3ZhbHVlOiBheGlzLnRpY2tMYWJlbENvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAoYXhpcy50aWNrTGFiZWxGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5mb250ID0ge3ZhbHVlOiBheGlzLnRpY2tMYWJlbEZvbnR9O1xuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbEZvbnRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5mb250U2l6ZSA9IHt2YWx1ZTogYXhpcy50aWNrTGFiZWxGb250U2l6ZX07XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXMobGFiZWxzU3BlYykubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogbGFiZWxzU3BlYztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aWNrcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHRpY2tzUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy50aWNrQ29sb3IgIT09IHVuZGVmaW5lZCA/IHtzdHJva2UgOiB7dmFsdWU6IGF4aXMudGlja0NvbG9yfSB9IDoge30sXG4gICAgICBheGlzLnRpY2tXaWR0aCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMudGlja1dpZHRofSB9IDoge30sXG4gICAgICB0aWNrc1Byb3BzU3BlYyB8fCB7fVxuICAgICk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdGl0bGUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCB0aXRsZVByb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMudGl0bGVDb2xvciAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZSA6IHt2YWx1ZTogYXhpcy50aXRsZUNvbG9yfSB9IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udCAhPT0gdW5kZWZpbmVkID8ge2ZvbnQ6IHt2YWx1ZTogYXhpcy50aXRsZUZvbnR9fSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnRTaXplICE9PSB1bmRlZmluZWQgPyB7Zm9udFNpemU6IHt2YWx1ZTogYXhpcy50aXRsZUZvbnRTaXplfX0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250V2VpZ2h0ICE9PSB1bmRlZmluZWQgPyB7Zm9udFdlaWdodDoge3ZhbHVlOiBheGlzLnRpdGxlRm9udFdlaWdodH19IDoge30sXG5cbiAgICAgIHRpdGxlUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgU0laRSwgQ09MT1IsIE9QQUNJVFksIFNIQVBFLCBURVhULCBMQUJFTCwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZCwgT3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NvcnRPcmRlcn0gZnJvbSAnLi4vc29ydCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgdW5pb259IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtmb3JtYXQgYXMgdGltZUZvcm1hdEV4cHJ9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtTcGVjLCBpc1VuaXRTcGVjLCBpc0ZhY2V0U3BlYywgaXNMYXllclNwZWN9IGZyb20gJy4uL3NwZWMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKHNwZWM6IFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKTogTW9kZWwge1xuICBpZiAoaXNGYWNldFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IEZhY2V0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzTGF5ZXJTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBMYXllck1vZGVsKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcbiAgfVxuXG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBVbml0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcignSW52YWxpZCBzcGVjLicpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gVE9ETzogZmlndXJlIGlmIHdlIHJlYWxseSBuZWVkIG9wYWNpdHkgaW4gYm90aFxuZXhwb3J0IGNvbnN0IFNUUk9LRV9DT05GSUcgPSBbJ3N0cm9rZScsICdzdHJva2VXaWR0aCcsXG4gICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnLCAnc3Ryb2tlT3BhY2l0eScsICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eScsXG4gICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX1NUUk9LRV9DT05GSUcgPSB1bmlvbihTVFJPS0VfQ09ORklHLCBGSUxMX0NPTkZJRyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuICBjb25zdCBjb2xvckZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICBjb25zdCBvcGFjaXR5RmllbGREZWYgPSBtb2RlbC5maWVsZERlZihPUEFDSVRZKTtcblxuICAvLyBBcHBseSBmaWxsIHN0cm9rZSBjb25maWcgZmlyc3Qgc28gdGhhdCBjb2xvciBmaWVsZCAvIHZhbHVlIGNhbiBvdmVycmlkZVxuICAvLyBmaWxsIC8gc3Ryb2tlXG4gIGlmIChmaWxsZWQpIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIEZJTExfQ09ORklHKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFNUUk9LRV9DT05GSUcpO1xuICB9XG5cbiAgbGV0IGNvbG9yVmFsdWU7XG4gIGxldCBvcGFjaXR5VmFsdWU7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgY29sb3JWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBjb2xvckZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChjb2xvckZpZWxkRGVmICYmIGNvbG9yRmllbGREZWYudmFsdWUpIHtcbiAgICBjb2xvclZhbHVlID0geyB2YWx1ZTogY29sb3JGaWVsZERlZi52YWx1ZSB9O1xuICB9XG5cbiAgaWYgKG1vZGVsLmhhcyhPUEFDSVRZKSkge1xuICAgIG9wYWNpdHlWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoT1BBQ0lUWSwgb3BhY2l0eUZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChvcGFjaXR5RmllbGREZWYgJiYgb3BhY2l0eUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgb3BhY2l0eVZhbHVlID0geyB2YWx1ZTogb3BhY2l0eUZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAoY29sb3JWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgcC5maWxsID0gY29sb3JWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2UgPSBjb2xvclZhbHVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWdcbiAgICBwW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsuY29sb3J9O1xuICB9XG5cbiAgaWYgKG9wYWNpdHlWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcC5vcGFjaXR5ID0gb3BhY2l0eVZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbmZpZyhwcm9wZXJ0aWVzLCBjb25maWcsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcHJvcHNMaXN0LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0geyB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWFya0NvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsOiBVbml0TW9kZWwsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGFwcGx5Q29uZmlnKG1hcmtzUHJvcGVydGllcywgbW9kZWwuY29uZmlnKCkubWFyaywgcHJvcHNMaXN0KTtcbn1cblxuXG4vKipcbiAqIEJ1aWxkcyBhbiBvYmplY3Qgd2l0aCBmb3JtYXQgYW5kIGZvcm1hdFR5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0gZm9ybWF0IGV4cGxpY2l0bHkgc3BlY2lmaWVkIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TWl4aW5zKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZm9ybWF0OiBzdHJpbmcpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICBpZighY29udGFpbnMoW1FVQU5USVRBVElWRSwgVEVNUE9SQUxdLCBmaWVsZERlZi50eXBlKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGxldCBkZWY6IGFueSA9IHt9O1xuXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIGRlZi5mb3JtYXRUeXBlID0gJ3RpbWUnO1xuICB9XG5cbiAgaWYgKGZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGVmLmZvcm1hdCA9IGZvcm1hdDtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgIGNhc2UgUVVBTlRJVEFUSVZFOlxuICAgICAgICBkZWYuZm9ybWF0ID0gbW9kZWwuY29uZmlnKCkubnVtYmVyRm9ybWF0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVEVNUE9SQUw6XG4gICAgICAgIGRlZi5mb3JtYXQgPSB0aW1lRm9ybWF0KG1vZGVsLCBjaGFubmVsKSB8fCBtb2RlbC5jb25maWcoKS50aW1lRm9ybWF0O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoY2hhbm5lbCA9PT0gVEVYVCkge1xuICAgIC8vIHRleHQgZG9lcyBub3Qgc3VwcG9ydCBmb3JtYXQgYW5kIGZvcm1hdFR5cGVcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmVnYS92ZWdhL2lzc3Vlcy81MDVcblxuICAgIGNvbnN0IGZpbHRlciA9IChkZWYuZm9ybWF0VHlwZSB8fCAnbnVtYmVyJykgKyAoZGVmLmZvcm1hdCA/ICc6XFwnJyArIGRlZi5mb3JtYXQgKyAnXFwnJyA6ICcnKTtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDoge1xuICAgICAgICB0ZW1wbGF0ZTogJ3t7JyArIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgZGF0dW06IHRydWUgfSkgKyAnIHwgJyArIGZpbHRlciArICd9fSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZnVuY3Rpb24gaXNBYmJyZXZpYXRlZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgICAgcmV0dXJuIG1vZGVsLmF4aXMoY2hhbm5lbCkuc2hvcnRUaW1lTGFiZWxzO1xuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgU0hBUEU6XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIG1vZGVsLmxlZ2VuZChjaGFubmVsKS5zaG9ydFRpbWVMYWJlbHM7XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuc2hvcnRUaW1lTGFiZWxzO1xuICAgIGNhc2UgTEFCRUw6XG4gICAgICAvLyBUT0RPKCM4OTcpOiBpbXBsZW1lbnQgd2hlbiB3ZSBoYXZlIGxhYmVsXG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5cblxuLyoqIFJldHVybiBmaWVsZCByZWZlcmVuY2Ugd2l0aCBwb3RlbnRpYWwgXCItXCIgcHJlZml4IGZvciBkZXNjZW5kaW5nIHNvcnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RmllbGQob3JkZXJDaGFubmVsRGVmOiBPcmRlckNoYW5uZWxEZWYpIHtcbiAgcmV0dXJuIChvcmRlckNoYW5uZWxEZWYuc29ydCA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcgPyAnLScgOiAnJykgKyBmaWVsZChvcmRlckNoYW5uZWxEZWYpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHRpbWUgZm9ybWF0IHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVGb3JtYXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogc3RyaW5nIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgcmV0dXJuIHRpbWVGb3JtYXRFeHByKGZpZWxkRGVmLnRpbWVVbml0LCBpc0FiYnJldmlhdGVkKG1vZGVsLCBjaGFubmVsLCBmaWVsZERlZikpO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZm9yIGNvbXBpbGluZyBWZWdhLWxpdGUgc3BlYyBpbnRvIFZlZ2Egc3BlYy5cbiAqL1xuXG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7bm9ybWFsaXplLCBFeHRlbmRlZFNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGUoaW5wdXRTcGVjOiBFeHRlbmRlZFNwZWMpIHtcbiAgLy8gMS4gQ29udmVydCBpbnB1dCBzcGVjIGludG8gYSBub3JtYWwgZm9ybVxuICAvLyAoRGVjb21wb3NlIGFsbCBleHRlbmRlZCB1bml0IHNwZWNzIGludG8gY29tcG9zaXRpb24gb2YgdW5pdCBzcGVjLilcbiAgY29uc3Qgc3BlYyA9IG5vcm1hbGl6ZShpbnB1dFNwZWMpO1xuXG4gIC8vIDIuIEluc3RhbnRpYXRlIHRoZSBtb2RlbCB3aXRoIGRlZmF1bHQgcHJvcGVydGllc1xuICBjb25zdCBtb2RlbCA9IGJ1aWxkTW9kZWwoc3BlYywgbnVsbCwgJycpO1xuXG4gIC8vIDMuIFBhcnNlIGVhY2ggcGFydCBvZiB0aGUgbW9kZWwgdG8gcHJvZHVjZSBjb21wb25lbnRzIHRoYXQgd2lsbCBiZSBhc3NlbWJsZWQgbGF0ZXJcbiAgLy8gV2UgdHJhdmVyc2UgdGhlIHdob2xlIHRyZWUgdG8gcGFyc2Ugb25jZSBmb3IgZWFjaCB0eXBlIG9mIGNvbXBvbmVudHNcbiAgLy8gKGUuZy4sIGRhdGEsIGxheW91dCwgbWFyaywgc2NhbGUpLlxuICAvLyBQbGVhc2Ugc2VlIGluc2lkZSBtb2RlbC5wYXJzZSgpIGZvciBvcmRlciBmb3IgY29tcGlsYXRpb24uXG4gIG1vZGVsLnBhcnNlKCk7XG5cbiAgLy8gNC4gQXNzZW1ibGUgYSBWZWdhIFNwZWMgZnJvbSB0aGUgcGFyc2VkIGNvbXBvbmVudHMgaW4gMy5cbiAgcmV0dXJuIGFzc2VtYmxlKG1vZGVsKTtcbn1cblxuZnVuY3Rpb24gYXNzZW1ibGUobW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gIC8vIFRPRE86IGNoYW5nZSB0eXBlIHRvIGJlY29tZSBWZ1NwZWNcbiAgY29uc3Qgb3V0cHV0ID0gZXh0ZW5kKFxuICAgIHtcbiAgICAgIC8vIFNldCBzaXplIHRvIDEgYmVjYXVzZSB3ZSByZWx5IG9uIHBhZGRpbmcgYW55d2F5XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIHBhZGRpbmc6ICdhdXRvJ1xuICAgIH0sXG4gICAgY29uZmlnLnZpZXdwb3J0ID8geyB2aWV3cG9ydDogY29uZmlnLnZpZXdwb3J0IH0gOiB7fSxcbiAgICBjb25maWcuYmFja2dyb3VuZCA/IHsgYmFja2dyb3VuZDogY29uZmlnLmJhY2tncm91bmQgfSA6IHt9LFxuICAgIHtcbiAgICAgIC8vIFRPRE86IHNpZ25hbDogbW9kZWwuYXNzZW1ibGVTZWxlY3Rpb25TaWduYWxcbiAgICAgIGRhdGE6IFtdLmNvbmNhdChcbiAgICAgICAgbW9kZWwuYXNzZW1ibGVEYXRhKFtdKSxcbiAgICAgICAgbW9kZWwuYXNzZW1ibGVMYXlvdXQoW10pXG4gICAgICAgIC8vIFRPRE86IG1vZGVsLmFzc2VtYmxlU2VsZWN0aW9uRGF0YVxuICAgICAgKSxcbiAgICAgIG1hcmtzOiBbYXNzZW1ibGVSb290R3JvdXAobW9kZWwpXVxuICAgIH0pO1xuXG4gIHJldHVybiB7XG4gICAgc3BlYzogb3V0cHV0XG4gICAgLy8gVE9ETzogYWRkIHdhcm5pbmcgLyBlcnJvcnMgaGVyZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVSb290R3JvdXAobW9kZWw6IE1vZGVsKSB7XG4gIGxldCByb290R3JvdXA6YW55ID0gZXh0ZW5kKHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3Jvb3QnKSxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgfSxcbiAgICBtb2RlbC5kZXNjcmlwdGlvbigpID8ge2Rlc2NyaXB0aW9uOiBtb2RlbC5kZXNjcmlwdGlvbigpfSA6IHt9LFxuICAgIHtcbiAgICAgIGZyb206IHtkYXRhOiBMQVlPVVR9LFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IGV4dGVuZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDoge2ZpZWxkOiAnd2lkdGgnfSxcbiAgICAgICAgICAgIGhlaWdodDoge2ZpZWxkOiAnaGVpZ2h0J31cbiAgICAgICAgICB9LFxuICAgICAgICAgIG1vZGVsLmFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKG1vZGVsLmNvbmZpZygpLmNlbGwpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KTtcblxuICByZXR1cm4gZXh0ZW5kKHJvb3RHcm91cCwgbW9kZWwuYXNzZW1ibGVHcm91cCgpKTtcbn1cbiIsImltcG9ydCB7WCwgREVUQUlMfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FnZ3JlZ2F0ZSwgaGFzfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtQT0lOVCwgTElORSwgVElDSywgQ0lSQ0xFLCBTUVVBUkUsIFJVTEUsIE1hcmt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcblxuLyoqXG4gKiBBdWdtZW50IGNvbmZpZy5tYXJrIHdpdGggcnVsZS1iYXNlZCBkZWZhdWx0IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNYXJrQ29uZmlnKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpIHtcbiAgIHJldHVybiBleHRlbmQoXG4gICAgIFsnZmlsbGVkJywgJ29wYWNpdHknLCAnb3JpZW50JywgJ2FsaWduJ10ucmVkdWNlKGZ1bmN0aW9uKGNmZywgcHJvcGVydHk6IHN0cmluZykge1xuICAgICAgIGNvbnN0IHZhbHVlID0gY29uZmlnLm1hcmtbcHJvcGVydHldO1xuICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgIGNhc2UgJ2ZpbGxlZCc6XG4gICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgLy8gUG9pbnQsIGxpbmUsIGFuZCBydWxlIGFyZSBub3QgZmlsbGVkIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gbWFyayAhPT0gUE9JTlQgJiYgbWFyayAhPT0gTElORSAmJiBtYXJrICE9PSBSVUxFO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGNvbnRhaW5zKFtQT0lOVCwgVElDSywgQ0lSQ0xFLCBTUVVBUkVdLCBtYXJrKSkge1xuICAgICAgICAgICAgIC8vIHBvaW50LWJhc2VkIG1hcmtzIGFuZCBiYXJcbiAgICAgICAgICAgICBpZiAoIWlzQWdncmVnYXRlKGVuY29kaW5nKSB8fCBoYXMoZW5jb2RpbmcsIERFVEFJTCkpIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAwLjc7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgY2FzZSAnb3JpZW50JzpcbiAgICAgICAgICAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShlbmNvZGluZy54KTtcbiAgICAgICAgICAgY29uc3QgeUlzTWVhc3VyZSA9IGlzTWVhc3VyZShlbmNvZGluZy55KTtcblxuICAgICAgICAgICAvLyBXaGVuIHVuYW1iaWd1b3VzLCBkbyBub3QgYWxsb3cgb3ZlcnJpZGluZ1xuICAgICAgICAgICBpZiAoeElzTWVhc3VyZSAmJiAheUlzTWVhc3VyZSkge1xuICAgICAgICAgICAgIGlmIChtYXJrID09PSBUSUNLKSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gJ3ZlcnRpY2FsJzsgLy8gaW1wbGljaXRseSB2ZXJ0aWNhbFxuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gJ2hvcml6b250YWwnOyAvLyBpbXBsaWNpdGx5IGhvcml6b250YWxcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0gZWxzZSBpZiAoIXhJc01lYXN1cmUgJiYgeUlzTWVhc3VyZSkge1xuICAgICAgICAgICAgIGlmIChtYXJrID09PSBUSUNLKSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gJ2hvcml6b250YWwnO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cblxuICAgICAgICAgICAvLyBJbiBhbWJpZ3VvdXMgY2FzZXMgKFF4USBvciBPeE8pIHVzZSBzcGVjaWZpZWQgdmFsdWVcbiAgICAgICAgICAgLy8gKGFuZCBpbXBsaWNpdGx5IHZlcnRpY2FsIGJ5IGRlZmF1bHQuKVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIC8vIHRleHQtb25seVxuICAgICAgICAgY2FzZSAnYWxpZ24nOlxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjZmdbcHJvcGVydHldID0gaGFzKGVuY29kaW5nLCBYKSA/ICdjZW50ZXInIDogJ3JpZ2h0JztcbiAgICAgICAgICB9XG4gICAgICAgfVxuICAgICAgIHJldHVybiBjZmc7XG4gICAgIH0sIHt9KSxcbiAgICAgY29uZmlnLm1hcmtcbiAgICk7XG59XG4iLCJpbXBvcnQge2F1dG9NYXhCaW5zfSBmcm9tICcuLi8uLi9iaW4nO1xuaW1wb3J0IHtDaGFubmVsLCBDT0xPUn0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGZsYXR0ZW4sIGhhc2gsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYmluIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxWZ1RyYW5zZm9ybVtdPiB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihiaW5Db21wb25lbnQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgYmluID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuYmluO1xuICAgICAgaWYgKGJpbikge1xuICAgICAgICBsZXQgYmluVHJhbnMgPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6ICdiaW4nLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZERlZi5maWVsZCxcbiAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgICAgbWlkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KSxcbiAgICAgICAgICAgIGVuZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICAgLy8gaWYgYmluIGlzIGFuIG9iamVjdCwgbG9hZCBwYXJhbWV0ZXIgaGVyZSFcbiAgICAgICAgICB0eXBlb2YgYmluID09PSAnYm9vbGVhbicgPyB7fSA6IGJpblxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghYmluVHJhbnMubWF4YmlucyAmJiAhYmluVHJhbnMuc3RlcCkge1xuICAgICAgICAgIC8vIGlmIGJvdGggbWF4YmlucyBhbmQgc3RlcCBhcmUgbm90IHNwZWNpZmllZCwgbmVlZCB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBiaW5cbiAgICAgICAgICBiaW5UcmFucy5tYXhiaW5zID0gYXV0b01heEJpbnMoY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBbYmluVHJhbnNdO1xuICAgICAgICBjb25zdCBpc09yZGluYWxDb2xvciA9IG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpIHx8IGNoYW5uZWwgPT09IENPTE9SO1xuICAgICAgICAvLyBjb2xvciByYW1wIGhhcyB0eXBlIGxpbmVhciBvciB0aW1lXG4gICAgICAgIGlmIChpc09yZGluYWxDb2xvcikge1xuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfcmFuZ2UnIH0pLFxuICAgICAgICAgICAgZXhwcjogZmllbGQoZmllbGREZWYsIHsgZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19zdGFydCcgfSkgK1xuICAgICAgICAgICAgJyArIFxcJy1cXCcgKyAnICtcbiAgICAgICAgICAgIGZpZWxkKGZpZWxkRGVmLCB7IGRhdHVtOiB0cnVlLCBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiBjdXJyZW50IG1lcmdpbmcgbG9naWMgY2FuIHByb2R1Y2UgcmVkdW5kYW50IHRyYW5zZm9ybXMgd2hlbiBhIGZpZWxkIGlzIGJpbm5lZCBmb3IgY29sb3IgYW5kIGZvciBub24tY29sb3JcbiAgICAgICAgY29uc3Qga2V5ID0gaGFzaChiaW4pICsgJ18nICsgZmllbGREZWYuZmllbGQgKyAnb2M6JyArIGlzT3JkaW5hbENvbG9yO1xuICAgICAgICBiaW5Db21wb25lbnRba2V5XSA9IHRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgLy8gRklYTUU6IGN1cnJlbnQgbWVyZ2luZyBsb2dpYyBjYW4gcHJvZHVjZSByZWR1bmRhbnQgdHJhbnNmb3JtcyB3aGVuIGEgZmllbGQgaXMgYmlubmVkIGZvciBjb2xvciBhbmQgZm9yIG5vbi1jb2xvclxuICAgICAgZXh0ZW5kKGJpbkNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmJpbik7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICB9XG4gICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZChiaW5Db21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5iaW4pO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyhjb21wb25lbnQuYmluKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q09MT1J9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPUkRJTkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBmbGF0dGVuLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogV2UgbmVlZCB0byBhZGQgYSByYW5rIHRyYW5zZm9ybSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlIHJhbmsgdmFsdWUgYXNcbiAqIGlucHV0IGZvciBjb2xvciByYW1wJ3MgbGluZWFyIHNjYWxlLlxuICovXG5leHBvcnQgbmFtZXNwYWNlIGNvbG9yUmFuayB7XG4gIC8qKlxuICAgKiBSZXR1cm4gaGFzaCBkaWN0IGZyb20gYSBjb2xvciBmaWVsZCdzIG5hbWUgdG8gdGhlIHNvcnQgYW5kIHJhbmsgdHJhbnNmb3Jtc1xuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpIHtcbiAgICBsZXQgY29sb3JSYW5rQ29tcG9uZW50OiBEaWN0PFZnVHJhbnNmb3JtW10+ID0ge307XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgbW9kZWwuZmllbGREZWYoQ09MT1IpLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgIGNvbG9yUmFua0NvbXBvbmVudFttb2RlbC5maWVsZChDT0xPUildID0gW3tcbiAgICAgICAgdHlwZTogJ3NvcnQnLFxuICAgICAgICBieTogbW9kZWwuZmllbGQoQ09MT1IpXG4gICAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyYW5rJyxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgcmFuazogbW9kZWwuZmllbGQoQ09MT1IsIHsgcHJlZm46ICdyYW5rXycgfSlcbiAgICAgICAgfVxuICAgICAgfV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvclJhbmtDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBjb25zaWRlciBtZXJnaW5nXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBUT0RPOiB3ZSBoYXZlIHRvIHNlZSBpZiBjb2xvciBoYXMgdW5pb24gc2NhbGUgaGVyZVxuXG4gICAgICAvLyBGb3Igbm93LCBsZXQncyBhc3N1bWUgaXQgYWx3YXlzIGhhcyB1bmlvbiBzY2FsZVxuICAgICAgY29uc3QgY29sb3JSYW5rQ29tcG9uZW50ID0gY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuaztcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIERpY3Q8VmdUcmFuc2Zvcm1bXT47XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBjb2xvclJhbmtDb21wb25lbnQgPSB7fSBhcyBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKGNvbG9yUmFua0NvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuayk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKGNvbXBvbmVudC5jb2xvclJhbmspKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGb3JtdWxhfSBmcm9tICcuLi8uLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtrZXlzLCBEaWN0LCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtzb3VyY2V9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7Zm9ybWF0UGFyc2V9IGZyb20gJy4vZm9ybWF0cGFyc2UnO1xuaW1wb3J0IHtudWxsRmlsdGVyfSBmcm9tICcuL251bGxmaWx0ZXInO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7YmlufSBmcm9tICcuL2Jpbic7XG5pbXBvcnQge2Zvcm11bGF9IGZyb20gJy4vZm9ybXVsYSc7XG5pbXBvcnQge25vblBvc2l0aXZlRmlsdGVyfSBmcm9tICcuL25vbnBvc2l0aXZlbnVsbGZpbHRlcic7XG5pbXBvcnQge3N1bW1hcnl9IGZyb20gJy4vc3VtbWFyeSc7XG5pbXBvcnQge3N0YWNrU2NhbGV9IGZyb20gJy4vc3RhY2tzY2FsZSc7XG5pbXBvcnQge3RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7dGltZVVuaXREb21haW59IGZyb20gJy4vdGltZXVuaXRkb21haW4nO1xuaW1wb3J0IHtjb2xvclJhbmt9IGZyb20gJy4vY29sb3JyYW5rJztcblxuXG4vKipcbiAqIENvbXBvc2FibGUgY29tcG9uZW50IGluc3RhbmNlIG9mIGEgbW9kZWwncyBkYXRhLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGFDb21wb25lbnQge1xuICBzb3VyY2U6IFZnRGF0YTtcblxuICAvKiogTWFwcGluZyBmcm9tIGZpZWxkIG5hbWUgdG8gcHJpbWl0aXZlIGRhdGEgdHlwZS4gICovXG4gIGZvcm1hdFBhcnNlOiBEaWN0PHN0cmluZz47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgZmllbGRzIGZvciBudWxsIGZpbHRlcmluZyAqL1xuICBudWxsRmlsdGVyOiBEaWN0PGJvb2xlYW4+O1xuXG4gIC8qKiBIYXNoc2V0IG9mIGEgZm9ybXVsYSBvYmplY3QgKi9cbiAgY2FsY3VsYXRlOiBEaWN0PEZvcm11bGE+O1xuXG4gIC8qKiBGaWx0ZXIgdGVzdCBleHByZXNzaW9uICovXG4gIGZpbHRlcjogc3RyaW5nO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYSBiaW4gcGFyYW1ldGVyIGhhc2ggdG8gdHJhbnNmb3JtcyBvZiB0aGUgYmlubmVkIGZpZWxkICovXG4gIGJpbjogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGFuIG91dHB1dCBmaWVsZCBuYW1lIChoYXNoKSB0byB0aGUgdGltZSB1bml0IHRyYW5zZm9ybSAgKi9cbiAgdGltZVVuaXQ6IERpY3Q8VmdUcmFuc2Zvcm0+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIGZpZWxkcyB0byBiZSBmaWx0ZXJlZCAqL1xuICBub25Qb3NpdGl2ZUZpbHRlcjogRGljdDxib29sZWFuPjtcblxuICAvKiogRGF0YSBzb3VyY2UgZm9yIGZlZWRpbmcgc3RhY2tlZCBzY2FsZS4gKi9cbiAgLy8gVE9ETzogbmVlZCB0byByZXZpc2UgaWYgc2luZ2xlIFZnRGF0YSBpcyBzdWZmaWNpZW50IHdpdGggbGF5ZXIgLyBjb25jYXRcbiAgc3RhY2tTY2FsZTogVmdEYXRhO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYW4gb3V0cHV0IGZpZWxkIG5hbWUgKGhhc2gpIHRvIHRoZSBzb3J0IGFuZCByYW5rIHRyYW5zZm9ybXMgICovXG4gIGNvbG9yUmFuazogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiB0aW1lIHVuaXRzIHRoYXQgbmVlZCB0aGVpciBvd24gZGF0YSBzb3VyY2VzIGZvciBzY2FsZSBkb21haW4gKi9cbiAgdGltZVVuaXREb21haW46IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2Ygc3VtbWFyeSBjb21wb25lbnQgb2JqZWN0IGZvciBwcm9kdWNpbmcgc3VtbWFyeSAoYWdncmVnYXRlKSBkYXRhIHNvdXJjZSAqL1xuICBzdW1tYXJ5OiBTdW1tYXJ5Q29tcG9uZW50W107XG59XG5cbi8qKlxuICogQ29tcG9zYWJsZSBjb21wb25lbnQgZm9yIGEgbW9kZWwncyBzdW1tYXJ5IGRhdGFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdW1tYXJ5Q29tcG9uZW50IHtcbiAgLyoqIE5hbWUgb2YgdGhlIHN1bW1hcnkgZGF0YSBzb3VyY2UgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBTdHJpbmcgc2V0IGZvciBhbGwgZGltZW5zaW9uIGZpZWxkcyAgKi9cbiAgZGltZW5zaW9uczogU3RyaW5nU2V0O1xuXG4gIC8qKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSB0byBzdHJpbmcgc2V0IG9mIGFnZ3JlZ2F0ZSBvcHMgKi9cbiAgbWVhc3VyZXM6IERpY3Q8U3RyaW5nU2V0Pjtcbn1cblxuLy8gVE9ETzogc3BsaXQgdGhpcyBmaWxlIGludG8gbXVsdGlwbGUgZmlsZXMgYW5kIHJlbW92ZSB0aGlzIGxpbnRlciBmbGFnXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdERhdGEobW9kZWw6IFVuaXRNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG51bGxGaWx0ZXI6IG51bGxGaWx0ZXIucGFyc2VVbml0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuXG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VVbml0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VVbml0KG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VVbml0KG1vZGVsKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldERhdGEobW9kZWw6IEZhY2V0TW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VGYWNldChtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VGYWNldChtb2RlbCksXG5cbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VGYWNldChtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VGYWNldChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VGYWNldChtb2RlbClcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXJEYXRhKG1vZGVsOiBMYXllck1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgLy8gZmlsdGVyIGFuZCBmb3JtYXRQYXJzZSBjb3VsZCBjYXVzZSB1cyB0byBub3QgYmUgYWJsZSB0byBtZXJnZSBpbnRvIHBhcmVudFxuICAgIC8vIHNvIGxldCdzIHBhcnNlIHRoZW0gZmlyc3RcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VMYXllcihtb2RlbCksXG5cbiAgICAvLyBldmVyeXRoaW5nIGFmdGVyIGhlcmUgZG9lcyBub3QgYWZmZWN0IHdoZXRoZXIgd2UgY2FuIG1lcmdlIGNoaWxkIGRhdGEgaW50byBwYXJlbnQgb3Igbm90XG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgYmluOiBiaW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICB0aW1lVW5pdERvbWFpbjogdGltZVVuaXREb21haW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGNvbG9yUmFuazogY29sb3JSYW5rLnBhcnNlTGF5ZXIobW9kZWwpXG4gIH07XG59XG5cblxuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuLyoqXG4gKiBDcmVhdGVzIFZlZ2EgRGF0YSBhcnJheSBmcm9tIGEgZ2l2ZW4gY29tcGlsZWQgbW9kZWwgYW5kIGFwcGVuZCBhbGwgb2YgdGhlbSB0byB0aGUgZ2l2ZW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0gIG1vZGVsXG4gKiBAcGFyYW0gIGRhdGEgYXJyYXlcbiAqIEByZXR1cm4gbW9kaWZpZWQgZGF0YSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVEYXRhKG1vZGVsOiBNb2RlbCwgZGF0YTogVmdEYXRhW10pIHtcbiAgY29uc3QgY29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmRhdGE7XG5cbiAgY29uc3Qgc291cmNlRGF0YSA9IHNvdXJjZS5hc3NlbWJsZShtb2RlbCwgY29tcG9uZW50KTtcbiAgaWYgKHNvdXJjZURhdGEpIHtcbiAgICBkYXRhLnB1c2goc291cmNlRGF0YSk7XG4gIH1cblxuICBzdW1tYXJ5LmFzc2VtYmxlKGNvbXBvbmVudCwgbW9kZWwpLmZvckVhY2goZnVuY3Rpb24oc3VtbWFyeURhdGEpIHtcbiAgICBkYXRhLnB1c2goc3VtbWFyeURhdGEpO1xuICB9KTtcblxuICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGF0YVRhYmxlID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gY29sb3IgcmFua1xuICAgIGNvbnN0IGNvbG9yUmFua1RyYW5zZm9ybSA9IGNvbG9yUmFuay5hc3NlbWJsZShjb21wb25lbnQpO1xuICAgIGlmIChjb2xvclJhbmtUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQoY29sb3JSYW5rVHJhbnNmb3JtKTtcbiAgICB9XG5cbiAgICAvLyBub25Qb3NpdGl2ZUZpbHRlclxuICAgIGNvbnN0IG5vblBvc2l0aXZlRmlsdGVyVHJhbnNmb3JtID0gbm9uUG9zaXRpdmVGaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgICBpZiAobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5cyhjb21wb25lbnQuY29sb3JSYW5rKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sb3JSYW5rIG5vdCBtZXJnZWQnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMoY29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbm9uUG9zaXRpdmVGaWx0ZXIgbm90IG1lcmdlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN0YWNrXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGlzIGFjdHVhbGx5IHNob3VsZCBiZSBhbiBhcnJheVxuICBjb25zdCBzdGFja0RhdGEgPSBzdGFja1NjYWxlLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gIGlmIChzdGFja0RhdGEpIHtcbiAgICBkYXRhLnB1c2goc3RhY2tEYXRhKTtcbiAgfVxuXG4gIHRpbWVVbml0RG9tYWluLmFzc2VtYmxlKGNvbXBvbmVudCkuZm9yRWFjaChmdW5jdGlvbih0aW1lVW5pdERvbWFpbkRhdGEpIHtcbiAgICBkYXRhLnB1c2godGltZVVuaXREb21haW5EYXRhKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgZmlsdGVyIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbW9kZWwudHJhbnNmb3JtKCkuZmlsdGVyO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSBidXQgaGFzIGZpbHRlciwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyKSB7XG4gICAgICAvLyBtZXJnZSBieSBhZGRpbmcgJiZcbiAgICAgIGZpbHRlckNvbXBvbmVudCA9XG4gICAgICAgIChmaWx0ZXJDb21wb25lbnQgPyBmaWx0ZXJDb21wb25lbnQgKyAnICYmICcgOiAnJykgK1xuICAgICAgICBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIE5vdGUgdGhhdCB0aGlzIGBmaWx0ZXIucGFyc2VMYXllcmAgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgYHNvdXJjZS5wYXJzZUxheWVyYFxuICAgIGxldCBmaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlciAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyID09PSBmaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgICAgLy8gc2FtZSBmaWx0ZXIgaW4gY2hpbGQgc28gd2UgY2FuIGp1c3QgZGVsZXRlIGl0XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgY29uc3QgZmlsdGVyID0gY29tcG9uZW50LmZpbHRlcjtcbiAgICByZXR1cm4gZmlsdGVyID8gW3tcbiAgICAgIHR5cGU6ICdmaWx0ZXInLFxuICAgICAgdGVzdDogZmlsdGVyXG4gICAgfV0gOiBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGaWVsZERlZiwgaXNDb3VudH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCBkaWZmZXIsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGZvcm1hdFBhcnNlIHtcbiAgLy8gVE9ETzogbmVlZCB0byB0YWtlIGNhbGN1bGF0ZSBpbnRvIGFjY291bnQgYWNyb3NzIGxldmVscyB3aGVuIG1lcmdpbmdcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxzdHJpbmc+IHtcbiAgICBjb25zdCBjYWxjRmllbGRNYXAgPSAobW9kZWwudHJhbnNmb3JtKCkuY2FsY3VsYXRlIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oZmllbGRNYXAsIGZvcm11bGEpIHtcbiAgICAgIGZpZWxkTWFwW2Zvcm11bGEuZmllbGRdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmaWVsZE1hcDtcbiAgICB9LCB7fSk7XG5cbiAgICBsZXQgcGFyc2VDb21wb25lbnQ6IERpY3Q8c3RyaW5nPiA9IHt9O1xuICAgIC8vIHVzZSBmb3JFYWNoIHJhdGhlciB0aGFuIHJlZHVjZSBzbyB0aGF0IGl0IGNhbiByZXR1cm4gdW5kZWZpbmVkXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gcGFyc2UgbmVlZGVkXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgICBwYXJzZUNvbXBvbmVudFtmaWVsZERlZi5maWVsZF0gPSAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBpZiAoaXNDb3VudChmaWVsZERlZikgfHwgY2FsY0ZpZWxkTWFwW2ZpZWxkRGVmLmZpZWxkXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZUNvbXBvbmVudFtmaWVsZERlZi5maWVsZF0gPSAnbnVtYmVyJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgcGFyc2VDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgYnV0IGhhcyBpdHMgb3duIHBhcnNlLCB0aGVuIG1lcmdlXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKSB7XG4gICAgICBleHRlbmQocGFyc2VDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcbiAgICBsZXQgcGFyc2VDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UsIHBhcnNlQ29tcG9uZW50KSkge1xuICAgICAgICAvLyBtZXJnZSBwYXJzZSB1cCBpZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhbiBpbmNvbXBhdGlibGUgcGFyc2VcbiAgICAgICAgZXh0ZW5kKHBhcnNlQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIC8vIEFzc2VtYmxlIGZvciBmb3JtYXRQYXJzZSBpcyBhbiBpZGVudGl0eSBmdW5jdGlvbiwgbm8gbmVlZCB0byBkZWNsYXJlXG59XG4iLCJpbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uLy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgaGFzaCwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIGZvcm11bGEge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PEZvcm11bGE+IHtcbiAgICByZXR1cm4gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKGZvcm11bGFDb21wb25lbnQsIGZvcm11bGEpIHtcbiAgICAgIGZvcm11bGFDb21wb25lbnRbaGFzaChmb3JtdWxhKV0gPSBmb3JtdWxhO1xuICAgICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gICAgfSwge30gYXMgRGljdDxGb3JtdWxhPik7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgZm9ybXVsYUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKGZvcm11bGFDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGU7XG4gICAgfVxuICAgIHJldHVybiBmb3JtdWxhQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgZm9ybXVsYUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlKSB7XG4gICAgICAgIGV4dGVuZChmb3JtdWxhQ29tcG9uZW50IHx8IHt9LCBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIHZhbHMoY29tcG9uZW50LmNhbGN1bGF0ZSkucmVkdWNlKGZ1bmN0aW9uKHRyYW5zZm9ybSwgZm9ybXVsYSkge1xuICAgICAgdHJhbnNmb3JtLnB1c2goZXh0ZW5kKHsgdHlwZTogJ2Zvcm11bGEnIH0sIGZvcm11bGEpKTtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfSwgW10pO1xuICB9XG59XG4iLCJpbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBGaWx0ZXIgbm9uLXBvc2l0aXZlIHZhbHVlIGZvciBsb2cgc2NhbGVcbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBub25Qb3NpdGl2ZUZpbHRlciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIG1vZGVsLmNoYW5uZWxzKCkucmVkdWNlKGZ1bmN0aW9uKG5vblBvc2l0aXZlQ29tcG9uZW50LCBjaGFubmVsKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgaWYgKCFtb2RlbC5maWVsZChjaGFubmVsKSB8fCAhc2NhbGUpIHtcbiAgICAgICAgLy8gZG9uJ3Qgc2V0IGFueXRoaW5nXG4gICAgICAgIHJldHVybiBub25Qb3NpdGl2ZUNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIG5vblBvc2l0aXZlQ29tcG9uZW50W21vZGVsLmZpZWxkKGNoYW5uZWwpXSA9IHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5MT0c7XG4gICAgICByZXR1cm4gbm9uUG9zaXRpdmVDb21wb25lbnQ7XG4gICAgfSwge30gYXMgRGljdDxib29sZWFuPik7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBjb25zaWRlciBtZXJnaW5nXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBGb3Igbm93LCBsZXQncyBhc3N1bWUgaXQgYWx3YXlzIGhhcyB1bmlvbiBzY2FsZVxuICAgICAgY29uc3Qgbm9uUG9zaXRpdmVGaWx0ZXJDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgcmV0dXJuIG5vblBvc2l0aXZlRmlsdGVyQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgRGljdDxib29sZWFuPjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuICAgIGxldCBub25Qb3NpdGl2ZUZpbHRlciA9IHt9IGFzIERpY3Q8Ym9vbGVhbj47XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlciwgbm9uUG9zaXRpdmVGaWx0ZXIpKSB7XG4gICAgICAgIGV4dGVuZChub25Qb3NpdGl2ZUZpbHRlciwgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBub25Qb3NpdGl2ZUZpbHRlcjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4ga2V5cyhjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIC8vIE9ubHkgZmlsdGVyIGZpZWxkcyAoa2V5cykgd2l0aCB2YWx1ZSA9IHRydWVcbiAgICAgIHJldHVybiBjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXJbZmllbGRdO1xuICAgIH0pLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6ICdkYXR1bS4nICsgZmllbGQgKyAnID4gMCdcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBkaWZmZXIsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmNvbnN0IERFRkFVTFRfTlVMTF9GSUxURVJTID0ge1xuICBub21pbmFsOiBmYWxzZSxcbiAgb3JkaW5hbDogZmFsc2UsXG4gIHF1YW50aXRhdGl2ZTogdHJ1ZSxcbiAgdGVtcG9yYWw6IHRydWVcbn07XG5cbmV4cG9ydCBuYW1lc3BhY2UgbnVsbEZpbHRlciB7XG4gIC8qKiBSZXR1cm4gSGFzaHNldCBvZiBmaWVsZHMgZm9yIG51bGwgZmlsdGVyaW5nIChrZXk9ZmllbGQsIHZhbHVlID0gdHJ1ZSkuICovXG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZpbHRlck51bGwgPSBtb2RlbC50cmFuc2Zvcm0oKS5maWx0ZXJOdWxsO1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oYWdncmVnYXRvciwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmlsdGVyTnVsbCB8fFxuICAgICAgICAoZmlsdGVyTnVsbCA9PT0gdW5kZWZpbmVkICYmIGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkICE9PSAnKicgJiYgREVGQVVMVF9OVUxMX0ZJTFRFUlNbZmllbGREZWYudHlwZV0pKSB7XG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlZmluZSB0aGlzIHNvIHdlIGtub3cgdGhhdCB3ZSBkb24ndCBmaWx0ZXIgbnVsbHMgZm9yIHRoaXMgZmllbGRcbiAgICAgICAgLy8gdGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gbWVyZ2UgaW50byBwYXJlbnRzXG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgbnVsbEZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcblxuICAgIC8vIEZJWE1FOiBudWxsIGZpbHRlcnMgYXJlIG5vdCBwcm9wZXJseSBwcm9wYWdhdGVkIHJpZ2h0IG5vd1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlciwgbnVsbEZpbHRlckNvbXBvbmVudCkpIHtcbiAgICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKiogQ29udmVydCB0aGUgaGFzaHNldCBvZiBmaWVsZHMgdG8gYSBmaWx0ZXIgdHJhbnNmb3JtLiAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIGNvbnN0IGZpbHRlcmVkRmllbGRzID0ga2V5cyhjb21wb25lbnQubnVsbEZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gb25seSBpbmNsdWRlIGZpZWxkcyB0aGF0IGhhcyB2YWx1ZSA9IHRydWVcbiAgICAgIHJldHVybiBjb21wb25lbnQubnVsbEZpbHRlcltmaWVsZF07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkRmllbGRzLmxlbmd0aCA+IDAgP1xuICAgICAgW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlcmVkRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJyhkYXR1bS4nICsgZmllbGROYW1lICsgJyE9PW51bGwnICtcbiAgICAgICAgICAgICcgJiYgIWlzTmFOKGRhdHVtLicrIGZpZWxkTmFtZSArICcpKSc7XG4gICAgICAgIH0pLmpvaW4oJyAmJiAnKVxuICAgICAgfV0gOiBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTT1VSQ0V9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtjb250YWluc30gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHNvdXJjZSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFZnRGF0YSB7XG4gICAgbGV0IGRhdGEgPSBtb2RlbC5kYXRhKCk7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBleHBsaWNpdGx5IHByb3ZpZGVkXG5cbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSB7IG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkgfTtcbiAgICAgIGlmIChkYXRhLnZhbHVlcyAmJiBkYXRhLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNvdXJjZURhdGEudmFsdWVzID0gbW9kZWwuZGF0YSgpLnZhbHVlcztcbiAgICAgICAgc291cmNlRGF0YS5mb3JtYXQgPSB7IHR5cGU6ICdqc29uJyB9O1xuICAgICAgfSBlbHNlIGlmIChkYXRhLnVybCkge1xuICAgICAgICBzb3VyY2VEYXRhLnVybCA9IGRhdGEudXJsO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgZXh0ZW5zaW9uIGZyb20gVVJMIHVzaW5nIHNuaXBwZXQgZnJvbVxuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzY4MDkyOS9ob3ctdG8tZXh0cmFjdC1leHRlbnNpb24tZnJvbS1maWxlbmFtZS1zdHJpbmctaW4tamF2YXNjcmlwdFxuICAgICAgICBsZXQgZGVmYXVsdEV4dGVuc2lvbiA9IC8oPzpcXC4oW14uXSspKT8kLy5leGVjKHNvdXJjZURhdGEudXJsKVsxXTtcbiAgICAgICAgaWYgKCFjb250YWlucyhbJ2pzb24nLCAnY3N2JywgJ3RzdiddLCBkZWZhdWx0RXh0ZW5zaW9uKSkge1xuICAgICAgICAgIGRlZmF1bHRFeHRlbnNpb24gPSAnanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlRGF0YS5mb3JtYXQgPSB7IHR5cGU6IG1vZGVsLmRhdGEoKS5mb3JtYXRUeXBlIHx8IGRlZmF1bHRFeHRlbnNpb24gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICAgIH0gZWxzZSBpZiAoIW1vZGVsLnBhcmVudCgpKSB7XG4gICAgICAvLyBJZiBkYXRhIGlzIG5vdCBleHBsaWNpdGx5IHByb3ZpZGVkIGJ1dCB0aGUgbW9kZWwgaXMgYSByb290LFxuICAgICAgLy8gbmVlZCB0byBwcm9kdWNlIGEgc291cmNlIGFzIHdlbGxcbiAgICAgIHJldHVybiB7IG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBzb3VyY2VEYXRhID0gcGFyc2UobW9kZWwpO1xuICAgIGlmICghbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YS5zb3VyY2UpIHtcbiAgICAgIC8vIElmIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGl0cyBvd24gc291cmNlLCBoYXZlIHRvIHJlbmFtZSBpdHMgc291cmNlLlxuICAgICAgbW9kZWwuY2hpbGQoKS5yZW5hbWVEYXRhKG1vZGVsLmNoaWxkKCkuZGF0YU5hbWUoU09VUkNFKSwgbW9kZWwuZGF0YU5hbWUoU09VUkNFKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBzb3VyY2VEYXRhID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YSA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkpIHtcbiAgICAgICAgLy8gd2UgY2Fubm90IG1lcmdlIGlmIHRoZSBjaGlsZCBoYXMgZmlsdGVycyBkZWZpbmVkIGV2ZW4gYWZ0ZXIgd2UgdHJpZWQgdG8gbW92ZSB0aGVtIHVwXG4gICAgICAgIGNvbnN0IGNhbk1lcmdlID0gIWNoaWxkRGF0YS5maWx0ZXIgJiYgIWNoaWxkRGF0YS5mb3JtYXRQYXJzZSAmJiAhY2hpbGREYXRhLm51bGxGaWx0ZXI7XG4gICAgICAgIGlmIChjYW5NZXJnZSkge1xuICAgICAgICAgIC8vIHJlbmFtZSBzb3VyY2UgYmVjYXVzZSB3ZSBjYW4ganVzdCByZW1vdmUgaXRcbiAgICAgICAgICBjaGlsZC5yZW5hbWVEYXRhKGNoaWxkLmRhdGFOYW1lKFNPVVJDRSksIG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkpO1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZERhdGEuc291cmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNoaWxkIGRvZXMgbm90IGhhdmUgZGF0YSBkZWZpbmVkIG9yIHRoZSBzYW1lIHNvdXJjZSBzbyBqdXN0IHVzZSB0aGUgcGFyZW50cyBzb3VyY2VcbiAgICAgICAgICBjaGlsZERhdGEuc291cmNlID0ge1xuICAgICAgICAgICAgbmFtZTogY2hpbGQuZGF0YU5hbWUoU09VUkNFKSxcbiAgICAgICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShtb2RlbDogTW9kZWwsIGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIGlmIChjb21wb25lbnQuc291cmNlKSB7XG4gICAgICBsZXQgc291cmNlRGF0YTogVmdEYXRhID0gY29tcG9uZW50LnNvdXJjZTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5mb3JtYXRQYXJzZSkge1xuICAgICAgICBjb21wb25lbnQuc291cmNlLmZvcm1hdCA9IGNvbXBvbmVudC5zb3VyY2UuZm9ybWF0IHx8IHt9O1xuICAgICAgICBjb21wb25lbnQuc291cmNlLmZvcm1hdC5wYXJzZSA9IGNvbXBvbmVudC5mb3JtYXRQYXJzZTtcbiAgICAgIH1cblxuICAgICAgLy8gbnVsbCBmaWx0ZXIgY29tZXMgZmlyc3Qgc28gdHJhbnNmb3JtcyBhcmUgbm90IHBlcmZvcm1lZCBvbiBudWxsIHZhbHVlc1xuICAgICAgLy8gdGltZSBhbmQgYmluIHNob3VsZCBjb21lIGJlZm9yZSBmaWx0ZXIgc28gd2UgY2FuIGZpbHRlciBieSB0aW1lIGFuZCBiaW5cbiAgICAgIHNvdXJjZURhdGEudHJhbnNmb3JtID0gW10uY29uY2F0KFxuICAgICAgICBudWxsRmlsdGVyLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIGZvcm11bGEuYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgZmlsdGVyLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIGJpbi5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICB0aW1lVW5pdC5hc3NlbWJsZShjb21wb25lbnQpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7U1RBQ0tFRF9TQ0FMRSwgU1VNTUFSWX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLy4uL3VuaXQnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuLyoqXG4gKiBTdGFja2VkIHNjYWxlIGRhdGEgc291cmNlLCBmb3IgZmVlZGluZyB0aGUgc2hhcmVkIHNjYWxlLlxuICovXG5leHBvcnQgbmFtZXNwYWNlIHN0YWNrU2NhbGUge1xuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBVbml0TW9kZWwpOiBWZ0RhdGEge1xuICAgIGNvbnN0IHN0YWNrUHJvcHMgPSBtb2RlbC5zdGFjaygpO1xuXG4gICAgaWYgKHN0YWNrUHJvcHMpIHtcbiAgICAgIC8vIHByb2R1Y2Ugc3RhY2tlZCBzY2FsZVxuICAgICAgY29uc3QgZ3JvdXBieUNoYW5uZWwgPSBzdGFja1Byb3BzLmdyb3VwYnlDaGFubmVsO1xuICAgICAgY29uc3QgZmllbGRDaGFubmVsID0gc3RhY2tQcm9wcy5maWVsZENoYW5uZWw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShTVEFDS0VEX1NDQUxFKSxcbiAgICAgICAgc291cmNlOiBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKSwgLy8gYWx3YXlzIHN1bW1hcnkgYmVjYXVzZSBzdGFja2VkIG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGlvblxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgLy8gZ3JvdXAgYnkgY2hhbm5lbCBhbmQgb3RoZXIgZmFjZXRzXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKGdyb3VwYnlDaGFubmVsKV0sXG4gICAgICAgICAgLy8gcHJvZHVjZSBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICAgICAgc3VtbWFyaXplOiBbeyBvcHM6IFsnc3VtJ10sIGZpZWxkOiBtb2RlbC5maWVsZChmaWVsZENoYW5uZWwpIH1dXG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCBidXQgaGFzIHN0YWNrIHNjYWxlIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuc3RhY2tTY2FsZSkge1xuICAgICAgbGV0IHN0YWNrQ29tcG9uZW50ID0gY2hpbGREYXRhQ29tcG9uZW50LnN0YWNrU2NhbGU7XG5cbiAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5kYXRhTmFtZShTVEFDS0VEX1NDQUxFKTtcbiAgICAgIGNoaWxkLnJlbmFtZURhdGEoc3RhY2tDb21wb25lbnQubmFtZSwgbmV3TmFtZSk7XG4gICAgICBzdGFja0NvbXBvbmVudC5uYW1lID0gbmV3TmFtZTtcblxuICAgICAgLy8gUmVmZXIgdG8gZmFjZXQncyBzdW1tYXJ5IGluc3RlYWQgKGFsd2F5cyBzdW1tYXJ5IGJlY2F1c2Ugc3RhY2tlZCBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRpb24pXG4gICAgICBzdGFja0NvbXBvbmVudC5zb3VyY2UgPSBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKTtcblxuICAgICAgLy8gQWRkIG1vcmUgZGltZW5zaW9ucyBmb3Igcm93L2NvbHVtblxuICAgICAgc3RhY2tDb21wb25lbnQudHJhbnNmb3JtWzBdLmdyb3VwYnkgPSBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oZ3JvdXBieSwgZmllbGREZWYpIHtcbiAgICAgICAgZ3JvdXBieS5wdXNoKGZpZWxkKGZpZWxkRGVmKSk7XG4gICAgICAgIHJldHVybiBncm91cGJ5O1xuICAgICAgfSwgc3RhY2tDb21wb25lbnQudHJhbnNmb3JtWzBdLmdyb3VwYnkpO1xuXG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnN0YWNrU2NhbGU7XG4gICAgICByZXR1cm4gc3RhY2tDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBUT0RPXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zdGFja1NjYWxlO1xuICB9XG59XG4iLCJpbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuLi8uLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7U09VUkNFLCBTVU1NQVJZfSBmcm9tICcuLi8uLi9kYXRhJztcbmltcG9ydCB7ZmllbGQsIEZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2tleXMsIHZhbHMsIHJlZHVjZSwgaGFzaCwgRGljdCwgU3RyaW5nU2V0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudCwgU3VtbWFyeUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIHN1bW1hcnkge1xuICBmdW5jdGlvbiBhZGREaW1lbnNpb24oZGltczogeyBbZmllbGQ6IHN0cmluZ106IGJvb2xlYW4gfSwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pXSA9IHRydWU7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXSA9IHRydWU7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXSA9IHRydWU7XG5cbiAgICAgIC8vIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICAvLyBpZiAoc2NhbGVUeXBlKHNjYWxlLCBmaWVsZERlZiwgY2hhbm5lbCwgbW9kZWwubWFyaygpKSA9PT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICAgIC8vIGFsc28gcHJvZHVjZSBiaW5fcmFuZ2UgaWYgdGhlIGJpbm5lZCBmaWVsZCB1c2Ugb3JkaW5hbCBzY2FsZVxuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfcmFuZ2UnIH0pXSA9IHRydWU7XG4gICAgICAvLyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYpXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBkaW1zO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIC8qIHN0cmluZyBzZXQgZm9yIGRpbWVuc2lvbnMgKi9cbiAgICBsZXQgZGltczogU3RyaW5nU2V0ID0ge307XG5cbiAgICAvKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSA9PiBkaWN0IHNldCBvZiBhZ2dyZWdhdGlvbiBmdW5jdGlvbnMgKi9cbiAgICBsZXQgbWVhczogRGljdDxTdHJpbmdTZXQ+ID0ge307XG5cbiAgICBtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkge1xuICAgICAgICBpZiAoZmllbGREZWYuYWdncmVnYXRlID09PSBBZ2dyZWdhdGVPcC5DT1VOVCkge1xuICAgICAgICAgIG1lYXNbJyonXSA9IG1lYXNbJyonXSB8fCB7fTtcbiAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICAgIG1lYXNbJyonXVsnY291bnQnXSA9IHRydWU7XG4gICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdID0gbWVhc1tmaWVsZERlZi5maWVsZF0gfHwge307XG4gICAgICAgICAgbWVhc1tmaWVsZERlZi5maWVsZF1bZmllbGREZWYuYWdncmVnYXRlXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZERpbWVuc2lvbihkaW1zLCBmaWVsZERlZik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gW3tcbiAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpLFxuICAgICAgZGltZW5zaW9uczogZGltcyxcbiAgICAgIG1lYXN1cmVzOiBtZWFzXG4gICAgfV07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlIGJ1dCBoYXMgYSBzdW1tYXJ5IGRhdGEgc291cmNlLCBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgbGV0IHN1bW1hcnlDb21wb25lbnRzID0gY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkubWFwKGZ1bmN0aW9uKHN1bW1hcnlDb21wb25lbnQpIHtcbiAgICAgICAgLy8gYWRkIGZhY2V0IGZpZWxkcyBhcyBkaW1lbnNpb25zXG4gICAgICAgIHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucyA9IG1vZGVsLnJlZHVjZShhZGREaW1lbnNpb24sIHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucyk7XG5cbiAgICAgICAgY29uc3Qgc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4ID0gc3VtbWFyeUNvbXBvbmVudC5uYW1lLnN1YnN0cihtb2RlbC5jaGlsZCgpLm5hbWUoJycpLmxlbmd0aCk7XG4gICAgICAgIG1vZGVsLmNoaWxkKCkucmVuYW1lRGF0YShzdW1tYXJ5Q29tcG9uZW50Lm5hbWUsIHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgIHN1bW1hcnlDb21wb25lbnQubmFtZSA9IHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeDtcbiAgICAgICAgcmV0dXJuIHN1bW1hcnlDb21wb25lbnQ7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5O1xuICAgICAgcmV0dXJuIHN1bW1hcnlDb21wb25lbnRzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZU1lYXN1cmVzKHBhcmVudE1lYXN1cmVzOiBEaWN0PERpY3Q8Ym9vbGVhbj4+LCBjaGlsZE1lYXN1cmVzOiBEaWN0PERpY3Q8Ym9vbGVhbj4+KSB7XG4gICAgZm9yIChjb25zdCBmaWVsZCBpbiBjaGlsZE1lYXN1cmVzKSB7XG4gICAgICBpZiAoY2hpbGRNZWFzdXJlcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcbiAgICAgICAgLy8gd2hlbiB3ZSBtZXJnZSBhIG1lYXN1cmUsIHdlIGVpdGhlciBoYXZlIHRvIGFkZCBhbiBhZ2dyZWdhdGlvbiBvcGVyYXRvciBvciBldmVuIGEgbmV3IGZpZWxkXG4gICAgICAgIGNvbnN0IG9wcyA9IGNoaWxkTWVhc3VyZXNbZmllbGRdO1xuICAgICAgICBmb3IgKGNvbnN0IG9wIGluIG9wcykge1xuICAgICAgICAgIGlmIChvcHMuaGFzT3duUHJvcGVydHkob3ApKSB7XG4gICAgICAgICAgICBpZiAoZmllbGQgaW4gcGFyZW50TWVhc3VyZXMpIHtcbiAgICAgICAgICAgICAgLy8gYWRkIG9wZXJhdG9yIHRvIGV4aXN0aW5nIG1lYXN1cmUgZmllbGRcbiAgICAgICAgICAgICAgcGFyZW50TWVhc3VyZXNbZmllbGRdW29wXSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJlbnRNZWFzdXJlc1tmaWVsZF0gPSB7IG9wOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIC8vIEluZGV4IGJ5IHRoZSBmaWVsZHMgd2UgYXJlIGdyb3VwaW5nIGJ5XG4gICAgbGV0IHN1bW1hcmllcyA9IHt9IGFzIERpY3Q8U3VtbWFyeUNvbXBvbmVudD47XG5cbiAgICAvLyBDb21iaW5lIHN1bW1hcmllcyBmb3IgY2hpbGRyZW4gdGhhdCBkb24ndCBoYXZlIGEgZGlzdGluY3Qgc291cmNlXG4gICAgLy8gKGVpdGhlciBoYXZpbmcgaXRzIG93biBkYXRhIHNvdXJjZSwgb3IgaXRzIG93biB0cmFuZm9ybWF0aW9uIG9mIHRoZSBzYW1lIGRhdGEgc291cmNlKS5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgICAvLyBNZXJnZSB0aGUgc3VtbWFyaWVzIGlmIHdlIGNhblxuICAgICAgICBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeS5mb3JFYWNoKChjaGlsZFN1bW1hcnkpID0+IHtcbiAgICAgICAgICAvLyBUaGUga2V5IGlzIGEgaGFzaCBiYXNlZCBvbiB0aGUgZGltZW5zaW9ucztcbiAgICAgICAgICAvLyB3ZSB1c2UgaXQgdG8gZmluZCBvdXQgd2hldGhlciB3ZSBoYXZlIGEgc3VtbWFyeSB0aGF0IHVzZXMgdGhlIHNhbWUgZ3JvdXAgYnkgZmllbGRzLlxuICAgICAgICAgIGNvbnN0IGtleSA9IGhhc2goY2hpbGRTdW1tYXJ5LmRpbWVuc2lvbnMpO1xuICAgICAgICAgIGlmIChrZXkgaW4gc3VtbWFyaWVzKSB7XG4gICAgICAgICAgICAvLyB5ZXMsIHRoZXJlIGlzIGEgc3VtbWFyeSBoYXQgd2UgbmVlZCB0byBtZXJnZSBpbnRvXG4gICAgICAgICAgICAvLyB3ZSBrbm93IHRoYXQgdGhlIGRpbWVuc2lvbnMgYXJlIHRoZSBzYW1lIHNvIHdlIG9ubHkgbmVlZCB0byBtZXJnZSB0aGUgbWVhc3VyZXNcbiAgICAgICAgICAgIG1lcmdlTWVhc3VyZXMoc3VtbWFyaWVzW2tleV0ubWVhc3VyZXMsIGNoaWxkU3VtbWFyeS5tZWFzdXJlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdpdmUgdGhlIHN1bW1hcnkgYSBuZXcgbmFtZVxuICAgICAgICAgICAgY2hpbGRTdW1tYXJ5Lm5hbWUgPSBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKSArICdfJyArIGtleXMoc3VtbWFyaWVzKS5sZW5ndGg7XG4gICAgICAgICAgICBzdW1tYXJpZXNba2V5XSA9IGNoaWxkU3VtbWFyeTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW1vdmUgc3VtbWFyeSBmcm9tIGNoaWxkXG4gICAgICAgICAgY2hpbGQucmVuYW1lRGF0YShjaGlsZC5kYXRhTmFtZShTVU1NQVJZKSwgc3VtbWFyaWVzW2tleV0ubmFtZSk7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxzKHN1bW1hcmllcyk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZW1ibGUgdGhlIHN1bW1hcnkuIE5lZWRzIGEgcmVuYW1lIGZ1bmN0aW9uIGJlY2F1c2Ugd2UgY2Fubm90IGd1YXJhbnRlZSB0aGF0IHRoZVxuICAgKiBwYXJlbnQgZGF0YSBiZWZvcmUgdGhlIGNoaWxkcmVuIGRhdGEuXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50LCBtb2RlbDogTW9kZWwpOiBWZ0RhdGFbXSB7XG4gICAgaWYgKCFjb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50LnN1bW1hcnkucmVkdWNlKGZ1bmN0aW9uKHN1bW1hcnlEYXRhLCBzdW1tYXJ5Q29tcG9uZW50KSB7XG4gICAgICBjb25zdCBkaW1zID0gc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zO1xuICAgICAgY29uc3QgbWVhcyA9IHN1bW1hcnlDb21wb25lbnQubWVhc3VyZXM7XG5cbiAgICAgIGNvbnN0IGdyb3VwYnkgPSBrZXlzKGRpbXMpO1xuXG4gICAgICAvLyBzaG9ydC1mb3JtYXQgc3VtbWFyaXplIG9iamVjdCBmb3IgVmVnYSdzIGFnZ3JlZ2F0ZSB0cmFuc2Zvcm1cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2Evd2lraS9EYXRhLVRyYW5zZm9ybXMjLWFnZ3JlZ2F0ZVxuICAgICAgY29uc3Qgc3VtbWFyaXplID0gcmVkdWNlKG1lYXMsIGZ1bmN0aW9uKGFnZ3JlZ2F0b3IsIGZuRGljdFNldCwgZmllbGQpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZF0gPSBrZXlzKGZuRGljdFNldCk7XG4gICAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgICAgfSwge30pO1xuXG4gICAgICBpZiAoa2V5cyhtZWFzKS5sZW5ndGggPiAwKSB7IC8vIGhhcyBhZ2dyZWdhdGVcbiAgICAgICAgc3VtbWFyeURhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZTogc3VtbWFyeUNvbXBvbmVudC5uYW1lLFxuICAgICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKSxcbiAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAgIGdyb3VwYnk6IGdyb3VwYnksXG4gICAgICAgICAgICBzdW1tYXJpemU6IHN1bW1hcml6ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1bW1hcnlEYXRhO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7ZmllbGQsIEZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1RFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcbmltcG9ydCB7cGFyc2VFeHByZXNzaW9ufSBmcm9tICcuLy4uL3RpbWUnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSB0aW1lVW5pdCB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8VmdUcmFuc2Zvcm0+IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0Q29tcG9uZW50LCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHJlZiA9IGZpZWxkKGZpZWxkRGVmLCB7IG5vZm46IHRydWUsIGRhdHVtOiB0cnVlIH0pO1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG5cbiAgICAgICAgY29uc3QgaGFzaCA9IGZpZWxkKGZpZWxkRGVmKTtcblxuICAgICAgICB0aW1lVW5pdENvbXBvbmVudFtoYXNoXSA9IHtcbiAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKSxcbiAgICAgICAgICBleHByOiBwYXJzZUV4cHJlc3Npb24oZmllbGREZWYudGltZVVuaXQsIHJlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgdGltZVVuaXRDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIGV4dGVuZCh0aW1lVW5pdENvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0KTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQ7XG4gICAgfVxuICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IHRpbWVVbml0Q29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZCh0aW1lVW5pdENvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0KTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgLy8ganVzdCBqb2luIHRoZSB2YWx1ZXMsIHdoaWNoIGFyZSBhbHJlYWR5IHRyYW5zZm9ybXNcbiAgICByZXR1cm4gdmFscyhjb21wb25lbnQudGltZVVuaXQpO1xuICB9XG59XG4iLCJpbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi4vLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZUV4cHJlc3Npb24sIHJhd0RvbWFpbn0gZnJvbSAnLi8uLi90aW1lJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgdGltZVVuaXREb21haW4ge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBTdHJpbmdTZXQge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXREb21haW5NYXAsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCk7XG4gICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICB0aW1lVW5pdERvbWFpbk1hcFtmaWVsZERlZi50aW1lVW5pdF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXREb21haW5NYXA7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgLy8gYWx3YXlzIG1lcmdlIHdpdGggY2hpbGRcbiAgICByZXR1cm4gZXh0ZW5kKHBhcnNlKG1vZGVsKSwgbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YS50aW1lVW5pdERvbWFpbik7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIGFsd2F5cyBtZXJnZSB3aXRoIGNoaWxkcmVuXG4gICAgcmV0dXJuIGV4dGVuZChwYXJzZShtb2RlbCksIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIHJldHVybiBjaGlsZC5jb21wb25lbnQuZGF0YS50aW1lVW5pdERvbWFpbjtcbiAgICB9KSk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KTogVmdEYXRhW10ge1xuICAgIHJldHVybiBrZXlzKGNvbXBvbmVudC50aW1lVW5pdERvbWFpbikucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0RGF0YSwgdHU6IGFueSkge1xuICAgICAgY29uc3QgdGltZVVuaXQ6IFRpbWVVbml0ID0gdHU7IC8vIGNhc3Qgc3RyaW5nIGJhY2sgdG8gZW51bVxuICAgICAgY29uc3QgZG9tYWluID0gcmF3RG9tYWluKHRpbWVVbml0LCBudWxsKTsgLy8gRklYTUUgZml4IHJhd0RvbWFpbiBzaWduYXR1cmVcbiAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgdGltZVVuaXREYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHRpbWVVbml0LFxuICAgICAgICAgIHZhbHVlczogZG9tYWluLFxuICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0ZScsXG4gICAgICAgICAgICBleHByOiBwYXJzZUV4cHJlc3Npb24odGltZVVuaXQsICdkYXR1bS5kYXRhJywgdHJ1ZSlcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lVW5pdERhdGE7XG4gICAgfSwgW10pO1xuICB9XG59XG4iLCJpbXBvcnQge0F4aXNPcmllbnQsIEF4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2RlZmF1bHRDb25maWcsIENvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7U09VUkNFLCBTVU1NQVJZfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7RmFjZXR9IGZyb20gJy4uL2ZhY2V0JztcbmltcG9ydCB7Y2hhbm5lbE1hcHBpbmdGb3JFYWNofSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBpc0RpbWVuc2lvbn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0ZhY2V0U3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2dldEZ1bGxOYW1lfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCB2YWxzLCBmbGF0dGVuLCBkdXBsaWNhdGUsIG1lcmdlRGVlcCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdNYXJrR3JvdXB9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtwYXJzZUF4aXMsIHBhcnNlSW5uZXJBeGlzLCBncmlkU2hvdywgcGFyc2VBeGlzQ29tcG9uZW50fSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VGYWNldERhdGF9IGZyb20gJy4vZGF0YS9kYXRhJztcbmltcG9ydCB7YXNzZW1ibGVMYXlvdXQsIHBhcnNlRmFjZXRMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZVNjYWxlQ29tcG9uZW50fSBmcm9tICcuL3NjYWxlJztcblxuZXhwb3J0IGNsYXNzIEZhY2V0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gIHByaXZhdGUgX2ZhY2V0OiBGYWNldDtcblxuICBwcml2YXRlIF9jaGlsZDogTW9kZWw7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogRmFjZXRTcGVjLCBwYXJlbnQ6IE1vZGVsLCBwYXJlbnRHaXZlbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcblxuICAgIC8vIENvbmZpZyBtdXN0IGJlIGluaXRpYWxpemVkIGJlZm9yZSBjaGlsZCBhcyBpdCBnZXRzIGNhc2NhZGVkIHRvIHRoZSBjaGlsZFxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZyA9IHRoaXMuX2luaXRDb25maWcoc3BlYy5jb25maWcsIHBhcmVudCk7XG5cbiAgICBjb25zdCBjaGlsZCAgPSB0aGlzLl9jaGlsZCA9IGJ1aWxkTW9kZWwoc3BlYy5zcGVjLCB0aGlzLCB0aGlzLm5hbWUoJ2NoaWxkJykpO1xuXG4gICAgY29uc3QgZmFjZXQgID0gdGhpcy5fZmFjZXQgPSB0aGlzLl9pbml0RmFjZXQoc3BlYy5mYWNldCk7XG4gICAgdGhpcy5fc2NhbGUgID0gdGhpcy5faW5pdFNjYWxlKGZhY2V0LCBjb25maWcsIGNoaWxkKTtcbiAgICB0aGlzLl9heGlzICAgPSB0aGlzLl9pbml0QXhpcyhmYWNldCwgY29uZmlnLCBjaGlsZCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZmlnKHNwZWNDb25maWc6IENvbmZpZywgcGFyZW50OiBNb2RlbCkge1xuICAgIHJldHVybiBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBzcGVjQ29uZmlnLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RmFjZXQoZmFjZXQ6IEZhY2V0KSB7XG4gICAgLy8gY2xvbmUgdG8gcHJldmVudCBzaWRlIGVmZmVjdCB0byB0aGUgb3JpZ2luYWwgc3BlY1xuICAgIGZhY2V0ID0gZHVwbGljYXRlKGZhY2V0KTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgIGNoYW5uZWxNYXBwaW5nRm9yRWFjaCh0aGlzLmNoYW5uZWxzKCksIGZhY2V0LCBmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIC8vIFRPRE86IGlmIGhhcyBubyBmaWVsZCAvIGRhdHVtLCB0aGVuIGRyb3AgdGhlIGZpZWxkXG5cbiAgICAgIGlmICghaXNEaW1lbnNpb24oZmllbGREZWYpKSB7XG4gICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoY2hhbm5lbCArICcgZW5jb2Rpbmcgc2hvdWxkIGJlIG9yZGluYWwuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERlZi50eXBlKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgc2hvcnQgdHlwZSB0byBmdWxsIHR5cGVcbiAgICAgICAgZmllbGREZWYudHlwZSA9IGdldEZ1bGxOYW1lKGZpZWxkRGVmLnR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWNldDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTY2FsZShmYWNldDogRmFjZXQsIGNvbmZpZzogQ29uZmlnLCBjaGlsZDogTW9kZWwpOiBEaWN0PFNjYWxlPiB7XG4gICAgcmV0dXJuIFtST1csIENPTFVNTl0ucmVkdWNlKGZ1bmN0aW9uKF9zY2FsZSwgY2hhbm5lbCkge1xuICAgICAgaWYgKGZhY2V0W2NoYW5uZWxdKSB7XG5cbiAgICAgICAgY29uc3Qgc2NhbGVTcGVjID0gZmFjZXRbY2hhbm5lbF0uc2NhbGUgfHwge307XG4gICAgICAgIF9zY2FsZVtjaGFubmVsXSA9IGV4dGVuZCh7XG4gICAgICAgICAgdHlwZTogU2NhbGVUeXBlLk9SRElOQUwsXG4gICAgICAgICAgcm91bmQ6IGNvbmZpZy5mYWNldC5zY2FsZS5yb3VuZCxcblxuICAgICAgICAgIC8vIFRPRE86IHJldmlzZSB0aGlzIHJ1bGUgZm9yIG11bHRpcGxlIGxldmVsIG9mIG5lc3RpbmdcbiAgICAgICAgICBwYWRkaW5nOiAoY2hhbm5lbCA9PT0gUk9XICYmIGNoaWxkLmhhcyhZKSkgfHwgKGNoYW5uZWwgPT09IENPTFVNTiAmJiBjaGlsZC5oYXMoWCkpID9cbiAgICAgICAgICAgICAgICAgICBjb25maWcuZmFjZXQuc2NhbGUucGFkZGluZyA6IDBcbiAgICAgICAgfSwgc2NhbGVTcGVjKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZT4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF4aXMoZmFjZXQ6IEZhY2V0LCBjb25maWc6IENvbmZpZywgY2hpbGQ6IE1vZGVsKTogRGljdDxBeGlzPiB7XG4gICAgcmV0dXJuIFtST1csIENPTFVNTl0ucmVkdWNlKGZ1bmN0aW9uKF9heGlzLCBjaGFubmVsKSB7XG4gICAgICBpZiAoZmFjZXRbY2hhbm5lbF0pIHtcbiAgICAgICAgY29uc3QgYXhpc1NwZWMgPSBmYWNldFtjaGFubmVsXS5heGlzO1xuICAgICAgICBpZiAoYXhpc1NwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc3QgbW9kZWxBeGlzID0gX2F4aXNbY2hhbm5lbF0gPSBleHRlbmQoe30sXG4gICAgICAgICAgICBjb25maWcuZmFjZXQuYXhpcyxcbiAgICAgICAgICAgIGF4aXNTcGVjID09PSB0cnVlID8ge30gOiBheGlzU3BlYyB8fCB7fVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoY2hhbm5lbCA9PT0gUk9XKSB7XG4gICAgICAgICAgICBjb25zdCB5QXhpczogYW55ID0gY2hpbGQuYXhpcyhZKTtcbiAgICAgICAgICAgIGlmICh5QXhpcyAmJiB5QXhpcy5vcmllbnQgIT09IEF4aXNPcmllbnQuUklHSFQgJiYgIW1vZGVsQXhpcy5vcmllbnQpIHtcbiAgICAgICAgICAgICAgbW9kZWxBeGlzLm9yaWVudCA9IEF4aXNPcmllbnQuUklHSFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggY2hpbGQuaGFzKFgpICYmICFtb2RlbEF4aXMubGFiZWxBbmdsZSkge1xuICAgICAgICAgICAgICBtb2RlbEF4aXMubGFiZWxBbmdsZSA9IG1vZGVsQXhpcy5vcmllbnQgPT09IEF4aXNPcmllbnQuUklHSFQgPyA5MCA6IDI3MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfYXhpcztcbiAgICB9LCB7fSBhcyBEaWN0PEF4aXM+KTtcbiAgfVxuXG4gIHB1YmxpYyBmYWNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmFjZXQ7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9mYWNldFtjaGFubmVsXTtcbiAgfVxuXG4gIHB1YmxpYyBjaGlsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGQ7XG4gIH1cblxuICBwcml2YXRlIGhhc1N1bW1hcnkoKSB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMuY29tcG9uZW50LmRhdGEuc3VtbWFyeTtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzdW1tYXJ5Lmxlbmd0aCA7IGkrKykge1xuICAgICAgaWYgKGtleXMoc3VtbWFyeVtpXS5tZWFzdXJlcykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5oYXNTdW1tYXJ5KCkgPyBTVU1NQVJZIDogU09VUkNFKSArICcnO1xuICB9XG5cbiAgcHVibGljIGZpZWxkRGVmKGNoYW5uZWw6IENoYW5uZWwpOiBGaWVsZERlZiB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXQoKVtjaGFubmVsXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFjaygpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gdGhpcyBpcyBvbmx5IGEgcHJvcGVydHkgZm9yIFVuaXRNb2RlbFxuICB9XG5cbiAgcHVibGljIHBhcnNlRGF0YSgpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VEYXRhKCk7XG4gICAgdGhpcy5jb21wb25lbnQuZGF0YSA9IHBhcnNlRmFjZXREYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VMYXlvdXREYXRhKCk7XG4gICAgdGhpcy5jb21wb25lbnQubGF5b3V0ID0gcGFyc2VGYWNldExheW91dCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNjYWxlKCkge1xuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZCgpO1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgIGNoaWxkLnBhcnNlU2NhbGUoKTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgc2NhbGVzIGZvciBmaWVsZCByZWZlcmVuY2Ugb2YgcGFyZW50IGRhdGEgKGUuZy4sIGZvciBTUExPTSlcblxuICAgIC8vIEZpcnN0LCBhZGQgc2NhbGUgZm9yIHJvdyBhbmQgY29sdW1uLlxuICAgIGxldCBzY2FsZUNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LnNjYWxlID0gcGFyc2VTY2FsZUNvbXBvbmVudCh0aGlzKTtcblxuICAgIC8vIFRoZW4sIG1vdmUgc2hhcmVkL3VuaW9uIGZyb20gaXRzIGNoaWxkIHNwZWMuXG4gICAga2V5cyhjaGlsZC5jb21wb25lbnQuc2NhbGUpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgLy8gVE9ETzogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBzY2FsZVxuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIHNjYWxlQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuXG4gICAgICAgIC8vIGZvciBlYWNoIHNjYWxlLCBuZWVkIHRvIHJlbmFtZVxuICAgICAgICB2YWxzKHNjYWxlQ29tcG9uZW50W2NoYW5uZWxdKS5mb3JFYWNoKGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgICAgICAgY29uc3Qgc2NhbGVOYW1lV2l0aG91dFByZWZpeCA9IHNjYWxlLm5hbWUuc3Vic3RyKGNoaWxkLm5hbWUoJycpLmxlbmd0aCk7XG4gICAgICAgICAgY29uc3QgbmV3TmFtZSA9IG1vZGVsLnNjYWxlTmFtZShzY2FsZU5hbWVXaXRob3V0UHJlZml4KTtcbiAgICAgICAgICBjaGlsZC5yZW5hbWVTY2FsZShzY2FsZS5uYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgICBzY2FsZS5uYW1lID0gbmV3TmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT25jZSBwdXQgaW4gcGFyZW50LCBqdXN0IHJlbW92ZSB0aGUgY2hpbGQncyBzY2FsZS5cbiAgICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU1hcmsoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTWFyaygpO1xuXG4gICAgdGhpcy5jb21wb25lbnQubWFyayA9IGV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lKCdjZWxsJyksXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgICB0aGlzLmRhdGFUYWJsZSgpID8ge2RhdGE6IHRoaXMuZGF0YVRhYmxlKCl9IDoge30sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZmFjZXQnLFxuICAgICAgICAgICAgICBncm91cGJ5OiBbXS5jb25jYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5oYXMoUk9XKSA/IFt0aGlzLmZpZWxkKFJPVyldIDogW10sXG4gICAgICAgICAgICAgICAgdGhpcy5oYXMoQ09MVU1OKSA/IFt0aGlzLmZpZWxkKENPTFVNTildIDogW11cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICB1cGRhdGU6IGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBDYWxsIGNoaWxkJ3MgYXNzZW1ibGVHcm91cCB0byBhZGQgbWFya3MsIHNjYWxlcywgYXhlcywgYW5kIGxlZ2VuZHMuXG4gICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuIGNhbGwgY2hpbGQncyBhc3NlbWJsZUdyb3VwKCkgaGVyZSBiZWNhdXNlIHBhcnNlTWFyaygpXG4gICAgICAvLyBpcyB0aGUgbGFzdCBtZXRob2QgaW4gY29tcGlsZSgpIGFuZCB0aHVzIHRoZSBjaGlsZCBpcyBjb21wbGV0ZWx5IGNvbXBpbGVkXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5jaGlsZCgpLmFzc2VtYmxlR3JvdXAoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZUF4aXMoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5heGlzID0gcGFyc2VBeGlzQ29tcG9uZW50KHRoaXMsIFtST1csIENPTFVNTl0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpc0dyb3VwKCkge1xuICAgIC8vIFRPRE86IHdpdGggbmVzdGluZywgd2UgbWlnaHQgbmVlZCB0byBjb25zaWRlciBjYWxsaW5nIGNoaWxkXG4gICAgLy8gdGhpcy5jaGlsZCgpLnBhcnNlQXhpc0dyb3VwKCk7XG5cbiAgICBjb25zdCB4QXhpc0dyb3VwID0gcGFyc2VBeGlzR3JvdXAodGhpcywgWCk7XG4gICAgY29uc3QgeUF4aXNHcm91cCA9IHBhcnNlQXhpc0dyb3VwKHRoaXMsIFkpO1xuXG4gICAgdGhpcy5jb21wb25lbnQuYXhpc0dyb3VwID0gZXh0ZW5kKFxuICAgICAgeEF4aXNHcm91cCA/IHt4OiB4QXhpc0dyb3VwfSA6IHt9LFxuICAgICAgeUF4aXNHcm91cCA/IHt5OiB5QXhpc0dyb3VwfSA6IHt9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICAvLyBUT0RPOiB3aXRoIG5lc3RpbmcsIHdlIG1pZ2h0IG5lZWQgdG8gY29uc2lkZXIgY2FsbGluZyBjaGlsZFxuICAgIC8vIHRoaXMuY2hpbGQoKS5wYXJzZUdyaWRHcm91cCgpO1xuXG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5ncmlkR3JvdXAgPSBleHRlbmQoXG4gICAgICAhY2hpbGQuaGFzKFgpICYmIHRoaXMuaGFzKENPTFVNTikgPyB7IGNvbHVtbjogZ2V0Q29sdW1uR3JpZEdyb3Vwcyh0aGlzKSB9IDoge30sXG4gICAgICAhY2hpbGQuaGFzKFkpICYmIHRoaXMuaGFzKFJPVykgPyB7IHJvdzogZ2V0Um93R3JpZEdyb3Vwcyh0aGlzKSB9IDoge31cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGVnZW5kKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZUxlZ2VuZCgpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBsZWdlbmQgZm9yIGluZGVwZW5kZW50IG5vbi1wb3NpdGlvbiBzY2FsZSBhY3Jvc3MgZmFjZXRzXG4gICAgLy8gVE9ETzogc3VwcG9ydCBsZWdlbmQgZm9yIGZpZWxkIHJlZmVyZW5jZSBvZiBwYXJlbnQgZGF0YSAoZS5nLiwgZm9yIFNQTE9NKVxuXG4gICAgLy8gRm9yIG5vdywgYXNzdW1pbmcgdGhhdCBub24tcG9zaXRpb25hbCBzY2FsZXMgYXJlIGFsd2F5cyBzaGFyZWQgYWNyb3NzIGZhY2V0c1xuICAgIC8vIFRodXMsIGp1c3QgbW92ZSBhbGwgbGVnZW5kcyBmcm9tIGl0cyBjaGlsZFxuICAgIHRoaXMuY29tcG9uZW50LmxlZ2VuZCA9IHRoaXMuX2NoaWxkLmNvbXBvbmVudC5sZWdlbmQ7XG4gICAgdGhpcy5fY2hpbGQuY29tcG9uZW50LmxlZ2VuZCA9IHt9O1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQcmVmaXggdHJhdmVyc2FsIOKAkyBwYXJlbnQgZGF0YSBtaWdodCBiZSByZWZlcnJlZCBieSBjaGlsZHJlbiBkYXRhXG4gICAgYXNzZW1ibGVEYXRhKHRoaXMsIGRhdGEpO1xuICAgIHJldHVybiB0aGlzLl9jaGlsZC5hc3NlbWJsZURhdGEoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUG9zdGZpeCB0cmF2ZXJzYWwg4oCTIGxheW91dCBpcyBhc3NlbWJsZWQgYm90dG9tLXVwXG4gICAgdGhpcy5fY2hpbGQuYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YSk7XG4gICAgcmV0dXJuIGFzc2VtYmxlTGF5b3V0KHRoaXMsIGxheW91dERhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTWFya3MoKTogYW55W10ge1xuICAgIHJldHVybiBbXS5jb25jYXQoXG4gICAgICAvLyBheGlzR3JvdXAgaXMgYSBtYXBwaW5nIHRvIFZnTWFya0dyb3VwXG4gICAgICB2YWxzKHRoaXMuY29tcG9uZW50LmF4aXNHcm91cCksXG4gICAgICBmbGF0dGVuKHZhbHModGhpcy5jb21wb25lbnQuZ3JpZEdyb3VwKSksXG4gICAgICB0aGlzLmNvbXBvbmVudC5tYXJrXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpIHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBwaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmZhY2V0KCk7XG4gIH1cblxuICBwdWJsaWMgaXNGYWNldCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vLyBUT0RPOiBtb3ZlIHRoZSByZXN0IG9mIHRoZSBmaWxlIGludG8gRmFjZXRNb2RlbCBpZiBwb3NzaWJsZVxuXG5mdW5jdGlvbiBnZXRGYWNldEdyb3VwUHJvcGVydGllcyhtb2RlbDogRmFjZXRNb2RlbCkge1xuICBjb25zdCBjaGlsZCA9IG1vZGVsLmNoaWxkKCk7XG4gIGNvbnN0IG1lcmdlZENlbGxDb25maWcgPSBleHRlbmQoe30sIGNoaWxkLmNvbmZpZygpLmNlbGwsIGNoaWxkLmNvbmZpZygpLmZhY2V0LmNlbGwpO1xuXG4gIHJldHVybiBleHRlbmQoe1xuICAgICAgeDogbW9kZWwuaGFzKENPTFVNTikgPyB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pLFxuICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoQ09MVU1OKS5wYWRkaW5nIC8gMlxuICAgICAgICB9IDoge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMn0sXG5cbiAgICAgIHk6IG1vZGVsLmhhcyhST1cpID8ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShST1cpLnBhZGRpbmcgLyAyXG4gICAgICB9IDoge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMn0sXG5cbiAgICAgIHdpZHRoOiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ3dpZHRoJyl9fSxcbiAgICAgIGhlaWdodDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCdoZWlnaHQnKX19XG4gICAgfSxcbiAgICBjaGlsZC5hc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhtZXJnZWRDZWxsQ29uZmlnKVxuICApO1xufVxuXG5mdW5jdGlvbiBwYXJzZUF4aXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAvLyBUT0RPOiBhZGQgYSBjYXNlIHdoZXJlIGlubmVyIHNwZWMgaXMgbm90IGEgdW5pdCAoZmFjZXQvbGF5ZXIvY29uY2F0KVxuICBsZXQgYXhpc0dyb3VwID0gbnVsbDtcblxuICBjb25zdCBjaGlsZCA9IG1vZGVsLmNoaWxkKCk7XG4gIGlmIChjaGlsZC5oYXMoY2hhbm5lbCkpIHtcbiAgICBpZiAoY2hpbGQuYXhpcyhjaGFubmVsKSkge1xuICAgICAgaWYgKHRydWUpIHsgLy8gdGhlIGNoYW5uZWwgaGFzIHNoYXJlZCBheGVzXG5cbiAgICAgICAgLy8gYWRkIGEgZ3JvdXAgZm9yIHRoZSBzaGFyZWQgYXhlc1xuICAgICAgICBheGlzR3JvdXAgPSBjaGFubmVsID09PSBYID8gZ2V0WEF4ZXNHcm91cChtb2RlbCkgOiBnZXRZQXhlc0dyb3VwKG1vZGVsKTtcblxuICAgICAgICBpZiAoY2hpbGQuYXhpcyhjaGFubmVsKSAmJiBncmlkU2hvdyhjaGlsZCwgY2hhbm5lbCkpIHsgLy8gc2hvdyBpbm5lciBncmlkXG4gICAgICAgICAgLy8gYWRkIGlubmVyIGF4aXMgKGFrYSBheGlzIHRoYXQgc2hvd3Mgb25seSBncmlkIHRvIClcbiAgICAgICAgICBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXSA9IHBhcnNlSW5uZXJBeGlzKGNoYW5uZWwsIGNoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LmF4aXNbY2hhbm5lbF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBpbmRlcGVuZGVudCBheGVzIHN1cHBvcnRcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF4aXNHcm91cDtcbn1cblxuXG5mdW5jdGlvbiBnZXRYQXhlc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsKTogVmdNYXJrR3JvdXAge1xuICBjb25zdCBoYXNDb2wgPSBtb2RlbC5oYXMoQ09MVU1OKTtcbiAgcmV0dXJuIGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCd4LWF4ZXMnKSxcbiAgICAgIHR5cGU6ICdncm91cCdcbiAgICB9LFxuICAgIGhhc0NvbCA/IHtcbiAgICAgIGZyb206IHsgLy8gVE9ETzogaWYgd2UgZG8gZmFjZXQgdHJhbnNmb3JtIGF0IHRoZSBwYXJlbnQgbGV2ZWwgd2UgY2FuIHNhbWUgc29tZSB0cmFuc2Zvcm0gaGVyZVxuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChDT0xVTU4pXSxcbiAgICAgICAgICBzdW1tYXJpemU6IHsnKic6IFsnY291bnQnXX0gLy8ganVzdCBhIHBsYWNlaG9sZGVyIGFnZ3JlZ2F0aW9uXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSA6IHt9LFxuICAgIHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnd2lkdGgnKX19LFxuICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ2hlaWdodCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB4OiBoYXNDb2wgPyB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKSxcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShDT0xVTU4pLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgdmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXhlczogW3BhcnNlQXhpcyhYLCBtb2RlbC5jaGlsZCgpKV1cbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFlBeGVzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwpOiBWZ01hcmtHcm91cCB7XG4gIGNvbnN0IGhhc1JvdyA9IG1vZGVsLmhhcyhST1cpO1xuICByZXR1cm4gZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3ktYXhlcycpLFxuICAgICAgdHlwZTogJ2dyb3VwJ1xuICAgIH0sXG4gICAgaGFzUm93ID8ge1xuICAgICAgZnJvbToge1xuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChST1cpXSxcbiAgICAgICAgICBzdW1tYXJpemU6IHsnKic6IFsnY291bnQnXX0gLy8ganVzdCBhIHBsYWNlaG9sZGVyIGFnZ3JlZ2F0aW9uXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSA6IHt9LFxuICAgIHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnaGVpZ2h0Jyl9fSxcbiAgICAgICAgICB5OiBoYXNSb3cgPyB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKSxcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShST1cpLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgdmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXhlczogW3BhcnNlQXhpcyhZLCBtb2RlbC5jaGlsZCgpKV1cbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFJvd0dyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55W10geyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IGZhY2V0R3JpZENvbmZpZyA9IG1vZGVsLmNvbmZpZygpLmZhY2V0LmdyaWQ7XG5cbiAgY29uc3Qgcm93R3JpZCA9IHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb3ctZ3JpZCcpLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBmcm9tOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3t0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBbbW9kZWwuZmllbGQoUk9XKV19XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHk6IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVylcbiAgICAgICAgfSxcbiAgICAgICAgeDoge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHgyOiB7ZmllbGQ6IHtncm91cDogJ3dpZHRoJ30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBbcm93R3JpZCwge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3Jvdy1ncmlkLWVuZCcpLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeTogeyBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J319LFxuICAgICAgICB4OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH1dO1xufVxuXG5mdW5jdGlvbiBnZXRDb2x1bW5HcmlkR3JvdXBzKG1vZGVsOiBNb2RlbCk6IGFueSB7IC8vIFRPRE86IFZnTWFya3NcbiAgY29uc3QgZmFjZXRHcmlkQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuZmFjZXQuZ3JpZDtcblxuICBjb25zdCBjb2x1bW5HcmlkID0ge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2NvbHVtbi1ncmlkJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe3R5cGU6ICdmYWNldCcsIGdyb3VwYnk6IFttb2RlbC5maWVsZChDT0xVTU4pXX1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeDoge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKVxuICAgICAgICB9LFxuICAgICAgICB5OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXR9LFxuICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFtjb2x1bW5HcmlkLCAge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2NvbHVtbi1ncmlkLWVuZCcpLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeDogeyBmaWVsZDoge2dyb3VwOiAnd2lkdGgnfX0sXG4gICAgICAgIHk6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldH0sXG4gICAgICAgIHkyOiB7ZmllbGQ6IHtncm91cDogJ2hlaWdodCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfV07XG59XG4iLCJpbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtrZXlzLCBkdXBsaWNhdGUsIG1lcmdlRGVlcCwgZmxhdHRlbiwgdW5pcXVlLCBpc0FycmF5LCB2YWxzLCBoYXNoLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtMYXllclNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHthc3NlbWJsZURhdGEsIHBhcnNlTGF5ZXJEYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZUxheWVyTGF5b3V0fSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlQ29tcG9uZW50c30gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge1ZnRGF0YSwgVmdBeGlzLCBWZ0xlZ2VuZCwgaXNVbmlvbmVkRG9tYWluLCBpc0RhdGFSZWZEb21haW4sIFZnRGF0YVJlZn0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5cbmV4cG9ydCBjbGFzcyBMYXllck1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICBwcml2YXRlIF9jaGlsZHJlbjogVW5pdE1vZGVsW107XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogTGF5ZXJTcGVjLCBwYXJlbnQ6IE1vZGVsLCBwYXJlbnRHaXZlbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcblxuICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2luaXRDb25maWcoc3BlYy5jb25maWcsIHBhcmVudCk7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBzcGVjLmxheWVycy5tYXAoKGxheWVyLCBpKSA9PiB7XG4gICAgICAvLyB3ZSBrbm93IHRoYXQgdGhlIG1vZGVsIGhhcyB0byBiZSBhIHVuaXQgbW9kZWwgYmVhY3VzZSB3ZSBwYXNzIGluIGEgdW5pdCBzcGVjXG4gICAgICByZXR1cm4gYnVpbGRNb2RlbChsYXllciwgdGhpcywgdGhpcy5uYW1lKCdsYXllcl8nICsgaSkpIGFzIFVuaXRNb2RlbDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHNwZWNDb25maWcsIHBhcmVudCA/IHBhcmVudC5jb25maWcoKSA6IHt9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICAgIC8vIGxheWVyIGRvZXMgbm90IGhhdmUgYW55IGNoYW5uZWxzXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNoaWxkcmVuKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIHB1YmxpYyBpc09yZGluYWxTY2FsZShjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgLy8gc2luY2Ugd2UgYXNzdW1lIHNoYXJlZCBzY2FsZXMgd2UgY2FuIGp1c3QgYXNrIHRoZSBmaXJzdCBjaGlsZFxuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblswXS5pc09yZGluYWxTY2FsZShjaGFubmVsKTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKTogc3RyaW5nIHtcbiAgICAvLyBGSVhNRTogZG9uJ3QganVzdCB1c2UgdGhlIGZpcnN0IGNoaWxkXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuWzBdLmRhdGFUYWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGZpZWxkRGVmKGNoYW5uZWw6IENoYW5uZWwpOiBGaWVsZERlZiB7XG4gICAgcmV0dXJuIG51bGw7IC8vIGxheWVyIGRvZXMgbm90IGhhdmUgZmllbGQgZGVmc1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCkge1xuICAgIHJldHVybiBudWxsOyAvLyB0aGlzIGlzIG9ubHkgYSBwcm9wZXJ0eSBmb3IgVW5pdE1vZGVsXG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5wYXJzZURhdGEoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudC5kYXRhID0gcGFyc2VMYXllckRhdGEodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTZWxlY3Rpb25EYXRhKCkge1xuICAgIC8vIFRPRE86IEBhcnZpbmQgY2FuIHdyaXRlIHRoaXNcbiAgICAvLyBXZSBtaWdodCBuZWVkIHRvIHNwbGl0IHRoaXMgaW50byBjb21waWxlU2VsZWN0aW9uRGF0YSBhbmQgY29tcGlsZVNlbGVjdGlvblNpZ25hbHM/XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMYXlvdXREYXRhKCkge1xuICAgIC8vIFRPRE86IGNvcnJlY3RseSB1bmlvbiBvcmRpbmFsIHNjYWxlcyByYXRoZXIgdGhhbiBqdXN0IHVzaW5nIHRoZSBsYXlvdXQgb2YgdGhlIGZpcnN0IGNoaWxkXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgIGNoaWxkLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIH0pO1xuICAgIHRoaXMuY29tcG9uZW50LmxheW91dCA9IHBhcnNlTGF5ZXJMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICBsZXQgc2NhbGVDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHt9IGFzIERpY3Q8U2NhbGVDb21wb25lbnRzPjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlU2NhbGUoKTtcblxuICAgICAgLy8gRklYTUU6IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgc2NhbGVcbiAgICAgIGlmICh0cnVlKSB7IC8vIGlmIHNoYXJlZC91bmlvbiBzY2FsZVxuICAgICAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5zY2FsZSkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgbGV0IGNoaWxkU2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG4gICAgICAgICAgaWYgKCFjaGlsZFNjYWxlcykge1xuICAgICAgICAgICAgLy8gdGhlIGNoaWxkIGRvZXMgbm90IGhhdmUgYW55IHNjYWxlcyBzbyB3ZSBoYXZlIG5vdGhpbmcgdG8gbWVyZ2VcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBtb2RlbFNjYWxlczogU2NhbGVDb21wb25lbnRzID0gc2NhbGVDb21wb25lbnRbY2hhbm5lbF07XG4gICAgICAgICAgaWYgKG1vZGVsU2NhbGVzICYmIG1vZGVsU2NhbGVzLm1haW4pIHtcbiAgICAgICAgICAgIC8vIFNjYWxlcyBhcmUgdW5pb25lZCBieSBjb21iaW5pbmcgdGhlIGRvbWFpbiBvZiB0aGUgbWFpbiBzY2FsZS5cbiAgICAgICAgICAgIC8vIE90aGVyIHNjYWxlcyB0aGF0IGFyZSB1c2VkIGZvciBvcmRpbmFsIGxlZ2VuZHMgYXJlIGFwcGVuZGVkLlxuICAgICAgICAgICAgY29uc3QgbW9kZWxEb21haW4gPSBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbjtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRG9tYWluID0gY2hpbGRTY2FsZXMubWFpbi5kb21haW47XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG1vZGVsRG9tYWluKSkge1xuICAgICAgICAgICAgICBpZiAoaXNBcnJheShjaGlsZFNjYWxlcy5tYWluLmRvbWFpbikpIHtcbiAgICAgICAgICAgICAgICBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbiA9IG1vZGVsRG9tYWluLmNvbmNhdChjaGlsZERvbWFpbik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuYWRkV2FybmluZygnY3VzdG9tIGRvbWFpbiBzY2FsZSBjYW5ub3QgYmUgdW5pb25lZCB3aXRoIGRlZmF1bHQgZmllbGQtYmFzZWQgZG9tYWluJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVuaW9uZWRGaWVsZHMgPSBpc1VuaW9uZWREb21haW4obW9kZWxEb21haW4pID8gbW9kZWxEb21haW4uZmllbGRzIDogW21vZGVsRG9tYWluXSBhcyBWZ0RhdGFSZWZbXTtcblxuICAgICAgICAgICAgICBpZiAoaXNBcnJheShjaGlsZERvbWFpbikpIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKCdjdXN0b20gZG9tYWluIHNjYWxlIGNhbm5vdCBiZSB1bmlvbmVkIHdpdGggZGVmYXVsdCBmaWVsZC1iYXNlZCBkb21haW4nKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGxldCBmaWVsZHMgPSBpc0RhdGFSZWZEb21haW4oY2hpbGREb21haW4pID8gdW5pb25lZEZpZWxkcy5jb25jYXQoW2NoaWxkRG9tYWluXSkgOlxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb21haW4gaXMgaXRzZWxmIGEgdW5pb24gZG9tYWluLCBjb25jYXRcbiAgICAgICAgICAgICAgICBpc1VuaW9uZWREb21haW4oY2hpbGREb21haW4pID8gdW5pb25lZEZpZWxkcy5jb25jYXQoY2hpbGREb21haW4uZmllbGRzKSA6XG4gICAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGlnbm9yZSBleHBsaWNpdCBkYXRhIGRvbWFpbnMgZm9yIG5vdyBiZWNhdXNlIHZlZ2EgZG9lcyBub3Qgc3VwcG9ydCB1bmlvbmluZyB0aGVtXG4gICAgICAgICAgICAgICAgICB1bmlvbmVkRmllbGRzO1xuICAgICAgICAgICAgICBmaWVsZHMgPSB1bmlxdWUoZmllbGRzLCBoYXNoKTtcbiAgICAgICAgICAgICAgLy8gVE9ETzogaWYgYWxsIGRvbWFpbnMgdXNlIHRoZSBzYW1lIGRhdGEsIHdlIGNhbiBtZXJnZSB0aGVtXG4gICAgICAgICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIG1vZGVsU2NhbGVzLm1haW4uZG9tYWluID0geyBmaWVsZHM6IGZpZWxkcyB9O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsU2NhbGVzLm1haW4uZG9tYWluID0gZmllbGRzWzBdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBjb2xvciBsZWdlbmQgYW5kIGNvbG9yIGxlZ2VuZCBiaW4gc2NhbGVzIGlmIHdlIGRvbid0IGhhdmUgdGhlbSB5ZXRcbiAgICAgICAgICAgIG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kID0gbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgPyBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA6IGNoaWxkU2NhbGVzLmNvbG9yTGVnZW5kO1xuICAgICAgICAgICAgbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgPSBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA/IG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kIDogY2hpbGRTY2FsZXMuYmluQ29sb3JMZWdlbmQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjYWxlQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGRTY2FsZXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVuYW1lIGNoaWxkIHNjYWxlcyB0byBwYXJlbnQgc2NhbGVzXG4gICAgICAgICAgdmFscyhjaGlsZFNjYWxlcykuZm9yRWFjaChmdW5jdGlvbihzY2FsZSkge1xuICAgICAgICAgICAgY29uc3Qgc2NhbGVOYW1lV2l0aG91dFByZWZpeCA9IHNjYWxlLm5hbWUuc3Vic3RyKGNoaWxkLm5hbWUoJycpLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuc2NhbGVOYW1lKHNjYWxlTmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICAgICAgY2hpbGQucmVuYW1lU2NhbGUoc2NhbGUubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgICBzY2FsZS5uYW1lID0gbmV3TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGRlbGV0ZSBjaGlsZFNjYWxlc1tjaGFubmVsXTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlTWFyaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpcygpIHtcbiAgICBsZXQgYXhpc0NvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LmF4aXMgPSB7fSBhcyBEaWN0PFZnQXhpc1tdPjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlQXhpcygpO1xuXG4gICAgICAvLyBUT0RPOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IGF4ZXNcbiAgICAgIGlmICh0cnVlKSB7IC8vIGlmIHNoYXJlZC91bmlvbiBzY2FsZVxuICAgICAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5heGlzKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICAvLyBUT0RPOiBzdXBwb3J0IG11bHRpcGxlIGF4ZXMgZm9yIHNoYXJlZCBzY2FsZVxuXG4gICAgICAgICAgLy8ganVzdCB1c2UgdGhlIGZpcnN0IGF4aXMgZGVmaW5pdGlvbiBmb3IgZWFjaCBjaGFubmVsXG4gICAgICAgICAgaWYgKCFheGlzQ29tcG9uZW50W2NoYW5uZWxdKSB7XG4gICAgICAgICAgICBheGlzQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGQuY29tcG9uZW50LmF4aXNbY2hhbm5lbF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICBsZXQgbGVnZW5kQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQubGVnZW5kID0ge30gYXMgRGljdDxWZ0xlZ2VuZD47XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZUxlZ2VuZCgpO1xuXG4gICAgICAvLyBUT0RPOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IGF4ZXNcbiAgICAgIGlmICh0cnVlKSB7IC8vIGlmIHNoYXJlZC91bmlvbiBzY2FsZVxuICAgICAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5sZWdlbmQpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIC8vIGp1c3QgdXNlIHRoZSBmaXJzdCBsZWdlbmQgZGVmaW5pdGlvbiBmb3IgZWFjaCBjaGFubmVsXG4gICAgICAgICAgaWYgKCFsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0pIHtcbiAgICAgICAgICAgIGxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkLmNvbXBvbmVudC5sZWdlbmRbY2hhbm5lbF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUHJlZml4IHRyYXZlcnNhbCDigJMgcGFyZW50IGRhdGEgbWlnaHQgYmUgcmVmZXJyZWQgdG8gYnkgY2hpbGRyZW4gZGF0YVxuICAgIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuYXNzZW1ibGVEYXRhKGRhdGEpO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTGF5b3V0KGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFBvc3RmaXggdHJhdmVyc2FsIOKAkyBsYXlvdXQgaXMgYXNzZW1ibGVkIGJvdHRvbS11cFxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5hc3NlbWJsZUxheW91dChsYXlvdXREYXRhKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpOiBhbnlbXSB7XG4gICAgLy8gb25seSBjaGlsZHJlbiBoYXZlIG1hcmtzXG4gICAgcmV0dXJuIGZsYXR0ZW4odGhpcy5fY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xuICAgICAgcmV0dXJuIGNoaWxkLmFzc2VtYmxlTWFya3MoKTtcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcHBpbmcoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgaXNMYXllcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNoaWxkIGVpdGhlciBoYXMgbm8gc291cmNlIGRlZmluZWQgb3IgdXNlcyB0aGUgc2FtZSB1cmwuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3YW50IHRvIGtub3cgd2hldGhlciBpdCBpcyBwb3NzaWJsZSB0byBtb3ZlIGEgZmlsdGVyIHVwLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlIHRoIGNoaWxkIGhhcyBiZWVuIHBhcnNlZC5cbiAgICovXG4gIHB1YmxpYyBjb21wYXRpYmxlU291cmNlKGNoaWxkOiBVbml0TW9kZWwpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhKCk7XG4gICAgY29uc3QgY2hpbGREYXRhID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgY29uc3QgY29tcGF0aWJsZSA9ICFjaGlsZERhdGEuc291cmNlIHx8IChkYXRhICYmIGRhdGEudXJsID09PSBjaGlsZERhdGEuc291cmNlLnVybCk7XG4gICAgcmV0dXJuIGNvbXBhdGlibGU7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHtDaGFubmVsLCBYLCBZLCBST1csIENPTFVNTn0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtGb3JtdWxhfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIFN0cmluZ1NldH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuL2xheWVyJztcbmltcG9ydCB7VEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cmF3RG9tYWlufSBmcm9tICcuL3RpbWUnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIEZJWE1FOiBmb3IgbmVzdGluZyB4IGFuZCB5LCB3ZSBuZWVkIHRvIGRlY2xhcmUgeCx5IGxheW91dCBzZXBhcmF0ZWx5IGJlZm9yZSBqb2luaW5nIGxhdGVyXG4vLyBGb3Igbm93LCBsZXQncyBhbHdheXMgYXNzdW1lIHNoYXJlZCBzY2FsZVxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRDb21wb25lbnQge1xuICB3aWR0aDogU2l6ZUNvbXBvbmVudDtcbiAgaGVpZ2h0OiBTaXplQ29tcG9uZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemVDb21wb25lbnQge1xuICAvKiogRmllbGQgdGhhdCB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBkaXN0aW5jdCAqL1xuICBkaXN0aW5jdDogU3RyaW5nU2V0O1xuXG4gIC8qKiBBcnJheSBvZiBmb3JtdWxhcyAqL1xuICBmb3JtdWxhOiBGb3JtdWxhW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZUxheW91dChtb2RlbDogTW9kZWwsIGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICBjb25zdCBsYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jb21wb25lbnQubGF5b3V0O1xuICBpZiAoIWxheW91dENvbXBvbmVudC53aWR0aCAmJiAhbGF5b3V0Q29tcG9uZW50LmhlaWdodCkge1xuICAgIHJldHVybiBsYXlvdXREYXRhOyAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBpZiAodHJ1ZSkgeyAvLyBpZiBib3RoIGFyZSBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgZGF0YSBzb3VyY2UgZm9yIHdpZHRoIGFuZCBmb3IgaGVpZ2h0XG4gICAgY29uc3QgZGlzdGluY3RGaWVsZHMgPSBrZXlzKGV4dGVuZChsYXlvdXRDb21wb25lbnQud2lkdGguZGlzdGluY3QsIGxheW91dENvbXBvbmVudC5oZWlnaHQuZGlzdGluY3QpKTtcbiAgICBjb25zdCBmb3JtdWxhID0gbGF5b3V0Q29tcG9uZW50LndpZHRoLmZvcm11bGEuY29uY2F0KGxheW91dENvbXBvbmVudC5oZWlnaHQuZm9ybXVsYSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZm9ybXVsYSkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt0eXBlOiAnZm9ybXVsYSd9LCBmb3JtdWxhKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGRpc3RpbmN0RmllbGRzLmxlbmd0aCA+IDAgPyB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgc3VtbWFyaXplOiBkaXN0aW5jdEZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IGZpZWxkLCBvcHM6IFsnZGlzdGluY3QnXSB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XS5jb25jYXQoZm9ybXVsYSlcbiAgICAgIH0gOiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHZhbHVlczogW3t9XSxcbiAgICAgICAgdHJhbnNmb3JtOiBmb3JtdWxhXG4gICAgICB9XG4gICAgXTtcbiAgfVxuICAvLyBGSVhNRTogaW1wbGVtZW50XG4gIC8vIG90aGVyd2lzZSwgd2UgbmVlZCB0byBqb2luIHdpZHRoIGFuZCBoZWlnaHQgKGNyb3NzKVxufVxuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXRMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFgpLFxuICAgIGhlaWdodDogcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbCwgWSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIC8vIFRPRE86IHRoaW5rIGFib3V0IHdoZXRoZXIgdGhpcyBjb25maWcgaGFzIHRvIGJlIHRoZSBjZWxsIG9yIGZhY2V0IGNlbGwgY29uZmlnXG4gIGNvbnN0IGNlbGxDb25maWcgPSBtb2RlbC5jb25maWcoKS5jZWxsO1xuICBjb25zdCBub25PcmRpbmFsU2l6ZSA9IGNoYW5uZWwgPT09IFggPyBjZWxsQ29uZmlnLndpZHRoIDogY2VsbENvbmZpZy5oZWlnaHQ7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXN0aW5jdDogZ2V0RGlzdGluY3QobW9kZWwsIGNoYW5uZWwpLFxuICAgIGZvcm11bGE6IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogdW5pdFNpemVFeHByKG1vZGVsLCBjaGFubmVsLCBub25PcmRpbmFsU2l6ZSlcbiAgICB9XVxuICB9O1xufVxuXG5mdW5jdGlvbiB1bml0U2l6ZUV4cHIobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgbm9uT3JkaW5hbFNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICBpZiAobW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICByZXR1cm4gJygnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKSArXG4gICAgICAgICcgKyAnICsgc2NhbGUucGFkZGluZyArXG4gICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVE1BUksgJiYgY2hhbm5lbCA9PT0gWCkge1xuICAgICAgLy8gZm9yIHRleHQgdGFibGUgd2l0aG91dCB4L3kgc2NhbGUgd2UgbmVlZCB3aWRlciBiYW5kU2l6ZVxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLnRleHRCYW5kV2lkdGggKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplICsgJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXRMYXlvdXQobW9kZWw6IEZhY2V0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbCwgQ09MVU1OKSxcbiAgICBoZWlnaHQ6IHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsLCBST1cpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIGNvbnN0IGNoaWxkTGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQubGF5b3V0O1xuICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFJPVyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gIGlmICh0cnVlKSB7IC8vIGFzc3VtZSBzaGFyZWQgc2NhbGVcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gZXh0ZW5kKGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSwgY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0KTtcbiAgICBjb25zdCBmb3JtdWxhID0gY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGEuY29uY2F0KFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogZmFjZXRTaXplRm9ybXVsYShtb2RlbCwgY2hhbm5lbCwgbW9kZWwuY2hpbGQoKS5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCkpXG4gICAgfV0pO1xuXG4gICAgZGVsZXRlIGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgICAgZm9ybXVsYTogZm9ybXVsYVxuICAgIH07XG4gIH1cbiAgLy8gRklYTUUgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlIGFzIHdlbGxcbiAgLy8gVE9ETzogLSBhbHNvIGNvbnNpZGVyIHdoZW4gY2hpbGRyZW4gaGF2ZSBkaWZmZXJlbnQgZGF0YSBzb3VyY2Vcbn1cblxuZnVuY3Rpb24gZmFjZXRTaXplRm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGlubmVyU2l6ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gJyhkYXR1bS4nICsgaW5uZXJTaXplICsgJyArICcgKyBzY2FsZS5wYWRkaW5nICsgJyknICsgJyAqICcgKyBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWwsIGNoYW5uZWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnZGF0dW0uJyArIGlubmVyU2l6ZSArICcgKyAnICsgbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZzsgLy8gbmVlZCB0byBhZGQgb3V0ZXIgcGFkZGluZyBmb3IgZmFjZXRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllckxheW91dChtb2RlbDogTGF5ZXJNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBZKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbDogTGF5ZXJNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICBpZiAodHJ1ZSkge1xuICAgIC8vIEZvciBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgdGhlIGxheW91dCBpbnRvIG9uZSBkYXRhIHNvdXJjZVxuICAgIC8vIFRPRE86IGRvbid0IGp1c3QgdGFrZSB0aGUgbGF5b3V0IGZyb20gdGhlIGZpcnN0IGNoaWxkXG5cbiAgICBjb25zdCBjaGlsZExheW91dENvbXBvbmVudCA9IG1vZGVsLmNoaWxkcmVuKClbMF0uY29tcG9uZW50LmxheW91dDtcbiAgICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gICAgY29uc3QgZGlzdGluY3QgPSBjaGlsZFNpemVDb21wb25lbnQuZGlzdGluY3Q7XG4gICAgY29uc3QgZm9ybXVsYSA9IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGFbMF0uZXhwclxuICAgIH1dO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5sYXlvdXRbc2l6ZVR5cGVdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICAgIGZvcm11bGE6IGZvcm11bGFcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3RpbmN0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFN0cmluZ1NldCB7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiAhKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgLy8gaWYgZXhwbGljaXQgZG9tYWluIGlzIGRlY2xhcmVkLCB1c2UgYXJyYXkgbGVuZ3RoXG4gICAgICBjb25zdCBkaXN0aW5jdEZpZWxkID0gbW9kZWwuZmllbGQoY2hhbm5lbCk7XG4gICAgICBsZXQgZGlzdGluY3Q6IFN0cmluZ1NldCA9IHt9O1xuICAgICAgZGlzdGluY3RbZGlzdGluY3RGaWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGRpc3RpbmN0O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge307XG59XG5cbi8vIFRPRE86IHJlbmFtZSB0byBjYXJkaW5hbGl0eUV4cHJcbmZ1bmN0aW9uIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbi5sZW5ndGg7XG4gIH1cblxuICBjb25zdCB0aW1lVW5pdCA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnRpbWVVbml0O1xuICBjb25zdCB0aW1lVW5pdERvbWFpbiA9IHRpbWVVbml0ID8gcmF3RG9tYWluKHRpbWVVbml0LCBjaGFubmVsKSA6IG51bGw7XG5cbiAgcmV0dXJuIHRpbWVVbml0RG9tYWluICE9PSBudWxsID8gdGltZVVuaXREb21haW4ubGVuZ3RoIDpcbiAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcbn1cbiIsImltcG9ydCB7Q09MT1IsIFNJWkUsIFNIQVBFLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZFRpdGxlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0FSRUEsIEJBUiwgVElDSywgVEVYVCwgTElORSwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7T1JESU5BTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgd2l0aG91dCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YXBwbHlNYXJrQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcsIGZvcm1hdE1peGlucyBhcyB1dGlsRm9ybWF0TWl4aW5zLCB0aW1lRm9ybWF0fSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge0NPTE9SX0xFR0VORCwgQ09MT1JfTEVHRU5EX0xBQkVMfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtWZ0xlZ2VuZH0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZENvbXBvbmVudChtb2RlbDogVW5pdE1vZGVsKTogRGljdDxWZ0xlZ2VuZD4ge1xuICByZXR1cm4gW0NPTE9SLCBTSVpFLCBTSEFQRV0ucmVkdWNlKGZ1bmN0aW9uKGxlZ2VuZENvbXBvbmVudCwgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5sZWdlbmQoY2hhbm5lbCkpIHtcbiAgICAgIGxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSA9IHBhcnNlTGVnZW5kKG1vZGVsLCBjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZENvbXBvbmVudDtcbiAgfSwge30gYXMgRGljdDxWZ0xlZ2VuZD4pO1xufVxuXG5mdW5jdGlvbiBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFZnTGVnZW5kIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBDT0xPUjpcbiAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZU5hbWUodXNlQ29sb3JMZWdlbmRTY2FsZShmaWVsZERlZikgP1xuICAgICAgICAvLyBUbyBwcm9kdWNlIG9yZGluYWwgbGVnZW5kIChsaXN0LCByYXRoZXIgdGhhbiBsaW5lYXIgcmFuZ2UpIHdpdGggY29ycmVjdCBsYWJlbHM6XG4gICAgICAgIC8vIC0gRm9yIGFuIG9yZGluYWwgZmllbGQsIHByb3ZpZGUgYW4gb3JkaW5hbCBzY2FsZSB0aGF0IG1hcHMgcmFuayB2YWx1ZXMgdG8gZmllbGQgdmFsdWVzXG4gICAgICAgIC8vIC0gRm9yIGEgZmllbGQgd2l0aCBiaW4gb3IgdGltZVVuaXQsIHByb3ZpZGUgYW4gaWRlbnRpdHkgb3JkaW5hbCBzY2FsZVxuICAgICAgICAvLyAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gICAgICAgIENPTE9SX0xFR0VORCA6XG4gICAgICAgIENPTE9SXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQgPyB7IGZpbGw6IHNjYWxlIH0gOiB7IHN0cm9rZTogc2NhbGUgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4geyBzaXplOiBtb2RlbC5zY2FsZU5hbWUoU0laRSkgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHsgc2hhcGU6IG1vZGVsLnNjYWxlTmFtZShTSEFQRSkgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGVnZW5kKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBWZ0xlZ2VuZCB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcblxuICBsZXQgZGVmOiBWZ0xlZ2VuZCA9IGdldExlZ2VuZERlZldpdGhTY2FsZShtb2RlbCwgY2hhbm5lbCk7XG5cbiAgLy8gMS4xIEFkZCBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlc1xuICBkZWYudGl0bGUgPSB0aXRsZShsZWdlbmQsIGZpZWxkRGVmKTtcblxuICBkZWYub2Zmc2V0ID0gb2Zmc2V0KGxlZ2VuZCwgZmllbGREZWYpO1xuXG4gIGV4dGVuZChkZWYsIGZvcm1hdE1peGlucyhsZWdlbmQsIG1vZGVsLCBjaGFubmVsKSk7XG5cbiAgLy8gMS4yIEFkZCBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXNcbiAgWydvcmllbnQnLCAndmFsdWVzJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gbGVnZW5kW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC5wcm9wZXJ0aWVzKSB8fCB7fTtcbiAgWyd0aXRsZScsICdzeW1ib2xzJywgJ2xlZ2VuZCcsICdsYWJlbHMnXS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgbGV0IHZhbHVlID0gcHJvcGVydGllc1tncm91cF0gP1xuICAgICAgcHJvcGVydGllc1tncm91cF0oZmllbGREZWYsIHByb3BzW2dyb3VwXSwgbW9kZWwsIGNoYW5uZWwpIDogLy8gYXBwbHkgcnVsZVxuICAgICAgcHJvcHNbZ3JvdXBdOyAvLyBubyBydWxlIC0tIGp1c3QgZGVmYXVsdCB2YWx1ZXNcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGxlZ2VuZDogTGVnZW5kLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgaWYgKGxlZ2VuZC5vZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBsZWdlbmQub2Zmc2V0O1xuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JpZW50KGxlZ2VuZDogTGVnZW5kLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgY29uc3Qgb3JpZW50ID0gbGVnZW5kLm9yaWVudDtcbiAgaWYgKG9yaWVudCkge1xuICAgIHJldHVybiBvcmllbnQ7XG4gIH1cbiAgcmV0dXJuICd2ZXJ0aWNhbCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShsZWdlbmQ6IExlZ2VuZCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGlmICh0eXBlb2YgbGVnZW5kICE9PSAnYm9vbGVhbicgJiYgbGVnZW5kLnRpdGxlKSB7XG4gICAgcmV0dXJuIGxlZ2VuZC50aXRsZTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZFRpdGxlKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1peGlucyhsZWdlbmQ6IExlZ2VuZCwgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIC8vIElmIHRoZSBjaGFubmVsIGlzIGJpbm5lZCwgd2Ugc2hvdWxkIG5vdCBzZXQgdGhlIGZvcm1hdCBiZWNhdXNlIHdlIGhhdmUgYSByYW5nZSBsYWJlbFxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcmV0dXJuIHV0aWxGb3JtYXRNaXhpbnMobW9kZWwsIGNoYW5uZWwsIHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyA/IGxlZ2VuZC5mb3JtYXQgOiB1bmRlZmluZWQpO1xufVxuXG4vLyB3ZSBoYXZlIHRvIHVzZSBzcGVjaWFsIHNjYWxlcyBmb3Igb3JkaW5hbCBvciBiaW5uZWQgZmllbGRzIGZvciB0aGUgY29sb3IgY2hhbm5lbFxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi50eXBlID09PSBPUkRJTkFMIHx8IGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbHMoZmllbGREZWY6IEZpZWxkRGVmLCBzeW1ib2xzU3BlYywgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGxldCBzeW1ib2xzOmFueSA9IHt9O1xuICAgIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgc3dpdGNoIChtYXJrKSB7XG4gICAgICBjYXNlIEJBUjpcbiAgICAgIGNhc2UgVElDSzpcbiAgICAgIGNhc2UgVEVYVDpcbiAgICAgICAgc3ltYm9scy5zaGFwZSA9IHt2YWx1ZTogJ3NxdWFyZSd9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0lSQ0xFOlxuICAgICAgY2FzZSBTUVVBUkU6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7IHZhbHVlOiBtYXJrIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQT0lOVDpcbiAgICAgIGNhc2UgTElORTpcbiAgICAgIGNhc2UgQVJFQTpcbiAgICAgICAgLy8gdXNlIGRlZmF1bHQgY2lyY2xlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuXG5cbiAgICBsZXQgY29uZmlnID0gY2hhbm5lbCA9PT0gQ09MT1IgP1xuICAgICAgICAvKiBGb3IgY29sb3IncyBsZWdlbmQsIGRvIG5vdCBzZXQgZmlsbCAod2hlbiBmaWxsZWQpIG9yIHN0cm9rZSAod2hlbiB1bmZpbGxlZCkgcHJvcGVydHkgZnJvbSBjb25maWcgYmVjYXVzZSB0aGUgdGhlIGxlZ2VuZCdzIGBmaWxsYCBvciBgc3Ryb2tlYCBzY2FsZSBzaG91bGQgaGF2ZSBwcmVjZWRlbmNlICovXG4gICAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbIGZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnLCAnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pIDpcbiAgICAgICAgLyogRm9yIG90aGVyIGxlZ2VuZCwgbm8gbmVlZCB0byBvbWl0LiAqL1xuICAgICAgICAgd2l0aG91dChGSUxMX1NUUk9LRV9DT05GSUcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgY29uZmlnID0gd2l0aG91dChjb25maWcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHN5bWJvbHMsIG1vZGVsLCBjb25maWcpO1xuXG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IDAgfTtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIGlmICh1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSkge1xuICAgICAgICAvLyBmb3IgY29sb3IgbGVnZW5kIHNjYWxlLCB3ZSBuZWVkIHRvIG92ZXJyaWRlXG4gICAgICAgIHZhbHVlID0geyBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSwgZmllbGQ6ICdkYXRhJyB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSB9O1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgdmFsdWVcbiAgICAgIGlmIChmaWxsZWQpIHtcbiAgICAgICAgc3ltYm9scy5maWxsID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2xzLnN0cm9rZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCAhPT0gQ09MT1IpIHtcbiAgICAgIC8vIEZvciBub24tY29sb3IgbGVnZW5kLCBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWcuXG4gICAgICAvLyAoRm9yIGNvbG9yLCBkbyBub3Qgb3ZlcnJpZGUgc2NhbGUgc3BlY2lmaWVkISlcbiAgICAgIHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gc3ltYm9sc1tmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgICAge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLmNvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuZmlsbCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbENvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFNoYXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTaGFwZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2l6ZSA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFNpemV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU3Ryb2tlV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFN0cm9rZVdpZHRofTtcbiAgICB9XG5cbiAgICBzeW1ib2xzID0gZXh0ZW5kKHN5bWJvbHMsIHN5bWJvbHNTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHN5bWJvbHMpLmxlbmd0aCA+IDAgPyBzeW1ib2xzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhmaWVsZERlZjogRmllbGREZWYsIGxhYmVsc1NwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG5cbiAgICBsZXQgbGFiZWxzOmFueSA9IHt9O1xuXG4gICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORCksXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EX0xBQkVMKSxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3t7IGRhdHVtLmRhdGEgfCB0aW1lOlxcJycgKyB0aW1lRm9ybWF0KG1vZGVsLCBjaGFubmVsKSArICdcXCd9fSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxBbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuYWxpZ24gPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEFsaWdufTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLnN0cm9rZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5mb250ID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmZvbnRTaXplID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250U2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEJhc2VsaW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5iYXNlbGluZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQmFzZWxpbmV9O1xuICAgIH1cblxuICAgIGxhYmVscyA9IGV4dGVuZChsYWJlbHMsIGxhYmVsc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMobGFiZWxzKS5sZW5ndGggPiAwID8gbGFiZWxzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZiwgdGl0bGVTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgbGV0IHRpdGxlczphbnkgPSB7fTtcblxuICAgIGlmIChsZWdlbmQudGl0bGVDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuc3Ryb2tlID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnQgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnR9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFNpemUgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnRTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFdlaWdodCA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udFdlaWdodH07XG4gICAgfVxuXG4gICAgdGl0bGVzID0gZXh0ZW5kKHRpdGxlcywgdGl0bGVTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHRpdGxlcykubGVuZ3RoID4gMCA/IHRpdGxlcyA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7aXNEaW1lbnNpb24sIGlzTWVhc3VyZSwgRmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgYXBwbHlNYXJrQ29uZmlnfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtTdGFja1Byb3BlcnRpZXN9IGZyb20gJy4uL3N0YWNrJztcblxuZXhwb3J0IG5hbWVzcGFjZSBhcmVhIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnYXJlYSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgY29uc3QgX29yaWVudCA9IG9yaWVudChjb25maWcubWFyay5vcmllbnQpO1xuICAgIGlmIChfb3JpZW50KSB7IHAub3JpZW50ID0gX29yaWVudDsgfVxuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgbW9kZWwuc3RhY2soKSk7XG5cbiAgICBjb25zdCBfeDIgPSB4Mihtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgbW9kZWwuc3RhY2soKSwgY29uZmlnLm1hcmsub3JpZW50KTtcbiAgICBpZiAoX3gyKSB7IHAueDIgPSBfeDI7IH1cblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIG1vZGVsLnN0YWNrKCkpO1xuXG4gICAgY29uc3QgX3kyID0geTIobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIG1vZGVsLnN0YWNrKCksIGNvbmZpZy5tYXJrLm9yaWVudCk7XG4gICAgaWYgKF95MikgeyBwLnkyID0gX3kyOyB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBvcmllbnQob3JpZW50OiBzdHJpbmcpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAob3JpZW50KSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogb3JpZW50IH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKGZpZWxkRGVmKSkgeyAvLyBNZWFzdXJlXG4gICAgICByZXR1cm4geyBzY2FsZTogc2NhbGVOYW1lLCBmaWVsZDogZmllbGQoZmllbGREZWYpIH07XG4gICAgfSBlbHNlIGlmIChpc0RpbWVuc2lvbihmaWVsZERlZikpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgyKGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMsIG9yaWVudDogc3RyaW5nKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geDJcbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiB5KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24geTIoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgc3RhY2s6IFN0YWNrUHJvcGVydGllcywgb3JpZW50OiBzdHJpbmcpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAob3JpZW50ICE9PSAnaG9yaXpvbnRhbCcpIHsgLy8gJ3ZlcnRpY2FsJyBvciB1bmRlZmluZWQgYXJlIHZlcnRpY2FsXG4gICAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgU0laRSwgQ2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIGJhciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3JlY3QnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0IG9yaWVudCA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50O1xuXG4gICAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICAgIGNvbnN0IHhGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueDtcbiAgICAvLyB4LCB4MiwgYW5kIHdpZHRoIC0tIHdlIG11c3Qgc3BlY2lmeSB0d28gb2YgdGhlc2UgaW4gYWxsIGNvbmRpdGlvbnNcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgICAvLyAneCcgaXMgYSBzdGFja2VkIG1lYXN1cmUsIHRodXMgdXNlIDxmaWVsZD5fc3RhcnQgYW5kIDxmaWVsZD5fZW5kIGZvciB4LCB4Mi5cbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICAgIHAueDIgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKHhGaWVsZERlZikpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgfTtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxuICAgICAgICBwLnhjID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7dmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWCl9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoWCkuYmluKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIC8vIEZvciB2ZXJ0aWNhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWCBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byB3aWR0aC5cbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHggaXMgZGltZW5zaW9uIG9yIHVuc3BlY2lmaWVkXG4gICAgICBpZiAobW9kZWwuaGFzKFgpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICBwLnhjID0ge1xuICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgIH07XG4gICAgIH0gZWxzZSB7IC8vIG5vIHhcbiAgICAgICAgcC54ID0geyB2YWx1ZTogMCwgb2Zmc2V0OiAyIH07XG4gICAgICB9XG5cbiAgICAgIHAud2lkdGggPSBtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ICE9PSAnaG9yaXpvbnRhbCcgPyB7XG4gICAgICAgICAgLy8gYXBwbHkgc2l6ZSBzY2FsZSBpZiBoYXMgc2l6ZSBhbmQgaXMgdmVydGljYWwgKGV4cGxpY2l0IFwidmVydGljYWxcIiBvciB1bmRlZmluZWQpXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAvLyBvdGhlcndpc2UsIHVzZSBmaXhlZCBzaXplXG4gICAgICAgICAgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgKFgpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHlGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueTtcbiAgICAvLyB5LCB5MiAmIGhlaWdodCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyB5IGlzIHN0YWNrZWQgbWVhc3VyZVxuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoeUZpZWxkRGVmKSkge1xuICAgICAgaWYgKG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7IC8vIHZlcnRpY2FsIChleHBsaWNpdCAndmVydGljYWwnIG9yIHVuZGVmaW5lZClcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgIH07XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWSkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFkpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyBGb3IgaG9yaXpvbnRhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWSBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byBoZWlnaHQuXG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW1wbHkgdXNlIDxmaWVsZD5fc3RhcnQsIDxmaWVsZD5fZW5kXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHkgaXMgb3JkaW5hbCBvciB1bnNwZWNpZmllZFxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gTm8gWVxuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9LFxuICAgICAgICAgIG9mZnNldDogLTFcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcC5oZWlnaHQgPSBtb2RlbC5oYXMoU0laRSkgICYmIG9yaWVudCA9PT0gJ2hvcml6b250YWwnID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIGhvcml6b250YWxcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZVZhbHVlKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFNJWkUpO1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIGZpZWxkRGVmLnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtDb25maWcgPSBtb2RlbC5jb25maWcoKS5tYXJrO1xuICAgIGlmIChtYXJrQ29uZmlnLmJhclNpemUpIHtcbiAgICAgIHJldHVybiBtYXJrQ29uZmlnLmJhclNpemU7XG4gICAgfVxuICAgIC8vIEJBUidzIHNpemUgaXMgYXBwbGllZCBvbiBlaXRoZXIgWCBvciBZXG4gICAgcmV0dXJuIG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpID9cbiAgICAgICAgLy8gRm9yIG9yZGluYWwgc2NhbGUgb3Igc2luZ2xlIGJhciwgd2UgY2FuIHVzZSBiYW5kU2l6ZSAtIDFcbiAgICAgICAgLy8gKC0xIHNvIHRoYXQgdGhlIGJvcmRlciBvZiB0aGUgYmFyIGZhbGxzIG9uIGV4YWN0IHBpeGVsKVxuICAgICAgICBtb2RlbC5zY2FsZShjaGFubmVsKS5iYW5kU2l6ZSAtIDEgOlxuICAgICAgIW1vZGVsLmhhcyhjaGFubmVsKSA/XG4gICAgICAgIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIC0gMSA6XG4gICAgICAgIC8vIG90aGVyd2lzZSwgc2V0IHRvIHRoaW5CYXJXaWR0aCBieSBkZWZhdWx0XG4gICAgICAgIG1hcmtDb25maWcuYmFyVGhpblNpemU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCM2NCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFl9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBsaW5lIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnbGluZSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBjb25zdCBfc2l6ZSA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBjb25maWcpO1xuICAgIGlmIChfc2l6ZSkgeyBwLnN0cm9rZVdpZHRoID0gX3NpemU7IH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFsnaW50ZXJwb2xhdGUnLCAndGVuc2lvbiddKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoZmllbGREZWY6IEZpZWxkRGVmLCBjb25maWc6IENvbmZpZykge1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLmxpbmVTaXplIH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcblxuaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0hBUEUsIFBBVEgsIE9SREVSLCBPUEFDSVRZLCBERVRBSUwsIExBQkVMfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7QVJFQSwgTElORSwgVEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vLi4vbWFyayc7XG5pbXBvcnQge2ltcHV0ZVRyYW5zZm9ybSwgc3RhY2tUcmFuc2Zvcm19IGZyb20gJy4uL3N0YWNrJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge2FyZWF9IGZyb20gJy4vYXJlYSc7XG5pbXBvcnQge2Jhcn0gZnJvbSAnLi9iYXInO1xuaW1wb3J0IHtsaW5lfSBmcm9tICcuL2xpbmUnO1xuaW1wb3J0IHtwb2ludCwgY2lyY2xlLCBzcXVhcmV9IGZyb20gJy4vcG9pbnQnO1xuaW1wb3J0IHt0ZXh0fSBmcm9tICcuL3RleHQnO1xuaW1wb3J0IHt0aWNrfSBmcm9tICcuL3RpY2snO1xuaW1wb3J0IHtydWxlfSBmcm9tICcuL3J1bGUnO1xuaW1wb3J0IHtzb3J0RmllbGR9IGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IG1hcmtDb21waWxlciA9IHtcbiAgYXJlYTogYXJlYSxcbiAgYmFyOiBiYXIsXG4gIGxpbmU6IGxpbmUsXG4gIHBvaW50OiBwb2ludCxcbiAgdGV4dDogdGV4dCxcbiAgdGljazogdGljayxcbiAgcnVsZTogcnVsZSxcbiAgY2lyY2xlOiBjaXJjbGUsXG4gIHNxdWFyZTogc3F1YXJlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXJrKG1vZGVsOiBVbml0TW9kZWwpOiBhbnlbXSB7XG4gIGlmIChjb250YWlucyhbTElORSwgQVJFQV0sIG1vZGVsLm1hcmsoKSkpIHtcbiAgICByZXR1cm4gcGFyc2VQYXRoTWFyayhtb2RlbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhcnNlTm9uUGF0aE1hcmsobW9kZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkgeyAvLyBUT0RPOiBleHRyYWN0IHRoaXMgaW50byBjb21waWxlUGF0aE1hcmtcbiAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgLy8gVE9ETzogcmVwbGFjZSB0aGlzIHdpdGggbW9yZSBnZW5lcmFsIGNhc2UgZm9yIGNvbXBvc2l0aW9uXG4gIGNvbnN0IGlzRmFjZXRlZCA9IG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuICBjb25zdCBkZXRhaWxzID0gZGV0YWlsRmllbGRzKG1vZGVsKTtcblxuICBsZXQgcGF0aE1hcmtzOiBhbnkgPSBbXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgnbWFya3MnKSxcbiAgICAgIHR5cGU6IG1hcmtDb21waWxlclttYXJrXS5tYXJrVHlwZSgpLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIElmIGhhcyBzdWJmYWNldCBmb3IgbGluZS9hcmVhIGdyb3VwLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBvdXRlciBzdWJmYWNldCBncm91cCBiZWxvdy5cbiAgICAgICAgLy8gSWYgaGFzIG5vIHN1YmZhY2V0LCBhZGQgZnJvbS5kYXRhLlxuICAgICAgICBpc0ZhY2V0ZWQgfHwgZGV0YWlscy5sZW5ndGggPiAwID8ge30gOiBkYXRhRnJvbSxcblxuICAgICAgICAvLyBzb3J0IHRyYW5zZm9ybVxuICAgICAgICB7dHJhbnNmb3JtOiBbeyB0eXBlOiAnc29ydCcsIGJ5OiBzb3J0UGF0aEJ5KG1vZGVsKX1dfVxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfVxuICAgIH1cbiAgXTtcblxuICBpZiAoZGV0YWlscy5sZW5ndGggPiAwKSB7IC8vIGhhdmUgbGV2ZWwgb2YgZGV0YWlscyAtIG5lZWQgdG8gZmFjZXQgbGluZSBpbnRvIHN1Ymdyb3Vwc1xuICAgIGNvbnN0IGZhY2V0VHJhbnNmb3JtID0geyB0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBkZXRhaWxzIH07XG4gICAgY29uc3QgdHJhbnNmb3JtOiBhbnlbXSA9IG1hcmsgPT09IEFSRUEgJiYgbW9kZWwuc3RhY2soKSA/XG4gICAgICAvLyBGb3Igc3RhY2tlZCBhcmVhLCB3ZSBuZWVkIHRvIGltcHV0ZSBtaXNzaW5nIHR1cGxlcyBhbmQgc3RhY2sgdmFsdWVzXG4gICAgICAvLyAoTWFyayBsYXllciBvcmRlciBkb2VzIG5vdCBtYXR0ZXIgZm9yIHN0YWNrZWQgY2hhcnRzKVxuICAgICAgW2ltcHV0ZVRyYW5zZm9ybShtb2RlbCksIHN0YWNrVHJhbnNmb3JtKG1vZGVsKSwgZmFjZXRUcmFuc2Zvcm1dIDpcbiAgICAgIC8vIEZvciBub24tc3RhY2tlZCBwYXRoIChsaW5lL2FyZWEpLCB3ZSBuZWVkIHRvIGZhY2V0IGFuZCBwb3NzaWJseSBzb3J0XG4gICAgICBbXS5jb25jYXQoXG4gICAgICAgIGZhY2V0VHJhbnNmb3JtLFxuICAgICAgICAvLyBpZiBtb2RlbCBoYXMgYG9yZGVyYCwgdGhlbiBzb3J0IG1hcmsncyBsYXllciBvcmRlciBieSBgb3JkZXJgIGZpZWxkKHMpXG4gICAgICAgIG1vZGVsLmhhcyhPUkRFUikgPyBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIDogW11cbiAgICAgICk7XG5cbiAgICByZXR1cm4gW3tcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3BhdGhncm91cCcpLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2Zvcm19XG4gICAgICApLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDogeyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH0sXG4gICAgICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1hcmtzOiBwYXRoTWFya3NcbiAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGF0aE1hcmtzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICBjb25zdCBpc0ZhY2V0ZWQgPSBtb2RlbC5wYXJlbnQoKSAmJiBtb2RlbC5wYXJlbnQoKS5pc0ZhY2V0KCk7XG4gIGNvbnN0IGRhdGFGcm9tID0ge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpfTtcblxuICBsZXQgbWFya3MgPSBbXTsgLy8gVE9ETzogdmdNYXJrc1xuICBpZiAobWFyayA9PT0gVEVYVE1BUksgJiZcbiAgICBtb2RlbC5oYXMoQ09MT1IpICYmXG4gICAgbW9kZWwuY29uZmlnKCkubWFyay5hcHBseUNvbG9yVG9CYWNrZ3JvdW5kICYmICFtb2RlbC5oYXMoWCkgJiYgIW1vZGVsLmhhcyhZKVxuICApIHtcbiAgICAvLyBhZGQgYmFja2dyb3VuZCB0byAndGV4dCcgbWFya3MgaWYgaGFzIGNvbG9yXG4gICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICB7XG4gICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2JhY2tncm91bmQnKSxcbiAgICAgICAgdHlwZTogJ3JlY3QnXG4gICAgICB9LFxuICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgIGlzRmFjZXRlZCA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IHRleHQuYmFja2dyb3VuZChtb2RlbCkgfSB9XG4gICAgKSk7XG4gIH1cblxuICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdtYXJrcycpLFxuICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKClcbiAgICB9LFxuICAgIC8vIEFkZCBgZnJvbWAgaWYgbmVlZGVkXG4gICAgKCFpc0ZhY2V0ZWQgfHwgbW9kZWwuc3RhY2soKSB8fCBtb2RlbC5oYXMoT1JERVIpKSA/IHtcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgZmFjZXRlZCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZVxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAvLyBgZnJvbS50cmFuc2Zvcm1gXG4gICAgICAgIG1vZGVsLnN0YWNrKCkgPyAvLyBTdGFja2VkIENoYXJ0IG5lZWQgc3RhY2sgdHJhbnNmb3JtXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IFtzdGFja1RyYW5zZm9ybShtb2RlbCldIH0gOlxuICAgICAgICBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAgICAgICAvLyBpZiBub24tc3RhY2tlZCwgZGV0YWlsIGZpZWxkIGRldGVybWluZXMgdGhlIGxheWVyIG9yZGVyIG9mIGVhY2ggbWFya1xuICAgICAgICAgIHsgdHJhbnNmb3JtOiBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIH0gOlxuICAgICAgICAgIHt9XG4gICAgICApXG4gICAgfSA6IHt9LFxuICAgIC8vIHByb3BlcnRpZXMgZ3JvdXBzXG4gICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH0gfVxuICApKTtcblxuICBpZiAobW9kZWwuaGFzKExBQkVMKSAmJiBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKSB7XG4gICAgY29uc3QgbGFiZWxQcm9wZXJ0aWVzID0gbWFya0NvbXBpbGVyW21hcmtdLmxhYmVscyhtb2RlbCk7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIGxhYmVsIG1ldGhvZCBmb3IgY3VycmVudCBtYXJrIHR5cGUuXG4gICAgaWYgKGxhYmVsUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7IC8vIElmIGxhYmVsIGlzIHN1cHBvcnRlZFxuICAgICAgLy8gYWRkIGxhYmVsIGdyb3VwXG4gICAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2xhYmVsJyksXG4gICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IGxhYmVsUHJvcGVydGllcyB9IH1cbiAgICAgICkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXJrcztcbn1cblxuZnVuY3Rpb24gc29ydEJ5KG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5oYXMoT1JERVIpKSB7XG4gICAgbGV0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLm9yZGVyO1xuICAgIGlmIChjaGFubmVsRGVmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vIHNvcnQgYnkgbXVsdGlwbGUgZmllbGRzXG4gICAgICByZXR1cm4gY2hhbm5lbERlZi5tYXAoc29ydEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc29ydCBieSBvbmUgZmllbGRcbiAgICAgIHJldHVybiBzb3J0RmllbGQoY2hhbm5lbERlZiBhcyBPcmRlckNoYW5uZWxEZWYpOyAvLyBoYXZlIHRvIGFkZCBPcmRlckNoYW5uZWxEZWYgdG8gbWFrZSB0c2lmeSBub3QgY29tcGxhaW5pbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7IC8vIHVzZSBkZWZhdWx0IG9yZGVyXG59XG5cbi8qKlxuICogUmV0dXJuIHBhdGggb3JkZXIgZm9yIHNvcnQgdHJhbnNmb3JtJ3MgYnkgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gc29ydFBhdGhCeShtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICBpZiAobW9kZWwubWFyaygpID09PSBMSU5FICYmIG1vZGVsLmhhcyhQQVRIKSkge1xuICAgIC8vIEZvciBvbmx5IGxpbmUsIHNvcnQgYnkgdGhlIHBhdGggZmllbGQgaWYgaXQgaXMgc3BlY2lmaWVkLlxuICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLnBhdGg7XG4gICAgaWYgKGNoYW5uZWxEZWYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gc29ydCBieSBtdWx0aXBsZSBmaWVsZHNcbiAgICAgIHJldHVybiBjaGFubmVsRGVmLm1hcChzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzb3J0IGJ5IG9uZSBmaWVsZFxuICAgICAgcmV0dXJuIHNvcnRGaWVsZChjaGFubmVsRGVmIGFzIE9yZGVyQ2hhbm5lbERlZik7IC8vIGhhdmUgdG8gYWRkIE9yZGVyQ2hhbm5lbERlZiB0byBtYWtlIHRzaWZ5IG5vdCBjb21wbGFpbmluZ1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYm90aCBsaW5lIGFuZCBhcmVhLCB3ZSBzb3J0IHZhbHVlcyBiYXNlZCBvbiBkaW1lbnNpb24gYnkgZGVmYXVsdFxuICAgIHJldHVybiAnLScgKyBtb2RlbC5maWVsZChtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gJ2hvcml6b250YWwnID8gWSA6IFgpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBsaXN0IG9mIGRldGFpbCBmaWVsZHMgKGZvciAnY29sb3InLCAnc2hhcGUnLCBvciAnZGV0YWlsJyBjaGFubmVscylcbiAqIHRoYXQgdGhlIG1vZGVsJ3Mgc3BlYyBjb250YWlucy5cbiAqL1xuZnVuY3Rpb24gZGV0YWlsRmllbGRzKG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBbQ09MT1IsIERFVEFJTCwgT1BBQ0lUWSwgU0hBUEVdLnJlZHVjZShmdW5jdGlvbihkZXRhaWxzLCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmhhcyhjaGFubmVsKSAmJiAhbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuYWdncmVnYXRlKSB7XG4gICAgICBkZXRhaWxzLnB1c2gobW9kZWwuZmllbGQoY2hhbm5lbCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfSwgW10pO1xufVxuIiwiaW1wb3J0IHtYLCBZLCBTSEFQRSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7Q2hhbm5lbERlZldpdGhMZWdlbmQsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgcG9pbnQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCwgZml4ZWRTaGFwZT86IHN0cmluZykge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgcC5zaXplID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgbW9kZWwuc2NhbGUoU0laRSksIGNvbmZpZyk7XG5cbiAgICBwLnNoYXBlID0gc2hhcGUobW9kZWwuZW5jb2RpbmcoKS5zaGFwZSwgbW9kZWwuc2NhbGVOYW1lKFNIQVBFKSwgbW9kZWwuc2NhbGUoU0hBUEUpLCBjb25maWcsIGZpeGVkU2hhcGUpO1xuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHhcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5zaXplIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaGFwZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnLCBmaXhlZFNoYXBlPzogc3RyaW5nKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2hhcGVcbiAgICBpZiAoZml4ZWRTaGFwZSkgeyAvLyBzcXVhcmUgYW5kIGNpcmNsZSBtYXJrc1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpeGVkU2hhcGUgfTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsuc2hhcGUgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGNpcmNsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdjaXJjbGUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3F1YXJlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ3NxdWFyZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgU0laRSwgQ2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgcnVsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3J1bGUnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgZXhwbGljaXQgdmFsdWVcblxuICAgIC8vIHZlcnRpY2FsXG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0gcG9zaXRpb24obW9kZWwsIFgpO1xuXG4gICAgICBwLnkgPSB7IHZhbHVlOiAwIH07XG4gICAgICBwLnkyID0ge1xuICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGhvcml6b250YWxcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLnkgPSBwb3NpdGlvbihtb2RlbCwgWSk7XG5cbiAgICAgIHAueCA9IHsgdmFsdWU6IDAgfTtcbiAgICAgIHAueDIgPSB7XG4gICAgICAgICAgZmllbGQ6IHtncm91cDogJ3dpZHRoJ31cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBGSVhNRTogdGhpcyBmdW5jdGlvbiB3b3VsZCBvdmVyd3JpdGUgc3Ryb2tlV2lkdGggYnV0IHNob3VsZG4ndFxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcblxuICAgIC8vIHNpemVcbiAgICBpZiAobW9kZWwuaGFzKFNJWkUpKSB7XG4gICAgICBwLnN0cm9rZVdpZHRoID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAuc3Ryb2tlV2lkdGggPSB7IHZhbHVlOiBzaXplVmFsdWUobW9kZWwpIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBwb3NpdGlvbihtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsucnVsZVNpemU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgYXBwbHlDb2xvckFuZE9wYWNpdHksIGZvcm1hdE1peGluc30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7ZXh0ZW5kLCBjb250YWluc30gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRleHQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICd0ZXh0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeyB2YWx1ZTogMCB9LFxuICAgICAgeTogeyB2YWx1ZTogMCB9LFxuICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH0sXG4gICAgICBmaWxsOiB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIG1vZGVsLmZpZWxkRGVmKENPTE9SKS50eXBlID09PSBPUkRJTkFMID8ge3ByZWZuOiAncmFua18nfSA6IHt9KVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLFxuICAgICAgWydhbmdsZScsICdhbGlnbicsICdiYXNlbGluZScsICdkeCcsICdkeScsICdmb250JywgJ2ZvbnRXZWlnaHQnLFxuICAgICAgICAnZm9udFN0eWxlJywgJ3JhZGl1cycsICd0aGV0YScsICd0ZXh0J10pO1xuXG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihURVhUKTtcblxuICAgIC8vIHhcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7IC8vIFRPRE86IHN1cHBvcnQgeC52YWx1ZSwgeC5kYXR1bVxuICAgICAgaWYgKG1vZGVsLmhhcyhURVhUKSAmJiBtb2RlbC5maWVsZERlZihURVhUKS50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgcC54ID0geyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9LCBvZmZzZXQ6IC01IH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS50ZXh0QmFuZFdpZHRoIC8gMiB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHlcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnkgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgICB9XG5cbiAgICAvLyBzaXplXG4gICAgaWYgKG1vZGVsLmhhcyhTSVpFKSkge1xuICAgICAgcC5mb250U2l6ZSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLmZvbnRTaXplID0geyB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsKSB9O1xuICAgIH1cblxuICAgIGlmIChtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLmZpbGwgPSB7dmFsdWU6ICdibGFjayd9OyAvLyBUT0RPOiBhZGQgcnVsZXMgZm9yIHN3YXBwaW5nIGJldHdlZW4gYmxhY2sgYW5kIHdoaXRlXG5cbiAgICAgIC8vIG9wYWNpdHlcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9wYWNpdHk7XG4gICAgICBpZiAob3BhY2l0eSkgeyBwLm9wYWNpdHkgPSB7IHZhbHVlOiBvcGFjaXR5IH07IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8vIHRleHRcbiAgICBpZiAobW9kZWwuaGFzKFRFWFQpKSB7XG4gICAgICBpZiAoY29udGFpbnMoW1FVQU5USVRBVElWRSwgVEVNUE9SQUxdLCBtb2RlbC5maWVsZERlZihURVhUKS50eXBlKSkge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBtb2RlbC5jb25maWcoKS5tYXJrLmZvcm1hdDtcbiAgICAgICAgZXh0ZW5kKHAsIGZvcm1hdE1peGlucyhtb2RlbCwgVEVYVCwgZm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnRleHQgPSB7IGZpZWxkOiBtb2RlbC5maWVsZChURVhUKSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUpIHtcbiAgICAgIHAudGV4dCA9IHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuZm9udFNpemU7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSB0aWNrIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncmVjdCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBleHBsaWNpdCB2YWx1ZVxuXG4gICAgcC54YyA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnljID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgY29uZmlnKTtcblxuICAgIGlmIChjb25maWcubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgcC53aWR0aCA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBtb2RlbC5zY2FsZU5hbWUoU0laRSksIGNvbmZpZywgKG1vZGVsLnNjYWxlKFgpIHx8IHt9KS5iYW5kU2l6ZSk7XG4gICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IGNvbmZpZy5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC53aWR0aCA9IHsgdmFsdWU6IGNvbmZpZy5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICAgIHAuaGVpZ2h0ID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgY29uZmlnLCAobW9kZWwuc2NhbGUoWSkgfHwge30pLmJhbmRTaXplKTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogZmllbGREZWYudmFsdWV9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcsIHNjYWxlQmFuZFNpemU6IG51bWJlcik6IFZnVmFsdWVSZWYge1xuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGRcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmZpZy5tYXJrLnRpY2tTaXplKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1NpemUgfTtcbiAgICB9XG4gICAgY29uc3QgYmFuZFNpemUgPSBzY2FsZUJhbmRTaXplICE9PSB1bmRlZmluZWQgP1xuICAgICAgc2NhbGVCYW5kU2l6ZSA6XG4gICAgICBjb25maWcuc2NhbGUuYmFuZFNpemU7XG4gICAgcmV0dXJuIHsgdmFsdWU6IGJhbmRTaXplIC8gMS41IH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhLCBEYXRhVGFibGV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ1JlZHVjZSwgY2hhbm5lbE1hcHBpbmdGb3JFYWNofSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0Jhc2VTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtleHRlbmQsIGZsYXR0ZW4sIHZhbHMsIHdhcm5pbmcsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnTWFya0dyb3VwLCBWZ1NjYWxlLCBWZ0F4aXMsIFZnTGVnZW5kfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHtMYXlvdXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcblxuLyoqXG4gKiBDb21wb3NhYmxlIENvbXBvbmVudHMgdGhhdCBhcmUgaW50ZXJtZWRpYXRlIHJlc3VsdHMgb2YgdGhlIHBhcnNpbmcgcGhhc2Ugb2YgdGhlXG4gKiBjb21waWxhdGlvbnMuICBUaGVzZSBjb21wb3NhYmxlIGNvbXBvbmVudHMgd2lsbCBiZSBhc3NlbWJsZWQgaW4gdGhlIGxhc3RcbiAqIGNvbXBpbGF0aW9uIHN0ZXAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IHtcbiAgZGF0YTogRGF0YUNvbXBvbmVudDtcbiAgbGF5b3V0OiBMYXlvdXRDb21wb25lbnQ7XG4gIHNjYWxlOiBEaWN0PFNjYWxlQ29tcG9uZW50cz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnQXhpcyBkZWZpbml0aW9uICovXG4gIC8vIFRPRE86IGlmIHdlIGFsbG93IG11bHRpcGxlIGF4ZXMgKGUuZy4sIGR1YWwgYXhpcyksIHRoaXMgd2lsbCBiZWNvbWUgVmdBeGlzW11cbiAgYXhpczogRGljdDxWZ0F4aXM+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBWZ0xlZ2VuZCBkZWZpbml0aW9uICovXG4gIGxlZ2VuZDogRGljdDxWZ0xlZ2VuZD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGF4aXMgbWFyayBncm91cCBmb3IgZmFjZXQgYW5kIGNvbmNhdCAqL1xuICBheGlzR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXA+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBncmlkIG1hcmsgZ3JvdXAgZm9yIGZhY2V0IChhbmQgY29uY2F0PykgKi9cbiAgZ3JpZEdyb3VwOiBEaWN0PFZnTWFya0dyb3VwW10+O1xuXG4gIG1hcms6IFZnTWFya0dyb3VwW107XG59XG5cbmNsYXNzIE5hbWVNYXAge1xuICBwcml2YXRlIF9uYW1lTWFwOiBEaWN0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbmFtZU1hcCA9IHt9IGFzIERpY3Q8c3RyaW5nPjtcbiAgfVxuXG4gIHB1YmxpYyByZW5hbWUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lTWFwW29sZE5hbWVdID0gbmV3TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBJZiB0aGUgbmFtZSBhcHBlYXJzIGluIHRoZSBfbmFtZU1hcCwgd2UgbmVlZCB0byByZWFkIGl0cyBuZXcgbmFtZS5cbiAgICAvLyBXZSBoYXZlIHRvIGxvb3Agb3ZlciB0aGUgZGljdCBqdXN0IGluIGNhc2UsIHRoZSBuZXcgbmFtZSBhbHNvIGdldHMgcmVuYW1lZC5cbiAgICB3aGlsZSAodGhpcy5fbmFtZU1hcFtuYW1lXSkge1xuICAgICAgbmFtZSA9IHRoaXMuX25hbWVNYXBbbmFtZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IE1vZGVsO1xuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9kZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBfZGF0YTogRGF0YTtcblxuICAvKiogTmFtZSBtYXAgZm9yIGRhdGEgc291cmNlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9kYXRhTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNjYWxlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9zY2FsZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgLyoqIE5hbWUgbWFwIGZvciBzaXplLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NpemVOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG4gIHByb3RlY3RlZCBfc2NhbGU6IERpY3Q8U2NhbGU+O1xuXG4gIHByb3RlY3RlZCBfYXhpczogRGljdDxBeGlzPjtcblxuICBwcm90ZWN0ZWQgX2xlZ2VuZDogRGljdDxMZWdlbmQ+O1xuXG4gIHByb3RlY3RlZCBfY29uZmlnOiBDb25maWc7XG5cbiAgcHJvdGVjdGVkIF93YXJuaW5nczogc3RyaW5nW10gPSBbXTtcblxuICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogQmFzZVNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXG4gICAgLy8gSWYgbmFtZSBpcyBub3QgcHJvdmlkZWQsIGFsd2F5cyB1c2UgcGFyZW50J3MgZ2l2ZW5OYW1lIHRvIGF2b2lkIG5hbWUgY29uZmxpY3RzLlxuICAgIHRoaXMuX25hbWUgPSBzcGVjLm5hbWUgfHwgcGFyZW50R2l2ZW5OYW1lO1xuXG4gICAgLy8gU2hhcmVkIG5hbWUgbWFwc1xuICAgIHRoaXMuX2RhdGFOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9kYXRhTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zY2FsZU5hbWVNYXAgOiBuZXcgTmFtZU1hcCgpO1xuICAgIHRoaXMuX3NpemVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zaXplTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG5cbiAgICB0aGlzLl9kYXRhID0gc3BlYy5kYXRhO1xuXG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBzcGVjLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3RyYW5zZm9ybSA9IHNwZWMudHJhbnNmb3JtO1xuXG4gICAgdGhpcy5jb21wb25lbnQgPSB7ZGF0YTogbnVsbCwgbGF5b3V0OiBudWxsLCBtYXJrOiBudWxsLCBzY2FsZTogbnVsbCwgYXhpczogbnVsbCwgYXhpc0dyb3VwOiBudWxsLCBncmlkR3JvdXA6IG51bGwsIGxlZ2VuZDogbnVsbH07XG4gIH1cblxuXG4gIHB1YmxpYyBwYXJzZSgpIHtcbiAgICB0aGlzLnBhcnNlRGF0YSgpO1xuICAgIHRoaXMucGFyc2VTZWxlY3Rpb25EYXRhKCk7XG4gICAgdGhpcy5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLnBhcnNlU2NhbGUoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWVcbiAgICB0aGlzLnBhcnNlQXhpcygpOyAvLyBkZXBlbmRzIG9uIHNjYWxlIG5hbWVcbiAgICB0aGlzLnBhcnNlTGVnZW5kKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzR3JvdXAoKTsgLy8gZGVwZW5kcyBvbiBjaGlsZCBheGlzXG4gICAgdGhpcy5wYXJzZUdyaWRHcm91cCgpO1xuICAgIHRoaXMucGFyc2VNYXJrKCk7IC8vIGRlcGVuZHMgb24gZGF0YSBuYW1lIGFuZCBzY2FsZSBuYW1lLCBheGlzR3JvdXAsIGdyaWRHcm91cCBhbmQgY2hpbGRyZW4ncyBzY2FsZSwgYXhpcywgbGVnZW5kIGFuZCBtYXJrLlxuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZVNlbGVjdGlvbkRhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VMYXlvdXREYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2NhbGUoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VNYXJrKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpcygpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxlZ2VuZCgpO1xuXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGVzZSB0d28gbWV0aG9kcyBtYWtlIHNlbnNlIGZvciBzaGFyZWQgc2NhbGUgY29uY2F0XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUF4aXNHcm91cCgpO1xuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VHcmlkR3JvdXAoKTtcblxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICAvLyBUT0RPOiBmb3IgQXJ2aW5kIHRvIHdyaXRlXG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvblNpZ25hbChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuICAvLyBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVTZWxlY3Rpb25EYXRhKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG5cbiAgcHVibGljIGFzc2VtYmxlU2NhbGVzKCk6IFZnU2NhbGVbXSB7XG4gICAgLy8gRklYTUU6IHdyaXRlIGFzc2VtYmxlU2NhbGVzKCkgaW4gc2NhbGUudHMgdGhhdFxuICAgIC8vIGhlbHAgYXNzZW1ibGUgc2NhbGUgZG9tYWlucyB3aXRoIHNjYWxlIHNpZ25hdHVyZSBhcyB3ZWxsXG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5zY2FsZSkubWFwKChzY2FsZXM6IFNjYWxlQ29tcG9uZW50cykgPT4ge1xuICAgICAgbGV0IGFyciA9IFtzY2FsZXMubWFpbl07XG4gICAgICBpZiAoc2NhbGVzLmNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5jb2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoc2NhbGVzLmJpbkNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5iaW5Db2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZU1hcmtzKCk6IGFueVtdOyAvLyBUT0RPOiBWZ01hcmtHcm91cFtdXG5cbiAgcHVibGljIGFzc2VtYmxlQXhlcygpOiBWZ0F4aXNbXSB7XG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQuYXhpcyk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMZWdlbmRzKCk6IGFueVtdIHsgLy8gVE9ETzogVmdMZWdlbmRbXVxuICAgIHJldHVybiB2YWxzKHRoaXMuY29tcG9uZW50LmxlZ2VuZCk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVHcm91cCgpIHtcbiAgICBsZXQgZ3JvdXA6IFZnTWFya0dyb3VwID0ge307XG5cbiAgICAvLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHNjYWxlcyB0byBjb21lIGJlZm9yZSBtYXJrcyBpbiB0aGUgb3V0cHV0IHNwZWMuXG5cbiAgICBncm91cC5tYXJrcyA9IHRoaXMuYXNzZW1ibGVNYXJrcygpO1xuICAgIGNvbnN0IHNjYWxlcyA9IHRoaXMuYXNzZW1ibGVTY2FsZXMoKTtcbiAgICBpZiAoc2NhbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLnNjYWxlcyA9IHNjYWxlcztcbiAgICB9XG5cbiAgICBjb25zdCBheGVzID0gdGhpcy5hc3NlbWJsZUF4ZXMoKTtcbiAgICBpZiAoYXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5heGVzID0gYXhlcztcbiAgICB9XG5cbiAgICBjb25zdCBsZWdlbmRzID0gdGhpcy5hc3NlbWJsZUxlZ2VuZHMoKTtcbiAgICBpZiAobGVnZW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5sZWdlbmRzID0gbGVnZW5kcztcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoY2VsbENvbmZpZzogQ2VsbENvbmZpZyk7XG5cbiAgcHVibGljIGFic3RyYWN0IGNoYW5uZWxzKCk6IENoYW5uZWxbXTtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbWFwcGluZygpO1xuXG4gIHB1YmxpYyByZWR1Y2UoZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwpID0+IGFueSwgaW5pdCwgdD86IGFueSkge1xuICAgIHJldHVybiBjaGFubmVsTWFwcGluZ1JlZHVjZSh0aGlzLmNoYW5uZWxzKCksIHRoaXMubWFwcGluZygpLCBmLCBpbml0LCB0KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoKGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6bnVtYmVyKSA9PiB2b2lkLCB0PzogYW55KSB7XG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIHQpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbjtcblxuICBwdWJsaWMgcGFyZW50KCk6IE1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIG5hbWUodGV4dDogc3RyaW5nLCBkZWxpbWl0ZXI6IHN0cmluZyA9ICdfJykge1xuICAgIHJldHVybiAodGhpcy5fbmFtZSA/IHRoaXMuX25hbWUgKyBkZWxpbWl0ZXIgOiAnJykgKyB0ZXh0O1xuICB9XG5cbiAgcHVibGljIGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZURhdGEob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICAgdGhpcy5fZGF0YU5hbWVNYXAucmVuYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGF0YSBzb3VyY2UgbmFtZSBmb3IgdGhlIGdpdmVuIGRhdGEgc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEZvciB1bml0IHNwZWMsIHRoaXMgaXMgYWx3YXlzIHNpbXBseSB0aGUgc3BlYy5uYW1lICsgJy0nICsgZGF0YVNvdXJjZVR5cGUuXG4gICAqIFdlIGFscmVhZHkgdXNlIHRoZSBuYW1lIG1hcCBzbyB0aGF0IG1hcmtzIGFuZCBzY2FsZXMgdXNlIHRoZSBjb3JyZWN0IGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZGF0YU5hbWUoZGF0YVNvdXJjZVR5cGU6IERhdGFUYWJsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFOYW1lTWFwLmdldCh0aGlzLm5hbWUoU3RyaW5nKGRhdGFTb3VyY2VUeXBlKSkpO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNpemUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaXplTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbFNpemVOYW1lKGNoYW5uZWw6IENoYW5uZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNpemVOYW1lKGNoYW5uZWwgPT09IFggfHwgY2hhbm5lbCA9PT0gQ09MVU1OID8gJ3dpZHRoJyA6ICdoZWlnaHQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzaXplTmFtZShzaXplOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICByZXR1cm4gdGhpcy5fc2l6ZU5hbWVNYXAuZ2V0KHRoaXMubmFtZShzaXplLCAnXycpKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBkYXRhVGFibGUoKTogc3RyaW5nO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oKTogVHJhbnNmb3JtIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpbiBoYXMgZGVmYXVsdCBzdWZmaXggdGhhdCBkZXBlbmRzIG9uIHNjYWxlVHlwZVxuICAgICAgb3B0ID0gZXh0ZW5kKHtcbiAgICAgICAgYmluU3VmZml4OiB0aGlzLnNjYWxlKGNoYW5uZWwpLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgfSwgb3B0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmO1xuXG4gIHB1YmxpYyBzY2FsZShjaGFubmVsOiBDaGFubmVsKTogU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZVtjaGFubmVsXTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbmFtZSB0byBoYXNPcmRpbmFsU2NhbGVcbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2NhbGUoY2hhbm5lbCk7XG4gICAgcmV0dXJuIHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNjYWxlKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIC8qKiByZXR1cm5zIHNjYWxlIG5hbWUgZm9yIGEgZ2l2ZW4gY2hhbm5lbCAqL1xuICBwdWJsaWMgc2NhbGVOYW1lKGNoYW5uZWw6IENoYW5uZWx8c3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGVOYW1lTWFwLmdldCh0aGlzLm5hbWUoY2hhbm5lbCArICcnKSk7XG4gIH1cblxuICBwdWJsaWMgc29ydChjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuICh0aGlzLm1hcHBpbmcoKVtjaGFubmVsXSB8fCB7fSkuc29ydDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzdGFjaygpO1xuXG4gIHB1YmxpYyBheGlzKGNoYW5uZWw6IENoYW5uZWwpOiBBeGlzIHtcbiAgICByZXR1cm4gdGhpcy5fYXhpc1tjaGFubmVsXTtcbiAgfVxuXG4gIHB1YmxpYyBsZWdlbmQoY2hhbm5lbDogQ2hhbm5lbCk6IExlZ2VuZCB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZ2VuZFtjaGFubmVsXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNwZWMgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjb25maWcoKTogQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgcHVibGljIGFkZFdhcm5pbmcobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgd2FybmluZyhtZXNzYWdlKTtcbiAgICB0aGlzLl93YXJuaW5ncy5wdXNoKG1lc3NhZ2UpO1xuICB9XG5cbiAgcHVibGljIHdhcm5pbmdzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fd2FybmluZ3M7XG4gIH1cblxuICAvKipcbiAgICogVHlwZSBjaGVja3NcbiAgICovXG4gIHB1YmxpYyBpc1VuaXQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHB1YmxpYyBpc0ZhY2V0KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBwdWJsaWMgaXNMYXllcigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSB2YXIgZXhwb3J0cztcblxuaW1wb3J0IHtTSEFSRURfRE9NQUlOX09QU30gZnJvbSAnLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIFNIQVBFLCBTSVpFLCBDT0xPUiwgT1BBQ0lUWSwgVEVYVCwgaGFzU2NhbGUsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7U09VUkNFLCBTVEFDS0VEX1NDQUxFfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TWFyaywgQkFSLCBURVhUIGFzIFRFWFRNQVJLLCBSVUxFLCBUSUNLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZSwgTmljZVRpbWV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1NjYWxlfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtyYXdEb21haW4sIHNtYWxsZXN0VW5pdH0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG4vKipcbiAqIENvbG9yIFJhbXAncyBzY2FsZSBmb3IgbGVnZW5kcy4gIFRoaXMgc2NhbGUgaGFzIHRvIGJlIG9yZGluYWwgc28gdGhhdCBpdHNcbiAqIGxlZ2VuZHMgc2hvdyBhIGxpc3Qgb2YgbnVtYmVycy5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTE9SX0xFR0VORCA9ICdjb2xvcl9sZWdlbmQnO1xuXG4vLyBzY2FsZSB1c2VkIHRvIGdldCBsYWJlbHMgZm9yIGJpbm5lZCBjb2xvciBzY2FsZXNcbmV4cG9ydCBjb25zdCBDT0xPUl9MRUdFTkRfTEFCRUwgPSAnY29sb3JfbGVnZW5kX2xhYmVsJztcblxuXG4vLyBGSVhNRTogV2l0aCBsYXllciBhbmQgY29uY2F0LCBzY2FsZUNvbXBvbmVudCBzaG91bGQgZGVjb21wb3NlIGJldHdlZW5cbi8vIFNjYWxlU2lnbmF0dXJlIGFuZCBTY2FsZURvbWFpbltdLlxuLy8gQmFzaWNhbGx5LCBpZiB0d28gdW5pdCBzcGVjcyBoYXMgdGhlIHNhbWUgc2NhbGUsIHNpZ25hdHVyZSBmb3IgYSBwYXJ0aWN1bGFyIGNoYW5uZWwsXG4vLyB0aGUgc2NhbGUgY2FuIGJlIHVuaW9uZWQgYnkgY29tYmluaW5nIHRoZSBkb21haW4uXG5leHBvcnQgdHlwZSBTY2FsZUNvbXBvbmVudCA9IFZnU2NhbGU7XG5cbmV4cG9ydCB0eXBlIFNjYWxlQ29tcG9uZW50cyA9IHtcbiAgbWFpbjogU2NhbGVDb21wb25lbnQ7XG4gIGNvbG9yTGVnZW5kPzogU2NhbGVDb21wb25lbnQsXG4gIGJpbkNvbG9yTGVnZW5kPzogU2NhbGVDb21wb25lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU2NhbGVDb21wb25lbnQobW9kZWw6IE1vZGVsKTogRGljdDxTY2FsZUNvbXBvbmVudHM+IHtcbiAgcmV0dXJuIG1vZGVsLmNoYW5uZWxzKCkucmVkdWNlKGZ1bmN0aW9uKHNjYWxlOiBEaWN0PFNjYWxlQ29tcG9uZW50cz4sIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChtb2RlbC5zY2FsZShjaGFubmVsKSkge1xuICAgICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICAgICAgICBjb25zdCBzY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IHtcbiAgICAgICAgICBtYWluOiBwYXJzZU1haW5TY2FsZShtb2RlbCwgZmllbGREZWYsIGNoYW5uZWwpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQWRkIGFkZGl0aW9uYWwgc2NhbGVzIG5lZWRlZCB0byBzdXBwb3J0IG9yZGluYWwgbGVnZW5kcyAobGlzdCBvZiB2YWx1ZXMpXG4gICAgICAgIC8vIGZvciBjb2xvciByYW1wLlxuICAgICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IgJiYgbW9kZWwubGVnZW5kKENPTE9SKSAmJiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQpKSB7XG4gICAgICAgICAgc2NhbGVzLmNvbG9yTGVnZW5kID0gcGFyc2VDb2xvckxlZ2VuZFNjYWxlKG1vZGVsLCBmaWVsZERlZik7XG4gICAgICAgICAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICAgICAgc2NhbGVzLmJpbkNvbG9yTGVnZW5kID0gcGFyc2VCaW5Db2xvckxlZ2VuZExhYmVsKG1vZGVsLCBmaWVsZERlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGVbY2hhbm5lbF0gPSBzY2FsZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZUNvbXBvbmVudHM+KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1haW4gc2NhbGUgZm9yIGVhY2ggY2hhbm5lbC4gIChPbmx5IGNvbG9yIGNhbiBoYXZlIG11bHRpcGxlIHNjYWxlcy4pXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTWFpblNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGNvbnN0IHNvcnQgPSBtb2RlbC5zb3J0KGNoYW5uZWwpO1xuXG4gIGxldCBzY2FsZURlZjogYW55ID0ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKSxcbiAgICB0eXBlOiBzY2FsZS50eXBlLFxuICB9O1xuXG4gIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwpO1xuICBleHRlbmQoc2NhbGVEZWYsIHJhbmdlTWl4aW5zKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCkpO1xuXG4gIGlmIChzb3J0ICYmICh0eXBlb2Ygc29ydCA9PT0gJ3N0cmluZycgPyBzb3J0IDogc29ydC5vcmRlcikgPT09ICdkZXNjZW5kaW5nJykge1xuICAgIHNjYWxlRGVmLnJldmVyc2UgPSB0cnVlO1xuICB9XG5cbiAgLy8gQWRkIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgW1xuICAgIC8vIGdlbmVyYWwgcHJvcGVydGllc1xuICAgICdyb3VuZCcsXG4gICAgLy8gcXVhbnRpdGF0aXZlIC8gdGltZVxuICAgICdjbGFtcCcsICduaWNlJyxcbiAgICAvLyBxdWFudGl0YXRpdmVcbiAgICAnZXhwb25lbnQnLCAnemVybycsXG4gICAgLy8gb3JkaW5hbFxuICAgICdwYWRkaW5nJywgJ3BvaW50cydcbiAgXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBleHBvcnRzW3Byb3BlcnR5XShzY2FsZSwgY2hhbm5lbCwgZmllbGREZWYsIG1vZGVsKTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NhbGVEZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2NhbGVEZWY7XG59XG5cbi8qKlxuICogIFJldHVybiBhIHNjYWxlICBmb3IgcHJvZHVjaW5nIG9yZGluYWwgc2NhbGUgZm9yIGxlZ2VuZHMuXG4gKiAgLSBGb3IgYW4gb3JkaW5hbCBmaWVsZCwgcHJvdmlkZSBhbiBvcmRpbmFsIHNjYWxlIHRoYXQgbWFwcyByYW5rIHZhbHVlcyB0byBmaWVsZCB2YWx1ZVxuICogIC0gRm9yIGEgZmllbGQgd2l0aCBiaW4gb3IgdGltZVVuaXQsIHByb3ZpZGUgYW4gaWRlbnRpdHkgb3JkaW5hbCBzY2FsZVxuICogICAgKG1hcHBpbmcgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVtc2VsdmVzKVxuICovXG5mdW5jdGlvbiBwYXJzZUNvbG9yTGVnZW5kU2NhbGUobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYpOiBTY2FsZUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORCksXG4gICAgdHlwZTogU2NhbGVUeXBlLk9SRElOQUwsXG4gICAgZG9tYWluOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIC8vIHVzZSByYW5rXzxmaWVsZD4gZm9yIG9yZGluYWwgdHlwZSwgZm9yIGJpbiBhbmQgdGltZVVuaXQgdXNlIGRlZmF1bHQgZmllbGRcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiwgKGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdCkgPyB7fSA6IHtwcmVmbjogJ3JhbmtfJ30pLFxuICAgICAgc29ydDogdHJ1ZVxuICAgIH0sXG4gICAgcmFuZ2U6IHtkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSwgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSwgc29ydDogdHJ1ZX1cbiAgfTtcbn1cblxuLyoqXG4gKiAgUmV0dXJuIGFuIGFkZGl0aW9uYWwgc2NhbGUgZm9yIGJpbiBsYWJlbHMgYmVjYXVzZSB3ZSBuZWVkIHRvIG1hcCBiaW5fc3RhcnQgdG8gYmluX3JhbmdlIGluIGxlZ2VuZHNcbiAqL1xuZnVuY3Rpb24gcGFyc2VCaW5Db2xvckxlZ2VuZExhYmVsKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmKTogU2NhbGVDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkRfTEFCRUwpLFxuICAgIHR5cGU6IFNjYWxlVHlwZS5PUkRJTkFMLFxuICAgIGRvbWFpbjoge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLFxuICAgICAgc29ydDogdHJ1ZVxuICAgIH0sXG4gICAgcmFuZ2U6IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX3JhbmdlJ30pLFxuICAgICAgc29ydDoge1xuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgb3A6ICdtaW4nIC8vIG1pbiBvciBtYXggZG9lc24ndCBtYXR0ZXIgc2luY2Ugc2FtZSBfcmFuZ2Ugd291bGQgaGF2ZSB0aGUgc2FtZSBfc3RhcnRcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZVR5cGUoc2NhbGU6IFNjYWxlLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwsIG1hcms6IE1hcmspOiBTY2FsZVR5cGUge1xuICBpZiAoIWhhc1NjYWxlKGNoYW5uZWwpKSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gc2NhbGUgZm9yIHRoZXNlIGNoYW5uZWxzXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgbGluZWFyL3RpbWUgZm9yIHJvdywgY29sdW1uIG9yIHNoYXBlXG4gIGlmIChjb250YWlucyhbUk9XLCBDT0xVTU4sIFNIQVBFXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cblxuICBpZiAoc2NhbGUudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnR5cGU7XG4gIH1cblxuICBzd2l0Y2ggKGZpZWxkRGVmLnR5cGUpIHtcbiAgICBjYXNlIE5PTUlOQUw6XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgY2FzZSBPUkRJTkFMOlxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgIHJldHVybiBTY2FsZVR5cGUuTElORUFSOyAvLyB0aW1lIGhhcyBvcmRlciwgc28gdXNlIGludGVycG9sYXRlZCBvcmRpbmFsIGNvbG9yIHNjYWxlLlxuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgIGNhc2UgVEVNUE9SQUw6XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FOyAvLyB0aW1lIGhhcyBvcmRlciwgc28gdXNlIGludGVycG9sYXRlZCBvcmRpbmFsIGNvbG9yIHNjYWxlLlxuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgc3dpdGNoIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6XG4gICAgICAgICAgY2FzZSBUaW1lVW5pdC5EQVk6XG4gICAgICAgICAgY2FzZSBUaW1lVW5pdC5NT05USDpcbiAgICAgICAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gZGF0ZSwgeWVhciwgbWludXRlLCBzZWNvbmQsIHllYXJtb250aCwgbW9udGhkYXksIC4uLlxuICAgICAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7XG5cbiAgICBjYXNlIFFVQU5USVRBVElWRTpcbiAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZLCBDT0xPUl0sIGNoYW5uZWwpID8gU2NhbGVUeXBlLkxJTkVBUiA6IFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5MSU5FQVI7XG4gIH1cblxuICAvLyBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpc1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpbihzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDpDaGFubmVsKTogYW55IHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICBpZiAoc2NhbGUuZG9tYWluKSB7IC8vIGV4cGxpY2l0IHZhbHVlXG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbjtcbiAgfVxuXG4gIC8vIHNwZWNpYWwgY2FzZSBmb3IgdGVtcG9yYWwgc2NhbGVcbiAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgaWYgKHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGZpZWxkRGVmLnRpbWVVbml0LFxuICAgICAgICBmaWVsZDogJ2RhdGUnXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgICBvcDogJ21pbidcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRm9yIHN0YWNrLCB1c2UgU1RBQ0tFRCBkYXRhLlxuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIGlmIChzdGFjayAmJiBjaGFubmVsID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICBpZihzdGFjay5vZmZzZXQgPT09IFN0YWNrT2Zmc2V0Lk5PUk1BTElaRSkge1xuICAgICAgcmV0dXJuIFswLCAxXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgLy8gU1RBQ0tFRF9TQ0FMRSBwcm9kdWNlcyBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAnc3VtXyd9KVxuICAgIH07XG4gIH1cblxuICBjb25zdCB1c2VSYXdEb21haW4gPSBfdXNlUmF3RG9tYWluKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCksXG4gIHNvcnQgPSBkb21haW5Tb3J0KG1vZGVsLCBjaGFubmVsLCBzY2FsZS50eXBlKTtcblxuICBpZiAodXNlUmF3RG9tYWluKSB7IC8vIHVzZVJhd0RvbWFpbiAtIG9ubHkgUS9UXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IFNPVVJDRSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7bm9BZ2dyZWdhdGU6IHRydWV9KVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpblxuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gb3JkaW5hbCBiaW4gc2NhbGUgdGFrZXMgZG9tYWluIGZyb20gYmluX3JhbmdlLCBvcmRlcmVkIGJ5IGJpbl9zdGFydFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSksXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgLy8gQ3VycmVudGx5LCBiaW5uZWQgb24gY29sb3IgdXNlcyBsaW5lYXIgc2NhbGUgYW5kIHRodXMgdXNlIF9zdGFydCBwb2ludFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyIGxpbmVhciBiaW4gc2NhbGUgbWVyZ2VzIGJvdGggYmluX3N0YXJ0IGFuZCBiaW5fZW5kIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBbXG4gICAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc29ydCkgeyAvLyBoYXZlIHNvcnQgLS0gb25seSBmb3Igb3JkaW5hbFxuICAgIHJldHVybiB7XG4gICAgICAvLyBJZiBzb3J0IGJ5IGFnZ3JlZ2F0aW9uIG9mIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQsIHdlIG5lZWQgdG8gdXNlIFNPVVJDRSB0YWJsZSxcbiAgICAgIC8vIHNvIHdlIGNhbiBhZ2dyZWdhdGUgdmFsdWVzIGZvciB0aGUgc2NhbGUgaW5kZXBlbmRlbnRseSBmcm9tIHRoZSBtYWluIGFnZ3JlZ2F0aW9uLlxuICAgICAgZGF0YTogc29ydC5vcCA/IFNPVVJDRSA6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMICYmIGNoYW5uZWwgPT09IENPTE9SKSA/IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3JhbmtfJ30pIDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiBzb3J0XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAncmFua18nfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW5Tb3J0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBTY2FsZVR5cGUpOiBhbnkge1xuICBpZiAoc2NhbGVUeXBlICE9PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcbiAgaWYgKGNvbnRhaW5zKFsnYXNjZW5kaW5nJywgJ2Rlc2NlbmRpbmcnLCB1bmRlZmluZWQgLyogZGVmYXVsdCA9YXNjZW5kaW5nKi9dLCBzb3J0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gU29ydGVkIGJhc2VkIG9uIGFuIGFnZ3JlZ2F0ZSBjYWxjdWxhdGlvbiBvdmVyIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQgKG9ubHkgZm9yIG9yZGluYWwgc2NhbGUpXG4gIGlmICh0eXBlb2Ygc29ydCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cblxuICAvLyBzb3J0ID09PSAnbm9uZSdcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG4vKipcbiAqIERldGVybWluZSBpZiB1c2VSYXdEb21haW4gc2hvdWxkIGJlIGFjdGl2YXRlZCBmb3IgdGhpcyBzY2FsZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRvbnMgYXBwbGllczpcbiAqIDEuIGB1c2VSYXdEb21haW5gIGlzIGVuYWJsZWQgZWl0aGVyIHRocm91Z2ggc2NhbGUgb3IgY29uZmlnXG4gKiAyLiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBpcyBub3QgYGNvdW50YCBvciBgc3VtYFxuICogMy4gVGhlIHNjYWxlIGlzIHF1YW50aXRhdGl2ZSBvciB0aW1lIHNjYWxlLlxuICovXG5mdW5jdGlvbiBfdXNlUmF3RG9tYWluIChzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIHJldHVybiBzY2FsZS51c2VSYXdEb21haW4gJiYgLy8gIGlmIHVzZVJhd0RvbWFpbiBpcyBlbmFibGVkXG4gICAgLy8gb25seSBhcHBsaWVkIHRvIGFnZ3JlZ2F0ZSB0YWJsZVxuICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJlxuICAgIC8vIG9ubHkgYWN0aXZhdGVkIGlmIHVzZWQgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZXMgdmFsdWVzIHJhbmdpbmcgaW4gdGhlIGRvbWFpbiBvZiB0aGUgc291cmNlIGRhdGFcbiAgICBTSEFSRURfRE9NQUlOX09QUy5pbmRleE9mKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkgPj0gMCAmJlxuICAgIChcbiAgICAgIC8vIFEgYWx3YXlzIHVzZXMgcXVhbnRpdGF0aXZlIHNjYWxlIGV4Y2VwdCB3aGVuIGl0J3MgYmlubmVkLlxuICAgICAgLy8gQmlubmVkIGZpZWxkIGhhcyBzaW1pbGFyIHZhbHVlcyBpbiBib3RoIHRoZSBzb3VyY2UgdGFibGUgYW5kIHRoZSBzdW1tYXJ5IHRhYmxlXG4gICAgICAvLyBidXQgdGhlIHN1bW1hcnkgdGFibGUgaGFzIGZld2VyIHZhbHVlcywgdGhlcmVmb3JlIGJpbm5lZCBmaWVsZHMgZHJhd1xuICAgICAgLy8gZG9tYWluIHZhbHVlcyBmcm9tIHRoZSBzdW1tYXJ5IHRhYmxlLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSAmJiAhZmllbGREZWYuYmluKSB8fFxuICAgICAgLy8gVCB1c2VzIG5vbi1vcmRpbmFsIHNjYWxlIHdoZW4gdGhlcmUncyBubyB1bml0IG9yIHdoZW4gdGhlIHVuaXQgaXMgbm90IG9yZGluYWwuXG4gICAgICAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpXG4gICAgKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VNaXhpbnMoc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBhbnkge1xuICAvLyBUT0RPOiBuZWVkIHRvIGFkZCBydWxlIGZvciBxdWFudGlsZSwgcXVhbnRpemUsIHRocmVzaG9sZCBzY2FsZVxuXG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gIGNvbnN0IHNjYWxlQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuc2NhbGU7XG5cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIHNjYWxlLmJhbmRTaXplICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4ge2JhbmRTaXplOiBzY2FsZS5iYW5kU2l6ZX07XG4gIH1cblxuICBpZiAoc2NhbGUucmFuZ2UgJiYgIWNvbnRhaW5zKFtYLCBZLCBST1csIENPTFVNTl0sIGNoYW5uZWwpKSB7XG4gICAgLy8gZXhwbGljaXQgdmFsdWUgKERvIG5vdCBhbGxvdyBleHBsaWNpdCB2YWx1ZXMgZm9yIFgsIFksIFJPVywgQ09MVU1OKVxuICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlLnJhbmdlfTtcbiAgfVxuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFJPVzpcbiAgICAgIHJldHVybiB7cmFuZ2U6ICdoZWlnaHQnfTtcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7cmFuZ2U6ICd3aWR0aCd9O1xuICB9XG5cbiAgLy8gSWYgbm90IFJPVyAvIENPTFVNTiwgd2UgY2FuIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSB1bml0IHNwZWMuXG4gIGNvbnN0IHVuaXRNb2RlbCA9IG1vZGVsIGFzIFVuaXRNb2RlbDtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgICAgLy8gd2UgY2FuJ3QgdXNlIHtyYW5nZTogXCJ3aWR0aFwifSBoZXJlIHNpbmNlIHdlIHB1dCBzY2FsZSBpbiB0aGUgcm9vdCBncm91cFxuICAgICAgLy8gbm90IGluc2lkZSB0aGUgY2VsbCwgc28gc2NhbGUgaXMgcmV1c2FibGUgZm9yIGF4ZXMgZ3JvdXBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IDAsXG4gICAgICAgIHJhbmdlTWF4OiB1bml0TW9kZWwuY29uZmlnKCkuY2VsbC53aWR0aCAvLyBGaXhlZCBjZWxsIHdpZHRoIGZvciBub24tb3JkaW5hbFxuICAgICAgfTtcbiAgICBjYXNlIFk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICByYW5nZU1pbjogdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0LCAvLyBGaXhlZCBjZWxsIGhlaWdodCBmb3Igbm9uLW9yZGluYWxcbiAgICAgICAgcmFuZ2VNYXg6IDBcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuXG4gICAgICBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gQkFSKSB7XG4gICAgICAgIGlmIChzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLmJhclNpemVSYW5nZX07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJyA/IFkgOiBYO1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBbbW9kZWwuY29uZmlnKCkubWFyay5iYXJUaGluU2l6ZSwgbW9kZWwuc2NhbGUoZGltZW5zaW9uKS5iYW5kU2l6ZV19O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBURVhUTUFSSykge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5mb250U2l6ZVJhbmdlIH07XG4gICAgICB9IGVsc2UgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IFJVTEUpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucnVsZVNpemVSYW5nZSB9O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBUSUNLKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnRpY2tTaXplUmFuZ2UgfTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgLS0gcG9pbnQsIHNxdWFyZSwgY2lyY2xlXG4gICAgICBpZiAoc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5wb2ludFNpemVSYW5nZX07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhbmRTaXplID0gcG9pbnRCYW5kU2l6ZSh1bml0TW9kZWwpO1xuXG4gICAgICByZXR1cm4ge3JhbmdlOiBbOSwgKGJhbmRTaXplIC0gMikgKiAoYmFuZFNpemUgLSAyKV19O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5zaGFwZVJhbmdlfTtcbiAgICBjYXNlIENPTE9SOlxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE5PTUlOQUwpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcubm9taW5hbENvbG9yUmFuZ2V9O1xuICAgICAgfVxuICAgICAgLy8gZWxzZSAtLSBvcmRpbmFsLCB0aW1lLCBvciBxdWFudGl0YXRpdmVcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNlcXVlbnRpYWxDb2xvclJhbmdlfTtcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5vcGFjaXR5fTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHBvaW50QmFuZFNpemUobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGNvbnN0IGhhc1ggPSBtb2RlbC5oYXMoWCk7XG4gIGNvbnN0IGhhc1kgPSBtb2RlbC5oYXMoWSk7XG5cbiAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShtb2RlbC5lbmNvZGluZygpLngpO1xuICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKG1vZGVsLmVuY29kaW5nKCkueSk7XG5cbiAgaWYgKGhhc1ggJiYgaGFzWSkge1xuICAgIHJldHVybiB4SXNNZWFzdXJlICE9PSB5SXNNZWFzdXJlID9cbiAgICAgIG1vZGVsLnNjYWxlKHhJc01lYXN1cmUgPyBZIDogWCkuYmFuZFNpemUgOlxuICAgICAgTWF0aC5taW4oXG4gICAgICAgIG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplLFxuICAgICAgICBtb2RlbC5zY2FsZShZKS5iYW5kU2l6ZSB8fCBzY2FsZUNvbmZpZy5iYW5kU2l6ZVxuICAgICAgKTtcbiAgfSBlbHNlIGlmIChoYXNZKSB7XG4gICAgcmV0dXJuIHlJc01lYXN1cmUgPyBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSA6IG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplO1xuICB9IGVsc2UgaWYgKGhhc1gpIHtcbiAgICByZXR1cm4geElzTWVhc3VyZSA/IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIDogbW9kZWwuc2NhbGUoWCkuYmFuZFNpemU7XG4gIH1cbiAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAoc2NhbGU6IFNjYWxlKSB7XG4gIC8vIE9ubHkgd29ya3MgZm9yIHNjYWxlIHdpdGggYm90aCBjb250aW51b3VzIGRvbWFpbiBjb250aW51b3VzIHJhbmdlXG4gIC8vIChEb2Vzbid0IHdvcmsgZm9yIHF1YW50aXplLCBxdWFudGlsZSwgdGhyZXNob2xkLCBvcmRpbmFsKVxuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULFxuICAgICAgICBTY2FsZVR5cGUuTE9HLCBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKSB7XG4gICAgcmV0dXJuIHNjYWxlLmNsYW1wO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudChzY2FsZTogU2NhbGUpIHtcbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5QT1cpIHtcbiAgICByZXR1cm4gc2NhbGUuZXhwb25lbnQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5pY2Uoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpOiBib29sZWFuIHwgTmljZVRpbWUge1xuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULCBTY2FsZVR5cGUuTE9HLFxuICAgICAgICBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLlFVQU5USVpFXSwgc2NhbGUudHlwZSkpIHtcblxuICAgIGlmIChzY2FsZS5uaWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS5uaWNlO1xuICAgIH1cbiAgICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpIHtcbiAgICAgIHJldHVybiBzbWFsbGVzdFVuaXQoZmllbGREZWYudGltZVVuaXQpIGFzIGFueTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7IC8vIHJldHVybiB0cnVlIGZvciBxdWFudGl0YXRpdmUgWC9ZXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLyogUGFkZGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIFggYW5kIFkuXG4gICAqXG4gICAqIEJhc2ljYWxseSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gYWRkIHBhZGRpbmcgZm9yIGNvbG9yIGFuZCBzaXplLlxuICAgKlxuICAgKiBXZSBkbyBub3QgdXNlIGQzIHNjYWxlJ3MgcGFkZGluZyBmb3Igcm93L2NvbHVtbiBiZWNhdXNlIHBhZGRpbmcgdGhlcmVcbiAgICogaXMgYSByYXRpbyAoWzAsIDFdKSBhbmQgaXQgY2F1c2VzIHRoZSBwYWRkaW5nIHRvIGJlIGRlY2ltYWxzLlxuICAgKiBUaGVyZWZvcmUsIHdlIG1hbnVhbGx5IGNhbGN1bGF0ZSBwYWRkaW5nIGluIHRoZSBsYXlvdXQgYnkgb3Vyc2VsdmVzLlxuICAgKi9cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gc2NhbGUucGFkZGluZztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgX18sIG1vZGVsOiBNb2RlbCkge1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIC8vIFdlIGFsd2F5cyB1c2Ugb3JkaW5hbCBwb2ludCBzY2FsZSBmb3IgeCBhbmQgeS5cbiAgICAvLyBUaHVzIGBwb2ludHNgIGlzbid0IGluY2x1ZGVkIGluIHRoZSBzY2FsZSdzIHNjaGVtYS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU4sIFNJWkVdLCBjaGFubmVsKSAmJiBzY2FsZS5yb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnJvdW5kO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8oc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgLy8gb25seSBhcHBsaWNhYmxlIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICBpZiAoIWNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLk9SRElOQUxdLCBzY2FsZS50eXBlKSkge1xuICAgIGlmIChzY2FsZS56ZXJvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS56ZXJvO1xuICAgIH1cbiAgICAvLyBCeSBkZWZhdWx0LCByZXR1cm4gdHJ1ZSBvbmx5IGZvciBub24tYmlubmVkLCBxdWFudGl0YXRpdmUgeC1zY2FsZSBvciB5LXNjYWxlLlxuICAgIHJldHVybiAhZmllbGREZWYuYmluICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtDaGFubmVsLCBYLCBZLCBDT0xPUiwgREVUQUlMLCBPUkRFUiwgT1BBQ0lUWSwgU0laRX0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0JBUiwgQVJFQSwgTWFya30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2ZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7aGFzLCBpc0FnZ3JlZ2F0ZX0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FycmF5LCBjb250YWlucywgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7c29ydEZpZWxkfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tQcm9wZXJ0aWVzIHtcbiAgLyoqIERpbWVuc2lvbiBheGlzIG9mIHRoZSBzdGFjayAoJ3gnIG9yICd5JykuICovXG4gIGdyb3VwYnlDaGFubmVsOiBDaGFubmVsO1xuICAvKiogTWVhc3VyZSBheGlzIG9mIHRoZSBzdGFjayAoJ3gnIG9yICd5JykuICovXG4gIGZpZWxkQ2hhbm5lbDogQ2hhbm5lbDtcblxuICAvKiogU3RhY2stYnkgZmllbGQgbmFtZXMgKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG4gIHN0YWNrRmllbGRzOiBzdHJpbmdbXTtcblxuICAvKiogU3RhY2sgb2Zmc2V0IHByb3BlcnR5LiAqL1xuICBvZmZzZXQ6IFN0YWNrT2Zmc2V0O1xufVxuXG4vLyBUT0RPOiBwdXQgYWxsIHZlZ2EgaW50ZXJmYWNlIGluIG9uZSBwbGFjZVxuZXhwb3J0IGludGVyZmFjZSBTdGFja1RyYW5zZm9ybSB7XG4gIHR5cGU6IHN0cmluZztcbiAgb2Zmc2V0PzogYW55O1xuICBncm91cGJ5OiBhbnk7XG4gIGZpZWxkOiBhbnk7XG4gIHNvcnRieTogYW55O1xuICBvdXRwdXQ6IGFueTtcbn1cblxuLyoqIENvbXBpbGUgc3RhY2sgcHJvcGVydGllcyBmcm9tIGEgZ2l2ZW4gc3BlYyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVTdGFja1Byb3BlcnRpZXMobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBzY2FsZTogRGljdDxTY2FsZT4sIGNvbmZpZzogQ29uZmlnKSB7XG4gIGNvbnN0IHN0YWNrRmllbGRzID0gZ2V0U3RhY2tGaWVsZHMobWFyaywgZW5jb2RpbmcsIHNjYWxlKTtcblxuICBpZiAoc3RhY2tGaWVsZHMubGVuZ3RoID4gMCAmJlxuICAgICAgY29udGFpbnMoW0JBUiwgQVJFQV0sIG1hcmspICYmXG4gICAgICBjb25maWcubWFyay5zdGFja2VkICE9PSBTdGFja09mZnNldC5OT05FICYmXG4gICAgICBpc0FnZ3JlZ2F0ZShlbmNvZGluZykpIHtcblxuICAgIGNvbnN0IGlzWE1lYXN1cmUgPSBoYXMoZW5jb2RpbmcsIFgpICYmIGlzTWVhc3VyZShlbmNvZGluZy54KSxcbiAgICBpc1lNZWFzdXJlID0gaGFzKGVuY29kaW5nLCBZKSAmJiBpc01lYXN1cmUoZW5jb2RpbmcueSk7XG5cbiAgICBpZiAoaXNYTWVhc3VyZSAmJiAhaXNZTWVhc3VyZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ3JvdXBieUNoYW5uZWw6IFksXG4gICAgICAgIGZpZWxkQ2hhbm5lbDogWCxcbiAgICAgICAgc3RhY2tGaWVsZHM6IHN0YWNrRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IGNvbmZpZy5tYXJrLnN0YWNrZWRcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc1lNZWFzdXJlICYmICFpc1hNZWFzdXJlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncm91cGJ5Q2hhbm5lbDogWCxcbiAgICAgICAgZmllbGRDaGFubmVsOiBZLFxuICAgICAgICBzdGFja0ZpZWxkczogc3RhY2tGaWVsZHMsXG4gICAgICAgIG9mZnNldDogY29uZmlnLm1hcmsuc3RhY2tlZFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBDb21waWxlIHN0YWNrLWJ5IGZpZWxkIG5hbWVzIGZyb20gKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG5mdW5jdGlvbiBnZXRTdGFja0ZpZWxkcyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIHNjYWxlTWFwOiBEaWN0PFNjYWxlPikge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIE9QQUNJVFksIFNJWkVdLnJlZHVjZShmdW5jdGlvbihmaWVsZHMsIGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsRW5jb2RpbmcgPSBlbmNvZGluZ1tjaGFubmVsXTtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoY2hhbm5lbEVuY29kaW5nKSkge1xuICAgICAgICBjaGFubmVsRW5jb2RpbmcuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmllbGREZWY6IEZpZWxkRGVmID0gY2hhbm5lbEVuY29kaW5nO1xuICAgICAgICBjb25zdCBzY2FsZSA9IHNjYWxlTWFwW2NoYW5uZWxdO1xuICAgICAgICBmaWVsZHMucHVzaChmaWVsZChmaWVsZERlZiwge1xuICAgICAgICAgIGJpblN1ZmZpeDogc2NhbGUgJiYgc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgPyAnX3JhbmdlJyA6ICdfc3RhcnQnXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkcztcbiAgfSwgW10pO1xufVxuXG4vLyBpbXB1dGUgZGF0YSBmb3Igc3RhY2tlZCBhcmVhXG5leHBvcnQgZnVuY3Rpb24gaW1wdXRlVHJhbnNmb3JtKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2ltcHV0ZScsXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgZ3JvdXBieTogc3RhY2suc3RhY2tGaWVsZHMsXG4gICAgb3JkZXJieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsKV0sXG4gICAgbWV0aG9kOiAndmFsdWUnLFxuICAgIHZhbHVlOiAwXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja1RyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgY29uc3QgZW5jb2RpbmcgPSBtb2RlbC5lbmNvZGluZygpO1xuICBjb25zdCBzb3J0YnkgPSBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAoaXNBcnJheShlbmNvZGluZ1tPUkRFUl0pID8gZW5jb2RpbmdbT1JERVJdIDogW2VuY29kaW5nW09SREVSXV0pLm1hcChzb3J0RmllbGQpIDpcbiAgICAvLyBkZWZhdWx0ID0gZGVzY2VuZGluZyBieSBzdGFja0ZpZWxkc1xuICAgIHN0YWNrLnN0YWNrRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICByZXR1cm4gJy0nICsgZmllbGQ7XG4gICAgfSk7XG5cbiAgY29uc3QgdmFsTmFtZSA9IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCk7XG5cbiAgLy8gYWRkIHN0YWNrIHRyYW5zZm9ybSB0byBtYXJrXG4gIGxldCB0cmFuc2Zvcm06IFN0YWNrVHJhbnNmb3JtID0ge1xuICAgIHR5cGU6ICdzdGFjaycsXG4gICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsKV0sXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgc29ydGJ5OiBzb3J0YnksXG4gICAgb3V0cHV0OiB7XG4gICAgICBzdGFydDogdmFsTmFtZSArICdfc3RhcnQnLFxuICAgICAgZW5kOiB2YWxOYW1lICsgJ19lbmQnXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGFjay5vZmZzZXQpIHtcbiAgICB0cmFuc2Zvcm0ub2Zmc2V0ID0gc3RhY2sub2Zmc2V0O1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm07XG59XG4iLCJpbXBvcnQge2NvbnRhaW5zLCByYW5nZX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBTSEFQRSwgQ09MT1IsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi4vdGltZXVuaXQnO1xuXG4vKiogcmV0dXJucyB0aGUgc21hbGxlc3QgbmljZSB1bml0IGZvciBzY2FsZS5uaWNlICovXG5leHBvcnQgZnVuY3Rpb24gc21hbGxlc3RVbml0KHRpbWVVbml0KTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignc2Vjb25kJykgPiAtMSkge1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdtaW51dGUnKSA+IC0xKSB7XG4gICAgcmV0dXJuICdtaW51dGUnO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ2hvdXInKSA+IC0xKSB7XG4gICAgcmV0dXJuICdob3VyJztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdkYXknKSA+IC0xIHx8IHRpbWVVbml0LmluZGV4T2YoJ2RhdGUnKSA+IC0xKSB7XG4gICAgcmV0dXJuICdkYXknO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ21vbnRoJykgPiAtMSkge1xuICAgIHJldHVybiAnbW9udGgnO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ3llYXInKSA+IC0xKSB7XG4gICAgcmV0dXJuICd5ZWFyJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHRpbWVVbml0OiBUaW1lVW5pdCwgZmllbGRSZWY6IHN0cmluZywgb25seVJlZiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgbGV0IG91dCA9ICdkYXRldGltZSgnO1xuICBsZXQgdGltZVN0cmluZyA9IHRpbWVVbml0LnRvU3RyaW5nKCk7XG5cbiAgZnVuY3Rpb24gZ2V0KGZ1bjogc3RyaW5nLCBhZGRDb21tYSA9IHRydWUpIHtcbiAgICBpZiAob25seVJlZikge1xuICAgICAgcmV0dXJuIGZpZWxkUmVmICsgKGFkZENvbW1hID8gJywgJyA6ICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1biArICcoJyArIGZpZWxkUmVmICsgJyknICsgKGFkZENvbW1hID8gJywgJyA6ICcnKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCd5ZWFyJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ3llYXInKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzIwMDYsICc7IC8vIEphbnVhcnkgMSAyMDA2IGlzIGEgU3VuZGF5XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdtb250aCcpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdtb250aCcpO1xuICB9IGVsc2Uge1xuICAgIC8vIG1vbnRoIHN0YXJ0cyBhdCAwIGluIGphdmFzY3JpcHRcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICAvLyBuZWVkIHRvIGFkZCAxIGJlY2F1c2UgZGF5cyBzdGFydCBhdCAxXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ2RheScpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdkYXknLCBmYWxzZSkgKyAnKzEsICc7XG4gIH0gZWxzZSBpZiAodGltZVN0cmluZy5pbmRleE9mKCdkYXRlJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ2RhdGUnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzEsICc7XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdob3VycycpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdob3VycycpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbnV0ZXMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnbWludXRlcycpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ3NlY29uZHMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnc2Vjb25kcycpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbGxpc2Vjb25kcycpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdtaWxsaXNlY29uZHMnLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwJztcbiAgfVxuXG4gIHJldHVybiBvdXQgKyAnKSc7XG59XG5cbi8qKiBHZW5lcmF0ZSB0aGUgY29tcGxldGUgcmF3IGRvbWFpbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYXdEb21haW4odGltZVVuaXQ6IFRpbWVVbml0LCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjb250YWlucyhbUk9XLCBDT0xVTU4sIFNIQVBFLCBDT0xPUl0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgY2FzZSBUaW1lVW5pdC5TRUNPTkRTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDYwKTtcbiAgICBjYXNlIFRpbWVVbml0Lk1JTlVURVM6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNjApO1xuICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgMjQpO1xuICAgIGNhc2UgVGltZVVuaXQuREFZOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDcpO1xuICAgIGNhc2UgVGltZVVuaXQuREFURTpcbiAgICAgIHJldHVybiByYW5nZSgxLCAzMik7XG4gICAgY2FzZSBUaW1lVW5pdC5NT05USDpcbiAgICAgIHJldHVybiByYW5nZSgwLCAxMik7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0F4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtYLCBZLCBURVhULCBQQVRILCBPUkRFUiwgQ2hhbm5lbCwgVU5JVF9DSEFOTkVMUywgIFVOSVRfU0NBTEVfQ0hBTk5FTFMsIE5PTlNQQVRJQUxfU0NBTEVfQ0hBTk5FTFMsIHN1cHBvcnRNYXJrfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuLi9lbmNvZGluZyc7IC8vIFRPRE86IHJlbW92ZVxuaW1wb3J0IHtGaWVsZERlZiwgRmllbGRSZWZPcHRpb24sIGZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi4vbGVnZW5kJztcbmltcG9ydCB7TWFyaywgVEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7RXh0ZW5kZWRVbml0U3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2dldEZ1bGxOYW1lLCBRVUFOVElUQVRJVkV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtkdXBsaWNhdGUsIGV4dGVuZCwgbWVyZ2VEZWVwLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7cGFyc2VBeGlzQ29tcG9uZW50fSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHthcHBseUNvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge2luaXRNYXJrQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VVbml0RGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHtwYXJzZUxlZ2VuZENvbXBvbmVudH0gZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VVbml0TGF5b3V0fSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cGFyc2VNYXJrfSBmcm9tICcuL21hcmsvbWFyayc7XG5pbXBvcnQge3BhcnNlU2NhbGVDb21wb25lbnQsIHNjYWxlVHlwZX0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge2NvbXBpbGVTdGFja1Byb3BlcnRpZXMsIFN0YWNrUHJvcGVydGllc30gZnJvbSAnLi9zdGFjayc7XG5cbi8qKlxuICogSW50ZXJuYWwgbW9kZWwgb2YgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24gZm9yIHRoZSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFVuaXRNb2RlbCBleHRlbmRzIE1vZGVsIHtcblxuICBwcml2YXRlIF9tYXJrOiBNYXJrO1xuICBwcml2YXRlIF9lbmNvZGluZzogRW5jb2Rpbmc7XG4gIHByaXZhdGUgX3N0YWNrOiBTdGFja1Byb3BlcnRpZXM7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogRXh0ZW5kZWRVbml0U3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG5cbiAgICBjb25zdCBtYXJrID0gdGhpcy5fbWFyayA9IHNwZWMubWFyaztcbiAgICBjb25zdCBlbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nID0gdGhpcy5faW5pdEVuY29kaW5nKG1hcmssIHNwZWMuZW5jb2RpbmcgfHwge30pO1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZyA9IHRoaXMuX2luaXRDb25maWcoc3BlYy5jb25maWcsIHBhcmVudCwgbWFyaywgZW5jb2RpbmcpO1xuXG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLl9zY2FsZSA9ICB0aGlzLl9pbml0U2NhbGUobWFyaywgZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fYXhpcyA9IHRoaXMuX2luaXRBeGlzKGVuY29kaW5nLCBjb25maWcpO1xuICAgIHRoaXMuX2xlZ2VuZCA9IHRoaXMuX2luaXRMZWdlbmQoZW5jb2RpbmcsIGNvbmZpZyk7XG5cbiAgICAvLyBjYWxjdWxhdGUgc3RhY2tcbiAgICB0aGlzLl9zdGFjayA9IGNvbXBpbGVTdGFja1Byb3BlcnRpZXMobWFyaywgZW5jb2RpbmcsIHNjYWxlLCBjb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVuY29kaW5nKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgIC8vIGNsb25lIHRvIHByZXZlbnQgc2lkZSBlZmZlY3QgdG8gdGhlIG9yaWdpbmFsIHNwZWNcbiAgICBlbmNvZGluZyA9IGR1cGxpY2F0ZShlbmNvZGluZyk7XG5cbiAgICB2bEVuY29kaW5nLmZvckVhY2goZW5jb2RpbmcsIGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKCFzdXBwb3J0TWFyayhjaGFubmVsLCBtYXJrKSkge1xuICAgICAgICAvLyBEcm9wIHVuc3VwcG9ydGVkIGNoYW5uZWxcblxuICAgICAgICAvLyBGSVhNRSBjb25zb2xpZGF0ZSB3YXJuaW5nIG1ldGhvZFxuICAgICAgICBjb25zb2xlLndhcm4oY2hhbm5lbCwgJ2Ryb3BwZWQgYXMgaXQgaXMgaW5jb21wYXRpYmxlIHdpdGgnLCBtYXJrKTtcbiAgICAgICAgZGVsZXRlIGZpZWxkRGVmLmZpZWxkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERlZi50eXBlKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgc2hvcnQgdHlwZSB0byBmdWxsIHR5cGVcbiAgICAgICAgZmllbGREZWYudHlwZSA9IGdldEZ1bGxOYW1lKGZpZWxkRGVmLnR5cGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGNoYW5uZWwgPT09IFBBVEggfHwgY2hhbm5lbCA9PT0gT1JERVIpICYmICFmaWVsZERlZi5hZ2dyZWdhdGUgJiYgZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9IEFnZ3JlZ2F0ZU9wLk1JTjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZW5jb2Rpbmc7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZmlnKHNwZWNDb25maWc6IENvbmZpZywgcGFyZW50OiBNb2RlbCwgbWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgbGV0IGNvbmZpZyA9IG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHBhcmVudCA/IHBhcmVudC5jb25maWcoKSA6IHt9LCBzcGVjQ29uZmlnKTtcbiAgICBjb25maWcubWFyayA9IGluaXRNYXJrQ29uZmlnKG1hcmssIGVuY29kaW5nLCBjb25maWcpO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2NhbGUobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IERpY3Q8U2NhbGU+IHtcbiAgICByZXR1cm4gVU5JVF9TQ0FMRV9DSEFOTkVMUy5yZWR1Y2UoZnVuY3Rpb24oX3NjYWxlLCBjaGFubmVsKSB7XG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlU3BlYyA9IGVuY29kaW5nW2NoYW5uZWxdLnNjYWxlIHx8IHt9O1xuICAgICAgICBjb25zdCBjaGFubmVsRGVmID0gZW5jb2RpbmdbY2hhbm5lbF07XG5cbiAgICAgICAgY29uc3QgX3NjYWxlVHlwZSA9IHNjYWxlVHlwZShzY2FsZVNwZWMsIGNoYW5uZWxEZWYsIGNoYW5uZWwsIG1hcmspO1xuXG4gICAgICAgIF9zY2FsZVtjaGFubmVsXSA9IGV4dGVuZCh7XG4gICAgICAgICAgdHlwZTogX3NjYWxlVHlwZSxcbiAgICAgICAgICByb3VuZDogY29uZmlnLnNjYWxlLnJvdW5kLFxuICAgICAgICAgIHBhZGRpbmc6IGNvbmZpZy5zY2FsZS5wYWRkaW5nLFxuICAgICAgICAgIHVzZVJhd0RvbWFpbjogY29uZmlnLnNjYWxlLnVzZVJhd0RvbWFpbixcbiAgICAgICAgICBiYW5kU2l6ZTogY2hhbm5lbCA9PT0gWCAmJiBfc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBtYXJrID09PSBURVhUTUFSSyA/XG4gICAgICAgICAgICAgICAgICAgICBjb25maWcuc2NhbGUudGV4dEJhbmRXaWR0aCA6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZVxuICAgICAgICB9LCBzY2FsZVNwZWMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXhpcyhlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogRGljdDxBeGlzPiB7XG4gICAgcmV0dXJuIFtYLCBZXS5yZWR1Y2UoZnVuY3Rpb24oX2F4aXMsIGNoYW5uZWwpIHtcbiAgICAgIC8vIFBvc2l0aW9uIEF4aXNcbiAgICAgIGlmICh2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3QgYXhpc1NwZWMgPSBlbmNvZGluZ1tjaGFubmVsXS5heGlzO1xuICAgICAgICBpZiAoYXhpc1NwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2F4aXNbY2hhbm5lbF0gPSBleHRlbmQoe30sXG4gICAgICAgICAgICBjb25maWcuYXhpcyxcbiAgICAgICAgICAgIGF4aXNTcGVjID09PSB0cnVlID8ge30gOiBheGlzU3BlYyB8fCAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TGVnZW5kKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PExlZ2VuZD4ge1xuICAgIHJldHVybiBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfbGVnZW5kLCBjaGFubmVsKSB7XG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGxlZ2VuZFNwZWMgPSBlbmNvZGluZ1tjaGFubmVsXS5sZWdlbmQ7XG4gICAgICAgIGlmIChsZWdlbmRTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIF9sZWdlbmRbY2hhbm5lbF0gPSBleHRlbmQoe30sIGNvbmZpZy5sZWdlbmQsXG4gICAgICAgICAgICBsZWdlbmRTcGVjID09PSB0cnVlID8ge30gOiBsZWdlbmRTcGVjIHx8ICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfbGVnZW5kO1xuICAgIH0sIHt9IGFzIERpY3Q8TGVnZW5kPik7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZVVuaXREYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZVVuaXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBwYXJzZU1hcmsodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1gsIFldKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSBwYXJzZUxlZ2VuZENvbXBvbmVudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFyaztcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKSB7XG4gICAgcmV0dXJuIGFwcGx5Q29uZmlnKHt9LCBjZWxsQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFVOSVRfQ0hBTk5FTFM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCk6IFN0YWNrUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrO1xuICB9XG5cbiAgcHVibGljIHRvU3BlYyhleGNsdWRlQ29uZmlnPywgZXhjbHVkZURhdGE/KSB7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBkdXBsaWNhdGUodGhpcy5fZW5jb2RpbmcpO1xuICAgIGxldCBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fbWFyayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgIH07XG5cbiAgICBpZiAoIWV4Y2x1ZGVDb25maWcpIHtcbiAgICAgIHNwZWMuY29uZmlnID0gZHVwbGljYXRlKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFleGNsdWRlRGF0YSkge1xuICAgICAgc3BlYy5kYXRhID0gZHVwbGljYXRlKHRoaXMuX2RhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgcHVibGljIG1hcmsoKTogTWFyayB7XG4gICAgcmV0dXJuIHRoaXMuX21hcms7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5oYXModGhpcy5fZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGVuY29kaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHx8IHt9XG4gICAgLy8gQ3VycmVudGx5IHdlIGhhdmUgaXQgdG8gcHJldmVudCBudWxsIHBvaW50ZXIgZXhjZXB0aW9uLlxuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZ1tjaGFubmVsXSB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgXCJmaWVsZFwiIHJlZmVyZW5jZSBmb3IgdmVnYSAqL1xuICBwdWJsaWMgZmllbGQoY2hhbm5lbDogQ2hhbm5lbCwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogdGhpcy5zY2FsZShjaGFubmVsKS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgIH0sIG9wdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkKGZpZWxkRGVmLCBvcHQpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTmFtZSh2bEVuY29kaW5nLmlzQWdncmVnYXRlKHRoaXMuX2VuY29kaW5nKSA/IFNVTU1BUlkgOiBTT1VSQ0UpO1xuICB9XG5cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTY2FsZUNvbmZpZywgRmFjZXRTY2FsZUNvbmZpZywgZGVmYXVsdFNjYWxlQ29uZmlnLCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZ30gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge0F4aXNDb25maWcsIGRlZmF1bHRBeGlzQ29uZmlnLCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtMZWdlbmRDb25maWcsIGRlZmF1bHRMZWdlbmRDb25maWd9IGZyb20gJy4vbGVnZW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBDZWxsQ29uZmlnIHtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcblxuICBjbGlwPzogYm9vbGVhbjtcblxuICAvLyBGSUxMX1NUUk9LRV9DT05GSUdcbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgZmlsbCBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzdHJva2UgY29sb3IuICovXG4gIHN0cm9rZT86IHN0cmluZztcblxuICAvKiogVGhlIHN0cm9rZSBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvKiogVGhlIHN0cm9rZSB3aWR0aCwgaW4gcGl4ZWxzLiAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKiogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLiAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LiAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENlbGxDb25maWc6IENlbGxDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgc3Ryb2tlOiAnI2NjYycsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgLyoqIEZhY2V0IFNjYWxlIENvbmZpZyAqL1xuICBzY2FsZT86IEZhY2V0U2NhbGVDb25maWc7XG5cbiAgLyoqIEZhY2V0IEF4aXMgQ29uZmlnICovXG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBHcmlkIENvbmZpZyAqL1xuICBncmlkPzogRmFjZXRHcmlkQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBDZWxsIENvbmZpZyAqL1xuICBjZWxsPzogQ2VsbENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldEdyaWRDb25maWcge1xuICAvKiogQGZvcm1hdCBjb2xvciAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgb2Zmc2V0PzogbnVtYmVyO1xufVxuXG5jb25zdCBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnOiBGYWNldEdyaWRDb25maWcgPSB7XG4gIGNvbG9yOiAnIzAwMDAwMCcsXG4gIG9wYWNpdHk6IDAuNCxcbiAgb2Zmc2V0OiAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q29uZmlnOiBGYWNldENvbmZpZyA9IHtcbiAgc2NhbGU6IGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnLFxuICBheGlzOiBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnLFxuICBncmlkOiBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnLFxuICBjZWxsOiBkZWZhdWx0RmFjZXRDZWxsQ29uZmlnXG59O1xuXG5leHBvcnQgZW51bSBGb250V2VpZ2h0IHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgQk9MRCA9ICdib2xkJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gU2hhcGUge1xuICAgIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnksXG4gICAgQ1JPU1MgPSAnY3Jvc3MnIGFzIGFueSxcbiAgICBESUFNT05EID0gJ2RpYW1vbmQnIGFzIGFueSxcbiAgICBUUklBTkdMRVVQID0gJ3RyaWFuZ2xlLXVwJyBhcyBhbnksXG4gICAgVFJJQU5HTEVET1dOID0gJ3RyaWFuZ2xlLWRvd24nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gSG9yaXpvbnRhbEFsaWduIHtcbiAgICBMRUZUID0gJ2xlZnQnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gVmVydGljYWxBbGlnbiB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIE1JRERMRSA9ICdtaWRkbGUnIGFzIGFueSxcbiAgICBCT1RUT00gPSAnYm90dG9tJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEZvbnRTdHlsZSB7XG4gICAgTk9STUFMID0gJ25vcm1hbCcgYXMgYW55LFxuICAgIElUQUxJQyA9ICdpdGFsaWMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gU3RhY2tPZmZzZXQge1xuICAgIFpFUk8gPSAnemVybycgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbiAgICBOT1JNQUxJWkUgPSAnbm9ybWFsaXplJyBhcyBhbnksXG4gICAgTk9ORSA9ICdub25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEludGVycG9sYXRlIHtcbiAgICAvKiogcGllY2V3aXNlIGxpbmVhciBzZWdtZW50cywgYXMgaW4gYSBwb2x5bGluZSAqL1xuICAgIExJTkVBUiA9ICdsaW5lYXInIGFzIGFueSxcbiAgICAvKiogY2xvc2UgdGhlIGxpbmVhciBzZWdtZW50cyB0byBmb3JtIGEgcG9seWdvbiAqL1xuICAgIExJTkVBUl9DTE9TRUQgPSAnbGluZWFyLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBhbHRlcm5hdGUgYmV0d2VlbiBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzZWdtZW50cywgYXMgaW4gYSBzdGVwIGZ1bmN0aW9uICovXG4gICAgU1RFUCA9ICdzdGVwJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQX0JFRk9SRSA9ICdzdGVwLWJlZm9yZScgYXMgYW55LFxuICAgIC8qKiBhbHRlcm5hdGUgYmV0d2VlbiBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzZWdtZW50cywgYXMgaW4gYSBzdGVwIGZ1bmN0aW9uICovXG4gICAgU1RFUF9BRlRFUiA9ICdzdGVwLWFmdGVyJyBhcyBhbnksXG4gICAgLyoqIGEgQi1zcGxpbmUsIHdpdGggY29udHJvbCBwb2ludCBkdXBsaWNhdGlvbiBvbiB0aGUgZW5kcyAqL1xuICAgIEJBU0lTID0gJ2Jhc2lzJyBhcyBhbnksXG4gICAgLyoqIGFuIG9wZW4gQi1zcGxpbmU7IG1heSBub3QgaW50ZXJzZWN0IHRoZSBzdGFydCBvciBlbmQgKi9cbiAgICBCQVNJU19PUEVOID0gJ2Jhc2lzLW9wZW4nIGFzIGFueSxcbiAgICAvKiogYSBjbG9zZWQgQi1zcGxpbmUsIGFzIGluIGEgbG9vcCAqL1xuICAgIEJBU0lTX0NMT1NFRCA9ICdiYXNpcy1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogYSBDYXJkaW5hbCBzcGxpbmUsIHdpdGggY29udHJvbCBwb2ludCBkdXBsaWNhdGlvbiBvbiB0aGUgZW5kcyAqL1xuICAgIENBUkRJTkFMID0gJ2NhcmRpbmFsJyBhcyBhbnksXG4gICAgLyoqIGFuIG9wZW4gQ2FyZGluYWwgc3BsaW5lOyBtYXkgbm90IGludGVyc2VjdCB0aGUgc3RhcnQgb3IgZW5kLCBidXQgd2lsbCBpbnRlcnNlY3Qgb3RoZXIgY29udHJvbCBwb2ludHMgKi9cbiAgICBDQVJESU5BTF9PUEVOID0gJ2NhcmRpbmFsLW9wZW4nIGFzIGFueSxcbiAgICAvKiogYSBjbG9zZWQgQ2FyZGluYWwgc3BsaW5lLCBhcyBpbiBhIGxvb3AgKi9cbiAgICBDQVJESU5BTF9DTE9TRUQgPSAnY2FyZGluYWwtY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGVxdWl2YWxlbnQgdG8gYmFzaXMsIGV4Y2VwdCB0aGUgdGVuc2lvbiBwYXJhbWV0ZXIgaXMgdXNlZCB0byBzdHJhaWdodGVuIHRoZSBzcGxpbmUgKi9cbiAgICBCVU5ETEUgPSAnYnVuZGxlJyBhcyBhbnksXG4gICAgLyoqIGN1YmljIGludGVycG9sYXRpb24gdGhhdCBwcmVzZXJ2ZXMgbW9ub3RvbmljaXR5IGluIHkgKi9cbiAgICBNT05PVE9ORSA9ICdtb25vdG9uZScgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtDb25maWcge1xuXG4gIC8vIC0tLS0tLS0tLS0gQ29sb3IgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2hhcGVcXCdzIGNvbG9yIHNob3VsZCBiZSB1c2VkIGFzIGZpbGwgY29sb3IgaW5zdGVhZCBvZiBzdHJva2UgY29sb3IuXG4gICAqIFRoaXMgaXMgb25seSBhcHBsaWNhYmxlIGZvciBcImJhclwiLCBcInBvaW50XCIsIGFuZCBcImFyZWFcIi5cbiAgICogQWxsIG1hcmtzIGV4Y2VwdCBcInBvaW50XCIgbWFya3MgYXJlIGZpbGxlZCBieSBkZWZhdWx0LlxuICAgKiBTZWUgTWFyayBEb2N1bWVudGF0aW9uIChodHRwOi8vdmVnYS5naXRodWIuaW8vdmVnYS1saXRlL2RvY3MvbWFya3MuaHRtbClcbiAgICogZm9yIHVzYWdlIGV4YW1wbGUuXG4gICAqL1xuICBmaWxsZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbG9yLlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBjb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBGaWxsIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgZmlsbD86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBTdHJva2UgQ29sb3IuICBUaGlzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIGNvbmZpZy5jb2xvclxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBzdHJva2U/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBPcGFjaXR5IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgb3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gU3Ryb2tlIFN0eWxlIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuXG4gICAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LlxuICAgKi9cbiAgc3Ryb2tlRGFzaE9mZnNldD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFN0YWNraW5nOiBCYXIgJiBBcmVhIC0tLS0tLS0tLS1cbiAgc3RhY2tlZD86IFN0YWNrT2Zmc2V0O1xuXG4gIC8vIC0tLS0tLS0tLS0gT3JpZW50YXRpb246IEJhciwgVGljaywgTGluZSwgQXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgYSBub24tc3RhY2tlZCBiYXIsIHRpY2ssIGFyZWEsIGFuZCBsaW5lIGNoYXJ0cy5cbiAgICogVGhlIHZhbHVlIGlzIGVpdGhlciBob3Jpem9udGFsIChkZWZhdWx0KSBvciB2ZXJ0aWNhbC5cbiAgICogLSBGb3IgYmFyLCBydWxlIGFuZCB0aWNrLCB0aGlzIGRldGVybWluZXMgd2hldGhlciB0aGUgc2l6ZSBvZiB0aGUgYmFyIGFuZCB0aWNrXG4gICAqIHNob3VsZCBiZSBhcHBsaWVkIHRvIHggb3IgeSBkaW1lbnNpb24uXG4gICAqIC0gRm9yIGFyZWEsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgb3JpZW50IHByb3BlcnR5IG9mIHRoZSBWZWdhIG91dHB1dC5cbiAgICogLSBGb3IgbGluZSwgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBzb3J0IG9yZGVyIG9mIHRoZSBwb2ludHMgaW4gdGhlIGxpbmVcbiAgICogaWYgYGNvbmZpZy5zb3J0TGluZUJ5YCBpcyBub3Qgc3BlY2lmaWVkLlxuICAgKiBGb3Igc3RhY2tlZCBjaGFydHMsIHRoaXMgaXMgYWx3YXlzIGRldGVybWluZWQgYnkgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzdGFjaztcbiAgICogdGhlcmVmb3JlIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHZhbHVlIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIG9yaWVudD86IHN0cmluZztcblxuICAvLyAtLS0tLS0tLS0tIEludGVycG9sYXRpb246IExpbmUgLyBhcmVhIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBsaW5lIGludGVycG9sYXRpb24gbWV0aG9kIHRvIHVzZS4gT25lIG9mIGxpbmVhciwgc3RlcC1iZWZvcmUsIHN0ZXAtYWZ0ZXIsIGJhc2lzLCBiYXNpcy1vcGVuLCBjYXJkaW5hbCwgY2FyZGluYWwtb3BlbiwgbW9ub3RvbmUuXG4gICAqL1xuICBpbnRlcnBvbGF0ZT86IEludGVycG9sYXRlO1xuICAvKipcbiAgICogRGVwZW5kaW5nIG9uIHRoZSBpbnRlcnBvbGF0aW9uIHR5cGUsIHNldHMgdGhlIHRlbnNpb24gcGFyYW1ldGVyLlxuICAgKi9cbiAgdGVuc2lvbj86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIExpbmUgLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBTaXplIG9mIGxpbmUgbWFyay5cbiAgICovXG4gIGxpbmVTaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gUnVsZSAtLS0tLS0tLS1cbiAgLyoqXG4gICAqIFNpemUgb2YgcnVsZSBtYXJrLlxuICAgKi9cbiAgcnVsZVNpemU/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBCYXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMuICBJZiB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgc2l6ZSBpcyAgYGJhbmRTaXplLTFgLFxuICAgKiB3aGljaCBwcm92aWRlcyAxIHBpeGVsIG9mZnNldCBiZXR3ZWVuIGJhcnMuXG4gICAqL1xuICBiYXJTaXplPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgYmFycyBvbiBjb250aW51b3VzIHNjYWxlcy5cbiAgICovXG4gIGJhclRoaW5TaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHN5bWJvbCBzaGFwZSB0byB1c2UuIE9uZSBvZiBjaXJjbGUgKGRlZmF1bHQpLCBzcXVhcmUsIGNyb3NzLCBkaWFtb25kLCB0cmlhbmdsZS11cCwgb3IgdHJpYW5nbGUtZG93bi5cbiAgICovXG4gIHNoYXBlPzogU2hhcGU7XG5cbiAgLy8gLS0tLS0tLS0tLSBQb2ludCBTaXplIChQb2ludCAvIFNxdWFyZSAvIENpcmNsZSkgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHBpeGVsIGFyZWEgZWFjaCB0aGUgcG9pbnQuIEZvciBleGFtcGxlOiBpbiB0aGUgY2FzZSBvZiBjaXJjbGVzLCB0aGUgcmFkaXVzIGlzIGRldGVybWluZWQgaW4gcGFydCBieSB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHNpemUgdmFsdWUuXG4gICAqL1xuICBzaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGljayAtLS0tLS0tLS0tXG4gIC8qKiBUaGUgd2lkdGggb2YgdGhlIHRpY2tzLiAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcblxuICAvKiogVGhpY2tuZXNzIG9mIHRoZSB0aWNrIG1hcmsuICovXG4gIHRpY2tUaGlja25lc3M/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBUZXh0IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIGxlZnQsIHJpZ2h0LCBjZW50ZXIuXG4gICAqL1xuICBhbGlnbj86IEhvcml6b250YWxBbGlnbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgdGV4dCwgaW4gZGVncmVlcy5cbiAgICovXG4gIGFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIHRvcCwgbWlkZGxlLCBib3R0b20uXG4gICAqL1xuICBiYXNlbGluZT86IFZlcnRpY2FsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR4PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIG9mZnNldCwgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRoZSB0ZXh0IGxhYmVsIGFuZCBpdHMgYW5jaG9yIHBvaW50LiBUaGUgb2Zmc2V0IGlzIGFwcGxpZWQgYWZ0ZXIgcm90YXRpb24gYnkgdGhlIGFuZ2xlIHByb3BlcnR5LlxuICAgKi9cbiAgZHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIHJhZGlhbCBvZmZzZXQsIGluIHBpeGVscywgb2YgdGhlIHRleHQgbGFiZWwgZnJvbSB0aGUgb3JpZ2luIGRldGVybWluZWQgYnkgdGhlIHggYW5kIHkgcHJvcGVydGllcy5cbiAgICovXG4gIHJhZGl1cz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFBvbGFyIGNvb3JkaW5hdGUgYW5nbGUsIGluIHJhZGlhbnMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuIFZhbHVlcyBmb3IgdGhldGEgZm9sbG93IHRoZSBzYW1lIGNvbnZlbnRpb24gb2YgYXJjIG1hcmsgc3RhcnRBbmdsZSBhbmQgZW5kQW5nbGUgcHJvcGVydGllczogYW5nbGVzIGFyZSBtZWFzdXJlZCBpbiByYWRpYW5zLCB3aXRoIDAgaW5kaWNhdGluZyBcIm5vcnRoXCIuXG4gICAqL1xuICB0aGV0YT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB0eXBlZmFjZSB0byBzZXQgdGhlIHRleHQgaW4gKGUuZy4sIEhlbHZldGljYSBOZXVlKS5cbiAgICovXG4gIGZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplLCBpbiBwaXhlbHMuXG4gICAqL1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb250IHN0eWxlIChlLmcuLCBpdGFsaWMpLlxuICAgKi9cbiAgZm9udFN0eWxlPzogRm9udFN0eWxlO1xuICAvKipcbiAgICogVGhlIGZvbnQgd2VpZ2h0IChlLmcuLCBib2xkKS5cbiAgICovXG4gIGZvbnRXZWlnaHQ/OiBGb250V2VpZ2h0O1xuICAvLyBWZWdhLUxpdGUgb25seSBmb3IgdGV4dCBvbmx5XG4gIC8qKlxuICAgKiBUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciB0ZXh0IHZhbHVlLiBJZiBub3QgZGVmaW5lZCwgdGhpcyB3aWxsIGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseS5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIFRleHRcbiAgICovXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNvbG9yIGZpZWxkIHRvIGJhY2tncm91bmQgY29sb3IgaW5zdGVhZCBvZiB0aGUgdGV4dC5cbiAgICovXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7XG4gIGNvbG9yOiAnIzQ2ODJiNCcsXG4gIHNoYXBlOiBTaGFwZS5DSVJDTEUsXG4gIHN0cm9rZVdpZHRoOiAyLFxuICBzaXplOiAzMCxcbiAgYmFyVGhpblNpemU6IDIsXG4gIC8vIGxpbmVTaXplIGlzIHVuZGVmaW5lZCBieSBkZWZhdWx0LCBhbmQgcmVmZXIgdG8gdmFsdWUgZnJvbSBzdHJva2VXaWR0aFxuICBydWxlU2l6ZTogMSxcbiAgdGlja1RoaWNrbmVzczogMSxcblxuICBmb250U2l6ZTogMTAsXG4gIGJhc2VsaW5lOiBWZXJ0aWNhbEFsaWduLk1JRERMRSxcbiAgdGV4dDogJ0FiYycsXG5cbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZSxcbiAgYXBwbHlDb2xvclRvQmFja2dyb3VuZDogZmFsc2Vcbn07XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAvLyBUT0RPOiBhZGQgdGhpcyBiYWNrIG9uY2Ugd2UgaGF2ZSB0b3AtZG93biBsYXlvdXQgYXBwcm9hY2hcbiAgLy8gd2lkdGg/OiBudW1iZXI7XG4gIC8vIGhlaWdodD86IG51bWJlcjtcbiAgLy8gcGFkZGluZz86IG51bWJlcnxzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgb24tc2NyZWVuIHZpZXdwb3J0LCBpbiBwaXhlbHMuIElmIG5lY2Vzc2FyeSwgY2xpcHBpbmcgYW5kIHNjcm9sbGluZyB3aWxsIGJlIGFwcGxpZWQuXG4gICAqL1xuICB2aWV3cG9ydD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENTUyBjb2xvciBwcm9wZXJ0eSB0byB1c2UgYXMgYmFja2dyb3VuZCBvZiB2aXN1YWxpemF0aW9uLiBEZWZhdWx0IGlzIGBcInRyYW5zcGFyZW50XCJgLlxuICAgKi9cbiAgYmFja2dyb3VuZD86IHN0cmluZztcblxuICAvKipcbiAgICogRDMgTnVtYmVyIGZvcm1hdCBmb3IgYXhpcyBsYWJlbHMgYW5kIHRleHQgdGFibGVzLiBGb3IgZXhhbXBsZSBcInNcIiBmb3IgU0kgdW5pdHMuXG4gICAqL1xuICBudW1iZXJGb3JtYXQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZGF0ZXRpbWUgZm9ybWF0IGZvciBheGlzIGFuZCBsZWdlbmQgbGFiZWxzLiBUaGUgZm9ybWF0IGNhbiBiZSBzZXQgZGlyZWN0bHkgb24gZWFjaCBheGlzIGFuZCBsZWdlbmQuXG4gICAqL1xuICB0aW1lRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKiBDZWxsIENvbmZpZyAqL1xuICBjZWxsPzogQ2VsbENvbmZpZztcblxuICAvKiogTWFyayBDb25maWcgKi9cbiAgbWFyaz86IE1hcmtDb25maWc7XG5cbiAgLyoqIFNjYWxlIENvbmZpZyAqL1xuICBzY2FsZT86IFNjYWxlQ29uZmlnO1xuXG4gIC8qKiBBeGlzIENvbmZpZyAqL1xuICBheGlzPzogQXhpc0NvbmZpZztcblxuICAvKiogTGVnZW5kIENvbmZpZyAqL1xuICBsZWdlbmQ/OiBMZWdlbmRDb25maWc7XG5cbiAgLyoqIEZhY2V0IENvbmZpZyAqL1xuICBmYWNldD86IEZhY2V0Q29uZmlnO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbmZpZzogQ29uZmlnID0ge1xuICBudW1iZXJGb3JtYXQ6ICdzJyxcbiAgdGltZUZvcm1hdDogJyVZLSVtLSVkJyxcblxuICBjZWxsOiBkZWZhdWx0Q2VsbENvbmZpZyxcbiAgbWFyazogZGVmYXVsdE1hcmtDb25maWcsXG4gIHNjYWxlOiBkZWZhdWx0U2NhbGVDb25maWcsXG4gIGF4aXM6IGRlZmF1bHRBeGlzQ29uZmlnLFxuICBsZWdlbmQ6IGRlZmF1bHRMZWdlbmRDb25maWcsXG5cbiAgZmFjZXQ6IGRlZmF1bHRGYWNldENvbmZpZyxcbn07XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGRhdGEuXG4gKi9cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGVudW0gRGF0YUZvcm1hdCB7XG4gICAgSlNPTiA9ICdqc29uJyBhcyBhbnksXG4gICAgQ1NWID0gJ2NzdicgYXMgYW55LFxuICAgIFRTViA9ICd0c3YnIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgZm9ybWF0VHlwZT86IERhdGFGb3JtYXQ7XG5cblxuICAvKipcbiAgICogQSBVUkwgZnJvbSB3aGljaCB0byBsb2FkIHRoZSBkYXRhIHNldC4gVXNlIHRoZSBmb3JtYXRUeXBlIHByb3BlcnR5XG4gICAqIHRvIGVuc3VyZSB0aGUgbG9hZGVkIGRhdGEgaXMgY29ycmVjdGx5IHBhcnNlZC5cbiAgICovXG4gIHVybD86IHN0cmluZztcbiAgLyoqXG4gICAqIFBhc3MgYXJyYXkgb2Ygb2JqZWN0cyBpbnN0ZWFkIG9mIGEgdXJsIHRvIGEgZmlsZS5cbiAgICovXG4gIHZhbHVlcz86IGFueVtdO1xufVxuXG5leHBvcnQgZW51bSBEYXRhVGFibGUge1xuICBTT1VSQ0UgPSAnc291cmNlJyBhcyBhbnksXG4gIFNVTU1BUlkgPSAnc3VtbWFyeScgYXMgYW55LFxuICBTVEFDS0VEX1NDQUxFID0gJ3N0YWNrZWRfc2NhbGUnIGFzIGFueSxcbiAgTEFZT1VUID0gJ2xheW91dCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBTVU1NQVJZID0gRGF0YVRhYmxlLlNVTU1BUlk7XG5leHBvcnQgY29uc3QgU09VUkNFID0gRGF0YVRhYmxlLlNPVVJDRTtcbmV4cG9ydCBjb25zdCBTVEFDS0VEX1NDQUxFID0gRGF0YVRhYmxlLlNUQUNLRURfU0NBTEU7XG5leHBvcnQgY29uc3QgTEFZT1VUID0gRGF0YVRhYmxlLkxBWU9VVDtcblxuLyoqIE1hcHBpbmcgZnJvbSBkYXRhbGliJ3MgaW5mZXJyZWQgdHlwZSB0byBWZWdhLWxpdGUncyB0eXBlICovXG4vLyBUT0RPOiBjb25zaWRlciBpZiB3ZSBjYW4gcmVtb3ZlXG5leHBvcnQgY29uc3QgdHlwZXMgPSB7XG4gICdib29sZWFuJzogVHlwZS5OT01JTkFMLFxuICAnbnVtYmVyJzogVHlwZS5RVUFOVElUQVRJVkUsXG4gICdpbnRlZ2VyJzogVHlwZS5RVUFOVElUQVRJVkUsXG4gICdkYXRlJzogVHlwZS5URU1QT1JBTCxcbiAgJ3N0cmluZyc6IFR5cGUuTk9NSU5BTFxufTtcbiIsIi8vIHV0aWxpdHkgZm9yIGVuY29kaW5nIG1hcHBpbmdcbmltcG9ydCB7RmllbGREZWYsIFBvc2l0aW9uQ2hhbm5lbERlZiwgRmFjZXRDaGFubmVsRGVmLCBDaGFubmVsRGVmV2l0aExlZ2VuZCwgT3JkZXJDaGFubmVsRGVmfSBmcm9tICcuL2ZpZWxkZGVmJztcbmltcG9ydCB7Q2hhbm5lbCwgQ0hBTk5FTFN9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQge2lzQXJyYXksIGFueSBhcyBhbnlJbn0gZnJvbSAnLi91dGlsJztcblxuLy8gVE9ETzogb25jZSB3ZSBkZWNvbXBvc2UgZmFjZXQsIHJlbmFtZSB0aGlzIHRvIEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBYIGNvb3JkaW5hdGVzIGZvciBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsXG4gICAqIGBsaW5lYCwgYHJ1bGVgLCBgdGV4dGAsIGFuZCBgdGlja2BcbiAgICogKG9yIHRvIHdpZHRoIGFuZCBoZWlnaHQgZm9yIGBiYXJgIGFuZCBgYXJlYWAgbWFya3MpLlxuICAgKi9cbiAgeD86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWSBjb29yZGluYXRlcyBmb3IgYHBvaW50YCwgYGNpcmNsZWAsIGBzcXVhcmVgLFxuICAgKiBgbGluZWAsIGBydWxlYCwgYHRleHRgLCBhbmQgYHRpY2tgXG4gICAqIChvciB0byB3aWR0aCBhbmQgaGVpZ2h0IGZvciBgYmFyYCBhbmQgYGFyZWFgIG1hcmtzKS5cbiAgICovXG4gIHk/OiBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIENvbG9yIG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGZpbGwgb3Igc3Ryb2tlIGNvbG9yIGJhc2VkIG9uIG1hcmsgdHlwZS5cbiAgICogKEJ5IGRlZmF1bHQsIGZpbGwgY29sb3IgZm9yIGBhcmVhYCwgYGJhcmAsIGB0aWNrYCwgYHRleHRgLCBgY2lyY2xlYCwgYW5kIGBzcXVhcmVgIC9cbiAgICogc3Ryb2tlIGNvbG9yIGZvciBgbGluZWAgYW5kIGBwb2ludGAuKVxuICAgKi9cbiAgY29sb3I/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcbiAgLyoqXG4gICAqIE9wYWNpdHkgb2YgdGhlIG1hcmtzIOKAkyBlaXRoZXIgY2FuIGJlIGEgdmFsdWUgb3IgaW4gYSByYW5nZS5cbiAgICovXG4gIG9wYWNpdHk/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgbWFyay5cbiAgICogLSBGb3IgYHBvaW50YCwgYHNxdWFyZWAgYW5kIGBjaXJjbGVgXG4gICAqIOKAkyB0aGUgc3ltYm9sIHNpemUsIG9yIHBpeGVsIGFyZWEgb2YgdGhlIG1hcmsuXG4gICAqIC0gRm9yIGBiYXJgIGFuZCBgdGlja2Ag4oCTIHRoZSBiYXIgYW5kIHRpY2sncyBzaXplLlxuICAgKiAtIEZvciBgdGV4dGAg4oCTIHRoZSB0ZXh0J3MgZm9udCBzaXplLlxuICAgKiAtIFNpemUgaXMgY3VycmVudGx5IHVuc3VwcG9ydGVkIGZvciBgbGluZWAgYW5kIGBhcmVhYC5cbiAgICovXG4gIHNpemU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcblxuICAvKipcbiAgICogVGhlIHN5bWJvbCdzIHNoYXBlIChvbmx5IGZvciBgcG9pbnRgIG1hcmtzKS4gVGhlIHN1cHBvcnRlZCB2YWx1ZXMgYXJlXG4gICAqIGBcImNpcmNsZVwiYCAoZGVmYXVsdCksIGBcInNxdWFyZVwiYCwgYFwiY3Jvc3NcImAsIGBcImRpYW1vbmRcImAsIGBcInRyaWFuZ2xlLXVwXCJgLFxuICAgKiBvciBgXCJ0cmlhbmdsZS1kb3duXCJgLlxuICAgKi9cbiAgc2hhcGU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDsgLy8gVE9ETzogbWF5YmUgZGlzdGluZ3Vpc2ggb3JkaW5hbC1vbmx5XG5cbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgbGV2ZWxzIG9mIGRldGFpbCBmb3IgZ3JvdXBpbmcgZGF0YSBpbiBhZ2dyZWdhdGUgdmlld3MgYW5kXG4gICAqIGluIGxpbmUgYW5kIGFyZWEgbWFya3Mgd2l0aG91dCBtYXBwaW5nIGRhdGEgdG8gYSBzcGVjaWZpYyB2aXN1YWwgY2hhbm5lbC5cbiAgICovXG4gIGRldGFpbD86IEZpZWxkRGVmIHwgRmllbGREZWZbXTtcblxuICAvKipcbiAgICogVGV4dCBvZiB0aGUgYHRleHRgIG1hcmsuXG4gICAqL1xuICB0ZXh0PzogRmllbGREZWY7XG5cbiAgbGFiZWw/OiBGaWVsZERlZjtcblxuICAvKipcbiAgICogT3JkZXIgb2YgZGF0YSBwb2ludHMgaW4gbGluZSBtYXJrcy5cbiAgICovXG4gIHBhdGg/OiBPcmRlckNoYW5uZWxEZWYgfCBPcmRlckNoYW5uZWxEZWZbXTtcblxuICAvKipcbiAgICogTGF5ZXIgb3JkZXIgZm9yIG5vbi1zdGFja2VkIG1hcmtzLCBvciBzdGFjayBvcmRlciBmb3Igc3RhY2tlZCBtYXJrcy5cbiAgICovXG4gIG9yZGVyPzogT3JkZXJDaGFubmVsRGVmIHwgT3JkZXJDaGFubmVsRGVmW107XG59XG5cbi8vIFRPRE86IG9uY2Ugd2UgZGVjb21wb3NlIGZhY2V0LCByZW5hbWUgdGhpcyB0byBFeHRlbmRlZEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIEVuY29kaW5nIGV4dGVuZHMgVW5pdEVuY29kaW5nIHtcbiAgLyoqXG4gICAqIFZlcnRpY2FsIGZhY2V0cyBmb3IgdHJlbGxpcyBwbG90cy5cbiAgICovXG4gIHJvdz86IEZhY2V0Q2hhbm5lbERlZjtcblxuICAvKipcbiAgICogSG9yaXpvbnRhbCBmYWNldHMgZm9yIHRyZWxsaXMgcGxvdHMuXG4gICAqL1xuICBjb2x1bW4/OiBGYWNldENoYW5uZWxEZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudFJldGluYWwoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGlmIChlbmNvZGluZy5jb2xvcikgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5vcGFjaXR5KSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLnNpemUpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcuc2hhcGUpIHsgY291bnQrKzsgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVscyhlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIENIQU5ORUxTLmZpbHRlcihmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgcmV0dXJuIGhhcyhlbmNvZGluZywgY2hhbm5lbCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzKGVuY29kaW5nOiBFbmNvZGluZywgY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICBjb25zdCBjaGFubmVsRW5jb2RpbmcgPSBlbmNvZGluZyAmJiBlbmNvZGluZ1tjaGFubmVsXTtcbiAgcmV0dXJuIGNoYW5uZWxFbmNvZGluZyAmJiAoXG4gICAgY2hhbm5lbEVuY29kaW5nLmZpZWxkICE9PSB1bmRlZmluZWQgfHxcbiAgICAoaXNBcnJheShjaGFubmVsRW5jb2RpbmcpICYmIGNoYW5uZWxFbmNvZGluZy5sZW5ndGggPiAwKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2dyZWdhdGUoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIHJldHVybiBhbnlJbihDSEFOTkVMUywgKGNoYW5uZWwpID0+IHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSAmJiBlbmNvZGluZ1tjaGFubmVsXS5hZ2dyZWdhdGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGREZWZzKGVuY29kaW5nOiBFbmNvZGluZyk6IEZpZWxkRGVmW10ge1xuICBsZXQgYXJyID0gW107XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShlbmNvZGluZ1tjaGFubmVsXSkpIHtcbiAgICAgICAgZW5jb2RpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGFyci5wdXNoKGZpZWxkRGVmKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChlbmNvZGluZ1tjaGFubmVsXSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBjaGFubmVsTWFwcGluZ0ZvckVhY2goQ0hBTk5FTFMsIGVuY29kaW5nLCBmLCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nRm9yRWFjaChjaGFubmVsczogQ2hhbm5lbFtdLCBtYXBwaW5nOiBhbnksXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTogbnVtYmVyKSA9PiB2b2lkLFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IGkgPSAwO1xuICBjaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICAgIGYuY2FsbCh0aGlzQXJnLCBmaWVsZERlZiwgY2hhbm5lbCwgaSsrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCwgaSsrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IGFueSxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIHJldHVybiBjaGFubmVsTWFwcGluZ01hcChDSEFOTkVMUywgZW5jb2RpbmcsIGYgLCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nTWFwKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IGFueSxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgY2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhtYXBwaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkobWFwcGluZ1tjaGFubmVsXSkpIHtcbiAgICAgICAgbWFwcGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2goZi5jYWxsKHRoaXNBcmcsIG1hcHBpbmdbY2hhbm5lbF0sIGNoYW5uZWwpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwpID0+IGFueSxcbiAgICBpbml0LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nUmVkdWNlKENIQU5ORUxTLCBlbmNvZGluZywgZiwgaW5pdCwgdGhpc0FyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVsTWFwcGluZ1JlZHVjZShjaGFubmVsczogQ2hhbm5lbFtdLCBtYXBwaW5nOiBhbnksXG4gICAgZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwpID0+IGFueSxcbiAgICBpbml0LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IHIgPSBpbml0O1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICAgIHIgPSBmLmNhbGwodGhpc0FyZywgciwgZmllbGREZWYsIGNoYW5uZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHIgPSBmLmNhbGwodGhpc0FyZywgciwgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHI7XG59XG4iLCIvLyB1dGlsaXR5IGZvciBhIGZpZWxkIGRlZmluaXRpb24gb2JqZWN0XG5cbmltcG9ydCB7QWdncmVnYXRlT3AsIEFHR1JFR0FURV9PUFN9IGZyb20gJy4vYWdncmVnYXRlJztcbmltcG9ydCB7QXhpc30gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7QmlufSBmcm9tICcuL2Jpbic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7U29ydEZpZWxkLCBTb3J0T3JkZXJ9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7VHlwZSwgTk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGdldGJpbnMsIHRvTWFwfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqICBJbnRlcmZhY2UgZm9yIGFueSBraW5kIG9mIEZpZWxkRGVmO1xuICogIEZvciBzaW1wbGljaXR5LCB3ZSBkbyBub3QgZGVjbGFyZSBtdWx0aXBsZSBpbnRlcmZhY2VzIG9mIEZpZWxkRGVmIGxpa2VcbiAqICB3ZSBkbyBmb3IgSlNPTiBzY2hlbWEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGREZWYge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZmllbGQgZnJvbSB3aGljaCB0byBwdWxsIGEgZGF0YSB2YWx1ZS5cbiAgICovXG4gIGZpZWxkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RlZCBmaWVsZCdzIHR5cGUgb2YgbWVhc3VyZW1lbnQuIFRoaXMgY2FuIGJlIGVpdGhlciBhIGZ1bGwgdHlwZVxuICAgKiBuYW1lIChgXCJxdWFudGl0YXRpdmVcImAsIGBcInRlbXBvcmFsXCJgLCBgXCJvcmRpbmFsXCJgLCAgYW5kIGBcIm5vbWluYWxcImApXG4gICAqIG9yIGFuIGluaXRpYWwgY2hhcmFjdGVyIG9mIHRoZSB0eXBlIG5hbWUgKGBcIlFcImAsIGBcIlRcImAsIGBcIk9cImAsIGBcIk5cImApLlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGNhc2UgaW5zZW5zaXRpdmUuXG4gICAqL1xuICB0eXBlPzogVHlwZTtcblxuICAvKipcbiAgICogQSBjb25zdGFudCB2YWx1ZSBpbiB2aXN1YWwgZG9tYWluLlxuICAgKi9cbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuO1xuXG4gIC8vIGZ1bmN0aW9uXG5cbiAgLyoqXG4gICAqIFRpbWUgdW5pdCBmb3IgYSBgdGVtcG9yYWxgIGZpZWxkICAoZS5nLiwgYHllYXJgLCBgeWVhcm1vbnRoYCwgYG1vbnRoYCwgYGhvdXJgKS5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgZm9yIGJpbm5pbmcgYSBgcXVhbnRpdGF0aXZlYCBmaWVsZCwgb3IgYSBiaW4gcHJvcGVydHkgb2JqZWN0XG4gICAqIGZvciBiaW5uaW5nIHBhcmFtZXRlcnMuXG4gICAqL1xuICBiaW4/OiBib29sZWFuIHwgQmluO1xuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGZpZWxkXG4gICAqIChlLmcuLCBgbWVhbmAsIGBzdW1gLCBgbWVkaWFuYCwgYG1pbmAsIGBtYXhgLCBgY291bnRgKS5cbiAgICovXG4gIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0ZU9wO1xuXG4gIC8qKlxuICAgKiBUaXRsZSBmb3IgYXhpcyBvciBsZWdlbmQuXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGFnZ3JlZ2F0ZSA9IHtcbiAgdHlwZTogJ3N0cmluZycsXG4gIGVudW06IEFHR1JFR0FURV9PUFMsXG4gIHN1cHBvcnRlZEVudW1zOiB7XG4gICAgcXVhbnRpdGF0aXZlOiBBR0dSRUdBVEVfT1BTLFxuICAgIG9yZGluYWw6IFsnbWVkaWFuJywnbWluJywnbWF4J10sXG4gICAgbm9taW5hbDogW10sXG4gICAgdGVtcG9yYWw6IFsnbWVhbicsICdtZWRpYW4nLCAnbWluJywgJ21heCddLCAvLyBUT0RPOiByZXZpc2Ugd2hhdCBzaG91bGQgdGltZSBzdXBwb3J0XG4gICAgJyc6IFsnY291bnQnXVxuICB9LFxuICBzdXBwb3J0ZWRUeXBlczogdG9NYXAoW1FVQU5USVRBVElWRSwgTk9NSU5BTCwgT1JESU5BTCwgVEVNUE9SQUwsICcnXSlcbn07XG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWxEZWZXaXRoU2NhbGUgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNjYWxlPzogU2NhbGU7XG4gIHNvcnQ/OiBTb3J0RmllbGQgfCBTb3J0T3JkZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25DaGFubmVsRGVmIGV4dGVuZHMgQ2hhbm5lbERlZldpdGhTY2FsZSB7XG4gIGF4aXM/OiBib29sZWFuIHwgQXhpcztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhMZWdlbmQgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgbGVnZW5kPzogTGVnZW5kO1xufVxuXG4vLyBEZXRhaWxcblxuLy8gT3JkZXIgUGF0aCBoYXZlIG5vIHNjYWxlXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JkZXJDaGFubmVsRGVmIGV4dGVuZHMgRmllbGREZWYge1xuICBzb3J0PzogU29ydE9yZGVyO1xufVxuXG4vLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHRvIGRpc3Rpbmd1aXNoIG9yZGluYWxPbmx5U2NhbGUgZnJvbSBzY2FsZVxuZXhwb3J0IHR5cGUgRmFjZXRDaGFubmVsRGVmID0gUG9zaXRpb25DaGFubmVsRGVmO1xuXG5cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlZk9wdGlvbiB7XG4gIC8qKiBleGNsdWRlIGJpbiwgYWdncmVnYXRlLCB0aW1lVW5pdCAqL1xuICBub2ZuPzogYm9vbGVhbjtcbiAgLyoqIGV4Y2x1ZGUgYWdncmVnYXRpb24gZnVuY3Rpb24gKi9cbiAgbm9BZ2dyZWdhdGU/OiBib29sZWFuO1xuICAvKiogaW5jbHVkZSAnZGF0dW0uJyAqL1xuICBkYXR1bT86IGJvb2xlYW47XG4gIC8qKiByZXBsYWNlIGZuIHdpdGggY3VzdG9tIGZ1bmN0aW9uIHByZWZpeCAqL1xuICBmbj86IHN0cmluZztcbiAgLyoqIHByZXBlbmQgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIHByZWZuPzogc3RyaW5nO1xuICAvKiogc2NhbGVUeXBlICovXG4gIHNjYWxlVHlwZT86IFNjYWxlVHlwZTtcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiBmb3IgYmluIChkZWZhdWx0PSdfc3RhcnQnKSAqL1xuICBiaW5TdWZmaXg/OiBzdHJpbmc7XG4gIC8qKiBhcHBlbmQgc3VmZml4IHRvIHRoZSBmaWVsZCByZWYgKGdlbmVyYWwpICovXG4gIHN1ZmZpeD86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkKGZpZWxkRGVmOiBGaWVsZERlZiwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gIGNvbnN0IHByZWZpeCA9IChvcHQuZGF0dW0gPyAnZGF0dW0uJyA6ICcnKSArIChvcHQucHJlZm4gfHwgJycpO1xuICBjb25zdCBzdWZmaXggPSBvcHQuc3VmZml4IHx8ICcnO1xuICBjb25zdCBmaWVsZCA9IGZpZWxkRGVmLmZpZWxkO1xuXG4gIGlmIChpc0NvdW50KGZpZWxkRGVmKSkge1xuICAgIHJldHVybiBwcmVmaXggKyAnY291bnQnICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKG9wdC5mbikge1xuICAgIHJldHVybiBwcmVmaXggKyBvcHQuZm4gKyAnXycgKyBmaWVsZCArIHN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgZmllbGREZWYuYmluKSB7XG4gICAgY29uc3QgYmluU3VmZml4ID0gb3B0LmJpblN1ZmZpeCB8fCAoXG4gICAgICBvcHQuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/XG4gICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIHR5cGUsIHVzZSBgX3JhbmdlYCBhcyBzdWZmaXguXG4gICAgICAgICdfcmFuZ2UnIDpcbiAgICAgICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlIG9yIHVua25vd24sIHVzZSBgX3N0YXJ0YCBhcyBzdWZmaXguXG4gICAgICAgICdfc3RhcnQnXG4gICAgKTtcbiAgICByZXR1cm4gcHJlZml4ICsgJ2Jpbl8nICsgZmllbGQgKyBiaW5TdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmICFvcHQubm9BZ2dyZWdhdGUgJiYgZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLmFnZ3JlZ2F0ZSArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi50aW1lVW5pdCkge1xuICAgIHJldHVybiBwcmVmaXggKyBmaWVsZERlZi50aW1lVW5pdCArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwcmVmaXggKyBmaWVsZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaXNGaWVsZERpbWVuc2lvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGNvbnRhaW5zKFtOT01JTkFMLCBPUkRJTkFMXSwgZmllbGREZWYudHlwZSkgfHwgISFmaWVsZERlZi5iaW4gfHxcbiAgICAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgISFmaWVsZERlZi50aW1lVW5pdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpbWVuc2lvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkICYmIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVhc3VyZShmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkICYmICFfaXNGaWVsZERpbWVuc2lvbihmaWVsZERlZik7XG59XG5cbmV4cG9ydCBjb25zdCBDT1VOVF9USVRMRSA9ICdOdW1iZXIgb2YgUmVjb3Jkcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudCgpOiBGaWVsZERlZiB7XG4gIHJldHVybiB7IGZpZWxkOiAnKicsIGFnZ3JlZ2F0ZTogQWdncmVnYXRlT3AuQ09VTlQsIHR5cGU6IFFVQU5USVRBVElWRSwgdGl0bGU6IENPVU5UX1RJVExFIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvdW50KGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYuYWdncmVnYXRlID09PSBBZ2dyZWdhdGVPcC5DT1VOVDtcbn1cblxuLy8gRklYTUUgcmVtb3ZlIHRoaXMsIGFuZCB0aGUgZ2V0YmlucyBtZXRob2Rcbi8vIEZJWE1FIHRoaXMgZGVwZW5kcyBvbiBjaGFubmVsXG5leHBvcnQgZnVuY3Rpb24gY2FyZGluYWxpdHkoZmllbGREZWY6IEZpZWxkRGVmLCBzdGF0cywgZmlsdGVyTnVsbCA9IHt9KSB7XG4gIC8vIEZJWE1FIG5lZWQgdG8gdGFrZSBmaWx0ZXIgaW50byBhY2NvdW50XG5cbiAgY29uc3Qgc3RhdCA9IHN0YXRzW2ZpZWxkRGVmLmZpZWxkXSxcbiAgdHlwZSA9IGZpZWxkRGVmLnR5cGU7XG5cbiAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgIC8vIG5lZWQgdG8gcmVhc3NpZ24gYmluLCBvdGhlcndpc2UgY29tcGlsYXRpb24gd2lsbCBmYWlsIGR1ZSB0byBhIFRTIGJ1Zy5cbiAgICBjb25zdCBiaW4gPSBmaWVsZERlZi5iaW47XG4gICAgbGV0IG1heGJpbnMgPSAodHlwZW9mIGJpbiA9PT0gJ2Jvb2xlYW4nKSA/IHVuZGVmaW5lZCA6IGJpbi5tYXhiaW5zO1xuICAgIGlmIChtYXhiaW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heGJpbnMgPSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCBiaW5zID0gZ2V0YmlucyhzdGF0LCBtYXhiaW5zKTtcbiAgICByZXR1cm4gKGJpbnMuc3RvcCAtIGJpbnMuc3RhcnQpIC8gYmlucy5zdGVwO1xuICB9XG4gIGlmICh0eXBlID09PSBURU1QT1JBTCkge1xuICAgIGNvbnN0IHRpbWVVbml0ID0gZmllbGREZWYudGltZVVuaXQ7XG4gICAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgICAgY2FzZSBUaW1lVW5pdC5TRUNPTkRTOiByZXR1cm4gNjA7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURVM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6IHJldHVybiAyNDtcbiAgICAgIGNhc2UgVGltZVVuaXQuREFZOiByZXR1cm4gNztcbiAgICAgIGNhc2UgVGltZVVuaXQuREFURTogcmV0dXJuIDMxO1xuICAgICAgY2FzZSBUaW1lVW5pdC5NT05USDogcmV0dXJuIDEyO1xuICAgICAgY2FzZSBUaW1lVW5pdC5ZRUFSOlxuICAgICAgICBjb25zdCB5ZWFyc3RhdCA9IHN0YXRzWyd5ZWFyXycgKyBmaWVsZERlZi5maWVsZF07XG5cbiAgICAgICAgaWYgKCF5ZWFyc3RhdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB5ZWFyc3RhdC5kaXN0aW5jdCAtXG4gICAgICAgICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHVzZSBjYWxjdWxhdGlvbiBiZWxvd1xuICB9XG4gIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBudWxsXG4gIHJldHVybiBzdGF0LmRpc3RpbmN0IC1cbiAgICAoc3RhdC5taXNzaW5nID4gMCAmJiBmaWx0ZXJOdWxsW3R5cGVdID8gMSA6IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGlmIChmaWVsZERlZi50aXRsZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGZpZWxkRGVmLnRpdGxlO1xuICB9XG4gIGlmIChpc0NvdW50KGZpZWxkRGVmKSkge1xuICAgIHJldHVybiBDT1VOVF9USVRMRTtcbiAgfVxuICBjb25zdCBmbiA9IGZpZWxkRGVmLmFnZ3JlZ2F0ZSB8fCBmaWVsZERlZi50aW1lVW5pdCB8fCAoZmllbGREZWYuYmluICYmICdiaW4nKTtcbiAgaWYgKGZuKSB7XG4gICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSArICcoJyArIGZpZWxkRGVmLmZpZWxkICsgJyknO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmaWVsZERlZi5maWVsZDtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBMZWdlbmRDb25maWcge1xuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBsZWdlbmQuIE9uZSBvZiBcImxlZnRcIiBvciBcInJpZ2h0XCIuIFRoaXMgZGV0ZXJtaW5lcyBob3cgdGhlIGxlZ2VuZCBpcyBwb3NpdGlvbmVkIHdpdGhpbiB0aGUgc2NlbmUuIFRoZSBkZWZhdWx0IGlzIFwicmlnaHRcIi5cbiAgICovXG4gIG9yaWVudD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGxlZ2VuZCBmcm9tIHRoZSBlZGdlIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgb3IgZGF0YSByZWN0YW5nbGUuXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgcGFkZGluZywgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRoZSBsZW5nZW5kIGFuZCBheGlzLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXJnaW4gYXJvdW5kIHRoZSBsZWdlbmQsIGluIHBpeGVsc1xuICAgKi9cbiAgbWFyZ2luPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBncmFkaWVudCBzdHJva2UsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICBncmFkaWVudFN0cm9rZUNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmFkaWVudCBzdHJva2UsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50U3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBncmFkaWVudCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50LCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudFdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGFsaWdubWVudCBvZiB0aGUgbGVnZW5kIGxhYmVsLCBjYW4gYmUgbGVmdCwgbWlkZGxlIG9yIHJpZ2h0LlxuICAgKi9cbiAgbGFiZWxBbGlnbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgYmFzZWxpbmUgb2YgbGVnZW5kIGxhYmVsLCBjYW4gYmUgdG9wLCBtaWRkbGUgb3IgYm90dG9tLlxuICAgKi9cbiAgbGFiZWxCYXNlbGluZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIGxhYmVsLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgbGFiZWxDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSBsZW5nZW5kIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxGb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiBsZW5nZW5kIGxhYmxlLlxuICAgKi9cbiAgbGFiZWxGb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGxlZ2VuZCBsYWJlbC5cbiAgICovXG4gIGxhYmVsT2Zmc2V0PzogbnVtYmVyO1xuICAvKipcbiAgICogV2hldGhlciBtb250aCBuYW1lcyBhbmQgd2Vla2RheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuXG4gICAqL1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgc3ltYm9sLFxuICAgKi9cbiAgc3ltYm9sQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGxlZ2VuZCBzeW1ib2wsIGNhbiBiZSB0aGUgJ2NpcmNsZScsICdzcXVhcmUnLCAnY3Jvc3MnLCAnZGlhbW9uZCcsXG4gICAqICd0cmlhbmdsZS11cCcsICd0cmlhbmdsZS1kb3duJy5cbiAgICovXG4gIHN5bWJvbFNoYXBlPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGxlbmdlbmQgc3ltYm9sLCBpbiBwaXhlbHMuXG4gICAqL1xuICBzeW1ib2xTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBzeW1ib2wncyBzdHJva2UuXG4gICAqL1xuICBzeW1ib2xTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBsZWdlbmQgc3R5bGluZy5cbiAgICovXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCB0aXRsZSwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIHRpdGxlQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250V2VpZ2h0Pzogc3RyaW5nO1xuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGxlZ2VuZCBzdHlsaW5nLlxuICAgKi9cbiAgcHJvcGVydGllcz86IGFueTsgLy8gVE9ETygjOTc1KSByZXBsYWNlIHdpdGggY29uZmlnIHByb3BlcnRpZXNcbn1cblxuLyoqXG4gKiBQcm9wZXJ0aWVzIG9mIGEgbGVnZW5kIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBzaG93IGl0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExlZ2VuZCBleHRlbmRzIExlZ2VuZENvbmZpZyB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIGxlZ2VuZCBsYWJlbHMuIFZlZ2EgdXNlcyBEM1xcJ3MgZm9ybWF0IHBhdHRlcm4uXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHRpdGxlIGZvciB0aGUgbGVnZW5kLiAoU2hvd3MgZmllbGQgbmFtZSBhbmQgaXRzIGZ1bmN0aW9uIGJ5IGRlZmF1bHQuKVxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFeHBsaWNpdGx5IHNldCB0aGUgdmlzaWJsZSBsZWdlbmQgdmFsdWVzLlxuICAgKi9cbiAgdmFsdWVzPzogQXJyYXk8YW55Pjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMZWdlbmRDb25maWc6IExlZ2VuZENvbmZpZyA9IHtcbiAgb3JpZW50OiB1bmRlZmluZWQsIC8vIGltcGxpY2l0bHkgXCJyaWdodFwiXG4gIHNob3J0VGltZUxhYmVsczogZmFsc2Vcbn07XG4iLCJleHBvcnQgZW51bSBNYXJrIHtcbiAgQVJFQSA9ICdhcmVhJyBhcyBhbnksXG4gIEJBUiA9ICdiYXInIGFzIGFueSxcbiAgTElORSA9ICdsaW5lJyBhcyBhbnksXG4gIFBPSU5UID0gJ3BvaW50JyBhcyBhbnksXG4gIFRFWFQgPSAndGV4dCcgYXMgYW55LFxuICBUSUNLID0gJ3RpY2snIGFzIGFueSxcbiAgUlVMRSA9ICdydWxlJyBhcyBhbnksXG4gIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgU1FVQVJFID0gJ3NxdWFyZScgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBBUkVBID0gTWFyay5BUkVBO1xuZXhwb3J0IGNvbnN0IEJBUiA9IE1hcmsuQkFSO1xuZXhwb3J0IGNvbnN0IExJTkUgPSBNYXJrLkxJTkU7XG5leHBvcnQgY29uc3QgUE9JTlQgPSBNYXJrLlBPSU5UO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBNYXJrLlRFWFQ7XG5leHBvcnQgY29uc3QgVElDSyA9IE1hcmsuVElDSztcbmV4cG9ydCBjb25zdCBSVUxFID0gTWFyay5SVUxFO1xuXG5leHBvcnQgY29uc3QgQ0lSQ0xFID0gTWFyay5DSVJDTEU7XG5leHBvcnQgY29uc3QgU1FVQVJFID0gTWFyay5TUVVBUkU7XG4iLCJleHBvcnQgZW51bSBTY2FsZVR5cGUge1xuICAgIExJTkVBUiA9ICdsaW5lYXInIGFzIGFueSxcbiAgICBMT0cgPSAnbG9nJyBhcyBhbnksXG4gICAgUE9XID0gJ3BvdycgYXMgYW55LFxuICAgIFNRUlQgPSAnc3FydCcgYXMgYW55LFxuICAgIFFVQU5USUxFID0gJ3F1YW50aWxlJyBhcyBhbnksXG4gICAgUVVBTlRJWkUgPSAncXVhbnRpemUnIGFzIGFueSxcbiAgICBPUkRJTkFMID0gJ29yZGluYWwnIGFzIGFueSxcbiAgICBUSU1FID0gJ3RpbWUnIGFzIGFueSxcbiAgICBVVEMgID0gJ3V0YycgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBOaWNlVGltZSB7XG4gICAgU0VDT05EID0gJ3NlY29uZCcgYXMgYW55LFxuICAgIE1JTlVURSA9ICdtaW51dGUnIGFzIGFueSxcbiAgICBIT1VSID0gJ2hvdXInIGFzIGFueSxcbiAgICBEQVkgPSAnZGF5JyBhcyBhbnksXG4gICAgV0VFSyA9ICd3ZWVrJyBhcyBhbnksXG4gICAgTU9OVEggPSAnbW9udGgnIGFzIGFueSxcbiAgICBZRUFSID0gJ3llYXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLlxuICAgKiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC5cbiAgICogKE9ubHkgYXZhaWxhYmxlIGZvciBgeGAsIGB5YCwgYHNpemVgLCBgcm93YCwgYW5kIGBjb2x1bW5gIHNjYWxlcy4pXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiAgRGVmYXVsdCBiYW5kIHdpZHRoIGZvciBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIGlzIG1hcmsgaXMgYHRleHRgLlxuICAgKiAgQG1pbmltdW0gMFxuICAgKi9cbiAgdGV4dEJhbmRXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgYmFuZCBzaXplIGZvciAoMSkgYHlgIG9yZGluYWwgc2NhbGUsXG4gICAqIGFuZCAoMikgYHhgIG9yZGluYWwgc2NhbGUgd2hlbiB0aGUgbWFyayBpcyBub3QgYHRleHRgLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgcmFuZ2UgZm9yIG9wYWNpdHkuXG4gICAqL1xuICBvcGFjaXR5PzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBEZWZhdWx0IHBhZGRpbmcgZm9yIGB4YCBhbmQgYHlgIG9yZGluYWwgc2NhbGVzLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy5cbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmF3IGRhdGEgZG9tYWluIChgXCJtZWFuXCJgLCBgXCJhdmVyYWdlXCJgLCBgXCJzdGRldlwiYCwgYFwic3RkZXZwXCJgLCBgXCJtZWRpYW5cImAsIGBcInExXCJgLCBgXCJxM1wiYCwgYFwibWluXCJgLCBgXCJtYXhcImApLiBGb3Igb3RoZXIgYWdncmVnYXRpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgcmF3IGRhdGEgZG9tYWluIChlLmcuIGBcImNvdW50XCJgLCBgXCJzdW1cImApLCB0aGlzIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBub21pbmFsIGNvbG9yIHNjYWxlICovXG4gIG5vbWluYWxDb2xvclJhbmdlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBvcmRpbmFsIC8gY29udGludW91cyBjb2xvciBzY2FsZSAqL1xuICBzZXF1ZW50aWFsQ29sb3JSYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igc2hhcGUgKi9cbiAgc2hhcGVSYW5nZT86IHN0cmluZ3xzdHJpbmdbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgYmFyIHNpemUgc2NhbGUgKi9cbiAgYmFyU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGZvbnQgc2l6ZSBzY2FsZSAqL1xuICBmb250U2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHJ1bGUgc3Ryb2tlIHdpZHRocyAqL1xuICBydWxlU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHRpY2sgc3BhbnMgKi9cbiAgdGlja1NpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBwb2ludFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8vIG5pY2Ugc2hvdWxkIGRlcGVuZHMgb24gdHlwZSAocXVhbnRpdGF0aXZlIG9yIHRlbXBvcmFsKSwgc29cbiAgLy8gbGV0J3Mgbm90IG1ha2UgYSBjb25maWcuXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2NhbGVDb25maWc6IFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgdGV4dEJhbmRXaWR0aDogOTAsXG4gIGJhbmRTaXplOiAyMSxcbiAgcGFkZGluZzogMSxcbiAgdXNlUmF3RG9tYWluOiBmYWxzZSxcbiAgb3BhY2l0eTogWzAuMywgMC44XSxcblxuICBub21pbmFsQ29sb3JSYW5nZTogJ2NhdGVnb3J5MTAnLFxuICBzZXF1ZW50aWFsQ29sb3JSYW5nZTogWycjQUZDNkEzJywgJyMwOTYyMkEnXSwgLy8gdGFibGVhdSBncmVlbnNcbiAgc2hhcGVSYW5nZTogJ3NoYXBlcycsXG4gIGZvbnRTaXplUmFuZ2U6IFs4LCA0MF0sXG4gIHJ1bGVTaXplUmFuZ2U6IFsxLCA1XSxcbiAgdGlja1NpemVSYW5nZTogWzEsIDIwXVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNjYWxlQ29uZmlnIHtcbiAgcm91bmQ/OiBib29sZWFuO1xuICBwYWRkaW5nPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0U2NhbGVDb25maWc6IEZhY2V0U2NhbGVDb25maWcgPSB7XG4gIHJvdW5kOiB0cnVlLFxuICBwYWRkaW5nOiAxNlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZSB7XG4gIHR5cGU/OiBTY2FsZVR5cGU7XG4gIC8qKlxuICAgKiBUaGUgZG9tYWluIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgZGF0YSB2YWx1ZXMuIEZvciBxdWFudGl0YXRpdmUgZGF0YSwgdGhpcyBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsL2NhdGVnb3JpY2FsIGRhdGEsIHRoaXMgbWF5IGJlIGFuIGFycmF5IG9mIHZhbGlkIGlucHV0IHZhbHVlcy4gVGhlIGRvbWFpbiBtYXkgYWxzbyBiZSBzcGVjaWZpZWQgYnkgYSByZWZlcmVuY2UgdG8gYSBkYXRhIHNvdXJjZS5cbiAgICovXG4gIGRvbWFpbj86IHN0cmluZyB8IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdEYXRhRG9tYWluXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2Ugb2YgdGhlIHNjYWxlLCByZXByZXNlbnRpbmcgdGhlIHNldCBvZiB2aXN1YWwgdmFsdWVzLiBGb3IgbnVtZXJpYyB2YWx1ZXMsIHRoZSByYW5nZSBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsIG9yIHF1YW50aXplZCBkYXRhLCB0aGUgcmFuZ2UgbWF5IGJ5IGFuIGFycmF5IG9mIGRlc2lyZWQgb3V0cHV0IHZhbHVlcywgd2hpY2ggYXJlIG1hcHBlZCB0byBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGRvbWFpbi4gRm9yIG9yZGluYWwgc2NhbGVzIG9ubHksIHRoZSByYW5nZSBjYW4gYmUgZGVmaW5lZCB1c2luZyBhIERhdGFSZWY6IHRoZSByYW5nZSB2YWx1ZXMgYXJlIHRoZW4gZHJhd24gZHluYW1pY2FsbHkgZnJvbSBhIGJhY2tpbmcgZGF0YSBzZXQuXG4gICAqL1xuICByYW5nZT86IHN0cmluZyB8IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdSYW5nZURvbWFpblxuICAvKipcbiAgICogSWYgdHJ1ZSwgcm91bmRzIG51bWVyaWMgb3V0cHV0IHZhbHVlcyB0byBpbnRlZ2Vycy4gVGhpcyBjYW4gYmUgaGVscGZ1bCBmb3Igc25hcHBpbmcgdG8gdGhlIHBpeGVsIGdyaWQuXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG5cbiAgLy8gb3JkaW5hbFxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgYmFuZFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBcHBsaWVzIHNwYWNpbmcgYW1vbmcgb3JkaW5hbCBlbGVtZW50cyBpbiB0aGUgc2NhbGUgcmFuZ2UuIFRoZSBhY3R1YWwgZWZmZWN0IGRlcGVuZHMgb24gaG93IHRoZSBzY2FsZSBpcyBjb25maWd1cmVkLiBJZiB0aGUgX19wb2ludHNfXyBwYXJhbWV0ZXIgaXMgYHRydWVgLCB0aGUgcGFkZGluZyB2YWx1ZSBpcyBpbnRlcnByZXRlZCBhcyBhIG11bHRpcGxlIG9mIHRoZSBzcGFjaW5nIGJldHdlZW4gcG9pbnRzLiBBIHJlYXNvbmFibGUgdmFsdWUgaXMgMS4wLCBzdWNoIHRoYXQgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IHdpbGwgYmUgb2Zmc2V0IGZyb20gdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgYnkgaGFsZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludHMuIE90aGVyd2lzZSwgcGFkZGluZyBpcyB0eXBpY2FsbHkgaW4gdGhlIHJhbmdlIFswLCAxXSBhbmQgY29ycmVzcG9uZHMgdG8gdGhlIGZyYWN0aW9uIG9mIHNwYWNlIGluIHRoZSByYW5nZSBpbnRlcnZhbCB0byBhbGxvY2F0ZSB0byBwYWRkaW5nLiBBIHZhbHVlIG9mIDAuNSBtZWFucyB0aGF0IHRoZSByYW5nZSBiYW5kIHdpZHRoIHdpbGwgYmUgZXF1YWwgdG8gdGhlIHBhZGRpbmcgd2lkdGguIEZvciBtb3JlLCBzZWUgdGhlIFtEMyBvcmRpbmFsIHNjYWxlIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYm9zdG9jay9kMy93aWtpL09yZGluYWwtU2NhbGVzKS5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLy8gdHlwaWNhbFxuICAvKipcbiAgICogSWYgdHJ1ZSwgdmFsdWVzIHRoYXQgZXhjZWVkIHRoZSBkYXRhIGRvbWFpbiBhcmUgY2xhbXBlZCB0byBlaXRoZXIgdGhlIG1pbmltdW0gb3IgbWF4aW11bSByYW5nZSB2YWx1ZVxuICAgKi9cbiAgY2xhbXA/OiBib29sZWFuO1xuICAvKipcbiAgICogSWYgc3BlY2lmaWVkLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIElmIHNwZWNpZmllZCBhcyBhIHRydWUgYm9vbGVhbiwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IG51bWJlciByYW5nZSAoZS5nLiwgNyBpbnN0ZWFkIG9mIDYuOTYpLiBJZiBzcGVjaWZpZWQgYXMgYSBzdHJpbmcsIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSB2YWx1ZSByYW5nZS4gRm9yIHRpbWUgYW5kIHV0YyBzY2FsZSB0eXBlcyBvbmx5LCB0aGUgbmljZSB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgZGVzaXJlZCB0aW1lIGludGVydmFsLlxuICAgKi9cbiAgbmljZT86IGJvb2xlYW4gfCBOaWNlVGltZTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4cG9uZW50IG9mIHRoZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbi4gRm9yIHBvdyBzY2FsZSB0eXBlcyBvbmx5LCBvdGhlcndpc2UgaWdub3JlZC5cbiAgICovXG4gIGV4cG9uZW50PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgdHJ1ZSwgZW5zdXJlcyB0aGF0IGEgemVybyBiYXNlbGluZSB2YWx1ZSBpcyBpbmNsdWRlZCBpbiB0aGUgc2NhbGUgZG9tYWluLiBUaGlzIG9wdGlvbiBpcyBpZ25vcmVkIGZvciBub24tcXVhbnRpdGF0aXZlIHNjYWxlcy5cbiAgICovXG4gIHplcm8/OiBib29sZWFuO1xuXG4gIC8vIFZlZ2EtTGl0ZSBvbmx5XG4gIC8qKlxuICAgKiBVc2VzIHRoZSBzb3VyY2UgZGF0YSByYW5nZSBhcyBzY2FsZSBkb21haW4gaW5zdGVhZCBvZiBhZ2dyZWdhdGVkIGRhdGEgZm9yIGFnZ3JlZ2F0ZSBheGlzLlxuICAgKiBUaGlzIHByb3BlcnR5IG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgd2l0aGluIHRoZSByYXcgZGF0YSBkb21haW4gKGBcIm1lYW5cImAsIGBcImF2ZXJhZ2VcImAsIGBcInN0ZGV2XCJgLCBgXCJzdGRldnBcImAsIGBcIm1lZGlhblwiYCwgYFwicTFcImAsIGBcInEzXCJgLCBgXCJtaW5cImAsIGBcIm1heFwiYCkuIEZvciBvdGhlciBhZ2dyZWdhdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyBvdXRzaWRlIG9mIHRoZSByYXcgZGF0YSBkb21haW4gKGUuZy4gYFwiY291bnRcImAsIGBcInN1bVwiYCksIHRoaXMgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICovXG4gIHVzZVJhd0RvbWFpbj86IGJvb2xlYW47XG59XG4iLCIvKiogbW9kdWxlIGZvciBzaG9ydGhhbmQgKi9cblxuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL2ZpZWxkZGVmJztcbmltcG9ydCB7RXh0ZW5kZWRVbml0U3BlY30gZnJvbSAnLi9zcGVjJztcblxuaW1wb3J0IHtBZ2dyZWdhdGVPcCwgQUdHUkVHQVRFX09QU30gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtUSU1FVU5JVFN9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHtTSE9SVF9UWVBFLCBUWVBFX0ZST01fU0hPUlRfVFlQRX0gZnJvbSAnLi90eXBlJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge01hcmt9IGZyb20gJy4vbWFyayc7XG5cbmV4cG9ydCBjb25zdCBERUxJTSA9ICd8JztcbmV4cG9ydCBjb25zdCBBU1NJR04gPSAnPSc7XG5leHBvcnQgY29uc3QgVFlQRSA9ICcsJztcbmV4cG9ydCBjb25zdCBGVU5DID0gJ18nO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBzdHJpbmcge1xuICByZXR1cm4gJ21hcmsnICsgQVNTSUdOICsgc3BlYy5tYXJrICtcbiAgICBERUxJTSArIHNob3J0ZW5FbmNvZGluZyhzcGVjLmVuY29kaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHNob3J0aGFuZDogc3RyaW5nLCBkYXRhPywgY29uZmlnPykge1xuICBsZXQgc3BsaXQgPSBzaG9ydGhhbmQuc3BsaXQoREVMSU0pLFxuICAgIG1hcmsgPSBzcGxpdC5zaGlmdCgpLnNwbGl0KEFTU0lHTilbMV0udHJpbSgpLFxuICAgIGVuY29kaW5nID0gcGFyc2VFbmNvZGluZyhzcGxpdC5qb2luKERFTElNKSk7XG5cbiAgbGV0IHNwZWM6RXh0ZW5kZWRVbml0U3BlYyA9IHtcbiAgICBtYXJrOiBNYXJrW21hcmtdLFxuICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICB9O1xuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICBzcGVjLmRhdGEgPSBkYXRhO1xuICB9XG4gIGlmIChjb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgIHNwZWMuY29uZmlnID0gY29uZmlnO1xuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkVuY29kaW5nKGVuY29kaW5nOiBFbmNvZGluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2bEVuY29kaW5nLm1hcChlbmNvZGluZywgZnVuY3Rpb24oZmllbGREZWYsIGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY2hhbm5lbCArIEFTU0lHTiArIHNob3J0ZW5GaWVsZERlZihmaWVsZERlZik7XG4gIH0pLmpvaW4oREVMSU0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbmNvZGluZyhlbmNvZGluZ1Nob3J0aGFuZDogc3RyaW5nKTogRW5jb2Rpbmcge1xuICByZXR1cm4gZW5jb2RpbmdTaG9ydGhhbmQuc3BsaXQoREVMSU0pLnJlZHVjZShmdW5jdGlvbihtLCBlKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBlLnNwbGl0KEFTU0lHTiksXG4gICAgICAgIGVuY3R5cGUgPSBzcGxpdFswXS50cmltKCksXG4gICAgICAgIGZpZWxkRGVmU2hvcnRoYW5kID0gc3BsaXRbMV07XG5cbiAgICBtW2VuY3R5cGVdID0gcGFyc2VGaWVsZERlZihmaWVsZERlZlNob3J0aGFuZCk7XG4gICAgcmV0dXJuIG07XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5GaWVsZERlZihmaWVsZERlZjogRmllbGREZWYpOiBzdHJpbmcge1xuICByZXR1cm4gKGZpZWxkRGVmLmFnZ3JlZ2F0ZSA/IGZpZWxkRGVmLmFnZ3JlZ2F0ZSArIEZVTkMgOiAnJykgK1xuICAgIChmaWVsZERlZi50aW1lVW5pdCA/IGZpZWxkRGVmLnRpbWVVbml0ICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLmJpbiA/ICdiaW4nICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLmZpZWxkIHx8ICcnKSArIFRZUEUgKyBTSE9SVF9UWVBFW2ZpZWxkRGVmLnR5cGVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmcyhmaWVsZERlZnM6IEZpZWxkRGVmW10sIGRlbGltID0gREVMSU0pOiBzdHJpbmcge1xuICByZXR1cm4gZmllbGREZWZzLm1hcChzaG9ydGVuRmllbGREZWYpLmpvaW4oZGVsaW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGaWVsZERlZihmaWVsZERlZlNob3J0aGFuZDogc3RyaW5nKTogRmllbGREZWYge1xuICBjb25zdCBzcGxpdCA9IGZpZWxkRGVmU2hvcnRoYW5kLnNwbGl0KFRZUEUpO1xuXG4gIGxldCBmaWVsZERlZjogRmllbGREZWYgPSB7XG4gICAgZmllbGQ6IHNwbGl0WzBdLnRyaW0oKSxcbiAgICB0eXBlOiBUWVBFX0ZST01fU0hPUlRfVFlQRVtzcGxpdFsxXS50cmltKCldXG4gIH07XG5cbiAgLy8gY2hlY2sgYWdncmVnYXRlIHR5cGVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBBR0dSRUdBVEVfT1BTLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGEgPSBBR0dSRUdBVEVfT1BTW2ldO1xuICAgIGlmIChmaWVsZERlZi5maWVsZC5pbmRleE9mKGEgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihhLnRvU3RyaW5nKCkubGVuZ3RoICsgMSk7XG4gICAgICBpZiAoYSA9PT0gQWdncmVnYXRlT3AuQ09VTlQgJiYgZmllbGREZWYuZmllbGQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZpZWxkRGVmLmZpZWxkID0gJyonO1xuICAgICAgfVxuICAgICAgZmllbGREZWYuYWdncmVnYXRlID0gYTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgVElNRVVOSVRTLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHR1ID0gVElNRVVOSVRTW2ldO1xuICAgIGlmIChmaWVsZERlZi5maWVsZCAmJiBmaWVsZERlZi5maWVsZC5pbmRleE9mKHR1ICsgJ18nKSA9PT0gMCkge1xuICAgICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoZmllbGREZWYuZmllbGQubGVuZ3RoICsgMSk7XG4gICAgICBmaWVsZERlZi50aW1lVW5pdCA9IHR1O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2sgYmluXG4gIGlmIChmaWVsZERlZi5maWVsZCAmJiBmaWVsZERlZi5maWVsZC5pbmRleE9mKCdiaW5fJykgPT09IDApIHtcbiAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cig0KTtcbiAgICBmaWVsZERlZi5iaW4gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkRGVmO1xufVxuIiwiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuXG5leHBvcnQgZW51bSBTb3J0T3JkZXIge1xuICAgIEFTQ0VORElORyA9ICdhc2NlbmRpbmcnIGFzIGFueSxcbiAgICBERVNDRU5ESU5HID0gJ2Rlc2NlbmRpbmcnIGFzIGFueSxcbiAgICBOT05FID0gJ25vbmUnIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3J0RmllbGQge1xuICAvKipcbiAgICogVGhlIGZpZWxkIG5hbWUgdG8gYWdncmVnYXRlIG92ZXIuXG4gICAqL1xuICBmaWVsZDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHNvcnQgYWdncmVnYXRpb24gb3BlcmF0b3JcbiAgICovXG4gIG9wOiBBZ2dyZWdhdGVPcDtcblxuICBvcmRlcj86IFNvcnRPcmRlcjtcbn1cbiIsIi8qIFV0aWxpdGllcyBmb3IgYSBWZWdhLUxpdGUgc3BlY2lmaWNpYXRpb24gKi9cblxuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG4vLyBQYWNrYWdlIG9mIGRlZmluaW5nIFZlZ2EtbGl0ZSBTcGVjaWZpY2F0aW9uJ3MganNvbiBzY2hlbWFcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7RGF0YX0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7RW5jb2RpbmcsIFVuaXRFbmNvZGluZywgaGFzfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmFjZXR9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4vdHJhbnNmb3JtJztcblxuaW1wb3J0IHtDT0xPUiwgU0hBUEUsIFJPVywgQ09MVU1OfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7QkFSLCBBUkVBfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtkdXBsaWNhdGUsIGV4dGVuZH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSB2aXN1YWxpemF0aW9uIGZvciBsYXRlciByZWZlcmVuY2UuXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBkZXNjcmlwdGlvbiBvZiB0aGlzIG1hcmsgZm9yIGNvbW1lbnRpbmcgcHVycG9zZS5cbiAgICogVGhpcyBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBvdXRwdXQgdmlzdWFsaXphdGlvbi5cbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgZGF0YSBzb3VyY2VcbiAgICovXG4gIGRhdGE/OiBEYXRhO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyBmaWx0ZXIgYW5kIG5ldyBmaWVsZCBjYWxjdWxhdGlvbi5cbiAgICovXG4gIHRyYW5zZm9ybT86IFRyYW5zZm9ybTtcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGNvbmZpZz86IENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBVbml0RW5jb2Rpbmc7XG59XG5cbi8qKlxuICogU2NoZW1hIGZvciBhIHVuaXQgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24sIHdpdGggdGhlIHN5bnRhY3RpYyBzdWdhciBleHRlbnNpb25zOlxuICogLSBgcm93YCBhbmQgYGNvbHVtbmAgYXJlIGluY2x1ZGVkIGluIHRoZSBlbmNvZGluZy5cbiAqIC0gKEZ1dHVyZSkgbGFiZWwsIGJveCBwbG90XG4gKlxuICogTm90ZTogdGhlIHNwZWMgY291bGQgY29udGFpbiBmYWNldC5cbiAqXG4gKiBAcmVxdWlyZWQgW1wibWFya1wiLCBcImVuY29kaW5nXCJdXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIGZhY2V0OiBGYWNldDtcbiAgc3BlYzogTGF5ZXJTcGVjIHwgVW5pdFNwZWM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICAvKipcbiAgICogVW5pdCBzcGVjcyB0aGF0IHdpbGwgYmUgbGF5ZXJlZC5cbiAgICovXG4gIGxheWVyczogVW5pdFNwZWNbXTtcbn1cblxuLyoqIFRoaXMgaXMgZm9yIHRoZSBmdXR1cmUgc2NoZW1hICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuZGVkRmFjZXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICBmYWNldDogRmFjZXQ7XG5cbiAgc3BlYzogRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYztcbn1cblxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRTcGVjID0gRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcbmV4cG9ydCB0eXBlIFNwZWMgPSBVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcblxuLyogQ3VzdG9tIHR5cGUgZ3VhcmRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhY2V0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEZhY2V0U3BlYyB7XG4gIHJldHVybiBzcGVjWydmYWNldCddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgaWYgKGlzU29tZVVuaXRTcGVjKHNwZWMpKSB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICByZXR1cm4gaGFzUm93IHx8IGhhc0NvbHVtbjtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBVbml0U3BlYyB7XG4gIGlmIChpc1NvbWVVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiAhaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb21lVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHwgVW5pdFNwZWMge1xuICByZXR1cm4gc3BlY1snbWFyayddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xheWVyU3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIExheWVyU3BlYyB7XG4gIHJldHVybiBzcGVjWydsYXllcnMnXSAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIERlY29tcG9zZSBleHRlbmRlZCB1bml0IHNwZWNzIGludG8gY29tcG9zaXRpb24gb2YgcHVyZSB1bml0IHNwZWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHNwZWM6IEV4dGVuZGVkU3BlYyk6IFNwZWMge1xuICBpZiAoaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWMpKSB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICAvLyBUT0RPOiBAYXJ2aW5kIHBsZWFzZSAgYWRkIGludGVyYWN0aW9uIHN5bnRheCBoZXJlXG4gICAgbGV0IGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICAgIGRlbGV0ZSBlbmNvZGluZy5jb2x1bW47XG4gICAgZGVsZXRlIGVuY29kaW5nLnJvdztcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBzcGVjLm5hbWUgPyB7IG5hbWU6IHNwZWMubmFtZSB9IDoge30sXG4gICAgICBzcGVjLmRlc2NyaXB0aW9uID8geyBkZXNjcmlwdGlvbjogc3BlYy5kZXNjcmlwdGlvbiB9IDoge30sXG4gICAgICB7IGRhdGE6IHNwZWMuZGF0YSB9LFxuICAgICAgc3BlYy50cmFuc2Zvcm0gPyB7IHRyYW5zZm9ybTogc3BlYy50cmFuc2Zvcm0gfSA6IHt9LFxuICAgICAge1xuICAgICAgICBmYWNldDogZXh0ZW5kKFxuICAgICAgICAgIGhhc1JvdyA/IHsgcm93OiBzcGVjLmVuY29kaW5nLnJvdyB9IDoge30sXG4gICAgICAgICAgaGFzQ29sdW1uID8geyBjb2x1bW46IHNwZWMuZW5jb2RpbmcuY29sdW1uIH0gOiB7fVxuICAgICAgICApLFxuICAgICAgICBzcGVjOiB7XG4gICAgICAgICAgbWFyazogc3BlYy5tYXJrLFxuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3BlYy5jb25maWcgPyB7IGNvbmZpZzogc3BlYy5jb25maWcgfSA6IHt9XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBzcGVjO1xufVxuXG4vLyBUT0RPOiBhZGQgdmwuc3BlYy52YWxpZGF0ZSAmIG1vdmUgc3R1ZmYgZnJvbSB2bC52YWxpZGF0ZSB0byBoZXJlXG5cbmV4cG9ydCBmdW5jdGlvbiBhbHdheXNOb09jY2x1c2lvbihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogYm9vbGVhbiB7XG4gIC8vIEZJWE1FIHJhdyBPeFEgd2l0aCAjIG9mIHJvd3MgPSAjIG9mIE9cbiAgcmV0dXJuIHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEZpZWxkRGVmW10ge1xuICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIG9uY2Ugd2UgaGF2ZSBjb21wb3NpdGlvblxuICByZXR1cm4gdmxFbmNvZGluZy5maWVsZERlZnMoc3BlYy5lbmNvZGluZyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xlYW5TcGVjKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgLy8gVE9ETzogbW92ZSB0b1NwZWMgdG8gaGVyZSFcbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0YWNrKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBib29sZWFuIHtcbiAgcmV0dXJuICh2bEVuY29kaW5nLmhhcyhzcGVjLmVuY29kaW5nLCBDT0xPUikgfHwgdmxFbmNvZGluZy5oYXMoc3BlYy5lbmNvZGluZywgU0hBUEUpKSAmJlxuICAgIChzcGVjLm1hcmsgPT09IEJBUiB8fCBzcGVjLm1hcmsgPT09IEFSRUEpICYmXG4gICAgKCFzcGVjLmNvbmZpZyB8fCAhc3BlYy5jb25maWcubWFyay5zdGFja2VkICE9PSBmYWxzZSkgJiZcbiAgICB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHNwZWMuZW5jb2RpbmcpO1xufVxuXG4vLyBUT0RPIHJldmlzZVxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRXh0ZW5kZWRVbml0U3BlYyB7XG4gIGNvbnN0IG9sZGVuYyA9IHNwZWMuZW5jb2Rpbmc7XG4gIGxldCBlbmNvZGluZyA9IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nKTtcbiAgZW5jb2RpbmcueCA9IG9sZGVuYy55O1xuICBlbmNvZGluZy55ID0gb2xkZW5jLng7XG4gIGVuY29kaW5nLnJvdyA9IG9sZGVuYy5jb2x1bW47XG4gIGVuY29kaW5nLmNvbHVtbiA9IG9sZGVuYy5yb3c7XG4gIHNwZWMuZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgcmV0dXJuIHNwZWM7XG59XG4iLCJcbmV4cG9ydCBlbnVtIFRpbWVVbml0IHtcbiAgICBZRUFSID0gJ3llYXInIGFzIGFueSxcbiAgICBNT05USCA9ICdtb250aCcgYXMgYW55LFxuICAgIERBWSA9ICdkYXknIGFzIGFueSxcbiAgICBEQVRFID0gJ2RhdGUnIGFzIGFueSxcbiAgICBIT1VSUyA9ICdob3VycycgYXMgYW55LFxuICAgIE1JTlVURVMgPSAnbWludXRlcycgYXMgYW55LFxuICAgIFNFQ09ORFMgPSAnc2Vjb25kcycgYXMgYW55LFxuICAgIE1JTExJU0VDT05EUyA9ICdtaWxsaXNlY29uZHMnIGFzIGFueSxcbiAgICBZRUFSTU9OVEggPSAneWVhcm1vbnRoJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZID0gJ3llYXJtb250aGRheScgYXMgYW55LFxuICAgIFlFQVJNT05USERBVEUgPSAneWVhcm1vbnRoZGF0ZScgYXMgYW55LFxuICAgIFlFQVJEQVkgPSAneWVhcmRheScgYXMgYW55LFxuICAgIFlFQVJEQVRFID0gJ3llYXJkYXRlJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZSE9VUlMgPSAneWVhcm1vbnRoZGF5aG91cnMnIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVlIT1VSU01JTlVURVMgPSAneWVhcm1vbnRoZGF5aG91cnNtaW51dGVzJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZSE9VUlNNSU5VVEVTU0VDT05EUyA9ICd5ZWFybW9udGhkYXlob3Vyc21pbnV0ZXNzZWNvbmRzJyBhcyBhbnksXG4gICAgSE9VUlNNSU5VVEVTID0gJ2hvdXJzbWludXRlcycgYXMgYW55LFxuICAgIEhPVVJTTUlOVVRFU1NFQ09ORFMgPSAnaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICAgIE1JTlVURVNTRUNPTkRTID0gJ21pbnV0ZXNzZWNvbmRzJyBhcyBhbnksXG4gICAgU0VDT05EU01JTExJU0VDT05EUyA9ICdzZWNvbmRzbWlsbGlzZWNvbmRzJyBhcyBhbnksXG59XG5cbmV4cG9ydCBjb25zdCBUSU1FVU5JVFMgPSBbXG4gICAgVGltZVVuaXQuWUVBUixcbiAgICBUaW1lVW5pdC5NT05USCxcbiAgICBUaW1lVW5pdC5EQVksXG4gICAgVGltZVVuaXQuREFURSxcbiAgICBUaW1lVW5pdC5IT1VSUyxcbiAgICBUaW1lVW5pdC5NSU5VVEVTLFxuICAgIFRpbWVVbml0LlNFQ09ORFMsXG4gICAgVGltZVVuaXQuTUlMTElTRUNPTkRTLFxuICAgIFRpbWVVbml0LllFQVJNT05USCxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVksXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFURSxcbiAgICBUaW1lVW5pdC5ZRUFSREFZLFxuICAgIFRpbWVVbml0LllFQVJEQVRFLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWUhPVVJTLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWUhPVVJTTUlOVVRFUyxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVlIT1VSU01JTlVURVNTRUNPTkRTLFxuICAgIFRpbWVVbml0LkhPVVJTTUlOVVRFUyxcbiAgICBUaW1lVW5pdC5IT1VSU01JTlVURVNTRUNPTkRTLFxuICAgIFRpbWVVbml0Lk1JTlVURVNTRUNPTkRTLFxuICAgIFRpbWVVbml0LlNFQ09ORFNNSUxMSVNFQ09ORFMsXG5dO1xuXG4vKiogcmV0dXJucyB0aGUgdGVtcGxhdGUgbmFtZSB1c2VkIGZvciBheGlzIGxhYmVscyBmb3IgYSB0aW1lIHVuaXQgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQodGltZVVuaXQ6IFRpbWVVbml0LCBhYmJyZXZpYXRlZCA9IGZhbHNlKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgdGltZVN0cmluZyA9IHRpbWVVbml0LnRvU3RyaW5nKCk7XG5cbiAgbGV0IGRhdGVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZigneWVhcicpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyV5JyA6ICclWScpO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbW9udGgnKSA+IC0xKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChhYmJyZXZpYXRlZCA/ICclYicgOiAnJUInKTtcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ2RheScpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignZGF0ZScpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKCclZCcpO1xuICB9XG5cbiAgbGV0IHRpbWVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignaG91cnMnKSA+IC0xKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJUgnKTtcbiAgfVxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdtaW51dGVzJykgPiAtMSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVNJyk7XG4gIH1cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignc2Vjb25kcycpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclUycpO1xuICB9XG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbGxpc2Vjb25kcycpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclTCcpO1xuICB9XG5cbiAgbGV0IG91dCA9IFtdO1xuICBpZiAoZGF0ZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKGRhdGVDb21wb25lbnRzLmpvaW4oJy0nKSk7XG4gIH1cbiAgaWYgKHRpbWVDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBvdXQucHVzaCh0aW1lQ29tcG9uZW50cy5qb2luKCc6JykpO1xuICB9XG5cbiAgcmV0dXJuIG91dC5sZW5ndGggPiAwID8gb3V0LmpvaW4oJyAnKSA6IHVuZGVmaW5lZDtcbn1cbiIsIi8qKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YSB0eXBlICovXG5cbmV4cG9ydCBlbnVtIFR5cGUge1xuICBRVUFOVElUQVRJVkUgPSAncXVhbnRpdGF0aXZlJyBhcyBhbnksXG4gIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICBURU1QT1JBTCA9ICd0ZW1wb3JhbCcgYXMgYW55LFxuICBOT01JTkFMID0gJ25vbWluYWwnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgUVVBTlRJVEFUSVZFID0gVHlwZS5RVUFOVElUQVRJVkU7XG5leHBvcnQgY29uc3QgT1JESU5BTCA9IFR5cGUuT1JESU5BTDtcbmV4cG9ydCBjb25zdCBURU1QT1JBTCA9IFR5cGUuVEVNUE9SQUw7XG5leHBvcnQgY29uc3QgTk9NSU5BTCA9IFR5cGUuTk9NSU5BTDtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gZnVsbCB0eXBlIG5hbWVzIHRvIHNob3J0IHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgU0hPUlRfVFlQRSA9IHtcbiAgcXVhbnRpdGF0aXZlOiAnUScsXG4gIHRlbXBvcmFsOiAnVCcsXG4gIG5vbWluYWw6ICdOJyxcbiAgb3JkaW5hbDogJ08nXG59O1xuLyoqXG4gKiBNYXBwaW5nIGZyb20gc2hvcnQgdHlwZSBuYW1lcyB0byBmdWxsIHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9GUk9NX1NIT1JUX1RZUEUgPSB7XG4gIFE6IFFVQU5USVRBVElWRSxcbiAgVDogVEVNUE9SQUwsXG4gIE86IE9SRElOQUwsXG4gIE46IE5PTUlOQUxcbn07XG5cbi8qKlxuICogR2V0IGZ1bGwsIGxvd2VyY2FzZSB0eXBlIG5hbWUgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSAgdHlwZVxuICogQHJldHVybiBGdWxsIHR5cGUgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxOYW1lKHR5cGU6IFR5cGUpOiBUeXBlIHtcbiAgY29uc3QgdHlwZVN0cmluZyA9IDxhbnk+dHlwZTsgIC8vIGZvcmNlIHR5cGUgYXMgc3RyaW5nIHNvIHdlIGNhbiB0cmFuc2xhdGUgc2hvcnQgdHlwZXNcbiAgcmV0dXJuIFRZUEVfRlJPTV9TSE9SVF9UWVBFW3R5cGVTdHJpbmcudG9VcHBlckNhc2UoKV0gfHwgLy8gc2hvcnQgdHlwZSBpcyB1cHBlcmNhc2UgYnkgZGVmYXVsdFxuICAgICAgICAgdHlwZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZGF0YWxpYi5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvanNvbi1zdGFibGUtc3RyaW5naWZ5LmQudHNcIi8+XG5cbmltcG9ydCAqIGFzIHN0cmluZ2lmeSBmcm9tICdqc29uLXN0YWJsZS1zdHJpbmdpZnknO1xuZXhwb3J0IHtrZXlzLCBleHRlbmQsIGR1cGxpY2F0ZSwgaXNBcnJheSwgdmFscywgdHJ1bmNhdGUsIHRvTWFwLCBpc09iamVjdCwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuZXhwb3J0IHtyYW5nZX0gZnJvbSAnZGF0YWxpYi9zcmMvZ2VuZXJhdGUnO1xuZXhwb3J0IHtoYXN9IGZyb20gJy4vZW5jb2RpbmcnXG5leHBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL2ZpZWxkZGVmJztcbmV4cG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi9jaGFubmVsJztcblxuaW1wb3J0IHtpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbn0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKGE6IGFueSkge1xuICBpZiAoaXNTdHJpbmcoYSkgfHwgaXNOdW1iZXIoYSkgfHwgaXNCb29sZWFuKGEpKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKTtcbiAgfVxuICByZXR1cm4gc3RyaW5naWZ5KGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnM8VD4oYXJyYXk6IEFycmF5PFQ+LCBpdGVtOiBUKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pID4gLTE7XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBhcnJheSB3aXRob3V0IHRoZSBlbGVtZW50cyBpbiBpdGVtICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dDxUPihhcnJheTogQXJyYXk8VD4sIGV4Y2x1ZGVkSXRlbXM6IEFycmF5PFQ+KSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhY29udGFpbnMoZXhjbHVkZWRJdGVtcywgaXRlbSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248VD4oYXJyYXk6IEFycmF5PFQ+LCBvdGhlcjogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCh3aXRob3V0KG90aGVyLCBhcnJheSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmouZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoLmNhbGwodGhpc0FyZywgZik7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShvYmosIGY6IChhLCBpLCBkLCBrLCBvKSA9PiBhbnksIGluaXQsIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoucmVkdWNlKSB7XG4gICAgcmV0dXJuIG9iai5yZWR1Y2UuY2FsbCh0aGlzQXJnLCBmLCBpbml0KTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpbml0ID0gZi5jYWxsKHRoaXNBcmcsIGluaXQsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluaXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoubWFwKSB7XG4gICAgcmV0dXJuIG9iai5tYXAuY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFueTxUPihhcnI6IEFycmF5PFQ+LCBmOiAoZDogVCwgaz8sIGk/KSA9PiBib29sZWFuKSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChsZXQgayA9IDA7IGs8YXJyLmxlbmd0aDsgaysrKSB7XG4gICAgaWYgKGYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsPFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoIWYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnJheXM6IGFueVtdKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yIChsZXQgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0ICogYXMgZGxCaW4gZnJvbSAnZGF0YWxpYi9zcmMvYmlucy9iaW5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRiaW5zKHN0YXRzLCBtYXhiaW5zKSB7XG4gIHJldHVybiBkbEJpbih7XG4gICAgbWluOiBzdGF0cy5taW4sXG4gICAgbWF4OiBzdGF0cy5tYXgsXG4gICAgbWF4YmluczogbWF4Ymluc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZTxUPih2YWx1ZXM6IFRbXSwgZj86IChpdGVtOiBUKSA9PiBzdHJpbmcpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlOiBhbnkpIHtcbiAgY29uc29sZS53YXJuKCdbVkwgV2FybmluZ10nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLmVycm9yKCdbVkwgRXJyb3JdJywgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdDxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFN0cmluZ1NldCA9IERpY3Q8Ym9vbGVhbj47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gZGljaXRvbmFyaWVzIGRpc2FncmVlLiBBcHBsaWVzIG9ubHkgdG8gZGVmaW9uZWQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyPFQ+KGRpY3Q6IERpY3Q8VD4sIG90aGVyOiBEaWN0PFQ+KSB7XG4gIGZvciAobGV0IGtleSBpbiBkaWN0KSB7XG4gICAgaWYgKGRpY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG90aGVyW2tleV0gJiYgZGljdFtrZXldICYmIG90aGVyW2tleV0gIT09IGRpY3Rba2V5XSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG4vLyBUT0RPOiBtb3ZlIHRvIHZsLnNwZWMudmFsaWRhdG9yP1xuXG5pbXBvcnQge3RvTWFwfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtCQVJ9IGZyb20gJy4vbWFyayc7XG5cbmludGVyZmFjZSBSZXF1aXJlZENoYW5uZWxNYXAge1xuICBbbWFyazogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBFbmNvZGluZyBDaGFubmVscyBmb3IgZWFjaCBtYXJrIHR5cGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQOiBSZXF1aXJlZENoYW5uZWxNYXAgPSB7XG4gIHRleHQ6IFsndGV4dCddLFxuICBsaW5lOiBbJ3gnLCAneSddLFxuICBhcmVhOiBbJ3gnLCAneSddXG59O1xuXG5pbnRlcmZhY2UgU3VwcG9ydGVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiB7XG4gICAgW2NoYW5uZWw6IHN0cmluZ106IG51bWJlclxuICB9O1xufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBFbmNvZGluZyBDaGFubmVsIGZvciBlYWNoIG1hcmsgdHlwZVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0ge1xuICBiYXI6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnc2l6ZScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGxpbmU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLCAvLyBUT0RPOiBhZGQgc2l6ZSB3aGVuIFZlZ2Egc3VwcG9ydHNcbiAgYXJlYTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIHRpY2s6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLFxuICBjaXJjbGU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnXSksXG4gIHNxdWFyZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgcG9pbnQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnLCAnc2hhcGUnXSksXG4gIHRleHQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICdzaXplJywgJ2NvbG9yJywgJ3RleHQnXSkgLy8gVE9ETygjNzI0KSByZXZpc2Vcbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHNob3VsZCBhZGQgdmFsaWRhdGUgbWV0aG9kIGFuZFxuLy8gcmVxdWlyZXMgWlNjaGVtYSBpbiB0aGUgbWFpbiB2ZWdhLWxpdGUgcmVwb1xuXG4vKipcbiAqIEZ1cnRoZXIgY2hlY2sgaWYgZW5jb2RpbmcgbWFwcGluZyBvZiBhIHNwZWMgaXMgaW52YWxpZCBhbmRcbiAqIHJldHVybiBlcnJvciBpZiBpdCBpcyBpbnZhbGlkLlxuICpcbiAqIFRoaXMgY2hlY2tzIGlmXG4gKiAoMSkgYWxsIHRoZSByZXF1aXJlZCBlbmNvZGluZyBjaGFubmVscyBmb3IgdGhlIG1hcmsgdHlwZSBhcmUgc3BlY2lmaWVkXG4gKiAoMikgYWxsIHRoZSBzcGVjaWZpZWQgZW5jb2RpbmcgY2hhbm5lbHMgYXJlIHN1cHBvcnRlZCBieSB0aGUgbWFyayB0eXBlXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNwZWMgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UmVxdWlyZWRDaGFubmVsTWFwICA9IERlZmF1bHRSZXF1aXJlZENoYW5uZWxNYXB9ICByZXF1aXJlZENoYW5uZWxNYXBcbiAqIEBwYXJhbSAge1N1cHBvcnRlZENoYW5uZWxNYXAgPSBEZWZhdWx0U3VwcG9ydGVkQ2hhbm5lbE1hcH0gc3VwcG9ydGVkQ2hhbm5lbE1hcFxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm4gb25lIHJlYXNvbiB3aHkgdGhlIGVuY29kaW5nIGlzIGludmFsaWQsXG4gKiAgICAgICAgICAgICAgICAgIG9yIG51bGwgaWYgdGhlIGVuY29kaW5nIGlzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5jb2RpbmdNYXBwaW5nRXJyb3Ioc3BlYzogRXh0ZW5kZWRVbml0U3BlYyxcbiAgcmVxdWlyZWRDaGFubmVsTWFwOiBSZXF1aXJlZENoYW5uZWxNYXAgPSBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQLFxuICBzdXBwb3J0ZWRDaGFubmVsTWFwOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0gREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFXG4gICkge1xuICBsZXQgbWFyayA9IHNwZWMubWFyaztcbiAgbGV0IGVuY29kaW5nID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IHJlcXVpcmVkQ2hhbm5lbHMgPSByZXF1aXJlZENoYW5uZWxNYXBbbWFya107XG4gIGxldCBzdXBwb3J0ZWRDaGFubmVscyA9IHN1cHBvcnRlZENoYW5uZWxNYXBbbWFya107XG5cbiAgZm9yIChsZXQgaSBpbiByZXF1aXJlZENoYW5uZWxzKSB7IC8vIGFsbCByZXF1aXJlZCBjaGFubmVscyBhcmUgaW4gZW5jb2RpbmdgXG4gICAgaWYgKCEocmVxdWlyZWRDaGFubmVsc1tpXSBpbiBlbmNvZGluZykpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBlbmNvZGluZyBjaGFubmVsIFxcXCInICsgcmVxdWlyZWRDaGFubmVsc1tpXSArXG4gICAgICAgICdcXFwiIGZvciBtYXJrIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBjaGFubmVsIGluIGVuY29kaW5nKSB7IC8vIGFsbCBjaGFubmVscyBpbiBlbmNvZGluZyBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKCFzdXBwb3J0ZWRDaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgcmV0dXJuICdFbmNvZGluZyBjaGFubmVsIFxcXCInICsgY2hhbm5lbCArXG4gICAgICAgICdcXFwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbWFyayB0eXBlIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBpZiAobWFyayA9PT0gQkFSICYmICFlbmNvZGluZy54ICYmICFlbmNvZGluZy55KSB7XG4gICAgcmV0dXJuICdNaXNzaW5nIGJvdGggeCBhbmQgeSBmb3IgYmFyJztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuL3NjYWxlJztcblxuZXhwb3J0IGludGVyZmFjZSBWZ0RhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgdmFsdWVzPzogYW55O1xuICBmb3JtYXQ/OiBhbnk7XG4gIHVybD86IGFueTtcbiAgdHJhbnNmb3JtPzogYW55O1xufVxuXG50eXBlIFZnUGFyZW50UmVmID0ge1xuICBwYXJlbnQ6IHN0cmluZ1xufTtcblxudHlwZSBWZ0ZpZWxkUmVmID0gc3RyaW5nIHwgVmdQYXJlbnRSZWYgfCBWZ1BhcmVudFJlZltdO1xuXG5leHBvcnQgdHlwZSBWZ0RhdGFSZWYgPSB7XG4gIGRhdGE6IHN0cmluZyxcbiAgZmllbGQ6IFZnRmllbGRSZWYsXG4gIHNvcnQ6IGJvb2xlYW4gfCB7XG4gICAgZmllbGQ6IFZnRmllbGRSZWYsXG4gICAgb3A6IHN0cmluZ1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBWZ1ZhbHVlUmVmID0ge1xuICB2YWx1ZT86IGFueSxcbiAgZmllbGQ/OiBzdHJpbmcgfCB7XG4gICAgZGF0dW0/OiBzdHJpbmcsXG4gICAgZ3JvdXA/OiBzdHJpbmcsXG4gICAgcGFyZW50Pzogc3RyaW5nXG4gIH0gLFxuICBzY2FsZT86IHN0cmluZywgLy8gVE9ETzogb2JqZWN0XG4gIG11bHQ/OiBudW1iZXIsXG4gIG9mZnNldD86IG51bWJlcixcbiAgYmFuZD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVW5pb25lZERvbWFpbiA9IHtcbiAgZmllbGRzOiBWZ0RhdGFSZWZbXVxufTtcblxuZXhwb3J0IHR5cGUgVmdTY2FsZSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICB0eXBlOiBTY2FsZVR5cGUsXG4gIGRvbWFpbj86IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZixcbiAgZG9tYWluTWluPzogYW55LFxuICBkb21haW5NYXg/OiBhbnlcbiAgcmFuZ2U/OiBhbnlbXSB8IFZnRGF0YVJlZiB8IHN0cmluZyxcbiAgcmFuZ2VNaW4/OiBhbnksXG4gIHJhbmdlTWF4PzogYW55LFxuXG4gIGJhbmRTaXplPzogbnVtYmVyLFxuICBjbGFtcD86IGJvb2xlYW4sXG4gIGV4cG9uZW50PzogbnVtYmVyLFxuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBwb2ludHM/OiBib29sZWFuLFxuICByZXZlcnNlPzogYm9vbGVhbixcbiAgcm91bmQ/OiBib29sZWFuLFxuICB6ZXJvPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmlvbmVkRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFVuaW9uZWREb21haW4ge1xuICBpZiAoIWlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiAnZmllbGRzJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhUmVmRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFZnRGF0YVJlZiB7XG4gIGlmICghaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuICdkYXRhJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUT0RPOiBkZWNsYXJlXG5leHBvcnQgdHlwZSBWZ01hcmtHcm91cCA9IGFueTtcbmV4cG9ydCB0eXBlIFZnQXhpcyA9IGFueTtcbmV4cG9ydCB0eXBlIFZnTGVnZW5kID0gYW55O1xuZXhwb3J0IHR5cGUgVmdUcmFuc2Zvcm0gPSBhbnk7XG4iLCJpbXBvcnQgKiBhcyB2bEJpbiBmcm9tICcuL2Jpbic7XG5pbXBvcnQgKiBhcyB2bENoYW5uZWwgZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCAqIGFzIHZsQ29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCAqIGFzIHZsRGF0YSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCAqIGFzIHZsRmllbGREZWYgZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQgKiBhcyB2bENvbXBpbGUgZnJvbSAnLi9jb21waWxlL2NvbXBpbGUnO1xuaW1wb3J0ICogYXMgdmxTaG9ydGhhbmQgZnJvbSAnLi9zaG9ydGhhbmQnO1xuaW1wb3J0ICogYXMgdmxTcGVjIGZyb20gJy4vc3BlYyc7XG5pbXBvcnQgKiBhcyB2bFRpbWVVbml0IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0ICogYXMgdmxUeXBlIGZyb20gJy4vdHlwZSc7XG5pbXBvcnQgKiBhcyB2bFZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUnO1xuaW1wb3J0ICogYXMgdmxVdGlsIGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBiaW4gPSB2bEJpbjtcbmV4cG9ydCBjb25zdCBjaGFubmVsID0gdmxDaGFubmVsO1xuZXhwb3J0IGNvbnN0IGNvbXBpbGUgPSB2bENvbXBpbGUuY29tcGlsZTtcbmV4cG9ydCBjb25zdCBjb25maWcgPSB2bENvbmZpZztcbmV4cG9ydCBjb25zdCBkYXRhID0gdmxEYXRhO1xuZXhwb3J0IGNvbnN0IGVuY29kaW5nID0gdmxFbmNvZGluZztcbmV4cG9ydCBjb25zdCBmaWVsZERlZiA9IHZsRmllbGREZWY7XG5leHBvcnQgY29uc3Qgc2hvcnRoYW5kID0gdmxTaG9ydGhhbmQ7XG5leHBvcnQgY29uc3Qgc3BlYyA9IHZsU3BlYztcbmV4cG9ydCBjb25zdCB0aW1lVW5pdCA9IHZsVGltZVVuaXQ7XG5leHBvcnQgY29uc3QgdHlwZSA9IHZsVHlwZTtcbmV4cG9ydCBjb25zdCB1dGlsID0gdmxVdGlsO1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlID0gdmxWYWxpZGF0ZTtcblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnX19WRVJTSU9OX18nO1xuIl19
