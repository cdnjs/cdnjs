'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

module.exports = {
  install: function install(Vue, options) {
    var moment = options && options.moment ? options.moment : require('moment');

    Object.defineProperties(Vue.prototype, {
      $moment: {
        get: function get() {
          return moment;
        }
      }
    });

    Vue.moment = moment;

    Vue.filter('moment', function () {
      var arguments$1 = arguments;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }

      args = Array.prototype.slice.call(args);
      var input = args.shift();
      var date = void 0;

      if (Array.isArray(input) && typeof input[0] === 'string') {
        // If input is array, assume we're being passed a format pattern to parse against.
        // Format pattern will accept an array of potential formats to parse against.
        // Date string should be at [0], format pattern(s) should be at [1]
        date = moment(input[0], input[1], true);
      } else if (typeof input === 'number') {
        if (input.toString().length < 12) {
          // If input is an integer with fewer than 12 digits, assume Unix seconds...
          date = moment.unix(input);
        } else {
          // ..otherwise, assume milliseconds.
          date = moment(input);
        }
      } else {
        // Otherwise, throw the input at moment and see what happens...
        date = moment(input);
      }

      if (!input || !date.isValid()) {
        // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
        console.warn('Could not build a valid `moment` object from input.');
        return input;
      }

      function parse() {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments$1[_key2];
        }

        args = Array.prototype.slice.call(args);
        var method = args.shift();

        switch (method) {
          case 'add':
            {
              /*
              * Mutates the original moment by adding time.
              * http://momentjs.com/docs/#/manipulating/add/
              */

              var addends = args.shift().split(',').map(Function.prototype.call, String.prototype.trim);
              var obj = {};

              for (var n = 0; n < addends.length; n++) {
                var addend = addends[n].split(' ');
                obj[addend[1]] = addend[0];
              }
              date.add(obj);
              break;
            }

          case 'subtract':
            {
              /*
              * Mutates the original moment by subtracting time.
              * http://momentjs.com/docs/#/manipulating/subtract/
              */

              var subtrahends = args.shift().split(',').map(Function.prototype.call, String.prototype.trim);
              var _obj = {};

              for (var _n = 0; _n < subtrahends.length; _n++) {
                var subtrahend = subtrahends[_n].split(' ');
                _obj[subtrahend[1]] = subtrahend[0];
              }
              date.subtract(_obj);
              break;
            }

          case 'from':
            {
              /*
              * Display a moment in relative time, either from now or from a specified date.
              * http://momentjs.com/docs/#/displaying/fromnow/
              */

              var from = 'now';
              var removeSuffix = false;

              if (args[0] === 'now') { args.shift(); }
              // If valid, assume it is a date we want the output computed against.
              if (moment(args[0]).isValid()) { from = moment(args.shift()); }

              if (args[0] === true) {
                args.shift();
                removeSuffix = true;
              }

              if (from !== 'now') {
                date = date.from(from, removeSuffix);
              } else {
                date = date.fromNow(removeSuffix);
              }
              break;
            }

          case 'diff':
            {
              /*
              * Mutates the original moment by doing a difference with another date.
              * http://momentjs.com/docs/#/displaying/difference/
              */

              var referenceTime = moment();
              var units = '';
              var float = false;

              if (moment(args[0]).isValid()) {
                // If valid, assume it is a date we want the output computed against.
                referenceTime = moment(args.shift());
              } else if (args[0] === null || args[0] === 'now') {
                // If null or 'now', remove argument and proceed with default referenceTime.
                args.shift();
              }

              if (args[0]) { units = args.shift(); }

              if (args[0] === true) { float = args.shift(); }

              date = date.diff(referenceTime, units, float);
              break;
            }

          case 'calendar':
            {
              /*
              * Formats a date with different strings depending on how close
              * to a certain date (today by default) the date is.
              * http://momentjs.com/docs/#/displaying/calendar-time/
              */

              var _referenceTime = moment();
              var formats = {};

              if (moment(args[0]).isValid()) {
                // If valid, assume it is a date we want the output computed against.
                _referenceTime = moment(args.shift());
              } else if (args[0] === null || args[0] === 'now') {
                // If null or 'now', remove argument and proceed with default referenceTime.
                args.shift();
              }

              if (_typeof(args[0]) === 'object') { formats = args.shift(); }

              date = date.calendar(_referenceTime, formats);
              break;
            }

          case 'utc':
            {
              /*
              * Mutates the original moment by converting to UTC
              * https://momentjs.com/docs/#/manipulating/utc/
              */
              date.utc();
              break;
            }

          case 'timezone':
            {
              /*
              * Mutates the original moment by converting to a new timezone.
              * https://momentjs.com/timezone/docs/#/using-timezones/converting-to-zone/
              */
              date.tz(args.shift());
              break;
            }

          default:
            {
              /*
              * Formats a date by taking a string of tokens and replacing
              * them with their corresponding values.
              * http://momentjs.com/docs/#/displaying/format/
              */

              var format = method;
              date = date.format(format);
            }
        }

        if (args.length) { parse.apply(parse, args); }
      }

      parse.apply(parse, args);

      return date;
    });

    Vue.filter('duration', function () {
      var arguments$1 = arguments;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments$1[_key3];
      }

      /*
      * Basic pass-through filter for leveraging moment.js's ability
      * to manipulate and display durations.
      * https://momentjs.com/docs/#/durations/
      */
      args = Array.prototype.slice.call(args);
      var input = args.shift();
      var method = args.shift();

      function createDuration(time) {
        if (!Array.isArray(time)) { time = [time]; }
        var result = moment.duration.apply(moment, _toConsumableArray(time));
        if (!result.isValid()) { console.warn('Could not build a valid `duration` object from input.'); }
        return result;
      }
      var duration = createDuration(input);

      if (method === 'add' || method === 'subtract') {
        // Generates a duration object and either adds or subtracts it
        // from our original duration.
        var durationChange = createDuration(args);
        duration[method](durationChange);
      } else if (duration && duration[method]) {
        var _duration;

        // This gives a full proxy to moment.duration functions.
        duration = (_duration = duration)[method].apply(_duration, _toConsumableArray(args));
      }

      return duration;
    });
  }
};
