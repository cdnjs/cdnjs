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
exports.CHANNELS = [exports.X, exports.Y, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.PATH, exports.ORDER, exports.TEXT, exports.DETAIL, exports.LABEL];
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
function hasScale(channel) {
    return !util_1.contains([exports.DETAIL, exports.PATH, exports.TEXT, exports.LABEL, exports.ORDER], channel);
}
exports.hasScale = hasScale;

},{"./util":46}],10:[function(require,module,exports){
var config_schema_1 = require('../schema/config.schema');
var channel_1 = require('../channel');
var data_1 = require('../data');
var vlFieldDef = require('../fielddef');
var vlEncoding = require('../encoding');
var mark_1 = require('../mark');
var type_1 = require('../type');
var util_1 = require('../util');
var config_1 = require('./config');
var stack_1 = require('./stack');
var scale_1 = require('./scale');
var enums_1 = require('../enums');
var aggregate_1 = require('../aggregate');
;
var Model = (function () {
    function Model(spec) {
        var model = this;
        this._spec = spec;
        var mark = this._spec.mark;
        var encoding = this._spec.encoding = this._spec.encoding || {};
        var config = this._config = util_1.mergeDeep(util_1.duplicate(config_schema_1.defaultConfig), spec.config);
        vlEncoding.forEach(this._spec.encoding, function (fieldDef, channel) {
            if (!channel_1.supportMark(channel, this._spec.mark)) {
                console.warn(channel, 'dropped as it is incompatible with', this._spec.mark);
                delete this._spec.encoding[channel].field;
            }
            if (fieldDef.type) {
                fieldDef.type = type_1.getFullName(fieldDef.type);
            }
            if ((channel === channel_1.PATH || channel === channel_1.ORDER) && !fieldDef.aggregate && fieldDef.type === type_1.QUANTITATIVE) {
                fieldDef.aggregate = aggregate_1.AggregateOp.MIN;
            }
        }, this);
        var scale = this._scale = [channel_1.X, channel_1.Y, channel_1.COLOR, channel_1.SHAPE, channel_1.SIZE, channel_1.ROW, channel_1.COLUMN].reduce(function (_scale, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var channelScale = encoding[channel].scale || {};
                var channelDef = encoding[channel];
                var _scaleType = scale_1.scaleType(channelScale, channelDef, channel, mark);
                if (util_1.contains([channel_1.ROW, channel_1.COLUMN], channel)) {
                    _scale[channel] = util_1.extend({
                        type: _scaleType,
                        round: config.facet.scale.round,
                        padding: (channel === channel_1.ROW && model.has(channel_1.Y)) || (channel === channel_1.COLUMN && model.has(channel_1.X)) ?
                            config.facet.scale.padding : 0
                    }, channelScale);
                }
                else {
                    _scale[channel] = util_1.extend({
                        type: _scaleType,
                        round: config.scale.round,
                        padding: config.scale.padding,
                        useRawDomain: config.scale.useRawDomain,
                        bandSize: channel === channel_1.X && _scaleType === enums_1.ScaleType.ORDINAL && mark === mark_1.TEXT ?
                            config.scale.textBandWidth : config.scale.bandSize
                    }, channelScale);
                }
            }
            return _scale;
        }, {});
        this._axis = [channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN].reduce(function (_axis, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var channelAxis = encoding[channel].axis;
                if (channelAxis !== false) {
                    _axis[channel] = util_1.extend({}, channel === channel_1.X || channel === channel_1.Y ? config.axis : config.facet.axis, channelAxis === true ? {} : channelAxis || {});
                }
            }
            return _axis;
        }, {});
        this._legend = [channel_1.COLOR, channel_1.SHAPE, channel_1.SIZE].reduce(function (_legend, channel) {
            if (vlEncoding.has(encoding, channel)) {
                var channelLegend = encoding[channel].legend;
                if (channelLegend !== false) {
                    _legend[channel] = util_1.extend({}, config.legend, channelLegend === true ? {} : channelLegend || {});
                }
            }
            return _legend;
        }, {});
        this._stack = stack_1.compileStackProperties(mark, encoding, scale, config);
        this._config.mark = config_1.compileMarkConfig(mark, encoding, config, this._stack);
    }
    Model.prototype.stack = function () {
        return this._stack;
    };
    Model.prototype.toSpec = function (excludeConfig, excludeData) {
        var encoding = util_1.duplicate(this._spec.encoding);
        var spec;
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
        return spec;
    };
    Model.prototype.cellWidth = function () {
        return (this.isFacet() ? this.config().facet.cell.width : null) ||
            this.config().cell.width;
    };
    Model.prototype.cellHeight = function () {
        return (this.isFacet() ? this.config().facet.cell.height : null) ||
            this.config().cell.height;
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
    Model.prototype.encoding = function () {
        return this._spec.encoding;
    };
    Model.prototype.fieldDef = function (channel) {
        return this._spec.encoding[channel] || {};
    };
    Model.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        var scale = this.scale(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: scale_1.scaleType(scale, fieldDef, channel, this.mark()) === enums_1.ScaleType.ORDINAL ? '_range' : '_start'
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
        var scale = this.scale(channel);
        return this.has(channel) && scale_1.scaleType(scale, fieldDef, channel, this.mark()) === enums_1.ScaleType.ORDINAL;
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
        return this._spec.transform || {};
    };
    Model.prototype.config = function () {
        return this._config;
    };
    Model.prototype.sort = function (channel) {
        return this._spec.encoding[channel].sort;
    };
    Model.prototype.scale = function (channel) {
        return this._scale[channel];
    };
    Model.prototype.axis = function (channel) {
        return this._axis[channel];
    };
    Model.prototype.legend = function (channel) {
        return this._legend[channel];
    };
    Model.prototype.scaleName = function (channel) {
        var name = this.spec().name;
        return (name ? name + '-' : '') + channel;
    };
    Model.prototype.sizeValue = function (channel) {
        if (channel === void 0) { channel = channel_1.SIZE; }
        var fieldDef = this.fieldDef(channel_1.SIZE);
        if (fieldDef && fieldDef.value !== undefined) {
            return fieldDef.value;
        }
        var scaleConfig = this.config().scale;
        switch (this.mark()) {
            case mark_1.TEXT:
                return this.config().mark.fontSize;
            case mark_1.BAR:
                if (this.config().mark.barSize) {
                    return this.config().mark.barSize;
                }
                return this.isOrdinalScale(channel) ?
                    this.scale(channel).bandSize - 1 :
                    !this.has(channel) ?
                        scaleConfig.bandSize - 1 :
                        this.config().mark.barThinSize;
            case mark_1.TICK:
                if (this.config().mark.tickSize) {
                    return this.config().mark.tickSize;
                }
                var bandSize = this.has(channel) ?
                    this.scale(channel).bandSize :
                    scaleConfig.bandSize;
                return bandSize / 1.5;
        }
        return this.config().mark.size;
    };
    return Model;
})();
exports.Model = Model;

},{"../aggregate":7,"../channel":9,"../data":29,"../encoding":30,"../enums":31,"../fielddef":32,"../mark":33,"../schema/config.schema":38,"../type":45,"../util":46,"./config":13,"./scale":25,"./stack":26}],11:[function(require,module,exports){
var util_1 = require('../util');
var type_1 = require('../type');
var channel_1 = require('../channel');
var enums_1 = require('../enums');
var util_2 = require('./util');
function compileInnerAxis(channel, model) {
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
    return def;
}
exports.compileInnerAxis = compileInnerAxis;
function compileAxis(channel, model) {
    var isCol = channel === channel_1.COLUMN, isRow = channel === channel_1.ROW, type = isCol ? 'x' : isRow ? 'y' : channel;
    var axis = model.axis(channel);
    var def = {
        type: type,
        scale: model.scaleName(channel)
    };
    util_1.extend(def, util_2.formatMixins(model, channel, model.axis(channel).format));
    [
        'grid', 'layer', 'offset', 'orient', 'tickSize', 'ticks', 'title',
        'tickPadding', 'tickSize', 'tickSizeMajor', 'tickSizeMinor', 'tickSizeEnd',
        'titleOffset', 'values', 'subdivide'
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
        if (value !== undefined) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.compileAxis = compileAxis;
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
    return gridShow(model, channel) && ((channel === channel_1.Y || channel === channel_1.X) && !(model.has(channel_1.COLUMN) || model.has(channel_1.ROW)));
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
        return enums_1.AxisOrient.TOP;
    }
    else if (channel === channel_1.ROW) {
        if (model.has(channel_1.Y) && model.axis(channel_1.Y).orient !== enums_1.AxisOrient.RIGHT) {
            return enums_1.AxisOrient.RIGHT;
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
    return undefined;
}
exports.tickSize = tickSize;
function title(model, channel) {
    var axis = model.axis(channel);
    if (axis.title !== undefined) {
        return axis.title;
    }
    var fieldTitle = model.fieldTitle(channel);
    var maxLength;
    if (axis.titleMaxLength) {
        maxLength = axis.titleMaxLength;
    }
    else if (channel === channel_1.X && !model.isOrdinalScale(channel_1.X)) {
        maxLength = model.cellWidth() / model.axis(channel_1.X).characterWidth;
    }
    else if (channel === channel_1.Y && !model.isOrdinalScale(channel_1.Y)) {
        maxLength = model.cellHeight() / model.axis(channel_1.Y).characterWidth;
    }
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
var properties;
(function (properties) {
    function axis(model, channel, axisPropsSpec, def) {
        var axis = model.axis(channel);
        return util_1.extend(axis.axisWidth !== undefined ?
            { strokeWidth: { value: axis.axisWidth } } :
            {}, axisPropsSpec || {});
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
        if (axis.labelAngle !== undefined) {
            labelsSpec.angle = { value: axis.labelAngle };
        }
        else {
            if (channel === channel_1.X && (model.isDimension(channel_1.X) || fieldDef.type === type_1.TEMPORAL)) {
                labelsSpec.angle = { value: 270 };
            }
            else if (channel === channel_1.ROW && model.has(channel_1.X)) {
                labelsSpec.angle = { value: def.orient === 'left' ? 270 : 90 };
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
        return labelsSpec || undefined;
    }
    properties.labels = labels;
})(properties = exports.properties || (exports.properties = {}));

},{"../channel":9,"../enums":31,"../type":45,"../util":46,"./util":28}],12:[function(require,module,exports){
var Model_1 = require('./Model');
var axis_1 = require('./axis');
var data_1 = require('./data');
var layout_1 = require('./layout');
var facet_1 = require('./facet');
var legend_1 = require('./legend');
var mark_1 = require('./mark');
var scale_1 = require('./scale');
var util_1 = require('./util');
var util_2 = require('../util');
var data_2 = require('../data');
var channel_1 = require('../channel');
var Model_2 = require('./Model');
exports.Model = Model_2.Model;
function compile(spec) {
    var model = new Model_1.Model(spec);
    var config = model.config();
    var output = util_2.extend(spec.name ? { name: spec.name } : {}, {
        width: 1,
        height: 1,
        padding: 'auto'
    }, config.viewport ? { viewport: config.viewport } : {}, config.background ? { background: config.background } : {}, {
        data: data_1.compileData(model).concat([layout_1.compileLayoutData(model)]),
        marks: [compileRootGroup(model)]
    });
    return {
        spec: output
    };
}
exports.compile = compile;
function compileRootGroup(model) {
    var spec = model.spec();
    var rootGroup = util_2.extend({
        name: spec.name ? spec.name + '-root' : 'root',
        type: 'group',
    }, spec.description ? { description: spec.description } : {}, {
        from: { data: data_2.LAYOUT },
        properties: {
            update: {
                width: { field: 'width' },
                height: { field: 'height' }
            }
        }
    });
    var marks = mark_1.compileMark(model);
    if (model.has(channel_1.ROW) || model.has(channel_1.COLUMN)) {
        util_2.extend(rootGroup, facet_1.facetMixins(model, marks));
    }
    else {
        util_1.applyConfig(rootGroup.properties.update, model.config().cell, util_1.FILL_STROKE_CONFIG.concat(['clip']));
        rootGroup.marks = marks;
        rootGroup.scales = scale_1.compileScales(model.channels(), model);
        var axes = (model.has(channel_1.X) && model.axis(channel_1.X) ? [axis_1.compileAxis(channel_1.X, model)] : [])
            .concat(model.has(channel_1.Y) && model.axis(channel_1.Y) ? [axis_1.compileAxis(channel_1.Y, model)] : []);
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

},{"../channel":9,"../data":29,"../util":46,"./Model":10,"./axis":11,"./data":14,"./facet":15,"./layout":16,"./legend":17,"./mark":24,"./scale":25,"./util":28}],13:[function(require,module,exports){
var channel_1 = require('../channel');
var encoding_1 = require('../encoding');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var util_1 = require('../util');
function compileMarkConfig(mark, encoding, config, stack) {
    return util_1.extend(['filled', 'opacity', 'orient', 'align'].reduce(function (cfg, property) {
        var value = config.mark[property];
        switch (property) {
            case 'filled':
                if (value === undefined) {
                    cfg[property] = mark !== mark_1.POINT && mark !== mark_1.LINE;
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
                if (stack) {
                    cfg[property] = stack.groupbyChannel === channel_1.Y ? 'horizontal' : undefined;
                }
                if (value === undefined) {
                    cfg[property] = fielddef_1.isMeasure(encoding[channel_1.X]) && !fielddef_1.isMeasure(encoding[channel_1.Y]) ?
                        'horizontal' :
                        undefined;
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
exports.compileMarkConfig = compileMarkConfig;

},{"../channel":9,"../encoding":30,"../fielddef":32,"../mark":33,"../util":46}],14:[function(require,module,exports){
var vlFieldDef = require('../fielddef');
var util_1 = require('../util');
var enums_1 = require('../enums');
var bin_1 = require('../bin');
var channel_1 = require('../channel');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var type_1 = require('../type');
var scale_1 = require('./scale');
var time_1 = require('./time');
var aggregate_1 = require('../aggregate');
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
    rankTransform(def[def.length - 1], model);
    filterNonPositiveForLog(def[def.length - 1], model);
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
        var data = model.data();
        if (data) {
            if (data.values && data.values.length > 0) {
                source.values = model.data().values;
                source.format = { type: 'json' };
            }
            else if (data.url) {
                source.url = data.url;
                var defaultExtension = /(?:\.([^.]+))?$/.exec(source.url)[1];
                if (!util_1.contains(['json', 'csv', 'tsv'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                source.format = { type: model.data().formatType || defaultExtension };
            }
        }
        var parse = formatParse(model);
        if (parse) {
            source.format = source.format || {};
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
            var scale = model.scale(channel);
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
                if (scale_1.scaleType(scale, fieldDef, channel, model.mark()) === enums_1.ScaleType.ORDINAL || channel === channel_1.COLOR) {
                    transform.push({
                        type: 'formula',
                        field: fielddef_1.field(fieldDef, { binSuffix: '_range' }),
                        expr: fielddef_1.field(fieldDef, { datum: true, binSuffix: '_start' }) +
                            ' + \'-\' + ' +
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
var summary;
(function (summary) {
    function def(model) {
        var dims = {};
        var meas = {};
        var hasAggregate = false;
        model.forEach(function (fieldDef, channel) {
            if (fieldDef.aggregate) {
                hasAggregate = true;
                if (fieldDef.aggregate === aggregate_1.AggregateOp.COUNT) {
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
                    var scale = model.scale(channel);
                    if (scale_1.scaleType(scale, fieldDef, channel, model.mark()) === enums_1.ScaleType.ORDINAL) {
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
        var groupbyChannel = stackProps.groupbyChannel, fieldChannel = stackProps.fieldChannel, facetFields = (model.has(channel_1.COLUMN) ? [model.field(channel_1.COLUMN)] : [])
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
function rankTransform(dataTable, model) {
    if (model.has(channel_1.COLOR) && model.fieldDef(channel_1.COLOR).type === type_1.ORDINAL) {
        dataTable.transform = dataTable.transform.concat([{
                type: 'sort',
                by: model.field(channel_1.COLOR)
            }, {
                type: 'rank',
                field: model.field(channel_1.COLOR),
                output: {
                    rank: model.field(channel_1.COLOR, { prefn: 'rank_' })
                }
            }]);
    }
}
exports.rankTransform = rankTransform;
function filterNonPositiveForLog(dataTable, model) {
    model.forEach(function (_, channel) {
        var scale = model.scale(channel);
        if (scale && scale.type === enums_1.ScaleType.LOG) {
            dataTable.transform.push({
                type: 'filter',
                test: model.field(channel, { datum: true }) + ' > 0'
            });
        }
    });
}
exports.filterNonPositiveForLog = filterNonPositiveForLog;

},{"../aggregate":7,"../bin":8,"../channel":9,"../data":29,"../enums":31,"../fielddef":32,"../type":45,"../util":46,"./scale":25,"./time":27}],15:[function(require,module,exports){
var util = require('../util');
var util_1 = require('../util');
var channel_1 = require('../channel');
var axis_1 = require('./axis');
var scale_1 = require('./scale');
var util_2 = require('./util');
function facetMixins(model, marks) {
    var hasRow = model.has(channel_1.ROW), hasCol = model.has(channel_1.COLUMN);
    if (model.has(channel_1.ROW) && !model.isDimension(channel_1.ROW)) {
        util.error('Row encoding should be ordinal.');
    }
    if (model.has(channel_1.COLUMN) && !model.isDimension(channel_1.COLUMN)) {
        util.error('Col encoding should be ordinal.');
    }
    return {
        marks: [].concat(getFacetGuideGroups(model), [getFacetGroup(model, marks)]),
        scales: scale_1.compileScales(model.channels(), model),
        axes: [].concat(hasRow && model.axis(channel_1.ROW) ? [axis_1.compileAxis(channel_1.ROW, model)] : [], hasCol && model.axis(channel_1.COLUMN) ? [axis_1.compileAxis(channel_1.COLUMN, model)] : [])
    };
}
exports.facetMixins = facetMixins;
function getCellAxes(model) {
    var cellAxes = [];
    if (model.has(channel_1.X) && model.axis(channel_1.X) && axis_1.gridShow(model, channel_1.X)) {
        cellAxes.push(axis_1.compileInnerAxis(channel_1.X, model));
    }
    if (model.has(channel_1.Y) && model.axis(channel_1.Y) && axis_1.gridShow(model, channel_1.Y)) {
        cellAxes.push(axis_1.compileInnerAxis(channel_1.Y, model));
    }
    return cellAxes;
}
function getFacetGroup(model, marks) {
    var name = model.spec().name;
    var facetGroup = {
        name: (name ? name + '-' : '') + 'cell',
        type: 'group',
        from: {
            data: model.dataTable(),
            transform: [{
                    type: 'facet',
                    groupby: [].concat(model.has(channel_1.ROW) ? [model.field(channel_1.ROW)] : [], model.has(channel_1.COLUMN) ? [model.field(channel_1.COLUMN)] : [])
                }]
        },
        properties: {
            update: getFacetGroupProperties(model)
        },
        marks: marks
    };
    var cellAxes = getCellAxes(model);
    if (cellAxes.length > 0) {
        facetGroup.axes = cellAxes;
    }
    return facetGroup;
}
function getFacetGroupProperties(model) {
    var facetGroupProperties = {
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
        width: { field: { parent: 'cellWidth' } },
        height: { field: { parent: 'cellHeight' } }
    };
    util_2.applyConfig(facetGroupProperties, model.config().cell, util_2.FILL_STROKE_CONFIG.concat(['clip']));
    util_2.applyConfig(facetGroupProperties, model.config().facet.cell, util_2.FILL_STROKE_CONFIG.concat(['clip']));
    return facetGroupProperties;
}
function getFacetGuideGroups(model) {
    var rootAxesGroups = [];
    if (model.has(channel_1.X)) {
        if (model.axis(channel_1.X)) {
            rootAxesGroups.push(getXAxesGroup(model));
        }
    }
    else {
        if (model.has(channel_1.ROW)) {
            rootAxesGroups.push.apply(rootAxesGroups, getRowGridGroups(model));
        }
    }
    if (model.has(channel_1.Y)) {
        if (model.axis(channel_1.Y)) {
            rootAxesGroups.push(getYAxesGroup(model));
        }
    }
    else {
        if (model.has(channel_1.COLUMN)) {
            rootAxesGroups.push.apply(rootAxesGroups, getColumnGridGroups(model));
        }
    }
    return rootAxesGroups;
}
function getXAxesGroup(model) {
    var hasCol = model.has(channel_1.COLUMN);
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
                width: { field: { parent: 'cellWidth' } },
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
        }
    }, model.axis(channel_1.X) ? {
        axes: [axis_1.compileAxis(channel_1.X, model)]
    } : {});
}
function getYAxesGroup(model) {
    var hasRow = model.has(channel_1.ROW);
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
                width: {
                    field: { group: 'width' }
                },
                height: { field: { parent: 'cellHeight' } },
                y: hasRow ? {
                    scale: model.scaleName(channel_1.ROW),
                    field: model.field(channel_1.ROW),
                    offset: model.scale(channel_1.ROW).padding / 2
                } : {
                    value: model.config().facet.scale.padding / 2
                }
            }
        },
    }, model.axis(channel_1.Y) ? {
        axes: [axis_1.compileAxis(channel_1.Y, model)]
    } : {});
}
function getRowGridGroups(model) {
    var name = model.spec().name;
    var facetGridConfig = model.config().facet.grid;
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
                x: { value: 0, offset: -facetGridConfig.offset },
                x2: { field: { group: 'width' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [rowGrid, {
            name: (name ? name + '-' : '') + 'row-grid-end',
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
    var name = model.spec().name;
    var facetGridConfig = model.config().facet.grid;
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
                y: { value: 0, offset: -facetGridConfig.offset },
                y2: { field: { group: 'height' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [columnGrid, {
            name: (name ? name + '-' : '') + 'column-grid-end',
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

},{"../channel":9,"../util":46,"./axis":11,"./scale":25,"./util":28}],16:[function(require,module,exports){
var channel_1 = require('../channel');
var data_1 = require('../data');
var mark_1 = require('../mark');
var time_1 = require('./time');
function compileLayoutData(model) {
    var distinctSummary = [channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN].reduce(function (summary, channel) {
        if (model.has(channel) && model.isOrdinalScale(channel)) {
            var scale = model.scale(channel);
            if (!(scale.domain instanceof Array)) {
                summary.push({
                    field: model.field(channel),
                    ops: ['distinct']
                });
            }
        }
        return summary;
    }, []);
    var cellWidthFormula = scaleWidthFormula(model, channel_1.X, model.cellWidth());
    var cellHeightFormula = scaleWidthFormula(model, channel_1.Y, model.cellHeight());
    var isFacet = model.has(channel_1.COLUMN) || model.has(channel_1.ROW);
    var formulas = [{
            type: 'formula',
            field: 'cellWidth',
            expr: cellWidthFormula
        }, {
            type: 'formula',
            field: 'cellHeight',
            expr: cellHeightFormula
        }, {
            type: 'formula',
            field: 'width',
            expr: isFacet ?
                facetScaleWidthFormula(model, channel_1.COLUMN, 'datum.cellWidth') :
                cellWidthFormula
        }, {
            type: 'formula',
            field: 'height',
            expr: isFacet ?
                facetScaleWidthFormula(model, channel_1.ROW, 'datum.cellHeight') :
                cellHeightFormula
        }];
    return distinctSummary.length > 0 ? {
        name: data_1.LAYOUT,
        source: model.dataTable(),
        transform: [].concat([{
                type: 'aggregate',
                summarize: distinctSummary
            }], formulas)
    } : {
        name: data_1.LAYOUT,
        values: [{}],
        transform: formulas
    };
}
exports.compileLayoutData = compileLayoutData;
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
function scaleWidthFormula(model, channel, nonOrdinalSize) {
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
function facetScaleWidthFormula(model, channel, innerWidth) {
    var scale = model.scale(channel);
    if (model.has(channel)) {
        var cardinality = scale.domain instanceof Array ? scale.domain.length :
            model.field(channel, { datum: true, prefn: 'distinct_' });
        return '(' + innerWidth + ' + ' + scale.padding + ')' + ' * ' + cardinality;
    }
    else {
        return innerWidth + ' + ' + model.config().facet.scale.padding;
    }
}

},{"../channel":9,"../data":29,"../mark":33,"./time":27}],17:[function(require,module,exports){
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var util_1 = require('../util');
var util_2 = require('./util');
var type_1 = require('../type');
var scale_1 = require('./scale');
function compileLegends(model) {
    var defs = [];
    if (model.has(channel_1.COLOR) && model.legend(channel_1.COLOR)) {
        var fieldDef = model.fieldDef(channel_1.COLOR);
        var scale = useColorLegendScale(fieldDef) ?
            scale_1.COLOR_LEGEND :
            model.scaleName(channel_1.COLOR);
        defs.push(compileLegend(model, channel_1.COLOR, model.config().mark.filled ? { fill: scale } : { stroke: scale }));
    }
    if (model.has(channel_1.SIZE) && model.legend(channel_1.SIZE)) {
        defs.push(compileLegend(model, channel_1.SIZE, {
            size: model.scaleName(channel_1.SIZE)
        }));
    }
    if (model.has(channel_1.SHAPE) && model.legend(channel_1.SHAPE)) {
        defs.push(compileLegend(model, channel_1.SHAPE, {
            shape: model.scaleName(channel_1.SHAPE)
        }));
    }
    return defs;
}
exports.compileLegends = compileLegends;
function compileLegend(model, channel, def) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    def.title = title(legend, fieldDef);
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
        if (value !== undefined) {
            def.properties = def.properties || {};
            def.properties[group] = value;
        }
    });
    return def;
}
exports.compileLegend = compileLegend;
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
    return util_2.formatMixins(model, channel, typeof legend !== 'boolean' ? legend.format : undefined);
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
        util_2.applyMarkConfig(symbols, model, util_1.without(util_2.FILL_STROKE_CONFIG, [filled ? 'fill' : 'stroke']));
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
        symbols = util_1.extend(symbols, symbolsSpec || {});
        return util_1.keys(symbols).length > 0 ? symbols : undefined;
    }
    properties.symbols = symbols;
    function labels(fieldDef, symbolsSpec, model, channel) {
        if (channel === channel_1.COLOR) {
            if (fieldDef.type === type_1.ORDINAL) {
                return {
                    text: {
                        scale: scale_1.COLOR_LEGEND,
                        field: 'data'
                    }
                };
            }
            else if (fieldDef.bin) {
                return {
                    text: {
                        scale: scale_1.COLOR_LEGEND_LABEL,
                        field: 'data'
                    }
                };
            }
            else if (fieldDef.timeUnit) {
                return {
                    text: {
                        template: '{{ datum.data | time:\'' + util_2.timeFormat(model, channel) + '\'}}'
                    }
                };
            }
        }
        return undefined;
    }
    properties.labels = labels;
})(properties || (properties = {}));

},{"../channel":9,"../fielddef":32,"../mark":33,"../type":45,"../util":46,"./scale":25,"./util":28}],18:[function(require,module,exports){
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
        util_1.applyColorAndOpacity(p, model);
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
            p.x = { value: model.config().scale.bandSize / 2 };
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
        else if (model.fieldDef(channel_1.SHAPE).value) {
            p.shape = { value: model.fieldDef(channel_1.SHAPE).value };
        }
        else if (model.config().mark.shape) {
            p.shape = { value: model.config().mark.shape };
        }
        util_1.applyColorAndOpacity(p, model);
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
            fill: {
                scale: model.scaleName(channel_1.COLOR),
                field: model.field(channel_1.COLOR, model.fieldDef(channel_1.COLOR).type === type_1.ORDINAL ? { prefn: 'rank_' } : {})
            }
        };
    }
    text.background = background;
    function properties(model) {
        var p = {};
        util_1.applyMarkConfig(p, model, ['angle', 'align', 'baseline', 'dx', 'dy', 'font', 'fontWeight',
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
        else if (fieldDef.value) {
            p.text = { value: fieldDef.value };
        }
        return p;
    }
    text.properties = properties;
})(text = exports.text || (exports.text = {}));

},{"../channel":9,"../type":45,"../util":46,"./util":28}],23:[function(require,module,exports){
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
            p.width = { value: model.config().mark.tickThickness };
            p.height = model.has(channel_1.SIZE) ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: model.sizeValue(channel_1.Y)
            };
        }
        else {
            p.width = model.has(channel_1.SIZE) ? {
                scale: model.scaleName(channel_1.SIZE),
                field: model.field(channel_1.SIZE)
            } : {
                value: model.sizeValue(channel_1.X)
            };
            p.height = { value: model.config().mark.tickThickness };
        }
        util_1.applyColorAndOpacity(p, model);
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
var util_2 = require('./util');
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
    if (util_1.contains([mark_1.LINE, mark_1.AREA], model.mark())) {
        return compilePathMark(model);
    }
    else {
        return compileNonPathMark(model);
    }
}
exports.compileMark = compileMark;
function compilePathMark(model) {
    var mark = model.mark();
    var name = model.spec().name;
    var hasParentData = model.has(channel_1.ROW) || model.has(channel_1.COLUMN);
    var dataFrom = { data: model.dataTable() };
    var details = detailFields(model);
    var pathMarks = [util_1.extend(name ? { name: name + '-marks' } : {}, {
            type: markCompiler[mark].markType(),
            from: util_1.extend(hasParentData || details.length > 0 ? {} : dataFrom, { transform: [{ type: 'sort', by: sortPathBy(model) }] }),
            properties: { update: markCompiler[mark].properties(model) }
        })];
    if (details.length > 0) {
        var facetTransform = { type: 'facet', groupby: details };
        var transform = mark === mark_1.AREA && model.stack() ?
            [stack_1.imputeTransform(model), stack_1.stackTransform(model), facetTransform] :
            [].concat(facetTransform, model.has(channel_1.ORDER) ? [{ type: 'sort', by: sortBy(model) }] : []);
        return [{
                name: (name ? name + '-' : '') + mark + '-facet',
                type: 'group',
                from: util_1.extend(hasParentData ? {} : dataFrom, { transform: transform }),
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
function compileNonPathMark(model) {
    var mark = model.mark();
    var name = model.spec().name;
    var hasParentData = model.has(channel_1.ROW) || model.has(channel_1.COLUMN);
    var dataFrom = { data: model.dataTable() };
    var marks = [];
    if (mark === mark_1.TEXT &&
        model.has(channel_1.COLOR) &&
        model.config().mark.applyColorToBackground && !model.has(channel_1.X) && !model.has(channel_1.Y)) {
        marks.push(util_1.extend(name ? { name: name + '-background' } : {}, { type: 'rect' }, hasParentData ? {} : { from: dataFrom }, { properties: { update: mark_text_1.text.background(model) } }));
    }
    marks.push(util_1.extend(name ? { name: name + '-marks' } : {}, { type: markCompiler[mark].markType() }, (!hasParentData || model.stack() || model.has(channel_1.ORDER)) ? {
        from: util_1.extend(hasParentData ? {} : dataFrom, model.stack() ?
            { transform: [stack_1.stackTransform(model)] } :
            model.has(channel_1.ORDER) ?
                { transform: [{ type: 'sort', by: sortBy(model) }] } :
                {})
    } : {}, { properties: { update: markCompiler[mark].properties(model) } }));
    if (model.has(channel_1.LABEL) && markCompiler[mark].labels) {
        var labelProperties = markCompiler[mark].labels(model);
        if (labelProperties !== undefined) {
            marks.push(util_1.extend(name ? { name: name + '-label' } : {}, { type: 'text' }, hasParentData ? {} : { from: dataFrom }, { properties: { update: labelProperties } }));
        }
    }
    return marks;
}
function sortBy(model) {
    if (model.has(channel_1.ORDER)) {
        var channelDef = model.encoding().order;
        if (channelDef instanceof Array) {
            return channelDef.map(util_2.sortField);
        }
        else {
            return util_2.sortField(channelDef);
        }
    }
    return null;
}
function sortPathBy(model) {
    if (model.mark() === mark_1.LINE && model.has(channel_1.PATH)) {
        var channelDef = model.encoding().path;
        if (channelDef instanceof Array) {
            return channelDef.map(util_2.sortField);
        }
        else {
            return util_2.sortField(channelDef);
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

},{"../channel":9,"../mark":33,"../util":46,"./mark-area":18,"./mark-bar":19,"./mark-line":20,"./mark-point":21,"./mark-text":22,"./mark-tick":23,"./stack":26,"./util":28}],25:[function(require,module,exports){
var util_1 = require('../util');
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var data_1 = require('../data');
var type_1 = require('../type');
var mark_1 = require('../mark');
var time_1 = require('./time');
var enums_1 = require('../enums');
var timeunit_1 = require('../timeunit');
var fielddef_1 = require('../fielddef');
exports.COLOR_LEGEND = 'color_legend';
exports.COLOR_LEGEND_LABEL = 'color_legend_label';
function compileScales(channels, model) {
    return channels.filter(channel_1.hasScale)
        .reduce(function (scales, channel) {
        var fieldDef = model.fieldDef(channel);
        if (channel === channel_1.COLOR && model.legend(channel_1.COLOR) && (fieldDef.type === type_1.ORDINAL || fieldDef.bin || fieldDef.timeUnit)) {
            scales.push(colorLegendScale(model, fieldDef));
            if (fieldDef.bin) {
                scales.push(binColorLegendLabel(model, fieldDef));
            }
        }
        scales.push(mainScale(model, fieldDef, channel));
        return scales;
    }, []);
}
exports.compileScales = compileScales;
function mainScale(model, fieldDef, channel) {
    var scale = model.scale(channel);
    var sort = model.sort(channel);
    var scaleDef = {
        name: model.scaleName(channel),
        type: scaleType(scale, fieldDef, channel, model.mark()),
    };
    scaleDef.domain = domain(scale, model, channel, scaleDef.type);
    util_1.extend(scaleDef, rangeMixins(scale, model, channel, scaleDef.type));
    if (sort && (typeof sort === 'string' ? sort : sort.order) === 'descending') {
        scaleDef.reverse = true;
    }
    [
        'round',
        'clamp', 'nice',
        'exponent', 'zero',
        'padding', 'points'
    ].forEach(function (property) {
        var value = exports[property](scale[property], scaleDef.type, channel, fieldDef);
        if (value !== undefined) {
            scaleDef[property] = value;
        }
    });
    return scaleDef;
}
function colorLegendScale(model, fieldDef) {
    return {
        name: exports.COLOR_LEGEND,
        type: 'ordinal',
        domain: {
            data: model.dataTable(),
            field: model.field(channel_1.COLOR, (fieldDef.bin || fieldDef.timeUnit) ? {} : { prefn: 'rank_' }), sort: true
        },
        range: { data: model.dataTable(), field: model.field(channel_1.COLOR), sort: true }
    };
}
function binColorLegendLabel(model, fieldDef) {
    return {
        name: exports.COLOR_LEGEND_LABEL,
        type: 'ordinal',
        domain: {
            data: model.dataTable(),
            field: model.field(channel_1.COLOR, { prefn: 'rank_' }),
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
        return enums_1.ScaleType.ORDINAL;
    }
    if (scale.type !== undefined) {
        return scale.type;
    }
    switch (fieldDef.type) {
        case type_1.NOMINAL:
            return enums_1.ScaleType.ORDINAL;
        case type_1.ORDINAL:
            if (channel === channel_1.COLOR) {
                return enums_1.ScaleType.LINEAR;
            }
            return enums_1.ScaleType.ORDINAL;
        case type_1.TEMPORAL:
            if (channel === channel_1.COLOR) {
                return enums_1.ScaleType.TIME;
            }
            if (fieldDef.timeUnit) {
                switch (fieldDef.timeUnit) {
                    case timeunit_1.TimeUnit.HOURS:
                    case timeunit_1.TimeUnit.DAY:
                    case timeunit_1.TimeUnit.MONTH:
                        return enums_1.ScaleType.ORDINAL;
                    default:
                        return enums_1.ScaleType.TIME;
                }
            }
            return enums_1.ScaleType.TIME;
        case type_1.QUANTITATIVE:
            if (fieldDef.bin) {
                return util_1.contains([channel_1.X, channel_1.Y, channel_1.COLOR], channel) ? enums_1.ScaleType.LINEAR : enums_1.ScaleType.ORDINAL;
            }
            return enums_1.ScaleType.LINEAR;
    }
    return null;
}
exports.scaleType = scaleType;
function domain(scale, model, channel, scaleType) {
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
        if (stack.offset === enums_1.StackOffset.NORMALIZE) {
            return [0, 1];
        }
        return {
            data: data_1.STACKED_SCALE,
            field: model.field(channel, { prefn: 'sum_' })
        };
    }
    var useRawDomain = _useRawDomain(scale, model, channel, scaleType), sort = domainSort(model, channel, scaleType);
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
    if (scaleType !== 'ordinal') {
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
function _useRawDomain(scale, model, channel, scaleType) {
    var fieldDef = model.fieldDef(channel);
    return scale.useRawDomain &&
        fieldDef.aggregate &&
        aggregate_1.SHARED_DOMAIN_OPS.indexOf(fieldDef.aggregate) >= 0 &&
        ((fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) ||
            (fieldDef.type === type_1.TEMPORAL && util_1.contains(['time', 'utc'], scaleType)));
}
function rangeMixins(scale, model, channel, scaleType) {
    var fieldDef = model.fieldDef(channel), scaleConfig = model.config().scale;
    if (scaleType === 'ordinal' && scale.bandSize && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return { bandSize: scale.bandSize };
    }
    if (scale.range && !util_1.contains([channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN], channel)) {
        return { range: scale.range };
    }
    switch (channel) {
        case channel_1.X:
            return {
                rangeMin: 0,
                rangeMax: model.cellWidth()
            };
        case channel_1.Y:
            return {
                rangeMin: model.cellHeight(),
                rangeMax: 0
            };
        case channel_1.SIZE:
            if (model.is(mark_1.BAR)) {
                if (scaleConfig.barSizeRange !== undefined) {
                    return { range: scaleConfig.barSizeRange };
                }
                var dimension = model.config().mark.orient === 'horizontal' ? channel_1.Y : channel_1.X;
                return { range: [model.config().mark.barThinSize, model.scale(dimension).bandSize] };
            }
            else if (model.is(mark_1.TEXT)) {
                return { range: scaleConfig.fontSizeRange };
            }
            if (scaleConfig.pointSizeRange !== undefined) {
                return { range: scaleConfig.pointSizeRange };
            }
            var xIsMeasure = model.isMeasure(channel_1.X);
            var yIsMeasure = model.isMeasure(channel_1.Y);
            var bandSize = xIsMeasure !== yIsMeasure ?
                model.scale(xIsMeasure ? channel_1.Y : channel_1.X).bandSize :
                Math.min(model.scale(channel_1.X).bandSize || scaleConfig.bandSize, model.scale(channel_1.Y).bandSize || scaleConfig.bandSize);
            return { range: [9, (bandSize - 2) * (bandSize - 2)] };
        case channel_1.SHAPE:
            return { range: scaleConfig.shapeRange };
        case channel_1.COLOR:
            if (fieldDef.type === type_1.NOMINAL) {
                return { range: scaleConfig.nominalColorRange };
            }
            return { range: scaleConfig.sequentialColorRange };
        case channel_1.ROW:
            return { range: 'height' };
        case channel_1.COLUMN:
            return { range: 'width' };
    }
    return {};
}
exports.rangeMixins = rangeMixins;
function clamp(prop, scaleType) {
    if (util_1.contains(['linear', 'pow', 'sqrt', 'log', 'time', 'utc'], scaleType)) {
        return prop;
    }
    return undefined;
}
exports.clamp = clamp;
function exponent(prop, scaleType) {
    if (scaleType === 'pow') {
        return prop;
    }
    return undefined;
}
exports.exponent = exponent;
function nice(prop, scaleType, channel, fieldDef) {
    if (util_1.contains(['linear', 'pow', 'sqrt', 'log', 'time', 'utc', 'quantize'], scaleType)) {
        if (prop !== undefined) {
            return prop;
        }
        if (util_1.contains(['time', 'utc'], scaleType)) {
            return time_1.smallestUnit(fieldDef.timeUnit);
        }
        return util_1.contains([channel_1.X, channel_1.Y], channel);
    }
    return undefined;
}
exports.nice = nice;
function padding(prop, scaleType, channel) {
    if (scaleType === 'ordinal' && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return prop;
    }
    return undefined;
}
exports.padding = padding;
function points(__, scaleType, channel) {
    if (scaleType === 'ordinal' && util_1.contains([channel_1.X, channel_1.Y], channel)) {
        return true;
    }
    return undefined;
}
exports.points = points;
function round(prop, scaleType, channel) {
    if (util_1.contains([channel_1.X, channel_1.Y, channel_1.ROW, channel_1.COLUMN, channel_1.SIZE], channel) && prop !== undefined) {
        return prop;
    }
    return undefined;
}
exports.round = round;
function zero(prop, scaleType, channel, fieldDef) {
    if (!util_1.contains(['time', 'utc', 'ordinal'], scaleType)) {
        if (prop !== undefined) {
            return prop;
        }
        return !fieldDef.bin && util_1.contains([channel_1.X, channel_1.Y], channel);
    }
    return undefined;
}
exports.zero = zero;

},{"../aggregate":7,"../channel":9,"../data":29,"../enums":31,"../fielddef":32,"../mark":33,"../timeunit":44,"../type":45,"../util":46,"./time":27}],26:[function(require,module,exports){
var channel_1 = require('../channel');
var enums_1 = require('../enums');
var mark_1 = require('../mark');
var fielddef_1 = require('../fielddef');
var encoding_1 = require('../encoding');
var util_1 = require('../util');
var util_2 = require('./util');
var scale_1 = require('./scale');
function compileStackProperties(mark, encoding, scale, config) {
    var stackFields = getStackFields(mark, encoding, scale);
    if (stackFields.length > 0 &&
        util_1.contains([mark_1.BAR, mark_1.AREA], mark) &&
        config.mark.stacked !== enums_1.StackOffset.NONE &&
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
function getStackFields(mark, encoding, scale) {
    return [channel_1.COLOR, channel_1.DETAIL].reduce(function (fields, channel) {
        var channelEncoding = encoding[channel];
        if (encoding_1.has(encoding, channel)) {
            if (util_1.isArray(channelEncoding)) {
                channelEncoding.forEach(function (fieldDef) {
                    fields.push(fielddef_1.field(fieldDef));
                });
            }
            else {
                var fieldDef = channelEncoding;
                fields.push(fielddef_1.field(fieldDef, {
                    binSuffix: scale_1.scaleType(scale[channel], fieldDef, channel, mark) === enums_1.ScaleType.ORDINAL ? '_range' : '_start'
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
        (util_1.isArray(encoding[channel_1.ORDER]) ? encoding[channel_1.ORDER] : [encoding[channel_1.ORDER]]).map(util_2.sortField) :
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

},{"../channel":9,"../encoding":30,"../enums":31,"../fielddef":32,"../mark":33,"../util":46,"./scale":25,"./util":28}],27:[function(require,module,exports){
var util_1 = require('../util');
var channel_1 = require('../channel');
var timeunit_1 = require('../timeunit');
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
    if (timeString.indexOf('hour') > -1) {
        timeComponents.push('%H');
    }
    if (timeString.indexOf('minute') > -1) {
        timeComponents.push('%M');
    }
    if (timeString.indexOf('second') > -1) {
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

},{"../channel":9,"../timeunit":44,"../util":46}],28:[function(require,module,exports){
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var type_1 = require('../type');
var time_1 = require('./time');
var util_1 = require('../util');
var enums_1 = require('../enums');
exports.FILL_STROKE_CONFIG = ['fill', 'fillOpacity',
    'stroke', 'strokeWidth', 'strokeDash', 'strokeDashOffset', 'strokeOpacity',
    'opacity'];
function applyColorAndOpacity(p, model) {
    var filled = model.config().mark.filled;
    var fieldDef = model.fieldDef(channel_1.COLOR);
    applyMarkConfig(p, model, exports.FILL_STROKE_CONFIG);
    var value;
    if (model.has(channel_1.COLOR)) {
        value = {
            scale: model.scaleName(channel_1.COLOR),
            field: model.field(channel_1.COLOR, fieldDef.type === type_1.ORDINAL ? { prefn: 'rank_' } : {})
        };
    }
    else if (fieldDef && fieldDef.value) {
        value = { value: fieldDef.value };
    }
    if (value !== undefined) {
        if (filled) {
            p.fill = value;
        }
        else {
            p.stroke = value;
        }
    }
    else {
        p[filled ? 'fill' : 'stroke'] = p[filled ? 'fill' : 'stroke'] ||
            { value: model.config().mark.color };
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
}
exports.applyConfig = applyConfig;
function applyMarkConfig(marksProperties, model, propsList) {
    applyConfig(marksProperties, model.config().mark, propsList);
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
    return false;
}
function sortField(orderChannelDef) {
    return (orderChannelDef.sort === enums_1.SortOrder.DESCENDING ? '-' : '') + fielddef_1.field(orderChannelDef);
}
exports.sortField = sortField;
function timeFormat(model, channel) {
    var fieldDef = model.fieldDef(channel);
    return time_1.format(fieldDef.timeUnit, isAbbreviated(model, channel, fieldDef));
}
exports.timeFormat = timeFormat;

},{"../channel":9,"../enums":31,"../fielddef":32,"../type":45,"../util":46,"./time":27}],29:[function(require,module,exports){
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

},{"./type":45}],30:[function(require,module,exports){
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

},{"./channel":9,"./util":46}],31:[function(require,module,exports){
(function (SortOrder) {
    SortOrder[SortOrder["ASCENDING"] = 'ascending'] = "ASCENDING";
    SortOrder[SortOrder["DESCENDING"] = 'descending'] = "DESCENDING";
    SortOrder[SortOrder["NONE"] = 'none'] = "NONE";
})(exports.SortOrder || (exports.SortOrder = {}));
var SortOrder = exports.SortOrder;
(function (ScaleType) {
    ScaleType[ScaleType["LINEAR"] = 'linear'] = "LINEAR";
    ScaleType[ScaleType["LOG"] = 'log'] = "LOG";
    ScaleType[ScaleType["POW"] = 'pow'] = "POW";
    ScaleType[ScaleType["SQRT"] = 'sqrt'] = "SQRT";
    ScaleType[ScaleType["QUANTILE"] = 'quantile'] = "QUANTILE";
    ScaleType[ScaleType["ORDINAL"] = 'ordinal'] = "ORDINAL";
    ScaleType[ScaleType["TIME"] = 'time'] = "TIME";
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
(function (DataFormat) {
    DataFormat[DataFormat["JSON"] = 'json'] = "JSON";
    DataFormat[DataFormat["CSV"] = 'csv'] = "CSV";
    DataFormat[DataFormat["TSV"] = 'tsv'] = "TSV";
})(exports.DataFormat || (exports.DataFormat = {}));
var DataFormat = exports.DataFormat;
(function (AxisOrient) {
    AxisOrient[AxisOrient["TOP"] = 'top'] = "TOP";
    AxisOrient[AxisOrient["RIGHT"] = 'right'] = "RIGHT";
    AxisOrient[AxisOrient["LEFT"] = 'left'] = "LEFT";
    AxisOrient[AxisOrient["BOTTOM"] = 'bottom'] = "BOTTOM";
})(exports.AxisOrient || (exports.AxisOrient = {}));
var AxisOrient = exports.AxisOrient;
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

},{}],32:[function(require,module,exports){
var util_1 = require('./util');
var type_1 = require('./type');
var timeunit_1 = require('./timeunit');
var aggregate_1 = require('./aggregate');
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
    return { field: '*', aggregate: aggregate_1.AggregateOp.COUNT, type: type_1.QUANTITATIVE, displayName: exports.COUNT_DISPLAYNAME };
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
    if (isCount(fieldDef)) {
        return exports.COUNT_DISPLAYNAME;
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

},{"./aggregate":7,"./timeunit":44,"./type":45,"./util":46}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
exports.defaultCellConfig = {
    width: 200,
    height: 200
};
exports.defaultFacetCellConfig = {
    stroke: '#ccc',
    strokeWidth: 1
};

},{}],36:[function(require,module,exports){
var scale_schema_1 = require('./scale.schema');
var axis_schema_1 = require('./axis.schema');
var config_cell_schema_1 = require('./config.cell.schema');
var defaultFacetGridConfig = {
    color: '#000000',
    opacity: 0.4,
    offset: 0
};
exports.defaultFacetConfig = {
    scale: scale_schema_1.defaultFacetScaleConfig,
    axis: axis_schema_1.defaultFacetAxisConfig,
    grid: defaultFacetGridConfig,
    cell: config_cell_schema_1.defaultFacetCellConfig
};

},{"./axis.schema":34,"./config.cell.schema":35,"./scale.schema":40}],37:[function(require,module,exports){
var enums_1 = require('../enums');
exports.defaultMarkConfig = {
    color: '#4682b4',
    strokeWidth: 2,
    size: 30,
    barThinSize: 2,
    tickThickness: 1,
    fontSize: 10,
    baseline: enums_1.VerticalAlign.MIDDLE,
    text: 'Abc',
    shortTimeLabels: false,
    applyColorToBackground: false
};

},{"../enums":31}],38:[function(require,module,exports){
var config_cell_schema_1 = require('./config.cell.schema');
var config_facet_schema_1 = require('./config.facet.schema');
var config_mark_schema_1 = require('./config.mark.schema');
var scale_schema_1 = require('./scale.schema');
var axis_schema_1 = require('./axis.schema');
var legend_schema_1 = require('./legend.schema');
exports.defaultConfig = {
    numberFormat: 's',
    timeFormat: '%Y-%m-%d',
    cell: config_cell_schema_1.defaultCellConfig,
    mark: config_mark_schema_1.defaultMarkConfig,
    scale: scale_schema_1.defaultScaleConfig,
    axis: axis_schema_1.defaultAxisConfig,
    legend: legend_schema_1.defaultLegendConfig,
    facet: config_facet_schema_1.defaultFacetConfig,
};

},{"./axis.schema":34,"./config.cell.schema":35,"./config.facet.schema":36,"./config.mark.schema":37,"./legend.schema":39,"./scale.schema":40}],39:[function(require,module,exports){
exports.defaultLegendConfig = {
    orient: undefined,
    shortTimeLabels: false
};

},{}],40:[function(require,module,exports){
exports.defaultScaleConfig = {
    round: true,
    textBandWidth: 90,
    bandSize: 21,
    padding: 1,
    useRawDomain: false,
    nominalColorRange: 'category10',
    sequentialColorRange: ['#AFC6A3', '#09622A'],
    shapeRange: 'shapes',
    fontSizeRange: [8, 40]
};
exports.defaultFacetScaleConfig = {
    round: true,
    padding: 16
};

},{}],41:[function(require,module,exports){

},{}],42:[function(require,module,exports){
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

},{"./aggregate":7,"./encoding":30,"./mark":33,"./timeunit":44,"./type":45}],43:[function(require,module,exports){
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

},{"./channel":9,"./compile/Model":10,"./encoding":30,"./mark":33,"./util":46}],44:[function(require,module,exports){
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
    TimeUnit.HOURSMINUTES,
    TimeUnit.HOURSMINUTESSECONDS,
    TimeUnit.MINUTESSECONDS,
    TimeUnit.SECONDSMILLISECONDS,
];

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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
function without(array, items) {
    return array.filter(function (item) {
        return !contains(items, item);
    });
}
exports.without = without;
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
function error(message) {
    console.error('[VL Error]', message);
}
exports.error = error;

},{"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6}],47:[function(require,module,exports){
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

},{"./mark":33,"./util":46}],48:[function(require,module,exports){
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
exports.version = '1.0.6';

},{"./bin":8,"./channel":9,"./compile/compile":12,"./data":29,"./encoding":30,"./fielddef":32,"./schema/schema":41,"./shorthand":42,"./spec":43,"./timeunit":44,"./type":45,"./util":46,"./validate":47}]},{},[48])(48)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwic3JjL2FnZ3JlZ2F0ZS50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL01vZGVsLnRzIiwic3JjL2NvbXBpbGUvYXhpcy50cyIsInNyYy9jb21waWxlL2NvbXBpbGUudHMiLCJzcmMvY29tcGlsZS9jb25maWcudHMiLCJzcmMvY29tcGlsZS9kYXRhLnRzIiwic3JjL2NvbXBpbGUvZmFjZXQudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrLWFyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrLWJhci50cyIsInNyYy9jb21waWxlL21hcmstbGluZS50cyIsInNyYy9jb21waWxlL21hcmstcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrLXRleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrLXRpY2sudHMiLCJzcmMvY29tcGlsZS9tYXJrLnRzIiwic3JjL2NvbXBpbGUvc2NhbGUudHMiLCJzcmMvY29tcGlsZS9zdGFjay50cyIsInNyYy9jb21waWxlL3RpbWUudHMiLCJzcmMvY29tcGlsZS91dGlsLnRzIiwic3JjL2RhdGEudHMiLCJzcmMvZW5jb2RpbmcudHMiLCJzcmMvZW51bXMudHMiLCJzcmMvZmllbGRkZWYudHMiLCJzcmMvbWFyay50cyIsInNyYy9zY2hlbWEvYXhpcy5zY2hlbWEudHMiLCJzcmMvc2NoZW1hL2NvbmZpZy5jZWxsLnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLmZhY2V0LnNjaGVtYS50cyIsInNyYy9zY2hlbWEvY29uZmlnLm1hcmsuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9jb25maWcuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9sZWdlbmQuc2NoZW1hLnRzIiwic3JjL3NjaGVtYS9zY2FsZS5zY2hlbWEudHMiLCJzcmMvc2hvcnRoYW5kLnRzIiwic3JjL3NwZWMudHMiLCJzcmMvdGltZXVuaXQudHMiLCJzcmMvdHlwZS50cyIsInNyYy91dGlsLnRzIiwic3JjL3ZhbGlkYXRlLnRzIiwic3JjL3ZsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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SUFDaEUsSUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDaEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUU3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUNoRCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQzVELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFB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Q0FBQztBQUNaLGVBQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsZUFBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFDNUIsWUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLGNBQU0sR0FBRyxRQUFRLENBQUM7QUFDbEIsaUJBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEIsWUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLGdCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLFlBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxZQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsZ0JBQVEsR0FBRyxVQUFVLENBQUM7QUFFdEIsZUFBTyxHQUFHLGFBQWEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKCdkMy10aW1lJywgWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgZmFjdG9yeSgoZ2xvYmFsLmQzX3RpbWUgPSB7fSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHQwID0gbmV3IERhdGU7XG4gIHZhciB0MSA9IG5ldyBEYXRlO1xuICBmdW5jdGlvbiBuZXdJbnRlcnZhbChmbG9vcmksIG9mZnNldGksIGNvdW50LCBmaWVsZCkge1xuXG4gICAgZnVuY3Rpb24gaW50ZXJ2YWwoZGF0ZSkge1xuICAgICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoK2RhdGUpKSwgZGF0ZTtcbiAgICB9XG5cbiAgICBpbnRlcnZhbC5mbG9vciA9IGludGVydmFsO1xuXG4gICAgaW50ZXJ2YWwucm91bmQgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgZDAgPSBuZXcgRGF0ZSgrZGF0ZSksXG4gICAgICAgICAgZDEgPSBuZXcgRGF0ZShkYXRlIC0gMSk7XG4gICAgICBmbG9vcmkoZDApLCBmbG9vcmkoZDEpLCBvZmZzZXRpKGQxLCAxKTtcbiAgICAgIHJldHVybiBkYXRlIC0gZDAgPCBkMSAtIGRhdGUgPyBkMCA6IGQxO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5jZWlsID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoZGF0ZSAtIDEpKSwgb2Zmc2V0aShkYXRlLCAxKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwub2Zmc2V0ID0gZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgcmV0dXJuIG9mZnNldGkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSwgc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCkpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQgLSAxKTtcbiAgICAgIHN0b3AgPSBuZXcgRGF0ZSgrc3RvcCk7XG4gICAgICBzdGVwID0gc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICBpZiAoIShzdGFydCA8IHN0b3ApIHx8ICEoc3RlcCA+IDApKSByZXR1cm4gcmFuZ2U7IC8vIGFsc28gaGFuZGxlcyBJbnZhbGlkIERhdGVcbiAgICAgIG9mZnNldGkoc3RhcnQsIDEpLCBmbG9vcmkoc3RhcnQpO1xuICAgICAgaWYgKHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHdoaWxlIChvZmZzZXRpKHN0YXJ0LCBzdGVwKSwgZmxvb3JpKHN0YXJ0KSwgc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5maWx0ZXIgPSBmdW5jdGlvbih0ZXN0KSB7XG4gICAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB3aGlsZSAoZmxvb3JpKGRhdGUpLCAhdGVzdChkYXRlKSkgZGF0ZS5zZXRUaW1lKGRhdGUgLSAxKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgICAgd2hpbGUgKC0tc3RlcCA+PSAwKSB3aGlsZSAob2Zmc2V0aShkYXRlLCAxKSwgIXRlc3QoZGF0ZSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgaW50ZXJ2YWwuY291bnQgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgICAgZmxvb3JpKHQwKSwgZmxvb3JpKHQxKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY291bnQodDAsIHQxKSk7XG4gICAgICB9O1xuXG4gICAgICBpbnRlcnZhbC5ldmVyeSA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICAgIHJldHVybiAhaXNGaW5pdGUoc3RlcCkgfHwgIShzdGVwID4gMCkgPyBudWxsXG4gICAgICAgICAgICA6ICEoc3RlcCA+IDEpID8gaW50ZXJ2YWxcbiAgICAgICAgICAgIDogaW50ZXJ2YWwuZmlsdGVyKGZpZWxkXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbihkKSB7IHJldHVybiBmaWVsZChkKSAlIHN0ZXAgPT09IDA7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGludGVydmFsLmNvdW50KDAsIGQpICUgc3RlcCA9PT0gMDsgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnZhbDtcbiAgfTtcblxuICB2YXIgbWlsbGlzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAvLyBub29wXG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQgLSBzdGFydDtcbiAgfSk7XG5cbiAgLy8gQW4gb3B0aW1pemVkIGltcGxlbWVudGF0aW9uIGZvciB0aGlzIHNpbXBsZSBjYXNlLlxuICBtaWxsaXNlY29uZC5ldmVyeSA9IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gTWF0aC5mbG9vcihrKTtcbiAgICBpZiAoIWlzRmluaXRlKGspIHx8ICEoayA+IDApKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIShrID4gMSkpIHJldHVybiBtaWxsaXNlY29uZDtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRUaW1lKE1hdGguZmxvb3IoZGF0ZSAvIGspICogayk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gaztcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDFlMyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDFlMztcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFNlY29uZHMoMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNmU0O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9KTtcblxuICB2YXIgaG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9KTtcblxuICB2YXIgZGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHdlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xuICB2YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcbiAgdmFyIHR1ZXNkYXkgPSB3ZWVrZGF5KDIpO1xuICB2YXIgd2VkbmVzZGF5ID0gd2Vla2RheSgzKTtcbiAgdmFyIHRodXJzZGF5ID0gd2Vla2RheSg0KTtcbiAgdmFyIGZyaWRheSA9IHdlZWtkYXkoNSk7XG4gIHZhciBzYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbiAgdmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXREYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHllYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldE1vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgdXRjU2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWlsbGlzZWNvbmRzKDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDFlMyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDFlMztcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ1NlY29uZHMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y01pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNmU0O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTWludXRlcygpO1xuICB9KTtcblxuICB2YXIgdXRjSG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbnV0ZXMoMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENIb3VycygpO1xuICB9KTtcblxuICB2YXIgdXRjRGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENEYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB1dGNXZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIChkYXRlLmdldFVUQ0RheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHV0Y1N1bmRheSA9IHV0Y1dlZWtkYXkoMCk7XG4gIHZhciB1dGNNb25kYXkgPSB1dGNXZWVrZGF5KDEpO1xuICB2YXIgdXRjVHVlc2RheSA9IHV0Y1dlZWtkYXkoMik7XG4gIHZhciB1dGNXZWRuZXNkYXkgPSB1dGNXZWVrZGF5KDMpO1xuICB2YXIgdXRjVGh1cnNkYXkgPSB1dGNXZWVrZGF5KDQpO1xuICB2YXIgdXRjRnJpZGF5ID0gdXRjV2Vla2RheSg1KTtcbiAgdmFyIHV0Y1NhdHVyZGF5ID0gdXRjV2Vla2RheSg2KTtcblxuICB2YXIgdXRjTW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ0RhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ01vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENNb250aCgpIC0gc3RhcnQuZ2V0VVRDTW9udGgoKSArIChlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNb250aCgpO1xuICB9KTtcblxuICB2YXIgdXRjWWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciBtaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZC5yYW5nZTtcbiAgdmFyIHNlY29uZHMgPSBzZWNvbmQucmFuZ2U7XG4gIHZhciBtaW51dGVzID0gbWludXRlLnJhbmdlO1xuICB2YXIgaG91cnMgPSBob3VyLnJhbmdlO1xuICB2YXIgZGF5cyA9IGRheS5yYW5nZTtcbiAgdmFyIHN1bmRheXMgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb25kYXlzID0gbW9uZGF5LnJhbmdlO1xuICB2YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xuICB2YXIgd2VkbmVzZGF5cyA9IHdlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHRodXJzZGF5cyA9IHRodXJzZGF5LnJhbmdlO1xuICB2YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbiAgdmFyIHNhdHVyZGF5cyA9IHNhdHVyZGF5LnJhbmdlO1xuICB2YXIgd2Vla3MgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb250aHMgPSBtb250aC5yYW5nZTtcbiAgdmFyIHllYXJzID0geWVhci5yYW5nZTtcblxuICB2YXIgdXRjTWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgdmFyIHV0Y01pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgdmFyIHV0Y1NlY29uZHMgPSB1dGNTZWNvbmQucmFuZ2U7XG4gIHZhciB1dGNNaW51dGVzID0gdXRjTWludXRlLnJhbmdlO1xuICB2YXIgdXRjSG91cnMgPSB1dGNIb3VyLnJhbmdlO1xuICB2YXIgdXRjRGF5cyA9IHV0Y0RheS5yYW5nZTtcbiAgdmFyIHV0Y1N1bmRheXMgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb25kYXlzID0gdXRjTW9uZGF5LnJhbmdlO1xuICB2YXIgdXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5LnJhbmdlO1xuICB2YXIgdXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5LnJhbmdlO1xuICB2YXIgdXRjRnJpZGF5cyA9IHV0Y0ZyaWRheS5yYW5nZTtcbiAgdmFyIHV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5LnJhbmdlO1xuICB2YXIgdXRjV2Vla3MgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb250aHMgPSB1dGNNb250aC5yYW5nZTtcbiAgdmFyIHV0Y1llYXJzID0gdXRjWWVhci5yYW5nZTtcblxuICB2YXIgdmVyc2lvbiA9IFwiMC4xLjFcIjtcblxuICBleHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy5zZWNvbmRzID0gc2Vjb25kcztcbiAgZXhwb3J0cy5taW51dGVzID0gbWludXRlcztcbiAgZXhwb3J0cy5ob3VycyA9IGhvdXJzO1xuICBleHBvcnRzLmRheXMgPSBkYXlzO1xuICBleHBvcnRzLnN1bmRheXMgPSBzdW5kYXlzO1xuICBleHBvcnRzLm1vbmRheXMgPSBtb25kYXlzO1xuICBleHBvcnRzLnR1ZXNkYXlzID0gdHVlc2RheXM7XG4gIGV4cG9ydHMud2VkbmVzZGF5cyA9IHdlZG5lc2RheXM7XG4gIGV4cG9ydHMudGh1cnNkYXlzID0gdGh1cnNkYXlzO1xuICBleHBvcnRzLmZyaWRheXMgPSBmcmlkYXlzO1xuICBleHBvcnRzLnNhdHVyZGF5cyA9IHNhdHVyZGF5cztcbiAgZXhwb3J0cy53ZWVrcyA9IHdlZWtzO1xuICBleHBvcnRzLm1vbnRocyA9IG1vbnRocztcbiAgZXhwb3J0cy55ZWFycyA9IHllYXJzO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gdXRjTWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmRzID0gdXRjTWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnV0Y1NlY29uZHMgPSB1dGNTZWNvbmRzO1xuICBleHBvcnRzLnV0Y01pbnV0ZXMgPSB1dGNNaW51dGVzO1xuICBleHBvcnRzLnV0Y0hvdXJzID0gdXRjSG91cnM7XG4gIGV4cG9ydHMudXRjRGF5cyA9IHV0Y0RheXM7XG4gIGV4cG9ydHMudXRjU3VuZGF5cyA9IHV0Y1N1bmRheXM7XG4gIGV4cG9ydHMudXRjTW9uZGF5cyA9IHV0Y01vbmRheXM7XG4gIGV4cG9ydHMudXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5cztcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5cztcbiAgZXhwb3J0cy51dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheXM7XG4gIGV4cG9ydHMudXRjRnJpZGF5cyA9IHV0Y0ZyaWRheXM7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXlzO1xuICBleHBvcnRzLnV0Y1dlZWtzID0gdXRjV2Vla3M7XG4gIGV4cG9ydHMudXRjTW9udGhzID0gdXRjTW9udGhzO1xuICBleHBvcnRzLnV0Y1llYXJzID0gdXRjWWVhcnM7XG4gIGV4cG9ydHMubWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgZXhwb3J0cy5zZWNvbmQgPSBzZWNvbmQ7XG4gIGV4cG9ydHMubWludXRlID0gbWludXRlO1xuICBleHBvcnRzLmhvdXIgPSBob3VyO1xuICBleHBvcnRzLmRheSA9IGRheTtcbiAgZXhwb3J0cy5zdW5kYXkgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9uZGF5ID0gbW9uZGF5O1xuICBleHBvcnRzLnR1ZXNkYXkgPSB0dWVzZGF5O1xuICBleHBvcnRzLndlZG5lc2RheSA9IHdlZG5lc2RheTtcbiAgZXhwb3J0cy50aHVyc2RheSA9IHRodXJzZGF5O1xuICBleHBvcnRzLmZyaWRheSA9IGZyaWRheTtcbiAgZXhwb3J0cy5zYXR1cmRheSA9IHNhdHVyZGF5O1xuICBleHBvcnRzLndlZWsgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9udGggPSBtb250aDtcbiAgZXhwb3J0cy55ZWFyID0geWVhcjtcbiAgZXhwb3J0cy51dGNTZWNvbmQgPSB1dGNTZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWludXRlID0gdXRjTWludXRlO1xuICBleHBvcnRzLnV0Y0hvdXIgPSB1dGNIb3VyO1xuICBleHBvcnRzLnV0Y0RheSA9IHV0Y0RheTtcbiAgZXhwb3J0cy51dGNTdW5kYXkgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuICBleHBvcnRzLnV0Y1R1ZXNkYXkgPSB1dGNUdWVzZGF5O1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheSA9IHV0Y1dlZG5lc2RheTtcbiAgZXhwb3J0cy51dGNUaHVyc2RheSA9IHV0Y1RodXJzZGF5O1xuICBleHBvcnRzLnV0Y0ZyaWRheSA9IHV0Y0ZyaWRheTtcbiAgZXhwb3J0cy51dGNTYXR1cmRheSA9IHV0Y1NhdHVyZGF5O1xuICBleHBvcnRzLnV0Y1dlZWsgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9udGggPSB1dGNNb250aDtcbiAgZXhwb3J0cy51dGNZZWFyID0gdXRjWWVhcjtcbiAgZXhwb3J0cy5pbnRlcnZhbCA9IG5ld0ludGVydmFsO1xuXG59KSk7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgdGltZSA9IHJlcXVpcmUoJy4uL3RpbWUnKSxcbiAgICBFUFNJTE9OID0gMWUtMTU7XG5cbmZ1bmN0aW9uIGJpbnMob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZGV0ZXJtaW5lIHJhbmdlXG4gIHZhciBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMTUsXG4gICAgICBiYXNlID0gb3B0LmJhc2UgfHwgMTAsXG4gICAgICBsb2diID0gTWF0aC5sb2coYmFzZSksXG4gICAgICBkaXYgPSBvcHQuZGl2IHx8IFs1LCAyXSxcbiAgICAgIG1pbiA9IG9wdC5taW4sXG4gICAgICBtYXggPSBvcHQubWF4LFxuICAgICAgc3BhbiA9IG1heCAtIG1pbixcbiAgICAgIHN0ZXAsIGxldmVsLCBtaW5zdGVwLCBwcmVjaXNpb24sIHYsIGksIGVwcztcblxuICBpZiAob3B0LnN0ZXApIHtcbiAgICAvLyBpZiBzdGVwIHNpemUgaXMgZXhwbGljaXRseSBnaXZlbiwgdXNlIHRoYXRcbiAgICBzdGVwID0gb3B0LnN0ZXA7XG4gIH0gZWxzZSBpZiAob3B0LnN0ZXBzKSB7XG4gICAgLy8gaWYgcHJvdmlkZWQsIGxpbWl0IGNob2ljZSB0byBhY2NlcHRhYmxlIHN0ZXAgc2l6ZXNcbiAgICBzdGVwID0gb3B0LnN0ZXBzW01hdGgubWluKFxuICAgICAgb3B0LnN0ZXBzLmxlbmd0aCAtIDEsXG4gICAgICBiaXNlY3Qob3B0LnN0ZXBzLCBzcGFuL21heGIsIDAsIG9wdC5zdGVwcy5sZW5ndGgpXG4gICAgKV07XG4gIH0gZWxzZSB7XG4gICAgLy8gZWxzZSB1c2Ugc3BhbiB0byBkZXRlcm1pbmUgc3RlcCBzaXplXG4gICAgbGV2ZWwgPSBNYXRoLmNlaWwoTWF0aC5sb2cobWF4YikgLyBsb2diKTtcbiAgICBtaW5zdGVwID0gb3B0Lm1pbnN0ZXAgfHwgMDtcbiAgICBzdGVwID0gTWF0aC5tYXgoXG4gICAgICBtaW5zdGVwLFxuICAgICAgTWF0aC5wb3coYmFzZSwgTWF0aC5yb3VuZChNYXRoLmxvZyhzcGFuKSAvIGxvZ2IpIC0gbGV2ZWwpXG4gICAgKTtcblxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4YikgeyBzdGVwICo9IGJhc2U7IH1cblxuICAgIC8vIGRlY3JlYXNlIHN0ZXAgc2l6ZSBpZiBhbGxvd2VkXG4gICAgZm9yIChpPTA7IGk8ZGl2Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gc3RlcCAvIGRpdltpXTtcbiAgICAgIGlmICh2ID49IG1pbnN0ZXAgJiYgc3BhbiAvIHYgPD0gbWF4Yikgc3RlcCA9IHY7XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHByZWNpc2lvbiwgbWluIGFuZCBtYXhcbiAgdiA9IE1hdGgubG9nKHN0ZXApO1xuICBwcmVjaXNpb24gPSB2ID49IDAgPyAwIDogfn4oLXYgLyBsb2diKSArIDE7XG4gIGVwcyA9IE1hdGgucG93KGJhc2UsIC1wcmVjaXNpb24gLSAxKTtcbiAgbWluID0gTWF0aC5taW4obWluLCBNYXRoLmZsb29yKG1pbiAvIHN0ZXAgKyBlcHMpICogc3RlcCk7XG4gIG1heCA9IE1hdGguY2VpbChtYXggLyBzdGVwKSAqIHN0ZXA7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogbWluLFxuICAgIHN0b3A6ICBtYXgsXG4gICAgc3RlcDogIHN0ZXAsXG4gICAgdW5pdDogIHtwcmVjaXNpb246IHByZWNpc2lvbn0sXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufVxuXG5mdW5jdGlvbiBiaXNlY3QoYSwgeCwgbG8sIGhpKSB7XG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgaWYgKHV0aWwuY21wKGFbbWlkXSwgeCkgPCAwKSB7IGxvID0gbWlkICsgMTsgfVxuICAgIGVsc2UgeyBoaSA9IG1pZDsgfVxuICB9XG4gIHJldHVybiBsbztcbn1cblxuZnVuY3Rpb24gdmFsdWUodikge1xuICByZXR1cm4gdGhpcy5zdGVwICogTWF0aC5mbG9vcih2IC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGluZGV4KHYpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKHYgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBkYXRlX3ZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMudW5pdC5kYXRlKHZhbHVlLmNhbGwodGhpcywgdikpO1xufVxuXG5mdW5jdGlvbiBkYXRlX2luZGV4KHYpIHtcbiAgcmV0dXJuIGluZGV4LmNhbGwodGhpcywgdGhpcy51bml0LnVuaXQodikpO1xufVxuXG5iaW5zLmRhdGUgPSBmdW5jdGlvbihvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGRhdGUgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGZpbmQgdGltZSBzdGVwLCB0aGVuIGJpblxuICB2YXIgdW5pdHMgPSBvcHQudXRjID8gdGltZS51dGMgOiB0aW1lLFxuICAgICAgZG1pbiA9IG9wdC5taW4sXG4gICAgICBkbWF4ID0gb3B0Lm1heCxcbiAgICAgIG1heGIgPSBvcHQubWF4YmlucyB8fCAyMCxcbiAgICAgIG1pbmIgPSBvcHQubWluYmlucyB8fCA0LFxuICAgICAgc3BhbiA9ICgrZG1heCkgLSAoK2RtaW4pLFxuICAgICAgdW5pdCA9IG9wdC51bml0ID8gdW5pdHNbb3B0LnVuaXRdIDogdW5pdHMuZmluZChzcGFuLCBtaW5iLCBtYXhiKSxcbiAgICAgIHNwZWMgPSBiaW5zKHtcbiAgICAgICAgbWluOiAgICAgdW5pdC5taW4gIT0gbnVsbCA/IHVuaXQubWluIDogdW5pdC51bml0KGRtaW4pLFxuICAgICAgICBtYXg6ICAgICB1bml0Lm1heCAhPSBudWxsID8gdW5pdC5tYXggOiB1bml0LnVuaXQoZG1heCksXG4gICAgICAgIG1heGJpbnM6IG1heGIsXG4gICAgICAgIG1pbnN0ZXA6IHVuaXQubWluc3RlcCxcbiAgICAgICAgc3RlcHM6ICAgdW5pdC5zdGVwXG4gICAgICB9KTtcblxuICBzcGVjLnVuaXQgPSB1bml0O1xuICBzcGVjLmluZGV4ID0gZGF0ZV9pbmRleDtcbiAgaWYgKCFvcHQucmF3KSBzcGVjLnZhbHVlID0gZGF0ZV92YWx1ZTtcbiAgcmV0dXJuIHNwZWM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbnM7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIGdlbiA9IG1vZHVsZS5leHBvcnRzO1xuXG5nZW4ucmVwZWF0ID0gZnVuY3Rpb24odmFsLCBuKSB7XG4gIHZhciBhID0gQXJyYXkobiksIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgYVtpXSA9IHZhbDtcbiAgcmV0dXJuIGE7XG59O1xuXG5nZW4uemVyb3MgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiBnZW4ucmVwZWF0KDAsIG4pO1xufTtcblxuZ2VuLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgc3RlcCA9IDE7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICB9XG4gIGlmICgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXAgPT0gSW5maW5pdHkpIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgcmFuZ2UnKTtcbiAgdmFyIHJhbmdlID0gW10sIGkgPSAtMSwgajtcbiAgaWYgKHN0ZXAgPCAwKSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpID4gc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgZWxzZSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpIDwgc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuZ2VuLnJhbmRvbSA9IHt9O1xuXG5nZW4ucmFuZG9tLnVuaWZvcm0gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICBtYXggPSBtaW4gPT09IHVuZGVmaW5lZCA/IDEgOiBtaW47XG4gICAgbWluID0gMDtcbiAgfVxuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWluICsgZCAqIE1hdGgucmFuZG9tKCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID49IG1pbiAmJiB4IDw9IG1heCkgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCA8IG1pbiA/IDAgOiB4ID4gbWF4ID8gMSA6ICh4IC0gbWluKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gbWluICsgcCpkIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIGIgPSBhO1xuICAgIGEgPSAwO1xuICB9XG4gIHZhciBkID0gYiAtIGE7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKGQgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPT09IE1hdGguZmxvb3IoeCkgJiYgeCA+PSBhICYmIHggPCBiKSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciB2ID0gTWF0aC5mbG9vcih4KTtcbiAgICByZXR1cm4gdiA8IGEgPyAwIDogdiA+PSBiID8gMSA6ICh2IC0gYSArIDEpIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBhIC0gMSArIE1hdGguZmxvb3IocCpkKSA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLm5vcm1hbCA9IGZ1bmN0aW9uKG1lYW4sIHN0ZGV2KSB7XG4gIG1lYW4gPSBtZWFuIHx8IDA7XG4gIHN0ZGV2ID0gc3RkZXYgfHwgMTtcbiAgdmFyIG5leHQ7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSAwLCB5ID0gMCwgcmRzLCBjO1xuICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSBuZXh0O1xuICAgICAgbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICByZHMgPSB4KnggKyB5Knk7XG4gICAgfSB3aGlsZSAocmRzID09PSAwIHx8IHJkcyA+IDEpO1xuICAgIGMgPSBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocmRzKS9yZHMpOyAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybVxuICAgIG5leHQgPSBtZWFuICsgeSpjKnN0ZGV2O1xuICAgIHJldHVybiBtZWFuICsgeCpjKnN0ZGV2O1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciBleHAgPSBNYXRoLmV4cChNYXRoLnBvdyh4LW1lYW4sIDIpIC8gKC0yICogTWF0aC5wb3coc3RkZXYsIDIpKSk7XG4gICAgcmV0dXJuICgxIC8gKHN0ZGV2ICogTWF0aC5zcXJ0KDIqTWF0aC5QSSkpKSAqIGV4cDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBmcm9tIFdlc3QgKDIwMDkpXG4gICAgLy8gQmV0dGVyIEFwcHJveGltYXRpb25zIHRvIEN1bXVsYXRpdmUgTm9ybWFsIEZ1bmN0aW9uc1xuICAgIHZhciBjZCxcbiAgICAgICAgeiA9ICh4IC0gbWVhbikgLyBzdGRldixcbiAgICAgICAgWiA9IE1hdGguYWJzKHopO1xuICAgIGlmIChaID4gMzcpIHtcbiAgICAgIGNkID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1bSwgZXhwID0gTWF0aC5leHAoLVoqWi8yKTtcbiAgICAgIGlmIChaIDwgNy4wNzEwNjc4MTE4NjU0Nykge1xuICAgICAgICBzdW0gPSAzLjUyNjI0OTY1OTk4OTExZS0wMiAqIFogKyAwLjcwMDM4MzA2NDQ0MzY4ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYuMzczOTYyMjAzNTMxNjU7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAzMy45MTI4NjYwNzgzODM7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxMTIuMDc5MjkxNDk3ODcxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIxLjIxMzU5NjE2OTkzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMC4yMDY4Njc5MTIzNzY7XG4gICAgICAgIGNkID0gZXhwICogc3VtO1xuICAgICAgICBzdW0gPSA4LjgzODgzNDc2NDgzMTg0ZS0wMiAqIFogKyAxLjc1NTY2NzE2MzE4MjY0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTYuMDY0MTc3NTc5MjA3O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgODYuNzgwNzMyMjAyOTQ2MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDI5Ni41NjQyNDg3Nzk2NzQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2MzcuMzMzNjMzMzc4ODMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNzkzLjgyNjUxMjUxOTk0ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDQ0MC40MTM3MzU4MjQ3NTI7XG4gICAgICAgIGNkID0gY2QgLyBzdW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdW0gPSBaICsgMC42NTtcbiAgICAgICAgc3VtID0gWiArIDQgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAzIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMiAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDEgLyBzdW07XG4gICAgICAgIGNkID0gZXhwIC8gc3VtIC8gMi41MDY2MjgyNzQ2MzE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6ID4gMCA/IDEgLSBjZCA6IGNkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBvZiBQcm9iaXQgZnVuY3Rpb24gdXNpbmcgaW52ZXJzZSBlcnJvciBmdW5jdGlvbi5cbiAgICBpZiAocCA8PSAwIHx8IHAgPj0gMSkgcmV0dXJuIE5hTjtcbiAgICB2YXIgeCA9IDIqcCAtIDEsXG4gICAgICAgIHYgPSAoOCAqIChNYXRoLlBJIC0gMykpIC8gKDMgKiBNYXRoLlBJICogKDQtTWF0aC5QSSkpLFxuICAgICAgICBhID0gKDIgLyAoTWF0aC5QSSp2KSkgKyAoTWF0aC5sb2coMSAtIE1hdGgucG93KHgsMikpIC8gMiksXG4gICAgICAgIGIgPSBNYXRoLmxvZygxIC0gKHgqeCkpIC8gdixcbiAgICAgICAgcyA9ICh4ID4gMCA/IDEgOiAtMSkgKiBNYXRoLnNxcnQoTWF0aC5zcXJ0KChhKmEpIC0gYikgLSBhKTtcbiAgICByZXR1cm4gbWVhbiArIHN0ZGV2ICogTWF0aC5TUVJUMiAqIHM7XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ib290c3RyYXAgPSBmdW5jdGlvbihkb21haW4sIHNtb290aCkge1xuICAvLyBHZW5lcmF0ZXMgYSBib290c3RyYXAgc2FtcGxlIGZyb20gYSBzZXQgb2Ygb2JzZXJ2YXRpb25zLlxuICAvLyBTbW9vdGggYm9vdHN0cmFwcGluZyBhZGRzIHJhbmRvbSB6ZXJvLWNlbnRlcmVkIG5vaXNlIHRvIHRoZSBzYW1wbGVzLlxuICB2YXIgdmFsID0gZG9tYWluLmZpbHRlcih1dGlsLmlzVmFsaWQpLFxuICAgICAgbGVuID0gdmFsLmxlbmd0aCxcbiAgICAgIGVyciA9IHNtb290aCA/IGdlbi5yYW5kb20ubm9ybWFsKDAsIHNtb290aCkgOiBudWxsO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWxbfn4oTWF0aC5yYW5kb20oKSpsZW4pXSArIChlcnIgPyBlcnIoKSA6IDApO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIHJldHVybiBmO1xufTsiLCJ2YXIgZDNfdGltZSA9IHJlcXVpcmUoJ2QzLXRpbWUnKTtcblxudmFyIHRlbXBEYXRlID0gbmV3IERhdGUoKSxcbiAgICBiYXNlRGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDEpLnNldEZ1bGxZZWFyKDApLCAvLyBKYW4gMSwgMCBBRFxuICAgIHV0Y0Jhc2VEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMCwgMCwgMSkpLnNldFVUQ0Z1bGxZZWFyKDApO1xuXG5mdW5jdGlvbiBkYXRlKGQpIHtcbiAgcmV0dXJuICh0ZW1wRGF0ZS5zZXRUaW1lKCtkKSwgdGVtcERhdGUpO1xufVxuXG4vLyBjcmVhdGUgYSB0aW1lIHVuaXQgZW50cnlcbmZ1bmN0aW9uIGVudHJ5KHR5cGUsIGRhdGUsIHVuaXQsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHZhciBlID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0ZTogZGF0ZSxcbiAgICB1bml0OiB1bml0XG4gIH07XG4gIGlmIChzdGVwKSB7XG4gICAgZS5zdGVwID0gc3RlcDtcbiAgfSBlbHNlIHtcbiAgICBlLm1pbnN0ZXAgPSAxO1xuICB9XG4gIGlmIChtaW4gIT0gbnVsbCkgZS5taW4gPSBtaW47XG4gIGlmIChtYXggIT0gbnVsbCkgZS5tYXggPSBtYXg7XG4gIHJldHVybiBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUodHlwZSwgdW5pdCwgYmFzZSwgc3RlcCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIGVudHJ5KHR5cGUsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5vZmZzZXQoYmFzZSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5jb3VudChiYXNlLCBkKTsgfSxcbiAgICBzdGVwLCBtaW4sIG1heCk7XG59XG5cbnZhciBsb2NhbGUgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS5zZWNvbmQsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLm1pbnV0ZSwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUuaG91ciwgICBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS5kYXksICAgIGJhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUubW9udGgsICBiYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnllYXIsICAgYmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFNlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldEhvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCA0K2QpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCBkICUgMTIsIDEpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciB1dGMgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS51dGNTZWNvbmQsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLnV0Y01pbnV0ZSwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUudXRjSG91ciwgICB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS51dGNEYXksICAgIHV0Y0Jhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUudXRjTW9udGgsICB1dGNCYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnV0Y1llYXIsICAgdXRjQmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0hvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCA0K2QpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIGQgJSAxMiwgMSkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciBTVEVQUyA9IFtcbiAgWzMxNTM2ZTYsIDVdLCAgLy8gMS15ZWFyXG4gIFs3Nzc2ZTYsIDRdLCAgIC8vIDMtbW9udGhcbiAgWzI1OTJlNiwgNF0sICAgLy8gMS1tb250aFxuICBbMTIwOTZlNSwgM10sICAvLyAyLXdlZWtcbiAgWzYwNDhlNSwgM10sICAgLy8gMS13ZWVrXG4gIFsxNzI4ZTUsIDNdLCAgIC8vIDItZGF5XG4gIFs4NjRlNSwgM10sICAgIC8vIDEtZGF5XG4gIFs0MzJlNSwgMl0sICAgIC8vIDEyLWhvdXJcbiAgWzIxNmU1LCAyXSwgICAgLy8gNi1ob3VyXG4gIFsxMDhlNSwgMl0sICAgIC8vIDMtaG91clxuICBbMzZlNSwgMl0sICAgICAvLyAxLWhvdXJcbiAgWzE4ZTUsIDFdLCAgICAgLy8gMzAtbWludXRlXG4gIFs5ZTUsIDFdLCAgICAgIC8vIDE1LW1pbnV0ZVxuICBbM2U1LCAxXSwgICAgICAvLyA1LW1pbnV0ZVxuICBbNmU0LCAxXSwgICAgICAvLyAxLW1pbnV0ZVxuICBbM2U0LCAwXSwgICAgICAvLyAzMC1zZWNvbmRcbiAgWzE1ZTMsIDBdLCAgICAgLy8gMTUtc2Vjb25kXG4gIFs1ZTMsIDBdLCAgICAgIC8vIDUtc2Vjb25kXG4gIFsxZTMsIDBdICAgICAgIC8vIDEtc2Vjb25kXG5dO1xuXG5mdW5jdGlvbiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKSB7XG4gIHZhciBzdGVwID0gU1RFUFNbMF0sIGksIG4sIGJpbnM7XG5cbiAgZm9yIChpPTEsIG49U1RFUFMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHN0ZXAgPSBTVEVQU1tpXTtcbiAgICBpZiAoc3BhbiA+IHN0ZXBbMF0pIHtcbiAgICAgIGJpbnMgPSBzcGFuIC8gc3RlcFswXTtcbiAgICAgIGlmIChiaW5zID4gbWF4Yikge1xuICAgICAgICByZXR1cm4gdW5pdHNbU1RFUFNbaS0xXVsxXV07XG4gICAgICB9XG4gICAgICBpZiAoYmlucyA+PSBtaW5iKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tzdGVwWzFdXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuaXRzW1NURVBTW24tMV1bMV1dO1xufVxuXG5mdW5jdGlvbiB0b1VuaXRNYXAodW5pdHMpIHtcbiAgdmFyIG1hcCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj11bml0cy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgbWFwW3VuaXRzW2ldLnR5cGVdID0gdW5pdHNbaV07XG4gIH1cbiAgbWFwLmZpbmQgPSBmdW5jdGlvbihzcGFuLCBtaW5iLCBtYXhiKSB7XG4gICAgcmV0dXJuIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpO1xuICB9O1xuICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvVW5pdE1hcChsb2NhbGUpO1xubW9kdWxlLmV4cG9ydHMudXRjID0gdG9Vbml0TWFwKHV0Yyk7IiwidmFyIHUgPSBtb2R1bGUuZXhwb3J0cztcblxuLy8gdXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIEZOQU1FID0gJ19fbmFtZV9fJztcblxudS5uYW1lZGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBmKSB7IHJldHVybiAoZltGTkFNRV0gPSBuYW1lLCBmKTsgfTtcblxudS5uYW1lID0gZnVuY3Rpb24oZikgeyByZXR1cm4gZj09bnVsbCA/IG51bGwgOiBmW0ZOQU1FXTsgfTtcblxudS5pZGVudGl0eSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg7IH07XG5cbnUudHJ1ZSA9IHUubmFtZWRmdW5jKCd0cnVlJywgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9KTtcblxudS5mYWxzZSA9IHUubmFtZWRmdW5jKCdmYWxzZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuXG51LmR1cGxpY2F0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG5cbnUuZXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYik7XG59O1xuXG51LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKHZhciB4LCBuYW1lLCBpPTEsIGxlbj1hcmd1bWVudHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgeCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKG5hbWUgaW4geCkgeyBvYmpbbmFtZV0gPSB4W25hbWVdOyB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbnUubGVuZ3RoID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHgubGVuZ3RoICE9IG51bGwgPyB4Lmxlbmd0aCA6IG51bGw7XG59O1xuXG51LmtleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXlzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSBrZXlzLnB1c2goayk7XG4gIHJldHVybiBrZXlzO1xufTtcblxudS52YWxzID0gZnVuY3Rpb24oeCkge1xuICB2YXIgdmFscyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkgdmFscy5wdXNoKHhba10pO1xuICByZXR1cm4gdmFscztcbn07XG5cbnUudG9NYXAgPSBmdW5jdGlvbihsaXN0LCBmKSB7XG4gIHJldHVybiAoZiA9IHUuJChmKSkgP1xuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialtmKHgpXSA9IDEsIG9iaik7IH0sIHt9KSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW3hdID0gMSwgb2JqKTsgfSwge30pO1xufTtcblxudS5rZXlzdHIgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgLy8gdXNlIHRvIGVuc3VyZSBjb25zaXN0ZW50IGtleSBnZW5lcmF0aW9uIGFjcm9zcyBtb2R1bGVzXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgaWYgKCFuKSByZXR1cm4gJyc7XG4gIGZvciAodmFyIHM9U3RyaW5nKHZhbHVlc1swXSksIGk9MTsgaTxuOyArK2kpIHtcbiAgICBzICs9ICd8JyArIFN0cmluZyh2YWx1ZXNbaV0pO1xuICB9XG4gIHJldHVybiBzO1xufTtcblxuLy8gdHlwZSBjaGVja2luZyBmdW5jdGlvbnNcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudS5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbnUuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudS5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnUuaXNOdW1iZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59O1xuXG51LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn07XG5cbnUuaXNEYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnUuaXNWYWxpZCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmo7XG59O1xuXG51LmlzQnVmZmVyID0gKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgQnVmZmVyLmlzQnVmZmVyKSB8fCB1LmZhbHNlO1xuXG4vLyB0eXBlIGNvZXJjaW9uIGZ1bmN0aW9uc1xuXG51Lm51bWJlciA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiArcztcbn07XG5cbnUuYm9vbGVhbiA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBzPT09J2ZhbHNlJyA/IGZhbHNlIDogISFzO1xufTtcblxuLy8gcGFyc2UgYSBkYXRlIHdpdGggb3B0aW9uYWwgZDMudGltZS1mb3JtYXQgZm9ybWF0XG51LmRhdGUgPSBmdW5jdGlvbihzLCBmb3JtYXQpIHtcbiAgdmFyIGQgPSBmb3JtYXQgPyBmb3JtYXQgOiBEYXRlO1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IGQucGFyc2Uocyk7XG59O1xuXG51LmFycmF5ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsID8gKHUuaXNBcnJheSh4KSA/IHggOiBbeF0pIDogW107XG59O1xuXG51LnN0ciA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHUuaXNBcnJheSh4KSA/ICdbJyArIHgubWFwKHUuc3RyKSArICddJ1xuICAgIDogdS5pc09iamVjdCh4KSA/IEpTT04uc3RyaW5naWZ5KHgpXG4gICAgOiB1LmlzU3RyaW5nKHgpID8gKCdcXCcnK3V0aWxfZXNjYXBlX3N0cih4KSsnXFwnJykgOiB4O1xufTtcblxudmFyIGVzY2FwZV9zdHJfcmUgPSAvKF58W15cXFxcXSknL2c7XG5cbmZ1bmN0aW9uIHV0aWxfZXNjYXBlX3N0cih4KSB7XG4gIHJldHVybiB4LnJlcGxhY2UoZXNjYXBlX3N0cl9yZSwgJyQxXFxcXFxcJycpO1xufVxuXG4vLyBkYXRhIGFjY2VzcyBmdW5jdGlvbnNcblxudmFyIGZpZWxkX3JlID0gL1xcWyguKj8pXFxdfFteLlxcW10rL2c7XG5cbnUuZmllbGQgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiBTdHJpbmcoZikubWF0Y2goZmllbGRfcmUpLm1hcChmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGRbMF0gIT09ICdbJyA/IGQgOlxuICAgICAgZFsxXSAhPT0gXCInXCIgJiYgZFsxXSAhPT0gJ1wiJyA/IGQuc2xpY2UoMSwgLTEpIDpcbiAgICAgIGQuc2xpY2UoMiwgLTIpLnJlcGxhY2UoL1xcXFwoW1wiJ10pL2csICckMScpO1xuICB9KTtcbn07XG5cbnUuYWNjZXNzb3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gZj09bnVsbCB8fCB1LmlzRnVuY3Rpb24oZikgPyBmIDpcbiAgICB1Lm5hbWVkZnVuYyhmLCAocyA9IHUuZmllbGQoZikpLmxlbmd0aCA+IDEgP1xuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gcy5yZWR1Y2UoZnVuY3Rpb24oeCxmKSB7IHJldHVybiB4W2ZdOyB9LCB4KTsgfSA6XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiB4W2ZdOyB9XG4gICAgKTtcbn07XG5cbi8vIHNob3J0LWN1dCBmb3IgYWNjZXNzb3JcbnUuJCA9IHUuYWNjZXNzb3I7XG5cbnUubXV0YXRvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiB1LmlzU3RyaW5nKGYpICYmIChzPXUuZmllbGQoZikpLmxlbmd0aCA+IDEgP1xuICAgIGZ1bmN0aW9uKHgsIHYpIHtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzLmxlbmd0aC0xOyArK2kpIHggPSB4W3NbaV1dO1xuICAgICAgeFtzW2ldXSA9IHY7XG4gICAgfSA6XG4gICAgZnVuY3Rpb24oeCwgdikgeyB4W2ZdID0gdjsgfTtcbn07XG5cblxudS4kZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIG9wKSB7XG4gIHJldHVybiBmdW5jdGlvbihmKSB7XG4gICAgZiA9IHUuJChmKSB8fCB1LmlkZW50aXR5O1xuICAgIHZhciBuID0gbmFtZSArICh1Lm5hbWUoZikgPyAnXycrdS5uYW1lKGYpIDogJycpO1xuICAgIHJldHVybiB1Lm5hbWVkZnVuYyhuLCBmdW5jdGlvbihkKSB7IHJldHVybiBvcChmKGQpKTsgfSk7XG4gIH07XG59O1xuXG51LiR2YWxpZCAgPSB1LiRmdW5jKCd2YWxpZCcsIHUuaXNWYWxpZCk7XG51LiRsZW5ndGggPSB1LiRmdW5jKCdsZW5ndGgnLCB1Lmxlbmd0aCk7XG5cbnUuJGluID0gZnVuY3Rpb24oZiwgdmFsdWVzKSB7XG4gIGYgPSB1LiQoZik7XG4gIHZhciBtYXAgPSB1LmlzQXJyYXkodmFsdWVzKSA/IHUudG9NYXAodmFsdWVzKSA6IHZhbHVlcztcbiAgcmV0dXJuIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICEhbWFwW2YoZCldOyB9O1xufTtcblxuLy8gY29tcGFyaXNvbiAvIHNvcnRpbmcgZnVuY3Rpb25zXG5cbnUuY29tcGFyYXRvciA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgdmFyIHNpZ24gPSBbXTtcbiAgaWYgKHNvcnQgPT09IHVuZGVmaW5lZCkgc29ydCA9IFtdO1xuICBzb3J0ID0gdS5hcnJheShzb3J0KS5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBzID0gMTtcbiAgICBpZiAgICAgIChmWzBdID09PSAnLScpIHsgcyA9IC0xOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIGVsc2UgaWYgKGZbMF0gPT09ICcrJykgeyBzID0gKzE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgc2lnbi5wdXNoKHMpO1xuICAgIHJldHVybiB1LmFjY2Vzc29yKGYpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBpLCBuLCBmLCB4LCB5O1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07IHggPSBmKGEpOyB5ID0gZihiKTtcbiAgICAgIGlmICh4IDwgeSkgcmV0dXJuIC0xICogc2lnbltpXTtcbiAgICAgIGlmICh4ID4geSkgcmV0dXJuIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGEgPj0gYikge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiBOYU47XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxudS5wYWQgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgcGFkY2hhcikge1xuICBwYWRjaGFyID0gcGFkY2hhciB8fCBcIiBcIjtcbiAgdmFyIGQgPSBsZW5ndGggLSBzLmxlbmd0aDtcbiAgaWYgKGQgPD0gMCkgcmV0dXJuIHM7XG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gc3RycmVwKGQsIHBhZGNoYXIpICsgcztcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gc3RycmVwKE1hdGguZmxvb3IoZC8yKSwgcGFkY2hhcikgK1xuICAgICAgICAgcyArIHN0cnJlcChNYXRoLmNlaWwoZC8yKSwgcGFkY2hhcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzICsgc3RycmVwKGQsIHBhZGNoYXIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJyZXAobiwgc3RyKSB7XG4gIHZhciBzID0gXCJcIiwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBzICs9IHN0cjtcbiAgcmV0dXJuIHM7XG59XG5cbnUudHJ1bmNhdGUgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgd29yZCwgZWxsaXBzaXMpIHtcbiAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICBpZiAobGVuIDw9IGxlbmd0aCkgcmV0dXJuIHM7XG4gIGVsbGlwc2lzID0gZWxsaXBzaXMgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhlbGxpcHNpcykgOiAnXFx1MjAyNic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIiwiXG5leHBvcnQgZW51bSBBZ2dyZWdhdGVPcCB7XG4gICAgVkFMVUVTID0gJ3ZhbHVlcycgYXMgYW55LFxuICAgIENPVU5UID0gJ2NvdW50JyBhcyBhbnksXG4gICAgVkFMSUQgPSAndmFsaWQnIGFzIGFueSxcbiAgICBNSVNTSU5HID0gJ21pc3NpbmcnIGFzIGFueSxcbiAgICBESVNUSU5DVCA9ICdkaXN0aW5jdCcgYXMgYW55LFxuICAgIFNVTSA9ICdzdW0nIGFzIGFueSxcbiAgICBNRUFOID0gJ21lYW4nIGFzIGFueSxcbiAgICBBVkVSQUdFID0gJ2F2ZXJhZ2UnIGFzIGFueSxcbiAgICBWQVJJQU5DRSA9ICd2YXJpYW5jZScgYXMgYW55LFxuICAgIFZBUklBTkNFUCA9ICd2YXJpYW5jZXAnIGFzIGFueSxcbiAgICBTVERFViA9ICdzdGRldicgYXMgYW55LFxuICAgIFNUREVWUCA9ICdzdGRldnAnIGFzIGFueSxcbiAgICBNRURJQU4gPSAnbWVkaWFuJyBhcyBhbnksXG4gICAgUTEgPSAncTEnIGFzIGFueSxcbiAgICBRMyA9ICdxMycgYXMgYW55LFxuICAgIE1PREVTS0VXID0gJ21vZGVza2V3JyBhcyBhbnksXG4gICAgTUlOID0gJ21pbicgYXMgYW55LFxuICAgIE1BWCA9ICdtYXgnIGFzIGFueSxcbiAgICBBUkdNSU4gPSAnYXJnbWluJyBhcyBhbnksXG4gICAgQVJHTUFYID0gJ2FyZ21heCcgYXMgYW55LFxufVxuXG5leHBvcnQgY29uc3QgQUdHUkVHQVRFX09QUyA9IFtcbiAgICBBZ2dyZWdhdGVPcC5WQUxVRVMsXG4gICAgQWdncmVnYXRlT3AuQ09VTlQsXG4gICAgQWdncmVnYXRlT3AuVkFMSUQsXG4gICAgQWdncmVnYXRlT3AuTUlTU0lORyxcbiAgICBBZ2dyZWdhdGVPcC5ESVNUSU5DVCxcbiAgICBBZ2dyZWdhdGVPcC5TVU0sXG4gICAgQWdncmVnYXRlT3AuTUVBTixcbiAgICBBZ2dyZWdhdGVPcC5BVkVSQUdFLFxuICAgIEFnZ3JlZ2F0ZU9wLlZBUklBTkNFLFxuICAgIEFnZ3JlZ2F0ZU9wLlZBUklBTkNFUCxcbiAgICBBZ2dyZWdhdGVPcC5TVERFVixcbiAgICBBZ2dyZWdhdGVPcC5TVERFVlAsXG4gICAgQWdncmVnYXRlT3AuTUVESUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLlExLFxuICAgIEFnZ3JlZ2F0ZU9wLlEzLFxuICAgIEFnZ3JlZ2F0ZU9wLk1PREVTS0VXLFxuICAgIEFnZ3JlZ2F0ZU9wLk1JTixcbiAgICBBZ2dyZWdhdGVPcC5NQVgsXG4gICAgQWdncmVnYXRlT3AuQVJHTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFSR01BWCxcbl07XG5cbmV4cG9ydCBjb25zdCBTSEFSRURfRE9NQUlOX09QUyA9IFtcbiAgICBBZ2dyZWdhdGVPcC5NRUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFWRVJBR0UsXG4gICAgQWdncmVnYXRlT3AuU1RERVYsXG4gICAgQWdncmVnYXRlT3AuU1RERVZQLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FRElBTixcbiAgICBBZ2dyZWdhdGVPcC5RMSxcbiAgICBBZ2dyZWdhdGVPcC5RMyxcbiAgICBBZ2dyZWdhdGVPcC5NSU4sXG4gICAgQWdncmVnYXRlT3AuTUFYLFxuXTtcblxuLy8gVE9ETzogbW92ZSBzdXBwb3J0ZWRUeXBlcywgc3VwcG9ydGVkRW51bXMgZnJvbSBzY2hlbWEgdG8gaGVyZVxuIiwiaW1wb3J0IHtDaGFubmVsLCBST1csIENPTFVNTiwgU0hBUEUsIFNJWkV9IGZyb20gJy4vY2hhbm5lbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvTWF4QmlucyhjaGFubmVsOiBDaGFubmVsKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSVpFOlxuICAgICAgLy8gRmFjZXRzIGFuZCBTaXplIHNob3VsZG4ndCBoYXZlIHRvbyBtYW55IGJpbnNcbiAgICAgIC8vIFdlIGNob29zZSA2IGxpa2Ugc2hhcGUgdG8gc2ltcGxpZnkgdGhlIHJ1bGVcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIDY7IC8vIFZlZ2EncyBcInNoYXBlXCIgaGFzIDYgZGlzdGluY3QgdmFsdWVzXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAxMDtcbiAgfVxufVxuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBlbmNvZGluZyBjaGFubmVscyAoVmlzdWFsIHZhcmlhYmxlcylcbiAqIHN1Y2ggYXMgJ3gnLCAneScsICdjb2xvcicuXG4gKi9cblxuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWluc30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFggPSAneCcgYXMgYW55LFxuICBZID0gJ3knIGFzIGFueSxcbiAgUk9XID0gJ3JvdycgYXMgYW55LFxuICBDT0xVTU4gPSAnY29sdW1uJyBhcyBhbnksXG4gIFNIQVBFID0gJ3NoYXBlJyBhcyBhbnksXG4gIFNJWkUgPSAnc2l6ZScgYXMgYW55LFxuICBDT0xPUiA9ICdjb2xvcicgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgREVUQUlMID0gJ2RldGFpbCcgYXMgYW55LFxuICBMQUJFTCA9ICdsYWJlbCcgYXMgYW55LFxuICBQQVRIID0gJ3BhdGgnIGFzIGFueSxcbiAgT1JERVIgPSAnb3JkZXInIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgWCA9IENoYW5uZWwuWDtcbmV4cG9ydCBjb25zdCBZID0gQ2hhbm5lbC5ZO1xuZXhwb3J0IGNvbnN0IFJPVyA9IENoYW5uZWwuUk9XO1xuZXhwb3J0IGNvbnN0IENPTFVNTiA9IENoYW5uZWwuQ09MVU1OO1xuZXhwb3J0IGNvbnN0IFNIQVBFID0gQ2hhbm5lbC5TSEFQRTtcbmV4cG9ydCBjb25zdCBTSVpFID0gQ2hhbm5lbC5TSVpFO1xuZXhwb3J0IGNvbnN0IENPTE9SID0gQ2hhbm5lbC5DT0xPUjtcbmV4cG9ydCBjb25zdCBURVhUID0gQ2hhbm5lbC5URVhUO1xuZXhwb3J0IGNvbnN0IERFVEFJTCA9IENoYW5uZWwuREVUQUlMO1xuZXhwb3J0IGNvbnN0IExBQkVMID0gQ2hhbm5lbC5MQUJFTDtcbmV4cG9ydCBjb25zdCBQQVRIID0gQ2hhbm5lbC5QQVRIO1xuZXhwb3J0IGNvbnN0IE9SREVSID0gQ2hhbm5lbC5PUkRFUjtcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxTID0gW1gsIFksIFJPVywgQ09MVU1OLCBTSVpFLCBTSEFQRSwgQ09MT1IsIFBBVEgsIE9SREVSLCBURVhULCBERVRBSUwsIExBQkVMXTtcblxuaW50ZXJmYWNlIFN1cHBvcnRlZE1hcmsge1xuICBwb2ludD86IGJvb2xlYW47XG4gIHRpY2s/OiBib29sZWFuO1xuICBjaXJjbGU/OiBib29sZWFuO1xuICBzcXVhcmU/OiBib29sZWFuO1xuICBiYXI/OiBib29sZWFuO1xuICBsaW5lPzogYm9vbGVhbjtcbiAgYXJlYT86IGJvb2xlYW47XG4gIHRleHQ/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgYSBwYXJ0aWN1bGFyIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsICBjaGFubmVsIG5hbWVcbiAqIEBwYXJhbSBtYXJrIHRoZSBtYXJrIHR5cGVcbiAqIEByZXR1cm4gd2hldGhlciB0aGUgbWFyayBzdXBwb3J0cyB0aGUgY2hhbm5lbFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydE1hcmsoY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyaykge1xuICByZXR1cm4gISFnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWwpW21hcmtdO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGRpY3Rpb25hcnkgc2hvd2luZyB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbFxuICogQHJldHVybiBBIGRpY3Rpb25hcnkgbWFwcGluZyBtYXJrIHR5cGVzIHRvIGJvb2xlYW4gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsOiBDaGFubmVsKTogU3VwcG9ydGVkTWFyayB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIERFVEFJTDpcbiAgICBjYXNlIE9SREVSOlxuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHsgLy8gYWxsIG1hcmtzXG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCBsaW5lOiB0cnVlLCBhcmVhOiB0cnVlLCB0ZXh0OiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCB0ZXh0OiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3BvaW50OiB0cnVlfTtcbiAgICBjYXNlIFRFWFQ6XG4gICAgICByZXR1cm4ge3RleHQ6IHRydWV9O1xuICAgIGNhc2UgUEFUSDpcbiAgICAgIHJldHVybiB7bGluZTogdHJ1ZX07XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG5pbnRlcmZhY2UgU3VwcG9ydGVkUm9sZSB7XG4gIG1lYXN1cmU6IGJvb2xlYW47XG4gIGRpbWVuc2lvbjogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGRpbWVuc2lvbiAvIG1lYXN1cmUgcm9sZVxuICogQHBhcmFtICBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIHJvbGUgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRSb2xlKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRSb2xlIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgTEFCRUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSEFQRTpcbiAgICBjYXNlIERFVEFJTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IHRydWUsXG4gICAgICAgIGRpbWVuc2lvbjogZmFsc2VcbiAgICAgIH07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogZmFsc2UsXG4gICAgICAgIGRpbWVuc2lvbjogdHJ1ZVxuICAgICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZW5jb2RpbmcgY2hhbm5lbCcgKyBjaGFubmVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1NjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgcmV0dXJuICFjb250YWlucyhbREVUQUlMLCBQQVRILCBURVhULCBMQUJFTCwgT1JERVJdLCBjaGFubmVsKTtcbn1cbiIsImltcG9ydCB7U3BlY30gZnJvbSAnLi4vc2NoZW1hL3NjaGVtYSc7XG5pbXBvcnQge0F4aXNQcm9wZXJ0aWVzfSBmcm9tICcuLi9zY2hlbWEvYXhpcy5zY2hlbWEnO1xuaW1wb3J0IHtMZWdlbmRQcm9wZXJ0aWVzfSBmcm9tICcuLi9zY2hlbWEvbGVnZW5kLnNjaGVtYSc7XG5pbXBvcnQge1NjYWxlfSBmcm9tICcuLi9zY2hlbWEvc2NhbGUuc2NoZW1hJztcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4uL3NjaGVtYS9lbmNvZGluZy5zY2hlbWEnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge2RlZmF1bHRDb25maWcsIENvbmZpZ30gZnJvbSAnLi4vc2NoZW1hL2NvbmZpZy5zY2hlbWEnO1xuXG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDT0xPUiwgU0hBUEUsIFNJWkUsIFRFWFQsIFBBVEgsIE9SREVSLCBDaGFubmVsLCBzdXBwb3J0TWFya30gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQgKiBhcyB2bEZpZWxkRGVmIGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7RmllbGRSZWZPcHRpb259IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtNYXJrLCBCQVIsIFRJQ0ssIFRFWFQgYXMgVEVYVE1BUkt9IGZyb20gJy4uL21hcmsnO1xuXG5pbXBvcnQge2dldEZ1bGxOYW1lLCBRVUFOVElUQVRJVkV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtkdXBsaWNhdGUsIGV4dGVuZCwgY29udGFpbnMsIG1lcmdlRGVlcH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7Y29tcGlsZU1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y29tcGlsZVN0YWNrUHJvcGVydGllcywgU3RhY2tQcm9wZXJ0aWVzfSBmcm9tICcuL3N0YWNrJztcbmltcG9ydCB7c2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlTWFwIHtcbiAgeD86IFNjYWxlO1xuICB5PzogU2NhbGU7XG4gIHJvdz86IFNjYWxlO1xuICBjb2x1bW4/OiBTY2FsZTtcbiAgY29sb3I/OiBTY2FsZTtcbiAgc2l6ZT86IFNjYWxlO1xuICBzaGFwZT86IFNjYWxlO1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBtb2RlbCBvZiBWZWdhLUxpdGUgc3BlY2lmaWNhdGlvbiBmb3IgdGhlIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuICBwcml2YXRlIF9zcGVjOiBTcGVjO1xuICBwcml2YXRlIF9zdGFjazogU3RhY2tQcm9wZXJ0aWVzO1xuXG4gIHByaXZhdGUgX3NjYWxlOiBTY2FsZU1hcDtcblxuICBwcml2YXRlIF9heGlzOiB7XG4gICAgeD86IEF4aXNQcm9wZXJ0aWVzO1xuICAgIHk/OiBBeGlzUHJvcGVydGllcztcbiAgICByb3c/OiBBeGlzUHJvcGVydGllcztcbiAgICBjb2x1bW4/OiBBeGlzUHJvcGVydGllcztcbiAgfTtcblxuICBwcml2YXRlIF9sZWdlbmQ6IHtcbiAgICBjb2xvcj86IExlZ2VuZFByb3BlcnRpZXM7XG4gICAgc2l6ZT86IExlZ2VuZFByb3BlcnRpZXM7XG4gICAgc2hhcGU/OiBMZWdlbmRQcm9wZXJ0aWVzO1xuICB9O1xuXG4gIHByaXZhdGUgX2NvbmZpZzogQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IFNwZWMpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7IC8vIEZvciBzZWxmLXJlZmVyZW5jZSBpbiBjaGlsZHJlbiBtZXRob2QuXG5cbiAgICB0aGlzLl9zcGVjID0gc3BlYztcblxuICAgIGNvbnN0IG1hcmsgPSB0aGlzLl9zcGVjLm1hcms7XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyB8fCB7fVxuICAgIC8vIEN1cnJlbnRseSB3ZSBoYXZlIGl0IHRvIHByZXZlbnQgbnVsbCBwb2ludGVyIGV4Y2VwdGlvbi5cbiAgICBjb25zdCBlbmNvZGluZyA9IHRoaXMuX3NwZWMuZW5jb2RpbmcgPSB0aGlzLl9zcGVjLmVuY29kaW5nIHx8IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZyA9IG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHNwZWMuY29uZmlnKTtcblxuICAgIHZsRW5jb2RpbmcuZm9yRWFjaCh0aGlzLl9zcGVjLmVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmICghc3VwcG9ydE1hcmsoY2hhbm5lbCwgdGhpcy5fc3BlYy5tYXJrKSkge1xuICAgICAgICAvLyBEcm9wIHVuc3VwcG9ydGVkIGNoYW5uZWxcblxuICAgICAgICAvLyBGSVhNRSBjb25zb2xpZGF0ZSB3YXJuaW5nIG1ldGhvZFxuICAgICAgICBjb25zb2xlLndhcm4oY2hhbm5lbCwgJ2Ryb3BwZWQgYXMgaXQgaXMgaW5jb21wYXRpYmxlIHdpdGgnLCB0aGlzLl9zcGVjLm1hcmspO1xuICAgICAgICBkZWxldGUgdGhpcy5fc3BlYy5lbmNvZGluZ1tjaGFubmVsXS5maWVsZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoY2hhbm5lbCA9PT0gUEFUSCB8fCBjaGFubmVsID09PSBPUkRFUikgJiYgIWZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJiBmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgZmllbGREZWYuYWdncmVnYXRlID0gQWdncmVnYXRlT3AuTUlOO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBTY2FsZVxuXG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLl9zY2FsZSA9IFtYLCBZLCBDT0xPUiwgU0hBUEUsIFNJWkUsIFJPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX3NjYWxlLCBjaGFubmVsKSB7XG4gICAgICAvLyBQb3NpdGlvbiBBeGlzXG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxTY2FsZSA9IGVuY29kaW5nW2NoYW5uZWxdLnNjYWxlIHx8IHt9O1xuICAgICAgICBjb25zdCBjaGFubmVsRGVmID0gZW5jb2RpbmdbY2hhbm5lbF07XG5cbiAgICAgICAgY29uc3QgX3NjYWxlVHlwZSA9IHNjYWxlVHlwZShjaGFubmVsU2NhbGUsIGNoYW5uZWxEZWYsIGNoYW5uZWwsIG1hcmspO1xuXG4gICAgICAgIGlmIChjb250YWlucyhbUk9XLCBDT0xVTU5dLCBjaGFubmVsKSkge1xuICAgICAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICAgICAgdHlwZTogX3NjYWxlVHlwZSxcbiAgICAgICAgICAgICAgcm91bmQ6IGNvbmZpZy5mYWNldC5zY2FsZS5yb3VuZCxcbiAgICAgICAgICAgICAgcGFkZGluZzogKGNoYW5uZWwgPT09IFJPVyAmJiBtb2RlbC5oYXMoWSkpIHx8IChjaGFubmVsID09PSBDT0xVTU4gJiYgbW9kZWwuaGFzKFgpKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mYWNldC5zY2FsZS5wYWRkaW5nIDogMFxuICAgICAgICAgICAgfSwgY2hhbm5lbFNjYWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgICAgdHlwZTogX3NjYWxlVHlwZSxcbiAgICAgICAgICAgIHJvdW5kOiBjb25maWcuc2NhbGUucm91bmQsXG4gICAgICAgICAgICBwYWRkaW5nOiBjb25maWcuc2NhbGUucGFkZGluZyxcbiAgICAgICAgICAgIHVzZVJhd0RvbWFpbjogY29uZmlnLnNjYWxlLnVzZVJhd0RvbWFpbixcbiAgICAgICAgICAgIGJhbmRTaXplOiBjaGFubmVsID09PSBYICYmIF9zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIG1hcmsgPT09IFRFWFRNQVJLID9cbiAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNjYWxlLnRleHRCYW5kV2lkdGggOiBjb25maWcuc2NhbGUuYmFuZFNpemVcbiAgICAgICAgICB9LCBjaGFubmVsU2NhbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NjYWxlO1xuICAgIH0sIHt9KTtcblxuICAgIC8vIEluaXRpYWxpemUgQXhpc1xuICAgIHRoaXMuX2F4aXMgPSBbWCwgWSwgUk9XLCBDT0xVTU5dLnJlZHVjZShmdW5jdGlvbihfYXhpcywgY2hhbm5lbCkge1xuICAgICAgLy8gUG9zaXRpb24gQXhpc1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgICBjb25zdCBjaGFubmVsQXhpcyA9IGVuY29kaW5nW2NoYW5uZWxdLmF4aXM7XG4gICAgICAgIGlmIChjaGFubmVsQXhpcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBfYXhpc1tjaGFubmVsXSA9IGV4dGVuZCh7fSxcbiAgICAgICAgICAgIGNoYW5uZWwgPT09IFggfHwgY2hhbm5lbCA9PT0gWSA/IGNvbmZpZy5heGlzIDogY29uZmlnLmZhY2V0LmF4aXMsXG4gICAgICAgICAgICBjaGFubmVsQXhpcyA9PT0gdHJ1ZSA/IHt9IDogY2hhbm5lbEF4aXMgfHwgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9heGlzO1xuICAgIH0sIHt9KTtcblxuICAgIC8vIGluaXRpYWxpemUgbGVnZW5kXG4gICAgdGhpcy5fbGVnZW5kID0gW0NPTE9SLCBTSEFQRSwgU0laRV0ucmVkdWNlKGZ1bmN0aW9uKF9sZWdlbmQsIGNoYW5uZWwpIHtcbiAgICAgIGlmICh2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3QgY2hhbm5lbExlZ2VuZCA9IGVuY29kaW5nW2NoYW5uZWxdLmxlZ2VuZDtcbiAgICAgICAgaWYgKGNoYW5uZWxMZWdlbmQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2xlZ2VuZFtjaGFubmVsXSA9IGV4dGVuZCh7fSwgY29uZmlnLmxlZ2VuZCxcbiAgICAgICAgICAgIGNoYW5uZWxMZWdlbmQgPT09IHRydWUgPyB7fSA6IGNoYW5uZWxMZWdlbmQgfHwgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9sZWdlbmQ7XG4gICAgfSwge30pO1xuXG4gICAgLy8gY2FsY3VsYXRlIHN0YWNrXG4gICAgdGhpcy5fc3RhY2sgPSBjb21waWxlU3RhY2tQcm9wZXJ0aWVzKG1hcmssIGVuY29kaW5nLCBzY2FsZSwgY29uZmlnKTtcbiAgICB0aGlzLl9jb25maWcubWFyayA9IGNvbXBpbGVNYXJrQ29uZmlnKG1hcmssIGVuY29kaW5nLCBjb25maWcsIHRoaXMuX3N0YWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFjaygpOiBTdGFja1Byb3BlcnRpZXMge1xuICAgIHJldHVybiB0aGlzLl9zdGFjaztcbiAgfVxuXG4gIHB1YmxpYyB0b1NwZWMoZXhjbHVkZUNvbmZpZz8sIGV4Y2x1ZGVEYXRhPykge1xuICAgIGNvbnN0IGVuY29kaW5nID0gZHVwbGljYXRlKHRoaXMuX3NwZWMuZW5jb2RpbmcpO1xuICAgIGxldCBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fc3BlYy5tYXJrLFxuICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgfTtcblxuICAgIGlmICghZXhjbHVkZUNvbmZpZykge1xuICAgICAgc3BlYy5jb25maWcgPSBkdXBsaWNhdGUodGhpcy5fc3BlYy5jb25maWcpO1xuICAgIH1cblxuICAgIGlmICghZXhjbHVkZURhdGEpIHtcbiAgICAgIHNwZWMuZGF0YSA9IGR1cGxpY2F0ZSh0aGlzLl9zcGVjLmRhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgcHVibGljIGNlbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5pc0ZhY2V0KCkgPyB0aGlzLmNvbmZpZygpLmZhY2V0LmNlbGwud2lkdGggOiBudWxsKSB8fFxuICAgICAgdGhpcy5jb25maWcoKS5jZWxsLndpZHRoO1xuICB9XG5cbiAgcHVibGljIGNlbGxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuaXNGYWNldCgpID8gdGhpcy5jb25maWcoKS5mYWNldC5jZWxsLmhlaWdodCA6IG51bGwpIHx8XG4gICAgICB0aGlzLmNvbmZpZygpLmNlbGwuaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIG1hcmsoKTogTWFyayB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWMubWFyaztcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZVxuICBwdWJsaWMgc3BlYygpOiBTcGVjIHtcbiAgICByZXR1cm4gdGhpcy5fc3BlYztcbiAgfVxuXG4gIHB1YmxpYyBpcyhtYXJrOiBNYXJrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWMubWFyayA9PT0gbWFyaztcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLmhhcyh0aGlzLl9zcGVjLmVuY29kaW5nLCBjaGFubmVsKTtcbiAgfVxuXG4gIHB1YmxpYyBlbmNvZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BlYy5lbmNvZGluZztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHx8IHt9XG4gICAgLy8gQ3VycmVudGx5IHdlIGhhdmUgaXQgdG8gcHJldmVudCBudWxsIHBvaW50ZXIgZXhjZXB0aW9uLlxuICAgIHJldHVybiB0aGlzLl9zcGVjLmVuY29kaW5nW2NoYW5uZWxdIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlKGNoYW5uZWwpO1xuXG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogc2NhbGVUeXBlKHNjYWxlLCBmaWVsZERlZiwgY2hhbm5lbCwgdGhpcy5tYXJrKCkpID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgIH0sIG9wdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZsRmllbGREZWYuZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgZmllbGRUaXRsZShjaGFubmVsOiBDaGFubmVsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmxGaWVsZERlZi50aXRsZSh0aGlzLl9zcGVjLmVuY29kaW5nW2NoYW5uZWxdKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpOiBDaGFubmVsW10ge1xuICAgIHJldHVybiB2bEVuY29kaW5nLmNoYW5uZWxzKHRoaXMuX3NwZWMuZW5jb2RpbmcpO1xuICB9XG5cbiAgcHVibGljIG1hcChmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBlOiBFbmNvZGluZykgPT4gYW55LCB0PzogYW55KSB7XG4gICAgcmV0dXJuIHZsRW5jb2RpbmcubWFwKHRoaXMuX3NwZWMuZW5jb2RpbmcsIGYsIHQpO1xuICB9XG5cbiAgcHVibGljIHJlZHVjZShmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgZTogRW5jb2RpbmcpID0+IGFueSwgaW5pdCwgdD86IGFueSkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLnJlZHVjZSh0aGlzLl9zcGVjLmVuY29kaW5nLCBmLCBpbml0LCB0KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoKGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6bnVtYmVyKSA9PiB2b2lkLCB0PzogYW55KSB7XG4gICAgdmxFbmNvZGluZy5mb3JFYWNoKHRoaXMuX3NwZWMuZW5jb2RpbmcsIGYsIHQpO1xuICB9XG5cbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFzKGNoYW5uZWwpICYmIHNjYWxlVHlwZShzY2FsZSwgZmllbGREZWYsIGNoYW5uZWwsIHRoaXMubWFyaygpKSA9PT0gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cblxuICBwdWJsaWMgaXNEaW1lbnNpb24oY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIHJldHVybiB2bEZpZWxkRGVmLmlzRGltZW5zaW9uKHRoaXMuZmllbGREZWYoY2hhbm5lbCkpO1xuICB9XG5cbiAgcHVibGljIGlzTWVhc3VyZShjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIHZsRmllbGREZWYuaXNNZWFzdXJlKHRoaXMuZmllbGREZWYoY2hhbm5lbCkpO1xuICB9XG5cbiAgcHVibGljIGlzQWdncmVnYXRlKCkge1xuICAgIHJldHVybiB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHRoaXMuX3NwZWMuZW5jb2RpbmcpO1xuICB9XG5cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKFJPVykgfHwgdGhpcy5oYXMoQ09MVU1OKTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNBZ2dyZWdhdGUoKSA/IFNVTU1BUlkgOiBTT1VSQ0U7XG4gIH1cblxuICBwdWJsaWMgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BlYy5kYXRhO1xuICB9XG5cbiAgcHVibGljIHRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BlYy50cmFuc2Zvcm0gfHwge307XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzcGVjIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwdWJsaWMgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwdWJsaWMgc29ydChjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWMuZW5jb2RpbmdbY2hhbm5lbF0uc29ydDtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZShjaGFubmVsOiBDaGFubmVsKTogU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZVtjaGFubmVsXTtcbiAgfVxuXG4gIHB1YmxpYyBheGlzKGNoYW5uZWw6IENoYW5uZWwpOiBBeGlzUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX2F4aXNbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgbGVnZW5kKGNoYW5uZWw6IENoYW5uZWwpOiBMZWdlbmRQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnZW5kW2NoYW5uZWxdO1xuICB9XG5cbiAgLyoqIHJldHVybnMgc2NhbGUgbmFtZSBmb3IgYSBnaXZlbiBjaGFubmVsICovXG4gIHB1YmxpYyBzY2FsZU5hbWUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuc3BlYygpLm5hbWU7XG4gICAgcmV0dXJuIChuYW1lID8gbmFtZSArICctJyA6ICcnKSArIGNoYW5uZWw7XG4gIH1cblxuICBwdWJsaWMgc2l6ZVZhbHVlKGNoYW5uZWw6IENoYW5uZWwgPSBTSVpFKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKFNJWkUpO1xuICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgcmV0dXJuIGZpZWxkRGVmLnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IHNjYWxlQ29uZmlnID0gdGhpcy5jb25maWcoKS5zY2FsZTtcblxuICAgIHN3aXRjaCAodGhpcy5tYXJrKCkpIHtcbiAgICAgIGNhc2UgVEVYVE1BUks6XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZygpLm1hcmsuZm9udFNpemU7IC8vIGZvbnQgc2l6ZSAxMCBieSBkZWZhdWx0XG4gICAgICBjYXNlIEJBUjpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnKCkubWFyay5iYXJTaXplKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnKCkubWFyay5iYXJTaXplO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJBUidzIHNpemUgaXMgYXBwbGllZCBvbiBlaXRoZXIgWCBvciBZXG4gICAgICAgIHJldHVybiB0aGlzLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpID9cbiAgICAgICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIG9yIHNpbmdsZSBiYXIsIHdlIGNhbiB1c2UgYmFuZFNpemUgLSAxXG4gICAgICAgICAgICAvLyAoLTEgc28gdGhhdCB0aGUgYm9yZGVyIG9mIHRoZSBiYXIgZmFsbHMgb24gZXhhY3QgcGl4ZWwpXG4gICAgICAgICAgICB0aGlzLnNjYWxlKGNoYW5uZWwpLmJhbmRTaXplIC0gMSA6XG4gICAgICAgICAgIXRoaXMuaGFzKGNoYW5uZWwpID9cbiAgICAgICAgICAgIHNjYWxlQ29uZmlnLmJhbmRTaXplIC0gMSA6XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIHNldCB0byB0aGluQmFyV2lkdGggYnkgZGVmYXVsdFxuICAgICAgICAgICAgdGhpcy5jb25maWcoKS5tYXJrLmJhclRoaW5TaXplO1xuICAgICAgY2FzZSBUSUNLOlxuICAgICAgICBpZiAodGhpcy5jb25maWcoKS5tYXJrLnRpY2tTaXplKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnKCkubWFyay50aWNrU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYW5kU2l6ZSA9IHRoaXMuaGFzKGNoYW5uZWwpID9cbiAgICAgICAgICB0aGlzLnNjYWxlKGNoYW5uZWwpLmJhbmRTaXplIDpcbiAgICAgICAgICBzY2FsZUNvbmZpZy5iYW5kU2l6ZTtcbiAgICAgICAgcmV0dXJuIGJhbmRTaXplIC8gMS41O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcoKS5tYXJrLnNpemU7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kLCB0cnVuY2F0ZX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtBeGlzT3JpZW50fSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge2Zvcm1hdE1peGluc30gZnJvbSAnLi91dGlsJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIGxldCBleHBvcnRzO1xuXG4vKipcbiAqIE1ha2UgYW4gaW5uZXIgYXhpcyBmb3Igc2hvd2luZyBncmlkIGZvciBzaGFyZWQgYXhpcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVJbm5lckF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IGlzQ29sID0gY2hhbm5lbCA9PT0gQ09MVU1OLFxuICAgIGlzUm93ID0gY2hhbm5lbCA9PT0gUk9XLFxuICAgIHR5cGUgPSBpc0NvbCA/ICd4JyA6IGlzUm93ID8gJ3knOiBjaGFubmVsO1xuXG4gIC8vIFRPRE86IHN1cHBvcnQgYWRkaW5nIHRpY2tzIGFzIHdlbGxcblxuICAvLyBUT0RPOiByZXBsYWNlIGFueSB3aXRoIFZlZ2EgQXhpcyBJbnRlcmZhY2VcbiAgbGV0IGRlZiA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgZ3JpZDogdHJ1ZSxcbiAgICB0aWNrU2l6ZTogMCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsYWJlbHM6IHtcbiAgICAgICAgdGV4dDoge3ZhbHVlOicnfVxuICAgICAgfSxcbiAgICAgIGF4aXM6IHtcbiAgICAgICAgc3Ryb2tlOiB7dmFsdWU6ICd0cmFuc3BhcmVudCd9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gIFsnbGF5ZXInLCAndGlja3MnLCAndmFsdWVzJywgJ3N1YmRpdmlkZSddLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBsZXQgbWV0aG9kOiAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWY6YW55KT0+YW55O1xuXG4gICAgY29uc3QgdmFsdWUgPSAobWV0aG9kID0gZXhwb3J0c1twcm9wZXJ0eV0pID9cbiAgICAgICAgICAgICAgICAgIC8vIGNhbGxpbmcgYXhpcy5mb3JtYXQsIGF4aXMuZ3JpZCwgLi4uXG4gICAgICAgICAgICAgICAgICBtZXRob2QobW9kZWwsIGNoYW5uZWwsIGRlZikgOlxuICAgICAgICAgICAgICAgICAgYXhpc1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbClcbiAgfTtcblxuICAvLyBmb3JtYXQgbWl4aW5zIChhZGQgZm9ybWF0IGFuZCBmb3JtYXRUeXBlKVxuICBleHRlbmQoZGVmLCBmb3JtYXRNaXhpbnMobW9kZWwsIGNoYW5uZWwsIG1vZGVsLmF4aXMoY2hhbm5lbCkuZm9ybWF0KSk7XG5cbiAgLy8gMS4yLiBBZGQgcHJvcGVydGllc1xuICBbXG4gICAgLy8gYSkgcHJvcGVydGllcyB3aXRoIHNwZWNpYWwgcnVsZXMgKHNvIGl0IGhhcyBheGlzW3Byb3BlcnR5XSBtZXRob2RzKSAtLSBjYWxsIHJ1bGUgZnVuY3Rpb25zXG4gICAgJ2dyaWQnLCAnbGF5ZXInLCAnb2Zmc2V0JywgJ29yaWVudCcsICd0aWNrU2l6ZScsICd0aWNrcycsICd0aXRsZScsXG4gICAgLy8gYikgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzLCBvbmx5IHByb2R1Y2UgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIHNjaGVtYSwgb3IgZXhwbGljaXQgdmFsdWUgaWYgc3BlY2lmaWVkXG4gICAgJ3RpY2tQYWRkaW5nJywgJ3RpY2tTaXplJywgJ3RpY2tTaXplTWFqb3InLCAndGlja1NpemVNaW5vcicsICd0aWNrU2l6ZUVuZCcsXG4gICAgJ3RpdGxlT2Zmc2V0JywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgW1xuICAgICdheGlzJywgJ2xhYmVscycsIC8vIGhhdmUgc3BlY2lhbCBydWxlc1xuICAgICdncmlkJywgJ3RpdGxlJywgJ3RpY2tzJywgJ21ham9yVGlja3MnLCAnbWlub3JUaWNrcycgLy8gb25seSBkZWZhdWx0IHZhbHVlc1xuICBdLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5vZmZzZXQ7XG59XG5cbi8vIFRPRE86IHdlIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBtZXRob2QgYWZ0ZXIgd2UgdGFrZSBjYXJlIG9mIGNvbmZpZyByZWZhY3RvcmluZ1xuLyoqXG4gKiBEZWZhdWx0IHJ1bGVzIGZvciB3aGV0aGVyIHRvIHNob3cgYSBncmlkIHNob3VsZCBiZSBzaG93biBmb3IgYSBjaGFubmVsLlxuICogSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIG9yZGluYWwgc2NhbGVzIHRoYXQgYXJlIG5vdCBiaW5uZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRTaG93KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBncmlkID0gbW9kZWwuYXhpcyhjaGFubmVsKS5ncmlkO1xuICBpZiAoZ3JpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICByZXR1cm4gIW1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIG5ldmVyIGFwcGx5IGdyaWQgZm9yIFJPVyBhbmQgQ09MVU1OIHNpbmNlIHdlIG1hbnVhbGx5IGNyZWF0ZSBydWxlLWdyb3VwIGZvciB0aGVtXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBncmlkU2hvdyhtb2RlbCwgY2hhbm5lbCkgJiYgKFxuICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBjbGVhbmx5IC0tIGVzc2VudGlhbGx5IHRoZSBjb25kaXRpb24gYmVsb3cgaXMgd2hldGhlclxuICAgIC8vIHRoZSBheGlzIGlzIGEgc2hhcmVkIC8gdW5pb24gYXhpcy5cbiAgICAoY2hhbm5lbCA9PT0gWSB8fCBjaGFubmVsID09PSBYKSAmJiAhKG1vZGVsLmhhcyhDT0xVTU4pIHx8IG1vZGVsLmhhcyhST1cpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXIobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWYpIHtcbiAgY29uc3QgbGF5ZXIgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmxheWVyO1xuICBpZiAobGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICBpZiAoZGVmLmdyaWQpIHtcbiAgICAvLyBpZiBncmlkIGlzIHRydWUsIG5lZWQgdG8gcHV0IGxheWVyIG9uIHRoZSBiYWNrIHNvIHRoYXQgZ3JpZCBpcyBiZWhpbmQgbWFya3NcbiAgICByZXR1cm4gJ2JhY2snO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIG90aGVyd2lzZSByZXR1cm4gdW5kZWZpbmVkIGFuZCB1c2UgVmVnYSdzIGRlZmF1bHQuXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3JpZW50KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBvcmllbnQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLm9yaWVudDtcbiAgaWYgKG9yaWVudCkge1xuICAgIHJldHVybiBvcmllbnQ7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gRklYTUUgdGVzdCBhbmQgZGVjaWRlXG4gICAgcmV0dXJuIEF4aXNPcmllbnQuVE9QO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFJPVykge1xuICAgIGlmIChtb2RlbC5oYXMoWSkgJiYgbW9kZWwuYXhpcyhZKS5vcmllbnQgIT09IEF4aXNPcmllbnQuUklHSFQpIHtcbiAgICAgIHJldHVybiBBeGlzT3JpZW50LlJJR0hUO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tzID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrcztcbiAgaWYgKHRpY2tzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICAvLyBGSVhNRSBkZXBlbmRzIG9uIHNjYWxlIHR5cGUgdG9vXG4gIGlmIChjaGFubmVsID09PSBYICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW4pIHtcbiAgICAvLyBWZWdhJ3MgZGVmYXVsdCB0aWNrcyBvZnRlbiBsZWFkIHRvIGEgbG90IG9mIGxhYmVsIG9jY2x1c2lvbiBvbiBYIHdpdGhvdXQgOTAgZGVncmVlIHJvdGF0aW9uXG4gICAgcmV0dXJuIDU7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZTtcbiAgaWYgKHRpY2tTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja1NpemU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICBpZiAoYXhpcy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGF4aXMudGl0bGU7XG4gIH1cblxuICAvLyBpZiBub3QgZGVmaW5lZCwgYXV0b21hdGljYWxseSBkZXRlcm1pbmUgYXhpcyB0aXRsZSBmcm9tIGZpZWxkIGRlZlxuICBjb25zdCBmaWVsZFRpdGxlID0gbW9kZWwuZmllbGRUaXRsZShjaGFubmVsKTtcblxuICBsZXQgbWF4TGVuZ3RoO1xuICBpZiAoYXhpcy50aXRsZU1heExlbmd0aCkge1xuICAgIG1heExlbmd0aCA9IGF4aXMudGl0bGVNYXhMZW5ndGg7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWCAmJiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoWCkpIHtcbiAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUsIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZSwgd2UgY2FuIGd1ZXNzIG1heCBsZW5ndGhcbiAgICBtYXhMZW5ndGggPSBtb2RlbC5jZWxsV2lkdGgoKSAvIG1vZGVsLmF4aXMoWCkuY2hhcmFjdGVyV2lkdGg7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gWSAmJiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoWSkpIHtcbiAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUsIHdlIGtub3cgY2VsbCBzaXplIGF0IGNvbXBpbGUgdGltZSwgd2UgY2FuIGd1ZXNzIG1heCBsZW5ndGhcbiAgICBtYXhMZW5ndGggPSBtb2RlbC5jZWxsSGVpZ2h0KCkgLyBtb2RlbC5heGlzKFkpLmNoYXJhY3RlcldpZHRoO1xuICB9XG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuYXhpc1dpZHRoICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMuYXhpc1dpZHRofSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBsYWJlbHNTcGVjLCBkZWYpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgaWYgKCFheGlzLmxhYmVscykge1xuICAgICAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICAgIHRleHQ6ICcnXG4gICAgICB9LCBsYWJlbHNTcGVjKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSAmJiBheGlzLmxhYmVsTWF4TGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPIHJlcGxhY2UgdGhpcyB3aXRoIFZlZ2EncyBsYWJlbE1heExlbmd0aCBvbmNlIGl0IGlzIGludHJvZHVjZWRcbiAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bS5kYXRhIHwgdHJ1bmNhdGU6JyArIGF4aXMubGFiZWxNYXhMZW5ndGggKyAnfX0nXG4gICAgICAgIH1cbiAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgIH1cblxuICAgIC8vIExhYmVsIEFuZ2xlXG4gICAgaWYgKGF4aXMubGFiZWxBbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiBheGlzLmxhYmVsQW5nbGV9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdXRvIHJvdGF0ZSBmb3IgWCBhbmQgUm93XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gWCAmJiAobW9kZWwuaXNEaW1lbnNpb24oWCkgfHwgZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuYW5nbGUgPSB7dmFsdWU6IDI3MH07XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFJPVyAmJiBtb2RlbC5oYXMoWCkpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogZGVmLm9yaWVudCA9PT0gJ2xlZnQnID8gMjcwIDogOTB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQWxpZ24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogYXhpcy5sYWJlbEFsaWdufTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXV0byBzZXQgYWxpZ24gaWYgcm90YXRlZFxuICAgICAgLy8gVE9ETzogY29uc2lkZXIgb3RoZXIgdmFsdWUgYmVzaWRlcyAyNzAsIDkwXG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZWYub3JpZW50ID09PSAndG9wJyA/ICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICBkZWYudHlwZSA9PT0gJ3gnID8gJ3JpZ2h0JyA6XG4gICAgICAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogJ2NlbnRlcid9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGFiZWxCYXNlbGluZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmJhc2VsaW5lID0ge3ZhbHVlOiBheGlzLmxhYmVsQmFzZWxpbmV9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICAvLyBBdXRvIHNldCBiYXNlbGluZSBpZiByb3RhdGVkXG4gICAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogZGVmLnR5cGUgPT09ICd4JyA/ICdtaWRkbGUnIDogJ2JvdHRvbSd9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogJ2JvdHRvbSd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVsc1NwZWMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBmb3IgY29tcGlsaW5nIFZlZ2EtbGl0ZSBzcGVjIGludG8gVmVnYSBzcGVjLlxuICovXG5pbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcblxuaW1wb3J0IHtjb21waWxlQXhpc30gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7Y29tcGlsZURhdGF9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge2NvbXBpbGVMYXlvdXREYXRhfSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge2ZhY2V0TWl4aW5zfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7Y29tcGlsZUxlZ2VuZHN9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7Y29tcGlsZU1hcmt9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2NvbXBpbGVTY2FsZXN9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHthcHBseUNvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZfSBmcm9tICcuLi9jaGFubmVsJztcblxuZXhwb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKHNwZWMpIHtcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoc3BlYyk7XG4gIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gIC8vIFRPRE86IGNoYW5nZSB0eXBlIHRvIGJlY29tZSBWZ1NwZWNcbiAgY29uc3Qgb3V0cHV0ID0gZXh0ZW5kKFxuICAgIHNwZWMubmFtZSA/IHsgbmFtZTogc3BlYy5uYW1lIH0gOiB7fSxcbiAgICB7XG4gICAgICAvLyBTZXQgc2l6ZSB0byAxIGJlY2F1c2Ugd2UgcmVseSBvbiBwYWRkaW5nIGFueXdheVxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBwYWRkaW5nOiAnYXV0bydcbiAgICB9LFxuICAgIGNvbmZpZy52aWV3cG9ydCA/IHsgdmlld3BvcnQ6IGNvbmZpZy52aWV3cG9ydCB9IDoge30sXG4gICAgY29uZmlnLmJhY2tncm91bmQgPyB7IGJhY2tncm91bmQ6IGNvbmZpZy5iYWNrZ3JvdW5kIH0gOiB7fSxcbiAgICB7XG4gICAgICBkYXRhOiBjb21waWxlRGF0YShtb2RlbCkuY29uY2F0KFtjb21waWxlTGF5b3V0RGF0YShtb2RlbCldKSxcbiAgICAgIG1hcmtzOiBbY29tcGlsZVJvb3RHcm91cChtb2RlbCldXG4gICAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzcGVjOiBvdXRwdXRcbiAgICAvLyBUT0RPOiBhZGQgd2FybmluZyAvIGVycm9ycyBoZXJlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlUm9vdEdyb3VwKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBzcGVjID0gbW9kZWwuc3BlYygpO1xuXG4gIGxldCByb290R3JvdXA6YW55ID0gZXh0ZW5kKHtcbiAgICAgIG5hbWU6IHNwZWMubmFtZSA/IHNwZWMubmFtZSArICctcm9vdCcgOiAncm9vdCcsXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIH0sXG4gICAgc3BlYy5kZXNjcmlwdGlvbiA/IHtkZXNjcmlwdGlvbjogc3BlYy5kZXNjcmlwdGlvbn0gOiB7fSxcbiAgICB7XG4gICAgICBmcm9tOiB7ZGF0YTogTEFZT1VUfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHtmaWVsZDogJ3dpZHRoJ30sXG4gICAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6ICdoZWlnaHQnfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgY29uc3QgbWFya3MgPSBjb21waWxlTWFyayhtb2RlbCk7XG5cbiAgLy8gU21hbGwgTXVsdGlwbGVzXG4gIGlmIChtb2RlbC5oYXMoUk9XKSB8fCBtb2RlbC5oYXMoQ09MVU1OKSkge1xuICAgIC8vIHB1dCB0aGUgbWFya3MgaW5zaWRlIGEgZmFjZXQgY2VsbCdzIGdyb3VwXG4gICAgZXh0ZW5kKHJvb3RHcm91cCwgZmFjZXRNaXhpbnMobW9kZWwsIG1hcmtzKSk7XG4gIH0gZWxzZSB7XG4gICAgYXBwbHlDb25maWcocm9vdEdyb3VwLnByb3BlcnRpZXMudXBkYXRlLCBtb2RlbC5jb25maWcoKS5jZWxsLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gICAgcm9vdEdyb3VwLm1hcmtzID0gbWFya3M7XG4gICAgcm9vdEdyb3VwLnNjYWxlcyA9IGNvbXBpbGVTY2FsZXMobW9kZWwuY2hhbm5lbHMoKSwgbW9kZWwpO1xuXG4gICAgY29uc3QgYXhlcyA9IChtb2RlbC5oYXMoWCkgJiYgbW9kZWwuYXhpcyhYKSA/IFtjb21waWxlQXhpcyhYLCBtb2RlbCldIDogW10pXG4gICAgICAuY29uY2F0KG1vZGVsLmhhcyhZKSAmJiBtb2RlbC5heGlzKFkpID8gW2NvbXBpbGVBeGlzKFksIG1vZGVsKV0gOiBbXSk7XG4gICAgaWYgKGF4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcm9vdEdyb3VwLmF4ZXMgPSBheGVzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxlZ2VuZHMgKHNpbWlsYXIgZm9yIGVpdGhlciBmYWNldHMgb3Igbm9uLWZhY2V0c1xuICBjb25zdCBsZWdlbmRzID0gY29tcGlsZUxlZ2VuZHMobW9kZWwpO1xuICBpZiAobGVnZW5kcy5sZW5ndGggPiAwKSB7XG4gICAgcm9vdEdyb3VwLmxlZ2VuZHMgPSBsZWdlbmRzO1xuICB9XG4gIHJldHVybiByb290R3JvdXA7XG59XG4iLCJpbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9zY2hlbWEvZW5jb2Rpbmcuc2NoZW1hJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9zY2hlbWEvY29uZmlnLnNjaGVtYSc7XG5pbXBvcnQge1N0YWNrUHJvcGVydGllc30gZnJvbSAnLi9zdGFjayc7XG5cbmltcG9ydCB7WCwgWSwgREVUQUlMfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7aXNBZ2dyZWdhdGUsIGhhc30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7UE9JTlQsIExJTkUsIFRJQ0ssIENJUkNMRSwgU1FVQVJFLCBNYXJrfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQXVnbWVudCBjb25maWcubWFyayB3aXRoIHJ1bGUtYmFzZWQgZGVmYXVsdCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTWFya0NvbmZpZyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnLCBzdGFjazogU3RhY2tQcm9wZXJ0aWVzKSB7XG4gICByZXR1cm4gZXh0ZW5kKFxuICAgICBbJ2ZpbGxlZCcsICdvcGFjaXR5JywgJ29yaWVudCcsICdhbGlnbiddLnJlZHVjZShmdW5jdGlvbihjZmcsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZy5tYXJrW3Byb3BlcnR5XTtcbiAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICBjYXNlICdmaWxsZWQnOlxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgIC8vIFBvaW50IGFuZCBsaW5lIGFyZSBub3QgZmlsbGVkIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gbWFyayAhPT0gUE9JTlQgJiYgbWFyayAhPT0gTElORTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBjb250YWlucyhbUE9JTlQsIFRJQ0ssIENJUkNMRSwgU1FVQVJFXSwgbWFyaykpIHtcbiAgICAgICAgICAgICAvLyBwb2ludC1iYXNlZCBtYXJrcyBhbmQgYmFyXG4gICAgICAgICAgICAgaWYgKCFpc0FnZ3JlZ2F0ZShlbmNvZGluZykgfHwgaGFzKGVuY29kaW5nLCBERVRBSUwpKSB7XG4gICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gMC43O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgJ29yaWVudCc6XG4gICAgICAgICAgIGlmIChzdGFjaykge1xuICAgICAgICAgICAgIC8vIEZvciBzdGFja2VkIGNoYXJ0LCBleHBsaWNpdGx5IHNwZWNpZmllZCBvcmllbnQgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBzdGFjay5ncm91cGJ5Q2hhbm5lbCA9PT0gWSA/ICdob3Jpem9udGFsJyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBpc01lYXN1cmUoZW5jb2RpbmdbWF0pICYmICAhaXNNZWFzdXJlKGVuY29kaW5nW1ldKSA/XG4gICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGlmIFggaXMgbWVhc3VyZSBhbmQgWSBpcyBkaW1lbnNpb24gb3IgdW5zcGVjaWZpZWRcbiAgICAgICAgICAgICAgICdob3Jpem9udGFsJyA6XG4gICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCAodW5kZWZpbmVkKSBvdGhlcndpc2UuICBUaGlzIGluY2x1ZGVzIHdoZW5cbiAgICAgICAgICAgICAgIC8vIC0gWSBpcyBtZWFzdXJlIGFuZCBYIGlzIGRpbWVuc2lvbiBvciB1bnNwZWNpZmllZFxuICAgICAgICAgICAgICAgLy8gLSBib3RoIFggYW5kIFkgYXJlIG1lYXN1cmVzIG9yIGJvdGggYXJlIGRpbWVuc2lvblxuICAgICAgICAgICAgICAgdW5kZWZpbmVkOyAgLy9cbiAgICAgICAgICAgfVxuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIC8vIHRleHQtb25seVxuICAgICAgICAgY2FzZSAnYWxpZ24nOlxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjZmdbcHJvcGVydHldID0gaGFzKGVuY29kaW5nLCBYKSA/ICdjZW50ZXInIDogJ3JpZ2h0JztcbiAgICAgICAgICB9XG4gICAgICAgfVxuICAgICAgIHJldHVybiBjZmc7XG4gICAgIH0sIHt9KSxcbiAgICAgY29uZmlnLm1hcmtcbiAgICk7XG59XG4iLCJpbXBvcnQgKiBhcyB2bEZpZWxkRGVmIGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCB2YWxzLCByZWR1Y2UsIGNvbnRhaW5zfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vc2NoZW1hL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7U3RhY2tQcm9wZXJ0aWVzfSBmcm9tICcuL3N0YWNrJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi9lbnVtcyc7XG5cbmltcG9ydCB7YXV0b01heEJpbnN9IGZyb20gJy4uL2Jpbic7XG5pbXBvcnQge0NoYW5uZWwsIFJPVywgQ09MVU1OLCBDT0xPUn0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1RBQ0tFRF9TQ0FMRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgVEVNUE9SQUwsIE9SRElOQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtzY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtwYXJzZUV4cHJlc3Npb24sIHJhd0RvbWFpbn0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5cbmNvbnN0IERFRkFVTFRfTlVMTF9GSUxURVJTID0ge1xuICBub21pbmFsOiBmYWxzZSxcbiAgb3JkaW5hbDogZmFsc2UsXG4gIHF1YW50aXRhdGl2ZTogdHJ1ZSxcbiAgdGVtcG9yYWw6IHRydWVcbn07XG5cbi8qKlxuICogQ3JlYXRlIFZlZ2EncyBkYXRhIGFycmF5IGZyb20gYSBnaXZlbiBtb2RlbC5cbiAqXG4gKiBAcGFyYW0gIG1vZGVsXG4gKiBAcmV0dXJuIEFycmF5IG9mIFZlZ2EgZGF0YS5cbiAqICAgICAgICAgICAgICAgICBUaGlzIGFsd2F5cyBpbmNsdWRlcyBhIFwic291cmNlXCIgZGF0YSB0YWJsZS5cbiAqICAgICAgICAgICAgICAgICBJZiB0aGUgbW9kZWwgY29udGFpbnMgYWdncmVnYXRlIHZhbHVlLCB0aGlzIHdpbGwgYWxzbyBjcmVhdGVcbiAqICAgICAgICAgICAgICAgICBhZ2dyZWdhdGUgdGFibGUgYXMgd2VsbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVEYXRhKG1vZGVsOiBNb2RlbCk6IFZnRGF0YVtdIHtcbiAgY29uc3QgZGVmID0gW3NvdXJjZS5kZWYobW9kZWwpXTtcblxuICBjb25zdCBzdW1tYXJ5RGVmID0gc3VtbWFyeS5kZWYobW9kZWwpO1xuICBpZiAoc3VtbWFyeURlZikge1xuICAgIGRlZi5wdXNoKHN1bW1hcnlEZWYpO1xuICB9XG5cbiAgLy8gYWRkIHJhbmsgdG8gdGhlIGxhc3QgZGF0YXNldFxuICByYW5rVHJhbnNmb3JtKGRlZltkZWYubGVuZ3RoLTFdLCBtb2RlbCk7XG5cbiAgLy8gYXBwZW5kIG5vbi1wb3NpdGl2ZSBmaWx0ZXIgYXQgdGhlIGVuZCBmb3IgdGhlIGRhdGEgdGFibGVcbiAgZmlsdGVyTm9uUG9zaXRpdmVGb3JMb2coZGVmW2RlZi5sZW5ndGggLSAxXSwgbW9kZWwpO1xuXG4gIC8vIFN0YWNrXG4gIGNvbnN0IHN0YWNrRGVmID0gbW9kZWwuc3RhY2soKTtcbiAgaWYgKHN0YWNrRGVmKSB7XG4gICAgZGVmLnB1c2goc3RhY2suZGVmKG1vZGVsLCBzdGFja0RlZikpO1xuICB9XG5cbiAgcmV0dXJuIGRlZi5jb25jYXQoXG4gICAgZGF0ZXMuZGVmcyhtb2RlbCkgLy8gVGltZSBkb21haW4gdGFibGVzXG4gICk7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc291cmNlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGRlZihtb2RlbDogTW9kZWwpOiBWZ0RhdGEge1xuICAgIGxldCBzb3VyY2U6VmdEYXRhID0ge25hbWU6IFNPVVJDRX07XG5cbiAgICAvLyBEYXRhIHNvdXJjZSAodXJsIG9yIGlubGluZSlcbiAgICBjb25zdCBkYXRhID0gbW9kZWwuZGF0YSgpO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhLnZhbHVlcyAmJiBkYXRhLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNvdXJjZS52YWx1ZXMgPSBtb2RlbC5kYXRhKCkudmFsdWVzO1xuICAgICAgICBzb3VyY2UuZm9ybWF0ID0ge3R5cGU6ICdqc29uJ307XG4gICAgICB9IGVsc2UgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgIHNvdXJjZS51cmwgPSBkYXRhLnVybDtcblxuICAgICAgICAvLyBFeHRyYWN0IGV4dGVuc2lvbiBmcm9tIFVSTCB1c2luZyBzbmlwcGV0IGZyb21cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82ODA5MjkvaG93LXRvLWV4dHJhY3QtZXh0ZW5zaW9uLWZyb20tZmlsZW5hbWUtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICAgICAgbGV0IGRlZmF1bHRFeHRlbnNpb24gPSAvKD86XFwuKFteLl0rKSk/JC8uZXhlYyhzb3VyY2UudXJsKVsxXTtcbiAgICAgICAgaWYgKCFjb250YWlucyhbJ2pzb24nLCAnY3N2JywgJ3RzdiddLCBkZWZhdWx0RXh0ZW5zaW9uKSkge1xuICAgICAgICAgIGRlZmF1bHRFeHRlbnNpb24gPSAnanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLmZvcm1hdCA9IHt0eXBlOiBtb2RlbC5kYXRhKCkuZm9ybWF0VHlwZSB8fCBkZWZhdWx0RXh0ZW5zaW9ufTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAgIC8vIFNldCBkYXRhJ3MgZm9ybWF0LnBhcnNlIGlmIG5lZWRlZFxuICAgIGNvbnN0IHBhcnNlID0gZm9ybWF0UGFyc2UobW9kZWwpO1xuICAgIGlmIChwYXJzZSkge1xuICAgICAgc291cmNlLmZvcm1hdCA9IHNvdXJjZS5mb3JtYXQgfHwge307XG4gICAgICBzb3VyY2UuZm9ybWF0LnBhcnNlID0gcGFyc2U7XG4gICAgfVxuXG5cbiAgICBzb3VyY2UudHJhbnNmb3JtID0gdHJhbnNmb3JtKG1vZGVsKTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0UGFyc2UobW9kZWw6IE1vZGVsKSB7XG4gICAgY29uc3QgY2FsY0ZpZWxkTWFwID0gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKGZpZWxkTWFwLCBmb3JtdWxhKSB7XG4gICAgICBmaWVsZE1hcFtmb3JtdWxhLmZpZWxkXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmllbGRNYXA7XG4gICAgfSwge30pO1xuXG4gICAgbGV0IHBhcnNlO1xuICAgIC8vIHVzZSBmb3JFYWNoIHJhdGhlciB0aGFuIHJlZHVjZSBzbyB0aGF0IGl0IGNhbiByZXR1cm4gdW5kZWZpbmVkXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gcGFyc2UgbmVlZGVkXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgICBwYXJzZSA9IHBhcnNlIHx8IHt9O1xuICAgICAgICBwYXJzZVtmaWVsZERlZi5maWVsZF0gPSAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBpZiAodmxGaWVsZERlZi5pc0NvdW50KGZpZWxkRGVmKSB8fCBjYWxjRmllbGRNYXBbZmllbGREZWYuZmllbGRdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlID0gcGFyc2UgfHwge307XG4gICAgICAgIHBhcnNlW2ZpZWxkRGVmLmZpZWxkXSA9ICdudW1iZXInO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBWZWdhIHRyYW5zZm9ybXMgZm9yIHRoZSBzb3VyY2UgZGF0YSB0YWJsZS4gIFRoaXMgY2FuIGluY2x1ZGVcbiAgICogdHJhbnNmb3JtcyBmb3IgdGltZSB1bml0LCBiaW5uaW5nIGFuZCBmaWx0ZXJpbmcuXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIG51bGwgZmlsdGVyIGNvbWVzIGZpcnN0IHNvIHRyYW5zZm9ybXMgYXJlIG5vdCBwZXJmb3JtZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAvLyB0aW1lIGFuZCBiaW4gc2hvdWxkIGNvbWUgYmVmb3JlIGZpbHRlciBzbyB3ZSBjYW4gZmlsdGVyIGJ5IHRpbWUgYW5kIGJpblxuICAgIHJldHVybiBudWxsRmlsdGVyVHJhbnNmb3JtKG1vZGVsKS5jb25jYXQoXG4gICAgICBmb3JtdWxhVHJhbnNmb3JtKG1vZGVsKSxcbiAgICAgIGZpbHRlclRyYW5zZm9ybShtb2RlbCksXG4gICAgICBiaW5UcmFuc2Zvcm0obW9kZWwpLFxuICAgICAgdGltZVRyYW5zZm9ybShtb2RlbClcbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpbWVUcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0cmFuc2Zvcm0sIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgcmVmID0gZmllbGQoZmllbGREZWYsIHsgbm9mbjogdHJ1ZSwgZGF0dW06IHRydWUgfSk7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgdHJhbnNmb3JtLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpLFxuICAgICAgICAgIGV4cHI6IHBhcnNlRXhwcmVzc2lvbihmaWVsZERlZi50aW1lVW5pdCwgcmVmKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJpblRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKHRyYW5zZm9ybSwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBjb25zdCBiaW4gPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG4gICAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgaWYgKGJpbikge1xuICAgICAgICBsZXQgYmluVHJhbnMgPSBleHRlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ2JpbicsXG4gICAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGQsXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX3N0YXJ0J30pLFxuICAgICAgICAgICAgICBtaWQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KSxcbiAgICAgICAgICAgICAgZW5kOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19lbmQnfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIGlmIGJpbiBpcyBhbiBvYmplY3QsIGxvYWQgcGFyYW1ldGVyIGhlcmUhXG4gICAgICAgICAgdHlwZW9mIGJpbiA9PT0gJ2Jvb2xlYW4nID8ge30gOiBiaW5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWJpblRyYW5zLm1heGJpbnMgJiYgIWJpblRyYW5zLnN0ZXApIHtcbiAgICAgICAgICAvLyBpZiBib3RoIG1heGJpbnMgYW5kIHN0ZXAgYXJlIHNwZWNpZmllZCwgbmVlZCB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBiaW5cbiAgICAgICAgICBiaW5UcmFucy5tYXhiaW5zID0gYXV0b01heEJpbnMoY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2Zvcm0ucHVzaChiaW5UcmFucyk7XG4gICAgICAgIC8vIGNvbG9yIHJhbXAgaGFzIHR5cGUgbGluZWFyIG9yIHRpbWVcbiAgICAgICAgaWYgKHNjYWxlVHlwZShzY2FsZSwgZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSkgPT09IFNjYWxlVHlwZS5PUkRJTkFMIHx8IGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX3JhbmdlJ30pLFxuICAgICAgICAgICAgZXhwcjogZmllbGQoZmllbGREZWYsIHtkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnX3N0YXJ0J30pICtcbiAgICAgICAgICAgICAgICAgICcgKyBcXCctXFwnICsgJyArXG4gICAgICAgICAgICAgICAgICBmaWVsZChmaWVsZERlZiwge2RhdHVtOiB0cnVlLCBiaW5TdWZmaXg6ICdfZW5kJ30pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gQW4gYXJyYXkgdGhhdCBtaWdodCBjb250YWluIGEgZmlsdGVyIHRyYW5zZm9ybSBmb3IgZmlsdGVyaW5nIG51bGwgdmFsdWUgYmFzZWQgb24gZmlsdGVyTnVsIGNvbmZpZ1xuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIG51bGxGaWx0ZXJUcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gICAgY29uc3QgZmlsdGVyTnVsbCA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlck51bGw7XG4gICAgY29uc3QgZmlsdGVyZWRGaWVsZHMgPSBrZXlzKG1vZGVsLnJlZHVjZShmdW5jdGlvbihhZ2dyZWdhdG9yLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWx0ZXJOdWxsIHx8XG4gICAgICAgIChmaWx0ZXJOdWxsID09PSB1bmRlZmluZWQgJiYgZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQgIT09ICcqJyAmJiBERUZBVUxUX05VTExfRklMVEVSU1tmaWVsZERlZi50eXBlXSkpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFnZ3JlZ2F0b3I7XG4gICAgfSwge30pKTtcblxuICAgIHJldHVybiBmaWx0ZXJlZEZpZWxkcy5sZW5ndGggPiAwID9cbiAgICAgIFt7XG4gICAgICAgIHR5cGU6ICdmaWx0ZXInLFxuICAgICAgICB0ZXN0OiBmaWx0ZXJlZEZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGROYW1lKSB7XG4gICAgICAgICAgcmV0dXJuICdkYXR1bS4nICsgZmllbGROYW1lICsgJyE9PW51bGwnO1xuICAgICAgICB9KS5qb2luKCcgJiYgJylcbiAgICAgIH1dIDogW107XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZmlsdGVyVHJhbnNmb3JtKG1vZGVsOiBNb2RlbCkge1xuICAgIGNvbnN0IGZpbHRlciA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlcjtcbiAgICByZXR1cm4gZmlsdGVyID8gW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlclxuICAgIH1dIDogW107XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZm9ybXVsYVRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgICByZXR1cm4gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKHRyYW5zZm9ybSwgZm9ybXVsYSkge1xuICAgICAgdHJhbnNmb3JtLnB1c2goZXh0ZW5kKHt0eXBlOiAnZm9ybXVsYSd9LCBmb3JtdWxhKSk7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIHN1bW1hcnkge1xuICBleHBvcnQgZnVuY3Rpb24gZGVmKG1vZGVsOiBNb2RlbCk6VmdEYXRhIHtcbiAgICAvKiBkaWN0IHNldCBmb3IgZGltZW5zaW9ucyAqL1xuICAgIGxldCBkaW1zID0ge307XG5cbiAgICAvKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSA9PiBkaWN0IHNldCBvZiBhZ2dyZWdhdGlvbiBmdW5jdGlvbnMgKi9cbiAgICBsZXQgbWVhcyA9IHt9O1xuXG4gICAgbGV0IGhhc0FnZ3JlZ2F0ZSA9IGZhbHNlO1xuXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgaGFzQWdncmVnYXRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9PT0gQWdncmVnYXRlT3AuQ09VTlQpIHtcbiAgICAgICAgICBtZWFzWycqJ10gPSBtZWFzWycqJ10gfHwge307XG4gICAgICAgICAgbWVhc1snKiddLmNvdW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXSA9IG1lYXNbZmllbGREZWYuZmllbGRdIHx8IHt9O1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdW2ZpZWxkRGVmLmFnZ3JlZ2F0ZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19zdGFydCd9KV0gPSBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19zdGFydCd9KTtcbiAgICAgICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KV0gPSBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19taWQnfSk7XG4gICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19lbmQnfSldID0gZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfZW5kJ30pO1xuXG4gICAgICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgICAgICBpZiAoc2NhbGVUeXBlKHNjYWxlLCBmaWVsZERlZiwgY2hhbm5lbCwgbW9kZWwubWFyaygpKSA9PT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICAgICAgICAgIC8vIGFsc28gcHJvZHVjZSBiaW5fcmFuZ2UgaWYgdGhlIGJpbm5lZCBmaWVsZCB1c2Ugb3JkaW5hbCBzY2FsZVxuICAgICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KV0gPSBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGltc1tmaWVsZChmaWVsZERlZildID0gZmllbGQoZmllbGREZWYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBncm91cGJ5ID0gdmFscyhkaW1zKTtcblxuICAgIC8vIHNob3J0LWZvcm1hdCBzdW1tYXJpemUgb2JqZWN0IGZvciBWZWdhJ3MgYWdncmVnYXRlIHRyYW5zZm9ybVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2Evd2lraS9EYXRhLVRyYW5zZm9ybXMjLWFnZ3JlZ2F0ZVxuICAgIGNvbnN0IHN1bW1hcml6ZSA9IHJlZHVjZShtZWFzLCBmdW5jdGlvbihhZ2dyZWdhdG9yLCBmbkRpY3RTZXQsIGZpZWxkKSB7XG4gICAgICBhZ2dyZWdhdG9yW2ZpZWxkXSA9IGtleXMoZm5EaWN0U2V0KTtcbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIHt9KTtcblxuICAgIGlmIChoYXNBZ2dyZWdhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFNVTU1BUlksXG4gICAgICAgIHNvdXJjZTogU09VUkNFLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogZ3JvdXBieSxcbiAgICAgICAgICBzdW1tYXJpemU6IHN1bW1hcml6ZVxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBzdGFjayB7XG4gIC8qKlxuICAgKiBBZGQgc3RhY2tlZCBkYXRhIHNvdXJjZSwgZm9yIGZlZWRpbmcgdGhlIHNoYXJlZCBzY2FsZS5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWYobW9kZWw6IE1vZGVsLCBzdGFja1Byb3BzOiBTdGFja1Byb3BlcnRpZXMpOlZnRGF0YSB7XG4gICAgY29uc3QgZ3JvdXBieUNoYW5uZWwgPSBzdGFja1Byb3BzLmdyb3VwYnlDaGFubmVsLFxuICAgIGZpZWxkQ2hhbm5lbCA9IHN0YWNrUHJvcHMuZmllbGRDaGFubmVsLFxuICAgIGZhY2V0RmllbGRzID0gKG1vZGVsLmhhcyhDT0xVTU4pID8gW21vZGVsLmZpZWxkKENPTFVNTildIDogW10pXG4gICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCgobW9kZWwuaGFzKFJPVykgPyBbbW9kZWwuZmllbGQoUk9XKV0gOiBbXSkpO1xuXG4gICAgY29uc3Qgc3RhY2tlZDpWZ0RhdGEgPSB7XG4gICAgICBuYW1lOiBTVEFDS0VEX1NDQUxFLFxuICAgICAgc291cmNlOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgIC8vIGdyb3VwIGJ5IGNoYW5uZWwgYW5kIG90aGVyIGZhY2V0c1xuICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoZ3JvdXBieUNoYW5uZWwpXS5jb25jYXQoZmFjZXRGaWVsZHMpLFxuICAgICAgICAvLyBwcm9kdWNlIHN1bSBvZiB0aGUgZmllbGQncyB2YWx1ZSBlLmcuLCBzdW0gb2Ygc3VtLCBzdW0gb2YgZGlzdGluY3RcbiAgICAgICAgc3VtbWFyaXplOiBbe29wczogWydzdW0nXSwgZmllbGQ6IG1vZGVsLmZpZWxkKGZpZWxkQ2hhbm5lbCl9XVxuICAgICAgfV1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgZGF0ZXMge1xuICAvKipcbiAgICogQWRkIGRhdGEgc291cmNlIGZvciB3aXRoIGRhdGVzIGZvciBhbGwgbW9udGhzLCBkYXlzLCBob3VycywgLi4uIGFzIG5lZWRlZC5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWZzKG1vZGVsOiBNb2RlbCkge1xuICAgIGxldCBhbHJlYWR5QWRkZWQgPSB7fTtcblxuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oYWdncmVnYXRvciwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgY29uc3QgZG9tYWluID0gcmF3RG9tYWluKGZpZWxkRGVmLnRpbWVVbml0LCBjaGFubmVsKTtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhYWxyZWFkeUFkZGVkW2ZpZWxkRGVmLnRpbWVVbml0XSkge1xuICAgICAgICAgIGFscmVhZHlBZGRlZFtmaWVsZERlZi50aW1lVW5pdF0gPSB0cnVlO1xuICAgICAgICAgIGFnZ3JlZ2F0b3IucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBmaWVsZERlZi50aW1lVW5pdCxcbiAgICAgICAgICAgIHZhbHVlczogZG9tYWluLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgICAgIGZpZWxkOiAnZGF0ZScsXG4gICAgICAgICAgICAgIGV4cHI6IHBhcnNlRXhwcmVzc2lvbihmaWVsZERlZi50aW1lVW5pdCwgJ2RhdHVtLmRhdGEnLCB0cnVlKVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFnZ3JlZ2F0b3I7XG4gICAgfSwgW10pO1xuICB9XG59XG5cbi8vIFdlIG5lZWQgdG8gYWRkIGEgcmFuayB0cmFuc2Zvcm0gc28gdGhhdCB3ZSBjYW4gdXNlIHRoZSByYW5rIHZhbHVlIGFzXG4vLyBpbnB1dCBmb3IgY29sb3IgcmFtcCdzIGxpbmVhciBzY2FsZS5cbmV4cG9ydCBmdW5jdGlvbiByYW5rVHJhbnNmb3JtKGRhdGFUYWJsZSwgbW9kZWw6IE1vZGVsKSB7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIG1vZGVsLmZpZWxkRGVmKENPTE9SKS50eXBlID09PSBPUkRJTkFMKSB7XG4gICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IGRhdGFUYWJsZS50cmFuc2Zvcm0uY29uY2F0KFt7XG4gICAgICB0eXBlOiAnc29ydCcsXG4gICAgICBieTogbW9kZWwuZmllbGQoQ09MT1IpXG4gICAgfSx7XG4gICAgICB0eXBlOiAncmFuaycsXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIHJhbms6IG1vZGVsLmZpZWxkKENPTE9SLCB7cHJlZm46ICdyYW5rXyd9KVxuICAgICAgfVxuICAgIH1dKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9uUG9zaXRpdmVGb3JMb2coZGF0YVRhYmxlLCBtb2RlbDogTW9kZWwpIHtcbiAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihfLCBjaGFubmVsKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICBpZiAoc2NhbGUgJiYgc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLkxPRykge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtkYXR1bTogdHJ1ZX0pICsgJyA+IDAnXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmltcG9ydCB7Y29tcGlsZUF4aXMsIGNvbXBpbGVJbm5lckF4aXMsIGdyaWRTaG93fSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtjb21waWxlU2NhbGVzfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7YXBwbHlDb25maWcsIEZJTExfU1RST0tFX0NPTkZJR30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiByZXR1cm4gbWl4aW5zIHRoYXQgY29udGFpbnMgbWFya3MsIHNjYWxlcywgYW5kIGF4ZXMgZm9yIHRoZSByb290R3JvdXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhY2V0TWl4aW5zKG1vZGVsOiBNb2RlbCwgbWFya3MpIHtcbiAgY29uc3QgaGFzUm93ID0gbW9kZWwuaGFzKFJPVyksIGhhc0NvbCA9IG1vZGVsLmhhcyhDT0xVTU4pO1xuXG4gIGlmIChtb2RlbC5oYXMoUk9XKSAmJiAhbW9kZWwuaXNEaW1lbnNpb24oUk9XKSkge1xuICAgIC8vIFRPRE86IGFkZCBlcnJvciB0byBtb2RlbCBpbnN0ZWFkXG4gICAgdXRpbC5lcnJvcignUm93IGVuY29kaW5nIHNob3VsZCBiZSBvcmRpbmFsLicpO1xuICB9XG5cbiAgaWYgKG1vZGVsLmhhcyhDT0xVTU4pICYmICFtb2RlbC5pc0RpbWVuc2lvbihDT0xVTU4pKSB7XG4gICAgLy8gVE9ETzogYWRkIGVycm9yIHRvIG1vZGVsIGluc3RlYWRcbiAgICB1dGlsLmVycm9yKCdDb2wgZW5jb2Rpbmcgc2hvdWxkIGJlIG9yZGluYWwuJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1hcmtzOiBbXS5jb25jYXQoXG4gICAgICBnZXRGYWNldEd1aWRlR3JvdXBzKG1vZGVsKSxcbiAgICAgIFtnZXRGYWNldEdyb3VwKG1vZGVsLCBtYXJrcyldXG4gICAgKSxcbiAgICAvLyBhc3N1bWluZyBlcXVhbCBjZWxsV2lkdGggaGVyZVxuICAgIHNjYWxlczogY29tcGlsZVNjYWxlcyhcbiAgICAgIG1vZGVsLmNoYW5uZWxzKCksIC8vIFRPRE86IHdpdGggbmVzdGluZywgbm90IGFsbCBzY2FsZSBtaWdodCBiZSBhIHJvb3QtbGV2ZWxcbiAgICAgIG1vZGVsXG4gICAgKSxcbiAgICBheGVzOiBbXS5jb25jYXQoXG4gICAgICBoYXNSb3cgJiYgbW9kZWwuYXhpcyhST1cpID8gW2NvbXBpbGVBeGlzKFJPVywgbW9kZWwpXSA6IFtdLFxuICAgICAgaGFzQ29sICYmIG1vZGVsLmF4aXMoQ09MVU1OKSA/IFtjb21waWxlQXhpcyhDT0xVTU4sIG1vZGVsKV0gOiBbXVxuICAgIClcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEF4ZXMobW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IGNlbGxBeGVzID0gW107XG4gIGlmIChtb2RlbC5oYXMoWCkgJiYgbW9kZWwuYXhpcyhYKSAmJiBncmlkU2hvdyhtb2RlbCwgWCkpIHtcbiAgICBjZWxsQXhlcy5wdXNoKGNvbXBpbGVJbm5lckF4aXMoWCwgbW9kZWwpKTtcbiAgfVxuICBpZiAobW9kZWwuaGFzKFkpICYmIG1vZGVsLmF4aXMoWSkgJiYgZ3JpZFNob3cobW9kZWwsIFkpKSB7XG4gICAgY2VsbEF4ZXMucHVzaChjb21waWxlSW5uZXJBeGlzKFksIG1vZGVsKSk7XG4gIH1cbiAgcmV0dXJuIGNlbGxBeGVzO1xufVxuXG5mdW5jdGlvbiBnZXRGYWNldEdyb3VwKG1vZGVsOiBNb2RlbCwgbWFya3MpIHtcbiAgY29uc3QgbmFtZSA9IG1vZGVsLnNwZWMoKS5uYW1lO1xuICBsZXQgZmFjZXRHcm91cDogYW55ID0ge1xuICAgIG5hbWU6IChuYW1lID8gbmFtZSArICctJyA6ICcnKSArICdjZWxsJyxcbiAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICB0eXBlOiAnZmFjZXQnLFxuICAgICAgICBncm91cGJ5OiBbXS5jb25jYXQoXG4gICAgICAgICAgbW9kZWwuaGFzKFJPVykgPyBbbW9kZWwuZmllbGQoUk9XKV0gOiBbXSxcbiAgICAgICAgICBtb2RlbC5oYXMoQ09MVU1OKSA/IFttb2RlbC5maWVsZChDT0xVTU4pXSA6IFtdXG4gICAgICAgIClcbiAgICAgIH1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKG1vZGVsKVxuICAgIH0sXG4gICAgbWFya3M6IG1hcmtzXG4gIH07XG5cbiAgY29uc3QgY2VsbEF4ZXMgPSBnZXRDZWxsQXhlcyhtb2RlbCk7XG4gIGlmIChjZWxsQXhlcy5sZW5ndGggPiAwKSB7XG4gICAgZmFjZXRHcm91cC5heGVzID0gY2VsbEF4ZXM7XG4gIH1cbiAgcmV0dXJuIGZhY2V0R3JvdXA7XG59XG5cbmZ1bmN0aW9uIGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCkge1xuICBsZXQgZmFjZXRHcm91cFByb3BlcnRpZXM6IGFueSA9IHtcbiAgICB4OiBtb2RlbC5oYXMoQ09MVU1OKSA/IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKSxcbiAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoQ09MVU1OKS5wYWRkaW5nIC8gMlxuICAgICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgeTogbW9kZWwuaGFzKFJPVykgPyB7XG4gICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFJPVyksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKSxcbiAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShST1cpLnBhZGRpbmcgLyAyXG4gICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgd2lkdGg6IHtmaWVsZDoge3BhcmVudDogJ2NlbGxXaWR0aCd9fSxcbiAgICBoZWlnaHQ6IHtmaWVsZDoge3BhcmVudDogJ2NlbGxIZWlnaHQnfX1cbiAgfTtcblxuICAvLyBhcHBseSBib3RoIGNvbmZpZyBmcm9tIGNlbGwgYW5kIGZhY2V0LmNlbGwgKHdpdGggaGlnaGVyIHByZWNlZGVuY2UgZm9yIGZhY2V0LmNlbGwpXG4gIGFwcGx5Q29uZmlnKGZhY2V0R3JvdXBQcm9wZXJ0aWVzLCBtb2RlbC5jb25maWcoKS5jZWxsLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gIGFwcGx5Q29uZmlnKGZhY2V0R3JvdXBQcm9wZXJ0aWVzLCBtb2RlbC5jb25maWcoKS5mYWNldC5jZWxsLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG5cbiAgcmV0dXJuIGZhY2V0R3JvdXBQcm9wZXJ0aWVzO1xufVxuXG4vKipcbiAqIFJldHVybiBncm91cHMgb2YgYXhlcyBvciBtYW51YWxseSBkcmF3biBncmlkcy5cbiAqL1xuZnVuY3Rpb24gZ2V0RmFjZXRHdWlkZUdyb3Vwcyhtb2RlbDogTW9kZWwpIHtcbiAgbGV0IHJvb3RBeGVzR3JvdXBzID0gW10gO1xuXG4gIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICBpZiAobW9kZWwuYXhpcyhYKSkge1xuICAgICAgcm9vdEF4ZXNHcm91cHMucHVzaChnZXRYQXhlc0dyb3VwKG1vZGVsKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIHJvdyBoYXMgYXhpcyBhbmQgaWYgcm93J3MgYXhpcy5ncmlkIGlzIHRydWVcbiAgICBpZiAobW9kZWwuaGFzKFJPVykpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGRyYXcgZ3JpZCAodXNlIGFwcGx5IHRvIHB1c2ggYWxsIG1lbWJlcnMgb2YgYW4gYXJyYXkpXG4gICAgICByb290QXhlc0dyb3Vwcy5wdXNoLmFwcGx5KHJvb3RBeGVzR3JvdXBzLCBnZXRSb3dHcmlkR3JvdXBzKG1vZGVsKSk7XG4gICAgfVxuICB9XG4gIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICBpZiAobW9kZWwuYXhpcyhZKSkge1xuICAgICAgcm9vdEF4ZXNHcm91cHMucHVzaChnZXRZQXhlc0dyb3VwKG1vZGVsKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIGNvbHVtbiBoYXMgYXhpcyBhbmQgaWYgY29sdW1uJ3MgYXhpcy5ncmlkIGlzIHRydWVcbiAgICBpZiAobW9kZWwuaGFzKENPTFVNTikpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGRyYXcgZ3JpZCAodXNlIGFwcGx5IHRvIHB1c2ggYWxsIG1lbWJlcnMgb2YgYW4gYXJyYXkpXG4gICAgICByb290QXhlc0dyb3Vwcy5wdXNoLmFwcGx5KHJvb3RBeGVzR3JvdXBzLCBnZXRDb2x1bW5HcmlkR3JvdXBzKG1vZGVsKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJvb3RBeGVzR3JvdXBzO1xufVxuXG5mdW5jdGlvbiBnZXRYQXhlc0dyb3VwKG1vZGVsOiBNb2RlbCkgeyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IGhhc0NvbCA9IG1vZGVsLmhhcyhDT0xVTU4pO1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3gtYXhlcycsXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNDb2wgPyB7XG4gICAgICBmcm9tOiB7IC8vIFRPRE86IGlmIHdlIGRvIGZhY2V0IHRyYW5zZm9ybSBhdCB0aGUgcGFyZW50IGxldmVsIHdlIGNhbiBzYW1lIHNvbWUgdHJhbnNmb3JtIGhlcmVcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV0sXG4gICAgICAgICAgc3VtbWFyaXplOiB7JyonOiAnY291bnQnfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiAnY2VsbFdpZHRoJ319LFxuICAgICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ2hlaWdodCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB4OiBoYXNDb2wgPyB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKSxcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShDT0xVTU4pLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICAgICAgdmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtb2RlbC5heGlzKFgpID8ge1xuICAgICAgYXhlczogW2NvbXBpbGVBeGlzKFgsIG1vZGVsKV1cbiAgICB9OiB7fVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRZQXhlc0dyb3VwKG1vZGVsOiBNb2RlbCkgeyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IGhhc1JvdyA9IG1vZGVsLmhhcyhST1cpO1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3ktYXhlcycsXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNSb3cgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogJ2NvdW50J30gLy8ganVzdCBhIHBsYWNlaG9sZGVyIGFnZ3JlZ2F0aW9uXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSA6IHt9LFxuICAgIHtcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDoge3BhcmVudDogJ2NlbGxIZWlnaHQnfX0sXG4gICAgICAgICAgeTogaGFzUm93ID8ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoUk9XKS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIG1vZGVsLmF4aXMoWSkgPyB7XG4gICAgICBheGVzOiBbY29tcGlsZUF4aXMoWSwgbW9kZWwpXVxuICAgIH06IHt9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFJvd0dyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55W10geyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IG5hbWUgPSBtb2RlbC5zcGVjKCkubmFtZTtcbiAgY29uc3QgZmFjZXRHcmlkQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuZmFjZXQuZ3JpZDtcblxuICBjb25zdCByb3dHcmlkID0ge1xuICAgIG5hbWU6IChuYW1lID8gbmFtZSArICctJyA6ICcnKSArICdyb3ctZ3JpZCcsXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe3R5cGU6ICdmYWNldCcsIGdyb3VwYnk6IFttb2RlbC5maWVsZChST1cpXX1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeToge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKVxuICAgICAgICB9LFxuICAgICAgICB4OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFtyb3dHcmlkLCB7XG4gICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgJ3Jvdy1ncmlkLWVuZCcsXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7IGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfX0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfV07XG59XG5cbmZ1bmN0aW9uIGdldENvbHVtbkdyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55IHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIGNvbnN0IGZhY2V0R3JpZENvbmZpZyA9IG1vZGVsLmNvbmZpZygpLmZhY2V0LmdyaWQ7XG5cbiAgY29uc3QgY29sdW1uR3JpZCA9IHtcbiAgICBuYW1lOiAobmFtZSA/IG5hbWUgKyAnLScgOiAnJykgKyAnY29sdW1uLWdyaWQnLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBmcm9tOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3t0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV19XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTilcbiAgICAgICAgfSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBbY29sdW1uR3JpZCwgIHtcbiAgICBuYW1lOiAobmFtZSA/IG5hbWUgKyAnLScgOiAnJykgKyAnY29sdW1uLWdyaWQtZW5kJyxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHsgZmllbGQ6IHtncm91cDogJ3dpZHRoJ319LFxuICAgICAgICB5OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXR9LFxuICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH1dO1xufVxuIiwiaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3NjaGVtYS92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtDaGFubmVsLCBYLCBZLCBST1csIENPTFVNTn0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0xBWU9VVH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge1RFWFQgYXMgVEVYVF9NQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7cmF3RG9tYWlufSBmcm9tICcuL3RpbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUxheW91dERhdGEobW9kZWw6IE1vZGVsKTogVmdEYXRhIHtcbiAgLyogQWdncmVnYXRpb24gc3VtbWFyeSBvYmplY3QgZm9yIGZpZWxkcyB3aXRoIG9yZGluYWwgc2NhbGVzXG4gICAqIHRoYXQgd2VlIG5lZWQgdG8gY2FsY3VsYXRlIGNhcmRpbmFsaXR5IGZvci4gKi9cbiAgY29uc3QgZGlzdGluY3RTdW1tYXJ5ID0gW1gsIFksIFJPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oc3VtbWFyeSwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG5cbiAgICAgIGlmICghKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAvLyBpZiBleHBsaWNpdCBkb21haW4gaXMgZGVjbGFyZWQsIHVzZSBhcnJheSBsZW5ndGhcbiAgICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICAgICAgb3BzOiBbJ2Rpc3RpbmN0J11cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbXSk7XG5cblxuICAvLyBUT0RPOiBoYW5kbGUgXCJmaXRcIiBtb2RlXG4gIGNvbnN0IGNlbGxXaWR0aEZvcm11bGEgPSBzY2FsZVdpZHRoRm9ybXVsYShtb2RlbCwgWCwgbW9kZWwuY2VsbFdpZHRoKCkpO1xuICBjb25zdCBjZWxsSGVpZ2h0Rm9ybXVsYSA9IHNjYWxlV2lkdGhGb3JtdWxhKG1vZGVsLCBZLCBtb2RlbC5jZWxsSGVpZ2h0KCkpO1xuICBjb25zdCBpc0ZhY2V0ID0gIG1vZGVsLmhhcyhDT0xVTU4pIHx8IG1vZGVsLmhhcyhST1cpO1xuXG4gIGNvbnN0IGZvcm11bGFzID0gW3tcbiAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgZmllbGQ6ICdjZWxsV2lkdGgnLFxuICAgIGV4cHI6IGNlbGxXaWR0aEZvcm11bGFcbiAgfSx7XG4gICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgIGZpZWxkOiAnY2VsbEhlaWdodCcsXG4gICAgZXhwcjogY2VsbEhlaWdodEZvcm11bGFcbiAgfSx7XG4gICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgIGZpZWxkOiAnd2lkdGgnLFxuICAgIGV4cHI6IGlzRmFjZXQgP1xuICAgICAgICAgIGZhY2V0U2NhbGVXaWR0aEZvcm11bGEobW9kZWwsIENPTFVNTiwgJ2RhdHVtLmNlbGxXaWR0aCcpIDpcbiAgICAgICAgICBjZWxsV2lkdGhGb3JtdWxhXG4gIH0se1xuICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICBmaWVsZDogJ2hlaWdodCcsXG4gICAgZXhwcjogaXNGYWNldCA/XG4gICAgICAgICAgZmFjZXRTY2FsZVdpZHRoRm9ybXVsYShtb2RlbCwgUk9XLCAnZGF0dW0uY2VsbEhlaWdodCcpIDpcbiAgICAgICAgICBjZWxsSGVpZ2h0Rm9ybXVsYVxuICB9XTtcblxuICByZXR1cm4gZGlzdGluY3RTdW1tYXJ5Lmxlbmd0aCA+IDAgPyB7XG4gICAgbmFtZTogTEFZT1VULFxuICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgdHJhbnNmb3JtOiBbXS5jb25jYXQoXG4gICAgICBbe1xuICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgc3VtbWFyaXplOiBkaXN0aW5jdFN1bW1hcnlcbiAgICAgIH1dLFxuICAgICAgZm9ybXVsYXMpXG4gIH0gOiB7XG4gICAgbmFtZTogTEFZT1VULFxuICAgIHZhbHVlczogW3t9XSxcbiAgICB0cmFuc2Zvcm06IGZvcm11bGFzXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbi5sZW5ndGg7XG4gIH1cblxuICBjb25zdCB0aW1lVW5pdCA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnRpbWVVbml0O1xuICBjb25zdCB0aW1lVW5pdERvbWFpbiA9IHRpbWVVbml0ID8gcmF3RG9tYWluKHRpbWVVbml0LCBjaGFubmVsKSA6IG51bGw7XG5cbiAgcmV0dXJuIHRpbWVVbml0RG9tYWluICE9PSBudWxsID8gdGltZVVuaXREb21haW4ubGVuZ3RoIDpcbiAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcbn1cblxuZnVuY3Rpb24gc2NhbGVXaWR0aEZvcm11bGEobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBub25PcmRpbmFsU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKG1vZGVsLmhhcyhjaGFubmVsKSkge1xuICAgIGlmIChtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgIHJldHVybiAnKCcgKyBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWwsIGNoYW5uZWwpICtcbiAgICAgICAgICAgICAgICAnICsgJyArIHNjYWxlLnBhZGRpbmcgK1xuICAgICAgICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVF9NQVJLICYmIGNoYW5uZWwgPT09IFgpIHtcbiAgICAgIC8vIGZvciB0ZXh0IHRhYmxlIHdpdGhvdXQgeC95IHNjYWxlIHdlIG5lZWQgd2lkZXIgYmFuZFNpemVcbiAgICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5zY2FsZS50ZXh0QmFuZFdpZHRoICsgJyc7XG4gICAgfVxuICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSArICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZhY2V0U2NhbGVXaWR0aEZvcm11bGEobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBpbm5lcldpZHRoOiBzdHJpbmcpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKG1vZGVsLmhhcyhjaGFubmVsKSkge1xuICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gc2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXkgPyBzY2FsZS5kb21haW4ubGVuZ3RoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcblxuICAgIHJldHVybiAnKCcgKyBpbm5lcldpZHRoICsgJyArICcgKyBzY2FsZS5wYWRkaW5nICsgJyknICsgJyAqICcgKyBjYXJkaW5hbGl0eTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCArICcgKyAnICsgbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZzsgLy8gbmVlZCB0byBhZGQgb3V0ZXIgcGFkZGluZyBmb3IgZmFjZXRcbiAgfVxufVxuIiwiaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge0xlZ2VuZFByb3BlcnRpZXN9IGZyb20gJy4uL3NjaGVtYS9sZWdlbmQuc2NoZW1hJztcblxuaW1wb3J0IHtDT0xPUiwgU0laRSwgU0hBUEUsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZFRpdGxlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0FSRUEsIEJBUiwgVElDSywgVEVYVCwgTElORSwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCB3aXRob3V0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHthcHBseU1hcmtDb25maWcsIEZJTExfU1RST0tFX0NPTkZJRywgZm9ybWF0TWl4aW5zIGFzIHV0aWxGb3JtYXRNaXhpbnMsIHRpbWVGb3JtYXR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge09SRElOQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtDT0xPUl9MRUdFTkQsIENPTE9SX0xFR0VORF9MQUJFTH0gZnJvbSAnLi9zY2FsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTGVnZW5kcyhtb2RlbDogTW9kZWwpIHtcbiAgbGV0IGRlZnMgPSBbXTtcblxuICBpZiAobW9kZWwuaGFzKENPTE9SKSAmJiBtb2RlbC5sZWdlbmQoQ09MT1IpKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihDT0xPUik7XG4gICAgY29uc3Qgc2NhbGUgPSB1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSA/XG4gICAgICAvLyBUbyBwcm9kdWNlIG9yZGluYWwgbGVnZW5kIChsaXN0LCByYXRoZXIgdGhhbiBsaW5lYXIgcmFuZ2UpIHdpdGggY29ycmVjdCBsYWJlbHM6XG4gICAgICAvLyAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlc1xuICAgICAgLy8gLSBGb3IgYSBmaWVsZCB3aXRoIGJpbiBvciB0aW1lVW5pdCwgcHJvdmlkZSBhbiBpZGVudGl0eSBvcmRpbmFsIHNjYWxlXG4gICAgICAvLyAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gICAgICBDT0xPUl9MRUdFTkQgOlxuICAgICAgbW9kZWwuc2NhbGVOYW1lKENPTE9SKTtcbiAgICBkZWZzLnB1c2goY29tcGlsZUxlZ2VuZChtb2RlbCwgQ09MT1IsIG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkID8geyBmaWxsOiBzY2FsZSB9IDogeyBzdHJva2U6IHNjYWxlIH0pKTtcbiAgfVxuXG4gIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgbW9kZWwubGVnZW5kKFNJWkUpKSB7XG4gICAgZGVmcy5wdXNoKGNvbXBpbGVMZWdlbmQobW9kZWwsIFNJWkUsIHtcbiAgICAgIHNpemU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKVxuICAgIH0pKTtcbiAgfVxuXG4gIGlmIChtb2RlbC5oYXMoU0hBUEUpICYmIG1vZGVsLmxlZ2VuZChTSEFQRSkpIHtcbiAgICBkZWZzLnB1c2goY29tcGlsZUxlZ2VuZChtb2RlbCwgU0hBUEUsIHtcbiAgICAgIHNoYXBlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpXG4gICAgfSkpO1xuICB9XG4gIHJldHVybiBkZWZzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUxlZ2VuZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZikge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG5cbiAgLy8gMS4xIEFkZCBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlc1xuICBkZWYudGl0bGUgPSB0aXRsZShsZWdlbmQsIGZpZWxkRGVmKTtcblxuICBleHRlbmQoZGVmLCBmb3JtYXRNaXhpbnMobGVnZW5kLCBtb2RlbCwgY2hhbm5lbCkpO1xuXG4gIC8vIDEuMiBBZGQgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzXG4gIFsnb3JpZW50JywgJ3ZhbHVlcyddLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxlZ2VuZFtwcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQucHJvcGVydGllcykgfHwge307XG4gIFsndGl0bGUnLCAnc3ltYm9scycsICdsZWdlbmQnLCAnbGFiZWxzJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGxldCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKGZpZWxkRGVmLCBwcm9wc1tncm91cF0sIG1vZGVsLCBjaGFubmVsKSA6IC8vIGFwcGx5IHJ1bGVcbiAgICAgIHByb3BzW2dyb3VwXTsgLy8gbm8gcnVsZSAtLSBqdXN0IGRlZmF1bHQgdmFsdWVzXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShsZWdlbmQ6IExlZ2VuZFByb3BlcnRpZXMsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICBpZiAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC50aXRsZSkge1xuICAgIHJldHVybiBsZWdlbmQudGl0bGU7XG4gIH1cblxuICByZXR1cm4gZmllbGRUaXRsZShmaWVsZERlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNaXhpbnMobGVnZW5kOiBMZWdlbmRQcm9wZXJ0aWVzLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICAvLyBJZiB0aGUgY2hhbm5lbCBpcyBiaW5uZWQsIHdlIHNob3VsZCBub3Qgc2V0IHRoZSBmb3JtYXQgYmVjYXVzZSB3ZSBoYXZlIGEgcmFuZ2UgbGFiZWxcbiAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJldHVybiB1dGlsRm9ybWF0TWl4aW5zKG1vZGVsLCBjaGFubmVsLCB0eXBlb2YgbGVnZW5kICE9PSAnYm9vbGVhbicgPyBsZWdlbmQuZm9ybWF0IDogdW5kZWZpbmVkKTtcbn1cblxuLy8gd2UgaGF2ZSB0byB1c2Ugc3BlY2lhbCBzY2FsZXMgZm9yIG9yZGluYWwgb3IgYmlubmVkIGZpZWxkcyBmb3IgdGhlIGNvbG9yIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiB1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQ7XG59XG5cbm5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbHMoZmllbGREZWY6IEZpZWxkRGVmLCBzeW1ib2xzU3BlYywgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgbGV0IHN5bWJvbHM6YW55ID0ge307XG4gICAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcblxuICAgIHN3aXRjaCAobWFyaykge1xuICAgICAgY2FzZSBCQVI6XG4gICAgICBjYXNlIFRJQ0s6XG4gICAgICBjYXNlIFRFWFQ6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6ICdzcXVhcmUnfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENJUkNMRTpcbiAgICAgIGNhc2UgU1FVQVJFOlxuICAgICAgICBzeW1ib2xzLnNoYXBlID0geyB2YWx1ZTogbWFyayB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUE9JTlQ6XG4gICAgICBjYXNlIExJTkU6XG4gICAgICBjYXNlIEFSRUE6XG4gICAgICAgIC8vIHVzZSBkZWZhdWx0IGNpcmNsZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBmaWxsZWQgPSBtb2RlbC5jb25maWcoKS5tYXJrLmZpbGxlZDtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhzeW1ib2xzLCBtb2RlbCxcbiAgICAgIC8vIERvIG5vdCBzZXQgZmlsbCAod2hlbiBmaWxsZWQpIG9yIHN0cm9rZSAod2hlbiB1bmZpbGxlZCkgcHJvcGVydHkgZnJvbSBjb25maWdcbiAgICAgIC8vIGJlY2F1c2UgdGhlIHZhbHVlIGZyb20gdGhlIHNjYWxlIHNob3VsZCBoYXZlIHByZWNlZGVuY2VcbiAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbIGZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSlcbiAgICApO1xuXG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IDAgfTtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIGlmICh1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSkge1xuICAgICAgICAvLyBmb3IgY29sb3IgbGVnZW5kIHNjYWxlLCB3ZSBuZWVkIHRvIG92ZXJyaWRlXG4gICAgICAgIHZhbHVlID0geyBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSwgZmllbGQ6ICdkYXRhJyB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSB9O1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgdmFsdWVcbiAgICAgIGlmIChmaWxsZWQpIHtcbiAgICAgICAgc3ltYm9scy5maWxsID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2xzLnN0cm9rZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCAhPT0gQ09MT1IpIHtcbiAgICAgIC8vIEZvciBub24tY29sb3IgbGVnZW5kLCBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWcuXG4gICAgICAvLyAoRm9yIGNvbG9yLCBkbyBub3Qgb3ZlcnJpZGUgc2NhbGUgc3BlY2lmaWVkISlcbiAgICAgIHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gc3ltYm9sc1tmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgICAge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLmNvbG9yfTtcbiAgICB9XG5cbiAgICBzeW1ib2xzID0gZXh0ZW5kKHN5bWJvbHMsIHN5bWJvbHNTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHN5bWJvbHMpLmxlbmd0aCA+IDAgPyBzeW1ib2xzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhmaWVsZERlZjogRmllbGREZWYsIHN5bWJvbHNTcGVjLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBhbnkge1xuICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogQ09MT1JfTEVHRU5ELFxuICAgICAgICAgICAgZmllbGQ6ICdkYXRhJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgc2NhbGU6IENPTE9SX0xFR0VORF9MQUJFTCxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bS5kYXRhIHwgdGltZTpcXCcnICsgdGltZUZvcm1hdChtb2RlbCwgY2hhbm5lbCkgKyAnXFwnfX0nXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7WCwgWX0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5LCBhcHBseU1hcmtDb25maWd9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYXJlYSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ2FyZWEnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgY29uc3Qgb3JpZW50ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQ7XG4gICAgaWYgKG9yaWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwLm9yaWVudCA9IHsgdmFsdWU6IG9yaWVudCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICAvLyB4XG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmlzTWVhc3VyZShYKSkgeyAvLyBNZWFzdXJlXG4gICAgICBwLnggPSB7IHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksIGZpZWxkOiBtb2RlbC5maWVsZChYKSB9O1xuICAgIH0gZWxzZSBpZiAobW9kZWwuaXNEaW1lbnNpb24oWCkpIHtcbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8geDJcbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmlzTWVhc3VyZShZKSkge1xuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtb2RlbC5pc0RpbWVuc2lvbihZKSkge1xuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ICE9PSAnaG9yaXpvbnRhbCcpIHsgLy8gJ3ZlcnRpY2FsJyBvciB1bmRlZmluZWQgYXJlIHZlcnRpY2FsXG4gICAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFksIFNJWkV9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi91dGlsJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIGJhciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3JlY3QnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgY29uc3Qgb3JpZW50ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQ7XG5cbiAgICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gICAgLy8geCwgeDIsIGFuZCB3aWR0aCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgLy8gJ3gnIGlzIGEgc3RhY2tlZCBtZWFzdXJlLCB0aHVzIHVzZSA8ZmllbGQ+X3N0YXJ0IGFuZCA8ZmllbGQ+X2VuZCBmb3IgeCwgeDIuXG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgICBwLngyID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmlzTWVhc3VyZShYKSkge1xuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgICB9O1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgfTtcbiAgICAgICAgcC53aWR0aCA9IHt2YWx1ZTogbW9kZWwuc2l6ZVZhbHVlKFgpfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFgpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgIT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyBGb3IgdmVydGljYWwgY2hhcnQgdGhhdCBoYXMgYmlubmVkIFggYW5kIHNpemUsXG4gICAgICAgIC8vIGNlbnRlciBiYXIgYW5kIGFwcGx5IHNpemUgdG8gd2lkdGguXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLndpZHRoID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyB4IGlzIGRpbWVuc2lvbiBvciB1bnNwZWNpZmllZFxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkgeyAvLyBpcyBvcmRpbmFsXG4gICAgICAgcC54YyA9IHtcbiAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICB9O1xuICAgICB9IGVsc2UgeyAvLyBubyB4XG4gICAgICAgIHAueCA9IHsgdmFsdWU6IDAsIG9mZnNldDogMiB9O1xuICAgICAgfVxuXG4gICAgICBwLndpZHRoID0gbW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gJ2hvcml6b250YWwnID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIHZlcnRpY2FsIChleHBsaWNpdCBcInZlcnRpY2FsXCIgb3IgdW5kZWZpbmVkKVxuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgLy8gb3RoZXJ3aXNlLCB1c2UgZml4ZWQgc2l6ZVxuICAgICAgICAgIHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB5LCB5MiAmIGhlaWdodCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyB5IGlzIHN0YWNrZWQgbWVhc3VyZVxuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtb2RlbC5pc01lYXN1cmUoWSkpIHtcbiAgICAgIGlmIChvcmllbnQgIT09ICdob3Jpem9udGFsJykgeyAvLyB2ZXJ0aWNhbCAoZXhwbGljaXQgJ3ZlcnRpY2FsJyBvciB1bmRlZmluZWQpXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgfTtcbiAgICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWSkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFkpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAvLyBGb3IgaG9yaXpvbnRhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWSBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byBoZWlnaHQuXG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW1wbHkgdXNlIDxmaWVsZD5fc3RhcnQsIDxmaWVsZD5fZW5kXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHkgaXMgb3JkaW5hbCBvciB1bnNwZWNpZmllZFxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gTm8gWVxuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9LFxuICAgICAgICAgIG9mZnNldDogLTFcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcC5oZWlnaHQgPSBtb2RlbC5oYXMoU0laRSkgICYmIG9yaWVudCA9PT0gJ2hvcml6b250YWwnID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIGhvcml6b250YWxcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzY0KTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtYLCBZfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi91dGlsJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIGxpbmUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdsaW5lJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIC8vIHhcbiAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnggPSB7IHZhbHVlOiAwIH07XG4gICAgfVxuXG4gICAgLy8geVxuICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueSA9IHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7WCwgWSwgU0hBUEUsIFNJWkV9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IG5hbWVzcGFjZSBwb2ludCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwsIGZpeGVkU2hhcGU/OiBzdHJpbmcpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC54ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gICAgfVxuXG4gICAgLy8geVxuICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueSA9IHsgdmFsdWU6IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICAgIH1cblxuICAgIC8vIHNpemVcbiAgICBpZiAobW9kZWwuaGFzKFNJWkUpKSB7XG4gICAgICBwLnNpemUgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zaXplID0geyB2YWx1ZTogbW9kZWwuc2l6ZVZhbHVlKCkgfTtcbiAgICB9XG5cbiAgICAvLyBzaGFwZVxuICAgIGlmIChmaXhlZFNoYXBlKSB7IC8vIHNxdWFyZSBhbmQgY2lyY2xlIG1hcmtzXG4gICAgICBwLnNoYXBlID0geyB2YWx1ZTogZml4ZWRTaGFwZSB9O1xuICAgIH0gZWxzZSBpZiAobW9kZWwuaGFzKFNIQVBFKSkge1xuICAgICAgcC5zaGFwZSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSEFQRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSEFQRSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihTSEFQRSkudmFsdWUpIHtcbiAgICAgIHAuc2hhcGUgPSB7IHZhbHVlOiBtb2RlbC5maWVsZERlZihTSEFQRSkudmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmNvbmZpZygpLm1hcmsuc2hhcGUpIHtcbiAgICAgIHAuc2hhcGUgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLnNoYXBlIH07XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBjaXJjbGUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdjaXJjbGUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBzcXVhcmUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdzcXVhcmUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0laRX0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgYXBwbHlDb2xvckFuZE9wYWNpdHksIGZvcm1hdE1peGluc30gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7ZXh0ZW5kLCBjb250YWluc30gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRleHQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICd0ZXh0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kKG1vZGVsOiBNb2RlbCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB7IHZhbHVlOiAwIH0sXG4gICAgICB5OiB7IHZhbHVlOiAwIH0sXG4gICAgICB3aWR0aDogeyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH0sXG4gICAgICBoZWlnaHQ6IHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfSxcbiAgICAgIGZpbGw6IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiwgbW9kZWwuZmllbGREZWYoQ09MT1IpLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCxcbiAgICAgIFsnYW5nbGUnLCAnYWxpZ24nLCAnYmFzZWxpbmUnLCAnZHgnLCAnZHknLCAnZm9udCcsICdmb250V2VpZ2h0JyxcbiAgICAgICAgJ2ZvbnRTdHlsZScsICdyYWRpdXMnLCAndGhldGEnLCAndGV4dCddKTtcblxuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoVEVYVCk7XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgeyAvLyBUT0RPOiBzdXBwb3J0IHgudmFsdWUsIHguZGF0dW1cbiAgICAgIGlmIChtb2RlbC5oYXMoVEVYVCkgJiYgbW9kZWwuZmllbGREZWYoVEVYVCkudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIHAueCA9IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSwgb2Zmc2V0OiAtNSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkuc2NhbGUudGV4dEJhbmRXaWR0aCAvIDIgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC55ID0geyB2YWx1ZTogbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gICAgfVxuXG4gICAgLy8gc2l6ZVxuICAgIGlmIChtb2RlbC5oYXMoU0laRSkpIHtcbiAgICAgIHAuZm9udFNpemUgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5mb250U2l6ZSA9IHsgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZSgpIH07XG4gICAgfVxuXG4gICAgaWYgKG1vZGVsLmNvbmZpZygpLm1hcmsuYXBwbHlDb2xvclRvQmFja2dyb3VuZCAmJiAhbW9kZWwuaGFzKFgpICYmICFtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAuZmlsbCA9IHt2YWx1ZTogJ2JsYWNrJ307IC8vIFRPRE86IGFkZCBydWxlcyBmb3Igc3dhcHBpbmcgYmV0d2VlbiBibGFjayBhbmQgd2hpdGVcblxuICAgICAgLy8gb3BhY2l0eVxuICAgICAgY29uc3Qgb3BhY2l0eSA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3BhY2l0eTtcbiAgICAgIGlmIChvcGFjaXR5KSB7IHAub3BhY2l0eSA9IHsgdmFsdWU6IG9wYWNpdHkgfTsgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIH1cblxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChtb2RlbC5oYXMoVEVYVCkpIHtcbiAgICAgIGlmIChjb250YWlucyhbUVVBTlRJVEFUSVZFLCBURU1QT1JBTF0sIG1vZGVsLmZpZWxkRGVmKFRFWFQpLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZm9ybWF0O1xuICAgICAgICBleHRlbmQocCwgZm9ybWF0TWl4aW5zKG1vZGVsLCBURVhULCBmb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAudGV4dCA9IHsgZmllbGQ6IG1vZGVsLmZpZWxkKFRFWFQpIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChmaWVsZERlZi52YWx1ZSkge1xuICAgICAgcC50ZXh0ID0geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcDtcbiAgfVxufVxuIiwiaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQge1gsIFksIFNJWkV9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IG5hbWVzcGFjZSB0aWNrIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncmVjdCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogTW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyB4XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgcC54YyA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueGMgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgICB9XG5cbiAgICAvLyB5XG4gICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgcC55YyA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAueWMgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgcC53aWR0aCA9IHsgdmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuICAgICAgcC5oZWlnaHQgPSBtb2RlbC5oYXMoU0laRSk/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5zaXplVmFsdWUoWSlcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC53aWR0aCA9IG1vZGVsLmhhcyhTSVpFKT8ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgdmFsdWU6IG1vZGVsLnNpemVWYWx1ZShYKVxuICAgICAgICB9O1xuICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7T3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi9zY2hlbWEvZmllbGRkZWYuc2NoZW1hJztcblxuaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0hBUEUsIFBBVEgsIE9SREVSLCBERVRBSUwsIFJPVywgQ09MVU1OLCBMQUJFTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0FSRUEsIExJTkUsIFRFWFQgYXMgVEVYVE1BUkt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtpbXB1dGVUcmFuc2Zvcm0sIHN0YWNrVHJhbnNmb3JtfSBmcm9tICcuL3N0YWNrJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2FyZWF9IGZyb20gJy4vbWFyay1hcmVhJztcbmltcG9ydCB7YmFyfSBmcm9tICcuL21hcmstYmFyJztcbmltcG9ydCB7bGluZX0gZnJvbSAnLi9tYXJrLWxpbmUnO1xuaW1wb3J0IHtwb2ludCwgY2lyY2xlLCBzcXVhcmV9IGZyb20gJy4vbWFyay1wb2ludCc7XG5pbXBvcnQge3RleHR9IGZyb20gJy4vbWFyay10ZXh0JztcbmltcG9ydCB7dGlja30gZnJvbSAnLi9tYXJrLXRpY2snO1xuaW1wb3J0IHtzb3J0RmllbGR9IGZyb20gJy4vdXRpbCc7XG5cblxuY29uc3QgbWFya0NvbXBpbGVyID0ge1xuICBhcmVhOiBhcmVhLFxuICBiYXI6IGJhcixcbiAgbGluZTogbGluZSxcbiAgcG9pbnQ6IHBvaW50LFxuICB0ZXh0OiB0ZXh0LFxuICB0aWNrOiB0aWNrLFxuICBjaXJjbGU6IGNpcmNsZSxcbiAgc3F1YXJlOiBzcXVhcmVcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTWFyayhtb2RlbDogTW9kZWwpOiBhbnlbXSB7XG4gIGlmIChjb250YWlucyhbTElORSwgQVJFQV0sIG1vZGVsLm1hcmsoKSkpIHtcbiAgICByZXR1cm4gY29tcGlsZVBhdGhNYXJrKG1vZGVsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tcGlsZU5vblBhdGhNYXJrKG1vZGVsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21waWxlUGF0aE1hcmsobW9kZWw6IE1vZGVsKSB7IC8vIFRPRE86IGV4dHJhY3QgdGhpcyBpbnRvIGNvbXBpbGVQYXRoTWFya1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICBjb25zdCBuYW1lID0gbW9kZWwuc3BlYygpLm5hbWU7XG4gIC8vIFRPRE86IHJlcGxhY2UgdGhpcyB3aXRoIG1vcmUgZ2VuZXJhbCBjYXNlIGZvciBjb21wb3NpdGlvblxuICBjb25zdCBoYXNQYXJlbnREYXRhID0gbW9kZWwuaGFzKFJPVykgfHwgbW9kZWwuaGFzKENPTFVNTik7XG4gIGNvbnN0IGRhdGFGcm9tID0ge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpfTtcbiAgY29uc3QgZGV0YWlscyA9IGRldGFpbEZpZWxkcyhtb2RlbCk7XG5cbiAgbGV0IHBhdGhNYXJrczogYW55ID0gW2V4dGVuZChcbiAgICBuYW1lID8geyBuYW1lOiBuYW1lICsgJy1tYXJrcycgfSA6IHt9LFxuICAgIHtcbiAgICAgIHR5cGU6IG1hcmtDb21waWxlclttYXJrXS5tYXJrVHlwZSgpLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIElmIGhhcyBzdWJmYWNldCBmb3IgbGluZS9hcmVhIGdyb3VwLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBvdXRlciBzdWJmYWNldCBncm91cCBiZWxvdy5cbiAgICAgICAgLy8gSWYgaGFzIG5vIHN1YmZhY2V0LCBhZGQgZnJvbS5kYXRhLlxuICAgICAgICBoYXNQYXJlbnREYXRhIHx8IGRldGFpbHMubGVuZ3RoID4gMCA/IHt9IDogZGF0YUZyb20sXG5cbiAgICAgICAgLy8gc29ydCB0cmFuc2Zvcm1cbiAgICAgICAge3RyYW5zZm9ybTogW3sgdHlwZTogJ3NvcnQnLCBieTogc29ydFBhdGhCeShtb2RlbCl9XX1cbiAgICAgICksXG4gICAgICBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH1cbiAgICB9XG4gICldO1xuXG4gIGlmIChkZXRhaWxzLmxlbmd0aCA+IDApIHsgLy8gaGF2ZSBsZXZlbCBvZiBkZXRhaWxzIC0gbmVlZCB0byBmYWNldCBsaW5lIGludG8gc3ViZ3JvdXBzXG4gICAgY29uc3QgZmFjZXRUcmFuc2Zvcm0gPSB7IHR5cGU6ICdmYWNldCcsIGdyb3VwYnk6IGRldGFpbHMgfTtcbiAgICBjb25zdCB0cmFuc2Zvcm06IGFueVtdID0gbWFyayA9PT0gQVJFQSAmJiBtb2RlbC5zdGFjaygpID9cbiAgICAgIC8vIEZvciBzdGFja2VkIGFyZWEsIHdlIG5lZWQgdG8gaW1wdXRlIG1pc3NpbmcgdHVwbGVzIGFuZCBzdGFjayB2YWx1ZXNcbiAgICAgIC8vIChNYXJrIGxheWVyIG9yZGVyIGRvZXMgbm90IG1hdHRlciBmb3Igc3RhY2tlZCBjaGFydHMpXG4gICAgICBbaW1wdXRlVHJhbnNmb3JtKG1vZGVsKSwgc3RhY2tUcmFuc2Zvcm0obW9kZWwpLCBmYWNldFRyYW5zZm9ybV0gOlxuICAgICAgLy8gRm9yIG5vbi1zdGFja2VkIHBhdGggKGxpbmUvYXJlYSksIHdlIG5lZWQgdG8gZmFjZXQgYW5kIHBvc3NpYmx5IHNvcnRcbiAgICAgIFtdLmNvbmNhdChcbiAgICAgICAgZmFjZXRUcmFuc2Zvcm0sXG4gICAgICAgIC8vIGlmIG1vZGVsIGhhcyBgb3JkZXJgLCB0aGVuIHNvcnQgbWFyaydzIGxheWVyIG9yZGVyIGJ5IGBvcmRlcmAgZmllbGQocylcbiAgICAgICAgbW9kZWwuaGFzKE9SREVSKSA/IFt7dHlwZTonc29ydCcsIGJ5OiBzb3J0QnkobW9kZWwpfV0gOiBbXVxuICAgICAgKTtcblxuICAgIHJldHVybiBbe1xuICAgICAgbmFtZTogKG5hbWUgPyBuYW1lICsgJy0nIDogJycpICsgbWFyayArICctZmFjZXQnLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBoYXNQYXJlbnREYXRhID8ge30gOiBkYXRhRnJvbSxcbiAgICAgICAge3RyYW5zZm9ybTogdHJhbnNmb3JtfVxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXJrczogcGF0aE1hcmtzXG4gICAgfV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhdGhNYXJrcztcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21waWxlTm9uUGF0aE1hcmsobW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gIGNvbnN0IG5hbWUgPSBtb2RlbC5zcGVjKCkubmFtZTtcbiAgLy8gVE9ETzogcmVwbGFjZSB0aGlzIHdpdGggbW9yZSBnZW5lcmFsIGNhc2UgZm9yIGNvbXBvc2l0aW9uXG4gIGNvbnN0IGhhc1BhcmVudERhdGEgPSBtb2RlbC5oYXMoUk9XKSB8fCBtb2RlbC5oYXMoQ09MVU1OKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuXG4gIGxldCBtYXJrcyA9IFtdOyAvLyBUT0RPOiB2Z01hcmtzXG4gIGlmIChtYXJrID09PSBURVhUTUFSSyAmJlxuICAgIG1vZGVsLmhhcyhDT0xPUikgJiZcbiAgICBtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpXG4gICkge1xuICAgIC8vIGFkZCBiYWNrZ3JvdW5kIHRvICd0ZXh0JyBtYXJrcyBpZiBoYXMgY29sb3JcbiAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgIG5hbWUgPyB7IG5hbWU6IG5hbWUgKyAnLWJhY2tncm91bmQnIH0gOiB7fSxcbiAgICAgIHsgdHlwZTogJ3JlY3QnIH0sXG4gICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgaGFzUGFyZW50RGF0YSA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IHRleHQuYmFja2dyb3VuZChtb2RlbCkgfSB9XG4gICAgKSk7XG4gIH1cblxuICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICBuYW1lID8geyBuYW1lOiBuYW1lICsgJy1tYXJrcycgfSA6IHt9LFxuICAgIHsgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKCkgfSxcbiAgICAvLyBBZGQgYGZyb21gIGlmIG5lZWRlZFxuICAgICghaGFzUGFyZW50RGF0YSB8fCBtb2RlbC5zdGFjaygpIHx8IG1vZGVsLmhhcyhPUkRFUikpID8ge1xuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBmYWNldGVkLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlXG4gICAgICAgIGhhc1BhcmVudERhdGEgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAvLyBgZnJvbS50cmFuc2Zvcm1gXG4gICAgICAgIG1vZGVsLnN0YWNrKCkgPyAvLyBTdGFja2VkIENoYXJ0IG5lZWQgc3RhY2sgdHJhbnNmb3JtXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IFtzdGFja1RyYW5zZm9ybShtb2RlbCldIH0gOlxuICAgICAgICBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAgICAgICAvLyBpZiBub24tc3RhY2tlZCwgZGV0YWlsIGZpZWxkIGRldGVybWluZXMgdGhlIGxheWVyIG9yZGVyIG9mIGVhY2ggbWFya1xuICAgICAgICAgIHsgdHJhbnNmb3JtOiBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIH0gOlxuICAgICAgICAgIHt9XG4gICAgICApXG4gICAgfSA6IHt9LFxuICAgIC8vIHByb3BlcnRpZXMgZ3JvdXBzXG4gICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH0gfVxuICApKTtcblxuICBpZiAobW9kZWwuaGFzKExBQkVMKSAmJiBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKSB7XG4gICAgY29uc3QgbGFiZWxQcm9wZXJ0aWVzID0gbWFya0NvbXBpbGVyW21hcmtdLmxhYmVscyhtb2RlbCk7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIGxhYmVsIG1ldGhvZCBmb3IgY3VycmVudCBtYXJrIHR5cGUuXG4gICAgaWYgKGxhYmVsUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7IC8vIElmIGxhYmVsIGlzIHN1cHBvcnRlZFxuICAgICAgLy8gYWRkIGxhYmVsIGdyb3VwXG4gICAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgICAgbmFtZSA/IHsgbmFtZTogbmFtZSArICctbGFiZWwnIH0gOiB7fSxcbiAgICAgICAge3R5cGU6ICd0ZXh0J30sXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaGFzUGFyZW50RGF0YSA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgICAgLy8gUHJvcGVydGllc1xuICAgICAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiBsYWJlbFByb3BlcnRpZXMgfSB9XG4gICAgICApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFya3M7XG59XG5cbmZ1bmN0aW9uIHNvcnRCeShtb2RlbDogTW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5oYXMoT1JERVIpKSB7XG4gICAgbGV0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLm9yZGVyO1xuICAgIGlmIChjaGFubmVsRGVmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vIHNvcnQgYnkgbXVsdGlwbGUgZmllbGRzXG4gICAgICByZXR1cm4gY2hhbm5lbERlZi5tYXAoc29ydEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc29ydCBieSBvbmUgZmllbGRcbiAgICAgIHJldHVybiBzb3J0RmllbGQoY2hhbm5lbERlZiBhcyBPcmRlckNoYW5uZWxEZWYpOyAvLyBoYXZlIHRvIGFkZCBPcmRlckNoYW5uZWxEZWYgdG8gbWFrZSB0c2lmeSBub3QgY29tcGxhaW5pbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7IC8vIHVzZSBkZWZhdWx0IG9yZGVyXG59XG5cbi8qKlxuICogUmV0dXJuIHBhdGggb3JkZXIgZm9yIHNvcnQgdHJhbnNmb3JtJ3MgYnkgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gc29ydFBhdGhCeShtb2RlbDogTW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5tYXJrKCkgPT09IExJTkUgJiYgbW9kZWwuaGFzKFBBVEgpKSB7XG4gICAgLy8gRm9yIG9ubHkgbGluZSwgc29ydCBieSB0aGUgcGF0aCBmaWVsZCBpZiBpdCBpcyBzcGVjaWZpZWQuXG4gICAgY29uc3QgY2hhbm5lbERlZiA9IG1vZGVsLmVuY29kaW5nKCkucGF0aDtcbiAgICBpZiAoY2hhbm5lbERlZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAvLyBzb3J0IGJ5IG11bHRpcGxlIGZpZWxkc1xuICAgICAgcmV0dXJuIGNoYW5uZWxEZWYubWFwKHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNvcnQgYnkgb25lIGZpZWxkXG4gICAgICByZXR1cm4gc29ydEZpZWxkKGNoYW5uZWxEZWYgYXMgT3JkZXJDaGFubmVsRGVmKTsgLy8gaGF2ZSB0byBhZGQgT3JkZXJDaGFubmVsRGVmIHRvIG1ha2UgdHNpZnkgbm90IGNvbXBsYWluaW5nXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEZvciBib3RoIGxpbmUgYW5kIGFyZWEsIHdlIHNvcnQgdmFsdWVzIGJhc2VkIG9uIGRpbWVuc2lvbiBieSBkZWZhdWx0XG4gICAgcmV0dXJuICctJyArIG1vZGVsLmZpZWxkKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSAnaG9yaXpvbnRhbCcgPyBZIDogWCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpc3Qgb2YgZGV0YWlsIGZpZWxkcyAoZm9yICdjb2xvcicsICdzaGFwZScsIG9yICdkZXRhaWwnIGNoYW5uZWxzKVxuICogdGhhdCB0aGUgbW9kZWwncyBzcGVjIGNvbnRhaW5zLlxuICovXG5mdW5jdGlvbiBkZXRhaWxGaWVsZHMobW9kZWw6IE1vZGVsKTogc3RyaW5nW10ge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIFNIQVBFXS5yZWR1Y2UoZnVuY3Rpb24oZGV0YWlscywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmFnZ3JlZ2F0ZSkge1xuICAgICAgZGV0YWlscy5wdXNoKG1vZGVsLmZpZWxkKGNoYW5uZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH0sIFtdKTtcbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSB2YXIgZXhwb3J0cztcblxuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge1NjYWxlfSBmcm9tICcuLi9zY2hlbWEvc2NhbGUuc2NoZW1hJztcblxuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHtTSEFSRURfRE9NQUlOX09QU30gZnJvbSAnLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIFNIQVBFLCBTSVpFLCBDT0xPUiwgVEVYVCwgaGFzU2NhbGUsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTT1VSQ0UsIFNUQUNLRURfU0NBTEV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7TWFyaywgQkFSLCBURVhUIGFzIFRFWFRfTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge3Jhd0RvbWFpbiwgc21hbGxlc3RVbml0fSBmcm9tICcuL3RpbWUnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIFN0YWNrT2Zmc2V0fSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5cbi8qKlxuICogQ29sb3IgUmFtcCdzIHNjYWxlIGZvciBsZWdlbmRzLiAgVGhpcyBzY2FsZSBoYXMgdG8gYmUgb3JkaW5hbCBzbyB0aGF0IGl0c1xuICogbGVnZW5kcyBzaG93IGEgbGlzdCBvZiBudW1iZXJzLlxuICovXG5leHBvcnQgY29uc3QgQ09MT1JfTEVHRU5EID0gJ2NvbG9yX2xlZ2VuZCc7XG5cbi8vIHNjYWxlIHVzZWQgdG8gZ2V0IGxhYmVscyBmb3IgYmlubmVkIGNvbG9yIHNjYWxlc1xuZXhwb3J0IGNvbnN0IENPTE9SX0xFR0VORF9MQUJFTCA9ICdjb2xvcl9sZWdlbmRfbGFiZWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVNjYWxlcyhjaGFubmVsczogQ2hhbm5lbFtdLCBtb2RlbDogTW9kZWwpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmZpbHRlcihoYXNTY2FsZSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uKHNjYWxlczogYW55W10sIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIHNjYWxlcyBuZWVkZWQgdG8gc3VwcG9ydCBvcmRpbmFsIGxlZ2VuZHMgKGxpc3Qgb2YgdmFsdWVzKVxuICAgICAgLy8gZm9yIGNvbG9yIHJhbXAuXG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IgJiYgbW9kZWwubGVnZW5kKENPTE9SKSAmJiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQpKSB7XG4gICAgICAgIHNjYWxlcy5wdXNoKGNvbG9yTGVnZW5kU2NhbGUobW9kZWwsIGZpZWxkRGVmKSk7XG4gICAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgICBzY2FsZXMucHVzaChiaW5Db2xvckxlZ2VuZExhYmVsKG1vZGVsLCBmaWVsZERlZikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNjYWxlcy5wdXNoKG1haW5TY2FsZShtb2RlbCwgZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgIHJldHVybiBzY2FsZXM7XG4gICAgfSwgW10pO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWFpbiBzY2FsZSBmb3IgZWFjaCBjaGFubmVsLiAgKE9ubHkgY29sb3IgY2FuIGhhdmUgbXVsdGlwbGUgc2NhbGVzLilcbiAqL1xuZnVuY3Rpb24gbWFpblNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGNvbnN0IHNvcnQgPSBtb2RlbC5zb3J0KGNoYW5uZWwpO1xuXG4gIGxldCBzY2FsZURlZjogYW55ID0ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKSxcbiAgICB0eXBlOiBzY2FsZVR5cGUoc2NhbGUsIGZpZWxkRGVmLCBjaGFubmVsLCBtb2RlbC5tYXJrKCkpLFxuICB9O1xuXG4gIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwsIHNjYWxlRGVmLnR5cGUpO1xuICBleHRlbmQoc2NhbGVEZWYsIHJhbmdlTWl4aW5zKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCwgc2NhbGVEZWYudHlwZSkpO1xuXG4gIGlmIChzb3J0ICYmICh0eXBlb2Ygc29ydCA9PT0gJ3N0cmluZycgPyBzb3J0IDogc29ydC5vcmRlcikgPT09ICdkZXNjZW5kaW5nJykge1xuICAgIHNjYWxlRGVmLnJldmVyc2UgPSB0cnVlO1xuICB9XG5cbiAgLy8gQWRkIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgW1xuICAgIC8vIGdlbmVyYWwgcHJvcGVydGllc1xuICAgICdyb3VuZCcsXG4gICAgLy8gcXVhbnRpdGF0aXZlIC8gdGltZVxuICAgICdjbGFtcCcsICduaWNlJyxcbiAgICAvLyBxdWFudGl0YXRpdmVcbiAgICAnZXhwb25lbnQnLCAnemVybycsXG4gICAgLy8gb3JkaW5hbFxuICAgICdwYWRkaW5nJywgJ3BvaW50cydcbiAgXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBleHBvcnRzW3Byb3BlcnR5XShzY2FsZVtwcm9wZXJ0eV0sIHNjYWxlRGVmLnR5cGUsIGNoYW5uZWwsIGZpZWxkRGVmKTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NhbGVEZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2NhbGVEZWY7XG59XG5cbi8qKlxuICogIFJldHVybiBhIHNjYWxlICBmb3IgcHJvZHVjaW5nIG9yZGluYWwgc2NhbGUgZm9yIGxlZ2VuZHMuXG4gKiAgLSBGb3IgYW4gb3JkaW5hbCBmaWVsZCwgcHJvdmlkZSBhbiBvcmRpbmFsIHNjYWxlIHRoYXQgbWFwcyByYW5rIHZhbHVlcyB0byBmaWVsZCB2YWx1ZVxuICogIC0gRm9yIGEgZmllbGQgd2l0aCBiaW4gb3IgdGltZVVuaXQsIHByb3ZpZGUgYW4gaWRlbnRpdHkgb3JkaW5hbCBzY2FsZVxuICogICAgKG1hcHBpbmcgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVtc2VsdmVzKVxuICovXG5mdW5jdGlvbiBjb2xvckxlZ2VuZFNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogQ09MT1JfTEVHRU5ELFxuICAgIHR5cGU6ICdvcmRpbmFsJyxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgLy8gdXNlIHJhbmtfPGZpZWxkPiBmb3Igb3JkaW5hbCB0eXBlLCBmb3IgYmluIGFuZCB0aW1lVW5pdCB1c2UgZGVmYXVsdCBmaWVsZFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCAoZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSA/IHt9IDoge3ByZWZuOiAncmFua18nfSksIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksIHNvcnQ6IHRydWV9XG4gIH07XG59XG5cbi8qKlxuICogIFJldHVybiBhbiBhZGRpdGlvbmFsIHNjYWxlIGZvciBiaW4gbGFiZWxzIGJlY2F1c2Ugd2UgbmVlZCB0byBtYXAgYmluX3N0YXJ0IHRvIGJpbl9yYW5nZSBpbiBsZWdlbmRzXG4gKi9cbmZ1bmN0aW9uIGJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBDT0xPUl9MRUdFTkRfTEFCRUwsXG4gICAgdHlwZTogJ29yZGluYWwnLFxuICAgIGRvbWFpbjoge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsICB7cHJlZm46ICdyYW5rXyd9KSxcbiAgICAgIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVUeXBlKHNjYWxlOiBTY2FsZSwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsLCBtYXJrOiBNYXJrKTogU2NhbGVUeXBlIHtcbiAgaWYgKCFoYXNTY2FsZShjaGFubmVsKSkge1xuICAgIC8vIFRoZXJlIGlzIG5vIHNjYWxlIGZvciB0aGVzZSBjaGFubmVsc1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgY2FuJ3QgdXNlIGxpbmVhci90aW1lIGZvciByb3csIGNvbHVtbiBvciBzaGFwZVxuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgaWYgKHNjYWxlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY2FsZS50eXBlO1xuICB9XG5cbiAgc3dpdGNoIChmaWVsZERlZi50eXBlKSB7XG4gICAgY2FzZSBOT01JTkFMOlxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgIGNhc2UgT1JESU5BTDpcbiAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgICByZXR1cm4gU2NhbGVUeXBlLkxJTkVBUjsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICBjYXNlIFRFTVBPUkFMOlxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgICAgIGNhc2UgVGltZVVuaXQuREFZOlxuICAgICAgICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICAgICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIGRhdGUsIHllYXIsIG1pbnV0ZSwgc2Vjb25kLCB5ZWFybW9udGgsIG1vbnRoZGF5LCAuLi5cbiAgICAgICAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xuXG4gICAgY2FzZSBRVUFOVElUQVRJVkU6XG4gICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIHJldHVybiBjb250YWlucyhbWCwgWSwgQ09MT1JdLCBjaGFubmVsKSA/IFNjYWxlVHlwZS5MSU5FQVIgOiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuTElORUFSO1xuICB9XG5cbiAgLy8gc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXNcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW4oc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6Q2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIGlmIChzY2FsZS5kb21haW4pIHsgLy8gZXhwbGljaXQgdmFsdWVcbiAgICByZXR1cm4gc2NhbGUuZG9tYWluO1xuICB9XG5cbiAgLy8gc3BlY2lhbCBjYXNlIGZvciB0ZW1wb3JhbCBzY2FsZVxuICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICBpZiAocmF3RG9tYWluKGZpZWxkRGVmLnRpbWVVbml0LCBjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogZmllbGREZWYudGltZVVuaXQsXG4gICAgICAgIGZpZWxkOiAnZGF0ZSdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgc29ydDoge1xuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICAgIG9wOiAnbWluJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBGb3Igc3RhY2ssIHVzZSBTVEFDS0VEIGRhdGEuXG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgaWYgKHN0YWNrICYmIGNoYW5uZWwgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgIGlmKHN0YWNrLm9mZnNldCA9PT0gU3RhY2tPZmZzZXQuTk9STUFMSVpFKSB7XG4gICAgICByZXR1cm4gWzAsIDFdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogU1RBQ0tFRF9TQ0FMRSxcbiAgICAgIC8vIFNUQUNLRURfU0NBTEUgcHJvZHVjZXMgc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3N1bV8nfSlcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgdXNlUmF3RG9tYWluID0gX3VzZVJhd0RvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwsIHNjYWxlVHlwZSksXG4gIHNvcnQgPSBkb21haW5Tb3J0KG1vZGVsLCBjaGFubmVsLCBzY2FsZVR5cGUpO1xuXG4gIGlmICh1c2VSYXdEb21haW4pIHsgLy8gdXNlUmF3RG9tYWluIC0gb25seSBRL1RcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogU09VUkNFLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtub0FnZ3JlZ2F0ZTogdHJ1ZX0pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluXG4gICAgcmV0dXJuIHNjYWxlVHlwZSA9PT0gJ29yZGluYWwnID8ge1xuICAgICAgLy8gb3JkaW5hbCBiaW4gc2NhbGUgdGFrZXMgZG9tYWluIGZyb20gYmluX3JhbmdlLCBvcmRlcmVkIGJ5IGJpbl9zdGFydFxuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfcmFuZ2UnIH0pLFxuICAgICAgc29ydDoge1xuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICBvcDogJ21pbicgLy8gbWluIG9yIG1heCBkb2Vzbid0IG1hdHRlciBzaW5jZSBzYW1lIF9yYW5nZSB3b3VsZCBoYXZlIHRoZSBzYW1lIF9zdGFydFxuICAgICAgfVxuICAgIH0gOiBjaGFubmVsID09PSBDT0xPUiA/IHtcbiAgICAgIC8vIEN1cnJlbnRseSwgYmlubmVkIG9uIGNvbG9yIHVzZXMgbGluZWFyIHNjYWxlIGFuZCB0aHVzIHVzZSBfc3RhcnQgcG9pbnRcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgIH0gOiB7XG4gICAgICAvLyBvdGhlciBsaW5lYXIgYmluIHNjYWxlIG1lcmdlcyBib3RoIGJpbl9zdGFydCBhbmQgYmluX2VuZCBmb3Igbm9uLW9yZGluYWwgc2NhbGVcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IFtcbiAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICBdXG4gICAgfTtcbiAgfSBlbHNlIGlmIChzb3J0KSB7IC8vIGhhdmUgc29ydCAtLSBvbmx5IGZvciBvcmRpbmFsXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIElmIHNvcnQgYnkgYWdncmVnYXRpb24gb2YgYSBzcGVjaWZpZWQgc29ydCBmaWVsZCwgd2UgbmVlZCB0byB1c2UgU09VUkNFIHRhYmxlLFxuICAgICAgLy8gc28gd2UgY2FuIGFnZ3JlZ2F0ZSB2YWx1ZXMgZm9yIHRoZSBzY2FsZSBpbmRlcGVuZGVudGx5IGZyb20gdGhlIG1haW4gYWdncmVnYXRpb24uXG4gICAgICBkYXRhOiBzb3J0Lm9wID8gU09VUkNFIDogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAncmFua18nfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHNvcnRcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCAmJiBjaGFubmVsID09PSBDT0xPUikgPyBtb2RlbC5maWVsZChjaGFubmVsLCB7cHJlZm46ICdyYW5rXyd9KSA6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpblNvcnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IHN0cmluZyk6IGFueSB7XG4gIGlmIChzY2FsZVR5cGUgIT09ICdvcmRpbmFsJykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcbiAgaWYgKGNvbnRhaW5zKFsnYXNjZW5kaW5nJywgJ2Rlc2NlbmRpbmcnLCB1bmRlZmluZWQgLyogZGVmYXVsdCA9YXNjZW5kaW5nKi9dLCBzb3J0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gU29ydGVkIGJhc2VkIG9uIGFuIGFnZ3JlZ2F0ZSBjYWxjdWxhdGlvbiBvdmVyIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQgKG9ubHkgZm9yIG9yZGluYWwgc2NhbGUpXG4gIGlmICh0eXBlb2Ygc29ydCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cblxuICAvLyBzb3J0ID09PSAnbm9uZSdcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG4vKipcbiAqIERldGVybWluZSBpZiB1c2VSYXdEb21haW4gc2hvdWxkIGJlIGFjdGl2YXRlZCBmb3IgdGhpcyBzY2FsZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRvbnMgYXBwbGllczpcbiAqIDEuIGB1c2VSYXdEb21haW5gIGlzIGVuYWJsZWQgZWl0aGVyIHRocm91Z2ggc2NhbGUgb3IgY29uZmlnXG4gKiAyLiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBpcyBub3QgYGNvdW50YCBvciBgc3VtYFxuICogMy4gVGhlIHNjYWxlIGlzIHF1YW50aXRhdGl2ZSBvciB0aW1lIHNjYWxlLlxuICovXG5mdW5jdGlvbiBfdXNlUmF3RG9tYWluIChzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICByZXR1cm4gc2NhbGUudXNlUmF3RG9tYWluICYmIC8vICBpZiB1c2VSYXdEb21haW4gaXMgZW5hYmxlZFxuICAgIC8vIG9ubHkgYXBwbGllZCB0byBhZ2dyZWdhdGUgdGFibGVcbiAgICBmaWVsZERlZi5hZ2dyZWdhdGUgJiZcbiAgICAvLyBvbmx5IGFjdGl2YXRlZCBpZiB1c2VkIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2VzIHZhbHVlcyByYW5naW5nIGluIHRoZSBkb21haW4gb2YgdGhlIHNvdXJjZSBkYXRhXG4gICAgU0hBUkVEX0RPTUFJTl9PUFMuaW5kZXhPZihmaWVsZERlZi5hZ2dyZWdhdGUpID49IDAgJiZcbiAgICAoXG4gICAgICAvLyBRIGFsd2F5cyB1c2VzIHF1YW50aXRhdGl2ZSBzY2FsZSBleGNlcHQgd2hlbiBpdCdzIGJpbm5lZC5cbiAgICAgIC8vIEJpbm5lZCBmaWVsZCBoYXMgc2ltaWxhciB2YWx1ZXMgaW4gYm90aCB0aGUgc291cmNlIHRhYmxlIGFuZCB0aGUgc3VtbWFyeSB0YWJsZVxuICAgICAgLy8gYnV0IHRoZSBzdW1tYXJ5IHRhYmxlIGhhcyBmZXdlciB2YWx1ZXMsIHRoZXJlZm9yZSBiaW5uZWQgZmllbGRzIGRyYXdcbiAgICAgIC8vIGRvbWFpbiB2YWx1ZXMgZnJvbSB0aGUgc3VtbWFyeSB0YWJsZS5cbiAgICAgIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikgfHxcbiAgICAgIC8vIFQgdXNlcyBub24tb3JkaW5hbCBzY2FsZSB3aGVuIHRoZXJlJ3Mgbm8gdW5pdCBvciB3aGVuIHRoZSB1bml0IGlzIG5vdCBvcmRpbmFsLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGNvbnRhaW5zKFsndGltZScsICd1dGMnXSwgc2NhbGVUeXBlKSlcbiAgICApO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZU1peGlucyhzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBzdHJpbmcpOiBhbnkge1xuICAvLyBUT0RPOiBuZWVkIHRvIGFkZCBydWxlIGZvciBxdWFudGlsZSwgcXVhbnRpemUsIHRocmVzaG9sZCBzY2FsZVxuXG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCksXG4gIHNjYWxlQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuc2NhbGU7XG5cbiAgaWYgKHNjYWxlVHlwZSA9PT0gJ29yZGluYWwnICYmIHNjYWxlLmJhbmRTaXplICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4ge2JhbmRTaXplOiBzY2FsZS5iYW5kU2l6ZX07XG4gIH1cblxuICBpZiAoc2NhbGUucmFuZ2UgJiYgIWNvbnRhaW5zKFtYLCBZLCBST1csIENPTFVNTl0sIGNoYW5uZWwpKSB7XG4gICAgLy8gZXhwbGljaXQgdmFsdWUgKERvIG5vdCBhbGxvdyBleHBsaWNpdCB2YWx1ZXMgZm9yIFgsIFksIFJPVywgQ09MVU1OKVxuICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlLnJhbmdlfTtcbiAgfVxuXG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICAgIC8vIHdlIGNhbid0IHVzZSB7cmFuZ2U6IFwid2lkdGhcIn0gaGVyZSBzaW5jZSB3ZSBwdXQgc2NhbGUgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgIC8vIG5vdCBpbnNpZGUgdGhlIGNlbGwsIHNvIHNjYWxlIGlzIHJldXNhYmxlIGZvciBheGVzIGdyb3VwXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlTWluOiAwLFxuICAgICAgICByYW5nZU1heDogbW9kZWwuY2VsbFdpZHRoKCkgLy8gRml4ZWQgY2VsbCB3aWR0aCBmb3Igbm9uLW9yZGluYWxcbiAgICAgIH07XG4gICAgY2FzZSBZOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IG1vZGVsLmNlbGxIZWlnaHQoKSwgLy8gRml4ZWQgY2VsbCBoZWlnaHQgZm9yIG5vbi1vcmRpbmFsXG4gICAgICAgIHJhbmdlTWF4OiAwXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIGlmIChtb2RlbC5pcyhCQVIpKSB7XG4gICAgICAgIGlmIChzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLmJhclNpemVSYW5nZX07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gbW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09ICdob3Jpem9udGFsJyA/IFkgOiBYO1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBbIG1vZGVsLmNvbmZpZygpLm1hcmsuYmFyVGhpblNpemUsIG1vZGVsLnNjYWxlKGRpbWVuc2lvbikuYmFuZFNpemVdfTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZWwuaXMoVEVYVF9NQVJLKSkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5mb250U2l6ZVJhbmdlIH07XG4gICAgICB9XG4gICAgICAvLyBlbHNlIC0tIHBvaW50LCBzcXVhcmUsIGNpcmNsZVxuICAgICAgaWYgKHNjYWxlQ29uZmlnLnBvaW50U2l6ZVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2V9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB4SXNNZWFzdXJlID0gbW9kZWwuaXNNZWFzdXJlKFgpO1xuICAgICAgY29uc3QgeUlzTWVhc3VyZSA9IG1vZGVsLmlzTWVhc3VyZShZKTtcblxuICAgICAgY29uc3QgYmFuZFNpemUgPSB4SXNNZWFzdXJlICE9PSB5SXNNZWFzdXJlID9cbiAgICAgICAgbW9kZWwuc2NhbGUoeElzTWVhc3VyZSA/IFkgOiBYKS5iYW5kU2l6ZSA6XG4gICAgICAgIE1hdGgubWluKFxuICAgICAgICAgIG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplLFxuICAgICAgICAgIG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplXG4gICAgICAgICk7XG5cbiAgICAgIHJldHVybiB7cmFuZ2U6IFs5LCAoYmFuZFNpemUgLSAyKSAqIChiYW5kU2l6ZSAtIDIpXX07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNoYXBlUmFuZ2V9O1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gTk9NSU5BTCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5ub21pbmFsQ29sb3JSYW5nZX07XG4gICAgICB9XG4gICAgICAvLyBlbHNlIC0tIG9yZGluYWwsIHRpbWUsIG9yIHF1YW50aXRhdGl2ZVxuICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcuc2VxdWVudGlhbENvbG9yUmFuZ2V9O1xuICAgIGNhc2UgUk9XOlxuICAgICAgcmV0dXJuIHtyYW5nZTogJ2hlaWdodCd9O1xuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHtyYW5nZTogJ3dpZHRoJ307XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAocHJvcDogYm9vbGVhbiwgc2NhbGVUeXBlOiBzdHJpbmcpIHtcbiAgLy8gT25seSB3b3JrcyBmb3Igc2NhbGUgd2l0aCBib3RoIGNvbnRpbnVvdXMgZG9tYWluIGNvbnRpbnVvdXMgcmFuZ2VcbiAgLy8gKERvZXNuJ3Qgd29yayBmb3IgcXVhbnRpemUsIHF1YW50aWxlLCB0aHJlc2hvbGQsIG9yZGluYWwpXG4gIGlmIChjb250YWlucyhbJ2xpbmVhcicsICdwb3cnLCAnc3FydCcsICdsb2cnLCAndGltZScsICd1dGMnXSwgc2NhbGVUeXBlKSkge1xuICAgIHJldHVybiBwcm9wO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudChwcm9wOiBudW1iZXIsIHNjYWxlVHlwZTogc3RyaW5nKSB7XG4gIGlmIChzY2FsZVR5cGUgPT09ICdwb3cnKSB7XG4gICAgcmV0dXJuIHByb3A7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5pY2UocHJvcDogYm9vbGVhbnxzdHJpbmcsIHNjYWxlVHlwZTogc3RyaW5nLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgaWYgKGNvbnRhaW5zKFsnbGluZWFyJywgJ3BvdycsICdzcXJ0JywgJ2xvZycsICd0aW1lJywgJ3V0YycsICdxdWFudGl6ZSddLCBzY2FsZVR5cGUpKSB7XG4gICAgaWYgKHByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHByb3A7XG4gICAgfVxuICAgIGlmIChjb250YWlucyhbJ3RpbWUnLCAndXRjJ10sIHNjYWxlVHlwZSkpIHtcbiAgICAgIHJldHVybiBzbWFsbGVzdFVuaXQoZmllbGREZWYudGltZVVuaXQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbnMoW1gsIFldLCBjaGFubmVsKTsgLy8gcmV0dXJuIHRydWUgZm9yIHF1YW50aXRhdGl2ZSBYL1lcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYWRkaW5nKHByb3A6IG51bWJlciwgc2NhbGVUeXBlOiBzdHJpbmcsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLyogUGFkZGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIFggYW5kIFkuXG4gICAqXG4gICAqIEJhc2ljYWxseSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gYWRkIHBhZGRpbmcgZm9yIGNvbG9yIGFuZCBzaXplLlxuICAgKlxuICAgKiBXZSBkbyBub3QgdXNlIGQzIHNjYWxlJ3MgcGFkZGluZyBmb3Igcm93L2NvbHVtbiBiZWNhdXNlIHBhZGRpbmcgdGhlcmVcbiAgICogaXMgYSByYXRpbyAoWzAsIDFdKSBhbmQgaXQgY2F1c2VzIHRoZSBwYWRkaW5nIHRvIGJlIGRlY2ltYWxzLlxuICAgKiBUaGVyZWZvcmUsIHdlIG1hbnVhbGx5IGNhbGN1bGF0ZSBwYWRkaW5nIGluIHRoZSBsYXlvdXQgYnkgb3Vyc2VsdmVzLlxuICAgKi9cbiAgaWYgKHNjYWxlVHlwZSA9PT0gJ29yZGluYWwnICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gcHJvcDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKF9fLCBzY2FsZVR5cGU6IHN0cmluZywgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoc2NhbGVUeXBlID09PSAnb3JkaW5hbCcgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIC8vIFdlIGFsd2F5cyB1c2Ugb3JkaW5hbCBwb2ludCBzY2FsZSBmb3IgeCBhbmQgeS5cbiAgICAvLyBUaHVzIGBwb2ludHNgIGlzbid0IGluY2x1ZGVkIGluIHRoZSBzY2FsZSdzIHNjaGVtYS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQocHJvcDogYm9vbGVhbiwgc2NhbGVUeXBlOiBzdHJpbmcsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKGNvbnRhaW5zKFtYLCBZLCBST1csIENPTFVNTiwgU0laRV0sIGNoYW5uZWwpICYmIHByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBwcm9wO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ocHJvcDogYm9vbGVhbiwgc2NhbGVUeXBlOiBzdHJpbmcsIGNoYW5uZWw6IENoYW5uZWwsIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAvLyBvbmx5IGFwcGxpY2FibGUgZm9yIG5vbi1vcmRpbmFsIHNjYWxlXG4gIGlmICghY29udGFpbnMoWyd0aW1lJywgJ3V0YycsICdvcmRpbmFsJ10sIHNjYWxlVHlwZSkpIHtcbiAgICBpZiAocHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcHJvcDtcbiAgICB9XG4gICAgLy8gQnkgZGVmYXVsdCwgcmV0dXJuIHRydWUgb25seSBmb3Igbm9uLWJpbm5lZCwgcXVhbnRpdGF0aXZlIHgtc2NhbGUgb3IgeS1zY2FsZS5cbiAgICByZXR1cm4gIWZpZWxkRGVmLmJpbiAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9zY2hlbWEvZW5jb2Rpbmcuc2NoZW1hJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9zY2hlbWEvY29uZmlnLnNjaGVtYSc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9zY2hlbWEvZmllbGRkZWYuc2NoZW1hJztcbmltcG9ydCB7TW9kZWwsIFNjYWxlTWFwfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgWSwgQ09MT1IsIERFVEFJTCwgT1JERVJ9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIFN0YWNrT2Zmc2V0fSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge0JBUiwgQVJFQSwgTWFya30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2ZpZWxkLCBpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7aGFzLCBpc0FnZ3JlZ2F0ZX0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FycmF5LCBjb250YWluc30gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge3NvcnRGaWVsZH0gZnJvbSAnLi91dGlsJztcblxuaW1wb3J0IHtzY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrUHJvcGVydGllcyB7XG4gIC8qKiBEaW1lbnNpb24gYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBncm91cGJ5Q2hhbm5lbDogQ2hhbm5lbDtcbiAgLyoqIE1lYXN1cmUgYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBmaWVsZENoYW5uZWw6IENoYW5uZWw7XG5cbiAgLyoqIFN0YWNrLWJ5IGZpZWxkIG5hbWVzIChmcm9tICdjb2xvcicgYW5kICdkZXRhaWwnKSAqL1xuICBzdGFja0ZpZWxkczogc3RyaW5nW107XG5cbiAgLyoqIFN0YWNrIG9mZnNldCBwcm9wZXJ0eS4gKi9cbiAgb2Zmc2V0OiBTdGFja09mZnNldDtcbn1cblxuLy8gVE9ETzogcHV0IGFsbCB2ZWdhIGludGVyZmFjZSBpbiBvbmUgcGxhY2VcbmludGVyZmFjZSBTdGFja1RyYW5zZm9ybSB7XG4gIHR5cGU6IHN0cmluZztcbiAgb2Zmc2V0PzogYW55O1xuICBncm91cGJ5OiBhbnk7XG4gIGZpZWxkOiBhbnk7XG4gIHNvcnRieTogYW55O1xuICBvdXRwdXQ6IGFueTtcbn1cblxuLyoqIENvbXBpbGUgc3RhY2sgcHJvcGVydGllcyBmcm9tIGEgZ2l2ZW4gc3BlYyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVTdGFja1Byb3BlcnRpZXMobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBzY2FsZTogU2NhbGVNYXAsIGNvbmZpZzogQ29uZmlnKSB7XG4gIGNvbnN0IHN0YWNrRmllbGRzID0gZ2V0U3RhY2tGaWVsZHMobWFyaywgZW5jb2RpbmcsIHNjYWxlKTtcblxuICBpZiAoc3RhY2tGaWVsZHMubGVuZ3RoID4gMCAmJlxuICAgICAgY29udGFpbnMoW0JBUiwgQVJFQV0sIG1hcmspICYmXG4gICAgICBjb25maWcubWFyay5zdGFja2VkICE9PSBTdGFja09mZnNldC5OT05FICYmXG4gICAgICBpc0FnZ3JlZ2F0ZShlbmNvZGluZykpIHtcblxuICAgIGNvbnN0IGlzWE1lYXN1cmUgPSBoYXMoZW5jb2RpbmcsIFgpICYmIGlzTWVhc3VyZShlbmNvZGluZy54KSxcbiAgICBpc1lNZWFzdXJlID0gaGFzKGVuY29kaW5nLCBZKSAmJiBpc01lYXN1cmUoZW5jb2RpbmcueSk7XG5cbiAgICBpZiAoaXNYTWVhc3VyZSAmJiAhaXNZTWVhc3VyZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ3JvdXBieUNoYW5uZWw6IFksXG4gICAgICAgIGZpZWxkQ2hhbm5lbDogWCxcbiAgICAgICAgc3RhY2tGaWVsZHM6IHN0YWNrRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IGNvbmZpZy5tYXJrLnN0YWNrZWRcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc1lNZWFzdXJlICYmICFpc1hNZWFzdXJlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncm91cGJ5Q2hhbm5lbDogWCxcbiAgICAgICAgZmllbGRDaGFubmVsOiBZLFxuICAgICAgICBzdGFja0ZpZWxkczogc3RhY2tGaWVsZHMsXG4gICAgICAgIG9mZnNldDogY29uZmlnLm1hcmsuc3RhY2tlZFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBDb21waWxlIHN0YWNrLWJ5IGZpZWxkIG5hbWVzIGZyb20gKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG5mdW5jdGlvbiBnZXRTdGFja0ZpZWxkcyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIHNjYWxlOiBTY2FsZU1hcCkge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUxdLnJlZHVjZShmdW5jdGlvbihmaWVsZHMsIGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsRW5jb2RpbmcgPSBlbmNvZGluZ1tjaGFubmVsXTtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoY2hhbm5lbEVuY29kaW5nKSkge1xuICAgICAgICBjaGFubmVsRW5jb2RpbmcuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmllbGREZWY6IEZpZWxkRGVmID0gY2hhbm5lbEVuY29kaW5nO1xuICAgICAgICBmaWVsZHMucHVzaChmaWVsZChmaWVsZERlZiwge1xuICAgICAgICAgIGJpblN1ZmZpeDogc2NhbGVUeXBlKHNjYWxlW2NoYW5uZWxdLCBmaWVsZERlZiwgY2hhbm5lbCwgbWFyaykgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWVsZHM7XG4gIH0sIFtdKTtcbn1cblxuLy8gaW1wdXRlIGRhdGEgZm9yIHN0YWNrZWQgYXJlYVxuZXhwb3J0IGZ1bmN0aW9uIGltcHV0ZVRyYW5zZm9ybShtb2RlbDogTW9kZWwpIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbXB1dGUnLFxuICAgIGZpZWxkOiBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpLFxuICAgIGdyb3VwYnk6IHN0YWNrLnN0YWNrRmllbGRzLFxuICAgIG9yZGVyYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCldLFxuICAgIG1ldGhvZDogJ3ZhbHVlJyxcbiAgICB2YWx1ZTogMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tUcmFuc2Zvcm0obW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgY29uc3QgZW5jb2RpbmcgPSBtb2RlbC5lbmNvZGluZygpO1xuICBjb25zdCBzb3J0YnkgPSBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAoaXNBcnJheShlbmNvZGluZ1tPUkRFUl0pID8gZW5jb2RpbmdbT1JERVJdIDogW2VuY29kaW5nW09SREVSXV0pLm1hcChzb3J0RmllbGQpIDpcbiAgICAvLyBkZWZhdWx0ID0gZGVzY2VuZGluZyBieSBzdGFja0ZpZWxkc1xuICAgIHN0YWNrLnN0YWNrRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICByZXR1cm4gJy0nICsgZmllbGQ7XG4gICAgfSk7XG5cbiAgY29uc3QgdmFsTmFtZSA9IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCk7XG5cbiAgLy8gYWRkIHN0YWNrIHRyYW5zZm9ybSB0byBtYXJrXG4gIGxldCB0cmFuc2Zvcm06IFN0YWNrVHJhbnNmb3JtID0ge1xuICAgIHR5cGU6ICdzdGFjaycsXG4gICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsKV0sXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgc29ydGJ5OiBzb3J0YnksXG4gICAgb3V0cHV0OiB7XG4gICAgICBzdGFydDogdmFsTmFtZSArICdfc3RhcnQnLFxuICAgICAgZW5kOiB2YWxOYW1lICsgJ19lbmQnXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGFjay5vZmZzZXQpIHtcbiAgICB0cmFuc2Zvcm0ub2Zmc2V0ID0gc3RhY2sub2Zmc2V0O1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm07XG59XG4iLCJpbXBvcnQge2NvbnRhaW5zLCByYW5nZX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBTSEFQRSwgQ09MT1IsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi4vdGltZXVuaXQnO1xuXG4vKiogcmV0dXJucyB0aGUgdGVtcGxhdGUgbmFtZSB1c2VkIGZvciBheGlzIGxhYmVscyBmb3IgYSB0aW1lIHVuaXQgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQodGltZVVuaXQ6IFRpbWVVbml0LCBhYmJyZXZpYXRlZCA9IGZhbHNlKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgdGltZVN0cmluZyA9IHRpbWVVbml0LnRvU3RyaW5nKCk7XG5cbiAgbGV0IGRhdGVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZigneWVhcicpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyV5JyA6ICclWScpO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbW9udGgnKSA+IC0xKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChhYmJyZXZpYXRlZCA/ICclYicgOiAnJUInKTtcbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ2RheScpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKGFiYnJldmlhdGVkID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignZGF0ZScpID4gLTEpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKCclZCcpO1xuICB9XG5cbiAgbGV0IHRpbWVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignaG91cicpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclSCcpO1xuICB9XG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbnV0ZScpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclTScpO1xuICB9XG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ3NlY29uZCcpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclUycpO1xuICB9XG4gIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJ21pbGxpc2Vjb25kcycpID4gLTEpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclTCcpO1xuICB9XG5cbiAgbGV0IG91dCA9IFtdO1xuICBpZiAoZGF0ZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKGRhdGVDb21wb25lbnRzLmpvaW4oJy0nKSk7XG4gIH1cbiAgaWYgKHRpbWVDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBvdXQucHVzaCh0aW1lQ29tcG9uZW50cy5qb2luKCc6JykpO1xuICB9XG5cbiAgcmV0dXJuIG91dC5sZW5ndGggPiAwID8gb3V0LmpvaW4oJyAnKSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqIHJldHVybnMgdGhlIHNtYWxsZXN0IG5pY2UgdW5pdCBmb3Igc2NhbGUubmljZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtYWxsZXN0VW5pdCh0aW1lVW5pdCk6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHRpbWVVbml0LmluZGV4T2YoJ3NlY29uZCcpID4gLTEpIHtcbiAgICByZXR1cm4gJ3NlY29uZCc7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignbWludXRlJykgPiAtMSkge1xuICAgIHJldHVybiAnbWludXRlJztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdob3VyJykgPiAtMSkge1xuICAgIHJldHVybiAnaG91cic7XG4gIH1cblxuICBpZiAodGltZVVuaXQuaW5kZXhPZignZGF5JykgPiAtMSB8fCB0aW1lVW5pdC5pbmRleE9mKCdkYXRlJykgPiAtMSkge1xuICAgIHJldHVybiAnZGF5JztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCdtb250aCcpID4gLTEpIHtcbiAgICByZXR1cm4gJ21vbnRoJztcbiAgfVxuXG4gIGlmICh0aW1lVW5pdC5pbmRleE9mKCd5ZWFyJykgPiAtMSkge1xuICAgIHJldHVybiAneWVhcic7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbih0aW1lVW5pdDogVGltZVVuaXQsIGZpZWxkUmVmOiBzdHJpbmcsIG9ubHlSZWYgPSBmYWxzZSk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSAnZGF0ZXRpbWUoJztcbiAgbGV0IHRpbWVTdHJpbmcgPSB0aW1lVW5pdC50b1N0cmluZygpO1xuXG4gIGZ1bmN0aW9uIGdldChmdW46IHN0cmluZywgYWRkQ29tbWEgPSB0cnVlKSB7XG4gICAgaWYgKG9ubHlSZWYpIHtcbiAgICAgIHJldHVybiBmaWVsZFJlZiArIChhZGRDb21tYSA/ICcsICcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmdW4gKyAnKCcgKyBmaWVsZFJlZiArICcpJyArIChhZGRDb21tYSA/ICcsICcgOiAnJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZigneWVhcicpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCd5ZWFyJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcyMDA2LCAnOyAvLyBKYW51YXJ5IDEgMjAwNiBpcyBhIFN1bmRheVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignbW9udGgnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnbW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtb250aCBzdGFydHMgYXQgMCBpbiBqYXZhc2NyaXB0XG4gICAgb3V0ICs9ICcwLCAnO1xuICB9XG5cbiAgLy8gbmVlZCB0byBhZGQgMSBiZWNhdXNlIGRheXMgc3RhcnQgYXQgMVxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdkYXknKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnZGF5JywgZmFsc2UpICsgJysxLCAnO1xuICB9IGVsc2UgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignZGF0ZScpID4gLTEpIHtcbiAgICBvdXQgKz0gZ2V0KCdkYXRlJyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0ICs9ICcxLCAnO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignaG91cnMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnaG91cnMnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdtaW51dGVzJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ21pbnV0ZXMnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdzZWNvbmRzJykgPiAtMSkge1xuICAgIG91dCArPSBnZXQoJ3NlY29uZHMnKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQgKz0gJzAsICc7XG4gIH1cblxuICBpZiAodGltZVN0cmluZy5pbmRleE9mKCdtaWxsaXNlY29uZHMnKSA+IC0xKSB7XG4gICAgb3V0ICs9IGdldCgnbWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG91dCArPSAnMCc7XG4gIH1cblxuICByZXR1cm4gb3V0ICsgJyknO1xufVxuXG4vKiogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHJhdyBkb21haW4uICovXG5leHBvcnQgZnVuY3Rpb24gcmF3RG9tYWluKHRpbWVVbml0OiBUaW1lVW5pdCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRSwgQ09MT1JdLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5NSU5VVEVTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDYwKTtcbiAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDI0KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgIHJldHVybiByYW5nZSgwLCA3KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBVEU6XG4gICAgICByZXR1cm4gcmFuZ2UoMSwgMzIpO1xuICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgMTIpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQge01vZGVsfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7RmllbGREZWYsIE9yZGVyQ2hhbm5lbERlZn0gZnJvbSAnLi4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBTSVpFLCBDT0xPUiwgU0hBUEUsIFRFWFQsIExBQkVMLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7UVVBTlRJVEFUSVZFLCBPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2Zvcm1hdCBhcyB0aW1lRm9ybWF0RXhwcn0gZnJvbSAnLi90aW1lJztcbmltcG9ydCB7Y29udGFpbnN9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtTb3J0T3JkZXJ9IGZyb20gJy4uL2VudW1zJztcblxuZXhwb3J0IGNvbnN0IEZJTExfU1RST0tFX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eScsXG4gICdzdHJva2UnLCAnc3Ryb2tlV2lkdGgnLCAnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0JywgJ3N0cm9rZU9wYWNpdHknLFxuICAnb3BhY2l0eSddO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWw6IE1vZGVsKSB7XG4gIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKENPTE9SKTtcblxuICAvLyBBcHBseSBmaWxsIHN0cm9rZSBjb25maWcgZmlyc3Qgc28gdGhhdCBjb2xvciBmaWVsZCAvIHZhbHVlIGNhbiBvdmVycmlkZVxuICAvLyBmaWxsIC8gc3Ryb2tlXG4gIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgRklMTF9TVFJPS0VfQ09ORklHKTtcblxuICBsZXQgdmFsdWU7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgdmFsdWUgPSB7XG4gICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiwgZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgdmFsdWUgPSB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICB9XG5cbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZmlsbGVkKSB7XG4gICAgICBwLmZpbGwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2UgPSB2YWx1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYXBwbHkgY29sb3IgY29uZmlnIGlmIHRoZXJlIGlzIG5vIGZpbGwgLyBzdHJva2UgY29uZmlnXG4gICAgcFtmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gPSBwW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSB8fFxuICAgICAge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLmNvbG9yfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDb25maWcocHJvcGVydGllcywgY29uZmlnLCBwcm9wc0xpc3Q6IHN0cmluZ1tdKSB7XG4gIHByb3BzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHsgdmFsdWU6IHZhbHVlIH07XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWFya0NvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsOiBNb2RlbCwgcHJvcHNMaXN0OiBzdHJpbmdbXSkge1xuICBhcHBseUNvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsLmNvbmZpZygpLm1hcmssIHByb3BzTGlzdCk7XG59XG5cblxuLyoqXG4gKiBCdWlsZHMgYW4gb2JqZWN0IHdpdGggZm9ybWF0IGFuZCBmb3JtYXRUeXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIGZvcm1hdCBleHBsaWNpdGx5IHNwZWNpZmllZCBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1peGlucyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGZvcm1hdDogc3RyaW5nKSB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgaWYoIWNvbnRhaW5zKFtRVUFOVElUQVRJVkUsIFRFTVBPUkFMXSwgZmllbGREZWYudHlwZSkpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBsZXQgZGVmOiBhbnkgPSB7fTtcblxuICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICBkZWYuZm9ybWF0VHlwZSA9ICd0aW1lJztcbiAgfVxuXG4gIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGRlZi5mb3JtYXQgPSBmb3JtYXQ7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoIChmaWVsZERlZi50eXBlKSB7XG4gICAgICBjYXNlIFFVQU5USVRBVElWRTpcbiAgICAgICAgZGVmLmZvcm1hdCA9IG1vZGVsLmNvbmZpZygpLm51bWJlckZvcm1hdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRFTVBPUkFMOlxuICAgICAgICBkZWYuZm9ybWF0ID0gdGltZUZvcm1hdChtb2RlbCwgY2hhbm5lbCkgfHwgbW9kZWwuY29uZmlnKCkudGltZUZvcm1hdDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoYW5uZWwgPT09IFRFWFQpIHtcbiAgICAvLyB0ZXh0IGRvZXMgbm90IHN1cHBvcnQgZm9ybWF0IGFuZCBmb3JtYXRUeXBlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS9pc3N1ZXMvNTA1XG5cbiAgICBjb25zdCBmaWx0ZXIgPSAoZGVmLmZvcm1hdFR5cGUgfHwgJ251bWJlcicpICsgKGRlZi5mb3JtYXQgPyAnOlxcJycgKyBkZWYuZm9ybWF0ICsgJ1xcJycgOiAnJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQ6IHtcbiAgICAgICAgdGVtcGxhdGU6ICd7eycgKyBtb2RlbC5maWVsZChjaGFubmVsLCB7IGRhdHVtOiB0cnVlIH0pICsgJyB8ICcgKyBmaWx0ZXIgKyAnfX0nXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBkZWY7XG59XG5cbmZ1bmN0aW9uIGlzQWJicmV2aWF0ZWQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICAgIHJldHVybiBtb2RlbC5heGlzKGNoYW5uZWwpLnNob3J0VGltZUxhYmVscztcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgU0hBUEU6XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIG1vZGVsLmxlZ2VuZChjaGFubmVsKS5zaG9ydFRpbWVMYWJlbHM7XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuc2hvcnRUaW1lTGFiZWxzO1xuICAgIGNhc2UgTEFCRUw6XG4gICAgICAvLyBUT0RPKCM4OTcpOiBpbXBsZW1lbnQgd2hlbiB3ZSBoYXZlIGxhYmVsXG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5cblxuLyoqIFJldHVybiBmaWVsZCByZWZlcmVuY2Ugd2l0aCBwb3RlbnRpYWwgXCItXCIgcHJlZml4IGZvciBkZXNjZW5kaW5nIHNvcnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RmllbGQob3JkZXJDaGFubmVsRGVmOiBPcmRlckNoYW5uZWxEZWYpIHtcbiAgcmV0dXJuIChvcmRlckNoYW5uZWxEZWYuc29ydCA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcgPyAnLScgOiAnJykgKyBmaWVsZChvcmRlckNoYW5uZWxEZWYpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHRpbWUgZm9ybWF0IHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVGb3JtYXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogc3RyaW5nIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgcmV0dXJuIHRpbWVGb3JtYXRFeHByKGZpZWxkRGVmLnRpbWVVbml0LCBpc0FiYnJldmlhdGVkKG1vZGVsLCBjaGFubmVsLCBmaWVsZERlZikpO1xufVxuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhLlxuICovXG5cbmltcG9ydCB7Tk9NSU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGNvbnN0IFNVTU1BUlkgPSAnc3VtbWFyeSc7XG5leHBvcnQgY29uc3QgU09VUkNFID0gJ3NvdXJjZSc7XG5leHBvcnQgY29uc3QgU1RBQ0tFRF9TQ0FMRSA9ICdzdGFja2VkX3NjYWxlJztcbmV4cG9ydCBjb25zdCBMQVlPVVQgPSAnbGF5b3V0JztcblxuLyoqIE1hcHBpbmcgZnJvbSBkYXRhbGliJ3MgaW5mZXJyZWQgdHlwZSB0byBWZWdhLWxpdGUncyB0eXBlICovXG4vLyBUT0RPOiBBTExfQ0FQU1xuZXhwb3J0IGNvbnN0IHR5cGVzID0ge1xuICAnYm9vbGVhbic6IE5PTUlOQUwsXG4gICdudW1iZXInOiBRVUFOVElUQVRJVkUsXG4gICdpbnRlZ2VyJzogUVVBTlRJVEFUSVZFLFxuICAnZGF0ZSc6IFRFTVBPUkFMLFxuICAnc3RyaW5nJzogTk9NSU5BTFxufTtcbiIsIi8vIHV0aWxpdHkgZm9yIGVuY29kaW5nIG1hcHBpbmdcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vc2NoZW1hL2VuY29kaW5nLnNjaGVtYSc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL3NjaGVtYS9maWVsZGRlZi5zY2hlbWEnO1xuaW1wb3J0IHtDaGFubmVsLCBDSEFOTkVMU30gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7aXNBcnJheSwgYW55IGFzIGFueUlufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY291bnRSZXRpbmFsKGVuY29kaW5nOiBFbmNvZGluZykge1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZW5jb2RpbmcuY29sb3IpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcuc2l6ZSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaGFwZSkgeyBjb3VudCsrOyB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gQ0hBTk5FTFMuZmlsdGVyKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gaGFzKGVuY29kaW5nLCBjaGFubmVsKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nICYmIGVuY29kaW5nW2NoYW5uZWxdO1xuICByZXR1cm4gY2hhbm5lbEVuY29kaW5nICYmIChcbiAgICBjaGFubmVsRW5jb2RpbmcuZmllbGQgIT09IHVuZGVmaW5lZCB8fFxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFueUluKENIQU5ORUxTLCAoY2hhbm5lbCkgPT4ge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpICYmIGVuY29kaW5nW2NoYW5uZWxdLmFnZ3JlZ2F0ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nKTogRmllbGREZWZbXSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZmllbGREZWYpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGxldCBpID0gMDtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgICBmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwsIGkrKyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIGVuY29kaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBpKyspO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGU6IEVuY29kaW5nKSA9PiBhbnksXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgYXJyID0gW107XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShlbmNvZGluZ1tjaGFubmVsXSkpIHtcbiAgICAgICAgZW5jb2RpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGFyci5wdXNoKGYuY2FsbCh0aGlzQXJnLCBmaWVsZERlZiwgY2hhbm5lbCwgZW5jb2RpbmcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgZW5jb2RpbmdbY2hhbm5lbF0sIGNoYW5uZWwsIGVuY29kaW5nKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGU6IEVuY29kaW5nKSA9PiBhbnksXG4gICAgaW5pdCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGxldCByID0gaW5pdDtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgICByID0gZi5jYWxsKHRoaXNBcmcsIHIsIGZpZWxkRGVmLCBjaGFubmVsLCBlbmNvZGluZyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBlbmNvZGluZ1tjaGFubmVsXSwgY2hhbm5lbCwgZW5jb2RpbmcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiByO1xufVxuIiwiLyoqIE1pc2NlbGxhbmVvdXMgZW51bSBkZWNsYXJhdGlvbnMgKi9cblxuZXhwb3J0IGVudW0gU29ydE9yZGVyIHtcbiAgICBBU0NFTkRJTkcgPSAnYXNjZW5kaW5nJyBhcyBhbnksXG4gICAgREVTQ0VORElORyA9ICdkZXNjZW5kaW5nJyBhcyBhbnksXG4gICAgTk9ORSA9ICdub25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIFNjYWxlVHlwZSB7XG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIExPRyA9ICdsb2cnIGFzIGFueSxcbiAgICBQT1cgPSAncG93JyBhcyBhbnksXG4gICAgU1FSVCA9ICdzcXJ0JyBhcyBhbnksXG4gICAgUVVBTlRJTEUgPSAncXVhbnRpbGUnIGFzIGFueSxcbiAgICBPUkRJTkFMID0gJ29yZGluYWwnIGFzIGFueSxcbiAgICBUSU1FID0gJ3RpbWUnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gTmljZVRpbWUge1xuICAgIFNFQ09ORCA9ICdzZWNvbmQnIGFzIGFueSxcbiAgICBNSU5VVEUgPSAnbWludXRlJyBhcyBhbnksXG4gICAgSE9VUiA9ICdob3VyJyBhcyBhbnksXG4gICAgREFZID0gJ2RheScgYXMgYW55LFxuICAgIFdFRUsgPSAnd2VlaycgYXMgYW55LFxuICAgIE1PTlRIID0gJ21vbnRoJyBhcyBhbnksXG4gICAgWUVBUiA9ICd5ZWFyJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIERhdGFGb3JtYXQge1xuICAgIEpTT04gPSAnanNvbicgYXMgYW55LFxuICAgIENTViA9ICdjc3YnIGFzIGFueSxcbiAgICBUU1YgPSAndHN2JyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEF4aXNPcmllbnQge1xuICAgIFRPUCA9ICd0b3AnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueVxufVxuXG5leHBvcnQgZW51bSBGb250V2VpZ2h0IHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgQk9MRCA9ICdib2xkJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gU2hhcGUge1xuICAgIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnksXG4gICAgQ1JPU1MgPSAnY3Jvc3MnIGFzIGFueSxcbiAgICBESUFNT05EID0gJ2RpYW1vbmQnIGFzIGFueSxcbiAgICBUUklBTkdMRVVQID0gJ3RyaWFuZ2xlLXVwJyBhcyBhbnksXG4gICAgVFJJQU5HTEVET1dOID0gJ3RyaWFuZ2xlLWRvd24nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gSG9yaXpvbnRhbEFsaWduIHtcbiAgICBMRUZUID0gJ2xlZnQnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gVmVydGljYWxBbGlnbiB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIE1JRERMRSA9ICdtaWRkbGUnIGFzIGFueSxcbiAgICBCT1RUT00gPSAnYm90dG9tJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEZvbnRTdHlsZSB7XG4gICAgTk9STUFMID0gJ25vcm1hbCcgYXMgYW55LFxuICAgIElUQUxJQyA9ICdpdGFsaWMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gU3RhY2tPZmZzZXQge1xuICAgIFpFUk8gPSAnemVybycgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbiAgICBOT1JNQUxJWkUgPSAnbm9ybWFsaXplJyBhcyBhbnksXG4gICAgTk9ORSA9ICdub25lJyBhcyBhbnksXG59XG4iLCIvLyB1dGlsaXR5IGZvciBhIGZpZWxkIGRlZmluaXRpb24gb2JqZWN0XG5cbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge2NvbnRhaW5zLCBnZXRiaW5zfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlZk9wdGlvbiB7XG4gIC8qKiBleGNsdWRlIGJpbiwgYWdncmVnYXRlLCB0aW1lVW5pdCAqL1xuICBub2ZuPzogYm9vbGVhbjtcbiAgLyoqIGV4Y2x1ZGUgYWdncmVnYXRpb24gZnVuY3Rpb24gKi9cbiAgbm9BZ2dyZWdhdGU/OiBib29sZWFuO1xuICAvKiogaW5jbHVkZSAnZGF0dW0uJyAqL1xuICBkYXR1bT86IGJvb2xlYW47XG4gIC8qKiByZXBsYWNlIGZuIHdpdGggY3VzdG9tIGZ1bmN0aW9uIHByZWZpeCAqL1xuICBmbj86IHN0cmluZztcbiAgLyoqIHByZXBlbmQgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIHByZWZuPzogc3RyaW5nO1xuICAvKiogYXBwZW5kIHN1ZmZpeCB0byB0aGUgZmllbGQgcmVmIGZvciBiaW4gKGRlZmF1bHQ9J19zdGFydCcpICovXG4gIGJpblN1ZmZpeD86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiAoZ2VuZXJhbCkgKi9cbiAgc3VmZml4Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGQoZmllbGREZWY6IEZpZWxkRGVmLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgY29uc3QgcHJlZml4ID0gKG9wdC5kYXR1bSA/ICdkYXR1bS4nIDogJycpICsgKG9wdC5wcmVmbiB8fCAnJyk7XG4gIGNvbnN0IHN1ZmZpeCA9IG9wdC5zdWZmaXggfHwgJyc7XG4gIGNvbnN0IGZpZWxkID0gZmllbGREZWYuZmllbGQ7XG5cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdjb3VudCcgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAob3B0LmZuKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIG9wdC5mbiArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi5iaW4pIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ2Jpbl8nICsgZmllbGQgKyAob3B0LmJpblN1ZmZpeCB8fCBzdWZmaXggfHwgJ19zdGFydCcpO1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiAhb3B0Lm5vQWdncmVnYXRlICYmIGZpZWxkRGVmLmFnZ3JlZ2F0ZSkge1xuICAgIHJldHVybiBwcmVmaXggKyBmaWVsZERlZi5hZ2dyZWdhdGUgKyAnXycgKyBmaWVsZCArIHN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgZmllbGREZWYudGltZVVuaXQpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGREZWYudGltZVVuaXQgKyAnXycgKyBmaWVsZCArIHN1ZmZpeDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2lzRmllbGREaW1lbnNpb24oZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBjb250YWlucyhbTk9NSU5BTCwgT1JESU5BTF0sIGZpZWxkRGVmLnR5cGUpIHx8ICEhZmllbGREZWYuYmluIHx8XG4gICAgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmICEhZmllbGREZWYudGltZVVuaXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaW1lbnNpb24oZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZiAmJiBmaWVsZERlZi5maWVsZCAmJiBfaXNGaWVsZERpbWVuc2lvbihmaWVsZERlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01lYXN1cmUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZiAmJiBmaWVsZERlZi5maWVsZCAmJiAhX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgY29uc3QgQ09VTlRfRElTUExBWU5BTUUgPSAnTnVtYmVyIG9mIFJlY29yZHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY291bnQoKTogRmllbGREZWYge1xuICByZXR1cm4geyBmaWVsZDogJyonLCBhZ2dyZWdhdGU6IEFnZ3JlZ2F0ZU9wLkNPVU5ULCB0eXBlOiBRVUFOVElUQVRJVkUsIGRpc3BsYXlOYW1lOiBDT1VOVF9ESVNQTEFZTkFNRSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb3VudChmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9PT0gQWdncmVnYXRlT3AuQ09VTlQ7XG59XG5cbi8vIEZJWE1FIHJlbW92ZSB0aGlzLCBhbmQgdGhlIGdldGJpbnMgbWV0aG9kXG4vLyBGSVhNRSB0aGlzIGRlcGVuZHMgb24gY2hhbm5lbFxuZXhwb3J0IGZ1bmN0aW9uIGNhcmRpbmFsaXR5KGZpZWxkRGVmOiBGaWVsZERlZiwgc3RhdHMsIGZpbHRlck51bGwgPSB7fSkge1xuICAvLyBGSVhNRSBuZWVkIHRvIHRha2UgZmlsdGVyIGludG8gYWNjb3VudFxuXG4gIGNvbnN0IHN0YXQgPSBzdGF0c1tmaWVsZERlZi5maWVsZF0sXG4gIHR5cGUgPSBmaWVsZERlZi50eXBlO1xuXG4gIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAvLyBuZWVkIHRvIHJlYXNzaWduIGJpbiwgb3RoZXJ3aXNlIGNvbXBpbGF0aW9uIHdpbGwgZmFpbCBkdWUgdG8gYSBUUyBidWcuXG4gICAgY29uc3QgYmluID0gZmllbGREZWYuYmluO1xuICAgIGxldCBtYXhiaW5zID0gKHR5cGVvZiBiaW4gPT09ICdib29sZWFuJykgPyB1bmRlZmluZWQgOiBiaW4ubWF4YmlucztcbiAgICBpZiAobWF4YmlucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXhiaW5zID0gMTA7XG4gICAgfVxuXG4gICAgY29uc3QgYmlucyA9IGdldGJpbnMoc3RhdCwgbWF4Ymlucyk7XG4gICAgcmV0dXJuIChiaW5zLnN0b3AgLSBiaW5zLnN0YXJ0KSAvIGJpbnMuc3RlcDtcbiAgfVxuICBpZiAodHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICBjb25zdCB0aW1lVW5pdCA9IGZpZWxkRGVmLnRpbWVVbml0O1xuICAgIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSBUaW1lVW5pdC5NSU5VVEVTOiByZXR1cm4gNjA7XG4gICAgICBjYXNlIFRpbWVVbml0LkhPVVJTOiByZXR1cm4gMjQ7XG4gICAgICBjYXNlIFRpbWVVbml0LkRBWTogcmV0dXJuIDc7XG4gICAgICBjYXNlIFRpbWVVbml0LkRBVEU6IHJldHVybiAzMTtcbiAgICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6IHJldHVybiAxMjtcbiAgICAgIGNhc2UgVGltZVVuaXQuWUVBUjpcbiAgICAgICAgY29uc3QgeWVhcnN0YXQgPSBzdGF0c1sneWVhcl8nICsgZmllbGREZWYuZmllbGRdO1xuXG4gICAgICAgIGlmICgheWVhcnN0YXQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4geWVhcnN0YXQuZGlzdGluY3QgLVxuICAgICAgICAgIChzdGF0Lm1pc3NpbmcgPiAwICYmIGZpbHRlck51bGxbdHlwZV0gPyAxIDogMCk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSB1c2UgY2FsY3VsYXRpb24gYmVsb3dcbiAgfVxuICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyByZW1vdmUgbnVsbFxuICByZXR1cm4gc3RhdC5kaXN0aW5jdCAtXG4gICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICBpZiAoaXNDb3VudChmaWVsZERlZikpIHtcbiAgICByZXR1cm4gQ09VTlRfRElTUExBWU5BTUU7XG4gIH1cbiAgY29uc3QgZm4gPSBmaWVsZERlZi5hZ2dyZWdhdGUgfHwgZmllbGREZWYudGltZVVuaXQgfHwgKGZpZWxkRGVmLmJpbiAmJiAnYmluJyk7XG4gIGlmIChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgKyAnKCcgKyBmaWVsZERlZi5maWVsZCArICcpJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmllbGREZWYuZmllbGQ7XG4gIH1cbn1cbiIsImV4cG9ydCBlbnVtIE1hcmsge1xuICBBUkVBID0gJ2FyZWEnIGFzIGFueSxcbiAgQkFSID0gJ2JhcicgYXMgYW55LFxuICBMSU5FID0gJ2xpbmUnIGFzIGFueSxcbiAgUE9JTlQgPSAncG9pbnQnIGFzIGFueSxcbiAgVEVYVCA9ICd0ZXh0JyBhcyBhbnksXG4gIFRJQ0sgPSAndGljaycgYXMgYW55LFxuICBDSVJDTEUgPSAnY2lyY2xlJyBhcyBhbnksXG4gIFNRVUFSRSA9ICdzcXVhcmUnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgQVJFQSA9IE1hcmsuQVJFQTtcbmV4cG9ydCBjb25zdCBCQVIgPSBNYXJrLkJBUjtcbmV4cG9ydCBjb25zdCBMSU5FID0gTWFyay5MSU5FO1xuZXhwb3J0IGNvbnN0IFBPSU5UID0gTWFyay5QT0lOVDtcbmV4cG9ydCBjb25zdCBURVhUID0gTWFyay5URVhUO1xuZXhwb3J0IGNvbnN0IFRJQ0sgPSBNYXJrLlRJQ0s7XG5cbmV4cG9ydCBjb25zdCBDSVJDTEUgPSBNYXJrLkNJUkNMRTtcbmV4cG9ydCBjb25zdCBTUVVBUkUgPSBNYXJrLlNRVUFSRTtcbiIsImltcG9ydCB7QXhpc09yaWVudH0gZnJvbSAnLi4vZW51bXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXNDb25maWcge1xuICAvLyAtLS0tLS0tLS0tIEdlbmVyYWwgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGF4aXMgbGluZVxuICAgKi9cbiAgYXhpc1dpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogQSBzdHJpbmcgaW5kaWNhdGluZyBpZiB0aGUgYXhpcyAoYW5kIGFueSBncmlkbGluZXMpIHNob3VsZCBiZSBwbGFjZWQgYWJvdmUgb3IgYmVsb3cgdGhlIGRhdGEgbWFya3MuXG4gICAqL1xuICBsYXllcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gR3JpZCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGUgaWYgZ3JpZGxpbmVzIHNob3VsZCBiZSBjcmVhdGVkIGluIGFkZGl0aW9uIHRvIHRpY2tzLiBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3IgUk9XIGFuZCBDT0wuIEZvciBYIGFuZCBZLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIHF1YW50aXRhdGl2ZSBhbmQgdGltZSBmaWVsZHMgYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ3JpZD86IGJvb2xlYW47XG5cbiAgLy8gLS0tLS0tLS0tLSBMYWJlbHMgLS0tLS0tLS0tLVxuICAvKipcbiAgICogRW5hYmxlIG9yIGRpc2FibGUgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCBhbGlnbm1lbnQgZm9yIHRoZSBMYWJlbC5cbiAgICovXG4gIGxhYmVsQWxpZ24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUZXh0IGJhc2VsaW5lIGZvciB0aGUgbGFiZWwuXG4gICAqL1xuICBsYWJlbEJhc2VsaW5lPzogc3RyaW5nO1xuICAvKipcbiAgICogVHJ1bmNhdGUgbGFiZWxzIHRoYXQgYXJlIHRvbyBsb25nLlxuICAgKiBAbWluaW11bSAxXG4gICAqL1xuICBsYWJlbE1heExlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggYW5kIGRheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuXG4gICAqL1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGlja3MgLS0tLS0tLS0tLVxuICAvKipcbiAgICogSWYgcHJvdmlkZWQsIHNldHMgdGhlIG51bWJlciBvZiBtaW5vciB0aWNrcyBiZXR3ZWVuIG1ham9yIHRpY2tzICh0aGUgdmFsdWUgOSByZXN1bHRzIGluIGRlY2ltYWwgc3ViZGl2aXNpb24pLiBPbmx5IGFwcGxpY2FibGUgZm9yIGF4ZXMgdmlzdWFsaXppbmcgcXVhbnRpdGF0aXZlIHNjYWxlcy5cbiAgICovXG4gIHN1YmRpdmlkZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEEgZGVzaXJlZCBudW1iZXIgb2YgdGlja3MsIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuIFRoZSByZXN1bHRpbmcgbnVtYmVyIG1heSBiZSBkaWZmZXJlbnQgc28gdGhhdCB2YWx1ZXMgYXJlIFwibmljZVwiIChtdWx0aXBsZXMgb2YgMiwgNSwgMTApIGFuZCBsaWUgd2l0aGluIHRoZSB1bmRlcmx5aW5nIHNjYWxlJ3MgcmFuZ2UuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tzPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aWNrcyBhbmQgdGV4dCBsYWJlbHMuXG4gICAqL1xuICB0aWNrUGFkZGluZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yLCBtaW5vciBhbmQgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1ham9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgbWlub3IgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplTWlub3I/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBlbmQgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplRW5kPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGl0bGUgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQSB0aXRsZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgKi9cbiAgdGl0bGVPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBNYXggbGVuZ3RoIGZvciBheGlzIHRpdGxlIGlmIHRoZSB0aXRsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBmcm9tIHRoZSBmaWVsZCdzIGRlc2NyaXB0aW9uLiBCeSBkZWZhdWx0LCB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gY2VsbCBzaXplIGFuZCBjaGFyYWN0ZXJXaWR0aCBwcm9wZXJ0eS5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGl0bGVNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDaGFyYWN0ZXIgd2lkdGggZm9yIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5pbmcgdGl0bGUgbWF4IGxlbmd0aC5cbiAgICovXG4gIGNoYXJhY3RlcldpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3RoZXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGF4aXMgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE86IHJlcGxhY2Vcbn1cblxuLy8gVE9ETzogYWRkIGNvbW1lbnQgZm9yIHByb3BlcnRpZXMgdGhhdCB3ZSByZWx5IG9uIFZlZ2EncyBkZWZhdWx0IHRvIHByb2R1Y2Vcbi8vIG1vcmUgY29uY2lzZSBWZWdhIG91dHB1dC5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBvZmZzZXQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSAwXG4gIGdyaWQ6IHVuZGVmaW5lZCwgLy8gYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXG4gIGxhYmVsczogdHJ1ZSxcbiAgbGFiZWxNYXhMZW5ndGg6IDI1LFxuICB0aWNrU2l6ZTogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDZcbiAgY2hhcmFjdGVyV2lkdGg6IDZcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBheGlzV2lkdGg6IDAsXG4gIGxhYmVsczogdHJ1ZSxcbiAgZ3JpZDogZmFsc2UsXG4gIHRpY2tTaXplOiAwXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXNQcm9wZXJ0aWVzIGV4dGVuZHMgQXhpc0NvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxBbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgZm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0IHZhbHVlIGRldGVybWluZWQgYnkgY29uZmlnLmZvcm1hdCBhbnl3YXlcbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYXhpcy4gT25lIG9mIHRvcCwgYm90dG9tLCBsZWZ0IG9yIHJpZ2h0LiBUaGUgb3JpZW50YXRpb24gY2FuIGJlIHVzZWQgdG8gZnVydGhlciBzcGVjaWFsaXplIHRoZSBheGlzIHR5cGUgKGUuZy4sIGEgeSBheGlzIG9yaWVudGVkIGZvciB0aGUgcmlnaHQgZWRnZSBvZiB0aGUgY2hhcnQpLlxuICAgKi9cbiAgb3JpZW50PzogQXhpc09yaWVudDtcbiAgLyoqXG4gICAqIEEgdGl0bGUgZm9yIHRoZSBheGlzLiBTaG93cyBmaWVsZCBuYW1lIGFuZCBpdHMgZnVuY3Rpb24gYnkgZGVmYXVsdC5cbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuICB2YWx1ZXM/OiBudW1iZXJbXTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgQ2VsbENvbmZpZyB7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG5cbiAgY2xpcD86IGJvb2xlYW47XG5cbiAgLy8gRklMTF9TVFJPS0VfQ09ORklHXG4gIC8qKlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcbiAgc3Ryb2tlPzogc3RyaW5nO1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcbiAgc3Ryb2tlRGFzaD86IG51bWJlcjtcbiAgLyoqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LiAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENlbGxDb25maWc6IENlbGxDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgc3Ryb2tlOiAnI2NjYycsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuIiwiaW1wb3J0IHtGYWNldFNjYWxlQ29uZmlnLCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZ30gZnJvbSAnLi9zY2FsZS5zY2hlbWEnO1xuaW1wb3J0IHtBeGlzQ29uZmlnLCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnfSBmcm9tICcuL2F4aXMuc2NoZW1hJztcbmltcG9ydCB7Q2VsbENvbmZpZywgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZ30gZnJvbSAnLi9jb25maWcuY2VsbC5zY2hlbWEnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgc2NhbGU/OiBGYWNldFNjYWxlQ29uZmlnO1xuICBheGlzPzogQXhpc0NvbmZpZztcbiAgZ3JpZD86IEZhY2V0R3JpZENvbmZpZztcbiAgY2VsbD86IENlbGxDb25maWc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRHcmlkQ29uZmlnIHtcbiAgLyoqIEBmb3JtYXQgY29sb3IgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIG9wYWNpdHk/OiBudW1iZXI7XG4gIG9mZnNldD86IG51bWJlcjtcbn1cblxuY29uc3QgZGVmYXVsdEZhY2V0R3JpZENvbmZpZzogRmFjZXRHcmlkQ29uZmlnID0ge1xuICBjb2xvcjogJyMwMDAwMDAnLFxuICBvcGFjaXR5OiAwLjQsXG4gIG9mZnNldDogMFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldENvbmZpZzogRmFjZXRDb25maWcgPSB7XG4gIHNjYWxlOiBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZyxcbiAgYXhpczogZGVmYXVsdEZhY2V0QXhpc0NvbmZpZyxcbiAgZ3JpZDogZGVmYXVsdEZhY2V0R3JpZENvbmZpZyxcbiAgY2VsbDogZGVmYXVsdEZhY2V0Q2VsbENvbmZpZ1xufTtcbiIsImltcG9ydCB7U2hhcGUsIEhvcml6b250YWxBbGlnbiwgVmVydGljYWxBbGlnbiwgRm9udFN0eWxlLCBGb250V2VpZ2h0LCBTdGFja09mZnNldH0gZnJvbSAnLi4vZW51bXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtDb25maWcge1xuXG4gIC8vIC0tLS0tLS0tLS0gQ29sb3IgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2hhcGVcXCdzIGNvbG9yIHNob3VsZCBiZSB1c2VkIGFzIGZpbGwgY29sb3IgaW5zdGVhZCBvZiBzdHJva2UgY29sb3IuXG4gICAqIFRoaXMgaXMgb25seSBhcHBsaWNhYmxlIGZvciBcImJhclwiLCBcInBvaW50XCIsIGFuZCBcImFyZWFcIi5cbiAgICogQWxsIG1hcmtzIGV4Y2VwdCBcInBvaW50XCIgbWFya3MgYXJlIGZpbGxlZCBieSBkZWZhdWx0LlxuICAgKiBTZWUgTWFyayBEb2N1bWVudGF0aW9uIChodHRwOi8vdmVnYS5naXRodWIuaW8vdmVnYS1saXRlL2RvY3MvbWFya3MuaHRtbClcbiAgICogZm9yIHVzYWdlIGV4YW1wbGUuXG4gICAqL1xuICBmaWxsZWQ/OiBib29sZWFuO1xuICAvKipcbiAgICogRGVmYXVsdCBjb2xvci5cbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEZWZhdWx0IEZpbGwgQ29sb3IuICBUaGlzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIGNvbmZpZy5jb2xvclxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuICAvKipcbiAgICogRGVmYXVsdCBTdHJva2UgQ29sb3IuICBUaGlzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIGNvbmZpZy5jb2xvclxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBzdHJva2U/OiBzdHJpbmc7XG5cblxuICAvLyAtLS0tLS0tLS0tIE9wYWNpdHkgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBvcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqIEBtYXhpbXVtIDFcbiAgICovXG4gIGZpbGxPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqIEBtYXhpbXVtIDFcbiAgICovXG4gIHN0cm9rZU9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBTdHJva2UgU3R5bGUgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuXG4gICAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS5cbiAgICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXJbXTtcblxuICAvLyAtLS0tLS0tLS0tIFN0YWNraW5nOiBCYXIgJiBBcmVhIC0tLS0tLS0tLS1cbiAgc3RhY2tlZD86IFN0YWNrT2Zmc2V0O1xuXG4gIC8vIC0tLS0tLS0tLS0gT3JpZW50YXRpb246IEJhciwgVGljaywgTGluZSwgQXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgYSBub24tc3RhY2tlZCBiYXIsIHRpY2ssIGFyZWEsIGFuZCBsaW5lIGNoYXJ0cy5cbiAgICogVGhlIHZhbHVlIGlzIGVpdGhlciBob3Jpem9udGFsIChkZWZhdWx0KSBvciB2ZXJ0aWNhbC5cbiAgICogLSBGb3IgYmFyIGFuZCB0aWNrLCB0aGlzIGRldGVybWluZXMgd2hldGhlciB0aGUgc2l6ZSBvZiB0aGUgYmFyIGFuZCB0aWNrXG4gICAqIHNob3VsZCBiZSBhcHBsaWVkIHRvIHggb3IgeSBkaW1lbnNpb24uXG4gICAqIC0gRm9yIGFyZWEsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgb3JpZW50IHByb3BlcnR5IG9mIHRoZSBWZWdhIG91dHB1dC5cbiAgICogLSBGb3IgbGluZSwgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBzb3J0IG9yZGVyIG9mIHRoZSBwb2ludHMgaW4gdGhlIGxpbmVcbiAgICogaWYgYGNvbmZpZy5zb3J0TGluZUJ5YCBpcyBub3Qgc3BlY2lmaWVkLlxuICAgKiBGb3Igc3RhY2tlZCBjaGFydHMsIHRoaXMgaXMgYWx3YXlzIGRldGVybWluZWQgYnkgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzdGFjaztcbiAgICogdGhlcmVmb3JlIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHZhbHVlIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIG9yaWVudD86IHN0cmluZztcblxuICAvLyAtLS0tLS0tLS0tIEludGVycG9sYXRpb246IExpbmUgLyBhcmVhIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBsaW5lIGludGVycG9sYXRpb24gbWV0aG9kIHRvIHVzZS4gT25lIG9mIGxpbmVhciwgc3RlcC1iZWZvcmUsIHN0ZXAtYWZ0ZXIsIGJhc2lzLCBiYXNpcy1vcGVuLCBiYXNpcy1jbG9zZWQsIGJ1bmRsZSwgY2FyZGluYWwsIGNhcmRpbmFsLW9wZW4sIGNhcmRpbmFsLWNsb3NlZCwgbW9ub3RvbmUuXG4gICAqL1xuICBpbnRlcnBvbGF0ZT86IHN0cmluZztcbiAgLyoqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgaW50ZXJwb2xhdGlvbiB0eXBlLCBzZXRzIHRoZSB0ZW5zaW9uIHBhcmFtZXRlci5cbiAgICovXG4gIHRlbnNpb24/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBCYXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMuICBJZiB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgc2l6ZSBpcyAgYGJhbmRTaXplLTFgLFxuICAgKiB3aGljaCBwcm92aWRlcyAxIHBpeGVsIG9mZnNldCBiZXR3ZWVuIGJhcnMuXG4gICAqL1xuICBiYXJTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMgb24gY29udGludW91cyBzY2FsZXMuXG4gICAqL1xuICBiYXJUaGluU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFBvaW50IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wgc2hhcGUgdG8gdXNlLiBPbmUgb2YgY2lyY2xlIChkZWZhdWx0KSwgc3F1YXJlLCBjcm9zcywgZGlhbW9uZCwgdHJpYW5nbGUtdXAsIG9yIHRyaWFuZ2xlLWRvd24uXG4gICAqL1xuICBzaGFwZT86IFNoYXBlO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgU2l6ZSAoUG9pbnQgLyBTcXVhcmUgLyBDaXJjbGUpIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBwaXhlbCBhcmVhIGVhY2ggdGhlIHBvaW50LiBGb3IgZXhhbXBsZTogaW4gdGhlIGNhc2Ugb2YgY2lyY2xlcywgdGhlIHJhZGl1cyBpcyBkZXRlcm1pbmVkIGluIHBhcnQgYnkgdGhlIHNxdWFyZSByb290IG9mIHRoZSBzaXplIHZhbHVlLlxuICAgKi9cbiAgc2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2sgLS0tLS0tLS0tLVxuICAvKiogVGhlIHdpZHRoIG9mIHRoZSB0aWNrcy4gKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG5cbiAgLyoqIFRoaWNrbmVzcyBvZiB0aGUgdGljayBtYXJrLiAqL1xuICB0aWNrVGhpY2tuZXNzPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGV4dCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiBsZWZ0LCByaWdodCwgY2VudGVyLlxuICAgKi9cbiAgYWxpZ24/OiBIb3Jpem9udGFsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIHRleHQsIGluIGRlZ3JlZXMuXG4gICAqL1xuICBhbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiB0b3AsIG1pZGRsZSwgYm90dG9tLlxuICAgKi9cbiAgYmFzZWxpbmU/OiBWZXJ0aWNhbEFsaWduO1xuICAvKipcbiAgICogVGhlIGhvcml6b250YWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuXG4gICAqL1xuICBkeD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR5PzogbnVtYmVyO1xuICAvKipcbiAgICogUG9sYXIgY29vcmRpbmF0ZSByYWRpYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuXG4gICAqL1xuICByYWRpdXM/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgdGV4dCBsYWJlbCBmcm9tIHRoZSBvcmlnaW4gZGV0ZXJtaW5lZCBieSB0aGUgeCBhbmQgeSBwcm9wZXJ0aWVzLiBWYWx1ZXMgZm9yIHRoZXRhIGZvbGxvdyB0aGUgc2FtZSBjb252ZW50aW9uIG9mIGFyYyBtYXJrIHN0YXJ0QW5nbGUgYW5kIGVuZEFuZ2xlIHByb3BlcnRpZXM6IGFuZ2xlcyBhcmUgbWVhc3VyZWQgaW4gcmFkaWFucywgd2l0aCAwIGluZGljYXRpbmcgXCJub3J0aFwiLlxuICAgKi9cbiAgdGhldGE/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdHlwZWZhY2UgdG8gc2V0IHRoZSB0ZXh0IGluIChlLmcuLCBIZWx2ZXRpY2EgTmV1ZSkuXG4gICAqL1xuICBmb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzdHlsZSAoZS5nLiwgaXRhbGljKS5cbiAgICovXG4gIGZvbnRTdHlsZT86IEZvbnRTdHlsZTtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCAoZS5nLiwgYm9sZCkuXG4gICAqL1xuICBmb250V2VpZ2h0PzogRm9udFdlaWdodDtcbiAgLy8gVmVnYS1MaXRlIG9ubHkgZm9yIHRleHQgb25seVxuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgdGV4dCB2YWx1ZS4gSWYgbm90IGRlZmluZWQsIHRoaXMgd2lsbCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciBUZXh0XG4gICAqL1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcHBseSBjb2xvciBmaWVsZCB0byBiYWNrZ3JvdW5kIGNvbG9yIGluc3RlYWQgb2YgdGhlIHRleHQuXG4gICAqL1xuICBhcHBseUNvbG9yVG9CYWNrZ3JvdW5kPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRNYXJrQ29uZmlnOiBNYXJrQ29uZmlnID0ge1xuICBjb2xvcjogJyM0NjgyYjQnLFxuICBzdHJva2VXaWR0aDogMixcbiAgc2l6ZTogMzAsXG4gIGJhclRoaW5TaXplOiAyLFxuICB0aWNrVGhpY2tuZXNzOiAxLFxuXG4gIGZvbnRTaXplOiAxMCxcbiAgYmFzZWxpbmU6IFZlcnRpY2FsQWxpZ24uTUlERExFLFxuICB0ZXh0OiAnQWJjJyxcblxuICBzaG9ydFRpbWVMYWJlbHM6IGZhbHNlLFxuICBhcHBseUNvbG9yVG9CYWNrZ3JvdW5kOiBmYWxzZVxufTtcbiIsImltcG9ydCB7Q2VsbENvbmZpZywgZGVmYXVsdENlbGxDb25maWd9IGZyb20gJy4vY29uZmlnLmNlbGwuc2NoZW1hJztcbmltcG9ydCB7RmFjZXRDb25maWcsIGRlZmF1bHRGYWNldENvbmZpZ30gZnJvbSAnLi9jb25maWcuZmFjZXQuc2NoZW1hJztcbmltcG9ydCB7TWFya0NvbmZpZywgZGVmYXVsdE1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnLm1hcmsuc2NoZW1hJztcbmltcG9ydCB7U2NhbGVDb25maWcsIGRlZmF1bHRTY2FsZUNvbmZpZ30gZnJvbSAnLi9zY2FsZS5zY2hlbWEnO1xuaW1wb3J0IHtBeGlzQ29uZmlnLCBkZWZhdWx0QXhpc0NvbmZpZ30gZnJvbSAnLi9heGlzLnNjaGVtYSc7XG5pbXBvcnQge0xlZ2VuZENvbmZpZywgZGVmYXVsdExlZ2VuZENvbmZpZ30gZnJvbSAnLi9sZWdlbmQuc2NoZW1hJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAvLyBUT0RPOiBhZGQgdGhpcyBiYWNrIG9uY2Ugd2UgaGF2ZSB0b3AtZG93biBsYXlvdXQgYXBwcm9hY2hcbiAgLy8gd2lkdGg/OiBudW1iZXI7XG4gIC8vIGhlaWdodD86IG51bWJlcjtcbiAgLy8gcGFkZGluZz86IG51bWJlcnxzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgb24tc2NyZWVuIHZpZXdwb3J0LCBpbiBwaXhlbHMuIElmIG5lY2Vzc2FyeSwgY2xpcHBpbmcgYW5kIHNjcm9sbGluZyB3aWxsIGJlIGFwcGxpZWQuXG4gICAqL1xuICB2aWV3cG9ydD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENTUyBjb2xvciBwcm9wZXJ0eSB0byB1c2UgYXMgYmFja2dyb3VuZCBvZiB2aXN1YWxpemF0aW9uLiBEZWZhdWx0IGlzIGBcInRyYW5zcGFyZW50XCJgLlxuICAgKi9cbiAgYmFja2dyb3VuZD86IHN0cmluZztcblxuICAvKipcbiAgICogRDMgTnVtYmVyIGZvcm1hdCBmb3IgYXhpcyBsYWJlbHMgYW5kIHRleHQgdGFibGVzLiBGb3IgZXhhbXBsZSBcInNcIiBmb3IgU0kgdW5pdHMuXG4gICAqL1xuICBudW1iZXJGb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLlxuICAgKi9cbiAgdGltZUZvcm1hdD86IHN0cmluZztcblxuICBjZWxsPzogQ2VsbENvbmZpZztcbiAgbWFyaz86IE1hcmtDb25maWc7XG4gIHNjYWxlPzogU2NhbGVDb25maWc7XG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuICBsZWdlbmQ/OiBMZWdlbmRDb25maWc7XG5cbiAgZmFjZXQ/OiBGYWNldENvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IENvbmZpZyA9IHtcbiAgbnVtYmVyRm9ybWF0OiAncycsXG4gIHRpbWVGb3JtYXQ6ICclWS0lbS0lZCcsXG5cbiAgY2VsbDogZGVmYXVsdENlbGxDb25maWcsXG4gIG1hcms6IGRlZmF1bHRNYXJrQ29uZmlnLFxuICBzY2FsZTogZGVmYXVsdFNjYWxlQ29uZmlnLFxuICBheGlzOiBkZWZhdWx0QXhpc0NvbmZpZyxcbiAgbGVnZW5kOiBkZWZhdWx0TGVnZW5kQ29uZmlnLFxuXG4gIGZhY2V0OiBkZWZhdWx0RmFjZXRDb25maWcsXG59O1xuIiwiZXhwb3J0IGludGVyZmFjZSBMZWdlbmRDb25maWcge1xuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBsZWdlbmQuIE9uZSBvZiBcImxlZnRcIiBvciBcInJpZ2h0XCIuIFRoaXMgZGV0ZXJtaW5lcyBob3cgdGhlIGxlZ2VuZCBpcyBwb3NpdGlvbmVkIHdpdGhpbiB0aGUgc2NlbmUuIFRoZSBkZWZhdWx0IGlzIFwicmlnaHRcIi5cbiAgICovXG4gIG9yaWVudD86IHN0cmluZztcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBsZWdlbmQgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE8oIzk3NSkgcmVwbGFjZSB3aXRoIGNvbmZpZyBwcm9wZXJ0aWVzXG59XG5cbi8qKlxuICogUHJvcGVydGllcyBvZiBhIGxlZ2VuZCBvciBib29sZWFuIGZsYWcgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdG8gc2hvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMZWdlbmRQcm9wZXJ0aWVzIGV4dGVuZHMgTGVnZW5kQ29uZmlnIHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbGVnZW5kIGxhYmVscy4gVmVnYSB1c2VzIEQzXFwncyBmb3JtYXQgcGF0dGVybi5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIEEgdGl0bGUgZm9yIHRoZSBsZWdlbmQuIChTaG93cyBmaWVsZCBuYW1lIGFuZCBpdHMgZnVuY3Rpb24gYnkgZGVmYXVsdC4pXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIEV4cGxpY2l0bHkgc2V0IHRoZSB2aXNpYmxlIGxlZ2VuZCB2YWx1ZXMuXG4gICAqL1xuICB2YWx1ZXM/OiBBcnJheTxhbnk+O1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdExlZ2VuZENvbmZpZzogTGVnZW5kQ29uZmlnID0ge1xuICBvcmllbnQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSBcInJpZ2h0XCJcbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZVxufTtcbiIsImltcG9ydCB7U2NhbGVUeXBlLCBOaWNlVGltZX0gZnJvbSAnLi4vZW51bXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlQ29uZmlnIHtcbiAgLyoqXG4gICAqIElmIHRydWUsIHJvdW5kcyBudW1lcmljIG91dHB1dCB2YWx1ZXMgdG8gaW50ZWdlcnMuXG4gICAqIFRoaXMgY2FuIGJlIGhlbHBmdWwgZm9yIHNuYXBwaW5nIHRvIHRoZSBwaXhlbCBncmlkLlxuICAgKiAoT25seSBhdmFpbGFibGUgZm9yIGB4YCwgYHlgLCBgc2l6ZWAsIGByb3dgLCBhbmQgYGNvbHVtbmAgc2NhbGVzLilcbiAgICovXG4gIHJvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqICBEZWZhdWx0IGJhbmQgd2lkdGggZm9yIGB4YCBvcmRpbmFsIHNjYWxlIHdoZW4gaXMgbWFyayBpcyBgdGV4dGAuXG4gICAqICBAbWluaW11bSAwXG4gICAqL1xuICB0ZXh0QmFuZFdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBiYW5kIHNpemUgZm9yICgxKSBgeWAgb3JkaW5hbCBzY2FsZSxcbiAgICogYW5kICgyKSBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIHRoZSBtYXJrIGlzIG5vdCBgdGV4dGAuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJhbmRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBwYWRkaW5nIGZvciBgeGAgYW5kIGB5YCBvcmRpbmFsIHNjYWxlcy5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLy8gRXhwZXJpbWVudGFsIEZlYXR1cmVcbiAgdXNlUmF3RG9tYWluPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igbm9taW5hbCBjb2xvciBzY2FsZSAqL1xuICBub21pbmFsQ29sb3JSYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igb3JkaW5hbCAvIGNvbnRpbnVvdXMgY29sb3Igc2NhbGUgKi9cbiAgc2VxdWVudGlhbENvbG9yUmFuZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHNoYXBlICovXG4gIHNoYXBlUmFuZ2U/OiBzdHJpbmd8c3RyaW5nW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGJhciBzaXplIHNjYWxlICovXG4gIGJhclNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBmb250IHNpemUgc2NhbGUgKi9cbiAgZm9udFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBwb2ludFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8vIG5pY2Ugc2hvdWxkIGRlcGVuZHMgb24gdHlwZSAocXVhbnRpdGF0aXZlIG9yIHRlbXBvcmFsKSwgc29cbiAgLy8gbGV0J3Mgbm90IG1ha2UgYSBjb25maWcuXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2NhbGVDb25maWc6IFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgdGV4dEJhbmRXaWR0aDogOTAsXG4gIGJhbmRTaXplOiAyMSxcbiAgcGFkZGluZzogMSxcbiAgdXNlUmF3RG9tYWluOiBmYWxzZSxcblxuICBub21pbmFsQ29sb3JSYW5nZTogJ2NhdGVnb3J5MTAnLFxuICBzZXF1ZW50aWFsQ29sb3JSYW5nZTogWycjQUZDNkEzJywgJyMwOTYyMkEnXSwgLy8gdGFibGVhdSBncmVlbnNcbiAgc2hhcGVSYW5nZTogJ3NoYXBlcycsXG4gIGZvbnRTaXplUmFuZ2U6IFs4LCA0MF1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRTY2FsZUNvbmZpZyB7XG4gIHJvdW5kPzogYm9vbGVhbjtcbiAgcGFkZGluZz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnOiBGYWNldFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgcGFkZGluZzogMTZcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NhbGUge1xuICB0eXBlPzogU2NhbGVUeXBlO1xuICAvKipcbiAgICogVGhlIGRvbWFpbiBvZiB0aGUgc2NhbGUsIHJlcHJlc2VudGluZyB0aGUgc2V0IG9mIGRhdGEgdmFsdWVzLiBGb3IgcXVhbnRpdGF0aXZlIGRhdGEsIHRoaXMgY2FuIHRha2UgdGhlIGZvcm0gb2YgYSB0d28tZWxlbWVudCBhcnJheSB3aXRoIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLiBGb3Igb3JkaW5hbC9jYXRlZ29yaWNhbCBkYXRhLCB0aGlzIG1heSBiZSBhbiBhcnJheSBvZiB2YWxpZCBpbnB1dCB2YWx1ZXMuIFRoZSBkb21haW4gbWF5IGFsc28gYmUgc3BlY2lmaWVkIGJ5IGEgcmVmZXJlbmNlIHRvIGEgZGF0YSBzb3VyY2UuXG4gICAqL1xuICBkb21haW4/OiBzdHJpbmcgfCBudW1iZXJbXSB8IHN0cmluZ1tdOyAvLyBUT0RPOiBkZWNsYXJlIHZnRGF0YURvbWFpblxuICAvKipcbiAgICogVGhlIHJhbmdlIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgdmlzdWFsIHZhbHVlcy4gRm9yIG51bWVyaWMgdmFsdWVzLCB0aGUgcmFuZ2UgY2FuIHRha2UgdGhlIGZvcm0gb2YgYSB0d28tZWxlbWVudCBhcnJheSB3aXRoIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLiBGb3Igb3JkaW5hbCBvciBxdWFudGl6ZWQgZGF0YSwgdGhlIHJhbmdlIG1heSBieSBhbiBhcnJheSBvZiBkZXNpcmVkIG91dHB1dCB2YWx1ZXMsIHdoaWNoIGFyZSBtYXBwZWQgdG8gZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBkb21haW4uIEZvciBvcmRpbmFsIHNjYWxlcyBvbmx5LCB0aGUgcmFuZ2UgY2FuIGJlIGRlZmluZWQgdXNpbmcgYSBEYXRhUmVmOiB0aGUgcmFuZ2UgdmFsdWVzIGFyZSB0aGVuIGRyYXduIGR5bmFtaWNhbGx5IGZyb20gYSBiYWNraW5nIGRhdGEgc2V0LlxuICAgKi9cbiAgcmFuZ2U/OiBzdHJpbmcgfCBudW1iZXJbXSB8IHN0cmluZ1tdOyAvLyBUT0RPOiBkZWNsYXJlIHZnUmFuZ2VEb21haW5cbiAgLyoqXG4gICAqIElmIHRydWUsIHJvdW5kcyBudW1lcmljIG91dHB1dCB2YWx1ZXMgdG8gaW50ZWdlcnMuIFRoaXMgY2FuIGJlIGhlbHBmdWwgZm9yIHNuYXBwaW5nIHRvIHRoZSBwaXhlbCBncmlkLlxuICAgKi9cbiAgcm91bmQ/OiBib29sZWFuO1xuXG4gIC8vIG9yZGluYWxcbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJhbmRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogQXBwbGllcyBzcGFjaW5nIGFtb25nIG9yZGluYWwgZWxlbWVudHMgaW4gdGhlIHNjYWxlIHJhbmdlLiBUaGUgYWN0dWFsIGVmZmVjdCBkZXBlbmRzIG9uIGhvdyB0aGUgc2NhbGUgaXMgY29uZmlndXJlZC4gSWYgdGhlIF9fcG9pbnRzX18gcGFyYW1ldGVyIGlzIGB0cnVlYCwgdGhlIHBhZGRpbmcgdmFsdWUgaXMgaW50ZXJwcmV0ZWQgYXMgYSBtdWx0aXBsZSBvZiB0aGUgc3BhY2luZyBiZXR3ZWVuIHBvaW50cy4gQSByZWFzb25hYmxlIHZhbHVlIGlzIDEuMCwgc3VjaCB0aGF0IHRoZSBmaXJzdCBhbmQgbGFzdCBwb2ludCB3aWxsIGJlIG9mZnNldCBmcm9tIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIGJ5IGhhbGYgdGhlIGRpc3RhbmNlIGJldHdlZW4gcG9pbnRzLiBPdGhlcndpc2UsIHBhZGRpbmcgaXMgdHlwaWNhbGx5IGluIHRoZSByYW5nZSBbMCwgMV0gYW5kIGNvcnJlc3BvbmRzIHRvIHRoZSBmcmFjdGlvbiBvZiBzcGFjZSBpbiB0aGUgcmFuZ2UgaW50ZXJ2YWwgdG8gYWxsb2NhdGUgdG8gcGFkZGluZy4gQSB2YWx1ZSBvZiAwLjUgbWVhbnMgdGhhdCB0aGUgcmFuZ2UgYmFuZCB3aWR0aCB3aWxsIGJlIGVxdWFsIHRvIHRoZSBwYWRkaW5nIHdpZHRoLiBGb3IgbW9yZSwgc2VlIHRoZSBbRDMgb3JkaW5hbCBzY2FsZSBkb2N1bWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vbWJvc3RvY2svZDMvd2lraS9PcmRpbmFsLVNjYWxlcykuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuXG4gIC8vIHR5cGljYWxcbiAgLyoqXG4gICAqIElmIHRydWUsIHZhbHVlcyB0aGF0IGV4Y2VlZCB0aGUgZGF0YSBkb21haW4gYXJlIGNsYW1wZWQgdG8gZWl0aGVyIHRoZSBtaW5pbXVtIG9yIG1heGltdW0gcmFuZ2UgdmFsdWVcbiAgICovXG4gIGNsYW1wPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElmIHNwZWNpZmllZCwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IHZhbHVlIHJhbmdlLiBJZiBzcGVjaWZpZWQgYXMgYSB0cnVlIGJvb2xlYW4sIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSBudW1iZXIgcmFuZ2UgKGUuZy4sIDcgaW5zdGVhZCBvZiA2Ljk2KS4gSWYgc3BlY2lmaWVkIGFzIGEgc3RyaW5nLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIEZvciB0aW1lIGFuZCB1dGMgc2NhbGUgdHlwZXMgb25seSwgdGhlIG5pY2UgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIGRlc2lyZWQgdGltZSBpbnRlcnZhbC5cbiAgICovXG4gIG5pY2U/OiBib29sZWFuIHwgTmljZVRpbWU7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleHBvbmVudCBvZiB0aGUgc2NhbGUgdHJhbnNmb3JtYXRpb24uIEZvciBwb3cgc2NhbGUgdHlwZXMgb25seSwgb3RoZXJ3aXNlIGlnbm9yZWQuXG4gICAqL1xuICBleHBvbmVudD86IG51bWJlcjtcbiAgLyoqXG4gICAqIElmIHRydWUsIGVuc3VyZXMgdGhhdCBhIHplcm8gYmFzZWxpbmUgdmFsdWUgaXMgaW5jbHVkZWQgaW4gdGhlIHNjYWxlIGRvbWFpbi4gVGhpcyBvcHRpb24gaXMgaWdub3JlZCBmb3Igbm9uLXF1YW50aXRhdGl2ZSBzY2FsZXMuXG4gICAqL1xuICB6ZXJvPzogYm9vbGVhbjtcblxuICAvLyBWZWdhLUxpdGUgb25seVxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy4gVGhpcyBvcHRpb24gZG9lcyBub3Qgd29yayB3aXRoIHN1bSBvciBjb3VudCBhZ2dyZWdhdGUgYXMgdGhleSBtaWdodCBoYXZlIGEgc3Vic3RhbnRpYWxseSBsYXJnZXIgc2NhbGUgcmFuZ2UuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xufVxuIiwiLyoqIG1vZHVsZSBmb3Igc2hvcnRoYW5kICovXG5cbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vc2NoZW1hL2VuY29kaW5nLnNjaGVtYSc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuL3NjaGVtYS9maWVsZGRlZi5zY2hlbWEnO1xuaW1wb3J0IHtTcGVjfSBmcm9tICcuL3NjaGVtYS9zY2hlbWEnO1xuXG5pbXBvcnQge0FnZ3JlZ2F0ZU9wLCBBR0dSRUdBVEVfT1BTfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge1RJTUVVTklUU30gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge1NIT1JUX1RZUEUsIFRZUEVfRlJPTV9TSE9SVF9UWVBFfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcblxuZXhwb3J0IGNvbnN0IERFTElNID0gJ3wnO1xuZXhwb3J0IGNvbnN0IEFTU0lHTiA9ICc9JztcbmV4cG9ydCBjb25zdCBUWVBFID0gJywnO1xuZXhwb3J0IGNvbnN0IEZVTkMgPSAnXyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW4oc3BlYzogU3BlYyk6IHN0cmluZyB7XG4gIHJldHVybiAnbWFyaycgKyBBU1NJR04gKyBzcGVjLm1hcmsgK1xuICAgIERFTElNICsgc2hvcnRlbkVuY29kaW5nKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc2hvcnRoYW5kOiBzdHJpbmcsIGRhdGE/LCBjb25maWc/KSB7XG4gIGxldCBzcGxpdCA9IHNob3J0aGFuZC5zcGxpdChERUxJTSksXG4gICAgbWFyayA9IHNwbGl0LnNoaWZ0KCkuc3BsaXQoQVNTSUdOKVsxXS50cmltKCksXG4gICAgZW5jb2RpbmcgPSBwYXJzZUVuY29kaW5nKHNwbGl0LmpvaW4oREVMSU0pKTtcblxuICBsZXQgc3BlYzpTcGVjID0ge1xuICAgIG1hcms6IE1hcmtbbWFya10sXG4gICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gIH07XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHNwZWMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgaWYgKGNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5jb25maWcgPSBjb25maWc7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRW5jb2RpbmcoZW5jb2Rpbmc6IEVuY29kaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZsRW5jb2RpbmcubWFwKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZiwgY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsICsgQVNTSUdOICsgc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgfSkuam9pbihERUxJTSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVuY29kaW5nKGVuY29kaW5nU2hvcnRoYW5kOiBzdHJpbmcpOiBFbmNvZGluZyB7XG4gIHJldHVybiBlbmNvZGluZ1Nob3J0aGFuZC5zcGxpdChERUxJTSkucmVkdWNlKGZ1bmN0aW9uKG0sIGUpIHtcbiAgICBjb25zdCBzcGxpdCA9IGUuc3BsaXQoQVNTSUdOKSxcbiAgICAgICAgZW5jdHlwZSA9IHNwbGl0WzBdLnRyaW0oKSxcbiAgICAgICAgZmllbGREZWZTaG9ydGhhbmQgPSBzcGxpdFsxXTtcblxuICAgIG1bZW5jdHlwZV0gPSBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kKTtcbiAgICByZXR1cm4gbTtcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZik6IHN0cmluZyB7XG4gIHJldHVybiAoZmllbGREZWYuYWdncmVnYXRlID8gZmllbGREZWYuYWdncmVnYXRlICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLnRpbWVVbml0ID8gZmllbGREZWYudGltZVVuaXQgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuYmluID8gJ2JpbicgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuZmllbGQgfHwgJycpICsgVFlQRSArIFNIT1JUX1RZUEVbZmllbGREZWYudHlwZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWZzKGZpZWxkRGVmczogRmllbGREZWZbXSwgZGVsaW0gPSBERUxJTSk6IHN0cmluZyB7XG4gIHJldHVybiBmaWVsZERlZnMubWFwKHNob3J0ZW5GaWVsZERlZikuam9pbihkZWxpbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kOiBzdHJpbmcpOiBGaWVsZERlZiB7XG4gIGNvbnN0IHNwbGl0ID0gZmllbGREZWZTaG9ydGhhbmQuc3BsaXQoVFlQRSk7XG5cbiAgbGV0IGZpZWxkRGVmOiBGaWVsZERlZiA9IHtcbiAgICBmaWVsZDogc3BsaXRbMF0udHJpbSgpLFxuICAgIHR5cGU6IFRZUEVfRlJPTV9TSE9SVF9UWVBFW3NwbGl0WzFdLnRyaW0oKV1cbiAgfTtcblxuICAvLyBjaGVjayBhZ2dyZWdhdGUgdHlwZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFHR1JFR0FURV9PUFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgYSA9IEFHR1JFR0FURV9PUFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoYSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGEudG9TdHJpbmcoKS5sZW5ndGggKyAxKTtcbiAgICAgIGlmIChhID09PSBBZ2dyZWdhdGVPcC5DT1VOVCAmJiBmaWVsZERlZi5maWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZmllbGREZWYuZmllbGQgPSAnKic7XG4gICAgICB9XG4gICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBUSU1FVU5JVFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdHUgPSBUSU1FVU5JVFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YodHUgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihmaWVsZERlZi5maWVsZC5sZW5ndGggKyAxKTtcbiAgICAgIGZpZWxkRGVmLnRpbWVVbml0ID0gdHU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBiaW5cbiAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoJ2Jpbl8nKSA9PT0gMCkge1xuICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKDQpO1xuICAgIGZpZWxkRGVmLmJpbiA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gZmllbGREZWY7XG59XG4iLCIvKiBVdGlsaXRpZXMgZm9yIGEgVmVnYS1MaXRlIHNwZWNpZmljaWF0aW9uICovXG5cbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vc2NoZW1hL2ZpZWxkZGVmLnNjaGVtYSc7XG5pbXBvcnQge1NwZWN9IGZyb20gJy4vc2NoZW1hL3NjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vY29tcGlsZS9Nb2RlbCc7XG5pbXBvcnQge0NPTE9SLCBTSEFQRX0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge0JBUiwgQVJFQX0gZnJvbSAnLi9tYXJrJztcbmltcG9ydCB7ZHVwbGljYXRlfSBmcm9tICcuL3V0aWwnO1xuXG4vLyBUT0RPOiBhZGQgdmwuc3BlYy52YWxpZGF0ZSAmIG1vdmUgc3R1ZmYgZnJvbSB2bC52YWxpZGF0ZSB0byBoZXJlXG5cbmV4cG9ydCBmdW5jdGlvbiBhbHdheXNOb09jY2x1c2lvbihzcGVjOiBTcGVjKTogYm9vbGVhbiB7XG4gIC8vIEZJWE1FIHJhdyBPeFEgd2l0aCAjIG9mIHJvd3MgPSAjIG9mIE9cbiAgcmV0dXJuIHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoc3BlYzogU3BlYyk6IEZpZWxkRGVmW10ge1xuICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIG9uY2Ugd2UgaGF2ZSBjb21wb3NpdGlvblxuICByZXR1cm4gdmxFbmNvZGluZy5maWVsZERlZnMoc3BlYy5lbmNvZGluZyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xlYW5TcGVjKHNwZWM6IFNwZWMpOiBTcGVjIHtcbiAgLy8gVE9ETzogbW92ZSB0b1NwZWMgdG8gaGVyZSFcbiAgcmV0dXJuIG5ldyBNb2RlbChzcGVjKS50b1NwZWModHJ1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0YWNrKHNwZWM6IFNwZWMpOiBib29sZWFuIHtcbiAgcmV0dXJuICh2bEVuY29kaW5nLmhhcyhzcGVjLmVuY29kaW5nLCBDT0xPUikgfHwgdmxFbmNvZGluZy5oYXMoc3BlYy5lbmNvZGluZywgU0hBUEUpKSAmJlxuICAgIChzcGVjLm1hcmsgPT09IEJBUiB8fCBzcGVjLm1hcmsgPT09IEFSRUEpICYmXG4gICAgKCFzcGVjLmNvbmZpZyB8fCAhc3BlYy5jb25maWcubWFyay5zdGFja2VkICE9PSBmYWxzZSkgJiZcbiAgICB2bEVuY29kaW5nLmlzQWdncmVnYXRlKHNwZWMuZW5jb2RpbmcpO1xufVxuXG4vLyBUT0RPIHJldmlzZVxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShzcGVjOiBTcGVjKTogU3BlYyB7XG4gIGNvbnN0IG9sZGVuYyA9IHNwZWMuZW5jb2Rpbmc7XG4gIGxldCBlbmNvZGluZyA9IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nKTtcbiAgZW5jb2RpbmcueCA9IG9sZGVuYy55O1xuICBlbmNvZGluZy55ID0gb2xkZW5jLng7XG4gIGVuY29kaW5nLnJvdyA9IG9sZGVuYy5jb2x1bW47XG4gIGVuY29kaW5nLmNvbHVtbiA9IG9sZGVuYy5yb3c7XG4gIHNwZWMuZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgcmV0dXJuIHNwZWM7XG59XG4iLCJcbmV4cG9ydCBlbnVtIFRpbWVVbml0IHtcbiAgICBZRUFSID0gJ3llYXInIGFzIGFueSxcbiAgICBNT05USCA9ICdtb250aCcgYXMgYW55LFxuICAgIERBWSA9ICdkYXknIGFzIGFueSxcbiAgICBEQVRFID0gJ2RhdGUnIGFzIGFueSxcbiAgICBIT1VSUyA9ICdob3VycycgYXMgYW55LFxuICAgIE1JTlVURVMgPSAnbWludXRlcycgYXMgYW55LFxuICAgIFNFQ09ORFMgPSAnc2Vjb25kcycgYXMgYW55LFxuICAgIE1JTExJU0VDT05EUyA9ICdtaWxsaXNlY29uZHMnIGFzIGFueSxcbiAgICBZRUFSTU9OVEggPSAneWVhcm1vbnRoJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZID0gJ3llYXJtb250aGRheScgYXMgYW55LFxuICAgIFlFQVJNT05USERBVEUgPSAneWVhcm1vbnRoZGF0ZScgYXMgYW55LFxuICAgIFlFQVJEQVkgPSAneWVhcmRheScgYXMgYW55LFxuICAgIFlFQVJEQVRFID0gJ3llYXJkYXRlJyBhcyBhbnksXG4gICAgWUVBUk1PTlRIREFZSE9VUlMgPSAneWVhcm1vbnRoZGF5aG91cnMnIGFzIGFueSxcbiAgICBZRUFSTU9OVEhEQVlIT1VSU01JTlVURVMgPSAneWVhcm1vbnRoZGF5aG91cnNtaW51dGVzJyBhcyBhbnksXG4gICAgSE9VUlNNSU5VVEVTID0gJ2hvdXJzbWludXRlcycgYXMgYW55LFxuICAgIEhPVVJTTUlOVVRFU1NFQ09ORFMgPSAnaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICAgIE1JTlVURVNTRUNPTkRTID0gJ21pbnV0ZXNzZWNvbmRzJyBhcyBhbnksXG4gICAgU0VDT05EU01JTExJU0VDT05EUyA9ICdzZWNvbmRzbWlsbGlzZWNvbmRzJyBhcyBhbnksXG59XG5cbmV4cG9ydCBjb25zdCBUSU1FVU5JVFMgPSBbXG4gICAgVGltZVVuaXQuWUVBUixcbiAgICBUaW1lVW5pdC5NT05USCxcbiAgICBUaW1lVW5pdC5EQVksXG4gICAgVGltZVVuaXQuREFURSxcbiAgICBUaW1lVW5pdC5IT1VSUyxcbiAgICBUaW1lVW5pdC5NSU5VVEVTLFxuICAgIFRpbWVVbml0LlNFQ09ORFMsXG4gICAgVGltZVVuaXQuTUlMTElTRUNPTkRTLFxuICAgIFRpbWVVbml0LllFQVJNT05USCxcbiAgICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVksXG4gICAgVGltZVVuaXQuWUVBUk1PTlRIREFURSxcbiAgICBUaW1lVW5pdC5ZRUFSREFZLFxuICAgIFRpbWVVbml0LllFQVJEQVRFLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWUhPVVJTLFxuICAgIFRpbWVVbml0LllFQVJNT05USERBWUhPVVJTTUlOVVRFUyxcbiAgICBUaW1lVW5pdC5IT1VSU01JTlVURVMsXG4gICAgVGltZVVuaXQuSE9VUlNNSU5VVEVTU0VDT05EUyxcbiAgICBUaW1lVW5pdC5NSU5VVEVTU0VDT05EUyxcbiAgICBUaW1lVW5pdC5TRUNPTkRTTUlMTElTRUNPTkRTLFxuXTtcbiIsIi8qKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YSB0eXBlICovXG5cbmV4cG9ydCBlbnVtIFR5cGUge1xuICBRVUFOVElUQVRJVkUgPSAncXVhbnRpdGF0aXZlJyBhcyBhbnksXG4gIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICBURU1QT1JBTCA9ICd0ZW1wb3JhbCcgYXMgYW55LFxuICBOT01JTkFMID0gJ25vbWluYWwnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgUVVBTlRJVEFUSVZFID0gVHlwZS5RVUFOVElUQVRJVkU7XG5leHBvcnQgY29uc3QgT1JESU5BTCA9IFR5cGUuT1JESU5BTDtcbmV4cG9ydCBjb25zdCBURU1QT1JBTCA9IFR5cGUuVEVNUE9SQUw7XG5leHBvcnQgY29uc3QgTk9NSU5BTCA9IFR5cGUuTk9NSU5BTDtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gZnVsbCB0eXBlIG5hbWVzIHRvIHNob3J0IHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgU0hPUlRfVFlQRSA9IHtcbiAgcXVhbnRpdGF0aXZlOiAnUScsXG4gIHRlbXBvcmFsOiAnVCcsXG4gIG5vbWluYWw6ICdOJyxcbiAgb3JkaW5hbDogJ08nXG59O1xuLyoqXG4gKiBNYXBwaW5nIGZyb20gc2hvcnQgdHlwZSBuYW1lcyB0byBmdWxsIHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9GUk9NX1NIT1JUX1RZUEUgPSB7XG4gIFE6IFFVQU5USVRBVElWRSxcbiAgVDogVEVNUE9SQUwsXG4gIE86IE9SRElOQUwsXG4gIE46IE5PTUlOQUxcbn07XG5cbi8qKlxuICogR2V0IGZ1bGwsIGxvd2VyY2FzZSB0eXBlIG5hbWUgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSAgdHlwZVxuICogQHJldHVybiBGdWxsIHR5cGUgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxOYW1lKHR5cGU6IFR5cGUpOiBUeXBlIHtcbiAgY29uc3QgdHlwZVN0cmluZyA9IDxhbnk+dHlwZTsgIC8vIGZvcmNlIHR5cGUgYXMgc3RyaW5nIHNvIHdlIGNhbiB0cmFuc2xhdGUgc2hvcnQgdHlwZXNcbiAgcmV0dXJuIFRZUEVfRlJPTV9TSE9SVF9UWVBFW3R5cGVTdHJpbmcudG9VcHBlckNhc2UoKV0gfHwgLy8gc2hvcnQgdHlwZSBpcyB1cHBlcmNhc2UgYnkgZGVmYXVsdFxuICAgICAgICAgdHlwZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZGF0YWxpYi5kLnRzXCIvPlxuXG5leHBvcnQge2tleXMsIGV4dGVuZCwgZHVwbGljYXRlLCBpc0FycmF5LCB2YWxzLCB0cnVuY2F0ZSwgdG9NYXAsIGlzT2JqZWN0fSBmcm9tICdkYXRhbGliL3NyYy91dGlsJztcbmV4cG9ydCB7cmFuZ2V9IGZyb20gJ2RhdGFsaWIvc3JjL2dlbmVyYXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zPFQ+KGFycmF5OiBBcnJheTxUPiwgaXRlbTogVCkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA+IC0xO1xufVxuXG4vKiogUmV0dXJucyB0aGUgYXJyYXkgd2l0aG91dCB0aGUgZWxlbWVudHMgaW4gaXRlbSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhvdXQ8VD4oYXJyYXk6IEFycmF5PFQ+LCBpdGVtczogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFjb250YWlucyhpdGVtcywgaXRlbSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmcpIHtcbiAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgb2JqLmZvckVhY2guY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKG9iaiwgZjogKGEsIGksIGQsIGssIG8pID0+IGFueSwgaW5pdCwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5yZWR1Y2UpIHtcbiAgICByZXR1cm4gb2JqLnJlZHVjZS5jYWxsKHRoaXNBcmcsIGYsIGluaXQpO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGluaXQgPSBmLmNhbGwodGhpc0FyZywgaW5pdCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5pdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcC5jYWxsKHRoaXNBcmcsIGYpO1xuICB9IGVsc2Uge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBvdXRwdXQucHVzaChmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW55PFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoZihhcnJba10sIGssIGkrKykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGw8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmICghZihhcnJba10sIGssIGkrKykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yIChsZXQgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0ICogYXMgZGxCaW4gZnJvbSAnZGF0YWxpYi9zcmMvYmlucy9iaW5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRiaW5zKHN0YXRzLCBtYXhiaW5zKSB7XG4gIHJldHVybiBkbEJpbih7XG4gICAgbWluOiBzdGF0cy5taW4sXG4gICAgbWF4OiBzdGF0cy5tYXgsXG4gICAgbWF4YmluczogbWF4Ymluc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLmVycm9yKCdbVkwgRXJyb3JdJywgbWVzc2FnZSk7XG59XG4iLCJpbXBvcnQge1NwZWN9IGZyb20gJy4vc2NoZW1hL3NjaGVtYSc7XG5cbi8vIFRPRE86IG1vdmUgdG8gdmwuc3BlYy52YWxpZGF0b3I/XG5cbmltcG9ydCB7dG9NYXB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0JBUn0gZnJvbSAnLi9tYXJrJztcblxuaW50ZXJmYWNlIFJlcXVpcmVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIEVuY29kaW5nIENoYW5uZWxzIGZvciBlYWNoIG1hcmsgdHlwZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IHtcbiAgdGV4dDogWyd0ZXh0J10sXG4gIGxpbmU6IFsneCcsICd5J10sXG4gIGFyZWE6IFsneCcsICd5J11cbn07XG5cbmludGVyZmFjZSBTdXBwb3J0ZWRDaGFubmVsTWFwIHtcbiAgW21hcms6IHN0cmluZ106IHtcbiAgICBbY2hhbm5lbDogc3RyaW5nXTogbnVtYmVyXG4gIH07XG59XG5cbi8qKlxuICogU3VwcG9ydGVkIEVuY29kaW5nIENoYW5uZWwgZm9yIGVhY2ggbWFyayB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEU6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSB7XG4gIGJhcjogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdzaXplJywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgbGluZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksIC8vIFRPRE86IGFkZCBzaXplIHdoZW4gVmVnYSBzdXBwb3J0c1xuICBhcmVhOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgdGljazogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGNpcmNsZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgc3F1YXJlOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ3NpemUnLCAnZGV0YWlsJ10pLFxuICBwb2ludDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCcsICdzaGFwZSddKSxcbiAgdGV4dDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3NpemUnLCAnY29sb3InLCAndGV4dCddKSAvLyBUT0RPKCM3MjQpIHJldmlzZVxufTtcblxuLy8gVE9ETzogY29uc2lkZXIgaWYgd2Ugc2hvdWxkIGFkZCB2YWxpZGF0ZSBtZXRob2QgYW5kXG4vLyByZXF1aXJlcyBaU2NoZW1hIGluIHRoZSBtYWluIHZlZ2EtbGl0ZSByZXBvXG5cbi8qKlxuICogRnVydGhlciBjaGVjayBpZiBlbmNvZGluZyBtYXBwaW5nIG9mIGEgc3BlYyBpcyBpbnZhbGlkIGFuZFxuICogcmV0dXJuIGVycm9yIGlmIGl0IGlzIGludmFsaWQuXG4gKlxuICogVGhpcyBjaGVja3MgaWZcbiAqICgxKSBhbGwgdGhlIHJlcXVpcmVkIGVuY29kaW5nIGNoYW5uZWxzIGZvciB0aGUgbWFyayB0eXBlIGFyZSBzcGVjaWZpZWRcbiAqICgyKSBhbGwgdGhlIHNwZWNpZmllZCBlbmNvZGluZyBjaGFubmVscyBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBtYXJrIHR5cGVcbiAqIEBwYXJhbSAge1t0eXBlXX0gc3BlYyBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtSZXF1aXJlZENoYW5uZWxNYXAgID0gRGVmYXVsdFJlcXVpcmVkQ2hhbm5lbE1hcH0gIHJlcXVpcmVkQ2hhbm5lbE1hcFxuICogQHBhcmFtICB7U3VwcG9ydGVkQ2hhbm5lbE1hcCA9IERlZmF1bHRTdXBwb3J0ZWRDaGFubmVsTWFwfSBzdXBwb3J0ZWRDaGFubmVsTWFwXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybiBvbmUgcmVhc29uIHdoeSB0aGUgZW5jb2RpbmcgaXMgaW52YWxpZCxcbiAqICAgICAgICAgICAgICAgICAgb3IgbnVsbCBpZiB0aGUgZW5jb2RpbmcgaXMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmNvZGluZ01hcHBpbmdFcnJvcihzcGVjOiBTcGVjLFxuICByZXF1aXJlZENoYW5uZWxNYXA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVAsXG4gIHN1cHBvcnRlZENoYW5uZWxNYXA6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEVcbiAgKSB7XG4gIGxldCBtYXJrID0gc3BlYy5tYXJrO1xuICBsZXQgZW5jb2RpbmcgPSBzcGVjLmVuY29kaW5nO1xuICBsZXQgcmVxdWlyZWRDaGFubmVscyA9IHJlcXVpcmVkQ2hhbm5lbE1hcFttYXJrXTtcbiAgbGV0IHN1cHBvcnRlZENoYW5uZWxzID0gc3VwcG9ydGVkQ2hhbm5lbE1hcFttYXJrXTtcblxuICBmb3IgKGxldCBpIGluIHJlcXVpcmVkQ2hhbm5lbHMpIHsgLy8gYWxsIHJlcXVpcmVkIGNoYW5uZWxzIGFyZSBpbiBlbmNvZGluZ2BcbiAgICBpZiAoIShyZXF1aXJlZENoYW5uZWxzW2ldIGluIGVuY29kaW5nKSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIGVuY29kaW5nIGNoYW5uZWwgXFxcIicgKyByZXF1aXJlZENoYW5uZWxzW2ldICtcbiAgICAgICAgJ1xcXCIgZm9yIG1hcmsgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGNoYW5uZWwgaW4gZW5jb2RpbmcpIHsgLy8gYWxsIGNoYW5uZWxzIGluIGVuY29kaW5nIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAoIXN1cHBvcnRlZENoYW5uZWxzW2NoYW5uZWxdKSB7XG4gICAgICByZXR1cm4gJ0VuY29kaW5nIGNoYW5uZWwgXFxcIicgKyBjaGFubmVsICtcbiAgICAgICAgJ1xcXCIgaXMgbm90IHN1cHBvcnRlZCBieSBtYXJrIHR5cGUgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXJrID09PSBCQVIgJiYgIWVuY29kaW5nLnggJiYgIWVuY29kaW5nLnkpIHtcbiAgICByZXR1cm4gJ01pc3NpbmcgYm90aCB4IGFuZCB5IGZvciBiYXInO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQgKiBhcyB2bEJpbiBmcm9tICcuL2Jpbic7XG5pbXBvcnQgKiBhcyB2bENoYW5uZWwgZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCAqIGFzIHZsRGF0YSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCAqIGFzIHZsRmllbGREZWYgZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQgKiBhcyB2bENvbXBpbGUgZnJvbSAnLi9jb21waWxlL2NvbXBpbGUnO1xuaW1wb3J0ICogYXMgdmxTY2hlbWEgZnJvbSAnLi9zY2hlbWEvc2NoZW1hJztcbmltcG9ydCAqIGFzIHZsU2hvcnRoYW5kIGZyb20gJy4vc2hvcnRoYW5kJztcbmltcG9ydCAqIGFzIHZsU3BlYyBmcm9tICcuL3NwZWMnO1xuaW1wb3J0ICogYXMgdmxUaW1lVW5pdCBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCAqIGFzIHZsVHlwZSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxWYWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlJztcbmltcG9ydCAqIGFzIHZsVXRpbCBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgYmluID0gdmxCaW47XG5leHBvcnQgY29uc3QgY2hhbm5lbCA9IHZsQ2hhbm5lbDtcbmV4cG9ydCBjb25zdCBjb21waWxlID0gdmxDb21waWxlLmNvbXBpbGU7XG5leHBvcnQgY29uc3QgZGF0YSA9IHZsRGF0YTtcbmV4cG9ydCBjb25zdCBlbmNvZGluZyA9IHZsRW5jb2Rpbmc7XG5leHBvcnQgY29uc3QgZmllbGREZWYgPSB2bEZpZWxkRGVmO1xuZXhwb3J0IGNvbnN0IHNjaGVtYSA9IHZsU2NoZW1hO1xuZXhwb3J0IGNvbnN0IHNob3J0aGFuZCA9IHZsU2hvcnRoYW5kO1xuZXhwb3J0IGNvbnN0IHNwZWMgPSB2bFNwZWM7XG5leHBvcnQgY29uc3QgdGltZVVuaXQgPSB2bFRpbWVVbml0O1xuZXhwb3J0IGNvbnN0IHR5cGUgPSB2bFR5cGU7XG5leHBvcnQgY29uc3QgdXRpbCA9IHZsVXRpbDtcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHZsVmFsaWRhdGU7XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJ19fVkVSU0lPTl9fJztcbiJdfQ==
