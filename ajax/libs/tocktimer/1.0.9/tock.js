/**
* Tock by Mr Chimp - github.com/mrchimp/tock
* Based on code by James Edwards:
*    sitepoint.com/creating-accurate-timers-in-javascript/
*/

// Implements Date.now() for ie lt 9
Date.now = Date.now || function() { return +new Date(); };

// Polyfills Function.prototype.bind for IE lt 9 and Safari lt 5.1
if ( typeof Function.prototype.bind != 'function' ) {
    Function.prototype.bind = function (ctx) {
        var args = Array.prototype.slice.call(arguments, 1),
            fn = this;
        return function () {
            args.push.apply(args, arguments);
            return fn.apply(ctx, args);
        };
    };
}

(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define(factory);
  } else if ( typeof exports === 'object' ) {
    module.exports = factory();
  } else {
    root.Tock = factory();
  }
}(this, function () {

  /**
   * Called every tick for countdown clocks.
   * i.e. once every this.interval ms
   */
  function _tick () {
    this.time += this.interval;

    if ( this.countdown && (this.duration_ms - this.time < 0) ) {
      this.final_time = 0;
      this.go = false;
      this.callback(this);
      clearTimeout(this.timeout);
      this.complete(this);
      return;
    }
    else {
      this.callback(this);
    }

    var diff = (Date.now() - this.start_time) - this.time,
        next_interval_in = diff > 0 ? this.interval - diff : this.interval;

    if ( next_interval_in <= 0 ) {
      this.missed_ticks = Math.floor(Math.abs(next_interval_in) / this.interval);
      this.time += this.missed_ticks * this.interval;

      if ( this.go ) {
        _tick.call(this);
      }
    }
    else if ( this.go ) {
      this.timeout = setTimeout(_tick.bind(this), next_interval_in);
    }
  }

  /**
   * Called by Tock internally - use start() instead
   */
  function _startCountdown (duration) {
    this.duration_ms = duration;
    this.start_time = Date.now();
    this.time = 0;
    this.go = true;
    _tick.call(this);
  }

  /**
   * Called by Tock internally - use start() instead
   */
  function _startTimer (start_offset) {
    this.start_time = start_offset || Date.now();
    this.time = 0;
    this.go = true;
    _tick.call(this);
  }

  var MILLISECONDS_RE           = /^\s*(\+|-)?\d+\s*$/,
      MM_SS_RE                  = /^(\d{1,2}):(\d{2})$/,
      MM_SS_ms_OR_HH_MM_SS_RE   = /^(\d{1,2}):(\d{2})(?::|\.)(\d{2,3})$/,
      MS_PER_HOUR               = 3600000,
      MS_PER_MIN                = 60000,
      MS_PER_SEC                = 1000,
      /* The RegExp below will match a date in format `yyyy-mm-dd HH:MM:SS` and optionally with `.ms` at the end.
       * It will also match ISO date string, i.e. if the whitespace separator in the middle is replaced with a `T`
       * and the date string is also suffixed with a `Z` denoting UTC timezone.
       */
      yyyy_mm_dd_HH_MM_SS_ms_RE = /^(\d{4})-([0-1]\d)-([0-3]\d)(?:\s|T)(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3})Z?)?$/;

  var Tock = function (options) {
    options = options || {};
    
    if ( ! (this instanceof Tock) ) return new Tock(options);

    Tock.instances = (Tock.instances || 0) + 1;

    this.go           = false;
    this.timeout      = null;
    this.missed_ticks = null;
    this.interval     = options.interval || 10;
    this.countdown    = options.countdown || false;
    this.start_time   = 0;
    this.pause_time   = 0;
    this.final_time   = 0;
    this.duration_ms  = 0;
    this.time         = 0;
    this.callback     = options.callback || function () {};
    this.complete     = options.complete || function () {};
  };

  /**
   * Reset the clock
   */
  Tock.prototype.reset = function () {
    if ( this.countdown ) {
      return false;
    }
    this.stop();
    this.start_time = 0;
    this.time = 0;
  };

  /**
   * Start the clock.
   * accepts a single "time" argument which can be in various forms:
   ** MM:SS
   ** MM:SS:ms or MM:SS.ms
   ** HH:MM:SS
   ** yyyy-mm-dd HH:MM:SS.ms
   ** milliseconds
   */
  Tock.prototype.start = function (time) {
    if (this.go) return false;

    time = time ? this.timeToMS(time) : 0;

    this.start_time = time;
    this.pause_time = 0;

    if ( this.countdown ) {
      _startCountdown.call(this, time);
    } else {
      _startTimer.call(this, Date.now() - time);
    }
  };

  /**
   * Stop the clock.
   */
  Tock.prototype.stop = function () {
    this.pause_time = this.lap();
    this.go = false;

    clearTimeout(this.timeout);

    if ( this.countdown ) {
      this.final_time = this.duration_ms - this.time;
    } else {
      this.final_time = (Date.now() - this.start_time);
    }
  };

  /**
   * Stop/start the clock.
   */
  Tock.prototype.pause = function () {
    if ( this.go ) {
      this.pause_time = this.lap();
      this.stop();
    }
    else {
      if ( this.pause_time ) {
        if ( this.countdown ) {
          _startCountdown.call(this, this.pause_time);
        } else {
          _startTimer.call(this, Date.now() - this.pause_time);
        }

        this.pause_time = 0;
      }
    }
  };

  /**
   * Get the current clock time in ms.
   * Use with Tock.msToTime() to make it look nice.
   */
  Tock.prototype.lap = function () {
    if ( this.go ) {
      var now;

      if ( this.countdown ) {
        now = this.duration_ms - (Date.now() - this.start_time);
      } else {
        now = (Date.now() - this.start_time);
      }

      return now;
    }

    return this.pause_time || this.final_time;
  };

  /**
   * Format milliseconds as a MM:SS.ms string.
   */
  Tock.prototype.msToTime = function (ms) {
    if ( ms <= 0 ) {
      return '00:00.000';
    }

    var milliseconds = (ms % MS_PER_SEC).toString(),
        seconds = Math.floor((ms / MS_PER_SEC) % 60).toString(),
        minutes = Math.floor((ms / (MS_PER_MIN)) % 60).toString();

    if ( milliseconds.length === 1 ) {
      milliseconds = '00' + milliseconds;
    }
    else if ( milliseconds.length === 2 ) {
      milliseconds = '0' + milliseconds;
    }
    if ( seconds.length === 1 ) {
      seconds = '0' + seconds;
    }
    if ( minutes.length === 1 ) {
      minutes = '0' + minutes;
    }
    return minutes + ':' + seconds + '.' + milliseconds;
  };

  /**
   * Format milliseconds as HH:MM:SS
   */
  Tock.prototype.msToTimecode = function (ms) {
    if (ms <= 0) {
      return '00:00:00';
    }

    var seconds = Math.floor((ms / MS_PER_SEC) % 60).toString(),
        minutes = Math.floor((ms / (MS_PER_MIN)) % 60).toString(),
        MS_PER_HOURs = Math.floor((ms / (MS_PER_HOUR)) % 60).toString();

    if ( seconds.length === 1 ) {
      seconds = '0' + seconds;
    }

    if ( minutes.length === 1 ) {
      minutes = '0' + minutes;
    }

    if ( MS_PER_HOURs.length === 1 ) {
      MS_PER_HOURs = '0' + MS_PER_HOURs;
    }

    return MS_PER_HOURs + ':' + minutes + ':' + seconds;
  };

  /**
   * Convert a time string to milliseconds
   *
   * Possible inputs:
   * MM:SS
   * MM:SS:ms or MM:SS.ms
   * HH:MM:SS
   * yyyy-mm-dd HH:MM:SS.ms
   *
   * A milliseconds input will return it back for safety
   * If the input cannot be recognized then 0 is returned
   *
   */
  Tock.prototype.timeToMS = function (time) {
    //if milliseconds integer is input then return it back
    if ( MILLISECONDS_RE.test(String(time)) ) {
      return time;
    }

    var ms,
        time_split,
        match,
        date,
        now = new Date();

    if ( MM_SS_RE.test(time) ) { // If MM:SS
      time_split = time.split(':');
      ms = parseInt(time_split[0], 10) * MS_PER_MIN;
      ms += parseInt(time_split[1], 10) * MS_PER_SEC;
    } else {
      match = time.match(MM_SS_ms_OR_HH_MM_SS_RE);

      if ( match ) {
        if ( match[3].length == 3 || parseInt(match[3], 10) > 59 ) { // If MM:SS:ms or MM:SS.ms (e.g. 10:10:458 or 10:10.458)
          ms = parseInt(match[1], 10) * MS_PER_MIN;
          ms += parseInt(match[2], 10) * MS_PER_SEC;
          ms += parseInt(match[3], 10);
        } else { // Then it's HH:MM:SS
          ms = parseInt(match[1], 10) * MS_PER_HOUR;
          ms += parseInt(match[2], 10) * MS_PER_MIN;
          ms += parseInt(match[3], 10) * MS_PER_SEC;
        }
      } else if ( yyyy_mm_dd_HH_MM_SS_ms_RE.test(time) ) { // If yyyy-mm-dd HH:MM:SS or yyyy-mm-dd HH:MM:SS.ms or yyyy-mm-ddTHH:MM:SS.msZ
        date = new Date();
        now = new Date();
        
        match = time.match(yyyy_mm_dd_HH_MM_SS_ms_RE);
        
        date.setYear(match[1]);
        date.setMonth(match[2]);
        date.setDate(match[3]);
        date.setHours(match[4]);
        date.setMinutes(match[5]);
        date.setSeconds(match[6]);
        
        if (typeof match[7] !== 'undefined') {
          date.setMilliseconds(match[7]);
        }

        ms = Math.max(0, date.getTime() - now.getTime());
      } else {
        // Let's try it as a date string
        now = new Date();
        ms = Date.parse(time);

        if (!isNaN(ms)) { // Looks ok
          ms = Math.max(0, ms - now.getTime());
        } else { // Could not recognize input, so start from 0
          ms = 0;
        }
      }
    }

    return ms;
  };

  return Tock;
}));
