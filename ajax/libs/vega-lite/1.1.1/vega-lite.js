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
        p.orient = { value: orient };
        var stack = model.stack();
        p.x = x(model.encoding().x, model.scaleName(channel_1.X), orient, stack);
        p.y = y(model.encoding().y, model.scaleName(channel_1.Y), orient, stack);
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
        if (orient === config_1.Orient.HORIZONTAL) {
            if (stack && channel_1.X === stack.fieldChannel) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(xFieldDef, { suffix: '_end' })
                };
            }
            else if (x2FieldDef) {
                if (x2FieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(x2FieldDef)
                    };
                }
                else if (x2FieldDef.value) {
                    return {
                        scale: scaleName,
                        value: x2FieldDef.value
                    };
                }
            }
            return {
                scale: scaleName,
                value: 0
            };
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
        if (orient !== config_1.Orient.HORIZONTAL) {
            if (stack && channel_1.Y === stack.fieldChannel) {
                return {
                    scale: scaleName,
                    field: fielddef_1.field(yFieldDef, { suffix: '_end' })
                };
            }
            else if (y2FieldDef) {
                if (y2FieldDef.field) {
                    return {
                        scale: scaleName,
                        field: fielddef_1.field(y2FieldDef)
                    };
                }
                else if (y2FieldDef.value) {
                    return {
                        scale: scaleName,
                        value: y2FieldDef.value
                    };
                }
            }
            return {
                scale: scaleName,
                value: 0
            };
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
exports.version = '1.1.1';

},{"./aggregate":11,"./axis":12,"./bin":13,"./channel":14,"./compile/compile":17,"./config":47,"./data":48,"./datetime":49,"./encoding":50,"./facet":51,"./fielddef":52,"./legend":54,"./mark":55,"./scale":56,"./shorthand":57,"./sort":58,"./spec":59,"./stack":60,"./timeunit":61,"./transform":62,"./type":63,"./util":64,"./validate":65}]},{},[67])(67)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvdW5pdC50cyIsInNyYy9jb25maWcudHMiLCJzcmMvZGF0YS50cyIsInNyYy9kYXRldGltZS50cyIsInNyYy9lbmNvZGluZy50cyIsInNyYy9maWVsZGRlZi50cyIsInNyYy9maWx0ZXIudHMiLCJzcmMvbGVnZW5kLnRzIiwic3JjL21hcmsudHMiLCJzcmMvc2NhbGUudHMiLCJzcmMvc2hvcnRoYW5kLnRzIiwic3JjL3NvcnQudHMiLCJzcmMvc3BlYy50cyIsInNyYy9zdGFjay50cyIsInNyYy90aW1ldW5pdC50cyIsInNyYy90eXBlLnRzIiwic3JjL3V0aWwudHMiLCJzcmMvdmFsaWRhdGUudHMiLCJzcmMvdmVnYS5zY2hlbWEudHMiLCJzcmMvdmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQSxXQUFZLFdBQVc7SUFDbkIsb0NBQVMsUUFBZSxZQUFBLENBQUE7SUFDeEIsbUNBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsbUNBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIscUNBQVUsU0FBZ0IsYUFBQSxDQUFBO0lBQzFCLHNDQUFXLFVBQWlCLGNBQUEsQ0FBQTtJQUM1QixpQ0FBTSxLQUFZLFNBQUEsQ0FBQTtJQUNsQixrQ0FBTyxNQUFhLFVBQUEsQ0FBQTtJQUNwQixxQ0FBVSxTQUFnQixhQUFBLENBQUE7SUFDMUIsc0NBQVcsVUFBaUIsY0FBQSxDQUFBO0lBQzVCLHVDQUFZLFdBQWtCLGVBQUEsQ0FBQTtJQUM5QixtQ0FBUSxPQUFjLFdBQUEsQ0FBQTtJQUN0QixvQ0FBUyxRQUFlLFlBQUEsQ0FBQTtJQUN4QixvQ0FBUyxRQUFlLFlBQUEsQ0FBQTtJQUN4QixnQ0FBSyxJQUFXLFFBQUEsQ0FBQTtJQUNoQixnQ0FBSyxJQUFXLFFBQUEsQ0FBQTtJQUNoQixzQ0FBVyxVQUFpQixjQUFBLENBQUE7SUFDNUIsaUNBQU0sS0FBWSxTQUFBLENBQUE7SUFDbEIsaUNBQU0sS0FBWSxTQUFBLENBQUE7SUFDbEIsb0NBQVMsUUFBZSxZQUFBLENBQUE7SUFDeEIsb0NBQVMsUUFBZSxZQUFBLENBQUE7QUFDNUIsQ0FBQyxFQXJCVyxtQkFBVyxLQUFYLG1CQUFXLFFBcUJ0QjtBQXJCRCxJQUFZLFdBQVcsR0FBWCxtQkFxQlgsQ0FBQTtBQUVZLHFCQUFhLEdBQUc7SUFDekIsV0FBVyxDQUFDLE1BQU07SUFDbEIsV0FBVyxDQUFDLEtBQUs7SUFDakIsV0FBVyxDQUFDLEtBQUs7SUFDakIsV0FBVyxDQUFDLE9BQU87SUFDbkIsV0FBVyxDQUFDLFFBQVE7SUFDcEIsV0FBVyxDQUFDLEdBQUc7SUFDZixXQUFXLENBQUMsSUFBSTtJQUNoQixXQUFXLENBQUMsT0FBTztJQUNuQixXQUFXLENBQUMsUUFBUTtJQUNwQixXQUFXLENBQUMsU0FBUztJQUNyQixXQUFXLENBQUMsS0FBSztJQUNqQixXQUFXLENBQUMsTUFBTTtJQUNsQixXQUFXLENBQUMsTUFBTTtJQUNsQixXQUFXLENBQUMsRUFBRTtJQUNkLFdBQVcsQ0FBQyxFQUFFO0lBQ2QsV0FBVyxDQUFDLFFBQVE7SUFDcEIsV0FBVyxDQUFDLEdBQUc7SUFDZixXQUFXLENBQUMsR0FBRztJQUNmLFdBQVcsQ0FBQyxNQUFNO0lBQ2xCLFdBQVcsQ0FBQyxNQUFNO0NBQ3JCLENBQUM7QUFHVyxlQUFPLEdBQUc7SUFDbkIsV0FBVyxDQUFDLEtBQUs7SUFDakIsV0FBVyxDQUFDLEdBQUc7SUFDZixXQUFXLENBQUMsUUFBUTtDQUN2QixDQUFDO0FBRVcseUJBQWlCLEdBQUc7SUFDN0IsV0FBVyxDQUFDLElBQUk7SUFDaEIsV0FBVyxDQUFDLE9BQU87SUFDbkIsV0FBVyxDQUFDLEtBQUs7SUFDakIsV0FBVyxDQUFDLE1BQU07SUFDbEIsV0FBVyxDQUFDLE1BQU07SUFDbEIsV0FBVyxDQUFDLEVBQUU7SUFDZCxXQUFXLENBQUMsRUFBRTtJQUNkLFdBQVcsQ0FBQyxHQUFHO0lBQ2YsV0FBVyxDQUFDLEdBQUc7Q0FDbEIsQ0FBQzs7OztBQy9ERixXQUFZLFVBQVU7SUFDbEIsK0JBQU0sS0FBWSxTQUFBLENBQUE7SUFDbEIsaUNBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsZ0NBQU8sTUFBYSxVQUFBLENBQUE7SUFDcEIsa0NBQVMsUUFBZSxZQUFBLENBQUE7QUFDNUIsQ0FBQyxFQUxXLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUFMRCxJQUFZLFVBQVUsR0FBVixrQkFLWCxDQUFBO0FBc0xZLHlCQUFpQixHQUFlO0lBQzNDLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLElBQUksRUFBRSxTQUFTO0lBQ2YsTUFBTSxFQUFFLElBQUk7SUFDWixjQUFjLEVBQUUsRUFBRTtJQUNsQixRQUFRLEVBQUUsU0FBUztJQUNuQixjQUFjLEVBQUUsQ0FBQztDQUNsQixDQUFDO0FBRVcsOEJBQXNCLEdBQWU7SUFDaEQsU0FBUyxFQUFFLENBQUM7SUFDWixNQUFNLEVBQUUsSUFBSTtJQUNaLElBQUksRUFBRSxLQUFLO0lBQ1gsUUFBUSxFQUFFLENBQUM7Q0FDWixDQUFDOzs7O0FDMU1GLHdCQUFnRCxXQUFXLENBQUMsQ0FBQTtBQXlDNUQscUJBQTRCLE9BQWdCO0lBQzFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEIsS0FBSyxhQUFHLENBQUM7UUFDVCxLQUFLLGdCQUFNLENBQUM7UUFDWixLQUFLLGNBQUksQ0FBQztRQUdWLEtBQUssZUFBSztZQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWDtZQUNFLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQVplLG1CQUFXLGNBWTFCLENBQUE7Ozs7QUMvQ0QscUJBQWdDLFFBQVEsQ0FBQyxDQUFBO0FBRXpDLFdBQVksT0FBTztJQUNqQix1QkFBSSxHQUFVLE9BQUEsQ0FBQTtJQUNkLHVCQUFJLEdBQVUsT0FBQSxDQUFBO0lBQ2Qsd0JBQUssSUFBVyxRQUFBLENBQUE7SUFDaEIsd0JBQUssSUFBVyxRQUFBLENBQUE7SUFDaEIseUJBQU0sS0FBWSxTQUFBLENBQUE7SUFDbEIsNEJBQVMsUUFBZSxZQUFBLENBQUE7SUFDeEIsMkJBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsMEJBQU8sTUFBYSxVQUFBLENBQUE7SUFDcEIsMkJBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsMEJBQU8sTUFBYSxVQUFBLENBQUE7SUFDcEIsNEJBQVMsUUFBZSxZQUFBLENBQUE7SUFDeEIsMkJBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsMEJBQU8sTUFBYSxVQUFBLENBQUE7SUFDcEIsMkJBQVEsT0FBYyxXQUFBLENBQUE7SUFDdEIsNkJBQVUsU0FBZ0IsYUFBQSxDQUFBO0FBQzVCLENBQUMsRUFoQlcsZUFBTyxLQUFQLGVBQU8sUUFnQmxCO0FBaEJELElBQVksT0FBTyxHQUFQLGVBZ0JYLENBQUE7QUFFWSxTQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNkLFNBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2QsVUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDaEIsVUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDaEIsV0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEIsY0FBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDeEIsYUFBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdEIsWUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDcEIsYUFBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdEIsWUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDcEIsY0FBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDeEIsYUFBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdEIsWUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDcEIsYUFBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdEIsZUFBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFFMUIsZ0JBQVEsR0FBRyxDQUFDLFNBQUMsRUFBRSxTQUFDLEVBQUUsVUFBRSxFQUFFLFVBQUUsRUFBRSxXQUFHLEVBQUUsY0FBTSxFQUFFLFlBQUksRUFBRSxhQUFLLEVBQUUsYUFBSyxFQUFFLFlBQUksRUFBRSxhQUFLLEVBQUUsZUFBTyxFQUFFLFlBQUksRUFBRSxjQUFNLEVBQUUsYUFBSyxDQUFDLENBQUM7QUFFdEcscUJBQWEsR0FBRyxjQUFPLENBQUMsZ0JBQVEsRUFBRSxDQUFDLFdBQUcsRUFBRSxjQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pELDJCQUFtQixHQUFHLGNBQU8sQ0FBQyxxQkFBYSxFQUFFLENBQUMsWUFBSSxFQUFFLGFBQUssRUFBRSxjQUFNLEVBQUUsWUFBSSxFQUFFLGFBQUssRUFBRSxVQUFFLEVBQUUsVUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RiwyQkFBbUIsR0FBRyxjQUFPLENBQUMscUJBQWEsRUFBRSxDQUFDLFNBQUMsRUFBRSxTQUFDLEVBQUUsVUFBRSxFQUFFLFVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QsaUNBQXlCLEdBQUcsY0FBTyxDQUFDLDJCQUFtQixFQUFFLENBQUMsU0FBQyxFQUFFLFNBQUMsRUFBRSxVQUFFLEVBQUUsVUFBRSxDQUFDLENBQUMsQ0FBQztBQUd6RSw0QkFBb0IsR0FBRyxDQUFDLGFBQUssRUFBRSxjQUFNLEVBQUUsYUFBSyxFQUFFLGVBQU8sRUFBRSxZQUFJLENBQUMsQ0FBQztBQVl6RSxDQUFDO0FBUUYscUJBQTRCLE9BQWdCLEVBQUUsSUFBVTtJQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGZSxtQkFBVyxjQUUxQixDQUFBO0FBT0QsMEJBQWlDLE9BQWdCO0lBQy9DLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEIsS0FBSyxTQUFDLENBQUM7UUFDUCxLQUFLLFNBQUMsQ0FBQztRQUNQLEtBQUssYUFBSyxDQUFDO1FBQ1gsS0FBSyxjQUFNLENBQUM7UUFDWixLQUFLLGFBQUssQ0FBQztRQUNYLEtBQUssZUFBTyxDQUFDO1FBQ2IsS0FBSyxXQUFHLENBQUM7UUFDVCxLQUFLLGNBQU07WUFDVCxNQUFNLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtnQkFDL0QsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7YUFDOUMsQ0FBQztRQUNKLEtBQUssVUFBRSxDQUFDO1FBQ1IsS0FBSyxVQUFFO1lBQ0wsTUFBTSxDQUFDO2dCQUNMLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTthQUNsQyxDQUFDO1FBQ0osS0FBSyxZQUFJO1lBQ1AsTUFBTSxDQUFDO2dCQUNMLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7Z0JBQy9ELEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7YUFDdEIsQ0FBQztRQUNKLEtBQUssYUFBSztZQUNSLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztRQUN2QixLQUFLLFlBQUk7WUFDUCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDdEIsS0FBSyxZQUFJO1lBQ1AsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQztBQWhDZSx3QkFBZ0IsbUJBZ0MvQixDQUFBO0FBS0EsQ0FBQztBQU9GLDBCQUFpQyxPQUFnQjtJQUMvQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssU0FBQyxDQUFDO1FBQ1AsS0FBSyxTQUFDLENBQUM7UUFDUCxLQUFLLGFBQUssQ0FBQztRQUNYLEtBQUssZUFBTyxDQUFDO1FBQ2IsS0FBSyxhQUFLLENBQUM7UUFDWCxLQUFLLGNBQU07WUFDVCxNQUFNLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQztRQUNKLEtBQUssV0FBRyxDQUFDO1FBQ1QsS0FBSyxjQUFNLENBQUM7UUFDWixLQUFLLGFBQUs7WUFDUixNQUFNLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQztRQUNKLEtBQUssVUFBRSxDQUFDO1FBQ1IsS0FBSyxVQUFFLENBQUM7UUFDUixLQUFLLFlBQUksQ0FBQztRQUNWLEtBQUssWUFBSTtZQUNQLE1BQU0sQ0FBQztnQkFDTCxPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDO1FBQ0osS0FBSyxZQUFJO1lBQ1AsTUFBTSxDQUFDO2dCQUNMLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUM7SUFDTixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBbENlLHdCQUFnQixtQkFrQy9CLENBQUE7QUFFRCxrQkFBeUIsT0FBZ0I7SUFDdkMsTUFBTSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsY0FBTSxFQUFFLFlBQUksRUFBRSxZQUFJLEVBQUUsYUFBSyxFQUFFLGFBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFGZSxnQkFBUSxXQUV2QixDQUFBOzs7O0FDaktELHFCQUF5QixTQUFTLENBQUMsQ0FBQTtBQUNuQyx3QkFBeUMsWUFBWSxDQUFDLENBQUE7QUFDdEQseUJBQWtELGFBQWEsQ0FBQyxDQUFBO0FBQ2hFLHFCQUF5QyxTQUFTLENBQUMsQ0FBQTtBQUNuRCxxQkFBcUQsU0FBUyxDQUFDLENBQUE7QUFHL0QsdUJBQXlDLFVBQVUsQ0FBQyxDQUFBO0FBT3BELDRCQUFtQyxLQUFZLEVBQUUsWUFBdUI7SUFDdEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBUyxJQUFJLEVBQUUsT0FBTztRQUMvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUMsRUFBRSxFQUFrQixDQUFDLENBQUM7QUFDekIsQ0FBQztBQVBlLDBCQUFrQixxQkFPakMsQ0FBQTtBQUtELHdCQUErQixPQUFnQixFQUFFLEtBQVk7SUFDM0QsSUFBTSxLQUFLLEdBQUcsT0FBTyxLQUFLLGdCQUFNLEVBQzlCLEtBQUssR0FBRyxPQUFPLEtBQUssYUFBRyxFQUN2QixJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFFLE9BQU8sQ0FBQztJQUs1QyxJQUFJLEdBQUcsR0FBUTtRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLENBQUM7UUFDWCxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQzthQUNsQjtZQUNELElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsYUFBYSxFQUFDO2FBQy9CO1NBQ0Y7S0FDRixDQUFDO0lBRUYsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVqQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDakUsSUFBSSxNQUFzRCxDQUFDO1FBRTNELElBQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBSW5ELENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztRQUM3QixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO1lBQzFELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksV0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFDdEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFwRGUsc0JBQWMsaUJBb0Q3QixDQUFBO0FBRUQsbUJBQTBCLE9BQWdCLEVBQUUsS0FBWTtJQUN0RCxJQUFNLEtBQUssR0FBRyxPQUFPLEtBQUssZ0JBQU0sRUFDOUIsS0FBSyxHQUFHLE9BQU8sS0FBSyxhQUFHLEVBQ3ZCLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUUsT0FBTyxDQUFDO0lBRTVDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFHakMsSUFBSSxHQUFHLEdBQVE7UUFDYixJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztLQUNoQyxDQUFDO0lBR0Y7UUFFRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxhQUFhO1FBRXpHLGFBQWEsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsV0FBVztLQUNuRixDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDekIsSUFBSSxNQUFzRCxDQUFDO1FBRTNELElBQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBR0gsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBRW5EO1FBQ0UsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVk7S0FDckQsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO1FBQ3RCLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDN0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDMUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2YsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztZQUN0QyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWhEZSxpQkFBUyxZQWdEeEIsQ0FBQTtBQUVELGdCQUF1QixLQUFZLEVBQUUsT0FBZ0I7SUFDbkQsTUFBTSxDQUFDLHFCQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRmUsY0FBTSxTQUVyQixDQUFBO0FBRUQsZ0JBQXVCLEtBQVksRUFBRSxPQUFnQjtJQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQztBQUZlLGNBQU0sU0FFckIsQ0FBQTtBQU9ELGtCQUF5QixLQUFZLEVBQUUsT0FBZ0I7SUFDckQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDeEUsQ0FBQztBQVBlLGdCQUFRLFdBT3ZCLENBQUE7QUFFRCxjQUFxQixLQUFZLEVBQUUsT0FBZ0I7SUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGFBQUcsSUFBSSxPQUFPLEtBQUssZ0JBQU0sQ0FBQyxDQUFDLENBQUM7UUFFMUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FHakMsQ0FBQyxPQUFPLEtBQUssV0FBQyxJQUFJLE9BQU8sS0FBSyxXQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUNsRixDQUFDO0FBQ0osQ0FBQztBQVhlLFlBQUksT0FXbkIsQ0FBQTtBQUVELGVBQXNCLEtBQVksRUFBRSxPQUFnQixFQUFFLEdBQUc7SUFDdkQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDeEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUViLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZlLGFBQUssUUFVcEIsQ0FBQTtBQUFBLENBQUM7QUFFRixnQkFBdUIsS0FBWSxFQUFFLE9BQWdCO0lBQ25ELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGdCQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sQ0FBQyxpQkFBVSxDQUFDLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBVGUsY0FBTSxTQVNyQixDQUFBO0FBRUQsZUFBc0IsS0FBWSxFQUFFLE9BQWdCO0lBQ2xELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQWJlLGFBQUssUUFhcEIsQ0FBQTtBQUVELGtCQUF5QixLQUFZLEVBQUUsT0FBZ0I7SUFDckQsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDOUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBTmUsZ0JBQVEsV0FNdkIsQ0FBQTtBQUVELHFCQUE0QixLQUFZLEVBQUUsT0FBZ0I7SUFDeEQsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDcEQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBTmUsbUJBQVcsY0FNMUIsQ0FBQTtBQUdELGVBQXNCLEtBQVksRUFBRSxPQUFnQjtJQUNsRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0QsSUFBTSxVQUFVLEdBQUcsZ0JBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRTFFLElBQUksU0FBUyxDQUFDO0lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDbEMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssV0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBTSxTQUFTLEdBQWMsS0FBWSxDQUFDO1FBRTFDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUMzRSxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxXQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFNLFNBQVMsR0FBYyxLQUFZLENBQUM7UUFFMUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQzVFLENBQUM7SUFHRCxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQVEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ2xFLENBQUM7QUF4QmUsYUFBSyxRQXdCcEIsQ0FBQTtBQUVELHFCQUE0QixLQUFZLEVBQUUsT0FBZ0I7SUFDeEQsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDcEQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBTmUsbUJBQVcsY0FNMUIsQ0FBQTtBQUVELElBQWlCLFVBQVUsQ0FxSTFCO0FBcklELFdBQWlCLFVBQVUsRUFBQyxDQUFDO0lBQzNCLGNBQXFCLEtBQVksRUFBRSxPQUFnQixFQUFFLGFBQWE7UUFDaEUsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsYUFBTSxDQUNYLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUztZQUMxQixFQUFFLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUU7WUFDbkMsRUFBRSxFQUNKLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUztZQUMxQixFQUFFLFdBQVcsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUU7WUFDeEMsRUFBRSxFQUNKLGFBQWEsSUFBSSxFQUFFLENBQ3BCLENBQUM7SUFDSixDQUFDO0lBWmUsZUFBSSxPQVluQixDQUFBO0lBRUQsY0FBcUIsS0FBWSxFQUFFLE9BQWdCLEVBQUUsYUFBYTtRQUNoRSxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxhQUFNLENBQ1gsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxFQUFDLEdBQUcsRUFBRSxFQUN0RSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsR0FBRyxFQUFDLGFBQWEsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsR0FBRyxFQUFFLEVBQ2pGLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxHQUFHLEVBQUMsV0FBVyxFQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsRUFBRSxHQUFHLEVBQUUsRUFDNUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEdBQUcsRUFBQyxnQkFBZ0IsRUFBRyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLEVBQUUsR0FBRyxFQUFFLEVBQy9FLGFBQWEsSUFBSSxFQUFFLENBQ3BCLENBQUM7SUFDSixDQUFDO0lBVmUsZUFBSSxPQVVuQixDQUFBO0lBRUQsZ0JBQXVCLEtBQVksRUFBRSxPQUFnQixFQUFFLFVBQVUsRUFBRSxHQUFHO1FBQ3BFLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsYUFBTSxDQUFDO2dCQUNaLElBQUksRUFBRSxFQUFFO2FBQ1QsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsY0FBTyxFQUFFLGNBQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUV2RSxVQUFVLEdBQUcsYUFBTSxDQUFDO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLDJCQUEyQixHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSztpQkFDcEU7YUFDRixFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssZUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0QyxVQUFVLEdBQUcsYUFBTSxDQUFDO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLHFCQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztpQkFDbkc7YUFDRixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQUMsSUFBSSxDQUFDLHNCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxlQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBR04sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUc7d0JBQ2pCLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssR0FBRyxNQUFNOzRCQUM3QixHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsR0FBRyxPQUFPO2dDQUMxQixRQUFRO3FCQUNoQixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUM7Z0JBQ3ZDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFHckIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsR0FBRyxRQUFRLEdBQUcsUUFBUSxFQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2QyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxNQUFNLENBQUMsV0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztJQUNoRSxDQUFDO0lBbEZlLGlCQUFNLFNBa0ZyQixDQUFBO0lBRUQsZUFBc0IsS0FBWSxFQUFFLE9BQWdCLEVBQUUsY0FBYztRQUNsRSxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxhQUFNLENBQ1gsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEdBQUcsRUFBQyxNQUFNLEVBQUcsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUN2RSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsR0FBRyxFQUFDLFdBQVcsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUUsR0FBRyxFQUFFLEVBQzNFLGNBQWMsSUFBSSxFQUFFLENBQ3JCLENBQUM7SUFDSixDQUFDO0lBUmUsZ0JBQUssUUFRcEIsQ0FBQTtJQUVELGVBQXNCLEtBQVksRUFBRSxPQUFnQixFQUFFLGNBQWM7UUFDbEUsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsYUFBTSxDQUNYLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxHQUFHLEVBQUMsTUFBTSxFQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUMsRUFBRSxHQUFHLEVBQUUsRUFDekUsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEdBQUcsRUFBQyxJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxFQUFDLEdBQUcsRUFBRSxFQUNuRSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsR0FBRyxFQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLEVBQUMsR0FBRyxFQUFFLEVBQy9FLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxHQUFHLEVBQUMsVUFBVSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUMsRUFBQyxHQUFHLEVBQUUsRUFFckYsY0FBYyxJQUFJLEVBQUUsQ0FDckIsQ0FBQztJQUNKLENBQUM7SUFYZSxnQkFBSyxRQVdwQixDQUFBO0FBQ0gsQ0FBQyxFQXJJZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFxSTFCOzs7O0FDbllELHFCQUF5QyxTQUFTLENBQUMsQ0FBQTtBQUNuRCx3QkFBNkIsWUFBWSxDQUFDLENBQUE7QUFFMUMseUJBQStDLGFBQWEsQ0FBQyxDQUFBO0FBQzdELHFCQUF3QixTQUFTLENBQUMsQ0FBQTtBQUVsQyxxQkFBb0MsU0FBUyxDQUFDLENBQUE7QUFDOUMscUJBQThCLFNBQVMsQ0FBQyxDQUFBO0FBRXhDLHNCQUF5QixTQUFTLENBQUMsQ0FBQTtBQUNuQyxzQkFBeUIsU0FBUyxDQUFDLENBQUE7QUFFbkMseUJBQTJDLGFBQWEsQ0FBQyxDQUFBO0FBQ3pELHFCQUF3QixRQUFRLENBQUMsQ0FBQTtBQUNqQyxxQkFBeUQsU0FBUyxDQUFDLENBQUE7QUFHbkUsb0JBQTJCLElBQVUsRUFBRSxNQUFhLEVBQUUsZUFBdUI7SUFDM0UsRUFBRSxDQUFDLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksa0JBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxrQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxrQkFBVSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQWZlLGtCQUFVLGFBZXpCLENBQUE7QUFHWSxxQkFBYSxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWE7SUFDbkQsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVuRCxtQkFBVyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWE7SUFDL0MsU0FBUyxDQUFDLENBQUM7QUFFQSwwQkFBa0IsR0FBRyxZQUFLLENBQUMscUJBQWEsRUFBRSxtQkFBVyxDQUFDLENBQUM7QUFFcEUsOEJBQXFDLENBQUMsRUFBRSxLQUFnQjtJQUN0RCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQUssQ0FBQyxDQUFDO0lBQzVDLElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0lBSWhELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxlQUFlLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksWUFBWSxDQUFDO0lBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsR0FBRztZQUNYLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQUssQ0FBQztZQUM3QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksS0FBSyxjQUFPLEdBQUcsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xGLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsWUFBWSxHQUFHO1lBQ2IsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQU8sQ0FBQztZQUMvQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBTyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEtBQUssY0FBTyxHQUFHLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxHQUFHLEVBQUUsQ0FBQztTQUN0RixDQUFDO0lBQ0osQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFFTixDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDM0QsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLGVBQVEsQ0FBQyxDQUFDLFVBQUcsRUFBRSxZQUFLLEVBQUUsYUFBTSxFQUFFLGFBQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUMsS0FBSyxFQUFFLGFBQWEsRUFBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztJQUMzQixDQUFDO0FBQ0gsQ0FBQztBQXREZSw0QkFBb0IsdUJBc0RuQyxDQUFBO0FBRUQscUJBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBbUI7SUFDakUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDakMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFSZSxtQkFBVyxjQVExQixDQUFBO0FBRUQseUJBQWdDLGVBQWUsRUFBRSxLQUFnQixFQUFFLFNBQW1CO0lBQ3BGLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUZlLHVCQUFlLGtCQUU5QixDQUFBO0FBT0Qsc0JBQTZCLFFBQWtCLEVBQUUsTUFBYyxFQUFFLE1BQWM7SUFDN0UsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxtQkFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFHcEQsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFQZSxvQkFBWSxlQU8zQixDQUFBO0FBR0QsbUJBQTBCLGVBQWdDO0lBQ3hELE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssZ0JBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUMvRCxnQkFBSyxDQUFDLGVBQWUsRUFBRSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFIZSxpQkFBUyxZQUd4QixDQUFBO0FBS0Qsc0JBQTZCLGFBQXFCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQUUsZUFBd0IsRUFBRSxNQUFjO0lBQzlILEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFeEIsSUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUcsWUFBWSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDaEUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLG1CQUFnQixDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDcEUsQ0FBQztBQUNILENBQUM7QUFSZSxvQkFBWSxlQVEzQixDQUFBOzs7O0FDNUlELHFCQUFxQixTQUFTLENBQUMsQ0FBQTtBQUUvQixxQkFBc0MsU0FBUyxDQUFDLENBQUE7QUFDaEQscUJBQXFCLFNBQVMsQ0FBQyxDQUFBO0FBRS9CLHVCQUF5QixVQUFVLENBQUMsQ0FBQTtBQUVwQyxpQkFBd0IsU0FBdUI7SUFHN0MsSUFBTSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUdsQyxJQUFNLEtBQUssR0FBRyxtQkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFNekMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBR2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBaEJlLGVBQU8sVUFnQnRCLENBQUE7QUFFRCxrQkFBa0IsS0FBWTtJQUM1QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFHOUIsSUFBTSxNQUFNLEdBQUcsYUFBTSxDQUNuQjtRQUVFLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsTUFBTTtLQUNoQixFQUNELE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFDcEQsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUMxRDtRQUVFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUNiLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQ3RCLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBRXpCO1FBQ0QsS0FBSyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEMsQ0FBQyxDQUFDO0lBRUwsTUFBTSxDQUFDO1FBQ0wsSUFBSSxFQUFFLE1BQU07S0FFYixDQUFDO0FBQ0osQ0FBQztBQUVELDJCQUFrQyxLQUFZO0lBQzVDLElBQUksU0FBUyxHQUFPLGFBQU0sQ0FBQztRQUN2QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxFQUFFLE9BQU87S0FDZCxFQUNELEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUMsR0FBRyxFQUFFLEVBQzdEO1FBQ0UsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLGFBQU0sRUFBQztRQUNwQixVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUUsYUFBTSxDQUNaO2dCQUNFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQ3ZCLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUM7YUFDMUIsRUFDRCxLQUFLLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUN6RDtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUwsTUFBTSxDQUFDLGFBQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQXBCZSx5QkFBaUIsb0JBb0JoQyxDQUFBOzs7O0FDOUVELHdCQUF3QixZQUFZLENBQUMsQ0FBQTtBQUNyQyx1QkFBeUMsV0FBVyxDQUFDLENBQUE7QUFFckQseUJBQStCLGFBQWEsQ0FBQyxDQUFBO0FBQzdDLHlCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUN0QyxxQkFBNkUsU0FBUyxDQUFDLENBQUE7QUFDdkYscUJBQStCLFNBQVMsQ0FBQyxDQUFBO0FBS3pDLHdCQUErQixJQUFVLEVBQUUsUUFBa0IsRUFBRSxNQUFjO0lBQzFFLE1BQU0sQ0FBQyxhQUFNLENBQ1gsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxHQUFHLEVBQUUsUUFBZ0I7UUFDNUUsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssUUFBUTtnQkFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFFeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksS0FBSyxZQUFLLElBQUksSUFBSSxLQUFLLFdBQUksSUFBSSxJQUFJLEtBQUssV0FBSSxDQUFDO2dCQUNuRSxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNSLEtBQUssU0FBUztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsWUFBSyxFQUFFLFdBQUksRUFBRSxhQUFNLEVBQUUsYUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLHNCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksY0FBRyxDQUFDLFFBQVEsRUFBRSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUN0QixDQUFDO29CQUNILENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0YsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDUixLQUFLLFFBQVE7Z0JBQ1gsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsS0FBSyxDQUFDO1lBRVIsS0FBSyxPQUFPO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUN4RCxDQUFDO1FBQ0osQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ04sTUFBTSxDQUFDLElBQUksQ0FDWixDQUFDO0FBQ0wsQ0FBQztBQXJDZSxzQkFBYyxpQkFxQzdCLENBQUE7QUFFRCxnQkFBdUIsSUFBVSxFQUFFLFFBQWtCLEVBQUUsVUFBMkI7SUFBM0IsMEJBQTJCLEdBQTNCLGVBQTJCO0lBQ2hGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssYUFBTSxDQUFDO1FBQ1osS0FBSyxhQUFNLENBQUM7UUFDWixLQUFLLFdBQUk7WUFFUCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFNLFVBQVUsR0FBRyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRSxJQUFNLFVBQVUsR0FBRyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRSxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDM0MsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixLQUFLLFdBQUk7WUFFUCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO1lBRUQsTUFBTSxDQUFDLGVBQU0sQ0FBQyxVQUFVLENBQUM7UUFDM0IsS0FBSyxXQUFJO1lBQ1AsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLENBQUMsZUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLGVBQU0sQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxlQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJO1lBR1AsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLENBQUMsZUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO1FBRUgsS0FBSyxXQUFJO1lBR1AsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLGVBQU0sQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztZQUVELE1BQU0sQ0FBQyxlQUFNLENBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxlQUFNLENBQUMsUUFBUSxDQUFDO0FBQ3pCLENBQUM7QUE5RGUsY0FBTSxTQThEckIsQ0FBQTs7OztBQ2hIRCxvQkFBMEIsV0FBVyxDQUFDLENBQUE7QUFDdEMsd0JBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLHlCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9DLHFCQUFnRCxZQUFZLENBQUMsQ0FBQTtBQVM3RCxJQUFpQixHQUFHLENBOEVuQjtBQTlFRCxXQUFpQixLQUFHLEVBQUMsQ0FBQztJQUNwQixlQUFlLEtBQVk7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBUyxZQUFZLEVBQUUsUUFBa0IsRUFBRSxPQUFnQjtZQUM3RSxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksUUFBUSxHQUFHLGFBQU0sQ0FBQztvQkFDcEIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDO3dCQUMvQyxHQUFHLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQzNDLEdBQUcsRUFBRSxnQkFBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDNUM7aUJBQ0YsRUFFQyxPQUFPLEdBQUcsS0FBSyxTQUFTLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FDcEMsQ0FBQztnQkFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFeEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxpQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUVELElBQU0sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxLQUFLLGVBQUssQ0FBQztnQkFFMUUsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDYixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUM7d0JBQy9DLElBQUksRUFBRSxnQkFBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDOzRCQUMzRCxhQUFhOzRCQUNiLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7cUJBQ3BELENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELElBQU0sR0FBRyxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO2dCQUN0RSxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFFWSxlQUFTLEdBQUcsS0FBSyxDQUFDO0lBRS9CLG9CQUEyQixLQUFpQjtRQUMxQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsSUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUd4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFL0IsYUFBTSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBWmUsZ0JBQVUsYUFZekIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUMxQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDN0IsSUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUdoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGFBQU0sQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQWRlLGdCQUFVLGFBY3pCLENBQUE7SUFFRCxrQkFBeUIsU0FBd0I7UUFDL0MsTUFBTSxDQUFDLGNBQU8sQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUZlLGNBQVEsV0FFdkIsQ0FBQTtBQUNILENBQUMsRUE5RWdCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQThFbkI7Ozs7QUMxRkQsd0JBQW9CLGVBQWUsQ0FBQyxDQUFBO0FBQ3BDLHFCQUFzQixZQUFZLENBQUMsQ0FBQTtBQUNuQyxxQkFBMEMsWUFBWSxDQUFDLENBQUE7QUFjdkQsSUFBaUIsU0FBUyxDQXVEekI7QUF2REQsV0FBaUIsU0FBUyxFQUFDLENBQUM7SUFJMUIsbUJBQTBCLEtBQVk7UUFDcEMsSUFBSSxrQkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssY0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvRCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDeEMsSUFBSSxFQUFFLE1BQU07b0JBQ1osRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDO2lCQUN2QixFQUFFO29CQUNELElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQztvQkFDekIsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztxQkFDN0M7aUJBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBZmUsbUJBQVMsWUFleEIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUMxQyxJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUkvQixJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztZQUN4RCxPQUFPLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztZQUNwQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUF5QixDQUFDO0lBQ25DLENBQUM7SUFiZSxvQkFBVSxhQWF6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksa0JBQWtCLEdBQUcsRUFBeUIsQ0FBQztRQUVuRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUM3QixJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBR2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsYUFBTSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztZQUN0QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQWRlLG9CQUFVLGFBY3pCLENBQUE7SUFFRCxrQkFBeUIsU0FBd0I7UUFDL0MsTUFBTSxDQUFDLGNBQU8sQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUZlLGtCQUFRLFdBRXZCLENBQUE7QUFDSCxDQUFDLEVBdkRnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXVEekI7Ozs7QUN0RUQscUJBQW9DLFlBQVksQ0FBQyxDQUFBO0FBUWpELHVCQUFxQixVQUFVLENBQUMsQ0FBQTtBQUNoQyw0QkFBMEIsZUFBZSxDQUFDLENBQUE7QUFDMUMsMkJBQXlCLGNBQWMsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFxQixVQUFVLENBQUMsQ0FBQTtBQUNoQyxvQkFBa0IsT0FBTyxDQUFDLENBQUE7QUFDMUIsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLHNDQUFnQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzFELHdCQUFzQixXQUFXLENBQUMsQ0FBQTtBQUNsQywyQkFBeUIsY0FBYyxDQUFDLENBQUE7QUFDeEMseUJBQXVCLFlBQVksQ0FBQyxDQUFBO0FBQ3BDLCtCQUE2QixrQkFBa0IsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3QixhQUFhLENBQUMsQ0FBQTtBQTZEdEMsdUJBQThCLEtBQWdCO0lBQzVDLE1BQU0sQ0FBQztRQUNMLFdBQVcsRUFBRSx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekMsVUFBVSxFQUFFLHVCQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN2QyxNQUFNLEVBQUUsZUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDL0IsaUJBQWlCLEVBQUUseUNBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUVyRCxNQUFNLEVBQUUsZUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDL0IsR0FBRyxFQUFFLFNBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbkMsUUFBUSxFQUFFLG1CQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNuQyxjQUFjLEVBQUUsK0JBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQy9DLE9BQU8sRUFBRSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakMsVUFBVSxFQUFFLHVCQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN2QyxTQUFTLEVBQUUscUJBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0tBQ3RDLENBQUM7QUFDSixDQUFDO0FBaEJlLHFCQUFhLGdCQWdCNUIsQ0FBQTtBQUVELHdCQUErQixLQUFpQjtJQUM5QyxNQUFNLENBQUM7UUFDTCxXQUFXLEVBQUUseUJBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzFDLFVBQVUsRUFBRSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEMsTUFBTSxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hDLGlCQUFpQixFQUFFLHlDQUFpQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFdEQsTUFBTSxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hDLEdBQUcsRUFBRSxTQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMxQixTQUFTLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3BDLFFBQVEsRUFBRSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDcEMsY0FBYyxFQUFFLCtCQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNoRCxPQUFPLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2xDLFVBQVUsRUFBRSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEMsU0FBUyxFQUFFLHFCQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztLQUN2QyxDQUFDO0FBQ0osQ0FBQztBQWhCZSxzQkFBYyxpQkFnQjdCLENBQUE7QUFFRCx3QkFBK0IsS0FBaUI7SUFDOUMsTUFBTSxDQUFDO1FBR0wsTUFBTSxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hDLFdBQVcsRUFBRSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDMUMsVUFBVSxFQUFFLHVCQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4QyxpQkFBaUIsRUFBRSx5Q0FBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBR3RELE1BQU0sRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNoQyxHQUFHLEVBQUUsU0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDMUIsU0FBUyxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNwQyxRQUFRLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3BDLGNBQWMsRUFBRSwrQkFBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDaEQsT0FBTyxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNsQyxVQUFVLEVBQUUsdUJBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hDLFNBQVMsRUFBRSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7S0FDdkMsQ0FBQztBQUNKLENBQUM7QUFuQmUsc0JBQWMsaUJBbUI3QixDQUFBO0FBWUQsc0JBQTZCLEtBQVksRUFBRSxJQUFjO0lBQ3ZELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBRXZDLElBQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsV0FBVztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBR3hDLElBQU0sa0JBQWtCLEdBQUcscUJBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUdELElBQU0sMEJBQTBCLEdBQUcseUNBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFJRCxJQUFNLFNBQVMsR0FBRyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0JBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsa0JBQWtCO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBN0NlLG9CQUFZLGVBNkMzQixDQUFBOzs7O0FDak1ELHlCQUFpRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2xFLHlCQUFvQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3JDLHVCQUErRCxjQUFjLENBQUMsQ0FBQTtBQUM5RSx5QkFBeUUsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRixxQkFBZ0MsWUFBWSxDQUFDLENBQUE7QUFRN0MsSUFBaUIsTUFBTSxDQThHdEI7QUE5R0QsV0FBaUIsUUFBTSxFQUFDLENBQUM7SUFTdkIsbUJBQW1CLENBQU0sRUFBRSxRQUFrQjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxxQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFNLElBQUksR0FBRyx1QkFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7UUFDOUIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLDJCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7WUFDOUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFNLElBQUksR0FBRyx1QkFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7UUFDOUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCw2QkFBb0MsTUFBdUI7UUFDekQsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsTUFBZ0IsQ0FBQztRQUMxQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUTtnQkFJL0IsQ0FBQyxPQUFPLEdBQUcsb0JBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNsRSxnQkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBRS9CLEVBQUUsQ0FBQyxDQUFDLHNCQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFdBQVc7b0JBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUM3RCxLQUFLLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLHNCQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJO3dCQUNsQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJO3dCQUN4QyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQzVDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQWpDZSw0QkFBbUIsc0JBaUNsQyxDQUFBO0lBRUQsZUFBc0IsS0FBWTtRQUNoQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEdBQUc7Z0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUF0QixDQUFzQixDQUFDO3FCQUN0QyxNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEtBQUksU0FBUyxFQUFkLENBQWMsQ0FBQztxQkFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsR0FBRyxDQUFDO1FBQ1IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBWmUsY0FBSyxRQVlwQixDQUFBO0lBRVksa0JBQVMsR0FBRyxLQUFLLENBQUM7SUFFL0Isb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFNUQsZUFBZTtnQkFDYixDQUFDLGVBQWUsR0FBRyxlQUFlLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDakQsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQzVCLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQ25DLENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFkZSxtQkFBVSxhQWN6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBRTFDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUM3QixJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsTUFBTSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhILE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ25DLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQVhlLG1CQUFVLGFBV3pCLENBQUE7SUFFRCxrQkFBeUIsU0FBd0I7UUFDL0MsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQU5lLGlCQUFRLFdBTXZCLENBQUE7QUFDSCxDQUFDLEVBOUdnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUE4R3RCOzs7O0FDMUhELHlCQUFnQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pELHFCQUFxQyxZQUFZLENBQUMsQ0FBQTtBQUNsRCxxQkFBbUMsWUFBWSxDQUFDLENBQUE7QUFNaEQsSUFBaUIsV0FBVyxDQXFEM0I7QUFyREQsV0FBaUIsV0FBVyxFQUFDLENBQUM7SUFFNUIsZUFBZSxLQUFZO1FBQ3pCLElBQU0sWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxRQUFRLEVBQUUsT0FBTztZQUN4RixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLElBQUksY0FBYyxHQUFpQixFQUFFLENBQUM7UUFHdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQWtCO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssZUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDMUMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLG1CQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxrQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLENBQUM7Z0JBQ1QsQ0FBQztnQkFDRCxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUM1QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFWSxxQkFBUyxHQUFHLEtBQUssQ0FBQztJQUUvQixvQkFBMkIsS0FBaUI7UUFDMUMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR2xDLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqRSxhQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFWZSxzQkFBVSxhQVV6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBRTFDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUM3QixJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3RixhQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFaZSxzQkFBVSxhQVl6QixDQUFBO0FBR0gsQ0FBQyxFQXJEZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFxRDNCOzs7O0FDNURELHFCQUF1QyxZQUFZLENBQUMsQ0FBQTtBQVNwRCxJQUFpQixPQUFPLENBeUN2QjtBQXpDRCxXQUFpQixTQUFPLEVBQUMsQ0FBQztJQUN4QixlQUFlLEtBQVk7UUFDekIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxnQkFBZ0IsRUFBRSxPQUFPO1lBQ2xGLGdCQUFnQixDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUMxQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQyxFQUFFLEVBQW1CLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRVksbUJBQVMsR0FBRyxLQUFLLENBQUM7SUFFL0Isb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFHeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGFBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxPQUFPLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFYZSxvQkFBVSxhQVd6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzdCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsYUFBTSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7WUFDdEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFWZSxvQkFBVSxhQVV6QixDQUFBO0lBRUQsa0JBQXlCLFNBQXdCO1FBQy9DLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFTLFNBQVMsRUFBRSxPQUFPO1lBQ2pFLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBTGUsa0JBQVEsV0FLdkIsQ0FBQTtBQUNILENBQUMsRUF6Q2dCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXlDdkI7Ozs7QUNuREQsc0JBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLHFCQUF5QyxZQUFZLENBQUMsQ0FBQTtBQVd0RCxJQUFpQixpQkFBaUIsQ0FvRGpDO0FBcERELFdBQWlCLG1CQUFpQixFQUFDLENBQUM7SUFDbEMsbUJBQTBCLEtBQVk7UUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBUyxvQkFBb0IsRUFBRSxPQUFPO1lBQ25FLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQzlCLENBQUM7WUFDRCxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLEdBQUcsQ0FBQztZQUMxRSxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEVBQW1CLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBVmUsNkJBQVMsWUFVeEIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUMxQyxJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUUvQixJQUFNLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDO1lBQ3hFLE9BQU8sa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7WUFDNUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO1FBQ3BDLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBbUIsQ0FBQztJQUM3QixDQUFDO0lBWGUsOEJBQVUsYUFXekIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUUxQyxJQUFJLGlCQUFpQixHQUFHLEVBQW1CLENBQUM7UUFFNUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDN0IsSUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RHLGFBQU0sQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDO1lBQzlDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBYmUsOEJBQVUsYUFhekIsQ0FBQTtJQUVELGtCQUF5QixTQUF3QjtRQUMvQyxNQUFNLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUs7WUFFcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBUyxLQUFLO1lBQ25CLE1BQU0sQ0FBQztnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsUUFBUSxHQUFHLEtBQUssR0FBRyxNQUFNO2FBQ2hDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFWZSw0QkFBUSxXQVV2QixDQUFBO0FBQ0gsQ0FBQyxFQXBEZ0IsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFvRGpDOzs7O0FDL0RELHFCQUF5QyxZQUFZLENBQUMsQ0FBQTtBQVF0RCxJQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFLEtBQUs7SUFDZCxZQUFZLEVBQUUsSUFBSTtJQUNsQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFHRixJQUFpQixVQUFVLENBdUUxQjtBQXZFRCxXQUFpQixVQUFVLEVBQUMsQ0FBQztJQUUzQixlQUFlLEtBQVk7UUFDekIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFFNUMsRUFBRSxDQUFDLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6RSxhQUFhLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkRBQTZELENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBUyxVQUFVLEVBQUUsUUFBa0I7WUFDekQsRUFBRSxDQUFDLENBQUMsYUFBYTtnQkFDZixDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ILFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFHTixVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNyQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRVksb0JBQVMsR0FBRyxLQUFLLENBQUM7SUFFL0Isb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFHeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGFBQU0sQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxPQUFPLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFYZSxxQkFBVSxhQVd6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBSTFDLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzdCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsYUFBTSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQWZlLHFCQUFVLGFBZXpCLENBQUE7SUFHRCxrQkFBeUIsU0FBd0I7UUFDL0MsSUFBTSxjQUFjLEdBQUcsV0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLO1lBRTdELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM5QixDQUFDO29CQUNDLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVMsU0FBUzt3QkFDekMsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsU0FBUzs0QkFDdEMsbUJBQW1CLEdBQUUsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFiZSxtQkFBUSxXQWF2QixDQUFBO0FBQ0gsQ0FBQyxFQXZFZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUF1RTFCOzs7O0FDeEZELHFCQUFpQyxZQUFZLENBQUMsQ0FBQTtBQUM5QyxxQkFBK0IsWUFBWSxDQUFDLENBQUE7QUFRNUMsMkJBQXlCLGNBQWMsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFxQixVQUFVLENBQUMsQ0FBQTtBQUNoQyxvQkFBa0IsT0FBTyxDQUFDLENBQUE7QUFDMUIsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLHlCQUF1QixZQUFZLENBQUMsQ0FBQTtBQUVwQyxJQUFpQixNQUFNLENBd0d0QjtBQXhHRCxXQUFpQixNQUFNLEVBQUMsQ0FBQztJQUN2QixlQUFlLEtBQVk7UUFDekIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFHVCxJQUFJLFVBQVUsR0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQyxFQUFFLENBQUM7WUFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ2hDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUkxQixJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxJQUFNLFVBQVUsR0FBZSxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFHakQsSUFBTSxVQUFVLEdBQWUsVUFBVSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JFLFVBQVUsQ0FBQyxNQUFNO29CQUNmLGFBQU0sQ0FDSixFQUFFLElBQUksRUFBRSxVQUFVLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixFQUFFLEVBQ3BELFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFFNUQsVUFBVSxDQUFDLE9BQU87d0JBQ2hCLEVBQUUsT0FBTyxFQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUU7d0JBQ2xDLFVBQVUsQ0FBQyxJQUFJOzRCQUNiLEVBQUUsSUFBSSxFQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUU7NEJBQzFCLEVBQUUsQ0FDTCxDQUFDO1lBQ04sQ0FBQztZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFHM0IsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRVksZ0JBQVMsR0FBRyxLQUFLLENBQUM7SUFFL0Isb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFekMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBUmUsaUJBQVUsYUFRekIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUMxQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDN0IsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFFdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3RGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBRWIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDakUsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUMxQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVOLFNBQVMsQ0FBQyxNQUFNLEdBQUc7d0JBQ2pCLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQzt3QkFDNUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDO3FCQUMvQixDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUF0QmUsaUJBQVUsYUFzQnpCLENBQUE7SUFFRCxrQkFBeUIsS0FBWSxFQUFFLFNBQXdCO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksVUFBVSxHQUFXLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFFMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDeEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDeEQsQ0FBQztZQUlELFVBQVUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FDOUIsdUJBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzlCLGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUMzQixlQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUMxQixTQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUN2QixtQkFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDN0IsQ0FBQztZQUVGLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdEJlLGVBQVEsV0FzQnZCLENBQUE7QUFDSCxDQUFDLEVBeEdnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUF3R3RCOzs7O0FDdkhELHFCQUFxQyxZQUFZLENBQUMsQ0FBQTtBQUNsRCx5QkFBb0IsZ0JBQWdCLENBQUMsQ0FBQTtBQWFyQyxJQUFpQixVQUFVLENBMEQxQjtBQTFERCxXQUFpQixVQUFVLEVBQUMsQ0FBQztJQUMzQixtQkFBMEIsS0FBZ0I7UUFDeEMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFZixJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1lBQ2pELElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDN0MsTUFBTSxDQUFDO2dCQUNMLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLG9CQUFhLENBQUM7Z0JBQ25DLE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQU8sQ0FBQztnQkFDL0IsU0FBUyxFQUFFLENBQUM7d0JBQ1YsSUFBSSxFQUFFLFdBQVc7d0JBRWpCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBRXRDLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztxQkFDaEUsQ0FBQzthQUNILENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFwQmUsb0JBQVMsWUFvQnhCLENBQUE7SUFBQSxDQUFDO0lBRUYsb0JBQTJCLEtBQWlCO1FBQzFDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBRW5ELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsb0JBQWEsQ0FBQyxDQUFDO1lBQzlDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMvQyxjQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUc5QixjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBTyxDQUFDLENBQUM7WUFHaEQsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFTLE9BQU8sRUFBRSxRQUFRO2dCQUMzRSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQixDQUFDLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4QyxPQUFPLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztZQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQXpCZSxxQkFBVSxhQXlCekIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUhlLHFCQUFVLGFBR3pCLENBQUE7SUFFRCxrQkFBeUIsU0FBd0I7UUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDOUIsQ0FBQztJQUZlLG1CQUFRLFdBRXZCLENBQUE7QUFDSCxDQUFDLEVBMURnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQTBEMUI7Ozs7QUN4RUQsMEJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFFNUMscUJBQThCLFlBQVksQ0FBQyxDQUFBO0FBQzNDLHlCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9DLHFCQUF3RCxZQUFZLENBQUMsQ0FBQTtBQVVyRSxJQUFpQixPQUFPLENBNkp2QjtBQTdKRCxXQUFpQixPQUFPLEVBQUMsQ0FBQztJQUN4QixzQkFBc0IsSUFBa0MsRUFBRSxRQUFrQjtRQUMxRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN0RCxJQUFJLENBQUMsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNwRCxJQUFJLENBQUMsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUtwRCxJQUFJLENBQUMsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUV4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsZ0JBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxtQkFBMEIsS0FBWTtRQUVwQyxJQUFJLElBQUksR0FBYyxFQUFFLENBQUM7UUFHekIsSUFBSSxJQUFJLEdBQW9CLEVBQUUsQ0FBQztRQUUvQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBa0IsRUFBRSxPQUFnQjtZQUN6RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FBSyx1QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUU1QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUU1QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbEQsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxDQUFDO2dCQUNOLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQU8sQ0FBQztnQkFDN0IsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTVCZSxpQkFBUyxZQTRCeEIsQ0FBQTtJQUVELG9CQUEyQixLQUFpQjtRQUMxQyxJQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVMsZ0JBQWdCO2dCQUU5RSxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXRGLElBQU0sd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3RixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMxRSxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ2pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sa0JBQWtCLENBQUMsT0FBTyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFuQmUsa0JBQVUsYUFtQnpCLENBQUE7SUFFRCx1QkFBdUIsY0FBbUMsRUFBRSxhQUFrQztRQUM1RixHQUFHLENBQUMsQ0FBQyxJQUFNLE9BQUssSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsT0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4QyxJQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsT0FBSyxDQUFDLENBQUM7Z0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFLLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQzs0QkFFNUIsY0FBYyxDQUFDLE9BQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDbkMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixjQUFjLENBQUMsT0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ3ZDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsb0JBQTJCLEtBQWlCO1FBRTFDLElBQUksU0FBUyxHQUFHLEVBQTRCLENBQUM7UUFJN0MsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDN0IsSUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUU3RCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtvQkFHOUMsSUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBR3JCLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEUsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFFTixZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQzNFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7b0JBQ2hDLENBQUM7b0JBR0QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQU8sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0QsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBaENlLGtCQUFVLGFBZ0N6QixDQUFBO0lBTUQsa0JBQXlCLFNBQXdCLEVBQUUsS0FBWTtRQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVMsV0FBVyxFQUFFLGdCQUFnQjtZQUNwRSxJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7WUFDekMsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1lBRXZDLElBQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUkzQixJQUFNLFNBQVMsR0FBRyxhQUFNLENBQUMsSUFBSSxFQUFFLFVBQVMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLO2dCQUNsRSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3BCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVQLEVBQUUsQ0FBQyxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDZixJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSTtvQkFDM0IsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDO29CQUM5QixTQUFTLEVBQUUsQ0FBQzs0QkFDVixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLFNBQVMsRUFBRSxTQUFTO3lCQUNyQixDQUFDO2lCQUNILENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUE5QmUsZ0JBQVEsV0E4QnZCLENBQUE7QUFDSCxDQUFDLEVBN0pnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUE2SnZCOzs7O0FDMUtELHlCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9DLHlCQUF3QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3pDLHFCQUF1QixZQUFZLENBQUMsQ0FBQTtBQUNwQyxxQkFBaUMsWUFBWSxDQUFDLENBQUE7QUFTOUMsSUFBaUIsUUFBUSxDQWdEeEI7QUFoREQsV0FBaUIsUUFBUSxFQUFDLENBQUM7SUFDekIsZUFBZSxLQUFZO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVMsaUJBQWlCLEVBQUUsUUFBa0IsRUFBRSxPQUFnQjtZQUNsRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLGVBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFcEQsSUFBTSxJQUFJLEdBQUcsZ0JBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFN0IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ3hCLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxnQkFBSyxDQUFDLFFBQVEsQ0FBQztvQkFDdEIsSUFBSSxFQUFFLG9CQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUNuRCxDQUFDO1lBQ0osQ0FBQztZQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUMzQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRVksa0JBQVMsR0FBRyxLQUFLLENBQUM7SUFFL0Isb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJDLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFHeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGFBQU0sQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFYZSxtQkFBVSxhQVd6QixDQUFBO0lBRUQsb0JBQTJCLEtBQWlCO1FBQzFDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzdCLElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixhQUFNLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDO1lBQ3JDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBVmUsbUJBQVUsYUFVekIsQ0FBQTtJQUVELGtCQUF5QixTQUF3QjtRQUUvQyxNQUFNLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBSGUsaUJBQVEsV0FHdkIsQ0FBQTtBQUNILENBQUMsRUFoRGdCLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBZ0R4Qjs7OztBQzVERCx5QkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUUxRCx5QkFBa0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNuRCxxQkFBc0MsWUFBWSxDQUFDLENBQUE7QUFVbkQsSUFBaUIsY0FBYyxDQWdEOUI7QUFoREQsV0FBaUIsY0FBYyxFQUFDLENBQUM7SUFDL0IsZUFBZSxLQUFZO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVMsaUJBQWlCLEVBQUUsUUFBa0IsRUFBRSxPQUFnQjtZQUNsRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBTSxNQUFNLEdBQUcsb0JBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNYLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzlDLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQzNCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFFWSx3QkFBUyxHQUFHLEtBQUssQ0FBQztJQUUvQixvQkFBMkIsS0FBaUI7UUFFMUMsTUFBTSxDQUFDLGFBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUhlLHlCQUFVLGFBR3pCLENBQUE7SUFFRCxvQkFBMkIsS0FBaUI7UUFFMUMsTUFBTSxDQUFDLGFBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUxlLHlCQUFVLGFBS3pCLENBQUE7SUFFRCxrQkFBeUIsU0FBd0I7UUFDL0MsTUFBTSxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVMsWUFBWSxFQUFFLEVBQU87WUFDekUsSUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1lBQzlCLElBQU0sTUFBTSxHQUFHLG9CQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxRQUFRLEdBQWlCLEVBQUUsQ0FBQztnQkFDaEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQztnQkFFbEMsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDaEIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsU0FBUyxFQUFFLENBQUM7NEJBQ1YsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsS0FBSyxFQUFFLE1BQU07NEJBQ2IsSUFBSSxFQUFFLHVCQUFZLENBQUMsUUFBUSxDQUFDO3lCQUM3QixDQUFDO2lCQUNILENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFwQmUsdUJBQVEsV0FvQnZCLENBQUE7QUFDSCxDQUFDLEVBaERnQixjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQWdEOUI7Ozs7Ozs7OztBQzlERCxxQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFDekMsd0JBQXlDLFlBQVksQ0FBQyxDQUFBO0FBQ3RELHVCQUFvQyxXQUFXLENBQUMsQ0FBQTtBQUNoRCxxQkFBOEIsU0FBUyxDQUFDLENBQUE7QUFFeEMseUJBQW9DLGFBQWEsQ0FBQyxDQUFBO0FBQ2xELHlCQUFvQyxhQUFhLENBQUMsQ0FBQTtBQUNsRCxzQkFBK0IsVUFBVSxDQUFDLENBQUE7QUFFMUMscUJBQTBCLFNBQVMsQ0FBQyxDQUFBO0FBQ3BDLHFCQUFzRSxTQUFTLENBQUMsQ0FBQTtBQUdoRixxQkFBc0UsUUFBUSxDQUFDLENBQUE7QUFDL0UsdUJBQXlCLFVBQVUsQ0FBQyxDQUFBO0FBQ3BDLHFCQUEyQyxhQUFhLENBQUMsQ0FBQTtBQUN6RCx1QkFBK0MsVUFBVSxDQUFDLENBQUE7QUFDMUQsc0JBQW9CLFNBQVMsQ0FBQyxDQUFBO0FBQzlCLHNCQUFrQyxTQUFTLENBQUMsQ0FBQTtBQUU1QztJQUFnQyw4QkFBSztJQUtuQyxvQkFBWSxJQUFlLEVBQUUsTUFBYSxFQUFFLGVBQXVCO1FBQ2pFLGtCQUFNLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFHckMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEUsSUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU3RSxJQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyxnQ0FBVyxHQUFuQixVQUFvQixVQUFrQixFQUFFLE1BQWE7UUFDbkQsTUFBTSxDQUFDLGdCQUFTLENBQUMsZ0JBQVMsQ0FBQyxzQkFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVPLCtCQUFVLEdBQWxCLFVBQW1CLEtBQVk7UUFFN0IsS0FBSyxHQUFHLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGdDQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBUyxRQUFrQixFQUFFLE9BQWdCO1lBR3pGLEVBQUUsQ0FBQyxDQUFDLENBQUMsc0JBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVsQixRQUFRLENBQUMsSUFBSSxHQUFHLGtCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sK0JBQVUsR0FBbEIsVUFBbUIsS0FBWSxFQUFFLE1BQWMsRUFBRSxLQUFZO1FBQzNELE1BQU0sQ0FBQyxDQUFDLGFBQUcsRUFBRSxnQkFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVMsTUFBTSxFQUFFLE9BQU87WUFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFNLENBQUM7b0JBQ3ZCLElBQUksRUFBRSxpQkFBUyxDQUFDLE9BQU87b0JBQ3ZCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUcvQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssYUFBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxnQkFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUM7d0JBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDO2lCQUN4QyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxFQUFpQixDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVPLDhCQUFTLEdBQWpCLFVBQWtCLEtBQVksRUFBRSxNQUFjLEVBQUUsS0FBWTtRQUMxRCxNQUFNLENBQUMsQ0FBQyxhQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFTLEtBQUssRUFBRSxPQUFPO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBTSxDQUFDLEVBQUUsRUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQ2pCLFFBQVEsS0FBSyxJQUFJLEdBQUcsRUFBRSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQ3hDLENBQUM7b0JBRUYsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGFBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQU0sS0FBSyxHQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBQyxDQUFDLENBQUM7d0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLGlCQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ3BFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQ3RDLENBQUM7d0JBQ0QsRUFBRSxDQUFBLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEtBQUssaUJBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQzt3QkFDMUUsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBRSxFQUFnQixDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLDBCQUFLLEdBQVo7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLE9BQWdCO1FBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sMEJBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTywrQkFBVSxHQUFsQjtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLDhCQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLGNBQU8sR0FBRyxhQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVNLDZCQUFRLEdBQWYsVUFBZ0IsT0FBZ0I7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMEJBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sOEJBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcscUJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sdUNBQWtCLEdBQXpCO0lBR0EsQ0FBQztJQUVNLG9DQUFlLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSwrQkFBVSxHQUFqQjtRQUNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBS25CLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBR3RFLFdBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQU87WUFFbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBR3pELFdBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO29CQUNsRCxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hFLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDeEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN2QyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7Z0JBR0gsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOEJBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsYUFBTSxDQUMxQjtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxhQUFNLENBQ1YsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFDaEQ7Z0JBQ0UsU0FBUyxFQUFFLENBQUM7d0JBQ1YsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUM3QztxQkFDRixDQUFDO2FBQ0gsQ0FDRjtZQUNELFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUUsdUJBQXVCLENBQUMsSUFBSSxDQUFDO2FBQ3RDO1NBQ0YsRUFLRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQzdCLENBQUM7SUFDSixDQUFDO0lBRU0sOEJBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcseUJBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBRyxFQUFFLGdCQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxtQ0FBYyxHQUFyQjtRQUlFLElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxXQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxhQUFNLENBQy9CLFVBQVUsR0FBRyxFQUFDLENBQUMsRUFBRSxVQUFVLEVBQUMsR0FBRyxFQUFFLEVBQ2pDLFVBQVUsR0FBRyxFQUFDLENBQUMsRUFBRSxVQUFVLEVBQUMsR0FBRyxFQUFFLENBQ2xDLENBQUM7SUFDSixDQUFDO0lBRU0sbUNBQWMsR0FBckI7UUFJRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsYUFBTSxDQUMvQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQzlFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUVNLGdDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBTzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxrREFBNkIsR0FBcEM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLGlDQUFZLEdBQW5CLFVBQW9CLElBQWM7UUFFaEMsbUJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxtQ0FBYyxHQUFyQixVQUFzQixVQUFvQjtRQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsdUJBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLGtDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBRWQsV0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQzlCLGNBQU8sQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFTSw2QkFBUSxHQUFmO1FBQ0UsTUFBTSxDQUFDLENBQUMsYUFBRyxFQUFFLGdCQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRVMsNEJBQU8sR0FBakI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSw0QkFBTyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxpQkFBQztBQUFELENBblJBLEFBbVJDLENBblIrQixhQUFLLEdBbVJwQztBQW5SWSxrQkFBVSxhQW1SdEIsQ0FBQTtBQUlELGlDQUFpQyxLQUFpQjtJQUNoRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsSUFBTSxnQkFBZ0IsR0FBRyxhQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRixNQUFNLENBQUMsYUFBTSxDQUFDO1FBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxHQUFHO1lBQ25CLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUM7WUFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQztZQUUxQixNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBTSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUM7U0FDeEMsR0FBRyxFQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFDO1FBRXJELENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQUcsQ0FBQztZQUMzQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUM7WUFFdkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUM7U0FDckMsR0FBRyxFQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFDO1FBRW5ELEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUM7UUFDekQsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQztLQUM1RCxFQUNELEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUN0RCxDQUFDO0FBQ0osQ0FBQztBQUVELHdCQUF3QixLQUFpQixFQUFFLE9BQWdCO0lBRXpELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztJQUVyQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFHVCxTQUFTLEdBQUcsT0FBTyxLQUFLLFdBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV4RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVwRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxxQkFBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO1lBRVIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBR0QsdUJBQXVCLEtBQWlCO0lBQ3RDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxhQUFNLENBQ1g7UUFDRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDMUIsSUFBSSxFQUFFLE9BQU87S0FDZCxFQUNELE1BQU0sR0FBRztRQUNQLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDO29CQUNWLElBQUksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsQ0FBQztvQkFDOUIsU0FBUyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUM7aUJBQzVCLENBQUM7U0FDSDtLQUNGLEdBQUcsRUFBRSxFQUNOO1FBQ0UsVUFBVSxFQUFFO1lBQ1YsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUM7Z0JBQ3pELE1BQU0sRUFBRTtvQkFDTixLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDO2lCQUN6QjtnQkFDRCxDQUFDLEVBQUUsTUFBTSxHQUFHO29CQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUM7b0JBQzlCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUM7b0JBRTFCLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztpQkFDeEMsR0FBRztvQkFFRixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRjtRQUNELElBQUksRUFBRSxDQUFDLGdCQUFTLENBQUMsV0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3BDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCx1QkFBdUIsS0FBaUI7SUFDdEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsYUFBTSxDQUNYO1FBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLElBQUksRUFBRSxPQUFPO0tBQ2QsRUFDRCxNQUFNLEdBQUc7UUFDUCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN2QixTQUFTLEVBQUUsQ0FBQztvQkFDVixJQUFJLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsQ0FBQztvQkFDM0IsU0FBUyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUM7aUJBQzVCLENBQUM7U0FDSDtLQUNGLEdBQUcsRUFBRSxFQUNOO1FBQ0UsVUFBVSxFQUFFO1lBQ1YsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDO2lCQUN4QjtnQkFDRCxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFDO2dCQUMzRCxDQUFDLEVBQUUsTUFBTSxHQUFHO29CQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQUcsQ0FBQztvQkFDM0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBRyxDQUFDO29CQUV2QixNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztpQkFDckMsR0FBRztvQkFFRixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRjtRQUNELElBQUksRUFBRSxDQUFDLGdCQUFTLENBQUMsV0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3BDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCwwQkFBMEIsS0FBWTtJQUNwQyxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUVsRCxJQUFNLE9BQU8sR0FBRztRQUNkLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztTQUMxRDtRQUNELFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixDQUFDLEVBQUU7b0JBQ0QsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBRyxDQUFDO29CQUMzQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUM7aUJBQ3hCO2dCQUNELENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTSxFQUFFO2dCQUM5RCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRTtnQkFDeEMsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELFdBQVcsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7YUFDMUI7U0FDRjtLQUNGLENBQUM7SUFFRixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDaEMsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFO29CQUNOLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBQztvQkFDOUIsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO29CQUMvQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxNQUFNLEVBQUU7b0JBQzlELE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFO29CQUN4QyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDakQsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQztpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCw2QkFBNkIsS0FBWTtJQUN2QyxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUVsRCxJQUFNLFVBQVUsR0FBRztRQUNqQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDL0IsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBTSxDQUFDLENBQUMsRUFBQyxDQUFDO1NBQzdEO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsTUFBTSxFQUFFO2dCQUNOLENBQUMsRUFBRTtvQkFDRCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBTSxDQUFDO29CQUM5QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBTSxDQUFDO2lCQUMzQjtnQkFDRCxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUM7Z0JBQzlDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDL0QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUMsT0FBTyxFQUFFO2dCQUNqRCxXQUFXLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDO2FBQzFCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFHO1lBQ25CLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ25DLElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFO2dCQUNWLE1BQU0sRUFBRTtvQkFDTixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLEVBQUM7b0JBQzdCLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBQztvQkFDOUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTSxFQUFFO29CQUMvRCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRTtvQkFDeEMsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2pELFdBQVcsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUM7aUJBQzFCO2FBQ0Y7U0FDRixDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7QUMvZkQscUJBQXFGLFNBQVMsQ0FBQyxDQUFBO0FBQy9GLHVCQUFvQyxXQUFXLENBQUMsQ0FBQTtBQUVoRCxxQkFBMkMsYUFBYSxDQUFDLENBQUE7QUFDekQsdUJBQStDLFVBQVUsQ0FBQyxDQUFBO0FBQzFELHNCQUFvQixTQUFTLENBQUMsQ0FBQTtBQUU5Qix1QkFBeUIsVUFBVSxDQUFDLENBQUE7QUFHcEMsNEJBQW9GLGdCQUFnQixDQUFDLENBQUE7QUFHckc7SUFBZ0MsOEJBQUs7SUFHbkMsb0JBQVksSUFBZSxFQUFFLE1BQWEsRUFBRSxlQUF1QjtRQUhyRSxpQkFnUEM7UUE1T0csa0JBQU0sSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7WUFFeEMsTUFBTSxDQUFDLG1CQUFVLENBQUMsS0FBSyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBYyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdDQUFXLEdBQW5CLFVBQW9CLFVBQWtCLEVBQUUsTUFBYTtRQUNuRCxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxnQkFBUyxDQUFDLHNCQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLE9BQWdCO1FBRXpCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sNkJBQVEsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxtQ0FBYyxHQUFyQixVQUFzQixPQUFnQjtRQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLDhCQUFTLEdBQWhCO1FBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVNLDZCQUFRLEdBQWYsVUFBZ0IsT0FBZ0I7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSwwQkFBSyxHQUFaO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSw4QkFBUyxHQUFoQjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxxQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSx1Q0FBa0IsR0FBekI7SUFHQSxDQUFDO0lBRU0sb0NBQWUsR0FBdEI7UUFFRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSwrQkFBVSxHQUFqQjtRQUNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUEyQixDQUFDO1FBRXhFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztZQUNuQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFHbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxXQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPO29CQUNsRCxJQUFJLFdBQVcsR0FBb0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2xFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFFakIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBRUQsSUFBTSxXQUFXLEdBQW9CLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0QsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUdwQyxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDNUMsSUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBRTVDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDNUQsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixLQUFLLENBQUMsVUFBVSxDQUFDLHVFQUF1RSxDQUFDLENBQUM7NEJBQzVGLENBQUM7d0JBQ0gsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFNLGFBQWEsR0FBRyw2QkFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQWdCLENBQUM7NEJBRXZHLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pCLEtBQUssQ0FBQyxVQUFVLENBQUMsdUVBQXVFLENBQUMsQ0FBQzs0QkFDNUYsQ0FBQzs0QkFFRCxJQUFJLE1BQU0sR0FBRyw2QkFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FFN0UsNkJBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7b0NBRXJFLGFBQWEsQ0FBQzs0QkFDbEIsTUFBTSxHQUFHLGFBQU0sQ0FBQyxNQUFNLEVBQUUsV0FBSSxDQUFDLENBQUM7NEJBRTlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7NEJBQy9DLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxDQUFDO3dCQUNILENBQUM7d0JBR0QsV0FBVyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQzt3QkFDdEcsV0FBVyxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztvQkFDcEgsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUN4QyxDQUFDO29CQUdELFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO3dCQUN0QyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3hFLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDeEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN2QyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDhCQUFTLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO1lBQ25DLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw4QkFBUyxHQUFoQjtRQUNFLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFFL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO1lBQ25DLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUdsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULFdBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQU87b0JBSWpELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFjLEdBQXJCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxtQ0FBYyxHQUFyQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sZ0NBQVcsR0FBbEI7UUFDRSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFvQixDQUFDO1FBRW5FLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztZQUNuQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFHcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxXQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPO29CQUVuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0QsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxrREFBNkIsR0FBcEM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLGlDQUFZLEdBQW5CLFVBQW9CLElBQWM7UUFFaEMsbUJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzNCLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLG1DQUFjLEdBQXJCLFVBQXNCLFVBQW9CO1FBRXhDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUMzQixLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHVCQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxrQ0FBYSxHQUFwQjtRQUVFLE1BQU0sQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSw2QkFBUSxHQUFmO1FBQ0UsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFUyw0QkFBTyxHQUFqQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sNEJBQU8sR0FBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUU0scUNBQWdCLEdBQXZCLFVBQXdCLEtBQWdCO1FBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFNLFVBQVUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FoUEEsQUFnUEMsQ0FoUCtCLGFBQUssR0FnUHBDO0FBaFBZLGtCQUFVLGFBZ1B0QixDQUFBOzs7O0FDN1BELHdCQUF5QyxZQUFZLENBQUMsQ0FBQTtBQUN0RCxxQkFBcUIsU0FBUyxDQUFDLENBQUE7QUFDL0Isc0JBQXdCLFVBQVUsQ0FBQyxDQUFBO0FBRW5DLHFCQUFzQyxTQUFTLENBQUMsQ0FBQTtBQUtoRCxxQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFFekMseUJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBa0J0Qyx3QkFBK0IsS0FBWSxFQUFFLFVBQW9CO0lBQy9ELElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVCxJQUFNLGNBQWMsR0FBRyxXQUFJLENBQUMsYUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRyxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDakYsR0FBRyxDQUFDLFVBQVMsT0FBTztZQUNuQixNQUFNLENBQUMsYUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUwsTUFBTSxDQUFDO1lBQ0wsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUc7Z0JBQzFCLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQztnQkFDNUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3pCLFNBQVMsRUFBRSxDQUFDO3dCQUNSLElBQUksRUFBRSxXQUFXO3dCQUNqQixTQUFTLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEtBQUs7NEJBQzFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDN0MsQ0FBQyxDQUFDO3FCQUNILENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3JCLEdBQUc7Z0JBQ0YsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBTSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLE9BQU87YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQztBQUdILENBQUM7QUFoQ2Usc0JBQWMsaUJBZ0M3QixDQUFBO0FBSUQseUJBQWdDLEtBQWdCO0lBQzlDLE1BQU0sQ0FBQztRQUNMLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsV0FBQyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsV0FBQyxDQUFDO0tBQ3RDLENBQUM7QUFDSixDQUFDO0FBTGUsdUJBQWUsa0JBSzlCLENBQUE7QUFFRCw2QkFBNkIsS0FBZ0IsRUFBRSxPQUFnQjtJQUU3RCxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLElBQU0sY0FBYyxHQUFHLE9BQU8sS0FBSyxXQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTVFLE1BQU0sQ0FBQztRQUNMLFFBQVEsRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUM7YUFDbkQsQ0FBQztLQUNILENBQUM7QUFDSixDQUFDO0FBRUQsc0JBQXNCLEtBQWdCLEVBQUUsT0FBZ0IsRUFBRSxjQUFzQjtJQUM5RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLFdBQVEsSUFBSSxPQUFPLEtBQUssV0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2pELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQzVDLENBQUM7QUFDSCxDQUFDO0FBRUQsMEJBQWlDLEtBQWlCO0lBQ2hELE1BQU0sQ0FBQztRQUNMLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQU0sQ0FBQztRQUMxQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLGFBQUcsQ0FBQztLQUN6QyxDQUFDO0FBQ0osQ0FBQztBQUxlLHdCQUFnQixtQkFLL0IsQ0FBQTtBQUVELDhCQUE4QixLQUFpQixFQUFFLE9BQWdCO0lBQy9ELElBQU0sb0JBQW9CLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDNUQsSUFBTSxRQUFRLEdBQUcsT0FBTyxLQUFLLGFBQUcsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ3RELElBQU0sa0JBQWtCLEdBQWtCLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFHVCxJQUFNLFFBQVEsR0FBRyxhQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRixJQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztnQkFDckMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVKLE9BQU8sb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQztJQUNKLENBQUM7QUFHSCxDQUFDO0FBRUQsMEJBQTBCLEtBQVksRUFBRSxPQUFnQixFQUFFLFNBQWlCO0lBQ3pFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUMzRSxDQUFDO0FBQ0gsQ0FBQztBQUVELDBCQUFpQyxLQUFpQjtJQUNoRCxNQUFNLENBQUM7UUFDTCxLQUFLLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFdBQUMsQ0FBQztRQUNyQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFdBQUMsQ0FBQztLQUN2QyxDQUFDO0FBQ0osQ0FBQztBQUxlLHdCQUFnQixtQkFLL0IsQ0FBQTtBQUVELDhCQUE4QixLQUFpQixFQUFFLE9BQWdCO0lBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFJVCxJQUFNLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2xFLElBQU0sVUFBUSxHQUFHLE9BQU8sS0FBSyxXQUFDLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNwRCxJQUFNLGtCQUFrQixHQUFrQixvQkFBb0IsQ0FBQyxVQUFRLENBQUMsQ0FBQztRQUV6RSxJQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBTSxPQUFPLEdBQUcsQ0FBQztnQkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTthQUN6QyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUM3QixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVEsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQscUJBQXFCLEtBQVksRUFBRSxPQUFnQjtJQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekUsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLFFBQVEsR0FBYyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFHRCw0QkFBNEIsS0FBWSxFQUFFLE9BQWdCO0lBQ3hELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDbEQsSUFBTSxjQUFjLEdBQUcsUUFBUSxHQUFHLG9CQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV0RSxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksR0FBRyxjQUFjLENBQUMsTUFBTTtRQUNoRCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQzs7OztBQzdNRCx3QkFBbUQsWUFBWSxDQUFDLENBQUE7QUFJaEUseUJBQWtDLGFBQWEsQ0FBQyxDQUFBO0FBQ2hELHFCQUFpRSxTQUFTLENBQUMsQ0FBQTtBQUMzRSxxQkFBZ0MsU0FBUyxDQUFDLENBQUE7QUFDMUMscUJBQTBDLFNBQVMsQ0FBQyxDQUFBO0FBRXBELHVCQUE4RSxVQUFVLENBQUMsQ0FBQTtBQUN6RixzQkFBK0MsU0FBUyxDQUFDLENBQUE7QUFLekQsOEJBQXFDLEtBQWdCO0lBQ25ELE1BQU0sQ0FBQyxDQUFDLGVBQUssRUFBRSxjQUFJLEVBQUUsZUFBSyxFQUFFLGlCQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxlQUFlLEVBQUUsT0FBTztRQUMzRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN6QixDQUFDLEVBQUUsRUFBb0IsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFQZSw0QkFBb0IsdUJBT25DLENBQUE7QUFFRCwrQkFBK0IsS0FBZ0IsRUFBRSxPQUFnQjtJQUMvRCxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssZUFBSztZQUNSLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBSyxDQUFDLENBQUM7WUFDdkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7Z0JBS3pELG9CQUFZO2dCQUNaLGVBQUssQ0FDTixDQUFDO1lBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzFFLEtBQUssY0FBSTtZQUNQLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsS0FBSyxlQUFLO1lBQ1IsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBSyxDQUFDLEVBQUUsQ0FBQztRQUMzQyxLQUFLLGlCQUFPO1lBQ1YsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQU8sQ0FBQyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQscUJBQTRCLEtBQWdCLEVBQUUsT0FBZ0I7SUFDNUQsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUU5QixJQUFJLEdBQUcsR0FBYSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFHMUQsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFNLE1BQU0sR0FBRyxxQkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBR0QsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDdEQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBR0gsSUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2RSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7UUFDN0QsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMzQixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1lBQ3pELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksV0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFDdEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFuQ2UsbUJBQVcsY0FtQzFCLENBQUE7QUFFRCxlQUFzQixNQUFjLEVBQUUsUUFBa0IsRUFBRSxNQUFjO0lBQ3RFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFOZSxhQUFLLFFBTXBCLENBQUE7QUFHRCw2QkFBb0MsUUFBa0I7SUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssY0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUN4RSxDQUFDO0FBRmUsMkJBQW1CLHNCQUVsQyxDQUFBO0FBRUQsSUFBaUIsVUFBVSxDQTBLMUI7QUExS0QsV0FBaUIsVUFBVSxFQUFDLENBQUM7SUFDM0IsaUJBQXdCLFFBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQWdCLEVBQUUsT0FBZ0I7UUFDekYsSUFBSSxPQUFPLEdBQU8sRUFBRSxDQUFDO1FBQ3JCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLFVBQUcsQ0FBQztZQUNULEtBQUssV0FBSSxDQUFDO1lBQ1YsS0FBSyxXQUFJO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQztZQUNSLEtBQUssYUFBTSxDQUFDO1lBQ1osS0FBSyxhQUFNO2dCQUNULE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQztZQUNSLEtBQUssWUFBSyxDQUFDO1lBQ1gsS0FBSyxXQUFJLENBQUM7WUFDVixLQUFLLFdBQUk7Z0JBRVAsS0FBSyxDQUFDO1FBQ1YsQ0FBQztRQUVELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRzFDLElBQUksTUFBTSxHQUFHLE9BQU8sS0FBSyxlQUFLO1lBRTFCLGNBQU8sQ0FBQywyQkFBa0IsRUFBRSxDQUFFLE1BQU0sR0FBRyxNQUFNLEdBQUcsUUFBUSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRTNGLGNBQU8sQ0FBQywyQkFBa0IsRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFFckUsTUFBTSxHQUFHLGNBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBRTdELHdCQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGlCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxLQUFLLENBQUM7UUFDVixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxlQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEMsS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQzNELENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWCxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGVBQUssQ0FBQyxDQUFDLENBQUM7WUFHN0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO2dCQUN2RSxFQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxPQUFPLEdBQUcsYUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQXZGZSxrQkFBTyxVQXVGdEIsQ0FBQTtJQUVELGdCQUF1QixRQUFrQixFQUFFLFVBQVUsRUFBRSxLQUFnQixFQUFFLE9BQWdCO1FBQ3ZGLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlCLElBQUksTUFBTSxHQUFPLEVBQUUsQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZUFBSyxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLGNBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLFVBQVUsR0FBRyxhQUFNLENBQUM7b0JBQ2xCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxvQkFBWSxDQUFDO3dCQUNwQyxLQUFLLEVBQUUsTUFBTTtxQkFDZDtpQkFDRixFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixVQUFVLEdBQUcsYUFBTSxDQUFDO29CQUNsQixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsMEJBQWtCLENBQUM7d0JBQzFDLEtBQUssRUFBRSxNQUFNO3FCQUNkO2lCQUNGLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxlQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxVQUFVLEdBQUcsYUFBTSxDQUFDO29CQUNsQixJQUFJLEVBQUU7d0JBQ0osUUFBUSxFQUFFLHFCQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztxQkFDdkc7aUJBQ0YsRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQsTUFBTSxHQUFHLGFBQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3RELENBQUM7SUFyRGUsaUJBQU0sU0FxRHJCLENBQUE7SUFFRCxlQUFzQixRQUFrQixFQUFFLFNBQVMsRUFBRSxLQUFnQixFQUFFLE9BQWdCO1FBQ3JGLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsTUFBTSxHQUFHLGFBQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxXQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3RELENBQUM7SUF4QmUsZ0JBQUssUUF3QnBCLENBQUE7QUFDSCxDQUFDLEVBMUtnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQTBLMUI7Ozs7QUMxUUQsd0JBQW1CLGVBQWUsQ0FBQyxDQUFBO0FBQ25DLHVCQUFxQixjQUFjLENBQUMsQ0FBQTtBQUNwQyx5QkFBc0QsZ0JBQWdCLENBQUMsQ0FBQTtBQUd2RSx1QkFBb0QsV0FBVyxDQUFDLENBQUE7QUFHaEUsSUFBaUIsSUFBSSxDQTJLcEI7QUEzS0QsV0FBaUIsSUFBSSxFQUFDLENBQUM7SUFDckI7UUFDRSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFGZSxhQUFRLFdBRXZCLENBQUE7SUFFRCxvQkFBMkIsS0FBZ0I7UUFFekMsSUFBSSxDQUFDLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUc5QixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFFO1FBRTdCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU1QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFHL0QsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsNkJBQW9CLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLHdCQUFlLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBNUJlLGVBQVUsYUE0QnpCLENBQUE7SUFFRCxXQUFrQixRQUFrQixFQUFFLFNBQWlCLEVBQUUsTUFBYyxFQUFFLEtBQXNCO1FBQzdGLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxXQUFDLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDN0MsQ0FBQztRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUVqQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sQ0FBQzt3QkFDTCxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxDQUFDO3FCQUN2QixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDO3dCQUNMLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsQ0FBQztxQkFDVCxDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLENBQUM7aUJBQ3ZCLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUM5QyxDQUFDO1FBQ0osQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQWpDZSxNQUFDLElBaUNoQixDQUFBO0lBRUQsWUFBbUIsU0FBbUIsRUFBRSxVQUFvQixFQUFFLFNBQWlCLEVBQUUsTUFBYyxFQUFFLEtBQXNCO1FBRXJILEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksV0FBQyxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUM7b0JBQ0wsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDNUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQzt3QkFDTCxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsVUFBVSxDQUFDO3FCQUN6QixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUM7d0JBQ0wsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztxQkFDeEIsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUlELE1BQU0sQ0FBQztnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDO1FBQ0osQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQTlCZSxPQUFFLEtBOEJqQixDQUFBO0lBRUQsV0FBa0IsUUFBa0IsRUFBRSxTQUFpQixFQUFFLE1BQWMsRUFBRSxLQUFzQjtRQUM3RixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksV0FBQyxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQztnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQzdDLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFFakMsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLENBQUM7d0JBQ0wsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFFBQVEsQ0FBQztxQkFDdkIsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxDQUFDO2lCQUN2QixDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsc0JBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDOUMsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUE5QmUsTUFBQyxJQThCaEIsQ0FBQTtJQUVELFlBQW1CLFNBQW1CLEVBQUUsVUFBb0IsRUFBRSxTQUFpQixFQUFFLE1BQWMsRUFBRSxLQUFzQjtRQUNySCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFdBQUMsS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzVDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUM7d0JBQ0wsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFVBQVUsQ0FBQztxQkFDekIsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDO3dCQUNMLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7cUJBQ3hCLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFJRCxNQUFNLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUE5QmUsT0FBRSxLQThCakIsQ0FBQTtJQUdELGdCQUF1QixLQUFnQjtRQUVyQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFIZSxXQUFNLFNBR3JCLENBQUE7QUFDSCxDQUFDLEVBM0tnQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUEyS3BCOzs7O0FDckxELHdCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUMxRCx1QkFBcUIsY0FBYyxDQUFDLENBQUE7QUFDcEMseUJBQXdCLGdCQUFnQixDQUFDLENBQUE7QUFDekMsc0JBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBR3RDLHVCQUFtQyxXQUFXLENBQUMsQ0FBQTtBQUUvQyxJQUFpQixHQUFHLENBNk9uQjtBQTdPRCxXQUFpQixHQUFHLEVBQUMsQ0FBQztJQUNwQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUZlLFlBQVEsV0FFdkIsQ0FBQTtJQUVELG9CQUEyQixLQUFnQjtRQUV6QyxJQUFJLENBQUMsR0FBUSxFQUFFLENBQUM7UUFFaEIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFMUMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUV2QyxJQUFNLFVBQVUsR0FBRyxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLG9CQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHakUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFdBQUMsS0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUV0QyxDQUFDLENBQUMsQ0FBQyxHQUFHO2dCQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztnQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQzVDLENBQUM7WUFDRixDQUFDLENBQUMsRUFBRSxHQUFHO2dCQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztnQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO2FBQzFDLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakIsQ0FBQyxDQUFDLENBQUMsR0FBRzt3QkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7d0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsQ0FBQztxQkFDdEIsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUc7d0JBQ0osS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO3dCQUN6QixLQUFLLEVBQUUsQ0FBQztxQkFDVCxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxFQUFFLEdBQUc7d0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO3dCQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUM7cUJBQ3ZCLENBQUM7Z0JBQ0osQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sQ0FBQyxDQUFDLEVBQUUsR0FBRzs0QkFDTCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7NEJBQ3pCLEtBQUssRUFBRSxDQUFDO3lCQUNULENBQUM7b0JBQ0osQ0FBQztnQkFFSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxFQUFFLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO29CQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUM7aUJBQ3RCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLFdBQUMsQ0FBQyxFQUFDLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLElBQUksTUFBTSxLQUFLLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUdwRCxDQUFDLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM3QyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxLQUFLLEdBQUc7b0JBQ1IsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDO29CQUM1QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFJLENBQUM7aUJBQ3pCLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRztvQkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQztvQkFDOUMsTUFBTSxFQUFFLENBQUM7aUJBQ1YsQ0FBQztnQkFDRixDQUFDLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM3QyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDO2lCQUN0QixDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1lBRUQsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxJQUFJLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxHQUFHO2dCQUV4RCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQzthQUN6QixHQUFHO2dCQUVGLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBQyxDQUFDLENBQUM7YUFDN0IsQ0FBQztRQUNOLENBQUM7UUFFRCxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFdkMsSUFBTSxVQUFVLEdBQUcsb0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxvQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxXQUFDLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUM1QyxDQUFDO1lBQ0YsQ0FBQyxDQUFDLEVBQUUsR0FBRztnQkFDTCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUMxQyxDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDLEdBQUc7d0JBQ0osS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO3dCQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUM7cUJBQ3RCLENBQUM7Z0JBQ0osQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQyxHQUFHO3dCQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQzt3QkFDekIsS0FBSyxFQUFFLENBQUM7cUJBQ1QsQ0FBQztnQkFDSixDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixDQUFDLENBQUMsRUFBRSxHQUFHO3dCQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQzt3QkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDO3FCQUN2QixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUUxQyxDQUFDLENBQUMsRUFBRSxHQUFHOzRCQUNMLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUM7eUJBQ3pCLENBQUM7b0JBQ0osQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixDQUFDLENBQUMsRUFBRSxHQUFHOzRCQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQzs0QkFDekIsS0FBSyxFQUFFLENBQUM7eUJBQ1QsQ0FBQztvQkFDSixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLEVBQUUsR0FBRztvQkFDTCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsQ0FBQztpQkFDdEIsQ0FBQztnQkFDRixDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1QyxDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsSUFBSSxNQUFNLEtBQUssZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBR3BELENBQUMsQ0FBQyxFQUFFLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO29CQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzdDLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sR0FBRztvQkFDVCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUM7b0JBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQztpQkFDekIsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixDQUFDLENBQUMsQ0FBQyxHQUFHO29CQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDO2lCQUMvQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxFQUFFLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO29CQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7b0JBQzVDLE1BQU0sRUFBRSxDQUFDO2lCQUNWLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxFQUFFLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDO29CQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUM7aUJBQ3RCLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLEVBQUUsR0FBRztvQkFDTCxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUMxQixNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUNYLENBQUM7WUFDSixDQUFDO1lBRUQsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxJQUFLLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxHQUFHO2dCQUUxRCxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQzthQUN6QixHQUFHO2dCQUNGLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLFdBQUMsQ0FBQzthQUMzQixDQUFDO1FBQ04sQ0FBQztRQUVELDZCQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQTdNZSxjQUFVLGFBNk16QixDQUFBO0lBRUQsbUJBQW1CLEtBQWdCLEVBQUUsT0FBZ0I7UUFDbkQsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFHaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQztZQUNuQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNqQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUVqQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBdUIsS0FBZ0I7UUFFckMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBSGUsVUFBTSxTQUdyQixDQUFBO0FBQ0gsQ0FBQyxFQTdPZ0IsR0FBRyxHQUFILFdBQUcsS0FBSCxXQUFHLFFBNk9uQjs7OztBQ3JQRCx3QkFBbUIsZUFBZSxDQUFDLENBQUE7QUFFbkMseUJBQThCLGdCQUFnQixDQUFDLENBQUE7QUFHL0MsdUJBQW9ELFdBQVcsQ0FBQyxDQUFBO0FBR2hFLElBQWlCLElBQUksQ0E2RHBCO0FBN0RELFdBQWlCLElBQUksRUFBQyxDQUFDO0lBQ3JCO1FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRmUsYUFBUSxXQUV2QixDQUFBO0lBRUQsb0JBQTJCLEtBQWdCO1FBRXpDLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV4RCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFBQyxDQUFDO1FBRXJDLDZCQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQix3QkFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQWZlLGVBQVUsYUFlekIsQ0FBQTtJQUVELFdBQVcsUUFBa0IsRUFBRSxTQUFpQixFQUFFLE1BQWM7UUFFOUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUM7b0JBQ0wsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDOUMsQ0FBQztZQUNKLENBQUM7UUFFSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLFFBQWtCLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1FBRTlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzlDLENBQUM7WUFDSixDQUFDO1FBRUgsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxjQUFjLFFBQWtCLEVBQUUsTUFBYztRQUM5QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnQkFBdUIsS0FBZ0I7UUFFckMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBSGUsV0FBTSxTQUdyQixDQUFBO0FBQ0gsQ0FBQyxFQTdEZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBNkRwQjs7OztBQ3JFRCx3QkFBa0csZUFBZSxDQUFDLENBQUE7QUFDbEgsdUJBQXFCLGNBQWMsQ0FBQyxDQUFBO0FBQ3BDLHlCQUFrQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ25DLHlCQUErQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2hFLHFCQUEyQyxZQUFZLENBQUMsQ0FBQTtBQUN4RCxzQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFDdEMscUJBQXdDLFlBQVksQ0FBQyxDQUFBO0FBR3JELHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixvQkFBa0IsT0FBTyxDQUFDLENBQUE7QUFDMUIsdUJBQXdCLFdBQVcsQ0FBQyxDQUFBO0FBQ3BDLHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixzQkFBb0MsU0FBUyxDQUFDLENBQUE7QUFDOUMscUJBQW1CLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFHNUIsSUFBTSxZQUFZLEdBQUc7SUFDbkIsSUFBSSxFQUFFLFdBQUk7SUFDVixHQUFHLEVBQUUsU0FBRztJQUNSLElBQUksRUFBRSxXQUFJO0lBQ1YsS0FBSyxFQUFFLGFBQUs7SUFDWixJQUFJLEVBQUUsV0FBSTtJQUNWLElBQUksRUFBRSxXQUFJO0lBQ1YsSUFBSSxFQUFFLFdBQUk7SUFDVixNQUFNLEVBQUUsY0FBTTtJQUNkLE1BQU0sRUFBRSxjQUFNO0NBQ2YsQ0FBQztBQUVGLG1CQUEwQixLQUFnQjtJQUN4QyxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsQ0FBQyxXQUFJLEVBQUUsV0FBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7QUFDSCxDQUFDO0FBTmUsaUJBQVMsWUFNeEIsQ0FBQTtBQUVELHVCQUF1QixLQUFnQjtJQUNyQyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFMUIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3RCxJQUFNLFFBQVEsR0FBRyxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQztJQUMzQyxJQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEMsSUFBSSxTQUFTLEdBQVE7UUFDbkI7WUFDRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDekIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxFQUFFLGFBQU0sQ0FJVixTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsRUFHL0MsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FDdEQ7WUFDRCxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUM3RDtLQUNGLENBQUM7SUFFRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBTSxjQUFjLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMzRCxJQUFNLFNBQVMsR0FBVSxJQUFJLEtBQUssV0FBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFHckQsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBRW5ELEVBQUUsQ0FBQyxNQUFNLENBQ1AsY0FBYyxFQUVkLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUMzRCxDQUFDO1FBRUosTUFBTSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsYUFBTSxDQUdWLFNBQVMsR0FBRyxFQUFFLEdBQUcsUUFBUSxFQUN6QixFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FDdkI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE1BQU0sRUFBRTt3QkFDTixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7d0JBQ3BDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtxQkFDdkM7aUJBQ0Y7Z0JBQ0QsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0FBQ0gsQ0FBQztBQUVELDBCQUEwQixLQUFnQjtJQUN4QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3RCxJQUFNLFFBQVEsR0FBRyxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQztJQUUzQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBUTtRQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQztRQUNoQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUM3RSxDQUFDLENBQUMsQ0FBQztRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUNmO1lBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzlCLElBQUksRUFBRSxNQUFNO1NBQ2IsRUFHRCxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUVqQyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FDbkQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUNmO1FBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3pCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQ3BDLEVBRUQsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsQ0FBQyxHQUFHO1FBQ2xELElBQUksRUFBRSxhQUFNLENBR1YsU0FBUyxHQUFHLEVBQUUsR0FBRyxRQUFRLEVBRXpCLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDWCxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzlDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDO2dCQUVkLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxFQUFFO2dCQUNqRCxFQUFFLENBQ0w7S0FDRixHQUFHLEVBQUUsRUFFTixFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FDakUsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR3pELEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRWxDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUNmO2dCQUNFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDekIsSUFBSSxFQUFFLE1BQU07YUFDYixFQUdELFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBRWpDLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQzVDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxnQkFBZ0IsS0FBZ0I7SUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVoQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBUyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sTUFBTSxDQUFDLGtCQUFTLENBQUMsVUFBNkIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFLRCxvQkFBb0IsS0FBZ0I7SUFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLFdBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGtCQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsa0JBQVMsQ0FBQyxVQUE2QixDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUVOLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxlQUFNLENBQUMsVUFBVSxHQUFHLFdBQUMsR0FBRyxXQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0FBQ0gsQ0FBQztBQU1ELHNCQUFzQixLQUFnQjtJQUNwQyxNQUFNLENBQUMsQ0FBQyxlQUFLLEVBQUUsZ0JBQU0sRUFBRSxpQkFBTyxFQUFFLGVBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFTLE9BQU8sRUFBRSxPQUFPO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUdELHlCQUF5QixLQUFnQixFQUFFLE1BQWU7SUFDeEQsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUlELDBCQUEwQixLQUFnQjtJQUN4QyxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbEMsTUFBTSxDQUFDLDhCQUFvQixDQUFDLE1BQU0sQ0FBQyxVQUFTLE1BQU0sRUFBRSxPQUFPO1FBQ3pELElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxjQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQU0sUUFBUSxHQUFhLGVBQWUsQ0FBQztnQkFDM0MsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBSyxDQUFDLFFBQVEsRUFBRTtvQkFDMUIsU0FBUyxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGlCQUFTLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxRQUFRO2lCQUMzRSxDQUFDLENBQUMsQ0FBQztZQUNOLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBR0QseUJBQXlCLEtBQWdCLEVBQUUsV0FBcUI7SUFDOUQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBQztRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN0QyxPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLEVBQUUsT0FBTztRQUNmLEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQztBQUNKLENBQUM7QUFFRCx3QkFBd0IsS0FBZ0IsRUFBRSxXQUFxQjtJQUM3RCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDO1FBQzdCLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFLLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFTLENBQUM7UUFFL0UsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEtBQUs7WUFDN0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFTCxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUdoRCxJQUFJLFNBQVMsR0FBcUI7UUFDaEMsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNqRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3RDLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLE9BQU8sR0FBRyxRQUFRO1lBQ3pCLEdBQUcsRUFBRSxPQUFPLEdBQUcsTUFBTTtTQUN0QjtLQUNGLENBQUM7SUFFRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7OztBQ2xTRCx3QkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFFaEQseUJBQW9ELGdCQUFnQixDQUFDLENBQUE7QUFJckUsdUJBQW1DLFdBQVcsQ0FBQyxDQUFBO0FBRy9DLElBQWlCLEtBQUssQ0FnRnJCO0FBaEZELFdBQWlCLEtBQUssRUFBQyxDQUFDO0lBQ3RCO1FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRmUsY0FBUSxXQUV2QixDQUFBO0lBRUQsb0JBQTJCLEtBQWdCLEVBQUUsVUFBbUI7UUFFOUQsSUFBSSxDQUFDLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU5QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEQsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhELENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZGLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV4Ryw2QkFBb0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFmZSxnQkFBVSxhQWV6QixDQUFBO0lBRUQsV0FBVyxRQUFrQixFQUFFLFNBQWlCLEVBQUUsTUFBYztRQUU5RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM5QyxDQUFDO1lBQ0osQ0FBQztRQUVILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELFdBQVcsUUFBa0IsRUFBRSxTQUFpQixFQUFFLE1BQWM7UUFFOUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUM7b0JBQ0wsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEtBQUssRUFBRSxnQkFBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDOUMsQ0FBQztZQUNKLENBQUM7UUFFSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxjQUFjLFFBQThCLEVBQUUsU0FBaUIsRUFBRSxLQUFZLEVBQUUsTUFBYztRQUMzRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQztpQkFDaEQsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25DLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGVBQWUsUUFBOEIsRUFBRSxTQUFpQixFQUFFLEtBQVksRUFBRSxNQUFjLEVBQUUsVUFBbUI7UUFFakgsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQztpQkFDaEQsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0FBQ0gsQ0FBQyxFQWhGZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBZ0ZyQjtBQUVELElBQWlCLE1BQU0sQ0FhdEI7QUFiRCxXQUFpQixNQUFNLEVBQUMsQ0FBQztJQUN2QjtRQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUZlLGVBQVEsV0FFdkIsQ0FBQTtJQUVELG9CQUEyQixLQUFnQjtRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUZlLGlCQUFVLGFBRXpCLENBQUE7SUFFRCxnQkFBdUIsS0FBZ0I7UUFFckMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBSGUsYUFBTSxTQUdyQixDQUFBO0FBQ0gsQ0FBQyxFQWJnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFhdEI7QUFFRCxJQUFpQixNQUFNLENBYXRCO0FBYkQsV0FBaUIsTUFBTSxFQUFDLENBQUM7SUFDdkI7UUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFGZSxlQUFRLFdBRXZCLENBQUE7SUFFRCxvQkFBMkIsS0FBZ0I7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFGZSxpQkFBVSxhQUV6QixDQUFBO0lBRUQsZ0JBQXVCLEtBQWdCO1FBRXJDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUhlLGFBQU0sU0FHckIsQ0FBQTtBQUNILENBQUMsRUFiZ0IsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBYXRCOzs7O0FDdkhELHdCQUFpQyxlQUFlLENBQUMsQ0FBQTtBQUNqRCx1QkFBcUIsY0FBYyxDQUFDLENBQUE7QUFHcEMsdUJBQW1DLFdBQVcsQ0FBQyxDQUFBO0FBRS9DLElBQWlCLElBQUksQ0E2RnBCO0FBN0ZELFdBQWlCLElBQUksRUFBQyxDQUFDO0lBQ3JCO1FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRmUsYUFBUSxXQUV2QixDQUFBO0lBRUQsb0JBQTJCLEtBQWdCO1FBQ3pDLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztRQUdoQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxlQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsR0FBRztvQkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDN0MsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsR0FBRztvQkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDN0MsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM5QyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQyxHQUFHO29CQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM3QyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQyxHQUFHO29CQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM3QyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUM5QyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQztRQUdELDZCQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUcvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsV0FBVyxHQUFHO2dCQUNkLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQztnQkFDNUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBSSxDQUFDO2FBQ3pCLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXpFZSxlQUFVLGFBeUV6QixDQUFBO0lBRUQsbUJBQW1CLEtBQWdCO1FBQ2pDLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxnQkFBdUIsS0FBZ0I7UUFFckMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBSGUsV0FBTSxTQUdyQixDQUFBO0FBQ0gsQ0FBQyxFQTdGZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBNkZwQjs7OztBQ25HRCx3QkFBc0MsZUFBZSxDQUFDLENBQUE7QUFDdEQsdUJBQWdGLFdBQVcsQ0FBQyxDQUFBO0FBRTVGLHlCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9DLHFCQUE4QyxZQUFZLENBQUMsQ0FBQTtBQU0zRCxJQUFpQixJQUFJLENBeUhwQjtBQXpIRCxXQUFpQixNQUFJLEVBQUMsQ0FBQztJQUNyQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUZlLGVBQVEsV0FFdkIsQ0FBQTtJQUVELG9CQUEyQixLQUFnQjtRQUN6QyxNQUFNLENBQUM7WUFDTCxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQ2YsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUNmLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUNwQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQUssQ0FBQztnQkFDN0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBSyxDQUFDLENBQUMsSUFBSSxLQUFLLGNBQU8sR0FBRyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsR0FBRyxFQUFFLENBQUM7YUFDMUY7U0FDRixDQUFDO0lBQ0osQ0FBQztJQVhlLGlCQUFVLGFBV3pCLENBQUE7SUFFRCxvQkFBMkIsS0FBZ0I7UUFFekMsSUFBSSxDQUFDLEdBQVEsRUFBRSxDQUFDO1FBRWhCLHdCQUFlLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFDdEIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZO1lBQzdELFdBQVcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLENBQUM7UUFFMUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV0RSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEQsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhFLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUM7WUFFMUIsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQUMsQ0FBQztZQUFBLENBQUM7UUFDbkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sNkJBQW9CLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQTdCZSxpQkFBVSxhQTZCekIsQ0FBQTtJQUVELFdBQVcsU0FBbUIsRUFBRSxTQUFpQixFQUFFLE1BQWMsRUFBRSxZQUFxQjtRQUV0RixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUMvQyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxtQkFBWSxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVyxTQUFtQixFQUFFLFNBQWlCLEVBQUUsTUFBYztRQUUvRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQztvQkFDTCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsS0FBSyxFQUFFLGdCQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUMvQyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELGNBQWMsWUFBc0IsRUFBRSxTQUFpQixFQUFFLE1BQWM7UUFFckUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxZQUFZLENBQUM7aUJBQzNCLENBQUM7WUFDSixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFDLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsY0FBYyxZQUFzQixFQUFFLFNBQWlCLEVBQUUsTUFBYztRQUVyRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxtQkFBWSxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxJQUFNLE1BQU0sR0FBRyxxQkFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFdEUsSUFBTSxNQUFNLEdBQUcsUUFBUSxHQUFHLENBQUUsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUM7d0JBQ0wsUUFBUSxFQUFFLElBQUksR0FBRyxnQkFBSyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSTtxQkFDOUUsQ0FBQztnQkFDSixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFRLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE1BQU0sQ0FBQzt3QkFDTCxRQUFRLEVBQUUscUJBQVksQ0FBQyxnQkFBSyxDQUFDLFlBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDO3FCQUMzSSxDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQztJQUNuQyxDQUFDO0FBQ0gsQ0FBQyxFQXpIZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBeUhwQjs7OztBQ25JRCx3QkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQXFCLGNBQWMsQ0FBQyxDQUFBO0FBQ3BDLHlCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBSy9DLHVCQUFtQyxXQUFXLENBQUMsQ0FBQTtBQUUvQyxJQUFpQixJQUFJLENBaUZwQjtBQWpGRCxXQUFpQixJQUFJLEVBQUMsQ0FBQztJQUNyQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUZlLGFBQVEsV0FFdkIsQ0FBQTtJQUVELG9CQUEyQixLQUFnQjtRQUN6QyxJQUFJLENBQUMsR0FBUSxFQUFFLENBQUM7UUFDaEIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBSTlCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV6RCxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssZUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMvQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RyxDQUFDO1FBRUQsNkJBQW9CLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBcEJlLGVBQVUsYUFvQnpCLENBQUE7SUFFRCxXQUFXLFFBQWtCLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1FBRTlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzlDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBQyxDQUFDO1lBQ2pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxXQUFXLFFBQWtCLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1FBRTlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxTQUFTO29CQUNoQixLQUFLLEVBQUUsZ0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzlDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBQyxDQUFDO1lBQ2pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxjQUFjLFFBQWtCLEVBQUUsU0FBaUIsRUFBRSxNQUFjLEVBQUUsYUFBcUI7UUFDeEYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUM7b0JBQ0wsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztpQkFDdEIsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25DLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFNLFFBQVEsR0FBRyxhQUFhLEtBQUssU0FBUztZQUMxQyxhQUFhO1lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDeEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQXVCLEtBQWdCO1FBRXJDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUhlLFdBQU0sU0FHckIsQ0FBQTtBQUNILENBQUMsRUFqRmdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQWlGcEI7Ozs7QUN6RkQsd0JBQWlDLFlBQVksQ0FBQyxDQUFBO0FBRzlDLHlCQUEwRCxhQUFhLENBQUMsQ0FBQTtBQUN4RSx5QkFBOEMsYUFBYSxDQUFDLENBQUE7QUFFNUQsc0JBQStCLFVBQVUsQ0FBQyxDQUFBO0FBSTFDLHFCQUFtRCxTQUFTLENBQUMsQ0FBQTtBQWlDN0Q7SUFHRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBa0IsQ0FBQztJQUNyQyxDQUFDO0lBRU0sd0JBQU0sR0FBYixVQUFjLE9BQWUsRUFBRSxPQUFlO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBRyxHQUFWLFVBQVcsSUFBWTtRQUdyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FwQkEsQUFvQkMsSUFBQTtBQUVEO0lBNkJFLGVBQVksSUFBYyxFQUFFLE1BQWEsRUFBRSxlQUF1QjtRQUp4RCxjQUFTLEdBQWEsRUFBRSxDQUFDO1FBS2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBR3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxlQUFlLENBQUM7UUFHMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFakUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ25JLENBQUM7SUFHTSxxQkFBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBNkJNLDhCQUFjLEdBQXJCO1FBR0UsTUFBTSxDQUFDLGNBQU8sQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUF1QjtZQUNwRSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBSU0sNEJBQVksR0FBbkI7UUFDRSxNQUFNLENBQUMsV0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLCtCQUFlLEdBQXRCO1FBQ0UsTUFBTSxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSw2QkFBYSxHQUFwQjtRQUNFLElBQUksS0FBSyxHQUFnQixFQUFFLENBQUM7UUFJNUIsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMxQixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFRTSxzQkFBTSxHQUFiLFVBQWMsQ0FBOEMsRUFBRSxJQUFJLEVBQUUsQ0FBTztRQUN6RSxNQUFNLENBQUMsK0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSx1QkFBTyxHQUFkLFVBQWUsQ0FBK0MsRUFBRSxDQUFPO1FBQ3JFLGdDQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFJTSxzQkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLG9CQUFJLEdBQVgsVUFBWSxJQUFZLEVBQUUsU0FBdUI7UUFBdkIseUJBQXVCLEdBQXZCLGVBQXVCO1FBQy9DLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzNELENBQUM7SUFFTSwyQkFBVyxHQUFsQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQkFBSSxHQUFYO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLDBCQUFVLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxPQUFlO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBUU0sd0JBQVEsR0FBZixVQUFnQixjQUF5QjtRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwwQkFBVSxHQUFqQixVQUFrQixPQUFlLEVBQUUsT0FBZTtRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLCtCQUFlLEdBQXRCLFVBQXVCLE9BQWdCO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxXQUFDLElBQUksT0FBTyxLQUFLLGdCQUFNLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLElBQVk7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUlNLHlCQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFHTSxxQkFBSyxHQUFaLFVBQWEsT0FBZ0IsRUFBRSxHQUF3QjtRQUF4QixtQkFBd0IsR0FBeEIsUUFBd0I7UUFDckQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQixHQUFHLEdBQUcsYUFBTSxDQUFDO2dCQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUTthQUNoRixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUVELE1BQU0sQ0FBQyxnQkFBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBSU0scUJBQUssR0FBWixVQUFhLE9BQWdCO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHTSw4QkFBYyxHQUFyQixVQUFzQixPQUFnQjtRQUNwQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLE9BQU8sQ0FBQztJQUNuRCxDQUFDO0lBRU0sMkJBQVcsR0FBbEIsVUFBbUIsT0FBZSxFQUFFLE9BQWU7UUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHTSx5QkFBUyxHQUFoQixVQUFpQixPQUF1QjtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sb0JBQUksR0FBWCxVQUFZLE9BQWdCO1FBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUlNLG9CQUFJLEdBQVgsVUFBWSxPQUFnQjtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sc0JBQU0sR0FBYixVQUFjLE9BQWdCO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFLTSxzQkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLDBCQUFVLEdBQWpCLFVBQWtCLE9BQWU7UUFDL0IsY0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSx3QkFBUSxHQUFmO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUtNLHNCQUFNLEdBQWI7UUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNNLHVCQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNNLHVCQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILFlBQUM7QUFBRCxDQXJSQSxBQXFSQyxJQUFBO0FBclJxQixhQUFLLFFBcVIxQixDQUFBOzs7O0FDcFZELDBCQUFnQyxjQUFjLENBQUMsQ0FBQTtBQUMvQyx3QkFBOEYsWUFBWSxDQUFDLENBQUE7QUFDM0csdUJBQXFCLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLHFCQUFvQyxTQUFTLENBQUMsQ0FBQTtBQUM5Qyx5QkFBeUMsYUFBYSxDQUFDLENBQUE7QUFDdkQscUJBQXNELFNBQVMsQ0FBQyxDQUFBO0FBQ2hFLHNCQUF5QyxVQUFVLENBQUMsQ0FBQTtBQUNwRCxxQkFBcUMsU0FBUyxDQUFDLENBQUE7QUFDL0Msc0JBQTBCLFVBQVUsQ0FBQyxDQUFBO0FBQ3JDLHFCQUF1RCxTQUFTLENBQUMsQ0FBQTtBQUNqRSxxQkFBcUMsU0FBUyxDQUFDLENBQUE7QUFJL0MseUJBQXdELGFBQWEsQ0FBQyxDQUFBO0FBT3pELG9CQUFZLEdBQUcsY0FBYyxDQUFDO0FBRzlCLDBCQUFrQixHQUFHLG9CQUFvQixDQUFDO0FBZXZELDZCQUFvQyxLQUFZO0lBRTlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVMsS0FBNEIsRUFBRSxPQUFnQjtRQUNsRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLElBQU0sTUFBTSxHQUFvQjtnQkFDOUIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQzthQUMvQyxDQUFDO1lBSUYsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGVBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxjQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqSCxNQUFNLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsd0JBQXdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO1lBQ0gsQ0FBQztZQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUUsRUFBMkIsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUF0QmUsMkJBQW1CLHNCQXNCbEMsQ0FBQTtBQUtELHdCQUF3QixLQUFZLEVBQUUsUUFBa0IsRUFBRSxPQUFnQjtJQUN4RSxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsSUFBSSxRQUFRLEdBQVE7UUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtLQUNqQixDQUFDO0lBR0YsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGFBQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVB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QUMsTUFBTSxLQUFLLGVBQU0sQ0FBQyxVQUFVLEdBQUcsV0FBQyxHQUFHLFdBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDO1lBQ3JGLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLFdBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssV0FBSSxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxXQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzdDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsY0FBYyxFQUFDLENBQUM7WUFDN0MsQ0FBQztZQUVELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQ3ZELEtBQUssZUFBSztZQUNSLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsVUFBVSxFQUFDLENBQUM7UUFDekMsS0FBSyxlQUFLO1lBQ1IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxjQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixFQUFDLENBQUM7WUFDaEQsQ0FBQztZQUVELE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsb0JBQW9CLEVBQUMsQ0FBQztRQUNuRCxLQUFLLGlCQUFPO1lBQ1YsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNaLENBQUM7QUF4RWUsbUJBQVcsY0F3RTFCLENBQUE7QUFFRCx1QkFBdUIsS0FBZ0I7SUFDckMsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztJQUV6QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxDQUFDLENBQUM7SUFFMUIsSUFBTSxVQUFVLEdBQUcsb0JBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsSUFBTSxVQUFVLEdBQUcsb0JBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVO1lBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFdBQUMsR0FBRyxXQUFDLENBQUMsQ0FBQyxRQUFRO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQ04sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsRUFDL0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FDaEQsQ0FBQztJQUNOLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDdkMsQ0FBQztBQUVELGVBQXNCLEtBQVk7SUFHaEMsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQVMsQ0FBQyxHQUFHLEVBQUUsaUJBQVMsQ0FBQyxJQUFJO1FBQ3ZELGlCQUFTLENBQUMsR0FBRyxFQUFFLGlCQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FB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LFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDekIsZ0JBQVEsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUVsQyxlQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ2QzLXRpbWUnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfdGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcbiAgdmFyIHQxID0gbmV3IERhdGU7XG4gIGZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQsIGZpZWxkKSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdDAuc2V0VGltZSgrc3RhcnQpLCB0MS5zZXRUaW1lKCtlbmQpO1xuICAgICAgICBmbG9vcmkodDApLCBmbG9vcmkodDEpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICAgIH07XG5cbiAgICAgIGludGVydmFsLmV2ZXJ5ID0gZnVuY3Rpb24oc3RlcCkge1xuICAgICAgICBzdGVwID0gTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgICAgcmV0dXJuICFpc0Zpbml0ZShzdGVwKSB8fCAhKHN0ZXAgPiAwKSA/IG51bGxcbiAgICAgICAgICAgIDogIShzdGVwID4gMSkgPyBpbnRlcnZhbFxuICAgICAgICAgICAgOiBpbnRlcnZhbC5maWx0ZXIoZmllbGRcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGZpZWxkKGQpICUgc3RlcCA9PT0gMDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24oZCkgeyByZXR1cm4gaW50ZXJ2YWwuY291bnQoMCwgZCkgJSBzdGVwID09PSAwOyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9O1xuXG4gIHZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIG5vb3BcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xuICB9KTtcblxuICAvLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG4gIG1pbGxpc2Vjb25kLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLmZsb29yKGspO1xuICAgIGlmICghaXNGaW5pdGUoaykgfHwgIShrID4gMCkpIHJldHVybiBudWxsO1xuICAgIGlmICghKGsgPiAxKSkgcmV0dXJuIG1pbGxpc2Vjb25kO1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gaykgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBrO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gd2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN1bmRheSA9IHdlZWtkYXkoMCk7XG4gIHZhciBtb25kYXkgPSB3ZWVrZGF5KDEpO1xuICB2YXIgdHVlc2RheSA9IHdlZWtkYXkoMik7XG4gIHZhciB3ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xuICB2YXIgdGh1cnNkYXkgPSB3ZWVrZGF5KDQpO1xuICB2YXIgZnJpZGF5ID0gd2Vla2RheSg1KTtcbiAgdmFyIHNhdHVyZGF5ID0gd2Vla2RheSg2KTtcblxuICB2YXIgbW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldERhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9KTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNTZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgdXRjTWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNIb3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNEYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gKGRhdGUuZ2V0VVRDRGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbiAgdmFyIHV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG4gIHZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbiAgdmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG4gIHZhciB1dGNUaHVyc2RheSA9IHV0Y1dlZWtkYXkoNCk7XG4gIHZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuICB2YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNZZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xuICB2YXIgc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcbiAgdmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG4gIHZhciBob3VycyA9IGhvdXIucmFuZ2U7XG4gIHZhciBkYXlzID0gZGF5LnJhbmdlO1xuICB2YXIgc3VuZGF5cyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG4gIHZhciB0dWVzZGF5cyA9IHR1ZXNkYXkucmFuZ2U7XG4gIHZhciB3ZWRuZXNkYXlzID0gd2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG4gIHZhciBmcmlkYXlzID0gZnJpZGF5LnJhbmdlO1xuICB2YXIgc2F0dXJkYXlzID0gc2F0dXJkYXkucmFuZ2U7XG4gIHZhciB3ZWVrcyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbnRocyA9IG1vbnRoLnJhbmdlO1xuICB2YXIgeWVhcnMgPSB5ZWFyLnJhbmdlO1xuXG4gIHZhciB1dGNNaWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICB2YXIgdXRjTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICB2YXIgdXRjU2Vjb25kcyA9IHV0Y1NlY29uZC5yYW5nZTtcbiAgdmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG4gIHZhciB1dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG4gIHZhciB1dGNEYXlzID0gdXRjRGF5LnJhbmdlO1xuICB2YXIgdXRjU3VuZGF5cyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbmRheXMgPSB1dGNNb25kYXkucmFuZ2U7XG4gIHZhciB1dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXkucmFuZ2U7XG4gIHZhciB1dGNGcmlkYXlzID0gdXRjRnJpZGF5LnJhbmdlO1xuICB2YXIgdXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWVrcyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbnRocyA9IHV0Y01vbnRoLnJhbmdlO1xuICB2YXIgdXRjWWVhcnMgPSB1dGNZZWFyLnJhbmdlO1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjEuMVwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnNlY29uZHMgPSBzZWNvbmRzO1xuICBleHBvcnRzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICBleHBvcnRzLmhvdXJzID0gaG91cnM7XG4gIGV4cG9ydHMuZGF5cyA9IGRheXM7XG4gIGV4cG9ydHMuc3VuZGF5cyA9IHN1bmRheXM7XG4gIGV4cG9ydHMubW9uZGF5cyA9IG1vbmRheXM7XG4gIGV4cG9ydHMudHVlc2RheXMgPSB0dWVzZGF5cztcbiAgZXhwb3J0cy53ZWRuZXNkYXlzID0gd2VkbmVzZGF5cztcbiAgZXhwb3J0cy50aHVyc2RheXMgPSB0aHVyc2RheXM7XG4gIGV4cG9ydHMuZnJpZGF5cyA9IGZyaWRheXM7XG4gIGV4cG9ydHMuc2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuICBleHBvcnRzLndlZWtzID0gd2Vla3M7XG4gIGV4cG9ydHMubW9udGhzID0gbW9udGhzO1xuICBleHBvcnRzLnllYXJzID0geWVhcnM7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmQgPSB1dGNNaWxsaXNlY29uZDtcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZHMgPSB1dGNNaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMudXRjU2Vjb25kcyA9IHV0Y1NlY29uZHM7XG4gIGV4cG9ydHMudXRjTWludXRlcyA9IHV0Y01pbnV0ZXM7XG4gIGV4cG9ydHMudXRjSG91cnMgPSB1dGNIb3VycztcbiAgZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbiAgZXhwb3J0cy51dGNTdW5kYXlzID0gdXRjU3VuZGF5cztcbiAgZXhwb3J0cy51dGNNb25kYXlzID0gdXRjTW9uZGF5cztcbiAgZXhwb3J0cy51dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXlzO1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXlzO1xuICBleHBvcnRzLnV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5cztcbiAgZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbiAgZXhwb3J0cy51dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheXM7XG4gIGV4cG9ydHMudXRjV2Vla3MgPSB1dGNXZWVrcztcbiAgZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG4gIGV4cG9ydHMudXRjWWVhcnMgPSB1dGNZZWFycztcbiAgZXhwb3J0cy5taWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICBleHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy5taW51dGUgPSBtaW51dGU7XG4gIGV4cG9ydHMuaG91ciA9IGhvdXI7XG4gIGV4cG9ydHMuZGF5ID0gZGF5O1xuICBleHBvcnRzLnN1bmRheSA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb25kYXkgPSBtb25kYXk7XG4gIGV4cG9ydHMudHVlc2RheSA9IHR1ZXNkYXk7XG4gIGV4cG9ydHMud2VkbmVzZGF5ID0gd2VkbmVzZGF5O1xuICBleHBvcnRzLnRodXJzZGF5ID0gdGh1cnNkYXk7XG4gIGV4cG9ydHMuZnJpZGF5ID0gZnJpZGF5O1xuICBleHBvcnRzLnNhdHVyZGF5ID0gc2F0dXJkYXk7XG4gIGV4cG9ydHMud2VlayA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb250aCA9IG1vbnRoO1xuICBleHBvcnRzLnllYXIgPSB5ZWFyO1xuICBleHBvcnRzLnV0Y1NlY29uZCA9IHV0Y1NlY29uZDtcbiAgZXhwb3J0cy51dGNNaW51dGUgPSB1dGNNaW51dGU7XG4gIGV4cG9ydHMudXRjSG91ciA9IHV0Y0hvdXI7XG4gIGV4cG9ydHMudXRjRGF5ID0gdXRjRGF5O1xuICBleHBvcnRzLnV0Y1N1bmRheSA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb25kYXkgPSB1dGNNb25kYXk7XG4gIGV4cG9ydHMudXRjVHVlc2RheSA9IHV0Y1R1ZXNkYXk7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG4gIGV4cG9ydHMudXRjRnJpZGF5ID0gdXRjRnJpZGF5O1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5ID0gdXRjU2F0dXJkYXk7XG4gIGV4cG9ydHMudXRjV2VlayA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuICBleHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyO1xuICBleHBvcnRzLmludGVydmFsID0gbmV3SW50ZXJ2YWw7XG5cbn0pKTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi4vdGltZScpLFxuICAgIEVQU0lMT04gPSAxZS0xNTtcblxuZnVuY3Rpb24gYmlucyhvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBkZXRlcm1pbmUgcmFuZ2VcbiAgdmFyIG1heGIgPSBvcHQubWF4YmlucyB8fCAxNSxcbiAgICAgIGJhc2UgPSBvcHQuYmFzZSB8fCAxMCxcbiAgICAgIGxvZ2IgPSBNYXRoLmxvZyhiYXNlKSxcbiAgICAgIGRpdiA9IG9wdC5kaXYgfHwgWzUsIDJdLFxuICAgICAgbWluID0gb3B0Lm1pbixcbiAgICAgIG1heCA9IG9wdC5tYXgsXG4gICAgICBzcGFuID0gbWF4IC0gbWluLFxuICAgICAgc3RlcCwgbGV2ZWwsIG1pbnN0ZXAsIHByZWNpc2lvbiwgdiwgaSwgZXBzO1xuXG4gIGlmIChvcHQuc3RlcCkge1xuICAgIC8vIGlmIHN0ZXAgc2l6ZSBpcyBleHBsaWNpdGx5IGdpdmVuLCB1c2UgdGhhdFxuICAgIHN0ZXAgPSBvcHQuc3RlcDtcbiAgfSBlbHNlIGlmIChvcHQuc3RlcHMpIHtcbiAgICAvLyBpZiBwcm92aWRlZCwgbGltaXQgY2hvaWNlIHRvIGFjY2VwdGFibGUgc3RlcCBzaXplc1xuICAgIHN0ZXAgPSBvcHQuc3RlcHNbTWF0aC5taW4oXG4gICAgICBvcHQuc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgIGJpc2VjdChvcHQuc3RlcHMsIHNwYW4vbWF4YiwgMCwgb3B0LnN0ZXBzLmxlbmd0aClcbiAgICApXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVzZSBzcGFuIHRvIGRldGVybWluZSBzdGVwIHNpemVcbiAgICBsZXZlbCA9IE1hdGguY2VpbChNYXRoLmxvZyhtYXhiKSAvIGxvZ2IpO1xuICAgIG1pbnN0ZXAgPSBvcHQubWluc3RlcCB8fCAwO1xuICAgIHN0ZXAgPSBNYXRoLm1heChcbiAgICAgIG1pbnN0ZXAsXG4gICAgICBNYXRoLnBvdyhiYXNlLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gbG9nYikgLSBsZXZlbClcbiAgICApO1xuXG4gICAgLy8gaW5jcmVhc2Ugc3RlcCBzaXplIGlmIHRvbyBtYW55IGJpbnNcbiAgICB3aGlsZSAoTWF0aC5jZWlsKHNwYW4vc3RlcCkgPiBtYXhiKSB7IHN0ZXAgKj0gYmFzZTsgfVxuXG4gICAgLy8gZGVjcmVhc2Ugc3RlcCBzaXplIGlmIGFsbG93ZWRcbiAgICBmb3IgKGk9MDsgaTxkaXYubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBzdGVwIC8gZGl2W2ldO1xuICAgICAgaWYgKHYgPj0gbWluc3RlcCAmJiBzcGFuIC8gdiA8PSBtYXhiKSBzdGVwID0gdjtcbiAgICB9XG4gIH1cblxuICAvLyB1cGRhdGUgcHJlY2lzaW9uLCBtaW4gYW5kIG1heFxuICB2ID0gTWF0aC5sb2coc3RlcCk7XG4gIHByZWNpc2lvbiA9IHYgPj0gMCA/IDAgOiB+figtdiAvIGxvZ2IpICsgMTtcbiAgZXBzID0gTWF0aC5wb3coYmFzZSwgLXByZWNpc2lvbiAtIDEpO1xuICBtaW4gPSBNYXRoLm1pbihtaW4sIE1hdGguZmxvb3IobWluIC8gc3RlcCArIGVwcykgKiBzdGVwKTtcbiAgbWF4ID0gTWF0aC5jZWlsKG1heCAvIHN0ZXApICogc3RlcDtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBtaW4sXG4gICAgc3RvcDogIG1heCxcbiAgICBzdGVwOiAgc3RlcCxcbiAgICB1bml0OiAge3ByZWNpc2lvbjogcHJlY2lzaW9ufSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpc2VjdChhLCB4LCBsbywgaGkpIHtcbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICBpZiAodXRpbC5jbXAoYVttaWRdLCB4KSA8IDApIHsgbG8gPSBtaWQgKyAxOyB9XG4gICAgZWxzZSB7IGhpID0gbWlkOyB9XG4gIH1cbiAgcmV0dXJuIGxvO1xufVxuXG5mdW5jdGlvbiB2YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnN0ZXAgKiBNYXRoLmZsb29yKHYgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gaW5kZXgodikge1xuICByZXR1cm4gTWF0aC5mbG9vcigodiAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGRhdGVfdmFsdWUodikge1xuICByZXR1cm4gdGhpcy51bml0LmRhdGUodmFsdWUuY2FsbCh0aGlzLCB2KSk7XG59XG5cbmZ1bmN0aW9uIGRhdGVfaW5kZXgodikge1xuICByZXR1cm4gaW5kZXguY2FsbCh0aGlzLCB0aGlzLnVuaXQudW5pdCh2KSk7XG59XG5cbmJpbnMuZGF0ZSA9IGZ1bmN0aW9uKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgZGF0ZSBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZmluZCB0aW1lIHN0ZXAsIHRoZW4gYmluXG4gIHZhciB1bml0cyA9IG9wdC51dGMgPyB0aW1lLnV0YyA6IHRpbWUsXG4gICAgICBkbWluID0gb3B0Lm1pbixcbiAgICAgIGRtYXggPSBvcHQubWF4LFxuICAgICAgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDIwLFxuICAgICAgbWluYiA9IG9wdC5taW5iaW5zIHx8IDQsXG4gICAgICBzcGFuID0gKCtkbWF4KSAtICgrZG1pbiksXG4gICAgICB1bml0ID0gb3B0LnVuaXQgPyB1bml0c1tvcHQudW5pdF0gOiB1bml0cy5maW5kKHNwYW4sIG1pbmIsIG1heGIpLFxuICAgICAgc3BlYyA9IGJpbnMoe1xuICAgICAgICBtaW46ICAgICB1bml0Lm1pbiAhPSBudWxsID8gdW5pdC5taW4gOiB1bml0LnVuaXQoZG1pbiksXG4gICAgICAgIG1heDogICAgIHVuaXQubWF4ICE9IG51bGwgPyB1bml0Lm1heCA6IHVuaXQudW5pdChkbWF4KSxcbiAgICAgICAgbWF4YmluczogbWF4YixcbiAgICAgICAgbWluc3RlcDogdW5pdC5taW5zdGVwLFxuICAgICAgICBzdGVwczogICB1bml0LnN0ZXBcbiAgICAgIH0pO1xuXG4gIHNwZWMudW5pdCA9IHVuaXQ7XG4gIHNwZWMuaW5kZXggPSBkYXRlX2luZGV4O1xuICBpZiAoIW9wdC5yYXcpIHNwZWMudmFsdWUgPSBkYXRlX3ZhbHVlO1xuICByZXR1cm4gc3BlYztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmlucztcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgZ2VuID0gbW9kdWxlLmV4cG9ydHM7XG5cbmdlbi5yZXBlYXQgPSBmdW5jdGlvbih2YWwsIG4pIHtcbiAgdmFyIGEgPSBBcnJheShuKSwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBhW2ldID0gdmFsO1xuICByZXR1cm4gYTtcbn07XG5cbmdlbi56ZXJvcyA9IGZ1bmN0aW9uKG4pIHtcbiAgcmV0dXJuIGdlbi5yZXBlYXQoMCwgbik7XG59O1xuXG5nZW4ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICBzdGVwID0gMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gIH1cbiAgaWYgKChzdG9wIC0gc3RhcnQpIC8gc3RlcCA9PSBJbmZpbml0eSkgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSByYW5nZScpO1xuICB2YXIgcmFuZ2UgPSBbXSwgaSA9IC0xLCBqO1xuICBpZiAoc3RlcCA8IDApIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPiBzdG9wKSByYW5nZS5wdXNoKGopO1xuICBlbHNlIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPCBzdG9wKSByYW5nZS5wdXNoKGopO1xuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5nZW4ucmFuZG9tID0ge307XG5cbmdlbi5yYW5kb20udW5pZm9ybSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgIG1heCA9IG1pbiA9PT0gdW5kZWZpbmVkID8gMSA6IG1pbjtcbiAgICBtaW4gPSAwO1xuICB9XG4gIHZhciBkID0gbWF4IC0gbWluO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaW4gKyBkICogTWF0aC5yYW5kb20oKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPj0gbWluICYmIHggPD0gbWF4KSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4IDwgbWluID8gMCA6IHggPiBtYXggPyAxIDogKHggLSBtaW4pIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBtaW4gKyBwKmQgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYiA9IGE7XG4gICAgYSA9IDA7XG4gIH1cbiAgdmFyIGQgPSBiIC0gYTtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYSArIE1hdGguZmxvb3IoZCAqIE1hdGgucmFuZG9tKCkpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA9PT0gTWF0aC5mbG9vcih4KSAmJiB4ID49IGEgJiYgeCA8IGIpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIHYgPSBNYXRoLmZsb29yKHgpO1xuICAgIHJldHVybiB2IDwgYSA/IDAgOiB2ID49IGIgPyAxIDogKHYgLSBhICsgMSkgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IGEgLSAxICsgTWF0aC5mbG9vcihwKmQpIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20ubm9ybWFsID0gZnVuY3Rpb24obWVhbiwgc3RkZXYpIHtcbiAgbWVhbiA9IG1lYW4gfHwgMDtcbiAgc3RkZXYgPSBzdGRldiB8fCAxO1xuICB2YXIgbmV4dDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgeCA9IDAsIHkgPSAwLCByZHMsIGM7XG4gICAgaWYgKG5leHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeCA9IG5leHQ7XG4gICAgICBuZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGRvIHtcbiAgICAgIHggPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHkgPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHJkcyA9IHgqeCArIHkqeTtcbiAgICB9IHdoaWxlIChyZHMgPT09IDAgfHwgcmRzID4gMSk7XG4gICAgYyA9IE1hdGguc3FydCgtMipNYXRoLmxvZyhyZHMpL3Jkcyk7IC8vIEJveC1NdWxsZXIgdHJhbnNmb3JtXG4gICAgbmV4dCA9IG1lYW4gKyB5KmMqc3RkZXY7XG4gICAgcmV0dXJuIG1lYW4gKyB4KmMqc3RkZXY7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIGV4cCA9IE1hdGguZXhwKE1hdGgucG93KHgtbWVhbiwgMikgLyAoLTIgKiBNYXRoLnBvdyhzdGRldiwgMikpKTtcbiAgICByZXR1cm4gKDEgLyAoc3RkZXYgKiBNYXRoLnNxcnQoMipNYXRoLlBJKSkpICogZXhwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIGZyb20gV2VzdCAoMjAwOSlcbiAgICAvLyBCZXR0ZXIgQXBwcm94aW1hdGlvbnMgdG8gQ3VtdWxhdGl2ZSBOb3JtYWwgRnVuY3Rpb25zXG4gICAgdmFyIGNkLFxuICAgICAgICB6ID0gKHggLSBtZWFuKSAvIHN0ZGV2LFxuICAgICAgICBaID0gTWF0aC5hYnMoeik7XG4gICAgaWYgKFogPiAzNykge1xuICAgICAgY2QgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3VtLCBleHAgPSBNYXRoLmV4cCgtWipaLzIpO1xuICAgICAgaWYgKFogPCA3LjA3MTA2NzgxMTg2NTQ3KSB7XG4gICAgICAgIHN1bSA9IDMuNTI2MjQ5NjU5OTg5MTFlLTAyICogWiArIDAuNzAwMzgzMDY0NDQzNjg4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNi4zNzM5NjIyMDM1MzE2NTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDMzLjkxMjg2NjA3ODM4MztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDExMi4wNzkyOTE0OTc4NzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjEuMjEzNTk2MTY5OTMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIwLjIwNjg2NzkxMjM3NjtcbiAgICAgICAgY2QgPSBleHAgKiBzdW07XG4gICAgICAgIHN1bSA9IDguODM4ODM0NzY0ODMxODRlLTAyICogWiArIDEuNzU1NjY3MTYzMTgyNjQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxNi4wNjQxNzc1NzkyMDc7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA4Ni43ODA3MzIyMDI5NDYxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjk2LjU2NDI0ODc3OTY3NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYzNy4zMzM2MzMzNzg4MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA3OTMuODI2NTEyNTE5OTQ4O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNDQwLjQxMzczNTgyNDc1MjtcbiAgICAgICAgY2QgPSBjZCAvIHN1bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bSA9IFogKyAwLjY1O1xuICAgICAgICBzdW0gPSBaICsgNCAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDMgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAyIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMSAvIHN1bTtcbiAgICAgICAgY2QgPSBleHAgLyBzdW0gLyAyLjUwNjYyODI3NDYzMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHogPiAwID8gMSAtIGNkIDogY2Q7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICAvLyBBcHByb3hpbWF0aW9uIG9mIFByb2JpdCBmdW5jdGlvbiB1c2luZyBpbnZlcnNlIGVycm9yIGZ1bmN0aW9uLlxuICAgIGlmIChwIDw9IDAgfHwgcCA+PSAxKSByZXR1cm4gTmFOO1xuICAgIHZhciB4ID0gMipwIC0gMSxcbiAgICAgICAgdiA9ICg4ICogKE1hdGguUEkgLSAzKSkgLyAoMyAqIE1hdGguUEkgKiAoNC1NYXRoLlBJKSksXG4gICAgICAgIGEgPSAoMiAvIChNYXRoLlBJKnYpKSArIChNYXRoLmxvZygxIC0gTWF0aC5wb3coeCwyKSkgLyAyKSxcbiAgICAgICAgYiA9IE1hdGgubG9nKDEgLSAoeCp4KSkgLyB2LFxuICAgICAgICBzID0gKHggPiAwID8gMSA6IC0xKSAqIE1hdGguc3FydChNYXRoLnNxcnQoKGEqYSkgLSBiKSAtIGEpO1xuICAgIHJldHVybiBtZWFuICsgc3RkZXYgKiBNYXRoLlNRUlQyICogcztcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmJvb3RzdHJhcCA9IGZ1bmN0aW9uKGRvbWFpbiwgc21vb3RoKSB7XG4gIC8vIEdlbmVyYXRlcyBhIGJvb3RzdHJhcCBzYW1wbGUgZnJvbSBhIHNldCBvZiBvYnNlcnZhdGlvbnMuXG4gIC8vIFNtb290aCBib290c3RyYXBwaW5nIGFkZHMgcmFuZG9tIHplcm8tY2VudGVyZWQgbm9pc2UgdG8gdGhlIHNhbXBsZXMuXG4gIHZhciB2YWwgPSBkb21haW4uZmlsdGVyKHV0aWwuaXNWYWxpZCksXG4gICAgICBsZW4gPSB2YWwubGVuZ3RoLFxuICAgICAgZXJyID0gc21vb3RoID8gZ2VuLnJhbmRvbS5ub3JtYWwoMCwgc21vb3RoKSA6IG51bGw7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbFt+fihNYXRoLnJhbmRvbSgpKmxlbildICsgKGVyciA/IGVycigpIDogMCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59OyIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpO1xuXG52YXIgdGVtcERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGJhc2VEYXRlID0gbmV3IERhdGUoMCwgMCwgMSkuc2V0RnVsbFllYXIoMCksIC8vIEphbiAxLCAwIEFEXG4gICAgdXRjQmFzZURhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygwLCAwLCAxKSkuc2V0VVRDRnVsbFllYXIoMCk7XG5cbmZ1bmN0aW9uIGRhdGUoZCkge1xuICByZXR1cm4gKHRlbXBEYXRlLnNldFRpbWUoK2QpLCB0ZW1wRGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIHRpbWUgdW5pdCBlbnRyeVxuZnVuY3Rpb24gZW50cnkodHlwZSwgZGF0ZSwgdW5pdCwgc3RlcCwgbWluLCBtYXgpIHtcbiAgdmFyIGUgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIHVuaXQ6IHVuaXRcbiAgfTtcbiAgaWYgKHN0ZXApIHtcbiAgICBlLnN0ZXAgPSBzdGVwO1xuICB9IGVsc2Uge1xuICAgIGUubWluc3RlcCA9IDE7XG4gIH1cbiAgaWYgKG1pbiAhPSBudWxsKSBlLm1pbiA9IG1pbjtcbiAgaWYgKG1heCAhPSBudWxsKSBlLm1heCA9IG1heDtcbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0eXBlLCB1bml0LCBiYXNlLCBzdGVwLCBtaW4sIG1heCkge1xuICByZXR1cm4gZW50cnkodHlwZSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0Lm9mZnNldChiYXNlLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0LmNvdW50KGJhc2UsIGQpOyB9LFxuICAgIHN0ZXAsIG1pbiwgbWF4KTtcbn1cblxudmFyIGxvY2FsZSA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnNlY29uZCwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUubWludXRlLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS5ob3VyLCAgIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLmRheSwgICAgYmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS5tb250aCwgIGJhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUueWVhciwgICBiYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0U2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0SG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDQrZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIGQgJSAxMiwgMSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIHV0YyA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnV0Y1NlY29uZCwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUudXRjTWludXRlLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS51dGNIb3VyLCAgIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLnV0Y0RheSwgICAgdXRjQmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS51dGNNb250aCwgIHV0Y0Jhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUudXRjWWVhciwgICB1dGNCYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ1NlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDSG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDQrZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgZCAlIDEyLCAxKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIFNURVBTID0gW1xuICBbMzE1MzZlNiwgNV0sICAvLyAxLXllYXJcbiAgWzc3NzZlNiwgNF0sICAgLy8gMy1tb250aFxuICBbMjU5MmU2LCA0XSwgICAvLyAxLW1vbnRoXG4gIFsxMjA5NmU1LCAzXSwgIC8vIDItd2Vla1xuICBbNjA0OGU1LCAzXSwgICAvLyAxLXdlZWtcbiAgWzE3MjhlNSwgM10sICAgLy8gMi1kYXlcbiAgWzg2NGU1LCAzXSwgICAgLy8gMS1kYXlcbiAgWzQzMmU1LCAyXSwgICAgLy8gMTItaG91clxuICBbMjE2ZTUsIDJdLCAgICAvLyA2LWhvdXJcbiAgWzEwOGU1LCAyXSwgICAgLy8gMy1ob3VyXG4gIFszNmU1LCAyXSwgICAgIC8vIDEtaG91clxuICBbMThlNSwgMV0sICAgICAvLyAzMC1taW51dGVcbiAgWzllNSwgMV0sICAgICAgLy8gMTUtbWludXRlXG4gIFszZTUsIDFdLCAgICAgIC8vIDUtbWludXRlXG4gIFs2ZTQsIDFdLCAgICAgIC8vIDEtbWludXRlXG4gIFszZTQsIDBdLCAgICAgIC8vIDMwLXNlY29uZFxuICBbMTVlMywgMF0sICAgICAvLyAxNS1zZWNvbmRcbiAgWzVlMywgMF0sICAgICAgLy8gNS1zZWNvbmRcbiAgWzFlMywgMF0gICAgICAgLy8gMS1zZWNvbmRcbl07XG5cbmZ1bmN0aW9uIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIHN0ZXAgPSBTVEVQU1swXSwgaSwgbiwgYmlucztcblxuICBmb3IgKGk9MSwgbj1TVEVQUy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tTVEVQU1tpLTFdWzFdXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaW5zID49IG1pbmIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pdHNbU1RFUFNbbi0xXVsxXV07XG59XG5cbmZ1bmN0aW9uIHRvVW5pdE1hcCh1bml0cykge1xuICB2YXIgbWFwID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPXVuaXRzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBtYXBbdW5pdHNbaV0udHlwZV0gPSB1bml0c1tpXTtcbiAgfVxuICBtYXAuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgICByZXR1cm4gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yik7XG4gIH07XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Vbml0TWFwKGxvY2FsZSk7XG5tb2R1bGUuZXhwb3J0cy51dGMgPSB0b1VuaXRNYXAodXRjKTsiLCJ2YXIgdSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgRk5BTUUgPSAnX19uYW1lX18nO1xuXG51Lm5hbWVkZnVuYyA9IGZ1bmN0aW9uKG5hbWUsIGYpIHsgcmV0dXJuIChmW0ZOQU1FXSA9IG5hbWUsIGYpOyB9O1xuXG51Lm5hbWUgPSBmdW5jdGlvbihmKSB7IHJldHVybiBmPT1udWxsID8gbnVsbCA6IGZbRk5BTUVdOyB9O1xuXG51LmlkZW50aXR5ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geDsgfTtcblxudS50cnVlID0gdS5uYW1lZGZ1bmMoJ3RydWUnLCBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0pO1xuXG51LmZhbHNlID0gdS5uYW1lZGZ1bmMoJ2ZhbHNlJywgZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSk7XG5cbnUuZHVwbGljYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufTtcblxudS5lcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKTtcbn07XG5cbnUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gIGZvciAodmFyIHgsIG5hbWUsIGk9MSwgbGVuPWFyZ3VtZW50cy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICB4ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAobmFtZSBpbiB4KSB7IG9ialtuYW1lXSA9IHhbbmFtZV07IH1cbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxudS5sZW5ndGggPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgeC5sZW5ndGggIT0gbnVsbCA/IHgubGVuZ3RoIDogbnVsbDtcbn07XG5cbnUua2V5cyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGtleXMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIGtleXMucHVzaChrKTtcbiAgcmV0dXJuIGtleXM7XG59O1xuXG51LnZhbHMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciB2YWxzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSB2YWxzLnB1c2goeFtrXSk7XG4gIHJldHVybiB2YWxzO1xufTtcblxudS50b01hcCA9IGZ1bmN0aW9uKGxpc3QsIGYpIHtcbiAgcmV0dXJuIChmID0gdS4kKGYpKSA/XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW2YoeCldID0gMSwgb2JqKTsgfSwge30pIDpcbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbeF0gPSAxLCBvYmopOyB9LCB7fSk7XG59O1xuXG51LmtleXN0ciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAvLyB1c2UgdG8gZW5zdXJlIGNvbnNpc3RlbnQga2V5IGdlbmVyYXRpb24gYWNyb3NzIG1vZHVsZXNcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBpZiAoIW4pIHJldHVybiAnJztcbiAgZm9yICh2YXIgcz1TdHJpbmcodmFsdWVzWzBdKSwgaT0xOyBpPG47ICsraSkge1xuICAgIHMgKz0gJ3wnICsgU3RyaW5nKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG4vLyB0eXBlIGNoZWNraW5nIGZ1bmN0aW9uc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG51LmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufTtcblxudS5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG51LmlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG51LmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudS5pc051bWJlciA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG5cbnUuaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufTtcblxudS5pc0RhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxudS5pc1ZhbGlkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iajtcbn07XG5cbnUuaXNCdWZmZXIgPSAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBCdWZmZXIuaXNCdWZmZXIpIHx8IHUuZmFsc2U7XG5cbi8vIHR5cGUgY29lcmNpb24gZnVuY3Rpb25zXG5cbnUubnVtYmVyID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6ICtzO1xufTtcblxudS5ib29sZWFuID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IHM9PT0nZmFsc2UnID8gZmFsc2UgOiAhIXM7XG59O1xuXG4vLyBwYXJzZSBhIGRhdGUgd2l0aCBvcHRpb25hbCBkMy50aW1lLWZvcm1hdCBmb3JtYXRcbnUuZGF0ZSA9IGZ1bmN0aW9uKHMsIGZvcm1hdCkge1xuICB2YXIgZCA9IGZvcm1hdCA/IGZvcm1hdCA6IERhdGU7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogZC5wYXJzZShzKTtcbn07XG5cbnUuYXJyYXkgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgPyAodS5pc0FycmF5KHgpID8geCA6IFt4XSkgOiBbXTtcbn07XG5cbnUuc3RyID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gdS5pc0FycmF5KHgpID8gJ1snICsgeC5tYXAodS5zdHIpICsgJ10nXG4gICAgOiB1LmlzT2JqZWN0KHgpIHx8IHUuaXNTdHJpbmcoeCkgP1xuICAgICAgLy8gT3V0cHV0IHZhbGlkIEpTT04gYW5kIEpTIHNvdXJjZSBzdHJpbmdzLlxuICAgICAgLy8gU2VlIGh0dHA6Ly90aW1lbGVzc3JlcG8uY29tL2pzb24taXNudC1hLWphdmFzY3JpcHQtc3Vic2V0XG4gICAgICBKU09OLnN0cmluZ2lmeSh4KS5yZXBsYWNlKCdcXHUyMDI4JywnXFxcXHUyMDI4JykucmVwbGFjZSgnXFx1MjAyOScsICdcXFxcdTIwMjknKVxuICAgIDogeDtcbn07XG5cbi8vIGRhdGEgYWNjZXNzIGZ1bmN0aW9uc1xuXG52YXIgZmllbGRfcmUgPSAvXFxbKC4qPylcXF18W14uXFxbXSsvZztcblxudS5maWVsZCA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIFN0cmluZyhmKS5tYXRjaChmaWVsZF9yZSkubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZFswXSAhPT0gJ1snID8gZCA6XG4gICAgICBkWzFdICE9PSBcIidcIiAmJiBkWzFdICE9PSAnXCInID8gZC5zbGljZSgxLCAtMSkgOlxuICAgICAgZC5zbGljZSgyLCAtMikucmVwbGFjZSgvXFxcXChbXCInXSkvZywgJyQxJyk7XG4gIH0pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgLyoganNoaW50IGV2aWw6IHRydWUgKi9cbiAgcmV0dXJuIGY9PW51bGwgfHwgdS5pc0Z1bmN0aW9uKGYpID8gZiA6XG4gICAgdS5uYW1lZGZ1bmMoZiwgRnVuY3Rpb24oJ3gnLCAncmV0dXJuIHhbJyArIHUuZmllbGQoZikubWFwKHUuc3RyKS5qb2luKCddWycpICsgJ107JykpO1xufTtcblxuLy8gc2hvcnQtY3V0IGZvciBhY2Nlc3NvclxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxuXG51LiRmdW5jID0gZnVuY3Rpb24obmFtZSwgb3ApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGYpIHtcbiAgICBmID0gdS4kKGYpIHx8IHUuaWRlbnRpdHk7XG4gICAgdmFyIG4gPSBuYW1lICsgKHUubmFtZShmKSA/ICdfJyt1Lm5hbWUoZikgOiAnJyk7XG4gICAgcmV0dXJuIHUubmFtZWRmdW5jKG4sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG9wKGYoZCkpOyB9KTtcbiAgfTtcbn07XG5cbnUuJHZhbGlkICA9IHUuJGZ1bmMoJ3ZhbGlkJywgdS5pc1ZhbGlkKTtcbnUuJGxlbmd0aCA9IHUuJGZ1bmMoJ2xlbmd0aCcsIHUubGVuZ3RoKTtcblxudS4kaW4gPSBmdW5jdGlvbihmLCB2YWx1ZXMpIHtcbiAgZiA9IHUuJChmKTtcbiAgdmFyIG1hcCA9IHUuaXNBcnJheSh2YWx1ZXMpID8gdS50b01hcCh2YWx1ZXMpIDogdmFsdWVzO1xuICByZXR1cm4gZnVuY3Rpb24oZCkgeyByZXR1cm4gISFtYXBbZihkKV07IH07XG59O1xuXG4vLyBjb21wYXJpc29uIC8gc29ydGluZyBmdW5jdGlvbnNcblxudS5jb21wYXJhdG9yID0gZnVuY3Rpb24oc29ydCkge1xuICB2YXIgc2lnbiA9IFtdO1xuICBpZiAoc29ydCA9PT0gdW5kZWZpbmVkKSBzb3J0ID0gW107XG4gIHNvcnQgPSB1LmFycmF5KHNvcnQpLm1hcChmdW5jdGlvbihmKSB7XG4gICAgdmFyIHMgPSAxO1xuICAgIGlmICAgICAgKGZbMF0gPT09ICctJykgeyBzID0gLTE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgZWxzZSBpZiAoZlswXSA9PT0gJysnKSB7IHMgPSArMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBzaWduLnB1c2gocyk7XG4gICAgcmV0dXJuIHUuYWNjZXNzb3IoZik7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBpLCBuLCBmLCBjO1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07XG4gICAgICBjID0gdS5jbXAoZihhKSwgZihiKSk7XG4gICAgICBpZiAoYykgcmV0dXJuIGMgKiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gKGEgPCBiIHx8IGEgPT0gbnVsbCkgJiYgYiAhPSBudWxsID8gLTEgOlxuICAgIChhID4gYiB8fCBiID09IG51bGwpICYmIGEgIT0gbnVsbCA/IDEgOlxuICAgICgoYiA9IGIgaW5zdGFuY2VvZiBEYXRlID8gK2IgOiBiKSxcbiAgICAgKGEgPSBhIGluc3RhbmNlb2YgRGF0ZSA/ICthIDogYSkpICE9PSBhICYmIGIgPT09IGIgPyAtMSA6XG4gICAgYiAhPT0gYiAmJiBhID09PSBhID8gMSA6IDA7XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG4vLyBwZXJtdXRlcyBhbiBhcnJheSB1c2luZyBhIEtudXRoIHNodWZmbGVcbnUucGVybXV0ZSA9IGZ1bmN0aW9uKGEpIHtcbiAgdmFyIG0gPSBhLmxlbmd0aCxcbiAgICAgIHN3YXAsXG4gICAgICBpO1xuXG4gIHdoaWxlIChtKSB7XG4gICAgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG0tLSk7XG4gICAgc3dhcCA9IGFbbV07XG4gICAgYVttXSA9IGFbaV07XG4gICAgYVtpXSA9IHN3YXA7XG4gIH1cbn07XG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxudS5wYWQgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgcGFkY2hhcikge1xuICBwYWRjaGFyID0gcGFkY2hhciB8fCBcIiBcIjtcbiAgdmFyIGQgPSBsZW5ndGggLSBzLmxlbmd0aDtcbiAgaWYgKGQgPD0gMCkgcmV0dXJuIHM7XG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gc3RycmVwKGQsIHBhZGNoYXIpICsgcztcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gc3RycmVwKE1hdGguZmxvb3IoZC8yKSwgcGFkY2hhcikgK1xuICAgICAgICAgcyArIHN0cnJlcChNYXRoLmNlaWwoZC8yKSwgcGFkY2hhcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzICsgc3RycmVwKGQsIHBhZGNoYXIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJyZXAobiwgc3RyKSB7XG4gIHZhciBzID0gXCJcIiwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBzICs9IHN0cjtcbiAgcmV0dXJuIHM7XG59XG5cbnUudHJ1bmNhdGUgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgd29yZCwgZWxsaXBzaXMpIHtcbiAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICBpZiAobGVuIDw9IGxlbmd0aCkgcmV0dXJuIHM7XG4gIGVsbGlwc2lzID0gZWxsaXBzaXMgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhlbGxpcHNpcykgOiAnXFx1MjAyNic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIiwidmFyIGpzb24gPSB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OIDogcmVxdWlyZSgnanNvbmlmeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIG9wdHMgPSB7IGNtcDogb3B0cyB9O1xuICAgIHZhciBzcGFjZSA9IG9wdHMuc3BhY2UgfHwgJyc7XG4gICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHNwYWNlID0gQXJyYXkoc3BhY2UrMSkuam9pbignICcpO1xuICAgIHZhciBjeWNsZXMgPSAodHlwZW9mIG9wdHMuY3ljbGVzID09PSAnYm9vbGVhbicpID8gb3B0cy5jeWNsZXMgOiBmYWxzZTtcbiAgICB2YXIgcmVwbGFjZXIgPSBvcHRzLnJlcGxhY2VyIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gICAgdmFyIGNtcCA9IG9wdHMuY21wICYmIChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhb2JqID0geyBrZXk6IGEsIHZhbHVlOiBub2RlW2FdIH07XG4gICAgICAgICAgICAgICAgdmFyIGJvYmogPSB7IGtleTogYiwgdmFsdWU6IG5vZGVbYl0gfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhb2JqLCBib2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSkob3B0cy5jbXApO1xuXG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN0cmluZ2lmeSAocGFyZW50LCBrZXksIG5vZGUsIGxldmVsKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzcGFjZSA/ICgnXFxuJyArIG5ldyBBcnJheShsZXZlbCArIDEpLmpvaW4oc3BhY2UpKSA6ICcnO1xuICAgICAgICB2YXIgY29sb25TZXBhcmF0b3IgPSBzcGFjZSA/ICc6ICcgOiAnOic7XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS50b0pTT04gJiYgdHlwZW9mIG5vZGUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS50b0pTT04oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSByZXBsYWNlci5jYWxsKHBhcmVudCwga2V5LCBub2RlKTtcblxuICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fCBub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbi5zdHJpbmdpZnkobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc3RyaW5naWZ5KG5vZGUsIGksIG5vZGVbaV0sIGxldmVsKzEpIHx8IGpzb24uc3RyaW5naWZ5KG51bGwpO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICddJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWVuLmluZGV4T2Yobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN5Y2xlcykgcmV0dXJuIGpzb24uc3RyaW5naWZ5KCdfX2N5Y2xlX18nKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHNlZW4ucHVzaChub2RlKTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKG5vZGUpLnNvcnQoY21wICYmIGNtcChub2RlKSk7XG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHJpbmdpZnkobm9kZSwga2V5LCBub2RlW2tleV0sIGxldmVsKzEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGpzb24uc3RyaW5naWZ5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgKyBjb2xvblNlcGFyYXRvclxuICAgICAgICAgICAgICAgICAgICArIHZhbHVlO1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChpbmRlbnQgKyBzcGFjZSArIGtleVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW4uc3BsaWNlKHNlZW4uaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gJ3snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICd9JztcbiAgICAgICAgfVxuICAgIH0pKHsgJyc6IG9iaiB9LCAnJywgb2JqLCAwKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZSB9O1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuIiwiZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5leHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuIiwidmFyIGF0LCAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgY2gsIC8vIFRoZSBjdXJyZW50IGNoYXJhY3RlclxuICAgIGVzY2FwZWUgPSB7XG4gICAgICAgICdcIic6ICAnXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAgICAgJy8nOiAgJy8nLFxuICAgICAgICBiOiAgICAnXFxiJyxcbiAgICAgICAgZjogICAgJ1xcZicsXG4gICAgICAgIG46ICAgICdcXG4nLFxuICAgICAgICByOiAgICAnXFxyJyxcbiAgICAgICAgdDogICAgJ1xcdCdcbiAgICB9LFxuICAgIHRleHQsXG5cbiAgICBlcnJvciA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIC8vIENhbGwgZXJyb3Igd2hlbiBzb21ldGhpbmcgaXMgd3JvbmcuXG4gICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIG5hbWU6ICAgICdTeW50YXhFcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICAgICAgYXQ6ICAgICAgYXQsXG4gICAgICAgICAgICB0ZXh0OiAgICB0ZXh0XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBuZXh0ID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgLy8gSWYgYSBjIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgdmVyaWZ5IHRoYXQgaXQgbWF0Y2hlcyB0aGUgY3VycmVudCBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChjICYmIGMgIT09IGNoKSB7XG4gICAgICAgICAgICBlcnJvcihcIkV4cGVjdGVkICdcIiArIGMgKyBcIicgaW5zdGVhZCBvZiAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IGNoYXJhY3Rlci4gV2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzLFxuICAgICAgICAvLyByZXR1cm4gdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgICAgXG4gICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xuICAgICAgICBhdCArPSAxO1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfSxcbiAgICBcbiAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxuICAgICAgICB2YXIgbnVtYmVyLFxuICAgICAgICAgICAgc3RyaW5nID0gJyc7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2ggPT09ICctJykge1xuICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xuICAgICAgICAgICAgbmV4dCgnLScpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnLic7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnVtYmVyID0gK3N0cmluZztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgc3RyaW5nIHZhbHVlLlxuICAgICAgICB2YXIgaGV4LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdWZmZmY7XG4gICAgICAgIFxuICAgICAgICAvLyBXaGVuIHBhcnNpbmcgZm9yIHN0cmluZyB2YWx1ZXMsIHdlIG11c3QgbG9vayBmb3IgXCIgYW5kIFxcIGNoYXJhY3RlcnMuXG4gICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAndScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXggPSBwYXJzZUludChuZXh0KCksIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGhleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gdWZmZmYgKiAxNiArIGhleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHVmZmZmKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXNjYXBlZVtjaF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xuICAgIH0sXG5cbiAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICAgIHdoaWxlIChjaCAmJiBjaCA8PSAnICcpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3b3JkID0gZnVuY3Rpb24gKCkge1xuXG4vLyB0cnVlLCBmYWxzZSwgb3IgbnVsbC5cblxuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgbmV4dCgndCcpO1xuICAgICAgICAgICAgbmV4dCgncicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgbmV4dCgnZicpO1xuICAgICAgICAgICAgbmV4dCgnYScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgncycpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIG5leHQoJ24nKTtcbiAgICAgICAgICAgIG5leHQoJ3UnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICB9LFxuXG4gICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cblxuICAgIGFycmF5ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBhcnJheSB2YWx1ZS5cblxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgICAgICAgbmV4dCgnWycpO1xuICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTsgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh2YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcbiAgICB9LFxuXG4gICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICBuZXh0KCd7Jyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDsgICAvLyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgIGtleSA9IHN0cmluZygpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgbmV4dCgnOicpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ0R1cGxpY2F0ZSBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICAgIH07XG5cbnZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIEpTT04gdmFsdWUuIEl0IGNvdWxkIGJlIGFuIG9iamVjdCwgYW4gYXJyYXksIGEgc3RyaW5nLCBhIG51bWJlcixcbi8vIG9yIGEgd29yZC5cblxuICAgIHdoaXRlKCk7XG4gICAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgJ3snOlxuICAgICAgICByZXR1cm4gb2JqZWN0KCk7XG4gICAgY2FzZSAnWyc6XG4gICAgICAgIHJldHVybiBhcnJheSgpO1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgcmV0dXJuIHN0cmluZygpO1xuICAgIGNhc2UgJy0nOlxuICAgICAgICByZXR1cm4gbnVtYmVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNoID49ICcwJyAmJiBjaCA8PSAnOScgPyBudW1iZXIoKSA6IHdvcmQoKTtcbiAgICB9XG59O1xuXG4vLyBSZXR1cm4gdGhlIGpzb25fcGFyc2UgZnVuY3Rpb24uIEl0IHdpbGwgaGF2ZSBhY2Nlc3MgdG8gYWxsIG9mIHRoZSBhYm92ZVxuLy8gZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgcmV2aXZlcikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgXG4gICAgdGV4dCA9IHNvdXJjZTtcbiAgICBhdCA9IDA7XG4gICAgY2ggPSAnICc7XG4gICAgcmVzdWx0ID0gdmFsdWUoKTtcbiAgICB3aGl0ZSgpO1xuICAgIGlmIChjaCkge1xuICAgICAgICBlcnJvcihcIlN5bnRheCBlcnJvclwiKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsXG4gICAgLy8gcGFzc2luZyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byB0aGUgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGVcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbiwgc3RhcnRpbmcgd2l0aCBhIHRlbXBvcmFyeSByb290IG9iamVjdCB0aGF0IGhvbGRzIHRoZSByZXN1bHRcbiAgICAvLyBpbiBhbiBlbXB0eSBrZXkuIElmIHRoZXJlIGlzIG5vdCBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHNpbXBseSByZXR1cm4gdGhlXG4gICAgLy8gcmVzdWx0LlxuXG4gICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID8gKGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcbiAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfSh7Jyc6IHJlc3VsdH0sICcnKSkgOiByZXN1bHQ7XG59O1xuIiwidmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBnYXAsXG4gICAgaW5kZW50LFxuICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICB9LFxuICAgIHJlcDtcblxuZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuICAgIC8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4gICAgLy8gT3RoZXJ3aXNlIHdlIG11c3QgYWxzbyByZXBsYWNlIHRoZSBvZmZlbmRpbmcgY2hhcmFjdGVycyB3aXRoIHNhZmUgZXNjYXBlXG4gICAgLy8gc2VxdWVuY2VzLlxuICAgIFxuICAgIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIGMgPT09ICdzdHJpbmcnID8gYyA6XG4gICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICB9KSArICdcIicgOiAnXCInICsgc3RyaW5nICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG4gICAgLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICBwYXJ0aWFsLFxuICAgICAgICB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgIFxuICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSk7XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuICAgIC8vIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuICAgICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiAnbnVsbCc7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4gICAgICAgICAgICAvLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlICdudWxsJy4gVGhlIGNhc2UgaXMgaW5jbHVkZWQgaGVyZSBpblxuICAgICAgICAgICAgLy8gdGhlIHJlbW90ZSBjaGFuY2UgdGhhdCB0aGlzIGdldHMgZml4ZWQgc29tZWRheS5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICAgIHBhcnRpYWwgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQXJyYXkuaXNBcnJheVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBlbGVtZW50cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLCBhbmRcbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZW0gaW4gYnJhY2tldHMuXG4gICAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ1tdJyA6IGdhcCA/XG4gICAgICAgICAgICAgICAgICAgICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nIDpcbiAgICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlXG4gICAgICAgICAgICAvLyBzdHJpbmdpZmllZC5cbiAgICAgICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAvLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4gICAgICAgIC8vIGFuZCB3cmFwIHRoZW0gaW4gYnJhY2VzLlxuXG4gICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICd7fScgOiBnYXAgP1xuICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgIHZhciBpO1xuICAgIGdhcCA9ICcnO1xuICAgIGluZGVudCA9ICcnO1xuICAgIFxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbiAgICAvLyBtYW55IHNwYWNlcy5cbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG4gICAgZWxzZSBpZiAodHlwZW9mIHNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4gICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvci5cbiAgICByZXAgPSByZXBsYWNlcjtcbiAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nXG4gICAgJiYgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHJlcGxhY2VyLmxlbmd0aCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFrZSBhIGZha2Ugcm9vdCBvYmplY3QgY29udGFpbmluZyBvdXIgdmFsdWUgdW5kZXIgdGhlIGtleSBvZiAnJy5cbiAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuICAgIHJldHVybiBzdHIoJycsIHsnJzogdmFsdWV9KTtcbn07XG4iLCJcbmV4cG9ydCBlbnVtIEFnZ3JlZ2F0ZU9wIHtcbiAgICBWQUxVRVMgPSAndmFsdWVzJyBhcyBhbnksXG4gICAgQ09VTlQgPSAnY291bnQnIGFzIGFueSxcbiAgICBWQUxJRCA9ICd2YWxpZCcgYXMgYW55LFxuICAgIE1JU1NJTkcgPSAnbWlzc2luZycgYXMgYW55LFxuICAgIERJU1RJTkNUID0gJ2Rpc3RpbmN0JyBhcyBhbnksXG4gICAgU1VNID0gJ3N1bScgYXMgYW55LFxuICAgIE1FQU4gPSAnbWVhbicgYXMgYW55LFxuICAgIEFWRVJBR0UgPSAnYXZlcmFnZScgYXMgYW55LFxuICAgIFZBUklBTkNFID0gJ3ZhcmlhbmNlJyBhcyBhbnksXG4gICAgVkFSSUFOQ0VQID0gJ3ZhcmlhbmNlcCcgYXMgYW55LFxuICAgIFNUREVWID0gJ3N0ZGV2JyBhcyBhbnksXG4gICAgU1RERVZQID0gJ3N0ZGV2cCcgYXMgYW55LFxuICAgIE1FRElBTiA9ICdtZWRpYW4nIGFzIGFueSxcbiAgICBRMSA9ICdxMScgYXMgYW55LFxuICAgIFEzID0gJ3EzJyBhcyBhbnksXG4gICAgTU9ERVNLRVcgPSAnbW9kZXNrZXcnIGFzIGFueSxcbiAgICBNSU4gPSAnbWluJyBhcyBhbnksXG4gICAgTUFYID0gJ21heCcgYXMgYW55LFxuICAgIEFSR01JTiA9ICdhcmdtaW4nIGFzIGFueSxcbiAgICBBUkdNQVggPSAnYXJnbWF4JyBhcyBhbnksXG59XG5cbmV4cG9ydCBjb25zdCBBR0dSRUdBVEVfT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLlZBTFVFUyxcbiAgICBBZ2dyZWdhdGVPcC5DT1VOVCxcbiAgICBBZ2dyZWdhdGVPcC5WQUxJRCxcbiAgICBBZ2dyZWdhdGVPcC5NSVNTSU5HLFxuICAgIEFnZ3JlZ2F0ZU9wLkRJU1RJTkNULFxuICAgIEFnZ3JlZ2F0ZU9wLlNVTSxcbiAgICBBZ2dyZWdhdGVPcC5NRUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLkFWRVJBR0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0UsXG4gICAgQWdncmVnYXRlT3AuVkFSSUFOQ0VQLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWUCxcbiAgICBBZ2dyZWdhdGVPcC5NRURJQU4sXG4gICAgQWdncmVnYXRlT3AuUTEsXG4gICAgQWdncmVnYXRlT3AuUTMsXG4gICAgQWdncmVnYXRlT3AuTU9ERVNLRVcsXG4gICAgQWdncmVnYXRlT3AuTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLk1BWCxcbiAgICBBZ2dyZWdhdGVPcC5BUkdNSU4sXG4gICAgQWdncmVnYXRlT3AuQVJHTUFYLFxuXTtcblxuLyoqIEFkZGl0aXZlLWJhc2VkIGFnZ3JlZ2F0aW9uIG9wZXJhdGlvbnMuICBUaGVzZSBjYW4gYmUgYXBwbGllZCB0byBzdGFjay4gKi9cbmV4cG9ydCBjb25zdCBTVU1fT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLkNPVU5ULFxuICAgIEFnZ3JlZ2F0ZU9wLlNVTSxcbiAgICBBZ2dyZWdhdGVPcC5ESVNUSU5DVFxuXTtcblxuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BTID0gW1xuICAgIEFnZ3JlZ2F0ZU9wLk1FQU4sXG4gICAgQWdncmVnYXRlT3AuQVZFUkFHRSxcbiAgICBBZ2dyZWdhdGVPcC5TVERFVixcbiAgICBBZ2dyZWdhdGVPcC5TVERFVlAsXG4gICAgQWdncmVnYXRlT3AuTUVESUFOLFxuICAgIEFnZ3JlZ2F0ZU9wLlExLFxuICAgIEFnZ3JlZ2F0ZU9wLlEzLFxuICAgIEFnZ3JlZ2F0ZU9wLk1JTixcbiAgICBBZ2dyZWdhdGVPcC5NQVgsXG5dO1xuXG4vLyBUT0RPOiBtb3ZlIHN1cHBvcnRlZFR5cGVzLCBzdXBwb3J0ZWRFbnVtcyBmcm9tIHNjaGVtYSB0byBoZXJlXG4iLCJcbmV4cG9ydCBlbnVtIEF4aXNPcmllbnQge1xuICAgIFRPUCA9ICd0b3AnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIExFRlQgPSAnbGVmdCcgYXMgYW55LFxuICAgIEJPVFRPTSA9ICdib3R0b20nIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXNDb25maWcge1xuICAvLyAtLS0tLS0tLS0tIEdlbmVyYWwgLS0tLS0tLS0tLVxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGF4aXMgbGluZVxuICAgKi9cbiAgYXhpc1dpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogQSBzdHJpbmcgaW5kaWNhdGluZyBpZiB0aGUgYXhpcyAoYW5kIGFueSBncmlkbGluZXMpIHNob3VsZCBiZSBwbGFjZWQgYWJvdmUgb3IgYmVsb3cgdGhlIGRhdGEgbWFya3MuXG4gICAqL1xuICBsYXllcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQsIGluIHBpeGVscywgYnkgd2hpY2ggdG8gZGlzcGxhY2UgdGhlIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQXhpcyAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBDb2xvciBvZiBheGlzIGxpbmUuXG4gICAqL1xuICBheGlzQ29sb3I/OiBzdHJpbmc7XG5cbiAgLy8gLS0tLS0tLS0tLSBHcmlkIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0ZSBpZiBncmlkbGluZXMgc2hvdWxkIGJlIGNyZWF0ZWQgaW4gYWRkaXRpb24gdG8gdGlja3MuIElmIGBncmlkYCBpcyB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBST1cgYW5kIENPTC4gRm9yIFggYW5kIFksIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3IgcXVhbnRpdGF0aXZlIGFuZCB0aW1lIGZpZWxkcyBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBncmlkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29sb3Igb2YgZ3JpZGxpbmVzLlxuICAgKi9cbiAgZ3JpZENvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBncmlkIGRhc2ggYXJyYXkuXG4gICAqL1xuICBncmlkRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgb2YgZ3JpZCAodmFsdWUgYmV0d2VlbiBbMCwxXSlcbiAgICovXG4gIGdyaWRPcGFjaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JpZFdpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gTGFiZWxzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIGxhYmVscy5cbiAgICovXG4gIGxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIGF4aXMgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxBbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgYWxpZ25tZW50IGZvciB0aGUgTGFiZWwuXG4gICAqL1xuICBsYWJlbEFsaWduPzogc3RyaW5nO1xuICAvKipcbiAgICogVGV4dCBiYXNlbGluZSBmb3IgdGhlIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxCYXNlbGluZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRydW5jYXRlIGxhYmVscyB0aGF0IGFyZSB0b28gbG9uZy5cbiAgICogQG1pbmltdW0gMVxuICAgKi9cbiAgbGFiZWxNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIGFuZCBkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2tzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIElmIHByb3ZpZGVkLCBzZXRzIHRoZSBudW1iZXIgb2YgbWlub3IgdGlja3MgYmV0d2VlbiBtYWpvciB0aWNrcyAodGhlIHZhbHVlIDkgcmVzdWx0cyBpbiBkZWNpbWFsIHN1YmRpdmlzaW9uKS4gT25seSBhcHBsaWNhYmxlIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuXG4gICAqL1xuICBzdWJkaXZpZGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBIGRlc2lyZWQgbnVtYmVyIG9mIHRpY2tzLCBmb3IgYXhlcyB2aXN1YWxpemluZyBxdWFudGl0YXRpdmUgc2NhbGVzLiBUaGUgcmVzdWx0aW5nIG51bWJlciBtYXkgYmUgZGlmZmVyZW50IHNvIHRoYXQgdmFsdWVzIGFyZSBcIm5pY2VcIiAobXVsdGlwbGVzIG9mIDIsIDUsIDEwKSBhbmQgbGllIHdpdGhpbiB0aGUgdW5kZXJseWluZyBzY2FsZSdzIHJhbmdlLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrcz86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBheGlzJ3MgdGljay5cbiAgICovXG4gIHRpY2tDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSB0aWNrIGxhYmVsLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGlja0xhYmVsQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSB0aWNrIGxhYmVsLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSBvZiBsYWJlbCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgdGlja0xhYmVsRm9udFNpemU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBwYWRkaW5nLCBpbiBwaXhlbHMsIGJldHdlZW4gdGlja3MgYW5kIHRleHQgbGFiZWxzLlxuICAgKi9cbiAgdGlja1BhZGRpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciwgbWlub3IgYW5kIGVuZCB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBtYWpvciB0aWNrcy5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGlja1NpemVNYWpvcj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1pbm9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1pbm9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZUVuZD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdpZHRoLCBpbiBwaXhlbHMsIG9mIHRpY2tzLlxuICAgKi9cbiAgdGlja1dpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGl0bGUgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ29sb3Igb2YgdGhlIHRpdGxlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGl0bGVDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogRm9udCBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250U2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogV2VpZ2h0IG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcblxuICAvKipcbiAgICogQSB0aXRsZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSBheGlzLlxuICAgKi9cbiAgdGl0bGVPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBNYXggbGVuZ3RoIGZvciBheGlzIHRpdGxlIGlmIHRoZSB0aXRsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBmcm9tIHRoZSBmaWVsZCdzIGRlc2NyaXB0aW9uLiBCeSBkZWZhdWx0LCB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gY2VsbCBzaXplIGFuZCBjaGFyYWN0ZXJXaWR0aCBwcm9wZXJ0eS5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgdGl0bGVNYXhMZW5ndGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDaGFyYWN0ZXIgd2lkdGggZm9yIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5pbmcgdGl0bGUgbWF4IGxlbmd0aC5cbiAgICovXG4gIGNoYXJhY3RlcldpZHRoPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3RoZXIgLS0tLS0tLS0tLVxuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGF4aXMgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE86IHJlcGxhY2Vcbn1cblxuLy8gVE9ETzogYWRkIGNvbW1lbnQgZm9yIHByb3BlcnRpZXMgdGhhdCB3ZSByZWx5IG9uIFZlZ2EncyBkZWZhdWx0IHRvIHByb2R1Y2Vcbi8vIG1vcmUgY29uY2lzZSBWZWdhIG91dHB1dC5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBvZmZzZXQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSAwXG4gIGdyaWQ6IHVuZGVmaW5lZCwgLy8gYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXG4gIGxhYmVsczogdHJ1ZSxcbiAgbGFiZWxNYXhMZW5ndGg6IDI1LFxuICB0aWNrU2l6ZTogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDZcbiAgY2hhcmFjdGVyV2lkdGg6IDZcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnOiBBeGlzQ29uZmlnID0ge1xuICBheGlzV2lkdGg6IDAsXG4gIGxhYmVsczogdHJ1ZSxcbiAgZ3JpZDogZmFsc2UsXG4gIHRpY2tTaXplOiAwXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEF4aXMgZXh0ZW5kcyBBeGlzQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQgdmFsdWUgZGV0ZXJtaW5lZCBieSBjb25maWcuZm9ybWF0IGFueXdheVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBheGlzLiBPbmUgb2YgdG9wLCBib3R0b20sIGxlZnQgb3IgcmlnaHQuIFRoZSBvcmllbnRhdGlvbiBjYW4gYmUgdXNlZCB0byBmdXJ0aGVyIHNwZWNpYWxpemUgdGhlIGF4aXMgdHlwZSAoZS5nLiwgYSB5IGF4aXMgb3JpZW50ZWQgZm9yIHRoZSByaWdodCBlZGdlIG9mIHRoZSBjaGFydCkuXG4gICAqL1xuICBvcmllbnQ/OiBBeGlzT3JpZW50O1xuICAvKipcbiAgICogQSB0aXRsZSBmb3IgdGhlIGF4aXMuIFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LlxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHZhbHVlcz86IG51bWJlcltdO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsLCBST1csIENPTFVNTiwgU0hBUEUsIFNJWkV9IGZyb20gJy4vY2hhbm5lbCc7XG5cbi8qKlxuICogQmlubmluZyBwcm9wZXJ0aWVzIG9yIGJvb2xlYW4gZmxhZyBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0byBiaW4gZGF0YSBvciBub3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmluIHtcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1pbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGJpbiB2YWx1ZSB0byBjb25zaWRlci4gSWYgdW5zcGVjaWZpZWQsIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgdXNlZC5cbiAgICovXG4gIG1heD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgYmFzZSB0byB1c2UgZm9yIGF1dG9tYXRpYyBiaW4gZGV0ZXJtaW5hdGlvbiAoZGVmYXVsdCBpcyBiYXNlIDEwKS5cbiAgICovXG4gIGJhc2U/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBleGFjdCBzdGVwIHNpemUgdG8gdXNlIGJldHdlZW4gYmlucy4gSWYgcHJvdmlkZWQsIG9wdGlvbnMgc3VjaCBhcyBtYXhiaW5zIHdpbGwgYmUgaWdub3JlZC5cbiAgICovXG4gIHN0ZXA/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBhbGxvd2FibGUgc3RlcCBzaXplcyB0byBjaG9vc2UgZnJvbS5cbiAgICovXG4gIHN0ZXBzPzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBBIG1pbmltdW0gYWxsb3dhYmxlIHN0ZXAgc2l6ZSAocGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgaW50ZWdlciB2YWx1ZXMpLlxuICAgKi9cbiAgbWluc3RlcD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNjYWxlIGZhY3RvcnMgaW5kaWNhdGluZyBhbGxvd2FibGUgc3ViZGl2aXNpb25zLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBbNSwgMl0sIHdoaWNoIGluZGljYXRlcyB0aGF0IGZvciBiYXNlIDEwIG51bWJlcnMgKHRoZSBkZWZhdWx0IGJhc2UpLCB0aGUgbWV0aG9kIG1heSBjb25zaWRlciBkaXZpZGluZyBiaW4gc2l6ZXMgYnkgNSBhbmQvb3IgMi4gRm9yIGV4YW1wbGUsIGZvciBhbiBpbml0aWFsIHN0ZXAgc2l6ZSBvZiAxMCwgdGhlIG1ldGhvZCBjYW4gY2hlY2sgaWYgYmluIHNpemVzIG9mIDIgKD0gMTAvNSksIDUgKD0gMTAvMiksIG9yIDEgKD0gMTAvKDUqMikpIG1pZ2h0IGFsc28gc2F0aXNmeSB0aGUgZ2l2ZW4gY29uc3RyYWludHMuXG4gICAqL1xuICBkaXY/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIE1heGltdW0gbnVtYmVyIG9mIGJpbnMuXG4gICAqIEBtaW5pbXVtIDJcbiAgICovXG4gIG1heGJpbnM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvTWF4QmlucyhjaGFubmVsOiBDaGFubmVsKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSVpFOlxuICAgICAgLy8gRmFjZXRzIGFuZCBTaXplIHNob3VsZG4ndCBoYXZlIHRvbyBtYW55IGJpbnNcbiAgICAgIC8vIFdlIGNob29zZSA2IGxpa2Ugc2hhcGUgdG8gc2ltcGxpZnkgdGhlIHJ1bGVcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIDY7IC8vIFZlZ2EncyBcInNoYXBlXCIgaGFzIDYgZGlzdGluY3QgdmFsdWVzXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAxMDtcbiAgfVxufVxuIiwiLypcbiAqIENvbnN0YW50cyBhbmQgdXRpbGl0aWVzIGZvciBlbmNvZGluZyBjaGFubmVscyAoVmlzdWFsIHZhcmlhYmxlcylcbiAqIHN1Y2ggYXMgJ3gnLCAneScsICdjb2xvcicuXG4gKi9cblxuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWlucywgd2l0aG91dH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFggPSAneCcgYXMgYW55LFxuICBZID0gJ3knIGFzIGFueSxcbiAgWDIgPSAneDInIGFzIGFueSxcbiAgWTIgPSAneTInIGFzIGFueSxcbiAgUk9XID0gJ3JvdycgYXMgYW55LFxuICBDT0xVTU4gPSAnY29sdW1uJyBhcyBhbnksXG4gIFNIQVBFID0gJ3NoYXBlJyBhcyBhbnksXG4gIFNJWkUgPSAnc2l6ZScgYXMgYW55LFxuICBDT0xPUiA9ICdjb2xvcicgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgREVUQUlMID0gJ2RldGFpbCcgYXMgYW55LFxuICBMQUJFTCA9ICdsYWJlbCcgYXMgYW55LFxuICBQQVRIID0gJ3BhdGgnIGFzIGFueSxcbiAgT1JERVIgPSAnb3JkZXInIGFzIGFueSxcbiAgT1BBQ0lUWSA9ICdvcGFjaXR5JyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IFggPSBDaGFubmVsLlg7XG5leHBvcnQgY29uc3QgWSA9IENoYW5uZWwuWTtcbmV4cG9ydCBjb25zdCBYMiA9IENoYW5uZWwuWDI7XG5leHBvcnQgY29uc3QgWTIgPSBDaGFubmVsLlkyO1xuZXhwb3J0IGNvbnN0IFJPVyA9IENoYW5uZWwuUk9XO1xuZXhwb3J0IGNvbnN0IENPTFVNTiA9IENoYW5uZWwuQ09MVU1OO1xuZXhwb3J0IGNvbnN0IFNIQVBFID0gQ2hhbm5lbC5TSEFQRTtcbmV4cG9ydCBjb25zdCBTSVpFID0gQ2hhbm5lbC5TSVpFO1xuZXhwb3J0IGNvbnN0IENPTE9SID0gQ2hhbm5lbC5DT0xPUjtcbmV4cG9ydCBjb25zdCBURVhUID0gQ2hhbm5lbC5URVhUO1xuZXhwb3J0IGNvbnN0IERFVEFJTCA9IENoYW5uZWwuREVUQUlMO1xuZXhwb3J0IGNvbnN0IExBQkVMID0gQ2hhbm5lbC5MQUJFTDtcbmV4cG9ydCBjb25zdCBQQVRIID0gQ2hhbm5lbC5QQVRIO1xuZXhwb3J0IGNvbnN0IE9SREVSID0gQ2hhbm5lbC5PUkRFUjtcbmV4cG9ydCBjb25zdCBPUEFDSVRZID0gQ2hhbm5lbC5PUEFDSVRZO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTFMgPSBbWCwgWSwgWDIsIFkyLCBST1csIENPTFVNTiwgU0laRSwgU0hBUEUsIENPTE9SLCBQQVRILCBPUkRFUiwgT1BBQ0lUWSwgVEVYVCwgREVUQUlMLCBMQUJFTF07XG5cbmV4cG9ydCBjb25zdCBVTklUX0NIQU5ORUxTID0gd2l0aG91dChDSEFOTkVMUywgW1JPVywgQ09MVU1OXSk7XG5leHBvcnQgY29uc3QgVU5JVF9TQ0FMRV9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9DSEFOTkVMUywgW1BBVEgsIE9SREVSLCBERVRBSUwsIFRFWFQsIExBQkVMLCBYMiwgWTJdKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbWCwgWSwgWDIsIFkyXSk7XG5leHBvcnQgY29uc3QgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUyA9IHdpdGhvdXQoVU5JVF9TQ0FMRV9DSEFOTkVMUywgW1gsIFksIFgyLCBZMl0pO1xuXG4vKiogQ2hhbm5lbHMgdGhhdCBjYW4gc2VydmUgYXMgZ3JvdXBpbmdzIGZvciBzdGFja2VkIGNoYXJ0cy4gKi9cbmV4cG9ydCBjb25zdCBTVEFDS19HUk9VUF9DSEFOTkVMUyA9IFtDT0xPUiwgREVUQUlMLCBPUkRFUiwgT1BBQ0lUWSwgU0laRV07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkTWFyayB7XG4gIHBvaW50PzogYm9vbGVhbjtcbiAgdGljaz86IGJvb2xlYW47XG4gIHJ1bGU/OiBib29sZWFuO1xuICBjaXJjbGU/OiBib29sZWFuO1xuICBzcXVhcmU/OiBib29sZWFuO1xuICBiYXI/OiBib29sZWFuO1xuICBsaW5lPzogYm9vbGVhbjtcbiAgYXJlYT86IGJvb2xlYW47XG4gIHRleHQ/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgYSBwYXJ0aWN1bGFyIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsICBjaGFubmVsIG5hbWVcbiAqIEBwYXJhbSBtYXJrIHRoZSBtYXJrIHR5cGVcbiAqIEByZXR1cm4gd2hldGhlciB0aGUgbWFyayBzdXBwb3J0cyB0aGUgY2hhbm5lbFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydE1hcmsoY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyaykge1xuICByZXR1cm4gISFnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWwpW21hcmtdO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGRpY3Rpb25hcnkgc2hvd2luZyB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBtYXJrIHR5cGUuXG4gKiBAcGFyYW0gY2hhbm5lbFxuICogQHJldHVybiBBIGRpY3Rpb25hcnkgbWFwcGluZyBtYXJrIHR5cGVzIHRvIGJvb2xlYW4gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydGVkTWFyayhjaGFubmVsOiBDaGFubmVsKTogU3VwcG9ydGVkTWFyayB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICBjYXNlIFk6XG4gICAgY2FzZSBDT0xPUjpcbiAgICBjYXNlIERFVEFJTDpcbiAgICBjYXNlIE9SREVSOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICAgIHJldHVybiB7IC8vIGFsbCBtYXJrc1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgbGluZTogdHJ1ZSwgYXJlYTogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFgyOlxuICAgIGNhc2UgWTI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBydWxlOiB0cnVlLCBiYXI6IHRydWUsIGFyZWE6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9pbnQ6IHRydWUsIHRpY2s6IHRydWUsIHJ1bGU6IHRydWUsIGNpcmNsZTogdHJ1ZSwgc3F1YXJlOiB0cnVlLFxuICAgICAgICBiYXI6IHRydWUsIHRleHQ6IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7cG9pbnQ6IHRydWV9O1xuICAgIGNhc2UgVEVYVDpcbiAgICAgIHJldHVybiB7dGV4dDogdHJ1ZX07XG4gICAgY2FzZSBQQVRIOlxuICAgICAgcmV0dXJuIHtsaW5lOiB0cnVlfTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcG9ydGVkUm9sZSB7XG4gIG1lYXN1cmU6IGJvb2xlYW47XG4gIGRpbWVuc2lvbjogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIGRpbWVuc2lvbiAvIG1lYXN1cmUgcm9sZVxuICogQHBhcmFtICBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIHJvbGUgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRSb2xlKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRSb2xlIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgT1BBQ0lUWTpcbiAgICBjYXNlIExBQkVMOlxuICAgIGNhc2UgREVUQUlMOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgWDI6XG4gICAgY2FzZSBZMjpcbiAgICBjYXNlIFNJWkU6XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uOiBmYWxzZVxuICAgICAgfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiBmYWxzZSxcbiAgICAgICAgZGltZW5zaW9uOiB0cnVlXG4gICAgICB9O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBlbmNvZGluZyBjaGFubmVsJyArIGNoYW5uZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2NhbGUoY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gIWNvbnRhaW5zKFtERVRBSUwsIFBBVEgsIFRFWFQsIExBQkVMLCBPUkRFUl0sIGNoYW5uZWwpO1xufVxuIiwiaW1wb3J0IHtBeGlzT3JpZW50fSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q09MVU1OLCBST1csIFgsIFksIENoYW5uZWx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZERlZlRpdGxlLCBpc0RpbWVuc2lvbn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBrZXlzLCBleHRlbmQsIHRydW5jYXRlLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdBeGlzfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7bnVtYmVyRm9ybWF0LCB0aW1lVGVtcGxhdGV9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9kb2Mvc3BlYy5tZCMxMS1hbWJpZW50LWRlY2xhcmF0aW9uc1xuZGVjbGFyZSBsZXQgZXhwb3J0cztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpc0NvbXBvbmVudChtb2RlbDogTW9kZWwsIGF4aXNDaGFubmVsczogQ2hhbm5lbFtdKTogRGljdDxWZ0F4aXM+IHtcbiAgcmV0dXJuIGF4aXNDaGFubmVscy5yZWR1Y2UoZnVuY3Rpb24oYXhpcywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBheGlzW2NoYW5uZWxdID0gcGFyc2VBeGlzKGNoYW5uZWwsIG1vZGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGF4aXM7XG4gIH0sIHt9IGFzIERpY3Q8VmdBeGlzPik7XG59XG5cbi8qKlxuICogTWFrZSBhbiBpbm5lciBheGlzIGZvciBzaG93aW5nIGdyaWQgZm9yIHNoYXJlZCBheGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbm5lckF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGRpbmcgdGlja3MgYXMgd2VsbFxuXG4gIC8vIFRPRE86IHJlcGxhY2UgYW55IHdpdGggVmVnYSBBeGlzIEludGVyZmFjZVxuICBsZXQgZGVmOiBhbnkgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKGNoYW5uZWwpLFxuICAgIGdyaWQ6IHRydWUsXG4gICAgdGlja1NpemU6IDAsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbGFiZWxzOiB7XG4gICAgICAgIHRleHQ6IHt2YWx1ZTogJyd9XG4gICAgICB9LFxuICAgICAgYXhpczoge1xuICAgICAgICBzdHJva2U6IHt2YWx1ZTogJ3RyYW5zcGFyZW50J31cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgWydsYXllcicsICd0aWNrcycsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgLy8gRm9yIG5vdywgb25seSBuZWVkIHRvIGFkZCBncmlkIHByb3BlcnRpZXMgaGVyZSBiZWNhdXNlIGlubmVyQXhpcyBpcyBvbmx5IGZvciByZW5kZXJpbmcgZ3JpZC5cbiAgLy8gVE9ETzogc3VwcG9ydCBhZGQgb3RoZXIgcHJvcGVydGllcyBmb3IgaW5uZXJBeGlzXG4gIFsnZ3JpZCddLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUF4aXMoY2hhbm5lbDogQ2hhbm5lbCwgbW9kZWw6IE1vZGVsKTogVmdBeGlzIHtcbiAgY29uc3QgaXNDb2wgPSBjaGFubmVsID09PSBDT0xVTU4sXG4gICAgaXNSb3cgPSBjaGFubmVsID09PSBST1csXG4gICAgdHlwZSA9IGlzQ29sID8gJ3gnIDogaXNSb3cgPyAneSc6IGNoYW5uZWw7XG5cbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbClcbiAgfTtcblxuICAvLyAxLjIuIEFkZCBwcm9wZXJ0aWVzXG4gIFtcbiAgICAvLyBhKSBwcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBydWxlcyAoc28gaXQgaGFzIGF4aXNbcHJvcGVydHldIG1ldGhvZHMpIC0tIGNhbGwgcnVsZSBmdW5jdGlvbnNcbiAgICAnZm9ybWF0JywgJ2dyaWQnLCAnbGF5ZXInLCAnb2Zmc2V0JywgJ29yaWVudCcsICd0aWNrU2l6ZScsICd0aWNrcycsICd0aWNrU2l6ZUVuZCcsICd0aXRsZScsICd0aXRsZU9mZnNldCcsXG4gICAgLy8gYikgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzLCBvbmx5IHByb2R1Y2UgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIHNjaGVtYSwgb3IgZXhwbGljaXQgdmFsdWUgaWYgc3BlY2lmaWVkXG4gICAgJ3RpY2tQYWRkaW5nJywgJ3RpY2tTaXplJywgJ3RpY2tTaXplTWFqb3InLCAndGlja1NpemVNaW5vcicsICd2YWx1ZXMnLCAnc3ViZGl2aWRlJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBsZXQgbWV0aG9kOiAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWY6YW55KT0+YW55O1xuXG4gICAgY29uc3QgdmFsdWUgPSAobWV0aG9kID0gZXhwb3J0c1twcm9wZXJ0eV0pID9cbiAgICAgICAgICAgICAgICAgIC8vIGNhbGxpbmcgYXhpcy5mb3JtYXQsIGF4aXMuZ3JpZCwgLi4uXG4gICAgICAgICAgICAgICAgICBtZXRob2QobW9kZWwsIGNoYW5uZWwsIGRlZikgOlxuICAgICAgICAgICAgICAgICAgYXhpc1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IHByb3BzID0gbW9kZWwuYXhpcyhjaGFubmVsKS5wcm9wZXJ0aWVzIHx8IHt9O1xuXG4gIFtcbiAgICAnYXhpcycsICdsYWJlbHMnLCAvLyBoYXZlIHNwZWNpYWwgcnVsZXNcbiAgICAnZ3JpZCcsICd0aXRsZScsICd0aWNrcycsICdtYWpvclRpY2tzJywgJ21pbm9yVGlja3MnIC8vIG9ubHkgZGVmYXVsdCB2YWx1ZXNcbiAgXS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW2dyb3VwXSA/XG4gICAgICBwcm9wZXJ0aWVzW2dyb3VwXShtb2RlbCwgY2hhbm5lbCwgcHJvcHNbZ3JvdXBdIHx8IHt9LCBkZWYpIDpcbiAgICAgIHByb3BzW2dyb3VwXTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbnVtYmVyRm9ybWF0KG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLCBtb2RlbC5heGlzKGNoYW5uZWwpLmZvcm1hdCwgbW9kZWwuY29uZmlnKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICByZXR1cm4gbW9kZWwuYXhpcyhjaGFubmVsKS5vZmZzZXQ7XG59XG5cbi8vIFRPRE86IHdlIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBtZXRob2QgYWZ0ZXIgd2UgdGFrZSBjYXJlIG9mIGNvbmZpZyByZWZhY3RvcmluZ1xuLyoqXG4gKiBEZWZhdWx0IHJ1bGVzIGZvciB3aGV0aGVyIHRvIHNob3cgYSBncmlkIHNob3VsZCBiZSBzaG93biBmb3IgYSBjaGFubmVsLlxuICogSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIG9yZGluYWwgc2NhbGVzIHRoYXQgYXJlIG5vdCBiaW5uZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyaWRTaG93KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBncmlkID0gbW9kZWwuYXhpcyhjaGFubmVsKS5ncmlkO1xuICBpZiAoZ3JpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICByZXR1cm4gIW1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY2hhbm5lbCA9PT0gUk9XIHx8IGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIG5ldmVyIGFwcGx5IGdyaWQgZm9yIFJPVyBhbmQgQ09MVU1OIHNpbmNlIHdlIG1hbnVhbGx5IGNyZWF0ZSBydWxlLWdyb3VwIGZvciB0aGVtXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBncmlkU2hvdyhtb2RlbCwgY2hhbm5lbCkgJiYgKFxuICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBjbGVhbmx5IC0tIGVzc2VudGlhbGx5IHRoZSBjb25kaXRpb24gYmVsb3cgaXMgd2hldGhlclxuICAgIC8vIHRoZSBheGlzIGlzIGEgc2hhcmVkIC8gdW5pb24gYXhpcy5cbiAgICAoY2hhbm5lbCA9PT0gWSB8fCBjaGFubmVsID09PSBYKSAmJiAhKG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmKSB7XG4gIGNvbnN0IGxheWVyID0gbW9kZWwuYXhpcyhjaGFubmVsKS5sYXllcjtcbiAgaWYgKGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbiAgaWYgKGRlZi5ncmlkKSB7XG4gICAgLy8gaWYgZ3JpZCBpcyB0cnVlLCBuZWVkIHRvIHB1dCBsYXllciBvbiB0aGUgYmFjayBzbyB0aGF0IGdyaWQgaXMgYmVoaW5kIG1hcmtzXG4gICAgcmV0dXJuICdiYWNrJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkOyAvLyBvdGhlcndpc2UgcmV0dXJuIHVuZGVmaW5lZCBhbmQgdXNlIFZlZ2EncyBkZWZhdWx0LlxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgb3JpZW50ID0gbW9kZWwuYXhpcyhjaGFubmVsKS5vcmllbnQ7XG4gIGlmIChvcmllbnQpIHtcbiAgICByZXR1cm4gb3JpZW50O1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IENPTFVNTikge1xuICAgIC8vIEZJWE1FIHRlc3QgYW5kIGRlY2lkZVxuICAgIHJldHVybiBBeGlzT3JpZW50LlRPUDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja3MobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tzID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrcztcbiAgaWYgKHRpY2tzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICAvLyBGSVhNRSBkZXBlbmRzIG9uIHNjYWxlIHR5cGUgdG9vXG4gIGlmIChjaGFubmVsID09PSBYICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5iaW4pIHtcbiAgICAvLyBWZWdhJ3MgZGVmYXVsdCB0aWNrcyBvZnRlbiBsZWFkIHRvIGEgbG90IG9mIGxhYmVsIG9jY2x1c2lvbiBvbiBYIHdpdGhvdXQgOTAgZGVncmVlIHJvdGF0aW9uXG4gICAgcmV0dXJuIDU7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZTtcbiAgaWYgKHRpY2tTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGlja1NpemU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTaXplRW5kKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCB0aWNrU2l6ZUVuZCA9IG1vZGVsLmF4aXMoY2hhbm5lbCkudGlja1NpemVFbmQ7XG4gIGlmICh0aWNrU2l6ZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGlja1NpemVFbmQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICBpZiAoYXhpcy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGF4aXMudGl0bGU7XG4gIH1cblxuICAvLyBpZiBub3QgZGVmaW5lZCwgYXV0b21hdGljYWxseSBkZXRlcm1pbmUgYXhpcyB0aXRsZSBmcm9tIGZpZWxkIGRlZlxuICBjb25zdCBmaWVsZFRpdGxlID0gZmllbGREZWZUaXRsZShtb2RlbC5maWVsZERlZihjaGFubmVsKSwgbW9kZWwuY29uZmlnKCkpO1xuXG4gIGxldCBtYXhMZW5ndGg7XG4gIGlmIChheGlzLnRpdGxlTWF4TGVuZ3RoKSB7XG4gICAgbWF4TGVuZ3RoID0gYXhpcy50aXRsZU1heExlbmd0aDtcbiAgfSBlbHNlIGlmIChjaGFubmVsID09PSBYICYmICFtb2RlbC5pc09yZGluYWxTY2FsZShYKSkge1xuICAgIGNvbnN0IHVuaXRNb2RlbDogVW5pdE1vZGVsID0gbW9kZWwgYXMgYW55OyAvLyBvbmx5IHVuaXQgbW9kZWwgaGFzIGNoYW5uZWwgeFxuICAgIC8vIEZvciBub24tb3JkaW5hbCBzY2FsZSwgd2Uga25vdyBjZWxsIHNpemUgYXQgY29tcGlsZSB0aW1lLCB3ZSBjYW4gZ3Vlc3MgbWF4IGxlbmd0aFxuICAgIG1heExlbmd0aCA9IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLndpZHRoIC8gbW9kZWwuYXhpcyhYKS5jaGFyYWN0ZXJXaWR0aDtcbiAgfSBlbHNlIGlmIChjaGFubmVsID09PSBZICYmICFtb2RlbC5pc09yZGluYWxTY2FsZShZKSkge1xuICAgIGNvbnN0IHVuaXRNb2RlbDogVW5pdE1vZGVsID0gbW9kZWwgYXMgYW55OyAvLyBvbmx5IHVuaXQgbW9kZWwgaGFzIGNoYW5uZWwgeVxuICAgIC8vIEZvciBub24tb3JkaW5hbCBzY2FsZSwgd2Uga25vdyBjZWxsIHNpemUgYXQgY29tcGlsZSB0aW1lLCB3ZSBjYW4gZ3Vlc3MgbWF4IGxlbmd0aFxuICAgIG1heExlbmd0aCA9IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLmhlaWdodCAvIG1vZGVsLmF4aXMoWSkuY2hhcmFjdGVyV2lkdGg7XG4gIH1cblxuICAvLyBGSVhNRTogd2Ugc2hvdWxkIHVzZSB0ZW1wbGF0ZSB0byB0cnVuY2F0ZSBpbnN0ZWFkXG4gIHJldHVybiBtYXhMZW5ndGggPyB0cnVuY2F0ZShmaWVsZFRpdGxlLCBtYXhMZW5ndGgpIDogZmllbGRUaXRsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlT2Zmc2V0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCB0aXRsZU9mZnNldCA9IG1vZGVsLmF4aXMoY2hhbm5lbCkudGl0bGVPZmZzZXQ7XG4gIGlmICh0aXRsZU9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGl0bGVPZmZzZXQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBwcm9wZXJ0aWVzIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGF4aXMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBheGlzUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy5heGlzQ29sb3IgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIHsgc3Ryb2tlOiB7dmFsdWU6IGF4aXMuYXhpc0NvbG9yfSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzLmF4aXNXaWR0aCAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgeyBzdHJva2VXaWR0aDoge3ZhbHVlOiBheGlzLmF4aXNXaWR0aH0gfSA6XG4gICAgICAgIHt9LFxuICAgICAgYXhpc1Byb3BzU3BlYyB8fCB7fVxuICAgICk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ3JpZChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGdyaWRQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLmdyaWRDb2xvciAhPT0gdW5kZWZpbmVkID8geyBzdHJva2U6IHt2YWx1ZTogYXhpcy5ncmlkQ29sb3J9fSA6IHt9LFxuICAgICAgYXhpcy5ncmlkT3BhY2l0eSAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZU9wYWNpdHk6IHt2YWx1ZTogYXhpcy5ncmlkT3BhY2l0eX0gfSA6IHt9LFxuICAgICAgYXhpcy5ncmlkV2lkdGggIT09IHVuZGVmaW5lZCA/IHtzdHJva2VXaWR0aCA6IHt2YWx1ZTogYXhpcy5ncmlkV2lkdGh9IH0gOiB7fSxcbiAgICAgIGF4aXMuZ3JpZERhc2ggIT09IHVuZGVmaW5lZCA/IHtzdHJva2VEYXNoT2Zmc2V0IDoge3ZhbHVlOiBheGlzLmdyaWREYXNofSB9IDoge30sXG4gICAgICBncmlkUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBsYWJlbHNTcGVjLCBkZWYpIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgaWYgKCFheGlzLmxhYmVscykge1xuICAgICAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICAgIHRleHQ6ICcnXG4gICAgICB9LCBsYWJlbHNTcGVjKTtcbiAgICB9XG5cbiAgICAvLyBUZXh0XG4gICAgaWYgKGNvbnRhaW5zKFtOT01JTkFMLCBPUkRJTkFMXSwgZmllbGREZWYudHlwZSkgJiYgYXhpcy5sYWJlbE1heExlbmd0aCkge1xuICAgICAgLy8gVE9ETyByZXBsYWNlIHRoaXMgd2l0aCBWZWdhJ3MgbGFiZWxNYXhMZW5ndGggb25jZSBpdCBpcyBpbnRyb2R1Y2VkXG4gICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHRlbXBsYXRlOiAne3sgZGF0dW0uZGF0YSB8IHRydW5jYXRlOicgKyBheGlzLmxhYmVsTWF4TGVuZ3RoICsgJyB9fSdcbiAgICAgICAgfVxuICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgfSBlbHNlIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogdGltZVRlbXBsYXRlKCdkYXR1bS5kYXRhJywgZmllbGREZWYudGltZVVuaXQsIGF4aXMuZm9ybWF0LCBheGlzLnNob3J0VGltZUxhYmVscywgY29uZmlnKVxuICAgICAgICB9XG4gICAgICB9LCBsYWJlbHNTcGVjKTtcbiAgICB9XG5cbiAgICAvLyBMYWJlbCBBbmdsZVxuICAgIGlmIChheGlzLmxhYmVsQW5nbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEFuZ2xlfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXV0byByb3RhdGUgZm9yIFggYW5kIFJvd1xuICAgICAgaWYgKGNoYW5uZWwgPT09IFggJiYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSB8fCBmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogMjcwfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sYWJlbEFsaWduICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6IGF4aXMubGFiZWxBbGlnbn07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF1dG8gc2V0IGFsaWduIGlmIHJvdGF0ZWRcbiAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7XG4gICAgICAgICAgICB2YWx1ZTogZGVmLm9yaWVudCA9PT0gJ3RvcCcgPyAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgZGVmLnR5cGUgPT09ICd4JyA/ICdyaWdodCcgOlxuICAgICAgICAgICAgICAgICAgICdjZW50ZXInXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6ICdjZW50ZXInfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQmFzZWxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEJhc2VsaW5lfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgLy8gQXV0byBzZXQgYmFzZWxpbmUgaWYgcm90YXRlZFxuICAgICAgICAvLyBUT0RPOiBjb25zaWRlciBvdGhlciB2YWx1ZSBiZXNpZGVzIDI3MCwgOTBcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6IGRlZi50eXBlID09PSAneCcgPyAnbWlkZGxlJyA6ICdib3R0b20nfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6ICdib3R0b20nfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5zdHJva2UgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbEZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnQgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsRm9udH07XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnRTaXplID0ge3ZhbHVlOiBheGlzLnRpY2tMYWJlbEZvbnRTaXplfTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cyhsYWJlbHNTcGVjKS5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBsYWJlbHNTcGVjO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpY2tzKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgdGlja3NQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLnRpY2tDb2xvciAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZSA6IHt2YWx1ZTogYXhpcy50aWNrQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGlja1dpZHRoICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlV2lkdGg6IHt2YWx1ZTogYXhpcy50aWNrV2lkdGh9IH0gOiB7fSxcbiAgICAgIHRpY2tzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHRpdGxlUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy50aXRsZUNvbG9yICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlIDoge3ZhbHVlOiBheGlzLnRpdGxlQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250ICE9PSB1bmRlZmluZWQgPyB7Zm9udDoge3ZhbHVlOiBheGlzLnRpdGxlRm9udH19IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udFNpemUgIT09IHVuZGVmaW5lZCA/IHtmb250U2l6ZToge3ZhbHVlOiBheGlzLnRpdGxlRm9udFNpemV9fSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCA/IHtmb250V2VpZ2h0OiB7dmFsdWU6IGF4aXMudGl0bGVGb250V2VpZ2h0fX0gOiB7fSxcblxuICAgICAgdGl0bGVQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge0JBUiwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7Q09MT1IsIE9QQUNJVFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZCwgT3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NvcnRPcmRlcn0gZnJvbSAnLi4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCB1bmlvbn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3RlbXBsYXRlIGFzIHRpbWVVbml0VGVtcGxhdGV9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtTcGVjLCBpc1VuaXRTcGVjLCBpc0ZhY2V0U3BlYywgaXNMYXllclNwZWN9IGZyb20gJy4uL3NwZWMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKHNwZWM6IFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKTogTW9kZWwge1xuICBpZiAoaXNGYWNldFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IEZhY2V0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzTGF5ZXJTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBMYXllck1vZGVsKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcbiAgfVxuXG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBVbml0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcignSW52YWxpZCBzcGVjLicpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gVE9ETzogZmlndXJlIGlmIHdlIHJlYWxseSBuZWVkIG9wYWNpdHkgaW4gYm90aFxuZXhwb3J0IGNvbnN0IFNUUk9LRV9DT05GSUcgPSBbJ3N0cm9rZScsICdzdHJva2VXaWR0aCcsXG4gICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnLCAnc3Ryb2tlT3BhY2l0eScsICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eScsXG4gICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX1NUUk9LRV9DT05GSUcgPSB1bmlvbihTVFJPS0VfQ09ORklHLCBGSUxMX0NPTkZJRyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuICBjb25zdCBjb2xvckZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICBjb25zdCBvcGFjaXR5RmllbGREZWYgPSBtb2RlbC5maWVsZERlZihPUEFDSVRZKTtcblxuICAvLyBBcHBseSBmaWxsIHN0cm9rZSBjb25maWcgZmlyc3Qgc28gdGhhdCBjb2xvciBmaWVsZCAvIHZhbHVlIGNhbiBvdmVycmlkZVxuICAvLyBmaWxsIC8gc3Ryb2tlXG4gIGlmIChmaWxsZWQpIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIEZJTExfQ09ORklHKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFNUUk9LRV9DT05GSUcpO1xuICB9XG5cbiAgbGV0IGNvbG9yVmFsdWU7XG4gIGxldCBvcGFjaXR5VmFsdWU7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgY29sb3JWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBjb2xvckZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChjb2xvckZpZWxkRGVmICYmIGNvbG9yRmllbGREZWYudmFsdWUpIHtcbiAgICBjb2xvclZhbHVlID0geyB2YWx1ZTogY29sb3JGaWVsZERlZi52YWx1ZSB9O1xuICB9XG5cbiAgaWYgKG1vZGVsLmhhcyhPUEFDSVRZKSkge1xuICAgIG9wYWNpdHlWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoT1BBQ0lUWSwgb3BhY2l0eUZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZm46ICdyYW5rXyd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChvcGFjaXR5RmllbGREZWYgJiYgb3BhY2l0eUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgb3BhY2l0eVZhbHVlID0geyB2YWx1ZTogb3BhY2l0eUZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAoY29sb3JWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgcC5maWxsID0gY29sb3JWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2UgPSBjb2xvclZhbHVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWdcbiAgICBwW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsuY29sb3J9O1xuICB9XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gZmlsbCwgYWx3YXlzIGZpbGwgc3ltYm9sc1xuICAvLyB3aXRoIHRyYW5zcGFyZW50IGZpbGxzIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2EtbGl0ZS9pc3N1ZXMvMTMxNlxuICBpZiAoIXAuZmlsbCAmJiBjb250YWlucyhbQkFSLCBQT0lOVCwgQ0lSQ0xFLCBTUVVBUkVdLCBtb2RlbC5tYXJrKCkpKSB7XG4gICAgcC5maWxsID0ge3ZhbHVlOiAndHJhbnNwYXJlbnQnfTtcbiAgfVxuXG4gIGlmIChvcGFjaXR5VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHAub3BhY2l0eSA9IG9wYWNpdHlWYWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDb25maWcocHJvcGVydGllcywgY29uZmlnLCBwcm9wc0xpc3Q6IHN0cmluZ1tdKSB7XG4gIHByb3BzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHsgdmFsdWU6IHZhbHVlIH07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hcmtDb25maWcobWFya3NQcm9wZXJ0aWVzLCBtb2RlbDogVW5pdE1vZGVsLCBwcm9wc0xpc3Q6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBhcHBseUNvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsLmNvbmZpZygpLm1hcmssIHByb3BzTGlzdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBudW1iZXIgZm9ybWF0IGZvciBhIGZpZWxkRGVmXG4gKlxuICogQHBhcmFtIGZvcm1hdCBleHBsaWNpdGx5IHNwZWNpZmllZCBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckZvcm1hdChmaWVsZERlZjogRmllbGREZWYsIGZvcm1hdDogc3RyaW5nLCBjb25maWc6IENvbmZpZykge1xuICBpZiAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFICYmICFmaWVsZERlZi5iaW4pIHtcbiAgICAvLyBhZGQgbnVtYmVyIGZvcm1hdCBmb3IgcXVhbnRpdGF0aXZlIHR5cGUgb25seVxuICAgIC8vIFRPRE86IG5lZWQgdG8gbWFrZSB0aGlzIHdvcmsgY29ycmVjdGx5IGZvciBudW1lcmljIG9yZGluYWwgLyBub21pbmFsIHR5cGVcbiAgICByZXR1cm4gZm9ybWF0IHx8IGNvbmZpZy5udW1iZXJGb3JtYXQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqIFJldHVybiBmaWVsZCByZWZlcmVuY2Ugd2l0aCBwb3RlbnRpYWwgXCItXCIgcHJlZml4IGZvciBkZXNjZW5kaW5nIHNvcnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RmllbGQob3JkZXJDaGFubmVsRGVmOiBPcmRlckNoYW5uZWxEZWYpIHtcbiAgcmV0dXJuIChvcmRlckNoYW5uZWxEZWYuc29ydCA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcgPyAnLScgOiAnJykgK1xuICAgIGZpZWxkKG9yZGVyQ2hhbm5lbERlZiwge2JpblN1ZmZpeDogJ19taWQnfSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdGltZSB0ZW1wbGF0ZSB1c2VkIGZvciBheGlzL2xlZ2VuZCBsYWJlbHMgb3IgdGV4dCBtYXJrIGZvciBhIHRlbXBvcmFsIGZpZWxkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aW1lVGVtcGxhdGUodGVtcGxhdGVGaWVsZDogc3RyaW5nLCB0aW1lVW5pdDogVGltZVVuaXQsIGZvcm1hdDogc3RyaW5nLCBzaG9ydFRpbWVMYWJlbHM6IGJvb2xlYW4sIGNvbmZpZzogQ29uZmlnKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCB8fCBmb3JtYXQpIHtcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgdGltZSB1bml0LCBvciBpZiB1c2VyIGV4cGxpY2l0bHkgc3BlY2lmeSBmb3JtYXQgZm9yIGF4aXMvbGVnZW5kL3RleHQuXG4gICAgY29uc3QgX2Zvcm1hdCA9IGZvcm1hdCB8fCBjb25maWcudGltZUZvcm1hdDsgLy8gb25seSB1c2UgY29uZmlnLnRpbWVGb3JtYXQgaWYgdGhlcmUgaXMgbm8gdGltZVVuaXQuXG4gICAgcmV0dXJuICd7eycgKyB0ZW1wbGF0ZUZpZWxkICsgJyB8IHRpbWU6XFwnJyArIF9mb3JtYXQgKyAnXFwnfX0nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aW1lVW5pdFRlbXBsYXRlKHRpbWVVbml0LCB0ZW1wbGF0ZUZpZWxkLCBzaG9ydFRpbWVMYWJlbHMpO1xuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBmb3IgY29tcGlsaW5nIFZlZ2EtbGl0ZSBzcGVjIGludG8gVmVnYSBzcGVjLlxuICovXG5cbmltcG9ydCB7TEFZT1VUfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtub3JtYWxpemUsIEV4dGVuZGVkU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZShpbnB1dFNwZWM6IEV4dGVuZGVkU3BlYykge1xuICAvLyAxLiBDb252ZXJ0IGlucHV0IHNwZWMgaW50byBhIG5vcm1hbCBmb3JtXG4gIC8vIChEZWNvbXBvc2UgYWxsIGV4dGVuZGVkIHVuaXQgc3BlY3MgaW50byBjb21wb3NpdGlvbiBvZiB1bml0IHNwZWMuKVxuICBjb25zdCBzcGVjID0gbm9ybWFsaXplKGlucHV0U3BlYyk7XG5cbiAgLy8gMi4gSW5zdGFudGlhdGUgdGhlIG1vZGVsIHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzXG4gIGNvbnN0IG1vZGVsID0gYnVpbGRNb2RlbChzcGVjLCBudWxsLCAnJyk7XG5cbiAgLy8gMy4gUGFyc2UgZWFjaCBwYXJ0IG9mIHRoZSBtb2RlbCB0byBwcm9kdWNlIGNvbXBvbmVudHMgdGhhdCB3aWxsIGJlIGFzc2VtYmxlZCBsYXRlclxuICAvLyBXZSB0cmF2ZXJzZSB0aGUgd2hvbGUgdHJlZSB0byBwYXJzZSBvbmNlIGZvciBlYWNoIHR5cGUgb2YgY29tcG9uZW50c1xuICAvLyAoZS5nLiwgZGF0YSwgbGF5b3V0LCBtYXJrLCBzY2FsZSkuXG4gIC8vIFBsZWFzZSBzZWUgaW5zaWRlIG1vZGVsLnBhcnNlKCkgZm9yIG9yZGVyIGZvciBjb21waWxhdGlvbi5cbiAgbW9kZWwucGFyc2UoKTtcblxuICAvLyA0LiBBc3NlbWJsZSBhIFZlZ2EgU3BlYyBmcm9tIHRoZSBwYXJzZWQgY29tcG9uZW50cyBpbiAzLlxuICByZXR1cm4gYXNzZW1ibGUobW9kZWwpO1xufVxuXG5mdW5jdGlvbiBhc3NlbWJsZShtb2RlbDogTW9kZWwpIHtcbiAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgLy8gVE9ETzogY2hhbmdlIHR5cGUgdG8gYmVjb21lIFZnU3BlY1xuICBjb25zdCBvdXRwdXQgPSBleHRlbmQoXG4gICAge1xuICAgICAgLy8gU2V0IHNpemUgdG8gMSBiZWNhdXNlIHdlIHJlbHkgb24gcGFkZGluZyBhbnl3YXlcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgcGFkZGluZzogJ2F1dG8nXG4gICAgfSxcbiAgICBjb25maWcudmlld3BvcnQgPyB7IHZpZXdwb3J0OiBjb25maWcudmlld3BvcnQgfSA6IHt9LFxuICAgIGNvbmZpZy5iYWNrZ3JvdW5kID8geyBiYWNrZ3JvdW5kOiBjb25maWcuYmFja2dyb3VuZCB9IDoge30sXG4gICAge1xuICAgICAgLy8gVE9ETzogc2lnbmFsOiBtb2RlbC5hc3NlbWJsZVNlbGVjdGlvblNpZ25hbFxuICAgICAgZGF0YTogW10uY29uY2F0KFxuICAgICAgICBtb2RlbC5hc3NlbWJsZURhdGEoW10pLFxuICAgICAgICBtb2RlbC5hc3NlbWJsZUxheW91dChbXSlcbiAgICAgICAgLy8gVE9ETzogbW9kZWwuYXNzZW1ibGVTZWxlY3Rpb25EYXRhXG4gICAgICApLFxuICAgICAgbWFya3M6IFthc3NlbWJsZVJvb3RHcm91cChtb2RlbCldXG4gICAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzcGVjOiBvdXRwdXRcbiAgICAvLyBUT0RPOiBhZGQgd2FybmluZyAvIGVycm9ycyBoZXJlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZVJvb3RHcm91cChtb2RlbDogTW9kZWwpIHtcbiAgbGV0IHJvb3RHcm91cDphbnkgPSBleHRlbmQoe1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgncm9vdCcpLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICB9LFxuICAgIG1vZGVsLmRlc2NyaXB0aW9uKCkgPyB7ZGVzY3JpcHRpb246IG1vZGVsLmRlc2NyaXB0aW9uKCl9IDoge30sXG4gICAge1xuICAgICAgZnJvbToge2RhdGE6IExBWU9VVH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZTogZXh0ZW5kKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiB7ZmllbGQ6ICd3aWR0aCd9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7ZmllbGQ6ICdoZWlnaHQnfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbW9kZWwuYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMobW9kZWwuY29uZmlnKCkuY2VsbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBleHRlbmQocm9vdEdyb3VwLCBtb2RlbC5hc3NlbWJsZUdyb3VwKCkpO1xufVxuIiwiaW1wb3J0IHtYLCBERVRBSUx9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWcsIE9yaWVudCwgTWFya0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7aXNBZ2dyZWdhdGUsIGhhc30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc01lYXN1cmV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QkFSLCBBUkVBLCBQT0lOVCwgTElORSwgVElDSywgQ0lSQ0xFLCBTUVVBUkUsIFJVTEUsIFRFWFQsIE1hcmt9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcblxuLyoqXG4gKiBBdWdtZW50IGNvbmZpZy5tYXJrIHdpdGggcnVsZS1iYXNlZCBkZWZhdWx0IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNYXJrQ29uZmlnKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpIHtcbiAgIHJldHVybiBleHRlbmQoXG4gICAgIFsnZmlsbGVkJywgJ29wYWNpdHknLCAnb3JpZW50JywgJ2FsaWduJ10ucmVkdWNlKGZ1bmN0aW9uKGNmZywgcHJvcGVydHk6IHN0cmluZykge1xuICAgICAgIGNvbnN0IHZhbHVlID0gY29uZmlnLm1hcmtbcHJvcGVydHldO1xuICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgIGNhc2UgJ2ZpbGxlZCc6XG4gICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgLy8gUG9pbnQsIGxpbmUsIGFuZCBydWxlIGFyZSBub3QgZmlsbGVkIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gbWFyayAhPT0gUE9JTlQgJiYgbWFyayAhPT0gTElORSAmJiBtYXJrICE9PSBSVUxFO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbnMoW1BPSU5ULCBUSUNLLCBDSVJDTEUsIFNRVUFSRV0sIG1hcmspKSB7XG4gICAgICAgICAgICAgIC8vIHBvaW50LWJhc2VkIG1hcmtzIGFuZCBiYXJcbiAgICAgICAgICAgICAgaWYgKCFpc0FnZ3JlZ2F0ZShlbmNvZGluZykgfHwgaGFzKGVuY29kaW5nLCBERVRBSUwpKSB7XG4gICAgICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IDAuNztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hcmsgPT09IEFSRUEpIHtcbiAgICAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IDAuNzsgLy8gaW5zcGlyZWQgYnkgVGFibGVhdVxuICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgY2FzZSAnb3JpZW50JzpcbiAgICAgICAgICAgY2ZnW3Byb3BlcnR5XSA9IG9yaWVudChtYXJrLCBlbmNvZGluZywgY29uZmlnLm1hcmspO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIC8vIHRleHQtb25seVxuICAgICAgICAgY2FzZSAnYWxpZ24nOlxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjZmdbcHJvcGVydHldID0gaGFzKGVuY29kaW5nLCBYKSA/ICdjZW50ZXInIDogJ3JpZ2h0JztcbiAgICAgICAgICB9XG4gICAgICAgfVxuICAgICAgIHJldHVybiBjZmc7XG4gICAgIH0sIHt9KSxcbiAgICAgY29uZmlnLm1hcmtcbiAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmllbnQobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBtYXJrQ29uZmlnOiBNYXJrQ29uZmlnID0ge30pOiBPcmllbnQge1xuICBzd2l0Y2ggKG1hcmspIHtcbiAgICBjYXNlIFBPSU5UOlxuICAgIGNhc2UgQ0lSQ0xFOlxuICAgIGNhc2UgU1FVQVJFOlxuICAgIGNhc2UgVEVYVDpcbiAgICAgIC8vIG9yaWVudCBpcyBtZWFuaW5nbGVzcyBmb3IgdGhlc2UgbWFya3MuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShlbmNvZGluZy54KSB8fCBpc01lYXN1cmUoZW5jb2RpbmcueDIpO1xuICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKGVuY29kaW5nLnkpIHx8IGlzTWVhc3VyZShlbmNvZGluZy55Mik7XG4gIGNvbnN0IHlJc1JhbmdlID0gZW5jb2RpbmcueSAmJiBlbmNvZGluZy55MjtcbiAgY29uc3QgeElzUmFuZ2UgPSBlbmNvZGluZy54ICYmIGVuY29kaW5nLngyO1xuXG4gIHN3aXRjaCAobWFyaykge1xuICAgIGNhc2UgVElDSzpcbiAgICAgIC8vIFRpY2sgaXMgb3Bwb3NpdGUgdG8gYmFyLCBsaW5lLCBhcmVhIGFuZCBuZXZlciBoYXZlIHJhbmdlZCBtYXJrLlxuICAgICAgaWYgKHhJc01lYXN1cmUgJiYgIXlJc01lYXN1cmUpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgICAgIH1cbiAgICAgIC8vIHk6USBvciBBbWJpZ3VvdXMgY2FzZSwgcmV0dXJuIGhvcml6b250YWxcbiAgICAgIHJldHVybiBPcmllbnQuSE9SSVpPTlRBTDtcbiAgICBjYXNlIFJVTEU6XG4gICAgICBpZiAoeElzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgICAgfVxuICAgICAgaWYgKHlJc1JhbmdlKSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG4gICAgICB9XG4gICAgICBpZiAoZW5jb2RpbmcueSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LkhPUklaT05UQUw7XG4gICAgICB9XG4gICAgICBpZiAoZW5jb2RpbmcueCkge1xuICAgICAgICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xuICAgICAgfVxuICAgICAgLy8gbm8geC95IC0tIHNvIGl0J3MgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNhc2UgQkFSOlxuICAgIGNhc2UgQVJFQTpcbiAgICAgIC8vIElmIHRoZXJlIGFyZSByYW5nZSBmb3IgYm90aCB4IGFuZCB5LCB5ICh2ZXJ0aWNhbCkgaGFzIGhpZ2hlciBwcmVjZWRlbmNlLlxuXG4gICAgICBpZiAoeUlzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgICAgIH1cblxuICAgICAgaWYgKHhJc1JhbmdlKSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuSE9SSVpPTlRBTDtcbiAgICAgIH1cbiAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgY2FzZSBMSU5FOiAvLyBpbnRlbnRpb25hbCBmYWxsIHRocm91Z2hcbiAgICAgIC8qIHRzbGludDplbmFibGUgKi9cblxuICAgICAgaWYgKHhJc01lYXN1cmUgJiYgIXlJc01lYXN1cmUpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgICAgfVxuICAgICAgLy8geTpRIG9yIEFtYmlndW91cyBjYXNlLCByZXR1cm4gdmVydGljYWxcbiAgICAgIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlOm5leHQgKi9cbiAgY29uc29sZS53YXJuKCdvcmllbnQgdW5pbXBsZW1lbnRlZCBmb3IgbWFyaycsIG1hcmspO1xuICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xufVxuIiwiaW1wb3J0IHthdXRvTWF4Qmluc30gZnJvbSAnLi4vLi4vYmluJztcbmltcG9ydCB7Q2hhbm5lbCwgQ09MT1J9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtmaWVsZCwgRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBmbGF0dGVuLCBoYXNoLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGJpbiB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8VmdUcmFuc2Zvcm1bXT4ge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oYmluQ29tcG9uZW50LCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGNvbnN0IGJpbiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbjtcbiAgICAgIGlmIChiaW4pIHtcbiAgICAgICAgbGV0IGJpblRyYW5zID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiAnYmluJyxcbiAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGQsXG4gICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBzdGFydDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3N0YXJ0JyB9KSxcbiAgICAgICAgICAgIG1pZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSksXG4gICAgICAgICAgICBlbmQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAgIC8vIGlmIGJpbiBpcyBhbiBvYmplY3QsIGxvYWQgcGFyYW1ldGVyIGhlcmUhXG4gICAgICAgICAgdHlwZW9mIGJpbiA9PT0gJ2Jvb2xlYW4nID8ge30gOiBiaW5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWJpblRyYW5zLm1heGJpbnMgJiYgIWJpblRyYW5zLnN0ZXApIHtcbiAgICAgICAgICAvLyBpZiBib3RoIG1heGJpbnMgYW5kIHN0ZXAgYXJlIG5vdCBzcGVjaWZpZWQsIG5lZWQgdG8gYXV0b21hdGljYWxseSBkZXRlcm1pbmUgYmluXG4gICAgICAgICAgYmluVHJhbnMubWF4YmlucyA9IGF1dG9NYXhCaW5zKGNoYW5uZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gW2JpblRyYW5zXTtcbiAgICAgICAgY29uc3QgaXNPcmRpbmFsQ29sb3IgPSBtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSB8fCBjaGFubmVsID09PSBDT0xPUjtcbiAgICAgICAgLy8gY29sb3IgcmFtcCBoYXMgdHlwZSBsaW5lYXIgb3IgdGltZVxuICAgICAgICBpZiAoaXNPcmRpbmFsQ29sb3IpIHtcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX3JhbmdlJyB9KSxcbiAgICAgICAgICAgIGV4cHI6IGZpZWxkKGZpZWxkRGVmLCB7IGRhdHVtOiB0cnVlLCBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pICtcbiAgICAgICAgICAgICcgKyBcXCctXFwnICsgJyArXG4gICAgICAgICAgICBmaWVsZChmaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGSVhNRTogY3VycmVudCBtZXJnaW5nIGxvZ2ljIGNhbiBwcm9kdWNlIHJlZHVuZGFudCB0cmFuc2Zvcm1zIHdoZW4gYSBmaWVsZCBpcyBiaW5uZWQgZm9yIGNvbG9yIGFuZCBmb3Igbm9uLWNvbG9yXG4gICAgICAgIGNvbnN0IGtleSA9IGhhc2goYmluKSArICdfJyArIGZpZWxkRGVmLmZpZWxkICsgJ29jOicgKyBpc09yZGluYWxDb2xvcjtcbiAgICAgICAgYmluQ29tcG9uZW50W2tleV0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICByZXR1cm4gYmluQ29tcG9uZW50O1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBiaW5Db21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIEZJWE1FOiBjdXJyZW50IG1lcmdpbmcgbG9naWMgY2FuIHByb2R1Y2UgcmVkdW5kYW50IHRyYW5zZm9ybXMgd2hlbiBhIGZpZWxkIGlzIGJpbm5lZCBmb3IgY29sb3IgYW5kIGZvciBub24tY29sb3JcbiAgICAgIGV4dGVuZChiaW5Db21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5iaW4pO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5iaW47XG4gICAgfVxuICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBiaW5Db21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgICBleHRlbmQoYmluQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuYmluKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5iaW47XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmluQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBmbGF0dGVuKHZhbHMoY29tcG9uZW50LmJpbikpO1xuICB9XG59XG4iLCJpbXBvcnQge0NPTE9SfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T1JESU5BTH0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgZmxhdHRlbiwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG4vKipcbiAqIFdlIG5lZWQgdG8gYWRkIGEgcmFuayB0cmFuc2Zvcm0gc28gdGhhdCB3ZSBjYW4gdXNlIHRoZSByYW5rIHZhbHVlIGFzXG4gKiBpbnB1dCBmb3IgY29sb3IgcmFtcCdzIGxpbmVhciBzY2FsZS5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBjb2xvclJhbmsge1xuICAvKipcbiAgICogUmV0dXJuIGhhc2ggZGljdCBmcm9tIGEgY29sb3IgZmllbGQncyBuYW1lIHRvIHRoZSBzb3J0IGFuZCByYW5rIHRyYW5zZm9ybXNcbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IE1vZGVsKSB7XG4gICAgbGV0IGNvbG9yUmFua0NvbXBvbmVudDogRGljdDxWZ1RyYW5zZm9ybVtdPiA9IHt9O1xuICAgIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIG1vZGVsLmZpZWxkRGVmKENPTE9SKS50eXBlID09PSBPUkRJTkFMKSB7XG4gICAgICBjb2xvclJhbmtDb21wb25lbnRbbW9kZWwuZmllbGQoQ09MT1IpXSA9IFt7XG4gICAgICAgIHR5cGU6ICdzb3J0JyxcbiAgICAgICAgYnk6IG1vZGVsLmZpZWxkKENPTE9SKVxuICAgICAgfSwge1xuICAgICAgICB0eXBlOiAncmFuaycsXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIHJhbms6IG1vZGVsLmZpZWxkKENPTE9SLCB7IHByZWZuOiAncmFua18nIH0pXG4gICAgICAgIH1cbiAgICAgIH1dO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3JSYW5rQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gY29uc2lkZXIgbWVyZ2luZ1xuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgLy8gVE9ETzogd2UgaGF2ZSB0byBzZWUgaWYgY29sb3IgaGFzIHVuaW9uIHNjYWxlIGhlcmVcblxuICAgICAgLy8gRm9yIG5vdywgbGV0J3MgYXNzdW1lIGl0IGFsd2F5cyBoYXMgdW5pb24gc2NhbGVcbiAgICAgIGNvbnN0IGNvbG9yUmFua0NvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbms7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuaztcbiAgICAgIHJldHVybiBjb2xvclJhbmtDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBEaWN0PFZnVHJhbnNmb3JtW10+O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgY29sb3JSYW5rQ29tcG9uZW50ID0ge30gYXMgRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZChjb2xvclJhbmtDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5jb2xvclJhbmspO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuaztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xvclJhbmtDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyhjb21wb25lbnQuY29sb3JSYW5rKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7a2V5cywgRGljdCwgU3RyaW5nU2V0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhLCBWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vLi4vdW5pdCc7XG5cbmltcG9ydCB7c291cmNlfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQge2Zvcm1hdFBhcnNlfSBmcm9tICcuL2Zvcm1hdHBhcnNlJztcbmltcG9ydCB7bnVsbEZpbHRlcn0gZnJvbSAnLi9udWxsZmlsdGVyJztcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQge2Jpbn0gZnJvbSAnLi9iaW4nO1xuaW1wb3J0IHtmb3JtdWxhfSBmcm9tICcuL2Zvcm11bGEnO1xuaW1wb3J0IHtub25Qb3NpdGl2ZUZpbHRlcn0gZnJvbSAnLi9ub25wb3NpdGl2ZW51bGxmaWx0ZXInO1xuaW1wb3J0IHtzdW1tYXJ5fSBmcm9tICcuL3N1bW1hcnknO1xuaW1wb3J0IHtzdGFja1NjYWxlfSBmcm9tICcuL3N0YWNrc2NhbGUnO1xuaW1wb3J0IHt0aW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge3RpbWVVbml0RG9tYWlufSBmcm9tICcuL3RpbWV1bml0ZG9tYWluJztcbmltcG9ydCB7Y29sb3JSYW5rfSBmcm9tICcuL2NvbG9ycmFuayc7XG5cblxuLyoqXG4gKiBDb21wb3NhYmxlIGNvbXBvbmVudCBpbnN0YW5jZSBvZiBhIG1vZGVsJ3MgZGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEYXRhQ29tcG9uZW50IHtcbiAgc291cmNlOiBWZ0RhdGE7XG5cbiAgLyoqIE1hcHBpbmcgZnJvbSBmaWVsZCBuYW1lIHRvIHByaW1pdGl2ZSBkYXRhIHR5cGUuICAqL1xuICBmb3JtYXRQYXJzZTogRGljdDxzdHJpbmc+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIGZpZWxkcyBmb3IgbnVsbCBmaWx0ZXJpbmcgKi9cbiAgbnVsbEZpbHRlcjogRGljdDxib29sZWFuPjtcblxuICAvKiogSGFzaHNldCBvZiBhIGZvcm11bGEgb2JqZWN0ICovXG4gIGNhbGN1bGF0ZTogRGljdDxGb3JtdWxhPjtcblxuICAvKiogRmlsdGVyIHRlc3QgZXhwcmVzc2lvbiAqL1xuICBmaWx0ZXI6IHN0cmluZztcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGEgYmluIHBhcmFtZXRlciBoYXNoIHRvIHRyYW5zZm9ybXMgb2YgdGhlIGJpbm5lZCBmaWVsZCAqL1xuICBiaW46IERpY3Q8VmdUcmFuc2Zvcm1bXT47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBhbiBvdXRwdXQgZmllbGQgbmFtZSAoaGFzaCkgdG8gdGhlIHRpbWUgdW5pdCB0cmFuc2Zvcm0gICovXG4gIHRpbWVVbml0OiBEaWN0PFZnVHJhbnNmb3JtPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiBmaWVsZHMgdG8gYmUgZmlsdGVyZWQgKi9cbiAgbm9uUG9zaXRpdmVGaWx0ZXI6IERpY3Q8Ym9vbGVhbj47XG5cbiAgLyoqIERhdGEgc291cmNlIGZvciBmZWVkaW5nIHN0YWNrZWQgc2NhbGUuICovXG4gIC8vIFRPRE86IG5lZWQgdG8gcmV2aXNlIGlmIHNpbmdsZSBWZ0RhdGEgaXMgc3VmZmljaWVudCB3aXRoIGxheWVyIC8gY29uY2F0XG4gIHN0YWNrU2NhbGU6IFZnRGF0YTtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGFuIG91dHB1dCBmaWVsZCBuYW1lIChoYXNoKSB0byB0aGUgc29ydCBhbmQgcmFuayB0cmFuc2Zvcm1zICAqL1xuICBjb2xvclJhbms6IERpY3Q8VmdUcmFuc2Zvcm1bXT47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgdGltZSB1bml0cyB0aGF0IG5lZWQgdGhlaXIgb3duIGRhdGEgc291cmNlcyBmb3Igc2NhbGUgZG9tYWluICovXG4gIHRpbWVVbml0RG9tYWluOiBTdHJpbmdTZXQ7XG5cbiAgLyoqIEFycmF5IG9mIHN1bW1hcnkgY29tcG9uZW50IG9iamVjdCBmb3IgcHJvZHVjaW5nIHN1bW1hcnkgKGFnZ3JlZ2F0ZSkgZGF0YSBzb3VyY2UgKi9cbiAgc3VtbWFyeTogU3VtbWFyeUNvbXBvbmVudFtdO1xufVxuXG4vKipcbiAqIENvbXBvc2FibGUgY29tcG9uZW50IGZvciBhIG1vZGVsJ3Mgc3VtbWFyeSBkYXRhXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3VtbWFyeUNvbXBvbmVudCB7XG4gIC8qKiBOYW1lIG9mIHRoZSBzdW1tYXJ5IGRhdGEgc291cmNlICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKiogU3RyaW5nIHNldCBmb3IgYWxsIGRpbWVuc2lvbiBmaWVsZHMgICovXG4gIGRpbWVuc2lvbnM6IFN0cmluZ1NldDtcblxuICAvKiogZGljdGlvbmFyeSBtYXBwaW5nIGZpZWxkIG5hbWUgdG8gc3RyaW5nIHNldCBvZiBhZ2dyZWdhdGUgb3BzICovXG4gIG1lYXN1cmVzOiBEaWN0PFN0cmluZ1NldD47XG59XG5cbi8vIFRPRE86IHNwbGl0IHRoaXMgZmlsZSBpbnRvIG11bHRpcGxlIGZpbGVzIGFuZCByZW1vdmUgdGhpcyBsaW50ZXIgZmxhZ1xuLyogdHNsaW50OmRpc2FibGU6bm8tdXNlLWJlZm9yZS1kZWNsYXJlICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXREYXRhKG1vZGVsOiBVbml0TW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VVbml0KG1vZGVsKSxcbiAgICBudWxsRmlsdGVyOiBudWxsRmlsdGVyLnBhcnNlVW5pdChtb2RlbCksXG4gICAgZmlsdGVyOiBmaWx0ZXIucGFyc2VVbml0KG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VVbml0KG1vZGVsKSxcblxuICAgIHNvdXJjZTogc291cmNlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgYmluOiBiaW4ucGFyc2VVbml0KG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VVbml0KG1vZGVsKSxcbiAgICB0aW1lVW5pdDogdGltZVVuaXQucGFyc2VVbml0KG1vZGVsKSxcbiAgICB0aW1lVW5pdERvbWFpbjogdGltZVVuaXREb21haW4ucGFyc2VVbml0KG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlVW5pdChtb2RlbCksXG4gICAgc3RhY2tTY2FsZTogc3RhY2tTY2FsZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGNvbG9yUmFuazogY29sb3JSYW5rLnBhcnNlVW5pdChtb2RlbClcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXREYXRhKG1vZGVsOiBGYWNldE1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgZm9ybWF0UGFyc2U6IGZvcm1hdFBhcnNlLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIG51bGxGaWx0ZXI6IG51bGxGaWx0ZXIucGFyc2VGYWNldChtb2RlbCksXG4gICAgZmlsdGVyOiBmaWx0ZXIucGFyc2VGYWNldChtb2RlbCksXG4gICAgbm9uUG9zaXRpdmVGaWx0ZXI6IG5vblBvc2l0aXZlRmlsdGVyLnBhcnNlRmFjZXQobW9kZWwpLFxuXG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VGYWNldChtb2RlbCksXG4gICAgYmluOiBiaW4ucGFyc2VGYWNldChtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICB0aW1lVW5pdERvbWFpbjogdGltZVVuaXREb21haW4ucGFyc2VGYWNldChtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIGNvbG9yUmFuazogY29sb3JSYW5rLnBhcnNlRmFjZXQobW9kZWwpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyRGF0YShtb2RlbDogTGF5ZXJNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIC8vIGZpbHRlciBhbmQgZm9ybWF0UGFyc2UgY291bGQgY2F1c2UgdXMgdG8gbm90IGJlIGFibGUgdG8gbWVyZ2UgaW50byBwYXJlbnRcbiAgICAvLyBzbyBsZXQncyBwYXJzZSB0aGVtIGZpcnN0XG4gICAgZmlsdGVyOiBmaWx0ZXIucGFyc2VMYXllcihtb2RlbCksXG4gICAgZm9ybWF0UGFyc2U6IGZvcm1hdFBhcnNlLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIG51bGxGaWx0ZXI6IG51bGxGaWx0ZXIucGFyc2VMYXllcihtb2RlbCksXG4gICAgbm9uUG9zaXRpdmVGaWx0ZXI6IG5vblBvc2l0aXZlRmlsdGVyLnBhcnNlTGF5ZXIobW9kZWwpLFxuXG4gICAgLy8gZXZlcnl0aGluZyBhZnRlciBoZXJlIGRvZXMgbm90IGFmZmVjdCB3aGV0aGVyIHdlIGNhbiBtZXJnZSBjaGlsZCBkYXRhIGludG8gcGFyZW50IG9yIG5vdFxuICAgIHNvdXJjZTogc291cmNlLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGJpbjogYmluLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICB0aW1lVW5pdDogdGltZVVuaXQucGFyc2VMYXllcihtb2RlbCksXG4gICAgdGltZVVuaXREb21haW46IHRpbWVVbml0RG9tYWluLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VMYXllcihtb2RlbCksXG4gICAgc3RhY2tTY2FsZTogc3RhY2tTY2FsZS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBjb2xvclJhbms6IGNvbG9yUmFuay5wYXJzZUxheWVyKG1vZGVsKVxuICB9O1xufVxuXG5cbi8qIHRzbGludDplbmFibGU6bm8tdXNlLWJlZm9yZS1kZWNsYXJlICovXG5cbi8qKlxuICogQ3JlYXRlcyBWZWdhIERhdGEgYXJyYXkgZnJvbSBhIGdpdmVuIGNvbXBpbGVkIG1vZGVsIGFuZCBhcHBlbmQgYWxsIG9mIHRoZW0gdG8gdGhlIGdpdmVuIGFycmF5XG4gKlxuICogQHBhcmFtICBtb2RlbFxuICogQHBhcmFtICBkYXRhIGFycmF5XG4gKiBAcmV0dXJuIG1vZGlmaWVkIGRhdGEgYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlRGF0YShtb2RlbDogTW9kZWwsIGRhdGE6IFZnRGF0YVtdKSB7XG4gIGNvbnN0IGNvbXBvbmVudCA9IG1vZGVsLmNvbXBvbmVudC5kYXRhO1xuXG4gIGNvbnN0IHNvdXJjZURhdGEgPSBzb3VyY2UuYXNzZW1ibGUobW9kZWwsIGNvbXBvbmVudCk7XG4gIGlmIChzb3VyY2VEYXRhKSB7XG4gICAgZGF0YS5wdXNoKHNvdXJjZURhdGEpO1xuICB9XG5cbiAgc3VtbWFyeS5hc3NlbWJsZShjb21wb25lbnQsIG1vZGVsKS5mb3JFYWNoKGZ1bmN0aW9uKHN1bW1hcnlEYXRhKSB7XG4gICAgZGF0YS5wdXNoKHN1bW1hcnlEYXRhKTtcbiAgfSk7XG5cbiAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGRhdGFUYWJsZSA9IGRhdGFbZGF0YS5sZW5ndGggLSAxXTtcblxuICAgIC8vIGNvbG9yIHJhbmtcbiAgICBjb25zdCBjb2xvclJhbmtUcmFuc2Zvcm0gPSBjb2xvclJhbmsuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgICBpZiAoY29sb3JSYW5rVHJhbnNmb3JtLmxlbmd0aCA+IDApIHtcbiAgICAgIGRhdGFUYWJsZS50cmFuc2Zvcm0gPSAoZGF0YVRhYmxlLnRyYW5zZm9ybSB8fCBbXSkuY29uY2F0KGNvbG9yUmFua1RyYW5zZm9ybSk7XG4gICAgfVxuXG4gICAgLy8gbm9uUG9zaXRpdmVGaWx0ZXJcbiAgICBjb25zdCBub25Qb3NpdGl2ZUZpbHRlclRyYW5zZm9ybSA9IG5vblBvc2l0aXZlRmlsdGVyLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gICAgaWYgKG5vblBvc2l0aXZlRmlsdGVyVHJhbnNmb3JtLmxlbmd0aCA+IDApIHtcbiAgICAgIGRhdGFUYWJsZS50cmFuc2Zvcm0gPSAoZGF0YVRhYmxlLnRyYW5zZm9ybSB8fCBbXSkuY29uY2F0KG5vblBvc2l0aXZlRmlsdGVyVHJhbnNmb3JtKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleXMoY29tcG9uZW50LmNvbG9yUmFuaykubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbG9yUmFuayBub3QgbWVyZ2VkJyk7XG4gICAgfSBlbHNlIGlmIChrZXlzKGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcikubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG5vblBvc2l0aXZlRmlsdGVyIG5vdCBtZXJnZWQnKTtcbiAgICB9XG4gIH1cblxuICAvLyBzdGFja1xuICAvLyBUT0RPOiByZXZpc2UgaWYgdGhpcyBhY3R1YWxseSBzaG91bGQgYmUgYW4gYXJyYXlcbiAgY29uc3Qgc3RhY2tEYXRhID0gc3RhY2tTY2FsZS5hc3NlbWJsZShjb21wb25lbnQpO1xuICBpZiAoc3RhY2tEYXRhKSB7XG4gICAgZGF0YS5wdXNoKHN0YWNrRGF0YSk7XG4gIH1cblxuICB0aW1lVW5pdERvbWFpbi5hc3NlbWJsZShjb21wb25lbnQpLmZvckVhY2goZnVuY3Rpb24odGltZVVuaXREb21haW5EYXRhKSB7XG4gICAgZGF0YS5wdXNoKHRpbWVVbml0RG9tYWluRGF0YSk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn1cbiIsImltcG9ydCB7RGF0ZVRpbWUsIGRhdGVUaW1lRXhwciwgaXNEYXRlVGltZX0gZnJvbSAnLi4vLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtpc0VxdWFsRmlsdGVyLCBpc0luRmlsdGVyLCBpc1JhbmdlRmlsdGVyLCBGaWx0ZXJ9IGZyb20gJy4uLy4uL2ZpbHRlcic7XG5pbXBvcnQge1RpbWVVbml0LCBmaWVsZEV4cHIgYXMgdGltZVVuaXRGaWVsZEV4cHIsIGlzU2luZ2xlVGltZVVuaXR9IGZyb20gJy4uLy4uL3RpbWV1bml0JztcbmltcG9ydCB7aXNBcnJheSwgaXNTdHJpbmd9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZmlsdGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB2IHZhbHVlIHRvIGJlIGNvbnZlcnRlZCBpbnRvIFZlZ2EgRXhwcmVzc2lvblxuICAgKiBAcGFyYW0gdGltZVVuaXRcbiAgICogQHJldHVybiBWZWdhIEV4cHJlc3Npb24gb2YgdGhlIHZhbHVlIHYuIFRoaXMgY291bGQgYmUgb25lIG9mOlxuICAgKiAtIGEgdGltZXN0YW1wIHZhbHVlIG9mIGRhdGV0aW1lIG9iamVjdFxuICAgKiAtIGEgdGltZXN0YW1wIHZhbHVlIG9mIGNhc3RlZCBzaW5nbGUgdGltZSB1bml0IHZhbHVlXG4gICAqIC0gc3RyaW5naWZpZWQgdmFsdWVcbiAgICovXG4gIGZ1bmN0aW9uIHZhbHVlRXhwcih2OiBhbnksIHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICAgIGlmIChpc0RhdGVUaW1lKHYpKSB7XG4gICAgICBjb25zdCBleHByID0gZGF0ZVRpbWVFeHByKHYsIHRydWUpO1xuICAgICAgcmV0dXJuICd0aW1lKCcgKyBleHByICsgJyknO1xuICAgIH1cbiAgICBpZiAoaXNTaW5nbGVUaW1lVW5pdCh0aW1lVW5pdCkpIHtcbiAgICAgIGNvbnN0IGRhdGV0aW1lOiBEYXRlVGltZSA9IHt9O1xuICAgICAgZGF0ZXRpbWVbdGltZVVuaXRdID0gdjtcbiAgICAgIGNvbnN0IGV4cHIgPSBkYXRlVGltZUV4cHIoZGF0ZXRpbWUsIHRydWUpO1xuICAgICAgcmV0dXJuICd0aW1lKCcgKyBleHByICsgJyknO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyRXhwcmVzc2lvbihmaWx0ZXI6IEZpbHRlciB8IHN0cmluZykge1xuICAgIGlmIChpc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgICByZXR1cm4gZmlsdGVyIGFzIHN0cmluZztcbiAgICB9IGVsc2UgeyAvLyBGaWx0ZXIgT2JqZWN0XG4gICAgICBjb25zdCBmaWVsZEV4cHIgPSBmaWx0ZXIudGltZVVuaXQgP1xuICAgICAgICAvLyBGb3IgdGltZVVuaXQsIGNhc3QgaW50byBpbnRlZ2VyIHdpdGggdGltZSgpIHNvIHdlIGNhbiB1c2UgPT09LCBpbnJhbmdlLCBpbmRleE9mIHRvIGNvbXBhcmUgdmFsdWVzIGRpcmVjdGx5LlxuICAgICAgICAgIC8vIFRPRE86IFdlIGNhbGN1bGF0ZSB0aW1lVW5pdCBvbiB0aGUgZmx5IGhlcmUuIENvbnNpZGVyIGlmIHdlIHdvdWxkIGxpa2UgdG8gY29uc29saWRhdGUgdGhpcyB3aXRoIHRpbWVVbml0IHBpcGVsaW5lXG4gICAgICAgICAgLy8gVE9ETzogc3VwcG9ydCB1dGNcbiAgICAgICAgKCd0aW1lKCcgKyB0aW1lVW5pdEZpZWxkRXhwcihmaWx0ZXIudGltZVVuaXQsIGZpbHRlci5maWVsZCkgKyAnKScpIDpcbiAgICAgICAgZmllbGQoZmlsdGVyLCB7ZGF0dW06IHRydWV9KTtcblxuICAgICAgaWYgKGlzRXF1YWxGaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgICByZXR1cm4gZmllbGRFeHByICsgJz09PScgKyB2YWx1ZUV4cHIoZmlsdGVyLmVxdWFsLCBmaWx0ZXIudGltZVVuaXQpO1xuICAgICAgfSBlbHNlIGlmIChpc0luRmlsdGVyKGZpbHRlcikpIHtcbiAgICAgICAgcmV0dXJuICdpbmRleG9mKFsnICtcbiAgICAgICAgICBmaWx0ZXIuaW4ubWFwKCh2KSA9PiB2YWx1ZUV4cHIodiwgZmlsdGVyLnRpbWVVbml0KSkuam9pbignLCcpICtcbiAgICAgICAgICAnXSwgJyArIGZpZWxkRXhwciArICcpICE9PSAtMSc7XG4gICAgICB9IGVsc2UgaWYgKGlzUmFuZ2VGaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgICBjb25zdCBsb3dlciA9IGZpbHRlci5yYW5nZVswXTtcbiAgICAgICAgY29uc3QgdXBwZXIgPSBmaWx0ZXIucmFuZ2VbMV07XG5cbiAgICAgICAgaWYgKGxvd2VyICE9PSBudWxsICYmICB1cHBlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAnaW5yYW5nZSgnICsgZmllbGRFeHByICsgJywgJyArXG4gICAgICAgICAgICB2YWx1ZUV4cHIobG93ZXIsIGZpbHRlci50aW1lVW5pdCkgKyAnLCAnICtcbiAgICAgICAgICAgIHZhbHVlRXhwcih1cHBlciwgZmlsdGVyLnRpbWVVbml0KSArICcpJztcbiAgICAgICAgfSBlbHNlIGlmIChsb3dlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmaWVsZEV4cHIgKyAnID49ICcgKyBsb3dlcjtcbiAgICAgICAgfSBlbHNlIGlmICh1cHBlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmaWVsZEV4cHIgKyAnIDw9ICcgKyB1cHBlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IHN0cmluZyB7XG4gICAgY29uc3QgZmlsdGVyID0gbW9kZWwudHJhbnNmb3JtKCkuZmlsdGVyO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgIHJldHVybiAnKCcgK1xuICAgICAgICBmaWx0ZXIubWFwKChmKSA9PiBnZXRGaWx0ZXJFeHByZXNzaW9uKGYpKVxuICAgICAgICAgIC5maWx0ZXIoKGYpID0+IGYgIT09dW5kZWZpbmVkKVxuICAgICAgICAgIC5qb2luKCcpICYmICgnKSArXG4gICAgICAgICcpJztcbiAgICB9IGVsc2UgaWYgKGZpbHRlcikge1xuICAgICAgcmV0dXJuIGdldEZpbHRlckV4cHJlc3Npb24oZmlsdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBmaWx0ZXJDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UgYnV0IGhhcyBmaWx0ZXIsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcikge1xuICAgICAgLy8gbWVyZ2UgYnkgYWRkaW5nICYmXG4gICAgICBmaWx0ZXJDb21wb25lbnQgPVxuICAgICAgICAoZmlsdGVyQ29tcG9uZW50ID8gZmlsdGVyQ29tcG9uZW50ICsgJyAmJiAnIDogJycpICtcbiAgICAgICAgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcjtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBgZmlsdGVyLnBhcnNlTGF5ZXJgIG1ldGhvZCBpcyBjYWxsZWQgYmVmb3JlIGBzb3VyY2UucGFyc2VMYXllcmBcbiAgICBsZXQgZmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIgJiYgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlciA9PT0gZmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICAgIC8vIHNhbWUgZmlsdGVyIGluIGNoaWxkIHNvIHdlIGNhbiBqdXN0IGRlbGV0ZSBpdFxuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIGNvbnN0IGZpbHRlciA9IGNvbXBvbmVudC5maWx0ZXI7XG4gICAgcmV0dXJuIGZpbHRlciA/IFt7XG4gICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgIHRlc3Q6IGZpbHRlclxuICAgIH1dIDogW107XG4gIH1cbn1cbiIsImltcG9ydCB7RmllbGREZWYsIGlzQ291bnR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7UVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuZXhwb3J0IG5hbWVzcGFjZSBmb3JtYXRQYXJzZSB7XG4gIC8vIFRPRE86IG5lZWQgdG8gdGFrZSBjYWxjdWxhdGUgaW50byBhY2NvdW50IGFjcm9zcyBsZXZlbHMgd2hlbiBtZXJnaW5nXG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8c3RyaW5nPiB7XG4gICAgY29uc3QgY2FsY0ZpZWxkTWFwID0gKG1vZGVsLnRyYW5zZm9ybSgpLmNhbGN1bGF0ZSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKGZpZWxkTWFwLCBmb3JtdWxhKSB7XG4gICAgICBmaWVsZE1hcFtmb3JtdWxhLmZpZWxkXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmllbGRNYXA7XG4gICAgfSwge30pO1xuXG4gICAgbGV0IHBhcnNlQ29tcG9uZW50OiBEaWN0PHN0cmluZz4gPSB7fTtcbiAgICAvLyB1c2UgZm9yRWFjaCByYXRoZXIgdGhhbiByZWR1Y2Ugc28gdGhhdCBpdCBjYW4gcmV0dXJuIHVuZGVmaW5lZFxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIHBhcnNlIG5lZWRlZFxuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICAgICAgcGFyc2VDb21wb25lbnRbZmllbGREZWYuZmllbGRdID0gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgaWYgKGlzQ291bnQoZmllbGREZWYpIHx8IGNhbGNGaWVsZE1hcFtmaWVsZERlZi5maWVsZF0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGFyc2VDb21wb25lbnRbZmllbGREZWYuZmllbGRdID0gJ251bWJlcic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IHBhcnNlQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIGJ1dCBoYXMgaXRzIG93biBwYXJzZSwgdGhlbiBtZXJnZVxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSkge1xuICAgICAgZXh0ZW5kKHBhcnNlQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBub3RlIHRoYXQgd2UgcnVuIHRoaXMgYmVmb3JlIHNvdXJjZS5wYXJzZUxheWVyXG4gICAgbGV0IHBhcnNlQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpICYmICFkaWZmZXIoY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlLCBwYXJzZUNvbXBvbmVudCkpIHtcbiAgICAgICAgLy8gbWVyZ2UgcGFyc2UgdXAgaWYgdGhlIGNoaWxkIGRvZXMgbm90IGhhdmUgYW4gaW5jb21wYXRpYmxlIHBhcnNlXG4gICAgICAgIGV4dGVuZChwYXJzZUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VDb21wb25lbnQ7XG4gIH1cblxuICAvLyBBc3NlbWJsZSBmb3IgZm9ybWF0UGFyc2UgaXMgYW4gaWRlbnRpdHkgZnVuY3Rpb24sIG5vIG5lZWQgdG8gZGVjbGFyZVxufVxuIiwiaW1wb3J0IHtGb3JtdWxhfSBmcm9tICcuLi8uLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGhhc2gsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBmb3JtdWxhIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxGb3JtdWxhPiB7XG4gICAgcmV0dXJuIChtb2RlbC50cmFuc2Zvcm0oKS5jYWxjdWxhdGUgfHwgW10pLnJlZHVjZShmdW5jdGlvbihmb3JtdWxhQ29tcG9uZW50LCBmb3JtdWxhKSB7XG4gICAgICBmb3JtdWxhQ29tcG9uZW50W2hhc2goZm9ybXVsYSldID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiBmb3JtdWxhQ29tcG9uZW50O1xuICAgIH0sIHt9IGFzIERpY3Q8Rm9ybXVsYT4pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGZvcm11bGFDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIGV4dGVuZChmb3JtdWxhQ29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGZvcm11bGFDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZSkge1xuICAgICAgICBleHRlbmQoZm9ybXVsYUNvbXBvbmVudCB8fCB7fSwgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZSk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY2FsY3VsYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3JtdWxhQ29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiB2YWxzKGNvbXBvbmVudC5jYWxjdWxhdGUpLnJlZHVjZShmdW5jdGlvbih0cmFuc2Zvcm0sIGZvcm11bGEpIHtcbiAgICAgIHRyYW5zZm9ybS5wdXNoKGV4dGVuZCh7IHR5cGU6ICdmb3JtdWxhJyB9LCBmb3JtdWxhKSk7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uLy4uL3NjYWxlJztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBkaWZmZXIsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbi8qKlxuICogRmlsdGVyIG5vbi1wb3NpdGl2ZSB2YWx1ZSBmb3IgbG9nIHNjYWxlXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2Ugbm9uUG9zaXRpdmVGaWx0ZXIge1xuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBNb2RlbCk6IERpY3Q8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBtb2RlbC5jaGFubmVscygpLnJlZHVjZShmdW5jdGlvbihub25Qb3NpdGl2ZUNvbXBvbmVudCwgY2hhbm5lbCkge1xuICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgIGlmICghbW9kZWwuZmllbGQoY2hhbm5lbCkgfHwgIXNjYWxlKSB7XG4gICAgICAgIC8vIGRvbid0IHNldCBhbnl0aGluZ1xuICAgICAgICByZXR1cm4gbm9uUG9zaXRpdmVDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICBub25Qb3NpdGl2ZUNvbXBvbmVudFttb2RlbC5maWVsZChjaGFubmVsKV0gPSBzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuTE9HO1xuICAgICAgcmV0dXJuIG5vblBvc2l0aXZlQ29tcG9uZW50O1xuICAgIH0sIHt9IGFzIERpY3Q8Ym9vbGVhbj4pO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gY29uc2lkZXIgbWVyZ2luZ1xuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgLy8gRm9yIG5vdywgbGV0J3MgYXNzdW1lIGl0IGFsd2F5cyBoYXMgdW5pb24gc2NhbGVcbiAgICAgIGNvbnN0IG5vblBvc2l0aXZlRmlsdGVyQ29tcG9uZW50ID0gY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIHJldHVybiBub25Qb3NpdGl2ZUZpbHRlckNvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIERpY3Q8Ym9vbGVhbj47XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcbiAgICBsZXQgbm9uUG9zaXRpdmVGaWx0ZXIgPSB7fSBhcyBEaWN0PGJvb2xlYW4+O1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIsIG5vblBvc2l0aXZlRmlsdGVyKSkge1xuICAgICAgICBleHRlbmQobm9uUG9zaXRpdmVGaWx0ZXIsIGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcik7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9uUG9zaXRpdmVGaWx0ZXI7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGtleXMoY29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKS5maWx0ZXIoKGZpZWxkKSA9PiB7XG4gICAgICAvLyBPbmx5IGZpbHRlciBmaWVsZHMgKGtleXMpIHdpdGggdmFsdWUgPSB0cnVlXG4gICAgICByZXR1cm4gY29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyW2ZpZWxkXTtcbiAgICB9KS5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdmaWx0ZXInLFxuICAgICAgICB0ZXN0OiAnZGF0dW0uJyArIGZpZWxkICsgJyA+IDAnXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUX05VTExfRklMVEVSUyA9IHtcbiAgbm9taW5hbDogZmFsc2UsXG4gIG9yZGluYWw6IGZhbHNlLFxuICBxdWFudGl0YXRpdmU6IHRydWUsXG4gIHRlbXBvcmFsOiB0cnVlXG59O1xuXG4vLyBUT0RPOiByZW5hbWUgdG8gaW52YWxpZEZpbHRlclxuZXhwb3J0IG5hbWVzcGFjZSBudWxsRmlsdGVyIHtcbiAgLyoqIFJldHVybiBIYXNoc2V0IG9mIGZpZWxkcyBmb3IgbnVsbCBmaWx0ZXJpbmcgKGtleT1maWVsZCwgdmFsdWUgPSB0cnVlKS4gKi9cbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gbW9kZWwudHJhbnNmb3JtKCk7XG4gICAgbGV0IGZpbHRlckludmFsaWQgPSB0cmFuc2Zvcm0uZmlsdGVySW52YWxpZDtcblxuICAgIGlmIChmaWx0ZXJJbnZhbGlkID09PSB1bmRlZmluZWQgJiYgdHJhbnNmb3JtWydmaWx0ZXJOdWxsJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZmlsdGVySW52YWxpZCA9IHRyYW5zZm9ybVsnZmlsdGVyTnVsbCddO1xuICAgICAgY29uc29sZS53YXJuKCdmaWx0ZXJOdWxsIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgZmlsdGVySW52YWxpZCBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oYWdncmVnYXRvciwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmlsdGVySW52YWxpZCB8fFxuICAgICAgICAoZmlsdGVySW52YWxpZCA9PT0gdW5kZWZpbmVkICYmIGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkICE9PSAnKicgJiYgREVGQVVMVF9OVUxMX0ZJTFRFUlNbZmllbGREZWYudHlwZV0pKSB7XG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlZmluZSB0aGlzIHNvIHdlIGtub3cgdGhhdCB3ZSBkb24ndCBmaWx0ZXIgbnVsbHMgZm9yIHRoaXMgZmllbGRcbiAgICAgICAgLy8gdGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gbWVyZ2UgaW50byBwYXJlbnRzXG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgbnVsbEZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcblxuICAgIC8vIEZJWE1FOiBudWxsIGZpbHRlcnMgYXJlIG5vdCBwcm9wZXJseSBwcm9wYWdhdGVkIHJpZ2h0IG5vd1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlciwgbnVsbEZpbHRlckNvbXBvbmVudCkpIHtcbiAgICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKiogQ29udmVydCB0aGUgaGFzaHNldCBvZiBmaWVsZHMgdG8gYSBmaWx0ZXIgdHJhbnNmb3JtLiAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIGNvbnN0IGZpbHRlcmVkRmllbGRzID0ga2V5cyhjb21wb25lbnQubnVsbEZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gb25seSBpbmNsdWRlIGZpZWxkcyB0aGF0IGhhcyB2YWx1ZSA9IHRydWVcbiAgICAgIHJldHVybiBjb21wb25lbnQubnVsbEZpbHRlcltmaWVsZF07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkRmllbGRzLmxlbmd0aCA+IDAgP1xuICAgICAgW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlcmVkRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJyhkYXR1bS4nICsgZmllbGROYW1lICsgJyE9PW51bGwnICtcbiAgICAgICAgICAgICcgJiYgIWlzTmFOKGRhdHVtLicrIGZpZWxkTmFtZSArICcpKSc7XG4gICAgICAgIH0pLmpvaW4oJyAmJiAnKVxuICAgICAgfV0gOiBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEYXRhRm9ybWF0LCBTT1VSQ0V9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHtudWxsRmlsdGVyfSBmcm9tICcuL251bGxmaWx0ZXInO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7YmlufSBmcm9tICcuL2Jpbic7XG5pbXBvcnQge2Zvcm11bGF9IGZyb20gJy4vZm9ybXVsYSc7XG5pbXBvcnQge3RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBzb3VyY2Uge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBWZ0RhdGEge1xuICAgIGxldCBkYXRhID0gbW9kZWwuZGF0YSgpO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIC8vIElmIGRhdGEgaXMgZXhwbGljaXRseSBwcm92aWRlZFxuXG4gICAgICBsZXQgc291cmNlRGF0YTogVmdEYXRhID0geyBuYW1lOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpIH07XG4gICAgICBpZiAoZGF0YS52YWx1ZXMgJiYgZGF0YS52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBzb3VyY2VEYXRhLnZhbHVlcyA9IGRhdGEudmFsdWVzO1xuICAgICAgICBzb3VyY2VEYXRhLmZvcm1hdCA9IHsgdHlwZTogJ2pzb24nIH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgIHNvdXJjZURhdGEudXJsID0gZGF0YS51cmw7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBleHRlbnNpb24gZnJvbSBVUkwgdXNpbmcgc25pcHBldCBmcm9tXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjgwOTI5L2hvdy10by1leHRyYWN0LWV4dGVuc2lvbi1mcm9tLWZpbGVuYW1lLXN0cmluZy1pbi1qYXZhc2NyaXB0XG4gICAgICAgIGxldCBkZWZhdWx0RXh0ZW5zaW9uID0gLyg/OlxcLihbXi5dKykpPyQvLmV4ZWMoc291cmNlRGF0YS51cmwpWzFdO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKFsnanNvbicsICdjc3YnLCAndHN2JywgJ3RvcG9qc29uJ10sIGRlZmF1bHRFeHRlbnNpb24pKSB7XG4gICAgICAgICAgZGVmYXVsdEV4dGVuc2lvbiA9ICdqc29uJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhRm9ybWF0OiBEYXRhRm9ybWF0ID0gZGF0YS5mb3JtYXQgfHwge307XG5cbiAgICAgICAgLy8gRm9yIGJhY2t3YXJkIGNvbXBhdGFiaWxpdHkgZm9yIGZvcm1lciBgZGF0YS5mb3JtYXRUeXBlYCBwcm9wZXJ0eVxuICAgICAgICBjb25zdCBmb3JtYXRUeXBlOiBEYXRhRm9ybWF0ID0gZGF0YUZvcm1hdC50eXBlIHx8IGRhdGFbJ2Zvcm1hdFR5cGUnXTtcbiAgICAgICAgc291cmNlRGF0YS5mb3JtYXQgPVxuICAgICAgICAgIGV4dGVuZChcbiAgICAgICAgICAgIHsgdHlwZTogZm9ybWF0VHlwZSA/IGZvcm1hdFR5cGUgOiBkZWZhdWx0RXh0ZW5zaW9uIH0sXG4gICAgICAgICAgICBkYXRhRm9ybWF0LnByb3BlcnR5ID8geyBwcm9wZXJ0eTogZGF0YUZvcm1hdC5wcm9wZXJ0eSB9IDoge30sXG4gICAgICAgICAgICAvLyBGZWF0dXJlIGFuZCBtZXNoIGFyZSB0d28gbXV0dWFsbHkgZXhjbHVzaXZlIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGRhdGFGb3JtYXQuZmVhdHVyZSA/XG4gICAgICAgICAgICAgIHsgZmVhdHVyZSA6IGRhdGFGb3JtYXQuZmVhdHVyZSB9IDpcbiAgICAgICAgICAgIGRhdGFGb3JtYXQubWVzaCA/XG4gICAgICAgICAgICAgIHsgbWVzaCA6IGRhdGFGb3JtYXQubWVzaCB9IDpcbiAgICAgICAgICAgICAge31cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gICAgfSBlbHNlIGlmICghbW9kZWwucGFyZW50KCkpIHtcbiAgICAgIC8vIElmIGRhdGEgaXMgbm90IGV4cGxpY2l0bHkgcHJvdmlkZWQgYnV0IHRoZSBtb2RlbCBpcyBhIHJvb3QsXG4gICAgICAvLyBuZWVkIHRvIHByb2R1Y2UgYSBzb3VyY2UgYXMgd2VsbFxuICAgICAgcmV0dXJuIHsgbmFtZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKSB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IHNvdXJjZURhdGEgPSBwYXJzZShtb2RlbCk7XG4gICAgaWYgKCFtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhLnNvdXJjZSkge1xuICAgICAgLy8gSWYgdGhlIGNoaWxkIGRvZXMgbm90IGhhdmUgaXRzIG93biBzb3VyY2UsIGhhdmUgdG8gcmVuYW1lIGl0cyBzb3VyY2UuXG4gICAgICBtb2RlbC5jaGlsZCgpLnJlbmFtZURhdGEobW9kZWwuY2hpbGQoKS5kYXRhTmFtZShTT1VSQ0UpLCBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IHNvdXJjZURhdGEgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSkge1xuICAgICAgICAvLyB3ZSBjYW5ub3QgbWVyZ2UgaWYgdGhlIGNoaWxkIGhhcyBmaWx0ZXJzIGRlZmluZWQgZXZlbiBhZnRlciB3ZSB0cmllZCB0byBtb3ZlIHRoZW0gdXBcbiAgICAgICAgY29uc3QgY2FuTWVyZ2UgPSAhY2hpbGREYXRhLmZpbHRlciAmJiAhY2hpbGREYXRhLmZvcm1hdFBhcnNlICYmICFjaGlsZERhdGEubnVsbEZpbHRlcjtcbiAgICAgICAgaWYgKGNhbk1lcmdlKSB7XG4gICAgICAgICAgLy8gcmVuYW1lIHNvdXJjZSBiZWNhdXNlIHdlIGNhbiBqdXN0IHJlbW92ZSBpdFxuICAgICAgICAgIGNoaWxkLnJlbmFtZURhdGEoY2hpbGQuZGF0YU5hbWUoU09VUkNFKSwgbW9kZWwuZGF0YU5hbWUoU09VUkNFKSk7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkRGF0YS5zb3VyY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2hpbGQgZG9lcyBub3QgaGF2ZSBkYXRhIGRlZmluZWQgb3IgdGhlIHNhbWUgc291cmNlIHNvIGp1c3QgdXNlIHRoZSBwYXJlbnRzIHNvdXJjZVxuICAgICAgICAgIGNoaWxkRGF0YS5zb3VyY2UgPSB7XG4gICAgICAgICAgICBuYW1lOiBjaGlsZC5kYXRhTmFtZShTT1VSQ0UpLFxuICAgICAgICAgICAgc291cmNlOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKG1vZGVsOiBNb2RlbCwgY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgaWYgKGNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSBjb21wb25lbnQuc291cmNlO1xuXG4gICAgICBpZiAoY29tcG9uZW50LmZvcm1hdFBhcnNlKSB7XG4gICAgICAgIGNvbXBvbmVudC5zb3VyY2UuZm9ybWF0ID0gY29tcG9uZW50LnNvdXJjZS5mb3JtYXQgfHwge307XG4gICAgICAgIGNvbXBvbmVudC5zb3VyY2UuZm9ybWF0LnBhcnNlID0gY29tcG9uZW50LmZvcm1hdFBhcnNlO1xuICAgICAgfVxuXG4gICAgICAvLyBudWxsIGZpbHRlciBjb21lcyBmaXJzdCBzbyB0cmFuc2Zvcm1zIGFyZSBub3QgcGVyZm9ybWVkIG9uIG51bGwgdmFsdWVzXG4gICAgICAvLyB0aW1lIGFuZCBiaW4gc2hvdWxkIGNvbWUgYmVmb3JlIGZpbHRlciBzbyB3ZSBjYW4gZmlsdGVyIGJ5IHRpbWUgYW5kIGJpblxuICAgICAgc291cmNlRGF0YS50cmFuc2Zvcm0gPSBbXS5jb25jYXQoXG4gICAgICAgIG51bGxGaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgZm9ybXVsYS5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBmaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgYmluLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIHRpbWVVbml0LmFzc2VtYmxlKGNvbXBvbmVudClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtTVEFDS0VEX1NDQUxFLCBTVU1NQVJZfSBmcm9tICcuLi8uLi9kYXRhJztcbmltcG9ydCB7ZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vLi4vdW5pdCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG4vKipcbiAqIFN0YWNrZWQgc2NhbGUgZGF0YSBzb3VyY2UsIGZvciBmZWVkaW5nIHRoZSBzaGFyZWQgc2NhbGUuXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2Ugc3RhY2tTY2FsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaXQobW9kZWw6IFVuaXRNb2RlbCk6IFZnRGF0YSB7XG4gICAgY29uc3Qgc3RhY2tQcm9wcyA9IG1vZGVsLnN0YWNrKCk7XG5cbiAgICBpZiAoc3RhY2tQcm9wcykge1xuICAgICAgLy8gcHJvZHVjZSBzdGFja2VkIHNjYWxlXG4gICAgICBjb25zdCBncm91cGJ5Q2hhbm5lbCA9IHN0YWNrUHJvcHMuZ3JvdXBieUNoYW5uZWw7XG4gICAgICBjb25zdCBmaWVsZENoYW5uZWwgPSBzdGFja1Byb3BzLmZpZWxkQ2hhbm5lbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpLCAvLyBhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uXG4gICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAvLyBncm91cCBieSBjaGFubmVsIGFuZCBvdGhlciBmYWNldHNcbiAgICAgICAgICBncm91cGJ5OiBbbW9kZWwuZmllbGQoZ3JvdXBieUNoYW5uZWwpXSxcbiAgICAgICAgICAvLyBwcm9kdWNlIHN1bSBvZiB0aGUgZmllbGQncyB2YWx1ZSBlLmcuLCBzdW0gb2Ygc3VtLCBzdW0gb2YgZGlzdGluY3RcbiAgICAgICAgICBzdW1tYXJpemU6IFt7IG9wczogWydzdW0nXSwgZmllbGQ6IG1vZGVsLmZpZWxkKGZpZWxkQ2hhbm5lbCkgfV1cbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGQgPSBtb2RlbC5jaGlsZCgpO1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIGJ1dCBoYXMgc3RhY2sgc2NhbGUgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlKSB7XG4gICAgICBsZXQgc3RhY2tDb21wb25lbnQgPSBjaGlsZERhdGFDb21wb25lbnQuc3RhY2tTY2FsZTtcblxuICAgICAgY29uc3QgbmV3TmFtZSA9IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpO1xuICAgICAgY2hpbGQucmVuYW1lRGF0YShzdGFja0NvbXBvbmVudC5uYW1lLCBuZXdOYW1lKTtcbiAgICAgIHN0YWNrQ29tcG9uZW50Lm5hbWUgPSBuZXdOYW1lO1xuXG4gICAgICAvLyBSZWZlciB0byBmYWNldCdzIHN1bW1hcnkgaW5zdGVhZCAoYWx3YXlzIHN1bW1hcnkgYmVjYXVzZSBzdGFja2VkIG9ubHkgd29ya3Mgd2l0aCBhZ2dyZWdhdGlvbilcbiAgICAgIHN0YWNrQ29tcG9uZW50LnNvdXJjZSA9IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpO1xuXG4gICAgICAvLyBBZGQgbW9yZSBkaW1lbnNpb25zIGZvciByb3cvY29sdW1uXG4gICAgICBzdGFja0NvbXBvbmVudC50cmFuc2Zvcm1bMF0uZ3JvdXBieSA9IG1vZGVsLnJlZHVjZShmdW5jdGlvbihncm91cGJ5LCBmaWVsZERlZikge1xuICAgICAgICBncm91cGJ5LnB1c2goZmllbGQoZmllbGREZWYpKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwYnk7XG4gICAgICB9LCBzdGFja0NvbXBvbmVudC50cmFuc2Zvcm1bMF0uZ3JvdXBieSk7XG5cbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuc3RhY2tTY2FsZTtcbiAgICAgIHJldHVybiBzdGFja0NvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIFRPRE9cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gY29tcG9uZW50LnN0YWNrU2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uLy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtmaWVsZCwgRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7a2V5cywgdmFscywgcmVkdWNlLCBoYXNoLCBEaWN0LCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50LCBTdW1tYXJ5Q29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3VtbWFyeSB7XG4gIGZ1bmN0aW9uIGFkZERpbWVuc2lvbihkaW1zOiB7IFtmaWVsZDogc3RyaW5nXTogYm9vbGVhbiB9LCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSldID0gdHJ1ZTtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSldID0gdHJ1ZTtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX2VuZCcgfSldID0gdHJ1ZTtcblxuICAgICAgLy8gY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgIC8vIGlmIChzY2FsZVR5cGUoc2NhbGUsIGZpZWxkRGVmLCBjaGFubmVsLCBtb2RlbC5tYXJrKCkpID09PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gYWxzbyBwcm9kdWNlIGJpbl9yYW5nZSBpZiB0aGUgYmlubmVkIGZpZWxkIHVzZSBvcmRpbmFsIHNjYWxlXG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSldID0gdHJ1ZTtcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGltc1tmaWVsZChmaWVsZERlZildID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpbXM7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0KG1vZGVsOiBNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgLyogc3RyaW5nIHNldCBmb3IgZGltZW5zaW9ucyAqL1xuICAgIGxldCBkaW1zOiBTdHJpbmdTZXQgPSB7fTtcblxuICAgIC8qIGRpY3Rpb25hcnkgbWFwcGluZyBmaWVsZCBuYW1lID0+IGRpY3Qgc2V0IG9mIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9ucyAqL1xuICAgIGxldCBtZWFzOiBEaWN0PFN0cmluZ1NldD4gPSB7fTtcblxuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgICAgIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UKSB7XG4gICAgICAgICAgbWVhc1snKiddID0gbWVhc1snKiddIHx8IHt9O1xuICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLXN0cmluZy1saXRlcmFsICovXG4gICAgICAgICAgbWVhc1snKiddWydjb3VudCddID0gdHJ1ZTtcbiAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXN0cmluZy1saXRlcmFsICovXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVhc1tmaWVsZERlZi5maWVsZF0gPSBtZWFzW2ZpZWxkRGVmLmZpZWxkXSB8fCB7fTtcbiAgICAgICAgICBtZWFzW2ZpZWxkRGVmLmZpZWxkXVtmaWVsZERlZi5hZ2dyZWdhdGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkRGltZW5zaW9uKGRpbXMsIGZpZWxkRGVmKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBbe1xuICAgICAgbmFtZTogbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSksXG4gICAgICBkaW1lbnNpb25zOiBkaW1zLFxuICAgICAgbWVhc3VyZXM6IG1lYXNcbiAgICB9XTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKTogU3VtbWFyeUNvbXBvbmVudFtdIHtcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UgYnV0IGhhcyBhIHN1bW1hcnkgZGF0YSBzb3VyY2UsIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICBsZXQgc3VtbWFyeUNvbXBvbmVudHMgPSBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeS5tYXAoZnVuY3Rpb24oc3VtbWFyeUNvbXBvbmVudCkge1xuICAgICAgICAvLyBhZGQgZmFjZXQgZmllbGRzIGFzIGRpbWVuc2lvbnNcbiAgICAgICAgc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zID0gbW9kZWwucmVkdWNlKGFkZERpbWVuc2lvbiwgc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zKTtcblxuICAgICAgICBjb25zdCBzdW1tYXJ5TmFtZVdpdGhvdXRQcmVmaXggPSBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUuc3Vic3RyKG1vZGVsLmNoaWxkKCkubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgbW9kZWwuY2hpbGQoKS5yZW5hbWVEYXRhKHN1bW1hcnlDb21wb25lbnQubmFtZSwgc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4KTtcbiAgICAgICAgc3VtbWFyeUNvbXBvbmVudC5uYW1lID0gc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4O1xuICAgICAgICByZXR1cm4gc3VtbWFyeUNvbXBvbmVudDtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnk7XG4gICAgICByZXR1cm4gc3VtbWFyeUNvbXBvbmVudHM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlTWVhc3VyZXMocGFyZW50TWVhc3VyZXM6IERpY3Q8RGljdDxib29sZWFuPj4sIGNoaWxkTWVhc3VyZXM6IERpY3Q8RGljdDxib29sZWFuPj4pIHtcbiAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGNoaWxkTWVhc3VyZXMpIHtcbiAgICAgIGlmIChjaGlsZE1lYXN1cmVzLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuICAgICAgICAvLyB3aGVuIHdlIG1lcmdlIGEgbWVhc3VyZSwgd2UgZWl0aGVyIGhhdmUgdG8gYWRkIGFuIGFnZ3JlZ2F0aW9uIG9wZXJhdG9yIG9yIGV2ZW4gYSBuZXcgZmllbGRcbiAgICAgICAgY29uc3Qgb3BzID0gY2hpbGRNZWFzdXJlc1tmaWVsZF07XG4gICAgICAgIGZvciAoY29uc3Qgb3AgaW4gb3BzKSB7XG4gICAgICAgICAgaWYgKG9wcy5oYXNPd25Qcm9wZXJ0eShvcCkpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZCBpbiBwYXJlbnRNZWFzdXJlcykge1xuICAgICAgICAgICAgICAvLyBhZGQgb3BlcmF0b3IgdG8gZXhpc3RpbmcgbWVhc3VyZSBmaWVsZFxuICAgICAgICAgICAgICBwYXJlbnRNZWFzdXJlc1tmaWVsZF1bb3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcmVudE1lYXN1cmVzW2ZpZWxkXSA9IHsgb3A6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgLy8gSW5kZXggYnkgdGhlIGZpZWxkcyB3ZSBhcmUgZ3JvdXBpbmcgYnlcbiAgICBsZXQgc3VtbWFyaWVzID0ge30gYXMgRGljdDxTdW1tYXJ5Q29tcG9uZW50PjtcblxuICAgIC8vIENvbWJpbmUgc3VtbWFyaWVzIGZvciBjaGlsZHJlbiB0aGF0IGRvbid0IGhhdmUgYSBkaXN0aW5jdCBzb3VyY2VcbiAgICAvLyAoZWl0aGVyIGhhdmluZyBpdHMgb3duIGRhdGEgc291cmNlLCBvciBpdHMgb3duIHRyYW5mb3JtYXRpb24gb2YgdGhlIHNhbWUgZGF0YSBzb3VyY2UpLlxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBzdW1tYXJpZXMgaWYgd2UgY2FuXG4gICAgICAgIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5LmZvckVhY2goKGNoaWxkU3VtbWFyeSkgPT4ge1xuICAgICAgICAgIC8vIFRoZSBrZXkgaXMgYSBoYXNoIGJhc2VkIG9uIHRoZSBkaW1lbnNpb25zO1xuICAgICAgICAgIC8vIHdlIHVzZSBpdCB0byBmaW5kIG91dCB3aGV0aGVyIHdlIGhhdmUgYSBzdW1tYXJ5IHRoYXQgdXNlcyB0aGUgc2FtZSBncm91cCBieSBmaWVsZHMuXG4gICAgICAgICAgY29uc3Qga2V5ID0gaGFzaChjaGlsZFN1bW1hcnkuZGltZW5zaW9ucyk7XG4gICAgICAgICAgaWYgKGtleSBpbiBzdW1tYXJpZXMpIHtcbiAgICAgICAgICAgIC8vIHllcywgdGhlcmUgaXMgYSBzdW1tYXJ5IGhhdCB3ZSBuZWVkIHRvIG1lcmdlIGludG9cbiAgICAgICAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgZGltZW5zaW9ucyBhcmUgdGhlIHNhbWUgc28gd2Ugb25seSBuZWVkIHRvIG1lcmdlIHRoZSBtZWFzdXJlc1xuICAgICAgICAgICAgbWVyZ2VNZWFzdXJlcyhzdW1tYXJpZXNba2V5XS5tZWFzdXJlcywgY2hpbGRTdW1tYXJ5Lm1lYXN1cmVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2l2ZSB0aGUgc3VtbWFyeSBhIG5ldyBuYW1lXG4gICAgICAgICAgICBjaGlsZFN1bW1hcnkubmFtZSA9IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpICsgJ18nICsga2V5cyhzdW1tYXJpZXMpLmxlbmd0aDtcbiAgICAgICAgICAgIHN1bW1hcmllc1trZXldID0gY2hpbGRTdW1tYXJ5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbW92ZSBzdW1tYXJ5IGZyb20gY2hpbGRcbiAgICAgICAgICBjaGlsZC5yZW5hbWVEYXRhKGNoaWxkLmRhdGFOYW1lKFNVTU1BUlkpLCBzdW1tYXJpZXNba2V5XS5uYW1lKTtcbiAgICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHMoc3VtbWFyaWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlbWJsZSB0aGUgc3VtbWFyeS4gTmVlZHMgYSByZW5hbWUgZnVuY3Rpb24gYmVjYXVzZSB3ZSBjYW5ub3QgZ3VhcmFudGVlIHRoYXQgdGhlXG4gICAqIHBhcmVudCBkYXRhIGJlZm9yZSB0aGUgY2hpbGRyZW4gZGF0YS5cbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQsIG1vZGVsOiBNb2RlbCk6IFZnRGF0YVtdIHtcbiAgICBpZiAoIWNvbXBvbmVudC5zdW1tYXJ5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc3VtbWFyeS5yZWR1Y2UoZnVuY3Rpb24oc3VtbWFyeURhdGEsIHN1bW1hcnlDb21wb25lbnQpIHtcbiAgICAgIGNvbnN0IGRpbXMgPSBzdW1tYXJ5Q29tcG9uZW50LmRpbWVuc2lvbnM7XG4gICAgICBjb25zdCBtZWFzID0gc3VtbWFyeUNvbXBvbmVudC5tZWFzdXJlcztcblxuICAgICAgY29uc3QgZ3JvdXBieSA9IGtleXMoZGltcyk7XG5cbiAgICAgIC8vIHNob3J0LWZvcm1hdCBzdW1tYXJpemUgb2JqZWN0IGZvciBWZWdhJ3MgYWdncmVnYXRlIHRyYW5zZm9ybVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS93aWtpL0RhdGEtVHJhbnNmb3JtcyMtYWdncmVnYXRlXG4gICAgICBjb25zdCBzdW1tYXJpemUgPSByZWR1Y2UobWVhcywgZnVuY3Rpb24oYWdncmVnYXRvciwgZm5EaWN0U2V0LCBmaWVsZCkge1xuICAgICAgICBhZ2dyZWdhdG9yW2ZpZWxkXSA9IGtleXMoZm5EaWN0U2V0KTtcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0b3I7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIGlmIChrZXlzKG1lYXMpLmxlbmd0aCA+IDApIHsgLy8gaGFzIGFnZ3JlZ2F0ZVxuICAgICAgICBzdW1tYXJ5RGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBzdW1tYXJ5Q29tcG9uZW50Lm5hbWUsXG4gICAgICAgICAgc291cmNlOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpLFxuICAgICAgICAgIHRyYW5zZm9ybTogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhZ2dyZWdhdGUnLFxuICAgICAgICAgICAgZ3JvdXBieTogZ3JvdXBieSxcbiAgICAgICAgICAgIHN1bW1hcml6ZTogc3VtbWFyaXplXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VtbWFyeURhdGE7XG4gICAgfSwgW10pO1xuICB9XG59XG4iLCJpbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtmaWVsZCwgRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7ZmllbGRFeHByfSBmcm9tICcuLi8uLi90aW1ldW5pdCc7XG5pbXBvcnQge1RFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRpbWVVbml0IHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxWZ1RyYW5zZm9ybT4ge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXRDb21wb25lbnQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGZpZWxkRGVmLnRpbWVVbml0KSB7XG5cbiAgICAgICAgY29uc3QgaGFzaCA9IGZpZWxkKGZpZWxkRGVmKTtcblxuICAgICAgICB0aW1lVW5pdENvbXBvbmVudFtoYXNoXSA9IHtcbiAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKSxcbiAgICAgICAgICBleHByOiBmaWVsZEV4cHIoZmllbGREZWYudGltZVVuaXQsIGZpZWxkRGVmLmZpZWxkKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCB0aW1lVW5pdENvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKHRpbWVVbml0Q29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQpO1xuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdDtcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVVbml0Q29tcG9uZW50O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgdGltZVVuaXRDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKHRpbWVVbml0Q29tcG9uZW50LCBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICAvLyBqdXN0IGpvaW4gdGhlIHZhbHVlcywgd2hpY2ggYXJlIGFscmVhZHkgdHJhbnNmb3Jtc1xuICAgIHJldHVybiB2YWxzKGNvbXBvbmVudC50aW1lVW5pdCk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2RhdGVUaW1lRXhwciwgRGF0ZVRpbWVFeHByfSBmcm9tICcuLi8uLi9kYXRldGltZSc7XG5pbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1RpbWVVbml0LCByYXdEb21haW59IGZyb20gJy4uLy4uL3RpbWV1bml0JztcbmltcG9ydCB7ZXh0ZW5kLCBrZXlzLCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgdGltZVVuaXREb21haW4ge1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBTdHJpbmdTZXQge1xuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24odGltZVVuaXREb21haW5NYXAsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLnRpbWVVbml0KSB7XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCk7XG4gICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICB0aW1lVW5pdERvbWFpbk1hcFtmaWVsZERlZi50aW1lVW5pdF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGltZVVuaXREb21haW5NYXA7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgLy8gYWx3YXlzIG1lcmdlIHdpdGggY2hpbGRcbiAgICByZXR1cm4gZXh0ZW5kKHBhcnNlKG1vZGVsKSwgbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YS50aW1lVW5pdERvbWFpbik7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIGFsd2F5cyBtZXJnZSB3aXRoIGNoaWxkcmVuXG4gICAgcmV0dXJuIGV4dGVuZChwYXJzZShtb2RlbCksIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIHJldHVybiBjaGlsZC5jb21wb25lbnQuZGF0YS50aW1lVW5pdERvbWFpbjtcbiAgICB9KSk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KTogVmdEYXRhW10ge1xuICAgIHJldHVybiBrZXlzKGNvbXBvbmVudC50aW1lVW5pdERvbWFpbikucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0RGF0YSwgdHU6IGFueSkge1xuICAgICAgY29uc3QgdGltZVVuaXQ6IFRpbWVVbml0ID0gdHU7IC8vIGNhc3Qgc3RyaW5nIGJhY2sgdG8gZW51bVxuICAgICAgY29uc3QgZG9tYWluID0gcmF3RG9tYWluKHRpbWVVbml0LCBudWxsKTsgLy8gRklYTUUgZml4IHJhd0RvbWFpbiBzaWduYXR1cmVcbiAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgbGV0IGRhdGV0aW1lOiBEYXRlVGltZUV4cHIgPSB7fTtcbiAgICAgICAgZGF0ZXRpbWVbdGltZVVuaXRdID0gJ2RhdHVtLmRhdGEnO1xuXG4gICAgICAgIHRpbWVVbml0RGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lOiB0aW1lVW5pdCxcbiAgICAgICAgICB2YWx1ZXM6IGRvbWFpbixcbiAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGUnLFxuICAgICAgICAgICAgZXhwcjogZGF0ZVRpbWVFeHByKGRhdGV0aW1lKVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0RGF0YTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7QXhpc09yaWVudCwgQXhpc30gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtGYWNldH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ0ZvckVhY2h9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWYsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7RmFjZXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHZhbHMsIGZsYXR0ZW4sIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhLCBWZ01hcmtHcm91cH0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge3BhcnNlQXhpcywgcGFyc2VJbm5lckF4aXMsIGdyaWRTaG93LCBwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZUZhY2V0RGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VGYWNldExheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3BhcnNlU2NhbGVDb21wb25lbnR9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgRmFjZXRNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfZmFjZXQ6IEZhY2V0O1xuXG4gIHByaXZhdGUgX2NoaWxkOiBNb2RlbDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBGYWNldFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgLy8gQ29uZmlnIG11c3QgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIGNoaWxkIGFzIGl0IGdldHMgY2FzY2FkZWQgdG8gdGhlIGNoaWxkXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcblxuICAgIGNvbnN0IGNoaWxkICA9IHRoaXMuX2NoaWxkID0gYnVpbGRNb2RlbChzcGVjLnNwZWMsIHRoaXMsIHRoaXMubmFtZSgnY2hpbGQnKSk7XG5cbiAgICBjb25zdCBmYWNldCAgPSB0aGlzLl9mYWNldCA9IHRoaXMuX2luaXRGYWNldChzcGVjLmZhY2V0KTtcbiAgICB0aGlzLl9zY2FsZSAgPSB0aGlzLl9pbml0U2NhbGUoZmFjZXQsIGNvbmZpZywgY2hpbGQpO1xuICAgIHRoaXMuX2F4aXMgICA9IHRoaXMuX2luaXRBeGlzKGZhY2V0LCBjb25maWcsIGNoaWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHNwZWNDb25maWcsIHBhcmVudCA/IHBhcmVudC5jb25maWcoKSA6IHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGYWNldChmYWNldDogRmFjZXQpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZmFjZXQgPSBkdXBsaWNhdGUoZmFjZXQpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgZmFjZXQsIGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgLy8gVE9ETzogaWYgaGFzIG5vIGZpZWxkIC8gZGF0dW0sIHRoZW4gZHJvcCB0aGUgZmllbGRcblxuICAgICAgaWYgKCFpc0RpbWVuc2lvbihmaWVsZERlZikpIHtcbiAgICAgICAgbW9kZWwuYWRkV2FybmluZyhjaGFubmVsICsgJyBlbmNvZGluZyBzaG91bGQgYmUgb3JkaW5hbC4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhY2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKGZhY2V0OiBGYWNldCwgY29uZmlnOiBDb25maWcsIGNoaWxkOiBNb2RlbCk6IERpY3Q8U2NhbGU+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX3NjYWxlLCBjaGFubmVsKSB7XG4gICAgICBpZiAoZmFjZXRbY2hhbm5lbF0pIHtcblxuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSBmYWNldFtjaGFubmVsXS5zY2FsZSB8fCB7fTtcbiAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICAgICAgICByb3VuZDogY29uZmlnLmZhY2V0LnNjYWxlLnJvdW5kLFxuXG4gICAgICAgICAgLy8gVE9ETzogcmV2aXNlIHRoaXMgcnVsZSBmb3IgbXVsdGlwbGUgbGV2ZWwgb2YgbmVzdGluZ1xuICAgICAgICAgIHBhZGRpbmc6IChjaGFubmVsID09PSBST1cgJiYgY2hpbGQuaGFzKFkpKSB8fCAoY2hhbm5lbCA9PT0gQ09MVU1OICYmIGNoaWxkLmhhcyhYKSkgP1xuICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mYWNldC5zY2FsZS5wYWRkaW5nIDogMFxuICAgICAgICB9LCBzY2FsZVNwZWMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXhpcyhmYWNldDogRmFjZXQsIGNvbmZpZzogQ29uZmlnLCBjaGlsZDogTW9kZWwpOiBEaWN0PEF4aXM+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX2F4aXMsIGNoYW5uZWwpIHtcbiAgICAgIGlmIChmYWNldFtjaGFubmVsXSkge1xuICAgICAgICBjb25zdCBheGlzU3BlYyA9IGZhY2V0W2NoYW5uZWxdLmF4aXM7XG4gICAgICAgIGlmIChheGlzU3BlYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbEF4aXMgPSBfYXhpc1tjaGFubmVsXSA9IGV4dGVuZCh7fSxcbiAgICAgICAgICAgIGNvbmZpZy5mYWNldC5heGlzLFxuICAgICAgICAgICAgYXhpc1NwZWMgPT09IHRydWUgPyB7fSA6IGF4aXNTcGVjIHx8IHt9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChjaGFubmVsID09PSBST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzOiBhbnkgPSBjaGlsZC5heGlzKFkpO1xuICAgICAgICAgICAgaWYgKHlBeGlzICYmIHlBeGlzLm9yaWVudCAhPT0gQXhpc09yaWVudC5SSUdIVCAmJiAhbW9kZWxBeGlzLm9yaWVudCkge1xuICAgICAgICAgICAgICBtb2RlbEF4aXMub3JpZW50ID0gQXhpc09yaWVudC5SSUdIVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCBjaGlsZC5oYXMoWCkgJiYgIW1vZGVsQXhpcy5sYWJlbEFuZ2xlKSB7XG4gICAgICAgICAgICAgIG1vZGVsQXhpcy5sYWJlbEFuZ2xlID0gbW9kZWxBeGlzLm9yaWVudCA9PT0gQXhpc09yaWVudC5SSUdIVCA/IDkwIDogMjcwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9heGlzO1xuICAgIH0sIHt9IGFzIERpY3Q8QXhpcz4pO1xuICB9XG5cbiAgcHVibGljIGZhY2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9mYWNldDtcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2ZhY2V0W2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGNoaWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzU3VtbWFyeSgpIHtcbiAgICBjb25zdCBzdW1tYXJ5ID0gdGhpcy5jb21wb25lbnQuZGF0YS5zdW1tYXJ5O1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHN1bW1hcnkubGVuZ3RoIDsgaSsrKSB7XG4gICAgICBpZiAoa2V5cyhzdW1tYXJ5W2ldLm1lYXN1cmVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmhhc1N1bW1hcnkoKSA/IFNVTU1BUlkgOiBTT1VSQ0UpICsgJyc7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldCgpW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCkge1xuICAgIHJldHVybiBudWxsOyAvLyB0aGlzIGlzIG9ubHkgYSBwcm9wZXJ0eSBmb3IgVW5pdE1vZGVsXG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZURhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5kYXRhID0gcGFyc2VGYWNldERhdGEodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTZWxlY3Rpb25EYXRhKCkge1xuICAgIC8vIFRPRE86IEBhcnZpbmQgY2FuIHdyaXRlIHRoaXNcbiAgICAvLyBXZSBtaWdodCBuZWVkIHRvIHNwbGl0IHRoaXMgaW50byBjb21waWxlU2VsZWN0aW9uRGF0YSBhbmQgY29tcGlsZVNlbGVjdGlvblNpZ25hbHM/XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMYXlvdXREYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZUZhY2V0TGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkKCk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBzY2FsZXMgZm9yIGZpZWxkIHJlZmVyZW5jZSBvZiBwYXJlbnQgZGF0YSAoZS5nLiwgZm9yIFNQTE9NKVxuXG4gICAgLy8gRmlyc3QsIGFkZCBzY2FsZSBmb3Igcm93IGFuZCBjb2x1bW4uXG4gICAgbGV0IHNjYWxlQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuc2NhbGUgPSBwYXJzZVNjYWxlQ29tcG9uZW50KHRoaXMpO1xuXG4gICAgLy8gVGhlbiwgbW92ZSBzaGFyZWQvdW5pb24gZnJvbSBpdHMgY2hpbGQgc3BlYy5cbiAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5zY2FsZSkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAvLyBUT0RPOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggc2NhbGUsIG5lZWQgdG8gcmVuYW1lXG4gICAgICAgIHZhbHMoc2NhbGVDb21wb25lbnRbY2hhbm5lbF0pLmZvckVhY2goZnVuY3Rpb24oc2NhbGUpIHtcbiAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuc2NhbGVOYW1lKHNjYWxlTmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICAgIGNoaWxkLnJlbmFtZVNjYWxlKHNjYWxlLm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmNlIHB1dCBpbiBwYXJlbnQsIGp1c3QgcmVtb3ZlIHRoZSBjaGlsZCdzIHNjYWxlLlxuICAgICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VNYXJrKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5tYXJrID0gZXh0ZW5kKFxuICAgICAge1xuICAgICAgICBuYW1lOiB0aGlzLm5hbWUoJ2NlbGwnKSxcbiAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAgIHRoaXMuZGF0YVRhYmxlKCkgPyB7ZGF0YTogdGhpcy5kYXRhVGFibGUoKX0gOiB7fSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdmYWNldCcsXG4gICAgICAgICAgICAgIGdyb3VwYnk6IFtdLmNvbmNhdChcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhST1cpID8gW3RoaXMuZmllbGQoUk9XKV0gOiBbXSxcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhDT0xVTU4pID8gW3RoaXMuZmllbGQoQ09MVU1OKV0gOiBbXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVwZGF0ZTogZ2V0RmFjZXRHcm91cFByb3BlcnRpZXModGhpcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIENhbGwgY2hpbGQncyBhc3NlbWJsZUdyb3VwIHRvIGFkZCBtYXJrcywgc2NhbGVzLCBheGVzLCBhbmQgbGVnZW5kcy5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4gY2FsbCBjaGlsZCdzIGFzc2VtYmxlR3JvdXAoKSBoZXJlIGJlY2F1c2UgcGFyc2VNYXJrKClcbiAgICAgIC8vIGlzIHRoZSBsYXN0IG1ldGhvZCBpbiBjb21waWxlKCkgYW5kIHRodXMgdGhlIGNoaWxkIGlzIGNvbXBsZXRlbHkgY29tcGlsZWRcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLmNoaWxkKCkuYXNzZW1ibGVHcm91cCgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlQXhpcygpO1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1JPVywgQ09MVU1OXSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgLy8gVE9ETzogd2l0aCBuZXN0aW5nLCB3ZSBtaWdodCBuZWVkIHRvIGNvbnNpZGVyIGNhbGxpbmcgY2hpbGRcbiAgICAvLyB0aGlzLmNoaWxkKCkucGFyc2VBeGlzR3JvdXAoKTtcblxuICAgIGNvbnN0IHhBeGlzR3JvdXAgPSBwYXJzZUF4aXNHcm91cCh0aGlzLCBYKTtcbiAgICBjb25zdCB5QXhpc0dyb3VwID0gcGFyc2VBeGlzR3JvdXAodGhpcywgWSk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5heGlzR3JvdXAgPSBleHRlbmQoXG4gICAgICB4QXhpc0dyb3VwID8ge3g6IHhBeGlzR3JvdXB9IDoge30sXG4gICAgICB5QXhpc0dyb3VwID8ge3k6IHlBeGlzR3JvdXB9IDoge31cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIC8vIFRPRE86IHdpdGggbmVzdGluZywgd2UgbWlnaHQgbmVlZCB0byBjb25zaWRlciBjYWxsaW5nIGNoaWxkXG4gICAgLy8gdGhpcy5jaGlsZCgpLnBhcnNlR3JpZEdyb3VwKCk7XG5cbiAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGQoKTtcblxuICAgIHRoaXMuY29tcG9uZW50LmdyaWRHcm91cCA9IGV4dGVuZChcbiAgICAgICFjaGlsZC5oYXMoWCkgJiYgdGhpcy5oYXMoQ09MVU1OKSA/IHsgY29sdW1uOiBnZXRDb2x1bW5HcmlkR3JvdXBzKHRoaXMpIH0gOiB7fSxcbiAgICAgICFjaGlsZC5oYXMoWSkgJiYgdGhpcy5oYXMoUk9XKSA/IHsgcm93OiBnZXRSb3dHcmlkR3JvdXBzKHRoaXMpIH0gOiB7fVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgaW5kZXBlbmRlbnQgbm9uLXBvc2l0aW9uIHNjYWxlIGFjcm9zcyBmYWNldHNcbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgZmllbGQgcmVmZXJlbmNlIG9mIHBhcmVudCBkYXRhIChlLmcuLCBmb3IgU1BMT00pXG5cbiAgICAvLyBGb3Igbm93LCBhc3N1bWluZyB0aGF0IG5vbi1wb3NpdGlvbmFsIHNjYWxlcyBhcmUgYWx3YXlzIHNoYXJlZCBhY3Jvc3MgZmFjZXRzXG4gICAgLy8gVGh1cywganVzdCBtb3ZlIGFsbCBsZWdlbmRzIGZyb20gaXRzIGNoaWxkXG4gICAgdGhpcy5jb21wb25lbnQubGVnZW5kID0gdGhpcy5fY2hpbGQuY29tcG9uZW50LmxlZ2VuZDtcbiAgICB0aGlzLl9jaGlsZC5jb21wb25lbnQubGVnZW5kID0ge307XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFByZWZpeCB0cmF2ZXJzYWwg4oCTIHBhcmVudCBkYXRhIG1pZ2h0IGJlIHJlZmVycmVkIGJ5IGNoaWxkcmVuIGRhdGFcbiAgICBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkLmFzc2VtYmxlRGF0YShkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQb3N0Zml4IHRyYXZlcnNhbCDigJMgbGF5b3V0IGlzIGFzc2VtYmxlZCBib3R0b20tdXBcbiAgICB0aGlzLl9jaGlsZC5hc3NlbWJsZUxheW91dChsYXlvdXREYXRhKTtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChcbiAgICAgIC8vIGF4aXNHcm91cCBpcyBhIG1hcHBpbmcgdG8gVmdNYXJrR3JvdXBcbiAgICAgIHZhbHModGhpcy5jb21wb25lbnQuYXhpc0dyb3VwKSxcbiAgICAgIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5ncmlkR3JvdXApKSxcbiAgICAgIHRoaXMuY29tcG9uZW50Lm1hcmtcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcHBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZhY2V0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8vIFRPRE86IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIGZpbGUgaW50byBGYWNldE1vZGVsIGlmIHBvc3NpYmxlXG5cbmZ1bmN0aW9uIGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgY29uc3QgbWVyZ2VkQ2VsbENvbmZpZyA9IGV4dGVuZCh7fSwgY2hpbGQuY29uZmlnKCkuY2VsbCwgY2hpbGQuY29uZmlnKCkuZmFjZXQuY2VsbCk7XG5cbiAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICB4OiBtb2RlbC5oYXMoQ09MVU1OKSA/IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShDT0xVTU4pLnBhZGRpbmcgLyAyXG4gICAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgeTogbW9kZWwuaGFzKFJPVykgPyB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgd2lkdGg6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnd2lkdGgnKX19LFxuICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ2hlaWdodCcpfX1cbiAgICB9LFxuICAgIGNoaWxkLmFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKG1lcmdlZENlbGxDb25maWcpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXhpc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8vIFRPRE86IGFkZCBhIGNhc2Ugd2hlcmUgaW5uZXIgc3BlYyBpcyBub3QgYSB1bml0IChmYWNldC9sYXllci9jb25jYXQpXG4gIGxldCBheGlzR3JvdXAgPSBudWxsO1xuXG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgaWYgKGNoaWxkLmhhcyhjaGFubmVsKSkge1xuICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBpZiAodHJ1ZSkgeyAvLyB0aGUgY2hhbm5lbCBoYXMgc2hhcmVkIGF4ZXNcblxuICAgICAgICAvLyBhZGQgYSBncm91cCBmb3IgdGhlIHNoYXJlZCBheGVzXG4gICAgICAgIGF4aXNHcm91cCA9IGNoYW5uZWwgPT09IFggPyBnZXRYQXhlc0dyb3VwKG1vZGVsKSA6IGdldFlBeGVzR3JvdXAobW9kZWwpO1xuXG4gICAgICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpICYmIGdyaWRTaG93KGNoaWxkLCBjaGFubmVsKSkgeyAvLyBzaG93IGlubmVyIGdyaWRcbiAgICAgICAgICAvLyBhZGQgaW5uZXIgYXhpcyAoYWthIGF4aXMgdGhhdCBzaG93cyBvbmx5IGdyaWQgdG8gKVxuICAgICAgICAgIGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdID0gcGFyc2VJbm5lckF4aXMoY2hhbm5lbCwgY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGluZGVwZW5kZW50IGF4ZXMgc3VwcG9ydFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXhpc0dyb3VwO1xufVxuXG5cbmZ1bmN0aW9uIGdldFhBeGVzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwpOiBWZ01hcmtHcm91cCB7XG4gIGNvbnN0IGhhc0NvbCA9IG1vZGVsLmhhcyhDT0xVTU4pO1xuICByZXR1cm4gZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3gtYXhlcycpLFxuICAgICAgdHlwZTogJ2dyb3VwJ1xuICAgIH0sXG4gICAgaGFzQ29sID8ge1xuICAgICAgZnJvbTogeyAvLyBUT0RPOiBpZiB3ZSBkbyBmYWNldCB0cmFuc2Zvcm0gYXQgdGhlIHBhcmVudCBsZXZlbCB3ZSBjYW4gc2FtZSBzb21lIHRyYW5zZm9ybSBoZXJlXG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCd3aWR0aCcpfX0sXG4gICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHg6IGhhc0NvbCA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKENPTFVNTikucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFgsIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0WUF4ZXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCk6IFZnTWFya0dyb3VwIHtcbiAgY29uc3QgaGFzUm93ID0gbW9kZWwuaGFzKFJPVyk7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgneS1heGVzJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNSb3cgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ3dpZHRoJ31cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlaWdodDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCdoZWlnaHQnKX19LFxuICAgICAgICAgIHk6IGhhc1JvdyA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFksIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0Um93R3JpZEdyb3Vwcyhtb2RlbDogTW9kZWwpOiBhbnlbXSB7IC8vIFRPRE86IFZnTWFya3NcbiAgY29uc3QgZmFjZXRHcmlkQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuZmFjZXQuZ3JpZDtcblxuICBjb25zdCByb3dHcmlkID0ge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3Jvdy1ncmlkJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe3R5cGU6ICdmYWNldCcsIGdyb3VwYnk6IFttb2RlbC5maWVsZChST1cpXX1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeToge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKVxuICAgICAgICB9LFxuICAgICAgICB4OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFtyb3dHcmlkLCB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgncm93LWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7IGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfX0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfV07XG59XG5cbmZ1bmN0aW9uIGdldENvbHVtbkdyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55IHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBmYWNldEdyaWRDb25maWcgPSBtb2RlbC5jb25maWcoKS5mYWNldC5ncmlkO1xuXG4gIGNvbnN0IGNvbHVtbkdyaWQgPSB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldH0sXG4gICAgICAgIHkyOiB7ZmllbGQ6IHtncm91cDogJ2hlaWdodCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gW2NvbHVtbkdyaWQsICB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7IGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9fSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9XTtcbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2tleXMsIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBmbGF0dGVuLCB1bmlxdWUsIGlzQXJyYXksIHZhbHMsIGhhc2gsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0xheWVyU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VMYXllckRhdGF9IGZyb20gJy4vZGF0YS9kYXRhJztcbmltcG9ydCB7YXNzZW1ibGVMYXlvdXQsIHBhcnNlTGF5ZXJMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7VmdEYXRhLCBWZ0F4aXMsIFZnTGVnZW5kLCBpc1VuaW9uZWREb21haW4sIGlzRGF0YVJlZkRvbWFpbiwgVmdEYXRhUmVmfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cblxuZXhwb3J0IGNsYXNzIExheWVyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBVbml0TW9kZWxbXTtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBMYXllclNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHNwZWMubGF5ZXJzLm1hcCgobGF5ZXIsIGkpID0+IHtcbiAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgbW9kZWwgaGFzIHRvIGJlIGEgdW5pdCBtb2RlbCBiZWFjdXNlIHdlIHBhc3MgaW4gYSB1bml0IHNwZWNcbiAgICAgIHJldHVybiBidWlsZE1vZGVsKGxheWVyLCB0aGlzLCB0aGlzLm5hbWUoJ2xheWVyXycgKyBpKSkgYXMgVW5pdE1vZGVsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgc3BlY0NvbmZpZywgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30pO1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gICAgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBhbnkgY2hhbm5lbHNcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAvLyBzaW5jZSB3ZSBhc3N1bWUgc2hhcmVkIHNjYWxlcyB3ZSBjYW4ganVzdCBhc2sgdGhlIGZpcnN0IGNoaWxkXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuWzBdLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpOiBzdHJpbmcge1xuICAgIC8vIEZJWE1FOiBkb24ndCBqdXN0IHVzZSB0aGUgZmlyc3QgY2hpbGRcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uZGF0YVRhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBmaWVsZCBkZWZzXG4gIH1cblxuICBwdWJsaWMgc3RhY2soKSB7XG4gICAgcmV0dXJuIG51bGw7IC8vIHRoaXMgaXMgb25seSBhIHByb3BlcnR5IGZvciBVbml0TW9kZWxcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLnBhcnNlRGF0YSgpO1xuICAgIH0pO1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZUxheWVyRGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgLy8gVE9ETzogY29ycmVjdGx5IHVuaW9uIG9yZGluYWwgc2NhbGVzIHJhdGhlciB0aGFuIGp1c3QgdXNpbmcgdGhlIGxheW91dCBvZiB0aGUgZmlyc3QgY2hpbGRcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgY2hpbGQucGFyc2VMYXlvdXREYXRhKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQubGF5b3V0ID0gcGFyc2VMYXllckxheW91dCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNjYWxlKCkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgIGxldCBzY2FsZUNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LnNjYWxlID0ge30gYXMgRGljdDxTY2FsZUNvbXBvbmVudHM+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgICAvLyBGSVhNRTogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBzY2FsZVxuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LnNjYWxlKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICBsZXQgY2hpbGRTY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcbiAgICAgICAgICBpZiAoIWNoaWxkU2NhbGVzKSB7XG4gICAgICAgICAgICAvLyB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhbnkgc2NhbGVzIHNvIHdlIGhhdmUgbm90aGluZyB0byBtZXJnZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG1vZGVsU2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSBzY2FsZUNvbXBvbmVudFtjaGFubmVsXTtcbiAgICAgICAgICBpZiAobW9kZWxTY2FsZXMgJiYgbW9kZWxTY2FsZXMubWFpbikge1xuICAgICAgICAgICAgLy8gU2NhbGVzIGFyZSB1bmlvbmVkIGJ5IGNvbWJpbmluZyB0aGUgZG9tYWluIG9mIHRoZSBtYWluIHNjYWxlLlxuICAgICAgICAgICAgLy8gT3RoZXIgc2NhbGVzIHRoYXQgYXJlIHVzZWQgZm9yIG9yZGluYWwgbGVnZW5kcyBhcmUgYXBwZW5kZWQuXG4gICAgICAgICAgICBjb25zdCBtb2RlbERvbWFpbiA9IG1vZGVsU2NhbGVzLm1haW4uZG9tYWluO1xuICAgICAgICAgICAgY29uc3QgY2hpbGREb21haW4gPSBjaGlsZFNjYWxlcy5tYWluLmRvbWFpbjtcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkobW9kZWxEb21haW4pKSB7XG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkU2NhbGVzLm1haW4uZG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsU2NhbGVzLm1haW4uZG9tYWluID0gbW9kZWxEb21haW4uY29uY2F0KGNoaWxkRG9tYWluKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKCdjdXN0b20gZG9tYWluIHNjYWxlIGNhbm5vdCBiZSB1bmlvbmVkIHdpdGggZGVmYXVsdCBmaWVsZC1iYXNlZCBkb21haW4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgdW5pb25lZEZpZWxkcyA9IGlzVW5pb25lZERvbWFpbihtb2RlbERvbWFpbikgPyBtb2RlbERvbWFpbi5maWVsZHMgOiBbbW9kZWxEb21haW5dIGFzIFZnRGF0YVJlZltdO1xuXG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkRG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGZpZWxkcyA9IGlzRGF0YVJlZkRvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChbY2hpbGREb21haW5dKSA6XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRvbWFpbiBpcyBpdHNlbGYgYSB1bmlvbiBkb21haW4sIGNvbmNhdFxuICAgICAgICAgICAgICAgIGlzVW5pb25lZERvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChjaGlsZERvbWFpbi5maWVsZHMpIDpcbiAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gaWdub3JlIGV4cGxpY2l0IGRhdGEgZG9tYWlucyBmb3Igbm93IGJlY2F1c2UgdmVnYSBkb2VzIG5vdCBzdXBwb3J0IHVuaW9uaW5nIHRoZW1cbiAgICAgICAgICAgICAgICAgIHVuaW9uZWRGaWVsZHM7XG4gICAgICAgICAgICAgIGZpZWxkcyA9IHVuaXF1ZShmaWVsZHMsIGhhc2gpO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBpZiBhbGwgZG9tYWlucyB1c2UgdGhlIHNhbWUgZGF0YSwgd2UgY2FuIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSB7IGZpZWxkczogZmllbGRzIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSBmaWVsZHNbMF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNvbG9yIGxlZ2VuZCBhbmQgY29sb3IgbGVnZW5kIGJpbiBzY2FsZXMgaWYgd2UgZG9uJ3QgaGF2ZSB0aGVtIHlldFxuICAgICAgICAgICAgbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgPSBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA/IG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kIDogY2hpbGRTY2FsZXMuY29sb3JMZWdlbmQ7XG4gICAgICAgICAgICBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA9IG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kID8gbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgOiBjaGlsZFNjYWxlcy5iaW5Db2xvckxlZ2VuZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZFNjYWxlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW5hbWUgY2hpbGQgc2NhbGVzIHRvIHBhcmVudCBzY2FsZXNcbiAgICAgICAgICB2YWxzKGNoaWxkU2NhbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5zY2FsZU5hbWUoc2NhbGVOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgICAgICBjaGlsZC5yZW5hbWVTY2FsZShzY2FsZS5uYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVsZXRlIGNoaWxkU2NhbGVzW2NoYW5uZWxdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU1hcmsoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VNYXJrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIGxldCBheGlzQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuYXhpcyA9IHt9IGFzIERpY3Q8VmdBeGlzW10+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VBeGlzKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmF4aXMpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgbXVsdGlwbGUgYXhlcyBmb3Igc2hhcmVkIHNjYWxlXG5cbiAgICAgICAgICAvLyBqdXN0IHVzZSB0aGUgZmlyc3QgYXhpcyBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWF4aXNDb21wb25lbnRbY2hhbm5lbF0pIHtcbiAgICAgICAgICAgIGF4aXNDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpc0dyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGVnZW5kKCkge1xuICAgIGxldCBsZWdlbmRDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSB7fSBhcyBEaWN0PFZnTGVnZW5kPjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmxlZ2VuZCkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgLy8ganVzdCB1c2UgdGhlIGZpcnN0IGxlZ2VuZCBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSkge1xuICAgICAgICAgICAgbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGQuY29tcG9uZW50LmxlZ2VuZFtjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQcmVmaXggdHJhdmVyc2FsIOKAkyBwYXJlbnQgZGF0YSBtaWdodCBiZSByZWZlcnJlZCB0byBieSBjaGlsZHJlbiBkYXRhXG4gICAgYXNzZW1ibGVEYXRhKHRoaXMsIGRhdGEpO1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5hc3NlbWJsZURhdGEoZGF0YSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUG9zdGZpeCB0cmF2ZXJzYWwg4oCTIGxheW91dCBpcyBhc3NlbWJsZWQgYm90dG9tLXVwXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFzc2VtYmxlTGF5b3V0KGxheW91dERhdGEpO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCk6IGFueVtdIHtcbiAgICAvLyBvbmx5IGNoaWxkcmVuIGhhdmUgbWFya3NcbiAgICByZXR1cm4gZmxhdHRlbih0aGlzLl9jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuYXNzZW1ibGVNYXJrcygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2hpbGQgZWl0aGVyIGhhcyBubyBzb3VyY2UgZGVmaW5lZCBvciB1c2VzIHRoZSBzYW1lIHVybC5cbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8ga25vdyB3aGV0aGVyIGl0IGlzIHBvc3NpYmxlIHRvIG1vdmUgYSBmaWx0ZXIgdXAuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UgdGggY2hpbGQgaGFzIGJlZW4gcGFyc2VkLlxuICAgKi9cbiAgcHVibGljIGNvbXBhdGlibGVTb3VyY2UoY2hpbGQ6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGEoKTtcbiAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICBjb25zdCBjb21wYXRpYmxlID0gIWNoaWxkRGF0YS5zb3VyY2UgfHwgKGRhdGEgJiYgZGF0YS51cmwgPT09IGNoaWxkRGF0YS5zb3VyY2UudXJsKTtcbiAgICByZXR1cm4gY29tcGF0aWJsZTtcbiAgfVxufVxuIiwiXG5pbXBvcnQge0NoYW5uZWwsIFgsIFksIFJPVywgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7TEFZT1VUfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgU3RyaW5nU2V0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtyYXdEb21haW59IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0Q29tcG9uZW50IHtcbiAgd2lkdGg6IFNpemVDb21wb25lbnQ7XG4gIGhlaWdodDogU2l6ZUNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaXplQ29tcG9uZW50IHtcbiAgLyoqIEZpZWxkIHRoYXQgd2UgbmVlZCB0byBjYWxjdWxhdGUgZGlzdGluY3QgKi9cbiAgZGlzdGluY3Q6IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2YgZm9ybXVsYXMgKi9cbiAgZm9ybXVsYTogRm9ybXVsYVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVMYXlvdXQobW9kZWw6IE1vZGVsLCBsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgY29uc3QgbGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmxheW91dDtcbiAgaWYgKCFsYXlvdXRDb21wb25lbnQud2lkdGggJiYgIWxheW91dENvbXBvbmVudC5oZWlnaHQpIHtcbiAgICByZXR1cm4gbGF5b3V0RGF0YTsgLy8gRG8gbm90aGluZ1xuICB9XG5cbiAgaWYgKHRydWUpIHsgLy8gaWYgYm90aCBhcmUgc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIGRhdGEgc291cmNlIGZvciB3aWR0aCBhbmQgZm9yIGhlaWdodFxuICAgIGNvbnN0IGRpc3RpbmN0RmllbGRzID0ga2V5cyhleHRlbmQobGF5b3V0Q29tcG9uZW50LndpZHRoLmRpc3RpbmN0LCBsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmRpc3RpbmN0KSk7XG4gICAgY29uc3QgZm9ybXVsYSA9IGxheW91dENvbXBvbmVudC53aWR0aC5mb3JtdWxhLmNvbmNhdChsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmZvcm11bGEpXG4gICAgICAubWFwKGZ1bmN0aW9uKGZvcm11bGEpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7dHlwZTogJ2Zvcm11bGEnfSwgZm9ybXVsYSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBbXG4gICAgICBkaXN0aW5jdEZpZWxkcy5sZW5ndGggPiAwID8ge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAgIHN1bW1hcml6ZTogZGlzdGluY3RGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGZpZWxkOiBmaWVsZCwgb3BzOiBbJ2Rpc3RpbmN0J10gfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfV0uY29uY2F0KGZvcm11bGEpXG4gICAgICB9IDoge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICB2YWx1ZXM6IFt7fV0sXG4gICAgICAgIHRyYW5zZm9ybTogZm9ybXVsYVxuICAgICAgfVxuICAgIF07XG4gIH1cbiAgLy8gRklYTUU6IGltcGxlbWVudFxuICAvLyBvdGhlcndpc2UsIHdlIG5lZWQgdG8gam9pbiB3aWR0aCBhbmQgaGVpZ2h0IChjcm9zcylcbn1cblxuLy8gRklYTUU6IGZvciBuZXN0aW5nIHggYW5kIHksIHdlIG5lZWQgdG8gZGVjbGFyZSB4LHkgbGF5b3V0IHNlcGFyYXRlbHkgYmVmb3JlIGpvaW5pbmcgbGF0ZXJcbi8vIEZvciBub3csIGxldCdzIGFsd2F5cyBhc3N1bWUgc2hhcmVkIHNjYWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0TGF5b3V0KG1vZGVsOiBVbml0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZVVuaXRTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICAvLyBUT0RPOiB0aGluayBhYm91dCB3aGV0aGVyIHRoaXMgY29uZmlnIGhhcyB0byBiZSB0aGUgY2VsbCBvciBmYWNldCBjZWxsIGNvbmZpZ1xuICBjb25zdCBjZWxsQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuY2VsbDtcbiAgY29uc3Qgbm9uT3JkaW5hbFNpemUgPSBjaGFubmVsID09PSBYID8gY2VsbENvbmZpZy53aWR0aCA6IGNlbGxDb25maWcuaGVpZ2h0O1xuXG4gIHJldHVybiB7XG4gICAgZGlzdGluY3Q6IGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSxcbiAgICBmb3JtdWxhOiBbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IHVuaXRTaXplRXhwcihtb2RlbCwgY2hhbm5lbCwgbm9uT3JkaW5hbFNpemUpXG4gICAgfV1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5pdFNpemVFeHByKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIG5vbk9yZGluYWxTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAobW9kZWwuc2NhbGUoY2hhbm5lbCkpIHtcbiAgICBpZiAobW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICByZXR1cm4gJygnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKSArXG4gICAgICAgICcgKyAnICsgc2NhbGUucGFkZGluZyArXG4gICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVE1BUksgJiYgY2hhbm5lbCA9PT0gWCkge1xuICAgICAgLy8gZm9yIHRleHQgdGFibGUgd2l0aG91dCB4L3kgc2NhbGUgd2UgbmVlZCB3aWRlciBiYW5kU2l6ZVxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLnRleHRCYW5kV2lkdGggKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplICsgJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXRMYXlvdXQobW9kZWw6IEZhY2V0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbCwgQ09MVU1OKSxcbiAgICBoZWlnaHQ6IHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsLCBST1cpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIGNvbnN0IGNoaWxkTGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQubGF5b3V0O1xuICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFJPVyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gIGlmICh0cnVlKSB7IC8vIGFzc3VtZSBzaGFyZWQgc2NhbGVcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gZXh0ZW5kKGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSwgY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0KTtcbiAgICBjb25zdCBmb3JtdWxhID0gY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGEuY29uY2F0KFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogZmFjZXRTaXplRm9ybXVsYShtb2RlbCwgY2hhbm5lbCwgbW9kZWwuY2hpbGQoKS5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCkpXG4gICAgfV0pO1xuXG4gICAgZGVsZXRlIGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgICAgZm9ybXVsYTogZm9ybXVsYVxuICAgIH07XG4gIH1cbiAgLy8gRklYTUUgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlIGFzIHdlbGxcbiAgLy8gVE9ETzogLSBhbHNvIGNvbnNpZGVyIHdoZW4gY2hpbGRyZW4gaGF2ZSBkaWZmZXJlbnQgZGF0YSBzb3VyY2Vcbn1cblxuZnVuY3Rpb24gZmFjZXRTaXplRm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGlubmVyU2l6ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gJyhkYXR1bS4nICsgaW5uZXJTaXplICsgJyArICcgKyBzY2FsZS5wYWRkaW5nICsgJyknICsgJyAqICcgKyBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWwsIGNoYW5uZWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnZGF0dW0uJyArIGlubmVyU2l6ZSArICcgKyAnICsgbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZzsgLy8gbmVlZCB0byBhZGQgb3V0ZXIgcGFkZGluZyBmb3IgZmFjZXRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllckxheW91dChtb2RlbDogTGF5ZXJNb2RlbCk6IExheW91dENvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlTGF5ZXJTaXplTGF5b3V0KG1vZGVsLCBZKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbDogTGF5ZXJNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICBpZiAodHJ1ZSkge1xuICAgIC8vIEZvciBzaGFyZWQgc2NhbGUsIHdlIGNhbiBzaW1wbHkgbWVyZ2UgdGhlIGxheW91dCBpbnRvIG9uZSBkYXRhIHNvdXJjZVxuICAgIC8vIFRPRE86IGRvbid0IGp1c3QgdGFrZSB0aGUgbGF5b3V0IGZyb20gdGhlIGZpcnN0IGNoaWxkXG5cbiAgICBjb25zdCBjaGlsZExheW91dENvbXBvbmVudCA9IG1vZGVsLmNoaWxkcmVuKClbMF0uY29tcG9uZW50LmxheW91dDtcbiAgICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gICAgY29uc3QgZGlzdGluY3QgPSBjaGlsZFNpemVDb21wb25lbnQuZGlzdGluY3Q7XG4gICAgY29uc3QgZm9ybXVsYSA9IFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGFbMF0uZXhwclxuICAgIH1dO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgZGVsZXRlIGNoaWxkLmNvbXBvbmVudC5sYXlvdXRbc2l6ZVR5cGVdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICAgIGZvcm11bGE6IGZvcm11bGFcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3RpbmN0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFN0cmluZ1NldCB7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiAhKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgLy8gaWYgZXhwbGljaXQgZG9tYWluIGlzIGRlY2xhcmVkLCB1c2UgYXJyYXkgbGVuZ3RoXG4gICAgICBjb25zdCBkaXN0aW5jdEZpZWxkID0gbW9kZWwuZmllbGQoY2hhbm5lbCk7XG4gICAgICBsZXQgZGlzdGluY3Q6IFN0cmluZ1NldCA9IHt9O1xuICAgICAgZGlzdGluY3RbZGlzdGluY3RGaWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGRpc3RpbmN0O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge307XG59XG5cbi8vIFRPRE86IHJlbmFtZSB0byBjYXJkaW5hbGl0eUV4cHJcbmZ1bmN0aW9uIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgaWYgKHNjYWxlLmRvbWFpbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbi5sZW5ndGg7XG4gIH1cblxuICBjb25zdCB0aW1lVW5pdCA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLnRpbWVVbml0O1xuICBjb25zdCB0aW1lVW5pdERvbWFpbiA9IHRpbWVVbml0ID8gcmF3RG9tYWluKHRpbWVVbml0LCBjaGFubmVsKSA6IG51bGw7XG5cbiAgcmV0dXJuIHRpbWVVbml0RG9tYWluICE9PSBudWxsID8gdGltZVVuaXREb21haW4ubGVuZ3RoIDpcbiAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwge2RhdHVtOiB0cnVlLCBwcmVmbjogJ2Rpc3RpbmN0Xyd9KTtcbn1cbiIsImltcG9ydCB7Q09MT1IsIFNJWkUsIFNIQVBFLCBPUEFDSVRZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtMZWdlbmR9IGZyb20gJy4uL2xlZ2VuZCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkVGl0bGV9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QVJFQSwgQkFSLCBUSUNLLCBURVhULCBMSU5FLCBQT0lOVCwgQ0lSQ0xFLCBTUVVBUkV9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtPUkRJTkFMLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgd2l0aG91dCwgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YXBwbHlNYXJrQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcsIG51bWJlckZvcm1hdCwgdGltZVRlbXBsYXRlfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge0NPTE9SX0xFR0VORCwgQ09MT1JfTEVHRU5EX0xBQkVMfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtWZ0xlZ2VuZH0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZENvbXBvbmVudChtb2RlbDogVW5pdE1vZGVsKTogRGljdDxWZ0xlZ2VuZD4ge1xuICByZXR1cm4gW0NPTE9SLCBTSVpFLCBTSEFQRSwgT1BBQ0lUWV0ucmVkdWNlKGZ1bmN0aW9uKGxlZ2VuZENvbXBvbmVudCwgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5sZWdlbmQoY2hhbm5lbCkpIHtcbiAgICAgIGxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSA9IHBhcnNlTGVnZW5kKG1vZGVsLCBjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZENvbXBvbmVudDtcbiAgfSwge30gYXMgRGljdDxWZ0xlZ2VuZD4pO1xufVxuXG5mdW5jdGlvbiBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFZnTGVnZW5kIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBDT0xPUjpcbiAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZU5hbWUodXNlQ29sb3JMZWdlbmRTY2FsZShmaWVsZERlZikgP1xuICAgICAgICAvLyBUbyBwcm9kdWNlIG9yZGluYWwgbGVnZW5kIChsaXN0LCByYXRoZXIgdGhhbiBsaW5lYXIgcmFuZ2UpIHdpdGggY29ycmVjdCBsYWJlbHM6XG4gICAgICAgIC8vIC0gRm9yIGFuIG9yZGluYWwgZmllbGQsIHByb3ZpZGUgYW4gb3JkaW5hbCBzY2FsZSB0aGF0IG1hcHMgcmFuayB2YWx1ZXMgdG8gZmllbGQgdmFsdWVzXG4gICAgICAgIC8vIC0gRm9yIGEgZmllbGQgd2l0aCBiaW4gb3IgdGltZVVuaXQsIHByb3ZpZGUgYW4gaWRlbnRpdHkgb3JkaW5hbCBzY2FsZVxuICAgICAgICAvLyAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gICAgICAgIENPTE9SX0xFR0VORCA6XG4gICAgICAgIENPTE9SXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQgPyB7IGZpbGw6IHNjYWxlIH0gOiB7IHN0cm9rZTogc2NhbGUgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4geyBzaXplOiBtb2RlbC5zY2FsZU5hbWUoU0laRSkgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHsgc2hhcGU6IG1vZGVsLnNjYWxlTmFtZShTSEFQRSkgfTtcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgICByZXR1cm4geyBvcGFjaXR5OiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSkgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGVnZW5kKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBWZ0xlZ2VuZCB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcbiAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgbGV0IGRlZjogVmdMZWdlbmQgPSBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWwsIGNoYW5uZWwpO1xuXG4gIC8vIDEuMSBBZGQgcHJvcGVydGllcyB3aXRoIHNwZWNpYWwgcnVsZXNcbiAgZGVmLnRpdGxlID0gdGl0bGUobGVnZW5kLCBmaWVsZERlZiwgY29uZmlnKTtcbiAgY29uc3QgZm9ybWF0ID0gbnVtYmVyRm9ybWF0KGZpZWxkRGVmLCBsZWdlbmQuZm9ybWF0LCBjb25maWcpO1xuICBpZiAoZm9ybWF0KSB7XG4gICAgZGVmLmZvcm1hdCA9IGZvcm1hdDtcbiAgfVxuXG4gIC8vIDEuMiBBZGQgcHJvcGVydGllcyB3aXRob3V0IHJ1bGVzXG4gIFsnb2Zmc2V0JywgJ29yaWVudCcsICd2YWx1ZXMnXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBsZWdlbmRbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICAvLyAyKSBBZGQgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9uIGdyb3Vwc1xuICBjb25zdCBwcm9wcyA9ICh0eXBlb2YgbGVnZW5kICE9PSAnYm9vbGVhbicgJiYgbGVnZW5kLnByb3BlcnRpZXMpIHx8IHt9O1xuICBbJ3RpdGxlJywgJ3N5bWJvbHMnLCAnbGVnZW5kJywgJ2xhYmVscyddLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBsZXQgdmFsdWUgPSBwcm9wZXJ0aWVzW2dyb3VwXSA/XG4gICAgICBwcm9wZXJ0aWVzW2dyb3VwXShmaWVsZERlZiwgcHJvcHNbZ3JvdXBdLCBtb2RlbCwgY2hhbm5lbCkgOiAvLyBhcHBseSBydWxlXG4gICAgICBwcm9wc1tncm91cF07IC8vIG5vIHJ1bGUgLS0ganVzdCBkZWZhdWx0IHZhbHVlc1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShsZWdlbmQ6IExlZ2VuZCwgZmllbGREZWY6IEZpZWxkRGVmLCBjb25maWc6IENvbmZpZykge1xuICBpZiAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC50aXRsZSkge1xuICAgIHJldHVybiBsZWdlbmQudGl0bGU7XG4gIH1cblxuICByZXR1cm4gZmllbGRUaXRsZShmaWVsZERlZiwgY29uZmlnKTtcbn1cblxuLy8gd2UgaGF2ZSB0byB1c2Ugc3BlY2lhbCBzY2FsZXMgZm9yIG9yZGluYWwgb3IgYmlubmVkIGZpZWxkcyBmb3IgdGhlIGNvbG9yIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiB1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCB8fCBmaWVsZERlZi5iaW4gfHwgZmllbGREZWYudGltZVVuaXQ7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgcHJvcGVydGllcyB7XG4gIGV4cG9ydCBmdW5jdGlvbiBzeW1ib2xzKGZpZWxkRGVmOiBGaWVsZERlZiwgc3ltYm9sc1NwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBsZXQgc3ltYm9sczphbnkgPSB7fTtcbiAgICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IG1vZGVsLmxlZ2VuZChjaGFubmVsKTtcblxuICAgIHN3aXRjaCAobWFyaykge1xuICAgICAgY2FzZSBCQVI6XG4gICAgICBjYXNlIFRJQ0s6XG4gICAgICBjYXNlIFRFWFQ6XG4gICAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6ICdzcXVhcmUnfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENJUkNMRTpcbiAgICAgIGNhc2UgU1FVQVJFOlxuICAgICAgICBzeW1ib2xzLnNoYXBlID0geyB2YWx1ZTogbWFyayB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUE9JTlQ6XG4gICAgICBjYXNlIExJTkU6XG4gICAgICBjYXNlIEFSRUE6XG4gICAgICAgIC8vIHVzZSBkZWZhdWx0IGNpcmNsZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBmaWxsZWQgPSBtb2RlbC5jb25maWcoKS5tYXJrLmZpbGxlZDtcblxuXG4gICAgbGV0IGNvbmZpZyA9IGNoYW5uZWwgPT09IENPTE9SID9cbiAgICAgICAgLyogRm9yIGNvbG9yJ3MgbGVnZW5kLCBkbyBub3Qgc2V0IGZpbGwgKHdoZW4gZmlsbGVkKSBvciBzdHJva2UgKHdoZW4gdW5maWxsZWQpIHByb3BlcnR5IGZyb20gY29uZmlnIGJlY2F1c2UgdGhlIHRoZSBsZWdlbmQncyBgZmlsbGAgb3IgYHN0cm9rZWAgc2NhbGUgc2hvdWxkIGhhdmUgcHJlY2VkZW5jZSAqL1xuICAgICAgICB3aXRob3V0KEZJTExfU1RST0tFX0NPTkZJRywgWyBmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJywgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKSA6XG4gICAgICAgIC8qIEZvciBvdGhlciBsZWdlbmQsIG5vIG5lZWQgdG8gb21pdC4gKi9cbiAgICAgICAgIHdpdGhvdXQoRklMTF9TVFJPS0VfQ09ORklHLCBbJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKTtcblxuICAgIGNvbmZpZyA9IHdpdGhvdXQoY29uZmlnLCBbJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCddKTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhzeW1ib2xzLCBtb2RlbCwgY29uZmlnKTtcblxuICAgIGlmIChmaWxsZWQpIHtcbiAgICAgIHN5bWJvbHMuc3Ryb2tlV2lkdGggPSB7IHZhbHVlOiAwIH07XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgb3ZlcnJpZGUgZGVmYXVsdCBtYXBwaW5nIGZvciBvcGFjaXR5IGNoYW5uZWxcbiAgICBpZiAoY2hhbm5lbCA9PT0gT1BBQ0lUWSkge1xuICAgICAgZGVsZXRlIHN5bWJvbHMub3BhY2l0eTtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgIGlmICh1c2VDb2xvckxlZ2VuZFNjYWxlKGZpZWxkRGVmKSkge1xuICAgICAgICAvLyBmb3IgY29sb3IgbGVnZW5kIHNjYWxlLCB3ZSBuZWVkIHRvIG92ZXJyaWRlXG4gICAgICAgIHZhbHVlID0geyBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSwgZmllbGQ6ICdkYXRhJyB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZWwuZmllbGREZWYoQ09MT1IpLnZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHsgdmFsdWU6IG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSB9O1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgdmFsdWVcbiAgICAgIGlmIChmaWxsZWQpIHtcbiAgICAgICAgc3ltYm9scy5maWxsID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2xzLnN0cm9rZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCAhPT0gQ09MT1IpIHtcbiAgICAgIC8vIEZvciBub24tY29sb3IgbGVnZW5kLCBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWcuXG4gICAgICAvLyAoRm9yIGNvbG9yLCBkbyBub3Qgb3ZlcnJpZGUgc2NhbGUgc3BlY2lmaWVkISlcbiAgICAgIHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddID0gc3ltYm9sc1tmaWxsZWQgPyAnZmlsbCcgOiAnc3Ryb2tlJ10gfHxcbiAgICAgICAge3ZhbHVlOiBtb2RlbC5jb25maWcoKS5tYXJrLmNvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuZmlsbCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbENvbG9yfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFNoYXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2hhcGUgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTaGFwZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc2l6ZSA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFNpemV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU3Ryb2tlV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3ltYm9scy5zdHJva2VXaWR0aCA9IHt2YWx1ZTogbGVnZW5kLnN5bWJvbFN0cm9rZVdpZHRofTtcbiAgICB9XG5cbiAgICBzeW1ib2xzID0gZXh0ZW5kKHN5bWJvbHMsIHN5bWJvbHNTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHN5bWJvbHMpLmxlbmd0aCA+IDAgPyBzeW1ib2xzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhmaWVsZERlZjogRmllbGREZWYsIGxhYmVsc1NwZWMsIG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBsZXQgbGFiZWxzOmFueSA9IHt9O1xuXG4gICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICBpZiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORCksXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EX0xBQkVMKSxcbiAgICAgICAgICAgIGZpZWxkOiAnZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGltZVRlbXBsYXRlKCdkYXR1bS5kYXRhJywgZmllbGREZWYudGltZVVuaXQsIGxlZ2VuZC5mb3JtYXQsIGxlZ2VuZC5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZylcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxBbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuYWxpZ24gPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEFsaWdufTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLnN0cm9rZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5mb250ID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmZvbnRTaXplID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250U2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEJhc2VsaW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5iYXNlbGluZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQmFzZWxpbmV9O1xuICAgIH1cblxuICAgIGxhYmVscyA9IGV4dGVuZChsYWJlbHMsIGxhYmVsc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMobGFiZWxzKS5sZW5ndGggPiAwID8gbGFiZWxzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZiwgdGl0bGVTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgbGV0IHRpdGxlczphbnkgPSB7fTtcblxuICAgIGlmIChsZWdlbmQudGl0bGVDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuc3Ryb2tlID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnQgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnR9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFNpemUgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnRTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFdlaWdodCA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udFdlaWdodH07XG4gICAgfVxuXG4gICAgdGl0bGVzID0gZXh0ZW5kKHRpdGxlcywgdGl0bGVTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHRpdGxlcykubGVuZ3RoID4gMCA/IHRpdGxlcyA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7WCwgWX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09yaWVudH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7aXNEaW1lbnNpb24sIGlzTWVhc3VyZSwgRmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1N0YWNrUHJvcGVydGllc30gZnJvbSAnLi4vLi4vc3RhY2snO1xuXG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5LCBhcHBseU1hcmtDb25maWd9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYXJlYSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ2FyZWEnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIC8vIFdlIHNob3VsZCBhbHdheXMgaGF2ZSBvcmllbnQgYXMgd2UgYXVnbWVudCBpdCBpbiBjb25maWcudHNcbiAgICBjb25zdCBvcmllbnQgPSBjb25maWcubWFyay5vcmllbnQ7XG4gICAgcC5vcmllbnQgPSB7IHZhbHVlOiBvcmllbnR9IDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIG9yaWVudCwgc3RhY2spO1xuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuXG4gICAgLy8gSGF2ZSBvbmx5IHgyIG9yIHkyXG4gICAgY29uc3QgX3gyID0geDIobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5lbmNvZGluZygpLngyLCBtb2RlbC5zY2FsZU5hbWUoWCksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeDIpIHtcbiAgICAgIHAueDIgPSBfeDI7XG4gICAgfVxuXG4gICAgY29uc3QgX3kyID0geTIobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5lbmNvZGluZygpLnkyLCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeTIpIHtcbiAgICAgIHAueTIgPSBfeTI7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc01lYXN1cmUoZmllbGREZWYpKSB7IC8vIE1lYXN1cmVcbiAgICAgIGlmIChvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIHhcbiAgICAgICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgyKHhGaWVsZERlZjogRmllbGREZWYsIHgyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKG9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgIGlmIChzdGFjayAmJiBYID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoeEZpZWxkRGVmLCB7IHN1ZmZpeDogJ19lbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHgyRmllbGREZWYpIHtcbiAgICAgICAgaWYgKHgyRmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZCh4MkZpZWxkRGVmKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoeDJGaWVsZERlZi52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHgyRmllbGREZWYudmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IG1ha2UgdGhpcyB3b3JrIGZvciBsb2cgc2NhbGVcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgdmFsdWU6IDBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBvcmllbnQ6IE9yaWVudCwgc3RhY2s6IFN0YWNrUHJvcGVydGllcyk6IFZnVmFsdWVSZWYge1xuICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgc3VmZml4OiAnX3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZShmaWVsZERlZikpIHtcbiAgICAgIGlmIChvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIHlcbiAgICAgICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNEaW1lbnNpb24oZmllbGREZWYpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24geTIoeUZpZWxkRGVmOiBGaWVsZERlZiwgeTJGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBvcmllbnQ6IE9yaWVudCwgc3RhY2s6IFN0YWNrUHJvcGVydGllcyk6IFZnVmFsdWVSZWYge1xuICAgIGlmIChvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICBpZiAoc3RhY2sgJiYgWSA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHlGaWVsZERlZiwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh5MkZpZWxkRGVmKSB7XG4gICAgICAgIC8vIHkyXG4gICAgICAgIGlmICh5MkZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoeTJGaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHkyRmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB5MkZpZWxkRGVmLnZhbHVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgd29yayBmb3IgbG9nIHNjYWxlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIHZhbHVlOiAwXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFNJWkUsIENoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uLy4uL3NjYWxlJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBiYXIge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICBjb25zdCBvcmllbnQgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICBjb25zdCB4RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLng7XG4gICAgY29uc3QgeDJGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueDI7XG5cbiAgICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKHhGaWVsZERlZikgfHwgaXNNZWFzdXJlKHgyRmllbGREZWYpO1xuXG4gICAgLy8geCwgeDIsIGFuZCB3aWR0aCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgLy8gJ3gnIGlzIGEgc3RhY2tlZCBtZWFzdXJlLCB0aHVzIHVzZSA8ZmllbGQ+X3N0YXJ0IGFuZCA8ZmllbGQ+X2VuZCBmb3IgeCwgeDIuXG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgICBwLngyID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBzdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHhJc01lYXN1cmUpIHtcbiAgICAgIGlmIChvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgICAgICBwLnggPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwLnggPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGVsLmhhcyhYMikpIHtcbiAgICAgICAgICBwLngyID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYMilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChtb2RlbC5zY2FsZShYKS50eXBlID09PSBTY2FsZVR5cGUuTE9HKSB7XG4gICAgICAgICAgICBwLngyID0geyB2YWx1ZTogMCB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwLngyID0ge1xuICAgICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxcbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgICB9O1xuICAgICAgICBwLndpZHRoID0ge3ZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFgpfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFgpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIEZvciB2ZXJ0aWNhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWCBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byB3aWR0aC5cbiAgICAgICAgcC54YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHggaXMgZGltZW5zaW9uIG9yIHVuc3BlY2lmaWVkXG4gICAgICBpZiAobW9kZWwuaGFzKFgpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICBwLnhjID0ge1xuICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgIH07XG4gICAgIH0gZWxzZSB7IC8vIG5vIHhcbiAgICAgICAgcC54ID0geyB2YWx1ZTogMCwgb2Zmc2V0OiAyIH07XG4gICAgICB9XG5cbiAgICAgIHAud2lkdGggPSBtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCA/IHtcbiAgICAgICAgICAvLyBhcHBseSBzaXplIHNjYWxlIGlmIGhhcyBzaXplIGFuZCBpcyB2ZXJ0aWNhbCAoZXhwbGljaXQgXCJ2ZXJ0aWNhbFwiIG9yIHVuZGVmaW5lZClcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIC8vIG90aGVyd2lzZSwgdXNlIGZpeGVkIHNpemVcbiAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCAoWCkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgeUZpZWxkRGVmID0gbW9kZWwuZW5jb2RpbmcoKS55O1xuICAgIGNvbnN0IHkyRmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLnkyO1xuXG4gICAgY29uc3QgeUlzTWVhc3VyZSA9IGlzTWVhc3VyZSh5RmllbGREZWYpIHx8IGlzTWVhc3VyZSh5MkZpZWxkRGVmKTtcbiAgICAvLyB5LCB5MiAmIGhlaWdodCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyB5IGlzIHN0YWNrZWQgbWVhc3VyZVxuICAgICAgcC55ID0ge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBzdWZmaXg6ICdfc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnX2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh5SXNNZWFzdXJlKSB7XG4gICAgICBpZiAob3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCkgeyAvLyB2ZXJ0aWNhbCAoZXhwbGljaXQgJ3ZlcnRpY2FsJyBvciB1bmRlZmluZWQpXG4gICAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHtcbiAgICAgICAgICBwLnkgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwLnkgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGVsLmhhcyhZMikpIHtcbiAgICAgICAgICBwLnkyID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZMilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChtb2RlbC5zY2FsZShZKS50eXBlID09PSBTY2FsZVR5cGUuTE9HKSB7XG4gICAgICAgICAgICAvLyBlbmQgb24gYXhpc1xuICAgICAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ2hlaWdodCd9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwLnkyID0ge1xuICAgICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgfTtcbiAgICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBzaXplVmFsdWUobW9kZWwsIFkpIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihZKS5iaW4pIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgICAvLyBGb3IgaG9yaXpvbnRhbCBjaGFydCB0aGF0IGhhcyBiaW5uZWQgWSBhbmQgc2l6ZSxcbiAgICAgICAgLy8gY2VudGVyIGJhciBhbmQgYXBwbHkgc2l6ZSB0byBoZWlnaHQuXG4gICAgICAgIHAueWMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW1wbHkgdXNlIDxmaWVsZD5fc3RhcnQsIDxmaWVsZD5fZW5kXG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19lbmQnIH0pLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIHkgaXMgb3JkaW5hbCBvciB1bnNwZWNpZmllZFxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7IC8vIGlzIG9yZGluYWxcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHsgLy8gTm8gWVxuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9LFxuICAgICAgICAgIG9mZnNldDogLTFcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcC5oZWlnaHQgPSBtb2RlbC5oYXMoU0laRSkgICYmIG9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwgPyB7XG4gICAgICAgICAgLy8gYXBwbHkgc2l6ZSBzY2FsZSBpZiBoYXMgc2l6ZSBhbmQgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFNJWkUpXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya0NvbmZpZyA9IG1vZGVsLmNvbmZpZygpLm1hcms7XG4gICAgaWYgKG1hcmtDb25maWcuYmFyU2l6ZSkge1xuICAgICAgcmV0dXJuIG1hcmtDb25maWcuYmFyU2l6ZTtcbiAgICB9XG4gICAgLy8gQkFSJ3Mgc2l6ZSBpcyBhcHBsaWVkIG9uIGVpdGhlciBYIG9yIFlcbiAgICByZXR1cm4gbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgP1xuICAgICAgICAvLyBGb3Igb3JkaW5hbCBzY2FsZSBvciBzaW5nbGUgYmFyLCB3ZSBjYW4gdXNlIGJhbmRTaXplIC0gMVxuICAgICAgICAvLyAoLTEgc28gdGhhdCB0aGUgYm9yZGVyIG9mIHRoZSBiYXIgZmFsbHMgb24gZXhhY3QgcGl4ZWwpXG4gICAgICAgIG1vZGVsLnNjYWxlKGNoYW5uZWwpLmJhbmRTaXplIC0gMSA6XG4gICAgICAhbW9kZWwuaGFzKGNoYW5uZWwpID9cbiAgICAgICAgbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgLSAxIDpcbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBzZXQgdG8gdGhpbkJhcldpZHRoIGJ5IGRlZmF1bHRcbiAgICAgICAgbWFya0NvbmZpZy5iYXJUaGluU2l6ZTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzY0KTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eSwgYXBwbHlNYXJrQ29uZmlnfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGxpbmUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdsaW5lJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBwLnggPSB4KG1vZGVsLmVuY29kaW5nKCkueCwgbW9kZWwuc2NhbGVOYW1lKFgpLCBjb25maWcpO1xuXG4gICAgcC55ID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgY29uZmlnKTtcblxuICAgIGNvbnN0IF9zaXplID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIGNvbmZpZyk7XG4gICAgaWYgKF9zaXplKSB7IHAuc3Ryb2tlV2lkdGggPSBfc2l6ZTsgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHhcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogMCB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogRmllbGREZWYsIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWV9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsubGluZVNpemUgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSEFQRSwgUEFUSCwgT1JERVIsIE9QQUNJVFksIERFVEFJTCwgTEFCRUwsIFNUQUNLX0dST1VQX0NIQU5ORUxTfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtoYXN9IGZyb20gJy4uLy4uL2VuY29kaW5nJztcbmltcG9ydCB7T3JkZXJDaGFubmVsRGVmLCBGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QVJFQSwgTElORSwgVEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kLCBpc0FycmF5fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdTdGFja1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge2FyZWF9IGZyb20gJy4vYXJlYSc7XG5pbXBvcnQge2Jhcn0gZnJvbSAnLi9iYXInO1xuaW1wb3J0IHtzb3J0RmllbGR9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge2xpbmV9IGZyb20gJy4vbGluZSc7XG5pbXBvcnQge3BvaW50LCBjaXJjbGUsIHNxdWFyZX0gZnJvbSAnLi9wb2ludCc7XG5pbXBvcnQge3J1bGV9IGZyb20gJy4vcnVsZSc7XG5pbXBvcnQge3RleHR9IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQge3RpY2t9IGZyb20gJy4vdGljayc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmNvbnN0IG1hcmtDb21waWxlciA9IHtcbiAgYXJlYTogYXJlYSxcbiAgYmFyOiBiYXIsXG4gIGxpbmU6IGxpbmUsXG4gIHBvaW50OiBwb2ludCxcbiAgdGV4dDogdGV4dCxcbiAgdGljazogdGljayxcbiAgcnVsZTogcnVsZSxcbiAgY2lyY2xlOiBjaXJjbGUsXG4gIHNxdWFyZTogc3F1YXJlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXJrKG1vZGVsOiBVbml0TW9kZWwpOiBhbnlbXSB7XG4gIGlmIChjb250YWlucyhbTElORSwgQVJFQV0sIG1vZGVsLm1hcmsoKSkpIHtcbiAgICByZXR1cm4gcGFyc2VQYXRoTWFyayhtb2RlbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhcnNlTm9uUGF0aE1hcmsobW9kZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkgeyAvLyBUT0RPOiBleHRyYWN0IHRoaXMgaW50byBjb21waWxlUGF0aE1hcmtcbiAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgLy8gVE9ETzogcmVwbGFjZSB0aGlzIHdpdGggbW9yZSBnZW5lcmFsIGNhc2UgZm9yIGNvbXBvc2l0aW9uXG4gIGNvbnN0IGlzRmFjZXRlZCA9IG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuICBjb25zdCBkZXRhaWxzID0gZGV0YWlsRmllbGRzKG1vZGVsKTtcblxuICBsZXQgcGF0aE1hcmtzOiBhbnkgPSBbXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgnbWFya3MnKSxcbiAgICAgIHR5cGU6IG1hcmtDb21waWxlclttYXJrXS5tYXJrVHlwZSgpLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIElmIGhhcyBzdWJmYWNldCBmb3IgbGluZS9hcmVhIGdyb3VwLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBvdXRlciBzdWJmYWNldCBncm91cCBiZWxvdy5cbiAgICAgICAgLy8gSWYgaGFzIG5vIHN1YmZhY2V0LCBhZGQgZnJvbS5kYXRhLlxuICAgICAgICBpc0ZhY2V0ZWQgfHwgZGV0YWlscy5sZW5ndGggPiAwID8ge30gOiBkYXRhRnJvbSxcblxuICAgICAgICAvLyBzb3J0IHRyYW5zZm9ybVxuICAgICAgICB7dHJhbnNmb3JtOiBbeyB0eXBlOiAnc29ydCcsIGJ5OiBzb3J0UGF0aEJ5KG1vZGVsKX1dfVxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfVxuICAgIH1cbiAgXTtcblxuICBpZiAoZGV0YWlscy5sZW5ndGggPiAwKSB7IC8vIGhhdmUgbGV2ZWwgb2YgZGV0YWlscyAtIG5lZWQgdG8gZmFjZXQgbGluZSBpbnRvIHN1Ymdyb3Vwc1xuICAgIGNvbnN0IGZhY2V0VHJhbnNmb3JtID0geyB0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBkZXRhaWxzIH07XG4gICAgY29uc3QgdHJhbnNmb3JtOiBhbnlbXSA9IG1hcmsgPT09IEFSRUEgJiYgbW9kZWwuc3RhY2soKSA/XG4gICAgICAvLyBGb3Igc3RhY2tlZCBhcmVhLCB3ZSBuZWVkIHRvIGltcHV0ZSBtaXNzaW5nIHR1cGxlcyBhbmQgc3RhY2sgdmFsdWVzXG4gICAgICAvLyAoTWFyayBsYXllciBvcmRlciBkb2VzIG5vdCBtYXR0ZXIgZm9yIHN0YWNrZWQgY2hhcnRzKVxuICAgICAgc3RhY2tUcmFuc2Zvcm1zKG1vZGVsLCB0cnVlKS5jb25jYXQoZmFjZXRUcmFuc2Zvcm0pIDpcbiAgICAgIC8vIEZvciBub24tc3RhY2tlZCBwYXRoIChsaW5lL2FyZWEpLCB3ZSBuZWVkIHRvIGZhY2V0IGFuZCBwb3NzaWJseSBzb3J0XG4gICAgICBbXS5jb25jYXQoXG4gICAgICAgIGZhY2V0VHJhbnNmb3JtLFxuICAgICAgICAvLyBpZiBtb2RlbCBoYXMgYG9yZGVyYCwgdGhlbiBzb3J0IG1hcmsncyBsYXllciBvcmRlciBieSBgb3JkZXJgIGZpZWxkKHMpXG4gICAgICAgIG1vZGVsLmhhcyhPUkRFUikgPyBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIDogW11cbiAgICAgICk7XG5cbiAgICByZXR1cm4gW3tcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3BhdGhncm91cCcpLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2Zvcm19XG4gICAgICApLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDogeyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH0sXG4gICAgICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1hcmtzOiBwYXRoTWFya3NcbiAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGF0aE1hcmtzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICBjb25zdCBpc0ZhY2V0ZWQgPSBtb2RlbC5wYXJlbnQoKSAmJiBtb2RlbC5wYXJlbnQoKS5pc0ZhY2V0KCk7XG4gIGNvbnN0IGRhdGFGcm9tID0ge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpfTtcblxuICBsZXQgbWFya3MgPSBbXTsgLy8gVE9ETzogdmdNYXJrc1xuICBpZiAobWFyayA9PT0gVEVYVE1BUksgJiZcbiAgICBtb2RlbC5oYXMoQ09MT1IpICYmXG4gICAgbW9kZWwuY29uZmlnKCkubWFyay5hcHBseUNvbG9yVG9CYWNrZ3JvdW5kICYmICFtb2RlbC5oYXMoWCkgJiYgIW1vZGVsLmhhcyhZKVxuICApIHtcbiAgICAvLyBhZGQgYmFja2dyb3VuZCB0byAndGV4dCcgbWFya3MgaWYgaGFzIGNvbG9yXG4gICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICB7XG4gICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2JhY2tncm91bmQnKSxcbiAgICAgICAgdHlwZTogJ3JlY3QnXG4gICAgICB9LFxuICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgIGlzRmFjZXRlZCA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IHRleHQuYmFja2dyb3VuZChtb2RlbCkgfSB9XG4gICAgKSk7XG4gIH1cblxuICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdtYXJrcycpLFxuICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKClcbiAgICB9LFxuICAgIC8vIEFkZCBgZnJvbWAgaWYgbmVlZGVkXG4gICAgKCFpc0ZhY2V0ZWQgfHwgbW9kZWwuc3RhY2soKSB8fCBtb2RlbC5oYXMoT1JERVIpKSA/IHtcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgZmFjZXRlZCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZVxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAvLyBgZnJvbS50cmFuc2Zvcm1gXG4gICAgICAgIG1vZGVsLnN0YWNrKCkgPyAvLyBTdGFja2VkIENoYXJ0IG5lZWQgc3RhY2sgdHJhbnNmb3JtXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IHN0YWNrVHJhbnNmb3Jtcyhtb2RlbCwgZmFsc2UpIH0gOlxuICAgICAgICBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAgICAgICAvLyBpZiBub24tc3RhY2tlZCwgZGV0YWlsIGZpZWxkIGRldGVybWluZXMgdGhlIGxheWVyIG9yZGVyIG9mIGVhY2ggbWFya1xuICAgICAgICAgIHsgdHJhbnNmb3JtOiBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIH0gOlxuICAgICAgICAgIHt9XG4gICAgICApXG4gICAgfSA6IHt9LFxuICAgIC8vIHByb3BlcnRpZXMgZ3JvdXBzXG4gICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH0gfVxuICApKTtcblxuICBpZiAobW9kZWwuaGFzKExBQkVMKSAmJiBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKSB7XG4gICAgY29uc3QgbGFiZWxQcm9wZXJ0aWVzID0gbWFya0NvbXBpbGVyW21hcmtdLmxhYmVscyhtb2RlbCk7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIGxhYmVsIG1ldGhvZCBmb3IgY3VycmVudCBtYXJrIHR5cGUuXG4gICAgaWYgKGxhYmVsUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7IC8vIElmIGxhYmVsIGlzIHN1cHBvcnRlZFxuICAgICAgLy8gYWRkIGxhYmVsIGdyb3VwXG4gICAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2xhYmVsJyksXG4gICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IGxhYmVsUHJvcGVydGllcyB9IH1cbiAgICAgICkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXJrcztcbn1cblxuZnVuY3Rpb24gc29ydEJ5KG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5oYXMoT1JERVIpKSB7XG4gICAgbGV0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLm9yZGVyO1xuICAgIGlmIChjaGFubmVsRGVmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vIHNvcnQgYnkgbXVsdGlwbGUgZmllbGRzXG4gICAgICByZXR1cm4gY2hhbm5lbERlZi5tYXAoc29ydEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc29ydCBieSBvbmUgZmllbGRcbiAgICAgIHJldHVybiBzb3J0RmllbGQoY2hhbm5lbERlZiBhcyBPcmRlckNoYW5uZWxEZWYpOyAvLyBoYXZlIHRvIGFkZCBPcmRlckNoYW5uZWxEZWYgdG8gbWFrZSB0c2lmeSBub3QgY29tcGxhaW5pbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7IC8vIHVzZSBkZWZhdWx0IG9yZGVyXG59XG5cbi8qKlxuICogUmV0dXJuIHBhdGggb3JkZXIgZm9yIHNvcnQgdHJhbnNmb3JtJ3MgYnkgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gc29ydFBhdGhCeShtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICBpZiAobW9kZWwubWFyaygpID09PSBMSU5FICYmIG1vZGVsLmhhcyhQQVRIKSkge1xuICAgIC8vIEZvciBvbmx5IGxpbmUsIHNvcnQgYnkgdGhlIHBhdGggZmllbGQgaWYgaXQgaXMgc3BlY2lmaWVkLlxuICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLnBhdGg7XG4gICAgaWYgKGNoYW5uZWxEZWYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gc29ydCBieSBtdWx0aXBsZSBmaWVsZHNcbiAgICAgIHJldHVybiBjaGFubmVsRGVmLm1hcChzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzb3J0IGJ5IG9uZSBmaWVsZFxuICAgICAgcmV0dXJuIHNvcnRGaWVsZChjaGFubmVsRGVmIGFzIE9yZGVyQ2hhbm5lbERlZik7IC8vIGhhdmUgdG8gYWRkIE9yZGVyQ2hhbm5lbERlZiB0byBtYWtlIHRzaWZ5IG5vdCBjb21wbGFpbmluZ1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYm90aCBsaW5lIGFuZCBhcmVhLCB3ZSBzb3J0IHZhbHVlcyBiYXNlZCBvbiBkaW1lbnNpb24gYnkgZGVmYXVsdFxuICAgIHJldHVybiAnLScgKyBtb2RlbC5maWVsZChtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwgPyBZIDogWCwge2JpblN1ZmZpeDogJ19taWQnfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpc3Qgb2YgZGV0YWlsIGZpZWxkcyAoZm9yICdjb2xvcicsICdzaGFwZScsIG9yICdkZXRhaWwnIGNoYW5uZWxzKVxuICogdGhhdCB0aGUgbW9kZWwncyBzcGVjIGNvbnRhaW5zLlxuICovXG5mdW5jdGlvbiBkZXRhaWxGaWVsZHMobW9kZWw6IFVuaXRNb2RlbCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFtDT0xPUiwgREVUQUlMLCBPUEFDSVRZLCBTSEFQRV0ucmVkdWNlKGZ1bmN0aW9uKGRldGFpbHMsIGNoYW5uZWwpIHtcbiAgICBpZiAobW9kZWwuaGFzKGNoYW5uZWwpICYmICFtb2RlbC5maWVsZERlZihjaGFubmVsKS5hZ2dyZWdhdGUpIHtcbiAgICAgIGRldGFpbHMucHVzaChtb2RlbC5maWVsZChjaGFubmVsKSk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9LCBbXSk7XG59XG5cblxuZnVuY3Rpb24gc3RhY2tUcmFuc2Zvcm1zKG1vZGVsOiBVbml0TW9kZWwsIGltcHV0ZTogYm9vbGVhbik6IGFueVtdIHtcbiAgY29uc3Qgc3RhY2tCeUZpZWxkcyA9IGdldFN0YWNrQnlGaWVsZHMobW9kZWwpO1xuICBpZiAoaW1wdXRlKSB7XG4gICAgcmV0dXJuIFtpbXB1dGVUcmFuc2Zvcm0obW9kZWwsIHN0YWNrQnlGaWVsZHMpLCBzdGFja1RyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyldO1xuICB9XG4gIHJldHVybiBbc3RhY2tUcmFuc2Zvcm0obW9kZWwsIHN0YWNrQnlGaWVsZHMpXTtcbn1cblxuXG4vKiogQ29tcGlsZSBzdGFjay1ieSBmaWVsZCBuYW1lcyBmcm9tIChmcm9tICdjb2xvcicgYW5kICdkZXRhaWwnKSAqL1xuZnVuY3Rpb24gZ2V0U3RhY2tCeUZpZWxkcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGVuY29kaW5nID0gbW9kZWwuZW5jb2RpbmcoKTtcblxuICByZXR1cm4gU1RBQ0tfR1JPVVBfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKGZpZWxkcywgY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxFbmNvZGluZyA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShjaGFubmVsRW5jb2RpbmcpKSB7XG4gICAgICAgIGNoYW5uZWxFbmNvZGluZy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgZmllbGRzLnB1c2goZmllbGQoZmllbGREZWYpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWVsZERlZjogRmllbGREZWYgPSBjaGFubmVsRW5jb2Rpbmc7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKGZpZWxkRGVmLCB7XG4gICAgICAgICAgYmluU3VmZml4OiBzY2FsZSAmJiBzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdfcmFuZ2UnIDogJ19zdGFydCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGRzO1xuICB9LCBbXSk7XG59XG5cbi8vIGltcHV0ZSBkYXRhIGZvciBzdGFja2VkIGFyZWFcbmZ1bmN0aW9uIGltcHV0ZVRyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsLCBzdGFja0ZpZWxkczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbXB1dGUnLFxuICAgIGZpZWxkOiBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpLFxuICAgIGdyb3VwYnk6IHN0YWNrRmllbGRzLFxuICAgIG9yZGVyYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCwge2JpblN1ZmZpeDogJ19taWQnfSldLFxuICAgIG1ldGhvZDogJ3ZhbHVlJyxcbiAgICB2YWx1ZTogMFxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGFja1RyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsLCBzdGFja0ZpZWxkczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBjb25zdCBlbmNvZGluZyA9IG1vZGVsLmVuY29kaW5nKCk7XG4gIGNvbnN0IHNvcnRieSA9IG1vZGVsLmhhcyhPUkRFUikgP1xuICAgIChpc0FycmF5KGVuY29kaW5nW09SREVSXSkgPyBlbmNvZGluZ1tPUkRFUl0gOiBbZW5jb2RpbmdbT1JERVJdXSkubWFwKHNvcnRGaWVsZCkgOlxuICAgIC8vIGRlZmF1bHQgPSBkZXNjZW5kaW5nIGJ5IHN0YWNrRmllbGRzXG4gICAgc3RhY2tGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgIHJldHVybiAnLScgKyBmaWVsZDtcbiAgICB9KTtcblxuICBjb25zdCB2YWxOYW1lID0gbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKTtcblxuICAvLyBhZGQgc3RhY2sgdHJhbnNmb3JtIHRvIG1hcmtcbiAgbGV0IHRyYW5zZm9ybTogVmdTdGFja1RyYW5zZm9ybSA9IHtcbiAgICB0eXBlOiAnc3RhY2snLFxuICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCwge2JpblN1ZmZpeDogJ19taWQnfSldLFxuICAgIGZpZWxkOiBtb2RlbC5maWVsZChzdGFjay5maWVsZENoYW5uZWwpLFxuICAgIHNvcnRieTogc29ydGJ5LFxuICAgIG91dHB1dDoge1xuICAgICAgc3RhcnQ6IHZhbE5hbWUgKyAnX3N0YXJ0JyxcbiAgICAgIGVuZDogdmFsTmFtZSArICdfZW5kJ1xuICAgIH1cbiAgfTtcblxuICBpZiAoc3RhY2sub2Zmc2V0KSB7XG4gICAgdHJhbnNmb3JtLm9mZnNldCA9IHN0YWNrLm9mZnNldDtcbiAgfVxuICByZXR1cm4gdHJhbnNmb3JtO1xufVxuIiwiaW1wb3J0IHtYLCBZLCBTSEFQRSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7Q2hhbm5lbERlZldpdGhMZWdlbmQsIEZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7YXBwbHlDb2xvckFuZE9wYWNpdHl9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgcG9pbnQge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCwgZml4ZWRTaGFwZT86IHN0cmluZykge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgcC5zaXplID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgbW9kZWwuc2NhbGUoU0laRSksIGNvbmZpZyk7XG5cbiAgICBwLnNoYXBlID0gc2hhcGUobW9kZWwuZW5jb2RpbmcoKS5zaGFwZSwgbW9kZWwuc2NhbGVOYW1lKFNIQVBFKSwgbW9kZWwuc2NhbGUoU0hBUEUpLCBjb25maWcsIGZpeGVkU2hhcGUpO1xuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHhcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5zaXplIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaGFwZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnLCBmaXhlZFNoYXBlPzogc3RyaW5nKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2hhcGVcbiAgICBpZiAoZml4ZWRTaGFwZSkgeyAvLyBzcXVhcmUgYW5kIGNpcmNsZSBtYXJrc1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpeGVkU2hhcGUgfTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsuc2hhcGUgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGNpcmNsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdjaXJjbGUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3F1YXJlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ3NxdWFyZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgWDIsIFkyLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHJ1bGUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdydWxlJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG4gICAgaWYobW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09IE9yaWVudC5WRVJUSUNBTCkge1xuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54ID0geyB2YWx1ZSA6IDAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgICBwLnkgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55ID0geyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkyKSkge1xuICAgICAgICBwLnkyID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkyLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkyID0geyB2YWx1ZTogMCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkgPSB7IHZhbHVlOiAwIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgICAgcC54ID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFgsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueCA9IHsgdmFsdWU6IDAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhYMikpIHtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYMiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54MiA9IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZJWE1FOiB0aGlzIGZ1bmN0aW9uIHdvdWxkIG92ZXJ3cml0ZSBzdHJva2VXaWR0aCBidXQgc2hvdWxkbid0XG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuXG4gICAgLy8gc2l6ZVxuICAgIGlmIChtb2RlbC5oYXMoU0laRSkpIHtcbiAgICAgIHAuc3Ryb2tlV2lkdGggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsucnVsZVNpemU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgYXBwbHlDb2xvckFuZE9wYWNpdHksIG51bWJlckZvcm1hdCwgdGltZVRlbXBsYXRlfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSB0ZXh0IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAndGV4dCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZChtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHk6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9LFxuICAgICAgZmlsbDoge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBtb2RlbC5maWVsZERlZihDT0xPUikudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmbjogJ3JhbmtfJ30gOiB7fSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCxcbiAgICAgIFsnYW5nbGUnLCAnYWxpZ24nLCAnYmFzZWxpbmUnLCAnZHgnLCAnZHknLCAnZm9udCcsICdmb250V2VpZ2h0JyxcbiAgICAgICAgJ2ZvbnRTdHlsZScsICdyYWRpdXMnLCAndGhldGEnLCAndGV4dCddKTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuICAgIGNvbnN0IHRleHRGaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFRFWFQpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnLCB0ZXh0RmllbGREZWYpO1xuXG4gICAgcC55ID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgY29uZmlnKTtcblxuICAgIHAuZm9udFNpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBjb25maWcpO1xuXG4gICAgcC50ZXh0ID0gdGV4dChtb2RlbC5lbmNvZGluZygpLnRleHQsIG1vZGVsLnNjYWxlTmFtZShURVhUKSwgY29uZmlnKTtcblxuICAgIGlmIChtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLmZpbGwgPSB7dmFsdWU6ICdibGFjayd9OyAvLyBUT0RPOiBhZGQgcnVsZXMgZm9yIHN3YXBwaW5nIGJldHdlZW4gYmxhY2sgYW5kIHdoaXRlXG4gICAgICAvLyBvcGFjaXR5XG4gICAgICBjb25zdCBvcGFjaXR5ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcGFjaXR5O1xuICAgICAgaWYgKG9wYWNpdHkpIHsgcC5vcGFjaXR5ID0geyB2YWx1ZTogb3BhY2l0eSB9OyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KHhGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZywgdGV4dEZpZWxkRGVmOkZpZWxkRGVmKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmICh4RmllbGREZWYpIHtcbiAgICAgIGlmICh4RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh4RmllbGREZWYsIHsgYmluU3VmZml4OiAnX21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETzogc3VwcG9ydCB4LnZhbHVlLCB4LmRhdHVtXG4gICAgaWYgKHRleHRGaWVsZERlZiAmJiB0ZXh0RmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICByZXR1cm4geyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9LCBvZmZzZXQ6IC01IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUudGV4dEJhbmRXaWR0aCAvIDIgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB5KHlGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHlcbiAgICBpZiAoeUZpZWxkRGVmKSB7XG4gICAgICBpZiAoeUZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoeUZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRPRE8gY29uc2lkZXIgaWYgdGhpcyBzaG91bGQgc3VwcG9ydCBncm91cDogaGVpZ2h0IGNhc2UgdG9vLlxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaXplKHNpemVGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHNpemVcbiAgICBpZiAoc2l6ZUZpZWxkRGVmKSB7XG4gICAgICBpZiAoc2l6ZUZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoc2l6ZUZpZWxkRGVmKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHNpemVGaWVsZERlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBzaXplRmllbGREZWYudmFsdWV9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsuZm9udFNpemUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRleHQodGV4dEZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gdGV4dFxuICAgIGlmICh0ZXh0RmllbGREZWYpIHtcbiAgICAgIGlmICh0ZXh0RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgaWYgKFFVQU5USVRBVElWRSA9PT0gdGV4dEZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgICBjb25zdCBmb3JtYXQgPSBudW1iZXJGb3JtYXQodGV4dEZpZWxkRGVmLCBjb25maWcubWFyay5mb3JtYXQsIGNvbmZpZyk7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSAnbnVtYmVyJyArICggZm9ybWF0ID8gJzpcXCcnICsgZm9ybWF0ICsgJ1xcJycgOiAnJyk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAne3snICsgZmllbGQodGV4dEZpZWxkRGVmLCB7IGRhdHVtOiB0cnVlIH0pICsgJyB8ICcgKyBmaWx0ZXIgKyAnfX0nXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChURU1QT1JBTCA9PT0gdGV4dEZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHRpbWVUZW1wbGF0ZShmaWVsZCh0ZXh0RmllbGREZWYsIHtkYXR1bTogdHJ1ZX0pLCB0ZXh0RmllbGREZWYudGltZVVuaXQsIGNvbmZpZy5tYXJrLmZvcm1hdCwgY29uZmlnLm1hcmsuc2hvcnRUaW1lTGFiZWxzLCBjb25maWcpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBmaWVsZDogdGV4dEZpZWxkRGVmLmZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGV4dEZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiB0ZXh0RmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHt2YWx1ZTogY29uZmlnLm1hcmsudGV4dH07XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09yaWVudH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHRpY2sge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG5cbiAgICBwLnhjID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueWMgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgaWYgKGNvbmZpZy5tYXJrLm9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgIHAud2lkdGggPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBjb25maWcsIChtb2RlbC5zY2FsZShYKSB8fCB7fSkuYmFuZFNpemUpO1xuICAgICAgcC5oZWlnaHQgPSB7IHZhbHVlOiBjb25maWcubWFyay50aWNrVGhpY2tuZXNzIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHAud2lkdGggPSB7IHZhbHVlOiBjb25maWcubWFyay50aWNrVGhpY2tuZXNzIH07XG4gICAgICBwLmhlaWdodCA9IHNpemUobW9kZWwuZW5jb2RpbmcoKS5zaXplLCBtb2RlbC5zY2FsZU5hbWUoU0laRSksIGNvbmZpZywgKG1vZGVsLnNjYWxlKFkpIHx8IHt9KS5iYW5kU2l6ZSk7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24geChmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHhcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ19taWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdfbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmaWVsZERlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBmaWVsZERlZi52YWx1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcuc2NhbGUuYmFuZFNpemUgLyAyIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaXplKGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnLCBzY2FsZUJhbmRTaXplOiBudW1iZXIpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoZmllbGREZWYpIHtcbiAgICAgIGlmIChmaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkRGVmLmZpZWxkXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb25maWcubWFyay50aWNrU2l6ZSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLnRpY2tTaXplIH07XG4gICAgfVxuICAgIGNvbnN0IGJhbmRTaXplID0gc2NhbGVCYW5kU2l6ZSAhPT0gdW5kZWZpbmVkID9cbiAgICAgIHNjYWxlQmFuZFNpemUgOlxuICAgICAgY29uZmlnLnNjYWxlLmJhbmRTaXplO1xuICAgIHJldHVybiB7IHZhbHVlOiBiYW5kU2l6ZSAvIDEuNSB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7QXhpc30gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge0NoYW5uZWwsIFgsIENPTFVNTn0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZywgQ2VsbENvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RGF0YSwgRGF0YVRhYmxlfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7Y2hhbm5lbE1hcHBpbmdSZWR1Y2UsIGNoYW5uZWxNYXBwaW5nRm9yRWFjaH0gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGaWVsZERlZiwgRmllbGRSZWZPcHRpb24sIGZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi4vbGVnZW5kJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtTb3J0RmllbGQsIFNvcnRPcmRlcn0gZnJvbSAnLi4vc29ydCc7XG5pbXBvcnQge0Jhc2VTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICcuLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtleHRlbmQsIGZsYXR0ZW4sIHZhbHMsIHdhcm5pbmcsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnTWFya0dyb3VwLCBWZ1NjYWxlLCBWZ0F4aXMsIFZnTGVnZW5kfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHtMYXlvdXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcblxuLyoqXG4gKiBDb21wb3NhYmxlIENvbXBvbmVudHMgdGhhdCBhcmUgaW50ZXJtZWRpYXRlIHJlc3VsdHMgb2YgdGhlIHBhcnNpbmcgcGhhc2Ugb2YgdGhlXG4gKiBjb21waWxhdGlvbnMuICBUaGVzZSBjb21wb3NhYmxlIGNvbXBvbmVudHMgd2lsbCBiZSBhc3NlbWJsZWQgaW4gdGhlIGxhc3RcbiAqIGNvbXBpbGF0aW9uIHN0ZXAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IHtcbiAgZGF0YTogRGF0YUNvbXBvbmVudDtcbiAgbGF5b3V0OiBMYXlvdXRDb21wb25lbnQ7XG4gIHNjYWxlOiBEaWN0PFNjYWxlQ29tcG9uZW50cz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnQXhpcyBkZWZpbml0aW9uICovXG4gIC8vIFRPRE86IGlmIHdlIGFsbG93IG11bHRpcGxlIGF4ZXMgKGUuZy4sIGR1YWwgYXhpcyksIHRoaXMgd2lsbCBiZWNvbWUgVmdBeGlzW11cbiAgYXhpczogRGljdDxWZ0F4aXM+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBWZ0xlZ2VuZCBkZWZpbml0aW9uICovXG4gIGxlZ2VuZDogRGljdDxWZ0xlZ2VuZD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGF4aXMgbWFyayBncm91cCBmb3IgZmFjZXQgYW5kIGNvbmNhdCAqL1xuICBheGlzR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXA+O1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgY2hhbm5lbCB0byBncmlkIG1hcmsgZ3JvdXAgZm9yIGZhY2V0IChhbmQgY29uY2F0PykgKi9cbiAgZ3JpZEdyb3VwOiBEaWN0PFZnTWFya0dyb3VwW10+O1xuXG4gIG1hcms6IFZnTWFya0dyb3VwW107XG59XG5cbmNsYXNzIE5hbWVNYXAge1xuICBwcml2YXRlIF9uYW1lTWFwOiBEaWN0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbmFtZU1hcCA9IHt9IGFzIERpY3Q8c3RyaW5nPjtcbiAgfVxuXG4gIHB1YmxpYyByZW5hbWUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lTWFwW29sZE5hbWVdID0gbmV3TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBJZiB0aGUgbmFtZSBhcHBlYXJzIGluIHRoZSBfbmFtZU1hcCwgd2UgbmVlZCB0byByZWFkIGl0cyBuZXcgbmFtZS5cbiAgICAvLyBXZSBoYXZlIHRvIGxvb3Agb3ZlciB0aGUgZGljdCBqdXN0IGluIGNhc2UsIHRoZSBuZXcgbmFtZSBhbHNvIGdldHMgcmVuYW1lZC5cbiAgICB3aGlsZSAodGhpcy5fbmFtZU1hcFtuYW1lXSkge1xuICAgICAgbmFtZSA9IHRoaXMuX25hbWVNYXBbbmFtZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IE1vZGVsO1xuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9kZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBfZGF0YTogRGF0YTtcblxuICAvKiogTmFtZSBtYXAgZm9yIGRhdGEgc291cmNlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9kYXRhTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNjYWxlcywgd2hpY2ggY2FuIGJlIHJlbmFtZWQgYnkgYSBtb2RlbCdzIHBhcmVudC4gKi9cbiAgcHJvdGVjdGVkIF9zY2FsZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgLyoqIE5hbWUgbWFwIGZvciBzaXplLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NpemVOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG4gIHByb3RlY3RlZCBfc2NhbGU6IERpY3Q8U2NhbGU+O1xuXG4gIHByb3RlY3RlZCBfYXhpczogRGljdDxBeGlzPjtcblxuICBwcm90ZWN0ZWQgX2xlZ2VuZDogRGljdDxMZWdlbmQ+O1xuXG4gIHByb3RlY3RlZCBfY29uZmlnOiBDb25maWc7XG5cbiAgcHJvdGVjdGVkIF93YXJuaW5nczogc3RyaW5nW10gPSBbXTtcblxuICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3Ioc3BlYzogQmFzZVNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXG4gICAgLy8gSWYgbmFtZSBpcyBub3QgcHJvdmlkZWQsIGFsd2F5cyB1c2UgcGFyZW50J3MgZ2l2ZW5OYW1lIHRvIGF2b2lkIG5hbWUgY29uZmxpY3RzLlxuICAgIHRoaXMuX25hbWUgPSBzcGVjLm5hbWUgfHwgcGFyZW50R2l2ZW5OYW1lO1xuXG4gICAgLy8gU2hhcmVkIG5hbWUgbWFwc1xuICAgIHRoaXMuX2RhdGFOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9kYXRhTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zY2FsZU5hbWVNYXAgOiBuZXcgTmFtZU1hcCgpO1xuICAgIHRoaXMuX3NpemVOYW1lTWFwID0gcGFyZW50ID8gcGFyZW50Ll9zaXplTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG5cbiAgICB0aGlzLl9kYXRhID0gc3BlYy5kYXRhO1xuXG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBzcGVjLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuX3RyYW5zZm9ybSA9IHNwZWMudHJhbnNmb3JtO1xuXG4gICAgdGhpcy5jb21wb25lbnQgPSB7ZGF0YTogbnVsbCwgbGF5b3V0OiBudWxsLCBtYXJrOiBudWxsLCBzY2FsZTogbnVsbCwgYXhpczogbnVsbCwgYXhpc0dyb3VwOiBudWxsLCBncmlkR3JvdXA6IG51bGwsIGxlZ2VuZDogbnVsbH07XG4gIH1cblxuXG4gIHB1YmxpYyBwYXJzZSgpIHtcbiAgICB0aGlzLnBhcnNlRGF0YSgpO1xuICAgIHRoaXMucGFyc2VTZWxlY3Rpb25EYXRhKCk7XG4gICAgdGhpcy5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLnBhcnNlU2NhbGUoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWVcbiAgICB0aGlzLnBhcnNlQXhpcygpOyAvLyBkZXBlbmRzIG9uIHNjYWxlIG5hbWVcbiAgICB0aGlzLnBhcnNlTGVnZW5kKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzR3JvdXAoKTsgLy8gZGVwZW5kcyBvbiBjaGlsZCBheGlzXG4gICAgdGhpcy5wYXJzZUdyaWRHcm91cCgpO1xuICAgIHRoaXMucGFyc2VNYXJrKCk7IC8vIGRlcGVuZHMgb24gZGF0YSBuYW1lIGFuZCBzY2FsZSBuYW1lLCBheGlzR3JvdXAsIGdyaWRHcm91cCBhbmQgY2hpbGRyZW4ncyBzY2FsZSwgYXhpcywgbGVnZW5kIGFuZCBtYXJrLlxuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZVNlbGVjdGlvbkRhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VMYXlvdXREYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2NhbGUoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VNYXJrKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpcygpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxlZ2VuZCgpO1xuXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGVzZSB0d28gbWV0aG9kcyBtYWtlIHNlbnNlIGZvciBzaGFyZWQgc2NhbGUgY29uY2F0XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUF4aXNHcm91cCgpO1xuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VHcmlkR3JvdXAoKTtcblxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICAvLyBUT0RPOiBmb3IgQXJ2aW5kIHRvIHdyaXRlXG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvblNpZ25hbChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuICAvLyBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVTZWxlY3Rpb25EYXRhKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG5cbiAgcHVibGljIGFzc2VtYmxlU2NhbGVzKCk6IFZnU2NhbGVbXSB7XG4gICAgLy8gRklYTUU6IHdyaXRlIGFzc2VtYmxlU2NhbGVzKCkgaW4gc2NhbGUudHMgdGhhdFxuICAgIC8vIGhlbHAgYXNzZW1ibGUgc2NhbGUgZG9tYWlucyB3aXRoIHNjYWxlIHNpZ25hdHVyZSBhcyB3ZWxsXG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5zY2FsZSkubWFwKChzY2FsZXM6IFNjYWxlQ29tcG9uZW50cykgPT4ge1xuICAgICAgbGV0IGFyciA9IFtzY2FsZXMubWFpbl07XG4gICAgICBpZiAoc2NhbGVzLmNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5jb2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoc2NhbGVzLmJpbkNvbG9yTGVnZW5kKSB7XG4gICAgICAgIGFyci5wdXNoKHNjYWxlcy5iaW5Db2xvckxlZ2VuZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZU1hcmtzKCk6IGFueVtdOyAvLyBUT0RPOiBWZ01hcmtHcm91cFtdXG5cbiAgcHVibGljIGFzc2VtYmxlQXhlcygpOiBWZ0F4aXNbXSB7XG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQuYXhpcyk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMZWdlbmRzKCk6IGFueVtdIHsgLy8gVE9ETzogVmdMZWdlbmRbXVxuICAgIHJldHVybiB2YWxzKHRoaXMuY29tcG9uZW50LmxlZ2VuZCk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVHcm91cCgpIHtcbiAgICBsZXQgZ3JvdXA6IFZnTWFya0dyb3VwID0ge307XG5cbiAgICAvLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHNjYWxlcyB0byBjb21lIGJlZm9yZSBtYXJrcyBpbiB0aGUgb3V0cHV0IHNwZWMuXG5cbiAgICBncm91cC5tYXJrcyA9IHRoaXMuYXNzZW1ibGVNYXJrcygpO1xuICAgIGNvbnN0IHNjYWxlcyA9IHRoaXMuYXNzZW1ibGVTY2FsZXMoKTtcbiAgICBpZiAoc2NhbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLnNjYWxlcyA9IHNjYWxlcztcbiAgICB9XG5cbiAgICBjb25zdCBheGVzID0gdGhpcy5hc3NlbWJsZUF4ZXMoKTtcbiAgICBpZiAoYXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5heGVzID0gYXhlcztcbiAgICB9XG5cbiAgICBjb25zdCBsZWdlbmRzID0gdGhpcy5hc3NlbWJsZUxlZ2VuZHMoKTtcbiAgICBpZiAobGVnZW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICBncm91cC5sZWdlbmRzID0gbGVnZW5kcztcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoY2VsbENvbmZpZzogQ2VsbENvbmZpZyk7XG5cbiAgcHVibGljIGFic3RyYWN0IGNoYW5uZWxzKCk6IENoYW5uZWxbXTtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbWFwcGluZygpO1xuXG4gIHB1YmxpYyByZWR1Y2UoZjogKGFjYzogYW55LCBmZDogRmllbGREZWYsIGM6IENoYW5uZWwpID0+IGFueSwgaW5pdCwgdD86IGFueSkge1xuICAgIHJldHVybiBjaGFubmVsTWFwcGluZ1JlZHVjZSh0aGlzLmNoYW5uZWxzKCksIHRoaXMubWFwcGluZygpLCBmLCBpbml0LCB0KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoKGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6bnVtYmVyKSA9PiB2b2lkLCB0PzogYW55KSB7XG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIHQpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbjtcblxuICBwdWJsaWMgcGFyZW50KCk6IE1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIG5hbWUodGV4dDogc3RyaW5nLCBkZWxpbWl0ZXI6IHN0cmluZyA9ICdfJykge1xuICAgIHJldHVybiAodGhpcy5fbmFtZSA/IHRoaXMuX25hbWUgKyBkZWxpbWl0ZXIgOiAnJykgKyB0ZXh0O1xuICB9XG5cbiAgcHVibGljIGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZURhdGEob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICAgdGhpcy5fZGF0YU5hbWVNYXAucmVuYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZGF0YSBzb3VyY2UgbmFtZSBmb3IgdGhlIGdpdmVuIGRhdGEgc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEZvciB1bml0IHNwZWMsIHRoaXMgaXMgYWx3YXlzIHNpbXBseSB0aGUgc3BlYy5uYW1lICsgJy0nICsgZGF0YVNvdXJjZVR5cGUuXG4gICAqIFdlIGFscmVhZHkgdXNlIHRoZSBuYW1lIG1hcCBzbyB0aGF0IG1hcmtzIGFuZCBzY2FsZXMgdXNlIHRoZSBjb3JyZWN0IGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZGF0YU5hbWUoZGF0YVNvdXJjZVR5cGU6IERhdGFUYWJsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFOYW1lTWFwLmdldCh0aGlzLm5hbWUoU3RyaW5nKGRhdGFTb3VyY2VUeXBlKSkpO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNpemUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaXplTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbFNpemVOYW1lKGNoYW5uZWw6IENoYW5uZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNpemVOYW1lKGNoYW5uZWwgPT09IFggfHwgY2hhbm5lbCA9PT0gQ09MVU1OID8gJ3dpZHRoJyA6ICdoZWlnaHQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzaXplTmFtZShzaXplOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICByZXR1cm4gdGhpcy5fc2l6ZU5hbWVNYXAuZ2V0KHRoaXMubmFtZShzaXplLCAnXycpKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBkYXRhVGFibGUoKTogc3RyaW5nO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oKTogVHJhbnNmb3JtIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBcImZpZWxkXCIgcmVmZXJlbmNlIGZvciB2ZWdhICovXG4gIHB1YmxpYyBmaWVsZChjaGFubmVsOiBDaGFubmVsLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgICBjb25zdCBmaWVsZERlZiA9IHRoaXMuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgICBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpbiBoYXMgZGVmYXVsdCBzdWZmaXggdGhhdCBkZXBlbmRzIG9uIHNjYWxlVHlwZVxuICAgICAgb3B0ID0gZXh0ZW5kKHtcbiAgICAgICAgYmluU3VmZml4OiB0aGlzLnNjYWxlKGNoYW5uZWwpLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ19yYW5nZScgOiAnX3N0YXJ0J1xuICAgICAgfSwgb3B0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmO1xuXG4gIHB1YmxpYyBzY2FsZShjaGFubmVsOiBDaGFubmVsKTogU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZVtjaGFubmVsXTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbmFtZSB0byBoYXNPcmRpbmFsU2NhbGVcbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2NhbGUoY2hhbm5lbCk7XG4gICAgcmV0dXJuIHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNjYWxlKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIC8qKiByZXR1cm5zIHNjYWxlIG5hbWUgZm9yIGEgZ2l2ZW4gY2hhbm5lbCAqL1xuICBwdWJsaWMgc2NhbGVOYW1lKGNoYW5uZWw6IENoYW5uZWx8c3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGVOYW1lTWFwLmdldCh0aGlzLm5hbWUoY2hhbm5lbCArICcnKSk7XG4gIH1cblxuICBwdWJsaWMgc29ydChjaGFubmVsOiBDaGFubmVsKTogU29ydEZpZWxkIHwgU29ydE9yZGVyIHtcbiAgICByZXR1cm4gKHRoaXMubWFwcGluZygpW2NoYW5uZWxdIHx8IHt9KS5zb3J0O1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHN0YWNrKCk7XG5cbiAgcHVibGljIGF4aXMoY2hhbm5lbDogQ2hhbm5lbCk6IEF4aXMge1xuICAgIHJldHVybiB0aGlzLl9heGlzW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGxlZ2VuZChjaGFubmVsOiBDaGFubmVsKTogTGVnZW5kIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnZW5kW2NoYW5uZWxdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3BlYyBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHVibGljIGNvbmZpZygpOiBDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwdWJsaWMgYWRkV2FybmluZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB3YXJuaW5nKG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dhcm5pbmdzLnB1c2gobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgd2FybmluZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl93YXJuaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBlIGNoZWNrc1xuICAgKi9cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIHZhciBleHBvcnRzO1xuXG5pbXBvcnQge1NIQVJFRF9ET01BSU5fT1BTfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgWDIsIFkyLCBTSEFQRSwgU0laRSwgQ09MT1IsIE9QQUNJVFksIFRFWFQsIGhhc1NjYWxlLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNUQUNLRURfU0NBTEV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGQsIGlzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtNYXJrLCBCQVIsIFRFWFQgYXMgVEVYVE1BUkssIFJVTEUsIFRJQ0t9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlLCBOaWNlVGltZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtpc1NvcnRGaWVsZCwgU29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4uL3N0YWNrJztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1NjYWxlfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtkZWZhdWx0U2NhbGVUeXBlLCByYXdEb21haW4sIHNtYWxsZXN0VW5pdH0gZnJvbSAnLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8qKlxuICogQ29sb3IgUmFtcCdzIHNjYWxlIGZvciBsZWdlbmRzLiAgVGhpcyBzY2FsZSBoYXMgdG8gYmUgb3JkaW5hbCBzbyB0aGF0IGl0c1xuICogbGVnZW5kcyBzaG93IGEgbGlzdCBvZiBudW1iZXJzLlxuICovXG5leHBvcnQgY29uc3QgQ09MT1JfTEVHRU5EID0gJ2NvbG9yX2xlZ2VuZCc7XG5cbi8vIHNjYWxlIHVzZWQgdG8gZ2V0IGxhYmVscyBmb3IgYmlubmVkIGNvbG9yIHNjYWxlc1xuZXhwb3J0IGNvbnN0IENPTE9SX0xFR0VORF9MQUJFTCA9ICdjb2xvcl9sZWdlbmRfbGFiZWwnO1xuXG5cbi8vIEZJWE1FOiBXaXRoIGxheWVyIGFuZCBjb25jYXQsIHNjYWxlQ29tcG9uZW50IHNob3VsZCBkZWNvbXBvc2UgYmV0d2VlblxuLy8gU2NhbGVTaWduYXR1cmUgYW5kIFNjYWxlRG9tYWluW10uXG4vLyBCYXNpY2FsbHksIGlmIHR3byB1bml0IHNwZWNzIGhhcyB0aGUgc2FtZSBzY2FsZSwgc2lnbmF0dXJlIGZvciBhIHBhcnRpY3VsYXIgY2hhbm5lbCxcbi8vIHRoZSBzY2FsZSBjYW4gYmUgdW5pb25lZCBieSBjb21iaW5pbmcgdGhlIGRvbWFpbi5cbmV4cG9ydCB0eXBlIFNjYWxlQ29tcG9uZW50ID0gVmdTY2FsZTtcblxuZXhwb3J0IHR5cGUgU2NhbGVDb21wb25lbnRzID0ge1xuICBtYWluOiBTY2FsZUNvbXBvbmVudDtcbiAgY29sb3JMZWdlbmQ/OiBTY2FsZUNvbXBvbmVudCxcbiAgYmluQ29sb3JMZWdlbmQ/OiBTY2FsZUNvbXBvbmVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTY2FsZUNvbXBvbmVudChtb2RlbDogTW9kZWwpOiBEaWN0PFNjYWxlQ29tcG9uZW50cz4ge1xuICAvLyBUT0RPOiBzaG91bGQgbW9kZWwuY2hhbm5lbHMoKSBpbmxjdWRlIFgyL1kyP1xuICByZXR1cm4gbW9kZWwuY2hhbm5lbHMoKS5yZWR1Y2UoZnVuY3Rpb24oc2NhbGU6IERpY3Q8U2NhbGVDb21wb25lbnRzPiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKG1vZGVsLnNjYWxlKGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgICAgIGNvbnN0IHNjYWxlczogU2NhbGVDb21wb25lbnRzID0ge1xuICAgICAgICAgIG1haW46IHBhcnNlTWFpblNjYWxlKG1vZGVsLCBmaWVsZERlZiwgY2hhbm5lbClcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCBzY2FsZXMgbmVlZGVkIHRvIHN1cHBvcnQgb3JkaW5hbCBsZWdlbmRzIChsaXN0IG9mIHZhbHVlcylcbiAgICAgICAgLy8gZm9yIGNvbG9yIHJhbXAuXG4gICAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUiAmJiBtb2RlbC5sZWdlbmQoQ09MT1IpICYmIChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMIHx8IGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdCkpIHtcbiAgICAgICAgICBzY2FsZXMuY29sb3JMZWdlbmQgPSBwYXJzZUNvbG9yTGVnZW5kU2NhbGUobW9kZWwsIGZpZWxkRGVmKTtcbiAgICAgICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgICAgICBzY2FsZXMuYmluQ29sb3JMZWdlbmQgPSBwYXJzZUJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWwsIGZpZWxkRGVmKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzY2FsZVtjaGFubmVsXSA9IHNjYWxlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlQ29tcG9uZW50cz4pO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWFpbiBzY2FsZSBmb3IgZWFjaCBjaGFubmVsLiAgKE9ubHkgY29sb3IgY2FuIGhhdmUgbXVsdGlwbGUgc2NhbGVzLilcbiAqL1xuZnVuY3Rpb24gcGFyc2VNYWluU2NhbGUobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgY29uc3Qgc29ydCA9IG1vZGVsLnNvcnQoY2hhbm5lbCk7XG4gIGxldCBzY2FsZURlZjogYW55ID0ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKSxcbiAgICB0eXBlOiBzY2FsZS50eXBlLFxuICB9O1xuXG4gIC8vIElmIGNoYW5uZWwgaXMgZWl0aGVyIFggb3IgWSB0aGVuIHVuaW9uIHRoZW0gd2l0aCBYMiAmIFkyIGlmIHRoZXkgZXhpc3RcbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgbW9kZWwuaGFzKFgyKSkge1xuICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IHsgZmllbGRzOiBbZG9tYWluKHNjYWxlLCBtb2RlbCwgWCksIGRvbWFpbihzY2FsZSwgbW9kZWwsIFgyKV0gfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NhbGVEZWYuZG9tYWluID0gZG9tYWluKHNjYWxlLCBtb2RlbCwgWDIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjaGFubmVsID09PSBZICYmIG1vZGVsLmhhcyhZMikpIHtcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBzY2FsZURlZi5kb21haW4gPSB7IGZpZWxkczogW2RvbWFpbihzY2FsZSwgbW9kZWwsIFkpLCBkb21haW4oc2NhbGUsIG1vZGVsLCBZMildIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIFkyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2NhbGVEZWYuZG9tYWluID0gZG9tYWluKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCk7XG4gIH1cblxuICBleHRlbmQoc2NhbGVEZWYsIHJhbmdlTWl4aW5zKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCkpO1xuICBpZiAoc29ydCAmJiAoaXNTb3J0RmllbGQoc29ydCkgPyBzb3J0Lm9yZGVyIDogc29ydCkgPT09IFNvcnRPcmRlci5ERVNDRU5ESU5HKSB7XG4gICAgc2NhbGVEZWYucmV2ZXJzZSA9IHRydWU7XG4gIH1cblxuICAvLyBBZGQgb3B0aW9uYWwgcHJvcGVydGllc1xuICBbXG4gICAgLy8gZ2VuZXJhbCBwcm9wZXJ0aWVzXG4gICAgJ3JvdW5kJyxcbiAgICAvLyBxdWFudGl0YXRpdmUgLyB0aW1lXG4gICAgJ2NsYW1wJywgJ25pY2UnLFxuICAgIC8vIHF1YW50aXRhdGl2ZVxuICAgICdleHBvbmVudCcsICd6ZXJvJyxcbiAgICAvLyBvcmRpbmFsXG4gICAgJ3BhZGRpbmcnLCAncG9pbnRzJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV4cG9ydHNbcHJvcGVydHldKHNjYWxlLCBjaGFubmVsLCBmaWVsZERlZiwgbW9kZWwpO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2FsZURlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzY2FsZURlZjtcbn1cblxuLyoqXG4gKiAgUmV0dXJuIGEgc2NhbGUgIGZvciBwcm9kdWNpbmcgb3JkaW5hbCBzY2FsZSBmb3IgbGVnZW5kcy5cbiAqICAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlXG4gKiAgLSBGb3IgYSBmaWVsZCB3aXRoIGJpbiBvciB0aW1lVW5pdCwgcHJvdmlkZSBhbiBpZGVudGl0eSBvcmRpbmFsIHNjYWxlXG4gKiAgICAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ29sb3JMZWdlbmRTY2FsZShtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IFNjYWxlQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EKSxcbiAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgLy8gdXNlIHJhbmtfPGZpZWxkPiBmb3Igb3JkaW5hbCB0eXBlLCBmb3IgYmluIGFuZCB0aW1lVW5pdCB1c2UgZGVmYXVsdCBmaWVsZFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCAoZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSA/IHt9IDoge3ByZWZuOiAncmFua18nfSksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLCBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLCBzb3J0OiB0cnVlfVxuICB9O1xufVxuXG4vKipcbiAqICBSZXR1cm4gYW4gYWRkaXRpb25hbCBzY2FsZSBmb3IgYmluIGxhYmVscyBiZWNhdXNlIHdlIG5lZWQgdG8gbWFwIGJpbl9zdGFydCB0byBiaW5fcmFuZ2UgaW4gbGVnZW5kc1xuICovXG5mdW5jdGlvbiBwYXJzZUJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYpOiBTY2FsZUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORF9MQUJFTCksXG4gICAgdHlwZTogU2NhbGVUeXBlLk9SRElOQUwsXG4gICAgZG9tYWluOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdfcmFuZ2UnfSksXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICBvcDogJ21pbicgLy8gbWluIG9yIG1heCBkb2Vzbid0IG1hdHRlciBzaW5jZSBzYW1lIF9yYW5nZSB3b3VsZCBoYXZlIHRoZSBzYW1lIF9zdGFydFxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlVHlwZShzY2FsZTogU2NhbGUsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCwgbWFyazogTWFyayk6IFNjYWxlVHlwZSB7XG4gIGlmICghaGFzU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAvLyBUaGVyZSBpcyBubyBzY2FsZSBmb3IgdGhlc2UgY2hhbm5lbHNcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFdlIGNhbid0IHVzZSBsaW5lYXIvdGltZSBmb3Igcm93LCBjb2x1bW4gb3Igc2hhcGVcbiAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEVdLCBjaGFubmVsKSkge1xuICAgIGlmIChzY2FsZSAmJiBzY2FsZS50eXBlICE9PSB1bmRlZmluZWQgJiYgc2NhbGUudHlwZSAhPT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICAgIC8vIFRPRE86IGNvbnNvbGlkYXRlIHdhcm5pbmdcbiAgICAgIGNvbnNvbGUud2FybignQ2hhbm5lbCcsIGNoYW5uZWwsICdkb2VzIG5vdCB3b3JrIHdpdGggc2NhbGUgdHlwZSA9Jywgc2NhbGUudHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgfVxuXG4gIGlmIChzY2FsZS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2NhbGUudHlwZTtcbiAgfVxuXG4gIHN3aXRjaCAoZmllbGREZWYudHlwZSkge1xuICAgIGNhc2UgTk9NSU5BTDpcbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICBjYXNlIE9SRElOQUw6XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5MSU5FQVI7IC8vIHRpbWUgaGFzIG9yZGVyLCBzbyB1c2UgaW50ZXJwb2xhdGVkIG9yZGluYWwgY29sb3Igc2NhbGUuXG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgY2FzZSBURU1QT1JBTDpcbiAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7IC8vIHRpbWUgaGFzIG9yZGVyLCBzbyB1c2UgaW50ZXJwb2xhdGVkIG9yZGluYWwgY29sb3Igc2NhbGUuXG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFNjYWxlVHlwZShmaWVsZERlZi50aW1lVW5pdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7XG5cbiAgICBjYXNlIFFVQU5USVRBVElWRTpcbiAgICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZLCBDT0xPUl0sIGNoYW5uZWwpID8gU2NhbGVUeXBlLkxJTkVBUiA6IFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5MSU5FQVI7XG4gIH1cblxuICAvLyBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpc1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpbihzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDpDaGFubmVsKTogYW55IHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICBpZiAoc2NhbGUuZG9tYWluKSB7IC8vIGV4cGxpY2l0IHZhbHVlXG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbjtcbiAgfVxuXG4gIC8vIHNwZWNpYWwgY2FzZSBmb3IgdGVtcG9yYWwgc2NhbGVcbiAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgaWYgKHJhd0RvbWFpbihmaWVsZERlZi50aW1lVW5pdCwgY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGZpZWxkRGVmLnRpbWVVbml0LFxuICAgICAgICBmaWVsZDogJ2RhdGUnXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgICAgICBvcDogJ21pbidcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRm9yIHN0YWNrLCB1c2UgU1RBQ0tFRCBkYXRhLlxuICBjb25zdCBzdGFjayA9IG1vZGVsLnN0YWNrKCk7XG4gIGlmIChzdGFjayAmJiBjaGFubmVsID09PSBzdGFjay5maWVsZENoYW5uZWwpIHtcbiAgICBpZihzdGFjay5vZmZzZXQgPT09IFN0YWNrT2Zmc2V0Lk5PUk1BTElaRSkge1xuICAgICAgcmV0dXJuIFswLCAxXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgLy8gU1RBQ0tFRF9TQ0FMRSBwcm9kdWNlcyBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAnc3VtXyd9KVxuICAgIH07XG4gIH1cblxuICBjb25zdCB1c2VSYXdEb21haW4gPSBfdXNlUmF3RG9tYWluKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCksXG4gIHNvcnQgPSBkb21haW5Tb3J0KG1vZGVsLCBjaGFubmVsLCBzY2FsZS50eXBlKTtcblxuICBpZiAodXNlUmF3RG9tYWluKSB7IC8vIHVzZVJhd0RvbWFpbiAtIG9ubHkgUS9UXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IFNPVVJDRSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7bm9BZ2dyZWdhdGU6IHRydWV9KVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmllbGREZWYuYmluKSB7IC8vIGJpblxuICAgIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgICAgLy8gb3JkaW5hbCBiaW4gc2NhbGUgdGFrZXMgZG9tYWluIGZyb20gYmluX3JhbmdlLCBvcmRlcmVkIGJ5IGJpbl9zdGFydFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19yYW5nZScgfSksXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG9wOiAnbWluJyAvLyBtaW4gb3IgbWF4IGRvZXNuJ3QgbWF0dGVyIHNpbmNlIHNhbWUgX3JhbmdlIHdvdWxkIGhhdmUgdGhlIHNhbWUgX3N0YXJ0XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgLy8gQ3VycmVudGx5LCBiaW5uZWQgb24gY29sb3IgdXNlcyBsaW5lYXIgc2NhbGUgYW5kIHRodXMgdXNlIF9zdGFydCBwb2ludFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsLCB7IGJpblN1ZmZpeDogJ19zdGFydCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyIGxpbmVhciBiaW4gc2NhbGUgbWVyZ2VzIGJvdGggYmluX3N0YXJ0IGFuZCBiaW5fZW5kIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICAgIGZpZWxkOiBbXG4gICAgICAgICAgbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdfc3RhcnQnIH0pLFxuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnX2VuZCcgfSlcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc29ydCkgeyAvLyBoYXZlIHNvcnQgLS0gb25seSBmb3Igb3JkaW5hbFxuICAgIHJldHVybiB7XG4gICAgICAvLyBJZiBzb3J0IGJ5IGFnZ3JlZ2F0aW9uIG9mIGEgc3BlY2lmaWVkIHNvcnQgZmllbGQsIHdlIG5lZWQgdG8gdXNlIFNPVVJDRSB0YWJsZSxcbiAgICAgIC8vIHNvIHdlIGNhbiBhZ2dyZWdhdGUgdmFsdWVzIGZvciB0aGUgc2NhbGUgaW5kZXBlbmRlbnRseSBmcm9tIHRoZSBtYWluIGFnZ3JlZ2F0aW9uLlxuICAgICAgZGF0YTogc29ydC5vcCA/IFNPVVJDRSA6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgZmllbGQ6IChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMICYmIGNoYW5uZWwgPT09IENPTE9SKSA/IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmbjogJ3JhbmtfJ30pIDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiBzb3J0XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZuOiAncmFua18nfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW5Tb3J0KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgc2NhbGVUeXBlOiBTY2FsZVR5cGUpOiBhbnkge1xuICBpZiAoc2NhbGVUeXBlICE9PSBTY2FsZVR5cGUuT1JESU5BTCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBzb3J0ID0gbW9kZWwuc29ydChjaGFubmVsKTtcblxuICAvLyBTb3J0ZWQgYmFzZWQgb24gYW4gYWdncmVnYXRlIGNhbGN1bGF0aW9uIG92ZXIgYSBzcGVjaWZpZWQgc29ydCBmaWVsZCAob25seSBmb3Igb3JkaW5hbCBzY2FsZSlcbiAgaWYgKGlzU29ydEZpZWxkKHNvcnQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wOiBzb3J0Lm9wLFxuICAgICAgZmllbGQ6IHNvcnQuZmllbGRcbiAgICB9O1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zKFtTb3J0T3JkZXIuQVNDRU5ESU5HLCBTb3J0T3JkZXIuREVTQ0VORElORywgdW5kZWZpbmVkIC8qIGRlZmF1bHQgPWFzY2VuZGluZyovXSwgc29ydCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIHNvcnQgPT09ICdub25lJ1xuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHVzZVJhd0RvbWFpbiBzaG91bGQgYmUgYWN0aXZhdGVkIGZvciB0aGlzIHNjYWxlLlxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdG9ucyBhcHBsaWVzOlxuICogMS4gYHVzZVJhd0RvbWFpbmAgaXMgZW5hYmxlZCBlaXRoZXIgdGhyb3VnaCBzY2FsZSBvciBjb25maWdcbiAqIDIuIEFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIGlzIG5vdCBgY291bnRgIG9yIGBzdW1gXG4gKiAzLiBUaGUgc2NhbGUgaXMgcXVhbnRpdGF0aXZlIG9yIHRpbWUgc2NhbGUuXG4gKi9cbmZ1bmN0aW9uIF91c2VSYXdEb21haW4gKHNjYWxlOiBTY2FsZSwgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgcmV0dXJuIHNjYWxlLnVzZVJhd0RvbWFpbiAmJiAvLyAgaWYgdXNlUmF3RG9tYWluIGlzIGVuYWJsZWRcbiAgICAvLyBvbmx5IGFwcGxpZWQgdG8gYWdncmVnYXRlIHRhYmxlXG4gICAgZmllbGREZWYuYWdncmVnYXRlICYmXG4gICAgLy8gb25seSBhY3RpdmF0ZWQgaWYgdXNlZCB3aXRoIGFnZ3JlZ2F0ZSBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlcyB2YWx1ZXMgcmFuZ2luZyBpbiB0aGUgZG9tYWluIG9mIHRoZSBzb3VyY2UgZGF0YVxuICAgIFNIQVJFRF9ET01BSU5fT1BTLmluZGV4T2YoZmllbGREZWYuYWdncmVnYXRlKSA+PSAwICYmXG4gICAgKFxuICAgICAgLy8gUSBhbHdheXMgdXNlcyBxdWFudGl0YXRpdmUgc2NhbGUgZXhjZXB0IHdoZW4gaXQncyBiaW5uZWQuXG4gICAgICAvLyBCaW5uZWQgZmllbGQgaGFzIHNpbWlsYXIgdmFsdWVzIGluIGJvdGggdGhlIHNvdXJjZSB0YWJsZSBhbmQgdGhlIHN1bW1hcnkgdGFibGVcbiAgICAgIC8vIGJ1dCB0aGUgc3VtbWFyeSB0YWJsZSBoYXMgZmV3ZXIgdmFsdWVzLCB0aGVyZWZvcmUgYmlubmVkIGZpZWxkcyBkcmF3XG4gICAgICAvLyBkb21haW4gdmFsdWVzIGZyb20gdGhlIHN1bW1hcnkgdGFibGUuXG4gICAgICAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFICYmICFmaWVsZERlZi5iaW4pIHx8XG4gICAgICAvLyBUIHVzZXMgbm9uLW9yZGluYWwgc2NhbGUgd2hlbiB0aGVyZSdzIG5vIHVuaXQgb3Igd2hlbiB0aGUgdW5pdCBpcyBub3Qgb3JkaW5hbC5cbiAgICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiBjb250YWlucyhbU2NhbGVUeXBlLlRJTUUsIFNjYWxlVHlwZS5VVENdLCBzY2FsZS50eXBlKSlcbiAgICApO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZU1peGlucyhzY2FsZTogU2NhbGUsIG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IGFueSB7XG4gIC8vIFRPRE86IG5lZWQgdG8gYWRkIHJ1bGUgZm9yIHF1YW50aWxlLCBxdWFudGl6ZSwgdGhyZXNob2xkIHNjYWxlXG5cbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgY29uc3Qgc2NhbGVDb25maWcgPSBtb2RlbC5jb25maWcoKS5zY2FsZTtcblxuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgc2NhbGUuYmFuZFNpemUgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIHJldHVybiB7YmFuZFNpemU6IHNjYWxlLmJhbmRTaXplfTtcbiAgfVxuXG4gIGlmIChzY2FsZS5yYW5nZSAmJiAhY29udGFpbnMoW1gsIFksIFJPVywgQ09MVU1OXSwgY2hhbm5lbCkpIHtcbiAgICAvLyBleHBsaWNpdCB2YWx1ZSAoRG8gbm90IGFsbG93IGV4cGxpY2l0IHZhbHVlcyBmb3IgWCwgWSwgUk9XLCBDT0xVTU4pXG4gICAgcmV0dXJuIHtyYW5nZTogc2NhbGUucmFuZ2V9O1xuICB9XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgUk9XOlxuICAgICAgcmV0dXJuIHtyYW5nZTogJ2hlaWdodCd9O1xuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHtyYW5nZTogJ3dpZHRoJ307XG4gIH1cblxuICAvLyBJZiBub3QgUk9XIC8gQ09MVU1OLCB3ZSBjYW4gYXNzdW1lIHRoYXQgdGhpcyBpcyBhIHVuaXQgc3BlYy5cbiAgY29uc3QgdW5pdE1vZGVsID0gbW9kZWwgYXMgVW5pdE1vZGVsO1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgICAvLyB3ZSBjYW4ndCB1c2Uge3JhbmdlOiBcIndpZHRoXCJ9IGhlcmUgc2luY2Ugd2UgcHV0IHNjYWxlIGluIHRoZSByb290IGdyb3VwXG4gICAgICAvLyBub3QgaW5zaWRlIHRoZSBjZWxsLCBzbyBzY2FsZSBpcyByZXVzYWJsZSBmb3IgYXhlcyBncm91cFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByYW5nZU1pbjogMCxcbiAgICAgICAgcmFuZ2VNYXg6IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLndpZHRoIC8vIEZpeGVkIGNlbGwgd2lkdGggZm9yIG5vbi1vcmRpbmFsXG4gICAgICB9O1xuICAgIGNhc2UgWTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlTWluOiB1bml0TW9kZWwuY29uZmlnKCkuY2VsbC5oZWlnaHQsIC8vIEZpeGVkIGNlbGwgaGVpZ2h0IGZvciBub24tb3JkaW5hbFxuICAgICAgICByYW5nZU1heDogMFxuICAgICAgfTtcbiAgICBjYXNlIFNJWkU6XG5cbiAgICAgIGlmICh1bml0TW9kZWwubWFyaygpID09PSBCQVIpIHtcbiAgICAgICAgaWYgKHNjYWxlQ29uZmlnLmJhclNpemVSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcuYmFyU2l6ZVJhbmdlfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaW1lbnNpb24gPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwgPyBZIDogWDtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogW21vZGVsLmNvbmZpZygpLm1hcmsuYmFyVGhpblNpemUsIG1vZGVsLnNjYWxlKGRpbWVuc2lvbikuYmFuZFNpemVdfTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gVEVYVE1BUkspIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcuZm9udFNpemVSYW5nZSB9O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBSVUxFKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnJ1bGVTaXplUmFuZ2UgfTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdE1vZGVsLm1hcmsoKSA9PT0gVElDSykge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy50aWNrU2l6ZVJhbmdlIH07XG4gICAgICB9XG4gICAgICAvLyBlbHNlIC0tIHBvaW50LCBzcXVhcmUsIGNpcmNsZVxuICAgICAgaWYgKHNjYWxlQ29uZmlnLnBvaW50U2l6ZVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2V9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYW5kU2l6ZSA9IHBvaW50QmFuZFNpemUodW5pdE1vZGVsKTtcblxuICAgICAgcmV0dXJuIHtyYW5nZTogWzksIChiYW5kU2l6ZSAtIDIpICogKGJhbmRTaXplIC0gMildfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcuc2hhcGVSYW5nZX07XG4gICAgY2FzZSBDT0xPUjpcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBOT01JTkFMKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLm5vbWluYWxDb2xvclJhbmdlfTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgLS0gb3JkaW5hbCwgdGltZSwgb3IgcXVhbnRpdGF0aXZlXG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5zZXF1ZW50aWFsQ29sb3JSYW5nZX07XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcub3BhY2l0eX07XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBwb2ludEJhbmRTaXplKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3Qgc2NhbGVDb25maWcgPSBtb2RlbC5jb25maWcoKS5zY2FsZTtcblxuICBjb25zdCBoYXNYID0gbW9kZWwuaGFzKFgpO1xuICBjb25zdCBoYXNZID0gbW9kZWwuaGFzKFkpO1xuXG4gIGNvbnN0IHhJc01lYXN1cmUgPSBpc01lYXN1cmUobW9kZWwuZW5jb2RpbmcoKS54KTtcbiAgY29uc3QgeUlzTWVhc3VyZSA9IGlzTWVhc3VyZShtb2RlbC5lbmNvZGluZygpLnkpO1xuXG4gIGlmIChoYXNYICYmIGhhc1kpIHtcbiAgICByZXR1cm4geElzTWVhc3VyZSAhPT0geUlzTWVhc3VyZSA/XG4gICAgICBtb2RlbC5zY2FsZSh4SXNNZWFzdXJlID8gWSA6IFgpLmJhbmRTaXplIDpcbiAgICAgIE1hdGgubWluKFxuICAgICAgICBtb2RlbC5zY2FsZShYKS5iYW5kU2l6ZSB8fCBzY2FsZUNvbmZpZy5iYW5kU2l6ZSxcbiAgICAgICAgbW9kZWwuc2NhbGUoWSkuYmFuZFNpemUgfHwgc2NhbGVDb25maWcuYmFuZFNpemVcbiAgICAgICk7XG4gIH0gZWxzZSBpZiAoaGFzWSkge1xuICAgIHJldHVybiB5SXNNZWFzdXJlID8gbW9kZWwuY29uZmlnKCkuc2NhbGUuYmFuZFNpemUgOiBtb2RlbC5zY2FsZShZKS5iYW5kU2l6ZTtcbiAgfSBlbHNlIGlmIChoYXNYKSB7XG4gICAgcmV0dXJuIHhJc01lYXN1cmUgPyBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSA6IG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplO1xuICB9XG4gIHJldHVybiBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHNjYWxlOiBTY2FsZSkge1xuICAvLyBPbmx5IHdvcmtzIGZvciBzY2FsZSB3aXRoIGJvdGggY29udGludW91cyBkb21haW4gY29udGludW91cyByYW5nZVxuICAvLyAoRG9lc24ndCB3b3JrIGZvciBxdWFudGl6ZSwgcXVhbnRpbGUsIHRocmVzaG9sZCwgb3JkaW5hbClcbiAgaWYgKGNvbnRhaW5zKFtTY2FsZVR5cGUuTElORUFSLCBTY2FsZVR5cGUuUE9XLCBTY2FsZVR5cGUuU1FSVCxcbiAgICAgICAgU2NhbGVUeXBlLkxPRywgU2NhbGVUeXBlLlRJTUUsIFNjYWxlVHlwZS5VVENdLCBzY2FsZS50eXBlKSkge1xuICAgIHJldHVybiBzY2FsZS5jbGFtcDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb25lbnQoc2NhbGU6IFNjYWxlKSB7XG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuUE9XKSB7XG4gICAgcmV0dXJuIHNjYWxlLmV4cG9uZW50O1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuaWNlKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgZmllbGREZWY6IEZpZWxkRGVmKTogYm9vbGVhbiB8IE5pY2VUaW1lIHtcbiAgaWYgKGNvbnRhaW5zKFtTY2FsZVR5cGUuTElORUFSLCBTY2FsZVR5cGUuUE9XLCBTY2FsZVR5cGUuU1FSVCwgU2NhbGVUeXBlLkxPRyxcbiAgICAgICAgU2NhbGVUeXBlLlRJTUUsIFNjYWxlVHlwZS5VVEMsIFNjYWxlVHlwZS5RVUFOVElaRV0sIHNjYWxlLnR5cGUpKSB7XG5cbiAgICBpZiAoc2NhbGUubmljZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gc2NhbGUubmljZTtcbiAgICB9XG4gICAgaWYgKGNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKSB7XG4gICAgICByZXR1cm4gc21hbGxlc3RVbml0KGZpZWxkRGVmLnRpbWVVbml0KSBhcyBhbnk7XG4gICAgfVxuICAgIHJldHVybiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpOyAvLyByZXR1cm4gdHJ1ZSBmb3IgcXVhbnRpdGF0aXZlIFgvWVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZGRpbmcoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8qIFBhZGRpbmcgaXMgb25seSBhbGxvd2VkIGZvciBYIGFuZCBZLlxuICAgKlxuICAgKiBCYXNpY2FsbHkgaXQgZG9lc24ndCBtYWtlIHNlbnNlIHRvIGFkZCBwYWRkaW5nIGZvciBjb2xvciBhbmQgc2l6ZS5cbiAgICpcbiAgICogV2UgZG8gbm90IHVzZSBkMyBzY2FsZSdzIHBhZGRpbmcgZm9yIHJvdy9jb2x1bW4gYmVjYXVzZSBwYWRkaW5nIHRoZXJlXG4gICAqIGlzIGEgcmF0aW8gKFswLCAxXSkgYW5kIGl0IGNhdXNlcyB0aGUgcGFkZGluZyB0byBiZSBkZWNpbWFscy5cbiAgICogVGhlcmVmb3JlLCB3ZSBtYW51YWxseSBjYWxjdWxhdGUgcGFkZGluZyBpbiB0aGUgbGF5b3V0IGJ5IG91cnNlbHZlcy5cbiAgICovXG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIHNjYWxlLnBhZGRpbmc7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50cyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwsIF9fLCBtb2RlbDogTW9kZWwpIHtcbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICAvLyBXZSBhbHdheXMgdXNlIG9yZGluYWwgcG9pbnQgc2NhbGUgZm9yIHggYW5kIHkuXG4gICAgLy8gVGh1cyBgcG9pbnRzYCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgc2NhbGUncyBzY2hlbWEuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY29udGFpbnMoW1gsIFksIFJPVywgQ09MVU1OLCBTSVpFXSwgY2hhbm5lbCkgJiYgc2NhbGUucm91bmQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY2FsZS5yb3VuZDtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIC8vIG9ubHkgYXBwbGljYWJsZSBmb3Igbm9uLW9yZGluYWwgc2NhbGVcbiAgaWYgKCFjb250YWlucyhbU2NhbGVUeXBlLlRJTUUsIFNjYWxlVHlwZS5VVEMsIFNjYWxlVHlwZS5PUkRJTkFMXSwgc2NhbGUudHlwZSkpIHtcbiAgICBpZiAoc2NhbGUuemVybyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gc2NhbGUuemVybztcbiAgICB9XG4gICAgLy8gQnkgZGVmYXVsdCwgcmV0dXJuIHRydWUgb25seSBmb3Igbm9uLWJpbm5lZCwgcXVhbnRpdGF0aXZlIHgtc2NhbGUgb3IgeS1zY2FsZVxuICAgIC8vIElmIG5vIGN1c3RvbSBkb21haW4gaXMgcHJvdmlkZWQuXG4gICAgcmV0dXJuICFzY2FsZS5kb21haW4gJiYgIWZpZWxkRGVmLmJpbiAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7WCwgWSwgWDIsIFkyLCBURVhULCBQQVRILCBPUkRFUiwgQ2hhbm5lbCwgVU5JVF9DSEFOTkVMUywgIFVOSVRfU0NBTEVfQ0hBTk5FTFMsIE5PTlNQQVRJQUxfU0NBTEVfQ0hBTk5FTFMsIHN1cHBvcnRNYXJrfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuLi9lbmNvZGluZyc7IC8vIFRPRE86IHJlbW92ZVxuaW1wb3J0IHtGaWVsZERlZiwgRmllbGRSZWZPcHRpb24sIGZpZWxkfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi4vbGVnZW5kJztcbmltcG9ydCB7TWFyaywgVEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7RXh0ZW5kZWRVbml0U3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2dldEZ1bGxOYW1lLCBRVUFOVElUQVRJVkV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtkdXBsaWNhdGUsIGV4dGVuZCwgbWVyZ2VEZWVwLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7cGFyc2VBeGlzQ29tcG9uZW50fSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHthcHBseUNvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge2luaXRNYXJrQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VVbml0RGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHtwYXJzZUxlZ2VuZENvbXBvbmVudH0gZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VVbml0TGF5b3V0fSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7cGFyc2VNYXJrfSBmcm9tICcuL21hcmsvbWFyayc7XG5pbXBvcnQge3BhcnNlU2NhbGVDb21wb25lbnQsIHNjYWxlVHlwZX0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge3N0YWNrLCBTdGFja1Byb3BlcnRpZXN9IGZyb20gJy4uL3N0YWNrJztcblxuLyoqXG4gKiBJbnRlcm5hbCBtb2RlbCBvZiBWZWdhLUxpdGUgc3BlY2lmaWNhdGlvbiBmb3IgdGhlIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY2xhc3MgVW5pdE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuXG4gIHByaXZhdGUgX21hcms6IE1hcms7XG4gIHByaXZhdGUgX2VuY29kaW5nOiBFbmNvZGluZztcbiAgcHJpdmF0ZSBfc3RhY2s6IFN0YWNrUHJvcGVydGllcztcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjLCBwYXJlbnQ6IE1vZGVsLCBwYXJlbnRHaXZlbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcblxuICAgIGNvbnN0IG1hcmsgPSB0aGlzLl9tYXJrID0gc3BlYy5tYXJrO1xuICAgIGNvbnN0IGVuY29kaW5nID0gdGhpcy5fZW5jb2RpbmcgPSB0aGlzLl9pbml0RW5jb2RpbmcobWFyaywgc3BlYy5lbmNvZGluZyB8fCB7fSk7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50LCBtYXJrLCBlbmNvZGluZyk7XG5cbiAgICB0aGlzLl9zY2FsZSA9ICB0aGlzLl9pbml0U2NhbGUobWFyaywgZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fYXhpcyA9IHRoaXMuX2luaXRBeGlzKGVuY29kaW5nLCBjb25maWcpO1xuICAgIHRoaXMuX2xlZ2VuZCA9IHRoaXMuX2luaXRMZWdlbmQoZW5jb2RpbmcsIGNvbmZpZyk7XG5cbiAgICAvLyBjYWxjdWxhdGUgc3RhY2sgcHJvcGVydGllc1xuICAgIHRoaXMuX3N0YWNrID0gc3RhY2sobWFyaywgZW5jb2RpbmcsIGNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RW5jb2RpbmcobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgLy8gY2xvbmUgdG8gcHJldmVudCBzaWRlIGVmZmVjdCB0byB0aGUgb3JpZ2luYWwgc3BlY1xuICAgIGVuY29kaW5nID0gZHVwbGljYXRlKGVuY29kaW5nKTtcblxuICAgIHZsRW5jb2RpbmcuZm9yRWFjaChlbmNvZGluZywgZnVuY3Rpb24oZmllbGREZWY6IEZpZWxkRGVmLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgICBpZiAoIXN1cHBvcnRNYXJrKGNoYW5uZWwsIG1hcmspKSB7XG4gICAgICAgIC8vIERyb3AgdW5zdXBwb3J0ZWQgY2hhbm5lbFxuXG4gICAgICAgIC8vIEZJWE1FIGNvbnNvbGlkYXRlIHdhcm5pbmcgbWV0aG9kXG4gICAgICAgIGNvbnNvbGUud2FybihjaGFubmVsLCAnZHJvcHBlZCBhcyBpdCBpcyBpbmNvbXBhdGlibGUgd2l0aCcsIG1hcmspO1xuICAgICAgICBkZWxldGUgZmllbGREZWYuZmllbGQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoY2hhbm5lbCA9PT0gUEFUSCB8fCBjaGFubmVsID09PSBPUkRFUikgJiYgIWZpZWxkRGVmLmFnZ3JlZ2F0ZSAmJiBmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgICAgZmllbGREZWYuYWdncmVnYXRlID0gQWdncmVnYXRlT3AuTUlOO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBlbmNvZGluZztcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsLCBtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICBsZXQgY29uZmlnID0gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30sIHNwZWNDb25maWcpO1xuICAgIGNvbmZpZy5tYXJrID0gaW5pdE1hcmtDb25maWcobWFyaywgZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTY2FsZShtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogRGljdDxTY2FsZT4ge1xuICAgIHJldHVybiBVTklUX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfc2NhbGUsIGNoYW5uZWwpIHtcbiAgICAgIGlmICh2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgY2hhbm5lbCkgfHxcbiAgICAgICAgICAoY2hhbm5lbCA9PT0gWCAmJiB2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgWDIpKSB8fFxuICAgICAgICAgIChjaGFubmVsID09PSBZICYmIHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBZMikpXG4gICAgICAgICkge1xuXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBlbmNvZGluZ1tjaGFubmVsXTtcbiAgICAgICAgY29uc3Qgc2NhbGVTcGVjID0gKGNoYW5uZWxEZWYgfHwge30pLnNjYWxlIHx8IHt9O1xuICAgICAgICBjb25zdCBfc2NhbGVUeXBlID0gc2NhbGVUeXBlKHNjYWxlU3BlYywgY2hhbm5lbERlZiwgY2hhbm5lbCwgbWFyayk7XG5cbiAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiBfc2NhbGVUeXBlLFxuICAgICAgICAgIHJvdW5kOiBjb25maWcuc2NhbGUucm91bmQsXG4gICAgICAgICAgcGFkZGluZzogY29uZmlnLnNjYWxlLnBhZGRpbmcsXG4gICAgICAgICAgdXNlUmF3RG9tYWluOiBjb25maWcuc2NhbGUudXNlUmF3RG9tYWluLFxuICAgICAgICAgIGJhbmRTaXplOiBjaGFubmVsID09PSBYICYmIF9zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIG1hcmsgPT09IFRFWFRNQVJLID9cbiAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zY2FsZS50ZXh0QmFuZFdpZHRoIDogY29uZmlnLnNjYWxlLmJhbmRTaXplXG4gICAgICAgIH0sIHNjYWxlU3BlYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NjYWxlO1xuICAgIH0sIHt9IGFzIERpY3Q8U2NhbGU+KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBeGlzKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PEF4aXM+IHtcbiAgICByZXR1cm4gW1gsIFldLnJlZHVjZShmdW5jdGlvbihfYXhpcywgY2hhbm5lbCkge1xuICAgICAgLy8gUG9zaXRpb24gQXhpc1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSB8fFxuICAgICAgICAgIChjaGFubmVsID09PSBYICYmIHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBYMikpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFkgJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFkyKSkpIHtcblxuICAgICAgICBjb25zdCBheGlzU3BlYyA9IChlbmNvZGluZ1tjaGFubmVsXSB8fCB7fSkuYXhpcztcbiAgICAgICAgaWYgKGF4aXNTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIF9heGlzW2NoYW5uZWxdID0gZXh0ZW5kKHt9LFxuICAgICAgICAgICAgY29uZmlnLmF4aXMsXG4gICAgICAgICAgICBheGlzU3BlYyA9PT0gdHJ1ZSA/IHt9IDogYXhpc1NwZWMgfHwgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9heGlzO1xuICAgIH0sIHt9IGFzIERpY3Q8QXhpcz4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdExlZ2VuZChlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogRGljdDxMZWdlbmQ+IHtcbiAgICByZXR1cm4gTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUy5yZWR1Y2UoZnVuY3Rpb24oX2xlZ2VuZCwgY2hhbm5lbCkge1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgICBjb25zdCBsZWdlbmRTcGVjID0gZW5jb2RpbmdbY2hhbm5lbF0ubGVnZW5kO1xuICAgICAgICBpZiAobGVnZW5kU3BlYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBfbGVnZW5kW2NoYW5uZWxdID0gZXh0ZW5kKHt9LCBjb25maWcubGVnZW5kLFxuICAgICAgICAgICAgbGVnZW5kU3BlYyA9PT0gdHJ1ZSA/IHt9IDogbGVnZW5kU3BlYyB8fCAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2xlZ2VuZDtcbiAgICB9LCB7fSBhcyBEaWN0PExlZ2VuZD4pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlRGF0YSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5kYXRhID0gcGFyc2VVbml0RGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgdGhpcy5jb21wb25lbnQubGF5b3V0ID0gcGFyc2VVbml0TGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgdGhpcy5jb21wb25lbnQuc2NhbGUgPSBwYXJzZVNjYWxlQ29tcG9uZW50KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5tYXJrID0gcGFyc2VNYXJrKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpcygpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5heGlzID0gcGFyc2VBeGlzQ29tcG9uZW50KHRoaXMsIFtYLCBZXSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VHcmlkR3JvdXAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgdGhpcy5jb21wb25lbnQubGVnZW5kID0gcGFyc2VMZWdlbmRDb21wb25lbnQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIHJldHVybiBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGFzc2VtYmxlTGF5b3V0KHRoaXMsIGxheW91dERhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTWFya3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcms7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoY2VsbENvbmZpZzogQ2VsbENvbmZpZykge1xuICAgIHJldHVybiBhcHBseUNvbmZpZyh7fSwgY2VsbENvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHLmNvbmNhdChbJ2NsaXAnXSkpO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBVTklUX0NIQU5ORUxTO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcHBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5jb2RpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFjaygpOiBTdGFja1Byb3BlcnRpZXMge1xuICAgIHJldHVybiB0aGlzLl9zdGFjaztcbiAgfVxuXG4gIHB1YmxpYyB0b1NwZWMoZXhjbHVkZUNvbmZpZz8sIGV4Y2x1ZGVEYXRhPykge1xuICAgIGNvbnN0IGVuY29kaW5nID0gZHVwbGljYXRlKHRoaXMuX2VuY29kaW5nKTtcbiAgICBsZXQgc3BlYzogYW55O1xuXG4gICAgc3BlYyA9IHtcbiAgICAgIG1hcms6IHRoaXMuX21hcmssXG4gICAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgICB9O1xuXG4gICAgaWYgKCFleGNsdWRlQ29uZmlnKSB7XG4gICAgICBzcGVjLmNvbmZpZyA9IGR1cGxpY2F0ZSh0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIGlmICghZXhjbHVkZURhdGEpIHtcbiAgICAgIHNwZWMuZGF0YSA9IGR1cGxpY2F0ZSh0aGlzLl9kYXRhKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVmYXVsdHNcbiAgICByZXR1cm4gc3BlYztcbiAgfVxuXG4gIHB1YmxpYyBtYXJrKCk6IE1hcmsge1xuICAgIHJldHVybiB0aGlzLl9tYXJrO1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgcmV0dXJuIHZsRW5jb2RpbmcuaGFzKHRoaXMuX2VuY29kaW5nLCBjaGFubmVsKTtcbiAgfVxuXG4gIHB1YmxpYyBlbmNvZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5jb2Rpbmc7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyB8fCB7fVxuICAgIC8vIEN1cnJlbnRseSB3ZSBoYXZlIGl0IHRvIHByZXZlbnQgbnVsbCBwb2ludGVyIGV4Y2VwdGlvbi5cbiAgICByZXR1cm4gdGhpcy5fZW5jb2RpbmdbY2hhbm5lbF0gfHwge307XG4gIH1cblxuICAvKiogR2V0IFwiZmllbGRcIiByZWZlcmVuY2UgZm9yIHZlZ2EgKi9cbiAgcHVibGljIGZpZWxkKGNoYW5uZWw6IENoYW5uZWwsIG9wdDogRmllbGRSZWZPcHRpb24gPSB7fSkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gdGhpcy5maWVsZERlZihjaGFubmVsKTtcblxuICAgIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluIGhhcyBkZWZhdWx0IHN1ZmZpeCB0aGF0IGRlcGVuZHMgb24gc2NhbGVUeXBlXG4gICAgICBvcHQgPSBleHRlbmQoe1xuICAgICAgICBiaW5TdWZmaXg6IHRoaXMuc2NhbGUoY2hhbm5lbCkudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgPyAnX3JhbmdlJyA6ICdfc3RhcnQnXG4gICAgICB9LCBvcHQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZChmaWVsZERlZiwgb3B0KTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YU5hbWUodmxFbmNvZGluZy5pc0FnZ3JlZ2F0ZSh0aGlzLl9lbmNvZGluZykgPyBTVU1NQVJZIDogU09VUkNFKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1VuaXQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7U2NhbGVDb25maWcsIEZhY2V0U2NhbGVDb25maWcsIGRlZmF1bHRTY2FsZUNvbmZpZywgZGVmYXVsdEZhY2V0U2NhbGVDb25maWd9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtBeGlzQ29uZmlnLCBkZWZhdWx0QXhpc0NvbmZpZywgZGVmYXVsdEZhY2V0QXhpc0NvbmZpZ30gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7TGVnZW5kQ29uZmlnLCBkZWZhdWx0TGVnZW5kQ29uZmlnfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge1N0YWNrT2Zmc2V0fSBmcm9tICcuL3N0YWNrJztcblxuZXhwb3J0IGludGVyZmFjZSBDZWxsQ29uZmlnIHtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcblxuICBjbGlwPzogYm9vbGVhbjtcblxuICAvLyBGSUxMX1NUUk9LRV9DT05GSUdcbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgZmlsbCBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzdHJva2UgY29sb3IuICovXG4gIHN0cm9rZT86IHN0cmluZztcblxuICAvKiogVGhlIHN0cm9rZSBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvKiogVGhlIHN0cm9rZSB3aWR0aCwgaW4gcGl4ZWxzLiAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKiogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLiAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LiAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENlbGxDb25maWc6IENlbGxDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgc3Ryb2tlOiAnI2NjYycsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgLyoqIEZhY2V0IFNjYWxlIENvbmZpZyAqL1xuICBzY2FsZT86IEZhY2V0U2NhbGVDb25maWc7XG5cbiAgLyoqIEZhY2V0IEF4aXMgQ29uZmlnICovXG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBHcmlkIENvbmZpZyAqL1xuICBncmlkPzogRmFjZXRHcmlkQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBDZWxsIENvbmZpZyAqL1xuICBjZWxsPzogQ2VsbENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldEdyaWRDb25maWcge1xuICAvKiogQGZvcm1hdCBjb2xvciAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgb2Zmc2V0PzogbnVtYmVyO1xufVxuXG5jb25zdCBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnOiBGYWNldEdyaWRDb25maWcgPSB7XG4gIGNvbG9yOiAnIzAwMDAwMCcsXG4gIG9wYWNpdHk6IDAuNCxcbiAgb2Zmc2V0OiAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q29uZmlnOiBGYWNldENvbmZpZyA9IHtcbiAgc2NhbGU6IGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnLFxuICBheGlzOiBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnLFxuICBncmlkOiBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnLFxuICBjZWxsOiBkZWZhdWx0RmFjZXRDZWxsQ29uZmlnXG59O1xuXG5leHBvcnQgZW51bSBGb250V2VpZ2h0IHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgQk9MRCA9ICdib2xkJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gU2hhcGUge1xuICAgIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnksXG4gICAgQ1JPU1MgPSAnY3Jvc3MnIGFzIGFueSxcbiAgICBESUFNT05EID0gJ2RpYW1vbmQnIGFzIGFueSxcbiAgICBUUklBTkdMRVVQID0gJ3RyaWFuZ2xlLXVwJyBhcyBhbnksXG4gICAgVFJJQU5HTEVET1dOID0gJ3RyaWFuZ2xlLWRvd24nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gT3JpZW50IHtcbiAgSE9SSVpPTlRBTCA9ICdob3Jpem9udGFsJyBhcyBhbnksXG4gIFZFUlRJQ0FMID0gJ3ZlcnRpY2FsJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gSG9yaXpvbnRhbEFsaWduIHtcbiAgICBMRUZUID0gJ2xlZnQnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gVmVydGljYWxBbGlnbiB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIE1JRERMRSA9ICdtaWRkbGUnIGFzIGFueSxcbiAgICBCT1RUT00gPSAnYm90dG9tJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEZvbnRTdHlsZSB7XG4gICAgTk9STUFMID0gJ25vcm1hbCcgYXMgYW55LFxuICAgIElUQUxJQyA9ICdpdGFsaWMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gSW50ZXJwb2xhdGUge1xuICAgIC8qKiBwaWVjZXdpc2UgbGluZWFyIHNlZ21lbnRzLCBhcyBpbiBhIHBvbHlsaW5lICovXG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIC8qKiBjbG9zZSB0aGUgbGluZWFyIHNlZ21lbnRzIHRvIGZvcm0gYSBwb2x5Z29uICovXG4gICAgTElORUFSX0NMT1NFRCA9ICdsaW5lYXItY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQID0gJ3N0ZXAnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gdmVydGljYWwgYW5kIGhvcml6b250YWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVBfQkVGT1JFID0gJ3N0ZXAtYmVmb3JlJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQX0FGVEVSID0gJ3N0ZXAtYWZ0ZXInIGFzIGFueSxcbiAgICAvKiogYSBCLXNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQkFTSVMgPSAnYmFzaXMnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBCLXNwbGluZTsgbWF5IG5vdCBpbnRlcnNlY3QgdGhlIHN0YXJ0IG9yIGVuZCAqL1xuICAgIEJBU0lTX09QRU4gPSAnYmFzaXMtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBCLXNwbGluZSwgYXMgaW4gYSBsb29wICovXG4gICAgQkFTSVNfQ0xPU0VEID0gJ2Jhc2lzLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBhIENhcmRpbmFsIHNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQ0FSRElOQUwgPSAnY2FyZGluYWwnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBDYXJkaW5hbCBzcGxpbmU7IG1heSBub3QgaW50ZXJzZWN0IHRoZSBzdGFydCBvciBlbmQsIGJ1dCB3aWxsIGludGVyc2VjdCBvdGhlciBjb250cm9sIHBvaW50cyAqL1xuICAgIENBUkRJTkFMX09QRU4gPSAnY2FyZGluYWwtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBDYXJkaW5hbCBzcGxpbmUsIGFzIGluIGEgbG9vcCAqL1xuICAgIENBUkRJTkFMX0NMT1NFRCA9ICdjYXJkaW5hbC1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogZXF1aXZhbGVudCB0byBiYXNpcywgZXhjZXB0IHRoZSB0ZW5zaW9uIHBhcmFtZXRlciBpcyB1c2VkIHRvIHN0cmFpZ2h0ZW4gdGhlIHNwbGluZSAqL1xuICAgIEJVTkRMRSA9ICdidW5kbGUnIGFzIGFueSxcbiAgICAvKiogY3ViaWMgaW50ZXJwb2xhdGlvbiB0aGF0IHByZXNlcnZlcyBtb25vdG9uaWNpdHkgaW4geSAqL1xuICAgIE1PTk9UT05FID0gJ21vbm90b25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEFyZWFPdmVybGF5IHtcbiAgTElORSA9ICdsaW5lJyBhcyBhbnksXG4gIExJTkVQT0lOVCA9ICdsaW5lcG9pbnQnIGFzIGFueSxcbiAgTk9ORSA9ICdub25lJyBhcyBhbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdmVybGF5Q29uZmlnIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gb3ZlcmxheSBsaW5lIHdpdGggcG9pbnQuXG4gICAqL1xuICBsaW5lPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHlwZSBvZiBvdmVybGF5IGZvciBhcmVhIG1hcmsgKGxpbmUgb3IgbGluZXBvaW50KVxuICAgKi9cbiAgYXJlYT86IEFyZWFPdmVybGF5O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHN0eWxlIGZvciB0aGUgb3ZlcmxheWVkIHBvaW50LlxuICAgKi9cbiAgcG9pbnRTdHlsZT86IE1hcmtDb25maWc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgc3R5bGUgZm9yIHRoZSBvdmVybGF5ZWQgcG9pbnQuXG4gICAqL1xuICBsaW5lU3R5bGU/OiBNYXJrQ29uZmlnO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE92ZXJsYXlDb25maWc6IE92ZXJsYXlDb25maWcgPSB7XG4gIGxpbmU6IGZhbHNlLFxuICBwb2ludFN0eWxlOiB7ZmlsbGVkOiB0cnVlfSxcbiAgbGluZVN0eWxlOiB7fVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIHtcblxuICAvLyAtLS0tLS0tLS0tIENvbG9yIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNoYXBlXFwncyBjb2xvciBzaG91bGQgYmUgdXNlZCBhcyBmaWxsIGNvbG9yIGluc3RlYWQgb2Ygc3Ryb2tlIGNvbG9yLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGljYWJsZSBmb3IgXCJiYXJcIiwgXCJwb2ludFwiLCBhbmQgXCJhcmVhXCIuXG4gICAqIEFsbCBtYXJrcyBleGNlcHQgXCJwb2ludFwiIG1hcmtzIGFyZSBmaWxsZWQgYnkgZGVmYXVsdC5cbiAgICogU2VlIE1hcmsgRG9jdW1lbnRhdGlvbiAoaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL21hcmtzLmh0bWwpXG4gICAqIGZvciB1c2FnZSBleGFtcGxlLlxuICAgKi9cbiAgZmlsbGVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmYXVsdCBjb2xvci5cbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgRmlsbCBDb2xvci4gIFRoaXMgaGFzIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gY29uZmlnLmNvbG9yXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGZpbGw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgU3Ryb2tlIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3BhY2l0eSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqIEBtYXhpbXVtIDFcbiAgICovXG4gIG9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFN0cm9rZSBTdHlsZSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKi9cbiAgc3Ryb2tlRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS5cbiAgICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBTdGFja2luZzogQmFyICYgQXJlYSAtLS0tLS0tLS0tXG4gIHN0YWNrZWQ/OiBTdGFja09mZnNldDtcblxuICAvLyAtLS0tLS0tLS0tIE9yaWVudGF0aW9uOiBCYXIsIFRpY2ssIExpbmUsIEFyZWEgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIGEgbm9uLXN0YWNrZWQgYmFyLCB0aWNrLCBhcmVhLCBhbmQgbGluZSBjaGFydHMuXG4gICAqIFRoZSB2YWx1ZSBpcyBlaXRoZXIgaG9yaXpvbnRhbCAoZGVmYXVsdCkgb3IgdmVydGljYWwuXG4gICAqIC0gRm9yIGJhciwgcnVsZSBhbmQgdGljaywgdGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNpemUgb2YgdGhlIGJhciBhbmQgdGlja1xuICAgKiBzaG91bGQgYmUgYXBwbGllZCB0byB4IG9yIHkgZGltZW5zaW9uLlxuICAgKiAtIEZvciBhcmVhLCB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG9yaWVudCBwcm9wZXJ0eSBvZiB0aGUgVmVnYSBvdXRwdXQuXG4gICAqIC0gRm9yIGxpbmUsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgc29ydCBvcmRlciBvZiB0aGUgcG9pbnRzIGluIHRoZSBsaW5lXG4gICAqIGlmIGBjb25maWcuc29ydExpbmVCeWAgaXMgbm90IHNwZWNpZmllZC5cbiAgICogRm9yIHN0YWNrZWQgY2hhcnRzLCB0aGlzIGlzIGFsd2F5cyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3RhY2s7XG4gICAqIHRoZXJlZm9yZSBleHBsaWNpdGx5IHNwZWNpZmllZCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gICAqL1xuICBvcmllbnQ/OiBPcmllbnQ7XG5cbiAgLy8gLS0tLS0tLS0tLSBJbnRlcnBvbGF0aW9uOiBMaW5lIC8gYXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgbGluZSBpbnRlcnBvbGF0aW9uIG1ldGhvZCB0byB1c2UuIE9uZSBvZiBsaW5lYXIsIHN0ZXAtYmVmb3JlLCBzdGVwLWFmdGVyLCBiYXNpcywgYmFzaXMtb3BlbiwgY2FyZGluYWwsIGNhcmRpbmFsLW9wZW4sIG1vbm90b25lLlxuICAgKi9cbiAgaW50ZXJwb2xhdGU/OiBJbnRlcnBvbGF0ZTtcbiAgLyoqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgaW50ZXJwb2xhdGlvbiB0eXBlLCBzZXRzIHRoZSB0ZW5zaW9uIHBhcmFtZXRlci5cbiAgICovXG4gIHRlbnNpb24/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBMaW5lIC0tLS0tLS0tLVxuICAvKipcbiAgICogU2l6ZSBvZiBsaW5lIG1hcmsuXG4gICAqL1xuICBsaW5lU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFJ1bGUgLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBTaXplIG9mIHJ1bGUgbWFyay5cbiAgICovXG4gIHJ1bGVTaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQmFyIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBiYXJzLiAgSWYgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHNpemUgaXMgIGBiYW5kU2l6ZS0xYCxcbiAgICogd2hpY2ggcHJvdmlkZXMgMSBwaXhlbCBvZmZzZXQgYmV0d2VlbiBiYXJzLlxuICAgKi9cbiAgYmFyU2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMgb24gY29udGludW91cyBzY2FsZXMuXG4gICAqL1xuICBiYXJUaGluU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFBvaW50IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wgc2hhcGUgdG8gdXNlLiBPbmUgb2YgY2lyY2xlIChkZWZhdWx0KSwgc3F1YXJlLCBjcm9zcywgZGlhbW9uZCwgdHJpYW5nbGUtdXAsIG9yIHRyaWFuZ2xlLWRvd24uXG4gICAqL1xuICBzaGFwZT86IFNoYXBlO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgU2l6ZSAoUG9pbnQgLyBTcXVhcmUgLyBDaXJjbGUpIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBwaXhlbCBhcmVhIGVhY2ggdGhlIHBvaW50LiBGb3IgZXhhbXBsZTogaW4gdGhlIGNhc2Ugb2YgY2lyY2xlcywgdGhlIHJhZGl1cyBpcyBkZXRlcm1pbmVkIGluIHBhcnQgYnkgdGhlIHNxdWFyZSByb290IG9mIHRoZSBzaXplIHZhbHVlLlxuICAgKi9cbiAgc2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2sgLS0tLS0tLS0tLVxuICAvKiogVGhlIHdpZHRoIG9mIHRoZSB0aWNrcy4gKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG5cbiAgLyoqIFRoaWNrbmVzcyBvZiB0aGUgdGljayBtYXJrLiAqL1xuICB0aWNrVGhpY2tuZXNzPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGV4dCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiBsZWZ0LCByaWdodCwgY2VudGVyLlxuICAgKi9cbiAgYWxpZ24/OiBIb3Jpem9udGFsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIHRleHQsIGluIGRlZ3JlZXMuXG4gICAqL1xuICBhbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiB0b3AsIG1pZGRsZSwgYm90dG9tLlxuICAgKi9cbiAgYmFzZWxpbmU/OiBWZXJ0aWNhbEFsaWduO1xuICAvKipcbiAgICogVGhlIGhvcml6b250YWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuXG4gICAqL1xuICBkeD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR5PzogbnVtYmVyO1xuICAvKipcbiAgICogUG9sYXIgY29vcmRpbmF0ZSByYWRpYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuXG4gICAqL1xuICByYWRpdXM/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgdGV4dCBsYWJlbCBmcm9tIHRoZSBvcmlnaW4gZGV0ZXJtaW5lZCBieSB0aGUgeCBhbmQgeSBwcm9wZXJ0aWVzLiBWYWx1ZXMgZm9yIHRoZXRhIGZvbGxvdyB0aGUgc2FtZSBjb252ZW50aW9uIG9mIGFyYyBtYXJrIHN0YXJ0QW5nbGUgYW5kIGVuZEFuZ2xlIHByb3BlcnRpZXM6IGFuZ2xlcyBhcmUgbWVhc3VyZWQgaW4gcmFkaWFucywgd2l0aCAwIGluZGljYXRpbmcgXCJub3J0aFwiLlxuICAgKi9cbiAgdGhldGE/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdHlwZWZhY2UgdG8gc2V0IHRoZSB0ZXh0IGluIChlLmcuLCBIZWx2ZXRpY2EgTmV1ZSkuXG4gICAqL1xuICBmb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzdHlsZSAoZS5nLiwgaXRhbGljKS5cbiAgICovXG4gIGZvbnRTdHlsZT86IEZvbnRTdHlsZTtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCAoZS5nLiwgYm9sZCkuXG4gICAqL1xuICBmb250V2VpZ2h0PzogRm9udFdlaWdodDtcbiAgLy8gVmVnYS1MaXRlIG9ubHkgZm9yIHRleHQgb25seVxuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgdGV4dCB2YWx1ZS4gSWYgbm90IGRlZmluZWQsIHRoaXMgd2lsbCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciBUZXh0XG4gICAqL1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcHBseSBjb2xvciBmaWVsZCB0byBiYWNrZ3JvdW5kIGNvbG9yIGluc3RlYWQgb2YgdGhlIHRleHQuXG4gICAqL1xuICBhcHBseUNvbG9yVG9CYWNrZ3JvdW5kPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRNYXJrQ29uZmlnOiBNYXJrQ29uZmlnID0ge1xuICBjb2xvcjogJyM0NjgyYjQnLFxuICBzaGFwZTogU2hhcGUuQ0lSQ0xFLFxuICBzdHJva2VXaWR0aDogMixcbiAgc2l6ZTogMzAsXG4gIGJhclRoaW5TaXplOiAyLFxuICAvLyBsaW5lU2l6ZSBpcyB1bmRlZmluZWQgYnkgZGVmYXVsdCwgYW5kIHJlZmVyIHRvIHZhbHVlIGZyb20gc3Ryb2tlV2lkdGhcbiAgcnVsZVNpemU6IDEsXG4gIHRpY2tUaGlja25lc3M6IDEsXG5cbiAgZm9udFNpemU6IDEwLFxuICBiYXNlbGluZTogVmVydGljYWxBbGlnbi5NSURETEUsXG4gIHRleHQ6ICdBYmMnLFxuXG4gIHNob3J0VGltZUxhYmVsczogZmFsc2UsXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ6IGZhbHNlXG59O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgLy8gVE9ETzogYWRkIHRoaXMgYmFjayBvbmNlIHdlIGhhdmUgdG9wLWRvd24gbGF5b3V0IGFwcHJvYWNoXG4gIC8vIHdpZHRoPzogbnVtYmVyO1xuICAvLyBoZWlnaHQ/OiBudW1iZXI7XG4gIC8vIHBhZGRpbmc/OiBudW1iZXJ8c3RyaW5nO1xuICAvKipcbiAgICogVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG9uLXNjcmVlbiB2aWV3cG9ydCwgaW4gcGl4ZWxzLiBJZiBuZWNlc3NhcnksIGNsaXBwaW5nIGFuZCBzY3JvbGxpbmcgd2lsbCBiZSBhcHBsaWVkLlxuICAgKi9cbiAgdmlld3BvcnQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDU1MgY29sb3IgcHJvcGVydHkgdG8gdXNlIGFzIGJhY2tncm91bmQgb2YgdmlzdWFsaXphdGlvbi4gRGVmYXVsdCBpcyBgXCJ0cmFuc3BhcmVudFwiYC5cbiAgICovXG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEQzIE51bWJlciBmb3JtYXQgZm9yIGF4aXMgbGFiZWxzIGFuZCB0ZXh0IHRhYmxlcy4gRm9yIGV4YW1wbGUgXCJzXCIgZm9yIFNJIHVuaXRzLlxuICAgKi9cbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLlxuICAgKi9cbiAgdGltZUZvcm1hdD86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBheGlzIGFuZCBsZWdlbmQgdGl0bGUgZm9yIGNvdW50IGZpZWxkcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGNvdW50VGl0bGU/OiBzdHJpbmc7XG5cbiAgLyoqIENlbGwgQ29uZmlnICovXG4gIGNlbGw/OiBDZWxsQ29uZmlnO1xuXG4gIC8qKiBNYXJrIENvbmZpZyAqL1xuICBtYXJrPzogTWFya0NvbmZpZztcblxuICAvKiogTWFyayBPdmVybGF5IENvbmZpZyAqL1xuICBvdmVybGF5PzogT3ZlcmxheUNvbmZpZztcblxuICAvKiogU2NhbGUgQ29uZmlnICovXG4gIHNjYWxlPzogU2NhbGVDb25maWc7XG5cbiAgLyoqIEF4aXMgQ29uZmlnICovXG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuXG4gIC8qKiBMZWdlbmQgQ29uZmlnICovXG4gIGxlZ2VuZD86IExlZ2VuZENvbmZpZztcblxuICAvKiogRmFjZXQgQ29uZmlnICovXG4gIGZhY2V0PzogRmFjZXRDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29uZmlnOiBDb25maWcgPSB7XG4gIG51bWJlckZvcm1hdDogJ3MnLFxuICB0aW1lRm9ybWF0OiAnJVktJW0tJWQnLFxuICBjb3VudFRpdGxlOiAnTnVtYmVyIG9mIFJlY29yZHMnLFxuXG4gIGNlbGw6IGRlZmF1bHRDZWxsQ29uZmlnLFxuICBtYXJrOiBkZWZhdWx0TWFya0NvbmZpZyxcbiAgb3ZlcmxheTogZGVmYXVsdE92ZXJsYXlDb25maWcsXG4gIHNjYWxlOiBkZWZhdWx0U2NhbGVDb25maWcsXG4gIGF4aXM6IGRlZmF1bHRBeGlzQ29uZmlnLFxuICBsZWdlbmQ6IGRlZmF1bHRMZWdlbmRDb25maWcsXG5cbiAgZmFjZXQ6IGRlZmF1bHRGYWNldENvbmZpZyxcbn07XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGRhdGEuXG4gKi9cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhRm9ybWF0IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgaW5wdXQgZGF0YTogYFwianNvblwiYCwgYFwiY3N2XCJgLCBgXCJ0c3ZcImAuXG4gICAqIFRoZSBkZWZhdWx0IGZvcm1hdCB0eXBlIGlzIGRldGVybWluZWQgYnkgdGhlIGV4dGVuc2lvbiBvZiB0aGUgZmlsZSB1cmwuXG4gICAqIElmIG5vIGV4dGVuc2lvbiBpcyBkZXRlY3RlZCwgYFwianNvblwiYCB3aWxsIGJlIHVzZWQgYnkgZGVmYXVsdC5cbiAgICovXG4gIHR5cGU/OiBEYXRhRm9ybWF0VHlwZTtcblxuICAvKipcbiAgICogSlNPTiBvbmx5KSBUaGUgSlNPTiBwcm9wZXJ0eSBjb250YWluaW5nIHRoZSBkZXNpcmVkIGRhdGEuXG4gICAqIFRoaXMgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHdoZW4gdGhlIGxvYWRlZCBKU09OIGZpbGUgbWF5IGhhdmUgc3Vycm91bmRpbmcgc3RydWN0dXJlIG9yIG1ldGEtZGF0YS5cbiAgICogRm9yIGV4YW1wbGUgYFwicHJvcGVydHlcIjogXCJ2YWx1ZXMuZmVhdHVyZXNcImAgaXMgZXF1aXZhbGVudCB0byByZXRyaWV2aW5nIGBqc29uLnZhbHVlcy5mZWF0dXJlc2BcbiAgICogZnJvbSB0aGUgbG9hZGVkIEpTT04gb2JqZWN0LlxuICAgKi9cbiAgcHJvcGVydHk/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBUb3BvSlNPTiBvYmplY3Qgc2V0IHRvIGNvbnZlcnQgdG8gYSBHZW9KU09OIGZlYXR1cmUgY29sbGVjdGlvbi5cbiAgICogRm9yIGV4YW1wbGUsIGluIGEgbWFwIG9mIHRoZSB3b3JsZCwgdGhlcmUgbWF5IGJlIGFuIG9iamVjdCBzZXQgbmFtZWQgYFwiY291bnRyaWVzXCJgLlxuICAgKiBVc2luZyB0aGUgZmVhdHVyZSBwcm9wZXJ0eSwgd2UgY2FuIGV4dHJhY3QgdGhpcyBzZXQgYW5kIGdlbmVyYXRlIGEgR2VvSlNPTiBmZWF0dXJlIG9iamVjdCBmb3IgZWFjaCBjb3VudHJ5LlxuICAgKi9cbiAgZmVhdHVyZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBUb3BvSlNPTiBvYmplY3Qgc2V0IHRvIGNvbnZlcnQgdG8gYSBtZXNoLlxuICAgKiBTaW1pbGFyIHRvIHRoZSBgZmVhdHVyZWAgb3B0aW9uLCBgbWVzaGAgZXh0cmFjdHMgYSBuYW1lZCBUb3BvSlNPTiBvYmplY3Qgc2V0LlxuICAgKiAgVW5saWtlIHRoZSBgZmVhdHVyZWAgb3B0aW9uLCB0aGUgY29ycmVzcG9uZGluZyBnZW8gZGF0YSBpcyByZXR1cm5lZCBhcyBhIHNpbmdsZSwgdW5pZmllZCBtZXNoIGluc3RhbmNlLCBub3QgYXMgaW5pZGl2aWR1YWwgR2VvSlNPTiBmZWF0dXJlcy5cbiAgICogRXh0cmFjdGluZyBhIG1lc2ggaXMgdXNlZnVsIGZvciBtb3JlIGVmZmljaWVudGx5IGRyYXdpbmcgYm9yZGVycyBvciBvdGhlciBnZW9ncmFwaGljIGVsZW1lbnRzIHRoYXQgeW91IGRvIG5vdCBuZWVkIHRvIGFzc29jaWF0ZSB3aXRoIHNwZWNpZmljIHJlZ2lvbnMgc3VjaCBhcyBpbmRpdmlkdWFsIGNvdW50cmllcywgc3RhdGVzIG9yIGNvdW50aWVzLlxuICAgKi9cbiAgbWVzaD86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRGF0YUZvcm1hdFR5cGUge1xuICAgIEpTT04gPSAnanNvbicgYXMgYW55LFxuICAgIENTViA9ICdjc3YnIGFzIGFueSxcbiAgICBUU1YgPSAndHN2JyBhcyBhbnksXG4gICAgVE9QT0pTT04gPSAndG9wb2pzb24nIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICAvKipcbiAgICogQW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIHRoZSBmb3JtYXQgZm9yIHRoZSBkYXRhIGZpbGUgb3IgdmFsdWVzLlxuICAgKi9cbiAgZm9ybWF0PzogRGF0YUZvcm1hdDtcblxuICAvKipcbiAgICogQSBVUkwgZnJvbSB3aGljaCB0byBsb2FkIHRoZSBkYXRhIHNldC4gVXNlIHRoZSBmb3JtYXQudHlwZSBwcm9wZXJ0eVxuICAgKiB0byBlbnN1cmUgdGhlIGxvYWRlZCBkYXRhIGlzIGNvcnJlY3RseSBwYXJzZWQuXG4gICAqL1xuICB1cmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQYXNzIGFycmF5IG9mIG9iamVjdHMgaW5zdGVhZCBvZiBhIHVybCB0byBhIGZpbGUuXG4gICAqL1xuICB2YWx1ZXM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGVudW0gRGF0YVRhYmxlIHtcbiAgU09VUkNFID0gJ3NvdXJjZScgYXMgYW55LFxuICBTVU1NQVJZID0gJ3N1bW1hcnknIGFzIGFueSxcbiAgU1RBQ0tFRF9TQ0FMRSA9ICdzdGFja2VkX3NjYWxlJyBhcyBhbnksXG4gIExBWU9VVCA9ICdsYXlvdXQnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgU1VNTUFSWSA9IERhdGFUYWJsZS5TVU1NQVJZO1xuZXhwb3J0IGNvbnN0IFNPVVJDRSA9IERhdGFUYWJsZS5TT1VSQ0U7XG5leHBvcnQgY29uc3QgU1RBQ0tFRF9TQ0FMRSA9IERhdGFUYWJsZS5TVEFDS0VEX1NDQUxFO1xuZXhwb3J0IGNvbnN0IExBWU9VVCA9IERhdGFUYWJsZS5MQVlPVVQ7XG5cbi8qKiBNYXBwaW5nIGZyb20gZGF0YWxpYidzIGluZmVycmVkIHR5cGUgdG8gVmVnYS1saXRlJ3MgdHlwZSAqL1xuLy8gVE9ETzogY29uc2lkZXIgaWYgd2UgY2FuIHJlbW92ZVxuZXhwb3J0IGNvbnN0IHR5cGVzID0ge1xuICAnYm9vbGVhbic6IFR5cGUuTk9NSU5BTCxcbiAgJ251bWJlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnaW50ZWdlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnZGF0ZSc6IFR5cGUuVEVNUE9SQUwsXG4gICdzdHJpbmcnOiBUeXBlLk5PTUlOQUxcbn07XG4iLCIvLyBEYXRlVGltZSBkZWZpbml0aW9uIG9iamVjdFxuXG5pbXBvcnQge2R1cGxpY2F0ZSwgaXNOdW1iZXJ9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogT2JqZWN0IGZvciBkZWZpbmluZyBkYXRldGltZSBpbiBWZWdhLUxpdGUgRmlsdGVyLlxuICogSWYgYm90aCBtb250aCBhbmQgcXVhcnRlciBhcmUgcHJvdmlkZWQsIG1vbnRoIGhhcyBoaWdoZXIgcHJlY2VkZW5jZS5cbiAqIGBkYXlgIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIG90aGVyIGRhdGUuXG4gKiBXZSBhY2NlcHQgc3RyaW5nIGZvciBtb250aCBhbmQgZGF5IG5hbWVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lIHtcbiAgLyoqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSB5ZWFyLiAqL1xuICB5ZWFyPzogbnVtYmVyO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgcXVhcnRlciBvZiB0aGUgeWVhciAoZnJvbSAxLTQpLiAqL1xuICBxdWFydGVyPzogbnVtYmVyO1xuXG4gIC8qKiBPbmUgb2Y6ICgxKSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgbW9udGggZnJvbSBgMWAtYDEyYC4gYDFgIHJlcHJlc2VudHMgSmFudWFyeTsgICgyKSBjYXNlLWluc2Vuc2l0aXZlIG1vbnRoIG5hbWUgKGUuZy4sIGBcIkphbnVhcnlcImApOyAgKDMpIGNhc2UtaW5zZW5zaXRpdmUsIDMtY2hhcmFjdGVyIHNob3J0IG1vbnRoIG5hbWUgKGUuZy4sIGBcIkphblwiYCkuICovXG4gIG1vbnRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgZGF0ZSBmcm9tIDEtMzEuICovXG4gIGRhdGU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFZhbHVlIHJlcHJlc2VudGluZyB0aGUgZGF5IG9mIHdlZWsuICBUaGlzIGNhbiBiZSBvbmUgb2Y6ICgxKSBpbnRlZ2VyIHZhbHVlIC0tIGAxYCByZXByZXNlbnRzIE1vbmRheTsgKDIpIGNhc2UtaW5zZW5zaXRpdmUgZGF5IG5hbWUgKGUuZy4sIGBcIk1vbmRheVwiYCk7ICAoMykgY2FzZS1pbnNlbnNpdGl2ZSwgMy1jaGFyYWN0ZXIgc2hvcnQgZGF5IG5hbWUgKGUuZy4sIGBcIk1vblwiYCkuICAgPGJyLz4gKipXYXJuaW5nOioqIEEgRGF0ZVRpbWUgZGVmaW5pdGlvbiBvYmplY3Qgd2l0aCBgZGF5YCoqIHNob3VsZCBub3QgYmUgY29tYmluZWQgd2l0aCBgeWVhcmAsIGBxdWFydGVyYCwgYG1vbnRoYCwgb3IgYGRhdGVgLlxuICAgKi9cbiAgZGF5PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgaG91ciBvZiBkYXkgZnJvbSAwLTIzLiAqL1xuICBob3Vycz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgbWludXRlIHNlZ21lbnQgb2YgYSB0aW1lIGZyb20gMC01OS4gKi9cbiAgbWludXRlcz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgc2Vjb25kIHNlZ21lbnQgb2YgYSB0aW1lIGZyb20gMC01OS4gKi9cbiAgc2Vjb25kcz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgbWlsbGlzZWNvbmQgc2VnbWVudCBvZiBhIHRpbWUuICovXG4gIG1pbGxpc2Vjb25kcz86IG51bWJlcjtcbn1cblxuXG4vKipcbiAqIEludGVybmFsIE9iamVjdCBmb3IgZGVmaW5pbmcgZGF0ZXRpbWUgZXhwcmVzc2lvbnMuXG4gKiBUaGlzIGlzIGFuIGV4cHJlc3Npb24gdmVyc2lvbiBvZiBEYXRlVGltZS5cbiAqIElmIGJvdGggbW9udGggYW5kIHF1YXJ0ZXIgYXJlIHByb3ZpZGVkLCBtb250aCBoYXMgaGlnaGVyIHByZWNlZGVuY2UuXG4gKiBgZGF5YCBjYW5ub3QgYmUgY29tYmluZWQgd2l0aCBvdGhlciBkYXRlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lRXhwciB7XG4gIHllYXI/OiBzdHJpbmc7XG4gIHF1YXJ0ZXI/OiBzdHJpbmc7XG4gIG1vbnRoPzogc3RyaW5nO1xuICBkYXRlPzogc3RyaW5nO1xuICBkYXk/OiBzdHJpbmc7XG4gIGhvdXJzPzogc3RyaW5nO1xuICBtaW51dGVzPzogc3RyaW5nO1xuICBzZWNvbmRzPzogc3RyaW5nO1xuICBtaWxsaXNlY29uZHM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVUaW1lKG86IGFueSk6IG8gaXMgRGF0ZVRpbWUge1xuICByZXR1cm4gISFvLnllYXIgfHwgISFvLnF1YXJ0ZXIgfHwgISFvLm1vbnRoIHx8ICEhby5kYXRlIHx8ICEhby5kYXkgfHxcbiAgICAhIW8uaG91cnMgfHwgISFvLm1pbnV0ZXMgfHwgISFvLnNlY29uZHMgfHwgISFvLm1pbGxpc2Vjb25kcztcbn1cblxuZXhwb3J0IGNvbnN0IE1PTlRIUyA9IFsnamFudWFyeScsICdmZWJydWFyeScsICdtYXJjaCcsICdhcHJpbCcsICdtYXknLCAnanVuZScsICdqdWx5JywgJ2F1Z3VzdCcsICdzZXB0ZW1iZXInLCAnb2N0b2JlcicsICdub3ZlbWJlcicsICdkZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0IFNIT1JUX01PTlRIUyA9IE1PTlRIUy5tYXAoKG0pID0+IG0uc3Vic3RyKDAsIDMpKTtcblxuZXhwb3J0IGNvbnN0IERBWVMgPSBbJ3N1bmRheScsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5J107XG5leHBvcnQgY29uc3QgU0hPUlRfREFZUyA9IERBWVMubWFwKChkKSA9PiBkLnN1YnN0cigwLDMpKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplUXVhcnRlcihxOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgaWYgKGlzTnVtYmVyKHEpKSB7XG4gICAgLy8gV2UgYWNjZXB0IDEtYmFzZWQgcXVhcnRlciwgc28gbmVlZCB0byByZWFkanVzdCB0byAwLWJhc2VkIHF1YXJ0ZXJcbiAgICByZXR1cm4gKHEgLSAxKSArICcnO1xuICB9IGVsc2Uge1xuICAgIC8vIFNpbXBseSBhbiBleHByZXNzaW9uIHN0cmluZywgYnV0IG5vcm1hbGl6ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiB0aGlzIGNhc2UuXG4gICAgY29uc29sZS53YXJuKCdQb3RlbnRpYWxseSBpbnZhbGlkIHF1YXJ0ZXInLCBxKTtcbiAgICByZXR1cm4gcTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb250aChtOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKGlzTnVtYmVyKG0pKSB7XG4gICAgLy8gV2UgYWNjZXB0IDEtYmFzZWQgbW9udGgsIHNvIG5lZWQgdG8gcmVhZGp1c3QgdG8gMC1iYXNlZCBtb250aFxuICAgIHJldHVybiAobSAtIDEpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG93ZXJNID0gbS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IG1vbnRoSW5kZXggPSBNT05USFMuaW5kZXhPZihsb3dlck0pO1xuICAgIGlmIChtb250aEluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1vbnRoSW5kZXggKyAnJzsgLy8gMCBmb3IgamFudWFyeSwgLi4uXG4gICAgfVxuICAgIGNvbnN0IHNob3J0TSA9IGxvd2VyTS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3Qgc2hvcnRNb250aEluZGV4ID0gU0hPUlRfTU9OVEhTLmluZGV4T2Yoc2hvcnRNKTtcbiAgICBpZiAoc2hvcnRNb250aEluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHNob3J0TW9udGhJbmRleCArICcnO1xuICAgIH1cbiAgICAvLyBTaW1wbHkgYW4gZXhwcmVzc2lvbiBzdHJpbmcsIGJ1dCBub3JtYWxpemUgc2hvdWxkIG5vdCBiZSBjYWxsZWQgaW4gdGhpcyBjYXNlLlxuICAgIGNvbnNvbGUud2FybignUG90ZW50aWFsbHkgaW52YWxpZCBtb250aCcsIG0pO1xuICAgIHJldHVybiBtO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURheShkOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKGlzTnVtYmVyKGQpKSB7XG4gICAgLy8gbW9kIHNvIHRoYXQgdGhpcyBjYW4gYmUgYm90aCAwLWJhc2VkIHdoZXJlIDAgPSBzdW5kYXlcbiAgICAvLyBhbmQgMS1iYXNlZCB3aGVyZSA3PXN1bmRheVxuICAgIHJldHVybiAoZCAlIDcpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG93ZXJEID0gZC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRheUluZGV4ID0gREFZUy5pbmRleE9mKGxvd2VyRCk7XG4gICAgaWYgKGRheUluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGRheUluZGV4ICsgJyc7IC8vIDAgZm9yIGphbnVhcnksIC4uLlxuICAgIH1cbiAgICBjb25zdCBzaG9ydEQgPSBsb3dlckQuc3Vic3RyKDAsIDMpO1xuICAgIGNvbnN0IHNob3J0RGF5SW5kZXggPSBTSE9SVF9EQVlTLmluZGV4T2Yoc2hvcnREKTtcbiAgICBpZiAoc2hvcnREYXlJbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBzaG9ydERheUluZGV4ICsgJyc7XG4gICAgfVxuICAgIC8vIFNpbXBseSBhbiBleHByZXNzaW9uIHN0cmluZywgYnV0IG5vcm1hbGl6ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiB0aGlzIGNhc2UuXG4gICAgY29uc29sZS53YXJuKCdQb3RlbnRpYWxseSBpbnZhbGlkIGRheScsIGQpO1xuICAgIHJldHVybiBkO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIFZlZ2EgRXhwcmVzc2lvbiBmb3IgYSBwYXJ0aWN1bGFyIGRhdGUgdGltZS5cbiAqIEBwYXJhbSBkXG4gKiBAcGFyYW0gbm9ybWFsaXplIHdoZXRoZXIgdG8gbm9ybWFsaXplIHF1YXJ0ZXIsIG1vbnRoLCBkYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRlVGltZUV4cHIoZDogRGF0ZVRpbWUgfCBEYXRlVGltZUV4cHIsIG5vcm1hbGl6ZSA9IGZhbHNlKSB7XG4gIGNvbnN0IHVuaXRzID0gW107XG5cbiAgaWYgKG5vcm1hbGl6ZSAmJiBkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdW5pdCBvZiBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICdkYXRlJ10pIHtcbiAgICAgIGlmIChkW3VuaXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEcm9wcGluZyBkYXkgZnJvbSBkYXRldGltZScsIEpTT04uc3RyaW5naWZ5KGQpLFxuICAgICAgICAgICdhcyBkYXkgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGgnLCB1bml0KTtcbiAgICAgICAgZCA9IGR1cGxpY2F0ZShkKTtcbiAgICAgICAgZGVsZXRlIGQuZGF5O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZC55ZWFyICE9PSB1bmRlZmluZWQpIHtcbiAgICB1bml0cy5wdXNoKGQueWVhcik7XG4gIH0gZWxzZSBpZiAoZC5kYXkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFNldCB5ZWFyIHRvIDIwMDYgZm9yIHdvcmtpbmcgd2l0aCBkYXkgc2luY2UgSmFudWFyeSAxIDIwMDYgaXMgYSBTdW5kYXlcbiAgICB1bml0cy5wdXNoKDIwMDYpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7XG4gIH1cblxuICBpZiAoZC5tb250aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbW9udGggPSBub3JtYWxpemUgPyBub3JtYWxpemVNb250aChkLm1vbnRoKSA6IGQubW9udGg7XG4gICAgdW5pdHMucHVzaChtb250aCk7XG4gIH0gZWxzZSBpZiAoZC5xdWFydGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBxdWFydGVyID0gbm9ybWFsaXplID8gbm9ybWFsaXplUXVhcnRlcihkLnF1YXJ0ZXIpIDogZC5xdWFydGVyO1xuICAgIHVuaXRzLnB1c2gocXVhcnRlciArICcqMycpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7IC8vIG1vbnRocyBzdGFydCBhdCB6ZXJvIGluIEpTXG4gIH1cblxuICBpZiAoZC5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1bml0cy5wdXNoKGQuZGF0ZSk7XG4gIH0gZWxzZSBpZiAoZC5kYXkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEhBQ0s6IERheSBvbmx5IHdvcmtzIGFzIGEgc3RhbmRhbG9uZSB1bml0XG4gICAgLy8gVGhpcyBpcyBvbmx5IGNvcnJlY3QgYmVjYXVzZSB3ZSBhbHdheXMgc2V0IHllYXIgdG8gMjAwNiBmb3IgZGF5XG4gICAgY29uc3QgZGF5ID0gbm9ybWFsaXplID8gbm9ybWFsaXplRGF5KGQuZGF5KSA6IGQuZGF5O1xuICAgIHVuaXRzLnB1c2goZGF5ICsgJysxJyk7XG4gIH0gZWxzZSB7XG4gICAgdW5pdHMucHVzaCgxKTsgLy8gRGF0ZSBzdGFydHMgYXQgMSBpbiBKU1xuICB9XG5cbiAgLy8gTm90ZTogY2FuJ3QgdXNlIFRpbWVVbml0IGVudW0gaGVyZSBhcyBpbXBvcnRpbmcgaXQgd2lsbCBjcmVhdGVcbiAgLy8gY2lyY3VsYXIgZGVwZW5kZW5jeSBwcm9ibGVtIVxuICBmb3IgKGxldCB0aW1lVW5pdCBvZiBbJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcycsICdtaWxsaXNlY29uZHMnXSkge1xuICAgIGlmIChkW3RpbWVVbml0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB1bml0cy5wdXNoKGRbdGltZVVuaXRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdW5pdHMucHVzaCgwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJ2RhdGV0aW1lKCcgKyB1bml0cy5qb2luKCcsICcpICsgJyknO1xufVxuIiwiLy8gdXRpbGl0eSBmb3IgZW5jb2RpbmcgbWFwcGluZ1xuaW1wb3J0IHtGaWVsZERlZiwgUG9zaXRpb25DaGFubmVsRGVmLCBGYWNldENoYW5uZWxEZWYsIENoYW5uZWxEZWZXaXRoTGVnZW5kLCBPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtDaGFubmVsLCBDSEFOTkVMU30gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7aXNBcnJheSwgc29tZX0gZnJvbSAnLi91dGlsJztcblxuLy8gVE9ETzogb25jZSB3ZSBkZWNvbXBvc2UgZmFjZXQsIHJlbmFtZSB0aGlzIHRvIEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBYIGNvb3JkaW5hdGVzIGZvciBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsXG4gICAqIGBsaW5lYCwgYHJ1bGVgLCBgdGV4dGAsIGFuZCBgdGlja2BcbiAgICogKG9yIHRvIHdpZHRoIGFuZCBoZWlnaHQgZm9yIGBiYXJgIGFuZCBgYXJlYWAgbWFya3MpLlxuICAgKi9cbiAgeD86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWSBjb29yZGluYXRlcyBmb3IgYHBvaW50YCwgYGNpcmNsZWAsIGBzcXVhcmVgLFxuICAgKiBgbGluZWAsIGBydWxlYCwgYHRleHRgLCBhbmQgYHRpY2tgXG4gICAqIChvciB0byB3aWR0aCBhbmQgaGVpZ2h0IGZvciBgYmFyYCBhbmQgYGFyZWFgIG1hcmtzKS5cbiAgICovXG4gIHk/OiBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIFgyIGNvb3JkaW5hdGVzIGZvciByYW5nZWQgYGJhcmAsIGBydWxlYCwgYGFyZWFgXG4gICAqL1xuICB4Mj86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWTIgY29vcmRpbmF0ZXMgZm9yIHJhbmdlZCBgYmFyYCwgYHJ1bGVgLCBgYXJlYWBcbiAgICovXG4gIHkyPzogUG9zaXRpb25DaGFubmVsRGVmO1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgbWFya3Mg4oCTIGVpdGhlciBmaWxsIG9yIHN0cm9rZSBjb2xvciBiYXNlZCBvbiBtYXJrIHR5cGUuXG4gICAqIChCeSBkZWZhdWx0LCBmaWxsIGNvbG9yIGZvciBgYXJlYWAsIGBiYXJgLCBgdGlja2AsIGB0ZXh0YCwgYGNpcmNsZWAsIGFuZCBgc3F1YXJlYCAvXG4gICAqIHN0cm9rZSBjb2xvciBmb3IgYGxpbmVgIGFuZCBgcG9pbnRgLilcbiAgICovXG4gIGNvbG9yPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG4gIC8qKlxuICAgKiBPcGFjaXR5IG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGNhbiBiZSBhIHZhbHVlIG9yIGluIGEgcmFuZ2UuXG4gICAqL1xuICBvcGFjaXR5PzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIG1hcmsuXG4gICAqIC0gRm9yIGBwb2ludGAsIGBzcXVhcmVgIGFuZCBgY2lyY2xlYFxuICAgKiDigJMgdGhlIHN5bWJvbCBzaXplLCBvciBwaXhlbCBhcmVhIG9mIHRoZSBtYXJrLlxuICAgKiAtIEZvciBgYmFyYCBhbmQgYHRpY2tgIOKAkyB0aGUgYmFyIGFuZCB0aWNrJ3Mgc2l6ZS5cbiAgICogLSBGb3IgYHRleHRgIOKAkyB0aGUgdGV4dCdzIGZvbnQgc2l6ZS5cbiAgICogLSBTaXplIGlzIGN1cnJlbnRseSB1bnN1cHBvcnRlZCBmb3IgYGxpbmVgIGFuZCBgYXJlYWAuXG4gICAqL1xuICBzaXplPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wncyBzaGFwZSAob25seSBmb3IgYHBvaW50YCBtYXJrcykuIFRoZSBzdXBwb3J0ZWQgdmFsdWVzIGFyZVxuICAgKiBgXCJjaXJjbGVcImAgKGRlZmF1bHQpLCBgXCJzcXVhcmVcImAsIGBcImNyb3NzXCJgLCBgXCJkaWFtb25kXCJgLCBgXCJ0cmlhbmdsZS11cFwiYCxcbiAgICogb3IgYFwidHJpYW5nbGUtZG93blwiYC5cbiAgICovXG4gIHNoYXBlPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7IC8vIFRPRE86IG1heWJlIGRpc3Rpbmd1aXNoIG9yZGluYWwtb25seVxuXG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGxldmVscyBvZiBkZXRhaWwgZm9yIGdyb3VwaW5nIGRhdGEgaW4gYWdncmVnYXRlIHZpZXdzIGFuZFxuICAgKiBpbiBsaW5lIGFuZCBhcmVhIG1hcmtzIHdpdGhvdXQgbWFwcGluZyBkYXRhIHRvIGEgc3BlY2lmaWMgdmlzdWFsIGNoYW5uZWwuXG4gICAqL1xuICBkZXRhaWw/OiBGaWVsZERlZiB8IEZpZWxkRGVmW107XG5cbiAgLyoqXG4gICAqIFRleHQgb2YgdGhlIGB0ZXh0YCBtYXJrLlxuICAgKi9cbiAgdGV4dD86IEZpZWxkRGVmO1xuXG4gIGxhYmVsPzogRmllbGREZWY7XG5cbiAgLyoqXG4gICAqIE9yZGVyIG9mIGRhdGEgcG9pbnRzIGluIGxpbmUgbWFya3MuXG4gICAqL1xuICBwYXRoPzogT3JkZXJDaGFubmVsRGVmIHwgT3JkZXJDaGFubmVsRGVmW107XG5cbiAgLyoqXG4gICAqIExheWVyIG9yZGVyIGZvciBub24tc3RhY2tlZCBtYXJrcywgb3Igc3RhY2sgb3JkZXIgZm9yIHN0YWNrZWQgbWFya3MuXG4gICAqL1xuICBvcmRlcj86IE9yZGVyQ2hhbm5lbERlZiB8IE9yZGVyQ2hhbm5lbERlZltdO1xufVxuXG4vLyBUT0RPOiBvbmNlIHdlIGRlY29tcG9zZSBmYWNldCwgcmVuYW1lIHRoaXMgdG8gRXh0ZW5kZWRFbmNvZGluZ1xuZXhwb3J0IGludGVyZmFjZSBFbmNvZGluZyBleHRlbmRzIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBWZXJ0aWNhbCBmYWNldHMgZm9yIHRyZWxsaXMgcGxvdHMuXG4gICAqL1xuICByb3c/OiBGYWNldENoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgZmFjZXRzIGZvciB0cmVsbGlzIHBsb3RzLlxuICAgKi9cbiAgY29sdW1uPzogRmFjZXRDaGFubmVsRGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY291bnRSZXRpbmFsKGVuY29kaW5nOiBFbmNvZGluZykge1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZW5jb2RpbmcuY29sb3IpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcub3BhY2l0eSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaXplKSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLnNoYXBlKSB7IGNvdW50Kys7IH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbHMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIHJldHVybiBDSEFOTkVMUy5maWx0ZXIoZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBoYXMoZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9KTtcbn1cblxuLy8gVE9EOiByZW5hbWUgdGhpcyB0byBoYXNDaGFubmVsRmllbGQgYW5kIG9ubHkgdXNlIHdlIHJlYWxseSB3YW50IGl0LlxuZXhwb3J0IGZ1bmN0aW9uIGhhcyhlbmNvZGluZzogRW5jb2RpbmcsIGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgY29uc3QgY2hhbm5lbEVuY29kaW5nID0gZW5jb2RpbmcgJiYgZW5jb2RpbmdbY2hhbm5lbF07XG4gIHJldHVybiBjaGFubmVsRW5jb2RpbmcgJiYgKFxuICAgIGNoYW5uZWxFbmNvZGluZy5maWVsZCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gVE9ETzogY2hlY2sgdGhhdCB3ZSBoYXZlIGZpZWxkIGluIHRoZSBhcnJheVxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIHNvbWUoQ0hBTk5FTFMsIChjaGFubmVsKSA9PiB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkgJiYgZW5jb2RpbmdbY2hhbm5lbF0uYWdncmVnYXRlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VkKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gZW5jb2RpbmcgJiYgKCghIWVuY29kaW5nLnggJiYgISFlbmNvZGluZy54MikgfHwgKCEhZW5jb2RpbmcueSAmJiAhIWVuY29kaW5nLnkyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nKTogRmllbGREZWZbXSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZmllbGREZWYpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGNoYW5uZWxNYXBwaW5nRm9yRWFjaChDSEFOTkVMUywgZW5jb2RpbmcsIGYsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdGb3JFYWNoKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgaSA9IDA7XG4gIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsLCBpKyspO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGYuY2FsbCh0aGlzQXJnLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBpKyspO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nTWFwKENIQU5ORUxTLCBlbmNvZGluZywgZiAsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdNYXAoY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IGFyciA9IFtdO1xuICBjaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICByZXR1cm4gY2hhbm5lbE1hcHBpbmdSZWR1Y2UoQ0hBTk5FTFMsIGVuY29kaW5nLCBmLCBpbml0LCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nUmVkdWNlKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgciA9IGluaXQ7XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBmaWVsZERlZiwgY2hhbm5lbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcjtcbn1cbiIsIi8vIHV0aWxpdHkgZm9yIGEgZmllbGQgZGVmaW5pdGlvbiBvYmplY3RcblxuaW1wb3J0IHtBZ2dyZWdhdGVPcCwgQUdHUkVHQVRFX09QU30gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtBeGlzfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtCaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7U29ydEZpZWxkLCBTb3J0T3JkZXJ9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7VHlwZSwgTk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGdldGJpbnMsIHRvTWFwfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqICBJbnRlcmZhY2UgZm9yIGFueSBraW5kIG9mIEZpZWxkRGVmO1xuICogIEZvciBzaW1wbGljaXR5LCB3ZSBkbyBub3QgZGVjbGFyZSBtdWx0aXBsZSBpbnRlcmZhY2VzIG9mIEZpZWxkRGVmIGxpa2VcbiAqICB3ZSBkbyBmb3IgSlNPTiBzY2hlbWEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGREZWYge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZmllbGQgZnJvbSB3aGljaCB0byBwdWxsIGEgZGF0YSB2YWx1ZS5cbiAgICovXG4gIGZpZWxkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RlZCBmaWVsZCdzIHR5cGUgb2YgbWVhc3VyZW1lbnQuIFRoaXMgY2FuIGJlIGVpdGhlciBhIGZ1bGwgdHlwZVxuICAgKiBuYW1lIChgXCJxdWFudGl0YXRpdmVcImAsIGBcInRlbXBvcmFsXCJgLCBgXCJvcmRpbmFsXCJgLCAgYW5kIGBcIm5vbWluYWxcImApXG4gICAqIG9yIGFuIGluaXRpYWwgY2hhcmFjdGVyIG9mIHRoZSB0eXBlIG5hbWUgKGBcIlFcImAsIGBcIlRcImAsIGBcIk9cImAsIGBcIk5cImApLlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGNhc2UgaW5zZW5zaXRpdmUuXG4gICAqL1xuICB0eXBlPzogVHlwZTtcblxuICAvKipcbiAgICogQSBjb25zdGFudCB2YWx1ZSBpbiB2aXN1YWwgZG9tYWluLlxuICAgKi9cbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuO1xuXG4gIC8vIGZ1bmN0aW9uXG5cbiAgLyoqXG4gICAqIFRpbWUgdW5pdCBmb3IgYSBgdGVtcG9yYWxgIGZpZWxkICAoZS5nLiwgYHllYXJgLCBgeWVhcm1vbnRoYCwgYG1vbnRoYCwgYGhvdXJgKS5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgZm9yIGJpbm5pbmcgYSBgcXVhbnRpdGF0aXZlYCBmaWVsZCwgb3IgYSBiaW4gcHJvcGVydHkgb2JqZWN0XG4gICAqIGZvciBiaW5uaW5nIHBhcmFtZXRlcnMuXG4gICAqL1xuICBiaW4/OiBib29sZWFuIHwgQmluO1xuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGZpZWxkXG4gICAqIChlLmcuLCBgbWVhbmAsIGBzdW1gLCBgbWVkaWFuYCwgYG1pbmAsIGBtYXhgLCBgY291bnRgKS5cbiAgICovXG4gIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0ZU9wO1xuXG4gIC8qKlxuICAgKiBUaXRsZSBmb3IgYXhpcyBvciBsZWdlbmQuXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGFnZ3JlZ2F0ZSA9IHtcbiAgdHlwZTogJ3N0cmluZycsXG4gIGVudW06IEFHR1JFR0FURV9PUFMsXG4gIHN1cHBvcnRlZEVudW1zOiB7XG4gICAgcXVhbnRpdGF0aXZlOiBBR0dSRUdBVEVfT1BTLFxuICAgIG9yZGluYWw6IFsnbWVkaWFuJywnbWluJywnbWF4J10sXG4gICAgbm9taW5hbDogW10sXG4gICAgdGVtcG9yYWw6IFsnbWVhbicsICdtZWRpYW4nLCAnbWluJywgJ21heCddLCAvLyBUT0RPOiByZXZpc2Ugd2hhdCBzaG91bGQgdGltZSBzdXBwb3J0XG4gICAgJyc6IFsnY291bnQnXVxuICB9LFxuICBzdXBwb3J0ZWRUeXBlczogdG9NYXAoW1FVQU5USVRBVElWRSwgTk9NSU5BTCwgT1JESU5BTCwgVEVNUE9SQUwsICcnXSlcbn07XG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWxEZWZXaXRoU2NhbGUgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNjYWxlPzogU2NhbGU7XG4gIHNvcnQ/OiBTb3J0RmllbGQgfCBTb3J0T3JkZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25DaGFubmVsRGVmIGV4dGVuZHMgQ2hhbm5lbERlZldpdGhTY2FsZSB7XG4gIGF4aXM/OiBib29sZWFuIHwgQXhpcztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhMZWdlbmQgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgbGVnZW5kPzogTGVnZW5kO1xufVxuXG4vLyBEZXRhaWxcblxuLy8gT3JkZXIgUGF0aCBoYXZlIG5vIHNjYWxlXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JkZXJDaGFubmVsRGVmIGV4dGVuZHMgRmllbGREZWYge1xuICBzb3J0PzogU29ydE9yZGVyO1xufVxuXG4vLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHRvIGRpc3Rpbmd1aXNoIG9yZGluYWxPbmx5U2NhbGUgZnJvbSBzY2FsZVxuZXhwb3J0IHR5cGUgRmFjZXRDaGFubmVsRGVmID0gUG9zaXRpb25DaGFubmVsRGVmO1xuXG5cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlZk9wdGlvbiB7XG4gIC8qKiBleGNsdWRlIGJpbiwgYWdncmVnYXRlLCB0aW1lVW5pdCAqL1xuICBub2ZuPzogYm9vbGVhbjtcbiAgLyoqIGV4Y2x1ZGUgYWdncmVnYXRpb24gZnVuY3Rpb24gKi9cbiAgbm9BZ2dyZWdhdGU/OiBib29sZWFuO1xuICAvKiogaW5jbHVkZSAnZGF0dW0uJyAqL1xuICBkYXR1bT86IGJvb2xlYW47XG4gIC8qKiByZXBsYWNlIGZuIHdpdGggY3VzdG9tIGZ1bmN0aW9uIHByZWZpeCAqL1xuICBmbj86IHN0cmluZztcbiAgLyoqIHByZXBlbmQgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIHByZWZuPzogc3RyaW5nO1xuICAvKiogc2NhbGVUeXBlICovXG4gIHNjYWxlVHlwZT86IFNjYWxlVHlwZTtcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiBmb3IgYmluIChkZWZhdWx0PSdfc3RhcnQnKSAqL1xuICBiaW5TdWZmaXg/OiBzdHJpbmc7XG4gIC8qKiBhcHBlbmQgc3VmZml4IHRvIHRoZSBmaWVsZCByZWYgKGdlbmVyYWwpICovXG4gIHN1ZmZpeD86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkKGZpZWxkRGVmOiBGaWVsZERlZiwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gIGNvbnN0IHByZWZpeCA9IChvcHQuZGF0dW0gPyAnZGF0dW0uJyA6ICcnKSArIChvcHQucHJlZm4gfHwgJycpO1xuICBjb25zdCBzdWZmaXggPSBvcHQuc3VmZml4IHx8ICcnO1xuICBjb25zdCBmaWVsZCA9IGZpZWxkRGVmLmZpZWxkO1xuXG4gIGlmIChpc0NvdW50KGZpZWxkRGVmKSkge1xuICAgIHJldHVybiBwcmVmaXggKyAnY291bnQnICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKG9wdC5mbikge1xuICAgIHJldHVybiBwcmVmaXggKyBvcHQuZm4gKyAnXycgKyBmaWVsZCArIHN1ZmZpeDtcbiAgfSBlbHNlIGlmICghb3B0Lm5vZm4gJiYgZmllbGREZWYuYmluKSB7XG4gICAgY29uc3QgYmluU3VmZml4ID0gb3B0LmJpblN1ZmZpeCB8fCAoXG4gICAgICBvcHQuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/XG4gICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIHR5cGUsIHVzZSBgX3JhbmdlYCBhcyBzdWZmaXguXG4gICAgICAgICdfcmFuZ2UnIDpcbiAgICAgICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlIG9yIHVua25vd24sIHVzZSBgX3N0YXJ0YCBhcyBzdWZmaXguXG4gICAgICAgICdfc3RhcnQnXG4gICAgKTtcbiAgICByZXR1cm4gcHJlZml4ICsgJ2Jpbl8nICsgZmllbGQgKyBiaW5TdWZmaXg7XG4gIH0gZWxzZSBpZiAoIW9wdC5ub2ZuICYmICFvcHQubm9BZ2dyZWdhdGUgJiYgZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIGZpZWxkRGVmLmFnZ3JlZ2F0ZSArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKCFvcHQubm9mbiAmJiBmaWVsZERlZi50aW1lVW5pdCkge1xuICAgIHJldHVybiBwcmVmaXggKyBmaWVsZERlZi50aW1lVW5pdCArICdfJyArIGZpZWxkICsgc3VmZml4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwcmVmaXggKyBmaWVsZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaXNGaWVsZERpbWVuc2lvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGNvbnRhaW5zKFtOT01JTkFMLCBPUkRJTkFMXSwgZmllbGREZWYudHlwZSkgfHwgISFmaWVsZERlZi5iaW4gfHxcbiAgICAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwgJiYgISFmaWVsZERlZi50aW1lVW5pdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpbWVuc2lvbihmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkICYmIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVhc3VyZShmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmICYmIGZpZWxkRGVmLmZpZWxkICYmICFfaXNGaWVsZERpbWVuc2lvbihmaWVsZERlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudCgpOiBGaWVsZERlZiB7XG4gIHJldHVybiB7IGZpZWxkOiAnKicsIGFnZ3JlZ2F0ZTogQWdncmVnYXRlT3AuQ09VTlQsIHR5cGU6IFFVQU5USVRBVElWRX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvdW50KGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYuYWdncmVnYXRlID09PSBBZ2dyZWdhdGVPcC5DT1VOVDtcbn1cblxuLy8gRklYTUUgcmVtb3ZlIHRoaXMsIGFuZCB0aGUgZ2V0YmlucyBtZXRob2Rcbi8vIEZJWE1FIHRoaXMgZGVwZW5kcyBvbiBjaGFubmVsXG5leHBvcnQgZnVuY3Rpb24gY2FyZGluYWxpdHkoZmllbGREZWY6IEZpZWxkRGVmLCBzdGF0cywgZmlsdGVyTnVsbCA9IHt9KSB7XG4gIC8vIEZJWE1FIG5lZWQgdG8gdGFrZSBmaWx0ZXIgaW50byBhY2NvdW50XG5cbiAgY29uc3Qgc3RhdCA9IHN0YXRzW2ZpZWxkRGVmLmZpZWxkXSxcbiAgdHlwZSA9IGZpZWxkRGVmLnR5cGU7XG5cbiAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgIC8vIG5lZWQgdG8gcmVhc3NpZ24gYmluLCBvdGhlcndpc2UgY29tcGlsYXRpb24gd2lsbCBmYWlsIGR1ZSB0byBhIFRTIGJ1Zy5cbiAgICBjb25zdCBiaW4gPSBmaWVsZERlZi5iaW47XG4gICAgbGV0IG1heGJpbnMgPSAodHlwZW9mIGJpbiA9PT0gJ2Jvb2xlYW4nKSA/IHVuZGVmaW5lZCA6IGJpbi5tYXhiaW5zO1xuICAgIGlmIChtYXhiaW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heGJpbnMgPSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCBiaW5zID0gZ2V0YmlucyhzdGF0LCBtYXhiaW5zKTtcbiAgICByZXR1cm4gKGJpbnMuc3RvcCAtIGJpbnMuc3RhcnQpIC8gYmlucy5zdGVwO1xuICB9XG4gIGlmICh0eXBlID09PSBURU1QT1JBTCkge1xuICAgIGNvbnN0IHRpbWVVbml0ID0gZmllbGREZWYudGltZVVuaXQ7XG4gICAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgICAgY2FzZSBUaW1lVW5pdC5TRUNPTkRTOiByZXR1cm4gNjA7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURVM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6IHJldHVybiAyNDtcbiAgICAgIGNhc2UgVGltZVVuaXQuREFZOiByZXR1cm4gNztcbiAgICAgIGNhc2UgVGltZVVuaXQuREFURTogcmV0dXJuIDMxO1xuICAgICAgY2FzZSBUaW1lVW5pdC5NT05USDogcmV0dXJuIDEyO1xuICAgICAgY2FzZSBUaW1lVW5pdC5RVUFSVEVSOiByZXR1cm4gNDtcbiAgICAgIGNhc2UgVGltZVVuaXQuWUVBUjpcbiAgICAgICAgY29uc3QgeWVhcnN0YXQgPSBzdGF0c1sneWVhcl8nICsgZmllbGREZWYuZmllbGRdO1xuXG4gICAgICAgIGlmICgheWVhcnN0YXQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4geWVhcnN0YXQuZGlzdGluY3QgLVxuICAgICAgICAgIChzdGF0Lm1pc3NpbmcgPiAwICYmIGZpbHRlck51bGxbdHlwZV0gPyAxIDogMCk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSB1c2UgY2FsY3VsYXRpb24gYmVsb3dcbiAgfVxuICBpZiAoZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyByZW1vdmUgbnVsbFxuICByZXR1cm4gc3RhdC5kaXN0aW5jdCAtXG4gICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZiwgY29uZmlnOiBDb25maWcpIHtcbiAgaWYgKGZpZWxkRGVmLnRpdGxlICE9IG51bGwpIHtcbiAgICByZXR1cm4gZmllbGREZWYudGl0bGU7XG4gIH1cbiAgaWYgKGlzQ291bnQoZmllbGREZWYpKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5jb3VudFRpdGxlO1xuICB9XG4gIGNvbnN0IGZuID0gZmllbGREZWYuYWdncmVnYXRlIHx8IGZpZWxkRGVmLnRpbWVVbml0IHx8IChmaWVsZERlZi5iaW4gJiYgJ2JpbicpO1xuICBpZiAoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpICsgJygnICsgZmllbGREZWYuZmllbGQgKyAnKSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpZWxkRGVmLmZpZWxkO1xuICB9XG59XG4iLCJpbXBvcnQge0RhdGVUaW1lfSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7VGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBGaWx0ZXIgPSBFcXVhbEZpbHRlciB8IFJhbmdlRmlsdGVyIHwgSW5GaWx0ZXIgO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXF1YWxGaWx0ZXIge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFnZ3JlZ2F0ZVxuXG4gIC8qKlxuICAgKiBUaW1lIHVuaXQgZm9yIHRoZSBmaWVsZCB0byBiZSBmaWx0ZXJlZC5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZpZWxkIHRvIGJlIGZpbHRlcmVkLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogVmFsdWUgdGhhdCB0aGUgZmllbGQgc2hvdWxkIGJlIGVxdWFsIHRvLlxuICAgKi9cbiAgZXF1YWw6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBEYXRlVGltZTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbEZpbHRlcihmaWx0ZXI6IGFueSk6IGZpbHRlciBpcyBFcXVhbEZpbHRlciB7XG4gIHJldHVybiBmaWx0ZXIgJiYgISFmaWx0ZXIuZmllbGQgJiYgZmlsdGVyLmVxdWFsIT09dW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlRmlsdGVyIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQXJyYXkgb2YgaW5jbHVzaXZlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzXG4gICAqIGZvciBhIGZpZWxkIHZhbHVlIG9mIGEgZGF0YSBpdGVtIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmaWx0ZXJlZCBkYXRhLlxuICAgKiBAbWF4SXRlbXMgMlxuICAgKiBAbWluSXRlbXMgMlxuICAgKi9cbiAgcmFuZ2U6IEFycmF5PG51bWJlcnxEYXRlVGltZT47XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VGaWx0ZXIoZmlsdGVyOiBhbnkpOiBmaWx0ZXIgaXMgUmFuZ2VGaWx0ZXIge1xuICBpZiAoZmlsdGVyICYmICEhZmlsdGVyLmZpZWxkKSB7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyLnJhbmdlKSAmJiBmaWx0ZXIucmFuZ2UubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluRmlsdGVyIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQSBzZXQgb2YgdmFsdWVzIHRoYXQgdGhlIGBmaWVsZGAncyB2YWx1ZSBzaG91bGQgYmUgYSBtZW1iZXIgb2YsXG4gICAqIGZvciBhIGRhdGEgaXRlbSBpbmNsdWRlZCBpbiB0aGUgZmlsdGVyZWQgZGF0YS5cbiAgICovXG4gIGluOiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW58RGF0ZVRpbWU+O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luRmlsdGVyKGZpbHRlcjogYW55KTogZmlsdGVyIGlzIEluRmlsdGVyIHtcbiAgcmV0dXJuIGZpbHRlciAmJiAhIWZpbHRlci5maWVsZCAmJiBpc0FycmF5KGZpbHRlci5pbik7XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIExlZ2VuZENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIGxlZ2VuZC4gT25lIG9mIFwibGVmdFwiIG9yIFwicmlnaHRcIi4gVGhpcyBkZXRlcm1pbmVzIGhvdyB0aGUgbGVnZW5kIGlzIHBvc2l0aW9uZWQgd2l0aGluIHRoZSBzY2VuZS4gVGhlIGRlZmF1bHQgaXMgXCJyaWdodFwiLlxuICAgKi9cbiAgb3JpZW50Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG9mZnNldCwgaW4gcGl4ZWxzLCBieSB3aGljaCB0byBkaXNwbGFjZSB0aGUgbGVnZW5kIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGVuY2xvc2luZyBncm91cCBvciBkYXRhIHJlY3RhbmdsZS5cbiAgICovXG4gIG9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBwYWRkaW5nLCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIGxlbmdlbmQgYW5kIGF4aXMuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1hcmdpbiBhcm91bmQgdGhlIGxlZ2VuZCwgaW4gcGl4ZWxzXG4gICAqL1xuICBtYXJnaW4/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGdyYWRpZW50IHN0cm9rZSwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIGdyYWRpZW50U3Ryb2tlQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50IHN0cm9rZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGdyYWRpZW50LCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudEhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JhZGllbnQsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50V2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgYWxpZ25tZW50IG9mIHRoZSBsZWdlbmQgbGFiZWwsIGNhbiBiZSBsZWZ0LCBtaWRkbGUgb3IgcmlnaHQuXG4gICAqL1xuICBsYWJlbEFsaWduPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBiYXNlbGluZSBvZiBsZWdlbmQgbGFiZWwsIGNhbiBiZSB0b3AsIG1pZGRsZSBvciBib3R0b20uXG4gICAqL1xuICBsYWJlbEJhc2VsaW5lPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgbGFiZWwsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICBsYWJlbENvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIGxlbmdlbmQgbGFiZWwuXG4gICAqL1xuICBsYWJlbEZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIGxlbmdlbmQgbGFibGUuXG4gICAqL1xuICBsYWJlbEZvbnRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGUgbGVnZW5kIGxhYmVsLlxuICAgKi9cbiAgbGFiZWxPZmZzZXQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCBzeW1ib2wsXG4gICAqL1xuICBzeW1ib2xDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzaGFwZSBvZiB0aGUgbGVnZW5kIHN5bWJvbCwgY2FuIGJlIHRoZSAnY2lyY2xlJywgJ3NxdWFyZScsICdjcm9zcycsICdkaWFtb25kJyxcbiAgICogJ3RyaWFuZ2xlLXVwJywgJ3RyaWFuZ2xlLWRvd24nLlxuICAgKi9cbiAgc3ltYm9sU2hhcGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgbGVuZ2VuZCBzeW1ib2wsIGluIHBpeGVscy5cbiAgICovXG4gIHN5bWJvbFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHN5bWJvbCdzIHN0cm9rZS5cbiAgICovXG4gIHN5bWJvbFN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwgbWFyayBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmb3IgY3VzdG9tIGxlZ2VuZCBzdHlsaW5nLlxuICAgKi9cbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIHRpdGxlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgdGl0bGVDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGZvbnQgd2VpZ2h0IG9mIHRoZSBsZWdlbmQgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRXZWlnaHQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gbGVnZW5kIHN0eWxpbmcuXG4gICAqL1xuICBwcm9wZXJ0aWVzPzogYW55OyAvLyBUT0RPKCM5NzUpIHJlcGxhY2Ugd2l0aCBjb25maWcgcHJvcGVydGllc1xufVxuXG4vKipcbiAqIFByb3BlcnRpZXMgb2YgYSBsZWdlbmQgb3IgYm9vbGVhbiBmbGFnIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHNob3cgaXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kIGV4dGVuZHMgTGVnZW5kQ29uZmlnIHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbGVnZW5kIGxhYmVscy4gVmVnYSB1c2VzIEQzXFwncyBmb3JtYXQgcGF0dGVybi5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZztcbiAgLyoqXG4gICAqIEEgdGl0bGUgZm9yIHRoZSBsZWdlbmQuIChTaG93cyBmaWVsZCBuYW1lIGFuZCBpdHMgZnVuY3Rpb24gYnkgZGVmYXVsdC4pXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIEV4cGxpY2l0bHkgc2V0IHRoZSB2aXNpYmxlIGxlZ2VuZCB2YWx1ZXMuXG4gICAqL1xuICB2YWx1ZXM/OiBBcnJheTxhbnk+O1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdExlZ2VuZENvbmZpZzogTGVnZW5kQ29uZmlnID0ge1xuICBvcmllbnQ6IHVuZGVmaW5lZCwgLy8gaW1wbGljaXRseSBcInJpZ2h0XCJcbiAgc2hvcnRUaW1lTGFiZWxzOiBmYWxzZVxufTtcbiIsImV4cG9ydCBlbnVtIE1hcmsge1xuICBBUkVBID0gJ2FyZWEnIGFzIGFueSxcbiAgQkFSID0gJ2JhcicgYXMgYW55LFxuICBMSU5FID0gJ2xpbmUnIGFzIGFueSxcbiAgUE9JTlQgPSAncG9pbnQnIGFzIGFueSxcbiAgVEVYVCA9ICd0ZXh0JyBhcyBhbnksXG4gIFRJQ0sgPSAndGljaycgYXMgYW55LFxuICBSVUxFID0gJ3J1bGUnIGFzIGFueSxcbiAgQ0lSQ0xFID0gJ2NpcmNsZScgYXMgYW55LFxuICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnksXG4gIEVSUk9SQkFSID0gJ2Vycm9yQmFyJyBhcyBhbnlcbn1cblxuZXhwb3J0IGNvbnN0IEFSRUEgPSBNYXJrLkFSRUE7XG5leHBvcnQgY29uc3QgQkFSID0gTWFyay5CQVI7XG5leHBvcnQgY29uc3QgTElORSA9IE1hcmsuTElORTtcbmV4cG9ydCBjb25zdCBQT0lOVCA9IE1hcmsuUE9JTlQ7XG5leHBvcnQgY29uc3QgVEVYVCA9IE1hcmsuVEVYVDtcbmV4cG9ydCBjb25zdCBUSUNLID0gTWFyay5USUNLO1xuZXhwb3J0IGNvbnN0IFJVTEUgPSBNYXJrLlJVTEU7XG5cbmV4cG9ydCBjb25zdCBDSVJDTEUgPSBNYXJrLkNJUkNMRTtcbmV4cG9ydCBjb25zdCBTUVVBUkUgPSBNYXJrLlNRVUFSRTtcblxuZXhwb3J0IGNvbnN0IEVSUk9SQkFSID0gTWFyay5FUlJPUkJBUjtcbmV4cG9ydCBjb25zdCBQUklNSVRJVkVfTUFSS1MgPSBbQVJFQSwgQkFSLCBMSU5FLCBQT0lOVCwgVEVYVCwgVElDSywgUlVMRSwgQ0lSQ0xFLCBTUVVBUkVdO1xuIiwiZXhwb3J0IGVudW0gU2NhbGVUeXBlIHtcbiAgICBMSU5FQVIgPSAnbGluZWFyJyBhcyBhbnksXG4gICAgTE9HID0gJ2xvZycgYXMgYW55LFxuICAgIFBPVyA9ICdwb3cnIGFzIGFueSxcbiAgICBTUVJUID0gJ3NxcnQnIGFzIGFueSxcbiAgICBRVUFOVElMRSA9ICdxdWFudGlsZScgYXMgYW55LFxuICAgIFFVQU5USVpFID0gJ3F1YW50aXplJyBhcyBhbnksXG4gICAgT1JESU5BTCA9ICdvcmRpbmFsJyBhcyBhbnksXG4gICAgVElNRSA9ICd0aW1lJyBhcyBhbnksXG4gICAgVVRDICA9ICd1dGMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gTmljZVRpbWUge1xuICAgIFNFQ09ORCA9ICdzZWNvbmQnIGFzIGFueSxcbiAgICBNSU5VVEUgPSAnbWludXRlJyBhcyBhbnksXG4gICAgSE9VUiA9ICdob3VyJyBhcyBhbnksXG4gICAgREFZID0gJ2RheScgYXMgYW55LFxuICAgIFdFRUsgPSAnd2VlaycgYXMgYW55LFxuICAgIE1PTlRIID0gJ21vbnRoJyBhcyBhbnksXG4gICAgWUVBUiA9ICd5ZWFyJyBhcyBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NhbGVDb25maWcge1xuICAvKipcbiAgICogSWYgdHJ1ZSwgcm91bmRzIG51bWVyaWMgb3V0cHV0IHZhbHVlcyB0byBpbnRlZ2Vycy5cbiAgICogVGhpcyBjYW4gYmUgaGVscGZ1bCBmb3Igc25hcHBpbmcgdG8gdGhlIHBpeGVsIGdyaWQuXG4gICAqIChPbmx5IGF2YWlsYWJsZSBmb3IgYHhgLCBgeWAsIGBzaXplYCwgYHJvd2AsIGFuZCBgY29sdW1uYCBzY2FsZXMuKVxuICAgKi9cbiAgcm91bmQ/OiBib29sZWFuO1xuICAvKipcbiAgICogIERlZmF1bHQgYmFuZCB3aWR0aCBmb3IgYHhgIG9yZGluYWwgc2NhbGUgd2hlbiBpcyBtYXJrIGlzIGB0ZXh0YC5cbiAgICogIEBtaW5pbXVtIDBcbiAgICovXG4gIHRleHRCYW5kV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJhbmQgc2l6ZSBmb3IgKDEpIGB5YCBvcmRpbmFsIHNjYWxlLFxuICAgKiBhbmQgKDIpIGB4YCBvcmRpbmFsIHNjYWxlIHdoZW4gdGhlIG1hcmsgaXMgbm90IGB0ZXh0YC5cbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgYmFuZFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIGZvciBvcGFjaXR5LlxuICAgKi9cbiAgb3BhY2l0eT86IG51bWJlcltdO1xuICAvKipcbiAgICogRGVmYXVsdCBwYWRkaW5nIGZvciBgeGAgYW5kIGB5YCBvcmRpbmFsIHNjYWxlcy5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFVzZXMgdGhlIHNvdXJjZSBkYXRhIHJhbmdlIGFzIHNjYWxlIGRvbWFpbiBpbnN0ZWFkIG9mIGFnZ3JlZ2F0ZWQgZGF0YSBmb3IgYWdncmVnYXRlIGF4aXMuXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0ZSBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyB3aXRoaW4gdGhlIHJhdyBkYXRhIGRvbWFpbiAoYFwibWVhblwiYCwgYFwiYXZlcmFnZVwiYCwgYFwic3RkZXZcImAsIGBcInN0ZGV2cFwiYCwgYFwibWVkaWFuXCJgLCBgXCJxMVwiYCwgYFwicTNcImAsIGBcIm1pblwiYCwgYFwibWF4XCJgKS4gRm9yIG90aGVyIGFnZ3JlZ2F0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIG91dHNpZGUgb2YgdGhlIHJhdyBkYXRhIGRvbWFpbiAoZS5nLiBgXCJjb3VudFwiYCwgYFwic3VtXCJgKSwgdGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxuICAgKi9cbiAgdXNlUmF3RG9tYWluPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igbm9taW5hbCBjb2xvciBzY2FsZSAqL1xuICBub21pbmFsQ29sb3JSYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igb3JkaW5hbCAvIGNvbnRpbnVvdXMgY29sb3Igc2NhbGUgKi9cbiAgc2VxdWVudGlhbENvbG9yUmFuZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHNoYXBlICovXG4gIHNoYXBlUmFuZ2U/OiBzdHJpbmd8c3RyaW5nW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGJhciBzaXplIHNjYWxlICovXG4gIGJhclNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBmb250IHNpemUgc2NhbGUgKi9cbiAgZm9udFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBydWxlIHN0cm9rZSB3aWR0aHMgKi9cbiAgcnVsZVNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciB0aWNrIHNwYW5zICovXG4gIHRpY2tTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgYmFyIHNpemUgc2NhbGUgKi9cbiAgcG9pbnRTaXplUmFuZ2U/OiBudW1iZXJbXTtcblxuICAvLyBuaWNlIHNob3VsZCBkZXBlbmRzIG9uIHR5cGUgKHF1YW50aXRhdGl2ZSBvciB0ZW1wb3JhbCksIHNvXG4gIC8vIGxldCdzIG5vdCBtYWtlIGEgY29uZmlnLlxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNjYWxlQ29uZmlnOiBTY2FsZUNvbmZpZyA9IHtcbiAgcm91bmQ6IHRydWUsXG4gIHRleHRCYW5kV2lkdGg6IDkwLFxuICBiYW5kU2l6ZTogMjEsXG4gIHBhZGRpbmc6IDEsXG4gIHVzZVJhd0RvbWFpbjogZmFsc2UsXG4gIG9wYWNpdHk6IFswLjMsIDAuOF0sXG5cbiAgbm9taW5hbENvbG9yUmFuZ2U6ICdjYXRlZ29yeTEwJyxcbiAgc2VxdWVudGlhbENvbG9yUmFuZ2U6IFsnI0FGQzZBMycsICcjMDk2MjJBJ10sIC8vIHRhYmxlYXUgZ3JlZW5zXG4gIHNoYXBlUmFuZ2U6ICdzaGFwZXMnLFxuICBmb250U2l6ZVJhbmdlOiBbOCwgNDBdLFxuICBydWxlU2l6ZVJhbmdlOiBbMSwgNV0sXG4gIHRpY2tTaXplUmFuZ2U6IFsxLCAyMF1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRTY2FsZUNvbmZpZyB7XG4gIHJvdW5kPzogYm9vbGVhbjtcbiAgcGFkZGluZz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnOiBGYWNldFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgcGFkZGluZzogMTZcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NhbGUge1xuICB0eXBlPzogU2NhbGVUeXBlO1xuICAvKipcbiAgICogVGhlIGRvbWFpbiBvZiB0aGUgc2NhbGUsIHJlcHJlc2VudGluZyB0aGUgc2V0IG9mIGRhdGEgdmFsdWVzLiBGb3IgcXVhbnRpdGF0aXZlIGRhdGEsIHRoaXMgY2FuIHRha2UgdGhlIGZvcm0gb2YgYSB0d28tZWxlbWVudCBhcnJheSB3aXRoIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLiBGb3Igb3JkaW5hbC9jYXRlZ29yaWNhbCBkYXRhLCB0aGlzIG1heSBiZSBhbiBhcnJheSBvZiB2YWxpZCBpbnB1dCB2YWx1ZXMuIFRoZSBkb21haW4gbWF5IGFsc28gYmUgc3BlY2lmaWVkIGJ5IGEgcmVmZXJlbmNlIHRvIGEgZGF0YSBzb3VyY2UuXG4gICAqL1xuICBkb21haW4/OiBzdHJpbmcgfCBudW1iZXJbXSB8IHN0cmluZ1tdOyAvLyBUT0RPOiBkZWNsYXJlIHZnRGF0YURvbWFpblxuICAvKipcbiAgICogVGhlIHJhbmdlIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgdmlzdWFsIHZhbHVlcy4gRm9yIG51bWVyaWMgdmFsdWVzLCB0aGUgcmFuZ2UgY2FuIHRha2UgdGhlIGZvcm0gb2YgYSB0d28tZWxlbWVudCBhcnJheSB3aXRoIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLiBGb3Igb3JkaW5hbCBvciBxdWFudGl6ZWQgZGF0YSwgdGhlIHJhbmdlIG1heSBieSBhbiBhcnJheSBvZiBkZXNpcmVkIG91dHB1dCB2YWx1ZXMsIHdoaWNoIGFyZSBtYXBwZWQgdG8gZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBkb21haW4uIEZvciBvcmRpbmFsIHNjYWxlcyBvbmx5LCB0aGUgcmFuZ2UgY2FuIGJlIGRlZmluZWQgdXNpbmcgYSBEYXRhUmVmOiB0aGUgcmFuZ2UgdmFsdWVzIGFyZSB0aGVuIGRyYXduIGR5bmFtaWNhbGx5IGZyb20gYSBiYWNraW5nIGRhdGEgc2V0LlxuICAgKi9cbiAgcmFuZ2U/OiBzdHJpbmcgfCBudW1iZXJbXSB8IHN0cmluZ1tdOyAvLyBUT0RPOiBkZWNsYXJlIHZnUmFuZ2VEb21haW5cbiAgLyoqXG4gICAqIElmIHRydWUsIHJvdW5kcyBudW1lcmljIG91dHB1dCB2YWx1ZXMgdG8gaW50ZWdlcnMuIFRoaXMgY2FuIGJlIGhlbHBmdWwgZm9yIHNuYXBwaW5nIHRvIHRoZSBwaXhlbCBncmlkLlxuICAgKi9cbiAgcm91bmQ/OiBib29sZWFuO1xuXG4gIC8vIG9yZGluYWxcbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJhbmRTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogQXBwbGllcyBzcGFjaW5nIGFtb25nIG9yZGluYWwgZWxlbWVudHMgaW4gdGhlIHNjYWxlIHJhbmdlLiBUaGUgYWN0dWFsIGVmZmVjdCBkZXBlbmRzIG9uIGhvdyB0aGUgc2NhbGUgaXMgY29uZmlndXJlZC4gSWYgdGhlIF9fcG9pbnRzX18gcGFyYW1ldGVyIGlzIGB0cnVlYCwgdGhlIHBhZGRpbmcgdmFsdWUgaXMgaW50ZXJwcmV0ZWQgYXMgYSBtdWx0aXBsZSBvZiB0aGUgc3BhY2luZyBiZXR3ZWVuIHBvaW50cy4gQSByZWFzb25hYmxlIHZhbHVlIGlzIDEuMCwgc3VjaCB0aGF0IHRoZSBmaXJzdCBhbmQgbGFzdCBwb2ludCB3aWxsIGJlIG9mZnNldCBmcm9tIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIGJ5IGhhbGYgdGhlIGRpc3RhbmNlIGJldHdlZW4gcG9pbnRzLiBPdGhlcndpc2UsIHBhZGRpbmcgaXMgdHlwaWNhbGx5IGluIHRoZSByYW5nZSBbMCwgMV0gYW5kIGNvcnJlc3BvbmRzIHRvIHRoZSBmcmFjdGlvbiBvZiBzcGFjZSBpbiB0aGUgcmFuZ2UgaW50ZXJ2YWwgdG8gYWxsb2NhdGUgdG8gcGFkZGluZy4gQSB2YWx1ZSBvZiAwLjUgbWVhbnMgdGhhdCB0aGUgcmFuZ2UgYmFuZCB3aWR0aCB3aWxsIGJlIGVxdWFsIHRvIHRoZSBwYWRkaW5nIHdpZHRoLiBGb3IgbW9yZSwgc2VlIHRoZSBbRDMgb3JkaW5hbCBzY2FsZSBkb2N1bWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vbWJvc3RvY2svZDMvd2lraS9PcmRpbmFsLVNjYWxlcykuXG4gICAqL1xuICBwYWRkaW5nPzogbnVtYmVyO1xuXG4gIC8vIHR5cGljYWxcbiAgLyoqXG4gICAqIElmIHRydWUsIHZhbHVlcyB0aGF0IGV4Y2VlZCB0aGUgZGF0YSBkb21haW4gYXJlIGNsYW1wZWQgdG8gZWl0aGVyIHRoZSBtaW5pbXVtIG9yIG1heGltdW0gcmFuZ2UgdmFsdWVcbiAgICovXG4gIGNsYW1wPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElmIHNwZWNpZmllZCwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IHZhbHVlIHJhbmdlLiBJZiBzcGVjaWZpZWQgYXMgYSB0cnVlIGJvb2xlYW4sIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSBudW1iZXIgcmFuZ2UgKGUuZy4sIDcgaW5zdGVhZCBvZiA2Ljk2KS4gSWYgc3BlY2lmaWVkIGFzIGEgc3RyaW5nLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIEZvciB0aW1lIGFuZCB1dGMgc2NhbGUgdHlwZXMgb25seSwgdGhlIG5pY2UgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIGRlc2lyZWQgdGltZSBpbnRlcnZhbC5cbiAgICovXG4gIG5pY2U/OiBib29sZWFuIHwgTmljZVRpbWU7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleHBvbmVudCBvZiB0aGUgc2NhbGUgdHJhbnNmb3JtYXRpb24uIEZvciBwb3cgc2NhbGUgdHlwZXMgb25seSwgb3RoZXJ3aXNlIGlnbm9yZWQuXG4gICAqL1xuICBleHBvbmVudD86IG51bWJlcjtcbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgZW5zdXJlcyB0aGF0IGEgemVybyBiYXNlbGluZSB2YWx1ZSBpcyBpbmNsdWRlZCBpbiB0aGUgc2NhbGUgZG9tYWluLlxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdHJ1ZWAgZm9yIGB4YCBhbmQgYHlgIGNoYW5uZWwgaWYgdGhlIHF1YW50aXRhdGl2ZSBmaWVsZCBpcyBub3QgYmlubmVkXG4gICAqIGFuZCBubyBjdXN0b20gYGRvbWFpbmAgaXMgcHJvdmlkZWQ7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgemVybz86IGJvb2xlYW47XG5cbiAgLy8gVmVnYS1MaXRlIG9ubHlcbiAgLyoqXG4gICAqIFVzZXMgdGhlIHNvdXJjZSBkYXRhIHJhbmdlIGFzIHNjYWxlIGRvbWFpbiBpbnN0ZWFkIG9mIGFnZ3JlZ2F0ZWQgZGF0YSBmb3IgYWdncmVnYXRlIGF4aXMuXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0ZSBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlIHZhbHVlcyB3aXRoaW4gdGhlIHJhdyBkYXRhIGRvbWFpbiAoYFwibWVhblwiYCwgYFwiYXZlcmFnZVwiYCwgYFwic3RkZXZcImAsIGBcInN0ZGV2cFwiYCwgYFwibWVkaWFuXCJgLCBgXCJxMVwiYCwgYFwicTNcImAsIGBcIm1pblwiYCwgYFwibWF4XCJgKS4gRm9yIG90aGVyIGFnZ3JlZ2F0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIG91dHNpZGUgb2YgdGhlIHJhdyBkYXRhIGRvbWFpbiAoZS5nLiBgXCJjb3VudFwiYCwgYFwic3VtXCJgKSwgdGhpcyBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxuICAgKi9cbiAgdXNlUmF3RG9tYWluPzogYm9vbGVhbjtcbn1cbiIsIi8qKiBtb2R1bGUgZm9yIHNob3J0aGFuZCAqL1xuXG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG5pbXBvcnQge0FnZ3JlZ2F0ZU9wLCBBR0dSRUdBVEVfT1BTfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge1RJTUVVTklUU30gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge1NIT1JUX1RZUEUsIFRZUEVfRlJPTV9TSE9SVF9UWVBFfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0ICogYXMgdmxFbmNvZGluZyBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFya30gZnJvbSAnLi9tYXJrJztcblxuZXhwb3J0IGNvbnN0IERFTElNID0gJ3wnO1xuZXhwb3J0IGNvbnN0IEFTU0lHTiA9ICc9JztcbmV4cG9ydCBjb25zdCBUWVBFID0gJywnO1xuZXhwb3J0IGNvbnN0IEZVTkMgPSAnXyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW4oc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IHN0cmluZyB7XG4gIHJldHVybiAnbWFyaycgKyBBU1NJR04gKyBzcGVjLm1hcmsgK1xuICAgIERFTElNICsgc2hvcnRlbkVuY29kaW5nKHNwZWMuZW5jb2RpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc2hvcnRoYW5kOiBzdHJpbmcsIGRhdGE/LCBjb25maWc/KSB7XG4gIGxldCBzcGxpdCA9IHNob3J0aGFuZC5zcGxpdChERUxJTSksXG4gICAgbWFyayA9IHNwbGl0LnNoaWZ0KCkuc3BsaXQoQVNTSUdOKVsxXS50cmltKCksXG4gICAgZW5jb2RpbmcgPSBwYXJzZUVuY29kaW5nKHNwbGl0LmpvaW4oREVMSU0pKTtcblxuICBsZXQgc3BlYzpFeHRlbmRlZFVuaXRTcGVjID0ge1xuICAgIG1hcms6IE1hcmtbbWFya10sXG4gICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gIH07XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIHNwZWMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgaWYgKGNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5jb25maWcgPSBjb25maWc7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRW5jb2RpbmcoZW5jb2Rpbmc6IEVuY29kaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZsRW5jb2RpbmcubWFwKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZiwgY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsICsgQVNTSUdOICsgc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgfSkuam9pbihERUxJTSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVuY29kaW5nKGVuY29kaW5nU2hvcnRoYW5kOiBzdHJpbmcpOiBFbmNvZGluZyB7XG4gIHJldHVybiBlbmNvZGluZ1Nob3J0aGFuZC5zcGxpdChERUxJTSkucmVkdWNlKGZ1bmN0aW9uKG0sIGUpIHtcbiAgICBjb25zdCBzcGxpdCA9IGUuc3BsaXQoQVNTSUdOKSxcbiAgICAgICAgZW5jdHlwZSA9IHNwbGl0WzBdLnRyaW0oKSxcbiAgICAgICAgZmllbGREZWZTaG9ydGhhbmQgPSBzcGxpdFsxXTtcblxuICAgIG1bZW5jdHlwZV0gPSBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kKTtcbiAgICByZXR1cm4gbTtcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbkZpZWxkRGVmKGZpZWxkRGVmOiBGaWVsZERlZik6IHN0cmluZyB7XG4gIHJldHVybiAoZmllbGREZWYuYWdncmVnYXRlID8gZmllbGREZWYuYWdncmVnYXRlICsgRlVOQyA6ICcnKSArXG4gICAgKGZpZWxkRGVmLnRpbWVVbml0ID8gZmllbGREZWYudGltZVVuaXQgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuYmluID8gJ2JpbicgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYuZmllbGQgfHwgJycpICsgVFlQRSArIFNIT1JUX1RZUEVbZmllbGREZWYudHlwZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWZzKGZpZWxkRGVmczogRmllbGREZWZbXSwgZGVsaW0gPSBERUxJTSk6IHN0cmluZyB7XG4gIHJldHVybiBmaWVsZERlZnMubWFwKHNob3J0ZW5GaWVsZERlZikuam9pbihkZWxpbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkRGVmKGZpZWxkRGVmU2hvcnRoYW5kOiBzdHJpbmcpOiBGaWVsZERlZiB7XG4gIGNvbnN0IHNwbGl0ID0gZmllbGREZWZTaG9ydGhhbmQuc3BsaXQoVFlQRSk7XG5cbiAgbGV0IGZpZWxkRGVmOiBGaWVsZERlZiA9IHtcbiAgICBmaWVsZDogc3BsaXRbMF0udHJpbSgpLFxuICAgIHR5cGU6IFRZUEVfRlJPTV9TSE9SVF9UWVBFW3NwbGl0WzFdLnRyaW0oKV1cbiAgfTtcblxuICAvLyBjaGVjayBhZ2dyZWdhdGUgdHlwZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFHR1JFR0FURV9PUFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgYSA9IEFHR1JFR0FURV9PUFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoYSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGEudG9TdHJpbmcoKS5sZW5ndGggKyAxKTtcbiAgICAgIGlmIChhID09PSBBZ2dyZWdhdGVPcC5DT1VOVCAmJiBmaWVsZERlZi5maWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZmllbGREZWYuZmllbGQgPSAnKic7XG4gICAgICB9XG4gICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBUSU1FVU5JVFMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdHUgPSBUSU1FVU5JVFNbaV07XG4gICAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YodHUgKyAnXycpID09PSAwKSB7XG4gICAgICBmaWVsZERlZi5maWVsZCA9IGZpZWxkRGVmLmZpZWxkLnN1YnN0cihmaWVsZERlZi5maWVsZC5sZW5ndGggKyAxKTtcbiAgICAgIGZpZWxkRGVmLnRpbWVVbml0ID0gdHU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBiaW5cbiAgaWYgKGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkLmluZGV4T2YoJ2Jpbl8nKSA9PT0gMCkge1xuICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKDQpO1xuICAgIGZpZWxkRGVmLmJpbiA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gZmllbGREZWY7XG59XG4iLCJpbXBvcnQge0FnZ3JlZ2F0ZU9wfSBmcm9tICcuL2FnZ3JlZ2F0ZSc7XG5cbmV4cG9ydCBlbnVtIFNvcnRPcmRlciB7XG4gICAgQVNDRU5ESU5HID0gJ2FzY2VuZGluZycgYXMgYW55LFxuICAgIERFU0NFTkRJTkcgPSAnZGVzY2VuZGluZycgYXMgYW55LFxuICAgIE5PTkUgPSAnbm9uZScgYXMgYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRGaWVsZCB7XG4gIC8qKlxuICAgKiBUaGUgZmllbGQgbmFtZSB0byBhZ2dyZWdhdGUgb3Zlci5cbiAgICovXG4gIGZpZWxkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc29ydCBhZ2dyZWdhdGlvbiBvcGVyYXRvclxuICAgKi9cbiAgb3A6IEFnZ3JlZ2F0ZU9wO1xuXG4gIG9yZGVyPzogU29ydE9yZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb3J0RmllbGQoc29ydDogU29ydE9yZGVyIHwgU29ydEZpZWxkKTogc29ydCBpcyBTb3J0RmllbGQge1xuICByZXR1cm4gISFzb3J0ICYmICEhc29ydFsnZmllbGQnXSAmJiAhIXNvcnRbJ29wJ107XG59XG4iLCIvKiBQYWNrYWdlIG9mIGRlZmluaW5nIFZlZ2EtbGl0ZSBTcGVjaWZpY2F0aW9uJ3MganNvbiBzY2hlbWEgYXQgaXRzIHV0aWxpdHkgZnVuY3Rpb25zICovXG5cbmltcG9ydCB7Q29uZmlnLCBkZWZhdWx0T3ZlcmxheUNvbmZpZywgQXJlYU92ZXJsYXl9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7RGF0YX0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7RW5jb2RpbmcsIFVuaXRFbmNvZGluZywgaGFzLCBpc1JhbmdlZH0gZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZhY2V0fSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtNYXJrLCBFUlJPUkJBUiwgVElDSywgQVJFQSwgUlVMRSwgTElORSwgUE9JTlR9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge3N0YWNrfSBmcm9tICcuL3N0YWNrJztcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICcuL3RyYW5zZm9ybSc7XG5pbXBvcnQge1JPVywgQ09MVU1OLCBYLCBZLCBYMiwgWTJ9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtjb250YWlucywgZHVwbGljYXRlLCBleHRlbmQsIGtleXMsIG9taXQsIHBpY2t9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVNwZWMge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgdmlzdWFsaXphdGlvbiBmb3IgbGF0ZXIgcmVmZXJlbmNlLlxuICAgKi9cbiAgbmFtZT86IHN0cmluZztcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgZGVzY3JpcHRpb24gb2YgdGhpcyBtYXJrIGZvciBjb21tZW50aW5nIHB1cnBvc2UuXG4gICAqIFRoaXMgcHJvcGVydHkgaGFzIG5vIGVmZmVjdCBvbiB0aGUgb3V0cHV0IHZpc3VhbGl6YXRpb24uXG4gICAqL1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIGRhdGEgc291cmNlXG4gICAqL1xuICBkYXRhPzogRGF0YTtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGRlc2NyaWJpbmcgZmlsdGVyIGFuZCBuZXcgZmllbGQgY2FsY3VsYXRpb24uXG4gICAqL1xuICB0cmFuc2Zvcm0/OiBUcmFuc2Zvcm07XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBjb25maWc/OiBDb25maWc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5pdFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBUaGUgbWFyayB0eXBlLlxuICAgKiBPbmUgb2YgYFwiYmFyXCJgLCBgXCJjaXJjbGVcImAsIGBcInNxdWFyZVwiYCwgYFwidGlja1wiYCwgYFwibGluZVwiYCxcbiAgICogYFwiYXJlYVwiYCwgYFwicG9pbnRcImAsIGBcInJ1bGVcImAsIGFuZCBgXCJ0ZXh0XCJgLlxuICAgKi9cbiAgbWFyazogTWFyaztcblxuICAvKipcbiAgICogQSBrZXktdmFsdWUgbWFwcGluZyBiZXR3ZWVuIGVuY29kaW5nIGNoYW5uZWxzIGFuZCBkZWZpbml0aW9uIG9mIGZpZWxkcy5cbiAgICovXG4gIGVuY29kaW5nPzogVW5pdEVuY29kaW5nO1xufVxuXG4vKipcbiAqIFNjaGVtYSBmb3IgYSB1bml0IFZlZ2EtTGl0ZSBzcGVjaWZpY2F0aW9uLCB3aXRoIHRoZSBzeW50YWN0aWMgc3VnYXIgZXh0ZW5zaW9uczpcbiAqIC0gYHJvd2AgYW5kIGBjb2x1bW5gIGFyZSBpbmNsdWRlZCBpbiB0aGUgZW5jb2RpbmcuXG4gKiAtIChGdXR1cmUpIGxhYmVsLCBib3ggcGxvdFxuICpcbiAqIE5vdGU6IHRoZSBzcGVjIGNvdWxkIGNvbnRhaW4gZmFjZXQuXG4gKlxuICogQHJlcXVpcmVkIFtcIm1hcmtcIiwgXCJlbmNvZGluZ1wiXVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuZGVkVW5pdFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBUaGUgbWFyayB0eXBlLlxuICAgKiBPbmUgb2YgYFwiYmFyXCJgLCBgXCJjaXJjbGVcImAsIGBcInNxdWFyZVwiYCwgYFwidGlja1wiYCwgYFwibGluZVwiYCxcbiAgICogYFwiYXJlYVwiYCwgYFwicG9pbnRcImAsIGBcInJ1bGVcImAsIGFuZCBgXCJ0ZXh0XCJgLlxuICAgKi9cbiAgbWFyazogTWFyaztcblxuICAvKipcbiAgICogQSBrZXktdmFsdWUgbWFwcGluZyBiZXR3ZWVuIGVuY29kaW5nIGNoYW5uZWxzIGFuZCBkZWZpbml0aW9uIG9mIGZpZWxkcy5cbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICBmYWNldDogRmFjZXQ7XG4gIHNwZWM6IExheWVyU3BlYyB8IFVuaXRTcGVjO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheWVyU3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFVuaXQgc3BlY3MgdGhhdCB3aWxsIGJlIGxheWVyZWQuXG4gICAqL1xuICBsYXllcnM6IFVuaXRTcGVjW107XG59XG5cbi8qKiBUaGlzIGlzIGZvciB0aGUgZnV0dXJlIHNjaGVtYSAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHRlbmRlZEZhY2V0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgZmFjZXQ6IEZhY2V0O1xuXG4gIHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMgfCBGYWNldFNwZWM7XG59XG5cbmV4cG9ydCB0eXBlIEV4dGVuZGVkU3BlYyA9IEV4dGVuZGVkVW5pdFNwZWMgfCBGYWNldFNwZWMgfCBMYXllclNwZWM7XG5leHBvcnQgdHlwZSBTcGVjID0gVW5pdFNwZWMgfCBGYWNldFNwZWMgfCBMYXllclNwZWM7XG5cbi8qIEN1c3RvbSB0eXBlIGd1YXJkcyAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNGYWNldFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBGYWNldFNwZWMge1xuICByZXR1cm4gc3BlY1snZmFjZXQnXSAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgRXh0ZW5kZWRVbml0U3BlYyB7XG4gIGlmIChpc1NvbWVVbml0U3BlYyhzcGVjKSkge1xuICAgIGNvbnN0IGhhc1JvdyA9IGhhcyhzcGVjLmVuY29kaW5nLCBST1cpO1xuICAgIGNvbnN0IGhhc0NvbHVtbiA9IGhhcyhzcGVjLmVuY29kaW5nLCBDT0xVTU4pO1xuXG4gICAgcmV0dXJuIGhhc1JvdyB8fCBoYXNDb2x1bW47XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VuaXRTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgVW5pdFNwZWMge1xuICBpZiAoaXNTb21lVW5pdFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gIWlzRXh0ZW5kZWRVbml0U3BlYyhzcGVjKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU29tZVVuaXRTcGVjKHNwZWM6IEV4dGVuZGVkU3BlYyk6IHNwZWMgaXMgRXh0ZW5kZWRVbml0U3BlYyB8IFVuaXRTcGVjIHtcbiAgcmV0dXJuIHNwZWNbJ21hcmsnXSAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMYXllclNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBMYXllclNwZWMge1xuICByZXR1cm4gc3BlY1snbGF5ZXJzJ10gIT09IHVuZGVmaW5lZDtcbn1cblxuXG4vKipcbiAqIERlY29tcG9zZSBleHRlbmRlZCB1bml0IHNwZWNzIGludG8gY29tcG9zaXRpb24gb2YgcHVyZSB1bml0IHNwZWNzLlxuICovXG4vLyBUT0RPOiBjb25zaWRlciBtb3ZpbmcgdGhpcyB0byBhbm90aGVyIGZpbGUuICBNYXliZSB2bC5zcGVjLm5vcm1hbGl6ZSBvciB2bC5ub3JtYWxpemVcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUoc3BlYzogRXh0ZW5kZWRTcGVjKTogU3BlYyB7XG4gIGlmIChpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplRXh0ZW5kZWRVbml0U3BlYyhzcGVjKTtcbiAgfVxuICBpZiAoaXNVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiBub3JtYWxpemVVbml0U3BlYyhzcGVjKTtcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUV4dGVuZGVkVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IFNwZWMge1xuICAgIGNvbnN0IGhhc1JvdyA9IGhhcyhzcGVjLmVuY29kaW5nLCBST1cpO1xuICAgIGNvbnN0IGhhc0NvbHVtbiA9IGhhcyhzcGVjLmVuY29kaW5nLCBDT0xVTU4pO1xuXG4gICAgLy8gVE9ETzogQGFydmluZCBwbGVhc2UgIGFkZCBpbnRlcmFjdGlvbiBzeW50YXggaGVyZVxuICAgIGxldCBlbmNvZGluZyA9IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nKTtcbiAgICBkZWxldGUgZW5jb2RpbmcuY29sdW1uO1xuICAgIGRlbGV0ZSBlbmNvZGluZy5yb3c7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgc3BlYy5uYW1lID8geyBuYW1lOiBzcGVjLm5hbWUgfSA6IHt9LFxuICAgICAgc3BlYy5kZXNjcmlwdGlvbiA/IHsgZGVzY3JpcHRpb246IHNwZWMuZGVzY3JpcHRpb24gfSA6IHt9LFxuICAgICAgeyBkYXRhOiBzcGVjLmRhdGEgfSxcbiAgICAgIHNwZWMudHJhbnNmb3JtID8geyB0cmFuc2Zvcm06IHNwZWMudHJhbnNmb3JtIH0gOiB7fSxcbiAgICAgIHtcbiAgICAgICAgZmFjZXQ6IGV4dGVuZChcbiAgICAgICAgICBoYXNSb3cgPyB7IHJvdzogc3BlYy5lbmNvZGluZy5yb3cgfSA6IHt9LFxuICAgICAgICAgIGhhc0NvbHVtbiA/IHsgY29sdW1uOiBzcGVjLmVuY29kaW5nLmNvbHVtbiB9IDoge31cbiAgICAgICAgKSxcbiAgICAgICAgc3BlYzogbm9ybWFsaXplVW5pdFNwZWMoe1xuICAgICAgICAgIG1hcms6IHNwZWMubWFyayxcbiAgICAgICAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBzcGVjLmNvbmZpZyA/IHsgY29uZmlnOiBzcGVjLmNvbmZpZyB9IDoge31cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVW5pdFNwZWMoc3BlYzogVW5pdFNwZWMpOiBTcGVjIHtcbiAgY29uc3QgY29uZmlnID0gc3BlYy5jb25maWc7XG4gIGNvbnN0IG92ZXJsYXlDb25maWcgPSBjb25maWcgJiYgY29uZmlnLm92ZXJsYXk7XG4gIGNvbnN0IG92ZXJsYXlXaXRoTGluZSA9IG92ZXJsYXlDb25maWcgICYmIHNwZWMubWFyayA9PT0gQVJFQSAmJlxuICAgIGNvbnRhaW5zKFtBcmVhT3ZlcmxheS5MSU5FUE9JTlQsIEFyZWFPdmVybGF5LkxJTkVdLCBvdmVybGF5Q29uZmlnLmFyZWEpO1xuICBjb25zdCBvdmVybGF5V2l0aFBvaW50ID0gb3ZlcmxheUNvbmZpZyAmJiAoXG4gICAgKG92ZXJsYXlDb25maWcubGluZSAmJiBzcGVjLm1hcmsgPT09IExJTkUpIHx8XG4gICAgKG92ZXJsYXlDb25maWcuYXJlYSA9PT0gQXJlYU92ZXJsYXkuTElORVBPSU5UICYmIHNwZWMubWFyayA9PT0gQVJFQSlcbiAgKTtcblxuICAvLyBUT0RPOiB0aG9yb3VnaGx5IHRlc3RcbiAgaWYgKHNwZWMubWFyayA9PT0gRVJST1JCQVIpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplRXJyb3JCYXJVbml0U3BlYyhzcGVjKTtcbiAgfVxuICAvLyBUT0RPOiB0aG9yb3VnaGx5IHRlc3RcbiAgaWYgKGlzUmFuZ2VkKHNwZWMuZW5jb2RpbmcpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZVJhbmdlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG5cbiAgaWYgKGlzU3RhY2tlZChzcGVjKSkge1xuICAgIC8vIFdlIGNhbid0IG92ZXJsYXkgc3RhY2tlZCBhcmVhIHlldCFcbiAgICByZXR1cm4gc3BlYztcbiAgfVxuXG4gIGlmIChvdmVybGF5V2l0aFBvaW50IHx8IG92ZXJsYXlXaXRoTGluZSkge1xuICAgIHJldHVybiBub3JtYWxpemVPdmVybGF5KHNwZWMsIG92ZXJsYXlXaXRoUG9pbnQsIG92ZXJsYXlXaXRoTGluZSk7XG4gIH1cbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVSYW5nZWRVbml0U3BlYyhzcGVjOiBVbml0U3BlYyk6IFNwZWMge1xuICBpZiAoc3BlYy5lbmNvZGluZykge1xuICAgIGNvbnN0IGhhc1ggPSBoYXMoc3BlYy5lbmNvZGluZywgWCk7XG4gICAgY29uc3QgaGFzWSA9IGhhcyhzcGVjLmVuY29kaW5nLCBZKTtcbiAgICBjb25zdCBoYXNYMiA9IGhhcyhzcGVjLmVuY29kaW5nLCBYMik7XG4gICAgY29uc3QgaGFzWTIgPSBoYXMoc3BlYy5lbmNvZGluZywgWTIpO1xuICAgIGlmICgoaGFzWDIgJiYgIWhhc1gpIHx8IChoYXNZMiAmJiAhaGFzWSkpIHtcbiAgICAgIGxldCBub3JtYWxpemVkU3BlYyA9IGR1cGxpY2F0ZShzcGVjKTtcbiAgICAgIGlmIChoYXNYMiAmJiAhaGFzWCkge1xuICAgICAgICBub3JtYWxpemVkU3BlYy5lbmNvZGluZy54ID0gbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueDI7XG4gICAgICAgIGRlbGV0ZSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy54MjtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNZMiAmJiAhaGFzWSkge1xuICAgICAgICBub3JtYWxpemVkU3BlYy5lbmNvZGluZy55ID0gbm9ybWFsaXplZFNwZWMuZW5jb2RpbmcueTI7XG4gICAgICAgIGRlbGV0ZSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy55MjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRTcGVjO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUVycm9yQmFyVW5pdFNwZWMoc3BlYzogVW5pdFNwZWMpOiBTcGVjIHtcbiAgLy8gRklYTUUgY29ycmVjdGx5IGRlYWwgd2l0aCBjb2xvciBhbmQgb3BhY2l0eVxuXG4gIGxldCBsYXllclNwZWMgPSBleHRlbmQoc3BlYy5uYW1lID8ge25hbWU6IHNwZWMubmFtZX0gOiB7fSxcbiAgICBzcGVjLmRlc2NyaXB0aW9uID8ge2Rlc2NyaXB0aW9uOiBzcGVjLmRlc2NyaXB0aW9ufSA6IHt9LFxuICAgIHNwZWMuZGF0YSA/IHtkYXRhOiBzcGVjLmRhdGF9IDoge30sXG4gICAgc3BlYy50cmFuc2Zvcm0gPyB7dHJhbnNmb3JtOiBzcGVjLnRyYW5zZm9ybX0gOiB7fSxcbiAgICBzcGVjLmNvbmZpZyA/IHtjb25maWc6IHNwZWMuY29uZmlnfSA6IHt9LCB7bGF5ZXJzOiBbXX1cbiAgKTtcbiAgaWYgKCFzcGVjLmVuY29kaW5nKSB7XG4gICAgcmV0dXJuIGxheWVyU3BlYztcbiAgfVxuICBpZiAoc3BlYy5tYXJrID09PSBFUlJPUkJBUikge1xuICAgIGNvbnN0IHJ1bGVTcGVjID0ge1xuICAgICAgbWFyazogUlVMRSxcbiAgICAgIGVuY29kaW5nOiBleHRlbmQoXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueCA/IHt4OiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy54KX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy55ID8ge3k6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnkpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLngyID8ge3gyOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy54Mil9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueTIgPyB7eTI6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnkyKX0gOiB7fSxcbiAgICAgICAge30pXG4gICAgfTtcbiAgICBjb25zdCBsb3dlclRpY2tTcGVjID0ge1xuICAgICAgbWFyazogVElDSyxcbiAgICAgIGVuY29kaW5nOiBleHRlbmQoXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueCA/IHt4OiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy54KX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy55ID8ge3k6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnkpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnNpemUgPyB7c2l6ZTogZHVwbGljYXRlKHNwZWMuZW5jb2Rpbmcuc2l6ZSl9IDoge30sXG4gICAgICAgIHt9KVxuICAgIH07XG4gICAgY29uc3QgdXBwZXJUaWNrU3BlYyA9IHtcbiAgICAgIG1hcms6IFRJQ0ssXG4gICAgICBlbmNvZGluZzogZXh0ZW5kKHtcbiAgICAgICAgeDogc3BlYy5lbmNvZGluZy54MiA/IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngyKSA6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngpLFxuICAgICAgICB5OiBzcGVjLmVuY29kaW5nLnkyID8gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueTIpIDogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueSlcbiAgICAgIH0sIHNwZWMuZW5jb2Rpbmcuc2l6ZSA/IHtzaXplOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy5zaXplKX0gOiB7fSlcbiAgICB9O1xuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChub3JtYWxpemVVbml0U3BlYyhydWxlU3BlYykpO1xuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChub3JtYWxpemVVbml0U3BlYyhsb3dlclRpY2tTcGVjKSk7XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKG5vcm1hbGl6ZVVuaXRTcGVjKHVwcGVyVGlja1NwZWMpKTtcbiAgfVxuICByZXR1cm4gbGF5ZXJTcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplT3ZlcmxheShzcGVjOiBVbml0U3BlYywgb3ZlcmxheVdpdGhQb2ludDogYm9vbGVhbiwgb3ZlcmxheVdpdGhMaW5lOiBib29sZWFuKTogTGF5ZXJTcGVjIHtcbiAgbGV0IG91dGVyUHJvcHMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnZGF0YScsICd0cmFuc2Zvcm0nXTtcbiAgbGV0IGJhc2VTcGVjID0gb21pdChzcGVjLCBvdXRlclByb3BzLmNvbmNhdCgnY29uZmlnJykpO1xuXG4gIGxldCBiYXNlQ29uZmlnID0gZHVwbGljYXRlKHNwZWMuY29uZmlnKTtcbiAgZGVsZXRlIGJhc2VDb25maWcub3ZlcmxheTtcbiAgLy8gVE9ETzogcmVtb3ZlIHNoYXBlLCBzaXplXG5cbiAgY29uc3QgbGF5ZXJTcGVjID0gZXh0ZW5kKFxuICAgIHBpY2soc3BlYywgb3V0ZXJQcm9wcyksXG4gICAgeyBsYXllcnM6IFtiYXNlU3BlY10gfSxcbiAgICBrZXlzKGJhc2VDb25maWcpLmxlbmd0aCA+IDAgPyB7IGNvbmZpZzogYmFzZUNvbmZpZyB9IDoge31cbiAgKTtcblxuICBpZiAob3ZlcmxheVdpdGhMaW5lKSB7XG4gICAgLy8gVE9ETzogYWRkIG5hbWUgd2l0aCBzdWZmaXhcbiAgICBsZXQgbGluZVNwZWMgPSBkdXBsaWNhdGUoYmFzZVNwZWMpO1xuICAgIGxpbmVTcGVjLm1hcmsgPSBMSU5FO1xuICAgIC8vIFRPRE86IHJlbW92ZSBzaGFwZSwgc2l6ZVxuICAgIGxldCBtYXJrQ29uZmlnID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3ZlcmxheUNvbmZpZy5saW5lU3R5bGUsIHNwZWMuY29uZmlnLm92ZXJsYXkubGluZVN0eWxlKTtcbiAgICBpZiAoa2V5cyhtYXJrQ29uZmlnKS5sZW5ndGggPiAwKSB7XG4gICAgICBsaW5lU3BlYy5jb25maWcgPSB7bWFyazogbWFya0NvbmZpZ307XG4gICAgfVxuXG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKGxpbmVTcGVjKTtcbiAgfVxuXG4gIGlmIChvdmVybGF5V2l0aFBvaW50KSB7XG4gICAgLy8gVE9ETzogYWRkIG5hbWUgd2l0aCBzdWZmaXhcbiAgICBsZXQgcG9pbnRTcGVjID0gZHVwbGljYXRlKGJhc2VTcGVjKTtcbiAgICBwb2ludFNwZWMubWFyayA9IFBPSU5UO1xuICAgIGxldCBtYXJrQ29uZmlnID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3ZlcmxheUNvbmZpZy5wb2ludFN0eWxlLCBzcGVjLmNvbmZpZy5vdmVybGF5LnBvaW50U3R5bGUpOztcbiAgICBpZiAoa2V5cyhtYXJrQ29uZmlnKS5sZW5ndGggPiAwKSB7XG4gICAgICBwb2ludFNwZWMuY29uZmlnID0ge21hcms6IG1hcmtDb25maWd9O1xuICAgIH1cbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gocG9pbnRTcGVjKTtcbiAgfVxuICByZXR1cm4gbGF5ZXJTcGVjO1xufVxuXG4vLyBUT0RPOiBhZGQgdmwuc3BlYy52YWxpZGF0ZSAmIG1vdmUgc3R1ZmYgZnJvbSB2bC52YWxpZGF0ZSB0byBoZXJlXG5cbmV4cG9ydCBmdW5jdGlvbiBhbHdheXNOb09jY2x1c2lvbihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogYm9vbGVhbiB7XG4gIC8vIEZJWE1FIHJhdyBPeFEgd2l0aCAjIG9mIHJvd3MgPSAjIG9mIE9cbiAgcmV0dXJuIHZsRW5jb2RpbmcuaXNBZ2dyZWdhdGUoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEZpZWxkRGVmW10ge1xuICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIG9uY2Ugd2UgaGF2ZSBjb21wb3NpdGlvblxuICByZXR1cm4gdmxFbmNvZGluZy5maWVsZERlZnMoc3BlYy5lbmNvZGluZyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xlYW5TcGVjKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgLy8gVE9ETzogbW92ZSB0b1NwZWMgdG8gaGVyZSFcbiAgcmV0dXJuIHNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0YWNrZWQoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IGJvb2xlYW4ge1xuICByZXR1cm4gc3RhY2soc3BlYy5tYXJrLCBzcGVjLmVuY29kaW5nLCBzcGVjLmNvbmZpZykgIT09IG51bGw7XG59XG5cbi8vIFRPRE8gcmV2aXNlXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgY29uc3Qgb2xkZW5jID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICBlbmNvZGluZy54ID0gb2xkZW5jLnk7XG4gIGVuY29kaW5nLnkgPSBvbGRlbmMueDtcbiAgZW5jb2Rpbmcucm93ID0gb2xkZW5jLmNvbHVtbjtcbiAgZW5jb2RpbmcuY29sdW1uID0gb2xkZW5jLnJvdztcbiAgc3BlYy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICByZXR1cm4gc3BlYztcbn1cbiIsImltcG9ydCB7Q2hhbm5lbCwgU1RBQ0tfR1JPVVBfQ0hBTk5FTFMsIFgsIFl9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtFbmNvZGluZywgaGFzLCBpc0FnZ3JlZ2F0ZX0gZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge01hcmssIEJBUiwgQVJFQX0gZnJvbSAnLi9tYXJrJztcbmltcG9ydCB7Y29udGFpbnN9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBlbnVtIFN0YWNrT2Zmc2V0IHtcbiAgWkVSTyA9ICd6ZXJvJyBhcyBhbnksXG4gIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbiAgTk9STUFMSVpFID0gJ25vcm1hbGl6ZScgYXMgYW55LFxuICBOT05FID0gJ25vbmUnIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrUHJvcGVydGllcyB7XG4gIC8qKiBEaW1lbnNpb24gYXhpcyBvZiB0aGUgc3RhY2sgKCd4JyBvciAneScpLiAqL1xuICBncm91cGJ5Q2hhbm5lbDogQ2hhbm5lbDtcblxuICAvKiogTWVhc3VyZSBheGlzIG9mIHRoZSBzdGFjayAoJ3gnIG9yICd5JykuICovXG4gIGZpZWxkQ2hhbm5lbDogQ2hhbm5lbDtcblxuICAvKiogU3RhY2stYnkgY2hhbm5lbHMgZS5nLiwgY29sb3IsIGRldGFpbCAqL1xuICBzdGFja0J5Q2hhbm5lbHM6IENoYW5uZWxbXTtcblxuICAvKiogU3RhY2sgb2Zmc2V0IHByb3BlcnR5LiAqL1xuICBvZmZzZXQ6IFN0YWNrT2Zmc2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2sobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IFN0YWNrUHJvcGVydGllcyB7XG4gIGNvbnN0IHN0YWNrZWQgPSAoY29uZmlnICYmIGNvbmZpZy5tYXJrKSA/IGNvbmZpZy5tYXJrLnN0YWNrZWQgOiB1bmRlZmluZWQ7XG5cbiAgLy8gU2hvdWxkIG5vdCBoYXZlIHN0YWNrIGV4cGxpY2l0bHkgZGlzYWJsZWRcbiAgaWYgKGNvbnRhaW5zKFtTdGFja09mZnNldC5OT05FLCBudWxsLCBmYWxzZV0sIHN0YWNrZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTaG91bGQgaGF2ZSBzdGFja2FibGUgbWFya1xuICBpZiAoIWNvbnRhaW5zKFtCQVIsIEFSRUFdLCBtYXJrKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU2hvdWxkIGJlIGFnZ3JlZ2F0ZSBwbG90XG4gIGlmICghaXNBZ2dyZWdhdGUoZW5jb2RpbmcpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTaG91bGQgaGF2ZSBncm91cGluZyBsZXZlbCBvZiBkZXRhaWxcbiAgY29uc3Qgc3RhY2tCeUNoYW5uZWxzID0gU1RBQ0tfR1JPVVBfQ0hBTk5FTFMucmVkdWNlKChzYywgY2hhbm5lbCkgPT4ge1xuICAgIGlmIChoYXMoZW5jb2RpbmcsIGNoYW5uZWwpICYmICFlbmNvZGluZ1tjaGFubmVsXS5hZ2dyZWdhdGUpIHtcbiAgICAgIHNjLnB1c2goY2hhbm5lbCk7XG4gICAgfVxuICAgIHJldHVybiBzYztcbiAgfSwgW10pO1xuXG4gIGlmIChzdGFja0J5Q2hhbm5lbHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBIYXMgb25seSBvbmUgYWdncmVnYXRlIGF4aXNcbiAgY29uc3QgaGFzWEZpZWxkID0gaGFzKGVuY29kaW5nLCBYKTtcbiAgY29uc3QgaGFzWUZpZWxkID0gaGFzKGVuY29kaW5nLCBZKTtcbiAgY29uc3QgeElzQWdncmVnYXRlID0gaGFzWEZpZWxkICYmICEhZW5jb2RpbmcueC5hZ2dyZWdhdGU7XG4gIGNvbnN0IHlJc0FnZ3JlZ2F0ZSA9IGhhc1lGaWVsZCAmJiAhIWVuY29kaW5nLnkuYWdncmVnYXRlO1xuXG4gIGlmICh4SXNBZ2dyZWdhdGUgIT09IHlJc0FnZ3JlZ2F0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cGJ5Q2hhbm5lbDogeElzQWdncmVnYXRlID8gKGhhc1lGaWVsZCA/IFkgOiBudWxsKSA6IChoYXNYRmllbGQgPyBYIDogbnVsbCksXG4gICAgICBmaWVsZENoYW5uZWw6IHhJc0FnZ3JlZ2F0ZSA/IFggOiBZLFxuICAgICAgc3RhY2tCeUNoYW5uZWxzOiBzdGFja0J5Q2hhbm5lbHMsXG4gICAgICBvZmZzZXQ6IHN0YWNrZWQgfHwgU3RhY2tPZmZzZXQuWkVST1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQge0NPTFVNTiwgUk9XLCBTSEFQRSwgQ09MT1IsIENoYW5uZWx9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQge0RhdGVUaW1lRXhwciwgZGF0ZVRpbWVFeHByfSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7RGljdCwgY29udGFpbnMsIGtleXMsIHJhbmdlfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZW51bSBUaW1lVW5pdCB7XG4gIFlFQVIgPSAneWVhcicgYXMgYW55LFxuICBNT05USCA9ICdtb250aCcgYXMgYW55LFxuICBEQVkgPSAnZGF5JyBhcyBhbnksXG4gIERBVEUgPSAnZGF0ZScgYXMgYW55LFxuICBIT1VSUyA9ICdob3VycycgYXMgYW55LFxuICBNSU5VVEVTID0gJ21pbnV0ZXMnIGFzIGFueSxcbiAgU0VDT05EUyA9ICdzZWNvbmRzJyBhcyBhbnksXG4gIE1JTExJU0VDT05EUyA9ICdtaWxsaXNlY29uZHMnIGFzIGFueSxcbiAgWUVBUk1PTlRIID0gJ3llYXJtb250aCcgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFID0gJ3llYXJtb250aGRhdGUnIGFzIGFueSxcbiAgWUVBUk1PTlRIREFURUhPVVJTID0gJ3llYXJtb250aGRhdGVob3VycycgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFSE9VUlNNSU5VVEVTID0gJ3llYXJtb250aGRhdGVob3Vyc21pbnV0ZXMnIGFzIGFueSxcbiAgWUVBUk1PTlRIREFURUhPVVJTTUlOVVRFU1NFQ09ORFMgPSAneWVhcm1vbnRoZGF0ZWhvdXJzbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgSE9VUlNNSU5VVEVTID0gJ2hvdXJzbWludXRlcycgYXMgYW55LFxuICBIT1VSU01JTlVURVNTRUNPTkRTID0gJ2hvdXJzbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgTUlOVVRFU1NFQ09ORFMgPSAnbWludXRlc3NlY29uZHMnIGFzIGFueSxcbiAgU0VDT05EU01JTExJU0VDT05EUyA9ICdzZWNvbmRzbWlsbGlzZWNvbmRzJyBhcyBhbnksXG4gIFFVQVJURVIgPSAncXVhcnRlcicgYXMgYW55LFxuICBZRUFSUVVBUlRFUiA9ICd5ZWFycXVhcnRlcicgYXMgYW55LFxuICBRVUFSVEVSTU9OVEggPSAncXVhcnRlcm1vbnRoJyBhcyBhbnksXG4gIFlFQVJRVUFSVEVSTU9OVEggPSAneWVhcnF1YXJ0ZXJtb250aCcgYXMgYW55LFxufVxuXG4vKiogVGltZSBVbml0IHRoYXQgb25seSBjb3JyZXNwb25kcyB0byBvbmx5IG9uZSBwYXJ0IG9mIERhdGUgb2JqZWN0cy4gKi9cbmV4cG9ydCBjb25zdCBTSU5HTEVfVElNRVVOSVRTID0gW1xuICBUaW1lVW5pdC5ZRUFSLFxuICBUaW1lVW5pdC5RVUFSVEVSLFxuICBUaW1lVW5pdC5NT05USCxcbiAgVGltZVVuaXQuREFZLFxuICBUaW1lVW5pdC5EQVRFLFxuICBUaW1lVW5pdC5IT1VSUyxcbiAgVGltZVVuaXQuTUlOVVRFUyxcbiAgVGltZVVuaXQuU0VDT05EUyxcbiAgVGltZVVuaXQuTUlMTElTRUNPTkRTLFxuXTtcblxuY29uc3QgU0lOR0xFX1RJTUVVTklUX0lOREVYOiBEaWN0PGJvb2xlYW4+ID0gU0lOR0xFX1RJTUVVTklUUy5yZWR1Y2UoKGQsIHRpbWVVbml0KSA9PiB7XG4gIGRbdGltZVVuaXRdID0gdHJ1ZTtcbiAgcmV0dXJuIGQ7XG59LCB7fSBhcyBEaWN0PGJvb2xlYW4+KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2luZ2xlVGltZVVuaXQodGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gIHJldHVybiAhIVNJTkdMRV9USU1FVU5JVF9JTkRFWFt0aW1lVW5pdF07XG59XG5cbmV4cG9ydCBjb25zdCBNVUxUSV9USU1FVU5JVFMgPSBbXG4gIFRpbWVVbml0LllFQVJRVUFSVEVSLFxuICBUaW1lVW5pdC5ZRUFSUVVBUlRFUk1PTlRILFxuICBUaW1lVW5pdC5ZRUFSTU9OVEgsXG4gIFRpbWVVbml0LllFQVJNT05USERBVEUsXG4gIFRpbWVVbml0LllFQVJNT05USERBVEVIT1VSUyxcbiAgVGltZVVuaXQuWUVBUk1PTlRIREFURUhPVVJTTUlOVVRFUyxcbiAgVGltZVVuaXQuWUVBUk1PTlRIREFURUhPVVJTTUlOVVRFU1NFQ09ORFMsXG4gIFRpbWVVbml0LlFVQVJURVJNT05USCxcbiAgVGltZVVuaXQuSE9VUlNNSU5VVEVTLFxuICBUaW1lVW5pdC5IT1VSU01JTlVURVNTRUNPTkRTLFxuICBUaW1lVW5pdC5NSU5VVEVTU0VDT05EUyxcbiAgVGltZVVuaXQuU0VDT05EU01JTExJU0VDT05EUyxcbl07XG5cbmNvbnN0IE1VTFRJX1RJTUVVTklUX0lOREVYOiBEaWN0PGJvb2xlYW4+ID0gTVVMVElfVElNRVVOSVRTLnJlZHVjZSgoZCwgdGltZVVuaXQpID0+IHtcbiAgZFt0aW1lVW5pdF0gPSB0cnVlO1xuICByZXR1cm4gZDtcbn0sIHt9IGFzIERpY3Q8Ym9vbGVhbj4pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aVRpbWVVbml0KHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICByZXR1cm4gISFNVUxUSV9USU1FVU5JVF9JTkRFWFt0aW1lVW5pdF07XG59XG5cbmV4cG9ydCBjb25zdCBUSU1FVU5JVFMgPSBTSU5HTEVfVElNRVVOSVRTLmNvbmNhdChNVUxUSV9USU1FVU5JVFMpO1xuXG4vKiogUmV0dXJucyB0cnVlIGlmIGZ1bGxUaW1lVW5pdCBjb250YWlucyB0aGUgdGltZVVuaXQsIGZhbHNlIG90aGVyd2lzZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1RpbWVVbml0KGZ1bGxUaW1lVW5pdDogVGltZVVuaXQsIHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICBsZXQgZnVsbFRpbWVVbml0U3RyID0gZnVsbFRpbWVVbml0LnRvU3RyaW5nKCk7XG4gIGxldCB0aW1lVW5pdFN0ciA9IHRpbWVVbml0LnRvU3RyaW5nKCk7XG4gIGNvbnN0IGluZGV4ID0gZnVsbFRpbWVVbml0U3RyLmluZGV4T2YodGltZVVuaXRTdHIpO1xuICByZXR1cm4gaW5kZXggPiAtMSAmJlxuICAgIChcbiAgICAgIHRpbWVVbml0ICE9PSBUaW1lVW5pdC5TRUNPTkRTIHx8XG4gICAgICBpbmRleCA9PT0gMCB8fFxuICAgICAgZnVsbFRpbWVVbml0U3RyLmNoYXJBdChpbmRleC0xKSAhPT0gJ2knIC8vIGV4Y2x1ZGUgbWlsbGlzZWNvbmRzXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTY2FsZVR5cGUodGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgY2FzZSBUaW1lVW5pdC5IT1VSUzpcbiAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOlxuICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgIHJldHVybiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgfVxuICAvLyBkYXRlLCB5ZWFyLCBtaW51dGUsIHNlY29uZCwgeWVhcm1vbnRoLCBtb250aGRheSwgLi4uXG4gIHJldHVybiBTY2FsZVR5cGUuVElNRTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIFZlZ2EgZXhwcmVzc3Npb24gZm9yIGEgZ2l2ZW4gdGltZVVuaXQgYW5kIGZpZWxkUmVmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZEV4cHIoZnVsbFRpbWVVbml0OiBUaW1lVW5pdCwgZmllbGQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpZWxkUmVmID0gJ2RhdHVtLicgKyBmaWVsZDtcblxuICBmdW5jdGlvbiBmdW5jKHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICAgIGlmICh0aW1lVW5pdCA9PT0gVGltZVVuaXQuUVVBUlRFUikge1xuICAgICAgLy8gRGl2aWRlIGJ5IDMgdG8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHF1YXJ0ZXIgbnVtYmVyLCBtdWx0aXBseSBieSAzXG4gICAgICAvLyB0byBzY2FsZSB0byB0aGUgZmlyc3QgbW9udGggb2YgdGhlIGNvcnJlc3BvbmRpbmcgcXVhcnRlcigwLDMsNiw5KS5cbiAgICAgIHJldHVybiAnZmxvb3IobW9udGgoJyArIGZpZWxkUmVmICsgJyknICsgJy8zKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aW1lVW5pdCArICcoJyArIGZpZWxkUmVmICsgJyknIDtcbiAgICB9XG4gIH1cblxuICBsZXQgZDogRGF0ZVRpbWVFeHByID0gU0lOR0xFX1RJTUVVTklUUy5yZWR1Y2UoKF9kLCB0dTogVGltZVVuaXQpID0+IHtcbiAgICBpZiAoY29udGFpbnNUaW1lVW5pdChmdWxsVGltZVVuaXQsIHR1KSkge1xuICAgICAgX2RbdHVdID0gZnVuYyh0dSk7XG4gICAgfVxuICAgIHJldHVybiBfZDtcbiAgfSwge30pO1xuXG4gIGlmIChkLmRheSAmJiBrZXlzKGQpLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RpbWUgdW5pdCBcIicrIGZ1bGxUaW1lVW5pdCArJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuIFdlIGFyZSByZXBsYWNpbmcgaXQgd2l0aCAnLFxuICAgICAgKGZ1bGxUaW1lVW5pdCsnJykucmVwbGFjZSgnZGF5JywgJ2RhdGUnKSsnLicpO1xuICAgIGRlbGV0ZSBkLmRheTtcbiAgICBkLmRhdGUgPSBmdW5jKFRpbWVVbml0LkRBVEUpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVUaW1lRXhwcihkKTtcbn1cblxuLyoqIEdlbmVyYXRlIHRoZSBjb21wbGV0ZSByYXcgZG9tYWluLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhd0RvbWFpbih0aW1lVW5pdDogVGltZVVuaXQsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgaWYgKGNvbnRhaW5zKFtST1csIENPTFVNTiwgU0hBUEUsIENPTE9SXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNjApO1xuICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5IT1VSUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCAyNCk7XG4gICAgY2FzZSBUaW1lVW5pdC5EQVk6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgNyk7XG4gICAgY2FzZSBUaW1lVW5pdC5EQVRFOlxuICAgICAgcmV0dXJuIHJhbmdlKDEsIDMyKTtcbiAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDEyKTtcbiAgICBjYXNlIFRpbWVVbml0LlFVQVJURVI6XG4gICAgICByZXR1cm4gWzAsMyw2LDldO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiByZXR1cm5zIHRoZSBzbWFsbGVzdCBuaWNlIHVuaXQgZm9yIHNjYWxlLm5pY2UgKi9cbmV4cG9ydCBmdW5jdGlvbiBzbWFsbGVzdFVuaXQodGltZVVuaXQpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5TRUNPTkRTKSkge1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSU5VVEVTKSkge1xuICAgIHJldHVybiAnbWludXRlJztcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICByZXR1cm4gJ2hvdXInO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBWSkgfHxcbiAgICAgIGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBVEUpKSB7XG4gICAgcmV0dXJuICdkYXknO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1PTlRIKSkge1xuICAgIHJldHVybiAnbW9udGgnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LllFQVIpKSB7XG4gICAgcmV0dXJuICd5ZWFyJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKiogcmV0dXJucyB0aGUgdGVtcGxhdGUgbmFtZSB1c2VkIGZvciBheGlzIGxhYmVscyBmb3IgYSB0aW1lIHVuaXQgKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0aW1lVW5pdDogVGltZVVuaXQsIGZpZWxkOiBzdHJpbmcsIHNob3J0VGltZUxhYmVsczogYm9vbGVhbik6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGV0IGRhdGVDb21wb25lbnRzID0gW107XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LllFQVIpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJXknIDogJyVZJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuUVVBUlRFUikpIHtcbiAgIC8vIHNwZWNpYWwgdGVtcGxhdGUgZm9yIHF1YXJ0ZXJcbiAgIGRhdGVDb21wb25lbnRzLnB1c2goJ1xcJ319UXt7JyArIGZpZWxkICsgJyB8IHF1YXJ0ZXJ9fXt7JyArIGZpZWxkICsgJyB8IHRpbWU6XFwnJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTU9OVEgpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJWInIDogJyVCJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goc2hvcnRUaW1lTGFiZWxzID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBVEUpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaCgnJWQnKTtcbiAgfVxuXG4gIGxldCB0aW1lQ29tcG9uZW50cyA9IFtdO1xuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclSCcpO1xuICB9XG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSU5VVEVTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVNJyk7XG4gIH1cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlNFQ09ORFMpKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJVMnKTtcbiAgfVxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTUlMTElTRUNPTkRTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVMJyk7XG4gIH1cblxuICBsZXQgb3V0ID0gW107XG4gIGlmIChkYXRlQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2goZGF0ZUNvbXBvbmVudHMuam9pbignLScpKTtcbiAgfVxuICBpZiAodGltZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKHRpbWVDb21wb25lbnRzLmpvaW4oJzonKSk7XG4gIH1cblxuICBpZiAob3V0Lmxlbmd0aCA+IDApIHtcbiAgLy8gY2xlYW4gdXAgZW1wdHkgZm9ybWF0dGluZyBleHByZXNzaW9ucyB0aGF0IG1heSBoYXZlIGJlZW4gZ2VuZXJhdGVkIGJ5IHRoZSBxdWFydGVyIHRpbWUgdW5pdFxuICAgY29uc3QgdGVtcGxhdGUgPSAne3snICsgZmllbGQgKyAnIHwgdGltZTpcXCcnICsgb3V0LmpvaW4oJyAnKSArICdcXCd9fSc7XG5cbiAgIC8vIEZJWE1FOiBSZW1vdmUgdGhpcyBSZWdFeHAgSGFjayEhIVxuICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCgne3snICsgZmllbGQgKyAnIFxcXFx8IHRpbWU6XFwnXFwnfX0nLCAnZycpLCAnJyk7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbiIsIi8qKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YSB0eXBlICovXG5cbmV4cG9ydCBlbnVtIFR5cGUge1xuICBRVUFOVElUQVRJVkUgPSAncXVhbnRpdGF0aXZlJyBhcyBhbnksXG4gIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICBURU1QT1JBTCA9ICd0ZW1wb3JhbCcgYXMgYW55LFxuICBOT01JTkFMID0gJ25vbWluYWwnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgUVVBTlRJVEFUSVZFID0gVHlwZS5RVUFOVElUQVRJVkU7XG5leHBvcnQgY29uc3QgT1JESU5BTCA9IFR5cGUuT1JESU5BTDtcbmV4cG9ydCBjb25zdCBURU1QT1JBTCA9IFR5cGUuVEVNUE9SQUw7XG5leHBvcnQgY29uc3QgTk9NSU5BTCA9IFR5cGUuTk9NSU5BTDtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gZnVsbCB0eXBlIG5hbWVzIHRvIHNob3J0IHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgU0hPUlRfVFlQRSA9IHtcbiAgcXVhbnRpdGF0aXZlOiAnUScsXG4gIHRlbXBvcmFsOiAnVCcsXG4gIG5vbWluYWw6ICdOJyxcbiAgb3JkaW5hbDogJ08nXG59O1xuLyoqXG4gKiBNYXBwaW5nIGZyb20gc2hvcnQgdHlwZSBuYW1lcyB0byBmdWxsIHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9GUk9NX1NIT1JUX1RZUEUgPSB7XG4gIFE6IFFVQU5USVRBVElWRSxcbiAgVDogVEVNUE9SQUwsXG4gIE86IE9SRElOQUwsXG4gIE46IE5PTUlOQUxcbn07XG5cbi8qKlxuICogR2V0IGZ1bGwsIGxvd2VyY2FzZSB0eXBlIG5hbWUgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSAgdHlwZVxuICogQHJldHVybiBGdWxsIHR5cGUgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxOYW1lKHR5cGU6IFR5cGUpOiBUeXBlIHtcbiAgY29uc3QgdHlwZVN0cmluZyA9IDxhbnk+dHlwZTsgIC8vIGZvcmNlIHR5cGUgYXMgc3RyaW5nIHNvIHdlIGNhbiB0cmFuc2xhdGUgc2hvcnQgdHlwZXNcbiAgcmV0dXJuIFRZUEVfRlJPTV9TSE9SVF9UWVBFW3R5cGVTdHJpbmcudG9VcHBlckNhc2UoKV0gfHwgLy8gc2hvcnQgdHlwZSBpcyB1cHBlcmNhc2UgYnkgZGVmYXVsdFxuICAgICAgICAgdHlwZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZGF0YWxpYi5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvanNvbi1zdGFibGUtc3RyaW5naWZ5LmQudHNcIi8+XG5cbmltcG9ydCAqIGFzIHN0cmluZ2lmeSBmcm9tICdqc29uLXN0YWJsZS1zdHJpbmdpZnknO1xuZXhwb3J0IHtrZXlzLCBleHRlbmQsIGR1cGxpY2F0ZSwgaXNBcnJheSwgdmFscywgdHJ1bmNhdGUsIHRvTWFwLCBpc09iamVjdCwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuaW1wb3J0IHtkdXBsaWNhdGUgYXMgX2R1cGxpY2F0ZX0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5leHBvcnQge3JhbmdlfSBmcm9tICdkYXRhbGliL3NyYy9nZW5lcmF0ZSc7XG5cbmltcG9ydCB7aXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgb2JqZWN0IHByb3BlcnRpZXMuXG4gKlxuICogRXhhbXBsZTogIChmcm9tIGxvZGFzaClcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqIHBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vIOKGkiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaWNrKG9iajogYW55LCBwcm9wczogc3RyaW5nW10pIHtcbiAgbGV0IGNvcHkgPSB7fTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGNvcHlbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIF8ucGljazsgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIG93blxuICogYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIG9iamVjdCB0aGF0IGFyZSBub3Qgb21pdHRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9taXQob2JqOiBhbnksIHByb3BzOiBzdHJpbmdbXSkge1xuICBsZXQgY29weSA9IF9kdXBsaWNhdGUob2JqKTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGRlbGV0ZSBjb3B5W3Byb3BdO1xuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKGE6IGFueSkge1xuICBpZiAoaXNTdHJpbmcoYSkgfHwgaXNOdW1iZXIoYSkgfHwgaXNCb29sZWFuKGEpKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKTtcbiAgfVxuICByZXR1cm4gc3RyaW5naWZ5KGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnM8VD4oYXJyYXk6IEFycmF5PFQ+LCBpdGVtOiBUKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pID4gLTE7XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBhcnJheSB3aXRob3V0IHRoZSBlbGVtZW50cyBpbiBpdGVtICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dDxUPihhcnJheTogQXJyYXk8VD4sIGV4Y2x1ZGVkSXRlbXM6IEFycmF5PFQ+KSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhY29udGFpbnMoZXhjbHVkZWRJdGVtcywgaXRlbSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248VD4oYXJyYXk6IEFycmF5PFQ+LCBvdGhlcjogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCh3aXRob3V0KG90aGVyLCBhcnJheSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmouZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoLmNhbGwodGhpc0FyZywgZik7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShvYmosIGY6IChhLCBpLCBkLCBrLCBvKSA9PiBhbnksIGluaXQsIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoucmVkdWNlKSB7XG4gICAgcmV0dXJuIG9iai5yZWR1Y2UuY2FsbCh0aGlzQXJnLCBmLCBpbml0KTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpbml0ID0gZi5jYWxsKHRoaXNBcmcsIGluaXQsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluaXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoubWFwKSB7XG4gICAgcmV0dXJuIG9iai5tYXAuY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmIChmKGFycltrXSwgaywgaSsrKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5PFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoIWYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnJheXM6IGFueVtdKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yIChsZXQgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0ICogYXMgZGxCaW4gZnJvbSAnZGF0YWxpYi9zcmMvYmlucy9iaW5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRiaW5zKHN0YXRzLCBtYXhiaW5zKSB7XG4gIHJldHVybiBkbEJpbih7XG4gICAgbWluOiBzdGF0cy5taW4sXG4gICAgbWF4OiBzdGF0cy5tYXgsXG4gICAgbWF4YmluczogbWF4Ymluc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZTxUPih2YWx1ZXM6IFRbXSwgZj86IChpdGVtOiBUKSA9PiBzdHJpbmcpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlOiBhbnkpIHtcbiAgY29uc29sZS53YXJuKCdbVkwgV2FybmluZ10nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLmVycm9yKCdbVkwgRXJyb3JdJywgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdDxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFN0cmluZ1NldCA9IERpY3Q8Ym9vbGVhbj47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gZGljaXRvbmFyaWVzIGRpc2FncmVlLiBBcHBsaWVzIG9ubHkgdG8gZGVmaW9uZWQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyPFQ+KGRpY3Q6IERpY3Q8VD4sIG90aGVyOiBEaWN0PFQ+KSB7XG4gIGZvciAobGV0IGtleSBpbiBkaWN0KSB7XG4gICAgaWYgKGRpY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG90aGVyW2tleV0gJiYgZGljdFtrZXldICYmIG90aGVyW2tleV0gIT09IGRpY3Rba2V5XSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG4vLyBUT0RPOiBtb3ZlIHRvIHZsLnNwZWMudmFsaWRhdG9yP1xuXG5pbXBvcnQge3RvTWFwfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtCQVJ9IGZyb20gJy4vbWFyayc7XG5cbmludGVyZmFjZSBSZXF1aXJlZENoYW5uZWxNYXAge1xuICBbbWFyazogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBFbmNvZGluZyBDaGFubmVscyBmb3IgZWFjaCBtYXJrIHR5cGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQOiBSZXF1aXJlZENoYW5uZWxNYXAgPSB7XG4gIHRleHQ6IFsndGV4dCddLFxuICBsaW5lOiBbJ3gnLCAneSddLFxuICBhcmVhOiBbJ3gnLCAneSddXG59O1xuXG5pbnRlcmZhY2UgU3VwcG9ydGVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiB7XG4gICAgW2NoYW5uZWw6IHN0cmluZ106IG51bWJlclxuICB9O1xufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBFbmNvZGluZyBDaGFubmVsIGZvciBlYWNoIG1hcmsgdHlwZVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0ge1xuICBiYXI6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnc2l6ZScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGxpbmU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLCAvLyBUT0RPOiBhZGQgc2l6ZSB3aGVuIFZlZ2Egc3VwcG9ydHNcbiAgYXJlYTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIHRpY2s6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLFxuICBjaXJjbGU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnXSksXG4gIHNxdWFyZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgcG9pbnQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnLCAnc2hhcGUnXSksXG4gIHRleHQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICdzaXplJywgJ2NvbG9yJywgJ3RleHQnXSkgLy8gVE9ETygjNzI0KSByZXZpc2Vcbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHNob3VsZCBhZGQgdmFsaWRhdGUgbWV0aG9kIGFuZFxuLy8gcmVxdWlyZXMgWlNjaGVtYSBpbiB0aGUgbWFpbiB2ZWdhLWxpdGUgcmVwb1xuXG4vKipcbiAqIEZ1cnRoZXIgY2hlY2sgaWYgZW5jb2RpbmcgbWFwcGluZyBvZiBhIHNwZWMgaXMgaW52YWxpZCBhbmRcbiAqIHJldHVybiBlcnJvciBpZiBpdCBpcyBpbnZhbGlkLlxuICpcbiAqIFRoaXMgY2hlY2tzIGlmXG4gKiAoMSkgYWxsIHRoZSByZXF1aXJlZCBlbmNvZGluZyBjaGFubmVscyBmb3IgdGhlIG1hcmsgdHlwZSBhcmUgc3BlY2lmaWVkXG4gKiAoMikgYWxsIHRoZSBzcGVjaWZpZWQgZW5jb2RpbmcgY2hhbm5lbHMgYXJlIHN1cHBvcnRlZCBieSB0aGUgbWFyayB0eXBlXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNwZWMgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UmVxdWlyZWRDaGFubmVsTWFwICA9IERlZmF1bHRSZXF1aXJlZENoYW5uZWxNYXB9ICByZXF1aXJlZENoYW5uZWxNYXBcbiAqIEBwYXJhbSAge1N1cHBvcnRlZENoYW5uZWxNYXAgPSBEZWZhdWx0U3VwcG9ydGVkQ2hhbm5lbE1hcH0gc3VwcG9ydGVkQ2hhbm5lbE1hcFxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm4gb25lIHJlYXNvbiB3aHkgdGhlIGVuY29kaW5nIGlzIGludmFsaWQsXG4gKiAgICAgICAgICAgICAgICAgIG9yIG51bGwgaWYgdGhlIGVuY29kaW5nIGlzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5jb2RpbmdNYXBwaW5nRXJyb3Ioc3BlYzogRXh0ZW5kZWRVbml0U3BlYyxcbiAgcmVxdWlyZWRDaGFubmVsTWFwOiBSZXF1aXJlZENoYW5uZWxNYXAgPSBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQLFxuICBzdXBwb3J0ZWRDaGFubmVsTWFwOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0gREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFXG4gICkge1xuICBsZXQgbWFyayA9IHNwZWMubWFyaztcbiAgbGV0IGVuY29kaW5nID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IHJlcXVpcmVkQ2hhbm5lbHMgPSByZXF1aXJlZENoYW5uZWxNYXBbbWFya107XG4gIGxldCBzdXBwb3J0ZWRDaGFubmVscyA9IHN1cHBvcnRlZENoYW5uZWxNYXBbbWFya107XG5cbiAgZm9yIChsZXQgaSBpbiByZXF1aXJlZENoYW5uZWxzKSB7IC8vIGFsbCByZXF1aXJlZCBjaGFubmVscyBhcmUgaW4gZW5jb2RpbmdgXG4gICAgaWYgKCEocmVxdWlyZWRDaGFubmVsc1tpXSBpbiBlbmNvZGluZykpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBlbmNvZGluZyBjaGFubmVsIFxcXCInICsgcmVxdWlyZWRDaGFubmVsc1tpXSArXG4gICAgICAgICdcXFwiIGZvciBtYXJrIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBjaGFubmVsIGluIGVuY29kaW5nKSB7IC8vIGFsbCBjaGFubmVscyBpbiBlbmNvZGluZyBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKCFzdXBwb3J0ZWRDaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgcmV0dXJuICdFbmNvZGluZyBjaGFubmVsIFxcXCInICsgY2hhbm5lbCArXG4gICAgICAgICdcXFwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbWFyayB0eXBlIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBpZiAobWFyayA9PT0gQkFSICYmICFlbmNvZGluZy54ICYmICFlbmNvZGluZy55KSB7XG4gICAgcmV0dXJuICdNaXNzaW5nIGJvdGggeCBhbmQgeSBmb3IgYmFyJztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuL3NjYWxlJztcblxuZXhwb3J0IGludGVyZmFjZSBWZ0RhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgdmFsdWVzPzogYW55O1xuICBmb3JtYXQ/OiBhbnk7XG4gIHVybD86IGFueTtcbiAgdHJhbnNmb3JtPzogYW55O1xufVxuXG50eXBlIFZnUGFyZW50UmVmID0ge1xuICBwYXJlbnQ6IHN0cmluZ1xufTtcblxudHlwZSBWZ0ZpZWxkUmVmID0gc3RyaW5nIHwgVmdQYXJlbnRSZWYgfCBWZ1BhcmVudFJlZltdO1xuXG5leHBvcnQgdHlwZSBWZ0RhdGFSZWYgPSB7XG4gIGRhdGE6IHN0cmluZyxcbiAgZmllbGQ6IFZnRmllbGRSZWYsXG4gIHNvcnQ6IGJvb2xlYW4gfCB7XG4gICAgZmllbGQ6IFZnRmllbGRSZWYsXG4gICAgb3A6IHN0cmluZ1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBWZ1ZhbHVlUmVmID0ge1xuICB2YWx1ZT86IGFueSxcbiAgZmllbGQ/OiBzdHJpbmcgfCB7XG4gICAgZGF0dW0/OiBzdHJpbmcsXG4gICAgZ3JvdXA/OiBzdHJpbmcsXG4gICAgcGFyZW50Pzogc3RyaW5nXG4gIH0sXG4gIHRlbXBsYXRlPzogc3RyaW5nLFxuICBzY2FsZT86IHN0cmluZywgLy8gVE9ETzogb2JqZWN0XG4gIG11bHQ/OiBudW1iZXIsXG4gIG9mZnNldD86IG51bWJlcixcbiAgYmFuZD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVW5pb25lZERvbWFpbiA9IHtcbiAgZmllbGRzOiBWZ0RhdGFSZWZbXVxufTtcblxuZXhwb3J0IHR5cGUgVmdTY2FsZSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICB0eXBlOiBTY2FsZVR5cGUsXG4gIGRvbWFpbj86IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZixcbiAgZG9tYWluTWluPzogYW55LFxuICBkb21haW5NYXg/OiBhbnlcbiAgcmFuZ2U/OiBhbnlbXSB8IFZnRGF0YVJlZiB8IHN0cmluZyxcbiAgcmFuZ2VNaW4/OiBhbnksXG4gIHJhbmdlTWF4PzogYW55LFxuXG4gIGJhbmRTaXplPzogbnVtYmVyLFxuICBjbGFtcD86IGJvb2xlYW4sXG4gIGV4cG9uZW50PzogbnVtYmVyLFxuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBwb2ludHM/OiBib29sZWFuLFxuICByZXZlcnNlPzogYm9vbGVhbixcbiAgcm91bmQ/OiBib29sZWFuLFxuICB6ZXJvPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmlvbmVkRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFVuaW9uZWREb21haW4ge1xuICBpZiAoIWlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiAnZmllbGRzJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhUmVmRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFZnRGF0YVJlZiB7XG4gIGlmICghaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuICdkYXRhJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUT0RPOiBkZWNsYXJlXG5leHBvcnQgdHlwZSBWZ01hcmtHcm91cCA9IGFueTtcbmV4cG9ydCB0eXBlIFZnQXhpcyA9IGFueTtcbmV4cG9ydCB0eXBlIFZnTGVnZW5kID0gYW55O1xuZXhwb3J0IHR5cGUgVmdUcmFuc2Zvcm0gPSBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmdTdGFja1RyYW5zZm9ybSB7XG4gIHR5cGU6IHN0cmluZztcbiAgb2Zmc2V0PzogYW55O1xuICBncm91cGJ5OiBhbnk7XG4gIGZpZWxkOiBhbnk7XG4gIHNvcnRieTogYW55O1xuICBvdXRwdXQ6IGFueTtcbn1cbiIsImV4cG9ydCBpbXBvcnQgYXhpcyA9IHJlcXVpcmUoJy4vYXhpcycpO1xuZXhwb3J0IGltcG9ydCBhZ2dyZWdhdGUgPSByZXF1aXJlKCcuL2FnZ3JlZ2F0ZScpO1xuZXhwb3J0IGltcG9ydCBiaW4gPSByZXF1aXJlKCcuL2JpbicpO1xuZXhwb3J0IGltcG9ydCBjaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsJyk7XG5leHBvcnQgY29uc3QgY29tcGlsZSA9IHJlcXVpcmUoJy4vY29tcGlsZS9jb21waWxlJykuY29tcGlsZTtcbmV4cG9ydCBpbXBvcnQgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmV4cG9ydCBpbXBvcnQgZGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpO1xuZXhwb3J0IGltcG9ydCBkYXRldGltZSA9IHJlcXVpcmUoJy4vZGF0ZXRpbWUnKTtcbmV4cG9ydCBpbXBvcnQgZW5jb2RpbmcgPSByZXF1aXJlKCcuL2VuY29kaW5nJyk7XG5leHBvcnQgaW1wb3J0IGZhY2V0ID0gcmVxdWlyZSgnLi9mYWNldCcpO1xuZXhwb3J0IGltcG9ydCBmaWVsZERlZiA9IHJlcXVpcmUoJy4vZmllbGRkZWYnKTtcbmV4cG9ydCBpbXBvcnQgbGVnZW5kID0gcmVxdWlyZSgnLi9sZWdlbmQnKTtcbmV4cG9ydCBpbXBvcnQgbWFyayA9IHJlcXVpcmUoJy4vbWFyaycpO1xuZXhwb3J0IGltcG9ydCBzY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbmV4cG9ydCBpbXBvcnQgc2hvcnRoYW5kID0gcmVxdWlyZSgnLi9zaG9ydGhhbmQnKTtcbmV4cG9ydCBpbXBvcnQgc29ydCA9IHJlcXVpcmUoJy4vc29ydCcpO1xuZXhwb3J0IGltcG9ydCBzcGVjID0gcmVxdWlyZSgnLi9zcGVjJyk7XG5leHBvcnQgaW1wb3J0IHN0YWNrID0gcmVxdWlyZSgnLi9zdGFjaycpO1xuZXhwb3J0IGltcG9ydCB0aW1lVW5pdCA9IHJlcXVpcmUoJy4vdGltZXVuaXQnKTtcbmV4cG9ydCBpbXBvcnQgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKTtcbmV4cG9ydCBpbXBvcnQgdHlwZSA9IHJlcXVpcmUoJy4vdHlwZScpO1xuZXhwb3J0IGltcG9ydCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5leHBvcnQgaW1wb3J0IHZhbGlkYXRlID0gcmVxdWlyZSgnLi92YWxpZGF0ZScpO1xuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICdfX1ZFUlNJT05fXyc7XG4iXX0=
