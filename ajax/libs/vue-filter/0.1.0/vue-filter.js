(function() {
  var install = function(Vue) {
    function isArrayLike(obj) {
      var length = obj['length'],
        MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
      return typeof length === 'number' && length > 0 && length < MAX_ARRAY_INDEX;
    }

    function isArray(obj) {
      return Array.isArray ? Array.isArray(obj) :
        Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isString(str) {
      return typeof str === 'string';
    }

    function each(obj, callback) {
      var i,
        len;
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (callback(obj[i], i, obj) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback(obj[i], i, obj) === false) {
            break;
          }
        }
      }
      return obj;
    };

    /**
     * Returns the first element of an array,or first charactor of a string.
     *
     * {{ ['a','b','c'] | first }} => 'a'
     * {{ 'hello' | first }} => 'h'
     */

    Vue.filter('first', function(value) {
      if (isArrayLike(value)) {
        return value[0];
      } else {
        return value;
      }
    });

    /**
     *  Returns the last element of an array,or last charactor of a string.
     *
     * {{ ['a','b','c'] | last }} => 'c'
     * {{ 'hello' | last }} => 'o'
     */

    Vue.filter('last', function(value) {
      if (isArrayLike(value)) {
        return value[value.length - 1];
      } else {
        return value;
      }
    });

    /**
     * Joins the elements of an array with the character passed as the parameter.
     * The result is a single string.
     *
     * {{ ['a','b','c'] | join '-' }} => 'a-b-c'
     */

    Vue.filter('join', function(arr, c) {
      if (isArray(arr)) {
        return arr.join(c);
      } else {
        return arr;
      }
    });

    /**
     * Returns the size of a string or an array.
     *
     * {{ ['a','b','c'] | size }} => 3
     * {{ 'hello' | size }} => 5
     */

    Vue.filter('size', function(arr) {
      var length = arr['length'];
      return length ? length : 0;
    });

    /**
     * Returns the item at the specified index location in an array or a string.
     *
     * {{ ['a','b','c'] | at 1 }} => 'b'
     * {{ 'hello' | at 1 }} => 'e'
     */

    Vue.filter('at', function(arr, index) {
      if (isArrayLike(arr)) {
        return arr[index];
      } else {
        return arr;
      }
    });


    /**
     * reverse an array or a string
     *
     * {{ 'abc' | reverse }} => 'cba'
     * {{ [1,2,3] | reverse }} => [3,2,1]
     */

    Vue.filter('reverse', function(arr) {
      if (isArray(arr)) {
        // make a copy
        var arr = arr.concat();
        return arr.reverse();
      } else if (isString(arr)) {
        return arr.split('').reverse().join('');
      } else {
        return arr;
      }
    });

    /*************** Math filter ************************/

    /**
     * all method in Math
     *
     * {{ -1.2 | abs }}  => 1.2
     * {{ 1 | acos }}  => 0
     * {{ 1.3 | ceil }} => 2
     * {{ anything | random }}  => a number between 0 ~ 1
     * {{ 3 | pow 2 }} => 9  i.e: Math.pow(3,2)
     */

    ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor',
      'log', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'
    ]
    .forEach(function(method) {
      Vue.filter(method, function(value, n) {
        if (typeof value === 'number') {
          return Math[method](value, n);
        } else {
          return value;
        }
      });
    });

    function compare(a, b, key) {
      if (key) {
        a = a[key];
        b = b[key];
      }
      if (a < b) {
        return -1;
      } else if (a == b) {
        return 0;
      } else {
        return 1;
      }
    }

    /**
     * return minimum value in an array.It will compare two item by a certain key
     * if key provide.
     *
     * {{ [13,22,3,24 ] | min }} => 3
     * {{ list | min 'age' }} => {name:'ron',age:12}
     * list:[
     *	{name:'james',age:24},
     *  {name:'ron',age:12}
     * ]
     */

    Vue.filter('min', function(arr, key) {
      if (isArray(arr)) {
        var min = arr[0];
        each(arr, function(val) {
          if (compare(min, val, key) !== -1) {
            min = val;
          }
        });
        return min;
      } else {
        return arr;
      }
    });

    /**
     * return maximum value in an array.It will compare two item by a certain key
     * if key provide.
     *
     * {{ [13,22,3,24 ] | max }} => 24
     * {{ list | max 'age' }} => {name:'james',age:24}
     * list:[
     *	{name:'james',age:24},
     *  {name:'ron',age:12}
     * ]
     */

    Vue.filter('max', function(arr, key) {
      if (isArray(arr)) {
        var max = arr[0];
        each(arr, function(val) {
          if (compare(max, val, key) !== 1) {
            max = val;
          }
        });
        return max;
      } else {
        return arr;
      }
    });

    /**
     * Divides an output by a number
     *
     * {{ 10 | / 4 }} => 2.5
     */

    Vue.filter('/', function(value, n) {
      if (typeof value === 'number') {
        return value / n;
      } else {
        return value;
      }
    });


    /**
     * Subtracts a number from an output.
     *
     * {{ 12 | - 2 }} => 10
     */

    Vue.filter('-', function(value, n) {
      if (typeof value === 'number') {
        return value - n;
      } else {
        return value;
      }
    });

    /**
     * Adds a number to an output.
     *
     * {{ 10 | + 2 }} => 12
     */

    Vue.filter('+', function(value, n) {
      if (typeof value === 'number') {
        return value + n;
      } else {
        return value;
      }
    });

    /**
     * Multiplies an output by a number.
     *
     * {{ 10 | * 2 }} => 20
     */

    Vue.filter('*', function(value, n) {
      if (typeof value === 'number') {
        return value * n;
      } else {
        return value;
      }
    });

    /**
     * Divides an output by a number and returns the remainder.
     *
     * {{ 10 | % 2 }} => 20
     */

    Vue.filter('%', function(value, n) {
      if (typeof value === 'number') {
        return value % n;
      } else {
        return value;
      }
    });



    /***************** string filter ********************/

    /**
     * Appends characters to a string.
     *
     * {{ 'sky' | append '.jpg' }} => 'sky.jpg'
     */

    Vue.filter('append', function(str, postfix) {
      if (!str && str !== 0) {
        str = ''
      } else {
        str = str.toString();
      }
      return str + postfix;
    });

    /**
     * Prepends characters to a string.
     *
     * {{ 'world' | prepend 'hello ' }} => 'hello world'
     */

    Vue.filter('prepend', function(str, prefix) {
      if (!str && str !== 0) {
        str = ''
      } else {
        str = str.toString();
      }
      return prefix + str;
    });

    /**
     * Removes all occurrences of a substring from a string.
     *
     * {{ 'Hello JavaScript' | remove 'Hello' }} => ' JavaScript'
     */

    Vue.filter('remove', function(str, substr) {
      if (isString(str)) {
        str = str.replace(str, '');
      }
      return str;
    });

    /**
     * Converts a string into CamelCase.
     *
     * {{ some_else | camelcase }} => SomeElse
     * {{ some-else | camelcase }} => SomeElse
     */

    Vue.filter('camelcase', function(str) {
      var re = /(?:^|[-_\/])(\w)/g;
      return str.toString().replace(re, function(_, c) {
        return c.toUpperCase();
      });
    });


    /**
     * truncate text to a specified length.
     *
     * {{ 'this is a big city!' | truncate 10 '...' }} => this is...
     */

    Vue.filter('truncate', function(str, length, truncation) {
      length = length || 30;
      truncation = typeof truncation === "string" ? truncation : "...";
      return (str.length + truncation.length > length ? str.slice(0, length - truncation.length) : str) + truncation;
    });

    /**
     * The split filter takes on a substring as a parameter.
     * The substring is used as a delimiter to divide a string into an array.
     *
     * {{ 'a-b-c-d' | split '-' }} => [a,b,c,d]
     */

    Vue.filter('split', function(str, separator) {
      separator = separator || '';
      if (isString(str)) {
        return str.split(separator);
      } else {
        return str;
      }
    });

    /**
     * Strips tabs, spaces, and newlines (all whitespace)
     * from the left or right or both side of a string.
     * which depends on second argument. if it is 'r' will only
     * trim right side,if it is 'l' will only trim left side
     * otherwise trim both left and right side.
     *
     * {{ '   some spaces   ' | trim }} => 'some spaces'
     * {{ '   some spaces   ' | trim 'r' }} => '   some spaces'
     * {{ '   some spaces   ' | trim 'l' }} => 'some spaces   '
     */

    Vue.filter('trim', function(str, rightOrleft) {
      if (isString(str)) {
        var re;
        if (rightOrleft == 'r') {
          re = /\s+$/;
        } else if (rightOrleft == 'l') {
          re = /^\s+/;
        } else {
          re = /^\s+|\s+$/g;
        }
        return str.replace(re, '');
      } else {
        return str;
      }
    });


    /***************** other filters ************************/

    /**
     * Converts a timestamp into another date format.
     *
     */
    var weekdays = ['Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    Vue.filter('date', function(date, formatString) {
      var d = new Date(date);

      var zeroize = function(value, length) {

        if (!length) length = 2;

        value = '' + value;

        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
          zeros += '0';
        }

        return zeros + value;
      };

      function getDays() {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          year = d.getFullYear(),
          month = d.getMonth(),
          day = d.getDate();

        if (year % 100 == 0 && year % 400 == 0 || year % 4 == 0) {
          days[1] = 29;
        }
        var n = 0;
        for (var i = 0; i < month; i++) {
          n += days[i];
        }
        return n + day;
      }

      function cb(c) {
        var ret = "";
        switch (c) {
          case '%a':
            ret = weekdays[d.getDay()].slice(0, 3);
            break;
          case '%A':
            ret = weekdays[d.getDay()];
            break;
          case '%b':
            ret = months[d.getMonth()].slice(0, 3);
            break;
          case '%B':
            ret = months[d.getMonth()];
            break;
          case '%c':
            ret = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            break;
          case '%d':
            var day = d.getDate();
            ret = zeroize(day);
            break;
          case '%-d':
            ret = d.getDate();;
            break;
          case '%D':
            ret = '%m/%d/%Y';
            break;
          case '%e':
            ret = d.getDate();
            break;
          case '%F':
            ret = '%Y-%m-%d';
            break;
          case '%H':
            var hours = d.getHours();
            ret = zeroize(hours);
            break;
          case '%I':
            ret = d.getHours() % 12;
            break;
          case '%j':
            ret = zeroize(getDays(), 3);
            break;
          case 'k':
            ret = d.getHours();
            break;
          case '%m':
            var month = d.getMonth() + 1;
            ret = zeroize(month, 2);
            break;
          case '%M':
            ret = zeroize(d.getMinutes(), 2);
            break;
          case '%s':
            ret = zeroize(d.getSeconds(), 2);
            break;
          case '%p':
            ret = d.getHours() < 12 ? 'AM' : 'PM';
            break;
          case '%r':
            ret = '%I:%M:%s %p';
            break;
          case '%R':
            ret = '%H:%M';
            break;
          case '%T':
            ret = '%H:%M:%s';
            break;
          case '%U':
            ret = Math.ceil(getDays() / 7);
            break;
          case '%w':
            ret = d.getDay();
            break;
          case '%x':
            ret = '%m/%d/%y';
            break;
          case '%X':
            ret = '%h:%M:%s'
            break;
          case '%y':
            ret = d.getFullYear() % 100;
            break;
          case '%Y':
            ret = d.getFullYear();
            break;
          default:
            ret = c;
        }
        return ret;
      }
      var re = /%-?[\w]/g;
      if (!formatString) {
        formatString = '%c';
      }
      formatString = formatString.replace(re, cb);
      formatString = formatString.replace(re, cb);
      return formatString;
    });

    /**
     * Sets a default value for any variable with no assigned value
     * 
     * The default value is returned if the variable resolves to null ,undefined or an empty string "". 
     * A string containing whitespace characters and a number has value 0 will not resolve to the default value.
     *
     */

    Vue.filter('default', function(value, dft) {
      // undefined and null and empty string
      if (value == null || value === '') {
        return dft;
      } else {
        return value;
      }
    });
  }

  // export

  if (typeof exports == "object") {
    module.exports = install
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return install
    });
  } else if (window.Vue) {
    Vue.use(install)
  }
})();
