/*
 TechanJS v0.8.0
 (c) 2014 - 2016 Andre Dumas | https://github.com/andredumas/techan.js
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.techan = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';module.exports='0.8.0';
},{}],2:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      adx = function(d) { return d.adx; },
      plusDi = function(d) { return d.plusDi; },
      minusDi = function(d) { return d.minusDi; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.adx = function(_) {
    if (!arguments.length) return adx;
    adx = _;
    return bind();
  };

  accessor.plusDi = function(_) {
    if (!arguments.length) return plusDi;
    plusDi = _;
    return bind();
  };

  accessor.minusDi = function(_) {
    if (!arguments.length) return minusDi;
    minusDi = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.adx = adx;
    accessor.plusDi = plusDi;
    accessor.minusDi = minusDi;

    return accessor;
  }

  return bind();
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function() {

  var date = function(d) { return d.date; },
      up = function(d) { return d.up; },
      down = function(d) { return d.down; },
      oscillator = function(d) { return d.oscillator; },
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.up = function(_) {
    if (!arguments.length) return up;
    up = _;
    return bind();
  };
  accessor.down = function(_) {
    if (!arguments.length) return down;
    down = _;
    return bind();
  };

  accessor.oscillator = function(_) {
    if (!arguments.length) return oscillator;
    oscillator = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.up = up;
    accessor.down = down;
    accessor.oscillator = oscillator;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};
},{}],4:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      up = function(d) { return d.up; },
      down = function(d) { return d.down; };

  function accessor(d) {
    return accessor.up(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.up = function(_) {
    if (!arguments.length) return up;
    up = _;
    return bind();
  };

  accessor.down = function(_) {
    if (!arguments.length) return down;
    down = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.up = up;
    accessor.dn = down;

    return accessor;
  }

  return bind();
};
},{}],5:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      middle = function(d) { return d.middleBand; },
      upper = function(d) { return d.upperBand; },
      lower = function(d) { return d.lowerBand; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  accessor.upper = function(_) {
    if (!arguments.length) return upper;
    upper = _;
    return bind();
  };

  accessor.lower = function(_) {
    if (!arguments.length) return lower;
    lower = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.middle = middle;
    accessor.upper = upper;
    accessor.lower = lower;

    return accessor;
  }

  return bind();
};
},{}],6:[function(require,module,exports){
'use strict';

module.exports = function() {
  /**
   * Supports getter and setter. Watch out if used in d3 and the second parameter is an index!!
   * This approach needs further thought.
   * @param d Underlying data object to get or set the value
   * @param _ If passed turns into a setter. This is the value to set
   * @returns {*}
   */
  var x = function(d, _) {
        if(arguments.length < 2) return d.x;
        d.x = _;
        return accessor;
      },
        /**
         * Supports getter and setter. Watch out if used in d3 and the second parameter is an index!!
         * This approach needs further thought.
         * @param d Underlying data object to get or set the value
         * @param _ If passed turns into a setter. This is the value to set
         * @returns {*}
         */
      y = function(d, _) {
        if(arguments.length < 2) return d.y;
        d.y = _;
        return accessor;
      };

  function accessor(d) {
    return accessor.xv(d);
  }

  accessor.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return bind();
  };

  accessor.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return bind();
  };

  function bind() {
    accessor.xv = x;
    accessor.yv = y;

    return accessor;
  }

  return bind();
};
},{}],7:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      tenkanSen = function(d) { return d.tenkanSen; },                  // Conversion line
      kijunSen = function(d) { return d.kijunSen; },                    // Base Line
      senkouSpanA = function(d) { return d.senkouSpanA; },              // Leading Span A
      senkouSpanB = function(d) { return d.senkouSpanB;},               // Leading Span B
      chikouSpan = function(d) { return d.chikouSpan;},                 // Lagging Span
      // Functions to get to the parameters
      ptenanSen = function(d) { return d.parameters.tenkanSen; },       // Parameter: Conversion Line Period
      pkijunSen = function(d) { return d.parameters.kijunSen; },        // Parameter: Base Line Period, Offset
      psenkouSpanB = function(d) { return d.parameters.senkouSpanB; };  // Parameter: Senkou Span B Period, Offset

  function accessor(d) {
    return accessor.ts(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.tenkanSen = function(_) {
    if (!arguments.length) return tenkanSen;
    tenkanSen = _;
    return bind();
  };

  accessor.kijunSen = function(_) {
    if (!arguments.length) return kijunSen;
    kijunSen = _;
    return bind();
  };

  accessor.senkouSpanA = function(_) {
    if (!arguments.length) return senkouSpanA;
    senkouSpanA = _;
    return bind();
  };

  accessor.senkouSpanB = function(_) {
    if (!arguments.length) return senkouSpanB;
    senkouSpanB = _;
    return bind();
  };

  accessor.chikouSpan = function(_) {
    if (!arguments.length) return chikouSpan;
    chikouSpan = _;
    return bind();
  };

  accessor.ptenanSen = function(_) {
    if (!arguments.length) return ptenanSen;
    ptenanSen = _;
    return bind();
  };

  accessor.pkijunSen = function(_) {
    if (!arguments.length) return pkijunSen;
    pkijunSen = _;
    return bind();
  };

  accessor.psenkouSpanB = function(_) {
    if (!arguments.length) return psenkouSpanB;
    psenkouSpanB = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.ts = tenkanSen;
    accessor.ks = kijunSen;
    accessor.sa = senkouSpanA;
    accessor.sb = senkouSpanB;
    accessor.c = chikouSpan;
    accessor.pts = ptenanSen;
    accessor.pks = pkijunSen;
    accessor.pssb = psenkouSpanB;

    return accessor;
  }

  return bind();
};
},{}],8:[function(require,module,exports){
'use strict';

// Provide IDs for all accessors. Default to date, but at least provide an option
module.exports = function() {
  return {
    atrtrailingstop: require('./atrtrailingstop'),
    crosshair: require('./crosshair'),
    ichimoku: require('./ichimoku'),
    macd: require('./macd'),
    ohlc: require('./ohlc'),
    rsi: require('./rsi'),
    trendline: require('./trendline'),
    value: require('./value'),
    volume: require('./volume'),
    tick: require('./tick'),
    trade: require('./trade'),
    adx: require('./adx'),
    aroon: require('./aroon'),
    stochastic: require('./stochastic'),
    supstance: require('./supstance'),
    williams: require('./williams'),
    bollinger: require('./bollinger')
  };
};

},{"./adx":2,"./aroon":3,"./atrtrailingstop":4,"./bollinger":5,"./crosshair":6,"./ichimoku":7,"./macd":9,"./ohlc":10,"./rsi":11,"./stochastic":12,"./supstance":13,"./tick":14,"./trade":15,"./trendline":16,"./value":17,"./volume":18,"./williams":19}],9:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      macd = function(d) { return d.macd; },
      zero = function(d) { return d.zero; },
      signal = function(d) { return d.signal;},
      difference = function(d) { return d.difference;};

  function accessor(d) {
    return accessor.m(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.macd = function(_) {
    if (!arguments.length) return macd;
    macd = _;
    return bind();
  };

  accessor.signal = function(_) {
    if (!arguments.length) return signal;
    signal = _;
    return bind();
  };

  accessor.difference = function(_) {
    if (!arguments.length) return difference;
    difference = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.m = macd;
    accessor.s = signal;
    accessor.dif = difference;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
},{}],10:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      open = function(d) { return d.open; },
      high = function(d) { return d.high; },
      low = function(d) { return d.low; },
      close = function(d) { return d.close;},
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.c(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.open = function(_) {
    if (!arguments.length) return open;
    open = _;
    return bind();
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return bind();
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return bind();
  };

  accessor.close = function(_) {
    if (!arguments.length) return close;
    close = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.o = open;
    accessor.h = high;
    accessor.l = low;
    accessor.c = close;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
},{}],11:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      rsi = function(d) { return d.rsi; },
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.rsi = function(_) {
    if (!arguments.length) return rsi;
    rsi = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.r = rsi;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};
},{}],12:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      stochasticK = function(d) { return d.stochasticK; },
      stochasticD = function(d) { return d.stochasticD; },
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.stochasticK = function(_) {
    if (!arguments.length) return stochasticK;
    stochasticK = _;
    return bind();
  };
  accessor.stochasticD = function(_) {
    if (!arguments.length) return stochasticD;
    stochasticD = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.k = stochasticK;
    accessor.sd = stochasticD;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};
},{}],13:[function(require,module,exports){
'use strict';

module.exports = function() {
  var start = function(d) { return d.start; },
      end = function(d) { return d.end; },
    /**
     * Supports getter and setter
     * @param d Underlying data object to get or set the value
     * @param _ If passed turns into a setter. This is the value to set
     * @returns {*}
     */
    value = function(d, _) {
      if(arguments.length < 2) return d.value;
      d.value = _;
      return accessor;
    };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.start = function(_) {
    if (!arguments.length) return start;
    start = _;
    return bind();
  };

  accessor.end = function(_) {
    if (!arguments.length) return end;
    end = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  function bind() {
    accessor.s = start;
    accessor.e = end;
    accessor.v = value;

    return accessor;
  }

  return bind();
};
},{}],14:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      high = function(d) { return d.high; },
      low = function(d) { return d.low; },
      spread = function(d) { return d.spread; };

  function accessor(d) {
    bind();
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return bind();
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return bind();
  };

  accessor.spread = function(_) {
    if (!arguments.length) return spread;
    spread = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.h = high;
    accessor.l = low;
    accessor.s = spread;

    return accessor;
  }

  return bind();
};
},{}],15:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      type = function(d) { return d.type; },
      price = function(d) { return d.price; };

  function accessor(d) {
    return accessor.p(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  /**
   * A function which returns a string representing the type of this trade
   * @param _ A constant string or function which takes a data point and returns a string of valid classname format
   */
  accessor.type = function(_) {
    if (!arguments.length) return type;
    type = _;
    return bind();
  };

  accessor.price = function(_) {
    if (!arguments.length) return price;
    price = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.t = type;
    accessor.p = price;

    return accessor;
  }

  return bind();
};
},{}],16:[function(require,module,exports){
'use strict';

module.exports = function() {
  var startDate = function(d, _) {
        if(arguments.length < 2) return d.start.date;
        d.start.date = _;
      },
      startValue = function(d, _) {
        if(arguments.length < 2) return d.start.value;
        d.start.value = _;
      },
      endDate = function(d, _) {
        if(arguments.length < 2) return d.end.date;
        d.end.date = _;
      },
      endValue = function(d, _) {
        if(arguments.length < 2) return d.end.value;
        d.end.value = _;
      };

  function accessor(d) {
    return accessor.sv(d);
  }

  accessor.startDate = function(_) {
    if (!arguments.length) return startDate;
    startDate = _;
    return bind();
  };

  accessor.startValue = function(_) {
    if (!arguments.length) return startValue;
    startValue = _;
    return bind();
  };

  accessor.endDate = function(_) {
    if (!arguments.length) return endDate;
    endDate = _;
    return bind();
  };

  accessor.endValue = function(_) {
    if (!arguments.length) return endValue;
    endValue = _;
    return bind();
  };

  function bind() {
    accessor.sd = startDate;
    accessor.sv = startValue;
    accessor.ed = endDate;
    accessor.ev = endValue;

    return accessor;
  }

  return bind();
};
},{}],17:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      /**
       * Supports getter and setter
       * @param d Underlying data object to get or set the value
       * @param _ If passed turns into a setter. This is the value to set
       * @returns {*}
       */
      value = function(d, _) {
        if(arguments.length < 2) return d.value;
        d.value = _;
        return accessor;
      },
      zero = function(d) { return d.zero; };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  accessor.zero = function(_) {
    if (!arguments.length) return zero;
    zero = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.v = value;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
},{}],18:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
},{}],19:[function(require,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      williams = function(d) { return d.williams; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.williams = function(_) {
    if (!arguments.length) return williams;
    williams = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.w = williams;

    return accessor;
  }

  return bind();
};
},{}],20:[function(require,module,exports){
'use strict';

module.exports = function(d3_max, indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 14;

    function indicator(data) {
      var plusDmEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          minusDmEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          trEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          adxEma = indicator_ema().accessor(indicator.accessor()).period(period).init();

      period = parseInt(period);
      return data.map(function(d, i) {
        if(i < 1) return datum(p.accessor.d(d));

            var upMove = p.accessor.h(data[i]) - p.accessor.h(data[i-1]);
            var downMove =   p.accessor.l(data[i-1]) - p.accessor.l(data[i]);
            var plusDM = 0;
            if(upMove > downMove && upMove>0){
                plusDM = upMove;
            }

            var minusDM = 0;
            if(downMove > upMove && downMove > 0){
                minusDM = downMove;
            }

            var TR = d3_max([
                (p.accessor.h(d) - p.accessor.l(d)),
                Math.abs(p.accessor.h(d) - p.accessor.c(data[i-1])),Math.abs(p.accessor.l(d) - p.accessor.c(data[i-1]))
            ]);

            var plusDmAverage = plusDmEma.average(plusDM),
              minusDmAverage = minusDmEma.average(minusDM),
              trEmaAverage = trEma.average(TR);
          if(i>period) {
            var plusDi = 100 * plusDmAverage / trEmaAverage,
              minusDi = 100 * minusDmAverage / trEmaAverage,
              adxValue = 0;

            if(plusDi - minusDi !== 0){
              adxValue = Math.abs( (plusDi - minusDi)/(plusDi + minusDi) );
            }
            var adx = 100 * adxEma.average(adxValue);

            if(i >= period*2) {
                return datum(p.accessor.d(d), adx, plusDi, minusDi);
            }else return datum(p.accessor.d(d));
        }else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.adx; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, adx, plusDi, minusDi) {
  if(plusDi) {
      return { date: date, adx: adx, plusDi: plusDi, minusDi: minusDi };
  }else{
      return { date: date, adx: null, plusDi: null, minusDi: null };
  }
}

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        overbought = 70,
        middle = 0,
        oversold = 30;

    function indicator(data) {
      return data.map(function(d, i) {
        if(i >= (period-1)){
          var max = 0;
          var maxi = 0;
          var min = 10000;
          var mini = 0;
          for (var j = 0; j < period; j++) {
            if( p.accessor.h(data[i-j]) > max){
              max = p.accessor.h(data[i-j]);
              maxi = j;
            }
            if( p.accessor.l(data[i-j]) < min){
              min = p.accessor.l(data[i-j]);
              mini = j;
            }
          }
          var up = ((period-maxi)/period)*100;
          var down = ((period-mini)/period)*100;
          var oscillator = up - down;
          return datum(p.accessor.d(d), up,down, oscillator, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.up; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, up,down,oscillator, middle, overbought, oversold) {
  if(up) return { date: date, up: up,down:down,oscillator:oscillator, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, up: null,down:null,oscillator:null, middle: null, overbought: null, oversold: null };
}

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_sma) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        initialAtr = indicator_sma(),
        previous = null,
        averageTrueRange = 0,
        currentIndex = 0;

    function indicator(data) {
      indicator.init();
      return data.map(function(d, i) {
        var value = indicator.atr(d);
        if(i >= p.period) return datum(p.accessor.d(d), value);
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      initialAtr.accessor(indicator.accessor()).period(p.period).init();
      previous = null;
      averageTrueRange = 0;
      currentIndex = 0;
      return indicator;
    };

    indicator.atr = function(d) {
      var trueRange = previous === null ? p.accessor.h(d)-p.accessor.l(d) :
        Math.max(p.accessor.h(d)-p.accessor.l(d),
          Math.abs(p.accessor.h(d)-p.accessor.c(previous)),
          Math.abs(p.accessor.l(d)-p.accessor.c(previous))
        );

      previous = d;

      // http://en.wikipedia.org/wiki/Average_true_range
      averageTrueRange = currentIndex++ <= p.period ? initialAtr.average(trueRange) : (averageTrueRange*(p.period-1)+trueRange)/p.period;

      return averageTrueRange;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(14);

    return indicator;
  };
};

function datum(date, atr) {
  if(atr) return { date: date, value: atr };
  else return { date: date, value: null };
}
},{}],23:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_atr) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        multiplier = 3,
        atr = indicator_atr();

    function indicator(data) {
      atr.accessor(p.accessor).period(p.period).init();

      return data.map(function(d, i) {
        var close = p.accessor.c(d),
            stop = atr.atr(d)*multiplier;
        if(i >= p.period) return { date: p.accessor.d(d), close: close, up: close-stop, down: close+stop };
        else return { date: p.accessor.d(d), up: null, down: null };
      })
      .filter(function(d) { return d.up !== null && d.down !== null; }) // Filter out empties
      .reduce(function(result, d, i) { // Reduce to access the previous result array
        var prev = result[i-1],
            up = i === 0 ? d.up : null, // Always start with an up trend?
            down = null;

        if(prev && prev.up !== null) {
          if(d.close > prev.up) up = Math.max(d.up, prev.up);
          else down = d.down;
        }

        if(prev && prev.down !== null) {
          if(d.close < prev.down) down = Math.min(d.down, prev.down);
          else up = d.up;
        }

        result.push({ date: d.date, up: up, down: down });
        return result;
      }, []);
    }

    indicator.multiplier = function(_) {
      if (!arguments.length) return multiplier;
      multiplier = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(14);

    return indicator;
  };
};
},{}],24:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_sma) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        sdMultiplication = 2;
    var sd;

    function indicator(data) {
        var signalLine = indicator_sma().accessor(indicator.accessor()).period(period).init();
        var j;
      return data.map(function(d, i) {
        var middleBand = signalLine.average(p.accessor(d));
        if(i >= period) {
            var sum = 0;
            for(j = 0;j<period;j++){
                sum += (Math.pow(   (p.accessor.c(data[i-j]) - middleBand)  ,2 ) );
            }
            sd = Math.sqrt( sum/period );
            var upperBand = middleBand+sdMultiplication*sd,
                lowerBand = middleBand-sdMultiplication*sd;
            return datum(p.accessor.d(d), middleBand, upperBand, lowerBand);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.middleBand; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.sdMultiplication = function(_) {
      if (!arguments.length) return sdMultiplication;
        sdMultiplication = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, middleBand, upperBand, lowerBand) {

  if(middleBand) return { date: date, middleBand: middleBand, upperBand: upperBand, lowerBand: lowerBand};
  else return { date: date, middleBand: null, upperBand: null, lowerBand: null};
}

},{}],25:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, alpha_init) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        previous,
        alpha,
        initialTotal,
        initialCount;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      previous = null;
      alpha = alpha_init(p.period);
      initialTotal = 0;
      initialCount = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < p.period) {
        value = null;
      }

      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      if(initialCount < p.period) return (previous = (initialTotal += value)/++initialCount);
      else return (previous = previous + alpha*(value-previous));
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(10);

    return indicator;
  };
};
},{}],26:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, min, max) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function indicator(data) {
      var previousHa;

      return data.map(function(d) {
        var ha = {
          date: p.accessor.d(d),
          open: (previousHa === undefined ? p.accessor.o(d) + p.accessor.c(d) : previousHa.open + previousHa.close)/2,
          close: (p.accessor.o(d) + p.accessor.h(d) + p.accessor.l(d) + p.accessor.c(d))/4
        };

        ha.high = max([ha.open, ha.close, p.accessor.h(d)]);
        ha.low = min([ha.open, ha.close, p.accessor.l(d)]);
        if(p.accessor.v !== undefined && p.accessor.v(d) !== undefined) ha.volume = p.accessor.v(d);
        return (previousHa = ha);
      });
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc());

    return indicator;
  };
};
},{}],27:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        tenkanSen = 9,
        kijunSen = 26,
        senkouSpanB = 52;

    function indicator(data) {
      var parameters = { tenkanSen: tenkanSen, kijunSen: kijunSen, senkouSpanB: senkouSpanB },
          result = new Array(data.length);

      // Iterate backwards through the data
      for(var index = result.length-1; index >= 0; index--) {
        result[index] = calculate(parameters, data, index);
      }

      return result;
    }

    function calculate(parameters, data, index) {
      var d = data[index],
          min = p.accessor.l(d),
          max = p.accessor.h(d),
          current = datum(parameters, p.accessor.d(d), p.accessor.c(d));

      // Iterate backwards through the data up to sendouSpanB count to calculate averages
      for(var i = 0, pos = i+1; i < parameters.senkouSpanB && index-i >= 0; i++, pos = i+1) {
        d = data[index-i];
        min = Math.min(min, p.accessor.l(d));
        max = Math.max(max, p.accessor.h(d));

        // Grab a snapshot of average of min and max for each of the parameter periods
        current.tenkanSen = pos === parameters.tenkanSen ? average(min, max) : current.tenkanSen;
        current.kijunSen = pos === parameters.kijunSen ? average(min, max) : current.kijunSen;
        current.senkouSpanB = pos === parameters.senkouSpanB ? average(min, max) : current.senkouSpanB;
      }

      // Initialise if there is enough data
      current.senkouSpanA = senkouSpanA(current.tenkanSen, current.kijunSen);

      return current;
    }

    indicator.tenkanSen = function(_) {
      if (!arguments.length) return tenkanSen;
      tenkanSen = _;
      return indicator;
    };

    indicator.kijunSen = function(_) {
      if (!arguments.length) return kijunSen;
      kijunSen = _;
      return indicator;
    };

    indicator.senkouSpanB = function(_) {
      if (!arguments.length) return senkouSpanB;
      senkouSpanB = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(parameters, date, chikouSpan) {
  return { parameters: parameters, date: date, chikouSpan: chikouSpan, tenkanSen: null, kijunSen: null, senkouSpanA: null, senkouSpanB: null };
}

function senkouSpanA(tenkanSen, kijunSen) {
  return tenkanSen !== null && kijunSen !== null ? average(tenkanSen, kijunSen) : null;
}

function average(v1, v2) {
  return (v1+v2)/2;
}
},{}],28:[function(require,module,exports){
'use strict';

module.exports = function(d3) {
  var indicatorMixin = require('./indicatormixin')(),
      accessor = require('../accessor')(),
      ema_init = require('./ema'),
      ema = ema_init(indicatorMixin, accessor.ohlc, ema_alpha_init),
      sma = require('./sma')(indicatorMixin, accessor.ohlc),
      atr = require('./atr')(indicatorMixin, accessor.ohlc, sma),
      vwap = require('./vwap')(indicatorMixin, accessor.ohlc);

  return {
    atr: atr,
    atrtrailingstop: require('./atrtrailingstop')(indicatorMixin, accessor.ohlc, atr),
    ema: ema,
    heikinashi: require('./heikinashi')(indicatorMixin, accessor.ohlc, d3.min, d3.max),
    ichimoku: require('./ichimoku')(indicatorMixin, accessor.ohlc),
    macd: require('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: require('./rsi')(indicatorMixin, accessor.ohlc, ema),
    sma: sma,
    wilderma: ema_init(indicatorMixin, accessor.ohlc, wilder_alpha_init),
    aroon: require('./aroon')(indicatorMixin, accessor.ohlc),
    stochastic: require('./stochastic')(indicatorMixin, accessor.ohlc, ema),
    williams: require('./williams')(indicatorMixin, accessor.ohlc, ema),
    adx: require('./adx')(d3.max, indicatorMixin, accessor.ohlc, ema),
    bollinger: require('./bollinger')(indicatorMixin, accessor.ohlc, sma),
    vwap: vwap
   };
};

function ema_alpha_init(period) {
  return 2/(period+1);
}

function wilder_alpha_init(period) {
  return 1/period;
}

},{"../accessor":8,"./adx":20,"./aroon":21,"./atr":22,"./atrtrailingstop":23,"./bollinger":24,"./ema":25,"./heikinashi":26,"./ichimoku":27,"./indicatormixin":29,"./macd":30,"./rsi":31,"./sma":32,"./stochastic":33,"./vwap":34,"./williams":35}],29:[function(require,module,exports){
'use strict';

module.exports = function() {
  return function(source, priv) {
    var indicatorMixin = {};

    indicatorMixin.period = function(period) {
      priv.period = period;

      source.period = function(_) {
        if (!arguments.length) return priv.period;
        priv.period = +_;
        return source;
      };

      return indicatorMixin;
    };

    indicatorMixin.accessor = function(accessor) {
      priv.accessor = accessor;

      // Mixin the functions to the source
      source.accessor = function (_) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        return source;
      };

      return indicatorMixin;
    };

    return indicatorMixin;
  };
};
},{}],30:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        fast = 12,
        slow = 26,
        signal = 9,
        signalLine = indicator_ema(),
        fastAverage = indicator_ema(),
        slowAverage = indicator_ema();

    function indicator(data) {
      var minFastSlow = Math.max(fast, slow) - 1,
          minCount = minFastSlow + signal - 1;

      signalLine.accessor(indicator.accessor()).period(signal).init();
      fastAverage.accessor(indicator.accessor()).period(fast).init();
      slowAverage.accessor(indicator.accessor()).period(slow).init();

      return data.map(function(d, i) {
        var macd = fastAverage.average(p.accessor(d)) - slowAverage.average(p.accessor(d)),
            signalValue = i >= minFastSlow ? signalLine.average(macd) : null;

        if(i >= minCount) return datum(p.accessor.d(d), macd, signalValue, macd - signalValue, 0);
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.macd !== null; });
    }

    indicator.fast = function(_) {
      if (!arguments.length) return fast;
      fast = _;
      return indicator;
    };

    indicator.slow = function(_) {
      if (!arguments.length) return slow;
      slow = _;
      return indicator;
    };

    indicator.signal = function(_) {
      if (!arguments.length) return signal;
      signal = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, macd, signal, difference, zero) {
  if(macd) return { date: date, macd: macd, signal: signal, difference: difference, zero: zero };
  else return { date: date, macd: null, signal: null, difference: null, zero: null };
}

},{}],31:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        overbought = 70,
        middle = 50,
        oversold = 30,
        lossAverage = indicator_ema(),
        gainAverage = indicator_ema();

    function indicator(data) {
      lossAverage.accessor(indicator.accessor()).period(p.period).init();
      gainAverage.accessor(indicator.accessor()).period(p.period).init();

      return data.map(function(d, i) {
        if(i < 1) return datum(p.accessor.d(d));

        var difference = p.accessor(d) - p.accessor(data[i-1]),
            averageGain = gainAverage.average(Math.max(difference, 0)),
            averageLoss = Math.abs(lossAverage.average(Math.min(difference, 0)));

        if(i >= p.period) {
          var rsi = 100 - (100/(1+(averageGain/averageLoss)));
          return datum(p.accessor.d(d), rsi, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.rsi !== null; });
    }

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(14);

    return indicator;
  };
};

function datum(date, rsi, middle, overbought, oversold) {
  if(rsi) return { date: date, rsi: rsi, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, rsi: null, middle: null, overbought: null, oversold: null };
}
},{}],32:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        samples,
        currentIndex,
        total;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      total = 0;
      samples = [];
      currentIndex = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < p.period) value = null;
      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      total += value;

      if(samples.length+1 < p.period) {
        samples.push(value);
        return total/++currentIndex;
      }
      else {
        if(samples.length < p.period) {
          samples.push(value);
          total += value;
        }

        total -= samples[currentIndex];
        samples[currentIndex] = value;
        if(++currentIndex === p.period) {
          currentIndex = 0;
        }

        return total/p.period;
      }
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(10);

    return indicator;
  };
};
},{}],33:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        periodD = 3,
        overbought = 80,
        middle = 50,
        oversold = 20;

    function indicator(data) {
      var periodLength = (parseInt(period)+parseInt(periodD));
      return data.map(function(d, i) {
        if(i >= periodLength ){
          var max = [];
          var min = [];
          var stochasticKBuffer = [];
          for (var per = 0; per < periodD; per++) {
            max.push(0);
            min.push(10000);
            stochasticKBuffer.push(0);
          }
          var stochasticD = 0;
          for (var k = 0; k < periodD; k++) {
            for (var j = 0; j < period; j++) {
              if(p.accessor.h(data[i-j-k]) > max[k]){
                max[k] = p.accessor.h(data[i-j-k]);
              }
              if(p.accessor.l(data[i-j-k]) < min[k]){
                min[k] = p.accessor.l(data[i-j-k]);
              }
            }
            var diff = (max[k]-min[k]);
            if(diff > 0) {
                stochasticKBuffer[k] = ((p.accessor.c(data[i - k]) - min[k]) / (max[k] - min[k])) * 100;
            }else{
                stochasticKBuffer[k] = 50;
            }
            stochasticD +=stochasticKBuffer[k];
          }
          var stochasticK =stochasticKBuffer[0];// ((d.close-min)/(max-min))*100;
          stochasticD /= periodD;
          return datum(p.accessor.d(d), stochasticK,stochasticD, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d), null, null, middle,overbought,oversold);
      }).filter(function(d) { return d.stochasticK; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };
    indicator.periodD = function(_) {
      if (!arguments.length) return periodD;
      periodD = _;
      return indicator;
    };

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, stochasticK,stochasticD, middle, overbought, oversold) {
  if(stochasticK) return { date: date, stochasticK: stochasticK,stochasticD:stochasticD, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, stochasticK: null,stochasticD:null, middle: middle, overbought: overbought, oversold: oversold };
}

},{}],34:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        cumul_total,
        cumul_volume,
        prev_date;

    function indicator(data) {
      indicator.init();
      return data.map(vwap).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      cumul_total = 0;
      cumul_volume = 0;
      return indicator;
    };

    function vwap(d, i) {
      // VWAP restarts when day changes
      if (i > 0 && prev_date.getDate() != p.accessor.d(d).getDate()) {
        cumul_total = 0;
	cumul_volume = 0;
      }

      var price = (p.accessor.h(d) + p.accessor.l(d) + p.accessor.c(d)) / 3;
      cumul_total += price * p.accessor.v(d);
      cumul_volume += p.accessor.v(d);

      prev_date = p.accessor.d(d);
      return { date: p.accessor.d(d), value: cumul_total / cumul_volume };
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(1);

    return indicator;
  };
};

},{}],35:[function(require,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,

        overbought = 80,
        middle = 50,
        oversold = 20;
    function indicator(data) {
      return data.map(function(d, i) {
         if(i >= period){
          var max = 0;
          var maxi = 0;
          var min = 10000;
          var mini = 0;
          for (var j = 0; j < period; j++) {
            if(p.accessor.h(data[i-j]) > max){
              max = p.accessor.h(data[i-j]);
              maxi = j;
            }
            if(p.accessor.l(data[i-j]) < min){
              min = p.accessor.l(data[i-j]);
              mini = j;
            }
          }
          var williams = ((p.accessor.c(data[i]) - min )/( max - min ))*100;
          return datum(p.accessor.d(d), williams, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.williams; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };


    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, williams, middle, overbought, oversold) {
  if(williams) return { date: date, williams: williams, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, williams: null, middle: null, overbought: null, oversold: null };
}

},{}],36:[function(require,module,exports){
'use strict';

module.exports = function(accessor_adx, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        adxLine = plot.pathLine(),
        plusDiLine = plot.pathLine(),
        minusDiLine = plot.pathLine();

    function adx(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'adx');
      group.entry.append('path').attr('class', 'plusDi');
      group.entry.append('path').attr('class', 'minusDi');

      adx.refresh(g);
    }

    adx.refresh = function(g) {
      refresh(p.dataSelector.select(g), adxLine, plusDiLine, minusDiLine);
    };

    function binder() {
      adxLine.init(p.accessor.d, p.xScale, p.accessor.adx, p.yScale);
      plusDiLine.init(p.accessor.d, p.xScale, p.accessor.plusDi, p.yScale);
      minusDiLine.init(p.accessor.d, p.xScale, p.accessor.minusDi, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(adx, p).plot(accessor_adx(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return adx;
  };
};

function refresh(selection, adxLine, plusDiLine, minusDiLine) {
  selection.select('path.adx').attr('d', adxLine);
  selection.select('path.plusDi').attr('d', plusDiLine);
  selection.select('path.minusDi').attr('d', minusDiLine);
}

},{}],37:[function(require,module,exports){
'use strict';

module.exports = function(accessor_aroon, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        oscLine = plot.pathLine(),
        oscArea = plot.pathArea(),
        middleLine = plot.pathLine(),
        upLine = plot.pathLine(),
        downLine = plot.pathLine();

    function aroon(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'aroon oscillator');
      group.entry.append('path').attr('class', 'aroon oscillatorArea');
      group.entry.append('path').attr('class', 'aroon middle');
      group.entry.append('path').attr('class', 'aroon up');
      group.entry.append('path').attr('class', 'aroon down');
      aroon.refresh(g);
    }

    aroon.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, oscLine, oscArea,
              middleLine, upLine, downLine);
    };

    function binder() {
      oscLine.init(p.accessor.d, p.xScale, p.accessor.oscillator, p.yScale);
      oscArea.init(p.accessor.d, p.xScale, p.accessor.oscillator, p.yScale, 0);
      middleLine.init(p.accessor.d, p.xScale, p.accessor.m, p.yScale);
      upLine.init(p.accessor.d, p.xScale, p.accessor.up, p.yScale);
      downLine.init(p.accessor.d, p.xScale, p.accessor.down, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(aroon, p).plot(accessor_aroon(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return aroon;
  };
};

function refresh(selection, accessor, x, y, plot, oscLine, oscArea, middleLine, upLine, downLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.aroon.oscillator').attr('d', oscLine);
  selection.select('path.aroon.oscillatorArea').attr('d', oscArea);
  selection.select('path.aroon.middle').attr('d', middleLine);
  selection.select('path.aroon.up').attr('d', upLine);
  selection.select('path.aroon.down').attr('d', downLine);
}

},{}],38:[function(require,module,exports){
'use strict';

module.exports = function(accessor_atrtrailingstop, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine(),
        downLine = plot.pathLine();

    function atrtrailingstop(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'up');
      group.entry.append('path').attr('class', 'down');

      atrtrailingstop.refresh(g);
    }

    atrtrailingstop.refresh = function(g) {
      refresh(p.dataSelector.select(g), upLine, downLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.up, p.yScale);
      downLine.init(p.accessor.d, p.xScale, p.accessor.dn, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(atrtrailingstop, p).plot(accessor_atrtrailingstop(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return atrtrailingstop;
  };
};

function refresh(selection, upLine, downLine) {
  selection.select('path.up').attr('d', upLine);
  selection.select('path.down').attr('d', downLine);
}
},{}],39:[function(require,module,exports){
'use strict';

/**
 * TODO Refactor this to techan.plot.annotation.axis()?
 */
module.exports = function(d3_svg_axis, d3_scale_linear, accessor_value, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},
        axis = d3_svg_axis(d3_scale_linear()),
        format,
        point = 4,
        height = 14,
        width = 50,
        translate = [0, 0],
        orient = 'bottom';

    function annotation(g) {
      var group = p.dataSelector.mapper(filterInvalidValues(p.accessor, axis.scale()))(g);

      group.entry.append('path');
      group.entry.append('text');

      annotation.refresh(g);
    }

    annotation.refresh = function(g) {
      var fmt = format ? format : (axis.tickFormat() ? axis.tickFormat() : axis.scale().tickFormat());
      refresh(p.dataSelector.select(g), p.accessor, axis, orient, fmt, height, width, point, translate);
    };

    annotation.axis = function(_) {
      if(!arguments.length) return axis;
      axis = _;
      return annotation;
    };

    annotation.orient = function(_) {
      if(!arguments.length) return orient;
      orient = _;
      return annotation;
    };

    annotation.format = function(_) {
      if(!arguments.length) return format;
      format = _;
      return annotation;
    };

    annotation.height = function(_) {
      if(!arguments.length) return height;
      height = _;
      return annotation;
    };

    annotation.width = function(_) {
      if(!arguments.length) return width;
      width = _;
      return annotation;
    };

    annotation.translate = function(_) {
      if(!arguments.length) return translate;
      translate = _;
      return annotation;
    };

    plotMixin(annotation, p).accessor(accessor_value()).dataSelector();

    return annotation;
  };
};

function refresh(selection, accessor, axis, orient, format, height, width, point, translate) {
  var neg = orient === 'left' || orient === 'top' ? -1 : 1;

  selection.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')');
  selection.select('path').attr('d', backgroundPath(accessor, axis, orient, height, width, point, neg));
  selection.select('text').text(textValue(accessor, format)).call(textAttributes, accessor, axis, orient, neg);
}

function filterInvalidValues(accessor, scale) {
  return function(data) {
    var range = scale.range(),
        start = range[0],
        end = range[range.length - 1];

    range = start < end ? [start, end] : [end, start];

    return data.filter(function (d) {
      if (accessor(d) === null || accessor(d) === undefined) return false;
      var value = scale(accessor(d));
      return value !== null && !isNaN(value) && range[0] <= value && value <= range[1];
    });
  };
}

function textAttributes(text, accessor, axis, orient, neg) {
  var scale = axis.scale();

  switch(orient) {
    case 'left':
    case 'right':
      text.attr('x', neg*(Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
          .attr('y', textPosition(accessor, scale))
          .attr('dy', '.32em')
          .style('text-anchor', neg < 0 ? 'end' : 'start');
      break;
    case 'top':
    case 'bottom':
      text.attr('x', textPosition(accessor, scale))
          .attr('y', neg*(Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
          .attr('dy', neg < 0 ? '0em' : '.72em')
          .style('text-anchor', 'middle');
      break;
  }
}

function textPosition(accessor, scale) {
  return function(d) {
    return scale(accessor(d));
  };
}

function textValue(accessor, format) {
  return function(d) {
    return format(accessor(d));
  };
}

function backgroundPath(accessor, axis, orient, height, width, point, neg) {
  return function(d) {
    var scale = axis.scale(),
        value = scale(accessor(d)),
        pt = point;

    switch(orient) {
      case 'left':
      case 'right':
        var h = 0;

        if(height/2 < point) pt = height/2;
        else h = height/2-point;

        return 'M 0 ' + value + ' l ' + (neg*Math.max(axis.tickSizeInner(), 1)) + ' ' + (-pt) +
          ' l 0 ' + (-h) + ' l ' + (neg*width) + ' 0 l 0 ' + height +
          ' l ' + (neg*-width) + ' 0 l 0 ' + (-h);
      case 'top':
      case 'bottom':
        var w = 0;

        if(width/2 < point) pt = width/2;
        else w = width/2-point;

        return 'M ' + value + ' 0 l ' + (-pt) + ' ' + (neg*Math.max(axis.tickSizeInner(), 1)) +
          ' l ' + (-w) + ' 0 l 0 ' + (neg*height) + ' l ' + width + ' 0 l 0 ' + (neg*-height) +
          ' l ' + (-w) + ' 0';
      default: throw "Unsupported orient value: axisannotation.orient(" + orient + "). Set to one of: 'top', 'bottom', 'left', 'right'";
    }
  };
}
},{}],40:[function(require,module,exports){
'use strict';

module.exports = function(accessor_bollinger, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upperLine = plot.pathLine(),
        middleLine = plot.pathLine(),
        lowerLine = plot.pathLine();

    function bollinger(g) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'upper');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'lower');
      bollinger.refresh(g);
    }

    bollinger.refresh = function(g) {
      refresh(p.dataSelector.select(g), upperLine, middleLine, lowerLine);
    };

    function binder() {
      upperLine.init(p.accessor.d, p.xScale, p.accessor.upper, p.yScale);
      middleLine.init(p.accessor.d, p.xScale, p.accessor.middle, p.yScale);
      lowerLine.init(p.accessor.d, p.xScale, p.accessor.lower, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(bollinger, p).plot(accessor_bollinger(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return bollinger;
  };
};

function refresh(selection, upperLine, middleLine, lowerLine) {
  selection.select('path.upper').attr('d', upperLine);
  selection.select('path.middle').attr('d', middleLine);
  selection.select('path.lower').attr('d', lowerLine);
}

},{}],41:[function(require,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        bodyPathGenerator,
        wickGenerator,
        wickWidthGenerator;

    function candlestick(g) {
      var group = p.dataSelector(g);

      // 3x2 path's as wick and body can be styled slightly differently (stroke and fills)
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'body']);
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'wick']);

      candlestick.refresh(g);
    }

    candlestick.refresh = function(g) {
      g.selectAll('path.candle.body').attr('d', bodyPathGenerator);
      g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
    };

    function binder() {
      bodyPathGenerator = plot.joinPath(bodyPath);
      wickGenerator = plot.joinPath(wickPath);
      wickWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 4);
    }

    function bodyPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xValue = x(accessor.d(d)) - width/2,
            path = 'M ' + xValue + ' ' + open + ' l ' + width + ' ' + 0;

        // Draw body only if there is a body (there is no stroke, so will not appear anyway)
        if(open != close) {
          path += ' L ' + (xValue + width) + ' ' + close + ' l ' + -width + ' ' + 0 + ' L ' + xValue  + ' ' + open;
        }

        return path;
      };
    }

    function wickPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2,
            path = 'M ' + xPoint + ' ' + y(accessor.h(d)) +' L ' + xPoint + ' '+ Math.min(open, close); // Top

        // Draw another cross wick if there is no body
        if(open == close) {
          path += ' M ' + xValue + ' ' + open + ' l ' + width + ' ' + 0;
        }
        // Bottom
        return path + ' M ' + xPoint + ' ' + Math.max(open, close) + ' L ' + xPoint + ' ' + y(accessor.l(d));
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(candlestick, p).plot(accessor_ohlc(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return candlestick;
  };
};
},{}],42:[function(require,module,exports){
'use strict';

module.exports = function(d3_select, d3_event, d3_mouse, d3_dispatch, accessor_crosshair, plot, plotMixin) { // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatcher = d3_dispatch('enter', 'out', 'move'),
        verticalPathGenerator,
        horizontalPathGenerator,
        xAnnotationComposer = plot.plotComposer().scope('composed-annotation').plotScale(function(plot) { return plot.axis().scale(); }),
        yAnnotationComposer = plot.plotComposer().scope('composed-annotation').plotScale(function(plot) { return plot.axis().scale(); }),
        verticalWireRange,
        horizontalWireRange;

    function crosshair(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'horizontal wire');
      group.entry.append('path').attr('class', 'vertical wire');

      group.entry.append('g').attr('class', 'axisannotation x').call(xAnnotationComposer);
      group.entry.append('g').attr('class', 'axisannotation y').call(yAnnotationComposer);

      g.selectAll('rect').data([undefined]).enter().append('rect').style('fill', 'none').style('pointer-events', 'all');

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
      var xRange = p.xScale.range(),
          yRange = p.yScale.range(),
          group = p.dataSelector.select(g),
          pathVerticalSelection = group.select('path.vertical'),
          pathHorizontalSelection = group.select('path.horizontal'),
          xAnnotationSelection = group.select('g.axisannotation.x'),
          yAnnotationSelection = group.select('g.axisannotation.y');

      g.selectAll('rect')
        .attr('x', Math.min.apply(null, xRange))
        .attr('y', Math.min.apply(null, yRange))
        .attr('height', Math.abs(yRange[yRange.length-1] - yRange[0]))
        .attr('width', Math.abs(xRange[xRange.length-1] - xRange[0]))
        .on('mouseenter', function() {
          dispatcher.call('enter', this);
        })
        .on('mouseout', function() {
          dispatcher.call('out', this);
          // Redraw with null values to ensure when we enter again, there is nothing cached when redisplayed
          delete group.node().__coord__;
          initialiseWire(group.datum()); // Mutating data, don't need to manually pass down
          refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
        })
        .on('mousemove', mousemoveRefresh(group, pathVerticalSelection, pathHorizontalSelection,
          xAnnotationSelection, yAnnotationSelection)
        );

      refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
    };

    function mousemoveRefresh(selection, pathVerticalSelection, pathHorizontalSelection,
                              xAnnotationSelection, yAnnotationSelection) {
      return function() {
        // Cache coordinates past this mouse move
        selection.node().__coord__ = d3_mouse(this);
        refresh(selection, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
      };
    }

    function refresh(selection, xPath, yPath, xAnnotationSelection, yAnnotationSelection) {
      var coords = selection.node().__coord__;

      if(coords !== undefined) {
        var d = selection.datum(),
            xNew = p.xScale.invert(coords[0]),
            yNew = p.yScale.invert(coords[1]),
            dispatch = xNew !== null && yNew !== null && (p.accessor.xv(d) !== xNew || p.accessor.yv(d) !== yNew);

        p.accessor.xv(d, xNew);
        p.accessor.yv(d, yNew);
        if(dispatch) dispatcher.call('move', selection.node(), d);
      }

      // Just before draw, convert the coords to
      xPath.attr('d', verticalPathGenerator);
      yPath.attr('d', horizontalPathGenerator);
      xAnnotationSelection.call(xAnnotationComposer.refresh);
      yAnnotationSelection.call(yAnnotationComposer.refresh);
      selection.attr('display', displayAttr);
    }

    crosshair.xAnnotation = function(_) {
      if(!arguments.length) return xAnnotationComposer.plots();
      xAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    crosshair.yAnnotation = function(_) {
      if(!arguments.length) return yAnnotationComposer.plots();
      yAnnotationComposer.plots(_ instanceof Array ? _ : [_]);
      return binder();
    };

    crosshair.verticalWireRange = function(_) {
      if(!arguments.length) return verticalWireRange;
      verticalWireRange = _;
      return binder();
    };

    crosshair.horizontalWireRange = function(_) {
      if(!arguments.length) return horizontalWireRange;
      horizontalWireRange = _;
      return binder();
    };

    function binder() {
      verticalPathGenerator = verticalPathLine();
      horizontalPathGenerator = horizontalPathLine();
      xAnnotationComposer.accessor(p.accessor.xv).scale(p.xScale);
      yAnnotationComposer.accessor(p.accessor.yv).scale(p.yScale);
      return crosshair;
    }

    function horizontalPathLine() {
      var range = horizontalWireRange || p.xScale.range();

      return function(d) {
        if(p.accessor.yv(d) === null) return null;
        var value = p.yScale(p.accessor.yv(d));
        if(isNaN(value)) return null;
        return 'M ' + range[0] + ' ' + value + ' L ' + range[range.length-1] + ' ' + value;
      };
    }

    function verticalPathLine() {
      var range = verticalWireRange || p.yScale.range();

      return function(d) {
        if(p.accessor.xv(d) === null) return null;
        var value = p.xScale(p.accessor.xv(d)),
            sr = p.xScale.range();
        if(value < Math.min(sr[0], sr[sr.length-1]) || value > Math.max(sr[0], sr[sr.length-1])) return null;
        return 'M ' + value + ' ' + range[0] + ' L ' + value + ' ' + range[range.length-1];
      };
    }

    function initialiseWire(d) {
      d = d || {};
      p.accessor.xv(d, null);
      p.accessor.yv(d, null);
      return d;
    }

    function isEmpty(d) {
      return d === undefined || p.accessor.xv(d) === null || p.accessor.yv(d) === null;
    }

    function displayAttr(d) {
      return isEmpty(d) ? 'none' : null;
    }

    // Mixin scale management and event listening
    plotMixin(crosshair, p).plot(accessor_crosshair(), binder)
      .dataSelector(function(d) {
        // Has the user set data? If not, put empty data ready for mouse over
        if(isEmpty(d)) return [ initialiseWire() ];
        else return [d];
      })
      .on(dispatcher);

    p.dataSelector.scope('crosshair');

    return binder();
  };
};
},{}],43:[function(require,module,exports){
'use strict';

module.exports = function(d3_svg_area, d3_line_interpolate, accessor_ichimoku, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        kumoClip = kumoClipArea(),
        kumo = kumoPathArea(),
        senkouSpanA = plot.pathLine(),
        senkouSpanB = plot.pathLine(),
        chikouSpan = plot.pathLine(),
        tenkanSen = plot.pathLine(),
        kijunsen = plot.pathLine();

    function ichimoku(g) {
      var group = p.dataSelector(g),
          clipUpId = 'kumoclipup-' + randomID(),
          clipDownId = 'kumoclipdown-' + randomID();

      group.entry.append('clipPath').attr('id', clipDownId).attr('class', 'kumoclipdown').append('path');
      group.entry.append('clipPath').attr('id', clipUpId).attr('class', 'kumoclipup').append('path');
      group.entry.append('path').attr('class', 'kumo down').attr('clip-path', 'url(#' + clipDownId + ')');
      group.entry.append('path').attr('class', 'kumo up').attr('clip-path', 'url(#' + clipUpId + ')');
      group.entry.append('path').attr('class', 'senkouspanb');
      group.entry.append('path').attr('class', 'senkouspana');

      group.entry.append('path').attr('class', 'chikouspan');
      group.entry.append('path').attr('class', 'kijunsen');
      group.entry.append('path').attr('class', 'tenkansen');

      ichimoku.refresh(g);
    }

    ichimoku.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.yScale);
    };

    function refresh(selection, y) {
      selection.select('.kumoclipdown path').attr('d', kumoClip.y1(y.range()[0])); // Fill the bottom of the cloud to be clipped
      selection.select('.kumoclipup path').attr('d', kumoClip.y1(y.range()[1])); // Fill the top of the cloud to be clipped
      selection.select('path.kumo.down').attr('d', kumo);
      selection.select('path.kumo.up').attr('d', kumo);
      selection.select('path.senkouspanb').attr('d', senkouSpanB);
      selection.select('path.senkouspana').attr('d', senkouSpanA);

      selection.select('path.chikouspan').attr('d', chikouSpan);
      selection.select('path.kijunsen').attr('d', kijunsen);
      selection.select('path.tenkansen').attr('d', tenkanSen);
    }

    function binder() {
      senkouSpanA.init(p.accessor.d, p.xScale, p.accessor.sa, p.yScale, p.accessor.pks);
      senkouSpanB.init(p.accessor.d, p.xScale, p.accessor.sb, p.yScale, p.accessor.pks);
      chikouSpan .init(p.accessor.d, p.xScale, p.accessor.c,  p.yScale, negate(p.accessor.pks));
      tenkanSen  .init(p.accessor.d, p.xScale, p.accessor.ts, p.yScale);
      kijunsen   .init(p.accessor.d, p.xScale, p.accessor.ks, p.yScale);
    }

    function kumoClipArea() {
      return d3_svg_area().curve(d3_line_interpolate)
        .defined(function(d) { return p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    function kumoPathArea() {
      return d3_svg_area().curve(d3_line_interpolate)
        .defined(function(d) { return p.accessor.sa(d) !== null && p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sa(d)); } )
        .y1(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ichimoku, p).plot(accessor_ichimoku(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return ichimoku;
  };
};

function negate(accessor) {
  return function(d) {
    return -accessor(d);
  };
}

function randomID() {
  return Math.random().toString(36).substr(2, 9);
}
},{}],44:[function(require,module,exports){
'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3.line, d3.area, d3.curveMonotoneX, d3.select),
      d3_functor = require('../util')().functor,
      plotMixin = require('./plotmixin')(d3.scaleLinear, d3_functor, scale.financetime, plot.dataSelector, plot.barWidth),
      candlestick = require('./candlestick')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
      line = require('./line'),
      axisannotation = require('./axisannotation')(d3.axisTop, d3.scaleLinear, accessor.value, plot, plotMixin),
      svg = require('../svg')(d3);

  return {
    tradearrow: require('./tradearrow')(d3.select, d3_functor, d3.mouse, d3.dispatch, accessor.trade, plot, plotMixin, svg.arrow),
    atr: line(accessor.value, plot, plotMixin),
    atrtrailingstop: require('./atrtrailingstop')(accessor.atrtrailingstop, plot, plotMixin),
    axisannotation: axisannotation,
    candlestick: candlestick,
    crosshair: require('./crosshair')(d3.select, d3_event, d3.mouse, d3.dispatch, accessor.crosshair, plot, plotMixin),
    ema: line(accessor.value, plot, plotMixin),
    heikinashi: candlestick,
    ichimoku: require('./ichimoku')(d3.area, d3.curveMonotoneX, accessor.ichimoku, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
    tick: require('./tick')(d3.scaleLinear, d3.extent, accessor.tick, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    sma: line(accessor.value, plot, plotMixin),
    supstance: require('./supstance')(d3.drag, d3_event, d3.select, d3.dispatch, accessor.supstance, plot, plotMixin),
    trendline: require('./trendline')(d3.drag, d3_event, d3.select, d3.dispatch, accessor.trendline, plot, plotMixin),
    wilderma: line(accessor.value, plot, plotMixin),
    adx: require('./adx')(accessor.adx, plot, plotMixin),
    aroon: require('./aroon')(accessor.aroon, plot, plotMixin),
    stochastic: require('./stochastic')(accessor.stochastic, plot, plotMixin),
    williams: require('./williams')(accessor.williams, plot, plotMixin),
    bollinger: require('./bollinger')(accessor.bollinger, plot, plotMixin),
    vwap: line(accessor.value, plot, plotMixin)
  };
};

function d3_event() {
  return d3.event;
}

},{"../accessor":8,"../scale":59,"../svg":62,"../util":64,"./adx":36,"./aroon":37,"./atrtrailingstop":38,"./axisannotation":39,"./bollinger":40,"./candlestick":41,"./crosshair":42,"./ichimoku":43,"./line":45,"./macd":46,"./ohlc":47,"./plot":48,"./plotmixin":49,"./rsi":50,"./stochastic":51,"./supstance":52,"./tick":53,"./tradearrow":54,"./trendline":55,"./volume":56,"./williams":57}],45:[function(require,module,exports){
'use strict';

module.exports = function(accessor_value, plot, plotMixin, showZero) {  // Injected dependencies
  showZero = showZero || false;

  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        svgLine = plot.pathLine();

    function line(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'line');

      if(showZero) {
        group.selection.append('path').attr('class', 'zero');
      }

      line.refresh(g);
    }

    line.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, svgLine, showZero);
    };

    function binder() {
      svgLine.init(p.accessor.d, p.xScale, p.accessor, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(line, p).plot(accessor_value(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return line;
  };
};

function refresh(selection, accessor, x, y, plot, svgLine, showZero) {
  selection.select('path.line').attr('d', svgLine);

  if(showZero) {
    selection.select('path.zero').attr('d', plot.horizontalPathLine(x, accessor.z, y));
  }
}
},{}],46:[function(require,module,exports){
'use strict';

module.exports = function(accessor_macd, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        differenceGenerator,
        macdLine = plot.pathLine(),
        signalLine = plot.pathLine();

    function macd(g) {
      var group = p.dataSelector(g);

      group.selection.append('path').attr('class', 'difference');
      group.selection.append('path').attr('class', 'zero');
      group.selection.append('path').attr('class', 'macd');
      group.selection.append('path').attr('class', 'signal');

      macd.refresh(g);
    }

    macd.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, differenceGenerator, macdLine, signalLine);
    };

    function binder() {
      differenceGenerator = plot.joinPath(differencePath);
      macdLine.init(p.accessor.d, p.xScale, p.accessor.m, p.yScale);
      signalLine.init(p.accessor.d, p.xScale, p.accessor.s, p.yScale);
    }

    function differencePath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var zero = y(0),
          height = y(accessor.dif(d)) - zero,
          xValue = x(accessor.d(d)) - width/2;

        return 'M ' + xValue + ' ' + zero + ' l 0 ' + height + ' l ' + width +
          ' 0 l 0 ' + (-height);
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(macd, p).plot(accessor_macd(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return macd;
  };
};

function refresh(selection, accessor, x, y, plot, differenceGenerator, macdLine, signalLine) {
  selection.select('path.difference').attr('d', differenceGenerator);
  selection.select('path.zero').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.z, y));
  selection.select('path.macd').attr('d', macdLine);
  selection.select('path.signal').attr('d', signalLine);
}
},{}],47:[function(require,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        ohlcGenerator,
        lineWidthGenerator;

    function ohlc(g) {
      plot.appendPathsUpDownEqual(p.dataSelector(g).selection, p.accessor, 'ohlc');

      ohlc.refresh(g);
    }

    ohlc.refresh = function(g) {
      g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      ohlcGenerator = plot.joinPath(ohlcPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function ohlcPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2;

        return 'M ' + xValue + ' ' +
          open + ' l ' + (width/2) + ' 0 M ' + xPoint + ' ' + y(accessor.h(d)) + ' L ' +
          xPoint + ' ' + y(accessor.l(d)) + ' M ' + xPoint + ' ' + close + ' l ' + (width/2) + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ohlc, p).plot(accessor_ohlc(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return ohlc;
  };
};
},{}],48:[function(require,module,exports){
'use strict';

module.exports = function(d3_svg_line, d3_svg_area, d3_line_interpolate, d3_select) {
  var DataSelector = function(mapper) {
    var key,
        scope,
        classes = ['data'];

    function dataSelect(g) {
      var selection = dataSelect.select(g).data(mapper, key),
          entry = selection.enter().append('g').attr('class',  arrayJoin(classes, ' '));
      selection.exit().remove();

      return {
        entry: entry,
        selection: entry.merge(selection)
      };
    }

    dataSelect.select = function(g) {
      return g.selectAll('g.' + arrayJoin(classes, '.'));
    };

    /**
     * DataSelector.mapper.unity, DataSelector.mapper.array, or custom data mapper
     * @param _
     * @returns {*}
     */
    dataSelect.mapper = function(_) {
      if(!arguments.length) return mapper;
      mapper = _;
      return dataSelect;
    };

    dataSelect.scope = function(_) {
      if(!arguments.length) return scope;
      scope = _;
      classes = ['data', 'scope-' + scope];
      return dataSelect;
    };

    dataSelect.key= function(_) {
      if(!arguments.length) return key;
      key = _;
      return dataSelect;
    };

    return dataSelect;
  };

  DataSelector.mapper = {
    unity: function(d) { return d; },
    array: function(d) { return [d]; }
  };

  function PathLine() {
    var d3Line = d3_svg_line().curve(d3_line_interpolate);

    function line(data) {
      return d3Line(data);
    }

    line.init = function(accessor_date, x, accessor_value, y, offset) {
      return d3Line.defined(function(d) { return accessor_value(d) !== null; })
          .x(function(d) { return x(accessor_date(d), offset === undefined ? offset : offset(d)); } )
          .y(function(d) { return y(accessor_value(d)); } );
    };

    line.d3 = function() {
      return d3Line;
    };

    return line;
  }

  function PathArea() {
    var d3Area = d3_svg_area().curve(d3_line_interpolate);

    function area(data) {
      return d3Area(data);
    }

    area.init = function(accessor_date, x, accessor_value, y, yBase) {
      return d3Area.defined(function(d) { return accessor_value(d) !== null;  })
           .x(function(d) { return x(accessor_date(d)); } )
           .y0(function(d) { return y(yBase); } )
           .y1(function(d) { return y(accessor_value(d)); } );
    };

    area.d3 = function() {
      return d3Area;
    };

    return area;
  }

  function upDownEqual(accessor) {
    return {
      up: function(d) { return accessor.o(d) < accessor.c(d); },
      down: function(d) { return accessor.o(d) > accessor.c(d); },
      equal: function(d) { return accessor.o(d) === accessor.c(d); }
    };
  }

  function appendPathsGroupBy(g, accessor, plotName, classes) {
    var plotNames = plotName instanceof Array ? plotName : [plotName];

    classes = classes || upDownEqual(accessor);

    Object.keys(classes).forEach(function(key) {
      appendPlotTypePath(g, classes[key], plotNames, key);
    });
  }

  function appendPathsUpDownEqual(g, accessor, plotName) {
    appendPathsGroupBy(g, accessor, plotName, upDownEqual(accessor));
  }

  function appendPlotTypePath(g, data, plotNames, direction) {
    g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction).data(function(d) { return [d.filter(data)]; })
      .enter().append('path').attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
  }

  function barWidth(x) {
    if(x.band !== undefined) return Math.max(x.band(), 1);
    else return 3; // If it's not a finance time, the user should specify the band calculation (or constant) on the plot
  }

  function arrayJoin(array, delimiter) {
    if(!array.length) return;
    var result = array[0];
    for(var i = 1; i < array.length; i++) {
      result += delimiter + array[i];
    }
    return result;
  }


  /**
   * Helper class assists the composition of multiple techan plots. Handles:
   * - Automatic transfer of data down to descendants
   * - Automatic scaling of a value to the child ( value (parent) -> percent conversion for example)
   * - Plots must be of the same type, ie. Axis Annotation, Supstance)
   *
   * @returns {plotComposer} An instance
   * @constructor
   */
  function PlotComposer() {
    var dataSelector = DataSelector(),
        plots = [],
        plotScale = function(plot) { return plot.scale(); },
        scale,
        accessor;

    function plotComposer(g) {
      var group = dataSelector.mapper(function() {
        return plots.map(function() { return []; });
      })(g);

      group.selection.each(function(d, i) {
        plots[i](d3_select(this));
      });

      plotComposer.refresh(g);
    }

    plotComposer.refresh = function(g) {
      dataSelector.select(g).data(function(d) {
          var value = accessor(d);
          if(value === null || value === undefined) return plots.map(function() { return []; });
          var y = scale(value);
          return plots.map(function(plot) {
            var annotationValue = plotScale(plot) === scale ? value : plotScale(plot).invert(y);
            return [ { value: annotationValue} ];
          });
        }).each(function(d, i) {
          plots[i](d3_select(this));
        });
    };

    plotComposer.plots = function(_) {
      if(!arguments.length) return plots;
      plots = _;
      return plotComposer;
    };

    /**
     * The scale of the parent
     * @param _
     * @returns {*}
     */
    plotComposer.scale = function(_) {
      if(!arguments.length) return scale;
      scale = _;
      return plotComposer;
    };

    /**
     * How do get a value from the root datum
     * @param _ A function taking d and returning a value
     * @returns {*}
     */
    plotComposer.accessor = function(_) {
      if(!arguments.length) return accessor;
      accessor = _;
      return plotComposer;
    };

    /**
     * A string id that distinguishes this composed plot from another.
     * @param _
     * @returns {*}
     */
    plotComposer.scope = function(_) {
      if(!arguments.length) return dataSelector.scope();
      dataSelector.scope(_);
      return plotComposer;
    };

    /**
     * A function to obtain the scale of the child plots
     * @param _
     * @returns {*}
     */
    plotComposer.plotScale = function(_) {
      if(!arguments.length) return plotScale;
      plotScale = _;
      return plotComposer;
    };

    return plotComposer;
  }

  return {
    dataSelector: DataSelector,

    appendPathsGroupBy: appendPathsGroupBy,

    appendPathsUpDownEqual: appendPathsUpDownEqual,

    horizontalPathLine: function(accessor_date, x, accessor_value, y) {
      return function(d) {
        if(!d.length) return null;

        var firstDatum = d[0],
            lastDatum = d[d.length-1];

        return 'M ' + x(accessor_date(firstDatum)) + ' ' + y(accessor_value(firstDatum)) +
          ' L ' + x(accessor_date(lastDatum)) + ' ' + y(accessor_value(lastDatum));
      };
    },

    pathLine: PathLine,

    pathArea: PathArea,

    barWidth: barWidth,

    scaledStrokeWidth: function(x, max, div) {
      max = max || 1;
      div = div || 1;

      return function() {
        return Math.min(max, barWidth(x)/div) + 'px';
      };
    },

    /**
     * @param path A path generator constructor function that will construct a function that takes data point and returns a path
     */
    joinPath: function(path) {
      return function(data) {
        return arrayJoin(data.map(path()), ' ');
      };
    },

    interaction: {
      mousedispatch: function(dispatch) {
        return function(selection) {
          return selection.on('mouseenter', function(d) {
            d3_select(this.parentNode).classed('mouseover', true);
            dispatch.call('mouseenter', this, d);
          })
          .on('mouseleave', function(d) {
            var parentElement = d3_select(this.parentNode);
            if(!parentElement.classed('dragging')) {
              parentElement.classed('mouseover', false);
              dispatch.call('mouseout', this, d);
            }
          })
          .on('mousemove', function(d) { dispatch.call('mousemove', this, d); });
        };
      },

      dragStartEndDispatch: function(drag, dispatch) {
        return drag.on('start', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', true);
          dispatch.call('dragstart', this, d);
        })
        .on('end', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', false);
          dispatch.call('dragend', this, d);
        });
      }
    },

    plotComposer: PlotComposer
  };
};
},{}],49:[function(require,module,exports){
'use strict';

/**
 * Module allows optionally mixing in helper methods to plots such as xScale, yScale, accessor setters
 * and helpers for defining dispatching methods.
 */
module.exports = function(d3_scale_linear, d3_functor, techan_scale_financetime, plot_dataselector, plot_width) {
  var PlotMixin = function(source, priv) {
    var plotMixin = {};

    /**
     * Where mapper is DataSelector.mapper.unity or DataSelector.mapper.array. For convenience DataSelector is available
     * at PlotMixin.mapper
     *
     * @param mapper
     * @param key
     * @returns {{}}
     */
    plotMixin.dataSelector = function(mapper, key) {
      priv.dataSelector = plot_dataselector(mapper).key(key);
      return plotMixin;
    };

    plotMixin.xScale = function(binder) {
      priv.xScale = techan_scale_financetime();

      source.xScale = function(_) {
        if (!arguments.length) return priv.xScale;
        priv.xScale = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.yScale = function(binder) {
      priv.yScale = d3_scale_linear();

      source.yScale = function(_) {
        if (!arguments.length) return priv.yScale;
        priv.yScale = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.accessor = function(accessor, binder) {
      priv.accessor = accessor;

      source.accessor = function(_) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.width = function(binder) {
      priv.width = plot_width;

      source.width = function(_) {
        if (!arguments.length) return priv.width;
        priv.width = d3_functor(_);
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.on = function(dispatch, binder) {
      source.on = function(type, listener) {
        dispatch.on(type, listener);
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    /**
    * Generic mixin used for most plots
    * @returns {plotMixin}
    */
    plotMixin.plot = function(accessor, binder) {
      return plotMixin.xScale(binder).yScale(binder).accessor(accessor, binder);
    };

    return plotMixin;
  };

  // Carry the mappers through for convenience
  PlotMixin.dataMapper = plot_dataselector.mapper;

  return PlotMixin;
};
},{}],50:[function(require,module,exports){
'use strict';

module.exports = function(accessor_rsi, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        rsiLine = plot.pathLine();

    function rsi(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'rsi');

      rsi.refresh(g);
    }

    rsi.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, rsiLine);
    };

    function binder() {
      rsiLine.init(p.accessor.d, p.xScale, p.accessor.r, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(rsi, p).plot(accessor_rsi(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return rsi;
  };
};

function refresh(selection, accessor, x, y, plot, rsiLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.middle').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.m, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.rsi').attr('d', rsiLine);
}
},{}],51:[function(require,module,exports){
'use strict';

module.exports = function(accessor_stochastic, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        stochUpLine = plot.pathLine(),
        stochDownLine = plot.pathLine();

    function stochastic(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'stochastic up');
      group.entry.append('path').attr('class', 'stochastic down');
      stochastic.refresh(g);
    }

    stochastic.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, stochUpLine,
              stochDownLine);
    };

    function binder() {
      stochUpLine.init(p.accessor.d, p.xScale, p.accessor.k, p.yScale);
      stochDownLine.init(p.accessor.d, p.xScale, p.accessor.sd, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(stochastic, p).plot(accessor_stochastic(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return stochastic;
  };
};

function refresh(selection, accessor, x, y, plot, stochUpLine, stochDownLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.stochastic.up').attr('d', stochUpLine);
  selection.select('path.stochastic.down').attr('d', stochDownLine);
}

},{}],52:[function(require,module,exports){
'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, d3_dispatch, accessor_supstance, plot, plotMixin) {  // Injected dependencies
  function Supstance() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend'),
        annotationComposer = plot.plotComposer().scope('composed-annotation').plotScale(function(plot) { return plot.axis().scale(); });

    function supstance(g) {
      var group = p.dataSelector(g);

      group.entry.append('g').attr('class', 'supstance')
        .append('path');

      group.entry.append('g').attr('class', 'axisannotation y').call(annotationComposer);

      var interaction = group.entry.append('g').attr('class', 'interaction').style('opacity', 0).style('fill', 'none' )
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').style('stroke-width', '16px');

      supstance.refresh(g);
    }

    supstance.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, annotationComposer);
    };

    supstance.drag = function(g) {
      g.selectAll('.interaction path').call(dragBody(dispatch, p.accessor, p.xScale, p.yScale, annotationComposer));
    };

    supstance.annotation = function(_) {
      if(!arguments.length) return annotationComposer.plots();
      annotationComposer.plots(_ instanceof Array ? _ : [_]);
      return supstance;
    };

    function binder() {
      annotationComposer.accessor(p.accessor.v).scale(p.yScale);
      return supstance;
    }

    // Mixin 'superclass' methods and variables
    plotMixin(supstance, p)
      .dataSelector(plotMixin.dataMapper.unity)
      .plot(accessor_supstance(), binder)
      .on(dispatch);

    // Further group configuration now that it's mixed in
    // Supstance is composed of annotations, we need to scope the group selection
    p.dataSelector.scope('supstance');

    return binder();
  }

  function dragBody(dispatch, accessor, x, y, annotationComposer) {
    var drag = d3_behavior_drag().subject(function(d) {
      return { x: 0, y: y(accessor(d)) };
    })
    .on('drag', function(d) {
      var value = y.invert(d3_event().y),
          g = d3_select(this.parentNode.parentNode); // Go up to the selected items parent only (not the list of items)

      accessor.v(d, value);
      refresh(g, accessor, x, y, annotationComposer);
      dispatch.call('drag', this, d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  return Supstance;
};

function refresh(selection, accessor, x, y, annotationComposer) {
  selection.select('.supstance path').attr('d', supstancePath(accessor, x, y));
  selection.select('.interaction path').attr('d', supstancePath(accessor, x, y));
  selection.select('.axisannotation.y').call(annotationComposer.refresh);
}

function supstancePath(accessor, x, y) {
  return function(d) {
    var range;

    if(isSupstanceAccessor(accessor)) {
      range = [accessor.s(d), accessor.e(d)];
      range[0] = range[0] !== undefined ? x(range[0]) : x.range()[0];
      range[1] = range[1] !== undefined ? x(range[1]) : x.range()[1];
    }
    else range = x.range();

    return 'M ' + range[0] + ' ' + y(accessor(d)) +
      ' L ' + range[range.length-1] + ' ' + y(accessor(d));
  };
}

function isSupstanceAccessor(accessor) {
  return accessor.s !== undefined && accessor.e !== undefined;
}
},{}],53:[function(require,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_tick, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        tickGenerator,
        lineWidthGenerator;

    function tick(g) {
      p.dataSelector(g).entry.append('path').attr('class', 'tick');

      tick.refresh(g);
    }

    tick.refresh = function(g) {
      p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function tickPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var high = y(accessor.h(d)),
          low = y(accessor.l(d)),
          xPoint = x(accessor.d(d)),
          xValue = xPoint - width/2;

        return 'M ' + xValue + ' ' + high + ' l ' + width + ' 0 M ' + xPoint + ' ' + high +
          ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + width + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tick, p).plot(accessor_tick(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tick;
  };
};
},{}],54:[function(require,module,exports){
'use strict';

module.exports = function(d3_select, d3_functor, d3_mouse, d3_dispatch, accessor_trade, plot, plotMixin, svg_arrow) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout'),
        y = function(d) { return p.yScale(p.accessor.p(d)); },
        svgArrow = svg_arrow().orient(function(d) { return p.accessor.t(d) === 'buy' ? 'up' : 'down'; }),
        arrowGenerator;

    function tradearrow(g) {
      var group = p.dataSelector(g),
          classes = typesToClasses(g.datum());

      plot.appendPathsGroupBy(group.selection, p.accessor, 'tradearrow', classes);
      group.entry.append('path').attr('class', 'highlight').style('pointer-events', 'none'); // Do not want mouse events on the highlight

      group.selection.selectAll('path.tradearrow')
        .on('mouseenter', function(data) {
          var nearest = findNearest(data, d3_mouse(this)[0]);
          // Watch out here, not using generator as this is single element, not grouped
          // Done purely to get this node correctly classed and technically only 1 node can be selected for the moment
          d3_select(this.parentNode).select('path.highlight').datum(nearest.d).attr('d', svgArrow).call(classed, classes);
          dispatch.call('mouseenter', this, nearest.d, nearest.i);
        }).on('mouseout', function(data) {
          d3_select(this.parentNode).selectAll('path.highlight').datum([]).attr('d', null).attr('class', 'highlight');
          var nearest = findNearest(data, d3_mouse(this)[0]);
          dispatch.call('mouseout', this, nearest.d, nearest.i);
        });

      tradearrow.refresh(g);
    }

    tradearrow.refresh = function(g) {
      g.selectAll('path.tradearrow').attr('d', arrowGenerator);
    };

    /**
     * Pass through straight to `techan.svg.arrow`.
     *
     * Since all plotted trades are plotted as grouped `type`s, ensure for every trade `type` input a definition of orient exists.
     * If there is an undefined orient definition for trade type, you will probably get an error.
     *
     * default is "buy" => "up", "sell" => "down"
     *
     * @param _ Either a constant or function that returns the orientation of the rendered arrow. Ensure for every input type
     *          a corresponding `techan.svg.arrow` orient value is returned.
     */
    tradearrow.orient = function(_) {
      if(!arguments.length) return svgArrow.orient();
      svgArrow.orient(_);
      return binder();
    };

    /**
     * Define the way y position of the arrow is determined. Useful if required to show under or over OHLC quotes. Defaults
     * to showing the arrow on the trade price value.
     */
    tradearrow.y = function(_) {
      if(!arguments.length) return y;
      y = d3_functor(_);
      return binder();
    };

    /**
     * Direct access to the underlying arrow
     */
    tradearrow.arrow = function() {
      return svgArrow;
    };

    function binder() {
      svgArrow.x(function(d) { return p.xScale(p.accessor.d(d)); }).y(y);
      arrowGenerator = plot.joinPath(function() { return svgArrow; });
      return tradearrow;
    }

    function findNearest(d, x) {
      // Definitely know we're over a trade, but witch one? Find the nearest...? Should work _most_ of the time
      return d.map(function(d,i) { return { d: d, i: i, x: p.xScale(p.accessor.d(d)) }; }).reduce(function(p, c) {
        return Math.abs(p.x-x) < Math.abs(c.x-x) ? p : c;
      });
    }

    function typesToClasses(data) {
      return data.map(function(d) { return p.accessor.t(d); }).reduce(function(prev, cur) {
        if(prev[cur] === undefined) prev[cur] = function(d) { return cur === p.accessor.t(d); };
        return prev;
      }, {});
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tradearrow, p).plot(accessor_trade(), binder).on(dispatch).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradearrow;
  };
};

// d3 v4 no longer takes classed(Object), shim to convert Object and add classes to the selection
function classed(selection, classes) {
  Object.keys(classes).forEach(function(clazz) {
    selection.classed(clazz, classes[clazz]);
  });
}
},{}],55:[function(require,module,exports){
'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, d3_dispatch, accessor_trendline, plot, plotMixin) {  // Injected dependencies
  function Trendline() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

    function trendline(g) {
      var group = p.dataSelector(g),
          trendlineGroup = group.entry.append('g').attr('class', 'trendline');

      trendlineGroup.append('path').attr('class', 'body');
      trendlineGroup.append('circle').attr('class', 'start').attr('r', 1);
      trendlineGroup.append('circle').attr('class', 'end').attr('r', 1);

      var interaction = group.entry.append('g').attr('class', 'interaction').style('opacity', 0).style('fill', 'none')
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').attr('class', 'body').style('stroke-width', '16px');
      interaction.append('circle').attr('class', 'start').attr('r', 8);
      interaction.append('circle').attr('class', 'end').attr('r', 8);

      trendline.refresh(g);
    }

    trendline.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale);
    };

    trendline.drag = function(g) {
      g.selectAll('.interaction circle.start')
        .call(dragEnd(dispatch, p.accessor, p.accessor.sd, p.xScale, p.accessor.sv, p.yScale));
      g.selectAll('.interaction circle.end')
        .call(dragEnd(dispatch, p.accessor, p.accessor.ed, p.xScale, p.accessor.ev, p.yScale));
      g.selectAll('.interaction path.body')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables
    plotMixin(trendline, p)
      .dataSelector(plotMixin.dataMapper.unity)
      .plot(accessor_trendline())
      .on(dispatch);

    return trendline;
  }

  function dragEnd(dispatch, accessor, accessor_x, x, accessor_y, y) {
    var drag = d3_behavior_drag();

    drag.subject(function(d) {
      return { x: x(accessor_x(d)), y: y(accessor_y(d)) };
    })
    .on('drag', function(d) {
      updateEnd(accessor_x, x, d3_event().x, accessor_y, y, d3_event().y, d);
      refresh(d3_select(this.parentNode.parentNode.parentNode), accessor, x, y);
      dispatch.call('drag', this, d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  function dragBody(dispatch, accessor, x, y) {
    var dragStart = {}, // State information, grabs the start coords of the line
        drag = d3_behavior_drag();

    drag.subject(function(d) {
      dragStart.start = { date: x(accessor.sd(d)), value: y(accessor.sv(d)) };
      dragStart.end = { date: x(accessor.ed(d)), value: y(accessor.ev(d)) };
      return { x: 0, y: 0 };
    })
    .on('drag', function(d) {
      updateEnd(accessor.sd, x, d3_event().x + dragStart.start.date,
        accessor.sv, y, d3_event().y + dragStart.start.value,
        d);
      updateEnd(accessor.ed, x, d3_event().x + dragStart.end.date,
        accessor.ev, y, d3_event().y + dragStart.end.value,
        d);
      refresh(d3_select(this.parentNode.parentNode.parentNode), accessor, x, y);
      dispatch.call('drag', this, d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  function updateEnd(accessor_x, x, xValue, accessor_y, y, yValue, d) {
    var date = x.invert(xValue);
    if(date !== null && date !== undefined) accessor_x(d, date);
    accessor_y(d, y.invert(yValue));
  }

  return Trendline;
};

function refresh(selection, accessor, x, y) {
  selection.selectAll('path.body').attr('d', trendlinePath(accessor, x, y));
  selection.selectAll('circle.start').attr('cx', trendlineEndCX(accessor.sd, x)).attr('cy', trendlineEndCY(accessor.sv, y));
  selection.selectAll('circle.end').attr('cx', trendlineEndCX(accessor.ed, x)).attr('cy', trendlineEndCY(accessor.ev, y));
}

function trendlinePath(accessor, x, y) {
  return function(d) {
    return 'M ' + x(accessor.sd(d))+ ' ' + y(accessor.sv(d)) +
      ' L ' + x(accessor.ed(d)) + ' ' + y(accessor.ev(d));
  };
}

function trendlineEndCX(accessor_x, x) {
  return function(d) { return x(accessor_x(d)); };
}

function trendlineEndCY(accessor_y, y) {
  return function(d) { return y(accessor_y(d)); };
}
},{}],56:[function(require,module,exports){
'use strict';

module.exports = function(accessor_volume, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        volumeGenerator;

    function volume(g) {
      var group = p.dataSelector(g);

      if(isOhlcAccessor()) plot.appendPathsUpDownEqual(group.selection, p.accessor, 'volume');
      else group.entry.append('path').attr('class', 'volume');

      volume.refresh(g);
    }

    volume.refresh = function(g) {
      if(isOhlcAccessor()) g.selectAll('path.volume').attr('d', volumeGenerator);
      else p.dataSelector.select(g).select('path.volume').attr('d', volumeGenerator);
    };

    function binder() {
      volumeGenerator = plot.joinPath(volumePath);
    }

    function isOhlcAccessor() {
      return p.accessor.o && p.accessor.c;
    }

    function volumePath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var vol = accessor.v(d);

        if(isNaN(vol)) return null;

        var zero = y(0),
          height = y(vol) - zero,
          xValue = x(accessor.d(d)) - width/2;

        return 'M ' + xValue + ' ' + zero + ' l 0 ' + height + ' l ' + width +
          ' 0 l 0 ' + (-height);
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(volume, p).plot(accessor_volume(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return volume;
  };
};
},{}],57:[function(require,module,exports){
'use strict';

module.exports = function(accessor_williams, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine();

    function williams(g) {
      p.dataSelector(g).entry.append('path').attr('class', 'williams up');
      williams.refresh(g);
    }

    williams.refresh = function(g) {
      p.dataSelector.select(g).select('path.williams.up').attr('d', upLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.w, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(williams, p).plot(accessor_williams(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return williams;
  };
};
},{}],58:[function(require,module,exports){
'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
module.exports = function(d3_scale_linear, d3_time, d3_bisect, techan_util_rebindCallback, scale_widen, techan_scale_zoomable) {  // Injected dependencies
  function financetime(tickMethods, genericFormat, index, domain, padding, outerPadding, zoomLimit, closestTicks, zoomable) {
    var dateIndexMap,
        tickState = { tickFormat: tickMethods.daily[tickMethods.daily.length-1][2] },
        band = 3;

    index = index || d3_scale_linear();
    domain = domain || [new Date(0), new Date(1)];
    padding = padding === undefined ? 0.2 : padding;
    outerPadding = outerPadding === undefined ? 0.65 : outerPadding;
    zoomLimit = zoomLimit || { domain: index.domain() }; // Wrap in object to carry onto zoomable
    closestTicks = closestTicks || false;
    zoomable = zoomable || techan_scale_zoomable(index, zoomed, zoomLimit);

    /**
     * Scales the value to domain. If the value is not within the domain, will currently brutally round the data:
     * - If before min domain, will round to 1 index value before min domain
     * - If after max domain, will round to 1 index value after min domain
     * - If within domain, but not mapped to domain value, uses d3.bisect to find nearest domain index
     *
     * This logic was not required until the domain was being updated and scales re-rendered and this line
     * https://github.com/mbostock/d3/blob/abbe1c75c16c3e9cb08b1d0872f4a19890d3bb58/src/svg/axis.js#L107 was causing error.
     * New scale generated ticks that old scale did not have, causing error during transform. To avoid error this logic
     * was added.
     *
     * @param x The value to scale
     * @param offset Apply an index offset to the mapped x (date) parameter
     * @returns {*}
     */
    function scale(x, offset) {
      var mappedIndex = dateIndexMap[x instanceof Date ? x.getTime() : +x];
      offset = offset || 0;

      // Make sure the value has been mapped, if not, determine if it's just before, round in, or just after domain
      if(mappedIndex === undefined) {
        if(domain[0] > x) mappedIndex = -1; // Less than min, round just out of domain
        else mappedIndex = d3_bisect(domain, x); // else let bisect determine where in or just after than domain it is
      }

      return index(mappedIndex + offset);
    }

    /**
     * Invert the passed range coordinate to the corresponding domain. Returns null if no valid domain available.
     *
     * @param y
     * @returns {null} If the range value cannot be mapped. eg, if range value is outside of the mapped domain
     */
    scale.invert = function(y) {
      var d = domain[scale.invertToIndex(y)];
      return d ? d : null;
    };

    /**
     * Inverts the coordinate to the corresponding domain. <b>NOTE: </b> May return values outside of the domain such
     * as negative indexes, or an index greater than what is available in the domain.
     *
     * @param y
     * @returns {number} A number representing the index in the domain the range value has been inverted to. May return
     * values outside of the domain such as negatives or value greater than domain().length-1
     */
    scale.invertToIndex = function(y) {
      return Math.round(index.invert(y));
    };

    /**
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array
     * @returns {*}
     */
    scale.domain = function(_) {
      if (!arguments.length) {
        var visible = index.domain();

        if(visible[0] < 0 && visible[visible.length-1] < 0) return []; // if it's all negative return empty, nothing is visible

        visible = [
          Math.max(Math.ceil(visible[0]), 0), // If min is fraction, it is partially out of view, but still partially visible, round up (ceil)
          Math.min(Math.floor(visible[visible.length-1]), domain.length-1) // If max is fraction, is partially out of view, but still partially visible, round down (floor)
        ];
        return domain.slice(visible[0], visible[visible.length-1]+1); // Grab visible domain, inclusive
      }

      domain = _;
      return applyDomain();
    };

    function zoomed() {
      band = rangeBand(index, domain, padding);
      return scale;
    }

    function domainMap() {
      dateIndexMap = lookupIndex(domain);
    }

    function applyDomain() {
      domainMap();
      index.domain([0, domain.length-1]);
      zoomed();
      // Apply outerPadding and widen the outer edges by pulling the domain in to ensure start and end bands are fully visible
      index.domain(index.range().map(scale_widen(outerPadding, band)).map(index.invert));
      zoomLimit.domain = index.domain(); // Capture the zoom limit after the domain has been applied
      return zoomed();
    }

    scale.copy = function() {
      return financetime(tickMethods, genericFormat, index.copy(), domain, padding, outerPadding, zoomLimit, closestTicks, zoomable);
    };

    /**
     * Equivalent to d3's ordinal.rangeBand(). It could not be named rangeBand as d3 uses the method
     * to determine how axis ticks should be rendered. This scale is a hybrid ordinal and linear scale,
     * such that scale(x) returns y at center of the band as does d3.scale.linear()(x) does, whereas
     * d3.scale.ordinal()(x) returns y at the beginning of the band. When rendering svg axis, d3
     * compensates for this checking if rangeBand is defined and compensates as such.
     * @returns {number}
     */
    scale.band = function() {
      return band;
    };

    scale.outerPadding = function(_) {
      if(!arguments.length) return outerPadding;
      outerPadding = _;
      return applyDomain();
    };

    scale.padding = function(_) {
      if(!arguments.length) return padding;
      padding = _;
      return applyDomain();
    };

    scale.zoomable = function() {
      return zoomable;
    };

    /*
     * Ticks based heavily on d3 implementation. Attempted to implement this using composition with d3.time.scale,
     * but in the end there were sufficient differences to 'roll my own'.
     * - Different base tick steps: millis not required (yet!)
     * - State based tick formatting given the non continuous, even steps of ticks
     * - Supporting daily and intraday continuous (no gaps) plotting
     * https://github.com/mbostock/d3/blob/e03b6454294e1c0bbe3125f787df56c468658d4e/src/time/scale.js#L67
     */
    /**
     * Generates ticks as continuous as possible against the underlying domain. Where continuous time ticks
     * fall on where there is no matching domain (such as weekend or holiday day), it will be replaced with
     * the nearest domain datum ahead of the tick to keep close to continuous.
     * @param interval
     * @param steps
     * @returns {*}
     */
    scale.ticks = function(interval, steps) {
      var visibleDomain = scale.domain(),
          indexDomain = index.domain();

      if(!visibleDomain.length) return []; // Nothing is visible, no ticks to show

      var method = interval === undefined ? tickMethod(visibleDomain, indexDomain, 10) :
                    typeof interval === 'number' ? tickMethod(visibleDomain, indexDomain, interval) : null;

      tickState.tickFormat = method ? method[2] : tickMethod(visibleDomain, indexDomain, 10)[2];

      if(method) {
        interval = method[0];
        steps = method[1];
      }

      var intervalRange = interval.every(steps).range(visibleDomain[0], +visibleDomain[visibleDomain.length-1]+1);

      return intervalRange                                // Interval, possibly contains values not in domain
        .map(domainTicks(visibleDomain, closestTicks))    // Line up interval ticks with domain, possibly adding duplicates
        .reduce(sequentialDuplicates, []);                // Filter out duplicates, produce new 'reduced' array
    };

    function tickMethod(visibleDomain, indexDomain, count) {
      if(visibleDomain.length == 1) return genericFormat; // If we only have 1 to display, show the generic tick method

      var visibleDomainExtent = visibleDomain[visibleDomain.length-1] - visibleDomain[0],
        intraday = visibleDomainExtent/dailyStep < 1, // Determine whether we're showing daily or intraday data
        methods = intraday ? tickMethods.intraday : tickMethods.daily,
        tickSteps = intraday ? intradayTickSteps : dailyTickSteps,
        k = Math.min(Math.round(countK(visibleDomain, indexDomain)*count), count),
        target = visibleDomainExtent/k, // Adjust the target based on proportion of domain that is visible
        i = d3_bisect(tickSteps, target);

      return i == methods.length ? methods[i-1] : // Return the largest tick method
        i ? methods[target/tickSteps[i-1] < tickSteps[i]/target ? i-1 : i] : methods[i]; // Else return close approximation or first tickMethod
    }

    /**
     * By default `ticks()` will generate tick values greater than the nearest domain interval value, which may not be
     * best value, particularly for irregular intraday domains. Setting this to true will cause tick generation to choose
     * values closest to the corresponding domain value for the calculated interval.
     * @param _ Optional `boolean` value. If argument is passed, sets the value and returns this instance, if no argument, returns the current value
     */
    scale.closestTicks = function(_) {
      if(!arguments.length) return closestTicks;
      closestTicks = _;
      return scale;
    };

    /**
     * NOTE: The type of tick format returned is dependant on ticks that were generated. To obtain the correct
     * format for ticks, ensure ticks function is called first, otherwise a default tickFormat will be returned
     * which may not be the optimal representation of the current domain state.
     * @returns {Function}
     */
    scale.tickFormat = function() {
      return function(date) {
        return tickState.tickFormat(date);
      };
    };

    techan_util_rebindCallback(scale, index, zoomed, 'range');

    domainMap();
    return zoomed();
  }

  function rangeBand(linear, domain, padding) {
    return (Math.abs(linear(domain.length-1) - linear(0))/Math.max(1, domain.length-1))*(1-padding);
  }

  /**
   * Calculates the proportion of domain that is visible. Used to reduce the overall count by this factor
   * @param visibleDomain
   * @param indexDomain
   * @returns {number}
   */
  function countK(visibleDomain, indexDomain) {
    return visibleDomain.length/(indexDomain[indexDomain.length-1]-indexDomain[0]);
  }

  function lookupIndex(array) {
    var lookup = {};
    array.forEach(function(d, i) { lookup[+d] = i; });
    return lookup;
  }

  function domainTicks(visibleDomain, closest) {
    var visibleDomainLookup = lookupIndex(visibleDomain); // Quickly lookup index of the domain

    return function(d) {
      var value = visibleDomainLookup[+d];
      if (value !== undefined) return visibleDomain[value];
      var index = d3_bisect(visibleDomain, d);
      if (closest && index > 0) {
        // d3_bisect gets the index of the closest value that is the greater than d,
        // which may not be the value that is closest to d.
        // If the closest value that is smaller than d is closer, choose that instead.
        if ((+d - (+visibleDomain[index-1])) < (+visibleDomain[index] - +d)) {
          index--;
        }
      }
      return visibleDomain[index];
    };
  }

  function sequentialDuplicates(previous, current) {
    if(previous.length === 0 || previous[previous.length-1] !== current) previous.push(current);
    return previous;
  }

  var dailyStep = 864e5,
      dailyTickSteps = [
        dailyStep,  // 1-day
        6048e5,     // 1-week
        2592e6,     // 1-month
        7776e6,     // 3-month
        31536e6     // 1-year
      ],
      intradayTickSteps = [
        1e3,    // 1-second
        5e3,    // 5-second
        15e3,   // 15-second
        3e4,    // 30-second
        6e4,    // 1-minute
        3e5,    // 5-minute
        9e5,    // 15-minute
        18e5,   // 30-minute
        36e5,   // 1-hour
        108e5,  // 3-hour
        216e5,  // 6-hour
        432e5,  // 12-hour
        864e5   // 1-day
      ];

  var dayFormat = d3_time.timeFormat('%b %e'),
      yearFormat = d3_v3_multi_shim([
        [d3_time.timeFormat('%b %Y'), function(d) { return d.getMonth(); }],
        [d3_time.timeFormat('%Y'), function() { return true; }]
      ]),
      intradayFormat = d3_v3_multi_shim([
        [d3_time.timeFormat(':%S'), function(d) { return d.getSeconds(); }],
        [d3_time.timeFormat('%I:%M'), function(d) { return d.getMinutes(); }],
        [d3_time.timeFormat('%I %p'), function () { return true; }]
      ]),
      genericFormat = [d3_time.timeSecond, 1, d3_v3_multi_shim([
          [d3_time.timeFormat(':%S'), function(d) { return d.getSeconds(); }],
          [d3_time.timeFormat('%I:%M'), function(d) { return d.getMinutes(); }],
          [d3_time.timeFormat('%I %p'), function(d) { return d.getHours(); }],
          [d3_time.timeFormat('%b %e'), function() { return true; }]
        ])
      ];

  var dayFormatUtc = d3_time.utcFormat('%b %e'),
      yearFormatUtc = d3_v3_multi_shim([
        [d3_time.utcFormat('%b %Y'), function(d) { return d.getUTCMonth(); }],
        [d3_time.utcFormat('%Y'), function() { return true; }]
      ]),
      intradayFormatUtc = d3_v3_multi_shim([
        [d3_time.utcFormat(':%S'), function(d) { return d.getUTCSeconds(); }],
        [d3_time.utcFormat('%I:%M'), function(d) { return d.getUTCMinutes(); }],
        [d3_time.utcFormat('%I %p'), function () { return true; }]
      ]),
      genericFormatUtc = [d3_time.timeSecond, 1, d3_v3_multi_shim([
          [d3_time.utcFormat(':%S'), function(d) { return d.getUTCSeconds(); }],
          [d3_time.utcFormat('%I:%M'), function(d) { return d.getUTCMinutes(); }],
          [d3_time.utcFormat('%I %p'), function(d) { return d.getUTCHours(); }],
          [d3_time.utcFormat('%b %e'), function() { return true; }]
        ])
      ];

  var dailyTickMethod = [
      [d3_time.timeDay, 1, dayFormat],
      [d3_time.timeMonday, 1, dayFormat],
      [d3_time.timeMonth, 1, yearFormat],
      [d3_time.timeMonth, 3, yearFormat],
      [d3_time.timeYear, 1, yearFormat]
    ],
    intradayTickMethod = [
      [d3_time.timeSecond, 1, intradayFormat],
      [d3_time.timeSecond, 5, intradayFormat],
      [d3_time.timeSecond, 15, intradayFormat],
      [d3_time.timeSecond, 30, intradayFormat],
      [d3_time.timeMinute, 1, intradayFormat],
      [d3_time.timeMinute, 5, intradayFormat],
      [d3_time.timeMinute, 15, intradayFormat],
      [d3_time.timeMinute, 30, intradayFormat],
      [d3_time.timeHour, 1, intradayFormat],
      [d3_time.timeHour, 3, intradayFormat],
      [d3_time.timeHour, 6, intradayFormat],
      [d3_time.timeHour, 12, intradayFormat],
      [d3_time.timeDay, 1, dayFormat]
    ];

  var dailyTickMethodUtc = [
      [d3_time.utcDay, 1, dayFormatUtc],
      [d3_time.utcMonday, 1, dayFormatUtc],
      [d3_time.utcMonth, 1, yearFormatUtc],
      [d3_time.utcMonth, 3, yearFormatUtc],
      [d3_time.utcYear, 1, yearFormatUtc]
    ],
    intradayTickMethodUtc = [
      [d3_time.utcSecond, 1, intradayFormatUtc],
      [d3_time.utcSecond, 5, intradayFormatUtc],
      [d3_time.utcSecond, 15, intradayFormatUtc],
      [d3_time.utcSecond, 30, intradayFormatUtc],
      [d3_time.utcMinute, 1, intradayFormatUtc],
      [d3_time.utcMinute, 5, intradayFormatUtc],
      [d3_time.utcMinute, 15, intradayFormatUtc],
      [d3_time.utcMinute, 30, intradayFormatUtc],
      [d3_time.utcHour, 1, intradayFormatUtc],
      [d3_time.utcHour, 3, intradayFormatUtc],
      [d3_time.utcHour, 6, intradayFormatUtc],
      [d3_time.utcHour, 12, intradayFormatUtc],
      [d3_time.utcDay, 1, dayFormatUtc]
    ];

  function techan_scale_financetime() {
    return financetime({ daily: dailyTickMethod, intraday: intradayTickMethod }, genericFormat);
  }

  techan_scale_financetime.utc = function() {
    return financetime({ daily: dailyTickMethodUtc, intraday: intradayTickMethodUtc }, genericFormatUtc);
  };

  return techan_scale_financetime;
};

function d3_v3_multi_shim(multi) {
  return function(d) {
    for(var i = 0; i < multi.length; i++) {
      if(multi[i][1](d)) return multi[i][0](d);
    }
  };
}
},{}],59:[function(require,module,exports){
'use strict';

module.exports = function(d3) {
  var zoomable = require('./zoomable')(),
      util = require('../util')(),
      accessors = require('../accessor')(),
      financetime = require('./financetime')(d3.scaleLinear, d3, d3.bisect, util.rebindCallback, widen, zoomable);

  return {
    financetime: financetime,

    analysis: {
      supstance: function(data, accessor) {
        return d3.scaleLinear();
      },

      trendline: function(data, accessor) {
        return d3.scaleLinear();
      }
    },

    plot: {
      time: function(data, accessor) {
        accessor = accessor || accessors.value();
        return financetime().domain(data.map(accessor.d));
      },

      atr: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor, 0.04);
      },

      ichimoku: function(data, accessor) {
        accessor = accessor || accessors.ichimoku();

        // Lots of values in each data point, assemble them together as they are plotted considering offsets, flatten, remove nulls
        var values = mapReduceFilter(data, function(d, i) {
          var chikouSpanData = data[i+accessor.pks(d)],  // Apply offset +pks (is plotted behind, so get data ahead)
              senkouSpanBData = data[i-accessor.pks(d)]; // Apply offset -pks (is plotted in front, so get data behind)

          return [
            accessor.ts(d), accessor.ks(d),
            senkouSpanBData ? accessor.sa(senkouSpanBData) : null,
            senkouSpanBData ? accessor.sb(senkouSpanBData) : null,
            chikouSpanData ? accessor.c(chikouSpanData) : null
          ];
        });

        return d3.scaleLinear()
          .domain(d3.extent(values).map(widen(0.02)))
          .range([1, 0]);
      },

      percent: function (scale, reference) {
        var domain = scale.domain();
        reference = reference || domain[0];
        return scale.copy().domain([domain[0], domain[domain.length-1]].map(function(d) { return (d-reference)/reference; }));
      },

      ohlc: function (data, accessor) {
        accessor = accessor || accessors.ohlc();
        return d3.scaleLinear()
          .domain([d3.min(data.map(accessor.low())), d3.max(data.map(accessor.high()))].map(widen(0.02)))
          .range([1, 0]);
      },

      volume: function (data, accessor) {
        accessor = accessor || accessors.ohlc().v;
        return d3.scaleLinear()
          .domain([0, d3.max(data.map(accessor))*1.15])
          .range([1, 0]);
      },

      atrtrailingstop: function (data, accessor) {
        accessor = accessor || accessors.atrtrailingstop();

        var values = mapReduceFilter(data, function(d) { return [accessor.up(d), accessor.dn(d)]; });
        return d3.scaleLinear().domain(d3.extent(values).map(widen(0.04)))
          .range([1, 0]);
      },

      rsi: function () {
        return d3.scaleLinear().domain([0, 100])
          .range([1, 0]);
      },

      momentum: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor, 0.04);
      },

      moneyflow: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor, 0.04);
      },

      macd: function(data, accessor) {
        accessor = accessor || accessors.macd();
        return pathScale(d3, data, accessor, 0.04);
      },

      movingaverage: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor);
      },

      adx: function () {
         return d3.scaleLinear().domain([0, 100])
          .range([1, 0]);
      },

      aroon: function () {
        return d3.scaleLinear().domain([-100, 100])
          .range([1, 0]);
      },

      stochastic: function () {
        return d3.scaleLinear().domain([0, 100])
          .range([1, 0]);
      },

      williams: function () {
        return d3.scaleLinear().domain([0, 100])
          .range([1, 0]);
      },

      bollinger: function (data, accessor) {
         accessor = accessor || accessors.bollinger();
         return d3.scaleLinear()
              .domain([
                 d3.min(data.map(function(d){return accessor.lower(d);})),
                 d3.max(data.map(function(d){return accessor.upper(d);}))
                ].map(widen(0.02)))
              .range([1, 0]);
      }
    },

    position: {

    }
  };
};

function pathDomain(d3, data, accessor, widening) {
  return data.length > 0 ? d3.extent(data, accessor).map(widen(widening)) : [];
}

function pathScale(d3, data, accessor, widening) {
  return d3.scaleLinear().domain(pathDomain(d3, data, accessor, widening))
    .range([1, 0]);
}

/**
 * Only to be used on an array of 2 elements [min, max]
 * @param padding
 * @param width
 * @returns {Function}
 */
function widen(widening, width) {
  widening = widening || 0;

  return function(d, i, array) {
    if(array.length > 2) throw "array.length > 2 unsupported. array.length = " + array.length;
    width = width || (array[array.length-1] - array[0]);
    return d + (i*2-1)*width*widening;
  };
}

function mapReduceFilter(data, map) {
  return data.map(map)
    .reduce(function(a, b) { return a.concat(b); }) // Flatten
    .filter(function(d) { return d !== null; }); // Remove nulls
}

},{"../accessor":8,"../util":64,"./financetime":58,"./zoomable":60}],60:[function(require,module,exports){
'use strict';

/**
 * Creates a decorated zoomable view of the passed scale. As the finance scale deals with an array and integer positions within the
 * array, it does not support the d3 zoom behaviour. d3 zoom behaviour rescales the input domain.
 * Finance scale is composed of an array of dates which is fixed in length and position and a linear scale mapping index
 * to range. The linear scale can be zoomed. This object decorates the scale with only the methods required by zoom
 * (invert, domain, copy). On zoom, calls the based zoomed callback.
 *
 * NOTE: This is not a complete scale, it will throw errors if it is used for anything else but zooming
 */
module.exports = function() {
  function zoomable(linear, zoomed, domainLimit, clamp) {
    clamp = clamp !== undefined ? clamp : true;

    /**
     * Delegates the scale call to the underlying linear scale
     */
    function scale(_) {
      return linear.apply(linear, arguments);
    }

    scale.invert = linear.invert;

    scale.domain = function(_) {
      if(!arguments.length) return linear.domain();

      if(clamp) linear.domain([Math.max(domainLimit.domain[0], _[0]), Math.min(domainLimit.domain[1], _[1])]);
      else linear.domain(_);

      if(zoomed) zoomed(); // Callback to that we have been zoomed
      return scale;
    };

    scale.range = function(_) {
      if(!arguments.length) return linear.range();
      throw "zoomable is a read only range. Use this scale for zooming only";
    };

    scale.copy = function() {
      return zoomable(linear.copy(), zoomed, domainLimit, clamp);
    };

    scale.clamp = function(_) {
      if(!arguments.length) return clamp;
      clamp = _;
      return scale;
    };

    return scale;
  }

  return zoomable;
};
},{}],61:[function(require,module,exports){
'use strict';

module.exports = function(d3_functor) {  // Injected dependencies
  return function() {
    var fx = d3_functor(0),
        fy = d3_functor(0),
        width = d3_functor(12),
        height = d3_functor(15),
        orient = d3_functor('up'),
        tail = d3_functor(true);

    function arrow(d, i) {
      var path,
          x = fx(d, i),
          y = fy(d, i),
          w = width(d, i),
          h = height(d, i),
          o = orient(d, i),
          t = tail(d, i),
          neg = o === 'left' || o === 'up' ? 1 : -1,
          ws = w/3,         // Width Segment
          pw = w/2,         // Point width
          ph = t ? h/2 : h; // Point Height

      path = 'M ' + x + ' ' + y;

      switch(o) {
        case 'up':
        case 'down':
          path += ' l ' + -pw + ' ' + neg*ph + ' l ' + ws + ' ' + 0;
          if(t) path += ' l ' + 0 + ' ' + neg*ph;
          path += ' l ' + ws + ' ' + 0;
          if(t) path += ' l ' + 0 + ' ' + -neg*ph;
          path += ' l ' + ws + ' ' + 0;
          break;

        case 'left':
        case 'right':
          path += ' l ' + neg*ph + ' ' + -pw + ' l ' + 0 + ' ' + ws;
          if(t) path += ' l ' + neg*ph + ' ' + 0;
          path += ' l ' + 0 + ' ' + ws;
          if(t) path += ' l ' + -neg*ph + ' ' + 0;
          path += ' l ' + 0 + ' ' + ws;
          break;

        default: throw "Unsupported arrow.orient() = " + orient;
      }

      return path + ' z';
    }

    arrow.x = function(_) {
      if(!arguments.length) return fx;
      fx = d3_functor(_);
      return arrow;
    };

    arrow.y = function(_) {
      if(!arguments.length) return fy;
      fy = d3_functor(_);
      return arrow;
    };

    arrow.height = function(_) {
      if(!arguments.length) return height;
      height = d3_functor(_);
      return arrow;
    };

    arrow.width = function(_) {
      if(!arguments.length) return width;
      width = d3_functor(_);
      return arrow;
    };

    arrow.orient = function(_) {
      if(!arguments.length) return orient;
      orient = d3_functor(_);
      return arrow;
    };

    arrow.tail = function(_) {
      if(!arguments.length) return tail;
      tail = d3_functor(_);
      return arrow;
    };

    return arrow;
  };
};
},{}],62:[function(require,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    arrow: require('./arrow')(require('../util')().functor)
  };
};
},{"../util":64,"./arrow":61}],63:[function(require,module,exports){
'use strict';

var _d3;

// If running in browser (window !undefined), assume d3 available
if('undefined' != typeof window) _d3 = window.d3;
else if('object' == typeof module) _d3 = require('d3'); // else we're in the only other supported mode: v8/node
else throw "Unsupported runtime environment: Could not find d3. Ensure defined globally on window, or available as dependency.";

module.exports = (function(d3) {
  return {
    version: require('../build/version'),
    accessor: require('./accessor')(),
    indicator: require('./indicator')(d3),
    plot: require('./plot')(d3),
    scale: require('./scale')(d3),
    svg: require('./svg')(d3)
  };
})(_d3);
},{"../build/version":1,"./accessor":8,"./indicator":28,"./plot":44,"./scale":59,"./svg":62,"d3":"d3"}],64:[function(require,module,exports){
'use strict';

module.exports = function() {
  return {
    rebindCallback: rebindCallback,

    rebind: function(target, source) {
      var newArgs = Array.prototype.slice.call(arguments, 0);
      newArgs.splice(2, 0, undefined);
      return rebindCallback.apply(this, newArgs);
    },

    // https://github.com/d3/d3/blob/v3.5.17/src/core/functor.js
    functor: function(v) {
      return typeof v === "function" ? v : function() { return v; };
    }
  };
};

/*
 Slight modification to d3.rebind taking a post set callback
 https://github.com/mbostock/d3/blob/master/src/core/rebind.js
 */
function rebindCallback(target, source, postSetCallback) {
  var i = 2, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = doRebind(target, source, source[method], postSetCallback);
  return target;
}

function doRebind(target, source, method, postSetCallback) {
  return function() {
    var value = method.apply(source, arguments);
    if(postSetCallback && value === source) postSetCallback();
    return value === source ? target : value;
  };
}
},{}]},{},[63])(63)
});