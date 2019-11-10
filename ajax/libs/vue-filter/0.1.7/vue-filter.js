/**
 * vue-filter.js v0.1.6
 * (c) 2016 wy-ei
 * MIT License.
 */
(function () {
    'use strict';

    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var slice = ArrayProto.slice;
    var toString = ObjProto.toString;
    var util = {};

    util.isArray = function(obj) {
        return Array.isArray(obj);
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    util.isArrayLike = function(obj) {
        if(typeof obj !== 'object' || !obj){
            return false;
        }
        var length = obj.length;
        return typeof length === 'number'
            && length % 1 === 0 && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    util.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };


    util.each = function(obj, callback) {
        var i,
            len;
        if (util.isArray(obj)) {
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

    util.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
        util['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    util.keys = function(obj) {
        if (!util.isObject(obj)) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    util.values = function(obj) {
        var keys = util.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    util.toArray = function(obj) {
        if (!obj) {
            return [];
        }
        if (util.isArrayLike(obj)) {
            return slice.call(obj);
        }
        return util.values(obj);
    };

    util.map = function(obj, cb) {
        var keys = !util.isArrayLike(obj) && util.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = cb(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    util.get = function(obj, accessor) {
        var ret = undefined;
        if (!util.isObject(obj)) {
            return obj;
        }
        if (accessor == undefined) {
            return obj;
        }
        if (util.isString(accessor)) {
            accessor = accessor.split('.');
            ret = obj;
            try {
                for (var i = 0; i < accessor.length; i++) {
                    ret = ret[accessor[i]];
                }
            } catch (e) {
                ret = undefined;
            }
        } else if (util.isFunction(accessor)) {
            ret = accessor(obj);
        }
        return ret;
    };

    /**
     * Returns the item at the specified index location in an array or a string.
     *
     * {{ ['a','b','c'] | at 1 }} => 'b'
     * {{ 'hello' | at 1 }} => 'e'
     */

    function at(arr, index) {
        if (util.isArrayLike(arr)) {
            return arr[index];
        } else {
            return arr;
        }
    }

    /**
     * Concatenates an array into another one.
     *
     * {{ [1,2,3] | concat [4,5,6] }} => [1,2,3,4,5,6]
     */

    function concat(arr1, arr2) {
        if (util.isArray(arr1)) {
            if (util.isArray(arr2)) {
                return arr1.concat(arr2);
            } else {
                return arr1.concat(util.toArray(arr2));
            }
        } else {
            if (util.isArray(arr2)) {
                return util.toArray(arr1).concat(arr2);
            } else {
                return util.toArray(arr1).concat(util.toArray(arr2));
            }
        }
    }

    /**
     * Returns the first element of an array,or first charactor of a string.
     *
     * {{ ['a','b','c'] | first }} => 'a'
     * {{ 'hello' | first }} => 'h'
     */

    function first(value) {
        if (util.isArrayLike(value)) {
            return value[0];
        } else {
            return value;
        }
    }

    /**
     * Joins the elements of an array with the character passed as the parameter.
     * The result is a single string.
     *
     * {{ ['a','b','c'] | join '-' }} => 'a-b-c'
     */

    function join(arr, c) {
        if (util.isArray(arr)) {
            return arr.join(c);
        } else if (util.isArrayLike(arr)) {
            return util.toArray(arr).join(c);
        } else {
            return arr;
        }
    }

    /**
     *  Returns the last element of an array,or last charactor of a string.
     *
     * {{ ['a','b','c'] | last }} => 'c'
     * {{ 'hello' | last }} => 'o'
     */

    function last(value) {
        if (util.isArrayLike(value)) {
            return value[value.length - 1];
        } else {
            return value;
        }
    }

    /*
     * returns a new collection of the results of each expression execution.
     *
     * {{ [1,2,3] | map increase }}
     *
     * new Vue({
     *   ...
     *   methods:{
     *     increase:function(val){return val+1;}
     *   }
     * })
     */

    function map(arr, cb) {
        return util.map(arr, cb);
    }

    /*
     * get a random value from a collection
     *
     * {{ [1,2,3,4] | random }} => 1 or 2 or 3 or 4
     */

    function random(collection) {
        if (!collection) {
            return undefined;
        }
        if (util.isObject(collection)) {
            collection = util.toArray(collection);
        }
        if (util.isArrayLike(collection) && collection.length != 0) {
            var i = Math.floor(collection.length * Math.random());
            return collection[i];
        } else {
            // not arrayLike and object or is a empty array or object
            return collection;
        }
    }

    /**
     * reverse an array or a string
     *
     * {{ 'abc' | reverse }} => 'cba'
     * {{ [1,2,3] | reverse }} => [3,2,1]
     */

    function reverse(arr) {
        if (util.isArray(arr)) {
            // make a copy
            arr = arr.concat();
            return arr.reverse();
        } else if (util.isString(arr)) {
            return arr.split('').reverse().join('');
        } else {
            return arr;
        }
    }

    /**
     * Returns the size of a string or an array.
     *
     * {{ ['a','b','c'] | size }} => 3
     * {{ 'hello' | size }} => 5
     */

    function size(arr) {
        var length = arr['length'];
        return length ? length : 0;
    }

    /**
     *  Return a new collection from a given length
     *
     *  {{ [] | range 4 }} => [0,1,2,3]
     */

    function range(arr, n) {
        arr = [];
        for (var i = 0; i < n; i++) {
            arr.push(i);
        }
        return arr;
    }

    /**
     * Checks if given expression or value is present in the collection
     *
     * {{ [2,3,4] | contains 3}} => true;
     *
     */

    function contains(arr, item) {
        var ret = false;
        if (util.isArrayLike(arr)) {
            if (util.isFunction(item)) {
                var fun = item;
                util.each(arr, function(val) {
                    if (fun(val) === true) {
                        ret = true;
                        // stop each
                        return false;
                    }
                });
            } else {
                util.each(arr, function(val) {
                    if (val === item) {
                        ret = true;
                        // stop each
                        return false;
                    }
                });
            }
        }
        return ret;
    }



    var collectionFilters = Object.freeze({
        at: at,
        concat: concat,
        first: first,
        join: join,
        last: last,
        map: map,
        random: random,
        reverse: reverse,
        size: size,
        range: range,
        contains: contains
    });

    /**
     * all method in Math without random
     *
     * {{ -1.2 | abs }}  => 1.2
     * {{ 1 | acos }}  => 0
     * {{ 1.3 | ceil }} => 2
     * {{ 3 | pow 2 }} => 9  i.e: Math.pow(3,2)
     */

    var base = {};

    ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor',
        'log', 'pow', 'round', 'sin', 'sqrt', 'tan'
    ]
    .forEach(function(method) {
        base[method] = function(value, n) {
            if (typeof value === 'number') {
                return Math[method](value, n);
            } else {
                return value;
            }
        };
    });

    /**
     * Divides an output by a number
     *
     * {{ 10 | divide 4 }} => 2.5
     */

    function divide(value, n) {
        if (util.isNumber(value)) {
            return value / n;
        } else {
            return value;
        }
    }


    /**
     * Subtracts a number from an output.
     *
     * {{ 12 | minus 2 }} => 10
     */

    function minus(value, n) {
        if (util.isNumber(value)) {
            return value - n;
        } else {
            return value;
        }
    }

    /**
     * Adds a number to an output.
     *
     * {{ 10 | plus 2 }} => 12
     */

    function plus(value, n) {
        if (util.isNumber(value)) {
            return value + n;
        } else {
            return value;
        }
    }

    /**
     * Multiplies an output by a number.
     *
     * {{ 10 | multiply 2 }} => 20
     */

    function multiply(value, n) {
        if (util.isNumber(value)) {
            return value * n;
        } else {
            return value;
        }
    }

    /**
     * Divides an output by a number and returns the remainder.
     *
     * {{ 10 | mod 2 }} => 20
     */

    function mod(value, n) {
        if (util.isNumber(value)) {
            return value % n;
        } else {
            return value;
        }
    }

    /**
     * return maximum value in an array.It will compare two item by a certain key
     * if key provide.
     *
     * {{ [13,22,3,24 ] | max }} => 24
     * {{ list | max 'age' }} => {name:'james',age:24}
     * list:[
     *  {name:'james',age:24},
     *  {name:'ron',age:12}
     * ]
     */


    function max(arr, key) {
        var ret, max, computed;
        if (util.isArray(arr)) {
            max = -Infinity;
            util.each(arr, function(val) {
                computed = util.get(val, key);
                if (computed > max) {
                    max = computed;
                    ret = val;
                }
            });
            return ret;
        } else {
            return arr;
        }
    }

    /**
     * return minimum value in an array.It will compare two item by a certain key
     * if key provide.
     *
     * {{ [13,22,3,24 ] | min }} => 3
     * {{ list | min 'age' }} => {name:'ron',age:12}
     * list:[
     *  {name:'james',age:24},
     *  {name:'ron',age:12}
     * ]
     */

    function min(arr, key) {
        var ret, min, computed;
        if (util.isArray(arr)) {
            min = Infinity;
            util.each(arr, function(val) {
                computed = util.get(val, key);
                if (computed < min) {
                    min = computed;
                    ret = val;
                }
            });
            return ret;
        } else {
            return arr;
        }
    }

    function sum(arr, initial) {
        if (util.isArrayLike(arr) && !util.isString(arr)) {
            var ret = initial || 0;
            util.each(arr, function(val) {
                if (!util.isNumber(val)) {
                    ret = undefined;
                    // stop each
                    return false;
                } else {
                    ret = ret + val;
                }
            });
            return ret;
        } else {
            return arr;
        }
    }

    /**
     * return mean value of a array
     *
     * {{ [1,2,3,4] | mean }} => 2.5
     */

    function mean(arr) {
        if (util.isArray(arr)) {
            var sum = arr.reduce(function(prev, curr) {
                return prev + curr;
            }, 0);

            var len = arr.length;
            if (util.isNumber(sum) && len != 0) {
                return sum / len;
            } else {
                return 0;
            }
        } else {
            return arr;
        }
    }

    var abs = base.abs;
    var acos = base.acos;
    var asin = base.asin;
    var atan = base.atan;
    var atan2 = base.atan2;
    var ceil = base.ceil;
    var cos = base.cos;
    var exp = base.exp;
    var floor = base.floor;
    var log = base.log;
    var pow = base.pow;
    var round = base.round;
    var sin = base.sin;
    var sqrt = base.sqrt;
    var tan = base.tan;



    var mathFilters = Object.freeze({
        abs: abs,
        acos: acos,
        asin: asin,
        atan: atan,
        atan2: atan2,
        ceil: ceil,
        cos: cos,
        exp: exp,
        floor: floor,
        log: log,
        pow: pow,
        round: round,
        sin: sin,
        sqrt: sqrt,
        tan: tan,
        max: max,
        min: min,
        mean: mean,
        sum: sum,
        plus: plus,
        minus: minus,
        multiply: multiply,
        divide: divide,
        mod: mod
    });

    /**
     * Appends characters to a string.
     *
     * {{ 'sky' | append '.jpg' }} => 'sky.jpg'
     */

    function append(str, postfix) {
        if (!str && str !== 0) {
            str = '';
        } else {
            str = str.toString();
        }
        return str + postfix;
    }

    /**
     * Converts a string into CamelCase.
     *
     * {{ some_else | camelcase }} => SomeElse
     * {{ some-else | camelcase }} => SomeElse
     */

    function camelcase(str) {
        var re = /(?:^|[-_\/])(\w)/g;
        return str.toString().replace(re, function(_, c) {
            return c.toUpperCase();
        });
    }

    /**
     * Prepends characters to a string.
     *
     * {{ 'world' | prepend 'hello ' }} => 'hello world'
     */

    function prepend(str, prefix) {
        if (!str && str !== 0) {
            str = '';
        } else {
            str = str.toString();
        }
        return prefix + str;
    }

    /**
     * Removes all occurrences of a substring from a string.
     *
     * {{ 'Hello JavaScript' | remove 'Hello' }} => ' JavaScript'
     */

    function remove(str, substr) {
        if (util.isString(str)) {
            str = str.split(substr).join('');
        }
        return str;
    }

    /**
     * The split filter takes on a substring as a parameter.
     * The substring is used as a delimiter to divide a string into an array.
     *
     * {{ 'a-b-c-d' | split '-' }} => [a,b,c,d]
     */

    function split(str, separator) {
        separator = separator || '';
        if (util.isString(str)) {
            return str.split(separator);
        } else {
            return str;
        }
    }

    /**
     * Test if a string match a pattern
     *
     * {{ "http://vuejs.org" | test /^http/ }} => true
     */

    function test(str, re, flag) {
        re = new RegExp(re, flag);
        return re.test(str);
    }

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

    function trim(str, rightOrleft) {
        if (util.isString(str)) {
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
    }

    /**
     * truncate text to a specified length.
     *
     * {{ 'this is a big city!' | truncate 10 '...' }} => this is...
     */

    function truncate(str, length, ellipses) {
        length = length || 30;
        if(ellipses === undefined){
            ellipses = '...';
        }
        ellipses = '' + ellipses;
        return (str.length > length ? str.slice(0, length - ellipses.length) + ellipses : str);
    }

    /**
     * return a string by repeat a char n times
     */

    function padding(size,ch){
        var str = '';
        if(!ch && ch !== 0){
            ch = ' ';
        }
        while(size !== 0){
            if(size & 1 === 1){
                str += ch;
            }
            ch += ch;
            size >>>= 1;
        }
        return str;
    }


    /**
     * leftPad
     *
     * {{ 'abc' | leftPad 5 '*' }} => '**abc'
     */
    function leftPad(str,size,ch){
        size = +size || 0;
        var padLength = size - str.length;
        if(padLength <= 0){
            return str;
        }
        return padding(padLength,ch).concat(str);
    }


    /**
     * rightPad
     *
     * {{ 'abc' | leftPad 5 '*' }} => 'abc**'
     */
    function rightPad(str,size,ch){
        size = +size || 0;
        var padLength = size - str.length;
        if(padLength <= 0){
            return str;
        }
        return str.concat(padding(padLength,ch));
    }

    /**
     * Appends characters to a string.
     *
     * {{ 'abc' | repeat 3 }} => 'abcabcabc'
     */

    function repeat(str, times) {
        times = times ? Number(times) : 0;
        if(times != times){ // NAN
            times = 0;
        }

        times = Math.floor(times);

        if(times <= -1){
            times = 0;
        }
        
        str = '' + str;

        var ret = '';
        while(times !== 0){
            if(times & 1 === 1){
                ret += str;
            }
            str += str;
            times >>>= 1;
        }
        return ret;
    }



    var stringFilters = Object.freeze({
        append: append,
        camelcase: camelcase,
        prepend: prepend,
        remove: remove,
        split: split,
        test: test,
        trim: trim,
        truncate: truncate,
        leftPad: leftPad,
        rightPad: rightPad,
        repeat: repeat
    });

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

    function date(date, formatString) {
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
            var ret = '';
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
                ret = d.getDate();
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
                ret = '%h:%M:%s';
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
    }

    /**
     * Sets a default value for any variable with no assigned value
     *
     * The default value is returned if the variable resolves to null ,undefined or an empty string "".
     * A string containing whitespace characters and a number has value 0 will not resolve to the default value.
     *
     */
    function defaults(value, dft) {
        // undefined and null and empty string
        if (value == null || value === '') {
            return dft;
        } else {
            return value;
        }
    }



    var otherFilters = Object.freeze({
        date: date,
        defaults: defaults
    });

    function install(Vue) {
        util.each(collectionFilters, function(value, key) {
            Vue.filter(key, value);
        });

        util.each(mathFilters, function(value, key) {
            Vue.filter(key, value);
        });

        util.each(stringFilters, function(value, key) {
            Vue.filter(key, value);
        });

        util.each(otherFilters, function(value, key) {
            Vue.filter(key, value);
        });
    }

    if (typeof exports == 'object') {
        module.exports = install;
    } else if (typeof define == 'function' && define.amd) {
        define([], function() {
            return install;
        });
    } else if (window.Vue) {
        Vue.use(install);
    }

}());