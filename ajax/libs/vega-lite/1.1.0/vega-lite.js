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

},{"./util":64}],15:[function(require,module,exports){
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
    var fieldTitle = fielddef_1.title(model.fieldDef(channel), model.config());
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

},{"../axis":12,"../channel":14,"../fielddef":52,"../type":63,"../util":64,"./common":16}],16:[function(require,module,exports){
"use strict";
var mark_1 = require('../mark');
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
    if (!p.fill && util_1.contains([mark_1.BAR, mark_1.POINT, mark_1.CIRCLE, mark_1.SQUARE], model.mark())) {
        p.fill = { value: 'transparent' };
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

},{"../channel":14,"../fielddef":52,"../mark":55,"../sort":58,"../spec":59,"../timeunit":61,"../type":63,"../util":64,"./facet":32,"./layer":33,"./unit":46}],17:[function(require,module,exports){
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

},{"../data":48,"../spec":59,"../util":64,"./common":16}],18:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var config_1 = require('../config');
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
                cfg[property] = orient(mark, encoding, config.mark);
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
function orient(mark, encoding, markConfig) {
    if (markConfig === void 0) { markConfig = {}; }
    switch (mark) {
        case mark_1.POINT:
        case mark_1.CIRCLE:
        case mark_1.SQUARE:
        case mark_1.TEXT:
            return undefined;
    }
    var xIsMeasure = fielddef_1.isMeasure(encoding.x) || fielddef_1.isMeasure(encoding.x2);
    var yIsMeasure = fielddef_1.isMeasure(encoding.y) || fielddef_1.isMeasure(encoding.y2);
    var yIsRange = encoding.y && encoding.y2;
    var xIsRange = encoding.x && encoding.x2;
    switch (mark) {
        case mark_1.TICK:
            if (xIsMeasure && !yIsMeasure) {
                return config_1.Orient.VERTICAL;
            }
            return config_1.Orient.HORIZONTAL;
        case mark_1.RULE:
            if (xIsRange) {
                return config_1.Orient.HORIZONTAL;
            }
            if (yIsRange) {
                return config_1.Orient.VERTICAL;
            }
            if (encoding.y) {
                return config_1.Orient.HORIZONTAL;
            }
            if (encoding.x) {
                return config_1.Orient.VERTICAL;
            }
            return undefined;
        case mark_1.BAR:
        case mark_1.AREA:
            if (yIsRange) {
                return config_1.Orient.VERTICAL;
            }
            if (xIsRange) {
                return config_1.Orient.HORIZONTAL;
            }
        case mark_1.LINE:
            if (xIsMeasure && !yIsMeasure) {
                return config_1.Orient.HORIZONTAL;
            }
            return config_1.Orient.VERTICAL;
    }
    console.warn('orient unimplemented for mark', mark);
    return config_1.Orient.VERTICAL;
}
exports.orient = orient;

},{"../channel":14,"../config":47,"../encoding":50,"../fielddef":52,"../mark":55,"../util":64}],19:[function(require,module,exports){
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

},{"../../bin":13,"../../channel":14,"../../fielddef":52,"../../util":64}],20:[function(require,module,exports){
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

},{"../../channel":14,"../../type":63,"../../util":64}],21:[function(require,module,exports){
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

},{"../../util":64,"./bin":19,"./colorrank":20,"./filter":22,"./formatparse":23,"./formula":24,"./nonpositivenullfilter":25,"./nullfilter":26,"./source":27,"./stackscale":28,"./summary":29,"./timeunit":30,"./timeunitdomain":31}],22:[function(require,module,exports){
"use strict";
var datetime_1 = require('../../datetime');
var fielddef_1 = require('../../fielddef');
var filter_1 = require('../../filter');
var timeunit_1 = require('../../timeunit');
var util_1 = require('../../util');
var filter;
(function (filter_2) {
    function valueExpr(v, timeUnit) {
        if (datetime_1.isDateTime(v)) {
            var expr = datetime_1.dateTimeExpr(v, true);
            return 'time(' + expr + ')';
        }
        if (timeunit_1.isSingleTimeUnit(timeUnit)) {
            var datetime = {};
            datetime[timeUnit] = v;
            var expr = datetime_1.dateTimeExpr(datetime, true);
            return 'time(' + expr + ')';
        }
        return JSON.stringify(v);
    }
    function getFilterExpression(filter) {
        if (util_1.isString(filter)) {
            return filter;
        }
        else {
            var fieldExpr = filter.timeUnit ?
                ('time(' + timeunit_1.fieldExpr(filter.timeUnit, filter.field) + ')') :
                fielddef_1.field(filter, { datum: true });
            if (filter_1.isEqualFilter(filter)) {
                return fieldExpr + '===' + valueExpr(filter.equal, filter.timeUnit);
            }
            else if (filter_1.isInFilter(filter)) {
                return 'indexof([' +
                    filter.in.map(function (v) { return valueExpr(v, filter.timeUnit); }).join(',') +
                    '], ' + fieldExpr + ') !== -1';
            }
            else if (filter_1.isRangeFilter(filter)) {
                var lower = filter.range[0];
                var upper = filter.range[1];
                if (lower !== null && upper !== null) {
                    return 'inrange(' + fieldExpr + ', ' +
                        valueExpr(lower, filter.timeUnit) + ', ' +
                        valueExpr(upper, filter.timeUnit) + ')';
                }
                else if (lower !== null) {
                    return fieldExpr + ' >= ' + lower;
                }
                else if (upper !== null) {
                    return fieldExpr + ' <= ' + upper;
                }
            }
        }
        return undefined;
    }
    filter_2.getFilterExpression = getFilterExpression;
    function parse(model) {
        var filter = model.transform().filter;
        if (util_1.isArray(filter)) {
            return '(' +
                filter.map(function (f) { return getFilterExpression(f); })
                    .filter(function (f) { return f !== undefined; })
                    .join(') && (') +
                ')';
        }
        else if (filter) {
            return getFilterExpression(filter);
        }
        return undefined;
    }
    filter_2.parse = parse;
    filter_2.parseUnit = parse;
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
    filter_2.parseFacet = parseFacet;
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
    filter_2.parseLayer = parseLayer;
    function assemble(component) {
        var filter = component.filter;
        return filter ? [{
                type: 'filter',
                test: filter
            }] : [];
    }
    filter_2.assemble = assemble;
})(filter = exports.filter || (exports.filter = {}));

},{"../../datetime":49,"../../fielddef":52,"../../filter":53,"../../timeunit":61,"../../util":64}],23:[function(require,module,exports){
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

},{"../../fielddef":52,"../../type":63,"../../util":64}],24:[function(require,module,exports){
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

},{"../../util":64}],25:[function(require,module,exports){
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

},{"../../scale":56,"../../util":64}],26:[function(require,module,exports){
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
        var transform = model.transform();
        var filterInvalid = transform.filterInvalid;
        if (filterInvalid === undefined && transform['filterNull'] !== undefined) {
            filterInvalid = transform['filterNull'];
            console.warn('filterNull is deprecated. Please use filterInvalid instead.');
        }
        return model.reduce(function (aggregator, fieldDef) {
            if (filterInvalid ||
                (filterInvalid === undefined && fieldDef.field && fieldDef.field !== '*' && DEFAULT_NULL_FILTERS[fieldDef.type])) {
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

},{"../../util":64}],27:[function(require,module,exports){
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
                sourceData.values = data.values;
                sourceData.format = { type: 'json' };
            }
            else if (data.url) {
                sourceData.url = data.url;
                var defaultExtension = /(?:\.([^.]+))?$/.exec(sourceData.url)[1];
                if (!util_1.contains(['json', 'csv', 'tsv', 'topojson'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                var dataFormat = data.format || {};
                var formatType = dataFormat.type || data['formatType'];
                sourceData.format =
                    util_1.extend({ type: formatType ? formatType : defaultExtension }, dataFormat.property ? { property: dataFormat.property } : {}, dataFormat.feature ?
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

},{"../../data":48,"../../util":64,"./bin":19,"./filter":22,"./formula":24,"./nullfilter":26,"./timeunit":30}],28:[function(require,module,exports){
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

},{"../../data":48,"../../fielddef":52}],29:[function(require,module,exports){
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

},{"../../aggregate":11,"../../data":48,"../../fielddef":52,"../../util":64}],30:[function(require,module,exports){
"use strict";
var fielddef_1 = require('../../fielddef');
var timeunit_1 = require('../../timeunit');
var type_1 = require('../../type');
var util_1 = require('../../util');
var timeUnit;
(function (timeUnit) {
    function parse(model) {
        return model.reduce(function (timeUnitComponent, fieldDef, channel) {
            if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
                var hash = fielddef_1.field(fieldDef);
                timeUnitComponent[hash] = {
                    type: 'formula',
                    field: fielddef_1.field(fieldDef),
                    expr: timeunit_1.fieldExpr(fieldDef.timeUnit, fieldDef.field)
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

},{"../../fielddef":52,"../../timeunit":61,"../../type":63,"../../util":64}],31:[function(require,module,exports){
"use strict";
var datetime_1 = require('../../datetime');
var timeunit_1 = require('../../timeunit');
var util_1 = require('../../util');
var timeUnitDomain;
(function (timeUnitDomain) {
    function parse(model) {
        return model.reduce(function (timeUnitDomainMap, fieldDef, channel) {
            if (fieldDef.timeUnit) {
                var domain = timeunit_1.rawDomain(fieldDef.timeUnit, channel);
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
            var domain = timeunit_1.rawDomain(timeUnit, null);
            if (domain) {
                var datetime = {};
                datetime[timeUnit] = 'datum.data';
                timeUnitData.push({
                    name: timeUnit,
                    values: domain,
                    transform: [{
                            type: 'formula',
                            field: 'date',
                            expr: datetime_1.dateTimeExpr(datetime)
                        }]
                });
            }
            return timeUnitData;
        }, []);
    }
    timeUnitDomain.assemble = assemble;
})(timeUnitDomain = exports.timeUnitDomain || (exports.timeUnitDomain = {}));

},{"../../datetime":49,"../../timeunit":61,"../../util":64}],32:[function(require,module,exports){
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

},{"../axis":12,"../channel":14,"../config":47,"../data":48,"../encoding":50,"../fielddef":52,"../scale":56,"../type":63,"../util":64,"./axis":15,"./common":16,"./data/data":21,"./layout":34,"./model":44,"./scale":45}],33:[function(require,module,exports){
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

},{"../config":47,"../util":64,"../vega.schema":66,"./common":16,"./data/data":21,"./layout":34,"./model":44}],34:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var data_1 = require('../data');
var scale_1 = require('../scale');
var util_1 = require('../util');
var mark_1 = require('../mark');
var timeunit_1 = require('../timeunit');
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
    var timeUnitDomain = timeUnit ? timeunit_1.rawDomain(timeUnit, channel) : null;
    return timeUnitDomain !== null ? timeUnitDomain.length :
        model.field(channel, { datum: true, prefn: 'distinct_' });
}

},{"../channel":14,"../data":48,"../mark":55,"../scale":56,"../timeunit":61,"../util":64}],35:[function(require,module,exports){
"use strict";
var channel_1 = require('../channel');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var type_1 = require('../type');
var util_1 = require('../util');
var common_1 = require('./common');
var scale_1 = require('./scale');
function parseLegendComponent(model) {
    return [channel_1.COLOR, channel_1.SIZE, channel_1.SHAPE, channel_1.OPACITY].reduce(function (legendComponent, channel) {
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
        case channel_1.OPACITY:
            return { opacity: model.scaleName(channel_1.OPACITY) };
    }
    return null;
}
function parseLegend(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    var config = model.config();
    var def = getLegendDefWithScale(model, channel);
    def.title = title(legend, fieldDef, config);
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
function title(legend, fieldDef, config) {
    if (typeof legend !== 'boolean' && legend.title) {
        return legend.title;
    }
    return fielddef_1.title(fieldDef, config);
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
        if (channel === channel_1.OPACITY) {
            delete symbols.opacity;
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

},{"../channel":14,"../fielddef":52,"../mark":55,"../type":63,"../util":64,"./common":16,"./scale":45}],36:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var config_1 = require('../../config');
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
            if (orient === config_1.Orient.HORIZONTAL) {
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
            if (orient === config_1.Orient.HORIZONTAL) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(xFieldDef, { suffix: '_end' })
                };
            }
        }
        else if (fielddef_1.isMeasure(x2FieldDef)) {
            if (orient === config_1.Orient.HORIZONTAL) {
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
            if (orient !== config_1.Orient.HORIZONTAL) {
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
            if (orient !== config_1.Orient.HORIZONTAL) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(yFieldDef, { suffix: '_end' })
                };
            }
        }
        else if (fielddef_1.isMeasure(yFieldDef)) {
            if (orient !== config_1.Orient.HORIZONTAL) {
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

},{"../../channel":14,"../../config":47,"../../fielddef":52,"../common":16}],37:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var config_1 = require('../../config');
var fielddef_1 = require('../../fielddef');
var scale_1 = require('../../scale');
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
            if (orient === config_1.Orient.HORIZONTAL) {
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
                    if (model.scale(channel_1.X).type === scale_1.ScaleType.LOG) {
                        p.x2 = { value: 0 };
                    }
                    else {
                        p.x2 = {
                            scale: model.scaleName(channel_1.X),
                            value: 0
                        };
                    }
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
            if (model.has(channel_1.SIZE) && orient !== config_1.Orient.HORIZONTAL) {
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
            p.width = model.has(channel_1.SIZE) && orient !== config_1.Orient.HORIZONTAL ? {
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
            if (orient !== config_1.Orient.HORIZONTAL) {
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
                    if (model.scale(channel_1.Y).type === scale_1.ScaleType.LOG) {
                        p.y2 = {
                            field: { group: 'height' }
                        };
                    }
                    else {
                        p.y2 = {
                            scale: model.scaleName(channel_1.Y),
                            value: 0
                        };
                    }
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
            if (model.has(channel_1.SIZE) && orient === config_1.Orient.HORIZONTAL) {
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
            p.height = model.has(channel_1.SIZE) && orient === config_1.Orient.HORIZONTAL ? {
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

},{"../../channel":14,"../../config":47,"../../fielddef":52,"../../scale":56,"../common":16}],38:[function(require,module,exports){
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
var config_1 = require('../../config');
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
        return '-' + model.field(model.config().mark.orient === config_1.Orient.HORIZONTAL ? channel_1.Y : channel_1.X, { binSuffix: '_mid' });
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

},{"../../channel":14,"../../config":47,"../../encoding":50,"../../fielddef":52,"../../mark":55,"../../scale":56,"../../util":64,"../common":16,"./area":36,"./bar":37,"./line":38,"./point":40,"./rule":41,"./text":42,"./tick":43}],40:[function(require,module,exports){
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
var config_1 = require('../../config');
var common_1 = require('../common');
var rule;
(function (rule) {
    function markType() {
        return 'rule';
    }
    rule.markType = markType;
    function properties(model) {
        var p = {};
        if (model.config().mark.orient === config_1.Orient.VERTICAL) {
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

},{"../../channel":14,"../../config":47,"../common":16}],42:[function(require,module,exports){
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

},{"../../channel":14,"../../fielddef":52,"../../type":63,"../common":16}],43:[function(require,module,exports){
"use strict";
var channel_1 = require('../../channel');
var config_1 = require('../../config');
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
        if (config.mark.orient === config_1.Orient.HORIZONTAL) {
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

},{"../../channel":14,"../../config":47,"../../fielddef":52,"../common":16}],44:[function(require,module,exports){
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

},{"../channel":14,"../encoding":50,"../fielddef":52,"../scale":56,"../util":64}],45:[function(require,module,exports){
"use strict";
var aggregate_1 = require('../aggregate');
var channel_1 = require('../channel');
var config_1 = require('../config');
var data_1 = require('../data');
var fielddef_1 = require('../fielddef');
var mark_1 = require('../mark');
var scale_1 = require('../scale');
var sort_1 = require('../sort');
var stack_1 = require('../stack');
var type_1 = require('../type');
var util_1 = require('../util');
var timeunit_1 = require('../timeunit');
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
    if (sort && (sort_1.isSortField(sort) ? sort.order : sort) === sort_1.SortOrder.DESCENDING) {
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
        if (scale && scale.type !== undefined && scale.type !== scale_1.ScaleType.ORDINAL) {
            console.warn('Channel', channel, 'does not work with scale type =', scale.type);
        }
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
                return timeunit_1.defaultScaleType(fieldDef.timeUnit);
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
        if (timeunit_1.rawDomain(fieldDef.timeUnit, channel)) {
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
    if (sort_1.isSortField(sort)) {
        return {
            op: sort.op,
            field: sort.field
        };
    }
    if (util_1.contains([sort_1.SortOrder.ASCENDING, sort_1.SortOrder.DESCENDING, undefined], sort)) {
        return true;
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
                var dimension = model.config().mark.orient === config_1.Orient.HORIZONTAL ? channel_1.Y : channel_1.X;
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
            return timeunit_1.smallestUnit(fieldDef.timeUnit);
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
        return !scale.domain && !fieldDef.bin && util_1.contains([channel_1.X, channel_1.Y], channel);
    }
    return undefined;
}
exports.zero = zero;

},{"../aggregate":11,"../channel":14,"../config":47,"../data":48,"../fielddef":52,"../mark":55,"../scale":56,"../sort":58,"../stack":60,"../timeunit":61,"../type":63,"../util":64}],46:[function(require,module,exports){
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

},{"../aggregate":11,"../channel":14,"../config":47,"../data":48,"../encoding":50,"../fielddef":52,"../mark":55,"../scale":56,"../stack":60,"../type":63,"../util":64,"./axis":15,"./common":16,"./config":18,"./data/data":21,"./layout":34,"./legend":35,"./mark/mark":39,"./model":44,"./scale":45}],47:[function(require,module,exports){
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
(function (Orient) {
    Orient[Orient["HORIZONTAL"] = 'horizontal'] = "HORIZONTAL";
    Orient[Orient["VERTICAL"] = 'vertical'] = "VERTICAL";
})(exports.Orient || (exports.Orient = {}));
var Orient = exports.Orient;
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
    countTitle: 'Number of Records',
    cell: exports.defaultCellConfig,
    mark: exports.defaultMarkConfig,
    overlay: exports.defaultOverlayConfig,
    scale: scale_1.defaultScaleConfig,
    axis: axis_1.defaultAxisConfig,
    legend: legend_1.defaultLegendConfig,
    facet: exports.defaultFacetConfig,
};

},{"./axis":12,"./legend":54,"./scale":56}],48:[function(require,module,exports){
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

},{"./type":63}],49:[function(require,module,exports){
"use strict";
var util_1 = require('./util');
function isDateTime(o) {
    return !!o.year || !!o.quarter || !!o.month || !!o.date || !!o.day ||
        !!o.hours || !!o.minutes || !!o.seconds || !!o.milliseconds;
}
exports.isDateTime = isDateTime;
exports.MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
exports.SHORT_MONTHS = exports.MONTHS.map(function (m) { return m.substr(0, 3); });
exports.DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
exports.SHORT_DAYS = exports.DAYS.map(function (d) { return d.substr(0, 3); });
function normalizeQuarter(q) {
    if (util_1.isNumber(q)) {
        return (q - 1) + '';
    }
    else {
        console.warn('Potentially invalid quarter', q);
        return q;
    }
}
function normalizeMonth(m) {
    if (util_1.isNumber(m)) {
        return (m - 1) + '';
    }
    else {
        var lowerM = m.toLowerCase();
        var monthIndex = exports.MONTHS.indexOf(lowerM);
        if (monthIndex !== -1) {
            return monthIndex + '';
        }
        var shortM = lowerM.substr(0, 3);
        var shortMonthIndex = exports.SHORT_MONTHS.indexOf(shortM);
        if (shortMonthIndex !== -1) {
            return shortMonthIndex + '';
        }
        console.warn('Potentially invalid month', m);
        return m;
    }
}
function normalizeDay(d) {
    if (util_1.isNumber(d)) {
        return (d % 7) + '';
    }
    else {
        var lowerD = d.toLowerCase();
        var dayIndex = exports.DAYS.indexOf(lowerD);
        if (dayIndex !== -1) {
            return dayIndex + '';
        }
        var shortD = lowerD.substr(0, 3);
        var shortDayIndex = exports.SHORT_DAYS.indexOf(shortD);
        if (shortDayIndex !== -1) {
            return shortDayIndex + '';
        }
        console.warn('Potentially invalid day', d);
        return d;
    }
}
function dateTimeExpr(d, normalize) {
    if (normalize === void 0) { normalize = false; }
    var units = [];
    if (normalize && d.day !== undefined) {
        for (var _i = 0, _a = ['year', 'quarter', 'month', 'date']; _i < _a.length; _i++) {
            var unit = _a[_i];
            if (d[unit] !== undefined) {
                console.warn('Dropping day from datetime', JSON.stringify(d), 'as day cannot be combined with', unit);
                d = util_1.duplicate(d);
                delete d.day;
                break;
            }
        }
    }
    if (d.year !== undefined) {
        units.push(d.year);
    }
    else if (d.day !== undefined) {
        units.push(2006);
    }
    else {
        units.push(0);
    }
    if (d.month !== undefined) {
        var month = normalize ? normalizeMonth(d.month) : d.month;
        units.push(month);
    }
    else if (d.quarter !== undefined) {
        var quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
        units.push(quarter + '*3');
    }
    else {
        units.push(0);
    }
    if (d.date !== undefined) {
        units.push(d.date);
    }
    else if (d.day !== undefined) {
        var day = normalize ? normalizeDay(d.day) : d.day;
        units.push(day + '+1');
    }
    else {
        units.push(1);
    }
    for (var _b = 0, _c = ['hours', 'minutes', 'seconds', 'milliseconds']; _b < _c.length; _b++) {
        var timeUnit = _c[_b];
        if (d[timeUnit] !== undefined) {
            units.push(d[timeUnit]);
        }
        else {
            units.push(0);
        }
    }
    return 'datetime(' + units.join(', ') + ')';
}
exports.dateTimeExpr = dateTimeExpr;

},{"./util":64}],50:[function(require,module,exports){
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

},{"./channel":14,"./util":64}],51:[function(require,module,exports){
"use strict";

},{}],52:[function(require,module,exports){
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
function count() {
    return { field: '*', aggregate: aggregate_1.AggregateOp.COUNT, type: type_1.QUANTITATIVE };
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
function title(fieldDef, config) {
    if (fieldDef.title != null) {
        return fieldDef.title;
    }
    if (isCount(fieldDef)) {
        return config.countTitle;
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

},{"./aggregate":11,"./scale":56,"./timeunit":61,"./type":63,"./util":64}],53:[function(require,module,exports){
"use strict";
var util_1 = require('./util');
function isEqualFilter(filter) {
    return filter && !!filter.field && filter.equal !== undefined;
}
exports.isEqualFilter = isEqualFilter;
function isRangeFilter(filter) {
    if (filter && !!filter.field) {
        if (util_1.isArray(filter.range) && filter.range.length === 2) {
            return true;
        }
    }
    return false;
}
exports.isRangeFilter = isRangeFilter;
function isInFilter(filter) {
    return filter && !!filter.field && util_1.isArray(filter.in);
}
exports.isInFilter = isInFilter;

},{"./util":64}],54:[function(require,module,exports){
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

},{"./aggregate":11,"./encoding":50,"./mark":55,"./timeunit":61,"./type":63}],58:[function(require,module,exports){
"use strict";
(function (SortOrder) {
    SortOrder[SortOrder["ASCENDING"] = 'ascending'] = "ASCENDING";
    SortOrder[SortOrder["DESCENDING"] = 'descending'] = "DESCENDING";
    SortOrder[SortOrder["NONE"] = 'none'] = "NONE";
})(exports.SortOrder || (exports.SortOrder = {}));
var SortOrder = exports.SortOrder;
function isSortField(sort) {
    return !!sort && !!sort['field'] && !!sort['op'];
}
exports.isSortField = isSortField;

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

},{"./channel":14,"./config":47,"./encoding":50,"./mark":55,"./stack":60,"./util":64}],60:[function(require,module,exports){
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

},{"./channel":14,"./encoding":50,"./mark":55,"./util":64}],61:[function(require,module,exports){
"use strict";
var channel_1 = require('./channel');
var datetime_1 = require('./datetime');
var scale_1 = require('./scale');
var util_1 = require('./util');
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
    TimeUnit[TimeUnit["YEARMONTHDATE"] = 'yearmonthdate'] = "YEARMONTHDATE";
    TimeUnit[TimeUnit["YEARMONTHDATEHOURS"] = 'yearmonthdatehours'] = "YEARMONTHDATEHOURS";
    TimeUnit[TimeUnit["YEARMONTHDATEHOURSMINUTES"] = 'yearmonthdatehoursminutes'] = "YEARMONTHDATEHOURSMINUTES";
    TimeUnit[TimeUnit["YEARMONTHDATEHOURSMINUTESSECONDS"] = 'yearmonthdatehoursminutesseconds'] = "YEARMONTHDATEHOURSMINUTESSECONDS";
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
exports.SINGLE_TIMEUNITS = [
    TimeUnit.YEAR,
    TimeUnit.QUARTER,
    TimeUnit.MONTH,
    TimeUnit.DAY,
    TimeUnit.DATE,
    TimeUnit.HOURS,
    TimeUnit.MINUTES,
    TimeUnit.SECONDS,
    TimeUnit.MILLISECONDS,
];
var SINGLE_TIMEUNIT_INDEX = exports.SINGLE_TIMEUNITS.reduce(function (d, timeUnit) {
    d[timeUnit] = true;
    return d;
}, {});
function isSingleTimeUnit(timeUnit) {
    return !!SINGLE_TIMEUNIT_INDEX[timeUnit];
}
exports.isSingleTimeUnit = isSingleTimeUnit;
exports.MULTI_TIMEUNITS = [
    TimeUnit.YEARQUARTER,
    TimeUnit.YEARQUARTERMONTH,
    TimeUnit.YEARMONTH,
    TimeUnit.YEARMONTHDATE,
    TimeUnit.YEARMONTHDATEHOURS,
    TimeUnit.YEARMONTHDATEHOURSMINUTES,
    TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS,
    TimeUnit.QUARTERMONTH,
    TimeUnit.HOURSMINUTES,
    TimeUnit.HOURSMINUTESSECONDS,
    TimeUnit.MINUTESSECONDS,
    TimeUnit.SECONDSMILLISECONDS,
];
var MULTI_TIMEUNIT_INDEX = exports.MULTI_TIMEUNITS.reduce(function (d, timeUnit) {
    d[timeUnit] = true;
    return d;
}, {});
function isMultiTimeUnit(timeUnit) {
    return !!MULTI_TIMEUNIT_INDEX[timeUnit];
}
exports.isMultiTimeUnit = isMultiTimeUnit;
exports.TIMEUNITS = exports.SINGLE_TIMEUNITS.concat(exports.MULTI_TIMEUNITS);
function containsTimeUnit(fullTimeUnit, timeUnit) {
    var fullTimeUnitStr = fullTimeUnit.toString();
    var timeUnitStr = timeUnit.toString();
    var index = fullTimeUnitStr.indexOf(timeUnitStr);
    return index > -1 &&
        (timeUnit !== TimeUnit.SECONDS ||
            index === 0 ||
            fullTimeUnitStr.charAt(index - 1) !== 'i');
}
exports.containsTimeUnit = containsTimeUnit;
function defaultScaleType(timeUnit) {
    switch (timeUnit) {
        case TimeUnit.HOURS:
        case TimeUnit.DAY:
        case TimeUnit.MONTH:
        case TimeUnit.QUARTER:
            return scale_1.ScaleType.ORDINAL;
    }
    return scale_1.ScaleType.TIME;
}
exports.defaultScaleType = defaultScaleType;
function fieldExpr(fullTimeUnit, field) {
    var fieldRef = 'datum.' + field;
    function func(timeUnit) {
        if (timeUnit === TimeUnit.QUARTER) {
            return 'floor(month(' + fieldRef + ')' + '/3)';
        }
        else {
            return timeUnit + '(' + fieldRef + ')';
        }
    }
    var d = exports.SINGLE_TIMEUNITS.reduce(function (_d, tu) {
        if (containsTimeUnit(fullTimeUnit, tu)) {
            _d[tu] = func(tu);
        }
        return _d;
    }, {});
    if (d.day && util_1.keys(d).length > 1) {
        console.warn('Time unit "' + fullTimeUnit + '" is not supported. We are replacing it with ', (fullTimeUnit + '').replace('day', 'date') + '.');
        delete d.day;
        d.date = func(TimeUnit.DATE);
    }
    return datetime_1.dateTimeExpr(d);
}
exports.fieldExpr = fieldExpr;
function rawDomain(timeUnit, channel) {
    if (util_1.contains([channel_1.ROW, channel_1.COLUMN, channel_1.SHAPE, channel_1.COLOR], channel)) {
        return null;
    }
    switch (timeUnit) {
        case TimeUnit.SECONDS:
            return util_1.range(0, 60);
        case TimeUnit.MINUTES:
            return util_1.range(0, 60);
        case TimeUnit.HOURS:
            return util_1.range(0, 24);
        case TimeUnit.DAY:
            return util_1.range(0, 7);
        case TimeUnit.DATE:
            return util_1.range(1, 32);
        case TimeUnit.MONTH:
            return util_1.range(0, 12);
        case TimeUnit.QUARTER:
            return [0, 3, 6, 9];
    }
    return null;
}
exports.rawDomain = rawDomain;
function smallestUnit(timeUnit) {
    if (!timeUnit) {
        return undefined;
    }
    if (containsTimeUnit(timeUnit, TimeUnit.SECONDS)) {
        return 'second';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MINUTES)) {
        return 'minute';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.HOURS)) {
        return 'hour';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.DAY) ||
        containsTimeUnit(timeUnit, TimeUnit.DATE)) {
        return 'day';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MONTH)) {
        return 'month';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.YEAR)) {
        return 'year';
    }
    return undefined;
}
exports.smallestUnit = smallestUnit;
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

},{"./channel":14,"./datetime":49,"./scale":56,"./util":64}],62:[function(require,module,exports){
"use strict";

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"datalib/src/bins/bins":3,"datalib/src/generate":4,"datalib/src/util":6,"json-stable-stringify":7}],65:[function(require,module,exports){
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

},{"./mark":55,"./util":64}],66:[function(require,module,exports){
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

},{"./util":64}],67:[function(require,module,exports){
"use strict";
exports.axis = require('./axis');
exports.aggregate = require('./aggregate');
exports.bin = require('./bin');
exports.channel = require('./channel');
exports.compile = require('./compile/compile').compile;
exports.config = require('./config');
exports.data = require('./data');
exports.datetime = require('./datetime');
exports.encoding = require('./encoding');
exports.facet = require('./facet');
exports.fieldDef = require('./fielddef');
exports.legend = require('./legend');
exports.mark = require('./mark');
exports.scale = require('./scale');
exports.shorthand = require('./shorthand');
exports.sort = require('./sort');
exports.spec = require('./spec');
exports.stack = require('./stack');
exports.timeUnit = require('./timeunit');
exports.transform = require('./transform');
exports.type = require('./type');
exports.util = require('./util');
exports.validate = require('./validate');
exports.version = '1.1.0';

},{"./aggregate":11,"./axis":12,"./bin":13,"./channel":14,"./compile/compile":17,"./config":47,"./data":48,"./datetime":49,"./encoding":50,"./facet":51,"./fielddef":52,"./legend":54,"./mark":55,"./scale":56,"./shorthand":57,"./sort":58,"./spec":59,"./stack":60,"./timeunit":61,"./transform":62,"./type":63,"./util":64,"./validate":65}]},{},[67])(67)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvdW5pdC50cyIsInNyYy9jb25maWcudHMiLCJzcmMvZGF0YS50cyIsInNyYy9kYXRldGltZS50cyIsInNyYy9lbmNvZGluZy50cyIsInNyYy9maWVsZGRlZi50cyIsInNyYy9maWx0ZXIudHMiLCJzcmMvbGVnZW5kLnRzIiwic3JjL21hcmsudHMiLCJzcmMvc2NhbGUudHMiLCJzcmMvc2hvcnRoYW5kLnRzIiwic3JjL3NvcnQudHMiLCJzcmMvc3BlYy50cyIsInNyYy9zdGFjay50cyIsInNyYy90aW1ldW5pdC50cyIsInNyYy90eXBlLnRzIiwic3JjL3V0aWwudHMiLCJzcmMvdmFsaWRhdGUudHMiLCJzcmMvdmVnYS5zY2hlbWEudHMiLCJzcmMvdmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQSxXQUFZLFdBQVc7SUFDbkIsb0NBQVMs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LEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsNkJBQW9CLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLHdC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ekIsWUFBSSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLGFBQUssV0FBVyxTQUFTLENBQUMsQ0FBQztBQUMzQixnQkFBUSxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLGlCQUFTLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFDbkMsWUFBSSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksV0FBVyxRQUFRLENBQUMsQ0FBQztBQUN6QixnQkFBUSxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBRWxDLGVBQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZScsIFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0MCA9IG5ldyBEYXRlO1xuICB2YXIgdDEgPSBuZXcgRGF0ZTtcbiAgZnVuY3Rpb24gbmV3SW50ZXJ2YWwoZmxvb3JpLCBvZmZzZXRpLCBjb3VudCwgZmllbGQpIHtcblxuICAgIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gICAgfVxuXG4gICAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICAgIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGQwID0gbmV3IERhdGUoK2RhdGUpLFxuICAgICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgICAgZmxvb3JpKGQwKSwgZmxvb3JpKGQxKSwgb2Zmc2V0aShkMSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLm9mZnNldCA9IGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgdmFyIHJhbmdlID0gW107XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgICBzdG9wID0gbmV3IERhdGUoK3N0b3ApO1xuICAgICAgc3RlcCA9IHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgICBvZmZzZXRpKHN0YXJ0LCAxKSwgZmxvb3JpKHN0YXJ0KTtcbiAgICAgIGlmIChzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICAgIHdoaWxlICgtLXN0ZXAgPj0gMCkgd2hpbGUgKG9mZnNldGkoZGF0ZSwgMSksICF0ZXN0KGRhdGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGludGVydmFsLmNvdW50ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICB0MC5zZXRUaW1lKCtzdGFydCksIHQxLnNldFRpbWUoK2VuZCk7XG4gICAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvdW50KHQwLCB0MSkpO1xuICAgICAgfTtcblxuICAgICAgaW50ZXJ2YWwuZXZlcnkgPSBmdW5jdGlvbihzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgICByZXR1cm4gIWlzRmluaXRlKHN0ZXApIHx8ICEoc3RlcCA+IDApID8gbnVsbFxuICAgICAgICAgICAgOiAhKHN0ZXAgPiAxKSA/IGludGVydmFsXG4gICAgICAgICAgICA6IGludGVydmFsLmZpbHRlcihmaWVsZFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24oZCkgeyByZXR1cm4gZmllbGQoZCkgJSBzdGVwID09PSAwOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbihkKSB7IHJldHVybiBpbnRlcnZhbC5jb3VudCgwLCBkKSAlIHN0ZXAgPT09IDA7IH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJ2YWw7XG4gIH07XG5cbiAgdmFyIG1pbGxpc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gbm9vcFxuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kIC0gc3RhcnQ7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgbWlsbGlzZWNvbmQuZXZlcnkgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGguZmxvb3Ioayk7XG4gICAgaWYgKCFpc0Zpbml0ZShrKSB8fCAhKGsgPiAwKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCEoayA+IDEpKSByZXR1cm4gbWlsbGlzZWNvbmQ7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKGRhdGUgLyBrKSAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGs7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciBtaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgc3VuZGF5ID0gd2Vla2RheSgwKTtcbiAgdmFyIG1vbmRheSA9IHdlZWtkYXkoMSk7XG4gIHZhciB0dWVzZGF5ID0gd2Vla2RheSgyKTtcbiAgdmFyIHdlZG5lc2RheSA9IHdlZWtkYXkoMyk7XG4gIHZhciB0aHVyc2RheSA9IHdlZWtkYXkoNCk7XG4gIHZhciBmcmlkYXkgPSB3ZWVrZGF5KDUpO1xuICB2YXIgc2F0dXJkYXkgPSB3ZWVrZGF5KDYpO1xuXG4gIHZhciBtb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0RGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1NlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB1dGNTdW5kYXkgPSB1dGNXZWVrZGF5KDApO1xuICB2YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbiAgdmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xuICB2YXIgdXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcbiAgdmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbiAgdmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG4gIHZhciB1dGNTYXR1cmRheSA9IHV0Y1dlZWtkYXkoNik7XG5cbiAgdmFyIHV0Y01vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENEYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDTW9udGgoKSAtIHN0YXJ0LmdldFVUQ01vbnRoKCkgKyAoZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgbWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmQucmFuZ2U7XG4gIHZhciBzZWNvbmRzID0gc2Vjb25kLnJhbmdlO1xuICB2YXIgbWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcbiAgdmFyIGhvdXJzID0gaG91ci5yYW5nZTtcbiAgdmFyIGRheXMgPSBkYXkucmFuZ2U7XG4gIHZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9uZGF5cyA9IG1vbmRheS5yYW5nZTtcbiAgdmFyIHR1ZXNkYXlzID0gdHVlc2RheS5yYW5nZTtcbiAgdmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB0aHVyc2RheXMgPSB0aHVyc2RheS5yYW5nZTtcbiAgdmFyIGZyaWRheXMgPSBmcmlkYXkucmFuZ2U7XG4gIHZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcbiAgdmFyIHdlZWtzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9udGhzID0gbW9udGgucmFuZ2U7XG4gIHZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbiAgdmFyIHV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIHZhciB1dGNNaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIHZhciB1dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xuICB2YXIgdXRjTWludXRlcyA9IHV0Y01pbnV0ZS5yYW5nZTtcbiAgdmFyIHV0Y0hvdXJzID0gdXRjSG91ci5yYW5nZTtcbiAgdmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG4gIHZhciB1dGNTdW5kYXlzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9uZGF5cyA9IHV0Y01vbmRheS5yYW5nZTtcbiAgdmFyIHV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheS5yYW5nZTtcbiAgdmFyIHV0Y0ZyaWRheXMgPSB1dGNGcmlkYXkucmFuZ2U7XG4gIHZhciB1dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZWtzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9udGhzID0gdXRjTW9udGgucmFuZ2U7XG4gIHZhciB1dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuMS4xXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZHM7XG4gIGV4cG9ydHMubWludXRlcyA9IG1pbnV0ZXM7XG4gIGV4cG9ydHMuaG91cnMgPSBob3VycztcbiAgZXhwb3J0cy5kYXlzID0gZGF5cztcbiAgZXhwb3J0cy5zdW5kYXlzID0gc3VuZGF5cztcbiAgZXhwb3J0cy5tb25kYXlzID0gbW9uZGF5cztcbiAgZXhwb3J0cy50dWVzZGF5cyA9IHR1ZXNkYXlzO1xuICBleHBvcnRzLndlZG5lc2RheXMgPSB3ZWRuZXNkYXlzO1xuICBleHBvcnRzLnRodXJzZGF5cyA9IHRodXJzZGF5cztcbiAgZXhwb3J0cy5mcmlkYXlzID0gZnJpZGF5cztcbiAgZXhwb3J0cy5zYXR1cmRheXMgPSBzYXR1cmRheXM7XG4gIGV4cG9ydHMud2Vla3MgPSB3ZWVrcztcbiAgZXhwb3J0cy5tb250aHMgPSBtb250aHM7XG4gIGV4cG9ydHMueWVhcnMgPSB5ZWFycztcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZCA9IHV0Y01pbGxpc2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IHV0Y01pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gdXRjU2Vjb25kcztcbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuICBleHBvcnRzLnV0Y0RheXMgPSB1dGNEYXlzO1xuICBleHBvcnRzLnV0Y1N1bmRheXMgPSB1dGNTdW5kYXlzO1xuICBleHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheXM7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuICBleHBvcnRzLnV0Y0ZyaWRheXMgPSB1dGNGcmlkYXlzO1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5cztcbiAgZXhwb3J0cy51dGNXZWVrcyA9IHV0Y1dlZWtzO1xuICBleHBvcnRzLnV0Y01vbnRocyA9IHV0Y01vbnRocztcbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMuc2Vjb25kID0gc2Vjb25kO1xuICBleHBvcnRzLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgZXhwb3J0cy5ob3VyID0gaG91cjtcbiAgZXhwb3J0cy5kYXkgPSBkYXk7XG4gIGV4cG9ydHMuc3VuZGF5ID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbmRheSA9IG1vbmRheTtcbiAgZXhwb3J0cy50dWVzZGF5ID0gdHVlc2RheTtcbiAgZXhwb3J0cy53ZWRuZXNkYXkgPSB3ZWRuZXNkYXk7XG4gIGV4cG9ydHMudGh1cnNkYXkgPSB0aHVyc2RheTtcbiAgZXhwb3J0cy5mcmlkYXkgPSBmcmlkYXk7XG4gIGV4cG9ydHMuc2F0dXJkYXkgPSBzYXR1cmRheTtcbiAgZXhwb3J0cy53ZWVrID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbnRoID0gbW9udGg7XG4gIGV4cG9ydHMueWVhciA9IHllYXI7XG4gIGV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG4gIGV4cG9ydHMudXRjU3VuZGF5ID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbmRheSA9IHV0Y01vbmRheTtcbiAgZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjVHVlc2RheTtcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXkgPSB1dGNXZWRuZXNkYXk7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXkgPSB1dGNUaHVyc2RheTtcbiAgZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNGcmlkYXk7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNTYXR1cmRheTtcbiAgZXhwb3J0cy51dGNXZWVrID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbnRoID0gdXRjTW9udGg7XG4gIGV4cG9ydHMudXRjWWVhciA9IHV0Y1llYXI7XG4gIGV4cG9ydHMuaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcblxufSkpOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHRpbWUgPSByZXF1aXJlKCcuLi90aW1lJyksXG4gICAgRVBTSUxPTiA9IDFlLTE1O1xuXG5mdW5jdGlvbiBiaW5zKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGRldGVybWluZSByYW5nZVxuICB2YXIgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDE1LFxuICAgICAgYmFzZSA9IG9wdC5iYXNlIHx8IDEwLFxuICAgICAgbG9nYiA9IE1hdGgubG9nKGJhc2UpLFxuICAgICAgZGl2ID0gb3B0LmRpdiB8fCBbNSwgMl0sXG4gICAgICBtaW4gPSBvcHQubWluLFxuICAgICAgbWF4ID0gb3B0Lm1heCxcbiAgICAgIHNwYW4gPSBtYXggLSBtaW4sXG4gICAgICBzdGVwLCBsZXZlbCwgbWluc3RlcCwgcHJlY2lzaW9uLCB2LCBpLCBlcHM7XG5cbiAgaWYgKG9wdC5zdGVwKSB7XG4gICAgLy8gaWYgc3RlcCBzaXplIGlzIGV4cGxpY2l0bHkgZ2l2ZW4sIHVzZSB0aGF0XG4gICAgc3RlcCA9IG9wdC5zdGVwO1xuICB9IGVsc2UgaWYgKG9wdC5zdGVwcykge1xuICAgIC8vIGlmIHByb3ZpZGVkLCBsaW1pdCBjaG9pY2UgdG8gYWNjZXB0YWJsZSBzdGVwIHNpemVzXG4gICAgc3RlcCA9IG9wdC5zdGVwc1tNYXRoLm1pbihcbiAgICAgIG9wdC5zdGVwcy5sZW5ndGggLSAxLFxuICAgICAgYmlzZWN0KG9wdC5zdGVwcywgc3Bhbi9tYXhiLCAwLCBvcHQuc3RlcHMubGVuZ3RoKVxuICAgICldO1xuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdXNlIHNwYW4gdG8gZGV0ZXJtaW5lIHN0ZXAgc2l6ZVxuICAgIGxldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nKG1heGIpIC8gbG9nYik7XG4gICAgbWluc3RlcCA9IG9wdC5taW5zdGVwIHx8IDA7XG4gICAgc3RlcCA9IE1hdGgubWF4KFxuICAgICAgbWluc3RlcCxcbiAgICAgIE1hdGgucG93KGJhc2UsIE1hdGgucm91bmQoTWF0aC5sb2coc3BhbikgLyBsb2diKSAtIGxldmVsKVxuICAgICk7XG5cbiAgICAvLyBpbmNyZWFzZSBzdGVwIHNpemUgaWYgdG9vIG1hbnkgYmluc1xuICAgIHdoaWxlIChNYXRoLmNlaWwoc3Bhbi9zdGVwKSA+IG1heGIpIHsgc3RlcCAqPSBiYXNlOyB9XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBkYXRlIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIHVuaXRzID0gb3B0LnV0YyA/IHRpbWUudXRjIDogdGltZSxcbiAgICAgIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBnZW4gPSBtb2R1bGUuZXhwb3J0cztcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluID09PSB1bmRlZmluZWQgPyAxIDogbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPCBtaW4gPyAwIDogeCA+IG1heCA/IDEgOiAoeCAtIG1pbikgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IG1pbiArIHAqZCA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICBiID0gYTtcbiAgICBhID0gMDtcbiAgfVxuICB2YXIgZCA9IGIgLSBhO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihkICogTWF0aC5yYW5kb20oKSk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID09PSBNYXRoLmZsb29yKHgpICYmIHggPj0gYSAmJiB4IDwgYikgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgdiA9IE1hdGguZmxvb3IoeCk7XG4gICAgcmV0dXJuIHYgPCBhID8gMCA6IHYgPj0gYiA/IDEgOiAodiAtIGEgKyAxKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gYSAtIDEgKyBNYXRoLmZsb29yKHAqZCkgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ub3JtYWwgPSBmdW5jdGlvbihtZWFuLCBzdGRldikge1xuICBtZWFuID0gbWVhbiB8fCAwO1xuICBzdGRldiA9IHN0ZGV2IHx8IDE7XG4gIHZhciBuZXh0O1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gMCwgeSA9IDAsIHJkcywgYztcbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4ID0gbmV4dDtcbiAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgZG8ge1xuICAgICAgeCA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgcmRzID0geCp4ICsgeSp5O1xuICAgIH0gd2hpbGUgKHJkcyA9PT0gMCB8fCByZHMgPiAxKTtcbiAgICBjID0gTWF0aC5zcXJ0KC0yKk1hdGgubG9nKHJkcykvcmRzKTsgLy8gQm94LU11bGxlciB0cmFuc2Zvcm1cbiAgICBuZXh0ID0gbWVhbiArIHkqYypzdGRldjtcbiAgICByZXR1cm4gbWVhbiArIHgqYypzdGRldjtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZXhwID0gTWF0aC5leHAoTWF0aC5wb3coeC1tZWFuLCAyKSAvICgtMiAqIE1hdGgucG93KHN0ZGV2LCAyKSkpO1xuICAgIHJldHVybiAoMSAvIChzdGRldiAqIE1hdGguc3FydCgyKk1hdGguUEkpKSkgKiBleHA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gZnJvbSBXZXN0ICgyMDA5KVxuICAgIC8vIEJldHRlciBBcHByb3hpbWF0aW9ucyB0byBDdW11bGF0aXZlIE5vcm1hbCBGdW5jdGlvbnNcbiAgICB2YXIgY2QsXG4gICAgICAgIHogPSAoeCAtIG1lYW4pIC8gc3RkZXYsXG4gICAgICAgIFogPSBNYXRoLmFicyh6KTtcbiAgICBpZiAoWiA+IDM3KSB7XG4gICAgICBjZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdW0sIGV4cCA9IE1hdGguZXhwKC1aKlovMik7XG4gICAgICBpZiAoWiA8IDcuMDcxMDY3ODExODY1NDcpIHtcbiAgICAgICAgc3VtID0gMy41MjYyNDk2NTk5ODkxMWUtMDIgKiBaICsgMC43MDAzODMwNjQ0NDM2ODg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2LjM3Mzk2MjIwMzUzMTY1O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMzMuOTEyODY2MDc4MzgzO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTEyLjA3OTI5MTQ5Nzg3MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMS4yMTM1OTYxNjk5MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjAuMjA2ODY3OTEyMzc2O1xuICAgICAgICBjZCA9IGV4cCAqIHN1bTtcbiAgICAgICAgc3VtID0gOC44Mzg4MzQ3NjQ4MzE4NGUtMDIgKiBaICsgMS43NTU2NjcxNjMxODI2NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDE2LjA2NDE3NzU3OTIwNztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDg2Ljc4MDczMjIwMjk0NjE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyOTYuNTY0MjQ4Nzc5Njc0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNjM3LjMzMzYzMzM3ODgzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDc5My44MjY1MTI1MTk5NDg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA0NDAuNDEzNzM1ODI0NzUyO1xuICAgICAgICBjZCA9IGNkIC8gc3VtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtID0gWiArIDAuNjU7XG4gICAgICAgIHN1bSA9IFogKyA0IC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMyAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDIgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAxIC8gc3VtO1xuICAgICAgICBjZCA9IGV4cCAvIHN1bSAvIDIuNTA2NjI4Mjc0NjMxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geiA+IDAgPyAxIC0gY2QgOiBjZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gb2YgUHJvYml0IGZ1bmN0aW9uIHVzaW5nIGludmVyc2UgZXJyb3IgZnVuY3Rpb24uXG4gICAgaWYgKHAgPD0gMCB8fCBwID49IDEpIHJldHVybiBOYU47XG4gICAgdmFyIHggPSAyKnAgLSAxLFxuICAgICAgICB2ID0gKDggKiAoTWF0aC5QSSAtIDMpKSAvICgzICogTWF0aC5QSSAqICg0LU1hdGguUEkpKSxcbiAgICAgICAgYSA9ICgyIC8gKE1hdGguUEkqdikpICsgKE1hdGgubG9nKDEgLSBNYXRoLnBvdyh4LDIpKSAvIDIpLFxuICAgICAgICBiID0gTWF0aC5sb2coMSAtICh4KngpKSAvIHYsXG4gICAgICAgIHMgPSAoeCA+IDAgPyAxIDogLTEpICogTWF0aC5zcXJ0KE1hdGguc3FydCgoYSphKSAtIGIpIC0gYSk7XG4gICAgcmV0dXJuIG1lYW4gKyBzdGRldiAqIE1hdGguU1FSVDIgKiBzO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uYm9vdHN0cmFwID0gZnVuY3Rpb24oZG9tYWluLCBzbW9vdGgpIHtcbiAgLy8gR2VuZXJhdGVzIGEgYm9vdHN0cmFwIHNhbXBsZSBmcm9tIGEgc2V0IG9mIG9ic2VydmF0aW9ucy5cbiAgLy8gU21vb3RoIGJvb3RzdHJhcHBpbmcgYWRkcyByYW5kb20gemVyby1jZW50ZXJlZCBub2lzZSB0byB0aGUgc2FtcGxlcy5cbiAgdmFyIHZhbCA9IGRvbWFpbi5maWx0ZXIodXRpbC5pc1ZhbGlkKSxcbiAgICAgIGxlbiA9IHZhbC5sZW5ndGgsXG4gICAgICBlcnIgPSBzbW9vdGggPyBnZW4ucmFuZG9tLm5vcm1hbCgwLCBzbW9vdGgpIDogbnVsbDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsW35+KE1hdGgucmFuZG9tKCkqbGVuKV0gKyAoZXJyID8gZXJyKCkgOiAwKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIGQzX3RpbWUgPSByZXF1aXJlKCdkMy10aW1lJyk7XG5cbnZhciB0ZW1wRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgYmFzZURhdGUgPSBuZXcgRGF0ZSgwLCAwLCAxKS5zZXRGdWxsWWVhcigwKSwgLy8gSmFuIDEsIDAgQURcbiAgICB1dGNCYXNlRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDAsIDAsIDEpKS5zZXRVVENGdWxsWWVhcigwKTtcblxuZnVuY3Rpb24gZGF0ZShkKSB7XG4gIHJldHVybiAodGVtcERhdGUuc2V0VGltZSgrZCksIHRlbXBEYXRlKTtcbn1cblxuLy8gY3JlYXRlIGEgdGltZSB1bml0IGVudHJ5XG5mdW5jdGlvbiBlbnRyeSh0eXBlLCBkYXRlLCB1bml0LCBzdGVwLCBtaW4sIG1heCkge1xuICB2YXIgZSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGU6IGRhdGUsXG4gICAgdW5pdDogdW5pdFxuICB9O1xuICBpZiAoc3RlcCkge1xuICAgIGUuc3RlcCA9IHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgZS5taW5zdGVwID0gMTtcbiAgfVxuICBpZiAobWluICE9IG51bGwpIGUubWluID0gbWluO1xuICBpZiAobWF4ICE9IG51bGwpIGUubWF4ID0gbWF4O1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIHVuaXQsIGJhc2UsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBlbnRyeSh0eXBlLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQub2Zmc2V0KGJhc2UsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQuY291bnQoYmFzZSwgZCk7IH0sXG4gICAgc3RlcCwgbWluLCBtYXgpO1xufVxuXG52YXIgbG9jYWxlID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUuc2Vjb25kLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS5taW51dGUsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLmhvdXIsICAgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUuZGF5LCAgICBiYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLm1vbnRoLCAgYmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS55ZWFyLCAgIGJhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgNCtkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgZCAlIDEyLCAxKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgdXRjID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUudXRjU2Vjb25kLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS51dGNNaW51dGUsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLnV0Y0hvdXIsICAgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUudXRjRGF5LCAgICB1dGNCYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLnV0Y01vbnRoLCAgdXRjQmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS51dGNZZWFyLCAgIHV0Y0Jhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDU2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgNCtkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCBkICUgMTIsIDEpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgU1RFUFMgPSBbXG4gIFszMTUzNmU2LCA1XSwgIC8vIDEteWVhclxuICBbNzc3NmU2LCA0XSwgICAvLyAzLW1vbnRoXG4gIFsyNTkyZTYsIDRdLCAgIC8vIDEtbW9udGhcbiAgWzEyMDk2ZTUsIDNdLCAgLy8gMi13ZWVrXG4gIFs2MDQ4ZTUsIDNdLCAgIC8vIDEtd2Vla1xuICBbMTcyOGU1LCAzXSwgICAvLyAyLWRheVxuICBbODY0ZTUsIDNdLCAgICAvLyAxLWRheVxuICBbNDMyZTUsIDJdLCAgICAvLyAxMi1ob3VyXG4gIFsyMTZlNSwgMl0sICAgIC8vIDYtaG91clxuICBbMTA4ZTUsIDJdLCAgICAvLyAzLWhvdXJcbiAgWzM2ZTUsIDJdLCAgICAgLy8gMS1ob3VyXG4gIFsxOGU1LCAxXSwgICAgIC8vIDMwLW1pbnV0ZVxuICBbOWU1LCAxXSwgICAgICAvLyAxNS1taW51dGVcbiAgWzNlNSwgMV0sICAgICAgLy8gNS1taW51dGVcbiAgWzZlNCwgMV0sICAgICAgLy8gMS1taW51dGVcbiAgWzNlNCwgMF0sICAgICAgLy8gMzAtc2Vjb25kXG4gIFsxNWUzLCAwXSwgICAgIC8vIDE1LXNlY29uZFxuICBbNWUzLCAwXSwgICAgICAvLyA1LXNlY29uZFxuICBbMWUzLCAwXSAgICAgICAvLyAxLXNlY29uZFxuXTtcblxuZnVuY3Rpb24gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yikge1xuICB2YXIgc3RlcCA9IFNURVBTWzBdLCBpLCBuLCBiaW5zO1xuXG4gIGZvciAoaT0xLCBuPVNURVBTLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdGVwID0gU1RFUFNbaV07XG4gICAgaWYgKHNwYW4gPiBzdGVwWzBdKSB7XG4gICAgICBiaW5zID0gc3BhbiAvIHN0ZXBbMF07XG4gICAgICBpZiAoYmlucyA+IG1heGIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW1NURVBTW2ktMV1bMV1dO1xuICAgICAgfVxuICAgICAgaWYgKGJpbnMgPj0gbWluYikge1xuICAgICAgICByZXR1cm4gdW5pdHNbc3RlcFsxXV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bml0c1tTVEVQU1tuLTFdWzFdXTtcbn1cblxuZnVuY3Rpb24gdG9Vbml0TWFwKHVuaXRzKSB7XG4gIHZhciBtYXAgPSB7fSwgaSwgbjtcbiAgZm9yIChpPTAsIG49dW5pdHMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIG1hcFt1bml0c1tpXS50eXBlXSA9IHVuaXRzW2ldO1xuICB9XG4gIG1hcC5maW5kID0gZnVuY3Rpb24oc3BhbiwgbWluYiwgbWF4Yikge1xuICAgIHJldHVybiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKTtcbiAgfTtcbiAgcmV0dXJuIG1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1VuaXRNYXAobG9jYWxlKTtcbm1vZHVsZS5leHBvcnRzLnV0YyA9IHRvVW5pdE1hcCh1dGMpOyIsInZhciB1ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Lmxlbmd0aCAhPSBudWxsID8geC5sZW5ndGggOiBudWxsO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCwgZikge1xuICByZXR1cm4gKGYgPSB1LiQoZikpID9cbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbZih4KV0gPSAxLCBvYmopOyB9LCB7fSkgOlxuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialt4XSA9IDEsIG9iaik7IH0sIHt9KTtcbn07XG5cbnUua2V5c3RyID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIC8vIHVzZSB0byBlbnN1cmUgY29uc2lzdGVudCBrZXkgZ2VuZXJhdGlvbiBhY3Jvc3MgbW9kdWxlc1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGlmICghbikgcmV0dXJuICcnO1xuICBmb3IgKHZhciBzPVN0cmluZyh2YWx1ZXNbMF0pLCBpPTE7IGk8bjsgKytpKSB7XG4gICAgcyArPSAnfCcgKyBTdHJpbmcodmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbi8vIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnUuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG51LmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnUuaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbnUuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG51LmlzTnVtYmVyID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxudS5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG51LmlzRGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG51LmlzVmFsaWQgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqO1xufTtcblxudS5pc0J1ZmZlciA9ICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIEJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbi8vIHBhcnNlIGEgZGF0ZSB3aXRoIG9wdGlvbmFsIGQzLnRpbWUtZm9ybWF0IGZvcm1hdFxudS5kYXRlID0gZnVuY3Rpb24ocywgZm9ybWF0KSB7XG4gIHZhciBkID0gZm9ybWF0ID8gZm9ybWF0IDogRGF0ZTtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBkLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgfHwgdS5pc1N0cmluZyh4KSA/XG4gICAgICAvLyBPdXRwdXQgdmFsaWQgSlNPTiBhbmQgSlMgc291cmNlIHN0cmluZ3MuXG4gICAgICAvLyBTZWUgaHR0cDovL3RpbWVsZXNzcmVwby5jb20vanNvbi1pc250LWEtamF2YXNjcmlwdC1zdWJzZXRcbiAgICAgIEpTT04uc3RyaW5naWZ5KHgpLnJlcGxhY2UoJ1xcdTIwMjgnLCdcXFxcdTIwMjgnKS5yZXBsYWNlKCdcXHUyMDI5JywgJ1xcXFx1MjAyOScpXG4gICAgOiB4O1xufTtcblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnZhciBmaWVsZF9yZSA9IC9cXFsoLio/KVxcXXxbXi5cXFtdKy9nO1xuXG51LmZpZWxkID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gU3RyaW5nKGYpLm1hdGNoKGZpZWxkX3JlKS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkWzBdICE9PSAnWycgPyBkIDpcbiAgICAgIGRbMV0gIT09IFwiJ1wiICYmIGRbMV0gIT09ICdcIicgPyBkLnNsaWNlKDEsIC0xKSA6XG4gICAgICBkLnNsaWNlKDIsIC0yKS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCAnJDEnKTtcbiAgfSk7XG59O1xuXG51LmFjY2Vzc29yID0gZnVuY3Rpb24oZikge1xuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gZj09bnVsbCB8fCB1LmlzRnVuY3Rpb24oZikgPyBmIDpcbiAgICB1Lm5hbWVkZnVuYyhmLCBGdW5jdGlvbigneCcsICdyZXR1cm4geFsnICsgdS5maWVsZChmKS5tYXAodS5zdHIpLmpvaW4oJ11bJykgKyAnXTsnKSk7XG59O1xuXG4vLyBzaG9ydC1jdXQgZm9yIGFjY2Vzc29yXG51LiQgPSB1LmFjY2Vzc29yO1xuXG51Lm11dGF0b3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gdS5pc1N0cmluZyhmKSAmJiAocz11LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICBmdW5jdGlvbih4LCB2KSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8cy5sZW5ndGgtMTsgKytpKSB4ID0geFtzW2ldXTtcbiAgICAgIHhbc1tpXV0gPSB2O1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHgsIHYpIHsgeFtmXSA9IHY7IH07XG59O1xuXG5cbnUuJGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24oZikge1xuICAgIGYgPSB1LiQoZikgfHwgdS5pZGVudGl0eTtcbiAgICB2YXIgbiA9IG5hbWUgKyAodS5uYW1lKGYpID8gJ18nK3UubmFtZShmKSA6ICcnKTtcbiAgICByZXR1cm4gdS5uYW1lZGZ1bmMobiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gb3AoZihkKSk7IH0pO1xuICB9O1xufTtcblxudS4kdmFsaWQgID0gdS4kZnVuYygndmFsaWQnLCB1LmlzVmFsaWQpO1xudS4kbGVuZ3RoID0gdS4kZnVuYygnbGVuZ3RoJywgdS5sZW5ndGgpO1xuXG51LiRpbiA9IGZ1bmN0aW9uKGYsIHZhbHVlcykge1xuICBmID0gdS4kKGYpO1xuICB2YXIgbWFwID0gdS5pc0FycmF5KHZhbHVlcykgPyB1LnRvTWFwKHZhbHVlcykgOiB2YWx1ZXM7XG4gIHJldHVybiBmdW5jdGlvbihkKSB7IHJldHVybiAhIW1hcFtmKGQpXTsgfTtcbn07XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGksIG4sIGYsIGM7XG4gICAgZm9yIChpPTAsIG49c29ydC5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBmID0gc29ydFtpXTtcbiAgICAgIGMgPSB1LmNtcChmKGEpLCBmKGIpKTtcbiAgICAgIGlmIChjKSByZXR1cm4gYyAqIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiAoYSA8IGIgfHwgYSA9PSBudWxsKSAmJiBiICE9IG51bGwgPyAtMSA6XG4gICAgKGEgPiBiIHx8IGIgPT0gbnVsbCkgJiYgYSAhPSBudWxsID8gMSA6XG4gICAgKChiID0gYiBpbnN0YW5jZW9mIERhdGUgPyArYiA6IGIpLFxuICAgICAoYSA9IGEgaW5zdGFuY2VvZiBEYXRlID8gK2EgOiBhKSkgIT09IGEgJiYgYiA9PT0gYiA/IC0xIDpcbiAgICBiICE9PSBiICYmIGEgPT09IGEgPyAxIDogMDtcbn07XG5cbnUubnVtY21wID0gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAtIGI7IH07XG5cbnUuc3RhYmxlc29ydCA9IGZ1bmN0aW9uKGFycmF5LCBzb3J0QnksIGtleUZuKSB7XG4gIHZhciBpbmRpY2VzID0gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGlkeCwgdiwgaSkge1xuICAgIHJldHVybiAoaWR4W2tleUZuKHYpXSA9IGksIGlkeCk7XG4gIH0sIHt9KTtcblxuICBhcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgc2EgPSBzb3J0QnkoYSksXG4gICAgICAgIHNiID0gc29ydEJ5KGIpO1xuICAgIHJldHVybiBzYSA8IHNiID8gLTEgOiBzYSA+IHNiID8gMVxuICAgICAgICAgOiAoaW5kaWNlc1trZXlGbihhKV0gLSBpbmRpY2VzW2tleUZuKGIpXSk7XG4gIH0pO1xuXG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8vIHBlcm11dGVzIGFuIGFycmF5IHVzaW5nIGEgS251dGggc2h1ZmZsZVxudS5wZXJtdXRlID0gZnVuY3Rpb24oYSkge1xuICB2YXIgbSA9IGEubGVuZ3RoLFxuICAgICAgc3dhcCxcbiAgICAgIGk7XG5cbiAgd2hpbGUgKG0pIHtcbiAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcbiAgICBzd2FwID0gYVttXTtcbiAgICBhW21dID0gYVtpXTtcbiAgICBhW2ldID0gc3dhcDtcbiAgfVxufTtcblxuLy8gc3RyaW5nIGZ1bmN0aW9uc1xuXG51LnBhZCA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCBwYWRjaGFyKSB7XG4gIHBhZGNoYXIgPSBwYWRjaGFyIHx8IFwiIFwiO1xuICB2YXIgZCA9IGxlbmd0aCAtIHMubGVuZ3RoO1xuICBpZiAoZCA8PSAwKSByZXR1cm4gcztcbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBzdHJyZXAoZCwgcGFkY2hhcikgKyBzO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBzdHJyZXAoTWF0aC5mbG9vcihkLzIpLCBwYWRjaGFyKSArXG4gICAgICAgICBzICsgc3RycmVwKE1hdGguY2VpbChkLzIpLCBwYWRjaGFyKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHMgKyBzdHJyZXAoZCwgcGFkY2hhcik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0cnJlcChuLCBzdHIpIHtcbiAgdmFyIHMgPSBcIlwiLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHMgKz0gc3RyO1xuICByZXR1cm4gcztcbn1cblxudS50cnVuY2F0ZSA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCB3b3JkLCBlbGxpcHNpcykge1xuICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gIGlmIChsZW4gPD0gbGVuZ3RoKSByZXR1cm4gcztcbiAgZWxsaXBzaXMgPSBlbGxpcHNpcyAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKGVsbGlwc2lzKSA6ICdcXHUyMDI2JztcbiAgdmFyIGwgPSBNYXRoLm1heCgwLCBsZW5ndGggLSBlbGxpcHNpcy5sZW5ndGgpO1xuXG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCwxKSA6IHMuc2xpY2UobGVuLWwpKTtcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICB2YXIgbDEgPSBNYXRoLmNlaWwobC8yKSwgbDIgPSBNYXRoLmZsb29yKGwvMik7XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwxKSA6IHMuc2xpY2UoMCxsMSkpICtcbiAgICAgICAgZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDIsMSkgOiBzLnNsaWNlKGxlbi1sMikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwpIDogcy5zbGljZSgwLGwpKSArIGVsbGlwc2lzO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZU9uV29yZChzLCBsZW4sIHJldikge1xuICB2YXIgY250ID0gMCwgdG9rID0gcy5zcGxpdCh0cnVuY2F0ZV93b3JkX3JlKTtcbiAgaWYgKHJldikge1xuICAgIHMgPSAodG9rID0gdG9rLnJldmVyc2UoKSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KVxuICAgICAgLnJldmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBzID0gdG9rLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pO1xuICB9XG4gIHJldHVybiBzLmxlbmd0aCA/IHMuam9pbignJykudHJpbSgpIDogdG9rWzBdLnNsaWNlKDAsIGxlbik7XG59XG5cbnZhciB0cnVuY2F0ZV93b3JkX3JlID0gLyhbXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTIwMjhcXHUyMDI5XFx1MzAwMFxcdUZFRkZdKS87XG4iLCJ2YXIganNvbiA9IHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJyA/IEpTT04gOiByZXF1aXJlKCdqc29uaWZ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykgb3B0cyA9IHsgY21wOiBvcHRzIH07XG4gICAgdmFyIHNwYWNlID0gb3B0cy5zcGFjZSB8fCAnJztcbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykgc3BhY2UgPSBBcnJheShzcGFjZSsxKS5qb2luKCcgJyk7XG4gICAgdmFyIGN5Y2xlcyA9ICh0eXBlb2Ygb3B0cy5jeWNsZXMgPT09ICdib29sZWFuJykgPyBvcHRzLmN5Y2xlcyA6IGZhbHNlO1xuICAgIHZhciByZXBsYWNlciA9IG9wdHMucmVwbGFjZXIgfHwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiAgICB2YXIgY21wID0gb3B0cy5jbXAgJiYgKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFvYmogPSB7IGtleTogYSwgdmFsdWU6IG5vZGVbYV0gfTtcbiAgICAgICAgICAgICAgICB2YXIgYm9iaiA9IHsga2V5OiBiLCB2YWx1ZTogbm9kZVtiXSB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmKGFvYmosIGJvYmopO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KShvcHRzLmNtcCk7XG5cbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIHJldHVybiAoZnVuY3Rpb24gc3RyaW5naWZ5IChwYXJlbnQsIGtleSwgbm9kZSwgbGV2ZWwpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHNwYWNlID8gKCdcXG4nICsgbmV3IEFycmF5KGxldmVsICsgMSkuam9pbihzcGFjZSkpIDogJyc7XG4gICAgICAgIHZhciBjb2xvblNlcGFyYXRvciA9IHNwYWNlID8gJzogJyA6ICc6JztcblxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLnRvSlNPTiAmJiB0eXBlb2Ygbm9kZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnRvSlNPTigpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IHJlcGxhY2VyLmNhbGwocGFyZW50LCBrZXksIG5vZGUpO1xuXG4gICAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnIHx8IG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uLnN0cmluZ2lmeShub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBzdHJpbmdpZnkobm9kZSwgaSwgbm9kZVtpXSwgbGV2ZWwrMSkgfHwganNvbi5zdHJpbmdpZnkobnVsbCk7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goaW5kZW50ICsgc3BhY2UgKyBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnWycgKyBvdXQuam9pbignLCcpICsgaW5kZW50ICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlZW4uaW5kZXhPZihub2RlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3ljbGVzKSByZXR1cm4ganNvbi5zdHJpbmdpZnkoJ19fY3ljbGVfXycpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbnZlcnRpbmcgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEpTT04nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugc2Vlbi5wdXNoKG5vZGUpO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IG9iamVjdEtleXMobm9kZSkuc29ydChjbXAgJiYgY21wKG5vZGUpKTtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0cmluZ2lmeShub2RlLCBrZXksIG5vZGVba2V5XSwgbGV2ZWwrMSk7XG5cbiAgICAgICAgICAgICAgICBpZighdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleVZhbHVlID0ganNvbi5zdHJpbmdpZnkoa2V5KVxuICAgICAgICAgICAgICAgICAgICArIGNvbG9uU2VwYXJhdG9yXG4gICAgICAgICAgICAgICAgICAgICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsga2V5VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vlbi5zcGxpY2Uoc2Vlbi5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAneycgKyBvdXQuam9pbignLCcpICsgaW5kZW50ICsgJ30nO1xuICAgICAgICB9XG4gICAgfSkoeyAnJzogb2JqIH0sICcnLCBvYmosIDApO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlIH07XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn07XG4iLCJleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcbmV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9saWIvc3RyaW5naWZ5Jyk7XG4iLCJ2YXIgYXQsIC8vIFRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBjaGFyYWN0ZXJcbiAgICBjaCwgLy8gVGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgZXNjYXBlZSA9IHtcbiAgICAgICAgJ1wiJzogICdcIicsXG4gICAgICAgICdcXFxcJzogJ1xcXFwnLFxuICAgICAgICAnLyc6ICAnLycsXG4gICAgICAgIGI6ICAgICdcXGInLFxuICAgICAgICBmOiAgICAnXFxmJyxcbiAgICAgICAgbjogICAgJ1xcbicsXG4gICAgICAgIHI6ICAgICdcXHInLFxuICAgICAgICB0OiAgICAnXFx0J1xuICAgIH0sXG4gICAgdGV4dCxcblxuICAgIGVycm9yID0gZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgLy8gQ2FsbCBlcnJvciB3aGVuIHNvbWV0aGluZyBpcyB3cm9uZy5cbiAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgbmFtZTogICAgJ1N5bnRheEVycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG0sXG4gICAgICAgICAgICBhdDogICAgICBhdCxcbiAgICAgICAgICAgIHRleHQ6ICAgIHRleHRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIFxuICAgIG5leHQgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAvLyBJZiBhIGMgcGFyYW1ldGVyIGlzIHByb3ZpZGVkLCB2ZXJpZnkgdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IGNoYXJhY3Rlci5cbiAgICAgICAgaWYgKGMgJiYgYyAhPT0gY2gpIHtcbiAgICAgICAgICAgIGVycm9yKFwiRXhwZWN0ZWQgJ1wiICsgYyArIFwiJyBpbnN0ZWFkIG9mICdcIiArIGNoICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXG4gICAgICAgIC8vIHJldHVybiB0aGUgZW1wdHkgc3RyaW5nLlxuICAgICAgICBcbiAgICAgICAgY2ggPSB0ZXh0LmNoYXJBdChhdCk7XG4gICAgICAgIGF0ICs9IDE7XG4gICAgICAgIHJldHVybiBjaDtcbiAgICB9LFxuICAgIFxuICAgIG51bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gUGFyc2UgYSBudW1iZXIgdmFsdWUuXG4gICAgICAgIHZhciBudW1iZXIsXG4gICAgICAgICAgICBzdHJpbmcgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmIChjaCA9PT0gJy0nKSB7XG4gICAgICAgICAgICBzdHJpbmcgPSAnLSc7XG4gICAgICAgICAgICBuZXh0KCctJyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgc3RyaW5nICs9ICcuJztcbiAgICAgICAgICAgIHdoaWxlIChuZXh0KCkgJiYgY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPT09ICdlJyB8fCBjaCA9PT0gJ0UnKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXIgPSArc3RyaW5nO1xuICAgICAgICBpZiAoIWlzRmluaXRlKG51bWJlcikpIHtcbiAgICAgICAgICAgIGVycm9yKFwiQmFkIG51bWJlclwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIHN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gUGFyc2UgYSBzdHJpbmcgdmFsdWUuXG4gICAgICAgIHZhciBoZXgsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgc3RyaW5nID0gJycsXG4gICAgICAgICAgICB1ZmZmZjtcbiAgICAgICAgXG4gICAgICAgIC8vIFdoZW4gcGFyc2luZyBmb3Igc3RyaW5nIHZhbHVlcywgd2UgbXVzdCBsb29rIGZvciBcIiBhbmQgXFwgY2hhcmFjdGVycy5cbiAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd1Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWZmZmYgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCA9IHBhcnNlSW50KG5leHQoKSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoaGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWZmZmYgPSB1ZmZmZiAqIDE2ICsgaGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodWZmZmYpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlc2NhcGVlW2NoXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBlc2NhcGVlW2NoXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBzdHJpbmdcIik7XG4gICAgfSxcblxuICAgIHdoaXRlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBTa2lwIHdoaXRlc3BhY2UuXG5cbiAgICAgICAgd2hpbGUgKGNoICYmIGNoIDw9ICcgJykge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdvcmQgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxuXG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICBuZXh0KCd0Jyk7XG4gICAgICAgICAgICBuZXh0KCdyJyk7XG4gICAgICAgICAgICBuZXh0KCd1Jyk7XG4gICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICBuZXh0KCdmJyk7XG4gICAgICAgICAgICBuZXh0KCdhJyk7XG4gICAgICAgICAgICBuZXh0KCdsJyk7XG4gICAgICAgICAgICBuZXh0KCdzJyk7XG4gICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgbmV4dCgnbicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJVbmV4cGVjdGVkICdcIiArIGNoICsgXCInXCIpO1xuICAgIH0sXG5cbiAgICB2YWx1ZSwgIC8vIFBsYWNlIGhvbGRlciBmb3IgdGhlIHZhbHVlIGZ1bmN0aW9uLlxuXG4gICAgYXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGFuIGFycmF5IHZhbHVlLlxuXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ1snKSB7XG4gICAgICAgICAgICBuZXh0KCdbJyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCddJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5OyAgIC8vIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2gpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoJywnKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiQmFkIGFycmF5XCIpO1xuICAgIH0sXG5cbiAgICBvYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGFuIG9iamVjdCB2YWx1ZS5cblxuICAgICAgICB2YXIga2V5LFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG5cbiAgICAgICAgaWYgKGNoID09PSAneycpIHtcbiAgICAgICAgICAgIG5leHQoJ3snKTtcbiAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICd9Jykge1xuICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0OyAgIC8vIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgICBuZXh0KCc6Jyk7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcignRHVwbGljYXRlIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZSgpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgnfScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBvYmplY3RcIik7XG4gICAgfTtcblxudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGEgSlNPTiB2YWx1ZS4gSXQgY291bGQgYmUgYW4gb2JqZWN0LCBhbiBhcnJheSwgYSBzdHJpbmcsIGEgbnVtYmVyLFxuLy8gb3IgYSB3b3JkLlxuXG4gICAgd2hpdGUoKTtcbiAgICBzd2l0Y2ggKGNoKSB7XG4gICAgY2FzZSAneyc6XG4gICAgICAgIHJldHVybiBvYmplY3QoKTtcbiAgICBjYXNlICdbJzpcbiAgICAgICAgcmV0dXJuIGFycmF5KCk7XG4gICAgY2FzZSAnXCInOlxuICAgICAgICByZXR1cm4gc3RyaW5nKCk7XG4gICAgY2FzZSAnLSc6XG4gICAgICAgIHJldHVybiBudW1iZXIoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gY2ggPj0gJzAnICYmIGNoIDw9ICc5JyA/IG51bWJlcigpIDogd29yZCgpO1xuICAgIH1cbn07XG5cbi8vIFJldHVybiB0aGUganNvbl9wYXJzZSBmdW5jdGlvbi4gSXQgd2lsbCBoYXZlIGFjY2VzcyB0byBhbGwgb2YgdGhlIGFib3ZlXG4vLyBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlcy5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc291cmNlLCByZXZpdmVyKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBcbiAgICB0ZXh0ID0gc291cmNlO1xuICAgIGF0ID0gMDtcbiAgICBjaCA9ICcgJztcbiAgICByZXN1bHQgPSB2YWx1ZSgpO1xuICAgIHdoaXRlKCk7XG4gICAgaWYgKGNoKSB7XG4gICAgICAgIGVycm9yKFwiU3ludGF4IGVycm9yXCIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcmV2aXZlciBmdW5jdGlvbiwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSxcbiAgICAvLyBwYXNzaW5nIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIHRoZSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZVxuICAgIC8vIHRyYW5zZm9ybWF0aW9uLCBzdGFydGluZyB3aXRoIGEgdGVtcG9yYXJ5IHJvb3Qgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHJlc3VsdFxuICAgIC8vIGluIGFuIGVtcHR5IGtleS4gSWYgdGhlcmUgaXMgbm90IGEgcmV2aXZlciBmdW5jdGlvbiwgd2Ugc2ltcGx5IHJldHVybiB0aGVcbiAgICAvLyByZXN1bHQuXG5cbiAgICByZXR1cm4gdHlwZW9mIHJldml2ZXIgPT09ICdmdW5jdGlvbicgPyAoZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9KHsnJzogcmVzdWx0fSwgJycpKSA6IHJlc3VsdDtcbn07XG4iLCJ2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBlc2NhcGFibGUgPSAvW1xcXFxcXFwiXFx4MDAtXFx4MWZcXHg3Zi1cXHg5ZlxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgIGdhcCxcbiAgICBpbmRlbnQsXG4gICAgbWV0YSA9IHsgICAgLy8gdGFibGUgb2YgY2hhcmFjdGVyIHN1YnN0aXR1dGlvbnNcbiAgICAgICAgJ1xcYic6ICdcXFxcYicsXG4gICAgICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICAgICAnXFxuJzogJ1xcXFxuJyxcbiAgICAgICAgJ1xcZic6ICdcXFxcZicsXG4gICAgICAgICdcXHInOiAnXFxcXHInLFxuICAgICAgICAnXCInIDogJ1xcXFxcIicsXG4gICAgICAgICdcXFxcJzogJ1xcXFxcXFxcJ1xuICAgIH0sXG4gICAgcmVwO1xuXG5mdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgc3RyaW5nIGNvbnRhaW5zIG5vIGNvbnRyb2wgY2hhcmFjdGVycywgbm8gcXVvdGUgY2hhcmFjdGVycywgYW5kIG5vXG4gICAgLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbiAgICAvLyBPdGhlcndpc2Ugd2UgbXVzdCBhbHNvIHJlcGxhY2UgdGhlIG9mZmVuZGluZyBjaGFyYWN0ZXJzIHdpdGggc2FmZSBlc2NhcGVcbiAgICAvLyBzZXF1ZW5jZXMuXG4gICAgXG4gICAgZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIGVzY2FwYWJsZS50ZXN0KHN0cmluZykgPyAnXCInICsgc3RyaW5nLnJlcGxhY2UoZXNjYXBhYmxlLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYyA9IG1ldGFbYV07XG4gICAgICAgIHJldHVybiB0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBjIDpcbiAgICAgICAgICAgICdcXFxcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgIH0pICsgJ1wiJyA6ICdcIicgKyBzdHJpbmcgKyAnXCInO1xufVxuXG5mdW5jdGlvbiBzdHIoa2V5LCBob2xkZXIpIHtcbiAgICAvLyBQcm9kdWNlIGEgc3RyaW5nIGZyb20gaG9sZGVyW2tleV0uXG4gICAgdmFyIGksICAgICAgICAgIC8vIFRoZSBsb29wIGNvdW50ZXIuXG4gICAgICAgIGssICAgICAgICAgIC8vIFRoZSBtZW1iZXIga2V5LlxuICAgICAgICB2LCAgICAgICAgICAvLyBUaGUgbWVtYmVyIHZhbHVlLlxuICAgICAgICBsZW5ndGgsXG4gICAgICAgIG1pbmQgPSBnYXAsXG4gICAgICAgIHBhcnRpYWwsXG4gICAgICAgIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgXG4gICAgLy8gSWYgdGhlIHZhbHVlIGhhcyBhIHRvSlNPTiBtZXRob2QsIGNhbGwgaXQgdG8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KTtcbiAgICB9XG4gICAgXG4gICAgLy8gSWYgd2Ugd2VyZSBjYWxsZWQgd2l0aCBhIHJlcGxhY2VyIGZ1bmN0aW9uLCB0aGVuIGNhbGwgdGhlIHJlcGxhY2VyIHRvXG4gICAgLy8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG4gICAgaWYgKHR5cGVvZiByZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSByZXAuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICAvLyBXaGF0IGhhcHBlbnMgbmV4dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSdzIHR5cGUuXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBxdW90ZSh2YWx1ZSk7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBFbmNvZGUgbm9uLWZpbml0ZSBudW1iZXJzIGFzIG51bGwuXG4gICAgICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6ICdudWxsJztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4gb3IgbnVsbCwgY29udmVydCBpdCB0byBhIHN0cmluZy4gTm90ZTpcbiAgICAgICAgICAgIC8vIHR5cGVvZiBudWxsIGRvZXMgbm90IHByb2R1Y2UgJ251bGwnLiBUaGUgY2FzZSBpcyBpbmNsdWRlZCBoZXJlIGluXG4gICAgICAgICAgICAvLyB0aGUgcmVtb3RlIGNoYW5jZSB0aGF0IHRoaXMgZ2V0cyBmaXhlZCBzb21lZGF5LlxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybiAnbnVsbCc7XG4gICAgICAgICAgICBnYXAgKz0gaW5kZW50O1xuICAgICAgICAgICAgcGFydGlhbCA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBcnJheS5pc0FycmF5XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWxbaV0gPSBzdHIoaSwgdmFsdWUpIHx8ICdudWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZFxuICAgICAgICAgICAgICAgIC8vIHdyYXAgdGhlbSBpbiBicmFja2V0cy5cbiAgICAgICAgICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAnW10nIDogZ2FwID9cbiAgICAgICAgICAgICAgICAgICAgJ1tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnXScgOlxuICAgICAgICAgICAgICAgICAgICAnWycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICddJztcbiAgICAgICAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVwbGFjZXIgaXMgYW4gYXJyYXksIHVzZSBpdCB0byBzZWxlY3QgdGhlIG1lbWJlcnMgdG8gYmVcbiAgICAgICAgICAgIC8vIHN0cmluZ2lmaWVkLlxuICAgICAgICAgICAgaWYgKHJlcCAmJiB0eXBlb2YgcmVwID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJlcC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSByZXBbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBtZW1iZXIgdGV4dHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcyxcbiAgICAgICAgLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ3t9JyA6IGdhcCA/XG4gICAgICAgICAgICAne1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICd9JyA6XG4gICAgICAgICAgICAneycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICd9JztcbiAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgdmFyIGk7XG4gICAgZ2FwID0gJyc7XG4gICAgaW5kZW50ID0gJyc7XG4gICAgXG4gICAgLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIG51bWJlciwgbWFrZSBhbiBpbmRlbnQgc3RyaW5nIGNvbnRhaW5pbmcgdGhhdFxuICAgIC8vIG1hbnkgc3BhY2VzLlxuICAgIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzcGFjZTsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gJyAnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5kZW50IHN0cmluZy5cbiAgICBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGluZGVudCA9IHNwYWNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbiAgICAvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yLlxuICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgIGlmIChyZXBsYWNlciAmJiB0eXBlb2YgcmVwbGFjZXIgIT09ICdmdW5jdGlvbidcbiAgICAmJiAodHlwZW9mIHJlcGxhY2VyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKU09OLnN0cmluZ2lmeScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBNYWtlIGEgZmFrZSByb290IG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSB1bmRlciB0aGUga2V5IG9mICcnLlxuICAgIC8vIFJldHVybiB0aGUgcmVzdWx0IG9mIHN0cmluZ2lmeWluZyB0aGUgdmFsdWUuXG4gICAgcmV0dXJuIHN0cignJywgeycnOiB2YWx1ZX0pO1xufTtcbiIsIlxuZXhwb3J0IGVudW0gQWdncmVnYXRlT3Age1xuICAgIFZBTFVFUyA9ICd2YWx1ZXMnIGFzIGFueSxcbiAgICBDT1VOVCA9ICdjb3VudCcgYXMgYW55LFxuICAgIFZBTElEID0gJ3ZhbGlkJyBhcyBhbnksXG4gICAgTUlTU0lORyA9ICdtaXNzaW5nJyBhcyBhbnksXG4gICAgRElTVElOQ1QgPSAnZGlzdGluY3QnIGFzIGFueSxcbiAgICBTVU0gPSAnc3VtJyBhcyBhbnksXG4gICAgTUVBTiA9ICdtZWFuJyBhcyBhbnksXG4gICAgQVZFUkFHRSA9ICdhdmVyYWdlJyBhcyBhbnksXG4gICAgVkFSSUFOQ0UgPSAndmFyaWFuY2UnIGFzIGFueSxcbiAgICBWQVJJQU5DRVAgPSAndmFyaWFuY2VwJyBhcyBhbnksXG4gICAgU1RERVYgPSAnc3RkZXYnIGFzIGFueSxcbiAgICBTVERFVlAgPSAnc3RkZXZwJyBhcyBhbnksXG4gICAgTUVESUFOID0gJ21lZGlhbicgYXMgYW55LFxuICAgIFExID0gJ3ExJyBhcyBhbnksXG4gICAgUTMgPSAncTMnIGFzIGFueSxcbiAgICBNT0RFU0tFVyA9ICdtb2Rlc2tldycgYXMgYW55LFxuICAgIE1JTiA9ICdtaW4nIGFzIGFueSxcbiAgICBNQVggPSAnbWF4JyBhcyBhbnksXG4gICAgQVJHTUlOID0gJ2FyZ21pbicgYXMgYW55LFxuICAgIEFSR01BWCA9ICdhcmdtYXgnIGFzIGFueSxcbn1cblxuZXhwb3J0IGNvbnN0IEFHR1JFR0FURV9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuVkFMVUVTLFxuICAgIEFnZ3JlZ2F0ZU9wLkNPVU5ULFxuICAgIEFnZ3JlZ2F0ZU9wLlZBTElELFxuICAgIEFnZ3JlZ2F0ZU9wLk1JU1NJTkcsXG4gICAgQWdncmVnYXRlT3AuRElTVElOQ1QsXG4gICAgQWdncmVnYXRlT3AuU1VNLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FQU4sXG4gICAgQWdncmVnYXRlT3AuQVZFUkFHRSxcbiAgICBBZ2dyZWdhdGVPcC5WQVJJQU5DRSxcbiAgICBBZ2dyZWdhdGVPcC5WQVJJQU5DRVAsXG4gICAgQWdncmVnYXRlT3AuU1RERVYsXG4gICAgQWdncmVnYXRlT3AuU1RERVZQLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FRElBTixcbiAgICBBZ2dyZWdhdGVPcC5RMSxcbiAgICBBZ2dyZWdhdGVPcC5RMyxcbiAgICBBZ2dyZWdhdGVPcC5NT0RFU0tFVyxcbiAgICBBZ2dyZWdhdGVPcC5NSU4sXG4gICAgQWdncmVnYXRlT3AuTUFYLFxuICAgIEFnZ3JlZ2F0ZU9wLkFSR01JTixcbiAgICBBZ2dyZWdhdGVPcC5BUkdNQVgsXG5dO1xuXG4vKiogQWRkaXRpdmUtYmFzZWQgYWdncmVnYXRpb24gb3BlcmF0aW9ucy4gIFRoZXNlIGNhbiBiZSBhcHBsaWVkIHRvIHN0YWNrLiAqL1xuZXhwb3J0IGNvbnN0IFNVTV9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuQ09VTlQsXG4gICAgQWdncmVnYXRlT3AuU1VNLFxuICAgIEFnZ3JlZ2F0ZU9wLkRJU1RJTkNUXG5dO1xuXG5leHBvcnQgY29uc3QgU0hBUkVEX0RPTUFJTl9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuTUVBTixcbiAgICBBZ2dyZWdhdGVPcC5BVkVSQUdFLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWUCxcbiAgICBBZ2dyZWdhdGVPcC5NRURJQU4sXG4gICAgQWdncmVnYXRlT3AuUTEsXG4gICAgQWdncmVnYXRlT3AuUTMsXG4gICAgQWdncmVnYXRlT3AuTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLk1BWCxcbl07XG5cbi8vIFRPRE86IG1vdmUgc3VwcG9ydGVkVHlwZXMsIHN1cHBvcnRlZEVudW1zIGZyb20gc2NoZW1hIHRvIGhlcmVcbiIsIlxuZXhwb3J0IGVudW0gQXhpc09yaWVudCB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIFJJR0hUID0gJ3JpZ2h0JyBhcyBhbnksXG4gICAgTEVGVCA9ICdsZWZ0JyBhcyBhbnksXG4gICAgQk9UVE9NID0gJ2JvdHRvbScgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXhpc0NvbmZpZyB7XG4gIC8vIC0tLS0tLS0tLS0gR2VuZXJhbCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgYXhpcyBsaW5lXG4gICAqL1xuICBheGlzV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIGlmIHRoZSBheGlzIChhbmQgYW55IGdyaWRsaW5lcykgc2hvdWxkIGJlIHBsYWNlZCBhYm92ZSBvciBiZWxvdyB0aGUgZGF0YSBtYXJrcy5cbiAgICovXG4gIGxheWVyPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG9mZnNldCwgaW4gcGl4ZWxzLCBieSB3aGljaCB0byBkaXNwbGFjZSB0aGUgYXhpcyBmcm9tIHRoZSBlZGdlIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgb3IgZGF0YSByZWN0YW5nbGUuXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBBeGlzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIENvbG9yIG9mIGF4aXMgbGluZS5cbiAgICovXG4gIGF4aXNDb2xvcj86IHN0cmluZztcblxuICAvLyAtLS0tLS0tLS0tIEdyaWQgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRlIGlmIGdyaWRsaW5lcyBzaG91bGQgYmUgY3JlYXRlZCBpbiBhZGRpdGlvbiB0byB0aWNrcy4gSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIFJPVyBhbmQgQ09MLiBGb3IgWCBhbmQgWSwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBxdWFudGl0YXRpdmUgYW5kIHRpbWUgZmllbGRzIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICovXG4gIGdyaWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiBncmlkbGluZXMuXG4gICAqL1xuICBncmlkQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIGdyaWQgZGFzaCBhcnJheS5cbiAgICovXG4gIGdyaWREYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBvZiBncmlkICh2YWx1ZSBiZXR3ZWVuIFswLDFdKVxuICAgKi9cbiAgZ3JpZE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHdpZHRoLCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmlkV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBMYWJlbHMgLS0tLS0tLS0tLVxuICAvKipcbiAgICogRW5hYmxlIG9yIGRpc2FibGUgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCBhbGlnbm1lbnQgZm9yIHRoZSBMYWJlbC5cbiAgICovXG4gIGxhYmVsQWxpZ24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUZXh0IGJhc2VsaW5lIGZvciB0aGUgbGFiZWwuXG4gICAqL1xuICBsYWJlbEJhc2VsaW5lPzogc3RyaW5nO1xuICAvKipcbiAgICogVHJ1bmNhdGUgbGFiZWxzIHRoYXQgYXJlIHRvbyBsb25nLlxuICAgKiBAbWluaW11bSAxXG4gICAqL1xuICBsYWJlbE1heExlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggYW5kIGRheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuXG4gICAqL1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGlja3MgLS0tLS0tLS0tLVxuICAvKipcbiAgICogSWYgcHJvdmlkZWQsIHNldHMgdGhlIG51bWJlciBvZiBtaW5vciB0aWNrcyBiZXR3ZWVuIG1ham9yIHRpY2tzICh0aGUgdmFsdWUgOSByZXN1bHRzIGluIGRlY2ltYWwgc3ViZGl2aXNpb24pLiBPbmx5IGFwcGxpY2FibGUgZm9yIGF4ZXMgdmlzdWFsaXppbmcgcXVhbnRpdGF0aXZlIHNjYWxlcy5cbiAgICovXG4gIHN1YmRpdmlkZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEEgZGVzaXJlZCBudW1iZXIgb2YgdGlja3MsIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuIFRoZSByZXN1bHRpbmcgbnVtYmVyIG1heSBiZSBkaWZmZXJlbnQgc28gdGhhdCB2YWx1ZXMgYXJlIFwibmljZVwiIChtdWx0aXBsZXMgb2YgMiwgNSwgMTApIGFuZCBsaWUgd2l0aGluIHRoZSB1bmRlcmx5aW5nIHNjYWxlJ3MgcmFuZ2UuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tzPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGF4aXMncyB0aWNrLlxuICAgKi9cbiAgdGlja0NvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIHRpY2sgbGFiZWwsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aWNrTGFiZWxDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIHRpY2sgbGFiZWwuXG4gICAqL1xuICB0aWNrTGFiZWxGb250Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIGxhYmVsLCBpbiBwaXhlbHMuXG4gICAqL1xuICB0aWNrTGFiZWxGb250U2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aWNrcyBhbmQgdGV4dCBsYWJlbHMuXG4gICAqL1xuICB0aWNrUGFkZGluZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yLCBtaW5vciBhbmQgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1ham9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgbWlub3IgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplTWlub3I/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBlbmQgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplRW5kPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGgsIGluIHBpeGVscywgb2YgdGlja3MuXG4gICAqL1xuICB0aWNrV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBUaXRsZSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgdGl0bGUsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aXRsZUNvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGb250IG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udD86IHN0cmluZztcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRTaXplPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXZWlnaHQgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250V2VpZ2h0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRpdGxlIG9mZnNldCB2YWx1ZSBmb3IgdGhlIGF4aXMuXG4gICAqL1xuICB0aXRsZU9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIE1heCBsZW5ndGggZm9yIGF4aXMgdGl0bGUgaWYgdGhlIHRpdGxlIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGZyb20gdGhlIGZpZWxkJ3MgZGVzY3JpcHRpb24uIEJ5IGRlZmF1bHQsIHRoaXMgaXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiBjZWxsIHNpemUgYW5kIGNoYXJhY3RlcldpZHRoIHByb3BlcnR5LlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aXRsZU1heExlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENoYXJhY3RlciB3aWR0aCBmb3IgYXV0b21hdGljYWxseSBkZXRlcm1pbmluZyB0aXRsZSBtYXggbGVuZ3RoLlxuICAgKi9cbiAgY2hhcmFjdGVyV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBPdGhlciAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gYXhpcyBzdHlsaW5nLlxuICAgKi9cbiAgcHJvcGVydGllcz86IGFueTsgLy8gVE9ETzogcmVwbGFjZVxufVxuXG4vLyBUT0RPOiBhZGQgY29tbWVudCBmb3IgcHJvcGVydGllcyB0aGF0IHdlIHJlbHkgb24gVmVnYSdzIGRlZmF1bHQgdG8gcHJvZHVjZVxuLy8gbW9yZSBjb25jaXNlIFZlZ2Egb3V0cHV0LlxuXG5leHBvcnQgY29uc3QgZGVmYXVsdEF4aXNDb25maWc6IEF4aXNDb25maWcgPSB7XG4gIG9mZnNldDogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDBcbiAgZ3JpZDogdW5kZWZpbmVkLCAvLyBhdXRvbWF0aWNhbGx5IGRldGVybWluZWRcbiAgbGFiZWxzOiB0cnVlLFxuICBsYWJlbE1heExlbmd0aDogMjUsXG4gIHRpY2tTaXplOiB1bmRlZmluZWQsIC8vIGltcGxpY2l0bHkgNlxuICBjaGFyYWN0ZXJXaWR0aDogNlxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldEF4aXNDb25maWc6IEF4aXNDb25maWcgPSB7XG4gIGF4aXNXaWR0aDogMCxcbiAgbGFiZWxzOiB0cnVlLFxuICBncmlkOiBmYWxzZSxcbiAgdGlja1NpemU6IDBcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXhpcyBleHRlbmRzIEF4aXNDb25maWcge1xuICAvKipcbiAgICogVGhlIHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBheGlzIGxhYmVscy5cbiAgICovXG4gIGxhYmVsQW5nbGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBheGlzIGxhYmVscy5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZzsgLy8gZGVmYXVsdCB2YWx1ZSBkZXRlcm1pbmVkIGJ5IGNvbmZpZy5mb3JtYXQgYW55d2F5XG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIGF4aXMuIE9uZSBvZiB0b3AsIGJvdHRvbSwgbGVmdCBvciByaWdodC4gVGhlIG9yaWVudGF0aW9uIGNhbiBiZSB1c2VkIHRvIGZ1cnRoZXIgc3BlY2lhbGl6ZSB0aGUgYXhpcyB0eXBlIChlLmcuLCBhIHkgYXhpcyBvcmllbnRlZCBmb3IgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIGNoYXJ0KS5cbiAgICovXG4gIG9yaWVudD86IEF4aXNPcmllbnQ7XG4gIC8qKlxuICAgKiBBIHRpdGxlIGZvciB0aGUgYXhpcy4gU2hvd3MgZmllbGQgbmFtZSBhbmQgaXRzIGZ1bmN0aW9uIGJ5IGRlZmF1bHQuXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgdmFsdWVzPzogbnVtYmVyW107XG59XG4iLCJpbXBvcnQge0NoYW5uZWwsIFJPVywgQ09MVU1OLCBTSEFQRSwgU0laRX0gZnJvbSAnLi9jaGFubmVsJztcblxuLyoqXG4gKiBCaW5uaW5nIHByb3BlcnRpZXMgb3IgYm9vbGVhbiBmbGFnIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIGJpbiBkYXRhIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCaW4ge1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gYmluIHZhbHVlIHRvIGNvbnNpZGVyLiBJZiB1bnNwZWNpZmllZCwgdGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyB1c2VkLlxuICAgKi9cbiAgbWluPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1heGltdW0gYmluIHZhbHVlIHRvIGNvbnNpZGVyLiBJZiB1bnNwZWNpZmllZCwgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyB1c2VkLlxuICAgKi9cbiAgbWF4PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG51bWJlciBiYXNlIHRvIHVzZSBmb3IgYXV0b21hdGljIGJpbiBkZXRlcm1pbmF0aW9uIChkZWZhdWx0IGlzIGJhc2UgMTApLlxuICAgKi9cbiAgYmFzZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFuIGV4YWN0IHN0ZXAgc2l6ZSB0byB1c2UgYmV0d2VlbiBiaW5zLiBJZiBwcm92aWRlZCwgb3B0aW9ucyBzdWNoIGFzIG1heGJpbnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgc3RlcD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGFsbG93YWJsZSBzdGVwIHNpemVzIHRvIGNob29zZSBmcm9tLlxuICAgKi9cbiAgc3RlcHM/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEEgbWluaW11bSBhbGxvd2FibGUgc3RlcCBzaXplIChwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBpbnRlZ2VyIHZhbHVlcykuXG4gICAqL1xuICBtaW5zdGVwPzogbnVtYmVyO1xuICAvKipcbiAgICogU2NhbGUgZmFjdG9ycyBpbmRpY2F0aW5nIGFsbG93YWJsZSBzdWJkaXZpc2lvbnMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIFs1LCAyXSwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgZm9yIGJhc2UgMTAgbnVtYmVycyAodGhlIGRlZmF1bHQgYmFzZSksIHRoZSBtZXRob2QgbWF5IGNvbnNpZGVyIGRpdmlkaW5nIGJpbiBzaXplcyBieSA1IGFuZC9vciAyLiBGb3IgZXhhbXBsZSwgZm9yIGFuIGluaXRpYWwgc3RlcCBzaXplIG9mIDEwLCB0aGUgbWV0aG9kIGNhbiBjaGVjayBpZiBiaW4gc2l6ZXMgb2YgMiAoPSAxMC81KSwgNSAoPSAxMC8yKSwgb3IgMSAoPSAxMC8oNSoyKSkgbWlnaHQgYWxzbyBzYXRpc2Z5IHRoZSBnaXZlbiBjb25zdHJhaW50cy5cbiAgICovXG4gIGRpdj86IG51bWJlcltdO1xuICAvKipcbiAgICogTWF4aW11bSBudW1iZXIgb2YgYmlucy5cbiAgICogQG1pbmltdW0gMlxuICAgKi9cbiAgbWF4Ymlucz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9NYXhCaW5zKGNoYW5uZWw6IENoYW5uZWwpOiBudW1iZXIge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICBjYXNlIFNJWkU6XG4gICAgICAvLyBGYWNldHMgYW5kIFNpemUgc2hvdWxkbid0IGhhdmUgdG9vIG1hbnkgYmluc1xuICAgICAgLy8gV2UgY2hvb3NlIDYgbGlrZSBzaGFwZSB0byBzaW1wbGlmeSB0aGUgcnVsZVxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4gNjsgLy8gVmVnYSdzIFwic2hhcGVcIiBoYXMgNiBkaXN0aW5jdCB2YWx1ZXNcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDEwO1xuICB9XG59XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGVuY29kaW5nIGNoYW5uZWxzIChWaXN1YWwgdmFyaWFibGVzKVxuICogc3VjaCBhcyAneCcsICd5JywgJ2NvbG9yJy5cbiAqL1xuXG5pbXBvcnQge01hcmt9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCB3aXRob3V0fSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZW51bSBDaGFubmVsIHtcbiAgWCA9ICd4JyBhcyBhbnksXG4gIFkgPSAneScgYXMgYW55LFxuICBYMiA9ICd4MicgYXMgYW55LFxuICBZMiA9ICd5MicgYXMgYW55LFxuICBST1cgPSAncm93JyBhcyBhbnksXG4gIENPTFVNTiA9ICdjb2x1bW4nIGFzIGFueSxcbiAgU0hBUEUgPSAnc2hhcGUnIGFzIGFueSxcbiAgU0laRSA9ICdzaXplJyBhcyBhbnksXG4gIENPTE9SID0gJ2NvbG9yJyBhcyBhbnksXG4gIFRFWFQgPSAndGV4dCcgYXMgYW55LFxuICBERVRBSUwgPSAnZGV0YWlsJyBhcyBhbnksXG4gIExBQkVMID0gJ2xhYmVsJyBhcyBhbnksXG4gIFBBVEggPSAncGF0aCcgYXMgYW55LFxuICBPUkRFUiA9ICdvcmRlcicgYXMgYW55LFxuICBPUEFDSVRZID0gJ29wYWNpdHknIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgWCA9IENoYW5uZWwuWDtcbmV4cG9ydCBjb25zdCBZID0gQ2hhbm5lbC5ZO1xuZXhwb3J0IGNvbnN0IFgyID0gQ2hhbm5lbC5YMjtcbmV4cG9ydCBjb25zdCBZMiA9IENoYW5uZWwuWTI7XG5leHBvcnQgY29uc3QgUk9XID0gQ2hhbm5lbC5ST1c7XG5leHBvcnQgY29uc3QgQ09MVU1OID0gQ2hhbm5lbC5DT0xVTU47XG5leHBvcnQgY29uc3QgU0hBUEUgPSBDaGFubmVsLlNIQVBFO1xuZXhwb3J0IGNvbnN0IFNJWkUgPSBDaGFubmVsLlNJWkU7XG5leHBvcnQgY29uc3QgQ09MT1IgPSBDaGFubmVsLkNPTE9SO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBDaGFubmVsLlRFWFQ7XG5leHBvcnQgY29uc3QgREVUQUlMID0gQ2hhbm5lbC5ERVRBSUw7XG5leHBvcnQgY29uc3QgTEFCRUwgPSBDaGFubmVsLkxBQkVMO1xuZXhwb3J0IGNvbnN0IFBBVEggPSBDaGFubmVsLlBBVEg7XG5leHBvcnQgY29uc3QgT1JERVIgPSBDaGFubmVsLk9SREVSO1xuZXhwb3J0IGNvbnN0IE9QQUNJVFkgPSBDaGFubmVsLk9QQUNJVFk7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMUyA9IFtYLCBZLCBYMiwgWTIsIFJPVywgQ09MVU1OLCBTSVpFLCBTSEFQRSwgQ09MT1IsIFBBVEgsIE9SREVSLCBPUEFDSVRZLCBURVhULCBERVRBSUwsIExBQkVMXTtcblxuZXhwb3J0IGNvbnN0IFVOSVRfQ0hBTk5FTFMgPSB3aXRob3V0KENIQU5ORUxTLCBbUk9XLCBDT0xVTU5dKTtcbmV4cG9ydCBjb25zdCBVTklUX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbUEFUSCwgT1JERVIsIERFVEFJTCwgVEVYVCwgTEFCRUwsIFgyLCBZMl0pO1xuZXhwb3J0IGNvbnN0IE5PTlNQQVRJQUxfQ0hBTk5FTFMgPSB3aXRob3V0KFVOSVRfQ0hBTk5FTFMsIFtYLCBZLCBYMiwgWTJdKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX1NDQUxFX0NIQU5ORUxTLCBbWCwgWSwgWDIsIFkyXSk7XG5cbi8qKiBDaGFubmVscyB0aGF0IGNhbiBzZXJ2ZSBhcyBncm91cGluZ3MgZm9yIHN0YWNrZWQgY2hhcnRzLiAqL1xuZXhwb3J0IGNvbnN0IFNUQUNLX0dST1VQX0NIQU5ORUxTID0gW0NPTE9SLCBERVRBSUwsIE9SREVSLCBPUEFDSVRZLCBTSVpFXTtcblxuZXhwb3J0IGludGVyZmFjZSBTdXBwb3J0ZWRNYXJrIHtcbiAgcG9pbnQ/OiBib29sZWFuO1xuICB0aWNrPzogYm9vbGVhbjtcbiAgcnVsZT86IGJvb2xlYW47XG4gIGNpcmNsZT86IGJvb2xlYW47XG4gIHNxdWFyZT86IGJvb2xlYW47XG4gIGJhcj86IGJvb2xlYW47XG4gIGxpbmU/OiBib29sZWFuO1xuICBhcmVhPzogYm9vbGVhbjtcbiAgdGV4dD86IGJvb2xlYW47XG59O1xuXG4vKipcbiAqIFJldHVybiB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBhIHBhcnRpY3VsYXIgbWFyayB0eXBlLlxuICogQHBhcmFtIGNoYW5uZWwgIGNoYW5uZWwgbmFtZVxuICogQHBhcmFtIG1hcmsgdGhlIG1hcmsgdHlwZVxuICogQHJldHVybiB3aGV0aGVyIHRoZSBtYXJrIHN1cHBvcnRzIHRoZSBjaGFubmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0TWFyayhjaGFubmVsOiBDaGFubmVsLCBtYXJrOiBNYXJrKSB7XG4gIHJldHVybiAhIWdldFN1cHBvcnRlZE1hcmsoY2hhbm5lbClbbWFya107XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZGljdGlvbmFyeSBzaG93aW5nIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIG1hcmsgdHlwZXMgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRNYXJrIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgREVUQUlMOlxuICAgIGNhc2UgT1JERVI6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHsgLy8gYWxsIG1hcmtzXG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBydWxlOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCBsaW5lOiB0cnVlLCBhcmVhOiB0cnVlLCB0ZXh0OiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgWDI6XG4gICAgY2FzZSBZMjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJ1bGU6IHRydWUsIGJhcjogdHJ1ZSwgYXJlYTogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtwb2ludDogdHJ1ZX07XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHt0ZXh0OiB0cnVlfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge2xpbmU6IHRydWV9O1xuICB9XG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwb3J0ZWRSb2xlIHtcbiAgbWVhc3VyZTogYm9vbGVhbjtcbiAgZGltZW5zaW9uOiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgZGltZW5zaW9uIC8gbWVhc3VyZSByb2xlXG4gKiBAcGFyYW0gIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgcm9sZSB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZFJvbGUoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZFJvbGUge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgTEFCRUw6XG4gICAgY2FzZSBERVRBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBYMjpcbiAgICBjYXNlIFkyOlxuICAgIGNhc2UgU0laRTpcbiAgICBjYXNlIFRFWFQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IGZhbHNlXG4gICAgICB9O1xuICAgIGNhc2UgUEFUSDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVuY29kaW5nIGNoYW5uZWwnICsgY2hhbm5lbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNTY2FsZShjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiAhY29udGFpbnMoW0RFVEFJTCwgUEFUSCwgVEVYVCwgTEFCRUwsIE9SREVSXSwgY2hhbm5lbCk7XG59XG4iLCJpbXBvcnQge0F4aXNPcmllbnR9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkRGVmVGl0bGUsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGtleXMsIGV4dGVuZCwgdHJ1bmNhdGUsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0F4aXN9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtudW1iZXJGb3JtYXQsIHRpbWVUZW1wbGF0ZX0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIGxldCBleHBvcnRzO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBeGlzQ29tcG9uZW50KG1vZGVsOiBNb2RlbCwgYXhpc0NoYW5uZWxzOiBDaGFubmVsW10pOiBEaWN0PFZnQXhpcz4ge1xuICByZXR1cm4gYXhpc0NoYW5uZWxzLnJlZHVjZShmdW5jdGlvbihheGlzLCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmF4aXMoY2hhbm5lbCkpIHtcbiAgICAgIGF4aXNbY2hhbm5lbF0gPSBwYXJzZUF4aXMoY2hhbm5lbCwgbW9kZWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXhpcztcbiAgfSwge30gYXMgRGljdDxWZ0F4aXM+KTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIGlubmVyIGF4aXMgZm9yIHNob3dpbmcgZ3JpZCBmb3Igc2hhcmVkIGF4aXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUlubmVyQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZGluZyB0aWNrcyBhcyB3ZWxsXG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgZ3JpZDogdHJ1ZSxcbiAgICB0aWNrU2l6ZTogMCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsYWJlbHM6IHtcbiAgICAgICAgdGV4dDoge3ZhbHVlOiAnJ31cbiAgICAgIH0sXG4gICAgICBheGlzOiB7XG4gICAgICAgIHN0cm9rZToge3ZhbHVlOiAndHJhbnNwYXJlbnQnfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICBbJ2xheWVyJywgJ3RpY2tzJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgbGV0IG1ldGhvZDogKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmOmFueSk9PmFueTtcblxuICAgIGNvbnN0IHZhbHVlID0gKG1ldGhvZCA9IGV4cG9ydHNbcHJvcGVydHldKSA/XG4gICAgICAgICAgICAgICAgICAvLyBjYWxsaW5nIGF4aXMuZm9ybWF0LCBheGlzLmdyaWQsIC4uLlxuICAgICAgICAgICAgICAgICAgbWV0aG9kKG1vZGVsLCBjaGFubmVsLCBkZWYpIDpcbiAgICAgICAgICAgICAgICAgIGF4aXNbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwcm9wcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCkucHJvcGVydGllcyB8fCB7fTtcblxuICAvLyBGb3Igbm93LCBvbmx5IG5lZWQgdG8gYWRkIGdyaWQgcHJvcGVydGllcyBoZXJlIGJlY2F1c2UgaW5uZXJBeGlzIGlzIG9ubHkgZm9yIHJlbmRlcmluZyBncmlkLlxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZCBvdGhlciBwcm9wZXJ0aWVzIGZvciBpbm5lckF4aXNcbiAgWydncmlkJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tncm91cF0gP1xuICAgICAgcHJvcGVydGllc1tncm91cF0obW9kZWwsIGNoYW5uZWwsIHByb3BzW2dyb3VwXSB8fCB7fSwgZGVmKSA6XG4gICAgICBwcm9wc1tncm91cF07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAvLyBUT0RPOiByZXBsYWNlIGFueSB3aXRoIFZlZ2EgQXhpcyBJbnRlcmZhY2VcbiAgbGV0IGRlZjogYW55ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKVxuICB9O1xuXG4gIC8vIDEuMi4gQWRkIHByb3BlcnRpZXNcbiAgW1xuICAgIC8vIGEpIHByb3BlcnRpZXMgd2l0aCBzcGVjaWFsIHJ1bGVzIChzbyBpdCBoYXMgYXhpc1twcm9wZXJ0eV0gbWV0aG9kcykgLS0gY2FsbCBydWxlIGZ1bmN0aW9uc1xuICAgICdmb3JtYXQnLCAnZ3JpZCcsICdsYXllcicsICdvZmZzZXQnLCAnb3JpZW50JywgJ3RpY2tTaXplJywgJ3RpY2tzJywgJ3RpY2tTaXplRW5kJywgJ3RpdGxlJywgJ3RpdGxlT2Zmc2V0JyxcbiAgICAvLyBiKSBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXMsIG9ubHkgcHJvZHVjZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgc2NoZW1hLCBvciBleHBsaWNpdCB2YWx1ZSBpZiBzcGVjaWZpZWRcbiAgICAndGlja1BhZGRpbmcnLCAndGlja1NpemUnLCAndGlja1NpemVNYWpvcicsICd0aWNrU2l6ZU1pbm9yJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgW1xuICAgICdheGlzJywgJ2xhYmVscycsIC8vIGhhdmUgc3BlY2lhbCBydWxlc1xuICAgICdncmlkJywgJ3RpdGxlJywgJ3RpY2tzJywgJ21ham9yVGlja3MnLCAnbWlub3JUaWNrcycgLy8gb25seSBkZWZhdWx0IHZhbHVlc1xuICBdLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiBudW1iZXJGb3JtYXQobW9kZWwuZmllbGREZWYoY2hhbm5lbCksIG1vZGVsLmF4aXMoY2hhbm5lbCkuZm9ybWF0LCBtb2RlbC5jb25maWcoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiBtb2RlbC5heGlzKGNoYW5uZWwpLm9mZnNldDtcbn1cblxuLy8gVE9ETzogd2UgbmVlZCB0byByZWZhY3RvciB0aGlzIG1ldGhvZCBhZnRlciB3ZSB0YWtlIGNhcmUgb2YgY29uZmlnIHJlZmFjdG9yaW5nXG4vKipcbiAqIERlZmF1bHQgcnVsZXMgZm9yIHdoZXRoZXIgdG8gc2hvdyBhIGdyaWQgc2hvdWxkIGJlIHNob3duIGZvciBhIGNoYW5uZWwuXG4gKiBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3Igb3JkaW5hbCBzY2FsZXMgdGhhdCBhcmUgbm90IGJpbm5lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JpZFNob3cobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGdyaWQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmdyaWQ7XG4gIGlmIChncmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuXG4gIHJldHVybiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyaWQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjaGFubmVsID09PSBST1cgfHwgY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gbmV2ZXIgYXBwbHkgZ3JpZCBmb3IgUk9XIGFuZCBDT0xVTU4gc2luY2Ugd2UgbWFudWFsbHkgY3JlYXRlIHJ1bGUtZ3JvdXAgZm9yIHRoZW1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGdyaWRTaG93KG1vZGVsLCBjaGFubmVsKSAmJiAoXG4gICAgLy8gVE9ETyByZWZhY3RvciB0aGlzIGNsZWFubHkgLS0gZXNzZW50aWFsbHkgdGhlIGNvbmRpdGlvbiBiZWxvdyBpcyB3aGV0aGVyXG4gICAgLy8gdGhlIGF4aXMgaXMgYSBzaGFyZWQgLyB1bmlvbiBheGlzLlxuICAgIChjaGFubmVsID09PSBZIHx8IGNoYW5uZWwgPT09IFgpICYmICEobW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXIobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWYpIHtcbiAgY29uc3QgbGF5ZXIgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmxheWVyO1xuICBpZiAobGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICBpZiAoZGVmLmdyaWQpIHtcbiAgICAvLyBpZiBncmlkIGlzIHRydWUsIG5lZWQgdG8gcHV0IGxheWVyIG9uIHRoZSBiYWNrIHNvIHRoYXQgZ3JpZCBpcyBiZWhpbmQgbWFya3NcbiAgICByZXR1cm4gJ2JhY2snO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIG90aGVyd2lzZSByZXR1cm4gdW5kZWZpbmVkIGFuZCB1c2UgVmVnYSdzIGRlZmF1bHQuXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3JpZW50KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBvcmllbnQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLm9yaWVudDtcbiAgaWYgKG9yaWVudCkge1xuICAgIHJldHVybiBvcmllbnQ7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gRklYTUUgdGVzdCBhbmQgZGVjaWRlXG4gICAgcmV0dXJuIEF4aXNPcmllbnQuVE9QO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja3MgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tzO1xuICBpZiAodGlja3MgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIC8vIEZJWE1FIGRlcGVuZHMgb24gc2NhbGUgdHlwZSB0b29cbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbikge1xuICAgIC8vIFZlZ2EncyBkZWZhdWx0IHRpY2tzIG9mdGVuIGxlYWQgdG8gYSBsb3Qgb2YgbGFiZWwgb2NjbHVzaW9uIG9uIFggd2l0aG91dCA5MCBkZWdyZWUgcm90YXRpb25cbiAgICByZXR1cm4gNTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrU2l6ZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja1NpemUgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tTaXplO1xuICBpZiAodGlja1NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrU2l6ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemVFbmQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplRW5kID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZUVuZDtcbiAgaWYgKHRpY2tTaXplRW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aWNrU2l6ZUVuZDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gIGlmIChheGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYXhpcy50aXRsZTtcbiAgfVxuXG4gIC8vIGlmIG5vdCBkZWZpbmVkLCBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBheGlzIHRpdGxlIGZyb20gZmllbGQgZGVmXG4gIGNvbnN0IGZpZWxkVGl0bGUgPSBmaWVsZERlZlRpdGxlKG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLCBtb2RlbC5jb25maWcoKSk7XG5cbiAgbGV0IG1heExlbmd0aDtcbiAgaWYgKGF4aXMudGl0bGVNYXhMZW5ndGgpIHtcbiAgICBtYXhMZW5ndGggPSBheGlzLnRpdGxlTWF4TGVuZ3RoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFgpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB4XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLyBtb2RlbC5heGlzKFgpLmNoYXJhY3RlcldpZHRoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFkgJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFkpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB5XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0IC8gbW9kZWwuYXhpcyhZKS5jaGFyYWN0ZXJXaWR0aDtcbiAgfVxuXG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVPZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpdGxlT2Zmc2V0ID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aXRsZU9mZnNldDtcbiAgaWYgKHRpdGxlT2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aXRsZU9mZnNldDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLmF4aXNDb2xvciAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgeyBzdHJva2U6IHt2YWx1ZTogYXhpcy5heGlzQ29sb3J9IH0gOlxuICAgICAgICB7fSxcbiAgICAgIGF4aXMuYXhpc1dpZHRoICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMuYXhpc1dpZHRofSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZ3JpZFByb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuZ3JpZENvbG9yICE9PSB1bmRlZmluZWQgPyB7IHN0cm9rZToge3ZhbHVlOiBheGlzLmdyaWRDb2xvcn19IDoge30sXG4gICAgICBheGlzLmdyaWRPcGFjaXR5ICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlT3BhY2l0eToge3ZhbHVlOiBheGlzLmdyaWRPcGFjaXR5fSB9IDoge30sXG4gICAgICBheGlzLmdyaWRXaWR0aCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZVdpZHRoIDoge3ZhbHVlOiBheGlzLmdyaWRXaWR0aH0gfSA6IHt9LFxuICAgICAgYXhpcy5ncmlkRGFzaCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZURhc2hPZmZzZXQgOiB7dmFsdWU6IGF4aXMuZ3JpZERhc2h9IH0gOiB7fSxcbiAgICAgIGdyaWRQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGxhYmVsc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBpZiAoIWF4aXMubGFiZWxzKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBpZiAoY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSAmJiBheGlzLmxhYmVsTWF4TGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPIHJlcGxhY2UgdGhpcyB3aXRoIFZlZ2EncyBsYWJlbE1heExlbmd0aCBvbmNlIGl0IGlzIGludHJvZHVjZWRcbiAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bS5kYXRhIHwgdHJ1bmNhdGU6JyArIGF4aXMubGFiZWxNYXhMZW5ndGggKyAnIH19J1xuICAgICAgICB9XG4gICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHRlbXBsYXRlOiB0aW1lVGVtcGxhdGUoJ2RhdHVtLmRhdGEnLCBmaWVsZERlZi50aW1lVW5pdCwgYXhpcy5mb3JtYXQsIGF4aXMuc2hvcnRUaW1lTGFiZWxzLCBjb25maWcpXG4gICAgICAgIH1cbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIC8vIExhYmVsIEFuZ2xlXG4gICAgaWYgKGF4aXMubGFiZWxBbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiBheGlzLmxhYmVsQW5nbGV9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdXRvIHJvdGF0ZSBmb3IgWCBhbmQgUm93XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gWCAmJiAoaXNEaW1lbnNpb24oZmllbGREZWYpIHx8IGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSkge1xuICAgICAgICBsYWJlbHNTcGVjLmFuZ2xlID0ge3ZhbHVlOiAyNzB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQWxpZ24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogYXhpcy5sYWJlbEFsaWdufTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXV0byBzZXQgYWxpZ24gaWYgcm90YXRlZFxuICAgICAgLy8gVE9ETzogY29uc2lkZXIgb3RoZXIgdmFsdWUgYmVzaWRlcyAyNzAsIDkwXG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZWYub3JpZW50ID09PSAndG9wJyA/ICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICBkZWYudHlwZSA9PT0gJ3gnID8gJ3JpZ2h0JyA6XG4gICAgICAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogJ2NlbnRlcid9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGFiZWxCYXNlbGluZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHNTcGVjLmJhc2VsaW5lID0ge3ZhbHVlOiBheGlzLmxhYmVsQmFzZWxpbmV9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZSkge1xuICAgICAgICAvLyBBdXRvIHNldCBiYXNlbGluZSBpZiByb3RhdGVkXG4gICAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgICBpZiAobGFiZWxzU3BlYy5hbmdsZS52YWx1ZSA9PT0gMjcwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogZGVmLnR5cGUgPT09ICd4JyA/ICdtaWRkbGUnIDogJ2JvdHRvbSd9O1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDkwKSB7XG4gICAgICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogJ2JvdHRvbSd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLnN0cm9rZSA9IHt2YWx1ZTogYXhpcy50aWNrTGFiZWxDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsRm9udCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuZm9udCA9IHt2YWx1ZTogYXhpcy50aWNrTGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAoYXhpcy50aWNrTGFiZWxGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhYmVsc1NwZWMuZm9udFNpemUgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsRm9udFNpemV9O1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzKGxhYmVsc1NwZWMpLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IGxhYmVsc1NwZWM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCB0aWNrc1Byb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMudGlja0NvbG9yICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlIDoge3ZhbHVlOiBheGlzLnRpY2tDb2xvcn0gfSA6IHt9LFxuICAgICAgYXhpcy50aWNrV2lkdGggIT09IHVuZGVmaW5lZCA/IHtzdHJva2VXaWR0aDoge3ZhbHVlOiBheGlzLnRpY2tXaWR0aH0gfSA6IHt9LFxuICAgICAgdGlja3NQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgdGl0bGVQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLnRpdGxlQ29sb3IgIT09IHVuZGVmaW5lZCA/IHtzdHJva2UgOiB7dmFsdWU6IGF4aXMudGl0bGVDb2xvcn0gfSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCA/IHtmb250OiB7dmFsdWU6IGF4aXMudGl0bGVGb250fX0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkID8ge2ZvbnRTaXplOiB7dmFsdWU6IGF4aXMudGl0bGVGb250U2l6ZX19IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkID8ge2ZvbnRXZWlnaHQ6IHt2YWx1ZTogYXhpcy50aXRsZUZvbnRXZWlnaHR9fSA6IHt9LFxuXG4gICAgICB0aXRsZVByb3BzU3BlYyB8fCB7fVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7QkFSLCBQT0lOVCwgQ0lSQ0xFLCBTUVVBUkV9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtDT0xPUiwgT1BBQ0lUWX0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkLCBPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7UVVBTlRJVEFUSVZFLCBPUkRJTkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIHVuaW9ufSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7dGVtcGxhdGUgYXMgdGltZVVuaXRUZW1wbGF0ZX0gZnJvbSAnLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge1NwZWMsIGlzVW5pdFNwZWMsIGlzRmFjZXRTcGVjLCBpc0xheWVyU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9kZWwoc3BlYzogU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpOiBNb2RlbCB7XG4gIGlmIChpc0ZhY2V0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiBuZXcgRmFjZXRNb2RlbChzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG4gIH1cblxuICBpZiAoaXNMYXllclNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IExheWVyTW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzVW5pdFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IFVuaXRNb2RlbChzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIHNwZWMuJyk7XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBUT0RPOiBmaWd1cmUgaWYgd2UgcmVhbGx5IG5lZWQgb3BhY2l0eSBpbiBib3RoXG5leHBvcnQgY29uc3QgU1RST0tFX0NPTkZJRyA9IFsnc3Ryb2tlJywgJ3N0cm9rZVdpZHRoJyxcbiAgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCcsICdzdHJva2VPcGFjaXR5JywgJ29wYWNpdHknXTtcblxuZXhwb3J0IGNvbnN0IEZJTExfQ09ORklHID0gWydmaWxsJywgJ2ZpbGxPcGFjaXR5JyxcbiAgJ29wYWNpdHknXTtcblxuZXhwb3J0IGNvbnN0IEZJTExfU1RST0tFX0NPTkZJRyA9IHVuaW9uKFNUUk9LRV9DT05GSUcsIEZJTExfQ09ORklHKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3QgZmlsbGVkID0gbW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQ7XG4gIGNvbnN0IGNvbG9yRmllbGREZWYgPSBtb2RlbC5maWVsZERlZihDT0xPUik7XG4gIGNvbnN0IG9wYWNpdHlGaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKE9QQUNJVFkpO1xuXG4gIC8vIEFwcGx5IGZpbGwgc3Ryb2tlIGNvbmZpZyBmaXJzdCBzbyB0aGF0IGNvbG9yIGZpZWxkIC8gdmFsdWUgY2FuIG92ZXJyaWRlXG4gIC8vIGZpbGwgLyBzdHJva2VcbiAgaWYgKGZpbGxlZCkge1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgRklMTF9DT05GSUcpO1xuICB9IGVsc2Uge1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgU1RST0tFX0NPTkZJRyk7XG4gIH1cblxuICBsZXQgY29sb3JWYWx1ZTtcbiAgbGV0IG9wYWNpdHlWYWx1ZTtcbiAgaWYgKG1vZGVsLmhhcyhDT0xPUikpIHtcbiAgICBjb2xvclZhbHVlID0ge1xuICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIGNvbG9yRmllbGREZWYudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGNvbG9yRmllbGREZWYgJiYgY29sb3JGaWVsZERlZi52YWx1ZSkge1xuICAgIGNvbG9yVmFsdWUgPSB7IHZhbHVlOiBjb2xvckZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAobW9kZWwuaGFzKE9QQUNJVFkpKSB7XG4gICAgb3BhY2l0eVZhbHVlID0ge1xuICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShPUEFDSVRZKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChPUEFDSVRZLCBvcGFjaXR5RmllbGREZWYudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKG9wYWNpdHlGaWVsZERlZiAmJiBvcGFjaXR5RmllbGREZWYudmFsdWUpIHtcbiAgICBvcGFjaXR5VmFsdWUgPSB7IHZhbHVlOiBvcGFjaXR5RmllbGREZWYudmFsdWUgfTtcbiAgfVxuXG4gIGlmIChjb2xvclZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZmlsbGVkKSB7XG4gICAgICBwLmZpbGwgPSBjb2xvclZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnN0cm9rZSA9IGNvbG9yVmFsdWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFwcGx5IGNvbG9yIGNvbmZpZyBpZiB0aGVyZSBpcyBubyBmaWxsIC8gc3Ryb2tlIGNvbmZpZ1xuICAgIHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gcFtmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgIHt2YWx1ZTogbW9kZWwuY29uZmlnKCkubWFyay5jb2xvcn07XG4gIH1cblxuICAvLyBJZiB0aGVyZSBpcyBubyBmaWxsLCBhbHdheXMgZmlsbCBzeW1ib2xzXG4gIC8vIHdpdGggdHJhbnNwYXJlbnQgZmlsbHMgaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS1saXRlL2lzc3Vlcy8xMzE2XG4gIGlmICghcC5maWxsICYmIGNvbnRhaW5zKFtCQVIsIFBPSU5ULCBDSVJDTEUsIFNRVUFSRV0sIG1vZGVsLm1hcmsoKSkpIHtcbiAgICBwLmZpbGwgPSB7dmFsdWU6ICd0cmFuc3BhcmVudCd9O1xuICB9XG5cbiAgaWYgKG9wYWNpdHlWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcC5vcGFjaXR5ID0gb3BhY2l0eVZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbmZpZyhwcm9wZXJ0aWVzLCBjb25maWcsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcHJvcHNMaXN0LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0geyB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWFya0NvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsOiBVbml0TW9kZWwsIHByb3BzTGlzdDogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGFwcGx5Q29uZmlnKG1hcmtzUHJvcGVydGllcywgbW9kZWwuY29uZmlnKCkubWFyaywgcHJvcHNMaXN0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG51bWJlciBmb3JtYXQgZm9yIGEgZmllbGREZWZcbiAqXG4gKiBAcGFyYW0gZm9ybWF0IGV4cGxpY2l0bHkgc3BlY2lmaWVkIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyRm9ybWF0KGZpZWxkRGVmOiBGaWVsZERlZiwgZm9ybWF0OiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKSB7XG4gIGlmIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikge1xuICAgIC8vIGFkZCBudW1iZXIgZm9ybWF0IGZvciBxdWFudGl0YXRpdmUgdHlwZSBvbmx5XG4gICAgLy8gVE9ETzogbmVlZCB0byBtYWtlIHRoaXMgd29yayBjb3JyZWN0bHkgZm9yIG51bWVyaWMgb3JkaW5hbCAvIG5vbWluYWwgdHlwZVxuICAgIHJldHVybiBmb3JtYXQgfHwgY29uZmlnLm51bWJlckZvcm1hdDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKiogUmV0dXJuIGZpZWxkIHJlZmVyZW5jZSB3aXRoIHBvdGVudGlhbCBcIi1cIiBwcmVmaXggZm9yIGRlc2NlbmRpbmcgc29ydCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRGaWVsZChvcmRlckNoYW5uZWxEZWY6IE9yZGVyQ2hhbm5lbERlZikge1xuICByZXR1cm4gKG9yZGVyQ2hhbm5lbERlZi5zb3J0ID09PSBTb3J0T3JkZXIuREVTQ0VORElORyA/ICctJyA6ICcnKSArXG4gICAgZmllbGQob3JkZXJDaGFubmVsRGVmLCB7YmluU3VmZml4OiAnX21pZCd9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aW1lIHRlbXBsYXRlIHVzZWQgZm9yIGF4aXMvbGVnZW5kIGxhYmVscyBvciB0ZXh0IG1hcmsgZm9yIGEgdGVtcG9yYWwgZmllbGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVUZW1wbGF0ZSh0ZW1wbGF0ZUZpZWxkOiBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCwgZm9ybWF0OiBzdHJpbmcsIHNob3J0VGltZUxhYmVsczogYm9vbGVhbiwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0IHx8IGZvcm1hdCkge1xuICAgIC8vIElmIHRoZXJlIGlzIG5vdCB0aW1lIHVuaXQsIG9yIGlmIHVzZXIgZXhwbGljaXRseSBzcGVjaWZ5IGZvcm1hdCBmb3IgYXhpcy9sZWdlbmQvdGV4dC5cbiAgICBjb25zdCBfZm9ybWF0ID0gZm9ybWF0IHx8IGNvbmZpZy50aW1lRm9ybWF0OyAvLyBvbmx5IHVzZSBjb25maWcudGltZUZvcm1hdCBpZiB0aGVyZSBpcyBubyB0aW1lVW5pdC5cbiAgICByZXR1cm4gJ3t7JyArIHRlbXBsYXRlRmllbGQgKyAnIHwgdGltZTpcXCcnICsgX2Zvcm1hdCArICdcXCd9fSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpbWVVbml0VGVtcGxhdGUodGltZVVuaXQsIHRlbXBsYXRlRmllbGQsIHNob3J0VGltZUxhYmVscyk7XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGZvciBjb21waWxpbmcgVmVnYS1saXRlIHNwZWMgaW50byBWZWdhIHNwZWMuXG4gKi9cblxuaW1wb3J0IHtMQVlPVVR9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge25vcm1hbGl6ZSwgRXh0ZW5kZWRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKGlucHV0U3BlYzogRXh0ZW5kZWRTcGVjKSB7XG4gIC8vIDEuIENvbnZlcnQgaW5wdXQgc3BlYyBpbnRvIGEgbm9ybWFsIGZvcm1cbiAgLy8gKERlY29tcG9zZSBhbGwgZXh0ZW5kZWQgdW5pdCBzcGVjcyBpbnRvIGNvbXBvc2l0aW9uIG9mIHVuaXQgc3BlYy4pXG4gIGNvbnN0IHNwZWMgPSBub3JtYWxpemUoaW5wdXRTcGVjKTtcblxuICAvLyAyLiBJbnN0YW50aWF0ZSB0aGUgbW9kZWwgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXNcbiAgY29uc3QgbW9kZWwgPSBidWlsZE1vZGVsKHNwZWMsIG51bGwsICcnKTtcblxuICAvLyAzLiBQYXJzZSBlYWNoIHBhcnQgb2YgdGhlIG1vZGVsIHRvIHByb2R1Y2UgY29tcG9uZW50cyB0aGF0IHdpbGwgYmUgYXNzZW1ibGVkIGxhdGVyXG4gIC8vIFdlIHRyYXZlcnNlIHRoZSB3aG9sZSB0cmVlIHRvIHBhcnNlIG9uY2UgZm9yIGVhY2ggdHlwZSBvZiBjb21wb25lbnRzXG4gIC8vIChlLmcuLCBkYXRhLCBsYXlvdXQsIG1hcmssIHNjYWxlKS5cbiAgLy8gUGxlYXNlIHNlZSBpbnNpZGUgbW9kZWwucGFyc2UoKSBmb3Igb3JkZXIgZm9yIGNvbXBpbGF0aW9uLlxuICBtb2RlbC5wYXJzZSgpO1xuXG4gIC8vIDQuIEFzc2VtYmxlIGEgVmVnYSBTcGVjIGZyb20gdGhlIHBhcnNlZCBjb21wb25lbnRzIGluIDMuXG4gIHJldHVybiBhc3NlbWJsZShtb2RlbCk7XG59XG5cbmZ1bmN0aW9uIGFzc2VtYmxlKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAvLyBUT0RPOiBjaGFuZ2UgdHlwZSB0byBiZWNvbWUgVmdTcGVjXG4gIGNvbnN0IG91dHB1dCA9IGV4dGVuZChcbiAgICB7XG4gICAgICAvLyBTZXQgc2l6ZSB0byAxIGJlY2F1c2Ugd2UgcmVseSBvbiBwYWRkaW5nIGFueXdheVxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBwYWRkaW5nOiAnYXV0bydcbiAgICB9LFxuICAgIGNvbmZpZy52aWV3cG9ydCA/IHsgdmlld3BvcnQ6IGNvbmZpZy52aWV3cG9ydCB9IDoge30sXG4gICAgY29uZmlnLmJhY2tncm91bmQgPyB7IGJhY2tncm91bmQ6IGNvbmZpZy5iYWNrZ3JvdW5kIH0gOiB7fSxcbiAgICB7XG4gICAgICAvLyBUT0RPOiBzaWduYWw6IG1vZGVsLmFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsXG4gICAgICBkYXRhOiBbXS5jb25jYXQoXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlRGF0YShbXSksXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlTGF5b3V0KFtdKVxuICAgICAgICAvLyBUT0RPOiBtb2RlbC5hc3NlbWJsZVNlbGVjdGlvbkRhdGFcbiAgICAgICksXG4gICAgICBtYXJrczogW2Fzc2VtYmxlUm9vdEdyb3VwKG1vZGVsKV1cbiAgICB9KTtcblxuICByZXR1cm4ge1xuICAgIHNwZWM6IG91dHB1dFxuICAgIC8vIFRPRE86IGFkZCB3YXJuaW5nIC8gZXJyb3JzIGhlcmVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlUm9vdEdyb3VwKG1vZGVsOiBNb2RlbCkge1xuICBsZXQgcm9vdEdyb3VwOmFueSA9IGV4dGVuZCh7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb290JyksXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIH0sXG4gICAgbW9kZWwuZGVzY3JpcHRpb24oKSA/IHtkZXNjcmlwdGlvbjogbW9kZWwuZGVzY3JpcHRpb24oKX0gOiB7fSxcbiAgICB7XG4gICAgICBmcm9tOiB7ZGF0YTogTEFZT1VUfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiBleHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgd2lkdGg6IHtmaWVsZDogJ3dpZHRoJ30sXG4gICAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDogJ2hlaWdodCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbC5hc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhtb2RlbC5jb25maWcoKS5jZWxsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGV4dGVuZChyb290R3JvdXAsIG1vZGVsLmFzc2VtYmxlR3JvdXAoKSk7XG59XG4iLCJpbXBvcnQge1gsIERFVEFJTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZywgT3JpZW50LCBNYXJrQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FnZ3JlZ2F0ZSwgaGFzfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtCQVIsIEFSRUEsIFBPSU5ULCBMSU5FLCBUSUNLLCBDSVJDTEUsIFNRVUFSRSwgUlVMRSwgVEVYVCwgTWFya30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIEF1Z21lbnQgY29uZmlnLm1hcmsgd2l0aCBydWxlLWJhc2VkIGRlZmF1bHQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1hcmtDb25maWcobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZykge1xuICAgcmV0dXJuIGV4dGVuZChcbiAgICAgWydmaWxsZWQnLCAnb3BhY2l0eScsICdvcmllbnQnLCAnYWxpZ24nXS5yZWR1Y2UoZnVuY3Rpb24oY2ZnLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgICAgY29uc3QgdmFsdWUgPSBjb25maWcubWFya1twcm9wZXJ0eV07XG4gICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgY2FzZSAnZmlsbGVkJzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAvLyBQb2ludCwgbGluZSwgYW5kIHJ1bGUgYXJlIG5vdCBmaWxsZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBtYXJrICE9PSBQT0lOVCAmJiBtYXJrICE9PSBMSU5FICYmIG1hcmsgIT09IFJVTEU7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChjb250YWlucyhbUE9JTlQsIFRJQ0ssIENJUkNMRSwgU1FVQVJFXSwgbWFyaykpIHtcbiAgICAgICAgICAgICAgLy8gcG9pbnQtYmFzZWQgbWFya3MgYW5kIGJhclxuICAgICAgICAgICAgICBpZiAoIWlzQWdncmVnYXRlKGVuY29kaW5nKSB8fCBoYXMoZW5jb2RpbmcsIERFVEFJTCkpIHtcbiAgICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gMC43O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFyayA9PT0gQVJFQSkge1xuICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gMC43OyAvLyBpbnNwaXJlZCBieSBUYWJsZWF1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcmllbnQnOlxuICAgICAgICAgICBjZmdbcHJvcGVydHldID0gb3JpZW50KG1hcmssIGVuY29kaW5nLCBjb25maWcubWFyayk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgLy8gdGV4dC1vbmx5XG4gICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBoYXMoZW5jb2RpbmcsIFgpID8gJ2NlbnRlcicgOiAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGNmZztcbiAgICAgfSwge30pLFxuICAgICBjb25maWcubWFya1xuICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIG1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7fSk6IE9yaWVudCB7XG4gIHN3aXRjaCAobWFyaykge1xuICAgIGNhc2UgUE9JTlQ6XG4gICAgY2FzZSBDSVJDTEU6XG4gICAgY2FzZSBTUVVBUkU6XG4gICAgY2FzZSBURVhUOlxuICAgICAgLy8gb3JpZW50IGlzIG1lYW5pbmdsZXNzIGZvciB0aGVzZSBtYXJrcy5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKGVuY29kaW5nLngpIHx8IGlzTWVhc3VyZShlbmNvZGluZy54Mik7XG4gIGNvbnN0IHlJc01lYXN1cmUgPSBpc01lYXN1cmUoZW5jb2RpbmcueSkgfHwgaXNNZWFzdXJlKGVuY29kaW5nLnkyKTtcbiAgY29uc3QgeUlzUmFuZ2UgPSBlbmNvZGluZy55ICYmIGVuY29kaW5nLnkyO1xuICBjb25zdCB4SXNSYW5nZSA9IGVuY29kaW5nLnggJiYgZW5jb2RpbmcueDI7XG5cbiAgc3dpdGNoIChtYXJrKSB7XG4gICAgY2FzZSBUSUNLOlxuICAgICAgLy8gVGljayBpcyBvcHBvc2l0ZSB0byBiYXIsIGxpbmUsIGFyZWEgYW5kIG5ldmVyIGhhdmUgcmFuZ2VkIG1hcmsuXG4gICAgICBpZiAoeElzTWVhc3VyZSAmJiAheUlzTWVhc3VyZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xuICAgICAgfVxuICAgICAgLy8geTpRIG9yIEFtYmlndW91cyBjYXNlLCByZXR1cm4gaG9yaXpvbnRhbFxuICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgIGNhc2UgUlVMRTpcbiAgICAgIGlmICh4SXNSYW5nZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LkhPUklaT05UQUw7XG4gICAgICB9XG4gICAgICBpZiAoeUlzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgICAgIH1cbiAgICAgIGlmIChlbmNvZGluZy55KSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuSE9SSVpPTlRBTDtcbiAgICAgIH1cbiAgICAgIGlmIChlbmNvZGluZy54KSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG4gICAgICB9XG4gICAgICAvLyBubyB4L3kgLS0gc28gaXQncyB1bmRlZmluZWRcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY2FzZSBCQVI6XG4gICAgY2FzZSBBUkVBOlxuICAgICAgLy8gSWYgdGhlcmUgYXJlIHJhbmdlIGZvciBib3RoIHggYW5kIHksIHkgKHZlcnRpY2FsKSBoYXMgaGlnaGVyIHByZWNlZGVuY2UuXG5cbiAgICAgIGlmICh5SXNSYW5nZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xuICAgICAgfVxuXG4gICAgICBpZiAoeElzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgICAgfVxuICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBjYXNlIExJTkU6IC8vIGludGVudGlvbmFsIGZhbGwgdGhyb3VnaFxuICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuXG4gICAgICBpZiAoeElzTWVhc3VyZSAmJiAheUlzTWVhc3VyZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LkhPUklaT05UQUw7XG4gICAgICB9XG4gICAgICAvLyB5OlEgb3IgQW1iaWd1b3VzIGNhc2UsIHJldHVybiB2ZXJ0aWNhbFxuICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmU6bmV4dCAqL1xuICBjb25zb2xlLndhcm4oJ29yaWVudCB1bmltcGxlbWVudGVkIGZvciBtYXJrJywgbWFyayk7XG4gIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG59XG4iLCJpbXBvcnQge2F1dG9NYXhCaW5zfSBmcm9tICcuLi8uLi9iaW4nO1xuaW1wb3J0IHtDaGFubmVsLCBDT0xPUn0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGZsYXR0ZW4sIGhhc2gsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYmluIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxWZ1RyYW5zZm9ybVtdPiB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihiaW5Db21wb25lbnQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgYmluID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuYmluO1xuICAgICAgaWYgKGJpbikge1xuICAgICAgICBsZXQgYmluVHJhbnMgPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6ICdiaW4nLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZERlZi5maWVsZCxcbiAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgICAgbWlkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KSxcbiAgICAgICAgICAgIGVuZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICAgLy8gaWYgYmluIGlzIGFuIG9iamVjdCwgbG9hZCBwYXJhbWV0ZXIgaGVyZSFcbiAgICAgICAgICB0eXBlb2YgYmluID09PSAnYm9vbGVhbicgPyB7fSA6IGJpblxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghYmluVHJhbnMubWF4YmlucyAmJiAhYmluVHJhbnMuc3RlcCkge1xuICAgICAgICAgIC8vIGlmIGJvdGggbWF4YmlucyBhbmQgc3RlcCBhcmUgbm90IHNwZWNpZmllZCwgbmVlZCB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBiaW5cbiAgICAgICAgICBiaW5UcmFucy5tYXhiaW5zID0gYXV0b01heEJpbnMoY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBbYmluVHJhbnNdO1xuICAgICAgICBjb25zdCBpc09yZGluYWxDb2xvciA9IG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpIHx8IGNoYW5uZWwgPT09IENPTE9SO1xuICAgICAgICAvLyBjb2xvciByYW1wIGhhcyB0eXBlIGxpbmVhciBvciB0aW1lXG4gICAgICAgIGlmIChpc09yZGluYWxDb2xvcikge1xuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfcmFuZ2UnIH0pLFxuICAgICAgICAgICAgZXhwcjogZmllbGQoZmllbGREZWYsIHsgZGF0dW06IHRydWUsIGJpblN1ZmZpeDogJ19zdGFydCcgfSkgK1xuICAgICAgICAgICAgJyArIFxcJy1cXCcgKyAnICtcbiAgICAgICAgICAgIGZpZWxkKGZpZWxkRGVmLCB7IGRhdHVtOiB0cnVlLCBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiBjdXJyZW50IG1lcmdpbmcgbG9naWMgY2FuIHByb2R1Y2UgcmVkdW5kYW50IHRyYW5zZm9ybXMgd2hlbiBhIGZpZWxkIGlzIGJpbm5lZCBmb3IgY29sb3IgYW5kIGZvciBub24tY29sb3JcbiAgICAgICAgY29uc3Qga2V5ID0gaGFzaChiaW4pICsgJ18nICsgZmllbGREZWYuZmllbGQgKyAnb2M6JyArIGlzT3JkaW5hbENvbG9yO1xuICAgICAgICBiaW5Db21wb25lbnRba2V5XSA9IHRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgLy8gRklYTUU6IGN1cnJlbnQgbWVyZ2luZyBsb2dpYyBjYW4gcHJvZHVjZSByZWR1bmRhbnQgdHJhbnNmb3JtcyB3aGVuIGEgZmllbGQgaXMgYmlubmVkIGZvciBjb2xvciBhbmQgZm9yIG5vbi1jb2xvclxuICAgICAgZXh0ZW5kKGJpbkNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmJpbik7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICB9XG4gICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZChiaW5Db21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5iaW4pO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyhjb21wb25lbnQuYmluKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q09MT1J9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPUkRJTkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBmbGF0dGVuLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogV2UgbmVlZCB0byBhZGQgYSByYW5rIHRyYW5zZm9ybSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlIHJhbmsgdmFsdWUgYXNcbiAqIGlucHV0IGZvciBjb2xvciByYW1wJ3MgbGluZWFyIHNjYWxlLlxuICovXG5leHBvcnQgbmFtZXNwYWNlIGNvbG9yUmFuayB7XG4gIC8qKlxuICAgKiBSZXR1cm4gaGFzaCBkaWN0IGZyb20gYSBjb2xvciBmaWVsZCdzIG5hbWUgdG8gdGhlIHNvcnQgYW5kIHJhbmsgdHJhbnNmb3Jtc1xuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpIHtcbiAgICBsZXQgY29sb3JSYW5rQ29tcG9uZW50OiBEaWN0PFZnVHJhbnNmb3JtW10+ID0ge307XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgbW9kZWwuZmllbGREZWYoQ09MT1IpLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgIGNvbG9yUmFua0NvbXBvbmVudFttb2RlbC5maWVsZChDT0xPUildID0gW3tcbiAgICAgICAgdHlwZTogJ3NvcnQnLFxuICAgICAgICBieTogbW9kZWwuZmllbGQoQ09MT1IpXG4gICAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyYW5rJyxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgcmFuazogbW9kZWwuZmllbGQoQ09MT1IsIHsgcHJlZm46ICdyYW5rXycgfSlcbiAgICAgICAgfVxuICAgICAgfV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvclJhbmtDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBjb25zaWRlciBtZXJnaW5nXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBUT0RPOiB3ZSBoYXZlIHRvIHNlZSBpZiBjb2xvciBoYXMgdW5pb24gc2NhbGUgaGVyZVxuXG4gICAgICAvLyBGb3Igbm93LCBsZXQncyBhc3N1bWUgaXQgYWx3YXlzIGhhcyB1bmlvbiBzY2FsZVxuICAgICAgY29uc3QgY29sb3JSYW5rQ29tcG9uZW50ID0gY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuaztcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIERpY3Q8VmdUcmFuc2Zvcm1bXT47XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBjb2xvclJhbmtDb21wb25lbnQgPSB7fSBhcyBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKGNvbG9yUmFua0NvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuayk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKGNvbXBvbmVudC5jb2xvclJhbmspKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGb3JtdWxhfSBmcm9tICcuLi8uLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtrZXlzLCBEaWN0LCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtzb3VyY2V9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7Zm9ybWF0UGFyc2V9IGZyb20gJy4vZm9ybWF0cGFyc2UnO1xuaW1wb3J0IHtudWxsRmlsdGVyfSBmcm9tICcuL251bGxmaWx0ZXInO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7YmlufSBmcm9tICcuL2Jpbic7XG5pbXBvcnQge2Zvcm11bGF9IGZyb20gJy4vZm9ybXVsYSc7XG5pbXBvcnQge25vblBvc2l0aXZlRmlsdGVyfSBmcm9tICcuL25vbnBvc2l0aXZlbnVsbGZpbHRlcic7XG5pbXBvcnQge3N1bW1hcnl9IGZyb20gJy4vc3VtbWFyeSc7XG5pbXBvcnQge3N0YWNrU2NhbGV9IGZyb20gJy4vc3RhY2tzY2FsZSc7XG5pbXBvcnQge3RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7dGltZVVuaXREb21haW59IGZyb20gJy4vdGltZXVuaXRkb21haW4nO1xuaW1wb3J0IHtjb2xvclJhbmt9IGZyb20gJy4vY29sb3JyYW5rJztcblxuXG4vKipcbiAqIENvbXBvc2FibGUgY29tcG9uZW50IGluc3RhbmNlIG9mIGEgbW9kZWwncyBkYXRhLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGFDb21wb25lbnQge1xuICBzb3VyY2U6IFZnRGF0YTtcblxuICAvKiogTWFwcGluZyBmcm9tIGZpZWxkIG5hbWUgdG8gcHJpbWl0aXZlIGRhdGEgdHlwZS4gICovXG4gIGZvcm1hdFBhcnNlOiBEaWN0PHN0cmluZz47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgZmllbGRzIGZvciBudWxsIGZpbHRlcmluZyAqL1xuICBudWxsRmlsdGVyOiBEaWN0PGJvb2xlYW4+O1xuXG4gIC8qKiBIYXNoc2V0IG9mIGEgZm9ybXVsYSBvYmplY3QgKi9cbiAgY2FsY3VsYXRlOiBEaWN0PEZvcm11bGE+O1xuXG4gIC8qKiBGaWx0ZXIgdGVzdCBleHByZXNzaW9uICovXG4gIGZpbHRlcjogc3RyaW5nO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYSBiaW4gcGFyYW1ldGVyIGhhc2ggdG8gdHJhbnNmb3JtcyBvZiB0aGUgYmlubmVkIGZpZWxkICovXG4gIGJpbjogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGFuIG91dHB1dCBmaWVsZCBuYW1lIChoYXNoKSB0byB0aGUgdGltZSB1bml0IHRyYW5zZm9ybSAgKi9cbiAgdGltZVVuaXQ6IERpY3Q8VmdUcmFuc2Zvcm0+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIGZpZWxkcyB0byBiZSBmaWx0ZXJlZCAqL1xuICBub25Qb3NpdGl2ZUZpbHRlcjogRGljdDxib29sZWFuPjtcblxuICAvKiogRGF0YSBzb3VyY2UgZm9yIGZlZWRpbmcgc3RhY2tlZCBzY2FsZS4gKi9cbiAgLy8gVE9ETzogbmVlZCB0byByZXZpc2UgaWYgc2luZ2xlIFZnRGF0YSBpcyBzdWZmaWNpZW50IHdpdGggbGF5ZXIgLyBjb25jYXRcbiAgc3RhY2tTY2FsZTogVmdEYXRhO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYW4gb3V0cHV0IGZpZWxkIG5hbWUgKGhhc2gpIHRvIHRoZSBzb3J0IGFuZCByYW5rIHRyYW5zZm9ybXMgICovXG4gIGNvbG9yUmFuazogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiB0aW1lIHVuaXRzIHRoYXQgbmVlZCB0aGVpciBvd24gZGF0YSBzb3VyY2VzIGZvciBzY2FsZSBkb21haW4gKi9cbiAgdGltZVVuaXREb21haW46IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2Ygc3VtbWFyeSBjb21wb25lbnQgb2JqZWN0IGZvciBwcm9kdWNpbmcgc3VtbWFyeSAoYWdncmVnYXRlKSBkYXRhIHNvdXJjZSAqL1xuICBzdW1tYXJ5OiBTdW1tYXJ5Q29tcG9uZW50W107XG59XG5cbi8qKlxuICogQ29tcG9zYWJsZSBjb21wb25lbnQgZm9yIGEgbW9kZWwncyBzdW1tYXJ5IGRhdGFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdW1tYXJ5Q29tcG9uZW50IHtcbiAgLyoqIE5hbWUgb2YgdGhlIHN1bW1hcnkgZGF0YSBzb3VyY2UgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBTdHJpbmcgc2V0IGZvciBhbGwgZGltZW5zaW9uIGZpZWxkcyAgKi9cbiAgZGltZW5zaW9uczogU3RyaW5nU2V0O1xuXG4gIC8qKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSB0byBzdHJpbmcgc2V0IG9mIGFnZ3JlZ2F0ZSBvcHMgKi9cbiAgbWVhc3VyZXM6IERpY3Q8U3RyaW5nU2V0Pjtcbn1cblxuLy8gVE9ETzogc3BsaXQgdGhpcyBmaWxlIGludG8gbXVsdGlwbGUgZmlsZXMgYW5kIHJlbW92ZSB0aGlzIGxpbnRlciBmbGFnXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdERhdGEobW9kZWw6IFVuaXRNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG51bGxGaWx0ZXI6IG51bGxGaWx0ZXIucGFyc2VVbml0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuXG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VVbml0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VVbml0KG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VVbml0KG1vZGVsKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldERhdGEobW9kZWw6IEZhY2V0TW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VGYWNldChtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VGYWNldChtb2RlbCksXG5cbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VGYWNldChtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VGYWNldChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VGYWNldChtb2RlbClcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXJEYXRhKG1vZGVsOiBMYXllck1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgLy8gZmlsdGVyIGFuZCBmb3JtYXRQYXJzZSBjb3VsZCBjYXVzZSB1cyB0byBub3QgYmUgYWJsZSB0byBtZXJnZSBpbnRvIHBhcmVudFxuICAgIC8vIHNvIGxldCdzIHBhcnNlIHRoZW0gZmlyc3RcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VMYXllcihtb2RlbCksXG5cbiAgICAvLyBldmVyeXRoaW5nIGFmdGVyIGhlcmUgZG9lcyBub3QgYWZmZWN0IHdoZXRoZXIgd2UgY2FuIG1lcmdlIGNoaWxkIGRhdGEgaW50byBwYXJlbnQgb3Igbm90XG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgYmluOiBiaW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICB0aW1lVW5pdERvbWFpbjogdGltZVVuaXREb21haW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGNvbG9yUmFuazogY29sb3JSYW5rLnBhcnNlTGF5ZXIobW9kZWwpXG4gIH07XG59XG5cblxuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuLyoqXG4gKiBDcmVhdGVzIFZlZ2EgRGF0YSBhcnJheSBmcm9tIGEgZ2l2ZW4gY29tcGlsZWQgbW9kZWwgYW5kIGFwcGVuZCBhbGwgb2YgdGhlbSB0byB0aGUgZ2l2ZW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0gIG1vZGVsXG4gKiBAcGFyYW0gIGRhdGEgYXJyYXlcbiAqIEByZXR1cm4gbW9kaWZpZWQgZGF0YSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVEYXRhKG1vZGVsOiBNb2RlbCwgZGF0YTogVmdEYXRhW10pIHtcbiAgY29uc3QgY29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmRhdGE7XG5cbiAgY29uc3Qgc291cmNlRGF0YSA9IHNvdXJjZS5hc3NlbWJsZShtb2RlbCwgY29tcG9uZW50KTtcbiAgaWYgKHNvdXJjZURhdGEpIHtcbiAgICBkYXRhLnB1c2goc291cmNlRGF0YSk7XG4gIH1cblxuICBzdW1tYXJ5LmFzc2VtYmxlKGNvbXBvbmVudCwgbW9kZWwpLmZvckVhY2goZnVuY3Rpb24oc3VtbWFyeURhdGEpIHtcbiAgICBkYXRhLnB1c2goc3VtbWFyeURhdGEpO1xuICB9KTtcblxuICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGF0YVRhYmxlID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gY29sb3IgcmFua1xuICAgIGNvbnN0IGNvbG9yUmFua1RyYW5zZm9ybSA9IGNvbG9yUmFuay5hc3NlbWJsZShjb21wb25lbnQpO1xuICAgIGlmIChjb2xvclJhbmtUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQoY29sb3JSYW5rVHJhbnNmb3JtKTtcbiAgICB9XG5cbiAgICAvLyBub25Qb3NpdGl2ZUZpbHRlclxuICAgIGNvbnN0IG5vblBvc2l0aXZlRmlsdGVyVHJhbnNmb3JtID0gbm9uUG9zaXRpdmVGaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgICBpZiAobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5cyhjb21wb25lbnQuY29sb3JSYW5rKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sb3JSYW5rIG5vdCBtZXJnZWQnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMoY29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbm9uUG9zaXRpdmVGaWx0ZXIgbm90IG1lcmdlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN0YWNrXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGlzIGFjdHVhbGx5IHNob3VsZCBiZSBhbiBhcnJheVxuICBjb25zdCBzdGFja0RhdGEgPSBzdGFja1NjYWxlLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gIGlmIChzdGFja0RhdGEpIHtcbiAgICBkYXRhLnB1c2goc3RhY2tEYXRhKTtcbiAgfVxuXG4gIHRpbWVVbml0RG9tYWluLmFzc2VtYmxlKGNvbXBvbmVudCkuZm9yRWFjaChmdW5jdGlvbih0aW1lVW5pdERvbWFpbkRhdGEpIHtcbiAgICBkYXRhLnB1c2godGltZVVuaXREb21haW5EYXRhKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHtEYXRlVGltZSwgZGF0ZVRpbWVFeHByLCBpc0RhdGVUaW1lfSBmcm9tICcuLi8uLi9kYXRldGltZSc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2lzRXF1YWxGaWx0ZXIsIGlzSW5GaWx0ZXIsIGlzUmFuZ2VGaWx0ZXIsIEZpbHRlcn0gZnJvbSAnLi4vLi4vZmlsdGVyJztcbmltcG9ydCB7VGltZVVuaXQsIGZpZWxkRXhwciBhcyB0aW1lVW5pdEZpZWxkRXhwciwgaXNTaW5nbGVUaW1lVW5pdH0gZnJvbSAnLi4vLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZ30gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBmaWx0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHYgdmFsdWUgdG8gYmUgY29udmVydGVkIGludG8gVmVnYSBFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB0aW1lVW5pdFxuICAgKiBAcmV0dXJuIFZlZ2EgRXhwcmVzc2lvbiBvZiB0aGUgdmFsdWUgdi4gVGhpcyBjb3VsZCBiZSBvbmUgb2Y6XG4gICAqIC0gYSB0aW1lc3RhbXAgdmFsdWUgb2YgZGF0ZXRpbWUgb2JqZWN0XG4gICAqIC0gYSB0aW1lc3RhbXAgdmFsdWUgb2YgY2FzdGVkIHNpbmdsZSB0aW1lIHVuaXQgdmFsdWVcbiAgICogLSBzdHJpbmdpZmllZCB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsdWVFeHByKHY6IGFueSwgdGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gICAgaWYgKGlzRGF0ZVRpbWUodikpIHtcbiAgICAgIGNvbnN0IGV4cHIgPSBkYXRlVGltZUV4cHIodiwgdHJ1ZSk7XG4gICAgICByZXR1cm4gJ3RpbWUoJyArIGV4cHIgKyAnKSc7XG4gICAgfVxuICAgIGlmIChpc1NpbmdsZVRpbWVVbml0KHRpbWVVbml0KSkge1xuICAgICAgY29uc3QgZGF0ZXRpbWU6IERhdGVUaW1lID0ge307XG4gICAgICBkYXRldGltZVt0aW1lVW5pdF0gPSB2O1xuICAgICAgY29uc3QgZXhwciA9IGRhdGVUaW1lRXhwcihkYXRldGltZSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gJ3RpbWUoJyArIGV4cHIgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJFeHByZXNzaW9uKGZpbHRlcjogRmlsdGVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKGlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIgYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7IC8vIEZpbHRlciBPYmplY3RcbiAgICAgIGNvbnN0IGZpZWxkRXhwciA9IGZpbHRlci50aW1lVW5pdCA/XG4gICAgICAgIC8vIEZvciB0aW1lVW5pdCwgY2FzdCBpbnRvIGludGVnZXIgd2l0aCB0aW1lKCkgc28gd2UgY2FuIHVzZSA9PT0sIGlucmFuZ2UsIGluZGV4T2YgdG8gY29tcGFyZSB2YWx1ZXMgZGlyZWN0bHkuXG4gICAgICAgICAgLy8gVE9ETzogV2UgY2FsY3VsYXRlIHRpbWVVbml0IG9uIHRoZSBmbHkgaGVyZS4gQ29uc2lkZXIgaWYgd2Ugd291bGQgbGlrZSB0byBjb25zb2xpZGF0ZSB0aGlzIHdpdGggdGltZVVuaXQgcGlwZWxpbmVcbiAgICAgICAgICAvLyBUT0RPOiBzdXBwb3J0IHV0Y1xuICAgICAgICAoJ3RpbWUoJyArIHRpbWVVbml0RmllbGRFeHByKGZpbHRlci50aW1lVW5pdCwgZmlsdGVyLmZpZWxkKSArICcpJykgOlxuICAgICAgICBmaWVsZChmaWx0ZXIsIHtkYXR1bTogdHJ1ZX0pO1xuXG4gICAgICBpZiAoaXNFcXVhbEZpbHRlcihmaWx0ZXIpKSB7XG4gICAgICAgIHJldHVybiBmaWVsZEV4cHIgKyAnPT09JyArIHZhbHVlRXhwcihmaWx0ZXIuZXF1YWwsIGZpbHRlci50aW1lVW5pdCk7XG4gICAgICB9IGVsc2UgaWYgKGlzSW5GaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgICByZXR1cm4gJ2luZGV4b2YoWycgK1xuICAgICAgICAgIGZpbHRlci5pbi5tYXAoKHYpID0+IHZhbHVlRXhwcih2LCBmaWx0ZXIudGltZVVuaXQpKS5qb2luKCcsJykgK1xuICAgICAgICAgICddLCAnICsgZmllbGRFeHByICsgJykgIT09IC0xJztcbiAgICAgIH0gZWxzZSBpZiAoaXNSYW5nZUZpbHRlcihmaWx0ZXIpKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gZmlsdGVyLnJhbmdlWzBdO1xuICAgICAgICBjb25zdCB1cHBlciA9IGZpbHRlci5yYW5nZVsxXTtcblxuICAgICAgICBpZiAobG93ZXIgIT09IG51bGwgJiYgIHVwcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICdpbnJhbmdlKCcgKyBmaWVsZEV4cHIgKyAnLCAnICtcbiAgICAgICAgICAgIHZhbHVlRXhwcihsb3dlciwgZmlsdGVyLnRpbWVVbml0KSArICcsICcgK1xuICAgICAgICAgICAgdmFsdWVFeHByKHVwcGVyLCBmaWx0ZXIudGltZVVuaXQpICsgJyknO1xuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZpZWxkRXhwciArICcgPj0gJyArIGxvd2VyO1xuICAgICAgICB9IGVsc2UgaWYgKHVwcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZpZWxkRXhwciArICcgPD0gJyArIHVwcGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBtb2RlbC50cmFuc2Zvcm0oKS5maWx0ZXI7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgcmV0dXJuICcoJyArXG4gICAgICAgIGZpbHRlci5tYXAoKGYpID0+IGdldEZpbHRlckV4cHJlc3Npb24oZikpXG4gICAgICAgICAgLmZpbHRlcigoZikgPT4gZiAhPT11bmRlZmluZWQpXG4gICAgICAgICAgLmpvaW4oJykgJiYgKCcpICtcbiAgICAgICAgJyknO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyKSB7XG4gICAgICByZXR1cm4gZ2V0RmlsdGVyRXhwcmVzc2lvbihmaWx0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSBidXQgaGFzIGZpbHRlciwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyKSB7XG4gICAgICAvLyBtZXJnZSBieSBhZGRpbmcgJiZcbiAgICAgIGZpbHRlckNvbXBvbmVudCA9XG4gICAgICAgIChmaWx0ZXJDb21wb25lbnQgPyBmaWx0ZXJDb21wb25lbnQgKyAnICYmICcgOiAnJykgK1xuICAgICAgICBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIE5vdGUgdGhhdCB0aGlzIGBmaWx0ZXIucGFyc2VMYXllcmAgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgYHNvdXJjZS5wYXJzZUxheWVyYFxuICAgIGxldCBmaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlciAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyID09PSBmaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgICAgLy8gc2FtZSBmaWx0ZXIgaW4gY2hpbGQgc28gd2UgY2FuIGp1c3QgZGVsZXRlIGl0XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgY29uc3QgZmlsdGVyID0gY29tcG9uZW50LmZpbHRlcjtcbiAgICByZXR1cm4gZmlsdGVyID8gW3tcbiAgICAgIHR5cGU6ICdmaWx0ZXInLFxuICAgICAgdGVzdDogZmlsdGVyXG4gICAgfV0gOiBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGaWVsZERlZiwgaXNDb3VudH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCBkaWZmZXIsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGZvcm1hdFBhcnNlIHtcbiAgLy8gVE9ETzogbmVlZCB0byB0YWtlIGNhbGN1bGF0ZSBpbnRvIGFjY291bnQgYWNyb3NzIGxldmVscyB3aGVuIG1lcmdpbmdcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxzdHJpbmc+IHtcbiAgICBjb25zdCBjYWxjRmllbGRNYXAgPSAobW9kZWwudHJhbnNmb3JtKCkuY2FsY3VsYXRlIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oZmllbGRNYXAsIGZvcm11bGEpIHtcbiAgICAgIGZpZWxkTWFwW2Zvcm11bGEuZmllbGRdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmaWVsZE1hcDtcbiAgICB9LCB7fSk7XG5cbiAgICBsZXQgcGFyc2VDb21wb25lbnQ6IERpY3Q8c3RyaW5nPiA9IHt9O1xuICAgIC8vIHVzZSBmb3JFYWNoIHJhdGhlciB0aGFuIHJlZHVjZSBzbyB0aGF0IGl0IGNhbiByZXR1cm4gdW5kZWZpbmVkXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gcGFyc2UgbmVlZGVkXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgICBwYXJzZUNvbXBvbmVudFtmaWVsZERlZi5maWVsZF0gPSAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBpZiAoaXNDb3VudChmaWVsZERlZikgfHwgY2FsY0ZpZWxkTWFwW2ZpZWxkRGVmLmZpZWxkXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZUNvbXBvbmVudFtmaWVsZERlZi5maWVsZF0gPSAnbnVtYmVyJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgcGFyc2VDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgYnV0IGhhcyBpdHMgb3duIHBhcnNlLCB0aGVuIG1lcmdlXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKSB7XG4gICAgICBleHRlbmQocGFyc2VDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcbiAgICBsZXQgcGFyc2VDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UsIHBhcnNlQ29tcG9uZW50KSkge1xuICAgICAgICAvLyBtZXJnZSBwYXJzZSB1cCBpZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhbiBpbmNvbXBhdGlibGUgcGFyc2VcbiAgICAgICAgZXh0ZW5kKHBhcnNlQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIC8vIEFzc2VtYmxlIGZvciBmb3JtYXRQYXJzZSBpcyBhbiBpZGVudGl0eSBmdW5jdGlvbiwgbm8gbmVlZCB0byBkZWNsYXJlXG59XG4iLCJpbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uLy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgaGFzaCwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIGZvcm11bGEge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PEZvcm11bGE+IHtcbiAgICByZXR1cm4gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKGZvcm11bGFDb21wb25lbnQsIGZvcm11bGEpIHtcbiAgICAgIGZvcm11bGFDb21wb25lbnRbaGFzaChmb3JtdWxhKV0gPSBmb3JtdWxhO1xuICAgICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gICAgfSwge30gYXMgRGljdDxGb3JtdWxhPik7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgZm9ybXVsYUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKGZvcm11bGFDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGU7XG4gICAgfVxuICAgIHJldHVybiBmb3JtdWxhQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgZm9ybXVsYUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlKSB7XG4gICAgICAgIGV4dGVuZChmb3JtdWxhQ29tcG9uZW50IHx8IHt9LCBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIHZhbHMoY29tcG9uZW50LmNhbGN1bGF0ZSkucmVkdWNlKGZ1bmN0aW9uKHRyYW5zZm9ybSwgZm9ybXVsYSkge1xuICAgICAgdHJhbnNmb3JtLnB1c2goZXh0ZW5kKHsgdHlwZTogJ2Zvcm11bGEnIH0sIGZvcm11bGEpKTtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgfSwgW10pO1xuICB9XG59XG4iLCJpbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBGaWx0ZXIgbm9uLXBvc2l0aXZlIHZhbHVlIGZvciBsb2cgc2NhbGVcbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBub25Qb3NpdGl2ZUZpbHRlciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIG1vZGVsLmNoYW5uZWxzKCkucmVkdWNlKGZ1bmN0aW9uKG5vblBvc2l0aXZlQ29tcG9uZW50LCBjaGFubmVsKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgaWYgKCFtb2RlbC5maWVsZChjaGFubmVsKSB8fCAhc2NhbGUpIHtcbiAgICAgICAgLy8gZG9uJ3Qgc2V0IGFueXRoaW5nXG4gICAgICAgIHJldHVybiBub25Qb3NpdGl2ZUNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIG5vblBvc2l0aXZlQ29tcG9uZW50W21vZGVsLmZpZWxkKGNoYW5uZWwpXSA9IHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5MT0c7XG4gICAgICByZXR1cm4gbm9uUG9zaXRpdmVDb21wb25lbnQ7XG4gICAgfSwge30gYXMgRGljdDxib29sZWFuPik7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBjb25zaWRlciBtZXJnaW5nXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBGb3Igbm93LCBsZXQncyBhc3N1bWUgaXQgYWx3YXlzIGhhcyB1bmlvbiBzY2FsZVxuICAgICAgY29uc3Qgbm9uUG9zaXRpdmVGaWx0ZXJDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgcmV0dXJuIG5vblBvc2l0aXZlRmlsdGVyQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4ge30gYXMgRGljdDxib29sZWFuPjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuICAgIGxldCBub25Qb3NpdGl2ZUZpbHRlciA9IHt9IGFzIERpY3Q8Ym9vbGVhbj47XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlciwgbm9uUG9zaXRpdmVGaWx0ZXIpKSB7XG4gICAgICAgIGV4dGVuZChub25Qb3NpdGl2ZUZpbHRlciwgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBub25Qb3NpdGl2ZUZpbHRlcjtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4ga2V5cyhjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIC8vIE9ubHkgZmlsdGVyIGZpZWxkcyAoa2V5cykgd2l0aCB2YWx1ZSA9IHRydWVcbiAgICAgIHJldHVybiBjb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXJbZmllbGRdO1xuICAgIH0pLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6ICdkYXR1bS4nICsgZmllbGQgKyAnID4gMCdcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBkaWZmZXIsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmNvbnN0IERFRkFVTFRfTlVMTF9GSUxURVJTID0ge1xuICBub21pbmFsOiBmYWxzZSxcbiAgb3JkaW5hbDogZmFsc2UsXG4gIHF1YW50aXRhdGl2ZTogdHJ1ZSxcbiAgdGVtcG9yYWw6IHRydWVcbn07XG5cbi8vIFRPRE86IHJlbmFtZSB0byBpbnZhbGlkRmlsdGVyXG5leHBvcnQgbmFtZXNwYWNlIG51bGxGaWx0ZXIge1xuICAvKiogUmV0dXJuIEhhc2hzZXQgb2YgZmllbGRzIGZvciBudWxsIGZpbHRlcmluZyAoa2V5PWZpZWxkLCB2YWx1ZSA9IHRydWUpLiAqL1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PGJvb2xlYW4+IHtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBtb2RlbC50cmFuc2Zvcm0oKTtcbiAgICBsZXQgZmlsdGVySW52YWxpZCA9IHRyYW5zZm9ybS5maWx0ZXJJbnZhbGlkO1xuXG4gICAgaWYgKGZpbHRlckludmFsaWQgPT09IHVuZGVmaW5lZCAmJiB0cmFuc2Zvcm1bJ2ZpbHRlck51bGwnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaWx0ZXJJbnZhbGlkID0gdHJhbnNmb3JtWydmaWx0ZXJOdWxsJ107XG4gICAgICBjb25zb2xlLndhcm4oJ2ZpbHRlck51bGwgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBmaWx0ZXJJbnZhbGlkIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihhZ2dyZWdhdG9yLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICAgIGlmIChmaWx0ZXJJbnZhbGlkIHx8XG4gICAgICAgIChmaWx0ZXJJbnZhbGlkID09PSB1bmRlZmluZWQgJiYgZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQgIT09ICcqJyAmJiBERUZBVUxUX05VTExfRklMVEVSU1tmaWVsZERlZi50eXBlXSkpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmaW5lIHRoaXMgc28gd2Uga25vdyB0aGF0IHdlIGRvbid0IGZpbHRlciBudWxscyBmb3IgdGhpcyBmaWVsZFxuICAgICAgICAvLyB0aGlzIG1ha2VzIGl0IGVhc2llciB0byBtZXJnZSBpbnRvIHBhcmVudHNcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZERlZi5maWVsZF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuXG4gICAgLy8gRklYTUU6IG51bGwgZmlsdGVycyBhcmUgbm90IHByb3Blcmx5IHByb3BhZ2F0ZWQgcmlnaHQgbm93XG4gICAgbGV0IG51bGxGaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyLCBudWxsRmlsdGVyQ29tcG9uZW50KSkge1xuICAgICAgICBleHRlbmQobnVsbEZpbHRlckNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm51bGxGaWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbEZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKiBDb252ZXJ0IHRoZSBoYXNoc2V0IG9mIGZpZWxkcyB0byBhIGZpbHRlciB0cmFuc2Zvcm0uICAqL1xuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgY29uc3QgZmlsdGVyZWRGaWVsZHMgPSBrZXlzKGNvbXBvbmVudC5udWxsRmlsdGVyKS5maWx0ZXIoKGZpZWxkKSA9PiB7XG4gICAgICAvLyBvbmx5IGluY2x1ZGUgZmllbGRzIHRoYXQgaGFzIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5udWxsRmlsdGVyW2ZpZWxkXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRGaWVsZHMubGVuZ3RoID4gMCA/XG4gICAgICBbe1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogZmlsdGVyZWRGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkTmFtZSkge1xuICAgICAgICAgIHJldHVybiAnKGRhdHVtLicgKyBmaWVsZE5hbWUgKyAnIT09bnVsbCcgK1xuICAgICAgICAgICAgJyAmJiAhaXNOYU4oZGF0dW0uJysgZmllbGROYW1lICsgJykpJztcbiAgICAgICAgfSkuam9pbignICYmICcpXG4gICAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0RhdGFGb3JtYXQsIFNPVVJDRX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHNvdXJjZSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFZnRGF0YSB7XG4gICAgbGV0IGRhdGEgPSBtb2RlbC5kYXRhKCk7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBleHBsaWNpdGx5IHByb3ZpZGVkXG5cbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSB7IG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkgfTtcbiAgICAgIGlmIChkYXRhLnZhbHVlcyAmJiBkYXRhLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNvdXJjZURhdGEudmFsdWVzID0gZGF0YS52YWx1ZXM7XG4gICAgICAgIHNvdXJjZURhdGEuZm9ybWF0ID0geyB0eXBlOiAnanNvbicgfTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS51cmwpIHtcbiAgICAgICAgc291cmNlRGF0YS51cmwgPSBkYXRhLnVybDtcblxuICAgICAgICAvLyBFeHRyYWN0IGV4dGVuc2lvbiBmcm9tIFVSTCB1c2luZyBzbmlwcGV0IGZyb21cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82ODA5MjkvaG93LXRvLWV4dHJhY3QtZXh0ZW5zaW9uLWZyb20tZmlsZW5hbWUtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICAgICAgbGV0IGRlZmF1bHRFeHRlbnNpb24gPSAvKD86XFwuKFteLl0rKSk/JC8uZXhlYyhzb3VyY2VEYXRhLnVybClbMV07XG4gICAgICAgIGlmICghY29udGFpbnMoWydqc29uJywgJ2NzdicsICd0c3YnLCAndG9wb2pzb24nXSwgZGVmYXVsdEV4dGVuc2lvbikpIHtcbiAgICAgICAgICBkZWZhdWx0RXh0ZW5zaW9uID0gJ2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtYXQ6IERhdGFGb3JtYXQgPSBkYXRhLmZvcm1hdCB8fCB7fTtcblxuICAgICAgICAvLyBGb3IgYmFja3dhcmQgY29tcGF0YWJpbGl0eSBmb3IgZm9ybWVyIGBkYXRhLmZvcm1hdFR5cGVgIHByb3BlcnR5XG4gICAgICAgIGNvbnN0IGZvcm1hdFR5cGU6IERhdGFGb3JtYXQgPSBkYXRhRm9ybWF0LnR5cGUgfHwgZGF0YVsnZm9ybWF0VHlwZSddO1xuICAgICAgICBzb3VyY2VEYXRhLmZvcm1hdCA9XG4gICAgICAgICAgZXh0ZW5kKFxuICAgICAgICAgICAgeyB0eXBlOiBmb3JtYXRUeXBlID8gZm9ybWF0VHlwZSA6IGRlZmF1bHRFeHRlbnNpb24gfSxcbiAgICAgICAgICAgIGRhdGFGb3JtYXQucHJvcGVydHkgPyB7IHByb3BlcnR5OiBkYXRhRm9ybWF0LnByb3BlcnR5IH0gOiB7fSxcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgYW5kIG1lc2ggYXJlIHR3byBtdXR1YWxseSBleGNsdXNpdmUgcHJvcGVydGllc1xuICAgICAgICAgICAgZGF0YUZvcm1hdC5mZWF0dXJlID9cbiAgICAgICAgICAgICAgeyBmZWF0dXJlIDogZGF0YUZvcm1hdC5mZWF0dXJlIH0gOlxuICAgICAgICAgICAgZGF0YUZvcm1hdC5tZXNoID9cbiAgICAgICAgICAgICAgeyBtZXNoIDogZGF0YUZvcm1hdC5tZXNoIH0gOlxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgICB9IGVsc2UgaWYgKCFtb2RlbC5wYXJlbnQoKSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBub3QgZXhwbGljaXRseSBwcm92aWRlZCBidXQgdGhlIG1vZGVsIGlzIGEgcm9vdCxcbiAgICAgIC8vIG5lZWQgdG8gcHJvZHVjZSBhIHNvdXJjZSBhcyB3ZWxsXG4gICAgICByZXR1cm4geyBuYW1lOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBpZiAoIW1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGEuc291cmNlKSB7XG4gICAgICAvLyBJZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBpdHMgb3duIHNvdXJjZSwgaGF2ZSB0byByZW5hbWUgaXRzIHNvdXJjZS5cbiAgICAgIG1vZGVsLmNoaWxkKCkucmVuYW1lRGF0YShtb2RlbC5jaGlsZCgpLmRhdGFOYW1lKFNPVVJDRSksIG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpKSB7XG4gICAgICAgIC8vIHdlIGNhbm5vdCBtZXJnZSBpZiB0aGUgY2hpbGQgaGFzIGZpbHRlcnMgZGVmaW5lZCBldmVuIGFmdGVyIHdlIHRyaWVkIHRvIG1vdmUgdGhlbSB1cFxuICAgICAgICBjb25zdCBjYW5NZXJnZSA9ICFjaGlsZERhdGEuZmlsdGVyICYmICFjaGlsZERhdGEuZm9ybWF0UGFyc2UgJiYgIWNoaWxkRGF0YS5udWxsRmlsdGVyO1xuICAgICAgICBpZiAoY2FuTWVyZ2UpIHtcbiAgICAgICAgICAvLyByZW5hbWUgc291cmNlIGJlY2F1c2Ugd2UgY2FuIGp1c3QgcmVtb3ZlIGl0XG4gICAgICAgICAgY2hpbGQucmVuYW1lRGF0YShjaGlsZC5kYXRhTmFtZShTT1VSQ0UpLCBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpKTtcbiAgICAgICAgICBkZWxldGUgY2hpbGREYXRhLnNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjaGlsZCBkb2VzIG5vdCBoYXZlIGRhdGEgZGVmaW5lZCBvciB0aGUgc2FtZSBzb3VyY2Ugc28ganVzdCB1c2UgdGhlIHBhcmVudHMgc291cmNlXG4gICAgICAgICAgY2hpbGREYXRhLnNvdXJjZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNoaWxkLmRhdGFOYW1lKFNPVVJDRSksXG4gICAgICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSlcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUobW9kZWw6IE1vZGVsLCBjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBpZiAoY29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgbGV0IHNvdXJjZURhdGE6IFZnRGF0YSA9IGNvbXBvbmVudC5zb3VyY2U7XG5cbiAgICAgIGlmIChjb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQgPSBjb21wb25lbnQuc291cmNlLmZvcm1hdCB8fCB7fTtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQucGFyc2UgPSBjb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIG51bGwgZmlsdGVyIGNvbWVzIGZpcnN0IHNvIHRyYW5zZm9ybXMgYXJlIG5vdCBwZXJmb3JtZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgIC8vIHRpbWUgYW5kIGJpbiBzaG91bGQgY29tZSBiZWZvcmUgZmlsdGVyIHNvIHdlIGNhbiBmaWx0ZXIgYnkgdGltZSBhbmQgYmluXG4gICAgICBzb3VyY2VEYXRhLnRyYW5zZm9ybSA9IFtdLmNvbmNhdChcbiAgICAgICAgbnVsbEZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBmb3JtdWxhLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIGZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBiaW4uYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgdGltZVVuaXQuYXNzZW1ibGUoY29tcG9uZW50KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQUNLRURfU0NBTEUsIFNVTU1BUll9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogU3RhY2tlZCBzY2FsZSBkYXRhIHNvdXJjZSwgZm9yIGZlZWRpbmcgdGhlIHNoYXJlZCBzY2FsZS5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBzdGFja1NjYWxlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogVW5pdE1vZGVsKTogVmdEYXRhIHtcbiAgICBjb25zdCBzdGFja1Byb3BzID0gbW9kZWwuc3RhY2soKTtcblxuICAgIGlmIChzdGFja1Byb3BzKSB7XG4gICAgICAvLyBwcm9kdWNlIHN0YWNrZWQgc2NhbGVcbiAgICAgIGNvbnN0IGdyb3VwYnlDaGFubmVsID0gc3RhY2tQcm9wcy5ncm91cGJ5Q2hhbm5lbDtcbiAgICAgIGNvbnN0IGZpZWxkQ2hhbm5lbCA9IHN0YWNrUHJvcHMuZmllbGRDaGFubmVsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSksXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSksIC8vIGFsd2F5cyBzdW1tYXJ5IGJlY2F1c2Ugc3RhY2tlZCBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRpb25cbiAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgIC8vIGdyb3VwIGJ5IGNoYW5uZWwgYW5kIG90aGVyIGZhY2V0c1xuICAgICAgICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChncm91cGJ5Q2hhbm5lbCldLFxuICAgICAgICAgIC8vIHByb2R1Y2Ugc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgICAgIHN1bW1hcml6ZTogW3sgb3BzOiBbJ3N1bSddLCBmaWVsZDogbW9kZWwuZmllbGQoZmllbGRDaGFubmVsKSB9XVxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBjb25zdCBjaGlsZCA9IG1vZGVsLmNoaWxkKCk7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgYnV0IGhhcyBzdGFjayBzY2FsZSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN0YWNrU2NhbGUpIHtcbiAgICAgIGxldCBzdGFja0NvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuXG4gICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSk7XG4gICAgICBjaGlsZC5yZW5hbWVEYXRhKHN0YWNrQ29tcG9uZW50Lm5hbWUsIG5ld05hbWUpO1xuICAgICAgc3RhY2tDb21wb25lbnQubmFtZSA9IG5ld05hbWU7XG5cbiAgICAgIC8vIFJlZmVyIHRvIGZhY2V0J3Mgc3VtbWFyeSBpbnN0ZWFkIChhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uKVxuICAgICAgc3RhY2tDb21wb25lbnQuc291cmNlID0gbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSk7XG5cbiAgICAgIC8vIEFkZCBtb3JlIGRpbWVuc2lvbnMgZm9yIHJvdy9jb2x1bW5cbiAgICAgIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5ID0gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGdyb3VwYnksIGZpZWxkRGVmKSB7XG4gICAgICAgIGdyb3VwYnkucHVzaChmaWVsZChmaWVsZERlZikpO1xuICAgICAgICByZXR1cm4gZ3JvdXBieTtcbiAgICAgIH0sIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5KTtcblxuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuICAgICAgcmV0dXJuIHN0YWNrQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gVE9ET1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQuc3RhY2tTY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi4vLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtrZXlzLCB2YWxzLCByZWR1Y2UsIGhhc2gsIERpY3QsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnQsIFN1bW1hcnlDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBzdW1tYXJ5IHtcbiAgZnVuY3Rpb24gYWRkRGltZW5zaW9uKGRpbXM6IHsgW2ZpZWxkOiBzdHJpbmddOiBib29sZWFuIH0sIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KV0gPSB0cnVlO1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KV0gPSB0cnVlO1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KV0gPSB0cnVlO1xuXG4gICAgICAvLyBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgLy8gaWYgKHNjYWxlVHlwZShzY2FsZSwgZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSkgPT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgICAvLyBhbHNvIHByb2R1Y2UgYmluX3JhbmdlIGlmIHRoZSBiaW5uZWQgZmllbGQgdXNlIG9yZGluYWwgc2NhbGVcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3JhbmdlJyB9KV0gPSB0cnVlO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmKV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZGltcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IE1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICAvKiBzdHJpbmcgc2V0IGZvciBkaW1lbnNpb25zICovXG4gICAgbGV0IGRpbXM6IFN0cmluZ1NldCA9IHt9O1xuXG4gICAgLyogZGljdGlvbmFyeSBtYXBwaW5nIGZpZWxkIG5hbWUgPT4gZGljdCBzZXQgb2YgYWdncmVnYXRpb24gZnVuY3Rpb25zICovXG4gICAgbGV0IG1lYXM6IERpY3Q8U3RyaW5nU2V0PiA9IHt9O1xuXG4gICAgbW9kZWwuZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9PT0gQWdncmVnYXRlT3AuQ09VTlQpIHtcbiAgICAgICAgICBtZWFzWycqJ10gPSBtZWFzWycqJ10gfHwge307XG4gICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgICBtZWFzWycqJ11bJ2NvdW50J10gPSB0cnVlO1xuICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXSA9IG1lYXNbZmllbGREZWYuZmllbGRdIHx8IHt9O1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdW2ZpZWxkRGVmLmFnZ3JlZ2F0ZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGREaW1lbnNpb24oZGltcywgZmllbGREZWYpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFt7XG4gICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKSxcbiAgICAgIGRpbWVuc2lvbnM6IGRpbXMsXG4gICAgICBtZWFzdXJlczogbWVhc1xuICAgIH1dO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSBidXQgaGFzIGEgc3VtbWFyeSBkYXRhIHNvdXJjZSwgbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgIGxldCBzdW1tYXJ5Q29tcG9uZW50cyA9IGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5Lm1hcChmdW5jdGlvbihzdW1tYXJ5Q29tcG9uZW50KSB7XG4gICAgICAgIC8vIGFkZCBmYWNldCBmaWVsZHMgYXMgZGltZW5zaW9uc1xuICAgICAgICBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnMgPSBtb2RlbC5yZWR1Y2UoYWRkRGltZW5zaW9uLCBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnMpO1xuXG4gICAgICAgIGNvbnN0IHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeCA9IHN1bW1hcnlDb21wb25lbnQubmFtZS5zdWJzdHIobW9kZWwuY2hpbGQoKS5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICBtb2RlbC5jaGlsZCgpLnJlbmFtZURhdGEoc3VtbWFyeUNvbXBvbmVudC5uYW1lLCBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUgPSBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXg7XG4gICAgICAgIHJldHVybiBzdW1tYXJ5Q29tcG9uZW50O1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeTtcbiAgICAgIHJldHVybiBzdW1tYXJ5Q29tcG9uZW50cztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VNZWFzdXJlcyhwYXJlbnRNZWFzdXJlczogRGljdDxEaWN0PGJvb2xlYW4+PiwgY2hpbGRNZWFzdXJlczogRGljdDxEaWN0PGJvb2xlYW4+Pikge1xuICAgIGZvciAoY29uc3QgZmllbGQgaW4gY2hpbGRNZWFzdXJlcykge1xuICAgICAgaWYgKGNoaWxkTWVhc3VyZXMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG4gICAgICAgIC8vIHdoZW4gd2UgbWVyZ2UgYSBtZWFzdXJlLCB3ZSBlaXRoZXIgaGF2ZSB0byBhZGQgYW4gYWdncmVnYXRpb24gb3BlcmF0b3Igb3IgZXZlbiBhIG5ldyBmaWVsZFxuICAgICAgICBjb25zdCBvcHMgPSBjaGlsZE1lYXN1cmVzW2ZpZWxkXTtcbiAgICAgICAgZm9yIChjb25zdCBvcCBpbiBvcHMpIHtcbiAgICAgICAgICBpZiAob3BzLmhhc093blByb3BlcnR5KG9wKSkge1xuICAgICAgICAgICAgaWYgKGZpZWxkIGluIHBhcmVudE1lYXN1cmVzKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCBvcGVyYXRvciB0byBleGlzdGluZyBtZWFzdXJlIGZpZWxkXG4gICAgICAgICAgICAgIHBhcmVudE1lYXN1cmVzW2ZpZWxkXVtvcF0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyZW50TWVhc3VyZXNbZmllbGRdID0geyBvcDogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICAvLyBJbmRleCBieSB0aGUgZmllbGRzIHdlIGFyZSBncm91cGluZyBieVxuICAgIGxldCBzdW1tYXJpZXMgPSB7fSBhcyBEaWN0PFN1bW1hcnlDb21wb25lbnQ+O1xuXG4gICAgLy8gQ29tYmluZSBzdW1tYXJpZXMgZm9yIGNoaWxkcmVuIHRoYXQgZG9uJ3QgaGF2ZSBhIGRpc3RpbmN0IHNvdXJjZVxuICAgIC8vIChlaXRoZXIgaGF2aW5nIGl0cyBvd24gZGF0YSBzb3VyY2UsIG9yIGl0cyBvd24gdHJhbmZvcm1hdGlvbiBvZiB0aGUgc2FtZSBkYXRhIHNvdXJjZSkuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIHN1bW1hcmllcyBpZiB3ZSBjYW5cbiAgICAgICAgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkuZm9yRWFjaCgoY2hpbGRTdW1tYXJ5KSA9PiB7XG4gICAgICAgICAgLy8gVGhlIGtleSBpcyBhIGhhc2ggYmFzZWQgb24gdGhlIGRpbWVuc2lvbnM7XG4gICAgICAgICAgLy8gd2UgdXNlIGl0IHRvIGZpbmQgb3V0IHdoZXRoZXIgd2UgaGF2ZSBhIHN1bW1hcnkgdGhhdCB1c2VzIHRoZSBzYW1lIGdyb3VwIGJ5IGZpZWxkcy5cbiAgICAgICAgICBjb25zdCBrZXkgPSBoYXNoKGNoaWxkU3VtbWFyeS5kaW1lbnNpb25zKTtcbiAgICAgICAgICBpZiAoa2V5IGluIHN1bW1hcmllcykge1xuICAgICAgICAgICAgLy8geWVzLCB0aGVyZSBpcyBhIHN1bW1hcnkgaGF0IHdlIG5lZWQgdG8gbWVyZ2UgaW50b1xuICAgICAgICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBkaW1lbnNpb25zIGFyZSB0aGUgc2FtZSBzbyB3ZSBvbmx5IG5lZWQgdG8gbWVyZ2UgdGhlIG1lYXN1cmVzXG4gICAgICAgICAgICBtZXJnZU1lYXN1cmVzKHN1bW1hcmllc1trZXldLm1lYXN1cmVzLCBjaGlsZFN1bW1hcnkubWVhc3VyZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnaXZlIHRoZSBzdW1tYXJ5IGEgbmV3IG5hbWVcbiAgICAgICAgICAgIGNoaWxkU3VtbWFyeS5uYW1lID0gbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSkgKyAnXycgKyBrZXlzKHN1bW1hcmllcykubGVuZ3RoO1xuICAgICAgICAgICAgc3VtbWFyaWVzW2tleV0gPSBjaGlsZFN1bW1hcnk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVtb3ZlIHN1bW1hcnkgZnJvbSBjaGlsZFxuICAgICAgICAgIGNoaWxkLnJlbmFtZURhdGEoY2hpbGQuZGF0YU5hbWUoU1VNTUFSWSksIHN1bW1hcmllc1trZXldLm5hbWUpO1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFscyhzdW1tYXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VtYmxlIHRoZSBzdW1tYXJ5LiBOZWVkcyBhIHJlbmFtZSBmdW5jdGlvbiBiZWNhdXNlIHdlIGNhbm5vdCBndWFyYW50ZWUgdGhhdCB0aGVcbiAgICogcGFyZW50IGRhdGEgYmVmb3JlIHRoZSBjaGlsZHJlbiBkYXRhLlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCwgbW9kZWw6IE1vZGVsKTogVmdEYXRhW10ge1xuICAgIGlmICghY29tcG9uZW50LnN1bW1hcnkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zdW1tYXJ5LnJlZHVjZShmdW5jdGlvbihzdW1tYXJ5RGF0YSwgc3VtbWFyeUNvbXBvbmVudCkge1xuICAgICAgY29uc3QgZGltcyA9IHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucztcbiAgICAgIGNvbnN0IG1lYXMgPSBzdW1tYXJ5Q29tcG9uZW50Lm1lYXN1cmVzO1xuXG4gICAgICBjb25zdCBncm91cGJ5ID0ga2V5cyhkaW1zKTtcblxuICAgICAgLy8gc2hvcnQtZm9ybWF0IHN1bW1hcml6ZSBvYmplY3QgZm9yIFZlZ2EncyBhZ2dyZWdhdGUgdHJhbnNmb3JtXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmVnYS92ZWdhL3dpa2kvRGF0YS1UcmFuc2Zvcm1zIy1hZ2dyZWdhdGVcbiAgICAgIGNvbnN0IHN1bW1hcml6ZSA9IHJlZHVjZShtZWFzLCBmdW5jdGlvbihhZ2dyZWdhdG9yLCBmbkRpY3RTZXQsIGZpZWxkKSB7XG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGRdID0ga2V5cyhmbkRpY3RTZXQpO1xuICAgICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgaWYgKGtleXMobWVhcykubGVuZ3RoID4gMCkgeyAvLyBoYXMgYWdncmVnYXRlXG4gICAgICAgIHN1bW1hcnlEYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHN1bW1hcnlDb21wb25lbnQubmFtZSxcbiAgICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSksXG4gICAgICAgICAgdHJhbnNmb3JtOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgICBncm91cGJ5OiBncm91cGJ5LFxuICAgICAgICAgICAgc3VtbWFyaXplOiBzdW1tYXJpemVcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdW1tYXJ5RGF0YTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtmaWVsZEV4cHJ9IGZyb20gJy4uLy4uL3RpbWV1bml0JztcbmltcG9ydCB7VEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgdGltZVVuaXQge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PFZnVHJhbnNmb3JtPiB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdENvbXBvbmVudCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgZmllbGREZWYudGltZVVuaXQpIHtcblxuICAgICAgICBjb25zdCBoYXNoID0gZmllbGQoZmllbGREZWYpO1xuXG4gICAgICAgIHRpbWVVbml0Q29tcG9uZW50W2hhc2hdID0ge1xuICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpLFxuICAgICAgICAgIGV4cHI6IGZpZWxkRXhwcihmaWVsZERlZi50aW1lVW5pdCwgZmllbGREZWYuZmllbGQpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IHRpbWVVbml0Q29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQodGltZVVuaXRDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdCk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0O1xuICAgIH1cbiAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCB0aW1lVW5pdENvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgICBleHRlbmQodGltZVVuaXRDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdCk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIC8vIGp1c3Qgam9pbiB0aGUgdmFsdWVzLCB3aGljaCBhcmUgYWxyZWFkeSB0cmFuc2Zvcm1zXG4gICAgcmV0dXJuIHZhbHMoY29tcG9uZW50LnRpbWVVbml0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7ZGF0ZVRpbWVFeHByLCBEYXRlVGltZUV4cHJ9IGZyb20gJy4uLy4uL2RhdGV0aW1lJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VGltZVVuaXQsIHJhd0RvbWFpbn0gZnJvbSAnLi4vLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSB0aW1lVW5pdERvbWFpbiB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFN0cmluZ1NldCB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdERvbWFpbk1hcCwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgY29uc3QgZG9tYWluID0gcmF3RG9tYWluKGZpZWxkRGVmLnRpbWVVbml0LCBjaGFubmVsKTtcbiAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgIHRpbWVVbml0RG9tYWluTWFwW2ZpZWxkRGVmLnRpbWVVbml0XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lVW5pdERvbWFpbk1hcDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICAvLyBhbHdheXMgbWVyZ2Ugd2l0aCBjaGlsZFxuICAgIHJldHVybiBleHRlbmQocGFyc2UobW9kZWwpLCBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhLnRpbWVVbml0RG9tYWluKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gYWx3YXlzIG1lcmdlIHdpdGggY2hpbGRyZW5cbiAgICByZXR1cm4gZXh0ZW5kKHBhcnNlKG1vZGVsKSwgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgcmV0dXJuIGNoaWxkLmNvbXBvbmVudC5kYXRhLnRpbWVVbml0RG9tYWluO1xuICAgIH0pKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGtleXMoY29tcG9uZW50LnRpbWVVbml0RG9tYWluKS5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXREYXRhLCB0dTogYW55KSB7XG4gICAgICBjb25zdCB0aW1lVW5pdDogVGltZVVuaXQgPSB0dTsgLy8gY2FzdCBzdHJpbmcgYmFjayB0byBlbnVtXG4gICAgICBjb25zdCBkb21haW4gPSByYXdEb21haW4odGltZVVuaXQsIG51bGwpOyAvLyBGSVhNRSBmaXggcmF3RG9tYWluIHNpZ25hdHVyZVxuICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICBsZXQgZGF0ZXRpbWU6IERhdGVUaW1lRXhwciA9IHt9O1xuICAgICAgICBkYXRldGltZVt0aW1lVW5pdF0gPSAnZGF0dW0uZGF0YSc7XG5cbiAgICAgICAgdGltZVVuaXREYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHRpbWVVbml0LFxuICAgICAgICAgIHZhbHVlczogZG9tYWluLFxuICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0ZScsXG4gICAgICAgICAgICBleHByOiBkYXRlVGltZUV4cHIoZGF0ZXRpbWUpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXREYXRhO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzT3JpZW50LCBBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0ZhY2V0fSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge2NoYW5uZWxNYXBwaW5nRm9yRWFjaH0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGaWVsZERlZiwgaXNEaW1lbnNpb259IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtGYWNldFNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtnZXRGdWxsTmFtZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgdmFscywgZmxhdHRlbiwgZHVwbGljYXRlLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnTWFya0dyb3VwfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7cGFyc2VBeGlzLCBwYXJzZUlubmVyQXhpcywgZ3JpZFNob3csIHBhcnNlQXhpc0NvbXBvbmVudH0gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHthc3NlbWJsZURhdGEsIHBhcnNlRmFjZXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZUZhY2V0TGF5b3V0fSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudH0gZnJvbSAnLi9zY2FsZSc7XG5cbmV4cG9ydCBjbGFzcyBGYWNldE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICBwcml2YXRlIF9mYWNldDogRmFjZXQ7XG5cbiAgcHJpdmF0ZSBfY2hpbGQ6IE1vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IEZhY2V0U3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG5cbiAgICAvLyBDb25maWcgbXVzdCBiZSBpbml0aWFsaXplZCBiZWZvcmUgY2hpbGQgYXMgaXQgZ2V0cyBjYXNjYWRlZCB0byB0aGUgY2hpbGRcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQpO1xuXG4gICAgY29uc3QgY2hpbGQgID0gdGhpcy5fY2hpbGQgPSBidWlsZE1vZGVsKHNwZWMuc3BlYywgdGhpcywgdGhpcy5uYW1lKCdjaGlsZCcpKTtcblxuICAgIGNvbnN0IGZhY2V0ICA9IHRoaXMuX2ZhY2V0ID0gdGhpcy5faW5pdEZhY2V0KHNwZWMuZmFjZXQpO1xuICAgIHRoaXMuX3NjYWxlICA9IHRoaXMuX2luaXRTY2FsZShmYWNldCwgY29uZmlnLCBjaGlsZCk7XG4gICAgdGhpcy5fYXhpcyAgID0gdGhpcy5faW5pdEF4aXMoZmFjZXQsIGNvbmZpZywgY2hpbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgc3BlY0NvbmZpZywgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZhY2V0KGZhY2V0OiBGYWNldCkge1xuICAgIC8vIGNsb25lIHRvIHByZXZlbnQgc2lkZSBlZmZlY3QgdG8gdGhlIG9yaWdpbmFsIHNwZWNcbiAgICBmYWNldCA9IGR1cGxpY2F0ZShmYWNldCk7XG5cbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICBjaGFubmVsTWFwcGluZ0ZvckVhY2godGhpcy5jaGFubmVscygpLCBmYWNldCwgZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICAvLyBUT0RPOiBpZiBoYXMgbm8gZmllbGQgLyBkYXR1bSwgdGhlbiBkcm9wIHRoZSBmaWVsZFxuXG4gICAgICBpZiAoIWlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKGNoYW5uZWwgKyAnIGVuY29kaW5nIHNob3VsZCBiZSBvcmRpbmFsLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudHlwZSkge1xuICAgICAgICAvLyBjb252ZXJ0IHNob3J0IHR5cGUgdG8gZnVsbCB0eXBlXG4gICAgICAgIGZpZWxkRGVmLnR5cGUgPSBnZXRGdWxsTmFtZShmaWVsZERlZi50eXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFjZXQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2NhbGUoZmFjZXQ6IEZhY2V0LCBjb25maWc6IENvbmZpZywgY2hpbGQ6IE1vZGVsKTogRGljdDxTY2FsZT4ge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dLnJlZHVjZShmdW5jdGlvbihfc2NhbGUsIGNoYW5uZWwpIHtcbiAgICAgIGlmIChmYWNldFtjaGFubmVsXSkge1xuXG4gICAgICAgIGNvbnN0IHNjYWxlU3BlYyA9IGZhY2V0W2NoYW5uZWxdLnNjYWxlIHx8IHt9O1xuICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6IFNjYWxlVHlwZS5PUkRJTkFMLFxuICAgICAgICAgIHJvdW5kOiBjb25maWcuZmFjZXQuc2NhbGUucm91bmQsXG5cbiAgICAgICAgICAvLyBUT0RPOiByZXZpc2UgdGhpcyBydWxlIGZvciBtdWx0aXBsZSBsZXZlbCBvZiBuZXN0aW5nXG4gICAgICAgICAgcGFkZGluZzogKGNoYW5uZWwgPT09IFJPVyAmJiBjaGlsZC5oYXMoWSkpIHx8IChjaGFubmVsID09PSBDT0xVTU4gJiYgY2hpbGQuaGFzKFgpKSA/XG4gICAgICAgICAgICAgICAgICAgY29uZmlnLmZhY2V0LnNjYWxlLnBhZGRpbmcgOiAwXG4gICAgICAgIH0sIHNjYWxlU3BlYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGU+KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBeGlzKGZhY2V0OiBGYWNldCwgY29uZmlnOiBDb25maWcsIGNoaWxkOiBNb2RlbCk6IERpY3Q8QXhpcz4ge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dLnJlZHVjZShmdW5jdGlvbihfYXhpcywgY2hhbm5lbCkge1xuICAgICAgaWYgKGZhY2V0W2NoYW5uZWxdKSB7XG4gICAgICAgIGNvbnN0IGF4aXNTcGVjID0gZmFjZXRbY2hhbm5lbF0uYXhpcztcbiAgICAgICAgaWYgKGF4aXNTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnN0IG1vZGVsQXhpcyA9IF9heGlzW2NoYW5uZWxdID0gZXh0ZW5kKHt9LFxuICAgICAgICAgICAgY29uZmlnLmZhY2V0LmF4aXMsXG4gICAgICAgICAgICBheGlzU3BlYyA9PT0gdHJ1ZSA/IHt9IDogYXhpc1NwZWMgfHwge31cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGNoYW5uZWwgPT09IFJPVykge1xuICAgICAgICAgICAgY29uc3QgeUF4aXM6IGFueSA9IGNoaWxkLmF4aXMoWSk7XG4gICAgICAgICAgICBpZiAoeUF4aXMgJiYgeUF4aXMub3JpZW50ICE9PSBBeGlzT3JpZW50LlJJR0hUICYmICFtb2RlbEF4aXMub3JpZW50KSB7XG4gICAgICAgICAgICAgIG1vZGVsQXhpcy5vcmllbnQgPSBBeGlzT3JpZW50LlJJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIGNoaWxkLmhhcyhYKSAmJiAhbW9kZWxBeGlzLmxhYmVsQW5nbGUpIHtcbiAgICAgICAgICAgICAgbW9kZWxBeGlzLmxhYmVsQW5nbGUgPSBtb2RlbEF4aXMub3JpZW50ID09PSBBeGlzT3JpZW50LlJJR0hUID8gOTAgOiAyNzA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwdWJsaWMgZmFjZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZhY2V0O1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fZmFjZXRbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgY2hpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHN1bW1hcnkgPSB0aGlzLmNvbXBvbmVudC5kYXRhLnN1bW1hcnk7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgc3VtbWFyeS5sZW5ndGggOyBpKyspIHtcbiAgICAgIGlmIChrZXlzKHN1bW1hcnlbaV0ubWVhc3VyZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuaGFzU3VtbWFyeSgpID8gU1VNTUFSWSA6IFNPVVJDRSkgKyAnJztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIHJldHVybiB0aGlzLmZhY2V0KClbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgc3RhY2soKSB7XG4gICAgcmV0dXJuIG51bGw7IC8vIHRoaXMgaXMgb25seSBhIHByb3BlcnR5IGZvciBVbml0TW9kZWxcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlRGF0YSgpO1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZUZhY2V0RGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIHRoaXMuY29tcG9uZW50LmxheW91dCA9IHBhcnNlRmFjZXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGQoKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICBjaGlsZC5wYXJzZVNjYWxlKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHNjYWxlcyBmb3IgZmllbGQgcmVmZXJlbmNlIG9mIHBhcmVudCBkYXRhIChlLmcuLCBmb3IgU1BMT00pXG5cbiAgICAvLyBGaXJzdCwgYWRkIHNjYWxlIGZvciByb3cgYW5kIGNvbHVtbi5cbiAgICBsZXQgc2NhbGVDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG5cbiAgICAvLyBUaGVuLCBtb3ZlIHNoYXJlZC91bmlvbiBmcm9tIGl0cyBjaGlsZCBzcGVjLlxuICAgIGtleXMoY2hpbGQuY29tcG9uZW50LnNjYWxlKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgc2NhbGVcbiAgICAgIGlmICh0cnVlKSB7IC8vIGlmIHNoYXJlZC91bmlvbiBzY2FsZVxuICAgICAgICBzY2FsZUNvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcblxuICAgICAgICAvLyBmb3IgZWFjaCBzY2FsZSwgbmVlZCB0byByZW5hbWVcbiAgICAgICAgdmFscyhzY2FsZUNvbXBvbmVudFtjaGFubmVsXSkuZm9yRWFjaChmdW5jdGlvbihzY2FsZSkge1xuICAgICAgICAgIGNvbnN0IHNjYWxlTmFtZVdpdGhvdXRQcmVmaXggPSBzY2FsZS5uYW1lLnN1YnN0cihjaGlsZC5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5zY2FsZU5hbWUoc2NhbGVOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgICAgY2hpbGQucmVuYW1lU2NhbGUoc2NhbGUubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgc2NhbGUubmFtZSA9IG5ld05hbWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9uY2UgcHV0IGluIHBhcmVudCwganVzdCByZW1vdmUgdGhlIGNoaWxkJ3Mgc2NhbGUuXG4gICAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZU1hcmsoKTtcblxuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBleHRlbmQoXG4gICAgICB7XG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSgnY2VsbCcpLFxuICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgICAgdGhpcy5kYXRhVGFibGUoKSA/IHtkYXRhOiB0aGlzLmRhdGFUYWJsZSgpfSA6IHt9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhY2V0JyxcbiAgICAgICAgICAgICAgZ3JvdXBieTogW10uY29uY2F0KFxuICAgICAgICAgICAgICAgIHRoaXMuaGFzKFJPVykgPyBbdGhpcy5maWVsZChST1cpXSA6IFtdLFxuICAgICAgICAgICAgICAgIHRoaXMuaGFzKENPTFVNTikgPyBbdGhpcy5maWVsZChDT0xVTU4pXSA6IFtdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgdXBkYXRlOiBnZXRGYWNldEdyb3VwUHJvcGVydGllcyh0aGlzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQ2FsbCBjaGlsZCdzIGFzc2VtYmxlR3JvdXAgdG8gYWRkIG1hcmtzLCBzY2FsZXMsIGF4ZXMsIGFuZCBsZWdlbmRzLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbiBjYWxsIGNoaWxkJ3MgYXNzZW1ibGVHcm91cCgpIGhlcmUgYmVjYXVzZSBwYXJzZU1hcmsoKVxuICAgICAgLy8gaXMgdGhlIGxhc3QgbWV0aG9kIGluIGNvbXBpbGUoKSBhbmQgdGh1cyB0aGUgY2hpbGQgaXMgY29tcGxldGVseSBjb21waWxlZFxuICAgICAgLy8gYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMuY2hpbGQoKS5hc3NlbWJsZUdyb3VwKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpcygpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VBeGlzKCk7XG4gICAgdGhpcy5jb21wb25lbnQuYXhpcyA9IHBhcnNlQXhpc0NvbXBvbmVudCh0aGlzLCBbUk9XLCBDT0xVTU5dKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICAvLyBUT0RPOiB3aXRoIG5lc3RpbmcsIHdlIG1pZ2h0IG5lZWQgdG8gY29uc2lkZXIgY2FsbGluZyBjaGlsZFxuICAgIC8vIHRoaXMuY2hpbGQoKS5wYXJzZUF4aXNHcm91cCgpO1xuXG4gICAgY29uc3QgeEF4aXNHcm91cCA9IHBhcnNlQXhpc0dyb3VwKHRoaXMsIFgpO1xuICAgIGNvbnN0IHlBeGlzR3JvdXAgPSBwYXJzZUF4aXNHcm91cCh0aGlzLCBZKTtcblxuICAgIHRoaXMuY29tcG9uZW50LmF4aXNHcm91cCA9IGV4dGVuZChcbiAgICAgIHhBeGlzR3JvdXAgPyB7eDogeEF4aXNHcm91cH0gOiB7fSxcbiAgICAgIHlBeGlzR3JvdXAgPyB7eTogeUF4aXNHcm91cH0gOiB7fVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VHcmlkR3JvdXAoKSB7XG4gICAgLy8gVE9ETzogd2l0aCBuZXN0aW5nLCB3ZSBtaWdodCBuZWVkIHRvIGNvbnNpZGVyIGNhbGxpbmcgY2hpbGRcbiAgICAvLyB0aGlzLmNoaWxkKCkucGFyc2VHcmlkR3JvdXAoKTtcblxuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZCgpO1xuXG4gICAgdGhpcy5jb21wb25lbnQuZ3JpZEdyb3VwID0gZXh0ZW5kKFxuICAgICAgIWNoaWxkLmhhcyhYKSAmJiB0aGlzLmhhcyhDT0xVTU4pID8geyBjb2x1bW46IGdldENvbHVtbkdyaWRHcm91cHModGhpcykgfSA6IHt9LFxuICAgICAgIWNoaWxkLmhhcyhZKSAmJiB0aGlzLmhhcyhST1cpID8geyByb3c6IGdldFJvd0dyaWRHcm91cHModGhpcykgfSA6IHt9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VMZWdlbmQoKTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgbGVnZW5kIGZvciBpbmRlcGVuZGVudCBub24tcG9zaXRpb24gc2NhbGUgYWNyb3NzIGZhY2V0c1xuICAgIC8vIFRPRE86IHN1cHBvcnQgbGVnZW5kIGZvciBmaWVsZCByZWZlcmVuY2Ugb2YgcGFyZW50IGRhdGEgKGUuZy4sIGZvciBTUExPTSlcblxuICAgIC8vIEZvciBub3csIGFzc3VtaW5nIHRoYXQgbm9uLXBvc2l0aW9uYWwgc2NhbGVzIGFyZSBhbHdheXMgc2hhcmVkIGFjcm9zcyBmYWNldHNcbiAgICAvLyBUaHVzLCBqdXN0IG1vdmUgYWxsIGxlZ2VuZHMgZnJvbSBpdHMgY2hpbGRcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSB0aGlzLl9jaGlsZC5jb21wb25lbnQubGVnZW5kO1xuICAgIHRoaXMuX2NoaWxkLmNvbXBvbmVudC5sZWdlbmQgPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUHJlZml4IHRyYXZlcnNhbCDigJMgcGFyZW50IGRhdGEgbWlnaHQgYmUgcmVmZXJyZWQgYnkgY2hpbGRyZW4gZGF0YVxuICAgIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGQuYXNzZW1ibGVEYXRhKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTGF5b3V0KGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFBvc3RmaXggdHJhdmVyc2FsIOKAkyBsYXlvdXQgaXMgYXNzZW1ibGVkIGJvdHRvbS11cFxuICAgIHRoaXMuX2NoaWxkLmFzc2VtYmxlTGF5b3V0KGxheW91dERhdGEpO1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gW10uY29uY2F0KFxuICAgICAgLy8gYXhpc0dyb3VwIGlzIGEgbWFwcGluZyB0byBWZ01hcmtHcm91cFxuICAgICAgdmFscyh0aGlzLmNvbXBvbmVudC5heGlzR3JvdXApLFxuICAgICAgZmxhdHRlbih2YWxzKHRoaXMuY29tcG9uZW50LmdyaWRHcm91cCkpLFxuICAgICAgdGhpcy5jb21wb25lbnQubWFya1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFtST1csIENPTFVNTl07XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldCgpO1xuICB9XG5cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy8gVE9ETzogbW92ZSB0aGUgcmVzdCBvZiB0aGUgZmlsZSBpbnRvIEZhY2V0TW9kZWwgaWYgcG9zc2libGVcblxuZnVuY3Rpb24gZ2V0RmFjZXRHcm91cFByb3BlcnRpZXMobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICBjb25zdCBtZXJnZWRDZWxsQ29uZmlnID0gZXh0ZW5kKHt9LCBjaGlsZC5jb25maWcoKS5jZWxsLCBjaGlsZC5jb25maWcoKS5mYWNldC5jZWxsKTtcblxuICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIHg6IG1vZGVsLmhhcyhDT0xVTU4pID8ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MVU1OKSxcbiAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKENPTFVNTikucGFkZGluZyAvIDJcbiAgICAgICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgICB5OiBtb2RlbC5oYXMoUk9XKSA/IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKSxcbiAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoUk9XKS5wYWRkaW5nIC8gMlxuICAgICAgfSA6IHt2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJ9LFxuXG4gICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCd3aWR0aCcpfX0sXG4gICAgICBoZWlnaHQ6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnaGVpZ2h0Jyl9fVxuICAgIH0sXG4gICAgY2hpbGQuYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMobWVyZ2VkQ2VsbENvbmZpZylcbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VBeGlzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLy8gVE9ETzogYWRkIGEgY2FzZSB3aGVyZSBpbm5lciBzcGVjIGlzIG5vdCBhIHVuaXQgKGZhY2V0L2xheWVyL2NvbmNhdClcbiAgbGV0IGF4aXNHcm91cCA9IG51bGw7XG5cbiAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICBpZiAoY2hpbGQuaGFzKGNoYW5uZWwpKSB7XG4gICAgaWYgKGNoaWxkLmF4aXMoY2hhbm5lbCkpIHtcbiAgICAgIGlmICh0cnVlKSB7IC8vIHRoZSBjaGFubmVsIGhhcyBzaGFyZWQgYXhlc1xuXG4gICAgICAgIC8vIGFkZCBhIGdyb3VwIGZvciB0aGUgc2hhcmVkIGF4ZXNcbiAgICAgICAgYXhpc0dyb3VwID0gY2hhbm5lbCA9PT0gWCA/IGdldFhBeGVzR3JvdXAobW9kZWwpIDogZ2V0WUF4ZXNHcm91cChtb2RlbCk7XG5cbiAgICAgICAgaWYgKGNoaWxkLmF4aXMoY2hhbm5lbCkgJiYgZ3JpZFNob3coY2hpbGQsIGNoYW5uZWwpKSB7IC8vIHNob3cgaW5uZXIgZ3JpZFxuICAgICAgICAgIC8vIGFkZCBpbm5lciBheGlzIChha2EgYXhpcyB0aGF0IHNob3dzIG9ubHkgZ3JpZCB0byApXG4gICAgICAgICAgY2hpbGQuY29tcG9uZW50LmF4aXNbY2hhbm5lbF0gPSBwYXJzZUlubmVyQXhpcyhjaGFubmVsLCBjaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlcyBzdXBwb3J0XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBheGlzR3JvdXA7XG59XG5cblxuZnVuY3Rpb24gZ2V0WEF4ZXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCk6IFZnTWFya0dyb3VwIHtcbiAgY29uc3QgaGFzQ29sID0gbW9kZWwuaGFzKENPTFVNTik7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgneC1heGVzJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNDb2wgPyB7XG4gICAgICBmcm9tOiB7IC8vIFRPRE86IGlmIHdlIGRvIGZhY2V0IHRyYW5zZm9ybSBhdCB0aGUgcGFyZW50IGxldmVsIHdlIGNhbiBzYW1lIHNvbWUgdHJhbnNmb3JtIGhlcmVcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV0sXG4gICAgICAgICAgc3VtbWFyaXplOiB7JyonOiBbJ2NvdW50J119IC8vIGp1c3QgYSBwbGFjZWhvbGRlciBhZ2dyZWdhdGlvblxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0gOiB7fSxcbiAgICB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ3dpZHRoJyl9fSxcbiAgICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgIGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgeDogaGFzQ29sID8ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoQ09MVU1OKS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtwYXJzZUF4aXMoWCwgbW9kZWwuY2hpbGQoKSldXG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRZQXhlc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsKTogVmdNYXJrR3JvdXAge1xuICBjb25zdCBoYXNSb3cgPSBtb2RlbC5oYXMoUk9XKTtcbiAgcmV0dXJuIGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCd5LWF4ZXMnKSxcbiAgICAgIHR5cGU6ICdncm91cCdcbiAgICB9LFxuICAgIGhhc1JvdyA/IHtcbiAgICAgIGZyb206IHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoUk9XKV0sXG4gICAgICAgICAgc3VtbWFyaXplOiB7JyonOiBbJ2NvdW50J119IC8vIGp1c3QgYSBwbGFjZWhvbGRlciBhZ2dyZWdhdGlvblxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0gOiB7fSxcbiAgICB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnd2lkdGgnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ2hlaWdodCcpfX0sXG4gICAgICAgICAgeTogaGFzUm93ID8ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIG9mZnNldDogbW9kZWwuc2NhbGUoUk9XKS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgYnkgdGhlIHBhZGRpbmdcbiAgICAgICAgICAgIHZhbHVlOiBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nIC8gMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF4ZXM6IFtwYXJzZUF4aXMoWSwgbW9kZWwuY2hpbGQoKSldXG4gICAgfVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dHcmlkR3JvdXBzKG1vZGVsOiBNb2RlbCk6IGFueVtdIHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBmYWNldEdyaWRDb25maWcgPSBtb2RlbC5jb25maWcoKS5mYWNldC5ncmlkO1xuXG4gIGNvbnN0IHJvd0dyaWQgPSB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgncm93LWdyaWQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShST1cpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpXG4gICAgICAgIH0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gW3Jvd0dyaWQsIHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb3ctZ3JpZC1lbmQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHk6IHsgZmllbGQ6IHtncm91cDogJ2hlaWdodCd9fSxcbiAgICAgICAgeDoge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHgyOiB7ZmllbGQ6IHtncm91cDogJ3dpZHRoJ30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9XTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29sdW1uR3JpZEdyb3Vwcyhtb2RlbDogTW9kZWwpOiBhbnkgeyAvLyBUT0RPOiBWZ01hcmtzXG4gIGNvbnN0IGZhY2V0R3JpZENvbmZpZyA9IG1vZGVsLmNvbmZpZygpLmZhY2V0LmdyaWQ7XG5cbiAgY29uc3QgY29sdW1uR3JpZCA9IHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdjb2x1bW4tZ3JpZCcpLFxuICAgIHR5cGU6ICdydWxlJyxcbiAgICBmcm9tOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIHRyYW5zZm9ybTogW3t0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBbbW9kZWwuZmllbGQoQ09MVU1OKV19XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTilcbiAgICAgICAgfSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBbY29sdW1uR3JpZCwgIHtcbiAgICBuYW1lOiBtb2RlbC5uYW1lKCdjb2x1bW4tZ3JpZC1lbmQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIHg6IHsgZmllbGQ6IHtncm91cDogJ3dpZHRoJ319LFxuICAgICAgICB5OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXR9LFxuICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH1dO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7a2V5cywgZHVwbGljYXRlLCBtZXJnZURlZXAsIGZsYXR0ZW4sIHVuaXF1ZSwgaXNBcnJheSwgdmFscywgaGFzaCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2RlZmF1bHRDb25maWcsIENvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7TGF5ZXJTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZUxheWVyRGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VMYXllckxheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZUNvbXBvbmVudHN9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnQXhpcywgVmdMZWdlbmQsIGlzVW5pb25lZERvbWFpbiwgaXNEYXRhUmVmRG9tYWluLCBWZ0RhdGFSZWZ9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQgY2xhc3MgTGF5ZXJNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IFVuaXRNb2RlbFtdO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IExheWVyU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSk7XG5cbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQpO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gc3BlYy5sYXllcnMubWFwKChsYXllciwgaSkgPT4ge1xuICAgICAgLy8gd2Uga25vdyB0aGF0IHRoZSBtb2RlbCBoYXMgdG8gYmUgYSB1bml0IG1vZGVsIGJlYWN1c2Ugd2UgcGFzcyBpbiBhIHVuaXQgc3BlY1xuICAgICAgcmV0dXJuIGJ1aWxkTW9kZWwobGF5ZXIsIHRoaXMsIHRoaXMubmFtZSgnbGF5ZXJfJyArIGkpKSBhcyBVbml0TW9kZWw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZmlnKHNwZWNDb25maWc6IENvbmZpZywgcGFyZW50OiBNb2RlbCkge1xuICAgIHJldHVybiBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBzcGVjQ29uZmlnLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSk7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgICAvLyBsYXllciBkb2VzIG5vdCBoYXZlIGFueSBjaGFubmVsc1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBwdWJsaWMgaXNPcmRpbmFsU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIC8vIHNpbmNlIHdlIGFzc3VtZSBzaGFyZWQgc2NhbGVzIHdlIGNhbiBqdXN0IGFzayB0aGUgZmlyc3QgY2hpbGRcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCk7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCk6IHN0cmluZyB7XG4gICAgLy8gRklYTUU6IGRvbid0IGp1c3QgdXNlIHRoZSBmaXJzdCBjaGlsZFxuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblswXS5kYXRhVGFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIHJldHVybiBudWxsOyAvLyBsYXllciBkb2VzIG5vdCBoYXZlIGZpZWxkIGRlZnNcbiAgfVxuXG4gIHB1YmxpYyBzdGFjaygpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gdGhpcyBpcyBvbmx5IGEgcHJvcGVydHkgZm9yIFVuaXRNb2RlbFxuICB9XG5cbiAgcHVibGljIHBhcnNlRGF0YSgpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQucGFyc2VEYXRhKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQuZGF0YSA9IHBhcnNlTGF5ZXJEYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICAvLyBUT0RPOiBjb3JyZWN0bHkgdW5pb24gb3JkaW5hbCBzY2FsZXMgcmF0aGVyIHRoYW4ganVzdCB1c2luZyB0aGUgbGF5b3V0IG9mIHRoZSBmaXJzdCBjaGlsZFxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XG4gICAgICBjaGlsZC5wYXJzZUxheW91dERhdGEoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZUxheWVyTGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgbGV0IHNjYWxlQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuc2NhbGUgPSB7fSBhcyBEaWN0PFNjYWxlQ29tcG9uZW50cz47XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZVNjYWxlKCk7XG5cbiAgICAgIC8vIEZJWE1FOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQuc2NhbGUpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIGxldCBjaGlsZFNjYWxlczogU2NhbGVDb21wb25lbnRzID0gY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuICAgICAgICAgIGlmICghY2hpbGRTY2FsZXMpIHtcbiAgICAgICAgICAgIC8vIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGFueSBzY2FsZXMgc28gd2UgaGF2ZSBub3RoaW5nIHRvIG1lcmdlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbW9kZWxTY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IHNjYWxlQ29tcG9uZW50W2NoYW5uZWxdO1xuICAgICAgICAgIGlmIChtb2RlbFNjYWxlcyAmJiBtb2RlbFNjYWxlcy5tYWluKSB7XG4gICAgICAgICAgICAvLyBTY2FsZXMgYXJlIHVuaW9uZWQgYnkgY29tYmluaW5nIHRoZSBkb21haW4gb2YgdGhlIG1haW4gc2NhbGUuXG4gICAgICAgICAgICAvLyBPdGhlciBzY2FsZXMgdGhhdCBhcmUgdXNlZCBmb3Igb3JkaW5hbCBsZWdlbmRzIGFyZSBhcHBlbmRlZC5cbiAgICAgICAgICAgIGNvbnN0IG1vZGVsRG9tYWluID0gbW9kZWxTY2FsZXMubWFpbi5kb21haW47XG4gICAgICAgICAgICBjb25zdCBjaGlsZERvbWFpbiA9IGNoaWxkU2NhbGVzLm1haW4uZG9tYWluO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShtb2RlbERvbWFpbikpIHtcbiAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRTY2FsZXMubWFpbi5kb21haW4pKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSBtb2RlbERvbWFpbi5jb25jYXQoY2hpbGREb21haW4pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCB1bmlvbmVkRmllbGRzID0gaXNVbmlvbmVkRG9tYWluKG1vZGVsRG9tYWluKSA/IG1vZGVsRG9tYWluLmZpZWxkcyA6IFttb2RlbERvbWFpbl0gYXMgVmdEYXRhUmVmW107XG5cbiAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGREb21haW4pKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuYWRkV2FybmluZygnY3VzdG9tIGRvbWFpbiBzY2FsZSBjYW5ub3QgYmUgdW5pb25lZCB3aXRoIGRlZmF1bHQgZmllbGQtYmFzZWQgZG9tYWluJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgZmllbGRzID0gaXNEYXRhUmVmRG9tYWluKGNoaWxkRG9tYWluKSA/IHVuaW9uZWRGaWVsZHMuY29uY2F0KFtjaGlsZERvbWFpbl0pIDpcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZG9tYWluIGlzIGl0c2VsZiBhIHVuaW9uIGRvbWFpbiwgY29uY2F0XG4gICAgICAgICAgICAgICAgaXNVbmlvbmVkRG9tYWluKGNoaWxkRG9tYWluKSA/IHVuaW9uZWRGaWVsZHMuY29uY2F0KGNoaWxkRG9tYWluLmZpZWxkcykgOlxuICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBpZ25vcmUgZXhwbGljaXQgZGF0YSBkb21haW5zIGZvciBub3cgYmVjYXVzZSB2ZWdhIGRvZXMgbm90IHN1cHBvcnQgdW5pb25pbmcgdGhlbVxuICAgICAgICAgICAgICAgICAgdW5pb25lZEZpZWxkcztcbiAgICAgICAgICAgICAgZmllbGRzID0gdW5pcXVlKGZpZWxkcywgaGFzaCk7XG4gICAgICAgICAgICAgIC8vIFRPRE86IGlmIGFsbCBkb21haW5zIHVzZSB0aGUgc2FtZSBkYXRhLCB3ZSBjYW4gbWVyZ2UgdGhlbVxuICAgICAgICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbiA9IHsgZmllbGRzOiBmaWVsZHMgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbFNjYWxlcy5tYWluLmRvbWFpbiA9IGZpZWxkc1swXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgY29sb3IgbGVnZW5kIGFuZCBjb2xvciBsZWdlbmQgYmluIHNjYWxlcyBpZiB3ZSBkb24ndCBoYXZlIHRoZW0geWV0XG4gICAgICAgICAgICBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA9IG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kID8gbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgOiBjaGlsZFNjYWxlcy5jb2xvckxlZ2VuZDtcbiAgICAgICAgICAgIG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kID0gbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgPyBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA6IGNoaWxkU2NhbGVzLmJpbkNvbG9yTGVnZW5kO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY2FsZUNvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkU2NhbGVzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbmFtZSBjaGlsZCBzY2FsZXMgdG8gcGFyZW50IHNjYWxlc1xuICAgICAgICAgIHZhbHMoY2hpbGRTY2FsZXMpLmZvckVhY2goZnVuY3Rpb24oc2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlTmFtZVdpdGhvdXRQcmVmaXggPSBzY2FsZS5uYW1lLnN1YnN0cihjaGlsZC5uYW1lKCcnKS5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IG1vZGVsLnNjYWxlTmFtZShzY2FsZU5hbWVXaXRob3V0UHJlZml4KTtcbiAgICAgICAgICAgIGNoaWxkLnJlbmFtZVNjYWxlKHNjYWxlLm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgICAgc2NhbGUubmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBkZWxldGUgY2hpbGRTY2FsZXNbY2hhbm5lbF07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZU1hcmsoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgbGV0IGF4aXNDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5heGlzID0ge30gYXMgRGljdDxWZ0F4aXNbXT47XG5cbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBjaGlsZC5wYXJzZUF4aXMoKTtcblxuICAgICAgLy8gVE9ETzogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBheGVzXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQuYXhpcykuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBtdWx0aXBsZSBheGVzIGZvciBzaGFyZWQgc2NhbGVcblxuICAgICAgICAgIC8vIGp1c3QgdXNlIHRoZSBmaXJzdCBheGlzIGRlZmluaXRpb24gZm9yIGVhY2ggY2hhbm5lbFxuICAgICAgICAgIGlmICghYXhpc0NvbXBvbmVudFtjaGFubmVsXSkge1xuICAgICAgICAgICAgYXhpc0NvbXBvbmVudFtjaGFubmVsXSA9IGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VHcmlkR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgbGV0IGxlZ2VuZENvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LmxlZ2VuZCA9IHt9IGFzIERpY3Q8VmdMZWdlbmQ+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VMZWdlbmQoKTtcblxuICAgICAgLy8gVE9ETzogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBheGVzXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAga2V5cyhjaGlsZC5jb21wb25lbnQubGVnZW5kKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICAvLyBqdXN0IHVzZSB0aGUgZmlyc3QgbGVnZW5kIGRlZmluaXRpb24gZm9yIGVhY2ggY2hhbm5lbFxuICAgICAgICAgIGlmICghbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdKSB7XG4gICAgICAgICAgICBsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQubGVnZW5kW2NoYW5uZWxdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFByZWZpeCB0cmF2ZXJzYWwg4oCTIHBhcmVudCBkYXRhIG1pZ2h0IGJlIHJlZmVycmVkIHRvIGJ5IGNoaWxkcmVuIGRhdGFcbiAgICBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFzc2VtYmxlRGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQb3N0Zml4IHRyYXZlcnNhbCDigJMgbGF5b3V0IGlzIGFzc2VtYmxlZCBib3R0b20tdXBcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFzc2VtYmxlTGF5b3V0KHRoaXMsIGxheW91dERhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTWFya3MoKTogYW55W10ge1xuICAgIC8vIG9ubHkgY2hpbGRyZW4gaGF2ZSBtYXJrc1xuICAgIHJldHVybiBmbGF0dGVuKHRoaXMuX2NoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcbiAgICAgIHJldHVybiBjaGlsZC5hc3NlbWJsZU1hcmtzKCk7XG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBwaW5nKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGlzTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjaGlsZCBlaXRoZXIgaGFzIG5vIHNvdXJjZSBkZWZpbmVkIG9yIHVzZXMgdGhlIHNhbWUgdXJsLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBrbm93IHdoZXRoZXIgaXQgaXMgcG9zc2libGUgdG8gbW92ZSBhIGZpbHRlciB1cC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gb25seSBiZSBjYWxsZWQgb25jZSB0aCBjaGlsZCBoYXMgYmVlbiBwYXJzZWQuXG4gICAqL1xuICBwdWJsaWMgY29tcGF0aWJsZVNvdXJjZShjaGlsZDogVW5pdE1vZGVsKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YSgpO1xuICAgIGNvbnN0IGNoaWxkRGF0YSA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgIGNvbnN0IGNvbXBhdGlibGUgPSAhY2hpbGREYXRhLnNvdXJjZSB8fCAoZGF0YSAmJiBkYXRhLnVybCA9PT0gY2hpbGREYXRhLnNvdXJjZS51cmwpO1xuICAgIHJldHVybiBjb21wYXRpYmxlO1xuICB9XG59XG4iLCJcbmltcG9ydCB7Q2hhbm5lbCwgWCwgWSwgUk9XLCBDT0xVTU59IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtMQVlPVVR9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBTdHJpbmdTZXR9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi9sYXllcic7XG5pbXBvcnQge1RFWFQgYXMgVEVYVE1BUkt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3Jhd0RvbWFpbn0gZnJvbSAnLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIEZJWE1FOiBmb3IgbmVzdGluZyB4IGFuZCB5LCB3ZSBuZWVkIHRvIGRlY2xhcmUgeCx5IGxheW91dCBzZXBhcmF0ZWx5IGJlZm9yZSBqb2luaW5nIGxhdGVyXG4vLyBGb3Igbm93LCBsZXQncyBhbHdheXMgYXNzdW1lIHNoYXJlZCBzY2FsZVxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRDb21wb25lbnQge1xuICB3aWR0aDogU2l6ZUNvbXBvbmVudDtcbiAgaGVpZ2h0OiBTaXplQ29tcG9uZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemVDb21wb25lbnQge1xuICAvKiogRmllbGQgdGhhdCB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBkaXN0aW5jdCAqL1xuICBkaXN0aW5jdDogU3RyaW5nU2V0O1xuXG4gIC8qKiBBcnJheSBvZiBmb3JtdWxhcyAqL1xuICBmb3JtdWxhOiBGb3JtdWxhW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZUxheW91dChtb2RlbDogTW9kZWwsIGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICBjb25zdCBsYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jb21wb25lbnQubGF5b3V0O1xuICBpZiAoIWxheW91dENvbXBvbmVudC53aWR0aCAmJiAhbGF5b3V0Q29tcG9uZW50LmhlaWdodCkge1xuICAgIHJldHVybiBsYXlvdXREYXRhOyAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBpZiAodHJ1ZSkgeyAvLyBpZiBib3RoIGFyZSBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgZGF0YSBzb3VyY2UgZm9yIHdpZHRoIGFuZCBmb3IgaGVpZ2h0XG4gICAgY29uc3QgZGlzdGluY3RGaWVsZHMgPSBrZXlzKGV4dGVuZChsYXlvdXRDb21wb25lbnQud2lkdGguZGlzdGluY3QsIGxheW91dENvbXBvbmVudC5oZWlnaHQuZGlzdGluY3QpKTtcbiAgICBjb25zdCBmb3JtdWxhID0gbGF5b3V0Q29tcG9uZW50LndpZHRoLmZvcm11bGEuY29uY2F0KGxheW91dENvbXBvbmVudC5oZWlnaHQuZm9ybXVsYSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZm9ybXVsYSkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt0eXBlOiAnZm9ybXVsYSd9LCBmb3JtdWxhKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGRpc3RpbmN0RmllbGRzLmxlbmd0aCA+IDAgPyB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgc3VtbWFyaXplOiBkaXN0aW5jdEZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IGZpZWxkLCBvcHM6IFsnZGlzdGluY3QnXSB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XS5jb25jYXQoZm9ybXVsYSlcbiAgICAgIH0gOiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKExBWU9VVCksXG4gICAgICAgIHZhbHVlczogW3t9XSxcbiAgICAgICAgdHJhbnNmb3JtOiBmb3JtdWxhXG4gICAgICB9XG4gICAgXTtcbiAgfVxuICAvLyBGSVhNRTogaW1wbGVtZW50XG4gIC8vIG90aGVyd2lzZSwgd2UgbmVlZCB0byBqb2luIHdpZHRoIGFuZCBoZWlnaHQgKGNyb3NzKVxufVxuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXRMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFgpLFxuICAgIGhlaWdodDogcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbCwgWSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VVbml0U2l6ZUxheW91dChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIC8vIFRPRE86IHRoaW5rIGFib3V0IHdoZXRoZXIgdGhpcyBjb25maWcgaGFzIHRvIGJlIHRoZSBjZWxsIG9yIGZhY2V0IGNlbGwgY29uZmlnXG4gIGNvbnN0IGNlbGxDb25maWcgPSBtb2RlbC5jb25maWcoKS5jZWxsO1xuICBjb25zdCBub25PcmRpbmFsU2l6ZSA9IGNoYW5uZWwgPT09IFggPyBjZWxsQ29uZmlnLndpZHRoIDogY2VsbENvbmZpZy5oZWlnaHQ7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXN0aW5jdDogZ2V0RGlzdGluY3QobW9kZWwsIGNoYW5uZWwpLFxuICAgIGZvcm11bGE6IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogdW5pdFNpemVFeHByKG1vZGVsLCBjaGFubmVsLCBub25PcmRpbmFsU2l6ZSlcbiAgICB9XVxuICB9O1xufVxuXG5mdW5jdGlvbiB1bml0U2l6ZUV4cHIobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgbm9uT3JkaW5hbFNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChtb2RlbC5zY2FsZShjaGFubmVsKSkge1xuICAgIGlmIChtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgIHJldHVybiAnKCcgKyBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWwsIGNoYW5uZWwpICtcbiAgICAgICAgJyArICcgKyBzY2FsZS5wYWRkaW5nICtcbiAgICAgICAgJykgKiAnICsgc2NhbGUuYmFuZFNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub25PcmRpbmFsU2l6ZSArICcnO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobW9kZWwubWFyaygpID09PSBURVhUTUFSSyAmJiBjaGFubmVsID09PSBYKSB7XG4gICAgICAvLyBmb3IgdGV4dCB0YWJsZSB3aXRob3V0IHgveSBzY2FsZSB3ZSBuZWVkIHdpZGVyIGJhbmRTaXplXG4gICAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkuc2NhbGUudGV4dEJhbmRXaWR0aCArICcnO1xuICAgIH1cbiAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgKyAnJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldExheW91dChtb2RlbDogRmFjZXRNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsLCBDT0xVTU4pLFxuICAgIGhlaWdodDogcGFyc2VGYWNldFNpemVMYXlvdXQobW9kZWwsIFJPVylcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VGYWNldFNpemVMYXlvdXQobW9kZWw6IEZhY2V0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBTaXplQ29tcG9uZW50IHtcbiAgY29uc3QgY2hpbGRMYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5sYXlvdXQ7XG4gIGNvbnN0IHNpemVUeXBlID0gY2hhbm5lbCA9PT0gUk9XID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICBjb25zdCBjaGlsZFNpemVDb21wb25lbnQ6IFNpemVDb21wb25lbnQgPSBjaGlsZExheW91dENvbXBvbmVudFtzaXplVHlwZV07XG5cbiAgaWYgKHRydWUpIHsgLy8gYXNzdW1lIHNoYXJlZCBzY2FsZVxuICAgIC8vIEZvciBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgdGhlIGxheW91dCBpbnRvIG9uZSBkYXRhIHNvdXJjZVxuXG4gICAgY29uc3QgZGlzdGluY3QgPSBleHRlbmQoZ2V0RGlzdGluY3QobW9kZWwsIGNoYW5uZWwpLCBjaGlsZFNpemVDb21wb25lbnQuZGlzdGluY3QpO1xuICAgIGNvbnN0IGZvcm11bGEgPSBjaGlsZFNpemVDb21wb25lbnQuZm9ybXVsYS5jb25jYXQoW3tcbiAgICAgIGZpZWxkOiBtb2RlbC5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCksXG4gICAgICBleHByOiBmYWNldFNpemVGb3JtdWxhKG1vZGVsLCBjaGFubmVsLCBtb2RlbC5jaGlsZCgpLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSlcbiAgICB9XSk7XG5cbiAgICBkZWxldGUgY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuICAgIHJldHVybiB7XG4gICAgICBkaXN0aW5jdDogZGlzdGluY3QsXG4gICAgICBmb3JtdWxhOiBmb3JtdWxhXG4gICAgfTtcbiAgfVxuICAvLyBGSVhNRSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgc2NhbGUgYXMgd2VsbFxuICAvLyBUT0RPOiAtIGFsc28gY29uc2lkZXIgd2hlbiBjaGlsZHJlbiBoYXZlIGRpZmZlcmVudCBkYXRhIHNvdXJjZVxufVxuXG5mdW5jdGlvbiBmYWNldFNpemVGb3JtdWxhKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgaW5uZXJTaXplOiBzdHJpbmcpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKG1vZGVsLmhhcyhjaGFubmVsKSkge1xuICAgIHJldHVybiAnKGRhdHVtLicgKyBpbm5lclNpemUgKyAnICsgJyArIHNjYWxlLnBhZGRpbmcgKyAnKScgKyAnICogJyArIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbCwgY2hhbm5lbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdkYXR1bS4nICsgaW5uZXJTaXplICsgJyArICcgKyBtb2RlbC5jb25maWcoKS5mYWNldC5zY2FsZS5wYWRkaW5nOyAvLyBuZWVkIHRvIGFkZCBvdXRlciBwYWRkaW5nIGZvciBmYWNldFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyTGF5b3V0KG1vZGVsOiBMYXllck1vZGVsKTogTGF5b3V0Q29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogcGFyc2VMYXllclNpemVMYXlvdXQobW9kZWwsIFgpLFxuICAgIGhlaWdodDogcGFyc2VMYXllclNpemVMYXlvdXQobW9kZWwsIFkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsOiBMYXllck1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIGlmICh0cnVlKSB7XG4gICAgLy8gRm9yIHNoYXJlZCBzY2FsZSwgd2UgY2FuIHNpbXBseSBtZXJnZSB0aGUgbGF5b3V0IGludG8gb25lIGRhdGEgc291cmNlXG4gICAgLy8gVE9ETzogZG9uJ3QganVzdCB0YWtlIHRoZSBsYXlvdXQgZnJvbSB0aGUgZmlyc3QgY2hpbGRcblxuICAgIGNvbnN0IGNoaWxkTGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY2hpbGRyZW4oKVswXS5jb21wb25lbnQubGF5b3V0O1xuICAgIGNvbnN0IHNpemVUeXBlID0gY2hhbm5lbCA9PT0gWSA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICBjb25zdCBjaGlsZFNpemVDb21wb25lbnQ6IFNpemVDb21wb25lbnQgPSBjaGlsZExheW91dENvbXBvbmVudFtzaXplVHlwZV07XG5cbiAgICBjb25zdCBkaXN0aW5jdCA9IGNoaWxkU2l6ZUNvbXBvbmVudC5kaXN0aW5jdDtcbiAgICBjb25zdCBmb3JtdWxhID0gW3tcbiAgICAgIGZpZWxkOiBtb2RlbC5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCksXG4gICAgICBleHByOiBjaGlsZFNpemVDb21wb25lbnQuZm9ybXVsYVswXS5leHByXG4gICAgfV07XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LmxheW91dFtzaXplVHlwZV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgICAgZm9ybXVsYTogZm9ybXVsYVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzdGluY3QobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU3RyaW5nU2V0IHtcbiAgaWYgKG1vZGVsLmhhcyhjaGFubmVsKSAmJiBtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSkge1xuICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmICEoc2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAvLyBpZiBleHBsaWNpdCBkb21haW4gaXMgZGVjbGFyZWQsIHVzZSBhcnJheSBsZW5ndGhcbiAgICAgIGNvbnN0IGRpc3RpbmN0RmllbGQgPSBtb2RlbC5maWVsZChjaGFubmVsKTtcbiAgICAgIGxldCBkaXN0aW5jdDogU3RyaW5nU2V0ID0ge307XG4gICAgICBkaXN0aW5jdFtkaXN0aW5jdEZpZWxkXSA9IHRydWU7XG4gICAgICByZXR1cm4gZGlzdGluY3Q7XG4gICAgfVxuICB9XG4gIHJldHVybiB7fTtcbn1cblxuLy8gVE9ETzogcmVuYW1lIHRvIGNhcmRpbmFsaXR5RXhwclxuZnVuY3Rpb24gY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICBpZiAoc2NhbGUuZG9tYWluIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gc2NhbGUuZG9tYWluLmxlbmd0aDtcbiAgfVxuXG4gIGNvbnN0IHRpbWVVbml0ID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkudGltZVVuaXQ7XG4gIGNvbnN0IHRpbWVVbml0RG9tYWluID0gdGltZVVuaXQgPyByYXdEb21haW4odGltZVVuaXQsIGNoYW5uZWwpIDogbnVsbDtcblxuICByZXR1cm4gdGltZVVuaXREb21haW4gIT09IG51bGwgPyB0aW1lVW5pdERvbWFpbi5sZW5ndGggOlxuICAgICAgICBtb2RlbC5maWVsZChjaGFubmVsLCB7ZGF0dW06IHRydWUsIHByZWZuOiAnZGlzdGluY3RfJ30pO1xufVxuIiwiaW1wb3J0IHtDT0xPUiwgU0laRSwgU0hBUEUsIE9QQUNJVFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi4vbGVnZW5kJztcbmltcG9ydCB7dGl0bGUgYXMgZmllbGRUaXRsZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtBUkVBLCBCQVIsIFRJQ0ssIFRFWFQsIExJTkUsIFBPSU5ULCBDSVJDTEUsIFNRVUFSRX0gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge09SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCB3aXRob3V0LCBEaWN0fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHthcHBseU1hcmtDb25maWcsIEZJTExfU1RST0tFX0NPTkZJRywgbnVtYmVyRm9ybWF0LCB0aW1lVGVtcGxhdGV9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7Q09MT1JfTEVHRU5ELCBDT0xPUl9MRUdFTkRfTEFCRUx9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge1ZnTGVnZW5kfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGVnZW5kQ29tcG9uZW50KG1vZGVsOiBVbml0TW9kZWwpOiBEaWN0PFZnTGVnZW5kPiB7XG4gIHJldHVybiBbQ09MT1IsIFNJWkUsIFNIQVBFLCBPUEFDSVRZXS5yZWR1Y2UoZnVuY3Rpb24obGVnZW5kQ29tcG9uZW50LCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmxlZ2VuZChjaGFubmVsKSkge1xuICAgICAgbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdID0gcGFyc2VMZWdlbmQobW9kZWwsIGNoYW5uZWwpO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kQ29tcG9uZW50O1xuICB9LCB7fSBhcyBEaWN0PFZnTGVnZW5kPik7XG59XG5cbmZ1bmN0aW9uIGdldExlZ2VuZERlZldpdGhTY2FsZShtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogVmdMZWdlbmQge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIENPTE9SOlxuICAgICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihDT0xPUik7XG4gICAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlTmFtZSh1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSA/XG4gICAgICAgIC8vIFRvIHByb2R1Y2Ugb3JkaW5hbCBsZWdlbmQgKGxpc3QsIHJhdGhlciB0aGFuIGxpbmVhciByYW5nZSkgd2l0aCBjb3JyZWN0IGxhYmVsczpcbiAgICAgICAgLy8gLSBGb3IgYW4gb3JkaW5hbCBmaWVsZCwgcHJvdmlkZSBhbiBvcmRpbmFsIHNjYWxlIHRoYXQgbWFwcyByYW5rIHZhbHVlcyB0byBmaWVsZCB2YWx1ZXNcbiAgICAgICAgLy8gLSBGb3IgYSBmaWVsZCB3aXRoIGJpbiBvciB0aW1lVW5pdCwgcHJvdmlkZSBhbiBpZGVudGl0eSBvcmRpbmFsIHNjYWxlXG4gICAgICAgIC8vIChtYXBwaW5nIHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlbXNlbHZlcylcbiAgICAgICAgQ09MT1JfTEVHRU5EIDpcbiAgICAgICAgQ09MT1JcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBtb2RlbC5jb25maWcoKS5tYXJrLmZpbGxlZCA/IHsgZmlsbDogc2NhbGUgfSA6IHsgc3Ryb2tlOiBzY2FsZSB9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIHJldHVybiB7IHNpemU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSB9O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4geyBzaGFwZTogbW9kZWwuc2NhbGVOYW1lKFNIQVBFKSB9O1xuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICAgIHJldHVybiB7IG9wYWNpdHk6IG1vZGVsLnNjYWxlTmFtZShPUEFDSVRZKSB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMZWdlbmQobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFZnTGVnZW5kIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICBsZXQgZGVmOiBWZ0xlZ2VuZCA9IGdldExlZ2VuZERlZldpdGhTY2FsZShtb2RlbCwgY2hhbm5lbCk7XG5cbiAgLy8gMS4xIEFkZCBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlc1xuICBkZWYudGl0bGUgPSB0aXRsZShsZWdlbmQsIGZpZWxkRGVmLCBjb25maWcpO1xuICBjb25zdCBmb3JtYXQgPSBudW1iZXJGb3JtYXQoZmllbGREZWYsIGxlZ2VuZC5mb3JtYXQsIGNvbmZpZyk7XG4gIGlmIChmb3JtYXQpIHtcbiAgICBkZWYuZm9ybWF0ID0gZm9ybWF0O1xuICB9XG5cbiAgLy8gMS4yIEFkZCBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXNcbiAgWydvZmZzZXQnLCAnb3JpZW50JywgJ3ZhbHVlcyddLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxlZ2VuZFtwcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQucHJvcGVydGllcykgfHwge307XG4gIFsndGl0bGUnLCAnc3ltYm9scycsICdsZWdlbmQnLCAnbGFiZWxzJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGxldCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKGZpZWxkRGVmLCBwcm9wc1tncm91cF0sIG1vZGVsLCBjaGFubmVsKSA6IC8vIGFwcGx5IHJ1bGVcbiAgICAgIHByb3BzW2dyb3VwXTsgLy8gbm8gcnVsZSAtLSBqdXN0IGRlZmF1bHQgdmFsdWVzXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGxlZ2VuZDogTGVnZW5kLCBmaWVsZERlZjogRmllbGREZWYsIGNvbmZpZzogQ29uZmlnKSB7XG4gIGlmICh0eXBlb2YgbGVnZW5kICE9PSAnYm9vbGVhbicgJiYgbGVnZW5kLnRpdGxlKSB7XG4gICAgcmV0dXJuIGxlZ2VuZC50aXRsZTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZFRpdGxlKGZpZWxkRGVmLCBjb25maWcpO1xufVxuXG4vLyB3ZSBoYXZlIHRvIHVzZSBzcGVjaWFsIHNjYWxlcyBmb3Igb3JkaW5hbCBvciBiaW5uZWQgZmllbGRzIGZvciB0aGUgY29sb3IgY2hhbm5lbFxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi50eXBlID09PSBPUkRJTkFMIHx8IGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbHMoZmllbGREZWY6IEZpZWxkRGVmLCBzeW1ib2xzU3BlYywgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGxldCBzeW1ib2xzOmFueSA9IHt9O1xuICAgIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgc3dpdGNoIChtYXJrKSB7XG4gICAgICBjYXNlIEJBUjpcbiAgICAgIGNhc2UgVElDSzpcbiAgICAgIGNhc2UgVEVYVDpcbiAgICAgICAgc3ltYm9scy5zaGFwZSA9IHt2YWx1ZTogJ3NxdWFyZSd9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0lSQ0xFOlxuICAgICAgY2FzZSBTUVVBUkU6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7IHZhbHVlOiBtYXJrIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQT0lOVDpcbiAgICAgIGNhc2UgTElORTpcbiAgICAgIGNhc2UgQVJFQTpcbiAgICAgICAgLy8gdXNlIGRlZmF1bHQgY2lyY2xlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuXG5cbiAgICBsZXQgY29uZmlnID0gY2hhbm5lbCA9PT0gQ09MT1IgP1xuICAgICAgICAvKiBGb3IgY29sb3IncyBsZWdlbmQsIGRvIG5vdCBzZXQgZmlsbCAod2hlbiBmaWxsZWQpIG9yIHN0cm9rZSAod2hlbiB1bmZpbGxlZCkgcHJvcGVydHkgZnJvbSBjb25maWcgYmVjYXVzZSB0aGUgdGhlIGxlZ2VuZCdzIGBmaWxsYCBvciBgc3Ryb2tlYCBzY2FsZSBzaG91bGQgaGF2ZSBwcmVjZWRlbmNlICovXG4gICAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbIGZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnLCAnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pIDpcbiAgICAgICAgLyogRm9yIG90aGVyIGxlZ2VuZCwgbm8gbmVlZCB0byBvbWl0LiAqL1xuICAgICAgICAgd2l0aG91dChGSUxMX1NUUk9LRV9DT05GSUcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgY29uZmlnID0gd2l0aG91dChjb25maWcsIFsnc3Ryb2tlRGFzaCcsICdzdHJva2VEYXNoT2Zmc2V0J10pO1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHN5bWJvbHMsIG1vZGVsLCBjb25maWcpO1xuXG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IDAgfTtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCBvdmVycmlkZSBkZWZhdWx0IG1hcHBpbmcgZm9yIG9wYWNpdHkgY2hhbm5lbFxuICAgIGlmIChjaGFubmVsID09PSBPUEFDSVRZKSB7XG4gICAgICBkZWxldGUgc3ltYm9scy5vcGFjaXR5O1xuICAgIH1cblxuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAobW9kZWwuaGFzKENPTE9SKSAmJiBjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgaWYgKHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWYpKSB7XG4gICAgICAgIC8vIGZvciBjb2xvciBsZWdlbmQgc2NhbGUsIHdlIG5lZWQgdG8gb3ZlcnJpZGVcbiAgICAgICAgdmFsdWUgPSB7IHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLCBmaWVsZDogJ2RhdGEnIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihDT0xPUikudmFsdWUpIHtcbiAgICAgIHZhbHVlID0geyB2YWx1ZTogbW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlIH07XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGFwcGx5IHRoZSB2YWx1ZVxuICAgICAgaWYgKGZpbGxlZCkge1xuICAgICAgICBzeW1ib2xzLmZpbGwgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN5bWJvbHMuc3Ryb2tlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaGFubmVsICE9PSBDT0xPUikge1xuICAgICAgLy8gRm9yIG5vbi1jb2xvciBsZWdlbmQsIGFwcGx5IGNvbG9yIGNvbmZpZyBpZiB0aGVyZSBpcyBubyBmaWxsIC8gc3Ryb2tlIGNvbmZpZy5cbiAgICAgIC8vIChGb3IgY29sb3IsIGRvIG5vdCBvdmVycmlkZSBzY2FsZSBzcGVjaWZpZWQhKVxuICAgICAgc3ltYm9sc1tmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gPSBzeW1ib2xzW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSB8fFxuICAgICAgICB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsuY29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5maWxsID0ge3ZhbHVlOiBsZWdlbmQuc3ltYm9sQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU2hhcGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5zaGFwZSA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFNoYXBlfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5zaXplID0ge3ZhbHVlOiBsZWdlbmQuc3ltYm9sU2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTdHJva2VXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLnN0cm9rZVdpZHRoID0ge3ZhbHVlOiBsZWdlbmQuc3ltYm9sU3Ryb2tlV2lkdGh9O1xuICAgIH1cblxuICAgIHN5bWJvbHMgPSBleHRlbmQoc3ltYm9scywgc3ltYm9sc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMoc3ltYm9scykubGVuZ3RoID4gMCA/IHN5bWJvbHMgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKGZpZWxkRGVmOiBGaWVsZERlZiwgbGFiZWxzU3BlYywgbW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIGxldCBsYWJlbHM6YW55ID0ge307XG5cbiAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMKSB7XG4gICAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EKSxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkRfTEFCRUwpLFxuICAgICAgICAgICAgZmllbGQ6ICdkYXRhJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB0aW1lVGVtcGxhdGUoJ2RhdHVtLmRhdGEnLCBmaWVsZERlZi50aW1lVW5pdCwgbGVnZW5kLmZvcm1hdCwgbGVnZW5kLnNob3J0VGltZUxhYmVscywgY29uZmlnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEFsaWduICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5hbGlnbiA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQWxpZ259O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuc3Ryb2tlID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmZvbnQgPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEZvbnR9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuZm9udFNpemUgPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEZvbnRTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQmFzZWxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmJhc2VsaW5lID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxCYXNlbGluZX07XG4gICAgfVxuXG4gICAgbGFiZWxzID0gZXh0ZW5kKGxhYmVscywgbGFiZWxzU3BlYyB8fCB7fSk7XG5cbiAgICByZXR1cm4ga2V5cyhsYWJlbHMpLmxlbmd0aCA+IDAgPyBsYWJlbHMgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmLCB0aXRsZVNwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG5cbiAgICBsZXQgdGl0bGVzOmFueSA9IHt9O1xuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpdGxlcy5zdHJva2UgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUNvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udCA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udH07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpdGxlcy5mb250U2l6ZSA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udFNpemV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250V2VpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpdGxlcy5mb250V2VpZ2h0ID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVGb250V2VpZ2h0fTtcbiAgICB9XG5cbiAgICB0aXRsZXMgPSBleHRlbmQodGl0bGVzLCB0aXRsZVNwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXModGl0bGVzKS5sZW5ndGggPiAwID8gdGl0bGVzIDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtpc0RpbWVuc2lvbiwgaXNNZWFzdXJlLCBGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U3RhY2tQcm9wZXJ0aWVzfSBmcm9tICcuLi8uLi9zdGFjayc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHksIGFwcGx5TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBhcmVhIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnYXJlYSc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgY29uc3Qgb3JpZW50ID0gY29uZmlnLm1hcmsub3JpZW50O1xuICAgIGlmIChvcmllbnQpIHtcbiAgICAgIHAub3JpZW50ID0geyB2YWx1ZTogb3JpZW50fSA7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICAgIGNvbnN0IF94ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgb3JpZW50LCBzdGFjayk7XG4gICAgaWYgKF94KSB7XG4gICAgICBwLnggPSBfeDtcbiAgICB9XG5cbiAgICBjb25zdCBfeSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeSkge1xuICAgICAgcC55ID0gX3k7XG4gICAgfVxuXG4gICAgY29uc3QgX3gyID0geDIobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5lbmNvZGluZygpLngyLCBtb2RlbC5zY2FsZU5hbWUoWCksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeDIpIHtcbiAgICAgIHAueDIgPSBfeDI7XG4gICAgfVxuXG4gICAgY29uc3QgX3kyID0geTIobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5lbmNvZGluZygpLnkyLCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeTIpIHtcbiAgICAgIHAueTIgPSBfeTI7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoZmllbGREZWYpKSB7IC8vIE1lYXN1cmVcbiAgICAgIGlmIChvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIHhcbiAgICAgICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgyKHhGaWVsZERlZjogRmllbGREZWYsIHgyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgIGlmIChvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoeEZpZWxkRGVmLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoeDJGaWVsZERlZikpIHsgLy8gTWVhc3VyZVxuICAgICAgaWYgKG9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgaWYgKHgyRmllbGREZWYgJiYgeDJGaWVsZERlZi5maWVsZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKHgyRmllbGREZWYpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoZmllbGREZWYpKSB7XG4gICAgICBpZiAob3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgICAvLyB5XG4gICAgICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi5maWVsZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHkyKHlGaWVsZERlZjogRmllbGREZWYsIHkyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgaWYgKG9yaWVudCAhPT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh5RmllbGREZWYsIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZSh5RmllbGREZWYpKSB7XG4gICAgICBpZiAob3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgICAvLyB5MlxuICAgICAgICBpZiAoeTJGaWVsZERlZiAmJiB5MkZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoeTJGaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIFgyLCBZMiwgU0laRSwgQ2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09yaWVudH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7aXNNZWFzdXJlfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIGJhciB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3JlY3QnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0IG9yaWVudCA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50O1xuXG4gICAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICAgIGNvbnN0IHhGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueDtcbiAgICBjb25zdCB4MkZpZWxkRGVmID0gbW9kZWwuZW5jb2RpbmcoKS54MjtcblxuICAgIGNvbnN0IHhJc01lYXN1cmUgPSBpc01lYXN1cmUoeEZpZWxkRGVmKSB8fCBpc01lYXN1cmUoeDJGaWVsZERlZik7XG5cbiAgICAvLyB4LCB4MiwgYW5kIHdpZHRoIC0tIHdlIG11c3Qgc3BlY2lmeSB0d28gb2YgdGhlc2UgaW4gYWxsIGNvbmRpdGlvbnNcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgICAvLyAneCcgaXMgYSBzdGFja2VkIG1lYXN1cmUsIHRodXMgdXNlIDxmaWVsZD5fc3RhcnQgYW5kIDxmaWVsZD5fZW5kIGZvciB4LCB4Mi5cbiAgICAgIHAueCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICAgIHAueDIgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoeElzTWVhc3VyZSkge1xuICAgICAgaWYgKG9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICAgIHAueCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAueCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwuaGFzKFgyKSkge1xuICAgICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgyKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1vZGVsLnNjYWxlKFgpLnR5cGUgPT09IFNjYWxlVHlwZS5MT0cpIHtcbiAgICAgICAgICAgIHAueDIgPSB7IHZhbHVlOiAwIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxuICAgICAgICBwLnhjID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7dmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWCl9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoWCkuYmluKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgLy8gRm9yIHZlcnRpY2FsIGNoYXJ0IHRoYXQgaGFzIGJpbm5lZCBYIGFuZCBzaXplLFxuICAgICAgICAvLyBjZW50ZXIgYmFyIGFuZCBhcHBseSBzaXplIHRvIHdpZHRoLlxuICAgICAgICBwLnhjID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC53aWR0aCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgICBvZmZzZXQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8geCBpcyBkaW1lbnNpb24gb3IgdW5zcGVjaWZpZWRcbiAgICAgIGlmIChtb2RlbC5oYXMoWCkpIHsgLy8gaXMgb3JkaW5hbFxuICAgICAgIHAueGMgPSB7XG4gICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgfTtcbiAgICAgfSBlbHNlIHsgLy8gbm8geFxuICAgICAgICBwLnggPSB7IHZhbHVlOiAwLCBvZmZzZXQ6IDIgfTtcbiAgICAgIH1cblxuICAgICAgcC53aWR0aCA9IG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMID8ge1xuICAgICAgICAgIC8vIGFwcGx5IHNpemUgc2NhbGUgaWYgaGFzIHNpemUgYW5kIGlzIHZlcnRpY2FsIChleHBsaWNpdCBcInZlcnRpY2FsXCIgb3IgdW5kZWZpbmVkKVxuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgLy8gb3RoZXJ3aXNlLCB1c2UgZml4ZWQgc2l6ZVxuICAgICAgICAgIHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIChYKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCB5RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLnk7XG4gICAgY29uc3QgeTJGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueTI7XG5cbiAgICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKHlGaWVsZERlZikgfHwgaXNNZWFzdXJlKHkyRmllbGREZWYpO1xuICAgIC8vIHksIHkyICYgaGVpZ2h0IC0tIHdlIG11c3Qgc3BlY2lmeSB0d28gb2YgdGhlc2UgaW4gYWxsIGNvbmRpdGlvbnNcbiAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIHkgaXMgc3RhY2tlZCBtZWFzdXJlXG4gICAgICBwLnkgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgICBwLnkyID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHlJc01lYXN1cmUpIHtcbiAgICAgIGlmIChvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMKSB7IC8vIHZlcnRpY2FsIChleHBsaWNpdCAndmVydGljYWwnIG9yIHVuZGVmaW5lZClcbiAgICAgICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgICAgIHAueSA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAueSA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwuaGFzKFkyKSkge1xuICAgICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkyKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1vZGVsLnNjYWxlKFkpLnR5cGUgPT09IFNjYWxlVHlwZS5MT0cpIHtcbiAgICAgICAgICAgIC8vIGVuZCBvbiBheGlzXG4gICAgICAgICAgICBwLnkyID0ge1xuICAgICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWSkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFkpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIEZvciBob3Jpem9udGFsIGNoYXJ0IHRoYXQgaGFzIGJpbm5lZCBZIGFuZCBzaXplLFxuICAgICAgICAvLyBjZW50ZXIgYmFyIGFuZCBhcHBseSBzaXplIHRvIGhlaWdodC5cbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAuaGVpZ2h0ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXBseSB1c2UgPGZpZWxkPl9zdGFydCwgPGZpZWxkPl9lbmRcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX2VuZCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8geSBpcyBvcmRpbmFsIG9yIHVuc3BlY2lmaWVkXG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHsgLy8gaXMgb3JkaW5hbFxuICAgICAgICBwLnljID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgeyAvLyBObyBZXG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0sXG4gICAgICAgICAgb2Zmc2V0OiAtMVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBwLmhlaWdodCA9IG1vZGVsLmhhcyhTSVpFKSAgJiYgb3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCA/IHtcbiAgICAgICAgICAvLyBhcHBseSBzaXplIHNjYWxlIGlmIGhhcyBzaXplIGFuZCBpcyBob3Jpem9udGFsXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrQ29uZmlnID0gbW9kZWwuY29uZmlnKCkubWFyaztcbiAgICBpZiAobWFya0NvbmZpZy5iYXJTaXplKSB7XG4gICAgICByZXR1cm4gbWFya0NvbmZpZy5iYXJTaXplO1xuICAgIH1cbiAgICAvLyBCQVIncyBzaXplIGlzIGFwcGxpZWQgb24gZWl0aGVyIFggb3IgWVxuICAgIHJldHVybiBtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSA/XG4gICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIG9yIHNpbmdsZSBiYXIsIHdlIGNhbiB1c2UgYmFuZFNpemUgLSAxXG4gICAgICAgIC8vICgtMSBzbyB0aGF0IHRoZSBib3JkZXIgb2YgdGhlIGJhciBmYWxscyBvbiBleGFjdCBwaXhlbClcbiAgICAgICAgbW9kZWwuc2NhbGUoY2hhbm5lbCkuYmFuZFNpemUgLSAxIDpcbiAgICAgICFtb2RlbC5oYXMoY2hhbm5lbCkgP1xuICAgICAgICBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAtIDEgOlxuICAgICAgICAvLyBvdGhlcndpc2UsIHNldCB0byB0aGluQmFyV2lkdGggYnkgZGVmYXVsdFxuICAgICAgICBtYXJrQ29uZmlnLmJhclRoaW5TaXplO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjNjQpOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5LCBhcHBseU1hcmtDb25maWd9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgbGluZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ2xpbmUnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgY29uc3QgX3NpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgY29uZmlnKTtcbiAgICBpZiAoX3NpemUpIHsgcC5zdHJva2VXaWR0aCA9IF9zaXplOyB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IGZpZWxkRGVmLnZhbHVlIChmb3IgbGF5ZXJpbmcpXG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiB5KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IGZpZWxkRGVmLnZhbHVlIChmb3IgbGF5ZXJpbmcpXG4gICAgfVxuICAgIHJldHVybiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gIH1cblxuICBmdW5jdGlvbiBzaXplKGZpZWxkRGVmOiBGaWVsZERlZiwgY29uZmlnOiBDb25maWcpIHtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZX07XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5saW5lU2l6ZSB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgQ09MT1IsIFRFWFQsIFNIQVBFLCBQQVRILCBPUkRFUiwgT1BBQ0lUWSwgREVUQUlMLCBMQUJFTCwgU1RBQ0tfR1JPVVBfQ0hBTk5FTFN9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge2hhc30gZnJvbSAnLi4vLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtPcmRlckNoYW5uZWxEZWYsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtBUkVBLCBMSU5FLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi8uLi9tYXJrJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIGlzQXJyYXl9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1N0YWNrVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXJlYX0gZnJvbSAnLi9hcmVhJztcbmltcG9ydCB7YmFyfSBmcm9tICcuL2Jhcic7XG5pbXBvcnQge3NvcnRGaWVsZH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7bGluZX0gZnJvbSAnLi9saW5lJztcbmltcG9ydCB7cG9pbnQsIGNpcmNsZSwgc3F1YXJlfSBmcm9tICcuL3BvaW50JztcbmltcG9ydCB7cnVsZX0gZnJvbSAnLi9ydWxlJztcbmltcG9ydCB7dGV4dH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB7dGlja30gZnJvbSAnLi90aWNrJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuY29uc3QgbWFya0NvbXBpbGVyID0ge1xuICBhcmVhOiBhcmVhLFxuICBiYXI6IGJhcixcbiAgbGluZTogbGluZSxcbiAgcG9pbnQ6IHBvaW50LFxuICB0ZXh0OiB0ZXh0LFxuICB0aWNrOiB0aWNrLFxuICBydWxlOiBydWxlLFxuICBjaXJjbGU6IGNpcmNsZSxcbiAgc3F1YXJlOiBzcXVhcmVcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hcmsobW9kZWw6IFVuaXRNb2RlbCk6IGFueVtdIHtcbiAgaWYgKGNvbnRhaW5zKFtMSU5FLCBBUkVBXSwgbW9kZWwubWFyaygpKSkge1xuICAgIHJldHVybiBwYXJzZVBhdGhNYXJrKG1vZGVsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGFyc2VOb25QYXRoTWFyayhtb2RlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQYXRoTWFyayhtb2RlbDogVW5pdE1vZGVsKSB7IC8vIFRPRE86IGV4dHJhY3QgdGhpcyBpbnRvIGNvbXBpbGVQYXRoTWFya1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICAvLyBUT0RPOiByZXBsYWNlIHRoaXMgd2l0aCBtb3JlIGdlbmVyYWwgY2FzZSBmb3IgY29tcG9zaXRpb25cbiAgY29uc3QgaXNGYWNldGVkID0gbW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpO1xuICBjb25zdCBkYXRhRnJvbSA9IHtkYXRhOiBtb2RlbC5kYXRhVGFibGUoKX07XG4gIGNvbnN0IGRldGFpbHMgPSBkZXRhaWxGaWVsZHMobW9kZWwpO1xuXG4gIGxldCBwYXRoTWFya3M6IGFueSA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdtYXJrcycpLFxuICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKCksXG4gICAgICBmcm9tOiBleHRlbmQoXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gSWYgaGFzIHN1YmZhY2V0IGZvciBsaW5lL2FyZWEgZ3JvdXAsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIG91dGVyIHN1YmZhY2V0IGdyb3VwIGJlbG93LlxuICAgICAgICAvLyBJZiBoYXMgbm8gc3ViZmFjZXQsIGFkZCBmcm9tLmRhdGEuXG4gICAgICAgIGlzRmFjZXRlZCB8fCBkZXRhaWxzLmxlbmd0aCA+IDAgPyB7fSA6IGRhdGFGcm9tLFxuXG4gICAgICAgIC8vIHNvcnQgdHJhbnNmb3JtXG4gICAgICAgIHt0cmFuc2Zvcm06IFt7IHR5cGU6ICdzb3J0JywgYnk6IHNvcnRQYXRoQnkobW9kZWwpfV19XG4gICAgICApLFxuICAgICAgcHJvcGVydGllczogeyB1cGRhdGU6IG1hcmtDb21waWxlclttYXJrXS5wcm9wZXJ0aWVzKG1vZGVsKSB9XG4gICAgfVxuICBdO1xuXG4gIGlmIChkZXRhaWxzLmxlbmd0aCA+IDApIHsgLy8gaGF2ZSBsZXZlbCBvZiBkZXRhaWxzIC0gbmVlZCB0byBmYWNldCBsaW5lIGludG8gc3ViZ3JvdXBzXG4gICAgY29uc3QgZmFjZXRUcmFuc2Zvcm0gPSB7IHR5cGU6ICdmYWNldCcsIGdyb3VwYnk6IGRldGFpbHMgfTtcbiAgICBjb25zdCB0cmFuc2Zvcm06IGFueVtdID0gbWFyayA9PT0gQVJFQSAmJiBtb2RlbC5zdGFjaygpID9cbiAgICAgIC8vIEZvciBzdGFja2VkIGFyZWEsIHdlIG5lZWQgdG8gaW1wdXRlIG1pc3NpbmcgdHVwbGVzIGFuZCBzdGFjayB2YWx1ZXNcbiAgICAgIC8vIChNYXJrIGxheWVyIG9yZGVyIGRvZXMgbm90IG1hdHRlciBmb3Igc3RhY2tlZCBjaGFydHMpXG4gICAgICBzdGFja1RyYW5zZm9ybXMobW9kZWwsIHRydWUpLmNvbmNhdChmYWNldFRyYW5zZm9ybSkgOlxuICAgICAgLy8gRm9yIG5vbi1zdGFja2VkIHBhdGggKGxpbmUvYXJlYSksIHdlIG5lZWQgdG8gZmFjZXQgYW5kIHBvc3NpYmx5IHNvcnRcbiAgICAgIFtdLmNvbmNhdChcbiAgICAgICAgZmFjZXRUcmFuc2Zvcm0sXG4gICAgICAgIC8vIGlmIG1vZGVsIGhhcyBgb3JkZXJgLCB0aGVuIHNvcnQgbWFyaydzIGxheWVyIG9yZGVyIGJ5IGBvcmRlcmAgZmllbGQocylcbiAgICAgICAgbW9kZWwuaGFzKE9SREVSKSA/IFt7dHlwZTonc29ydCcsIGJ5OiBzb3J0QnkobW9kZWwpfV0gOiBbXVxuICAgICAgKTtcblxuICAgIHJldHVybiBbe1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgncGF0aGdyb3VwJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgYWRkIGl0IGhlcmUuXG4gICAgICAgIGlzRmFjZXRlZCA/IHt9IDogZGF0YUZyb20sXG4gICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zZm9ybX1cbiAgICAgICksXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgICAgICBoZWlnaHQ6IHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFya3M6IHBhdGhNYXJrc1xuICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXRoTWFya3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VOb25QYXRoTWFyayhtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IG1hcmsgPSBtb2RlbC5tYXJrKCk7XG4gIGNvbnN0IGlzRmFjZXRlZCA9IG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuXG4gIGxldCBtYXJrcyA9IFtdOyAvLyBUT0RPOiB2Z01hcmtzXG4gIGlmIChtYXJrID09PSBURVhUTUFSSyAmJlxuICAgIG1vZGVsLmhhcyhDT0xPUikgJiZcbiAgICBtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpXG4gICkge1xuICAgIC8vIGFkZCBiYWNrZ3JvdW5kIHRvICd0ZXh0JyBtYXJrcyBpZiBoYXMgY29sb3JcbiAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgbmFtZTogbW9kZWwubmFtZSgnYmFja2dyb3VuZCcpLFxuICAgICAgICB0eXBlOiAncmVjdCdcbiAgICAgIH0sXG4gICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgLy8gUHJvcGVydGllc1xuICAgICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogdGV4dC5iYWNrZ3JvdW5kKG1vZGVsKSB9IH1cbiAgICApKTtcbiAgfVxuXG4gIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ21hcmtzJyksXG4gICAgICB0eXBlOiBtYXJrQ29tcGlsZXJbbWFya10ubWFya1R5cGUoKVxuICAgIH0sXG4gICAgLy8gQWRkIGBmcm9tYCBpZiBuZWVkZWRcbiAgICAoIWlzRmFjZXRlZCB8fCBtb2RlbC5zdGFjaygpIHx8IG1vZGVsLmhhcyhPUkRFUikpID8ge1xuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBmYWNldGVkLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlXG4gICAgICAgIGlzRmFjZXRlZCA/IHt9IDogZGF0YUZyb20sXG4gICAgICAgIC8vIGBmcm9tLnRyYW5zZm9ybWBcbiAgICAgICAgbW9kZWwuc3RhY2soKSA/IC8vIFN0YWNrZWQgQ2hhcnQgbmVlZCBzdGFjayB0cmFuc2Zvcm1cbiAgICAgICAgICB7IHRyYW5zZm9ybTogc3RhY2tUcmFuc2Zvcm1zKG1vZGVsLCBmYWxzZSkgfSA6XG4gICAgICAgIG1vZGVsLmhhcyhPUkRFUikgP1xuICAgICAgICAgIC8vIGlmIG5vbi1zdGFja2VkLCBkZXRhaWwgZmllbGQgZGV0ZXJtaW5lcyB0aGUgbGF5ZXIgb3JkZXIgb2YgZWFjaCBtYXJrXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IFt7dHlwZTonc29ydCcsIGJ5OiBzb3J0QnkobW9kZWwpfV0gfSA6XG4gICAgICAgICAge31cbiAgICAgIClcbiAgICB9IDoge30sXG4gICAgLy8gcHJvcGVydGllcyBncm91cHNcbiAgICB7IHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfSB9XG4gICkpO1xuXG4gIGlmIChtb2RlbC5oYXMoTEFCRUwpICYmIG1hcmtDb21waWxlclttYXJrXS5sYWJlbHMpIHtcbiAgICBjb25zdCBsYWJlbFByb3BlcnRpZXMgPSBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKG1vZGVsKTtcblxuICAgIC8vIGNoZWNrIGlmIHdlIGhhdmUgbGFiZWwgbWV0aG9kIGZvciBjdXJyZW50IG1hcmsgdHlwZS5cbiAgICBpZiAobGFiZWxQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHsgLy8gSWYgbGFiZWwgaXMgc3VwcG9ydGVkXG4gICAgICAvLyBhZGQgbGFiZWwgZ3JvdXBcbiAgICAgIG1hcmtzLnB1c2goZXh0ZW5kKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogbW9kZWwubmFtZSgnbGFiZWwnKSxcbiAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgfSxcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IHtmcm9tOiBkYXRhRnJvbX0sXG4gICAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbGFiZWxQcm9wZXJ0aWVzIH0gfVxuICAgICAgKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hcmtzO1xufVxuXG5mdW5jdGlvbiBzb3J0QnkobW9kZWw6IFVuaXRNb2RlbCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgaWYgKG1vZGVsLmhhcyhPUkRFUikpIHtcbiAgICBsZXQgY2hhbm5lbERlZiA9IG1vZGVsLmVuY29kaW5nKCkub3JkZXI7XG4gICAgaWYgKGNoYW5uZWxEZWYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gc29ydCBieSBtdWx0aXBsZSBmaWVsZHNcbiAgICAgIHJldHVybiBjaGFubmVsRGVmLm1hcChzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzb3J0IGJ5IG9uZSBmaWVsZFxuICAgICAgcmV0dXJuIHNvcnRGaWVsZChjaGFubmVsRGVmIGFzIE9yZGVyQ2hhbm5lbERlZik7IC8vIGhhdmUgdG8gYWRkIE9yZGVyQ2hhbm5lbERlZiB0byBtYWtlIHRzaWZ5IG5vdCBjb21wbGFpbmluZ1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDsgLy8gdXNlIGRlZmF1bHQgb3JkZXJcbn1cblxuLyoqXG4gKiBSZXR1cm4gcGF0aCBvcmRlciBmb3Igc29ydCB0cmFuc2Zvcm0ncyBieSBwcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBzb3J0UGF0aEJ5KG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5tYXJrKCkgPT09IExJTkUgJiYgbW9kZWwuaGFzKFBBVEgpKSB7XG4gICAgLy8gRm9yIG9ubHkgbGluZSwgc29ydCBieSB0aGUgcGF0aCBmaWVsZCBpZiBpdCBpcyBzcGVjaWZpZWQuXG4gICAgY29uc3QgY2hhbm5lbERlZiA9IG1vZGVsLmVuY29kaW5nKCkucGF0aDtcbiAgICBpZiAoY2hhbm5lbERlZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAvLyBzb3J0IGJ5IG11bHRpcGxlIGZpZWxkc1xuICAgICAgcmV0dXJuIGNoYW5uZWxEZWYubWFwKHNvcnRGaWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNvcnQgYnkgb25lIGZpZWxkXG4gICAgICByZXR1cm4gc29ydEZpZWxkKGNoYW5uZWxEZWYgYXMgT3JkZXJDaGFubmVsRGVmKTsgLy8gaGF2ZSB0byBhZGQgT3JkZXJDaGFubmVsRGVmIHRvIG1ha2UgdHNpZnkgbm90IGNvbXBsYWluaW5nXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEZvciBib3RoIGxpbmUgYW5kIGFyZWEsIHdlIHNvcnQgdmFsdWVzIGJhc2VkIG9uIGRpbWVuc2lvbiBieSBkZWZhdWx0XG4gICAgcmV0dXJuICctJyArIG1vZGVsLmZpZWxkKG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCA/IFkgOiBYLCB7YmluU3VmZml4OiAnX21pZCd9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgbGlzdCBvZiBkZXRhaWwgZmllbGRzIChmb3IgJ2NvbG9yJywgJ3NoYXBlJywgb3IgJ2RldGFpbCcgY2hhbm5lbHMpXG4gKiB0aGF0IHRoZSBtb2RlbCdzIHNwZWMgY29udGFpbnMuXG4gKi9cbmZ1bmN0aW9uIGRldGFpbEZpZWxkcyhtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nW10ge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIE9QQUNJVFksIFNIQVBFXS5yZWR1Y2UoZnVuY3Rpb24oZGV0YWlscywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmFnZ3JlZ2F0ZSkge1xuICAgICAgZGV0YWlscy5wdXNoKG1vZGVsLmZpZWxkKGNoYW5uZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH0sIFtdKTtcbn1cblxuXG5mdW5jdGlvbiBzdGFja1RyYW5zZm9ybXMobW9kZWw6IFVuaXRNb2RlbCwgaW1wdXRlOiBib29sZWFuKTogYW55W10ge1xuICBjb25zdCBzdGFja0J5RmllbGRzID0gZ2V0U3RhY2tCeUZpZWxkcyhtb2RlbCk7XG4gIGlmIChpbXB1dGUpIHtcbiAgICByZXR1cm4gW2ltcHV0ZVRyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyksIHN0YWNrVHJhbnNmb3JtKG1vZGVsLCBzdGFja0J5RmllbGRzKV07XG4gIH1cbiAgcmV0dXJuIFtzdGFja1RyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyldO1xufVxuXG5cbi8qKiBDb21waWxlIHN0YWNrLWJ5IGZpZWxkIG5hbWVzIGZyb20gKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG5mdW5jdGlvbiBnZXRTdGFja0J5RmllbGRzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3QgZW5jb2RpbmcgPSBtb2RlbC5lbmNvZGluZygpO1xuXG4gIHJldHVybiBTVEFDS19HUk9VUF9DSEFOTkVMUy5yZWR1Y2UoZnVuY3Rpb24oZmllbGRzLCBjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbEVuY29kaW5nID0gZW5jb2RpbmdbY2hhbm5lbF07XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykpIHtcbiAgICAgICAgY2hhbm5lbEVuY29kaW5nLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBmaWVsZHMucHVzaChmaWVsZChmaWVsZERlZikpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpZWxkRGVmOiBGaWVsZERlZiA9IGNoYW5uZWxFbmNvZGluZztcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgICAgZmllbGRzLnB1c2goZmllbGQoZmllbGREZWYsIHtcbiAgICAgICAgICBiaW5TdWZmaXg6IHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWVsZHM7XG4gIH0sIFtdKTtcbn1cblxuLy8gaW1wdXRlIGRhdGEgZm9yIHN0YWNrZWQgYXJlYVxuZnVuY3Rpb24gaW1wdXRlVHJhbnNmb3JtKG1vZGVsOiBVbml0TW9kZWwsIHN0YWNrRmllbGRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2ltcHV0ZScsXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgZ3JvdXBieTogc3RhY2tGaWVsZHMsXG4gICAgb3JkZXJieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsLCB7YmluU3VmZml4OiAnX21pZCd9KV0sXG4gICAgbWV0aG9kOiAndmFsdWUnLFxuICAgIHZhbHVlOiAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0YWNrVHJhbnNmb3JtKG1vZGVsOiBVbml0TW9kZWwsIHN0YWNrRmllbGRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIGNvbnN0IGVuY29kaW5nID0gbW9kZWwuZW5jb2RpbmcoKTtcbiAgY29uc3Qgc29ydGJ5ID0gbW9kZWwuaGFzKE9SREVSKSA/XG4gICAgKGlzQXJyYXkoZW5jb2RpbmdbT1JERVJdKSA/IGVuY29kaW5nW09SREVSXSA6IFtlbmNvZGluZ1tPUkRFUl1dKS5tYXAoc29ydEZpZWxkKSA6XG4gICAgLy8gZGVmYXVsdCA9IGRlc2NlbmRpbmcgYnkgc3RhY2tGaWVsZHNcbiAgICBzdGFja0ZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgcmV0dXJuICctJyArIGZpZWxkO1xuICAgIH0pO1xuXG4gIGNvbnN0IHZhbE5hbWUgPSBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpO1xuXG4gIC8vIGFkZCBzdGFjayB0cmFuc2Zvcm0gdG8gbWFya1xuICBsZXQgdHJhbnNmb3JtOiBWZ1N0YWNrVHJhbnNmb3JtID0ge1xuICAgIHR5cGU6ICdzdGFjaycsXG4gICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKHN0YWNrLmdyb3VwYnlDaGFubmVsLCB7YmluU3VmZml4OiAnX21pZCd9KV0sXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgc29ydGJ5OiBzb3J0YnksXG4gICAgb3V0cHV0OiB7XG4gICAgICBzdGFydDogdmFsTmFtZSArICdfc3RhcnQnLFxuICAgICAgZW5kOiB2YWxOYW1lICsgJ19lbmQnXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGFjay5vZmZzZXQpIHtcbiAgICB0cmFuc2Zvcm0ub2Zmc2V0ID0gc3RhY2sub2Zmc2V0O1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm07XG59XG4iLCJpbXBvcnQge1gsIFksIFNIQVBFLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtDaGFubmVsRGVmV2l0aExlZ2VuZCwgRmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBwb2ludCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsLCBmaXhlZFNoYXBlPzogc3RyaW5nKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBwLnNpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBtb2RlbC5zY2FsZShTSVpFKSwgY29uZmlnKTtcblxuICAgIHAuc2hhcGUgPSBzaGFwZShtb2RlbC5lbmNvZGluZygpLnNoYXBlLCBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpLCBtb2RlbC5zY2FsZShTSEFQRSksIGNvbmZpZywgZml4ZWRTaGFwZSk7XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IGZpZWxkRGVmLnZhbHVlIChmb3IgbGF5ZXJpbmcpXG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gIH1cblxuICBmdW5jdGlvbiB5KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IGZpZWxkRGVmLnZhbHVlIChmb3IgbGF5ZXJpbmcpXG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaXplKGZpZWxkRGVmOiBDaGFubmVsRGVmV2l0aExlZ2VuZCwgc2NhbGVOYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSwgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7c2NhbGVUeXBlOiBzY2FsZS50eXBlfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLnNpemUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNoYXBlKGZpZWxkRGVmOiBDaGFubmVsRGVmV2l0aExlZ2VuZCwgc2NhbGVOYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSwgY29uZmlnOiBDb25maWcsIGZpeGVkU2hhcGU/OiBzdHJpbmcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyBzaGFwZVxuICAgIGlmIChmaXhlZFNoYXBlKSB7IC8vIHNxdWFyZSBhbmQgY2lyY2xlIG1hcmtzXG4gICAgICByZXR1cm4geyB2YWx1ZTogZml4ZWRTaGFwZSB9O1xuICAgIH0gZWxzZSBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7c2NhbGVUeXBlOiBzY2FsZS50eXBlfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5zaGFwZSB9O1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgY2lyY2xlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ2NpcmNsZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBzcXVhcmUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIHJldHVybiBwb2ludC5wcm9wZXJ0aWVzKG1vZGVsLCAnc3F1YXJlJyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFNJWkV9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgcnVsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3J1bGUnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgZXhwbGljaXQgdmFsdWVcbiAgICBpZihtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gT3JpZW50LlZFUlRJQ0FMKSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7IHZhbHVlIDogMCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkgPSB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWTIpKSB7XG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWTIsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueTIgPSB7IHZhbHVlOiAwIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgICAgcC55ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueSA9IHsgdmFsdWU6IDAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZTogMCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFgyKSkge1xuICAgICAgICBwLngyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgyLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLngyID0geyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRklYTUU6IHRoaXMgZnVuY3Rpb24gd291bGQgb3ZlcndyaXRlIHN0cm9rZVdpZHRoIGJ1dCBzaG91bGRuJ3RcbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG5cbiAgICAvLyBzaXplXG4gICAgaWYgKG1vZGVsLmhhcyhTSVpFKSkge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLnN0cm9rZVdpZHRoID0geyB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsKSB9O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkubWFyay5ydWxlU2l6ZTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7YXBwbHlNYXJrQ29uZmlnLCBhcHBseUNvbG9yQW5kT3BhY2l0eSwgbnVtYmVyRm9ybWF0LCB0aW1lVGVtcGxhdGV9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRleHQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICd0ZXh0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeyB2YWx1ZTogMCB9LFxuICAgICAgeTogeyB2YWx1ZTogMCB9LFxuICAgICAgd2lkdGg6IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9LFxuICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH0sXG4gICAgICBmaWxsOiB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIG1vZGVsLmZpZWxkRGVmKENPTE9SKS50eXBlID09PSBPUkRJTkFMID8ge3ByZWZuOiAncmFua18nfSA6IHt9KVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuXG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLFxuICAgICAgWydhbmdsZScsICdhbGlnbicsICdiYXNlbGluZScsICdkeCcsICdkeScsICdmb250JywgJ2ZvbnRXZWlnaHQnLFxuICAgICAgICAnZm9udFN0eWxlJywgJ3JhZGl1cycsICd0aGV0YScsICd0ZXh0J10pO1xuXG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG4gICAgY29uc3QgdGV4dEZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoVEVYVCk7XG5cbiAgICBwLnggPSB4KG1vZGVsLmVuY29kaW5nKCkueCwgbW9kZWwuc2NhbGVOYW1lKFgpLCBjb25maWcsIHRleHRGaWVsZERlZik7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgcC5mb250U2l6ZSA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBtb2RlbC5zY2FsZU5hbWUoU0laRSksIGNvbmZpZyk7XG5cbiAgICBwLnRleHQgPSB0ZXh0KG1vZGVsLmVuY29kaW5nKCkudGV4dCwgbW9kZWwuc2NhbGVOYW1lKFRFWFQpLCBjb25maWcpO1xuXG4gICAgaWYgKG1vZGVsLmNvbmZpZygpLm1hcmsuYXBwbHlDb2xvclRvQmFja2dyb3VuZCAmJiAhbW9kZWwuaGFzKFgpICYmICFtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHAuZmlsbCA9IHt2YWx1ZTogJ2JsYWNrJ307IC8vIFRPRE86IGFkZCBydWxlcyBmb3Igc3dhcHBpbmcgYmV0d2VlbiBibGFjayBhbmQgd2hpdGVcbiAgICAgIC8vIG9wYWNpdHlcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9wYWNpdHk7XG4gICAgICBpZiAob3BhY2l0eSkgeyBwLm9wYWNpdHkgPSB7IHZhbHVlOiBvcGFjaXR5IH07IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoeEZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnLCB0ZXh0RmllbGREZWY6RmllbGREZWYpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKHhGaWVsZERlZikge1xuICAgICAgaWYgKHhGaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHhGaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHgudmFsdWUsIHguZGF0dW1cbiAgICBpZiAodGV4dEZpZWxkRGVmICYmIHRleHRGaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgIHJldHVybiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0sIG9mZnNldDogLTUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS50ZXh0QmFuZFdpZHRoIC8gMiB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHkoeUZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmICh5RmllbGREZWYpIHtcbiAgICAgIGlmICh5RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh5RmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETyBjb25zaWRlciBpZiB0aGlzIHNob3VsZCBzdXBwb3J0IGdyb3VwOiBoZWlnaHQgY2FzZSB0b28uXG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoc2l6ZUZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2l6ZVxuICAgIGlmIChzaXplRmllbGREZWYpIHtcbiAgICAgIGlmIChzaXplRmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChzaXplRmllbGREZWYpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoc2l6ZUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IHNpemVGaWVsZERlZi52YWx1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5mb250U2l6ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dCh0ZXh0RmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB0ZXh0XG4gICAgaWYgKHRleHRGaWVsZERlZikge1xuICAgICAgaWYgKHRleHRGaWVsZERlZi5maWVsZCkge1xuICAgICAgICBpZiAoUVVBTlRJVEFUSVZFID09PSB0ZXh0RmllbGREZWYudHlwZSkge1xuICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IG51bWJlckZvcm1hdCh0ZXh0RmllbGREZWYsIGNvbmZpZy5tYXJrLmZvcm1hdCwgY29uZmlnKTtcblxuICAgICAgICAgIGNvbnN0IGZpbHRlciA9ICdudW1iZXInICsgKCBmb3JtYXQgPyAnOlxcJycgKyBmb3JtYXQgKyAnXFwnJyA6ICcnKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICd7eycgKyBmaWVsZCh0ZXh0RmllbGREZWYsIHsgZGF0dW06IHRydWUgfSkgKyAnIHwgJyArIGZpbHRlciArICd9fSdcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKFRFTVBPUkFMID09PSB0ZXh0RmllbGREZWYudHlwZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGltZVRlbXBsYXRlKGZpZWxkKHRleHRGaWVsZERlZiwge2RhdHVtOiB0cnVlfSksIHRleHRGaWVsZERlZi50aW1lVW5pdCwgY29uZmlnLm1hcmsuZm9ybWF0LCBjb25maWcubWFyay5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZylcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGZpZWxkOiB0ZXh0RmllbGREZWYuZmllbGQgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0ZXh0RmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHRleHRGaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3ZhbHVlOiBjb25maWcubWFyay50ZXh0fTtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgdGljayB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3JlY3QnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgZXhwbGljaXQgdmFsdWVcblxuICAgIHAueGMgPSB4KG1vZGVsLmVuY29kaW5nKCkueCwgbW9kZWwuc2NhbGVOYW1lKFgpLCBjb25maWcpO1xuXG4gICAgcC55YyA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBpZiAoY29uZmlnLm1hcmsub3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgcC53aWR0aCA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBtb2RlbC5zY2FsZU5hbWUoU0laRSksIGNvbmZpZywgKG1vZGVsLnNjYWxlKFgpIHx8IHt9KS5iYW5kU2l6ZSk7XG4gICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IGNvbmZpZy5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC53aWR0aCA9IHsgdmFsdWU6IGNvbmZpZy5tYXJrLnRpY2tUaGlja25lc3MgfTtcbiAgICAgIHAuaGVpZ2h0ID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgY29uZmlnLCAobW9kZWwuc2NhbGUoWSkgfHwge30pLmJhbmRTaXplKTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogZmllbGREZWYudmFsdWV9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcsIHNjYWxlQmFuZFNpemU6IG51bWJlcik6IFZnVmFsdWVSZWYge1xuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGRcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmZpZy5tYXJrLnRpY2tTaXplKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1NpemUgfTtcbiAgICB9XG4gICAgY29uc3QgYmFuZFNpemUgPSBzY2FsZUJhbmRTaXplICE9PSB1bmRlZmluZWQgP1xuICAgICAgc2NhbGVCYW5kU2l6ZSA6XG4gICAgICBjb25maWcuc2NhbGUuYmFuZFNpemU7XG4gICAgcmV0dXJuIHsgdmFsdWU6IGJhbmRTaXplIC8gMS41IH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhLCBEYXRhVGFibGV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ1JlZHVjZSwgY2hhbm5lbE1hcHBpbmdGb3JFYWNofSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge1NvcnRGaWVsZCwgU29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7QmFzZVNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwgZmxhdHRlbiwgdmFscywgd2FybmluZywgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdNYXJrR3JvdXAsIFZnU2NhbGUsIFZnQXhpcywgVmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge0xheW91dENvbXBvbmVudH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtTY2FsZUNvbXBvbmVudHN9IGZyb20gJy4vc2NhbGUnO1xuXG4vKipcbiAqIENvbXBvc2FibGUgQ29tcG9uZW50cyB0aGF0IGFyZSBpbnRlcm1lZGlhdGUgcmVzdWx0cyBvZiB0aGUgcGFyc2luZyBwaGFzZSBvZiB0aGVcbiAqIGNvbXBpbGF0aW9ucy4gIFRoZXNlIGNvbXBvc2FibGUgY29tcG9uZW50cyB3aWxsIGJlIGFzc2VtYmxlZCBpbiB0aGUgbGFzdFxuICogY29tcGlsYXRpb24gc3RlcC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnQge1xuICBkYXRhOiBEYXRhQ29tcG9uZW50O1xuICBsYXlvdXQ6IExheW91dENvbXBvbmVudDtcbiAgc2NhbGU6IERpY3Q8U2NhbGVDb21wb25lbnRzPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gVmdBeGlzIGRlZmluaXRpb24gKi9cbiAgLy8gVE9ETzogaWYgd2UgYWxsb3cgbXVsdGlwbGUgYXhlcyAoZS5nLiwgZHVhbCBheGlzKSwgdGhpcyB3aWxsIGJlY29tZSBWZ0F4aXNbXVxuICBheGlzOiBEaWN0PFZnQXhpcz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnTGVnZW5kIGRlZmluaXRpb24gKi9cbiAgbGVnZW5kOiBEaWN0PFZnTGVnZW5kPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gYXhpcyBtYXJrIGdyb3VwIGZvciBmYWNldCBhbmQgY29uY2F0ICovXG4gIGF4aXNHcm91cDogRGljdDxWZ01hcmtHcm91cD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGdyaWQgbWFyayBncm91cCBmb3IgZmFjZXQgKGFuZCBjb25jYXQ/KSAqL1xuICBncmlkR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXBbXT47XG5cbiAgbWFyazogVmdNYXJrR3JvdXBbXTtcbn1cblxuY2xhc3MgTmFtZU1hcCB7XG4gIHByaXZhdGUgX25hbWVNYXA6IERpY3Q8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9uYW1lTWFwID0ge30gYXMgRGljdDxzdHJpbmc+O1xuICB9XG5cbiAgcHVibGljIHJlbmFtZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWVNYXBbb2xkTmFtZV0gPSBuZXdOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIElmIHRoZSBuYW1lIGFwcGVhcnMgaW4gdGhlIF9uYW1lTWFwLCB3ZSBuZWVkIHRvIHJlYWQgaXRzIG5ldyBuYW1lLlxuICAgIC8vIFdlIGhhdmUgdG8gbG9vcCBvdmVyIHRoZSBkaWN0IGp1c3QgaW4gY2FzZSwgdGhlIG5ldyBuYW1lIGFsc28gZ2V0cyByZW5hbWVkLlxuICAgIHdoaWxlICh0aGlzLl9uYW1lTWFwW25hbWVdKSB7XG4gICAgICBuYW1lID0gdGhpcy5fbmFtZU1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xuICBwcm90ZWN0ZWQgX3BhcmVudDogTW9kZWw7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIF9kYXRhOiBEYXRhO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3IgZGF0YSBzb3VyY2VzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX2RhdGFOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3Igc2NhbGVzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNpemUsIHdoaWNoIGNhbiBiZSByZW5hbWVkIGJ5IGEgbW9kZWwncyBwYXJlbnQuICovXG4gIHByb3RlY3RlZCBfc2l6ZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm06IFRyYW5zZm9ybTtcbiAgcHJvdGVjdGVkIF9zY2FsZTogRGljdDxTY2FsZT47XG5cbiAgcHJvdGVjdGVkIF9heGlzOiBEaWN0PEF4aXM+O1xuXG4gIHByb3RlY3RlZCBfbGVnZW5kOiBEaWN0PExlZ2VuZD47XG5cbiAgcHJvdGVjdGVkIF9jb25maWc6IENvbmZpZztcblxuICBwcm90ZWN0ZWQgX3dhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBCYXNlU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAvLyBJZiBuYW1lIGlzIG5vdCBwcm92aWRlZCwgYWx3YXlzIHVzZSBwYXJlbnQncyBnaXZlbk5hbWUgdG8gYXZvaWQgbmFtZSBjb25mbGljdHMuXG4gICAgdGhpcy5fbmFtZSA9IHNwZWMubmFtZSB8fCBwYXJlbnRHaXZlbk5hbWU7XG5cbiAgICAvLyBTaGFyZWQgbmFtZSBtYXBzXG4gICAgdGhpcy5fZGF0YU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX2RhdGFOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcbiAgICB0aGlzLl9zY2FsZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NjYWxlTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2l6ZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NpemVOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcblxuICAgIHRoaXMuX2RhdGEgPSBzcGVjLmRhdGE7XG5cbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHNwZWMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5fdHJhbnNmb3JtID0gc3BlYy50cmFuc2Zvcm07XG5cbiAgICB0aGlzLmNvbXBvbmVudCA9IHtkYXRhOiBudWxsLCBsYXlvdXQ6IG51bGwsIG1hcms6IG51bGwsIHNjYWxlOiBudWxsLCBheGlzOiBudWxsLCBheGlzR3JvdXA6IG51bGwsIGdyaWRHcm91cDogbnVsbCwgbGVnZW5kOiBudWxsfTtcbiAgfVxuXG5cbiAgcHVibGljIHBhcnNlKCkge1xuICAgIHRoaXMucGFyc2VEYXRhKCk7XG4gICAgdGhpcy5wYXJzZVNlbGVjdGlvbkRhdGEoKTtcbiAgICB0aGlzLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIHRoaXMucGFyc2VTY2FsZSgpOyAvLyBkZXBlbmRzIG9uIGRhdGEgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VMZWdlbmQoKTsgLy8gZGVwZW5kcyBvbiBzY2FsZSBuYW1lXG4gICAgdGhpcy5wYXJzZUF4aXNHcm91cCgpOyAvLyBkZXBlbmRzIG9uIGNoaWxkIGF4aXNcbiAgICB0aGlzLnBhcnNlR3JpZEdyb3VwKCk7XG4gICAgdGhpcy5wYXJzZU1hcmsoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWUgYW5kIHNjYWxlIG5hbWUsIGF4aXNHcm91cCwgZ3JpZEdyb3VwIGFuZCBjaGlsZHJlbidzIHNjYWxlLCBheGlzLCBsZWdlbmQgYW5kIG1hcmsuXG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VEYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2VsZWN0aW9uRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxheW91dERhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VTY2FsZSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZU1hcmsoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VBeGlzKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlTGVnZW5kKCk7XG5cbiAgLy8gVE9ETzogcmV2aXNlIGlmIHRoZXNlIHR3byBtZXRob2RzIG1ha2Ugc2Vuc2UgZm9yIHNoYXJlZCBzY2FsZSBjb25jYXRcbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpc0dyb3VwKCk7XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUdyaWRHcm91cCgpO1xuXG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIC8vIFRPRE86IGZvciBBcnZpbmQgdG8gd3JpdGVcbiAgLy8gcHVibGljIGFic3RyYWN0IGFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvbkRhdGEobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYXNzZW1ibGVTY2FsZXMoKTogVmdTY2FsZVtdIHtcbiAgICAvLyBGSVhNRTogd3JpdGUgYXNzZW1ibGVTY2FsZXMoKSBpbiBzY2FsZS50cyB0aGF0XG4gICAgLy8gaGVscCBhc3NlbWJsZSBzY2FsZSBkb21haW5zIHdpdGggc2NhbGUgc2lnbmF0dXJlIGFzIHdlbGxcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKHRoaXMuY29tcG9uZW50LnNjYWxlKS5tYXAoKHNjYWxlczogU2NhbGVDb21wb25lbnRzKSA9PiB7XG4gICAgICBsZXQgYXJyID0gW3NjYWxlcy5tYWluXTtcbiAgICAgIGlmIChzY2FsZXMuY29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChzY2FsZXMuYmluQ29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmJpbkNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlTWFya3MoKTogYW55W107IC8vIFRPRE86IFZnTWFya0dyb3VwW11cblxuICBwdWJsaWMgYXNzZW1ibGVBeGVzKCk6IFZnQXhpc1tdIHtcbiAgICByZXR1cm4gdmFscyh0aGlzLmNvbXBvbmVudC5heGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxlZ2VuZHMoKTogYW55W10geyAvLyBUT0RPOiBWZ0xlZ2VuZFtdXG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQubGVnZW5kKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUdyb3VwKCkge1xuICAgIGxldCBncm91cDogVmdNYXJrR3JvdXAgPSB7fTtcblxuICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgc2NhbGVzIHRvIGNvbWUgYmVmb3JlIG1hcmtzIGluIHRoZSBvdXRwdXQgc3BlYy5cblxuICAgIGdyb3VwLm1hcmtzID0gdGhpcy5hc3NlbWJsZU1hcmtzKCk7XG4gICAgY29uc3Qgc2NhbGVzID0gdGhpcy5hc3NlbWJsZVNjYWxlcygpO1xuICAgIGlmIChzY2FsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZ3JvdXAuc2NhbGVzID0gc2NhbGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGF4ZXMgPSB0aGlzLmFzc2VtYmxlQXhlcygpO1xuICAgIGlmIChheGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmF4ZXMgPSBheGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2VuZHMgPSB0aGlzLmFzc2VtYmxlTGVnZW5kcygpO1xuICAgIGlmIChsZWdlbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmxlZ2VuZHMgPSBsZWdlbmRzO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgY2hhbm5lbHMoKTogQ2hhbm5lbFtdO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBtYXBwaW5nKCk7XG5cbiAgcHVibGljIHJlZHVjZShmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LCBpbml0LCB0PzogYW55KSB7XG4gICAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nUmVkdWNlKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIGluaXQsIHQpO1xuICB9XG5cbiAgcHVibGljIGZvckVhY2goZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTpudW1iZXIpID0+IHZvaWQsIHQ/OiBhbnkpIHtcbiAgICBjaGFubmVsTWFwcGluZ0ZvckVhY2godGhpcy5jaGFubmVscygpLCB0aGlzLm1hcHBpbmcoKSwgZiwgdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuO1xuXG4gIHB1YmxpYyBwYXJlbnQoKTogTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgbmFtZSh0ZXh0OiBzdHJpbmcsIGRlbGltaXRlcjogc3RyaW5nID0gJ18nKSB7XG4gICAgcmV0dXJuICh0aGlzLl9uYW1lID8gdGhpcy5fbmFtZSArIGRlbGltaXRlciA6ICcnKSArIHRleHQ7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgcHVibGljIGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lRGF0YShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgICB0aGlzLl9kYXRhTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkYXRhIHNvdXJjZSBuYW1lIGZvciB0aGUgZ2l2ZW4gZGF0YSBzb3VyY2UgdHlwZS5cbiAgICpcbiAgICogRm9yIHVuaXQgc3BlYywgdGhpcyBpcyBhbHdheXMgc2ltcGx5IHRoZSBzcGVjLm5hbWUgKyAnLScgKyBkYXRhU291cmNlVHlwZS5cbiAgICogV2UgYWxyZWFkeSB1c2UgdGhlIG5hbWUgbWFwIHNvIHRoYXQgbWFya3MgYW5kIHNjYWxlcyB1c2UgdGhlIGNvcnJlY3QgZGF0YS5cbiAgICovXG4gIHB1YmxpYyBkYXRhTmFtZShkYXRhU291cmNlVHlwZTogRGF0YVRhYmxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YU5hbWVNYXAuZ2V0KHRoaXMubmFtZShTdHJpbmcoZGF0YVNvdXJjZVR5cGUpKSk7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lU2l6ZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NpemVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVsU2l6ZU5hbWUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZU5hbWUoY2hhbm5lbCA9PT0gWCB8fCBjaGFubmVsID09PSBDT0xVTU4gPyAnd2lkdGgnIDogJ2hlaWdodCcpO1xuICB9XG5cbiAgcHVibGljIHNpemVOYW1lKHNpemU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLl9zaXplTmFtZU1hcC5nZXQodGhpcy5uYW1lKHNpemUsICdfJykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGRhdGFUYWJsZSgpOiBzdHJpbmc7XG5cbiAgcHVibGljIHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm0gfHwge307XG4gIH1cblxuICAvKiogR2V0IFwiZmllbGRcIiByZWZlcmVuY2UgZm9yIHZlZ2EgKi9cbiAgcHVibGljIGZpZWxkKGNoYW5uZWw6IENoYW5uZWwsIG9wdDogRmllbGRSZWZPcHRpb24gPSB7fSkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gdGhpcy5maWVsZERlZihjaGFubmVsKTtcblxuICAgIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluIGhhcyBkZWZhdWx0IHN1ZmZpeCB0aGF0IGRlcGVuZHMgb24gc2NhbGVUeXBlXG4gICAgICBvcHQgPSBleHRlbmQoe1xuICAgICAgICBiaW5TdWZmaXg6IHRoaXMuc2NhbGUoY2hhbm5lbCkudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgPyAnX3JhbmdlJyA6ICdfc3RhcnQnXG4gICAgICB9LCBvcHQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZChmaWVsZERlZiwgb3B0KTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWY7XG5cbiAgcHVibGljIHNjYWxlKGNoYW5uZWw6IENoYW5uZWwpOiBTY2FsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlW2NoYW5uZWxdO1xuICB9XG5cbiAgLy8gVE9ETzogcmVuYW1lIHRvIGhhc09yZGluYWxTY2FsZVxuICBwdWJsaWMgaXNPcmRpbmFsU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5zY2FsZShjaGFubmVsKTtcbiAgICByZXR1cm4gc2NhbGUgJiYgc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lU2NhbGUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zY2FsZU5hbWVNYXAucmVuYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICB9XG5cbiAgLyoqIHJldHVybnMgc2NhbGUgbmFtZSBmb3IgYSBnaXZlbiBjaGFubmVsICovXG4gIHB1YmxpYyBzY2FsZU5hbWUoY2hhbm5lbDogQ2hhbm5lbHxzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZU5hbWVNYXAuZ2V0KHRoaXMubmFtZShjaGFubmVsICsgJycpKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3J0KGNoYW5uZWw6IENoYW5uZWwpOiBTb3J0RmllbGQgfCBTb3J0T3JkZXIge1xuICAgIHJldHVybiAodGhpcy5tYXBwaW5nKClbY2hhbm5lbF0gfHwge30pLnNvcnQ7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc3RhY2soKTtcblxuICBwdWJsaWMgYXhpcyhjaGFubmVsOiBDaGFubmVsKTogQXhpcyB7XG4gICAgcmV0dXJuIHRoaXMuX2F4aXNbY2hhbm5lbF07XG4gIH1cblxuICBwdWJsaWMgbGVnZW5kKGNoYW5uZWw6IENoYW5uZWwpOiBMZWdlbmQge1xuICAgIHJldHVybiB0aGlzLl9sZWdlbmRbY2hhbm5lbF07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzcGVjIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwdWJsaWMgY29uZmlnKCk6IENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyBhZGRXYXJuaW5nKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHdhcm5pbmcobWVzc2FnZSk7XG4gICAgdGhpcy5fd2FybmluZ3MucHVzaChtZXNzYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyB3YXJuaW5ncygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgY2hlY2tzXG4gICAqL1xuICBwdWJsaWMgaXNVbml0KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBwdWJsaWMgaXNGYWNldCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHVibGljIGlzTGF5ZXIoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvYmxvYi9tYXN0ZXIvZG9jL3NwZWMubWQjMTEtYW1iaWVudC1kZWNsYXJhdGlvbnNcbmRlY2xhcmUgdmFyIGV4cG9ydHM7XG5cbmltcG9ydCB7U0hBUkVEX0RPTUFJTl9PUFN9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBYMiwgWTIsIFNIQVBFLCBTSVpFLCBDT0xPUiwgT1BBQ0lUWSwgVEVYVCwgaGFzU2NhbGUsIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1RBQ0tFRF9TQ0FMRX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZCwgaXNNZWFzdXJlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge01hcmssIEJBUiwgVEVYVCBhcyBURVhUTUFSSywgUlVMRSwgVElDS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge2lzU29ydEZpZWxkLCBTb3J0T3JkZXJ9IGZyb20gJy4uL3NvcnQnO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi4vc3RhY2snO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGV4dGVuZCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnU2NhbGV9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge2RlZmF1bHRTY2FsZVR5cGUsIHJhd0RvbWFpbiwgc21hbGxlc3RVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcblxuLyoqXG4gKiBDb2xvciBSYW1wJ3Mgc2NhbGUgZm9yIGxlZ2VuZHMuICBUaGlzIHNjYWxlIGhhcyB0byBiZSBvcmRpbmFsIHNvIHRoYXQgaXRzXG4gKiBsZWdlbmRzIHNob3cgYSBsaXN0IG9mIG51bWJlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBDT0xPUl9MRUdFTkQgPSAnY29sb3JfbGVnZW5kJztcblxuLy8gc2NhbGUgdXNlZCB0byBnZXQgbGFiZWxzIGZvciBiaW5uZWQgY29sb3Igc2NhbGVzXG5leHBvcnQgY29uc3QgQ09MT1JfTEVHRU5EX0xBQkVMID0gJ2NvbG9yX2xlZ2VuZF9sYWJlbCc7XG5cblxuLy8gRklYTUU6IFdpdGggbGF5ZXIgYW5kIGNvbmNhdCwgc2NhbGVDb21wb25lbnQgc2hvdWxkIGRlY29tcG9zZSBiZXR3ZWVuXG4vLyBTY2FsZVNpZ25hdHVyZSBhbmQgU2NhbGVEb21haW5bXS5cbi8vIEJhc2ljYWxseSwgaWYgdHdvIHVuaXQgc3BlY3MgaGFzIHRoZSBzYW1lIHNjYWxlLCBzaWduYXR1cmUgZm9yIGEgcGFydGljdWxhciBjaGFubmVsLFxuLy8gdGhlIHNjYWxlIGNhbiBiZSB1bmlvbmVkIGJ5IGNvbWJpbmluZyB0aGUgZG9tYWluLlxuZXhwb3J0IHR5cGUgU2NhbGVDb21wb25lbnQgPSBWZ1NjYWxlO1xuXG5leHBvcnQgdHlwZSBTY2FsZUNvbXBvbmVudHMgPSB7XG4gIG1haW46IFNjYWxlQ29tcG9uZW50O1xuICBjb2xvckxlZ2VuZD86IFNjYWxlQ29tcG9uZW50LFxuICBiaW5Db2xvckxlZ2VuZD86IFNjYWxlQ29tcG9uZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNjYWxlQ29tcG9uZW50KG1vZGVsOiBNb2RlbCk6IERpY3Q8U2NhbGVDb21wb25lbnRzPiB7XG4gIC8vIFRPRE86IHNob3VsZCBtb2RlbC5jaGFubmVscygpIGlubGN1ZGUgWDIvWTI/XG4gIHJldHVybiBtb2RlbC5jaGFubmVscygpLnJlZHVjZShmdW5jdGlvbihzY2FsZTogRGljdDxTY2FsZUNvbXBvbmVudHM+LCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAobW9kZWwuc2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgICAgICAgY29uc3Qgc2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgbWFpbjogcGFyc2VNYWluU2NhbGUobW9kZWwsIGZpZWxkRGVmLCBjaGFubmVsKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIHNjYWxlcyBuZWVkZWQgdG8gc3VwcG9ydCBvcmRpbmFsIGxlZ2VuZHMgKGxpc3Qgb2YgdmFsdWVzKVxuICAgICAgICAvLyBmb3IgY29sb3IgcmFtcC5cbiAgICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SICYmIG1vZGVsLmxlZ2VuZChDT0xPUikgJiYgKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgfHwgZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSkge1xuICAgICAgICAgIHNjYWxlcy5jb2xvckxlZ2VuZCA9IHBhcnNlQ29sb3JMZWdlbmRTY2FsZShtb2RlbCwgZmllbGREZWYpO1xuICAgICAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgICAgIHNjYWxlcy5iaW5Db2xvckxlZ2VuZCA9IHBhcnNlQmluQ29sb3JMZWdlbmRMYWJlbChtb2RlbCwgZmllbGREZWYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNjYWxlW2NoYW5uZWxdID0gc2NhbGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGVDb21wb25lbnRzPik7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtYWluIHNjYWxlIGZvciBlYWNoIGNoYW5uZWwuICAoT25seSBjb2xvciBjYW4gaGF2ZSBtdWx0aXBsZSBzY2FsZXMuKVxuICovXG5mdW5jdGlvbiBwYXJzZU1haW5TY2FsZShtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcbiAgbGV0IHNjYWxlRGVmOiBhbnkgPSB7XG4gICAgbmFtZTogbW9kZWwuc2NhbGVOYW1lKGNoYW5uZWwpLFxuICAgIHR5cGU6IHNjYWxlLnR5cGUsXG4gIH07XG5cbiAgLy8gSWYgY2hhbm5lbCBpcyBlaXRoZXIgWCBvciBZIHRoZW4gdW5pb24gdGhlbSB3aXRoIFgyICYgWTIgaWYgdGhleSBleGlzdFxuICBpZiAoY2hhbm5lbCA9PT0gWCAmJiBtb2RlbC5oYXMoWDIpKSB7XG4gICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgc2NhbGVEZWYuZG9tYWluID0geyBmaWVsZHM6IFtkb21haW4oc2NhbGUsIG1vZGVsLCBYKSwgZG9tYWluKHNjYWxlLCBtb2RlbCwgWDIpXSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZURlZi5kb21haW4gPSBkb21haW4oc2NhbGUsIG1vZGVsLCBYMik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFkgJiYgbW9kZWwuaGFzKFkyKSkge1xuICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IHsgZmllbGRzOiBbZG9tYWluKHNjYWxlLCBtb2RlbCwgWSksIGRvbWFpbihzY2FsZSwgbW9kZWwsIFkyKV0gfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NhbGVEZWYuZG9tYWluID0gZG9tYWluKHNjYWxlLCBtb2RlbCwgWTIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzY2FsZURlZi5kb21haW4gPSBkb21haW4oc2NhbGUsIG1vZGVsLCBjaGFubmVsKTtcbiAgfVxuXG4gIGV4dGVuZChzY2FsZURlZiwgcmFuZ2VNaXhpbnMoc2NhbGUsIG1vZGVsLCBjaGFubmVsKSk7XG4gIGlmIChzb3J0ICYmIChpc1NvcnRGaWVsZChzb3J0KSA/IHNvcnQub3JkZXIgOiBzb3J0KSA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcpIHtcbiAgICBzY2FsZURlZi5yZXZlcnNlID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFkZCBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gIFtcbiAgICAvLyBnZW5lcmFsIHByb3BlcnRpZXNcbiAgICAncm91bmQnLFxuICAgIC8vIHF1YW50aXRhdGl2ZSAvIHRpbWVcbiAgICAnY2xhbXAnLCAnbmljZScsXG4gICAgLy8gcXVhbnRpdGF0aXZlXG4gICAgJ2V4cG9uZW50JywgJ3plcm8nLFxuICAgIC8vIG9yZGluYWxcbiAgICAncGFkZGluZycsICdwb2ludHMnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gZXhwb3J0c1twcm9wZXJ0eV0oc2NhbGUsIGNoYW5uZWwsIGZpZWxkRGVmLCBtb2RlbCk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjYWxlRGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNjYWxlRGVmO1xufVxuXG4vKipcbiAqICBSZXR1cm4gYSBzY2FsZSAgZm9yIHByb2R1Y2luZyBvcmRpbmFsIHNjYWxlIGZvciBsZWdlbmRzLlxuICogIC0gRm9yIGFuIG9yZGluYWwgZmllbGQsIHByb3ZpZGUgYW4gb3JkaW5hbCBzY2FsZSB0aGF0IG1hcHMgcmFuayB2YWx1ZXMgdG8gZmllbGQgdmFsdWVcbiAqICAtIEZvciBhIGZpZWxkIHdpdGggYmluIG9yIHRpbWVVbml0LCBwcm92aWRlIGFuIGlkZW50aXR5IG9yZGluYWwgc2NhbGVcbiAqICAgIChtYXBwaW5nIHRoZSBmaWVsZCB2YWx1ZXMgdG8gdGhlbXNlbHZlcylcbiAqL1xuZnVuY3Rpb24gcGFyc2VDb2xvckxlZ2VuZFNjYWxlKG1vZGVsOiBNb2RlbCwgZmllbGREZWY6IEZpZWxkRGVmKTogU2NhbGVDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkQpLFxuICAgIHR5cGU6IFNjYWxlVHlwZS5PUkRJTkFMLFxuICAgIGRvbWFpbjoge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAvLyB1c2UgcmFua188ZmllbGQ+IGZvciBvcmRpbmFsIHR5cGUsIGZvciBiaW4gYW5kIHRpbWVVbml0IHVzZSBkZWZhdWx0IGZpZWxkXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IsIChmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQpID8ge30gOiB7cHJlZm46ICdyYW5rXyd9KSxcbiAgICAgIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksIHNvcnQ6IHRydWV9XG4gIH07XG59XG5cbi8qKlxuICogIFJldHVybiBhbiBhZGRpdGlvbmFsIHNjYWxlIGZvciBiaW4gbGFiZWxzIGJlY2F1c2Ugd2UgbmVlZCB0byBtYXAgYmluX3N0YXJ0IHRvIGJpbl9yYW5nZSBpbiBsZWdlbmRzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQmluQ29sb3JMZWdlbmRMYWJlbChtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IFNjYWxlQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EX0xBQkVMKSxcbiAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSxcbiAgICAgIHNvcnQ6IHRydWVcbiAgICB9LFxuICAgIHJhbmdlOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge2JpblN1ZmZpeDogJ19yYW5nZSd9KSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVUeXBlKHNjYWxlOiBTY2FsZSwgZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsLCBtYXJrOiBNYXJrKTogU2NhbGVUeXBlIHtcbiAgaWYgKCFoYXNTY2FsZShjaGFubmVsKSkge1xuICAgIC8vIFRoZXJlIGlzIG5vIHNjYWxlIGZvciB0aGVzZSBjaGFubmVsc1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gV2UgY2FuJ3QgdXNlIGxpbmVhci90aW1lIGZvciByb3csIGNvbHVtbiBvciBzaGFwZVxuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRV0sIGNoYW5uZWwpKSB7XG4gICAgaWYgKHNjYWxlICYmIHNjYWxlLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBzY2FsZS50eXBlICE9PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gVE9ETzogY29uc29saWRhdGUgd2FybmluZ1xuICAgICAgY29uc29sZS53YXJuKCdDaGFubmVsJywgY2hhbm5lbCwgJ2RvZXMgbm90IHdvcmsgd2l0aCBzY2FsZSB0eXBlID0nLCBzY2FsZS50eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgaWYgKHNjYWxlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY2FsZS50eXBlO1xuICB9XG5cbiAgc3dpdGNoIChmaWVsZERlZi50eXBlKSB7XG4gICAgY2FzZSBOT01JTkFMOlxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgIGNhc2UgT1JESU5BTDpcbiAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgICByZXR1cm4gU2NhbGVUeXBlLkxJTkVBUjsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICBjYXNlIFRFTVBPUkFMOlxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTsgLy8gdGltZSBoYXMgb3JkZXIsIHNvIHVzZSBpbnRlcnBvbGF0ZWQgb3JkaW5hbCBjb2xvciBzY2FsZS5cbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2NhbGVUeXBlKGZpZWxkRGVmLnRpbWVVbml0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuVElNRTtcblxuICAgIGNhc2UgUVVBTlRJVEFUSVZFOlxuICAgICAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICByZXR1cm4gY29udGFpbnMoW1gsIFksIENPTE9SXSwgY2hhbm5lbCkgPyBTY2FsZVR5cGUuTElORUFSIDogU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLkxJTkVBUjtcbiAgfVxuXG4gIC8vIHNob3VsZCBuZXZlciByZWFjaCB0aGlzXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9tYWluKHNjYWxlOiBTY2FsZSwgbW9kZWw6IE1vZGVsLCBjaGFubmVsOkNoYW5uZWwpOiBhbnkge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gIGlmIChzY2FsZS5kb21haW4pIHsgLy8gZXhwbGljaXQgdmFsdWVcbiAgICByZXR1cm4gc2NhbGUuZG9tYWluO1xuICB9XG5cbiAgLy8gc3BlY2lhbCBjYXNlIGZvciB0ZW1wb3JhbCBzY2FsZVxuICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICBpZiAocmF3RG9tYWluKGZpZWxkRGVmLnRpbWVVbml0LCBjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogZmllbGREZWYudGltZVVuaXQsXG4gICAgICAgIGZpZWxkOiAnZGF0ZSdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgc29ydDoge1xuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICAgIG9wOiAnbWluJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBGb3Igc3RhY2ssIHVzZSBTVEFDS0VEIGRhdGEuXG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgaWYgKHN0YWNrICYmIGNoYW5uZWwgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgIGlmKHN0YWNrLm9mZnNldCA9PT0gU3RhY2tPZmZzZXQuTk9STUFMSVpFKSB7XG4gICAgICByZXR1cm4gWzAsIDFdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSksXG4gICAgICAvLyBTVEFDS0VEX1NDQUxFIHByb2R1Y2VzIHN1bSBvZiB0aGUgZmllbGQncyB2YWx1ZSBlLmcuLCBzdW0gb2Ygc3VtLCBzdW0gb2YgZGlzdGluY3RcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7cHJlZm46ICdzdW1fJ30pXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHVzZVJhd0RvbWFpbiA9IF91c2VSYXdEb21haW4oc2NhbGUsIG1vZGVsLCBjaGFubmVsKSxcbiAgc29ydCA9IGRvbWFpblNvcnQobW9kZWwsIGNoYW5uZWwsIHNjYWxlLnR5cGUpO1xuXG4gIGlmICh1c2VSYXdEb21haW4pIHsgLy8gdXNlUmF3RG9tYWluIC0gb25seSBRL1RcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogU09VUkNFLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtub0FnZ3JlZ2F0ZTogdHJ1ZX0pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluXG4gICAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgICAvLyBvcmRpbmFsIGJpbiBzY2FsZSB0YWtlcyBkb21haW4gZnJvbSBiaW5fcmFuZ2UsIG9yZGVyZWQgYnkgYmluX3N0YXJ0XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3JhbmdlJyB9KSxcbiAgICAgICAgc29ydDoge1xuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgb3A6ICdtaW4nIC8vIG1pbiBvciBtYXggZG9lc24ndCBtYXR0ZXIgc2luY2Ugc2FtZSBfcmFuZ2Ugd291bGQgaGF2ZSB0aGUgc2FtZSBfc3RhcnRcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAvLyBDdXJyZW50bHksIGJpbm5lZCBvbiBjb2xvciB1c2VzIGxpbmVhciBzY2FsZSBhbmQgdGh1cyB1c2UgX3N0YXJ0IHBvaW50XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXIgbGluZWFyIGJpbiBzY2FsZSBtZXJnZXMgYm90aCBiaW5fc3RhcnQgYW5kIGJpbl9lbmQgZm9yIG5vbi1vcmRpbmFsIHNjYWxlXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgZmllbGQ6IFtcbiAgICAgICAgICBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICBdXG4gICAgICB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChzb3J0KSB7IC8vIGhhdmUgc29ydCAtLSBvbmx5IGZvciBvcmRpbmFsXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIElmIHNvcnQgYnkgYWdncmVnYXRpb24gb2YgYSBzcGVjaWZpZWQgc29ydCBmaWVsZCwgd2UgbmVlZCB0byB1c2UgU09VUkNFIHRhYmxlLFxuICAgICAgLy8gc28gd2UgY2FuIGFnZ3JlZ2F0ZSB2YWx1ZXMgZm9yIHRoZSBzY2FsZSBpbmRlcGVuZGVudGx5IGZyb20gdGhlIG1haW4gYWdncmVnYXRpb24uXG4gICAgICBkYXRhOiBzb3J0Lm9wID8gU09VUkNFIDogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAncmFua18nfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHNvcnRcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCAmJiBjaGFubmVsID09PSBDT0xPUikgPyBtb2RlbC5maWVsZChjaGFubmVsLCB7cHJlZm46ICdyYW5rXyd9KSA6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpblNvcnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IFNjYWxlVHlwZSk6IGFueSB7XG4gIGlmIChzY2FsZVR5cGUgIT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHNvcnQgPSBtb2RlbC5zb3J0KGNoYW5uZWwpO1xuXG4gIC8vIFNvcnRlZCBiYXNlZCBvbiBhbiBhZ2dyZWdhdGUgY2FsY3VsYXRpb24gb3ZlciBhIHNwZWNpZmllZCBzb3J0IGZpZWxkIChvbmx5IGZvciBvcmRpbmFsIHNjYWxlKVxuICBpZiAoaXNTb3J0RmllbGQoc29ydCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cblxuICBpZiAoY29udGFpbnMoW1NvcnRPcmRlci5BU0NFTkRJTkcsIFNvcnRPcmRlci5ERVNDRU5ESU5HLCB1bmRlZmluZWQgLyogZGVmYXVsdCA9YXNjZW5kaW5nKi9dLCBzb3J0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gc29ydCA9PT0gJ25vbmUnXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdXNlUmF3RG9tYWluIHNob3VsZCBiZSBhY3RpdmF0ZWQgZm9yIHRoaXMgc2NhbGUuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0b25zIGFwcGxpZXM6XG4gKiAxLiBgdXNlUmF3RG9tYWluYCBpcyBlbmFibGVkIGVpdGhlciB0aHJvdWdoIHNjYWxlIG9yIGNvbmZpZ1xuICogMi4gQWdncmVnYXRpb24gZnVuY3Rpb24gaXMgbm90IGBjb3VudGAgb3IgYHN1bWBcbiAqIDMuIFRoZSBzY2FsZSBpcyBxdWFudGl0YXRpdmUgb3IgdGltZSBzY2FsZS5cbiAqL1xuZnVuY3Rpb24gX3VzZVJhd0RvbWFpbiAoc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICByZXR1cm4gc2NhbGUudXNlUmF3RG9tYWluICYmIC8vICBpZiB1c2VSYXdEb21haW4gaXMgZW5hYmxlZFxuICAgIC8vIG9ubHkgYXBwbGllZCB0byBhZ2dyZWdhdGUgdGFibGVcbiAgICBmaWVsZERlZi5hZ2dyZWdhdGUgJiZcbiAgICAvLyBvbmx5IGFjdGl2YXRlZCBpZiB1c2VkIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2VzIHZhbHVlcyByYW5naW5nIGluIHRoZSBkb21haW4gb2YgdGhlIHNvdXJjZSBkYXRhXG4gICAgU0hBUkVEX0RPTUFJTl9PUFMuaW5kZXhPZihmaWVsZERlZi5hZ2dyZWdhdGUpID49IDAgJiZcbiAgICAoXG4gICAgICAvLyBRIGFsd2F5cyB1c2VzIHF1YW50aXRhdGl2ZSBzY2FsZSBleGNlcHQgd2hlbiBpdCdzIGJpbm5lZC5cbiAgICAgIC8vIEJpbm5lZCBmaWVsZCBoYXMgc2ltaWxhciB2YWx1ZXMgaW4gYm90aCB0aGUgc291cmNlIHRhYmxlIGFuZCB0aGUgc3VtbWFyeSB0YWJsZVxuICAgICAgLy8gYnV0IHRoZSBzdW1tYXJ5IHRhYmxlIGhhcyBmZXdlciB2YWx1ZXMsIHRoZXJlZm9yZSBiaW5uZWQgZmllbGRzIGRyYXdcbiAgICAgIC8vIGRvbWFpbiB2YWx1ZXMgZnJvbSB0aGUgc3VtbWFyeSB0YWJsZS5cbiAgICAgIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikgfHxcbiAgICAgIC8vIFQgdXNlcyBub24tb3JkaW5hbCBzY2FsZSB3aGVuIHRoZXJlJ3Mgbm8gdW5pdCBvciB3aGVuIHRoZSB1bml0IGlzIG5vdCBvcmRpbmFsLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKVxuICAgICk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlTWl4aW5zKHNjYWxlOiBTY2FsZSwgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogYW55IHtcbiAgLy8gVE9ETzogbmVlZCB0byBhZGQgcnVsZSBmb3IgcXVhbnRpbGUsIHF1YW50aXplLCB0aHJlc2hvbGQgc2NhbGVcblxuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBzY2FsZS5iYW5kU2l6ZSAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIHtiYW5kU2l6ZTogc2NhbGUuYmFuZFNpemV9O1xuICB9XG5cbiAgaWYgKHNjYWxlLnJhbmdlICYmICFjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU5dLCBjaGFubmVsKSkge1xuICAgIC8vIGV4cGxpY2l0IHZhbHVlIChEbyBub3QgYWxsb3cgZXhwbGljaXQgdmFsdWVzIGZvciBYLCBZLCBST1csIENPTFVNTilcbiAgICByZXR1cm4ge3JhbmdlOiBzY2FsZS5yYW5nZX07XG4gIH1cbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgICByZXR1cm4ge3JhbmdlOiAnaGVpZ2h0J307XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4ge3JhbmdlOiAnd2lkdGgnfTtcbiAgfVxuXG4gIC8vIElmIG5vdCBST1cgLyBDT0xVTU4sIHdlIGNhbiBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgdW5pdCBzcGVjLlxuICBjb25zdCB1bml0TW9kZWwgPSBtb2RlbCBhcyBVbml0TW9kZWw7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICAgIC8vIHdlIGNhbid0IHVzZSB7cmFuZ2U6IFwid2lkdGhcIn0gaGVyZSBzaW5jZSB3ZSBwdXQgc2NhbGUgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgIC8vIG5vdCBpbnNpZGUgdGhlIGNlbGwsIHNvIHNjYWxlIGlzIHJldXNhYmxlIGZvciBheGVzIGdyb3VwXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlTWluOiAwLFxuICAgICAgICByYW5nZU1heDogdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLy8gRml4ZWQgY2VsbCB3aWR0aCBmb3Igbm9uLW9yZGluYWxcbiAgICAgIH07XG4gICAgY2FzZSBZOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLmhlaWdodCwgLy8gRml4ZWQgY2VsbCBoZWlnaHQgZm9yIG5vbi1vcmRpbmFsXG4gICAgICAgIHJhbmdlTWF4OiAwXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcblxuICAgICAgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IEJBUikge1xuICAgICAgICBpZiAoc2NhbGVDb25maWcuYmFyU2l6ZVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2V9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCA/IFkgOiBYO1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBbbW9kZWwuY29uZmlnKCkubWFyay5iYXJUaGluU2l6ZSwgbW9kZWwuc2NhbGUoZGltZW5zaW9uKS5iYW5kU2l6ZV19O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBURVhUTUFSSykge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5mb250U2l6ZVJhbmdlIH07XG4gICAgICB9IGVsc2UgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IFJVTEUpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucnVsZVNpemVSYW5nZSB9O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBUSUNLKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnRpY2tTaXplUmFuZ2UgfTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgLS0gcG9pbnQsIHNxdWFyZSwgY2lyY2xlXG4gICAgICBpZiAoc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5wb2ludFNpemVSYW5nZX07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhbmRTaXplID0gcG9pbnRCYW5kU2l6ZSh1bml0TW9kZWwpO1xuXG4gICAgICByZXR1cm4ge3JhbmdlOiBbOSwgKGJhbmRTaXplIC0gMikgKiAoYmFuZFNpemUgLSAyKV19O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5zaGFwZVJhbmdlfTtcbiAgICBjYXNlIENPTE9SOlxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE5PTUlOQUwpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcubm9taW5hbENvbG9yUmFuZ2V9O1xuICAgICAgfVxuICAgICAgLy8gZWxzZSAtLSBvcmRpbmFsLCB0aW1lLCBvciBxdWFudGl0YXRpdmVcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNlcXVlbnRpYWxDb2xvclJhbmdlfTtcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5vcGFjaXR5fTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHBvaW50QmFuZFNpemUobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGNvbnN0IGhhc1ggPSBtb2RlbC5oYXMoWCk7XG4gIGNvbnN0IGhhc1kgPSBtb2RlbC5oYXMoWSk7XG5cbiAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShtb2RlbC5lbmNvZGluZygpLngpO1xuICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKG1vZGVsLmVuY29kaW5nKCkueSk7XG5cbiAgaWYgKGhhc1ggJiYgaGFzWSkge1xuICAgIHJldHVybiB4SXNNZWFzdXJlICE9PSB5SXNNZWFzdXJlID9cbiAgICAgIG1vZGVsLnNjYWxlKHhJc01lYXN1cmUgPyBZIDogWCkuYmFuZFNpemUgOlxuICAgICAgTWF0aC5taW4oXG4gICAgICAgIG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplLFxuICAgICAgICBtb2RlbC5zY2FsZShZKS5iYW5kU2l6ZSB8fCBzY2FsZUNvbmZpZy5iYW5kU2l6ZVxuICAgICAgKTtcbiAgfSBlbHNlIGlmIChoYXNZKSB7XG4gICAgcmV0dXJuIHlJc01lYXN1cmUgPyBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSA6IG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplO1xuICB9IGVsc2UgaWYgKGhhc1gpIHtcbiAgICByZXR1cm4geElzTWVhc3VyZSA/IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIDogbW9kZWwuc2NhbGUoWCkuYmFuZFNpemU7XG4gIH1cbiAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAoc2NhbGU6IFNjYWxlKSB7XG4gIC8vIE9ubHkgd29ya3MgZm9yIHNjYWxlIHdpdGggYm90aCBjb250aW51b3VzIGRvbWFpbiBjb250aW51b3VzIHJhbmdlXG4gIC8vIChEb2Vzbid0IHdvcmsgZm9yIHF1YW50aXplLCBxdWFudGlsZSwgdGhyZXNob2xkLCBvcmRpbmFsKVxuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULFxuICAgICAgICBTY2FsZVR5cGUuTE9HLCBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKSB7XG4gICAgcmV0dXJuIHNjYWxlLmNsYW1wO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudChzY2FsZTogU2NhbGUpIHtcbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5QT1cpIHtcbiAgICByZXR1cm4gc2NhbGUuZXhwb25lbnQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5pY2Uoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpOiBib29sZWFuIHwgTmljZVRpbWUge1xuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULCBTY2FsZVR5cGUuTE9HLFxuICAgICAgICBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLlFVQU5USVpFXSwgc2NhbGUudHlwZSkpIHtcblxuICAgIGlmIChzY2FsZS5uaWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS5uaWNlO1xuICAgIH1cbiAgICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpIHtcbiAgICAgIHJldHVybiBzbWFsbGVzdFVuaXQoZmllbGREZWYudGltZVVuaXQpIGFzIGFueTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7IC8vIHJldHVybiB0cnVlIGZvciBxdWFudGl0YXRpdmUgWC9ZXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLyogUGFkZGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIFggYW5kIFkuXG4gICAqXG4gICAqIEJhc2ljYWxseSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gYWRkIHBhZGRpbmcgZm9yIGNvbG9yIGFuZCBzaXplLlxuICAgKlxuICAgKiBXZSBkbyBub3QgdXNlIGQzIHNjYWxlJ3MgcGFkZGluZyBmb3Igcm93L2NvbHVtbiBiZWNhdXNlIHBhZGRpbmcgdGhlcmVcbiAgICogaXMgYSByYXRpbyAoWzAsIDFdKSBhbmQgaXQgY2F1c2VzIHRoZSBwYWRkaW5nIHRvIGJlIGRlY2ltYWxzLlxuICAgKiBUaGVyZWZvcmUsIHdlIG1hbnVhbGx5IGNhbGN1bGF0ZSBwYWRkaW5nIGluIHRoZSBsYXlvdXQgYnkgb3Vyc2VsdmVzLlxuICAgKi9cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gc2NhbGUucGFkZGluZztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgX18sIG1vZGVsOiBNb2RlbCkge1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIC8vIFdlIGFsd2F5cyB1c2Ugb3JkaW5hbCBwb2ludCBzY2FsZSBmb3IgeCBhbmQgeS5cbiAgICAvLyBUaHVzIGBwb2ludHNgIGlzbid0IGluY2x1ZGVkIGluIHRoZSBzY2FsZSdzIHNjaGVtYS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU4sIFNJWkVdLCBjaGFubmVsKSAmJiBzY2FsZS5yb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnJvdW5kO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8oc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgLy8gb25seSBhcHBsaWNhYmxlIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICBpZiAoIWNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLk9SRElOQUxdLCBzY2FsZS50eXBlKSkge1xuICAgIGlmIChzY2FsZS56ZXJvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS56ZXJvO1xuICAgIH1cbiAgICAvLyBCeSBkZWZhdWx0LCByZXR1cm4gdHJ1ZSBvbmx5IGZvciBub24tYmlubmVkLCBxdWFudGl0YXRpdmUgeC1zY2FsZSBvciB5LXNjYWxlXG4gICAgLy8gSWYgbm8gY3VzdG9tIGRvbWFpbiBpcyBwcm92aWRlZC5cbiAgICByZXR1cm4gIXNjYWxlLmRvbWFpbiAmJiAhZmllbGREZWYuYmluICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0F4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFRFWFQsIFBBVEgsIE9SREVSLCBDaGFubmVsLCBVTklUX0NIQU5ORUxTLCAgVU5JVF9TQ0FMRV9DSEFOTkVMUywgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUywgc3VwcG9ydE1hcmt9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWcsIENlbGxDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4uL2VuY29kaW5nJzsgLy8gVE9ETzogcmVtb3ZlXG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtNYXJrLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWUsIFFVQU5USVRBVElWRX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2R1cGxpY2F0ZSwgZXh0ZW5kLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2FwcGx5Q29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUd9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7aW5pdE1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZVVuaXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge3BhcnNlTGVnZW5kQ29tcG9uZW50fSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZVVuaXRMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZU1hcmt9IGZyb20gJy4vbWFyay9tYXJrJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudCwgc2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7c3RhY2ssIFN0YWNrUHJvcGVydGllc30gZnJvbSAnLi4vc3RhY2snO1xuXG4vKipcbiAqIEludGVybmFsIG1vZGVsIG9mIFZlZ2EtTGl0ZSBzcGVjaWZpY2F0aW9uIGZvciB0aGUgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbml0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG5cbiAgcHJpdmF0ZSBfbWFyazogTWFyaztcbiAgcHJpdmF0ZSBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuICBwcml2YXRlIF9zdGFjazogU3RhY2tQcm9wZXJ0aWVzO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgY29uc3QgbWFyayA9IHRoaXMuX21hcmsgPSBzcGVjLm1hcms7XG4gICAgY29uc3QgZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZyA9IHRoaXMuX2luaXRFbmNvZGluZyhtYXJrLCBzcGVjLmVuY29kaW5nIHx8IHt9KTtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQsIG1hcmssIGVuY29kaW5nKTtcblxuICAgIHRoaXMuX3NjYWxlID0gIHRoaXMuX2luaXRTY2FsZShtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICB0aGlzLl9heGlzID0gdGhpcy5faW5pdEF4aXMoZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fbGVnZW5kID0gdGhpcy5faW5pdExlZ2VuZChlbmNvZGluZywgY29uZmlnKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdGFjayBwcm9wZXJ0aWVzXG4gICAgdGhpcy5fc3RhY2sgPSBzdGFjayhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFbmNvZGluZyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZW5jb2RpbmcgPSBkdXBsaWNhdGUoZW5jb2RpbmcpO1xuXG4gICAgdmxFbmNvZGluZy5mb3JFYWNoKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmICghc3VwcG9ydE1hcmsoY2hhbm5lbCwgbWFyaykpIHtcbiAgICAgICAgLy8gRHJvcCB1bnN1cHBvcnRlZCBjaGFubmVsXG5cbiAgICAgICAgLy8gRklYTUUgY29uc29saWRhdGUgd2FybmluZyBtZXRob2RcbiAgICAgICAgY29uc29sZS53YXJuKGNoYW5uZWwsICdkcm9wcGVkIGFzIGl0IGlzIGluY29tcGF0aWJsZSB3aXRoJywgbWFyayk7XG4gICAgICAgIGRlbGV0ZSBmaWVsZERlZi5maWVsZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudHlwZSkge1xuICAgICAgICAvLyBjb252ZXJ0IHNob3J0IHR5cGUgdG8gZnVsbCB0eXBlXG4gICAgICAgIGZpZWxkRGVmLnR5cGUgPSBnZXRGdWxsTmFtZShmaWVsZERlZi50eXBlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChjaGFubmVsID09PSBQQVRIIHx8IGNoYW5uZWwgPT09IE9SREVSKSAmJiAhZmllbGREZWYuYWdncmVnYXRlICYmIGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBBZ2dyZWdhdGVPcC5NSU47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuY29kaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwsIG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgIGxldCBjb25maWcgPSBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSwgc3BlY0NvbmZpZyk7XG4gICAgY29uZmlnLm1hcmsgPSBpbml0TWFya0NvbmZpZyhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PFNjYWxlPiB7XG4gICAgcmV0dXJuIFVOSVRfU0NBTEVfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKF9zY2FsZSwgY2hhbm5lbCkge1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSB8fFxuICAgICAgICAgIChjaGFubmVsID09PSBYICYmIHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBYMikpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFkgJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFkyKSlcbiAgICAgICAgKSB7XG5cbiAgICAgICAgY29uc3QgY2hhbm5lbERlZiA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSAoY2hhbm5lbERlZiB8fCB7fSkuc2NhbGUgfHwge307XG4gICAgICAgIGNvbnN0IF9zY2FsZVR5cGUgPSBzY2FsZVR5cGUoc2NhbGVTcGVjLCBjaGFubmVsRGVmLCBjaGFubmVsLCBtYXJrKTtcblxuICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6IF9zY2FsZVR5cGUsXG4gICAgICAgICAgcm91bmQ6IGNvbmZpZy5zY2FsZS5yb3VuZCxcbiAgICAgICAgICBwYWRkaW5nOiBjb25maWcuc2NhbGUucGFkZGluZyxcbiAgICAgICAgICB1c2VSYXdEb21haW46IGNvbmZpZy5zY2FsZS51c2VSYXdEb21haW4sXG4gICAgICAgICAgYmFuZFNpemU6IGNoYW5uZWwgPT09IFggJiYgX3NjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgbWFyayA9PT0gVEVYVE1BUksgP1xuICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNjYWxlLnRleHRCYW5kV2lkdGggOiBjb25maWcuc2NhbGUuYmFuZFNpemVcbiAgICAgICAgfSwgc2NhbGVTcGVjKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZT4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF4aXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IERpY3Q8QXhpcz4ge1xuICAgIHJldHVybiBbWCwgWV0ucmVkdWNlKGZ1bmN0aW9uKF9heGlzLCBjaGFubmVsKSB7XG4gICAgICAvLyBQb3NpdGlvbiBBeGlzXG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFggJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFgyKSkgfHxcbiAgICAgICAgICAoY2hhbm5lbCA9PT0gWSAmJiB2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgWTIpKSkge1xuXG4gICAgICAgIGNvbnN0IGF4aXNTcGVjID0gKGVuY29kaW5nW2NoYW5uZWxdIHx8IHt9KS5heGlzO1xuICAgICAgICBpZiAoYXhpc1NwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2F4aXNbY2hhbm5lbF0gPSBleHRlbmQoe30sXG4gICAgICAgICAgICBjb25maWcuYXhpcyxcbiAgICAgICAgICAgIGF4aXNTcGVjID09PSB0cnVlID8ge30gOiBheGlzU3BlYyB8fCAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TGVnZW5kKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PExlZ2VuZD4ge1xuICAgIHJldHVybiBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfbGVnZW5kLCBjaGFubmVsKSB7XG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGxlZ2VuZFNwZWMgPSBlbmNvZGluZ1tjaGFubmVsXS5sZWdlbmQ7XG4gICAgICAgIGlmIChsZWdlbmRTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIF9sZWdlbmRbY2hhbm5lbF0gPSBleHRlbmQoe30sIGNvbmZpZy5sZWdlbmQsXG4gICAgICAgICAgICBsZWdlbmRTcGVjID09PSB0cnVlID8ge30gOiBsZWdlbmRTcGVjIHx8ICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfbGVnZW5kO1xuICAgIH0sIHt9IGFzIERpY3Q8TGVnZW5kPik7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZVVuaXREYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZVVuaXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBwYXJzZU1hcmsodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1gsIFldKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSBwYXJzZUxlZ2VuZENvbXBvbmVudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFyaztcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKSB7XG4gICAgcmV0dXJuIGFwcGx5Q29uZmlnKHt9LCBjZWxsQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFVOSVRfQ0hBTk5FTFM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCk6IFN0YWNrUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrO1xuICB9XG5cbiAgcHVibGljIHRvU3BlYyhleGNsdWRlQ29uZmlnPywgZXhjbHVkZURhdGE/KSB7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBkdXBsaWNhdGUodGhpcy5fZW5jb2RpbmcpO1xuICAgIGxldCBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fbWFyayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgIH07XG5cbiAgICBpZiAoIWV4Y2x1ZGVDb25maWcpIHtcbiAgICAgIHNwZWMuY29uZmlnID0gZHVwbGljYXRlKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFleGNsdWRlRGF0YSkge1xuICAgICAgc3BlYy5kYXRhID0gZHVwbGljYXRlKHRoaXMuX2RhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgcHVibGljIG1hcmsoKTogTWFyayB7XG4gICAgcmV0dXJuIHRoaXMuX21hcms7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5oYXModGhpcy5fZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGVuY29kaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHx8IHt9XG4gICAgLy8gQ3VycmVudGx5IHdlIGhhdmUgaXQgdG8gcHJldmVudCBudWxsIHBvaW50ZXIgZXhjZXB0aW9uLlxuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZ1tjaGFubmVsXSB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgXCJmaWVsZFwiIHJlZmVyZW5jZSBmb3IgdmVnYSAqL1xuICBwdWJsaWMgZmllbGQoY2hhbm5lbDogQ2hhbm5lbCwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogdGhpcy5zY2FsZShjaGFubmVsKS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgIH0sIG9wdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkKGZpZWxkRGVmLCBvcHQpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTmFtZSh2bEVuY29kaW5nLmlzQWdncmVnYXRlKHRoaXMuX2VuY29kaW5nKSA/IFNVTU1BUlkgOiBTT1VSQ0UpO1xuICB9XG5cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTY2FsZUNvbmZpZywgRmFjZXRTY2FsZUNvbmZpZywgZGVmYXVsdFNjYWxlQ29uZmlnLCBkZWZhdWx0RmFjZXRTY2FsZUNvbmZpZ30gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge0F4aXNDb25maWcsIGRlZmF1bHRBeGlzQ29uZmlnLCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtMZWdlbmRDb25maWcsIGRlZmF1bHRMZWdlbmRDb25maWd9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4vc3RhY2snO1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxDb25maWcge1xuICB3aWR0aD86IG51bWJlcjtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuXG4gIGNsaXA/OiBib29sZWFuO1xuXG4gIC8vIEZJTExfU1RST0tFX0NPTkZJR1xuICAvKipcbiAgICogVGhlIGZpbGwgY29sb3IuXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGZpbGw/OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBmaWxsIG9wYWNpdHkgKHZhbHVlIGJldHdlZW4gWzAsMV0pLiAqL1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcblxuICAvKiogVGhlIHN0cm9rZSBjb2xvci4gKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgc3Ryb2tlIG9wYWNpdHkgKHZhbHVlIGJldHdlZW4gWzAsMV0pLiAqL1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKiBUaGUgc3Ryb2tlIHdpZHRoLCBpbiBwaXhlbHMuICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuICovXG4gIHN0cm9rZURhc2g/OiBudW1iZXJbXTtcblxuICAvKiogVGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBpbnRvIHdoaWNoIHRvIGJlZ2luIGRyYXdpbmcgd2l0aCB0aGUgc3Ryb2tlIGRhc2ggYXJyYXkuICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgd2lkdGg6IDIwMCxcbiAgaGVpZ2h0OiAyMDBcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRDZWxsQ29uZmlnOiBDZWxsQ29uZmlnID0ge1xuICBzdHJva2U6ICcjY2NjJyxcbiAgc3Ryb2tlV2lkdGg6IDFcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRDb25maWcge1xuICAvKiogRmFjZXQgU2NhbGUgQ29uZmlnICovXG4gIHNjYWxlPzogRmFjZXRTY2FsZUNvbmZpZztcblxuICAvKiogRmFjZXQgQXhpcyBDb25maWcgKi9cbiAgYXhpcz86IEF4aXNDb25maWc7XG5cbiAgLyoqIEZhY2V0IEdyaWQgQ29uZmlnICovXG4gIGdyaWQ/OiBGYWNldEdyaWRDb25maWc7XG5cbiAgLyoqIEZhY2V0IENlbGwgQ29uZmlnICovXG4gIGNlbGw/OiBDZWxsQ29uZmlnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0R3JpZENvbmZpZyB7XG4gIC8qKiBAZm9ybWF0IGNvbG9yICovXG4gIGNvbG9yPzogc3RyaW5nO1xuICBvcGFjaXR5PzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG59XG5cbmNvbnN0IGRlZmF1bHRGYWNldEdyaWRDb25maWc6IEZhY2V0R3JpZENvbmZpZyA9IHtcbiAgY29sb3I6ICcjMDAwMDAwJyxcbiAgb3BhY2l0eTogMC40LFxuICBvZmZzZXQ6IDBcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRDb25maWc6IEZhY2V0Q29uZmlnID0ge1xuICBzY2FsZTogZGVmYXVsdEZhY2V0U2NhbGVDb25maWcsXG4gIGF4aXM6IGRlZmF1bHRGYWNldEF4aXNDb25maWcsXG4gIGdyaWQ6IGRlZmF1bHRGYWNldEdyaWRDb25maWcsXG4gIGNlbGw6IGRlZmF1bHRGYWNldENlbGxDb25maWdcbn07XG5cbmV4cG9ydCBlbnVtIEZvbnRXZWlnaHQge1xuICAgIE5PUk1BTCA9ICdub3JtYWwnIGFzIGFueSxcbiAgICBCT0xEID0gJ2JvbGQnIGFzIGFueVxufVxuXG5leHBvcnQgZW51bSBTaGFwZSB7XG4gICAgQ0lSQ0xFID0gJ2NpcmNsZScgYXMgYW55LFxuICAgIFNRVUFSRSA9ICdzcXVhcmUnIGFzIGFueSxcbiAgICBDUk9TUyA9ICdjcm9zcycgYXMgYW55LFxuICAgIERJQU1PTkQgPSAnZGlhbW9uZCcgYXMgYW55LFxuICAgIFRSSUFOR0xFVVAgPSAndHJpYW5nbGUtdXAnIGFzIGFueSxcbiAgICBUUklBTkdMRURPV04gPSAndHJpYW5nbGUtZG93bicgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBPcmllbnQge1xuICBIT1JJWk9OVEFMID0gJ2hvcml6b250YWwnIGFzIGFueSxcbiAgVkVSVElDQUwgPSAndmVydGljYWwnIGFzIGFueVxufVxuXG5leHBvcnQgZW51bSBIb3Jpem9udGFsQWxpZ24ge1xuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIFJJR0hUID0gJ3JpZ2h0JyBhcyBhbnksXG4gICAgQ0VOVEVSID0gJ2NlbnRlcicgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBWZXJ0aWNhbEFsaWduIHtcbiAgICBUT1AgPSAndG9wJyBhcyBhbnksXG4gICAgTUlERExFID0gJ21pZGRsZScgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gRm9udFN0eWxlIHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgSVRBTElDID0gJ2l0YWxpYycgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBJbnRlcnBvbGF0ZSB7XG4gICAgLyoqIHBpZWNld2lzZSBsaW5lYXIgc2VnbWVudHMsIGFzIGluIGEgcG9seWxpbmUgKi9cbiAgICBMSU5FQVIgPSAnbGluZWFyJyBhcyBhbnksXG4gICAgLyoqIGNsb3NlIHRoZSBsaW5lYXIgc2VnbWVudHMgdG8gZm9ybSBhIHBvbHlnb24gKi9cbiAgICBMSU5FQVJfQ0xPU0VEID0gJ2xpbmVhci1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVAgPSAnc3RlcCcgYXMgYW55LFxuICAgIC8qKiBhbHRlcm5hdGUgYmV0d2VlbiB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBzZWdtZW50cywgYXMgaW4gYSBzdGVwIGZ1bmN0aW9uICovXG4gICAgU1RFUF9CRUZPUkUgPSAnc3RlcC1iZWZvcmUnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVBfQUZURVIgPSAnc3RlcC1hZnRlcicgYXMgYW55LFxuICAgIC8qKiBhIEItc3BsaW5lLCB3aXRoIGNvbnRyb2wgcG9pbnQgZHVwbGljYXRpb24gb24gdGhlIGVuZHMgKi9cbiAgICBCQVNJUyA9ICdiYXNpcycgYXMgYW55LFxuICAgIC8qKiBhbiBvcGVuIEItc3BsaW5lOyBtYXkgbm90IGludGVyc2VjdCB0aGUgc3RhcnQgb3IgZW5kICovXG4gICAgQkFTSVNfT1BFTiA9ICdiYXNpcy1vcGVuJyBhcyBhbnksXG4gICAgLyoqIGEgY2xvc2VkIEItc3BsaW5lLCBhcyBpbiBhIGxvb3AgKi9cbiAgICBCQVNJU19DTE9TRUQgPSAnYmFzaXMtY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGEgQ2FyZGluYWwgc3BsaW5lLCB3aXRoIGNvbnRyb2wgcG9pbnQgZHVwbGljYXRpb24gb24gdGhlIGVuZHMgKi9cbiAgICBDQVJESU5BTCA9ICdjYXJkaW5hbCcgYXMgYW55LFxuICAgIC8qKiBhbiBvcGVuIENhcmRpbmFsIHNwbGluZTsgbWF5IG5vdCBpbnRlcnNlY3QgdGhlIHN0YXJ0IG9yIGVuZCwgYnV0IHdpbGwgaW50ZXJzZWN0IG90aGVyIGNvbnRyb2wgcG9pbnRzICovXG4gICAgQ0FSRElOQUxfT1BFTiA9ICdjYXJkaW5hbC1vcGVuJyBhcyBhbnksXG4gICAgLyoqIGEgY2xvc2VkIENhcmRpbmFsIHNwbGluZSwgYXMgaW4gYSBsb29wICovXG4gICAgQ0FSRElOQUxfQ0xPU0VEID0gJ2NhcmRpbmFsLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBlcXVpdmFsZW50IHRvIGJhc2lzLCBleGNlcHQgdGhlIHRlbnNpb24gcGFyYW1ldGVyIGlzIHVzZWQgdG8gc3RyYWlnaHRlbiB0aGUgc3BsaW5lICovXG4gICAgQlVORExFID0gJ2J1bmRsZScgYXMgYW55LFxuICAgIC8qKiBjdWJpYyBpbnRlcnBvbGF0aW9uIHRoYXQgcHJlc2VydmVzIG1vbm90b25pY2l0eSBpbiB5ICovXG4gICAgTU9OT1RPTkUgPSAnbW9ub3RvbmUnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gQXJlYU92ZXJsYXkge1xuICBMSU5FID0gJ2xpbmUnIGFzIGFueSxcbiAgTElORVBPSU5UID0gJ2xpbmVwb2ludCcgYXMgYW55LFxuICBOT05FID0gJ25vbmUnIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE92ZXJsYXlDb25maWcge1xuICAvKipcbiAgICogV2hldGhlciB0byBvdmVybGF5IGxpbmUgd2l0aCBwb2ludC5cbiAgICovXG4gIGxpbmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIG92ZXJsYXkgZm9yIGFyZWEgbWFyayAobGluZSBvciBsaW5lcG9pbnQpXG4gICAqL1xuICBhcmVhPzogQXJlYU92ZXJsYXk7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgc3R5bGUgZm9yIHRoZSBvdmVybGF5ZWQgcG9pbnQuXG4gICAqL1xuICBwb2ludFN0eWxlPzogTWFya0NvbmZpZztcblxuICAvKipcbiAgICogRGVmYXVsdCBzdHlsZSBmb3IgdGhlIG92ZXJsYXllZCBwb2ludC5cbiAgICovXG4gIGxpbmVTdHlsZT86IE1hcmtDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3ZlcmxheUNvbmZpZzogT3ZlcmxheUNvbmZpZyA9IHtcbiAgbGluZTogZmFsc2UsXG4gIHBvaW50U3R5bGU6IHtmaWxsZWQ6IHRydWV9LFxuICBsaW5lU3R5bGU6IHt9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtDb25maWcge1xuXG4gIC8vIC0tLS0tLS0tLS0gQ29sb3IgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2hhcGVcXCdzIGNvbG9yIHNob3VsZCBiZSB1c2VkIGFzIGZpbGwgY29sb3IgaW5zdGVhZCBvZiBzdHJva2UgY29sb3IuXG4gICAqIFRoaXMgaXMgb25seSBhcHBsaWNhYmxlIGZvciBcImJhclwiLCBcInBvaW50XCIsIGFuZCBcImFyZWFcIi5cbiAgICogQWxsIG1hcmtzIGV4Y2VwdCBcInBvaW50XCIgbWFya3MgYXJlIGZpbGxlZCBieSBkZWZhdWx0LlxuICAgKiBTZWUgTWFyayBEb2N1bWVudGF0aW9uIChodHRwOi8vdmVnYS5naXRodWIuaW8vdmVnYS1saXRlL2RvY3MvbWFya3MuaHRtbClcbiAgICogZm9yIHVzYWdlIGV4YW1wbGUuXG4gICAqL1xuICBmaWxsZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbG9yLlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBjb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBGaWxsIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgZmlsbD86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBTdHJva2UgQ29sb3IuICBUaGlzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIGNvbmZpZy5jb2xvclxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBzdHJva2U/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBPcGFjaXR5IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgb3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKiBAbWF4aW11bSAxXG4gICAqL1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gU3Ryb2tlIFN0eWxlIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBzdHJva2UsIHNwYWNlIGxlbmd0aHMgZm9yIGNyZWF0aW5nIGRhc2hlZCBvciBkb3R0ZWQgbGluZXMuXG4gICAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LlxuICAgKi9cbiAgc3Ryb2tlRGFzaE9mZnNldD86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFN0YWNraW5nOiBCYXIgJiBBcmVhIC0tLS0tLS0tLS1cbiAgc3RhY2tlZD86IFN0YWNrT2Zmc2V0O1xuXG4gIC8vIC0tLS0tLS0tLS0gT3JpZW50YXRpb246IEJhciwgVGljaywgTGluZSwgQXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgYSBub24tc3RhY2tlZCBiYXIsIHRpY2ssIGFyZWEsIGFuZCBsaW5lIGNoYXJ0cy5cbiAgICogVGhlIHZhbHVlIGlzIGVpdGhlciBob3Jpem9udGFsIChkZWZhdWx0KSBvciB2ZXJ0aWNhbC5cbiAgICogLSBGb3IgYmFyLCBydWxlIGFuZCB0aWNrLCB0aGlzIGRldGVybWluZXMgd2hldGhlciB0aGUgc2l6ZSBvZiB0aGUgYmFyIGFuZCB0aWNrXG4gICAqIHNob3VsZCBiZSBhcHBsaWVkIHRvIHggb3IgeSBkaW1lbnNpb24uXG4gICAqIC0gRm9yIGFyZWEsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgb3JpZW50IHByb3BlcnR5IG9mIHRoZSBWZWdhIG91dHB1dC5cbiAgICogLSBGb3IgbGluZSwgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBzb3J0IG9yZGVyIG9mIHRoZSBwb2ludHMgaW4gdGhlIGxpbmVcbiAgICogaWYgYGNvbmZpZy5zb3J0TGluZUJ5YCBpcyBub3Qgc3BlY2lmaWVkLlxuICAgKiBGb3Igc3RhY2tlZCBjaGFydHMsIHRoaXMgaXMgYWx3YXlzIGRldGVybWluZWQgYnkgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzdGFjaztcbiAgICogdGhlcmVmb3JlIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHZhbHVlIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIG9yaWVudD86IE9yaWVudDtcblxuICAvLyAtLS0tLS0tLS0tIEludGVycG9sYXRpb246IExpbmUgLyBhcmVhIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBsaW5lIGludGVycG9sYXRpb24gbWV0aG9kIHRvIHVzZS4gT25lIG9mIGxpbmVhciwgc3RlcC1iZWZvcmUsIHN0ZXAtYWZ0ZXIsIGJhc2lzLCBiYXNpcy1vcGVuLCBjYXJkaW5hbCwgY2FyZGluYWwtb3BlbiwgbW9ub3RvbmUuXG4gICAqL1xuICBpbnRlcnBvbGF0ZT86IEludGVycG9sYXRlO1xuICAvKipcbiAgICogRGVwZW5kaW5nIG9uIHRoZSBpbnRlcnBvbGF0aW9uIHR5cGUsIHNldHMgdGhlIHRlbnNpb24gcGFyYW1ldGVyLlxuICAgKi9cbiAgdGVuc2lvbj86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIExpbmUgLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBTaXplIG9mIGxpbmUgbWFyay5cbiAgICovXG4gIGxpbmVTaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gUnVsZSAtLS0tLS0tLS1cbiAgLyoqXG4gICAqIFNpemUgb2YgcnVsZSBtYXJrLlxuICAgKi9cbiAgcnVsZVNpemU/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBCYXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMuICBJZiB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgc2l6ZSBpcyAgYGJhbmRTaXplLTFgLFxuICAgKiB3aGljaCBwcm92aWRlcyAxIHBpeGVsIG9mZnNldCBiZXR3ZWVuIGJhcnMuXG4gICAqL1xuICBiYXJTaXplPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgYmFycyBvbiBjb250aW51b3VzIHNjYWxlcy5cbiAgICovXG4gIGJhclRoaW5TaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHN5bWJvbCBzaGFwZSB0byB1c2UuIE9uZSBvZiBjaXJjbGUgKGRlZmF1bHQpLCBzcXVhcmUsIGNyb3NzLCBkaWFtb25kLCB0cmlhbmdsZS11cCwgb3IgdHJpYW5nbGUtZG93bi5cbiAgICovXG4gIHNoYXBlPzogU2hhcGU7XG5cbiAgLy8gLS0tLS0tLS0tLSBQb2ludCBTaXplIChQb2ludCAvIFNxdWFyZSAvIENpcmNsZSkgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIHBpeGVsIGFyZWEgZWFjaCB0aGUgcG9pbnQuIEZvciBleGFtcGxlOiBpbiB0aGUgY2FzZSBvZiBjaXJjbGVzLCB0aGUgcmFkaXVzIGlzIGRldGVybWluZWQgaW4gcGFydCBieSB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHNpemUgdmFsdWUuXG4gICAqL1xuICBzaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGljayAtLS0tLS0tLS0tXG4gIC8qKiBUaGUgd2lkdGggb2YgdGhlIHRpY2tzLiAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcblxuICAvKiogVGhpY2tuZXNzIG9mIHRoZSB0aWNrIG1hcmsuICovXG4gIHRpY2tUaGlja25lc3M/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBUZXh0IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIGxlZnQsIHJpZ2h0LCBjZW50ZXIuXG4gICAqL1xuICBhbGlnbj86IEhvcml6b250YWxBbGlnbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgdGV4dCwgaW4gZGVncmVlcy5cbiAgICovXG4gIGFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGUgdGV4dC4gT25lIG9mIHRvcCwgbWlkZGxlLCBib3R0b20uXG4gICAqL1xuICBiYXNlbGluZT86IFZlcnRpY2FsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR4PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHZlcnRpY2FsIG9mZnNldCwgaW4gcGl4ZWxzLCBiZXR3ZWVuIHRoZSB0ZXh0IGxhYmVsIGFuZCBpdHMgYW5jaG9yIHBvaW50LiBUaGUgb2Zmc2V0IGlzIGFwcGxpZWQgYWZ0ZXIgcm90YXRpb24gYnkgdGhlIGFuZ2xlIHByb3BlcnR5LlxuICAgKi9cbiAgZHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIHJhZGlhbCBvZmZzZXQsIGluIHBpeGVscywgb2YgdGhlIHRleHQgbGFiZWwgZnJvbSB0aGUgb3JpZ2luIGRldGVybWluZWQgYnkgdGhlIHggYW5kIHkgcHJvcGVydGllcy5cbiAgICovXG4gIHJhZGl1cz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFBvbGFyIGNvb3JkaW5hdGUgYW5nbGUsIGluIHJhZGlhbnMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuIFZhbHVlcyBmb3IgdGhldGEgZm9sbG93IHRoZSBzYW1lIGNvbnZlbnRpb24gb2YgYXJjIG1hcmsgc3RhcnRBbmdsZSBhbmQgZW5kQW5nbGUgcHJvcGVydGllczogYW5nbGVzIGFyZSBtZWFzdXJlZCBpbiByYWRpYW5zLCB3aXRoIDAgaW5kaWNhdGluZyBcIm5vcnRoXCIuXG4gICAqL1xuICB0aGV0YT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB0eXBlZmFjZSB0byBzZXQgdGhlIHRleHQgaW4gKGUuZy4sIEhlbHZldGljYSBOZXVlKS5cbiAgICovXG4gIGZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplLCBpbiBwaXhlbHMuXG4gICAqL1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBmb250IHN0eWxlIChlLmcuLCBpdGFsaWMpLlxuICAgKi9cbiAgZm9udFN0eWxlPzogRm9udFN0eWxlO1xuICAvKipcbiAgICogVGhlIGZvbnQgd2VpZ2h0IChlLmcuLCBib2xkKS5cbiAgICovXG4gIGZvbnRXZWlnaHQ/OiBGb250V2VpZ2h0O1xuICAvLyBWZWdhLUxpdGUgb25seSBmb3IgdGV4dCBvbmx5XG4gIC8qKlxuICAgKiBUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciB0ZXh0IHZhbHVlLiBJZiBub3QgZGVmaW5lZCwgdGhpcyB3aWxsIGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseS5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIFRleHRcbiAgICovXG4gIHRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNvbG9yIGZpZWxkIHRvIGJhY2tncm91bmQgY29sb3IgaW5zdGVhZCBvZiB0aGUgdGV4dC5cbiAgICovXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7XG4gIGNvbG9yOiAnIzQ2ODJiNCcsXG4gIHNoYXBlOiBTaGFwZS5DSVJDTEUsXG4gIHN0cm9rZVdpZHRoOiAyLFxuICBzaXplOiAzMCxcbiAgYmFyVGhpblNpemU6IDIsXG4gIC8vIGxpbmVTaXplIGlzIHVuZGVmaW5lZCBieSBkZWZhdWx0LCBhbmQgcmVmZXIgdG8gdmFsdWUgZnJvbSBzdHJva2VXaWR0aFxuICBydWxlU2l6ZTogMSxcbiAgdGlja1RoaWNrbmVzczogMSxcblxuICBmb250U2l6ZTogMTAsXG4gIGJhc2VsaW5lOiBWZXJ0aWNhbEFsaWduLk1JRERMRSxcbiAgdGV4dDogJ0FiYycsXG5cbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZSxcbiAgYXBwbHlDb2xvclRvQmFja2dyb3VuZDogZmFsc2Vcbn07XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAvLyBUT0RPOiBhZGQgdGhpcyBiYWNrIG9uY2Ugd2UgaGF2ZSB0b3AtZG93biBsYXlvdXQgYXBwcm9hY2hcbiAgLy8gd2lkdGg/OiBudW1iZXI7XG4gIC8vIGhlaWdodD86IG51bWJlcjtcbiAgLy8gcGFkZGluZz86IG51bWJlcnxzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgb24tc2NyZWVuIHZpZXdwb3J0LCBpbiBwaXhlbHMuIElmIG5lY2Vzc2FyeSwgY2xpcHBpbmcgYW5kIHNjcm9sbGluZyB3aWxsIGJlIGFwcGxpZWQuXG4gICAqL1xuICB2aWV3cG9ydD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENTUyBjb2xvciBwcm9wZXJ0eSB0byB1c2UgYXMgYmFja2dyb3VuZCBvZiB2aXN1YWxpemF0aW9uLiBEZWZhdWx0IGlzIGBcInRyYW5zcGFyZW50XCJgLlxuICAgKi9cbiAgYmFja2dyb3VuZD86IHN0cmluZztcblxuICAvKipcbiAgICogRDMgTnVtYmVyIGZvcm1hdCBmb3IgYXhpcyBsYWJlbHMgYW5kIHRleHQgdGFibGVzLiBGb3IgZXhhbXBsZSBcInNcIiBmb3IgU0kgdW5pdHMuXG4gICAqL1xuICBudW1iZXJGb3JtYXQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZGF0ZXRpbWUgZm9ybWF0IGZvciBheGlzIGFuZCBsZWdlbmQgbGFiZWxzLiBUaGUgZm9ybWF0IGNhbiBiZSBzZXQgZGlyZWN0bHkgb24gZWFjaCBheGlzIGFuZCBsZWdlbmQuXG4gICAqL1xuICB0aW1lRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGF4aXMgYW5kIGxlZ2VuZCB0aXRsZSBmb3IgY291bnQgZmllbGRzLlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgY291bnRUaXRsZT86IHN0cmluZztcblxuICAvKiogQ2VsbCBDb25maWcgKi9cbiAgY2VsbD86IENlbGxDb25maWc7XG5cbiAgLyoqIE1hcmsgQ29uZmlnICovXG4gIG1hcms/OiBNYXJrQ29uZmlnO1xuXG4gIC8qKiBNYXJrIE92ZXJsYXkgQ29uZmlnICovXG4gIG92ZXJsYXk/OiBPdmVybGF5Q29uZmlnO1xuXG4gIC8qKiBTY2FsZSBDb25maWcgKi9cbiAgc2NhbGU/OiBTY2FsZUNvbmZpZztcblxuICAvKiogQXhpcyBDb25maWcgKi9cbiAgYXhpcz86IEF4aXNDb25maWc7XG5cbiAgLyoqIExlZ2VuZCBDb25maWcgKi9cbiAgbGVnZW5kPzogTGVnZW5kQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBDb25maWcgKi9cbiAgZmFjZXQ/OiBGYWNldENvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IENvbmZpZyA9IHtcbiAgbnVtYmVyRm9ybWF0OiAncycsXG4gIHRpbWVGb3JtYXQ6ICclWS0lbS0lZCcsXG4gIGNvdW50VGl0bGU6ICdOdW1iZXIgb2YgUmVjb3JkcycsXG5cbiAgY2VsbDogZGVmYXVsdENlbGxDb25maWcsXG4gIG1hcms6IGRlZmF1bHRNYXJrQ29uZmlnLFxuICBvdmVybGF5OiBkZWZhdWx0T3ZlcmxheUNvbmZpZyxcbiAgc2NhbGU6IGRlZmF1bHRTY2FsZUNvbmZpZyxcbiAgYXhpczogZGVmYXVsdEF4aXNDb25maWcsXG4gIGxlZ2VuZDogZGVmYXVsdExlZ2VuZENvbmZpZyxcblxuICBmYWNldDogZGVmYXVsdEZhY2V0Q29uZmlnLFxufTtcbiIsIi8qXG4gKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YS5cbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL3R5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFGb3JtYXQge1xuICAvKipcbiAgICogVHlwZSBvZiBpbnB1dCBkYXRhOiBgXCJqc29uXCJgLCBgXCJjc3ZcImAsIGBcInRzdlwiYC5cbiAgICogVGhlIGRlZmF1bHQgZm9ybWF0IHR5cGUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBmaWxlIHVybC5cbiAgICogSWYgbm8gZXh0ZW5zaW9uIGlzIGRldGVjdGVkLCBgXCJqc29uXCJgIHdpbGwgYmUgdXNlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgdHlwZT86IERhdGFGb3JtYXRUeXBlO1xuXG4gIC8qKlxuICAgKiBKU09OIG9ubHkpIFRoZSBKU09OIHByb3BlcnR5IGNvbnRhaW5pbmcgdGhlIGRlc2lyZWQgZGF0YS5cbiAgICogVGhpcyBwYXJhbWV0ZXIgY2FuIGJlIHVzZWQgd2hlbiB0aGUgbG9hZGVkIEpTT04gZmlsZSBtYXkgaGF2ZSBzdXJyb3VuZGluZyBzdHJ1Y3R1cmUgb3IgbWV0YS1kYXRhLlxuICAgKiBGb3IgZXhhbXBsZSBgXCJwcm9wZXJ0eVwiOiBcInZhbHVlcy5mZWF0dXJlc1wiYCBpcyBlcXVpdmFsZW50IHRvIHJldHJpZXZpbmcgYGpzb24udmFsdWVzLmZlYXR1cmVzYFxuICAgKiBmcm9tIHRoZSBsb2FkZWQgSlNPTiBvYmplY3QuXG4gICAqL1xuICBwcm9wZXJ0eT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFRvcG9KU09OIG9iamVjdCBzZXQgdG8gY29udmVydCB0byBhIEdlb0pTT04gZmVhdHVyZSBjb2xsZWN0aW9uLlxuICAgKiBGb3IgZXhhbXBsZSwgaW4gYSBtYXAgb2YgdGhlIHdvcmxkLCB0aGVyZSBtYXkgYmUgYW4gb2JqZWN0IHNldCBuYW1lZCBgXCJjb3VudHJpZXNcImAuXG4gICAqIFVzaW5nIHRoZSBmZWF0dXJlIHByb3BlcnR5LCB3ZSBjYW4gZXh0cmFjdCB0aGlzIHNldCBhbmQgZ2VuZXJhdGUgYSBHZW9KU09OIGZlYXR1cmUgb2JqZWN0IGZvciBlYWNoIGNvdW50cnkuXG4gICAqL1xuICBmZWF0dXJlPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFRvcG9KU09OIG9iamVjdCBzZXQgdG8gY29udmVydCB0byBhIG1lc2guXG4gICAqIFNpbWlsYXIgdG8gdGhlIGBmZWF0dXJlYCBvcHRpb24sIGBtZXNoYCBleHRyYWN0cyBhIG5hbWVkIFRvcG9KU09OIG9iamVjdCBzZXQuXG4gICAqICBVbmxpa2UgdGhlIGBmZWF0dXJlYCBvcHRpb24sIHRoZSBjb3JyZXNwb25kaW5nIGdlbyBkYXRhIGlzIHJldHVybmVkIGFzIGEgc2luZ2xlLCB1bmlmaWVkIG1lc2ggaW5zdGFuY2UsIG5vdCBhcyBpbmlkaXZpZHVhbCBHZW9KU09OIGZlYXR1cmVzLlxuICAgKiBFeHRyYWN0aW5nIGEgbWVzaCBpcyB1c2VmdWwgZm9yIG1vcmUgZWZmaWNpZW50bHkgZHJhd2luZyBib3JkZXJzIG9yIG90aGVyIGdlb2dyYXBoaWMgZWxlbWVudHMgdGhhdCB5b3UgZG8gbm90IG5lZWQgdG8gYXNzb2NpYXRlIHdpdGggc3BlY2lmaWMgcmVnaW9ucyBzdWNoIGFzIGluZGl2aWR1YWwgY291bnRyaWVzLCBzdGF0ZXMgb3IgY291bnRpZXMuXG4gICAqL1xuICBtZXNoPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBEYXRhRm9ybWF0VHlwZSB7XG4gICAgSlNPTiA9ICdqc29uJyBhcyBhbnksXG4gICAgQ1NWID0gJ2NzdicgYXMgYW55LFxuICAgIFRTViA9ICd0c3YnIGFzIGFueSxcbiAgICBUT1BPSlNPTiA9ICd0b3BvanNvbicgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSB7XG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgdGhlIGZvcm1hdCBmb3IgdGhlIGRhdGEgZmlsZSBvciB2YWx1ZXMuXG4gICAqL1xuICBmb3JtYXQ/OiBEYXRhRm9ybWF0O1xuXG4gIC8qKlxuICAgKiBBIFVSTCBmcm9tIHdoaWNoIHRvIGxvYWQgdGhlIGRhdGEgc2V0LiBVc2UgdGhlIGZvcm1hdC50eXBlIHByb3BlcnR5XG4gICAqIHRvIGVuc3VyZSB0aGUgbG9hZGVkIGRhdGEgaXMgY29ycmVjdGx5IHBhcnNlZC5cbiAgICovXG4gIHVybD86IHN0cmluZztcbiAgLyoqXG4gICAqIFBhc3MgYXJyYXkgb2Ygb2JqZWN0cyBpbnN0ZWFkIG9mIGEgdXJsIHRvIGEgZmlsZS5cbiAgICovXG4gIHZhbHVlcz86IGFueVtdO1xufVxuXG5leHBvcnQgZW51bSBEYXRhVGFibGUge1xuICBTT1VSQ0UgPSAnc291cmNlJyBhcyBhbnksXG4gIFNVTU1BUlkgPSAnc3VtbWFyeScgYXMgYW55LFxuICBTVEFDS0VEX1NDQUxFID0gJ3N0YWNrZWRfc2NhbGUnIGFzIGFueSxcbiAgTEFZT1VUID0gJ2xheW91dCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBTVU1NQVJZID0gRGF0YVRhYmxlLlNVTU1BUlk7XG5leHBvcnQgY29uc3QgU09VUkNFID0gRGF0YVRhYmxlLlNPVVJDRTtcbmV4cG9ydCBjb25zdCBTVEFDS0VEX1NDQUxFID0gRGF0YVRhYmxlLlNUQUNLRURfU0NBTEU7XG5leHBvcnQgY29uc3QgTEFZT1VUID0gRGF0YVRhYmxlLkxBWU9VVDtcblxuLyoqIE1hcHBpbmcgZnJvbSBkYXRhbGliJ3MgaW5mZXJyZWQgdHlwZSB0byBWZWdhLWxpdGUncyB0eXBlICovXG4vLyBUT0RPOiBjb25zaWRlciBpZiB3ZSBjYW4gcmVtb3ZlXG5leHBvcnQgY29uc3QgdHlwZXMgPSB7XG4gICdib29sZWFuJzogVHlwZS5OT01JTkFMLFxuICAnbnVtYmVyJzogVHlwZS5RVUFOVElUQVRJVkUsXG4gICdpbnRlZ2VyJzogVHlwZS5RVUFOVElUQVRJVkUsXG4gICdkYXRlJzogVHlwZS5URU1QT1JBTCxcbiAgJ3N0cmluZyc6IFR5cGUuTk9NSU5BTFxufTtcbiIsIi8vIERhdGVUaW1lIGRlZmluaXRpb24gb2JqZWN0XG5cbmltcG9ydCB7ZHVwbGljYXRlLCBpc051bWJlcn0gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBPYmplY3QgZm9yIGRlZmluaW5nIGRhdGV0aW1lIGluIFZlZ2EtTGl0ZSBGaWx0ZXIuXG4gKiBJZiBib3RoIG1vbnRoIGFuZCBxdWFydGVyIGFyZSBwcm92aWRlZCwgbW9udGggaGFzIGhpZ2hlciBwcmVjZWRlbmNlLlxuICogYGRheWAgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGggb3RoZXIgZGF0ZS5cbiAqIFdlIGFjY2VwdCBzdHJpbmcgZm9yIG1vbnRoIGFuZCBkYXkgbmFtZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWUge1xuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIHllYXIuICovXG4gIHllYXI/OiBudW1iZXI7XG5cbiAgLyoqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBxdWFydGVyIG9mIHRoZSB5ZWFyIChmcm9tIDEtNCkuICovXG4gIHF1YXJ0ZXI/OiBudW1iZXI7XG5cbiAgLyoqIE9uZSBvZjogKDEpIGludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBtb250aCBmcm9tIGAxYC1gMTJgLiBgMWAgcmVwcmVzZW50cyBKYW51YXJ5OyAgKDIpIGNhc2UtaW5zZW5zaXRpdmUgbW9udGggbmFtZSAoZS5nLiwgYFwiSmFudWFyeVwiYCk7ICAoMykgY2FzZS1pbnNlbnNpdGl2ZSwgMy1jaGFyYWN0ZXIgc2hvcnQgbW9udGggbmFtZSAoZS5nLiwgYFwiSmFuXCJgKS4gKi9cbiAgbW9udGg/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgLyoqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBkYXRlIGZyb20gMS0zMS4gKi9cbiAgZGF0ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVmFsdWUgcmVwcmVzZW50aW5nIHRoZSBkYXkgb2Ygd2Vlay4gIFRoaXMgY2FuIGJlIG9uZSBvZjogKDEpIGludGVnZXIgdmFsdWUgLS0gYDFgIHJlcHJlc2VudHMgTW9uZGF5OyAoMikgY2FzZS1pbnNlbnNpdGl2ZSBkYXkgbmFtZSAoZS5nLiwgYFwiTW9uZGF5XCJgKTsgICgzKSBjYXNlLWluc2Vuc2l0aXZlLCAzLWNoYXJhY3RlciBzaG9ydCBkYXkgbmFtZSAoZS5nLiwgYFwiTW9uXCJgKS4gICA8YnIvPiAqKldhcm5pbmc6KiogQSBEYXRlVGltZSBkZWZpbml0aW9uIG9iamVjdCB3aXRoIGBkYXlgKiogc2hvdWxkIG5vdCBiZSBjb21iaW5lZCB3aXRoIGB5ZWFyYCwgYHF1YXJ0ZXJgLCBgbW9udGhgLCBvciBgZGF0ZWAuXG4gICAqL1xuICBkYXk/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgLyoqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBob3VyIG9mIGRheSBmcm9tIDAtMjMuICovXG4gIGhvdXJzPzogbnVtYmVyO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyBtaW51dGUgc2VnbWVudCBvZiBhIHRpbWUgZnJvbSAwLTU5LiAqL1xuICBtaW51dGVzPzogbnVtYmVyO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyBzZWNvbmQgc2VnbWVudCBvZiBhIHRpbWUgZnJvbSAwLTU5LiAqL1xuICBzZWNvbmRzPzogbnVtYmVyO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyBtaWxsaXNlY29uZCBzZWdtZW50IG9mIGEgdGltZS4gKi9cbiAgbWlsbGlzZWNvbmRzPzogbnVtYmVyO1xufVxuXG5cbi8qKlxuICogSW50ZXJuYWwgT2JqZWN0IGZvciBkZWZpbmluZyBkYXRldGltZSBleHByZXNzaW9ucy5cbiAqIFRoaXMgaXMgYW4gZXhwcmVzc2lvbiB2ZXJzaW9uIG9mIERhdGVUaW1lLlxuICogSWYgYm90aCBtb250aCBhbmQgcXVhcnRlciBhcmUgcHJvdmlkZWQsIG1vbnRoIGhhcyBoaWdoZXIgcHJlY2VkZW5jZS5cbiAqIGBkYXlgIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIG90aGVyIGRhdGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWVFeHByIHtcbiAgeWVhcj86IHN0cmluZztcbiAgcXVhcnRlcj86IHN0cmluZztcbiAgbW9udGg/OiBzdHJpbmc7XG4gIGRhdGU/OiBzdHJpbmc7XG4gIGRheT86IHN0cmluZztcbiAgaG91cnM/OiBzdHJpbmc7XG4gIG1pbnV0ZXM/OiBzdHJpbmc7XG4gIHNlY29uZHM/OiBzdHJpbmc7XG4gIG1pbGxpc2Vjb25kcz86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZVRpbWUobzogYW55KTogbyBpcyBEYXRlVGltZSB7XG4gIHJldHVybiAhIW8ueWVhciB8fCAhIW8ucXVhcnRlciB8fCAhIW8ubW9udGggfHwgISFvLmRhdGUgfHwgISFvLmRheSB8fFxuICAgICEhby5ob3VycyB8fCAhIW8ubWludXRlcyB8fCAhIW8uc2Vjb25kcyB8fCAhIW8ubWlsbGlzZWNvbmRzO1xufVxuXG5leHBvcnQgY29uc3QgTU9OVEhTID0gWydqYW51YXJ5JywgJ2ZlYnJ1YXJ5JywgJ21hcmNoJywgJ2FwcmlsJywgJ21heScsICdqdW5lJywgJ2p1bHknLCAnYXVndXN0JywgJ3NlcHRlbWJlcicsICdvY3RvYmVyJywgJ25vdmVtYmVyJywgJ2RlY2VtYmVyJ107XG5leHBvcnQgY29uc3QgU0hPUlRfTU9OVEhTID0gTU9OVEhTLm1hcCgobSkgPT4gbS5zdWJzdHIoMCwgMykpO1xuXG5leHBvcnQgY29uc3QgREFZUyA9IFsnc3VuZGF5JywgJ21vbmRheScsICd0dWVzZGF5JywgJ3dlZG5lc2RheScsICd0aHVyc2RheScsICdmcmlkYXknLCAnc2F0dXJkYXknXTtcbmV4cG9ydCBjb25zdCBTSE9SVF9EQVlTID0gREFZUy5tYXAoKGQpID0+IGQuc3Vic3RyKDAsMykpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVRdWFydGVyKHE6IG51bWJlciB8IHN0cmluZykge1xuICBpZiAoaXNOdW1iZXIocSkpIHtcbiAgICAvLyBXZSBhY2NlcHQgMS1iYXNlZCBxdWFydGVyLCBzbyBuZWVkIHRvIHJlYWRqdXN0IHRvIDAtYmFzZWQgcXVhcnRlclxuICAgIHJldHVybiAocSAtIDEpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gU2ltcGx5IGFuIGV4cHJlc3Npb24gc3RyaW5nLCBidXQgbm9ybWFsaXplIHNob3VsZCBub3QgYmUgY2FsbGVkIGluIHRoaXMgY2FzZS5cbiAgICBjb25zb2xlLndhcm4oJ1BvdGVudGlhbGx5IGludmFsaWQgcXVhcnRlcicsIHEpO1xuICAgIHJldHVybiBxO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1vbnRoKG06IHN0cmluZyB8IG51bWJlcikge1xuICBpZiAoaXNOdW1iZXIobSkpIHtcbiAgICAvLyBXZSBhY2NlcHQgMS1iYXNlZCBtb250aCwgc28gbmVlZCB0byByZWFkanVzdCB0byAwLWJhc2VkIG1vbnRoXG4gICAgcmV0dXJuIChtIC0gMSkgKyAnJztcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsb3dlck0gPSBtLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbW9udGhJbmRleCA9IE1PTlRIUy5pbmRleE9mKGxvd2VyTSk7XG4gICAgaWYgKG1vbnRoSW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gbW9udGhJbmRleCArICcnOyAvLyAwIGZvciBqYW51YXJ5LCAuLi5cbiAgICB9XG4gICAgY29uc3Qgc2hvcnRNID0gbG93ZXJNLnN1YnN0cigwLCAzKTtcbiAgICBjb25zdCBzaG9ydE1vbnRoSW5kZXggPSBTSE9SVF9NT05USFMuaW5kZXhPZihzaG9ydE0pO1xuICAgIGlmIChzaG9ydE1vbnRoSW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gc2hvcnRNb250aEluZGV4ICsgJyc7XG4gICAgfVxuICAgIC8vIFNpbXBseSBhbiBleHByZXNzaW9uIHN0cmluZywgYnV0IG5vcm1hbGl6ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiB0aGlzIGNhc2UuXG4gICAgY29uc29sZS53YXJuKCdQb3RlbnRpYWxseSBpbnZhbGlkIG1vbnRoJywgbSk7XG4gICAgcmV0dXJuIG07XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRGF5KGQ6IHN0cmluZyB8IG51bWJlcikge1xuICBpZiAoaXNOdW1iZXIoZCkpIHtcbiAgICAvLyBtb2Qgc28gdGhhdCB0aGlzIGNhbiBiZSBib3RoIDAtYmFzZWQgd2hlcmUgMCA9IHN1bmRheVxuICAgIC8vIGFuZCAxLWJhc2VkIHdoZXJlIDc9c3VuZGF5XG4gICAgcmV0dXJuIChkICUgNykgKyAnJztcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsb3dlckQgPSBkLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZGF5SW5kZXggPSBEQVlTLmluZGV4T2YobG93ZXJEKTtcbiAgICBpZiAoZGF5SW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gZGF5SW5kZXggKyAnJzsgLy8gMCBmb3IgamFudWFyeSwgLi4uXG4gICAgfVxuICAgIGNvbnN0IHNob3J0RCA9IGxvd2VyRC5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3Qgc2hvcnREYXlJbmRleCA9IFNIT1JUX0RBWVMuaW5kZXhPZihzaG9ydEQpO1xuICAgIGlmIChzaG9ydERheUluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHNob3J0RGF5SW5kZXggKyAnJztcbiAgICB9XG4gICAgLy8gU2ltcGx5IGFuIGV4cHJlc3Npb24gc3RyaW5nLCBidXQgbm9ybWFsaXplIHNob3VsZCBub3QgYmUgY2FsbGVkIGluIHRoaXMgY2FzZS5cbiAgICBjb25zb2xlLndhcm4oJ1BvdGVudGlhbGx5IGludmFsaWQgZGF5JywgZCk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm4gVmVnYSBFeHByZXNzaW9uIGZvciBhIHBhcnRpY3VsYXIgZGF0ZSB0aW1lLlxuICogQHBhcmFtIGRcbiAqIEBwYXJhbSBub3JtYWxpemUgd2hldGhlciB0byBub3JtYWxpemUgcXVhcnRlciwgbW9udGgsIGRheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGVUaW1lRXhwcihkOiBEYXRlVGltZSB8IERhdGVUaW1lRXhwciwgbm9ybWFsaXplID0gZmFsc2UpIHtcbiAgY29uc3QgdW5pdHMgPSBbXTtcblxuICBpZiAobm9ybWFsaXplICYmIGQuZGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGxldCB1bml0IG9mIFsneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ2RhdGUnXSkge1xuICAgICAgaWYgKGRbdW5pdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Ryb3BwaW5nIGRheSBmcm9tIGRhdGV0aW1lJywgSlNPTi5zdHJpbmdpZnkoZCksXG4gICAgICAgICAgJ2FzIGRheSBjYW5ub3QgYmUgY29tYmluZWQgd2l0aCcsIHVuaXQpO1xuICAgICAgICBkID0gZHVwbGljYXRlKGQpO1xuICAgICAgICBkZWxldGUgZC5kYXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChkLnllYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHVuaXRzLnB1c2goZC55ZWFyKTtcbiAgfSBlbHNlIGlmIChkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gU2V0IHllYXIgdG8gMjAwNiBmb3Igd29ya2luZyB3aXRoIGRheSBzaW5jZSBKYW51YXJ5IDEgMjAwNiBpcyBhIFN1bmRheVxuICAgIHVuaXRzLnB1c2goMjAwNik7XG4gIH0gZWxzZSB7XG4gICAgdW5pdHMucHVzaCgwKTtcbiAgfVxuXG4gIGlmIChkLm1vbnRoICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtb250aCA9IG5vcm1hbGl6ZSA/IG5vcm1hbGl6ZU1vbnRoKGQubW9udGgpIDogZC5tb250aDtcbiAgICB1bml0cy5wdXNoKG1vbnRoKTtcbiAgfSBlbHNlIGlmIChkLnF1YXJ0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBub3JtYWxpemUgPyBub3JtYWxpemVRdWFydGVyKGQucXVhcnRlcikgOiBkLnF1YXJ0ZXI7XG4gICAgdW5pdHMucHVzaChxdWFydGVyICsgJyozJyk7XG4gIH0gZWxzZSB7XG4gICAgdW5pdHMucHVzaCgwKTsgLy8gbW9udGhzIHN0YXJ0IGF0IHplcm8gaW4gSlNcbiAgfVxuXG4gIGlmIChkLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHVuaXRzLnB1c2goZC5kYXRlKTtcbiAgfSBlbHNlIGlmIChkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gSEFDSzogRGF5IG9ubHkgd29ya3MgYXMgYSBzdGFuZGFsb25lIHVuaXRcbiAgICAvLyBUaGlzIGlzIG9ubHkgY29ycmVjdCBiZWNhdXNlIHdlIGFsd2F5cyBzZXQgeWVhciB0byAyMDA2IGZvciBkYXlcbiAgICBjb25zdCBkYXkgPSBub3JtYWxpemUgPyBub3JtYWxpemVEYXkoZC5kYXkpIDogZC5kYXk7XG4gICAgdW5pdHMucHVzaChkYXkgKyAnKzEnKTtcbiAgfSBlbHNlIHtcbiAgICB1bml0cy5wdXNoKDEpOyAvLyBEYXRlIHN0YXJ0cyBhdCAxIGluIEpTXG4gIH1cblxuICAvLyBOb3RlOiBjYW4ndCB1c2UgVGltZVVuaXQgZW51bSBoZXJlIGFzIGltcG9ydGluZyBpdCB3aWxsIGNyZWF0ZVxuICAvLyBjaXJjdWxhciBkZXBlbmRlbmN5IHByb2JsZW0hXG4gIGZvciAobGV0IHRpbWVVbml0IG9mIFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJywgJ21pbGxpc2Vjb25kcyddKSB7XG4gICAgaWYgKGRbdGltZVVuaXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVuaXRzLnB1c2goZFt0aW1lVW5pdF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0cy5wdXNoKDApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnZGF0ZXRpbWUoJyArIHVuaXRzLmpvaW4oJywgJykgKyAnKSc7XG59XG4iLCIvLyB1dGlsaXR5IGZvciBlbmNvZGluZyBtYXBwaW5nXG5pbXBvcnQge0ZpZWxkRGVmLCBQb3NpdGlvbkNoYW5uZWxEZWYsIEZhY2V0Q2hhbm5lbERlZiwgQ2hhbm5lbERlZldpdGhMZWdlbmQsIE9yZGVyQ2hhbm5lbERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge0NoYW5uZWwsIENIQU5ORUxTfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtpc0FycmF5LCBzb21lfSBmcm9tICcuL3V0aWwnO1xuXG4vLyBUT0RPOiBvbmNlIHdlIGRlY29tcG9zZSBmYWNldCwgcmVuYW1lIHRoaXMgdG8gRW5jb2RpbmdcbmV4cG9ydCBpbnRlcmZhY2UgVW5pdEVuY29kaW5nIHtcbiAgLyoqXG4gICAqIFggY29vcmRpbmF0ZXMgZm9yIGBwb2ludGAsIGBjaXJjbGVgLCBgc3F1YXJlYCxcbiAgICogYGxpbmVgLCBgcnVsZWAsIGB0ZXh0YCwgYW5kIGB0aWNrYFxuICAgKiAob3IgdG8gd2lkdGggYW5kIGhlaWdodCBmb3IgYGJhcmAgYW5kIGBhcmVhYCBtYXJrcykuXG4gICAqL1xuICB4PzogUG9zaXRpb25DaGFubmVsRGVmO1xuXG4gIC8qKlxuICAgKiBZIGNvb3JkaW5hdGVzIGZvciBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsXG4gICAqIGBsaW5lYCwgYHJ1bGVgLCBgdGV4dGAsIGFuZCBgdGlja2BcbiAgICogKG9yIHRvIHdpZHRoIGFuZCBoZWlnaHQgZm9yIGBiYXJgIGFuZCBgYXJlYWAgbWFya3MpLlxuICAgKi9cbiAgeT86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWDIgY29vcmRpbmF0ZXMgZm9yIHJhbmdlZCBgYmFyYCwgYHJ1bGVgLCBgYXJlYWBcbiAgICovXG4gIHgyPzogUG9zaXRpb25DaGFubmVsRGVmO1xuXG4gIC8qKlxuICAgKiBZMiBjb29yZGluYXRlcyBmb3IgcmFuZ2VkIGBiYXJgLCBgcnVsZWAsIGBhcmVhYFxuICAgKi9cbiAgeTI/OiBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIENvbG9yIG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGZpbGwgb3Igc3Ryb2tlIGNvbG9yIGJhc2VkIG9uIG1hcmsgdHlwZS5cbiAgICogKEJ5IGRlZmF1bHQsIGZpbGwgY29sb3IgZm9yIGBhcmVhYCwgYGJhcmAsIGB0aWNrYCwgYHRleHRgLCBgY2lyY2xlYCwgYW5kIGBzcXVhcmVgIC9cbiAgICogc3Ryb2tlIGNvbG9yIGZvciBgbGluZWAgYW5kIGBwb2ludGAuKVxuICAgKi9cbiAgY29sb3I/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcbiAgLyoqXG4gICAqIE9wYWNpdHkgb2YgdGhlIG1hcmtzIOKAkyBlaXRoZXIgY2FuIGJlIGEgdmFsdWUgb3IgaW4gYSByYW5nZS5cbiAgICovXG4gIG9wYWNpdHk/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgbWFyay5cbiAgICogLSBGb3IgYHBvaW50YCwgYHNxdWFyZWAgYW5kIGBjaXJjbGVgXG4gICAqIOKAkyB0aGUgc3ltYm9sIHNpemUsIG9yIHBpeGVsIGFyZWEgb2YgdGhlIG1hcmsuXG4gICAqIC0gRm9yIGBiYXJgIGFuZCBgdGlja2Ag4oCTIHRoZSBiYXIgYW5kIHRpY2sncyBzaXplLlxuICAgKiAtIEZvciBgdGV4dGAg4oCTIHRoZSB0ZXh0J3MgZm9udCBzaXplLlxuICAgKiAtIFNpemUgaXMgY3VycmVudGx5IHVuc3VwcG9ydGVkIGZvciBgbGluZWAgYW5kIGBhcmVhYC5cbiAgICovXG4gIHNpemU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDtcblxuICAvKipcbiAgICogVGhlIHN5bWJvbCdzIHNoYXBlIChvbmx5IGZvciBgcG9pbnRgIG1hcmtzKS4gVGhlIHN1cHBvcnRlZCB2YWx1ZXMgYXJlXG4gICAqIGBcImNpcmNsZVwiYCAoZGVmYXVsdCksIGBcInNxdWFyZVwiYCwgYFwiY3Jvc3NcImAsIGBcImRpYW1vbmRcImAsIGBcInRyaWFuZ2xlLXVwXCJgLFxuICAgKiBvciBgXCJ0cmlhbmdsZS1kb3duXCJgLlxuICAgKi9cbiAgc2hhcGU/OiBDaGFubmVsRGVmV2l0aExlZ2VuZDsgLy8gVE9ETzogbWF5YmUgZGlzdGluZ3Vpc2ggb3JkaW5hbC1vbmx5XG5cbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgbGV2ZWxzIG9mIGRldGFpbCBmb3IgZ3JvdXBpbmcgZGF0YSBpbiBhZ2dyZWdhdGUgdmlld3MgYW5kXG4gICAqIGluIGxpbmUgYW5kIGFyZWEgbWFya3Mgd2l0aG91dCBtYXBwaW5nIGRhdGEgdG8gYSBzcGVjaWZpYyB2aXN1YWwgY2hhbm5lbC5cbiAgICovXG4gIGRldGFpbD86IEZpZWxkRGVmIHwgRmllbGREZWZbXTtcblxuICAvKipcbiAgICogVGV4dCBvZiB0aGUgYHRleHRgIG1hcmsuXG4gICAqL1xuICB0ZXh0PzogRmllbGREZWY7XG5cbiAgbGFiZWw/OiBGaWVsZERlZjtcblxuICAvKipcbiAgICogT3JkZXIgb2YgZGF0YSBwb2ludHMgaW4gbGluZSBtYXJrcy5cbiAgICovXG4gIHBhdGg/OiBPcmRlckNoYW5uZWxEZWYgfCBPcmRlckNoYW5uZWxEZWZbXTtcblxuICAvKipcbiAgICogTGF5ZXIgb3JkZXIgZm9yIG5vbi1zdGFja2VkIG1hcmtzLCBvciBzdGFjayBvcmRlciBmb3Igc3RhY2tlZCBtYXJrcy5cbiAgICovXG4gIG9yZGVyPzogT3JkZXJDaGFubmVsRGVmIHwgT3JkZXJDaGFubmVsRGVmW107XG59XG5cbi8vIFRPRE86IG9uY2Ugd2UgZGVjb21wb3NlIGZhY2V0LCByZW5hbWUgdGhpcyB0byBFeHRlbmRlZEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIEVuY29kaW5nIGV4dGVuZHMgVW5pdEVuY29kaW5nIHtcbiAgLyoqXG4gICAqIFZlcnRpY2FsIGZhY2V0cyBmb3IgdHJlbGxpcyBwbG90cy5cbiAgICovXG4gIHJvdz86IEZhY2V0Q2hhbm5lbERlZjtcblxuICAvKipcbiAgICogSG9yaXpvbnRhbCBmYWNldHMgZm9yIHRyZWxsaXMgcGxvdHMuXG4gICAqL1xuICBjb2x1bW4/OiBGYWNldENoYW5uZWxEZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudFJldGluYWwoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGlmIChlbmNvZGluZy5jb2xvcikgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5vcGFjaXR5KSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLnNpemUpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcuc2hhcGUpIHsgY291bnQrKzsgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVscyhlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIENIQU5ORUxTLmZpbHRlcihmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgcmV0dXJuIGhhcyhlbmNvZGluZywgY2hhbm5lbCk7XG4gIH0pO1xufVxuXG4vLyBUT0Q6IHJlbmFtZSB0aGlzIHRvIGhhc0NoYW5uZWxGaWVsZCBhbmQgb25seSB1c2Ugd2UgcmVhbGx5IHdhbnQgaXQuXG5leHBvcnQgZnVuY3Rpb24gaGFzKGVuY29kaW5nOiBFbmNvZGluZywgY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICBjb25zdCBjaGFubmVsRW5jb2RpbmcgPSBlbmNvZGluZyAmJiBlbmNvZGluZ1tjaGFubmVsXTtcbiAgcmV0dXJuIGNoYW5uZWxFbmNvZGluZyAmJiAoXG4gICAgY2hhbm5lbEVuY29kaW5nLmZpZWxkICE9PSB1bmRlZmluZWQgfHxcbiAgICAvLyBUT0RPOiBjaGVjayB0aGF0IHdlIGhhdmUgZmllbGQgaW4gdGhlIGFycmF5XG4gICAgKGlzQXJyYXkoY2hhbm5lbEVuY29kaW5nKSAmJiBjaGFubmVsRW5jb2RpbmcubGVuZ3RoID4gMClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWdncmVnYXRlKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gc29tZShDSEFOTkVMUywgKGNoYW5uZWwpID0+IHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSAmJiBlbmNvZGluZ1tjaGFubmVsXS5hZ2dyZWdhdGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSYW5nZWQoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIHJldHVybiBlbmNvZGluZyAmJiAoKCEhZW5jb2RpbmcueCAmJiAhIWVuY29kaW5nLngyKSB8fCAoISFlbmNvZGluZy55ICYmICEhZW5jb2RpbmcueTIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRGVmcyhlbmNvZGluZzogRW5jb2RpbmcpOiBGaWVsZERlZltdIHtcbiAgbGV0IGFyciA9IFtdO1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkoZW5jb2RpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIGVuY29kaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmaWVsZERlZik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnB1c2goZW5jb2RpbmdbY2hhbm5lbF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTogbnVtYmVyKSA9PiB2b2lkLFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKENIQU5ORUxTLCBlbmNvZGluZywgZiwgdGhpc0FyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVsTWFwcGluZ0ZvckVhY2goY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGxldCBpID0gMDtcbiAgY2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhtYXBwaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkobWFwcGluZ1tjaGFubmVsXSkpIHtcbiAgICAgICAgbWFwcGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgICBmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwsIGkrKyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIG1hcHBpbmdbY2hhbm5lbF0sIGNoYW5uZWwsIGkrKyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChlbmNvZGluZzogRW5jb2RpbmcsXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTogbnVtYmVyKSA9PiBhbnksXG4gICAgdGhpc0FyZz86IGFueSkge1xuICByZXR1cm4gY2hhbm5lbE1hcHBpbmdNYXAoQ0hBTk5FTFMsIGVuY29kaW5nLCBmICwgdGhpc0FyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVsTWFwcGluZ01hcChjaGFubmVsczogQ2hhbm5lbFtdLCBtYXBwaW5nOiBhbnksXG4gICAgZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTogbnVtYmVyKSA9PiBhbnksXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgYXJyID0gW107XG4gIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgIGFyci5wdXNoKGYuY2FsbCh0aGlzQXJnLCBmaWVsZERlZiwgY2hhbm5lbCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGYuY2FsbCh0aGlzQXJnLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFycjtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2UoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChhY2M6IGFueSwgZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsKSA9PiBhbnksXG4gICAgaW5pdCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIHJldHVybiBjaGFubmVsTWFwcGluZ1JlZHVjZShDSEFOTkVMUywgZW5jb2RpbmcsIGYsIGluaXQsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdSZWR1Y2UoY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChhY2M6IGFueSwgZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsKSA9PiBhbnksXG4gICAgaW5pdCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGxldCByID0gaW5pdDtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhtYXBwaW5nLCBjaGFubmVsKSkge1xuICAgICAgaWYgKGlzQXJyYXkobWFwcGluZ1tjaGFubmVsXSkpIHtcbiAgICAgICAgbWFwcGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgICByID0gZi5jYWxsKHRoaXNBcmcsIHIsIGZpZWxkRGVmLCBjaGFubmVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByID0gZi5jYWxsKHRoaXNBcmcsIHIsIG1hcHBpbmdbY2hhbm5lbF0sIGNoYW5uZWwpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiByO1xufVxuIiwiLy8gdXRpbGl0eSBmb3IgYSBmaWVsZCBkZWZpbml0aW9uIG9iamVjdFxuXG5pbXBvcnQge0FnZ3JlZ2F0ZU9wLCBBR0dSRUdBVEVfT1BTfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0F4aXN9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge0Jpbn0gZnJvbSAnLi9iaW4nO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtTb3J0RmllbGQsIFNvcnRPcmRlcn0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHtUeXBlLCBOT01JTkFMLCBPUkRJTkFMLCBRVUFOVElUQVRJVkUsIFRFTVBPUkFMfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywgZ2V0YmlucywgdG9NYXB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogIEludGVyZmFjZSBmb3IgYW55IGtpbmQgb2YgRmllbGREZWY7XG4gKiAgRm9yIHNpbXBsaWNpdHksIHdlIGRvIG5vdCBkZWNsYXJlIG11bHRpcGxlIGludGVyZmFjZXMgb2YgRmllbGREZWYgbGlrZVxuICogIHdlIGRvIGZvciBKU09OIHNjaGVtYS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWVsZERlZiB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBmaWVsZCBmcm9tIHdoaWNoIHRvIHB1bGwgYSBkYXRhIHZhbHVlLlxuICAgKi9cbiAgZmllbGQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGVkIGZpZWxkJ3MgdHlwZSBvZiBtZWFzdXJlbWVudC4gVGhpcyBjYW4gYmUgZWl0aGVyIGEgZnVsbCB0eXBlXG4gICAqIG5hbWUgKGBcInF1YW50aXRhdGl2ZVwiYCwgYFwidGVtcG9yYWxcImAsIGBcIm9yZGluYWxcImAsICBhbmQgYFwibm9taW5hbFwiYClcbiAgICogb3IgYW4gaW5pdGlhbCBjaGFyYWN0ZXIgb2YgdGhlIHR5cGUgbmFtZSAoYFwiUVwiYCwgYFwiVFwiYCwgYFwiT1wiYCwgYFwiTlwiYCkuXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgY2FzZSBpbnNlbnNpdGl2ZS5cbiAgICovXG4gIHR5cGU/OiBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGNvbnN0YW50IHZhbHVlIGluIHZpc3VhbCBkb21haW4uXG4gICAqL1xuICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW47XG5cbiAgLy8gZnVuY3Rpb25cblxuICAvKipcbiAgICogVGltZSB1bml0IGZvciBhIGB0ZW1wb3JhbGAgZmllbGQgIChlLmcuLCBgeWVhcmAsIGB5ZWFybW9udGhgLCBgbW9udGhgLCBgaG91cmApLlxuICAgKi9cbiAgdGltZVVuaXQ/OiBUaW1lVW5pdDtcblxuICAvKipcbiAgICogRmxhZyBmb3IgYmlubmluZyBhIGBxdWFudGl0YXRpdmVgIGZpZWxkLCBvciBhIGJpbiBwcm9wZXJ0eSBvYmplY3RcbiAgICogZm9yIGJpbm5pbmcgcGFyYW1ldGVycy5cbiAgICovXG4gIGJpbj86IGJvb2xlYW4gfCBCaW47XG5cbiAgLyoqXG4gICAqIEFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZmllbGRcbiAgICogKGUuZy4sIGBtZWFuYCwgYHN1bWAsIGBtZWRpYW5gLCBgbWluYCwgYG1heGAsIGBjb3VudGApLlxuICAgKi9cbiAgYWdncmVnYXRlPzogQWdncmVnYXRlT3A7XG5cbiAgLyoqXG4gICAqIFRpdGxlIGZvciBheGlzIG9yIGxlZ2VuZC5cbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgYWdncmVnYXRlID0ge1xuICB0eXBlOiAnc3RyaW5nJyxcbiAgZW51bTogQUdHUkVHQVRFX09QUyxcbiAgc3VwcG9ydGVkRW51bXM6IHtcbiAgICBxdWFudGl0YXRpdmU6IEFHR1JFR0FURV9PUFMsXG4gICAgb3JkaW5hbDogWydtZWRpYW4nLCdtaW4nLCdtYXgnXSxcbiAgICBub21pbmFsOiBbXSxcbiAgICB0ZW1wb3JhbDogWydtZWFuJywgJ21lZGlhbicsICdtaW4nLCAnbWF4J10sIC8vIFRPRE86IHJldmlzZSB3aGF0IHNob3VsZCB0aW1lIHN1cHBvcnRcbiAgICAnJzogWydjb3VudCddXG4gIH0sXG4gIHN1cHBvcnRlZFR5cGVzOiB0b01hcChbUVVBTlRJVEFUSVZFLCBOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTCwgJyddKVxufTtcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhTY2FsZSBleHRlbmRzIEZpZWxkRGVmIHtcbiAgc2NhbGU/OiBTY2FsZTtcbiAgc29ydD86IFNvcnRGaWVsZCB8IFNvcnRPcmRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbkNoYW5uZWxEZWYgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgYXhpcz86IGJvb2xlYW4gfCBBeGlzO1xufVxuZXhwb3J0IGludGVyZmFjZSBDaGFubmVsRGVmV2l0aExlZ2VuZCBleHRlbmRzIENoYW5uZWxEZWZXaXRoU2NhbGUge1xuICBsZWdlbmQ/OiBMZWdlbmQ7XG59XG5cbi8vIERldGFpbFxuXG4vLyBPcmRlciBQYXRoIGhhdmUgbm8gc2NhbGVcblxuZXhwb3J0IGludGVyZmFjZSBPcmRlckNoYW5uZWxEZWYgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNvcnQ/OiBTb3J0T3JkZXI7XG59XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgdG8gZGlzdGluZ3Vpc2ggb3JkaW5hbE9ubHlTY2FsZSBmcm9tIHNjYWxlXG5leHBvcnQgdHlwZSBGYWNldENoYW5uZWxEZWYgPSBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkUmVmT3B0aW9uIHtcbiAgLyoqIGV4Y2x1ZGUgYmluLCBhZ2dyZWdhdGUsIHRpbWVVbml0ICovXG4gIG5vZm4/OiBib29sZWFuO1xuICAvKiogZXhjbHVkZSBhZ2dyZWdhdGlvbiBmdW5jdGlvbiAqL1xuICBub0FnZ3JlZ2F0ZT86IGJvb2xlYW47XG4gIC8qKiBpbmNsdWRlICdkYXR1bS4nICovXG4gIGRhdHVtPzogYm9vbGVhbjtcbiAgLyoqIHJlcGxhY2UgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIGZuPzogc3RyaW5nO1xuICAvKiogcHJlcGVuZCBmbiB3aXRoIGN1c3RvbSBmdW5jdGlvbiBwcmVmaXggKi9cbiAgcHJlZm4/OiBzdHJpbmc7XG4gIC8qKiBzY2FsZVR5cGUgKi9cbiAgc2NhbGVUeXBlPzogU2NhbGVUeXBlO1xuICAvKiogYXBwZW5kIHN1ZmZpeCB0byB0aGUgZmllbGQgcmVmIGZvciBiaW4gKGRlZmF1bHQ9J19zdGFydCcpICovXG4gIGJpblN1ZmZpeD86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiAoZ2VuZXJhbCkgKi9cbiAgc3VmZml4Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGQoZmllbGREZWY6IEZpZWxkRGVmLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgY29uc3QgcHJlZml4ID0gKG9wdC5kYXR1bSA/ICdkYXR1bS4nIDogJycpICsgKG9wdC5wcmVmbiB8fCAnJyk7XG4gIGNvbnN0IHN1ZmZpeCA9IG9wdC5zdWZmaXggfHwgJyc7XG4gIGNvbnN0IGZpZWxkID0gZmllbGREZWYuZmllbGQ7XG5cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdjb3VudCcgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAob3B0LmZuKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIG9wdC5mbiArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi5iaW4pIHtcbiAgICBjb25zdCBiaW5TdWZmaXggPSBvcHQuYmluU3VmZml4IHx8IChcbiAgICAgIG9wdC5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID9cbiAgICAgICAgLy8gRm9yIG9yZGluYWwgc2NhbGUgdHlwZSwgdXNlIGBfcmFuZ2VgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19yYW5nZScgOlxuICAgICAgICAvLyBGb3Igbm9uLW9yZGluYWwgc2NhbGUgb3IgdW5rbm93biwgdXNlIGBfc3RhcnRgIGFzIHN1ZmZpeC5cbiAgICAgICAgJ19zdGFydCdcbiAgICApO1xuICAgIHJldHVybiBwcmVmaXggKyAnYmluXycgKyBmaWVsZCArIGJpblN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgIW9wdC5ub0FnZ3JlZ2F0ZSAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgZmllbGREZWYuYWdncmVnYXRlICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLnRpbWVVbml0ICsgJ18nICsgZmllbGQgKyBzdWZmaXg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSB8fCAhIWZpZWxkRGVmLmJpbiB8fFxuICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiAhIWZpZWxkRGVmLnRpbWVVbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZWFzdXJlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgIV9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50KCk6IEZpZWxkRGVmIHtcbiAgcmV0dXJuIHsgZmllbGQ6ICcqJywgYWdncmVnYXRlOiBBZ2dyZWdhdGVPcC5DT1VOVCwgdHlwZTogUVVBTlRJVEFUSVZFfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ291bnQoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UO1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpcywgYW5kIHRoZSBnZXRiaW5zIG1ldGhvZFxuLy8gRklYTUUgdGhpcyBkZXBlbmRzIG9uIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiBjYXJkaW5hbGl0eShmaWVsZERlZjogRmllbGREZWYsIHN0YXRzLCBmaWx0ZXJOdWxsID0ge30pIHtcbiAgLy8gRklYTUUgbmVlZCB0byB0YWtlIGZpbHRlciBpbnRvIGFjY291bnRcblxuICBjb25zdCBzdGF0ID0gc3RhdHNbZmllbGREZWYuZmllbGRdLFxuICB0eXBlID0gZmllbGREZWYudHlwZTtcblxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgLy8gbmVlZCB0byByZWFzc2lnbiBiaW4sIG90aGVyd2lzZSBjb21waWxhdGlvbiB3aWxsIGZhaWwgZHVlIHRvIGEgVFMgYnVnLlxuICAgIGNvbnN0IGJpbiA9IGZpZWxkRGVmLmJpbjtcbiAgICBsZXQgbWF4YmlucyA9ICh0eXBlb2YgYmluID09PSAnYm9vbGVhbicpID8gdW5kZWZpbmVkIDogYmluLm1heGJpbnM7XG4gICAgaWYgKG1heGJpbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4YmlucyA9IDEwO1xuICAgIH1cblxuICAgIGNvbnN0IGJpbnMgPSBnZXRiaW5zKHN0YXQsIG1heGJpbnMpO1xuICAgIHJldHVybiAoYmlucy5zdG9wIC0gYmlucy5zdGFydCkgLyBiaW5zLnN0ZXA7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgY29uc3QgdGltZVVuaXQgPSBmaWVsZERlZi50aW1lVW5pdDtcbiAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSUzogcmV0dXJuIDI0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVk6IHJldHVybiA3O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVRFOiByZXR1cm4gMzE7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOiByZXR1cm4gMTI7XG4gICAgICBjYXNlIFRpbWVVbml0LlFVQVJURVI6IHJldHVybiA0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5ZRUFSOlxuICAgICAgICBjb25zdCB5ZWFyc3RhdCA9IHN0YXRzWyd5ZWFyXycgKyBmaWVsZERlZi5maWVsZF07XG5cbiAgICAgICAgaWYgKCF5ZWFyc3RhdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB5ZWFyc3RhdC5kaXN0aW5jdCAtXG4gICAgICAgICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHVzZSBjYWxjdWxhdGlvbiBiZWxvd1xuICB9XG4gIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBudWxsXG4gIHJldHVybiBzdGF0LmRpc3RpbmN0IC1cbiAgICAoc3RhdC5taXNzaW5nID4gMCAmJiBmaWx0ZXJOdWxsW3R5cGVdID8gMSA6IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmLCBjb25maWc6IENvbmZpZykge1xuICBpZiAoZmllbGREZWYudGl0bGUgIT0gbnVsbCkge1xuICAgIHJldHVybiBmaWVsZERlZi50aXRsZTtcbiAgfVxuICBpZiAoaXNDb3VudChmaWVsZERlZikpIHtcbiAgICByZXR1cm4gY29uZmlnLmNvdW50VGl0bGU7XG4gIH1cbiAgY29uc3QgZm4gPSBmaWVsZERlZi5hZ2dyZWdhdGUgfHwgZmllbGREZWYudGltZVVuaXQgfHwgKGZpZWxkRGVmLmJpbiAmJiAnYmluJyk7XG4gIGlmIChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgKyAnKCcgKyBmaWVsZERlZi5maWVsZCArICcpJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmllbGREZWYuZmllbGQ7XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0ZVRpbWV9IGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIEZpbHRlciA9IEVxdWFsRmlsdGVyIHwgUmFuZ2VGaWx0ZXIgfCBJbkZpbHRlciA7XG5cblxuZXhwb3J0IGludGVyZmFjZSBFcXVhbEZpbHRlciB7XG4gIC8vIFRPRE86IHN1cHBvcnQgYWdncmVnYXRlXG5cbiAgLyoqXG4gICAqIFRpbWUgdW5pdCBmb3IgdGhlIGZpZWxkIHRvIGJlIGZpbHRlcmVkLlxuICAgKi9cbiAgdGltZVVuaXQ/OiBUaW1lVW5pdDtcblxuICAvKipcbiAgICogRmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICBmaWVsZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBWYWx1ZSB0aGF0IHRoZSBmaWVsZCBzaG91bGQgYmUgZXF1YWwgdG8uXG4gICAqL1xuICBlcXVhbDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IERhdGVUaW1lO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsRmlsdGVyKGZpbHRlcjogYW55KTogZmlsdGVyIGlzIEVxdWFsRmlsdGVyIHtcbiAgcmV0dXJuIGZpbHRlciAmJiAhIWZpbHRlci5maWVsZCAmJiBmaWx0ZXIuZXF1YWwhPT11bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2VGaWx0ZXIge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFnZ3JlZ2F0ZVxuXG4gIC8qKlxuICAgKiB0aW1lIHVuaXQgZm9yIHRoZSBmaWVsZCB0byBiZSBmaWx0ZXJlZC5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZpZWxkIHRvIGJlIGZpbHRlcmVkXG4gICAqL1xuICBmaWVsZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBpbmNsdXNpdmUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXNcbiAgICogZm9yIGEgZmllbGQgdmFsdWUgb2YgYSBkYXRhIGl0ZW0gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbHRlcmVkIGRhdGEuXG4gICAqIEBtYXhJdGVtcyAyXG4gICAqIEBtaW5JdGVtcyAyXG4gICAqL1xuICByYW5nZTogQXJyYXk8bnVtYmVyfERhdGVUaW1lPjtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSYW5nZUZpbHRlcihmaWx0ZXI6IGFueSk6IGZpbHRlciBpcyBSYW5nZUZpbHRlciB7XG4gIGlmIChmaWx0ZXIgJiYgISFmaWx0ZXIuZmllbGQpIHtcbiAgICBpZiAoaXNBcnJheShmaWx0ZXIucmFuZ2UpICYmIGZpbHRlci5yYW5nZS5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5GaWx0ZXIge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFnZ3JlZ2F0ZVxuXG4gIC8qKlxuICAgKiB0aW1lIHVuaXQgZm9yIHRoZSBmaWVsZCB0byBiZSBmaWx0ZXJlZC5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZpZWxkIHRvIGJlIGZpbHRlcmVkXG4gICAqL1xuICBmaWVsZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiB2YWx1ZXMgdGhhdCB0aGUgYGZpZWxkYCdzIHZhbHVlIHNob3VsZCBiZSBhIG1lbWJlciBvZixcbiAgICogZm9yIGEgZGF0YSBpdGVtIGluY2x1ZGVkIGluIHRoZSBmaWx0ZXJlZCBkYXRhLlxuICAgKi9cbiAgaW46IEFycmF5PHN0cmluZ3xudW1iZXJ8Ym9vbGVhbnxEYXRlVGltZT47XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5GaWx0ZXIoZmlsdGVyOiBhbnkpOiBmaWx0ZXIgaXMgSW5GaWx0ZXIge1xuICByZXR1cm4gZmlsdGVyICYmICEhZmlsdGVyLmZpZWxkICYmIGlzQXJyYXkoZmlsdGVyLmluKTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgbGVnZW5kLiBPbmUgb2YgXCJsZWZ0XCIgb3IgXCJyaWdodFwiLiBUaGlzIGRldGVybWluZXMgaG93IHRoZSBsZWdlbmQgaXMgcG9zaXRpb25lZCB3aXRoaW4gdGhlIHNjZW5lLiBUaGUgZGVmYXVsdCBpcyBcInJpZ2h0XCIuXG4gICAqL1xuICBvcmllbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0LCBpbiBwaXhlbHMsIGJ5IHdoaWNoIHRvIGRpc3BsYWNlIHRoZSBsZWdlbmQgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgbGVuZ2VuZCBhbmQgYXhpcy5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWFyZ2luIGFyb3VuZCB0aGUgbGVnZW5kLCBpbiBwaXhlbHNcbiAgICovXG4gIG1hcmdpbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgZ3JhZGllbnQgc3Ryb2tlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgZ3JhZGllbnRTdHJva2VDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JhZGllbnQgc3Ryb2tlLCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudFN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZ3JhZGllbnQsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50SGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmFkaWVudCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBhbGlnbm1lbnQgb2YgdGhlIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIGxlZnQsIG1pZGRsZSBvciByaWdodC5cbiAgICovXG4gIGxhYmVsQWxpZ24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGJhc2VsaW5lIG9mIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIHRvcCwgbWlkZGxlIG9yIGJvdHRvbS5cbiAgICovXG4gIGxhYmVsQmFzZWxpbmU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIGxhYmVsQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBvZiB0aGUgbGVuZ2VuZCBsYWJlbC5cbiAgICovXG4gIGxhYmVsRm9udD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IHNpemUgb2YgbGVuZ2VuZCBsYWJsZS5cbiAgICovXG4gIGxhYmVsRm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBsZWdlbmQgbGFiZWwuXG4gICAqL1xuICBsYWJlbE9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIHN5bWJvbCxcbiAgICovXG4gIHN5bWJvbENvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHNoYXBlIG9mIHRoZSBsZWdlbmQgc3ltYm9sLCBjYW4gYmUgdGhlICdjaXJjbGUnLCAnc3F1YXJlJywgJ2Nyb3NzJywgJ2RpYW1vbmQnLFxuICAgKiAndHJpYW5nbGUtdXAnLCAndHJpYW5nbGUtZG93bicuXG4gICAqL1xuICBzeW1ib2xTaGFwZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBsZW5nZW5kIHN5bWJvbCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgc3ltYm9sU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgc3ltYm9sJ3Mgc3Ryb2tlLlxuICAgKi9cbiAgc3ltYm9sU3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gbGVnZW5kIHN0eWxpbmcuXG4gICAqL1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgdGl0bGUsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aXRsZUNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IHNpemUgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCB3ZWlnaHQgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBsZWdlbmQgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE8oIzk3NSkgcmVwbGFjZSB3aXRoIGNvbmZpZyBwcm9wZXJ0aWVzXG59XG5cbi8qKlxuICogUHJvcGVydGllcyBvZiBhIGxlZ2VuZCBvciBib29sZWFuIGZsYWcgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdG8gc2hvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMZWdlbmQgZXh0ZW5kcyBMZWdlbmRDb25maWcge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBsZWdlbmQgbGFiZWxzLiBWZWdhIHVzZXMgRDNcXCdzIGZvcm1hdCBwYXR0ZXJuLlxuICAgKi9cbiAgZm9ybWF0Pzogc3RyaW5nO1xuICAvKipcbiAgICogQSB0aXRsZSBmb3IgdGhlIGxlZ2VuZC4gKFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LilcbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuICAvKipcbiAgICogRXhwbGljaXRseSBzZXQgdGhlIHZpc2libGUgbGVnZW5kIHZhbHVlcy5cbiAgICovXG4gIHZhbHVlcz86IEFycmF5PGFueT47XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TGVnZW5kQ29uZmlnOiBMZWdlbmRDb25maWcgPSB7XG4gIG9yaWVudDogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IFwicmlnaHRcIlxuICBzaG9ydFRpbWVMYWJlbHM6IGZhbHNlXG59O1xuIiwiZXhwb3J0IGVudW0gTWFyayB7XG4gIEFSRUEgPSAnYXJlYScgYXMgYW55LFxuICBCQVIgPSAnYmFyJyBhcyBhbnksXG4gIExJTkUgPSAnbGluZScgYXMgYW55LFxuICBQT0lOVCA9ICdwb2ludCcgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgVElDSyA9ICd0aWNrJyBhcyBhbnksXG4gIFJVTEUgPSAncnVsZScgYXMgYW55LFxuICBDSVJDTEUgPSAnY2lyY2xlJyBhcyBhbnksXG4gIFNRVUFSRSA9ICdzcXVhcmUnIGFzIGFueSxcbiAgRVJST1JCQVIgPSAnZXJyb3JCYXInIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgQVJFQSA9IE1hcmsuQVJFQTtcbmV4cG9ydCBjb25zdCBCQVIgPSBNYXJrLkJBUjtcbmV4cG9ydCBjb25zdCBMSU5FID0gTWFyay5MSU5FO1xuZXhwb3J0IGNvbnN0IFBPSU5UID0gTWFyay5QT0lOVDtcbmV4cG9ydCBjb25zdCBURVhUID0gTWFyay5URVhUO1xuZXhwb3J0IGNvbnN0IFRJQ0sgPSBNYXJrLlRJQ0s7XG5leHBvcnQgY29uc3QgUlVMRSA9IE1hcmsuUlVMRTtcblxuZXhwb3J0IGNvbnN0IENJUkNMRSA9IE1hcmsuQ0lSQ0xFO1xuZXhwb3J0IGNvbnN0IFNRVUFSRSA9IE1hcmsuU1FVQVJFO1xuXG5leHBvcnQgY29uc3QgRVJST1JCQVIgPSBNYXJrLkVSUk9SQkFSO1xuZXhwb3J0IGNvbnN0IFBSSU1JVElWRV9NQVJLUyA9IFtBUkVBLCBCQVIsIExJTkUsIFBPSU5ULCBURVhULCBUSUNLLCBSVUxFLCBDSVJDTEUsIFNRVUFSRV07XG4iLCJleHBvcnQgZW51bSBTY2FsZVR5cGUge1xuICAgIExJTkVBUiA9ICdsaW5lYXInIGFzIGFueSxcbiAgICBMT0cgPSAnbG9nJyBhcyBhbnksXG4gICAgUE9XID0gJ3BvdycgYXMgYW55LFxuICAgIFNRUlQgPSAnc3FydCcgYXMgYW55LFxuICAgIFFVQU5USUxFID0gJ3F1YW50aWxlJyBhcyBhbnksXG4gICAgUVVBTlRJWkUgPSAncXVhbnRpemUnIGFzIGFueSxcbiAgICBPUkRJTkFMID0gJ29yZGluYWwnIGFzIGFueSxcbiAgICBUSU1FID0gJ3RpbWUnIGFzIGFueSxcbiAgICBVVEMgID0gJ3V0YycgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBOaWNlVGltZSB7XG4gICAgU0VDT05EID0gJ3NlY29uZCcgYXMgYW55LFxuICAgIE1JTlVURSA9ICdtaW51dGUnIGFzIGFueSxcbiAgICBIT1VSID0gJ2hvdXInIGFzIGFueSxcbiAgICBEQVkgPSAnZGF5JyBhcyBhbnksXG4gICAgV0VFSyA9ICd3ZWVrJyBhcyBhbnksXG4gICAgTU9OVEggPSAnbW9udGgnIGFzIGFueSxcbiAgICBZRUFSID0gJ3llYXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLlxuICAgKiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC5cbiAgICogKE9ubHkgYXZhaWxhYmxlIGZvciBgeGAsIGB5YCwgYHNpemVgLCBgcm93YCwgYW5kIGBjb2x1bW5gIHNjYWxlcy4pXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiAgRGVmYXVsdCBiYW5kIHdpZHRoIGZvciBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIGlzIG1hcmsgaXMgYHRleHRgLlxuICAgKiAgQG1pbmltdW0gMFxuICAgKi9cbiAgdGV4dEJhbmRXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgYmFuZCBzaXplIGZvciAoMSkgYHlgIG9yZGluYWwgc2NhbGUsXG4gICAqIGFuZCAoMikgYHhgIG9yZGluYWwgc2NhbGUgd2hlbiB0aGUgbWFyayBpcyBub3QgYHRleHRgLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgcmFuZ2UgZm9yIG9wYWNpdHkuXG4gICAqL1xuICBvcGFjaXR5PzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBEZWZhdWx0IHBhZGRpbmcgZm9yIGB4YCBhbmQgYHlgIG9yZGluYWwgc2NhbGVzLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy5cbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmF3IGRhdGEgZG9tYWluIChgXCJtZWFuXCJgLCBgXCJhdmVyYWdlXCJgLCBgXCJzdGRldlwiYCwgYFwic3RkZXZwXCJgLCBgXCJtZWRpYW5cImAsIGBcInExXCJgLCBgXCJxM1wiYCwgYFwibWluXCJgLCBgXCJtYXhcImApLiBGb3Igb3RoZXIgYWdncmVnYXRpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgcmF3IGRhdGEgZG9tYWluIChlLmcuIGBcImNvdW50XCJgLCBgXCJzdW1cImApLCB0aGlzIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBub21pbmFsIGNvbG9yIHNjYWxlICovXG4gIG5vbWluYWxDb2xvclJhbmdlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBvcmRpbmFsIC8gY29udGludW91cyBjb2xvciBzY2FsZSAqL1xuICBzZXF1ZW50aWFsQ29sb3JSYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igc2hhcGUgKi9cbiAgc2hhcGVSYW5nZT86IHN0cmluZ3xzdHJpbmdbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgYmFyIHNpemUgc2NhbGUgKi9cbiAgYmFyU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGZvbnQgc2l6ZSBzY2FsZSAqL1xuICBmb250U2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHJ1bGUgc3Ryb2tlIHdpZHRocyAqL1xuICBydWxlU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHRpY2sgc3BhbnMgKi9cbiAgdGlja1NpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBwb2ludFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8vIG5pY2Ugc2hvdWxkIGRlcGVuZHMgb24gdHlwZSAocXVhbnRpdGF0aXZlIG9yIHRlbXBvcmFsKSwgc29cbiAgLy8gbGV0J3Mgbm90IG1ha2UgYSBjb25maWcuXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2NhbGVDb25maWc6IFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgdGV4dEJhbmRXaWR0aDogOTAsXG4gIGJhbmRTaXplOiAyMSxcbiAgcGFkZGluZzogMSxcbiAgdXNlUmF3RG9tYWluOiBmYWxzZSxcbiAgb3BhY2l0eTogWzAuMywgMC44XSxcblxuICBub21pbmFsQ29sb3JSYW5nZTogJ2NhdGVnb3J5MTAnLFxuICBzZXF1ZW50aWFsQ29sb3JSYW5nZTogWycjQUZDNkEzJywgJyMwOTYyMkEnXSwgLy8gdGFibGVhdSBncmVlbnNcbiAgc2hhcGVSYW5nZTogJ3NoYXBlcycsXG4gIGZvbnRTaXplUmFuZ2U6IFs4LCA0MF0sXG4gIHJ1bGVTaXplUmFuZ2U6IFsxLCA1XSxcbiAgdGlja1NpemVSYW5nZTogWzEsIDIwXVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNjYWxlQ29uZmlnIHtcbiAgcm91bmQ/OiBib29sZWFuO1xuICBwYWRkaW5nPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0U2NhbGVDb25maWc6IEZhY2V0U2NhbGVDb25maWcgPSB7XG4gIHJvdW5kOiB0cnVlLFxuICBwYWRkaW5nOiAxNlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZSB7XG4gIHR5cGU/OiBTY2FsZVR5cGU7XG4gIC8qKlxuICAgKiBUaGUgZG9tYWluIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgZGF0YSB2YWx1ZXMuIEZvciBxdWFudGl0YXRpdmUgZGF0YSwgdGhpcyBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsL2NhdGVnb3JpY2FsIGRhdGEsIHRoaXMgbWF5IGJlIGFuIGFycmF5IG9mIHZhbGlkIGlucHV0IHZhbHVlcy4gVGhlIGRvbWFpbiBtYXkgYWxzbyBiZSBzcGVjaWZpZWQgYnkgYSByZWZlcmVuY2UgdG8gYSBkYXRhIHNvdXJjZS5cbiAgICovXG4gIGRvbWFpbj86IHN0cmluZyB8IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdEYXRhRG9tYWluXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2Ugb2YgdGhlIHNjYWxlLCByZXByZXNlbnRpbmcgdGhlIHNldCBvZiB2aXN1YWwgdmFsdWVzLiBGb3IgbnVtZXJpYyB2YWx1ZXMsIHRoZSByYW5nZSBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsIG9yIHF1YW50aXplZCBkYXRhLCB0aGUgcmFuZ2UgbWF5IGJ5IGFuIGFycmF5IG9mIGRlc2lyZWQgb3V0cHV0IHZhbHVlcywgd2hpY2ggYXJlIG1hcHBlZCB0byBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGRvbWFpbi4gRm9yIG9yZGluYWwgc2NhbGVzIG9ubHksIHRoZSByYW5nZSBjYW4gYmUgZGVmaW5lZCB1c2luZyBhIERhdGFSZWY6IHRoZSByYW5nZSB2YWx1ZXMgYXJlIHRoZW4gZHJhd24gZHluYW1pY2FsbHkgZnJvbSBhIGJhY2tpbmcgZGF0YSBzZXQuXG4gICAqL1xuICByYW5nZT86IHN0cmluZyB8IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdSYW5nZURvbWFpblxuICAvKipcbiAgICogSWYgdHJ1ZSwgcm91bmRzIG51bWVyaWMgb3V0cHV0IHZhbHVlcyB0byBpbnRlZ2Vycy4gVGhpcyBjYW4gYmUgaGVscGZ1bCBmb3Igc25hcHBpbmcgdG8gdGhlIHBpeGVsIGdyaWQuXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG5cbiAgLy8gb3JkaW5hbFxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgYmFuZFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBcHBsaWVzIHNwYWNpbmcgYW1vbmcgb3JkaW5hbCBlbGVtZW50cyBpbiB0aGUgc2NhbGUgcmFuZ2UuIFRoZSBhY3R1YWwgZWZmZWN0IGRlcGVuZHMgb24gaG93IHRoZSBzY2FsZSBpcyBjb25maWd1cmVkLiBJZiB0aGUgX19wb2ludHNfXyBwYXJhbWV0ZXIgaXMgYHRydWVgLCB0aGUgcGFkZGluZyB2YWx1ZSBpcyBpbnRlcnByZXRlZCBhcyBhIG11bHRpcGxlIG9mIHRoZSBzcGFjaW5nIGJldHdlZW4gcG9pbnRzLiBBIHJlYXNvbmFibGUgdmFsdWUgaXMgMS4wLCBzdWNoIHRoYXQgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IHdpbGwgYmUgb2Zmc2V0IGZyb20gdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgYnkgaGFsZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludHMuIE90aGVyd2lzZSwgcGFkZGluZyBpcyB0eXBpY2FsbHkgaW4gdGhlIHJhbmdlIFswLCAxXSBhbmQgY29ycmVzcG9uZHMgdG8gdGhlIGZyYWN0aW9uIG9mIHNwYWNlIGluIHRoZSByYW5nZSBpbnRlcnZhbCB0byBhbGxvY2F0ZSB0byBwYWRkaW5nLiBBIHZhbHVlIG9mIDAuNSBtZWFucyB0aGF0IHRoZSByYW5nZSBiYW5kIHdpZHRoIHdpbGwgYmUgZXF1YWwgdG8gdGhlIHBhZGRpbmcgd2lkdGguIEZvciBtb3JlLCBzZWUgdGhlIFtEMyBvcmRpbmFsIHNjYWxlIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYm9zdG9jay9kMy93aWtpL09yZGluYWwtU2NhbGVzKS5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLy8gdHlwaWNhbFxuICAvKipcbiAgICogSWYgdHJ1ZSwgdmFsdWVzIHRoYXQgZXhjZWVkIHRoZSBkYXRhIGRvbWFpbiBhcmUgY2xhbXBlZCB0byBlaXRoZXIgdGhlIG1pbmltdW0gb3IgbWF4aW11bSByYW5nZSB2YWx1ZVxuICAgKi9cbiAgY2xhbXA/OiBib29sZWFuO1xuICAvKipcbiAgICogSWYgc3BlY2lmaWVkLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIElmIHNwZWNpZmllZCBhcyBhIHRydWUgYm9vbGVhbiwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IG51bWJlciByYW5nZSAoZS5nLiwgNyBpbnN0ZWFkIG9mIDYuOTYpLiBJZiBzcGVjaWZpZWQgYXMgYSBzdHJpbmcsIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSB2YWx1ZSByYW5nZS4gRm9yIHRpbWUgYW5kIHV0YyBzY2FsZSB0eXBlcyBvbmx5LCB0aGUgbmljZSB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgZGVzaXJlZCB0aW1lIGludGVydmFsLlxuICAgKi9cbiAgbmljZT86IGJvb2xlYW4gfCBOaWNlVGltZTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4cG9uZW50IG9mIHRoZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbi4gRm9yIHBvdyBzY2FsZSB0eXBlcyBvbmx5LCBvdGhlcndpc2UgaWdub3JlZC5cbiAgICovXG4gIGV4cG9uZW50PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgYHRydWVgLCBlbnN1cmVzIHRoYXQgYSB6ZXJvIGJhc2VsaW5lIHZhbHVlIGlzIGluY2x1ZGVkIGluIHRoZSBzY2FsZSBkb21haW4uXG4gICAqIERlZmF1bHQgdmFsdWU6IGB0cnVlYCBmb3IgYHhgIGFuZCBgeWAgY2hhbm5lbCBpZiB0aGUgcXVhbnRpdGF0aXZlIGZpZWxkIGlzIG5vdCBiaW5uZWRcbiAgICogYW5kIG5vIGN1c3RvbSBgZG9tYWluYCBpcyBwcm92aWRlZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICB6ZXJvPzogYm9vbGVhbjtcblxuICAvLyBWZWdhLUxpdGUgb25seVxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy5cbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmF3IGRhdGEgZG9tYWluIChgXCJtZWFuXCJgLCBgXCJhdmVyYWdlXCJgLCBgXCJzdGRldlwiYCwgYFwic3RkZXZwXCJgLCBgXCJtZWRpYW5cImAsIGBcInExXCJgLCBgXCJxM1wiYCwgYFwibWluXCJgLCBgXCJtYXhcImApLiBGb3Igb3RoZXIgYWdncmVnYXRpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgcmF3IGRhdGEgZG9tYWluIChlLmcuIGBcImNvdW50XCJgLCBgXCJzdW1cImApLCB0aGlzIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xufVxuIiwiLyoqIG1vZHVsZSBmb3Igc2hvcnRoYW5kICovXG5cbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge0V4dGVuZGVkVW5pdFNwZWN9IGZyb20gJy4vc3BlYyc7XG5cbmltcG9ydCB7QWdncmVnYXRlT3AsIEFHR1JFR0FURV9PUFN9IGZyb20gJy4vYWdncmVnYXRlJztcbmltcG9ydCB7VElNRVVOSVRTfSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7U0hPUlRfVFlQRSwgVFlQRV9GUk9NX1NIT1JUX1RZUEV9IGZyb20gJy4vdHlwZSc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuXG5leHBvcnQgY29uc3QgREVMSU0gPSAnfCc7XG5leHBvcnQgY29uc3QgQVNTSUdOID0gJz0nO1xuZXhwb3J0IGNvbnN0IFRZUEUgPSAnLCc7XG5leHBvcnQgY29uc3QgRlVOQyA9ICdfJztcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogc3RyaW5nIHtcbiAgcmV0dXJuICdtYXJrJyArIEFTU0lHTiArIHNwZWMubWFyayArXG4gICAgREVMSU0gKyBzaG9ydGVuRW5jb2Rpbmcoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzaG9ydGhhbmQ6IHN0cmluZywgZGF0YT8sIGNvbmZpZz8pIHtcbiAgbGV0IHNwbGl0ID0gc2hvcnRoYW5kLnNwbGl0KERFTElNKSxcbiAgICBtYXJrID0gc3BsaXQuc2hpZnQoKS5zcGxpdChBU1NJR04pWzFdLnRyaW0oKSxcbiAgICBlbmNvZGluZyA9IHBhcnNlRW5jb2Rpbmcoc3BsaXQuam9pbihERUxJTSkpO1xuXG4gIGxldCBzcGVjOkV4dGVuZGVkVW5pdFNwZWMgPSB7XG4gICAgbWFyazogTWFya1ttYXJrXSxcbiAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgfTtcblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5kYXRhID0gZGF0YTtcbiAgfVxuICBpZiAoY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICBzcGVjLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5FbmNvZGluZyhlbmNvZGluZzogRW5jb2RpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmxFbmNvZGluZy5tYXAoZW5jb2RpbmcsIGZ1bmN0aW9uKGZpZWxkRGVmLCBjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwgKyBBU1NJR04gKyBzaG9ydGVuRmllbGREZWYoZmllbGREZWYpO1xuICB9KS5qb2luKERFTElNKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW5jb2RpbmcoZW5jb2RpbmdTaG9ydGhhbmQ6IHN0cmluZyk6IEVuY29kaW5nIHtcbiAgcmV0dXJuIGVuY29kaW5nU2hvcnRoYW5kLnNwbGl0KERFTElNKS5yZWR1Y2UoZnVuY3Rpb24obSwgZSkge1xuICAgIGNvbnN0IHNwbGl0ID0gZS5zcGxpdChBU1NJR04pLFxuICAgICAgICBlbmN0eXBlID0gc3BsaXRbMF0udHJpbSgpLFxuICAgICAgICBmaWVsZERlZlNob3J0aGFuZCA9IHNwbGl0WzFdO1xuXG4gICAgbVtlbmN0eXBlXSA9IHBhcnNlRmllbGREZWYoZmllbGREZWZTaG9ydGhhbmQpO1xuICAgIHJldHVybiBtO1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWYoZmllbGREZWY6IEZpZWxkRGVmKTogc3RyaW5nIHtcbiAgcmV0dXJuIChmaWVsZERlZi5hZ2dyZWdhdGUgPyBmaWVsZERlZi5hZ2dyZWdhdGUgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYudGltZVVuaXQgPyBmaWVsZERlZi50aW1lVW5pdCArIEZVTkMgOiAnJykgK1xuICAgIChmaWVsZERlZi5iaW4gPyAnYmluJyArIEZVTkMgOiAnJykgK1xuICAgIChmaWVsZERlZi5maWVsZCB8fCAnJykgKyBUWVBFICsgU0hPUlRfVFlQRVtmaWVsZERlZi50eXBlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5GaWVsZERlZnMoZmllbGREZWZzOiBGaWVsZERlZltdLCBkZWxpbSA9IERFTElNKTogc3RyaW5nIHtcbiAgcmV0dXJuIGZpZWxkRGVmcy5tYXAoc2hvcnRlbkZpZWxkRGVmKS5qb2luKGRlbGltKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmllbGREZWYoZmllbGREZWZTaG9ydGhhbmQ6IHN0cmluZyk6IEZpZWxkRGVmIHtcbiAgY29uc3Qgc3BsaXQgPSBmaWVsZERlZlNob3J0aGFuZC5zcGxpdChUWVBFKTtcblxuICBsZXQgZmllbGREZWY6IEZpZWxkRGVmID0ge1xuICAgIGZpZWxkOiBzcGxpdFswXS50cmltKCksXG4gICAgdHlwZTogVFlQRV9GUk9NX1NIT1JUX1RZUEVbc3BsaXRbMV0udHJpbSgpXVxuICB9O1xuXG4gIC8vIGNoZWNrIGFnZ3JlZ2F0ZSB0eXBlXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQUdHUkVHQVRFX09QUy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhID0gQUdHUkVHQVRFX09QU1tpXTtcbiAgICBpZiAoZmllbGREZWYuZmllbGQuaW5kZXhPZihhICsgJ18nKSA9PT0gMCkge1xuICAgICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoYS50b1N0cmluZygpLmxlbmd0aCArIDEpO1xuICAgICAgaWYgKGEgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UICYmIGZpZWxkRGVmLmZpZWxkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBmaWVsZERlZi5maWVsZCA9ICcqJztcbiAgICAgIH1cbiAgICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9IGE7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IFRJTUVVTklUUy5sZW5ndGg7IGkrKykge1xuICAgIGxldCB0dSA9IFRJTUVVTklUU1tpXTtcbiAgICBpZiAoZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQuaW5kZXhPZih0dSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGZpZWxkRGVmLmZpZWxkLmxlbmd0aCArIDEpO1xuICAgICAgZmllbGREZWYudGltZVVuaXQgPSB0dTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrIGJpblxuICBpZiAoZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQuaW5kZXhPZignYmluXycpID09PSAwKSB7XG4gICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoNCk7XG4gICAgZmllbGREZWYuYmluID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZERlZjtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4vYWdncmVnYXRlJztcblxuZXhwb3J0IGVudW0gU29ydE9yZGVyIHtcbiAgICBBU0NFTkRJTkcgPSAnYXNjZW5kaW5nJyBhcyBhbnksXG4gICAgREVTQ0VORElORyA9ICdkZXNjZW5kaW5nJyBhcyBhbnksXG4gICAgTk9ORSA9ICdub25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydEZpZWxkIHtcbiAgLyoqXG4gICAqIFRoZSBmaWVsZCBuYW1lIHRvIGFnZ3JlZ2F0ZSBvdmVyLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzb3J0IGFnZ3JlZ2F0aW9uIG9wZXJhdG9yXG4gICAqL1xuICBvcDogQWdncmVnYXRlT3A7XG5cbiAgb3JkZXI/OiBTb3J0T3JkZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NvcnRGaWVsZChzb3J0OiBTb3J0T3JkZXIgfCBTb3J0RmllbGQpOiBzb3J0IGlzIFNvcnRGaWVsZCB7XG4gIHJldHVybiAhIXNvcnQgJiYgISFzb3J0WydmaWVsZCddICYmICEhc29ydFsnb3AnXTtcbn1cbiIsIi8qIFBhY2thZ2Ugb2YgZGVmaW5pbmcgVmVnYS1saXRlIFNwZWNpZmljYXRpb24ncyBqc29uIHNjaGVtYSBhdCBpdHMgdXRpbGl0eSBmdW5jdGlvbnMgKi9cblxuaW1wb3J0IHtDb25maWcsIGRlZmF1bHRPdmVybGF5Q29uZmlnLCBBcmVhT3ZlcmxheX0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHtFbmNvZGluZywgVW5pdEVuY29kaW5nLCBoYXMsIGlzUmFuZ2VkfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmFjZXR9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge01hcmssIEVSUk9SQkFSLCBUSUNLLCBBUkVBLCBSVUxFLCBMSU5FLCBQT0lOVH0gZnJvbSAnLi9tYXJrJztcbmltcG9ydCB7c3RhY2t9IGZyb20gJy4vc3RhY2snO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCB7Uk9XLCBDT0xVTU4sIFgsIFksIFgyLCBZMn0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge2NvbnRhaW5zLCBkdXBsaWNhdGUsIGV4dGVuZCwga2V5cywgb21pdCwgcGlja30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSB2aXN1YWxpemF0aW9uIGZvciBsYXRlciByZWZlcmVuY2UuXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBkZXNjcmlwdGlvbiBvZiB0aGlzIG1hcmsgZm9yIGNvbW1lbnRpbmcgcHVycG9zZS5cbiAgICogVGhpcyBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBvdXRwdXQgdmlzdWFsaXphdGlvbi5cbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgZGF0YSBzb3VyY2VcbiAgICovXG4gIGRhdGE/OiBEYXRhO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyBmaWx0ZXIgYW5kIG5ldyBmaWVsZCBjYWxjdWxhdGlvbi5cbiAgICovXG4gIHRyYW5zZm9ybT86IFRyYW5zZm9ybTtcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGNvbmZpZz86IENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBVbml0RW5jb2Rpbmc7XG59XG5cbi8qKlxuICogU2NoZW1hIGZvciBhIHVuaXQgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24sIHdpdGggdGhlIHN5bnRhY3RpYyBzdWdhciBleHRlbnNpb25zOlxuICogLSBgcm93YCBhbmQgYGNvbHVtbmAgYXJlIGluY2x1ZGVkIGluIHRoZSBlbmNvZGluZy5cbiAqIC0gKEZ1dHVyZSkgbGFiZWwsIGJveCBwbG90XG4gKlxuICogTm90ZTogdGhlIHNwZWMgY291bGQgY29udGFpbiBmYWNldC5cbiAqXG4gKiBAcmVxdWlyZWQgW1wibWFya1wiLCBcImVuY29kaW5nXCJdXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIGZhY2V0OiBGYWNldDtcbiAgc3BlYzogTGF5ZXJTcGVjIHwgVW5pdFNwZWM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICAvKipcbiAgICogVW5pdCBzcGVjcyB0aGF0IHdpbGwgYmUgbGF5ZXJlZC5cbiAgICovXG4gIGxheWVyczogVW5pdFNwZWNbXTtcbn1cblxuLyoqIFRoaXMgaXMgZm9yIHRoZSBmdXR1cmUgc2NoZW1hICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuZGVkRmFjZXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICBmYWNldDogRmFjZXQ7XG5cbiAgc3BlYzogRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYztcbn1cblxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRTcGVjID0gRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcbmV4cG9ydCB0eXBlIFNwZWMgPSBVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcblxuLyogQ3VzdG9tIHR5cGUgZ3VhcmRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhY2V0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEZhY2V0U3BlYyB7XG4gIHJldHVybiBzcGVjWydmYWNldCddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgaWYgKGlzU29tZVVuaXRTcGVjKHNwZWMpKSB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICByZXR1cm4gaGFzUm93IHx8IGhhc0NvbHVtbjtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBVbml0U3BlYyB7XG4gIGlmIChpc1NvbWVVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiAhaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb21lVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHwgVW5pdFNwZWMge1xuICByZXR1cm4gc3BlY1snbWFyayddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xheWVyU3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIExheWVyU3BlYyB7XG4gIHJldHVybiBzcGVjWydsYXllcnMnXSAhPT0gdW5kZWZpbmVkO1xufVxuXG5cbi8qKlxuICogRGVjb21wb3NlIGV4dGVuZGVkIHVuaXQgc3BlY3MgaW50byBjb21wb3NpdGlvbiBvZiBwdXJlIHVuaXQgc3BlY3MuXG4gKi9cbi8vIFRPRE86IGNvbnNpZGVyIG1vdmluZyB0aGlzIHRvIGFub3RoZXIgZmlsZS4gIE1heWJlIHZsLnNwZWMubm9ybWFsaXplIG9yIHZsLm5vcm1hbGl6ZVxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShzcGVjOiBFeHRlbmRlZFNwZWMpOiBTcGVjIHtcbiAgaWYgKGlzRXh0ZW5kZWRVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiBub3JtYWxpemVFeHRlbmRlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZVVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXh0ZW5kZWRVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogU3BlYyB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICAvLyBUT0RPOiBAYXJ2aW5kIHBsZWFzZSAgYWRkIGludGVyYWN0aW9uIHN5bnRheCBoZXJlXG4gICAgbGV0IGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICAgIGRlbGV0ZSBlbmNvZGluZy5jb2x1bW47XG4gICAgZGVsZXRlIGVuY29kaW5nLnJvdztcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBzcGVjLm5hbWUgPyB7IG5hbWU6IHNwZWMubmFtZSB9IDoge30sXG4gICAgICBzcGVjLmRlc2NyaXB0aW9uID8geyBkZXNjcmlwdGlvbjogc3BlYy5kZXNjcmlwdGlvbiB9IDoge30sXG4gICAgICB7IGRhdGE6IHNwZWMuZGF0YSB9LFxuICAgICAgc3BlYy50cmFuc2Zvcm0gPyB7IHRyYW5zZm9ybTogc3BlYy50cmFuc2Zvcm0gfSA6IHt9LFxuICAgICAge1xuICAgICAgICBmYWNldDogZXh0ZW5kKFxuICAgICAgICAgIGhhc1JvdyA/IHsgcm93OiBzcGVjLmVuY29kaW5nLnJvdyB9IDoge30sXG4gICAgICAgICAgaGFzQ29sdW1uID8geyBjb2x1bW46IHNwZWMuZW5jb2RpbmcuY29sdW1uIH0gOiB7fVxuICAgICAgICApLFxuICAgICAgICBzcGVjOiBub3JtYWxpemVVbml0U3BlYyh7XG4gICAgICAgICAgbWFyazogc3BlYy5tYXJrLFxuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNwZWMuY29uZmlnID8geyBjb25maWc6IHNwZWMuY29uZmlnIH0gOiB7fVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVVbml0U3BlYyhzcGVjOiBVbml0U3BlYyk6IFNwZWMge1xuICBjb25zdCBjb25maWcgPSBzcGVjLmNvbmZpZztcbiAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IGNvbmZpZyAmJiBjb25maWcub3ZlcmxheTtcbiAgY29uc3Qgb3ZlcmxheVdpdGhMaW5lID0gb3ZlcmxheUNvbmZpZyAgJiYgc3BlYy5tYXJrID09PSBBUkVBICYmXG4gICAgY29udGFpbnMoW0FyZWFPdmVybGF5LkxJTkVQT0lOVCwgQXJlYU92ZXJsYXkuTElORV0sIG92ZXJsYXlDb25maWcuYXJlYSk7XG4gIGNvbnN0IG92ZXJsYXlXaXRoUG9pbnQgPSBvdmVybGF5Q29uZmlnICYmIChcbiAgICAob3ZlcmxheUNvbmZpZy5saW5lICYmIHNwZWMubWFyayA9PT0gTElORSkgfHxcbiAgICAob3ZlcmxheUNvbmZpZy5hcmVhID09PSBBcmVhT3ZlcmxheS5MSU5FUE9JTlQgJiYgc3BlYy5tYXJrID09PSBBUkVBKVxuICApO1xuXG4gIC8vIFRPRE86IHRob3JvdWdobHkgdGVzdFxuICBpZiAoc3BlYy5tYXJrID09PSBFUlJPUkJBUikge1xuICAgIHJldHVybiBub3JtYWxpemVFcnJvckJhclVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIC8vIFRPRE86IHRob3JvdWdobHkgdGVzdFxuICBpZiAoaXNSYW5nZWQoc3BlYy5lbmNvZGluZykpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplUmFuZ2VkVW5pdFNwZWMoc3BlYyk7XG4gIH1cblxuICBpZiAoaXNTdGFja2VkKHNwZWMpKSB7XG4gICAgLy8gV2UgY2FuJ3Qgb3ZlcmxheSBzdGFja2VkIGFyZWEgeWV0IVxuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgaWYgKG92ZXJsYXlXaXRoUG9pbnQgfHwgb3ZlcmxheVdpdGhMaW5lKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU92ZXJsYXkoc3BlYywgb3ZlcmxheVdpdGhQb2ludCwgb3ZlcmxheVdpdGhMaW5lKTtcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVJhbmdlZFVuaXRTcGVjKHNwZWM6IFVuaXRTcGVjKTogU3BlYyB7XG4gIGlmIChzcGVjLmVuY29kaW5nKSB7XG4gICAgY29uc3QgaGFzWCA9IGhhcyhzcGVjLmVuY29kaW5nLCBYKTtcbiAgICBjb25zdCBoYXNZID0gaGFzKHNwZWMuZW5jb2RpbmcsIFkpO1xuICAgIGNvbnN0IGhhc1gyID0gaGFzKHNwZWMuZW5jb2RpbmcsIFgyKTtcbiAgICBjb25zdCBoYXNZMiA9IGhhcyhzcGVjLmVuY29kaW5nLCBZMik7XG4gICAgaWYgKChoYXNYMiAmJiAhaGFzWCkgfHwgKGhhc1kyICYmICFoYXNZKSkge1xuICAgICAgbGV0IG5vcm1hbGl6ZWRTcGVjID0gZHVwbGljYXRlKHNwZWMpO1xuICAgICAgaWYgKGhhc1gyICYmICFoYXNYKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnggPSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy54MjtcbiAgICAgICAgZGVsZXRlIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLngyO1xuICAgICAgfVxuICAgICAgaWYgKGhhc1kyICYmICFoYXNZKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnkgPSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy55MjtcbiAgICAgICAgZGVsZXRlIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnkyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFNwZWM7XG4gICAgfVxuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXJyb3JCYXJVbml0U3BlYyhzcGVjOiBVbml0U3BlYyk6IFNwZWMge1xuICAvLyBGSVhNRSBjb3JyZWN0bHkgZGVhbCB3aXRoIGNvbG9yIGFuZCBvcGFjaXR5XG5cbiAgbGV0IGxheWVyU3BlYyA9IGV4dGVuZChzcGVjLm5hbWUgPyB7bmFtZTogc3BlYy5uYW1lfSA6IHt9LFxuICAgIHNwZWMuZGVzY3JpcHRpb24gPyB7ZGVzY3JpcHRpb246IHNwZWMuZGVzY3JpcHRpb259IDoge30sXG4gICAgc3BlYy5kYXRhID8ge2RhdGE6IHNwZWMuZGF0YX0gOiB7fSxcbiAgICBzcGVjLnRyYW5zZm9ybSA/IHt0cmFuc2Zvcm06IHNwZWMudHJhbnNmb3JtfSA6IHt9LFxuICAgIHNwZWMuY29uZmlnID8ge2NvbmZpZzogc3BlYy5jb25maWd9IDoge30sIHtsYXllcnM6IFtdfVxuICApO1xuICBpZiAoIXNwZWMuZW5jb2RpbmcpIHtcbiAgICByZXR1cm4gbGF5ZXJTcGVjO1xuICB9XG4gIGlmIChzcGVjLm1hcmsgPT09IEVSUk9SQkFSKSB7XG4gICAgY29uc3QgcnVsZVNwZWMgPSB7XG4gICAgICBtYXJrOiBSVUxFLFxuICAgICAgZW5jb2Rpbmc6IGV4dGVuZChcbiAgICAgICAgc3BlYy5lbmNvZGluZy54ID8ge3g6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnkgPyB7eTogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueSl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueDIgPyB7eDI6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngyKX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy55MiA/IHt5MjogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueTIpfSA6IHt9LFxuICAgICAgICB7fSlcbiAgICB9O1xuICAgIGNvbnN0IGxvd2VyVGlja1NwZWMgPSB7XG4gICAgICBtYXJrOiBUSUNLLFxuICAgICAgZW5jb2Rpbmc6IGV4dGVuZChcbiAgICAgICAgc3BlYy5lbmNvZGluZy54ID8ge3g6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnkgPyB7eTogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueSl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2Rpbmcuc2l6ZSA/IHtzaXplOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy5zaXplKX0gOiB7fSxcbiAgICAgICAge30pXG4gICAgfTtcbiAgICBjb25zdCB1cHBlclRpY2tTcGVjID0ge1xuICAgICAgbWFyazogVElDSyxcbiAgICAgIGVuY29kaW5nOiBleHRlbmQoe1xuICAgICAgICB4OiBzcGVjLmVuY29kaW5nLngyID8gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueDIpIDogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueCksXG4gICAgICAgIHk6IHNwZWMuZW5jb2RpbmcueTIgPyBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55MikgOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55KVxuICAgICAgfSwgc3BlYy5lbmNvZGluZy5zaXplID8ge3NpemU6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnNpemUpfSA6IHt9KVxuICAgIH07XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKG5vcm1hbGl6ZVVuaXRTcGVjKHJ1bGVTcGVjKSk7XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKG5vcm1hbGl6ZVVuaXRTcGVjKGxvd2VyVGlja1NwZWMpKTtcbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobm9ybWFsaXplVW5pdFNwZWModXBwZXJUaWNrU3BlYykpO1xuICB9XG4gIHJldHVybiBsYXllclNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVPdmVybGF5KHNwZWM6IFVuaXRTcGVjLCBvdmVybGF5V2l0aFBvaW50OiBib29sZWFuLCBvdmVybGF5V2l0aExpbmU6IGJvb2xlYW4pOiBMYXllclNwZWMge1xuICBsZXQgb3V0ZXJQcm9wcyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdkYXRhJywgJ3RyYW5zZm9ybSddO1xuICBsZXQgYmFzZVNwZWMgPSBvbWl0KHNwZWMsIG91dGVyUHJvcHMuY29uY2F0KCdjb25maWcnKSk7XG5cbiAgbGV0IGJhc2VDb25maWcgPSBkdXBsaWNhdGUoc3BlYy5jb25maWcpO1xuICBkZWxldGUgYmFzZUNvbmZpZy5vdmVybGF5O1xuICAvLyBUT0RPOiByZW1vdmUgc2hhcGUsIHNpemVcblxuICBjb25zdCBsYXllclNwZWMgPSBleHRlbmQoXG4gICAgcGljayhzcGVjLCBvdXRlclByb3BzKSxcbiAgICB7IGxheWVyczogW2Jhc2VTcGVjXSB9LFxuICAgIGtleXMoYmFzZUNvbmZpZykubGVuZ3RoID4gMCA/IHsgY29uZmlnOiBiYXNlQ29uZmlnIH0gOiB7fVxuICApO1xuXG4gIGlmIChvdmVybGF5V2l0aExpbmUpIHtcbiAgICAvLyBUT0RPOiBhZGQgbmFtZSB3aXRoIHN1ZmZpeFxuICAgIGxldCBsaW5lU3BlYyA9IGR1cGxpY2F0ZShiYXNlU3BlYyk7XG4gICAgbGluZVNwZWMubWFyayA9IExJTkU7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHNoYXBlLCBzaXplXG4gICAgbGV0IG1hcmtDb25maWcgPSBleHRlbmQoe30sIGRlZmF1bHRPdmVybGF5Q29uZmlnLmxpbmVTdHlsZSwgc3BlYy5jb25maWcub3ZlcmxheS5saW5lU3R5bGUpO1xuICAgIGlmIChrZXlzKG1hcmtDb25maWcpLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmVTcGVjLmNvbmZpZyA9IHttYXJrOiBtYXJrQ29uZmlnfTtcbiAgICB9XG5cbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobGluZVNwZWMpO1xuICB9XG5cbiAgaWYgKG92ZXJsYXlXaXRoUG9pbnQpIHtcbiAgICAvLyBUT0RPOiBhZGQgbmFtZSB3aXRoIHN1ZmZpeFxuICAgIGxldCBwb2ludFNwZWMgPSBkdXBsaWNhdGUoYmFzZVNwZWMpO1xuICAgIHBvaW50U3BlYy5tYXJrID0gUE9JTlQ7XG4gICAgbGV0IG1hcmtDb25maWcgPSBleHRlbmQoe30sIGRlZmF1bHRPdmVybGF5Q29uZmlnLnBvaW50U3R5bGUsIHNwZWMuY29uZmlnLm92ZXJsYXkucG9pbnRTdHlsZSk7O1xuICAgIGlmIChrZXlzKG1hcmtDb25maWcpLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvaW50U3BlYy5jb25maWcgPSB7bWFyazogbWFya0NvbmZpZ307XG4gICAgfVxuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChwb2ludFNwZWMpO1xuICB9XG4gIHJldHVybiBsYXllclNwZWM7XG59XG5cbi8vIFRPRE86IGFkZCB2bC5zcGVjLnZhbGlkYXRlICYgbW92ZSBzdHVmZiBmcm9tIHZsLnZhbGlkYXRlIHRvIGhlcmVcblxuZXhwb3J0IGZ1bmN0aW9uIGFsd2F5c05vT2NjbHVzaW9uKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBib29sZWFuIHtcbiAgLy8gRklYTUUgcmF3IE94USB3aXRoICMgb2Ygcm93cyA9ICMgb2YgT1xuICByZXR1cm4gdmxFbmNvZGluZy5pc0FnZ3JlZ2F0ZShzcGVjLmVuY29kaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRGVmcyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRmllbGREZWZbXSB7XG4gIC8vIFRPRE86IHJlZmFjdG9yIHRoaXMgb25jZSB3ZSBoYXZlIGNvbXBvc2l0aW9uXG4gIHJldHVybiB2bEVuY29kaW5nLmZpZWxkRGVmcyhzcGVjLmVuY29kaW5nKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGVhblNwZWMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEV4dGVuZGVkVW5pdFNwZWMge1xuICAvLyBUT0RPOiBtb3ZlIHRvU3BlYyB0byBoZXJlIVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RhY2tlZChzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogYm9vbGVhbiB7XG4gIHJldHVybiBzdGFjayhzcGVjLm1hcmssIHNwZWMuZW5jb2RpbmcsIHNwZWMuY29uZmlnKSAhPT0gbnVsbDtcbn1cblxuLy8gVE9ETyByZXZpc2VcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEV4dGVuZGVkVW5pdFNwZWMge1xuICBjb25zdCBvbGRlbmMgPSBzcGVjLmVuY29kaW5nO1xuICBsZXQgZW5jb2RpbmcgPSBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZyk7XG4gIGVuY29kaW5nLnggPSBvbGRlbmMueTtcbiAgZW5jb2RpbmcueSA9IG9sZGVuYy54O1xuICBlbmNvZGluZy5yb3cgPSBvbGRlbmMuY29sdW1uO1xuICBlbmNvZGluZy5jb2x1bW4gPSBvbGRlbmMucm93O1xuICBzcGVjLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHJldHVybiBzcGVjO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsLCBTVEFDS19HUk9VUF9DSEFOTkVMUywgWCwgWX0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0VuY29kaW5nLCBoYXMsIGlzQWdncmVnYXRlfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFyaywgQkFSLCBBUkVBfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWluc30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gU3RhY2tPZmZzZXQge1xuICBaRVJPID0gJ3plcm8nIGFzIGFueSxcbiAgQ0VOVEVSID0gJ2NlbnRlcicgYXMgYW55LFxuICBOT1JNQUxJWkUgPSAnbm9ybWFsaXplJyBhcyBhbnksXG4gIE5PTkUgPSAnbm9uZScgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tQcm9wZXJ0aWVzIHtcbiAgLyoqIERpbWVuc2lvbiBheGlzIG9mIHRoZSBzdGFjayAoJ3gnIG9yICd5JykuICovXG4gIGdyb3VwYnlDaGFubmVsOiBDaGFubmVsO1xuXG4gIC8qKiBNZWFzdXJlIGF4aXMgb2YgdGhlIHN0YWNrICgneCcgb3IgJ3knKS4gKi9cbiAgZmllbGRDaGFubmVsOiBDaGFubmVsO1xuXG4gIC8qKiBTdGFjay1ieSBjaGFubmVscyBlLmcuLCBjb2xvciwgZGV0YWlsICovXG4gIHN0YWNrQnlDaGFubmVsczogQ2hhbm5lbFtdO1xuXG4gIC8qKiBTdGFjayBvZmZzZXQgcHJvcGVydHkuICovXG4gIG9mZnNldDogU3RhY2tPZmZzZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFjayhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogU3RhY2tQcm9wZXJ0aWVzIHtcbiAgY29uc3Qgc3RhY2tlZCA9IChjb25maWcgJiYgY29uZmlnLm1hcmspID8gY29uZmlnLm1hcmsuc3RhY2tlZCA6IHVuZGVmaW5lZDtcblxuICAvLyBTaG91bGQgbm90IGhhdmUgc3RhY2sgZXhwbGljaXRseSBkaXNhYmxlZFxuICBpZiAoY29udGFpbnMoW1N0YWNrT2Zmc2V0Lk5PTkUsIG51bGwsIGZhbHNlXSwgc3RhY2tlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIHN0YWNrYWJsZSBtYXJrXG4gIGlmICghY29udGFpbnMoW0JBUiwgQVJFQV0sIG1hcmspKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTaG91bGQgYmUgYWdncmVnYXRlIHBsb3RcbiAgaWYgKCFpc0FnZ3JlZ2F0ZShlbmNvZGluZykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIGdyb3VwaW5nIGxldmVsIG9mIGRldGFpbFxuICBjb25zdCBzdGFja0J5Q2hhbm5lbHMgPSBTVEFDS19HUk9VUF9DSEFOTkVMUy5yZWR1Y2UoKHNjLCBjaGFubmVsKSA9PiB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkgJiYgIWVuY29kaW5nW2NoYW5uZWxdLmFnZ3JlZ2F0ZSkge1xuICAgICAgc2MucHVzaChjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIHNjO1xuICB9LCBbXSk7XG5cbiAgaWYgKHN0YWNrQnlDaGFubmVscy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhhcyBvbmx5IG9uZSBhZ2dyZWdhdGUgYXhpc1xuICBjb25zdCBoYXNYRmllbGQgPSBoYXMoZW5jb2RpbmcsIFgpO1xuICBjb25zdCBoYXNZRmllbGQgPSBoYXMoZW5jb2RpbmcsIFkpO1xuICBjb25zdCB4SXNBZ2dyZWdhdGUgPSBoYXNYRmllbGQgJiYgISFlbmNvZGluZy54LmFnZ3JlZ2F0ZTtcbiAgY29uc3QgeUlzQWdncmVnYXRlID0gaGFzWUZpZWxkICYmICEhZW5jb2RpbmcueS5hZ2dyZWdhdGU7XG5cbiAgaWYgKHhJc0FnZ3JlZ2F0ZSAhPT0geUlzQWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwYnlDaGFubmVsOiB4SXNBZ2dyZWdhdGUgPyAoaGFzWUZpZWxkID8gWSA6IG51bGwpIDogKGhhc1hGaWVsZCA/IFggOiBudWxsKSxcbiAgICAgIGZpZWxkQ2hhbm5lbDogeElzQWdncmVnYXRlID8gWCA6IFksXG4gICAgICBzdGFja0J5Q2hhbm5lbHM6IHN0YWNrQnlDaGFubmVscyxcbiAgICAgIG9mZnNldDogc3RhY2tlZCB8fCBTdGFja09mZnNldC5aRVJPXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7Q09MVU1OLCBST1csIFNIQVBFLCBDT0xPUiwgQ2hhbm5lbH0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7RGF0ZVRpbWVFeHByLCBkYXRlVGltZUV4cHJ9IGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtEaWN0LCBjb250YWlucywga2V5cywgcmFuZ2V9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBlbnVtIFRpbWVVbml0IHtcbiAgWUVBUiA9ICd5ZWFyJyBhcyBhbnksXG4gIE1PTlRIID0gJ21vbnRoJyBhcyBhbnksXG4gIERBWSA9ICdkYXknIGFzIGFueSxcbiAgREFURSA9ICdkYXRlJyBhcyBhbnksXG4gIEhPVVJTID0gJ2hvdXJzJyBhcyBhbnksXG4gIE1JTlVURVMgPSAnbWludXRlcycgYXMgYW55LFxuICBTRUNPTkRTID0gJ3NlY29uZHMnIGFzIGFueSxcbiAgTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcycgYXMgYW55LFxuICBZRUFSTU9OVEggPSAneWVhcm1vbnRoJyBhcyBhbnksXG4gIFlFQVJNT05USERBVEUgPSAneWVhcm1vbnRoZGF0ZScgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFSE9VUlMgPSAneWVhcm1vbnRoZGF0ZWhvdXJzJyBhcyBhbnksXG4gIFlFQVJNT05USERBVEVIT1VSU01JTlVURVMgPSAneWVhcm1vbnRoZGF0ZWhvdXJzbWludXRlcycgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFSE9VUlNNSU5VVEVTU0VDT05EUyA9ICd5ZWFybW9udGhkYXRlaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBIT1VSU01JTlVURVMgPSAnaG91cnNtaW51dGVzJyBhcyBhbnksXG4gIEhPVVJTTUlOVVRFU1NFQ09ORFMgPSAnaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBNSU5VVEVTU0VDT05EUyA9ICdtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBTRUNPTkRTTUlMTElTRUNPTkRTID0gJ3NlY29uZHNtaWxsaXNlY29uZHMnIGFzIGFueSxcbiAgUVVBUlRFUiA9ICdxdWFydGVyJyBhcyBhbnksXG4gIFlFQVJRVUFSVEVSID0gJ3llYXJxdWFydGVyJyBhcyBhbnksXG4gIFFVQVJURVJNT05USCA9ICdxdWFydGVybW9udGgnIGFzIGFueSxcbiAgWUVBUlFVQVJURVJNT05USCA9ICd5ZWFycXVhcnRlcm1vbnRoJyBhcyBhbnksXG59XG5cbi8qKiBUaW1lIFVuaXQgdGhhdCBvbmx5IGNvcnJlc3BvbmRzIHRvIG9ubHkgb25lIHBhcnQgb2YgRGF0ZSBvYmplY3RzLiAqL1xuZXhwb3J0IGNvbnN0IFNJTkdMRV9USU1FVU5JVFMgPSBbXG4gIFRpbWVVbml0LllFQVIsXG4gIFRpbWVVbml0LlFVQVJURVIsXG4gIFRpbWVVbml0Lk1PTlRILFxuICBUaW1lVW5pdC5EQVksXG4gIFRpbWVVbml0LkRBVEUsXG4gIFRpbWVVbml0LkhPVVJTLFxuICBUaW1lVW5pdC5NSU5VVEVTLFxuICBUaW1lVW5pdC5TRUNPTkRTLFxuICBUaW1lVW5pdC5NSUxMSVNFQ09ORFMsXG5dO1xuXG5jb25zdCBTSU5HTEVfVElNRVVOSVRfSU5ERVg6IERpY3Q8Ym9vbGVhbj4gPSBTSU5HTEVfVElNRVVOSVRTLnJlZHVjZSgoZCwgdGltZVVuaXQpID0+IHtcbiAgZFt0aW1lVW5pdF0gPSB0cnVlO1xuICByZXR1cm4gZDtcbn0sIHt9IGFzIERpY3Q8Ym9vbGVhbj4pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTaW5nbGVUaW1lVW5pdCh0aW1lVW5pdDogVGltZVVuaXQpIHtcbiAgcmV0dXJuICEhU0lOR0xFX1RJTUVVTklUX0lOREVYW3RpbWVVbml0XTtcbn1cblxuZXhwb3J0IGNvbnN0IE1VTFRJX1RJTUVVTklUUyA9IFtcbiAgVGltZVVuaXQuWUVBUlFVQVJURVIsXG4gIFRpbWVVbml0LllFQVJRVUFSVEVSTU9OVEgsXG4gIFRpbWVVbml0LllFQVJNT05USCxcbiAgVGltZVVuaXQuWUVBUk1PTlRIREFURSxcbiAgVGltZVVuaXQuWUVBUk1PTlRIREFURUhPVVJTLFxuICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVRFSE9VUlNNSU5VVEVTLFxuICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVRFSE9VUlNNSU5VVEVTU0VDT05EUyxcbiAgVGltZVVuaXQuUVVBUlRFUk1PTlRILFxuICBUaW1lVW5pdC5IT1VSU01JTlVURVMsXG4gIFRpbWVVbml0LkhPVVJTTUlOVVRFU1NFQ09ORFMsXG4gIFRpbWVVbml0Lk1JTlVURVNTRUNPTkRTLFxuICBUaW1lVW5pdC5TRUNPTkRTTUlMTElTRUNPTkRTLFxuXTtcblxuY29uc3QgTVVMVElfVElNRVVOSVRfSU5ERVg6IERpY3Q8Ym9vbGVhbj4gPSBNVUxUSV9USU1FVU5JVFMucmVkdWNlKChkLCB0aW1lVW5pdCkgPT4ge1xuICBkW3RpbWVVbml0XSA9IHRydWU7XG4gIHJldHVybiBkO1xufSwge30gYXMgRGljdDxib29sZWFuPik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpVGltZVVuaXQodGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gIHJldHVybiAhIU1VTFRJX1RJTUVVTklUX0lOREVYW3RpbWVVbml0XTtcbn1cblxuZXhwb3J0IGNvbnN0IFRJTUVVTklUUyA9IFNJTkdMRV9USU1FVU5JVFMuY29uY2F0KE1VTFRJX1RJTUVVTklUUyk7XG5cbi8qKiBSZXR1cm5zIHRydWUgaWYgZnVsbFRpbWVVbml0IGNvbnRhaW5zIHRoZSB0aW1lVW5pdCwgZmFsc2Ugb3RoZXJ3aXNlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zVGltZVVuaXQoZnVsbFRpbWVVbml0OiBUaW1lVW5pdCwgdGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gIGxldCBmdWxsVGltZVVuaXRTdHIgPSBmdWxsVGltZVVuaXQudG9TdHJpbmcoKTtcbiAgbGV0IHRpbWVVbml0U3RyID0gdGltZVVuaXQudG9TdHJpbmcoKTtcbiAgY29uc3QgaW5kZXggPSBmdWxsVGltZVVuaXRTdHIuaW5kZXhPZih0aW1lVW5pdFN0cik7XG4gIHJldHVybiBpbmRleCA+IC0xICYmXG4gICAgKFxuICAgICAgdGltZVVuaXQgIT09IFRpbWVVbml0LlNFQ09ORFMgfHxcbiAgICAgIGluZGV4ID09PSAwIHx8XG4gICAgICBmdWxsVGltZVVuaXRTdHIuY2hhckF0KGluZGV4LTEpICE9PSAnaScgLy8gZXhjbHVkZSBtaWxsaXNlY29uZHNcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFNjYWxlVHlwZSh0aW1lVW5pdDogVGltZVVuaXQpIHtcbiAgIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgIGNhc2UgVGltZVVuaXQuREFZOlxuICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgY2FzZSBUaW1lVW5pdC5RVUFSVEVSOlxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG4gIC8vIGRhdGUsIHllYXIsIG1pbnV0ZSwgc2Vjb25kLCB5ZWFybW9udGgsIG1vbnRoZGF5LCAuLi5cbiAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xufVxuXG4vKipcbiAqIFJldHVybnMgVmVnYSBleHByZXNzc2lvbiBmb3IgYSBnaXZlbiB0aW1lVW5pdCBhbmQgZmllbGRSZWZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRXhwcihmdWxsVGltZVVuaXQ6IFRpbWVVbml0LCBmaWVsZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZmllbGRSZWYgPSAnZGF0dW0uJyArIGZpZWxkO1xuXG4gIGZ1bmN0aW9uIGZ1bmModGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gICAgaWYgKHRpbWVVbml0ID09PSBUaW1lVW5pdC5RVUFSVEVSKSB7XG4gICAgICAvLyBEaXZpZGUgYnkgMyB0byBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgcXVhcnRlciBudW1iZXIsIG11bHRpcGx5IGJ5IDNcbiAgICAgIC8vIHRvIHNjYWxlIHRvIHRoZSBmaXJzdCBtb250aCBvZiB0aGUgY29ycmVzcG9uZGluZyBxdWFydGVyKDAsMyw2LDkpLlxuICAgICAgcmV0dXJuICdmbG9vcihtb250aCgnICsgZmllbGRSZWYgKyAnKScgKyAnLzMpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWVVbml0ICsgJygnICsgZmllbGRSZWYgKyAnKScgO1xuICAgIH1cbiAgfVxuXG4gIGxldCBkOiBEYXRlVGltZUV4cHIgPSBTSU5HTEVfVElNRVVOSVRTLnJlZHVjZSgoX2QsIHR1OiBUaW1lVW5pdCkgPT4ge1xuICAgIGlmIChjb250YWluc1RpbWVVbml0KGZ1bGxUaW1lVW5pdCwgdHUpKSB7XG4gICAgICBfZFt0dV0gPSBmdW5jKHR1KTtcbiAgICB9XG4gICAgcmV0dXJuIF9kO1xuICB9LCB7fSk7XG5cbiAgaWYgKGQuZGF5ICYmIGtleXMoZCkubGVuZ3RoID4gMSkge1xuICAgIGNvbnNvbGUud2FybignVGltZSB1bml0IFwiJysgZnVsbFRpbWVVbml0ICsnXCIgaXMgbm90IHN1cHBvcnRlZC4gV2UgYXJlIHJlcGxhY2luZyBpdCB3aXRoICcsXG4gICAgICAoZnVsbFRpbWVVbml0KycnKS5yZXBsYWNlKCdkYXknLCAnZGF0ZScpKycuJyk7XG4gICAgZGVsZXRlIGQuZGF5O1xuICAgIGQuZGF0ZSA9IGZ1bmMoVGltZVVuaXQuREFURSk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRpbWVFeHByKGQpO1xufVxuXG4vKiogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHJhdyBkb21haW4uICovXG5leHBvcnQgZnVuY3Rpb24gcmF3RG9tYWluKHRpbWVVbml0OiBUaW1lVW5pdCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRSwgQ09MT1JdLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5NSU5VVEVTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDYwKTtcbiAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDI0KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgIHJldHVybiByYW5nZSgwLCA3KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBVEU6XG4gICAgICByZXR1cm4gcmFuZ2UoMSwgMzIpO1xuICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgMTIpO1xuICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgIHJldHVybiBbMCwzLDYsOV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIHJldHVybnMgdGhlIHNtYWxsZXN0IG5pY2UgdW5pdCBmb3Igc2NhbGUubmljZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtYWxsZXN0VW5pdCh0aW1lVW5pdCk6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlNFQ09ORFMpKSB7XG4gICAgcmV0dXJuICdzZWNvbmQnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1JTlVURVMpKSB7XG4gICAgcmV0dXJuICdtaW51dGUnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkhPVVJTKSkge1xuICAgIHJldHVybiAnaG91cic7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSB8fFxuICAgICAgY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFURSkpIHtcbiAgICByZXR1cm4gJ2RheSc7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTU9OVEgpKSB7XG4gICAgcmV0dXJuICdtb250aCc7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuWUVBUikpIHtcbiAgICByZXR1cm4gJ3llYXInO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKiByZXR1cm5zIHRoZSB0ZW1wbGF0ZSBuYW1lIHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRpbWVVbml0OiBUaW1lVW5pdCwgZmllbGQ6IHN0cmluZywgc2hvcnRUaW1lTGFiZWxzOiBib29sZWFuKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgZGF0ZUNvbXBvbmVudHMgPSBbXTtcblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuWUVBUikpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKHNob3J0VGltZUxhYmVscyA/ICcleScgOiAnJVknKTtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5RVUFSVEVSKSkge1xuICAgLy8gc3BlY2lhbCB0ZW1wbGF0ZSBmb3IgcXVhcnRlclxuICAgZGF0ZUNvbXBvbmVudHMucHVzaCgnXFwnfX1Re3snICsgZmllbGQgKyAnIHwgcXVhcnRlcn19e3snICsgZmllbGQgKyAnIHwgdGltZTpcXCcnKTtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NT05USCkpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKHNob3J0VGltZUxhYmVscyA/ICclYicgOiAnJUInKTtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5EQVkpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJWEnIDogJyVBJyk7XG4gIH0gZWxzZSBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFURSkpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKCclZCcpO1xuICB9XG5cbiAgbGV0IHRpbWVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkhPVVJTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVIJyk7XG4gIH1cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1JTlVURVMpKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJU0nKTtcbiAgfVxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuU0VDT05EUykpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclUycpO1xuICB9XG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSUxMSVNFQ09ORFMpKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJUwnKTtcbiAgfVxuXG4gIGxldCBvdXQgPSBbXTtcbiAgaWYgKGRhdGVDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBvdXQucHVzaChkYXRlQ29tcG9uZW50cy5qb2luKCctJykpO1xuICB9XG4gIGlmICh0aW1lQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2godGltZUNvbXBvbmVudHMuam9pbignOicpKTtcbiAgfVxuXG4gIGlmIChvdXQubGVuZ3RoID4gMCkge1xuICAvLyBjbGVhbiB1cCBlbXB0eSBmb3JtYXR0aW5nIGV4cHJlc3Npb25zIHRoYXQgbWF5IGhhdmUgYmVlbiBnZW5lcmF0ZWQgYnkgdGhlIHF1YXJ0ZXIgdGltZSB1bml0XG4gICBjb25zdCB0ZW1wbGF0ZSA9ICd7eycgKyBmaWVsZCArICcgfCB0aW1lOlxcJycgKyBvdXQuam9pbignICcpICsgJ1xcJ319JztcblxuICAgLy8gRklYTUU6IFJlbW92ZSB0aGlzIFJlZ0V4cCBIYWNrISEhXG4gICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZShuZXcgUmVnRXhwKCd7eycgKyBmaWVsZCArICcgXFxcXHwgdGltZTpcXCdcXCd9fScsICdnJyksICcnKTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuIiwiLyoqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBkYXRhIHR5cGUgKi9cblxuZXhwb3J0IGVudW0gVHlwZSB7XG4gIFFVQU5USVRBVElWRSA9ICdxdWFudGl0YXRpdmUnIGFzIGFueSxcbiAgT1JESU5BTCA9ICdvcmRpbmFsJyBhcyBhbnksXG4gIFRFTVBPUkFMID0gJ3RlbXBvcmFsJyBhcyBhbnksXG4gIE5PTUlOQUwgPSAnbm9taW5hbCcgYXMgYW55XG59XG5cbmV4cG9ydCBjb25zdCBRVUFOVElUQVRJVkUgPSBUeXBlLlFVQU5USVRBVElWRTtcbmV4cG9ydCBjb25zdCBPUkRJTkFMID0gVHlwZS5PUkRJTkFMO1xuZXhwb3J0IGNvbnN0IFRFTVBPUkFMID0gVHlwZS5URU1QT1JBTDtcbmV4cG9ydCBjb25zdCBOT01JTkFMID0gVHlwZS5OT01JTkFMO1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBmdWxsIHR5cGUgbmFtZXMgdG8gc2hvcnQgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBTSE9SVF9UWVBFID0ge1xuICBxdWFudGl0YXRpdmU6ICdRJyxcbiAgdGVtcG9yYWw6ICdUJyxcbiAgbm9taW5hbDogJ04nLFxuICBvcmRpbmFsOiAnTydcbn07XG4vKipcbiAqIE1hcHBpbmcgZnJvbSBzaG9ydCB0eXBlIG5hbWVzIHRvIGZ1bGwgdHlwZSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBUWVBFX0ZST01fU0hPUlRfVFlQRSA9IHtcbiAgUTogUVVBTlRJVEFUSVZFLFxuICBUOiBURU1QT1JBTCxcbiAgTzogT1JESU5BTCxcbiAgTjogTk9NSU5BTFxufTtcblxuLyoqXG4gKiBHZXQgZnVsbCwgbG93ZXJjYXNlIHR5cGUgbmFtZSBmb3IgYSBnaXZlbiB0eXBlLlxuICogQHBhcmFtICB0eXBlXG4gKiBAcmV0dXJuIEZ1bGwgdHlwZSBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbE5hbWUodHlwZTogVHlwZSk6IFR5cGUge1xuICBjb25zdCB0eXBlU3RyaW5nID0gPGFueT50eXBlOyAgLy8gZm9yY2UgdHlwZSBhcyBzdHJpbmcgc28gd2UgY2FuIHRyYW5zbGF0ZSBzaG9ydCB0eXBlc1xuICByZXR1cm4gVFlQRV9GUk9NX1NIT1JUX1RZUEVbdHlwZVN0cmluZy50b1VwcGVyQ2FzZSgpXSB8fCAvLyBzaG9ydCB0eXBlIGlzIHVwcGVyY2FzZSBieSBkZWZhdWx0XG4gICAgICAgICB0eXBlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9kYXRhbGliLmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9qc29uLXN0YWJsZS1zdHJpbmdpZnkuZC50c1wiLz5cblxuaW1wb3J0ICogYXMgc3RyaW5naWZ5IGZyb20gJ2pzb24tc3RhYmxlLXN0cmluZ2lmeSc7XG5leHBvcnQge2tleXMsIGV4dGVuZCwgZHVwbGljYXRlLCBpc0FycmF5LCB2YWxzLCB0cnVuY2F0ZSwgdG9NYXAsIGlzT2JqZWN0LCBpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbn0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5pbXBvcnQge2R1cGxpY2F0ZSBhcyBfZHVwbGljYXRlfSBmcm9tICdkYXRhbGliL3NyYy91dGlsJztcbmV4cG9ydCB7cmFuZ2V9IGZyb20gJ2RhdGFsaWIvc3JjL2dlbmVyYXRlJztcblxuaW1wb3J0IHtpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbn0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBvYmplY3QgcHJvcGVydGllcy5cbiAqXG4gKiBFeGFtcGxlOiAgKGZyb20gbG9kYXNoKVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICogcGljayhvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8g4oaSIHsgJ2EnOiAxLCAnYyc6IDMgfVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpY2sob2JqOiBhbnksIHByb3BzOiBzdHJpbmdbXSkge1xuICBsZXQgY29weSA9IHt9O1xuICBwcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgY29weVtwcm9wXSA9IG9ialtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29weTtcbn1cblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgXy5waWNrOyB0aGlzIG1ldGhvZCBjcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgb3duXG4gKiBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygb2JqZWN0IHRoYXQgYXJlIG5vdCBvbWl0dGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb21pdChvYmo6IGFueSwgcHJvcHM6IHN0cmluZ1tdKSB7XG4gIGxldCBjb3B5ID0gX2R1cGxpY2F0ZShvYmopO1xuICBwcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgZGVsZXRlIGNvcHlbcHJvcF07XG4gIH0pO1xuICByZXR1cm4gY29weTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2goYTogYW55KSB7XG4gIGlmIChpc1N0cmluZyhhKSB8fCBpc051bWJlcihhKSB8fCBpc0Jvb2xlYW4oYSkpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpO1xuICB9XG4gIHJldHVybiBzdHJpbmdpZnkoYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluczxUPihhcnJheTogQXJyYXk8VD4sIGl0ZW06IFQpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSkgPiAtMTtcbn1cblxuLyoqIFJldHVybnMgdGhlIGFycmF5IHdpdGhvdXQgdGhlIGVsZW1lbnRzIGluIGl0ZW0gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRob3V0PFQ+KGFycmF5OiBBcnJheTxUPiwgZXhjbHVkZWRJdGVtczogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuICFjb250YWlucyhleGNsdWRlZEl0ZW1zLCBpdGVtKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxUPihhcnJheTogQXJyYXk8VD4sIG90aGVyOiBBcnJheTxUPikge1xuICByZXR1cm4gYXJyYXkuY29uY2F0KHdpdGhvdXQob3RoZXIsIGFycmF5KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgb2JqLmZvckVhY2guY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKG9iaiwgZjogKGEsIGksIGQsIGssIG8pID0+IGFueSwgaW5pdCwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5yZWR1Y2UpIHtcbiAgICByZXR1cm4gb2JqLnJlZHVjZS5jYWxsKHRoaXNBcmcsIGYsIGluaXQpO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGluaXQgPSBmLmNhbGwodGhpc0FyZywgaW5pdCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5pdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwKG9iaiwgZjogKGEsIGQsIGssIG8pID0+IGFueSwgdGhpc0FyZz8pIHtcbiAgaWYgKG9iai5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcC5jYWxsKHRoaXNBcmcsIGYpO1xuICB9IGVsc2Uge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBvdXRwdXQucHVzaChmLmNhbGwodGhpc0FyZywgb2JqW2tdLCBrLCBvYmopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc29tZTxUPihhcnI6IEFycmF5PFQ+LCBmOiAoZDogVCwgaz8sIGk/KSA9PiBib29sZWFuKSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChsZXQgayA9IDA7IGs8YXJyLmxlbmd0aDsgaysrKSB7XG4gICAgaWYgKGYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlcnk8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmICghZihhcnJba10sIGssIGkrKykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycmF5czogYW55W10pIHtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcChkZXN0LCAuLi5zcmM6IGFueVtdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVzdCA9IGRlZXBNZXJnZV8oZGVzdCwgc3JjW2ldKTtcbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG5cbi8vIHJlY3Vyc2l2ZWx5IG1lcmdlcyBzcmMgaW50byBkZXN0XG5mdW5jdGlvbiBkZWVwTWVyZ2VfKGRlc3QsIHNyYykge1xuICBpZiAodHlwZW9mIHNyYyAhPT0gJ29iamVjdCcgfHwgc3JjID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmb3IgKGxldCBwIGluIHNyYykge1xuICAgIGlmICghc3JjLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHNyY1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzcmNbcF0gIT09ICdvYmplY3QnIHx8IHNyY1twXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IHNyY1twXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0W3BdICE9PSAnb2JqZWN0JyB8fCBkZXN0W3BdID09PSBudWxsKSB7XG4gICAgICBkZXN0W3BdID0gbWVyZ2VEZWVwKHNyY1twXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBbXSA6IHt9LCBzcmNbcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZURlZXAoZGVzdFtwXSwgc3JjW3BdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59XG5cbi8vIEZJWE1FIHJlbW92ZSB0aGlzXG5pbXBvcnQgKiBhcyBkbEJpbiBmcm9tICdkYXRhbGliL3NyYy9iaW5zL2JpbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldGJpbnMoc3RhdHMsIG1heGJpbnMpIHtcbiAgcmV0dXJuIGRsQmluKHtcbiAgICBtaW46IHN0YXRzLm1pbixcbiAgICBtYXg6IHN0YXRzLm1heCxcbiAgICBtYXhiaW5zOiBtYXhiaW5zXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlPFQ+KHZhbHVlczogVFtdLCBmPzogKGl0ZW06IFQpID0+IHN0cmluZykge1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGkgPSAwLCBuID0gdmFsdWVzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB1W3ZdID0gMTtcbiAgICByZXN1bHRzLnB1c2godmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLndhcm4oJ1tWTCBXYXJuaW5nXScsIG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogYW55KSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1tWTCBFcnJvcl0nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaWN0PFQ+IHtcbiAgW2tleTogc3RyaW5nXTogVDtcbn1cblxuZXhwb3J0IHR5cGUgU3RyaW5nU2V0ID0gRGljdDxib29sZWFuPjtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBkaWNpdG9uYXJpZXMgZGlzYWdyZWUuIEFwcGxpZXMgb25seSB0byBkZWZpb25lZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXI8VD4oZGljdDogRGljdDxUPiwgb3RoZXI6IERpY3Q8VD4pIHtcbiAgZm9yIChsZXQga2V5IGluIGRpY3QpIHtcbiAgICBpZiAoZGljdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBpZiAob3RoZXJba2V5XSAmJiBkaWN0W2tleV0gJiYgb3RoZXJba2V5XSAhPT0gZGljdFtrZXldKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQge0V4dGVuZGVkVW5pdFNwZWN9IGZyb20gJy4vc3BlYyc7XG5cbi8vIFRPRE86IG1vdmUgdG8gdmwuc3BlYy52YWxpZGF0b3I/XG5cbmltcG9ydCB7dG9NYXB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0JBUn0gZnJvbSAnLi9tYXJrJztcblxuaW50ZXJmYWNlIFJlcXVpcmVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIEVuY29kaW5nIENoYW5uZWxzIGZvciBlYWNoIG1hcmsgdHlwZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IHtcbiAgdGV4dDogWyd0ZXh0J10sXG4gIGxpbmU6IFsneCcsICd5J10sXG4gIGFyZWE6IFsneCcsICd5J11cbn07XG5cbmludGVyZmFjZSBTdXBwb3J0ZWRDaGFubmVsTWFwIHtcbiAgW21hcms6IHN0cmluZ106IHtcbiAgICBbY2hhbm5lbDogc3RyaW5nXTogbnVtYmVyXG4gIH07XG59XG5cbi8qKlxuICogU3VwcG9ydGVkIEVuY29kaW5nIENoYW5uZWwgZm9yIGVhY2ggbWFyayB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEU6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSB7XG4gIGJhcjogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdzaXplJywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgbGluZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksIC8vIFRPRE86IGFkZCBzaXplIHdoZW4gVmVnYSBzdXBwb3J0c1xuICBhcmVhOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ2RldGFpbCddKSxcbiAgdGljazogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGNpcmNsZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgc3F1YXJlOiB0b01hcChbJ3JvdycsICdjb2x1bW4nLCAneCcsICd5JywgJ2NvbG9yJywgJ3NpemUnLCAnZGV0YWlsJ10pLFxuICBwb2ludDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCcsICdzaGFwZSddKSxcbiAgdGV4dDogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3NpemUnLCAnY29sb3InLCAndGV4dCddKSAvLyBUT0RPKCM3MjQpIHJldmlzZVxufTtcblxuLy8gVE9ETzogY29uc2lkZXIgaWYgd2Ugc2hvdWxkIGFkZCB2YWxpZGF0ZSBtZXRob2QgYW5kXG4vLyByZXF1aXJlcyBaU2NoZW1hIGluIHRoZSBtYWluIHZlZ2EtbGl0ZSByZXBvXG5cbi8qKlxuICogRnVydGhlciBjaGVjayBpZiBlbmNvZGluZyBtYXBwaW5nIG9mIGEgc3BlYyBpcyBpbnZhbGlkIGFuZFxuICogcmV0dXJuIGVycm9yIGlmIGl0IGlzIGludmFsaWQuXG4gKlxuICogVGhpcyBjaGVja3MgaWZcbiAqICgxKSBhbGwgdGhlIHJlcXVpcmVkIGVuY29kaW5nIGNoYW5uZWxzIGZvciB0aGUgbWFyayB0eXBlIGFyZSBzcGVjaWZpZWRcbiAqICgyKSBhbGwgdGhlIHNwZWNpZmllZCBlbmNvZGluZyBjaGFubmVscyBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBtYXJrIHR5cGVcbiAqIEBwYXJhbSAge1t0eXBlXX0gc3BlYyBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtSZXF1aXJlZENoYW5uZWxNYXAgID0gRGVmYXVsdFJlcXVpcmVkQ2hhbm5lbE1hcH0gIHJlcXVpcmVkQ2hhbm5lbE1hcFxuICogQHBhcmFtICB7U3VwcG9ydGVkQ2hhbm5lbE1hcCA9IERlZmF1bHRTdXBwb3J0ZWRDaGFubmVsTWFwfSBzdXBwb3J0ZWRDaGFubmVsTWFwXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybiBvbmUgcmVhc29uIHdoeSB0aGUgZW5jb2RpbmcgaXMgaW52YWxpZCxcbiAqICAgICAgICAgICAgICAgICAgb3IgbnVsbCBpZiB0aGUgZW5jb2RpbmcgaXMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmNvZGluZ01hcHBpbmdFcnJvcihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjLFxuICByZXF1aXJlZENoYW5uZWxNYXA6IFJlcXVpcmVkQ2hhbm5lbE1hcCA9IERFRkFVTFRfUkVRVUlSRURfQ0hBTk5FTF9NQVAsXG4gIHN1cHBvcnRlZENoYW5uZWxNYXA6IFN1cHBvcnRlZENoYW5uZWxNYXAgPSBERUZBVUxUX1NVUFBPUlRFRF9DSEFOTkVMX1RZUEVcbiAgKSB7XG4gIGxldCBtYXJrID0gc3BlYy5tYXJrO1xuICBsZXQgZW5jb2RpbmcgPSBzcGVjLmVuY29kaW5nO1xuICBsZXQgcmVxdWlyZWRDaGFubmVscyA9IHJlcXVpcmVkQ2hhbm5lbE1hcFttYXJrXTtcbiAgbGV0IHN1cHBvcnRlZENoYW5uZWxzID0gc3VwcG9ydGVkQ2hhbm5lbE1hcFttYXJrXTtcblxuICBmb3IgKGxldCBpIGluIHJlcXVpcmVkQ2hhbm5lbHMpIHsgLy8gYWxsIHJlcXVpcmVkIGNoYW5uZWxzIGFyZSBpbiBlbmNvZGluZ2BcbiAgICBpZiAoIShyZXF1aXJlZENoYW5uZWxzW2ldIGluIGVuY29kaW5nKSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIGVuY29kaW5nIGNoYW5uZWwgXFxcIicgKyByZXF1aXJlZENoYW5uZWxzW2ldICtcbiAgICAgICAgJ1xcXCIgZm9yIG1hcmsgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGNoYW5uZWwgaW4gZW5jb2RpbmcpIHsgLy8gYWxsIGNoYW5uZWxzIGluIGVuY29kaW5nIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAoIXN1cHBvcnRlZENoYW5uZWxzW2NoYW5uZWxdKSB7XG4gICAgICByZXR1cm4gJ0VuY29kaW5nIGNoYW5uZWwgXFxcIicgKyBjaGFubmVsICtcbiAgICAgICAgJ1xcXCIgaXMgbm90IHN1cHBvcnRlZCBieSBtYXJrIHR5cGUgXFxcIicgKyBtYXJrICsgJ1xcXCInO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXJrID09PSBCQVIgJiYgIWVuY29kaW5nLnggJiYgIWVuY29kaW5nLnkpIHtcbiAgICByZXR1cm4gJ01pc3NpbmcgYm90aCB4IGFuZCB5IGZvciBiYXInO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1NjYWxlVHlwZSwgTmljZVRpbWV9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZnRGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgc291cmNlPzogc3RyaW5nO1xuICB2YWx1ZXM/OiBhbnk7XG4gIGZvcm1hdD86IGFueTtcbiAgdXJsPzogYW55O1xuICB0cmFuc2Zvcm0/OiBhbnk7XG59XG5cbnR5cGUgVmdQYXJlbnRSZWYgPSB7XG4gIHBhcmVudDogc3RyaW5nXG59O1xuXG50eXBlIFZnRmllbGRSZWYgPSBzdHJpbmcgfCBWZ1BhcmVudFJlZiB8IFZnUGFyZW50UmVmW107XG5cbmV4cG9ydCB0eXBlIFZnRGF0YVJlZiA9IHtcbiAgZGF0YTogc3RyaW5nLFxuICBmaWVsZDogVmdGaWVsZFJlZixcbiAgc29ydDogYm9vbGVhbiB8IHtcbiAgICBmaWVsZDogVmdGaWVsZFJlZixcbiAgICBvcDogc3RyaW5nXG4gIH1cbn07XG5cbmV4cG9ydCB0eXBlIFZnVmFsdWVSZWYgPSB7XG4gIHZhbHVlPzogYW55LFxuICBmaWVsZD86IHN0cmluZyB8IHtcbiAgICBkYXR1bT86IHN0cmluZyxcbiAgICBncm91cD86IHN0cmluZyxcbiAgICBwYXJlbnQ/OiBzdHJpbmdcbiAgfSxcbiAgdGVtcGxhdGU/OiBzdHJpbmcsXG4gIHNjYWxlPzogc3RyaW5nLCAvLyBUT0RPOiBvYmplY3RcbiAgbXVsdD86IG51bWJlcixcbiAgb2Zmc2V0PzogbnVtYmVyLFxuICBiYW5kPzogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBVbmlvbmVkRG9tYWluID0ge1xuICBmaWVsZHM6IFZnRGF0YVJlZltdXG59O1xuXG5leHBvcnQgdHlwZSBWZ1NjYWxlID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIHR5cGU6IFNjYWxlVHlwZSxcbiAgZG9tYWluPzogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmLFxuICBkb21haW5NaW4/OiBhbnksXG4gIGRvbWFpbk1heD86IGFueVxuICByYW5nZT86IGFueVtdIHwgVmdEYXRhUmVmIHwgc3RyaW5nLFxuICByYW5nZU1pbj86IGFueSxcbiAgcmFuZ2VNYXg/OiBhbnksXG5cbiAgYmFuZFNpemU/OiBudW1iZXIsXG4gIGNsYW1wPzogYm9vbGVhbixcbiAgZXhwb25lbnQ/OiBudW1iZXIsXG4gIG5pY2U/OiBib29sZWFuIHwgTmljZVRpbWUsXG4gIHBhZGRpbmc/OiBudW1iZXIsXG4gIHBvaW50cz86IGJvb2xlYW4sXG4gIHJldmVyc2U/OiBib29sZWFuLFxuICByb3VuZD86IGJvb2xlYW4sXG4gIHplcm8/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VuaW9uZWREb21haW4oZG9tYWluOiBhbnlbXSB8IFVuaW9uZWREb21haW4gfCBWZ0RhdGFSZWYpOiBkb21haW4gaXMgVW5pb25lZERvbWFpbiB7XG4gIGlmICghaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuICdmaWVsZHMnIGluIGRvbWFpbjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFSZWZEb21haW4oZG9tYWluOiBhbnlbXSB8IFVuaW9uZWREb21haW4gfCBWZ0RhdGFSZWYpOiBkb21haW4gaXMgVmdEYXRhUmVmIHtcbiAgaWYgKCFpc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gJ2RhdGEnIGluIGRvbWFpbjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFRPRE86IGRlY2xhcmVcbmV4cG9ydCB0eXBlIFZnTWFya0dyb3VwID0gYW55O1xuZXhwb3J0IHR5cGUgVmdBeGlzID0gYW55O1xuZXhwb3J0IHR5cGUgVmdMZWdlbmQgPSBhbnk7XG5leHBvcnQgdHlwZSBWZ1RyYW5zZm9ybSA9IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBWZ1N0YWNrVHJhbnNmb3JtIHtcbiAgdHlwZTogc3RyaW5nO1xuICBvZmZzZXQ/OiBhbnk7XG4gIGdyb3VwYnk6IGFueTtcbiAgZmllbGQ6IGFueTtcbiAgc29ydGJ5OiBhbnk7XG4gIG91dHB1dDogYW55O1xufVxuIiwiZXhwb3J0IGltcG9ydCBheGlzID0gcmVxdWlyZSgnLi9heGlzJyk7XG5leHBvcnQgaW1wb3J0IGFnZ3JlZ2F0ZSA9IHJlcXVpcmUoJy4vYWdncmVnYXRlJyk7XG5leHBvcnQgaW1wb3J0IGJpbiA9IHJlcXVpcmUoJy4vYmluJyk7XG5leHBvcnQgaW1wb3J0IGNoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWwnKTtcbmV4cG9ydCBjb25zdCBjb21waWxlID0gcmVxdWlyZSgnLi9jb21waWxlL2NvbXBpbGUnKS5jb21waWxlO1xuZXhwb3J0IGltcG9ydCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuZXhwb3J0IGltcG9ydCBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJyk7XG5leHBvcnQgaW1wb3J0IGRhdGV0aW1lID0gcmVxdWlyZSgnLi9kYXRldGltZScpO1xuZXhwb3J0IGltcG9ydCBlbmNvZGluZyA9IHJlcXVpcmUoJy4vZW5jb2RpbmcnKTtcbmV4cG9ydCBpbXBvcnQgZmFjZXQgPSByZXF1aXJlKCcuL2ZhY2V0Jyk7XG5leHBvcnQgaW1wb3J0IGZpZWxkRGVmID0gcmVxdWlyZSgnLi9maWVsZGRlZicpO1xuZXhwb3J0IGltcG9ydCBsZWdlbmQgPSByZXF1aXJlKCcuL2xlZ2VuZCcpO1xuZXhwb3J0IGltcG9ydCBtYXJrID0gcmVxdWlyZSgnLi9tYXJrJyk7XG5leHBvcnQgaW1wb3J0IHNjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpO1xuZXhwb3J0IGltcG9ydCBzaG9ydGhhbmQgPSByZXF1aXJlKCcuL3Nob3J0aGFuZCcpO1xuZXhwb3J0IGltcG9ydCBzb3J0ID0gcmVxdWlyZSgnLi9zb3J0Jyk7XG5leHBvcnQgaW1wb3J0IHNwZWMgPSByZXF1aXJlKCcuL3NwZWMnKTtcbmV4cG9ydCBpbXBvcnQgc3RhY2sgPSByZXF1aXJlKCcuL3N0YWNrJyk7XG5leHBvcnQgaW1wb3J0IHRpbWVVbml0ID0gcmVxdWlyZSgnLi90aW1ldW5pdCcpO1xuZXhwb3J0IGltcG9ydCB0cmFuc2Zvcm0gPSByZXF1aXJlKCcuL3RyYW5zZm9ybScpO1xuZXhwb3J0IGltcG9ydCB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG5leHBvcnQgaW1wb3J0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmV4cG9ydCBpbXBvcnQgdmFsaWRhdGUgPSByZXF1aXJlKCcuL3ZhbGlkYXRlJyk7XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJ19fVkVSU0lPTl9fJztcbiJdfQ==
