(function(){var require = function (file, cwd) {
    var resolved = require.resolve(file, cwd || '/');
    var mod = require.modules[resolved];
    if (!mod) throw new Error(
        'Failed to resolve module ' + file + ', tried ' + resolved
    );
    var cached = require.cache[resolved];
    var res = cached? cached.exports : mod();
    return res;
};

require.paths = [];
require.modules = {};
require.cache = {};
require.extensions = [".js",".coffee",".json"];

require._core = {
    'assert': true,
    'events': true,
    'fs': true,
    'path': true,
    'vm': true
};

require.resolve = (function () {
    return function (x, cwd) {
        if (!cwd) cwd = '/';
        
        if (require._core[x]) return x;
        var path = require.modules.path();
        cwd = path.resolve('/', cwd);
        var y = cwd || '/';
        
        if (x.match(/^(?:\.\.?\/|\/)/)) {
            var m = loadAsFileSync(path.resolve(y, x))
                || loadAsDirectorySync(path.resolve(y, x));
            if (m) return m;
        }
        
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
        
        throw new Error("Cannot find module '" + x + "'");
        
        function loadAsFileSync (x) {
            x = path.normalize(x);
            if (require.modules[x]) {
                return x;
            }
            
            for (var i = 0; i < require.extensions.length; i++) {
                var ext = require.extensions[i];
                if (require.modules[x + ext]) return x + ext;
            }
        }
        
        function loadAsDirectorySync (x) {
            x = x.replace(/\/+$/, '');
            var pkgfile = path.normalize(x + '/package.json');
            if (require.modules[pkgfile]) {
                var pkg = require.modules[pkgfile]();
                var b = pkg.browserify;
                if (typeof b === 'object' && b.main) {
                    var m = loadAsFileSync(path.resolve(x, b.main));
                    if (m) return m;
                }
                else if (typeof b === 'string') {
                    var m = loadAsFileSync(path.resolve(x, b));
                    if (m) return m;
                }
                else if (pkg.main) {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                }
            }
            
            return loadAsFileSync(x + '/index');
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPathsSync(start);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(dir + '/' + x);
                if (m) return m;
                var n = loadAsDirectorySync(dir + '/' + x);
                if (n) return n;
            }
            
            var m = loadAsFileSync(x);
            if (m) return m;
        }
        
        function nodeModulesPathsSync (start) {
            var parts;
            if (start === '/') parts = [ '' ];
            else parts = path.normalize(start).split('/');
            
            var dirs = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (parts[i] === 'node_modules') continue;
                var dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                dirs.push(dir);
            }
            
            return dirs;
        }
    };
})();

require.alias = function (from, to) {
    var path = require.modules.path();
    var res = null;
    try {
        res = require.resolve(from + '/package.json', '/');
    }
    catch (err) {
        res = require.resolve(from, '/');
    }
    var basedir = path.dirname(res);
    
    var keys = (Object.keys || function (obj) {
        var res = [];
        for (var key in obj) res.push(key);
        return res;
    })(require.modules);
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.slice(0, basedir.length + 1) === basedir + '/') {
            var f = key.slice(basedir.length);
            require.modules[to + f] = require.modules[basedir + f];
        }
        else if (key === basedir) {
            require.modules[to] = require.modules[basedir];
        }
    }
};

(function () {
    var process = {};
    var global = typeof window !== 'undefined' ? window : {};
    var definedProcess = false;
    
    require.define = function (filename, fn) {
        if (!definedProcess && require.modules.__browserify_process) {
            process = require.modules.__browserify_process();
            definedProcess = true;
        }
        
        var dirname = require._core[filename]
            ? ''
            : require.modules.path().dirname(filename)
        ;
        
        var require_ = function (file) {
            var requiredModule = require(file, dirname);
            var cached = require.cache[require.resolve(file, dirname)];

            if (cached && cached.parent === null) {
                cached.parent = module_;
            }

            return requiredModule;
        };
        require_.resolve = function (name) {
            return require.resolve(name, dirname);
        };
        require_.modules = require.modules;
        require_.define = require.define;
        require_.cache = require.cache;
        var module_ = {
            id : filename,
            filename: filename,
            exports : {},
            loaded : false,
            parent: null
        };
        
        require.modules[filename] = function () {
            require.cache[filename] = module_;
            fn.call(
                module_.exports,
                require_,
                module_,
                module_.exports,
                dirname,
                filename,
                process,
                global
            );
            module_.loaded = true;
            return module_.exports;
        };
    };
})();


require.define("path",function(require,module,exports,__dirname,__filename,process,global){function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

});

require.define("__browserify_process",function(require,module,exports,__dirname,__filename,process,global){var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
        && window.setImmediate;
    var canPost = typeof window !== 'undefined'
        && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'browserify-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('browserify-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    if (name === 'evals') return (require)('vm')
    else throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    process.cwd = function () { return cwd };
    process.chdir = function (dir) {
        if (!path) path = require('path');
        cwd = path.resolve(dir, cwd);
    };
})();

});

require.define("/numbers/basic.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * basic.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = exports;

/**
 * Determine the summation of numbers in a given array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} sum of numbers in array.
 */
basic.sum = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = 0;
    for (var i = 0 ; i < arr.length ; i++) {
      if (typeof(arr[i]) === 'number') {
        total = total + arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Subtracts elements from one another in array.
 *
 * e.g [5,3,1,-1] -> 5 - 3 - 1 - (-1) = 2
 *
 * @param {Array} collection of numbers.
 * @return {Number} difference.
 */
basic.subtraction = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
      if (typeof(arr[i]) === 'number') {
        total -= arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Product of all elements in an array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} product.
 */
basic.product = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    for (var i = 1, length = arr.length; i < length; i++) {
      if (typeof(arr[i]) === 'number') {
        total = total * arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Return the square of any value.
 *
 * @param {Number} number
 * @return {Number} square of number
 */
basic.square = function (num) {
  return num * num;
};

/**
 * Calculate the binomial coefficient (n choose k)
 *
 * @param {Number} available choices
 * @param {Number} number chosen
 * @return {Number} number of possible choices
 */
basic.binomial = function (n, k) {

  var arr = [];

  function _binomial (n, k) {
    if (n >= 0 && k === 0) return 1;
    if (n === 0 && k > 0) return 0;
    if (arr[n] && arr[n][k] > 0) return arr[n][k];
    if (!arr[n]) arr[n] = [];

    return arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
  }

  return _binomial(n, k);
};

/**
 * Factorial for some integer.
 *
 * @param {Number} integer.
 * @return {Number} result.
 */
basic.factorial = function (num){
  var i = 2, o = 1;
  
  while (i <= num) {
    o *= i++;
  }

  return o;
};

/**
 * Calculate the greastest common divisor amongst two integers.
 * Taken from Ratio.js https://github.com/LarryBattle/Ratio.js
 * 
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} greatest common divisor for integers A, B.
 */
basic.gcd = function (a, b) {
  var c;
  b = (+b && +a) ? +b : 0;
  a = b ? a : 1;

  while (b) {
    c = a % b;
    a = b;
    b = c;
  }

  return Math.abs(a);
};

/**
 * Calculate the least common multiple amongst two integers.
 *
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} least common multiple for integers A, B.
 */
basic.lcm = function (num1, num2) {
  return Math.abs(num1 * num2) / basic.gcd(num1, num2);
};

/**
 * Retrieve a specified quantity of elements from an array, at random.
 *
 * @param {Array} set of values to select from.
 * @param {Number} quantity of elements to retrieve.
 * @param {Boolean} allow the same number to be returned twice.
 * @return {Array} random elements.
 */
basic.random = function (arr, quant, allowDuplicates) {
  if (arr.length === 0){
    throw new Error('Empty array');
  } else if (quant > arr.length  && !allowDuplicates){
    throw new Error('Quantity requested exceeds size of array');
  }
  
  if (allowDuplicates === true) {
    var result = [], i;
    for (i = 0; i < quant; i++) {
      result[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    return result;    
  } else {
    return basic.shuffle(arr).slice(0, quant);
  }
};

/**
 * Shuffle an array, in place.
 *
 * @param {Array} array to be shuffled.
 * @return {Array} shuffled array.
 */
basic.shuffle = function (array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/**
 * Find maximum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} maximum value in the array.
 */
basic.max = function (array) {
  return Math.max.apply(Math, array);
};

/**
 * Find minimum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} minimum value in the array.
 */
basic.min = function (array) {
  return Math.min.apply(Math, array);
};

/**
 * Create a range of numbers.
 *
 * @param {Number} The start of the range.
 * @param {Number} The end of the range.
 * @return {Array} An array containing numbers within the range.
 */
basic.range = function (start, stop, step) {
  var array, i = 0, len;

  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;

  if (stop < start) {
    step = 0 - Math.abs(step);
  }

  len = Math.max(Math.ceil((stop - start) / step) + 1, 0);

  array = new Array(len);

  while (i < len) {
    array[i++] = start;
    start += step;
  }

  return array;
};

/**
  * Determine if the number is an integer.
  *
  * @param {Number} the number
  * @return {Boolean} true for int, false for not int.
  */
basic.isInt = function (n) {
  return n % 1 === 0;
};

/**
  * Calculate the divisor and modulus of two integers.
  *
  * @param {Number} int a.
  * @param {Number} int b.
  * @return {Array} [div, mod].
  */
basic.divMod = function (a, b) {
  if (!basic.isInt(a) || !basic.isInt(b)) return false;
  return [Math.floor(a / b), a % b];
};

/**
  * Calculate:
  * if b >= 1: a^b mod m.
  * if b = -1: modInverse(a, m).
  * if b < 1: finds a modular rth root of a such that b = 1/r.
  *
  * @param {Number} Number a.
  * @param {Number} Number b.
  * @param {Number} Modulo m.
  * @return {Number} see the above documentation for return values.
  */
basic.powerMod = function (a, b, m) {
  // If b < -1 should be a small number, this method should work for now.
  if (b < -1) return Math.pow(a, b) % m; 
  if (b === 0) return 1 % m;
  if (b >= 1) {
    var result = 1;
    while (b > 0) {
      if ((b % 2) === 1) {
        result = (result * a) % m;
      }
      
      a = (a * a) % m;
      b = b >> 1;
    }
    return result;
  }

  if (b === -1) return basic.modInverse(a, m);
  if (b < 1) {
    return basic.powerMod(a, Math.pow(b, -1), m); 
  }
};

/**
 * Calculate the extended Euclid Algorithm or extended GCD.
 *
 * @param {Number} int a.
 * @param {Number} int b.
 * @return {Array} [a, x, y] a is the GCD. x and y are the values such that ax + by = gcd(a, b) .
 */
basic.egcd = function (a, b) {
  var x = (+b && +a) ? 1 : 0,
      y = b ? 0 : 1,
      u = (+b && +a) ? 0 : 1,
      v = b ? 1 : 0;

  b = (+b && +a) ? +b : 0;
  a = b ? a : 1;

  while (b) {
    var dm = basic.divMod(a, b),
        q = dm[0], 
        r = dm[1];

    var m = x - u * q, 
        n = y - v * q;

    a = b;
    b = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }

  return [a, x, y];
};

/**
  * Calculate the modular inverse of a number.
  * @param {Number} Number a.
  * @param {Number} Modulo m.
  * @return {Number} if true, return number, else throw error.
  */
basic.modInverse = function (a, m) {
  var r = basic.egcd(a, m);
  if (r[0] != 1) throw new Error('No modular inverse exists');
  return r[1] % m;
};

});

require.define("/numbers/calculus.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * calculus.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var calculus = exports;

/**
 * Calculate point differential for a specified function at a
 * specified point.  For functions of one variable.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to be evaluated.
 * @return {Number} result.
 */
calculus.pointDiff = function (func, point) {
  var a = func(point - 0.001);
  var b = func(point + 0.001);

  return (b - a) / (0.002);
};

/**
 * Calculate riemann sum for a specified, one variable, function
 * from a starting point, to a finishing point, with n divisions.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} quantity of divisions.
 * @param {Function} (Optional) Function that returns which value 
 *   to sample on each interval; if none is provided, left endpoints
 *   will be used.
 * @return {Number} result.
 */
calculus.Riemann = function (func, start, finish, n, sampler) {
  var inc = (finish - start) / n;
  var totalHeight = 0;
  var i;
  
  if (typeof sampler === 'function') {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(sampler(i, i + inc));
    }
  } else {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(i);
    }
  }
  
  return totalHeight * inc;
};

/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @return {Number} evaluation.
 */
function SimpsonDef (func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (func(a) + 4 * func(c) + func(b));
}

/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.  Manages recursive
 * investigation, handling evaluations within an error bound.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} total value.
 * @param {Number} Error bound (epsilon).
 * @return {Number} recursive evaluation of left and right side.
 */
function SimpsonRecursive (func, a, b, whole, eps) {
  var c = a + b;
  var left = SimpsonDef(func, a, c);
  var right = SimpsonDef(func, c, b);
  
  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return SimpsonRecursive(func, a, c, eps / 2, left) + SimpsonRecursive(func, c, b, eps / 2, right);
  }
}

/**
 * Evaluate area under a curve using adaptive simpson quadrature.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} Optional error bound (epsilon); 
 *   global error bound will be used as a fallback.
 * @return {Number} area underneath curve.
 */
calculus.adaptiveSimpson = function (func, a, b, eps) {
  eps = (typeof eps === 'undefined') ? numbers.EPSILON : eps;

  return SimpsonRecursive(func, a, b, SimpsonDef(func, a, b), eps);
};

/**
 * Calculate limit of a function at a given point. Can approach from
 * left, middle, or right.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to evaluate.
 * @param {String} approach to limit.
 * @return {Number} limit.
 */
calculus.limit = function (func, point, approach) {
  if (approach === 'left') {
    return func(point - 1e-15);
  } else if (approach === 'right') {
    return func(point + 1e-15);
  } else if (approach === 'middle') {
    return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};

/**
 * Calculate Stirling approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
 */
calculus.StirlingGamma = function (num) {
  return Math.sqrt(2 * Math.PI / num) * Math.pow((num / Math.E), num);
};

/**
 * Calculate Lanczos approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
 */
calculus.LanczosGamma = function (num) {
  var p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];

  var i;
  var g = 7;

  if(num < 0.5) return Math.PI / (Math.sin(Math.PI * num) * calculus.LanczosGamma(1 - num));

  num -= 1;
  
  var a = p[0];
  var t = num + g + 0.5;

  for (i = 1; i < p.length; i++) {
    a += p[i] / (num + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * a;
};

});

require.define("/numbers.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * numbers.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 
var numbers = exports;


// Expose methods
numbers.basic = require('./numbers/basic');
numbers.calculus = require('./numbers/calculus');
numbers.complex = require('./numbers/complex');
numbers.dsp = require('./numbers/dsp');
numbers.matrix = require('./numbers/matrix');
numbers.prime = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.generate = require('./numbers/generators');

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used 
 * in calculations. Can be set and retrieved freely. 
 * 
 * Given the float-point handling by JavaScript, as well as
 * the numbersal proficiency of some methods, it is common 
 * practice to include a bound by which discrepency between 
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numbers.EPSILON = 0.001;

});

require.define("/numbers/complex.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * matrix.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Complex = function (re, im) {
  this.re = re;
  this.im = im;
};

/**
 * Add a complex number to this one.
 * 
 * @param {Complex} Number to add.
 * @return {Complex} New complex number (sum).
 */
Complex.prototype.add = function(addend) {
  return new Complex(this.re + addend.re, this.im + addend.im);
};

/**
 * Subtract a complex number from this one.
 * 
 * @param {Complex} Number to subtract.
 * @return {Complex} New complex number (difference).
 */
Complex.prototype.subtract = function (subtrahend) {
  return new Complex(this.re - subtrahend.im, this.im - subtrahend.im);
};

/**
 * Multiply a complex number with this one.
 * 
 * @param {Complex} Number to multiply by.
 * @return {Complex} New complex number (product).
 */
Complex.prototype.multiply = function (multiplier) {
  var re = this.re * multiplier.re - this.im * multiplier.im;
  var im = this.im * multiplier.re + this.re * multiplier.im;
  
  return new Complex(re, im);
};

/**
 * Divide this number with another complex number.
 * 
 * @param {Complex} Divisor.
 * @return {Complex} New complex number (quotient).
 */
Complex.prototype.divide = function (divisor) {
  var denominator = divisor.re * divisor.re + divisor.im * divisor.im;
  var re = (this.re * divisor.re + this.im * divisor.im) / denominator;
  var im = (this.im * divisor.re - this.re * divisor.im) / denominator;
  
  return new Complex(re,im);
};

/**
 * Get the magnitude of this number.
 * 
 * @return {Number} Magnitude.
 */
Complex.prototype.magnitude = function () {
  return Math.sqrt(this.re * this.re + this.im * this.im);
};

/**
 * Get the phase of this number.
 * 
 * @return {Number} Phase.
 */
Complex.prototype.phase = function () {
  return Math.atan2(this.im, this.re)
};

module.exports = Complex;

});

require.define("/numbers/dsp.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * matrix.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var Complex = numbers.complex
var dsp = exports;

/**
 * Returns an array composed of elements from arr, starting at index start
 * and counting by step.
 * 
 * @param {Array} Input array.
 * @param {Number} Starting array index.
 * @param {Number} Step size.
 * @return {Array} Resulting sub-array.
 */
dsp.segment = function (arr, start, step) {
  var result = [];
  
  for (var i = start; i < arr.length; i += step) {
    result.push(arr[i]);
  }

  return result;
};

/**
 * Returns an array of complex numbers representing the frequency spectrum
 * of real valued time domain sequence x. (x.length must be integer power of 2)
 * Inspired by http://rosettacode.org/wiki/Fast_Fourier_transform#Python
 * 
 * @param {Array} Real-valued series input, eg. time-series.
 * @return {Array} Array of complex numbers representing input signal in Fourier domain.
 */
dsp.fft = function (x) {
  var N = x.length;
  
  if (N <= 1) {
    return [new Complex(x[0], 0)];
  }  
  
  if (Math.log(N) / Math.LN2 % 1 !== 0) {
    throw new Error ('Array length must be integer power of 2');
  }
  
  var even = dsp.fft(dsp.segment(x, 0, 2));
  var odd = dsp.fft(dsp.segment(x, 1, 2));
  var res = [], Nby2 = N / 2;
  
  for (var k = 0; k < N; k++) {
    var tmpPhase = -2 * Math.PI * k / N;
    var phasor = new Complex(Math.cos(tmpPhase), Math.sin(tmpPhase));
    if (k < Nby2) {
      res[k] = even[k].add(phasor.multiply(odd[k]));
    } else {
      res[k] = even[k - Nby2].subtract(phasor.multiply(odd[k - Nby2]));
    }
  }
  
  return res;
};

});

require.define("/numbers/matrix.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * matrix.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var matrix = exports;

/**
 * Return a deep copy of the input matrix.
 *
 * @param {Array} matrix to copy.
 * @return {Array} copied matrix.
 */
matrix.deepCopy = function(arr) {
  if (arr[0][0] === undefined) {
    throw new Error('Input cannot be a vector.');
  }
  
  var result = new Array(arr.length);

  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }
  
  return result;
};

/**
 * Return true if matrix is square, false otherwise.
 *
 * @param {Array} arr
 */
matrix.isSquare = function(arr) {
  var rows = arr.length;
  var cols = arr[0].length;
  
  return rows === cols;
};

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array} summed matrix.
 */
matrix.addition = function (arrA, arrB) {
  if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
    var result = new Array(arrA.length);
    
    for (var i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);
    
      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
      }
    }

    return result;
  } else {
    throw new Error('Matrix mismatch');
  }
};

/**
 * Scalar multiplication on an matrix.
 *
 * @param {Array} matrix.
 * @param {Number} scalar.
 * @return {Array} updated matrix.
 */
matrix.scalar = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = val * arr[i][j];
    }
  }

  return arr;
};

/**
 * Transpose a matrix.
 *
 * @param {Array} matrix.
 * @return {Array} transposed matrix.
 */
matrix.transpose = function (arr) {
  var result = new Array(arr[0].length);
  
  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);
    
    for (var j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
};

/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned.
 * @return {Array} n x n identity matrix.
 */
matrix.identity = function (n) {
  var result = new Array(n);
  
  for (var i = 0; i < n ; i++) {
    result[i] = new Array(n);
    for (var j = 0; j < n; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }

  return result;
};

/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector.
 * @param {Array} vector.
 * @return {Array} dot product.
 */
matrix.dotproduct = function (vectorA, vectorB) {
  if (vectorA.length === vectorB.length) {
    var result = 0;
    for (var i = 0; i < vectorA.length; i++) {
      result += vectorA[i] * vectorB[i];
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
};

/**
 * Multiply two matrices. They must abide by standard matching.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Array} matrix.
 * @param {Array} matrix.
 * @return {Array} result of multiplied matrices.
 */
matrix.multiply = function (arrA, arrB) {
  if (arrA[0].length === arrB.length) {
    var result = new Array(arrA.length);
    
    for (var x = 0; x < arrA.length; x++) {
      result[x] = new Array(arrB[0].length);
    }

    var arrB_T = matrix.transpose(arrB);
    
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < result[i].length; j++) {
        result[i][j] = matrix.dotproduct(arrA[i],arrB_T[j]);
      }
    }
    return result;
  } else {
    throw new Error("Array mismatch");
  }
};

/**
 * Evaluate determinate of matrix.  Expect speed
 * degradation for matrices over 4x4. 
 *
 * @param {Array} matrix.
 * @return {Number} determinant.
 */
matrix.determinant = function (m) {
  var numRow = m.length;
  var numCol = m[0].length;
  var det = 0;
  var row, col;
  var diagLeft, diagRight;

  if (numRow !== numCol) {
    throw new Error("Not a square matrix.")
  }

  if (numRow === 1) {
    return m[0][0];
  } 
  else if (numRow === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }

  for (col = 0; col < numCol; col++) {
    diagLeft = m[0][col];
    diagRight = m[0][col];

    for( row=1; row < numRow; row++ ) {
      diagRight *= m[row][(((col + row) % numCol) + numCol) % numCol];
      diagLeft *= m[row][(((col - row) % numCol) + numCol) % numCol];
    }

    det += diagRight - diagLeft;
  }

  return det;
};

/**
 * Returns a LUP decomposition of the given matrix such that:
 *
 * A*P = L*U
 *
 * Where
 * A is the input matrix
 * P is a pivot matrix
 * L is a lower triangular matrix
 * U is a upper triangular matrix
 *
 * This method returns an array of three matrices such that:
 *
 * matrix.luDecomposition(array) = [L, U, P]
 *
 * @param {Array} arr
 * @return {Array} array of matrices [L, U, P]
 */
matrix.lupDecomposition = function(arr) {
  if (!matrix.isSquare(arr)) {
    throw new Error("Matrix must be square.");
  }

  var size = arr.length;

  var LU = matrix.deepCopy(arr);
  var P = matrix.transpose(matrix.identity(size));
  var currentRow;
  var currentColumn = new Array(size);

  this.getL = function(a) {
    var m = a[0].length;
    var L = matrix.identity(m);
    
    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i > j) {
          L[i][j] = a[i][j];
        }
      }
    }
    
    return L;
  };

  this.getU = function(a) {
    var m = a[0].length;
    var U = matrix.identity(m);
    
    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i <= j) {
          U[i][j] = a[i][j];
        }
      }
    }
    
    return U;
  };

  for (var j = 0; j < size; j++) {
    for (var i = 0; i < size; i++) {
      currentColumn[i] = LU[i][j];
    }

    for (var i = 0; i < size; i++) {
      currentRow = LU[i];

      var minIndex = Math.min(i,j);
      var s = 0;
    
      for (var k = 0; k < minIndex; k++) {
        s += currentRow[k]*currentColumn[k];
      }

      currentRow[j] = currentColumn[i] -= s;
    }

    //Find pivot
    var pivot = j;
    for (var i = j+1; i < size; i++) {
      if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
        pivot = i;
      }
    }
    
    if (pivot != j) {
      LU = matrix.rowSwitch(LU, pivot, j);
      P = matrix.rowSwitch(P, pivot, j);
    }

    if (j < size && LU[j][j] != 0) {
      for (var i = j+1; i < size; i++) {
        LU[i][j] /= LU[j][j];
      }
    }
  }
  
  return [this.getL(LU), this.getU(LU), P];
};

/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Array} point.
 * @param {Number} degree.
 * @param {String} direction - clockwise or counterclockwise.
 * @return {Array} vector.
 */
matrix.rotate = function (point, degree, direction) {
  if (point.length === 2) {
    var negate = direction === 'clockwise' ? -1 : 1;
    var radians = degree * (Math.PI / 180);

    var transformation = [
      [Math.cos(radians), -1 * negate * Math.sin(radians)],
      [negate * Math.sin(radians), Math.cos(radians)]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error('Only two dimensional operations are supported at this time');
  }
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Array} point.
 * @param {Number} sx.
 * @param {Number} sy.
 * @return {Array} vector.
 */
matrix.scale = function (point, sx, sy) {
  if (point.length === 2) {

    var transformation = [
      [sx, 0],
      [0, sy]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error('Only two dimensional operations are supported at this time');
  }
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Array} point.
 * @param {Number} k.
 * @param {String} direction - xaxis or yaxis.
 * @return {Array} vector.
 */
matrix.shear = function (point, k, direction) {
  if (point.length === 2) {
    var xplaceholder = direction === 'xaxis' ? k : 0;
    var yplaceholder = direction === 'yaxis' ? k : 0;

    var transformation = [
      [1, xplaceholder],
      [yplaceholder, 1]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error('Only two dimensional operations are supported at this time');
  }
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Array} point.
 * @param {Number} tx.
 * @param {Number} ty.
 * @return {Array} vector.
 */
matrix.affine = function (point, tx, ty) {
  if (point.length === 2) {

    var transformation = [
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1 ]
    ];

    var newpoint = [
      [point[0][0]],
      [point[1][0]],
      [1]
    ];

    var transformed = matrix.multiply(transformation, newpoint);
    
    return [
      [transformed[0][0]],
      [transformed[1][0]]
    ];

  } else {
    throw new Error('Only two dimensional operations are supported at this time');
  }
};

/**
 * Scales a row of a matrix by a factor and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix.
 * @param {Number} row.
 * @param {Number} scale.
 */
matrix.rowScale = function (m, row, scale) {
  var result = new Array(m.length);
    
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if (i === row) {
        result[i][j] = scale * m[i][j]; 
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

/**
 * Swaps two rows of a matrix  and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowSwitch = function (m, row1, row2) {
  var result = new Array(m.length);
  
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if (i === row1) {
        result[i][j] = m[row2][j]; 
      } else if (i === row2) {
        result[i][j] = m[row1][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
};

/**
 * Adds a multiple of one row to another row
 * in a matrix and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowAddMultiple = function (m, from, to, scale){
  var result = new Array(m.length);
  
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if (i === to) {
        result[to][j] = m[to][j] + scale * m[from][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

});

require.define("/numbers/prime.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * prime.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = require('./basic');
var prime = exports;

/**
 * Determine if number is prime.  This is far from high performance.
 *
 * @param {Number} number to evaluate.
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.simple = function (val) {
  if (val === 1) return false;
  else if (val === 2) return true;
  else if (val !== undefined) {
    var start = 1;
    var valSqrt = Math.ceil(Math.sqrt(val));
    while (++start <= valSqrt) {
      if (val % start === 0) {
        return false;
      }
    }
    return true;
  }
};

/**
 * Returns the prime factors of a number.
 * More info (http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/)
 * Taken from Ratio.js
 *
 * @param {Number} num
 * @return {Array} an array of numbers
 * @example prime.factorization(20).join(',') === "2,2,5"
 **/
prime.factorization = function (num) {
  num = Math.floor(num);
	var root;
	var factors = [];
	var x;
	var sqrt = Math.sqrt;
  var doLoop = 1 < num && isFinite(num);
	
  while (doLoop) {
		root = sqrt(num);
		x = 2;
		if (num % x) {
			x = 3;
			while ((num % x) && ((x += 2) < root)) {}
		}
		
    x = (root < x) ? num : x;
		factors.push(x);
		doLoop = (x !== num);
		num /= x;
	}

	return factors;
};

/**
 * Determine if a number is prime in Polynomial time, using a randomized algorithm. 
 * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
 *
 * @param {Number} number to Evaluate.
 * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.millerRabin = function(n, k) {
  if (arguments.length === 1) k = 20;
  if (n === 2) return true;
  if (!basic.isInt(n) || n <= 1 || n % 2 === 0) return false;

  var s = 0;
  var d = n - 1;

  while (true) {
    var dm = basic.divMod(d, 2);
    var quotient = dm[0];
    var remainder = dm[1];

    if (remainder === 1) break;

    s += 1;
    d = quotient;
  }

  var tryComposite = function (a) {
    if (basic.powerMod(a, d, n) === 1) return false;
    
    for (var i = 0; i < s; i ++) {
      if (basic.powerMod(a, Math.pow(2, i) * d, n) === n - 1) return false;
    }
    
    return true;
  }

  for (var i = 0; i < k; i++) {
    var a = 2 + Math.floor(Math.random() * (n - 2 - 2));
    if (tryComposite(a)) return false;
  }

  return true;
};

/**
 * Return a list of prime numbers from 1...n, inclusive.
 *
 * @param {Number} upper limit of test n.
 * @return {Array} list of values that are prime up to n.
 */ 
prime.sieve = function (n) {
  if (n < 2) return [];
  var result = [2];
  for (var i = 3; i <= n; i++) {
    var notMultiple = false;
    
    for (var j in result) { 
      notMultiple = notMultiple || (0 === i % result[j]); 
    }

    if (!notMultiple) {
      result.push(i);
    }
  }

  return result;
};

});

require.define("/numbers/statistic.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * statistic.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var basic = require('./basic');
var statistic = exports;

/**
 * Calculate the mean value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} mean value.
 */
statistic.mean = function (arr) {
  var count = arr.length;
  var sum = basic.sum(arr);
  return sum / count;
};

/**
 * Calculate the median value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} median value.
 */
statistic.median = function (arr) {
  return statistic.quantile(arr, 1, 2);
};

/**
 * Calculate the mode value of a set of numbers in array.
 *
 * @param {Array} set of values.
 * @return {Number} mode value.
 */
statistic.mode = function (arr) {
  var counts = {};
  for (var i = 0, n = arr.length; i < n; i++) {
    if (counts[arr[i]] === undefined) {
      counts[arr[i]] = 0;
    } else {
      counts[arr[i]]++;
    }
  }

  var highest;
  
  for (var number in counts) {
    if (counts.hasOwnProperty(number)) {
      if (highest === undefined || counts[number] > counts[highest]) {
        highest = number;
      }
    }
  }
  
  return Number(highest);
};

/**
 * Calculate the kth q-quantile of a set of numbers in an array.
 * As per http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population
 * Ex: Median is 1st 2-quantile
 * Ex: Upper quartile is 3rd 4-quantile
 *
 * @param {Array} set of values.
 * @param {Number} index of quantile.
 * @param {Number} number of quantiles.
 * @return {Number} kth q-quantile of values.
 */
statistic.quantile = function (arr, k, q) {
  var sorted, count, index;

  if (k === 0) return Math.min.apply(null, arr);

  if (k === q) return Math.max.apply(null, arr);

  sorted = arr.slice(0);
  sorted.sort(function (a, b) { return a - b; });
  count = sorted.length;
  index = count * k / q;

  if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];

  return sorted[Math.floor(index)];
};


/**
 * Return a set of summary statistics provided an array.
 *
 * @return {Object} summary statistics.
 */
statistic.report = function(array) {
  return {
    mean: statistic.mean(array),
    firstQuartile: statistic.quantile(array, 1, 4),
    median: statistic.median(array),
    thirdQuartile: statistic.quantile(array, 3, 4),
    standardDev: statistic.standardDev(array)
  }
};

/**
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound.
 * @param {Number} upper bound.
 * @param {Number} quantity of elements in random sample.
 * @return {Array} random sample.
 */
statistic.randomSample = function (lower, upper, n) {
  var sample = [];

  while (sample.length < n) {
    var temp = Math.random() * upper;
    if (lower <= temp <= upper) {
      sample.push(temp)
    }
  }

  return sample;
};

/**
 * Evaluate the standard deviation for a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} standard deviation.
 */
statistic.standardDev = function (arr) {
  var count = arr.length;
  var mean = statistic.mean(arr);
  var squaredArr = [];

  for (var i = 0; i < arr.length; i++) {
    squaredArr[i] = Math.pow((arr[i] - mean),2);
  }

  return Math.sqrt((1 / count) * basic.sum(squaredArr));
};

/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Array} set of values.
 * @return {Number} correlation.
 */
statistic.correlation = function (arrX, arrY) {
  if (arrX.length == arrY.length) {
    var covarXY = statistic.covariance(arrX, arrY);
    var stdDevX = statistic.standardDev(arrX);
    var stdDevY = statistic.standardDev(arrY);

    return covarXY / (stdDevX * stdDevY);
  } else {
    throw new Error('Array mismatch');
  }
};

/**
 * Calculate the Coefficient of Determination of a dataset and regression line.
 *
 * @param {Array} Source data.
 * @param {Array} Regression data.
 * @return {Number} A number between 0 and 1.0 that represents how well the regression line fits the data.
 */
statistic.rSquared = function (source, regression) {
  var residualSumOfSquares = basic.sum(source.map(function (d,i) {
    return basic.square(d - regression[i]);
  }));

  var totalSumOfSquares = basic.sum(source.map(function (d) {
    return basic.square(d - statistic.mean(source));
  }));
  
  return 1 - (residualSumOfSquares / totalSumOfSquares);
};

/**
 * Create a function to calculate the exponential regression of a dataset.
 *
 * @param {Array} set of values.
 * @return {Function} function to accept X values and return corresponding regression Y values.
 */
statistic.exponentialRegression = function (arrY) {
  var n = arrY.length;
  var arrX = basic.range(1,n);

  var xSum = basic.sum(arrX);
  var ySum = basic.sum(arrY);
  var yMean = statistic.mean(arrY);
  var yLog = arrY.map(function (d) { return Math.log(d); });
  var xSquared = arrX.map(function (d) { return d * d; });
  var xSquaredSum = basic.sum(xSquared);
  var yLogSum = basic.sum(yLog);
  var xyLog = arrX.map(function (d, i) { return d * yLog[i]; });
  var xyLogSum = basic.sum(xyLog);

  var a = (yLogSum * xSquaredSum - xSum * xyLogSum) / (n * xSquaredSum - (xSum * xSum));
  var b = (n * xyLogSum - xSum * yLogSum) / (n * xSquaredSum - (xSum * xSum));

  var fn = function(x) {
    if (typeof x === 'number') {
      return Math.exp(a) * Math.exp(b * x);
    } else {
      return x.map(function (d) {
        return Math.exp(a) * Math.exp(b * d);
      });
    }
  };

  fn.rSquared = statistic.rSquared(arrY, arrX.map(fn));

  return fn;
};

/**
 * Create a function to calculate the linear regression of a dataset.
 *
 * @param {Array} X array.
 * @param {Array} Y array.
 * @return {Function} A function which given X or array of X values will return Y.
 */
statistic.linearRegression = function (arrX, arrY) {
  var n = arrX.length;
  var xSum = basic.sum(arrX);
  var ySum = basic.sum(arrY);
  var xySum = basic.sum(arrX.map(function (d, i) { return d * arrY[i]; }));
  var xSquaredSum = basic.sum(arrX.map(function (d) { return d * d; }));
  var xMean = statistic.mean(arrX);
  var yMean = statistic.mean(arrY);
  var b = (xySum - 1 / n * xSum * ySum) / (xSquaredSum - 1 / n * (xSum * xSum));
  var a = yMean - b * xMean;

  return function(x) {
    if (typeof x === 'number') {
      return a + b * x;
    } else {
      return x.map(function (d) {
        return a + b * d;
      });
    }
  }
};

/**
 * Evaluate the covariance amongst 2 sets.
 *
 * @param {Array} set 1 of values.
 * @param {Array} set 2 of values.
 * @return {Number} covariance.
 */
 statistic.covariance = function (set1, set2) {
  if (set1.length == set2.length) {
    var n = set1.length;
    var total = 0;
    var sum1 = basic.sum(set1);
    var sum2 = basic.sum(set2);

    for (var i = 0; i < n; i++) {
      total += set1[i] * set2[i];
    }

    return (total - sum1 * sum2 / n) / n;
  } else {
    throw new Error('Array mismatch');
  }
};

});

require.define("/numbers/generators.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * generators.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski, Kartik Talwar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var generate = exports;

/**
 * Fast Fibonacci Implementation
 *
 * @param {Number} number to calculate
 * @return {Number} nth fibonacci number
 */
generate.fibonacci = function (n) {
  // Adapted from
  // http://bosker.wordpress.com/2011/04/29/the-worst-algorithm-in-the-world/

  var bitSystem = function(n) {
    var bit, bits, n;
    bits = [];
    while (n > 0) {
      bit = (n < 2) ? n : n % 2;
      n = Math.floor(n / 2);
      bits.push(bit);
    }
    return bits.reverse();
  };

  var a = 1;
  var b = 0;
  var c = 1;

  var system = bitSystem(n);

  for (var i = 0; i < system.length; i++) {
    var bit = system[i];
    if (bit) {
      var temp = [(a + c) * b, (b * b) + (c * c)];
      a = temp[0];
      b = temp[1];
    } else {
      var temp = [(a * a) + (b * b), (a + c) * b];
      a = temp[0]
      b = temp[1];
    }

    c = a + b;
  }

  return b;
};

/**
 * Populate the given array with a Collatz Sequence.
 *
 * @param {Number} first number.
 * @param {Array} arrary to be populated.
 * @return {Array} array populated with Collatz sequence
 */
generate.collatz = function (n, result) {
  result.push(n);
  
  if (n === 1) {
    return;
  } else if (n % 2 === 0) {
    generate.collatz(n / 2, result);
  } else {
    generate.collatz(3 * n + 1, result);
  }
};

});

require.define("/numbers.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * numbers.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 
var numbers = exports;


// Expose methods
numbers.basic = require('./numbers/basic');
numbers.calculus = require('./numbers/calculus');
numbers.complex = require('./numbers/complex');
numbers.dsp = require('./numbers/dsp');
numbers.matrix = require('./numbers/matrix');
numbers.prime = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.generate = require('./numbers/generators');

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used 
 * in calculations. Can be set and retrieved freely. 
 * 
 * Given the float-point handling by JavaScript, as well as
 * the numbersal proficiency of some methods, it is common 
 * practice to include a bound by which discrepency between 
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numbers.EPSILON = 0.001;

});
require("/numbers.js");
})();
