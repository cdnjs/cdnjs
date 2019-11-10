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
                    template: '{{ datum["data"] | truncate:' + axis.labelMaxLength + ' }}'
                }
            }, labelsSpec || {});
        }
        else if (fieldDef.type === type_1.TEMPORAL) {
            labelsSpec = util_1.extend({
                text: {
                    template: common_1.timeTemplate('datum["data"]', fieldDef.timeUnit, axis.format, axis.shortTimeLabels, config)
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
            field: model.field(channel_1.COLOR, colorFieldDef.type === type_1.ORDINAL ? { prefix: 'rank' } : {})
        };
    }
    else if (colorFieldDef && colorFieldDef.value) {
        colorValue = { value: colorFieldDef.value };
    }
    if (model.has(channel_1.OPACITY)) {
        opacityValue = {
            scale: model.scaleName(channel_1.OPACITY),
            field: model.field(channel_1.OPACITY, opacityFieldDef.type === type_1.ORDINAL ? { prefix: 'rank' } : {})
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
        fielddef_1.field(orderChannelDef, { binSuffix: 'mid' });
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
                        start: fielddef_1.field(fieldDef, { binSuffix: 'start' }),
                        mid: fielddef_1.field(fieldDef, { binSuffix: 'mid' }),
                        end: fielddef_1.field(fieldDef, { binSuffix: 'end' })
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
                        field: fielddef_1.field(fieldDef, { binSuffix: 'range' }),
                        expr: fielddef_1.field(fieldDef, { datum: true, binSuffix: 'start' }) +
                            ' + \'-\' + ' +
                            fielddef_1.field(fieldDef, { datum: true, binSuffix: 'end' })
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
                        rank: model.field(channel_1.COLOR, { prefix: 'rank' })
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
var filter_1 = require('../../filter');
var util_1 = require('../../util');
var filter;
(function (filter_2) {
    function parse(model) {
        var filter = model.transform().filter;
        if (util_1.isArray(filter)) {
            return '(' +
                filter.map(function (f) { return filter_1.expression(f); })
                    .filter(function (f) { return f !== undefined; })
                    .join(') && (') +
                ')';
        }
        else if (filter) {
            return filter_1.expression(filter);
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

},{"../../filter":53,"../../util":64}],23:[function(require,module,exports){
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
                test: 'datum["' + field + '"] > 0'
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
                        return '(datum["' + fieldName + '"] !==null' +
                            ' && !isNaN(datum["' + fieldName + '"]))';
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
var util_1 = require('../../util');
var stackScale;
(function (stackScale) {
    function parseUnit(model) {
        var stackProps = model.stack();
        if (stackProps) {
            var groupbyChannel = stackProps.groupbyChannel;
            var fieldChannel = stackProps.fieldChannel;
            var fields = [];
            var field_1 = model.field(groupbyChannel);
            if (field_1) {
                fields.push(field_1);
            }
            return {
                name: model.dataName(data_1.STACKED_SCALE),
                source: model.dataName(data_1.SUMMARY),
                transform: [util_1.extend({
                        type: 'aggregate',
                        summarize: [{ ops: ['sum'], field: model.field(fieldChannel) }]
                    }, fields.length > 0 ? {
                        groupby: fields
                    } : {})]
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

},{"../../data":48,"../../fielddef":52,"../../util":64}],29:[function(require,module,exports){
"use strict";
var aggregate_1 = require('../../aggregate');
var data_1 = require('../../data');
var fielddef_1 = require('../../fielddef');
var util_1 = require('../../util');
var summary;
(function (summary) {
    function addDimension(dims, fieldDef) {
        if (fieldDef.bin) {
            dims[fielddef_1.field(fieldDef, { binSuffix: 'start' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: 'mid' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: 'end' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: 'range' })] = true;
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
                datetime[timeUnit] = 'datum["data"]';
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
        return '(datum["' + innerSize + '"] + ' + scale.padding + ')' + ' * ' + cardinalityFormula(model, channel);
    }
    else {
        return 'datum["' + innerSize + '"] + ' + model.config().facet.scale.padding;
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
        model.field(channel, { datum: true, prefix: 'distinct' });
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
                        template: common_1.timeTemplate('datum["data"]', fieldDef.timeUnit, legend.format, legend.shortTimeLabels, config)
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
                field: fielddef_1.field(fieldDef, { suffix: 'start' })
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
                field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(xFieldDef, { suffix: 'end' })
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
                field: fielddef_1.field(fieldDef, { suffix: 'start' })
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
                field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(yFieldDef, { suffix: 'end' })
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
                field: model.field(channel_1.X, { suffix: 'start' })
            };
            p.x2 = {
                scale: model.scaleName(channel_1.X),
                field: model.field(channel_1.X, { suffix: 'end' })
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
                    field: model.field(channel_1.X, { binSuffix: 'mid' })
                };
                p.width = {
                    scale: model.scaleName(channel_1.SIZE),
                    field: model.field(channel_1.SIZE)
                };
            }
            else {
                p.x = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: 'start' }),
                    offset: 1
                };
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: 'end' })
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
                field: model.field(channel_1.Y, { suffix: 'start' })
            };
            p.y2 = {
                scale: model.scaleName(channel_1.Y),
                field: model.field(channel_1.Y, { suffix: 'end' })
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
                    field: model.field(channel_1.Y, { binSuffix: 'mid' })
                };
                p.height = {
                    scale: model.scaleName(channel_1.SIZE),
                    field: model.field(channel_1.SIZE)
                };
            }
            else {
                p.y = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: 'start' })
                };
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: 'end' }),
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
        return '-' + model.field(model.config().mark.orient === config_1.Orient.HORIZONTAL ? channel_1.Y : channel_1.X, { binSuffix: 'mid' });
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
                var _field = fielddef_1.field(fieldDef, {
                    binSuffix: scale && scale.type === scale_1.ScaleType.ORDINAL ? 'range' : 'start'
                });
                if (!!_field) {
                    fields.push(_field);
                }
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
        orderby: [model.field(stack.groupbyChannel, { binSuffix: 'mid' })],
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
        groupby: [model.field(stack.groupbyChannel, { binSuffix: 'mid' }) || 'undefined'],
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: model.field(channel_1.X, { binSuffix: 'mid' })
                };
            }
            else {
                p.x = { value: 0 };
            }
            if (model.has(channel_1.Y)) {
                p.y = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y, { binSuffix: 'mid' })
                };
            }
            else {
                p.y = { field: { group: 'height' } };
            }
            if (model.has(channel_1.Y2)) {
                p.y2 = {
                    scale: model.scaleName(channel_1.Y),
                    field: model.field(channel_1.Y2, { binSuffix: 'mid' })
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
                    field: model.field(channel_1.Y, { binSuffix: 'mid' })
                };
            }
            else {
                p.y = { value: 0 };
            }
            if (model.has(channel_1.X)) {
                p.x = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X, { binSuffix: 'mid' })
                };
            }
            else {
                p.x = { value: 0 };
            }
            if (model.has(channel_1.X2)) {
                p.x2 = {
                    scale: model.scaleName(channel_1.X),
                    field: model.field(channel_1.X2, { binSuffix: 'mid' })
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
                field: model.field(channel_1.COLOR, model.fieldDef(channel_1.COLOR).type === type_1.ORDINAL ? { prefix: 'rank' } : {})
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
                    field: fielddef_1.field(xFieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(yFieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                    field: fielddef_1.field(fieldDef, { binSuffix: 'mid' })
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
                binSuffix: this.scale(channel).type === scale_1.ScaleType.ORDINAL ? 'range' : 'start'
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
            field: model.field(channel_1.COLOR, (fieldDef.bin || fieldDef.timeUnit) ? {} : { prefix: 'rank' }),
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
            field: fielddef_1.field(fieldDef, { binSuffix: 'range' }),
            sort: {
                field: model.field(channel_1.COLOR, { binSuffix: 'start' }),
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
            field: model.field(channel, { prefix: 'sum' })
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
                field: model.field(channel, { binSuffix: 'range' }),
                sort: {
                    field: model.field(channel, { binSuffix: 'start' }),
                    op: 'min'
                }
            };
        }
        else if (channel === channel_1.COLOR) {
            return {
                data: model.dataTable(),
                field: model.field(channel, { binSuffix: 'start' })
            };
        }
        else {
            return {
                data: model.dataTable(),
                field: [
                    model.field(channel, { binSuffix: 'start' }),
                    model.field(channel, { binSuffix: 'end' })
                ]
            };
        }
    }
    else if (sort) {
        return {
            data: sort.op ? data_1.SOURCE : model.dataTable(),
            field: (fieldDef.type === type_1.ORDINAL && channel === channel_1.COLOR) ? model.field(channel, { prefix: 'rank' }) : model.field(channel),
            sort: sort
        };
    }
    else {
        return {
            data: model.dataTable(),
            field: (fieldDef.type === type_1.ORDINAL && channel === channel_1.COLOR) ? model.field(channel, { prefix: 'rank' }) : model.field(channel),
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
                binSuffix: this.scale(channel).type === scale_1.ScaleType.ORDINAL ? 'range' : 'start'
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
    var field = fieldDef.field;
    var prefix = opt.prefix;
    var suffix = opt.suffix;
    if (isCount(fieldDef)) {
        field = 'count';
    }
    else {
        var fn = opt.fn;
        if (!opt.nofn) {
            if (fieldDef.bin) {
                fn = 'bin';
                suffix = opt.binSuffix || (opt.scaleType === scale_1.ScaleType.ORDINAL ?
                    'range' :
                    'start');
            }
            else if (!opt.noAggregate && fieldDef.aggregate) {
                fn = String(fieldDef.aggregate);
            }
            else if (fieldDef.timeUnit) {
                fn = String(fieldDef.timeUnit);
            }
        }
        if (!!fn) {
            field = fn + "_" + field;
        }
    }
    if (!!suffix) {
        field = field + "_" + suffix;
    }
    if (!!prefix) {
        field = prefix + "_" + field;
    }
    if (opt.datum) {
        field = "datum[\"" + field + "\"]";
    }
    return field;
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
var datetime_1 = require('./datetime');
var fielddef_1 = require('./fielddef');
var timeunit_1 = require('./timeunit');
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
function expression(filter) {
    if (util_1.isString(filter)) {
        return filter;
    }
    else {
        var fieldExpr = filter.timeUnit ?
            ('time(' + timeunit_1.fieldExpr(filter.timeUnit, filter.field) + ')') :
            fielddef_1.field(filter, { datum: true });
        if (isEqualFilter(filter)) {
            return fieldExpr + '===' + valueExpr(filter.equal, filter.timeUnit);
        }
        else if (isInFilter(filter)) {
            return 'indexof([' +
                filter.in.map(function (v) { return valueExpr(v, filter.timeUnit); }).join(',') +
                '], ' + fieldExpr + ') !== -1';
        }
        else if (isRangeFilter(filter)) {
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
exports.expression = expression;
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

},{"./datetime":49,"./fielddef":52,"./timeunit":61,"./util":64}],54:[function(require,module,exports){
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
function convert(unit, date) {
    var result = new Date(0, 0, 1, 0, 0, 0, 0);
    exports.SINGLE_TIMEUNITS.forEach(function (singleUnit) {
        if (containsTimeUnit(unit, singleUnit)) {
            switch (singleUnit) {
                case TimeUnit.DAY:
                    throw new Error('Cannot convert to TimeUnits containing \'day\'');
                case TimeUnit.YEAR:
                    result.setFullYear(date.getFullYear());
                    break;
                case TimeUnit.QUARTER:
                    result.setMonth((Math.floor(date.getMonth() / 3)) * 3);
                    break;
                case TimeUnit.MONTH:
                    result.setMonth(date.getMonth());
                    break;
                case TimeUnit.DATE:
                    result.setDate(date.getDate());
                    break;
                case TimeUnit.HOURS:
                    result.setHours(date.getHours());
                    break;
                case TimeUnit.MINUTES:
                    result.setMinutes(date.getMinutes());
                    break;
                case TimeUnit.SECONDS:
                    result.setSeconds(date.getSeconds());
                    break;
                case TimeUnit.MILLISECONDS:
                    result.setMilliseconds(date.getMilliseconds());
                    break;
            }
        }
    });
    return result;
}
exports.convert = convert;
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
    var fieldRef = 'datum["' + field + '"]';
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
        var escapedField = field.replace(/(\[|\])/g, '\\$1');
        return template_1.replace(new RegExp('{{' + escapedField + ' \\| time:\'\'}}', 'g'), '');
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
exports.version = '1.1.3';

},{"./aggregate":11,"./axis":12,"./bin":13,"./channel":14,"./compile/compile":17,"./config":47,"./data":48,"./datetime":49,"./encoding":50,"./facet":51,"./fielddef":52,"./legend":54,"./mark":55,"./scale":56,"./shorthand":57,"./sort":58,"./spec":59,"./stack":60,"./timeunit":61,"./transform":62,"./type":63,"./util":64,"./validate":65}]},{},[67])(67)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy9iaW5zL2JpbnMuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvZGF0YWxpYi9zcmMvdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9kYXRhbGliL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL2pzb25pZnkvbGliL3N0cmluZ2lmeS5qcyIsInNyYy9hZ2dyZWdhdGUudHMiLCJzcmMvYXhpcy50cyIsInNyYy9iaW4udHMiLCJzcmMvY2hhbm5lbC50cyIsInNyYy9jb21waWxlL2F4aXMudHMiLCJzcmMvY29tcGlsZS9jb21tb24udHMiLCJzcmMvY29tcGlsZS9jb21waWxlLnRzIiwic3JjL2NvbXBpbGUvY29uZmlnLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9iaW4udHMiLCJzcmMvY29tcGlsZS9kYXRhL2NvbG9ycmFuay50cyIsInNyYy9jb21waWxlL2RhdGEvZGF0YS50cyIsInNyYy9jb21waWxlL2RhdGEvZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9mb3JtYXRwYXJzZS50cyIsInNyYy9jb21waWxlL2RhdGEvZm9ybXVsYS50cyIsInNyYy9jb21waWxlL2RhdGEvbm9ucG9zaXRpdmVudWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9udWxsZmlsdGVyLnRzIiwic3JjL2NvbXBpbGUvZGF0YS9zb3VyY2UudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N0YWNrc2NhbGUudHMiLCJzcmMvY29tcGlsZS9kYXRhL3N1bW1hcnkudHMiLCJzcmMvY29tcGlsZS9kYXRhL3RpbWV1bml0LnRzIiwic3JjL2NvbXBpbGUvZGF0YS90aW1ldW5pdGRvbWFpbi50cyIsInNyYy9jb21waWxlL2ZhY2V0LnRzIiwic3JjL2NvbXBpbGUvbGF5ZXIudHMiLCJzcmMvY29tcGlsZS9sYXlvdXQudHMiLCJzcmMvY29tcGlsZS9sZWdlbmQudHMiLCJzcmMvY29tcGlsZS9tYXJrL2FyZWEudHMiLCJzcmMvY29tcGlsZS9tYXJrL2Jhci50cyIsInNyYy9jb21waWxlL21hcmsvbGluZS50cyIsInNyYy9jb21waWxlL21hcmsvbWFyay50cyIsInNyYy9jb21waWxlL21hcmsvcG9pbnQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3J1bGUudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RleHQudHMiLCJzcmMvY29tcGlsZS9tYXJrL3RpY2sudHMiLCJzcmMvY29tcGlsZS9tb2RlbC50cyIsInNyYy9jb21waWxlL3NjYWxlLnRzIiwic3JjL2NvbXBpbGUvdW5pdC50cyIsInNyYy9jb25maWcudHMiLCJzcmMvZGF0YS50cyIsInNyYy9kYXRldGltZS50cyIsInNyYy9lbmNvZGluZy50cyIsInNyYy9maWVsZGRlZi50cyIsInNyYy9maWx0ZXIudHMiLCJzcmMvbGVnZW5kLnRzIiwic3JjL21hcmsudHMiLCJzcmMvc2NhbGUudHMiLCJzcmMvc2hvcnRoYW5kLnRzIiwic3JjL3NvcnQudHMiLCJzcmMvc3BlYy50cyIsInNyYy9zdGFjay50cyIsInNyYy90aW1ldW5pdC50cyIsInNyYy90eXBlLnRzIiwic3JjL3V0aWwudHMiLCJzcmMvdmFsaWRhdGUudHMiLCJzcmMvdmVnYS5zY2hlbWEudHMiLCJzcmMvdmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQSxXQUFZLFdBQVc7SUFDbkIsb0NBQVMs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USxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBRWxDLGVBQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZScsIFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0MCA9IG5ldyBEYXRlO1xuICB2YXIgdDEgPSBuZXcgRGF0ZTtcbiAgZnVuY3Rpb24gbmV3SW50ZXJ2YWwoZmxvb3JpLCBvZmZzZXRpLCBjb3VudCwgZmllbGQpIHtcblxuICAgIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gICAgfVxuXG4gICAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICAgIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGQwID0gbmV3IERhdGUoK2RhdGUpLFxuICAgICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgICAgZmxvb3JpKGQwKSwgZmxvb3JpKGQxKSwgb2Zmc2V0aShkMSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLm9mZnNldCA9IGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgdmFyIHJhbmdlID0gW107XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgICBzdG9wID0gbmV3IERhdGUoK3N0b3ApO1xuICAgICAgc3RlcCA9IHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgICBvZmZzZXRpKHN0YXJ0LCAxKSwgZmxvb3JpKHN0YXJ0KTtcbiAgICAgIGlmIChzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICAgIHdoaWxlICgtLXN0ZXAgPj0gMCkgd2hpbGUgKG9mZnNldGkoZGF0ZSwgMSksICF0ZXN0KGRhdGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGludGVydmFsLmNvdW50ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICB0MC5zZXRUaW1lKCtzdGFydCksIHQxLnNldFRpbWUoK2VuZCk7XG4gICAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvdW50KHQwLCB0MSkpO1xuICAgICAgfTtcblxuICAgICAgaW50ZXJ2YWwuZXZlcnkgPSBmdW5jdGlvbihzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgICByZXR1cm4gIWlzRmluaXRlKHN0ZXApIHx8ICEoc3RlcCA+IDApID8gbnVsbFxuICAgICAgICAgICAgOiAhKHN0ZXAgPiAxKSA/IGludGVydmFsXG4gICAgICAgICAgICA6IGludGVydmFsLmZpbHRlcihmaWVsZFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24oZCkgeyByZXR1cm4gZmllbGQoZCkgJSBzdGVwID09PSAwOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbihkKSB7IHJldHVybiBpbnRlcnZhbC5jb3VudCgwLCBkKSAlIHN0ZXAgPT09IDA7IH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJ2YWw7XG4gIH07XG5cbiAgdmFyIG1pbGxpc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gbm9vcFxuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kIC0gc3RhcnQ7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgbWlsbGlzZWNvbmQuZXZlcnkgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGguZmxvb3Ioayk7XG4gICAgaWYgKCFpc0Zpbml0ZShrKSB8fCAhKGsgPiAwKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCEoayA+IDEpKSByZXR1cm4gbWlsbGlzZWNvbmQ7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKGRhdGUgLyBrKSAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGs7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciBtaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgc3VuZGF5ID0gd2Vla2RheSgwKTtcbiAgdmFyIG1vbmRheSA9IHdlZWtkYXkoMSk7XG4gIHZhciB0dWVzZGF5ID0gd2Vla2RheSgyKTtcbiAgdmFyIHdlZG5lc2RheSA9IHdlZWtkYXkoMyk7XG4gIHZhciB0aHVyc2RheSA9IHdlZWtkYXkoNCk7XG4gIHZhciBmcmlkYXkgPSB3ZWVrZGF5KDUpO1xuICB2YXIgc2F0dXJkYXkgPSB3ZWVrZGF5KDYpO1xuXG4gIHZhciBtb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0RGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1NlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB1dGNTdW5kYXkgPSB1dGNXZWVrZGF5KDApO1xuICB2YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbiAgdmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xuICB2YXIgdXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcbiAgdmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbiAgdmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG4gIHZhciB1dGNTYXR1cmRheSA9IHV0Y1dlZWtkYXkoNik7XG5cbiAgdmFyIHV0Y01vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENEYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDTW9udGgoKSAtIHN0YXJ0LmdldFVUQ01vbnRoKCkgKyAoZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgbWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmQucmFuZ2U7XG4gIHZhciBzZWNvbmRzID0gc2Vjb25kLnJhbmdlO1xuICB2YXIgbWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcbiAgdmFyIGhvdXJzID0gaG91ci5yYW5nZTtcbiAgdmFyIGRheXMgPSBkYXkucmFuZ2U7XG4gIHZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9uZGF5cyA9IG1vbmRheS5yYW5nZTtcbiAgdmFyIHR1ZXNkYXlzID0gdHVlc2RheS5yYW5nZTtcbiAgdmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB0aHVyc2RheXMgPSB0aHVyc2RheS5yYW5nZTtcbiAgdmFyIGZyaWRheXMgPSBmcmlkYXkucmFuZ2U7XG4gIHZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcbiAgdmFyIHdlZWtzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9udGhzID0gbW9udGgucmFuZ2U7XG4gIHZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbiAgdmFyIHV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIHZhciB1dGNNaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIHZhciB1dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xuICB2YXIgdXRjTWludXRlcyA9IHV0Y01pbnV0ZS5yYW5nZTtcbiAgdmFyIHV0Y0hvdXJzID0gdXRjSG91ci5yYW5nZTtcbiAgdmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG4gIHZhciB1dGNTdW5kYXlzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9uZGF5cyA9IHV0Y01vbmRheS5yYW5nZTtcbiAgdmFyIHV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheS5yYW5nZTtcbiAgdmFyIHV0Y0ZyaWRheXMgPSB1dGNGcmlkYXkucmFuZ2U7XG4gIHZhciB1dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZWtzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9udGhzID0gdXRjTW9udGgucmFuZ2U7XG4gIHZhciB1dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuMS4xXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZHM7XG4gIGV4cG9ydHMubWludXRlcyA9IG1pbnV0ZXM7XG4gIGV4cG9ydHMuaG91cnMgPSBob3VycztcbiAgZXhwb3J0cy5kYXlzID0gZGF5cztcbiAgZXhwb3J0cy5zdW5kYXlzID0gc3VuZGF5cztcbiAgZXhwb3J0cy5tb25kYXlzID0gbW9uZGF5cztcbiAgZXhwb3J0cy50dWVzZGF5cyA9IHR1ZXNkYXlzO1xuICBleHBvcnRzLndlZG5lc2RheXMgPSB3ZWRuZXNkYXlzO1xuICBleHBvcnRzLnRodXJzZGF5cyA9IHRodXJzZGF5cztcbiAgZXhwb3J0cy5mcmlkYXlzID0gZnJpZGF5cztcbiAgZXhwb3J0cy5zYXR1cmRheXMgPSBzYXR1cmRheXM7XG4gIGV4cG9ydHMud2Vla3MgPSB3ZWVrcztcbiAgZXhwb3J0cy5tb250aHMgPSBtb250aHM7XG4gIGV4cG9ydHMueWVhcnMgPSB5ZWFycztcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZCA9IHV0Y01pbGxpc2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IHV0Y01pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gdXRjU2Vjb25kcztcbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuICBleHBvcnRzLnV0Y0RheXMgPSB1dGNEYXlzO1xuICBleHBvcnRzLnV0Y1N1bmRheXMgPSB1dGNTdW5kYXlzO1xuICBleHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheXM7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuICBleHBvcnRzLnV0Y0ZyaWRheXMgPSB1dGNGcmlkYXlzO1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5cztcbiAgZXhwb3J0cy51dGNXZWVrcyA9IHV0Y1dlZWtzO1xuICBleHBvcnRzLnV0Y01vbnRocyA9IHV0Y01vbnRocztcbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMuc2Vjb25kID0gc2Vjb25kO1xuICBleHBvcnRzLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgZXhwb3J0cy5ob3VyID0gaG91cjtcbiAgZXhwb3J0cy5kYXkgPSBkYXk7XG4gIGV4cG9ydHMuc3VuZGF5ID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbmRheSA9IG1vbmRheTtcbiAgZXhwb3J0cy50dWVzZGF5ID0gdHVlc2RheTtcbiAgZXhwb3J0cy53ZWRuZXNkYXkgPSB3ZWRuZXNkYXk7XG4gIGV4cG9ydHMudGh1cnNkYXkgPSB0aHVyc2RheTtcbiAgZXhwb3J0cy5mcmlkYXkgPSBmcmlkYXk7XG4gIGV4cG9ydHMuc2F0dXJkYXkgPSBzYXR1cmRheTtcbiAgZXhwb3J0cy53ZWVrID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbnRoID0gbW9udGg7XG4gIGV4cG9ydHMueWVhciA9IHllYXI7XG4gIGV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG4gIGV4cG9ydHMudXRjU3VuZGF5ID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbmRheSA9IHV0Y01vbmRheTtcbiAgZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjVHVlc2RheTtcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXkgPSB1dGNXZWRuZXNkYXk7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXkgPSB1dGNUaHVyc2RheTtcbiAgZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNGcmlkYXk7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNTYXR1cmRheTtcbiAgZXhwb3J0cy51dGNXZWVrID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbnRoID0gdXRjTW9udGg7XG4gIGV4cG9ydHMudXRjWWVhciA9IHV0Y1llYXI7XG4gIGV4cG9ydHMuaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcblxufSkpOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHRpbWUgPSByZXF1aXJlKCcuLi90aW1lJyksXG4gICAgRVBTSUxPTiA9IDFlLTE1O1xuXG5mdW5jdGlvbiBiaW5zKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGRldGVybWluZSByYW5nZVxuICB2YXIgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDE1LFxuICAgICAgYmFzZSA9IG9wdC5iYXNlIHx8IDEwLFxuICAgICAgbG9nYiA9IE1hdGgubG9nKGJhc2UpLFxuICAgICAgZGl2ID0gb3B0LmRpdiB8fCBbNSwgMl0sXG4gICAgICBtaW4gPSBvcHQubWluLFxuICAgICAgbWF4ID0gb3B0Lm1heCxcbiAgICAgIHNwYW4gPSBtYXggLSBtaW4sXG4gICAgICBzdGVwLCBsZXZlbCwgbWluc3RlcCwgcHJlY2lzaW9uLCB2LCBpLCBlcHM7XG5cbiAgaWYgKG9wdC5zdGVwKSB7XG4gICAgLy8gaWYgc3RlcCBzaXplIGlzIGV4cGxpY2l0bHkgZ2l2ZW4sIHVzZSB0aGF0XG4gICAgc3RlcCA9IG9wdC5zdGVwO1xuICB9IGVsc2UgaWYgKG9wdC5zdGVwcykge1xuICAgIC8vIGlmIHByb3ZpZGVkLCBsaW1pdCBjaG9pY2UgdG8gYWNjZXB0YWJsZSBzdGVwIHNpemVzXG4gICAgc3RlcCA9IG9wdC5zdGVwc1tNYXRoLm1pbihcbiAgICAgIG9wdC5zdGVwcy5sZW5ndGggLSAxLFxuICAgICAgYmlzZWN0KG9wdC5zdGVwcywgc3Bhbi9tYXhiLCAwLCBvcHQuc3RlcHMubGVuZ3RoKVxuICAgICldO1xuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdXNlIHNwYW4gdG8gZGV0ZXJtaW5lIHN0ZXAgc2l6ZVxuICAgIGxldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nKG1heGIpIC8gbG9nYik7XG4gICAgbWluc3RlcCA9IG9wdC5taW5zdGVwIHx8IDA7XG4gICAgc3RlcCA9IE1hdGgubWF4KFxuICAgICAgbWluc3RlcCxcbiAgICAgIE1hdGgucG93KGJhc2UsIE1hdGgucm91bmQoTWF0aC5sb2coc3BhbikgLyBsb2diKSAtIGxldmVsKVxuICAgICk7XG5cbiAgICAvLyBpbmNyZWFzZSBzdGVwIHNpemUgaWYgdG9vIG1hbnkgYmluc1xuICAgIHdoaWxlIChNYXRoLmNlaWwoc3Bhbi9zdGVwKSA+IG1heGIpIHsgc3RlcCAqPSBiYXNlOyB9XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBkYXRlIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIHVuaXRzID0gb3B0LnV0YyA/IHRpbWUudXRjIDogdGltZSxcbiAgICAgIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBnZW4gPSBtb2R1bGUuZXhwb3J0cztcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluID09PSB1bmRlZmluZWQgPyAxIDogbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPCBtaW4gPyAwIDogeCA+IG1heCA/IDEgOiAoeCAtIG1pbikgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IG1pbiArIHAqZCA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICBiID0gYTtcbiAgICBhID0gMDtcbiAgfVxuICB2YXIgZCA9IGIgLSBhO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihkICogTWF0aC5yYW5kb20oKSk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID09PSBNYXRoLmZsb29yKHgpICYmIHggPj0gYSAmJiB4IDwgYikgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgdiA9IE1hdGguZmxvb3IoeCk7XG4gICAgcmV0dXJuIHYgPCBhID8gMCA6IHYgPj0gYiA/IDEgOiAodiAtIGEgKyAxKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gYSAtIDEgKyBNYXRoLmZsb29yKHAqZCkgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ub3JtYWwgPSBmdW5jdGlvbihtZWFuLCBzdGRldikge1xuICBtZWFuID0gbWVhbiB8fCAwO1xuICBzdGRldiA9IHN0ZGV2IHx8IDE7XG4gIHZhciBuZXh0O1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gMCwgeSA9IDAsIHJkcywgYztcbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4ID0gbmV4dDtcbiAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgZG8ge1xuICAgICAgeCA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgcmRzID0geCp4ICsgeSp5O1xuICAgIH0gd2hpbGUgKHJkcyA9PT0gMCB8fCByZHMgPiAxKTtcbiAgICBjID0gTWF0aC5zcXJ0KC0yKk1hdGgubG9nKHJkcykvcmRzKTsgLy8gQm94LU11bGxlciB0cmFuc2Zvcm1cbiAgICBuZXh0ID0gbWVhbiArIHkqYypzdGRldjtcbiAgICByZXR1cm4gbWVhbiArIHgqYypzdGRldjtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZXhwID0gTWF0aC5leHAoTWF0aC5wb3coeC1tZWFuLCAyKSAvICgtMiAqIE1hdGgucG93KHN0ZGV2LCAyKSkpO1xuICAgIHJldHVybiAoMSAvIChzdGRldiAqIE1hdGguc3FydCgyKk1hdGguUEkpKSkgKiBleHA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gZnJvbSBXZXN0ICgyMDA5KVxuICAgIC8vIEJldHRlciBBcHByb3hpbWF0aW9ucyB0byBDdW11bGF0aXZlIE5vcm1hbCBGdW5jdGlvbnNcbiAgICB2YXIgY2QsXG4gICAgICAgIHogPSAoeCAtIG1lYW4pIC8gc3RkZXYsXG4gICAgICAgIFogPSBNYXRoLmFicyh6KTtcbiAgICBpZiAoWiA+IDM3KSB7XG4gICAgICBjZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdW0sIGV4cCA9IE1hdGguZXhwKC1aKlovMik7XG4gICAgICBpZiAoWiA8IDcuMDcxMDY3ODExODY1NDcpIHtcbiAgICAgICAgc3VtID0gMy41MjYyNDk2NTk5ODkxMWUtMDIgKiBaICsgMC43MDAzODMwNjQ0NDM2ODg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2LjM3Mzk2MjIwMzUzMTY1O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMzMuOTEyODY2MDc4MzgzO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTEyLjA3OTI5MTQ5Nzg3MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMS4yMTM1OTYxNjk5MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjAuMjA2ODY3OTEyMzc2O1xuICAgICAgICBjZCA9IGV4cCAqIHN1bTtcbiAgICAgICAgc3VtID0gOC44Mzg4MzQ3NjQ4MzE4NGUtMDIgKiBaICsgMS43NTU2NjcxNjMxODI2NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDE2LjA2NDE3NzU3OTIwNztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDg2Ljc4MDczMjIwMjk0NjE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyOTYuNTY0MjQ4Nzc5Njc0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNjM3LjMzMzYzMzM3ODgzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDc5My44MjY1MTI1MTk5NDg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA0NDAuNDEzNzM1ODI0NzUyO1xuICAgICAgICBjZCA9IGNkIC8gc3VtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtID0gWiArIDAuNjU7XG4gICAgICAgIHN1bSA9IFogKyA0IC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMyAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDIgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAxIC8gc3VtO1xuICAgICAgICBjZCA9IGV4cCAvIHN1bSAvIDIuNTA2NjI4Mjc0NjMxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geiA+IDAgPyAxIC0gY2QgOiBjZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gb2YgUHJvYml0IGZ1bmN0aW9uIHVzaW5nIGludmVyc2UgZXJyb3IgZnVuY3Rpb24uXG4gICAgaWYgKHAgPD0gMCB8fCBwID49IDEpIHJldHVybiBOYU47XG4gICAgdmFyIHggPSAyKnAgLSAxLFxuICAgICAgICB2ID0gKDggKiAoTWF0aC5QSSAtIDMpKSAvICgzICogTWF0aC5QSSAqICg0LU1hdGguUEkpKSxcbiAgICAgICAgYSA9ICgyIC8gKE1hdGguUEkqdikpICsgKE1hdGgubG9nKDEgLSBNYXRoLnBvdyh4LDIpKSAvIDIpLFxuICAgICAgICBiID0gTWF0aC5sb2coMSAtICh4KngpKSAvIHYsXG4gICAgICAgIHMgPSAoeCA+IDAgPyAxIDogLTEpICogTWF0aC5zcXJ0KE1hdGguc3FydCgoYSphKSAtIGIpIC0gYSk7XG4gICAgcmV0dXJuIG1lYW4gKyBzdGRldiAqIE1hdGguU1FSVDIgKiBzO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uYm9vdHN0cmFwID0gZnVuY3Rpb24oZG9tYWluLCBzbW9vdGgpIHtcbiAgLy8gR2VuZXJhdGVzIGEgYm9vdHN0cmFwIHNhbXBsZSBmcm9tIGEgc2V0IG9mIG9ic2VydmF0aW9ucy5cbiAgLy8gU21vb3RoIGJvb3RzdHJhcHBpbmcgYWRkcyByYW5kb20gemVyby1jZW50ZXJlZCBub2lzZSB0byB0aGUgc2FtcGxlcy5cbiAgdmFyIHZhbCA9IGRvbWFpbi5maWx0ZXIodXRpbC5pc1ZhbGlkKSxcbiAgICAgIGxlbiA9IHZhbC5sZW5ndGgsXG4gICAgICBlcnIgPSBzbW9vdGggPyBnZW4ucmFuZG9tLm5vcm1hbCgwLCBzbW9vdGgpIDogbnVsbDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsW35+KE1hdGgucmFuZG9tKCkqbGVuKV0gKyAoZXJyID8gZXJyKCkgOiAwKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIGQzX3RpbWUgPSByZXF1aXJlKCdkMy10aW1lJyk7XG5cbnZhciB0ZW1wRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgYmFzZURhdGUgPSBuZXcgRGF0ZSgwLCAwLCAxKS5zZXRGdWxsWWVhcigwKSwgLy8gSmFuIDEsIDAgQURcbiAgICB1dGNCYXNlRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDAsIDAsIDEpKS5zZXRVVENGdWxsWWVhcigwKTtcblxuZnVuY3Rpb24gZGF0ZShkKSB7XG4gIHJldHVybiAodGVtcERhdGUuc2V0VGltZSgrZCksIHRlbXBEYXRlKTtcbn1cblxuLy8gY3JlYXRlIGEgdGltZSB1bml0IGVudHJ5XG5mdW5jdGlvbiBlbnRyeSh0eXBlLCBkYXRlLCB1bml0LCBzdGVwLCBtaW4sIG1heCkge1xuICB2YXIgZSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGU6IGRhdGUsXG4gICAgdW5pdDogdW5pdFxuICB9O1xuICBpZiAoc3RlcCkge1xuICAgIGUuc3RlcCA9IHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgZS5taW5zdGVwID0gMTtcbiAgfVxuICBpZiAobWluICE9IG51bGwpIGUubWluID0gbWluO1xuICBpZiAobWF4ICE9IG51bGwpIGUubWF4ID0gbWF4O1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIHVuaXQsIGJhc2UsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBlbnRyeSh0eXBlLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQub2Zmc2V0KGJhc2UsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQuY291bnQoYmFzZSwgZCk7IH0sXG4gICAgc3RlcCwgbWluLCBtYXgpO1xufVxuXG52YXIgbG9jYWxlID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUuc2Vjb25kLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS5taW51dGUsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLmhvdXIsICAgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUuZGF5LCAgICBiYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLm1vbnRoLCAgYmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS55ZWFyLCAgIGJhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgNCtkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgZCAlIDEyLCAxKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgdXRjID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUudXRjU2Vjb25kLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS51dGNNaW51dGUsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLnV0Y0hvdXIsICAgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUudXRjRGF5LCAgICB1dGNCYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLnV0Y01vbnRoLCAgdXRjQmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS51dGNZZWFyLCAgIHV0Y0Jhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDU2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgNCtkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCBkICUgMTIsIDEpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgU1RFUFMgPSBbXG4gIFszMTUzNmU2LCA1XSwgIC8vIDEteWVhclxuICBbNzc3NmU2LCA0XSwgICAvLyAzLW1vbnRoXG4gIFsyNTkyZTYsIDRdLCAgIC8vIDEtbW9udGhcbiAgWzEyMDk2ZTUsIDNdLCAgLy8gMi13ZWVrXG4gIFs2MDQ4ZTUsIDNdLCAgIC8vIDEtd2Vla1xuICBbMTcyOGU1LCAzXSwgICAvLyAyLWRheVxuICBbODY0ZTUsIDNdLCAgICAvLyAxLWRheVxuICBbNDMyZTUsIDJdLCAgICAvLyAxMi1ob3VyXG4gIFsyMTZlNSwgMl0sICAgIC8vIDYtaG91clxuICBbMTA4ZTUsIDJdLCAgICAvLyAzLWhvdXJcbiAgWzM2ZTUsIDJdLCAgICAgLy8gMS1ob3VyXG4gIFsxOGU1LCAxXSwgICAgIC8vIDMwLW1pbnV0ZVxuICBbOWU1LCAxXSwgICAgICAvLyAxNS1taW51dGVcbiAgWzNlNSwgMV0sICAgICAgLy8gNS1taW51dGVcbiAgWzZlNCwgMV0sICAgICAgLy8gMS1taW51dGVcbiAgWzNlNCwgMF0sICAgICAgLy8gMzAtc2Vjb25kXG4gIFsxNWUzLCAwXSwgICAgIC8vIDE1LXNlY29uZFxuICBbNWUzLCAwXSwgICAgICAvLyA1LXNlY29uZFxuICBbMWUzLCAwXSAgICAgICAvLyAxLXNlY29uZFxuXTtcblxuZnVuY3Rpb24gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yikge1xuICB2YXIgc3RlcCA9IFNURVBTWzBdLCBpLCBuLCBiaW5zO1xuXG4gIGZvciAoaT0xLCBuPVNURVBTLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdGVwID0gU1RFUFNbaV07XG4gICAgaWYgKHNwYW4gPiBzdGVwWzBdKSB7XG4gICAgICBiaW5zID0gc3BhbiAvIHN0ZXBbMF07XG4gICAgICBpZiAoYmlucyA+IG1heGIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW1NURVBTW2ktMV1bMV1dO1xuICAgICAgfVxuICAgICAgaWYgKGJpbnMgPj0gbWluYikge1xuICAgICAgICByZXR1cm4gdW5pdHNbc3RlcFsxXV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bml0c1tTVEVQU1tuLTFdWzFdXTtcbn1cblxuZnVuY3Rpb24gdG9Vbml0TWFwKHVuaXRzKSB7XG4gIHZhciBtYXAgPSB7fSwgaSwgbjtcbiAgZm9yIChpPTAsIG49dW5pdHMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIG1hcFt1bml0c1tpXS50eXBlXSA9IHVuaXRzW2ldO1xuICB9XG4gIG1hcC5maW5kID0gZnVuY3Rpb24oc3BhbiwgbWluYiwgbWF4Yikge1xuICAgIHJldHVybiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKTtcbiAgfTtcbiAgcmV0dXJuIG1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1VuaXRNYXAobG9jYWxlKTtcbm1vZHVsZS5leHBvcnRzLnV0YyA9IHRvVW5pdE1hcCh1dGMpOyIsInZhciB1ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Lmxlbmd0aCAhPSBudWxsID8geC5sZW5ndGggOiBudWxsO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCwgZikge1xuICByZXR1cm4gKGYgPSB1LiQoZikpID9cbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbZih4KV0gPSAxLCBvYmopOyB9LCB7fSkgOlxuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialt4XSA9IDEsIG9iaik7IH0sIHt9KTtcbn07XG5cbnUua2V5c3RyID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIC8vIHVzZSB0byBlbnN1cmUgY29uc2lzdGVudCBrZXkgZ2VuZXJhdGlvbiBhY3Jvc3MgbW9kdWxlc1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGlmICghbikgcmV0dXJuICcnO1xuICBmb3IgKHZhciBzPVN0cmluZyh2YWx1ZXNbMF0pLCBpPTE7IGk8bjsgKytpKSB7XG4gICAgcyArPSAnfCcgKyBTdHJpbmcodmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbi8vIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnUuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG51LmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnUuaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbnUuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG51LmlzTnVtYmVyID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxudS5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG51LmlzRGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG51LmlzVmFsaWQgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqO1xufTtcblxudS5pc0J1ZmZlciA9ICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIEJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbi8vIHBhcnNlIGEgZGF0ZSB3aXRoIG9wdGlvbmFsIGQzLnRpbWUtZm9ybWF0IGZvcm1hdFxudS5kYXRlID0gZnVuY3Rpb24ocywgZm9ybWF0KSB7XG4gIHZhciBkID0gZm9ybWF0ID8gZm9ybWF0IDogRGF0ZTtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBkLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgfHwgdS5pc1N0cmluZyh4KSA/XG4gICAgICAvLyBPdXRwdXQgdmFsaWQgSlNPTiBhbmQgSlMgc291cmNlIHN0cmluZ3MuXG4gICAgICAvLyBTZWUgaHR0cDovL3RpbWVsZXNzcmVwby5jb20vanNvbi1pc250LWEtamF2YXNjcmlwdC1zdWJzZXRcbiAgICAgIEpTT04uc3RyaW5naWZ5KHgpLnJlcGxhY2UoJ1xcdTIwMjgnLCdcXFxcdTIwMjgnKS5yZXBsYWNlKCdcXHUyMDI5JywgJ1xcXFx1MjAyOScpXG4gICAgOiB4O1xufTtcblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnZhciBmaWVsZF9yZSA9IC9cXFsoLio/KVxcXXxbXi5cXFtdKy9nO1xuXG51LmZpZWxkID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gU3RyaW5nKGYpLm1hdGNoKGZpZWxkX3JlKS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkWzBdICE9PSAnWycgPyBkIDpcbiAgICAgIGRbMV0gIT09IFwiJ1wiICYmIGRbMV0gIT09ICdcIicgPyBkLnNsaWNlKDEsIC0xKSA6XG4gICAgICBkLnNsaWNlKDIsIC0yKS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCAnJDEnKTtcbiAgfSk7XG59O1xuXG51LmFjY2Vzc29yID0gZnVuY3Rpb24oZikge1xuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gZj09bnVsbCB8fCB1LmlzRnVuY3Rpb24oZikgPyBmIDpcbiAgICB1Lm5hbWVkZnVuYyhmLCBGdW5jdGlvbigneCcsICdyZXR1cm4geFsnICsgdS5maWVsZChmKS5tYXAodS5zdHIpLmpvaW4oJ11bJykgKyAnXTsnKSk7XG59O1xuXG4vLyBzaG9ydC1jdXQgZm9yIGFjY2Vzc29yXG51LiQgPSB1LmFjY2Vzc29yO1xuXG51Lm11dGF0b3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gdS5pc1N0cmluZyhmKSAmJiAocz11LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICBmdW5jdGlvbih4LCB2KSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8cy5sZW5ndGgtMTsgKytpKSB4ID0geFtzW2ldXTtcbiAgICAgIHhbc1tpXV0gPSB2O1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHgsIHYpIHsgeFtmXSA9IHY7IH07XG59O1xuXG5cbnUuJGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24oZikge1xuICAgIGYgPSB1LiQoZikgfHwgdS5pZGVudGl0eTtcbiAgICB2YXIgbiA9IG5hbWUgKyAodS5uYW1lKGYpID8gJ18nK3UubmFtZShmKSA6ICcnKTtcbiAgICByZXR1cm4gdS5uYW1lZGZ1bmMobiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gb3AoZihkKSk7IH0pO1xuICB9O1xufTtcblxudS4kdmFsaWQgID0gdS4kZnVuYygndmFsaWQnLCB1LmlzVmFsaWQpO1xudS4kbGVuZ3RoID0gdS4kZnVuYygnbGVuZ3RoJywgdS5sZW5ndGgpO1xuXG51LiRpbiA9IGZ1bmN0aW9uKGYsIHZhbHVlcykge1xuICBmID0gdS4kKGYpO1xuICB2YXIgbWFwID0gdS5pc0FycmF5KHZhbHVlcykgPyB1LnRvTWFwKHZhbHVlcykgOiB2YWx1ZXM7XG4gIHJldHVybiBmdW5jdGlvbihkKSB7IHJldHVybiAhIW1hcFtmKGQpXTsgfTtcbn07XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGksIG4sIGYsIGM7XG4gICAgZm9yIChpPTAsIG49c29ydC5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBmID0gc29ydFtpXTtcbiAgICAgIGMgPSB1LmNtcChmKGEpLCBmKGIpKTtcbiAgICAgIGlmIChjKSByZXR1cm4gYyAqIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiAoYSA8IGIgfHwgYSA9PSBudWxsKSAmJiBiICE9IG51bGwgPyAtMSA6XG4gICAgKGEgPiBiIHx8IGIgPT0gbnVsbCkgJiYgYSAhPSBudWxsID8gMSA6XG4gICAgKChiID0gYiBpbnN0YW5jZW9mIERhdGUgPyArYiA6IGIpLFxuICAgICAoYSA9IGEgaW5zdGFuY2VvZiBEYXRlID8gK2EgOiBhKSkgIT09IGEgJiYgYiA9PT0gYiA/IC0xIDpcbiAgICBiICE9PSBiICYmIGEgPT09IGEgPyAxIDogMDtcbn07XG5cbnUubnVtY21wID0gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAtIGI7IH07XG5cbnUuc3RhYmxlc29ydCA9IGZ1bmN0aW9uKGFycmF5LCBzb3J0QnksIGtleUZuKSB7XG4gIHZhciBpbmRpY2VzID0gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGlkeCwgdiwgaSkge1xuICAgIHJldHVybiAoaWR4W2tleUZuKHYpXSA9IGksIGlkeCk7XG4gIH0sIHt9KTtcblxuICBhcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgc2EgPSBzb3J0QnkoYSksXG4gICAgICAgIHNiID0gc29ydEJ5KGIpO1xuICAgIHJldHVybiBzYSA8IHNiID8gLTEgOiBzYSA+IHNiID8gMVxuICAgICAgICAgOiAoaW5kaWNlc1trZXlGbihhKV0gLSBpbmRpY2VzW2tleUZuKGIpXSk7XG4gIH0pO1xuXG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8vIHBlcm11dGVzIGFuIGFycmF5IHVzaW5nIGEgS251dGggc2h1ZmZsZVxudS5wZXJtdXRlID0gZnVuY3Rpb24oYSkge1xuICB2YXIgbSA9IGEubGVuZ3RoLFxuICAgICAgc3dhcCxcbiAgICAgIGk7XG5cbiAgd2hpbGUgKG0pIHtcbiAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcbiAgICBzd2FwID0gYVttXTtcbiAgICBhW21dID0gYVtpXTtcbiAgICBhW2ldID0gc3dhcDtcbiAgfVxufTtcblxuLy8gc3RyaW5nIGZ1bmN0aW9uc1xuXG51LnBhZCA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCBwYWRjaGFyKSB7XG4gIHBhZGNoYXIgPSBwYWRjaGFyIHx8IFwiIFwiO1xuICB2YXIgZCA9IGxlbmd0aCAtIHMubGVuZ3RoO1xuICBpZiAoZCA8PSAwKSByZXR1cm4gcztcbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBzdHJyZXAoZCwgcGFkY2hhcikgKyBzO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBzdHJyZXAoTWF0aC5mbG9vcihkLzIpLCBwYWRjaGFyKSArXG4gICAgICAgICBzICsgc3RycmVwKE1hdGguY2VpbChkLzIpLCBwYWRjaGFyKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHMgKyBzdHJyZXAoZCwgcGFkY2hhcik7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0cnJlcChuLCBzdHIpIHtcbiAgdmFyIHMgPSBcIlwiLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHMgKz0gc3RyO1xuICByZXR1cm4gcztcbn1cblxudS50cnVuY2F0ZSA9IGZ1bmN0aW9uKHMsIGxlbmd0aCwgcG9zLCB3b3JkLCBlbGxpcHNpcykge1xuICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gIGlmIChsZW4gPD0gbGVuZ3RoKSByZXR1cm4gcztcbiAgZWxsaXBzaXMgPSBlbGxpcHNpcyAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKGVsbGlwc2lzKSA6ICdcXHUyMDI2JztcbiAgdmFyIGwgPSBNYXRoLm1heCgwLCBsZW5ndGggLSBlbGxpcHNpcy5sZW5ndGgpO1xuXG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCwxKSA6IHMuc2xpY2UobGVuLWwpKTtcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICB2YXIgbDEgPSBNYXRoLmNlaWwobC8yKSwgbDIgPSBNYXRoLmZsb29yKGwvMik7XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwxKSA6IHMuc2xpY2UoMCxsMSkpICtcbiAgICAgICAgZWxsaXBzaXMgKyAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDIsMSkgOiBzLnNsaWNlKGxlbi1sMikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwpIDogcy5zbGljZSgwLGwpKSArIGVsbGlwc2lzO1xuICB9XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZU9uV29yZChzLCBsZW4sIHJldikge1xuICB2YXIgY250ID0gMCwgdG9rID0gcy5zcGxpdCh0cnVuY2F0ZV93b3JkX3JlKTtcbiAgaWYgKHJldikge1xuICAgIHMgPSAodG9rID0gdG9rLnJldmVyc2UoKSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KVxuICAgICAgLnJldmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBzID0gdG9rLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pO1xuICB9XG4gIHJldHVybiBzLmxlbmd0aCA/IHMuam9pbignJykudHJpbSgpIDogdG9rWzBdLnNsaWNlKDAsIGxlbik7XG59XG5cbnZhciB0cnVuY2F0ZV93b3JkX3JlID0gLyhbXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTIwMjhcXHUyMDI5XFx1MzAwMFxcdUZFRkZdKS87XG4iLCJ2YXIganNvbiA9IHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJyA/IEpTT04gOiByZXF1aXJlKCdqc29uaWZ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykgb3B0cyA9IHsgY21wOiBvcHRzIH07XG4gICAgdmFyIHNwYWNlID0gb3B0cy5zcGFjZSB8fCAnJztcbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykgc3BhY2UgPSBBcnJheShzcGFjZSsxKS5qb2luKCcgJyk7XG4gICAgdmFyIGN5Y2xlcyA9ICh0eXBlb2Ygb3B0cy5jeWNsZXMgPT09ICdib29sZWFuJykgPyBvcHRzLmN5Y2xlcyA6IGZhbHNlO1xuICAgIHZhciByZXBsYWNlciA9IG9wdHMucmVwbGFjZXIgfHwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiAgICB2YXIgY21wID0gb3B0cy5jbXAgJiYgKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFvYmogPSB7IGtleTogYSwgdmFsdWU6IG5vZGVbYV0gfTtcbiAgICAgICAgICAgICAgICB2YXIgYm9iaiA9IHsga2V5OiBiLCB2YWx1ZTogbm9kZVtiXSB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmKGFvYmosIGJvYmopO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KShvcHRzLmNtcCk7XG5cbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIHJldHVybiAoZnVuY3Rpb24gc3RyaW5naWZ5IChwYXJlbnQsIGtleSwgbm9kZSwgbGV2ZWwpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHNwYWNlID8gKCdcXG4nICsgbmV3IEFycmF5KGxldmVsICsgMSkuam9pbihzcGFjZSkpIDogJyc7XG4gICAgICAgIHZhciBjb2xvblNlcGFyYXRvciA9IHNwYWNlID8gJzogJyA6ICc6JztcblxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLnRvSlNPTiAmJiB0eXBlb2Ygbm9kZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnRvSlNPTigpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IHJlcGxhY2VyLmNhbGwocGFyZW50LCBrZXksIG5vZGUpO1xuXG4gICAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnIHx8IG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uLnN0cmluZ2lmeShub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBzdHJpbmdpZnkobm9kZSwgaSwgbm9kZVtpXSwgbGV2ZWwrMSkgfHwganNvbi5zdHJpbmdpZnkobnVsbCk7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goaW5kZW50ICsgc3BhY2UgKyBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnWycgKyBvdXQuam9pbignLCcpICsgaW5kZW50ICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlZW4uaW5kZXhPZihub2RlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3ljbGVzKSByZXR1cm4ganNvbi5zdHJpbmdpZnkoJ19fY3ljbGVfXycpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbnZlcnRpbmcgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEpTT04nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugc2Vlbi5wdXNoKG5vZGUpO1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IG9iamVjdEtleXMobm9kZSkuc29ydChjbXAgJiYgY21wKG5vZGUpKTtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0cmluZ2lmeShub2RlLCBrZXksIG5vZGVba2V5XSwgbGV2ZWwrMSk7XG5cbiAgICAgICAgICAgICAgICBpZighdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleVZhbHVlID0ganNvbi5zdHJpbmdpZnkoa2V5KVxuICAgICAgICAgICAgICAgICAgICArIGNvbG9uU2VwYXJhdG9yXG4gICAgICAgICAgICAgICAgICAgICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsga2V5VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vlbi5zcGxpY2Uoc2Vlbi5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAneycgKyBvdXQuam9pbignLCcpICsgaW5kZW50ICsgJ30nO1xuICAgICAgICB9XG4gICAgfSkoeyAnJzogb2JqIH0sICcnLCBvYmosIDApO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlIH07XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn07XG4iLCJleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcbmV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9saWIvc3RyaW5naWZ5Jyk7XG4iLCJ2YXIgYXQsIC8vIFRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBjaGFyYWN0ZXJcbiAgICBjaCwgLy8gVGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgZXNjYXBlZSA9IHtcbiAgICAgICAgJ1wiJzogICdcIicsXG4gICAgICAgICdcXFxcJzogJ1xcXFwnLFxuICAgICAgICAnLyc6ICAnLycsXG4gICAgICAgIGI6ICAgICdcXGInLFxuICAgICAgICBmOiAgICAnXFxmJyxcbiAgICAgICAgbjogICAgJ1xcbicsXG4gICAgICAgIHI6ICAgICdcXHInLFxuICAgICAgICB0OiAgICAnXFx0J1xuICAgIH0sXG4gICAgdGV4dCxcblxuICAgIGVycm9yID0gZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgLy8gQ2FsbCBlcnJvciB3aGVuIHNvbWV0aGluZyBpcyB3cm9uZy5cbiAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgbmFtZTogICAgJ1N5bnRheEVycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG0sXG4gICAgICAgICAgICBhdDogICAgICBhdCxcbiAgICAgICAgICAgIHRleHQ6ICAgIHRleHRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIFxuICAgIG5leHQgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAvLyBJZiBhIGMgcGFyYW1ldGVyIGlzIHByb3ZpZGVkLCB2ZXJpZnkgdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IGNoYXJhY3Rlci5cbiAgICAgICAgaWYgKGMgJiYgYyAhPT0gY2gpIHtcbiAgICAgICAgICAgIGVycm9yKFwiRXhwZWN0ZWQgJ1wiICsgYyArIFwiJyBpbnN0ZWFkIG9mICdcIiArIGNoICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgdGhlIG5leHQgY2hhcmFjdGVyLiBXaGVuIHRoZXJlIGFyZSBubyBtb3JlIGNoYXJhY3RlcnMsXG4gICAgICAgIC8vIHJldHVybiB0aGUgZW1wdHkgc3RyaW5nLlxuICAgICAgICBcbiAgICAgICAgY2ggPSB0ZXh0LmNoYXJBdChhdCk7XG4gICAgICAgIGF0ICs9IDE7XG4gICAgICAgIHJldHVybiBjaDtcbiAgICB9LFxuICAgIFxuICAgIG51bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gUGFyc2UgYSBudW1iZXIgdmFsdWUuXG4gICAgICAgIHZhciBudW1iZXIsXG4gICAgICAgICAgICBzdHJpbmcgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmIChjaCA9PT0gJy0nKSB7XG4gICAgICAgICAgICBzdHJpbmcgPSAnLSc7XG4gICAgICAgICAgICBuZXh0KCctJyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPT09ICcuJykge1xuICAgICAgICAgICAgc3RyaW5nICs9ICcuJztcbiAgICAgICAgICAgIHdoaWxlIChuZXh0KCkgJiYgY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPT09ICdlJyB8fCBjaCA9PT0gJ0UnKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXIgPSArc3RyaW5nO1xuICAgICAgICBpZiAoIWlzRmluaXRlKG51bWJlcikpIHtcbiAgICAgICAgICAgIGVycm9yKFwiQmFkIG51bWJlclwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIHN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gUGFyc2UgYSBzdHJpbmcgdmFsdWUuXG4gICAgICAgIHZhciBoZXgsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgc3RyaW5nID0gJycsXG4gICAgICAgICAgICB1ZmZmZjtcbiAgICAgICAgXG4gICAgICAgIC8vIFdoZW4gcGFyc2luZyBmb3Igc3RyaW5nIHZhbHVlcywgd2UgbXVzdCBsb29rIGZvciBcIiBhbmQgXFwgY2hhcmFjdGVycy5cbiAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICd1Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWZmZmYgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCA9IHBhcnNlSW50KG5leHQoKSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoaGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWZmZmYgPSB1ZmZmZiAqIDE2ICsgaGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodWZmZmYpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlc2NhcGVlW2NoXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBlc2NhcGVlW2NoXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBzdHJpbmdcIik7XG4gICAgfSxcblxuICAgIHdoaXRlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBTa2lwIHdoaXRlc3BhY2UuXG5cbiAgICAgICAgd2hpbGUgKGNoICYmIGNoIDw9ICcgJykge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdvcmQgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIHRydWUsIGZhbHNlLCBvciBudWxsLlxuXG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICBuZXh0KCd0Jyk7XG4gICAgICAgICAgICBuZXh0KCdyJyk7XG4gICAgICAgICAgICBuZXh0KCd1Jyk7XG4gICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICBuZXh0KCdmJyk7XG4gICAgICAgICAgICBuZXh0KCdhJyk7XG4gICAgICAgICAgICBuZXh0KCdsJyk7XG4gICAgICAgICAgICBuZXh0KCdzJyk7XG4gICAgICAgICAgICBuZXh0KCdlJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgbmV4dCgnbicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJVbmV4cGVjdGVkICdcIiArIGNoICsgXCInXCIpO1xuICAgIH0sXG5cbiAgICB2YWx1ZSwgIC8vIFBsYWNlIGhvbGRlciBmb3IgdGhlIHZhbHVlIGZ1bmN0aW9uLlxuXG4gICAgYXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGFuIGFycmF5IHZhbHVlLlxuXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ1snKSB7XG4gICAgICAgICAgICBuZXh0KCdbJyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCddJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5OyAgIC8vIGVtcHR5IGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2gpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoJywnKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiQmFkIGFycmF5XCIpO1xuICAgIH0sXG5cbiAgICBvYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGFuIG9iamVjdCB2YWx1ZS5cblxuICAgICAgICB2YXIga2V5LFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG5cbiAgICAgICAgaWYgKGNoID09PSAneycpIHtcbiAgICAgICAgICAgIG5leHQoJ3snKTtcbiAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICd9Jykge1xuICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0OyAgIC8vIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgICAgICBuZXh0KCc6Jyk7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcignRHVwbGljYXRlIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZSgpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgnfScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBvYmplY3RcIik7XG4gICAgfTtcblxudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBhcnNlIGEgSlNPTiB2YWx1ZS4gSXQgY291bGQgYmUgYW4gb2JqZWN0LCBhbiBhcnJheSwgYSBzdHJpbmcsIGEgbnVtYmVyLFxuLy8gb3IgYSB3b3JkLlxuXG4gICAgd2hpdGUoKTtcbiAgICBzd2l0Y2ggKGNoKSB7XG4gICAgY2FzZSAneyc6XG4gICAgICAgIHJldHVybiBvYmplY3QoKTtcbiAgICBjYXNlICdbJzpcbiAgICAgICAgcmV0dXJuIGFycmF5KCk7XG4gICAgY2FzZSAnXCInOlxuICAgICAgICByZXR1cm4gc3RyaW5nKCk7XG4gICAgY2FzZSAnLSc6XG4gICAgICAgIHJldHVybiBudW1iZXIoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gY2ggPj0gJzAnICYmIGNoIDw9ICc5JyA/IG51bWJlcigpIDogd29yZCgpO1xuICAgIH1cbn07XG5cbi8vIFJldHVybiB0aGUganNvbl9wYXJzZSBmdW5jdGlvbi4gSXQgd2lsbCBoYXZlIGFjY2VzcyB0byBhbGwgb2YgdGhlIGFib3ZlXG4vLyBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlcy5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc291cmNlLCByZXZpdmVyKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBcbiAgICB0ZXh0ID0gc291cmNlO1xuICAgIGF0ID0gMDtcbiAgICBjaCA9ICcgJztcbiAgICByZXN1bHQgPSB2YWx1ZSgpO1xuICAgIHdoaXRlKCk7XG4gICAgaWYgKGNoKSB7XG4gICAgICAgIGVycm9yKFwiU3ludGF4IGVycm9yXCIpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcmV2aXZlciBmdW5jdGlvbiwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSxcbiAgICAvLyBwYXNzaW5nIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIHRoZSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZVxuICAgIC8vIHRyYW5zZm9ybWF0aW9uLCBzdGFydGluZyB3aXRoIGEgdGVtcG9yYXJ5IHJvb3Qgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHJlc3VsdFxuICAgIC8vIGluIGFuIGVtcHR5IGtleS4gSWYgdGhlcmUgaXMgbm90IGEgcmV2aXZlciBmdW5jdGlvbiwgd2Ugc2ltcGx5IHJldHVybiB0aGVcbiAgICAvLyByZXN1bHQuXG5cbiAgICByZXR1cm4gdHlwZW9mIHJldml2ZXIgPT09ICdmdW5jdGlvbicgPyAoZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9KHsnJzogcmVzdWx0fSwgJycpKSA6IHJlc3VsdDtcbn07XG4iLCJ2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBlc2NhcGFibGUgPSAvW1xcXFxcXFwiXFx4MDAtXFx4MWZcXHg3Zi1cXHg5ZlxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgIGdhcCxcbiAgICBpbmRlbnQsXG4gICAgbWV0YSA9IHsgICAgLy8gdGFibGUgb2YgY2hhcmFjdGVyIHN1YnN0aXR1dGlvbnNcbiAgICAgICAgJ1xcYic6ICdcXFxcYicsXG4gICAgICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICAgICAnXFxuJzogJ1xcXFxuJyxcbiAgICAgICAgJ1xcZic6ICdcXFxcZicsXG4gICAgICAgICdcXHInOiAnXFxcXHInLFxuICAgICAgICAnXCInIDogJ1xcXFxcIicsXG4gICAgICAgICdcXFxcJzogJ1xcXFxcXFxcJ1xuICAgIH0sXG4gICAgcmVwO1xuXG5mdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgc3RyaW5nIGNvbnRhaW5zIG5vIGNvbnRyb2wgY2hhcmFjdGVycywgbm8gcXVvdGUgY2hhcmFjdGVycywgYW5kIG5vXG4gICAgLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbiAgICAvLyBPdGhlcndpc2Ugd2UgbXVzdCBhbHNvIHJlcGxhY2UgdGhlIG9mZmVuZGluZyBjaGFyYWN0ZXJzIHdpdGggc2FmZSBlc2NhcGVcbiAgICAvLyBzZXF1ZW5jZXMuXG4gICAgXG4gICAgZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIGVzY2FwYWJsZS50ZXN0KHN0cmluZykgPyAnXCInICsgc3RyaW5nLnJlcGxhY2UoZXNjYXBhYmxlLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYyA9IG1ldGFbYV07XG4gICAgICAgIHJldHVybiB0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBjIDpcbiAgICAgICAgICAgICdcXFxcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgIH0pICsgJ1wiJyA6ICdcIicgKyBzdHJpbmcgKyAnXCInO1xufVxuXG5mdW5jdGlvbiBzdHIoa2V5LCBob2xkZXIpIHtcbiAgICAvLyBQcm9kdWNlIGEgc3RyaW5nIGZyb20gaG9sZGVyW2tleV0uXG4gICAgdmFyIGksICAgICAgICAgIC8vIFRoZSBsb29wIGNvdW50ZXIuXG4gICAgICAgIGssICAgICAgICAgIC8vIFRoZSBtZW1iZXIga2V5LlxuICAgICAgICB2LCAgICAgICAgICAvLyBUaGUgbWVtYmVyIHZhbHVlLlxuICAgICAgICBsZW5ndGgsXG4gICAgICAgIG1pbmQgPSBnYXAsXG4gICAgICAgIHBhcnRpYWwsXG4gICAgICAgIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgXG4gICAgLy8gSWYgdGhlIHZhbHVlIGhhcyBhIHRvSlNPTiBtZXRob2QsIGNhbGwgaXQgdG8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KTtcbiAgICB9XG4gICAgXG4gICAgLy8gSWYgd2Ugd2VyZSBjYWxsZWQgd2l0aCBhIHJlcGxhY2VyIGZ1bmN0aW9uLCB0aGVuIGNhbGwgdGhlIHJlcGxhY2VyIHRvXG4gICAgLy8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG4gICAgaWYgKHR5cGVvZiByZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSByZXAuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICAvLyBXaGF0IGhhcHBlbnMgbmV4dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSdzIHR5cGUuXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBxdW90ZSh2YWx1ZSk7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBFbmNvZGUgbm9uLWZpbml0ZSBudW1iZXJzIGFzIG51bGwuXG4gICAgICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6ICdudWxsJztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4gb3IgbnVsbCwgY29udmVydCBpdCB0byBhIHN0cmluZy4gTm90ZTpcbiAgICAgICAgICAgIC8vIHR5cGVvZiBudWxsIGRvZXMgbm90IHByb2R1Y2UgJ251bGwnLiBUaGUgY2FzZSBpcyBpbmNsdWRlZCBoZXJlIGluXG4gICAgICAgICAgICAvLyB0aGUgcmVtb3RlIGNoYW5jZSB0aGF0IHRoaXMgZ2V0cyBmaXhlZCBzb21lZGF5LlxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybiAnbnVsbCc7XG4gICAgICAgICAgICBnYXAgKz0gaW5kZW50O1xuICAgICAgICAgICAgcGFydGlhbCA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBcnJheS5pc0FycmF5XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWxbaV0gPSBzdHIoaSwgdmFsdWUpIHx8ICdudWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZFxuICAgICAgICAgICAgICAgIC8vIHdyYXAgdGhlbSBpbiBicmFja2V0cy5cbiAgICAgICAgICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAnW10nIDogZ2FwID9cbiAgICAgICAgICAgICAgICAgICAgJ1tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnXScgOlxuICAgICAgICAgICAgICAgICAgICAnWycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICddJztcbiAgICAgICAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVwbGFjZXIgaXMgYW4gYXJyYXksIHVzZSBpdCB0byBzZWxlY3QgdGhlIG1lbWJlcnMgdG8gYmVcbiAgICAgICAgICAgIC8vIHN0cmluZ2lmaWVkLlxuICAgICAgICAgICAgaWYgKHJlcCAmJiB0eXBlb2YgcmVwID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJlcC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSByZXBbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBtZW1iZXIgdGV4dHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcyxcbiAgICAgICAgLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ3t9JyA6IGdhcCA/XG4gICAgICAgICAgICAne1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICd9JyA6XG4gICAgICAgICAgICAneycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICd9JztcbiAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgdmFyIGk7XG4gICAgZ2FwID0gJyc7XG4gICAgaW5kZW50ID0gJyc7XG4gICAgXG4gICAgLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIG51bWJlciwgbWFrZSBhbiBpbmRlbnQgc3RyaW5nIGNvbnRhaW5pbmcgdGhhdFxuICAgIC8vIG1hbnkgc3BhY2VzLlxuICAgIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzcGFjZTsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gJyAnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5kZW50IHN0cmluZy5cbiAgICBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGluZGVudCA9IHNwYWNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbiAgICAvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yLlxuICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgIGlmIChyZXBsYWNlciAmJiB0eXBlb2YgcmVwbGFjZXIgIT09ICdmdW5jdGlvbidcbiAgICAmJiAodHlwZW9mIHJlcGxhY2VyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKU09OLnN0cmluZ2lmeScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBNYWtlIGEgZmFrZSByb290IG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSB1bmRlciB0aGUga2V5IG9mICcnLlxuICAgIC8vIFJldHVybiB0aGUgcmVzdWx0IG9mIHN0cmluZ2lmeWluZyB0aGUgdmFsdWUuXG4gICAgcmV0dXJuIHN0cignJywgeycnOiB2YWx1ZX0pO1xufTtcbiIsIlxuZXhwb3J0IGVudW0gQWdncmVnYXRlT3Age1xuICAgIFZBTFVFUyA9ICd2YWx1ZXMnIGFzIGFueSxcbiAgICBDT1VOVCA9ICdjb3VudCcgYXMgYW55LFxuICAgIFZBTElEID0gJ3ZhbGlkJyBhcyBhbnksXG4gICAgTUlTU0lORyA9ICdtaXNzaW5nJyBhcyBhbnksXG4gICAgRElTVElOQ1QgPSAnZGlzdGluY3QnIGFzIGFueSxcbiAgICBTVU0gPSAnc3VtJyBhcyBhbnksXG4gICAgTUVBTiA9ICdtZWFuJyBhcyBhbnksXG4gICAgQVZFUkFHRSA9ICdhdmVyYWdlJyBhcyBhbnksXG4gICAgVkFSSUFOQ0UgPSAndmFyaWFuY2UnIGFzIGFueSxcbiAgICBWQVJJQU5DRVAgPSAndmFyaWFuY2VwJyBhcyBhbnksXG4gICAgU1RERVYgPSAnc3RkZXYnIGFzIGFueSxcbiAgICBTVERFVlAgPSAnc3RkZXZwJyBhcyBhbnksXG4gICAgTUVESUFOID0gJ21lZGlhbicgYXMgYW55LFxuICAgIFExID0gJ3ExJyBhcyBhbnksXG4gICAgUTMgPSAncTMnIGFzIGFueSxcbiAgICBNT0RFU0tFVyA9ICdtb2Rlc2tldycgYXMgYW55LFxuICAgIE1JTiA9ICdtaW4nIGFzIGFueSxcbiAgICBNQVggPSAnbWF4JyBhcyBhbnksXG4gICAgQVJHTUlOID0gJ2FyZ21pbicgYXMgYW55LFxuICAgIEFSR01BWCA9ICdhcmdtYXgnIGFzIGFueSxcbn1cblxuZXhwb3J0IGNvbnN0IEFHR1JFR0FURV9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuVkFMVUVTLFxuICAgIEFnZ3JlZ2F0ZU9wLkNPVU5ULFxuICAgIEFnZ3JlZ2F0ZU9wLlZBTElELFxuICAgIEFnZ3JlZ2F0ZU9wLk1JU1NJTkcsXG4gICAgQWdncmVnYXRlT3AuRElTVElOQ1QsXG4gICAgQWdncmVnYXRlT3AuU1VNLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FQU4sXG4gICAgQWdncmVnYXRlT3AuQVZFUkFHRSxcbiAgICBBZ2dyZWdhdGVPcC5WQVJJQU5DRSxcbiAgICBBZ2dyZWdhdGVPcC5WQVJJQU5DRVAsXG4gICAgQWdncmVnYXRlT3AuU1RERVYsXG4gICAgQWdncmVnYXRlT3AuU1RERVZQLFxuICAgIEFnZ3JlZ2F0ZU9wLk1FRElBTixcbiAgICBBZ2dyZWdhdGVPcC5RMSxcbiAgICBBZ2dyZWdhdGVPcC5RMyxcbiAgICBBZ2dyZWdhdGVPcC5NT0RFU0tFVyxcbiAgICBBZ2dyZWdhdGVPcC5NSU4sXG4gICAgQWdncmVnYXRlT3AuTUFYLFxuICAgIEFnZ3JlZ2F0ZU9wLkFSR01JTixcbiAgICBBZ2dyZWdhdGVPcC5BUkdNQVgsXG5dO1xuXG4vKiogQWRkaXRpdmUtYmFzZWQgYWdncmVnYXRpb24gb3BlcmF0aW9ucy4gIFRoZXNlIGNhbiBiZSBhcHBsaWVkIHRvIHN0YWNrLiAqL1xuZXhwb3J0IGNvbnN0IFNVTV9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuQ09VTlQsXG4gICAgQWdncmVnYXRlT3AuU1VNLFxuICAgIEFnZ3JlZ2F0ZU9wLkRJU1RJTkNUXG5dO1xuXG5leHBvcnQgY29uc3QgU0hBUkVEX0RPTUFJTl9PUFMgPSBbXG4gICAgQWdncmVnYXRlT3AuTUVBTixcbiAgICBBZ2dyZWdhdGVPcC5BVkVSQUdFLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWLFxuICAgIEFnZ3JlZ2F0ZU9wLlNUREVWUCxcbiAgICBBZ2dyZWdhdGVPcC5NRURJQU4sXG4gICAgQWdncmVnYXRlT3AuUTEsXG4gICAgQWdncmVnYXRlT3AuUTMsXG4gICAgQWdncmVnYXRlT3AuTUlOLFxuICAgIEFnZ3JlZ2F0ZU9wLk1BWCxcbl07XG5cbi8vIFRPRE86IG1vdmUgc3VwcG9ydGVkVHlwZXMsIHN1cHBvcnRlZEVudW1zIGZyb20gc2NoZW1hIHRvIGhlcmVcbiIsIlxuZXhwb3J0IGVudW0gQXhpc09yaWVudCB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIFJJR0hUID0gJ3JpZ2h0JyBhcyBhbnksXG4gICAgTEVGVCA9ICdsZWZ0JyBhcyBhbnksXG4gICAgQk9UVE9NID0gJ2JvdHRvbScgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXhpc0NvbmZpZyB7XG4gIC8vIC0tLS0tLS0tLS0gR2VuZXJhbCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgYXhpcyBsaW5lXG4gICAqL1xuICBheGlzV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIGlmIHRoZSBheGlzIChhbmQgYW55IGdyaWRsaW5lcykgc2hvdWxkIGJlIHBsYWNlZCBhYm92ZSBvciBiZWxvdyB0aGUgZGF0YSBtYXJrcy5cbiAgICovXG4gIGxheWVyPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG9mZnNldCwgaW4gcGl4ZWxzLCBieSB3aGljaCB0byBkaXNwbGFjZSB0aGUgYXhpcyBmcm9tIHRoZSBlZGdlIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgb3IgZGF0YSByZWN0YW5nbGUuXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBBeGlzIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIENvbG9yIG9mIGF4aXMgbGluZS5cbiAgICovXG4gIGF4aXNDb2xvcj86IHN0cmluZztcblxuICAvLyAtLS0tLS0tLS0tIEdyaWQgLS0tLS0tLS0tLVxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRlIGlmIGdyaWRsaW5lcyBzaG91bGQgYmUgY3JlYXRlZCBpbiBhZGRpdGlvbiB0byB0aWNrcy4gSWYgYGdyaWRgIGlzIHVuc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAgZm9yIFJPVyBhbmQgQ09MLiBGb3IgWCBhbmQgWSwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgIGZvciBxdWFudGl0YXRpdmUgYW5kIHRpbWUgZmllbGRzIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICovXG4gIGdyaWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiBncmlkbGluZXMuXG4gICAqL1xuICBncmlkQ29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIGdyaWQgZGFzaCBhcnJheS5cbiAgICovXG4gIGdyaWREYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBvZiBncmlkICh2YWx1ZSBiZXR3ZWVuIFswLDFdKVxuICAgKi9cbiAgZ3JpZE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHdpZHRoLCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmlkV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBMYWJlbHMgLS0tLS0tLS0tLVxuICAvKipcbiAgICogRW5hYmxlIG9yIGRpc2FibGUgbGFiZWxzLlxuICAgKi9cbiAgbGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSByb3RhdGlvbiBhbmdsZSBvZiB0aGUgYXhpcyBsYWJlbHMuXG4gICAqL1xuICBsYWJlbEFuZ2xlPzogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCBhbGlnbm1lbnQgZm9yIHRoZSBMYWJlbC5cbiAgICovXG4gIGxhYmVsQWxpZ24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUZXh0IGJhc2VsaW5lIGZvciB0aGUgbGFiZWwuXG4gICAqL1xuICBsYWJlbEJhc2VsaW5lPzogc3RyaW5nO1xuICAvKipcbiAgICogVHJ1bmNhdGUgbGFiZWxzIHRoYXQgYXJlIHRvbyBsb25nLlxuICAgKiBAbWluaW11bSAxXG4gICAqL1xuICBsYWJlbE1heExlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggYW5kIGRheSBuYW1lcyBzaG91bGQgYmUgYWJicmV2aWF0ZWQuXG4gICAqL1xuICBzaG9ydFRpbWVMYWJlbHM/OiBib29sZWFuO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGlja3MgLS0tLS0tLS0tLVxuICAvKipcbiAgICogSWYgcHJvdmlkZWQsIHNldHMgdGhlIG51bWJlciBvZiBtaW5vciB0aWNrcyBiZXR3ZWVuIG1ham9yIHRpY2tzICh0aGUgdmFsdWUgOSByZXN1bHRzIGluIGRlY2ltYWwgc3ViZGl2aXNpb24pLiBPbmx5IGFwcGxpY2FibGUgZm9yIGF4ZXMgdmlzdWFsaXppbmcgcXVhbnRpdGF0aXZlIHNjYWxlcy5cbiAgICovXG4gIHN1YmRpdmlkZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEEgZGVzaXJlZCBudW1iZXIgb2YgdGlja3MsIGZvciBheGVzIHZpc3VhbGl6aW5nIHF1YW50aXRhdGl2ZSBzY2FsZXMuIFRoZSByZXN1bHRpbmcgbnVtYmVyIG1heSBiZSBkaWZmZXJlbnQgc28gdGhhdCB2YWx1ZXMgYXJlIFwibmljZVwiIChtdWx0aXBsZXMgb2YgMiwgNSwgMTApIGFuZCBsaWUgd2l0aGluIHRoZSB1bmRlcmx5aW5nIHNjYWxlJ3MgcmFuZ2UuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tzPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGF4aXMncyB0aWNrLlxuICAgKi9cbiAgdGlja0NvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIHRpY2sgbGFiZWwsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aWNrTGFiZWxDb2xvcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIHRpY2sgbGFiZWwuXG4gICAqL1xuICB0aWNrTGFiZWxGb250Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIG9mIGxhYmVsLCBpbiBwaXhlbHMuXG4gICAqL1xuICB0aWNrTGFiZWxGb250U2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aWNrcyBhbmQgdGV4dCBsYWJlbHMuXG4gICAqL1xuICB0aWNrUGFkZGluZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yLCBtaW5vciBhbmQgZW5kIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzaXplLCBpbiBwaXhlbHMsIG9mIG1ham9yIHRpY2tzLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aWNrU2l6ZU1ham9yPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHNpemUsIGluIHBpeGVscywgb2YgbWlub3IgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplTWlub3I/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBlbmQgdGlja3MuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRpY2tTaXplRW5kPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGgsIGluIHBpeGVscywgb2YgdGlja3MuXG4gICAqL1xuICB0aWNrV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBUaXRsZSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgdGl0bGUsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aXRsZUNvbG9yPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGb250IG9mIHRoZSB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udD86IHN0cmluZztcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgdGl0bGUuXG4gICAqL1xuICB0aXRsZUZvbnRTaXplPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXZWlnaHQgb2YgdGhlIHRpdGxlLlxuICAgKi9cbiAgdGl0bGVGb250V2VpZ2h0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRpdGxlIG9mZnNldCB2YWx1ZSBmb3IgdGhlIGF4aXMuXG4gICAqL1xuICB0aXRsZU9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIE1heCBsZW5ndGggZm9yIGF4aXMgdGl0bGUgaWYgdGhlIHRpdGxlIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGZyb20gdGhlIGZpZWxkJ3MgZGVzY3JpcHRpb24uIEJ5IGRlZmF1bHQsIHRoaXMgaXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiBjZWxsIHNpemUgYW5kIGNoYXJhY3RlcldpZHRoIHByb3BlcnR5LlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICB0aXRsZU1heExlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIENoYXJhY3RlciB3aWR0aCBmb3IgYXV0b21hdGljYWxseSBkZXRlcm1pbmluZyB0aXRsZSBtYXggbGVuZ3RoLlxuICAgKi9cbiAgY2hhcmFjdGVyV2lkdGg/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBPdGhlciAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gYXhpcyBzdHlsaW5nLlxuICAgKi9cbiAgcHJvcGVydGllcz86IGFueTsgLy8gVE9ETzogcmVwbGFjZVxufVxuXG4vLyBUT0RPOiBhZGQgY29tbWVudCBmb3IgcHJvcGVydGllcyB0aGF0IHdlIHJlbHkgb24gVmVnYSdzIGRlZmF1bHQgdG8gcHJvZHVjZVxuLy8gbW9yZSBjb25jaXNlIFZlZ2Egb3V0cHV0LlxuXG5leHBvcnQgY29uc3QgZGVmYXVsdEF4aXNDb25maWc6IEF4aXNDb25maWcgPSB7XG4gIG9mZnNldDogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IDBcbiAgZ3JpZDogdW5kZWZpbmVkLCAvLyBhdXRvbWF0aWNhbGx5IGRldGVybWluZWRcbiAgbGFiZWxzOiB0cnVlLFxuICBsYWJlbE1heExlbmd0aDogMjUsXG4gIHRpY2tTaXplOiB1bmRlZmluZWQsIC8vIGltcGxpY2l0bHkgNlxuICBjaGFyYWN0ZXJXaWR0aDogNlxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGYWNldEF4aXNDb25maWc6IEF4aXNDb25maWcgPSB7XG4gIGF4aXNXaWR0aDogMCxcbiAgbGFiZWxzOiB0cnVlLFxuICBncmlkOiBmYWxzZSxcbiAgdGlja1NpemU6IDBcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXhpcyBleHRlbmRzIEF4aXNDb25maWcge1xuICAvKipcbiAgICogVGhlIHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBheGlzIGxhYmVscy5cbiAgICovXG4gIGxhYmVsQW5nbGU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBheGlzIGxhYmVscy5cbiAgICovXG4gIGZvcm1hdD86IHN0cmluZzsgLy8gZGVmYXVsdCB2YWx1ZSBkZXRlcm1pbmVkIGJ5IGNvbmZpZy5mb3JtYXQgYW55d2F5XG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIGF4aXMuIE9uZSBvZiB0b3AsIGJvdHRvbSwgbGVmdCBvciByaWdodC4gVGhlIG9yaWVudGF0aW9uIGNhbiBiZSB1c2VkIHRvIGZ1cnRoZXIgc3BlY2lhbGl6ZSB0aGUgYXhpcyB0eXBlIChlLmcuLCBhIHkgYXhpcyBvcmllbnRlZCBmb3IgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIGNoYXJ0KS5cbiAgICovXG4gIG9yaWVudD86IEF4aXNPcmllbnQ7XG4gIC8qKlxuICAgKiBBIHRpdGxlIGZvciB0aGUgYXhpcy4gU2hvd3MgZmllbGQgbmFtZSBhbmQgaXRzIGZ1bmN0aW9uIGJ5IGRlZmF1bHQuXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgdmFsdWVzPzogbnVtYmVyW107XG59XG4iLCJpbXBvcnQge0NoYW5uZWwsIFJPVywgQ09MVU1OLCBTSEFQRSwgU0laRX0gZnJvbSAnLi9jaGFubmVsJztcblxuLyoqXG4gKiBCaW5uaW5nIHByb3BlcnRpZXMgb3IgYm9vbGVhbiBmbGFnIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIGJpbiBkYXRhIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCaW4ge1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gYmluIHZhbHVlIHRvIGNvbnNpZGVyLiBJZiB1bnNwZWNpZmllZCwgdGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyB1c2VkLlxuICAgKi9cbiAgbWluPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1heGltdW0gYmluIHZhbHVlIHRvIGNvbnNpZGVyLiBJZiB1bnNwZWNpZmllZCwgdGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyB1c2VkLlxuICAgKi9cbiAgbWF4PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG51bWJlciBiYXNlIHRvIHVzZSBmb3IgYXV0b21hdGljIGJpbiBkZXRlcm1pbmF0aW9uIChkZWZhdWx0IGlzIGJhc2UgMTApLlxuICAgKi9cbiAgYmFzZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFuIGV4YWN0IHN0ZXAgc2l6ZSB0byB1c2UgYmV0d2VlbiBiaW5zLiBJZiBwcm92aWRlZCwgb3B0aW9ucyBzdWNoIGFzIG1heGJpbnMgd2lsbCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgc3RlcD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGFsbG93YWJsZSBzdGVwIHNpemVzIHRvIGNob29zZSBmcm9tLlxuICAgKi9cbiAgc3RlcHM/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEEgbWluaW11bSBhbGxvd2FibGUgc3RlcCBzaXplIChwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBpbnRlZ2VyIHZhbHVlcykuXG4gICAqL1xuICBtaW5zdGVwPzogbnVtYmVyO1xuICAvKipcbiAgICogU2NhbGUgZmFjdG9ycyBpbmRpY2F0aW5nIGFsbG93YWJsZSBzdWJkaXZpc2lvbnMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIFs1LCAyXSwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgZm9yIGJhc2UgMTAgbnVtYmVycyAodGhlIGRlZmF1bHQgYmFzZSksIHRoZSBtZXRob2QgbWF5IGNvbnNpZGVyIGRpdmlkaW5nIGJpbiBzaXplcyBieSA1IGFuZC9vciAyLiBGb3IgZXhhbXBsZSwgZm9yIGFuIGluaXRpYWwgc3RlcCBzaXplIG9mIDEwLCB0aGUgbWV0aG9kIGNhbiBjaGVjayBpZiBiaW4gc2l6ZXMgb2YgMiAoPSAxMC81KSwgNSAoPSAxMC8yKSwgb3IgMSAoPSAxMC8oNSoyKSkgbWlnaHQgYWxzbyBzYXRpc2Z5IHRoZSBnaXZlbiBjb25zdHJhaW50cy5cbiAgICovXG4gIGRpdj86IG51bWJlcltdO1xuICAvKipcbiAgICogTWF4aW11bSBudW1iZXIgb2YgYmlucy5cbiAgICogQG1pbmltdW0gMlxuICAgKi9cbiAgbWF4Ymlucz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9NYXhCaW5zKGNoYW5uZWw6IENoYW5uZWwpOiBudW1iZXIge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFJPVzpcbiAgICBjYXNlIENPTFVNTjpcbiAgICBjYXNlIFNJWkU6XG4gICAgICAvLyBGYWNldHMgYW5kIFNpemUgc2hvdWxkbid0IGhhdmUgdG9vIG1hbnkgYmluc1xuICAgICAgLy8gV2UgY2hvb3NlIDYgbGlrZSBzaGFwZSB0byBzaW1wbGlmeSB0aGUgcnVsZVxuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4gNjsgLy8gVmVnYSdzIFwic2hhcGVcIiBoYXMgNiBkaXN0aW5jdCB2YWx1ZXNcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDEwO1xuICB9XG59XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGVuY29kaW5nIGNoYW5uZWxzIChWaXN1YWwgdmFyaWFibGVzKVxuICogc3VjaCBhcyAneCcsICd5JywgJ2NvbG9yJy5cbiAqL1xuXG5pbXBvcnQge01hcmt9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCB3aXRob3V0fSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZW51bSBDaGFubmVsIHtcbiAgWCA9ICd4JyBhcyBhbnksXG4gIFkgPSAneScgYXMgYW55LFxuICBYMiA9ICd4MicgYXMgYW55LFxuICBZMiA9ICd5MicgYXMgYW55LFxuICBST1cgPSAncm93JyBhcyBhbnksXG4gIENPTFVNTiA9ICdjb2x1bW4nIGFzIGFueSxcbiAgU0hBUEUgPSAnc2hhcGUnIGFzIGFueSxcbiAgU0laRSA9ICdzaXplJyBhcyBhbnksXG4gIENPTE9SID0gJ2NvbG9yJyBhcyBhbnksXG4gIFRFWFQgPSAndGV4dCcgYXMgYW55LFxuICBERVRBSUwgPSAnZGV0YWlsJyBhcyBhbnksXG4gIExBQkVMID0gJ2xhYmVsJyBhcyBhbnksXG4gIFBBVEggPSAncGF0aCcgYXMgYW55LFxuICBPUkRFUiA9ICdvcmRlcicgYXMgYW55LFxuICBPUEFDSVRZID0gJ29wYWNpdHknIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgWCA9IENoYW5uZWwuWDtcbmV4cG9ydCBjb25zdCBZID0gQ2hhbm5lbC5ZO1xuZXhwb3J0IGNvbnN0IFgyID0gQ2hhbm5lbC5YMjtcbmV4cG9ydCBjb25zdCBZMiA9IENoYW5uZWwuWTI7XG5leHBvcnQgY29uc3QgUk9XID0gQ2hhbm5lbC5ST1c7XG5leHBvcnQgY29uc3QgQ09MVU1OID0gQ2hhbm5lbC5DT0xVTU47XG5leHBvcnQgY29uc3QgU0hBUEUgPSBDaGFubmVsLlNIQVBFO1xuZXhwb3J0IGNvbnN0IFNJWkUgPSBDaGFubmVsLlNJWkU7XG5leHBvcnQgY29uc3QgQ09MT1IgPSBDaGFubmVsLkNPTE9SO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBDaGFubmVsLlRFWFQ7XG5leHBvcnQgY29uc3QgREVUQUlMID0gQ2hhbm5lbC5ERVRBSUw7XG5leHBvcnQgY29uc3QgTEFCRUwgPSBDaGFubmVsLkxBQkVMO1xuZXhwb3J0IGNvbnN0IFBBVEggPSBDaGFubmVsLlBBVEg7XG5leHBvcnQgY29uc3QgT1JERVIgPSBDaGFubmVsLk9SREVSO1xuZXhwb3J0IGNvbnN0IE9QQUNJVFkgPSBDaGFubmVsLk9QQUNJVFk7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMUyA9IFtYLCBZLCBYMiwgWTIsIFJPVywgQ09MVU1OLCBTSVpFLCBTSEFQRSwgQ09MT1IsIFBBVEgsIE9SREVSLCBPUEFDSVRZLCBURVhULCBERVRBSUwsIExBQkVMXTtcblxuZXhwb3J0IGNvbnN0IFVOSVRfQ0hBTk5FTFMgPSB3aXRob3V0KENIQU5ORUxTLCBbUk9XLCBDT0xVTU5dKTtcbmV4cG9ydCBjb25zdCBVTklUX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX0NIQU5ORUxTLCBbUEFUSCwgT1JERVIsIERFVEFJTCwgVEVYVCwgTEFCRUwsIFgyLCBZMl0pO1xuZXhwb3J0IGNvbnN0IE5PTlNQQVRJQUxfQ0hBTk5FTFMgPSB3aXRob3V0KFVOSVRfQ0hBTk5FTFMsIFtYLCBZLCBYMiwgWTJdKTtcbmV4cG9ydCBjb25zdCBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTID0gd2l0aG91dChVTklUX1NDQUxFX0NIQU5ORUxTLCBbWCwgWSwgWDIsIFkyXSk7XG5cbi8qKiBDaGFubmVscyB0aGF0IGNhbiBzZXJ2ZSBhcyBncm91cGluZ3MgZm9yIHN0YWNrZWQgY2hhcnRzLiAqL1xuZXhwb3J0IGNvbnN0IFNUQUNLX0dST1VQX0NIQU5ORUxTID0gW0NPTE9SLCBERVRBSUwsIE9SREVSLCBPUEFDSVRZLCBTSVpFXTtcblxuZXhwb3J0IGludGVyZmFjZSBTdXBwb3J0ZWRNYXJrIHtcbiAgcG9pbnQ/OiBib29sZWFuO1xuICB0aWNrPzogYm9vbGVhbjtcbiAgcnVsZT86IGJvb2xlYW47XG4gIGNpcmNsZT86IGJvb2xlYW47XG4gIHNxdWFyZT86IGJvb2xlYW47XG4gIGJhcj86IGJvb2xlYW47XG4gIGxpbmU/OiBib29sZWFuO1xuICBhcmVhPzogYm9vbGVhbjtcbiAgdGV4dD86IGJvb2xlYW47XG59O1xuXG4vKipcbiAqIFJldHVybiB3aGV0aGVyIGEgY2hhbm5lbCBzdXBwb3J0cyBhIHBhcnRpY3VsYXIgbWFyayB0eXBlLlxuICogQHBhcmFtIGNoYW5uZWwgIGNoYW5uZWwgbmFtZVxuICogQHBhcmFtIG1hcmsgdGhlIG1hcmsgdHlwZVxuICogQHJldHVybiB3aGV0aGVyIHRoZSBtYXJrIHN1cHBvcnRzIHRoZSBjaGFubmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0TWFyayhjaGFubmVsOiBDaGFubmVsLCBtYXJrOiBNYXJrKSB7XG4gIHJldHVybiAhIWdldFN1cHBvcnRlZE1hcmsoY2hhbm5lbClbbWFya107XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZGljdGlvbmFyeSBzaG93aW5nIHdoZXRoZXIgYSBjaGFubmVsIHN1cHBvcnRzIG1hcmsgdHlwZS5cbiAqIEBwYXJhbSBjaGFubmVsXG4gKiBAcmV0dXJuIEEgZGljdGlvbmFyeSBtYXBwaW5nIG1hcmsgdHlwZXMgdG8gYm9vbGVhbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRNYXJrKGNoYW5uZWw6IENoYW5uZWwpOiBTdXBwb3J0ZWRNYXJrIHtcbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBYOlxuICAgIGNhc2UgWTpcbiAgICBjYXNlIENPTE9SOlxuICAgIGNhc2UgREVUQUlMOlxuICAgIGNhc2UgT1JERVI6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgUk9XOlxuICAgIGNhc2UgQ09MVU1OOlxuICAgICAgcmV0dXJuIHsgLy8gYWxsIG1hcmtzXG4gICAgICAgIHBvaW50OiB0cnVlLCB0aWNrOiB0cnVlLCBydWxlOiB0cnVlLCBjaXJjbGU6IHRydWUsIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgYmFyOiB0cnVlLCBsaW5lOiB0cnVlLCBhcmVhOiB0cnVlLCB0ZXh0OiB0cnVlXG4gICAgICB9O1xuICAgIGNhc2UgWDI6XG4gICAgY2FzZSBZMjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJ1bGU6IHRydWUsIGJhcjogdHJ1ZSwgYXJlYTogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNJWkU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludDogdHJ1ZSwgdGljazogdHJ1ZSwgcnVsZTogdHJ1ZSwgY2lyY2xlOiB0cnVlLCBzcXVhcmU6IHRydWUsXG4gICAgICAgIGJhcjogdHJ1ZSwgdGV4dDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtwb2ludDogdHJ1ZX07XG4gICAgY2FzZSBURVhUOlxuICAgICAgcmV0dXJuIHt0ZXh0OiB0cnVlfTtcbiAgICBjYXNlIFBBVEg6XG4gICAgICByZXR1cm4ge2xpbmU6IHRydWV9O1xuICB9XG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwb3J0ZWRSb2xlIHtcbiAgbWVhc3VyZTogYm9vbGVhbjtcbiAgZGltZW5zaW9uOiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gd2hldGhlciBhIGNoYW5uZWwgc3VwcG9ydHMgZGltZW5zaW9uIC8gbWVhc3VyZSByb2xlXG4gKiBAcGFyYW0gIGNoYW5uZWxcbiAqIEByZXR1cm4gQSBkaWN0aW9uYXJ5IG1hcHBpbmcgcm9sZSB0byBib29sZWFuIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZFJvbGUoY2hhbm5lbDogQ2hhbm5lbCk6IFN1cHBvcnRlZFJvbGUge1xuICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICBjYXNlIFg6XG4gICAgY2FzZSBZOlxuICAgIGNhc2UgQ09MT1I6XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgIGNhc2UgTEFCRUw6XG4gICAgY2FzZSBERVRBSUw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBST1c6XG4gICAgY2FzZSBDT0xVTU46XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gICAgY2FzZSBYMjpcbiAgICBjYXNlIFkyOlxuICAgIGNhc2UgU0laRTpcbiAgICBjYXNlIFRFWFQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZWFzdXJlOiB0cnVlLFxuICAgICAgICBkaW1lbnNpb246IGZhbHNlXG4gICAgICB9O1xuICAgIGNhc2UgUEFUSDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lYXN1cmU6IGZhbHNlLFxuICAgICAgICBkaW1lbnNpb246IHRydWVcbiAgICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVuY29kaW5nIGNoYW5uZWwnICsgY2hhbm5lbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNTY2FsZShjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiAhY29udGFpbnMoW0RFVEFJTCwgUEFUSCwgVEVYVCwgTEFCRUwsIE9SREVSXSwgY2hhbm5lbCk7XG59XG4iLCJpbXBvcnQge0F4aXNPcmllbnR9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkRGVmVGl0bGUsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge05PTUlOQUwsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGtleXMsIGV4dGVuZCwgdHJ1bmNhdGUsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0F4aXN9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtudW1iZXJGb3JtYXQsIHRpbWVUZW1wbGF0ZX0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIGxldCBleHBvcnRzO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBeGlzQ29tcG9uZW50KG1vZGVsOiBNb2RlbCwgYXhpc0NoYW5uZWxzOiBDaGFubmVsW10pOiBEaWN0PFZnQXhpcz4ge1xuICByZXR1cm4gYXhpc0NoYW5uZWxzLnJlZHVjZShmdW5jdGlvbihheGlzLCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmF4aXMoY2hhbm5lbCkpIHtcbiAgICAgIGF4aXNbY2hhbm5lbF0gPSBwYXJzZUF4aXMoY2hhbm5lbCwgbW9kZWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXhpcztcbiAgfSwge30gYXMgRGljdDxWZ0F4aXM+KTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIGlubmVyIGF4aXMgZm9yIHNob3dpbmcgZ3JpZCBmb3Igc2hhcmVkIGF4aXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUlubmVyQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZGluZyB0aWNrcyBhcyB3ZWxsXG5cbiAgLy8gVE9ETzogcmVwbGFjZSBhbnkgd2l0aCBWZWdhIEF4aXMgSW50ZXJmYWNlXG4gIGxldCBkZWY6IGFueSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoY2hhbm5lbCksXG4gICAgZ3JpZDogdHJ1ZSxcbiAgICB0aWNrU2l6ZTogMCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsYWJlbHM6IHtcbiAgICAgICAgdGV4dDoge3ZhbHVlOiAnJ31cbiAgICAgIH0sXG4gICAgICBheGlzOiB7XG4gICAgICAgIHN0cm9rZToge3ZhbHVlOiAndHJhbnNwYXJlbnQnfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICBbJ2xheWVyJywgJ3RpY2tzJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgbGV0IG1ldGhvZDogKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZGVmOmFueSk9PmFueTtcblxuICAgIGNvbnN0IHZhbHVlID0gKG1ldGhvZCA9IGV4cG9ydHNbcHJvcGVydHldKSA/XG4gICAgICAgICAgICAgICAgICAvLyBjYWxsaW5nIGF4aXMuZm9ybWF0LCBheGlzLmdyaWQsIC4uLlxuICAgICAgICAgICAgICAgICAgbWV0aG9kKG1vZGVsLCBjaGFubmVsLCBkZWYpIDpcbiAgICAgICAgICAgICAgICAgIGF4aXNbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZbcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwcm9wcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCkucHJvcGVydGllcyB8fCB7fTtcblxuICAvLyBGb3Igbm93LCBvbmx5IG5lZWQgdG8gYWRkIGdyaWQgcHJvcGVydGllcyBoZXJlIGJlY2F1c2UgaW5uZXJBeGlzIGlzIG9ubHkgZm9yIHJlbmRlcmluZyBncmlkLlxuICAvLyBUT0RPOiBzdXBwb3J0IGFkZCBvdGhlciBwcm9wZXJ0aWVzIGZvciBpbm5lckF4aXNcbiAgWydncmlkJ10uZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tncm91cF0gP1xuICAgICAgcHJvcGVydGllc1tncm91cF0obW9kZWwsIGNoYW5uZWwsIHByb3BzW2dyb3VwXSB8fCB7fSwgZGVmKSA6XG4gICAgICBwcm9wc1tncm91cF07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYga2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgZGVmLnByb3BlcnRpZXMgPSBkZWYucHJvcGVydGllcyB8fCB7fTtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzW2dyb3VwXSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXhpcyhjaGFubmVsOiBDaGFubmVsLCBtb2RlbDogTW9kZWwpOiBWZ0F4aXMge1xuICBjb25zdCBpc0NvbCA9IGNoYW5uZWwgPT09IENPTFVNTixcbiAgICBpc1JvdyA9IGNoYW5uZWwgPT09IFJPVyxcbiAgICB0eXBlID0gaXNDb2wgPyAneCcgOiBpc1JvdyA/ICd5JzogY2hhbm5lbDtcblxuICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAvLyBUT0RPOiByZXBsYWNlIGFueSB3aXRoIFZlZ2EgQXhpcyBJbnRlcmZhY2VcbiAgbGV0IGRlZjogYW55ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKVxuICB9O1xuXG4gIC8vIDEuMi4gQWRkIHByb3BlcnRpZXNcbiAgW1xuICAgIC8vIGEpIHByb3BlcnRpZXMgd2l0aCBzcGVjaWFsIHJ1bGVzIChzbyBpdCBoYXMgYXhpc1twcm9wZXJ0eV0gbWV0aG9kcykgLS0gY2FsbCBydWxlIGZ1bmN0aW9uc1xuICAgICdmb3JtYXQnLCAnZ3JpZCcsICdsYXllcicsICdvZmZzZXQnLCAnb3JpZW50JywgJ3RpY2tTaXplJywgJ3RpY2tzJywgJ3RpY2tTaXplRW5kJywgJ3RpdGxlJywgJ3RpdGxlT2Zmc2V0JyxcbiAgICAvLyBiKSBwcm9wZXJ0aWVzIHdpdGhvdXQgcnVsZXMsIG9ubHkgcHJvZHVjZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgc2NoZW1hLCBvciBleHBsaWNpdCB2YWx1ZSBpZiBzcGVjaWZpZWRcbiAgICAndGlja1BhZGRpbmcnLCAndGlja1NpemUnLCAndGlja1NpemVNYWpvcicsICd0aWNrU2l6ZU1pbm9yJywgJ3ZhbHVlcycsICdzdWJkaXZpZGUnXG4gIF0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGxldCBtZXRob2Q6IChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGRlZjphbnkpPT5hbnk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IChtZXRob2QgPSBleHBvcnRzW3Byb3BlcnR5XSkgP1xuICAgICAgICAgICAgICAgICAgLy8gY2FsbGluZyBheGlzLmZvcm1hdCwgYXhpcy5ncmlkLCAuLi5cbiAgICAgICAgICAgICAgICAgIG1ldGhvZChtb2RlbCwgY2hhbm5lbCwgZGVmKSA6XG4gICAgICAgICAgICAgICAgICBheGlzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnByb3BlcnRpZXMgfHwge307XG5cbiAgW1xuICAgICdheGlzJywgJ2xhYmVscycsIC8vIGhhdmUgc3BlY2lhbCBydWxlc1xuICAgICdncmlkJywgJ3RpdGxlJywgJ3RpY2tzJywgJ21ham9yVGlja3MnLCAnbWlub3JUaWNrcycgLy8gb25seSBkZWZhdWx0IHZhbHVlc1xuICBdLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbZ3JvdXBdID9cbiAgICAgIHByb3BlcnRpZXNbZ3JvdXBdKG1vZGVsLCBjaGFubmVsLCBwcm9wc1tncm91cF0gfHwge30sIGRlZikgOlxuICAgICAgcHJvcHNbZ3JvdXBdO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZi5wcm9wZXJ0aWVzID0gZGVmLnByb3BlcnRpZXMgfHwge307XG4gICAgICBkZWYucHJvcGVydGllc1tncm91cF0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiBudW1iZXJGb3JtYXQobW9kZWwuZmllbGREZWYoY2hhbm5lbCksIG1vZGVsLmF4aXMoY2hhbm5lbCkuZm9ybWF0LCBtb2RlbC5jb25maWcoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIHJldHVybiBtb2RlbC5heGlzKGNoYW5uZWwpLm9mZnNldDtcbn1cblxuLy8gVE9ETzogd2UgbmVlZCB0byByZWZhY3RvciB0aGlzIG1ldGhvZCBhZnRlciB3ZSB0YWtlIGNhcmUgb2YgY29uZmlnIHJlZmFjdG9yaW5nXG4vKipcbiAqIERlZmF1bHQgcnVsZXMgZm9yIHdoZXRoZXIgdG8gc2hvdyBhIGdyaWQgc2hvdWxkIGJlIHNob3duIGZvciBhIGNoYW5uZWwuXG4gKiBJZiBgZ3JpZGAgaXMgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGB0cnVlYCBmb3Igb3JkaW5hbCBzY2FsZXMgdGhhdCBhcmUgbm90IGJpbm5lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JpZFNob3cobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IGdyaWQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmdyaWQ7XG4gIGlmIChncmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuXG4gIHJldHVybiAhbW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyaWQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjaGFubmVsID09PSBST1cgfHwgY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gbmV2ZXIgYXBwbHkgZ3JpZCBmb3IgUk9XIGFuZCBDT0xVTU4gc2luY2Ugd2UgbWFudWFsbHkgY3JlYXRlIHJ1bGUtZ3JvdXAgZm9yIHRoZW1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGdyaWRTaG93KG1vZGVsLCBjaGFubmVsKSAmJiAoXG4gICAgLy8gVE9ETyByZWZhY3RvciB0aGlzIGNsZWFubHkgLS0gZXNzZW50aWFsbHkgdGhlIGNvbmRpdGlvbiBiZWxvdyBpcyB3aGV0aGVyXG4gICAgLy8gdGhlIGF4aXMgaXMgYSBzaGFyZWQgLyB1bmlvbiBheGlzLlxuICAgIChjaGFubmVsID09PSBZIHx8IGNoYW5uZWwgPT09IFgpICYmICEobW9kZWwucGFyZW50KCkgJiYgbW9kZWwucGFyZW50KCkuaXNGYWNldCgpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXIobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBkZWYpIHtcbiAgY29uc3QgbGF5ZXIgPSBtb2RlbC5heGlzKGNoYW5uZWwpLmxheWVyO1xuICBpZiAobGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICBpZiAoZGVmLmdyaWQpIHtcbiAgICAvLyBpZiBncmlkIGlzIHRydWUsIG5lZWQgdG8gcHV0IGxheWVyIG9uIHRoZSBiYWNrIHNvIHRoYXQgZ3JpZCBpcyBiZWhpbmQgbWFya3NcbiAgICByZXR1cm4gJ2JhY2snO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7IC8vIG90aGVyd2lzZSByZXR1cm4gdW5kZWZpbmVkIGFuZCB1c2UgVmVnYSdzIGRlZmF1bHQuXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3JpZW50KG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBjb25zdCBvcmllbnQgPSBtb2RlbC5heGlzKGNoYW5uZWwpLm9yaWVudDtcbiAgaWYgKG9yaWVudCkge1xuICAgIHJldHVybiBvcmllbnQ7XG4gIH0gZWxzZSBpZiAoY2hhbm5lbCA9PT0gQ09MVU1OKSB7XG4gICAgLy8gRklYTUUgdGVzdCBhbmQgZGVjaWRlXG4gICAgcmV0dXJuIEF4aXNPcmllbnQuVE9QO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja3MgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tzO1xuICBpZiAodGlja3MgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIC8vIEZJWE1FIGRlcGVuZHMgb24gc2NhbGUgdHlwZSB0b29cbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmJpbikge1xuICAgIC8vIFZlZ2EncyBkZWZhdWx0IHRpY2tzIG9mdGVuIGxlYWQgdG8gYSBsb3Qgb2YgbGFiZWwgb2NjbHVzaW9uIG9uIFggd2l0aG91dCA5MCBkZWdyZWUgcm90YXRpb25cbiAgICByZXR1cm4gNTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrU2l6ZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgdGlja1NpemUgPSBtb2RlbC5heGlzKGNoYW5uZWwpLnRpY2tTaXplO1xuICBpZiAodGlja1NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aWNrU2l6ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGlja1NpemVFbmQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpY2tTaXplRW5kID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aWNrU2l6ZUVuZDtcbiAgaWYgKHRpY2tTaXplRW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aWNrU2l6ZUVuZDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gIGlmIChheGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYXhpcy50aXRsZTtcbiAgfVxuXG4gIC8vIGlmIG5vdCBkZWZpbmVkLCBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBheGlzIHRpdGxlIGZyb20gZmllbGQgZGVmXG4gIGNvbnN0IGZpZWxkVGl0bGUgPSBmaWVsZERlZlRpdGxlKG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLCBtb2RlbC5jb25maWcoKSk7XG5cbiAgbGV0IG1heExlbmd0aDtcbiAgaWYgKGF4aXMudGl0bGVNYXhMZW5ndGgpIHtcbiAgICBtYXhMZW5ndGggPSBheGlzLnRpdGxlTWF4TGVuZ3RoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFggJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFgpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB4XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLyBtb2RlbC5heGlzKFgpLmNoYXJhY3RlcldpZHRoO1xuICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IFkgJiYgIW1vZGVsLmlzT3JkaW5hbFNjYWxlKFkpKSB7XG4gICAgY29uc3QgdW5pdE1vZGVsOiBVbml0TW9kZWwgPSBtb2RlbCBhcyBhbnk7IC8vIG9ubHkgdW5pdCBtb2RlbCBoYXMgY2hhbm5lbCB5XG4gICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlLCB3ZSBrbm93IGNlbGwgc2l6ZSBhdCBjb21waWxlIHRpbWUsIHdlIGNhbiBndWVzcyBtYXggbGVuZ3RoXG4gICAgbWF4TGVuZ3RoID0gdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwuaGVpZ2h0IC8gbW9kZWwuYXhpcyhZKS5jaGFyYWN0ZXJXaWR0aDtcbiAgfVxuXG4gIC8vIEZJWE1FOiB3ZSBzaG91bGQgdXNlIHRlbXBsYXRlIHRvIHRydW5jYXRlIGluc3RlYWRcbiAgcmV0dXJuIG1heExlbmd0aCA/IHRydW5jYXRlKGZpZWxkVGl0bGUsIG1heExlbmd0aCkgOiBmaWVsZFRpdGxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVPZmZzZXQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHRpdGxlT2Zmc2V0ID0gbW9kZWwuYXhpcyhjaGFubmVsKS50aXRsZU9mZnNldDtcbiAgaWYgKHRpdGxlT2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aXRsZU9mZnNldDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gYXhpcyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGF4aXNQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLmF4aXNDb2xvciAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgeyBzdHJva2U6IHt2YWx1ZTogYXhpcy5heGlzQ29sb3J9IH0gOlxuICAgICAgICB7fSxcbiAgICAgIGF4aXMuYXhpc1dpZHRoICE9PSB1bmRlZmluZWQgP1xuICAgICAgICB7IHN0cm9rZVdpZHRoOiB7dmFsdWU6IGF4aXMuYXhpc1dpZHRofSB9IDpcbiAgICAgICAge30sXG4gICAgICBheGlzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBncmlkKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgZ3JpZFByb3BzU3BlYykge1xuICAgIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGV4dGVuZChcbiAgICAgIGF4aXMuZ3JpZENvbG9yICE9PSB1bmRlZmluZWQgPyB7IHN0cm9rZToge3ZhbHVlOiBheGlzLmdyaWRDb2xvcn19IDoge30sXG4gICAgICBheGlzLmdyaWRPcGFjaXR5ICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlT3BhY2l0eToge3ZhbHVlOiBheGlzLmdyaWRPcGFjaXR5fSB9IDoge30sXG4gICAgICBheGlzLmdyaWRXaWR0aCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZVdpZHRoIDoge3ZhbHVlOiBheGlzLmdyaWRXaWR0aH0gfSA6IHt9LFxuICAgICAgYXhpcy5ncmlkRGFzaCAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZURhc2hPZmZzZXQgOiB7dmFsdWU6IGF4aXMuZ3JpZERhc2h9IH0gOiB7fSxcbiAgICAgIGdyaWRQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGxhYmVsc1NwZWMsIGRlZikge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG4gICAgY29uc3QgY29uZmlnID0gbW9kZWwuY29uZmlnKCk7XG5cbiAgICBpZiAoIWF4aXMubGFiZWxzKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0sIGxhYmVsc1NwZWMpO1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBpZiAoY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSAmJiBheGlzLmxhYmVsTWF4TGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPIHJlcGxhY2UgdGhpcyB3aXRoIFZlZ2EncyBsYWJlbE1heExlbmd0aCBvbmNlIGl0IGlzIGludHJvZHVjZWRcbiAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdGVtcGxhdGU6ICd7eyBkYXR1bVtcImRhdGFcIl0gfCB0cnVuY2F0ZTonICsgYXhpcy5sYWJlbE1heExlbmd0aCArICcgfX0nXG4gICAgICAgIH1cbiAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgIH0gZWxzZSBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICAgIGxhYmVsc1NwZWMgPSBleHRlbmQoe1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdGVtcGxhdGU6IHRpbWVUZW1wbGF0ZSgnZGF0dW1bXCJkYXRhXCJdJywgZmllbGREZWYudGltZVVuaXQsIGF4aXMuZm9ybWF0LCBheGlzLnNob3J0VGltZUxhYmVscywgY29uZmlnKVxuICAgICAgICB9XG4gICAgICB9LCBsYWJlbHNTcGVjKTtcbiAgICB9XG5cbiAgICAvLyBMYWJlbCBBbmdsZVxuICAgIGlmIChheGlzLmxhYmVsQW5nbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEFuZ2xlfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXV0byByb3RhdGUgZm9yIFggYW5kIFJvd1xuICAgICAgaWYgKGNoYW5uZWwgPT09IFggJiYgKGlzRGltZW5zaW9uKGZpZWxkRGVmKSB8fCBmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogMjcwfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sYWJlbEFsaWduICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6IGF4aXMubGFiZWxBbGlnbn07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF1dG8gc2V0IGFsaWduIGlmIHJvdGF0ZWRcbiAgICAgIC8vIFRPRE86IGNvbnNpZGVyIG90aGVyIHZhbHVlIGJlc2lkZXMgMjcwLCA5MFxuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7XG4gICAgICAgICAgICB2YWx1ZTogZGVmLm9yaWVudCA9PT0gJ3RvcCcgPyAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgZGVmLnR5cGUgPT09ICd4JyA/ICdyaWdodCcgOlxuICAgICAgICAgICAgICAgICAgICdjZW50ZXInXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYWxpZ24gPSB7dmFsdWU6ICdjZW50ZXInfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLmxhYmVsQmFzZWxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzU3BlYy5iYXNlbGluZSA9IHt2YWx1ZTogYXhpcy5sYWJlbEJhc2VsaW5lfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUpIHtcbiAgICAgICAgLy8gQXV0byBzZXQgYmFzZWxpbmUgaWYgcm90YXRlZFxuICAgICAgICAvLyBUT0RPOiBjb25zaWRlciBvdGhlciB2YWx1ZSBiZXNpZGVzIDI3MCwgOTBcbiAgICAgICAgaWYgKGxhYmVsc1NwZWMuYW5nbGUudmFsdWUgPT09IDI3MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6IGRlZi50eXBlID09PSAneCcgPyAnbWlkZGxlJyA6ICdib3R0b20nfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbHNTcGVjLmFuZ2xlLnZhbHVlID09PSA5MCkge1xuICAgICAgICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSB7dmFsdWU6ICdib3R0b20nfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFiZWxzU3BlYy5zdHJva2UgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChheGlzLnRpY2tMYWJlbEZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnQgPSB7dmFsdWU6IGF4aXMudGlja0xhYmVsRm9udH07XG4gICAgfVxuXG4gICAgaWYgKGF4aXMudGlja0xhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYWJlbHNTcGVjLmZvbnRTaXplID0ge3ZhbHVlOiBheGlzLnRpY2tMYWJlbEZvbnRTaXplfTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cyhsYWJlbHNTcGVjKS5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBsYWJlbHNTcGVjO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpY2tzKG1vZGVsOiBNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCwgdGlja3NQcm9wc1NwZWMpIHtcbiAgICBjb25zdCBheGlzID0gbW9kZWwuYXhpcyhjaGFubmVsKTtcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBheGlzLnRpY2tDb2xvciAhPT0gdW5kZWZpbmVkID8ge3N0cm9rZSA6IHt2YWx1ZTogYXhpcy50aWNrQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGlja1dpZHRoICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlV2lkdGg6IHt2YWx1ZTogYXhpcy50aWNrV2lkdGh9IH0gOiB7fSxcbiAgICAgIHRpY2tzUHJvcHNTcGVjIHx8IHt9XG4gICAgKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB0aXRsZShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIHRpdGxlUHJvcHNTcGVjKSB7XG4gICAgY29uc3QgYXhpcyA9IG1vZGVsLmF4aXMoY2hhbm5lbCk7XG5cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgYXhpcy50aXRsZUNvbG9yICE9PSB1bmRlZmluZWQgPyB7c3Ryb2tlIDoge3ZhbHVlOiBheGlzLnRpdGxlQ29sb3J9IH0gOiB7fSxcbiAgICAgIGF4aXMudGl0bGVGb250ICE9PSB1bmRlZmluZWQgPyB7Zm9udDoge3ZhbHVlOiBheGlzLnRpdGxlRm9udH19IDoge30sXG4gICAgICBheGlzLnRpdGxlRm9udFNpemUgIT09IHVuZGVmaW5lZCA/IHtmb250U2l6ZToge3ZhbHVlOiBheGlzLnRpdGxlRm9udFNpemV9fSA6IHt9LFxuICAgICAgYXhpcy50aXRsZUZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCA/IHtmb250V2VpZ2h0OiB7dmFsdWU6IGF4aXMudGl0bGVGb250V2VpZ2h0fX0gOiB7fSxcblxuICAgICAgdGl0bGVQcm9wc1NwZWMgfHwge31cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge0JBUiwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7Q09MT1IsIE9QQUNJVFl9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZCwgT3JkZXJDaGFubmVsRGVmfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NvcnRPcmRlcn0gZnJvbSAnLi4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi90aW1ldW5pdCc7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgT1JESU5BTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCB1bmlvbn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3RlbXBsYXRlIGFzIHRpbWVVbml0VGVtcGxhdGV9IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IHtTcGVjLCBpc1VuaXRTcGVjLCBpc0ZhY2V0U3BlYywgaXNMYXllclNwZWN9IGZyb20gJy4uL3NwZWMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGVsKHNwZWM6IFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKTogTW9kZWwge1xuICBpZiAoaXNGYWNldFNwZWMoc3BlYykpIHtcbiAgICByZXR1cm4gbmV3IEZhY2V0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgaWYgKGlzTGF5ZXJTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBMYXllck1vZGVsKHNwZWMsIHBhcmVudCwgcGFyZW50R2l2ZW5OYW1lKTtcbiAgfVxuXG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5ldyBVbml0TW9kZWwoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcignSW52YWxpZCBzcGVjLicpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gVE9ETzogZmlndXJlIGlmIHdlIHJlYWxseSBuZWVkIG9wYWNpdHkgaW4gYm90aFxuZXhwb3J0IGNvbnN0IFNUUk9LRV9DT05GSUcgPSBbJ3N0cm9rZScsICdzdHJva2VXaWR0aCcsXG4gICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnLCAnc3Ryb2tlT3BhY2l0eScsICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eScsXG4gICdvcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX1NUUk9LRV9DT05GSUcgPSB1bmlvbihTVFJPS0VfQ09ORklHLCBGSUxMX0NPTkZJRyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGZpbGxlZCA9IG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkO1xuICBjb25zdCBjb2xvckZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoQ09MT1IpO1xuICBjb25zdCBvcGFjaXR5RmllbGREZWYgPSBtb2RlbC5maWVsZERlZihPUEFDSVRZKTtcblxuICAvLyBBcHBseSBmaWxsIHN0cm9rZSBjb25maWcgZmlyc3Qgc28gdGhhdCBjb2xvciBmaWVsZCAvIHZhbHVlIGNhbiBvdmVycmlkZVxuICAvLyBmaWxsIC8gc3Ryb2tlXG4gIGlmIChmaWxsZWQpIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIEZJTExfQ09ORklHKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseU1hcmtDb25maWcocCwgbW9kZWwsIFNUUk9LRV9DT05GSUcpO1xuICB9XG5cbiAgbGV0IGNvbG9yVmFsdWU7XG4gIGxldCBvcGFjaXR5VmFsdWU7XG4gIGlmIChtb2RlbC5oYXMoQ09MT1IpKSB7XG4gICAgY29sb3JWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1IpLFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBjb2xvckZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZml4OiAncmFuayd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChjb2xvckZpZWxkRGVmICYmIGNvbG9yRmllbGREZWYudmFsdWUpIHtcbiAgICBjb2xvclZhbHVlID0geyB2YWx1ZTogY29sb3JGaWVsZERlZi52YWx1ZSB9O1xuICB9XG5cbiAgaWYgKG1vZGVsLmhhcyhPUEFDSVRZKSkge1xuICAgIG9wYWNpdHlWYWx1ZSA9IHtcbiAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoT1BBQ0lUWSwgb3BhY2l0eUZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgPyB7cHJlZml4OiAncmFuayd9IDoge30pXG4gICAgfTtcbiAgfSBlbHNlIGlmIChvcGFjaXR5RmllbGREZWYgJiYgb3BhY2l0eUZpZWxkRGVmLnZhbHVlKSB7XG4gICAgb3BhY2l0eVZhbHVlID0geyB2YWx1ZTogb3BhY2l0eUZpZWxkRGVmLnZhbHVlIH07XG4gIH1cblxuICBpZiAoY29sb3JWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGZpbGxlZCkge1xuICAgICAgcC5maWxsID0gY29sb3JWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2UgPSBjb2xvclZhbHVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhcHBseSBjb2xvciBjb25maWcgaWYgdGhlcmUgaXMgbm8gZmlsbCAvIHN0cm9rZSBjb25maWdcbiAgICBwW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHBbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLm1hcmsuY29sb3J9O1xuICB9XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gZmlsbCwgYWx3YXlzIGZpbGwgc3ltYm9sc1xuICAvLyB3aXRoIHRyYW5zcGFyZW50IGZpbGxzIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2EtbGl0ZS9pc3N1ZXMvMTMxNlxuICBpZiAoIXAuZmlsbCAmJiBjb250YWlucyhbQkFSLCBQT0lOVCwgQ0lSQ0xFLCBTUVVBUkVdLCBtb2RlbC5tYXJrKCkpKSB7XG4gICAgcC5maWxsID0ge3ZhbHVlOiAndHJhbnNwYXJlbnQnfTtcbiAgfVxuXG4gIGlmIChvcGFjaXR5VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHAub3BhY2l0eSA9IG9wYWNpdHlWYWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDb25maWcocHJvcGVydGllcywgY29uZmlnLCBwcm9wc0xpc3Q6IHN0cmluZ1tdKSB7XG4gIHByb3BzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHsgdmFsdWU6IHZhbHVlIH07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1hcmtDb25maWcobWFya3NQcm9wZXJ0aWVzLCBtb2RlbDogVW5pdE1vZGVsLCBwcm9wc0xpc3Q6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBhcHBseUNvbmZpZyhtYXJrc1Byb3BlcnRpZXMsIG1vZGVsLmNvbmZpZygpLm1hcmssIHByb3BzTGlzdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBudW1iZXIgZm9ybWF0IGZvciBhIGZpZWxkRGVmXG4gKlxuICogQHBhcmFtIGZvcm1hdCBleHBsaWNpdGx5IHNwZWNpZmllZCBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckZvcm1hdChmaWVsZERlZjogRmllbGREZWYsIGZvcm1hdDogc3RyaW5nLCBjb25maWc6IENvbmZpZykge1xuICBpZiAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFICYmICFmaWVsZERlZi5iaW4pIHtcbiAgICAvLyBhZGQgbnVtYmVyIGZvcm1hdCBmb3IgcXVhbnRpdGF0aXZlIHR5cGUgb25seVxuICAgIC8vIFRPRE86IG5lZWQgdG8gbWFrZSB0aGlzIHdvcmsgY29ycmVjdGx5IGZvciBudW1lcmljIG9yZGluYWwgLyBub21pbmFsIHR5cGVcbiAgICByZXR1cm4gZm9ybWF0IHx8IGNvbmZpZy5udW1iZXJGb3JtYXQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqIFJldHVybiBmaWVsZCByZWZlcmVuY2Ugd2l0aCBwb3RlbnRpYWwgXCItXCIgcHJlZml4IGZvciBkZXNjZW5kaW5nIHNvcnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RmllbGQob3JkZXJDaGFubmVsRGVmOiBPcmRlckNoYW5uZWxEZWYpIHtcbiAgcmV0dXJuIChvcmRlckNoYW5uZWxEZWYuc29ydCA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcgPyAnLScgOiAnJykgK1xuICAgIGZpZWxkKG9yZGVyQ2hhbm5lbERlZiwge2JpblN1ZmZpeDogJ21pZCd9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aW1lIHRlbXBsYXRlIHVzZWQgZm9yIGF4aXMvbGVnZW5kIGxhYmVscyBvciB0ZXh0IG1hcmsgZm9yIGEgdGVtcG9yYWwgZmllbGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVUZW1wbGF0ZSh0ZW1wbGF0ZUZpZWxkOiBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCwgZm9ybWF0OiBzdHJpbmcsIHNob3J0VGltZUxhYmVsczogYm9vbGVhbiwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xuICBpZiAoIXRpbWVVbml0IHx8IGZvcm1hdCkge1xuICAgIC8vIElmIHRoZXJlIGlzIG5vdCB0aW1lIHVuaXQsIG9yIGlmIHVzZXIgZXhwbGljaXRseSBzcGVjaWZ5IGZvcm1hdCBmb3IgYXhpcy9sZWdlbmQvdGV4dC5cbiAgICBjb25zdCBfZm9ybWF0ID0gZm9ybWF0IHx8IGNvbmZpZy50aW1lRm9ybWF0OyAvLyBvbmx5IHVzZSBjb25maWcudGltZUZvcm1hdCBpZiB0aGVyZSBpcyBubyB0aW1lVW5pdC5cbiAgICByZXR1cm4gJ3t7JyArIHRlbXBsYXRlRmllbGQgKyAnIHwgdGltZTpcXCcnICsgX2Zvcm1hdCArICdcXCd9fSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpbWVVbml0VGVtcGxhdGUodGltZVVuaXQsIHRlbXBsYXRlRmllbGQsIHNob3J0VGltZUxhYmVscyk7XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGZvciBjb21waWxpbmcgVmVnYS1saXRlIHNwZWMgaW50byBWZWdhIHNwZWMuXG4gKi9cblxuaW1wb3J0IHtMQVlPVVR9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge25vcm1hbGl6ZSwgRXh0ZW5kZWRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtidWlsZE1vZGVsfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKGlucHV0U3BlYzogRXh0ZW5kZWRTcGVjKSB7XG4gIC8vIDEuIENvbnZlcnQgaW5wdXQgc3BlYyBpbnRvIGEgbm9ybWFsIGZvcm1cbiAgLy8gKERlY29tcG9zZSBhbGwgZXh0ZW5kZWQgdW5pdCBzcGVjcyBpbnRvIGNvbXBvc2l0aW9uIG9mIHVuaXQgc3BlYy4pXG4gIGNvbnN0IHNwZWMgPSBub3JtYWxpemUoaW5wdXRTcGVjKTtcblxuICAvLyAyLiBJbnN0YW50aWF0ZSB0aGUgbW9kZWwgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXNcbiAgY29uc3QgbW9kZWwgPSBidWlsZE1vZGVsKHNwZWMsIG51bGwsICcnKTtcblxuICAvLyAzLiBQYXJzZSBlYWNoIHBhcnQgb2YgdGhlIG1vZGVsIHRvIHByb2R1Y2UgY29tcG9uZW50cyB0aGF0IHdpbGwgYmUgYXNzZW1ibGVkIGxhdGVyXG4gIC8vIFdlIHRyYXZlcnNlIHRoZSB3aG9sZSB0cmVlIHRvIHBhcnNlIG9uY2UgZm9yIGVhY2ggdHlwZSBvZiBjb21wb25lbnRzXG4gIC8vIChlLmcuLCBkYXRhLCBsYXlvdXQsIG1hcmssIHNjYWxlKS5cbiAgLy8gUGxlYXNlIHNlZSBpbnNpZGUgbW9kZWwucGFyc2UoKSBmb3Igb3JkZXIgZm9yIGNvbXBpbGF0aW9uLlxuICBtb2RlbC5wYXJzZSgpO1xuXG4gIC8vIDQuIEFzc2VtYmxlIGEgVmVnYSBTcGVjIGZyb20gdGhlIHBhcnNlZCBjb21wb25lbnRzIGluIDMuXG4gIHJldHVybiBhc3NlbWJsZShtb2RlbCk7XG59XG5cbmZ1bmN0aW9uIGFzc2VtYmxlKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAvLyBUT0RPOiBjaGFuZ2UgdHlwZSB0byBiZWNvbWUgVmdTcGVjXG4gIGNvbnN0IG91dHB1dCA9IGV4dGVuZChcbiAgICB7XG4gICAgICAvLyBTZXQgc2l6ZSB0byAxIGJlY2F1c2Ugd2UgcmVseSBvbiBwYWRkaW5nIGFueXdheVxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBwYWRkaW5nOiAnYXV0bydcbiAgICB9LFxuICAgIGNvbmZpZy52aWV3cG9ydCA/IHsgdmlld3BvcnQ6IGNvbmZpZy52aWV3cG9ydCB9IDoge30sXG4gICAgY29uZmlnLmJhY2tncm91bmQgPyB7IGJhY2tncm91bmQ6IGNvbmZpZy5iYWNrZ3JvdW5kIH0gOiB7fSxcbiAgICB7XG4gICAgICAvLyBUT0RPOiBzaWduYWw6IG1vZGVsLmFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsXG4gICAgICBkYXRhOiBbXS5jb25jYXQoXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlRGF0YShbXSksXG4gICAgICAgIG1vZGVsLmFzc2VtYmxlTGF5b3V0KFtdKVxuICAgICAgICAvLyBUT0RPOiBtb2RlbC5hc3NlbWJsZVNlbGVjdGlvbkRhdGFcbiAgICAgICksXG4gICAgICBtYXJrczogW2Fzc2VtYmxlUm9vdEdyb3VwKG1vZGVsKV1cbiAgICB9KTtcblxuICByZXR1cm4ge1xuICAgIHNwZWM6IG91dHB1dFxuICAgIC8vIFRPRE86IGFkZCB3YXJuaW5nIC8gZXJyb3JzIGhlcmVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlUm9vdEdyb3VwKG1vZGVsOiBNb2RlbCkge1xuICBsZXQgcm9vdEdyb3VwOmFueSA9IGV4dGVuZCh7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdyb290JyksXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIH0sXG4gICAgbW9kZWwuZGVzY3JpcHRpb24oKSA/IHtkZXNjcmlwdGlvbjogbW9kZWwuZGVzY3JpcHRpb24oKX0gOiB7fSxcbiAgICB7XG4gICAgICBmcm9tOiB7ZGF0YTogTEFZT1VUfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBkYXRlOiBleHRlbmQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgd2lkdGg6IHtmaWVsZDogJ3dpZHRoJ30sXG4gICAgICAgICAgICBoZWlnaHQ6IHtmaWVsZDogJ2hlaWdodCd9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbC5hc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhtb2RlbC5jb25maWcoKS5jZWxsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGV4dGVuZChyb290R3JvdXAsIG1vZGVsLmFzc2VtYmxlR3JvdXAoKSk7XG59XG4iLCJpbXBvcnQge1gsIERFVEFJTH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZywgT3JpZW50LCBNYXJrQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtFbmNvZGluZ30gZnJvbSAnLi4vZW5jb2RpbmcnO1xuaW1wb3J0IHtpc0FnZ3JlZ2F0ZSwgaGFzfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtCQVIsIEFSRUEsIFBPSU5ULCBMSU5FLCBUSUNLLCBDSVJDTEUsIFNRVUFSRSwgUlVMRSwgVEVYVCwgTWFya30gZnJvbSAnLi4vbWFyayc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIEF1Z21lbnQgY29uZmlnLm1hcmsgd2l0aCBydWxlLWJhc2VkIGRlZmF1bHQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1hcmtDb25maWcobWFyazogTWFyaywgZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZykge1xuICAgcmV0dXJuIGV4dGVuZChcbiAgICAgWydmaWxsZWQnLCAnb3BhY2l0eScsICdvcmllbnQnLCAnYWxpZ24nXS5yZWR1Y2UoZnVuY3Rpb24oY2ZnLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgICAgY29uc3QgdmFsdWUgPSBjb25maWcubWFya1twcm9wZXJ0eV07XG4gICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgY2FzZSAnZmlsbGVkJzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAvLyBQb2ludCwgbGluZSwgYW5kIHJ1bGUgYXJlIG5vdCBmaWxsZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBtYXJrICE9PSBQT0lOVCAmJiBtYXJrICE9PSBMSU5FICYmIG1hcmsgIT09IFJVTEU7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChjb250YWlucyhbUE9JTlQsIFRJQ0ssIENJUkNMRSwgU1FVQVJFXSwgbWFyaykpIHtcbiAgICAgICAgICAgICAgLy8gcG9pbnQtYmFzZWQgbWFya3MgYW5kIGJhclxuICAgICAgICAgICAgICBpZiAoIWlzQWdncmVnYXRlKGVuY29kaW5nKSB8fCBoYXMoZW5jb2RpbmcsIERFVEFJTCkpIHtcbiAgICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gMC43O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFyayA9PT0gQVJFQSkge1xuICAgICAgICAgICAgICBjZmdbcHJvcGVydHldID0gMC43OyAvLyBpbnNwaXJlZCBieSBUYWJsZWF1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlICdvcmllbnQnOlxuICAgICAgICAgICBjZmdbcHJvcGVydHldID0gb3JpZW50KG1hcmssIGVuY29kaW5nLCBjb25maWcubWFyayk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgLy8gdGV4dC1vbmx5XG4gICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNmZ1twcm9wZXJ0eV0gPSBoYXMoZW5jb2RpbmcsIFgpID8gJ2NlbnRlcicgOiAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGNmZztcbiAgICAgfSwge30pLFxuICAgICBjb25maWcubWFya1xuICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWVudChtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIG1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7fSk6IE9yaWVudCB7XG4gIHN3aXRjaCAobWFyaykge1xuICAgIGNhc2UgUE9JTlQ6XG4gICAgY2FzZSBDSVJDTEU6XG4gICAgY2FzZSBTUVVBUkU6XG4gICAgY2FzZSBURVhUOlxuICAgICAgLy8gb3JpZW50IGlzIG1lYW5pbmdsZXNzIGZvciB0aGVzZSBtYXJrcy5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKGVuY29kaW5nLngpIHx8IGlzTWVhc3VyZShlbmNvZGluZy54Mik7XG4gIGNvbnN0IHlJc01lYXN1cmUgPSBpc01lYXN1cmUoZW5jb2RpbmcueSkgfHwgaXNNZWFzdXJlKGVuY29kaW5nLnkyKTtcbiAgY29uc3QgeUlzUmFuZ2UgPSBlbmNvZGluZy55ICYmIGVuY29kaW5nLnkyO1xuICBjb25zdCB4SXNSYW5nZSA9IGVuY29kaW5nLnggJiYgZW5jb2RpbmcueDI7XG5cbiAgc3dpdGNoIChtYXJrKSB7XG4gICAgY2FzZSBUSUNLOlxuICAgICAgLy8gVGljayBpcyBvcHBvc2l0ZSB0byBiYXIsIGxpbmUsIGFyZWEgYW5kIG5ldmVyIGhhdmUgcmFuZ2VkIG1hcmsuXG4gICAgICBpZiAoeElzTWVhc3VyZSAmJiAheUlzTWVhc3VyZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xuICAgICAgfVxuICAgICAgLy8geTpRIG9yIEFtYmlndW91cyBjYXNlLCByZXR1cm4gaG9yaXpvbnRhbFxuICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgIGNhc2UgUlVMRTpcbiAgICAgIGlmICh4SXNSYW5nZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LkhPUklaT05UQUw7XG4gICAgICB9XG4gICAgICBpZiAoeUlzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgICAgIH1cbiAgICAgIGlmIChlbmNvZGluZy55KSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuSE9SSVpPTlRBTDtcbiAgICAgIH1cbiAgICAgIGlmIChlbmNvZGluZy54KSB7XG4gICAgICAgIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG4gICAgICB9XG4gICAgICAvLyBubyB4L3kgLS0gc28gaXQncyB1bmRlZmluZWRcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY2FzZSBCQVI6XG4gICAgY2FzZSBBUkVBOlxuICAgICAgLy8gSWYgdGhlcmUgYXJlIHJhbmdlIGZvciBib3RoIHggYW5kIHksIHkgKHZlcnRpY2FsKSBoYXMgaGlnaGVyIHByZWNlZGVuY2UuXG5cbiAgICAgIGlmICh5SXNSYW5nZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LlZFUlRJQ0FMO1xuICAgICAgfVxuXG4gICAgICBpZiAoeElzUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9yaWVudC5IT1JJWk9OVEFMO1xuICAgICAgfVxuICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBjYXNlIExJTkU6IC8vIGludGVudGlvbmFsIGZhbGwgdGhyb3VnaFxuICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuXG4gICAgICBpZiAoeElzTWVhc3VyZSAmJiAheUlzTWVhc3VyZSkge1xuICAgICAgICByZXR1cm4gT3JpZW50LkhPUklaT05UQUw7XG4gICAgICB9XG4gICAgICAvLyB5OlEgb3IgQW1iaWd1b3VzIGNhc2UsIHJldHVybiB2ZXJ0aWNhbFxuICAgICAgcmV0dXJuIE9yaWVudC5WRVJUSUNBTDtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmU6bmV4dCAqL1xuICBjb25zb2xlLndhcm4oJ29yaWVudCB1bmltcGxlbWVudGVkIGZvciBtYXJrJywgbWFyayk7XG4gIHJldHVybiBPcmllbnQuVkVSVElDQUw7XG59XG4iLCJpbXBvcnQge2F1dG9NYXhCaW5zfSBmcm9tICcuLi8uLi9iaW4nO1xuaW1wb3J0IHtDaGFubmVsLCBDT0xPUn0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtleHRlbmQsIHZhbHMsIGZsYXR0ZW4sIGhhc2gsIERpY3R9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYmluIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxWZ1RyYW5zZm9ybVtdPiB7XG4gICAgcmV0dXJuIG1vZGVsLnJlZHVjZShmdW5jdGlvbihiaW5Db21wb25lbnQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgY29uc3QgYmluID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCkuYmluO1xuICAgICAgaWYgKGJpbikge1xuICAgICAgICBsZXQgYmluVHJhbnMgPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6ICdiaW4nLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZERlZi5maWVsZCxcbiAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdzdGFydCcgfSksXG4gICAgICAgICAgICBtaWQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ21pZCcgfSksXG4gICAgICAgICAgICBlbmQ6IGZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ2VuZCcgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICAgLy8gaWYgYmluIGlzIGFuIG9iamVjdCwgbG9hZCBwYXJhbWV0ZXIgaGVyZSFcbiAgICAgICAgICB0eXBlb2YgYmluID09PSAnYm9vbGVhbicgPyB7fSA6IGJpblxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghYmluVHJhbnMubWF4YmlucyAmJiAhYmluVHJhbnMuc3RlcCkge1xuICAgICAgICAgIC8vIGlmIGJvdGggbWF4YmlucyBhbmQgc3RlcCBhcmUgbm90IHNwZWNpZmllZCwgbmVlZCB0byBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBiaW5cbiAgICAgICAgICBiaW5UcmFucy5tYXhiaW5zID0gYXV0b01heEJpbnMoY2hhbm5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBbYmluVHJhbnNdO1xuICAgICAgICBjb25zdCBpc09yZGluYWxDb2xvciA9IG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpIHx8IGNoYW5uZWwgPT09IENPTE9SO1xuICAgICAgICAvLyBjb2xvciByYW1wIGhhcyB0eXBlIGxpbmVhciBvciB0aW1lXG4gICAgICAgIGlmIChpc09yZGluYWxDb2xvcikge1xuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdmb3JtdWxhJyxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdyYW5nZScgfSksXG4gICAgICAgICAgICBleHByOiBmaWVsZChmaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnc3RhcnQnIH0pICtcbiAgICAgICAgICAgICcgKyBcXCctXFwnICsgJyArXG4gICAgICAgICAgICBmaWVsZChmaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSwgYmluU3VmZml4OiAnZW5kJyB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiBjdXJyZW50IG1lcmdpbmcgbG9naWMgY2FuIHByb2R1Y2UgcmVkdW5kYW50IHRyYW5zZm9ybXMgd2hlbiBhIGZpZWxkIGlzIGJpbm5lZCBmb3IgY29sb3IgYW5kIGZvciBub24tY29sb3JcbiAgICAgICAgY29uc3Qga2V5ID0gaGFzaChiaW4pICsgJ18nICsgZmllbGREZWYuZmllbGQgKyAnb2M6JyArIGlzT3JkaW5hbENvbG9yO1xuICAgICAgICBiaW5Db21wb25lbnRba2V5XSA9IHRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHBhcnNlVW5pdCA9IHBhcnNlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgLy8gRklYTUU6IGN1cnJlbnQgbWVyZ2luZyBsb2dpYyBjYW4gcHJvZHVjZSByZWR1bmRhbnQgdHJhbnNmb3JtcyB3aGVuIGEgZmllbGQgaXMgYmlubmVkIGZvciBjb2xvciBhbmQgZm9yIG5vbi1jb2xvclxuICAgICAgZXh0ZW5kKGJpbkNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmJpbik7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICB9XG4gICAgcmV0dXJuIGJpbkNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IGJpbkNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZChiaW5Db21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5iaW4pO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmJpbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBiaW5Db21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFscyhjb21wb25lbnQuYmluKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q09MT1J9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPUkRJTkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBmbGF0dGVuLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdUcmFuc2Zvcm19IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogV2UgbmVlZCB0byBhZGQgYSByYW5rIHRyYW5zZm9ybSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlIHJhbmsgdmFsdWUgYXNcbiAqIGlucHV0IGZvciBjb2xvciByYW1wJ3MgbGluZWFyIHNjYWxlLlxuICovXG5leHBvcnQgbmFtZXNwYWNlIGNvbG9yUmFuayB7XG4gIC8qKlxuICAgKiBSZXR1cm4gaGFzaCBkaWN0IGZyb20gYSBjb2xvciBmaWVsZCdzIG5hbWUgdG8gdGhlIHNvcnQgYW5kIHJhbmsgdHJhbnNmb3Jtc1xuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpIHtcbiAgICBsZXQgY29sb3JSYW5rQ29tcG9uZW50OiBEaWN0PFZnVHJhbnNmb3JtW10+ID0ge307XG4gICAgaWYgKG1vZGVsLmhhcyhDT0xPUikgJiYgbW9kZWwuZmllbGREZWYoQ09MT1IpLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgIGNvbG9yUmFua0NvbXBvbmVudFttb2RlbC5maWVsZChDT0xPUildID0gW3tcbiAgICAgICAgdHlwZTogJ3NvcnQnLFxuICAgICAgICBieTogbW9kZWwuZmllbGQoQ09MT1IpXG4gICAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyYW5rJyxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SKSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgcmFuazogbW9kZWwuZmllbGQoQ09MT1IsIHsgcHJlZml4OiAncmFuaycgfSlcbiAgICAgICAgfVxuICAgICAgfV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvclJhbmtDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBjb25zaWRlciBtZXJnaW5nXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAvLyBUT0RPOiB3ZSBoYXZlIHRvIHNlZSBpZiBjb2xvciBoYXMgdW5pb24gc2NhbGUgaGVyZVxuXG4gICAgICAvLyBGb3Igbm93LCBsZXQncyBhc3N1bWUgaXQgYWx3YXlzIGhhcyB1bmlvbiBzY2FsZVxuICAgICAgY29uc3QgY29sb3JSYW5rQ29tcG9uZW50ID0gY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuaztcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHt9IGFzIERpY3Q8VmdUcmFuc2Zvcm1bXT47XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBjb2xvclJhbmtDb21wb25lbnQgPSB7fSBhcyBEaWN0PFZnVHJhbnNmb3JtW10+O1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgICAgZXh0ZW5kKGNvbG9yUmFua0NvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNvbG9yUmFuayk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuY29sb3JSYW5rO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbG9yUmFua0NvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKGNvbXBvbmVudC5jb2xvclJhbmspKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtGb3JtdWxhfSBmcm9tICcuLi8uLi90cmFuc2Zvcm0nO1xuaW1wb3J0IHtrZXlzLCBEaWN0LCBTdHJpbmdTZXR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGEsIFZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtzb3VyY2V9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7Zm9ybWF0UGFyc2V9IGZyb20gJy4vZm9ybWF0cGFyc2UnO1xuaW1wb3J0IHtudWxsRmlsdGVyfSBmcm9tICcuL251bGxmaWx0ZXInO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7YmlufSBmcm9tICcuL2Jpbic7XG5pbXBvcnQge2Zvcm11bGF9IGZyb20gJy4vZm9ybXVsYSc7XG5pbXBvcnQge25vblBvc2l0aXZlRmlsdGVyfSBmcm9tICcuL25vbnBvc2l0aXZlbnVsbGZpbHRlcic7XG5pbXBvcnQge3N1bW1hcnl9IGZyb20gJy4vc3VtbWFyeSc7XG5pbXBvcnQge3N0YWNrU2NhbGV9IGZyb20gJy4vc3RhY2tzY2FsZSc7XG5pbXBvcnQge3RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7dGltZVVuaXREb21haW59IGZyb20gJy4vdGltZXVuaXRkb21haW4nO1xuaW1wb3J0IHtjb2xvclJhbmt9IGZyb20gJy4vY29sb3JyYW5rJztcblxuXG4vKipcbiAqIENvbXBvc2FibGUgY29tcG9uZW50IGluc3RhbmNlIG9mIGEgbW9kZWwncyBkYXRhLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGFDb21wb25lbnQge1xuICBzb3VyY2U6IFZnRGF0YTtcblxuICAvKiogTWFwcGluZyBmcm9tIGZpZWxkIG5hbWUgdG8gcHJpbWl0aXZlIGRhdGEgdHlwZS4gICovXG4gIGZvcm1hdFBhcnNlOiBEaWN0PHN0cmluZz47XG5cbiAgLyoqIFN0cmluZyBzZXQgb2YgZmllbGRzIGZvciBudWxsIGZpbHRlcmluZyAqL1xuICBudWxsRmlsdGVyOiBEaWN0PGJvb2xlYW4+O1xuXG4gIC8qKiBIYXNoc2V0IG9mIGEgZm9ybXVsYSBvYmplY3QgKi9cbiAgY2FsY3VsYXRlOiBEaWN0PEZvcm11bGE+O1xuXG4gIC8qKiBGaWx0ZXIgdGVzdCBleHByZXNzaW9uICovXG4gIGZpbHRlcjogc3RyaW5nO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYSBiaW4gcGFyYW1ldGVyIGhhc2ggdG8gdHJhbnNmb3JtcyBvZiB0aGUgYmlubmVkIGZpZWxkICovXG4gIGJpbjogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGFuIG91dHB1dCBmaWVsZCBuYW1lIChoYXNoKSB0byB0aGUgdGltZSB1bml0IHRyYW5zZm9ybSAgKi9cbiAgdGltZVVuaXQ6IERpY3Q8VmdUcmFuc2Zvcm0+O1xuXG4gIC8qKiBTdHJpbmcgc2V0IG9mIGZpZWxkcyB0byBiZSBmaWx0ZXJlZCAqL1xuICBub25Qb3NpdGl2ZUZpbHRlcjogRGljdDxib29sZWFuPjtcblxuICAvKiogRGF0YSBzb3VyY2UgZm9yIGZlZWRpbmcgc3RhY2tlZCBzY2FsZS4gKi9cbiAgLy8gVE9ETzogbmVlZCB0byByZXZpc2UgaWYgc2luZ2xlIFZnRGF0YSBpcyBzdWZmaWNpZW50IHdpdGggbGF5ZXIgLyBjb25jYXRcbiAgc3RhY2tTY2FsZTogVmdEYXRhO1xuXG4gIC8qKiBEaWN0aW9uYXJ5IG1hcHBpbmcgYW4gb3V0cHV0IGZpZWxkIG5hbWUgKGhhc2gpIHRvIHRoZSBzb3J0IGFuZCByYW5rIHRyYW5zZm9ybXMgICovXG4gIGNvbG9yUmFuazogRGljdDxWZ1RyYW5zZm9ybVtdPjtcblxuICAvKiogU3RyaW5nIHNldCBvZiB0aW1lIHVuaXRzIHRoYXQgbmVlZCB0aGVpciBvd24gZGF0YSBzb3VyY2VzIGZvciBzY2FsZSBkb21haW4gKi9cbiAgdGltZVVuaXREb21haW46IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2Ygc3VtbWFyeSBjb21wb25lbnQgb2JqZWN0IGZvciBwcm9kdWNpbmcgc3VtbWFyeSAoYWdncmVnYXRlKSBkYXRhIHNvdXJjZSAqL1xuICBzdW1tYXJ5OiBTdW1tYXJ5Q29tcG9uZW50W107XG59XG5cbi8qKlxuICogQ29tcG9zYWJsZSBjb21wb25lbnQgZm9yIGEgbW9kZWwncyBzdW1tYXJ5IGRhdGFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdW1tYXJ5Q29tcG9uZW50IHtcbiAgLyoqIE5hbWUgb2YgdGhlIHN1bW1hcnkgZGF0YSBzb3VyY2UgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBTdHJpbmcgc2V0IGZvciBhbGwgZGltZW5zaW9uIGZpZWxkcyAgKi9cbiAgZGltZW5zaW9uczogU3RyaW5nU2V0O1xuXG4gIC8qKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSB0byBzdHJpbmcgc2V0IG9mIGFnZ3JlZ2F0ZSBvcHMgKi9cbiAgbWVhc3VyZXM6IERpY3Q8U3RyaW5nU2V0Pjtcbn1cblxuLy8gVE9ETzogc3BsaXQgdGhpcyBmaWxlIGludG8gbXVsdGlwbGUgZmlsZXMgYW5kIHJlbW92ZSB0aGlzIGxpbnRlciBmbGFnXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdERhdGEobW9kZWw6IFVuaXRNb2RlbCk6IERhdGFDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIGZvcm1hdFBhcnNlOiBmb3JtYXRQYXJzZS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG51bGxGaWx0ZXI6IG51bGxGaWx0ZXIucGFyc2VVbml0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuICAgIG5vblBvc2l0aXZlRmlsdGVyOiBub25Qb3NpdGl2ZUZpbHRlci5wYXJzZVVuaXQobW9kZWwpLFxuXG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VVbml0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIGNhbGN1bGF0ZTogZm9ybXVsYS5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZVVuaXQobW9kZWwpLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkucGFyc2VVbml0KG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlVW5pdChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VVbml0KG1vZGVsKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldERhdGEobW9kZWw6IEZhY2V0TW9kZWwpOiBEYXRhQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VGYWNldChtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VGYWNldChtb2RlbCksXG5cbiAgICBzb3VyY2U6IHNvdXJjZS5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBiaW46IGJpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBjYWxjdWxhdGU6IGZvcm11bGEucGFyc2VGYWNldChtb2RlbCksXG4gICAgdGltZVVuaXQ6IHRpbWVVbml0LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHRpbWVVbml0RG9tYWluOiB0aW1lVW5pdERvbWFpbi5wYXJzZUZhY2V0KG1vZGVsKSxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5LnBhcnNlRmFjZXQobW9kZWwpLFxuICAgIHN0YWNrU2NhbGU6IHN0YWNrU2NhbGUucGFyc2VGYWNldChtb2RlbCksXG4gICAgY29sb3JSYW5rOiBjb2xvclJhbmsucGFyc2VGYWNldChtb2RlbClcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXJEYXRhKG1vZGVsOiBMYXllck1vZGVsKTogRGF0YUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgLy8gZmlsdGVyIGFuZCBmb3JtYXRQYXJzZSBjb3VsZCBjYXVzZSB1cyB0byBub3QgYmUgYWJsZSB0byBtZXJnZSBpbnRvIHBhcmVudFxuICAgIC8vIHNvIGxldCdzIHBhcnNlIHRoZW0gZmlyc3RcbiAgICBmaWx0ZXI6IGZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBmb3JtYXRQYXJzZTogZm9ybWF0UGFyc2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgbnVsbEZpbHRlcjogbnVsbEZpbHRlci5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBub25Qb3NpdGl2ZUZpbHRlcjogbm9uUG9zaXRpdmVGaWx0ZXIucGFyc2VMYXllcihtb2RlbCksXG5cbiAgICAvLyBldmVyeXRoaW5nIGFmdGVyIGhlcmUgZG9lcyBub3QgYWZmZWN0IHdoZXRoZXIgd2UgY2FuIG1lcmdlIGNoaWxkIGRhdGEgaW50byBwYXJlbnQgb3Igbm90XG4gICAgc291cmNlOiBzb3VyY2UucGFyc2VMYXllcihtb2RlbCksXG4gICAgYmluOiBiaW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgY2FsY3VsYXRlOiBmb3JtdWxhLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIHRpbWVVbml0OiB0aW1lVW5pdC5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICB0aW1lVW5pdERvbWFpbjogdGltZVVuaXREb21haW4ucGFyc2VMYXllcihtb2RlbCksXG4gICAgc3VtbWFyeTogc3VtbWFyeS5wYXJzZUxheWVyKG1vZGVsKSxcbiAgICBzdGFja1NjYWxlOiBzdGFja1NjYWxlLnBhcnNlTGF5ZXIobW9kZWwpLFxuICAgIGNvbG9yUmFuazogY29sb3JSYW5rLnBhcnNlTGF5ZXIobW9kZWwpXG4gIH07XG59XG5cblxuLyogdHNsaW50OmVuYWJsZTpuby11c2UtYmVmb3JlLWRlY2xhcmUgKi9cblxuLyoqXG4gKiBDcmVhdGVzIFZlZ2EgRGF0YSBhcnJheSBmcm9tIGEgZ2l2ZW4gY29tcGlsZWQgbW9kZWwgYW5kIGFwcGVuZCBhbGwgb2YgdGhlbSB0byB0aGUgZ2l2ZW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0gIG1vZGVsXG4gKiBAcGFyYW0gIGRhdGEgYXJyYXlcbiAqIEByZXR1cm4gbW9kaWZpZWQgZGF0YSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVEYXRhKG1vZGVsOiBNb2RlbCwgZGF0YTogVmdEYXRhW10pIHtcbiAgY29uc3QgY29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmRhdGE7XG5cbiAgY29uc3Qgc291cmNlRGF0YSA9IHNvdXJjZS5hc3NlbWJsZShtb2RlbCwgY29tcG9uZW50KTtcbiAgaWYgKHNvdXJjZURhdGEpIHtcbiAgICBkYXRhLnB1c2goc291cmNlRGF0YSk7XG4gIH1cblxuICBzdW1tYXJ5LmFzc2VtYmxlKGNvbXBvbmVudCwgbW9kZWwpLmZvckVhY2goZnVuY3Rpb24oc3VtbWFyeURhdGEpIHtcbiAgICBkYXRhLnB1c2goc3VtbWFyeURhdGEpO1xuICB9KTtcblxuICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGF0YVRhYmxlID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gY29sb3IgcmFua1xuICAgIGNvbnN0IGNvbG9yUmFua1RyYW5zZm9ybSA9IGNvbG9yUmFuay5hc3NlbWJsZShjb21wb25lbnQpO1xuICAgIGlmIChjb2xvclJhbmtUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQoY29sb3JSYW5rVHJhbnNmb3JtKTtcbiAgICB9XG5cbiAgICAvLyBub25Qb3NpdGl2ZUZpbHRlclxuICAgIGNvbnN0IG5vblBvc2l0aXZlRmlsdGVyVHJhbnNmb3JtID0gbm9uUG9zaXRpdmVGaWx0ZXIuYXNzZW1ibGUoY29tcG9uZW50KTtcbiAgICBpZiAobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0ubGVuZ3RoID4gMCkge1xuICAgICAgZGF0YVRhYmxlLnRyYW5zZm9ybSA9IChkYXRhVGFibGUudHJhbnNmb3JtIHx8IFtdKS5jb25jYXQobm9uUG9zaXRpdmVGaWx0ZXJUcmFuc2Zvcm0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5cyhjb21wb25lbnQuY29sb3JSYW5rKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sb3JSYW5rIG5vdCBtZXJnZWQnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMoY29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbm9uUG9zaXRpdmVGaWx0ZXIgbm90IG1lcmdlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN0YWNrXG4gIC8vIFRPRE86IHJldmlzZSBpZiB0aGlzIGFjdHVhbGx5IHNob3VsZCBiZSBhbiBhcnJheVxuICBjb25zdCBzdGFja0RhdGEgPSBzdGFja1NjYWxlLmFzc2VtYmxlKGNvbXBvbmVudCk7XG4gIGlmIChzdGFja0RhdGEpIHtcbiAgICBkYXRhLnB1c2goc3RhY2tEYXRhKTtcbiAgfVxuXG4gIHRpbWVVbml0RG9tYWluLmFzc2VtYmxlKGNvbXBvbmVudCkuZm9yRWFjaChmdW5jdGlvbih0aW1lVW5pdERvbWFpbkRhdGEpIHtcbiAgICBkYXRhLnB1c2godGltZVVuaXREb21haW5EYXRhKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHtleHByZXNzaW9ufSBmcm9tICcuLi8uLi9maWx0ZXInO1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGZpbHRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0gdiB2YWx1ZSB0byBiZSBjb252ZXJ0ZWQgaW50byBWZWdhIEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHRpbWVVbml0XG4gICAqIEByZXR1cm4gVmVnYSBFeHByZXNzaW9uIG9mIHRoZSB2YWx1ZSB2LiBUaGlzIGNvdWxkIGJlIG9uZSBvZjpcbiAgICogLSBhIHRpbWVzdGFtcCB2YWx1ZSBvZiBkYXRldGltZSBvYmplY3RcbiAgICogLSBhIHRpbWVzdGFtcCB2YWx1ZSBvZiBjYXN0ZWQgc2luZ2xlIHRpbWUgdW5pdCB2YWx1ZVxuICAgKiAtIHN0cmluZ2lmaWVkIHZhbHVlXG4gICAqL1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZpbHRlciA9IG1vZGVsLnRyYW5zZm9ybSgpLmZpbHRlcjtcbiAgICBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICByZXR1cm4gJygnICtcbiAgICAgICAgZmlsdGVyLm1hcCgoZikgPT4gZXhwcmVzc2lvbihmKSlcbiAgICAgICAgICAuZmlsdGVyKChmKSA9PiBmICE9PXVuZGVmaW5lZClcbiAgICAgICAgICAuam9pbignKSAmJiAoJykgK1xuICAgICAgICAnKSc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXIpIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uKGZpbHRlcik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgZmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlIGJ1dCBoYXMgZmlsdGVyLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIpIHtcbiAgICAgIC8vIG1lcmdlIGJ5IGFkZGluZyAmJlxuICAgICAgZmlsdGVyQ29tcG9uZW50ID1cbiAgICAgICAgKGZpbHRlckNvbXBvbmVudCA/IGZpbHRlckNvbXBvbmVudCArICcgJiYgJyA6ICcnKSArXG4gICAgICAgIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgYGZpbHRlci5wYXJzZUxheWVyYCBtZXRob2QgaXMgY2FsbGVkIGJlZm9yZSBgc291cmNlLnBhcnNlTGF5ZXJgXG4gICAgbGV0IGZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiBjaGlsZERhdGFDb21wb25lbnQuZmlsdGVyICYmIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXIgPT09IGZpbHRlckNvbXBvbmVudCkge1xuICAgICAgICAvLyBzYW1lIGZpbHRlciBpbiBjaGlsZCBzbyB3ZSBjYW4ganVzdCBkZWxldGUgaXRcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5maWx0ZXI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBjb21wb25lbnQuZmlsdGVyO1xuICAgIHJldHVybiBmaWx0ZXIgPyBbe1xuICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICB0ZXN0OiBmaWx0ZXJcbiAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0ZpZWxkRGVmLCBpc0NvdW50fSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1FVQU5USVRBVElWRSwgVEVNUE9SQUx9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGRpZmZlciwgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybWF0UGFyc2Uge1xuICAvLyBUT0RPOiBuZWVkIHRvIHRha2UgY2FsY3VsYXRlIGludG8gYWNjb3VudCBhY3Jvc3MgbGV2ZWxzIHdoZW4gbWVyZ2luZ1xuICBmdW5jdGlvbiBwYXJzZShtb2RlbDogTW9kZWwpOiBEaWN0PHN0cmluZz4ge1xuICAgIGNvbnN0IGNhbGNGaWVsZE1hcCA9IChtb2RlbC50cmFuc2Zvcm0oKS5jYWxjdWxhdGUgfHwgW10pLnJlZHVjZShmdW5jdGlvbihmaWVsZE1hcCwgZm9ybXVsYSkge1xuICAgICAgZmllbGRNYXBbZm9ybXVsYS5maWVsZF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZpZWxkTWFwO1xuICAgIH0sIHt9KTtcblxuICAgIGxldCBwYXJzZUNvbXBvbmVudDogRGljdDxzdHJpbmc+ID0ge307XG4gICAgLy8gdXNlIGZvckVhY2ggcmF0aGVyIHRoYW4gcmVkdWNlIHNvIHRoYXQgaXQgY2FuIHJldHVybiB1bmRlZmluZWRcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBwYXJzZSBuZWVkZWRcbiAgICBtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudHlwZSA9PT0gUVVBTlRJVEFUSVZFKSB7XG4gICAgICAgIGlmIChpc0NvdW50KGZpZWxkRGVmKSB8fCBjYWxjRmllbGRNYXBbZmllbGREZWYuZmllbGRdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlQ29tcG9uZW50W2ZpZWxkRGVmLmZpZWxkXSA9ICdudW1iZXInO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCBidXQgaGFzIGl0cyBvd24gcGFyc2UsIHRoZW4gbWVyZ2VcbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgIGV4dGVuZChwYXJzZUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmZvcm1hdFBhcnNlKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gbm90ZSB0aGF0IHdlIHJ1biB0aGlzIGJlZm9yZSBzb3VyY2UucGFyc2VMYXllclxuICAgIGxldCBwYXJzZUNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmIChtb2RlbC5jb21wYXRpYmxlU291cmNlKGNoaWxkKSAmJiAhZGlmZmVyKGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSwgcGFyc2VDb21wb25lbnQpKSB7XG4gICAgICAgIC8vIG1lcmdlIHBhcnNlIHVwIGlmIHRoZSBjaGlsZCBkb2VzIG5vdCBoYXZlIGFuIGluY29tcGF0aWJsZSBwYXJzZVxuICAgICAgICBleHRlbmQocGFyc2VDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5mb3JtYXRQYXJzZSk7XG4gICAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlQ29tcG9uZW50O1xuICB9XG5cbiAgLy8gQXNzZW1ibGUgZm9yIGZvcm1hdFBhcnNlIGlzIGFuIGlkZW50aXR5IGZ1bmN0aW9uLCBubyBuZWVkIHRvIGRlY2xhcmVcbn1cbiIsImltcG9ydCB7Rm9ybXVsYX0gZnJvbSAnLi4vLi4vdHJhbnNmb3JtJztcbmltcG9ydCB7ZXh0ZW5kLCB2YWxzLCBoYXNoLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgZm9ybXVsYSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8Rm9ybXVsYT4ge1xuICAgIHJldHVybiAobW9kZWwudHJhbnNmb3JtKCkuY2FsY3VsYXRlIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oZm9ybXVsYUNvbXBvbmVudCwgZm9ybXVsYSkge1xuICAgICAgZm9ybXVsYUNvbXBvbmVudFtoYXNoKGZvcm11bGEpXSA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PEZvcm11bGE+KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIG1lcmdlXG4gICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICBleHRlbmQoZm9ybXVsYUNvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZSk7XG4gICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGFDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIGxldCBmb3JtdWxhQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlICYmIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpIHtcbiAgICAgICAgZXh0ZW5kKGZvcm11bGFDb21wb25lbnQgfHwge30sIGNoaWxkRGF0YUNvbXBvbmVudC5jYWxjdWxhdGUpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50LmNhbGN1bGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybXVsYUNvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZShjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gdmFscyhjb21wb25lbnQuY2FsY3VsYXRlKS5yZWR1Y2UoZnVuY3Rpb24odHJhbnNmb3JtLCBmb3JtdWxhKSB7XG4gICAgICB0cmFuc2Zvcm0ucHVzaChleHRlbmQoeyB0eXBlOiAnZm9ybXVsYScgfSwgZm9ybXVsYSkpO1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIEZpbHRlciBub24tcG9zaXRpdmUgdmFsdWUgZm9yIGxvZyBzY2FsZVxuICovXG5leHBvcnQgbmFtZXNwYWNlIG5vblBvc2l0aXZlRmlsdGVyIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpOiBEaWN0PGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbW9kZWwuY2hhbm5lbHMoKS5yZWR1Y2UoZnVuY3Rpb24obm9uUG9zaXRpdmVDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICBpZiAoIW1vZGVsLmZpZWxkKGNoYW5uZWwpIHx8ICFzY2FsZSkge1xuICAgICAgICAvLyBkb24ndCBzZXQgYW55dGhpbmdcbiAgICAgICAgcmV0dXJuIG5vblBvc2l0aXZlQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgbm9uUG9zaXRpdmVDb21wb25lbnRbbW9kZWwuZmllbGQoY2hhbm5lbCldID0gc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLkxPRztcbiAgICAgIHJldHVybiBub25Qb3NpdGl2ZUNvbXBvbmVudDtcbiAgICB9LCB7fSBhcyBEaWN0PGJvb2xlYW4+KTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUZhY2V0KG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlLCB0aGVuIGNvbnNpZGVyIG1lcmdpbmdcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIC8vIEZvciBub3csIGxldCdzIGFzc3VtZSBpdCBhbHdheXMgaGFzIHVuaW9uIHNjYWxlXG4gICAgICBjb25zdCBub25Qb3NpdGl2ZUZpbHRlckNvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcjtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXI7XG4gICAgICByZXR1cm4gbm9uUG9zaXRpdmVGaWx0ZXJDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBEaWN0PGJvb2xlYW4+O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBub3RlIHRoYXQgd2UgcnVuIHRoaXMgYmVmb3JlIHNvdXJjZS5wYXJzZUxheWVyXG4gICAgbGV0IG5vblBvc2l0aXZlRmlsdGVyID0ge30gYXMgRGljdDxib29sZWFuPjtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpICYmICFkaWZmZXIoY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyLCBub25Qb3NpdGl2ZUZpbHRlcikpIHtcbiAgICAgICAgZXh0ZW5kKG5vblBvc2l0aXZlRmlsdGVyLCBjaGlsZERhdGFDb21wb25lbnQubm9uUG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICBkZWxldGUgY2hpbGREYXRhQ29tcG9uZW50Lm5vblBvc2l0aXZlRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vblBvc2l0aXZlRmlsdGVyO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBrZXlzKGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gT25seSBmaWx0ZXIgZmllbGRzIChrZXlzKSB3aXRoIHZhbHVlID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNvbXBvbmVudC5ub25Qb3NpdGl2ZUZpbHRlcltmaWVsZF07XG4gICAgfSkubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZmlsdGVyJyxcbiAgICAgICAgdGVzdDogJ2RhdHVtW1wiJyArIGZpZWxkICsgJ1wiXSA+IDAnXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge0ZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgZGlmZmVyLCBEaWN0fSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLy4uL21vZGVsJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUX05VTExfRklMVEVSUyA9IHtcbiAgbm9taW5hbDogZmFsc2UsXG4gIG9yZGluYWw6IGZhbHNlLFxuICBxdWFudGl0YXRpdmU6IHRydWUsXG4gIHRlbXBvcmFsOiB0cnVlXG59O1xuXG4vLyBUT0RPOiByZW5hbWUgdG8gaW52YWxpZEZpbHRlclxuZXhwb3J0IG5hbWVzcGFjZSBudWxsRmlsdGVyIHtcbiAgLyoqIFJldHVybiBIYXNoc2V0IG9mIGZpZWxkcyBmb3IgbnVsbCBmaWx0ZXJpbmcgKGtleT1maWVsZCwgdmFsdWUgPSB0cnVlKS4gKi9cbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogRGljdDxib29sZWFuPiB7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gbW9kZWwudHJhbnNmb3JtKCk7XG4gICAgbGV0IGZpbHRlckludmFsaWQgPSB0cmFuc2Zvcm0uZmlsdGVySW52YWxpZDtcblxuICAgIGlmIChmaWx0ZXJJbnZhbGlkID09PSB1bmRlZmluZWQgJiYgdHJhbnNmb3JtWydmaWx0ZXJOdWxsJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZmlsdGVySW52YWxpZCA9IHRyYW5zZm9ybVsnZmlsdGVyTnVsbCddO1xuICAgICAgY29uc29sZS53YXJuKCdmaWx0ZXJOdWxsIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgZmlsdGVySW52YWxpZCBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlbC5yZWR1Y2UoZnVuY3Rpb24oYWdncmVnYXRvciwgZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmlsdGVySW52YWxpZCB8fFxuICAgICAgICAoZmlsdGVySW52YWxpZCA9PT0gdW5kZWZpbmVkICYmIGZpZWxkRGVmLmZpZWxkICYmIGZpZWxkRGVmLmZpZWxkICE9PSAnKicgJiYgREVGQVVMVF9OVUxMX0ZJTFRFUlNbZmllbGREZWYudHlwZV0pKSB7XG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlZmluZSB0aGlzIHNvIHdlIGtub3cgdGhhdCB3ZSBkb24ndCBmaWx0ZXIgbnVsbHMgZm9yIHRoaXMgZmllbGRcbiAgICAgICAgLy8gdGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gbWVyZ2UgaW50byBwYXJlbnRzXG4gICAgICAgIGFnZ3JlZ2F0b3JbZmllbGREZWYuZmllbGRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWdncmVnYXRvcjtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgbnVsbEZpbHRlckNvbXBvbmVudCA9IHBhcnNlKG1vZGVsKTtcblxuICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgdGhlbiBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VMYXllcihtb2RlbDogTGF5ZXJNb2RlbCkge1xuICAgIC8vIG5vdGUgdGhhdCB3ZSBydW4gdGhpcyBiZWZvcmUgc291cmNlLnBhcnNlTGF5ZXJcblxuICAgIC8vIEZJWE1FOiBudWxsIGZpbHRlcnMgYXJlIG5vdCBwcm9wZXJseSBwcm9wYWdhdGVkIHJpZ2h0IG5vd1xuICAgIGxldCBudWxsRmlsdGVyQ29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuXG4gICAgbW9kZWwuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG4gICAgICBpZiAobW9kZWwuY29tcGF0aWJsZVNvdXJjZShjaGlsZCkgJiYgIWRpZmZlcihjaGlsZERhdGFDb21wb25lbnQubnVsbEZpbHRlciwgbnVsbEZpbHRlckNvbXBvbmVudCkpIHtcbiAgICAgICAgZXh0ZW5kKG51bGxGaWx0ZXJDb21wb25lbnQsIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5udWxsRmlsdGVyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGxGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKiogQ29udmVydCB0aGUgaGFzaHNldCBvZiBmaWVsZHMgdG8gYSBmaWx0ZXIgdHJhbnNmb3JtLiAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIGNvbnN0IGZpbHRlcmVkRmllbGRzID0ga2V5cyhjb21wb25lbnQubnVsbEZpbHRlcikuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgLy8gb25seSBpbmNsdWRlIGZpZWxkcyB0aGF0IGhhcyB2YWx1ZSA9IHRydWVcbiAgICAgIHJldHVybiBjb21wb25lbnQubnVsbEZpbHRlcltmaWVsZF07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkRmllbGRzLmxlbmd0aCA+IDAgP1xuICAgICAgW3tcbiAgICAgICAgdHlwZTogJ2ZpbHRlcicsXG4gICAgICAgIHRlc3Q6IGZpbHRlcmVkRmllbGRzLm1hcChmdW5jdGlvbihmaWVsZE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJyhkYXR1bVtcIicgKyBmaWVsZE5hbWUgKyAnXCJdICE9PW51bGwnICtcbiAgICAgICAgICAgICcgJiYgIWlzTmFOKGRhdHVtW1wiJysgZmllbGROYW1lICsgJ1wiXSkpJztcbiAgICAgICAgfSkuam9pbignICYmICcpXG4gICAgICB9XSA6IFtdO1xuICB9XG59XG4iLCJpbXBvcnQge0RhdGFGb3JtYXQsIFNPVVJDRX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmR9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQge251bGxGaWx0ZXJ9IGZyb20gJy4vbnVsbGZpbHRlcic7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IHtiaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Zm9ybXVsYX0gZnJvbSAnLi9mb3JtdWxhJztcbmltcG9ydCB7dGltZVVuaXR9IGZyb20gJy4vdGltZXVuaXQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIHNvdXJjZSB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IFZnRGF0YSB7XG4gICAgbGV0IGRhdGEgPSBtb2RlbC5kYXRhKCk7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBleHBsaWNpdGx5IHByb3ZpZGVkXG5cbiAgICAgIGxldCBzb3VyY2VEYXRhOiBWZ0RhdGEgPSB7IG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkgfTtcbiAgICAgIGlmIChkYXRhLnZhbHVlcyAmJiBkYXRhLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNvdXJjZURhdGEudmFsdWVzID0gZGF0YS52YWx1ZXM7XG4gICAgICAgIHNvdXJjZURhdGEuZm9ybWF0ID0geyB0eXBlOiAnanNvbicgfTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS51cmwpIHtcbiAgICAgICAgc291cmNlRGF0YS51cmwgPSBkYXRhLnVybDtcblxuICAgICAgICAvLyBFeHRyYWN0IGV4dGVuc2lvbiBmcm9tIFVSTCB1c2luZyBzbmlwcGV0IGZyb21cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82ODA5MjkvaG93LXRvLWV4dHJhY3QtZXh0ZW5zaW9uLWZyb20tZmlsZW5hbWUtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICAgICAgbGV0IGRlZmF1bHRFeHRlbnNpb24gPSAvKD86XFwuKFteLl0rKSk/JC8uZXhlYyhzb3VyY2VEYXRhLnVybClbMV07XG4gICAgICAgIGlmICghY29udGFpbnMoWydqc29uJywgJ2NzdicsICd0c3YnLCAndG9wb2pzb24nXSwgZGVmYXVsdEV4dGVuc2lvbikpIHtcbiAgICAgICAgICBkZWZhdWx0RXh0ZW5zaW9uID0gJ2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGFGb3JtYXQ6IERhdGFGb3JtYXQgPSBkYXRhLmZvcm1hdCB8fCB7fTtcblxuICAgICAgICAvLyBGb3IgYmFja3dhcmQgY29tcGF0YWJpbGl0eSBmb3IgZm9ybWVyIGBkYXRhLmZvcm1hdFR5cGVgIHByb3BlcnR5XG4gICAgICAgIGNvbnN0IGZvcm1hdFR5cGU6IERhdGFGb3JtYXQgPSBkYXRhRm9ybWF0LnR5cGUgfHwgZGF0YVsnZm9ybWF0VHlwZSddO1xuICAgICAgICBzb3VyY2VEYXRhLmZvcm1hdCA9XG4gICAgICAgICAgZXh0ZW5kKFxuICAgICAgICAgICAgeyB0eXBlOiBmb3JtYXRUeXBlID8gZm9ybWF0VHlwZSA6IGRlZmF1bHRFeHRlbnNpb24gfSxcbiAgICAgICAgICAgIGRhdGFGb3JtYXQucHJvcGVydHkgPyB7IHByb3BlcnR5OiBkYXRhRm9ybWF0LnByb3BlcnR5IH0gOiB7fSxcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgYW5kIG1lc2ggYXJlIHR3byBtdXR1YWxseSBleGNsdXNpdmUgcHJvcGVydGllc1xuICAgICAgICAgICAgZGF0YUZvcm1hdC5mZWF0dXJlID9cbiAgICAgICAgICAgICAgeyBmZWF0dXJlIDogZGF0YUZvcm1hdC5mZWF0dXJlIH0gOlxuICAgICAgICAgICAgZGF0YUZvcm1hdC5tZXNoID9cbiAgICAgICAgICAgICAgeyBtZXNoIDogZGF0YUZvcm1hdC5tZXNoIH0gOlxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc291cmNlRGF0YTtcbiAgICB9IGVsc2UgaWYgKCFtb2RlbC5wYXJlbnQoKSkge1xuICAgICAgLy8gSWYgZGF0YSBpcyBub3QgZXhwbGljaXRseSBwcm92aWRlZCBidXQgdGhlIG1vZGVsIGlzIGEgcm9vdCxcbiAgICAgIC8vIG5lZWQgdG8gcHJvZHVjZSBhIHNvdXJjZSBhcyB3ZWxsXG4gICAgICByZXR1cm4geyBuYW1lOiBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBpZiAoIW1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGEuc291cmNlKSB7XG4gICAgICAvLyBJZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBpdHMgb3duIHNvdXJjZSwgaGF2ZSB0byByZW5hbWUgaXRzIHNvdXJjZS5cbiAgICAgIG1vZGVsLmNoaWxkKCkucmVuYW1lRGF0YShtb2RlbC5jaGlsZCgpLmRhdGFOYW1lKFNPVVJDRSksIG1vZGVsLmRhdGFOYW1lKFNPVVJDRSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2VEYXRhO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICBsZXQgc291cmNlRGF0YSA9IHBhcnNlKG1vZGVsKTtcbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcblxuICAgICAgaWYgKG1vZGVsLmNvbXBhdGlibGVTb3VyY2UoY2hpbGQpKSB7XG4gICAgICAgIC8vIHdlIGNhbm5vdCBtZXJnZSBpZiB0aGUgY2hpbGQgaGFzIGZpbHRlcnMgZGVmaW5lZCBldmVuIGFmdGVyIHdlIHRyaWVkIHRvIG1vdmUgdGhlbSB1cFxuICAgICAgICBjb25zdCBjYW5NZXJnZSA9ICFjaGlsZERhdGEuZmlsdGVyICYmICFjaGlsZERhdGEuZm9ybWF0UGFyc2UgJiYgIWNoaWxkRGF0YS5udWxsRmlsdGVyO1xuICAgICAgICBpZiAoY2FuTWVyZ2UpIHtcbiAgICAgICAgICAvLyByZW5hbWUgc291cmNlIGJlY2F1c2Ugd2UgY2FuIGp1c3QgcmVtb3ZlIGl0XG4gICAgICAgICAgY2hpbGQucmVuYW1lRGF0YShjaGlsZC5kYXRhTmFtZShTT1VSQ0UpLCBtb2RlbC5kYXRhTmFtZShTT1VSQ0UpKTtcbiAgICAgICAgICBkZWxldGUgY2hpbGREYXRhLnNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjaGlsZCBkb2VzIG5vdCBoYXZlIGRhdGEgZGVmaW5lZCBvciB0aGUgc2FtZSBzb3VyY2Ugc28ganVzdCB1c2UgdGhlIHBhcmVudHMgc291cmNlXG4gICAgICAgICAgY2hpbGREYXRhLnNvdXJjZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNoaWxkLmRhdGFOYW1lKFNPVVJDRSksXG4gICAgICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNPVVJDRSlcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUobW9kZWw6IE1vZGVsLCBjb21wb25lbnQ6IERhdGFDb21wb25lbnQpIHtcbiAgICBpZiAoY29tcG9uZW50LnNvdXJjZSkge1xuICAgICAgbGV0IHNvdXJjZURhdGE6IFZnRGF0YSA9IGNvbXBvbmVudC5zb3VyY2U7XG5cbiAgICAgIGlmIChjb21wb25lbnQuZm9ybWF0UGFyc2UpIHtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQgPSBjb21wb25lbnQuc291cmNlLmZvcm1hdCB8fCB7fTtcbiAgICAgICAgY29tcG9uZW50LnNvdXJjZS5mb3JtYXQucGFyc2UgPSBjb21wb25lbnQuZm9ybWF0UGFyc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIG51bGwgZmlsdGVyIGNvbWVzIGZpcnN0IHNvIHRyYW5zZm9ybXMgYXJlIG5vdCBwZXJmb3JtZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgIC8vIHRpbWUgYW5kIGJpbiBzaG91bGQgY29tZSBiZWZvcmUgZmlsdGVyIHNvIHdlIGNhbiBmaWx0ZXIgYnkgdGltZSBhbmQgYmluXG4gICAgICBzb3VyY2VEYXRhLnRyYW5zZm9ybSA9IFtdLmNvbmNhdChcbiAgICAgICAgbnVsbEZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBmb3JtdWxhLmFzc2VtYmxlKGNvbXBvbmVudCksXG4gICAgICAgIGZpbHRlci5hc3NlbWJsZShjb21wb25lbnQpLFxuICAgICAgICBiaW4uYXNzZW1ibGUoY29tcG9uZW50KSxcbiAgICAgICAgdGltZVVuaXQuYXNzZW1ibGUoY29tcG9uZW50KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHNvdXJjZURhdGE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQUNLRURfU0NBTEUsIFNVTU1BUll9IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtGYWNldE1vZGVsfSBmcm9tICcuLy4uL2ZhY2V0JztcbmltcG9ydCB7TGF5ZXJNb2RlbH0gZnJvbSAnLi8uLi9sYXllcic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi8uLi91bml0JztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEnO1xuXG5cbi8qKlxuICogU3RhY2tlZCBzY2FsZSBkYXRhIHNvdXJjZSwgZm9yIGZlZWRpbmcgdGhlIHNoYXJlZCBzY2FsZS5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBzdGFja1NjYWxlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogVW5pdE1vZGVsKTogVmdEYXRhIHtcbiAgICBjb25zdCBzdGFja1Byb3BzID0gbW9kZWwuc3RhY2soKTtcblxuICAgIGlmIChzdGFja1Byb3BzKSB7XG4gICAgICAvLyBwcm9kdWNlIHN0YWNrZWQgc2NhbGVcbiAgICAgIGNvbnN0IGdyb3VwYnlDaGFubmVsID0gc3RhY2tQcm9wcy5ncm91cGJ5Q2hhbm5lbDtcbiAgICAgIGNvbnN0IGZpZWxkQ2hhbm5lbCA9IHN0YWNrUHJvcHMuZmllbGRDaGFubmVsO1xuXG4gICAgICBsZXQgZmllbGRzID0gW107XG4gICAgICBjb25zdCBmaWVsZCA9IG1vZGVsLmZpZWxkKGdyb3VwYnlDaGFubmVsKTtcbiAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNUQUNLRURfU0NBTEUpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpLCAvLyBhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uXG4gICAgICAgIHRyYW5zZm9ybTogW2V4dGVuZCh7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgLy8gcHJvZHVjZSBzdW0gb2YgdGhlIGZpZWxkJ3MgdmFsdWUgZS5nLiwgc3VtIG9mIHN1bSwgc3VtIG9mIGRpc3RpbmN0XG4gICAgICAgICAgc3VtbWFyaXplOiBbeyBvcHM6IFsnc3VtJ10sIGZpZWxkOiBtb2RlbC5maWVsZChmaWVsZENoYW5uZWwpIH1dXG4gICAgICAgIH0sIGZpZWxkcy5sZW5ndGggPiAwID8ge1xuICAgICAgICAgIC8vIGdyb3VwIGJ5IGNoYW5uZWwgYW5kIG90aGVyIGZhY2V0c1xuICAgICAgICAgIGdyb3VwYnk6IGZpZWxkc1xuICAgICAgICB9IDoge30pXVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBjb25zdCBjaGlsZCA9IG1vZGVsLmNoaWxkKCk7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gY2hpbGQuY29tcG9uZW50LmRhdGE7XG5cbiAgICAvLyBJZiBjaGlsZCBkb2Vzbid0IGhhdmUgaXRzIG93biBkYXRhIHNvdXJjZSwgYnV0IGhhcyBzdGFjayBzY2FsZSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UgJiYgY2hpbGREYXRhQ29tcG9uZW50LnN0YWNrU2NhbGUpIHtcbiAgICAgIGxldCBzdGFja0NvbXBvbmVudCA9IGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuXG4gICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuZGF0YU5hbWUoU1RBQ0tFRF9TQ0FMRSk7XG4gICAgICBjaGlsZC5yZW5hbWVEYXRhKHN0YWNrQ29tcG9uZW50Lm5hbWUsIG5ld05hbWUpO1xuICAgICAgc3RhY2tDb21wb25lbnQubmFtZSA9IG5ld05hbWU7XG5cbiAgICAgIC8vIFJlZmVyIHRvIGZhY2V0J3Mgc3VtbWFyeSBpbnN0ZWFkIChhbHdheXMgc3VtbWFyeSBiZWNhdXNlIHN0YWNrZWQgb25seSB3b3JrcyB3aXRoIGFnZ3JlZ2F0aW9uKVxuICAgICAgc3RhY2tDb21wb25lbnQuc291cmNlID0gbW9kZWwuZGF0YU5hbWUoU1VNTUFSWSk7XG5cbiAgICAgIC8vIEFkZCBtb3JlIGRpbWVuc2lvbnMgZm9yIHJvdy9jb2x1bW5cbiAgICAgIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5ID0gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKGdyb3VwYnksIGZpZWxkRGVmKSB7XG4gICAgICAgIGdyb3VwYnkucHVzaChmaWVsZChmaWVsZERlZikpO1xuICAgICAgICByZXR1cm4gZ3JvdXBieTtcbiAgICAgIH0sIHN0YWNrQ29tcG9uZW50LnRyYW5zZm9ybVswXS5ncm91cGJ5KTtcblxuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdGFja1NjYWxlO1xuICAgICAgcmV0dXJuIHN0YWNrQ29tcG9uZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgLy8gVE9ET1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQuc3RhY2tTY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi4vLi4vYWdncmVnYXRlJztcbmltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vLi4vZGF0YSc7XG5pbXBvcnQge2ZpZWxkLCBGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtrZXlzLCB2YWxzLCByZWR1Y2UsIGhhc2gsIERpY3QsIFN0cmluZ1NldH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge0ZhY2V0TW9kZWx9IGZyb20gJy4vLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLy4uL2xheWVyJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vLi4vbW9kZWwnO1xuXG5pbXBvcnQge0RhdGFDb21wb25lbnQsIFN1bW1hcnlDb21wb25lbnR9IGZyb20gJy4vZGF0YSc7XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBzdW1tYXJ5IHtcbiAgZnVuY3Rpb24gYWRkRGltZW5zaW9uKGRpbXM6IHsgW2ZpZWxkOiBzdHJpbmddOiBib29sZWFuIH0sIGZpZWxkRGVmOiBGaWVsZERlZikge1xuICAgIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnc3RhcnQnIH0pXSA9IHRydWU7XG4gICAgICBkaW1zW2ZpZWxkKGZpZWxkRGVmLCB7IGJpblN1ZmZpeDogJ21pZCcgfSldID0gdHJ1ZTtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnZW5kJyB9KV0gPSB0cnVlO1xuXG4gICAgICAvLyBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlKGNoYW5uZWwpO1xuICAgICAgLy8gaWYgKHNjYWxlVHlwZShzY2FsZSwgZmllbGREZWYsIGNoYW5uZWwsIG1vZGVsLm1hcmsoKSkgPT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgICAvLyBhbHNvIHByb2R1Y2UgYmluX3JhbmdlIGlmIHRoZSBiaW5uZWQgZmllbGQgdXNlIG9yZGluYWwgc2NhbGVcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAncmFuZ2UnIH0pXSA9IHRydWU7XG4gICAgICAvLyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpbXNbZmllbGQoZmllbGREZWYpXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBkaW1zO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pdChtb2RlbDogTW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIC8qIHN0cmluZyBzZXQgZm9yIGRpbWVuc2lvbnMgKi9cbiAgICBsZXQgZGltczogU3RyaW5nU2V0ID0ge307XG5cbiAgICAvKiBkaWN0aW9uYXJ5IG1hcHBpbmcgZmllbGQgbmFtZSA9PiBkaWN0IHNldCBvZiBhZ2dyZWdhdGlvbiBmdW5jdGlvbnMgKi9cbiAgICBsZXQgbWVhczogRGljdDxTdHJpbmdTZXQ+ID0ge307XG5cbiAgICBtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKGZpZWxkRGVmLmFnZ3JlZ2F0ZSkge1xuICAgICAgICBpZiAoZmllbGREZWYuYWdncmVnYXRlID09PSBBZ2dyZWdhdGVPcC5DT1VOVCkge1xuICAgICAgICAgIG1lYXNbJyonXSA9IG1lYXNbJyonXSB8fCB7fTtcbiAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICAgIG1lYXNbJyonXVsnY291bnQnXSA9IHRydWU7XG4gICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lYXNbZmllbGREZWYuZmllbGRdID0gbWVhc1tmaWVsZERlZi5maWVsZF0gfHwge307XG4gICAgICAgICAgbWVhc1tmaWVsZERlZi5maWVsZF1bZmllbGREZWYuYWdncmVnYXRlXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZERpbWVuc2lvbihkaW1zLCBmaWVsZERlZik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gW3tcbiAgICAgIG5hbWU6IG1vZGVsLmRhdGFOYW1lKFNVTU1BUlkpLFxuICAgICAgZGltZW5zaW9uczogZGltcyxcbiAgICAgIG1lYXN1cmVzOiBtZWFzXG4gICAgfV07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCk6IFN1bW1hcnlDb21wb25lbnRbXSB7XG4gICAgY29uc3QgY2hpbGREYXRhQ29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQuZGF0YTtcblxuICAgIC8vIElmIGNoaWxkIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGRhdGEgc291cmNlIGJ1dCBoYXMgYSBzdW1tYXJ5IGRhdGEgc291cmNlLCBtZXJnZVxuICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgbGV0IHN1bW1hcnlDb21wb25lbnRzID0gY2hpbGREYXRhQ29tcG9uZW50LnN1bW1hcnkubWFwKGZ1bmN0aW9uKHN1bW1hcnlDb21wb25lbnQpIHtcbiAgICAgICAgLy8gYWRkIGZhY2V0IGZpZWxkcyBhcyBkaW1lbnNpb25zXG4gICAgICAgIHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucyA9IG1vZGVsLnJlZHVjZShhZGREaW1lbnNpb24sIHN1bW1hcnlDb21wb25lbnQuZGltZW5zaW9ucyk7XG5cbiAgICAgICAgY29uc3Qgc3VtbWFyeU5hbWVXaXRob3V0UHJlZml4ID0gc3VtbWFyeUNvbXBvbmVudC5uYW1lLnN1YnN0cihtb2RlbC5jaGlsZCgpLm5hbWUoJycpLmxlbmd0aCk7XG4gICAgICAgIG1vZGVsLmNoaWxkKCkucmVuYW1lRGF0YShzdW1tYXJ5Q29tcG9uZW50Lm5hbWUsIHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgIHN1bW1hcnlDb21wb25lbnQubmFtZSA9IHN1bW1hcnlOYW1lV2l0aG91dFByZWZpeDtcbiAgICAgICAgcmV0dXJuIHN1bW1hcnlDb21wb25lbnQ7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5O1xuICAgICAgcmV0dXJuIHN1bW1hcnlDb21wb25lbnRzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZU1lYXN1cmVzKHBhcmVudE1lYXN1cmVzOiBEaWN0PERpY3Q8Ym9vbGVhbj4+LCBjaGlsZE1lYXN1cmVzOiBEaWN0PERpY3Q8Ym9vbGVhbj4+KSB7XG4gICAgZm9yIChjb25zdCBmaWVsZCBpbiBjaGlsZE1lYXN1cmVzKSB7XG4gICAgICBpZiAoY2hpbGRNZWFzdXJlcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcbiAgICAgICAgLy8gd2hlbiB3ZSBtZXJnZSBhIG1lYXN1cmUsIHdlIGVpdGhlciBoYXZlIHRvIGFkZCBhbiBhZ2dyZWdhdGlvbiBvcGVyYXRvciBvciBldmVuIGEgbmV3IGZpZWxkXG4gICAgICAgIGNvbnN0IG9wcyA9IGNoaWxkTWVhc3VyZXNbZmllbGRdO1xuICAgICAgICBmb3IgKGNvbnN0IG9wIGluIG9wcykge1xuICAgICAgICAgIGlmIChvcHMuaGFzT3duUHJvcGVydHkob3ApKSB7XG4gICAgICAgICAgICBpZiAoZmllbGQgaW4gcGFyZW50TWVhc3VyZXMpIHtcbiAgICAgICAgICAgICAgLy8gYWRkIG9wZXJhdG9yIHRvIGV4aXN0aW5nIG1lYXN1cmUgZmllbGRcbiAgICAgICAgICAgICAgcGFyZW50TWVhc3VyZXNbZmllbGRdW29wXSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJlbnRNZWFzdXJlc1tmaWVsZF0gPSB7IG9wOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpOiBTdW1tYXJ5Q29tcG9uZW50W10ge1xuICAgIC8vIEluZGV4IGJ5IHRoZSBmaWVsZHMgd2UgYXJlIGdyb3VwaW5nIGJ5XG4gICAgbGV0IHN1bW1hcmllcyA9IHt9IGFzIERpY3Q8U3VtbWFyeUNvbXBvbmVudD47XG5cbiAgICAvLyBDb21iaW5lIHN1bW1hcmllcyBmb3IgY2hpbGRyZW4gdGhhdCBkb24ndCBoYXZlIGEgZGlzdGluY3Qgc291cmNlXG4gICAgLy8gKGVpdGhlciBoYXZpbmcgaXRzIG93biBkYXRhIHNvdXJjZSwgb3IgaXRzIG93biB0cmFuZm9ybWF0aW9uIG9mIHRoZSBzYW1lIGRhdGEgc291cmNlKS5cbiAgICBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICAgIGlmICghY2hpbGREYXRhQ29tcG9uZW50LnNvdXJjZSAmJiBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgICAvLyBNZXJnZSB0aGUgc3VtbWFyaWVzIGlmIHdlIGNhblxuICAgICAgICBjaGlsZERhdGFDb21wb25lbnQuc3VtbWFyeS5mb3JFYWNoKChjaGlsZFN1bW1hcnkpID0+IHtcbiAgICAgICAgICAvLyBUaGUga2V5IGlzIGEgaGFzaCBiYXNlZCBvbiB0aGUgZGltZW5zaW9ucztcbiAgICAgICAgICAvLyB3ZSB1c2UgaXQgdG8gZmluZCBvdXQgd2hldGhlciB3ZSBoYXZlIGEgc3VtbWFyeSB0aGF0IHVzZXMgdGhlIHNhbWUgZ3JvdXAgYnkgZmllbGRzLlxuICAgICAgICAgIGNvbnN0IGtleSA9IGhhc2goY2hpbGRTdW1tYXJ5LmRpbWVuc2lvbnMpO1xuICAgICAgICAgIGlmIChrZXkgaW4gc3VtbWFyaWVzKSB7XG4gICAgICAgICAgICAvLyB5ZXMsIHRoZXJlIGlzIGEgc3VtbWFyeSBoYXQgd2UgbmVlZCB0byBtZXJnZSBpbnRvXG4gICAgICAgICAgICAvLyB3ZSBrbm93IHRoYXQgdGhlIGRpbWVuc2lvbnMgYXJlIHRoZSBzYW1lIHNvIHdlIG9ubHkgbmVlZCB0byBtZXJnZSB0aGUgbWVhc3VyZXNcbiAgICAgICAgICAgIG1lcmdlTWVhc3VyZXMoc3VtbWFyaWVzW2tleV0ubWVhc3VyZXMsIGNoaWxkU3VtbWFyeS5tZWFzdXJlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdpdmUgdGhlIHN1bW1hcnkgYSBuZXcgbmFtZVxuICAgICAgICAgICAgY2hpbGRTdW1tYXJ5Lm5hbWUgPSBtb2RlbC5kYXRhTmFtZShTVU1NQVJZKSArICdfJyArIGtleXMoc3VtbWFyaWVzKS5sZW5ndGg7XG4gICAgICAgICAgICBzdW1tYXJpZXNba2V5XSA9IGNoaWxkU3VtbWFyeTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW1vdmUgc3VtbWFyeSBmcm9tIGNoaWxkXG4gICAgICAgICAgY2hpbGQucmVuYW1lRGF0YShjaGlsZC5kYXRhTmFtZShTVU1NQVJZKSwgc3VtbWFyaWVzW2tleV0ubmFtZSk7XG4gICAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC5zdW1tYXJ5O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxzKHN1bW1hcmllcyk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZW1ibGUgdGhlIHN1bW1hcnkuIE5lZWRzIGEgcmVuYW1lIGZ1bmN0aW9uIGJlY2F1c2Ugd2UgY2Fubm90IGd1YXJhbnRlZSB0aGF0IHRoZVxuICAgKiBwYXJlbnQgZGF0YSBiZWZvcmUgdGhlIGNoaWxkcmVuIGRhdGEuXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50LCBtb2RlbDogTW9kZWwpOiBWZ0RhdGFbXSB7XG4gICAgaWYgKCFjb21wb25lbnQuc3VtbWFyeSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50LnN1bW1hcnkucmVkdWNlKGZ1bmN0aW9uKHN1bW1hcnlEYXRhLCBzdW1tYXJ5Q29tcG9uZW50KSB7XG4gICAgICBjb25zdCBkaW1zID0gc3VtbWFyeUNvbXBvbmVudC5kaW1lbnNpb25zO1xuICAgICAgY29uc3QgbWVhcyA9IHN1bW1hcnlDb21wb25lbnQubWVhc3VyZXM7XG5cbiAgICAgIGNvbnN0IGdyb3VwYnkgPSBrZXlzKGRpbXMpO1xuXG4gICAgICAvLyBzaG9ydC1mb3JtYXQgc3VtbWFyaXplIG9iamVjdCBmb3IgVmVnYSdzIGFnZ3JlZ2F0ZSB0cmFuc2Zvcm1cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWdhL3ZlZ2Evd2lraS9EYXRhLVRyYW5zZm9ybXMjLWFnZ3JlZ2F0ZVxuICAgICAgY29uc3Qgc3VtbWFyaXplID0gcmVkdWNlKG1lYXMsIGZ1bmN0aW9uKGFnZ3JlZ2F0b3IsIGZuRGljdFNldCwgZmllbGQpIHtcbiAgICAgICAgYWdncmVnYXRvcltmaWVsZF0gPSBrZXlzKGZuRGljdFNldCk7XG4gICAgICAgIHJldHVybiBhZ2dyZWdhdG9yO1xuICAgICAgfSwge30pO1xuXG4gICAgICBpZiAoa2V5cyhtZWFzKS5sZW5ndGggPiAwKSB7IC8vIGhhcyBhZ2dyZWdhdGVcbiAgICAgICAgc3VtbWFyeURhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZTogc3VtbWFyeUNvbXBvbmVudC5uYW1lLFxuICAgICAgICAgIHNvdXJjZTogbW9kZWwuZGF0YU5hbWUoU09VUkNFKSxcbiAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAgIGdyb3VwYnk6IGdyb3VwYnksXG4gICAgICAgICAgICBzdW1tYXJpemU6IHN1bW1hcml6ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1bW1hcnlEYXRhO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFubmVsfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7ZmllbGQsIEZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2ZpZWxkRXhwcn0gZnJvbSAnLi4vLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtURU1QT1JBTH0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2V4dGVuZCwgdmFscywgRGljdH0gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnVHJhbnNmb3JtfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtMYXllck1vZGVsfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSB0aW1lVW5pdCB7XG4gIGZ1bmN0aW9uIHBhcnNlKG1vZGVsOiBNb2RlbCk6IERpY3Q8VmdUcmFuc2Zvcm0+IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0Q29tcG9uZW50LCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiBmaWVsZERlZi50aW1lVW5pdCkge1xuXG4gICAgICAgIGNvbnN0IGhhc2ggPSBmaWVsZChmaWVsZERlZik7XG5cbiAgICAgICAgdGltZVVuaXRDb21wb25lbnRbaGFzaF0gPSB7XG4gICAgICAgICAgdHlwZTogJ2Zvcm11bGEnLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiksXG4gICAgICAgICAgZXhwcjogZmllbGRFeHByKGZpZWxkRGVmLnRpbWVVbml0LCBmaWVsZERlZi5maWVsZClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBleHBvcnQgY29uc3QgcGFyc2VVbml0ID0gcGFyc2U7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXQobW9kZWw6IEZhY2V0TW9kZWwpIHtcbiAgICBsZXQgdGltZVVuaXRDb21wb25lbnQgPSBwYXJzZShtb2RlbCk7XG5cbiAgICBjb25zdCBjaGlsZERhdGFDb21wb25lbnQgPSBtb2RlbC5jaGlsZCgpLmNvbXBvbmVudC5kYXRhO1xuXG4gICAgLy8gSWYgY2hpbGQgZG9lc24ndCBoYXZlIGl0cyBvd24gZGF0YSBzb3VyY2UsIHRoZW4gbWVyZ2VcbiAgICBpZiAoIWNoaWxkRGF0YUNvbXBvbmVudC5zb3VyY2UpIHtcbiAgICAgIGV4dGVuZCh0aW1lVW5pdENvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0KTtcbiAgICAgIGRlbGV0ZSBjaGlsZERhdGFDb21wb25lbnQudGltZVVuaXQ7XG4gICAgfVxuICAgIHJldHVybiB0aW1lVW5pdENvbXBvbmVudDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJzZUxheWVyKG1vZGVsOiBMYXllck1vZGVsKSB7XG4gICAgbGV0IHRpbWVVbml0Q29tcG9uZW50ID0gcGFyc2UobW9kZWwpO1xuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkRGF0YUNvbXBvbmVudCA9IGNoaWxkLmNvbXBvbmVudC5kYXRhO1xuICAgICAgaWYgKCFjaGlsZERhdGFDb21wb25lbnQuc291cmNlKSB7XG4gICAgICAgIGV4dGVuZCh0aW1lVW5pdENvbXBvbmVudCwgY2hpbGREYXRhQ29tcG9uZW50LnRpbWVVbml0KTtcbiAgICAgICAgZGVsZXRlIGNoaWxkRGF0YUNvbXBvbmVudC50aW1lVW5pdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGltZVVuaXRDb21wb25lbnQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYXNzZW1ibGUoY29tcG9uZW50OiBEYXRhQ29tcG9uZW50KSB7XG4gICAgLy8ganVzdCBqb2luIHRoZSB2YWx1ZXMsIHdoaWNoIGFyZSBhbHJlYWR5IHRyYW5zZm9ybXNcbiAgICByZXR1cm4gdmFscyhjb21wb25lbnQudGltZVVuaXQpO1xuICB9XG59XG4iLCJpbXBvcnQge0NoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkYXRlVGltZUV4cHIsIERhdGVUaW1lRXhwcn0gZnJvbSAnLi4vLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtUaW1lVW5pdCwgcmF3RG9tYWlufSBmcm9tICcuLi8uLi90aW1ldW5pdCc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgU3RyaW5nU2V0fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi8uLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vLi4vbGF5ZXInO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi8uLi9tb2RlbCc7XG5cbmltcG9ydCB7RGF0YUNvbXBvbmVudH0gZnJvbSAnLi9kYXRhJztcblxuXG5leHBvcnQgbmFtZXNwYWNlIHRpbWVVbml0RG9tYWluIHtcbiAgZnVuY3Rpb24gcGFyc2UobW9kZWw6IE1vZGVsKTogU3RyaW5nU2V0IHtcbiAgICByZXR1cm4gbW9kZWwucmVkdWNlKGZ1bmN0aW9uKHRpbWVVbml0RG9tYWluTWFwLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmIChmaWVsZERlZi50aW1lVW5pdCkge1xuICAgICAgICBjb25zdCBkb21haW4gPSByYXdEb21haW4oZmllbGREZWYudGltZVVuaXQsIGNoYW5uZWwpO1xuICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgdGltZVVuaXREb21haW5NYXBbZmllbGREZWYudGltZVVuaXRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0RG9tYWluTWFwO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBwYXJzZVVuaXQgPSBwYXJzZTtcblxuICBleHBvcnQgZnVuY3Rpb24gcGFyc2VGYWNldChtb2RlbDogRmFjZXRNb2RlbCkge1xuICAgIC8vIGFsd2F5cyBtZXJnZSB3aXRoIGNoaWxkXG4gICAgcmV0dXJuIGV4dGVuZChwYXJzZShtb2RlbCksIG1vZGVsLmNoaWxkKCkuY29tcG9uZW50LmRhdGEudGltZVVuaXREb21haW4pO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXIobW9kZWw6IExheWVyTW9kZWwpIHtcbiAgICAvLyBhbHdheXMgbWVyZ2Ugd2l0aCBjaGlsZHJlblxuICAgIHJldHVybiBleHRlbmQocGFyc2UobW9kZWwpLCBtb2RlbC5jaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuY29tcG9uZW50LmRhdGEudGltZVVuaXREb21haW47XG4gICAgfSkpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlKGNvbXBvbmVudDogRGF0YUNvbXBvbmVudCk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4ga2V5cyhjb21wb25lbnQudGltZVVuaXREb21haW4pLnJlZHVjZShmdW5jdGlvbih0aW1lVW5pdERhdGEsIHR1OiBhbnkpIHtcbiAgICAgIGNvbnN0IHRpbWVVbml0OiBUaW1lVW5pdCA9IHR1OyAvLyBjYXN0IHN0cmluZyBiYWNrIHRvIGVudW1cbiAgICAgIGNvbnN0IGRvbWFpbiA9IHJhd0RvbWFpbih0aW1lVW5pdCwgbnVsbCk7IC8vIEZJWE1FIGZpeCByYXdEb21haW4gc2lnbmF0dXJlXG4gICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgIGxldCBkYXRldGltZTogRGF0ZVRpbWVFeHByID0ge307XG4gICAgICAgIGRhdGV0aW1lW3RpbWVVbml0XSA9ICdkYXR1bVtcImRhdGFcIl0nO1xuXG4gICAgICAgIHRpbWVVbml0RGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lOiB0aW1lVW5pdCxcbiAgICAgICAgICB2YWx1ZXM6IGRvbWFpbixcbiAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnZm9ybXVsYScsXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGUnLFxuICAgICAgICAgICAgZXhwcjogZGF0ZVRpbWVFeHByKGRhdGV0aW1lKVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVVbml0RGF0YTtcbiAgICB9LCBbXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7QXhpc09yaWVudCwgQXhpc30gZnJvbSAnLi4vYXhpcyc7XG5pbXBvcnQge0NPTFVNTiwgUk9XLCBYLCBZLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7ZGVmYXVsdENvbmZpZywgQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNVTU1BUll9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtGYWNldH0gZnJvbSAnLi4vZmFjZXQnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ0ZvckVhY2h9IGZyb20gJy4uL2VuY29kaW5nJztcbmltcG9ydCB7RmllbGREZWYsIGlzRGltZW5zaW9ufSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlLCBTY2FsZVR5cGV9IGZyb20gJy4uL3NjYWxlJztcbmltcG9ydCB7RmFjZXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHZhbHMsIGZsYXR0ZW4sIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBEaWN0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhLCBWZ01hcmtHcm91cH0gZnJvbSAnLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge3BhcnNlQXhpcywgcGFyc2VJbm5lckF4aXMsIGdyaWRTaG93LCBwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZUZhY2V0RGF0YX0gZnJvbSAnLi9kYXRhL2RhdGEnO1xuaW1wb3J0IHthc3NlbWJsZUxheW91dCwgcGFyc2VGYWNldExheW91dH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge3BhcnNlU2NhbGVDb21wb25lbnR9IGZyb20gJy4vc2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgRmFjZXRNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgcHJpdmF0ZSBfZmFjZXQ6IEZhY2V0O1xuXG4gIHByaXZhdGUgX2NoaWxkOiBNb2RlbDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBGYWNldFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgLy8gQ29uZmlnIG11c3QgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIGNoaWxkIGFzIGl0IGdldHMgY2FzY2FkZWQgdG8gdGhlIGNoaWxkXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcblxuICAgIGNvbnN0IGNoaWxkICA9IHRoaXMuX2NoaWxkID0gYnVpbGRNb2RlbChzcGVjLnNwZWMsIHRoaXMsIHRoaXMubmFtZSgnY2hpbGQnKSk7XG5cbiAgICBjb25zdCBmYWNldCAgPSB0aGlzLl9mYWNldCA9IHRoaXMuX2luaXRGYWNldChzcGVjLmZhY2V0KTtcbiAgICB0aGlzLl9zY2FsZSAgPSB0aGlzLl9pbml0U2NhbGUoZmFjZXQsIGNvbmZpZywgY2hpbGQpO1xuICAgIHRoaXMuX2F4aXMgICA9IHRoaXMuX2luaXRBeGlzKGZhY2V0LCBjb25maWcsIGNoaWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25maWcoc3BlY0NvbmZpZzogQ29uZmlnLCBwYXJlbnQ6IE1vZGVsKSB7XG4gICAgcmV0dXJuIG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIHNwZWNDb25maWcsIHBhcmVudCA/IHBhcmVudC5jb25maWcoKSA6IHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGYWNldChmYWNldDogRmFjZXQpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZmFjZXQgPSBkdXBsaWNhdGUoZmFjZXQpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hhbm5lbE1hcHBpbmdGb3JFYWNoKHRoaXMuY2hhbm5lbHMoKSwgZmFjZXQsIGZ1bmN0aW9uKGZpZWxkRGVmOiBGaWVsZERlZiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgLy8gVE9ETzogaWYgaGFzIG5vIGZpZWxkIC8gZGF0dW0sIHRoZW4gZHJvcCB0aGUgZmllbGRcblxuICAgICAgaWYgKCFpc0RpbWVuc2lvbihmaWVsZERlZikpIHtcbiAgICAgICAgbW9kZWwuYWRkV2FybmluZyhjaGFubmVsICsgJyBlbmNvZGluZyBzaG91bGQgYmUgb3JkaW5hbC4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUpIHtcbiAgICAgICAgLy8gY29udmVydCBzaG9ydCB0eXBlIHRvIGZ1bGwgdHlwZVxuICAgICAgICBmaWVsZERlZi50eXBlID0gZ2V0RnVsbE5hbWUoZmllbGREZWYudHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhY2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKGZhY2V0OiBGYWNldCwgY29uZmlnOiBDb25maWcsIGNoaWxkOiBNb2RlbCk6IERpY3Q8U2NhbGU+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX3NjYWxlLCBjaGFubmVsKSB7XG4gICAgICBpZiAoZmFjZXRbY2hhbm5lbF0pIHtcblxuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSBmYWNldFtjaGFubmVsXS5zY2FsZSB8fCB7fTtcbiAgICAgICAgX3NjYWxlW2NoYW5uZWxdID0gZXh0ZW5kKHtcbiAgICAgICAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICAgICAgICByb3VuZDogY29uZmlnLmZhY2V0LnNjYWxlLnJvdW5kLFxuXG4gICAgICAgICAgLy8gVE9ETzogcmV2aXNlIHRoaXMgcnVsZSBmb3IgbXVsdGlwbGUgbGV2ZWwgb2YgbmVzdGluZ1xuICAgICAgICAgIHBhZGRpbmc6IChjaGFubmVsID09PSBST1cgJiYgY2hpbGQuaGFzKFkpKSB8fCAoY2hhbm5lbCA9PT0gQ09MVU1OICYmIGNoaWxkLmhhcyhYKSkgP1xuICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mYWNldC5zY2FsZS5wYWRkaW5nIDogMFxuICAgICAgICB9LCBzY2FsZVNwZWMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXhpcyhmYWNldDogRmFjZXQsIGNvbmZpZzogQ29uZmlnLCBjaGlsZDogTW9kZWwpOiBEaWN0PEF4aXM+IHtcbiAgICByZXR1cm4gW1JPVywgQ09MVU1OXS5yZWR1Y2UoZnVuY3Rpb24oX2F4aXMsIGNoYW5uZWwpIHtcbiAgICAgIGlmIChmYWNldFtjaGFubmVsXSkge1xuICAgICAgICBjb25zdCBheGlzU3BlYyA9IGZhY2V0W2NoYW5uZWxdLmF4aXM7XG4gICAgICAgIGlmIChheGlzU3BlYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbEF4aXMgPSBfYXhpc1tjaGFubmVsXSA9IGV4dGVuZCh7fSxcbiAgICAgICAgICAgIGNvbmZpZy5mYWNldC5heGlzLFxuICAgICAgICAgICAgYXhpc1NwZWMgPT09IHRydWUgPyB7fSA6IGF4aXNTcGVjIHx8IHt9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChjaGFubmVsID09PSBST1cpIHtcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzOiBhbnkgPSBjaGlsZC5heGlzKFkpO1xuICAgICAgICAgICAgaWYgKHlBeGlzICYmIHlBeGlzLm9yaWVudCAhPT0gQXhpc09yaWVudC5SSUdIVCAmJiAhbW9kZWxBeGlzLm9yaWVudCkge1xuICAgICAgICAgICAgICBtb2RlbEF4aXMub3JpZW50ID0gQXhpc09yaWVudC5SSUdIVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCBjaGlsZC5oYXMoWCkgJiYgIW1vZGVsQXhpcy5sYWJlbEFuZ2xlKSB7XG4gICAgICAgICAgICAgIG1vZGVsQXhpcy5sYWJlbEFuZ2xlID0gbW9kZWxBeGlzLm9yaWVudCA9PT0gQXhpc09yaWVudC5SSUdIVCA/IDkwIDogMjcwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9heGlzO1xuICAgIH0sIHt9IGFzIERpY3Q8QXhpcz4pO1xuICB9XG5cbiAgcHVibGljIGZhY2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9mYWNldDtcbiAgfVxuXG4gIHB1YmxpYyBoYXMoY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2ZhY2V0W2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGNoaWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzU3VtbWFyeSgpIHtcbiAgICBjb25zdCBzdW1tYXJ5ID0gdGhpcy5jb21wb25lbnQuZGF0YS5zdW1tYXJ5O1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHN1bW1hcnkubGVuZ3RoIDsgaSsrKSB7XG4gICAgICBpZiAoa2V5cyhzdW1tYXJ5W2ldLm1lYXN1cmVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZGF0YVRhYmxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmhhc1N1bW1hcnkoKSA/IFNVTU1BUlkgOiBTT1VSQ0UpICsgJyc7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldCgpW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCkge1xuICAgIHJldHVybiBudWxsOyAvLyB0aGlzIGlzIG9ubHkgYSBwcm9wZXJ0eSBmb3IgVW5pdE1vZGVsXG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZURhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5kYXRhID0gcGFyc2VGYWNldERhdGEodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTZWxlY3Rpb25EYXRhKCkge1xuICAgIC8vIFRPRE86IEBhcnZpbmQgY2FuIHdyaXRlIHRoaXNcbiAgICAvLyBXZSBtaWdodCBuZWVkIHRvIHNwbGl0IHRoaXMgaW50byBjb21waWxlU2VsZWN0aW9uRGF0YSBhbmQgY29tcGlsZVNlbGVjdGlvblNpZ25hbHM/XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMYXlvdXREYXRhKCkge1xuICAgIHRoaXMuY2hpbGQoKS5wYXJzZUxheW91dERhdGEoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZUZhY2V0TGF5b3V0KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2NhbGUoKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkKCk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzO1xuXG4gICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBzY2FsZXMgZm9yIGZpZWxkIHJlZmVyZW5jZSBvZiBwYXJlbnQgZGF0YSAoZS5nLiwgZm9yIFNQTE9NKVxuXG4gICAgLy8gRmlyc3QsIGFkZCBzY2FsZSBmb3Igcm93IGFuZCBjb2x1bW4uXG4gICAgbGV0IHNjYWxlQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuc2NhbGUgPSBwYXJzZVNjYWxlQ29tcG9uZW50KHRoaXMpO1xuXG4gICAgLy8gVGhlbiwgbW92ZSBzaGFyZWQvdW5pb24gZnJvbSBpdHMgY2hpbGQgc3BlYy5cbiAgICBrZXlzKGNoaWxkLmNvbXBvbmVudC5zY2FsZSkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAvLyBUT0RPOiBjb3JyZWN0bHkgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlXG4gICAgICBpZiAodHJ1ZSkgeyAvLyBpZiBzaGFyZWQvdW5pb24gc2NhbGVcbiAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuc2NhbGVbY2hhbm5lbF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggc2NhbGUsIG5lZWQgdG8gcmVuYW1lXG4gICAgICAgIHZhbHMoc2NhbGVDb21wb25lbnRbY2hhbm5lbF0pLmZvckVhY2goZnVuY3Rpb24oc2NhbGUpIHtcbiAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbW9kZWwuc2NhbGVOYW1lKHNjYWxlTmFtZVdpdGhvdXRQcmVmaXgpO1xuICAgICAgICAgIGNoaWxkLnJlbmFtZVNjYWxlKHNjYWxlLm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPbmNlIHB1dCBpbiBwYXJlbnQsIGp1c3QgcmVtb3ZlIHRoZSBjaGlsZCdzIHNjYWxlLlxuICAgICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LnNjYWxlW2NoYW5uZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTWFyaygpIHtcbiAgICB0aGlzLmNoaWxkKCkucGFyc2VNYXJrKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5tYXJrID0gZXh0ZW5kKFxuICAgICAge1xuICAgICAgICBuYW1lOiB0aGlzLm5hbWUoJ2NlbGwnKSxcbiAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAgIHRoaXMuZGF0YVRhYmxlKCkgPyB7ZGF0YTogdGhpcy5kYXRhVGFibGUoKX0gOiB7fSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdmYWNldCcsXG4gICAgICAgICAgICAgIGdyb3VwYnk6IFtdLmNvbmNhdChcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhST1cpID8gW3RoaXMuZmllbGQoUk9XKV0gOiBbXSxcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhDT0xVTU4pID8gW3RoaXMuZmllbGQoQ09MVU1OKV0gOiBbXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVwZGF0ZTogZ2V0RmFjZXRHcm91cFByb3BlcnRpZXModGhpcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIENhbGwgY2hpbGQncyBhc3NlbWJsZUdyb3VwIHRvIGFkZCBtYXJrcywgc2NhbGVzLCBheGVzLCBhbmQgbGVnZW5kcy5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4gY2FsbCBjaGlsZCdzIGFzc2VtYmxlR3JvdXAoKSBoZXJlIGJlY2F1c2UgcGFyc2VNYXJrKClcbiAgICAgIC8vIGlzIHRoZSBsYXN0IG1ldGhvZCBpbiBjb21waWxlKCkgYW5kIHRodXMgdGhlIGNoaWxkIGlzIGNvbXBsZXRlbHkgY29tcGlsZWRcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLmNoaWxkKCkuYXNzZW1ibGVHcm91cCgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXMoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlQXhpcygpO1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1JPVywgQ09MVU1OXSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzR3JvdXAoKSB7XG4gICAgLy8gVE9ETzogd2l0aCBuZXN0aW5nLCB3ZSBtaWdodCBuZWVkIHRvIGNvbnNpZGVyIGNhbGxpbmcgY2hpbGRcbiAgICAvLyB0aGlzLmNoaWxkKCkucGFyc2VBeGlzR3JvdXAoKTtcblxuICAgIGNvbnN0IHhBeGlzR3JvdXAgPSBwYXJzZUF4aXNHcm91cCh0aGlzLCBYKTtcbiAgICBjb25zdCB5QXhpc0dyb3VwID0gcGFyc2VBeGlzR3JvdXAodGhpcywgWSk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5heGlzR3JvdXAgPSBleHRlbmQoXG4gICAgICB4QXhpc0dyb3VwID8ge3g6IHhBeGlzR3JvdXB9IDoge30sXG4gICAgICB5QXhpc0dyb3VwID8ge3k6IHlBeGlzR3JvdXB9IDoge31cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIC8vIFRPRE86IHdpdGggbmVzdGluZywgd2UgbWlnaHQgbmVlZCB0byBjb25zaWRlciBjYWxsaW5nIGNoaWxkXG4gICAgLy8gdGhpcy5jaGlsZCgpLnBhcnNlR3JpZEdyb3VwKCk7XG5cbiAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGQoKTtcblxuICAgIHRoaXMuY29tcG9uZW50LmdyaWRHcm91cCA9IGV4dGVuZChcbiAgICAgICFjaGlsZC5oYXMoWCkgJiYgdGhpcy5oYXMoQ09MVU1OKSA/IHsgY29sdW1uOiBnZXRDb2x1bW5HcmlkR3JvdXBzKHRoaXMpIH0gOiB7fSxcbiAgICAgICFjaGlsZC5oYXMoWSkgJiYgdGhpcy5oYXMoUk9XKSA/IHsgcm93OiBnZXRSb3dHcmlkR3JvdXBzKHRoaXMpIH0gOiB7fVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VMZWdlbmQoKSB7XG4gICAgdGhpcy5jaGlsZCgpLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgaW5kZXBlbmRlbnQgbm9uLXBvc2l0aW9uIHNjYWxlIGFjcm9zcyBmYWNldHNcbiAgICAvLyBUT0RPOiBzdXBwb3J0IGxlZ2VuZCBmb3IgZmllbGQgcmVmZXJlbmNlIG9mIHBhcmVudCBkYXRhIChlLmcuLCBmb3IgU1BMT00pXG5cbiAgICAvLyBGb3Igbm93LCBhc3N1bWluZyB0aGF0IG5vbi1wb3NpdGlvbmFsIHNjYWxlcyBhcmUgYWx3YXlzIHNoYXJlZCBhY3Jvc3MgZmFjZXRzXG4gICAgLy8gVGh1cywganVzdCBtb3ZlIGFsbCBsZWdlbmRzIGZyb20gaXRzIGNoaWxkXG4gICAgdGhpcy5jb21wb25lbnQubGVnZW5kID0gdGhpcy5fY2hpbGQuY29tcG9uZW50LmxlZ2VuZDtcbiAgICB0aGlzLl9jaGlsZC5jb21wb25lbnQubGVnZW5kID0ge307XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVQYXJlbnRHcm91cFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVEYXRhKGRhdGE6IFZnRGF0YVtdKTogVmdEYXRhW10ge1xuICAgIC8vIFByZWZpeCB0cmF2ZXJzYWwg4oCTIHBhcmVudCBkYXRhIG1pZ2h0IGJlIHJlZmVycmVkIGJ5IGNoaWxkcmVuIGRhdGFcbiAgICBhc3NlbWJsZURhdGEodGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkLmFzc2VtYmxlRGF0YShkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQb3N0Zml4IHRyYXZlcnNhbCDigJMgbGF5b3V0IGlzIGFzc2VtYmxlZCBib3R0b20tdXBcbiAgICB0aGlzLl9jaGlsZC5hc3NlbWJsZUxheW91dChsYXlvdXREYXRhKTtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChcbiAgICAgIC8vIGF4aXNHcm91cCBpcyBhIG1hcHBpbmcgdG8gVmdNYXJrR3JvdXBcbiAgICAgIHZhbHModGhpcy5jb21wb25lbnQuYXhpc0dyb3VwKSxcbiAgICAgIGZsYXR0ZW4odmFscyh0aGlzLmNvbXBvbmVudC5ncmlkR3JvdXApKSxcbiAgICAgIHRoaXMuY29tcG9uZW50Lm1hcmtcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNoYW5uZWxzKCkge1xuICAgIHJldHVybiBbUk9XLCBDT0xVTU5dO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcHBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZhY2V0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8vIFRPRE86IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIGZpbGUgaW50byBGYWNldE1vZGVsIGlmIHBvc3NpYmxlXG5cbmZ1bmN0aW9uIGdldEZhY2V0R3JvdXBQcm9wZXJ0aWVzKG1vZGVsOiBGYWNldE1vZGVsKSB7XG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgY29uc3QgbWVyZ2VkQ2VsbENvbmZpZyA9IGV4dGVuZCh7fSwgY2hpbGQuY29uZmlnKCkuY2VsbCwgY2hpbGQuY29uZmlnKCkuZmFjZXQuY2VsbCk7XG5cbiAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICB4OiBtb2RlbC5oYXMoQ09MVU1OKSA/IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTFVNTiksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTFVNTiksXG4gICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgb2Zmc2V0OiBtb2RlbC5zY2FsZShDT0xVTU4pLnBhZGRpbmcgLyAyXG4gICAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgeTogbW9kZWwuaGFzKFJPVykgPyB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFJPVyksXG4gICAgICAgIC8vIG9mZnNldCBieSB0aGUgcGFkZGluZ1xuICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgIH0gOiB7dmFsdWU6IG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmcgLyAyfSxcblxuICAgICAgd2lkdGg6IHtmaWVsZDoge3BhcmVudDogbW9kZWwuY2hpbGQoKS5zaXplTmFtZSgnd2lkdGgnKX19LFxuICAgICAgaGVpZ2h0OiB7ZmllbGQ6IHtwYXJlbnQ6IG1vZGVsLmNoaWxkKCkuc2l6ZU5hbWUoJ2hlaWdodCcpfX1cbiAgICB9LFxuICAgIGNoaWxkLmFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKG1lcmdlZENlbGxDb25maWcpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXhpc0dyb3VwKG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIC8vIFRPRE86IGFkZCBhIGNhc2Ugd2hlcmUgaW5uZXIgc3BlYyBpcyBub3QgYSB1bml0IChmYWNldC9sYXllci9jb25jYXQpXG4gIGxldCBheGlzR3JvdXAgPSBudWxsO1xuXG4gIGNvbnN0IGNoaWxkID0gbW9kZWwuY2hpbGQoKTtcbiAgaWYgKGNoaWxkLmhhcyhjaGFubmVsKSkge1xuICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpKSB7XG4gICAgICBpZiAodHJ1ZSkgeyAvLyB0aGUgY2hhbm5lbCBoYXMgc2hhcmVkIGF4ZXNcblxuICAgICAgICAvLyBhZGQgYSBncm91cCBmb3IgdGhlIHNoYXJlZCBheGVzXG4gICAgICAgIGF4aXNHcm91cCA9IGNoYW5uZWwgPT09IFggPyBnZXRYQXhlc0dyb3VwKG1vZGVsKSA6IGdldFlBeGVzR3JvdXAobW9kZWwpO1xuXG4gICAgICAgIGlmIChjaGlsZC5heGlzKGNoYW5uZWwpICYmIGdyaWRTaG93KGNoaWxkLCBjaGFubmVsKSkgeyAvLyBzaG93IGlubmVyIGdyaWRcbiAgICAgICAgICAvLyBhZGQgaW5uZXIgYXhpcyAoYWthIGF4aXMgdGhhdCBzaG93cyBvbmx5IGdyaWQgdG8gKVxuICAgICAgICAgIGNoaWxkLmNvbXBvbmVudC5heGlzW2NoYW5uZWxdID0gcGFyc2VJbm5lckF4aXMoY2hhbm5lbCwgY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGluZGVwZW5kZW50IGF4ZXMgc3VwcG9ydFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXhpc0dyb3VwO1xufVxuXG5cbmZ1bmN0aW9uIGdldFhBeGVzR3JvdXAobW9kZWw6IEZhY2V0TW9kZWwpOiBWZ01hcmtHcm91cCB7XG4gIGNvbnN0IGhhc0NvbCA9IG1vZGVsLmhhcyhDT0xVTU4pO1xuICByZXR1cm4gZXh0ZW5kKFxuICAgIHtcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3gtYXhlcycpLFxuICAgICAgdHlwZTogJ2dyb3VwJ1xuICAgIH0sXG4gICAgaGFzQ29sID8ge1xuICAgICAgZnJvbTogeyAvLyBUT0RPOiBpZiB3ZSBkbyBmYWNldCB0cmFuc2Zvcm0gYXQgdGhlIHBhcmVudCBsZXZlbCB3ZSBjYW4gc2FtZSBzb21lIHRyYW5zZm9ybSBoZXJlXG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCd3aWR0aCcpfX0sXG4gICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHg6IGhhc0NvbCA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoQ09MVU1OKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKENPTFVNTikucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFgsIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0WUF4ZXNHcm91cChtb2RlbDogRmFjZXRNb2RlbCk6IFZnTWFya0dyb3VwIHtcbiAgY29uc3QgaGFzUm93ID0gbW9kZWwuaGFzKFJPVyk7XG4gIHJldHVybiBleHRlbmQoXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgneS1heGVzJyksXG4gICAgICB0eXBlOiAnZ3JvdXAnXG4gICAgfSxcbiAgICBoYXNSb3cgPyB7XG4gICAgICBmcm9tOiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgdHlwZTogJ2FnZ3JlZ2F0ZScsXG4gICAgICAgICAgZ3JvdXBieTogW21vZGVsLmZpZWxkKFJPVyldLFxuICAgICAgICAgIHN1bW1hcml6ZTogeycqJzogWydjb3VudCddfSAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgYWdncmVnYXRpb25cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9IDoge30sXG4gICAge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgZmllbGQ6IHtncm91cDogJ3dpZHRoJ31cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlaWdodDoge2ZpZWxkOiB7cGFyZW50OiBtb2RlbC5jaGlsZCgpLnNpemVOYW1lKCdoZWlnaHQnKX19LFxuICAgICAgICAgIHk6IGhhc1JvdyA/IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChST1cpLFxuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICBvZmZzZXQ6IG1vZGVsLnNjYWxlKFJPVykucGFkZGluZyAvIDJcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGJ5IHRoZSBwYWRkaW5nXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWwuY29uZmlnKCkuZmFjZXQuc2NhbGUucGFkZGluZyAvIDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGVzOiBbcGFyc2VBeGlzKFksIG1vZGVsLmNoaWxkKCkpXVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0Um93R3JpZEdyb3Vwcyhtb2RlbDogTW9kZWwpOiBhbnlbXSB7IC8vIFRPRE86IFZnTWFya3NcbiAgY29uc3QgZmFjZXRHcmlkQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuZmFjZXQuZ3JpZDtcblxuICBjb25zdCByb3dHcmlkID0ge1xuICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3Jvdy1ncmlkJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIGZyb206IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgdHJhbnNmb3JtOiBbe3R5cGU6ICdmYWNldCcsIGdyb3VwYnk6IFttb2RlbC5maWVsZChST1cpXX1dXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgeToge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoUk9XKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoUk9XKVxuICAgICAgICB9LFxuICAgICAgICB4OiB7dmFsdWU6IDAsIG9mZnNldDogLWZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiAnd2lkdGgnfSwgb2Zmc2V0OiBmYWNldEdyaWRDb25maWcub2Zmc2V0IH0sXG4gICAgICAgIHN0cm9rZTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLmNvbG9yIH0sXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5vcGFjaXR5IH0sXG4gICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDAuNX1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFtyb3dHcmlkLCB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgncm93LWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB5OiB7IGZpZWxkOiB7Z3JvdXA6ICdoZWlnaHQnfX0sXG4gICAgICAgIHg6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICB4Mjoge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfV07XG59XG5cbmZ1bmN0aW9uIGdldENvbHVtbkdyaWRHcm91cHMobW9kZWw6IE1vZGVsKTogYW55IHsgLy8gVE9ETzogVmdNYXJrc1xuICBjb25zdCBmYWNldEdyaWRDb25maWcgPSBtb2RlbC5jb25maWcoKS5mYWNldC5ncmlkO1xuXG4gIGNvbnN0IGNvbHVtbkdyaWQgPSB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQnKSxcbiAgICB0eXBlOiAncnVsZScsXG4gICAgZnJvbToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICB0cmFuc2Zvcm06IFt7dHlwZTogJ2ZhY2V0JywgZ3JvdXBieTogW21vZGVsLmZpZWxkKENPTFVNTildfV1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xVTU4pLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xVTU4pXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHt2YWx1ZTogMCwgb2Zmc2V0OiAtZmFjZXRHcmlkQ29uZmlnLm9mZnNldH0sXG4gICAgICAgIHkyOiB7ZmllbGQ6IHtncm91cDogJ2hlaWdodCd9LCBvZmZzZXQ6IGZhY2V0R3JpZENvbmZpZy5vZmZzZXQgfSxcbiAgICAgICAgc3Ryb2tlOiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcuY29sb3IgfSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogeyB2YWx1ZTogZmFjZXRHcmlkQ29uZmlnLm9wYWNpdHkgfSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogMC41fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gW2NvbHVtbkdyaWQsICB7XG4gICAgbmFtZTogbW9kZWwubmFtZSgnY29sdW1uLWdyaWQtZW5kJyksXG4gICAgdHlwZTogJ3J1bGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB4OiB7IGZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9fSxcbiAgICAgICAgeToge3ZhbHVlOiAwLCBvZmZzZXQ6IC1mYWNldEdyaWRDb25maWcub2Zmc2V0fSxcbiAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J30sIG9mZnNldDogZmFjZXRHcmlkQ29uZmlnLm9mZnNldCB9LFxuICAgICAgICBzdHJva2U6IHsgdmFsdWU6IGZhY2V0R3JpZENvbmZpZy5jb2xvciB9LFxuICAgICAgICBzdHJva2VPcGFjaXR5OiB7IHZhbHVlOiBmYWNldEdyaWRDb25maWcub3BhY2l0eSB9LFxuICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAwLjV9XG4gICAgICB9XG4gICAgfVxuICB9XTtcbn1cbiIsImltcG9ydCB7Q2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge2tleXMsIGR1cGxpY2F0ZSwgbWVyZ2VEZWVwLCBmbGF0dGVuLCB1bmlxdWUsIGlzQXJyYXksIHZhbHMsIGhhc2gsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0xheWVyU3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge2Fzc2VtYmxlRGF0YSwgcGFyc2VMYXllckRhdGF9IGZyb20gJy4vZGF0YS9kYXRhJztcbmltcG9ydCB7YXNzZW1ibGVMYXlvdXQsIHBhcnNlTGF5ZXJMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5pbXBvcnQge2J1aWxkTW9kZWx9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7U2NhbGVDb21wb25lbnRzfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7VmdEYXRhLCBWZ0F4aXMsIFZnTGVnZW5kLCBpc1VuaW9uZWREb21haW4sIGlzRGF0YVJlZkRvbWFpbiwgVmdEYXRhUmVmfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cblxuZXhwb3J0IGNsYXNzIExheWVyTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBVbml0TW9kZWxbXTtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBMYXllclNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5faW5pdENvbmZpZyhzcGVjLmNvbmZpZywgcGFyZW50KTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHNwZWMubGF5ZXJzLm1hcCgobGF5ZXIsIGkpID0+IHtcbiAgICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgbW9kZWwgaGFzIHRvIGJlIGEgdW5pdCBtb2RlbCBiZWFjdXNlIHdlIHBhc3MgaW4gYSB1bml0IHNwZWNcbiAgICAgIHJldHVybiBidWlsZE1vZGVsKGxheWVyLCB0aGlzLCB0aGlzLm5hbWUoJ2xheWVyXycgKyBpKSkgYXMgVW5pdE1vZGVsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgc3BlY0NvbmZpZywgcGFyZW50ID8gcGFyZW50LmNvbmZpZygpIDoge30pO1xuICB9XG5cbiAgcHVibGljIGhhcyhjaGFubmVsOiBDaGFubmVsKTogYm9vbGVhbiB7XG4gICAgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBhbnkgY2hhbm5lbHNcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAvLyBzaW5jZSB3ZSBhc3N1bWUgc2hhcmVkIHNjYWxlcyB3ZSBjYW4ganVzdCBhc2sgdGhlIGZpcnN0IGNoaWxkXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuWzBdLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGRhdGFUYWJsZSgpOiBzdHJpbmcge1xuICAgIC8vIEZJWE1FOiBkb24ndCBqdXN0IHVzZSB0aGUgZmlyc3QgY2hpbGRcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uZGF0YVRhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gbGF5ZXIgZG9lcyBub3QgaGF2ZSBmaWVsZCBkZWZzXG4gIH1cblxuICBwdWJsaWMgc3RhY2soKSB7XG4gICAgcmV0dXJuIG51bGw7IC8vIHRoaXMgaXMgb25seSBhIHByb3BlcnR5IGZvciBVbml0TW9kZWxcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZURhdGEoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLnBhcnNlRGF0YSgpO1xuICAgIH0pO1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZUxheWVyRGF0YSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNlbGVjdGlvbkRhdGEoKSB7XG4gICAgLy8gVE9ETzogQGFydmluZCBjYW4gd3JpdGUgdGhpc1xuICAgIC8vIFdlIG1pZ2h0IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGNvbXBpbGVTZWxlY3Rpb25EYXRhIGFuZCBjb21waWxlU2VsZWN0aW9uU2lnbmFscz9cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dERhdGEoKSB7XG4gICAgLy8gVE9ETzogY29ycmVjdGx5IHVuaW9uIG9yZGluYWwgc2NhbGVzIHJhdGhlciB0aGFuIGp1c3QgdXNpbmcgdGhlIGxheW91dCBvZiB0aGUgZmlyc3QgY2hpbGRcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgY2hpbGQucGFyc2VMYXlvdXREYXRhKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQubGF5b3V0ID0gcGFyc2VMYXllckxheW91dCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZVNjYWxlKCkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgIGxldCBzY2FsZUNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LnNjYWxlID0ge30gYXMgRGljdDxTY2FsZUNvbXBvbmVudHM+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VTY2FsZSgpO1xuXG4gICAgICAvLyBGSVhNRTogY29ycmVjdGx5IGltcGxlbWVudCBpbmRlcGVuZGVudCBzY2FsZVxuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LnNjYWxlKS5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICAgICAgICBsZXQgY2hpbGRTY2FsZXM6IFNjYWxlQ29tcG9uZW50cyA9IGNoaWxkLmNvbXBvbmVudC5zY2FsZVtjaGFubmVsXTtcbiAgICAgICAgICBpZiAoIWNoaWxkU2NhbGVzKSB7XG4gICAgICAgICAgICAvLyB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhbnkgc2NhbGVzIHNvIHdlIGhhdmUgbm90aGluZyB0byBtZXJnZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG1vZGVsU2NhbGVzOiBTY2FsZUNvbXBvbmVudHMgPSBzY2FsZUNvbXBvbmVudFtjaGFubmVsXTtcbiAgICAgICAgICBpZiAobW9kZWxTY2FsZXMgJiYgbW9kZWxTY2FsZXMubWFpbikge1xuICAgICAgICAgICAgLy8gU2NhbGVzIGFyZSB1bmlvbmVkIGJ5IGNvbWJpbmluZyB0aGUgZG9tYWluIG9mIHRoZSBtYWluIHNjYWxlLlxuICAgICAgICAgICAgLy8gT3RoZXIgc2NhbGVzIHRoYXQgYXJlIHVzZWQgZm9yIG9yZGluYWwgbGVnZW5kcyBhcmUgYXBwZW5kZWQuXG4gICAgICAgICAgICBjb25zdCBtb2RlbERvbWFpbiA9IG1vZGVsU2NhbGVzLm1haW4uZG9tYWluO1xuICAgICAgICAgICAgY29uc3QgY2hpbGREb21haW4gPSBjaGlsZFNjYWxlcy5tYWluLmRvbWFpbjtcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkobW9kZWxEb21haW4pKSB7XG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkU2NhbGVzLm1haW4uZG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsU2NhbGVzLm1haW4uZG9tYWluID0gbW9kZWxEb21haW4uY29uY2F0KGNoaWxkRG9tYWluKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5hZGRXYXJuaW5nKCdjdXN0b20gZG9tYWluIHNjYWxlIGNhbm5vdCBiZSB1bmlvbmVkIHdpdGggZGVmYXVsdCBmaWVsZC1iYXNlZCBkb21haW4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgdW5pb25lZEZpZWxkcyA9IGlzVW5pb25lZERvbWFpbihtb2RlbERvbWFpbikgPyBtb2RlbERvbWFpbi5maWVsZHMgOiBbbW9kZWxEb21haW5dIGFzIFZnRGF0YVJlZltdO1xuXG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkRG9tYWluKSkge1xuICAgICAgICAgICAgICAgIG1vZGVsLmFkZFdhcm5pbmcoJ2N1c3RvbSBkb21haW4gc2NhbGUgY2Fubm90IGJlIHVuaW9uZWQgd2l0aCBkZWZhdWx0IGZpZWxkLWJhc2VkIGRvbWFpbicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGZpZWxkcyA9IGlzRGF0YVJlZkRvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChbY2hpbGREb21haW5dKSA6XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRvbWFpbiBpcyBpdHNlbGYgYSB1bmlvbiBkb21haW4sIGNvbmNhdFxuICAgICAgICAgICAgICAgIGlzVW5pb25lZERvbWFpbihjaGlsZERvbWFpbikgPyB1bmlvbmVkRmllbGRzLmNvbmNhdChjaGlsZERvbWFpbi5maWVsZHMpIDpcbiAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gaWdub3JlIGV4cGxpY2l0IGRhdGEgZG9tYWlucyBmb3Igbm93IGJlY2F1c2UgdmVnYSBkb2VzIG5vdCBzdXBwb3J0IHVuaW9uaW5nIHRoZW1cbiAgICAgICAgICAgICAgICAgIHVuaW9uZWRGaWVsZHM7XG4gICAgICAgICAgICAgIGZpZWxkcyA9IHVuaXF1ZShmaWVsZHMsIGhhc2gpO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBpZiBhbGwgZG9tYWlucyB1c2UgdGhlIHNhbWUgZGF0YSwgd2UgY2FuIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSB7IGZpZWxkczogZmllbGRzIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWxTY2FsZXMubWFpbi5kb21haW4gPSBmaWVsZHNbMF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIGNvbG9yIGxlZ2VuZCBhbmQgY29sb3IgbGVnZW5kIGJpbiBzY2FsZXMgaWYgd2UgZG9uJ3QgaGF2ZSB0aGVtIHlldFxuICAgICAgICAgICAgbW9kZWxTY2FsZXMuY29sb3JMZWdlbmQgPSBtb2RlbFNjYWxlcy5jb2xvckxlZ2VuZCA/IG1vZGVsU2NhbGVzLmNvbG9yTGVnZW5kIDogY2hpbGRTY2FsZXMuY29sb3JMZWdlbmQ7XG4gICAgICAgICAgICBtb2RlbFNjYWxlcy5iaW5Db2xvckxlZ2VuZCA9IG1vZGVsU2NhbGVzLmJpbkNvbG9yTGVnZW5kID8gbW9kZWxTY2FsZXMuYmluQ29sb3JMZWdlbmQgOiBjaGlsZFNjYWxlcy5iaW5Db2xvckxlZ2VuZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NhbGVDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZFNjYWxlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW5hbWUgY2hpbGQgc2NhbGVzIHRvIHBhcmVudCBzY2FsZXNcbiAgICAgICAgICB2YWxzKGNoaWxkU2NhbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZU5hbWVXaXRob3V0UHJlZml4ID0gc2NhbGUubmFtZS5zdWJzdHIoY2hpbGQubmFtZSgnJykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBtb2RlbC5zY2FsZU5hbWUoc2NhbGVOYW1lV2l0aG91dFByZWZpeCk7XG4gICAgICAgICAgICBjaGlsZC5yZW5hbWVTY2FsZShzY2FsZS5uYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIHNjYWxlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZGVsZXRlIGNoaWxkU2NhbGVzW2NoYW5uZWxdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU1hcmsoKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VNYXJrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIGxldCBheGlzQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQuYXhpcyA9IHt9IGFzIERpY3Q8VmdBeGlzW10+O1xuXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgY2hpbGQucGFyc2VBeGlzKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmF4aXMpLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgbXVsdGlwbGUgYXhlcyBmb3Igc2hhcmVkIHNjYWxlXG5cbiAgICAgICAgICAvLyBqdXN0IHVzZSB0aGUgZmlyc3QgYXhpcyBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWF4aXNDb21wb25lbnRbY2hhbm5lbF0pIHtcbiAgICAgICAgICAgIGF4aXNDb21wb25lbnRbY2hhbm5lbF0gPSBjaGlsZC5jb21wb25lbnQuYXhpc1tjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlQXhpc0dyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlR3JpZEdyb3VwKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGVnZW5kKCkge1xuICAgIGxldCBsZWdlbmRDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSB7fSBhcyBEaWN0PFZnTGVnZW5kPjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGNoaWxkLnBhcnNlTGVnZW5kKCk7XG5cbiAgICAgIC8vIFRPRE86IGNvcnJlY3RseSBpbXBsZW1lbnQgaW5kZXBlbmRlbnQgYXhlc1xuICAgICAgaWYgKHRydWUpIHsgLy8gaWYgc2hhcmVkL3VuaW9uIHNjYWxlXG4gICAgICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmxlZ2VuZCkuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgICAgICAgLy8ganVzdCB1c2UgdGhlIGZpcnN0IGxlZ2VuZCBkZWZpbml0aW9uIGZvciBlYWNoIGNoYW5uZWxcbiAgICAgICAgICBpZiAoIWxlZ2VuZENvbXBvbmVudFtjaGFubmVsXSkge1xuICAgICAgICAgICAgbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdID0gY2hpbGQuY29tcG9uZW50LmxlZ2VuZFtjaGFubmVsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlUGFyZW50R3JvdXBQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICAvLyBQcmVmaXggdHJhdmVyc2FsIOKAkyBwYXJlbnQgZGF0YSBtaWdodCBiZSByZWZlcnJlZCB0byBieSBjaGlsZHJlbiBkYXRhXG4gICAgYXNzZW1ibGVEYXRhKHRoaXMsIGRhdGEpO1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5hc3NlbWJsZURhdGEoZGF0YSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVMYXlvdXQobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgLy8gUG9zdGZpeCB0cmF2ZXJzYWwg4oCTIGxheW91dCBpcyBhc3NlbWJsZWQgYm90dG9tLXVwXG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFzc2VtYmxlTGF5b3V0KGxheW91dERhdGEpO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NlbWJsZUxheW91dCh0aGlzLCBsYXlvdXREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZU1hcmtzKCk6IGFueVtdIHtcbiAgICAvLyBvbmx5IGNoaWxkcmVuIGhhdmUgbWFya3NcbiAgICByZXR1cm4gZmxhdHRlbih0aGlzLl9jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuYXNzZW1ibGVNYXJrcygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVscygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2hpbGQgZWl0aGVyIGhhcyBubyBzb3VyY2UgZGVmaW5lZCBvciB1c2VzIHRoZSBzYW1lIHVybC5cbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8ga25vdyB3aGV0aGVyIGl0IGlzIHBvc3NpYmxlIHRvIG1vdmUgYSBmaWx0ZXIgdXAuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UgdGggY2hpbGQgaGFzIGJlZW4gcGFyc2VkLlxuICAgKi9cbiAgcHVibGljIGNvbXBhdGlibGVTb3VyY2UoY2hpbGQ6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGEoKTtcbiAgICBjb25zdCBjaGlsZERhdGEgPSBjaGlsZC5jb21wb25lbnQuZGF0YTtcbiAgICBjb25zdCBjb21wYXRpYmxlID0gIWNoaWxkRGF0YS5zb3VyY2UgfHwgKGRhdGEgJiYgZGF0YS51cmwgPT09IGNoaWxkRGF0YS5zb3VyY2UudXJsKTtcbiAgICByZXR1cm4gY29tcGF0aWJsZTtcbiAgfVxufVxuIiwiXG5pbXBvcnQge0NoYW5uZWwsIFgsIFksIFJPVywgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7TEFZT1VUfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCB7U2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge0Zvcm11bGF9IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwga2V5cywgU3RyaW5nU2V0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VmdEYXRhfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7RmFjZXRNb2RlbH0gZnJvbSAnLi9mYWNldCc7XG5pbXBvcnQge0xheWVyTW9kZWx9IGZyb20gJy4vbGF5ZXInO1xuaW1wb3J0IHtURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtyYXdEb21haW59IGZyb20gJy4uL3RpbWV1bml0JztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuL3VuaXQnO1xuXG4vLyBGSVhNRTogZm9yIG5lc3RpbmcgeCBhbmQgeSwgd2UgbmVlZCB0byBkZWNsYXJlIHgseSBsYXlvdXQgc2VwYXJhdGVseSBiZWZvcmUgam9pbmluZyBsYXRlclxuLy8gRm9yIG5vdywgbGV0J3MgYWx3YXlzIGFzc3VtZSBzaGFyZWQgc2NhbGVcbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0Q29tcG9uZW50IHtcbiAgd2lkdGg6IFNpemVDb21wb25lbnQ7XG4gIGhlaWdodDogU2l6ZUNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaXplQ29tcG9uZW50IHtcbiAgLyoqIEZpZWxkIHRoYXQgd2UgbmVlZCB0byBjYWxjdWxhdGUgZGlzdGluY3QgKi9cbiAgZGlzdGluY3Q6IFN0cmluZ1NldDtcblxuICAvKiogQXJyYXkgb2YgZm9ybXVsYXMgKi9cbiAgZm9ybXVsYTogRm9ybXVsYVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVMYXlvdXQobW9kZWw6IE1vZGVsLCBsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgY29uc3QgbGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY29tcG9uZW50LmxheW91dDtcbiAgaWYgKCFsYXlvdXRDb21wb25lbnQud2lkdGggJiYgIWxheW91dENvbXBvbmVudC5oZWlnaHQpIHtcbiAgICByZXR1cm4gbGF5b3V0RGF0YTsgLy8gRG8gbm90aGluZ1xuICB9XG5cbiAgaWYgKHRydWUpIHsgLy8gaWYgYm90aCBhcmUgc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIGRhdGEgc291cmNlIGZvciB3aWR0aCBhbmQgZm9yIGhlaWdodFxuICAgIGNvbnN0IGRpc3RpbmN0RmllbGRzID0ga2V5cyhleHRlbmQobGF5b3V0Q29tcG9uZW50LndpZHRoLmRpc3RpbmN0LCBsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmRpc3RpbmN0KSk7XG4gICAgY29uc3QgZm9ybXVsYSA9IGxheW91dENvbXBvbmVudC53aWR0aC5mb3JtdWxhLmNvbmNhdChsYXlvdXRDb21wb25lbnQuaGVpZ2h0LmZvcm11bGEpXG4gICAgICAubWFwKGZ1bmN0aW9uKGZvcm11bGEpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7dHlwZTogJ2Zvcm11bGEnfSwgZm9ybXVsYSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBbXG4gICAgICBkaXN0aW5jdEZpZWxkcy5sZW5ndGggPiAwID8ge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICBzb3VyY2U6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICB0cmFuc2Zvcm06IFt7XG4gICAgICAgICAgICB0eXBlOiAnYWdncmVnYXRlJyxcbiAgICAgICAgICAgIHN1bW1hcml6ZTogZGlzdGluY3RGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGZpZWxkOiBmaWVsZCwgb3BzOiBbJ2Rpc3RpbmN0J10gfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfV0uY29uY2F0KGZvcm11bGEpXG4gICAgICB9IDoge1xuICAgICAgICBuYW1lOiBtb2RlbC5kYXRhTmFtZShMQVlPVVQpLFxuICAgICAgICB2YWx1ZXM6IFt7fV0sXG4gICAgICAgIHRyYW5zZm9ybTogZm9ybXVsYVxuICAgICAgfVxuICAgIF07XG4gIH1cbiAgLy8gRklYTUU6IGltcGxlbWVudFxuICAvLyBvdGhlcndpc2UsIHdlIG5lZWQgdG8gam9pbiB3aWR0aCBhbmQgaGVpZ2h0IChjcm9zcylcbn1cblxuLy8gRklYTUU6IGZvciBuZXN0aW5nIHggYW5kIHksIHdlIG5lZWQgdG8gZGVjbGFyZSB4LHkgbGF5b3V0IHNlcGFyYXRlbHkgYmVmb3JlIGpvaW5pbmcgbGF0ZXJcbi8vIEZvciBub3csIGxldCdzIGFsd2F5cyBhc3N1bWUgc2hhcmVkIHNjYWxlXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbml0TGF5b3V0KG1vZGVsOiBVbml0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZVVuaXRTaXplTGF5b3V0KG1vZGVsLCBYKSxcbiAgICBoZWlnaHQ6IHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWwsIFkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVW5pdFNpemVMYXlvdXQobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFNpemVDb21wb25lbnQge1xuICAvLyBUT0RPOiB0aGluayBhYm91dCB3aGV0aGVyIHRoaXMgY29uZmlnIGhhcyB0byBiZSB0aGUgY2VsbCBvciBmYWNldCBjZWxsIGNvbmZpZ1xuICBjb25zdCBjZWxsQ29uZmlnID0gbW9kZWwuY29uZmlnKCkuY2VsbDtcbiAgY29uc3Qgbm9uT3JkaW5hbFNpemUgPSBjaGFubmVsID09PSBYID8gY2VsbENvbmZpZy53aWR0aCA6IGNlbGxDb25maWcuaGVpZ2h0O1xuXG4gIHJldHVybiB7XG4gICAgZGlzdGluY3Q6IGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSxcbiAgICBmb3JtdWxhOiBbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IHVuaXRTaXplRXhwcihtb2RlbCwgY2hhbm5lbCwgbm9uT3JkaW5hbFNpemUpXG4gICAgfV1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5pdFNpemVFeHByKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIG5vbk9yZGluYWxTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAobW9kZWwuc2NhbGUoY2hhbm5lbCkpIHtcbiAgICBpZiAobW9kZWwuaXNPcmRpbmFsU2NhbGUoY2hhbm5lbCkpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gICAgICByZXR1cm4gJygnICsgY2FyZGluYWxpdHlGb3JtdWxhKG1vZGVsLCBjaGFubmVsKSArXG4gICAgICAgICcgKyAnICsgc2NhbGUucGFkZGluZyArXG4gICAgICAgICcpICogJyArIHNjYWxlLmJhbmRTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9uT3JkaW5hbFNpemUgKyAnJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1vZGVsLm1hcmsoKSA9PT0gVEVYVE1BUksgJiYgY2hhbm5lbCA9PT0gWCkge1xuICAgICAgLy8gZm9yIHRleHQgdGFibGUgd2l0aG91dCB4L3kgc2NhbGUgd2UgbmVlZCB3aWRlciBiYW5kU2l6ZVxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLnRleHRCYW5kV2lkdGggKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplICsgJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjZXRMYXlvdXQobW9kZWw6IEZhY2V0TW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUZhY2V0U2l6ZUxheW91dChtb2RlbCwgQ09MVU1OKSxcbiAgICBoZWlnaHQ6IHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsLCBST1cpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRmFjZXRTaXplTGF5b3V0KG1vZGVsOiBGYWNldE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogU2l6ZUNvbXBvbmVudCB7XG4gIGNvbnN0IGNoaWxkTGF5b3V0Q29tcG9uZW50ID0gbW9kZWwuY2hpbGQoKS5jb21wb25lbnQubGF5b3V0O1xuICBjb25zdCBzaXplVHlwZSA9IGNoYW5uZWwgPT09IFJPVyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgY29uc3QgY2hpbGRTaXplQ29tcG9uZW50OiBTaXplQ29tcG9uZW50ID0gY2hpbGRMYXlvdXRDb21wb25lbnRbc2l6ZVR5cGVdO1xuXG4gIGlmICh0cnVlKSB7IC8vIGFzc3VtZSBzaGFyZWQgc2NhbGVcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gZXh0ZW5kKGdldERpc3RpbmN0KG1vZGVsLCBjaGFubmVsKSwgY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0KTtcbiAgICBjb25zdCBmb3JtdWxhID0gY2hpbGRTaXplQ29tcG9uZW50LmZvcm11bGEuY29uY2F0KFt7XG4gICAgICBmaWVsZDogbW9kZWwuY2hhbm5lbFNpemVOYW1lKGNoYW5uZWwpLFxuICAgICAgZXhwcjogZmFjZXRTaXplRm9ybXVsYShtb2RlbCwgY2hhbm5lbCwgbW9kZWwuY2hpbGQoKS5jaGFubmVsU2l6ZU5hbWUoY2hhbm5lbCkpXG4gICAgfV0pO1xuXG4gICAgZGVsZXRlIGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgICAgZm9ybXVsYTogZm9ybXVsYVxuICAgIH07XG4gIH1cbiAgLy8gRklYTUUgaW1wbGVtZW50IGluZGVwZW5kZW50IHNjYWxlIGFzIHdlbGxcbiAgLy8gVE9ETzogLSBhbHNvIGNvbnNpZGVyIHdoZW4gY2hpbGRyZW4gaGF2ZSBkaWZmZXJlbnQgZGF0YSBzb3VyY2Vcbn1cblxuZnVuY3Rpb24gZmFjZXRTaXplRm9ybXVsYShtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwsIGlubmVyU2l6ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gJyhkYXR1bVtcIicgKyBpbm5lclNpemUgKyAnXCJdICsgJyArIHNjYWxlLnBhZGRpbmcgKyAnKScgKyAnICogJyArIGNhcmRpbmFsaXR5Rm9ybXVsYShtb2RlbCwgY2hhbm5lbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdkYXR1bVtcIicgKyBpbm5lclNpemUgKyAnXCJdICsgJyArIG1vZGVsLmNvbmZpZygpLmZhY2V0LnNjYWxlLnBhZGRpbmc7IC8vIG5lZWQgdG8gYWRkIG91dGVyIHBhZGRpbmcgZm9yIGZhY2V0XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGF5ZXJMYXlvdXQobW9kZWw6IExheWVyTW9kZWwpOiBMYXlvdXRDb21wb25lbnQge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbCwgWCksXG4gICAgaGVpZ2h0OiBwYXJzZUxheWVyU2l6ZUxheW91dChtb2RlbCwgWSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMYXllclNpemVMYXlvdXQobW9kZWw6IExheWVyTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBTaXplQ29tcG9uZW50IHtcbiAgaWYgKHRydWUpIHtcbiAgICAvLyBGb3Igc2hhcmVkIHNjYWxlLCB3ZSBjYW4gc2ltcGx5IG1lcmdlIHRoZSBsYXlvdXQgaW50byBvbmUgZGF0YSBzb3VyY2VcbiAgICAvLyBUT0RPOiBkb24ndCBqdXN0IHRha2UgdGhlIGxheW91dCBmcm9tIHRoZSBmaXJzdCBjaGlsZFxuXG4gICAgY29uc3QgY2hpbGRMYXlvdXRDb21wb25lbnQgPSBtb2RlbC5jaGlsZHJlbigpWzBdLmNvbXBvbmVudC5sYXlvdXQ7XG4gICAgY29uc3Qgc2l6ZVR5cGUgPSBjaGFubmVsID09PSBZID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIGNvbnN0IGNoaWxkU2l6ZUNvbXBvbmVudDogU2l6ZUNvbXBvbmVudCA9IGNoaWxkTGF5b3V0Q29tcG9uZW50W3NpemVUeXBlXTtcblxuICAgIGNvbnN0IGRpc3RpbmN0ID0gY2hpbGRTaXplQ29tcG9uZW50LmRpc3RpbmN0O1xuICAgIGNvbnN0IGZvcm11bGEgPSBbe1xuICAgICAgZmllbGQ6IG1vZGVsLmNoYW5uZWxTaXplTmFtZShjaGFubmVsKSxcbiAgICAgIGV4cHI6IGNoaWxkU2l6ZUNvbXBvbmVudC5mb3JtdWxhWzBdLmV4cHJcbiAgICB9XTtcblxuICAgIG1vZGVsLmNoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGRlbGV0ZSBjaGlsZC5jb21wb25lbnQubGF5b3V0W3NpemVUeXBlXTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBkaXN0aW5jdDogZGlzdGluY3QsXG4gICAgICBmb3JtdWxhOiBmb3JtdWxhXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXN0aW5jdChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBTdHJpbmdTZXQge1xuICBpZiAobW9kZWwuaGFzKGNoYW5uZWwpICYmIG1vZGVsLmlzT3JkaW5hbFNjYWxlKGNoYW5uZWwpKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgIShzY2FsZS5kb21haW4gaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIC8vIGlmIGV4cGxpY2l0IGRvbWFpbiBpcyBkZWNsYXJlZCwgdXNlIGFycmF5IGxlbmd0aFxuICAgICAgY29uc3QgZGlzdGluY3RGaWVsZCA9IG1vZGVsLmZpZWxkKGNoYW5uZWwpO1xuICAgICAgbGV0IGRpc3RpbmN0OiBTdHJpbmdTZXQgPSB7fTtcbiAgICAgIGRpc3RpbmN0W2Rpc3RpbmN0RmllbGRdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkaXN0aW5jdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG4vLyBUT0RPOiByZW5hbWUgdG8gY2FyZGluYWxpdHlFeHByXG5mdW5jdGlvbiBjYXJkaW5hbGl0eUZvcm11bGEobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGUoY2hhbm5lbCk7XG4gIGlmIChzY2FsZS5kb21haW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBzY2FsZS5kb21haW4ubGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgdGltZVVuaXQgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKS50aW1lVW5pdDtcbiAgY29uc3QgdGltZVVuaXREb21haW4gPSB0aW1lVW5pdCA/IHJhd0RvbWFpbih0aW1lVW5pdCwgY2hhbm5lbCkgOiBudWxsO1xuXG4gIHJldHVybiB0aW1lVW5pdERvbWFpbiAhPT0gbnVsbCA/IHRpbWVVbml0RG9tYWluLmxlbmd0aCA6XG4gICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtkYXR1bTogdHJ1ZSwgcHJlZml4OiAnZGlzdGluY3QnfSk7XG59XG4iLCJpbXBvcnQge0NPTE9SLCBTSVpFLCBTSEFQRSwgT1BBQ0lUWSwgQ2hhbm5lbH0gZnJvbSAnLi4vY2hhbm5lbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHt0aXRsZSBhcyBmaWVsZFRpdGxlfSBmcm9tICcuLi9maWVsZGRlZic7XG5pbXBvcnQge0FSRUEsIEJBUiwgVElDSywgVEVYVCwgTElORSwgUE9JTlQsIENJUkNMRSwgU1FVQVJFfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7T1JESU5BTCwgVEVNUE9SQUx9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtleHRlbmQsIGtleXMsIHdpdGhvdXQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgRklMTF9TVFJPS0VfQ09ORklHLCBudW1iZXJGb3JtYXQsIHRpbWVUZW1wbGF0ZX0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtDT0xPUl9MRUdFTkQsIENPTE9SX0xFR0VORF9MQUJFTH0gZnJvbSAnLi9zY2FsZSc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi91bml0JztcbmltcG9ydCB7VmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMZWdlbmRDb21wb25lbnQobW9kZWw6IFVuaXRNb2RlbCk6IERpY3Q8VmdMZWdlbmQ+IHtcbiAgcmV0dXJuIFtDT0xPUiwgU0laRSwgU0hBUEUsIE9QQUNJVFldLnJlZHVjZShmdW5jdGlvbihsZWdlbmRDb21wb25lbnQsIGNoYW5uZWwpIHtcbiAgICBpZiAobW9kZWwubGVnZW5kKGNoYW5uZWwpKSB7XG4gICAgICBsZWdlbmRDb21wb25lbnRbY2hhbm5lbF0gPSBwYXJzZUxlZ2VuZChtb2RlbCwgY2hhbm5lbCk7XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmRDb21wb25lbnQ7XG4gIH0sIHt9IGFzIERpY3Q8VmdMZWdlbmQ+KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGVnZW5kRGVmV2l0aFNjYWxlKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpOiBWZ0xlZ2VuZCB7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKENPTE9SKTtcbiAgICAgIGNvbnN0IHNjYWxlID0gbW9kZWwuc2NhbGVOYW1lKHVzZUNvbG9yTGVnZW5kU2NhbGUoZmllbGREZWYpID9cbiAgICAgICAgLy8gVG8gcHJvZHVjZSBvcmRpbmFsIGxlZ2VuZCAobGlzdCwgcmF0aGVyIHRoYW4gbGluZWFyIHJhbmdlKSB3aXRoIGNvcnJlY3QgbGFiZWxzOlxuICAgICAgICAvLyAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlc1xuICAgICAgICAvLyAtIEZvciBhIGZpZWxkIHdpdGggYmluIG9yIHRpbWVVbml0LCBwcm92aWRlIGFuIGlkZW50aXR5IG9yZGluYWwgc2NhbGVcbiAgICAgICAgLy8gKG1hcHBpbmcgdGhlIGZpZWxkIHZhbHVlcyB0byB0aGVtc2VsdmVzKVxuICAgICAgICBDT0xPUl9MRUdFTkQgOlxuICAgICAgICBDT0xPUlxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsuZmlsbGVkID8geyBmaWxsOiBzY2FsZSB9IDogeyBzdHJva2U6IHNjYWxlIH07XG4gICAgY2FzZSBTSVpFOlxuICAgICAgcmV0dXJuIHsgc2l6ZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpIH07XG4gICAgY2FzZSBTSEFQRTpcbiAgICAgIHJldHVybiB7IHNoYXBlOiBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpIH07XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgICAgcmV0dXJuIHsgb3BhY2l0eTogbW9kZWwuc2NhbGVOYW1lKE9QQUNJVFkpIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZChtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogVmdMZWdlbmQge1xuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG4gIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gIGxldCBkZWY6IFZnTGVnZW5kID0gZ2V0TGVnZW5kRGVmV2l0aFNjYWxlKG1vZGVsLCBjaGFubmVsKTtcblxuICAvLyAxLjEgQWRkIHByb3BlcnRpZXMgd2l0aCBzcGVjaWFsIHJ1bGVzXG4gIGRlZi50aXRsZSA9IHRpdGxlKGxlZ2VuZCwgZmllbGREZWYsIGNvbmZpZyk7XG4gIGNvbnN0IGZvcm1hdCA9IG51bWJlckZvcm1hdChmaWVsZERlZiwgbGVnZW5kLmZvcm1hdCwgY29uZmlnKTtcbiAgaWYgKGZvcm1hdCkge1xuICAgIGRlZi5mb3JtYXQgPSBmb3JtYXQ7XG4gIH1cblxuICAvLyAxLjIgQWRkIHByb3BlcnRpZXMgd2l0aG91dCBydWxlc1xuICBbJ29mZnNldCcsICdvcmllbnQnLCAndmFsdWVzJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gbGVnZW5kW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMikgQWRkIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbiBncm91cHNcbiAgY29uc3QgcHJvcHMgPSAodHlwZW9mIGxlZ2VuZCAhPT0gJ2Jvb2xlYW4nICYmIGxlZ2VuZC5wcm9wZXJ0aWVzKSB8fCB7fTtcbiAgWyd0aXRsZScsICdzeW1ib2xzJywgJ2xlZ2VuZCcsICdsYWJlbHMnXS5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgbGV0IHZhbHVlID0gcHJvcGVydGllc1tncm91cF0gP1xuICAgICAgcHJvcGVydGllc1tncm91cF0oZmllbGREZWYsIHByb3BzW2dyb3VwXSwgbW9kZWwsIGNoYW5uZWwpIDogLy8gYXBwbHkgcnVsZVxuICAgICAgcHJvcHNbZ3JvdXBdOyAvLyBubyBydWxlIC0tIGp1c3QgZGVmYXVsdCB2YWx1ZXNcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBkZWYucHJvcGVydGllcyA9IGRlZi5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgZGVmLnByb3BlcnRpZXNbZ3JvdXBdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUobGVnZW5kOiBMZWdlbmQsIGZpZWxkRGVmOiBGaWVsZERlZiwgY29uZmlnOiBDb25maWcpIHtcbiAgaWYgKHR5cGVvZiBsZWdlbmQgIT09ICdib29sZWFuJyAmJiBsZWdlbmQudGl0bGUpIHtcbiAgICByZXR1cm4gbGVnZW5kLnRpdGxlO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkVGl0bGUoZmllbGREZWYsIGNvbmZpZyk7XG59XG5cbi8vIHdlIGhhdmUgdG8gdXNlIHNwZWNpYWwgc2NhbGVzIGZvciBvcmRpbmFsIG9yIGJpbm5lZCBmaWVsZHMgZm9yIHRoZSBjb2xvciBjaGFubmVsXG5leHBvcnQgZnVuY3Rpb24gdXNlQ29sb3JMZWdlbmRTY2FsZShmaWVsZERlZjogRmllbGREZWYpIHtcbiAgcmV0dXJuIGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgfHwgZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0O1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIHByb3BlcnRpZXMge1xuICBleHBvcnQgZnVuY3Rpb24gc3ltYm9scyhmaWVsZERlZjogRmllbGREZWYsIHN5bWJvbHNTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgbGV0IHN5bWJvbHM6YW55ID0ge307XG4gICAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgICBjb25zdCBsZWdlbmQgPSBtb2RlbC5sZWdlbmQoY2hhbm5lbCk7XG5cbiAgICBzd2l0Y2ggKG1hcmspIHtcbiAgICAgIGNhc2UgQkFSOlxuICAgICAgY2FzZSBUSUNLOlxuICAgICAgY2FzZSBURVhUOlxuICAgICAgICBzeW1ib2xzLnNoYXBlID0ge3ZhbHVlOiAnc3F1YXJlJ307XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDSVJDTEU6XG4gICAgICBjYXNlIFNRVUFSRTpcbiAgICAgICAgc3ltYm9scy5zaGFwZSA9IHsgdmFsdWU6IG1hcmsgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBPSU5UOlxuICAgICAgY2FzZSBMSU5FOlxuICAgICAgY2FzZSBBUkVBOlxuICAgICAgICAvLyB1c2UgZGVmYXVsdCBjaXJjbGVcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsbGVkID0gbW9kZWwuY29uZmlnKCkubWFyay5maWxsZWQ7XG5cblxuICAgIGxldCBjb25maWcgPSBjaGFubmVsID09PSBDT0xPUiA/XG4gICAgICAgIC8qIEZvciBjb2xvcidzIGxlZ2VuZCwgZG8gbm90IHNldCBmaWxsICh3aGVuIGZpbGxlZCkgb3Igc3Ryb2tlICh3aGVuIHVuZmlsbGVkKSBwcm9wZXJ0eSBmcm9tIGNvbmZpZyBiZWNhdXNlIHRoZSB0aGUgbGVnZW5kJ3MgYGZpbGxgIG9yIGBzdHJva2VgIHNjYWxlIHNob3VsZCBoYXZlIHByZWNlZGVuY2UgKi9cbiAgICAgICAgd2l0aG91dChGSUxMX1NUUk9LRV9DT05GSUcsIFsgZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZScsICdzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnXSkgOlxuICAgICAgICAvKiBGb3Igb3RoZXIgbGVnZW5kLCBubyBuZWVkIHRvIG9taXQuICovXG4gICAgICAgICB3aXRob3V0KEZJTExfU1RST0tFX0NPTkZJRywgWydzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnXSk7XG5cbiAgICBjb25maWcgPSB3aXRob3V0KGNvbmZpZywgWydzdHJva2VEYXNoJywgJ3N0cm9rZURhc2hPZmZzZXQnXSk7XG5cbiAgICBhcHBseU1hcmtDb25maWcoc3ltYm9scywgbW9kZWwsIGNvbmZpZyk7XG5cbiAgICBpZiAoZmlsbGVkKSB7XG4gICAgICBzeW1ib2xzLnN0cm9rZVdpZHRoID0geyB2YWx1ZTogMCB9O1xuICAgIH1cblxuICAgIC8vIEF2b2lkIG92ZXJyaWRlIGRlZmF1bHQgbWFwcGluZyBmb3Igb3BhY2l0eSBjaGFubmVsXG4gICAgaWYgKGNoYW5uZWwgPT09IE9QQUNJVFkpIHtcbiAgICAgIGRlbGV0ZSBzeW1ib2xzLm9wYWNpdHk7XG4gICAgfVxuXG4gICAgbGV0IHZhbHVlO1xuICAgIGlmIChtb2RlbC5oYXMoQ09MT1IpICYmIGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICBpZiAodXNlQ29sb3JMZWdlbmRTY2FsZShmaWVsZERlZikpIHtcbiAgICAgICAgLy8gZm9yIGNvbG9yIGxlZ2VuZCBzY2FsZSwgd2UgbmVlZCB0byBvdmVycmlkZVxuICAgICAgICB2YWx1ZSA9IHsgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUiksIGZpZWxkOiAnZGF0YScgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKENPTE9SKS52YWx1ZSkge1xuICAgICAgdmFsdWUgPSB7IHZhbHVlOiBtb2RlbC5maWVsZERlZihDT0xPUikudmFsdWUgfTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gYXBwbHkgdGhlIHZhbHVlXG4gICAgICBpZiAoZmlsbGVkKSB7XG4gICAgICAgIHN5bWJvbHMuZmlsbCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ltYm9scy5zdHJva2UgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoYW5uZWwgIT09IENPTE9SKSB7XG4gICAgICAvLyBGb3Igbm9uLWNvbG9yIGxlZ2VuZCwgYXBwbHkgY29sb3IgY29uZmlnIGlmIHRoZXJlIGlzIG5vIGZpbGwgLyBzdHJva2UgY29uZmlnLlxuICAgICAgLy8gKEZvciBjb2xvciwgZG8gbm90IG92ZXJyaWRlIHNjYWxlIHNwZWNpZmllZCEpXG4gICAgICBzeW1ib2xzW2ZpbGxlZCA/ICdmaWxsJyA6ICdzdHJva2UnXSA9IHN5bWJvbHNbZmlsbGVkID8gJ2ZpbGwnIDogJ3N0cm9rZSddIHx8XG4gICAgICAgIHt2YWx1ZTogbW9kZWwuY29uZmlnKCkubWFyay5jb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLmZpbGwgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5zeW1ib2xTaGFwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLnNoYXBlID0ge3ZhbHVlOiBsZWdlbmQuc3ltYm9sU2hhcGV9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQuc3ltYm9sU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzeW1ib2xzLnNpemUgPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnN5bWJvbFN0cm9rZVdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN5bWJvbHMuc3Ryb2tlV2lkdGggPSB7dmFsdWU6IGxlZ2VuZC5zeW1ib2xTdHJva2VXaWR0aH07XG4gICAgfVxuXG4gICAgc3ltYm9scyA9IGV4dGVuZChzeW1ib2xzLCBzeW1ib2xzU3BlYyB8fCB7fSk7XG5cbiAgICByZXR1cm4ga2V5cyhzeW1ib2xzKS5sZW5ndGggPiAwID8gc3ltYm9scyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMoZmllbGREZWY6IEZpZWxkRGVmLCBsYWJlbHNTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgbGV0IGxhYmVsczphbnkgPSB7fTtcblxuICAgIGlmIChjaGFubmVsID09PSBDT0xPUikge1xuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwpIHtcbiAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShDT0xPUl9MRUdFTkQpLFxuICAgICAgICAgICAgZmllbGQ6ICdkYXRhJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgbGFiZWxzU3BlYyB8fCB7fSk7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICBsYWJlbHNTcGVjID0gZXh0ZW5kKHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORF9MQUJFTCksXG4gICAgICAgICAgICBmaWVsZDogJ2RhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsYWJlbHNTcGVjIHx8IHt9KTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudHlwZSA9PT0gVEVNUE9SQUwpIHtcbiAgICAgICAgbGFiZWxzU3BlYyA9IGV4dGVuZCh7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHRpbWVUZW1wbGF0ZSgnZGF0dW1bXCJkYXRhXCJdJywgZmllbGREZWYudGltZVVuaXQsIGxlZ2VuZC5mb3JtYXQsIGxlZ2VuZC5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZylcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGxhYmVsc1NwZWMgfHwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxBbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsYWJlbHMuYWxpZ24gPSB7dmFsdWU6IGxlZ2VuZC5sYWJlbEFsaWdufTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLnN0cm9rZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQ29sb3J9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQubGFiZWxGb250ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5mb250ID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250fTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLmxhYmVsRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGFiZWxzLmZvbnRTaXplID0ge3ZhbHVlOiBsZWdlbmQubGFiZWxGb250U2l6ZX07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC5sYWJlbEJhc2VsaW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVscy5iYXNlbGluZSA9IHt2YWx1ZTogbGVnZW5kLmxhYmVsQmFzZWxpbmV9O1xuICAgIH1cblxuICAgIGxhYmVscyA9IGV4dGVuZChsYWJlbHMsIGxhYmVsc1NwZWMgfHwge30pO1xuXG4gICAgcmV0dXJuIGtleXMobGFiZWxzKS5sZW5ndGggPiAwID8gbGFiZWxzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGZpZWxkRGVmOiBGaWVsZERlZiwgdGl0bGVTcGVjLCBtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gICAgbGV0IHRpdGxlczphbnkgPSB7fTtcblxuICAgIGlmIChsZWdlbmQudGl0bGVDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuc3Ryb2tlID0ge3ZhbHVlOiBsZWdlbmQudGl0bGVDb2xvcn07XG4gICAgfVxuXG4gICAgaWYgKGxlZ2VuZC50aXRsZUZvbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGl0bGVzLmZvbnQgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnR9O1xuICAgIH1cblxuICAgIGlmIChsZWdlbmQudGl0bGVGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFNpemUgPSB7dmFsdWU6IGxlZ2VuZC50aXRsZUZvbnRTaXplfTtcbiAgICB9XG5cbiAgICBpZiAobGVnZW5kLnRpdGxlRm9udFdlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aXRsZXMuZm9udFdlaWdodCA9IHt2YWx1ZTogbGVnZW5kLnRpdGxlRm9udFdlaWdodH07XG4gICAgfVxuXG4gICAgdGl0bGVzID0gZXh0ZW5kKHRpdGxlcywgdGl0bGVTcGVjIHx8IHt9KTtcblxuICAgIHJldHVybiBrZXlzKHRpdGxlcykubGVuZ3RoID4gMCA/IHRpdGxlcyA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7WCwgWX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge09yaWVudH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7aXNEaW1lbnNpb24sIGlzTWVhc3VyZSwgRmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1N0YWNrUHJvcGVydGllc30gZnJvbSAnLi4vLi4vc3RhY2snO1xuXG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5LCBhcHBseU1hcmtDb25maWd9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgYXJlYSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ2FyZWEnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIC8vIFdlIHNob3VsZCBhbHdheXMgaGF2ZSBvcmllbnQgYXMgd2UgYXVnbWVudCBpdCBpbiBjb25maWcudHNcbiAgICBjb25zdCBvcmllbnQgPSBjb25maWcubWFyay5vcmllbnQ7XG4gICAgcC5vcmllbnQgPSB7IHZhbHVlOiBvcmllbnR9IDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIG9yaWVudCwgc3RhY2spO1xuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuXG4gICAgLy8gSGF2ZSBvbmx5IHgyIG9yIHkyXG4gICAgY29uc3QgX3gyID0geDIobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5lbmNvZGluZygpLngyLCBtb2RlbC5zY2FsZU5hbWUoWCksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeDIpIHtcbiAgICAgIHAueDIgPSBfeDI7XG4gICAgfVxuXG4gICAgY29uc3QgX3kyID0geTIobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5lbmNvZGluZygpLnkyLCBtb2RlbC5zY2FsZU5hbWUoWSksIG9yaWVudCwgc3RhY2spO1xuICAgIGlmIChfeTIpIHtcbiAgICAgIHAueTIgPSBfeTI7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCwgWydpbnRlcnBvbGF0ZScsICd0ZW5zaW9uJ10pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmLCB7IHN1ZmZpeDogJ3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzTWVhc3VyZShmaWVsZERlZikpIHsgLy8gTWVhc3VyZVxuICAgICAgaWYgKG9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgLy8geFxuICAgICAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKGZpZWxkRGVmKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNEaW1lbnNpb24oZmllbGREZWYpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiB4Mih4RmllbGREZWY6IEZpZWxkRGVmLCB4MkZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIG9yaWVudDogT3JpZW50LCBzdGFjazogU3RhY2tQcm9wZXJ0aWVzKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICBpZiAoc3RhY2sgJiYgWCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7IC8vIFN0YWNrZWQgTWVhc3VyZVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHhGaWVsZERlZiwgeyBzdWZmaXg6ICdlbmQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHgyRmllbGREZWYpIHtcbiAgICAgICAgaWYgKHgyRmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZCh4MkZpZWxkRGVmKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoeDJGaWVsZERlZi52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHgyRmllbGREZWYudmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IG1ha2UgdGhpcyB3b3JrIGZvciBsb2cgc2NhbGVcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgdmFsdWU6IDBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24geShmaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBvcmllbnQ6IE9yaWVudCwgc3RhY2s6IFN0YWNrUHJvcGVydGllcyk6IFZnVmFsdWVSZWYge1xuICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8gU3RhY2tlZCBNZWFzdXJlXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgc3VmZml4OiAnc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNNZWFzdXJlKGZpZWxkRGVmKSkge1xuICAgICAgaWYgKG9yaWVudCAhPT0gT3JpZW50LkhPUklaT05UQUwpIHtcbiAgICAgICAgLy8geVxuICAgICAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0RpbWVuc2lvbihmaWVsZERlZikpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHkyKHlGaWVsZERlZjogRmllbGREZWYsIHkyRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgb3JpZW50OiBPcmllbnQsIHN0YWNrOiBTdGFja1Byb3BlcnRpZXMpOiBWZ1ZhbHVlUmVmIHtcbiAgICBpZiAob3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgaWYgKHN0YWNrICYmIFkgPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkgeyAvLyBTdGFja2VkIE1lYXN1cmVcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh5RmllbGREZWYsIHsgc3VmZml4OiAnZW5kJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh5MkZpZWxkRGVmKSB7XG4gICAgICAgIC8vIHkyXG4gICAgICAgIGlmICh5MkZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQoeTJGaWVsZERlZilcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHkyRmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB5MkZpZWxkRGVmLnZhbHVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgd29yayBmb3IgbG9nIHNjYWxlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgIHZhbHVlOiAwXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFNJWkUsIENoYW5uZWx9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge2lzTWVhc3VyZX0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4uLy4uL3NjYWxlJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBiYXIge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdyZWN0JztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPIFVzZSBWZWdhJ3MgbWFya3MgcHJvcGVydGllcyBpbnRlcmZhY2VcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICBjb25zdCBvcmllbnQgPSBtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudDtcblxuICAgIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgICBjb25zdCB4RmllbGREZWYgPSBtb2RlbC5lbmNvZGluZygpLng7XG4gICAgY29uc3QgeDJGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueDI7XG5cbiAgICBjb25zdCB4SXNNZWFzdXJlID0gaXNNZWFzdXJlKHhGaWVsZERlZikgfHwgaXNNZWFzdXJlKHgyRmllbGREZWYpO1xuXG4gICAgLy8geCwgeDIsIGFuZCB3aWR0aCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gICAgaWYgKHN0YWNrICYmIFggPT09IHN0YWNrLmZpZWxkQ2hhbm5lbCkge1xuICAgICAgLy8gJ3gnIGlzIGEgc3RhY2tlZCBtZWFzdXJlLCB0aHVzIHVzZSA8ZmllbGQ+X3N0YXJ0IGFuZCA8ZmllbGQ+X2VuZCBmb3IgeCwgeDIuXG4gICAgICBwLnggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ3N0YXJ0JyB9KVxuICAgICAgfTtcbiAgICAgIHAueDIgPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IHN1ZmZpeDogJ2VuZCcgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh4SXNNZWFzdXJlKSB7XG4gICAgICBpZiAob3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAobW9kZWwuaGFzKFgpKSB7XG4gICAgICAgICAgcC54ID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC54ID0ge1xuICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbC5oYXMoWDIpKSB7XG4gICAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWDIpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobW9kZWwuc2NhbGUoWCkudHlwZSA9PT0gU2NhbGVUeXBlLkxPRykge1xuICAgICAgICAgICAgcC54MiA9IHsgdmFsdWU6IDAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICAgfTtcbiAgICAgICAgcC53aWR0aCA9IHt2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBYKX07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlbC5maWVsZERlZihYKS5iaW4pIHtcbiAgICAgIGlmIChtb2RlbC5oYXMoU0laRSkgJiYgb3JpZW50ICE9PSBPcmllbnQuSE9SSVpPTlRBTCkge1xuICAgICAgICAvLyBGb3IgdmVydGljYWwgY2hhcnQgdGhhdCBoYXMgYmlubmVkIFggYW5kIHNpemUsXG4gICAgICAgIC8vIGNlbnRlciBiYXIgYW5kIGFwcGx5IHNpemUgdG8gd2lkdGguXG4gICAgICAgIHAueGMgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICAgIHAud2lkdGggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueCA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ3N0YXJ0JyB9KSxcbiAgICAgICAgICBvZmZzZXQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgcC54MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFgpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChYLCB7IGJpblN1ZmZpeDogJ2VuZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyB4IGlzIGRpbWVuc2lvbiBvciB1bnNwZWNpZmllZFxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkgeyAvLyBpcyBvcmRpbmFsXG4gICAgICAgcC54YyA9IHtcbiAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWCksXG4gICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWClcbiAgICAgICB9O1xuICAgICB9IGVsc2UgeyAvLyBubyB4XG4gICAgICAgIHAueCA9IHsgdmFsdWU6IDAsIG9mZnNldDogMiB9O1xuICAgICAgfVxuXG4gICAgICBwLndpZHRoID0gbW9kZWwuaGFzKFNJWkUpICYmIG9yaWVudCAhPT0gT3JpZW50LkhPUklaT05UQUwgPyB7XG4gICAgICAgICAgLy8gYXBwbHkgc2l6ZSBzY2FsZSBpZiBoYXMgc2l6ZSBhbmQgaXMgdmVydGljYWwgKGV4cGxpY2l0IFwidmVydGljYWxcIiBvciB1bmRlZmluZWQpXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAvLyBvdGhlcndpc2UsIHVzZSBmaXhlZCBzaXplXG4gICAgICAgICAgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgKFgpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHlGaWVsZERlZiA9IG1vZGVsLmVuY29kaW5nKCkueTtcbiAgICBjb25zdCB5MkZpZWxkRGVmID0gbW9kZWwuZW5jb2RpbmcoKS55MjtcblxuICAgIGNvbnN0IHlJc01lYXN1cmUgPSBpc01lYXN1cmUoeUZpZWxkRGVmKSB8fCBpc01lYXN1cmUoeTJGaWVsZERlZik7XG4gICAgLy8geSwgeTIgJiBoZWlnaHQgLS0gd2UgbXVzdCBzcGVjaWZ5IHR3byBvZiB0aGVzZSBpbiBhbGwgY29uZGl0aW9uc1xuICAgIGlmIChzdGFjayAmJiBZID09PSBzdGFjay5maWVsZENoYW5uZWwpIHsgLy8geSBpcyBzdGFja2VkIG1lYXN1cmVcbiAgICAgIHAueSA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnc3RhcnQnIH0pXG4gICAgICB9O1xuICAgICAgcC55MiA9IHtcbiAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFksIHsgc3VmZml4OiAnZW5kJyB9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHlJc01lYXN1cmUpIHtcbiAgICAgIGlmIChvcmllbnQgIT09IE9yaWVudC5IT1JJWk9OVEFMKSB7IC8vIHZlcnRpY2FsIChleHBsaWNpdCAndmVydGljYWwnIG9yIHVuZGVmaW5lZClcbiAgICAgICAgaWYgKG1vZGVsLmhhcyhZKSkge1xuICAgICAgICAgIHAueSA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSlcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAueSA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwuaGFzKFkyKSkge1xuICAgICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkyKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1vZGVsLnNjYWxlKFkpLnR5cGUgPT09IFNjYWxlVHlwZS5MT0cpIHtcbiAgICAgICAgICAgIC8vIGVuZCBvbiBheGlzXG4gICAgICAgICAgICBwLnkyID0ge1xuICAgICAgICAgICAgICBmaWVsZDoge2dyb3VwOiAnaGVpZ2h0J31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZKVxuICAgICAgICB9O1xuICAgICAgICBwLmhlaWdodCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCwgWSkgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVsLmZpZWxkRGVmKFkpLmJpbikge1xuICAgICAgaWYgKG1vZGVsLmhhcyhTSVpFKSAmJiBvcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICAgIC8vIEZvciBob3Jpem9udGFsIGNoYXJ0IHRoYXQgaGFzIGJpbm5lZCBZIGFuZCBzaXplLFxuICAgICAgICAvLyBjZW50ZXIgYmFyIGFuZCBhcHBseSBzaXplIHRvIGhlaWdodC5cbiAgICAgICAgcC55YyA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC5oZWlnaHQgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2ltcGx5IHVzZSA8ZmllbGQ+X3N0YXJ0LCA8ZmllbGQ+X2VuZFxuICAgICAgICBwLnkgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShZKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWSwgeyBiaW5TdWZmaXg6ICdzdGFydCcgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ2VuZCcgfSksXG4gICAgICAgICAgb2Zmc2V0OiAxXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8geSBpcyBvcmRpbmFsIG9yIHVuc3BlY2lmaWVkXG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWSkpIHsgLy8gaXMgb3JkaW5hbFxuICAgICAgICBwLnljID0ge1xuICAgICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoWSksXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKFkpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgeyAvLyBObyBZXG4gICAgICAgIHAueTIgPSB7XG4gICAgICAgICAgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0sXG4gICAgICAgICAgb2Zmc2V0OiAtMVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBwLmhlaWdodCA9IG1vZGVsLmhhcyhTSVpFKSAgJiYgb3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCA/IHtcbiAgICAgICAgICAvLyBhcHBseSBzaXplIHNjYWxlIGlmIGhhcyBzaXplIGFuZCBpcyBob3Jpem9udGFsXG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShTSVpFKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoU0laRSlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICB2YWx1ZTogc2l6ZVZhbHVlKG1vZGVsLCBZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemVWYWx1ZShtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihTSVpFKTtcbiAgICBpZiAoZmllbGREZWYgJiYgZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgIHJldHVybiBmaWVsZERlZi52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrQ29uZmlnID0gbW9kZWwuY29uZmlnKCkubWFyaztcbiAgICBpZiAobWFya0NvbmZpZy5iYXJTaXplKSB7XG4gICAgICByZXR1cm4gbWFya0NvbmZpZy5iYXJTaXplO1xuICAgIH1cbiAgICAvLyBCQVIncyBzaXplIGlzIGFwcGxpZWQgb24gZWl0aGVyIFggb3IgWVxuICAgIHJldHVybiBtb2RlbC5pc09yZGluYWxTY2FsZShjaGFubmVsKSA/XG4gICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIG9yIHNpbmdsZSBiYXIsIHdlIGNhbiB1c2UgYmFuZFNpemUgLSAxXG4gICAgICAgIC8vICgtMSBzbyB0aGF0IHRoZSBib3JkZXIgb2YgdGhlIGJhciBmYWxscyBvbiBleGFjdCBwaXhlbClcbiAgICAgICAgbW9kZWwuc2NhbGUoY2hhbm5lbCkuYmFuZFNpemUgLSAxIDpcbiAgICAgICFtb2RlbC5oYXMoY2hhbm5lbCkgP1xuICAgICAgICBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSAtIDEgOlxuICAgICAgICAvLyBvdGhlcndpc2UsIHNldCB0byB0aGluQmFyV2lkdGggYnkgZGVmYXVsdFxuICAgICAgICBtYXJrQ29uZmlnLmJhclRoaW5TaXplO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjNjQpOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5LCBhcHBseU1hcmtDb25maWd9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgbGluZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ2xpbmUnO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWcoKTtcblxuICAgIHAueCA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnkgPSB5KG1vZGVsLmVuY29kaW5nKCkueSwgbW9kZWwuc2NhbGVOYW1lKFkpLCBjb25maWcpO1xuXG4gICAgY29uc3QgX3NpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgY29uZmlnKTtcbiAgICBpZiAoX3NpemUpIHsgcC5zdHJva2VXaWR0aCA9IF9zaXplOyB9XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgYXBwbHlNYXJrQ29uZmlnKHAsIG1vZGVsLCBbJ2ludGVycG9sYXRlJywgJ3RlbnNpb24nXSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogRmllbGREZWYsIGNvbmZpZzogQ29uZmlnKSB7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWV9O1xuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsubGluZVNpemUgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIENPTE9SLCBURVhULCBTSEFQRSwgUEFUSCwgT1JERVIsIE9QQUNJVFksIERFVEFJTCwgTEFCRUwsIFNUQUNLX0dST1VQX0NIQU5ORUxTfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtoYXN9IGZyb20gJy4uLy4uL2VuY29kaW5nJztcbmltcG9ydCB7T3JkZXJDaGFubmVsRGVmLCBGaWVsZERlZiwgZmllbGR9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7QVJFQSwgTElORSwgVEVYVCBhcyBURVhUTUFSS30gZnJvbSAnLi4vLi4vbWFyayc7XG5pbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtjb250YWlucywgZXh0ZW5kLCBpc0FycmF5fSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdTdGFja1RyYW5zZm9ybX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5pbXBvcnQge2FyZWF9IGZyb20gJy4vYXJlYSc7XG5pbXBvcnQge2Jhcn0gZnJvbSAnLi9iYXInO1xuaW1wb3J0IHtzb3J0RmllbGR9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge2xpbmV9IGZyb20gJy4vbGluZSc7XG5pbXBvcnQge3BvaW50LCBjaXJjbGUsIHNxdWFyZX0gZnJvbSAnLi9wb2ludCc7XG5pbXBvcnQge3J1bGV9IGZyb20gJy4vcnVsZSc7XG5pbXBvcnQge3RleHR9IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQge3RpY2t9IGZyb20gJy4vdGljayc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5cbmNvbnN0IG1hcmtDb21waWxlciA9IHtcbiAgYXJlYTogYXJlYSxcbiAgYmFyOiBiYXIsXG4gIGxpbmU6IGxpbmUsXG4gIHBvaW50OiBwb2ludCxcbiAgdGV4dDogdGV4dCxcbiAgdGljazogdGljayxcbiAgcnVsZTogcnVsZSxcbiAgY2lyY2xlOiBjaXJjbGUsXG4gIHNxdWFyZTogc3F1YXJlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXJrKG1vZGVsOiBVbml0TW9kZWwpOiBhbnlbXSB7XG4gIGlmIChjb250YWlucyhbTElORSwgQVJFQV0sIG1vZGVsLm1hcmsoKSkpIHtcbiAgICByZXR1cm4gcGFyc2VQYXRoTWFyayhtb2RlbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhcnNlTm9uUGF0aE1hcmsobW9kZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkgeyAvLyBUT0RPOiBleHRyYWN0IHRoaXMgaW50byBjb21waWxlUGF0aE1hcmtcbiAgY29uc3QgbWFyayA9IG1vZGVsLm1hcmsoKTtcbiAgLy8gVE9ETzogcmVwbGFjZSB0aGlzIHdpdGggbW9yZSBnZW5lcmFsIGNhc2UgZm9yIGNvbXBvc2l0aW9uXG4gIGNvbnN0IGlzRmFjZXRlZCA9IG1vZGVsLnBhcmVudCgpICYmIG1vZGVsLnBhcmVudCgpLmlzRmFjZXQoKTtcbiAgY29uc3QgZGF0YUZyb20gPSB7ZGF0YTogbW9kZWwuZGF0YVRhYmxlKCl9O1xuICBjb25zdCBkZXRhaWxzID0gZGV0YWlsRmllbGRzKG1vZGVsKTtcblxuICBsZXQgcGF0aE1hcmtzOiBhbnkgPSBbXG4gICAge1xuICAgICAgbmFtZTogbW9kZWwubmFtZSgnbWFya3MnKSxcbiAgICAgIHR5cGU6IG1hcmtDb21waWxlclttYXJrXS5tYXJrVHlwZSgpLFxuICAgICAgZnJvbTogZXh0ZW5kKFxuICAgICAgICAvLyBJZiBoYXMgZmFjZXQsIGBmcm9tLmRhdGFgIHdpbGwgYmUgYWRkZWQgaW4gdGhlIGNlbGwgZ3JvdXAuXG4gICAgICAgIC8vIElmIGhhcyBzdWJmYWNldCBmb3IgbGluZS9hcmVhIGdyb3VwLCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBvdXRlciBzdWJmYWNldCBncm91cCBiZWxvdy5cbiAgICAgICAgLy8gSWYgaGFzIG5vIHN1YmZhY2V0LCBhZGQgZnJvbS5kYXRhLlxuICAgICAgICBpc0ZhY2V0ZWQgfHwgZGV0YWlscy5sZW5ndGggPiAwID8ge30gOiBkYXRhRnJvbSxcblxuICAgICAgICAvLyBzb3J0IHRyYW5zZm9ybVxuICAgICAgICB7dHJhbnNmb3JtOiBbeyB0eXBlOiAnc29ydCcsIGJ5OiBzb3J0UGF0aEJ5KG1vZGVsKX1dfVxuICAgICAgKSxcbiAgICAgIHByb3BlcnRpZXM6IHsgdXBkYXRlOiBtYXJrQ29tcGlsZXJbbWFya10ucHJvcGVydGllcyhtb2RlbCkgfVxuICAgIH1cbiAgXTtcblxuICBpZiAoZGV0YWlscy5sZW5ndGggPiAwKSB7IC8vIGhhdmUgbGV2ZWwgb2YgZGV0YWlscyAtIG5lZWQgdG8gZmFjZXQgbGluZSBpbnRvIHN1Ymdyb3Vwc1xuICAgIGNvbnN0IGZhY2V0VHJhbnNmb3JtID0geyB0eXBlOiAnZmFjZXQnLCBncm91cGJ5OiBkZXRhaWxzIH07XG4gICAgY29uc3QgdHJhbnNmb3JtOiBhbnlbXSA9IG1hcmsgPT09IEFSRUEgJiYgbW9kZWwuc3RhY2soKSA/XG4gICAgICAvLyBGb3Igc3RhY2tlZCBhcmVhLCB3ZSBuZWVkIHRvIGltcHV0ZSBtaXNzaW5nIHR1cGxlcyBhbmQgc3RhY2sgdmFsdWVzXG4gICAgICAvLyAoTWFyayBsYXllciBvcmRlciBkb2VzIG5vdCBtYXR0ZXIgZm9yIHN0YWNrZWQgY2hhcnRzKVxuICAgICAgc3RhY2tUcmFuc2Zvcm1zKG1vZGVsLCB0cnVlKS5jb25jYXQoZmFjZXRUcmFuc2Zvcm0pIDpcbiAgICAgIC8vIEZvciBub24tc3RhY2tlZCBwYXRoIChsaW5lL2FyZWEpLCB3ZSBuZWVkIHRvIGZhY2V0IGFuZCBwb3NzaWJseSBzb3J0XG4gICAgICBbXS5jb25jYXQoXG4gICAgICAgIGZhY2V0VHJhbnNmb3JtLFxuICAgICAgICAvLyBpZiBtb2RlbCBoYXMgYG9yZGVyYCwgdGhlbiBzb3J0IG1hcmsncyBsYXllciBvcmRlciBieSBgb3JkZXJgIGZpZWxkKHMpXG4gICAgICAgIG1vZGVsLmhhcyhPUkRFUikgPyBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIDogW11cbiAgICAgICk7XG5cbiAgICByZXR1cm4gW3tcbiAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ3BhdGhncm91cCcpLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGFkZCBpdCBoZXJlLlxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2Zvcm19XG4gICAgICApLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICB3aWR0aDogeyBmaWVsZDogeyBncm91cDogJ3dpZHRoJyB9IH0sXG4gICAgICAgICAgaGVpZ2h0OiB7IGZpZWxkOiB7IGdyb3VwOiAnaGVpZ2h0JyB9IH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1hcmtzOiBwYXRoTWFya3NcbiAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGF0aE1hcmtzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uUGF0aE1hcmsobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBtYXJrID0gbW9kZWwubWFyaygpO1xuICBjb25zdCBpc0ZhY2V0ZWQgPSBtb2RlbC5wYXJlbnQoKSAmJiBtb2RlbC5wYXJlbnQoKS5pc0ZhY2V0KCk7XG4gIGNvbnN0IGRhdGFGcm9tID0ge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpfTtcblxuICBsZXQgbWFya3MgPSBbXTsgLy8gVE9ETzogdmdNYXJrc1xuICBpZiAobWFyayA9PT0gVEVYVE1BUksgJiZcbiAgICBtb2RlbC5oYXMoQ09MT1IpICYmXG4gICAgbW9kZWwuY29uZmlnKCkubWFyay5hcHBseUNvbG9yVG9CYWNrZ3JvdW5kICYmICFtb2RlbC5oYXMoWCkgJiYgIW1vZGVsLmhhcyhZKVxuICApIHtcbiAgICAvLyBhZGQgYmFja2dyb3VuZCB0byAndGV4dCcgbWFya3MgaWYgaGFzIGNvbG9yXG4gICAgbWFya3MucHVzaChleHRlbmQoXG4gICAgICB7XG4gICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2JhY2tncm91bmQnKSxcbiAgICAgICAgdHlwZTogJ3JlY3QnXG4gICAgICB9LFxuICAgICAgLy8gSWYgaGFzIGZhY2V0LCBgZnJvbS5kYXRhYCB3aWxsIGJlIGFkZGVkIGluIHRoZSBjZWxsIGdyb3VwLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgIGlzRmFjZXRlZCA/IHt9IDoge2Zyb206IGRhdGFGcm9tfSxcbiAgICAgIC8vIFByb3BlcnRpZXNcbiAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IHRleHQuYmFja2dyb3VuZChtb2RlbCkgfSB9XG4gICAgKSk7XG4gIH1cblxuICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICB7XG4gICAgICBuYW1lOiBtb2RlbC5uYW1lKCdtYXJrcycpLFxuICAgICAgdHlwZTogbWFya0NvbXBpbGVyW21hcmtdLm1hcmtUeXBlKClcbiAgICB9LFxuICAgIC8vIEFkZCBgZnJvbWAgaWYgbmVlZGVkXG4gICAgKCFpc0ZhY2V0ZWQgfHwgbW9kZWwuc3RhY2soKSB8fCBtb2RlbC5oYXMoT1JERVIpKSA/IHtcbiAgICAgIGZyb206IGV4dGVuZChcbiAgICAgICAgLy8gSWYgZmFjZXRlZCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZVxuICAgICAgICBpc0ZhY2V0ZWQgPyB7fSA6IGRhdGFGcm9tLFxuICAgICAgICAvLyBgZnJvbS50cmFuc2Zvcm1gXG4gICAgICAgIG1vZGVsLnN0YWNrKCkgPyAvLyBTdGFja2VkIENoYXJ0IG5lZWQgc3RhY2sgdHJhbnNmb3JtXG4gICAgICAgICAgeyB0cmFuc2Zvcm06IHN0YWNrVHJhbnNmb3Jtcyhtb2RlbCwgZmFsc2UpIH0gOlxuICAgICAgICBtb2RlbC5oYXMoT1JERVIpID9cbiAgICAgICAgICAvLyBpZiBub24tc3RhY2tlZCwgZGV0YWlsIGZpZWxkIGRldGVybWluZXMgdGhlIGxheWVyIG9yZGVyIG9mIGVhY2ggbWFya1xuICAgICAgICAgIHsgdHJhbnNmb3JtOiBbe3R5cGU6J3NvcnQnLCBieTogc29ydEJ5KG1vZGVsKX1dIH0gOlxuICAgICAgICAgIHt9XG4gICAgICApXG4gICAgfSA6IHt9LFxuICAgIC8vIHByb3BlcnRpZXMgZ3JvdXBzXG4gICAgeyBwcm9wZXJ0aWVzOiB7IHVwZGF0ZTogbWFya0NvbXBpbGVyW21hcmtdLnByb3BlcnRpZXMobW9kZWwpIH0gfVxuICApKTtcblxuICBpZiAobW9kZWwuaGFzKExBQkVMKSAmJiBtYXJrQ29tcGlsZXJbbWFya10ubGFiZWxzKSB7XG4gICAgY29uc3QgbGFiZWxQcm9wZXJ0aWVzID0gbWFya0NvbXBpbGVyW21hcmtdLmxhYmVscyhtb2RlbCk7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIGxhYmVsIG1ldGhvZCBmb3IgY3VycmVudCBtYXJrIHR5cGUuXG4gICAgaWYgKGxhYmVsUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7IC8vIElmIGxhYmVsIGlzIHN1cHBvcnRlZFxuICAgICAgLy8gYWRkIGxhYmVsIGdyb3VwXG4gICAgICBtYXJrcy5wdXNoKGV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IG1vZGVsLm5hbWUoJ2xhYmVsJyksXG4gICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIElmIGhhcyBmYWNldCwgYGZyb20uZGF0YWAgd2lsbCBiZSBhZGRlZCBpbiB0aGUgY2VsbCBncm91cC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgaXQgaGVyZS5cbiAgICAgICAgaXNGYWNldGVkID8ge30gOiB7ZnJvbTogZGF0YUZyb219LFxuICAgICAgICAvLyBQcm9wZXJ0aWVzXG4gICAgICAgIHsgcHJvcGVydGllczogeyB1cGRhdGU6IGxhYmVsUHJvcGVydGllcyB9IH1cbiAgICAgICkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXJrcztcbn1cblxuZnVuY3Rpb24gc29ydEJ5KG1vZGVsOiBVbml0TW9kZWwpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gIGlmIChtb2RlbC5oYXMoT1JERVIpKSB7XG4gICAgbGV0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLm9yZGVyO1xuICAgIGlmIChjaGFubmVsRGVmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vIHNvcnQgYnkgbXVsdGlwbGUgZmllbGRzXG4gICAgICByZXR1cm4gY2hhbm5lbERlZi5tYXAoc29ydEZpZWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc29ydCBieSBvbmUgZmllbGRcbiAgICAgIHJldHVybiBzb3J0RmllbGQoY2hhbm5lbERlZiBhcyBPcmRlckNoYW5uZWxEZWYpOyAvLyBoYXZlIHRvIGFkZCBPcmRlckNoYW5uZWxEZWYgdG8gbWFrZSB0c2lmeSBub3QgY29tcGxhaW5pbmdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7IC8vIHVzZSBkZWZhdWx0IG9yZGVyXG59XG5cbi8qKlxuICogUmV0dXJuIHBhdGggb3JkZXIgZm9yIHNvcnQgdHJhbnNmb3JtJ3MgYnkgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gc29ydFBhdGhCeShtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICBpZiAobW9kZWwubWFyaygpID09PSBMSU5FICYmIG1vZGVsLmhhcyhQQVRIKSkge1xuICAgIC8vIEZvciBvbmx5IGxpbmUsIHNvcnQgYnkgdGhlIHBhdGggZmllbGQgaWYgaXQgaXMgc3BlY2lmaWVkLlxuICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBtb2RlbC5lbmNvZGluZygpLnBhdGg7XG4gICAgaWYgKGNoYW5uZWxEZWYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gc29ydCBieSBtdWx0aXBsZSBmaWVsZHNcbiAgICAgIHJldHVybiBjaGFubmVsRGVmLm1hcChzb3J0RmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzb3J0IGJ5IG9uZSBmaWVsZFxuICAgICAgcmV0dXJuIHNvcnRGaWVsZChjaGFubmVsRGVmIGFzIE9yZGVyQ2hhbm5lbERlZik7IC8vIGhhdmUgdG8gYWRkIE9yZGVyQ2hhbm5lbERlZiB0byBtYWtlIHRzaWZ5IG5vdCBjb21wbGFpbmluZ1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgYm90aCBsaW5lIGFuZCBhcmVhLCB3ZSBzb3J0IHZhbHVlcyBiYXNlZCBvbiBkaW1lbnNpb24gYnkgZGVmYXVsdFxuICAgIHJldHVybiAnLScgKyBtb2RlbC5maWVsZChtb2RlbC5jb25maWcoKS5tYXJrLm9yaWVudCA9PT0gT3JpZW50LkhPUklaT05UQUwgPyBZIDogWCwge2JpblN1ZmZpeDogJ21pZCd9KTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgbGlzdCBvZiBkZXRhaWwgZmllbGRzIChmb3IgJ2NvbG9yJywgJ3NoYXBlJywgb3IgJ2RldGFpbCcgY2hhbm5lbHMpXG4gKiB0aGF0IHRoZSBtb2RlbCdzIHNwZWMgY29udGFpbnMuXG4gKi9cbmZ1bmN0aW9uIGRldGFpbEZpZWxkcyhtb2RlbDogVW5pdE1vZGVsKTogc3RyaW5nW10ge1xuICByZXR1cm4gW0NPTE9SLCBERVRBSUwsIE9QQUNJVFksIFNIQVBFXS5yZWR1Y2UoZnVuY3Rpb24oZGV0YWlscywgY2hhbm5lbCkge1xuICAgIGlmIChtb2RlbC5oYXMoY2hhbm5lbCkgJiYgIW1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpLmFnZ3JlZ2F0ZSkge1xuICAgICAgZGV0YWlscy5wdXNoKG1vZGVsLmZpZWxkKGNoYW5uZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH0sIFtdKTtcbn1cblxuXG5mdW5jdGlvbiBzdGFja1RyYW5zZm9ybXMobW9kZWw6IFVuaXRNb2RlbCwgaW1wdXRlOiBib29sZWFuKTogYW55W10ge1xuICBjb25zdCBzdGFja0J5RmllbGRzID0gZ2V0U3RhY2tCeUZpZWxkcyhtb2RlbCk7XG4gIGlmIChpbXB1dGUpIHtcbiAgICByZXR1cm4gW2ltcHV0ZVRyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyksIHN0YWNrVHJhbnNmb3JtKG1vZGVsLCBzdGFja0J5RmllbGRzKV07XG4gIH1cbiAgcmV0dXJuIFtzdGFja1RyYW5zZm9ybShtb2RlbCwgc3RhY2tCeUZpZWxkcyldO1xufVxuXG5cbi8qKiBDb21waWxlIHN0YWNrLWJ5IGZpZWxkIG5hbWVzIGZyb20gKGZyb20gJ2NvbG9yJyBhbmQgJ2RldGFpbCcpICovXG5mdW5jdGlvbiBnZXRTdGFja0J5RmllbGRzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3QgZW5jb2RpbmcgPSBtb2RlbC5lbmNvZGluZygpO1xuXG4gIHJldHVybiBTVEFDS19HUk9VUF9DSEFOTkVMUy5yZWR1Y2UoZnVuY3Rpb24oZmllbGRzLCBjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbEVuY29kaW5nID0gZW5jb2RpbmdbY2hhbm5lbF07XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykpIHtcbiAgICAgICAgY2hhbm5lbEVuY29kaW5nLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBmaWVsZHMucHVzaChmaWVsZChmaWVsZERlZikpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpZWxkRGVmOiBGaWVsZERlZiA9IGNoYW5uZWxFbmNvZGluZztcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgICAgICAgY29uc3QgX2ZpZWxkID0gZmllbGQoZmllbGREZWYsIHtcbiAgICAgICAgICBiaW5TdWZmaXg6IHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID8gJ3JhbmdlJyA6ICdzdGFydCdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghIV9maWVsZCkge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKF9maWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkcztcbiAgfSwgW10pO1xufVxuXG4vLyBpbXB1dGUgZGF0YSBmb3Igc3RhY2tlZCBhcmVhXG5mdW5jdGlvbiBpbXB1dGVUcmFuc2Zvcm0obW9kZWw6IFVuaXRNb2RlbCwgc3RhY2tGaWVsZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN0YWNrID0gbW9kZWwuc3RhY2soKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnaW1wdXRlJyxcbiAgICBmaWVsZDogbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKSxcbiAgICBncm91cGJ5OiBzdGFja0ZpZWxkcyxcbiAgICBvcmRlcmJ5OiBbbW9kZWwuZmllbGQoc3RhY2suZ3JvdXBieUNoYW5uZWwsIHtiaW5TdWZmaXg6ICdtaWQnfSldLFxuICAgIG1ldGhvZDogJ3ZhbHVlJyxcbiAgICB2YWx1ZTogMFxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGFja1RyYW5zZm9ybShtb2RlbDogVW5pdE1vZGVsLCBzdGFja0ZpZWxkczogc3RyaW5nW10pIHtcbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBjb25zdCBlbmNvZGluZyA9IG1vZGVsLmVuY29kaW5nKCk7XG4gIGNvbnN0IHNvcnRieSA9IG1vZGVsLmhhcyhPUkRFUikgP1xuICAgIChpc0FycmF5KGVuY29kaW5nW09SREVSXSkgPyBlbmNvZGluZ1tPUkRFUl0gOiBbZW5jb2RpbmdbT1JERVJdXSkubWFwKHNvcnRGaWVsZCkgOlxuICAgIC8vIGRlZmF1bHQgPSBkZXNjZW5kaW5nIGJ5IHN0YWNrRmllbGRzXG4gICAgc3RhY2tGaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgIHJldHVybiAnLScgKyBmaWVsZDtcbiAgICB9KTtcblxuICBjb25zdCB2YWxOYW1lID0gbW9kZWwuZmllbGQoc3RhY2suZmllbGRDaGFubmVsKTtcblxuICAvLyBhZGQgc3RhY2sgdHJhbnNmb3JtIHRvIG1hcmtcbiAgbGV0IHRyYW5zZm9ybTogVmdTdGFja1RyYW5zZm9ybSA9IHtcbiAgICB0eXBlOiAnc3RhY2snLFxuICAgIGdyb3VwYnk6IFttb2RlbC5maWVsZChzdGFjay5ncm91cGJ5Q2hhbm5lbCwge2JpblN1ZmZpeDogJ21pZCd9KSB8fCAndW5kZWZpbmVkJ10sXG4gICAgZmllbGQ6IG1vZGVsLmZpZWxkKHN0YWNrLmZpZWxkQ2hhbm5lbCksXG4gICAgc29ydGJ5OiBzb3J0YnksXG4gICAgb3V0cHV0OiB7XG4gICAgICBzdGFydDogdmFsTmFtZSArICdfc3RhcnQnLFxuICAgICAgZW5kOiB2YWxOYW1lICsgJ19lbmQnXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGFjay5vZmZzZXQpIHtcbiAgICB0cmFuc2Zvcm0ub2Zmc2V0ID0gc3RhY2sub2Zmc2V0O1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm07XG59XG4iLCJpbXBvcnQge1gsIFksIFNIQVBFLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtDaGFubmVsRGVmV2l0aExlZ2VuZCwgRmllbGREZWYsIGZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBwb2ludCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsLCBmaXhlZFNoYXBlPzogc3RyaW5nKSB7XG4gICAgLy8gVE9ETyBVc2UgVmVnYSdzIG1hcmtzIHByb3BlcnRpZXMgaW50ZXJmYWNlXG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnKTtcblxuICAgIHAueSA9IHkobW9kZWwuZW5jb2RpbmcoKS55LCBtb2RlbC5zY2FsZU5hbWUoWSksIGNvbmZpZyk7XG5cbiAgICBwLnNpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBtb2RlbC5zY2FsZShTSVpFKSwgY29uZmlnKTtcblxuICAgIHAuc2hhcGUgPSBzaGFwZShtb2RlbC5lbmNvZGluZygpLnNoYXBlLCBtb2RlbC5zY2FsZU5hbWUoU0hBUEUpLCBtb2RlbC5zY2FsZShTSEFQRSksIGNvbmZpZywgZml4ZWRTaGFwZSk7XG5cbiAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KGZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogZmllbGREZWYudmFsdWUgKGZvciBsYXllcmluZylcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBmaWVsZERlZi52YWx1ZSAoZm9yIGxheWVyaW5nKVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbHVlOiBjb25maWcubWFyay5zaXplIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaGFwZShmaWVsZERlZjogQ2hhbm5lbERlZldpdGhMZWdlbmQsIHNjYWxlTmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIGNvbmZpZzogQ29uZmlnLCBmaXhlZFNoYXBlPzogc3RyaW5nKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8gc2hhcGVcbiAgICBpZiAoZml4ZWRTaGFwZSkgeyAvLyBzcXVhcmUgYW5kIGNpcmNsZSBtYXJrc1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGZpeGVkU2hhcGUgfTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwge3NjYWxlVHlwZTogc2NhbGUudHlwZX0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBmaWVsZERlZi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsuc2hhcGUgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIGNpcmNsZSB7XG4gIGV4cG9ydCBmdW5jdGlvbiBtYXJrVHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHBvaW50LnByb3BlcnRpZXMobW9kZWwsICdjaXJjbGUnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYWJlbHMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8oIzI0MCk6IGZpbGwgdGhpcyBtZXRob2RcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc3F1YXJlIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICByZXR1cm4gcG9pbnQucHJvcGVydGllcyhtb2RlbCwgJ3NxdWFyZScpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgLy8gVE9ETygjMjQwKTogZmlsbCB0aGlzIG1ldGhvZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7WCwgWSwgWDIsIFkyLCBTSVpFfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi8uLi9jb25maWcnO1xuXG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2FwcGx5Q29sb3JBbmRPcGFjaXR5fSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIHJ1bGUge1xuICBleHBvcnQgZnVuY3Rpb24gbWFya1R5cGUoKSB7XG4gICAgcmV0dXJuICdydWxlJztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0aWVzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICBsZXQgcDogYW55ID0ge307XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGV4cGxpY2l0IHZhbHVlXG4gICAgaWYobW9kZWwuY29uZmlnKCkubWFyay5vcmllbnQgPT09IE9yaWVudC5WRVJUSUNBTCkge1xuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7IHZhbHVlIDogMCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueSA9IHsgZmllbGQ6IHsgZ3JvdXA6ICdoZWlnaHQnIH0gfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhZMikpIHtcbiAgICAgICAgcC55MiA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZMiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnkyID0geyB2YWx1ZTogMCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICAgIHAueSA9IHtcbiAgICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKFkpLFxuICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChZLCB7IGJpblN1ZmZpeDogJ21pZCcgfSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHAueSA9IHsgdmFsdWU6IDAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLmhhcyhYKSkge1xuICAgICAgICBwLnggPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWCwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwLnggPSB7IHZhbHVlOiAwIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlbC5oYXMoWDIpKSB7XG4gICAgICAgIHAueDIgPSB7XG4gICAgICAgICAgc2NhbGU6IG1vZGVsLnNjYWxlTmFtZShYKSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoWDIsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcC54MiA9IHsgZmllbGQ6IHsgZ3JvdXA6ICd3aWR0aCcgfSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZJWE1FOiB0aGlzIGZ1bmN0aW9uIHdvdWxkIG92ZXJ3cml0ZSBzdHJva2VXaWR0aCBidXQgc2hvdWxkbid0XG4gICAgYXBwbHlDb2xvckFuZE9wYWNpdHkocCwgbW9kZWwpO1xuXG4gICAgLy8gc2l6ZVxuICAgIGlmIChtb2RlbC5oYXMoU0laRSkpIHtcbiAgICAgIHAuc3Ryb2tlV2lkdGggPSB7XG4gICAgICAgIHNjYWxlOiBtb2RlbC5zY2FsZU5hbWUoU0laRSksXG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChTSVpFKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5zdHJva2VXaWR0aCA9IHsgdmFsdWU6IHNpemVWYWx1ZShtb2RlbCkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplVmFsdWUobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoU0laRSk7XG4gICAgaWYgKGZpZWxkRGVmICYmIGZpZWxkRGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICByZXR1cm4gZmllbGREZWYudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLm1hcmsucnVsZVNpemU7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtYLCBZLCBDT0xPUiwgVEVYVCwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge2FwcGx5TWFya0NvbmZpZywgYXBwbHlDb2xvckFuZE9wYWNpdHksIG51bWJlckZvcm1hdCwgdGltZVRlbXBsYXRlfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtRVUFOVElUQVRJVkUsIE9SRElOQUwsIFRFTVBPUkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7VmdWYWx1ZVJlZn0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuXG5cbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSB0ZXh0IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAndGV4dCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZChtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHk6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHdpZHRoOiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0gfSxcbiAgICAgIGhlaWdodDogeyBmaWVsZDogeyBncm91cDogJ2hlaWdodCcgfSB9LFxuICAgICAgZmlsbDoge1xuICAgICAgICBzY2FsZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCBtb2RlbC5maWVsZERlZihDT0xPUikudHlwZSA9PT0gT1JESU5BTCA/IHtwcmVmaXg6ICdyYW5rJ30gOiB7fSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnRpZXMobW9kZWw6IFVuaXRNb2RlbCkge1xuICAgIC8vIFRPRE8gVXNlIFZlZ2EncyBtYXJrcyBwcm9wZXJ0aWVzIGludGVyZmFjZVxuICAgIGxldCBwOiBhbnkgPSB7fTtcblxuICAgIGFwcGx5TWFya0NvbmZpZyhwLCBtb2RlbCxcbiAgICAgIFsnYW5nbGUnLCAnYWxpZ24nLCAnYmFzZWxpbmUnLCAnZHgnLCAnZHknLCAnZm9udCcsICdmb250V2VpZ2h0JyxcbiAgICAgICAgJ2ZvbnRTdHlsZScsICdyYWRpdXMnLCAndGhldGEnLCAndGV4dCddKTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuICAgIGNvbnN0IHRleHRGaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKFRFWFQpO1xuXG4gICAgcC54ID0geChtb2RlbC5lbmNvZGluZygpLngsIG1vZGVsLnNjYWxlTmFtZShYKSwgY29uZmlnLCB0ZXh0RmllbGREZWYpO1xuXG4gICAgcC55ID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgY29uZmlnKTtcblxuICAgIHAuZm9udFNpemUgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBjb25maWcpO1xuXG4gICAgcC50ZXh0ID0gdGV4dChtb2RlbC5lbmNvZGluZygpLnRleHQsIG1vZGVsLnNjYWxlTmFtZShURVhUKSwgY29uZmlnKTtcblxuICAgIGlmIChtb2RlbC5jb25maWcoKS5tYXJrLmFwcGx5Q29sb3JUb0JhY2tncm91bmQgJiYgIW1vZGVsLmhhcyhYKSAmJiAhbW9kZWwuaGFzKFkpKSB7XG4gICAgICBwLmZpbGwgPSB7dmFsdWU6ICdibGFjayd9OyAvLyBUT0RPOiBhZGQgcnVsZXMgZm9yIHN3YXBwaW5nIGJldHdlZW4gYmxhY2sgYW5kIHdoaXRlXG4gICAgICAvLyBvcGFjaXR5XG4gICAgICBjb25zdCBvcGFjaXR5ID0gbW9kZWwuY29uZmlnKCkubWFyay5vcGFjaXR5O1xuICAgICAgaWYgKG9wYWNpdHkpIHsgcC5vcGFjaXR5ID0geyB2YWx1ZTogb3BhY2l0eSB9OyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBseUNvbG9yQW5kT3BhY2l0eShwLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiB4KHhGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZywgdGV4dEZpZWxkRGVmOkZpZWxkRGVmKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geFxuICAgIGlmICh4RmllbGREZWYpIHtcbiAgICAgIGlmICh4RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh4RmllbGREZWYsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPOiBzdXBwb3J0IHgudmFsdWUsIHguZGF0dW1cbiAgICBpZiAodGV4dEZpZWxkRGVmICYmIHRleHRGaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICAgIHJldHVybiB7IGZpZWxkOiB7IGdyb3VwOiAnd2lkdGgnIH0sIG9mZnNldDogLTUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS50ZXh0QmFuZFdpZHRoIC8gMiB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHkoeUZpZWxkRGVmOiBGaWVsZERlZiwgc2NhbGVOYW1lOiBzdHJpbmcsIGNvbmZpZzogQ29uZmlnKTogVmdWYWx1ZVJlZiB7XG4gICAgLy8geVxuICAgIGlmICh5RmllbGREZWYpIHtcbiAgICAgIGlmICh5RmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZCh5RmllbGREZWYsIHsgYmluU3VmZml4OiAnbWlkJyB9KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPIGNvbnNpZGVyIGlmIHRoaXMgc2hvdWxkIHN1cHBvcnQgZ3JvdXA6IGhlaWdodCBjYXNlIHRvby5cbiAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLnNjYWxlLmJhbmRTaXplIC8gMiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2l6ZShzaXplRmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyBzaXplXG4gICAgaWYgKHNpemVGaWVsZERlZikge1xuICAgICAgaWYgKHNpemVGaWVsZERlZi5maWVsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNjYWxlOiBzY2FsZU5hbWUsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkKHNpemVGaWVsZERlZilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChzaXplRmllbGREZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogc2l6ZUZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5tYXJrLmZvbnRTaXplIH07XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0KHRleHRGaWVsZERlZjogRmllbGREZWYsIHNjYWxlTmFtZTogc3RyaW5nLCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICAgIC8vIHRleHRcbiAgICBpZiAodGV4dEZpZWxkRGVmKSB7XG4gICAgICBpZiAodGV4dEZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIGlmIChRVUFOVElUQVRJVkUgPT09IHRleHRGaWVsZERlZi50eXBlKSB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0ID0gbnVtYmVyRm9ybWF0KHRleHRGaWVsZERlZiwgY29uZmlnLm1hcmsuZm9ybWF0LCBjb25maWcpO1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyID0gJ251bWJlcicgKyAoIGZvcm1hdCA/ICc6XFwnJyArIGZvcm1hdCArICdcXCcnIDogJycpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3t7JyArIGZpZWxkKHRleHRGaWVsZERlZiwgeyBkYXR1bTogdHJ1ZSB9KSArICcgfCAnICsgZmlsdGVyICsgJ319J1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoVEVNUE9SQUwgPT09IHRleHRGaWVsZERlZi50eXBlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB0aW1lVGVtcGxhdGUoZmllbGQodGV4dEZpZWxkRGVmLCB7ZGF0dW06IHRydWV9KSwgdGV4dEZpZWxkRGVmLnRpbWVVbml0LCBjb25maWcubWFyay5mb3JtYXQsIGNvbmZpZy5tYXJrLnNob3J0VGltZUxhYmVscywgY29uZmlnKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgZmllbGQ6IHRleHRGaWVsZERlZi5maWVsZCB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRleHRGaWVsZERlZi52YWx1ZSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogdGV4dEZpZWxkRGVmLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7dmFsdWU6IGNvbmZpZy5tYXJrLnRleHR9O1xuICB9XG59XG4iLCJpbXBvcnQge1gsIFksIFNJWkV9IGZyb20gJy4uLy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtPcmllbnR9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBmaWVsZH0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHthcHBseUNvbG9yQW5kT3BhY2l0eX0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSB0aWNrIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIG1hcmtUeXBlKCkge1xuICAgIHJldHVybiAncmVjdCc7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvcGVydGllcyhtb2RlbDogVW5pdE1vZGVsKSB7XG4gICAgbGV0IHA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsLmNvbmZpZygpO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBleHBsaWNpdCB2YWx1ZVxuXG4gICAgcC54YyA9IHgobW9kZWwuZW5jb2RpbmcoKS54LCBtb2RlbC5zY2FsZU5hbWUoWCksIGNvbmZpZyk7XG5cbiAgICBwLnljID0geShtb2RlbC5lbmNvZGluZygpLnksIG1vZGVsLnNjYWxlTmFtZShZKSwgY29uZmlnKTtcblxuICAgIGlmIChjb25maWcubWFyay5vcmllbnQgPT09IE9yaWVudC5IT1JJWk9OVEFMKSB7XG4gICAgICBwLndpZHRoID0gc2l6ZShtb2RlbC5lbmNvZGluZygpLnNpemUsIG1vZGVsLnNjYWxlTmFtZShTSVpFKSwgY29uZmlnLCAobW9kZWwuc2NhbGUoWCkgfHwge30pLmJhbmRTaXplKTtcbiAgICAgIHAuaGVpZ2h0ID0geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwLndpZHRoID0geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1RoaWNrbmVzcyB9O1xuICAgICAgcC5oZWlnaHQgPSBzaXplKG1vZGVsLmVuY29kaW5nKCkuc2l6ZSwgbW9kZWwuc2NhbGVOYW1lKFNJWkUpLCBjb25maWcsIChtb2RlbC5zY2FsZShZKSB8fCB7fSkuYmFuZFNpemUpO1xuICAgIH1cblxuICAgIGFwcGx5Q29sb3JBbmRPcGFjaXR5KHAsIG1vZGVsKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHgoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB4XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHkoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcpOiBWZ1ZhbHVlUmVmIHtcbiAgICAvLyB5XG4gICAgaWYgKGZpZWxkRGVmKSB7XG4gICAgICBpZiAoZmllbGREZWYuZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY2FsZTogc2NhbGVOYW1lLFxuICAgICAgICAgIGZpZWxkOiBmaWVsZChmaWVsZERlZiwgeyBiaW5TdWZmaXg6ICdtaWQnIH0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkRGVmLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGZpZWxkRGVmLnZhbHVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbmZpZy5zY2FsZS5iYW5kU2l6ZSAvIDIgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpemUoZmllbGREZWY6IEZpZWxkRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgY29uZmlnOiBDb25maWcsIHNjYWxlQmFuZFNpemU6IG51bWJlcik6IFZnVmFsdWVSZWYge1xuICAgIGlmIChmaWVsZERlZikge1xuICAgICAgaWYgKGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2NhbGU6IHNjYWxlTmFtZSxcbiAgICAgICAgICBmaWVsZDogZmllbGREZWYuZmllbGRcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogZmllbGREZWYudmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmZpZy5tYXJrLnRpY2tTaXplKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogY29uZmlnLm1hcmsudGlja1NpemUgfTtcbiAgICB9XG4gICAgY29uc3QgYmFuZFNpemUgPSBzY2FsZUJhbmRTaXplICE9PSB1bmRlZmluZWQgP1xuICAgICAgc2NhbGVCYW5kU2l6ZSA6XG4gICAgICBjb25maWcuc2NhbGUuYmFuZFNpemU7XG4gICAgcmV0dXJuIHsgdmFsdWU6IGJhbmRTaXplIC8gMS41IH07XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGFiZWxzKG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgICAvLyBUT0RPKCMyNDApOiBmaWxsIHRoaXMgbWV0aG9kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBeGlzfSBmcm9tICcuLi9heGlzJztcbmltcG9ydCB7Q2hhbm5lbCwgWCwgQ09MVU1OfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnLCBDZWxsQ29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhLCBEYXRhVGFibGV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtjaGFubmVsTWFwcGluZ1JlZHVjZSwgY2hhbm5lbE1hcHBpbmdGb3JFYWNofSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuLi9zY2FsZSc7XG5pbXBvcnQge1NvcnRGaWVsZCwgU29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7QmFzZVNwZWN9IGZyb20gJy4uL3NwZWMnO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4uL3RyYW5zZm9ybSc7XG5pbXBvcnQge2V4dGVuZCwgZmxhdHRlbiwgdmFscywgd2FybmluZywgRGljdH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1ZnRGF0YSwgVmdNYXJrR3JvdXAsIFZnU2NhbGUsIFZnQXhpcywgVmdMZWdlbmR9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtEYXRhQ29tcG9uZW50fSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge0xheW91dENvbXBvbmVudH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHtTY2FsZUNvbXBvbmVudHN9IGZyb20gJy4vc2NhbGUnO1xuXG4vKipcbiAqIENvbXBvc2FibGUgQ29tcG9uZW50cyB0aGF0IGFyZSBpbnRlcm1lZGlhdGUgcmVzdWx0cyBvZiB0aGUgcGFyc2luZyBwaGFzZSBvZiB0aGVcbiAqIGNvbXBpbGF0aW9ucy4gIFRoZXNlIGNvbXBvc2FibGUgY29tcG9uZW50cyB3aWxsIGJlIGFzc2VtYmxlZCBpbiB0aGUgbGFzdFxuICogY29tcGlsYXRpb24gc3RlcC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnQge1xuICBkYXRhOiBEYXRhQ29tcG9uZW50O1xuICBsYXlvdXQ6IExheW91dENvbXBvbmVudDtcbiAgc2NhbGU6IERpY3Q8U2NhbGVDb21wb25lbnRzPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gVmdBeGlzIGRlZmluaXRpb24gKi9cbiAgLy8gVE9ETzogaWYgd2UgYWxsb3cgbXVsdGlwbGUgYXhlcyAoZS5nLiwgZHVhbCBheGlzKSwgdGhpcyB3aWxsIGJlY29tZSBWZ0F4aXNbXVxuICBheGlzOiBEaWN0PFZnQXhpcz47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIFZnTGVnZW5kIGRlZmluaXRpb24gKi9cbiAgbGVnZW5kOiBEaWN0PFZnTGVnZW5kPjtcblxuICAvKiogRGljdGlvbmFyeSBtYXBwaW5nIGNoYW5uZWwgdG8gYXhpcyBtYXJrIGdyb3VwIGZvciBmYWNldCBhbmQgY29uY2F0ICovXG4gIGF4aXNHcm91cDogRGljdDxWZ01hcmtHcm91cD47XG5cbiAgLyoqIERpY3Rpb25hcnkgbWFwcGluZyBjaGFubmVsIHRvIGdyaWQgbWFyayBncm91cCBmb3IgZmFjZXQgKGFuZCBjb25jYXQ/KSAqL1xuICBncmlkR3JvdXA6IERpY3Q8VmdNYXJrR3JvdXBbXT47XG5cbiAgbWFyazogVmdNYXJrR3JvdXBbXTtcbn1cblxuY2xhc3MgTmFtZU1hcCB7XG4gIHByaXZhdGUgX25hbWVNYXA6IERpY3Q8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9uYW1lTWFwID0ge30gYXMgRGljdDxzdHJpbmc+O1xuICB9XG5cbiAgcHVibGljIHJlbmFtZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWVNYXBbb2xkTmFtZV0gPSBuZXdOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIElmIHRoZSBuYW1lIGFwcGVhcnMgaW4gdGhlIF9uYW1lTWFwLCB3ZSBuZWVkIHRvIHJlYWQgaXRzIG5ldyBuYW1lLlxuICAgIC8vIFdlIGhhdmUgdG8gbG9vcCBvdmVyIHRoZSBkaWN0IGp1c3QgaW4gY2FzZSwgdGhlIG5ldyBuYW1lIGFsc28gZ2V0cyByZW5hbWVkLlxuICAgIHdoaWxlICh0aGlzLl9uYW1lTWFwW25hbWVdKSB7XG4gICAgICBuYW1lID0gdGhpcy5fbmFtZU1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xuICBwcm90ZWN0ZWQgX3BhcmVudDogTW9kZWw7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2Rlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIF9kYXRhOiBEYXRhO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3IgZGF0YSBzb3VyY2VzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX2RhdGFOYW1lTWFwOiBOYW1lTWFwO1xuXG4gIC8qKiBOYW1lIG1hcCBmb3Igc2NhbGVzLCB3aGljaCBjYW4gYmUgcmVuYW1lZCBieSBhIG1vZGVsJ3MgcGFyZW50LiAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlTmFtZU1hcDogTmFtZU1hcDtcblxuICAvKiogTmFtZSBtYXAgZm9yIHNpemUsIHdoaWNoIGNhbiBiZSByZW5hbWVkIGJ5IGEgbW9kZWwncyBwYXJlbnQuICovXG4gIHByb3RlY3RlZCBfc2l6ZU5hbWVNYXA6IE5hbWVNYXA7XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm06IFRyYW5zZm9ybTtcbiAgcHJvdGVjdGVkIF9zY2FsZTogRGljdDxTY2FsZT47XG5cbiAgcHJvdGVjdGVkIF9heGlzOiBEaWN0PEF4aXM+O1xuXG4gIHByb3RlY3RlZCBfbGVnZW5kOiBEaWN0PExlZ2VuZD47XG5cbiAgcHJvdGVjdGVkIF9jb25maWc6IENvbmZpZztcblxuICBwcm90ZWN0ZWQgX3dhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBCYXNlU3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAvLyBJZiBuYW1lIGlzIG5vdCBwcm92aWRlZCwgYWx3YXlzIHVzZSBwYXJlbnQncyBnaXZlbk5hbWUgdG8gYXZvaWQgbmFtZSBjb25mbGljdHMuXG4gICAgdGhpcy5fbmFtZSA9IHNwZWMubmFtZSB8fCBwYXJlbnRHaXZlbk5hbWU7XG5cbiAgICAvLyBTaGFyZWQgbmFtZSBtYXBzXG4gICAgdGhpcy5fZGF0YU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX2RhdGFOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcbiAgICB0aGlzLl9zY2FsZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NjYWxlTmFtZU1hcCA6IG5ldyBOYW1lTWFwKCk7XG4gICAgdGhpcy5fc2l6ZU5hbWVNYXAgPSBwYXJlbnQgPyBwYXJlbnQuX3NpemVOYW1lTWFwIDogbmV3IE5hbWVNYXAoKTtcblxuICAgIHRoaXMuX2RhdGEgPSBzcGVjLmRhdGE7XG5cbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHNwZWMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5fdHJhbnNmb3JtID0gc3BlYy50cmFuc2Zvcm07XG5cbiAgICB0aGlzLmNvbXBvbmVudCA9IHtkYXRhOiBudWxsLCBsYXlvdXQ6IG51bGwsIG1hcms6IG51bGwsIHNjYWxlOiBudWxsLCBheGlzOiBudWxsLCBheGlzR3JvdXA6IG51bGwsIGdyaWRHcm91cDogbnVsbCwgbGVnZW5kOiBudWxsfTtcbiAgfVxuXG5cbiAgcHVibGljIHBhcnNlKCkge1xuICAgIHRoaXMucGFyc2VEYXRhKCk7XG4gICAgdGhpcy5wYXJzZVNlbGVjdGlvbkRhdGEoKTtcbiAgICB0aGlzLnBhcnNlTGF5b3V0RGF0YSgpO1xuICAgIHRoaXMucGFyc2VTY2FsZSgpOyAvLyBkZXBlbmRzIG9uIGRhdGEgbmFtZVxuICAgIHRoaXMucGFyc2VBeGlzKCk7IC8vIGRlcGVuZHMgb24gc2NhbGUgbmFtZVxuICAgIHRoaXMucGFyc2VMZWdlbmQoKTsgLy8gZGVwZW5kcyBvbiBzY2FsZSBuYW1lXG4gICAgdGhpcy5wYXJzZUF4aXNHcm91cCgpOyAvLyBkZXBlbmRzIG9uIGNoaWxkIGF4aXNcbiAgICB0aGlzLnBhcnNlR3JpZEdyb3VwKCk7XG4gICAgdGhpcy5wYXJzZU1hcmsoKTsgLy8gZGVwZW5kcyBvbiBkYXRhIG5hbWUgYW5kIHNjYWxlIG5hbWUsIGF4aXNHcm91cCwgZ3JpZEdyb3VwIGFuZCBjaGlsZHJlbidzIHNjYWxlLCBheGlzLCBsZWdlbmQgYW5kIG1hcmsuXG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VEYXRhKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlU2VsZWN0aW9uRGF0YSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUxheW91dERhdGEoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VTY2FsZSgpO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZU1hcmsoKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgcGFyc2VBeGlzKCk7XG5cbiAgcHVibGljIGFic3RyYWN0IHBhcnNlTGVnZW5kKCk7XG5cbiAgLy8gVE9ETzogcmV2aXNlIGlmIHRoZXNlIHR3byBtZXRob2RzIG1ha2Ugc2Vuc2UgZm9yIHNoYXJlZCBzY2FsZSBjb25jYXRcbiAgcHVibGljIGFic3RyYWN0IHBhcnNlQXhpc0dyb3VwKCk7XG4gIHB1YmxpYyBhYnN0cmFjdCBwYXJzZUdyaWRHcm91cCgpO1xuXG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlRGF0YShkYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdO1xuXG4gIC8vIFRPRE86IGZvciBBcnZpbmQgdG8gd3JpdGVcbiAgLy8gcHVibGljIGFic3RyYWN0IGFzc2VtYmxlU2VsZWN0aW9uU2lnbmFsKGxheW91dERhdGE6IFZnRGF0YVtdKTogVmdEYXRhW107XG4gIC8vIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVNlbGVjdGlvbkRhdGEobGF5b3V0RGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXTtcblxuICBwdWJsaWMgYXNzZW1ibGVTY2FsZXMoKTogVmdTY2FsZVtdIHtcbiAgICAvLyBGSVhNRTogd3JpdGUgYXNzZW1ibGVTY2FsZXMoKSBpbiBzY2FsZS50cyB0aGF0XG4gICAgLy8gaGVscCBhc3NlbWJsZSBzY2FsZSBkb21haW5zIHdpdGggc2NhbGUgc2lnbmF0dXJlIGFzIHdlbGxcbiAgICByZXR1cm4gZmxhdHRlbih2YWxzKHRoaXMuY29tcG9uZW50LnNjYWxlKS5tYXAoKHNjYWxlczogU2NhbGVDb21wb25lbnRzKSA9PiB7XG4gICAgICBsZXQgYXJyID0gW3NjYWxlcy5tYWluXTtcbiAgICAgIGlmIChzY2FsZXMuY29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChzY2FsZXMuYmluQ29sb3JMZWdlbmQpIHtcbiAgICAgICAgYXJyLnB1c2goc2NhbGVzLmJpbkNvbG9yTGVnZW5kKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSkpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzc2VtYmxlTWFya3MoKTogYW55W107IC8vIFRPRE86IFZnTWFya0dyb3VwW11cblxuICBwdWJsaWMgYXNzZW1ibGVBeGVzKCk6IFZnQXhpc1tdIHtcbiAgICByZXR1cm4gdmFscyh0aGlzLmNvbXBvbmVudC5heGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxlZ2VuZHMoKTogYW55W10geyAvLyBUT0RPOiBWZ0xlZ2VuZFtdXG4gICAgcmV0dXJuIHZhbHModGhpcy5jb21wb25lbnQubGVnZW5kKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUdyb3VwKCkge1xuICAgIGxldCBncm91cDogVmdNYXJrR3JvdXAgPSB7fTtcblxuICAgIC8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHdhbnQgc2NhbGVzIHRvIGNvbWUgYmVmb3JlIG1hcmtzIGluIHRoZSBvdXRwdXQgc3BlYy5cblxuICAgIGdyb3VwLm1hcmtzID0gdGhpcy5hc3NlbWJsZU1hcmtzKCk7XG4gICAgY29uc3Qgc2NhbGVzID0gdGhpcy5hc3NlbWJsZVNjYWxlcygpO1xuICAgIGlmIChzY2FsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZ3JvdXAuc2NhbGVzID0gc2NhbGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGF4ZXMgPSB0aGlzLmFzc2VtYmxlQXhlcygpO1xuICAgIGlmIChheGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmF4ZXMgPSBheGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2VuZHMgPSB0aGlzLmFzc2VtYmxlTGVnZW5kcygpO1xuICAgIGlmIChsZWdlbmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdyb3VwLmxlZ2VuZHMgPSBsZWdlbmRzO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKTtcblxuICBwdWJsaWMgYWJzdHJhY3QgY2hhbm5lbHMoKTogQ2hhbm5lbFtdO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBtYXBwaW5nKCk7XG5cbiAgcHVibGljIHJlZHVjZShmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LCBpbml0LCB0PzogYW55KSB7XG4gICAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nUmVkdWNlKHRoaXMuY2hhbm5lbHMoKSwgdGhpcy5tYXBwaW5nKCksIGYsIGluaXQsIHQpO1xuICB9XG5cbiAgcHVibGljIGZvckVhY2goZjogKGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCwgaTpudW1iZXIpID0+IHZvaWQsIHQ/OiBhbnkpIHtcbiAgICBjaGFubmVsTWFwcGluZ0ZvckVhY2godGhpcy5jaGFubmVscygpLCB0aGlzLm1hcHBpbmcoKSwgZiwgdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgaGFzKGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuO1xuXG4gIHB1YmxpYyBwYXJlbnQoKTogTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgbmFtZSh0ZXh0OiBzdHJpbmcsIGRlbGltaXRlcjogc3RyaW5nID0gJ18nKSB7XG4gICAgcmV0dXJuICh0aGlzLl9uYW1lID8gdGhpcy5fbmFtZSArIGRlbGltaXRlciA6ICcnKSArIHRleHQ7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgcHVibGljIGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lRGF0YShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgICB0aGlzLl9kYXRhTmFtZU1hcC5yZW5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkYXRhIHNvdXJjZSBuYW1lIGZvciB0aGUgZ2l2ZW4gZGF0YSBzb3VyY2UgdHlwZS5cbiAgICpcbiAgICogRm9yIHVuaXQgc3BlYywgdGhpcyBpcyBhbHdheXMgc2ltcGx5IHRoZSBzcGVjLm5hbWUgKyAnLScgKyBkYXRhU291cmNlVHlwZS5cbiAgICogV2UgYWxyZWFkeSB1c2UgdGhlIG5hbWUgbWFwIHNvIHRoYXQgbWFya3MgYW5kIHNjYWxlcyB1c2UgdGhlIGNvcnJlY3QgZGF0YS5cbiAgICovXG4gIHB1YmxpYyBkYXRhTmFtZShkYXRhU291cmNlVHlwZTogRGF0YVRhYmxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YU5hbWVNYXAuZ2V0KHRoaXMubmFtZShTdHJpbmcoZGF0YVNvdXJjZVR5cGUpKSk7XG4gIH1cblxuICBwdWJsaWMgcmVuYW1lU2l6ZShvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NpemVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFubmVsU2l6ZU5hbWUoY2hhbm5lbDogQ2hhbm5lbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZU5hbWUoY2hhbm5lbCA9PT0gWCB8fCBjaGFubmVsID09PSBDT0xVTU4gPyAnd2lkdGgnIDogJ2hlaWdodCcpO1xuICB9XG5cbiAgcHVibGljIHNpemVOYW1lKHNpemU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgIHJldHVybiB0aGlzLl9zaXplTmFtZU1hcC5nZXQodGhpcy5uYW1lKHNpemUsICdfJykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGRhdGFUYWJsZSgpOiBzdHJpbmc7XG5cbiAgcHVibGljIHRyYW5zZm9ybSgpOiBUcmFuc2Zvcm0ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm0gfHwge307XG4gIH1cblxuICAvKiogR2V0IFwiZmllbGRcIiByZWZlcmVuY2UgZm9yIHZlZ2EgKi9cbiAgcHVibGljIGZpZWxkKGNoYW5uZWw6IENoYW5uZWwsIG9wdDogRmllbGRSZWZPcHRpb24gPSB7fSkge1xuICAgIGNvbnN0IGZpZWxkRGVmID0gdGhpcy5maWVsZERlZihjaGFubmVsKTtcblxuICAgIGlmIChmaWVsZERlZi5iaW4pIHsgLy8gYmluIGhhcyBkZWZhdWx0IHN1ZmZpeCB0aGF0IGRlcGVuZHMgb24gc2NhbGVUeXBlXG4gICAgICBvcHQgPSBleHRlbmQoe1xuICAgICAgICBiaW5TdWZmaXg6IHRoaXMuc2NhbGUoY2hhbm5lbCkudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgPyAncmFuZ2UnIDogJ3N0YXJ0J1xuICAgICAgfSwgb3B0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGQoZmllbGREZWYsIG9wdCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgZmllbGREZWYoY2hhbm5lbDogQ2hhbm5lbCk6IEZpZWxkRGVmO1xuXG4gIHB1YmxpYyBzY2FsZShjaGFubmVsOiBDaGFubmVsKTogU2NhbGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZVtjaGFubmVsXTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbmFtZSB0byBoYXNPcmRpbmFsU2NhbGVcbiAgcHVibGljIGlzT3JkaW5hbFNjYWxlKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2NhbGUoY2hhbm5lbCk7XG4gICAgcmV0dXJuIHNjYWxlICYmIHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMO1xuICB9XG5cbiAgcHVibGljIHJlbmFtZVNjYWxlKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2NhbGVOYW1lTWFwLnJlbmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgfVxuXG4gIC8qKiByZXR1cm5zIHNjYWxlIG5hbWUgZm9yIGEgZ2l2ZW4gY2hhbm5lbCAqL1xuICBwdWJsaWMgc2NhbGVOYW1lKGNoYW5uZWw6IENoYW5uZWx8c3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGVOYW1lTWFwLmdldCh0aGlzLm5hbWUoY2hhbm5lbCArICcnKSk7XG4gIH1cblxuICBwdWJsaWMgc29ydChjaGFubmVsOiBDaGFubmVsKTogU29ydEZpZWxkIHwgU29ydE9yZGVyIHtcbiAgICByZXR1cm4gKHRoaXMubWFwcGluZygpW2NoYW5uZWxdIHx8IHt9KS5zb3J0O1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHN0YWNrKCk7XG5cbiAgcHVibGljIGF4aXMoY2hhbm5lbDogQ2hhbm5lbCk6IEF4aXMge1xuICAgIHJldHVybiB0aGlzLl9heGlzW2NoYW5uZWxdO1xuICB9XG5cbiAgcHVibGljIGxlZ2VuZChjaGFubmVsOiBDaGFubmVsKTogTGVnZW5kIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnZW5kW2NoYW5uZWxdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3BlYyBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHVibGljIGNvbmZpZygpOiBDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwdWJsaWMgYWRkV2FybmluZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB3YXJuaW5nKG1lc3NhZ2UpO1xuICAgIHRoaXMuX3dhcm5pbmdzLnB1c2gobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgd2FybmluZ3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl93YXJuaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBlIGNoZWNrc1xuICAgKi9cbiAgcHVibGljIGlzVW5pdCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHVibGljIGlzRmFjZXQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHB1YmxpYyBpc0xheWVyKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL2RvYy9zcGVjLm1kIzExLWFtYmllbnQtZGVjbGFyYXRpb25zXG5kZWNsYXJlIHZhciBleHBvcnRzO1xuXG5pbXBvcnQge1NIQVJFRF9ET01BSU5fT1BTfSBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtDT0xVTU4sIFJPVywgWCwgWSwgWDIsIFkyLCBTSEFQRSwgU0laRSwgQ09MT1IsIE9QQUNJVFksIFRFWFQsIGhhc1NjYWxlLCBDaGFubmVsfSBmcm9tICcuLi9jaGFubmVsJztcbmltcG9ydCB7T3JpZW50fSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHtTT1VSQ0UsIFNUQUNLRURfU0NBTEV9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHtGaWVsZERlZiwgZmllbGQsIGlzTWVhc3VyZX0gZnJvbSAnLi4vZmllbGRkZWYnO1xuaW1wb3J0IHtNYXJrLCBCQVIsIFRFWFQgYXMgVEVYVE1BUkssIFJVTEUsIFRJQ0t9IGZyb20gJy4uL21hcmsnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlLCBOaWNlVGltZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtpc1NvcnRGaWVsZCwgU29ydE9yZGVyfSBmcm9tICcuLi9zb3J0JztcbmltcG9ydCB7U3RhY2tPZmZzZXR9IGZyb20gJy4uL3N0YWNrJztcbmltcG9ydCB7Tk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2NvbnRhaW5zLCBleHRlbmQsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ1NjYWxlfSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5cbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtkZWZhdWx0U2NhbGVUeXBlLCByYXdEb21haW4sIHNtYWxsZXN0VW5pdH0gZnJvbSAnLi4vdGltZXVuaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4vdW5pdCc7XG5cbi8qKlxuICogQ29sb3IgUmFtcCdzIHNjYWxlIGZvciBsZWdlbmRzLiAgVGhpcyBzY2FsZSBoYXMgdG8gYmUgb3JkaW5hbCBzbyB0aGF0IGl0c1xuICogbGVnZW5kcyBzaG93IGEgbGlzdCBvZiBudW1iZXJzLlxuICovXG5leHBvcnQgY29uc3QgQ09MT1JfTEVHRU5EID0gJ2NvbG9yX2xlZ2VuZCc7XG5cbi8vIHNjYWxlIHVzZWQgdG8gZ2V0IGxhYmVscyBmb3IgYmlubmVkIGNvbG9yIHNjYWxlc1xuZXhwb3J0IGNvbnN0IENPTE9SX0xFR0VORF9MQUJFTCA9ICdjb2xvcl9sZWdlbmRfbGFiZWwnO1xuXG5cbi8vIEZJWE1FOiBXaXRoIGxheWVyIGFuZCBjb25jYXQsIHNjYWxlQ29tcG9uZW50IHNob3VsZCBkZWNvbXBvc2UgYmV0d2VlblxuLy8gU2NhbGVTaWduYXR1cmUgYW5kIFNjYWxlRG9tYWluW10uXG4vLyBCYXNpY2FsbHksIGlmIHR3byB1bml0IHNwZWNzIGhhcyB0aGUgc2FtZSBzY2FsZSwgc2lnbmF0dXJlIGZvciBhIHBhcnRpY3VsYXIgY2hhbm5lbCxcbi8vIHRoZSBzY2FsZSBjYW4gYmUgdW5pb25lZCBieSBjb21iaW5pbmcgdGhlIGRvbWFpbi5cbmV4cG9ydCB0eXBlIFNjYWxlQ29tcG9uZW50ID0gVmdTY2FsZTtcblxuZXhwb3J0IHR5cGUgU2NhbGVDb21wb25lbnRzID0ge1xuICBtYWluOiBTY2FsZUNvbXBvbmVudDtcbiAgY29sb3JMZWdlbmQ/OiBTY2FsZUNvbXBvbmVudCxcbiAgYmluQ29sb3JMZWdlbmQ/OiBTY2FsZUNvbXBvbmVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTY2FsZUNvbXBvbmVudChtb2RlbDogTW9kZWwpOiBEaWN0PFNjYWxlQ29tcG9uZW50cz4ge1xuICAvLyBUT0RPOiBzaG91bGQgbW9kZWwuY2hhbm5lbHMoKSBpbmxjdWRlIFgyL1kyP1xuICByZXR1cm4gbW9kZWwuY2hhbm5lbHMoKS5yZWR1Y2UoZnVuY3Rpb24oc2NhbGU6IERpY3Q8U2NhbGVDb21wb25lbnRzPiwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICAgICAgaWYgKG1vZGVsLnNjYWxlKGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG4gICAgICAgIGNvbnN0IHNjYWxlczogU2NhbGVDb21wb25lbnRzID0ge1xuICAgICAgICAgIG1haW46IHBhcnNlTWFpblNjYWxlKG1vZGVsLCBmaWVsZERlZiwgY2hhbm5lbClcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCBzY2FsZXMgbmVlZGVkIHRvIHN1cHBvcnQgb3JkaW5hbCBsZWdlbmRzIChsaXN0IG9mIHZhbHVlcylcbiAgICAgICAgLy8gZm9yIGNvbG9yIHJhbXAuXG4gICAgICAgIGlmIChjaGFubmVsID09PSBDT0xPUiAmJiBtb2RlbC5sZWdlbmQoQ09MT1IpICYmIChmaWVsZERlZi50eXBlID09PSBPUkRJTkFMIHx8IGZpZWxkRGVmLmJpbiB8fCBmaWVsZERlZi50aW1lVW5pdCkpIHtcbiAgICAgICAgICBzY2FsZXMuY29sb3JMZWdlbmQgPSBwYXJzZUNvbG9yTGVnZW5kU2NhbGUobW9kZWwsIGZpZWxkRGVmKTtcbiAgICAgICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgICAgICBzY2FsZXMuYmluQ29sb3JMZWdlbmQgPSBwYXJzZUJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWwsIGZpZWxkRGVmKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzY2FsZVtjaGFubmVsXSA9IHNjYWxlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9LCB7fSBhcyBEaWN0PFNjYWxlQ29tcG9uZW50cz4pO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWFpbiBzY2FsZSBmb3IgZWFjaCBjaGFubmVsLiAgKE9ubHkgY29sb3IgY2FuIGhhdmUgbXVsdGlwbGUgc2NhbGVzLilcbiAqL1xuZnVuY3Rpb24gcGFyc2VNYWluU2NhbGUobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3Qgc2NhbGUgPSBtb2RlbC5zY2FsZShjaGFubmVsKTtcbiAgY29uc3Qgc29ydCA9IG1vZGVsLnNvcnQoY2hhbm5lbCk7XG4gIGxldCBzY2FsZURlZjogYW55ID0ge1xuICAgIG5hbWU6IG1vZGVsLnNjYWxlTmFtZShjaGFubmVsKSxcbiAgICB0eXBlOiBzY2FsZS50eXBlLFxuICB9O1xuXG4gIC8vIElmIGNoYW5uZWwgaXMgZWl0aGVyIFggb3IgWSB0aGVuIHVuaW9uIHRoZW0gd2l0aCBYMiAmIFkyIGlmIHRoZXkgZXhpc3RcbiAgaWYgKGNoYW5uZWwgPT09IFggJiYgbW9kZWwuaGFzKFgyKSkge1xuICAgIGlmIChtb2RlbC5oYXMoWCkpIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IHsgZmllbGRzOiBbZG9tYWluKHNjYWxlLCBtb2RlbCwgWCksIGRvbWFpbihzY2FsZSwgbW9kZWwsIFgyKV0gfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NhbGVEZWYuZG9tYWluID0gZG9tYWluKHNjYWxlLCBtb2RlbCwgWDIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjaGFubmVsID09PSBZICYmIG1vZGVsLmhhcyhZMikpIHtcbiAgICBpZiAobW9kZWwuaGFzKFkpKSB7XG4gICAgICBzY2FsZURlZi5kb21haW4gPSB7IGZpZWxkczogW2RvbWFpbihzY2FsZSwgbW9kZWwsIFkpLCBkb21haW4oc2NhbGUsIG1vZGVsLCBZMildIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlRGVmLmRvbWFpbiA9IGRvbWFpbihzY2FsZSwgbW9kZWwsIFkyKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2NhbGVEZWYuZG9tYWluID0gZG9tYWluKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCk7XG4gIH1cblxuICBleHRlbmQoc2NhbGVEZWYsIHJhbmdlTWl4aW5zKHNjYWxlLCBtb2RlbCwgY2hhbm5lbCkpO1xuICBpZiAoc29ydCAmJiAoaXNTb3J0RmllbGQoc29ydCkgPyBzb3J0Lm9yZGVyIDogc29ydCkgPT09IFNvcnRPcmRlci5ERVNDRU5ESU5HKSB7XG4gICAgc2NhbGVEZWYucmV2ZXJzZSA9IHRydWU7XG4gIH1cblxuICAvLyBBZGQgb3B0aW9uYWwgcHJvcGVydGllc1xuICBbXG4gICAgLy8gZ2VuZXJhbCBwcm9wZXJ0aWVzXG4gICAgJ3JvdW5kJyxcbiAgICAvLyBxdWFudGl0YXRpdmUgLyB0aW1lXG4gICAgJ2NsYW1wJywgJ25pY2UnLFxuICAgIC8vIHF1YW50aXRhdGl2ZVxuICAgICdleHBvbmVudCcsICd6ZXJvJyxcbiAgICAvLyBvcmRpbmFsXG4gICAgJ3BhZGRpbmcnLCAncG9pbnRzJ1xuICBdLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV4cG9ydHNbcHJvcGVydHldKHNjYWxlLCBjaGFubmVsLCBmaWVsZERlZiwgbW9kZWwpO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2FsZURlZltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzY2FsZURlZjtcbn1cblxuLyoqXG4gKiAgUmV0dXJuIGEgc2NhbGUgIGZvciBwcm9kdWNpbmcgb3JkaW5hbCBzY2FsZSBmb3IgbGVnZW5kcy5cbiAqICAtIEZvciBhbiBvcmRpbmFsIGZpZWxkLCBwcm92aWRlIGFuIG9yZGluYWwgc2NhbGUgdGhhdCBtYXBzIHJhbmsgdmFsdWVzIHRvIGZpZWxkIHZhbHVlXG4gKiAgLSBGb3IgYSBmaWVsZCB3aXRoIGJpbiBvciB0aW1lVW5pdCwgcHJvdmlkZSBhbiBpZGVudGl0eSBvcmRpbmFsIHNjYWxlXG4gKiAgICAobWFwcGluZyB0aGUgZmllbGQgdmFsdWVzIHRvIHRoZW1zZWx2ZXMpXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ29sb3JMZWdlbmRTY2FsZShtb2RlbDogTW9kZWwsIGZpZWxkRGVmOiBGaWVsZERlZik6IFNjYWxlQ29tcG9uZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtb2RlbC5zY2FsZU5hbWUoQ09MT1JfTEVHRU5EKSxcbiAgICB0eXBlOiBTY2FsZVR5cGUuT1JESU5BTCxcbiAgICBkb21haW46IHtcbiAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgLy8gdXNlIHJhbmtfPGZpZWxkPiBmb3Igb3JkaW5hbCB0eXBlLCBmb3IgYmluIGFuZCB0aW1lVW5pdCB1c2UgZGVmYXVsdCBmaWVsZFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCAoZmllbGREZWYuYmluIHx8IGZpZWxkRGVmLnRpbWVVbml0KSA/IHt9IDoge3ByZWZpeDogJ3JhbmsnfSksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge2RhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLCBmaWVsZDogbW9kZWwuZmllbGQoQ09MT1IpLCBzb3J0OiB0cnVlfVxuICB9O1xufVxuXG4vKipcbiAqICBSZXR1cm4gYW4gYWRkaXRpb25hbCBzY2FsZSBmb3IgYmluIGxhYmVscyBiZWNhdXNlIHdlIG5lZWQgdG8gbWFwIGJpbl9zdGFydCB0byBiaW5fcmFuZ2UgaW4gbGVnZW5kc1xuICovXG5mdW5jdGlvbiBwYXJzZUJpbkNvbG9yTGVnZW5kTGFiZWwobW9kZWw6IE1vZGVsLCBmaWVsZERlZjogRmllbGREZWYpOiBTY2FsZUNvbXBvbmVudCB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbW9kZWwuc2NhbGVOYW1lKENPTE9SX0xFR0VORF9MQUJFTCksXG4gICAgdHlwZTogU2NhbGVUeXBlLk9SRElOQUwsXG4gICAgZG9tYWluOiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChDT0xPUiksXG4gICAgICBzb3J0OiB0cnVlXG4gICAgfSxcbiAgICByYW5nZToge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogZmllbGQoZmllbGREZWYsIHtiaW5TdWZmaXg6ICdyYW5nZSd9KSxcbiAgICAgIHNvcnQ6IHtcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKENPTE9SLCB7IGJpblN1ZmZpeDogJ3N0YXJ0JyB9KSxcbiAgICAgICAgb3A6ICdtaW4nIC8vIG1pbiBvciBtYXggZG9lc24ndCBtYXR0ZXIgc2luY2Ugc2FtZSBfcmFuZ2Ugd291bGQgaGF2ZSB0aGUgc2FtZSBfc3RhcnRcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZVR5cGUoc2NhbGU6IFNjYWxlLCBmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwsIG1hcms6IE1hcmspOiBTY2FsZVR5cGUge1xuICBpZiAoIWhhc1NjYWxlKGNoYW5uZWwpKSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gc2NhbGUgZm9yIHRoZXNlIGNoYW5uZWxzXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgbGluZWFyL3RpbWUgZm9yIHJvdywgY29sdW1uIG9yIHNoYXBlXG4gIGlmIChjb250YWlucyhbUk9XLCBDT0xVTU4sIFNIQVBFXSwgY2hhbm5lbCkpIHtcbiAgICBpZiAoc2NhbGUgJiYgc2NhbGUudHlwZSAhPT0gdW5kZWZpbmVkICYmIHNjYWxlLnR5cGUgIT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgICAvLyBUT0RPOiBjb25zb2xpZGF0ZSB3YXJuaW5nXG4gICAgICBjb25zb2xlLndhcm4oJ0NoYW5uZWwnLCBjaGFubmVsLCAnZG9lcyBub3Qgd29yayB3aXRoIHNjYWxlIHR5cGUgPScsIHNjYWxlLnR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cblxuICBpZiAoc2NhbGUudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnR5cGU7XG4gIH1cblxuICBzd2l0Y2ggKGZpZWxkRGVmLnR5cGUpIHtcbiAgICBjYXNlIE5PTUlOQUw6XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gICAgY2FzZSBPUkRJTkFMOlxuICAgICAgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAgIHJldHVybiBTY2FsZVR5cGUuTElORUFSOyAvLyB0aW1lIGhhcyBvcmRlciwgc28gdXNlIGludGVycG9sYXRlZCBvcmRpbmFsIGNvbG9yIHNjYWxlLlxuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5PUkRJTkFMO1xuICAgIGNhc2UgVEVNUE9SQUw6XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gQ09MT1IpIHtcbiAgICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FOyAvLyB0aW1lIGhhcyBvcmRlciwgc28gdXNlIGludGVycG9sYXRlZCBvcmRpbmFsIGNvbG9yIHNjYWxlLlxuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRTY2FsZVR5cGUoZmllbGREZWYudGltZVVuaXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFNjYWxlVHlwZS5USU1FO1xuXG4gICAgY2FzZSBRVUFOVElUQVRJVkU6XG4gICAgICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgICAgIHJldHVybiBjb250YWlucyhbWCwgWSwgQ09MT1JdLCBjaGFubmVsKSA/IFNjYWxlVHlwZS5MSU5FQVIgOiBTY2FsZVR5cGUuT1JESU5BTDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTY2FsZVR5cGUuTElORUFSO1xuICB9XG5cbiAgLy8gc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXNcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21haW4oc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6Q2hhbm5lbCk6IGFueSB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgaWYgKHNjYWxlLmRvbWFpbikgeyAvLyBleHBsaWNpdCB2YWx1ZVxuICAgIHJldHVybiBzY2FsZS5kb21haW47XG4gIH1cblxuICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRlbXBvcmFsIHNjYWxlXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCkge1xuICAgIGlmIChyYXdEb21haW4oZmllbGREZWYudGltZVVuaXQsIGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBmaWVsZERlZi50aW1lVW5pdCxcbiAgICAgICAgZmllbGQ6ICdkYXRlJ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCksXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGZpZWxkOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgICAgb3A6ICdtaW4nXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEZvciBzdGFjaywgdXNlIFNUQUNLRUQgZGF0YS5cbiAgY29uc3Qgc3RhY2sgPSBtb2RlbC5zdGFjaygpO1xuICBpZiAoc3RhY2sgJiYgY2hhbm5lbCA9PT0gc3RhY2suZmllbGRDaGFubmVsKSB7XG4gICAgaWYoc3RhY2sub2Zmc2V0ID09PSBTdGFja09mZnNldC5OT1JNQUxJWkUpIHtcbiAgICAgIHJldHVybiBbMCwgMV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhTmFtZShTVEFDS0VEX1NDQUxFKSxcbiAgICAgIC8vIFNUQUNLRURfU0NBTEUgcHJvZHVjZXMgc3VtIG9mIHRoZSBmaWVsZCdzIHZhbHVlIGUuZy4sIHN1bSBvZiBzdW0sIHN1bSBvZiBkaXN0aW5jdFxuICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHtwcmVmaXg6ICdzdW0nfSlcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgdXNlUmF3RG9tYWluID0gX3VzZVJhd0RvbWFpbihzY2FsZSwgbW9kZWwsIGNoYW5uZWwpLFxuICBzb3J0ID0gZG9tYWluU29ydChtb2RlbCwgY2hhbm5lbCwgc2NhbGUudHlwZSk7XG5cbiAgaWYgKHVzZVJhd0RvbWFpbikgeyAvLyB1c2VSYXdEb21haW4gLSBvbmx5IFEvVFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBTT1VSQ0UsXG4gICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwge25vQWdncmVnYXRlOiB0cnVlfSlcbiAgICB9O1xuICB9IGVsc2UgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW5cbiAgICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwpIHtcbiAgICAgIC8vIG9yZGluYWwgYmluIHNjYWxlIHRha2VzIGRvbWFpbiBmcm9tIGJpbl9yYW5nZSwgb3JkZXJlZCBieSBiaW5fc3RhcnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdyYW5nZScgfSksXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICBmaWVsZDogbW9kZWwuZmllbGQoY2hhbm5lbCwgeyBiaW5TdWZmaXg6ICdzdGFydCcgfSksXG4gICAgICAgICAgb3A6ICdtaW4nIC8vIG1pbiBvciBtYXggZG9lc24ndCBtYXR0ZXIgc2luY2Ugc2FtZSBfcmFuZ2Ugd291bGQgaGF2ZSB0aGUgc2FtZSBfc3RhcnRcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09IENPTE9SKSB7XG4gICAgICAvLyBDdXJyZW50bHksIGJpbm5lZCBvbiBjb2xvciB1c2VzIGxpbmVhciBzY2FsZSBhbmQgdGh1cyB1c2UgX3N0YXJ0IHBvaW50XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgICAgZmllbGQ6IG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnc3RhcnQnIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlciBsaW5lYXIgYmluIHNjYWxlIG1lcmdlcyBib3RoIGJpbl9zdGFydCBhbmQgYmluX2VuZCBmb3Igbm9uLW9yZGluYWwgc2NhbGVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IG1vZGVsLmRhdGFUYWJsZSgpLFxuICAgICAgICBmaWVsZDogW1xuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnc3RhcnQnIH0pLFxuICAgICAgICAgIG1vZGVsLmZpZWxkKGNoYW5uZWwsIHsgYmluU3VmZml4OiAnZW5kJyB9KVxuICAgICAgICBdXG4gICAgICB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChzb3J0KSB7IC8vIGhhdmUgc29ydCAtLSBvbmx5IGZvciBvcmRpbmFsXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIElmIHNvcnQgYnkgYWdncmVnYXRpb24gb2YgYSBzcGVjaWZpZWQgc29ydCBmaWVsZCwgd2UgbmVlZCB0byB1c2UgU09VUkNFIHRhYmxlLFxuICAgICAgLy8gc28gd2UgY2FuIGFnZ3JlZ2F0ZSB2YWx1ZXMgZm9yIHRoZSBzY2FsZSBpbmRlcGVuZGVudGx5IGZyb20gdGhlIG1haW4gYWdncmVnYXRpb24uXG4gICAgICBkYXRhOiBzb3J0Lm9wID8gU09VUkNFIDogbW9kZWwuZGF0YVRhYmxlKCksXG4gICAgICBmaWVsZDogKGZpZWxkRGVmLnR5cGUgPT09IE9SRElOQUwgJiYgY2hhbm5lbCA9PT0gQ09MT1IpID8gbW9kZWwuZmllbGQoY2hhbm5lbCwge3ByZWZpeDogJ3JhbmsnfSkgOiBtb2RlbC5maWVsZChjaGFubmVsKSxcbiAgICAgIHNvcnQ6IHNvcnRcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBtb2RlbC5kYXRhVGFibGUoKSxcbiAgICAgIGZpZWxkOiAoZmllbGREZWYudHlwZSA9PT0gT1JESU5BTCAmJiBjaGFubmVsID09PSBDT0xPUikgPyBtb2RlbC5maWVsZChjaGFubmVsLCB7cHJlZml4OiAncmFuayd9KSA6IG1vZGVsLmZpZWxkKGNoYW5uZWwpLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbWFpblNvcnQobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsLCBzY2FsZVR5cGU6IFNjYWxlVHlwZSk6IGFueSB7XG4gIGlmIChzY2FsZVR5cGUgIT09IFNjYWxlVHlwZS5PUkRJTkFMKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHNvcnQgPSBtb2RlbC5zb3J0KGNoYW5uZWwpO1xuXG4gIC8vIFNvcnRlZCBiYXNlZCBvbiBhbiBhZ2dyZWdhdGUgY2FsY3VsYXRpb24gb3ZlciBhIHNwZWNpZmllZCBzb3J0IGZpZWxkIChvbmx5IGZvciBvcmRpbmFsIHNjYWxlKVxuICBpZiAoaXNTb3J0RmllbGQoc29ydCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3A6IHNvcnQub3AsXG4gICAgICBmaWVsZDogc29ydC5maWVsZFxuICAgIH07XG4gIH1cblxuICBpZiAoY29udGFpbnMoW1NvcnRPcmRlci5BU0NFTkRJTkcsIFNvcnRPcmRlci5ERVNDRU5ESU5HLCB1bmRlZmluZWQgLyogZGVmYXVsdCA9YXNjZW5kaW5nKi9dLCBzb3J0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gc29ydCA9PT0gJ25vbmUnXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdXNlUmF3RG9tYWluIHNob3VsZCBiZSBhY3RpdmF0ZWQgZm9yIHRoaXMgc2NhbGUuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0b25zIGFwcGxpZXM6XG4gKiAxLiBgdXNlUmF3RG9tYWluYCBpcyBlbmFibGVkIGVpdGhlciB0aHJvdWdoIHNjYWxlIG9yIGNvbmZpZ1xuICogMi4gQWdncmVnYXRpb24gZnVuY3Rpb24gaXMgbm90IGBjb3VudGAgb3IgYHN1bWBcbiAqIDMuIFRoZSBzY2FsZSBpcyBxdWFudGl0YXRpdmUgb3IgdGltZSBzY2FsZS5cbiAqL1xuZnVuY3Rpb24gX3VzZVJhd0RvbWFpbiAoc2NhbGU6IFNjYWxlLCBtb2RlbDogTW9kZWwsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcblxuICByZXR1cm4gc2NhbGUudXNlUmF3RG9tYWluICYmIC8vICBpZiB1c2VSYXdEb21haW4gaXMgZW5hYmxlZFxuICAgIC8vIG9ubHkgYXBwbGllZCB0byBhZ2dyZWdhdGUgdGFibGVcbiAgICBmaWVsZERlZi5hZ2dyZWdhdGUgJiZcbiAgICAvLyBvbmx5IGFjdGl2YXRlZCBpZiB1c2VkIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2VzIHZhbHVlcyByYW5naW5nIGluIHRoZSBkb21haW4gb2YgdGhlIHNvdXJjZSBkYXRhXG4gICAgU0hBUkVEX0RPTUFJTl9PUFMuaW5kZXhPZihmaWVsZERlZi5hZ2dyZWdhdGUpID49IDAgJiZcbiAgICAoXG4gICAgICAvLyBRIGFsd2F5cyB1c2VzIHF1YW50aXRhdGl2ZSBzY2FsZSBleGNlcHQgd2hlbiBpdCdzIGJpbm5lZC5cbiAgICAgIC8vIEJpbm5lZCBmaWVsZCBoYXMgc2ltaWxhciB2YWx1ZXMgaW4gYm90aCB0aGUgc291cmNlIHRhYmxlIGFuZCB0aGUgc3VtbWFyeSB0YWJsZVxuICAgICAgLy8gYnV0IHRoZSBzdW1tYXJ5IHRhYmxlIGhhcyBmZXdlciB2YWx1ZXMsIHRoZXJlZm9yZSBiaW5uZWQgZmllbGRzIGRyYXdcbiAgICAgIC8vIGRvbWFpbiB2YWx1ZXMgZnJvbSB0aGUgc3VtbWFyeSB0YWJsZS5cbiAgICAgIChmaWVsZERlZi50eXBlID09PSBRVUFOVElUQVRJVkUgJiYgIWZpZWxkRGVmLmJpbikgfHxcbiAgICAgIC8vIFQgdXNlcyBub24tb3JkaW5hbCBzY2FsZSB3aGVuIHRoZXJlJ3Mgbm8gdW5pdCBvciB3aGVuIHRoZSB1bml0IGlzIG5vdCBvcmRpbmFsLlxuICAgICAgKGZpZWxkRGVmLnR5cGUgPT09IFRFTVBPUkFMICYmIGNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKVxuICAgICk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlTWl4aW5zKHNjYWxlOiBTY2FsZSwgbW9kZWw6IE1vZGVsLCBjaGFubmVsOiBDaGFubmVsKTogYW55IHtcbiAgLy8gVE9ETzogbmVlZCB0byBhZGQgcnVsZSBmb3IgcXVhbnRpbGUsIHF1YW50aXplLCB0aHJlc2hvbGQgc2NhbGVcblxuICBjb25zdCBmaWVsZERlZiA9IG1vZGVsLmZpZWxkRGVmKGNoYW5uZWwpO1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGlmIChzY2FsZS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCAmJiBzY2FsZS5iYW5kU2l6ZSAmJiBjb250YWlucyhbWCwgWV0sIGNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIHtiYW5kU2l6ZTogc2NhbGUuYmFuZFNpemV9O1xuICB9XG5cbiAgaWYgKHNjYWxlLnJhbmdlICYmICFjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU5dLCBjaGFubmVsKSkge1xuICAgIC8vIGV4cGxpY2l0IHZhbHVlIChEbyBub3QgYWxsb3cgZXhwbGljaXQgdmFsdWVzIGZvciBYLCBZLCBST1csIENPTFVNTilcbiAgICByZXR1cm4ge3JhbmdlOiBzY2FsZS5yYW5nZX07XG4gIH1cbiAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgY2FzZSBST1c6XG4gICAgICByZXR1cm4ge3JhbmdlOiAnaGVpZ2h0J307XG4gICAgY2FzZSBDT0xVTU46XG4gICAgICByZXR1cm4ge3JhbmdlOiAnd2lkdGgnfTtcbiAgfVxuXG4gIC8vIElmIG5vdCBST1cgLyBDT0xVTU4sIHdlIGNhbiBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgdW5pdCBzcGVjLlxuICBjb25zdCB1bml0TW9kZWwgPSBtb2RlbCBhcyBVbml0TW9kZWw7XG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgWDpcbiAgICAgIC8vIHdlIGNhbid0IHVzZSB7cmFuZ2U6IFwid2lkdGhcIn0gaGVyZSBzaW5jZSB3ZSBwdXQgc2NhbGUgaW4gdGhlIHJvb3QgZ3JvdXBcbiAgICAgIC8vIG5vdCBpbnNpZGUgdGhlIGNlbGwsIHNvIHNjYWxlIGlzIHJldXNhYmxlIGZvciBheGVzIGdyb3VwXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJhbmdlTWluOiAwLFxuICAgICAgICByYW5nZU1heDogdW5pdE1vZGVsLmNvbmZpZygpLmNlbGwud2lkdGggLy8gRml4ZWQgY2VsbCB3aWR0aCBmb3Igbm9uLW9yZGluYWxcbiAgICAgIH07XG4gICAgY2FzZSBZOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2VNaW46IHVuaXRNb2RlbC5jb25maWcoKS5jZWxsLmhlaWdodCwgLy8gRml4ZWQgY2VsbCBoZWlnaHQgZm9yIG5vbi1vcmRpbmFsXG4gICAgICAgIHJhbmdlTWF4OiAwXG4gICAgICB9O1xuICAgIGNhc2UgU0laRTpcblxuICAgICAgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IEJBUikge1xuICAgICAgICBpZiAoc2NhbGVDb25maWcuYmFyU2l6ZVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5iYXJTaXplUmFuZ2V9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IG1vZGVsLmNvbmZpZygpLm1hcmsub3JpZW50ID09PSBPcmllbnQuSE9SSVpPTlRBTCA/IFkgOiBYO1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBbbW9kZWwuY29uZmlnKCkubWFyay5iYXJUaGluU2l6ZSwgbW9kZWwuc2NhbGUoZGltZW5zaW9uKS5iYW5kU2l6ZV19O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBURVhUTUFSSykge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5mb250U2l6ZVJhbmdlIH07XG4gICAgICB9IGVsc2UgaWYgKHVuaXRNb2RlbC5tYXJrKCkgPT09IFJVTEUpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcucnVsZVNpemVSYW5nZSB9O1xuICAgICAgfSBlbHNlIGlmICh1bml0TW9kZWwubWFyaygpID09PSBUSUNLKSB7XG4gICAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnRpY2tTaXplUmFuZ2UgfTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgLS0gcG9pbnQsIHNxdWFyZSwgY2lyY2xlXG4gICAgICBpZiAoc2NhbGVDb25maWcucG9pbnRTaXplUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5wb2ludFNpemVSYW5nZX07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhbmRTaXplID0gcG9pbnRCYW5kU2l6ZSh1bml0TW9kZWwpO1xuXG4gICAgICByZXR1cm4ge3JhbmdlOiBbOSwgKGJhbmRTaXplIC0gMikgKiAoYmFuZFNpemUgLSAyKV19O1xuICAgIGNhc2UgU0hBUEU6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5zaGFwZVJhbmdlfTtcbiAgICBjYXNlIENPTE9SOlxuICAgICAgaWYgKGZpZWxkRGVmLnR5cGUgPT09IE5PTUlOQUwpIHtcbiAgICAgICAgcmV0dXJuIHtyYW5nZTogc2NhbGVDb25maWcubm9taW5hbENvbG9yUmFuZ2V9O1xuICAgICAgfVxuICAgICAgLy8gZWxzZSAtLSBvcmRpbmFsLCB0aW1lLCBvciBxdWFudGl0YXRpdmVcbiAgICAgIHJldHVybiB7cmFuZ2U6IHNjYWxlQ29uZmlnLnNlcXVlbnRpYWxDb2xvclJhbmdlfTtcbiAgICBjYXNlIE9QQUNJVFk6XG4gICAgICByZXR1cm4ge3JhbmdlOiBzY2FsZUNvbmZpZy5vcGFjaXR5fTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHBvaW50QmFuZFNpemUobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCBzY2FsZUNvbmZpZyA9IG1vZGVsLmNvbmZpZygpLnNjYWxlO1xuXG4gIGNvbnN0IGhhc1ggPSBtb2RlbC5oYXMoWCk7XG4gIGNvbnN0IGhhc1kgPSBtb2RlbC5oYXMoWSk7XG5cbiAgY29uc3QgeElzTWVhc3VyZSA9IGlzTWVhc3VyZShtb2RlbC5lbmNvZGluZygpLngpO1xuICBjb25zdCB5SXNNZWFzdXJlID0gaXNNZWFzdXJlKG1vZGVsLmVuY29kaW5nKCkueSk7XG5cbiAgaWYgKGhhc1ggJiYgaGFzWSkge1xuICAgIHJldHVybiB4SXNNZWFzdXJlICE9PSB5SXNNZWFzdXJlID9cbiAgICAgIG1vZGVsLnNjYWxlKHhJc01lYXN1cmUgPyBZIDogWCkuYmFuZFNpemUgOlxuICAgICAgTWF0aC5taW4oXG4gICAgICAgIG1vZGVsLnNjYWxlKFgpLmJhbmRTaXplIHx8IHNjYWxlQ29uZmlnLmJhbmRTaXplLFxuICAgICAgICBtb2RlbC5zY2FsZShZKS5iYW5kU2l6ZSB8fCBzY2FsZUNvbmZpZy5iYW5kU2l6ZVxuICAgICAgKTtcbiAgfSBlbHNlIGlmIChoYXNZKSB7XG4gICAgcmV0dXJuIHlJc01lYXN1cmUgPyBtb2RlbC5jb25maWcoKS5zY2FsZS5iYW5kU2l6ZSA6IG1vZGVsLnNjYWxlKFkpLmJhbmRTaXplO1xuICB9IGVsc2UgaWYgKGhhc1gpIHtcbiAgICByZXR1cm4geElzTWVhc3VyZSA/IG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplIDogbW9kZWwuc2NhbGUoWCkuYmFuZFNpemU7XG4gIH1cbiAgcmV0dXJuIG1vZGVsLmNvbmZpZygpLnNjYWxlLmJhbmRTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAoc2NhbGU6IFNjYWxlKSB7XG4gIC8vIE9ubHkgd29ya3MgZm9yIHNjYWxlIHdpdGggYm90aCBjb250aW51b3VzIGRvbWFpbiBjb250aW51b3VzIHJhbmdlXG4gIC8vIChEb2Vzbid0IHdvcmsgZm9yIHF1YW50aXplLCBxdWFudGlsZSwgdGhyZXNob2xkLCBvcmRpbmFsKVxuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULFxuICAgICAgICBTY2FsZVR5cGUuTE9HLCBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQ10sIHNjYWxlLnR5cGUpKSB7XG4gICAgcmV0dXJuIHNjYWxlLmNsYW1wO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudChzY2FsZTogU2NhbGUpIHtcbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5QT1cpIHtcbiAgICByZXR1cm4gc2NhbGUuZXhwb25lbnQ7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5pY2Uoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpOiBib29sZWFuIHwgTmljZVRpbWUge1xuICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5MSU5FQVIsIFNjYWxlVHlwZS5QT1csIFNjYWxlVHlwZS5TUVJULCBTY2FsZVR5cGUuTE9HLFxuICAgICAgICBTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLlFVQU5USVpFXSwgc2NhbGUudHlwZSkpIHtcblxuICAgIGlmIChzY2FsZS5uaWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS5uaWNlO1xuICAgIH1cbiAgICBpZiAoY29udGFpbnMoW1NjYWxlVHlwZS5USU1FLCBTY2FsZVR5cGUuVVRDXSwgc2NhbGUudHlwZSkpIHtcbiAgICAgIHJldHVybiBzbWFsbGVzdFVuaXQoZmllbGREZWYudGltZVVuaXQpIGFzIGFueTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7IC8vIHJldHVybiB0cnVlIGZvciBxdWFudGl0YXRpdmUgWC9ZXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcGFkZGluZyhzY2FsZTogU2NhbGUsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgLyogUGFkZGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIFggYW5kIFkuXG4gICAqXG4gICAqIEJhc2ljYWxseSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gYWRkIHBhZGRpbmcgZm9yIGNvbG9yIGFuZCBzaXplLlxuICAgKlxuICAgKiBXZSBkbyBub3QgdXNlIGQzIHNjYWxlJ3MgcGFkZGluZyBmb3Igcm93L2NvbHVtbiBiZWNhdXNlIHBhZGRpbmcgdGhlcmVcbiAgICogaXMgYSByYXRpbyAoWzAsIDFdKSBhbmQgaXQgY2F1c2VzIHRoZSBwYWRkaW5nIHRvIGJlIGRlY2ltYWxzLlxuICAgKiBUaGVyZWZvcmUsIHdlIG1hbnVhbGx5IGNhbGN1bGF0ZSBwYWRkaW5nIGluIHRoZSBsYXlvdXQgYnkgb3Vyc2VsdmVzLlxuICAgKi9cbiAgaWYgKHNjYWxlLnR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCkpIHtcbiAgICByZXR1cm4gc2NhbGUucGFkZGluZztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKHNjYWxlOiBTY2FsZSwgY2hhbm5lbDogQ2hhbm5lbCwgX18sIG1vZGVsOiBNb2RlbCkge1xuICBpZiAoc2NhbGUudHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgY29udGFpbnMoW1gsIFldLCBjaGFubmVsKSkge1xuICAgIC8vIFdlIGFsd2F5cyB1c2Ugb3JkaW5hbCBwb2ludCBzY2FsZSBmb3IgeCBhbmQgeS5cbiAgICAvLyBUaHVzIGBwb2ludHNgIGlzbid0IGluY2x1ZGVkIGluIHRoZSBzY2FsZSdzIHNjaGVtYS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQoc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsKSB7XG4gIGlmIChjb250YWlucyhbWCwgWSwgUk9XLCBDT0xVTU4sIFNJWkVdLCBjaGFubmVsKSAmJiBzY2FsZS5yb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjYWxlLnJvdW5kO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8oc2NhbGU6IFNjYWxlLCBjaGFubmVsOiBDaGFubmVsLCBmaWVsZERlZjogRmllbGREZWYpIHtcbiAgLy8gb25seSBhcHBsaWNhYmxlIGZvciBub24tb3JkaW5hbCBzY2FsZVxuICBpZiAoIWNvbnRhaW5zKFtTY2FsZVR5cGUuVElNRSwgU2NhbGVUeXBlLlVUQywgU2NhbGVUeXBlLk9SRElOQUxdLCBzY2FsZS50eXBlKSkge1xuICAgIGlmIChzY2FsZS56ZXJvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBzY2FsZS56ZXJvO1xuICAgIH1cbiAgICAvLyBCeSBkZWZhdWx0LCByZXR1cm4gdHJ1ZSBvbmx5IGZvciBub24tYmlubmVkLCBxdWFudGl0YXRpdmUgeC1zY2FsZSBvciB5LXNjYWxlXG4gICAgLy8gSWYgbm8gY3VzdG9tIGRvbWFpbiBpcyBwcm92aWRlZC5cbiAgICByZXR1cm4gIXNjYWxlLmRvbWFpbiAmJiAhZmllbGREZWYuYmluICYmIGNvbnRhaW5zKFtYLCBZXSwgY2hhbm5lbCk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQge0F4aXN9IGZyb20gJy4uL2F4aXMnO1xuaW1wb3J0IHtYLCBZLCBYMiwgWTIsIFRFWFQsIFBBVEgsIE9SREVSLCBDaGFubmVsLCBVTklUX0NIQU5ORUxTLCAgVU5JVF9TQ0FMRV9DSEFOTkVMUywgTk9OU1BBVElBTF9TQ0FMRV9DSEFOTkVMUywgc3VwcG9ydE1hcmt9IGZyb20gJy4uL2NoYW5uZWwnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnLCBDb25maWcsIENlbGxDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge1NPVVJDRSwgU1VNTUFSWX0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQge0VuY29kaW5nfSBmcm9tICcuLi9lbmNvZGluZyc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4uL2VuY29kaW5nJzsgLy8gVE9ETzogcmVtb3ZlXG5pbXBvcnQge0ZpZWxkRGVmLCBGaWVsZFJlZk9wdGlvbiwgZmllbGR9IGZyb20gJy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kfSBmcm9tICcuLi9sZWdlbmQnO1xuaW1wb3J0IHtNYXJrLCBURVhUIGFzIFRFWFRNQVJLfSBmcm9tICcuLi9tYXJrJztcbmltcG9ydCB7U2NhbGUsIFNjYWxlVHlwZX0gZnJvbSAnLi4vc2NhbGUnO1xuaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuLi9zcGVjJztcbmltcG9ydCB7Z2V0RnVsbE5hbWUsIFFVQU5USVRBVElWRX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge2R1cGxpY2F0ZSwgZXh0ZW5kLCBtZXJnZURlZXAsIERpY3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWZ0RhdGF9IGZyb20gJy4uL3ZlZ2Euc2NoZW1hJztcblxuaW1wb3J0IHtwYXJzZUF4aXNDb21wb25lbnR9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge2FwcGx5Q29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUd9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7aW5pdE1hcmtDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7YXNzZW1ibGVEYXRhLCBwYXJzZVVuaXREYXRhfSBmcm9tICcuL2RhdGEvZGF0YSc7XG5pbXBvcnQge3BhcnNlTGVnZW5kQ29tcG9uZW50fSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge2Fzc2VtYmxlTGF5b3V0LCBwYXJzZVVuaXRMYXlvdXR9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtwYXJzZU1hcmt9IGZyb20gJy4vbWFyay9tYXJrJztcbmltcG9ydCB7cGFyc2VTY2FsZUNvbXBvbmVudCwgc2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7c3RhY2ssIFN0YWNrUHJvcGVydGllc30gZnJvbSAnLi4vc3RhY2snO1xuXG4vKipcbiAqIEludGVybmFsIG1vZGVsIG9mIFZlZ2EtTGl0ZSBzcGVjaWZpY2F0aW9uIGZvciB0aGUgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbml0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG5cbiAgcHJpdmF0ZSBfbWFyazogTWFyaztcbiAgcHJpdmF0ZSBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuICBwcml2YXRlIF9zdGFjazogU3RhY2tQcm9wZXJ0aWVzO1xuXG4gIGNvbnN0cnVjdG9yKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMsIHBhcmVudDogTW9kZWwsIHBhcmVudEdpdmVuTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoc3BlYywgcGFyZW50LCBwYXJlbnRHaXZlbk5hbWUpO1xuXG4gICAgY29uc3QgbWFyayA9IHRoaXMuX21hcmsgPSBzcGVjLm1hcms7XG4gICAgY29uc3QgZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZyA9IHRoaXMuX2luaXRFbmNvZGluZyhtYXJrLCBzcGVjLmVuY29kaW5nIHx8IHt9KTtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB0aGlzLl9pbml0Q29uZmlnKHNwZWMuY29uZmlnLCBwYXJlbnQsIG1hcmssIGVuY29kaW5nKTtcblxuICAgIHRoaXMuX3NjYWxlID0gIHRoaXMuX2luaXRTY2FsZShtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICB0aGlzLl9heGlzID0gdGhpcy5faW5pdEF4aXMoZW5jb2RpbmcsIGNvbmZpZyk7XG4gICAgdGhpcy5fbGVnZW5kID0gdGhpcy5faW5pdExlZ2VuZChlbmNvZGluZywgY29uZmlnKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdGFjayBwcm9wZXJ0aWVzXG4gICAgdGhpcy5fc3RhY2sgPSBzdGFjayhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFbmNvZGluZyhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICAvLyBjbG9uZSB0byBwcmV2ZW50IHNpZGUgZWZmZWN0IHRvIHRoZSBvcmlnaW5hbCBzcGVjXG4gICAgZW5jb2RpbmcgPSBkdXBsaWNhdGUoZW5jb2RpbmcpO1xuXG4gICAgdmxFbmNvZGluZy5mb3JFYWNoKGVuY29kaW5nLCBmdW5jdGlvbihmaWVsZERlZjogRmllbGREZWYsIGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICAgIGlmICghc3VwcG9ydE1hcmsoY2hhbm5lbCwgbWFyaykpIHtcbiAgICAgICAgLy8gRHJvcCB1bnN1cHBvcnRlZCBjaGFubmVsXG5cbiAgICAgICAgLy8gRklYTUUgY29uc29saWRhdGUgd2FybmluZyBtZXRob2RcbiAgICAgICAgY29uc29sZS53YXJuKGNoYW5uZWwsICdkcm9wcGVkIGFzIGl0IGlzIGluY29tcGF0aWJsZSB3aXRoJywgbWFyayk7XG4gICAgICAgIGRlbGV0ZSBmaWVsZERlZi5maWVsZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGREZWYudHlwZSkge1xuICAgICAgICAvLyBjb252ZXJ0IHNob3J0IHR5cGUgdG8gZnVsbCB0eXBlXG4gICAgICAgIGZpZWxkRGVmLnR5cGUgPSBnZXRGdWxsTmFtZShmaWVsZERlZi50eXBlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChjaGFubmVsID09PSBQQVRIIHx8IGNoYW5uZWwgPT09IE9SREVSKSAmJiAhZmllbGREZWYuYWdncmVnYXRlICYmIGZpZWxkRGVmLnR5cGUgPT09IFFVQU5USVRBVElWRSkge1xuICAgICAgICBmaWVsZERlZi5hZ2dyZWdhdGUgPSBBZ2dyZWdhdGVPcC5NSU47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuY29kaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmZpZyhzcGVjQ29uZmlnOiBDb25maWcsIHBhcmVudDogTW9kZWwsIG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgIGxldCBjb25maWcgPSBtZXJnZURlZXAoZHVwbGljYXRlKGRlZmF1bHRDb25maWcpLCBwYXJlbnQgPyBwYXJlbnQuY29uZmlnKCkgOiB7fSwgc3BlY0NvbmZpZyk7XG4gICAgY29uZmlnLm1hcmsgPSBpbml0TWFya0NvbmZpZyhtYXJrLCBlbmNvZGluZywgY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjYWxlKG1hcms6IE1hcmssIGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PFNjYWxlPiB7XG4gICAgcmV0dXJuIFVOSVRfU0NBTEVfQ0hBTk5FTFMucmVkdWNlKGZ1bmN0aW9uKF9zY2FsZSwgY2hhbm5lbCkge1xuICAgICAgaWYgKHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBjaGFubmVsKSB8fFxuICAgICAgICAgIChjaGFubmVsID09PSBYICYmIHZsRW5jb2RpbmcuaGFzKGVuY29kaW5nLCBYMikpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFkgJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFkyKSlcbiAgICAgICAgKSB7XG5cbiAgICAgICAgY29uc3QgY2hhbm5lbERlZiA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgICAgICBjb25zdCBzY2FsZVNwZWMgPSAoY2hhbm5lbERlZiB8fCB7fSkuc2NhbGUgfHwge307XG4gICAgICAgIGNvbnN0IF9zY2FsZVR5cGUgPSBzY2FsZVR5cGUoc2NhbGVTcGVjLCBjaGFubmVsRGVmLCBjaGFubmVsLCBtYXJrKTtcblxuICAgICAgICBfc2NhbGVbY2hhbm5lbF0gPSBleHRlbmQoe1xuICAgICAgICAgIHR5cGU6IF9zY2FsZVR5cGUsXG4gICAgICAgICAgcm91bmQ6IGNvbmZpZy5zY2FsZS5yb3VuZCxcbiAgICAgICAgICBwYWRkaW5nOiBjb25maWcuc2NhbGUucGFkZGluZyxcbiAgICAgICAgICB1c2VSYXdEb21haW46IGNvbmZpZy5zY2FsZS51c2VSYXdEb21haW4sXG4gICAgICAgICAgYmFuZFNpemU6IGNoYW5uZWwgPT09IFggJiYgX3NjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLk9SRElOQUwgJiYgbWFyayA9PT0gVEVYVE1BUksgP1xuICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNjYWxlLnRleHRCYW5kV2lkdGggOiBjb25maWcuc2NhbGUuYmFuZFNpemVcbiAgICAgICAgfSwgc2NhbGVTcGVjKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc2NhbGU7XG4gICAgfSwge30gYXMgRGljdDxTY2FsZT4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF4aXMoZW5jb2Rpbmc6IEVuY29kaW5nLCBjb25maWc6IENvbmZpZyk6IERpY3Q8QXhpcz4ge1xuICAgIHJldHVybiBbWCwgWV0ucmVkdWNlKGZ1bmN0aW9uKF9heGlzLCBjaGFubmVsKSB7XG4gICAgICAvLyBQb3NpdGlvbiBBeGlzXG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpIHx8XG4gICAgICAgICAgKGNoYW5uZWwgPT09IFggJiYgdmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIFgyKSkgfHxcbiAgICAgICAgICAoY2hhbm5lbCA9PT0gWSAmJiB2bEVuY29kaW5nLmhhcyhlbmNvZGluZywgWTIpKSkge1xuXG4gICAgICAgIGNvbnN0IGF4aXNTcGVjID0gKGVuY29kaW5nW2NoYW5uZWxdIHx8IHt9KS5heGlzO1xuICAgICAgICBpZiAoYXhpc1NwZWMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX2F4aXNbY2hhbm5lbF0gPSBleHRlbmQoe30sXG4gICAgICAgICAgICBjb25maWcuYXhpcyxcbiAgICAgICAgICAgIGF4aXNTcGVjID09PSB0cnVlID8ge30gOiBheGlzU3BlYyB8fCAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2F4aXM7XG4gICAgfSwge30gYXMgRGljdDxBeGlzPik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TGVnZW5kKGVuY29kaW5nOiBFbmNvZGluZywgY29uZmlnOiBDb25maWcpOiBEaWN0PExlZ2VuZD4ge1xuICAgIHJldHVybiBOT05TUEFUSUFMX1NDQUxFX0NIQU5ORUxTLnJlZHVjZShmdW5jdGlvbihfbGVnZW5kLCBjaGFubmVsKSB7XG4gICAgICBpZiAodmxFbmNvZGluZy5oYXMoZW5jb2RpbmcsIGNoYW5uZWwpKSB7XG4gICAgICAgIGNvbnN0IGxlZ2VuZFNwZWMgPSBlbmNvZGluZ1tjaGFubmVsXS5sZWdlbmQ7XG4gICAgICAgIGlmIChsZWdlbmRTcGVjICE9PSBmYWxzZSkge1xuICAgICAgICAgIF9sZWdlbmRbY2hhbm5lbF0gPSBleHRlbmQoe30sIGNvbmZpZy5sZWdlbmQsXG4gICAgICAgICAgICBsZWdlbmRTcGVjID09PSB0cnVlID8ge30gOiBsZWdlbmRTcGVjIHx8ICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfbGVnZW5kO1xuICAgIH0sIHt9IGFzIERpY3Q8TGVnZW5kPik7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VEYXRhKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmRhdGEgPSBwYXJzZVVuaXREYXRhKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHBhcnNlU2VsZWN0aW9uRGF0YSgpIHtcbiAgICAvLyBUT0RPOiBAYXJ2aW5kIGNhbiB3cml0ZSB0aGlzXG4gICAgLy8gV2UgbWlnaHQgbmVlZCB0byBzcGxpdCB0aGlzIGludG8gY29tcGlsZVNlbGVjdGlvbkRhdGEgYW5kIGNvbXBpbGVTZWxlY3Rpb25TaWduYWxzP1xuICB9XG5cbiAgcHVibGljIHBhcnNlTGF5b3V0RGF0YSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sYXlvdXQgPSBwYXJzZVVuaXRMYXlvdXQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTY2FsZSgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5zY2FsZSA9IHBhcnNlU2NhbGVDb21wb25lbnQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VNYXJrKCkge1xuICAgIHRoaXMuY29tcG9uZW50Lm1hcmsgPSBwYXJzZU1hcmsodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcGFyc2VBeGlzKCkge1xuICAgIHRoaXMuY29tcG9uZW50LmF4aXMgPSBwYXJzZUF4aXNDb21wb25lbnQodGhpcywgW1gsIFldKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUF4aXNHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUdyaWRHcm91cCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxlZ2VuZCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5sZWdlbmQgPSBwYXJzZUxlZ2VuZENvbXBvbmVudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZURhdGEoZGF0YTogVmdEYXRhW10pOiBWZ0RhdGFbXSB7XG4gICAgcmV0dXJuIGFzc2VtYmxlRGF0YSh0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZUxheW91dChsYXlvdXREYXRhOiBWZ0RhdGFbXSk6IFZnRGF0YVtdIHtcbiAgICByZXR1cm4gYXNzZW1ibGVMYXlvdXQodGhpcywgbGF5b3V0RGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXNzZW1ibGVNYXJrcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFyaztcbiAgfVxuXG4gIHB1YmxpYyBhc3NlbWJsZVBhcmVudEdyb3VwUHJvcGVydGllcyhjZWxsQ29uZmlnOiBDZWxsQ29uZmlnKSB7XG4gICAgcmV0dXJuIGFwcGx5Q29uZmlnKHt9LCBjZWxsQ29uZmlnLCBGSUxMX1NUUk9LRV9DT05GSUcuY29uY2F0KFsnY2xpcCddKSk7XG4gIH1cblxuICBwdWJsaWMgY2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIFVOSVRfQ0hBTk5FTFM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFwcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5lbmNvZGluZygpO1xuICB9XG5cbiAgcHVibGljIHN0YWNrKCk6IFN0YWNrUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrO1xuICB9XG5cbiAgcHVibGljIHRvU3BlYyhleGNsdWRlQ29uZmlnPywgZXhjbHVkZURhdGE/KSB7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBkdXBsaWNhdGUodGhpcy5fZW5jb2RpbmcpO1xuICAgIGxldCBzcGVjOiBhbnk7XG5cbiAgICBzcGVjID0ge1xuICAgICAgbWFyazogdGhpcy5fbWFyayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgIH07XG5cbiAgICBpZiAoIWV4Y2x1ZGVDb25maWcpIHtcbiAgICAgIHNwZWMuY29uZmlnID0gZHVwbGljYXRlKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFleGNsdWRlRGF0YSkge1xuICAgICAgc3BlYy5kYXRhID0gZHVwbGljYXRlKHRoaXMuX2RhdGEpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWZhdWx0c1xuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgcHVibGljIG1hcmsoKTogTWFyayB7XG4gICAgcmV0dXJuIHRoaXMuX21hcms7XG4gIH1cblxuICBwdWJsaWMgaGFzKGNoYW5uZWw6IENoYW5uZWwpIHtcbiAgICByZXR1cm4gdmxFbmNvZGluZy5oYXModGhpcy5fZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9XG5cbiAgcHVibGljIGVuY29kaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZERlZihjaGFubmVsOiBDaGFubmVsKTogRmllbGREZWYge1xuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHx8IHt9XG4gICAgLy8gQ3VycmVudGx5IHdlIGhhdmUgaXQgdG8gcHJldmVudCBudWxsIHBvaW50ZXIgZXhjZXB0aW9uLlxuICAgIHJldHVybiB0aGlzLl9lbmNvZGluZ1tjaGFubmVsXSB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgXCJmaWVsZFwiIHJlZmVyZW5jZSBmb3IgdmVnYSAqL1xuICBwdWJsaWMgZmllbGQoY2hhbm5lbDogQ2hhbm5lbCwgb3B0OiBGaWVsZFJlZk9wdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgZmllbGREZWYgPSB0aGlzLmZpZWxkRGVmKGNoYW5uZWwpO1xuXG4gICAgaWYgKGZpZWxkRGVmLmJpbikgeyAvLyBiaW4gaGFzIGRlZmF1bHQgc3VmZml4IHRoYXQgZGVwZW5kcyBvbiBzY2FsZVR5cGVcbiAgICAgIG9wdCA9IGV4dGVuZCh7XG4gICAgICAgIGJpblN1ZmZpeDogdGhpcy5zY2FsZShjaGFubmVsKS50eXBlID09PSBTY2FsZVR5cGUuT1JESU5BTCA/ICdyYW5nZScgOiAnc3RhcnQnXG4gICAgICB9LCBvcHQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZChmaWVsZERlZiwgb3B0KTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhVGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YU5hbWUodmxFbmNvZGluZy5pc0FnZ3JlZ2F0ZSh0aGlzLl9lbmNvZGluZykgPyBTVU1NQVJZIDogU09VUkNFKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1VuaXQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7U2NhbGVDb25maWcsIEZhY2V0U2NhbGVDb25maWcsIGRlZmF1bHRTY2FsZUNvbmZpZywgZGVmYXVsdEZhY2V0U2NhbGVDb25maWd9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtBeGlzQ29uZmlnLCBkZWZhdWx0QXhpc0NvbmZpZywgZGVmYXVsdEZhY2V0QXhpc0NvbmZpZ30gZnJvbSAnLi9heGlzJztcbmltcG9ydCB7TGVnZW5kQ29uZmlnLCBkZWZhdWx0TGVnZW5kQ29uZmlnfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQge1N0YWNrT2Zmc2V0fSBmcm9tICcuL3N0YWNrJztcblxuZXhwb3J0IGludGVyZmFjZSBDZWxsQ29uZmlnIHtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcblxuICBjbGlwPzogYm9vbGVhbjtcblxuICAvLyBGSUxMX1NUUk9LRV9DT05GSUdcbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLlxuICAgKiBAZm9ybWF0IGNvbG9yXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuXG4gIC8qKiBUaGUgZmlsbCBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzdHJva2UgY29sb3IuICovXG4gIHN0cm9rZT86IHN0cmluZztcblxuICAvKiogVGhlIHN0cm9rZSBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS4gKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvKiogVGhlIHN0cm9rZSB3aWR0aCwgaW4gcGl4ZWxzLiAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKiogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLiAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LiAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENlbGxDb25maWc6IENlbGxDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q2VsbENvbmZpZzogQ2VsbENvbmZpZyA9IHtcbiAgc3Ryb2tlOiAnI2NjYycsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgLyoqIEZhY2V0IFNjYWxlIENvbmZpZyAqL1xuICBzY2FsZT86IEZhY2V0U2NhbGVDb25maWc7XG5cbiAgLyoqIEZhY2V0IEF4aXMgQ29uZmlnICovXG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBHcmlkIENvbmZpZyAqL1xuICBncmlkPzogRmFjZXRHcmlkQ29uZmlnO1xuXG4gIC8qKiBGYWNldCBDZWxsIENvbmZpZyAqL1xuICBjZWxsPzogQ2VsbENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldEdyaWRDb25maWcge1xuICAvKiogQGZvcm1hdCBjb2xvciAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgb2Zmc2V0PzogbnVtYmVyO1xufVxuXG5jb25zdCBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnOiBGYWNldEdyaWRDb25maWcgPSB7XG4gIGNvbG9yOiAnIzAwMDAwMCcsXG4gIG9wYWNpdHk6IDAuNCxcbiAgb2Zmc2V0OiAwXG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0Q29uZmlnOiBGYWNldENvbmZpZyA9IHtcbiAgc2NhbGU6IGRlZmF1bHRGYWNldFNjYWxlQ29uZmlnLFxuICBheGlzOiBkZWZhdWx0RmFjZXRBeGlzQ29uZmlnLFxuICBncmlkOiBkZWZhdWx0RmFjZXRHcmlkQ29uZmlnLFxuICBjZWxsOiBkZWZhdWx0RmFjZXRDZWxsQ29uZmlnXG59O1xuXG5leHBvcnQgZW51bSBGb250V2VpZ2h0IHtcbiAgICBOT1JNQUwgPSAnbm9ybWFsJyBhcyBhbnksXG4gICAgQk9MRCA9ICdib2xkJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gU2hhcGUge1xuICAgIENJUkNMRSA9ICdjaXJjbGUnIGFzIGFueSxcbiAgICBTUVVBUkUgPSAnc3F1YXJlJyBhcyBhbnksXG4gICAgQ1JPU1MgPSAnY3Jvc3MnIGFzIGFueSxcbiAgICBESUFNT05EID0gJ2RpYW1vbmQnIGFzIGFueSxcbiAgICBUUklBTkdMRVVQID0gJ3RyaWFuZ2xlLXVwJyBhcyBhbnksXG4gICAgVFJJQU5HTEVET1dOID0gJ3RyaWFuZ2xlLWRvd24nIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gT3JpZW50IHtcbiAgSE9SSVpPTlRBTCA9ICdob3Jpem9udGFsJyBhcyBhbnksXG4gIFZFUlRJQ0FMID0gJ3ZlcnRpY2FsJyBhcyBhbnlcbn1cblxuZXhwb3J0IGVudW0gSG9yaXpvbnRhbEFsaWduIHtcbiAgICBMRUZUID0gJ2xlZnQnIGFzIGFueSxcbiAgICBSSUdIVCA9ICdyaWdodCcgYXMgYW55LFxuICAgIENFTlRFUiA9ICdjZW50ZXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gVmVydGljYWxBbGlnbiB7XG4gICAgVE9QID0gJ3RvcCcgYXMgYW55LFxuICAgIE1JRERMRSA9ICdtaWRkbGUnIGFzIGFueSxcbiAgICBCT1RUT00gPSAnYm90dG9tJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEZvbnRTdHlsZSB7XG4gICAgTk9STUFMID0gJ25vcm1hbCcgYXMgYW55LFxuICAgIElUQUxJQyA9ICdpdGFsaWMnIGFzIGFueSxcbn1cblxuZXhwb3J0IGVudW0gSW50ZXJwb2xhdGUge1xuICAgIC8qKiBwaWVjZXdpc2UgbGluZWFyIHNlZ21lbnRzLCBhcyBpbiBhIHBvbHlsaW5lICovXG4gICAgTElORUFSID0gJ2xpbmVhcicgYXMgYW55LFxuICAgIC8qKiBjbG9zZSB0aGUgbGluZWFyIHNlZ21lbnRzIHRvIGZvcm0gYSBwb2x5Z29uICovXG4gICAgTElORUFSX0NMT1NFRCA9ICdsaW5lYXItY2xvc2VkJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQID0gJ3N0ZXAnIGFzIGFueSxcbiAgICAvKiogYWx0ZXJuYXRlIGJldHdlZW4gdmVydGljYWwgYW5kIGhvcml6b250YWwgc2VnbWVudHMsIGFzIGluIGEgc3RlcCBmdW5jdGlvbiAqL1xuICAgIFNURVBfQkVGT1JFID0gJ3N0ZXAtYmVmb3JlJyBhcyBhbnksXG4gICAgLyoqIGFsdGVybmF0ZSBiZXR3ZWVuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNlZ21lbnRzLCBhcyBpbiBhIHN0ZXAgZnVuY3Rpb24gKi9cbiAgICBTVEVQX0FGVEVSID0gJ3N0ZXAtYWZ0ZXInIGFzIGFueSxcbiAgICAvKiogYSBCLXNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQkFTSVMgPSAnYmFzaXMnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBCLXNwbGluZTsgbWF5IG5vdCBpbnRlcnNlY3QgdGhlIHN0YXJ0IG9yIGVuZCAqL1xuICAgIEJBU0lTX09QRU4gPSAnYmFzaXMtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBCLXNwbGluZSwgYXMgaW4gYSBsb29wICovXG4gICAgQkFTSVNfQ0xPU0VEID0gJ2Jhc2lzLWNsb3NlZCcgYXMgYW55LFxuICAgIC8qKiBhIENhcmRpbmFsIHNwbGluZSwgd2l0aCBjb250cm9sIHBvaW50IGR1cGxpY2F0aW9uIG9uIHRoZSBlbmRzICovXG4gICAgQ0FSRElOQUwgPSAnY2FyZGluYWwnIGFzIGFueSxcbiAgICAvKiogYW4gb3BlbiBDYXJkaW5hbCBzcGxpbmU7IG1heSBub3QgaW50ZXJzZWN0IHRoZSBzdGFydCBvciBlbmQsIGJ1dCB3aWxsIGludGVyc2VjdCBvdGhlciBjb250cm9sIHBvaW50cyAqL1xuICAgIENBUkRJTkFMX09QRU4gPSAnY2FyZGluYWwtb3BlbicgYXMgYW55LFxuICAgIC8qKiBhIGNsb3NlZCBDYXJkaW5hbCBzcGxpbmUsIGFzIGluIGEgbG9vcCAqL1xuICAgIENBUkRJTkFMX0NMT1NFRCA9ICdjYXJkaW5hbC1jbG9zZWQnIGFzIGFueSxcbiAgICAvKiogZXF1aXZhbGVudCB0byBiYXNpcywgZXhjZXB0IHRoZSB0ZW5zaW9uIHBhcmFtZXRlciBpcyB1c2VkIHRvIHN0cmFpZ2h0ZW4gdGhlIHNwbGluZSAqL1xuICAgIEJVTkRMRSA9ICdidW5kbGUnIGFzIGFueSxcbiAgICAvKiogY3ViaWMgaW50ZXJwb2xhdGlvbiB0aGF0IHByZXNlcnZlcyBtb25vdG9uaWNpdHkgaW4geSAqL1xuICAgIE1PTk9UT05FID0gJ21vbm90b25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBlbnVtIEFyZWFPdmVybGF5IHtcbiAgTElORSA9ICdsaW5lJyBhcyBhbnksXG4gIExJTkVQT0lOVCA9ICdsaW5lcG9pbnQnIGFzIGFueSxcbiAgTk9ORSA9ICdub25lJyBhcyBhbnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdmVybGF5Q29uZmlnIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gb3ZlcmxheSBsaW5lIHdpdGggcG9pbnQuXG4gICAqL1xuICBsaW5lPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHlwZSBvZiBvdmVybGF5IGZvciBhcmVhIG1hcmsgKGxpbmUgb3IgbGluZXBvaW50KVxuICAgKi9cbiAgYXJlYT86IEFyZWFPdmVybGF5O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHN0eWxlIGZvciB0aGUgb3ZlcmxheWVkIHBvaW50LlxuICAgKi9cbiAgcG9pbnRTdHlsZT86IE1hcmtDb25maWc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgc3R5bGUgZm9yIHRoZSBvdmVybGF5ZWQgcG9pbnQuXG4gICAqL1xuICBsaW5lU3R5bGU/OiBNYXJrQ29uZmlnO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE92ZXJsYXlDb25maWc6IE92ZXJsYXlDb25maWcgPSB7XG4gIGxpbmU6IGZhbHNlLFxuICBwb2ludFN0eWxlOiB7ZmlsbGVkOiB0cnVlfSxcbiAgbGluZVN0eWxlOiB7fVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIHtcblxuICAvLyAtLS0tLS0tLS0tIENvbG9yIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNoYXBlXFwncyBjb2xvciBzaG91bGQgYmUgdXNlZCBhcyBmaWxsIGNvbG9yIGluc3RlYWQgb2Ygc3Ryb2tlIGNvbG9yLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGljYWJsZSBmb3IgXCJiYXJcIiwgXCJwb2ludFwiLCBhbmQgXCJhcmVhXCIuXG4gICAqIEFsbCBtYXJrcyBleGNlcHQgXCJwb2ludFwiIG1hcmtzIGFyZSBmaWxsZWQgYnkgZGVmYXVsdC5cbiAgICogU2VlIE1hcmsgRG9jdW1lbnRhdGlvbiAoaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL21hcmtzLmh0bWwpXG4gICAqIGZvciB1c2FnZSBleGFtcGxlLlxuICAgKi9cbiAgZmlsbGVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmYXVsdCBjb2xvci5cbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgRmlsbCBDb2xvci4gIFRoaXMgaGFzIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gY29uZmlnLmNvbG9yXG4gICAqIEBmb3JtYXQgY29sb3JcbiAgICovXG4gIGZpbGw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgU3Ryb2tlIENvbG9yLiAgVGhpcyBoYXMgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBjb25maWcuY29sb3JcbiAgICogQGZvcm1hdCBjb2xvclxuICAgKi9cbiAgc3Ryb2tlPzogc3RyaW5nO1xuXG4gIC8vIC0tLS0tLS0tLS0gT3BhY2l0eSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqIEBtYXhpbXVtIDFcbiAgICovXG4gIG9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMVxuICAgKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFN0cm9rZSBTdHlsZSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKi9cbiAgc3Ryb2tlRGFzaD86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IChpbiBwaXhlbHMpIGludG8gd2hpY2ggdG8gYmVnaW4gZHJhd2luZyB3aXRoIHRoZSBzdHJva2UgZGFzaCBhcnJheS5cbiAgICovXG4gIHN0cm9rZURhc2hPZmZzZXQ/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBTdGFja2luZzogQmFyICYgQXJlYSAtLS0tLS0tLS0tXG4gIHN0YWNrZWQ/OiBTdGFja09mZnNldDtcblxuICAvLyAtLS0tLS0tLS0tIE9yaWVudGF0aW9uOiBCYXIsIFRpY2ssIExpbmUsIEFyZWEgLS0tLS0tLS0tLVxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIGEgbm9uLXN0YWNrZWQgYmFyLCB0aWNrLCBhcmVhLCBhbmQgbGluZSBjaGFydHMuXG4gICAqIFRoZSB2YWx1ZSBpcyBlaXRoZXIgaG9yaXpvbnRhbCAoZGVmYXVsdCkgb3IgdmVydGljYWwuXG4gICAqIC0gRm9yIGJhciwgcnVsZSBhbmQgdGljaywgdGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNpemUgb2YgdGhlIGJhciBhbmQgdGlja1xuICAgKiBzaG91bGQgYmUgYXBwbGllZCB0byB4IG9yIHkgZGltZW5zaW9uLlxuICAgKiAtIEZvciBhcmVhLCB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG9yaWVudCBwcm9wZXJ0eSBvZiB0aGUgVmVnYSBvdXRwdXQuXG4gICAqIC0gRm9yIGxpbmUsIHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgc29ydCBvcmRlciBvZiB0aGUgcG9pbnRzIGluIHRoZSBsaW5lXG4gICAqIGlmIGBjb25maWcuc29ydExpbmVCeWAgaXMgbm90IHNwZWNpZmllZC5cbiAgICogRm9yIHN0YWNrZWQgY2hhcnRzLCB0aGlzIGlzIGFsd2F5cyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgc3RhY2s7XG4gICAqIHRoZXJlZm9yZSBleHBsaWNpdGx5IHNwZWNpZmllZCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gICAqL1xuICBvcmllbnQ/OiBPcmllbnQ7XG5cbiAgLy8gLS0tLS0tLS0tLSBJbnRlcnBvbGF0aW9uOiBMaW5lIC8gYXJlYSAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgbGluZSBpbnRlcnBvbGF0aW9uIG1ldGhvZCB0byB1c2UuIE9uZSBvZiBsaW5lYXIsIHN0ZXAtYmVmb3JlLCBzdGVwLWFmdGVyLCBiYXNpcywgYmFzaXMtb3BlbiwgY2FyZGluYWwsIGNhcmRpbmFsLW9wZW4sIG1vbm90b25lLlxuICAgKi9cbiAgaW50ZXJwb2xhdGU/OiBJbnRlcnBvbGF0ZTtcbiAgLyoqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgaW50ZXJwb2xhdGlvbiB0eXBlLCBzZXRzIHRoZSB0ZW5zaW9uIHBhcmFtZXRlci5cbiAgICovXG4gIHRlbnNpb24/OiBudW1iZXI7XG5cbiAgLy8gLS0tLS0tLS0tLSBMaW5lIC0tLS0tLS0tLVxuICAvKipcbiAgICogU2l6ZSBvZiBsaW5lIG1hcmsuXG4gICAqL1xuICBsaW5lU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFJ1bGUgLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBTaXplIG9mIHJ1bGUgbWFyay5cbiAgICovXG4gIHJ1bGVTaXplPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gQmFyIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBiYXJzLiAgSWYgdW5zcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHNpemUgaXMgIGBiYW5kU2l6ZS0xYCxcbiAgICogd2hpY2ggcHJvdmlkZXMgMSBwaXhlbCBvZmZzZXQgYmV0d2VlbiBiYXJzLlxuICAgKi9cbiAgYmFyU2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMgb24gY29udGludW91cyBzY2FsZXMuXG4gICAqL1xuICBiYXJUaGluU2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFBvaW50IC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wgc2hhcGUgdG8gdXNlLiBPbmUgb2YgY2lyY2xlIChkZWZhdWx0KSwgc3F1YXJlLCBjcm9zcywgZGlhbW9uZCwgdHJpYW5nbGUtdXAsIG9yIHRyaWFuZ2xlLWRvd24uXG4gICAqL1xuICBzaGFwZT86IFNoYXBlO1xuXG4gIC8vIC0tLS0tLS0tLS0gUG9pbnQgU2l6ZSAoUG9pbnQgLyBTcXVhcmUgLyBDaXJjbGUpIC0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRoZSBwaXhlbCBhcmVhIGVhY2ggdGhlIHBvaW50LiBGb3IgZXhhbXBsZTogaW4gdGhlIGNhc2Ugb2YgY2lyY2xlcywgdGhlIHJhZGl1cyBpcyBkZXRlcm1pbmVkIGluIHBhcnQgYnkgdGhlIHNxdWFyZSByb290IG9mIHRoZSBzaXplIHZhbHVlLlxuICAgKi9cbiAgc2l6ZT86IG51bWJlcjtcblxuICAvLyAtLS0tLS0tLS0tIFRpY2sgLS0tLS0tLS0tLVxuICAvKiogVGhlIHdpZHRoIG9mIHRoZSB0aWNrcy4gKi9cbiAgdGlja1NpemU/OiBudW1iZXI7XG5cbiAgLyoqIFRoaWNrbmVzcyBvZiB0aGUgdGljayBtYXJrLiAqL1xuICB0aWNrVGhpY2tuZXNzPzogbnVtYmVyO1xuXG4gIC8vIC0tLS0tLS0tLS0gVGV4dCAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiBsZWZ0LCByaWdodCwgY2VudGVyLlxuICAgKi9cbiAgYWxpZ24/OiBIb3Jpem9udGFsQWxpZ247XG4gIC8qKlxuICAgKiBUaGUgcm90YXRpb24gYW5nbGUgb2YgdGhlIHRleHQsIGluIGRlZ3JlZXMuXG4gICAqL1xuICBhbmdsZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIHRleHQuIE9uZSBvZiB0b3AsIG1pZGRsZSwgYm90dG9tLlxuICAgKi9cbiAgYmFzZWxpbmU/OiBWZXJ0aWNhbEFsaWduO1xuICAvKipcbiAgICogVGhlIGhvcml6b250YWwgb2Zmc2V0LCBpbiBwaXhlbHMsIGJldHdlZW4gdGhlIHRleHQgbGFiZWwgYW5kIGl0cyBhbmNob3IgcG9pbnQuIFRoZSBvZmZzZXQgaXMgYXBwbGllZCBhZnRlciByb3RhdGlvbiBieSB0aGUgYW5nbGUgcHJvcGVydHkuXG4gICAqL1xuICBkeD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB2ZXJ0aWNhbCBvZmZzZXQsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgdGV4dCBsYWJlbCBhbmQgaXRzIGFuY2hvciBwb2ludC4gVGhlIG9mZnNldCBpcyBhcHBsaWVkIGFmdGVyIHJvdGF0aW9uIGJ5IHRoZSBhbmdsZSBwcm9wZXJ0eS5cbiAgICovXG4gIGR5PzogbnVtYmVyO1xuICAvKipcbiAgICogUG9sYXIgY29vcmRpbmF0ZSByYWRpYWwgb2Zmc2V0LCBpbiBwaXhlbHMsIG9mIHRoZSB0ZXh0IGxhYmVsIGZyb20gdGhlIG9yaWdpbiBkZXRlcm1pbmVkIGJ5IHRoZSB4IGFuZCB5IHByb3BlcnRpZXMuXG4gICAqL1xuICByYWRpdXM/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBQb2xhciBjb29yZGluYXRlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgdGV4dCBsYWJlbCBmcm9tIHRoZSBvcmlnaW4gZGV0ZXJtaW5lZCBieSB0aGUgeCBhbmQgeSBwcm9wZXJ0aWVzLiBWYWx1ZXMgZm9yIHRoZXRhIGZvbGxvdyB0aGUgc2FtZSBjb252ZW50aW9uIG9mIGFyYyBtYXJrIHN0YXJ0QW5nbGUgYW5kIGVuZEFuZ2xlIHByb3BlcnRpZXM6IGFuZ2xlcyBhcmUgbWVhc3VyZWQgaW4gcmFkaWFucywgd2l0aCAwIGluZGljYXRpbmcgXCJub3J0aFwiLlxuICAgKi9cbiAgdGhldGE/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdHlwZWZhY2UgdG8gc2V0IHRoZSB0ZXh0IGluIChlLmcuLCBIZWx2ZXRpY2EgTmV1ZSkuXG4gICAqL1xuICBmb250Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBzdHlsZSAoZS5nLiwgaXRhbGljKS5cbiAgICovXG4gIGZvbnRTdHlsZT86IEZvbnRTdHlsZTtcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodCAoZS5nLiwgYm9sZCkuXG4gICAqL1xuICBmb250V2VpZ2h0PzogRm9udFdlaWdodDtcbiAgLy8gVmVnYS1MaXRlIG9ubHkgZm9yIHRleHQgb25seVxuICAvKipcbiAgICogVGhlIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgdGV4dCB2YWx1ZS4gSWYgbm90IGRlZmluZWQsIHRoaXMgd2lsbCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBmb3JtYXQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciBUZXh0XG4gICAqL1xuICB0ZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcHBseSBjb2xvciBmaWVsZCB0byBiYWNrZ3JvdW5kIGNvbG9yIGluc3RlYWQgb2YgdGhlIHRleHQuXG4gICAqL1xuICBhcHBseUNvbG9yVG9CYWNrZ3JvdW5kPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRNYXJrQ29uZmlnOiBNYXJrQ29uZmlnID0ge1xuICBjb2xvcjogJyM0NjgyYjQnLFxuICBzaGFwZTogU2hhcGUuQ0lSQ0xFLFxuICBzdHJva2VXaWR0aDogMixcbiAgc2l6ZTogMzAsXG4gIGJhclRoaW5TaXplOiAyLFxuICAvLyBsaW5lU2l6ZSBpcyB1bmRlZmluZWQgYnkgZGVmYXVsdCwgYW5kIHJlZmVyIHRvIHZhbHVlIGZyb20gc3Ryb2tlV2lkdGhcbiAgcnVsZVNpemU6IDEsXG4gIHRpY2tUaGlja25lc3M6IDEsXG5cbiAgZm9udFNpemU6IDEwLFxuICBiYXNlbGluZTogVmVydGljYWxBbGlnbi5NSURETEUsXG4gIHRleHQ6ICdBYmMnLFxuXG4gIHNob3J0VGltZUxhYmVsczogZmFsc2UsXG4gIGFwcGx5Q29sb3JUb0JhY2tncm91bmQ6IGZhbHNlXG59O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgLy8gVE9ETzogYWRkIHRoaXMgYmFjayBvbmNlIHdlIGhhdmUgdG9wLWRvd24gbGF5b3V0IGFwcHJvYWNoXG4gIC8vIHdpZHRoPzogbnVtYmVyO1xuICAvLyBoZWlnaHQ/OiBudW1iZXI7XG4gIC8vIHBhZGRpbmc/OiBudW1iZXJ8c3RyaW5nO1xuICAvKipcbiAgICogVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG9uLXNjcmVlbiB2aWV3cG9ydCwgaW4gcGl4ZWxzLiBJZiBuZWNlc3NhcnksIGNsaXBwaW5nIGFuZCBzY3JvbGxpbmcgd2lsbCBiZSBhcHBsaWVkLlxuICAgKi9cbiAgdmlld3BvcnQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDU1MgY29sb3IgcHJvcGVydHkgdG8gdXNlIGFzIGJhY2tncm91bmQgb2YgdmlzdWFsaXphdGlvbi4gRGVmYXVsdCBpcyBgXCJ0cmFuc3BhcmVudFwiYC5cbiAgICovXG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEQzIE51bWJlciBmb3JtYXQgZm9yIGF4aXMgbGFiZWxzIGFuZCB0ZXh0IHRhYmxlcy4gRm9yIGV4YW1wbGUgXCJzXCIgZm9yIFNJIHVuaXRzLlxuICAgKi9cbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLlxuICAgKi9cbiAgdGltZUZvcm1hdD86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBheGlzIGFuZCBsZWdlbmQgdGl0bGUgZm9yIGNvdW50IGZpZWxkcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGNvdW50VGl0bGU/OiBzdHJpbmc7XG5cbiAgLyoqIENlbGwgQ29uZmlnICovXG4gIGNlbGw/OiBDZWxsQ29uZmlnO1xuXG4gIC8qKiBNYXJrIENvbmZpZyAqL1xuICBtYXJrPzogTWFya0NvbmZpZztcblxuICAvKiogTWFyayBPdmVybGF5IENvbmZpZyAqL1xuICBvdmVybGF5PzogT3ZlcmxheUNvbmZpZztcblxuICAvKiogU2NhbGUgQ29uZmlnICovXG4gIHNjYWxlPzogU2NhbGVDb25maWc7XG5cbiAgLyoqIEF4aXMgQ29uZmlnICovXG4gIGF4aXM/OiBBeGlzQ29uZmlnO1xuXG4gIC8qKiBMZWdlbmQgQ29uZmlnICovXG4gIGxlZ2VuZD86IExlZ2VuZENvbmZpZztcblxuICAvKiogRmFjZXQgQ29uZmlnICovXG4gIGZhY2V0PzogRmFjZXRDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29uZmlnOiBDb25maWcgPSB7XG4gIG51bWJlckZvcm1hdDogJ3MnLFxuICB0aW1lRm9ybWF0OiAnJVktJW0tJWQnLFxuICBjb3VudFRpdGxlOiAnTnVtYmVyIG9mIFJlY29yZHMnLFxuXG4gIGNlbGw6IGRlZmF1bHRDZWxsQ29uZmlnLFxuICBtYXJrOiBkZWZhdWx0TWFya0NvbmZpZyxcbiAgb3ZlcmxheTogZGVmYXVsdE92ZXJsYXlDb25maWcsXG4gIHNjYWxlOiBkZWZhdWx0U2NhbGVDb25maWcsXG4gIGF4aXM6IGRlZmF1bHRBeGlzQ29uZmlnLFxuICBsZWdlbmQ6IGRlZmF1bHRMZWdlbmRDb25maWcsXG5cbiAgZmFjZXQ6IGRlZmF1bHRGYWNldENvbmZpZyxcbn07XG4iLCIvKlxuICogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGRhdGEuXG4gKi9cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhRm9ybWF0IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgaW5wdXQgZGF0YTogYFwianNvblwiYCwgYFwiY3N2XCJgLCBgXCJ0c3ZcImAuXG4gICAqIFRoZSBkZWZhdWx0IGZvcm1hdCB0eXBlIGlzIGRldGVybWluZWQgYnkgdGhlIGV4dGVuc2lvbiBvZiB0aGUgZmlsZSB1cmwuXG4gICAqIElmIG5vIGV4dGVuc2lvbiBpcyBkZXRlY3RlZCwgYFwianNvblwiYCB3aWxsIGJlIHVzZWQgYnkgZGVmYXVsdC5cbiAgICovXG4gIHR5cGU/OiBEYXRhRm9ybWF0VHlwZTtcblxuICAvKipcbiAgICogSlNPTiBvbmx5KSBUaGUgSlNPTiBwcm9wZXJ0eSBjb250YWluaW5nIHRoZSBkZXNpcmVkIGRhdGEuXG4gICAqIFRoaXMgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHdoZW4gdGhlIGxvYWRlZCBKU09OIGZpbGUgbWF5IGhhdmUgc3Vycm91bmRpbmcgc3RydWN0dXJlIG9yIG1ldGEtZGF0YS5cbiAgICogRm9yIGV4YW1wbGUgYFwicHJvcGVydHlcIjogXCJ2YWx1ZXMuZmVhdHVyZXNcImAgaXMgZXF1aXZhbGVudCB0byByZXRyaWV2aW5nIGBqc29uLnZhbHVlcy5mZWF0dXJlc2BcbiAgICogZnJvbSB0aGUgbG9hZGVkIEpTT04gb2JqZWN0LlxuICAgKi9cbiAgcHJvcGVydHk/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBUb3BvSlNPTiBvYmplY3Qgc2V0IHRvIGNvbnZlcnQgdG8gYSBHZW9KU09OIGZlYXR1cmUgY29sbGVjdGlvbi5cbiAgICogRm9yIGV4YW1wbGUsIGluIGEgbWFwIG9mIHRoZSB3b3JsZCwgdGhlcmUgbWF5IGJlIGFuIG9iamVjdCBzZXQgbmFtZWQgYFwiY291bnRyaWVzXCJgLlxuICAgKiBVc2luZyB0aGUgZmVhdHVyZSBwcm9wZXJ0eSwgd2UgY2FuIGV4dHJhY3QgdGhpcyBzZXQgYW5kIGdlbmVyYXRlIGEgR2VvSlNPTiBmZWF0dXJlIG9iamVjdCBmb3IgZWFjaCBjb3VudHJ5LlxuICAgKi9cbiAgZmVhdHVyZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBUb3BvSlNPTiBvYmplY3Qgc2V0IHRvIGNvbnZlcnQgdG8gYSBtZXNoLlxuICAgKiBTaW1pbGFyIHRvIHRoZSBgZmVhdHVyZWAgb3B0aW9uLCBgbWVzaGAgZXh0cmFjdHMgYSBuYW1lZCBUb3BvSlNPTiBvYmplY3Qgc2V0LlxuICAgKiAgVW5saWtlIHRoZSBgZmVhdHVyZWAgb3B0aW9uLCB0aGUgY29ycmVzcG9uZGluZyBnZW8gZGF0YSBpcyByZXR1cm5lZCBhcyBhIHNpbmdsZSwgdW5pZmllZCBtZXNoIGluc3RhbmNlLCBub3QgYXMgaW5pZGl2aWR1YWwgR2VvSlNPTiBmZWF0dXJlcy5cbiAgICogRXh0cmFjdGluZyBhIG1lc2ggaXMgdXNlZnVsIGZvciBtb3JlIGVmZmljaWVudGx5IGRyYXdpbmcgYm9yZGVycyBvciBvdGhlciBnZW9ncmFwaGljIGVsZW1lbnRzIHRoYXQgeW91IGRvIG5vdCBuZWVkIHRvIGFzc29jaWF0ZSB3aXRoIHNwZWNpZmljIHJlZ2lvbnMgc3VjaCBhcyBpbmRpdmlkdWFsIGNvdW50cmllcywgc3RhdGVzIG9yIGNvdW50aWVzLlxuICAgKi9cbiAgbWVzaD86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRGF0YUZvcm1hdFR5cGUge1xuICAgIEpTT04gPSAnanNvbicgYXMgYW55LFxuICAgIENTViA9ICdjc3YnIGFzIGFueSxcbiAgICBUU1YgPSAndHN2JyBhcyBhbnksXG4gICAgVE9QT0pTT04gPSAndG9wb2pzb24nIGFzIGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICAvKipcbiAgICogQW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIHRoZSBmb3JtYXQgZm9yIHRoZSBkYXRhIGZpbGUgb3IgdmFsdWVzLlxuICAgKi9cbiAgZm9ybWF0PzogRGF0YUZvcm1hdDtcblxuICAvKipcbiAgICogQSBVUkwgZnJvbSB3aGljaCB0byBsb2FkIHRoZSBkYXRhIHNldC4gVXNlIHRoZSBmb3JtYXQudHlwZSBwcm9wZXJ0eVxuICAgKiB0byBlbnN1cmUgdGhlIGxvYWRlZCBkYXRhIGlzIGNvcnJlY3RseSBwYXJzZWQuXG4gICAqL1xuICB1cmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQYXNzIGFycmF5IG9mIG9iamVjdHMgaW5zdGVhZCBvZiBhIHVybCB0byBhIGZpbGUuXG4gICAqL1xuICB2YWx1ZXM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGVudW0gRGF0YVRhYmxlIHtcbiAgU09VUkNFID0gJ3NvdXJjZScgYXMgYW55LFxuICBTVU1NQVJZID0gJ3N1bW1hcnknIGFzIGFueSxcbiAgU1RBQ0tFRF9TQ0FMRSA9ICdzdGFja2VkX3NjYWxlJyBhcyBhbnksXG4gIExBWU9VVCA9ICdsYXlvdXQnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgU1VNTUFSWSA9IERhdGFUYWJsZS5TVU1NQVJZO1xuZXhwb3J0IGNvbnN0IFNPVVJDRSA9IERhdGFUYWJsZS5TT1VSQ0U7XG5leHBvcnQgY29uc3QgU1RBQ0tFRF9TQ0FMRSA9IERhdGFUYWJsZS5TVEFDS0VEX1NDQUxFO1xuZXhwb3J0IGNvbnN0IExBWU9VVCA9IERhdGFUYWJsZS5MQVlPVVQ7XG5cbi8qKiBNYXBwaW5nIGZyb20gZGF0YWxpYidzIGluZmVycmVkIHR5cGUgdG8gVmVnYS1saXRlJ3MgdHlwZSAqL1xuLy8gVE9ETzogY29uc2lkZXIgaWYgd2UgY2FuIHJlbW92ZVxuZXhwb3J0IGNvbnN0IHR5cGVzID0ge1xuICAnYm9vbGVhbic6IFR5cGUuTk9NSU5BTCxcbiAgJ251bWJlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnaW50ZWdlcic6IFR5cGUuUVVBTlRJVEFUSVZFLFxuICAnZGF0ZSc6IFR5cGUuVEVNUE9SQUwsXG4gICdzdHJpbmcnOiBUeXBlLk5PTUlOQUxcbn07XG4iLCIvLyBEYXRlVGltZSBkZWZpbml0aW9uIG9iamVjdFxuXG5pbXBvcnQge2R1cGxpY2F0ZSwgaXNOdW1iZXJ9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogT2JqZWN0IGZvciBkZWZpbmluZyBkYXRldGltZSBpbiBWZWdhLUxpdGUgRmlsdGVyLlxuICogSWYgYm90aCBtb250aCBhbmQgcXVhcnRlciBhcmUgcHJvdmlkZWQsIG1vbnRoIGhhcyBoaWdoZXIgcHJlY2VkZW5jZS5cbiAqIGBkYXlgIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIG90aGVyIGRhdGUuXG4gKiBXZSBhY2NlcHQgc3RyaW5nIGZvciBtb250aCBhbmQgZGF5IG5hbWVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lIHtcbiAgLyoqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSB5ZWFyLiAqL1xuICB5ZWFyPzogbnVtYmVyO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgcXVhcnRlciBvZiB0aGUgeWVhciAoZnJvbSAxLTQpLiAqL1xuICBxdWFydGVyPzogbnVtYmVyO1xuXG4gIC8qKiBPbmUgb2Y6ICgxKSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgbW9udGggZnJvbSBgMWAtYDEyYC4gYDFgIHJlcHJlc2VudHMgSmFudWFyeTsgICgyKSBjYXNlLWluc2Vuc2l0aXZlIG1vbnRoIG5hbWUgKGUuZy4sIGBcIkphbnVhcnlcImApOyAgKDMpIGNhc2UtaW5zZW5zaXRpdmUsIDMtY2hhcmFjdGVyIHNob3J0IG1vbnRoIG5hbWUgKGUuZy4sIGBcIkphblwiYCkuICovXG4gIG1vbnRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgZGF0ZSBmcm9tIDEtMzEuICovXG4gIGRhdGU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFZhbHVlIHJlcHJlc2VudGluZyB0aGUgZGF5IG9mIHdlZWsuICBUaGlzIGNhbiBiZSBvbmUgb2Y6ICgxKSBpbnRlZ2VyIHZhbHVlIC0tIGAxYCByZXByZXNlbnRzIE1vbmRheTsgKDIpIGNhc2UtaW5zZW5zaXRpdmUgZGF5IG5hbWUgKGUuZy4sIGBcIk1vbmRheVwiYCk7ICAoMykgY2FzZS1pbnNlbnNpdGl2ZSwgMy1jaGFyYWN0ZXIgc2hvcnQgZGF5IG5hbWUgKGUuZy4sIGBcIk1vblwiYCkuICAgPGJyLz4gKipXYXJuaW5nOioqIEEgRGF0ZVRpbWUgZGVmaW5pdGlvbiBvYmplY3Qgd2l0aCBgZGF5YCoqIHNob3VsZCBub3QgYmUgY29tYmluZWQgd2l0aCBgeWVhcmAsIGBxdWFydGVyYCwgYG1vbnRoYCwgb3IgYGRhdGVgLlxuICAgKi9cbiAgZGF5PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgaG91ciBvZiBkYXkgZnJvbSAwLTIzLiAqL1xuICBob3Vycz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgbWludXRlIHNlZ21lbnQgb2YgYSB0aW1lIGZyb20gMC01OS4gKi9cbiAgbWludXRlcz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgc2Vjb25kIHNlZ21lbnQgb2YgYSB0aW1lIGZyb20gMC01OS4gKi9cbiAgc2Vjb25kcz86IG51bWJlcjtcblxuICAvKiogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgbWlsbGlzZWNvbmQgc2VnbWVudCBvZiBhIHRpbWUuICovXG4gIG1pbGxpc2Vjb25kcz86IG51bWJlcjtcbn1cblxuXG4vKipcbiAqIEludGVybmFsIE9iamVjdCBmb3IgZGVmaW5pbmcgZGF0ZXRpbWUgZXhwcmVzc2lvbnMuXG4gKiBUaGlzIGlzIGFuIGV4cHJlc3Npb24gdmVyc2lvbiBvZiBEYXRlVGltZS5cbiAqIElmIGJvdGggbW9udGggYW5kIHF1YXJ0ZXIgYXJlIHByb3ZpZGVkLCBtb250aCBoYXMgaGlnaGVyIHByZWNlZGVuY2UuXG4gKiBgZGF5YCBjYW5ub3QgYmUgY29tYmluZWQgd2l0aCBvdGhlciBkYXRlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lRXhwciB7XG4gIHllYXI/OiBzdHJpbmc7XG4gIHF1YXJ0ZXI/OiBzdHJpbmc7XG4gIG1vbnRoPzogc3RyaW5nO1xuICBkYXRlPzogc3RyaW5nO1xuICBkYXk/OiBzdHJpbmc7XG4gIGhvdXJzPzogc3RyaW5nO1xuICBtaW51dGVzPzogc3RyaW5nO1xuICBzZWNvbmRzPzogc3RyaW5nO1xuICBtaWxsaXNlY29uZHM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVUaW1lKG86IGFueSk6IG8gaXMgRGF0ZVRpbWUge1xuICByZXR1cm4gISFvLnllYXIgfHwgISFvLnF1YXJ0ZXIgfHwgISFvLm1vbnRoIHx8ICEhby5kYXRlIHx8ICEhby5kYXkgfHxcbiAgICAhIW8uaG91cnMgfHwgISFvLm1pbnV0ZXMgfHwgISFvLnNlY29uZHMgfHwgISFvLm1pbGxpc2Vjb25kcztcbn1cblxuZXhwb3J0IGNvbnN0IE1PTlRIUyA9IFsnamFudWFyeScsICdmZWJydWFyeScsICdtYXJjaCcsICdhcHJpbCcsICdtYXknLCAnanVuZScsICdqdWx5JywgJ2F1Z3VzdCcsICdzZXB0ZW1iZXInLCAnb2N0b2JlcicsICdub3ZlbWJlcicsICdkZWNlbWJlciddO1xuZXhwb3J0IGNvbnN0IFNIT1JUX01PTlRIUyA9IE1PTlRIUy5tYXAoKG0pID0+IG0uc3Vic3RyKDAsIDMpKTtcblxuZXhwb3J0IGNvbnN0IERBWVMgPSBbJ3N1bmRheScsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5J107XG5leHBvcnQgY29uc3QgU0hPUlRfREFZUyA9IERBWVMubWFwKChkKSA9PiBkLnN1YnN0cigwLDMpKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplUXVhcnRlcihxOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgaWYgKGlzTnVtYmVyKHEpKSB7XG4gICAgLy8gV2UgYWNjZXB0IDEtYmFzZWQgcXVhcnRlciwgc28gbmVlZCB0byByZWFkanVzdCB0byAwLWJhc2VkIHF1YXJ0ZXJcbiAgICByZXR1cm4gKHEgLSAxKSArICcnO1xuICB9IGVsc2Uge1xuICAgIC8vIFNpbXBseSBhbiBleHByZXNzaW9uIHN0cmluZywgYnV0IG5vcm1hbGl6ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiB0aGlzIGNhc2UuXG4gICAgY29uc29sZS53YXJuKCdQb3RlbnRpYWxseSBpbnZhbGlkIHF1YXJ0ZXInLCBxKTtcbiAgICByZXR1cm4gcTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb250aChtOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKGlzTnVtYmVyKG0pKSB7XG4gICAgLy8gV2UgYWNjZXB0IDEtYmFzZWQgbW9udGgsIHNvIG5lZWQgdG8gcmVhZGp1c3QgdG8gMC1iYXNlZCBtb250aFxuICAgIHJldHVybiAobSAtIDEpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG93ZXJNID0gbS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IG1vbnRoSW5kZXggPSBNT05USFMuaW5kZXhPZihsb3dlck0pO1xuICAgIGlmIChtb250aEluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1vbnRoSW5kZXggKyAnJzsgLy8gMCBmb3IgamFudWFyeSwgLi4uXG4gICAgfVxuICAgIGNvbnN0IHNob3J0TSA9IGxvd2VyTS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3Qgc2hvcnRNb250aEluZGV4ID0gU0hPUlRfTU9OVEhTLmluZGV4T2Yoc2hvcnRNKTtcbiAgICBpZiAoc2hvcnRNb250aEluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHNob3J0TW9udGhJbmRleCArICcnO1xuICAgIH1cbiAgICAvLyBTaW1wbHkgYW4gZXhwcmVzc2lvbiBzdHJpbmcsIGJ1dCBub3JtYWxpemUgc2hvdWxkIG5vdCBiZSBjYWxsZWQgaW4gdGhpcyBjYXNlLlxuICAgIGNvbnNvbGUud2FybignUG90ZW50aWFsbHkgaW52YWxpZCBtb250aCcsIG0pO1xuICAgIHJldHVybiBtO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURheShkOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKGlzTnVtYmVyKGQpKSB7XG4gICAgLy8gbW9kIHNvIHRoYXQgdGhpcyBjYW4gYmUgYm90aCAwLWJhc2VkIHdoZXJlIDAgPSBzdW5kYXlcbiAgICAvLyBhbmQgMS1iYXNlZCB3aGVyZSA3PXN1bmRheVxuICAgIHJldHVybiAoZCAlIDcpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG93ZXJEID0gZC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRheUluZGV4ID0gREFZUy5pbmRleE9mKGxvd2VyRCk7XG4gICAgaWYgKGRheUluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGRheUluZGV4ICsgJyc7IC8vIDAgZm9yIGphbnVhcnksIC4uLlxuICAgIH1cbiAgICBjb25zdCBzaG9ydEQgPSBsb3dlckQuc3Vic3RyKDAsIDMpO1xuICAgIGNvbnN0IHNob3J0RGF5SW5kZXggPSBTSE9SVF9EQVlTLmluZGV4T2Yoc2hvcnREKTtcbiAgICBpZiAoc2hvcnREYXlJbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBzaG9ydERheUluZGV4ICsgJyc7XG4gICAgfVxuICAgIC8vIFNpbXBseSBhbiBleHByZXNzaW9uIHN0cmluZywgYnV0IG5vcm1hbGl6ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBpbiB0aGlzIGNhc2UuXG4gICAgY29uc29sZS53YXJuKCdQb3RlbnRpYWxseSBpbnZhbGlkIGRheScsIGQpO1xuICAgIHJldHVybiBkO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIFZlZ2EgRXhwcmVzc2lvbiBmb3IgYSBwYXJ0aWN1bGFyIGRhdGUgdGltZS5cbiAqIEBwYXJhbSBkXG4gKiBAcGFyYW0gbm9ybWFsaXplIHdoZXRoZXIgdG8gbm9ybWFsaXplIHF1YXJ0ZXIsIG1vbnRoLCBkYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRlVGltZUV4cHIoZDogRGF0ZVRpbWUgfCBEYXRlVGltZUV4cHIsIG5vcm1hbGl6ZSA9IGZhbHNlKSB7XG4gIGNvbnN0IHVuaXRzID0gW107XG5cbiAgaWYgKG5vcm1hbGl6ZSAmJiBkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdW5pdCBvZiBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICdkYXRlJ10pIHtcbiAgICAgIGlmIChkW3VuaXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEcm9wcGluZyBkYXkgZnJvbSBkYXRldGltZScsIEpTT04uc3RyaW5naWZ5KGQpLFxuICAgICAgICAgICdhcyBkYXkgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGgnLCB1bml0KTtcbiAgICAgICAgZCA9IGR1cGxpY2F0ZShkKTtcbiAgICAgICAgZGVsZXRlIGQuZGF5O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZC55ZWFyICE9PSB1bmRlZmluZWQpIHtcbiAgICB1bml0cy5wdXNoKGQueWVhcik7XG4gIH0gZWxzZSBpZiAoZC5kYXkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFNldCB5ZWFyIHRvIDIwMDYgZm9yIHdvcmtpbmcgd2l0aCBkYXkgc2luY2UgSmFudWFyeSAxIDIwMDYgaXMgYSBTdW5kYXlcbiAgICB1bml0cy5wdXNoKDIwMDYpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7XG4gIH1cblxuICBpZiAoZC5tb250aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbW9udGggPSBub3JtYWxpemUgPyBub3JtYWxpemVNb250aChkLm1vbnRoKSA6IGQubW9udGg7XG4gICAgdW5pdHMucHVzaChtb250aCk7XG4gIH0gZWxzZSBpZiAoZC5xdWFydGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBxdWFydGVyID0gbm9ybWFsaXplID8gbm9ybWFsaXplUXVhcnRlcihkLnF1YXJ0ZXIpIDogZC5xdWFydGVyO1xuICAgIHVuaXRzLnB1c2gocXVhcnRlciArICcqMycpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7IC8vIG1vbnRocyBzdGFydCBhdCB6ZXJvIGluIEpTXG4gIH1cblxuICBpZiAoZC5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1bml0cy5wdXNoKGQuZGF0ZSk7XG4gIH0gZWxzZSBpZiAoZC5kYXkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEhBQ0s6IERheSBvbmx5IHdvcmtzIGFzIGEgc3RhbmRhbG9uZSB1bml0XG4gICAgLy8gVGhpcyBpcyBvbmx5IGNvcnJlY3QgYmVjYXVzZSB3ZSBhbHdheXMgc2V0IHllYXIgdG8gMjAwNiBmb3IgZGF5XG4gICAgY29uc3QgZGF5ID0gbm9ybWFsaXplID8gbm9ybWFsaXplRGF5KGQuZGF5KSA6IGQuZGF5O1xuICAgIHVuaXRzLnB1c2goZGF5ICsgJysxJyk7XG4gIH0gZWxzZSB7XG4gICAgdW5pdHMucHVzaCgxKTsgLy8gRGF0ZSBzdGFydHMgYXQgMSBpbiBKU1xuICB9XG5cbiAgLy8gTm90ZTogY2FuJ3QgdXNlIFRpbWVVbml0IGVudW0gaGVyZSBhcyBpbXBvcnRpbmcgaXQgd2lsbCBjcmVhdGVcbiAgLy8gY2lyY3VsYXIgZGVwZW5kZW5jeSBwcm9ibGVtIVxuICBmb3IgKGxldCB0aW1lVW5pdCBvZiBbJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcycsICdtaWxsaXNlY29uZHMnXSkge1xuICAgIGlmIChkW3RpbWVVbml0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB1bml0cy5wdXNoKGRbdGltZVVuaXRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdW5pdHMucHVzaCgwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJ2RhdGV0aW1lKCcgKyB1bml0cy5qb2luKCcsICcpICsgJyknO1xufVxuIiwiLy8gdXRpbGl0eSBmb3IgZW5jb2RpbmcgbWFwcGluZ1xuaW1wb3J0IHtGaWVsZERlZiwgUG9zaXRpb25DaGFubmVsRGVmLCBGYWNldENoYW5uZWxEZWYsIENoYW5uZWxEZWZXaXRoTGVnZW5kLCBPcmRlckNoYW5uZWxEZWZ9IGZyb20gJy4vZmllbGRkZWYnO1xuaW1wb3J0IHtDaGFubmVsLCBDSEFOTkVMU30gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7aXNBcnJheSwgc29tZX0gZnJvbSAnLi91dGlsJztcblxuLy8gVE9ETzogb25jZSB3ZSBkZWNvbXBvc2UgZmFjZXQsIHJlbmFtZSB0aGlzIHRvIEVuY29kaW5nXG5leHBvcnQgaW50ZXJmYWNlIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBYIGNvb3JkaW5hdGVzIGZvciBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsXG4gICAqIGBsaW5lYCwgYHJ1bGVgLCBgdGV4dGAsIGFuZCBgdGlja2BcbiAgICogKG9yIHRvIHdpZHRoIGFuZCBoZWlnaHQgZm9yIGBiYXJgIGFuZCBgYXJlYWAgbWFya3MpLlxuICAgKi9cbiAgeD86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWSBjb29yZGluYXRlcyBmb3IgYHBvaW50YCwgYGNpcmNsZWAsIGBzcXVhcmVgLFxuICAgKiBgbGluZWAsIGBydWxlYCwgYHRleHRgLCBhbmQgYHRpY2tgXG4gICAqIChvciB0byB3aWR0aCBhbmQgaGVpZ2h0IGZvciBgYmFyYCBhbmQgYGFyZWFgIG1hcmtzKS5cbiAgICovXG4gIHk/OiBQb3NpdGlvbkNoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIFgyIGNvb3JkaW5hdGVzIGZvciByYW5nZWQgYGJhcmAsIGBydWxlYCwgYGFyZWFgXG4gICAqL1xuICB4Mj86IFBvc2l0aW9uQ2hhbm5lbERlZjtcblxuICAvKipcbiAgICogWTIgY29vcmRpbmF0ZXMgZm9yIHJhbmdlZCBgYmFyYCwgYHJ1bGVgLCBgYXJlYWBcbiAgICovXG4gIHkyPzogUG9zaXRpb25DaGFubmVsRGVmO1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgbWFya3Mg4oCTIGVpdGhlciBmaWxsIG9yIHN0cm9rZSBjb2xvciBiYXNlZCBvbiBtYXJrIHR5cGUuXG4gICAqIChCeSBkZWZhdWx0LCBmaWxsIGNvbG9yIGZvciBgYXJlYWAsIGBiYXJgLCBgdGlja2AsIGB0ZXh0YCwgYGNpcmNsZWAsIGFuZCBgc3F1YXJlYCAvXG4gICAqIHN0cm9rZSBjb2xvciBmb3IgYGxpbmVgIGFuZCBgcG9pbnRgLilcbiAgICovXG4gIGNvbG9yPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG4gIC8qKlxuICAgKiBPcGFjaXR5IG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGNhbiBiZSBhIHZhbHVlIG9yIGluIGEgcmFuZ2UuXG4gICAqL1xuICBvcGFjaXR5PzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIG1hcmsuXG4gICAqIC0gRm9yIGBwb2ludGAsIGBzcXVhcmVgIGFuZCBgY2lyY2xlYFxuICAgKiDigJMgdGhlIHN5bWJvbCBzaXplLCBvciBwaXhlbCBhcmVhIG9mIHRoZSBtYXJrLlxuICAgKiAtIEZvciBgYmFyYCBhbmQgYHRpY2tgIOKAkyB0aGUgYmFyIGFuZCB0aWNrJ3Mgc2l6ZS5cbiAgICogLSBGb3IgYHRleHRgIOKAkyB0aGUgdGV4dCdzIGZvbnQgc2l6ZS5cbiAgICogLSBTaXplIGlzIGN1cnJlbnRseSB1bnN1cHBvcnRlZCBmb3IgYGxpbmVgIGFuZCBgYXJlYWAuXG4gICAqL1xuICBzaXplPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7XG5cbiAgLyoqXG4gICAqIFRoZSBzeW1ib2wncyBzaGFwZSAob25seSBmb3IgYHBvaW50YCBtYXJrcykuIFRoZSBzdXBwb3J0ZWQgdmFsdWVzIGFyZVxuICAgKiBgXCJjaXJjbGVcImAgKGRlZmF1bHQpLCBgXCJzcXVhcmVcImAsIGBcImNyb3NzXCJgLCBgXCJkaWFtb25kXCJgLCBgXCJ0cmlhbmdsZS11cFwiYCxcbiAgICogb3IgYFwidHJpYW5nbGUtZG93blwiYC5cbiAgICovXG4gIHNoYXBlPzogQ2hhbm5lbERlZldpdGhMZWdlbmQ7IC8vIFRPRE86IG1heWJlIGRpc3Rpbmd1aXNoIG9yZGluYWwtb25seVxuXG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGxldmVscyBvZiBkZXRhaWwgZm9yIGdyb3VwaW5nIGRhdGEgaW4gYWdncmVnYXRlIHZpZXdzIGFuZFxuICAgKiBpbiBsaW5lIGFuZCBhcmVhIG1hcmtzIHdpdGhvdXQgbWFwcGluZyBkYXRhIHRvIGEgc3BlY2lmaWMgdmlzdWFsIGNoYW5uZWwuXG4gICAqL1xuICBkZXRhaWw/OiBGaWVsZERlZiB8IEZpZWxkRGVmW107XG5cbiAgLyoqXG4gICAqIFRleHQgb2YgdGhlIGB0ZXh0YCBtYXJrLlxuICAgKi9cbiAgdGV4dD86IEZpZWxkRGVmO1xuXG4gIGxhYmVsPzogRmllbGREZWY7XG5cbiAgLyoqXG4gICAqIE9yZGVyIG9mIGRhdGEgcG9pbnRzIGluIGxpbmUgbWFya3MuXG4gICAqL1xuICBwYXRoPzogT3JkZXJDaGFubmVsRGVmIHwgT3JkZXJDaGFubmVsRGVmW107XG5cbiAgLyoqXG4gICAqIExheWVyIG9yZGVyIGZvciBub24tc3RhY2tlZCBtYXJrcywgb3Igc3RhY2sgb3JkZXIgZm9yIHN0YWNrZWQgbWFya3MuXG4gICAqL1xuICBvcmRlcj86IE9yZGVyQ2hhbm5lbERlZiB8IE9yZGVyQ2hhbm5lbERlZltdO1xufVxuXG4vLyBUT0RPOiBvbmNlIHdlIGRlY29tcG9zZSBmYWNldCwgcmVuYW1lIHRoaXMgdG8gRXh0ZW5kZWRFbmNvZGluZ1xuZXhwb3J0IGludGVyZmFjZSBFbmNvZGluZyBleHRlbmRzIFVuaXRFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBWZXJ0aWNhbCBmYWNldHMgZm9yIHRyZWxsaXMgcGxvdHMuXG4gICAqL1xuICByb3c/OiBGYWNldENoYW5uZWxEZWY7XG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgZmFjZXRzIGZvciB0cmVsbGlzIHBsb3RzLlxuICAgKi9cbiAgY29sdW1uPzogRmFjZXRDaGFubmVsRGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY291bnRSZXRpbmFsKGVuY29kaW5nOiBFbmNvZGluZykge1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZW5jb2RpbmcuY29sb3IpIHsgY291bnQrKzsgfVxuICBpZiAoZW5jb2Rpbmcub3BhY2l0eSkgeyBjb3VudCsrOyB9XG4gIGlmIChlbmNvZGluZy5zaXplKSB7IGNvdW50Kys7IH1cbiAgaWYgKGVuY29kaW5nLnNoYXBlKSB7IGNvdW50Kys7IH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbHMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gIHJldHVybiBDSEFOTkVMUy5maWx0ZXIoZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBoYXMoZW5jb2RpbmcsIGNoYW5uZWwpO1xuICB9KTtcbn1cblxuLy8gVE9EOiByZW5hbWUgdGhpcyB0byBoYXNDaGFubmVsRmllbGQgYW5kIG9ubHkgdXNlIHdlIHJlYWxseSB3YW50IGl0LlxuZXhwb3J0IGZ1bmN0aW9uIGhhcyhlbmNvZGluZzogRW5jb2RpbmcsIGNoYW5uZWw6IENoYW5uZWwpOiBib29sZWFuIHtcbiAgY29uc3QgY2hhbm5lbEVuY29kaW5nID0gZW5jb2RpbmcgJiYgZW5jb2RpbmdbY2hhbm5lbF07XG4gIHJldHVybiBjaGFubmVsRW5jb2RpbmcgJiYgKFxuICAgIGNoYW5uZWxFbmNvZGluZy5maWVsZCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gVE9ETzogY2hlY2sgdGhhdCB3ZSBoYXZlIGZpZWxkIGluIHRoZSBhcnJheVxuICAgIChpc0FycmF5KGNoYW5uZWxFbmNvZGluZykgJiYgY2hhbm5lbEVuY29kaW5nLmxlbmd0aCA+IDApXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZ3JlZ2F0ZShlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgcmV0dXJuIHNvbWUoQ0hBTk5FTFMsIChjaGFubmVsKSA9PiB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkgJiYgZW5jb2RpbmdbY2hhbm5lbF0uYWdncmVnYXRlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VkKGVuY29kaW5nOiBFbmNvZGluZykge1xuICByZXR1cm4gZW5jb2RpbmcgJiYgKCghIWVuY29kaW5nLnggJiYgISFlbmNvZGluZy54MikgfHwgKCEhZW5jb2RpbmcueSAmJiAhIWVuY29kaW5nLnkyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nKTogRmllbGREZWZbXSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgQ0hBTk5FTFMuZm9yRWFjaChmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KGVuY29kaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBlbmNvZGluZ1tjaGFubmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkRGVmKSB7XG4gICAgICAgICAgYXJyLnB1c2goZmllbGREZWYpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5wdXNoKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55KSB7XG4gIGNoYW5uZWxNYXBwaW5nRm9yRWFjaChDSEFOTkVMUywgZW5jb2RpbmcsIGYsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdGb3JFYWNoKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmLCBjOiBDaGFubmVsLCBpOiBudW1iZXIpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgaSA9IDA7XG4gIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgZi5jYWxsKHRoaXNBcmcsIGZpZWxkRGVmLCBjaGFubmVsLCBpKyspO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGYuY2FsbCh0aGlzQXJnLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsLCBpKyspO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAoZW5jb2Rpbmc6IEVuY29kaW5nLFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgcmV0dXJuIGNoYW5uZWxNYXBwaW5nTWFwKENIQU5ORUxTLCBlbmNvZGluZywgZiAsIHRoaXNBcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbm5lbE1hcHBpbmdNYXAoY2hhbm5lbHM6IENoYW5uZWxbXSwgbWFwcGluZzogYW55LFxuICAgIGY6IChmZDogRmllbGREZWYsIGM6IENoYW5uZWwsIGk6IG51bWJlcikgPT4gYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpIHtcbiAgbGV0IGFyciA9IFtdO1xuICBjaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoaGFzKG1hcHBpbmcsIGNoYW5uZWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShtYXBwaW5nW2NoYW5uZWxdKSkge1xuICAgICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oZmllbGREZWYpIHtcbiAgICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGVuY29kaW5nOiBFbmNvZGluZyxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICByZXR1cm4gY2hhbm5lbE1hcHBpbmdSZWR1Y2UoQ0hBTk5FTFMsIGVuY29kaW5nLCBmLCBpbml0LCB0aGlzQXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5uZWxNYXBwaW5nUmVkdWNlKGNoYW5uZWxzOiBDaGFubmVsW10sIG1hcHBpbmc6IGFueSxcbiAgICBmOiAoYWNjOiBhbnksIGZkOiBGaWVsZERlZiwgYzogQ2hhbm5lbCkgPT4gYW55LFxuICAgIGluaXQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBsZXQgciA9IGluaXQ7XG4gIENIQU5ORUxTLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIGlmIChoYXMobWFwcGluZywgY2hhbm5lbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICAgIG1hcHBpbmdbY2hhbm5lbF0uZm9yRWFjaChmdW5jdGlvbihmaWVsZERlZikge1xuICAgICAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBmaWVsZERlZiwgY2hhbm5lbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgciA9IGYuY2FsbCh0aGlzQXJnLCByLCBtYXBwaW5nW2NoYW5uZWxdLCBjaGFubmVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcjtcbn1cbiIsIi8vIHV0aWxpdHkgZm9yIGEgZmllbGQgZGVmaW5pdGlvbiBvYmplY3RcblxuaW1wb3J0IHtBZ2dyZWdhdGVPcCwgQUdHUkVHQVRFX09QU30gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtBeGlzfSBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtCaW59IGZyb20gJy4vYmluJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0xlZ2VuZH0gZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHtTY2FsZSwgU2NhbGVUeXBlfSBmcm9tICcuL3NjYWxlJztcbmltcG9ydCB7U29ydEZpZWxkLCBTb3J0T3JkZXJ9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7VHlwZSwgTk9NSU5BTCwgT1JESU5BTCwgUVVBTlRJVEFUSVZFLCBURU1QT1JBTH0gZnJvbSAnLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGdldGJpbnMsIHRvTWFwfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqICBJbnRlcmZhY2UgZm9yIGFueSBraW5kIG9mIEZpZWxkRGVmO1xuICogIEZvciBzaW1wbGljaXR5LCB3ZSBkbyBub3QgZGVjbGFyZSBtdWx0aXBsZSBpbnRlcmZhY2VzIG9mIEZpZWxkRGVmIGxpa2VcbiAqICB3ZSBkbyBmb3IgSlNPTiBzY2hlbWEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGREZWYge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZmllbGQgZnJvbSB3aGljaCB0byBwdWxsIGEgZGF0YSB2YWx1ZS5cbiAgICovXG4gIGZpZWxkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RlZCBmaWVsZCdzIHR5cGUgb2YgbWVhc3VyZW1lbnQuIFRoaXMgY2FuIGJlIGVpdGhlciBhIGZ1bGwgdHlwZVxuICAgKiBuYW1lIChgXCJxdWFudGl0YXRpdmVcImAsIGBcInRlbXBvcmFsXCJgLCBgXCJvcmRpbmFsXCJgLCAgYW5kIGBcIm5vbWluYWxcImApXG4gICAqIG9yIGFuIGluaXRpYWwgY2hhcmFjdGVyIG9mIHRoZSB0eXBlIG5hbWUgKGBcIlFcImAsIGBcIlRcImAsIGBcIk9cImAsIGBcIk5cImApLlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGNhc2UgaW5zZW5zaXRpdmUuXG4gICAqL1xuICB0eXBlPzogVHlwZTtcblxuICAvKipcbiAgICogQSBjb25zdGFudCB2YWx1ZSBpbiB2aXN1YWwgZG9tYWluLlxuICAgKi9cbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuO1xuXG4gIC8vIGZ1bmN0aW9uXG5cbiAgLyoqXG4gICAqIFRpbWUgdW5pdCBmb3IgYSBgdGVtcG9yYWxgIGZpZWxkICAoZS5nLiwgYHllYXJgLCBgeWVhcm1vbnRoYCwgYG1vbnRoYCwgYGhvdXJgKS5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZsYWcgZm9yIGJpbm5pbmcgYSBgcXVhbnRpdGF0aXZlYCBmaWVsZCwgb3IgYSBiaW4gcHJvcGVydHkgb2JqZWN0XG4gICAqIGZvciBiaW5uaW5nIHBhcmFtZXRlcnMuXG4gICAqL1xuICBiaW4/OiBib29sZWFuIHwgQmluO1xuXG4gIC8qKlxuICAgKiBBZ2dyZWdhdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGZpZWxkXG4gICAqIChlLmcuLCBgbWVhbmAsIGBzdW1gLCBgbWVkaWFuYCwgYG1pbmAsIGBtYXhgLCBgY291bnRgKS5cbiAgICovXG4gIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0ZU9wO1xuXG4gIC8qKlxuICAgKiBUaXRsZSBmb3IgYXhpcyBvciBsZWdlbmQuXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGFnZ3JlZ2F0ZSA9IHtcbiAgdHlwZTogJ3N0cmluZycsXG4gIGVudW06IEFHR1JFR0FURV9PUFMsXG4gIHN1cHBvcnRlZEVudW1zOiB7XG4gICAgcXVhbnRpdGF0aXZlOiBBR0dSRUdBVEVfT1BTLFxuICAgIG9yZGluYWw6IFsnbWVkaWFuJywnbWluJywnbWF4J10sXG4gICAgbm9taW5hbDogW10sXG4gICAgdGVtcG9yYWw6IFsnbWVhbicsICdtZWRpYW4nLCAnbWluJywgJ21heCddLCAvLyBUT0RPOiByZXZpc2Ugd2hhdCBzaG91bGQgdGltZSBzdXBwb3J0XG4gICAgJyc6IFsnY291bnQnXVxuICB9LFxuICBzdXBwb3J0ZWRUeXBlczogdG9NYXAoW1FVQU5USVRBVElWRSwgTk9NSU5BTCwgT1JESU5BTCwgVEVNUE9SQUwsICcnXSlcbn07XG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWxEZWZXaXRoU2NhbGUgZXh0ZW5kcyBGaWVsZERlZiB7XG4gIHNjYWxlPzogU2NhbGU7XG4gIHNvcnQ/OiBTb3J0RmllbGQgfCBTb3J0T3JkZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25DaGFubmVsRGVmIGV4dGVuZHMgQ2hhbm5lbERlZldpdGhTY2FsZSB7XG4gIGF4aXM/OiBib29sZWFuIHwgQXhpcztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbERlZldpdGhMZWdlbmQgZXh0ZW5kcyBDaGFubmVsRGVmV2l0aFNjYWxlIHtcbiAgbGVnZW5kPzogTGVnZW5kO1xufVxuXG4vLyBEZXRhaWxcblxuLy8gT3JkZXIgUGF0aCBoYXZlIG5vIHNjYWxlXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JkZXJDaGFubmVsRGVmIGV4dGVuZHMgRmllbGREZWYge1xuICBzb3J0PzogU29ydE9yZGVyO1xufVxuXG4vLyBUT0RPOiBjb25zaWRlciBpZiB3ZSB3YW50IHRvIGRpc3Rpbmd1aXNoIG9yZGluYWxPbmx5U2NhbGUgZnJvbSBzY2FsZVxuZXhwb3J0IHR5cGUgRmFjZXRDaGFubmVsRGVmID0gUG9zaXRpb25DaGFubmVsRGVmO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkUmVmT3B0aW9uIHtcbiAgLyoqIGV4Y2x1ZGUgYmluLCBhZ2dyZWdhdGUsIHRpbWVVbml0ICovXG4gIG5vZm4/OiBib29sZWFuO1xuICAvKiogZXhjbHVkZSBhZ2dyZWdhdGlvbiBmdW5jdGlvbiAqL1xuICBub0FnZ3JlZ2F0ZT86IGJvb2xlYW47XG4gIC8qKiBXcmFwIHRoZSBmaWVsZCBpbnNpZGUgZGF0dW1bLi4uXSBwZXIgVmVnYSBjb252ZW50aW9uICovXG4gIGRhdHVtPzogYm9vbGVhbjtcbiAgLyoqIHJlcGxhY2UgZm4gd2l0aCBjdXN0b20gZnVuY3Rpb24gcHJlZml4ICovXG4gIGZuPzogc3RyaW5nO1xuICAvKiogcHJlcGVuZCBmbiB3aXRoIGN1c3RvbSBmdW5jdGlvbiBwcmVmaXggKi9cbiAgcHJlZml4Pzogc3RyaW5nO1xuICAvKiogc2NhbGVUeXBlICovXG4gIHNjYWxlVHlwZT86IFNjYWxlVHlwZTtcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiBmb3IgYmluIChkZWZhdWx0PSdzdGFydCcpICovXG4gIGJpblN1ZmZpeD86IHN0cmluZztcbiAgLyoqIGFwcGVuZCBzdWZmaXggdG8gdGhlIGZpZWxkIHJlZiAoZ2VuZXJhbCkgKi9cbiAgc3VmZml4Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGQoZmllbGREZWY6IEZpZWxkRGVmLCBvcHQ6IEZpZWxkUmVmT3B0aW9uID0ge30pIHtcbiAgbGV0IGZpZWxkID0gZmllbGREZWYuZmllbGQ7XG4gIGxldCBwcmVmaXggPSBvcHQucHJlZml4O1xuICBsZXQgc3VmZml4ID0gb3B0LnN1ZmZpeDtcblxuICBpZiAoaXNDb3VudChmaWVsZERlZikpIHtcbiAgICBmaWVsZCA9ICdjb3VudCc7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGZuID0gb3B0LmZuO1xuXG4gICAgaWYgKCFvcHQubm9mbikge1xuICAgICAgaWYgKGZpZWxkRGVmLmJpbikge1xuICAgICAgICBmbiA9ICdiaW4nO1xuXG4gICAgICAgIHN1ZmZpeCA9IG9wdC5iaW5TdWZmaXggfHwgKFxuICAgICAgICAgIG9wdC5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5PUkRJTkFMID9cbiAgICAgICAgICAgIC8vIEZvciBvcmRpbmFsIHNjYWxlIHR5cGUsIHVzZSBgcmFuZ2VgIGFzIHN1ZmZpeC5cbiAgICAgICAgICAgICdyYW5nZScgOlxuICAgICAgICAgICAgLy8gRm9yIG5vbi1vcmRpbmFsIHNjYWxlIG9yIHVua25vd24sIHVzZSBgc3RhcnRgIGFzIHN1ZmZpeC5cbiAgICAgICAgICAgICdzdGFydCdcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wdC5ub0FnZ3JlZ2F0ZSAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgZm4gPSBTdHJpbmcoZmllbGREZWYuYWdncmVnYXRlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmllbGREZWYudGltZVVuaXQpIHtcbiAgICAgICAgZm4gPSBTdHJpbmcoZmllbGREZWYudGltZVVuaXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghIWZuKSB7XG4gICAgICBmaWVsZCA9IGAke2ZufV8ke2ZpZWxkfWA7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEhc3VmZml4KSB7XG4gICAgZmllbGQgPSBgJHtmaWVsZH1fJHtzdWZmaXh9YDtcbiAgfVxuXG4gIGlmICghIXByZWZpeCkge1xuICAgIGZpZWxkID0gYCR7cHJlZml4fV8ke2ZpZWxkfWA7XG4gIH1cblxuICBpZiAob3B0LmRhdHVtKSB7XG4gICAgZmllbGQgPSBgZGF0dW1bXCIke2ZpZWxkfVwiXWA7XG4gIH1cblxuICByZXR1cm4gZmllbGQ7XG59XG5cbmZ1bmN0aW9uIF9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gY29udGFpbnMoW05PTUlOQUwsIE9SRElOQUxdLCBmaWVsZERlZi50eXBlKSB8fCAhIWZpZWxkRGVmLmJpbiB8fFxuICAgIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiAhIWZpZWxkRGVmLnRpbWVVbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGltZW5zaW9uKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgX2lzRmllbGREaW1lbnNpb24oZmllbGREZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNZWFzdXJlKGZpZWxkRGVmOiBGaWVsZERlZikge1xuICByZXR1cm4gZmllbGREZWYgJiYgZmllbGREZWYuZmllbGQgJiYgIV9pc0ZpZWxkRGltZW5zaW9uKGZpZWxkRGVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50KCk6IEZpZWxkRGVmIHtcbiAgcmV0dXJuIHsgZmllbGQ6ICcqJywgYWdncmVnYXRlOiBBZ2dyZWdhdGVPcC5DT1VOVCwgdHlwZTogUVVBTlRJVEFUSVZFfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ291bnQoZmllbGREZWY6IEZpZWxkRGVmKSB7XG4gIHJldHVybiBmaWVsZERlZi5hZ2dyZWdhdGUgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UO1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpcywgYW5kIHRoZSBnZXRiaW5zIG1ldGhvZFxuLy8gRklYTUUgdGhpcyBkZXBlbmRzIG9uIGNoYW5uZWxcbmV4cG9ydCBmdW5jdGlvbiBjYXJkaW5hbGl0eShmaWVsZERlZjogRmllbGREZWYsIHN0YXRzLCBmaWx0ZXJOdWxsID0ge30pIHtcbiAgLy8gRklYTUUgbmVlZCB0byB0YWtlIGZpbHRlciBpbnRvIGFjY291bnRcblxuICBjb25zdCBzdGF0ID0gc3RhdHNbZmllbGREZWYuZmllbGRdLFxuICB0eXBlID0gZmllbGREZWYudHlwZTtcblxuICBpZiAoZmllbGREZWYuYmluKSB7XG4gICAgLy8gbmVlZCB0byByZWFzc2lnbiBiaW4sIG90aGVyd2lzZSBjb21waWxhdGlvbiB3aWxsIGZhaWwgZHVlIHRvIGEgVFMgYnVnLlxuICAgIGNvbnN0IGJpbiA9IGZpZWxkRGVmLmJpbjtcbiAgICBsZXQgbWF4YmlucyA9ICh0eXBlb2YgYmluID09PSAnYm9vbGVhbicpID8gdW5kZWZpbmVkIDogYmluLm1heGJpbnM7XG4gICAgaWYgKG1heGJpbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4YmlucyA9IDEwO1xuICAgIH1cblxuICAgIGNvbnN0IGJpbnMgPSBnZXRiaW5zKHN0YXQsIG1heGJpbnMpO1xuICAgIHJldHVybiAoYmlucy5zdG9wIC0gYmlucy5zdGFydCkgLyBiaW5zLnN0ZXA7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFRFTVBPUkFMKSB7XG4gICAgY29uc3QgdGltZVVuaXQgPSBmaWVsZERlZi50aW1lVW5pdDtcbiAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XG4gICAgICBjYXNlIFRpbWVVbml0LlNFQ09ORFM6IHJldHVybiA2MDtcbiAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzogcmV0dXJuIDYwO1xuICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSUzogcmV0dXJuIDI0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVk6IHJldHVybiA3O1xuICAgICAgY2FzZSBUaW1lVW5pdC5EQVRFOiByZXR1cm4gMzE7XG4gICAgICBjYXNlIFRpbWVVbml0Lk1PTlRIOiByZXR1cm4gMTI7XG4gICAgICBjYXNlIFRpbWVVbml0LlFVQVJURVI6IHJldHVybiA0O1xuICAgICAgY2FzZSBUaW1lVW5pdC5ZRUFSOlxuICAgICAgICBjb25zdCB5ZWFyc3RhdCA9IHN0YXRzWyd5ZWFyXycgKyBmaWVsZERlZi5maWVsZF07XG5cbiAgICAgICAgaWYgKCF5ZWFyc3RhdCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB5ZWFyc3RhdC5kaXN0aW5jdCAtXG4gICAgICAgICAgKHN0YXQubWlzc2luZyA+IDAgJiYgZmlsdGVyTnVsbFt0eXBlXSA/IDEgOiAwKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHVzZSBjYWxjdWxhdGlvbiBiZWxvd1xuICB9XG4gIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBudWxsXG4gIHJldHVybiBzdGF0LmRpc3RpbmN0IC1cbiAgICAoc3RhdC5taXNzaW5nID4gMCAmJiBmaWx0ZXJOdWxsW3R5cGVdID8gMSA6IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGUoZmllbGREZWY6IEZpZWxkRGVmLCBjb25maWc6IENvbmZpZykge1xuICBpZiAoZmllbGREZWYudGl0bGUgIT0gbnVsbCkge1xuICAgIHJldHVybiBmaWVsZERlZi50aXRsZTtcbiAgfVxuICBpZiAoaXNDb3VudChmaWVsZERlZikpIHtcbiAgICByZXR1cm4gY29uZmlnLmNvdW50VGl0bGU7XG4gIH1cbiAgY29uc3QgZm4gPSBmaWVsZERlZi5hZ2dyZWdhdGUgfHwgZmllbGREZWYudGltZVVuaXQgfHwgKGZpZWxkRGVmLmJpbiAmJiAnYmluJyk7XG4gIGlmIChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgKyAnKCcgKyBmaWVsZERlZi5maWVsZCArICcpJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmllbGREZWYuZmllbGQ7XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0ZVRpbWUsIGRhdGVUaW1lRXhwciwgaXNEYXRlVGltZX0gZnJvbSAnLi9kYXRldGltZSc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuL2ZpZWxkZGVmJztcbmltcG9ydCB7VGltZVVuaXQsIGZpZWxkRXhwciBhcyB0aW1lVW5pdEZpZWxkRXhwciwgaXNTaW5nbGVUaW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5pbXBvcnQge2lzQXJyYXksIGlzU3RyaW5nfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBGaWx0ZXIgPSBFcXVhbEZpbHRlciB8IFJhbmdlRmlsdGVyIHwgSW5GaWx0ZXIgO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXF1YWxGaWx0ZXIge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFnZ3JlZ2F0ZVxuXG4gIC8qKlxuICAgKiBUaW1lIHVuaXQgZm9yIHRoZSBmaWVsZCB0byBiZSBmaWx0ZXJlZC5cbiAgICovXG4gIHRpbWVVbml0PzogVGltZVVuaXQ7XG5cbiAgLyoqXG4gICAqIEZpZWxkIHRvIGJlIGZpbHRlcmVkLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogVmFsdWUgdGhhdCB0aGUgZmllbGQgc2hvdWxkIGJlIGVxdWFsIHRvLlxuICAgKi9cbiAgZXF1YWw6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBEYXRlVGltZTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbEZpbHRlcihmaWx0ZXI6IGFueSk6IGZpbHRlciBpcyBFcXVhbEZpbHRlciB7XG4gIHJldHVybiBmaWx0ZXIgJiYgISFmaWx0ZXIuZmllbGQgJiYgZmlsdGVyLmVxdWFsIT09dW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlRmlsdGVyIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQXJyYXkgb2YgaW5jbHVzaXZlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzXG4gICAqIGZvciBhIGZpZWxkIHZhbHVlIG9mIGEgZGF0YSBpdGVtIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmaWx0ZXJlZCBkYXRhLlxuICAgKiBAbWF4SXRlbXMgMlxuICAgKiBAbWluSXRlbXMgMlxuICAgKi9cbiAgcmFuZ2U6IEFycmF5PG51bWJlcnxEYXRlVGltZT47XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VGaWx0ZXIoZmlsdGVyOiBhbnkpOiBmaWx0ZXIgaXMgUmFuZ2VGaWx0ZXIge1xuICBpZiAoZmlsdGVyICYmICEhZmlsdGVyLmZpZWxkKSB7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyLnJhbmdlKSAmJiBmaWx0ZXIucmFuZ2UubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluRmlsdGVyIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhZ2dyZWdhdGVcblxuICAvKipcbiAgICogdGltZSB1bml0IGZvciB0aGUgZmllbGQgdG8gYmUgZmlsdGVyZWQuXG4gICAqL1xuICB0aW1lVW5pdD86IFRpbWVVbml0O1xuXG4gIC8qKlxuICAgKiBGaWVsZCB0byBiZSBmaWx0ZXJlZFxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogQSBzZXQgb2YgdmFsdWVzIHRoYXQgdGhlIGBmaWVsZGAncyB2YWx1ZSBzaG91bGQgYmUgYSBtZW1iZXIgb2YsXG4gICAqIGZvciBhIGRhdGEgaXRlbSBpbmNsdWRlZCBpbiB0aGUgZmlsdGVyZWQgZGF0YS5cbiAgICovXG4gIGluOiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW58RGF0ZVRpbWU+O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luRmlsdGVyKGZpbHRlcjogYW55KTogZmlsdGVyIGlzIEluRmlsdGVyIHtcbiAgcmV0dXJuIGZpbHRlciAmJiAhIWZpbHRlci5maWVsZCAmJiBpc0FycmF5KGZpbHRlci5pbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHByZXNzaW9uKGZpbHRlcjogRmlsdGVyIHwgc3RyaW5nKSB7XG4gIGlmIChpc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlciBhcyBzdHJpbmc7XG4gIH0gZWxzZSB7IC8vIEZpbHRlciBPYmplY3RcbiAgICBjb25zdCBmaWVsZEV4cHIgPSBmaWx0ZXIudGltZVVuaXQgP1xuICAgICAgLy8gRm9yIHRpbWVVbml0LCBjYXN0IGludG8gaW50ZWdlciB3aXRoIHRpbWUoKSBzbyB3ZSBjYW4gdXNlID09PSwgaW5yYW5nZSwgaW5kZXhPZiB0byBjb21wYXJlIHZhbHVlcyBkaXJlY3RseS5cbiAgICAgICAgLy8gVE9ETzogV2UgY2FsY3VsYXRlIHRpbWVVbml0IG9uIHRoZSBmbHkgaGVyZS4gQ29uc2lkZXIgaWYgd2Ugd291bGQgbGlrZSB0byBjb25zb2xpZGF0ZSB0aGlzIHdpdGggdGltZVVuaXQgcGlwZWxpbmVcbiAgICAgICAgLy8gVE9ETzogc3VwcG9ydCB1dGNcbiAgICAgICgndGltZSgnICsgdGltZVVuaXRGaWVsZEV4cHIoZmlsdGVyLnRpbWVVbml0LCBmaWx0ZXIuZmllbGQpICsgJyknKSA6XG4gICAgICBmaWVsZChmaWx0ZXIsIHtkYXR1bTogdHJ1ZX0pO1xuXG4gICAgaWYgKGlzRXF1YWxGaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgcmV0dXJuIGZpZWxkRXhwciArICc9PT0nICsgdmFsdWVFeHByKGZpbHRlci5lcXVhbCwgZmlsdGVyLnRpbWVVbml0KTtcbiAgICB9IGVsc2UgaWYgKGlzSW5GaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgcmV0dXJuICdpbmRleG9mKFsnICtcbiAgICAgICAgZmlsdGVyLmluLm1hcCgodikgPT4gdmFsdWVFeHByKHYsIGZpbHRlci50aW1lVW5pdCkpLmpvaW4oJywnKSArXG4gICAgICAgICddLCAnICsgZmllbGRFeHByICsgJykgIT09IC0xJztcbiAgICB9IGVsc2UgaWYgKGlzUmFuZ2VGaWx0ZXIoZmlsdGVyKSkge1xuICAgICAgY29uc3QgbG93ZXIgPSBmaWx0ZXIucmFuZ2VbMF07XG4gICAgICBjb25zdCB1cHBlciA9IGZpbHRlci5yYW5nZVsxXTtcblxuICAgICAgaWYgKGxvd2VyICE9PSBudWxsICYmICB1cHBlciAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ2lucmFuZ2UoJyArIGZpZWxkRXhwciArICcsICcgK1xuICAgICAgICAgIHZhbHVlRXhwcihsb3dlciwgZmlsdGVyLnRpbWVVbml0KSArICcsICcgK1xuICAgICAgICAgIHZhbHVlRXhwcih1cHBlciwgZmlsdGVyLnRpbWVVbml0KSArICcpJztcbiAgICAgIH0gZWxzZSBpZiAobG93ZXIgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkRXhwciArICcgPj0gJyArIGxvd2VyO1xuICAgICAgfSBlbHNlIGlmICh1cHBlciAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmllbGRFeHByICsgJyA8PSAnICsgdXBwZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHZhbHVlRXhwcih2OiBhbnksIHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICBpZiAoaXNEYXRlVGltZSh2KSkge1xuICAgIGNvbnN0IGV4cHIgPSBkYXRlVGltZUV4cHIodiwgdHJ1ZSk7XG4gICAgcmV0dXJuICd0aW1lKCcgKyBleHByICsgJyknO1xuICB9XG4gIGlmIChpc1NpbmdsZVRpbWVVbml0KHRpbWVVbml0KSkge1xuICAgIGNvbnN0IGRhdGV0aW1lOiBEYXRlVGltZSA9IHt9O1xuICAgIGRhdGV0aW1lW3RpbWVVbml0XSA9IHY7XG4gICAgY29uc3QgZXhwciA9IGRhdGVUaW1lRXhwcihkYXRldGltZSwgdHJ1ZSk7XG4gICAgcmV0dXJuICd0aW1lKCcgKyBleHByICsgJyknO1xuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgbGVnZW5kLiBPbmUgb2YgXCJsZWZ0XCIgb3IgXCJyaWdodFwiLiBUaGlzIGRldGVybWluZXMgaG93IHRoZSBsZWdlbmQgaXMgcG9zaXRpb25lZCB3aXRoaW4gdGhlIHNjZW5lLiBUaGUgZGVmYXVsdCBpcyBcInJpZ2h0XCIuXG4gICAqL1xuICBvcmllbnQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0LCBpbiBwaXhlbHMsIGJ5IHdoaWNoIHRvIGRpc3BsYWNlIHRoZSBsZWdlbmQgZnJvbSB0aGUgZWRnZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIG9yIGRhdGEgcmVjdGFuZ2xlLlxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHBhZGRpbmcsIGluIHBpeGVscywgYmV0d2VlbiB0aGUgbGVuZ2VuZCBhbmQgYXhpcy5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWFyZ2luIGFyb3VuZCB0aGUgbGVnZW5kLCBpbiBwaXhlbHNcbiAgICovXG4gIG1hcmdpbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgZ3JhZGllbnQgc3Ryb2tlLCBjYW4gYmUgaW4gaGV4IGNvbG9yIGNvZGUgb3IgcmVndWxhciBjb2xvciBuYW1lLlxuICAgKi9cbiAgZ3JhZGllbnRTdHJva2VDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JhZGllbnQgc3Ryb2tlLCBpbiBwaXhlbHMuXG4gICAqL1xuICBncmFkaWVudFN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZ3JhZGllbnQsIGluIHBpeGVscy5cbiAgICovXG4gIGdyYWRpZW50SGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmFkaWVudCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgZ3JhZGllbnRXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBhbGlnbm1lbnQgb2YgdGhlIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIGxlZnQsIG1pZGRsZSBvciByaWdodC5cbiAgICovXG4gIGxhYmVsQWxpZ24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGJhc2VsaW5lIG9mIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIHRvcCwgbWlkZGxlIG9yIGJvdHRvbS5cbiAgICovXG4gIGxhYmVsQmFzZWxpbmU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgY29sb3Igb2YgdGhlIGxlZ2VuZCBsYWJlbCwgY2FuIGJlIGluIGhleCBjb2xvciBjb2RlIG9yIHJlZ3VsYXIgY29sb3IgbmFtZS5cbiAgICovXG4gIGxhYmVsQ29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZm9udCBvZiB0aGUgbGVuZ2VuZCBsYWJlbC5cbiAgICovXG4gIGxhYmVsRm9udD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IHNpemUgb2YgbGVuZ2VuZCBsYWJsZS5cbiAgICovXG4gIGxhYmVsRm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IG9mIHRoZSBsZWdlbmQgbGFiZWwuXG4gICAqL1xuICBsYWJlbE9mZnNldD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgbW9udGggbmFtZXMgYW5kIHdlZWtkYXkgbmFtZXMgc2hvdWxkIGJlIGFiYnJldmlhdGVkLlxuICAgKi9cbiAgc2hvcnRUaW1lTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgbGVnZW5kIHN5bWJvbCxcbiAgICovXG4gIHN5bWJvbENvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHNoYXBlIG9mIHRoZSBsZWdlbmQgc3ltYm9sLCBjYW4gYmUgdGhlICdjaXJjbGUnLCAnc3F1YXJlJywgJ2Nyb3NzJywgJ2RpYW1vbmQnLFxuICAgKiAndHJpYW5nbGUtdXAnLCAndHJpYW5nbGUtZG93bicuXG4gICAqL1xuICBzeW1ib2xTaGFwZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBsZW5nZW5kIHN5bWJvbCwgaW4gcGl4ZWxzLlxuICAgKi9cbiAgc3ltYm9sU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgc3ltYm9sJ3Mgc3Ryb2tlLlxuICAgKi9cbiAgc3ltYm9sU3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb25zIGZvciBjdXN0b20gbGVnZW5kIHN0eWxpbmcuXG4gICAqL1xuICAvKipcbiAgICogVGhlIGNvbG9yIG9mIHRoZSBsZWdlbmQgdGl0bGUsIGNhbiBiZSBpbiBoZXggY29sb3IgY29kZSBvciByZWd1bGFyIGNvbG9yIG5hbWUuXG4gICAqL1xuICB0aXRsZUNvbG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZvbnQgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IHNpemUgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZm9udCB3ZWlnaHQgb2YgdGhlIGxlZ2VuZCB0aXRsZS5cbiAgICovXG4gIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcbiAgLyoqXG4gICAqIE9wdGlvbmFsIG1hcmsgcHJvcGVydHkgZGVmaW5pdGlvbnMgZm9yIGN1c3RvbSBsZWdlbmQgc3R5bGluZy5cbiAgICovXG4gIHByb3BlcnRpZXM/OiBhbnk7IC8vIFRPRE8oIzk3NSkgcmVwbGFjZSB3aXRoIGNvbmZpZyBwcm9wZXJ0aWVzXG59XG5cbi8qKlxuICogUHJvcGVydGllcyBvZiBhIGxlZ2VuZCBvciBib29sZWFuIGZsYWcgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdG8gc2hvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMZWdlbmQgZXh0ZW5kcyBMZWdlbmRDb25maWcge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBsZWdlbmQgbGFiZWxzLiBWZWdhIHVzZXMgRDNcXCdzIGZvcm1hdCBwYXR0ZXJuLlxuICAgKi9cbiAgZm9ybWF0Pzogc3RyaW5nO1xuICAvKipcbiAgICogQSB0aXRsZSBmb3IgdGhlIGxlZ2VuZC4gKFNob3dzIGZpZWxkIG5hbWUgYW5kIGl0cyBmdW5jdGlvbiBieSBkZWZhdWx0LilcbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuICAvKipcbiAgICogRXhwbGljaXRseSBzZXQgdGhlIHZpc2libGUgbGVnZW5kIHZhbHVlcy5cbiAgICovXG4gIHZhbHVlcz86IEFycmF5PGFueT47XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TGVnZW5kQ29uZmlnOiBMZWdlbmRDb25maWcgPSB7XG4gIG9yaWVudDogdW5kZWZpbmVkLCAvLyBpbXBsaWNpdGx5IFwicmlnaHRcIlxuICBzaG9ydFRpbWVMYWJlbHM6IGZhbHNlXG59O1xuIiwiZXhwb3J0IGVudW0gTWFyayB7XG4gIEFSRUEgPSAnYXJlYScgYXMgYW55LFxuICBCQVIgPSAnYmFyJyBhcyBhbnksXG4gIExJTkUgPSAnbGluZScgYXMgYW55LFxuICBQT0lOVCA9ICdwb2ludCcgYXMgYW55LFxuICBURVhUID0gJ3RleHQnIGFzIGFueSxcbiAgVElDSyA9ICd0aWNrJyBhcyBhbnksXG4gIFJVTEUgPSAncnVsZScgYXMgYW55LFxuICBDSVJDTEUgPSAnY2lyY2xlJyBhcyBhbnksXG4gIFNRVUFSRSA9ICdzcXVhcmUnIGFzIGFueSxcbiAgRVJST1JCQVIgPSAnZXJyb3JCYXInIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgQVJFQSA9IE1hcmsuQVJFQTtcbmV4cG9ydCBjb25zdCBCQVIgPSBNYXJrLkJBUjtcbmV4cG9ydCBjb25zdCBMSU5FID0gTWFyay5MSU5FO1xuZXhwb3J0IGNvbnN0IFBPSU5UID0gTWFyay5QT0lOVDtcbmV4cG9ydCBjb25zdCBURVhUID0gTWFyay5URVhUO1xuZXhwb3J0IGNvbnN0IFRJQ0sgPSBNYXJrLlRJQ0s7XG5leHBvcnQgY29uc3QgUlVMRSA9IE1hcmsuUlVMRTtcblxuZXhwb3J0IGNvbnN0IENJUkNMRSA9IE1hcmsuQ0lSQ0xFO1xuZXhwb3J0IGNvbnN0IFNRVUFSRSA9IE1hcmsuU1FVQVJFO1xuXG5leHBvcnQgY29uc3QgRVJST1JCQVIgPSBNYXJrLkVSUk9SQkFSO1xuZXhwb3J0IGNvbnN0IFBSSU1JVElWRV9NQVJLUyA9IFtBUkVBLCBCQVIsIExJTkUsIFBPSU5ULCBURVhULCBUSUNLLCBSVUxFLCBDSVJDTEUsIFNRVUFSRV07XG4iLCJleHBvcnQgZW51bSBTY2FsZVR5cGUge1xuICAgIExJTkVBUiA9ICdsaW5lYXInIGFzIGFueSxcbiAgICBMT0cgPSAnbG9nJyBhcyBhbnksXG4gICAgUE9XID0gJ3BvdycgYXMgYW55LFxuICAgIFNRUlQgPSAnc3FydCcgYXMgYW55LFxuICAgIFFVQU5USUxFID0gJ3F1YW50aWxlJyBhcyBhbnksXG4gICAgUVVBTlRJWkUgPSAncXVhbnRpemUnIGFzIGFueSxcbiAgICBPUkRJTkFMID0gJ29yZGluYWwnIGFzIGFueSxcbiAgICBUSU1FID0gJ3RpbWUnIGFzIGFueSxcbiAgICBVVEMgID0gJ3V0YycgYXMgYW55LFxufVxuXG5leHBvcnQgZW51bSBOaWNlVGltZSB7XG4gICAgU0VDT05EID0gJ3NlY29uZCcgYXMgYW55LFxuICAgIE1JTlVURSA9ICdtaW51dGUnIGFzIGFueSxcbiAgICBIT1VSID0gJ2hvdXInIGFzIGFueSxcbiAgICBEQVkgPSAnZGF5JyBhcyBhbnksXG4gICAgV0VFSyA9ICd3ZWVrJyBhcyBhbnksXG4gICAgTU9OVEggPSAnbW9udGgnIGFzIGFueSxcbiAgICBZRUFSID0gJ3llYXInIGFzIGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCByb3VuZHMgbnVtZXJpYyBvdXRwdXQgdmFsdWVzIHRvIGludGVnZXJzLlxuICAgKiBUaGlzIGNhbiBiZSBoZWxwZnVsIGZvciBzbmFwcGluZyB0byB0aGUgcGl4ZWwgZ3JpZC5cbiAgICogKE9ubHkgYXZhaWxhYmxlIGZvciBgeGAsIGB5YCwgYHNpemVgLCBgcm93YCwgYW5kIGBjb2x1bW5gIHNjYWxlcy4pXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiAgRGVmYXVsdCBiYW5kIHdpZHRoIGZvciBgeGAgb3JkaW5hbCBzY2FsZSB3aGVuIGlzIG1hcmsgaXMgYHRleHRgLlxuICAgKiAgQG1pbmltdW0gMFxuICAgKi9cbiAgdGV4dEJhbmRXaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgYmFuZCBzaXplIGZvciAoMSkgYHlgIG9yZGluYWwgc2NhbGUsXG4gICAqIGFuZCAoMikgYHhgIG9yZGluYWwgc2NhbGUgd2hlbiB0aGUgbWFyayBpcyBub3QgYHRleHRgLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgcmFuZ2UgZm9yIG9wYWNpdHkuXG4gICAqL1xuICBvcGFjaXR5PzogbnVtYmVyW107XG4gIC8qKlxuICAgKiBEZWZhdWx0IHBhZGRpbmcgZm9yIGB4YCBhbmQgYHlgIG9yZGluYWwgc2NhbGVzLlxuICAgKi9cbiAgcGFkZGluZz86IG51bWJlcjtcblxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy5cbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmF3IGRhdGEgZG9tYWluIChgXCJtZWFuXCJgLCBgXCJhdmVyYWdlXCJgLCBgXCJzdGRldlwiYCwgYFwic3RkZXZwXCJgLCBgXCJtZWRpYW5cImAsIGBcInExXCJgLCBgXCJxM1wiYCwgYFwibWluXCJgLCBgXCJtYXhcImApLiBGb3Igb3RoZXIgYWdncmVnYXRpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgcmF3IGRhdGEgZG9tYWluIChlLmcuIGBcImNvdW50XCJgLCBgXCJzdW1cImApLCB0aGlzIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBub21pbmFsIGNvbG9yIHNjYWxlICovXG4gIG5vbWluYWxDb2xvclJhbmdlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBvcmRpbmFsIC8gY29udGludW91cyBjb2xvciBzY2FsZSAqL1xuICBzZXF1ZW50aWFsQ29sb3JSYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAvKiogRGVmYXVsdCByYW5nZSBmb3Igc2hhcGUgKi9cbiAgc2hhcGVSYW5nZT86IHN0cmluZ3xzdHJpbmdbXTtcblxuICAvKiogRGVmYXVsdCByYW5nZSBmb3IgYmFyIHNpemUgc2NhbGUgKi9cbiAgYmFyU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIGZvbnQgc2l6ZSBzY2FsZSAqL1xuICBmb250U2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHJ1bGUgc3Ryb2tlIHdpZHRocyAqL1xuICBydWxlU2l6ZVJhbmdlPzogbnVtYmVyW107XG5cbiAgLyoqIERlZmF1bHQgcmFuZ2UgZm9yIHRpY2sgc3BhbnMgKi9cbiAgdGlja1NpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8qKiBEZWZhdWx0IHJhbmdlIGZvciBiYXIgc2l6ZSBzY2FsZSAqL1xuICBwb2ludFNpemVSYW5nZT86IG51bWJlcltdO1xuXG4gIC8vIG5pY2Ugc2hvdWxkIGRlcGVuZHMgb24gdHlwZSAocXVhbnRpdGF0aXZlIG9yIHRlbXBvcmFsKSwgc29cbiAgLy8gbGV0J3Mgbm90IG1ha2UgYSBjb25maWcuXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2NhbGVDb25maWc6IFNjYWxlQ29uZmlnID0ge1xuICByb3VuZDogdHJ1ZSxcbiAgdGV4dEJhbmRXaWR0aDogOTAsXG4gIGJhbmRTaXplOiAyMSxcbiAgcGFkZGluZzogMSxcbiAgdXNlUmF3RG9tYWluOiBmYWxzZSxcbiAgb3BhY2l0eTogWzAuMywgMC44XSxcblxuICBub21pbmFsQ29sb3JSYW5nZTogJ2NhdGVnb3J5MTAnLFxuICBzZXF1ZW50aWFsQ29sb3JSYW5nZTogWycjQUZDNkEzJywgJyMwOTYyMkEnXSwgLy8gdGFibGVhdSBncmVlbnNcbiAgc2hhcGVSYW5nZTogJ3NoYXBlcycsXG4gIGZvbnRTaXplUmFuZ2U6IFs4LCA0MF0sXG4gIHJ1bGVTaXplUmFuZ2U6IFsxLCA1XSxcbiAgdGlja1NpemVSYW5nZTogWzEsIDIwXVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNjYWxlQ29uZmlnIHtcbiAgcm91bmQ/OiBib29sZWFuO1xuICBwYWRkaW5nPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZhY2V0U2NhbGVDb25maWc6IEZhY2V0U2NhbGVDb25maWcgPSB7XG4gIHJvdW5kOiB0cnVlLFxuICBwYWRkaW5nOiAxNlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZSB7XG4gIHR5cGU/OiBTY2FsZVR5cGU7XG4gIC8qKlxuICAgKiBUaGUgZG9tYWluIG9mIHRoZSBzY2FsZSwgcmVwcmVzZW50aW5nIHRoZSBzZXQgb2YgZGF0YSB2YWx1ZXMuIEZvciBxdWFudGl0YXRpdmUgZGF0YSwgdGhpcyBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsL2NhdGVnb3JpY2FsIGRhdGEsIHRoaXMgbWF5IGJlIGFuIGFycmF5IG9mIHZhbGlkIGlucHV0IHZhbHVlcy5cbiAgICovXG4gIGRvbWFpbj86IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdEYXRhRG9tYWluXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2Ugb2YgdGhlIHNjYWxlLCByZXByZXNlbnRpbmcgdGhlIHNldCBvZiB2aXN1YWwgdmFsdWVzLiBGb3IgbnVtZXJpYyB2YWx1ZXMsIHRoZSByYW5nZSBjYW4gdGFrZSB0aGUgZm9ybSBvZiBhIHR3by1lbGVtZW50IGFycmF5IHdpdGggbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIEZvciBvcmRpbmFsIG9yIHF1YW50aXplZCBkYXRhLCB0aGUgcmFuZ2UgbWF5IGJ5IGFuIGFycmF5IG9mIGRlc2lyZWQgb3V0cHV0IHZhbHVlcywgd2hpY2ggYXJlIG1hcHBlZCB0byBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGRvbWFpbi4gRm9yIG9yZGluYWwgc2NhbGVzIG9ubHksIHRoZSByYW5nZSBjYW4gYmUgZGVmaW5lZCB1c2luZyBhIERhdGFSZWY6IHRoZSByYW5nZSB2YWx1ZXMgYXJlIHRoZW4gZHJhd24gZHluYW1pY2FsbHkgZnJvbSBhIGJhY2tpbmcgZGF0YSBzZXQuXG4gICAqL1xuICByYW5nZT86IHN0cmluZyB8IG51bWJlcltdIHwgc3RyaW5nW107IC8vIFRPRE86IGRlY2xhcmUgdmdSYW5nZURvbWFpblxuICAvKipcbiAgICogSWYgdHJ1ZSwgcm91bmRzIG51bWVyaWMgb3V0cHV0IHZhbHVlcyB0byBpbnRlZ2Vycy4gVGhpcyBjYW4gYmUgaGVscGZ1bCBmb3Igc25hcHBpbmcgdG8gdGhlIHBpeGVsIGdyaWQuXG4gICAqL1xuICByb3VuZD86IGJvb2xlYW47XG5cbiAgLy8gb3JkaW5hbFxuICAvKipcbiAgICogQG1pbmltdW0gMFxuICAgKi9cbiAgYmFuZFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBcHBsaWVzIHNwYWNpbmcgYW1vbmcgb3JkaW5hbCBlbGVtZW50cyBpbiB0aGUgc2NhbGUgcmFuZ2UuIFRoZSBhY3R1YWwgZWZmZWN0IGRlcGVuZHMgb24gaG93IHRoZSBzY2FsZSBpcyBjb25maWd1cmVkLiBJZiB0aGUgX19wb2ludHNfXyBwYXJhbWV0ZXIgaXMgYHRydWVgLCB0aGUgcGFkZGluZyB2YWx1ZSBpcyBpbnRlcnByZXRlZCBhcyBhIG11bHRpcGxlIG9mIHRoZSBzcGFjaW5nIGJldHdlZW4gcG9pbnRzLiBBIHJlYXNvbmFibGUgdmFsdWUgaXMgMS4wLCBzdWNoIHRoYXQgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IHdpbGwgYmUgb2Zmc2V0IGZyb20gdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgYnkgaGFsZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludHMuIE90aGVyd2lzZSwgcGFkZGluZyBpcyB0eXBpY2FsbHkgaW4gdGhlIHJhbmdlIFswLCAxXSBhbmQgY29ycmVzcG9uZHMgdG8gdGhlIGZyYWN0aW9uIG9mIHNwYWNlIGluIHRoZSByYW5nZSBpbnRlcnZhbCB0byBhbGxvY2F0ZSB0byBwYWRkaW5nLiBBIHZhbHVlIG9mIDAuNSBtZWFucyB0aGF0IHRoZSByYW5nZSBiYW5kIHdpZHRoIHdpbGwgYmUgZXF1YWwgdG8gdGhlIHBhZGRpbmcgd2lkdGguIEZvciBtb3JlLCBzZWUgdGhlIFtEMyBvcmRpbmFsIHNjYWxlIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYm9zdG9jay9kMy93aWtpL09yZGluYWwtU2NhbGVzKS5cbiAgICovXG4gIHBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLy8gdHlwaWNhbFxuICAvKipcbiAgICogSWYgdHJ1ZSwgdmFsdWVzIHRoYXQgZXhjZWVkIHRoZSBkYXRhIGRvbWFpbiBhcmUgY2xhbXBlZCB0byBlaXRoZXIgdGhlIG1pbmltdW0gb3IgbWF4aW11bSByYW5nZSB2YWx1ZVxuICAgKi9cbiAgY2xhbXA/OiBib29sZWFuO1xuICAvKipcbiAgICogSWYgc3BlY2lmaWVkLCBtb2RpZmllcyB0aGUgc2NhbGUgZG9tYWluIHRvIHVzZSBhIG1vcmUgaHVtYW4tZnJpZW5kbHkgdmFsdWUgcmFuZ2UuIElmIHNwZWNpZmllZCBhcyBhIHRydWUgYm9vbGVhbiwgbW9kaWZpZXMgdGhlIHNjYWxlIGRvbWFpbiB0byB1c2UgYSBtb3JlIGh1bWFuLWZyaWVuZGx5IG51bWJlciByYW5nZSAoZS5nLiwgNyBpbnN0ZWFkIG9mIDYuOTYpLiBJZiBzcGVjaWZpZWQgYXMgYSBzdHJpbmcsIG1vZGlmaWVzIHRoZSBzY2FsZSBkb21haW4gdG8gdXNlIGEgbW9yZSBodW1hbi1mcmllbmRseSB2YWx1ZSByYW5nZS4gRm9yIHRpbWUgYW5kIHV0YyBzY2FsZSB0eXBlcyBvbmx5LCB0aGUgbmljZSB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgZGVzaXJlZCB0aW1lIGludGVydmFsLlxuICAgKi9cbiAgbmljZT86IGJvb2xlYW4gfCBOaWNlVGltZTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4cG9uZW50IG9mIHRoZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbi4gRm9yIHBvdyBzY2FsZSB0eXBlcyBvbmx5LCBvdGhlcndpc2UgaWdub3JlZC5cbiAgICovXG4gIGV4cG9uZW50PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgYHRydWVgLCBlbnN1cmVzIHRoYXQgYSB6ZXJvIGJhc2VsaW5lIHZhbHVlIGlzIGluY2x1ZGVkIGluIHRoZSBzY2FsZSBkb21haW4uXG4gICAqIERlZmF1bHQgdmFsdWU6IGB0cnVlYCBmb3IgYHhgIGFuZCBgeWAgY2hhbm5lbCBpZiB0aGUgcXVhbnRpdGF0aXZlIGZpZWxkIGlzIG5vdCBiaW5uZWRcbiAgICogYW5kIG5vIGN1c3RvbSBgZG9tYWluYCBpcyBwcm92aWRlZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICB6ZXJvPzogYm9vbGVhbjtcblxuICAvLyBWZWdhLUxpdGUgb25seVxuICAvKipcbiAgICogVXNlcyB0aGUgc291cmNlIGRhdGEgcmFuZ2UgYXMgc2NhbGUgZG9tYWluIGluc3RlYWQgb2YgYWdncmVnYXRlZCBkYXRhIGZvciBhZ2dyZWdhdGUgYXhpcy5cbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIHdpdGggYWdncmVnYXRlIGZ1bmN0aW9ucyB0aGF0IHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmF3IGRhdGEgZG9tYWluIChgXCJtZWFuXCJgLCBgXCJhdmVyYWdlXCJgLCBgXCJzdGRldlwiYCwgYFwic3RkZXZwXCJgLCBgXCJtZWRpYW5cImAsIGBcInExXCJgLCBgXCJxM1wiYCwgYFwibWluXCJgLCBgXCJtYXhcImApLiBGb3Igb3RoZXIgYWdncmVnYXRpb25zIHRoYXQgcHJvZHVjZSB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgcmF3IGRhdGEgZG9tYWluIChlLmcuIGBcImNvdW50XCJgLCBgXCJzdW1cImApLCB0aGlzIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqL1xuICB1c2VSYXdEb21haW4/OiBib29sZWFuO1xufVxuIiwiLyoqIG1vZHVsZSBmb3Igc2hvcnRoYW5kICovXG5cbmltcG9ydCB7RW5jb2Rpbmd9IGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge0V4dGVuZGVkVW5pdFNwZWN9IGZyb20gJy4vc3BlYyc7XG5cbmltcG9ydCB7QWdncmVnYXRlT3AsIEFHR1JFR0FURV9PUFN9IGZyb20gJy4vYWdncmVnYXRlJztcbmltcG9ydCB7VElNRVVOSVRTfSBmcm9tICcuL3RpbWV1bml0JztcbmltcG9ydCB7U0hPUlRfVFlQRSwgVFlQRV9GUk9NX1NIT1JUX1RZUEV9IGZyb20gJy4vdHlwZSc7XG5pbXBvcnQgKiBhcyB2bEVuY29kaW5nIGZyb20gJy4vZW5jb2RpbmcnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuXG5leHBvcnQgY29uc3QgREVMSU0gPSAnfCc7XG5leHBvcnQgY29uc3QgQVNTSUdOID0gJz0nO1xuZXhwb3J0IGNvbnN0IFRZUEUgPSAnLCc7XG5leHBvcnQgY29uc3QgRlVOQyA9ICdfJztcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlbihzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogc3RyaW5nIHtcbiAgcmV0dXJuICdtYXJrJyArIEFTU0lHTiArIHNwZWMubWFyayArXG4gICAgREVMSU0gKyBzaG9ydGVuRW5jb2Rpbmcoc3BlYy5lbmNvZGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzaG9ydGhhbmQ6IHN0cmluZywgZGF0YT8sIGNvbmZpZz8pIHtcbiAgbGV0IHNwbGl0ID0gc2hvcnRoYW5kLnNwbGl0KERFTElNKSxcbiAgICBtYXJrID0gc3BsaXQuc2hpZnQoKS5zcGxpdChBU1NJR04pWzFdLnRyaW0oKSxcbiAgICBlbmNvZGluZyA9IHBhcnNlRW5jb2Rpbmcoc3BsaXQuam9pbihERUxJTSkpO1xuXG4gIGxldCBzcGVjOkV4dGVuZGVkVW5pdFNwZWMgPSB7XG4gICAgbWFyazogTWFya1ttYXJrXSxcbiAgICBlbmNvZGluZzogZW5jb2RpbmdcbiAgfTtcblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3BlYy5kYXRhID0gZGF0YTtcbiAgfVxuICBpZiAoY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICBzcGVjLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5FbmNvZGluZyhlbmNvZGluZzogRW5jb2RpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmxFbmNvZGluZy5tYXAoZW5jb2RpbmcsIGZ1bmN0aW9uKGZpZWxkRGVmLCBjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwgKyBBU1NJR04gKyBzaG9ydGVuRmllbGREZWYoZmllbGREZWYpO1xuICB9KS5qb2luKERFTElNKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW5jb2RpbmcoZW5jb2RpbmdTaG9ydGhhbmQ6IHN0cmluZyk6IEVuY29kaW5nIHtcbiAgcmV0dXJuIGVuY29kaW5nU2hvcnRoYW5kLnNwbGl0KERFTElNKS5yZWR1Y2UoZnVuY3Rpb24obSwgZSkge1xuICAgIGNvbnN0IHNwbGl0ID0gZS5zcGxpdChBU1NJR04pLFxuICAgICAgICBlbmN0eXBlID0gc3BsaXRbMF0udHJpbSgpLFxuICAgICAgICBmaWVsZERlZlNob3J0aGFuZCA9IHNwbGl0WzFdO1xuXG4gICAgbVtlbmN0eXBlXSA9IHBhcnNlRmllbGREZWYoZmllbGREZWZTaG9ydGhhbmQpO1xuICAgIHJldHVybiBtO1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuRmllbGREZWYoZmllbGREZWY6IEZpZWxkRGVmKTogc3RyaW5nIHtcbiAgcmV0dXJuIChmaWVsZERlZi5hZ2dyZWdhdGUgPyBmaWVsZERlZi5hZ2dyZWdhdGUgKyBGVU5DIDogJycpICtcbiAgICAoZmllbGREZWYudGltZVVuaXQgPyBmaWVsZERlZi50aW1lVW5pdCArIEZVTkMgOiAnJykgK1xuICAgIChmaWVsZERlZi5iaW4gPyAnYmluJyArIEZVTkMgOiAnJykgK1xuICAgIChmaWVsZERlZi5maWVsZCB8fCAnJykgKyBUWVBFICsgU0hPUlRfVFlQRVtmaWVsZERlZi50eXBlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5GaWVsZERlZnMoZmllbGREZWZzOiBGaWVsZERlZltdLCBkZWxpbSA9IERFTElNKTogc3RyaW5nIHtcbiAgcmV0dXJuIGZpZWxkRGVmcy5tYXAoc2hvcnRlbkZpZWxkRGVmKS5qb2luKGRlbGltKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmllbGREZWYoZmllbGREZWZTaG9ydGhhbmQ6IHN0cmluZyk6IEZpZWxkRGVmIHtcbiAgY29uc3Qgc3BsaXQgPSBmaWVsZERlZlNob3J0aGFuZC5zcGxpdChUWVBFKTtcblxuICBsZXQgZmllbGREZWY6IEZpZWxkRGVmID0ge1xuICAgIGZpZWxkOiBzcGxpdFswXS50cmltKCksXG4gICAgdHlwZTogVFlQRV9GUk9NX1NIT1JUX1RZUEVbc3BsaXRbMV0udHJpbSgpXVxuICB9O1xuXG4gIC8vIGNoZWNrIGFnZ3JlZ2F0ZSB0eXBlXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQUdHUkVHQVRFX09QUy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhID0gQUdHUkVHQVRFX09QU1tpXTtcbiAgICBpZiAoZmllbGREZWYuZmllbGQuaW5kZXhPZihhICsgJ18nKSA9PT0gMCkge1xuICAgICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoYS50b1N0cmluZygpLmxlbmd0aCArIDEpO1xuICAgICAgaWYgKGEgPT09IEFnZ3JlZ2F0ZU9wLkNPVU5UICYmIGZpZWxkRGVmLmZpZWxkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBmaWVsZERlZi5maWVsZCA9ICcqJztcbiAgICAgIH1cbiAgICAgIGZpZWxkRGVmLmFnZ3JlZ2F0ZSA9IGE7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IFRJTUVVTklUUy5sZW5ndGg7IGkrKykge1xuICAgIGxldCB0dSA9IFRJTUVVTklUU1tpXTtcbiAgICBpZiAoZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQuaW5kZXhPZih0dSArICdfJykgPT09IDApIHtcbiAgICAgIGZpZWxkRGVmLmZpZWxkID0gZmllbGREZWYuZmllbGQuc3Vic3RyKGZpZWxkRGVmLmZpZWxkLmxlbmd0aCArIDEpO1xuICAgICAgZmllbGREZWYudGltZVVuaXQgPSB0dTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrIGJpblxuICBpZiAoZmllbGREZWYuZmllbGQgJiYgZmllbGREZWYuZmllbGQuaW5kZXhPZignYmluXycpID09PSAwKSB7XG4gICAgZmllbGREZWYuZmllbGQgPSBmaWVsZERlZi5maWVsZC5zdWJzdHIoNCk7XG4gICAgZmllbGREZWYuYmluID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZERlZjtcbn1cbiIsImltcG9ydCB7QWdncmVnYXRlT3B9IGZyb20gJy4vYWdncmVnYXRlJztcblxuZXhwb3J0IGVudW0gU29ydE9yZGVyIHtcbiAgICBBU0NFTkRJTkcgPSAnYXNjZW5kaW5nJyBhcyBhbnksXG4gICAgREVTQ0VORElORyA9ICdkZXNjZW5kaW5nJyBhcyBhbnksXG4gICAgTk9ORSA9ICdub25lJyBhcyBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydEZpZWxkIHtcbiAgLyoqXG4gICAqIFRoZSBmaWVsZCBuYW1lIHRvIGFnZ3JlZ2F0ZSBvdmVyLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzb3J0IGFnZ3JlZ2F0aW9uIG9wZXJhdG9yXG4gICAqL1xuICBvcDogQWdncmVnYXRlT3A7XG5cbiAgb3JkZXI/OiBTb3J0T3JkZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NvcnRGaWVsZChzb3J0OiBTb3J0T3JkZXIgfCBTb3J0RmllbGQpOiBzb3J0IGlzIFNvcnRGaWVsZCB7XG4gIHJldHVybiAhIXNvcnQgJiYgISFzb3J0WydmaWVsZCddICYmICEhc29ydFsnb3AnXTtcbn1cbiIsIi8qIFBhY2thZ2Ugb2YgZGVmaW5pbmcgVmVnYS1saXRlIFNwZWNpZmljYXRpb24ncyBqc29uIHNjaGVtYSBhdCBpdHMgdXRpbGl0eSBmdW5jdGlvbnMgKi9cblxuaW1wb3J0IHtDb25maWcsIGRlZmF1bHRPdmVybGF5Q29uZmlnLCBBcmVhT3ZlcmxheX0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtEYXRhfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHtFbmNvZGluZywgVW5pdEVuY29kaW5nLCBoYXMsIGlzUmFuZ2VkfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7RmFjZXR9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtGaWVsZERlZn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQge01hcmssIEVSUk9SQkFSLCBUSUNLLCBBUkVBLCBSVUxFLCBMSU5FLCBQT0lOVH0gZnJvbSAnLi9tYXJrJztcbmltcG9ydCB7c3RhY2t9IGZyb20gJy4vc3RhY2snO1xuaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCB7Uk9XLCBDT0xVTU4sIFgsIFksIFgyLCBZMn0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCAqIGFzIHZsRW5jb2RpbmcgZnJvbSAnLi9lbmNvZGluZyc7XG5pbXBvcnQge2NvbnRhaW5zLCBkdXBsaWNhdGUsIGV4dGVuZCwga2V5cywgb21pdCwgcGlja30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlU3BlYyB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSB2aXN1YWxpemF0aW9uIGZvciBsYXRlciByZWZlcmVuY2UuXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBkZXNjcmlwdGlvbiBvZiB0aGlzIG1hcmsgZm9yIGNvbW1lbnRpbmcgcHVycG9zZS5cbiAgICogVGhpcyBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBvdXRwdXQgdmlzdWFsaXphdGlvbi5cbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgZGF0YSBzb3VyY2VcbiAgICovXG4gIGRhdGE/OiBEYXRhO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgZGVzY3JpYmluZyBmaWx0ZXIgYW5kIG5ldyBmaWVsZCBjYWxjdWxhdGlvbi5cbiAgICovXG4gIHRyYW5zZm9ybT86IFRyYW5zZm9ybTtcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGNvbmZpZz86IENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBVbml0RW5jb2Rpbmc7XG59XG5cbi8qKlxuICogU2NoZW1hIGZvciBhIHVuaXQgVmVnYS1MaXRlIHNwZWNpZmljYXRpb24sIHdpdGggdGhlIHN5bnRhY3RpYyBzdWdhciBleHRlbnNpb25zOlxuICogLSBgcm93YCBhbmQgYGNvbHVtbmAgYXJlIGluY2x1ZGVkIGluIHRoZSBlbmNvZGluZy5cbiAqIC0gKEZ1dHVyZSkgbGFiZWwsIGJveCBwbG90XG4gKlxuICogTm90ZTogdGhlIHNwZWMgY291bGQgY29udGFpbiBmYWNldC5cbiAqXG4gKiBAcmVxdWlyZWQgW1wibWFya1wiLCBcImVuY29kaW5nXCJdXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5kZWRVbml0U3BlYyBleHRlbmRzIEJhc2VTcGVjIHtcbiAgLyoqXG4gICAqIFRoZSBtYXJrIHR5cGUuXG4gICAqIE9uZSBvZiBgXCJiYXJcImAsIGBcImNpcmNsZVwiYCwgYFwic3F1YXJlXCJgLCBgXCJ0aWNrXCJgLCBgXCJsaW5lXCJgLFxuICAgKiBgXCJhcmVhXCJgLCBgXCJwb2ludFwiYCwgYFwicnVsZVwiYCwgYW5kIGBcInRleHRcImAuXG4gICAqL1xuICBtYXJrOiBNYXJrO1xuXG4gIC8qKlxuICAgKiBBIGtleS12YWx1ZSBtYXBwaW5nIGJldHdlZW4gZW5jb2RpbmcgY2hhbm5lbHMgYW5kIGRlZmluaXRpb24gb2YgZmllbGRzLlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNldFNwZWMgZXh0ZW5kcyBCYXNlU3BlYyB7XG4gIGZhY2V0OiBGYWNldDtcbiAgc3BlYzogTGF5ZXJTcGVjIHwgVW5pdFNwZWM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICAvKipcbiAgICogVW5pdCBzcGVjcyB0aGF0IHdpbGwgYmUgbGF5ZXJlZC5cbiAgICovXG4gIGxheWVyczogVW5pdFNwZWNbXTtcbn1cblxuLyoqIFRoaXMgaXMgZm9yIHRoZSBmdXR1cmUgc2NoZW1hICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuZGVkRmFjZXRTcGVjIGV4dGVuZHMgQmFzZVNwZWMge1xuICBmYWNldDogRmFjZXQ7XG5cbiAgc3BlYzogRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYztcbn1cblxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRTcGVjID0gRXh0ZW5kZWRVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcbmV4cG9ydCB0eXBlIFNwZWMgPSBVbml0U3BlYyB8IEZhY2V0U3BlYyB8IExheWVyU3BlYztcblxuLyogQ3VzdG9tIHR5cGUgZ3VhcmRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhY2V0U3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIEZhY2V0U3BlYyB7XG4gIHJldHVybiBzcGVjWydmYWNldCddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVuZGVkVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHtcbiAgaWYgKGlzU29tZVVuaXRTcGVjKHNwZWMpKSB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICByZXR1cm4gaGFzUm93IHx8IGhhc0NvbHVtbjtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBVbml0U3BlYyB7XG4gIGlmIChpc1NvbWVVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiAhaXNFeHRlbmRlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTb21lVW5pdFNwZWMoc3BlYzogRXh0ZW5kZWRTcGVjKTogc3BlYyBpcyBFeHRlbmRlZFVuaXRTcGVjIHwgVW5pdFNwZWMge1xuICByZXR1cm4gc3BlY1snbWFyayddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xheWVyU3BlYyhzcGVjOiBFeHRlbmRlZFNwZWMpOiBzcGVjIGlzIExheWVyU3BlYyB7XG4gIHJldHVybiBzcGVjWydsYXllcnMnXSAhPT0gdW5kZWZpbmVkO1xufVxuXG5cbi8qKlxuICogRGVjb21wb3NlIGV4dGVuZGVkIHVuaXQgc3BlY3MgaW50byBjb21wb3NpdGlvbiBvZiBwdXJlIHVuaXQgc3BlY3MuXG4gKi9cbi8vIFRPRE86IGNvbnNpZGVyIG1vdmluZyB0aGlzIHRvIGFub3RoZXIgZmlsZS4gIE1heWJlIHZsLnNwZWMubm9ybWFsaXplIG9yIHZsLm5vcm1hbGl6ZVxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShzcGVjOiBFeHRlbmRlZFNwZWMpOiBTcGVjIHtcbiAgaWYgKGlzRXh0ZW5kZWRVbml0U3BlYyhzcGVjKSkge1xuICAgIHJldHVybiBub3JtYWxpemVFeHRlbmRlZFVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIGlmIChpc1VuaXRTcGVjKHNwZWMpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZVVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXh0ZW5kZWRVbml0U3BlYyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogU3BlYyB7XG4gICAgY29uc3QgaGFzUm93ID0gaGFzKHNwZWMuZW5jb2RpbmcsIFJPVyk7XG4gICAgY29uc3QgaGFzQ29sdW1uID0gaGFzKHNwZWMuZW5jb2RpbmcsIENPTFVNTik7XG5cbiAgICAvLyBUT0RPOiBAYXJ2aW5kIHBsZWFzZSAgYWRkIGludGVyYWN0aW9uIHN5bnRheCBoZXJlXG4gICAgbGV0IGVuY29kaW5nID0gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcpO1xuICAgIGRlbGV0ZSBlbmNvZGluZy5jb2x1bW47XG4gICAgZGVsZXRlIGVuY29kaW5nLnJvdztcblxuICAgIHJldHVybiBleHRlbmQoXG4gICAgICBzcGVjLm5hbWUgPyB7IG5hbWU6IHNwZWMubmFtZSB9IDoge30sXG4gICAgICBzcGVjLmRlc2NyaXB0aW9uID8geyBkZXNjcmlwdGlvbjogc3BlYy5kZXNjcmlwdGlvbiB9IDoge30sXG4gICAgICB7IGRhdGE6IHNwZWMuZGF0YSB9LFxuICAgICAgc3BlYy50cmFuc2Zvcm0gPyB7IHRyYW5zZm9ybTogc3BlYy50cmFuc2Zvcm0gfSA6IHt9LFxuICAgICAge1xuICAgICAgICBmYWNldDogZXh0ZW5kKFxuICAgICAgICAgIGhhc1JvdyA/IHsgcm93OiBzcGVjLmVuY29kaW5nLnJvdyB9IDoge30sXG4gICAgICAgICAgaGFzQ29sdW1uID8geyBjb2x1bW46IHNwZWMuZW5jb2RpbmcuY29sdW1uIH0gOiB7fVxuICAgICAgICApLFxuICAgICAgICBzcGVjOiBub3JtYWxpemVVbml0U3BlYyh7XG4gICAgICAgICAgbWFyazogc3BlYy5tYXJrLFxuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNwZWMuY29uZmlnID8geyBjb25maWc6IHNwZWMuY29uZmlnIH0gOiB7fVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVVbml0U3BlYyhzcGVjOiBVbml0U3BlYyk6IFNwZWMge1xuICBjb25zdCBjb25maWcgPSBzcGVjLmNvbmZpZztcbiAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IGNvbmZpZyAmJiBjb25maWcub3ZlcmxheTtcbiAgY29uc3Qgb3ZlcmxheVdpdGhMaW5lID0gb3ZlcmxheUNvbmZpZyAgJiYgc3BlYy5tYXJrID09PSBBUkVBICYmXG4gICAgY29udGFpbnMoW0FyZWFPdmVybGF5LkxJTkVQT0lOVCwgQXJlYU92ZXJsYXkuTElORV0sIG92ZXJsYXlDb25maWcuYXJlYSk7XG4gIGNvbnN0IG92ZXJsYXlXaXRoUG9pbnQgPSBvdmVybGF5Q29uZmlnICYmIChcbiAgICAob3ZlcmxheUNvbmZpZy5saW5lICYmIHNwZWMubWFyayA9PT0gTElORSkgfHxcbiAgICAob3ZlcmxheUNvbmZpZy5hcmVhID09PSBBcmVhT3ZlcmxheS5MSU5FUE9JTlQgJiYgc3BlYy5tYXJrID09PSBBUkVBKVxuICApO1xuXG4gIC8vIFRPRE86IHRob3JvdWdobHkgdGVzdFxuICBpZiAoc3BlYy5tYXJrID09PSBFUlJPUkJBUikge1xuICAgIHJldHVybiBub3JtYWxpemVFcnJvckJhclVuaXRTcGVjKHNwZWMpO1xuICB9XG4gIC8vIFRPRE86IHRob3JvdWdobHkgdGVzdFxuICBpZiAoaXNSYW5nZWQoc3BlYy5lbmNvZGluZykpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplUmFuZ2VkVW5pdFNwZWMoc3BlYyk7XG4gIH1cblxuICBpZiAoaXNTdGFja2VkKHNwZWMpKSB7XG4gICAgLy8gV2UgY2FuJ3Qgb3ZlcmxheSBzdGFja2VkIGFyZWEgeWV0IVxuICAgIHJldHVybiBzcGVjO1xuICB9XG5cbiAgaWYgKG92ZXJsYXlXaXRoUG9pbnQgfHwgb3ZlcmxheVdpdGhMaW5lKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU92ZXJsYXkoc3BlYywgb3ZlcmxheVdpdGhQb2ludCwgb3ZlcmxheVdpdGhMaW5lKTtcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVJhbmdlZFVuaXRTcGVjKHNwZWM6IFVuaXRTcGVjKTogU3BlYyB7XG4gIGlmIChzcGVjLmVuY29kaW5nKSB7XG4gICAgY29uc3QgaGFzWCA9IGhhcyhzcGVjLmVuY29kaW5nLCBYKTtcbiAgICBjb25zdCBoYXNZID0gaGFzKHNwZWMuZW5jb2RpbmcsIFkpO1xuICAgIGNvbnN0IGhhc1gyID0gaGFzKHNwZWMuZW5jb2RpbmcsIFgyKTtcbiAgICBjb25zdCBoYXNZMiA9IGhhcyhzcGVjLmVuY29kaW5nLCBZMik7XG4gICAgaWYgKChoYXNYMiAmJiAhaGFzWCkgfHwgKGhhc1kyICYmICFoYXNZKSkge1xuICAgICAgbGV0IG5vcm1hbGl6ZWRTcGVjID0gZHVwbGljYXRlKHNwZWMpO1xuICAgICAgaWYgKGhhc1gyICYmICFoYXNYKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnggPSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy54MjtcbiAgICAgICAgZGVsZXRlIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLngyO1xuICAgICAgfVxuICAgICAgaWYgKGhhc1kyICYmICFoYXNZKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnkgPSBub3JtYWxpemVkU3BlYy5lbmNvZGluZy55MjtcbiAgICAgICAgZGVsZXRlIG5vcm1hbGl6ZWRTcGVjLmVuY29kaW5nLnkyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFNwZWM7XG4gICAgfVxuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXJyb3JCYXJVbml0U3BlYyhzcGVjOiBVbml0U3BlYyk6IFNwZWMge1xuICAvLyBGSVhNRSBjb3JyZWN0bHkgZGVhbCB3aXRoIGNvbG9yIGFuZCBvcGFjaXR5XG5cbiAgbGV0IGxheWVyU3BlYyA9IGV4dGVuZChzcGVjLm5hbWUgPyB7bmFtZTogc3BlYy5uYW1lfSA6IHt9LFxuICAgIHNwZWMuZGVzY3JpcHRpb24gPyB7ZGVzY3JpcHRpb246IHNwZWMuZGVzY3JpcHRpb259IDoge30sXG4gICAgc3BlYy5kYXRhID8ge2RhdGE6IHNwZWMuZGF0YX0gOiB7fSxcbiAgICBzcGVjLnRyYW5zZm9ybSA/IHt0cmFuc2Zvcm06IHNwZWMudHJhbnNmb3JtfSA6IHt9LFxuICAgIHNwZWMuY29uZmlnID8ge2NvbmZpZzogc3BlYy5jb25maWd9IDoge30sIHtsYXllcnM6IFtdfVxuICApO1xuICBpZiAoIXNwZWMuZW5jb2RpbmcpIHtcbiAgICByZXR1cm4gbGF5ZXJTcGVjO1xuICB9XG4gIGlmIChzcGVjLm1hcmsgPT09IEVSUk9SQkFSKSB7XG4gICAgY29uc3QgcnVsZVNwZWMgPSB7XG4gICAgICBtYXJrOiBSVUxFLFxuICAgICAgZW5jb2Rpbmc6IGV4dGVuZChcbiAgICAgICAgc3BlYy5lbmNvZGluZy54ID8ge3g6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnkgPyB7eTogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueSl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2RpbmcueDIgPyB7eDI6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngyKX0gOiB7fSxcbiAgICAgICAgc3BlYy5lbmNvZGluZy55MiA/IHt5MjogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueTIpfSA6IHt9LFxuICAgICAgICB7fSlcbiAgICB9O1xuICAgIGNvbnN0IGxvd2VyVGlja1NwZWMgPSB7XG4gICAgICBtYXJrOiBUSUNLLFxuICAgICAgZW5jb2Rpbmc6IGV4dGVuZChcbiAgICAgICAgc3BlYy5lbmNvZGluZy54ID8ge3g6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLngpfSA6IHt9LFxuICAgICAgICBzcGVjLmVuY29kaW5nLnkgPyB7eTogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueSl9IDoge30sXG4gICAgICAgIHNwZWMuZW5jb2Rpbmcuc2l6ZSA/IHtzaXplOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy5zaXplKX0gOiB7fSxcbiAgICAgICAge30pXG4gICAgfTtcbiAgICBjb25zdCB1cHBlclRpY2tTcGVjID0ge1xuICAgICAgbWFyazogVElDSyxcbiAgICAgIGVuY29kaW5nOiBleHRlbmQoe1xuICAgICAgICB4OiBzcGVjLmVuY29kaW5nLngyID8gZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueDIpIDogZHVwbGljYXRlKHNwZWMuZW5jb2RpbmcueCksXG4gICAgICAgIHk6IHNwZWMuZW5jb2RpbmcueTIgPyBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55MikgOiBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZy55KVxuICAgICAgfSwgc3BlYy5lbmNvZGluZy5zaXplID8ge3NpemU6IGR1cGxpY2F0ZShzcGVjLmVuY29kaW5nLnNpemUpfSA6IHt9KVxuICAgIH07XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKG5vcm1hbGl6ZVVuaXRTcGVjKHJ1bGVTcGVjKSk7XG4gICAgbGF5ZXJTcGVjLmxheWVycy5wdXNoKG5vcm1hbGl6ZVVuaXRTcGVjKGxvd2VyVGlja1NwZWMpKTtcbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobm9ybWFsaXplVW5pdFNwZWModXBwZXJUaWNrU3BlYykpO1xuICB9XG4gIHJldHVybiBsYXllclNwZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVPdmVybGF5KHNwZWM6IFVuaXRTcGVjLCBvdmVybGF5V2l0aFBvaW50OiBib29sZWFuLCBvdmVybGF5V2l0aExpbmU6IGJvb2xlYW4pOiBMYXllclNwZWMge1xuICBsZXQgb3V0ZXJQcm9wcyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdkYXRhJywgJ3RyYW5zZm9ybSddO1xuICBsZXQgYmFzZVNwZWMgPSBvbWl0KHNwZWMsIG91dGVyUHJvcHMuY29uY2F0KCdjb25maWcnKSk7XG5cbiAgbGV0IGJhc2VDb25maWcgPSBkdXBsaWNhdGUoc3BlYy5jb25maWcpO1xuICBkZWxldGUgYmFzZUNvbmZpZy5vdmVybGF5O1xuICAvLyBUT0RPOiByZW1vdmUgc2hhcGUsIHNpemVcblxuICBjb25zdCBsYXllclNwZWMgPSBleHRlbmQoXG4gICAgcGljayhzcGVjLCBvdXRlclByb3BzKSxcbiAgICB7IGxheWVyczogW2Jhc2VTcGVjXSB9LFxuICAgIGtleXMoYmFzZUNvbmZpZykubGVuZ3RoID4gMCA/IHsgY29uZmlnOiBiYXNlQ29uZmlnIH0gOiB7fVxuICApO1xuXG4gIGlmIChvdmVybGF5V2l0aExpbmUpIHtcbiAgICAvLyBUT0RPOiBhZGQgbmFtZSB3aXRoIHN1ZmZpeFxuICAgIGxldCBsaW5lU3BlYyA9IGR1cGxpY2F0ZShiYXNlU3BlYyk7XG4gICAgbGluZVNwZWMubWFyayA9IExJTkU7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHNoYXBlLCBzaXplXG4gICAgbGV0IG1hcmtDb25maWcgPSBleHRlbmQoe30sIGRlZmF1bHRPdmVybGF5Q29uZmlnLmxpbmVTdHlsZSwgc3BlYy5jb25maWcub3ZlcmxheS5saW5lU3R5bGUpO1xuICAgIGlmIChrZXlzKG1hcmtDb25maWcpLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmVTcGVjLmNvbmZpZyA9IHttYXJrOiBtYXJrQ29uZmlnfTtcbiAgICB9XG5cbiAgICBsYXllclNwZWMubGF5ZXJzLnB1c2gobGluZVNwZWMpO1xuICB9XG5cbiAgaWYgKG92ZXJsYXlXaXRoUG9pbnQpIHtcbiAgICAvLyBUT0RPOiBhZGQgbmFtZSB3aXRoIHN1ZmZpeFxuICAgIGxldCBwb2ludFNwZWMgPSBkdXBsaWNhdGUoYmFzZVNwZWMpO1xuICAgIHBvaW50U3BlYy5tYXJrID0gUE9JTlQ7XG4gICAgbGV0IG1hcmtDb25maWcgPSBleHRlbmQoe30sIGRlZmF1bHRPdmVybGF5Q29uZmlnLnBvaW50U3R5bGUsIHNwZWMuY29uZmlnLm92ZXJsYXkucG9pbnRTdHlsZSk7O1xuICAgIGlmIChrZXlzKG1hcmtDb25maWcpLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvaW50U3BlYy5jb25maWcgPSB7bWFyazogbWFya0NvbmZpZ307XG4gICAgfVxuICAgIGxheWVyU3BlYy5sYXllcnMucHVzaChwb2ludFNwZWMpO1xuICB9XG4gIHJldHVybiBsYXllclNwZWM7XG59XG5cbi8vIFRPRE86IGFkZCB2bC5zcGVjLnZhbGlkYXRlICYgbW92ZSBzdHVmZiBmcm9tIHZsLnZhbGlkYXRlIHRvIGhlcmVcblxuZXhwb3J0IGZ1bmN0aW9uIGFsd2F5c05vT2NjbHVzaW9uKHNwZWM6IEV4dGVuZGVkVW5pdFNwZWMpOiBib29sZWFuIHtcbiAgLy8gRklYTUUgcmF3IE94USB3aXRoICMgb2Ygcm93cyA9ICMgb2YgT1xuICByZXR1cm4gdmxFbmNvZGluZy5pc0FnZ3JlZ2F0ZShzcGVjLmVuY29kaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkRGVmcyhzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogRmllbGREZWZbXSB7XG4gIC8vIFRPRE86IHJlZmFjdG9yIHRoaXMgb25jZSB3ZSBoYXZlIGNvbXBvc2l0aW9uXG4gIHJldHVybiB2bEVuY29kaW5nLmZpZWxkRGVmcyhzcGVjLmVuY29kaW5nKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGVhblNwZWMoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEV4dGVuZGVkVW5pdFNwZWMge1xuICAvLyBUT0RPOiBtb3ZlIHRvU3BlYyB0byBoZXJlIVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RhY2tlZChzcGVjOiBFeHRlbmRlZFVuaXRTcGVjKTogYm9vbGVhbiB7XG4gIHJldHVybiBzdGFjayhzcGVjLm1hcmssIHNwZWMuZW5jb2RpbmcsIHNwZWMuY29uZmlnKSAhPT0gbnVsbDtcbn1cblxuLy8gVE9ETyByZXZpc2VcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uoc3BlYzogRXh0ZW5kZWRVbml0U3BlYyk6IEV4dGVuZGVkVW5pdFNwZWMge1xuICBjb25zdCBvbGRlbmMgPSBzcGVjLmVuY29kaW5nO1xuICBsZXQgZW5jb2RpbmcgPSBkdXBsaWNhdGUoc3BlYy5lbmNvZGluZyk7XG4gIGVuY29kaW5nLnggPSBvbGRlbmMueTtcbiAgZW5jb2RpbmcueSA9IG9sZGVuYy54O1xuICBlbmNvZGluZy5yb3cgPSBvbGRlbmMuY29sdW1uO1xuICBlbmNvZGluZy5jb2x1bW4gPSBvbGRlbmMucm93O1xuICBzcGVjLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHJldHVybiBzcGVjO1xufVxuIiwiaW1wb3J0IHtDaGFubmVsLCBTVEFDS19HUk9VUF9DSEFOTkVMUywgWCwgWX0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0VuY29kaW5nLCBoYXMsIGlzQWdncmVnYXRlfSBmcm9tICcuL2VuY29kaW5nJztcbmltcG9ydCB7TWFyaywgQkFSLCBBUkVBfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtjb250YWluc30gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gU3RhY2tPZmZzZXQge1xuICBaRVJPID0gJ3plcm8nIGFzIGFueSxcbiAgQ0VOVEVSID0gJ2NlbnRlcicgYXMgYW55LFxuICBOT1JNQUxJWkUgPSAnbm9ybWFsaXplJyBhcyBhbnksXG4gIE5PTkUgPSAnbm9uZScgYXMgYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tQcm9wZXJ0aWVzIHtcbiAgLyoqIERpbWVuc2lvbiBheGlzIG9mIHRoZSBzdGFjayAoJ3gnIG9yICd5JykuICovXG4gIGdyb3VwYnlDaGFubmVsOiBDaGFubmVsO1xuXG4gIC8qKiBNZWFzdXJlIGF4aXMgb2YgdGhlIHN0YWNrICgneCcgb3IgJ3knKS4gKi9cbiAgZmllbGRDaGFubmVsOiBDaGFubmVsO1xuXG4gIC8qKiBTdGFjay1ieSBjaGFubmVscyBlLmcuLCBjb2xvciwgZGV0YWlsICovXG4gIHN0YWNrQnlDaGFubmVsczogQ2hhbm5lbFtdO1xuXG4gIC8qKiBTdGFjayBvZmZzZXQgcHJvcGVydHkuICovXG4gIG9mZnNldDogU3RhY2tPZmZzZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFjayhtYXJrOiBNYXJrLCBlbmNvZGluZzogRW5jb2RpbmcsIGNvbmZpZzogQ29uZmlnKTogU3RhY2tQcm9wZXJ0aWVzIHtcbiAgY29uc3Qgc3RhY2tlZCA9IChjb25maWcgJiYgY29uZmlnLm1hcmspID8gY29uZmlnLm1hcmsuc3RhY2tlZCA6IHVuZGVmaW5lZDtcblxuICAvLyBTaG91bGQgbm90IGhhdmUgc3RhY2sgZXhwbGljaXRseSBkaXNhYmxlZFxuICBpZiAoY29udGFpbnMoW1N0YWNrT2Zmc2V0Lk5PTkUsIG51bGwsIGZhbHNlXSwgc3RhY2tlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIHN0YWNrYWJsZSBtYXJrXG4gIGlmICghY29udGFpbnMoW0JBUiwgQVJFQV0sIG1hcmspKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTaG91bGQgYmUgYWdncmVnYXRlIHBsb3RcbiAgaWYgKCFpc0FnZ3JlZ2F0ZShlbmNvZGluZykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIGdyb3VwaW5nIGxldmVsIG9mIGRldGFpbFxuICBjb25zdCBzdGFja0J5Q2hhbm5lbHMgPSBTVEFDS19HUk9VUF9DSEFOTkVMUy5yZWR1Y2UoKHNjLCBjaGFubmVsKSA9PiB7XG4gICAgaWYgKGhhcyhlbmNvZGluZywgY2hhbm5lbCkgJiYgIWVuY29kaW5nW2NoYW5uZWxdLmFnZ3JlZ2F0ZSkge1xuICAgICAgc2MucHVzaChjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIHNjO1xuICB9LCBbXSk7XG5cbiAgaWYgKHN0YWNrQnlDaGFubmVscy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhhcyBvbmx5IG9uZSBhZ2dyZWdhdGUgYXhpc1xuICBjb25zdCBoYXNYRmllbGQgPSBoYXMoZW5jb2RpbmcsIFgpO1xuICBjb25zdCBoYXNZRmllbGQgPSBoYXMoZW5jb2RpbmcsIFkpO1xuICBjb25zdCB4SXNBZ2dyZWdhdGUgPSBoYXNYRmllbGQgJiYgISFlbmNvZGluZy54LmFnZ3JlZ2F0ZTtcbiAgY29uc3QgeUlzQWdncmVnYXRlID0gaGFzWUZpZWxkICYmICEhZW5jb2RpbmcueS5hZ2dyZWdhdGU7XG5cbiAgaWYgKHhJc0FnZ3JlZ2F0ZSAhPT0geUlzQWdncmVnYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwYnlDaGFubmVsOiB4SXNBZ2dyZWdhdGUgPyAoaGFzWUZpZWxkID8gWSA6IG51bGwpIDogKGhhc1hGaWVsZCA/IFggOiBudWxsKSxcbiAgICAgIGZpZWxkQ2hhbm5lbDogeElzQWdncmVnYXRlID8gWCA6IFksXG4gICAgICBzdGFja0J5Q2hhbm5lbHM6IHN0YWNrQnlDaGFubmVscyxcbiAgICAgIG9mZnNldDogc3RhY2tlZCB8fCBTdGFja09mZnNldC5aRVJPXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7Q09MVU1OLCBST1csIFNIQVBFLCBDT0xPUiwgQ2hhbm5lbH0gZnJvbSAnLi9jaGFubmVsJztcbmltcG9ydCB7RGF0ZVRpbWVFeHByLCBkYXRlVGltZUV4cHJ9IGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtTY2FsZVR5cGV9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtEaWN0LCBjb250YWlucywga2V5cywgcmFuZ2V9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBlbnVtIFRpbWVVbml0IHtcbiAgWUVBUiA9ICd5ZWFyJyBhcyBhbnksXG4gIE1PTlRIID0gJ21vbnRoJyBhcyBhbnksXG4gIERBWSA9ICdkYXknIGFzIGFueSxcbiAgREFURSA9ICdkYXRlJyBhcyBhbnksXG4gIEhPVVJTID0gJ2hvdXJzJyBhcyBhbnksXG4gIE1JTlVURVMgPSAnbWludXRlcycgYXMgYW55LFxuICBTRUNPTkRTID0gJ3NlY29uZHMnIGFzIGFueSxcbiAgTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcycgYXMgYW55LFxuICBZRUFSTU9OVEggPSAneWVhcm1vbnRoJyBhcyBhbnksXG4gIC8vIE5vdGU6IGRvbid0IGFkZCBNT05USCBEQVRFIGJlY2F1c2UgaXQgd2lsbCBiZSBpbmNvcnJlY3RcbiAgLy8gc2luY2UgZGF5cyBvbiBhIGxlYXAgeWVhciB3aWxsIGJlIHNoaWZ0ZWQgYnkgb25lIGlmXG4gIC8vIHdlIG9ubHkgYWRkXG4gIFlFQVJNT05USERBVEUgPSAneWVhcm1vbnRoZGF0ZScgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFSE9VUlMgPSAneWVhcm1vbnRoZGF0ZWhvdXJzJyBhcyBhbnksXG4gIFlFQVJNT05USERBVEVIT1VSU01JTlVURVMgPSAneWVhcm1vbnRoZGF0ZWhvdXJzbWludXRlcycgYXMgYW55LFxuICBZRUFSTU9OVEhEQVRFSE9VUlNNSU5VVEVTU0VDT05EUyA9ICd5ZWFybW9udGhkYXRlaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBIT1VSU01JTlVURVMgPSAnaG91cnNtaW51dGVzJyBhcyBhbnksXG4gIEhPVVJTTUlOVVRFU1NFQ09ORFMgPSAnaG91cnNtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBNSU5VVEVTU0VDT05EUyA9ICdtaW51dGVzc2Vjb25kcycgYXMgYW55LFxuICBTRUNPTkRTTUlMTElTRUNPTkRTID0gJ3NlY29uZHNtaWxsaXNlY29uZHMnIGFzIGFueSxcbiAgUVVBUlRFUiA9ICdxdWFydGVyJyBhcyBhbnksXG4gIFlFQVJRVUFSVEVSID0gJ3llYXJxdWFydGVyJyBhcyBhbnksXG4gIFFVQVJURVJNT05USCA9ICdxdWFydGVybW9udGgnIGFzIGFueSxcbiAgWUVBUlFVQVJURVJNT05USCA9ICd5ZWFycXVhcnRlcm1vbnRoJyBhcyBhbnksXG59XG5cbi8qKiBUaW1lIFVuaXQgdGhhdCBvbmx5IGNvcnJlc3BvbmRzIHRvIG9ubHkgb25lIHBhcnQgb2YgRGF0ZSBvYmplY3RzLiAqL1xuZXhwb3J0IGNvbnN0IFNJTkdMRV9USU1FVU5JVFMgPSBbXG4gIFRpbWVVbml0LllFQVIsXG4gIFRpbWVVbml0LlFVQVJURVIsXG4gIFRpbWVVbml0Lk1PTlRILFxuICBUaW1lVW5pdC5EQVksXG4gIFRpbWVVbml0LkRBVEUsXG4gIFRpbWVVbml0LkhPVVJTLFxuICBUaW1lVW5pdC5NSU5VVEVTLFxuICBUaW1lVW5pdC5TRUNPTkRTLFxuICBUaW1lVW5pdC5NSUxMSVNFQ09ORFMsXG5dO1xuXG5jb25zdCBTSU5HTEVfVElNRVVOSVRfSU5ERVg6IERpY3Q8Ym9vbGVhbj4gPSBTSU5HTEVfVElNRVVOSVRTLnJlZHVjZSgoZCwgdGltZVVuaXQpID0+IHtcbiAgZFt0aW1lVW5pdF0gPSB0cnVlO1xuICByZXR1cm4gZDtcbn0sIHt9IGFzIERpY3Q8Ym9vbGVhbj4pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTaW5nbGVUaW1lVW5pdCh0aW1lVW5pdDogVGltZVVuaXQpIHtcbiAgcmV0dXJuICEhU0lOR0xFX1RJTUVVTklUX0lOREVYW3RpbWVVbml0XTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRhdGUgdG8gb25seSBoYXZlIHRoZSBtZWFzdXJlbWVudHMgcmVsZXZhbnQgdG8gdGhlIHNwZWNpZmllZCB1bml0XG4gKiBpLmUuICgneWVhcm1vbnRoJywgJzIwMDAtMTItMDQgMDc6NTg6MTQnKSAtPiAnMjAwMC0xMi0wMSAwMDowMDowMCdcbiAqIE5vdGU6IHRoZSBiYXNlIGRhdGUgaXMgSmFuIDAxIDE5MDAgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnQodW5pdDogVGltZVVuaXQsIGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgY29uc3QgcmVzdWx0OiBEYXRlID0gbmV3IERhdGUoMCwgMCwgMSwgMCwgMCwgMCwgMCk7IC8vIHN0YXJ0IHdpdGggdW5pZm9ybSBkYXRlXG4gIFNJTkdMRV9USU1FVU5JVFMuZm9yRWFjaChmdW5jdGlvbihzaW5nbGVVbml0KSB7XG4gICAgaWYgKGNvbnRhaW5zVGltZVVuaXQodW5pdCwgc2luZ2xlVW5pdCkpIHtcbiAgICAgIHN3aXRjaCAoc2luZ2xlVW5pdCkge1xuICAgICAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHRvIFRpbWVVbml0cyBjb250YWluaW5nIFxcJ2RheVxcJycpO1xuICAgICAgICBjYXNlIFRpbWVVbml0LllFQVI6XG4gICAgICAgICAgcmVzdWx0LnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgICAgICAvLyBpbmRpY2F0ZSBxdWFydGVyIGJ5IHNldHRpbmcgbW9udGggdG8gYmUgdGhlIGZpcnN0IG9mIHRoZSBxdWFydGVyIGkuZS4gbWF5ICg0KSAtPiBhcHJpbCAoMylcbiAgICAgICAgICByZXN1bHQuc2V0TW9udGgoKE1hdGguZmxvb3IoZGF0ZS5nZXRNb250aCgpIC8gMykpICogMyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICAgICAgcmVzdWx0LnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuREFURTpcbiAgICAgICAgICByZXN1bHQuc2V0RGF0ZShkYXRlLmdldERhdGUoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6XG4gICAgICAgICAgcmVzdWx0LnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFUzpcbiAgICAgICAgICByZXN1bHQuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzpcbiAgICAgICAgICByZXN1bHQuc2V0U2Vjb25kcyhkYXRlLmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGltZVVuaXQuTUlMTElTRUNPTkRTOlxuICAgICAgICAgIHJlc3VsdC5zZXRNaWxsaXNlY29uZHMoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgTVVMVElfVElNRVVOSVRTID0gW1xuICBUaW1lVW5pdC5ZRUFSUVVBUlRFUixcbiAgVGltZVVuaXQuWUVBUlFVQVJURVJNT05USCxcbiAgVGltZVVuaXQuWUVBUk1PTlRILFxuICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVRFLFxuICBUaW1lVW5pdC5ZRUFSTU9OVEhEQVRFSE9VUlMsXG4gIFRpbWVVbml0LllFQVJNT05USERBVEVIT1VSU01JTlVURVMsXG4gIFRpbWVVbml0LllFQVJNT05USERBVEVIT1VSU01JTlVURVNTRUNPTkRTLFxuICBUaW1lVW5pdC5RVUFSVEVSTU9OVEgsXG4gIFRpbWVVbml0LkhPVVJTTUlOVVRFUyxcbiAgVGltZVVuaXQuSE9VUlNNSU5VVEVTU0VDT05EUyxcbiAgVGltZVVuaXQuTUlOVVRFU1NFQ09ORFMsXG4gIFRpbWVVbml0LlNFQ09ORFNNSUxMSVNFQ09ORFMsXG5dO1xuXG5jb25zdCBNVUxUSV9USU1FVU5JVF9JTkRFWDogRGljdDxib29sZWFuPiA9IE1VTFRJX1RJTUVVTklUUy5yZWR1Y2UoKGQsIHRpbWVVbml0KSA9PiB7XG4gIGRbdGltZVVuaXRdID0gdHJ1ZTtcbiAgcmV0dXJuIGQ7XG59LCB7fSBhcyBEaWN0PGJvb2xlYW4+KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlUaW1lVW5pdCh0aW1lVW5pdDogVGltZVVuaXQpIHtcbiAgcmV0dXJuICEhTVVMVElfVElNRVVOSVRfSU5ERVhbdGltZVVuaXRdO1xufVxuXG5leHBvcnQgY29uc3QgVElNRVVOSVRTID0gU0lOR0xFX1RJTUVVTklUUy5jb25jYXQoTVVMVElfVElNRVVOSVRTKTtcblxuLyoqIFJldHVybnMgdHJ1ZSBpZiBmdWxsVGltZVVuaXQgY29udGFpbnMgdGhlIHRpbWVVbml0LCBmYWxzZSBvdGhlcndpc2UuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNUaW1lVW5pdChmdWxsVGltZVVuaXQ6IFRpbWVVbml0LCB0aW1lVW5pdDogVGltZVVuaXQpIHtcbiAgbGV0IGZ1bGxUaW1lVW5pdFN0ciA9IGZ1bGxUaW1lVW5pdC50b1N0cmluZygpO1xuICBsZXQgdGltZVVuaXRTdHIgPSB0aW1lVW5pdC50b1N0cmluZygpO1xuICBjb25zdCBpbmRleCA9IGZ1bGxUaW1lVW5pdFN0ci5pbmRleE9mKHRpbWVVbml0U3RyKTtcbiAgcmV0dXJuIGluZGV4ID4gLTEgJiZcbiAgICAoXG4gICAgICB0aW1lVW5pdCAhPT0gVGltZVVuaXQuU0VDT05EUyB8fFxuICAgICAgaW5kZXggPT09IDAgfHxcbiAgICAgIGZ1bGxUaW1lVW5pdFN0ci5jaGFyQXQoaW5kZXgtMSkgIT09ICdpJyAvLyBleGNsdWRlIG1pbGxpc2Vjb25kc1xuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U2NhbGVUeXBlKHRpbWVVbml0OiBUaW1lVW5pdCkge1xuICAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgIGNhc2UgVGltZVVuaXQuSE9VUlM6XG4gICAgY2FzZSBUaW1lVW5pdC5EQVk6XG4gICAgY2FzZSBUaW1lVW5pdC5NT05USDpcbiAgICBjYXNlIFRpbWVVbml0LlFVQVJURVI6XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLk9SRElOQUw7XG4gIH1cbiAgLy8gZGF0ZSwgeWVhciwgbWludXRlLCBzZWNvbmQsIHllYXJtb250aCwgbW9udGhkYXksIC4uLlxuICByZXR1cm4gU2NhbGVUeXBlLlRJTUU7XG59XG5cbi8qKlxuICogUmV0dXJucyBWZWdhIGV4cHJlc3NzaW9uIGZvciBhIGdpdmVuIHRpbWVVbml0IGFuZCBmaWVsZFJlZlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmllbGRFeHByKGZ1bGxUaW1lVW5pdDogVGltZVVuaXQsIGZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmaWVsZFJlZiA9ICdkYXR1bVtcIicgKyBmaWVsZCArICdcIl0nO1xuXG4gIGZ1bmN0aW9uIGZ1bmModGltZVVuaXQ6IFRpbWVVbml0KSB7XG4gICAgaWYgKHRpbWVVbml0ID09PSBUaW1lVW5pdC5RVUFSVEVSKSB7XG4gICAgICAvLyBEaXZpZGUgYnkgMyB0byBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgcXVhcnRlciBudW1iZXIsIG11bHRpcGx5IGJ5IDNcbiAgICAgIC8vIHRvIHNjYWxlIHRvIHRoZSBmaXJzdCBtb250aCBvZiB0aGUgY29ycmVzcG9uZGluZyBxdWFydGVyKDAsMyw2LDkpLlxuICAgICAgcmV0dXJuICdmbG9vcihtb250aCgnICsgZmllbGRSZWYgKyAnKScgKyAnLzMpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWVVbml0ICsgJygnICsgZmllbGRSZWYgKyAnKScgO1xuICAgIH1cbiAgfVxuXG4gIGxldCBkOiBEYXRlVGltZUV4cHIgPSBTSU5HTEVfVElNRVVOSVRTLnJlZHVjZSgoX2QsIHR1OiBUaW1lVW5pdCkgPT4ge1xuICAgIGlmIChjb250YWluc1RpbWVVbml0KGZ1bGxUaW1lVW5pdCwgdHUpKSB7XG4gICAgICBfZFt0dV0gPSBmdW5jKHR1KTtcbiAgICB9XG4gICAgcmV0dXJuIF9kO1xuICB9LCB7fSk7XG5cbiAgaWYgKGQuZGF5ICYmIGtleXMoZCkubGVuZ3RoID4gMSkge1xuICAgIGNvbnNvbGUud2FybignVGltZSB1bml0IFwiJysgZnVsbFRpbWVVbml0ICsnXCIgaXMgbm90IHN1cHBvcnRlZC4gV2UgYXJlIHJlcGxhY2luZyBpdCB3aXRoICcsXG4gICAgICAoZnVsbFRpbWVVbml0KycnKS5yZXBsYWNlKCdkYXknLCAnZGF0ZScpKycuJyk7XG4gICAgZGVsZXRlIGQuZGF5O1xuICAgIGQuZGF0ZSA9IGZ1bmMoVGltZVVuaXQuREFURSk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRpbWVFeHByKGQpO1xufVxuXG4vKiogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHJhdyBkb21haW4uICovXG5leHBvcnQgZnVuY3Rpb24gcmF3RG9tYWluKHRpbWVVbml0OiBUaW1lVW5pdCwgY2hhbm5lbDogQ2hhbm5lbCkge1xuICBpZiAoY29udGFpbnMoW1JPVywgQ09MVU1OLCBTSEFQRSwgQ09MT1JdLCBjaGFubmVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3dpdGNoICh0aW1lVW5pdCkge1xuICAgIGNhc2UgVGltZVVuaXQuU0VDT05EUzpcbiAgICAgIHJldHVybiByYW5nZSgwLCA2MCk7XG4gICAgY2FzZSBUaW1lVW5pdC5NSU5VVEVTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDYwKTtcbiAgICBjYXNlIFRpbWVVbml0LkhPVVJTOlxuICAgICAgcmV0dXJuIHJhbmdlKDAsIDI0KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBWTpcbiAgICAgIHJldHVybiByYW5nZSgwLCA3KTtcbiAgICBjYXNlIFRpbWVVbml0LkRBVEU6XG4gICAgICByZXR1cm4gcmFuZ2UoMSwgMzIpO1xuICAgIGNhc2UgVGltZVVuaXQuTU9OVEg6XG4gICAgICByZXR1cm4gcmFuZ2UoMCwgMTIpO1xuICAgIGNhc2UgVGltZVVuaXQuUVVBUlRFUjpcbiAgICAgIHJldHVybiBbMCwzLDYsOV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIHJldHVybnMgdGhlIHNtYWxsZXN0IG5pY2UgdW5pdCBmb3Igc2NhbGUubmljZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtYWxsZXN0VW5pdCh0aW1lVW5pdCk6IHN0cmluZyB7XG4gIGlmICghdGltZVVuaXQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlNFQ09ORFMpKSB7XG4gICAgcmV0dXJuICdzZWNvbmQnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0Lk1JTlVURVMpKSB7XG4gICAgcmV0dXJuICdtaW51dGUnO1xuICB9XG5cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkhPVVJTKSkge1xuICAgIHJldHVybiAnaG91cic7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSB8fFxuICAgICAgY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFURSkpIHtcbiAgICByZXR1cm4gJ2RheSc7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTU9OVEgpKSB7XG4gICAgcmV0dXJuICdtb250aCc7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuWUVBUikpIHtcbiAgICByZXR1cm4gJ3llYXInO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKiByZXR1cm5zIHRoZSB0ZW1wbGF0ZSBuYW1lIHVzZWQgZm9yIGF4aXMgbGFiZWxzIGZvciBhIHRpbWUgdW5pdCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRpbWVVbml0OiBUaW1lVW5pdCwgZmllbGQ6IHN0cmluZywgc2hvcnRUaW1lTGFiZWxzOiBib29sZWFuKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lVW5pdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgZGF0ZUNvbXBvbmVudHMgPSBbXTtcblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuWUVBUikpIHtcbiAgICBkYXRlQ29tcG9uZW50cy5wdXNoKHNob3J0VGltZUxhYmVscyA/ICcleScgOiAnJVknKTtcbiAgfVxuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5RVUFSVEVSKSkge1xuICAgLy8gc3BlY2lhbCB0ZW1wbGF0ZSBmb3IgcXVhcnRlclxuICAgIGRhdGVDb21wb25lbnRzLnB1c2goJ1xcJ319UXt7JyArIGZpZWxkICsgJyB8IHF1YXJ0ZXJ9fXt7JyArIGZpZWxkICsgJyB8IHRpbWU6XFwnJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTU9OVEgpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaChzaG9ydFRpbWVMYWJlbHMgPyAnJWInIDogJyVCJyk7XG4gIH1cblxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuREFZKSkge1xuICAgIGRhdGVDb21wb25lbnRzLnB1c2goc2hvcnRUaW1lTGFiZWxzID8gJyVhJyA6ICclQScpO1xuICB9IGVsc2UgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LkRBVEUpKSB7XG4gICAgZGF0ZUNvbXBvbmVudHMucHVzaCgnJWQnKTtcbiAgfVxuXG4gIGxldCB0aW1lQ29tcG9uZW50cyA9IFtdO1xuXG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5IT1VSUykpIHtcbiAgICB0aW1lQ29tcG9uZW50cy5wdXNoKCclSCcpO1xuICB9XG4gIGlmIChjb250YWluc1RpbWVVbml0KHRpbWVVbml0LCBUaW1lVW5pdC5NSU5VVEVTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVNJyk7XG4gIH1cbiAgaWYgKGNvbnRhaW5zVGltZVVuaXQodGltZVVuaXQsIFRpbWVVbml0LlNFQ09ORFMpKSB7XG4gICAgdGltZUNvbXBvbmVudHMucHVzaCgnJVMnKTtcbiAgfVxuICBpZiAoY29udGFpbnNUaW1lVW5pdCh0aW1lVW5pdCwgVGltZVVuaXQuTUlMTElTRUNPTkRTKSkge1xuICAgIHRpbWVDb21wb25lbnRzLnB1c2goJyVMJyk7XG4gIH1cblxuICBsZXQgb3V0ID0gW107XG4gIGlmIChkYXRlQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgb3V0LnB1c2goZGF0ZUNvbXBvbmVudHMuam9pbignLScpKTtcbiAgfVxuICBpZiAodGltZUNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgIG91dC5wdXNoKHRpbWVDb21wb25lbnRzLmpvaW4oJzonKSk7XG4gIH1cblxuICBpZiAob3V0Lmxlbmd0aCA+IDApIHtcbiAgICAvLyBjbGVhbiB1cCBlbXB0eSBmb3JtYXR0aW5nIGV4cHJlc3Npb25zIHRoYXQgbWF5IGhhdmUgYmVlbiBnZW5lcmF0ZWQgYnkgdGhlIHF1YXJ0ZXIgdGltZSB1bml0XG4gICAgY29uc3QgdGVtcGxhdGUgPSAne3snICsgZmllbGQgKyAnIHwgdGltZTpcXCcnICsgb3V0LmpvaW4oJyAnKSArICdcXCd9fSc7XG5cbiAgICAvLyBGSVhNRTogUmVtb3ZlIHRoZXNlIFJlZ0V4cCBIYWNrcyEhIVxuICAgIGNvbnN0IGVzY2FwZWRGaWVsZCA9IGZpZWxkLnJlcGxhY2UoLyhcXFt8XFxdKS9nLCAnXFxcXCQxJyk7IC8vIGV4Y2FwZSBmaWVsZCBmb3IgdXNlIGluIFJlZ2V4XG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCgne3snICsgZXNjYXBlZEZpZWxkICsgJyBcXFxcfCB0aW1lOlxcJ1xcJ319JywgJ2cnKSwgJycpOyAvLyByZW1vdmUgZW1wdHkgdGVtcGxhdGVzIHdpdGggUmVnZXhcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbiIsIi8qKiBDb25zdGFudHMgYW5kIHV0aWxpdGllcyBmb3IgZGF0YSB0eXBlICovXG5cbmV4cG9ydCBlbnVtIFR5cGUge1xuICBRVUFOVElUQVRJVkUgPSAncXVhbnRpdGF0aXZlJyBhcyBhbnksXG4gIE9SRElOQUwgPSAnb3JkaW5hbCcgYXMgYW55LFxuICBURU1QT1JBTCA9ICd0ZW1wb3JhbCcgYXMgYW55LFxuICBOT01JTkFMID0gJ25vbWluYWwnIGFzIGFueVxufVxuXG5leHBvcnQgY29uc3QgUVVBTlRJVEFUSVZFID0gVHlwZS5RVUFOVElUQVRJVkU7XG5leHBvcnQgY29uc3QgT1JESU5BTCA9IFR5cGUuT1JESU5BTDtcbmV4cG9ydCBjb25zdCBURU1QT1JBTCA9IFR5cGUuVEVNUE9SQUw7XG5leHBvcnQgY29uc3QgTk9NSU5BTCA9IFR5cGUuTk9NSU5BTDtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gZnVsbCB0eXBlIG5hbWVzIHRvIHNob3J0IHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgU0hPUlRfVFlQRSA9IHtcbiAgcXVhbnRpdGF0aXZlOiAnUScsXG4gIHRlbXBvcmFsOiAnVCcsXG4gIG5vbWluYWw6ICdOJyxcbiAgb3JkaW5hbDogJ08nXG59O1xuLyoqXG4gKiBNYXBwaW5nIGZyb20gc2hvcnQgdHlwZSBuYW1lcyB0byBmdWxsIHR5cGUgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgVFlQRV9GUk9NX1NIT1JUX1RZUEUgPSB7XG4gIFE6IFFVQU5USVRBVElWRSxcbiAgVDogVEVNUE9SQUwsXG4gIE86IE9SRElOQUwsXG4gIE46IE5PTUlOQUxcbn07XG5cbi8qKlxuICogR2V0IGZ1bGwsIGxvd2VyY2FzZSB0eXBlIG5hbWUgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSAgdHlwZVxuICogQHJldHVybiBGdWxsIHR5cGUgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxOYW1lKHR5cGU6IFR5cGUpOiBUeXBlIHtcbiAgY29uc3QgdHlwZVN0cmluZyA9IDxhbnk+dHlwZTsgIC8vIGZvcmNlIHR5cGUgYXMgc3RyaW5nIHNvIHdlIGNhbiB0cmFuc2xhdGUgc2hvcnQgdHlwZXNcbiAgcmV0dXJuIFRZUEVfRlJPTV9TSE9SVF9UWVBFW3R5cGVTdHJpbmcudG9VcHBlckNhc2UoKV0gfHwgLy8gc2hvcnQgdHlwZSBpcyB1cHBlcmNhc2UgYnkgZGVmYXVsdFxuICAgICAgICAgdHlwZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvZGF0YWxpYi5kLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvanNvbi1zdGFibGUtc3RyaW5naWZ5LmQudHNcIi8+XG5cbmltcG9ydCAqIGFzIHN0cmluZ2lmeSBmcm9tICdqc29uLXN0YWJsZS1zdHJpbmdpZnknO1xuZXhwb3J0IHtrZXlzLCBleHRlbmQsIGR1cGxpY2F0ZSwgaXNBcnJheSwgdmFscywgdHJ1bmNhdGUsIHRvTWFwLCBpc09iamVjdCwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuaW1wb3J0IHtkdXBsaWNhdGUgYXMgX2R1cGxpY2F0ZX0gZnJvbSAnZGF0YWxpYi9zcmMvdXRpbCc7XG5leHBvcnQge3JhbmdlfSBmcm9tICdkYXRhbGliL3NyYy9nZW5lcmF0ZSc7XG5cbmltcG9ydCB7aXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW59IGZyb20gJ2RhdGFsaWIvc3JjL3V0aWwnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgb2JqZWN0IHByb3BlcnRpZXMuXG4gKlxuICogRXhhbXBsZTogIChmcm9tIGxvZGFzaClcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqIHBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vIOKGkiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaWNrKG9iajogYW55LCBwcm9wczogc3RyaW5nW10pIHtcbiAgbGV0IGNvcHkgPSB7fTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGNvcHlbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIF8ucGljazsgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIG93blxuICogYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIG9iamVjdCB0aGF0IGFyZSBub3Qgb21pdHRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9taXQob2JqOiBhbnksIHByb3BzOiBzdHJpbmdbXSkge1xuICBsZXQgY29weSA9IF9kdXBsaWNhdGUob2JqKTtcbiAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGRlbGV0ZSBjb3B5W3Byb3BdO1xuICB9KTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKGE6IGFueSkge1xuICBpZiAoaXNTdHJpbmcoYSkgfHwgaXNOdW1iZXIoYSkgfHwgaXNCb29sZWFuKGEpKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKTtcbiAgfVxuICByZXR1cm4gc3RyaW5naWZ5KGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnM8VD4oYXJyYXk6IEFycmF5PFQ+LCBpdGVtOiBUKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pID4gLTE7XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBhcnJheSB3aXRob3V0IHRoZSBlbGVtZW50cyBpbiBpdGVtICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dDxUPihhcnJheTogQXJyYXk8VD4sIGV4Y2x1ZGVkSXRlbXM6IEFycmF5PFQ+KSB7XG4gIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhY29udGFpbnMoZXhjbHVkZWRJdGVtcywgaXRlbSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248VD4oYXJyYXk6IEFycmF5PFQ+LCBvdGhlcjogQXJyYXk8VD4pIHtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCh3aXRob3V0KG90aGVyLCBhcnJheSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmouZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoLmNhbGwodGhpc0FyZywgZik7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShvYmosIGY6IChhLCBpLCBkLCBrLCBvKSA9PiBhbnksIGluaXQsIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoucmVkdWNlKSB7XG4gICAgcmV0dXJuIG9iai5yZWR1Y2UuY2FsbCh0aGlzQXJnLCBmLCBpbml0KTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpbml0ID0gZi5jYWxsKHRoaXNBcmcsIGluaXQsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluaXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChvYmosIGY6IChhLCBkLCBrLCBvKSA9PiBhbnksIHRoaXNBcmc/KSB7XG4gIGlmIChvYmoubWFwKSB7XG4gICAgcmV0dXJuIG9iai5tYXAuY2FsbCh0aGlzQXJnLCBmKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goZi5jYWxsKHRoaXNBcmcsIG9ialtrXSwgaywgb2JqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4oYXJyOiBBcnJheTxUPiwgZjogKGQ6IFQsIGs/LCBpPykgPT4gYm9vbGVhbikge1xuICBsZXQgaSA9IDA7XG4gIGZvciAobGV0IGsgPSAwOyBrPGFyci5sZW5ndGg7IGsrKykge1xuICAgIGlmIChmKGFycltrXSwgaywgaSsrKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5PFQ+KGFycjogQXJyYXk8VD4sIGY6IChkOiBULCBrPywgaT8pID0+IGJvb2xlYW4pIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBrID0gMDsgazxhcnIubGVuZ3RoOyBrKyspIHtcbiAgICBpZiAoIWYoYXJyW2tdLCBrLCBpKyspKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnJheXM6IGFueVtdKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAoZGVzdCwgLi4uc3JjOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyYy5sZW5ndGg7IGkrKykge1xuICAgIGRlc3QgPSBkZWVwTWVyZ2VfKGRlc3QsIHNyY1tpXSk7XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vLyByZWN1cnNpdmVseSBtZXJnZXMgc3JjIGludG8gZGVzdFxuZnVuY3Rpb24gZGVlcE1lcmdlXyhkZXN0LCBzcmMpIHtcbiAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZm9yIChsZXQgcCBpbiBzcmMpIHtcbiAgICBpZiAoIXNyYy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzcmNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3JjW3BdICE9PSAnb2JqZWN0JyB8fCBzcmNbcF0gPT09IG51bGwpIHtcbiAgICAgIGRlc3RbcF0gPSBzcmNbcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVzdFtwXSAhPT0gJ29iamVjdCcgfHwgZGVzdFtwXSA9PT0gbnVsbCkge1xuICAgICAgZGVzdFtwXSA9IG1lcmdlRGVlcChzcmNbcF0uY29uc3RydWN0b3IgPT09IEFycmF5ID8gW10gOiB7fSwgc3JjW3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VEZWVwKGRlc3RbcF0sIHNyY1twXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG4vLyBGSVhNRSByZW1vdmUgdGhpc1xuaW1wb3J0ICogYXMgZGxCaW4gZnJvbSAnZGF0YWxpYi9zcmMvYmlucy9iaW5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRiaW5zKHN0YXRzLCBtYXhiaW5zKSB7XG4gIHJldHVybiBkbEJpbih7XG4gICAgbWluOiBzdGF0cy5taW4sXG4gICAgbWF4OiBzdGF0cy5tYXgsXG4gICAgbWF4YmluczogbWF4Ymluc1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZTxUPih2YWx1ZXM6IFRbXSwgZj86IChpdGVtOiBUKSA9PiBzdHJpbmcpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHZhbHVlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlOiBhbnkpIHtcbiAgY29uc29sZS53YXJuKCdbVkwgV2FybmluZ10nLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IGFueSkge1xuICBjb25zb2xlLmVycm9yKCdbVkwgRXJyb3JdJywgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdDxUPiB7XG4gIFtrZXk6IHN0cmluZ106IFQ7XG59XG5cbmV4cG9ydCB0eXBlIFN0cmluZ1NldCA9IERpY3Q8Ym9vbGVhbj47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gZGljaXRvbmFyaWVzIGRpc2FncmVlLiBBcHBsaWVzIG9ubHkgdG8gZGVmaW9uZWQgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyPFQ+KGRpY3Q6IERpY3Q8VD4sIG90aGVyOiBEaWN0PFQ+KSB7XG4gIGZvciAobGV0IGtleSBpbiBkaWN0KSB7XG4gICAgaWYgKGRpY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG90aGVyW2tleV0gJiYgZGljdFtrZXldICYmIG90aGVyW2tleV0gIT09IGRpY3Rba2V5XSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtFeHRlbmRlZFVuaXRTcGVjfSBmcm9tICcuL3NwZWMnO1xuXG4vLyBUT0RPOiBtb3ZlIHRvIHZsLnNwZWMudmFsaWRhdG9yP1xuXG5pbXBvcnQge3RvTWFwfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtCQVJ9IGZyb20gJy4vbWFyayc7XG5cbmludGVyZmFjZSBSZXF1aXJlZENoYW5uZWxNYXAge1xuICBbbWFyazogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSZXF1aXJlZCBFbmNvZGluZyBDaGFubmVscyBmb3IgZWFjaCBtYXJrIHR5cGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQOiBSZXF1aXJlZENoYW5uZWxNYXAgPSB7XG4gIHRleHQ6IFsndGV4dCddLFxuICBsaW5lOiBbJ3gnLCAneSddLFxuICBhcmVhOiBbJ3gnLCAneSddXG59O1xuXG5pbnRlcmZhY2UgU3VwcG9ydGVkQ2hhbm5lbE1hcCB7XG4gIFttYXJrOiBzdHJpbmddOiB7XG4gICAgW2NoYW5uZWw6IHN0cmluZ106IG51bWJlclxuICB9O1xufVxuXG4vKipcbiAqIFN1cHBvcnRlZCBFbmNvZGluZyBDaGFubmVsIGZvciBlYWNoIG1hcmsgdHlwZVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0ge1xuICBiYXI6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnc2l6ZScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIGxpbmU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLCAvLyBUT0RPOiBhZGQgc2l6ZSB3aGVuIFZlZ2Egc3VwcG9ydHNcbiAgYXJlYTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdkZXRhaWwnXSksXG4gIHRpY2s6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnZGV0YWlsJ10pLFxuICBjaXJjbGU6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnXSksXG4gIHNxdWFyZTogdG9NYXAoWydyb3cnLCAnY29sdW1uJywgJ3gnLCAneScsICdjb2xvcicsICdzaXplJywgJ2RldGFpbCddKSxcbiAgcG9pbnQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICd4JywgJ3knLCAnY29sb3InLCAnc2l6ZScsICdkZXRhaWwnLCAnc2hhcGUnXSksXG4gIHRleHQ6IHRvTWFwKFsncm93JywgJ2NvbHVtbicsICdzaXplJywgJ2NvbG9yJywgJ3RleHQnXSkgLy8gVE9ETygjNzI0KSByZXZpc2Vcbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIGlmIHdlIHNob3VsZCBhZGQgdmFsaWRhdGUgbWV0aG9kIGFuZFxuLy8gcmVxdWlyZXMgWlNjaGVtYSBpbiB0aGUgbWFpbiB2ZWdhLWxpdGUgcmVwb1xuXG4vKipcbiAqIEZ1cnRoZXIgY2hlY2sgaWYgZW5jb2RpbmcgbWFwcGluZyBvZiBhIHNwZWMgaXMgaW52YWxpZCBhbmRcbiAqIHJldHVybiBlcnJvciBpZiBpdCBpcyBpbnZhbGlkLlxuICpcbiAqIFRoaXMgY2hlY2tzIGlmXG4gKiAoMSkgYWxsIHRoZSByZXF1aXJlZCBlbmNvZGluZyBjaGFubmVscyBmb3IgdGhlIG1hcmsgdHlwZSBhcmUgc3BlY2lmaWVkXG4gKiAoMikgYWxsIHRoZSBzcGVjaWZpZWQgZW5jb2RpbmcgY2hhbm5lbHMgYXJlIHN1cHBvcnRlZCBieSB0aGUgbWFyayB0eXBlXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNwZWMgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UmVxdWlyZWRDaGFubmVsTWFwICA9IERlZmF1bHRSZXF1aXJlZENoYW5uZWxNYXB9ICByZXF1aXJlZENoYW5uZWxNYXBcbiAqIEBwYXJhbSAge1N1cHBvcnRlZENoYW5uZWxNYXAgPSBEZWZhdWx0U3VwcG9ydGVkQ2hhbm5lbE1hcH0gc3VwcG9ydGVkQ2hhbm5lbE1hcFxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm4gb25lIHJlYXNvbiB3aHkgdGhlIGVuY29kaW5nIGlzIGludmFsaWQsXG4gKiAgICAgICAgICAgICAgICAgIG9yIG51bGwgaWYgdGhlIGVuY29kaW5nIGlzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5jb2RpbmdNYXBwaW5nRXJyb3Ioc3BlYzogRXh0ZW5kZWRVbml0U3BlYyxcbiAgcmVxdWlyZWRDaGFubmVsTWFwOiBSZXF1aXJlZENoYW5uZWxNYXAgPSBERUZBVUxUX1JFUVVJUkVEX0NIQU5ORUxfTUFQLFxuICBzdXBwb3J0ZWRDaGFubmVsTWFwOiBTdXBwb3J0ZWRDaGFubmVsTWFwID0gREVGQVVMVF9TVVBQT1JURURfQ0hBTk5FTF9UWVBFXG4gICkge1xuICBsZXQgbWFyayA9IHNwZWMubWFyaztcbiAgbGV0IGVuY29kaW5nID0gc3BlYy5lbmNvZGluZztcbiAgbGV0IHJlcXVpcmVkQ2hhbm5lbHMgPSByZXF1aXJlZENoYW5uZWxNYXBbbWFya107XG4gIGxldCBzdXBwb3J0ZWRDaGFubmVscyA9IHN1cHBvcnRlZENoYW5uZWxNYXBbbWFya107XG5cbiAgZm9yIChsZXQgaSBpbiByZXF1aXJlZENoYW5uZWxzKSB7IC8vIGFsbCByZXF1aXJlZCBjaGFubmVscyBhcmUgaW4gZW5jb2RpbmdgXG4gICAgaWYgKCEocmVxdWlyZWRDaGFubmVsc1tpXSBpbiBlbmNvZGluZykpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBlbmNvZGluZyBjaGFubmVsIFxcXCInICsgcmVxdWlyZWRDaGFubmVsc1tpXSArXG4gICAgICAgICdcXFwiIGZvciBtYXJrIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBjaGFubmVsIGluIGVuY29kaW5nKSB7IC8vIGFsbCBjaGFubmVscyBpbiBlbmNvZGluZyBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKCFzdXBwb3J0ZWRDaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgcmV0dXJuICdFbmNvZGluZyBjaGFubmVsIFxcXCInICsgY2hhbm5lbCArXG4gICAgICAgICdcXFwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgbWFyayB0eXBlIFxcXCInICsgbWFyayArICdcXFwiJztcbiAgICB9XG4gIH1cblxuICBpZiAobWFyayA9PT0gQkFSICYmICFlbmNvZGluZy54ICYmICFlbmNvZGluZy55KSB7XG4gICAgcmV0dXJuICdNaXNzaW5nIGJvdGggeCBhbmQgeSBmb3IgYmFyJztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtTY2FsZVR5cGUsIE5pY2VUaW1lfSBmcm9tICcuL3NjYWxlJztcblxuZXhwb3J0IGludGVyZmFjZSBWZ0RhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgdmFsdWVzPzogYW55O1xuICBmb3JtYXQ/OiBhbnk7XG4gIHVybD86IGFueTtcbiAgdHJhbnNmb3JtPzogYW55O1xufVxuXG50eXBlIFZnUGFyZW50UmVmID0ge1xuICBwYXJlbnQ6IHN0cmluZ1xufTtcblxudHlwZSBWZ0ZpZWxkUmVmID0gc3RyaW5nIHwgVmdQYXJlbnRSZWYgfCBWZ1BhcmVudFJlZltdO1xuXG5leHBvcnQgdHlwZSBWZ0RhdGFSZWYgPSB7XG4gIGRhdGE6IHN0cmluZyxcbiAgZmllbGQ6IFZnRmllbGRSZWYsXG4gIHNvcnQ6IGJvb2xlYW4gfCB7XG4gICAgZmllbGQ6IFZnRmllbGRSZWYsXG4gICAgb3A6IHN0cmluZ1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBWZ1ZhbHVlUmVmID0ge1xuICB2YWx1ZT86IGFueSxcbiAgZmllbGQ/OiBzdHJpbmcgfCB7XG4gICAgZGF0dW0/OiBzdHJpbmcsXG4gICAgZ3JvdXA/OiBzdHJpbmcsXG4gICAgcGFyZW50Pzogc3RyaW5nXG4gIH0sXG4gIHRlbXBsYXRlPzogc3RyaW5nLFxuICBzY2FsZT86IHN0cmluZywgLy8gVE9ETzogb2JqZWN0XG4gIG11bHQ/OiBudW1iZXIsXG4gIG9mZnNldD86IG51bWJlcixcbiAgYmFuZD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVW5pb25lZERvbWFpbiA9IHtcbiAgZmllbGRzOiBWZ0RhdGFSZWZbXVxufTtcblxuZXhwb3J0IHR5cGUgVmdTY2FsZSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICB0eXBlOiBTY2FsZVR5cGUsXG4gIGRvbWFpbj86IGFueVtdIHwgVW5pb25lZERvbWFpbiB8IFZnRGF0YVJlZixcbiAgZG9tYWluTWluPzogYW55LFxuICBkb21haW5NYXg/OiBhbnlcbiAgcmFuZ2U/OiBhbnlbXSB8IFZnRGF0YVJlZiB8IHN0cmluZyxcbiAgcmFuZ2VNaW4/OiBhbnksXG4gIHJhbmdlTWF4PzogYW55LFxuXG4gIGJhbmRTaXplPzogbnVtYmVyLFxuICBjbGFtcD86IGJvb2xlYW4sXG4gIGV4cG9uZW50PzogbnVtYmVyLFxuICBuaWNlPzogYm9vbGVhbiB8IE5pY2VUaW1lLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBwb2ludHM/OiBib29sZWFuLFxuICByZXZlcnNlPzogYm9vbGVhbixcbiAgcm91bmQ/OiBib29sZWFuLFxuICB6ZXJvPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmlvbmVkRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFVuaW9uZWREb21haW4ge1xuICBpZiAoIWlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiAnZmllbGRzJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhUmVmRG9tYWluKGRvbWFpbjogYW55W10gfCBVbmlvbmVkRG9tYWluIHwgVmdEYXRhUmVmKTogZG9tYWluIGlzIFZnRGF0YVJlZiB7XG4gIGlmICghaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuICdkYXRhJyBpbiBkb21haW47XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUT0RPOiBkZWNsYXJlXG5leHBvcnQgdHlwZSBWZ01hcmtHcm91cCA9IGFueTtcbmV4cG9ydCB0eXBlIFZnQXhpcyA9IGFueTtcbmV4cG9ydCB0eXBlIFZnTGVnZW5kID0gYW55O1xuZXhwb3J0IHR5cGUgVmdUcmFuc2Zvcm0gPSBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmdTdGFja1RyYW5zZm9ybSB7XG4gIHR5cGU6IHN0cmluZztcbiAgb2Zmc2V0PzogYW55O1xuICBncm91cGJ5OiBhbnk7XG4gIGZpZWxkOiBhbnk7XG4gIHNvcnRieTogYW55O1xuICBvdXRwdXQ6IGFueTtcbn1cbiIsImV4cG9ydCBpbXBvcnQgYXhpcyA9IHJlcXVpcmUoJy4vYXhpcycpO1xuZXhwb3J0IGltcG9ydCBhZ2dyZWdhdGUgPSByZXF1aXJlKCcuL2FnZ3JlZ2F0ZScpO1xuZXhwb3J0IGltcG9ydCBiaW4gPSByZXF1aXJlKCcuL2JpbicpO1xuZXhwb3J0IGltcG9ydCBjaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsJyk7XG5leHBvcnQgY29uc3QgY29tcGlsZSA9IHJlcXVpcmUoJy4vY29tcGlsZS9jb21waWxlJykuY29tcGlsZTtcbmV4cG9ydCBpbXBvcnQgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmV4cG9ydCBpbXBvcnQgZGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpO1xuZXhwb3J0IGltcG9ydCBkYXRldGltZSA9IHJlcXVpcmUoJy4vZGF0ZXRpbWUnKTtcbmV4cG9ydCBpbXBvcnQgZW5jb2RpbmcgPSByZXF1aXJlKCcuL2VuY29kaW5nJyk7XG5leHBvcnQgaW1wb3J0IGZhY2V0ID0gcmVxdWlyZSgnLi9mYWNldCcpO1xuZXhwb3J0IGltcG9ydCBmaWVsZERlZiA9IHJlcXVpcmUoJy4vZmllbGRkZWYnKTtcbmV4cG9ydCBpbXBvcnQgbGVnZW5kID0gcmVxdWlyZSgnLi9sZWdlbmQnKTtcbmV4cG9ydCBpbXBvcnQgbWFyayA9IHJlcXVpcmUoJy4vbWFyaycpO1xuZXhwb3J0IGltcG9ydCBzY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbmV4cG9ydCBpbXBvcnQgc2hvcnRoYW5kID0gcmVxdWlyZSgnLi9zaG9ydGhhbmQnKTtcbmV4cG9ydCBpbXBvcnQgc29ydCA9IHJlcXVpcmUoJy4vc29ydCcpO1xuZXhwb3J0IGltcG9ydCBzcGVjID0gcmVxdWlyZSgnLi9zcGVjJyk7XG5leHBvcnQgaW1wb3J0IHN0YWNrID0gcmVxdWlyZSgnLi9zdGFjaycpO1xuZXhwb3J0IGltcG9ydCB0aW1lVW5pdCA9IHJlcXVpcmUoJy4vdGltZXVuaXQnKTtcbmV4cG9ydCBpbXBvcnQgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKTtcbmV4cG9ydCBpbXBvcnQgdHlwZSA9IHJlcXVpcmUoJy4vdHlwZScpO1xuZXhwb3J0IGltcG9ydCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5leHBvcnQgaW1wb3J0IHZhbGlkYXRlID0gcmVxdWlyZSgnLi92YWxpZGF0ZScpO1xuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICdfX1ZFUlNJT05fXyc7XG4iXX0=
