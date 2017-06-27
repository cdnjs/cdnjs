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
  return function(a, b) {
    var i, n, f, c;
    for (i=0, n=sort.length; i<n; ++i) {
      f = sort[i];
      c = u.cmp(f(a), f(b));
      if (c) return c * sign[i];
    }
    return 0;
  };
};

u.cmp = function(a, b) {
  return (a < b || a == null) && b != null ? -1 :
    (a > b || b == null) && a != null ? 1 :
    ((b = b instanceof Date ? +b : b),
     (a = a instanceof Date ? +a : a)) !== a && b === b ? -1 :
    b !== b && a === a ? 1 : 0;
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

// permutes an array using a Knuth shuffle
u.permute = function(a) {
  var m = a.length,
      swap,
      i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    swap = a[m];
    a[m] = a[i];
    a[i] = swap;
  }
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
exports.SUM_OPS = [
    AggregateOp.COUNT,
    AggregateOp.SUM,
    AggregateOp.DISTINCT
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
    Channel[Channel["X2"] = 'x2'] = "X2";
    Channel[Channel["Y2"] = 'y2'] = "Y2";
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
exports.X2 = Channel.X2;
exports.Y2 = Channel.Y2;
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
exports.CHANNELS = [exports.X, exports.Y, exports.X2, exports.Y2, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.PATH, exports.ORDER, exports.OPACITY, exports.TEXT, exports.DETAIL, exports.LABEL];
exports.UNIT_CHANNELS = util_1.without(exports.CHANNELS, [exports.ROW, exports.COLUMN]);
exports.UNIT_SCALE_CHANNELS = util_1.without(exports.UNIT_CHANNELS, [exports.PATH, exports.ORDER, exports.DETAIL, exports.TEXT, exports.LABEL, exports.X2, exports.Y2]);
exports.NONSPATIAL_CHANNELS = util_1.without(exports.UNIT_CHANNELS, [exports.X, exports.Y, exports.X2, exports.Y2]);
exports.NONSPATIAL_SCALE_CHANNELS = util_1.without(exports.UNIT_SCALE_CHANNELS, [exports.X, exports.Y, exports.X2, exports.Y2]);
exports.STACK_GROUP_CHANNELS = [exports.COLOR, exports.DETAIL, exports.ORDER, exports.OPACITY, exports.SIZE];
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
        case exports.X2:
        case exports.Y2:
            return {
                rule: true, bar: true, area: true
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
        case exports.X2:
        case exports.Y2:
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

},{"./util":65}],15:[function(require,module,exports){
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
    [
        'format', 'grid', 'layer', 'offset', 'orient', 'tickSize', 'ticks', 'tickSizeEnd', 'title', 'titleOffset',
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
function format(model, channel) {
    return common_1.numberFormat(model.fieldDef(channel), model.axis(channel).format, model.config());
}
exports.format = format;
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
        var config = model.config();
        if (!axis.labels) {
            return util_1.extend({
                text: ''
            }, labelsSpec);
        }
        if (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) && axis.labelMaxLength) {
            labelsSpec = util_1.extend({
                text: {
                    template: '{{ datum.data | truncate:' + axis.labelMaxLength + ' }}'
                }
            }, labelsSpec || {});
        }
        else if (fieldDef.type === type_1.TEMPORAL) {
            labelsSpec = util_1.extend({
                text: {
                    template: common_1.timeTemplate('datum.data', fieldDef.timeUnit, axis.format, axis.shortTimeLabels, config)
                }
            }, labelsSpec);
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

},{"../axis":12,"../channel":14,"../fielddef":53,"../type":64,"../util":65,"./common":16}],16:[function(require,module,exports){
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
function numberFormat(fieldDef, format, config) {
    if (fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) {
        return format || config.numberFormat;
    }
    return undefined;
}
exports.numberFormat = numberFormat;
function sortField(orderChannelDef) {
    return (orderChannelDef.sort === sort_1.SortOrder.DESCENDING ? '-' : '') +
        fielddef_1.field(orderChannelDef, { binSuffix: '_mid' });
}
exports.sortField = sortField;
function timeTemplate(templateField, timeUnit, format, shortTimeLabels, config) {
    if (!timeUnit || format) {
        var _format = format || config.timeFormat;
        return '{{' + templateField + ' | time:\'' + _format + '\'}}';
    }
    else {
        return timeunit_1.template(timeUnit, templateField, shortTimeLabels);
    }
}
exports.timeTemplate = timeTemplate;

},{"../channel":14,"../fielddef":53,"../sort":58,"../spec":59,"../timeunit":62,"../type":64,"../util":65,"./facet":32,"./layer":33,"./unit":47}],17:[function(require,module,exports){
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

},{"../data":49,"../spec":59,"../util":65,"./common":16}],18:[function(require,module,exports){
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
                if (value === undefined) {
                    if (util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], mark)) {
                        if (!encoding_1.isAggregate(encoding) || encoding_1.has(encoding, channel_1.DETAIL)) {
                            cfg[property] = 0.7;
                        }
                    }
                    if (mark === mark_1.AREA) {
                        cfg[property] = 0.7;
                    }
                }
                break;
            case 'orient':
                var xIsMeasure = fielddef_1.isMeasure(encoding.x) || fielddef_1.isMeasure(encoding.x2);
                var yIsMeasure = fielddef_1.isMeasure(encoding.y) || fielddef_1.isMeasure(encoding.y2);
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

},{"../channel":14,"../encoding":50,"../fielddef":53,"../mark":55,"../util":65}],19:[function(require,module,exports){
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

},{"../../bin":13,"../../channel":14,"../../fielddef":53,"../../util":65}],20:[function(require,module,exports){
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

},{"../../channel":14,"../../type":64,"../../util":65}],21:[function(require,module,exports){
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

},{"../../util":65,"./bin":19,"./colorrank":20,"./filter":22,"./formatparse":23,"./formula":24,"./nonpositivenullfilter":25,"./nullfilter":26,"./source":27,"./stackscale":28,"./summary":29,"./timeunit":30,"./timeunitdomain":31}],22:[function(require,module,exports){
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

},{"../../fielddef":53,"../../type":64,"../../util":65}],24:[function(require,module,exports){
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

},{"../../util":65}],25:[function(require,module,exports){
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

},{"../../scale":56,"../../util":65}],26:[function(require,module,exports){
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

},{"../../util":65}],27:[function(require,module,exports){
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
                if (!util_1.contains(['json', 'csv', 'tsv', 'topojson'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                var dataFormat = model.data().format || {};
                sourceData.format =
                    util_1.extend({ type: dataFormat.type ? model.data().format.type : defaultExtension }, dataFormat.property ? { property: dataFormat.property } : {}, dataFormat.feature ?
                        { feature: dataFormat.feature } :
                        dataFormat.mesh ?
                            { mesh: dataFormat.mesh } :
                            {});
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

},{"../../data":49,"../../util":65,"./bin":19,"./filter":22,"./formula":24,"./nullfilter":26,"./timeunit":30}],28:[function(require,module,exports){
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

},{"../../data":49,"../../fielddef":53}],29:[function(require,module,exports){
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

},{"../../aggregate":11,"../../data":49,"../../fielddef":53,"../../util":65}],30:[function(require,module,exports){
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

},{"../../fielddef":53,"../../type":64,"../../util":65,"./../time":46}],31:[function(require,module,exports){
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

},{"../../util":65,"./../time":46}],32:[function(require,module,exports){
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

},{"../axis":12,"../channel":14,"../config":48,"../data":49,"../encoding":50,"../fielddef":53,"../scale":56,"../type":64,"../util":65,"./axis":15,"./common":16,"./data/data":21,"./layout":34,"./model":44,"./scale":45}],33:[function(require,module,exports){
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

},{"../config":48,"../util":65,"../vega.schema":67,"./common":16,"./data/data":21,"./layout":34,"./model":44}],34:[function(require,module,exports){
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
    if (model.scale(channel)) {
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

},{"../channel":14,"../data":49,"../mark":55,"../scale":56,"../util":65,"./time":46}],35:[function(require,module,exports){
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
    var config = model.config();
    var def = getLegendDefWithScale(model, channel);
    def.title = title(legend, fieldDef);
    var format = common_1.numberFormat(fieldDef, legend.format, config);
    if (format) {
        def.format = format;
    }
    ['offset', 'orient', 'values'].forEach(function (property) {
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
function title(legend, fieldDef) {
    if (typeof legend !== 'boolean' && legend.title) {
        return legend.title;
    }
    return fielddef_1.title(fieldDef);
}
exports.title = title;
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
        var config = model.config();
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
            else if (fieldDef.type === type_1.TEMPORAL) {
                labelsSpec = util_1.extend({
                    text: {
                        template: common_1.timeTemplate('datum.data', fieldDef.timeUnit, legend.format, legend.shortTimeLabels, config)
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

},{"../channel":14,"../fielddef":53,"../mark":55,"../type":64,"../util":65,"./common":16,"./scale":45}],36:[function(require,module,exports){
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
        var orient = config.mark.orient;
        if (orient) {
            p.orient = { value: orient };
        }
        var stack = model.stack();
        var _x = x(model.encoding().x, model.scaleName(channel_1.X), orient, stack);
        if (_x) {
            p.x = _x;
        }
        var _y = y(model.encoding().y, model.scaleName(channel_1.Y), orient, stack);
        if (_y) {
            p.y = _y;
        }
        var _x2 = x2(model.encoding().x, model.encoding().x2, model.scaleName(channel_1.X), orient, stack);
        if (_x2) {
            p.x2 = _x2;
        }
        var _y2 = y2(model.encoding().y, model.encoding().y2, model.scaleName(channel_1.Y), orient, stack);
        if (_y2) {
            p.y2 = _y2;
        }
        common_1.applyColorAndOpacity(p, model);
        common_1.applyMarkConfig(p, model, ['interpolate', 'tension']);
        return p;
    }
    area.properties = properties;
    function x(fieldDef, scaleName, orient, stack) {
        if (stack && channel_1.X === stack.fieldChannel) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(fieldDef)) {
            if (orient === 'horizontal') {
                if (fieldDef && fieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(fieldDef)
                    };
                }
                else {
                    return {
                        scale: scaleName,
                        value: 0
                    };
                }
            }
            else {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef)
                };
            }
        }
        else if (fielddef_1.isDimension(fieldDef)) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
            };
        }
        return undefined;
    }
    area.x = x;
    function x2(xFieldDef, x2FieldDef, scaleName, orient, stack) {
        if (stack && channel_1.X === stack.fieldChannel) {
            if (orient === 'horizontal') {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(xFieldDef, { suffix: '_end' })
                };
            }
        }
        else if (fielddef_1.isMeasure(x2FieldDef)) {
            if (orient === 'horizontal') {
                if (x2FieldDef && x2FieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(x2FieldDef)
                    };
                }
                else {
                    return {
                        scale: scaleName,
                        value: 0
                    };
                }
            }
        }
        return undefined;
    }
    area.x2 = x2;
    function y(fieldDef, scaleName, orient, stack) {
        if (stack && channel_1.Y === stack.fieldChannel) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { suffix: '_start' })
            };
        }
        else if (fielddef_1.isMeasure(fieldDef)) {
            if (orient !== 'horizontal') {
                if (fieldDef && fieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(fieldDef)
                    };
                }
                else {
                    return { field: { group: 'height' } };
                }
            }
            else {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(fieldDef)
                };
            }
        }
        else if (fielddef_1.isDimension(fieldDef)) {
            return {
                scale: scaleName,
                field: fielddef_1.field(fieldDef, { binSuffix: '_mid' })
            };
        }
        return undefined;
    }
    area.y = y;
    function y2(yFieldDef, y2FieldDef, scaleName, orient, stack) {
        if (stack && channel_1.Y === stack.fieldChannel) {
            if (orient !== 'horizontal') {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(yFieldDef, { suffix: '_end' })
                };
            }
        }
        else if (fielddef_1.isMeasure(yFieldDef)) {
            if (orient !== 'horizontal') {
                if (y2FieldDef && y2FieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(y2FieldDef)
                    };
                }
                else {
                    return {
                        scale: scaleName,
                        value: 0
                    };
                }
            }
        }
        return undefined;
    }
    area.y2 = y2;
    function labels(model) {
        return undefined;
    }
    area.labels = labels;
})(area = exports.area || (exports.area = {}));

},{"../../channel":14,"../../fielddef":53,"../common":16}],37:[function(require,module,exports){
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
        var x2FieldDef = model.encoding().x2;
        var xIsMeasure = fielddef_1.isMeasure(xFieldDef) || fielddef_1.isMeasure(x2FieldDef);
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
        else if (xIsMeasure) {
            if (orient === 'horizontal') {
                if (model.has(channel_1.X)) {
                    p.x = {
                        scale: model.scaleName(channel_1.X),
                        field: model.field(channel_1.X)
                    };
                }
                else {
                    p.x = {
                        scale: model.scaleName(channel_1.X),
                        value: 0
                    };
                }
                if (model.has(channel_1.X2)) {
                    p.x2 = {
                        scale: model.scaleName(channel_1.X),
                        field: model.field(channel_1.X2)
                    };
                }
                else {
                    p.x2 = {
                        scale: model.scaleName(channel_1.X),
                        value: 0
                    };
                }
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
        var y2FieldDef = model.encoding().y2;
        var yIsMeasure = fielddef_1.isMeasure(yFieldDef) || fielddef_1.isMeasure(y2FieldDef);
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
        else if (yIsMeasure) {
            if (orient !== 'horizontal') {
                if (model.has(channel_1.Y)) {
                    p.y = {
                        scale: model.scaleName(channel_1.Y),
                        field: model.field(channel_1.Y)
                    };
                }
                else {
                    p.y = {
                        scale: model.scaleName(channel_1.Y),
                        value: 0
                    };
                }
                if (model.has(channel_1.Y2)) {
                    p.y2 = {
                        scale: model.scaleName(channel_1.Y),
                        field: model.field(channel_1.Y2)
                    };
                }
                else {
                    p.y2 = {
                        scale: model.scaleName(channel_1.Y),
                        value: 0
                    };
                }
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

},{"../../channel":14,"../../fielddef":53,"../common":16}],38:[function(require,module,exports){
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

},{"../../channel":14,"../../fielddef":53,"../common":16}],39:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var encoding_1 = require('../../encoding');
var fielddef_1 = require('../../fielddef');
var mark_1 = require('../../mark');
var scale_1 = require('../../scale');
var util_1 = require('../../util');
var area_1 = require('./area');
var bar_1 = require('./bar');
var common_1 = require('../common');
var line_1 = require('./line');
var point_1 = require('./point');
var rule_1 = require('./rule');
var text_1 = require('./text');
var tick_1 = require('./tick');
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
            stackTransforms(model, true).concat(facetTransform) :
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
            { transform: stackTransforms(model, false) } :
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
        return '-' + model.field(model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X, { binSuffix: '_mid' });
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
function stackTransforms(model, impute) {
    var stackByFields = getStackByFields(model);
    if (impute) {
        return [imputeTransform(model, stackByFields), stackTransform(model, stackByFields)];
    }
    return [stackTransform(model, stackByFields)];
}
function getStackByFields(model) {
    var encoding = model.encoding();
    return channel_1.STACK_GROUP_CHANNELS.reduce(function (fields, channel) {
        var channelEncoding = encoding[channel];
        if (encoding_1.has(encoding, channel)) {
            if (util_1.isArray(channelEncoding)) {
                channelEncoding.forEach(function (fieldDef) {
                    fields.push(fielddef_1.field(fieldDef));
                });
            }
            else {
                var fieldDef = channelEncoding;
                var scale = model.scale(channel);
                fields.push(fielddef_1.field(fieldDef, {
                    binSuffix: scale && scale.type === scale_1.ScaleType.ORDINAL ? '_range' : '_start'
                }));
            }
        }
        return fields;
    }, []);
}
function imputeTransform(model, stackFields) {
    var stack = model.stack();
    return {
        type: 'impute',
        field: model.field(stack.fieldChannel),
        groupby: stackFields,
        orderby: [model.field(stack.groupbyChannel, { binSuffix: '_mid' })],
        method: 'value',
        value: 0
    };
}
function stackTransform(model, stackFields) {
    var stack = model.stack();
    var encoding = model.encoding();
    var sortby = model.has(channel_1.ORDER) ?
        (util_1.isArray(encoding[channel_1.ORDER]) ? encoding[channel_1.ORDER] : [encoding[channel_1.ORDER]]).map(common_1.sortField) :
        stackFields.map(function (field) {
            return '-' + field;
        });
    var valName = model.field(stack.fieldChannel);
    var transform = {
        type: 'stack',
        groupby: [model.field(stack.groupbyChannel, { binSuffix: '_mid' })],
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

},{"../../channel":14,"../../encoding":50,"../../fielddef":53,"../../mark":55,"../../scale":56,"../../util":65,"../common":16,"./area":36,"./bar":37,"./line":38,"./point":40,"./rule":41,"./text":42,"./tick":43}],40:[function(require,module,exports){
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

},{"../../channel":14,"../../fielddef":53,"../common":16}],41:[function(require,module,exports){
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
        if (model.config().mark.orient === 'vertical') {
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
            if (model.has(channel_1.Y2)) {
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y2, { binSuffix: '_mid' })
                };
            }
            else {
                p.y2 = { value: 0 };
            }
        }
        else {
            if (model.has(channel_1.Y)) {
                p.y = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: '_mid' })
                };
            }
            else {
                p.y = { value: 0 };
            }
            if (model.has(channel_1.X)) {
                p.x = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: '_mid' })
                };
            }
            else {
                p.x = { value: 0 };
            }
            if (model.has(channel_1.X2)) {
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X2, { binSuffix: '_mid' })
                };
            }
            else {
                p.x2 = { field: { group: 'width' } };
            }
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
var fielddef_1 = require('../../fielddef');
var type_1 = require('../../type');
var text;
(function (text_1) {
    function markType() {
        return 'text';
    }
    text_1.markType = markType;
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
    text_1.background = background;
    function properties(model) {
        var p = {};
        common_1.applyMarkConfig(p, model, ['angle', 'align', 'baseline', 'dx', 'dy', 'font', 'fontWeight',
            'fontStyle', 'radius', 'theta', 'text']);
        var config = model.config();
        var textFieldDef = model.fieldDef(channel_1.TEXT);
        p.x = x(model.encoding().x, model.scaleName(channel_1.X), config, textFieldDef);
        p.y = y(model.encoding().y, model.scaleName(channel_1.Y), config);
        p.fontSize = size(model.encoding().size, model.scaleName(channel_1.SIZE), config);
        p.text = text(model.encoding().text, model.scaleName(channel_1.TEXT), config);
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
        return p;
    }
    text_1.properties = properties;
    function x(xFieldDef, scaleName, config, textFieldDef) {
        if (xFieldDef) {
            if (xFieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(xFieldDef, { binSuffix: '_mid' })
                };
            }
        }
        if (textFieldDef && textFieldDef.type === type_1.QUANTITATIVE) {
            return { field: { group: 'width' }, offset: -5 };
        }
        else {
            return { value: config.scale.textBandWidth / 2 };
        }
    }
    function y(yFieldDef, scaleName, config) {
        if (yFieldDef) {
            if (yFieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(yFieldDef, { binSuffix: '_mid' })
                };
            }
        }
        return { value: config.scale.bandSize / 2 };
    }
    function size(sizeFieldDef, scaleName, config) {
        if (sizeFieldDef) {
            if (sizeFieldDef.field) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(sizeFieldDef)
                };
            }
            if (sizeFieldDef.value) {
                return { value: sizeFieldDef.value };
            }
        }
        return { value: config.mark.fontSize };
    }
    function text(textFieldDef, scaleName, config) {
        if (textFieldDef) {
            if (textFieldDef.field) {
                if (type_1.QUANTITATIVE === textFieldDef.type) {
                    var format = common_1.numberFormat(textFieldDef, config.mark.format, config);
                    var filter = 'number' + (format ? ':\'' + format + '\'' : '');
                    return {
                        template: '{{' + fielddef_1.field(textFieldDef, { datum: true }) + ' | ' + filter + '}}'
                    };
                }
                else if (type_1.TEMPORAL === textFieldDef.type) {
                    return {
                        template: common_1.timeTemplate(fielddef_1.field(textFieldDef, { datum: true }), textFieldDef.timeUnit, config.mark.format, config.mark.shortTimeLabels, config)
                    };
                }
                else {
                    return { field: textFieldDef.field };
                }
            }
            else if (textFieldDef.value) {
                return { value: textFieldDef.value };
            }
        }
        return { value: config.mark.text };
    }
})(text = exports.text || (exports.text = {}));

},{"../../channel":14,"../../fielddef":53,"../../type":64,"../common":16}],43:[function(require,module,exports){
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

},{"../../channel":14,"../../fielddef":53,"../common":16}],44:[function(require,module,exports){
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

},{"../channel":14,"../encoding":50,"../fielddef":53,"../scale":56,"../util":65}],45:[function(require,module,exports){
"use strict";
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var scale_1 = require('../scale');
var stack_1 = require('../stack');
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
    if (channel === channel_1.X && model.has(channel_1.X2)) {
        if (model.has(channel_1.X)) {
            scaleDef.domain = { fields: [domain(scale, model, channel_1.X), domain(scale, model, channel_1.X2)] };
        }
        else {
            scaleDef.domain = domain(scale, model, channel_1.X2);
        }
    }
    else if (channel === channel_1.Y && model.has(channel_1.Y2)) {
        if (model.has(channel_1.Y)) {
            scaleDef.domain = { fields: [domain(scale, model, channel_1.Y), domain(scale, model, channel_1.Y2)] };
        }
        else {
            scaleDef.domain = domain(scale, model, channel_1.Y2);
        }
    }
    else {
        scaleDef.domain = domain(scale, model, channel);
    }
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
                    case timeunit_1.TimeUnit.QUARTER:
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
        if (stack.offset === stack_1.StackOffset.NORMALIZE) {
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

},{"../aggregate":11,"../channel":14,"../data":49,"../fielddef":53,"../mark":55,"../scale":56,"../stack":60,"../timeunit":62,"../type":64,"../util":65,"./time":46}],46:[function(require,module,exports){
"use strict";
var util_1 = require('../util');
var channel_1 = require('../channel');
var timeunit_1 = require('../timeunit');
function smallestUnit(timeUnit) {
    if (!timeUnit) {
        return undefined;
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.SECONDS)) {
        return 'second';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.MINUTES)) {
        return 'minute';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.HOURS)) {
        return 'hour';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.DAY) ||
        timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.DATE)) {
        return 'day';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.MONTH)) {
        return 'month';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.YEAR)) {
        return 'year';
    }
    return undefined;
}
exports.smallestUnit = smallestUnit;
function parseExpression(timeUnit, fieldRef, onlyRef) {
    if (onlyRef === void 0) { onlyRef = false; }
    var out = 'datetime(';
    function func(fun, addComma) {
        if (addComma === void 0) { addComma = true; }
        if (onlyRef) {
            return fieldRef + (addComma ? ', ' : '');
        }
        else {
            var res = '';
            if (fun === 'quarter') {
                res = 'floor(month(' + fieldRef + ')' + '/3)*3';
            }
            else {
                res = fun + '(' + fieldRef + ')';
            }
            return res + (addComma ? ', ' : '');
        }
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.YEAR)) {
        out += func('year');
    }
    else {
        out += '2006, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.MONTH)) {
        out += func('month');
    }
    else if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.QUARTER)) {
        out += func('quarter');
    }
    else {
        out += '0, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.DAY)) {
        out += func('day', false) + '+1, ';
    }
    else if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.DATE)) {
        out += func('date');
    }
    else {
        out += '1, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.HOURS)) {
        out += func('hours');
    }
    else {
        out += '0, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.MINUTES)) {
        out += func('minutes');
    }
    else {
        out += '0, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.SECONDS)) {
        out += func('seconds');
    }
    else {
        out += '0, ';
    }
    if (timeunit_1.containsTimeUnit(timeUnit, timeunit_1.TimeUnit.MILLISECONDS)) {
        out += func('milliseconds', false);
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
        case timeunit_1.TimeUnit.QUARTER:
            return [0, 3, 6, 9];
    }
    return null;
}
exports.rawDomain = rawDomain;

},{"../channel":14,"../timeunit":62,"../util":65}],47:[function(require,module,exports){
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
var stack_1 = require('../stack');
var UnitModel = (function (_super) {
    __extends(UnitModel, _super);
    function UnitModel(spec, parent, parentGivenName) {
        _super.call(this, spec, parent, parentGivenName);
        var mark = this._mark = spec.mark;
        var encoding = this._encoding = this._initEncoding(mark, spec.encoding || {});
        var config = this._config = this._initConfig(spec.config, parent, mark, encoding);
        this._scale = this._initScale(mark, encoding, config);
        this._axis = this._initAxis(encoding, config);
        this._legend = this._initLegend(encoding, config);
        this._stack = stack_1.stack(mark, encoding, config);
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
            if (vlEncoding.has(encoding, channel) ||
                (channel === channel_1.X && vlEncoding.has(encoding, channel_1.X2)) ||
                (channel === channel_1.Y && vlEncoding.has(encoding, channel_1.Y2))) {
                var channelDef = encoding[channel];
                var scaleSpec = (channelDef || {}).scale || {};
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
            if (vlEncoding.has(encoding, channel) ||
                (channel === channel_1.X && vlEncoding.has(encoding, channel_1.X2)) ||
                (channel === channel_1.Y && vlEncoding.has(encoding, channel_1.Y2))) {
                var axisSpec = (encoding[channel] || {}).axis;
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

},{"../aggregate":11,"../channel":14,"../config":48,"../data":49,"../encoding":50,"../fielddef":53,"../mark":55,"../scale":56,"../stack":60,"../type":64,"../util":65,"./axis":15,"./common":16,"./config":18,"./data/data":21,"./layout":34,"./legend":35,"./mark/mark":39,"./model":44,"./scale":45}],48:[function(require,module,exports){
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
(function (AreaOverlay) {
    AreaOverlay[AreaOverlay["LINE"] = 'line'] = "LINE";
    AreaOverlay[AreaOverlay["LINEPOINT"] = 'linepoint'] = "LINEPOINT";
    AreaOverlay[AreaOverlay["NONE"] = 'none'] = "NONE";
})(exports.AreaOverlay || (exports.AreaOverlay = {}));
var AreaOverlay = exports.AreaOverlay;
exports.defaultOverlayConfig = {
    line: false,
    pointStyle: { filled: true },
    lineStyle: {}
};
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
    overlay: exports.defaultOverlayConfig,
    scale: scale_1.defaultScaleConfig,
    axis: axis_1.defaultAxisConfig,
    legend: legend_1.defaultLegendConfig,
    facet: exports.defaultFacetConfig,
};

},{"./axis":12,"./legend":54,"./scale":56}],49:[function(require,module,exports){
"use strict";
var type_1 = require('./type');
(function (DataFormatType) {
    DataFormatType[DataFormatType["JSON"] = 'json'] = "JSON";
    DataFormatType[DataFormatType["CSV"] = 'csv'] = "CSV";
    DataFormatType[DataFormatType["TSV"] = 'tsv'] = "TSV";
    DataFormatType[DataFormatType["TOPOJSON"] = 'topojson'] = "TOPOJSON";
})(exports.DataFormatType || (exports.DataFormatType = {}));
var DataFormatType = exports.DataFormatType;
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

},{"./type":64}],50:[function(require,module,exports){
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
    return util_1.some(channel_1.CHANNELS, function (channel) {
        if (has(encoding, channel) && encoding[channel].aggregate) {
            return true;
        }
        return false;
    });
}
exports.isAggregate = isAggregate;
function isRanged(encoding) {
    return encoding && ((!!encoding.x && !!encoding.x2) || (!!encoding.y && !!encoding.y2));
}
exports.isRanged = isRanged;
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

},{"./channel":14,"./util":65}],51:[function(require,module,exports){
"use strict";

},{}],52:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],53:[function(require,module,exports){
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
            case timeunit_1.TimeUnit.QUARTER: return 4;
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

},{"./aggregate":11,"./scale":56,"./timeunit":62,"./type":64,"./util":65}],54:[function(require,module,exports){
"use strict";
exports.defaultLegendConfig = {
    orient: undefined,
    shortTimeLabels: false
};

},{}],55:[function(require,module,exports){
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
    Mark[Mark["ERRORBAR"] = 'errorBar'] = "ERRORBAR";
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
exports.ERRORBAR = Mark.ERRORBAR;
exports.PRIMITIVE_MARKS = [exports.AREA, exports.BAR, exports.LINE, exports.POINT, exports.TEXT, exports.TICK, exports.RULE, exports.CIRCLE, exports.SQUARE];

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"./aggregate":11,"./encoding":50,"./mark":55,"./timeunit":62,"./type":64}],58:[function(require,module,exports){
"use strict";
(function (SortOrder) {
    SortOrder[SortOrder["ASCENDING"] = 'ascending'] = "ASCENDING";
    SortOrder[SortOrder["DESCENDING"] = 'descending'] = "DESCENDING";
    SortOrder[SortOrder["NONE"] = 'none'] = "NONE";
})(exports.SortOrder || (exports.SortOrder = {}));
var SortOrder = exports.SortOrder;

},{}],59:[function(require,module,exports){
"use strict";
var config_1 = require('./config');
var encoding_1 = require('./encoding');
var mark_1 = require('./mark');
var stack_1 = require('./stack');
var channel_1 = require('./channel');
var vlEncoding = require('./encoding');
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
        return normalizeExtendedUnitSpec(spec);
    }
    if (isUnitSpec(spec)) {
        return normalizeUnitSpec(spec);
    }
    return spec;
}
exports.normalize = normalize;
function normalizeExtendedUnitSpec(spec) {
    var hasRow = encoding_1.has(spec.encoding, channel_1.ROW);
    var hasColumn = encoding_1.has(spec.encoding, channel_1.COLUMN);
    var encoding = util_1.duplicate(spec.encoding);
    delete encoding.column;
    delete encoding.row;
    return util_1.extend(spec.name ? { name: spec.name } : {}, spec.description ? { description: spec.description } : {}, { data: spec.data }, spec.transform ? { transform: spec.transform } : {}, {
        facet: util_1.extend(hasRow ? { row: spec.encoding.row } : {}, hasColumn ? { column: spec.encoding.column } : {}),
        spec: normalizeUnitSpec({
            mark: spec.mark,
            encoding: encoding
        })
    }, spec.config ? { config: spec.config } : {});
}
exports.normalizeExtendedUnitSpec = normalizeExtendedUnitSpec;
function normalizeUnitSpec(spec) {
    var config = spec.config;
    var overlayConfig = config && config.overlay;
    var overlayWithLine = overlayConfig && spec.mark === mark_1.AREA &&
        util_1.contains([config_1.AreaOverlay.LINEPOINT, config_1.AreaOverlay.LINE], overlayConfig.area);
    var overlayWithPoint = overlayConfig && ((overlayConfig.line && spec.mark === mark_1.LINE) ||
        (overlayConfig.area === config_1.AreaOverlay.LINEPOINT && spec.mark === mark_1.AREA));
    if (spec.mark === mark_1.ERRORBAR) {
        return normalizeErrorBarUnitSpec(spec);
    }
    if (encoding_1.isRanged(spec.encoding)) {
        return normalizeRangedUnitSpec(spec);
    }
    if (isStacked(spec)) {
        return spec;
    }
    if (overlayWithPoint || overlayWithLine) {
        return normalizeOverlay(spec, overlayWithPoint, overlayWithLine);
    }
    return spec;
}
exports.normalizeUnitSpec = normalizeUnitSpec;
function normalizeRangedUnitSpec(spec) {
    if (spec.encoding) {
        var hasX = encoding_1.has(spec.encoding, channel_1.X);
        var hasY = encoding_1.has(spec.encoding, channel_1.Y);
        var hasX2 = encoding_1.has(spec.encoding, channel_1.X2);
        var hasY2 = encoding_1.has(spec.encoding, channel_1.Y2);
        if ((hasX2 && !hasX) || (hasY2 && !hasY)) {
            var normalizedSpec = util_1.duplicate(spec);
            if (hasX2 && !hasX) {
                normalizedSpec.encoding.x = normalizedSpec.encoding.x2;
                delete normalizedSpec.encoding.x2;
            }
            if (hasY2 && !hasY) {
                normalizedSpec.encoding.y = normalizedSpec.encoding.y2;
                delete normalizedSpec.encoding.y2;
            }
            return normalizedSpec;
        }
    }
    return spec;
}
exports.normalizeRangedUnitSpec = normalizeRangedUnitSpec;
function normalizeErrorBarUnitSpec(spec) {
    var layerSpec = util_1.extend(spec.name ? { name: spec.name } : {}, spec.description ? { description: spec.description } : {}, spec.data ? { data: spec.data } : {}, spec.transform ? { transform: spec.transform } : {}, spec.config ? { config: spec.config } : {}, { layers: [] });
    if (!spec.encoding) {
        return layerSpec;
    }
    if (spec.mark === mark_1.ERRORBAR) {
        var ruleSpec = {
            mark: mark_1.RULE,
            encoding: util_1.extend(spec.encoding.x ? { x: util_1.duplicate(spec.encoding.x) } : {}, spec.encoding.y ? { y: util_1.duplicate(spec.encoding.y) } : {}, spec.encoding.x2 ? { x2: util_1.duplicate(spec.encoding.x2) } : {}, spec.encoding.y2 ? { y2: util_1.duplicate(spec.encoding.y2) } : {}, {})
        };
        var lowerTickSpec = {
            mark: mark_1.TICK,
            encoding: util_1.extend(spec.encoding.x ? { x: util_1.duplicate(spec.encoding.x) } : {}, spec.encoding.y ? { y: util_1.duplicate(spec.encoding.y) } : {}, spec.encoding.size ? { size: util_1.duplicate(spec.encoding.size) } : {}, {})
        };
        var upperTickSpec = {
            mark: mark_1.TICK,
            encoding: util_1.extend({
                x: spec.encoding.x2 ? util_1.duplicate(spec.encoding.x2) : util_1.duplicate(spec.encoding.x),
                y: spec.encoding.y2 ? util_1.duplicate(spec.encoding.y2) : util_1.duplicate(spec.encoding.y)
            }, spec.encoding.size ? { size: util_1.duplicate(spec.encoding.size) } : {})
        };
        layerSpec.layers.push(normalizeUnitSpec(ruleSpec));
        layerSpec.layers.push(normalizeUnitSpec(lowerTickSpec));
        layerSpec.layers.push(normalizeUnitSpec(upperTickSpec));
    }
    return layerSpec;
}
exports.normalizeErrorBarUnitSpec = normalizeErrorBarUnitSpec;
function normalizeOverlay(spec, overlayWithPoint, overlayWithLine) {
    var outerProps = ['name', 'description', 'data', 'transform'];
    var baseSpec = util_1.omit(spec, outerProps.concat('config'));
    var baseConfig = util_1.duplicate(spec.config);
    delete baseConfig.overlay;
    var layerSpec = util_1.extend(util_1.pick(spec, outerProps), { layers: [baseSpec] }, util_1.keys(baseConfig).length > 0 ? { config: baseConfig } : {});
    if (overlayWithLine) {
        var lineSpec = util_1.duplicate(baseSpec);
        lineSpec.mark = mark_1.LINE;
        var markConfig = util_1.extend({}, config_1.defaultOverlayConfig.lineStyle, spec.config.overlay.lineStyle);
        if (util_1.keys(markConfig).length > 0) {
            lineSpec.config = { mark: markConfig };
        }
        layerSpec.layers.push(lineSpec);
    }
    if (overlayWithPoint) {
        var pointSpec = util_1.duplicate(baseSpec);
        pointSpec.mark = mark_1.POINT;
        var markConfig = util_1.extend({}, config_1.defaultOverlayConfig.pointStyle, spec.config.overlay.pointStyle);
        ;
        if (util_1.keys(markConfig).length > 0) {
            pointSpec.config = { mark: markConfig };
        }
        layerSpec.layers.push(pointSpec);
    }
    return layerSpec;
}
exports.normalizeOverlay = normalizeOverlay;
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
function isStacked(spec) {
    return stack_1.stack(spec.mark, spec.encoding, spec.config) !== null;
}
exports.isStacked = isStacked;
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

},{"./channel":14,"./config":48,"./encoding":50,"./mark":55,"./stack":60,"./util":65}],60:[function(require,module,exports){
"use strict";
var channel_1 = require('./channel');
var encoding_1 = require('./encoding');
var mark_1 = require('./mark');
var util_1 = require('./util');
(function (StackOffset) {
    StackOffset[StackOffset["ZERO"] = 'zero'] = "ZERO";
    StackOffset[StackOffset["CENTER"] = 'center'] = "CENTER";
    StackOffset[StackOffset["NORMALIZE"] = 'normalize'] = "NORMALIZE";
    StackOffset[StackOffset["NONE"] = 'none'] = "NONE";
})(exports.StackOffset || (exports.StackOffset = {}));
var StackOffset = exports.StackOffset;
function stack(mark, encoding, config) {
    var stacked = (config && config.mark) ? config.mark.stacked : undefined;
    if (util_1.contains([StackOffset.NONE, null, false], stacked)) {
        return null;
    }
    if (!util_1.contains([mark_1.BAR, mark_1.AREA], mark)) {
        return null;
    }
    if (!encoding_1.isAggregate(encoding)) {
        return null;
    }
    var stackByChannels = channel_1.STACK_GROUP_CHANNELS.reduce(function (sc, channel) {
        if (encoding_1.has(encoding, channel) && !encoding[channel].aggregate) {
            sc.push(channel);
        }
        return sc;
    }, []);
    if (stackByChannels.length === 0) {
        return null;
    }
    var hasXField = encoding_1.has(encoding, channel_1.X);
    var hasYField = encoding_1.has(encoding, channel_1.Y);
    var xIsAggregate = hasXField && !!encoding.x.aggregate;
    var yIsAggregate = hasYField && !!encoding.y.aggregate;
    if (xIsAggregate !== yIsAggregate) {
        return {
            groupbyChannel: xIsAggregate ? (hasYField ? channel_1.Y : null) : (hasXField ? channel_1.X : null),
            fieldChannel: xIsAggregate ? channel_1.X : channel_1.Y,
            stackByChannels: stackByChannels,
            offset: stacked || StackOffset.ZERO
        };
    }
    return null;
}
exports.stack = stack;

},{"./channel":14,"./encoding":50,"./mark":55,"./util":65}],61:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],62:[function(require,module,exports){
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
    TimeUnit[TimeUnit["QUARTER"] = 'quarter'] = "QUARTER";
    TimeUnit[TimeUnit["YEARQUARTER"] = 'yearquarter'] = "YEARQUARTER";
    TimeUnit[TimeUnit["QUARTERMONTH"] = 'quartermonth'] = "QUARTERMONTH";
    TimeUnit[TimeUnit["YEARQUARTERMONTH"] = 'yearquartermonth'] = "YEARQUARTERMONTH";
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
    TimeUnit.QUARTER,
    TimeUnit.YEARQUARTER,
    TimeUnit.QUARTERMONTH,
    TimeUnit.YEARQUARTERMONTH,
];
function template(timeUnit, field, shortTimeLabels) {
    if (!timeUnit) {
        return undefined;
    }
    var dateComponents = [];
    if (containsTimeUnit(timeUnit, TimeUnit.YEAR)) {
        dateComponents.push(shortTimeLabels ? '%y' : '%Y');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.QUARTER)) {
        dateComponents.push('\'}}Q{{' + field + ' | quarter}}{{' + field + ' | time:\'');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MONTH)) {
        dateComponents.push(shortTimeLabels ? '%b' : '%B');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.DAY)) {
        dateComponents.push(shortTimeLabels ? '%a' : '%A');
    }
    else if (containsTimeUnit(timeUnit, TimeUnit.DATE)) {
        dateComponents.push('%d');
    }
    var timeComponents = [];
    if (containsTimeUnit(timeUnit, TimeUnit.HOURS)) {
        timeComponents.push('%H');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MINUTES)) {
        timeComponents.push('%M');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.SECONDS)) {
        timeComponents.push('%S');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MILLISECONDS)) {
        timeComponents.push('%L');
    }
    var out = [];
    if (dateComponents.length > 0) {
        out.push(dateComponents.join('-'));
    }
    if (timeComponents.length > 0) {
        out.push(timeComponents.join(':'));
    }
    if (out.length > 0) {
        var template_1 = '{{' + field + ' | time:\'' + out.join(' ') + '\'}}';
        return template_1.replace(new RegExp('{{' + field + ' \\| time:\'\'}}', 'g'), '');
    }
    else {
        return undefined;
    }
}
exports.template = template;
function containsTimeUnit(fullTimeUnit, timeUnit) {
    var fullTimeUnitStr = fullTimeUnit.toString();
    var timeUnitStr = timeUnit.toString();
    return fullTimeUnitStr.indexOf(timeUnitStr) > -1;
}
exports.containsTimeUnit = containsTimeUnit;

},{}],63:[function(require,module,exports){
"use strict";

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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
var util_2 = require('datalib/src/util');
var generate_1 = require('datalib/src/generate');
exports.range = generate_1.range;
var encoding_1 = require('./encoding');
exports.has = encoding_1.has;
var channel_1 = require('./channel');
exports.Channel = channel_1.Channel;
var util_3 = require('datalib/src/util');
function pick(obj, props) {
    var copy = {};
    props.forEach(function (prop) {
        if (obj.hasOwnProperty(prop)) {
            copy[prop] = obj[prop];
        }
    });
    return copy;
}
exports.pick = pick;
function omit(obj, props) {
    var copy = util_2.duplicate(obj);
    props.forEach(function (prop) {
        delete copy[prop];
    });
    return copy;
}
exports.omit = omit;
function hash(a) {
    if (util_3.isString(a) || util_3.isNumber(a) || util_3.isBoolean(a)) {
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
function some(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (f(arr[k], k, i++)) {
            return true;
        }
    }
    return false;
}
exports.some = some;
function every(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (!f(arr[k], k, i++)) {
            return false;
        }
    }
    return true;
}
exports.every = every;
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

},{"./channel":14,"./encoding":50,"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6,"json-stable-stringify":7}],66:[function(require,module,exports){
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

},{"./mark":55,"./util":65}],67:[function(require,module,exports){
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

},{"./util":65}],68:[function(require,module,exports){
"use strict";
exports.axis = require('./axis');
exports.aggregate = require('./aggregate');
exports.bin = require('./bin');
exports.channel = require('./channel');
exports.compile = require('./compile/compile').compile;
exports.config = require('./config');
exports.data = require('./data');
exports.encoding = require('./encoding');
exports.facet = require('./facet');
exports.fieldDef = require('./fieldDef');
exports.legend = require('./legend');
exports.mark = require('./mark');
exports.scale = require('./scale');
exports.shorthand = require('./shorthand');
exports.sort = require('./sort');
exports.spec = require('./spec');
exports.stack = require('./stack');
exports.timeUnit = require('./timeUnit');
exports.transform = require('./transform');
exports.type = require('./type');
exports.util = require('./util');
exports.validate = require('./validate');
exports.version = '1.0.14';

},{"./aggregate":11,"./axis":12,"./bin":13,"./channel":14,"./compile/compile":17,"./config":48,"./data":49,"./encoding":50,"./facet":51,"./fieldDef":52,"./legend":54,"./mark":55,"./scale":56,"./shorthand":57,"./sort":58,"./spec":59,"./stack":60,"./timeUnit":61,"./transform":63,"./type":64,"./util":65,"./validate":66}]},{},[68])(68)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvdGltZS50cyIsInNyYy9jb21waWxlL3VuaXQudHMiLCJzcmMvY29uZmlnLnRzIiwic3JjL2RhdGEudHMiLCJzcmMvZW5jb2RpbmcudHMiLCJzcmMvZmllbGRkZWYudHMiLCJzcmMvbGVnZW5kLnRzIiwic3JjL21hcmsudHMiLCJzcmMvc2NhbGUudHMiLCJzcmMvc2hvcnRoYW5kLnRzIiwic3JjL3NvcnQudHMiLCJzcmMvc3BlYy50cyIsInNyYy9zdGFjay50cyIsInNyYy90aW1ldW5pdC50cyIsInNyYy90eXBlLnRzIiwic3JjL3V0aWwudHMiLCJzcmMvdmFsaWRhdGUudHMiLCJzcmMvdmVnYS5zY2hlbWEudHMiLCJzcmMvdmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQSxXQUFZLFdBQVc7SUFDbkIsb0NBQVMsUUFBZSxZQUFBLENB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QU0sRUFBQyxDQUFFO1FBQy9CLENBQUM7UUFFRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FB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V0FBVyxhQUFhLENBQUMsQ0FBQztBQUNuQyxXQUFHLFdBQVcsT0FBTyxDQUFDLENBQUM7QUFDdkIsZUFBTyxXQUFXLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLGVBQU8sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDOUMsY0FBTSxXQUFXLFVBQVUsQ0FBQyxDQUFDO0FBQzdCLFlBQUksV0FBVyxRQUFRLENBQUMsQ0FBQztBQUN6QixnQkFBUSxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLGFBQUssV0FBVyxTQUFTLENBQUMsQ0FBQztBQUMzQixnQkFBUSxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLGNBQU0sV0FBVyxVQUFVLENBQUMsQ0FBQztBQUM3QixZQUFJLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDekIsYUFBSyxXQUFXLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLGlCQUFTLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFDbkMsWUFBSSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksV0FBVyxRQUFRLENBQUMsQ0FBQztBQUN6QixhQUFLLFdBQVcsU0FBUyxDQUFDLENBQUM7QUFDM0IsZ0JBQVEsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUNqQyxpQkFBUyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBQ25DLFlBQUksV0FBVyxRQUFRLENBQUMsQ0FBQztBQUN6QixZQUFJLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDekIsZ0JBQVEsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUVsQyxlQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ2QzLXRpbWUnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfdGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcbiAgdmFyIHQxID0gbmV3IERhdGU7XG4gIGZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQsIGZpZWxkKSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdDAuc2V0VGltZSgrc3RhcnQpLCB0MS5zZXRUaW1lKCtlbmQpO1xuICAgICAgICBmbG9vcmkodDApLCBmbG9vcmkodDEpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICAgIH07XG5cbiAgICAgIGludGVydmFsLmV2ZXJ5ID0gZnVuY3Rpb24oc3RlcCkge1xuICAgICAgICBzdGVwID0gTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgICAgcmV0dXJuICFpc0Zpbml0ZShzdGVwKSB8fCAhKHN0ZXAgPiAwKSA/IG51bGxcbiAgICAgICAgICAgIDogIShzdGVwID4gMSkgPyBpbnRlcnZhbFxuICAgICAgICAgICAgOiBpbnRlcnZhbC5maWx0ZXIoZmllbGRcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGZpZWxkKGQpICUgc3RlcCA9PT0gMDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24oZCkgeyByZXR1cm4gaW50ZXJ2YWwuY291bnQoMCwgZCkgJSBzdGVwID09PSAwOyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9O1xuXG4gIHZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIG5vb3BcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xuICB9KTtcblxuICAvLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG4gIG1pbGxpc2Vjb25kLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLmZsb29yKGspO1xuICAgIGlmICghaXNGaW5pdGUoaykgfHwgIShrID4gMCkpIHJldHVybiBudWxsO1xuICAgIGlmICghKGsgPiAxKSkgcmV0dXJuIG1pbGxpc2Vjb25kO1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gaykgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBrO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gd2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN1bmRheSA9IHdlZWtkYXkoMCk7XG4gIHZhciBtb25kYXkgPSB3ZWVrZGF5KDEpO1xuICB2YXIgdHVlc2RheSA9IHdlZWtkYXkoMik7XG4gIHZhciB3ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xuICB2YXIgdGh1cnNkYXkgPSB3ZWVrZGF5KDQpO1xuICB2YXIgZnJpZGF5ID0gd2Vla2RheSg1KTtcbiAgdmFyIHNhdHVyZGF5ID0gd2Vla2RheSg2KTtcblxuICB2YXIgbW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldERhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9KTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNTZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgdXRjTWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNIb3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNEYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gKGRhdGUuZ2V0VVRDRGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbiAgdmFyIHV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG4gIHZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbiAgdmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG4gIHZhciB1dGNUaHVyc2RheSA9IHV0Y1dlZWtkYXkoNCk7XG4gIHZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuICB2YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNZZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xuICB2YXIgc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcbiAgdmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG4gIHZhciBob3VycyA9IGhvdXIucmFuZ2U7XG4gIHZhciBkYXlzID0gZGF5LnJhbmdlO1xuICB2YXIgc3VuZGF5cyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG4gIHZhciB0dWVzZGF5cyA9IHR1ZXNkYXkucmFuZ2U7XG4gIHZhciB3ZWRuZXNkYXlzID0gd2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG4gIHZhciBmcmlkYXlzID0gZnJpZGF5LnJhbmdlO1xuICB2YXIgc2F0dXJkYXlzID0gc2F0dXJkYXkucmFuZ2U7XG4gIHZhciB3ZWVrcyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbnRocyA9IG1vbnRoLnJhbmdlO1xuICB2YXIgeWVhcnMgPSB5ZWFyLnJhbmdlO1xuXG4gIHZhciB1dGNNaWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICB2YXIgdXRjTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICB2YXIgdXRjU2Vjb25kcyA9IHV0Y1NlY29uZC5yYW5nZTtcbiAgdmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG4gIHZhciB1dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG4gIHZhciB1dGNEYXlzID0gdXRjRGF5LnJhbmdlO1xuICB2YXIgdXRjU3VuZGF5cyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbmRheXMgPSB1dGNNb25kYXkucmFuZ2U7XG4gIHZhciB1dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXkucmFuZ2U7XG4gIHZhciB1dGNGcmlkYXlzID0gdXRjRnJpZGF5LnJhbmdlO1xuICB2YXIgdXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWVrcyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbnRocyA9IHV0Y01vbnRoLnJhbmdlO1xuICB2YXIgdXRjWWVhcnMgPSB1dGNZZWFyLnJhbmdlO1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjEuMVwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnNlY29uZHMgPSBzZWNvbmRzO1xuICBleHBvcnRzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICBleHBvcnRzLmhvdXJzID0gaG91cnM7XG4gIGV4cG9ydHMuZGF5cyA9IGRheXM7XG4gIGV4cG9ydHMuc3VuZGF5cyA9IHN1bmRheXM7XG4gIGV4cG9ydHMubW9uZGF5cyA9IG1vbmRheXM7XG4gIGV4cG9ydHMudHVlc2RheXMgPSB0dWVzZGF5cztcbiAgZXhwb3J0cy53ZWRuZXNkYXlzID0gd2VkbmVzZGF5cztcbiAgZXhwb3J0cy50aHVyc2RheXMgPSB0aHVyc2RheXM7XG4gIGV4cG9ydHMuZnJpZGF5cyA9IGZyaWRheXM7XG4gIGV4cG9ydHMuc2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuICBleHBvcnRzLndlZWtzID0gd2Vla3M7XG4gIGV4cG9ydHMubW9udGhzID0gbW9udGhzO1xuICBleHBvcnRzLnllYXJzID0geWVhcnM7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmQgPSB1dGNNaWxsaXNlY29uZDtcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZHMgPSB1dGNNaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMudXRjU2Vjb25kcyA9IHV0Y1NlY29uZHM7XG4gIGV4cG9ydHMudXRjTWludXRlcyA9IHV0Y01pbnV0ZXM7XG4gIGV4cG9ydHMudXRjSG91cnMgPSB1dGNIb3VycztcbiAgZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbiAgZXhwb3J0cy51dGNTdW5kYXlzID0gdXRjU3VuZGF5cztcbiAgZXhwb3J0cy51dGNNb25kYXlzID0gdXRjTW9uZGF5cztcbiAgZXhwb3J0cy51dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXlzO1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXlzO1xuICBleHBvcnRzLnV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5cztcbiAgZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbiAgZXhwb3J0cy51dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheXM7XG4gIGV4cG9ydHMudXRjV2Vla3MgPSB1dGNXZWVrcztcbiAgZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG4gIGV4cG9ydHMudXRjWWVhcnMgPSB1dGNZZWFycztcbiAgZXhwb3J0cy5taWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICBleHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy5taW51dGUgPSBtaW51dGU7XG4gIGV4cG9ydHMuaG91ciA9IGhvdXI7XG4gIGV4cG9ydHMuZGF5ID0gZGF5O1xuICBleHBvcnRzLnN1bmRheSA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb25kYXkgPSBtb25kYXk7XG4gIGV4cG9ydHMudHVlc2RheSA9IHR1ZXNkYXk7XG4gIGV4cG9ydHMud2VkbmVzZGF5ID0gd2VkbmVzZGF5O1xuICBleHBvcnRzLnRodXJzZGF5ID0gdGh1cnNkYXk7XG4gIGV4cG9ydHMuZnJpZGF5ID0gZnJpZGF5O1xuICBleHBvcnRzLnNhdHVyZGF5ID0gc2F0dXJkYXk7XG4gIGV4cG9ydHMud2VlayA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb250aCA9IG1vbnRoO1xuICBleHBvcnRzLnllYXIgPSB5ZWFyO1xuICBleHBvcnRzLnV0Y1NlY29uZCA9IHV0Y1NlY29uZDtcbiAgZXhwb3J0cy51dGNNaW51dGUgPSB1dGNNaW51dGU7XG4gIGV4cG9ydHMudXRjSG91ciA9IHV0Y0hvdXI7XG4gIGV4cG9ydHMudXRjRGF5ID0gdXRjRGF5O1xuICBleHBvcnRzLnV0Y1N1bmRheSA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb25kYXkgPSB1dGNNb25kYXk7XG4gIGV4cG9ydHMudXRjVHVlc2RheSA9IHV0Y1R1ZXNkYXk7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG4gIGV4cG9ydHMudXRjRnJpZGF5ID0gdXRjRnJpZGF5O1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5ID0gdXRjU2F0dXJkYXk7XG4gIGV4cG9ydHMudXRjV2VlayA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuICBleHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyO1xuICBleHBvcnRzLmludGVydmFsID0gbmV3SW50ZXJ2YWw7XG5cbn0pKTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi4vdGltZScpLFxuICAgIEVQU0lMT04gPSAxZS0xNTtcblxuZnVuY3Rpb24gYmlucyhvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBkZXRlcm1pbmUgcmFuZ2VcbiAgdmFyIG1heGIgPSBvcHQubWF4YmlucyB8fCAxNSxcbiAgICAgIGJhc2UgPSBvcHQuYmFzZSB8fCAxMCxcbiAgICAgIGxvZ2IgPSBNYXRoLmxvZyhiYXNlKSxcbiAgICAgIGRpdiA9IG9wdC5kaXYgfHwgWzUsIDJdLFxuICAgICAgbWluID0gb3B0Lm1pbixcbiAgICAgIG1heCA9IG9wdC5tYXgsXG4gICAgICBzcGFuID0gbWF4IC0gbWluLFxuICAgICAgc3RlcCwgbGV2ZWwsIG1pbnN0ZXAsIHByZWNpc2lvbiwgdiwgaSwgZXBzO1xuXG4gIGlmIChvcHQuc3RlcCkge1xuICAgIC8vIGlmIHN0ZXAgc2l6ZSBpcyBleHBsaWNpdGx5IGdpdmVuLCB1c2UgdGhhdFxuICAgIHN0ZXAgPSBvcHQuc3RlcDtcbiAgfSBlbHNlIGlmIChvcHQuc3RlcHMpIHtcbiAgICAvLyBpZiBwcm92aWRlZCwgbGltaXQgY2hvaWNlIHRvIGFjY2VwdGFibGUgc3RlcCBzaXplc1xuICAgIHN0ZXAgPSBvcHQuc3RlcHNbTWF0aC5taW4oXG4gICAgICBvcHQuc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgIGJpc2VjdChvcHQuc3RlcHMsIHNwYW4vbWF4YiwgMCwgb3B0LnN0ZXBzLmxlbmd0aClcbiAgICApXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVzZSBzcGFuIHRvIGRldGVybWluZSBzdGVwIHNpemVcbiAgICBsZXZlbCA9IE1hdGguY2VpbChNYXRoLmxvZyhtYXhiKSAvIGxvZ2IpO1xuICAgIG1pbnN0ZXAgPSBvcHQubWluc3RlcCB8fCAwO1xuICAgIHN0ZXAgPSBNYXRoLm1heChcbiAgICAgIG1pbnN0ZXAsXG4gICAgICBNYXRoLnBvdyhiYXNlLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gbG9nYikgLSBsZXZlbClcbiAgICApO1xuXG4gICAgLy8gaW5jcmVhc2Ugc3RlcCBzaXplIGlmIHRvbyBtYW55IGJpbnNcbiAgICB3aGlsZSAoTWF0aC5jZWlsKHNwYW4vc3RlcCkgPiBtYXhiKSB7IHN0ZXAgKj0gYmFzZTsgfVxuXG4gICAgLy8gZGVjcmVhc2Ugc3RlcCBzaXplIGlmIGFsbG93ZWRcbiAgICBmb3IgKGk9MDsgaTxkaXYubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBzdGVwIC8gZGl2W2ldO1xuICAgICAgaWYgKHYgPj0gbWluc3RlcCAmJiBzcGFuIC8gdiA8PSBtYXhiKSBzdGVwID0gdjtcbiAgICB9XG4gIH1cblxuICAvLyB1cGRhdGUgcHJlY2lzaW9uLCBtaW4gYW5kIG1heFxuICB2ID0gTWF0aC5sb2coc3RlcCk7XG4gIHByZWNpc2lvbiA9IHYgPj0gMCA/IDAgOiB+figtdiAvIGxvZ2IpICsgMTtcbiAgZXBzID0gTWF0aC5wb3coYmFzZSwgLXByZWNpc2lvbiAtIDEpO1xuICBtaW4gPSBNYXRoLm1pbihtaW4sIE1hdGguZmxvb3IobWluIC8gc3RlcCArIGVwcykgKiBzdGVwKTtcbiAgbWF4ID0gTWF0aC5jZWlsKG1heCAvIHN0ZXApICogc3RlcDtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBtaW4sXG4gICAgc3RvcDogIG1heCxcbiAgICBzdGVwOiAgc3RlcCxcbiAgICB1bml0OiAge3ByZWNpc2lvbjogcHJlY2lzaW9ufSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpc2VjdChhLCB4LCBsbywgaGkpIHtcbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICBpZiAodXRpbC5jbXAoYVttaWRdLCB4KSA8IDApIHsgbG8gPSBtaWQgKyAxOyB9XG4gICAgZWxzZSB7IGhpID0gbWlkOyB9XG4gIH1cbiAgcmV0dXJuIGxvO1xufVxuXG5mdW5jdGlvbiB2YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnN0ZXAgKiBNYXRoLmZsb29yKHYgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gaW5kZXgodikge1xuICByZXR1cm4gTWF0aC5mbG9vcigodiAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGRhdGVfdmFsdWUodikge1xuICByZXR1cm4gdGhpcy51bml0LmRhdGUodmFsdWUuY2FsbCh0aGlzLCB2KSk7XG59XG5cbmZ1bmN0aW9uIGRhdGVfaW5kZXgodikge1xuICByZXR1cm4gaW5kZXguY2FsbCh0aGlzLCB0aGlzLnVuaXQudW5pdCh2KSk7XG59XG5cbmJpbnMuZGF0ZSA9IGZ1bmN0aW9uKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgZGF0ZSBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZmluZCB0aW1lIHN0ZXAsIHRoZW4gYmluXG4gIHZhciB1bml0cyA9IG9wdC51dGMgPyB0aW1lLnV0YyA6IHRpbWUsXG4gICAgICBkbWluID0gb3B0Lm1pbixcbiAgICAgIGRtYXggPSBvcHQubWF4LFxuICAgICAgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDIwLFxuICAgICAgbWluYiA9IG9wdC5taW5iaW5zIHx8IDQsXG4gICAgICBzcGFuID0gKCtkbWF4KSAtICgrZG1pbiksXG4gICAgICB1bml0ID0gb3B0LnVuaXQgPyB1bml0c1tvcHQudW5pdF0gOiB1bml0cy5maW5kKHNwYW4sIG1pbmIsIG1heGIpLFxuICAgICAgc3BlYyA9IGJpbnMoe1xuICAgICAgICBtaW46ICAgICB1bml0Lm1pbiAhPSBudWxsID8gdW5pdC5taW4gOiB1bml0LnVuaXQoZG1pbiksXG4gICAgICAgIG1heDogICAgIHVuaXQubWF4ICE9IG51bGwgPyB1bml0Lm1heCA6IHVuaXQudW5pdChkbWF4KSxcbiAgICAgICAgbWF4YmluczogbWF4YixcbiAgICAgICAgbWluc3RlcDogdW5pdC5taW5zdGVwLFxuICAgICAgICBzdGVwczogICB1bml0LnN0ZXBcbiAgICAgIH0pO1xuXG4gIHNwZWMudW5pdCA9IHVuaXQ7XG4gIHNwZWMuaW5kZXggPSBkYXRlX2luZGV4O1xuICBpZiAoIW9wdC5yYXcpIHNwZWMudmFsdWUgPSBkYXRlX3ZhbHVlO1xuICByZXR1cm4gc3BlYztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmlucztcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgZ2VuID0gbW9kdWxlLmV4cG9ydHM7XG5cbmdlbi5yZXBlYXQgPSBmdW5jdGlvbih2YWwsIG4pIHtcbiAgdmFyIGEgPSBBcnJheShuKSwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBhW2ldID0gdmFsO1xuICByZXR1cm4gYTtcbn07XG5cbmdlbi56ZXJvcyA9IGZ1bmN0aW9uKG4pIHtcbiAgcmV0dXJuIGdlbi5yZXBlYXQoMCwgbik7XG59O1xuXG5nZW4ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICBzdGVwID0gMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gIH1cbiAgaWYgKChzdG9wIC0gc3RhcnQpIC8gc3RlcCA9PSBJbmZpbml0eSkgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSByYW5nZScpO1xuICB2YXIgcmFuZ2UgPSBbXSwgaSA9IC0xLCBqO1xuICBpZiAoc3RlcCA8IDApIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPiBzdG9wKSByYW5nZS5wdXNoKGopO1xuICBlbHNlIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPCBzdG9wKSByYW5nZS5wdXNoKGopO1xuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5nZW4ucmFuZG9tID0ge307XG5cbmdlbi5yYW5kb20udW5pZm9ybSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgIG1heCA9IG1pbiA9PT0gdW5kZWZpbmVkID8gMSA6IG1pbjtcbiAgICBtaW4gPSAwO1xuICB9XG4gIHZhciBkID0gbWF4IC0gbWluO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaW4gKyBkICogTWF0aC5yYW5kb20oKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPj0gbWluICYmIHggPD0gbWF4KSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4IDwgbWluID8gMCA6IHggPiBtYXggPyAxIDogKHggLSBtaW4pIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBtaW4gKyBwKmQgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYiA9IGE7XG4gICAgYSA9IDA7XG4gIH1cbiAgdmFyIGQgPSBiIC0gYTtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYSArIE1hdGguZmxvb3IoZCAqIE1hdGgucmFuZG9tKCkpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA9PT0gTWF0aC5mbG9vcih4KSAmJiB4ID49IGEgJiYgeCA8IGIpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIHYgPSBNYXRoLmZsb29yKHgpO1xuICAgIHJldHVybiB2IDwgYSA/IDAgOiB2ID49IGIgPyAxIDogKHYgLSBhICsgMSkgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IGEgLSAxICsgTWF0aC5mbG9vcihwKmQpIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20ubm9ybWFsID0gZnVuY3Rpb24obWVhbiwgc3RkZXYpIHtcbiAgbWVhbiA9IG1lYW4gfHwgMDtcbiAgc3RkZXYgPSBzdGRldiB8fCAxO1xuICB2YXIgbmV4dDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgeCA9IDAsIHkgPSAwLCByZHMsIGM7XG4gICAgaWYgKG5leHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeCA9IG5leHQ7XG4gICAgICBuZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGRvIHtcbiAgICAgIHggPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHkgPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHJkcyA9IHgqeCArIHkqeTtcbiAgICB9IHdoaWxlIChyZHMgPT09IDAgfHwgcmRzID4gMSk7XG4gICAgYyA9IE1hdGguc3FydCgtMipNYXRoLmxvZyhyZHMpL3Jkcyk7IC8vIEJveC1NdWxsZXIgdHJhbnNmb3JtXG4gICAgbmV4dCA9IG1lYW4gKyB5KmMqc3RkZXY7XG4gICAgcmV0dXJuIG1lYW4gKyB4KmMqc3RkZXY7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIGV4cCA9IE1hdGguZXhwKE1hdGgucG93KHgtbWVhbiwgMikgLyAoLTIgKiBNYXRoLnBvdyhzdGRldiwgMikpKTtcbiAgICByZXR1cm4gKDEgLyAoc3RkZXYgKiBNYXRoLnNxcnQoMipNYXRoLlBJKSkpICogZXhwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIGZyb20gV2VzdCAoMjAwOSlcbiAgICAvLyBCZXR0ZXIgQXBwcm94aW1hdGlvbnMgdG8gQ3VtdWxhdGl2ZSBOb3JtYWwgRnVuY3Rpb25zXG4gICAgdmFyIGNkLFxuICAgICAgICB6ID0gKHggLSBtZWFuKSAvIHN0ZGV2LFxuICAgICAgICBaID0gTWF0aC5hYnMoeik7XG4gICAgaWYgKFogPiAzNykge1xuICAgICAgY2QgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3VtLCBleHAgPSBNYXRoLmV4cCgtWipaLzIpO1xuICAgICAgaWYgKFogPCA3LjA3MTA2NzgxMTg2NTQ3KSB7XG4gICAgICAgIHN1bSA9IDMuNTI2MjQ5NjU5OTg5MTFlLTAyICogWiArIDAuNzAwMzgzMDY0NDQzNjg4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNi4zNzM5NjIyMDM1MzE2NTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDMzLjkxMjg2NjA3ODM4MztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDExMi4wNzkyOTE0OTc4NzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjEuMjEzNTk2MTY5OTMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIwLjIwNjg2NzkxMjM3NjtcbiAgICAgICAgY2QgPSBleHAgKiBzdW07XG4gICAgICAgIHN1bSA9IDguODM4ODM0NzY0ODMxODRlLTAyICogWiArIDEuNzU1NjY3MTYzMTgyNjQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxNi4wNjQxNzc1NzkyMDc7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA4Ni43ODA3MzIyMDI5NDYxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjk2LjU2NDI0ODc3OTY3NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYzNy4zMzM2MzMzNzg4MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA3OTMuODI2NTEyNTE5OTQ4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNDQwLjQxMzczNTgyNDc1MjtcbiAgICAgICAgY2QgPSBjZCAvIHN1bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bSA9IFogKyAwLjY1O1xuICAgICAgICBzdW0gPSBaICsgNCAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDMgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAyIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMSAvIHN1bTtcbiAgICAgICAgY2QgPSBleHAgLyBzdW0gLyAyLjUwNjYyODI3NDYzMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHogPiAwID8gMSAtIGNkIDogY2Q7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIG9mIFByb2JpdCBmdW5jdGlvbiB1c2luZyBpbnZlcnNlIGVycm9yIGZ1bmN0aW9uLlxuICAgIGlmIChwIDw9IDAgfHwgcCA+PSAxKSByZXR1cm4gTmFOO1xuICAgIHZhciB4ID0gMipwIC0gMSxcbiAgICAgICAgdiA9ICg4ICogKE1hdGguUEkgLSAzKSkgLyAoMyAqIE1hdGguUEkgKiAoNC1NYXRoLlBJKSksXG4gICAgICAgIGEgPSAoMiAvIChNYXRoLlBJKnYpKSArIChNYXRoLmxvZygxIC0gTWF0aC5wb3coeCwyKSkgLyAyKSxcbiAgICAgICAgYiA9IE1hdGgubG9nKDEgLSAoeCp4KSkgLyB2LFxuICAgICAgICBzID0gKHggPiAwID8gMSA6IC0xKSAqIE1hdGguc3FydChNYXRoLnNxcnQoKGEqYSkgLSBiKSAtIGEpO1xuICAgIHJldHVybiBtZWFuICsgc3RkZXYgKiBNYXRoLlNRUlQyICogcztcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmJvb3RzdHJhcCA9IGZ1bmN0aW9uKGRvbWFpbiwgc21vb3RoKSB7XG4gIC8vIEdlbmVyYXRlcyBhIGJvb3RzdHJhcCBzYW1wbGUgZnJvbSBhIHNldCBvZiBvYnNlcnZhdGlvbnMuXG4gIC8vIFNtb290aCBib290c3RyYXBwaW5nIGFkZHMgcmFuZG9tIHplcm8tY2VudGVyZWQgbm9pc2UgdG8gdGhlIHNhbXBsZXMuXG4gIHZhciB2YWwgPSBkb21haW4uZmlsdGVyKHV0aWwuaXNWYWxpZCksXG4gICAgICBsZW4gPSB2YWwubGVuZ3RoLFxuICAgICAgZXJyID0gc21vb3RoID8gZ2VuLnJhbmRvbS5ub3JtYWwoMCwgc21vb3RoKSA6IG51bGw7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbFt+fihNYXRoLnJhbmRvbSgpKmxlbildICsgKGVyciA/IGVycigpIDogMCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59OyIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpO1xuXG52YXIgdGVtcERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGJhc2VEYXRlID0gbmV3IERhdGUoMCwgMCwgMSkuc2V0RnVsbFllYXIoMCksIC8vIEphbiAxLCAwIEFEXG4gICAgdXRjQmFzZURhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygwLCAwLCAxKSkuc2V0VVRDRnVsbFllYXIoMCk7XG5cbmZ1bmN0aW9uIGRhdGUoZCkge1xuICByZXR1cm4gKHRlbXBEYXRlLnNldFRpbWUoK2QpLCB0ZW1wRGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIHRpbWUgdW5pdCBlbnRyeVxuZnVuY3Rpb24gZW50cnkodHlwZSwgZGF0ZSwgdW5pdCwgc3RlcCwgbWluLCBtYXgpIHtcbiAgdmFyIGUgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIHVuaXQ6IHVuaXRcbiAgfTtcbiAgaWYgKHN0ZXApIHtcbiAgICBlLnN0ZXAgPSBzdGVwO1xuICB9IGVsc2Uge1xuICAgIGUubWluc3RlcCA9IDE7XG4gIH1cbiAgaWYgKG1pbiAhPSBudWxsKSBlLm1pbiA9IG1pbjtcbiAgaWYgKG1heCAhPSBudWxsKSBlLm1heCA9IG1heDtcbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0eXBlLCB1bml0LCBiYXNlLCBzdGVwLCBtaW4sIG1heCkge1xuICByZXR1cm4gZW50cnkodHlwZSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0Lm9mZnNldChiYXNlLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0LmNvdW50KGJhc2UsIGQpOyB9LFxuICAgIHN0ZXAsIG1pbiwgbWF4KTtcbn1cblxudmFyIGxvY2FsZSA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnNlY29uZCwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUubWludXRlLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS5ob3VyLCAgIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLmRheSwgICAgYmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS5tb250aCwgIGJhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUueWVhciwgICBiYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0U2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0SG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDQrZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIGQgJSAxMiwgMSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIHV0YyA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnV0Y1NlY29uZCwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUudXRjTWludXRlLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS51dGNIb3VyLCAgIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLnV0Y0RheSwgICAgdXRjQmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS51dGNNb250aCwgIHV0Y0Jhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUudXRjWWVhciwgICB1dGNCYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ1NlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDSG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDQrZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgZCAlIDEyLCAxKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIFNURVBTID0gW1xuICBbMzE1MzZlNiwgNV0sICAvLyAxLXllYXJcbiAgWzc3NzZlNiwgNF0sICAgLy8gMy1tb250aFxuICBbMjU5MmU2LCA0XSwgICAvLyAxLW1vbnRoXG4gIFsxMjA5NmU1LCAzXSwgIC8vIDItd2Vla1xuICBbNjA0OGU1LCAzXSwgICAvLyAxLXdlZWtcbiAgWzE3MjhlNSwgM10sICAgLy8gMi1kYXlcbiAgWzg2NGU1LCAzXSwgICAgLy8gMS1kYXlcbiAgWzQzMmU1LCAyXSwgICAgLy8gMTItaG91clxuICBbMjE2ZTUsIDJdLCAgICAvLyA2LWhvdXJcbiAgWzEwOGU1LCAyXSwgICAgLy8gMy1ob3VyXG4gIFszNmU1LCAyXSwgICAgIC8vIDEtaG91clxuICBbMThlNSwgMV0sICAgICAvLyAzMC1taW51dGVcbiAgWzllNSwgMV0sICAgICAgLy8gMTUtbWludXRlXG4gIFszZTUsIDFdLCAgICAgIC8vIDUtbWludXRlXG4gIFs2ZTQsIDFdLCAgICAgIC8vIDEtbWludXRlXG4gIFszZTQsIDBdLCAgICAgIC8vIDMwLXNlY29uZFxuICBbMTVlMywgMF0sICAgICAvLyAxNS1zZWNvbmRcbiAgWzVlMywgMF0sICAgICAgLy8gNS1zZWNvbmRcbiAgWzFlMywgMF0gICAgICAgLy8gMS1zZWNvbmRcbl07XG5cbmZ1bmN0aW9uIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIHN0ZXAgPSBTVEVQU1swXSwgaSwgbiwgYmlucztcblxuICBmb3IgKGk9MSwgbj1TVEVQUy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tTVEVQU1tpLTFdWzFdXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaW5zID49IG1pbmIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pdHNbU1RFUFNbbi0xXVsxXV07XG59XG5cbmZ1bmN0aW9uIHRvVW5pdE1hcCh1bml0cykge1xuICB2YXIgbWFwID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPXVuaXRzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBtYXBbdW5pdHNbaV0udHlwZV0gPSB1bml0c1tpXTtcbiAgfVxuICBtYXAuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgICByZXR1cm4gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yik7XG4gIH07XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Vbml0TWFwKGxvY2FsZSk7XG5tb2R1bGUuZXhwb3J0cy51dGMgPSB0b1VuaXRNYXAodXRjKTsiLCJ2YXIgdSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgRk5BTUUgPSAnX19uYW1lX18nO1xuXG51Lm5hbWVkZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIGYpIHsgcmV0dXJuIChmW0ZOQU1FXSA9IG5hbWUsIGYpOyB9O1xuXG51Lm5hbWUgPSBmdW5jdGlvbihmKSB7IHJldHVybiBmPT1udWxsID8gbnVsbCA6IGZbRk5BTUVdOyB9O1xuXG51LmlkZW50aXR5ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geDsgfTtcblxudS50cnVlID0gdS5uYW1lZGZ1bmMoJ3RydWUnLCBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0pO1xuXG51LmZhbHNlID0gdS5uYW1lZGZ1bmMoJ2ZhbHNlJywgZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSk7XG5cbnUuZHVwbGljYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufTtcblxudS5lcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKTtcbn07XG5cbnUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gIGZvciAodmFyIHgsIG5hbWUsIGk9MSwgbGVuPWFyZ3VtZW50cy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICB4ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAobmFtZSBpbiB4KSB7IG9ialtuYW1lXSA9IHhbbmFtZV07IH1cbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxudS5sZW5ndGggPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgeC5sZW5ndGggIT0gbnVsbCA/IHgubGVuZ3RoIDogbnVsbDtcbn07XG5cbnUua2V5cyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGtleXMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIGtleXMucHVzaChrKTtcbiAgcmV0dXJuIGtleXM7XG59O1xuXG51LnZhbHMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciB2YWxzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSB2YWxzLnB1c2goeFtrXSk7XG4gIHJldHVybiB2YWxzO1xufTtcblxudS50b01hcCA9IGZ1bmN0aW9uKGxpc3QsIGYpIHtcbiAgcmV0dXJuIChmID0gdS4kKGYpKSA/XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW2YoeCldID0gMSwgb2JqKTsgfSwge30pIDpcbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbeF0gPSAxLCBvYmopOyB9LCB7fSk7XG59O1xuXG51LmtleXN0ciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAvLyB1c2UgdG8gZW5zdXJlIGNvbnNpc3RlbnQga2V5IGdlbmVyYXRpb24gYWNyb3NzIG1vZHVsZXNcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBpZiAoIW4pIHJldHVybiAnJztcbiAgZm9yICh2YXIgcz1TdHJpbmcodmFsdWVzWzBdKSwgaT0xOyBpPG47ICsraSkge1xuICAgIHMgKz0gJ3wnICsgU3RyaW5nKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG4vLyB0eXBlIGNoZWNraW5nIGZ1bmN0aW9uc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG51LmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufTtcblxudS5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG51LmlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG51LmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudS5pc051bWJlciA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG5cbnUuaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufTtcblxudS5pc0RhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxudS5pc1ZhbGlkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iajtcbn07XG5cbnUuaXNCdWZmZXIgPSAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBCdWZmZXIuaXNCdWZmZXIpIHx8IHUuZmFsc2U7XG5cbi8vIHR5cGUgY29lcmNpb24gZnVuY3Rpb25zXG5cbnUubnVtYmVyID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6ICtzO1xufTtcblxudS5ib29sZWFuID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IHM9PT0nZmFsc2UnID8gZmFsc2UgOiAhIXM7XG59O1xuXG4vLyBwYXJzZSBhIGRhdGUgd2l0aCBvcHRpb25hbCBkMy50aW1lLWZvcm1hdCBmb3JtYXRcbnUuZGF0ZSA9IGZ1bmN0aW9uKHMsIGZvcm1hdCkge1xuICB2YXIgZCA9IGZvcm1hdCA/IGZvcm1hdCA6IERhdGU7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogZC5wYXJzZShzKTtcbn07XG5cbnUuYXJyYXkgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgPyAodS5pc0FycmF5KHgpID8geCA6IFt4XSkgOiBbXTtcbn07XG5cbnUuc3RyID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gdS5pc0FycmF5KHgpID8gJ1snICsgeC5tYXAodS5zdHIpICsgJ10nXG4gICAgOiB1LmlzT2JqZWN0KHgpIHx8IHUuaXNTdHJpbmcoeCkgP1xuICAgICAgLy8gT3V0cHV0IHZhbGlkIEpTT04gYW5kIEpTIHNvdXJjZSBzdHJpbmdzLlxuICAgICAgLy8gU2VlIGh0dHA6Ly90aW1lbGVzc3JlcG8uY29tL2pzb24taXNudC1hLWphdmFzY3JpcHQtc3Vic2V0XG4gICAgICBKU09OLnN0cmluZ2lmeSh4KS5yZXBsYWNlKCdcXHUyMDI4JywnXFxcXHUyMDI4JykucmVwbGFjZSgnXFx1MjAyOScsICdcXFxcdTIwMjknKVxuICAgIDogeDtcbn07XG5cbi8vIGRhdGEgYWNjZXNzIGZ1bmN0aW9uc1xuXG52YXIgZmllbGRfcmUgPSAvXFxbKC4qPylcXF18W14uXFxbXSsvZztcblxudS5maWVsZCA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIFN0cmluZyhmKS5tYXRjaChmaWVsZF9yZSkubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZFswXSAhPT0gJ1snID8gZCA6XG4gICAgICBkWzFdICE9PSBcIidcIiAmJiBkWzFdICE9PSAnXCInID8gZC5zbGljZSgxLCAtMSkgOlxuICAgICAgZC5zbGljZSgyLCAtMikucmVwbGFjZSgvXFxcXChbXCInXSkvZywgJyQxJyk7XG4gIH0pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgLyoganNoaW50IGV2aWw6IHRydWUgKi9cbiAgcmV0dXJuIGY9PW51bGwgfHwgdS5pc0Z1bmN0aW9uKGYpID8gZiA6XG4gICAgdS5uYW1lZGZ1bmMoZiwgRnVuY3Rpb24oJ3gnLCAncmV0dXJuIHhbJyArIHUuZmllbGQoZikubWFwKHUuc3RyKS5qb2luKCddWycpICsgJ107JykpO1xufTtcblxuLy8gc2hvcnQtY3V0IGZvciBhY2Nlc3NvclxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxuXG51LiRmdW5jID0gZnVuY3Rpb24obmFtZSwgb3ApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGYpIHtcbiAgICBmID0gdS4kKGYpIHx8IHUuaWRlbnRpdHk7XG4gICAgdmFyIG4gPSBuYW1lICsgKHUubmFtZShmKSA/ICdfJyt1Lm5hbWUoZikgOiAnJyk7XG4gICAgcmV0dXJuIHUubmFtZWRmdW5jKG4sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG9wKGYoZCkpOyB9KTtcbiAgfTtcbn07XG5cbnUuJHZhbGlkICA9IHUuJGZ1bmMoJ3ZhbGlkJywgdS5pc1ZhbGlkKTtcbnUuJGxlbmd0aCA9IHUuJGZ1bmMoJ2xlbmd0aCcsIHUubGVuZ3RoKTtcblxudS4kaW4gPSBmdW5jdGlvbihmLCB2YWx1ZXMpIHtcbiAgZiA9IHUuJChmKTtcbiAgdmFyIG1hcCA9IHUuaXNBcnJheSh2YWx1ZXMpID8gdS50b01hcCh2YWx1ZXMpIDogdmFsdWVzO1xuICByZXR1cm4gZnVuY3Rpb24oZCkgeyByZXR1cm4gISFtYXBbZihkKV07IH07XG59O1xuXG4vLyBjb21wYXJpc29uIC8gc29ydGluZyBmdW5jdGlvbnNcblxudS5jb21wYXJhdG9yID0gZnVuY3Rpb24oc29ydCkge1xuICB2YXIgc2lnbiA9IFtdO1xuICBpZiAoc29ydCA9PT0gdW5kZWZpbmVkKSBzb3J0ID0gW107XG4gIHNvcnQgPSB1LmFycmF5KHNvcnQpLm1hcChmdW5jdGlvbihmKSB7XG4gICAgdmFyIHMgPSAxO1xuICAgIGlmICAgICAgKGZbMF0gPT09ICctJykgeyBzID0gLTE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgZWxzZSBpZiAoZlswXSA9PT0gJysnKSB7IHMgPSArMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBzaWduLnB1c2gocyk7XG4gICAgcmV0dXJuIHUuYWNjZXNzb3IoZik7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBpLCBuLCBmLCBjO1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07XG4gICAgICBjID0gdS5jbXAoZihhKSwgZihiKSk7XG4gICAgICBpZiAoYykgcmV0dXJuIGMgKiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gKGEgPCBiIHx8IGEgPT0gbnVsbCkgJiYgYiAhPSBudWxsID8gLTEgOlxuICAgIChhID4gYiB8fCBiID09IG51bGwpICYmIGEgIT0gbnVsbCA/IDEgOlxuICAgICgoYiA9IGIgaW5zdGFuY2VvZiBEYXRlID8gK2IgOiBiKSxcbiAgICAgKGEgPSBhIGluc3RhbmNlb2YgRGF0ZSA/ICthIDogYSkpICE9PSBhICYmIGIgPT09IGIgPyAtMSA6XG4gICAgYiAhPT0gYiAmJiBhID09PSBhID8gMSA6IDA7XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG4vLyBwZXJtdXRlcyBhbiBhcnJheSB1c2luZyBhIEtudXRoIHNodWZmbGVcbnUucGVybXV0ZSA9IGZ1bmN0aW9uKGEpIHtcbiAgdmFyIG0gPSBhLmxlbmd0aCxcbiAgICAgIHN3YXAsXG4gICAgICBpO1xuXG4gIHdoaWxlIChtKSB7XG4gICAgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG0tLSk7XG4gICAgc3dhcCA9IGFbbV07XG4gICAgYVttXSA9IGFbaV07XG4gICAgYVtpXSA9IHN3YXA7XG4gIH1cbn07XG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxudS5wYWQgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgcGFkY2hhcikge1xuICBwYWRjaGFyID0gcGFkY2hhciB8fCBcIiBcIjtcbiAgdmFyIGQgPSBsZW5ndGggLSBzLmxlbmd0aDtcbiAgaWYgKGQgPD0gMCkgcmV0dXJuIHM7XG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gc3RycmVwKGQsIHBhZGNoYXIpICsgcztcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gc3RycmVwKE1hdGguZmxvb3IoZC8yKSwgcGFkY2hhcikgK1xuICAgICAgICAgcyArIHN0cnJlcChNYXRoLmNlaWwoZC8yKSwgcGFkY2hhcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzICsgc3RycmVwKGQsIHBhZGNoYXIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJyZXAobiwgc3RyKSB7XG4gIHZhciBzID0gXCJcIiwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBzICs9IHN0cjtcbiAgcmV0dXJuIHM7XG59XG5cbnUudHJ1bmNhdGUgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgd29yZCwgZWxsaXBzaXMpIHtcbiAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICBpZiAobGVuIDw9IGxlbmd0aCkgcmV0dXJuIHM7XG4gIGVsbGlwc2lzID0gZWxsaXBzaXMgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhlbGxpcHNpcykgOiAnXFx1MjAyNic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIiwidmFyIGpzb24gPSB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OIDogcmVxdWlyZSgnanNvbmlmeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIG9wdHMgPSB7IGNtcDogb3B0cyB9O1xuICAgIHZhciBzcGFjZSA9IG9wdHMuc3BhY2UgfHwgJyc7XG4gICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHNwYWNlID0gQXJyYXkoc3BhY2UrMSkuam9pbignICcpO1xuICAgIHZhciBjeWNsZXMgPSAodHlwZW9mIG9wdHMuY3ljbGVzID09PSAnYm9vbGVhbicpID8gb3B0cy5jeWNsZXMgOiBmYWxzZTtcbiAgICB2YXIgcmVwbGFjZXIgPSBvcHRzLnJlcGxhY2VyIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gICAgdmFyIGNtcCA9IG9wdHMuY21wICYmIChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhb2JqID0geyBrZXk6IGEsIHZhbHVlOiBub2RlW2FdIH07XG4gICAgICAgICAgICAgICAgdmFyIGJvYmogPSB7IGtleTogYiwgdmFsdWU6IG5vZGVbYl0gfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhb2JqLCBib2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSkob3B0cy5jbXApO1xuXG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN0cmluZ2lmeSAocGFyZW50LCBrZXksIG5vZGUsIGxldmVsKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzcGFjZSA/ICgnXFxuJyArIG5ldyBBcnJheShsZXZlbCArIDEpLmpvaW4oc3BhY2UpKSA6ICcnO1xuICAgICAgICB2YXIgY29sb25TZXBhcmF0b3IgPSBzcGFjZSA/ICc6ICcgOiAnOic7XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS50b0pTT04gJiYgdHlwZW9mIG5vZGUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS50b0pTT04oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSByZXBsYWNlci5jYWxsKHBhcmVudCwga2V5LCBub2RlKTtcblxuICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fCBub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbi5zdHJpbmdpZnkobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc3RyaW5naWZ5KG5vZGUsIGksIG5vZGVbaV0sIGxldmVsKzEpIHx8IGpzb24uc3RyaW5naWZ5KG51bGwpO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICddJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWVuLmluZGV4T2Yobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN5Y2xlcykgcmV0dXJuIGpzb24uc3RyaW5naWZ5KCdfX2N5Y2xlX18nKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHNlZW4ucHVzaChub2RlKTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKG5vZGUpLnNvcnQoY21wICYmIGNtcChub2RlKSk7XG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHJpbmdpZnkobm9kZSwga2V5LCBub2RlW2tleV0sIGxldmVsKzEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGpzb24uc3RyaW5naWZ5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgKyBjb2xvblNlcGFyYXRvclxuICAgICAgICAgICAgICAgICAgICArIHZhbHVlO1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChpbmRlbnQgKyBzcGFjZSArIGtleVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW4uc3BsaWNlKHNlZW4uaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gJ3snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICd9JztcbiAgICAgICAgfVxuICAgIH0pKHsgJyc6IG9iaiB9LCAnJywgb2JqLCAwKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZSB9O1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuIiwiZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5leHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuIiwidmFyIGF0LCAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgY2gsIC8vIFRoZSBjdXJyZW50IGNoYXJhY3RlclxuICAgIGVzY2FwZWUgPSB7XG4gICAgICAgICdcIic6ICAnXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAgICAgJy8nOiAgJy8nLFxuICAgICAgICBiOiAgICAnXFxiJyxcbiAgICAgICAgZjogICAgJ1xcZicsXG4gICAgICAgIG46ICAgICdcXG4nLFxuICAgICAgICByOiAgICAnXFxyJyxcbiAgICAgICAgdDogICAgJ1xcdCdcbiAgICB9LFxuICAgIHRleHQsXG5cbiAgICBlcnJvciA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIC8vIENhbGwgZXJyb3Igd2hlbiBzb21ldGhpbmcgaXMgd3JvbmcuXG4gICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIG5hbWU6ICAgICdTeW50YXhFcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICAgICAgYXQ6ICAgICAgYXQsXG4gICAgICAgICAgICB0ZXh0OiAgICB0ZXh0XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBuZXh0ID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgLy8gSWYgYSBjIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgdmVyaWZ5IHRoYXQgaXQgbWF0Y2hlcyB0aGUgY3VycmVudCBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChjICYmIGMgIT09IGNoKSB7XG4gICAgICAgICAgICBlcnJvcihcIkV4cGVjdGVkICdcIiArIGMgKyBcIicgaW5zdGVhZCBvZiAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IGNoYXJhY3Rlci4gV2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzLFxuICAgICAgICAvLyByZXR1cm4gdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgICAgXG4gICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xuICAgICAgICBhdCArPSAxO1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfSxcbiAgICBcbiAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxuICAgICAgICB2YXIgbnVtYmVyLFxuICAgICAgICAgICAgc3RyaW5nID0gJyc7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2ggPT09ICctJykge1xuICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xuICAgICAgICAgICAgbmV4dCgnLScpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnLic7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnVtYmVyID0gK3N0cmluZztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgc3RyaW5nIHZhbHVlLlxuICAgICAgICB2YXIgaGV4LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdWZmZmY7XG4gICAgICAgIFxuICAgICAgICAvLyBXaGVuIHBhcnNpbmcgZm9yIHN0cmluZyB2YWx1ZXMsIHdlIG11c3QgbG9vayBmb3IgXCIgYW5kIFxcIGNoYXJhY3RlcnMuXG4gICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAndScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXggPSBwYXJzZUludChuZXh0KCksIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGhleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gdWZmZmYgKiAxNiArIGhleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHVmZmZmKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXNjYXBlZVtjaF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xuICAgIH0sXG5cbiAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICAgIHdoaWxlIChjaCAmJiBjaCA8PSAnICcpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3b3JkID0gZnVuY3Rpb24gKCkge1xuXG4vLyB0cnVlLCBmYWxzZSwgb3IgbnVsbC5cblxuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgbmV4dCgndCcpO1xuICAgICAgICAgICAgbmV4dCgncicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgbmV4dCgnZicpO1xuICAgICAgICAgICAgbmV4dCgnYScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgncycpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIG5leHQoJ24nKTtcbiAgICAgICAgICAgIG5leHQoJ3UnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICB9LFxuXG4gICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cblxuICAgIGFycmF5ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBhcnJheSB2YWx1ZS5cblxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgICAgICAgbmV4dCgnWycpO1xuICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTsgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh2YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcbiAgICB9LFxuXG4gICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICBuZXh0KCd7Jyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDsgICAvLyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgIGtleSA9IHN0cmluZygpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgbmV4dCgnOicpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ0R1cGxpY2F0ZSBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICAgIH07XG5cbnZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIEpTT04gdmFsdWUuIEl0IGNvdWxkIGJlIGFuIG9iamVjdCwgYW4gYXJyYXksIGEgc3RyaW5nLCBhIG51bWJlcixcbi8vIG9yIGEgd29yZC5cblxuICAgIHdoaXRlKCk7XG4gICAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgJ3snOlxuICAgICAgICByZXR1cm4gb2JqZWN0KCk7XG4gICAgY2FzZSAnWyc6XG4gICAgICAgIHJldHVybiBhcnJheSgpO1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgcmV0dXJuIHN0cmluZygpO1xuICAgIGNhc2UgJy0nOlxuICAgICAgICByZXR1cm4gbnVtYmVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNoID49ICcwJyAmJiBjaCA8PSAnOScgPyBudW1iZXIoKSA6IHdvcmQoKTtcbiAgICB9XG59O1xuXG4vLyBSZXR1cm4gdGhlIGpzb25fcGFyc2UgZnVuY3Rpb24uIEl0IHdpbGwgaGF2ZSBhY2Nlc3MgdG8gYWxsIG9mIHRoZSBhYm92ZVxuLy8gZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgcmV2aXZlcikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgXG4gICAgdGV4dCA9IHNvdXJjZTtcbiAgICBhdCA9IDA7XG4gICAgY2ggPSAnICc7XG4gICAgcmVzdWx0ID0gdmFsdWUoKTtcbiAgICB3aGl0ZSgpO1xuICAgIGlmIChjaCkge1xuICAgICAgICBlcnJvcihcIlN5bnRheCBlcnJvclwiKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsXG4gICAgLy8gcGFzc2luZyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byB0aGUgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGVcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbiwgc3RhcnRpbmcgd2l0aCBhIHRlbXBvcmFyeSByb290IG9iamVjdCB0aGF0IGhvbGRzIHRoZSByZXN1bHRcbiAgICAvLyBpbiBhbiBlbXB0eSBrZXkuIElmIHRoZXJlIGlzIG5vdCBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHNpbXBseSByZXR1cm4gdGhlXG4gICAgLy8gcmVzdWx0LlxuXG4gICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID8gKGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcbiAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfSh7Jyc6IHJlc3VsdH0sICcnKSkgOiByZXN1bHQ7XG59O1xuIiwidmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBnYXAsXG4gICAgaW5kZW50LFxuICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICB9LFxuICAgIHJlcDtcblxuZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuICAgIC8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4gICAgLy8gT3RoZXJ3aXNlIHdlIG11c3QgYWxzbyByZXBsYWNlIHRoZSBvZmZlbmRpbmcgY2hhcmFjdGVycyB3aXRoIHNhZmUgZXNjYXBlXG4gICAgLy8gc2VxdWVuY2VzLlxuICAgIFxuICAgIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIGMgPT09ICdzdHJpbmcnID8gYyA6XG4gICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICB9KSArICdcIicgOiAnXCInICsgc3RyaW5nICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG4gICAgLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICBwYXJ0aWFsLFxuICAgICAgICB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgIFxuICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSk7XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuICAgIC8vIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuICAgICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiAnbnVsbCc7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4gICAgICAgICAgICAvLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlICdudWxsJy4gVGhlIGNhc2UgaXMgaW5jbHVkZWQgaGVyZSBpblxuICAgICAgICAgICAgLy8gdGhlIHJlbW90ZSBjaGFuY2UgdGhhdCB0aGlzIGdldHMgZml4ZWQgc29tZWRheS5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICAgIHBhcnRpYWwgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQXJyYXkuaXNBcnJheVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBlbGVtZW50cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLCBhbmRcbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZW0gaW4gYnJhY2tldHMuXG4gICAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ1tdJyA6IGdhcCA/XG4gICAgICAgICAgICAgICAgICAgICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nIDpcbiAgICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlXG4gICAgICAgICAgICAvLyBzdHJpbmdpZmllZC5cbiAgICAgICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAvLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4gICAgICAgIC8vIGFuZCB3cmFwIHRoZW0gaW4gYnJhY2VzLlxuXG4gICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICd7fScgOiBnYXAgP1xuICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgIHZhciBpO1xuICAgIGdhcCA9ICcnO1xuICAgIGluZGVudCA9ICcnO1xuICAgIFxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbiAgICAvLyBtYW55IHNwYWNlcy5cbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG4gICAgZWxzZSBpZiAodHlwZW9mIHNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4gICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvci5cbiAgICByZXAgPSByZXBsYWNlcjtcbiAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nXG4gICAgJiYgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHJlcGxhY2VyLmxlbmd0aCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFrZSBhIGZha2Ugcm9vdCBvYmplY3QgY29udGFpbmluZyBvdXIgdmFsdWUgdW5kZXIgdGhlIGtleSBvZiAnJy5cbiAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuICAgIHJldHVybiBzdHIoJycsIHsnJzogdmFsdWV9KTtcbn07XG4iLCJcbmV4cG9ydCBlbnVtIEFnZ3JlZ2F0ZU9wIHtcbiAgICBWQUxVRVMgPSAndmFsdWVzJyBhcyBhbnksXG4gICAgQ09VTlQgPSAnY291bnQnIGFzIGFueSxcbiAgICBWQUxJRCA9ICd2YWxpZCcgYXMgYW55LFxuICAgIE1JU1NJTkcgPSAnbWlzc2luZycgYXMgYW55LFxuICAgIERJU1RJTkNUID0gJ2Rpc3RpbmN0JyBhcyBhbnksXG4gICAgU1VNID0gJ3N1bScgYXMgYW55LFxuICAgIE1FQU4gPSAnbWVhbicgYXMgYW55LFxuICAgIEFWRVJBR0UgPSAnYXZlcmFnZScgYXMgYW55LFxuICAgIFZBUklBTkNFID0gJ3ZhcmlhbmNlJyBhcyBhbnksXG4gICAgVkFSSUFOQ0VQID0gJ3ZhcmlhbmNlcCcgYXMgYW55LFxuICAgIFNUREVWID0gJ3N0ZGV2JyBhcyBhbnksXG4gICAgU1RERVZQID0gJ3N0ZGV2cCcgYXMgYW55LFxuICAgIE1FRElBTiA9ICdtZWRpYW4nIGFzIGFueSxcbiAgICBRMSA9ICdxMScgYXMgYW55LFxuICAgIFEzID0gJ3EzJyBhcyBhbnksXG4gICAgTU9ERVNLRVcgPSAnbW9kZXNrZXcnIGFzIGFueSxcbiAgICBNSU4gPSAnbWluJyBhcyBhbnksXG4gICAgTUFYID0gJ21heCcgYXMgYW55LFxuICAgIEFSR01JTiA9ICdhcmdtaW4nIGFzIGFueSxcbiAgICBBUkdNQVggPSAnYXJnbWF4JyBhcyBhbnksXG59XG5cbmV4cG9ydCBjb25zdCBBR0dSRUdBVEVfT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLlZBTFVFUyxcbiAgICBBZ2dyZWdhdGVPcC5DT1VOVCxcbiAgICBBZ2dyZWdhdGVPcC5WQUxJRCxcbiAgICBBZ2dyZWdhdGVPcC5NSVNTSU5HLFxuICAgIEFnZ3JlZ2F0ZU9wLkRJU1RJTkNULFxuICAgIEFnZ3JlZ2F0ZU9wLlNVTSxcbiAgICBBZ2dyZWdhdGVPcC5NRUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFWRVJBR0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0VQLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWUCxcbiAgICBBZ2dyZWdhdGVPcC5NRURJQU4sXG4gICAgQWdncmVnYXRlT3AuUTEsXG4gICAgQWdncmVnYXRlT3AuUTMsXG4gICAgQWdncmVnYXRlT3AuTU9ERVNLRVcsXG4gICAgQWdncmVnYXRlT3AuTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLk1BWCxcbiAgICBBZ2dyZWdhdGVPcC5BUkdNSU4sXG4gICAgQWdncmVnYXRlT3AuQVJHTUFYLFxuXTtcblxuLyoqIEFkZGl0aXZlLWJhc2VkIGFnZ3JlZ2F0aW9uIG9wZXJhdGlvbnMuICBUaGVzZSBjYW4gYmUgYXBwbGllZCB0byBzdGFjay4gKi9cbmV4cG9ydCBjb25zdCBTVU1fT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLkNPVU5ULFxuICAgIEFnZ3JlZ2F0ZU9wLlNVTSxcbiAgICBBZ2dyZWdhdGVPcC5ESVNUSU5DVFxuXTtcblxuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLk1FQU4sXG4gICAgQWdncmVnYXRlT3AuQVZFUkFHRSxcbiAgICBBZ2dyZWdhdGVPcC5TVERFVixcbiAgICBBZ2dyZWdhdGVPcC5TVERFVlAsXG4gICAgQWdncmVnYXRlT3AuTUVESUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLlExLFxuICAgIEFnZ3JlZ2F0ZU9wLlEzLFxuICAgIEFnZ3JlZ2F0ZU9wLk1JTixcbiAgICBBZ2dyZWdhdGVPcC5NQVgsXG5dO1xuXG4vLyBUT0RPOiBtb3ZlIHN1cHBvcnRlZFR5cGVzLCBzdXBwb3J0ZWRFbnVtcyBmcm9tIHNjaGVtYSB0byBoZXJlXG4iLCJcbmV4cG9ydCBlbnVtIEF4aXNPcmllbnQge1xuICAgIFRPUCA9ICd0b3AnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXNDb25maWcge1xuICAvLyAtLS0tLS0tLS0tIEdlbmVyYWwgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGF4aXMgbGluZVxuICAgKi9cbiAgYXhpc1dpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogQSBzdHJpbmcgaW5kaWNhdGluZyBpZiB0aGUgYXhpcyAoYW5kIGFueSBncmlkbGluZXMpIHNob3VsZCBiZSBwbGFjZWQgYWJvdmUgb3IgYmVsb3cgdGhlIGRhdGEgbWFya3MuXG4gICAqL1xuICBsYXllcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQXhpcyAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBDb2xvciBvZiBheGlzIGxpbmUuXG4gICAqL1xuICBheGlzQ29sb3I/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBHcmlkIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0ZSBpZiBncmlkbGluZXMgc2hvdWxkIGJlIGNyZWF0ZWQgaW4gYWRkaXRpb24gdG8gdGlja3MuIElmIGBncmlkYCBpcyB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBST1cgYW5kIENPTC4gRm9yIFggYW5kIFksIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3IgcXVhbnRpdGF0aXZlIGFuZCB0aW1lIGZpZWxkcyBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBncmlkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29sb3Igb2YgZ3JpZGxpbmVzLlxuICAgKi9cbiAgZ3JpZENvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBncmlkIGRhc2ggYXJyYXkuXG4gICAqL1xuICBncmlkRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgb2YgZ3JpZCAodmFsdWUgYmV0d2VlbiBbMCwxXSlcbiAgICovXG4gIGdyaWRPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JpZFdpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gTGFiZWxzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIGxhYmVscy5cbiAgICovXG4gIGxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxBbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgYWxpZ25tZW50IGZvciB0aGUgTGFiZWwuXG4gICAqL1xuICBsYWJlbEFsaWduPzogc3RyaW5nO1xuICAvKipcbiAgICogVGV4dCBiYXNlbGluZSBmb3IgdGhlIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxCYXNlbGluZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRydW5jYXRlIGxhYmVscyB0aGF0IGFyZSB0b28gbG9uZy5cbiAgICogQG1pbmltdW0gMVxuICAgKi9cbiAgbGFiZWxNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIGFuZCBkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2tzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIElmIHByb3ZpZGVkLCBzZXRzIHRoZSBudW1iZXIgb2YgbWlub3IgdGlja3MgYmV0d2VlbiBtYWpvciB0aWNrcyAodGhlIHZhbHVlIDkgcmVzdWx0cyBpbiBkZWNpbWFsIHN1YmRpdmlzaW9uKS4gT25seSBhcHBsaWNhYmxlIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuXG4gICAqL1xuICBzdWJkaXZpZGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBIGRlc2lyZWQgbnVtYmVyIG9mIHRpY2tzLCBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLiBUaGUgcmVzdWx0aW5nIG51bWJlciBtYXkgYmUgZGlmZmVyZW50IHNvIHRoYXQgdmFsdWVzIGFyZSBcIm5pY2VcIiAobXVsdGlwbGVzIG9mIDIsIDUsIDEwKSBhbmQgbGllIHdpdGhpbiB0aGUgdW5kZXJseWluZyBzY2FsZSdzIHJhbmdlLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrcz86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBheGlzJ3MgdGljay5cbiAgICovXG4gIHRpY2tDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSB0aWNrIGxhYmVsLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGlja0xhYmVsQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSB0aWNrIGxhYmVsLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiBsYWJlbCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udFNpemU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBwYWRkaW5nLCBpbiBwaXhlbHMsIGJldHdlZW4gdGlja3MgYW5kIHRleHQgbGFiZWxzLlxuICAgKi9cbiAgdGlja1BhZGRpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciwgbWlub3IgYW5kIGVuZCB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemVNYWpvcj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1pbm9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1pbm9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZUVuZD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdpZHRoLCBpbiBwaXhlbHMsIG9mIHRpY2tzLlxuICAgKi9cbiAgdGlja1dpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGl0bGUgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ29sb3Igb2YgdGhlIHRpdGxlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGl0bGVDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogRm9udCBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250U2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogV2VpZ2h0IG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcblxuICAvKipcbiAgICogQSB0aXRsZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgKi9cbiAgdGl0bGVPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBNYXggbGVuZ3RoIGZvciBheGlzIHRpdGxlIGlmIHRoZSB0aXRsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBmcm9tIHRoZSBmaWVsZCdzIGRlc2NyaXB0aW9uLiBCeSBkZWZhdWx0LCB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gY2VsbCBzaXplIGFuZCBjaGFyYWN0ZXJXaWR0aCBwcm9wZXJ0eS5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGl0bGVNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDaGFyYWN0ZXIgd2lkdGggZm9yIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5pbmcgdGl0bGUgbWF4IGxlbmd0aC5cbiAgICovXG4gIGNoYXJhY3RlcldpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3RoZXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGF4aXMgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE86IHJlcGxhY2Vcbn1cblxuLy8gVE9ETzogYWRkIGNvbW1lbnQgZm9yIHByb3BlcnRpZXMgdGhhdCB3ZSByZWx5IG9uIFZlZ2EncyBkZWZhdWx0IHRvIHByb2R1Y2Vcbi8vIG1vcmUgY29uY2lzZSBWZWdhIG91dHB1dC5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBvZmZzZXQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSAwXG4gIGdyaWQ6IHVuZGVmaW5lZCwgLy8gYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXG4gIGxhYmVsczogdHJ1ZSxcbiAgbGFiZWxNYXhMZW5ndGg6IDI1LFxuICB0aWNrU2l6ZTogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDZcbiAgY2hhcmFjdGVyV2lkdGg6IDZcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBheGlzV2lkdGg6IDAsXG4gIGxhYmVsczogdHJ1ZSxcbiAgZ3JpZDogZmFsc2UsXG4gIHRpY2tTaXplOiAwXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXMgZXh0ZW5kcyBBeGlzQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQgdmFsdWUgZGV0ZXJtaW5lZCBieSBjb25maWcuZm9ybWF0IGFueXdheVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBheGlzLiBPbmUgb2YgdG9wLCBib3R0b20sIGxlZnQgb3IgcmlnaHQuIFRoZSBvcmllbnRhdGlvbiBjYW4gYmUgdXNlZCB0byBmdXJ0aGVyIHNwZWNpYWxpemUgdGhlIGF4aXMgdHlwZSAoZS5nLiwgYSB5IGF4aXMgb3JpZW50ZWQgZm9yIHRoZSByaWdodCBlZGdlIG9mIHRoZSBjaGFydCkuXG4gICAqL1xuICBvcmllbnQ/OiBBeGlzT3JpZW50O1xuICAvKipcbiAgICogQSB0aXRsZSBmb3IgdGhlIGF4aXMuIFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LlxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHZhbHVlcz86IG51bWJlcltdO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsLCBST1csIENPTFVNTiwgU0hBUEUsIFNJWkV9IGZyb20gJy4vY2hhbm5lbCc7XG5cbi8qKlxuICogQmlubmluZyBwcm9wZXJ0aWVzIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBiaW4gZGF0YSBvciBub3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmluIHtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1pbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1heD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgYmFzZSB0byB1c2UgZm9yIGF1dG9tYXRpYyBiaW4gZGV0ZXJtaW5hdGlvbiAoZGVmYXVsdCBpcyBiYXNlIDEwKS5cbiAgICovXG4gIGJhc2U/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBleGFjdCBzdGVwIHNpemUgdG8gdXNlIGJldHdlZW4gYmlucy4gSWYgcHJvdmlkZWQsIG9wdGlvbnMgc3VjaCBhcyBtYXhiaW5zIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIHN0ZXA/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbGxvd2FibGUgc3RlcCBzaXplcyB0byBjaG9vc2UgZnJvbS5cbiAgICovXG4gIHN0ZXBzPzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBBIG1pbmltdW0gYWxsb3dhYmxlIHN0ZXAgc2l6ZSAocGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgaW50ZWdlciB2YWx1ZXMpLlxuICAgKi9cbiAgbWluc3RlcD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNjYWxlIGZhY3RvcnMgaW5kaWNhdGluZyBhbGxvd2FibGUgc3ViZGl2aXNpb25zLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBbNSwgMl0sIHdoaWNoIGluZGljYXRlcyB0aGF0IGZvciBiYXNlIDEwIG51bWJlcnMgKHRoZSBkZWZhdWx0IGJhc2UpLCB0aGUgbWV0aG9kIG1heSBjb25zaWRlciBkaXZpZGluZyBiaW4gc2l6ZXMgYnkgNSBhbmQvb3IgMi4gRm9yIGV4YW1wbGUsIGZvciBhbiBpbml0aWFsIHN0ZXAgc2l6ZSBvZiAxMCwgdGhlIG1ldGhvZCBjYW4gY2hlY2sgaWYgYmluIHNpemVzIG9mIDIgKD0gMTAvNSksIDUgKD0gMTAvMiksIG9yIDEgKD0gMTAvKDUqMikpIG1pZ2h0IGFsc28gc2F0aXNmeSB0aGUgZ2l2ZW4gY29uc3RyYWludHMuXG4gICAqL1xuICBkaXY/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIE1heGltdW0gbnVtYmVyIG9mIGJpbnMuXG4gICAqIEBtaW5pbXVtIDJcbiAgICovXG4gIG1heGJpbnM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvTWF4QmlucyhjaGFubmVsOiBDaGFubmVsKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSVpFOlxuICAgICAgLy8gRmFjZXRzIGFuZCBTaXplIHNob3VsZG4ndCBoYXZlIHRvbyBtYW55IGJpbnNcbiAgICAgIC8vIFdlIGNob29zZSA2IGxpa2Ugc2hhcGUgdG8gc2ltcGxpZnkgdGhlIHJ1bGVcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIDY7IC8vIFZlZ2EncyBcInNoYXBlXCIgaGFzIDYgZGlzdGluY3QgdmFsdWVzXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAxMDtcbiAgfVxufVxuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBlbmNvZGluZyBjaGFubmVscyAoVmlzdWFsIHZhcmlhYmxlcylcbiAqIHN1Y2ggYXMgJ3gnLCAneScsICdjb2xvcicuXG4gKi9cblxuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWlucywgd2l0aG91dH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFggPSAneCcgYXMgYW55LFxuICBZID0gJ3knIGFzIGFueSxcbiAgWDIgPSAneDInIGFzIGFueSxcbiAgWTIgPSAneTInIGFzIGFueSxcbiAgUk9XID0gJ3JvdycgYXMgYW55LFxuICBDT0xVTU4gPSAnY29sdW1uJyBhcyBhbnksXG4gIFNIQVBFID0gJ3NoYXBlJyBhcyBhbnksXG4gIFNJWkUgPSAnc2l6ZScgYXMgYW55LFxuICBDT0xPUiA9ICdjb2xvcicgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgREVUQUlMID0gJ2RldGFpbCcgYXMgYW55LFxuICBMQUJFTCA9ICdsYWJlbCcgYXMgYW55LFxuICBQQVRIID0gJ3BhdGgnIGFzIGFueSxcbiAgT1JERVIgPSAnb3JkZXInIGFzIGFueSxcbiAgT1BBQ0lUWSA9ICdvcGFjaXR5JyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IFggPSBDaGFubmVsLlg7XG5leHBvcnQgY29uc3QgWSA9IENoYW5uZWwuWTtcbmV4cG9ydCBjb25zdCBYMiA9IENoYW5uZWwuWDI7XG5leHBvcnQgY29uc3QgWTIgPSBDaGFubmVsLlkyO1xuZXhwb3J0IGNvbnN0IFJPVyA9IENoYW5uZWwuUk9XO1xuZXhwb3J0IGNvbnN0IENPTFVNTiA9IENoYW5uZWwuQ09MVU1OO1xuZXhwb3J0IGNvbnN0IFNIQVBFID0gQ2hhbm5lbC5TSEFQRTtcbmV4cG9ydCBjb25zdCBTSVpFID0gQ2hhbm5lbC5TSVpFO1xuZXhwb3J0IGNvbnN0IENPTE9SID0gQ2hhbm5lbC5DT0xPUjtcbmV4cG9ydCBjb25zdCBURVhUID0gQ2hhbm5lbC5URVhUO1xuZXhwb3J0IGNvbnN0IERFVEFJTCA9IENoYW5uZWwuREVUQUlMO1xuZXhwb3J0IGNvbnN0IExBQkVMID0gQ2hhbm5lbC5MQUJFTDtcbmV4cG9ydCBjb25zdCBQQVRIID0gQ2hhbm5lbC5QQVRIO1xuZXhwb3J0IGNvbnN0IE9SREVSID0gQ2hhbm5lbC5PUkRFUjtcbmV4cG9ydCBjb25zdCBPUEFDSVRZID0gQ2hhbm5lbC5PUEFDSVRZO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTFMgPSBbWCwgWSwgWDIsIFkyLCBST1csIENPTFVNTiwgU0laRSwgU0hBUEUsIENPTE9SLCBQQVRILCBPUkRFUiwgT1BBQ0lUWSwgVEVYVCwgREVUQUlMLCBMQUJFTF07XG5cbmV4cG9ydCBjb25zdCBVTklUX0NIQU5ORUxTID0gd2l0aG91dChDSEFOTkVMUywgW1JPVywgQ09MVU1OXSk7XG5leHBvcnQgY29uc3QgVU5JVF9TQ0FMRV9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9DSEFOTkVMUywgW1BBVEgsIE9SREVSLCBERVRBSUwsIFRFWFQsIExBQkVMLCBYMiwgWTJdKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbWCwgWSwgWDIsIFkyXSk7XG5leHBvcnQgY29uc3QgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9TQ0FMRV9DSEFOTkVMUywgW1gsIFksIFgyLCBZMl0pO1xuXG4vKiogQ2hhbm5lbHMgdGhhdCBjYW4gc2VydmUgYXMgZ3JvdXBpbmdzIGZvciBzdGFja2VkIGNoYXJ0cy4gKi9cbmV4cG9ydCBjb25zdCBTVEFDS19HUk9VUF9DSEFOTkVMUyA9IFtDT0xPUiwgREVUQUlMLCBPUkRFUiwgT1BBQ0lUWSwgU0laRV07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkTWFyayB7XG4gIHBvaW50PzogYm9vbGVhbjtcbiAgdGljaz86IGJvb2xlYW47XG4gIHJ1bGU/OiBib29sZWFuO1xuICBjaXJjbGU/OiBib29sZWFuO1xuICBzcXVhcmU/OiBib29sZWFuO1xuICBiYXI/OiBib29sZWFuO1xuICBsaW5lPzogYm9vbGVhbjtcbiAgYXJlYT86IGJvb2xlYW47XG4gIHRleHQ/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgYSBwYXJ0aWN1bGFyIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsICBjaGFubmVsIG5hbWVcbiAqIEBwYXJhbSBtYXJrIHRoZSBtYXJrIHR5cGVcbiAqIEByZXR1cm4gd2hldGhlciB0aGUgbWFyayBzdXBwb3J0cyB0aGUgY2hhbm5lbFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydE1hcmsoY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyaykge1xuICByZXR1cm4gISFnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWwpW21hcmtdO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGRpY3Rpb25hcnkgc2hvd2luZyB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbFxuICogQHJldHVybiBBIGRpY3Rpb25hcnkgbWFwcGluZyBtYXJrIHR5cGVzIHRvIGJvb2xlYW4gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsOiBDaGFubmVsKTogU3VwcG9ydGVkTWFyayB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIERFVEFJTDpcbiAgICBjYXNlIE9SREVSOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7IC8vIGFsbCBtYXJrc1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgbGluZTogdHJ1ZSwgYXJlYTogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFgyOlxuICAgIGNhc2UgWTI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBydWxlOiB0cnVlLCBiYXI6IHRydWUsIGFyZWE6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIHJ1bGU6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cG9pbnQ6IHRydWV9O1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7dGV4dDogdHJ1ZX07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtsaW5lOiB0cnVlfTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkUm9sZSB7XG4gIG1lYXN1cmU6IGJvb2xlYW47XG4gIGRpbWVuc2lvbjogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGRpbWVuc2lvbiAvIG1lYXN1cmUgcm9sZVxuICogQHBhcmFtICBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIHJvbGUgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRSb2xlKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRSb2xlIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIExBQkVMOlxuICAgIGNhc2UgREVUQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgWDI6XG4gICAgY2FzZSBZMjpcbiAgICBjYXNlIFNJWkU6XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiBmYWxzZVxuICAgICAgfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBlbmNvZGluZyBjaGFubmVsJyArIGNoYW5uZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gIWNvbnRhaW5zKFtERVRBSUwsIFBBVEgsIFRFWFQsIExBQkVMLCBPUkRFUl0sIGNoYW5uZWwpO1xufVxuIiwiaW1wb3J0IHtBeGlzT3JpZW50fSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZERlZlRpdGxlLCBpc0RpbWVuc2lvbn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBrZXlzLCBleHRlbmQsIHRydW5jYXRlLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdBeGlzfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7bnVtYmVyRm9ybWF0LCB0aW1lVGVtcGxhdGV9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSBsZXQgZXhwb3J0cztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpc0NvbXBvbmVudChtb2RlbDogTW9kZWwsIGF4aXNDaGFubmVsczogQ2hhbm5lbFtdKTogRGljdDxWZ0F4aXM+IHtcbiAgcmV0dXJuIGF4aXNDaGFubmVscy5yZWR1Y2UoZnVuY3Rpb24oYXhpcywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBheGlzW2NoYW5uZWxdID0gcGFyc2VBeGlzKGNoYW5uZWwsIG1vZGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGF4aXM7XG4gIH0sIHt9IGFzIERpY3Q8VmdBeGlzPik7XG59XG5cbi8qKlxuICogTWFrZSBhbiBpbm5lciBheGlzIGZvciBzaG93aW5nIGdyaWQgZm9yIHNoYXJlZCBheGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbm5lckF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGRpbmcgdGlja3MgYXMgd2VsbFxuXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IHdpdGggVmVnYSBBeGlzIEludGVyZmFjZVxuICBsZXQgZGVmOiBhbnkgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKGNoYW5uZWwpLFxuICAgIGdyaWQ6IHRydWUsXG4gICAgdGlja1NpemU6IDAsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbGFiZWxzOiB7XG4gICAgICAgIHRleHQ6IHt2YWx1ZTogJyd9XG4gICAgICB9LFxuICAgICAgYXhpczoge1xuICAgICAgICBzdHJva2U6IHt2YWx1ZTogJ3RyYW5zcGFyZW50J31cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgWydsYXllcicsICd0aWNrcycsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgLy8gRm9yIG5vdywgb25seSBuZWVkIHRvIGFkZCBncmlkIHByb3BlcnRpZXMgaGVyZSBiZWNhdXNlIGlubmVyQXhpcyBpcyBvbmx5IGZvciByZW5kZXJpbmcgZ3JpZC5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGQgb3RoZXIgcHJvcGVydGllcyBmb3IgaW5uZXJBeGlzXG4gIFsnZ3JpZCddLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbClcbiAgfTtcblxuICAvLyAxLjIuIEFkZCBwcm9wZXJ0aWVzXG4gIFtcbiAgICAvLyBhKSBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlcyAoc28gaXQgaGFzIGF4aXNbcHJvcGVydHldIG1ldGhvZHMpIC0tIGNhbGwgcnVsZSBmdW5jdGlvbnNcbiAgICAnZm9ybWF0JywgJ2dyaWQnLCAnbGF5ZXInLCAnb2Zmc2V0JywgJ29yaWVudCcsICd0aWNrU2l6ZScsICd0aWNrcycsICd0aWNrU2l6ZUVuZCcsICd0aXRsZScsICd0aXRsZU9mZnNldCcsXG4gICAgLy8gYikgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzLCBvbmx5IHByb2R1Y2UgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIHNjaGVtYSwgb3IgZXhwbGljaXQgdmFsdWUgaWYgc3BlY2lmaWVkXG4gICAgJ3RpY2tQYWRkaW5nJywgJ3RpY2tTaXplJywgJ3RpY2tTaXplTWFqb3InLCAndGlja1NpemVNaW5vcicsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBsZXQgbWV0aG9kOiAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWY6YW55KT0+YW55O1xuXG4gICAgY29uc3QgdmFsdWUgPSAobWV0aG9kID0gZXhwb3J0c1twcm9wZXJ0eV0pID9cbiAgICAgICAgICAgICAgICAgIC8vIGNhbGxpbmcgYXhpcy5mb3JtYXQsIGF4aXMuZ3JpZCwgLi4uXG4gICAgICAgICAgICAgICAgICBtZXRob2QobW9kZWwsIGNoYW5uZWwsIGRlZikgOlxuICAgICAgICAgICAgICAgICAgYXhpc1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gbW9kZWwuYXhpcyhjaGFubmVsKS5wcm9wZXJ0aWVzIHx8IHt9O1xuXG4gIFtcbiAgICAnYXhpcycsICdsYWJlbHMnLCAvLyBoYXZlIHNwZWNpYWwgcnVsZXNcbiAgICAnZ3JpZCcsICd0aXRsZScsICd0aWNrcycsICdtYWpvclRpY2tzJywgJ21pbm9yVGlja3MnIC8vIG9ubHkgZGVmYXVsdCB2YWx1ZXNcbiAgXS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW2dyb3VwXSA/XG4gICAgICBwcm9wZXJ0aWVzW2dyb3VwXShtb2RlbCwgY2hhbm5lbCwgcHJvcHNbZ3JvdXBdIHx8IHt9LCBkZWYpIDpcbiAgICAgIHByb3BzW2dyb3VwXTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbnVtYmVyRm9ybWF0KG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLCBtb2RlbC5heGlzKGNoYW5uZWwpLmZvcm1hdCwgbW9kZWwuY29uZmlnKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5vZmZzZXQ7XG59XG5cbi8vIFRPRE86IHdlIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBtZXRob2QgYWZ0ZXIgd2UgdGFrZSBjYXJlIG9mIGNvbmZpZyByZWZhY3RvcmluZ1xuLyoqXG4gKiBEZWZhdWx0IHJ1bGVzIGZvciB3aGV0aGVyIHRvIHNob3cgYSBncmlkIHNob3VsZCBiZSBzaG93biBmb3IgYSBjaGFubmVsLlxuICogSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIG9yZGluYWwgc2NhbGVzIHRoYXQgYXJlIG5vdCBiaW5uZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRTaG93KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBncmlkID0gbW9kZWwuYXhpcyhjaGFubmVsKS5ncmlkO1xuICBpZiAoZ3JpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICByZXR1cm4gIW1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIG5ldmVyIGFwcGx5IGdyaWQgZm9yIFJPVyBhbmQgQ09MVU1OIHNpbmNlIHdlIG1hbnVhbGx5IGNyZWF0ZSBydWxlLWdyb3VwIGZvciB0aGVtXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBncmlkU2hvdyhtb2RlbCwgY2hhbm5lbCkgJiYgKFxuICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBjbGVhbmx5IC0tIGVzc2VudGlhbGx5IHRoZSBjb25kaXRpb24gYmVsb3cgaXMgd2hldGhlclxuICAgIC8vIHRoZSBheGlzIGlzIGEgc2hhcmVkIC8gdW5pb24gYXhpcy5cbiAgICAoY2hhbm5lbCA9PT0gWSB8fCBjaGFubmVsID09PSBYKSAmJiAhKG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmKSB7XG4gIGNvbnN0IGxheWVyID0gbW9kZWwuYXhpcyhjaGFubmVsKS5sYXllcjtcbiAgaWYgKGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgaWYgKGRlZi5ncmlkKSB7XG4gICAgLy8gaWYgZ3JpZCBpcyB0cnVlLCBuZWVkIHRvIHB1dCBsYXllciBvbiB0aGUgYmFjayBzbyB0aGF0IGdyaWQgaXMgYmVoaW5kIG1hcmtzXG4gICAgcmV0dXJuICdiYWNrJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBvdGhlcndpc2UgcmV0dXJuIHVuZGVmaW5lZCBhbmQgdXNlIFZlZ2EncyBkZWZhdWx0LlxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgb3JpZW50ID0gbW9kZWwuYXhpcyhjaGFubmVsKS5vcmllbnQ7XG4gIGlmIChvcmllbnQpIHtcbiAgICByZXR1cm4gb3JpZW50O1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIEZJWE1FIHRlc3QgYW5kIGRlY2lkZVxuICAgIHJldHVybiBBeGlzT3JpZW50LlRPUDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tzID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrcztcbiAgaWYgKHRpY2tzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICAvLyBGSVhNRSBkZXBlbmRzIG9uIHNjYWxlIHR5cGUgdG9vXG4gIGlmIChjaGFubmVsID09PSBYICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW4pIHtcbiAgICAvLyBWZWdhJ3MgZGVmYXVsdCB0aWNrcyBvZnRlbiBsZWFkIHRvIGEgbG90IG9mIGxhYmVsIG9jY2x1c2lvbiBvbiBYIHdpdGhvdXQgOTAgZGVncmVlIHJvdGF0aW9uXG4gICAgcmV0dXJuIDU7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZTtcbiAgaWYgKHRpY2tTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja1NpemU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTaXplRW5kKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCB0aWNrU2l6ZUVuZCA9IG1vZGVsLmF4aXMoY2hhbm5lbCkudGlja1NpemVFbmQ7XG4gIGlmICh0aWNrU2l6ZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGlja1NpemVFbmQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICBpZiAoYXhpcy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGF4aXMudGl0bGU7XG4gIH1cblxuICAvLyBpZiBub3QgZGVmaW5lZCwgYXV0b21hdGljYWxseSBkZXRlcm1pbmUgYXhpcyB0aXRsZSBmcm9tIGZpZWxkIGRlZlxuICBjb25zdCBmaWVsZFRpdGxlID0gZmllbGREZWZUaXRsZShtb2RlbC5maWVsZERlZihjaGFubmVsKSk7XG5cbiAgbGV0IG1heExlbmd0aDtcbiAgaWYgKGF4aXMudGl0bGVNYXhMZW5ndGgpIHtcbiAgICBtYXhMZW5ndGggPSBheGlzLnRpdGxlTWF4TGVuZ3RoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFgpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB4XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLyBtb2RlbC5heGlzKFgpLmNoYXJhY3RlcldpZHRoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFkgJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFkpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB5XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0IC8gbW9kZWwuYXhpcyhZKS5jaGFyYWN0ZXJXaWR0aDtcbiAgfVxuXG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVPZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpdGxlT2Zmc2V0ID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aXRsZU9mZnNldDtcbiAgaWYgKHRpdGxlT2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aXRsZU9mZnNldDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLmF4aXNDb2xvciAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgeyBzdHJva2U6IHt2YWx1ZTogYXhpcy5heGlzQ29sb3J9IH0gOlxuICAgICAgICB7fSxcbiAgICAgIGF4aXMuYXhpc1dpZHRoICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMuYXhpc1dpZHRofSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZ3JpZFByb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuZ3JpZENvbG9yICE9PSB1bmRlZmluZWQgPyB7IHN0cm9rZToge3ZhbHVlOiBheGlzLmdyaWRDb2xvcn19IDoge30sXG4gICAgICBheGlzLmdyaWRPcGFjaXR5ICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlT3BhY2l0eToge3ZhbHVlOiBheGlzLmdyaWRPcGFjaXR5fSB9IDoge30sXG4gICAgICBheGlzLmdyaWRXaWR0aCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZVdpZHRoIDoge3ZhbHVlOiBheGlzLmdyaWRXaWR0aH0gfSA6IHt9LFxuICAgICAgYXhpcy5ncmlkRGFzaCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZURhc2hPZmZzZXQgOiB7dmFsdWU6IGF4aXMuZ3JpZERhc2h9IH0gOiB7fSxcbiAgICAgIGdyaWRQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGxhYmVsc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBpZiAoIWF4aXMubGFiZWxzKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBpZiAoY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSAmJiBheGlzLmxhYmVsTWF4TGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPIHJlcGxhY2UgdGhpcyB3aXRoIFZlZ2EncyBsYWJlbE1heExlbmd0aCBvbmNlIGl0IGlzIGludHJvZHVjZWRcbiAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bS5kYXRhIHwgdHJ1bmNhdGU6JyArIGF4aXMubGFiZWxNYXhMZW5ndGggKyAnIH19J1xuICAgICAgICB9XG4gICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHRlbXBsYXRlOiB0aW1lVGVtcGxhdGUoJ2RhdHVtLmRhdGEnLCBmaWVsZERlZi50aW1lVW5pdCwgYXhpcy5mb3JtYXQsIGF4aXMuc2hvcnRUaW1lTGFiZWxzLCBjb25maWcpXG4gICAgICAgIH1cbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIC8vIExhYmVsIEFuZ2xlXG4gICAgaWYgKGF4aXMubGFiZWxBbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiBheGlzLmxhYmVsQW5nbGV9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdXRvIHJvdGF0ZSBmb3IgWCBhbmQgUm93XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gWCAmJiAoaXNEaW1lbnNpb24oZmllbGREZWYpIHx8IGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSkge1xuICAgICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiAyNzB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQWxpZ24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogYXhpcy5sYWJlbEFsaWdufTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXV0byBzZXQgYWxpZ24gaWYgcm90YXRlZFxuICAgICAgLy8gVE9ETzogY29uc2lkZXIgb3RoZXIgdmFsdWUgYmVzaWRlcyAyNzAsIDkwXG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZWYub3JpZW50ID09PSAndG9wJyA/ICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICBkZWYudHlwZSA9PT0gJ3gnID8gJ3JpZ2h0JyA6XG4gICAgICAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogJ2NlbnRlcid9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGFiZWxCYXNlbGluZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmJhc2VsaW5lID0ge3ZhbHVlOiBheGlzLmxhYmVsQmFzZWxpbmV9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICAvLyBBdXRvIHNldCBiYXNlbGluZSBpZiByb3RhdGVkXG4gICAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogZGVmLnR5cGUgPT09ICd4JyA/ICdtaWRkbGUnIDogJ2JvdHRvbSd9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogJ2JvdHRvbSd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLnN0cm9rZSA9IHt2YWx1ZTogYXhpcy50aWNrTGFiZWxDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsRm9udCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuZm9udCA9IHt2YWx1ZTogYXhpcy50aWNrTGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAoYXhpcy50aWNrTGFiZWxGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuZm9udFNpemUgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsRm9udFNpemV9O1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzKGxhYmVsc1NwZWMpLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IGxhYmVsc1NwZWM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCB0aWNrc1Byb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMudGlja0NvbG9yICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlIDoge3ZhbHVlOiBheGlzLnRpY2tDb2xvcn0gfSA6IHt9LFxuICAgICAgYXhpcy50aWNrV2lkdGggIT09IHVuZGVmaW5lZCA/IHtzdHJva2VXaWR0aDoge3ZhbHVlOiBheGlzLnRpY2tXaWR0aH0gfSA6IHt9LFxuICAgICAgdGlja3NQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgdGl0bGVQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLnRpdGxlQ29sb3IgIT09IHVuZGVmaW5lZCA/IHtzdHJva2UgOiB7dmFsdWU6IGF4aXMudGl0bGVDb2xvcn0gfSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCA/IHtmb250OiB7dmFsdWU6IGF4aXMudGl0bGVGb250fX0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkID8ge2ZvbnRTaXplOiB7dmFsdWU6IGF4aXMudGl0bGVGb250U2l6ZX19IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkID8ge2ZvbnRXZWlnaHQ6IHt2YWx1ZTogYXhpcy50aXRsZUZvbnRXZWlnaHR9fSA6IHt9LFxuXG4gICAgICB0aXRsZVByb3BzU3BlYyB8fCB7fVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q09MT1IsIE9QQUNJVFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZCwgT3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NvcnRPcmRlcn0gZnJvbSAnLi4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQgeyB1bmlvbn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3RlbXBsYXRlIGFzIHRpbWVVbml0VGVtcGxhdGV9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtTcGVjLCBpc1VuaXRTcGVjLCBpc0ZhY2V0U3BlYywgaXNMYXllclNwZWN9IGZyb20gJy4uL3NwZWMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKHNwZWM6IFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKTogTW9kZWwge1xuICBpZiAoaXNGYWNldFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IEZhY2V0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzTGF5ZXJTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBMYXllck1vZGVsKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcbiAgfVxuXG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBVbml0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcignSW52YWxpZCBzcGVjLicpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gVE9ETzogZmlndXJlIGlmIHdlIHJlYWxseSBuZWVkIG9wYWNpdHkgaW4gYm90aFxuZXhwb3J0IGNvbnN0IFNUUk9LRV9DT05GSUcgPSBbJ3N0cm9rZScsICdzdHJva2VXaWR0aCcsXG4gICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnLCAnc3Ryb2tlT3BhY2l0eScsICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eScsXG4gICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX1NUUk9LRV9DT05GSUcgPSB1bmlvbihTVFJPS0VfQ09ORklHLCBGSUxMX0NPTkZJRyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuICBjb25zdCBjb2xvckZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICBjb25zdCBvcGFjaXR5RmllbGREZWYgPSBtb2RlbC5maWVsZERlZihPUEFDSVRZKTtcblxuICAvLyBBcHBseSBmaWxsIHN0cm9rZSBjb25maWcgZmlyc3Qgc28gdGhhdCBjb2xvciBmaWVsZCAvIHZhbHVlIGNhbiBvdmVycmlkZVxuICAvLyBmaWxsIC8gc3Ryb2tlXG4gIGlmIChmaWxsZWQpIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIEZJTExfQ09ORklHKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFNUUk9LRV9DT05GSUcpO1xuICB9XG5cbiAgbGV0IGNvbG9yVmFsdWU7XG4gIGxldCBvcGFjaXR5VmFsdWU7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgY29sb3JWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBjb2xvckZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChjb2xvckZpZWxkRGVmICYmIGNvbG9yRmllbGREZWYudmFsdWUpIHtcbiAgICBjb2xvclZhbHVlID0geyB2YWx1ZTogY29sb3JGaWVsZERlZi52YWx1ZSB9O1xuICB9XG5cbiAgaWYgKG1vZGVsLmhhcyhPUEFDSVRZKSkge1xuICAgIG9wYWNpdHlWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoT1BBQ0lUWSwgb3BhY2l0eUZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChvcGFjaXR5RmllbGREZWYgJiYgb3BhY2l0eUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgb3BhY2l0eVZhbHVlID0geyB2YWx1ZTogb3BhY2l0eUZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAoY29sb3JWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgcC5maWxsID0gY29sb3JWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2UgPSBjb2xvclZhbHVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWdcbiAgICBwW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsuY29sb3J9O1xuICB9XG5cbiAgaWYgKG9wYWNpdHlWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcC5vcGFjaXR5ID0gb3BhY2l0eVZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbmZpZyhwcm9wZXJ0aWVzLCBjb25maWcsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcHJvcHNMaXN0LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0geyB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWFya0NvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsOiBVbml0TW9kZWwsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGFwcGx5Q29uZmlnKG1hcmtzUHJvcGVydGllcywgbW9kZWwuY29uZmlnKCkubWFyaywgcHJvcHNMaXN0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG51bWJlciBmb3JtYXQgZm9yIGEgZmllbGREZWZcbiAqXG4gKiBAcGFyYW0gZm9ybWF0IGV4cGxpY2l0bHkgc3BlY2lmaWVkIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyRm9ybWF0KGZpZWxkRGVmOiBGaWVsZERlZiwgZm9ybWF0OiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKSB7XG4gIGlmIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikge1xuICAgIC8vIGFkZCBudW1iZXIgZm9ybWF0IGZvciBxdWFudGl0YXRpdmUgdHlwZSBvbmx5XG4gICAgLy8gVE9ETzogbmVlZCB0byBtYWtlIHRoaXMgd29yayBjb3JyZWN0bHkgZm9yIG51bWVyaWMgb3JkaW5hbCAvIG5vbWluYWwgdHlwZVxuICAgIHJldHVybiBmb3JtYXQgfHwgY29uZmlnLm51bWJlckZvcm1hdDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKiogUmV0dXJuIGZpZWxkIHJlZmVyZW5jZSB3aXRoIHBvdGVudGlhbCBcIi1cIiBwcmVmaXggZm9yIGRlc2NlbmRpbmcgc29ydCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRGaWVsZChvcmRlckNoYW5uZWxEZWY6IE9yZGVyQ2hhbm5lbERlZikge1xuICByZXR1cm4gKG9yZGVyQ2hhbm5lbERlZi5zb3J0ID09PSBTb3J0T3JkZXIuREVTQ0VORElORyA/ICctJyA6ICcnKSArXG4gICAgZmllbGQob3JkZXJDaGFubmVsRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aW1lIHRlbXBsYXRlIHVzZWQgZm9yIGF4aXMvbGVnZW5kIGxhYmVscyBvciB0ZXh0IG1hcmsgZm9yIGEgdGVtcG9yYWwgZmllbGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVUZW1wbGF0ZSh0ZW1wbGF0ZUZpZWxkOiBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCwgZm9ybWF0OiBzdHJpbmcsIHNob3J0VGltZUxhYmVsczogYm9vbGVhbiwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0IHx8IGZvcm1hdCkge1xuICAgIC8vIElmIHRoZXJlIGlzIG5vdCB0aW1lIHVuaXQsIG9yIGlmIHVzZXIgZXhwbGljaXRseSBzcGVjaWZ5IGZvcm1hdCBmb3IgYXhpcy9sZWdlbmQvdGV4dC5cbiAgICBjb25zdCBfZm9ybWF0ID0gZm9ybWF0IHx8IGNvbmZpZy50aW1lRm9ybWF0OyAvLyBvbmx5IHVzZSBjb25maWcudGltZUZvcm1hdCBpZiB0aGVyZSBpcyBubyB0aW1lVW5pdC5cbiAgICByZXR1cm4gJ3t7JyArIHRlbXBsYXRlRmllbGQgKyAnIHwgdGltZTpcXCcnICsgX2Zvcm1hdCArICdcXCd9fSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpbWVVbml0VGVtcGxhdGUodGltZVVuaXQsIHRlbXBsYXRlRmllbGQsIHNob3J0VGltZUxhYmVscyk7XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGZvciBjb21waWxpbmcgVmVnYS1saXRlIHNwZWMgaW50byBWZWdhIHNwZWMuXG4gKi9cblxuaW1wb3J0IHtMQVlPVVR9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge25vcm1hbGl6ZSwgRXh0ZW5kZWRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKGlucHV0U3BlYzogRXh0ZW5kZWRTcGVjKSB7XG4gIC8vIDEuIENvbnZlcnQgaW5wdXQgc3BlYyBpbnRvIGEgbm9ybWFsIGZvcm1cbiAgLy8gKERlY29tcG9zZSBhbGwgZXh0ZW5kZWQgdW5pdCBzcGVjcyBpbnRvIGNvbXBvc2l0aW9uIG9mIHVuaXQgc3BlYy4pXG4gIGNvbnN0IHNwZWMgPSBub3JtYWxpemUoaW5wdXRTcGVjKTtcblxuICAvLyAyLiBJbnN0YW50aWF0ZSB0aGUgbW9kZWwgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXNcbiAgY29uc3QgbW9kZWwgPSBidWlsZE1vZGVsKHNwZWMsIG51bGwsICcnKTtcblxuICAvLyAzLiBQYXJzZSBlYWNoIHBhcnQgb2YgdGhlIG1vZGVsIHRvIHByb2R1Y2UgY29tcG9uZW50cyB0aGF0IHdpbGwgYmUgYXNzZW1ibGVkIGxhdGVyXG4gIC8vIFdlIHRyYXZlcnNlIHRoZSB3aG9sZSB0cmVlIHRvIHBhcnNlIG9uY2UgZm9yIGVhY2ggdHlwZSBvZiBjb21wb25lbnRzXG4gIC8vIChlLmcuLCBkYXRhLCBsYXlvdXQsIG1hcmssIHNjYWxlKS5cbiAgLy8gUGxlYXNlIHNlZSBpbnNpZGUgbW9kZWwucGFyc2UoKSBmb3Igb3JkZXIgZm9yIGNvbXBpbGF0aW9uLlxuICBtb2RlbC5wYXJzZSgpO1xuXG4gIC8vIDQuIEFzc2VtYmxlIGEgVmVnYSBTcGVjIGZyb20gdGhlIHBhcnNlZCBjb21wb25lbnRzIGluIDMuXG4gIHJldHVybiBhc3NlbWJsZShtb2RlbCk7XG59XG5cbmZ1bmN0aW9uIGFzc2VtYmxlKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAvLyBUT0RPOiBjaGFuZ2UgdHlwZSB0byBiZWNvbWUgVmdTcGVjXG4gIGNvbnN0IG91dHB1dCA9IGV4dGVuZChcbiAgICB7XG4gICAgICAvLyBTZXQgc2l6ZSB0byAxIGJlY2F1c2Ugd2UgcmVseSBvbiBwYWRkaW5nIGFueXdheVxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBwYWRkaW5nOiAnYXV0bydcbiAgICB9LFxuICAgIGNvbmZpZy52aWV3cG9ydCA/IHsgdmlld3BvcnQ6IGNvbmZpZy52aWV3cG9ydCB9IDoge30sXG4gICAgY29uZmlnLmJhY2tncm91bmQgPyB7IGJhY2tncm91bmQ6IGNvbmZpZy5iYWNrZ3JvdW5kIH0gOiB7fSxcbiAgICB7XG4gICAgICAvLyBUT0RPOiBzaWduYWw6IG1vZGVsLmFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsXG4gICAgICBkYXRhOiBbXS5jb25jYXQoXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlRGF0YShbXSksXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlTGF5b3V0KFtdKVxuICAgICAgICAvLyBUT0RPOiBtb2RlbC5hc3NlbWJsZVNlbGVjdGlvbkRhdGFcbiAgICAgICksXG4gICAgICBtYXJrczogW2Fzc2VtYmxlUm9vdEdyb3VwKG1vZGVsKV1cbiAgICB9KTtcblxuICByZXR1cm4ge1xuICAgIHNwZWM6IG91dHB1dFxuICAgIC8vIFRPRE86IGFkZCB3YXJuaW5nIC8gZXJyb3JzIGhlcmVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlUm9vdEdyb3VwKG1vZGVsOiBNb2RlbCkge1xuICBsZXQgcm9vdEdyb3VwOmFueSA9IGV4dGVuZCh7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb290JyksXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIH0sXG4gICAgbW9kZWwuZGVzY3JpcHRpb24oKSA/IHtkZXNjcmlwdGlvbjogbW9kZWwuZGVzY3JpcHRpb24oKX0gOiB7fSxcbiAgICB7XG4gICAgICBmcm9tOiB7ZGF0YTogTEFZT1VUfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiBleHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgd2lkdGg6IHtmaWVsZDogJ3dpZHRoJ30sXG4gICAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDogJ2hlaWdodCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbC5hc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhtb2RlbC5jb25maWcoKS5jZWxsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGV4dGVuZChyb290R3JvdXAsIG1vZGVsLmFzc2VtYmxlR3JvdXAoKSk7XG59XG4iLCJpbXBvcnQge1gsIERFVEFJTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7aXNBZ2dyZWdhdGUsIGhhc30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QVJFQSwgUE9JTlQsIExJTkUsIFRJQ0ssIENJUkNMRSwgU1FVQVJFLCBSVUxFLCBNYXJrfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQXVnbWVudCBjb25maWcubWFyayB3aXRoIHJ1bGUtYmFzZWQgZGVmYXVsdCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0TWFya0NvbmZpZyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKSB7XG4gICByZXR1cm4gZXh0ZW5kKFxuICAgICBbJ2ZpbGxlZCcsICdvcGFjaXR5JywgJ29yaWVudCcsICdhbGlnbiddLnJlZHVjZShmdW5jdGlvbihjZmcsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZy5tYXJrW3Byb3BlcnR5XTtcbiAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICBjYXNlICdmaWxsZWQnOlxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgIC8vIFBvaW50LCBsaW5lLCBhbmQgcnVsZSBhcmUgbm90IGZpbGxlZCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IG1hcmsgIT09IFBPSU5UICYmIG1hcmsgIT09IExJTkUgJiYgbWFyayAhPT0gUlVMRTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5zKFtQT0lOVCwgVElDSywgQ0lSQ0xFLCBTUVVBUkVdLCBtYXJrKSkge1xuICAgICAgICAgICAgICAvLyBwb2ludC1iYXNlZCBtYXJrcyBhbmQgYmFyXG4gICAgICAgICAgICAgIGlmICghaXNBZ2dyZWdhdGUoZW5jb2RpbmcpIHx8IGhhcyhlbmNvZGluZywgREVUQUlMKSkge1xuICAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAwLjc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXJrID09PSBBUkVBKSB7XG4gICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAwLjc7IC8vIGluc3BpcmVkIGJ5IFRhYmxlYXVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgJ29yaWVudCc6XG4gICAgICAgICAgIGNvbnN0IHhJc01lYXN1cmUgPSBpc01lYXN1cmUoZW5jb2RpbmcueCkgfHwgaXNNZWFzdXJlKGVuY29kaW5nLngyKTtcbiAgICAgICAgICAgY29uc3QgeUlzTWVhc3VyZSA9IGlzTWVhc3VyZShlbmNvZGluZy55KSB8fCBpc01lYXN1cmUoZW5jb2RpbmcueTIpO1xuXG4gICAgICAgICAgIC8vIFdoZW4gdW5hbWJpZ3VvdXMsIGRvIG5vdCBhbGxvdyBvdmVycmlkaW5nXG4gICAgICAgICAgIGlmICh4SXNNZWFzdXJlICYmICF5SXNNZWFzdXJlKSB7XG4gICAgICAgICAgICAgaWYgKG1hcmsgPT09IFRJQ0spIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAndmVydGljYWwnO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gJ2hvcml6b250YWwnO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSBlbHNlIGlmICgheElzTWVhc3VyZSAmJiB5SXNNZWFzdXJlKSB7XG4gICAgICAgICAgICAgaWYgKG1hcmsgPT09IFRJQ0spIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSAndmVydGljYWwnO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIC8vIEluIGFtYmlndW91cyBjYXNlcyAoUXhRIG9yIE94TykgdXNlIHNwZWNpZmllZCB2YWx1ZVxuICAgICAgICAgICAvLyAoYW5kIGltcGxpY2l0bHkgdmVydGljYWwgYnkgZGVmYXVsdC4pXG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgLy8gdGV4dC1vbmx5XG4gICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBoYXMoZW5jb2RpbmcsIFgpID8gJ2NlbnRlcicgOiAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGNmZztcbiAgICAgfSwge30pLFxuICAgICBjb25maWcubWFya1xuICAgKTtcbn1cbiIsImltcG9ydCB7YXV0b01heEJpbnN9IGZyb20gJy4uLy4uL2Jpbic7XG5pbXBvcnQge0NoYW5uZWwsIENPTE9SfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7ZmllbGQsIEZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgZmxhdHRlbiwgaGFzaCwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBiaW4ge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PFZnVHJhbnNmb3JtW10+IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGJpbkNvbXBvbmVudCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBjb25zdCBiaW4gPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG4gICAgICBpZiAoYmluKSB7XG4gICAgICAgIGxldCBiaW5UcmFucyA9IGV4dGVuZCh7XG4gICAgICAgICAgdHlwZTogJ2JpbicsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkRGVmLmZpZWxkLFxuICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgc3RhcnQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgICBtaWQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pLFxuICAgICAgICAgICAgZW5kOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgICAvLyBpZiBiaW4gaXMgYW4gb2JqZWN0LCBsb2FkIHBhcmFtZXRlciBoZXJlIVxuICAgICAgICAgIHR5cGVvZiBiaW4gPT09ICdib29sZWFuJyA/IHt9IDogYmluXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFiaW5UcmFucy5tYXhiaW5zICYmICFiaW5UcmFucy5zdGVwKSB7XG4gICAgICAgICAgLy8gaWYgYm90aCBtYXhiaW5zIGFuZCBzdGVwIGFyZSBub3Qgc3BlY2lmaWVkLCBuZWVkIHRvIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lIGJpblxuICAgICAgICAgIGJpblRyYW5zLm1heGJpbnMgPSBhdXRvTWF4QmlucyhjaGFubmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IFtiaW5UcmFuc107XG4gICAgICAgIGNvbnN0IGlzT3JkaW5hbENvbG9yID0gbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgfHwgY2hhbm5lbCA9PT0gQ09MT1I7XG4gICAgICAgIC8vIGNvbG9yIHJhbXAgaGFzIHR5cGUgbGluZWFyIG9yIHRpbWVcbiAgICAgICAgaWYgKGlzT3JkaW5hbENvbG9yKSB7XG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSksXG4gICAgICAgICAgICBleHByOiBmaWVsZChmaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSArXG4gICAgICAgICAgICAnICsgXFwnLVxcJyArICcgK1xuICAgICAgICAgICAgZmllbGQoZmllbGREZWYsIHsgZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRklYTUU6IGN1cnJlbnQgbWVyZ2luZyBsb2dpYyBjYW4gcHJvZHVjZSByZWR1bmRhbnQgdHJhbnNmb3JtcyB3aGVuIGEgZmllbGQgaXMgYmlubmVkIGZvciBjb2xvciBhbmQgZm9yIG5vbi1jb2xvclxuICAgICAgICBjb25zdCBrZXkgPSBoYXNoKGJpbikgKyAnXycgKyBmaWVsZERlZi5maWVsZCArICdvYzonICsgaXNPcmRpbmFsQ29sb3I7XG4gICAgICAgIGJpbkNvbXBvbmVudFtrZXldID0gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgYmluQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBGSVhNRTogY3VycmVudCBtZXJnaW5nIGxvZ2ljIGNhbiBwcm9kdWNlIHJlZHVuZGFudCB0cmFuc2Zvcm1zIHdoZW4gYSBmaWVsZCBpcyBiaW5uZWQgZm9yIGNvbG9yIGFuZCBmb3Igbm9uLWNvbG9yXG4gICAgICBleHRlbmQoYmluQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuYmluKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuYmluO1xuICAgIH1cbiAgICByZXR1cm4gYmluQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgYmluQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKGJpbkNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmJpbik7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuYmluO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKGNvbXBvbmVudC5iaW4pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDT0xPUn0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09SRElOQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGZsYXR0ZW4sIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuLyoqXG4gKiBXZSBuZWVkIHRvIGFkZCBhIHJhbmsgdHJhbnNmb3JtIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGUgcmFuayB2YWx1ZSBhc1xuICogaW5wdXQgZm9yIGNvbG9yIHJhbXAncyBsaW5lYXIgc2NhbGUuXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgY29sb3JSYW5rIHtcbiAgLyoqXG4gICAqIFJldHVybiBoYXNoIGRpY3QgZnJvbSBhIGNvbG9yIGZpZWxkJ3MgbmFtZSB0byB0aGUgc29ydCBhbmQgcmFuayB0cmFuc2Zvcm1zXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBNb2RlbCkge1xuICAgIGxldCBjb2xvclJhbmtDb21wb25lbnQ6IERpY3Q8VmdUcmFuc2Zvcm1bXT4gPSB7fTtcbiAgICBpZiAobW9kZWwuaGFzKENPTE9SKSAmJiBtb2RlbC5maWVsZERlZihDT0xPUikudHlwZSA9PT0gT1JESU5BTCkge1xuICAgICAgY29sb3JSYW5rQ29tcG9uZW50W21vZGVsLmZpZWxkKENPTE9SKV0gPSBbe1xuICAgICAgICB0eXBlOiAnc29ydCcsXG4gICAgICAgIGJ5OiBtb2RlbC5maWVsZChDT0xPUilcbiAgICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ3JhbmsnLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICByYW5rOiBtb2RlbC5maWVsZChDT0xPUiwgeyBwcmVmbjogJ3JhbmtfJyB9KVxuICAgICAgICB9XG4gICAgICB9XTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIGNvbnNpZGVyIG1lcmdpbmdcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIFRPRE86IHdlIGhhdmUgdG8gc2VlIGlmIGNvbG9yIGhhcyB1bmlvbiBzY2FsZSBoZXJlXG5cbiAgICAgIC8vIEZvciBub3csIGxldCdzIGFzc3VtZSBpdCBhbHdheXMgaGFzIHVuaW9uIHNjYWxlXG4gICAgICBjb25zdCBjb2xvclJhbmtDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbms7XG4gICAgICByZXR1cm4gY29sb3JSYW5rQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgRGljdDxWZ1RyYW5zZm9ybVtdPjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGNvbG9yUmFua0NvbXBvbmVudCA9IHt9IGFzIERpY3Q8VmdUcmFuc2Zvcm1bXT47XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgICBleHRlbmQoY29sb3JSYW5rQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbms7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sb3JSYW5rQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBmbGF0dGVuKHZhbHMoY29tcG9uZW50LmNvbG9yUmFuaykpO1xuICB9XG59XG4iLCJpbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uLy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2tleXMsIERpY3QsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLy4uL3VuaXQnO1xuXG5pbXBvcnQge3NvdXJjZX0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHtmb3JtYXRQYXJzZX0gZnJvbSAnLi9mb3JtYXRwYXJzZSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7bm9uUG9zaXRpdmVGaWx0ZXJ9IGZyb20gJy4vbm9ucG9zaXRpdmVudWxsZmlsdGVyJztcbmltcG9ydCB7c3VtbWFyeX0gZnJvbSAnLi9zdW1tYXJ5JztcbmltcG9ydCB7c3RhY2tTY2FsZX0gZnJvbSAnLi9zdGFja3NjYWxlJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHt0aW1lVW5pdERvbWFpbn0gZnJvbSAnLi90aW1ldW5pdGRvbWFpbic7XG5pbXBvcnQge2NvbG9yUmFua30gZnJvbSAnLi9jb2xvcnJhbmsnO1xuXG5cbi8qKlxuICogQ29tcG9zYWJsZSBjb21wb25lbnQgaW5zdGFuY2Ugb2YgYSBtb2RlbCdzIGRhdGEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUNvbXBvbmVudCB7XG4gIHNvdXJjZTogVmdEYXRhO1xuXG4gIC8qKiBNYXBwaW5nIGZyb20gZmllbGQgbmFtZSB0byBwcmltaXRpdmUgZGF0YSB0eXBlLiAgKi9cbiAgZm9ybWF0UGFyc2U6IERpY3Q8c3RyaW5nPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiBmaWVsZHMgZm9yIG51bGwgZmlsdGVyaW5nICovXG4gIG51bGxGaWx0ZXI6IERpY3Q8Ym9vbGVhbj47XG5cbiAgLyoqIEhhc2hzZXQgb2YgYSBmb3JtdWxhIG9iamVjdCAqL1xuICBjYWxjdWxhdGU6IERpY3Q8Rm9ybXVsYT47XG5cbiAgLyoqIEZpbHRlciB0ZXN0IGV4cHJlc3Npb24gKi9cbiAgZmlsdGVyOiBzdHJpbmc7XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBhIGJpbiBwYXJhbWV0ZXIgaGFzaCB0byB0cmFuc2Zvcm1zIG9mIHRoZSBiaW5uZWQgZmllbGQgKi9cbiAgYmluOiBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYW4gb3V0cHV0IGZpZWxkIG5hbWUgKGhhc2gpIHRvIHRoZSB0aW1lIHVuaXQgdHJhbnNmb3JtICAqL1xuICB0aW1lVW5pdDogRGljdDxWZ1RyYW5zZm9ybT47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgZmllbGRzIHRvIGJlIGZpbHRlcmVkICovXG4gIG5vblBvc2l0aXZlRmlsdGVyOiBEaWN0PGJvb2xlYW4+O1xuXG4gIC8qKiBEYXRhIHNvdXJjZSBmb3IgZmVlZGluZyBzdGFja2VkIHNjYWxlLiAqL1xuICAvLyBUT0RPOiBuZWVkIHRvIHJldmlzZSBpZiBzaW5nbGUgVmdEYXRhIGlzIHN1ZmZpY2llbnQgd2l0aCBsYXllciAvIGNvbmNhdFxuICBzdGFja1NjYWxlOiBWZ0RhdGE7XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBhbiBvdXRwdXQgZmllbGQgbmFtZSAoaGFzaCkgdG8gdGhlIHNvcnQgYW5kIHJhbmsgdHJhbnNmb3JtcyAgKi9cbiAgY29sb3JSYW5rOiBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIHRpbWUgdW5pdHMgdGhhdCBuZWVkIHRoZWlyIG93biBkYXRhIHNvdXJjZXMgZm9yIHNjYWxlIGRvbWFpbiAqL1xuICB0aW1lVW5pdERvbWFpbjogU3RyaW5nU2V0O1xuXG4gIC8qKiBBcnJheSBvZiBzdW1tYXJ5IGNvbXBvbmVudCBvYmplY3QgZm9yIHByb2R1Y2luZyBzdW1tYXJ5IChhZ2dyZWdhdGUpIGRhdGEgc291cmNlICovXG4gIHN1bW1hcnk6IFN1bW1hcnlDb21wb25lbnRbXTtcbn1cblxuLyoqXG4gKiBDb21wb3NhYmxlIGNvbXBvbmVudCBmb3IgYSBtb2RlbCdzIHN1bW1hcnkgZGF0YVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN1bW1hcnlDb21wb25lbnQge1xuICAvKiogTmFtZSBvZiB0aGUgc3VtbWFyeSBkYXRhIHNvdXJjZSAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFN0cmluZyBzZXQgZm9yIGFsbCBkaW1lbnNpb24gZmllbGRzICAqL1xuICBkaW1lbnNpb25zOiBTdHJpbmdTZXQ7XG5cbiAgLyoqIGRpY3Rpb25hcnkgbWFwcGluZyBmaWVsZCBuYW1lIHRvIHN0cmluZyBzZXQgb2YgYWdncmVnYXRlIG9wcyAqL1xuICBtZWFzdXJlczogRGljdDxTdHJpbmdTZXQ+O1xufVxuXG4vLyBUT0RPOiBzcGxpdCB0aGlzIGZpbGUgaW50byBtdWx0aXBsZSBmaWxlcyBhbmQgcmVtb3ZlIHRoaXMgbGludGVyIGZsYWdcbi8qIHRzbGludDpkaXNhYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0RGF0YShtb2RlbDogVW5pdE1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgZm9ybWF0UGFyc2U6IGZvcm1hdFBhcnNlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlVW5pdChtb2RlbCksXG4gICAgbm9uUG9zaXRpdmVGaWx0ZXI6IG5vblBvc2l0aXZlRmlsdGVyLnBhcnNlVW5pdChtb2RlbCksXG5cbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGJpbjogYmluLnBhcnNlVW5pdChtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlVW5pdChtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlVW5pdChtb2RlbCksXG4gICAgdGltZVVuaXREb21haW46IHRpbWVVbml0RG9tYWluLnBhcnNlVW5pdChtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VVbml0KG1vZGVsKSxcbiAgICBjb2xvclJhbms6IGNvbG9yUmFuay5wYXJzZVVuaXQobW9kZWwpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0RGF0YShtb2RlbDogRmFjZXRNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBudWxsRmlsdGVyOiBudWxsRmlsdGVyLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcblxuICAgIHNvdXJjZTogc291cmNlLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGJpbjogYmluLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICB0aW1lVW5pdDogdGltZVVuaXQucGFyc2VGYWNldChtb2RlbCksXG4gICAgdGltZVVuaXREb21haW46IHRpbWVVbml0RG9tYWluLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VGYWNldChtb2RlbCksXG4gICAgc3RhY2tTY2FsZTogc3RhY2tTY2FsZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBjb2xvclJhbms6IGNvbG9yUmFuay5wYXJzZUZhY2V0KG1vZGVsKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllckRhdGEobW9kZWw6IExheWVyTW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICAvLyBmaWx0ZXIgYW5kIGZvcm1hdFBhcnNlIGNvdWxkIGNhdXNlIHVzIHRvIG5vdCBiZSBhYmxlIHRvIG1lcmdlIGludG8gcGFyZW50XG4gICAgLy8gc28gbGV0J3MgcGFyc2UgdGhlbSBmaXJzdFxuICAgIGZpbHRlcjogZmlsdGVyLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBudWxsRmlsdGVyOiBudWxsRmlsdGVyLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcblxuICAgIC8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgaGVyZSBkb2VzIG5vdCBhZmZlY3Qgd2hldGhlciB3ZSBjYW4gbWVyZ2UgY2hpbGQgZGF0YSBpbnRvIHBhcmVudCBvciBub3RcbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VMYXllcihtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VMYXllcihtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VMYXllcihtb2RlbClcbiAgfTtcbn1cblxuXG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuXG4vKipcbiAqIENyZWF0ZXMgVmVnYSBEYXRhIGFycmF5IGZyb20gYSBnaXZlbiBjb21waWxlZCBtb2RlbCBhbmQgYXBwZW5kIGFsbCBvZiB0aGVtIHRvIHRoZSBnaXZlbiBhcnJheVxuICpcbiAqIEBwYXJhbSAgbW9kZWxcbiAqIEBwYXJhbSAgZGF0YSBhcnJheVxuICogQHJldHVybiBtb2RpZmllZCBkYXRhIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZURhdGEobW9kZWw6IE1vZGVsLCBkYXRhOiBWZ0RhdGFbXSkge1xuICBjb25zdCBjb21wb25lbnQgPSBtb2RlbC5jb21wb25lbnQuZGF0YTtcblxuICBjb25zdCBzb3VyY2VEYXRhID0gc291cmNlLmFzc2VtYmxlKG1vZGVsLCBjb21wb25lbnQpO1xuICBpZiAoc291cmNlRGF0YSkge1xuICAgIGRhdGEucHVzaChzb3VyY2VEYXRhKTtcbiAgfVxuXG4gIHN1bW1hcnkuYXNzZW1ibGUoY29tcG9uZW50LCBtb2RlbCkuZm9yRWFjaChmdW5jdGlvbihzdW1tYXJ5RGF0YSkge1xuICAgIGRhdGEucHVzaChzdW1tYXJ5RGF0YSk7XG4gIH0pO1xuXG4gIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkYXRhVGFibGUgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG5cbiAgICAvLyBjb2xvciByYW5rXG4gICAgY29uc3QgY29sb3JSYW5rVHJhbnNmb3JtID0gY29sb3JSYW5rLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gICAgaWYgKGNvbG9yUmFua1RyYW5zZm9ybS5sZW5ndGggPiAwKSB7XG4gICAgICBkYXRhVGFibGUudHJhbnNmb3JtID0gKGRhdGFUYWJsZS50cmFuc2Zvcm0gfHwgW10pLmNvbmNhdChjb2xvclJhbmtUcmFuc2Zvcm0pO1xuICAgIH1cblxuICAgIC8vIG5vblBvc2l0aXZlRmlsdGVyXG4gICAgY29uc3Qgbm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0gPSBub25Qb3NpdGl2ZUZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpO1xuICAgIGlmIChub25Qb3NpdGl2ZUZpbHRlclRyYW5zZm9ybS5sZW5ndGggPiAwKSB7XG4gICAgICBkYXRhVGFibGUudHJhbnNmb3JtID0gKGRhdGFUYWJsZS50cmFuc2Zvcm0gfHwgW10pLmNvbmNhdChub25Qb3NpdGl2ZUZpbHRlclRyYW5zZm9ybSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChrZXlzKGNvbXBvbmVudC5jb2xvclJhbmspLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2xvclJhbmsgbm90IG1lcmdlZCcpO1xuICAgIH0gZWxzZSBpZiAoa2V5cyhjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBub25Qb3NpdGl2ZUZpbHRlciBub3QgbWVyZ2VkJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhY2tcbiAgLy8gVE9ETzogcmV2aXNlIGlmIHRoaXMgYWN0dWFsbHkgc2hvdWxkIGJlIGFuIGFycmF5XG4gIGNvbnN0IHN0YWNrRGF0YSA9IHN0YWNrU2NhbGUuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgaWYgKHN0YWNrRGF0YSkge1xuICAgIGRhdGEucHVzaChzdGFja0RhdGEpO1xuICB9XG5cbiAgdGltZVVuaXREb21haW4uYXNzZW1ibGUoY29tcG9uZW50KS5mb3JFYWNoKGZ1bmN0aW9uKHRpbWVVbml0RG9tYWluRGF0YSkge1xuICAgIGRhdGEucHVzaCh0aW1lVW5pdERvbWFpbkRhdGEpO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBmaWx0ZXIge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiBtb2RlbC50cmFuc2Zvcm0oKS5maWx0ZXI7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgZmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlIGJ1dCBoYXMgZmlsdGVyLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIpIHtcbiAgICAgIC8vIG1lcmdlIGJ5IGFkZGluZyAmJlxuICAgICAgZmlsdGVyQ29tcG9uZW50ID1cbiAgICAgICAgKGZpbHRlckNvbXBvbmVudCA/IGZpbHRlckNvbXBvbmVudCArICcgJiYgJyA6ICcnKSArXG4gICAgICAgIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgYGZpbHRlci5wYXJzZUxheWVyYCBtZXRob2QgaXMgY2FsbGVkIGJlZm9yZSBgc291cmNlLnBhcnNlTGF5ZXJgXG4gICAgbGV0IGZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIgPT09IGZpbHRlckNvbXBvbmVudCkge1xuICAgICAgICAvLyBzYW1lIGZpbHRlciBpbiBjaGlsZCBzbyB3ZSBjYW4ganVzdCBkZWxldGUgaXRcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBjb21wb25lbnQuZmlsdGVyO1xuICAgIHJldHVybiBmaWx0ZXIgPyBbe1xuICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICB0ZXN0OiBmaWx0ZXJcbiAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0ZpZWxkRGVmLCBpc0NvdW50fSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybWF0UGFyc2Uge1xuICAvLyBUT0RPOiBuZWVkIHRvIHRha2UgY2FsY3VsYXRlIGludG8gYWNjb3VudCBhY3Jvc3MgbGV2ZWxzIHdoZW4gbWVyZ2luZ1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PHN0cmluZz4ge1xuICAgIGNvbnN0IGNhbGNGaWVsZE1hcCA9IChtb2RlbC50cmFuc2Zvcm0oKS5jYWxjdWxhdGUgfHwgW10pLnJlZHVjZShmdW5jdGlvbihmaWVsZE1hcCwgZm9ybXVsYSkge1xuICAgICAgZmllbGRNYXBbZm9ybXVsYS5maWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZpZWxkTWFwO1xuICAgIH0sIHt9KTtcblxuICAgIGxldCBwYXJzZUNvbXBvbmVudDogRGljdDxzdHJpbmc+ID0ge307XG4gICAgLy8gdXNlIGZvckVhY2ggcmF0aGVyIHRoYW4gcmVkdWNlIHNvIHRoYXQgaXQgY2FuIHJldHVybiB1bmRlZmluZWRcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBwYXJzZSBuZWVkZWRcbiAgICBtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIGlmIChpc0NvdW50KGZpZWxkRGVmKSB8fCBjYWxjRmllbGRNYXBbZmllbGREZWYuZmllbGRdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdudW1iZXInO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCBidXQgaGFzIGl0cyBvd24gcGFyc2UsIHRoZW4gbWVyZ2VcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgIGV4dGVuZChwYXJzZUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSwgcGFyc2VDb21wb25lbnQpKSB7XG4gICAgICAgIC8vIG1lcmdlIHBhcnNlIHVwIGlmIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGFuIGluY29tcGF0aWJsZSBwYXJzZVxuICAgICAgICBleHRlbmQocGFyc2VDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlQ29tcG9uZW50O1xuICB9XG5cbiAgLy8gQXNzZW1ibGUgZm9yIGZvcm1hdFBhcnNlIGlzIGFuIGlkZW50aXR5IGZ1bmN0aW9uLCBubyBuZWVkIHRvIGRlY2xhcmVcbn1cbiIsImltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBoYXNoLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybXVsYSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8Rm9ybXVsYT4ge1xuICAgIHJldHVybiAobW9kZWwudHJhbnNmb3JtKCkuY2FsY3VsYXRlIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oZm9ybXVsYUNvbXBvbmVudCwgZm9ybXVsYSkge1xuICAgICAgZm9ybXVsYUNvbXBvbmVudFtoYXNoKGZvcm11bGEpXSA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PEZvcm11bGE+KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQoZm9ybXVsYUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZSk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpIHtcbiAgICAgICAgZXh0ZW5kKGZvcm11bGFDb21wb25lbnQgfHwge30sIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gdmFscyhjb21wb25lbnQuY2FsY3VsYXRlKS5yZWR1Y2UoZnVuY3Rpb24odHJhbnNmb3JtLCBmb3JtdWxhKSB7XG4gICAgICB0cmFuc2Zvcm0ucHVzaChleHRlbmQoeyB0eXBlOiAnZm9ybXVsYScgfSwgZm9ybXVsYSkpO1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIEZpbHRlciBub24tcG9zaXRpdmUgdmFsdWUgZm9yIGxvZyBzY2FsZVxuICovXG5leHBvcnQgbmFtZXNwYWNlIG5vblBvc2l0aXZlRmlsdGVyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpOiBEaWN0PGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbW9kZWwuY2hhbm5lbHMoKS5yZWR1Y2UoZnVuY3Rpb24obm9uUG9zaXRpdmVDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICBpZiAoIW1vZGVsLmZpZWxkKGNoYW5uZWwpIHx8ICFzY2FsZSkge1xuICAgICAgICAvLyBkb24ndCBzZXQgYW55dGhpbmdcbiAgICAgICAgcmV0dXJuIG5vblBvc2l0aXZlQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgbm9uUG9zaXRpdmVDb21wb25lbnRbbW9kZWwuZmllbGQoY2hhbm5lbCldID0gc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLkxPRztcbiAgICAgIHJldHVybiBub25Qb3NpdGl2ZUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PGJvb2xlYW4+KTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIGNvbnNpZGVyIG1lcmdpbmdcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIEZvciBub3csIGxldCdzIGFzc3VtZSBpdCBhbHdheXMgaGFzIHVuaW9uIHNjYWxlXG4gICAgICBjb25zdCBub25Qb3NpdGl2ZUZpbHRlckNvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICByZXR1cm4gbm9uUG9zaXRpdmVGaWx0ZXJDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBEaWN0PGJvb2xlYW4+O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBub3RlIHRoYXQgd2UgcnVuIHRoaXMgYmVmb3JlIHNvdXJjZS5wYXJzZUxheWVyXG4gICAgbGV0IG5vblBvc2l0aXZlRmlsdGVyID0ge30gYXMgRGljdDxib29sZWFuPjtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpICYmICFkaWZmZXIoY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyLCBub25Qb3NpdGl2ZUZpbHRlcikpIHtcbiAgICAgICAgZXh0ZW5kKG5vblBvc2l0aXZlRmlsdGVyLCBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vblBvc2l0aXZlRmlsdGVyO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBrZXlzKGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gT25seSBmaWx0ZXIgZmllbGRzIChrZXlzKSB3aXRoIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcltmaWVsZF07XG4gICAgfSkubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogJ2RhdHVtLicgKyBmaWVsZCArICcgPiAwJ1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3QgREVGQVVMVF9OVUxMX0ZJTFRFUlMgPSB7XG4gIG5vbWluYWw6IGZhbHNlLFxuICBvcmRpbmFsOiBmYWxzZSxcbiAgcXVhbnRpdGF0aXZlOiB0cnVlLFxuICB0ZW1wb3JhbDogdHJ1ZVxufTtcblxuZXhwb3J0IG5hbWVzcGFjZSBudWxsRmlsdGVyIHtcbiAgLyoqIFJldHVybiBIYXNoc2V0IG9mIGZpZWxkcyBmb3IgbnVsbCBmaWx0ZXJpbmcgKGtleT1maWVsZCwgdmFsdWUgPSB0cnVlKS4gKi9cbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgY29uc3QgZmlsdGVyTnVsbCA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlck51bGw7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihhZ2dyZWdhdG9yLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWx0ZXJOdWxsIHx8XG4gICAgICAgIChmaWx0ZXJOdWxsID09PSB1bmRlZmluZWQgJiYgZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQgIT09ICcqJyAmJiBERUZBVUxUX05VTExfRklMVEVSU1tmaWVsZERlZi50eXBlXSkpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmaW5lIHRoaXMgc28gd2Uga25vdyB0aGF0IHdlIGRvbid0IGZpbHRlciBudWxscyBmb3IgdGhpcyBmaWVsZFxuICAgICAgICAvLyB0aGlzIG1ha2VzIGl0IGVhc2llciB0byBtZXJnZSBpbnRvIHBhcmVudHNcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuXG4gICAgLy8gRklYTUU6IG51bGwgZmlsdGVycyBhcmUgbm90IHByb3Blcmx5IHByb3BhZ2F0ZWQgcmlnaHQgbm93XG4gICAgbGV0IG51bGxGaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyLCBudWxsRmlsdGVyQ29tcG9uZW50KSkge1xuICAgICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKiBDb252ZXJ0IHRoZSBoYXNoc2V0IG9mIGZpZWxkcyB0byBhIGZpbHRlciB0cmFuc2Zvcm0uICAqL1xuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgY29uc3QgZmlsdGVyZWRGaWVsZHMgPSBrZXlzKGNvbXBvbmVudC5udWxsRmlsdGVyKS5maWx0ZXIoKGZpZWxkKSA9PiB7XG4gICAgICAvLyBvbmx5IGluY2x1ZGUgZmllbGRzIHRoYXQgaGFzIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5udWxsRmlsdGVyW2ZpZWxkXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRGaWVsZHMubGVuZ3RoID4gMCA/XG4gICAgICBbe1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogZmlsdGVyZWRGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkTmFtZSkge1xuICAgICAgICAgIHJldHVybiAnKGRhdHVtLicgKyBmaWVsZE5hbWUgKyAnIT09bnVsbCcgK1xuICAgICAgICAgICAgJyAmJiAhaXNOYU4oZGF0dW0uJysgZmllbGROYW1lICsgJykpJztcbiAgICAgICAgfSkuam9pbignICYmICcpXG4gICAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0RhdGFGb3JtYXQsIFNPVVJDRX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHNvdXJjZSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFZnRGF0YSB7XG4gICAgbGV0IGRhdGEgPSBtb2RlbC5kYXRhKCk7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBleHBsaWNpdGx5IHByb3ZpZGVkXG5cbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSB7IG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkgfTtcbiAgICAgIGlmIChkYXRhLnZhbHVlcyAmJiBkYXRhLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNvdXJjZURhdGEudmFsdWVzID0gbW9kZWwuZGF0YSgpLnZhbHVlcztcbiAgICAgICAgc291cmNlRGF0YS5mb3JtYXQgPSB7IHR5cGU6ICdqc29uJyB9O1xuICAgICAgfSBlbHNlIGlmIChkYXRhLnVybCkge1xuICAgICAgICBzb3VyY2VEYXRhLnVybCA9IGRhdGEudXJsO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgZXh0ZW5zaW9uIGZyb20gVVJMIHVzaW5nIHNuaXBwZXQgZnJvbVxuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzY4MDkyOS9ob3ctdG8tZXh0cmFjdC1leHRlbnNpb24tZnJvbS1maWxlbmFtZS1zdHJpbmctaW4tamF2YXNjcmlwdFxuICAgICAgICBsZXQgZGVmYXVsdEV4dGVuc2lvbiA9IC8oPzpcXC4oW14uXSspKT8kLy5leGVjKHNvdXJjZURhdGEudXJsKVsxXTtcbiAgICAgICAgaWYgKCFjb250YWlucyhbJ2pzb24nLCAnY3N2JywgJ3RzdicsICd0b3BvanNvbiddLCBkZWZhdWx0RXh0ZW5zaW9uKSkge1xuICAgICAgICAgIGRlZmF1bHRFeHRlbnNpb24gPSAnanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YUZvcm1hdDogRGF0YUZvcm1hdCA9IG1vZGVsLmRhdGEoKS5mb3JtYXQgfHwge307XG4gICAgICAgIHNvdXJjZURhdGEuZm9ybWF0ID1cbiAgICAgICAgICBleHRlbmQoXG4gICAgICAgICAgICB7IHR5cGU6IGRhdGFGb3JtYXQudHlwZSA/IG1vZGVsLmRhdGEoKS5mb3JtYXQudHlwZSA6IGRlZmF1bHRFeHRlbnNpb24gfSxcbiAgICAgICAgICAgIGRhdGFGb3JtYXQucHJvcGVydHkgPyB7IHByb3BlcnR5OiBkYXRhRm9ybWF0LnByb3BlcnR5IH0gOiB7fSxcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgYW5kIG1lc2ggYXJlIHR3byBtdXR1YWxseSBleGNsdXNpdmUgcHJvcGVydGllc1xuICAgICAgICAgICAgZGF0YUZvcm1hdC5mZWF0dXJlID9cbiAgICAgICAgICAgICAgeyBmZWF0dXJlIDogZGF0YUZvcm1hdC5mZWF0dXJlIH0gOlxuICAgICAgICAgICAgZGF0YUZvcm1hdC5tZXNoID9cbiAgICAgICAgICAgICAgeyBtZXNoIDogZGF0YUZvcm1hdC5tZXNoIH0gOlxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgICB9IGVsc2UgaWYgKCFtb2RlbC5wYXJlbnQoKSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBub3QgZXhwbGljaXRseSBwcm92aWRlZCBidXQgdGhlIG1vZGVsIGlzIGEgcm9vdCxcbiAgICAgIC8vIG5lZWQgdG8gcHJvZHVjZSBhIHNvdXJjZSBhcyB3ZWxsXG4gICAgICByZXR1cm4geyBuYW1lOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBpZiAoIW1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGEuc291cmNlKSB7XG4gICAgICAvLyBJZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBpdHMgb3duIHNvdXJjZSwgaGF2ZSB0byByZW5hbWUgaXRzIHNvdXJjZS5cbiAgICAgIG1vZGVsLmNoaWxkKCkucmVuYW1lRGF0YShtb2RlbC5jaGlsZCgpLmRhdGFOYW1lKFNPVVJDRSksIG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpKSB7XG4gICAgICAgIC8vIHdlIGNhbm5vdCBtZXJnZSBpZiB0aGUgY2hpbGQgaGFzIGZpbHRlcnMgZGVmaW5lZCBldmVuIGFmdGVyIHdlIHRyaWVkIHRvIG1vdmUgdGhlbSB1cFxuICAgICAgICBjb25zdCBjYW5NZXJnZSA9ICFjaGlsZERhdGEuZmlsdGVyICYmICFjaGlsZERhdGEuZm9ybWF0UGFyc2UgJiYgIWNoaWxkRGF0YS5udWxsRmlsdGVyO1xuICAgICAgICBpZiAoY2FuTWVyZ2UpIHtcbiAgICAgICAgICAvLyByZW5hbWUgc291cmNlIGJlY2F1c2Ugd2UgY2FuIGp1c3QgcmVtb3ZlIGl0XG4gICAgICAgICAgY2hpbGQucmVuYW1lRGF0YShjaGlsZC5kYXRhTmFtZShTT1VSQ0UpLCBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpKTtcbiAgICAgICAgICBkZWxldGUgY2hpbGREYXRhLnNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjaGlsZCBkb2VzIG5vdCBoYXZlIGRhdGEgZGVmaW5lZCBvciB0aGUgc2FtZSBzb3VyY2Ugc28ganVzdCB1c2UgdGhlIHBhcmVudHMgc291cmNlXG4gICAgICAgICAgY2hpbGREYXRhLnNvdXJjZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNoaWxkLmRhdGFOYW1lKFNPVVJDRSksXG4gICAgICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSlcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUobW9kZWw6IE1vZGVsLCBjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBpZiAoY29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgbGV0IHNvdXJjZURhdGE6IFZnRGF0YSA9IGNvbXBvbmVudC5zb3VyY2U7XG5cbiAgICAgIGlmIChjb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQgPSBjb21wb25lbnQuc291cmNlLmZvcm1hdCB8fCB7fTtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQucGFyc2UgPSBjb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIG51bGwgZmlsdGVyIGNvbWVzIGZpcnN0IHNvIHRyYW5zZm9ybXMgYXJlIG5vdCBwZXJmb3JtZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgIC8vIHRpbWUgYW5kIGJpbiBzaG91bGQgY29tZSBiZWZvcmUgZmlsdGVyIHNvIHdlIGNhbiBmaWx0ZXIgYnkgdGltZSBhbmQgYmluXG4gICAgICBzb3VyY2VEYXRhLnRyYW5zZm9ybSA9IFtdLmNvbmNhdChcbiAgICAgICAgbnVsbEZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBmb3JtdWxhLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIGZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBiaW4uYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgdGltZVVuaXQuYXNzZW1ibGUoY29tcG9uZW50KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQUNLRURfU0NBTEUsIFNVTU1BUll9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogU3RhY2tlZCBzY2FsZSBkYXRhIHNvdXJjZSwgZm9yIGZlZWRpbmcgdGhlIHNoYXJlZCBzY2FsZS5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBzdGFja1NjYWxlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogVW5pdE1vZGVsKTogVmdEYXRhIHtcbiAgICBjb25zdCBzdGFja1Byb3BzID0gbW9kZWwuc3RhY2soKTtcblxuICAgIGlmIChzdGFja1Byb3BzKSB7XG4gICAgICAvLyBwcm9kdWNlIHN0YWNrZWQgc2NhbGVcbiAgICAgIGNvbnN0IGdyb3VwYnlDaGFubmVsID0gc3RhY2tQcm9wcy5ncm91cGJ5Q2hhbm5lbDtcbiAgICAgIGNvbnN0IGZpZWxkQ2hhbm5lbCA9IHN0YWNrUHJvcHMuZmllbGRDaGFubmVsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSksXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSksIC8vIGFsd2F5cyBzdW1tYXJ5IGJlY2F1c2Ugc3RhY2tlZCBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRpb25cbiAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgIC8vIGdyb3VwIGJ5IGNoYW5uZWwgYW5kIG90aGVyIGZhY2V0c1xuICAgICAgICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChncm91cGJ5Q2hhbm5lbCldLFxuICAgICAgICAgIC8vIHByb2R1Y2Ugc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgICAgIHN1bW1hcml6ZTogW3sgb3BzOiBbJ3N1bSddLCBmaWVsZDogbW9kZWwuZmllbGQoZmllbGRDaGFubmVsKSB9XVxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBjb25zdCBjaGlsZCA9IG1vZGVsLmNoaWxkKCk7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgYnV0IGhhcyBzdGFjayBzY2FsZSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN0YWNrU2NhbGUpIHtcbiAgICAgIGxldCBzdGFja0NvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuXG4gICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSk7XG4gICAgICBjaGlsZC5yZW5hbWVEYXRhKHN0YWNrQ29tcG9uZW50Lm5hbWUsIG5ld05hbWUpO1xuICAgICAgc3RhY2tDb21wb25lbnQubmFtZSA9IG5ld05hbWU7XG5cbiAgICAgIC8vIFJlZmVyIHRvIGZhY2V0J3Mgc3VtbWFyeSBpbnN0ZWFkIChhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uKVxuICAgICAgc3RhY2tDb21wb25lbnQuc291cmNlID0gbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSk7XG5cbiAgICAgIC8vIEFkZCBtb3JlIGRpbWVuc2lvbnMgZm9yIHJvdy9jb2x1bW5cbiAgICAgIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5ID0gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGdyb3VwYnksIGZpZWxkRGVmKSB7XG4gICAgICAgIGdyb3VwYnkucHVzaChmaWVsZChmaWVsZERlZikpO1xuICAgICAgICByZXR1cm4gZ3JvdXBieTtcbiAgICAgIH0sIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5KTtcblxuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuICAgICAgcmV0dXJuIHN0YWNrQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gVE9ET1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQuc3RhY2tTY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi4vLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtrZXlzLCB2YWxzLCByZWR1Y2UsIGhhc2gsIERpY3QsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnQsIFN1bW1hcnlDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBzdW1tYXJ5IHtcbiAgZnVuY3Rpb24gYWRkRGltZW5zaW9uKGRpbXM6IHsgW2ZpZWxkOiBzdHJpbmddOiBib29sZWFuIH0sIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KV0gPSB0cnVlO1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KV0gPSB0cnVlO1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KV0gPSB0cnVlO1xuXG4gICAgICAvLyBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgLy8gaWYgKHNjYWxlVHlwZShzY2FsZSwgZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSkgPT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgICAvLyBhbHNvIHByb2R1Y2UgYmluX3JhbmdlIGlmIHRoZSBiaW5uZWQgZmllbGQgdXNlIG9yZGluYWwgc2NhbGVcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3JhbmdlJyB9KV0gPSB0cnVlO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmKV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZGltcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IE1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICAvKiBzdHJpbmcgc2V0IGZvciBkaW1lbnNpb25zICovXG4gICAgbGV0IGRpbXM6IFN0cmluZ1NldCA9IHt9O1xuXG4gICAgLyogZGljdGlvbmFyeSBtYXBwaW5nIGZpZWxkIG5hbWUgPT4gZGljdCBzZXQgb2YgYWdncmVnYXRpb24gZnVuY3Rpb25zICovXG4gICAgbGV0IG1lYXM6IERpY3Q8U3RyaW5nU2V0PiA9IHt9O1xuXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9PT0gQWdncmVnYXRlT3AuQ09VTlQpIHtcbiAgICAgICAgICBtZWFzWycqJ10gPSBtZWFzWycqJ10gfHwge307XG4gICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgICBtZWFzWycqJ11bJ2NvdW50J10gPSB0cnVlO1xuICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXSA9IG1lYXNbZmllbGREZWYuZmllbGRdIHx8IHt9O1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdW2ZpZWxkRGVmLmFnZ3JlZ2F0ZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGREaW1lbnNpb24oZGltcywgZmllbGREZWYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFt7XG4gICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKSxcbiAgICAgIGRpbWVuc2lvbnM6IGRpbXMsXG4gICAgICBtZWFzdXJlczogbWVhc1xuICAgIH1dO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSBidXQgaGFzIGEgc3VtbWFyeSBkYXRhIHNvdXJjZSwgbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgIGxldCBzdW1tYXJ5Q29tcG9uZW50cyA9IGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5Lm1hcChmdW5jdGlvbihzdW1tYXJ5Q29tcG9uZW50KSB7XG4gICAgICAgIC8vIGFkZCBmYWNldCBmaWVsZHMgYXMgZGltZW5zaW9uc1xuICAgICAgICBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnMgPSBtb2RlbC5yZWR1Y2UoYWRkRGltZW5zaW9uLCBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnMpO1xuXG4gICAgICAgIGNvbnN0IHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeCA9IHN1bW1hcnlDb21wb25lbnQubmFtZS5zdWJzdHIobW9kZWwuY2hpbGQoKS5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICBtb2RlbC5jaGlsZCgpLnJlbmFtZURhdGEoc3VtbWFyeUNvbXBvbmVudC5uYW1lLCBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUgPSBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXg7XG4gICAgICAgIHJldHVybiBzdW1tYXJ5Q29tcG9uZW50O1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeTtcbiAgICAgIHJldHVybiBzdW1tYXJ5Q29tcG9uZW50cztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VNZWFzdXJlcyhwYXJlbnRNZWFzdXJlczogRGljdDxEaWN0PGJvb2xlYW4+PiwgY2hpbGRNZWFzdXJlczogRGljdDxEaWN0PGJvb2xlYW4+Pikge1xuICAgIGZvciAoY29uc3QgZmllbGQgaW4gY2hpbGRNZWFzdXJlcykge1xuICAgICAgaWYgKGNoaWxkTWVhc3VyZXMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG4gICAgICAgIC8vIHdoZW4gd2UgbWVyZ2UgYSBtZWFzdXJlLCB3ZSBlaXRoZXIgaGF2ZSB0byBhZGQgYW4gYWdncmVnYXRpb24gb3BlcmF0b3Igb3IgZXZlbiBhIG5ldyBmaWVsZFxuICAgICAgICBjb25zdCBvcHMgPSBjaGlsZE1lYXN1cmVzW2ZpZWxkXTtcbiAgICAgICAgZm9yIChjb25zdCBvcCBpbiBvcHMpIHtcbiAgICAgICAgICBpZiAob3BzLmhhc093blByb3BlcnR5KG9wKSkge1xuICAgICAgICAgICAgaWYgKGZpZWxkIGluIHBhcmVudE1lYXN1cmVzKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCBvcGVyYXRvciB0byBleGlzdGluZyBtZWFzdXJlIGZpZWxkXG4gICAgICAgICAgICAgIHBhcmVudE1lYXN1cmVzW2ZpZWxkXVtvcF0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyZW50TWVhc3VyZXNbZmllbGRdID0geyBvcDogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICAvLyBJbmRleCBieSB0aGUgZmllbGRzIHdlIGFyZSBncm91cGluZyBieVxuICAgIGxldCBzdW1tYXJpZXMgPSB7fSBhcyBEaWN0PFN1bW1hcnlDb21wb25lbnQ+O1xuXG4gICAgLy8gQ29tYmluZSBzdW1tYXJpZXMgZm9yIGNoaWxkcmVuIHRoYXQgZG9uJ3QgaGF2ZSBhIGRpc3RpbmN0IHNvdXJjZVxuICAgIC8vIChlaXRoZXIgaGF2aW5nIGl0cyBvd24gZGF0YSBzb3VyY2UsIG9yIGl0cyBvd24gdHJhbmZvcm1hdGlvbiBvZiB0aGUgc2FtZSBkYXRhIHNvdXJjZSkuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIHN1bW1hcmllcyBpZiB3ZSBjYW5cbiAgICAgICAgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkuZm9yRWFjaCgoY2hpbGRTdW1tYXJ5KSA9PiB7XG4gICAgICAgICAgLy8gVGhlIGtleSBpcyBhIGhhc2ggYmFzZWQgb24gdGhlIGRpbWVuc2lvbnM7XG4gICAgICAgICAgLy8gd2UgdXNlIGl0IHRvIGZpbmQgb3V0IHdoZXRoZXIgd2UgaGF2ZSBhIHN1bW1hcnkgdGhhdCB1c2VzIHRoZSBzYW1lIGdyb3VwIGJ5IGZpZWxkcy5cbiAgICAgICAgICBjb25zdCBrZXkgPSBoYXNoKGNoaWxkU3VtbWFyeS5kaW1lbnNpb25zKTtcbiAgICAgICAgICBpZiAoa2V5IGluIHN1bW1hcmllcykge1xuICAgICAgICAgICAgLy8geWVzLCB0aGVyZSBpcyBhIHN1bW1hcnkgaGF0IHdlIG5lZWQgdG8gbWVyZ2UgaW50b1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBkaW1lbnNpb25zIGFyZSB0aGUgc2FtZSBzbyB3ZSBvbmx5IG5lZWQgdG8gbWVyZ2UgdGhlIG1lYXN1cmVzXG4gICAgICAgICAgICBtZXJnZU1lYXN1cmVzKHN1bW1hcmllc1trZXldLm1lYXN1cmVzLCBjaGlsZFN1bW1hcnkubWVhc3VyZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnaXZlIHRoZSBzdW1tYXJ5IGEgbmV3IG5hbWVcbiAgICAgICAgICAgIGNoaWxkU3VtbWFyeS5uYW1lID0gbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSkgKyAnXycgKyBrZXlzKHN1bW1hcmllcykubGVuZ3RoO1xuICAgICAgICAgICAgc3VtbWFyaWVzW2tleV0gPSBjaGlsZFN1bW1hcnk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVtb3ZlIHN1bW1hcnkgZnJvbSBjaGlsZFxuICAgICAgICAgIGNoaWxkLnJlbmFtZURhdGEoY2hpbGQuZGF0YU5hbWUoU1VNTUFSWSksIHN1bW1hcmllc1trZXldLm5hbWUpO1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFscyhzdW1tYXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VtYmxlIHRoZSBzdW1tYXJ5LiBOZWVkcyBhIHJlbmFtZSBmdW5jdGlvbiBiZWNhdXNlIHdlIGNhbm5vdCBndWFyYW50ZWUgdGhhdCB0aGVcbiAgICogcGFyZW50IGRhdGEgYmVmb3JlIHRoZSBjaGlsZHJlbiBkYXRhLlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCwgbW9kZWw6IE1vZGVsKTogVmdEYXRhW10ge1xuICAgIGlmICghY29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zdW1tYXJ5LnJlZHVjZShmdW5jdGlvbihzdW1tYXJ5RGF0YSwgc3VtbWFyeUNvbXBvbmVudCkge1xuICAgICAgY29uc3QgZGltcyA9IHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucztcbiAgICAgIGNvbnN0IG1lYXMgPSBzdW1tYXJ5Q29tcG9uZW50Lm1lYXN1cmVzO1xuXG4gICAgICBjb25zdCBncm91cGJ5ID0ga2V5cyhkaW1zKTtcblxuICAgICAgLy8gc2hvcnQtZm9ybWF0IHN1bW1hcml6ZSBvYmplY3QgZm9yIFZlZ2EncyBhZ2dyZWdhdGUgdHJhbnNmb3JtXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmVnYS92ZWdhL3dpa2kvRGF0YS1UcmFuc2Zvcm1zIy1hZ2dyZWdhdGVcbiAgICAgIGNvbnN0IHN1bW1hcml6ZSA9IHJlZHVjZShtZWFzLCBmdW5jdGlvbihhZ2dyZWdhdG9yLCBmbkRpY3RTZXQsIGZpZWxkKSB7XG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGRdID0ga2V5cyhmbkRpY3RTZXQpO1xuICAgICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgaWYgKGtleXMobWVhcykubGVuZ3RoID4gMCkgeyAvLyBoYXMgYWdncmVnYXRlXG4gICAgICAgIHN1bW1hcnlEYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHN1bW1hcnlDb21wb25lbnQubmFtZSxcbiAgICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSksXG4gICAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgICBncm91cGJ5OiBncm91cGJ5LFxuICAgICAgICAgICAgc3VtbWFyaXplOiBzdW1tYXJpemVcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdW1tYXJ5RGF0YTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtURU1QT1JBTH0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5pbXBvcnQge3BhcnNlRXhwcmVzc2lvbn0gZnJvbSAnLi8uLi90aW1lJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgdGltZVVuaXQge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PFZnVHJhbnNmb3JtPiB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdENvbXBvbmVudCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBjb25zdCByZWYgPSBmaWVsZChmaWVsZERlZiwgeyBub2ZuOiB0cnVlLCBkYXR1bTogdHJ1ZSB9KTtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiBmaWVsZERlZi50aW1lVW5pdCkge1xuXG4gICAgICAgIGNvbnN0IGhhc2ggPSBmaWVsZChmaWVsZERlZik7XG5cbiAgICAgICAgdGltZVVuaXRDb21wb25lbnRbaGFzaF0gPSB7XG4gICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiksXG4gICAgICAgICAgZXhwcjogcGFyc2VFeHByZXNzaW9uKGZpZWxkRGVmLnRpbWVVbml0LCByZWYpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IHRpbWVVbml0Q29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQodGltZVVuaXRDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdCk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0O1xuICAgIH1cbiAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCB0aW1lVW5pdENvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgICBleHRlbmQodGltZVVuaXRDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdCk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIC8vIGp1c3Qgam9pbiB0aGUgdmFsdWVzLCB3aGljaCBhcmUgYWxyZWFkeSB0cmFuc2Zvcm1zXG4gICAgcmV0dXJuIHZhbHMoY29tcG9uZW50LnRpbWVVbml0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4uLy4uL3RpbWV1bml0JztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcbmltcG9ydCB7cGFyc2VFeHByZXNzaW9uLCByYXdEb21haW59IGZyb20gJy4vLi4vdGltZSc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIHRpbWVVbml0RG9tYWluIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogU3RyaW5nU2V0IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0RG9tYWluTWFwLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICBjb25zdCBkb21haW4gPSByYXdEb21haW4oZmllbGREZWYudGltZVVuaXQsIGNoYW5uZWwpO1xuICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgdGltZVVuaXREb21haW5NYXBbZmllbGREZWYudGltZVVuaXRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0RG9tYWluTWFwO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIC8vIGFsd2F5cyBtZXJnZSB3aXRoIGNoaWxkXG4gICAgcmV0dXJuIGV4dGVuZChwYXJzZShtb2RlbCksIG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGEudGltZVVuaXREb21haW4pO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBhbHdheXMgbWVyZ2Ugd2l0aCBjaGlsZHJlblxuICAgIHJldHVybiBleHRlbmQocGFyc2UobW9kZWwpLCBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuY29tcG9uZW50LmRhdGEudGltZVVuaXREb21haW47XG4gICAgfSkpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4ga2V5cyhjb21wb25lbnQudGltZVVuaXREb21haW4pLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdERhdGEsIHR1OiBhbnkpIHtcbiAgICAgIGNvbnN0IHRpbWVVbml0OiBUaW1lVW5pdCA9IHR1OyAvLyBjYXN0IHN0cmluZyBiYWNrIHRvIGVudW1cbiAgICAgIGNvbnN0IGRvbWFpbiA9IHJhd0RvbWFpbih0aW1lVW5pdCwgbnVsbCk7IC8vIEZJWE1FIGZpeCByYXdEb21haW4gc2lnbmF0dXJlXG4gICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgIHRpbWVVbml0RGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lOiB0aW1lVW5pdCxcbiAgICAgICAgICB2YWx1ZXM6IGRvbWFpbixcbiAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGUnLFxuICAgICAgICAgICAgZXhwcjogcGFyc2VFeHByZXNzaW9uKHRpbWVVbml0LCAnZGF0dW0uZGF0YScsIHRydWUpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXREYXRhO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzT3JpZW50LCBBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0ZhY2V0fSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge2NoYW5uZWxNYXBwaW5nRm9yRWFjaH0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGaWVsZERlZiwgaXNEaW1lbnNpb259IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtGYWNldFNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtnZXRGdWxsTmFtZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgdmFscywgZmxhdHRlbiwgZHVwbGljYXRlLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnTWFya0dyb3VwfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7cGFyc2VBeGlzLCBwYXJzZUlubmVyQXhpcywgZ3JpZFNob3csIHBhcnNlQXhpc0NvbXBvbmVudH0gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHthc3NlbWJsZURhdGEsIHBhcnNlRmFjZXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZUZhY2V0TGF5b3V0fSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudH0gZnJvbSAnLi9zY2FsZSc7XG5cbmV4cG9ydCBjbGFzcyBGYWNldE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICBwcml2YXRlIF9mYWNldDogRmFjZXQ7XG5cbiAgcHJpdmF0ZSBfY2hpbGQ6IE1vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IEZhY2V0U3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG5cbiAgICAvLyBDb25maWcgbXVzdCBiZSBpbml0aWFsaXplZCBiZWZvcmUgY2hpbGQgYXMgaXQgZ2V0cyBjYXNjYWRlZCB0byB0aGUgY2hpbGRcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQpO1xuXG4gICAgY29uc3QgY2hpbGQgID0gdGhpcy5fY2hpbGQgPSBidWlsZE1vZGVsKHNwZWMuc3BlYywgdGhpcywgdGhpcy5uYW1lKCdjaGlsZCcpKTtcblxuICAgIGNvbnN0IGZhY2V0ICA9IHRoaXMuX2ZhY2V0ID0gdGhpcy5faW5pdEZhY2V0KHNwZWMuZmFjZXQpO1xuICAgIHRoaXMuX3NjYWxlICA9IHRoaXMuX2luaXRTY2FsZShmYWNldCwgY29uZmlnLCBjaGlsZCk7XG4gICAgdGhpcy5fYXhpcyAgID0gdGhpcy5faW5pdEF4aXMoZmFjZXQsIGNvbmZpZywgY2hpbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgc3BlY0NvbmZpZywgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZhY2V0KGZhY2V0OiBGYWNldCkge1xuICAgIC8vIGNsb25lIHRvIHByZXZlbnQgc2lkZSBlZmZlY3QgdG8gdGhlIG9yaWdpbmFsIHNwZWNcbiAgICBmYWNldCA9IGR1cGxpY2F0ZShmYWNldCk7XG5cbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICBjaGFubmVsTWFwcGluZ0ZvckVhY2godGhpcy5jaGFubmVscygpLCBmYWNldCwgZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICAvLyBUT0RPOiBpZiBoYXMgbm8gZmllbGQgLyBkYXR1bSwgdGhlbiBkcm9wIHRoZSBmaWVsZFxuXG4gICAgICBpZiAoIWlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKGNoYW5uZWwgKyAnIGVuY29kaW5nIHNob3VsZCBiZSBvcmRpbmFsLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudHlwZSkge1xuICAgICAgICAvLyBjb252ZXJ0IHNob3J0IHR5cGUgdG8gZnVsbCB0eXBlXG4gICAgICAgIGZpZWxkRGVmLnR5cGUgPSBnZXRGdWxsTmFtZShmaWVsZERlZi50eXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFjZXQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2NhbGUoZmFjZXQ6IEZhY2V0LCBjb25maWc6IENvbmZpZywgY2hpbGQ6IE1vZGVsKTogRGljdDxTY2FsZT4ge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dLnJlZHVjZShmdW5jdGlvbihfc2NhbGUsIGNoYW5uZWwpIHtcbiAgICAgIGlmIChmYWNldFtjaGFubmVsXSkge1xuXG4gICAgICAgIGNvbnN0IHNjYWxlU3BlYyA9IGZhY2V0W2NoYW5uZWxdLnNjYWxlIHx8IHt9O1xuICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6IFNjYWxlVHlwZS5PUkRJTkFMLFxuICAgICAgICAgIHJvdW5kOiBjb25maWcuZmFjZXQuc2NhbGUucm91bmQsXG5cbiAgICAgICAgICAvLyBUT0RPOiByZXZpc2UgdGhpcyBydWxlIGZvciBtdWx0aXBsZSBsZXZlbCBvZiBuZXN0aW5nXG4gICAgICAgICAgcGFkZGluZzogKGNoYW5uZWwgPT09IFJPVyAmJiBjaGlsZC5oYXMoWSkpIHx8IChjaGFubmVsID09PSBDT0xVTU4gJiYgY2hpbGQuaGFzKFgpKSA/XG4gICAgICAgICAgICAgICAgICAgY29uZmlnLmZhY2V0LnNjYWxlLnBhZGRpbmcgOiAwXG4gICAgICAgIH0sIHNjYWxlU3BlYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGU+KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBeGlzKGZhY2V0OiBGYWNldCwgY29uZmlnOiBDb25maWcsIGNoaWxkOiBNb2RlbCk6IERpY3Q8QXhpcz4ge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dLnJlZHVjZShmdW5jdGlvbihfYXhpcywgY2hhbm5lbCkge1xuICAgICAgaWYgKGZhY2V0W2NoYW5uZWxdKSB7XG4gICAgICAgIGNvbnN0IGF4aXNTcGVjID0gZmFjZXRbY2hhbm5lbF0uYXhpcztcbiAgICAgICAgaWYgKGF4aXNTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnN0IG1vZGVsQXhpcyA9IF9heGlzW2NoYW5uZWxdID0gZXh0ZW5kKHt9LFxuICAgICAgICAgICAgY29uZmlnLmZhY2V0LmF4aXMsXG4gICAgICAgICAgICBheGlzU3BlYyA9PT0gdHJ1ZSA/IHt9IDogYXhpc1NwZWMgfHwge31cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGNoYW5uZWwgPT09IFJPVykge1xuICAgICAgICAgICAgY29uc3QgeUF4aXM6IGFueSA9IGNoaWxkLmF4aXMoWSk7XG4gICAgICAgICAgICBpZiAoeUF4aXMgJiYgeUF4aXMub3JpZW50ICE9PSBBeGlzT3JpZW50LlJJR0hUICYmICFtb2RlbEF4aXMub3JpZW50KSB7XG4gICAgICAgICAgICAgIG1vZGVsQXhpcy5vcmllbnQgPSBBeGlzT3JpZW50LlJJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIGNoaWxkLmhhcyhYKSAmJiAhbW9kZWxBeGlzLmxhYmVsQW5nbGUpIHtcbiAgICAgICAgICAgICAgbW9kZWxBeGlzLmxhYmVsQW5nbGUgPSBtb2RlbEF4aXMub3JpZW50ID09PSBBeGlzT3JpZW50LlJJR0hUID8gOTAgOiAyNzA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwdWJsaWMgZmFjZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZhY2V0O1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fZmFjZXRbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgY2hpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHN1bW1hcnkgPSB0aGlzLmNvbXBvbmVudC5kYXRhLnN1bW1hcnk7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3VtbWFyeS5sZW5ndGggOyBpKyspIHtcbiAgICAgIGlmIChrZXlzKHN1bW1hcnlbaV0ubWVhc3VyZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuaGFzU3VtbWFyeSgpID8gU1VNTUFSWSA6IFNPVVJDRSkgKyAnJztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIHJldHVybiB0aGlzLmZhY2V0KClbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgc3RhY2soKSB7XG4gICAgcmV0dXJuIG51bGw7IC8vIHRoaXMgaXMgb25seSBhIHByb3BlcnR5IGZvciBVbml0TW9kZWxcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlRGF0YSgpO1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZUZhY2V0RGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIHRoaXMuY29tcG9uZW50LmxheW91dCA9IHBhcnNlRmFjZXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGQoKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICBjaGlsZC5wYXJzZVNjYWxlKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHNjYWxlcyBmb3IgZmllbGQgcmVmZXJlbmNlIG9mIHBhcmVudCBkYXRhIChlLmcuLCBmb3IgU1BMT00pXG5cbiAgICAvLyBGaXJzdCwgYWRkIHNjYWxlIGZvciByb3cgYW5kIGNvbHVtbi5cbiAgICBsZXQgc2NhbGVDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG5cbiAgICAvLyBUaGVuLCBtb3ZlIHNoYXJlZC91bmlvbiBmcm9tIGl0cyBjaGlsZCBzcGVjLlxuICAgIGtleXMoY2hpbGQuY29tcG9uZW50LnNjYWxlKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgc2NhbGVcbiAgICAgIGlmICh0cnVlKSB7IC8vIGlmIHNoYXJlZC91bmlvbiBzY2FsZVxuICAgICAgICBzY2FsZUNvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcblxuICAgICAgICAvLyBmb3IgZWFjaCBzY2FsZSwgbmVlZCB0byByZW5hbWVcbiAgICAgICAgdmFscyhzY2FsZUNvbXBvbmVudFtjaGFubmVsXSkuZm9yRWFjaChmdW5jdGlvbihzY2FsZSkge1xuICAgICAgICAgIGNvbnN0IHNjYWxlTmFtZVdpdGhvdXRQcmVmaXggPSBzY2FsZS5uYW1lLnN1YnN0cihjaGlsZC5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5zY2FsZU5hbWUoc2NhbGVOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgICAgY2hpbGQucmVuYW1lU2NhbGUoc2NhbGUubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgc2NhbGUubmFtZSA9IG5ld05hbWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9uY2UgcHV0IGluIHBhcmVudCwganVzdCByZW1vdmUgdGhlIGNoaWxkJ3Mgc2NhbGUuXG4gICAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZU1hcmsoKTtcblxuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBleHRlbmQoXG4gICAgICB7XG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSgnY2VsbCcpLFxuICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgICAgdGhpcy5kYXRhVGFibGUoKSA/IHtkYXRhOiB0aGlzLmRhdGFUYWJsZSgpfSA6IHt9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhY2V0JyxcbiAgICAgICAgICAgICAgZ3JvdXBieTogW10uY29uY2F0KFxuICAgICAgICAgICAgICAgIHRoaXMuaGFzKFJPVykgPyBbdGhpcy5maWVsZChST1cpXSA6IFtdLFxuICAgICAgICAgICAgICAgIHRoaXMuaGFzKENPTFVNTikgPyBbdGhpcy5maWVsZChDT0xVTU4pXSA6IFtdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgdXBkYXRlOiBnZXRGYWNldEdyb3VwUHJvcGVydGllcyh0aGlzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQ2FsbCBjaGlsZCdzIGFzc2VtYmxlR3JvdXAgdG8gYWRkIG1hcmtzLCBzY2FsZXMsIGF4ZXMsIGFuZCBsZWdlbmRzLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbiBjYWxsIGNoaWxkJ3MgYXNzZW1ibGVHcm91cCgpIGhlcmUgYmVjYXVzZSBwYXJzZU1hcmsoKVxuICAgICAgLy8gaXMgdGhlIGxhc3QgbWV0aG9kIGluIGNvbXBpbGUoKSBhbmQgdGh1cyB0aGUgY2hpbGQgaXMgY29tcGxldGVseSBjb21waWxlZFxuICAgICAgLy8gYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMuY2hpbGQoKS5hc3NlbWJsZUdyb3VwKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpcygpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VBeGlzKCk7XG4gICAgdGhpcy5jb21wb25lbnQuYXhpcyA9IHBhcnNlQXhpc0NvbXBvbmVudCh0aGlzLCBbUk9XLCBDT0xVTU5dKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICAvLyBUT0RPOiB3aXRoIG5lc3RpbmcsIHdlIG1pZ2h0IG5lZWQgdG8gY29uc2lkZXIgY2FsbGluZyBjaGlsZFxuICAgIC8vIHRoaXMuY2hpbGQoKS5wYXJzZUF4aXNHcm91cCgpO1xuXG4gICAgY29uc3QgeEF4aXNHcm91cCA9IHBhcnNlQXhpc0dyb3VwKHRoaXMsIFgpO1xuICAgIGNvbnN0IHlBeGlzR3JvdXAgPSBwYXJzZUF4aXNHcm91cCh0aGlzLCBZKTtcblxuICAgIHRoaXMuY29tcG9uZW50LmF4aXNHcm91cCA9IGV4dGVuZChcbiAgICAgIHhBeGlzR3JvdXAgPyB7eDogeEF4aXNHcm91cH0gOiB7fSxcbiAgICAgIHlBeGlzR3JvdXAgPyB7eTogeUF4aXNHcm91cH0gOiB7fVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VHcmlkR3JvdXAoKSB7XG4gICAgLy8gVE9ETzogd2l0aCBuZXN0aW5nLCB3ZSBtaWdodCBuZWVkIHRvIGNvbnNpZGVyIGNhbGxpbmcgY2hpbGRcbiAgICAvLyB0aGlzLmNoaWxkKCkucGFyc2VHcmlkR3JvdXAoKTtcblxuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZCgpO1xuXG4gICAgdGhpcy5jb21wb25lbnQuZ3JpZEdyb3VwID0gZXh0ZW5kKFxuICAgICAgIWNoaWxkLmhhcyhYKSAmJiB0aGlzLmhhcyhDT0xVTU4pID8geyBjb2x1bW46IGdldENvbHVtbkdyaWRHcm91cHModGhpcykgfSA6IHt9LFxuICAgICAgIWNoaWxkLmhhcyhZKSAmJiB0aGlzLmhhcyhST1cpID8geyByb3c6IGdldFJvd0dyaWRHcm91cHModGhpcykgfSA6IHt9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VMZWdlbmQoKTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgbGVnZW5kIGZvciBpbmRlcGVuZGVudCBub24tcG9zaXRpb24gc2NhbGUgYWNyb3NzIGZhY2V0c1xuICAgIC8vIFRPRE86IHN1cHBvcnQgbGVnZW5kIGZvciBmaWVsZCByZWZlcmVuY2Ugb2YgcGFyZW50IGRhdGEgKGUuZy4sIGZvciBTUExPTSlcblxuICAgIC8vIEZvciBub3csIGFzc3VtaW5nIHRoYXQgbm9uLXBvc2l0aW9uYWwgc2NhbGVzIGFyZSBhbHdheXMgc2hhcmVkIGFjcm9zcyBmYWNldHNcbiAgICAvLyBUaHVzLCBqdXN0IG1vdmUgYWxsIGxlZ2VuZHMgZnJvbSBpdHMgY2hpbGRcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSB0aGlzLl9jaGlsZC5jb21wb25lbnQubGVnZW5kO1xuICAgIHRoaXMuX2NoaWxkLmNvbXBvbmVudC5sZWdlbmQgPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUHJlZml4IHRyYXZlcnNhbCDigJMgcGFyZW50IGRhdGEgbWlnaHQgYmUgcmVmZXJyZWQgYnkgY2hpbGRyZW4gZGF0YVxuICAgIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGQuYXNzZW1ibGVEYXRhKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTGF5b3V0KGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFBvc3RmaXggdHJhdmVyc2FsIOKAkyBsYXlvdXQgaXMgYXNzZW1ibGVkIGJvdHRvbS11cFxuICAgIHRoaXMuX2NoaWxkLmFzc2VtYmxlTGF5b3V0KGxheW91dERhdGEpO1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gW10uY29uY2F0KFxuICAgICAgLy8gYXhpc0dyb3VwIGlzIGEgbWFwcGluZyB0byBWZ01hcmtHcm91cFxuICAgICAgdmFscyh0aGlzLmNvbXBvbmVudC5heGlzR3JvdXApLFxuICAgICAgZmxhdHRlbih2YWxzKHRoaXMuY29tcG9uZW50LmdyaWRHcm91cCkpLFxuICAgICAgdGhpcy5jb21wb25lbnQubWFya1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFtST1csIENPTFVNTl07XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldCgpO1xuICB9XG5cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy8gVE9ETzogbW92ZSB0aGUgcmVzdCBvZiB0aGUgZmlsZSBpbnRvIEZhY2V0TW9kZWwgaWYgcG9zc2libGVcblxuZnVuY3Rpb24gZ2V0RmFjZXRHcm91cFByb3BlcnRpZXMobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICBjb25zdCBtZXJnZWRDZWxsQ29uZmlnID0gZXh0ZW5kKHt9LCBjaGlsZC5jb25maWcoKS5jZWxsLCBjaGlsZC5jb25maWcoKS5mYWNldC5jZWxsKTtcblxuICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIHg6IG1vZGVsLmhhcyhDT0xVTU4pID8ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKSxcbiAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKENPTFVNTikucGFkZGluZyAvIDJcbiAgICAgICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgICB5OiBtb2RlbC5oYXMoUk9XKSA/IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKSxcbiAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoUk9XKS5wYWRkaW5nIC8gMlxuICAgICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCd3aWR0aCcpfX0sXG4gICAgICBoZWlnaHQ6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnaGVpZ2h0Jyl9fVxuICAgIH0sXG4gICAgY2hpbGQuYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMobWVyZ2VkQ2VsbENvbmZpZylcbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VBeGlzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLy8gVE9ETzogYWRkIGEgY2FzZSB3aGVyZSBpbm5lciBzcGVjIGlzIG5vdCBhIHVuaXQgKGZhY2V0L2xheWVyL2NvbmNhdClcbiAgbGV0IGF4aXNHcm91cCA9IG51bGw7XG5cbiAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICBpZiAoY2hpbGQuaGFzKGNoYW5uZWwpKSB7XG4gICAgaWYgKGNoaWxkLmF4aXMoY2hhbm5lbCkpIHtcbiAgICAgIGlmICh0cnVlKSB7IC8vIHRoZSBjaGFubmVsIGhhcyBzaGFyZWQgYXhlc1xuXG4gICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgc2hhcmVkIGF4ZXNcbiAgICAgICAgYXhpc0dyb3VwID0gY2hhbm5lbCA9PT0gWCA/IGdldFhBeGVzR3JvdXAobW9kZWwpIDogZ2V0WUF4ZXNHcm91cChtb2RlbCk7XG5cbiAgICAgICAgaWYgKGNoaWxkLmF4aXMoY2hhbm5lbCkgJiYgZ3JpZFNob3coY2hpbGQsIGNoYW5uZWwpKSB7IC8vIHNob3cgaW5uZXIgZ3JpZFxuICAgICAgICAgIC8vIGFkZCBpbm5lciBheGlzIChha2EgYXhpcyB0aGF0IHNob3dzIG9ubHkgZ3JpZCB0byApXG4gICAgICAgICAgY2hpbGQuY29tcG9uZW50LmF4aXNbY2hhbm5lbF0gPSBwYXJzZUlubmVyQXhpcyhjaGFubmVsLCBjaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlcyBzdXBwb3J0XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBheGlzR3JvdXA7XG59XG5cblxuZnVuY3Rpb24gZ2V0WEF4ZXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCk6IFZnTWFya0dyb3VwIHtcbiAgY29uc3QgaGFzQ29sID0gbW9kZWwuaGFzKENPTFVNTik7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgneC1heGVzJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNDb2wgPyB7XG4gICAgICBmcm9tOiB7IC8vIFRPRE86IGlmIHdlIGRvIGZhY2V0IHRyYW5zZm9ybSBhdCB0aGUgcGFyZW50IGxldmVsIHdlIGNhbiBzYW1lIHNvbWUgdHJhbnNmb3JtIGhlcmVcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV0sXG4gICAgICAgICAgc3VtbWFyaXplOiB7JyonOiBbJ2NvdW50J119IC8vIGp1c3QgYSBwbGFjZWhvbGRlciBhZ2dyZWdhdGlvblxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0gOiB7fSxcbiAgICB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ3dpZHRoJyl9fSxcbiAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgeDogaGFzQ29sID8ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoQ09MVU1OKS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtwYXJzZUF4aXMoWCwgbW9kZWwuY2hpbGQoKSldXG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRZQXhlc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsKTogVmdNYXJrR3JvdXAge1xuICBjb25zdCBoYXNSb3cgPSBtb2RlbC5oYXMoUk9XKTtcbiAgcmV0dXJuIGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCd5LWF4ZXMnKSxcbiAgICAgIHR5cGU6ICdncm91cCdcbiAgICB9LFxuICAgIGhhc1JvdyA/IHtcbiAgICAgIGZyb206IHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoUk9XKV0sXG4gICAgICAgICAgc3VtbWFyaXplOiB7JyonOiBbJ2NvdW50J119IC8vIGp1c3QgYSBwbGFjZWhvbGRlciBhZ2dyZWdhdGlvblxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0gOiB7fSxcbiAgICB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnd2lkdGgnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ2hlaWdodCcpfX0sXG4gICAgICAgICAgeTogaGFzUm93ID8ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoUk9XKS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtwYXJzZUF4aXMoWSwgbW9kZWwuY2hpbGQoKSldXG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dHcmlkR3JvdXBzKG1vZGVsOiBNb2RlbCk6IGFueVtdIHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBmYWNldEdyaWRDb25maWcgPSBtb2RlbC5jb25maWcoKS5mYWNldC5ncmlkO1xuXG4gIGNvbnN0IHJvd0dyaWQgPSB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgncm93LWdyaWQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpXG4gICAgICAgIH0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gW3Jvd0dyaWQsIHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb3ctZ3JpZC1lbmQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHk6IHsgZmllbGQ6IHtncm91cDogJ2hlaWdodCd9fSxcbiAgICAgICAgeDoge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHgyOiB7ZmllbGQ6IHtncm91cDogJ3dpZHRoJ30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9XTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29sdW1uR3JpZEdyb3Vwcyhtb2RlbDogTW9kZWwpOiBhbnkgeyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IGZhY2V0R3JpZENvbmZpZyA9IG1vZGVsLmNvbmZpZygpLmZhY2V0LmdyaWQ7XG5cbiAgY29uc3QgY29sdW1uR3JpZCA9IHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdjb2x1bW4tZ3JpZCcpLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBmcm9tOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3t0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV19XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTilcbiAgICAgICAgfSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBbY29sdW1uR3JpZCwgIHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdjb2x1bW4tZ3JpZC1lbmQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHsgZmllbGQ6IHtncm91cDogJ3dpZHRoJ319LFxuICAgICAgICB5OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXR9LFxuICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH1dO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7a2V5cywgZHVwbGljYXRlLCBtZXJnZURlZXAsIGZsYXR0ZW4sIHVuaXF1ZSwgaXNBcnJheSwgdmFscywgaGFzaCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2RlZmF1bHRDb25maWcsIENvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7TGF5ZXJTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZUxheWVyRGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VMYXllckxheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZUNvbXBvbmVudHN9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnQXhpcywgVmdMZWdlbmQsIGlzVW5pb25lZERvbWFpbiwgaXNEYXRhUmVmRG9tYWluLCBWZ0RhdGFSZWZ9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQgY2xhc3MgTGF5ZXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IFVuaXRNb2RlbFtdO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IExheWVyU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG5cbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQpO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gc3BlYy5sYXllcnMubWFwKChsYXllciwgaSkgPT4ge1xuICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBtb2RlbCBoYXMgdG8gYmUgYSB1bml0IG1vZGVsIGJlYWN1c2Ugd2UgcGFzcyBpbiBhIHVuaXQgc3BlY1xuICAgICAgcmV0dXJuIGJ1aWxkTW9kZWwobGF5ZXIsIHRoaXMsIHRoaXMubmFtZSgnbGF5ZXJfJyArIGkpKSBhcyBVbml0TW9kZWw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZmlnKHNwZWNDb25maWc6IENvbmZpZywgcGFyZW50OiBNb2RlbCkge1xuICAgIHJldHVybiBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBzcGVjQ29uZmlnLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSk7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgICAvLyBsYXllciBkb2VzIG5vdCBoYXZlIGFueSBjaGFubmVsc1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBwdWJsaWMgaXNPcmRpbmFsU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIC8vIHNpbmNlIHdlIGFzc3VtZSBzaGFyZWQgc2NhbGVzIHdlIGNhbiBqdXN0IGFzayB0aGUgZmlyc3QgY2hpbGRcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCk7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCk6IHN0cmluZyB7XG4gICAgLy8gRklYTUU6IGRvbid0IGp1c3QgdXNlIHRoZSBmaXJzdCBjaGlsZFxuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblswXS5kYXRhVGFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIHJldHVybiBudWxsOyAvLyBsYXllciBkb2VzIG5vdCBoYXZlIGZpZWxkIGRlZnNcbiAgfVxuXG4gIHB1YmxpYyBzdGFjaygpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gdGhpcyBpcyBvbmx5IGEgcHJvcGVydHkgZm9yIFVuaXRNb2RlbFxuICB9XG5cbiAgcHVibGljIHBhcnNlRGF0YSgpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQucGFyc2VEYXRhKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQuZGF0YSA9IHBhcnNlTGF5ZXJEYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICAvLyBUT0RPOiBjb3JyZWN0bHkgdW5pb24gb3JkaW5hbCBzY2FsZXMgcmF0aGVyIHRoYW4ganVzdCB1c2luZyB0aGUgbGF5b3V0IG9mIHRoZSBmaXJzdCBjaGlsZFxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XG4gICAgICBjaGlsZC5wYXJzZUxheW91dERhdGEoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZUxheWVyTGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgbGV0IHNjYWxlQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuc2NhbGUgPSB7fSBhcyBEaWN0PFNjYWxlQ29tcG9uZW50cz47XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZVNjYWxlKCk7XG5cbiAgICAgIC8vIEZJWE1FOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQuc2NhbGUpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIGxldCBjaGlsZFNjYWxlczogU2NhbGVDb21wb25lbnRzID0gY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuICAgICAgICAgIGlmICghY2hpbGRTY2FsZXMpIHtcbiAgICAgICAgICAgIC8vIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGFueSBzY2FsZXMgc28gd2UgaGF2ZSBub3RoaW5nIHRvIG1lcmdlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbW9kZWxTY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IHNjYWxlQ29tcG9uZW50W2NoYW5uZWxdO1xuICAgICAgICAgIGlmIChtb2RlbFNjYWxlcyAmJiBtb2RlbFNjYWxlcy5tYWluKSB7XG4gICAgICAgICAgICAvLyBTY2FsZXMgYXJlIHVuaW9uZWQgYnkgY29tYmluaW5nIHRoZSBkb21haW4gb2YgdGhlIG1haW4gc2NhbGUuXG4gICAgICAgICAgICAvLyBPdGhlciBzY2FsZXMgdGhhdCBhcmUgdXNlZCBmb3Igb3JkaW5hbCBsZWdlbmRzIGFyZSBhcHBlbmRlZC5cbiAgICAgICAgICAgIGNvbnN0IG1vZGVsRG9tYWluID0gbW9kZWxTY2FsZXMubWFpbi5kb21haW47XG4gICAgICAgICAgICBjb25zdCBjaGlsZERvbWFpbiA9IGNoaWxkU2NhbGVzLm1haW4uZG9tYWluO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShtb2RlbERvbWFpbikpIHtcbiAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRTY2FsZXMubWFpbi5kb21haW4pKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSBtb2RlbERvbWFpbi5jb25jYXQoY2hpbGREb21haW4pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCB1bmlvbmVkRmllbGRzID0gaXNVbmlvbmVkRG9tYWluKG1vZGVsRG9tYWluKSA/IG1vZGVsRG9tYWluLmZpZWxkcyA6IFttb2RlbERvbWFpbl0gYXMgVmdEYXRhUmVmW107XG5cbiAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGREb21haW4pKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuYWRkV2FybmluZygnY3VzdG9tIGRvbWFpbiBzY2FsZSBjYW5ub3QgYmUgdW5pb25lZCB3aXRoIGRlZmF1bHQgZmllbGQtYmFzZWQgZG9tYWluJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgZmllbGRzID0gaXNEYXRhUmVmRG9tYWluKGNoaWxkRG9tYWluKSA/IHVuaW9uZWRGaWVsZHMuY29uY2F0KFtjaGlsZERvbWFpbl0pIDpcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZG9tYWluIGlzIGl0c2VsZiBhIHVuaW9uIGRvbWFpbiwgY29uY2F0XG4gICAgICAgICAgICAgICAgaXNVbmlvbmVkRG9tYWluKGNoaWxkRG9tYWluKSA/IHVuaW9uZWRGaWVsZHMuY29uY2F0KGNoaWxkRG9tYWluLmZpZWxkcykgOlxuICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBpZ25vcmUgZXhwbGljaXQgZGF0YSBkb21haW5zIGZvciBub3cgYmVjYXVzZSB2ZWdhIGRvZXMgbm90IHN1cHBvcnQgdW5pb25pbmcgdGhlbVxuICAgICAgICAgICAgICAgICAgdW5pb25lZEZpZWxkcztcbiAgICAgICAgICAgICAgZmllbGRzID0gdW5pcXVlKGZpZWxkcywgaGFzaCk7XG4gICAgICAgICAgICAgIC8vIFRPRE86IGlmIGFsbCBkb21haW5zIHVzZSB0aGUgc2FtZSBkYXRhLCB3ZSBjYW4gbWVyZ2UgdGhlbVxuICAgICAgICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbiA9IHsgZmllbGRzOiBmaWVsZHMgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbiA9IGZpZWxkc1swXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgY29sb3IgbGVnZW5kIGFuZCBjb2xvciBsZWdlbmQgYmluIHNjYWxlcyBpZiB3ZSBkb24ndCBoYXZlIHRoZW0geWV0XG4gICAgICAgICAgICBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA9IG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kID8gbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgOiBjaGlsZFNjYWxlcy5jb2xvckxlZ2VuZDtcbiAgICAgICAgICAgIG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kID0gbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgPyBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA6IGNoaWxkU2NhbGVzLmJpbkNvbG9yTGVnZW5kO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY2FsZUNvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkU2NhbGVzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbmFtZSBjaGlsZCBzY2FsZXMgdG8gcGFyZW50IHNjYWxlc1xuICAgICAgICAgIHZhbHMoY2hpbGRTY2FsZXMpLmZvckVhY2goZnVuY3Rpb24oc2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlTmFtZVdpdGhvdXRQcmVmaXggPSBzY2FsZS5uYW1lLnN1YnN0cihjaGlsZC5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IG1vZGVsLnNjYWxlTmFtZShzY2FsZU5hbWVXaXRob3V0UHJlZml4KTtcbiAgICAgICAgICAgIGNoaWxkLnJlbmFtZVNjYWxlKHNjYWxlLm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgICAgc2NhbGUubmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBkZWxldGUgY2hpbGRTY2FsZXNbY2hhbm5lbF07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZU1hcmsoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgbGV0IGF4aXNDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5heGlzID0ge30gYXMgRGljdDxWZ0F4aXNbXT47XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZUF4aXMoKTtcblxuICAgICAgLy8gVE9ETzogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBheGVzXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQuYXhpcykuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBtdWx0aXBsZSBheGVzIGZvciBzaGFyZWQgc2NhbGVcblxuICAgICAgICAgIC8vIGp1c3QgdXNlIHRoZSBmaXJzdCBheGlzIGRlZmluaXRpb24gZm9yIGVhY2ggY2hhbm5lbFxuICAgICAgICAgIGlmICghYXhpc0NvbXBvbmVudFtjaGFubmVsXSkge1xuICAgICAgICAgICAgYXhpc0NvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VHcmlkR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgbGV0IGxlZ2VuZENvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LmxlZ2VuZCA9IHt9IGFzIERpY3Q8VmdMZWdlbmQ+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VMZWdlbmQoKTtcblxuICAgICAgLy8gVE9ETzogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBheGVzXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQubGVnZW5kKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICAvLyBqdXN0IHVzZSB0aGUgZmlyc3QgbGVnZW5kIGRlZmluaXRpb24gZm9yIGVhY2ggY2hhbm5lbFxuICAgICAgICAgIGlmICghbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdKSB7XG4gICAgICAgICAgICBsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQubGVnZW5kW2NoYW5uZWxdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFByZWZpeCB0cmF2ZXJzYWwg4oCTIHBhcmVudCBkYXRhIG1pZ2h0IGJlIHJlZmVycmVkIHRvIGJ5IGNoaWxkcmVuIGRhdGFcbiAgICBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFzc2VtYmxlRGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQb3N0Zml4IHRyYXZlcnNhbCDigJMgbGF5b3V0IGlzIGFzc2VtYmxlZCBib3R0b20tdXBcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFzc2VtYmxlTGF5b3V0KHRoaXMsIGxheW91dERhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTWFya3MoKTogYW55W10ge1xuICAgIC8vIG9ubHkgY2hpbGRyZW4gaGF2ZSBtYXJrc1xuICAgIHJldHVybiBmbGF0dGVuKHRoaXMuX2NoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcbiAgICAgIHJldHVybiBjaGlsZC5hc3NlbWJsZU1hcmtzKCk7XG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBwaW5nKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGlzTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjaGlsZCBlaXRoZXIgaGFzIG5vIHNvdXJjZSBkZWZpbmVkIG9yIHVzZXMgdGhlIHNhbWUgdXJsLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBrbm93IHdoZXRoZXIgaXQgaXMgcG9zc2libGUgdG8gbW92ZSBhIGZpbHRlciB1cC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gb25seSBiZSBjYWxsZWQgb25jZSB0aCBjaGlsZCBoYXMgYmVlbiBwYXJzZWQuXG4gICAqL1xuICBwdWJsaWMgY29tcGF0aWJsZVNvdXJjZShjaGlsZDogVW5pdE1vZGVsKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YSgpO1xuICAgIGNvbnN0IGNoaWxkRGF0YSA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgIGNvbnN0IGNvbXBhdGlibGUgPSAhY2hpbGREYXRhLnNvdXJjZSB8fCAoZGF0YSAmJiBkYXRhLnVybCA9PT0gY2hpbGREYXRhLnNvdXJjZS51cmwpO1xuICAgIHJldHVybiBjb21wYXRpYmxlO1xuICB9XG59XG4iLCJcbmltcG9ydCB7Q2hhbm5lbCwgWCwgWSwgUk9XLCBDT0xVTU59IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtMQVlPVVR9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBTdHJpbmdTZXR9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi9sYXllcic7XG5pbXBvcnQge1RFWFQgYXMgVEVYVE1BUkt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3Jhd0RvbWFpbn0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0Q29tcG9uZW50IHtcbiAgd2lkdGg6IFNpemVDb21wb25lbnQ7XG4gIGhlaWdodDogU2l6ZUNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaXplQ29tcG9uZW50IHtcbiAgLyoqIEZpZWxkIHRoYXQgd2UgbmVlZCB0byBjYWxjdWxhdGUgZGlzdGluY3QgKi9cbiAgZGlzdGluY3Q6IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2YgZm9ybXVsYXMgKi9cbiAgZm9ybXVsYTogRm9ybXVsYVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVMYXlvdXQobW9kZWw6IE1vZGVsLCBsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgY29uc3QgbGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmxheW91dDtcbiAgaWYgKCFsYXlvdXRDb21wb25lbnQud2lkdGggJiYgIWxheW91dENvbXBvbmVudC5oZWlnaHQpIHtcbiAgICByZXR1cm4gbGF5b3V0RGF0YTsgLy8gRG8gbm90aGluZ1xuICB9XG5cbiAgaWYgKHRydWUpIHsgLy8gaWYgYm90aCBhcmUgc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIGRhdGEgc291cmNlIGZvciB3aWR0aCBhbmQgZm9yIGhlaWdodFxuICAgIGNvbnN0IGRpc3RpbmN0RmllbGRzID0ga2V5cyhleHRlbmQobGF5b3V0Q29tcG9uZW50LndpZHRoLmRpc3RpbmN0LCBsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmRpc3RpbmN0KSk7XG4gICAgY29uc3QgZm9ybXVsYSA9IGxheW91dENvbXBvbmVudC53aWR0aC5mb3JtdWxhLmNvbmNhdChsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmZvcm11bGEpXG4gICAgICAubWFwKGZ1bmN0aW9uKGZvcm11bGEpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7dHlwZTogJ2Zvcm11bGEnfSwgZm9ybXVsYSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBbXG4gICAgICBkaXN0aW5jdEZpZWxkcy5sZW5ndGggPiAwID8ge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAgIHN1bW1hcml6ZTogZGlzdGluY3RGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGZpZWxkOiBmaWVsZCwgb3BzOiBbJ2Rpc3RpbmN0J10gfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfV0uY29uY2F0KGZvcm11bGEpXG4gICAgICB9IDoge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICB2YWx1ZXM6IFt7fV0sXG4gICAgICAgIHRyYW5zZm9ybTogZm9ybXVsYVxuICAgICAgfVxuICAgIF07XG4gIH1cbiAgLy8gRklYTUU6IGltcGxlbWVudFxuICAvLyBvdGhlcndpc2UsIHdlIG5lZWQgdG8gam9pbiB3aWR0aCBhbmQgaGVpZ2h0IChjcm9zcylcbn1cblxuLy8gRklYTUU6IGZvciBuZXN0aW5nIHggYW5kIHksIHdlIG5lZWQgdG8gZGVjbGFyZSB4LHkgbGF5b3V0IHNlcGFyYXRlbHkgYmVmb3JlIGpvaW5pbmcgbGF0ZXJcbi8vIEZvciBub3csIGxldCdzIGFsd2F5cyBhc3N1bWUgc2hhcmVkIHNjYWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0TGF5b3V0KG1vZGVsOiBVbml0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZVVuaXRTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICAvLyBUT0RPOiB0aGluayBhYm91dCB3aGV0aGVyIHRoaXMgY29uZmlnIGhhcyB0byBiZSB0aGUgY2VsbCBvciBmYWNldCBjZWxsIGNvbmZpZ1xuICBjb25zdCBjZWxsQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuY2VsbDtcbiAgY29uc3Qgbm9uT3JkaW5hbFNpemUgPSBjaGFubmVsID09PSBYID8gY2VsbENvbmZpZy53aWR0aCA6IGNlbGxDb25maWcuaGVpZ2h0O1xuXG4gIHJldHVybiB7XG4gICAgZGlzdGluY3Q6IGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSxcbiAgICBmb3JtdWxhOiBbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IHVuaXRTaXplRXhwcihtb2RlbCwgY2hhbm5lbCwgbm9uT3JkaW5hbFNpemUpXG4gICAgfV1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5pdFNpemVFeHByKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIG5vbk9yZGluYWxTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAobW9kZWwuc2NhbGUoY2hhbm5lbCkpIHtcbiAgICBpZiAobW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICByZXR1cm4gJygnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKSArXG4gICAgICAgICcgKyAnICsgc2NhbGUucGFkZGluZyArXG4gICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVE1BUksgJiYgY2hhbm5lbCA9PT0gWCkge1xuICAgICAgLy8gZm9yIHRleHQgdGFibGUgd2l0aG91dCB4L3kgc2NhbGUgd2UgbmVlZCB3aWRlciBiYW5kU2l6ZVxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLnRleHRCYW5kV2lkdGggKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplICsgJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXRMYXlvdXQobW9kZWw6IEZhY2V0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbCwgQ09MVU1OKSxcbiAgICBoZWlnaHQ6IHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsLCBST1cpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIGNvbnN0IGNoaWxkTGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQubGF5b3V0O1xuICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFJPVyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gIGlmICh0cnVlKSB7IC8vIGFzc3VtZSBzaGFyZWQgc2NhbGVcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gZXh0ZW5kKGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSwgY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0KTtcbiAgICBjb25zdCBmb3JtdWxhID0gY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGEuY29uY2F0KFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogZmFjZXRTaXplRm9ybXVsYShtb2RlbCwgY2hhbm5lbCwgbW9kZWwuY2hpbGQoKS5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCkpXG4gICAgfV0pO1xuXG4gICAgZGVsZXRlIGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgICAgZm9ybXVsYTogZm9ybXVsYVxuICAgIH07XG4gIH1cbiAgLy8gRklYTUUgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlIGFzIHdlbGxcbiAgLy8gVE9ETzogLSBhbHNvIGNvbnNpZGVyIHdoZW4gY2hpbGRyZW4gaGF2ZSBkaWZmZXJlbnQgZGF0YSBzb3VyY2Vcbn1cblxuZnVuY3Rpb24gZmFjZXRTaXplRm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGlubmVyU2l6ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gJyhkYXR1bS4nICsgaW5uZXJTaXplICsgJyArICcgKyBzY2FsZS5wYWRkaW5nICsgJyknICsgJyAqICcgKyBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWwsIGNoYW5uZWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnZGF0dW0uJyArIGlubmVyU2l6ZSArICcgKyAnICsgbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZzsgLy8gbmVlZCB0byBhZGQgb3V0ZXIgcGFkZGluZyBmb3IgZmFjZXRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllckxheW91dChtb2RlbDogTGF5ZXJNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBZKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbDogTGF5ZXJNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICBpZiAodHJ1ZSkge1xuICAgIC8vIEZvciBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgdGhlIGxheW91dCBpbnRvIG9uZSBkYXRhIHNvdXJjZVxuICAgIC8vIFRPRE86IGRvbid0IGp1c3QgdGFrZSB0aGUgbGF5b3V0IGZyb20gdGhlIGZpcnN0IGNoaWxkXG5cbiAgICBjb25zdCBjaGlsZExheW91dENvbXBvbmVudCA9IG1vZGVsLmNoaWxkcmVuKClbMF0uY29tcG9uZW50LmxheW91dDtcbiAgICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gICAgY29uc3QgZGlzdGluY3QgPSBjaGlsZFNpemVDb21wb25lbnQuZGlzdGluY3Q7XG4gICAgY29uc3QgZm9ybXVsYSA9IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGFbMF0uZXhwclxuICAgIH1dO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5sYXlvdXRbc2l6ZVR5cGVdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICAgIGZvcm11bGE6IGZvcm11bGFcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3RpbmN0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFN0cmluZ1NldCB7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiAhKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgLy8gaWYgZXhwbGljaXQgZG9tYWluIGlzIGRlY2xhcmVkLCB1c2UgYXJyYXkgbGVuZ3RoXG4gICAgICBjb25zdCBkaXN0aW5jdEZpZWxkID0gbW9kZWwuZmllbGQoY2hhbm5lbCk7XG4gICAgICBsZXQgZGlzdGluY3Q6IFN0cmluZ1NldCA9IHt9O1xuICAgICAgZGlzdGluY3RbZGlzdGluY3RGaWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGRpc3RpbmN0O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge307XG59XG5cbi8vIFRPRE86IHJlbmFtZSB0byBjYXJkaW5hbGl0eUV4cHJcbmZ1bmN0aW9uIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbi5sZW5ndGg7XG4gIH1cblxuICBjb25zdCB0aW1lVW5pdCA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnRpbWVVbml0O1xuICBjb25zdCB0aW1lVW5pdERvbWFpbiA9IHRpbWVVbml0ID8gcmF3RG9tYWluKHRpbWVVbml0LCBjaGFubmVsKSA6IG51bGw7XG5cbiAgcmV0dXJuIHRpbWVVbml0RG9tYWluICE9PSBudWxsID8gdGltZVVuaXREb21haW4ubGVuZ3RoIDpcbiAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcbn1cbiIsImltcG9ydCB7Q09MT1IsIFNJWkUsIFNIQVBFLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZFRpdGxlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0FSRUEsIEJBUiwgVElDSywgVEVYVCwgTElORSwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7T1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHdpdGhvdXQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHLCBudW1iZXJGb3JtYXQsIHRpbWVUZW1wbGF0ZX0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtDT0xPUl9MRUdFTkQsIENPTE9SX0xFR0VORF9MQUJFTH0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcbmltcG9ydCB7VmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMZWdlbmRDb21wb25lbnQobW9kZWw6IFVuaXRNb2RlbCk6IERpY3Q8VmdMZWdlbmQ+IHtcbiAgcmV0dXJuIFtDT0xPUiwgU0laRSwgU0hBUEVdLnJlZHVjZShmdW5jdGlvbihsZWdlbmRDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICBpZiAobW9kZWwubGVnZW5kKGNoYW5uZWwpKSB7XG4gICAgICBsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0gPSBwYXJzZUxlZ2VuZChtb2RlbCwgY2hhbm5lbCk7XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmRDb21wb25lbnQ7XG4gIH0sIHt9IGFzIERpY3Q8VmdMZWdlbmQ+KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGVnZW5kRGVmV2l0aFNjYWxlKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBWZ0xlZ2VuZCB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKENPTE9SKTtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGVOYW1lKHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWYpID9cbiAgICAgICAgLy8gVG8gcHJvZHVjZSBvcmRpbmFsIGxlZ2VuZCAobGlzdCwgcmF0aGVyIHRoYW4gbGluZWFyIHJhbmdlKSB3aXRoIGNvcnJlY3QgbGFiZWxzOlxuICAgICAgICAvLyAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlc1xuICAgICAgICAvLyAtIEZvciBhIGZpZWxkIHdpdGggYmluIG9yIHRpbWVVbml0LCBwcm92aWRlIGFuIGlkZW50aXR5IG9yZGluYWwgc2NhbGVcbiAgICAgICAgLy8gKG1hcHBpbmcgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVtc2VsdmVzKVxuICAgICAgICBDT0xPUl9MRUdFTkQgOlxuICAgICAgICBDT0xPUlxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkID8geyBmaWxsOiBzY2FsZSB9IDogeyBzdHJva2U6IHNjYWxlIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHsgc2l6ZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7IHNoYXBlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogVmdMZWdlbmQge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG4gIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gIGxldCBkZWY6IFZnTGVnZW5kID0gZ2V0TGVnZW5kRGVmV2l0aFNjYWxlKG1vZGVsLCBjaGFubmVsKTtcblxuICAvLyAxLjEgQWRkIHByb3BlcnRpZXMgd2l0aCBzcGVjaWFsIHJ1bGVzXG4gIGRlZi50aXRsZSA9IHRpdGxlKGxlZ2VuZCwgZmllbGREZWYpO1xuICBjb25zdCBmb3JtYXQgPSBudW1iZXJGb3JtYXQoZmllbGREZWYsIGxlZ2VuZC5mb3JtYXQsIGNvbmZpZyk7XG4gIGlmIChmb3JtYXQpIHtcbiAgICBkZWYuZm9ybWF0ID0gZm9ybWF0O1xuICB9XG5cbiAgLy8gMS4yIEFkZCBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXNcbiAgWydvZmZzZXQnLCAnb3JpZW50JywgJ3ZhbHVlcyddLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxlZ2VuZFtwcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQucHJvcGVydGllcykgfHwge307XG4gIFsndGl0bGUnLCAnc3ltYm9scycsICdsZWdlbmQnLCAnbGFiZWxzJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGxldCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKGZpZWxkRGVmLCBwcm9wc1tncm91cF0sIG1vZGVsLCBjaGFubmVsKSA6IC8vIGFwcGx5IHJ1bGVcbiAgICAgIHByb3BzW2dyb3VwXTsgLy8gbm8gcnVsZSAtLSBqdXN0IGRlZmF1bHQgdmFsdWVzXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGxlZ2VuZDogTGVnZW5kLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgaWYgKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQudGl0bGUpIHtcbiAgICByZXR1cm4gbGVnZW5kLnRpdGxlO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkVGl0bGUoZmllbGREZWYpO1xufVxuXG4vLyB3ZSBoYXZlIHRvIHVzZSBzcGVjaWFsIHNjYWxlcyBmb3Igb3JkaW5hbCBvciBiaW5uZWQgZmllbGRzIGZvciB0aGUgY29sb3IgY2hhbm5lbFxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi50eXBlID09PSBPUkRJTkFMIHx8IGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbHMoZmllbGREZWY6IEZpZWxkRGVmLCBzeW1ib2xzU3BlYywgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGxldCBzeW1ib2xzOmFueSA9IHt9O1xuICAgIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgc3dpdGNoIChtYXJrKSB7XG4gICAgICBjYXNlIEJBUjpcbiAgICAgIGNhc2UgVElDSzpcbiAgICAgIGNhc2UgVEVYVDpcbiAgICAgICAgc3ltYm9scy5zaGFwZSA9IHt2YWx1ZTogJ3NxdWFyZSd9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0lSQ0xFOlxuICAgICAgY2FzZSBTUVVBUkU6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7IHZhbHVlOiBtYXJrIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQT0lOVDpcbiAgICAgIGNhc2UgTElORTpcbiAgICAgIGNhc2UgQVJFQTpcbiAgICAgICAgLy8gdXNlIGRlZmF1bHQgY2lyY2xlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuXG5cbiAgICBsZXQgY29uZmlnID0gY2hhbm5lbCA9PT0gQ09MT1IgP1xuICAgICAgICAvKiBGb3IgY29sb3IncyBsZWdlbmQsIGRvIG5vdCBzZXQgZmlsbCAod2hlbiBmaWxsZWQpIG9yIHN0cm9rZSAod2hlbiB1bmZpbGxlZCkgcHJvcGVydHkgZnJvbSBjb25maWcgYmVjYXVzZSB0aGUgdGhlIGxlZ2VuZCdzIGBmaWxsYCBvciBgc3Ryb2tlYCBzY2FsZSBzaG91bGQgaGF2ZSBwcmVjZWRlbmNlICovXG4gICAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbIGZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnLCAnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pIDpcbiAgICAgICAgLyogRm9yIG90aGVyIGxlZ2VuZCwgbm8gbmVlZCB0byBvbWl0LiAqL1xuICAgICAgICAgd2l0aG91dChGSUxMX1NUUk9LRV9DT05GSUcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgY29uZmlnID0gd2l0aG91dChjb25maWcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHN5bWJvbHMsIG1vZGVsLCBjb25maWcpO1xuXG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IDAgfTtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIGlmICh1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSkge1xuICAgICAgICAvLyBmb3IgY29sb3IgbGVnZW5kIHNjYWxlLCB3ZSBuZWVkIHRvIG92ZXJyaWRlXG4gICAgICAgIHZhbHVlID0geyBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSwgZmllbGQ6ICdkYXRhJyB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSB9O1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgdmFsdWVcbiAgICAgIGlmIChmaWxsZWQpIHtcbiAgICAgICAgc3ltYm9scy5maWxsID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2xzLnN0cm9rZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCAhPT0gQ09MT1IpIHtcbiAgICAgIC8vIEZvciBub24tY29sb3IgbGVnZW5kLCBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWcuXG4gICAgICAvLyAoRm9yIGNvbG9yLCBkbyBub3Qgb3ZlcnJpZGUgc2NhbGUgc3BlY2lmaWVkISlcbiAgICAgIHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gc3ltYm9sc1tmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgICAge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLmNvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuZmlsbCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbENvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFNoYXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTaGFwZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2l6ZSA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFNpemV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU3Ryb2tlV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFN0cm9rZVdpZHRofTtcbiAgICB9XG5cbiAgICBzeW1ib2xzID0gZXh0ZW5kKHN5bWJvbHMsIHN5bWJvbHNTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHN5bWJvbHMpLmxlbmd0aCA+IDAgPyBzeW1ib2xzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhmaWVsZERlZjogRmllbGREZWYsIGxhYmVsc1NwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBsZXQgbGFiZWxzOmFueSA9IHt9O1xuXG4gICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORCksXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EX0xBQkVMKSxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGltZVRlbXBsYXRlKCdkYXR1bS5kYXRhJywgZmllbGREZWYudGltZVVuaXQsIGxlZ2VuZC5mb3JtYXQsIGxlZ2VuZC5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZylcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxBbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuYWxpZ24gPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEFsaWdufTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLnN0cm9rZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5mb250ID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmZvbnRTaXplID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250U2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEJhc2VsaW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5iYXNlbGluZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQmFzZWxpbmV9O1xuICAgIH1cblxuICAgIGxhYmVscyA9IGV4dGVuZChsYWJlbHMsIGxhYmVsc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMobGFiZWxzKS5sZW5ndGggPiAwID8gbGFiZWxzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZiwgdGl0bGVTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgbGV0IHRpdGxlczphbnkgPSB7fTtcblxuICAgIGlmIChsZWdlbmQudGl0bGVDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuc3Ryb2tlID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnQgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnR9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFNpemUgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnRTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFdlaWdodCA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udFdlaWdodH07XG4gICAgfVxuXG4gICAgdGl0bGVzID0gZXh0ZW5kKHRpdGxlcywgdGl0bGVTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHRpdGxlcykubGVuZ3RoID4gMCA/IHRpdGxlcyA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7WCwgWX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2lzRGltZW5zaW9uLCBpc01lYXN1cmUsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTdGFja1Byb3BlcnRpZXN9IGZyb20gJy4uLy4uL3N0YWNrJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgYXBwbHlNYXJrQ29uZmlnfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGFyZWEge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdhcmVhJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBjb25zdCBvcmllbnQgPSBjb25maWcubWFyay5vcmllbnQ7XG4gICAgaWYgKG9yaWVudCkge1xuICAgICAgcC5vcmllbnQgPSB7IHZhbHVlOiBvcmllbnR9IDtcbiAgICB9XG5cbiAgICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gICAgY29uc3QgX3ggPSB4KG1vZGVsLmVuY29kaW5nKCkueCwgbW9kZWwuc2NhbGVOYW1lKFgpLCBvcmllbnQsIHN0YWNrKTtcbiAgICBpZiAoX3gpIHtcbiAgICAgIHAueCA9IF94O1xuICAgIH1cblxuICAgIGNvbnN0IF95ID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgb3JpZW50LCBzdGFjayk7XG4gICAgaWYgKF95KSB7XG4gICAgICBwLnkgPSBfeTtcbiAgICB9XG5cbiAgICBjb25zdCBfeDIgPSB4Mihtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLmVuY29kaW5nKCkueDIsIG1vZGVsLnNjYWxlTmFtZShYKSwgb3JpZW50LCBzdGFjayk7XG4gICAgaWYgKF94Mikge1xuICAgICAgcC54MiA9IF94MjtcbiAgICB9XG5cbiAgICBjb25zdCBfeTIgPSB5Mihtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLmVuY29kaW5nKCkueTIsIG1vZGVsLnNjYWxlTmFtZShZKSwgb3JpZW50LCBzdGFjayk7XG4gICAgaWYgKF95Mikge1xuICAgICAgcC55MiA9IF95MjtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBvcmllbnQ6IHN0cmluZywgc3RhY2s6IFN0YWNrUHJvcGVydGllcyk6IFZnVmFsdWVSZWYge1xuICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZShmaWVsZERlZikpIHsgLy8gTWVhc3VyZVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIC8vIHhcbiAgICAgICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgyKHhGaWVsZERlZjogRmllbGREZWYsIHgyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBzdHJpbmcsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHhGaWVsZERlZiwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKHgyRmllbGREZWYpKSB7IC8vIE1lYXN1cmVcbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBpZiAoeDJGaWVsZERlZiAmJiB4MkZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoeDJGaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBvcmllbnQ6IHN0cmluZywgc3RhY2s6IFN0YWNrUHJvcGVydGllcyk6IFZnVmFsdWVSZWYge1xuICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZShmaWVsZERlZikpIHtcbiAgICAgIGlmIChvcmllbnQgIT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyB5XG4gICAgICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi5maWVsZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHkyKHlGaWVsZERlZjogRmllbGREZWYsIHkyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBzdHJpbmcsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgaWYgKG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoeUZpZWxkRGVmLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoeUZpZWxkRGVmKSkge1xuICAgICAgaWYgKG9yaWVudCAhPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIC8vIHkyXG4gICAgICAgIGlmICh5MkZpZWxkRGVmICYmIHkyRmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZCh5MkZpZWxkRGVmKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgWDIsIFkyLCBTSVpFLCBDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7aXNNZWFzdXJlfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYmFyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncmVjdCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgY29uc3Qgb3JpZW50ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQ7XG5cbiAgICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gICAgY29uc3QgeEZpZWxkRGVmID0gbW9kZWwuZW5jb2RpbmcoKS54O1xuICAgIGNvbnN0IHgyRmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLngyO1xuXG4gICAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZSh4RmllbGREZWYpIHx8IGlzTWVhc3VyZSh4MkZpZWxkRGVmKTtcblxuICAgIC8vIHgsIHgyLCBhbmQgd2lkdGggLS0gd2UgbXVzdCBzcGVjaWZ5IHR3byBvZiB0aGVzZSBpbiBhbGwgY29uZGl0aW9uc1xuICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICAgIC8vICd4JyBpcyBhIHN0YWNrZWQgbWVhc3VyZSwgdGh1cyB1c2UgPGZpZWxkPl9zdGFydCBhbmQgPGZpZWxkPl9lbmQgZm9yIHgsIHgyLlxuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC54MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh4SXNNZWFzdXJlKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICAgIHAueCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAueCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwuaGFzKFgyKSkge1xuICAgICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgyKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgfTtcbiAgICAgICAgcC53aWR0aCA9IHt2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBYKX07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihYKS5iaW4pIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ICE9PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgLy8gRm9yIHZlcnRpY2FsIGNoYXJ0IHRoYXQgaGFzIGJpbm5lZCBYIGFuZCBzaXplLFxuICAgICAgICAvLyBjZW50ZXIgYmFyIGFuZCBhcHBseSBzaXplIHRvIHdpZHRoLlxuICAgICAgICBwLnhjID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC53aWR0aCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgICBvZmZzZXQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8geCBpcyBkaW1lbnNpb24gb3IgdW5zcGVjaWZpZWRcbiAgICAgIGlmIChtb2RlbC5oYXMoWCkpIHsgLy8gaXMgb3JkaW5hbFxuICAgICAgIHAueGMgPSB7XG4gICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgfTtcbiAgICAgfSBlbHNlIHsgLy8gbm8geFxuICAgICAgICBwLnggPSB7IHZhbHVlOiAwLCBvZmZzZXQ6IDIgfTtcbiAgICAgIH1cblxuICAgICAgcC53aWR0aCA9IG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgIT09ICdob3Jpem9udGFsJyA/IHtcbiAgICAgICAgICAvLyBhcHBseSBzaXplIHNjYWxlIGlmIGhhcyBzaXplIGFuZCBpcyB2ZXJ0aWNhbCAoZXhwbGljaXQgXCJ2ZXJ0aWNhbFwiIG9yIHVuZGVmaW5lZClcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIC8vIG90aGVyd2lzZSwgdXNlIGZpeGVkIHNpemVcbiAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCAoWCkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgeUZpZWxkRGVmID0gbW9kZWwuZW5jb2RpbmcoKS55O1xuICAgIGNvbnN0IHkyRmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLnkyO1xuXG4gICAgY29uc3QgeUlzTWVhc3VyZSA9IGlzTWVhc3VyZSh5RmllbGREZWYpIHx8IGlzTWVhc3VyZSh5MkZpZWxkRGVmKTtcbiAgICAvLyB5LCB5MiAmIGhlaWdodCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyB5IGlzIHN0YWNrZWQgbWVhc3VyZVxuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh5SXNNZWFzdXJlKSB7XG4gICAgICBpZiAob3JpZW50ICE9PSAnaG9yaXpvbnRhbCcpIHsgLy8gdmVydGljYWwgKGV4cGxpY2l0ICd2ZXJ0aWNhbCcgb3IgdW5kZWZpbmVkKVxuICAgICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgICAgcC55ID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC55ID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbC5oYXMoWTIpKSB7XG4gICAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWTIpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwLnkyID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWSkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFkpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyBGb3IgaG9yaXpvbnRhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWSBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byBoZWlnaHQuXG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW1wbHkgdXNlIDxmaWVsZD5fc3RhcnQsIDxmaWVsZD5fZW5kXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHkgaXMgb3JkaW5hbCBvciB1bnNwZWNpZmllZFxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gTm8gWVxuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9LFxuICAgICAgICAgIG9mZnNldDogLTFcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcC5oZWlnaHQgPSBtb2RlbC5oYXMoU0laRSkgICYmIG9yaWVudCA9PT0gJ2hvcml6b250YWwnID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIGhvcml6b250YWxcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZVZhbHVlKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFNJWkUpO1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIGZpZWxkRGVmLnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtDb25maWcgPSBtb2RlbC5jb25maWcoKS5tYXJrO1xuICAgIGlmIChtYXJrQ29uZmlnLmJhclNpemUpIHtcbiAgICAgIHJldHVybiBtYXJrQ29uZmlnLmJhclNpemU7XG4gICAgfVxuICAgIC8vIEJBUidzIHNpemUgaXMgYXBwbGllZCBvbiBlaXRoZXIgWCBvciBZXG4gICAgcmV0dXJuIG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpID9cbiAgICAgICAgLy8gRm9yIG9yZGluYWwgc2NhbGUgb3Igc2luZ2xlIGJhciwgd2UgY2FuIHVzZSBiYW5kU2l6ZSAtIDFcbiAgICAgICAgLy8gKC0xIHNvIHRoYXQgdGhlIGJvcmRlciBvZiB0aGUgYmFyIGZhbGxzIG9uIGV4YWN0IHBpeGVsKVxuICAgICAgICBtb2RlbC5zY2FsZShjaGFubmVsKS5iYW5kU2l6ZSAtIDEgOlxuICAgICAgIW1vZGVsLmhhcyhjaGFubmVsKSA/XG4gICAgICAgIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIC0gMSA6XG4gICAgICAgIC8vIG90aGVyd2lzZSwgc2V0IHRvIHRoaW5CYXJXaWR0aCBieSBkZWZhdWx0XG4gICAgICAgIG1hcmtDb25maWcuYmFyVGhpblNpemU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCM2NCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFl9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBsaW5lIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnbGluZSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBjb25zdCBfc2l6ZSA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBjb25maWcpO1xuICAgIGlmIChfc2l6ZSkgeyBwLnN0cm9rZVdpZHRoID0gX3NpemU7IH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFsnaW50ZXJwb2xhdGUnLCAndGVuc2lvbiddKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoZmllbGREZWY6IEZpZWxkRGVmLCBjb25maWc6IENvbmZpZykge1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLmxpbmVTaXplIH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0hBUEUsIFBBVEgsIE9SREVSLCBPUEFDSVRZLCBERVRBSUwsIExBQkVMLCBTVEFDS19HUk9VUF9DSEFOTkVMU30gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2hhc30gZnJvbSAnLi4vLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtPcmRlckNoYW5uZWxEZWYsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtBUkVBLCBMSU5FLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi8uLi9tYXJrJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIGlzQXJyYXl9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1N0YWNrVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXJlYX0gZnJvbSAnLi9hcmVhJztcbmltcG9ydCB7YmFyfSBmcm9tICcuL2Jhcic7XG5pbXBvcnQge3NvcnRGaWVsZH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7bGluZX0gZnJvbSAnLi9saW5lJztcbmltcG9ydCB7cG9pbnQsIGNpcmNsZSwgc3F1YXJlfSBmcm9tICcuL3BvaW50JztcbmltcG9ydCB7cnVsZX0gZnJvbSAnLi9ydWxlJztcbmltcG9ydCB7dGV4dH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB7dGlja30gZnJvbSAnLi90aWNrJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuY29uc3QgbWFya0NvbXBpbGVyID0ge1xuICBhcmVhOiBhcmVhLFxuICBiYXI6IGJhcixcbiAgbGluZTogbGluZSxcbiAgcG9pbnQ6IHBvaW50LFxuICB0ZXh0OiB0ZXh0LFxuICB0aWNrOiB0aWNrLFxuICBydWxlOiBydWxlLFxuICBjaXJjbGU6IGNpcmNsZSxcbiAgc3F1YXJlOiBzcXVhcmVcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hcmsobW9kZWw6IFVuaXRNb2RlbCk6IGFueVtdIHtcbiAgaWYgKGNvbnRhaW5zKFtMSU5FLCBBUkVBXSwgbW9kZWwubWFyaygpKSkge1xuICAgIHJldHVybiBwYXJzZVBhdGhNYXJrKG1vZGVsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGFyc2VOb25QYXRoTWFyayhtb2RlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQYXRoTWFyayhtb2RlbDogVW5pdE1vZGVsKSB7IC8vIFRPRE86IGV4dHJhY3QgdGhpcyBpbnRvIGNvbXBpbGVQYXRoTWFya1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICAvLyBUT0RPOiByZXBsYWNlIHRoaXMgd2l0aCBtb3JlIGdlbmVyYWwgY2FzZSBmb3IgY29tcG9zaXRpb25cbiAgY29uc3QgaXNGYWNldGVkID0gbW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpO1xuICBjb25zdCBkYXRhRnJvbSA9IHtkYXRhOiBtb2RlbC5kYXRhVGFibGUoKX07XG4gIGNvbnN0IGRldGFpbHMgPSBkZXRhaWxGaWVsZHMobW9kZWwpO1xuXG4gIGxldCBwYXRoTWFya3M6IGFueSA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdtYXJrcycpLFxuICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKCksXG4gICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gSWYgaGFzIHN1YmZhY2V0IGZvciBsaW5lL2FyZWEgZ3JvdXAsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIG91dGVyIHN1YmZhY2V0IGdyb3VwIGJlbG93LlxuICAgICAgICAvLyBJZiBoYXMgbm8gc3ViZmFjZXQsIGFkZCBmcm9tLmRhdGEuXG4gICAgICAgIGlzRmFjZXRlZCB8fCBkZXRhaWxzLmxlbmd0aCA+IDAgPyB7fSA6IGRhdGFGcm9tLFxuXG4gICAgICAgIC8vIHNvcnQgdHJhbnNmb3JtXG4gICAgICAgIHt0cmFuc2Zvcm06IFt7IHR5cGU6ICdzb3J0JywgYnk6IHNvcnRQYXRoQnkobW9kZWwpfV19XG4gICAgICApLFxuICAgICAgcHJvcGVydGllczogeyB1cGRhdGU6IG1hcmtDb21waWxlclttYXJrXS5wcm9wZXJ0aWVzKG1vZGVsKSB9XG4gICAgfVxuICBdO1xuXG4gIGlmIChkZXRhaWxzLmxlbmd0aCA+IDApIHsgLy8gaGF2ZSBsZXZlbCBvZiBkZXRhaWxzIC0gbmVlZCB0byBmYWNldCBsaW5lIGludG8gc3ViZ3JvdXBzXG4gICAgY29uc3QgZmFjZXRUcmFuc2Zvcm0gPSB7IHR5cGU6ICdmYWNldCcsIGdyb3VwYnk6IGRldGFpbHMgfTtcbiAgICBjb25zdCB0cmFuc2Zvcm06IGFueVtdID0gbWFyayA9PT0gQVJFQSAmJiBtb2RlbC5zdGFjaygpID9cbiAgICAgIC8vIEZvciBzdGFja2VkIGFyZWEsIHdlIG5lZWQgdG8gaW1wdXRlIG1pc3NpbmcgdHVwbGVzIGFuZCBzdGFjayB2YWx1ZXNcbiAgICAgIC8vIChNYXJrIGxheWVyIG9yZGVyIGRvZXMgbm90IG1hdHRlciBmb3Igc3RhY2tlZCBjaGFydHMpXG4gICAgICBzdGFja1RyYW5zZm9ybXMobW9kZWwsIHRydWUpLmNvbmNhdChmYWNldFRyYW5zZm9ybSkgOlxuICAgICAgLy8gRm9yIG5vbi1zdGFja2VkIHBhdGggKGxpbmUvYXJlYSksIHdlIG5lZWQgdG8gZmFjZXQgYW5kIHBvc3NpYmx5IHNvcnRcbiAgICAgIFtdLmNvbmNhdChcbiAgICAgICAgZmFjZXRUcmFuc2Zvcm0sXG4gICAgICAgIC8vIGlmIG1vZGVsIGhhcyBgb3JkZXJgLCB0aGVuIHNvcnQgbWFyaydzIGxheWVyIG9yZGVyIGJ5IGBvcmRlcmAgZmllbGQocylcbiAgICAgICAgbW9kZWwuaGFzKE9SREVSKSA/IFt7dHlwZTonc29ydCcsIGJ5OiBzb3J0QnkobW9kZWwpfV0gOiBbXVxuICAgICAgKTtcblxuICAgIHJldHVybiBbe1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgncGF0aGdyb3VwJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmUuXG4gICAgICAgIGlzRmFjZXRlZCA/IHt9IDogZGF0YUZyb20sXG4gICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zZm9ybX1cbiAgICAgICksXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgICAgICBoZWlnaHQ6IHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFya3M6IHBhdGhNYXJrc1xuICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXRoTWFya3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VOb25QYXRoTWFyayhtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gIGNvbnN0IGlzRmFjZXRlZCA9IG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuXG4gIGxldCBtYXJrcyA9IFtdOyAvLyBUT0RPOiB2Z01hcmtzXG4gIGlmIChtYXJrID09PSBURVhUTUFSSyAmJlxuICAgIG1vZGVsLmhhcyhDT0xPUikgJiZcbiAgICBtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpXG4gICkge1xuICAgIC8vIGFkZCBiYWNrZ3JvdW5kIHRvICd0ZXh0JyBtYXJrcyBpZiBoYXMgY29sb3JcbiAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgbmFtZTogbW9kZWwubmFtZSgnYmFja2dyb3VuZCcpLFxuICAgICAgICB0eXBlOiAncmVjdCdcbiAgICAgIH0sXG4gICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgLy8gUHJvcGVydGllc1xuICAgICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogdGV4dC5iYWNrZ3JvdW5kKG1vZGVsKSB9IH1cbiAgICApKTtcbiAgfVxuXG4gIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ21hcmtzJyksXG4gICAgICB0eXBlOiBtYXJrQ29tcGlsZXJbbWFya10ubWFya1R5cGUoKVxuICAgIH0sXG4gICAgLy8gQWRkIGBmcm9tYCBpZiBuZWVkZWRcbiAgICAoIWlzRmFjZXRlZCB8fCBtb2RlbC5zdGFjaygpIHx8IG1vZGVsLmhhcyhPUkRFUikpID8ge1xuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBmYWNldGVkLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlXG4gICAgICAgIGlzRmFjZXRlZCA/IHt9IDogZGF0YUZyb20sXG4gICAgICAgIC8vIGBmcm9tLnRyYW5zZm9ybWBcbiAgICAgICAgbW9kZWwuc3RhY2soKSA/IC8vIFN0YWNrZWQgQ2hhcnQgbmVlZCBzdGFjayB0cmFuc2Zvcm1cbiAgICAgICAgICB7IHRyYW5zZm9ybTogc3RhY2tUcmFuc2Zvcm1zKG1vZGVsLCBmYWxzZSkgfSA6XG4gICAgICAgIG1vZGVsLmhhcyhPUkRFUikgP1xuICAgICAgICAgIC8vIGlmIG5vbi1zdGFja2VkLCBkZXRhaWwgZmllbGQgZGV0ZXJtaW5lcyB0aGUgbGF5ZXIgb3JkZXIgb2YgZWFjaCBtYXJrXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IFt7dHlwZTonc29ydCcsIGJ5OiBzb3J0QnkobW9kZWwpfV0gfSA6XG4gICAgICAgICAge31cbiAgICAgIClcbiAgICB9IDoge30sXG4gICAgLy8gcHJvcGVydGllcyBncm91cHNcbiAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfSB9XG4gICkpO1xuXG4gIGlmIChtb2RlbC5oYXMoTEFCRUwpICYmIG1hcmtDb21waWxlclttYXJrXS5sYWJlbHMpIHtcbiAgICBjb25zdCBsYWJlbFByb3BlcnRpZXMgPSBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKG1vZGVsKTtcblxuICAgIC8vIGNoZWNrIGlmIHdlIGhhdmUgbGFiZWwgbWV0aG9kIGZvciBjdXJyZW50IG1hcmsgdHlwZS5cbiAgICBpZiAobGFiZWxQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHsgLy8gSWYgbGFiZWwgaXMgc3VwcG9ydGVkXG4gICAgICAvLyBhZGQgbGFiZWwgZ3JvdXBcbiAgICAgIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogbW9kZWwubmFtZSgnbGFiZWwnKSxcbiAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgfSxcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IHtmcm9tOiBkYXRhRnJvbX0sXG4gICAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbGFiZWxQcm9wZXJ0aWVzIH0gfVxuICAgICAgKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hcmtzO1xufVxuXG5mdW5jdGlvbiBzb3J0QnkobW9kZWw6IFVuaXRNb2RlbCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgaWYgKG1vZGVsLmhhcyhPUkRFUikpIHtcbiAgICBsZXQgY2hhbm5lbERlZiA9IG1vZGVsLmVuY29kaW5nKCkub3JkZXI7XG4gICAgaWYgKGNoYW5uZWxEZWYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gc29ydCBieSBtdWx0aXBsZSBmaWVsZHNcbiAgICAgIHJldHVybiBjaGFubmVsRGVmLm1hcChzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzb3J0IGJ5IG9uZSBmaWVsZFxuICAgICAgcmV0dXJuIHNvcnRGaWVsZChjaGFubmVsRGVmIGFzIE9yZGVyQ2hhbm5lbERlZik7IC8vIGhhdmUgdG8gYWRkIE9yZGVyQ2hhbm5lbERlZiB0byBtYWtlIHRzaWZ5IG5vdCBjb21wbGFpbmluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDsgLy8gdXNlIGRlZmF1bHQgb3JkZXJcbn1cblxuLyoqXG4gKiBSZXR1cm4gcGF0aCBvcmRlciBmb3Igc29ydCB0cmFuc2Zvcm0ncyBieSBwcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBzb3J0UGF0aEJ5KG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5tYXJrKCkgPT09IExJTkUgJiYgbW9kZWwuaGFzKFBBVEgpKSB7XG4gICAgLy8gRm9yIG9ubHkgbGluZSwgc29ydCBieSB0aGUgcGF0aCBmaWVsZCBpZiBpdCBpcyBzcGVjaWZpZWQuXG4gICAgY29uc3QgY2hhbm5lbERlZiA9IG1vZGVsLmVuY29kaW5nKCkucGF0aDtcbiAgICBpZiAoY2hhbm5lbERlZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAvLyBzb3J0IGJ5IG11bHRpcGxlIGZpZWxkc1xuICAgICAgcmV0dXJuIGNoYW5uZWxEZWYubWFwKHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNvcnQgYnkgb25lIGZpZWxkXG4gICAgICByZXR1cm4gc29ydEZpZWxkKGNoYW5uZWxEZWYgYXMgT3JkZXJDaGFubmVsRGVmKTsgLy8gaGF2ZSB0byBhZGQgT3JkZXJDaGFubmVsRGVmIHRvIG1ha2UgdHNpZnkgbm90IGNvbXBsYWluaW5nXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEZvciBib3RoIGxpbmUgYW5kIGFyZWEsIHdlIHNvcnQgdmFsdWVzIGJhc2VkIG9uIGRpbWVuc2lvbiBieSBkZWZhdWx0XG4gICAgcmV0dXJuICctJyArIG1vZGVsLmZpZWxkKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAnaG9yaXpvbnRhbCcgPyBZIDogWCwge2JpblN1ZmZpeDogJ19taWQnfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpc3Qgb2YgZGV0YWlsIGZpZWxkcyAoZm9yICdjb2xvcicsICdzaGFwZScsIG9yICdkZXRhaWwnIGNoYW5uZWxzKVxuICogdGhhdCB0aGUgbW9kZWwncyBzcGVjIGNvbnRhaW5zLlxuICovXG5mdW5jdGlvbiBkZXRhaWxGaWVsZHMobW9kZWw6IFVuaXRNb2RlbCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFtDT0xPUiwgREVUQUlMLCBPUEFDSVRZLCBTSEFQRV0ucmVkdWNlKGZ1bmN0aW9uKGRldGFpbHMsIGNoYW5uZWwpIHtcbiAgICBpZiAobW9kZWwuaGFzKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5hZ2dyZWdhdGUpIHtcbiAgICAgIGRldGFpbHMucHVzaChtb2RlbC5maWVsZChjaGFubmVsKSk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9LCBbXSk7XG59XG5cblxuZnVuY3Rpb24gc3RhY2tUcmFuc2Zvcm1zKG1vZGVsOiBVbml0TW9kZWwsIGltcHV0ZTogYm9vbGVhbik6IGFueVtdIHtcbiAgY29uc3Qgc3RhY2tCeUZpZWxkcyA9IGdldFN0YWNrQnlGaWVsZHMobW9kZWwpO1xuICBpZiAoaW1wdXRlKSB7XG4gICAgcmV0dXJuIFtpbXB1dGVUcmFuc2Zvcm0obW9kZWwsIHN0YWNrQnlGaWVsZHMpLCBzdGFja1RyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyldO1xuICB9XG4gIHJldHVybiBbc3RhY2tUcmFuc2Zvcm0obW9kZWwsIHN0YWNrQnlGaWVsZHMpXTtcbn1cblxuXG4vKiogQ29tcGlsZSBzdGFjay1ieSBmaWVsZCBuYW1lcyBmcm9tIChmcm9tICdjb2xvcicgYW5kICdkZXRhaWwnKSAqL1xuZnVuY3Rpb24gZ2V0U3RhY2tCeUZpZWxkcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGVuY29kaW5nID0gbW9kZWwuZW5jb2RpbmcoKTtcblxuICByZXR1cm4gU1RBQ0tfR1JPVVBfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKGZpZWxkcywgY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShjaGFubmVsRW5jb2RpbmcpKSB7XG4gICAgICAgIGNoYW5uZWxFbmNvZGluZy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgZmllbGRzLnB1c2goZmllbGQoZmllbGREZWYpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWVsZERlZjogRmllbGREZWYgPSBjaGFubmVsRW5jb2Rpbmc7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmLCB7XG4gICAgICAgICAgYmluU3VmZml4OiBzY2FsZSAmJiBzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGRzO1xuICB9LCBbXSk7XG59XG5cbi8vIGltcHV0ZSBkYXRhIGZvciBzdGFja2VkIGFyZWFcbmZ1bmN0aW9uIGltcHV0ZVRyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsLCBzdGFja0ZpZWxkczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbXB1dGUnLFxuICAgIGZpZWxkOiBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpLFxuICAgIGdyb3VwYnk6IHN0YWNrRmllbGRzLFxuICAgIG9yZGVyYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCwge2JpblN1ZmZpeDogJ19taWQnfSldLFxuICAgIG1ldGhvZDogJ3ZhbHVlJyxcbiAgICB2YWx1ZTogMFxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGFja1RyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsLCBzdGFja0ZpZWxkczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBjb25zdCBlbmNvZGluZyA9IG1vZGVsLmVuY29kaW5nKCk7XG4gIGNvbnN0IHNvcnRieSA9IG1vZGVsLmhhcyhPUkRFUikgP1xuICAgIChpc0FycmF5KGVuY29kaW5nW09SREVSXSkgPyBlbmNvZGluZ1tPUkRFUl0gOiBbZW5jb2RpbmdbT1JERVJdXSkubWFwKHNvcnRGaWVsZCkgOlxuICAgIC8vIGRlZmF1bHQgPSBkZXNjZW5kaW5nIGJ5IHN0YWNrRmllbGRzXG4gICAgc3RhY2tGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgIHJldHVybiAnLScgKyBmaWVsZDtcbiAgICB9KTtcblxuICBjb25zdCB2YWxOYW1lID0gbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKTtcblxuICAvLyBhZGQgc3RhY2sgdHJhbnNmb3JtIHRvIG1hcmtcbiAgbGV0IHRyYW5zZm9ybTogVmdTdGFja1RyYW5zZm9ybSA9IHtcbiAgICB0eXBlOiAnc3RhY2snLFxuICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCwge2JpblN1ZmZpeDogJ19taWQnfSldLFxuICAgIGZpZWxkOiBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpLFxuICAgIHNvcnRieTogc29ydGJ5LFxuICAgIG91dHB1dDoge1xuICAgICAgc3RhcnQ6IHZhbE5hbWUgKyAnX3N0YXJ0JyxcbiAgICAgIGVuZDogdmFsTmFtZSArICdfZW5kJ1xuICAgIH1cbiAgfTtcblxuICBpZiAoc3RhY2sub2Zmc2V0KSB7XG4gICAgdHJhbnNmb3JtLm9mZnNldCA9IHN0YWNrLm9mZnNldDtcbiAgfVxuICByZXR1cm4gdHJhbnNmb3JtO1xufVxuIiwiaW1wb3J0IHtYLCBZLCBTSEFQRSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7Q2hhbm5lbERlZldpdGhMZWdlbmQsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgcG9pbnQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCwgZml4ZWRTaGFwZT86IHN0cmluZykge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgcC5zaXplID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgbW9kZWwuc2NhbGUoU0laRSksIGNvbmZpZyk7XG5cbiAgICBwLnNoYXBlID0gc2hhcGUobW9kZWwuZW5jb2RpbmcoKS5zaGFwZSwgbW9kZWwuc2NhbGVOYW1lKFNIQVBFKSwgbW9kZWwuc2NhbGUoU0hBUEUpLCBjb25maWcsIGZpeGVkU2hhcGUpO1xuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHhcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5zaXplIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaGFwZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnLCBmaXhlZFNoYXBlPzogc3RyaW5nKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2hhcGVcbiAgICBpZiAoZml4ZWRTaGFwZSkgeyAvLyBzcXVhcmUgYW5kIGNpcmNsZSBtYXJrc1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpeGVkU2hhcGUgfTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsuc2hhcGUgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGNpcmNsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdjaXJjbGUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3F1YXJlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ3NxdWFyZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgWDIsIFkyLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBydWxlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncnVsZSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBleHBsaWNpdCB2YWx1ZVxuICAgIGlmKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7IHZhbHVlIDogMCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkgPSB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWTIpKSB7XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWTIsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueTIgPSB7IHZhbHVlOiAwIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueSA9IHsgdmFsdWU6IDAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZTogMCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFgyKSkge1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgyLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLngyID0geyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRklYTUU6IHRoaXMgZnVuY3Rpb24gd291bGQgb3ZlcndyaXRlIHN0cm9rZVdpZHRoIGJ1dCBzaG91bGRuJ3RcbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG5cbiAgICAvLyBzaXplXG4gICAgaWYgKG1vZGVsLmhhcyhTSVpFKSkge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnN0cm9rZVdpZHRoID0geyB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsKSB9O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkubWFyay5ydWxlU2l6ZTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlNYXJrQ29uZmlnLCBhcHBseUNvbG9yQW5kT3BhY2l0eSwgbnVtYmVyRm9ybWF0LCB0aW1lVGVtcGxhdGV9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRleHQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICd0ZXh0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeyB2YWx1ZTogMCB9LFxuICAgICAgeTogeyB2YWx1ZTogMCB9LFxuICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH0sXG4gICAgICBmaWxsOiB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIG1vZGVsLmZpZWxkRGVmKENPTE9SKS50eXBlID09PSBPUkRJTkFMID8ge3ByZWZuOiAncmFua18nfSA6IHt9KVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLFxuICAgICAgWydhbmdsZScsICdhbGlnbicsICdiYXNlbGluZScsICdkeCcsICdkeScsICdmb250JywgJ2ZvbnRXZWlnaHQnLFxuICAgICAgICAnZm9udFN0eWxlJywgJ3JhZGl1cycsICd0aGV0YScsICd0ZXh0J10pO1xuXG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG4gICAgY29uc3QgdGV4dEZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoVEVYVCk7XG5cbiAgICBwLnggPSB4KG1vZGVsLmVuY29kaW5nKCkueCwgbW9kZWwuc2NhbGVOYW1lKFgpLCBjb25maWcsIHRleHRGaWVsZERlZik7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgcC5mb250U2l6ZSA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBtb2RlbC5zY2FsZU5hbWUoU0laRSksIGNvbmZpZyk7XG5cbiAgICBwLnRleHQgPSB0ZXh0KG1vZGVsLmVuY29kaW5nKCkudGV4dCwgbW9kZWwuc2NhbGVOYW1lKFRFWFQpLCBjb25maWcpO1xuXG4gICAgaWYgKG1vZGVsLmNvbmZpZygpLm1hcmsuYXBwbHlDb2xvclRvQmFja2dyb3VuZCAmJiAhbW9kZWwuaGFzKFgpICYmICFtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAuZmlsbCA9IHt2YWx1ZTogJ2JsYWNrJ307IC8vIFRPRE86IGFkZCBydWxlcyBmb3Igc3dhcHBpbmcgYmV0d2VlbiBibGFjayBhbmQgd2hpdGVcbiAgICAgIC8vIG9wYWNpdHlcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9wYWNpdHk7XG4gICAgICBpZiAob3BhY2l0eSkgeyBwLm9wYWNpdHkgPSB7IHZhbHVlOiBvcGFjaXR5IH07IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoeEZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnLCB0ZXh0RmllbGREZWY6RmllbGREZWYpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKHhGaWVsZERlZikge1xuICAgICAgaWYgKHhGaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHhGaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHgudmFsdWUsIHguZGF0dW1cbiAgICBpZiAodGV4dEZpZWxkRGVmICYmIHRleHRGaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgIHJldHVybiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0sIG9mZnNldDogLTUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS50ZXh0QmFuZFdpZHRoIC8gMiB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHkoeUZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmICh5RmllbGREZWYpIHtcbiAgICAgIGlmICh5RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh5RmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETyBjb25zaWRlciBpZiB0aGlzIHNob3VsZCBzdXBwb3J0IGdyb3VwOiBoZWlnaHQgY2FzZSB0b28uXG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoc2l6ZUZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2l6ZVxuICAgIGlmIChzaXplRmllbGREZWYpIHtcbiAgICAgIGlmIChzaXplRmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChzaXplRmllbGREZWYpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoc2l6ZUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IHNpemVGaWVsZERlZi52YWx1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5mb250U2l6ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dCh0ZXh0RmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB0ZXh0XG4gICAgaWYgKHRleHRGaWVsZERlZikge1xuICAgICAgaWYgKHRleHRGaWVsZERlZi5maWVsZCkge1xuICAgICAgICBpZiAoUVVBTlRJVEFUSVZFID09PSB0ZXh0RmllbGREZWYudHlwZSkge1xuICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IG51bWJlckZvcm1hdCh0ZXh0RmllbGREZWYsIGNvbmZpZy5tYXJrLmZvcm1hdCwgY29uZmlnKTtcblxuICAgICAgICAgIGNvbnN0IGZpbHRlciA9ICdudW1iZXInICsgKCBmb3JtYXQgPyAnOlxcJycgKyBmb3JtYXQgKyAnXFwnJyA6ICcnKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICd7eycgKyBmaWVsZCh0ZXh0RmllbGREZWYsIHsgZGF0dW06IHRydWUgfSkgKyAnIHwgJyArIGZpbHRlciArICd9fSdcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKFRFTVBPUkFMID09PSB0ZXh0RmllbGREZWYudHlwZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGltZVRlbXBsYXRlKGZpZWxkKHRleHRGaWVsZERlZiwge2RhdHVtOiB0cnVlfSksIHRleHRGaWVsZERlZi50aW1lVW5pdCwgY29uZmlnLm1hcmsuZm9ybWF0LCBjb25maWcubWFyay5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZylcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGZpZWxkOiB0ZXh0RmllbGREZWYuZmllbGQgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0ZXh0RmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHRleHRGaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3ZhbHVlOiBjb25maWcubWFyay50ZXh0fTtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRpY2sge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG5cbiAgICBwLnhjID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueWMgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgaWYgKGNvbmZpZy5tYXJrLm9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBwLndpZHRoID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgY29uZmlnLCAobW9kZWwuc2NhbGUoWCkgfHwge30pLmJhbmRTaXplKTtcbiAgICAgIHAuaGVpZ2h0ID0geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLndpZHRoID0geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuICAgICAgcC5oZWlnaHQgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBjb25maWcsIChtb2RlbC5zY2FsZShZKSB8fCB7fSkuYmFuZFNpemUpO1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBmaWVsZERlZi52YWx1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gIH1cblxuICBmdW5jdGlvbiB5KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogZmllbGREZWYudmFsdWV9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZywgc2NhbGVCYW5kU2l6ZTogbnVtYmVyKTogVmdWYWx1ZVJlZiB7XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZERlZi5maWVsZFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29uZmlnLm1hcmsudGlja1NpemUpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay50aWNrU2l6ZSB9O1xuICAgIH1cbiAgICBjb25zdCBiYW5kU2l6ZSA9IHNjYWxlQmFuZFNpemUgIT09IHVuZGVmaW5lZCA/XG4gICAgICBzY2FsZUJhbmRTaXplIDpcbiAgICAgIGNvbmZpZy5zY2FsZS5iYW5kU2l6ZTtcbiAgICByZXR1cm4geyB2YWx1ZTogYmFuZFNpemUgLyAxLjUgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge0F4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtDaGFubmVsLCBYLCBDT0xVTU59IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWcsIENlbGxDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0RhdGEsIERhdGFUYWJsZX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge2NoYW5uZWxNYXBwaW5nUmVkdWNlLCBjaGFubmVsTWFwcGluZ0ZvckVhY2h9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWYsIEZpZWxkUmVmT3B0aW9uLCBmaWVsZH0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtMZWdlbmR9IGZyb20gJy4uL2xlZ2VuZCc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7QmFzZVNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwgZmxhdHRlbiwgdmFscywgd2FybmluZywgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdNYXJrR3JvdXAsIFZnU2NhbGUsIFZnQXhpcywgVmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge0xheW91dENvbXBvbmVudH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtTY2FsZUNvbXBvbmVudHN9IGZyb20gJy4vc2NhbGUnO1xuXG4vKipcbiAqIENvbXBvc2FibGUgQ29tcG9uZW50cyB0aGF0IGFyZSBpbnRlcm1lZGlhdGUgcmVzdWx0cyBvZiB0aGUgcGFyc2luZyBwaGFzZSBvZiB0aGVcbiAqIGNvbXBpbGF0aW9ucy4gIFRoZXNlIGNvbXBvc2FibGUgY29tcG9uZW50cyB3aWxsIGJlIGFzc2VtYmxlZCBpbiB0aGUgbGFzdFxuICogY29tcGlsYXRpb24gc3RlcC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnQge1xuICBkYXRhOiBEYXRhQ29tcG9uZW50O1xuICBsYXlvdXQ6IExheW91dENvbXBvbmVudDtcbiAgc2NhbGU6IERpY3Q8U2NhbGVDb21wb25lbnRzPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gVmdBeGlzIGRlZmluaXRpb24gKi9cbiAgLy8gVE9ETzogaWYgd2UgYWxsb3cgbXVsdGlwbGUgYXhlcyAoZS5nLiwgZHVhbCBheGlzKSwgdGhpcyB3aWxsIGJlY29tZSBWZ0F4aXNbXVxuICBheGlzOiBEaWN0PFZnQXhpcz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnTGVnZW5kIGRlZmluaXRpb24gKi9cbiAgbGVnZW5kOiBEaWN0PFZnTGVnZW5kPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gYXhpcyBtYXJrIGdyb3VwIGZvciBmYWNldCBhbmQgY29uY2F0ICovXG4gIGF4aXNHcm91cDogRGljdDxWZ01hcmtHcm91cD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGdyaWQgbWFyayBncm91cCBmb3IgZmFjZXQgKGFuZCBjb25jYXQ/KSAqL1xuICBncmlkR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXBbXT47XG5cbiAgbWFyazogVmdNYXJrR3JvdXBbXTtcbn1cblxuY2xhc3MgTmFtZU1hcCB7XG4gIHByaXZhdGUgX25hbWVNYXA6IERpY3Q8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9uYW1lTWFwID0ge30gYXMgRGljdDxzdHJpbmc+O1xuICB9XG5cbiAgcHVibGljIHJlbmFtZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWVNYXBbb2xkTmFtZV0gPSBuZXdOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIElmIHRoZSBuYW1lIGFwcGVhcnMgaW4gdGhlIF9uYW1lTWFwLCB3ZSBuZWVkIHRvIHJlYWQgaXRzIG5ldyBuYW1lLlxuICAgIC8vIFdlIGhhdmUgdG8gbG9vcCBvdmVyIHRoZSBkaWN0IGp1c3QgaW4gY2FzZSwgdGhlIG5ldyBuYW1lIGFsc28gZ2V0cyByZW5hbWVkLlxuICAgIHdoaWxlICh0aGlzLl9uYW1lTWFwW25hbWVdKSB7XG4gICAgICBuYW1lID0gdGhpcy5fbmFtZU1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xuICBwcm90ZWN0ZWQgX3BhcmVudDogTW9kZWw7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIF9kYXRhOiBEYXRhO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3IgZGF0YSBzb3VyY2VzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX2RhdGFOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3Igc2NhbGVzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNpemUsIHdoaWNoIGNhbiBiZSByZW5hbWVkIGJ5IGEgbW9kZWwncyBwYXJlbnQuICovXG4gIHByb3RlY3RlZCBfc2l6ZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm06IFRyYW5zZm9ybTtcbiAgcHJvdGVjdGVkIF9zY2FsZTogRGljdDxTY2FsZT47XG5cbiAgcHJvdGVjdGVkIF9heGlzOiBEaWN0PEF4aXM+O1xuXG4gIHByb3RlY3RlZCBfbGVnZW5kOiBEaWN0PExlZ2VuZD47XG5cbiAgcHJvdGVjdGVkIF9jb25maWc6IENvbmZpZztcblxuICBwcm90ZWN0ZWQgX3dhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBCYXNlU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAvLyBJZiBuYW1lIGlzIG5vdCBwcm92aWRlZCwgYWx3YXlzIHVzZSBwYXJlbnQncyBnaXZlbk5hbWUgdG8gYXZvaWQgbmFtZSBjb25mbGljdHMuXG4gICAgdGhpcy5fbmFtZSA9IHNwZWMubmFtZSB8fCBwYXJlbnRHaXZlbk5hbWU7XG5cbiAgICAvLyBTaGFyZWQgbmFtZSBtYXBzXG4gICAgdGhpcy5fZGF0YU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX2RhdGFOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcbiAgICB0aGlzLl9zY2FsZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NjYWxlTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2l6ZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NpemVOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcblxuICAgIHRoaXMuX2RhdGEgPSBzcGVjLmRhdGE7XG5cbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHNwZWMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5fdHJhbnNmb3JtID0gc3BlYy50cmFuc2Zvcm07XG5cbiAgICB0aGlzLmNvbXBvbmVudCA9IHtkYXRhOiBudWxsLCBsYXlvdXQ6IG51bGwsIG1hcms6IG51bGwsIHNjYWxlOiBudWxsLCBheGlzOiBudWxsLCBheGlzR3JvdXA6IG51bGwsIGdyaWRHcm91cDogbnVsbCwgbGVnZW5kOiBudWxsfTtcbiAgfVxuXG5cbiAgcHVibGljIHBhcnNlKCkge1xuICAgIHRoaXMucGFyc2VEYXRhKCk7XG4gICAgdGhpcy5wYXJzZVNlbGVjdGlvbkRhdGEoKTtcbiAgICB0aGlzLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIHRoaXMucGFyc2VTY2FsZSgpOyAvLyBkZXBlbmRzIG9uIGRhdGEgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VMZWdlbmQoKTsgLy8gZGVwZW5kcyBvbiBzY2FsZSBuYW1lXG4gICAgdGhpcy5wYXJzZUF4aXNHcm91cCgpOyAvLyBkZXBlbmRzIG9uIGNoaWxkIGF4aXNcbiAgICB0aGlzLnBhcnNlR3JpZEdyb3VwKCk7XG4gICAgdGhpcy5wYXJzZU1hcmsoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWUgYW5kIHNjYWxlIG5hbWUsIGF4aXNHcm91cCwgZ3JpZEdyb3VwIGFuZCBjaGlsZHJlbidzIHNjYWxlLCBheGlzLCBsZWdlbmQgYW5kIG1hcmsuXG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VEYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2VsZWN0aW9uRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxheW91dERhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VTY2FsZSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZU1hcmsoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VBeGlzKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlTGVnZW5kKCk7XG5cbiAgLy8gVE9ETzogcmV2aXNlIGlmIHRoZXNlIHR3byBtZXRob2RzIG1ha2Ugc2Vuc2UgZm9yIHNoYXJlZCBzY2FsZSBjb25jYXRcbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpc0dyb3VwKCk7XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUdyaWRHcm91cCgpO1xuXG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIC8vIFRPRE86IGZvciBBcnZpbmQgdG8gd3JpdGVcbiAgLy8gcHVibGljIGFic3RyYWN0IGFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvbkRhdGEobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYXNzZW1ibGVTY2FsZXMoKTogVmdTY2FsZVtdIHtcbiAgICAvLyBGSVhNRTogd3JpdGUgYXNzZW1ibGVTY2FsZXMoKSBpbiBzY2FsZS50cyB0aGF0XG4gICAgLy8gaGVscCBhc3NlbWJsZSBzY2FsZSBkb21haW5zIHdpdGggc2NhbGUgc2lnbmF0dXJlIGFzIHdlbGxcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKHRoaXMuY29tcG9uZW50LnNjYWxlKS5tYXAoKHNjYWxlczogU2NhbGVDb21wb25lbnRzKSA9PiB7XG4gICAgICBsZXQgYXJyID0gW3NjYWxlcy5tYWluXTtcbiAgICAgIGlmIChzY2FsZXMuY29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChzY2FsZXMuYmluQ29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmJpbkNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlTWFya3MoKTogYW55W107IC8vIFRPRE86IFZnTWFya0dyb3VwW11cblxuICBwdWJsaWMgYXNzZW1ibGVBeGVzKCk6IFZnQXhpc1tdIHtcbiAgICByZXR1cm4gdmFscyh0aGlzLmNvbXBvbmVudC5heGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxlZ2VuZHMoKTogYW55W10geyAvLyBUT0RPOiBWZ0xlZ2VuZFtdXG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQubGVnZW5kKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUdyb3VwKCkge1xuICAgIGxldCBncm91cDogVmdNYXJrR3JvdXAgPSB7fTtcblxuICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgc2NhbGVzIHRvIGNvbWUgYmVmb3JlIG1hcmtzIGluIHRoZSBvdXRwdXQgc3BlYy5cblxuICAgIGdyb3VwLm1hcmtzID0gdGhpcy5hc3NlbWJsZU1hcmtzKCk7XG4gICAgY29uc3Qgc2NhbGVzID0gdGhpcy5hc3NlbWJsZVNjYWxlcygpO1xuICAgIGlmIChzY2FsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZ3JvdXAuc2NhbGVzID0gc2NhbGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGF4ZXMgPSB0aGlzLmFzc2VtYmxlQXhlcygpO1xuICAgIGlmIChheGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmF4ZXMgPSBheGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2VuZHMgPSB0aGlzLmFzc2VtYmxlTGVnZW5kcygpO1xuICAgIGlmIChsZWdlbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmxlZ2VuZHMgPSBsZWdlbmRzO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgY2hhbm5lbHMoKTogQ2hhbm5lbFtdO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBtYXBwaW5nKCk7XG5cbiAgcHVibGljIHJlZHVjZShmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LCBpbml0LCB0PzogYW55KSB7XG4gICAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nUmVkdWNlKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIGluaXQsIHQpO1xuICB9XG5cbiAgcHVibGljIGZvckVhY2goZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTpudW1iZXIpID0+IHZvaWQsIHQ/OiBhbnkpIHtcbiAgICBjaGFubmVsTWFwcGluZ0ZvckVhY2godGhpcy5jaGFubmVscygpLCB0aGlzLm1hcHBpbmcoKSwgZiwgdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuO1xuXG4gIHB1YmxpYyBwYXJlbnQoKTogTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgbmFtZSh0ZXh0OiBzdHJpbmcsIGRlbGltaXRlcjogc3RyaW5nID0gJ18nKSB7XG4gICAgcmV0dXJuICh0aGlzLl9uYW1lID8gdGhpcy5fbmFtZSArIGRlbGltaXRlciA6ICcnKSArIHRleHQ7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgcHVibGljIGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lRGF0YShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgICB0aGlzLl9kYXRhTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkYXRhIHNvdXJjZSBuYW1lIGZvciB0aGUgZ2l2ZW4gZGF0YSBzb3VyY2UgdHlwZS5cbiAgICpcbiAgICogRm9yIHVuaXQgc3BlYywgdGhpcyBpcyBhbHdheXMgc2ltcGx5IHRoZSBzcGVjLm5hbWUgKyAnLScgKyBkYXRhU291cmNlVHlwZS5cbiAgICogV2UgYWxyZWFkeSB1c2UgdGhlIG5hbWUgbWFwIHNvIHRoYXQgbWFya3MgYW5kIHNjYWxlcyB1c2UgdGhlIGNvcnJlY3QgZGF0YS5cbiAgICovXG4gIHB1YmxpYyBkYXRhTmFtZShkYXRhU291cmNlVHlwZTogRGF0YVRhYmxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YU5hbWVNYXAuZ2V0KHRoaXMubmFtZShTdHJpbmcoZGF0YVNvdXJjZVR5cGUpKSk7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lU2l6ZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NpemVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVsU2l6ZU5hbWUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZU5hbWUoY2hhbm5lbCA9PT0gWCB8fCBjaGFubmVsID09PSBDT0xVTU4gPyAnd2lkdGgnIDogJ2hlaWdodCcpO1xuICB9XG5cbiAgcHVibGljIHNpemVOYW1lKHNpemU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLl9zaXplTmFtZU1hcC5nZXQodGhpcy5uYW1lKHNpemUsICdfJykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGRhdGFUYWJsZSgpOiBzdHJpbmc7XG5cbiAgcHVibGljIHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm0gfHwge307XG4gIH1cblxuICAvKiogR2V0IFwiZmllbGRcIiByZWZlcmVuY2UgZm9yIHZlZ2EgKi9cbiAgcHVibGljIGZpZWxkKGNoYW5uZWw6IENoYW5uZWwsIG9wdDogRmllbGRSZWZPcHRpb24gPSB7fSkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gdGhpcy5maWVsZERlZihjaGFubmVsKTtcblxuICAgIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluIGhhcyBkZWZhdWx0IHN1ZmZpeCB0aGF0IGRlcGVuZHMgb24gc2NhbGVUeXBlXG4gICAgICBvcHQgPSBleHRlbmQoe1xuICAgICAgICBiaW5TdWZmaXg6IHRoaXMuc2NhbGUoY2hhbm5lbCkudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgPyAnX3JhbmdlJyA6ICdfc3RhcnQnXG4gICAgICB9LCBvcHQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZChmaWVsZERlZiwgb3B0KTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWY7XG5cbiAgcHVibGljIHNjYWxlKGNoYW5uZWw6IENoYW5uZWwpOiBTY2FsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlW2NoYW5uZWxdO1xuICB9XG5cbiAgLy8gVE9ETzogcmVuYW1lIHRvIGhhc09yZGluYWxTY2FsZVxuICBwdWJsaWMgaXNPcmRpbmFsU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5zY2FsZShjaGFubmVsKTtcbiAgICByZXR1cm4gc2NhbGUgJiYgc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lU2NhbGUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zY2FsZU5hbWVNYXAucmVuYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICB9XG5cbiAgLyoqIHJldHVybnMgc2NhbGUgbmFtZSBmb3IgYSBnaXZlbiBjaGFubmVsICovXG4gIHB1YmxpYyBzY2FsZU5hbWUoY2hhbm5lbDogQ2hhbm5lbHxzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZU5hbWVNYXAuZ2V0KHRoaXMubmFtZShjaGFubmVsICsgJycpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3J0KGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gKHRoaXMubWFwcGluZygpW2NoYW5uZWxdIHx8IHt9KS5zb3J0O1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHN0YWNrKCk7XG5cbiAgcHVibGljIGF4aXMoY2hhbm5lbDogQ2hhbm5lbCk6IEF4aXMge1xuICAgIHJldHVybiB0aGlzLl9heGlzW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGxlZ2VuZChjaGFubmVsOiBDaGFubmVsKTogTGVnZW5kIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnZW5kW2NoYW5uZWxdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3BlYyBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHVibGljIGNvbmZpZygpOiBDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwdWJsaWMgYWRkV2FybmluZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB3YXJuaW5nKG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dhcm5pbmdzLnB1c2gobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgd2FybmluZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl93YXJuaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBlIGNoZWNrc1xuICAgKi9cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIHZhciBleHBvcnRzO1xuXG5pbXBvcnQge1NIQVJFRF9ET01BSU5fT1BTfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgWDIsIFkyLCBTSEFQRSwgU0laRSwgQ09MT1IsIE9QQUNJVFksIFRFWFQsIGhhc1NjYWxlLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7U09VUkNFLCBTVEFDS0VEX1NDQUxFfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TWFyaywgQkFSLCBURVhUIGFzIFRFWFRNQVJLLCBSVUxFLCBUSUNLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZSwgTmljZVRpbWV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4uL3N0YWNrJztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1NjYWxlfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtyYXdEb21haW4sIHNtYWxsZXN0VW5pdH0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG4vKipcbiAqIENvbG9yIFJhbXAncyBzY2FsZSBmb3IgbGVnZW5kcy4gIFRoaXMgc2NhbGUgaGFzIHRvIGJlIG9yZGluYWwgc28gdGhhdCBpdHNcbiAqIGxlZ2VuZHMgc2hvdyBhIGxpc3Qgb2YgbnVtYmVycy5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTE9SX0xFR0VORCA9ICdjb2xvcl9sZWdlbmQnO1xuXG4vLyBzY2FsZSB1c2VkIHRvIGdldCBsYWJlbHMgZm9yIGJpbm5lZCBjb2xvciBzY2FsZXNcbmV4cG9ydCBjb25zdCBDT0xPUl9MRUdFTkRfTEFCRUwgPSAnY29sb3JfbGVnZW5kX2xhYmVsJztcblxuXG4vLyBGSVhNRTogV2l0aCBsYXllciBhbmQgY29uY2F0LCBzY2FsZUNvbXBvbmVudCBzaG91bGQgZGVjb21wb3NlIGJldHdlZW5cbi8vIFNjYWxlU2lnbmF0dXJlIGFuZCBTY2FsZURvbWFpbltdLlxuLy8gQmFzaWNhbGx5LCBpZiB0d28gdW5pdCBzcGVjcyBoYXMgdGhlIHNhbWUgc2NhbGUsIHNpZ25hdHVyZSBmb3IgYSBwYXJ0aWN1bGFyIGNoYW5uZWwsXG4vLyB0aGUgc2NhbGUgY2FuIGJlIHVuaW9uZWQgYnkgY29tYmluaW5nIHRoZSBkb21haW4uXG5leHBvcnQgdHlwZSBTY2FsZUNvbXBvbmVudCA9IFZnU2NhbGU7XG5cbmV4cG9ydCB0eXBlIFNjYWxlQ29tcG9uZW50cyA9IHtcbiAgbWFpbjogU2NhbGVDb21wb25lbnQ7XG4gIGNvbG9yTGVnZW5kPzogU2NhbGVDb21wb25lbnQsXG4gIGJpbkNvbG9yTGVnZW5kPzogU2NhbGVDb21wb25lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU2NhbGVDb21wb25lbnQobW9kZWw6IE1vZGVsKTogRGljdDxTY2FsZUNvbXBvbmVudHM+IHtcbiAgLy8gVE9ETzogc2hvdWxkIG1vZGVsLmNoYW5uZWxzKCkgaW5sY3VkZSBYMi9ZMj9cbiAgcmV0dXJuIG1vZGVsLmNoYW5uZWxzKCkucmVkdWNlKGZ1bmN0aW9uKHNjYWxlOiBEaWN0PFNjYWxlQ29tcG9uZW50cz4sIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChtb2RlbC5zY2FsZShjaGFubmVsKSkge1xuICAgICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICAgICAgICBjb25zdCBzY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IHtcbiAgICAgICAgICBtYWluOiBwYXJzZU1haW5TY2FsZShtb2RlbCwgZmllbGREZWYsIGNoYW5uZWwpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQWRkIGFkZGl0aW9uYWwgc2NhbGVzIG5lZWRlZCB0byBzdXBwb3J0IG9yZGluYWwgbGVnZW5kcyAobGlzdCBvZiB2YWx1ZXMpXG4gICAgICAgIC8vIGZvciBjb2xvciByYW1wLlxuICAgICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IgJiYgbW9kZWwubGVnZW5kKENPTE9SKSAmJiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQpKSB7XG4gICAgICAgICAgc2NhbGVzLmNvbG9yTGVnZW5kID0gcGFyc2VDb2xvckxlZ2VuZFNjYWxlKG1vZGVsLCBmaWVsZERlZik7XG4gICAgICAgICAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICAgICAgc2NhbGVzLmJpbkNvbG9yTGVnZW5kID0gcGFyc2VCaW5Db2xvckxlZ2VuZExhYmVsKG1vZGVsLCBmaWVsZERlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGVbY2hhbm5lbF0gPSBzY2FsZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZUNvbXBvbmVudHM+KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1haW4gc2NhbGUgZm9yIGVhY2ggY2hhbm5lbC4gIChPbmx5IGNvbG9yIGNhbiBoYXZlIG11bHRpcGxlIHNjYWxlcy4pXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTWFpblNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGNvbnN0IHNvcnQgPSBtb2RlbC5zb3J0KGNoYW5uZWwpO1xuICBsZXQgc2NhbGVEZWY6IGFueSA9IHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgdHlwZTogc2NhbGUudHlwZSxcbiAgfTtcblxuICAvLyBJZiBjaGFubmVsIGlzIGVpdGhlciBYIG9yIFkgdGhlbiB1bmlvbiB0aGVtIHdpdGggWDIgJiBZMiBpZiB0aGV5IGV4aXN0XG4gIGlmIChjaGFubmVsID09PSBYICYmIG1vZGVsLmhhcyhYMikpIHtcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICBzY2FsZURlZi5kb21haW4gPSB7IGZpZWxkczogW2RvbWFpbihzY2FsZSwgbW9kZWwsIFgpLCBkb21haW4oc2NhbGUsIG1vZGVsLCBYMildIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIFgyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWSAmJiBtb2RlbC5oYXMoWTIpKSB7XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgc2NhbGVEZWYuZG9tYWluID0geyBmaWVsZHM6IFtkb21haW4oc2NhbGUsIG1vZGVsLCBZKSwgZG9tYWluKHNjYWxlLCBtb2RlbCwgWTIpXSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZURlZi5kb21haW4gPSBkb21haW4oc2NhbGUsIG1vZGVsLCBZMik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwpO1xuICB9XG5cbiAgZXh0ZW5kKHNjYWxlRGVmLCByYW5nZU1peGlucyhzY2FsZSwgbW9kZWwsIGNoYW5uZWwpKTtcbiAgaWYgKHNvcnQgJiYgKHR5cGVvZiBzb3J0ID09PSAnc3RyaW5nJyA/IHNvcnQgOiBzb3J0Lm9yZGVyKSA9PT0gJ2Rlc2NlbmRpbmcnKSB7XG4gICAgc2NhbGVEZWYucmV2ZXJzZSA9IHRydWU7XG4gIH1cblxuICAvLyBBZGQgb3B0aW9uYWwgcHJvcGVydGllc1xuICBbXG4gICAgLy8gZ2VuZXJhbCBwcm9wZXJ0aWVzXG4gICAgJ3JvdW5kJyxcbiAgICAvLyBxdWFudGl0YXRpdmUgLyB0aW1lXG4gICAgJ2NsYW1wJywgJ25pY2UnLFxuICAgIC8vIHF1YW50aXRhdGl2ZVxuICAgICdleHBvbmVudCcsICd6ZXJvJyxcbiAgICAvLyBvcmRpbmFsXG4gICAgJ3BhZGRpbmcnLCAncG9pbnRzJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV4cG9ydHNbcHJvcGVydHldKHNjYWxlLCBjaGFubmVsLCBmaWVsZERlZiwgbW9kZWwpO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2FsZURlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzY2FsZURlZjtcbn1cblxuLyoqXG4gKiAgUmV0dXJuIGEgc2NhbGUgIGZvciBwcm9kdWNpbmcgb3JkaW5hbCBzY2FsZSBmb3IgbGVnZW5kcy5cbiAqICAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlXG4gKiAgLSBGb3IgYSBmaWVsZCB3aXRoIGJpbiBvciB0aW1lVW5pdCwgcHJvdmlkZSBhbiBpZGVudGl0eSBvcmRpbmFsIHNjYWxlXG4gKiAgICAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ29sb3JMZWdlbmRTY2FsZShtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IFNjYWxlQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EKSxcbiAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgLy8gdXNlIHJhbmtfPGZpZWxkPiBmb3Igb3JkaW5hbCB0eXBlLCBmb3IgYmluIGFuZCB0aW1lVW5pdCB1c2UgZGVmYXVsdCBmaWVsZFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCAoZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSA/IHt9IDoge3ByZWZuOiAncmFua18nfSksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLCBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLCBzb3J0OiB0cnVlfVxuICB9O1xufVxuXG4vKipcbiAqICBSZXR1cm4gYW4gYWRkaXRpb25hbCBzY2FsZSBmb3IgYmluIGxhYmVscyBiZWNhdXNlIHdlIG5lZWQgdG8gbWFwIGJpbl9zdGFydCB0byBiaW5fcmFuZ2UgaW4gbGVnZW5kc1xuICovXG5mdW5jdGlvbiBwYXJzZUJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYpOiBTY2FsZUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORF9MQUJFTCksXG4gICAgdHlwZTogU2NhbGVUeXBlLk9SRElOQUwsXG4gICAgZG9tYWluOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfcmFuZ2UnfSksXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICBvcDogJ21pbicgLy8gbWluIG9yIG1heCBkb2Vzbid0IG1hdHRlciBzaW5jZSBzYW1lIF9yYW5nZSB3b3VsZCBoYXZlIHRoZSBzYW1lIF9zdGFydFxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlVHlwZShzY2FsZTogU2NhbGUsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyayk6IFNjYWxlVHlwZSB7XG4gIGlmICghaGFzU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAvLyBUaGVyZSBpcyBubyBzY2FsZSBmb3IgdGhlc2UgY2hhbm5lbHNcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFdlIGNhbid0IHVzZSBsaW5lYXIvdGltZSBmb3Igcm93LCBjb2x1bW4gb3Igc2hhcGVcbiAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEVdLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgfVxuXG4gIGlmIChzY2FsZS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2NhbGUudHlwZTtcbiAgfVxuXG4gIHN3aXRjaCAoZmllbGREZWYudHlwZSkge1xuICAgIGNhc2UgTk9NSU5BTDpcbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICBjYXNlIE9SRElOQUw6XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5MSU5FQVI7IC8vIHRpbWUgaGFzIG9yZGVyLCBzbyB1c2UgaW50ZXJwb2xhdGVkIG9yZGluYWwgY29sb3Igc2NhbGUuXG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgY2FzZSBURU1QT1JBTDpcbiAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7IC8vIHRpbWUgaGFzIG9yZGVyLCBzbyB1c2UgaW50ZXJwb2xhdGVkIG9yZGluYWwgY29sb3Igc2NhbGUuXG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICBzd2l0Y2ggKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSUzpcbiAgICAgICAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOlxuICAgICAgICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgICAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gZGF0ZSwgeWVhciwgbWludXRlLCBzZWNvbmQsIHllYXJtb250aCwgbW9udGhkYXksIC4uLlxuICAgICAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7XG5cbiAgICBjYXNlIFFVQU5USVRBVElWRTpcbiAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZLCBDT0xPUl0sIGNoYW5uZWwpID8gU2NhbGVUeXBlLkxJTkVBUiA6IFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5MSU5FQVI7XG4gIH1cblxuICAvLyBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpc1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpbihzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDpDaGFubmVsKTogYW55IHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICBpZiAoc2NhbGUuZG9tYWluKSB7IC8vIGV4cGxpY2l0IHZhbHVlXG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbjtcbiAgfVxuXG4gIC8vIHNwZWNpYWwgY2FzZSBmb3IgdGVtcG9yYWwgc2NhbGVcbiAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgaWYgKHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGZpZWxkRGVmLnRpbWVVbml0LFxuICAgICAgICBmaWVsZDogJ2RhdGUnXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgICBvcDogJ21pbidcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRm9yIHN0YWNrLCB1c2UgU1RBQ0tFRCBkYXRhLlxuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIGlmIChzdGFjayAmJiBjaGFubmVsID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICBpZihzdGFjay5vZmZzZXQgPT09IFN0YWNrT2Zmc2V0Lk5PUk1BTElaRSkge1xuICAgICAgcmV0dXJuIFswLCAxXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgLy8gU1RBQ0tFRF9TQ0FMRSBwcm9kdWNlcyBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAnc3VtXyd9KVxuICAgIH07XG4gIH1cblxuICBjb25zdCB1c2VSYXdEb21haW4gPSBfdXNlUmF3RG9tYWluKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCksXG4gIHNvcnQgPSBkb21haW5Tb3J0KG1vZGVsLCBjaGFubmVsLCBzY2FsZS50eXBlKTtcblxuICBpZiAodXNlUmF3RG9tYWluKSB7IC8vIHVzZVJhd0RvbWFpbiAtIG9ubHkgUS9UXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IFNPVVJDRSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7bm9BZ2dyZWdhdGU6IHRydWV9KVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpblxuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gb3JkaW5hbCBiaW4gc2NhbGUgdGFrZXMgZG9tYWluIGZyb20gYmluX3JhbmdlLCBvcmRlcmVkIGJ5IGJpbl9zdGFydFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSksXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgLy8gQ3VycmVudGx5LCBiaW5uZWQgb24gY29sb3IgdXNlcyBsaW5lYXIgc2NhbGUgYW5kIHRodXMgdXNlIF9zdGFydCBwb2ludFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyIGxpbmVhciBiaW4gc2NhbGUgbWVyZ2VzIGJvdGggYmluX3N0YXJ0IGFuZCBiaW5fZW5kIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBbXG4gICAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc29ydCkgeyAvLyBoYXZlIHNvcnQgLS0gb25seSBmb3Igb3JkaW5hbFxuICAgIHJldHVybiB7XG4gICAgICAvLyBJZiBzb3J0IGJ5IGFnZ3JlZ2F0aW9uIG9mIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQsIHdlIG5lZWQgdG8gdXNlIFNPVVJDRSB0YWJsZSxcbiAgICAgIC8vIHNvIHdlIGNhbiBhZ2dyZWdhdGUgdmFsdWVzIGZvciB0aGUgc2NhbGUgaW5kZXBlbmRlbnRseSBmcm9tIHRoZSBtYWluIGFnZ3JlZ2F0aW9uLlxuICAgICAgZGF0YTogc29ydC5vcCA/IFNPVVJDRSA6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMICYmIGNoYW5uZWwgPT09IENPTE9SKSA/IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3JhbmtfJ30pIDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiBzb3J0XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAncmFua18nfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW5Tb3J0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBTY2FsZVR5cGUpOiBhbnkge1xuICBpZiAoc2NhbGVUeXBlICE9PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcbiAgaWYgKGNvbnRhaW5zKFsnYXNjZW5kaW5nJywgJ2Rlc2NlbmRpbmcnLCB1bmRlZmluZWQgLyogZGVmYXVsdCA9YXNjZW5kaW5nKi9dLCBzb3J0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gU29ydGVkIGJhc2VkIG9uIGFuIGFnZ3JlZ2F0ZSBjYWxjdWxhdGlvbiBvdmVyIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQgKG9ubHkgZm9yIG9yZGluYWwgc2NhbGUpXG4gIGlmICh0eXBlb2Ygc29ydCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cblxuICAvLyBzb3J0ID09PSAnbm9uZSdcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG4vKipcbiAqIERldGVybWluZSBpZiB1c2VSYXdEb21haW4gc2hvdWxkIGJlIGFjdGl2YXRlZCBmb3IgdGhpcyBzY2FsZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRvbnMgYXBwbGllczpcbiAqIDEuIGB1c2VSYXdEb21haW5gIGlzIGVuYWJsZWQgZWl0aGVyIHRocm91Z2ggc2NhbGUgb3IgY29uZmlnXG4gKiAyLiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBpcyBub3QgYGNvdW50YCBvciBgc3VtYFxuICogMy4gVGhlIHNjYWxlIGlzIHF1YW50aXRhdGl2ZSBvciB0aW1lIHNjYWxlLlxuICovXG5mdW5jdGlvbiBfdXNlUmF3RG9tYWluIChzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIHJldHVybiBzY2FsZS51c2VSYXdEb21haW4gJiYgLy8gIGlmIHVzZVJhd0RvbWFpbiBpcyBlbmFibGVkXG4gICAgLy8gb25seSBhcHBsaWVkIHRvIGFnZ3JlZ2F0ZSB0YWJsZVxuICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJlxuICAgIC8vIG9ubHkgYWN0aXZhdGVkIGlmIHVzZWQgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZXMgdmFsdWVzIHJhbmdpbmcgaW4gdGhlIGRvbWFpbiBvZiB0aGUgc291cmNlIGRhdGFcbiAgICBTSEFSRURfRE9NQUlOX09QUy5pbmRleE9mKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkgPj0gMCAmJlxuICAgIChcbiAgICAgIC8vIFEgYWx3YXlzIHVzZXMgcXVhbnRpdGF0aXZlIHNjYWxlIGV4Y2VwdCB3aGVuIGl0J3MgYmlubmVkLlxuICAgICAgLy8gQmlubmVkIGZpZWxkIGhhcyBzaW1pbGFyIHZhbHVlcyBpbiBib3RoIHRoZSBzb3VyY2UgdGFibGUgYW5kIHRoZSBzdW1tYXJ5IHRhYmxlXG4gICAgICAvLyBidXQgdGhlIHN1bW1hcnkgdGFibGUgaGFzIGZld2VyIHZhbHVlcywgdGhlcmVmb3JlIGJpbm5lZCBmaWVsZHMgZHJhd1xuICAgICAgLy8gZG9tYWluIHZhbHVlcyBmcm9tIHRoZSBzdW1tYXJ5IHRhYmxlLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSAmJiAhZmllbGREZWYuYmluKSB8fFxuICAgICAgLy8gVCB1c2VzIG5vbi1vcmRpbmFsIHNjYWxlIHdoZW4gdGhlcmUncyBubyB1bml0IG9yIHdoZW4gdGhlIHVuaXQgaXMgbm90IG9yZGluYWwuXG4gICAgICAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpXG4gICAgKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VNaXhpbnMoc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBhbnkge1xuICAvLyBUT0RPOiBuZWVkIHRvIGFkZCBydWxlIGZvciBxdWFudGlsZSwgcXVhbnRpemUsIHRocmVzaG9sZCBzY2FsZVxuXG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gIGNvbnN0IHNjYWxlQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuc2NhbGU7XG5cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIHNjYWxlLmJhbmRTaXplICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4ge2JhbmRTaXplOiBzY2FsZS5iYW5kU2l6ZX07XG4gIH1cblxuICBpZiAoc2NhbGUucmFuZ2UgJiYgIWNvbnRhaW5zKFtYLCBZLCBST1csIENPTFVNTl0sIGNoYW5uZWwpKSB7XG4gICAgLy8gZXhwbGljaXQgdmFsdWUgKERvIG5vdCBhbGxvdyBleHBsaWNpdCB2YWx1ZXMgZm9yIFgsIFksIFJPVywgQ09MVU1OKVxuICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlLnJhbmdlfTtcbiAgfVxuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFJPVzpcbiAgICAgIHJldHVybiB7cmFuZ2U6ICdoZWlnaHQnfTtcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7cmFuZ2U6ICd3aWR0aCd9O1xuICB9XG5cbiAgLy8gSWYgbm90IFJPVyAvIENPTFVNTiwgd2UgY2FuIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSB1bml0IHNwZWMuXG4gIGNvbnN0IHVuaXRNb2RlbCA9IG1vZGVsIGFzIFVuaXRNb2RlbDtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgICAgLy8gd2UgY2FuJ3QgdXNlIHtyYW5nZTogXCJ3aWR0aFwifSBoZXJlIHNpbmNlIHdlIHB1dCBzY2FsZSBpbiB0aGUgcm9vdCBncm91cFxuICAgICAgLy8gbm90IGluc2lkZSB0aGUgY2VsbCwgc28gc2NhbGUgaXMgcmV1c2FibGUgZm9yIGF4ZXMgZ3JvdXBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IDAsXG4gICAgICAgIHJhbmdlTWF4OiB1bml0TW9kZWwuY29uZmlnKCkuY2VsbC53aWR0aCAvLyBGaXhlZCBjZWxsIHdpZHRoIGZvciBub24tb3JkaW5hbFxuICAgICAgfTtcbiAgICBjYXNlIFk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICByYW5nZU1pbjogdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0LCAvLyBGaXhlZCBjZWxsIGhlaWdodCBmb3Igbm9uLW9yZGluYWxcbiAgICAgICAgcmFuZ2VNYXg6IDBcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuXG4gICAgICBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gQkFSKSB7XG4gICAgICAgIGlmIChzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLmJhclNpemVSYW5nZX07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJyA/IFkgOiBYO1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBbbW9kZWwuY29uZmlnKCkubWFyay5iYXJUaGluU2l6ZSwgbW9kZWwuc2NhbGUoZGltZW5zaW9uKS5iYW5kU2l6ZV19O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBURVhUTUFSSykge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5mb250U2l6ZVJhbmdlIH07XG4gICAgICB9IGVsc2UgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IFJVTEUpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucnVsZVNpemVSYW5nZSB9O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBUSUNLKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnRpY2tTaXplUmFuZ2UgfTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgLS0gcG9pbnQsIHNxdWFyZSwgY2lyY2xlXG4gICAgICBpZiAoc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5wb2ludFNpemVSYW5nZX07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhbmRTaXplID0gcG9pbnRCYW5kU2l6ZSh1bml0TW9kZWwpO1xuXG4gICAgICByZXR1cm4ge3JhbmdlOiBbOSwgKGJhbmRTaXplIC0gMikgKiAoYmFuZFNpemUgLSAyKV19O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5zaGFwZVJhbmdlfTtcbiAgICBjYXNlIENPTE9SOlxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE5PTUlOQUwpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcubm9taW5hbENvbG9yUmFuZ2V9O1xuICAgICAgfVxuICAgICAgLy8gZWxzZSAtLSBvcmRpbmFsLCB0aW1lLCBvciBxdWFudGl0YXRpdmVcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNlcXVlbnRpYWxDb2xvclJhbmdlfTtcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5vcGFjaXR5fTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHBvaW50QmFuZFNpemUobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGNvbnN0IGhhc1ggPSBtb2RlbC5oYXMoWCk7XG4gIGNvbnN0IGhhc1kgPSBtb2RlbC5oYXMoWSk7XG5cbiAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShtb2RlbC5lbmNvZGluZygpLngpO1xuICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKG1vZGVsLmVuY29kaW5nKCkueSk7XG5cbiAgaWYgKGhhc1ggJiYgaGFzWSkge1xuICAgIHJldHVybiB4SXNNZWFzdXJlICE9PSB5SXNNZWFzdXJlID9cbiAgICAgIG1vZGVsLnNjYWxlKHhJc01lYXN1cmUgPyBZIDogWCkuYmFuZFNpemUgOlxuICAgICAgTWF0aC5taW4oXG4gICAgICAgIG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplLFxuICAgICAgICBtb2RlbC5zY2FsZShZKS5iYW5kU2l6ZSB8fCBzY2FsZUNvbmZpZy5iYW5kU2l6ZVxuICAgICAgKTtcbiAgfSBlbHNlIGlmIChoYXNZKSB7XG4gICAgcmV0dXJuIHlJc01lYXN1cmUgPyBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSA6IG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplO1xuICB9IGVsc2UgaWYgKGhhc1gpIHtcbiAgICByZXR1cm4geElzTWVhc3VyZSA/IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIDogbW9kZWwuc2NhbGUoWCkuYmFuZFNpemU7XG4gIH1cbiAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAoc2NhbGU6IFNjYWxlKSB7XG4gIC8vIE9ubHkgd29ya3MgZm9yIHNjYWxlIHdpdGggYm90aCBjb250aW51b3VzIGRvbWFpbiBjb250aW51b3VzIHJhbmdlXG4gIC8vIChEb2Vzbid0IHdvcmsgZm9yIHF1YW50aXplLCBxdWFudGlsZSwgdGhyZXNob2xkLCBvcmRpbmFsKVxuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULFxuICAgICAgICBTY2FsZVR5cGUuTE9HLCBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKSB7XG4gICAgcmV0dXJuIHNjYWxlLmNsYW1wO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudChzY2FsZTogU2NhbGUpIHtcbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5QT1cpIHtcbiAgICByZXR1cm4gc2NhbGUuZXhwb25lbnQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5pY2Uoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpOiBib29sZWFuIHwgTmljZVRpbWUge1xuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULCBTY2FsZVR5cGUuTE9HLFxuICAgICAgICBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLlFVQU5USVpFXSwgc2NhbGUudHlwZSkpIHtcblxuICAgIGlmIChzY2FsZS5uaWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS5uaWNlO1xuICAgIH1cbiAgICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpIHtcbiAgICAgIHJldHVybiBzbWFsbGVzdFVuaXQoZmllbGREZWYudGltZVVuaXQpIGFzIGFueTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7IC8vIHJldHVybiB0cnVlIGZvciBxdWFudGl0YXRpdmUgWC9ZXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLyogUGFkZGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIFggYW5kIFkuXG4gICAqXG4gICAqIEJhc2ljYWxseSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gYWRkIHBhZGRpbmcgZm9yIGNvbG9yIGFuZCBzaXplLlxuICAgKlxuICAgKiBXZSBkbyBub3QgdXNlIGQzIHNjYWxlJ3MgcGFkZGluZyBmb3Igcm93L2NvbHVtbiBiZWNhdXNlIHBhZGRpbmcgdGhlcmVcbiAgICogaXMgYSByYXRpbyAoWzAsIDFdKSBhbmQgaXQgY2F1c2VzIHRoZSBwYWRkaW5nIHRvIGJlIGRlY2ltYWxzLlxuICAgKiBUaGVyZWZvcmUsIHdlIG1hbnVhbGx5IGNhbGN1bGF0ZSBwYWRkaW5nIGluIHRoZSBsYXlvdXQgYnkgb3Vyc2VsdmVzLlxuICAgKi9cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gc2NhbGUucGFkZGluZztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgX18sIG1vZGVsOiBNb2RlbCkge1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIC8vIFdlIGFsd2F5cyB1c2Ugb3JkaW5hbCBwb2ludCBzY2FsZSBmb3IgeCBhbmQgeS5cbiAgICAvLyBUaHVzIGBwb2ludHNgIGlzbid0IGluY2x1ZGVkIGluIHRoZSBzY2FsZSdzIHNjaGVtYS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU4sIFNJWkVdLCBjaGFubmVsKSAmJiBzY2FsZS5yb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnJvdW5kO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8oc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgLy8gb25seSBhcHBsaWNhYmxlIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICBpZiAoIWNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLk9SRElOQUxdLCBzY2FsZS50eXBlKSkge1xuICAgIGlmIChzY2FsZS56ZXJvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS56ZXJvO1xuICAgIH1cbiAgICAvLyBCeSBkZWZhdWx0LCByZXR1cm4gdHJ1ZSBvbmx5IGZvciBub24tYmlubmVkLCBxdWFudGl0YXRpdmUgeC1zY2FsZSBvciB5LXNjYWxlLlxuICAgIHJldHVybiAhZmllbGREZWYuYmluICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7Y29udGFpbnMsIHJhbmdlfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFNIQVBFLCBDT0xPUiwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1RpbWVVbml0LCBjb250YWluc1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5cbi8qKiByZXR1cm5zIHRoZSBzbWFsbGVzdCBuaWNlIHVuaXQgZm9yIHNjYWxlLm5pY2UgKi9cbmV4cG9ydCBmdW5jdGlvbiBzbWFsbGVzdFVuaXQodGltZVVuaXQpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5TRUNPTkRTKSkge1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSU5VVEVTKSkge1xuICAgIHJldHVybiAnbWludXRlJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICByZXR1cm4gJ2hvdXInO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBWSkgfHxcbiAgICAgIGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBVEUpKSB7XG4gICAgcmV0dXJuICdkYXknO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1PTlRIKSkge1xuICAgIHJldHVybiAnbW9udGgnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LllFQVIpKSB7XG4gICAgcmV0dXJuICd5ZWFyJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHRpbWVVbml0OiBUaW1lVW5pdCwgZmllbGRSZWY6IHN0cmluZywgb25seVJlZiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgbGV0IG91dCA9ICdkYXRldGltZSgnO1xuXG4gIGZ1bmN0aW9uIGZ1bmMoZnVuOiBzdHJpbmcsIGFkZENvbW1hID0gdHJ1ZSkge1xuICAgIGlmIChvbmx5UmVmKSB7XG4gICAgICByZXR1cm4gZmllbGRSZWYgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzID0gJyc7XG4gICAgICBpZiAoZnVuID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgLy8gRGl2aWRlIGJ5IDMgdG8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHF1YXJ0ZXIgbnVtYmVyLCBtdWx0aXBseSBieSAzXG4gICAgICAgIC8vIHRvIHNjYWxlIHRvIHRoZSBmaXJzdCBtb250aCBvZiB0aGUgY29ycmVzcG9uZGluZyBxdWFydGVyKDAsMyw2LDkpLlxuICAgICAgICByZXMgPSAnZmxvb3IobW9udGgoJyArIGZpZWxkUmVmICsgJyknICsgJy8zKSozJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyA9IGZ1biArICcoJyArIGZpZWxkUmVmICsgJyknIDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMgKyAoYWRkQ29tbWEgPyAnLCAnIDogJycpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5ZRUFSKSkge1xuICAgIG91dCArPSBmdW5jKCd5ZWFyJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcyMDA2LCAnOyAvLyBKYW51YXJ5IDEgMjAwNiBpcyBhIFN1bmRheVxuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1PTlRIKSkge1xuICAgIG91dCArPSBmdW5jKCdtb250aCcpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlFVQVJURVIpKSB7XG4gICAgb3V0ICs9IGZ1bmMoJ3F1YXJ0ZXInKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtb250aCBzdGFydHMgYXQgMCBpbiBqYXZhc2NyaXB0XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgLy8gbmVlZCB0byBhZGQgMSBiZWNhdXNlIGRheXMgc3RhcnQgYXQgMVxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSkge1xuICAgIG91dCArPSBmdW5jKCdkYXknLCBmYWxzZSkgKyAnKzEsICc7XG4gIH0gZWxzZSBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFURSkpIHtcbiAgICBvdXQgKz0gZnVuYygnZGF0ZScpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMSwgJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICBvdXQgKz0gZnVuYygnaG91cnMnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTUlOVVRFUykpIHtcbiAgICBvdXQgKz0gZnVuYygnbWludXRlcycpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCwgJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5TRUNPTkRTKSkge1xuICAgIG91dCArPSBmdW5jKCdzZWNvbmRzJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1JTExJU0VDT05EUykpIHtcbiAgICBvdXQgKz0gZnVuYygnbWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCc7XG4gIH1cblxuICByZXR1cm4gb3V0ICsgJyknO1xufVxuXG4vKiogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHJhdyBkb21haW4uICovXG5leHBvcnQgZnVuY3Rpb24gcmF3RG9tYWluKHRpbWVVbml0OiBUaW1lVW5pdCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRSwgQ09MT1JdLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5NSU5VVEVTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDYwKTtcbiAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDI0KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgIHJldHVybiByYW5nZSgwLCA3KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBVEU6XG4gICAgICByZXR1cm4gcmFuZ2UoMSwgMzIpO1xuICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgMTIpO1xuICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgIHJldHVybiBbMCwzLDYsOV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0F4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFRFWFQsIFBBVEgsIE9SREVSLCBDaGFubmVsLCBVTklUX0NIQU5ORUxTLCAgVU5JVF9TQ0FMRV9DSEFOTkVMUywgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUywgc3VwcG9ydE1hcmt9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWcsIENlbGxDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4uL2VuY29kaW5nJzsgLy8gVE9ETzogcmVtb3ZlXG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtNYXJrLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWUsIFFVQU5USVRBVElWRX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2R1cGxpY2F0ZSwgZXh0ZW5kLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2FwcGx5Q29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUd9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7aW5pdE1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZVVuaXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge3BhcnNlTGVnZW5kQ29tcG9uZW50fSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZVVuaXRMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZU1hcmt9IGZyb20gJy4vbWFyay9tYXJrJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudCwgc2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7c3RhY2ssIFN0YWNrUHJvcGVydGllc30gZnJvbSAnLi4vc3RhY2snO1xuXG4vKipcbiAqIEludGVybmFsIG1vZGVsIG9mIFZlZ2EtTGl0ZSBzcGVjaWZpY2F0aW9uIGZvciB0aGUgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbml0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG5cbiAgcHJpdmF0ZSBfbWFyazogTWFyaztcbiAgcHJpdmF0ZSBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuICBwcml2YXRlIF9zdGFjazogU3RhY2tQcm9wZXJ0aWVzO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgY29uc3QgbWFyayA9IHRoaXMuX21hcmsgPSBzcGVjLm1hcms7XG4gICAgY29uc3QgZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZyA9IHRoaXMuX2luaXRFbmNvZGluZyhtYXJrLCBzcGVjLmVuY29kaW5nIHx8IHt9KTtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQsIG1hcmssIGVuY29kaW5nKTtcblxuICAgIHRoaXMuX3NjYWxlID0gIHRoaXMuX2luaXRTY2FsZShtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICB0aGlzLl9heGlzID0gdGhpcy5faW5pdEF4aXMoZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fbGVnZW5kID0gdGhpcy5faW5pdExlZ2VuZChlbmNvZGluZywgY29uZmlnKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdGFjayBwcm9wZXJ0aWVzXG4gICAgdGhpcy5fc3RhY2sgPSBzdGFjayhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFbmNvZGluZyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZW5jb2RpbmcgPSBkdXBsaWNhdGUoZW5jb2RpbmcpO1xuXG4gICAgdmxFbmNvZGluZy5mb3JFYWNoKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmICghc3VwcG9ydE1hcmsoY2hhbm5lbCwgbWFyaykpIHtcbiAgICAgICAgLy8gRHJvcCB1bnN1cHBvcnRlZCBjaGFubmVsXG5cbiAgICAgICAgLy8gRklYTUUgY29uc29saWRhdGUgd2FybmluZyBtZXRob2RcbiAgICAgICAgY29uc29sZS53YXJuKGNoYW5uZWwsICdkcm9wcGVkIGFzIGl0IGlzIGluY29tcGF0aWJsZSB3aXRoJywgbWFyayk7XG4gICAgICAgIGRlbGV0ZSBmaWVsZERlZi5maWVsZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudHlwZSkge1xuICAgICAgICAvLyBjb252ZXJ0IHNob3J0IHR5cGUgdG8gZnVsbCB0eXBlXG4gICAgICAgIGZpZWxkRGVmLnR5cGUgPSBnZXRGdWxsTmFtZShmaWVsZERlZi50eXBlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChjaGFubmVsID09PSBQQVRIIHx8IGNoYW5uZWwgPT09IE9SREVSKSAmJiAhZmllbGREZWYuYWdncmVnYXRlICYmIGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBBZ2dyZWdhdGVPcC5NSU47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuY29kaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwsIG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgIGxldCBjb25maWcgPSBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSwgc3BlY0NvbmZpZyk7XG4gICAgY29uZmlnLm1hcmsgPSBpbml0TWFya0NvbmZpZyhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PFNjYWxlPiB7XG4gICAgcmV0dXJuIFVOSVRfU0NBTEVfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKF9zY2FsZSwgY2hhbm5lbCkge1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSB8fFxuICAgICAgICAgIChjaGFubmVsID09PSBYICYmIHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBYMikpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFkgJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFkyKSlcbiAgICAgICAgKSB7XG5cbiAgICAgICAgY29uc3QgY2hhbm5lbERlZiA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSAoY2hhbm5lbERlZiB8fCB7fSkuc2NhbGUgfHwge307XG4gICAgICAgIGNvbnN0IF9zY2FsZVR5cGUgPSBzY2FsZVR5cGUoc2NhbGVTcGVjLCBjaGFubmVsRGVmLCBjaGFubmVsLCBtYXJrKTtcblxuICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6IF9zY2FsZVR5cGUsXG4gICAgICAgICAgcm91bmQ6IGNvbmZpZy5zY2FsZS5yb3VuZCxcbiAgICAgICAgICBwYWRkaW5nOiBjb25maWcuc2NhbGUucGFkZGluZyxcbiAgICAgICAgICB1c2VSYXdEb21haW46IGNvbmZpZy5zY2FsZS51c2VSYXdEb21haW4sXG4gICAgICAgICAgYmFuZFNpemU6IGNoYW5uZWwgPT09IFggJiYgX3NjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgbWFyayA9PT0gVEVYVE1BUksgP1xuICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNjYWxlLnRleHRCYW5kV2lkdGggOiBjb25maWcuc2NhbGUuYmFuZFNpemVcbiAgICAgICAgfSwgc2NhbGVTcGVjKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZT4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF4aXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IERpY3Q8QXhpcz4ge1xuICAgIHJldHVybiBbWCwgWV0ucmVkdWNlKGZ1bmN0aW9uKF9heGlzLCBjaGFubmVsKSB7XG4gICAgICAvLyBQb3NpdGlvbiBBeGlzXG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFggJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFgyKSkgfHxcbiAgICAgICAgICAoY2hhbm5lbCA9PT0gWSAmJiB2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgWTIpKSkge1xuXG4gICAgICAgIGNvbnN0IGF4aXNTcGVjID0gKGVuY29kaW5nW2NoYW5uZWxdIHx8IHt9KS5heGlzO1xuICAgICAgICBpZiAoYXhpc1NwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2F4aXNbY2hhbm5lbF0gPSBleHRlbmQoe30sXG4gICAgICAgICAgICBjb25maWcuYXhpcyxcbiAgICAgICAgICAgIGF4aXNTcGVjID09PSB0cnVlID8ge30gOiBheGlzU3BlYyB8fCAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TGVnZW5kKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PExlZ2VuZD4ge1xuICAgIHJldHVybiBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfbGVnZW5kLCBjaGFubmVsKSB7XG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGxlZ2VuZFNwZWMgPSBlbmNvZGluZ1tjaGFubmVsXS5sZWdlbmQ7XG4gICAgICAgIGlmIChsZWdlbmRTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIF9sZWdlbmRbY2hhbm5lbF0gPSBleHRlbmQoe30sIGNvbmZpZy5sZWdlbmQsXG4gICAgICAgICAgICBsZWdlbmRTcGVjID09PSB0cnVlID8ge30gOiBsZWdlbmRTcGVjIHx8ICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfbGVnZW5kO1xuICAgIH0sIHt9IGFzIERpY3Q8TGVnZW5kPik7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZVVuaXREYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZVVuaXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBwYXJzZU1hcmsodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1gsIFldKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSBwYXJzZUxlZ2VuZENvbXBvbmVudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFyaztcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKSB7XG4gICAgcmV0dXJuIGFwcGx5Q29uZmlnKHt9LCBjZWxsQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFVOSVRfQ0hBTk5FTFM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCk6IFN0YWNrUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrO1xuICB9XG5cbiAgcHVibGljIHRvU3BlYyhleGNsdWRlQ29uZmlnPywgZXhjbHVkZURhdGE/KSB7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBkdXBsaWNhdGUodGhpcy5fZW5jb2RpbmcpO1xuICAgIGxldCBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fbWFyayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgIH07XG5cbiAgICBpZiAoIWV4Y2x1ZGVDb25maWcpIHtcbiAgICAgIHNwZWMuY29uZmlnID0gZHVwbGljYXRlKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFleGNsdWRlRGF0YSkge1xuICAgICAgc3BlYy5kYXRhID0gZHVwbGljYXRlKHRoaXMuX2RhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgcHVibGljIG1hcmsoKTogTWFyayB7XG4gICAgcmV0dXJuIHRoaXMuX21hcms7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5oYXModGhpcy5fZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGVuY29kaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHx8IHt9XG4gICAgLy8gQ3VycmVudGx5IHdlIGhhdmUgaXQgdG8gcHJldmVudCBudWxsIHBvaW50ZXIgZXhjZXB0aW9uLlxuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZ1tjaGFubmVsXSB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgXCJmaWVsZFwiIHJlZmVyZW5jZSBmb3IgdmVnYSAqL1xuICBwdWJsaWMgZmllbGQoY2hhbm5lbDogQ2hhbm5lbCwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogdGhpcy5zY2FsZShjaGFubmVsKS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgIH0sIG9wdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkKGZpZWxkRGVmLCBvcHQpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTmFtZSh2bEVuY29kaW5nLmlzQWdncmVnYXRlKHRoaXMuX2VuY29kaW5nKSA/IFNVTU1BUlkgOiBTT1VSQ0UpO1xuICB9XG5cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTY2FsZUNvbmZpZywgRmFjZXRTY2FsZUNvbmZpZywgZGVmYXVsdFNjYWxlQ29uZmlnLCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZ30gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge0F4aXNDb25maWcsIGRlZmF1bHRBeGlzQ29uZmlnLCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtMZWdlbmRDb25maWcsIGRlZmF1bHRMZWdlbmRDb25maWd9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4vc3RhY2snO1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxDb25maWcge1xuICB3aWR0aD86IG51bWJlcjtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuXG4gIGNsaXA/OiBib29sZWFuO1xuXG4gIC8vIEZJTExfU1RST0tFX0NPTkZJR1xuICAvKipcbiAgICogVGhlIGZpbGwgY29sb3IuXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGZpbGw/OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBmaWxsIG9wYWNpdHkgKHZhbHVlIGJldHdlZW4gWzAsMV0pLiAqL1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcblxuICAvKiogVGhlIHN0cm9rZSBjb2xvci4gKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgc3Ryb2tlIG9wYWNpdHkgKHZhbHVlIGJldHdlZW4gWzAsMV0pLiAqL1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKiBUaGUgc3Ryb2tlIHdpZHRoLCBpbiBwaXhlbHMuICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuICovXG4gIHN0cm9rZURhc2g/OiBudW1iZXJbXTtcblxuICAvKiogVGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBpbnRvIHdoaWNoIHRvIGJlZ2luIGRyYXdpbmcgd2l0aCB0aGUgc3Ryb2tlIGRhc2ggYXJyYXkuICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgd2lkdGg6IDIwMCxcbiAgaGVpZ2h0OiAyMDBcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRDZWxsQ29uZmlnOiBDZWxsQ29uZmlnID0ge1xuICBzdHJva2U6ICcjY2NjJyxcbiAgc3Ryb2tlV2lkdGg6IDFcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRDb25maWcge1xuICAvKiogRmFjZXQgU2NhbGUgQ29uZmlnICovXG4gIHNjYWxlPzogRmFjZXRTY2FsZUNvbmZpZztcblxuICAvKiogRmFjZXQgQXhpcyBDb25maWcgKi9cbiAgYXhpcz86IEF4aXNDb25maWc7XG5cbiAgLyoqIEZhY2V0IEdyaWQgQ29uZmlnICovXG4gIGdyaWQ/OiBGYWNldEdyaWRDb25maWc7XG5cbiAgLyoqIEZhY2V0IENlbGwgQ29uZmlnICovXG4gIGNlbGw/OiBDZWxsQ29uZmlnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0R3JpZENvbmZpZyB7XG4gIC8qKiBAZm9ybWF0IGNvbG9yICovXG4gIGNvbG9yPzogc3RyaW5nO1xuICBvcGFjaXR5PzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG59XG5cbmNvbnN0IGRlZmF1bHRGYWNldEdyaWRDb25maWc6IEZhY2V0R3JpZENvbmZpZyA9IHtcbiAgY29sb3I6ICcjMDAwMDAwJyxcbiAgb3BhY2l0eTogMC40LFxuICBvZmZzZXQ6IDBcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRDb25maWc6IEZhY2V0Q29uZmlnID0ge1xuICBzY2FsZTogZGVmYXVsdEZhY2V0U2NhbGVDb25maWcsXG4gIGF4aXM6IGRlZmF1bHRGYWNldEF4aXNDb25maWcsXG4gIGdyaWQ6IGRlZmF1bHRGYWNldEdyaWRDb25maWcsXG4gIGNlbGw6IGRlZmF1bHRGYWNldENlbGxDb25maWdcbn07XG5cbmV4cG9ydCBlbnVtIEZvbnRXZWlnaHQge1xuICAgIE5PUk1BTCA9ICdub3JtYWwnIGFzIGFueSxcbiAgICBCT0xEID0gJ2JvbGQnIGFzIGFueVxufVxuXG5leHBvcnQgZW51bSBTaGFwZSB7XG4gICAgQ0lSQ0xFID0gJ2NpcmNsZScgYXMgYW55LFxuICAgIFNRVUFSRSA9ICdzcXVhcmUnIGFzIGFueSxcbiAgICBDUk9TUyA9ICdjcm9zcycgYXMgYW55LFxuICAgIERJQU1PTkQgPSAnZGlhbW9uZCcgYXMgYW55LFxuICAgIFRSSUFOR0xFVVAgPSAndHJpYW5nbGUtdXAnIGFzIGFueSxcbiAgICBUUklBTkdMRURPV04gPSAndHJpYW5nbGUtZG93bicgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBIb3Jpem9udGFsQWxpZ24ge1xuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIFJJR0hUID0gJ3JpZ2h0JyBhcyBhbnksXG4gICAgQ0VOVEVSID0gJ2NlbnRlcicgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBWZXJ0aWNhbEFsaWduIHtcbiAgICBUT1AgPSAndG9wJyBhcyBhbnksXG4gICAgTUlERExFID0gJ21pZGRsZScgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gRm9udFN0eWxlIHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgSVRBTElDID0gJ2l0YWxpYycgYXMgYW55LFxufVxuXG5cblxuZXhwb3J0IGVudW0gSW50ZXJwb2xhdGUge1xuICAgIC8qKiBwaWVjZXdpc2UgbGluZWFyIHNlZ21lbnRzLCBhcyBpbiBhIHBvbHlsaW5lICovXG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIC8qKiBjbG9zZSB0aGUgbGluZWFyIHNlZ21lbnRzIHRvIGZvcm0gYSBwb2x5Z29uICovXG4gICAgTElORUFSX0NMT1NFRCA9ICdsaW5lYXItY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQID0gJ3N0ZXAnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gdmVydGljYWwgYW5kIGhvcml6b250YWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVBfQkVGT1JFID0gJ3N0ZXAtYmVmb3JlJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQX0FGVEVSID0gJ3N0ZXAtYWZ0ZXInIGFzIGFueSxcbiAgICAvKiogYSBCLXNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQkFTSVMgPSAnYmFzaXMnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBCLXNwbGluZTsgbWF5IG5vdCBpbnRlcnNlY3QgdGhlIHN0YXJ0IG9yIGVuZCAqL1xuICAgIEJBU0lTX09QRU4gPSAnYmFzaXMtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBCLXNwbGluZSwgYXMgaW4gYSBsb29wICovXG4gICAgQkFTSVNfQ0xPU0VEID0gJ2Jhc2lzLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBhIENhcmRpbmFsIHNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQ0FSRElOQUwgPSAnY2FyZGluYWwnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBDYXJkaW5hbCBzcGxpbmU7IG1heSBub3QgaW50ZXJzZWN0IHRoZSBzdGFydCBvciBlbmQsIGJ1dCB3aWxsIGludGVyc2VjdCBvdGhlciBjb250cm9sIHBvaW50cyAqL1xuICAgIENBUkRJTkFMX09QRU4gPSAnY2FyZGluYWwtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBDYXJkaW5hbCBzcGxpbmUsIGFzIGluIGEgbG9vcCAqL1xuICAgIENBUkRJTkFMX0NMT1NFRCA9ICdjYXJkaW5hbC1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogZXF1aXZhbGVudCB0byBiYXNpcywgZXhjZXB0IHRoZSB0ZW5zaW9uIHBhcmFtZXRlciBpcyB1c2VkIHRvIHN0cmFpZ2h0ZW4gdGhlIHNwbGluZSAqL1xuICAgIEJVTkRMRSA9ICdidW5kbGUnIGFzIGFueSxcbiAgICAvKiogY3ViaWMgaW50ZXJwb2xhdGlvbiB0aGF0IHByZXNlcnZlcyBtb25vdG9uaWNpdHkgaW4geSAqL1xuICAgIE1PTk9UT05FID0gJ21vbm90b25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEFyZWFPdmVybGF5IHtcbiAgTElORSA9ICdsaW5lJyBhcyBhbnksXG4gIExJTkVQT0lOVCA9ICdsaW5lcG9pbnQnIGFzIGFueSxcbiAgTk9ORSA9ICdub25lJyBhcyBhbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdmVybGF5Q29uZmlnIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gb3ZlcmxheSBsaW5lIHdpdGggcG9pbnQuXG4gICAqL1xuICBsaW5lPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHlwZSBvZiBvdmVybGF5IGZvciBhcmVhIG1hcmsgKGxpbmUgb3IgbGluZXBvaW50KVxuICAgKi9cbiAgYXJlYT86IEFyZWFPdmVybGF5O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHN0eWxlIGZvciB0aGUgb3ZlcmxheWVkIHBvaW50LlxuICAgKi9cbiAgcG9pbnRTdHlsZT86IE1hcmtDb25maWc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgc3R5bGUgZm9yIHRoZSBvdmVybGF5ZWQgcG9pbnQuXG4gICAqL1xuICBsaW5lU3R5bGU/OiBNYXJrQ29uZmlnO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE92ZXJsYXlDb25maWc6IE92ZXJsYXlDb25maWcgPSB7XG4gIGxpbmU6IGZhbHNlLFxuICBwb2ludFN0eWxlOiB7ZmlsbGVkOiB0cnVlfSxcbiAgbGluZVN0eWxlOiB7fVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIHtcblxuICAvLyAtLS0tLS0tLS0tIENvbG9yIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNoYXBlXFwncyBjb2xvciBzaG91bGQgYmUgdXNlZCBhcyBmaWxsIGNvbG9yIGluc3RlYWQgb2Ygc3Ryb2tlIGNvbG9yLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGljYWJsZSBmb3IgXCJiYXJcIiwgXCJwb2ludFwiLCBhbmQgXCJhcmVhXCIuXG4gICAqIEFsbCBtYXJrcyBleGNlcHQgXCJwb2ludFwiIG1hcmtzIGFyZSBmaWxsZWQgYnkgZGVmYXVsdC5cbiAgICogU2VlIE1hcmsgRG9jdW1lbnRhdGlvbiAoaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL21hcmtzLmh0bWwpXG4gICAqIGZvciB1c2FnZSBleGFtcGxlLlxuICAgKi9cbiAgZmlsbGVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmYXVsdCBjb2xvci5cbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgRmlsbCBDb2xvci4gIFRoaXMgaGFzIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gY29uZmlnLmNvbG9yXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGZpbGw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgU3Ryb2tlIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3BhY2l0eSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqIEBtYXhpbXVtIDFcbiAgICovXG4gIG9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFN0cm9rZSBTdHlsZSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKi9cbiAgc3Ryb2tlRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS5cbiAgICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBTdGFja2luZzogQmFyICYgQXJlYSAtLS0tLS0tLS0tXG4gIHN0YWNrZWQ/OiBTdGFja09mZnNldDtcblxuICAvLyAtLS0tLS0tLS0tIE9yaWVudGF0aW9uOiBCYXIsIFRpY2ssIExpbmUsIEFyZWEgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIGEgbm9uLXN0YWNrZWQgYmFyLCB0aWNrLCBhcmVhLCBhbmQgbGluZSBjaGFydHMuXG4gICAqIFRoZSB2YWx1ZSBpcyBlaXRoZXIgaG9yaXpvbnRhbCAoZGVmYXVsdCkgb3IgdmVydGljYWwuXG4gICAqIC0gRm9yIGJhciwgcnVsZSBhbmQgdGljaywgdGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNpemUgb2YgdGhlIGJhciBhbmQgdGlja1xuICAgKiBzaG91bGQgYmUgYXBwbGllZCB0byB4IG9yIHkgZGltZW5zaW9uLlxuICAgKiAtIEZvciBhcmVhLCB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG9yaWVudCBwcm9wZXJ0eSBvZiB0aGUgVmVnYSBvdXRwdXQuXG4gICAqIC0gRm9yIGxpbmUsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgc29ydCBvcmRlciBvZiB0aGUgcG9pbnRzIGluIHRoZSBsaW5lXG4gICAqIGlmIGBjb25maWcuc29ydExpbmVCeWAgaXMgbm90IHNwZWNpZmllZC5cbiAgICogRm9yIHN0YWNrZWQgY2hhcnRzLCB0aGlzIGlzIGFsd2F5cyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3RhY2s7XG4gICAqIHRoZXJlZm9yZSBleHBsaWNpdGx5IHNwZWNpZmllZCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gICAqL1xuICBvcmllbnQ/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBJbnRlcnBvbGF0aW9uOiBMaW5lIC8gYXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgbGluZSBpbnRlcnBvbGF0aW9uIG1ldGhvZCB0byB1c2UuIE9uZSBvZiBsaW5lYXIsIHN0ZXAtYmVmb3JlLCBzdGVwLWFmdGVyLCBiYXNpcywgYmFzaXMtb3BlbiwgY2FyZGluYWwsIGNhcmRpbmFsLW9wZW4sIG1vbm90b25lLlxuICAgKi9cbiAgaW50ZXJwb2xhdGU/OiBJbnRlcnBvbGF0ZTtcbiAgLyoqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgaW50ZXJwb2xhdGlvbiB0eXBlLCBzZXRzIHRoZSB0ZW5zaW9uIHBhcmFtZXRlci5cbiAgICovXG4gIHRlbnNpb24/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBMaW5lIC0tLS0tLS0tLVxuICAvKipcbiAgICogU2l6ZSBvZiBsaW5lIG1hcmsuXG4gICAqL1xuICBsaW5lU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFJ1bGUgLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBTaXplIG9mIHJ1bGUgbWFyay5cbiAgICovXG4gIHJ1bGVTaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQmFyIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBiYXJzLiAgSWYgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHNpemUgaXMgIGBiYW5kU2l6ZS0xYCxcbiAgICogd2hpY2ggcHJvdmlkZXMgMSBwaXhlbCBvZmZzZXQgYmV0d2VlbiBiYXJzLlxuICAgKi9cbiAgYmFyU2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMgb24gY29udGludW91cyBzY2FsZXMuXG4gICAqL1xuICBiYXJUaGluU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFBvaW50IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wgc2hhcGUgdG8gdXNlLiBPbmUgb2YgY2lyY2xlIChkZWZhdWx0KSwgc3F1YXJlLCBjcm9zcywgZGlhbW9uZCwgdHJpYW5nbGUtdXAsIG9yIHRyaWFuZ2xlLWRvd24uXG4gICAqL1xuICBzaGFwZT86IFNoYXBlO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgU2l6ZSAoUG9pbnQgLyBTcXVhcmUgLyBDaXJjbGUpIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBwaXhlbCBhcmVhIGVhY2ggdGhlIHBvaW50LiBGb3IgZXhhbXBsZTogaW4gdGhlIGNhc2Ugb2YgY2lyY2xlcywgdGhlIHJhZGl1cyBpcyBkZXRlcm1pbmVkIGluIHBhcnQgYnkgdGhlIHNxdWFyZSByb290IG9mIHRoZSBzaXplIHZhbHVlLlxuICAgKi9cbiAgc2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2sgLS0tLS0tLS0tLVxuICAvKiogVGhlIHdpZHRoIG9mIHRoZSB0aWNrcy4gKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG5cbiAgLyoqIFRoaWNrbmVzcyBvZiB0aGUgdGljayBtYXJrLiAqL1xuICB0aWNrVGhpY2tuZXNzPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGV4dCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiBsZWZ0LCByaWdodCwgY2VudGVyLlxuICAgKi9cbiAgYWxpZ24/OiBIb3Jpem9udGFsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIHRleHQsIGluIGRlZ3JlZXMuXG4gICAqL1xuICBhbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiB0b3AsIG1pZGRsZSwgYm90dG9tLlxuICAgKi9cbiAgYmFzZWxpbmU/OiBWZXJ0aWNhbEFsaWduO1xuICAvKipcbiAgICogVGhlIGhvcml6b250YWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuXG4gICAqL1xuICBkeD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR5PzogbnVtYmVyO1xuICAvKipcbiAgICogUG9sYXIgY29vcmRpbmF0ZSByYWRpYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuXG4gICAqL1xuICByYWRpdXM/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgdGV4dCBsYWJlbCBmcm9tIHRoZSBvcmlnaW4gZGV0ZXJtaW5lZCBieSB0aGUgeCBhbmQgeSBwcm9wZXJ0aWVzLiBWYWx1ZXMgZm9yIHRoZXRhIGZvbGxvdyB0aGUgc2FtZSBjb252ZW50aW9uIG9mIGFyYyBtYXJrIHN0YXJ0QW5nbGUgYW5kIGVuZEFuZ2xlIHByb3BlcnRpZXM6IGFuZ2xlcyBhcmUgbWVhc3VyZWQgaW4gcmFkaWFucywgd2l0aCAwIGluZGljYXRpbmcgXCJub3J0aFwiLlxuICAgKi9cbiAgdGhldGE/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdHlwZWZhY2UgdG8gc2V0IHRoZSB0ZXh0IGluIChlLmcuLCBIZWx2ZXRpY2EgTmV1ZSkuXG4gICAqL1xuICBmb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzdHlsZSAoZS5nLiwgaXRhbGljKS5cbiAgICovXG4gIGZvbnRTdHlsZT86IEZvbnRTdHlsZTtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCAoZS5nLiwgYm9sZCkuXG4gICAqL1xuICBmb250V2VpZ2h0PzogRm9udFdlaWdodDtcbiAgLy8gVmVnYS1MaXRlIG9ubHkgZm9yIHRleHQgb25seVxuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgdGV4dCB2YWx1ZS4gSWYgbm90IGRlZmluZWQsIHRoaXMgd2lsbCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciBUZXh0XG4gICAqL1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcHBseSBjb2xvciBmaWVsZCB0byBiYWNrZ3JvdW5kIGNvbG9yIGluc3RlYWQgb2YgdGhlIHRleHQuXG4gICAqL1xuICBhcHBseUNvbG9yVG9CYWNrZ3JvdW5kPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRNYXJrQ29uZmlnOiBNYXJrQ29uZmlnID0ge1xuICBjb2xvcjogJyM0NjgyYjQnLFxuICBzaGFwZTogU2hhcGUuQ0lSQ0xFLFxuICBzdHJva2VXaWR0aDogMixcbiAgc2l6ZTogMzAsXG4gIGJhclRoaW5TaXplOiAyLFxuICAvLyBsaW5lU2l6ZSBpcyB1bmRlZmluZWQgYnkgZGVmYXVsdCwgYW5kIHJlZmVyIHRvIHZhbHVlIGZyb20gc3Ryb2tlV2lkdGhcbiAgcnVsZVNpemU6IDEsXG4gIHRpY2tUaGlja25lc3M6IDEsXG5cbiAgZm9udFNpemU6IDEwLFxuICBiYXNlbGluZTogVmVydGljYWxBbGlnbi5NSURETEUsXG4gIHRleHQ6ICdBYmMnLFxuXG4gIHNob3J0VGltZUxhYmVsczogZmFsc2UsXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ6IGZhbHNlXG59O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgLy8gVE9ETzogYWRkIHRoaXMgYmFjayBvbmNlIHdlIGhhdmUgdG9wLWRvd24gbGF5b3V0IGFwcHJvYWNoXG4gIC8vIHdpZHRoPzogbnVtYmVyO1xuICAvLyBoZWlnaHQ/OiBudW1iZXI7XG4gIC8vIHBhZGRpbmc/OiBudW1iZXJ8c3RyaW5nO1xuICAvKipcbiAgICogVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG9uLXNjcmVlbiB2aWV3cG9ydCwgaW4gcGl4ZWxzLiBJZiBuZWNlc3NhcnksIGNsaXBwaW5nIGFuZCBzY3JvbGxpbmcgd2lsbCBiZSBhcHBsaWVkLlxuICAgKi9cbiAgdmlld3BvcnQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDU1MgY29sb3IgcHJvcGVydHkgdG8gdXNlIGFzIGJhY2tncm91bmQgb2YgdmlzdWFsaXphdGlvbi4gRGVmYXVsdCBpcyBgXCJ0cmFuc3BhcmVudFwiYC5cbiAgICovXG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEQzIE51bWJlciBmb3JtYXQgZm9yIGF4aXMgbGFiZWxzIGFuZCB0ZXh0IHRhYmxlcy4gRm9yIGV4YW1wbGUgXCJzXCIgZm9yIFNJIHVuaXRzLlxuICAgKi9cbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLlxuICAgKi9cbiAgdGltZUZvcm1hdD86IHN0cmluZztcblxuICAvKiogQ2VsbCBDb25maWcgKi9cbiAgY2VsbD86IENlbGxDb25maWc7XG5cbiAgLyoqIE1hcmsgQ29uZmlnICovXG4gIG1hcms/OiBNYXJrQ29uZmlnO1xuXG4gIC8qKiBNYXJrIE92ZXJsYXkgQ29uZmlnICovXG4gIG92ZXJsYXk/OiBPdmVybGF5Q29uZmlnO1xuXG4gIC8qKiBTY2FsZSBDb25maWcgKi9cbiAgc2NhbGU/OiBTY2FsZUNvbmZpZztcblxuICAvKiogQXhpcyBDb25maWcgKi9cbiAgYXhpcz86IEF4aXNDb25maWc7XG5cbiAgLyoqIExlZ2VuZCBDb25maWcgKi9cbiAgbGVnZW5kPzogTGVnZW5kQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBDb25maWcgKi9cbiAgZmFjZXQ/OiBGYWNldENvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IENvbmZpZyA9IHtcbiAgbnVtYmVyRm9ybWF0OiAncycsXG4gIHRpbWVGb3JtYXQ6ICclWS0lbS0lZCcsXG5cbiAgY2VsbDogZGVmYXVsdENlbGxDb25maWcsXG4gIG1hcms6IGRlZmF1bHRNYXJrQ29uZmlnLFxuICBvdmVybGF5OiBkZWZhdWx0T3ZlcmxheUNvbmZpZyxcbiAgc2NhbGU6IGRlZmF1bHRTY2FsZUNvbmZpZyxcbiAgYXhpczogZGVmYXVsdEF4aXNDb25maWcsXG4gIGxlZ2VuZDogZGVmYXVsdExlZ2VuZENvbmZpZyxcblxuICBmYWNldDogZGVmYXVsdEZhY2V0Q29uZmlnLFxufTtcbiIsIi8qXG4gKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YS5cbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL3R5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFGb3JtYXQge1xuICAvKipcbiAgICogVHlwZSBvZiBpbnB1dCBkYXRhOiBgXCJqc29uXCJgLCBgXCJjc3ZcImAsIGBcInRzdlwiYC5cbiAgICogVGhlIGRlZmF1bHQgZm9ybWF0IHR5cGUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBmaWxlIHVybC5cbiAgICogSWYgbm8gZXh0ZW5zaW9uIGlzIGRldGVjdGVkLCBgXCJqc29uXCJgIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgdHlwZT86IERhdGFGb3JtYXRUeXBlO1xuXG4gIC8qKlxuICAgKiBKU09OIG9ubHkpIFRoZSBKU09OIHByb3BlcnR5IGNvbnRhaW5pbmcgdGhlIGRlc2lyZWQgZGF0YS5cbiAgICogVGhpcyBwYXJhbWV0ZXIgY2FuIGJlIHVzZWQgd2hlbiB0aGUgbG9hZGVkIEpTT04gZmlsZSBtYXkgaGF2ZSBzdXJyb3VuZGluZyBzdHJ1Y3R1cmUgb3IgbWV0YS1kYXRhLlxuICAgKiBGb3IgZXhhbXBsZSBgXCJwcm9wZXJ0eVwiOiBcInZhbHVlcy5mZWF0dXJlc1wiYCBpcyBlcXVpdmFsZW50IHRvIHJldHJpZXZpbmcgYGpzb24udmFsdWVzLmZlYXR1cmVzYFxuICAgKiBmcm9tIHRoZSBsb2FkZWQgSlNPTiBvYmplY3QuXG4gICAqL1xuICBwcm9wZXJ0eT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFRvcG9KU09OIG9iamVjdCBzZXQgdG8gY29udmVydCB0byBhIEdlb0pTT04gZmVhdHVyZSBjb2xsZWN0aW9uLlxuICAgKiBGb3IgZXhhbXBsZSwgaW4gYSBtYXAgb2YgdGhlIHdvcmxkLCB0aGVyZSBtYXkgYmUgYW4gb2JqZWN0IHNldCBuYW1lZCBgXCJjb3VudHJpZXNcImAuXG4gICAqIFVzaW5nIHRoZSBmZWF0dXJlIHByb3BlcnR5LCB3ZSBjYW4gZXh0cmFjdCB0aGlzIHNldCBhbmQgZ2VuZXJhdGUgYSBHZW9KU09OIGZlYXR1cmUgb2JqZWN0IGZvciBlYWNoIGNvdW50cnkuXG4gICAqL1xuICBmZWF0dXJlPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFRvcG9KU09OIG9iamVjdCBzZXQgdG8gY29udmVydCB0byBhIG1lc2guXG4gICAqIFNpbWlsYXIgdG8gdGhlIGBmZWF0dXJlYCBvcHRpb24sIGBtZXNoYCBleHRyYWN0cyBhIG5hbWVkIFRvcG9KU09OIG9iamVjdCBzZXQuXG4gICAqICBVbmxpa2UgdGhlIGBmZWF0dXJlYCBvcHRpb24sIHRoZSBjb3JyZXNwb25kaW5nIGdlbyBkYXRhIGlzIHJldHVybmVkIGFzIGEgc2luZ2xlLCB1bmlmaWVkIG1lc2ggaW5zdGFuY2UsIG5vdCBhcyBpbmlkaXZpZHVhbCBHZW9KU09OIGZlYXR1cmVzLlxuICAgKiBFeHRyYWN0aW5nIGEgbWVzaCBpcyB1c2VmdWwgZm9yIG1vcmUgZWZmaWNpZW50bHkgZHJhd2luZyBib3JkZXJzIG9yIG90aGVyIGdlb2dyYXBoaWMgZWxlbWVudHMgdGhhdCB5b3UgZG8gbm90IG5lZWQgdG8gYXNzb2NpYXRlIHdpdGggc3BlY2lmaWMgcmVnaW9ucyBzdWNoIGFzIGluZGl2aWR1YWwgY291bnRyaWVzLCBzdGF0ZXMgb3IgY291bnRpZXMuXG4gICAqL1xuICBtZXNoPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBEYXRhRm9ybWF0VHlwZSB7XG4gICAgSlNPTiA9ICdqc29uJyBhcyBhbnksXG4gICAgQ1NWID0gJ2NzdicgYXMgYW55LFxuICAgIFRTViA9ICd0c3YnIGFzIGFueSxcbiAgICBUT1BPSlNPTiA9ICd0b3BvanNvbicgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSB7XG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgdGhlIGZvcm1hdCBmb3IgdGhlIGRhdGEgZmlsZSBvciB2YWx1ZXMuXG4gICAqL1xuICBmb3JtYXQ/OiBEYXRhRm9ybWF0O1xuXG4gIC8qKlxuICAgKiBBIFVSTCBmcm9tIHdoaWNoIHRvIGxvYWQgdGhlIGRhdGEgc2V0LiBVc2UgdGhlIGZvcm1hdFR5cGUgcHJvcGVydHlcbiAgICogdG8gZW5zdXJlIHRoZSBsb2FkZWQgZGF0YSBpcyBjb3JyZWN0bHkgcGFyc2VkLlxuICAgKi9cbiAgdXJsPzogc3RyaW5nO1xuICAvKipcbiAgICogUGFzcyBhcnJheSBvZiBvYmplY3RzIGluc3RlYWQgb2YgYSB1cmwgdG8gYSBmaWxlLlxuICAgKi9cbiAgdmFsdWVzPzogYW55W107XG59XG5cbmV4cG9ydCBlbnVtIERhdGFUYWJsZSB7XG4gIFNPVVJDRSA9ICdzb3VyY2UnIGFzIGFueSxcbiAgU1VNTUFSWSA9ICdzdW1tYXJ5JyBhcyBhbnksXG4gIFNUQUNLRURfU0NBTEUgPSAnc3RhY2tlZF9zY2FsZScgYXMgYW55LFxuICBMQVlPVVQgPSAnbGF5b3V0JyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IFNVTU1BUlkgPSBEYXRhVGFibGUuU1VNTUFSWTtcbmV4cG9ydCBjb25zdCBTT1VSQ0UgPSBEYXRhVGFibGUuU09VUkNFO1xuZXhwb3J0IGNvbnN0IFNUQUNLRURfU0NBTEUgPSBEYXRhVGFibGUuU1RBQ0tFRF9TQ0FMRTtcbmV4cG9ydCBjb25zdCBMQVlPVVQgPSBEYXRhVGFibGUuTEFZT1VUO1xuXG4vKiogTWFwcGluZyBmcm9tIGRhdGFsaWIncyBpbmZlcnJlZCB0eXBlIHRvIFZlZ2EtbGl0ZSdzIHR5cGUgKi9cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIGNhbiByZW1vdmVcbmV4cG9ydCBjb25zdCB0eXBlcyA9IHtcbiAgJ2Jvb2xlYW4nOiBUeXBlLk5PTUlOQUwsXG4gICdudW1iZXInOiBUeXBlLlFVQU5USVRBVElWRSxcbiAgJ2ludGVnZXInOiBUeXBlLlFVQU5USVRBVElWRSxcbiAgJ2RhdGUnOiBUeXBlLlRFTVBPUkFMLFxuICAnc3RyaW5nJzogVHlwZS5OT01JTkFMXG59O1xuIiwiLy8gdXRpbGl0eSBmb3IgZW5jb2RpbmcgbWFwcGluZ1xuaW1wb3J0IHtGaWVsZERlZiwgUG9zaXRpb25DaGFubmVsRGVmLCBGYWNldENoYW5uZWxEZWYsIENoYW5uZWxEZWZXaXRoTGVnZW5kLCBPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtDaGFubmVsLCBDSEFOTkVMU30gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7aXNBcnJheSwgc29tZX0gZnJvbSAnLi91dGlsJztcblxuLy8gVE9ETzogb25jZSB3ZSBkZWNvbXBvc2UgZmFjZXQsIHJlbmFtZSB0aGlzIHRvIEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBYIGNvb3JkaW5hdGVzIGZvciBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsXG4gICAqIGBsaW5lYCwgYHJ1bGVgLCBgdGV4dGAsIGFuZCBgdGlja2BcbiAgICogKG9yIHRvIHdpZHRoIGFuZCBoZWlnaHQgZm9yIGBiYXJgIGFuZCBgYXJlYWAgbWFya3MpLlxuICAgKi9cbiAgeD86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWSBjb29yZGluYXRlcyBmb3IgYHBvaW50YCwgYGNpcmNsZWAsIGBzcXVhcmVgLFxuICAgKiBgbGluZWAsIGBydWxlYCwgYHRleHRgLCBhbmQgYHRpY2tgXG4gICAqIChvciB0byB3aWR0aCBhbmQgaGVpZ2h0IGZvciBgYmFyYCBhbmQgYGFyZWFgIG1hcmtzKS5cbiAgICovXG4gIHk/OiBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIFgyIGNvb3JkaW5hdGVzIGZvciByYW5nZWQgYGJhcmAsIGBydWxlYCwgYGFyZWFgXG4gICAqL1xuICB4Mj86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWTIgY29vcmRpbmF0ZXMgZm9yIHJhbmdlZCBgYmFyYCwgYHJ1bGVgLCBgYXJlYWBcbiAgICovXG4gIHkyPzogUG9zaXRpb25DaGFubmVsRGVmO1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgbWFya3Mg4oCTIGVpdGhlciBmaWxsIG9yIHN0cm9rZSBjb2xvciBiYXNlZCBvbiBtYXJrIHR5cGUuXG4gICAqIChCeSBkZWZhdWx0LCBmaWxsIGNvbG9yIGZvciBgYXJlYWAsIGBiYXJgLCBgdGlja2AsIGB0ZXh0YCwgYGNpcmNsZWAsIGFuZCBgc3F1YXJlYCAvXG4gICAqIHN0cm9rZSBjb2xvciBmb3IgYGxpbmVgIGFuZCBgcG9pbnRgLilcbiAgICovXG4gIGNvbG9yPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG4gIC8qKlxuICAgKiBPcGFjaXR5IG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGNhbiBiZSBhIHZhbHVlIG9yIGluIGEgcmFuZ2UuXG4gICAqL1xuICBvcGFjaXR5PzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIG1hcmsuXG4gICAqIC0gRm9yIGBwb2ludGAsIGBzcXVhcmVgIGFuZCBgY2lyY2xlYFxuICAgKiDigJMgdGhlIHN5bWJvbCBzaXplLCBvciBwaXhlbCBhcmVhIG9mIHRoZSBtYXJrLlxuICAgKiAtIEZvciBgYmFyYCBhbmQgYHRpY2tgIOKAkyB0aGUgYmFyIGFuZCB0aWNrJ3Mgc2l6ZS5cbiAgICogLSBGb3IgYHRleHRgIOKAkyB0aGUgdGV4dCdzIGZvbnQgc2l6ZS5cbiAgICogLSBTaXplIGlzIGN1cnJlbnRseSB1bnN1cHBvcnRlZCBmb3IgYGxpbmVgIGFuZCBgYXJlYWAuXG4gICAqL1xuICBzaXplPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wncyBzaGFwZSAob25seSBmb3IgYHBvaW50YCBtYXJrcykuIFRoZSBzdXBwb3J0ZWQgdmFsdWVzIGFyZVxuICAgKiBgXCJjaXJjbGVcImAgKGRlZmF1bHQpLCBgXCJzcXVhcmVcImAsIGBcImNyb3NzXCJgLCBgXCJkaWFtb25kXCJgLCBgXCJ0cmlhbmdsZS11cFwiYCxcbiAgICogb3IgYFwidHJpYW5nbGUtZG93blwiYC5cbiAgICovXG4gIHNoYXBlPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7IC8vIFRPRE86IG1heWJlIGRpc3Rpbmd1aXNoIG9yZGluYWwtb25seVxuXG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGxldmVscyBvZiBkZXRhaWwgZm9yIGdyb3VwaW5nIGRhdGEgaW4gYWdncmVnYXRlIHZpZXdzIGFuZFxuICAgKiBpbiBsaW5lIGFuZCBhcmVhIG1hcmtzIHdpdGhvdXQgbWFwcGluZyBkYXRhIHRvIGEgc3BlY2lmaWMgdmlzdWFsIGNoYW5uZWwuXG4gICAqL1xuICBkZXRhaWw/OiBGaWVsZERlZiB8IEZpZWxkRGVmW107XG5cbiAgLyoqXG4gICAqIFRleHQgb2YgdGhlIGB0ZXh0YCBtYXJrLlxuICAgKi9cbiAgdGV4dD86IEZpZWxkRGVmO1xuXG4gIGxhYmVsPzogRmllbGREZWY7XG5cbiAgLyoqXG4gICAqIE9yZGVyIG9mIGRhdGEgcG9pbnRzIGluIGxpbmUgbWFya3MuXG4gICAqL1xuICBwYXRoPzogT3JkZXJDaGFubmVsRGVmIHwgT3JkZXJDaGFubmVsRGVmW107XG5cbiAgLyoqXG4gICAqIExheWVyIG9yZGVyIGZvciBub24tc3RhY2tlZCBtYXJrcywgb3Igc3RhY2sgb3JkZXIgZm9yIHN0YWNrZWQgbWFya3MuXG4gICAqL1xuICBvcmRlcj86IE9yZGVyQ2hhbm5lbERlZiB8IE9yZGVyQ2hhbm5lbERlZltdO1xufVxuXG4vLyBUT0RPOiBvbmNlIHdlIGRlY29tcG9zZSBmYWNldCwgcmVuYW1lIHRoaXMgdG8gRXh0ZW5kZWRFbmNvZGluZ1xuZXhwb3J0IGludGVyZmFjZSBFbmNvZGluZyBleHRlbmRzIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBWZXJ0aWNhbCBmYWNldHMgZm9yIHRyZWxsaXMgcGxvdHMuXG4gICAqL1xuICByb3c/OiBGYWNldENoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgZmFjZXRzIGZvciB0cmVsbGlzIHBsb3RzLlxuICAgKi9cbiAgY29sdW1uPzogRmFjZXRDaGFubmVsRGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY291bnRSZXRpbmFsKGVuY29kaW5nOiBFbmNvZGluZykge1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZW5jb2RpbmcuY29sb3IpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcub3BhY2l0eSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaXplKSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLnNoYXBlKSB7IGNvdW50Kys7IH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbHMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIHJldHVybiBDSEFOTkVMUy5maWx0ZXIoZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBoYXMoZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9KTtcbn1cblxuLy8gVE9EOiByZW5hbWUgdGhpcyB0byBoYXNDaGFubmVsRmllbGQgYW5kIG9ubHkgdXNlIHdlIHJlYWxseSB3YW50IGl0LlxuZXhwb3J0IGZ1bmN0aW9uIGhhcyhlbmNvZGluZzogRW5jb2RpbmcsIGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgY29uc3QgY2hhbm5lbEVuY29kaW5nID0gZW5jb2RpbmcgJiYgZW5jb2RpbmdbY2hhbm5lbF07XG4gIHJldHVybiBjaGFubmVsRW5jb2RpbmcgJiYgKFxuICAgIGNoYW5uZWxFbmNvZGluZy5maWVsZCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gVE9ETzogY2hlY2sgdGhhdCB3ZSBoYXZlIGZpZWxkIGluIHRoZSBhcnJheVxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIHNvbWUoQ0hBTk5FTFMsIChjaGFubmVsKSA9PiB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkgJiYgZW5jb2RpbmdbY2hhbm5lbF0uYWdncmVnYXRlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VkKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gZW5jb2RpbmcgJiYgKCghIWVuY29kaW5nLnggJiYgISFlbmNvZGluZy54MikgfHwgKCEhZW5jb2RpbmcueSAmJiAhIWVuY29kaW5nLnkyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nKTogRmllbGREZWZbXSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZmllbGREZWYpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGNoYW5uZWxNYXBwaW5nRm9yRWFjaChDSEFOTkVMUywgZW5jb2RpbmcsIGYsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdGb3JFYWNoKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgaSA9IDA7XG4gIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsLCBpKyspO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGYuY2FsbCh0aGlzQXJnLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBpKyspO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nTWFwKENIQU5ORUxTLCBlbmNvZGluZywgZiAsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdNYXAoY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IGFyciA9IFtdO1xuICBjaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICByZXR1cm4gY2hhbm5lbE1hcHBpbmdSZWR1Y2UoQ0hBTk5FTFMsIGVuY29kaW5nLCBmLCBpbml0LCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nUmVkdWNlKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgciA9IGluaXQ7XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBmaWVsZERlZiwgY2hhbm5lbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcjtcbn1cbiIsIi8vIHV0aWxpdHkgZm9yIGEgZmllbGQgZGVmaW5pdGlvbiBvYmplY3RcblxuaW1wb3J0IHtBZ2dyZWdhdGVPcCwgQUdHUkVHQVRFX09QU30gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtBeGlzfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtCaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtTb3J0RmllbGQsIFNvcnRPcmRlcn0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHtUeXBlLCBOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgZ2V0YmlucywgdG9NYXB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogIEludGVyZmFjZSBmb3IgYW55IGtpbmQgb2YgRmllbGREZWY7XG4gKiAgRm9yIHNpbXBsaWNpdHksIHdlIGRvIG5vdCBkZWNsYXJlIG11bHRpcGxlIGludGVyZmFjZXMgb2YgRmllbGREZWYgbGlrZVxuICogIHdlIGRvIGZvciBKU09OIHNjaGVtYS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWVsZERlZiB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBmaWVsZCBmcm9tIHdoaWNoIHRvIHB1bGwgYSBkYXRhIHZhbHVlLlxuICAgKi9cbiAgZmllbGQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGVkIGZpZWxkJ3MgdHlwZSBvZiBtZWFzdXJlbWVudC4gVGhpcyBjYW4gYmUgZWl0aGVyIGEgZnVsbCB0eXBlXG4gICAqIG5hbWUgKGBcInF1YW50aXRhdGl2ZVwiYCwgYFwidGVtcG9yYWxcImAsIGBcIm9yZGluYWxcImAsICBhbmQgYFwibm9taW5hbFwiYClcbiAgICogb3IgYW4gaW5pdGlhbCBjaGFyYWN0ZXIgb2YgdGhlIHR5cGUgbmFtZSAoYFwiUVwiYCwgYFwiVFwiYCwgYFwiT1wiYCwgYFwiTlwiYCkuXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgY2FzZSBpbnNlbnNpdGl2ZS5cbiAgICovXG4gIHR5cGU/OiBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGNvbnN0YW50IHZhbHVlIGluIHZpc3VhbCBkb21haW4uXG4gICAqL1xuICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW47XG5cbiAgLy8gZnVuY3Rpb25cblxuICAvKipcbiAgICogVGltZSB1bml0IGZvciBhIGB0ZW1wb3JhbGAgZmllbGQgIChlLmcuLCBgeWVhcmAsIGB5ZWFybW9udGhgLCBgbW9udGhgLCBgaG91cmApLlxuICAgKi9cbiAgdGltZVVuaXQ/OiBUaW1lVW5pdDtcblxuICAvKipcbiAgICogRmxhZyBmb3IgYmlubmluZyBhIGBxdWFudGl0YXRpdmVgIGZpZWxkLCBvciBhIGJpbiBwcm9wZXJ0eSBvYmplY3RcbiAgICogZm9yIGJpbm5pbmcgcGFyYW1ldGVycy5cbiAgICovXG4gIGJpbj86IGJvb2xlYW4gfCBCaW47XG5cbiAgLyoqXG4gICAqIEFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZmllbGRcbiAgICogKGUuZy4sIGBtZWFuYCwgYHN1bWAsIGBtZWRpYW5gLCBgbWluYCwgYG1heGAsIGBjb3VudGApLlxuICAgKi9cbiAgYWdncmVnYXRlPzogQWdncmVnYXRlT3A7XG5cbiAgLyoqXG4gICAqIFRpdGxlIGZvciBheGlzIG9yIGxlZ2VuZC5cbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgYWdncmVnYXRlID0ge1xuICB0eXBlOiAnc3RyaW5nJyxcbiAgZW51bTogQUdHUkVHQVRFX09QUyxcbiAgc3VwcG9ydGVkRW51bXM6IHtcbiAgICBxdWFudGl0YXRpdmU6IEFHR1JFR0FURV9PUFMsXG4gICAgb3JkaW5hbDogWydtZWRpYW4nLCdtaW4nLCdtYXgnXSxcbiAgICBub21pbmFsOiBbXSxcbiAgICB0ZW1wb3JhbDogWydtZWFuJywgJ21lZGlhbicsICdtaW4nLCAnbWF4J10sIC8vIFRPRE86IHJldmlzZSB3aGF0IHNob3VsZCB0aW1lIHN1cHBvcnRcbiAgICAnJzogWydjb3VudCddXG4gIH0sXG4gIHN1cHBvcnRlZFR5cGVzOiB0b01hcChbUVVBTlRJVEFUSVZFLCBOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTCwgJyddKVxufTtcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhTY2FsZSBleHRlbmRzIEZpZWxkRGVmIHtcbiAgc2NhbGU/OiBTY2FsZTtcbiAgc29ydD86IFNvcnRGaWVsZCB8IFNvcnRPcmRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbkNoYW5uZWxEZWYgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgYXhpcz86IGJvb2xlYW4gfCBBeGlzO1xufVxuZXhwb3J0IGludGVyZmFjZSBDaGFubmVsRGVmV2l0aExlZ2VuZCBleHRlbmRzIENoYW5uZWxEZWZXaXRoU2NhbGUge1xuICBsZWdlbmQ/OiBMZWdlbmQ7XG59XG5cbi8vIERldGFpbFxuXG4vLyBPcmRlciBQYXRoIGhhdmUgbm8gc2NhbGVcblxuZXhwb3J0IGludGVyZmFjZSBPcmRlckNoYW5uZWxEZWYgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNvcnQ/OiBTb3J0T3JkZXI7XG59XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgdG8gZGlzdGluZ3Vpc2ggb3JkaW5hbE9ubHlTY2FsZSBmcm9tIHNjYWxlXG5leHBvcnQgdHlwZSBGYWNldENoYW5uZWxEZWYgPSBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkUmVmT3B0aW9uIHtcbiAgLyoqIGV4Y2x1ZGUgYmluLCBhZ2dyZWdhdGUsIHRpbWVVbml0ICovXG4gIG5vZm4/OiBib29sZWFuO1xuICAvKiogZXhjbHVkZSBhZ2dyZWdhdGlvbiBmdW5jdGlvbiAqL1xuICBub0FnZ3JlZ2F0ZT86IGJvb2xlYW47XG4gIC8qKiBpbmNsdWRlICdkYXR1bS4nICovXG4gIGRhdHVtPzogYm9vbGVhbjtcbiAgLyoqIHJlcGxhY2UgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIGZuPzogc3RyaW5nO1xuICAvKiogcHJlcGVuZCBmbiB3aXRoIGN1c3RvbSBmdW5jdGlvbiBwcmVmaXggKi9cbiAgcHJlZm4/OiBzdHJpbmc7XG4gIC8qKiBzY2FsZVR5cGUgKi9cbiAgc2NhbGVUeXBlPzogU2NhbGVUeXBlO1xuICAvKiogYXBwZW5kIHN1ZmZpeCB0byB0aGUgZmllbGQgcmVmIGZvciBiaW4gKGRlZmF1bHQ9J19zdGFydCcpICovXG4gIGJpblN1ZmZpeD86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiAoZ2VuZXJhbCkgKi9cbiAgc3VmZml4Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGQoZmllbGREZWY6IEZpZWxkRGVmLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgY29uc3QgcHJlZml4ID0gKG9wdC5kYXR1bSA/ICdkYXR1bS4nIDogJycpICsgKG9wdC5wcmVmbiB8fCAnJyk7XG4gIGNvbnN0IHN1ZmZpeCA9IG9wdC5zdWZmaXggfHwgJyc7XG4gIGNvbnN0IGZpZWxkID0gZmllbGREZWYuZmllbGQ7XG5cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdjb3VudCcgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAob3B0LmZuKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIG9wdC5mbiArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi5iaW4pIHtcbiAgICBjb25zdCBiaW5TdWZmaXggPSBvcHQuYmluU3VmZml4IHx8IChcbiAgICAgIG9wdC5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID9cbiAgICAgICAgLy8gRm9yIG9yZGluYWwgc2NhbGUgdHlwZSwgdXNlIGBfcmFuZ2VgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19yYW5nZScgOlxuICAgICAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUgb3IgdW5rbm93biwgdXNlIGBfc3RhcnRgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19zdGFydCdcbiAgICApO1xuICAgIHJldHVybiBwcmVmaXggKyAnYmluXycgKyBmaWVsZCArIGJpblN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgIW9wdC5ub0FnZ3JlZ2F0ZSAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGREZWYuYWdncmVnYXRlICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLnRpbWVVbml0ICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSB8fCAhIWZpZWxkRGVmLmJpbiB8fFxuICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiAhIWZpZWxkRGVmLnRpbWVVbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZWFzdXJlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgIV9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IENPVU5UX1RJVExFID0gJ051bWJlciBvZiBSZWNvcmRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50KCk6IEZpZWxkRGVmIHtcbiAgcmV0dXJuIHsgZmllbGQ6ICcqJywgYWdncmVnYXRlOiBBZ2dyZWdhdGVPcC5DT1VOVCwgdHlwZTogUVVBTlRJVEFUSVZFLCB0aXRsZTogQ09VTlRfVElUTEUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ291bnQoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UO1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpcywgYW5kIHRoZSBnZXRiaW5zIG1ldGhvZFxuLy8gRklYTUUgdGhpcyBkZXBlbmRzIG9uIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiBjYXJkaW5hbGl0eShmaWVsZERlZjogRmllbGREZWYsIHN0YXRzLCBmaWx0ZXJOdWxsID0ge30pIHtcbiAgLy8gRklYTUUgbmVlZCB0byB0YWtlIGZpbHRlciBpbnRvIGFjY291bnRcblxuICBjb25zdCBzdGF0ID0gc3RhdHNbZmllbGREZWYuZmllbGRdLFxuICB0eXBlID0gZmllbGREZWYudHlwZTtcblxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgLy8gbmVlZCB0byByZWFzc2lnbiBiaW4sIG90aGVyd2lzZSBjb21waWxhdGlvbiB3aWxsIGZhaWwgZHVlIHRvIGEgVFMgYnVnLlxuICAgIGNvbnN0IGJpbiA9IGZpZWxkRGVmLmJpbjtcbiAgICBsZXQgbWF4YmlucyA9ICh0eXBlb2YgYmluID09PSAnYm9vbGVhbicpID8gdW5kZWZpbmVkIDogYmluLm1heGJpbnM7XG4gICAgaWYgKG1heGJpbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4YmlucyA9IDEwO1xuICAgIH1cblxuICAgIGNvbnN0IGJpbnMgPSBnZXRiaW5zKHN0YXQsIG1heGJpbnMpO1xuICAgIHJldHVybiAoYmlucy5zdG9wIC0gYmlucy5zdGFydCkgLyBiaW5zLnN0ZXA7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgY29uc3QgdGltZVVuaXQgPSBmaWVsZERlZi50aW1lVW5pdDtcbiAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSUzogcmV0dXJuIDI0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVk6IHJldHVybiA3O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVRFOiByZXR1cm4gMzE7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOiByZXR1cm4gMTI7XG4gICAgICBjYXNlIFRpbWVVbml0LlFVQVJURVI6IHJldHVybiA0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5ZRUFSOlxuICAgICAgICBjb25zdCB5ZWFyc3RhdCA9IHN0YXRzWyd5ZWFyXycgKyBmaWVsZERlZi5maWVsZF07XG5cbiAgICAgICAgaWYgKCF5ZWFyc3RhdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB5ZWFyc3RhdC5kaXN0aW5jdCAtXG4gICAgICAgICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHVzZSBjYWxjdWxhdGlvbiBiZWxvd1xuICB9XG4gIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBudWxsXG4gIHJldHVybiBzdGF0LmRpc3RpbmN0IC1cbiAgICAoc3RhdC5taXNzaW5nID4gMCAmJiBmaWx0ZXJOdWxsW3R5cGVdID8gMSA6IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIGlmIChmaWVsZERlZi50aXRsZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGZpZWxkRGVmLnRpdGxlO1xuICB9XG4gIGlmIChpc0NvdW50KGZpZWxkRGVmKSkge1xuICAgIHJldHVybiBDT1VOVF9USVRMRTtcbiAgfVxuICBjb25zdCBmbiA9IGZpZWxkRGVmLmFnZ3JlZ2F0ZSB8fCBmaWVsZERlZi50aW1lVW5pdCB8fCAoZmllbGREZWYuYmluICYmICdiaW4nKTtcbiAgaWYgKGZuKSB7XG4gICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSArICcoJyArIGZpZWxkRGVmLmZpZWxkICsgJyknO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmaWVsZERlZi5maWVsZDtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBMZWdlbmRDb25maWcge1xuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBsZWdlbmQuIE9uZSBvZiBcImxlZnRcIiBvciBcInJpZ2h0XCIuIFRoaXMgZGV0ZXJtaW5lcyBob3cgdGhlIGxlZ2VuZCBpcyBwb3NpdGlvbmVkIHdpdGhpbiB0aGUgc2NlbmUuIFRoZSBkZWZhdWx0IGlzIFwicmlnaHRcIi5cbiAgICovXG4gIG9yaWVudD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGxlZ2VuZCBmcm9tIHRoZSBlZGdlIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgb3IgZGF0YSByZWN0YW5nbGUuXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgcGFkZGluZywgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRoZSBsZW5nZW5kIGFuZCBheGlzLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXJnaW4gYXJvdW5kIHRoZSBsZWdlbmQsIGluIHBpeGVsc1xuICAgKi9cbiAgbWFyZ2luPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBncmFkaWVudCBzdHJva2UsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICBncmFkaWVudFN0cm9rZUNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmFkaWVudCBzdHJva2UsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50U3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBncmFkaWVudCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50LCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudFdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGFsaWdubWVudCBvZiB0aGUgbGVnZW5kIGxhYmVsLCBjYW4gYmUgbGVmdCwgbWlkZGxlIG9yIHJpZ2h0LlxuICAgKi9cbiAgbGFiZWxBbGlnbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgYmFzZWxpbmUgb2YgbGVnZW5kIGxhYmVsLCBjYW4gYmUgdG9wLCBtaWRkbGUgb3IgYm90dG9tLlxuICAgKi9cbiAgbGFiZWxCYXNlbGluZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIGxhYmVsLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgbGFiZWxDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSBsZW5nZW5kIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxGb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiBsZW5nZW5kIGxhYmxlLlxuICAgKi9cbiAgbGFiZWxGb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhlIGxlZ2VuZCBsYWJlbC5cbiAgICovXG4gIGxhYmVsT2Zmc2V0PzogbnVtYmVyO1xuICAvKipcbiAgICogV2hldGhlciBtb250aCBuYW1lcyBhbmQgd2Vla2RheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuXG4gICAqL1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgc3ltYm9sLFxuICAgKi9cbiAgc3ltYm9sQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc2hhcGUgb2YgdGhlIGxlZ2VuZCBzeW1ib2wsIGNhbiBiZSB0aGUgJ2NpcmNsZScsICdzcXVhcmUnLCAnY3Jvc3MnLCAnZGlhbW9uZCcsXG4gICAqICd0cmlhbmdsZS11cCcsICd0cmlhbmdsZS1kb3duJy5cbiAgICovXG4gIHN5bWJvbFNoYXBlPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGxlbmdlbmQgc3ltYm9sLCBpbiBwaXhlbHMuXG4gICAqL1xuICBzeW1ib2xTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBzeW1ib2wncyBzdHJva2UuXG4gICAqL1xuICBzeW1ib2xTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBsZWdlbmQgc3R5bGluZy5cbiAgICovXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCB0aXRsZSwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIHRpdGxlQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCBvZiB0aGUgbGVnZW5kIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250V2VpZ2h0Pzogc3RyaW5nO1xuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGxlZ2VuZCBzdHlsaW5nLlxuICAgKi9cbiAgcHJvcGVydGllcz86IGFueTsgLy8gVE9ETygjOTc1KSByZXBsYWNlIHdpdGggY29uZmlnIHByb3BlcnRpZXNcbn1cblxuLyoqXG4gKiBQcm9wZXJ0aWVzIG9mIGEgbGVnZW5kIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBzaG93IGl0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExlZ2VuZCBleHRlbmRzIExlZ2VuZENvbmZpZyB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIGxlZ2VuZCBsYWJlbHMuIFZlZ2EgdXNlcyBEM1xcJ3MgZm9ybWF0IHBhdHRlcm4uXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHRpdGxlIGZvciB0aGUgbGVnZW5kLiAoU2hvd3MgZmllbGQgbmFtZSBhbmQgaXRzIGZ1bmN0aW9uIGJ5IGRlZmF1bHQuKVxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFeHBsaWNpdGx5IHNldCB0aGUgdmlzaWJsZSBsZWdlbmQgdmFsdWVzLlxuICAgKi9cbiAgdmFsdWVzPzogQXJyYXk8YW55Pjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMZWdlbmRDb25maWc6IExlZ2VuZENvbmZpZyA9IHtcbiAgb3JpZW50OiB1bmRlZmluZWQsIC8vIGltcGxpY2l0bHkgXCJyaWdodFwiXG4gIHNob3J0VGltZUxhYmVsczogZmFsc2Vcbn07XG4iLCJleHBvcnQgZW51bSBNYXJrIHtcbiAgQVJFQSA9ICdhcmVhJyBhcyBhbnksXG4gIEJBUiA9ICdiYXInIGFzIGFueSxcbiAgTElORSA9ICdsaW5lJyBhcyBhbnksXG4gIFBPSU5UID0gJ3BvaW50JyBhcyBhbnksXG4gIFRFWFQgPSAndGV4dCcgYXMgYW55LFxuICBUSUNLID0gJ3RpY2snIGFzIGFueSxcbiAgUlVMRSA9ICdydWxlJyBhcyBhbnksXG4gIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgU1FVQVJFID0gJ3NxdWFyZScgYXMgYW55LFxuICBFUlJPUkJBUiA9ICdlcnJvckJhcicgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBBUkVBID0gTWFyay5BUkVBO1xuZXhwb3J0IGNvbnN0IEJBUiA9IE1hcmsuQkFSO1xuZXhwb3J0IGNvbnN0IExJTkUgPSBNYXJrLkxJTkU7XG5leHBvcnQgY29uc3QgUE9JTlQgPSBNYXJrLlBPSU5UO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBNYXJrLlRFWFQ7XG5leHBvcnQgY29uc3QgVElDSyA9IE1hcmsuVElDSztcbmV4cG9ydCBjb25zdCBSVUxFID0gTWFyay5SVUxFO1xuXG5leHBvcnQgY29uc3QgQ0lSQ0xFID0gTWFyay5DSVJDTEU7XG5leHBvcnQgY29uc3QgU1FVQVJFID0gTWFyay5TUVVBUkU7XG5cbmV4cG9ydCBjb25zdCBFUlJPUkJBUiA9IE1hcmsuRVJST1JCQVI7XG5leHBvcnQgY29uc3QgUFJJTUlUSVZFX01BUktTID0gW0FSRUEsIEJBUiwgTElORSwgUE9JTlQsIFRFWFQsIFRJQ0ssIFJVTEUsIENJUkNMRSwgU1FVQVJFXTtcbiIsImV4cG9ydCBlbnVtIFNjYWxlVHlwZSB7XG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIExPRyA9ICdsb2cnIGFzIGFueSxcbiAgICBQT1cgPSAncG93JyBhcyBhbnksXG4gICAgU1FSVCA9ICdzcXJ0JyBhcyBhbnksXG4gICAgUVVBTlRJTEUgPSAncXVhbnRpbGUnIGFzIGFueSxcbiAgICBRVUFOVElaRSA9ICdxdWFudGl6ZScgYXMgYW55LFxuICAgIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICAgIFRJTUUgPSAndGltZScgYXMgYW55LFxuICAgIFVUQyAgPSAndXRjJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIE5pY2VUaW1lIHtcbiAgICBTRUNPTkQgPSAnc2Vjb25kJyBhcyBhbnksXG4gICAgTUlOVVRFID0gJ21pbnV0ZScgYXMgYW55LFxuICAgIEhPVVIgPSAnaG91cicgYXMgYW55LFxuICAgIERBWSA9ICdkYXknIGFzIGFueSxcbiAgICBXRUVLID0gJ3dlZWsnIGFzIGFueSxcbiAgICBNT05USCA9ICdtb250aCcgYXMgYW55LFxuICAgIFlFQVIgPSAneWVhcicgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlQ29uZmlnIHtcbiAgLyoqXG4gICAqIElmIHRydWUsIHJvdW5kcyBudW1lcmljIG91dHB1dCB2YWx1ZXMgdG8gaW50ZWdlcnMuXG4gICAqIFRoaXMgY2FuIGJlIGhlbHBmdWwgZm9yIHNuYXBwaW5nIHRvIHRoZSBwaXhlbCBncmlkLlxuICAgKiAoT25seSBhdmFpbGFibGUgZm9yIGB4YCwgYHlgLCBgc2l6ZWAsIGByb3dgLCBhbmQgYGNvbHVtbmAgc2NhbGVzLilcbiAgICovXG4gIHJvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqICBEZWZhdWx0IGJhbmQgd2lkdGggZm9yIGB4YCBvcmRpbmFsIHNjYWxlIHdoZW4gaXMgbWFyayBpcyBgdGV4dGAuXG4gICAqICBAbWluaW11bSAwXG4gICAqL1xuICB0ZXh0QmFuZFdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBiYW5kIHNpemUgZm9yICgxKSBgeWAgb3JkaW5hbCBzY2FsZSxcbiAgICogYW5kICgyKSBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIHRoZSBtYXJrIGlzIG5vdCBgdGV4dGAuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJhbmRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3Igb3BhY2l0eS5cbiAgICovXG4gIG9wYWNpdHk/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIERlZmF1bHQgcGFkZGluZyBmb3IgYHhgIGFuZCBgeWAgb3JkaW5hbCBzY2FsZXMuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBVc2VzIHRoZSBzb3VyY2UgZGF0YSByYW5nZSBhcyBzY2FsZSBkb21haW4gaW5zdGVhZCBvZiBhZ2dyZWdhdGVkIGRhdGEgZm9yIGFnZ3JlZ2F0ZSBheGlzLlxuICAgKiBUaGlzIHByb3BlcnR5IG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGUgZnVuY3Rpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgd2l0aGluIHRoZSByYXcgZGF0YSBkb21haW4gKGBcIm1lYW5cImAsIGBcImF2ZXJhZ2VcImAsIGBcInN0ZGV2XCJgLCBgXCJzdGRldnBcImAsIGBcIm1lZGlhblwiYCwgYFwicTFcImAsIGBcInEzXCJgLCBgXCJtaW5cImAsIGBcIm1heFwiYCkuIEZvciBvdGhlciBhZ2dyZWdhdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyBvdXRzaWRlIG9mIHRoZSByYXcgZGF0YSBkb21haW4gKGUuZy4gYFwiY291bnRcImAsIGBcInN1bVwiYCksIHRoaXMgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICovXG4gIHVzZVJhd0RvbWFpbj86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIG5vbWluYWwgY29sb3Igc2NhbGUgKi9cbiAgbm9taW5hbENvbG9yUmFuZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIG9yZGluYWwgLyBjb250aW51b3VzIGNvbG9yIHNjYWxlICovXG4gIHNlcXVlbnRpYWxDb2xvclJhbmdlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBzaGFwZSAqL1xuICBzaGFwZVJhbmdlPzogc3RyaW5nfHN0cmluZ1tdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBiYXJTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgZm9udCBzaXplIHNjYWxlICovXG4gIGZvbnRTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgcnVsZSBzdHJva2Ugd2lkdGhzICovXG4gIHJ1bGVTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgdGljayBzcGFucyAqL1xuICB0aWNrU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGJhciBzaXplIHNjYWxlICovXG4gIHBvaW50U2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLy8gbmljZSBzaG91bGQgZGVwZW5kcyBvbiB0eXBlIChxdWFudGl0YXRpdmUgb3IgdGVtcG9yYWwpLCBzb1xuICAvLyBsZXQncyBub3QgbWFrZSBhIGNvbmZpZy5cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTY2FsZUNvbmZpZzogU2NhbGVDb25maWcgPSB7XG4gIHJvdW5kOiB0cnVlLFxuICB0ZXh0QmFuZFdpZHRoOiA5MCxcbiAgYmFuZFNpemU6IDIxLFxuICBwYWRkaW5nOiAxLFxuICB1c2VSYXdEb21haW46IGZhbHNlLFxuICBvcGFjaXR5OiBbMC4zLCAwLjhdLFxuXG4gIG5vbWluYWxDb2xvclJhbmdlOiAnY2F0ZWdvcnkxMCcsXG4gIHNlcXVlbnRpYWxDb2xvclJhbmdlOiBbJyNBRkM2QTMnLCAnIzA5NjIyQSddLCAvLyB0YWJsZWF1IGdyZWVuc1xuICBzaGFwZVJhbmdlOiAnc2hhcGVzJyxcbiAgZm9udFNpemVSYW5nZTogWzgsIDQwXSxcbiAgcnVsZVNpemVSYW5nZTogWzEsIDVdLFxuICB0aWNrU2l6ZVJhbmdlOiBbMSwgMjBdXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0U2NhbGVDb25maWcge1xuICByb3VuZD86IGJvb2xlYW47XG4gIHBhZGRpbmc/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZzogRmFjZXRTY2FsZUNvbmZpZyA9IHtcbiAgcm91bmQ6IHRydWUsXG4gIHBhZGRpbmc6IDE2XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlIHtcbiAgdHlwZT86IFNjYWxlVHlwZTtcbiAgLyoqXG4gICAqIFRoZSBkb21haW4gb2YgdGhlIHNjYWxlLCByZXByZXNlbnRpbmcgdGhlIHNldCBvZiBkYXRhIHZhbHVlcy4gRm9yIHF1YW50aXRhdGl2ZSBkYXRhLCB0aGlzIGNhbiB0YWtlIHRoZSBmb3JtIG9mIGEgdHdvLWVsZW1lbnQgYXJyYXkgd2l0aCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gRm9yIG9yZGluYWwvY2F0ZWdvcmljYWwgZGF0YSwgdGhpcyBtYXkgYmUgYW4gYXJyYXkgb2YgdmFsaWQgaW5wdXQgdmFsdWVzLiBUaGUgZG9tYWluIG1heSBhbHNvIGJlIHNwZWNpZmllZCBieSBhIHJlZmVyZW5jZSB0byBhIGRhdGEgc291cmNlLlxuICAgKi9cbiAgZG9tYWluPzogc3RyaW5nIHwgbnVtYmVyW10gfCBzdHJpbmdbXTsgLy8gVE9ETzogZGVjbGFyZSB2Z0RhdGFEb21haW5cbiAgLyoqXG4gICAqIFRoZSByYW5nZSBvZiB0aGUgc2NhbGUsIHJlcHJlc2VudGluZyB0aGUgc2V0IG9mIHZpc3VhbCB2YWx1ZXMuIEZvciBudW1lcmljIHZhbHVlcywgdGhlIHJhbmdlIGNhbiB0YWtlIHRoZSBmb3JtIG9mIGEgdHdvLWVsZW1lbnQgYXJyYXkgd2l0aCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gRm9yIG9yZGluYWwgb3IgcXVhbnRpemVkIGRhdGEsIHRoZSByYW5nZSBtYXkgYnkgYW4gYXJyYXkgb2YgZGVzaXJlZCBvdXRwdXQgdmFsdWVzLCB3aGljaCBhcmUgbWFwcGVkIHRvIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgZG9tYWluLiBGb3Igb3JkaW5hbCBzY2FsZXMgb25seSwgdGhlIHJhbmdlIGNhbiBiZSBkZWZpbmVkIHVzaW5nIGEgRGF0YVJlZjogdGhlIHJhbmdlIHZhbHVlcyBhcmUgdGhlbiBkcmF3biBkeW5hbWljYWxseSBmcm9tIGEgYmFja2luZyBkYXRhIHNldC5cbiAgICovXG4gIHJhbmdlPzogc3RyaW5nIHwgbnVtYmVyW10gfCBzdHJpbmdbXTsgLy8gVE9ETzogZGVjbGFyZSB2Z1JhbmdlRG9tYWluXG4gIC8qKlxuICAgKiBJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC5cbiAgICovXG4gIHJvdW5kPzogYm9vbGVhbjtcblxuICAvLyBvcmRpbmFsXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFwcGxpZXMgc3BhY2luZyBhbW9uZyBvcmRpbmFsIGVsZW1lbnRzIGluIHRoZSBzY2FsZSByYW5nZS4gVGhlIGFjdHVhbCBlZmZlY3QgZGVwZW5kcyBvbiBob3cgdGhlIHNjYWxlIGlzIGNvbmZpZ3VyZWQuIElmIHRoZSBfX3BvaW50c19fIHBhcmFtZXRlciBpcyBgdHJ1ZWAsIHRoZSBwYWRkaW5nIHZhbHVlIGlzIGludGVycHJldGVkIGFzIGEgbXVsdGlwbGUgb2YgdGhlIHNwYWNpbmcgYmV0d2VlbiBwb2ludHMuIEEgcmVhc29uYWJsZSB2YWx1ZSBpcyAxLjAsIHN1Y2ggdGhhdCB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgd2lsbCBiZSBvZmZzZXQgZnJvbSB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBieSBoYWxmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHBvaW50cy4gT3RoZXJ3aXNlLCBwYWRkaW5nIGlzIHR5cGljYWxseSBpbiB0aGUgcmFuZ2UgWzAsIDFdIGFuZCBjb3JyZXNwb25kcyB0byB0aGUgZnJhY3Rpb24gb2Ygc3BhY2UgaW4gdGhlIHJhbmdlIGludGVydmFsIHRvIGFsbG9jYXRlIHRvIHBhZGRpbmcuIEEgdmFsdWUgb2YgMC41IG1lYW5zIHRoYXQgdGhlIHJhbmdlIGJhbmQgd2lkdGggd2lsbCBiZSBlcXVhbCB0byB0aGUgcGFkZGluZyB3aWR0aC4gRm9yIG1vcmUsIHNlZSB0aGUgW0QzIG9yZGluYWwgc2NhbGUgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL21ib3N0b2NrL2QzL3dpa2kvT3JkaW5hbC1TY2FsZXMpLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvLyB0eXBpY2FsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB2YWx1ZXMgdGhhdCBleGNlZWQgdGhlIGRhdGEgZG9tYWluIGFyZSBjbGFtcGVkIHRvIGVpdGhlciB0aGUgbWluaW11bSBvciBtYXhpbXVtIHJhbmdlIHZhbHVlXG4gICAqL1xuICBjbGFtcD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiBzcGVjaWZpZWQsIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSB2YWx1ZSByYW5nZS4gSWYgc3BlY2lmaWVkIGFzIGEgdHJ1ZSBib29sZWFuLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgbnVtYmVyIHJhbmdlIChlLmcuLCA3IGluc3RlYWQgb2YgNi45NikuIElmIHNwZWNpZmllZCBhcyBhIHN0cmluZywgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IHZhbHVlIHJhbmdlLiBGb3IgdGltZSBhbmQgdXRjIHNjYWxlIHR5cGVzIG9ubHksIHRoZSBuaWNlIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBkZXNpcmVkIHRpbWUgaW50ZXJ2YWwuXG4gICAqL1xuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lO1xuICAvKipcbiAgICogU2V0cyB0aGUgZXhwb25lbnQgb2YgdGhlIHNjYWxlIHRyYW5zZm9ybWF0aW9uLiBGb3IgcG93IHNjYWxlIHR5cGVzIG9ubHksIG90aGVyd2lzZSBpZ25vcmVkLlxuICAgKi9cbiAgZXhwb25lbnQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCBlbnN1cmVzIHRoYXQgYSB6ZXJvIGJhc2VsaW5lIHZhbHVlIGlzIGluY2x1ZGVkIGluIHRoZSBzY2FsZSBkb21haW4uIFRoaXMgb3B0aW9uIGlzIGlnbm9yZWQgZm9yIG5vbi1xdWFudGl0YXRpdmUgc2NhbGVzLlxuICAgKi9cbiAgemVybz86IGJvb2xlYW47XG5cbiAgLy8gVmVnYS1MaXRlIG9ubHlcbiAgLyoqXG4gICAqIFVzZXMgdGhlIHNvdXJjZSBkYXRhIHJhbmdlIGFzIHNjYWxlIGRvbWFpbiBpbnN0ZWFkIG9mIGFnZ3JlZ2F0ZWQgZGF0YSBmb3IgYWdncmVnYXRlIGF4aXMuXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0ZSBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyB3aXRoaW4gdGhlIHJhdyBkYXRhIGRvbWFpbiAoYFwibWVhblwiYCwgYFwiYXZlcmFnZVwiYCwgYFwic3RkZXZcImAsIGBcInN0ZGV2cFwiYCwgYFwibWVkaWFuXCJgLCBgXCJxMVwiYCwgYFwicTNcImAsIGBcIm1pblwiYCwgYFwibWF4XCJgKS4gRm9yIG90aGVyIGFnZ3JlZ2F0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIG91dHNpZGUgb2YgdGhlIHJhdyBkYXRhIGRvbWFpbiAoZS5nLiBgXCJjb3VudFwiYCwgYFwic3VtXCJgKSwgdGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxuICAgKi9cbiAgdXNlUmF3RG9tYWluPzogYm9vbGVhbjtcbn1cbiIsIi8qKiBtb2R1bGUgZm9yIHNob3J0aGFuZCAqL1xuXG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG5pbXBvcnQge0FnZ3JlZ2F0ZU9wLCBBR0dSRUdBVEVfT1BTfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge1RJTUVVTklUU30gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge1NIT1JUX1RZUEUsIFRZUEVfRlJPTV9TSE9SVF9UWVBFfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcblxuZXhwb3J0IGNvbnN0IERFTElNID0gJ3wnO1xuZXhwb3J0IGNvbnN0IEFTU0lHTiA9ICc9JztcbmV4cG9ydCBjb25zdCBUWVBFID0gJywnO1xuZXhwb3J0IGNvbnN0IEZVTkMgPSAnXyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW4oc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IHN0cmluZyB7XG4gIHJldHVybiAnbWFyaycgKyBBU1NJR04gKyBzcGVjLm1hcmsgK1xuICAgIERFTElNICsgc2hvcnRlbkVuY29kaW5nKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc2hvcnRoYW5kOiBzdHJpbmcsIGRhdGE/LCBjb25maWc/KSB7XG4gIGxldCBzcGxpdCA9IHNob3J0aGFuZC5zcGxpdChERUxJTSksXG4gICAgbWFyayA9IHNwbGl0LnNoaWZ0KCkuc3BsaXQoQVNTSUdOKVsxXS50cmltKCksXG4gICAgZW5jb2RpbmcgPSBwYXJzZUVuY29kaW5nKHNwbGl0LmpvaW4oREVMSU0pKTtcblxuICBsZXQgc3BlYzpFeHRlbmRlZFVuaXRTcGVjID0ge1xuICAgIG1hcms6IE1hcmtbbWFya10sXG4gICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gIH07XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHNwZWMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgaWYgKGNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5jb25maWcgPSBjb25maWc7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRW5jb2RpbmcoZW5jb2Rpbmc6IEVuY29kaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZsRW5jb2RpbmcubWFwKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZiwgY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsICsgQVNTSUdOICsgc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgfSkuam9pbihERUxJTSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVuY29kaW5nKGVuY29kaW5nU2hvcnRoYW5kOiBzdHJpbmcpOiBFbmNvZGluZyB7XG4gIHJldHVybiBlbmNvZGluZ1Nob3J0aGFuZC5zcGxpdChERUxJTSkucmVkdWNlKGZ1bmN0aW9uKG0sIGUpIHtcbiAgICBjb25zdCBzcGxpdCA9IGUuc3BsaXQoQVNTSUdOKSxcbiAgICAgICAgZW5jdHlwZSA9IHNwbGl0WzBdLnRyaW0oKSxcbiAgICAgICAgZmllbGREZWZTaG9ydGhhbmQgPSBzcGxpdFsxXTtcblxuICAgIG1bZW5jdHlwZV0gPSBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kKTtcbiAgICByZXR1cm4gbTtcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZik6IHN0cmluZyB7XG4gIHJldHVybiAoZmllbGREZWYuYWdncmVnYXRlID8gZmllbGREZWYuYWdncmVnYXRlICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLnRpbWVVbml0ID8gZmllbGREZWYudGltZVVuaXQgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuYmluID8gJ2JpbicgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuZmllbGQgfHwgJycpICsgVFlQRSArIFNIT1JUX1RZUEVbZmllbGREZWYudHlwZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWZzKGZpZWxkRGVmczogRmllbGREZWZbXSwgZGVsaW0gPSBERUxJTSk6IHN0cmluZyB7XG4gIHJldHVybiBmaWVsZERlZnMubWFwKHNob3J0ZW5GaWVsZERlZikuam9pbihkZWxpbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kOiBzdHJpbmcpOiBGaWVsZERlZiB7XG4gIGNvbnN0IHNwbGl0ID0gZmllbGREZWZTaG9ydGhhbmQuc3BsaXQoVFlQRSk7XG5cbiAgbGV0IGZpZWxkRGVmOiBGaWVsZERlZiA9IHtcbiAgICBmaWVsZDogc3BsaXRbMF0udHJpbSgpLFxuICAgIHR5cGU6IFRZUEVfRlJPTV9TSE9SVF9UWVBFW3NwbGl0WzFdLnRyaW0oKV1cbiAgfTtcblxuICAvLyBjaGVjayBhZ2dyZWdhdGUgdHlwZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFHR1JFR0FURV9PUFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgYSA9IEFHR1JFR0FURV9PUFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoYSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGEudG9TdHJpbmcoKS5sZW5ndGggKyAxKTtcbiAgICAgIGlmIChhID09PSBBZ2dyZWdhdGVPcC5DT1VOVCAmJiBmaWVsZERlZi5maWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZmllbGREZWYuZmllbGQgPSAnKic7XG4gICAgICB9XG4gICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBUSU1FVU5JVFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdHUgPSBUSU1FVU5JVFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YodHUgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihmaWVsZERlZi5maWVsZC5sZW5ndGggKyAxKTtcbiAgICAgIGZpZWxkRGVmLnRpbWVVbml0ID0gdHU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBiaW5cbiAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoJ2Jpbl8nKSA9PT0gMCkge1xuICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKDQpO1xuICAgIGZpZWxkRGVmLmJpbiA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gZmllbGREZWY7XG59XG4iLCJpbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5cbmV4cG9ydCBlbnVtIFNvcnRPcmRlciB7XG4gICAgQVNDRU5ESU5HID0gJ2FzY2VuZGluZycgYXMgYW55LFxuICAgIERFU0NFTkRJTkcgPSAnZGVzY2VuZGluZycgYXMgYW55LFxuICAgIE5PTkUgPSAnbm9uZScgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRGaWVsZCB7XG4gIC8qKlxuICAgKiBUaGUgZmllbGQgbmFtZSB0byBhZ2dyZWdhdGUgb3Zlci5cbiAgICovXG4gIGZpZWxkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc29ydCBhZ2dyZWdhdGlvbiBvcGVyYXRvclxuICAgKi9cbiAgb3A6IEFnZ3JlZ2F0ZU9wO1xuXG4gIG9yZGVyPzogU29ydE9yZGVyO1xufVxuIiwiLyogUGFja2FnZSBvZiBkZWZpbmluZyBWZWdhLWxpdGUgU3BlY2lmaWNhdGlvbidzIGpzb24gc2NoZW1hIGF0IGl0cyB1dGlsaXR5IGZ1bmN0aW9ucyAqL1xuXG5pbXBvcnQge0NvbmZpZywgZGVmYXVsdE92ZXJsYXlDb25maWcsIEFyZWFPdmVybGF5fSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0RhdGF9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge0VuY29kaW5nLCBVbml0RW5jb2RpbmcsIGhhcywgaXNSYW5nZWR9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGYWNldH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL2ZpZWxkZGVmJztcbmltcG9ydCB7TWFyaywgRVJST1JCQVIsIFRJQ0ssIEFSRUEsIFJVTEUsIExJTkUsIFBPSU5UfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtzdGFja30gZnJvbSAnLi9zdGFjayc7XG5pbXBvcnQge1RyYW5zZm9ybX0gZnJvbSAnLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtST1csIENPTFVNTiwgWCwgWSwgWDIsIFkyfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7Y29udGFpbnMsIGR1cGxpY2F0ZSwgZXh0ZW5kLCBrZXlzLCBvbWl0LCBwaWNrfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIHZpc3VhbGl6YXRpb24gZm9yIGxhdGVyIHJlZmVyZW5jZS5cbiAgICovXG4gIG5hbWU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGRlc2NyaXB0aW9uIG9mIHRoaXMgbWFyayBmb3IgY29tbWVudGluZyBwdXJwb3NlLlxuICAgKiBUaGlzIHByb3BlcnR5IGhhcyBubyBlZmZlY3Qgb24gdGhlIG91dHB1dCB2aXN1YWxpemF0aW9uLlxuICAgKi9cbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBkYXRhIHNvdXJjZVxuICAgKi9cbiAgZGF0YT86IERhdGE7XG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBkZXNjcmliaW5nIGZpbHRlciBhbmQgbmV3IGZpZWxkIGNhbGN1bGF0aW9uLlxuICAgKi9cbiAgdHJhbnNmb3JtPzogVHJhbnNmb3JtO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIG9iamVjdFxuICAgKi9cbiAgY29uZmlnPzogQ29uZmlnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVuaXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICAvKipcbiAgICogVGhlIG1hcmsgdHlwZS5cbiAgICogT25lIG9mIGBcImJhclwiYCwgYFwiY2lyY2xlXCJgLCBgXCJzcXVhcmVcImAsIGBcInRpY2tcImAsIGBcImxpbmVcImAsXG4gICAqIGBcImFyZWFcImAsIGBcInBvaW50XCJgLCBgXCJydWxlXCJgLCBhbmQgYFwidGV4dFwiYC5cbiAgICovXG4gIG1hcms6IE1hcms7XG5cbiAgLyoqXG4gICAqIEEga2V5LXZhbHVlIG1hcHBpbmcgYmV0d2VlbiBlbmNvZGluZyBjaGFubmVscyBhbmQgZGVmaW5pdGlvbiBvZiBmaWVsZHMuXG4gICAqL1xuICBlbmNvZGluZz86IFVuaXRFbmNvZGluZztcbn1cblxuLyoqXG4gKiBTY2hlbWEgZm9yIGEgdW5pdCBWZWdhLUxpdGUgc3BlY2lmaWNhdGlvbiwgd2l0aCB0aGUgc3ludGFjdGljIHN1Z2FyIGV4dGVuc2lvbnM6XG4gKiAtIGByb3dgIGFuZCBgY29sdW1uYCBhcmUgaW5jbHVkZWQgaW4gdGhlIGVuY29kaW5nLlxuICogLSAoRnV0dXJlKSBsYWJlbCwgYm94IHBsb3RcbiAqXG4gKiBOb3RlOiB0aGUgc3BlYyBjb3VsZCBjb250YWluIGZhY2V0LlxuICpcbiAqIEByZXF1aXJlZCBbXCJtYXJrXCIsIFwiZW5jb2RpbmdcIl1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHRlbmRlZFVuaXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICAvKipcbiAgICogVGhlIG1hcmsgdHlwZS5cbiAgICogT25lIG9mIGBcImJhclwiYCwgYFwiY2lyY2xlXCJgLCBgXCJzcXVhcmVcImAsIGBcInRpY2tcImAsIGBcImxpbmVcImAsXG4gICAqIGBcImFyZWFcImAsIGBcInBvaW50XCJgLCBgXCJydWxlXCJgLCBhbmQgYFwidGV4dFwiYC5cbiAgICovXG4gIG1hcms6IE1hcms7XG5cbiAgLyoqXG4gICAqIEEga2V5LXZhbHVlIG1hcHBpbmcgYmV0d2VlbiBlbmNvZGluZyBjaGFubmVscyBhbmQgZGVmaW5pdGlvbiBvZiBmaWVsZHMuXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgZmFjZXQ6IEZhY2V0O1xuICBzcGVjOiBMYXllclNwZWMgfCBVbml0U3BlYztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXllclNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBVbml0IHNwZWNzIHRoYXQgd2lsbCBiZSBsYXllcmVkLlxuICAgKi9cbiAgbGF5ZXJzOiBVbml0U3BlY1tdO1xufVxuXG4vKiogVGhpcyBpcyBmb3IgdGhlIGZ1dHVyZSBzY2hlbWEgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRGYWNldFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIGZhY2V0OiBGYWNldDtcblxuICBzcGVjOiBFeHRlbmRlZFVuaXRTcGVjIHwgRmFjZXRTcGVjO1xufVxuXG5leHBvcnQgdHlwZSBFeHRlbmRlZFNwZWMgPSBFeHRlbmRlZFVuaXRTcGVjIHwgRmFjZXRTcGVjIHwgTGF5ZXJTcGVjO1xuZXhwb3J0IHR5cGUgU3BlYyA9IFVuaXRTcGVjIHwgRmFjZXRTcGVjIHwgTGF5ZXJTcGVjO1xuXG4vKiBDdXN0b20gdHlwZSBndWFyZHMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmFjZXRTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgRmFjZXRTcGVjIHtcbiAgcmV0dXJuIHNwZWNbJ2ZhY2V0J10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXh0ZW5kZWRVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEV4dGVuZGVkVW5pdFNwZWMge1xuICBpZiAoaXNTb21lVW5pdFNwZWMoc3BlYykpIHtcbiAgICBjb25zdCBoYXNSb3cgPSBoYXMoc3BlYy5lbmNvZGluZywgUk9XKTtcbiAgICBjb25zdCBoYXNDb2x1bW4gPSBoYXMoc3BlYy5lbmNvZGluZywgQ09MVU1OKTtcblxuICAgIHJldHVybiBoYXNSb3cgfHwgaGFzQ29sdW1uO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIFVuaXRTcGVjIHtcbiAgaWYgKGlzU29tZVVuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuICFpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYyk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NvbWVVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEV4dGVuZGVkVW5pdFNwZWMgfCBVbml0U3BlYyB7XG4gIHJldHVybiBzcGVjWydtYXJrJ10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGF5ZXJTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgTGF5ZXJTcGVjIHtcbiAgcmV0dXJuIHNwZWNbJ2xheWVycyddICE9PSB1bmRlZmluZWQ7XG59XG5cblxuLyoqXG4gKiBEZWNvbXBvc2UgZXh0ZW5kZWQgdW5pdCBzcGVjcyBpbnRvIGNvbXBvc2l0aW9uIG9mIHB1cmUgdW5pdCBzcGVjcy5cbiAqL1xuLy8gVE9ETzogY29uc2lkZXIgbW92aW5nIHRoaXMgdG8gYW5vdGhlciBmaWxlLiAgTWF5YmUgdmwuc3BlYy5ub3JtYWxpemUgb3Igdmwubm9ybWFsaXplXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHNwZWM6IEV4dGVuZGVkU3BlYyk6IFNwZWMge1xuICBpZiAoaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUV4dGVuZGVkVW5pdFNwZWMoc3BlYyk7XG4gIH1cbiAgaWYgKGlzVW5pdFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplVW5pdFNwZWMoc3BlYyk7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVFeHRlbmRlZFVuaXRTcGVjKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBTcGVjIHtcbiAgICBjb25zdCBoYXNSb3cgPSBoYXMoc3BlYy5lbmNvZGluZywgUk9XKTtcbiAgICBjb25zdCBoYXNDb2x1bW4gPSBoYXMoc3BlYy5lbmNvZGluZywgQ09MVU1OKTtcblxuICAgIC8vIFRPRE86IEBhcnZpbmQgcGxlYXNlICBhZGQgaW50ZXJhY3Rpb24gc3ludGF4IGhlcmVcbiAgICBsZXQgZW5jb2RpbmcgPSBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZyk7XG4gICAgZGVsZXRlIGVuY29kaW5nLmNvbHVtbjtcbiAgICBkZWxldGUgZW5jb2Rpbmcucm93O1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIHNwZWMubmFtZSA/IHsgbmFtZTogc3BlYy5uYW1lIH0gOiB7fSxcbiAgICAgIHNwZWMuZGVzY3JpcHRpb24gPyB7IGRlc2NyaXB0aW9uOiBzcGVjLmRlc2NyaXB0aW9uIH0gOiB7fSxcbiAgICAgIHsgZGF0YTogc3BlYy5kYXRhIH0sXG4gICAgICBzcGVjLnRyYW5zZm9ybSA/IHsgdHJhbnNmb3JtOiBzcGVjLnRyYW5zZm9ybSB9IDoge30sXG4gICAgICB7XG4gICAgICAgIGZhY2V0OiBleHRlbmQoXG4gICAgICAgICAgaGFzUm93ID8geyByb3c6IHNwZWMuZW5jb2Rpbmcucm93IH0gOiB7fSxcbiAgICAgICAgICBoYXNDb2x1bW4gPyB7IGNvbHVtbjogc3BlYy5lbmNvZGluZy5jb2x1bW4gfSA6IHt9XG4gICAgICAgICksXG4gICAgICAgIHNwZWM6IG5vcm1hbGl6ZVVuaXRTcGVjKHtcbiAgICAgICAgICBtYXJrOiBzcGVjLm1hcmssXG4gICAgICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc3BlYy5jb25maWcgPyB7IGNvbmZpZzogc3BlYy5jb25maWcgfSA6IHt9XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRTcGVjKHNwZWM6IFVuaXRTcGVjKTogU3BlYyB7XG4gIGNvbnN0IGNvbmZpZyA9IHNwZWMuY29uZmlnO1xuICBjb25zdCBvdmVybGF5Q29uZmlnID0gY29uZmlnICYmIGNvbmZpZy5vdmVybGF5O1xuICBjb25zdCBvdmVybGF5V2l0aExpbmUgPSBvdmVybGF5Q29uZmlnICAmJiBzcGVjLm1hcmsgPT09IEFSRUEgJiZcbiAgICBjb250YWlucyhbQXJlYU92ZXJsYXkuTElORVBPSU5ULCBBcmVhT3ZlcmxheS5MSU5FXSwgb3ZlcmxheUNvbmZpZy5hcmVhKTtcbiAgY29uc3Qgb3ZlcmxheVdpdGhQb2ludCA9IG92ZXJsYXlDb25maWcgJiYgKFxuICAgIChvdmVybGF5Q29uZmlnLmxpbmUgJiYgc3BlYy5tYXJrID09PSBMSU5FKSB8fFxuICAgIChvdmVybGF5Q29uZmlnLmFyZWEgPT09IEFyZWFPdmVybGF5LkxJTkVQT0lOVCAmJiBzcGVjLm1hcmsgPT09IEFSRUEpXG4gICk7XG5cbiAgLy8gVE9ETzogdGhvcm91Z2hseSB0ZXN0XG4gIGlmIChzcGVjLm1hcmsgPT09IEVSUk9SQkFSKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUVycm9yQmFyVW5pdFNwZWMoc3BlYyk7XG4gIH1cbiAgLy8gVE9ETzogdGhvcm91Z2hseSB0ZXN0XG4gIGlmIChpc1JhbmdlZChzcGVjLmVuY29kaW5nKSkge1xuICAgIHJldHVybiBub3JtYWxpemVSYW5nZWRVbml0U3BlYyhzcGVjKTtcbiAgfVxuXG4gIGlmIChpc1N0YWNrZWQoc3BlYykpIHtcbiAgICAvLyBXZSBjYW4ndCBvdmVybGF5IHN0YWNrZWQgYXJlYSB5ZXQhXG4gICAgcmV0dXJuIHNwZWM7XG4gIH1cblxuICBpZiAob3ZlcmxheVdpdGhQb2ludCB8fCBvdmVybGF5V2l0aExpbmUpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplT3ZlcmxheShzcGVjLCBvdmVybGF5V2l0aFBvaW50LCBvdmVybGF5V2l0aExpbmUpO1xuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUmFuZ2VkVW5pdFNwZWMoc3BlYzogVW5pdFNwZWMpOiBTcGVjIHtcbiAgaWYgKHNwZWMuZW5jb2RpbmcpIHtcbiAgICBjb25zdCBoYXNYID0gaGFzKHNwZWMuZW5jb2RpbmcsIFgpO1xuICAgIGNvbnN0IGhhc1kgPSBoYXMoc3BlYy5lbmNvZGluZywgWSk7XG4gICAgY29uc3QgaGFzWDIgPSBoYXMoc3BlYy5lbmNvZGluZywgWDIpO1xuICAgIGNvbnN0IGhhc1kyID0gaGFzKHNwZWMuZW5jb2RpbmcsIFkyKTtcbiAgICBpZiAoKGhhc1gyICYmICFoYXNYKSB8fCAoaGFzWTIgJiYgIWhhc1kpKSB7XG4gICAgICBsZXQgbm9ybWFsaXplZFNwZWMgPSBkdXBsaWNhdGUoc3BlYyk7XG4gICAgICBpZiAoaGFzWDIgJiYgIWhhc1gpIHtcbiAgICAgICAgbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueCA9IG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLngyO1xuICAgICAgICBkZWxldGUgbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueDI7XG4gICAgICB9XG4gICAgICBpZiAoaGFzWTIgJiYgIWhhc1kpIHtcbiAgICAgICAgbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueSA9IG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnkyO1xuICAgICAgICBkZWxldGUgbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueTI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkU3BlYztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVFcnJvckJhclVuaXRTcGVjKHNwZWM6IFVuaXRTcGVjKTogU3BlYyB7XG4gIC8vIEZJWE1FIGNvcnJlY3RseSBkZWFsIHdpdGggY29sb3IgYW5kIG9wYWNpdHlcblxuICBsZXQgbGF5ZXJTcGVjID0gZXh0ZW5kKHNwZWMubmFtZSA/IHtuYW1lOiBzcGVjLm5hbWV9IDoge30sXG4gICAgc3BlYy5kZXNjcmlwdGlvbiA/IHtkZXNjcmlwdGlvbjogc3BlYy5kZXNjcmlwdGlvbn0gOiB7fSxcbiAgICBzcGVjLmRhdGEgPyB7ZGF0YTogc3BlYy5kYXRhfSA6IHt9LFxuICAgIHNwZWMudHJhbnNmb3JtID8ge3RyYW5zZm9ybTogc3BlYy50cmFuc2Zvcm19IDoge30sXG4gICAgc3BlYy5jb25maWcgPyB7Y29uZmlnOiBzcGVjLmNvbmZpZ30gOiB7fSwge2xheWVyczogW119XG4gICk7XG4gIGlmICghc3BlYy5lbmNvZGluZykge1xuICAgIHJldHVybiBsYXllclNwZWM7XG4gIH1cbiAgaWYgKHNwZWMubWFyayA9PT0gRVJST1JCQVIpIHtcbiAgICBjb25zdCBydWxlU3BlYyA9IHtcbiAgICAgIG1hcms6IFJVTEUsXG4gICAgICBlbmNvZGluZzogZXh0ZW5kKFxuICAgICAgICBzcGVjLmVuY29kaW5nLnggPyB7eDogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueCl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueSA/IHt5OiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55KX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy54MiA/IHt4MjogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueDIpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnkyID8ge3kyOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55Mil9IDoge30sXG4gICAgICAgIHt9KVxuICAgIH07XG4gICAgY29uc3QgbG93ZXJUaWNrU3BlYyA9IHtcbiAgICAgIG1hcms6IFRJQ0ssXG4gICAgICBlbmNvZGluZzogZXh0ZW5kKFxuICAgICAgICBzcGVjLmVuY29kaW5nLnggPyB7eDogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueCl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueSA/IHt5OiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55KX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy5zaXplID8ge3NpemU6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnNpemUpfSA6IHt9LFxuICAgICAgICB7fSlcbiAgICB9O1xuICAgIGNvbnN0IHVwcGVyVGlja1NwZWMgPSB7XG4gICAgICBtYXJrOiBUSUNLLFxuICAgICAgZW5jb2Rpbmc6IGV4dGVuZCh7XG4gICAgICAgIHg6IHNwZWMuZW5jb2RpbmcueDIgPyBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy54MikgOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy54KSxcbiAgICAgICAgeTogc3BlYy5lbmNvZGluZy55MiA/IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnkyKSA6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnkpXG4gICAgICB9LCBzcGVjLmVuY29kaW5nLnNpemUgPyB7c2l6ZTogZHVwbGljYXRlKHNwZWMuZW5jb2Rpbmcuc2l6ZSl9IDoge30pXG4gICAgfTtcbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobm9ybWFsaXplVW5pdFNwZWMocnVsZVNwZWMpKTtcbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobm9ybWFsaXplVW5pdFNwZWMobG93ZXJUaWNrU3BlYykpO1xuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChub3JtYWxpemVVbml0U3BlYyh1cHBlclRpY2tTcGVjKSk7XG4gIH1cbiAgcmV0dXJuIGxheWVyU3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU92ZXJsYXkoc3BlYzogVW5pdFNwZWMsIG92ZXJsYXlXaXRoUG9pbnQ6IGJvb2xlYW4sIG92ZXJsYXlXaXRoTGluZTogYm9vbGVhbik6IExheWVyU3BlYyB7XG4gIGxldCBvdXRlclByb3BzID0gWyduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2RhdGEnLCAndHJhbnNmb3JtJ107XG4gIGxldCBiYXNlU3BlYyA9IG9taXQoc3BlYywgb3V0ZXJQcm9wcy5jb25jYXQoJ2NvbmZpZycpKTtcblxuICBsZXQgYmFzZUNvbmZpZyA9IGR1cGxpY2F0ZShzcGVjLmNvbmZpZyk7XG4gIGRlbGV0ZSBiYXNlQ29uZmlnLm92ZXJsYXk7XG4gIC8vIFRPRE86IHJlbW92ZSBzaGFwZSwgc2l6ZVxuXG4gIGNvbnN0IGxheWVyU3BlYyA9IGV4dGVuZChcbiAgICBwaWNrKHNwZWMsIG91dGVyUHJvcHMpLFxuICAgIHsgbGF5ZXJzOiBbYmFzZVNwZWNdIH0sXG4gICAga2V5cyhiYXNlQ29uZmlnKS5sZW5ndGggPiAwID8geyBjb25maWc6IGJhc2VDb25maWcgfSA6IHt9XG4gICk7XG5cbiAgaWYgKG92ZXJsYXlXaXRoTGluZSkge1xuICAgIC8vIFRPRE86IGFkZCBuYW1lIHdpdGggc3VmZml4XG4gICAgbGV0IGxpbmVTcGVjID0gZHVwbGljYXRlKGJhc2VTcGVjKTtcbiAgICBsaW5lU3BlYy5tYXJrID0gTElORTtcbiAgICAvLyBUT0RPOiByZW1vdmUgc2hhcGUsIHNpemVcbiAgICBsZXQgbWFya0NvbmZpZyA9IGV4dGVuZCh7fSwgZGVmYXVsdE92ZXJsYXlDb25maWcubGluZVN0eWxlLCBzcGVjLmNvbmZpZy5vdmVybGF5LmxpbmVTdHlsZSk7XG4gICAgaWYgKGtleXMobWFya0NvbmZpZykubGVuZ3RoID4gMCkge1xuICAgICAgbGluZVNwZWMuY29uZmlnID0ge21hcms6IG1hcmtDb25maWd9O1xuICAgIH1cblxuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChsaW5lU3BlYyk7XG4gIH1cblxuICBpZiAob3ZlcmxheVdpdGhQb2ludCkge1xuICAgIC8vIFRPRE86IGFkZCBuYW1lIHdpdGggc3VmZml4XG4gICAgbGV0IHBvaW50U3BlYyA9IGR1cGxpY2F0ZShiYXNlU3BlYyk7XG4gICAgcG9pbnRTcGVjLm1hcmsgPSBQT0lOVDtcbiAgICBsZXQgbWFya0NvbmZpZyA9IGV4dGVuZCh7fSwgZGVmYXVsdE92ZXJsYXlDb25maWcucG9pbnRTdHlsZSwgc3BlYy5jb25maWcub3ZlcmxheS5wb2ludFN0eWxlKTs7XG4gICAgaWYgKGtleXMobWFya0NvbmZpZykubGVuZ3RoID4gMCkge1xuICAgICAgcG9pbnRTcGVjLmNvbmZpZyA9IHttYXJrOiBtYXJrQ29uZmlnfTtcbiAgICB9XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKHBvaW50U3BlYyk7XG4gIH1cbiAgcmV0dXJuIGxheWVyU3BlYztcbn1cblxuLy8gVE9ETzogYWRkIHZsLnNwZWMudmFsaWRhdGUgJiBtb3ZlIHN0dWZmIGZyb20gdmwudmFsaWRhdGUgdG8gaGVyZVxuXG5leHBvcnQgZnVuY3Rpb24gYWx3YXlzTm9PY2NsdXNpb24oc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IGJvb2xlYW4ge1xuICAvLyBGSVhNRSByYXcgT3hRIHdpdGggIyBvZiByb3dzID0gIyBvZiBPXG4gIHJldHVybiB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGREZWZzKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBGaWVsZERlZltdIHtcbiAgLy8gVE9ETzogcmVmYWN0b3IgdGhpcyBvbmNlIHdlIGhhdmUgY29tcG9zaXRpb25cbiAgcmV0dXJuIHZsRW5jb2RpbmcuZmllbGREZWZzKHNwZWMuZW5jb2RpbmcpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsZWFuU3BlYyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRXh0ZW5kZWRVbml0U3BlYyB7XG4gIC8vIFRPRE86IG1vdmUgdG9TcGVjIHRvIGhlcmUhXG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdGFja2VkKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBib29sZWFuIHtcbiAgcmV0dXJuIHN0YWNrKHNwZWMubWFyaywgc3BlYy5lbmNvZGluZywgc3BlYy5jb25maWcpICE9PSBudWxsO1xufVxuXG4vLyBUT0RPIHJldmlzZVxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRXh0ZW5kZWRVbml0U3BlYyB7XG4gIGNvbnN0IG9sZGVuYyA9IHNwZWMuZW5jb2Rpbmc7XG4gIGxldCBlbmNvZGluZyA9IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nKTtcbiAgZW5jb2RpbmcueCA9IG9sZGVuYy55O1xuICBlbmNvZGluZy55ID0gb2xkZW5jLng7XG4gIGVuY29kaW5nLnJvdyA9IG9sZGVuYy5jb2x1bW47XG4gIGVuY29kaW5nLmNvbHVtbiA9IG9sZGVuYy5yb3c7XG4gIHNwZWMuZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgcmV0dXJuIHNwZWM7XG59XG4iLCJpbXBvcnQge0NoYW5uZWwsIFNUQUNLX0dST1VQX0NIQU5ORUxTLCBYLCBZfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7RW5jb2RpbmcsIGhhcywgaXNBZ2dyZWdhdGV9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtNYXJrLCBCQVIsIEFSRUF9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZW51bSBTdGFja09mZnNldCB7XG4gIFpFUk8gPSAnemVybycgYXMgYW55LFxuICBDRU5URVIgPSAnY2VudGVyJyBhcyBhbnksXG4gIE5PUk1BTElaRSA9ICdub3JtYWxpemUnIGFzIGFueSxcbiAgTk9ORSA9ICdub25lJyBhcyBhbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFja1Byb3BlcnRpZXMge1xuICAvKiogRGltZW5zaW9uIGF4aXMgb2YgdGhlIHN0YWNrICgneCcgb3IgJ3knKS4gKi9cbiAgZ3JvdXBieUNoYW5uZWw6IENoYW5uZWw7XG5cbiAgLyoqIE1lYXN1cmUgYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBmaWVsZENoYW5uZWw6IENoYW5uZWw7XG5cbiAgLyoqIFN0YWNrLWJ5IGNoYW5uZWxzIGUuZy4sIGNvbG9yLCBkZXRhaWwgKi9cbiAgc3RhY2tCeUNoYW5uZWxzOiBDaGFubmVsW107XG5cbiAgLyoqIFN0YWNrIG9mZnNldCBwcm9wZXJ0eS4gKi9cbiAgb2Zmc2V0OiBTdGFja09mZnNldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBTdGFja1Byb3BlcnRpZXMge1xuICBjb25zdCBzdGFja2VkID0gKGNvbmZpZyAmJiBjb25maWcubWFyaykgPyBjb25maWcubWFyay5zdGFja2VkIDogdW5kZWZpbmVkO1xuXG4gIC8vIFNob3VsZCBub3QgaGF2ZSBzdGFjayBleHBsaWNpdGx5IGRpc2FibGVkXG4gIGlmIChjb250YWlucyhbU3RhY2tPZmZzZXQuTk9ORSwgbnVsbCwgZmFsc2VdLCBzdGFja2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU2hvdWxkIGhhdmUgc3RhY2thYmxlIG1hcmtcbiAgaWYgKCFjb250YWlucyhbQkFSLCBBUkVBXSwgbWFyaykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNob3VsZCBiZSBhZ2dyZWdhdGUgcGxvdFxuICBpZiAoIWlzQWdncmVnYXRlKGVuY29kaW5nKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU2hvdWxkIGhhdmUgZ3JvdXBpbmcgbGV2ZWwgb2YgZGV0YWlsXG4gIGNvbnN0IHN0YWNrQnlDaGFubmVscyA9IFNUQUNLX0dST1VQX0NIQU5ORUxTLnJlZHVjZSgoc2MsIGNoYW5uZWwpID0+IHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSAmJiAhZW5jb2RpbmdbY2hhbm5lbF0uYWdncmVnYXRlKSB7XG4gICAgICBzYy5wdXNoKGNoYW5uZWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2M7XG4gIH0sIFtdKTtcblxuICBpZiAoc3RhY2tCeUNoYW5uZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gSGFzIG9ubHkgb25lIGFnZ3JlZ2F0ZSBheGlzXG4gIGNvbnN0IGhhc1hGaWVsZCA9IGhhcyhlbmNvZGluZywgWCk7XG4gIGNvbnN0IGhhc1lGaWVsZCA9IGhhcyhlbmNvZGluZywgWSk7XG4gIGNvbnN0IHhJc0FnZ3JlZ2F0ZSA9IGhhc1hGaWVsZCAmJiAhIWVuY29kaW5nLnguYWdncmVnYXRlO1xuICBjb25zdCB5SXNBZ2dyZWdhdGUgPSBoYXNZRmllbGQgJiYgISFlbmNvZGluZy55LmFnZ3JlZ2F0ZTtcblxuICBpZiAoeElzQWdncmVnYXRlICE9PSB5SXNBZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JvdXBieUNoYW5uZWw6IHhJc0FnZ3JlZ2F0ZSA/IChoYXNZRmllbGQgPyBZIDogbnVsbCkgOiAoaGFzWEZpZWxkID8gWCA6IG51bGwpLFxuICAgICAgZmllbGRDaGFubmVsOiB4SXNBZ2dyZWdhdGUgPyBYIDogWSxcbiAgICAgIHN0YWNrQnlDaGFubmVsczogc3RhY2tCeUNoYW5uZWxzLFxuICAgICAgb2Zmc2V0OiBzdGFja2VkIHx8IFN0YWNrT2Zmc2V0LlpFUk9cbiAgICB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuIiwiXG5leHBvcnQgZW51bSBUaW1lVW5pdCB7XG4gICAgWUVBUiA9ICd5ZWFyJyBhcyBhbnksXG4gICAgTU9OVEggPSAnbW9udGgnIGFzIGFueSxcbiAgICBEQVkgPSAnZGF5JyBhcyBhbnksXG4gICAgREFURSA9ICdkYXRlJyBhcyBhbnksXG4gICAgSE9VUlMgPSAnaG91cnMnIGFzIGFueSxcbiAgICBNSU5VVEVTID0gJ21pbnV0ZXMnIGFzIGFueSxcbiAgICBTRUNPTkRTID0gJ3NlY29uZHMnIGFzIGFueSxcbiAgICBNSUxMSVNFQ09ORFMgPSAnbWlsbGlzZWNvbmRzJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIID0gJ3llYXJtb250aCcgYXMgYW55LFxuICAgIFlFQVJNT05USERBWSA9ICd5ZWFybW9udGhkYXknIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVRFID0gJ3llYXJtb250aGRhdGUnIGFzIGFueSxcbiAgICBZRUFSREFZID0gJ3llYXJkYXknIGFzIGFueSxcbiAgICBZRUFSREFURSA9ICd5ZWFyZGF0ZScgYXMgYW55LFxuICAgIFlFQVJNT05USERBWUhPVVJTID0gJ3llYXJtb250aGRheWhvdXJzJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZSE9VUlNNSU5VVEVTID0gJ3llYXJtb250aGRheWhvdXJzbWludXRlcycgYXMgYW55LFxuICAgIFlFQVJNT05USERBWUhPVVJTTUlOVVRFU1NFQ09ORFMgPSAneWVhcm1vbnRoZGF5aG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICAgIEhPVVJTTUlOVVRFUyA9ICdob3Vyc21pbnV0ZXMnIGFzIGFueSxcbiAgICBIT1VSU01JTlVURVNTRUNPTkRTID0gJ2hvdXJzbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgICBNSU5VVEVTU0VDT05EUyA9ICdtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICAgIFNFQ09ORFNNSUxMSVNFQ09ORFMgPSAnc2Vjb25kc21pbGxpc2Vjb25kcycgYXMgYW55LFxuICAgIFFVQVJURVIgPSAncXVhcnRlcicgYXMgYW55LFxuICAgIFlFQVJRVUFSVEVSID0gJ3llYXJxdWFydGVyJyBhcyBhbnksXG4gICAgUVVBUlRFUk1PTlRIID0gJ3F1YXJ0ZXJtb250aCcgYXMgYW55LFxuICAgIFlFQVJRVUFSVEVSTU9OVEggPSAneWVhcnF1YXJ0ZXJtb250aCcgYXMgYW55LFxufVxuXG5leHBvcnQgY29uc3QgVElNRVVOSVRTID0gW1xuICAgIFRpbWVVbml0LllFQVIsXG4gICAgVGltZVVuaXQuTU9OVEgsXG4gICAgVGltZVVuaXQuREFZLFxuICAgIFRpbWVVbml0LkRBVEUsXG4gICAgVGltZVVuaXQuSE9VUlMsXG4gICAgVGltZVVuaXQuTUlOVVRFUyxcbiAgICBUaW1lVW5pdC5TRUNPTkRTLFxuICAgIFRpbWVVbml0Lk1JTExJU0VDT05EUyxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEgsXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFZLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBVEUsXG4gICAgVGltZVVuaXQuWUVBUkRBWSxcbiAgICBUaW1lVW5pdC5ZRUFSREFURSxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVlIT1VSUyxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVlIT1VSU01JTlVURVMsXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFZSE9VUlNNSU5VVEVTU0VDT05EUyxcbiAgICBUaW1lVW5pdC5IT1VSU01JTlVURVMsXG4gICAgVGltZVVuaXQuSE9VUlNNSU5VVEVTU0VDT05EUyxcbiAgICBUaW1lVW5pdC5NSU5VVEVTU0VDT05EUyxcbiAgICBUaW1lVW5pdC5TRUNPTkRTTUlMTElTRUNPTkRTLFxuICAgIFRpbWVVbml0LlFVQVJURVIsXG4gICAgVGltZVVuaXQuWUVBUlFVQVJURVIsXG4gICAgVGltZVVuaXQuUVVBUlRFUk1PTlRILFxuICAgIFRpbWVVbml0LllFQVJRVUFSVEVSTU9OVEgsXG5dO1xuXG4vKiogcmV0dXJucyB0aGUgdGVtcGxhdGUgbmFtZSB1c2VkIGZvciBheGlzIGxhYmVscyBmb3IgYSB0aW1lIHVuaXQgKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0aW1lVW5pdDogVGltZVVuaXQsIGZpZWxkOiBzdHJpbmcsIHNob3J0VGltZUxhYmVsczogYm9vbGVhbik6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGV0IGRhdGVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LllFQVIpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJXknIDogJyVZJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuUVVBUlRFUikpIHtcbiAgIC8vIHNwZWNpYWwgdGVtcGxhdGUgZm9yIHF1YXJ0ZXJcbiAgIGRhdGVDb21wb25lbnRzLnB1c2goJ1xcJ319UXt7JyArIGZpZWxkICsgJyB8IHF1YXJ0ZXJ9fXt7JyArIGZpZWxkICsgJyB8IHRpbWU6XFwnJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTU9OVEgpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJWInIDogJyVCJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goc2hvcnRUaW1lTGFiZWxzID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBVEUpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaCgnJWQnKTtcbiAgfVxuXG4gIGxldCB0aW1lQ29tcG9uZW50cyA9IFtdO1xuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclSCcpO1xuICB9XG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSU5VVEVTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVNJyk7XG4gIH1cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlNFQ09ORFMpKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJVMnKTtcbiAgfVxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTUlMTElTRUNPTkRTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVMJyk7XG4gIH1cblxuICBsZXQgb3V0ID0gW107XG4gIGlmIChkYXRlQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2goZGF0ZUNvbXBvbmVudHMuam9pbignLScpKTtcbiAgfVxuICBpZiAodGltZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKHRpbWVDb21wb25lbnRzLmpvaW4oJzonKSk7XG4gIH1cblxuICBpZiAob3V0Lmxlbmd0aCA+IDApIHtcbiAgLy8gY2xlYW4gdXAgZW1wdHkgZm9ybWF0dGluZyBleHByZXNzaW9ucyB0aGF0IG1heSBoYXZlIGJlZW4gZ2VuZXJhdGVkIGJ5IHRoZSBxdWFydGVyIHRpbWUgdW5pdFxuICAgY29uc3QgdGVtcGxhdGUgPSAne3snICsgZmllbGQgKyAnIHwgdGltZTpcXCcnICsgb3V0LmpvaW4oJyAnKSArICdcXCd9fSc7XG4gICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZShuZXcgUmVnRXhwKCd7eycgKyBmaWVsZCArICcgXFxcXHwgdGltZTpcXCdcXCd9fScsICdnJyksICcnKTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqIFJldHVybnMgdHJ1ZSBpZiBjb250YWluZXIgY29udGFpbnMgdGhlIGNvbnRhaW5lZSwgZmFsc2Ugb3RoZXJ3aXNlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zVGltZVVuaXQoZnVsbFRpbWVVbml0OiBUaW1lVW5pdCwgdGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gIGxldCBmdWxsVGltZVVuaXRTdHIgPSBmdWxsVGltZVVuaXQudG9TdHJpbmcoKTtcbiAgbGV0IHRpbWVVbml0U3RyID0gdGltZVVuaXQudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGZ1bGxUaW1lVW5pdFN0ci5pbmRleE9mKHRpbWVVbml0U3RyKSA+IC0xO1xufVxuIiwiLyoqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhIHR5cGUgKi9cblxuZXhwb3J0IGVudW0gVHlwZSB7XG4gIFFVQU5USVRBVElWRSA9ICdxdWFudGl0YXRpdmUnIGFzIGFueSxcbiAgT1JESU5BTCA9ICdvcmRpbmFsJyBhcyBhbnksXG4gIFRFTVBPUkFMID0gJ3RlbXBvcmFsJyBhcyBhbnksXG4gIE5PTUlOQUwgPSAnbm9taW5hbCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBRVUFOVElUQVRJVkUgPSBUeXBlLlFVQU5USVRBVElWRTtcbmV4cG9ydCBjb25zdCBPUkRJTkFMID0gVHlwZS5PUkRJTkFMO1xuZXhwb3J0IGNvbnN0IFRFTVBPUkFMID0gVHlwZS5URU1QT1JBTDtcbmV4cG9ydCBjb25zdCBOT01JTkFMID0gVHlwZS5OT01JTkFMO1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBmdWxsIHR5cGUgbmFtZXMgdG8gc2hvcnQgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBTSE9SVF9UWVBFID0ge1xuICBxdWFudGl0YXRpdmU6ICdRJyxcbiAgdGVtcG9yYWw6ICdUJyxcbiAgbm9taW5hbDogJ04nLFxuICBvcmRpbmFsOiAnTydcbn07XG4vKipcbiAqIE1hcHBpbmcgZnJvbSBzaG9ydCB0eXBlIG5hbWVzIHRvIGZ1bGwgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBUWVBFX0ZST01fU0hPUlRfVFlQRSA9IHtcbiAgUTogUVVBTlRJVEFUSVZFLFxuICBUOiBURU1QT1JBTCxcbiAgTzogT1JESU5BTCxcbiAgTjogTk9NSU5BTFxufTtcblxuLyoqXG4gKiBHZXQgZnVsbCwgbG93ZXJjYXNlIHR5cGUgbmFtZSBmb3IgYSBnaXZlbiB0eXBlLlxuICogQHBhcmFtICB0eXBlXG4gKiBAcmV0dXJuIEZ1bGwgdHlwZSBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbE5hbWUodHlwZTogVHlwZSk6IFR5cGUge1xuICBjb25zdCB0eXBlU3RyaW5nID0gPGFueT50eXBlOyAgLy8gZm9yY2UgdHlwZSBhcyBzdHJpbmcgc28gd2UgY2FuIHRyYW5zbGF0ZSBzaG9ydCB0eXBlc1xuICByZXR1cm4gVFlQRV9GUk9NX1NIT1JUX1RZUEVbdHlwZVN0cmluZy50b1VwcGVyQ2FzZSgpXSB8fCAvLyBzaG9ydCB0eXBlIGlzIHVwcGVyY2FzZSBieSBkZWZhdWx0XG4gICAgICAgICB0eXBlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9kYXRhbGliLmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9qc29uLXN0YWJsZS1zdHJpbmdpZnkuZC50c1wiLz5cblxuaW1wb3J0ICogYXMgc3RyaW5naWZ5IGZyb20gJ2pzb24tc3RhYmxlLXN0cmluZ2lmeSc7XG5leHBvcnQge2tleXMsIGV4dGVuZCwgZHVwbGljYXRlLCBpc0FycmF5LCB2YWxzLCB0cnVuY2F0ZSwgdG9NYXAsIGlzT2JqZWN0LCBpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbn0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5pbXBvcnQge2R1cGxpY2F0ZSBhcyBfZHVwbGljYXRlfSBmcm9tICdkYXRhbGliL3NyYy91dGlsJztcbmV4cG9ydCB7cmFuZ2V9IGZyb20gJ2RhdGFsaWIvc3JjL2dlbmVyYXRlJztcbmV4cG9ydCB7aGFzfSBmcm9tICcuL2VuY29kaW5nJ1xuZXhwb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5leHBvcnQge0NoYW5uZWx9IGZyb20gJy4vY2hhbm5lbCc7XG5cbmltcG9ydCB7aXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgb2JqZWN0IHByb3BlcnRpZXMuXG4gKlxuICogRXhhbXBsZTogIChmcm9tIGxvZGFzaClcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqIHBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vIOKGkiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaWNrKG9iajogYW55LCBwcm9wczogc3RyaW5nW10pIHtcbiAgbGV0IGNvcHkgPSB7fTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGNvcHlbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIF8ucGljazsgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIG93blxuICogYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIG9iamVjdCB0aGF0IGFyZSBub3Qgb21pdHRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9taXQob2JqOiBhbnksIHByb3BzOiBzdHJpbmdbXSkge1xuICBsZXQgY29weSA9IF9kdXBsaWNhdGUob2JqKTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGRlbGV0ZSBjb3B5W3Byb3BdO1xuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKGE6IGFueSkge1xuICBpZiAoaXNTdHJpbmcoYSkgfHwgaXNOdW1iZXIoYSkgfHwgaXNCb29sZWFuKGEpKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKTtcbiAgfVxuICByZXR1cm4gc3RyaW5naWZ5KGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnM8VD4oYXJyYXk6IEFycmF5PFQ+LCBpdGVtOiBUKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pID4gLTE7XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBhcnJheSB3aXRob3V0IHRoZSBlbGVtZW50cyBpbiBpdGVtICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dDxUPihhcnJheTogQXJyYXk8VD4sIGV4Y2x1ZGVkSXRlbXM6IEFycmF5PFQ+KSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhY29udGFpbnMoZXhjbHVkZWRJdGVtcywgaXRlbSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248VD4oYXJyYXk6IEFycmF5PFQ+LCBvdGhlcjogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCh3aXRob3V0KG90aGVyLCBhcnJheSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmouZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoLmNhbGwodGhpc0FyZywgZik7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShvYmosIGY6IChhLCBpLCBkLCBrLCBvKSA9PiBhbnksIGluaXQsIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoucmVkdWNlKSB7XG4gICAgcmV0dXJuIG9iai5yZWR1Y2UuY2FsbCh0aGlzQXJnLCBmLCBpbml0KTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpbml0ID0gZi5jYWxsKHRoaXNBcmcsIGluaXQsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluaXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoubWFwKSB7XG4gICAgcmV0dXJuIG9iai5tYXAuY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmIChmKGFycltrXSwgaywgaSsrKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5PFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoIWYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnJheXM6IGFueVtdKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yIChsZXQgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0ICogYXMgZGxCaW4gZnJvbSAnZGF0YWxpYi9zcmMvYmlucy9iaW5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRiaW5zKHN0YXRzLCBtYXhiaW5zKSB7XG4gIHJldHVybiBkbEJpbih7XG4gICAgbWluOiBzdGF0cy5taW4sXG4gICAgbWF4OiBzdGF0cy5tYXgsXG4gICAgbWF4YmluczogbWF4Ymluc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZTxUPih2YWx1ZXM6IFRbXSwgZj86IChpdGVtOiBUKSA9PiBzdHJpbmcpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlOiBhbnkpIHtcbiAgY29uc29sZS53YXJuKCdbVkwgV2FybmluZ10nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLmVycm9yKCdbVkwgRXJyb3JdJywgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdDxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFN0cmluZ1NldCA9IERpY3Q8Ym9vbGVhbj47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gZGljaXRvbmFyaWVzIGRpc2FncmVlLiBBcHBsaWVzIG9ubHkgdG8gZGVmaW9uZWQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyPFQ+KGRpY3Q6IERpY3Q8VD4sIG90aGVyOiBEaWN0PFQ+KSB7XG4gIGZvciAobGV0IGtleSBpbiBkaWN0KSB7XG4gICAgaWYgKGRpY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG90aGVyW2tleV0gJiYgZGljdFtrZXldICYmIG90aGVyW2tleV0gIT09IGRpY3Rba2V5XSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG4vLyBUT0RPOiBtb3ZlIHRvIHZsLnNwZWMudmFsaWRhdG9yP1xuXG5pbXBvcnQge3RvTWFwfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtCQVJ9IGZyb20gJy4vbWFyayc7XG5cbmludGVyZmFjZSBSZXF1aXJlZENoYW5uZWxNYXAge1xuICBbbWFyazogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBFbmNvZGluZyBDaGFubmVscyBmb3IgZWFjaCBtYXJrIHR5cGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQOiBSZXF1aXJlZENoYW5uZWxNYXAgPSB7XG4gIHRleHQ6IFsndGV4dCddLFxuICBsaW5lOiBbJ3gnLCAneSddLFxuICBhcmVhOiBbJ3gnLCAneSddXG59O1xuXG5pbnRlcmZhY2UgU3VwcG9ydGVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiB7XG4gICAgW2NoYW5uZWw6IHN0cmluZ106IG51bWJlclxuICB9O1xufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBFbmNvZGluZyBDaGFubmVsIGZvciBlYWNoIG1hcmsgdHlwZVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0ge1xuICBiYXI6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnc2l6ZScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGxpbmU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLCAvLyBUT0RPOiBhZGQgc2l6ZSB3aGVuIFZlZ2Egc3VwcG9ydHNcbiAgYXJlYTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIHRpY2s6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLFxuICBjaXJjbGU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnXSksXG4gIHNxdWFyZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgcG9pbnQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnLCAnc2hhcGUnXSksXG4gIHRleHQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICdzaXplJywgJ2NvbG9yJywgJ3RleHQnXSkgLy8gVE9ETygjNzI0KSByZXZpc2Vcbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHNob3VsZCBhZGQgdmFsaWRhdGUgbWV0aG9kIGFuZFxuLy8gcmVxdWlyZXMgWlNjaGVtYSBpbiB0aGUgbWFpbiB2ZWdhLWxpdGUgcmVwb1xuXG4vKipcbiAqIEZ1cnRoZXIgY2hlY2sgaWYgZW5jb2RpbmcgbWFwcGluZyBvZiBhIHNwZWMgaXMgaW52YWxpZCBhbmRcbiAqIHJldHVybiBlcnJvciBpZiBpdCBpcyBpbnZhbGlkLlxuICpcbiAqIFRoaXMgY2hlY2tzIGlmXG4gKiAoMSkgYWxsIHRoZSByZXF1aXJlZCBlbmNvZGluZyBjaGFubmVscyBmb3IgdGhlIG1hcmsgdHlwZSBhcmUgc3BlY2lmaWVkXG4gKiAoMikgYWxsIHRoZSBzcGVjaWZpZWQgZW5jb2RpbmcgY2hhbm5lbHMgYXJlIHN1cHBvcnRlZCBieSB0aGUgbWFyayB0eXBlXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNwZWMgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UmVxdWlyZWRDaGFubmVsTWFwICA9IERlZmF1bHRSZXF1aXJlZENoYW5uZWxNYXB9ICByZXF1aXJlZENoYW5uZWxNYXBcbiAqIEBwYXJhbSAge1N1cHBvcnRlZENoYW5uZWxNYXAgPSBEZWZhdWx0U3VwcG9ydGVkQ2hhbm5lbE1hcH0gc3VwcG9ydGVkQ2hhbm5lbE1hcFxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm4gb25lIHJlYXNvbiB3aHkgdGhlIGVuY29kaW5nIGlzIGludmFsaWQsXG4gKiAgICAgICAgICAgICAgICAgIG9yIG51bGwgaWYgdGhlIGVuY29kaW5nIGlzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5jb2RpbmdNYXBwaW5nRXJyb3Ioc3BlYzogRXh0ZW5kZWRVbml0U3BlYyxcbiAgcmVxdWlyZWRDaGFubmVsTWFwOiBSZXF1aXJlZENoYW5uZWxNYXAgPSBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQLFxuICBzdXBwb3J0ZWRDaGFubmVsTWFwOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0gREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFXG4gICkge1xuICBsZXQgbWFyayA9IHNwZWMubWFyaztcbiAgbGV0IGVuY29kaW5nID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IHJlcXVpcmVkQ2hhbm5lbHMgPSByZXF1aXJlZENoYW5uZWxNYXBbbWFya107XG4gIGxldCBzdXBwb3J0ZWRDaGFubmVscyA9IHN1cHBvcnRlZENoYW5uZWxNYXBbbWFya107XG5cbiAgZm9yIChsZXQgaSBpbiByZXF1aXJlZENoYW5uZWxzKSB7IC8vIGFsbCByZXF1aXJlZCBjaGFubmVscyBhcmUgaW4gZW5jb2RpbmdgXG4gICAgaWYgKCEocmVxdWlyZWRDaGFubmVsc1tpXSBpbiBlbmNvZGluZykpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBlbmNvZGluZyBjaGFubmVsIFxcXCInICsgcmVxdWlyZWRDaGFubmVsc1tpXSArXG4gICAgICAgICdcXFwiIGZvciBtYXJrIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBjaGFubmVsIGluIGVuY29kaW5nKSB7IC8vIGFsbCBjaGFubmVscyBpbiBlbmNvZGluZyBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKCFzdXBwb3J0ZWRDaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgcmV0dXJuICdFbmNvZGluZyBjaGFubmVsIFxcXCInICsgY2hhbm5lbCArXG4gICAgICAgICdcXFwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbWFyayB0eXBlIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBpZiAobWFyayA9PT0gQkFSICYmICFlbmNvZGluZy54ICYmICFlbmNvZGluZy55KSB7XG4gICAgcmV0dXJuICdNaXNzaW5nIGJvdGggeCBhbmQgeSBmb3IgYmFyJztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuL3NjYWxlJztcblxuZXhwb3J0IGludGVyZmFjZSBWZ0RhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgdmFsdWVzPzogYW55O1xuICBmb3JtYXQ/OiBhbnk7XG4gIHVybD86IGFueTtcbiAgdHJhbnNmb3JtPzogYW55O1xufVxuXG50eXBlIFZnUGFyZW50UmVmID0ge1xuICBwYXJlbnQ6IHN0cmluZ1xufTtcblxudHlwZSBWZ0ZpZWxkUmVmID0gc3RyaW5nIHwgVmdQYXJlbnRSZWYgfCBWZ1BhcmVudFJlZltdO1xuXG5leHBvcnQgdHlwZSBWZ0RhdGFSZWYgPSB7XG4gIGRhdGE6IHN0cmluZyxcbiAgZmllbGQ6IFZnRmllbGRSZWYsXG4gIHNvcnQ6IGJvb2xlYW4gfCB7XG4gICAgZmllbGQ6IFZnRmllbGRSZWYsXG4gICAgb3A6IHN0cmluZ1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBWZ1ZhbHVlUmVmID0ge1xuICB2YWx1ZT86IGFueSxcbiAgZmllbGQ/OiBzdHJpbmcgfCB7XG4gICAgZGF0dW0/OiBzdHJpbmcsXG4gICAgZ3JvdXA/OiBzdHJpbmcsXG4gICAgcGFyZW50Pzogc3RyaW5nXG4gIH0sXG4gIHRlbXBsYXRlPzogc3RyaW5nLFxuICBzY2FsZT86IHN0cmluZywgLy8gVE9ETzogb2JqZWN0XG4gIG11bHQ/OiBudW1iZXIsXG4gIG9mZnNldD86IG51bWJlcixcbiAgYmFuZD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVW5pb25lZERvbWFpbiA9IHtcbiAgZmllbGRzOiBWZ0RhdGFSZWZbXVxufTtcblxuZXhwb3J0IHR5cGUgVmdTY2FsZSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICB0eXBlOiBTY2FsZVR5cGUsXG4gIGRvbWFpbj86IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZixcbiAgZG9tYWluTWluPzogYW55LFxuICBkb21haW5NYXg/OiBhbnlcbiAgcmFuZ2U/OiBhbnlbXSB8IFZnRGF0YVJlZiB8IHN0cmluZyxcbiAgcmFuZ2VNaW4/OiBhbnksXG4gIHJhbmdlTWF4PzogYW55LFxuXG4gIGJhbmRTaXplPzogbnVtYmVyLFxuICBjbGFtcD86IGJvb2xlYW4sXG4gIGV4cG9uZW50PzogbnVtYmVyLFxuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBwb2ludHM/OiBib29sZWFuLFxuICByZXZlcnNlPzogYm9vbGVhbixcbiAgcm91bmQ/OiBib29sZWFuLFxuICB6ZXJvPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmlvbmVkRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFVuaW9uZWREb21haW4ge1xuICBpZiAoIWlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiAnZmllbGRzJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhUmVmRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFZnRGF0YVJlZiB7XG4gIGlmICghaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuICdkYXRhJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUT0RPOiBkZWNsYXJlXG5leHBvcnQgdHlwZSBWZ01hcmtHcm91cCA9IGFueTtcbmV4cG9ydCB0eXBlIFZnQXhpcyA9IGFueTtcbmV4cG9ydCB0eXBlIFZnTGVnZW5kID0gYW55O1xuZXhwb3J0IHR5cGUgVmdUcmFuc2Zvcm0gPSBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmdTdGFja1RyYW5zZm9ybSB7XG4gIHR5cGU6IHN0cmluZztcbiAgb2Zmc2V0PzogYW55O1xuICBncm91cGJ5OiBhbnk7XG4gIGZpZWxkOiBhbnk7XG4gIHNvcnRieTogYW55O1xuICBvdXRwdXQ6IGFueTtcbn1cbiIsImV4cG9ydCBpbXBvcnQgYXhpcyA9IHJlcXVpcmUoJy4vYXhpcycpO1xuZXhwb3J0IGltcG9ydCBhZ2dyZWdhdGUgPSByZXF1aXJlKCcuL2FnZ3JlZ2F0ZScpO1xuZXhwb3J0IGltcG9ydCBiaW4gPSByZXF1aXJlKCcuL2JpbicpO1xuZXhwb3J0IGltcG9ydCBjaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsJyk7XG5leHBvcnQgY29uc3QgY29tcGlsZSA9IHJlcXVpcmUoJy4vY29tcGlsZS9jb21waWxlJykuY29tcGlsZTtcbmV4cG9ydCBpbXBvcnQgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmV4cG9ydCBpbXBvcnQgZGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpO1xuZXhwb3J0IGltcG9ydCBlbmNvZGluZyA9IHJlcXVpcmUoJy4vZW5jb2RpbmcnKTtcbmV4cG9ydCBpbXBvcnQgZmFjZXQgPSByZXF1aXJlKCcuL2ZhY2V0Jyk7XG5leHBvcnQgaW1wb3J0IGZpZWxkRGVmID0gcmVxdWlyZSgnLi9maWVsZERlZicpO1xuZXhwb3J0IGltcG9ydCBsZWdlbmQgPSByZXF1aXJlKCcuL2xlZ2VuZCcpO1xuZXhwb3J0IGltcG9ydCBtYXJrID0gcmVxdWlyZSgnLi9tYXJrJyk7XG5leHBvcnQgaW1wb3J0IHNjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpO1xuZXhwb3J0IGltcG9ydCBzaG9ydGhhbmQgPSByZXF1aXJlKCcuL3Nob3J0aGFuZCcpO1xuZXhwb3J0IGltcG9ydCBzb3J0ID0gcmVxdWlyZSgnLi9zb3J0Jyk7XG5leHBvcnQgaW1wb3J0IHNwZWMgPSByZXF1aXJlKCcuL3NwZWMnKTtcbmV4cG9ydCBpbXBvcnQgc3RhY2sgPSByZXF1aXJlKCcuL3N0YWNrJyk7XG5leHBvcnQgaW1wb3J0IHRpbWVVbml0ID0gcmVxdWlyZSgnLi90aW1lVW5pdCcpO1xuZXhwb3J0IGltcG9ydCB0cmFuc2Zvcm0gPSByZXF1aXJlKCcuL3RyYW5zZm9ybScpO1xuZXhwb3J0IGltcG9ydCB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG5leHBvcnQgaW1wb3J0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmV4cG9ydCBpbXBvcnQgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJ19fVkVSU0lPTl9fJztcbiJdfQ==
