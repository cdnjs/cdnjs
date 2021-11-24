(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vega')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vega'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vegaLite = {}, global.vega));
})(this, (function (exports, vega) { 'use strict';

  var name = "vega-lite";
  var author = "Dominik Moritz, Kanit \"Ham\" Wongsuphasawat, Arvind Satyanarayan, Jeffrey Heer";
  var version$1 = "5.2.0";
  var collaborators = [
  	"Kanit Wongsuphasawat (http://kanitw.yellowpigz.com)",
  	"Dominik Moritz (https://www.domoritz.de)",
  	"Arvind Satyanarayan (https://arvindsatya.com)",
  	"Jeffrey Heer (https://jheer.org)"
  ];
  var homepage = "https://vega.github.io/vega-lite/";
  var description$1 = "Vega-Lite is a concise high-level language for interactive visualization.";
  var main$1 = "build/vega-lite.js";
  var unpkg = "build/vega-lite.min.js";
  var jsdelivr = "build/vega-lite.min.js";
  var module = "build/src/index";
  var types = "build/src/index.d.ts";
  var bin = {
  	vl2png: "./bin/vl2png",
  	vl2svg: "./bin/vl2svg",
  	vl2pdf: "./bin/vl2pdf",
  	vl2vg: "./bin/vl2vg"
  };
  var directories = {
  	test: "test"
  };
  var files = [
  	"bin",
  	"build",
  	"src",
  	"vega-lite*",
  	"tsconfig.json"
  ];
  var scripts = {
  	changelog: "conventional-changelog -p angular -r 2",
  	prebuild: "yarn clean:build",
  	build: "yarn build:only",
  	"build:only": "tsc -p tsconfig.build.json && rollup -c",
  	"prebuild:examples": "yarn build:only",
  	"build:examples": "yarn data && TZ=America/Los_Angeles scripts/build-examples.sh",
  	"prebuild:examples-full": "yarn build:only",
  	"build:examples-full": "TZ=America/Los_Angeles scripts/build-examples.sh 1",
  	"build:example": "TZ=America/Los_Angeles scripts/build-example.sh",
  	"build:toc": "yarn build:jekyll && scripts/generate-toc",
  	"build:site": "rollup -c site/rollup.config.js",
  	"build:jekyll": "pushd site && bundle exec jekyll build -q && popd",
  	"build:versions": "scripts/update-version.sh",
  	clean: "yarn clean:build && del-cli 'site/data/*' 'examples/compiled/*.png' && find site/examples ! -name 'index.md' ! -name 'data' -type f -delete",
  	"clean:build": "del-cli 'build/*' !build/vega-lite-schema.json",
  	"predeploy:site": "yarn presite",
  	"deploy:site": "gh-pages -d site",
  	data: "rsync -r node_modules/vega-datasets/data/* site/data",
  	schema: "mkdir -p build && ts-json-schema-generator -f tsconfig.json -p src/index.ts -t TopLevelSpec --no-type-check --no-ref-encode > build/vega-lite-schema.json && yarn renameschema && cp build/vega-lite-schema.json site/_data/",
  	renameschema: "scripts/rename-schema.sh",
  	presite: "yarn data && yarn schema && yarn build:site && yarn build:versions && scripts/create-example-pages.sh",
  	site: "yarn site:only",
  	"site:only": "pushd site && bundle exec jekyll serve -I -l && popd",
  	prettierbase: "prettier '**/*.{md,css,yml}'",
  	eslintbase: "eslint .",
  	format: "yarn eslintbase --fix && yarn prettierbase --write",
  	lint: "yarn eslintbase && yarn prettierbase --check",
  	jest: "NODE_OPTIONS=--experimental-vm-modules npx jest",
  	test: "yarn jest test/ && yarn lint && yarn schema && yarn jest examples/ && yarn test:runtime",
  	"test:cover": "yarn jest --collectCoverage test/",
  	"test:inspect": "node --inspect-brk --experimental-vm-modules ./node_modules/.bin/jest --runInBand test",
  	"test:runtime": "NODE_OPTIONS=--experimental-vm-modules TZ=America/Los_Angeles npx jest test-runtime/ --config test-runtime/jest-config.json",
  	"test:runtime:generate": "yarn build:only && del-cli test-runtime/resources && VL_GENERATE_TESTS=true yarn test:runtime",
  	watch: "tsc -p tsconfig.build.json -w",
  	"watch:site": "yarn build:site -w",
  	"watch:test": "yarn jest --watch test/"
  };
  var repository = {
  	type: "git",
  	url: "https://github.com/vega/vega-lite.git"
  };
  var license = "BSD-3-Clause";
  var bugs = {
  	url: "https://github.com/vega/vega-lite/issues"
  };
  var devDependencies = {
  	"@babel/core": "^7.16.0",
  	"@babel/preset-env": "^7.16.0",
  	"@babel/preset-typescript": "^7.16.0",
  	"@rollup/plugin-alias": "^3.1.8",
  	"@rollup/plugin-babel": "^5.3.0",
  	"@rollup/plugin-commonjs": "^21.0.1",
  	"@rollup/plugin-json": "^4.1.0",
  	"@rollup/plugin-node-resolve": "^13.0.6",
  	"@types/chai": "^4.2.22",
  	"@types/d3": "^7.1.0",
  	"@types/jest": "^27.0.2",
  	"@types/mkdirp": "^1.0.2",
  	"@types/pako": "^1.0.2",
  	"@typescript-eslint/eslint-plugin": "^5.4.0",
  	"@typescript-eslint/parser": "^5.4.0",
  	ajv: "^8.8.0",
  	"ajv-formats": "^2.1.1",
  	chai: "^4.3.4",
  	cheerio: "^1.0.0-rc.10",
  	"conventional-changelog-cli": "^2.1.1",
  	d3: "^7.1.1",
  	"del-cli": "^4.0.1",
  	eslint: "^8.2.0",
  	"eslint-config-prettier": "^8.3.0",
  	"eslint-plugin-jest": "^25.2.4",
  	"eslint-plugin-prettier": "^4.0.0",
  	"gh-pages": "^3.2.3",
  	"highlight.js": "^11.3.1",
  	jest: "^27.3.1",
  	"jest-dev-server": "^6.0.0",
  	mkdirp: "^1.0.4",
  	pako: "^2.0.4",
  	prettier: "^2.4.1",
  	puppeteer: "^11.0.0",
  	rollup: "^2.60.0",
  	"rollup-plugin-bundle-size": "^1.0.3",
  	"rollup-plugin-sourcemaps": "^0.6.3",
  	"rollup-plugin-terser": "^7.0.2",
  	serve: "^13.0.2",
  	terser: "^5.10.0",
  	"ts-jest": "^27.0.7",
  	"ts-json-schema-generator": "^0.97.0",
  	typescript: "~4.5.2",
  	"vega-cli": "^5.21.0",
  	"vega-datasets": "~2.2.0",
  	"vega-embed": "^6.20.2",
  	"vega-tooltip": "^0.27.0",
  	"yaml-front-matter": "^4.1.1"
  };
  var dependencies = {
  	"@types/clone": "~2.1.1",
  	"array-flat-polyfill": "^1.0.1",
  	clone: "~2.1.2",
  	"fast-deep-equal": "~3.1.3",
  	"fast-json-stable-stringify": "~2.1.0",
  	"json-stringify-pretty-compact": "~3.0.0",
  	tslib: "~2.3.1",
  	"vega-event-selector": "~3.0.0",
  	"vega-expression": "~5.0.0",
  	"vega-util": "~1.17.0",
  	yargs: "~17.2.1"
  };
  var peerDependencies = {
  	vega: "^5.21.0"
  };
  var engines = {
  	node: ">=12"
  };
  var pkg = {
  	name: name,
  	author: author,
  	version: version$1,
  	collaborators: collaborators,
  	homepage: homepage,
  	description: description$1,
  	main: main$1,
  	unpkg: unpkg,
  	jsdelivr: jsdelivr,
  	module: module,
  	types: types,
  	bin: bin,
  	directories: directories,
  	files: files,
  	scripts: scripts,
  	repository: repository,
  	license: license,
  	bugs: bugs,
  	devDependencies: devDependencies,
  	dependencies: dependencies,
  	peerDependencies: peerDependencies,
  	engines: engines
  };

  Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function r(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,function(a,e){return Array.isArray(e)?a.push.apply(a,r.call(e,t-1)):a.push(e),a},[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(r){return Array.prototype.map.apply(this,arguments).flat()},writable:!0});

  var clone = {exports: {}};

  (function (module) {
    var clone = function () {

      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }

      var nativeMap;

      try {
        nativeMap = Map;
      } catch (_) {
        // maybe a reference error because no `Map`. Give it a dummy value that no
        // value will ever be an instanceof.
        nativeMap = function () {};
      }

      var nativeSet;

      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function () {};
      }

      var nativePromise;

      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function () {};
      }
      /**
       * Clones (copies) an Object using deep copying.
       *
       * This function supports circular references by default, but if you are certain
       * there are no circular references in your object, you can save some CPU time
       * by calling clone(obj, false).
       *
       * Caution: if `circular` is false and `parent` contains circular references,
       * your program may enter an infinite loop and crash.
       *
       * @param `parent` - the object to be cloned
       * @param `circular` - set to true if the object to be cloned may contain
       *    circular references. (optional - true by default)
       * @param `depth` - set to a number if the object is only to be cloned to
       *    a particular depth. (optional - defaults to Infinity)
       * @param `prototype` - sets the prototype to be used when cloning an object.
       *    (optional - defaults to parent prototype).
       * @param `includeNonEnumerable` - set to true if the non-enumerable properties
       *    should be cloned as well. Non-enumerable properties on the prototype
       *    chain will be ignored. (optional - false by default)
      */


      function clone(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === 'object') {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        } // maintain two arrays for circular references, where corresponding parents
        // and children have the same index


        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != 'undefined';
        if (typeof circular == 'undefined') circular = true;
        if (typeof depth == 'undefined') depth = Infinity; // recurse this function so we don't reset allParents and allChildren

        function _clone(parent, depth) {
          // cloning null always returns null
          if (parent === null) return null;
          if (depth === 0) return parent;
          var child;
          var proto;

          if (typeof parent != 'object') {
            return parent;
          }

          if (_instanceof(parent, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent, nativePromise)) {
            child = new nativePromise(function (resolve, reject) {
              parent.then(function (value) {
                resolve(_clone(value, depth - 1));
              }, function (err) {
                reject(_clone(err, depth - 1));
              });
            });
          } else if (clone.__isArray(parent)) {
            child = [];
          } else if (clone.__isRegExp(parent)) {
            child = new RegExp(parent.source, __getRegExpFlags(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
          } else if (clone.__isDate(parent)) {
            child = new Date(parent.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent)) {
            if (Buffer.allocUnsafe) {
              // Node.js >= 4.5.0
              child = Buffer.allocUnsafe(parent.length);
            } else {
              // Older Node.js versions
              child = new Buffer(parent.length);
            }

            parent.copy(child);
            return child;
          } else if (_instanceof(parent, Error)) {
            child = Object.create(parent);
          } else {
            if (typeof prototype == 'undefined') {
              proto = Object.getPrototypeOf(parent);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }

          if (circular) {
            var index = allParents.indexOf(parent);

            if (index != -1) {
              return allChildren[index];
            }

            allParents.push(parent);
            allChildren.push(child);
          }

          if (_instanceof(parent, nativeMap)) {
            parent.forEach(function (value, key) {
              var keyChild = _clone(key, depth - 1);

              var valueChild = _clone(value, depth - 1);

              child.set(keyChild, valueChild);
            });
          }

          if (_instanceof(parent, nativeSet)) {
            parent.forEach(function (value) {
              var entryChild = _clone(value, depth - 1);

              child.add(entryChild);
            });
          }

          for (var i in parent) {
            var attrs;

            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }

            if (attrs && attrs.set == null) {
              continue;
            }

            child[i] = _clone(parent[i], depth - 1);
          }

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent);

            for (var i = 0; i < symbols.length; i++) {
              // Don't need to worry about cloning a symbol because it is a primitive,
              // like a number or string.
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);

              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }

              child[symbol] = _clone(parent[symbol], depth - 1);

              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }

          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent);

            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);

              if (descriptor && descriptor.enumerable) {
                continue;
              }

              child[propertyName] = _clone(parent[propertyName], depth - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }

          return child;
        }

        return _clone(parent, depth);
      }
      /**
       * Simple flat clone using prototype, accepts only objects, usefull for property
       * override on FLAT configuration object (no nested props).
       *
       * USE WITH CAUTION! This may not behave as you wish if you do not know how this
       * works.
       */


      clone.clonePrototype = function clonePrototype(parent) {
        if (parent === null) return null;

        var c = function () {};

        c.prototype = parent;
        return new c();
      }; // private utility functions


      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }

      clone.__objToStr = __objToStr;

      function __isDate(o) {
        return typeof o === 'object' && __objToStr(o) === '[object Date]';
      }

      clone.__isDate = __isDate;

      function __isArray(o) {
        return typeof o === 'object' && __objToStr(o) === '[object Array]';
      }

      clone.__isArray = __isArray;

      function __isRegExp(o) {
        return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
      }

      clone.__isRegExp = __isRegExp;

      function __getRegExpFlags(re) {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
      }

      clone.__getRegExpFlags = __getRegExpFlags;
      return clone;
    }();

    if (module.exports) {
      module.exports = clone;
    }
  })(clone);

  var clone_ = clone.exports;

  var fastDeepEqual = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;

      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

        return true;
      }

      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        var key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }

      return true;
    } // true if both NaN, false otherwise


    return a !== a && b !== b;
  };

  var fastJsonStableStringify = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = {
      cmp: opts
    };
    var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

    var cmp = opts.cmp && function (f) {
      return function (node) {
        return function (a, b) {
          var aobj = {
            key: a,
            value: node[a]
          };
          var bobj = {
            key: b,
            value: node[b]
          };
          return f(aobj, bobj);
        };
      };
    }(opts.cmp);

    var seen = [];
    return function stringify(node) {
      if (node && node.toJSON && typeof node.toJSON === 'function') {
        node = node.toJSON();
      }

      if (node === undefined) return;
      if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
      if (typeof node !== 'object') return JSON.stringify(node);
      var i, out;

      if (Array.isArray(node)) {
        out = '[';

        for (i = 0; i < node.length; i++) {
          if (i) out += ',';
          out += stringify(node[i]) || 'null';
        }

        return out + ']';
      }

      if (node === null) return 'null';

      if (seen.indexOf(node) !== -1) {
        if (cycles) return JSON.stringify('__cycle__');
        throw new TypeError('Converting circular structure to JSON');
      }

      var seenIndex = seen.push(node) - 1;
      var keys = Object.keys(node).sort(cmp && cmp(node));
      out = '';

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = stringify(node[key]);
        if (!value) continue;
        if (out) out += ',';
        out += JSON.stringify(key) + ':' + value;
      }

      seen.splice(seenIndex, 1);
      return '{' + out + '}';
    }(data);
  };

  function isLogicalOr(op) {
    return !!op.or;
  }
  function isLogicalAnd(op) {
    return !!op.and;
  }
  function isLogicalNot(op) {
    return !!op.not;
  }
  function forEachLeaf(op, fn) {
    if (isLogicalNot(op)) {
      forEachLeaf(op.not, fn);
    } else if (isLogicalAnd(op)) {
      for (const subop of op.and) {
        forEachLeaf(subop, fn);
      }
    } else if (isLogicalOr(op)) {
      for (const subop of op.or) {
        forEachLeaf(subop, fn);
      }
    } else {
      fn(op);
    }
  }
  function normalizeLogicalComposition(op, normalizer) {
    if (isLogicalNot(op)) {
      return {
        not: normalizeLogicalComposition(op.not, normalizer)
      };
    } else if (isLogicalAnd(op)) {
      return {
        and: op.and.map(o => normalizeLogicalComposition(o, normalizer))
      };
    } else if (isLogicalOr(op)) {
      return {
        or: op.or.map(o => normalizeLogicalComposition(o, normalizer))
      };
    } else {
      return normalizer(op);
    }
  }

  const deepEqual = fastDeepEqual;
  const duplicate = clone_;
  function never(message) {
    throw new Error(message);
  }
  /**
   * Creates an object composed of the picked object properties.
   *
   * var object = {'a': 1, 'b': '2', 'c': 3};
   * pick(object, ['a', 'c']);
   * // → {'a': 1, 'c': 3}
   */
  // eslint-disable-next-line @typescript-eslint/ban-types

  function pick(obj, props) {
    const copy = {};

    for (const prop of props) {
      if (vega.hasOwnProperty(obj, prop)) {
        copy[prop] = obj[prop];
      }
    }

    return copy;
  }
  /**
   * The opposite of _.pick; this method creates an object composed of the own
   * and inherited enumerable string keyed properties of object that are not omitted.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types

  function omit(obj, props) {
    const copy = { ...obj
    };

    for (const prop of props) {
      delete copy[prop];
    }

    return copy;
  }
  /**
   * Monkey patch Set so that `stringify` produces a string representation of sets.
   */

  Set.prototype['toJSON'] = function () {
    return "Set(".concat([...this].map(x => fastJsonStableStringify(x)).join(','), ")");
  };
  /**
   * Converts any object to a string representation that can be consumed by humans.
   */


  const stringify = fastJsonStableStringify;
  /**
   * Converts any object to a string of limited size, or a number.
   */

  function hash(a) {
    if (vega.isNumber(a)) {
      return a;
    }

    const str = vega.isString(a) ? a : fastJsonStableStringify(a); // short strings can be used as hash directly, longer strings are hashed to reduce memory usage

    if (str.length < 250) {
      return str;
    } // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/


    let h = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      h = (h << 5) - h + char;
      h = h & h; // Convert to 32bit integer
    }

    return h;
  }
  function isNullOrFalse(x) {
    return x === false || x === null;
  }
  function contains(array, item) {
    return array.includes(item);
  }
  /**
   * Returns true if any item returns true.
   */

  function some(arr, f) {
    let i = 0;

    for (const [k, a] of arr.entries()) {
      if (f(a, k, i++)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Returns true if all items return true.
   */

  function every(arr, f) {
    let i = 0;

    for (const [k, a] of arr.entries()) {
      if (!f(a, k, i++)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Like TS Partial but applies recursively to all properties.
   */

  /**
   * recursively merges src into dest
   */
  function mergeDeep(dest) {
    for (var _len = arguments.length, src = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      src[_key - 1] = arguments[_key];
    }

    for (const s of src) {
      deepMerge_(dest, s !== null && s !== void 0 ? s : {});
    }

    return dest;
  }

  function deepMerge_(dest, src) {
    for (const property of keys(src)) {
      vega.writeConfig(dest, property, src[property], true);
    }
  }

  function unique(values, f) {
    const results = [];
    const u = {};
    let v;

    for (const val of values) {
      v = f(val);

      if (v in u) {
        continue;
      }

      u[v] = 1;
      results.push(val);
    }

    return results;
  }

  /**
   * Returns true if the two dictionaries disagree. Applies only to defined values.
   */
  function isEqual(dict, other) {
    const dictKeys = keys(dict);
    const otherKeys = keys(other);

    if (dictKeys.length !== otherKeys.length) {
      return false;
    }

    for (const key of dictKeys) {
      if (dict[key] !== other[key]) {
        return false;
      }
    }

    return true;
  }
  function setEqual(a, b) {
    if (a.size !== b.size) {
      return false;
    }

    for (const e of a) {
      if (!b.has(e)) {
        return false;
      }
    }

    return true;
  }
  function hasIntersection(a, b) {
    for (const key of a) {
      if (b.has(key)) {
        return true;
      }
    }

    return false;
  }
  function prefixGenerator(a) {
    const prefixes = new Set();

    for (const x of a) {
      const splitField = vega.splitAccessPath(x); // Wrap every element other than the first in `[]`

      const wrappedWithAccessors = splitField.map((y, i) => i === 0 ? y : "[".concat(y, "]"));
      const computedPrefixes = wrappedWithAccessors.map((_, i) => wrappedWithAccessors.slice(0, i + 1).join(''));

      for (const y of computedPrefixes) {
        prefixes.add(y);
      }
    }

    return prefixes;
  }
  /**
   * Returns true if a and b have an intersection. Also return true if a or b are undefined
   * since this means we don't know what fields a node produces or depends on.
   */

  function fieldIntersection(a, b) {
    if (a === undefined || b === undefined) {
      return true;
    }

    return hasIntersection(prefixGenerator(a), prefixGenerator(b));
  } // eslint-disable-next-line @typescript-eslint/ban-types

  function isEmpty(obj) {
    return keys(obj).length === 0;
  } // This is a stricter version of Object.keys but with better types. See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208

  const keys = Object.keys;
  const vals = Object.values;
  const entries$1 = Object.entries; // Using mapped type to declare a collect of flags for a string literal type S
  // https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types

  function isBoolean(b) {
    return b === true || b === false;
  }
  /**
   * Convert a string into a valid variable name
   */

  function varName(s) {
    // Replace non-alphanumeric characters (anything besides a-zA-Z0-9_) with _
    const alphanumericS = s.replace(/\W/g, '_'); // Add _ if the string has leading numbers.

    return (s.match(/^\d+/) ? '_' : '') + alphanumericS;
  }
  function logicalExpr(op, cb) {
    if (isLogicalNot(op)) {
      return "!(".concat(logicalExpr(op.not, cb), ")");
    } else if (isLogicalAnd(op)) {
      return "(".concat(op.and.map(and => logicalExpr(and, cb)).join(') && ('), ")");
    } else if (isLogicalOr(op)) {
      return "(".concat(op.or.map(or => logicalExpr(or, cb)).join(') || ('), ")");
    } else {
      return cb(op);
    }
  }
  /**
   * Delete nested property of an object, and delete the ancestors of the property if they become empty.
   */

  function deleteNestedProperty(obj, orderedProps) {
    if (orderedProps.length === 0) {
      return true;
    }

    const prop = orderedProps.shift(); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    if (prop in obj && deleteNestedProperty(obj[prop], orderedProps)) {
      delete obj[prop];
    }

    return isEmpty(obj);
  }
  function titleCase(s) {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }
  /**
   * Converts a path to an access path with datum.
   * @param path The field name.
   * @param datum The string to use for `datum`.
   */

  function accessPathWithDatum(path) {
    let datum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'datum';
    const pieces = vega.splitAccessPath(path);
    const prefixes = [];

    for (let i = 1; i <= pieces.length; i++) {
      const prefix = "[".concat(pieces.slice(0, i).map(vega.stringValue).join(']['), "]");
      prefixes.push("".concat(datum).concat(prefix));
    }

    return prefixes.join(' && ');
  }
  /**
   * Return access with datum to the flattened field.
   *
   * @param path The field name.
   * @param datum The string to use for `datum`.
   */

  function flatAccessWithDatum(path) {
    let datum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'datum';
    return "".concat(datum, "[").concat(vega.stringValue(vega.splitAccessPath(path).join('.')), "]");
  }

  function escapePathAccess(string) {
    return string.replace(/(\[|\]|\.|'|")/g, '\\$1');
  }
  /**
   * Replaces path accesses with access to non-nested field.
   * For example, `foo["bar"].baz` becomes `foo\\.bar\\.baz`.
   */


  function replacePathInField(path) {
    return "".concat(vega.splitAccessPath(path).map(escapePathAccess).join('\\.'));
  }
  /**
   * Replace all occurrences of a string with another string.
   *
   * @param string the string to replace in
   * @param find the string to replace
   * @param replacement the replacement
   */

  function replaceAll(string, find, replacement) {
    return string.replace(new RegExp(find.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replacement);
  }
  /**
   * Remove path accesses with access from field.
   * For example, `foo["bar"].baz` becomes `foo.bar.baz`.
   */

  function removePathFromField(path) {
    return "".concat(vega.splitAccessPath(path).join('.'));
  }
  /**
   * Count the depth of the path. Returns 1 for fields that are not nested.
   */

  function accessPathDepth(path) {
    if (!path) {
      return 0;
    }

    return vega.splitAccessPath(path).length;
  }
  /**
   * This is a replacement for chained || for numeric properties or properties that respect null so that 0 will be included.
   */

  function getFirstDefined() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    for (const arg of args) {
      if (arg !== undefined) {
        return arg;
      }
    }

    return undefined;
  } // variable used to generate id

  let idCounter = 42;
  /**
   * Returns a new random id every time it gets called.
   *
   * Has side effect!
   */

  function uniqueId(prefix) {
    const id = ++idCounter;
    return prefix ? String(prefix) + id : id;
  }
  /**
   * Resets the id counter used in uniqueId. This can be useful for testing.
   */

  function resetIdCounter() {
    idCounter = 42;
  }
  function internalField(name) {
    return isInternalField(name) ? name : "__".concat(name);
  }
  function isInternalField(name) {
    return name.startsWith('__');
  }
  /**
   * Normalize angle to be within [0,360).
   */

  function normalizeAngle(angle) {
    if (angle === undefined) {
      return undefined;
    }

    return (angle % 360 + 360) % 360;
  }
  /**
   * Returns whether the passed in value is a valid number.
   */

  function isNumeric(value) {
    if (vega.isNumber(value)) {
      return true;
    }

    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  /*
   * Constants and utilities for encoding channels (Visual variables)
   * such as 'x', 'y', 'color'.
   */
  // Facet
  const ROW = 'row';
  const COLUMN = 'column';
  const FACET = 'facet'; // Position

  const X = 'x';
  const Y = 'y';
  const X2 = 'x2';
  const Y2 = 'y2'; // Position Offset

  const XOFFSET = 'xOffset';
  const YOFFSET = 'yOffset'; // Arc-Position

  const RADIUS = 'radius';
  const RADIUS2 = 'radius2';
  const THETA = 'theta';
  const THETA2 = 'theta2'; // Geo Position

  const LATITUDE = 'latitude';
  const LONGITUDE = 'longitude';
  const LATITUDE2 = 'latitude2';
  const LONGITUDE2 = 'longitude2'; // Mark property with scale

  const COLOR = 'color';
  const FILL = 'fill';
  const STROKE = 'stroke';
  const SHAPE = 'shape';
  const SIZE = 'size';
  const ANGLE = 'angle';
  const OPACITY = 'opacity';
  const FILLOPACITY = 'fillOpacity';
  const STROKEOPACITY = 'strokeOpacity';
  const STROKEWIDTH = 'strokeWidth';
  const STROKEDASH = 'strokeDash'; // Non-scale channel

  const TEXT$1 = 'text';
  const ORDER = 'order';
  const DETAIL = 'detail';
  const KEY = 'key';
  const TOOLTIP = 'tooltip';
  const HREF = 'href';
  const URL = 'url';
  const DESCRIPTION = 'description';
  const POSITION_CHANNEL_INDEX = {
    x: 1,
    y: 1,
    x2: 1,
    y2: 1
  };
  const POLAR_POSITION_CHANNEL_INDEX = {
    theta: 1,
    theta2: 1,
    radius: 1,
    radius2: 1
  };
  function isPolarPositionChannel(c) {
    return c in POLAR_POSITION_CHANNEL_INDEX;
  }
  const GEO_POSIITON_CHANNEL_INDEX = {
    longitude: 1,
    longitude2: 1,
    latitude: 1,
    latitude2: 1
  };
  function getPositionChannelFromLatLong(channel) {
    switch (channel) {
      case LATITUDE:
        return 'y';

      case LATITUDE2:
        return 'y2';

      case LONGITUDE:
        return 'x';

      case LONGITUDE2:
        return 'x2';
    }
  }
  function isGeoPositionChannel(c) {
    return c in GEO_POSIITON_CHANNEL_INDEX;
  }
  const GEOPOSITION_CHANNELS = keys(GEO_POSIITON_CHANNEL_INDEX);
  const UNIT_CHANNEL_INDEX = { ...POSITION_CHANNEL_INDEX,
    ...POLAR_POSITION_CHANNEL_INDEX,
    ...GEO_POSIITON_CHANNEL_INDEX,
    xOffset: 1,
    yOffset: 1,
    // color
    color: 1,
    fill: 1,
    stroke: 1,
    // other non-position with scale
    opacity: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDash: 1,
    size: 1,
    angle: 1,
    shape: 1,
    // channels without scales
    order: 1,
    text: 1,
    detail: 1,
    key: 1,
    tooltip: 1,
    href: 1,
    url: 1,
    description: 1
  };
  function isColorChannel(channel) {
    return channel === COLOR || channel === FILL || channel === STROKE;
  }
  const FACET_CHANNEL_INDEX = {
    row: 1,
    column: 1,
    facet: 1
  };
  const FACET_CHANNELS = keys(FACET_CHANNEL_INDEX);
  const CHANNEL_INDEX = { ...UNIT_CHANNEL_INDEX,
    ...FACET_CHANNEL_INDEX
  };
  const CHANNELS = keys(CHANNEL_INDEX);
  const {
    order: _o,
    detail: _d,
    tooltip: _tt1,
    ...SINGLE_DEF_CHANNEL_INDEX
  } = CHANNEL_INDEX;
  const {
    row: _r,
    column: _c,
    facet: _f,
    ...SINGLE_DEF_UNIT_CHANNEL_INDEX
  } = SINGLE_DEF_CHANNEL_INDEX;
  function isSingleDefUnitChannel(str) {
    return !!SINGLE_DEF_UNIT_CHANNEL_INDEX[str];
  }
  function isChannel(str) {
    return !!CHANNEL_INDEX[str];
  }
  const SECONDARY_RANGE_CHANNEL = [X2, Y2, LATITUDE2, LONGITUDE2, THETA2, RADIUS2];
  function isSecondaryRangeChannel(c) {
    const main = getMainRangeChannel(c);
    return main !== c;
  }

  /**
   * Get the main channel for a range channel. E.g. `x` for `x2`.
   */
  function getMainRangeChannel(channel) {
    switch (channel) {
      case X2:
        return X;

      case Y2:
        return Y;

      case LATITUDE2:
        return LATITUDE;

      case LONGITUDE2:
        return LONGITUDE;

      case THETA2:
        return THETA;

      case RADIUS2:
        return RADIUS;
    }

    return channel;
  }
  function getVgPositionChannel(channel) {
    if (isPolarPositionChannel(channel)) {
      switch (channel) {
        case THETA:
          return 'startAngle';

        case THETA2:
          return 'endAngle';

        case RADIUS:
          return 'outerRadius';

        case RADIUS2:
          return 'innerRadius';
      }
    }

    return channel;
  }
  /**
   * Get the main channel for a range channel. E.g. `x` for `x2`.
   */

  function getSecondaryRangeChannel(channel) {
    switch (channel) {
      case X:
        return X2;

      case Y:
        return Y2;

      case LATITUDE:
        return LATITUDE2;

      case LONGITUDE:
        return LONGITUDE2;

      case THETA:
        return THETA2;

      case RADIUS:
        return RADIUS2;
    }

    return undefined;
  }
  function getSizeChannel(channel) {
    switch (channel) {
      case X:
      case X2:
        return 'width';

      case Y:
      case Y2:
        return 'height';
    }

    return undefined;
  }
  /**
   * Get the main channel for a range channel. E.g. `x` for `x2`.
   */

  function getOffsetChannel(channel) {
    switch (channel) {
      case X:
        return 'xOffset';

      case Y:
        return 'yOffset';

      case X2:
        return 'x2Offset';

      case Y2:
        return 'y2Offset';

      case THETA:
        return 'thetaOffset';

      case RADIUS:
        return 'radiusOffset';

      case THETA2:
        return 'theta2Offset';

      case RADIUS2:
        return 'radius2Offset';
    }

    return undefined;
  }
  /**
   * Get the main channel for a range channel. E.g. `x` for `x2`.
   */

  function getOffsetScaleChannel(channel) {
    switch (channel) {
      case X:
        return 'xOffset';

      case Y:
        return 'yOffset';
    }

    return undefined;
  }
  function getMainChannelFromOffsetChannel(channel) {
    switch (channel) {
      case 'xOffset':
        return 'x';

      case 'yOffset':
        return 'y';
    }
  } // CHANNELS without COLUMN, ROW

  const UNIT_CHANNELS = keys(UNIT_CHANNEL_INDEX); // NONPOSITION_CHANNELS = UNIT_CHANNELS without X, Y, X2, Y2;

  const {
    x: _x,
    y: _y,
    // x2 and y2 share the same scale as x and y
    x2: _x2,
    y2: _y2,
    //
    xOffset: _xo,
    yOffset: _yo,
    latitude: _latitude,
    longitude: _longitude,
    latitude2: _latitude2,
    longitude2: _longitude2,
    theta: _theta,
    theta2: _theta2,
    radius: _radius,
    radius2: _radius2,
    // The rest of unit channels then have scale
    ...NONPOSITION_CHANNEL_INDEX
  } = UNIT_CHANNEL_INDEX;
  const NONPOSITION_CHANNELS = keys(NONPOSITION_CHANNEL_INDEX);
  const POSITION_SCALE_CHANNEL_INDEX = {
    x: 1,
    y: 1
  };
  const POSITION_SCALE_CHANNELS = keys(POSITION_SCALE_CHANNEL_INDEX);
  function isXorY(channel) {
    return channel in POSITION_SCALE_CHANNEL_INDEX;
  }
  const POLAR_POSITION_SCALE_CHANNEL_INDEX = {
    theta: 1,
    radius: 1
  };
  const POLAR_POSITION_SCALE_CHANNELS = keys(POLAR_POSITION_SCALE_CHANNEL_INDEX);
  function getPositionScaleChannel(sizeType) {
    return sizeType === 'width' ? X : Y;
  }
  const OFFSET_SCALE_CHANNEL_INDEX = {
    xOffset: 1,
    yOffset: 1
  };
  function isXorYOffset(channel) {
    return channel in OFFSET_SCALE_CHANNEL_INDEX;
  } // NON_POSITION_SCALE_CHANNEL = SCALE_CHANNELS without position / offset

  const {
    // x2 and y2 share the same scale as x and y
    // text and tooltip have format instead of scale,
    // href has neither format, nor scale
    text: _t,
    tooltip: _tt,
    href: _hr,
    url: _u,
    description: _al,
    // detail and order have no scale
    detail: _dd,
    key: _k,
    order: _oo,
    ...NONPOSITION_SCALE_CHANNEL_INDEX
  } = NONPOSITION_CHANNEL_INDEX;
  const NONPOSITION_SCALE_CHANNELS = keys(NONPOSITION_SCALE_CHANNEL_INDEX);
  function isNonPositionScaleChannel(channel) {
    return !!NONPOSITION_CHANNEL_INDEX[channel];
  }
  /**
   * @returns whether Vega supports legends for a particular channel
   */

  function supportLegend(channel) {
    switch (channel) {
      case COLOR:
      case FILL:
      case STROKE:
      case SIZE:
      case SHAPE:
      case OPACITY:
      case STROKEWIDTH:
      case STROKEDASH:
        return true;

      case FILLOPACITY:
      case STROKEOPACITY:
      case ANGLE:
        return false;
    }
  } // Declare SCALE_CHANNEL_INDEX

  const SCALE_CHANNEL_INDEX = { ...POSITION_SCALE_CHANNEL_INDEX,
    ...POLAR_POSITION_SCALE_CHANNEL_INDEX,
    ...OFFSET_SCALE_CHANNEL_INDEX,
    ...NONPOSITION_SCALE_CHANNEL_INDEX
  };
  /** List of channels with scales */

  const SCALE_CHANNELS = keys(SCALE_CHANNEL_INDEX);
  function isScaleChannel(channel) {
    return !!SCALE_CHANNEL_INDEX[channel];
  }

  /**
   * Return whether a channel supports a particular mark type.
   * @param channel  channel name
   * @param mark the mark type
   * @return whether the mark supports the channel
   */
  function supportMark(channel, mark) {
    return getSupportedMark(channel)[mark];
  }
  const ALL_MARKS = {
    // all marks
    arc: 'always',
    area: 'always',
    bar: 'always',
    circle: 'always',
    geoshape: 'always',
    image: 'always',
    line: 'always',
    rule: 'always',
    point: 'always',
    rect: 'always',
    square: 'always',
    trail: 'always',
    text: 'always',
    tick: 'always'
  };
  const {
    geoshape: _g,
    ...ALL_MARKS_EXCEPT_GEOSHAPE
  } = ALL_MARKS;
  /**
   * Return a dictionary showing whether a channel supports mark type.
   * @param channel
   * @return A dictionary mapping mark types to 'always', 'binned', or undefined
   */

  function getSupportedMark(channel) {
    switch (channel) {
      case COLOR:
      case FILL:
      case STROKE: // falls through

      case DESCRIPTION:
      case DETAIL:
      case KEY:
      case TOOLTIP:
      case HREF:
      case ORDER: // TODO: revise (order might not support rect, which is not stackable?)

      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
      case STROKEWIDTH: // falls through

      case FACET:
      case ROW: // falls through

      case COLUMN:
        return ALL_MARKS;

      case X:
      case Y:
      case XOFFSET:
      case YOFFSET:
      case LATITUDE:
      case LONGITUDE:
        // all marks except geoshape. geoshape does not use X, Y -- it uses a projection
        return ALL_MARKS_EXCEPT_GEOSHAPE;

      case X2:
      case Y2:
      case LATITUDE2:
      case LONGITUDE2:
        return {
          area: 'always',
          bar: 'always',
          image: 'always',
          rect: 'always',
          rule: 'always',
          circle: 'binned',
          point: 'binned',
          square: 'binned',
          tick: 'binned',
          line: 'binned',
          trail: 'binned'
        };

      case SIZE:
        return {
          point: 'always',
          tick: 'always',
          rule: 'always',
          circle: 'always',
          square: 'always',
          bar: 'always',
          text: 'always',
          line: 'always',
          trail: 'always'
        };

      case STROKEDASH:
        return {
          line: 'always',
          point: 'always',
          tick: 'always',
          rule: 'always',
          circle: 'always',
          square: 'always',
          bar: 'always',
          geoshape: 'always'
        };

      case SHAPE:
        return {
          point: 'always',
          geoshape: 'always'
        };

      case TEXT$1:
        return {
          text: 'always'
        };

      case ANGLE:
        return {
          point: 'always',
          square: 'always',
          text: 'always'
        };

      case URL:
        return {
          image: 'always'
        };

      case THETA:
        return {
          text: 'always',
          arc: 'always'
        };

      case RADIUS:
        return {
          text: 'always',
          arc: 'always'
        };

      case THETA2:
      case RADIUS2:
        return {
          arc: 'always'
        };
    }
  }

  function rangeType(channel) {
    switch (channel) {
      case X:
      case Y:
      case THETA:
      case RADIUS:
      case XOFFSET:
      case YOFFSET:
      case SIZE:
      case ANGLE:
      case STROKEWIDTH:
      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY: // X2 and Y2 use X and Y scales, so they similarly have continuous range. [falls through]

      case X2:
      case Y2:
      case THETA2:
      case RADIUS2:
        return undefined;

      case FACET:
      case ROW:
      case COLUMN:
      case SHAPE:
      case STROKEDASH: // TEXT, TOOLTIP, URL, and HREF have no scale but have discrete output [falls through]

      case TEXT$1:
      case TOOLTIP:
      case HREF:
      case URL:
      case DESCRIPTION:
        return 'discrete';
      // Color can be either continuous or discrete, depending on scale type.

      case COLOR:
      case FILL:
      case STROKE:
        return 'flexible';
      // No scale, no range type.

      case LATITUDE:
      case LONGITUDE:
      case LATITUDE2:
      case LONGITUDE2:
      case DETAIL:
      case KEY:
      case ORDER:
        return undefined;
    }
  }

  const AGGREGATE_OP_INDEX = {
    argmax: 1,
    argmin: 1,
    average: 1,
    count: 1,
    distinct: 1,
    product: 1,
    max: 1,
    mean: 1,
    median: 1,
    min: 1,
    missing: 1,
    q1: 1,
    q3: 1,
    ci0: 1,
    ci1: 1,
    stderr: 1,
    stdev: 1,
    stdevp: 1,
    sum: 1,
    valid: 1,
    values: 1,
    variance: 1,
    variancep: 1
  };
  const MULTIDOMAIN_SORT_OP_INDEX = {
    count: 1,
    min: 1,
    max: 1
  };
  function isArgminDef(a) {
    return !!a && !!a['argmin'];
  }
  function isArgmaxDef(a) {
    return !!a && !!a['argmax'];
  }
  function isAggregateOp(a) {
    return vega.isString(a) && !!AGGREGATE_OP_INDEX[a];
  }
  const COUNTING_OPS = new Set(['count', 'valid', 'missing', 'distinct']);
  function isCountingAggregateOp(aggregate) {
    return vega.isString(aggregate) && COUNTING_OPS.has(aggregate);
  }
  function isMinMaxOp(aggregate) {
    return vega.isString(aggregate) && contains(['min', 'max'], aggregate);
  }
  /** Additive-based aggregation operations. These can be applied to stack. */

  const SUM_OPS = new Set(['count', 'sum', 'distinct', 'valid', 'missing']);
  /**
   * Aggregation operators that always produce values within the range [domainMin, domainMax].
   */

  const SHARED_DOMAIN_OPS = new Set(['mean', 'average', 'median', 'q1', 'q3', 'min', 'max']);

  /**
   * Create a key for the bin configuration. Not for prebinned bin.
   */
  function binToString(bin) {
    if (vega.isBoolean(bin)) {
      bin = normalizeBin(bin, undefined);
    }

    return 'bin' + keys(bin).map(p => isParameterExtent(bin[p]) ? varName("_".concat(p, "_").concat(entries$1(bin[p]))) : varName("_".concat(p, "_").concat(bin[p]))).join('');
  }
  /**
   * Vega-Lite should bin the data.
   */

  function isBinning(bin) {
    return bin === true || isBinParams(bin) && !bin.binned;
  }
  /**
   * The data is already binned and so Vega-Lite should not bin it again.
   */

  function isBinned(bin) {
    return bin === 'binned' || isBinParams(bin) && bin.binned === true;
  }
  function isBinParams(bin) {
    return vega.isObject(bin);
  }
  function isParameterExtent(extent) {
    return extent === null || extent === void 0 ? void 0 : extent['param'];
  }
  function autoMaxBins(channel) {
    switch (channel) {
      case ROW:
      case COLUMN:
      case SIZE:
      case COLOR:
      case FILL:
      case STROKE:
      case STROKEWIDTH:
      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY: // Facets and Size shouldn't have too many bins
      // We choose 6 like shape to simplify the rule [falls through]

      case SHAPE:
        return 6;
      // Vega's "shape" has 6 distinct values

      case STROKEDASH:
        return 4;
      // We only provide 5 different stroke dash values (but 4 is more effective)

      default:
        return 10;
    }
  }

  function isExprRef(o) {
    return o && !!o['expr'];
  }
  function replaceExprRef(index) {
    const props = keys(index || {});
    const newIndex = {};

    for (const prop of props) {
      newIndex[prop] = signalRefOrValue(index[prop]);
    }

    return newIndex;
  }

  function extractTitleConfig(titleConfig) {
    const {
      // These are non-mark title config that need to be hardcoded
      anchor,
      frame,
      offset,
      orient,
      angle,
      limit,
      // color needs to be redirect to fill
      color,
      // subtitle properties
      subtitleColor,
      subtitleFont,
      subtitleFontSize,
      subtitleFontStyle,
      subtitleFontWeight,
      subtitleLineHeight,
      subtitlePadding,
      // The rest are mark config.
      ...rest
    } = titleConfig;
    const titleMarkConfig = { ...rest,
      ...(color ? {
        fill: color
      } : {})
    }; // These are non-mark title config that need to be hardcoded

    const nonMarkTitleProperties = { ...(anchor ? {
        anchor
      } : {}),
      ...(frame ? {
        frame
      } : {}),
      ...(offset ? {
        offset
      } : {}),
      ...(orient ? {
        orient
      } : {}),
      ...(angle !== undefined ? {
        angle
      } : {}),
      ...(limit !== undefined ? {
        limit
      } : {})
    }; // subtitle part can stay in config.title since header titles do not use subtitle

    const subtitle = { ...(subtitleColor ? {
        subtitleColor
      } : {}),
      ...(subtitleFont ? {
        subtitleFont
      } : {}),
      ...(subtitleFontSize ? {
        subtitleFontSize
      } : {}),
      ...(subtitleFontStyle ? {
        subtitleFontStyle
      } : {}),
      ...(subtitleFontWeight ? {
        subtitleFontWeight
      } : {}),
      ...(subtitleLineHeight ? {
        subtitleLineHeight
      } : {}),
      ...(subtitlePadding ? {
        subtitlePadding
      } : {})
    };
    const subtitleMarkConfig = pick(titleConfig, ['align', 'baseline', 'dx', 'dy', 'limit']);
    return {
      titleMarkConfig,
      subtitleMarkConfig,
      nonMarkTitleProperties,
      subtitle
    };
  }
  function isText(v) {
    return vega.isString(v) || vega.isArray(v) && vega.isString(v[0]);
  }

  function isSignalRef(o) {
    return o && !!o['signal'];
  } // TODO: add type of value (Make it VgValueRef<V extends ValueOrGradient> {value?:V ...})

  function isVgRangeStep(range) {
    return !!range['step'];
  }
  function isDataRefUnionedDomain(domain) {
    if (!vega.isArray(domain)) {
      return 'fields' in domain && !('data' in domain);
    }

    return false;
  }
  function isFieldRefUnionDomain(domain) {
    if (!vega.isArray(domain)) {
      return 'fields' in domain && 'data' in domain;
    }

    return false;
  }
  function isDataRefDomain(domain) {
    if (!vega.isArray(domain)) {
      return 'field' in domain && 'data' in domain;
    }

    return false;
  }
  const VG_MARK_CONFIG_INDEX = {
    aria: 1,
    description: 1,
    ariaRole: 1,
    ariaRoleDescription: 1,
    blend: 1,
    opacity: 1,
    fill: 1,
    fillOpacity: 1,
    stroke: 1,
    strokeCap: 1,
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeDash: 1,
    strokeDashOffset: 1,
    strokeJoin: 1,
    strokeOffset: 1,
    strokeMiterLimit: 1,
    startAngle: 1,
    endAngle: 1,
    padAngle: 1,
    innerRadius: 1,
    outerRadius: 1,
    size: 1,
    shape: 1,
    interpolate: 1,
    tension: 1,
    orient: 1,
    align: 1,
    baseline: 1,
    text: 1,
    dir: 1,
    dx: 1,
    dy: 1,
    ellipsis: 1,
    limit: 1,
    radius: 1,
    theta: 1,
    angle: 1,
    font: 1,
    fontSize: 1,
    fontWeight: 1,
    fontStyle: 1,
    lineBreak: 1,
    lineHeight: 1,
    cursor: 1,
    href: 1,
    tooltip: 1,
    cornerRadius: 1,
    cornerRadiusTopLeft: 1,
    cornerRadiusTopRight: 1,
    cornerRadiusBottomLeft: 1,
    cornerRadiusBottomRight: 1,
    aspect: 1,
    width: 1,
    height: 1,
    url: 1,
    smooth: 1 // commented below are vg channel that do not have mark config.
    // x: 1,
    // y: 1,
    // x2: 1,
    // y2: 1,
    // xc'|'yc'
    // clip: 1,
    // path: 1,
    // url: 1,

  };
  const VG_MARK_CONFIGS = keys(VG_MARK_CONFIG_INDEX);
  const VG_MARK_INDEX = {
    arc: 1,
    area: 1,
    group: 1,
    image: 1,
    line: 1,
    path: 1,
    rect: 1,
    rule: 1,
    shape: 1,
    symbol: 1,
    text: 1,
    trail: 1
  }; // Vega's cornerRadius channels.

  const VG_CORNERRADIUS_CHANNELS = ['cornerRadius', 'cornerRadiusTopLeft', 'cornerRadiusTopRight', 'cornerRadiusBottomLeft', 'cornerRadiusBottomRight'];

  function signalOrValueRefWithCondition(val) {
    const condition = vega.isArray(val.condition) ? val.condition.map(conditionalSignalRefOrValue) : conditionalSignalRefOrValue(val.condition);
    return { ...signalRefOrValue(val),
      condition
    };
  }
  function signalRefOrValue(value) {
    if (isExprRef(value)) {
      const {
        expr,
        ...rest
      } = value;
      return {
        signal: expr,
        ...rest
      };
    }

    return value;
  }
  function conditionalSignalRefOrValue(value) {
    if (isExprRef(value)) {
      const {
        expr,
        ...rest
      } = value;
      return {
        signal: expr,
        ...rest
      };
    }

    return value;
  }
  function signalOrValueRef(value) {
    if (isExprRef(value)) {
      const {
        expr,
        ...rest
      } = value;
      return {
        signal: expr,
        ...rest
      };
    }

    if (isSignalRef(value)) {
      return value;
    }

    return value !== undefined ? {
      value
    } : undefined;
  }
  function exprFromSignalRefOrValue(ref) {
    if (isSignalRef(ref)) {
      return ref.signal;
    }

    return vega.stringValue(ref);
  }
  function exprFromValueRefOrSignalRef(ref) {
    if (isSignalRef(ref)) {
      return ref.signal;
    }

    return vega.stringValue(ref.value);
  }
  function signalOrStringValue(v) {
    if (isSignalRef(v)) {
      return v.signal;
    }

    return v == null ? null : vega.stringValue(v);
  }
  function applyMarkConfig(e, model, propsList) {
    for (const property of propsList) {
      const value = getMarkConfig(property, model.markDef, model.config);

      if (value !== undefined) {
        e[property] = signalOrValueRef(value);
      }
    }

    return e;
  }
  function getStyles(mark) {
    var _mark$style;

    return [].concat(mark.type, (_mark$style = mark.style) !== null && _mark$style !== void 0 ? _mark$style : []);
  }
  function getMarkPropOrConfig(channel, mark, config) {
    let opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const {
      vgChannel,
      ignoreVgConfig
    } = opt;

    if (vgChannel && mark[vgChannel] !== undefined) {
      return mark[vgChannel];
    } else if (mark[channel] !== undefined) {
      return mark[channel];
    } else if (ignoreVgConfig && (!vgChannel || vgChannel === channel)) {
      return undefined;
    }

    return getMarkConfig(channel, mark, config, opt);
  }
  /**
   * Return property value from style or mark specific config property if exists.
   * Otherwise, return general mark specific config.
   */

  function getMarkConfig(channel, mark, config) {
    let {
      vgChannel
    } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return getFirstDefined( // style config has highest precedence
    vgChannel ? getMarkStyleConfig(channel, mark, config.style) : undefined, getMarkStyleConfig(channel, mark, config.style), // then mark-specific config
    vgChannel ? config[mark.type][vgChannel] : undefined, config[mark.type][channel], // Need to cast because MarkDef doesn't perfectly match with AnyMarkConfig, but if the type isn't available, we'll get nothing here, which is fine
    // If there is vgChannel, skip vl channel.
    // For example, vl size for text is vg fontSize, but config.mark.size is only for point size.
    vgChannel ? config.mark[vgChannel] : config.mark[channel] // Need to cast for the same reason as above
    );
  }
  function getMarkStyleConfig(prop, mark, styleConfigIndex) {
    return getStyleConfig(prop, getStyles(mark), styleConfigIndex);
  }
  function getStyleConfig(p, styles, styleConfigIndex) {
    styles = vega.array(styles);
    let value;

    for (const style of styles) {
      const styleConfig = styleConfigIndex[style];

      if (styleConfig && styleConfig[p] !== undefined) {
        value = styleConfig[p];
      }
    }

    return value;
  }
  /**
   * Return Vega sort parameters (tuple of field and order).
   */

  function sortParams(orderDef, fieldRefOption) {
    return vega.array(orderDef).reduce((s, orderChannelDef) => {
      var _orderChannelDef$sort;

      s.field.push(vgField(orderChannelDef, fieldRefOption));
      s.order.push((_orderChannelDef$sort = orderChannelDef.sort) !== null && _orderChannelDef$sort !== void 0 ? _orderChannelDef$sort : 'ascending');
      return s;
    }, {
      field: [],
      order: []
    });
  }
  function mergeTitleFieldDefs(f1, f2) {
    const merged = [...f1];
    f2.forEach(fdToMerge => {
      for (const fieldDef1 of merged) {
        // If already exists, no need to append to merged array
        if (deepEqual(fieldDef1, fdToMerge)) {
          return;
        }
      }

      merged.push(fdToMerge);
    });
    return merged;
  }
  function mergeTitle(title1, title2) {
    if (deepEqual(title1, title2) || !title2) {
      // if titles are the same or title2 is falsy
      return title1;
    } else if (!title1) {
      // if title1 is falsy
      return title2;
    } else {
      return [...vega.array(title1), ...vega.array(title2)].join(', ');
    }
  }
  function mergeTitleComponent(v1, v2) {
    const v1Val = v1.value;
    const v2Val = v2.value;

    if (v1Val == null || v2Val === null) {
      return {
        explicit: v1.explicit,
        value: null
      };
    } else if ((isText(v1Val) || isSignalRef(v1Val)) && (isText(v2Val) || isSignalRef(v2Val))) {
      return {
        explicit: v1.explicit,
        value: mergeTitle(v1Val, v2Val)
      };
    } else if (isText(v1Val) || isSignalRef(v1Val)) {
      return {
        explicit: v1.explicit,
        value: v1Val
      };
    } else if (isText(v2Val) || isSignalRef(v2Val)) {
      return {
        explicit: v1.explicit,
        value: v2Val
      };
    } else if (!isText(v1Val) && !isSignalRef(v1Val) && !isText(v2Val) && !isSignalRef(v2Val)) {
      return {
        explicit: v1.explicit,
        value: mergeTitleFieldDefs(v1Val, v2Val)
      };
    }
    /* istanbul ignore next: Condition should not happen -- only for warning in development. */


    throw new Error('It should never reach here');
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }

  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);

    privateMap.set(obj, value);
  }

  /**
   * Collection of all Vega-Lite Error Messages
   */
  function invalidSpec(spec) {
    return "Invalid specification ".concat(stringify(spec), ". Make sure the specification includes at least one of the following properties: \"mark\", \"layer\", \"facet\", \"hconcat\", \"vconcat\", \"concat\", or \"repeat\".");
  } // FIT

  const FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
  function containerSizeNonSingle(name) {
    const uName = name == 'width' ? 'Width' : 'Height';
    return "".concat(uName, " \"container\" only works for single views and layered views.");
  }
  function containerSizeNotCompatibleWithAutosize(name) {
    const uName = name == 'width' ? 'Width' : 'Height';
    const fitDirection = name == 'width' ? 'x' : 'y';
    return "".concat(uName, " \"container\" only works well with autosize \"fit\" or \"fit-").concat(fitDirection, "\".");
  }
  function droppingFit(channel) {
    return channel ? "Dropping \"fit-".concat(channel, "\" because spec has discrete ").concat(getSizeChannel(channel), ".") : "Dropping \"fit\" because spec has discrete size.";
  } // VIEW SIZE

  function unknownField(channel) {
    return "Unknown field for ".concat(channel, ". Cannot calculate view size.");
  } // SELECTION

  function cannotProjectOnChannelWithoutField(channel) {
    return "Cannot project a selection on encoding channel \"".concat(channel, "\", which has no field.");
  }
  function cannotProjectAggregate(channel, aggregate) {
    return "Cannot project a selection on encoding channel \"".concat(channel, "\" as it uses an aggregate function (\"").concat(aggregate, "\").");
  }
  function nearestNotSupportForContinuous(mark) {
    return "The \"nearest\" transform is not supported for ".concat(mark, " marks.");
  }
  function selectionNotSupported(mark) {
    return "Selection not supported for ".concat(mark, " yet.");
  }
  function selectionNotFound(name) {
    return "Cannot find a selection named \"".concat(name, "\".");
  }
  const SCALE_BINDINGS_CONTINUOUS = 'Scale bindings are currently only supported for scales with unbinned, continuous domains.';
  const LEGEND_BINDINGS_MUST_HAVE_PROJECTION = 'Legend bindings are only supported for selections over an individual field or encoding channel.';
  function cannotLookupVariableParameter(name) {
    return "Lookups can only be performed on selection parameters. \"".concat(name, "\" is a variable parameter.");
  }
  function noSameUnitLookup(name) {
    return "Cannot define and lookup the \"".concat(name, "\" selection in the same view. ") + "Try moving the lookup into a second, layered view?";
  }
  const NEEDS_SAME_SELECTION = 'The same selection must be used to override scale domains in a layered view.';
  const INTERVAL_INITIALIZED_WITH_X_Y = 'Interval selections should be initialized using "x" and/or "y" keys.'; // REPEAT

  function noSuchRepeatedValue(field) {
    return "Unknown repeated value \"".concat(field, "\".");
  }
  function columnsNotSupportByRowCol(type) {
    return "The \"columns\" property cannot be used when \"".concat(type, "\" has nested row/column.");
  } // CONCAT / REPEAT

  const CONCAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in concatenated or repeated views yet (https://github.com/vega/vega-lite/issues/2415).'; // DATA

  function unrecognizedParse(p) {
    return "Unrecognized parse \"".concat(p, "\".");
  }
  function differentParse(field, local, ancestor) {
    return "An ancestor parsed field \"".concat(field, "\" as ").concat(ancestor, " but a child wants to parse the field as ").concat(local, ".");
  }
  const ADD_SAME_CHILD_TWICE = 'Attempt to add the same child twice.'; // TRANSFORMS

  function invalidTransformIgnored(transform) {
    return "Ignoring an invalid transform: ".concat(stringify(transform), ".");
  }
  const NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.'; // ENCODING & FACET

  function customFormatTypeNotAllowed(channel) {
    return "Config.customFormatTypes is not true, thus custom format type and format for channel ".concat(channel, " are dropped.");
  }
  function projectionOverridden(opt) {
    const {
      parentProjection,
      projection
    } = opt;
    return "Layer's shared projection ".concat(stringify(parentProjection), " is overridden by a child projection ").concat(stringify(projection), ".");
  }
  const REPLACE_ANGLE_WITH_THETA = 'Arc marks uses theta channel rather than angle, replacing angle with theta.';
  function offsetNestedInsideContinuousPositionScaleDropped(mainChannel) {
    return "".concat(mainChannel, "Offset dropped because ").concat(mainChannel, " is continuous");
  }
  function replaceOffsetWithMainChannel(mainChannel) {
    return "There is no ".concat(mainChannel, " encoding. Replacing ").concat(mainChannel, "Offset encoding as ").concat(mainChannel, ".");
  }
  function primitiveChannelDef(channel, type, value) {
    return "Channel ".concat(channel, " is a ").concat(type, ". Converted to {value: ").concat(stringify(value), "}.");
  }
  function invalidFieldType(type) {
    return "Invalid field type \"".concat(type, "\".");
  }
  function invalidFieldTypeForCountAggregate(type, aggregate) {
    return "Invalid field type \"".concat(type, "\" for aggregate: \"").concat(aggregate, "\", using \"quantitative\" instead.");
  }
  function invalidAggregate(aggregate) {
    return "Invalid aggregation operator \"".concat(aggregate, "\".");
  }
  function droppingColor(type, opt) {
    const {
      fill,
      stroke
    } = opt;
    return "Dropping color ".concat(type, " as the plot also has ").concat(fill && stroke ? 'fill and stroke' : fill ? 'fill' : 'stroke', ".");
  }
  function relativeBandSizeNotSupported(sizeChannel) {
    return "Position range does not support relative band size for ".concat(sizeChannel, ".");
  }
  function emptyFieldDef(fieldDef, channel) {
    return "Dropping ".concat(stringify(fieldDef), " from channel \"").concat(channel, "\" since it does not contain any data field, datum, value, or signal.");
  }
  const LINE_WITH_VARYING_SIZE = 'Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.';
  function incompatibleChannel(channel, markOrFacet, when) {
    return "".concat(channel, " dropped as it is incompatible with \"").concat(markOrFacet, "\"").concat(when ? " when ".concat(when) : '', ".");
  }
  function offsetEncodingScaleIgnored(channel) {
    return "".concat(channel, " encoding has no scale, so specified scale is ignored.");
  }
  function invalidEncodingChannel(channel) {
    return "".concat(channel, "-encoding is dropped as ").concat(channel, " is not a valid encoding channel.");
  }
  function channelShouldBeDiscrete(channel) {
    return "".concat(channel, " encoding should be discrete (ordinal / nominal / binned).");
  }
  function channelShouldBeDiscreteOrDiscretizing(channel) {
    return "".concat(channel, " encoding should be discrete (ordinal / nominal / binned) or use a discretizing scale (e.g. threshold).");
  }
  function facetChannelDropped(channels) {
    return "Facet encoding dropped as ".concat(channels.join(' and '), " ").concat(channels.length > 1 ? 'are' : 'is', " also specified.");
  }
  function discreteChannelCannotEncode(channel, type) {
    return "Using discrete channel \"".concat(channel, "\" to encode \"").concat(type, "\" field can be misleading as it does not encode ").concat(type === 'ordinal' ? 'order' : 'magnitude', ".");
  } // MARK

  function rangeMarkAlignmentCannotBeExpression(align) {
    return "The ".concat(align, " for range marks cannot be an expression");
  }
  function lineWithRange(hasX2, hasY2) {
    const channels = hasX2 && hasY2 ? 'x2 and y2' : hasX2 ? 'x2' : 'y2';
    return "Line mark is for continuous lines and thus cannot be used with ".concat(channels, ". We will use the rule mark (line segments) instead.");
  }
  function orientOverridden(original, actual) {
    return "Specified orient \"".concat(original, "\" overridden with \"").concat(actual, "\".");
  } // SCALE
  function cannotUseScalePropertyWithNonColor(prop) {
    return "Cannot use the scale property \"".concat(prop, "\" with non-color channel.");
  }
  function cannotUseRelativeBandSizeWithNonBandScale(scaleType) {
    return "Cannot use the relative band size with ".concat(scaleType, " scale.");
  }
  function unaggregateDomainHasNoEffectForRawField(fieldDef) {
    return "Using unaggregated domain with raw field has no effect (".concat(stringify(fieldDef), ").");
  }
  function unaggregateDomainWithNonSharedDomainOp(aggregate) {
    return "Unaggregated domain not applicable for \"".concat(aggregate, "\" since it produces values outside the origin domain of the source data.");
  }
  function unaggregatedDomainWithLogScale(fieldDef) {
    return "Unaggregated domain is currently unsupported for log scale (".concat(stringify(fieldDef), ").");
  }
  function cannotApplySizeToNonOrientedMark(mark) {
    return "Cannot apply size to non-oriented mark \"".concat(mark, "\".");
  }
  function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
    return "Channel \"".concat(channel, "\" does not work with \"").concat(scaleType, "\" scale. We are using \"").concat(defaultScaleType, "\" scale instead.");
  }
  function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
    return "FieldDef does not work with \"".concat(scaleType, "\" scale. We are using \"").concat(defaultScaleType, "\" scale instead.");
  }
  function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
    return "".concat(channel, "-scale's \"").concat(propName, "\" is dropped as it does not work with ").concat(scaleType, " scale.");
  }
  function stepDropped(channel) {
    return "The step for \"".concat(channel, "\" is dropped because the ").concat(channel === 'width' ? 'x' : 'y', " is continuous.");
  }
  function mergeConflictingProperty(property, propertyOf, v1, v2) {
    return "Conflicting ".concat(propertyOf.toString(), " property \"").concat(property.toString(), "\" (").concat(stringify(v1), " and ").concat(stringify(v2), "). Using ").concat(stringify(v1), ".");
  }
  function mergeConflictingDomainProperty(property, propertyOf, v1, v2) {
    return "Conflicting ".concat(propertyOf.toString(), " property \"").concat(property.toString(), "\" (").concat(stringify(v1), " and ").concat(stringify(v2), "). Using the union of the two domains.");
  }
  function independentScaleMeansIndependentGuide(channel) {
    return "Setting the scale to be independent for \"".concat(channel, "\" means we also have to set the guide (axis or legend) to be independent.");
  }
  function domainSortDropped(sort) {
    return "Dropping sort property ".concat(stringify(sort), " as unioned domains only support boolean or op \"count\", \"min\", and \"max\".");
  }
  const MORE_THAN_ONE_SORT = 'Domains that should be unioned has conflicting sort properties. Sort will be set to true.';
  const FACETED_INDEPENDENT_DIFFERENT_SOURCES = 'Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect.';
  const FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES = 'Detected faceted independent scales that union domain of the same fields from different source. We will assume that this is the same field from a different fork of the same data source. However, if this is not the case, the result view size may be incorrect.';
  const FACETED_INDEPENDENT_SAME_SOURCE = 'Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.'; // AXIS

  function cannotStackRangedMark(channel) {
    return "Cannot stack \"".concat(channel, "\" if there is already \"").concat(channel, "2\".");
  }
  function cannotStackNonLinearScale(scaleType) {
    return "Cannot stack non-linear scale (".concat(scaleType, ").");
  }
  function stackNonSummativeAggregate(aggregate) {
    return "Stacking is applied even though the aggregate function is non-summative (\"".concat(aggregate, "\").");
  } // TIMEUNIT

  function invalidTimeUnit(unitName, value) {
    return "Invalid ".concat(unitName, ": ").concat(stringify(value), ".");
  }
  function droppedDay(d) {
    return "Dropping day from datetime ".concat(stringify(d), " as day cannot be combined with other units.");
  }
  function errorBarCenterAndExtentAreNotNeeded(center, extent) {
    return "".concat(extent ? 'extent ' : '').concat(extent && center ? 'and ' : '').concat(center ? 'center ' : '').concat(extent && center ? 'are ' : 'is ', "not needed when data are aggregated.");
  }
  function errorBarCenterIsUsedWithWrongExtent(center, extent, mark) {
    return "".concat(center, " is not usually used with ").concat(extent, " for ").concat(mark, ".");
  }
  function errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark) {
    return "Continuous axis should not have customized aggregation function ".concat(aggregate, "; ").concat(compositeMark, " already agregates the axis.");
  }
  function errorBand1DNotSupport(property) {
    return "1D error band does not support ".concat(property, ".");
  } // CHANNEL

  function channelRequiredForBinned(channel) {
    return "Channel ".concat(channel, " is required for \"binned\" bin.");
  }
  function channelShouldNotBeUsedForBinned(channel) {
    return "Channel ".concat(channel, " should not be used with \"binned\" bin.");
  }
  function domainRequiredForThresholdScale(channel) {
    return "Domain for ".concat(channel, " is required for threshold scale.");
  }

  /**
   * Main (default) Vega Logger instance for Vega-Lite.
   */

  const main = vega.logger(vega.Warn);
  let current = main;
  /**
   * Set the singleton logger to be a custom logger.
   */

  function set(newLogger) {
    current = newLogger;
    return current;
  }
  /**
   * Reset the main logger to use the default Vega Logger.
   */

  function reset() {
    current = main;
    return current;
  }
  function warn() {
    current.warn(...arguments);
  }
  function debug() {
    current.debug(...arguments);
  }

  // DateTime definition object
  /**
   * @minimum 1
   * @maximum 12
   * @TJS-type integer
   */

  function isDateTime(o) {
    if (o && vega.isObject(o)) {
      for (const part of TIMEUNIT_PARTS) {
        if (part in o) {
          return true;
        }
      }
    }

    return false;
  }
  const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const SHORT_MONTHS = MONTHS.map(m => m.substr(0, 3));
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const SHORT_DAYS = DAYS.map(d => d.substr(0, 3));

  function normalizeQuarter(q) {
    if (isNumeric(q)) {
      q = +q;
    }

    if (vega.isNumber(q)) {
      if (q > 4) {
        warn(invalidTimeUnit('quarter', q));
      } // We accept 1-based quarter, so need to readjust to 0-based quarter


      return q - 1;
    } else {
      // Invalid quarter
      throw new Error(invalidTimeUnit('quarter', q));
    }
  }

  function normalizeMonth(m) {
    if (isNumeric(m)) {
      m = +m;
    }

    if (vega.isNumber(m)) {
      // We accept 1-based month, so need to readjust to 0-based month
      return m - 1;
    } else {
      const lowerM = m.toLowerCase();
      const monthIndex = MONTHS.indexOf(lowerM);

      if (monthIndex !== -1) {
        return monthIndex; // 0 for january, ...
      }

      const shortM = lowerM.substr(0, 3);
      const shortMonthIndex = SHORT_MONTHS.indexOf(shortM);

      if (shortMonthIndex !== -1) {
        return shortMonthIndex;
      } // Invalid month


      throw new Error(invalidTimeUnit('month', m));
    }
  }

  function normalizeDay(d) {
    if (isNumeric(d)) {
      d = +d;
    }

    if (vega.isNumber(d)) {
      // mod so that this can be both 0-based where 0 = sunday
      // and 1-based where 7=sunday
      return d % 7;
    } else {
      const lowerD = d.toLowerCase();
      const dayIndex = DAYS.indexOf(lowerD);

      if (dayIndex !== -1) {
        return dayIndex; // 0 for january, ...
      }

      const shortD = lowerD.substr(0, 3);
      const shortDayIndex = SHORT_DAYS.indexOf(shortD);

      if (shortDayIndex !== -1) {
        return shortDayIndex;
      } // Invalid day


      throw new Error(invalidTimeUnit('day', d));
    }
  }
  /**
   * @param d the date.
   * @param normalize whether to normalize quarter, month, day. This should probably be true if d is a DateTime.
   * @returns array of date time parts [year, month, day, hours, minutes, seconds, milliseconds]
   */


  function dateTimeParts(d, normalize) {
    const parts = [];

    if (normalize && d.day !== undefined) {
      if (keys(d).length > 1) {
        warn(droppedDay(d));
        d = duplicate(d);
        delete d.day;
      }
    }

    if (d.year !== undefined) {
      parts.push(d.year);
    } else {
      // Just like Vega's timeunit transform, set default year to 2012, so domain conversion will be compatible with Vega
      // Note: 2012 is a leap year (and so the date February 29 is respected) that begins on a Sunday (and so days of the week will order properly at the beginning of the year).
      parts.push(2012);
    }

    if (d.month !== undefined) {
      const month = normalize ? normalizeMonth(d.month) : d.month;
      parts.push(month);
    } else if (d.quarter !== undefined) {
      const quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
      parts.push(vega.isNumber(quarter) ? quarter * 3 : "".concat(quarter, "*3"));
    } else {
      parts.push(0); // months start at zero in JS
    }

    if (d.date !== undefined) {
      parts.push(d.date);
    } else if (d.day !== undefined) {
      // HACK: Day only works as a standalone unit
      // This is only correct because we always set year to 2006 for day
      const day = normalize ? normalizeDay(d.day) : d.day;
      parts.push(vega.isNumber(day) ? day + 1 : "".concat(day, "+1"));
    } else {
      parts.push(1); // Date starts at 1 in JS
    } // Note: can't use TimeUnit enum here as importing it will create
    // circular dependency problem!


    for (const timeUnit of ['hours', 'minutes', 'seconds', 'milliseconds']) {
      const unit = d[timeUnit];
      parts.push(typeof unit === 'undefined' ? 0 : unit);
    }

    return parts;
  }
  /**
   * Return Vega expression for a date time.
   *
   * @param d the date time.
   * @returns the Vega expression.
   */


  function dateTimeToExpr(d) {
    const parts = dateTimeParts(d, true);
    const string = parts.join(', ');

    if (d.utc) {
      return "utc(".concat(string, ")");
    } else {
      return "datetime(".concat(string, ")");
    }
  }
  /**
   * Return Vega expression for a date time expression.
   *
   * @param d the internal date time object with expression.
   * @returns the Vega expression.
   */

  function dateTimeExprToExpr(d) {
    const parts = dateTimeParts(d, false);
    const string = parts.join(', ');

    if (d.utc) {
      return "utc(".concat(string, ")");
    } else {
      return "datetime(".concat(string, ")");
    }
  }
  /**
   * @param d the date time.
   * @returns the timestamp.
   */

  function dateTimeToTimestamp(d) {
    const parts = dateTimeParts(d, true);

    if (d.utc) {
      return +new Date(Date.UTC(...parts));
    } else {
      return +new Date(...parts);
    }
  }

  /** Time Unit that only corresponds to only one part of Date objects. */

  const LOCAL_SINGLE_TIMEUNIT_INDEX = {
    year: 1,
    quarter: 1,
    month: 1,
    week: 1,
    day: 1,
    dayofyear: 1,
    date: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1
  };
  const TIMEUNIT_PARTS = keys(LOCAL_SINGLE_TIMEUNIT_INDEX);
  function isLocalSingleTimeUnit(timeUnit) {
    return !!LOCAL_SINGLE_TIMEUNIT_INDEX[timeUnit];
  }
  function isUTCTimeUnit(t) {
    return t.startsWith('utc');
  }
  function getLocalTimeUnit(t) {
    return t.substr(3);
  }
  // In order of increasing specificity
  const VEGALITE_TIMEFORMAT = {
    'year-month': '%b %Y ',
    'year-month-date': '%b %d, %Y '
  };
  function getTimeUnitParts(timeUnit) {
    return TIMEUNIT_PARTS.filter(part => containsTimeUnit(timeUnit, part));
  }
  /** Returns true if fullTimeUnit contains the timeUnit, false otherwise. */

  function containsTimeUnit(fullTimeUnit, timeUnit) {
    const index = fullTimeUnit.indexOf(timeUnit);

    if (index < 0) {
      return false;
    } // exclude milliseconds


    if (index > 0 && timeUnit === 'seconds' && fullTimeUnit.charAt(index - 1) === 'i') {
      return false;
    } // exclude dayofyear


    if (fullTimeUnit.length > index + 3 && timeUnit === 'day' && fullTimeUnit.charAt(index + 3) === 'o') {
      return false;
    }

    if (index > 0 && timeUnit === 'year' && fullTimeUnit.charAt(index - 1) === 'f') {
      return false;
    }

    return true;
  }
  /**
   * Returns Vega expression for a given timeUnit and fieldRef
   */

  function fieldExpr(fullTimeUnit, field) {
    let {
      end
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      end: false
    };
    const fieldRef = accessPathWithDatum(field);
    const utc = isUTCTimeUnit(fullTimeUnit) ? 'utc' : '';

    function func(timeUnit) {
      if (timeUnit === 'quarter') {
        // quarter starting at 0 (0,3,6,9).
        return "(".concat(utc, "quarter(").concat(fieldRef, ")-1)");
      } else {
        return "".concat(utc).concat(timeUnit, "(").concat(fieldRef, ")");
      }
    }

    let lastTimeUnit;
    const dateExpr = {};

    for (const part of TIMEUNIT_PARTS) {
      if (containsTimeUnit(fullTimeUnit, part)) {
        dateExpr[part] = func(part);
        lastTimeUnit = part;
      }
    }

    if (end) {
      dateExpr[lastTimeUnit] += '+1';
    }

    return dateTimeExprToExpr(dateExpr);
  }
  function timeUnitSpecifierExpression(timeUnit) {
    if (!timeUnit) {
      return undefined;
    }

    const timeUnitParts = getTimeUnitParts(timeUnit);
    return "timeUnitSpecifier(".concat(stringify(timeUnitParts), ", ").concat(stringify(VEGALITE_TIMEFORMAT), ")");
  }
  /**
   * Returns the signal expression used for axis labels for a time unit.
   */

  function formatExpression(timeUnit, field, isUTCScale) {
    if (!timeUnit) {
      return undefined;
    }

    const expr = timeUnitSpecifierExpression(timeUnit); // We only use utcFormat for utc scale
    // For utc time units, the data is already converted as a part of timeUnit transform.
    // Thus, utc time units should use timeFormat to avoid shifting the time twice.

    const utc = isUTCScale || isUTCTimeUnit(timeUnit);
    return "".concat(utc ? 'utc' : 'time', "Format(").concat(field, ", ").concat(expr, ")");
  }
  function normalizeTimeUnit(timeUnit) {
    if (!timeUnit) {
      return undefined;
    }

    let params;

    if (vega.isString(timeUnit)) {
      params = {
        unit: timeUnit
      };
    } else if (vega.isObject(timeUnit)) {
      params = { ...timeUnit,
        ...(timeUnit.unit ? {
          unit: timeUnit.unit
        } : {})
      };
    }

    if (isUTCTimeUnit(params.unit)) {
      params.utc = true;
      params.unit = getLocalTimeUnit(params.unit);
    }

    return params;
  }
  function timeUnitToString(tu) {
    const {
      utc,
      ...rest
    } = normalizeTimeUnit(tu);

    if (rest.unit) {
      return (utc ? 'utc' : '') + keys(rest).map(p => varName("".concat(p === 'unit' ? '' : "_".concat(p, "_")).concat(rest[p]))).join('');
    } else {
      // when maxbins is specified instead of units
      return (utc ? 'utc' : '') + 'timeunit' + keys(rest).map(p => varName("_".concat(p, "_").concat(rest[p]))).join('');
    }
  }

  function isSelectionPredicate(predicate) {
    return predicate === null || predicate === void 0 ? void 0 : predicate['param'];
  }
  function isFieldEqualPredicate(predicate) {
    return predicate && !!predicate.field && predicate.equal !== undefined;
  }
  function isFieldLTPredicate(predicate) {
    return predicate && !!predicate.field && predicate.lt !== undefined;
  }
  function isFieldLTEPredicate(predicate) {
    return predicate && !!predicate.field && predicate.lte !== undefined;
  }
  function isFieldGTPredicate(predicate) {
    return predicate && !!predicate.field && predicate.gt !== undefined;
  }
  function isFieldGTEPredicate(predicate) {
    return predicate && !!predicate.field && predicate.gte !== undefined;
  }
  function isFieldRangePredicate(predicate) {
    if (predicate !== null && predicate !== void 0 && predicate.field) {
      if (vega.isArray(predicate.range) && predicate.range.length === 2) {
        return true;
      } else if (isSignalRef(predicate.range)) {
        return true;
      }
    }

    return false;
  }
  function isFieldOneOfPredicate(predicate) {
    return predicate && !!predicate.field && (vega.isArray(predicate.oneOf) || vega.isArray(predicate.in)) // backward compatibility
    ;
  }
  function isFieldValidPredicate(predicate) {
    return predicate && !!predicate.field && predicate.valid !== undefined;
  }
  function isFieldPredicate(predicate) {
    return isFieldOneOfPredicate(predicate) || isFieldEqualPredicate(predicate) || isFieldRangePredicate(predicate) || isFieldLTPredicate(predicate) || isFieldGTPredicate(predicate) || isFieldLTEPredicate(predicate) || isFieldGTEPredicate(predicate);
  }

  function predicateValueExpr(v, timeUnit) {
    return valueExpr(v, {
      timeUnit,
      wrapTime: true
    });
  }

  function predicateValuesExpr(vals, timeUnit) {
    return vals.map(v => predicateValueExpr(v, timeUnit));
  } // This method is used by Voyager. Do not change its behavior without changing Voyager.


  function fieldFilterExpression(predicate) {
    var _normalizeTimeUnit;

    let useInRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const {
      field
    } = predicate;
    const timeUnit = (_normalizeTimeUnit = normalizeTimeUnit(predicate.timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit;
    const fieldExpr$1 = timeUnit ? // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
    // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
    // TODO: support utc
    "time(".concat(fieldExpr(timeUnit, field), ")") : vgField(predicate, {
      expr: 'datum'
    });

    if (isFieldEqualPredicate(predicate)) {
      return "".concat(fieldExpr$1, "===").concat(predicateValueExpr(predicate.equal, timeUnit));
    } else if (isFieldLTPredicate(predicate)) {
      const upper = predicate.lt;
      return "".concat(fieldExpr$1, "<").concat(predicateValueExpr(upper, timeUnit));
    } else if (isFieldGTPredicate(predicate)) {
      const lower = predicate.gt;
      return "".concat(fieldExpr$1, ">").concat(predicateValueExpr(lower, timeUnit));
    } else if (isFieldLTEPredicate(predicate)) {
      const upper = predicate.lte;
      return "".concat(fieldExpr$1, "<=").concat(predicateValueExpr(upper, timeUnit));
    } else if (isFieldGTEPredicate(predicate)) {
      const lower = predicate.gte;
      return "".concat(fieldExpr$1, ">=").concat(predicateValueExpr(lower, timeUnit));
    } else if (isFieldOneOfPredicate(predicate)) {
      return "indexof([".concat(predicateValuesExpr(predicate.oneOf, timeUnit).join(','), "], ").concat(fieldExpr$1, ") !== -1");
    } else if (isFieldValidPredicate(predicate)) {
      return fieldValidPredicate(fieldExpr$1, predicate.valid);
    } else if (isFieldRangePredicate(predicate)) {
      const {
        range
      } = predicate;
      const lower = isSignalRef(range) ? {
        signal: "".concat(range.signal, "[0]")
      } : range[0];
      const upper = isSignalRef(range) ? {
        signal: "".concat(range.signal, "[1]")
      } : range[1];

      if (lower !== null && upper !== null && useInRange) {
        return 'inrange(' + fieldExpr$1 + ', [' + predicateValueExpr(lower, timeUnit) + ', ' + predicateValueExpr(upper, timeUnit) + '])';
      }

      const exprs = [];

      if (lower !== null) {
        exprs.push("".concat(fieldExpr$1, " >= ").concat(predicateValueExpr(lower, timeUnit)));
      }

      if (upper !== null) {
        exprs.push("".concat(fieldExpr$1, " <= ").concat(predicateValueExpr(upper, timeUnit)));
      }

      return exprs.length > 0 ? exprs.join(' && ') : 'true';
    }
    /* istanbul ignore next: it should never reach here */


    throw new Error("Invalid field predicate: ".concat(stringify(predicate)));
  }
  function fieldValidPredicate(fieldExpr) {
    let valid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (valid) {
      return "isValid(".concat(fieldExpr, ") && isFinite(+").concat(fieldExpr, ")");
    } else {
      return "!isValid(".concat(fieldExpr, ") || !isFinite(+").concat(fieldExpr, ")");
    }
  }
  function normalizePredicate$1(f) {
    if (isFieldPredicate(f) && f.timeUnit) {
      var _normalizeTimeUnit2;

      return { ...f,
        timeUnit: (_normalizeTimeUnit2 = normalizeTimeUnit(f.timeUnit)) === null || _normalizeTimeUnit2 === void 0 ? void 0 : _normalizeTimeUnit2.unit
      };
    }

    return f;
  }

  /**
   * Data type based on level of measurement
   */

  const Type = {
    quantitative: 'quantitative',
    ordinal: 'ordinal',
    temporal: 'temporal',
    nominal: 'nominal',
    geojson: 'geojson'
  };
  function isContinuous(type) {
    return type === 'quantitative' || type === 'temporal';
  }
  function isDiscrete$1(type) {
    return type === 'ordinal' || type === 'nominal';
  }
  const QUANTITATIVE = Type.quantitative;
  const ORDINAL = Type.ordinal;
  const TEMPORAL = Type.temporal;
  const NOMINAL = Type.nominal;
  const GEOJSON = Type.geojson;
  /**
   * Get full, lowercase type name for a given type.
   * @param  type
   * @return Full type name.
   */

  function getFullName(type) {
    if (type) {
      type = type.toLowerCase();

      switch (type) {
        case 'q':
        case QUANTITATIVE:
          return 'quantitative';

        case 't':
        case TEMPORAL:
          return 'temporal';

        case 'o':
        case ORDINAL:
          return 'ordinal';

        case 'n':
        case NOMINAL:
          return 'nominal';

        case GEOJSON:
          return 'geojson';
      }
    } // If we get invalid input, return undefined type.


    return undefined;
  }

  const ScaleType = {
    // Continuous - Quantitative
    LINEAR: 'linear',
    LOG: 'log',
    POW: 'pow',
    SQRT: 'sqrt',
    SYMLOG: 'symlog',
    IDENTITY: 'identity',
    SEQUENTIAL: 'sequential',
    // Continuous - Time
    TIME: 'time',
    UTC: 'utc',
    // Discretizing scales
    QUANTILE: 'quantile',
    QUANTIZE: 'quantize',
    THRESHOLD: 'threshold',
    BIN_ORDINAL: 'bin-ordinal',
    // Discrete scales
    ORDINAL: 'ordinal',
    POINT: 'point',
    BAND: 'band'
  };

  /**
   * Index for scale categories -- only scale of the same categories can be merged together.
   * Current implementation is trying to be conservative and avoid merging scale type that might not work together
   */
  const SCALE_CATEGORY_INDEX = {
    linear: 'numeric',
    log: 'numeric',
    pow: 'numeric',
    sqrt: 'numeric',
    symlog: 'numeric',
    identity: 'numeric',
    sequential: 'numeric',
    time: 'time',
    utc: 'time',
    ordinal: 'ordinal',
    'bin-ordinal': 'bin-ordinal',
    // TODO: should bin-ordinal support merging with other
    point: 'ordinal-position',
    band: 'ordinal-position',
    quantile: 'discretizing',
    quantize: 'discretizing',
    threshold: 'discretizing'
  };
  /**
   * Whether the two given scale types can be merged together.
   */

  function scaleCompatible(scaleType1, scaleType2) {
    const scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
    const scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
    return scaleCategory1 === scaleCategory2 || scaleCategory1 === 'ordinal-position' && scaleCategory2 === 'time' || scaleCategory2 === 'ordinal-position' && scaleCategory1 === 'time';
  }
  /**
   * Index for scale precedence -- high score = higher priority for merging.
   */

  const SCALE_PRECEDENCE_INDEX = {
    // numeric
    linear: 0,
    log: 1,
    pow: 1,
    sqrt: 1,
    symlog: 1,
    identity: 1,
    sequential: 1,
    // time
    time: 0,
    utc: 0,
    // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
    point: 10,
    band: 11,
    // band has higher precedence as it is better for interaction
    // non grouped types
    ordinal: 0,
    'bin-ordinal': 0,
    quantile: 0,
    quantize: 0,
    threshold: 0
  };
  /**
   * Return scale categories -- only scale of the same categories can be merged together.
   */

  function scaleTypePrecedence(scaleType) {
    return SCALE_PRECEDENCE_INDEX[scaleType];
  }
  const QUANTITATIVE_SCALES = new Set(['linear', 'log', 'pow', 'sqrt', 'symlog']);
  const CONTINUOUS_TO_CONTINUOUS_SCALES = new Set([...QUANTITATIVE_SCALES, 'time', 'utc']);
  function isQuantitative(type) {
    return QUANTITATIVE_SCALES.has(type);
  }
  const CONTINUOUS_TO_DISCRETE_SCALES = new Set(['quantile', 'quantize', 'threshold']);
  const CONTINUOUS_DOMAIN_SCALES = new Set([...CONTINUOUS_TO_CONTINUOUS_SCALES, ...CONTINUOUS_TO_DISCRETE_SCALES, 'sequential', 'identity']);
  const DISCRETE_DOMAIN_SCALES = new Set(['ordinal', 'bin-ordinal', 'point', 'band']);
  function hasDiscreteDomain(type) {
    return DISCRETE_DOMAIN_SCALES.has(type);
  }
  function hasContinuousDomain(type) {
    return CONTINUOUS_DOMAIN_SCALES.has(type);
  }
  function isContinuousToContinuous(type) {
    return CONTINUOUS_TO_CONTINUOUS_SCALES.has(type);
  }
  function isContinuousToDiscrete(type) {
    return CONTINUOUS_TO_DISCRETE_SCALES.has(type);
  }
  const defaultScaleConfig = {
    pointPadding: 0.5,
    barBandPaddingInner: 0.1,
    rectBandPaddingInner: 0,
    bandWithNestedOffsetPaddingInner: 0.2,
    bandWithNestedOffsetPaddingOuter: 0.2,
    minBandSize: 2,
    minFontSize: 8,
    maxFontSize: 40,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    // FIXME: revise if these *can* become ratios of width/height step
    minSize: 9,
    // Point size is area. For square point, 9 = 3 pixel ^ 2, not too small!
    minStrokeWidth: 1,
    maxStrokeWidth: 4,
    quantileCount: 4,
    quantizeCount: 4
  };
  function isExtendedScheme(scheme) {
    return !vega.isString(scheme) && !!scheme['name'];
  }
  function isParameterDomain(domain) {
    return domain === null || domain === void 0 ? void 0 : domain['param'];
  }
  function isDomainUnionWith(domain) {
    return domain && domain['unionWith'];
  }
  function isFieldRange(range) {
    return vega.isObject(range) && 'field' in range;
  }
  const SCALE_PROPERTY_INDEX = {
    type: 1,
    domain: 1,
    domainMax: 1,
    domainMin: 1,
    domainMid: 1,
    align: 1,
    range: 1,
    rangeMax: 1,
    rangeMin: 1,
    scheme: 1,
    bins: 1,
    // Other properties
    reverse: 1,
    round: 1,
    // quantitative / time
    clamp: 1,
    nice: 1,
    // quantitative
    base: 1,
    exponent: 1,
    constant: 1,
    interpolate: 1,
    zero: 1,
    // zero depends on domain
    // band/point
    padding: 1,
    paddingInner: 1,
    paddingOuter: 1
  };
  const {
    type,
    domain: domain$1,
    range,
    rangeMax,
    rangeMin,
    scheme,
    ...NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX
  } = SCALE_PROPERTY_INDEX;
  const NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = keys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
  function scaleTypeSupportProperty(scaleType, propName) {
    switch (propName) {
      case 'type':
      case 'domain':
      case 'reverse':
      case 'range':
        return true;

      case 'scheme':
      case 'interpolate':
        return !['point', 'band', 'identity'].includes(scaleType);

      case 'bins':
        return !['point', 'band', 'identity', 'ordinal'].includes(scaleType);

      case 'round':
        return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';

      case 'padding':
      case 'rangeMin':
      case 'rangeMax':
        return isContinuousToContinuous(scaleType) || ['point', 'band'].includes(scaleType);

      case 'paddingOuter':
      case 'align':
        return ['point', 'band'].includes(scaleType);

      case 'paddingInner':
        return scaleType === 'band';

      case 'domainMax':
      case 'domainMid':
      case 'domainMin':
      case 'clamp':
        return isContinuousToContinuous(scaleType);

      case 'nice':
        return isContinuousToContinuous(scaleType) || scaleType === 'quantize' || scaleType === 'threshold';

      case 'exponent':
        return scaleType === 'pow';

      case 'base':
        return scaleType === 'log';

      case 'constant':
        return scaleType === 'symlog';

      case 'zero':
        return hasContinuousDomain(scaleType) && !contains(['log', // log scale cannot have zero value
        'time', 'utc', // zero is not meaningful for time
        'threshold', // threshold requires custom domain so zero does not matter
        'quantile' // quantile depends on distribution so zero does not matter
        ], scaleType);
    }
  }
  /**
   * Returns undefined if the input channel supports the input scale property name
   */

  function channelScalePropertyIncompatability(channel, propName) {
    switch (propName) {
      case 'interpolate':
      case 'scheme':
      case 'domainMid':
        if (!isColorChannel(channel)) {
          return cannotUseScalePropertyWithNonColor(channel);
        }

        return undefined;

      case 'align':
      case 'type':
      case 'bins':
      case 'domain':
      case 'domainMax':
      case 'domainMin':
      case 'range':
      case 'base':
      case 'exponent':
      case 'constant':
      case 'nice':
      case 'padding':
      case 'paddingInner':
      case 'paddingOuter':
      case 'rangeMax':
      case 'rangeMin':
      case 'reverse':
      case 'round':
      case 'clamp':
      case 'zero':
        return undefined;
      // GOOD!
    }
  }
  function scaleTypeSupportDataType(specifiedType, fieldDefType) {
    if (contains([ORDINAL, NOMINAL], fieldDefType)) {
      return specifiedType === undefined || hasDiscreteDomain(specifiedType);
    } else if (fieldDefType === TEMPORAL) {
      return contains([ScaleType.TIME, ScaleType.UTC, undefined], specifiedType);
    } else if (fieldDefType === QUANTITATIVE) {
      return isQuantitative(specifiedType) || isContinuousToDiscrete(specifiedType) || specifiedType === undefined;
    }

    return true;
  }
  function channelSupportScaleType(channel, scaleType) {
    let hasNestedOffsetScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isScaleChannel(channel)) {
      return false;
    }

    switch (channel) {
      case X:
      case Y:
      case XOFFSET:
      case YOFFSET:
      case THETA:
      case RADIUS:
        if (isContinuousToContinuous(scaleType)) {
          return true;
        } else if (scaleType === 'band') {
          return true;
        } else if (scaleType === 'point') {
          /*
            Point scale can't be use if the position has a nested offset scale
            because if there is a nested scale, then it's band.
          */
          return !hasNestedOffsetScale;
        }

        return false;

      case SIZE: // TODO: size and opacity can support ordinal with more modification

      case STROKEWIDTH:
      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
      case ANGLE:
        // Although it generally doesn't make sense to use band with size and opacity,
        // it can also work since we use band: 0.5 to get midpoint.
        return isContinuousToContinuous(scaleType) || isContinuousToDiscrete(scaleType) || contains(['band', 'point', 'ordinal'], scaleType);

      case COLOR:
      case FILL:
      case STROKE:
        return scaleType !== 'band';
      // band does not make sense with color

      case STROKEDASH:
      case SHAPE:
        return scaleType === 'ordinal' || isContinuousToDiscrete(scaleType);
    }
  }

  /**
   * All types of primitive marks.
   */
  const Mark = {
    arc: 'arc',
    area: 'area',
    bar: 'bar',
    image: 'image',
    line: 'line',
    point: 'point',
    rect: 'rect',
    rule: 'rule',
    text: 'text',
    tick: 'tick',
    trail: 'trail',
    circle: 'circle',
    square: 'square',
    geoshape: 'geoshape'
  };
  const ARC = Mark.arc;
  const AREA = Mark.area;
  const BAR = Mark.bar;
  const IMAGE = Mark.image;
  const LINE = Mark.line;
  const POINT = Mark.point;
  const RECT = Mark.rect;
  const RULE = Mark.rule;
  const TEXT = Mark.text;
  const TICK = Mark.tick;
  const TRAIL = Mark.trail;
  const CIRCLE = Mark.circle;
  const SQUARE = Mark.square;
  const GEOSHAPE = Mark.geoshape;
  function isPathMark(m) {
    return ['line', 'area', 'trail'].includes(m);
  }
  function isRectBasedMark(m) {
    return ['rect', 'bar', 'image', 'arc'
    /* arc is rect/interval in polar coordinate */
    ].includes(m);
  }
  const PRIMITIVE_MARKS = new Set(keys(Mark));
  function isMarkDef(mark) {
    return mark['type'];
  }
  const STROKE_CONFIG = ['stroke', 'strokeWidth', 'strokeDash', 'strokeDashOffset', 'strokeOpacity', 'strokeJoin', 'strokeMiterLimit'];
  const FILL_CONFIG = ['fill', 'fillOpacity'];
  const FILL_STROKE_CONFIG = [...STROKE_CONFIG, ...FILL_CONFIG];
  const VL_ONLY_MARK_CONFIG_INDEX = {
    color: 1,
    filled: 1,
    invalid: 1,
    order: 1,
    radius2: 1,
    theta2: 1,
    timeUnitBandSize: 1,
    timeUnitBandPosition: 1
  };
  const VL_ONLY_MARK_CONFIG_PROPERTIES = keys(VL_ONLY_MARK_CONFIG_INDEX);
  const VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
    area: ['line', 'point'],
    bar: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    rect: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    line: ['point'],
    tick: ['bandSize', 'thickness']
  };
  const defaultMarkConfig = {
    color: '#4c78a8',
    invalid: 'filter',
    timeUnitBandSize: 1
  }; // TODO: replace with MarkConfigMixins[Mark] once https://github.com/vega/ts-json-schema-generator/issues/344 is fixed

  const MARK_CONFIG_INDEX = {
    mark: 1,
    arc: 1,
    area: 1,
    bar: 1,
    circle: 1,
    image: 1,
    line: 1,
    point: 1,
    rect: 1,
    rule: 1,
    square: 1,
    text: 1,
    tick: 1,
    trail: 1,
    geoshape: 1
  };
  const MARK_CONFIGS = keys(MARK_CONFIG_INDEX);
  function isRelativeBandSize(o) {
    return o && o['band'] != undefined;
  }
  const BAR_CORNER_RADIUS_INDEX = {
    horizontal: ['cornerRadiusTopRight', 'cornerRadiusBottomRight'],
    vertical: ['cornerRadiusTopLeft', 'cornerRadiusTopRight']
  };
  const DEFAULT_RECT_BAND_SIZE = 5;
  const defaultBarConfig = {
    binSpacing: 1,
    continuousBandSize: DEFAULT_RECT_BAND_SIZE,
    timeUnitBandPosition: 0.5
  };
  const defaultRectConfig = {
    binSpacing: 0,
    continuousBandSize: DEFAULT_RECT_BAND_SIZE,
    timeUnitBandPosition: 0.5
  };
  const defaultTickConfig = {
    thickness: 1
  };
  function getMarkType(m) {
    return isMarkDef(m) ? m.type : m;
  }

  /**
   * Utility files for producing Vega ValueRef for marks
   */
  function midPointRefWithPositionInvalidTest(params) {
    const {
      channel,
      channelDef,
      markDef,
      scale,
      config
    } = params;
    const ref = midPoint(params); // Wrap to check if the positional value is invalid, if so, plot the point on the min value

    if ( // Only this for field def without counting aggregate (as count wouldn't be null)
    isFieldDef(channelDef) && !isCountingAggregateOp(channelDef.aggregate) && // and only for continuous scale
    scale && isContinuousToContinuous(scale.get('type'))) {
      return wrapPositionInvalidTest({
        fieldDef: channelDef,
        channel,
        markDef,
        ref,
        config
      });
    }

    return ref;
  }
  function wrapPositionInvalidTest(_ref) {
    let {
      fieldDef,
      channel,
      markDef,
      ref,
      config
    } = _ref;

    if (isPathMark(markDef.type)) {
      // path mark already use defined to skip points, no need to do it here.
      return ref;
    }

    const invalid = getMarkPropOrConfig('invalid', markDef, config);

    if (invalid === null) {
      // if there is no invalid filter, don't do the invalid test
      return [fieldInvalidTestValueRef(fieldDef, channel), ref];
    }

    return ref;
  }
  function fieldInvalidTestValueRef(fieldDef, channel) {
    const test = fieldInvalidPredicate(fieldDef, true);
    const mainChannel = getMainRangeChannel(channel); // we can cast here as the output can't be other things.

    const zeroValueRef = mainChannel === 'y' ? {
      field: {
        group: 'height'
      }
    } : // x / angle / radius can all use 0
    {
      value: 0
    };
    return {
      test,
      ...zeroValueRef
    };
  }
  function fieldInvalidPredicate(field) {
    let invalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return fieldValidPredicate(vega.isString(field) ? field : vgField(field, {
      expr: 'datum'
    }), !invalid);
  }
  function datumDefToExpr(datumDef) {
    const {
      datum
    } = datumDef;

    if (isDateTime(datum)) {
      return dateTimeToExpr(datum);
    }

    return "".concat(stringify(datum));
  }
  function valueRefForFieldOrDatumDef(fieldDef, scaleName, opt, encode) {
    const ref = {};

    if (scaleName) {
      ref.scale = scaleName;
    }

    if (isDatumDef(fieldDef)) {
      const {
        datum
      } = fieldDef;

      if (isDateTime(datum)) {
        ref.signal = dateTimeToExpr(datum);
      } else if (isSignalRef(datum)) {
        ref.signal = datum.signal;
      } else if (isExprRef(datum)) {
        ref.signal = datum.expr;
      } else {
        ref.value = datum;
      }
    } else {
      ref.field = vgField(fieldDef, opt);
    }

    if (encode) {
      const {
        offset,
        band
      } = encode;

      if (offset) {
        ref.offset = offset;
      }

      if (band) {
        ref.band = band;
      }
    }

    return ref;
  }
  /**
   * Signal that returns the middle of a bin from start and end field. Should only be used with x and y.
   */

  function interpolatedSignalRef(_ref2) {
    let {
      scaleName,
      fieldOrDatumDef,
      fieldOrDatumDef2,
      offset,
      startSuffix,
      bandPosition = 0.5
    } = _ref2;
    const expr = 0 < bandPosition && bandPosition < 1 ? 'datum' : undefined;
    const start = vgField(fieldOrDatumDef, {
      expr,
      suffix: startSuffix
    });
    const end = fieldOrDatumDef2 !== undefined ? vgField(fieldOrDatumDef2, {
      expr
    }) : vgField(fieldOrDatumDef, {
      suffix: 'end',
      expr
    });
    const ref = {};

    if (bandPosition === 0 || bandPosition === 1) {
      ref.scale = scaleName;
      const val = bandPosition === 0 ? start : end;
      ref.field = val;
    } else {
      const datum = isSignalRef(bandPosition) ? "".concat(bandPosition.signal, " * ").concat(start, " + (1-").concat(bandPosition.signal, ") * ").concat(end) : "".concat(bandPosition, " * ").concat(start, " + ").concat(1 - bandPosition, " * ").concat(end);
      ref.signal = "scale(\"".concat(scaleName, "\", ").concat(datum, ")");
    }

    if (offset) {
      ref.offset = offset;
    }

    return ref;
  }

  /**
   * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
   */
  function midPoint(_ref3) {
    let {
      channel,
      channelDef,
      channel2Def,
      markDef,
      config,
      scaleName,
      scale,
      stack,
      offset,
      defaultRef,
      bandPosition
    } = _ref3;

    // TODO: datum support
    if (channelDef) {
      /* istanbul ignore else */
      if (isFieldOrDatumDef(channelDef)) {
        var _ref4, _bandPosition2;

        const scaleType = scale === null || scale === void 0 ? void 0 : scale.get('type');

        if (isTypedFieldDef(channelDef)) {
          var _bandPosition;

          (_bandPosition = bandPosition) !== null && _bandPosition !== void 0 ? _bandPosition : bandPosition = getBandPosition({
            fieldDef: channelDef,
            fieldDef2: channel2Def,
            markDef,
            config
          });
          const {
            bin,
            timeUnit,
            type
          } = channelDef;

          if (isBinning(bin) || bandPosition && timeUnit && type === TEMPORAL) {
            // Use middle only for x an y to place marks in the center between start and end of the bin range.
            // We do not use the mid point for other channels (e.g. size) so that properties of legends and marks match.
            if (stack !== null && stack !== void 0 && stack.impute) {
              // For stack, we computed bin_mid so we can impute.
              return valueRefForFieldOrDatumDef(channelDef, scaleName, {
                binSuffix: 'mid'
              }, {
                offset
              });
            }

            if (bandPosition && !hasDiscreteDomain(scaleType)) {
              // if band = 0, no need to call interpolation
              // For non-stack, we can just calculate bin mid on the fly using signal.
              return interpolatedSignalRef({
                scaleName,
                fieldOrDatumDef: channelDef,
                bandPosition,
                offset
              });
            }

            return valueRefForFieldOrDatumDef(channelDef, scaleName, binRequiresRange(channelDef, channel) ? {
              binSuffix: 'range'
            } : {}, {
              offset
            });
          } else if (isBinned(bin)) {
            if (isFieldDef(channel2Def)) {
              return interpolatedSignalRef({
                scaleName,
                fieldOrDatumDef: channelDef,
                fieldOrDatumDef2: channel2Def,
                bandPosition,
                offset
              });
            } else {
              const channel2 = channel === X ? X2 : Y2;
              warn(channelRequiredForBinned(channel2));
            }
          }
        }

        return valueRefForFieldOrDatumDef(channelDef, scaleName, hasDiscreteDomain(scaleType) ? {
          binSuffix: 'range'
        } : {}, // no need for bin suffix if there is no scale
        {
          offset,
          // For band, to get mid point, need to offset by half of the band
          band: scaleType === 'band' ? (_ref4 = (_bandPosition2 = bandPosition) !== null && _bandPosition2 !== void 0 ? _bandPosition2 : channelDef.bandPosition) !== null && _ref4 !== void 0 ? _ref4 : 0.5 : undefined
        });
      } else if (isValueDef(channelDef)) {
        const value = channelDef.value;
        const offsetMixins = offset ? {
          offset
        } : {};
        return { ...widthHeightValueOrSignalRef(channel, value),
          ...offsetMixins
        };
      } // If channelDef is neither field def or value def, it's a condition-only def.
      // In such case, we will use default ref.

    }

    if (vega.isFunction(defaultRef)) {
      defaultRef = defaultRef();
    }

    if (defaultRef) {
      // for non-position, ref could be undefined.
      return { ...defaultRef,
        // only include offset when it is non-zero (zero = no offset)
        ...(offset ? {
          offset
        } : {})
      };
    }

    return defaultRef;
  }
  /**
   * Convert special "width" and "height" values in Vega-Lite into Vega value ref.
   */

  function widthHeightValueOrSignalRef(channel, value) {
    if (contains(['x', 'x2'], channel) && value === 'width') {
      return {
        field: {
          group: 'width'
        }
      };
    } else if (contains(['y', 'y2'], channel) && value === 'height') {
      return {
        field: {
          group: 'height'
        }
      };
    }

    return signalOrValueRef(value);
  }

  function isCustomFormatType(formatType) {
    return formatType && formatType !== 'number' && formatType !== 'time';
  }

  function customFormatExpr(formatType, field, format) {
    return "".concat(formatType, "(").concat(field).concat(format ? ", ".concat(stringify(format)) : '', ")");
  }

  const BIN_RANGE_DELIMITER = ' \u2013 ';
  function formatSignalRef(_ref) {
    let {
      fieldOrDatumDef,
      format,
      formatType,
      expr,
      normalizeStack,
      config
    } = _ref;

    if (isCustomFormatType(formatType)) {
      return formatCustomType({
        fieldOrDatumDef,
        format,
        formatType,
        expr,
        config
      });
    }

    const field = fieldToFormat(fieldOrDatumDef, expr, normalizeStack);

    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
      var _normalizeTimeUnit, _fieldOrDatumDef$scal;

      const signal = timeFormatExpression(field, isFieldDef(fieldOrDatumDef) ? (_normalizeTimeUnit = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit : undefined, format, config.timeFormat, isScaleFieldDef(fieldOrDatumDef) && ((_fieldOrDatumDef$scal = fieldOrDatumDef.scale) === null || _fieldOrDatumDef$scal === void 0 ? void 0 : _fieldOrDatumDef$scal.type) === ScaleType.UTC);
      return signal ? {
        signal
      } : undefined;
    }

    format = numberFormat(channelDefType(fieldOrDatumDef), format, config);

    if (isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
      const endField = vgField(fieldOrDatumDef, {
        expr,
        binSuffix: 'end'
      });
      return {
        signal: binFormatExpression(field, endField, format, formatType, config)
      };
    } else if (format || channelDefType(fieldOrDatumDef) === 'quantitative') {
      return {
        signal: "".concat(formatExpr(field, format))
      };
    } else {
      return {
        signal: "isValid(".concat(field, ") ? ").concat(field, " : \"\"+").concat(field)
      };
    }
  }

  function fieldToFormat(fieldOrDatumDef, expr, normalizeStack) {
    if (isFieldDef(fieldOrDatumDef)) {
      if (normalizeStack) {
        return "".concat(vgField(fieldOrDatumDef, {
          expr,
          suffix: 'end'
        }), "-").concat(vgField(fieldOrDatumDef, {
          expr,
          suffix: 'start'
        }));
      } else {
        return vgField(fieldOrDatumDef, {
          expr
        });
      }
    } else {
      return datumDefToExpr(fieldOrDatumDef);
    }
  }

  function formatCustomType(_ref2) {
    var _field;

    let {
      fieldOrDatumDef,
      format,
      formatType,
      expr,
      normalizeStack,
      config,
      field
    } = _ref2;
    (_field = field) !== null && _field !== void 0 ? _field : field = fieldToFormat(fieldOrDatumDef, expr, normalizeStack);

    if (isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
      const endField = vgField(fieldOrDatumDef, {
        expr,
        binSuffix: 'end'
      });
      return {
        signal: binFormatExpression(field, endField, format, formatType, config)
      };
    }

    return {
      signal: customFormatExpr(formatType, field, format)
    };
  }
  function guideFormat(fieldOrDatumDef, type, format, formatType, config, omitTimeFormatConfig) {
    if (isCustomFormatType(formatType)) {
      return undefined; // handled in encode block
    }

    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
      var _normalizeTimeUnit2;

      const timeUnit = isFieldDef(fieldOrDatumDef) ? (_normalizeTimeUnit2 = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _normalizeTimeUnit2 === void 0 ? void 0 : _normalizeTimeUnit2.unit : undefined;
      return timeFormat(format, timeUnit, config, omitTimeFormatConfig);
    }

    return numberFormat(type, format, config);
  }
  function guideFormatType(formatType, fieldOrDatumDef, scaleType) {
    if (formatType && (isSignalRef(formatType) || formatType === 'number' || formatType === 'time')) {
      return formatType;
    }

    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) && scaleType !== 'time' && scaleType !== 'utc') {
      return 'time';
    }

    return undefined;
  }
  /**
   * Returns number format for a fieldDef.
   */

  function numberFormat(type, specifiedFormat, config) {
    // Specified format in axis/legend has higher precedence than fieldDef.format
    if (vega.isString(specifiedFormat)) {
      return specifiedFormat;
    }

    if (type === QUANTITATIVE) {
      // we only apply the default if the field is quantitative
      return config.numberFormat;
    }

    return undefined;
  }
  /**
   * Returns time format for a fieldDef for use in guides.
   */

  function timeFormat(specifiedFormat, timeUnit, config, omitTimeFormatConfig) {
    if (specifiedFormat) {
      return specifiedFormat;
    }

    if (timeUnit) {
      return {
        signal: timeUnitSpecifierExpression(timeUnit)
      };
    }

    return omitTimeFormatConfig ? undefined : config.timeFormat;
  }

  function formatExpr(field, format) {
    return "format(".concat(field, ", \"").concat(format || '', "\")");
  }

  function binNumberFormatExpr(field, format, formatType, config) {
    var _ref3;

    if (isCustomFormatType(formatType)) {
      return customFormatExpr(formatType, field, format);
    }

    return formatExpr(field, (_ref3 = vega.isString(format) ? format : undefined) !== null && _ref3 !== void 0 ? _ref3 : config.numberFormat);
  }

  function binFormatExpression(startField, endField, format, formatType, config) {
    const start = binNumberFormatExpr(startField, format, formatType, config);
    const end = binNumberFormatExpr(endField, format, formatType, config);
    return "".concat(fieldValidPredicate(startField, false), " ? \"null\" : ").concat(start, " + \"").concat(BIN_RANGE_DELIMITER, "\" + ").concat(end);
  }
  /**
   * Returns the time expression used for axis/legend labels or text mark for a temporal field
   */

  function timeFormatExpression(field, timeUnit, format, rawTimeFormat, // should be provided only for actual text and headers, not axis/legend labels
  isUTCScale) {
    if (!timeUnit || format) {
      // If there is no time unit, or if user explicitly specifies format for axis/legend/text.
      format = vega.isString(format) ? format : rawTimeFormat; // only use provided timeFormat if there is no timeUnit.

      return "".concat(isUTCScale ? 'utc' : 'time', "Format(").concat(field, ", '").concat(format, "')");
    } else {
      return formatExpression(timeUnit, field, isUTCScale);
    }
  }

  const DEFAULT_SORT_OP = 'min';
  /**
   * A sort definition for sorting a discrete scale in an encoding field definition.
   */

  const SORT_BY_CHANNEL_INDEX = {
    x: 1,
    y: 1,
    color: 1,
    fill: 1,
    stroke: 1,
    strokeWidth: 1,
    size: 1,
    shape: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    opacity: 1,
    text: 1
  };
  function isSortByChannel(c) {
    return c in SORT_BY_CHANNEL_INDEX;
  }
  function isSortByEncoding(sort) {
    return !!sort && !!sort['encoding'];
  }
  function isSortField(sort) {
    return !!sort && (sort['op'] === 'count' || !!sort['field']);
  }
  function isSortArray(sort) {
    return !!sort && vega.isArray(sort);
  }

  function isFacetMapping(f) {
    return 'row' in f || 'column' in f;
  }
  /**
   * Facet mapping for encoding macro
   */

  function isFacetFieldDef(channelDef) {
    return !!channelDef && 'header' in channelDef;
  }
  /**
   * Base interface for a facet specification.
   */

  function isFacetSpec(spec) {
    return 'facet' in spec;
  }

  function isConditionalParameter(c) {
    return c['param'];
  }
  function isRepeatRef(field) {
    return field && !vega.isString(field) && 'repeat' in field;
  }
  /** @@hidden */

  function toFieldDefBase(fieldDef) {
    const {
      field,
      timeUnit,
      bin,
      aggregate
    } = fieldDef;
    return { ...(timeUnit ? {
        timeUnit
      } : {}),
      ...(bin ? {
        bin
      } : {}),
      ...(aggregate ? {
        aggregate
      } : {}),
      field
    };
  }
  function isSortableFieldDef(fieldDef) {
    return 'sort' in fieldDef;
  }
  function getBandPosition(_ref) {
    let {
      fieldDef,
      fieldDef2,
      markDef: mark,
      config
    } = _ref;

    if (isFieldOrDatumDef(fieldDef) && fieldDef.bandPosition !== undefined) {
      return fieldDef.bandPosition;
    }

    if (isFieldDef(fieldDef)) {
      const {
        timeUnit,
        bin
      } = fieldDef;

      if (timeUnit && !fieldDef2) {
        return isRectBasedMark(mark.type) ? 0 : getMarkConfig('timeUnitBandPosition', mark, config);
      } else if (isBinning(bin)) {
        return 0.5;
      }
    }

    return undefined;
  }
  function getBandSize(_ref2) {
    let {
      channel,
      fieldDef,
      fieldDef2,
      markDef: mark,
      config,
      scaleType,
      useVlSizeChannel
    } = _ref2;
    const sizeChannel = getSizeChannel(channel);
    const size = getMarkPropOrConfig(useVlSizeChannel ? 'size' : sizeChannel, mark, config, {
      vgChannel: sizeChannel
    });

    if (size !== undefined) {
      return size;
    }

    if (isFieldDef(fieldDef)) {
      const {
        timeUnit,
        bin
      } = fieldDef;

      if (timeUnit && !fieldDef2) {
        return {
          band: getMarkConfig('timeUnitBandSize', mark, config)
        };
      } else if (isBinning(bin) && !hasDiscreteDomain(scaleType)) {
        return {
          band: 1
        };
      }
    }

    if (isRectBasedMark(mark.type)) {
      var _config$mark$type3;

      if (scaleType) {
        if (hasDiscreteDomain(scaleType)) {
          var _config$mark$type;

          return ((_config$mark$type = config[mark.type]) === null || _config$mark$type === void 0 ? void 0 : _config$mark$type.discreteBandSize) || {
            band: 1
          };
        } else {
          var _config$mark$type2;

          return (_config$mark$type2 = config[mark.type]) === null || _config$mark$type2 === void 0 ? void 0 : _config$mark$type2.continuousBandSize;
        }
      }

      return (_config$mark$type3 = config[mark.type]) === null || _config$mark$type3 === void 0 ? void 0 : _config$mark$type3.discreteBandSize;
    }

    return undefined;
  }
  function hasBandEnd(fieldDef, fieldDef2, markDef, config) {
    if (isBinning(fieldDef.bin) || fieldDef.timeUnit && isTypedFieldDef(fieldDef) && fieldDef.type === 'temporal') {
      // Need to check bandPosition because non-rect marks (e.g., point) with timeUnit
      // doesn't have to use bandEnd if there is no bandPosition.
      return getBandPosition({
        fieldDef,
        fieldDef2,
        markDef,
        config
      }) !== undefined;
    }

    return false;
  }
  /**
   * Field definition of a mark property, which can contain a legend.
   */

  function isConditionalDef(channelDef) {
    return channelDef && 'condition' in channelDef;
  }
  /**
   * Return if a channelDef is a ConditionalValueDef with ConditionFieldDef
   */

  function hasConditionalFieldDef(channelDef) {
    const condition = channelDef && channelDef['condition'];
    return !!condition && !vega.isArray(condition) && isFieldDef(condition);
  }
  function hasConditionalFieldOrDatumDef(channelDef) {
    const condition = channelDef && channelDef['condition'];
    return !!condition && !vega.isArray(condition) && isFieldOrDatumDef(condition);
  }
  function hasConditionalValueDef(channelDef) {
    const condition = channelDef && channelDef['condition'];
    return !!condition && (vega.isArray(condition) || isValueDef(condition));
  }
  function isFieldDef(channelDef) {
    // TODO: we can't use field in channelDef here as it's somehow failing runtime test
    return channelDef && (!!channelDef['field'] || channelDef['aggregate'] === 'count');
  }
  function channelDefType(channelDef) {
    return channelDef && channelDef['type'];
  }
  function isDatumDef(channelDef) {
    return channelDef && 'datum' in channelDef;
  }
  function isContinuousFieldOrDatumDef(cd) {
    // TODO: make datum support DateTime object
    return isTypedFieldDef(cd) && !isDiscrete(cd) || isNumericDataDef(cd);
  }
  function isNumericDataDef(cd) {
    return isDatumDef(cd) && vega.isNumber(cd.datum);
  }
  function isFieldOrDatumDef(channelDef) {
    return isFieldDef(channelDef) || isDatumDef(channelDef);
  }
  function isTypedFieldDef(channelDef) {
    return channelDef && ('field' in channelDef || channelDef['aggregate'] === 'count') && 'type' in channelDef;
  }
  function isValueDef(channelDef) {
    return channelDef && 'value' in channelDef && 'value' in channelDef;
  }
  function isScaleFieldDef(channelDef) {
    return channelDef && ('scale' in channelDef || 'sort' in channelDef);
  }
  function isPositionFieldOrDatumDef(channelDef) {
    return channelDef && ('axis' in channelDef || 'stack' in channelDef || 'impute' in channelDef);
  }
  function isMarkPropFieldOrDatumDef(channelDef) {
    return channelDef && 'legend' in channelDef;
  }
  function isStringFieldOrDatumDef(channelDef) {
    return channelDef && ('format' in channelDef || 'formatType' in channelDef);
  }
  function toStringFieldDef(fieldDef) {
    // omit properties that don't exist in string field defs
    return omit(fieldDef, ['legend', 'axis', 'header', 'scale']);
  }

  function isOpFieldDef(fieldDef) {
    return 'op' in fieldDef;
  }
  /**
   * Get a Vega field reference from a Vega-Lite field def.
   */


  function vgField(fieldDef) {
    let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let field = fieldDef.field;
    const prefix = opt.prefix;
    let suffix = opt.suffix;
    let argAccessor = ''; // for accessing argmin/argmax field at the end without getting escaped

    if (isCount(fieldDef)) {
      field = internalField('count');
    } else {
      let fn;

      if (!opt.nofn) {
        if (isOpFieldDef(fieldDef)) {
          fn = fieldDef.op;
        } else {
          const {
            bin,
            aggregate,
            timeUnit
          } = fieldDef;

          if (isBinning(bin)) {
            var _opt$binSuffix, _opt$suffix;

            fn = binToString(bin);
            suffix = ((_opt$binSuffix = opt.binSuffix) !== null && _opt$binSuffix !== void 0 ? _opt$binSuffix : '') + ((_opt$suffix = opt.suffix) !== null && _opt$suffix !== void 0 ? _opt$suffix : '');
          } else if (aggregate) {
            if (isArgmaxDef(aggregate)) {
              argAccessor = "[\"".concat(field, "\"]");
              field = "argmax_".concat(aggregate.argmax);
            } else if (isArgminDef(aggregate)) {
              argAccessor = "[\"".concat(field, "\"]");
              field = "argmin_".concat(aggregate.argmin);
            } else {
              fn = String(aggregate);
            }
          } else if (timeUnit) {
            var _opt$suffix2;

            fn = timeUnitToString(timeUnit);
            suffix = (!['range', 'mid'].includes(opt.binSuffix) && opt.binSuffix || '') + ((_opt$suffix2 = opt.suffix) !== null && _opt$suffix2 !== void 0 ? _opt$suffix2 : '');
          }
        }
      }

      if (fn) {
        field = field ? "".concat(fn, "_").concat(field) : fn;
      }
    }

    if (suffix) {
      field = "".concat(field, "_").concat(suffix);
    }

    if (prefix) {
      field = "".concat(prefix, "_").concat(field);
    }

    if (opt.forAs) {
      return removePathFromField(field);
    } else if (opt.expr) {
      // Expression to access flattened field. No need to escape dots.
      return flatAccessWithDatum(field, opt.expr) + argAccessor;
    } else {
      // We flattened all fields so paths should have become dot.
      return replacePathInField(field) + argAccessor;
    }
  }
  function isDiscrete(def) {
    switch (def.type) {
      case 'nominal':
      case 'ordinal':
      case 'geojson':
        return true;

      case 'quantitative':
        return isFieldDef(def) && !!def.bin;

      case 'temporal':
        return false;
    }

    throw new Error(invalidFieldType(def.type));
  }
  function isDiscretizing(def) {
    var _def$scale;

    return isScaleFieldDef(def) && isContinuousToDiscrete((_def$scale = def.scale) === null || _def$scale === void 0 ? void 0 : _def$scale.type);
  }
  function isCount(fieldDef) {
    return fieldDef.aggregate === 'count';
  }
  function verbalTitleFormatter(fieldDef, config) {
    const {
      field,
      bin,
      timeUnit,
      aggregate
    } = fieldDef;

    if (aggregate === 'count') {
      return config.countTitle;
    } else if (isBinning(bin)) {
      return "".concat(field, " (binned)");
    } else if (timeUnit) {
      var _normalizeTimeUnit;

      const unit = (_normalizeTimeUnit = normalizeTimeUnit(timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit;

      if (unit) {
        return "".concat(field, " (").concat(getTimeUnitParts(unit).join('-'), ")");
      }
    } else if (aggregate) {
      if (isArgmaxDef(aggregate)) {
        return "".concat(field, " for max ").concat(aggregate.argmax);
      } else if (isArgminDef(aggregate)) {
        return "".concat(field, " for min ").concat(aggregate.argmin);
      } else {
        return "".concat(titleCase(aggregate), " of ").concat(field);
      }
    }

    return field;
  }
  function functionalTitleFormatter(fieldDef) {
    const {
      aggregate,
      bin,
      timeUnit,
      field
    } = fieldDef;

    if (isArgmaxDef(aggregate)) {
      return "".concat(field, " for argmax(").concat(aggregate.argmax, ")");
    } else if (isArgminDef(aggregate)) {
      return "".concat(field, " for argmin(").concat(aggregate.argmin, ")");
    }

    const timeUnitParams = normalizeTimeUnit(timeUnit);
    const fn = aggregate || (timeUnitParams === null || timeUnitParams === void 0 ? void 0 : timeUnitParams.unit) || (timeUnitParams === null || timeUnitParams === void 0 ? void 0 : timeUnitParams.maxbins) && 'timeunit' || isBinning(bin) && 'bin';

    if (fn) {
      return "".concat(fn.toUpperCase(), "(").concat(field, ")");
    } else {
      return field;
    }
  }
  const defaultTitleFormatter = (fieldDef, config) => {
    switch (config.fieldTitle) {
      case 'plain':
        return fieldDef.field;

      case 'functional':
        return functionalTitleFormatter(fieldDef);

      default:
        return verbalTitleFormatter(fieldDef, config);
    }
  };
  let titleFormatter = defaultTitleFormatter;
  function setTitleFormatter(formatter) {
    titleFormatter = formatter;
  }
  function resetTitleFormatter() {
    setTitleFormatter(defaultTitleFormatter);
  }
  function title(fieldOrDatumDef, config, _ref3) {
    var _getGuide;

    let {
      allowDisabling,
      includeDefault = true
    } = _ref3;
    const guideTitle = (_getGuide = getGuide(fieldOrDatumDef)) === null || _getGuide === void 0 ? void 0 : _getGuide.title;

    if (!isFieldDef(fieldOrDatumDef)) {
      return guideTitle !== null && guideTitle !== void 0 ? guideTitle : fieldOrDatumDef.title;
    }

    const fieldDef = fieldOrDatumDef;
    const def = includeDefault ? defaultTitle(fieldDef, config) : undefined;

    if (allowDisabling) {
      return getFirstDefined(guideTitle, fieldDef.title, def);
    } else {
      var _ref4;

      return (_ref4 = guideTitle !== null && guideTitle !== void 0 ? guideTitle : fieldDef.title) !== null && _ref4 !== void 0 ? _ref4 : def;
    }
  }
  function getGuide(fieldDef) {
    if (isPositionFieldOrDatumDef(fieldDef) && fieldDef.axis) {
      return fieldDef.axis;
    } else if (isMarkPropFieldOrDatumDef(fieldDef) && fieldDef.legend) {
      return fieldDef.legend;
    } else if (isFacetFieldDef(fieldDef) && fieldDef.header) {
      return fieldDef.header;
    }

    return undefined;
  }
  function defaultTitle(fieldDef, config) {
    return titleFormatter(fieldDef, config);
  }
  function getFormatMixins(fieldDef) {
    if (isStringFieldOrDatumDef(fieldDef)) {
      const {
        format,
        formatType
      } = fieldDef;
      return {
        format,
        formatType
      };
    } else {
      var _getGuide2;

      const guide = (_getGuide2 = getGuide(fieldDef)) !== null && _getGuide2 !== void 0 ? _getGuide2 : {};
      const {
        format,
        formatType
      } = guide;
      return {
        format,
        formatType
      };
    }
  }
  function defaultType$2(fieldDef, channel) {
    var _fieldDef$scale;

    switch (channel) {
      case 'latitude':
      case 'longitude':
        return 'quantitative';

      case 'row':
      case 'column':
      case 'facet':
      case 'shape':
      case 'strokeDash':
        return 'nominal';

      case 'order':
        return 'ordinal';
    }

    if (isSortableFieldDef(fieldDef) && vega.isArray(fieldDef.sort)) {
      return 'ordinal';
    }

    const {
      aggregate,
      bin,
      timeUnit
    } = fieldDef;

    if (timeUnit) {
      return 'temporal';
    }

    if (bin || aggregate && !isArgmaxDef(aggregate) && !isArgminDef(aggregate)) {
      return 'quantitative';
    }

    if (isScaleFieldDef(fieldDef) && (_fieldDef$scale = fieldDef.scale) !== null && _fieldDef$scale !== void 0 && _fieldDef$scale.type) {
      switch (SCALE_CATEGORY_INDEX[fieldDef.scale.type]) {
        case 'numeric':
        case 'discretizing':
          return 'quantitative';

        case 'time':
          return 'temporal';
      }
    }

    return 'nominal';
  }
  /**
   * Returns the fieldDef -- either from the outer channelDef or from the condition of channelDef.
   * @param channelDef
   */

  function getFieldDef(channelDef) {
    if (isFieldDef(channelDef)) {
      return channelDef;
    } else if (hasConditionalFieldDef(channelDef)) {
      return channelDef.condition;
    }

    return undefined;
  }
  function getFieldOrDatumDef(channelDef) {
    if (isFieldOrDatumDef(channelDef)) {
      return channelDef;
    } else if (hasConditionalFieldOrDatumDef(channelDef)) {
      return channelDef.condition;
    }

    return undefined;
  }
  /**
   * Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
   */

  function initChannelDef(channelDef, channel, config) {
    let opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (vega.isString(channelDef) || vega.isNumber(channelDef) || vega.isBoolean(channelDef)) {
      const primitiveType = vega.isString(channelDef) ? 'string' : vega.isNumber(channelDef) ? 'number' : 'boolean';
      warn(primitiveChannelDef(channel, primitiveType, channelDef));
      return {
        value: channelDef
      };
    } // If a fieldDef contains a field, we need type.


    if (isFieldOrDatumDef(channelDef)) {
      return initFieldOrDatumDef(channelDef, channel, config, opt);
    } else if (hasConditionalFieldOrDatumDef(channelDef)) {
      return { ...channelDef,
        // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
        condition: initFieldOrDatumDef(channelDef.condition, channel, config, opt)
      };
    }

    return channelDef;
  }
  function initFieldOrDatumDef(fd, channel, config, opt) {
    if (isStringFieldOrDatumDef(fd)) {
      const {
        format,
        formatType,
        ...rest
      } = fd;

      if (isCustomFormatType(formatType) && !config.customFormatTypes) {
        warn(customFormatTypeNotAllowed(channel));
        return initFieldOrDatumDef(rest, channel, config, opt);
      }
    } else {
      const guideType = isPositionFieldOrDatumDef(fd) ? 'axis' : isMarkPropFieldOrDatumDef(fd) ? 'legend' : isFacetFieldDef(fd) ? 'header' : null;

      if (guideType && fd[guideType]) {
        const {
          format,
          formatType,
          ...newGuide
        } = fd[guideType];

        if (isCustomFormatType(formatType) && !config.customFormatTypes) {
          warn(customFormatTypeNotAllowed(channel));
          return initFieldOrDatumDef({ ...fd,
            [guideType]: newGuide
          }, channel, config, opt);
        }
      }
    }

    if (isFieldDef(fd)) {
      return initFieldDef(fd, channel, opt);
    }

    return initDatumDef(fd);
  }

  function initDatumDef(datumDef) {
    let type = datumDef['type'];

    if (type) {
      return datumDef;
    }

    const {
      datum
    } = datumDef;
    type = vega.isNumber(datum) ? 'quantitative' : vega.isString(datum) ? 'nominal' : isDateTime(datum) ? 'temporal' : undefined;
    return { ...datumDef,
      type
    };
  }

  function initFieldDef(fd, channel) {
    let {
      compositeMark = false
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      aggregate,
      timeUnit,
      bin,
      field
    } = fd;
    const fieldDef = { ...fd
    }; // Drop invalid aggregate

    if (!compositeMark && aggregate && !isAggregateOp(aggregate) && !isArgmaxDef(aggregate) && !isArgminDef(aggregate)) {
      warn(invalidAggregate(aggregate));
      delete fieldDef.aggregate;
    } // Normalize Time Unit


    if (timeUnit) {
      fieldDef.timeUnit = normalizeTimeUnit(timeUnit);
    }

    if (field) {
      fieldDef.field = "".concat(field);
    } // Normalize bin


    if (isBinning(bin)) {
      fieldDef.bin = normalizeBin(bin, channel);
    }

    if (isBinned(bin) && !isXorY(channel)) {
      warn(channelShouldNotBeUsedForBinned(channel));
    } // Normalize Type


    if (isTypedFieldDef(fieldDef)) {
      const {
        type
      } = fieldDef;
      const fullType = getFullName(type);

      if (type !== fullType) {
        // convert short type to full type
        fieldDef.type = fullType;
      }

      if (type !== 'quantitative') {
        if (isCountingAggregateOp(aggregate)) {
          warn(invalidFieldTypeForCountAggregate(type, aggregate));
          fieldDef.type = 'quantitative';
        }
      }
    } else if (!isSecondaryRangeChannel(channel)) {
      // If type is empty / invalid, then augment with default type
      const newType = defaultType$2(fieldDef, channel);
      fieldDef['type'] = newType;
    }

    if (isTypedFieldDef(fieldDef)) {
      const {
        compatible,
        warning
      } = channelCompatibility(fieldDef, channel) || {};

      if (compatible === false) {
        warn(warning);
      }
    }

    if (isSortableFieldDef(fieldDef) && vega.isString(fieldDef.sort)) {
      const {
        sort
      } = fieldDef;

      if (isSortByChannel(sort)) {
        return { ...fieldDef,
          sort: {
            encoding: sort
          }
        };
      }

      const sub = sort.substr(1);

      if (sort.charAt(0) === '-' && isSortByChannel(sub)) {
        return { ...fieldDef,
          sort: {
            encoding: sub,
            order: 'descending'
          }
        };
      }
    }

    if (isFacetFieldDef(fieldDef)) {
      const {
        header
      } = fieldDef;

      if (header) {
        const {
          orient,
          ...rest
        } = header;

        if (orient) {
          return { ...fieldDef,
            header: { ...rest,
              labelOrient: header.labelOrient || orient,
              titleOrient: header.titleOrient || orient
            }
          };
        }
      }
    }

    return fieldDef;
  }
  function normalizeBin(bin, channel) {
    if (vega.isBoolean(bin)) {
      return {
        maxbins: autoMaxBins(channel)
      };
    } else if (bin === 'binned') {
      return {
        binned: true
      };
    } else if (!bin.maxbins && !bin.step) {
      return { ...bin,
        maxbins: autoMaxBins(channel)
      };
    } else {
      return bin;
    }
  }
  const COMPATIBLE = {
    compatible: true
  };
  function channelCompatibility(fieldDef, channel) {
    const type = fieldDef.type;

    if (type === 'geojson' && channel !== 'shape') {
      return {
        compatible: false,
        warning: "Channel ".concat(channel, " should not be used with a geojson data.")
      };
    }

    switch (channel) {
      case ROW:
      case COLUMN:
      case FACET:
        if (!isDiscrete(fieldDef)) {
          return {
            compatible: false,
            warning: channelShouldBeDiscrete(channel)
          };
        }

        return COMPATIBLE;

      case X:
      case Y:
      case XOFFSET:
      case YOFFSET:
      case COLOR:
      case FILL:
      case STROKE:
      case TEXT$1:
      case DETAIL:
      case KEY:
      case TOOLTIP:
      case HREF:
      case URL:
      case ANGLE:
      case THETA:
      case RADIUS:
      case DESCRIPTION:
        return COMPATIBLE;

      case LONGITUDE:
      case LONGITUDE2:
      case LATITUDE:
      case LATITUDE2:
        if (type !== QUANTITATIVE) {
          return {
            compatible: false,
            warning: "Channel ".concat(channel, " should be used with a quantitative field only, not ").concat(fieldDef.type, " field.")
          };
        }

        return COMPATIBLE;

      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
      case STROKEWIDTH:
      case SIZE:
      case THETA2:
      case RADIUS2:
      case X2:
      case Y2:
        if (type === 'nominal' && !fieldDef['sort']) {
          return {
            compatible: false,
            warning: "Channel ".concat(channel, " should not be used with an unsorted discrete field.")
          };
        }

        return COMPATIBLE;

      case SHAPE:
      case STROKEDASH:
        if (!isDiscrete(fieldDef) && !isDiscretizing(fieldDef)) {
          return {
            compatible: false,
            warning: channelShouldBeDiscreteOrDiscretizing(channel)
          };
        }

        return COMPATIBLE;

      case ORDER:
        if (fieldDef.type === 'nominal' && !('sort' in fieldDef)) {
          return {
            compatible: false,
            warning: "Channel order is inappropriate for nominal field, which has no inherent order."
          };
        }

        return COMPATIBLE;
    }
  }
  /**
   * Check if the field def uses a time format or does not use any format but is temporal
   * (this does not cover field defs that are temporal but use a number format).
   */

  function isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) {
    const {
      formatType
    } = getFormatMixins(fieldOrDatumDef);
    return formatType === 'time' || !formatType && isTimeFieldDef(fieldOrDatumDef);
  }
  /**
   * Check if field def has type `temporal`. If you want to also cover field defs that use a time format, use `isTimeFormatFieldDef`.
   */

  function isTimeFieldDef(def) {
    return def && (def['type'] === 'temporal' || isFieldDef(def) && !!def.timeUnit);
  }
  /**
   * Getting a value associated with a fielddef.
   * Convert the value to Vega expression if applicable (for datetime object, or string if the field def is temporal or has timeUnit)
   */

  function valueExpr(v, _ref5) {
    var _normalizeTimeUnit2;

    let {
      timeUnit,
      type,
      wrapTime,
      undefinedIfExprNotRequired
    } = _ref5;
    const unit = timeUnit && ((_normalizeTimeUnit2 = normalizeTimeUnit(timeUnit)) === null || _normalizeTimeUnit2 === void 0 ? void 0 : _normalizeTimeUnit2.unit);
    let isTime = unit || type === 'temporal';
    let expr;

    if (isExprRef(v)) {
      expr = v.expr;
    } else if (isSignalRef(v)) {
      expr = v.signal;
    } else if (isDateTime(v)) {
      isTime = true;
      expr = dateTimeToExpr(v);
    } else if (vega.isString(v) || vega.isNumber(v)) {
      if (isTime) {
        expr = "datetime(".concat(stringify(v), ")");

        if (isLocalSingleTimeUnit(unit)) {
          // for single timeUnit, we will use dateTimeToExpr to convert number/string to match the timeUnit
          if (vega.isNumber(v) && v < 10000 || vega.isString(v) && isNaN(Date.parse(v))) {
            expr = dateTimeToExpr({
              [unit]: v
            });
          }
        }
      }
    }

    if (expr) {
      return wrapTime && isTime ? "time(".concat(expr, ")") : expr;
    } // number or boolean or normal string


    return undefinedIfExprNotRequired ? undefined : stringify(v);
  }
  /**
   * Standardize value array -- convert each value to Vega expression if applicable
   */

  function valueArray(fieldOrDatumDef, values) {
    const {
      type
    } = fieldOrDatumDef;
    return values.map(v => {
      const expr = valueExpr(v, {
        timeUnit: isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.timeUnit : undefined,
        type,
        undefinedIfExprNotRequired: true
      }); // return signal for the expression if we need an expression

      if (expr !== undefined) {
        return {
          signal: expr
        };
      } // otherwise just return the original value


      return v;
    });
  }
  /**
   * Checks whether a fieldDef for a particular channel requires a computed bin range.
   */

  function binRequiresRange(fieldDef, channel) {
    if (!isBinning(fieldDef.bin)) {
      console.warn('Only call this method for binned field defs.');
      return false;
    } // We need the range only when the user explicitly forces a binned field to be use discrete scale. In this case, bin range is used in axis and legend labels.
    // We could check whether the axis or legend exists (not disabled) but that seems overkill.


    return isScaleChannel(channel) && ['ordinal', 'nominal'].includes(fieldDef.type);
  }

  const CONDITIONAL_AXIS_PROP_INDEX = {
    labelAlign: {
      part: 'labels',
      vgProp: 'align'
    },
    labelBaseline: {
      part: 'labels',
      vgProp: 'baseline'
    },
    labelColor: {
      part: 'labels',
      vgProp: 'fill'
    },
    labelFont: {
      part: 'labels',
      vgProp: 'font'
    },
    labelFontSize: {
      part: 'labels',
      vgProp: 'fontSize'
    },
    labelFontStyle: {
      part: 'labels',
      vgProp: 'fontStyle'
    },
    labelFontWeight: {
      part: 'labels',
      vgProp: 'fontWeight'
    },
    labelOpacity: {
      part: 'labels',
      vgProp: 'opacity'
    },
    labelOffset: null,
    labelPadding: null,
    // There is no fixed vgProp for tickSize, need to use signal.
    gridColor: {
      part: 'grid',
      vgProp: 'stroke'
    },
    gridDash: {
      part: 'grid',
      vgProp: 'strokeDash'
    },
    gridDashOffset: {
      part: 'grid',
      vgProp: 'strokeDashOffset'
    },
    gridOpacity: {
      part: 'grid',
      vgProp: 'opacity'
    },
    gridWidth: {
      part: 'grid',
      vgProp: 'strokeWidth'
    },
    tickColor: {
      part: 'ticks',
      vgProp: 'stroke'
    },
    tickDash: {
      part: 'ticks',
      vgProp: 'strokeDash'
    },
    tickDashOffset: {
      part: 'ticks',
      vgProp: 'strokeDashOffset'
    },
    tickOpacity: {
      part: 'ticks',
      vgProp: 'opacity'
    },
    tickSize: null,
    // There is no fixed vgProp for tickSize, need to use signal.
    tickWidth: {
      part: 'ticks',
      vgProp: 'strokeWidth'
    }
  };
  function isConditionalAxisValue(v) {
    return v && v['condition'];
  }
  const AXIS_PARTS = ['domain', 'grid', 'labels', 'ticks', 'title'];
  /**
   * A dictionary listing whether a certain axis property is applicable for only main axes or only grid axes.
   */

  const AXIS_PROPERTY_TYPE = {
    grid: 'grid',
    gridCap: 'grid',
    gridColor: 'grid',
    gridDash: 'grid',
    gridDashOffset: 'grid',
    gridOpacity: 'grid',
    gridScale: 'grid',
    gridWidth: 'grid',
    orient: 'main',
    bandPosition: 'both',
    // Need to be applied to grid axis too, so the grid will align with ticks.
    aria: 'main',
    description: 'main',
    domain: 'main',
    domainCap: 'main',
    domainColor: 'main',
    domainDash: 'main',
    domainDashOffset: 'main',
    domainOpacity: 'main',
    domainWidth: 'main',
    format: 'main',
    formatType: 'main',
    labelAlign: 'main',
    labelAngle: 'main',
    labelBaseline: 'main',
    labelBound: 'main',
    labelColor: 'main',
    labelFlush: 'main',
    labelFlushOffset: 'main',
    labelFont: 'main',
    labelFontSize: 'main',
    labelFontStyle: 'main',
    labelFontWeight: 'main',
    labelLimit: 'main',
    labelLineHeight: 'main',
    labelOffset: 'main',
    labelOpacity: 'main',
    labelOverlap: 'main',
    labelPadding: 'main',
    labels: 'main',
    labelSeparation: 'main',
    maxExtent: 'main',
    minExtent: 'main',
    offset: 'both',
    position: 'main',
    tickCap: 'main',
    tickColor: 'main',
    tickDash: 'main',
    tickDashOffset: 'main',
    tickMinStep: 'both',
    tickOffset: 'both',
    // Need to be applied to grid axis too, so the grid will align with ticks.
    tickOpacity: 'main',
    tickRound: 'both',
    // Apply rounding to grid and ticks so they are aligned.
    ticks: 'main',
    tickSize: 'main',
    tickWidth: 'both',
    title: 'main',
    titleAlign: 'main',
    titleAnchor: 'main',
    titleAngle: 'main',
    titleBaseline: 'main',
    titleColor: 'main',
    titleFont: 'main',
    titleFontSize: 'main',
    titleFontStyle: 'main',
    titleFontWeight: 'main',
    titleLimit: 'main',
    titleLineHeight: 'main',
    titleOpacity: 'main',
    titlePadding: 'main',
    titleX: 'main',
    titleY: 'main',
    encode: 'both',
    // we hide this in Vega-Lite
    scale: 'both',
    tickBand: 'both',
    tickCount: 'both',
    tickExtra: 'both',
    translate: 'both',
    values: 'both',
    zindex: 'both' // this is actually set afterward, so it doesn't matter

  };
  const COMMON_AXIS_PROPERTIES_INDEX = {
    orient: 1,
    // other things can depend on orient
    aria: 1,
    bandPosition: 1,
    description: 1,
    domain: 1,
    domainCap: 1,
    domainColor: 1,
    domainDash: 1,
    domainDashOffset: 1,
    domainOpacity: 1,
    domainWidth: 1,
    format: 1,
    formatType: 1,
    grid: 1,
    gridCap: 1,
    gridColor: 1,
    gridDash: 1,
    gridDashOffset: 1,
    gridOpacity: 1,
    gridWidth: 1,
    labelAlign: 1,
    labelAngle: 1,
    labelBaseline: 1,
    labelBound: 1,
    labelColor: 1,
    labelFlush: 1,
    labelFlushOffset: 1,
    labelFont: 1,
    labelFontSize: 1,
    labelFontStyle: 1,
    labelFontWeight: 1,
    labelLimit: 1,
    labelLineHeight: 1,
    labelOffset: 1,
    labelOpacity: 1,
    labelOverlap: 1,
    labelPadding: 1,
    labels: 1,
    labelSeparation: 1,
    maxExtent: 1,
    minExtent: 1,
    offset: 1,
    position: 1,
    tickBand: 1,
    tickCap: 1,
    tickColor: 1,
    tickCount: 1,
    tickDash: 1,
    tickDashOffset: 1,
    tickExtra: 1,
    tickMinStep: 1,
    tickOffset: 1,
    tickOpacity: 1,
    tickRound: 1,
    ticks: 1,
    tickSize: 1,
    tickWidth: 1,
    title: 1,
    titleAlign: 1,
    titleAnchor: 1,
    titleAngle: 1,
    titleBaseline: 1,
    titleColor: 1,
    titleFont: 1,
    titleFontSize: 1,
    titleFontStyle: 1,
    titleFontWeight: 1,
    titleLimit: 1,
    titleLineHeight: 1,
    titleOpacity: 1,
    titlePadding: 1,
    titleX: 1,
    titleY: 1,
    translate: 1,
    values: 1,
    zindex: 1
  };
  const AXIS_PROPERTIES_INDEX = { ...COMMON_AXIS_PROPERTIES_INDEX,
    style: 1,
    labelExpr: 1,
    encoding: 1
  };
  function isAxisProperty(prop) {
    return !!AXIS_PROPERTIES_INDEX[prop];
  } // Export for dependent projects
  const AXIS_CONFIGS_INDEX = {
    axis: 1,
    axisBand: 1,
    axisBottom: 1,
    axisDiscrete: 1,
    axisLeft: 1,
    axisPoint: 1,
    axisQuantitative: 1,
    axisRight: 1,
    axisTemporal: 1,
    axisTop: 1,
    axisX: 1,
    axisXBand: 1,
    axisXDiscrete: 1,
    axisXPoint: 1,
    axisXQuantitative: 1,
    axisXTemporal: 1,
    axisY: 1,
    axisYBand: 1,
    axisYDiscrete: 1,
    axisYPoint: 1,
    axisYQuantitative: 1,
    axisYTemporal: 1
  };
  const AXIS_CONFIGS = keys(AXIS_CONFIGS_INDEX);

  /**
   * Base interface for a unit (single-view) specification.
   */

  /**
   * A unit specification without any shortcut/expansion syntax.
   */

  /**
   * A unit specification, which can contain either [primitive marks or composite marks](https://vega.github.io/vega-lite/docs/mark.html#types).
   */

  /**
   * Unit spec that can have a composite mark and row or column channels (shorthand for a facet spec).
   */
  function isUnitSpec(spec) {
    return 'mark' in spec;
  }

  class CompositeMarkNormalizer {
    constructor(name, run) {
      this.name = name;
      this.run = run;
    }

    hasMatchingType(spec) {
      if (isUnitSpec(spec)) {
        return getMarkType(spec.mark) === this.name;
      }

      return false;
    }

  }

  function channelHasField(encoding, channel) {
    const channelDef = encoding && encoding[channel];

    if (channelDef) {
      if (vega.isArray(channelDef)) {
        return some(channelDef, fieldDef => !!fieldDef.field);
      } else {
        return isFieldDef(channelDef) || hasConditionalFieldDef(channelDef);
      }
    }

    return false;
  }
  function channelHasFieldOrDatum(encoding, channel) {
    const channelDef = encoding && encoding[channel];

    if (channelDef) {
      if (vega.isArray(channelDef)) {
        return some(channelDef, fieldDef => !!fieldDef.field);
      } else {
        return isFieldDef(channelDef) || isDatumDef(channelDef) || hasConditionalFieldOrDatumDef(channelDef);
      }
    }

    return false;
  }
  function channelHasNestedOffsetScale(encoding, channel) {
    if (isXorY(channel)) {
      const fieldDef = encoding[channel];

      if ((isFieldDef(fieldDef) || isDatumDef(fieldDef)) && isDiscrete$1(fieldDef.type)) {
        const offsetChannel = getOffsetScaleChannel(channel);
        return channelHasFieldOrDatum(encoding, offsetChannel);
      }
    }

    return false;
  }
  function isAggregate$1(encoding) {
    return some(CHANNELS, channel => {
      if (channelHasField(encoding, channel)) {
        const channelDef = encoding[channel];

        if (vega.isArray(channelDef)) {
          return some(channelDef, fieldDef => !!fieldDef.aggregate);
        } else {
          const fieldDef = getFieldDef(channelDef);
          return fieldDef && !!fieldDef.aggregate;
        }
      }

      return false;
    });
  }
  function extractTransformsFromEncoding(oldEncoding, config) {
    const groupby = [];
    const bins = [];
    const timeUnits = [];
    const aggregate = [];
    const encoding = {};
    forEach(oldEncoding, (channelDef, channel) => {
      // Extract potential embedded transformations along with remaining properties
      if (isFieldDef(channelDef)) {
        const {
          field,
          aggregate: aggOp,
          bin,
          timeUnit,
          ...remaining
        } = channelDef;

        if (aggOp || timeUnit || bin) {
          const guide = getGuide(channelDef);
          const isTitleDefined = guide === null || guide === void 0 ? void 0 : guide.title;
          let newField = vgField(channelDef, {
            forAs: true
          });
          const newFieldDef = { // Only add title if it doesn't exist
            ...(isTitleDefined ? [] : {
              title: title(channelDef, config, {
                allowDisabling: true
              })
            }),
            ...remaining,
            // Always overwrite field
            field: newField
          };

          if (aggOp) {
            let op;

            if (isArgmaxDef(aggOp)) {
              op = 'argmax';
              newField = vgField({
                op: 'argmax',
                field: aggOp.argmax
              }, {
                forAs: true
              });
              newFieldDef.field = "".concat(newField, ".").concat(field);
            } else if (isArgminDef(aggOp)) {
              op = 'argmin';
              newField = vgField({
                op: 'argmin',
                field: aggOp.argmin
              }, {
                forAs: true
              });
              newFieldDef.field = "".concat(newField, ".").concat(field);
            } else if (aggOp !== 'boxplot' && aggOp !== 'errorbar' && aggOp !== 'errorband') {
              op = aggOp;
            }

            if (op) {
              const aggregateEntry = {
                op,
                as: newField
              };

              if (field) {
                aggregateEntry.field = field;
              }

              aggregate.push(aggregateEntry);
            }
          } else {
            groupby.push(newField);

            if (isTypedFieldDef(channelDef) && isBinning(bin)) {
              bins.push({
                bin,
                field,
                as: newField
              }); // Add additional groupbys for range and end of bins

              groupby.push(vgField(channelDef, {
                binSuffix: 'end'
              }));

              if (binRequiresRange(channelDef, channel)) {
                groupby.push(vgField(channelDef, {
                  binSuffix: 'range'
                }));
              } // Create accompanying 'x2' or 'y2' field if channel is 'x' or 'y' respectively


              if (isXorY(channel)) {
                const secondaryChannel = {
                  field: "".concat(newField, "_end")
                };
                encoding["".concat(channel, "2")] = secondaryChannel;
              }

              newFieldDef.bin = 'binned';

              if (!isSecondaryRangeChannel(channel)) {
                newFieldDef['type'] = QUANTITATIVE;
              }
            } else if (timeUnit) {
              timeUnits.push({
                timeUnit,
                field,
                as: newField
              }); // define the format type for later compilation

              const formatType = isTypedFieldDef(channelDef) && channelDef.type !== TEMPORAL && 'time';

              if (formatType) {
                if (channel === TEXT$1 || channel === TOOLTIP) {
                  newFieldDef['formatType'] = formatType;
                } else if (isNonPositionScaleChannel(channel)) {
                  newFieldDef['legend'] = {
                    formatType,
                    ...newFieldDef['legend']
                  };
                } else if (isXorY(channel)) {
                  newFieldDef['axis'] = {
                    formatType,
                    ...newFieldDef['axis']
                  };
                }
              }
            }
          } // now the field should refer to post-transformed field instead


          encoding[channel] = newFieldDef;
        } else {
          groupby.push(field);
          encoding[channel] = oldEncoding[channel];
        }
      } else {
        // For value def / signal ref / datum def, just copy
        encoding[channel] = oldEncoding[channel];
      }
    });
    return {
      bins,
      timeUnits,
      aggregate,
      groupby,
      encoding
    };
  }
  function markChannelCompatible(encoding, channel, mark) {
    const markSupported = supportMark(channel, mark);

    if (!markSupported) {
      return false;
    } else if (markSupported === 'binned') {
      const primaryFieldDef = encoding[channel === X2 ? X : Y]; // circle, point, square and tick only support x2/y2 when their corresponding x/y fieldDef
      // has "binned" data and thus need x2/y2 to specify the bin-end field.

      if (isFieldDef(primaryFieldDef) && isFieldDef(encoding[channel]) && isBinned(primaryFieldDef.bin)) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
  function initEncoding(encoding, mark, filled, config) {
    const normalizedEncoding = {};

    for (const key of keys(encoding)) {
      if (!isChannel(key)) {
        // Drop invalid channel
        warn(invalidEncodingChannel(key));
      }
    }

    for (let channel of UNIT_CHANNELS) {
      if (!encoding[channel]) {
        continue;
      }

      const channelDef = encoding[channel];

      if (isXorYOffset(channel)) {
        const mainChannel = getMainChannelFromOffsetChannel(channel);
        const positionDef = normalizedEncoding[mainChannel];

        if (isFieldDef(positionDef)) {
          if (isContinuous(positionDef.type)) {
            if (isFieldDef(channelDef)) {
              // TODO: nesting continuous field instead continuous field should
              // behave like offsetting the data in data domain
              warn(offsetNestedInsideContinuousPositionScaleDropped(mainChannel));
              continue;
            }
          }
        } else {
          // no x/y, replace it with main channel
          channel = mainChannel;
          warn(replaceOffsetWithMainChannel(mainChannel));
        }
      }

      if (channel === 'angle' && mark === 'arc' && !encoding.theta) {
        warn(REPLACE_ANGLE_WITH_THETA);
        channel = THETA;
      }

      if (!markChannelCompatible(encoding, channel, mark)) {
        // Drop unsupported channel
        warn(incompatibleChannel(channel, mark));
        continue;
      } // Drop line's size if the field is aggregated.


      if (channel === SIZE && mark === 'line') {
        const fieldDef = getFieldDef(encoding[channel]);

        if (fieldDef !== null && fieldDef !== void 0 && fieldDef.aggregate) {
          warn(LINE_WITH_VARYING_SIZE);
          continue;
        }
      } // Drop color if either fill or stroke is specified


      if (channel === COLOR && (filled ? 'fill' in encoding : 'stroke' in encoding)) {
        warn(droppingColor('encoding', {
          fill: 'fill' in encoding,
          stroke: 'stroke' in encoding
        }));
        continue;
      }

      if (channel === DETAIL || channel === ORDER && !vega.isArray(channelDef) && !isValueDef(channelDef) || channel === TOOLTIP && vega.isArray(channelDef)) {
        if (channelDef) {
          // Array of fieldDefs for detail channel (or production rule)
          normalizedEncoding[channel] = vega.array(channelDef).reduce((defs, fieldDef) => {
            if (!isFieldDef(fieldDef)) {
              warn(emptyFieldDef(fieldDef, channel));
            } else {
              defs.push(initFieldDef(fieldDef, channel));
            }

            return defs;
          }, []);
        }
      } else {
        if (channel === TOOLTIP && channelDef === null) {
          // Preserve null so we can use it to disable tooltip
          normalizedEncoding[channel] = null;
        } else if (!isFieldDef(channelDef) && !isDatumDef(channelDef) && !isValueDef(channelDef) && !isConditionalDef(channelDef) && !isSignalRef(channelDef)) {
          warn(emptyFieldDef(channelDef, channel));
          continue;
        }

        normalizedEncoding[channel] = initChannelDef(channelDef, channel, config);
      }
    }

    return normalizedEncoding;
  }
  /**
   * For composite marks, we have to call initChannelDef during init so we can infer types earlier.
   */

  function normalizeEncoding(encoding, config) {
    const normalizedEncoding = {};

    for (const channel of keys(encoding)) {
      const newChannelDef = initChannelDef(encoding[channel], channel, config, {
        compositeMark: true
      });
      normalizedEncoding[channel] = newChannelDef;
    }

    return normalizedEncoding;
  }
  function fieldDefs(encoding) {
    const arr = [];

    for (const channel of keys(encoding)) {
      if (channelHasField(encoding, channel)) {
        const channelDef = encoding[channel];
        const channelDefArray = vega.array(channelDef);

        for (const def of channelDefArray) {
          if (isFieldDef(def)) {
            arr.push(def);
          } else if (hasConditionalFieldDef(def)) {
            arr.push(def.condition);
          }
        }
      }
    }

    return arr;
  }
  function forEach(mapping, f, thisArg) {
    if (!mapping) {
      return;
    }

    for (const channel of keys(mapping)) {
      const el = mapping[channel];

      if (vega.isArray(el)) {
        for (const channelDef of el) {
          f.call(thisArg, channelDef, channel);
        }
      } else {
        f.call(thisArg, el, channel);
      }
    }
  }
  function reduce(mapping, f, init, thisArg) {
    if (!mapping) {
      return init;
    }

    return keys(mapping).reduce((r, channel) => {
      const map = mapping[channel];

      if (vega.isArray(map)) {
        return map.reduce((r1, channelDef) => {
          return f.call(thisArg, r1, channelDef, channel);
        }, r);
      } else {
        return f.call(thisArg, r, map, channel);
      }
    }, init);
  }
  /**
   * Returns list of path grouping fields for the given encoding
   */

  function pathGroupingFields(mark, encoding) {
    return keys(encoding).reduce((details, channel) => {
      switch (channel) {
        // x, y, x2, y2, lat, long, lat1, long2, order, tooltip, href, aria label, cursor should not cause lines to group
        case X:
        case Y:
        case HREF:
        case DESCRIPTION:
        case URL:
        case X2:
        case Y2:
        case XOFFSET:
        case YOFFSET:
        case THETA:
        case THETA2:
        case RADIUS:
        case RADIUS2: // falls through

        case LATITUDE:
        case LONGITUDE:
        case LATITUDE2:
        case LONGITUDE2: // TODO: case 'cursor':
        // text, shape, shouldn't be a part of line/trail/area [falls through]

        case TEXT$1:
        case SHAPE:
        case ANGLE: // falls through
        // tooltip fields should not be added to group by [falls through]

        case TOOLTIP:
          return details;

        case ORDER:
          // order should not group line / trail
          if (mark === 'line' || mark === 'trail') {
            return details;
          }

        // but order should group area for stacking (falls through)

        case DETAIL:
        case KEY:
          {
            const channelDef = encoding[channel];

            if (vega.isArray(channelDef) || isFieldDef(channelDef)) {
              for (const fieldDef of vega.array(channelDef)) {
                if (!fieldDef.aggregate) {
                  details.push(vgField(fieldDef, {}));
                }
              }
            }

            return details;
          }

        case SIZE:
          if (mark === 'trail') {
            // For trail, size should not group trail lines.
            return details;
          }

        // For line, size should group lines.
        // falls through

        case COLOR:
        case FILL:
        case STROKE:
        case OPACITY:
        case FILLOPACITY:
        case STROKEOPACITY:
        case STROKEDASH:
        case STROKEWIDTH:
          {
            // TODO strokeDashOffset:
            // falls through
            const fieldDef = getFieldDef(encoding[channel]);

            if (fieldDef && !fieldDef.aggregate) {
              details.push(vgField(fieldDef, {}));
            }

            return details;
          }
      }
    }, []);
  }

  function filterTooltipWithAggregatedField(oldEncoding) {
    const {
      tooltip,
      ...filteredEncoding
    } = oldEncoding;

    if (!tooltip) {
      return {
        filteredEncoding
      };
    }

    let customTooltipWithAggregatedField;
    let customTooltipWithoutAggregatedField;

    if (vega.isArray(tooltip)) {
      for (const t of tooltip) {
        if (t.aggregate) {
          if (!customTooltipWithAggregatedField) {
            customTooltipWithAggregatedField = [];
          }

          customTooltipWithAggregatedField.push(t);
        } else {
          if (!customTooltipWithoutAggregatedField) {
            customTooltipWithoutAggregatedField = [];
          }

          customTooltipWithoutAggregatedField.push(t);
        }
      }

      if (customTooltipWithAggregatedField) {
        filteredEncoding.tooltip = customTooltipWithAggregatedField;
      }
    } else {
      if (tooltip['aggregate']) {
        filteredEncoding.tooltip = tooltip;
      } else {
        customTooltipWithoutAggregatedField = tooltip;
      }
    }

    if (vega.isArray(customTooltipWithoutAggregatedField) && customTooltipWithoutAggregatedField.length === 1) {
      customTooltipWithoutAggregatedField = customTooltipWithoutAggregatedField[0];
    }

    return {
      customTooltipWithoutAggregatedField,
      filteredEncoding
    };
  }
  function getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis) {
    let withFieldName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if ('tooltip' in encodingWithoutContinuousAxis) {
      return {
        tooltip: encodingWithoutContinuousAxis.tooltip
      };
    }

    const fiveSummaryTooltip = tooltipSummary.map(_ref => {
      let {
        fieldPrefix,
        titlePrefix
      } = _ref;
      const mainTitle = withFieldName ? " of ".concat(getTitle(continuousAxisChannelDef)) : '';
      return {
        field: fieldPrefix + continuousAxisChannelDef.field,
        type: continuousAxisChannelDef.type,
        title: isSignalRef(titlePrefix) ? {
          signal: "".concat(titlePrefix, "\"").concat(escape(mainTitle), "\"")
        } : titlePrefix + mainTitle
      };
    });
    const tooltipFieldDefs = fieldDefs(encodingWithoutContinuousAxis).map(toStringFieldDef);
    return {
      tooltip: [...fiveSummaryTooltip, // need to cast because TextFieldDef supports fewer types of bin
      ...unique(tooltipFieldDefs, hash)]
    };
  }
  function getTitle(continuousAxisChannelDef) {
    const {
      title,
      field
    } = continuousAxisChannelDef;
    return getFirstDefined(title, field);
  }
  function makeCompositeAggregatePartFactory(compositeMarkDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, compositeMarkConfig) {
    const {
      scale,
      axis
    } = continuousAxisChannelDef;
    return _ref2 => {
      let {
        partName,
        mark,
        positionPrefix,
        endPositionPrefix = undefined,
        extraEncoding = {}
      } = _ref2;
      const title = getTitle(continuousAxisChannelDef);
      return partLayerMixins(compositeMarkDef, partName, compositeMarkConfig, {
        mark,
        // TODO better remove this method and just have mark as a parameter of the method
        encoding: {
          [continuousAxis]: {
            field: "".concat(positionPrefix, "_").concat(continuousAxisChannelDef.field),
            type: continuousAxisChannelDef.type,
            ...(title !== undefined ? {
              title
            } : {}),
            ...(scale !== undefined ? {
              scale
            } : {}),
            ...(axis !== undefined ? {
              axis
            } : {})
          },
          ...(vega.isString(endPositionPrefix) ? {
            ["".concat(continuousAxis, "2")]: {
              field: "".concat(endPositionPrefix, "_").concat(continuousAxisChannelDef.field)
            }
          } : {}),
          ...sharedEncoding,
          ...extraEncoding
        }
      });
    };
  }
  function partLayerMixins(markDef, part, compositeMarkConfig, partBaseSpec) {
    const {
      clip,
      color,
      opacity
    } = markDef;
    const mark = markDef.type;

    if (markDef[part] || markDef[part] === undefined && compositeMarkConfig[part]) {
      return [{ ...partBaseSpec,
        mark: { ...compositeMarkConfig[part],
          ...(clip ? {
            clip
          } : {}),
          ...(color ? {
            color
          } : {}),
          ...(opacity ? {
            opacity
          } : {}),
          ...(isMarkDef(partBaseSpec.mark) ? partBaseSpec.mark : {
            type: partBaseSpec.mark
          }),
          style: "".concat(mark, "-").concat(part),
          ...(vega.isBoolean(markDef[part]) ? {} : markDef[part])
        }
      }];
    }

    return [];
  }
  function compositeMarkContinuousAxis(spec, orient, compositeMark) {
    const {
      encoding
    } = spec;
    const continuousAxis = orient === 'vertical' ? 'y' : 'x';
    const continuousAxisChannelDef = encoding[continuousAxis]; // Safe to cast because if x is not continuous fielddef, the orient would not be horizontal.

    const continuousAxisChannelDef2 = encoding["".concat(continuousAxis, "2")];
    const continuousAxisChannelDefError = encoding["".concat(continuousAxis, "Error")];
    const continuousAxisChannelDefError2 = encoding["".concat(continuousAxis, "Error2")];
    return {
      continuousAxisChannelDef: filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark),
      continuousAxisChannelDef2: filterAggregateFromChannelDef(continuousAxisChannelDef2, compositeMark),
      continuousAxisChannelDefError: filterAggregateFromChannelDef(continuousAxisChannelDefError, compositeMark),
      continuousAxisChannelDefError2: filterAggregateFromChannelDef(continuousAxisChannelDefError2, compositeMark),
      continuousAxis
    };
  }

  function filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark) {
    if (continuousAxisChannelDef !== null && continuousAxisChannelDef !== void 0 && continuousAxisChannelDef.aggregate) {
      const {
        aggregate,
        ...continuousAxisWithoutAggregate
      } = continuousAxisChannelDef;

      if (aggregate !== compositeMark) {
        warn(errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark));
      }

      return continuousAxisWithoutAggregate;
    } else {
      return continuousAxisChannelDef;
    }
  }

  function compositeMarkOrient(spec, compositeMark) {
    const {
      mark,
      encoding
    } = spec;
    const {
      x,
      y
    } = encoding;

    if (isMarkDef(mark) && mark.orient) {
      return mark.orient;
    }

    if (isContinuousFieldOrDatumDef(x)) {
      // x is continuous
      if (isContinuousFieldOrDatumDef(y)) {
        // both x and y are continuous
        const xAggregate = isFieldDef(x) && x.aggregate;
        const yAggregate = isFieldDef(y) && y.aggregate;

        if (!xAggregate && yAggregate === compositeMark) {
          return 'vertical';
        } else if (!yAggregate && xAggregate === compositeMark) {
          return 'horizontal';
        } else if (xAggregate === compositeMark && yAggregate === compositeMark) {
          throw new Error('Both x and y cannot have aggregate');
        } else {
          if (isFieldOrDatumDefForTimeFormat(y) && !isFieldOrDatumDefForTimeFormat(x)) {
            // y is temporal but x is not
            return 'horizontal';
          } // default orientation for two continuous


          return 'vertical';
        }
      }

      return 'horizontal';
    } else if (isContinuousFieldOrDatumDef(y)) {
      // y is continuous but x is not
      return 'vertical';
    } else {
      // Neither x nor y is continuous.
      throw new Error("Need a valid continuous axis for ".concat(compositeMark, "s"));
    }
  }

  const BOXPLOT = 'boxplot';
  const BOXPLOT_PARTS = ['box', 'median', 'outliers', 'rule', 'ticks'];
  const boxPlotNormalizer = new CompositeMarkNormalizer(BOXPLOT, normalizeBoxPlot);
  function getBoxPlotType(extent) {
    if (vega.isNumber(extent)) {
      return 'tukey';
    } // Ham: If we ever want to, we could add another extent syntax `{kIQR: number}` for the original [Q1-k*IQR, Q3+k*IQR] whisker and call this boxPlotType = `kIQR`. However, I'm not exposing this for now.


    return extent;
  }
  function normalizeBoxPlot(spec, _ref) {
    var _markDef$extent;

    let {
      config
    } = _ref;
    // Need to initEncoding first so we can infer type
    spec = { ...spec,
      encoding: normalizeEncoding(spec.encoding, config)
    };
    const {
      mark,
      encoding: _encoding,
      params,
      projection: _p,
      ...outerSpec
    } = spec;
    const markDef = isMarkDef(mark) ? mark : {
      type: mark
    }; // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support

    if (params) {
      warn(selectionNotSupported('boxplot'));
    }

    const extent = (_markDef$extent = markDef.extent) !== null && _markDef$extent !== void 0 ? _markDef$extent : config.boxplot.extent;
    const sizeValue = getMarkPropOrConfig('size', markDef, // TODO: https://github.com/vega/vega-lite/issues/6245
    config);
    const boxPlotType = getBoxPlotType(extent);
    const {
      bins,
      timeUnits,
      transform,
      continuousAxisChannelDef,
      continuousAxis,
      groupby,
      aggregate,
      encodingWithoutContinuousAxis,
      ticksOrient,
      boxOrient,
      customTooltipWithoutAggregatedField
    } = boxParams(spec, extent, config);
    const {
      color,
      size,
      ...encodingWithoutSizeColorAndContinuousAxis
    } = encodingWithoutContinuousAxis;

    const makeBoxPlotPart = sharedEncoding => {
      return makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config.boxplot);
    };

    const makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis);
    const makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis);
    const makeBoxPlotMidTick = makeBoxPlotPart({ ...encodingWithoutSizeColorAndContinuousAxis,
      ...(size ? {
        size
      } : {})
    });
    const fiveSummaryTooltipEncoding = getCompositeMarkTooltip([{
      fieldPrefix: boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_',
      titlePrefix: 'Max'
    }, {
      fieldPrefix: 'upper_box_',
      titlePrefix: 'Q3'
    }, {
      fieldPrefix: 'mid_box_',
      titlePrefix: 'Median'
    }, {
      fieldPrefix: 'lower_box_',
      titlePrefix: 'Q1'
    }, {
      fieldPrefix: boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_',
      titlePrefix: 'Min'
    }], continuousAxisChannelDef, encodingWithoutContinuousAxis); // ## Whisker Layers

    const endTick = {
      type: 'tick',
      color: 'black',
      opacity: 1,
      orient: ticksOrient,
      invalid: null,
      aria: false
    };
    const whiskerTooltipEncoding = boxPlotType === 'min-max' ? fiveSummaryTooltipEncoding // for min-max, show five-summary tooltip for whisker
    : // for tukey / k-IQR, just show upper/lower-whisker
    getCompositeMarkTooltip([{
      fieldPrefix: 'upper_whisker_',
      titlePrefix: 'Upper Whisker'
    }, {
      fieldPrefix: 'lower_whisker_',
      titlePrefix: 'Lower Whisker'
    }], continuousAxisChannelDef, encodingWithoutContinuousAxis);
    const whiskerLayers = [...makeBoxPlotExtent({
      partName: 'rule',
      mark: {
        type: 'rule',
        invalid: null,
        aria: false
      },
      positionPrefix: 'lower_whisker',
      endPositionPrefix: 'lower_box',
      extraEncoding: whiskerTooltipEncoding
    }), ...makeBoxPlotExtent({
      partName: 'rule',
      mark: {
        type: 'rule',
        invalid: null,
        aria: false
      },
      positionPrefix: 'upper_box',
      endPositionPrefix: 'upper_whisker',
      extraEncoding: whiskerTooltipEncoding
    }), ...makeBoxPlotExtent({
      partName: 'ticks',
      mark: endTick,
      positionPrefix: 'lower_whisker',
      extraEncoding: whiskerTooltipEncoding
    }), ...makeBoxPlotExtent({
      partName: 'ticks',
      mark: endTick,
      positionPrefix: 'upper_whisker',
      extraEncoding: whiskerTooltipEncoding
    })]; // ## Box Layers
    // TODO: support hiding certain mark parts

    const boxLayers = [...(boxPlotType !== 'tukey' ? whiskerLayers : []), ...makeBoxPlotBox({
      partName: 'box',
      mark: {
        type: 'bar',
        ...(sizeValue ? {
          size: sizeValue
        } : {}),
        orient: boxOrient,
        invalid: null,
        ariaRoleDescription: 'box'
      },
      positionPrefix: 'lower_box',
      endPositionPrefix: 'upper_box',
      extraEncoding: fiveSummaryTooltipEncoding
    }), ...makeBoxPlotMidTick({
      partName: 'median',
      mark: {
        type: 'tick',
        invalid: null,
        ...(vega.isObject(config.boxplot.median) && config.boxplot.median.color ? {
          color: config.boxplot.median.color
        } : {}),
        ...(sizeValue ? {
          size: sizeValue
        } : {}),
        orient: ticksOrient,
        aria: false
      },
      positionPrefix: 'mid_box',
      extraEncoding: fiveSummaryTooltipEncoding
    })];

    if (boxPlotType === 'min-max') {
      var _outerSpec$transform;

      return { ...outerSpec,
        transform: ((_outerSpec$transform = outerSpec.transform) !== null && _outerSpec$transform !== void 0 ? _outerSpec$transform : []).concat(transform),
        layer: boxLayers
      };
    } // Tukey Box Plot


    const lowerBoxExpr = "datum[\"lower_box_".concat(continuousAxisChannelDef.field, "\"]");
    const upperBoxExpr = "datum[\"upper_box_".concat(continuousAxisChannelDef.field, "\"]");
    const iqrExpr = "(".concat(upperBoxExpr, " - ").concat(lowerBoxExpr, ")");
    const lowerWhiskerExpr = "".concat(lowerBoxExpr, " - ").concat(extent, " * ").concat(iqrExpr);
    const upperWhiskerExpr = "".concat(upperBoxExpr, " + ").concat(extent, " * ").concat(iqrExpr);
    const fieldExpr = "datum[\"".concat(continuousAxisChannelDef.field, "\"]");
    const joinaggregateTransform = {
      joinaggregate: boxParamsQuartiles(continuousAxisChannelDef.field),
      groupby
    };
    const filteredWhiskerSpec = {
      transform: [{
        filter: "(".concat(lowerWhiskerExpr, " <= ").concat(fieldExpr, ") && (").concat(fieldExpr, " <= ").concat(upperWhiskerExpr, ")")
      }, {
        aggregate: [{
          op: 'min',
          field: continuousAxisChannelDef.field,
          as: "lower_whisker_".concat(continuousAxisChannelDef.field)
        }, {
          op: 'max',
          field: continuousAxisChannelDef.field,
          as: "upper_whisker_".concat(continuousAxisChannelDef.field)
        }, // preserve lower_box / upper_box
        {
          op: 'min',
          field: "lower_box_".concat(continuousAxisChannelDef.field),
          as: "lower_box_".concat(continuousAxisChannelDef.field)
        }, {
          op: 'max',
          field: "upper_box_".concat(continuousAxisChannelDef.field),
          as: "upper_box_".concat(continuousAxisChannelDef.field)
        }, ...aggregate],
        groupby
      }],
      layer: whiskerLayers
    };
    const {
      tooltip,
      ...encodingWithoutSizeColorContinuousAxisAndTooltip
    } = encodingWithoutSizeColorAndContinuousAxis;
    const {
      scale,
      axis
    } = continuousAxisChannelDef;
    const title = getTitle(continuousAxisChannelDef);
    const axisWithoutTitle = omit(axis, ['title']);
    const outlierLayersMixins = partLayerMixins(markDef, 'outliers', config.boxplot, {
      transform: [{
        filter: "(".concat(fieldExpr, " < ").concat(lowerWhiskerExpr, ") || (").concat(fieldExpr, " > ").concat(upperWhiskerExpr, ")")
      }],
      mark: 'point',
      encoding: {
        [continuousAxis]: {
          field: continuousAxisChannelDef.field,
          type: continuousAxisChannelDef.type,
          ...(title !== undefined ? {
            title
          } : {}),
          ...(scale !== undefined ? {
            scale
          } : {}),
          // add axis without title since we already added the title above
          ...(isEmpty(axisWithoutTitle) ? {} : {
            axis: axisWithoutTitle
          })
        },
        ...encodingWithoutSizeColorContinuousAxisAndTooltip,
        ...(color ? {
          color
        } : {}),
        ...(customTooltipWithoutAggregatedField ? {
          tooltip: customTooltipWithoutAggregatedField
        } : {})
      }
    })[0];
    let filteredLayersMixins;
    const filteredLayersMixinsTransforms = [...bins, ...timeUnits, joinaggregateTransform];

    if (outlierLayersMixins) {
      filteredLayersMixins = {
        transform: filteredLayersMixinsTransforms,
        layer: [outlierLayersMixins, filteredWhiskerSpec]
      };
    } else {
      filteredLayersMixins = filteredWhiskerSpec;
      filteredLayersMixins.transform.unshift(...filteredLayersMixinsTransforms);
    }

    return { ...outerSpec,
      layer: [filteredLayersMixins, {
        // boxplot
        transform,
        layer: boxLayers
      }]
    };
  }

  function boxParamsQuartiles(continousAxisField) {
    return [{
      op: 'q1',
      field: continousAxisField,
      as: "lower_box_".concat(continousAxisField)
    }, {
      op: 'q3',
      field: continousAxisField,
      as: "upper_box_".concat(continousAxisField)
    }];
  }

  function boxParams(spec, extent, config) {
    const orient = compositeMarkOrient(spec, BOXPLOT);
    const {
      continuousAxisChannelDef,
      continuousAxis
    } = compositeMarkContinuousAxis(spec, orient, BOXPLOT);
    const continuousFieldName = continuousAxisChannelDef.field;
    const boxPlotType = getBoxPlotType(extent);
    const boxplotSpecificAggregate = [...boxParamsQuartiles(continuousFieldName), {
      op: 'median',
      field: continuousFieldName,
      as: "mid_box_".concat(continuousFieldName)
    }, {
      op: 'min',
      field: continuousFieldName,
      as: (boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_') + continuousFieldName
    }, {
      op: 'max',
      field: continuousFieldName,
      as: (boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_') + continuousFieldName
    }];
    const postAggregateCalculates = boxPlotType === 'min-max' || boxPlotType === 'tukey' ? [] : [// This is for the  original k-IQR, which we do not expose
    {
      calculate: "datum[\"upper_box_".concat(continuousFieldName, "\"] - datum[\"lower_box_").concat(continuousFieldName, "\"]"),
      as: "iqr_".concat(continuousFieldName)
    }, {
      calculate: "min(datum[\"upper_box_".concat(continuousFieldName, "\"] + datum[\"iqr_").concat(continuousFieldName, "\"] * ").concat(extent, ", datum[\"max_").concat(continuousFieldName, "\"])"),
      as: "upper_whisker_".concat(continuousFieldName)
    }, {
      calculate: "max(datum[\"lower_box_".concat(continuousFieldName, "\"] - datum[\"iqr_").concat(continuousFieldName, "\"] * ").concat(extent, ", datum[\"min_").concat(continuousFieldName, "\"])"),
      as: "lower_whisker_".concat(continuousFieldName)
    }];
    const {
      [continuousAxis]: oldContinuousAxisChannelDef,
      ...oldEncodingWithoutContinuousAxis
    } = spec.encoding;
    const {
      customTooltipWithoutAggregatedField,
      filteredEncoding
    } = filterTooltipWithAggregatedField(oldEncodingWithoutContinuousAxis);
    const {
      bins,
      timeUnits,
      aggregate,
      groupby,
      encoding: encodingWithoutContinuousAxis
    } = extractTransformsFromEncoding(filteredEncoding, config);
    const ticksOrient = orient === 'vertical' ? 'horizontal' : 'vertical';
    const boxOrient = orient;
    const transform = [...bins, ...timeUnits, {
      aggregate: [...aggregate, ...boxplotSpecificAggregate],
      groupby
    }, ...postAggregateCalculates];
    return {
      bins,
      timeUnits,
      transform,
      groupby,
      aggregate,
      continuousAxisChannelDef,
      continuousAxis,
      encodingWithoutContinuousAxis,
      ticksOrient,
      boxOrient,
      customTooltipWithoutAggregatedField
    };
  }

  const ERRORBAR = 'errorbar';
  const ERRORBAR_PARTS = ['ticks', 'rule'];
  const errorBarNormalizer = new CompositeMarkNormalizer(ERRORBAR, normalizeErrorBar);
  function normalizeErrorBar(spec, _ref) {
    let {
      config
    } = _ref;
    // Need to initEncoding first so we can infer type
    spec = { ...spec,
      encoding: normalizeEncoding(spec.encoding, config)
    };
    const {
      transform,
      continuousAxisChannelDef,
      continuousAxis,
      encodingWithoutContinuousAxis,
      ticksOrient,
      markDef,
      outerSpec,
      tooltipEncoding
    } = errorBarParams(spec, ERRORBAR, config);
    delete encodingWithoutContinuousAxis['size'];
    const makeErrorBarPart = makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorbar);
    const thickness = markDef.thickness;
    const size = markDef.size;
    const tick = {
      type: 'tick',
      orient: ticksOrient,
      aria: false,
      ...(thickness !== undefined ? {
        thickness
      } : {}),
      ...(size !== undefined ? {
        size
      } : {})
    };
    const layer = [...makeErrorBarPart({
      partName: 'ticks',
      mark: tick,
      positionPrefix: 'lower',
      extraEncoding: tooltipEncoding
    }), ...makeErrorBarPart({
      partName: 'ticks',
      mark: tick,
      positionPrefix: 'upper',
      extraEncoding: tooltipEncoding
    }), ...makeErrorBarPart({
      partName: 'rule',
      mark: {
        type: 'rule',
        ariaRoleDescription: 'errorbar',
        ...(thickness !== undefined ? {
          size: thickness
        } : {})
      },
      positionPrefix: 'lower',
      endPositionPrefix: 'upper',
      extraEncoding: tooltipEncoding
    })];
    return { ...outerSpec,
      transform,
      ...(layer.length > 1 ? {
        layer
      } : { ...layer[0]
      })
    };
  }

  function errorBarOrientAndInputType(spec, compositeMark) {
    const {
      encoding
    } = spec;

    if (errorBarIsInputTypeRaw(encoding)) {
      return {
        orient: compositeMarkOrient(spec, compositeMark),
        inputType: 'raw'
      };
    }

    const isTypeAggregatedUpperLower = errorBarIsInputTypeAggregatedUpperLower(encoding);
    const isTypeAggregatedError = errorBarIsInputTypeAggregatedError(encoding);
    const x = encoding.x;
    const y = encoding.y;

    if (isTypeAggregatedUpperLower) {
      // type is aggregated-upper-lower
      if (isTypeAggregatedError) {
        throw new Error("".concat(compositeMark, " cannot be both type aggregated-upper-lower and aggregated-error"));
      }

      const x2 = encoding.x2;
      const y2 = encoding.y2;

      if (isFieldOrDatumDef(x2) && isFieldOrDatumDef(y2)) {
        // having both x, x2 and y, y2
        throw new Error("".concat(compositeMark, " cannot have both x2 and y2"));
      } else if (isFieldOrDatumDef(x2)) {
        if (isContinuousFieldOrDatumDef(x)) {
          // having x, x2 quantitative and field y, y2 are not specified
          return {
            orient: 'horizontal',
            inputType: 'aggregated-upper-lower'
          };
        } else {
          // having x, x2 that are not both quantitative
          throw new Error("Both x and x2 have to be quantitative in ".concat(compositeMark));
        }
      } else if (isFieldOrDatumDef(y2)) {
        // y2 is a FieldDef
        if (isContinuousFieldOrDatumDef(y)) {
          // having y, y2 quantitative and field x, x2 are not specified
          return {
            orient: 'vertical',
            inputType: 'aggregated-upper-lower'
          };
        } else {
          // having y, y2 that are not both quantitative
          throw new Error("Both y and y2 have to be quantitative in ".concat(compositeMark));
        }
      }

      throw new Error('No ranged axis');
    } else {
      // type is aggregated-error
      const xError = encoding.xError;
      const xError2 = encoding.xError2;
      const yError = encoding.yError;
      const yError2 = encoding.yError2;

      if (isFieldOrDatumDef(xError2) && !isFieldOrDatumDef(xError)) {
        // having xError2 without xError
        throw new Error("".concat(compositeMark, " cannot have xError2 without xError"));
      }

      if (isFieldOrDatumDef(yError2) && !isFieldOrDatumDef(yError)) {
        // having yError2 without yError
        throw new Error("".concat(compositeMark, " cannot have yError2 without yError"));
      }

      if (isFieldOrDatumDef(xError) && isFieldOrDatumDef(yError)) {
        // having both xError and yError
        throw new Error("".concat(compositeMark, " cannot have both xError and yError with both are quantiative"));
      } else if (isFieldOrDatumDef(xError)) {
        if (isContinuousFieldOrDatumDef(x)) {
          // having x and xError that are all quantitative
          return {
            orient: 'horizontal',
            inputType: 'aggregated-error'
          };
        } else {
          // having x, xError, and xError2 that are not all quantitative
          throw new Error('All x, xError, and xError2 (if exist) have to be quantitative');
        }
      } else if (isFieldOrDatumDef(yError)) {
        if (isContinuousFieldOrDatumDef(y)) {
          // having y and yError that are all quantitative
          return {
            orient: 'vertical',
            inputType: 'aggregated-error'
          };
        } else {
          // having y, yError, and yError2 that are not all quantitative
          throw new Error('All y, yError, and yError2 (if exist) have to be quantitative');
        }
      }

      throw new Error('No ranged axis');
    }
  }

  function errorBarIsInputTypeRaw(encoding) {
    return (isFieldOrDatumDef(encoding.x) || isFieldOrDatumDef(encoding.y)) && !isFieldOrDatumDef(encoding.x2) && !isFieldOrDatumDef(encoding.y2) && !isFieldOrDatumDef(encoding.xError) && !isFieldOrDatumDef(encoding.xError2) && !isFieldOrDatumDef(encoding.yError) && !isFieldOrDatumDef(encoding.yError2);
  }

  function errorBarIsInputTypeAggregatedUpperLower(encoding) {
    return isFieldOrDatumDef(encoding.x2) || isFieldOrDatumDef(encoding.y2);
  }

  function errorBarIsInputTypeAggregatedError(encoding) {
    return isFieldOrDatumDef(encoding.xError) || isFieldOrDatumDef(encoding.xError2) || isFieldOrDatumDef(encoding.yError) || isFieldOrDatumDef(encoding.yError2);
  }

  function errorBarParams(spec, compositeMark, config) {
    var _outerSpec$transform;

    // TODO: use selection
    const {
      mark,
      encoding,
      params,
      projection: _p,
      ...outerSpec
    } = spec;
    const markDef = isMarkDef(mark) ? mark : {
      type: mark
    }; // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support

    if (params) {
      warn(selectionNotSupported(compositeMark));
    }

    const {
      orient,
      inputType
    } = errorBarOrientAndInputType(spec, compositeMark);
    const {
      continuousAxisChannelDef,
      continuousAxisChannelDef2,
      continuousAxisChannelDefError,
      continuousAxisChannelDefError2,
      continuousAxis
    } = compositeMarkContinuousAxis(spec, orient, compositeMark);
    const {
      errorBarSpecificAggregate,
      postAggregateCalculates,
      tooltipSummary,
      tooltipTitleWithFieldName
    } = errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config);
    const {
      [continuousAxis]: oldContinuousAxisChannelDef,
      [continuousAxis === 'x' ? 'x2' : 'y2']: oldContinuousAxisChannelDef2,
      [continuousAxis === 'x' ? 'xError' : 'yError']: oldContinuousAxisChannelDefError,
      [continuousAxis === 'x' ? 'xError2' : 'yError2']: oldContinuousAxisChannelDefError2,
      ...oldEncodingWithoutContinuousAxis
    } = encoding;
    const {
      bins,
      timeUnits,
      aggregate: oldAggregate,
      groupby: oldGroupBy,
      encoding: encodingWithoutContinuousAxis
    } = extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config);
    const aggregate = [...oldAggregate, ...errorBarSpecificAggregate];
    const groupby = inputType !== 'raw' ? [] : oldGroupBy;
    const tooltipEncoding = getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, tooltipTitleWithFieldName);
    return {
      transform: [...((_outerSpec$transform = outerSpec.transform) !== null && _outerSpec$transform !== void 0 ? _outerSpec$transform : []), ...bins, ...timeUnits, ...(aggregate.length === 0 ? [] : [{
        aggregate,
        groupby
      }]), ...postAggregateCalculates],
      groupby,
      continuousAxisChannelDef,
      continuousAxis,
      encodingWithoutContinuousAxis,
      ticksOrient: orient === 'vertical' ? 'horizontal' : 'vertical',
      markDef,
      outerSpec,
      tooltipEncoding
    };
  }

  function errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config) {
    let errorBarSpecificAggregate = [];
    let postAggregateCalculates = [];
    const continuousFieldName = continuousAxisChannelDef.field;
    let tooltipSummary;
    let tooltipTitleWithFieldName = false;

    if (inputType === 'raw') {
      const center = markDef.center ? markDef.center : markDef.extent ? markDef.extent === 'iqr' ? 'median' : 'mean' : config.errorbar.center;
      const extent = markDef.extent ? markDef.extent : center === 'mean' ? 'stderr' : 'iqr';

      if (center === 'median' !== (extent === 'iqr')) {
        warn(errorBarCenterIsUsedWithWrongExtent(center, extent, compositeMark));
      }

      if (extent === 'stderr' || extent === 'stdev') {
        errorBarSpecificAggregate = [{
          op: extent,
          field: continuousFieldName,
          as: "extent_".concat(continuousFieldName)
        }, {
          op: center,
          field: continuousFieldName,
          as: "center_".concat(continuousFieldName)
        }];
        postAggregateCalculates = [{
          calculate: "datum[\"center_".concat(continuousFieldName, "\"] + datum[\"extent_").concat(continuousFieldName, "\"]"),
          as: "upper_".concat(continuousFieldName)
        }, {
          calculate: "datum[\"center_".concat(continuousFieldName, "\"] - datum[\"extent_").concat(continuousFieldName, "\"]"),
          as: "lower_".concat(continuousFieldName)
        }];
        tooltipSummary = [{
          fieldPrefix: 'center_',
          titlePrefix: titleCase(center)
        }, {
          fieldPrefix: 'upper_',
          titlePrefix: getTitlePrefix(center, extent, '+')
        }, {
          fieldPrefix: 'lower_',
          titlePrefix: getTitlePrefix(center, extent, '-')
        }];
        tooltipTitleWithFieldName = true;
      } else {
        let centerOp;
        let lowerExtentOp;
        let upperExtentOp;

        if (extent === 'ci') {
          centerOp = 'mean';
          lowerExtentOp = 'ci0';
          upperExtentOp = 'ci1';
        } else {
          centerOp = 'median';
          lowerExtentOp = 'q1';
          upperExtentOp = 'q3';
        }

        errorBarSpecificAggregate = [{
          op: lowerExtentOp,
          field: continuousFieldName,
          as: "lower_".concat(continuousFieldName)
        }, {
          op: upperExtentOp,
          field: continuousFieldName,
          as: "upper_".concat(continuousFieldName)
        }, {
          op: centerOp,
          field: continuousFieldName,
          as: "center_".concat(continuousFieldName)
        }];
        tooltipSummary = [{
          fieldPrefix: 'upper_',
          titlePrefix: title({
            field: continuousFieldName,
            aggregate: upperExtentOp,
            type: 'quantitative'
          }, config, {
            allowDisabling: false
          })
        }, {
          fieldPrefix: 'lower_',
          titlePrefix: title({
            field: continuousFieldName,
            aggregate: lowerExtentOp,
            type: 'quantitative'
          }, config, {
            allowDisabling: false
          })
        }, {
          fieldPrefix: 'center_',
          titlePrefix: title({
            field: continuousFieldName,
            aggregate: centerOp,
            type: 'quantitative'
          }, config, {
            allowDisabling: false
          })
        }];
      }
    } else {
      if (markDef.center || markDef.extent) {
        warn(errorBarCenterAndExtentAreNotNeeded(markDef.center, markDef.extent));
      }

      if (inputType === 'aggregated-upper-lower') {
        tooltipSummary = [];
        postAggregateCalculates = [{
          calculate: "datum[\"".concat(continuousAxisChannelDef2.field, "\"]"),
          as: "upper_".concat(continuousFieldName)
        }, {
          calculate: "datum[\"".concat(continuousFieldName, "\"]"),
          as: "lower_".concat(continuousFieldName)
        }];
      } else if (inputType === 'aggregated-error') {
        tooltipSummary = [{
          fieldPrefix: '',
          titlePrefix: continuousFieldName
        }];
        postAggregateCalculates = [{
          calculate: "datum[\"".concat(continuousFieldName, "\"] + datum[\"").concat(continuousAxisChannelDefError.field, "\"]"),
          as: "upper_".concat(continuousFieldName)
        }];

        if (continuousAxisChannelDefError2) {
          postAggregateCalculates.push({
            calculate: "datum[\"".concat(continuousFieldName, "\"] + datum[\"").concat(continuousAxisChannelDefError2.field, "\"]"),
            as: "lower_".concat(continuousFieldName)
          });
        } else {
          postAggregateCalculates.push({
            calculate: "datum[\"".concat(continuousFieldName, "\"] - datum[\"").concat(continuousAxisChannelDefError.field, "\"]"),
            as: "lower_".concat(continuousFieldName)
          });
        }
      }

      for (const postAggregateCalculate of postAggregateCalculates) {
        tooltipSummary.push({
          fieldPrefix: postAggregateCalculate.as.substring(0, 6),
          titlePrefix: replaceAll(replaceAll(postAggregateCalculate.calculate, 'datum["', ''), '"]', '')
        });
      }
    }

    return {
      postAggregateCalculates,
      errorBarSpecificAggregate,
      tooltipSummary,
      tooltipTitleWithFieldName
    };
  }

  function getTitlePrefix(center, extent, operation) {
    return "".concat(titleCase(center), " ").concat(operation, " ").concat(extent);
  }

  const ERRORBAND = 'errorband';
  const ERRORBAND_PARTS = ['band', 'borders'];
  const errorBandNormalizer = new CompositeMarkNormalizer(ERRORBAND, normalizeErrorBand);
  function normalizeErrorBand(spec, _ref) {
    let {
      config
    } = _ref;
    // Need to initEncoding first so we can infer type
    spec = { ...spec,
      encoding: normalizeEncoding(spec.encoding, config)
    };
    const {
      transform,
      continuousAxisChannelDef,
      continuousAxis,
      encodingWithoutContinuousAxis,
      markDef,
      outerSpec,
      tooltipEncoding
    } = errorBarParams(spec, ERRORBAND, config);
    const errorBandDef = markDef;
    const makeErrorBandPart = makeCompositeAggregatePartFactory(errorBandDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorband);
    const is2D = spec.encoding.x !== undefined && spec.encoding.y !== undefined;
    let bandMark = {
      type: is2D ? 'area' : 'rect'
    };
    let bordersMark = {
      type: is2D ? 'line' : 'rule'
    };
    const interpolate = { ...(errorBandDef.interpolate ? {
        interpolate: errorBandDef.interpolate
      } : {}),
      ...(errorBandDef.tension && errorBandDef.interpolate ? {
        tension: errorBandDef.tension
      } : {})
    };

    if (is2D) {
      bandMark = { ...bandMark,
        ...interpolate,
        ariaRoleDescription: 'errorband'
      };
      bordersMark = { ...bordersMark,
        ...interpolate,
        aria: false
      };
    } else if (errorBandDef.interpolate) {
      warn(errorBand1DNotSupport('interpolate'));
    } else if (errorBandDef.tension) {
      warn(errorBand1DNotSupport('tension'));
    }

    return { ...outerSpec,
      transform,
      layer: [...makeErrorBandPart({
        partName: 'band',
        mark: bandMark,
        positionPrefix: 'lower',
        endPositionPrefix: 'upper',
        extraEncoding: tooltipEncoding
      }), ...makeErrorBandPart({
        partName: 'borders',
        mark: bordersMark,
        positionPrefix: 'lower',
        extraEncoding: tooltipEncoding
      }), ...makeErrorBandPart({
        partName: 'borders',
        mark: bordersMark,
        positionPrefix: 'upper',
        extraEncoding: tooltipEncoding
      })]
    };
  }

  /**
   * Registry index for all composite mark's normalizer
   */
  const compositeMarkRegistry = {};
  function add(mark, run, parts) {
    const normalizer = new CompositeMarkNormalizer(mark, run);
    compositeMarkRegistry[mark] = {
      normalizer,
      parts
    };
  }
  function getAllCompositeMarks() {
    return keys(compositeMarkRegistry);
  }
  add(BOXPLOT, normalizeBoxPlot, BOXPLOT_PARTS);
  add(ERRORBAR, normalizeErrorBar, ERRORBAR_PARTS);
  add(ERRORBAND, normalizeErrorBand, ERRORBAND_PARTS);

  const VL_ONLY_LEGEND_CONFIG = ['gradientHorizontalMaxLength', 'gradientHorizontalMinLength', 'gradientVerticalMaxLength', 'gradientVerticalMinLength', 'unselectedOpacity'];

  const HEADER_TITLE_PROPERTIES_MAP = {
    titleAlign: 'align',
    titleAnchor: 'anchor',
    titleAngle: 'angle',
    titleBaseline: 'baseline',
    titleColor: 'color',
    titleFont: 'font',
    titleFontSize: 'fontSize',
    titleFontStyle: 'fontStyle',
    titleFontWeight: 'fontWeight',
    titleLimit: 'limit',
    titleLineHeight: 'lineHeight',
    titleOrient: 'orient',
    titlePadding: 'offset'
  };
  const HEADER_LABEL_PROPERTIES_MAP = {
    labelAlign: 'align',
    labelAnchor: 'anchor',
    labelAngle: 'angle',
    labelBaseline: 'baseline',
    labelColor: 'color',
    labelFont: 'font',
    labelFontSize: 'fontSize',
    labelFontStyle: 'fontStyle',
    labelFontWeight: 'fontWeight',
    labelLimit: 'limit',
    labelLineHeight: 'lineHeight',
    labelOrient: 'orient',
    labelPadding: 'offset'
  };
  const HEADER_TITLE_PROPERTIES = keys(HEADER_TITLE_PROPERTIES_MAP);
  const HEADER_LABEL_PROPERTIES = keys(HEADER_LABEL_PROPERTIES_MAP);
  const HEADER_CONFIGS_INDEX = {
    header: 1,
    headerRow: 1,
    headerColumn: 1,
    headerFacet: 1
  };
  const HEADER_CONFIGS = keys(HEADER_CONFIGS_INDEX);

  const LEGEND_SCALE_CHANNELS = ['size', 'shape', 'fill', 'stroke', 'strokeDash', 'strokeWidth', 'opacity'];
  const defaultLegendConfig = {
    gradientHorizontalMaxLength: 200,
    gradientHorizontalMinLength: 100,
    gradientVerticalMaxLength: 200,
    gradientVerticalMinLength: 64,
    // This is Vega's minimum.
    unselectedOpacity: 0.35
  };
  const COMMON_LEGEND_PROPERTY_INDEX = {
    aria: 1,
    clipHeight: 1,
    columnPadding: 1,
    columns: 1,
    cornerRadius: 1,
    description: 1,
    direction: 1,
    fillColor: 1,
    format: 1,
    formatType: 1,
    gradientLength: 1,
    gradientOpacity: 1,
    gradientStrokeColor: 1,
    gradientStrokeWidth: 1,
    gradientThickness: 1,
    gridAlign: 1,
    labelAlign: 1,
    labelBaseline: 1,
    labelColor: 1,
    labelFont: 1,
    labelFontSize: 1,
    labelFontStyle: 1,
    labelFontWeight: 1,
    labelLimit: 1,
    labelOffset: 1,
    labelOpacity: 1,
    labelOverlap: 1,
    labelPadding: 1,
    labelSeparation: 1,
    legendX: 1,
    legendY: 1,
    offset: 1,
    orient: 1,
    padding: 1,
    rowPadding: 1,
    strokeColor: 1,
    symbolDash: 1,
    symbolDashOffset: 1,
    symbolFillColor: 1,
    symbolLimit: 1,
    symbolOffset: 1,
    symbolOpacity: 1,
    symbolSize: 1,
    symbolStrokeColor: 1,
    symbolStrokeWidth: 1,
    symbolType: 1,
    tickCount: 1,
    tickMinStep: 1,
    title: 1,
    titleAlign: 1,
    titleAnchor: 1,
    titleBaseline: 1,
    titleColor: 1,
    titleFont: 1,
    titleFontSize: 1,
    titleFontStyle: 1,
    titleFontWeight: 1,
    titleLimit: 1,
    titleLineHeight: 1,
    titleOpacity: 1,
    titleOrient: 1,
    titlePadding: 1,
    type: 1,
    values: 1,
    zindex: 1
  };

  const SELECTION_ID = '_vgsid_';
  const defaultConfig$1 = {
    point: {
      on: 'click',
      fields: [SELECTION_ID],
      toggle: 'event.shiftKey',
      resolve: 'global',
      clear: 'dblclick'
    },
    interval: {
      on: '[mousedown, window:mouseup] > window:mousemove!',
      encodings: ['x', 'y'],
      translate: '[mousedown, window:mouseup] > window:mousemove!',
      zoom: 'wheel!',
      mark: {
        fill: '#333',
        fillOpacity: 0.125,
        stroke: 'white'
      },
      resolve: 'global',
      clear: 'dblclick'
    }
  };
  function isLegendBinding(bind) {
    return !!bind && (bind === 'legend' || !!bind.legend);
  }
  function isLegendStreamBinding(bind) {
    return isLegendBinding(bind) && vega.isObject(bind);
  }
  function isSelectionParameter(param) {
    return !!param['select'];
  }

  function assembleParameterSignals(params) {
    const signals = [];

    for (const param of params || []) {
      // Selection parameters are handled separately via assembleSelectionTopLevelSignals
      // and assembleSignals methods registered on the Model.
      if (isSelectionParameter(param)) continue;
      const {
        expr,
        bind,
        ...rest
      } = param;

      if (bind && expr) {
        // Vega's InitSignal -- apply expr to "init"
        const signal = { ...rest,
          bind,
          init: expr
        };
        signals.push(signal);
      } else {
        const signal = { ...rest,
          ...(expr ? {
            update: expr
          } : {}),
          ...(bind ? {
            bind
          } : {})
        };
        signals.push(signal);
      }
    }

    return signals;
  }

  /**
   * Base layout mixins for V/HConcatSpec, which should not have RowCol<T> generic fo its property.
   */

  /**
   * Base interface for a generalized concatenation specification.
   */

  /**
   * Base interface for a vertical concatenation specification.
   */

  /**
   * Base interface for a horizontal concatenation specification.
   */

  /** A concat spec without any shortcut/expansion syntax */
  function isAnyConcatSpec(spec) {
    return isVConcatSpec(spec) || isHConcatSpec(spec) || isConcatSpec(spec);
  }
  function isConcatSpec(spec) {
    return 'concat' in spec;
  }
  function isVConcatSpec(spec) {
    return 'vconcat' in spec;
  }
  function isHConcatSpec(spec) {
    return 'hconcat' in spec;
  }

  function isFitType(autoSizeType) {
    return autoSizeType === 'fit' || autoSizeType === 'fit-x' || autoSizeType === 'fit-y';
  }
  function getFitType(sizeType) {
    return sizeType ? "fit-".concat(getPositionScaleChannel(sizeType)) : 'fit';
  }
  const TOP_LEVEL_PROPERTIES = ['background', 'padding' // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
  ];
  function extractTopLevelProperties(t, includeParams) {
    const o = {};

    for (const p of TOP_LEVEL_PROPERTIES) {
      if (t && t[p] !== undefined) {
        o[p] = signalRefOrValue(t[p]);
      }
    }

    if (includeParams) {
      o.params = t.params;
    }

    return o;
  }

  /**
   * Common properties for all types of specification
   */

  function getStepFor(_ref) {
    let {
      step,
      offsetIsDiscrete
    } = _ref;

    if (offsetIsDiscrete) {
      var _step$for;

      return (_step$for = step.for) !== null && _step$for !== void 0 ? _step$for : 'offset';
    } else {
      return 'position';
    }
  }
  function isStep(size) {
    return vega.isObject(size) && size['step'] !== undefined;
  } // TODO(https://github.com/vega/vega-lite/issues/2503): Make this generic so we can support some form of top-down sizing.

  /**
   * Common properties for specifying width and height of unit and layer specifications.
   */

  function isFrameMixins(o) {
    return o['view'] || o['width'] || o['height'];
  }
  const DEFAULT_SPACING = 20;
  const COMPOSITION_LAYOUT_INDEX = {
    align: 1,
    bounds: 1,
    center: 1,
    columns: 1,
    spacing: 1
  };
  const COMPOSITION_LAYOUT_PROPERTIES = keys(COMPOSITION_LAYOUT_INDEX);
  function extractCompositionLayout(spec, specType, config) {
    const compositionConfig = config[specType];
    const layout = {}; // Apply config first

    const {
      spacing: spacingConfig,
      columns
    } = compositionConfig;

    if (spacingConfig !== undefined) {
      layout.spacing = spacingConfig;
    }

    if (columns !== undefined) {
      if (isFacetSpec(spec) && !isFacetMapping(spec.facet) || isConcatSpec(spec)) {
        layout.columns = columns;
      }
    }

    if (isVConcatSpec(spec)) {
      layout.columns = 1;
    } // Then copy properties from the spec


    for (const prop of COMPOSITION_LAYOUT_PROPERTIES) {
      if (spec[prop] !== undefined) {
        if (prop === 'spacing') {
          var _spacing$row, _spacing$column;

          const spacing = spec[prop];
          layout[prop] = vega.isNumber(spacing) ? spacing : {
            row: (_spacing$row = spacing.row) !== null && _spacing$row !== void 0 ? _spacing$row : spacingConfig,
            column: (_spacing$column = spacing.column) !== null && _spacing$column !== void 0 ? _spacing$column : spacingConfig
          };
        } else {
          layout[prop] = spec[prop];
        }
      }
    }

    return layout;
  }

  function getViewConfigContinuousSize(viewConfig, channel) {
    var _viewConfig$channel;

    return (_viewConfig$channel = viewConfig[channel]) !== null && _viewConfig$channel !== void 0 ? _viewConfig$channel : viewConfig[channel === 'width' ? 'continuousWidth' : 'continuousHeight']; // get width/height for backwards compatibility
  }
  function getViewConfigDiscreteStep(viewConfig, channel) {
    const size = getViewConfigDiscreteSize(viewConfig, channel);
    return isStep(size) ? size.step : DEFAULT_STEP;
  }
  function getViewConfigDiscreteSize(viewConfig, channel) {
    var _viewConfig$channel2;

    const size = (_viewConfig$channel2 = viewConfig[channel]) !== null && _viewConfig$channel2 !== void 0 ? _viewConfig$channel2 : viewConfig[channel === 'width' ? 'discreteWidth' : 'discreteHeight']; // get width/height for backwards compatibility

    return getFirstDefined(size, {
      step: viewConfig.step
    });
  }
  const DEFAULT_STEP = 20;
  const defaultViewConfig = {
    continuousWidth: 200,
    continuousHeight: 200,
    step: DEFAULT_STEP
  };
  const defaultConfig = {
    background: 'white',
    padding: 5,
    timeFormat: '%b %d, %Y',
    countTitle: 'Count of Records',
    view: defaultViewConfig,
    mark: defaultMarkConfig,
    arc: {},
    area: {},
    bar: defaultBarConfig,
    circle: {},
    geoshape: {},
    image: {},
    line: {},
    point: {},
    rect: defaultRectConfig,
    rule: {
      color: 'black'
    },
    // Need this to override default color in mark config
    square: {},
    text: {
      color: 'black'
    },
    // Need this to override default color in mark config
    tick: defaultTickConfig,
    trail: {},
    boxplot: {
      size: 14,
      extent: 1.5,
      box: {},
      median: {
        color: 'white'
      },
      outliers: {},
      rule: {},
      ticks: null
    },
    errorbar: {
      center: 'mean',
      rule: true,
      ticks: false
    },
    errorband: {
      band: {
        opacity: 0.3
      },
      borders: false
    },
    scale: defaultScaleConfig,
    projection: {},
    legend: defaultLegendConfig,
    header: {
      titlePadding: 10,
      labelPadding: 10
    },
    headerColumn: {},
    headerRow: {},
    headerFacet: {},
    selection: defaultConfig$1,
    style: {},
    title: {},
    facet: {
      spacing: DEFAULT_SPACING
    },
    concat: {
      spacing: DEFAULT_SPACING
    }
  }; // Tableau10 color palette, copied from `vegaScale.scheme('tableau10')`

  const tab10 = ['#4c78a8', '#f58518', '#e45756', '#72b7b2', '#54a24b', '#eeca3b', '#b279a2', '#ff9da6', '#9d755d', '#bab0ac'];
  const DEFAULT_FONT_SIZE = {
    text: 11,
    guideLabel: 10,
    guideTitle: 11,
    groupTitle: 13,
    groupSubtitle: 12
  };
  const DEFAULT_COLOR = {
    blue: tab10[0],
    orange: tab10[1],
    red: tab10[2],
    teal: tab10[3],
    green: tab10[4],
    yellow: tab10[5],
    purple: tab10[6],
    pink: tab10[7],
    brown: tab10[8],
    gray0: '#000',
    gray1: '#111',
    gray2: '#222',
    gray3: '#333',
    gray4: '#444',
    gray5: '#555',
    gray6: '#666',
    gray7: '#777',
    gray8: '#888',
    gray9: '#999',
    gray10: '#aaa',
    gray11: '#bbb',
    gray12: '#ccc',
    gray13: '#ddd',
    gray14: '#eee',
    gray15: '#fff'
  };
  function colorSignalConfig() {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      signals: [{
        name: 'color',
        value: vega.isObject(color) ? { ...DEFAULT_COLOR,
          ...color
        } : DEFAULT_COLOR
      }],
      mark: {
        color: {
          signal: 'color.blue'
        }
      },
      rule: {
        color: {
          signal: 'color.gray0'
        }
      },
      text: {
        color: {
          signal: 'color.gray0'
        }
      },
      style: {
        'guide-label': {
          fill: {
            signal: 'color.gray0'
          }
        },
        'guide-title': {
          fill: {
            signal: 'color.gray0'
          }
        },
        'group-title': {
          fill: {
            signal: 'color.gray0'
          }
        },
        'group-subtitle': {
          fill: {
            signal: 'color.gray0'
          }
        },
        cell: {
          stroke: {
            signal: 'color.gray8'
          }
        }
      },
      axis: {
        domainColor: {
          signal: 'color.gray13'
        },
        gridColor: {
          signal: 'color.gray8'
        },
        tickColor: {
          signal: 'color.gray13'
        }
      },
      range: {
        category: [{
          signal: 'color.blue'
        }, {
          signal: 'color.orange'
        }, {
          signal: 'color.red'
        }, {
          signal: 'color.teal'
        }, {
          signal: 'color.green'
        }, {
          signal: 'color.yellow'
        }, {
          signal: 'color.purple'
        }, {
          signal: 'color.pink'
        }, {
          signal: 'color.brown'
        }, {
          signal: 'color.grey8'
        }]
      }
    };
  }
  function fontSizeSignalConfig(fontSize) {
    return {
      signals: [{
        name: 'fontSize',
        value: vega.isObject(fontSize) ? { ...DEFAULT_FONT_SIZE,
          ...fontSize
        } : DEFAULT_FONT_SIZE
      }],
      text: {
        fontSize: {
          signal: 'fontSize.text'
        }
      },
      style: {
        'guide-label': {
          fontSize: {
            signal: 'fontSize.guideLabel'
          }
        },
        'guide-title': {
          fontSize: {
            signal: 'fontSize.guideTitle'
          }
        },
        'group-title': {
          fontSize: {
            signal: 'fontSize.groupTitle'
          }
        },
        'group-subtitle': {
          fontSize: {
            signal: 'fontSize.groupSubtitle'
          }
        }
      }
    };
  }
  function fontConfig(font) {
    return {
      text: {
        font
      },
      style: {
        'guide-label': {
          font
        },
        'guide-title': {
          font
        },
        'group-title': {
          font
        },
        'group-subtitle': {
          font
        }
      }
    };
  }

  function getAxisConfigInternal(axisConfig) {
    const props = keys(axisConfig || {});
    const axisConfigInternal = {};

    for (const prop of props) {
      const val = axisConfig[prop];
      axisConfigInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
    }

    return axisConfigInternal;
  }

  function getStyleConfigInternal(styleConfig) {
    const props = keys(styleConfig);
    const styleConfigInternal = {};

    for (const prop of props) {
      // We need to cast to cheat a bit here since styleConfig can be either mark config or axis config
      styleConfigInternal[prop] = getAxisConfigInternal(styleConfig[prop]);
    }

    return styleConfigInternal;
  }

  const configPropsWithExpr = [...MARK_CONFIGS, ...AXIS_CONFIGS, ...HEADER_CONFIGS, 'background', 'padding', 'legend', 'lineBreak', 'scale', 'style', 'title', 'view'];
  /**
   * Merge specified config with default config and config for the `color` flag,
   * then replace all expressions with signals
   */

  function initConfig() {
    let specifiedConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      color,
      font,
      fontSize,
      selection,
      ...restConfig
    } = specifiedConfig;
    const mergedConfig = vega.mergeConfig({}, duplicate(defaultConfig), font ? fontConfig(font) : {}, color ? colorSignalConfig(color) : {}, fontSize ? fontSizeSignalConfig(fontSize) : {}, restConfig || {}); // mergeConfig doesn't recurse and overrides object values.

    if (selection) {
      vega.writeConfig(mergedConfig, 'selection', selection, true);
    }

    const outputConfig = omit(mergedConfig, configPropsWithExpr);

    for (const prop of ['background', 'lineBreak', 'padding']) {
      if (mergedConfig[prop]) {
        outputConfig[prop] = signalRefOrValue(mergedConfig[prop]);
      }
    }

    for (const markConfigType of MARK_CONFIGS) {
      if (mergedConfig[markConfigType]) {
        // FIXME: outputConfig[markConfigType] expects that types are replaced recursively but replaceExprRef only replaces one level deep
        outputConfig[markConfigType] = replaceExprRef(mergedConfig[markConfigType]);
      }
    }

    for (const axisConfigType of AXIS_CONFIGS) {
      if (mergedConfig[axisConfigType]) {
        outputConfig[axisConfigType] = getAxisConfigInternal(mergedConfig[axisConfigType]);
      }
    }

    for (const headerConfigType of HEADER_CONFIGS) {
      if (mergedConfig[headerConfigType]) {
        outputConfig[headerConfigType] = replaceExprRef(mergedConfig[headerConfigType]);
      }
    }

    if (mergedConfig.legend) {
      outputConfig.legend = replaceExprRef(mergedConfig.legend);
    }

    if (mergedConfig.scale) {
      outputConfig.scale = replaceExprRef(mergedConfig.scale);
    }

    if (mergedConfig.style) {
      outputConfig.style = getStyleConfigInternal(mergedConfig.style);
    }

    if (mergedConfig.title) {
      outputConfig.title = replaceExprRef(mergedConfig.title);
    }

    if (mergedConfig.view) {
      outputConfig.view = replaceExprRef(mergedConfig.view);
    }

    return outputConfig;
  }
  const MARK_STYLES = new Set(['view', ...PRIMITIVE_MARKS]);
  const VL_ONLY_CONFIG_PROPERTIES = ['color', 'fontSize', 'background', // We apply background to the spec directly.
  'padding', 'facet', 'concat', 'numberFormat', 'timeFormat', 'countTitle', 'header', 'axisQuantitative', 'axisTemporal', 'axisDiscrete', 'axisPoint', 'axisXBand', 'axisXPoint', 'axisXDiscrete', 'axisXQuantitative', 'axisXTemporal', 'axisYBand', 'axisYPoint', 'axisYDiscrete', 'axisYQuantitative', 'axisYTemporal', 'scale', 'selection', 'overlay' // FIXME: Redesign and unhide this
  ];
  const VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
    view: ['continuousWidth', 'continuousHeight', 'discreteWidth', 'discreteHeight', 'step'],
    ...VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX
  };
  function stripAndRedirectConfig(config) {
    config = duplicate(config);

    for (const prop of VL_ONLY_CONFIG_PROPERTIES) {
      delete config[prop];
    }

    if (config.axis) {
      // delete condition axis config
      for (const prop in config.axis) {
        if (isConditionalAxisValue(config.axis[prop])) {
          delete config.axis[prop];
        }
      }
    }

    if (config.legend) {
      for (const prop of VL_ONLY_LEGEND_CONFIG) {
        delete config.legend[prop];
      }
    } // Remove Vega-Lite only generic mark config


    if (config.mark) {
      for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
        delete config.mark[prop];
      }

      if (config.mark.tooltip && vega.isObject(config.mark.tooltip)) {
        delete config.mark.tooltip;
      }
    }

    if (config.params) {
      config.signals = (config.signals || []).concat(assembleParameterSignals(config.params));
      delete config.params;
    }

    for (const markType of MARK_STYLES) {
      // Remove Vega-Lite-only mark config
      for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
        delete config[markType][prop];
      } // Remove Vega-Lite only mark-specific config


      const vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];

      if (vlOnlyMarkSpecificConfigs) {
        for (const prop of vlOnlyMarkSpecificConfigs) {
          delete config[markType][prop];
        }
      } // Redirect mark config to config.style so that mark config only affect its own mark type
      // without affecting other marks that share the same underlying Vega marks.
      // For example, config.rect should not affect bar marks.


      redirectConfigToStyleConfig(config, markType);
    }

    for (const m of getAllCompositeMarks()) {
      // Clean up the composite mark config as we don't need them in the output specs anymore
      delete config[m];
    }

    redirectTitleConfig(config); // Remove empty config objects.

    for (const prop in config) {
      if (vega.isObject(config[prop]) && isEmpty(config[prop])) {
        delete config[prop];
      }
    }

    return isEmpty(config) ? undefined : config;
  }
  /**
   *
   * Redirect config.title -- so that title config do not affect header labels,
   * which also uses `title` directive to implement.
   *
   * For subtitle configs in config.title, keep them in config.title as header titles never have subtitles.
   */

  function redirectTitleConfig(config) {
    const {
      titleMarkConfig,
      subtitleMarkConfig,
      subtitle
    } = extractTitleConfig(config.title); // set config.style if title/subtitleMarkConfig is not an empty object

    if (!isEmpty(titleMarkConfig)) {
      config.style['group-title'] = { ...config.style['group-title'],
        ...titleMarkConfig // config.title has higher precedence than config.style.group-title in Vega

      };
    }

    if (!isEmpty(subtitleMarkConfig)) {
      config.style['group-subtitle'] = { ...config.style['group-subtitle'],
        ...subtitleMarkConfig
      };
    } // subtitle part can stay in config.title since header titles do not use subtitle


    if (!isEmpty(subtitle)) {
      config.title = subtitle;
    } else {
      delete config.title;
    }
  }

  function redirectConfigToStyleConfig(config, prop, // string = composite mark
  toProp, compositeMarkPart) {
    var _toProp;

    const propConfig = compositeMarkPart ? config[prop][compositeMarkPart] : config[prop];

    if (prop === 'view') {
      toProp = 'cell'; // View's default style is "cell"
    }

    const style = { ...propConfig,
      ...config.style[(_toProp = toProp) !== null && _toProp !== void 0 ? _toProp : prop]
    }; // set config.style if it is not an empty object

    if (!isEmpty(style)) {
      var _toProp2;

      config.style[(_toProp2 = toProp) !== null && _toProp2 !== void 0 ? _toProp2 : prop] = style;
    }

    if (!compositeMarkPart) {
      // For composite mark, so don't delete the whole config yet as we have to do multiple redirections.
      delete config[prop];
    }
  }

  /**
   * Base interface for a layer specification.
   */

  /**
   * A full layered plot specification, which may contains `encoding` and `projection` properties that will be applied to underlying unit (single-view) specifications.
   */

  /**
   * A layered specification without any shortcut/expansion syntax.
   */
  function isLayerSpec(spec) {
    return 'layer' in spec;
  }

  function isRepeatSpec(spec) {
    return 'repeat' in spec;
  }
  function isLayerRepeatSpec(spec) {
    return !vega.isArray(spec.repeat) && spec.repeat['layer'];
  }

  class SpecMapper {
    map(spec, params) {
      if (isFacetSpec(spec)) {
        return this.mapFacet(spec, params);
      } else if (isRepeatSpec(spec)) {
        return this.mapRepeat(spec, params);
      } else if (isHConcatSpec(spec)) {
        return this.mapHConcat(spec, params);
      } else if (isVConcatSpec(spec)) {
        return this.mapVConcat(spec, params);
      } else if (isConcatSpec(spec)) {
        return this.mapConcat(spec, params);
      } else {
        return this.mapLayerOrUnit(spec, params);
      }
    }

    mapLayerOrUnit(spec, params) {
      if (isLayerSpec(spec)) {
        return this.mapLayer(spec, params);
      } else if (isUnitSpec(spec)) {
        return this.mapUnit(spec, params);
      }

      throw new Error(invalidSpec(spec));
    }

    mapLayer(spec, params) {
      return { ...spec,
        layer: spec.layer.map(subspec => this.mapLayerOrUnit(subspec, params))
      };
    }

    mapHConcat(spec, params) {
      return { ...spec,
        hconcat: spec.hconcat.map(subspec => this.map(subspec, params))
      };
    }

    mapVConcat(spec, params) {
      return { ...spec,
        vconcat: spec.vconcat.map(subspec => this.map(subspec, params))
      };
    }

    mapConcat(spec, params) {
      const {
        concat,
        ...rest
      } = spec;
      return { ...rest,
        concat: concat.map(subspec => this.map(subspec, params))
      };
    }

    mapFacet(spec, params) {
      return { // as any is required here since TS cannot infer that FO may only be FieldName or Field, but not RepeatRef
        ...spec,
        // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
        spec: this.map(spec.spec, params)
      };
    }

    mapRepeat(spec, params) {
      return { ...spec,
        // as any is required here since TS cannot infer that the output type satisfies the input type
        spec: this.map(spec.spec, params)
      };
    }

  }

  const STACK_OFFSET_INDEX = {
    zero: 1,
    center: 1,
    normalize: 1
  };
  function isStackOffset(s) {
    return s in STACK_OFFSET_INDEX;
  }
  const STACKABLE_MARKS = new Set([ARC, BAR, AREA, RULE, POINT, CIRCLE, SQUARE, LINE, TEXT, TICK]);
  const STACK_BY_DEFAULT_MARKS = new Set([BAR, AREA, ARC]);

  function isUnbinnedQuantitative(channelDef) {
    return isFieldDef(channelDef) && channelDefType(channelDef) === 'quantitative' && !channelDef.bin;
  }

  function potentialStackedChannel(encoding, x) {
    const y = x === 'x' ? 'y' : 'radius';
    const xDef = encoding[x];
    const yDef = encoding[y];

    if (isFieldDef(xDef) && isFieldDef(yDef)) {
      if (isUnbinnedQuantitative(xDef) && isUnbinnedQuantitative(yDef)) {
        if (xDef.stack) {
          return x;
        } else if (yDef.stack) {
          return y;
        }

        const xAggregate = isFieldDef(xDef) && !!xDef.aggregate;
        const yAggregate = isFieldDef(yDef) && !!yDef.aggregate; // if there is no explicit stacking, only apply stack if there is only one aggregate for x or y

        if (xAggregate !== yAggregate) {
          return xAggregate ? x : y;
        } else {
          var _xDef$scale, _yDef$scale;

          const xScale = (_xDef$scale = xDef.scale) === null || _xDef$scale === void 0 ? void 0 : _xDef$scale.type;
          const yScale = (_yDef$scale = yDef.scale) === null || _yDef$scale === void 0 ? void 0 : _yDef$scale.type;

          if (xScale && xScale !== 'linear') {
            return y;
          } else if (yScale && yScale !== 'linear') {
            return x;
          }
        }
      } else if (isUnbinnedQuantitative(xDef)) {
        return x;
      } else if (isUnbinnedQuantitative(yDef)) {
        return y;
      }
    } else if (isUnbinnedQuantitative(xDef)) {
      return x;
    } else if (isUnbinnedQuantitative(yDef)) {
      return y;
    }

    return undefined;
  }

  function getDimensionChannel(channel) {
    switch (channel) {
      case 'x':
        return 'y';

      case 'y':
        return 'x';

      case 'theta':
        return 'radius';

      case 'radius':
        return 'theta';
    }
  } // Note: CompassQL uses this method and only pass in required properties of each argument object.
  // If required properties change, make sure to update CompassQL.


  function stack(m, encoding) {
    var _stackedFieldDef$scal, _stackedFieldDef$scal2;

    let opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const mark = isMarkDef(m) ? m.type : m; // Should have stackable mark

    if (!STACKABLE_MARKS.has(mark)) {
      return null;
    } // Run potential stacked twice, one for Cartesian and another for Polar,
    // so text marks can be stacked in any of the coordinates.
    // Note: The logic here is not perfectly correct.  If we want to support stacked dot plots where each dot is a pie chart with label, we have to change the stack logic here to separate Cartesian stacking for polar stacking.
    // However, since we probably never want to do that, let's just note the limitation here.


    const fieldChannel = potentialStackedChannel(encoding, 'x') || potentialStackedChannel(encoding, 'theta');

    if (!fieldChannel) {
      return null;
    }

    const stackedFieldDef = encoding[fieldChannel];
    const stackedField = isFieldDef(stackedFieldDef) ? vgField(stackedFieldDef, {}) : undefined;
    const dimensionChannel = getDimensionChannel(fieldChannel);
    const groupbyChannels = [];
    const groupbyFields = new Set();

    if (encoding[dimensionChannel]) {
      const dimensionDef = encoding[dimensionChannel];
      const dimensionField = isFieldDef(dimensionDef) ? vgField(dimensionDef, {}) : undefined;

      if (dimensionField && dimensionField !== stackedField) {
        // avoid grouping by the stacked field
        groupbyChannels.push(dimensionChannel);
        groupbyFields.add(dimensionField);
      }

      const dimensionOffsetChannel = dimensionChannel === 'x' ? 'xOffset' : 'yOffset';
      const dimensionOffsetDef = encoding[dimensionOffsetChannel];
      const dimensionOffsetField = isFieldDef(dimensionOffsetDef) ? vgField(dimensionOffsetDef, {}) : undefined;

      if (dimensionOffsetField && dimensionOffsetField !== stackedField) {
        // avoid grouping by the stacked field
        groupbyChannels.push(dimensionOffsetChannel);
        groupbyFields.add(dimensionOffsetField);
      }
    } // If the dimension has offset, don't stack anymore
    // Should have grouping level of detail that is different from the dimension field


    const stackBy = NONPOSITION_CHANNELS.reduce((sc, channel) => {
      // Ignore tooltip in stackBy (https://github.com/vega/vega-lite/issues/4001)
      if (channel !== 'tooltip' && channelHasField(encoding, channel)) {
        const channelDef = encoding[channel];

        for (const cDef of vega.array(channelDef)) {
          const fieldDef = getFieldDef(cDef);

          if (fieldDef.aggregate) {
            continue;
          } // Check whether the channel's field is identical to x/y's field or if the channel is a repeat


          const f = vgField(fieldDef, {});

          if ( // if fielddef is a repeat, just include it in the stack by
          !f || // otherwise, the field must be different from the groupBy fields.
          !groupbyFields.has(f)) {
            sc.push({
              channel,
              fieldDef
            });
          }
        }
      }

      return sc;
    }, []); // Automatically determine offset

    let offset;

    if (stackedFieldDef.stack !== undefined) {
      if (vega.isBoolean(stackedFieldDef.stack)) {
        offset = stackedFieldDef.stack ? 'zero' : null;
      } else {
        offset = stackedFieldDef.stack;
      }
    } else if (STACK_BY_DEFAULT_MARKS.has(mark)) {
      offset = 'zero';
    }

    if (!offset || !isStackOffset(offset)) {
      return null;
    }

    if (isAggregate$1(encoding) && stackBy.length === 0) {
      return null;
    } // warn when stacking non-linear


    if (stackedFieldDef !== null && stackedFieldDef !== void 0 && (_stackedFieldDef$scal = stackedFieldDef.scale) !== null && _stackedFieldDef$scal !== void 0 && _stackedFieldDef$scal.type && (stackedFieldDef === null || stackedFieldDef === void 0 ? void 0 : (_stackedFieldDef$scal2 = stackedFieldDef.scale) === null || _stackedFieldDef$scal2 === void 0 ? void 0 : _stackedFieldDef$scal2.type) !== ScaleType.LINEAR) {
      if (opt.disallowNonLinearStack) {
        return null;
      } else {
        warn(cannotStackNonLinearScale(stackedFieldDef.scale.type));
      }
    } // Check if it is a ranged mark


    if (isFieldOrDatumDef(encoding[getSecondaryRangeChannel(fieldChannel)])) {
      if (stackedFieldDef.stack !== undefined) {
        warn(cannotStackRangedMark(fieldChannel));
      }

      return null;
    } // Warn if stacking non-summative aggregate


    if (isFieldDef(stackedFieldDef) && stackedFieldDef.aggregate && !SUM_OPS.has(stackedFieldDef.aggregate)) {
      warn(stackNonSummativeAggregate(stackedFieldDef.aggregate));
    }

    return {
      groupbyChannels,
      groupbyFields,
      fieldChannel,
      impute: stackedFieldDef.impute === null ? false : isPathMark(mark),
      stackBy,
      offset
    };
  }

  function dropLineAndPoint(markDef) {
    const {
      point: _point,
      line: _line,
      ...mark
    } = markDef;
    return keys(mark).length > 1 ? mark : mark.type;
  }

  function dropLineAndPointFromConfig(config) {
    for (const mark of ['line', 'area', 'rule', 'trail']) {
      if (config[mark]) {
        config = { ...config,
          // TODO: remove as any
          [mark]: omit(config[mark], ['point', 'line'])
        };
      }
    }

    return config;
  }

  function getPointOverlay(markDef) {
    let markConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let encoding = arguments.length > 2 ? arguments[2] : undefined;

    if (markDef.point === 'transparent') {
      return {
        opacity: 0
      };
    } else if (markDef.point) {
      // truthy : true or object
      return vega.isObject(markDef.point) ? markDef.point : {};
    } else if (markDef.point !== undefined) {
      // false or null
      return null;
    } else {
      // undefined (not disabled)
      if (markConfig.point || encoding.shape) {
        // enable point overlay if config[mark].point is truthy or if encoding.shape is provided
        return vega.isObject(markConfig.point) ? markConfig.point : {};
      } // markDef.point is defined as falsy


      return undefined;
    }
  }

  function getLineOverlay(markDef) {
    let markConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (markDef.line) {
      // true or object
      return markDef.line === true ? {} : markDef.line;
    } else if (markDef.line !== undefined) {
      // false or null
      return null;
    } else {
      // undefined (not disabled)
      if (markConfig.line) {
        // enable line overlay if config[mark].line is truthy
        return markConfig.line === true ? {} : markConfig.line;
      } // markDef.point is defined as falsy


      return undefined;
    }
  }

  class PathOverlayNormalizer {
    constructor() {
      _defineProperty(this, "name", 'path-overlay');
    }

    hasMatchingType(spec, config) {
      if (isUnitSpec(spec)) {
        const {
          mark,
          encoding
        } = spec;
        const markDef = isMarkDef(mark) ? mark : {
          type: mark
        };

        switch (markDef.type) {
          case 'line':
          case 'rule':
          case 'trail':
            return !!getPointOverlay(markDef, config[markDef.type], encoding);

          case 'area':
            return (// false / null are also included as we want to remove the properties
              !!getPointOverlay(markDef, config[markDef.type], encoding) || !!getLineOverlay(markDef, config[markDef.type])
            );
        }
      }

      return false;
    }

    run(spec, normParams, normalize) {
      const {
        config
      } = normParams;
      const {
        params,
        projection,
        mark,
        encoding: e,
        ...outerSpec
      } = spec; // Need to call normalizeEncoding because we need the inferred types to correctly determine stack

      const encoding = normalizeEncoding(e, config);
      const markDef = isMarkDef(mark) ? mark : {
        type: mark
      };
      const pointOverlay = getPointOverlay(markDef, config[markDef.type], encoding);
      const lineOverlay = markDef.type === 'area' && getLineOverlay(markDef, config[markDef.type]);
      const layer = [{ ...(params ? {
          params
        } : {}),
        mark: dropLineAndPoint({ // TODO: extract this 0.7 to be shared with default opacity for point/tick/...
          ...(markDef.type === 'area' && markDef.opacity === undefined && markDef.fillOpacity === undefined ? {
            opacity: 0.7
          } : {}),
          ...markDef
        }),
        // drop shape from encoding as this might be used to trigger point overlay
        encoding: omit(encoding, ['shape'])
      }]; // FIXME: determine rules for applying selections.
      // Need to copy stack config to overlayed layer

      const stackProps = stack(markDef, encoding);
      let overlayEncoding = encoding;

      if (stackProps) {
        const {
          fieldChannel: stackFieldChannel,
          offset
        } = stackProps;
        overlayEncoding = { ...encoding,
          [stackFieldChannel]: { ...encoding[stackFieldChannel],
            ...(offset ? {
              stack: offset
            } : {})
          }
        };
      }

      if (lineOverlay) {
        layer.push({ ...(projection ? {
            projection
          } : {}),
          mark: {
            type: 'line',
            ...pick(markDef, ['clip', 'interpolate', 'tension', 'tooltip']),
            ...lineOverlay
          },
          encoding: overlayEncoding
        });
      }

      if (pointOverlay) {
        layer.push({ ...(projection ? {
            projection
          } : {}),
          mark: {
            type: 'point',
            opacity: 1,
            filled: true,
            ...pick(markDef, ['clip', 'tooltip']),
            ...pointOverlay
          },
          encoding: overlayEncoding
        });
      }

      return normalize({ ...outerSpec,
        layer
      }, { ...normParams,
        config: dropLineAndPointFromConfig(config)
      });
    }

  }

  function replaceRepeaterInFacet(facet, repeater) {
    if (!repeater) {
      return facet;
    }

    if (isFacetMapping(facet)) {
      return replaceRepeaterInMapping(facet, repeater);
    }

    return replaceRepeaterInFieldDef(facet, repeater);
  }
  function replaceRepeaterInEncoding(encoding, repeater) {
    if (!repeater) {
      return encoding;
    }

    return replaceRepeaterInMapping(encoding, repeater);
  }
  /**
   * Replaces repeated value and returns if the repeated value is valid.
   */

  function replaceRepeatInProp(prop, o, repeater) {
    const val = o[prop];

    if (isRepeatRef(val)) {
      if (val.repeat in repeater) {
        return { ...o,
          [prop]: repeater[val.repeat]
        };
      } else {
        warn(noSuchRepeatedValue(val.repeat));
        return undefined;
      }
    }

    return o;
  }
  /**
   * Replace repeater values in a field def with the concrete field name.
   */


  function replaceRepeaterInFieldDef(fieldDef, repeater) {
    fieldDef = replaceRepeatInProp('field', fieldDef, repeater);

    if (fieldDef === undefined) {
      // the field def should be ignored
      return undefined;
    } else if (fieldDef === null) {
      return null;
    }

    if (isSortableFieldDef(fieldDef) && isSortField(fieldDef.sort)) {
      const sort = replaceRepeatInProp('field', fieldDef.sort, repeater);
      fieldDef = { ...fieldDef,
        ...(sort ? {
          sort
        } : {})
      };
    }

    return fieldDef;
  }

  function replaceRepeaterInFieldOrDatumDef(def, repeater) {
    if (isFieldDef(def)) {
      return replaceRepeaterInFieldDef(def, repeater);
    } else {
      const datumDef = replaceRepeatInProp('datum', def, repeater);

      if (datumDef !== def && !datumDef.type) {
        datumDef.type = 'nominal';
      }

      return datumDef;
    }
  }

  function replaceRepeaterInChannelDef(channelDef, repeater) {
    if (isFieldOrDatumDef(channelDef)) {
      const fd = replaceRepeaterInFieldOrDatumDef(channelDef, repeater);

      if (fd) {
        return fd;
      } else if (isConditionalDef(channelDef)) {
        return {
          condition: channelDef.condition
        };
      }
    } else {
      if (hasConditionalFieldOrDatumDef(channelDef)) {
        const fd = replaceRepeaterInFieldOrDatumDef(channelDef.condition, repeater);

        if (fd) {
          return { ...channelDef,
            condition: fd
          };
        } else {
          const {
            condition,
            ...channelDefWithoutCondition
          } = channelDef;
          return channelDefWithoutCondition;
        }
      }

      return channelDef;
    }

    return undefined;
  }

  function replaceRepeaterInMapping(mapping, repeater) {
    const out = {};

    for (const channel in mapping) {
      if (vega.hasOwnProperty(mapping, channel)) {
        const channelDef = mapping[channel];

        if (vega.isArray(channelDef)) {
          // array cannot have condition
          out[channel] = channelDef // somehow we need to cast it here
          .map(cd => replaceRepeaterInChannelDef(cd, repeater)).filter(cd => cd);
        } else {
          const cd = replaceRepeaterInChannelDef(channelDef, repeater);

          if (cd !== undefined) {
            out[channel] = cd;
          }
        }
      }
    }

    return out;
  }

  class RuleForRangedLineNormalizer {
    constructor() {
      _defineProperty(this, "name", 'RuleForRangedLine');
    }

    hasMatchingType(spec) {
      if (isUnitSpec(spec)) {
        const {
          encoding,
          mark
        } = spec;

        if (mark === 'line' || isMarkDef(mark) && mark.type === 'line') {
          for (const channel of SECONDARY_RANGE_CHANNEL) {
            const mainChannel = getMainRangeChannel(channel);
            const mainChannelDef = encoding[mainChannel];

            if (encoding[channel]) {
              if (isFieldDef(mainChannelDef) && !isBinned(mainChannelDef.bin) || isDatumDef(mainChannelDef)) {
                return true;
              }
            }
          }
        }
      }

      return false;
    }

    run(spec, params, normalize) {
      const {
        encoding,
        mark
      } = spec;
      warn(lineWithRange(!!encoding.x2, !!encoding.y2));
      return normalize({ ...spec,
        mark: vega.isObject(mark) ? { ...mark,
          type: 'rule'
        } : 'rule'
      }, params);
    }

  }

  class CoreNormalizer extends SpecMapper {
    constructor() {
      super(...arguments);

      _defineProperty(this, "nonFacetUnitNormalizers", [boxPlotNormalizer, errorBarNormalizer, errorBandNormalizer, new PathOverlayNormalizer(), new RuleForRangedLineNormalizer()]);
    }

    map(spec, params) {
      // Special handling for a faceted unit spec as it can return a facet spec, not just a layer or unit spec like a normal unit spec.
      if (isUnitSpec(spec)) {
        const hasRow = channelHasField(spec.encoding, ROW);
        const hasColumn = channelHasField(spec.encoding, COLUMN);
        const hasFacet = channelHasField(spec.encoding, FACET);

        if (hasRow || hasColumn || hasFacet) {
          return this.mapFacetedUnit(spec, params);
        }
      }

      return super.map(spec, params);
    } // This is for normalizing non-facet unit


    mapUnit(spec, params) {
      const {
        parentEncoding,
        parentProjection
      } = params;
      const encoding = replaceRepeaterInEncoding(spec.encoding, params.repeater);
      const specWithReplacedEncoding = { ...spec,
        ...(encoding ? {
          encoding
        } : {})
      };

      if (parentEncoding || parentProjection) {
        return this.mapUnitWithParentEncodingOrProjection(specWithReplacedEncoding, params);
      }

      const normalizeLayerOrUnit = this.mapLayerOrUnit.bind(this);

      for (const unitNormalizer of this.nonFacetUnitNormalizers) {
        if (unitNormalizer.hasMatchingType(specWithReplacedEncoding, params.config)) {
          return unitNormalizer.run(specWithReplacedEncoding, params, normalizeLayerOrUnit);
        }
      }

      return specWithReplacedEncoding;
    }

    mapRepeat(spec, params) {
      if (isLayerRepeatSpec(spec)) {
        return this.mapLayerRepeat(spec, params);
      } else {
        return this.mapNonLayerRepeat(spec, params);
      }
    }

    mapLayerRepeat(spec, params) {
      const {
        repeat,
        spec: childSpec,
        ...rest
      } = spec;
      const {
        row,
        column,
        layer
      } = repeat;
      const {
        repeater = {},
        repeaterPrefix = ''
      } = params;

      if (row || column) {
        return this.mapRepeat({ ...spec,
          repeat: { ...(row ? {
              row
            } : {}),
            ...(column ? {
              column
            } : {})
          },
          spec: {
            repeat: {
              layer
            },
            spec: childSpec
          }
        }, params);
      } else {
        return { ...rest,
          layer: layer.map(layerValue => {
            const childRepeater = { ...repeater,
              layer: layerValue
            };
            const childName = "".concat((childSpec.name || '') + repeaterPrefix, "child__layer_").concat(varName(layerValue));
            const child = this.mapLayerOrUnit(childSpec, { ...params,
              repeater: childRepeater,
              repeaterPrefix: childName
            });
            child.name = childName;
            return child;
          })
        };
      }
    }

    mapNonLayerRepeat(spec, params) {
      var _childSpec$data;

      const {
        repeat,
        spec: childSpec,
        data,
        ...remainingProperties
      } = spec;

      if (!vega.isArray(repeat) && spec.columns) {
        // is repeat with row/column
        spec = omit(spec, ['columns']);
        warn(columnsNotSupportByRowCol('repeat'));
      }

      const concat = [];
      const {
        repeater = {},
        repeaterPrefix = ''
      } = params;
      const row = !vega.isArray(repeat) && repeat.row || [repeater ? repeater.row : null];
      const column = !vega.isArray(repeat) && repeat.column || [repeater ? repeater.column : null];
      const repeatValues = vega.isArray(repeat) && repeat || [repeater ? repeater.repeat : null]; // cross product

      for (const repeatValue of repeatValues) {
        for (const rowValue of row) {
          for (const columnValue of column) {
            const childRepeater = {
              repeat: repeatValue,
              row: rowValue,
              column: columnValue,
              layer: repeater.layer
            };
            const childName = (childSpec.name || '') + repeaterPrefix + 'child__' + (vega.isArray(repeat) ? "".concat(varName(repeatValue)) : (repeat.row ? "row_".concat(varName(rowValue)) : '') + (repeat.column ? "column_".concat(varName(columnValue)) : ''));
            const child = this.map(childSpec, { ...params,
              repeater: childRepeater,
              repeaterPrefix: childName
            });
            child.name = childName; // we move data up

            concat.push(omit(child, ['data']));
          }
        }
      }

      const columns = vega.isArray(repeat) ? spec.columns : repeat.column ? repeat.column.length : 1;
      return {
        data: (_childSpec$data = childSpec.data) !== null && _childSpec$data !== void 0 ? _childSpec$data : data,
        // data from child spec should have precedence
        align: 'all',
        ...remainingProperties,
        columns,
        concat
      };
    }

    mapFacet(spec, params) {
      const {
        facet
      } = spec;

      if (isFacetMapping(facet) && spec.columns) {
        // is facet with row/column
        spec = omit(spec, ['columns']);
        warn(columnsNotSupportByRowCol('facet'));
      }

      return super.mapFacet(spec, params);
    }

    mapUnitWithParentEncodingOrProjection(spec, params) {
      const {
        encoding,
        projection
      } = spec;
      const {
        parentEncoding,
        parentProjection,
        config
      } = params;
      const mergedProjection = mergeProjection({
        parentProjection,
        projection
      });
      const mergedEncoding = mergeEncoding({
        parentEncoding,
        encoding: replaceRepeaterInEncoding(encoding, params.repeater)
      });
      return this.mapUnit({ ...spec,
        ...(mergedProjection ? {
          projection: mergedProjection
        } : {}),
        ...(mergedEncoding ? {
          encoding: mergedEncoding
        } : {})
      }, {
        config
      });
    }

    mapFacetedUnit(spec, normParams) {
      // New encoding in the inside spec should not contain row / column
      // as row/column should be moved to facet
      const {
        row,
        column,
        facet,
        ...encoding
      } = spec.encoding; // Mark and encoding should be moved into the inner spec

      const {
        mark,
        width,
        projection,
        height,
        view,
        params,
        encoding: _,
        ...outerSpec
      } = spec;
      const {
        facetMapping,
        layout
      } = this.getFacetMappingAndLayout({
        row,
        column,
        facet
      }, normParams);
      const newEncoding = replaceRepeaterInEncoding(encoding, normParams.repeater);
      return this.mapFacet({ ...outerSpec,
        ...layout,
        // row / column has higher precedence than facet
        facet: facetMapping,
        spec: { ...(width ? {
            width
          } : {}),
          ...(height ? {
            height
          } : {}),
          ...(view ? {
            view
          } : {}),
          ...(projection ? {
            projection
          } : {}),
          mark,
          encoding: newEncoding,
          ...(params ? {
            params
          } : {})
        }
      }, normParams);
    }

    getFacetMappingAndLayout(facets, params) {
      const {
        row,
        column,
        facet
      } = facets;

      if (row || column) {
        if (facet) {
          warn(facetChannelDropped([...(row ? [ROW] : []), ...(column ? [COLUMN] : [])]));
        }

        const facetMapping = {};
        const layout = {};

        for (const channel of [ROW, COLUMN]) {
          const def = facets[channel];

          if (def) {
            const {
              align,
              center,
              spacing,
              columns,
              ...defWithoutLayout
            } = def;
            facetMapping[channel] = defWithoutLayout;

            for (const prop of ['align', 'center', 'spacing']) {
              if (def[prop] !== undefined) {
                var _layout$prop;

                (_layout$prop = layout[prop]) !== null && _layout$prop !== void 0 ? _layout$prop : layout[prop] = {};
                layout[prop][channel] = def[prop];
              }
            }
          }
        }

        return {
          facetMapping,
          layout
        };
      } else {
        const {
          align,
          center,
          spacing,
          columns,
          ...facetMapping
        } = facet;
        return {
          facetMapping: replaceRepeaterInFacet(facetMapping, params.repeater),
          layout: { ...(align ? {
              align
            } : {}),
            ...(center ? {
              center
            } : {}),
            ...(spacing ? {
              spacing
            } : {}),
            ...(columns ? {
              columns
            } : {})
          }
        };
      }
    }

    mapLayer(spec, _ref) {
      let {
        parentEncoding,
        parentProjection,
        ...otherParams
      } = _ref;
      // Special handling for extended layer spec
      const {
        encoding,
        projection,
        ...rest
      } = spec;
      const params = { ...otherParams,
        parentEncoding: mergeEncoding({
          parentEncoding,
          encoding,
          layer: true
        }),
        parentProjection: mergeProjection({
          parentProjection,
          projection
        })
      };
      return super.mapLayer(rest, params);
    }

  }

  function mergeEncoding(_ref2) {
    let {
      parentEncoding,
      encoding = {},
      layer
    } = _ref2;
    let merged = {};

    if (parentEncoding) {
      const channels = new Set([...keys(parentEncoding), ...keys(encoding)]);

      for (const channel of channels) {
        const channelDef = encoding[channel];
        const parentChannelDef = parentEncoding[channel];

        if (isFieldOrDatumDef(channelDef)) {
          // Field/Datum Def can inherit properties from its parent
          // Note that parentChannelDef doesn't have to be a field/datum def if the channelDef is already one.
          const mergedChannelDef = { ...parentChannelDef,
            ...channelDef
          };
          merged[channel] = mergedChannelDef;
        } else if (hasConditionalFieldOrDatumDef(channelDef)) {
          merged[channel] = { ...channelDef,
            condition: { ...parentChannelDef,
              ...channelDef.condition
            }
          };
        } else if (channelDef || channelDef === null) {
          merged[channel] = channelDef;
        } else if (layer || isValueDef(parentChannelDef) || isSignalRef(parentChannelDef) || isFieldOrDatumDef(parentChannelDef) || vega.isArray(parentChannelDef)) {
          merged[channel] = parentChannelDef;
        }
      }
    } else {
      merged = encoding;
    }

    return !merged || isEmpty(merged) ? undefined : merged;
  }

  function mergeProjection(opt) {
    const {
      parentProjection,
      projection
    } = opt;

    if (parentProjection && projection) {
      warn(projectionOverridden({
        parentProjection,
        projection
      }));
    }

    return projection !== null && projection !== void 0 ? projection : parentProjection;
  }

  function isFilter(t) {
    return 'filter' in t;
  }
  function isImputeSequence(t) {
    return (t === null || t === void 0 ? void 0 : t['stop']) !== undefined;
  }
  function isLookup(t) {
    return 'lookup' in t;
  }
  function isLookupData(from) {
    return 'data' in from;
  }
  function isLookupSelection(from) {
    return 'param' in from;
  }
  function isPivot(t) {
    return 'pivot' in t;
  }
  function isDensity(t) {
    return 'density' in t;
  }
  function isQuantile(t) {
    return 'quantile' in t;
  }
  function isRegression(t) {
    return 'regression' in t;
  }
  function isLoess(t) {
    return 'loess' in t;
  }
  function isSample(t) {
    return 'sample' in t;
  }
  function isWindow(t) {
    return 'window' in t;
  }
  function isJoinAggregate(t) {
    return 'joinaggregate' in t;
  }
  function isFlatten(t) {
    return 'flatten' in t;
  }
  function isCalculate(t) {
    return 'calculate' in t;
  }
  function isBin(t) {
    return 'bin' in t;
  }
  function isImpute(t) {
    return 'impute' in t;
  }
  function isTimeUnit(t) {
    return 'timeUnit' in t;
  }
  function isAggregate(t) {
    return 'aggregate' in t;
  }
  function isStack(t) {
    return 'stack' in t;
  }
  function isFold(t) {
    return 'fold' in t;
  }
  function normalizeTransform(transform) {
    return transform.map(t => {
      if (isFilter(t)) {
        return {
          filter: normalizeLogicalComposition(t.filter, normalizePredicate$1)
        };
      }

      return t;
    });
  }

  class SelectionCompatibilityNormalizer extends SpecMapper {
    map(spec, normParams) {
      var _normParams$emptySele, _normParams$selection;

      (_normParams$emptySele = normParams.emptySelections) !== null && _normParams$emptySele !== void 0 ? _normParams$emptySele : normParams.emptySelections = {};
      (_normParams$selection = normParams.selectionPredicates) !== null && _normParams$selection !== void 0 ? _normParams$selection : normParams.selectionPredicates = {};
      spec = normalizeTransforms(spec, normParams);
      return super.map(spec, normParams);
    }

    mapLayerOrUnit(spec, normParams) {
      spec = normalizeTransforms(spec, normParams);

      if (spec.encoding) {
        const encoding = {};

        for (const [channel, enc] of entries$1(spec.encoding)) {
          encoding[channel] = normalizeChannelDef(enc, normParams);
        }

        spec = { ...spec,
          encoding
        };
      }

      return super.mapLayerOrUnit(spec, normParams);
    }

    mapUnit(spec, normParams) {
      const {
        selection,
        ...rest
      } = spec;

      if (selection) {
        return { ...rest,
          params: entries$1(selection).map(_ref => {
            let [name, selDef] = _ref;
            const {
              init: value,
              bind,
              empty,
              ...select
            } = selDef;

            if (select.type === 'single') {
              select.type = 'point';
              select.toggle = false;
            } else if (select.type === 'multi') {
              select.type = 'point';
            } // Propagate emptiness forwards and backwards


            normParams.emptySelections[name] = empty !== 'none';

            for (const pred of vals((_normParams$selection2 = normParams.selectionPredicates[name]) !== null && _normParams$selection2 !== void 0 ? _normParams$selection2 : {})) {
              var _normParams$selection2;

              pred.empty = empty !== 'none';
            }

            return {
              name,
              value,
              select,
              bind
            };
          })
        };
      }

      return spec;
    }

  }

  function normalizeTransforms(spec, normParams) {
    const {
      transform: tx,
      ...rest
    } = spec;

    if (tx) {
      const transform = tx.map(t => {
        if (isFilter(t)) {
          return {
            filter: normalizePredicate(t, normParams)
          };
        } else if (isBin(t) && isBinParams(t.bin)) {
          return { ...t,
            bin: normalizeBinExtent(t.bin)
          };
        } else if (isLookup(t)) {
          const {
            selection: param,
            ...from
          } = t.from;
          return param ? { ...t,
            from: {
              param,
              ...from
            }
          } : t;
        }

        return t;
      });
      return { ...rest,
        transform
      };
    }

    return spec;
  }

  function normalizeChannelDef(obj, normParams) {
    var _enc$scale, _enc$scale$domain;

    const enc = duplicate(obj);

    if (isFieldDef(enc) && isBinParams(enc.bin)) {
      enc.bin = normalizeBinExtent(enc.bin);
    }

    if (isScaleFieldDef(enc) && (_enc$scale = enc.scale) !== null && _enc$scale !== void 0 && (_enc$scale$domain = _enc$scale.domain) !== null && _enc$scale$domain !== void 0 && _enc$scale$domain.selection) {
      const {
        selection: param,
        ...domain
      } = enc.scale.domain;
      enc.scale.domain = { ...domain,
        ...(param ? {
          param
        } : {})
      };
    }

    if (isConditionalDef(enc)) {
      if (vega.isArray(enc.condition)) {
        enc.condition = enc.condition.map(c => {
          const {
            selection,
            param,
            test,
            ...cond
          } = c;
          return param ? c : { ...cond,
            test: normalizePredicate(c, normParams)
          };
        });
      } else {
        const {
          selection,
          param,
          test,
          ...cond
        } = normalizeChannelDef(enc.condition, normParams);
        enc.condition = param ? enc.condition : { ...cond,
          test: normalizePredicate(enc.condition, normParams)
        };
      }
    }

    return enc;
  }

  function normalizeBinExtent(bin) {
    const ext = bin.extent;

    if (ext !== null && ext !== void 0 && ext.selection) {
      const {
        selection: param,
        ...rest
      } = ext;
      return { ...bin,
        extent: { ...rest,
          param
        }
      };
    }

    return bin;
  }

  function normalizePredicate(op, normParams) {
    // Normalize old compositions of selection names (e.g., selection: {and: ["one", "two"]})
    const normalizeSelectionComposition = o => {
      return normalizeLogicalComposition(o, param => {
        var _normParams$emptySele2, _normParams$selection3, _normParams$selection4;

        const empty = (_normParams$emptySele2 = normParams.emptySelections[param]) !== null && _normParams$emptySele2 !== void 0 ? _normParams$emptySele2 : true;
        const pred = {
          param,
          empty
        };
        (_normParams$selection4 = (_normParams$selection3 = normParams.selectionPredicates)[param]) !== null && _normParams$selection4 !== void 0 ? _normParams$selection4 : _normParams$selection3[param] = [];
        normParams.selectionPredicates[param].push(pred);
        return pred;
      });
    };

    return op.selection ? normalizeSelectionComposition(op.selection) : normalizeLogicalComposition(op.test || op.filter, o => o.selection ? normalizeSelectionComposition(o.selection) : o);
  }

  class TopLevelSelectionsNormalizer extends SpecMapper {
    map(spec, normParams) {
      var _normParams$selection;

      const selections = (_normParams$selection = normParams.selections) !== null && _normParams$selection !== void 0 ? _normParams$selection : [];

      if (spec.params && !isUnitSpec(spec)) {
        const params = [];

        for (const param of spec.params) {
          if (isSelectionParameter(param)) {
            selections.push(param);
          } else {
            params.push(param);
          }
        }

        spec.params = params;
      }

      normParams.selections = selections;
      return super.map(spec, addSpecNameToParams(spec, normParams));
    }

    mapUnit(spec, normParams) {
      var _normParams$path;

      const selections = normParams.selections;
      if (!selections || !selections.length) return spec;
      const path = ((_normParams$path = normParams.path) !== null && _normParams$path !== void 0 ? _normParams$path : []).concat(spec.name);
      const params = [];

      for (const selection of selections) {
        // By default, apply selections to all unit views.
        if (!selection.views || !selection.views.length) {
          params.push(selection);
        } else {
          for (const view of selection.views) {
            // view is either a specific unit name, or a partial path through the spec tree.
            if (vega.isString(view) && (view === spec.name || path.indexOf(view) >= 0) || vega.isArray(view) && view.map(v => path.indexOf(v)).every((v, i, arr) => v !== -1 && (i === 0 || v > arr[i - 1]))) {
              params.push(selection);
            }
          }
        }
      }

      if (params.length) spec.params = params;
      return spec;
    }

  }

  for (const method of ['mapFacet', 'mapRepeat', 'mapHConcat', 'mapVConcat', 'mapLayer']) {
    const proto = TopLevelSelectionsNormalizer.prototype[method];

    TopLevelSelectionsNormalizer.prototype[method] = function (spec, params) {
      return proto.call(this, spec, addSpecNameToParams(spec, params));
    };
  }

  function addSpecNameToParams(spec, params) {
    var _params$path;

    return spec.name ? { ...params,
      path: ((_params$path = params.path) !== null && _params$path !== void 0 ? _params$path : []).concat(spec.name)
    } : params;
  }

  function normalize(spec, config) {
    if (config === undefined) {
      config = initConfig(spec.config);
    }

    const normalizedSpec = normalizeGenericSpec(spec, config);
    const {
      width,
      height
    } = spec;
    const autosize = normalizeAutoSize(normalizedSpec, {
      width,
      height,
      autosize: spec.autosize
    }, config);
    return { ...normalizedSpec,
      ...(autosize ? {
        autosize
      } : {})
    };
  }
  const coreNormalizer = new CoreNormalizer();
  const selectionCompatNormalizer = new SelectionCompatibilityNormalizer();
  const topLevelSelectionNormalizer = new TopLevelSelectionsNormalizer();
  /**
   * Decompose extended unit specs into composition of pure unit specs.
   * And push top-level selection definitions down to unit specs.
   */

  function normalizeGenericSpec(spec) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const normParams = {
      config
    };
    return topLevelSelectionNormalizer.map(coreNormalizer.map(selectionCompatNormalizer.map(spec, normParams), normParams), normParams);
  }

  function _normalizeAutoSize(autosize) {
    return vega.isString(autosize) ? {
      type: autosize
    } : autosize !== null && autosize !== void 0 ? autosize : {};
  }
  /**
   * Normalize autosize and deal with width or height == "container".
   */


  function normalizeAutoSize(spec, sizeInfo, config) {
    let {
      width,
      height
    } = sizeInfo;
    const isFitCompatible = isUnitSpec(spec) || isLayerSpec(spec);
    const autosizeDefault = {};

    if (!isFitCompatible) {
      // If spec is not compatible with autosize == "fit", discard width/height == container
      if (width == 'container') {
        warn(containerSizeNonSingle('width'));
        width = undefined;
      }

      if (height == 'container') {
        warn(containerSizeNonSingle('height'));
        height = undefined;
      }
    } else {
      // Default autosize parameters to fit when width/height is "container"
      if (width == 'container' && height == 'container') {
        autosizeDefault.type = 'fit';
        autosizeDefault.contains = 'padding';
      } else if (width == 'container') {
        autosizeDefault.type = 'fit-x';
        autosizeDefault.contains = 'padding';
      } else if (height == 'container') {
        autosizeDefault.type = 'fit-y';
        autosizeDefault.contains = 'padding';
      }
    }

    const autosize = {
      type: 'pad',
      ...autosizeDefault,
      ...(config ? _normalizeAutoSize(config.autosize) : {}),
      ..._normalizeAutoSize(spec.autosize)
    };

    if (autosize.type === 'fit' && !isFitCompatible) {
      warn(FIT_NON_SINGLE);
      autosize.type = 'pad';
    }

    if (width == 'container' && !(autosize.type == 'fit' || autosize.type == 'fit-x')) {
      warn(containerSizeNotCompatibleWithAutosize('width'));
    }

    if (height == 'container' && !(autosize.type == 'fit' || autosize.type == 'fit-y')) {
      warn(containerSizeNotCompatibleWithAutosize('height'));
    } // Delete autosize property if it's Vega's default


    if (deepEqual(autosize, {
      type: 'pad'
    })) {
      return undefined;
    }

    return autosize;
  }

  /**
   * Generic class for storing properties that are explicitly specified
   * and implicitly determined by the compiler.
   * This is important for scale/axis/legend merging as
   * we want to prioritize properties that users explicitly specified.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types

  class Split {
    constructor() {
      let explicit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let implicit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.explicit = explicit;
      this.implicit = implicit;
    }

    clone() {
      return new Split(duplicate(this.explicit), duplicate(this.implicit));
    }

    combine() {
      return { ...this.explicit,
        // Explicit properties comes first
        ...this.implicit
      };
    }

    get(key) {
      // Explicit has higher precedence
      return getFirstDefined(this.explicit[key], this.implicit[key]);
    }

    getWithExplicit(key) {
      // Explicit has higher precedence
      if (this.explicit[key] !== undefined) {
        return {
          explicit: true,
          value: this.explicit[key]
        };
      } else if (this.implicit[key] !== undefined) {
        return {
          explicit: false,
          value: this.implicit[key]
        };
      }

      return {
        explicit: false,
        value: undefined
      };
    }

    setWithExplicit(key, _ref) {
      let {
        value,
        explicit
      } = _ref;

      if (value !== undefined) {
        this.set(key, value, explicit);
      }
    }

    set(key, value, explicit) {
      delete this[explicit ? 'implicit' : 'explicit'][key];
      this[explicit ? 'explicit' : 'implicit'][key] = value;
      return this;
    }

    copyKeyFromSplit(key, _ref2) {
      let {
        explicit,
        implicit
      } = _ref2;

      // Explicit has higher precedence
      if (explicit[key] !== undefined) {
        this.set(key, explicit[key], true);
      } else if (implicit[key] !== undefined) {
        this.set(key, implicit[key], false);
      }
    }

    copyKeyFromObject(key, s) {
      // Explicit has higher precedence
      if (s[key] !== undefined) {
        this.set(key, s[key], true);
      }
    }
    /**
     * Merge split object into this split object. Properties from the other split
     * overwrite properties from this split.
     */


    copyAll(other) {
      for (const key of keys(other.combine())) {
        const val = other.getWithExplicit(key);
        this.setWithExplicit(key, val);
      }
    }

  }
  function makeExplicit(value) {
    return {
      explicit: true,
      value
    };
  }
  function makeImplicit(value) {
    return {
      explicit: false,
      value
    };
  }
  function tieBreakByComparing(compare) {
    return (v1, v2, property, propertyOf) => {
      const diff = compare(v1.value, v2.value);

      if (diff > 0) {
        return v1;
      } else if (diff < 0) {
        return v2;
      }

      return defaultTieBreaker(v1, v2, property, propertyOf);
    };
  }
  function defaultTieBreaker(v1, v2, property, propertyOf) {
    if (v1.explicit && v2.explicit) {
      warn(mergeConflictingProperty(property, propertyOf, v1.value, v2.value));
    } // If equal score, prefer v1.


    return v1;
  }
  function mergeValuesWithExplicit(v1, v2, property, propertyOf) {
    let tieBreaker = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultTieBreaker;

    if (v1 === undefined || v1.value === undefined) {
      // For first run
      return v2;
    }

    if (v1.explicit && !v2.explicit) {
      return v1;
    } else if (v2.explicit && !v1.explicit) {
      return v2;
    } else if (deepEqual(v1.value, v2.value)) {
      return v1;
    } else {
      return tieBreaker(v1, v2, property, propertyOf);
    }
  }

  /**
   * Class to track interesting properties (see https://15721.courses.cs.cmu.edu/spring2016/papers/graefe-ieee1995.pdf)
   * about how fields have been parsed or whether they have been derived in a transform. We use this to not parse the
   * same field again (or differently).
   */
  class AncestorParse extends Split {
    constructor() {
      let explicit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let implicit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let parseNothing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      super(explicit, implicit);
      this.explicit = explicit;
      this.implicit = implicit;
      this.parseNothing = parseNothing;
    }

    clone() {
      const clone = super.clone();
      clone.parseNothing = this.parseNothing;
      return clone;
    }

  }

  /*
   * Constants and utilities for data.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isUrlData(data) {
    return 'url' in data;
  }
  function isInlineData(data) {
    return 'values' in data;
  }
  function isNamedData(data) {
    return 'name' in data && !isUrlData(data) && !isInlineData(data) && !isGenerator(data);
  }
  function isGenerator(data) {
    return data && (isSequenceGenerator(data) || isSphereGenerator(data) || isGraticuleGenerator(data));
  }
  function isSequenceGenerator(data) {
    return 'sequence' in data;
  }
  function isSphereGenerator(data) {
    return 'sphere' in data;
  }
  function isGraticuleGenerator(data) {
    return 'graticule' in data;
  }
  let DataSourceType;

  (function (DataSourceType) {
    DataSourceType[DataSourceType["Raw"] = 0] = "Raw";
    DataSourceType[DataSourceType["Main"] = 1] = "Main";
    DataSourceType[DataSourceType["Row"] = 2] = "Row";
    DataSourceType[DataSourceType["Column"] = 3] = "Column";
    DataSourceType[DataSourceType["Lookup"] = 4] = "Lookup";
  })(DataSourceType || (DataSourceType = {}));

  function assembleInit(init) {
    let isExpr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let wrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vega.identity;

    if (vega.isArray(init)) {
      const assembled = init.map(v => assembleInit(v, isExpr, wrap));
      return isExpr ? "[".concat(assembled.join(', '), "]") : assembled;
    } else if (isDateTime(init)) {
      if (isExpr) {
        return wrap(dateTimeToExpr(init));
      } else {
        return wrap(dateTimeToTimestamp(init));
      }
    }

    return isExpr ? wrap(stringify(init)) : init;
  }
  function assembleUnitSelectionSignals(model, signals) {
    for (const selCmpt of vals((_model$component$sele = model.component.selection) !== null && _model$component$sele !== void 0 ? _model$component$sele : {})) {
      var _model$component$sele;

      const name = selCmpt.name;
      let modifyExpr = "".concat(name).concat(TUPLE, ", ").concat(selCmpt.resolve === 'global' ? 'true' : "{unit: ".concat(unitName(model), "}"));

      for (const c of selectionCompilers) {
        if (!c.defined(selCmpt)) continue;
        if (c.signals) signals = c.signals(model, selCmpt, signals);
        if (c.modifyExpr) modifyExpr = c.modifyExpr(model, selCmpt, modifyExpr);
      }

      signals.push({
        name: name + MODIFY,
        on: [{
          events: {
            signal: selCmpt.name + TUPLE
          },
          update: "modify(".concat(vega.stringValue(selCmpt.name + STORE), ", ").concat(modifyExpr, ")")
        }]
      });
    }

    return cleanupEmptyOnArray(signals);
  }
  function assembleFacetSignals(model, signals) {
    if (model.component.selection && keys(model.component.selection).length) {
      const name = vega.stringValue(model.getName('cell'));
      signals.unshift({
        name: 'facet',
        value: {},
        on: [{
          events: vega.parseSelector('mousemove', 'scope'),
          update: "isTuple(facet) ? facet : group(".concat(name, ").datum")
        }]
      });
    }

    return cleanupEmptyOnArray(signals);
  }
  function assembleTopLevelSignals(model, signals) {
    let hasSelections = false;

    for (const selCmpt of vals((_model$component$sele2 = model.component.selection) !== null && _model$component$sele2 !== void 0 ? _model$component$sele2 : {})) {
      var _model$component$sele2;

      const name = selCmpt.name;
      const store = vega.stringValue(name + STORE);
      const hasSg = signals.filter(s => s.name === name);

      if (hasSg.length === 0) {
        const resolve = selCmpt.resolve === 'global' ? 'union' : selCmpt.resolve;
        const isPoint = selCmpt.type === 'point' ? ', true, true)' : ')';
        signals.push({
          name: selCmpt.name,
          update: "".concat(VL_SELECTION_RESOLVE, "(").concat(store, ", ").concat(vega.stringValue(resolve)).concat(isPoint)
        });
      }

      hasSelections = true;

      for (const c of selectionCompilers) {
        if (c.defined(selCmpt) && c.topLevelSignals) {
          signals = c.topLevelSignals(model, selCmpt, signals);
        }
      }
    }

    if (hasSelections) {
      const hasUnit = signals.filter(s => s.name === 'unit');

      if (hasUnit.length === 0) {
        signals.unshift({
          name: 'unit',
          value: {},
          on: [{
            events: 'mousemove',
            update: 'isTuple(group()) ? group() : unit'
          }]
        });
      }
    }

    return cleanupEmptyOnArray(signals);
  }
  function assembleUnitSelectionData(model, data) {
    const dataCopy = [...data];

    for (const selCmpt of vals((_model$component$sele3 = model.component.selection) !== null && _model$component$sele3 !== void 0 ? _model$component$sele3 : {})) {
      var _model$component$sele3;

      const init = {
        name: selCmpt.name + STORE
      };

      if (selCmpt.init) {
        const fields = selCmpt.project.items.map(proj => {
          const {
            signals,
            ...rest
          } = proj;
          return rest;
        });
        init.values = selCmpt.init.map(i => ({
          unit: unitName(model, {
            escape: false
          }),
          fields,
          values: assembleInit(i, false)
        }));
      }

      const contains = dataCopy.filter(d => d.name === selCmpt.name + STORE);

      if (!contains.length) {
        dataCopy.push(init);
      }
    }

    return dataCopy;
  }
  function assembleUnitSelectionMarks(model, marks) {
    for (const selCmpt of vals((_model$component$sele4 = model.component.selection) !== null && _model$component$sele4 !== void 0 ? _model$component$sele4 : {})) {
      var _model$component$sele4;

      for (const c of selectionCompilers) {
        if (c.defined(selCmpt) && c.marks) {
          marks = c.marks(model, selCmpt, marks);
        }
      }
    }

    return marks;
  }
  function assembleLayerSelectionMarks(model, marks) {
    for (const child of model.children) {
      if (isUnitModel(child)) {
        marks = assembleUnitSelectionMarks(child, marks);
      }
    }

    return marks;
  }
  function assembleSelectionScaleDomain(model, extent, scaleCmpt, domain) {
    const parsedExtent = parseSelectionExtent(model, extent.param, extent);
    return {
      signal: hasContinuousDomain(scaleCmpt.get('type')) && vega.isArray(domain) && domain[0] > domain[1] ? "isValid(".concat(parsedExtent, ") && reverse(").concat(parsedExtent, ")") : parsedExtent
    };
  }

  function cleanupEmptyOnArray(signals) {
    return signals.map(s => {
      if (s.on && !s.on.length) delete s.on;
      return s;
    });
  }

  /**
   * A node in the dataflow tree.
   */

  class DataFlowNode {
    constructor(parent, debugName) {
      this.debugName = debugName;

      _defineProperty(this, "_children", []);

      _defineProperty(this, "_parent", null);

      _defineProperty(this, "_hash", void 0);

      if (parent) {
        this.parent = parent;
      }
    }
    /**
     * Clone this node with a deep copy but don't clone links to children or parents.
     */


    clone() {
      throw new Error('Cannot clone node');
    }
    /**
     * Return a hash of the node.
     */


    get parent() {
      return this._parent;
    }
    /**
     * Set the parent of the node and also add this node to the parent's children.
     */


    set parent(parent) {
      this._parent = parent;

      if (parent) {
        parent.addChild(this);
      }
    }

    get children() {
      return this._children;
    }

    numChildren() {
      return this._children.length;
    }

    addChild(child, loc) {
      // do not add the same child twice
      if (this._children.includes(child)) {
        warn(ADD_SAME_CHILD_TWICE);
        return;
      }

      if (loc !== undefined) {
        this._children.splice(loc, 0, child);
      } else {
        this._children.push(child);
      }
    }

    removeChild(oldChild) {
      const loc = this._children.indexOf(oldChild);

      this._children.splice(loc, 1);

      return loc;
    }
    /**
     * Remove node from the dataflow.
     */


    remove() {
      let loc = this._parent.removeChild(this);

      for (const child of this._children) {
        // do not use the set method because we want to insert at a particular location
        child._parent = this._parent;

        this._parent.addChild(child, loc++);
      }
    }
    /**
     * Insert another node as a parent of this node.
     */


    insertAsParentOf(other) {
      const parent = other.parent;
      parent.removeChild(this);
      this.parent = parent;
      other.parent = this;
    }

    swapWithParent() {
      const parent = this._parent;
      const newParent = parent.parent; // reconnect the children

      for (const child of this._children) {
        child.parent = parent;
      } // remove old links


      this._children = []; // equivalent to removing every child link one by one

      parent.removeChild(this);
      parent.parent.removeChild(parent); // swap two nodes

      this.parent = newParent;
      parent.parent = this;
    }

  }
  class OutputNode extends DataFlowNode {
    clone() {
      const cloneObj = new this.constructor();
      cloneObj.debugName = "clone_".concat(this.debugName);
      cloneObj._source = this._source;
      cloneObj._name = "clone_".concat(this._name);
      cloneObj.type = this.type;
      cloneObj.refCounts = this.refCounts;
      cloneObj.refCounts[cloneObj._name] = 0;
      return cloneObj;
    }
    /**
     * @param source The name of the source. Will change in assemble.
     * @param type The type of the output node.
     * @param refCounts A global ref counter map.
     */


    constructor(parent, source, type, refCounts) {
      super(parent, source);
      this.type = type;
      this.refCounts = refCounts;

      _defineProperty(this, "_source", void 0);

      _defineProperty(this, "_name", void 0);

      this._source = this._name = source;

      if (this.refCounts && !(this._name in this.refCounts)) {
        this.refCounts[this._name] = 0;
      }
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      return new Set();
    }

    hash() {
      if (this._hash === undefined) {
        this._hash = "Output ".concat(uniqueId());
      }

      return this._hash;
    }
    /**
     * Request the datasource name and increase the ref counter.
     *
     * During the parsing phase, this will return the simple name such as 'main' or 'raw'.
     * It is crucial to request the name from an output node to mark it as a required node.
     * If nobody ever requests the name, this datasource will not be instantiated in the assemble phase.
     *
     * In the assemble phase, this will return the correct name.
     */


    getSource() {
      this.refCounts[this._name]++;
      return this._source;
    }

    isRequired() {
      return !!this.refCounts[this._name];
    }

    setSource(source) {
      this._source = source;
    }

  }

  class TimeUnitNode extends DataFlowNode {
    clone() {
      return new TimeUnitNode(null, duplicate(this.formula));
    }

    constructor(parent, formula) {
      super(parent);
      this.formula = formula;
    }

    static makeFromEncoding(parent, model) {
      const formula = model.reduceFieldDef((timeUnitComponent, fieldDef) => {
        const {
          field,
          timeUnit
        } = fieldDef;

        if (timeUnit) {
          const as = vgField(fieldDef, {
            forAs: true
          });
          timeUnitComponent[hash({
            as,
            field,
            timeUnit
          })] = {
            as,
            field,
            timeUnit
          };
        }

        return timeUnitComponent;
      }, {});

      if (isEmpty(formula)) {
        return null;
      }

      return new TimeUnitNode(parent, formula);
    }

    static makeFromTransform(parent, t) {
      const {
        timeUnit,
        ...other
      } = { ...t
      };
      const normalizedTimeUnit = normalizeTimeUnit(timeUnit);
      const component = { ...other,
        timeUnit: normalizedTimeUnit
      };
      return new TimeUnitNode(parent, {
        [hash(component)]: component
      });
    }
    /**
     * Merge together TimeUnitNodes assigning the children of `other` to `this`
     * and removing `other`.
     */


    merge(other) {
      this.formula = { ...this.formula
      }; // if the same hash happen twice, merge

      for (const key in other.formula) {
        if (!this.formula[key]) {
          // copy if it's not a duplicate
          this.formula[key] = other.formula[key];
        }
      }

      for (const child of other.children) {
        other.removeChild(child);
        child.parent = this;
      }

      other.remove();
    }
    /**
     * Remove time units coming from the other node.
     */


    removeFormulas(fields) {
      const newFormula = {};

      for (const [key, timeUnit] of entries$1(this.formula)) {
        if (!fields.has(timeUnit.as)) {
          newFormula[key] = timeUnit;
        }
      }

      this.formula = newFormula;
    }

    producedFields() {
      return new Set(vals(this.formula).map(f => f.as));
    }

    dependentFields() {
      return new Set(vals(this.formula).map(f => f.field));
    }

    hash() {
      return "TimeUnit ".concat(hash(this.formula));
    }

    assemble() {
      const transforms = [];

      for (const f of vals(this.formula)) {
        const {
          field,
          as,
          timeUnit
        } = f;
        const {
          unit,
          utc,
          ...params
        } = normalizeTimeUnit(timeUnit);
        transforms.push({
          field: replacePathInField(field),
          type: 'timeunit',
          ...(unit ? {
            units: getTimeUnitParts(unit)
          } : {}),
          ...(utc ? {
            timezone: 'utc'
          } : {}),
          ...params,
          as: [as, "".concat(as, "_end")]
        });
      }

      return transforms;
    }

  }

  const TUPLE_FIELDS = '_tuple_fields';
  /**
   * Whether the selection tuples hold enumerated or ranged values for a field.
   */

  class SelectionProjectionComponent {
    constructor() {
      _defineProperty(this, "hasChannel", void 0);

      _defineProperty(this, "hasField", void 0);

      _defineProperty(this, "timeUnit", void 0);

      _defineProperty(this, "items", void 0);

      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      this.items = items;
      this.hasChannel = {};
      this.hasField = {};
    }

  }
  const project = {
    defined: () => {
      return true; // This transform handles its own defaults, so always run parse.
    },
    parse: (model, selCmpt, selDef) => {
      var _selCmpt$project;

      const name = selCmpt.name;
      const proj = (_selCmpt$project = selCmpt.project) !== null && _selCmpt$project !== void 0 ? _selCmpt$project : selCmpt.project = new SelectionProjectionComponent();
      const parsed = {};
      const timeUnits = {};
      const signals = new Set();

      const signalName = (p, range) => {
        const suffix = range === 'visual' ? p.channel : p.field;
        let sg = varName("".concat(name, "_").concat(suffix));

        for (let counter = 1; signals.has(sg); counter++) {
          sg = varName("".concat(name, "_").concat(suffix, "_").concat(counter));
        }

        signals.add(sg);
        return {
          [range]: sg
        };
      };

      const type = selCmpt.type;
      const cfg = model.config.selection[type];
      const init = selDef.value !== undefined ? vega.array(selDef.value) : null; // If no explicit projection (either fields or encodings) is specified, set some defaults.
      // If an initial value is set, try to infer projections.

      let {
        fields,
        encodings
      } = vega.isObject(selDef.select) ? selDef.select : {};

      if (!fields && !encodings && init) {
        for (const initVal of init) {
          // initVal may be a scalar value to smoothen varParam -> pointSelection gradient.
          if (!vega.isObject(initVal)) {
            continue;
          }

          for (const key of keys(initVal)) {
            if (isSingleDefUnitChannel(key)) {
              (encodings || (encodings = [])).push(key);
            } else {
              if (type === 'interval') {
                warn(INTERVAL_INITIALIZED_WITH_X_Y);
                encodings = cfg.encodings;
              } else {
                (fields || (fields = [])).push(key);
              }
            }
          }
        }
      } // If no initial value is specified, use the default configuration.
      // We break this out as a separate if block (instead of an else condition)
      // to account for unprojected point selections that have scalar initial values


      if (!fields && !encodings) {
        encodings = cfg.encodings;

        if ('fields' in cfg) {
          fields = cfg.fields;
        }
      }

      for (const channel of (_encodings = encodings) !== null && _encodings !== void 0 ? _encodings : []) {
        var _encodings;

        const fieldDef = model.fieldDef(channel);

        if (fieldDef) {
          let field = fieldDef.field;

          if (fieldDef.aggregate) {
            warn(cannotProjectAggregate(channel, fieldDef.aggregate));
            continue;
          } else if (!field) {
            warn(cannotProjectOnChannelWithoutField(channel));
            continue;
          }

          if (fieldDef.timeUnit) {
            field = model.vgField(channel); // Construct TimeUnitComponents which will be combined into a
            // TimeUnitNode. This node may need to be inserted into the
            // dataflow if the selection is used across views that do not
            // have these time units defined.

            const component = {
              timeUnit: fieldDef.timeUnit,
              as: field,
              field: fieldDef.field
            };
            timeUnits[hash(component)] = component;
          } // Prevent duplicate projections on the same field.
          // TODO: what if the same field is bound to multiple channels (e.g., SPLOM diag).


          if (!parsed[field]) {
            // Determine whether the tuple will store enumerated or ranged values.
            // Interval selections store ranges for continuous scales, and enumerations otherwise.
            // Single/multi selections store ranges for binned fields, and enumerations otherwise.
            let tplType = 'E';

            if (type === 'interval') {
              const scaleType = model.getScaleComponent(channel).get('type');

              if (hasContinuousDomain(scaleType)) {
                tplType = 'R';
              }
            } else if (fieldDef.bin) {
              tplType = 'R-RE';
            }

            const p = {
              field,
              channel,
              type: tplType
            };
            p.signals = { ...signalName(p, 'data'),
              ...signalName(p, 'visual')
            };
            proj.items.push(parsed[field] = p);
            proj.hasField[field] = proj.hasChannel[channel] = parsed[field];
          }
        } else {
          warn(cannotProjectOnChannelWithoutField(channel));
        }
      }

      for (const field of (_fields = fields) !== null && _fields !== void 0 ? _fields : []) {
        var _fields;

        if (proj.hasField[field]) continue;
        const p = {
          type: 'E',
          field
        };
        p.signals = { ...signalName(p, 'data')
        };
        proj.items.push(p);
        proj.hasField[field] = p;
      }

      if (init) {
        selCmpt.init = init.map(v => {
          // Selections can be initialized either with a full object that maps projections to values
          // or scalar values to smoothen the abstraction gradient from variable params to point selections.
          return proj.items.map(p => vega.isObject(v) ? v[p.channel] !== undefined ? v[p.channel] : v[p.field] : v);
        });
      }

      if (!isEmpty(timeUnits)) {
        proj.timeUnit = new TimeUnitNode(null, timeUnits);
      }
    },
    signals: (model, selCmpt, allSignals) => {
      const name = selCmpt.name + TUPLE_FIELDS;
      const hasSignal = allSignals.filter(s => s.name === name);
      return hasSignal.length > 0 ? allSignals : allSignals.concat({
        name,
        value: selCmpt.project.items.map(proj => {
          const {
            signals,
            hasLegend,
            ...rest
          } = proj;
          rest.field = replacePathInField(rest.field);
          return rest;
        })
      });
    }
  };

  const scaleBindings = {
    defined: selCmpt => {
      return selCmpt.type === 'interval' && selCmpt.resolve === 'global' && selCmpt.bind && selCmpt.bind === 'scales';
    },
    parse: (model, selCmpt) => {
      const bound = selCmpt.scales = [];

      for (const proj of selCmpt.project.items) {
        const channel = proj.channel;

        if (!isScaleChannel(channel)) {
          continue;
        }

        const scale = model.getScaleComponent(channel);
        const scaleType = scale ? scale.get('type') : undefined;

        if (!scale || !hasContinuousDomain(scaleType)) {
          warn(SCALE_BINDINGS_CONTINUOUS);
          continue;
        }

        scale.set('selectionExtent', {
          param: selCmpt.name,
          field: proj.field
        }, true);
        bound.push(proj);
      }
    },
    topLevelSignals: (model, selCmpt, signals) => {
      const bound = selCmpt.scales.filter(proj => signals.filter(s => s.name === proj.signals.data).length === 0); // Top-level signals are only needed for multiview displays and if this
      // view's top-level signals haven't already been generated.

      if (!model.parent || isTopLevelLayer(model) || bound.length === 0) {
        return signals;
      } // vlSelectionResolve does not account for the behavior of bound scales in
      // multiview displays. Each unit view adds a tuple to the store, but the
      // state of the selection is the unit selection most recently updated. This
      // state is captured by the top-level signals that we insert and "push
      // outer" to from within the units. We need to reassemble this state into
      // the top-level named signal, except no single selCmpt has a global view.


      const namedSg = signals.filter(s => s.name === selCmpt.name)[0];
      let update = namedSg.update;

      if (update.indexOf(VL_SELECTION_RESOLVE) >= 0) {
        namedSg.update = "{".concat(bound.map(proj => "".concat(vega.stringValue(replacePathInField(proj.field)), ": ").concat(proj.signals.data)).join(', '), "}");
      } else {
        for (const proj of bound) {
          const mapping = "".concat(vega.stringValue(replacePathInField(proj.field)), ": ").concat(proj.signals.data);

          if (!update.includes(mapping)) {
            update = "".concat(update.substring(0, update.length - 1), ", ").concat(mapping, "}");
          }
        }

        namedSg.update = update;
      }

      return signals.concat(bound.map(proj => ({
        name: proj.signals.data
      })));
    },
    signals: (model, selCmpt, signals) => {
      // Nested signals need only push to top-level signals with multiview displays.
      if (model.parent && !isTopLevelLayer(model)) {
        for (const proj of selCmpt.scales) {
          const signal = signals.filter(s => s.name === proj.signals.data)[0];
          signal.push = 'outer';
          delete signal.value;
          delete signal.update;
        }
      }

      return signals;
    }
  };
  function domain(model, channel) {
    const scale = vega.stringValue(model.scaleName(channel));
    return "domain(".concat(scale, ")");
  }

  function isTopLevelLayer(model) {
    var _model$parent$parent;

    return model.parent && isLayerModel(model.parent) && ((_model$parent$parent = !model.parent.parent) !== null && _model$parent$parent !== void 0 ? _model$parent$parent : isTopLevelLayer(model.parent.parent));
  }

  const BRUSH = '_brush';
  const SCALE_TRIGGER = '_scale_trigger';
  const interval = {
    defined: selCmpt => selCmpt.type === 'interval',
    signals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const fieldsSg = name + TUPLE_FIELDS;
      const hasScales = scaleBindings.defined(selCmpt);
      const init = selCmpt.init ? selCmpt.init[0] : null;
      const dataSignals = [];
      const scaleTriggers = [];

      if (selCmpt.translate && !hasScales) {
        const filterExpr = "!event.item || event.item.mark.name !== ".concat(vega.stringValue(name + BRUSH));
        events(selCmpt, (on, evt) => {
          var _evt$between$, _evt$between$$filter;

          const filters = vega.array((_evt$between$$filter = (_evt$between$ = evt.between[0]).filter) !== null && _evt$between$$filter !== void 0 ? _evt$between$$filter : _evt$between$.filter = []);

          if (!filters.includes(filterExpr)) {
            filters.push(filterExpr);
          }

          return on;
        });
      }

      selCmpt.project.items.forEach((proj, i) => {
        const channel = proj.channel;

        if (channel !== X && channel !== Y) {
          warn('Interval selections only support x and y encoding channels.');
          return;
        }

        const val = init ? init[i] : null;
        const cs = channelSignals(model, selCmpt, proj, val);
        const dname = proj.signals.data;
        const vname = proj.signals.visual;
        const scaleName = vega.stringValue(model.scaleName(channel));
        const scaleType = model.getScaleComponent(channel).get('type');
        const toNum = hasContinuousDomain(scaleType) ? '+' : '';
        signals.push(...cs);
        dataSignals.push(dname);
        scaleTriggers.push({
          scaleName: model.scaleName(channel),
          expr: "(!isArray(".concat(dname, ") || ") + "(".concat(toNum, "invert(").concat(scaleName, ", ").concat(vname, ")[0] === ").concat(toNum).concat(dname, "[0] && ") + "".concat(toNum, "invert(").concat(scaleName, ", ").concat(vname, ")[1] === ").concat(toNum).concat(dname, "[1]))")
        });
      }); // Proxy scale reactions to ensure that an infinite loop doesn't occur
      // when an interval selection filter touches the scale.

      if (!hasScales && scaleTriggers.length) {
        signals.push({
          name: name + SCALE_TRIGGER,
          value: {},
          on: [{
            events: scaleTriggers.map(t => ({
              scale: t.scaleName
            })),
            update: "".concat(scaleTriggers.map(t => t.expr).join(' && '), " ? ").concat(name + SCALE_TRIGGER, " : {}")
          }]
        });
      } // Only add an interval to the store if it has valid data extents. Data extents
      // are set to null if pixel extents are equal to account for intervals over
      // ordinal/nominal domains which, when inverted, will still produce a valid datum.


      const update = "unit: ".concat(unitName(model), ", fields: ").concat(fieldsSg, ", values");
      return signals.concat({
        name: name + TUPLE,
        ...(init ? {
          init: "{".concat(update, ": ").concat(assembleInit(init), "}")
        } : {}),
        ...(dataSignals.length ? {
          on: [{
            events: [{
              signal: dataSignals.join(' || ')
            }],
            // Prevents double invocation, see https://github.com/vega/vega#1672.
            update: "".concat(dataSignals.join(' && '), " ? {").concat(update, ": [").concat(dataSignals, "]} : null")
          }]
        } : {})
      });
    },
    marks: (model, selCmpt, marks) => {
      const name = selCmpt.name;
      const {
        x,
        y
      } = selCmpt.project.hasChannel;
      const xvname = x === null || x === void 0 ? void 0 : x.signals.visual;
      const yvname = y === null || y === void 0 ? void 0 : y.signals.visual;
      const store = "data(".concat(vega.stringValue(selCmpt.name + STORE), ")"); // Do not add a brush if we're binding to scales
      // or we don't have a valid interval projection

      if (scaleBindings.defined(selCmpt) || !x && !y) {
        return marks;
      }

      const update = {
        x: x !== undefined ? {
          signal: "".concat(xvname, "[0]")
        } : {
          value: 0
        },
        y: y !== undefined ? {
          signal: "".concat(yvname, "[0]")
        } : {
          value: 0
        },
        x2: x !== undefined ? {
          signal: "".concat(xvname, "[1]")
        } : {
          field: {
            group: 'width'
          }
        },
        y2: y !== undefined ? {
          signal: "".concat(yvname, "[1]")
        } : {
          field: {
            group: 'height'
          }
        }
      }; // If the selection is resolved to global, only a single interval is in
      // the store. Wrap brush mark's encodings with a production rule to test
      // this based on the `unit` property. Hide the brush mark if it corresponds
      // to a unit different from the one in the store.

      if (selCmpt.resolve === 'global') {
        for (const key of keys(update)) {
          update[key] = [{
            test: "".concat(store, ".length && ").concat(store, "[0].unit === ").concat(unitName(model)),
            ...update[key]
          }, {
            value: 0
          }];
        }
      } // Two brush marks ensure that fill colors and other aesthetic choices do
      // not interefere with the core marks, but that the brushed region can still
      // be interacted with (e.g., dragging it around).


      const {
        fill,
        fillOpacity,
        cursor,
        ...stroke
      } = selCmpt.mark;
      const vgStroke = keys(stroke).reduce((def, k) => {
        def[k] = [{
          test: [x !== undefined && "".concat(xvname, "[0] !== ").concat(xvname, "[1]"), y !== undefined && "".concat(yvname, "[0] !== ").concat(yvname, "[1]")].filter(t => t).join(' && '),
          value: stroke[k]
        }, {
          value: null
        }];
        return def;
      }, {});
      return [{
        name: "".concat(name + BRUSH, "_bg"),
        type: 'rect',
        clip: true,
        encode: {
          enter: {
            fill: {
              value: fill
            },
            fillOpacity: {
              value: fillOpacity
            }
          },
          update
        }
      }, ...marks, {
        name: name + BRUSH,
        type: 'rect',
        clip: true,
        encode: {
          enter: { ...(cursor ? {
              cursor: {
                value: cursor
              }
            } : {}),
            fill: {
              value: 'transparent'
            }
          },
          update: { ...update,
            ...vgStroke
          }
        }
      }];
    }
  };
  /**
   * Returns the visual and data signals for an interval selection.
   */

  function channelSignals(model, selCmpt, proj, init) {
    const channel = proj.channel;
    const vname = proj.signals.visual;
    const dname = proj.signals.data;
    const hasScales = scaleBindings.defined(selCmpt);
    const scaleName = vega.stringValue(model.scaleName(channel));
    const scale = model.getScaleComponent(channel);
    const scaleType = scale ? scale.get('type') : undefined;

    const scaled = str => "scale(".concat(scaleName, ", ").concat(str, ")");

    const size = model.getSizeSignalRef(channel === X ? 'width' : 'height').signal;
    const coord = "".concat(channel, "(unit)");
    const on = events(selCmpt, (def, evt) => {
      return [...def, {
        events: evt.between[0],
        update: "[".concat(coord, ", ").concat(coord, "]")
      }, // Brush Start
      {
        events: evt,
        update: "[".concat(vname, "[0], clamp(").concat(coord, ", 0, ").concat(size, ")]")
      } // Brush End
      ];
    }); // React to pan/zooms of continuous scales. Non-continuous scales
    // (band, point) cannot be pan/zoomed and any other changes
    // to their domains (e.g., filtering) should clear the brushes.

    on.push({
      events: {
        signal: selCmpt.name + SCALE_TRIGGER
      },
      update: hasContinuousDomain(scaleType) ? "[".concat(scaled("".concat(dname, "[0]")), ", ").concat(scaled("".concat(dname, "[1]")), "]") : "[0, 0]"
    });
    return hasScales ? [{
      name: dname,
      on: []
    }] : [{
      name: vname,
      ...(init ? {
        init: assembleInit(init, true, scaled)
      } : {
        value: []
      }),
      on
    }, {
      name: dname,
      ...(init ? {
        init: assembleInit(init)
      } : {}),
      // Cannot be `value` as `init` may require datetime exprs.
      on: [{
        events: {
          signal: vname
        },
        update: "".concat(vname, "[0] === ").concat(vname, "[1] ? null : invert(").concat(scaleName, ", ").concat(vname, ")")
      }]
    }];
  }

  function events(selCmpt, cb) {
    return selCmpt.events.reduce((on, evt) => {
      if (!evt.between) {
        warn("".concat(evt, " is not an ordered event stream for interval selections."));
        return on;
      }

      return cb(on, evt);
    }, []);
  }

  const point$1 = {
    defined: selCmpt => selCmpt.type === 'point',
    signals: (model, selCmpt, signals) => {
      var _model$component$sele;

      const name = selCmpt.name;
      const fieldsSg = name + TUPLE_FIELDS;
      const project = selCmpt.project;
      const datum = '(item().isVoronoi ? datum.datum : datum)';
      const values = project.items.map(p => {
        const fieldDef = model.fieldDef(p.channel); // Binned fields should capture extents, for a range test against the raw field.

        return fieldDef !== null && fieldDef !== void 0 && fieldDef.bin ? "[".concat(datum, "[").concat(vega.stringValue(model.vgField(p.channel, {})), "], ") + "".concat(datum, "[").concat(vega.stringValue(model.vgField(p.channel, {
          binSuffix: 'end'
        })), "]]") : "".concat(datum, "[").concat(vega.stringValue(p.field), "]");
      }).join(', '); // Only add a discrete selection to the store if a datum is present _and_
      // the interaction isn't occurring on a group mark. This guards against
      // polluting interactive state with invalid values in faceted displays
      // as the group marks are also data-driven. We force the update to account
      // for constant null states but varying toggles (e.g., shift-click in
      // whitespace followed by a click in whitespace; the store should only
      // be cleared on the second click).

      const update = "unit: ".concat(unitName(model), ", fields: ").concat(fieldsSg, ", values");
      const events = selCmpt.events;
      const brushes = vals((_model$component$sele = model.component.selection) !== null && _model$component$sele !== void 0 ? _model$component$sele : {}).reduce((acc, cmpt) => {
        return cmpt.type === 'interval' ? acc.concat(cmpt.name + BRUSH) : acc;
      }, []).map(b => "indexof(item().mark.name, '".concat(b, "') < 0")).join(' && ');
      const test = "datum && item().mark.marktype !== 'group'".concat(brushes ? " && ".concat(brushes) : '');
      return signals.concat([{
        name: name + TUPLE,
        on: events ? [{
          events,
          update: "".concat(test, " ? {").concat(update, ": [").concat(values, "]} : null"),
          force: true
        }] : []
      }]);
    }
  };

  /**
   * Return a mixin that includes a Vega production rule for a Vega-Lite conditional channel definition
   * or a simple mixin if channel def has no condition.
   */
  function wrapCondition(model, channelDef, vgChannel, refFn) {
    const condition = isConditionalDef(channelDef) && channelDef.condition;
    const valueRef = refFn(channelDef);

    if (condition) {
      const conditions = vega.array(condition);
      const vgConditions = conditions.map(c => {
        const conditionValueRef = refFn(c);

        if (isConditionalParameter(c)) {
          const {
            param,
            empty
          } = c;
          const test = parseSelectionPredicate(model, {
            param,
            empty
          });
          return {
            test,
            ...conditionValueRef
          };
        } else {
          const test = expression(model, c.test); // FIXME: remove casting once TS is no longer dumb about it

          return {
            test,
            ...conditionValueRef
          };
        }
      });
      return {
        [vgChannel]: [...vgConditions, ...(valueRef !== undefined ? [valueRef] : [])]
      };
    } else {
      return valueRef !== undefined ? {
        [vgChannel]: valueRef
      } : {};
    }
  }

  function text$1(model) {
    let channel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';
    const channelDef = model.encoding[channel];
    return wrapCondition(model, channelDef, channel, cDef => textRef(cDef, model.config));
  }
  function textRef(channelDef, config) {
    let expr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'datum';

    // text
    if (channelDef) {
      if (isValueDef(channelDef)) {
        return signalOrValueRef(channelDef.value);
      }

      if (isFieldOrDatumDef(channelDef)) {
        const {
          format,
          formatType
        } = getFormatMixins(channelDef);
        return formatSignalRef({
          fieldOrDatumDef: channelDef,
          format,
          formatType,
          expr,
          config
        });
      }
    }

    return undefined;
  }

  function tooltip(model) {
    let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      encoding,
      markDef,
      config,
      stack
    } = model;
    const channelDef = encoding.tooltip;

    if (vega.isArray(channelDef)) {
      return {
        tooltip: tooltipRefForEncoding({
          tooltip: channelDef
        }, stack, config, opt)
      };
    } else {
      const datum = opt.reactiveGeom ? 'datum.datum' : 'datum';
      return wrapCondition(model, channelDef, 'tooltip', cDef => {
        // use valueRef based on channelDef first
        const tooltipRefFromChannelDef = textRef(cDef, config, datum);

        if (tooltipRefFromChannelDef) {
          return tooltipRefFromChannelDef;
        }

        if (cDef === null) {
          // Allow using encoding.tooltip = null to disable tooltip
          return undefined;
        }

        let markTooltip = getMarkPropOrConfig('tooltip', markDef, config);

        if (markTooltip === true) {
          markTooltip = {
            content: 'encoding'
          };
        }

        if (vega.isString(markTooltip)) {
          return {
            value: markTooltip
          };
        } else if (vega.isObject(markTooltip)) {
          // `tooltip` is `{fields: 'encodings' | 'fields'}`
          if (isSignalRef(markTooltip)) {
            return markTooltip;
          } else if (markTooltip.content === 'encoding') {
            return tooltipRefForEncoding(encoding, stack, config, opt);
          } else {
            return {
              signal: datum
            };
          }
        }

        return undefined;
      });
    }
  }
  function tooltipData(encoding, stack, config) {
    let {
      reactiveGeom
    } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const toSkip = {};
    const expr = reactiveGeom ? 'datum.datum' : 'datum';
    const tuples = [];

    function add(fDef, channel) {
      var _value;

      const mainChannel = getMainRangeChannel(channel);
      const fieldDef = isTypedFieldDef(fDef) ? fDef : { ...fDef,
        type: encoding[mainChannel].type // for secondary field def, copy type from main channel

      };
      const title = fieldDef.title || defaultTitle(fieldDef, config);
      const key = vega.array(title).join(', ');
      let value;

      if (isXorY(channel)) {
        const channel2 = channel === 'x' ? 'x2' : 'y2';
        const fieldDef2 = getFieldDef(encoding[channel2]);

        if (isBinned(fieldDef.bin) && fieldDef2) {
          const startField = vgField(fieldDef, {
            expr
          });
          const endField = vgField(fieldDef2, {
            expr
          });
          const {
            format,
            formatType
          } = getFormatMixins(fieldDef);
          value = binFormatExpression(startField, endField, format, formatType, config);
          toSkip[channel2] = true;
        } else if (stack && stack.fieldChannel === channel && stack.offset === 'normalize') {
          const {
            format,
            formatType
          } = getFormatMixins(fieldDef);
          value = formatSignalRef({
            fieldOrDatumDef: fieldDef,
            format,
            formatType,
            expr,
            config,
            normalizeStack: true
          }).signal;
        }
      }

      (_value = value) !== null && _value !== void 0 ? _value : value = textRef(fieldDef, config, expr).signal;
      tuples.push({
        channel,
        key,
        value
      });
    }

    forEach(encoding, (channelDef, channel) => {
      if (isFieldDef(channelDef)) {
        add(channelDef, channel);
      } else if (hasConditionalFieldDef(channelDef)) {
        add(channelDef.condition, channel);
      }
    });
    const out = {};

    for (const {
      channel,
      key,
      value
    } of tuples) {
      if (!toSkip[channel] && !out[key]) {
        out[key] = value;
      }
    }

    return out;
  }
  function tooltipRefForEncoding(encoding, stack, config) {
    let {
      reactiveGeom
    } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const data = tooltipData(encoding, stack, config, {
      reactiveGeom
    });
    const keyValues = entries$1(data).map(_ref => {
      let [key, value] = _ref;
      return "\"".concat(key, "\": ").concat(value);
    });
    return keyValues.length > 0 ? {
      signal: "{".concat(keyValues.join(', '), "}")
    } : undefined;
  }

  function aria(model) {
    const {
      markDef,
      config
    } = model;
    const enableAria = getMarkPropOrConfig('aria', markDef, config); // We can ignore other aria properties if ariaHidden is true.

    if (enableAria === false) {
      // getMarkGroups sets aria to false already so we don't have to set it in the encode block
      return {};
    }

    return { ...(enableAria ? {
        aria: enableAria
      } : {}),
      ...ariaRoleDescription(model),
      ...description(model)
    };
  }

  function ariaRoleDescription(model) {
    const {
      mark,
      markDef,
      config
    } = model;

    if (config.aria === false) {
      return {};
    }

    const ariaRoleDesc = getMarkPropOrConfig('ariaRoleDescription', markDef, config);

    if (ariaRoleDesc != null) {
      return {
        ariaRoleDescription: {
          value: ariaRoleDesc
        }
      };
    }

    return mark in VG_MARK_INDEX ? {} : {
      ariaRoleDescription: {
        value: mark
      }
    };
  }

  function description(model) {
    const {
      encoding,
      markDef,
      config,
      stack
    } = model;
    const channelDef = encoding.description;

    if (channelDef) {
      return wrapCondition(model, channelDef, 'description', cDef => textRef(cDef, model.config));
    } // Use default from mark def or config if defined.
    // Functions in encode usually just return undefined but since we are defining a default below, we need to check the default here.


    const descriptionValue = getMarkPropOrConfig('description', markDef, config);

    if (descriptionValue != null) {
      return {
        description: signalOrValueRef(descriptionValue)
      };
    }

    if (config.aria === false) {
      return {};
    }

    const data = tooltipData(encoding, stack, config);

    if (isEmpty(data)) {
      return undefined;
    }

    return {
      description: {
        signal: entries$1(data).map((_ref, index) => {
          let [key, value] = _ref;
          return "\"".concat(index > 0 ? '; ' : '').concat(key, ": \" + (").concat(value, ")");
        }).join(' + ')
      }
    };
  }

  /**
   * Return encode for non-positional channels with scales. (Text doesn't have scale.)
   */

  function nonPosition(channel, model) {
    let opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      markDef,
      encoding,
      config
    } = model;
    const {
      vgChannel
    } = opt;
    let {
      defaultRef,
      defaultValue
    } = opt;

    if (defaultRef === undefined) {
      var _defaultValue;

      // prettier-ignore
      (_defaultValue = defaultValue) !== null && _defaultValue !== void 0 ? _defaultValue : defaultValue = getMarkPropOrConfig(channel, markDef, config, {
        vgChannel,
        ignoreVgConfig: true
      });

      if (defaultValue !== undefined) {
        defaultRef = signalOrValueRef(defaultValue);
      }
    }

    const channelDef = encoding[channel];
    return wrapCondition(model, channelDef, vgChannel !== null && vgChannel !== void 0 ? vgChannel : channel, cDef => {
      return midPoint({
        channel,
        channelDef: cDef,
        markDef,
        config,
        scaleName: model.scaleName(channel),
        scale: model.getScaleComponent(channel),
        stack: null,
        // No need to provide stack for non-position as it does not affect mid point
        defaultRef
      });
    });
  }

  function color(model) {
    var _opt$filled, _ref, _getMarkPropOrConfig, _getMarkPropOrConfig2;

    let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      filled: undefined
    };
    const {
      markDef,
      encoding,
      config
    } = model;
    const {
      type: markType
    } = markDef; // Allow filled to be overridden (for trail's "filled")

    const filled = (_opt$filled = opt.filled) !== null && _opt$filled !== void 0 ? _opt$filled : getMarkPropOrConfig('filled', markDef, config);
    const transparentIfNeeded = contains(['bar', 'point', 'circle', 'square', 'geoshape'], markType) ? 'transparent' : undefined;
    const defaultFill = (_ref = (_getMarkPropOrConfig = getMarkPropOrConfig(filled === true ? 'color' : undefined, markDef, config, {
      vgChannel: 'fill'
    })) !== null && _getMarkPropOrConfig !== void 0 ? _getMarkPropOrConfig : // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
    config.mark[filled === true && 'color']) !== null && _ref !== void 0 ? _ref : // If there is no fill, always fill symbols, bar, geoshape
    // with transparent fills https://github.com/vega/vega-lite/issues/1316
    transparentIfNeeded;
    const defaultStroke = (_getMarkPropOrConfig2 = getMarkPropOrConfig(filled === false ? 'color' : undefined, markDef, config, {
      vgChannel: 'stroke'
    })) !== null && _getMarkPropOrConfig2 !== void 0 ? _getMarkPropOrConfig2 : // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
    config.mark[filled === false && 'color'];
    const colorVgChannel = filled ? 'fill' : 'stroke';
    const fillStrokeMarkDefAndConfig = { ...(defaultFill ? {
        fill: signalOrValueRef(defaultFill)
      } : {}),
      ...(defaultStroke ? {
        stroke: signalOrValueRef(defaultStroke)
      } : {})
    };

    if (markDef.color && (filled ? markDef.fill : markDef.stroke)) {
      warn(droppingColor('property', {
        fill: 'fill' in markDef,
        stroke: 'stroke' in markDef
      }));
    }

    return { ...fillStrokeMarkDefAndConfig,
      ...nonPosition('color', model, {
        vgChannel: colorVgChannel,
        defaultValue: filled ? defaultFill : defaultStroke
      }),
      ...nonPosition('fill', model, {
        // if there is encoding.fill, include default fill just in case we have conditional-only fill encoding
        defaultValue: encoding.fill ? defaultFill : undefined
      }),
      ...nonPosition('stroke', model, {
        // if there is encoding.stroke, include default fill just in case we have conditional-only stroke encoding
        defaultValue: encoding.stroke ? defaultStroke : undefined
      })
    };
  }

  function zindex(model) {
    const {
      encoding,
      mark
    } = model;
    const order = encoding.order;

    if (!isPathMark(mark) && isValueDef(order)) {
      return wrapCondition(model, order, 'zindex', cd => signalOrValueRef(cd.value));
    }

    return {};
  }

  /**
   * Utility files for producing Vega ValueRef for marks
   */
  function positionOffset(_ref) {
    let {
      channel: baseChannel,
      markDef,
      encoding = {},
      model,
      bandPosition
    } = _ref;
    const channel = "".concat(baseChannel, "Offset"); // Need to cast as the type can't be inferred automatically

    const defaultValue = markDef[channel];
    const channelDef = encoding[channel];

    if ((channel === 'xOffset' || channel === 'yOffset') && channelDef) {
      const ref = midPoint({
        channel: channel,
        channelDef,
        markDef,
        config: model === null || model === void 0 ? void 0 : model.config,
        scaleName: model.scaleName(channel),
        scale: model.getScaleComponent(channel),
        stack: null,
        defaultRef: signalOrValueRef(defaultValue),
        bandPosition
      });
      return {
        offsetType: 'encoding',
        offset: ref
      };
    }

    const markDefOffsetValue = markDef[channel];

    if (markDefOffsetValue) {
      return {
        offsetType: 'visual',
        offset: markDefOffsetValue
      };
    }

    return {};
  }

  /**
   * Return encode for point (non-band) position channels.
   */

  function pointPosition(channel, model, _ref) {
    let {
      defaultPos,
      vgChannel
    } = _ref;
    const {
      encoding,
      markDef,
      config,
      stack
    } = model;
    const channelDef = encoding[channel];
    const channel2Def = encoding[getSecondaryRangeChannel(channel)];
    const scaleName = model.scaleName(channel);
    const scale = model.getScaleComponent(channel);
    const {
      offset,
      offsetType
    } = positionOffset({
      channel,
      markDef,
      encoding,
      model,
      bandPosition: 0.5
    }); // Get default position or position from mark def

    const defaultRef = pointPositionDefaultRef({
      model,
      defaultPos,
      channel,
      scaleName,
      scale
    });
    const valueRef = !channelDef && isXorY(channel) && (encoding.latitude || encoding.longitude) ? // use geopoint output if there are lat/long and there is no point position overriding lat/long.
    {
      field: model.getName(channel)
    } : positionRef({
      channel,
      channelDef,
      channel2Def,
      markDef,
      config,
      scaleName,
      scale,
      stack,
      offset,
      defaultRef,
      bandPosition: offsetType === 'encoding' ? 0 : undefined
    });
    return valueRef ? {
      [vgChannel || channel]: valueRef
    } : undefined;
  } // TODO: we need to find a way to refactor these so that scaleName is a part of scale
  // but that's complicated. For now, this is a huge step moving forward.

  /**
   * @return Vega ValueRef for normal x- or y-position without projection
   */

  function positionRef(params) {
    const {
      channel,
      channelDef,
      scaleName,
      stack,
      offset,
      markDef
    } = params; // This isn't a part of midPoint because we use midPoint for non-position too

    if (isFieldOrDatumDef(channelDef) && stack && channel === stack.fieldChannel) {
      if (isFieldDef(channelDef)) {
        let bandPosition = channelDef.bandPosition;

        if (bandPosition === undefined && markDef.type === 'text' && (channel === 'radius' || channel === 'theta')) {
          // theta and radius of text mark should use bandPosition = 0.5 by default
          // so that labels for arc marks are centered automatically
          bandPosition = 0.5;
        }

        if (bandPosition !== undefined) {
          return interpolatedSignalRef({
            scaleName,
            fieldOrDatumDef: channelDef,
            // positionRef always have type
            startSuffix: 'start',
            bandPosition,
            offset
          });
        }
      } // x or y use stack_end so that stacked line's point mark use stack_end too.


      return valueRefForFieldOrDatumDef(channelDef, scaleName, {
        suffix: 'end'
      }, {
        offset
      });
    }

    return midPointRefWithPositionInvalidTest(params);
  }
  function pointPositionDefaultRef(_ref2) {
    let {
      model,
      defaultPos,
      channel,
      scaleName,
      scale
    } = _ref2;
    const {
      markDef,
      config
    } = model;
    return () => {
      const mainChannel = getMainRangeChannel(channel);
      const vgChannel = getVgPositionChannel(channel);
      const definedValueOrConfig = getMarkPropOrConfig(channel, markDef, config, {
        vgChannel
      });

      if (definedValueOrConfig !== undefined) {
        return widthHeightValueOrSignalRef(channel, definedValueOrConfig);
      }

      switch (defaultPos) {
        case 'zeroOrMin':
        case 'zeroOrMax':
          if (scaleName) {
            const scaleType = scale.get('type');

            if (contains([ScaleType.LOG, ScaleType.TIME, ScaleType.UTC], scaleType)) ; else {
              if (scale.domainDefinitelyIncludesZero()) {
                return {
                  scale: scaleName,
                  value: 0
                };
              }
            }
          }

          if (defaultPos === 'zeroOrMin') {
            return mainChannel === 'y' ? {
              field: {
                group: 'height'
              }
            } : {
              value: 0
            };
          } else {
            // zeroOrMax
            switch (mainChannel) {
              case 'radius':
                // max of radius is min(width, height) / 2
                return {
                  signal: "min(".concat(model.width.signal, ",").concat(model.height.signal, ")/2")
                };

              case 'theta':
                return {
                  signal: '2*PI'
                };

              case 'x':
                return {
                  field: {
                    group: 'width'
                  }
                };

              case 'y':
                return {
                  value: 0
                };
            }
          }

          break;

        case 'mid':
          {
            const sizeRef = model[getSizeChannel(channel)];
            return { ...sizeRef,
              mult: 0.5
            };
          }
      } // defaultPos === null


      return undefined;
    };
  }

  const ALIGNED_X_CHANNEL = {
    left: 'x',
    center: 'xc',
    right: 'x2'
  };
  const BASELINED_Y_CHANNEL = {
    top: 'y',
    middle: 'yc',
    bottom: 'y2'
  };
  function vgAlignedPositionChannel(channel, markDef, config) {
    let defaultAlign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'middle';

    if (channel === 'radius' || channel === 'theta') {
      return getVgPositionChannel(channel);
    }

    const alignChannel = channel === 'x' ? 'align' : 'baseline';
    const align = getMarkPropOrConfig(alignChannel, markDef, config);
    let alignExcludingSignal;

    if (isSignalRef(align)) {
      warn(rangeMarkAlignmentCannotBeExpression(alignChannel));
      alignExcludingSignal = undefined;
    } else {
      alignExcludingSignal = align;
    }

    if (channel === 'x') {
      return ALIGNED_X_CHANNEL[alignExcludingSignal || (defaultAlign === 'top' ? 'left' : 'center')];
    } else {
      return BASELINED_Y_CHANNEL[alignExcludingSignal || defaultAlign];
    }
  }

  /**
   * Utility for area/rule position, which can be either point or range.
   * (One of the axes should be point and the other should be range.)
   */

  function pointOrRangePosition(channel, model, _ref) {
    let {
      defaultPos,
      defaultPos2,
      range
    } = _ref;

    if (range) {
      return rangePosition(channel, model, {
        defaultPos,
        defaultPos2
      });
    }

    return pointPosition(channel, model, {
      defaultPos
    });
  }
  function rangePosition(channel, model, _ref2) {
    let {
      defaultPos,
      defaultPos2
    } = _ref2;
    const {
      markDef,
      config
    } = model;
    const channel2 = getSecondaryRangeChannel(channel);
    const sizeChannel = getSizeChannel(channel);
    const pos2Mixins = pointPosition2OrSize(model, defaultPos2, channel2);
    const vgChannel = pos2Mixins[sizeChannel] ? // If there is width/height, we need to position the marks based on the alignment.
    vgAlignedPositionChannel(channel, markDef, config) : // Otherwise, make sure to apply to the right Vg Channel (for arc mark)
    getVgPositionChannel(channel);
    return { ...pointPosition(channel, model, {
        defaultPos,
        vgChannel
      }),
      ...pos2Mixins
    };
  }
  /**
   * Return encode for x2, y2.
   * If channel is not specified, return one channel based on orientation.
   */

  function pointPosition2OrSize(model, defaultPos, channel) {
    const {
      encoding,
      mark,
      markDef,
      stack,
      config
    } = model;
    const baseChannel = getMainRangeChannel(channel);
    const sizeChannel = getSizeChannel(channel);
    const vgChannel = getVgPositionChannel(channel);
    const channelDef = encoding[baseChannel];
    const scaleName = model.scaleName(baseChannel);
    const scale = model.getScaleComponent(baseChannel);
    const {
      offset
    } = channel in encoding || channel in markDef ? positionOffset({
      channel,
      markDef,
      encoding,
      model
    }) : positionOffset({
      channel: baseChannel,
      markDef,
      encoding,
      model
    });

    if (!channelDef && (channel === 'x2' || channel === 'y2') && (encoding.latitude || encoding.longitude)) {
      const vgSizeChannel = getSizeChannel(channel);
      const size = model.markDef[vgSizeChannel];

      if (size != null) {
        return {
          [vgSizeChannel]: {
            value: size
          }
        };
      } else {
        return {
          [vgChannel]: {
            field: model.getName(channel)
          }
        };
      }
    }

    const valueRef = position2Ref({
      channel,
      channelDef,
      channel2Def: encoding[channel],
      markDef,
      config,
      scaleName,
      scale,
      stack,
      offset,
      defaultRef: undefined
    });

    if (valueRef !== undefined) {
      return {
        [vgChannel]: valueRef
      };
    } // TODO: check width/height encoding here once we add them
    // no x2/y2 encoding, then try to read x2/y2 or width/height based on precedence:
    // markDef > config.style > mark-specific config (config[mark]) > general mark config (config.mark)


    return position2orSize(channel, markDef) || position2orSize(channel, {
      [channel]: getMarkStyleConfig(channel, markDef, config.style),
      [sizeChannel]: getMarkStyleConfig(sizeChannel, markDef, config.style)
    }) || position2orSize(channel, config[mark]) || position2orSize(channel, config.mark) || {
      [vgChannel]: pointPositionDefaultRef({
        model,
        defaultPos,
        channel,
        scaleName,
        scale
      })()
    };
  }

  function position2Ref(_ref3) {
    let {
      channel,
      channelDef,
      channel2Def,
      markDef,
      config,
      scaleName,
      scale,
      stack,
      offset,
      defaultRef
    } = _ref3;

    if (isFieldOrDatumDef(channelDef) && stack && // If fieldChannel is X and channel is X2 (or Y and Y2)
    channel.charAt(0) === stack.fieldChannel.charAt(0)) {
      return valueRefForFieldOrDatumDef(channelDef, scaleName, {
        suffix: 'start'
      }, {
        offset
      });
    }

    return midPointRefWithPositionInvalidTest({
      channel,
      channelDef: channel2Def,
      scaleName,
      scale,
      stack,
      markDef,
      config,
      offset,
      defaultRef
    });
  }

  function position2orSize(channel, markDef) {
    const sizeChannel = getSizeChannel(channel);
    const vgChannel = getVgPositionChannel(channel);

    if (markDef[vgChannel] !== undefined) {
      return {
        [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[vgChannel])
      };
    } else if (markDef[channel] !== undefined) {
      return {
        [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[channel])
      };
    } else if (markDef[sizeChannel]) {
      const dimensionSize = markDef[sizeChannel];

      if (isRelativeBandSize(dimensionSize)) {
        warn(relativeBandSizeNotSupported(sizeChannel));
      } else {
        return {
          [sizeChannel]: widthHeightValueOrSignalRef(channel, dimensionSize)
        };
      }
    }

    return undefined;
  }

  function rectPosition(model, channel) {
    var _ref, _encoding$sizeChannel;

    const {
      config,
      encoding,
      markDef
    } = model;
    const mark = markDef.type;
    const channel2 = getSecondaryRangeChannel(channel);
    const sizeChannel = getSizeChannel(channel);
    const channelDef = encoding[channel];
    const channelDef2 = encoding[channel2];
    const scale = model.getScaleComponent(channel);
    const scaleType = scale ? scale.get('type') : undefined;
    const orient = markDef.orient;
    const hasSizeDef = (_ref = (_encoding$sizeChannel = encoding[sizeChannel]) !== null && _encoding$sizeChannel !== void 0 ? _encoding$sizeChannel : encoding.size) !== null && _ref !== void 0 ? _ref : getMarkPropOrConfig('size', markDef, config, {
      vgChannel: sizeChannel
    });
    const isBarBand = mark === 'bar' && (channel === 'x' ? orient === 'vertical' : orient === 'horizontal'); // x, x2, and width -- we must specify two of these in all conditions

    if (isFieldDef(channelDef) && (isBinning(channelDef.bin) || isBinned(channelDef.bin) || channelDef.timeUnit && !channelDef2) && !(hasSizeDef && !isRelativeBandSize(hasSizeDef)) && !hasDiscreteDomain(scaleType)) {
      return rectBinPosition({
        fieldDef: channelDef,
        fieldDef2: channelDef2,
        channel,
        model
      });
    } else if ((isFieldOrDatumDef(channelDef) && hasDiscreteDomain(scaleType) || isBarBand) && !channelDef2) {
      return positionAndSize(channelDef, channel, model);
    } else {
      return rangePosition(channel, model, {
        defaultPos: 'zeroOrMax',
        defaultPos2: 'zeroOrMin'
      });
    }
  }

  function defaultSizeRef(sizeChannel, scaleName, scale, config, bandSize) {
    if (isRelativeBandSize(bandSize)) {
      if (scale) {
        const scaleType = scale.get('type');

        if (scaleType === 'band') {
          return {
            scale: scaleName,
            band: bandSize.band
          };
        } else if (bandSize.band !== 1) {
          warn(cannotUseRelativeBandSizeWithNonBandScale(scaleType));
          bandSize = undefined;
        }
      } else {
        return {
          mult: bandSize.band,
          field: {
            group: sizeChannel
          }
        };
      }
    } else if (isSignalRef(bandSize)) {
      return bandSize;
    } else if (bandSize) {
      return {
        value: bandSize
      };
    } // no valid band size


    if (scale) {
      const scaleRange = scale.get('range');

      if (isVgRangeStep(scaleRange) && vega.isNumber(scaleRange.step)) {
        return {
          value: scaleRange.step - 2
        };
      }
    }

    const defaultStep = getViewConfigDiscreteStep(config.view, sizeChannel);
    return {
      value: defaultStep - 2
    };
  }
  /**
   * Output position encoding and its size encoding for continuous, point, and band scales.
   */


  function positionAndSize(fieldDef, channel, model) {
    const {
      markDef,
      encoding,
      config,
      stack
    } = model;
    const orient = markDef.orient;
    const scaleName = model.scaleName(channel);
    const scale = model.getScaleComponent(channel);
    const vgSizeChannel = getSizeChannel(channel);
    const channel2 = getSecondaryRangeChannel(channel);
    const offsetScaleChannel = getOffsetChannel(channel);
    const offsetScaleName = model.scaleName(offsetScaleChannel); // use "size" channel for bars, if there is orient and the channel matches the right orientation

    const useVlSizeChannel = orient === 'horizontal' && channel === 'y' || orient === 'vertical' && channel === 'x'; // Use size encoding / mark property / config if it exists

    let sizeMixins;

    if (encoding.size || markDef.size) {
      if (useVlSizeChannel) {
        sizeMixins = nonPosition('size', model, {
          vgChannel: vgSizeChannel,
          defaultRef: signalOrValueRef(markDef.size)
        });
      } else {
        warn(cannotApplySizeToNonOrientedMark(markDef.type));
      }
    } // Otherwise, apply default value


    const bandSize = getBandSize({
      channel,
      fieldDef,
      markDef,
      config,
      scaleType: scale === null || scale === void 0 ? void 0 : scale.get('type'),
      useVlSizeChannel
    });
    sizeMixins = sizeMixins || {
      [vgSizeChannel]: defaultSizeRef(vgSizeChannel, offsetScaleName || scaleName, scale, config, bandSize)
    };
    /*
      Band scales with size value and all point scales, use xc/yc + band=0.5
       Otherwise (band scales that has size based on a band ref), use x/y with position band = (1 - size_band) / 2.
      In this case, size_band is the band specified in the x/y-encoding.
      By default band is 1, so `(1 - band) / 2` = 0.
      If band is 0.6, the the x/y position in such case should be `(1 - band) / 2` = 0.2
     */

    const defaultBandAlign = (scale === null || scale === void 0 ? void 0 : scale.get('type')) !== 'band' || !('band' in sizeMixins[vgSizeChannel]) ? 'middle' : 'top';
    const vgChannel = vgAlignedPositionChannel(channel, markDef, config, defaultBandAlign);
    const center = vgChannel === 'xc' || vgChannel === 'yc';
    const {
      offset,
      offsetType
    } = positionOffset({
      channel,
      markDef,
      encoding,
      model,
      bandPosition: center ? 0.5 : 0
    });
    const posRef = midPointRefWithPositionInvalidTest({
      channel,
      channelDef: fieldDef,
      markDef,
      config,
      scaleName,
      scale,
      stack,
      offset,
      defaultRef: pointPositionDefaultRef({
        model,
        defaultPos: 'mid',
        channel,
        scaleName,
        scale
      }),
      bandPosition: center ? offsetType === 'encoding' ? 0 : 0.5 : isSignalRef(bandSize) ? {
        signal: "(1-".concat(bandSize, ")/2")
      } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0
    });

    if (vgSizeChannel) {
      return {
        [vgChannel]: posRef,
        ...sizeMixins
      };
    } else {
      // otherwise, we must simulate size by setting position2 = position + size
      // (for theta/radius since Vega doesn't have thetaWidth/radiusWidth)
      const vgChannel2 = getVgPositionChannel(channel2);
      const sizeRef = sizeMixins[vgSizeChannel];
      const sizeOffset = offset ? { ...sizeRef,
        offset
      } : sizeRef;
      return {
        [vgChannel]: posRef,
        // posRef might be an array that wraps position invalid test
        [vgChannel2]: vega.isArray(posRef) ? [posRef[0], { ...posRef[1],
          offset: sizeOffset
        }] : { ...posRef,
          offset: sizeOffset
        }
      };
    }
  }

  function getBinSpacing(channel, spacing, reverse, translate, offset) {
    if (isPolarPositionChannel(channel)) {
      return 0;
    }

    const spacingOffset = channel === 'x' || channel === 'y2' ? -spacing / 2 : spacing / 2;

    if (isSignalRef(reverse) || isSignalRef(offset) || isSignalRef(translate)) {
      const reverseExpr = signalOrStringValue(reverse);
      const offsetExpr = signalOrStringValue(offset);
      const translateExpr = signalOrStringValue(translate);
      const t = translateExpr ? "".concat(translateExpr, " + ") : '';
      const r = reverseExpr ? "(".concat(reverseExpr, " ? -1 : 1) * ") : '';
      const o = offsetExpr ? "(".concat(offsetExpr, " + ").concat(spacingOffset, ")") : spacingOffset;
      return {
        signal: t + r + o
      };
    } else {
      offset = offset || 0;
      return translate + (reverse ? -offset - spacingOffset : +offset + spacingOffset);
    }
  }

  function rectBinPosition(_ref2) {
    var _model$component$axes, _axis$get, _getMarkPropOrConfig;

    let {
      fieldDef,
      fieldDef2,
      channel,
      model
    } = _ref2;
    const {
      config,
      markDef,
      encoding
    } = model;
    const scale = model.getScaleComponent(channel);
    const scaleName = model.scaleName(channel);
    const scaleType = scale ? scale.get('type') : undefined;
    const reverse = scale.get('reverse');
    const bandSize = getBandSize({
      channel,
      fieldDef,
      markDef,
      config,
      scaleType
    });
    const axis = (_model$component$axes = model.component.axes[channel]) === null || _model$component$axes === void 0 ? void 0 : _model$component$axes[0];
    const axisTranslate = (_axis$get = axis === null || axis === void 0 ? void 0 : axis.get('translate')) !== null && _axis$get !== void 0 ? _axis$get : 0.5; // vega default is 0.5

    const spacing = isXorY(channel) ? (_getMarkPropOrConfig = getMarkPropOrConfig('binSpacing', markDef, config)) !== null && _getMarkPropOrConfig !== void 0 ? _getMarkPropOrConfig : 0 : 0;
    const channel2 = getSecondaryRangeChannel(channel);
    const vgChannel = getVgPositionChannel(channel);
    const vgChannel2 = getVgPositionChannel(channel2);
    const {
      offset
    } = positionOffset({
      channel,
      markDef,
      encoding,
      model,
      bandPosition: 0
    });
    const bandPosition = isSignalRef(bandSize) ? {
      signal: "(1-".concat(bandSize.signal, ")/2")
    } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0.5;

    if (isBinning(fieldDef.bin) || fieldDef.timeUnit) {
      return {
        [vgChannel2]: rectBinRef({
          fieldDef,
          scaleName,
          bandPosition,
          offset: getBinSpacing(channel2, spacing, reverse, axisTranslate, offset)
        }),
        [vgChannel]: rectBinRef({
          fieldDef,
          scaleName,
          bandPosition: isSignalRef(bandPosition) ? {
            signal: "1-".concat(bandPosition.signal)
          } : 1 - bandPosition,
          offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset)
        })
      };
    } else if (isBinned(fieldDef.bin)) {
      const startRef = valueRefForFieldOrDatumDef(fieldDef, scaleName, {}, {
        offset: getBinSpacing(channel2, spacing, reverse, axisTranslate, offset)
      });

      if (isFieldDef(fieldDef2)) {
        return {
          [vgChannel2]: startRef,
          [vgChannel]: valueRefForFieldOrDatumDef(fieldDef2, scaleName, {}, {
            offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset)
          })
        };
      } else if (isBinParams(fieldDef.bin) && fieldDef.bin.step) {
        return {
          [vgChannel2]: startRef,
          [vgChannel]: {
            signal: "scale(\"".concat(scaleName, "\", ").concat(vgField(fieldDef, {
              expr: 'datum'
            }), " + ").concat(fieldDef.bin.step, ")"),
            offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset)
          }
        };
      }
    }

    warn(channelRequiredForBinned(channel2));
    return undefined;
  }
  /**
   * Value Ref for binned fields
   */


  function rectBinRef(_ref3) {
    let {
      fieldDef,
      scaleName,
      bandPosition,
      offset
    } = _ref3;
    return interpolatedSignalRef({
      scaleName,
      fieldOrDatumDef: fieldDef,
      bandPosition,
      offset
    });
  }

  const ALWAYS_IGNORE = new Set(['aria', 'width', 'height']);
  function baseEncodeEntry(model, ignore) {
    const {
      fill = undefined,
      stroke = undefined
    } = ignore.color === 'include' ? color(model) : {};
    return { ...markDefProperties(model.markDef, ignore),
      ...wrapAllFieldsInvalid(model, 'fill', fill),
      ...wrapAllFieldsInvalid(model, 'stroke', stroke),
      ...nonPosition('opacity', model),
      ...nonPosition('fillOpacity', model),
      ...nonPosition('strokeOpacity', model),
      ...nonPosition('strokeWidth', model),
      ...nonPosition('strokeDash', model),
      ...zindex(model),
      ...tooltip(model),
      ...text$1(model, 'href'),
      ...aria(model)
    };
  } // TODO: mark VgValueRef[] as readonly after https://github.com/vega/vega/pull/1987

  function wrapAllFieldsInvalid(model, channel, valueRef) {
    const {
      config,
      mark,
      markDef
    } = model;
    const invalid = getMarkPropOrConfig('invalid', markDef, config);

    if (invalid === 'hide' && valueRef && !isPathMark(mark)) {
      // For non-path marks, we have to exclude invalid values (null and NaN) for scales with continuous domains.
      // For path marks, we will use "defined" property and skip these values instead.
      const test = allFieldsInvalidPredicate$1(model, {
        invalid: true,
        channels: SCALE_CHANNELS
      });

      if (test) {
        return {
          [channel]: [// prepend the invalid case
          // TODO: support custom value
          {
            test,
            value: null
          }, ...vega.array(valueRef)]
        };
      }
    }

    return valueRef ? {
      [channel]: valueRef
    } : {};
  }

  function markDefProperties(mark, ignore) {
    return VG_MARK_CONFIGS.reduce((m, prop) => {
      if (!ALWAYS_IGNORE.has(prop) && mark[prop] !== undefined && ignore[prop] !== 'ignore') {
        m[prop] = signalOrValueRef(mark[prop]);
      }

      return m;
    }, {});
  }

  function allFieldsInvalidPredicate$1(model, _ref) {
    let {
      invalid = false,
      channels
    } = _ref;
    const filterIndex = channels.reduce((aggregator, channel) => {
      const scaleComponent = model.getScaleComponent(channel);

      if (scaleComponent) {
        const scaleType = scaleComponent.get('type');
        const field = model.vgField(channel, {
          expr: 'datum'
        }); // While discrete domain scales can handle invalid values, continuous scales can't.

        if (field && hasContinuousDomain(scaleType)) {
          aggregator[field] = true;
        }
      }

      return aggregator;
    }, {});
    const fields = keys(filterIndex);

    if (fields.length > 0) {
      const op = invalid ? '||' : '&&';
      return fields.map(field => fieldInvalidPredicate(field, invalid)).join(" ".concat(op, " "));
    }

    return undefined;
  }

  function defined(model) {
    const {
      config,
      markDef
    } = model;
    const invalid = getMarkPropOrConfig('invalid', markDef, config);

    if (invalid) {
      const signal = allFieldsInvalidPredicate(model, {
        channels: POSITION_SCALE_CHANNELS
      });

      if (signal) {
        return {
          defined: {
            signal
          }
        };
      }
    }

    return {};
  }

  function allFieldsInvalidPredicate(model, _ref) {
    let {
      invalid = false,
      channels
    } = _ref;
    const filterIndex = channels.reduce((aggregator, channel) => {
      const scaleComponent = model.getScaleComponent(channel);

      if (scaleComponent) {
        const scaleType = scaleComponent.get('type');
        const field = model.vgField(channel, {
          expr: 'datum'
        }); // While discrete domain scales can handle invalid values, continuous scales can't.

        if (field && hasContinuousDomain(scaleType)) {
          aggregator[field] = true;
        }
      }

      return aggregator;
    }, {});
    const fields = keys(filterIndex);

    if (fields.length > 0) {
      const op = invalid ? '||' : '&&';
      return fields.map(field => fieldInvalidPredicate(field, invalid)).join(" ".concat(op, " "));
    }

    return undefined;
  }

  function valueIfDefined(prop, value) {
    if (value !== undefined) {
      return {
        [prop]: signalOrValueRef(value)
      };
    }

    return undefined;
  }

  const VORONOI = 'voronoi';
  const nearest = {
    defined: selCmpt => {
      return selCmpt.type === 'point' && selCmpt.nearest;
    },
    parse: (model, selCmpt) => {
      // Scope selection events to the voronoi mark to prevent capturing
      // events that occur on the group mark (https://github.com/vega/vega/issues/2112).
      if (selCmpt.events) {
        for (const s of selCmpt.events) {
          s.markname = model.getName(VORONOI);
        }
      }
    },
    marks: (model, selCmpt, marks) => {
      const {
        x,
        y
      } = selCmpt.project.hasChannel;
      const markType = model.mark;

      if (isPathMark(markType)) {
        warn(nearestNotSupportForContinuous(markType));
        return marks;
      }

      const cellDef = {
        name: model.getName(VORONOI),
        type: 'path',
        interactive: true,
        from: {
          data: model.getName('marks')
        },
        encode: {
          update: {
            fill: {
              value: 'transparent'
            },
            strokeWidth: {
              value: 0.35
            },
            stroke: {
              value: 'transparent'
            },
            isVoronoi: {
              value: true
            },
            ...tooltip(model, {
              reactiveGeom: true
            })
          }
        },
        transform: [{
          type: 'voronoi',
          x: {
            expr: x || !y ? 'datum.datum.x || 0' : '0'
          },
          y: {
            expr: y || !x ? 'datum.datum.y || 0' : '0'
          },
          size: [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')]
        }]
      };
      let index = 0;
      let exists = false;
      marks.forEach((mark, i) => {
        var _mark$name;

        const name = (_mark$name = mark.name) !== null && _mark$name !== void 0 ? _mark$name : '';

        if (name === model.component.mark[0].name) {
          index = i;
        } else if (name.indexOf(VORONOI) >= 0) {
          exists = true;
        }
      });

      if (!exists) {
        marks.splice(index + 1, 0, cellDef);
      }

      return marks;
    }
  };

  const inputBindings = {
    defined: selCmpt => {
      return selCmpt.type === 'point' && selCmpt.resolve === 'global' && selCmpt.bind && selCmpt.bind !== 'scales' && !isLegendBinding(selCmpt.bind);
    },
    parse: (model, selCmpt, selDef) => disableDirectManipulation(selCmpt, selDef),
    topLevelSignals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const proj = selCmpt.project;
      const bind = selCmpt.bind;
      const init = selCmpt.init && selCmpt.init[0]; // Can only exist on single selections (one initial value).

      const datum = nearest.defined(selCmpt) ? '(item().isVoronoi ? datum.datum : datum)' : 'datum';
      proj.items.forEach((p, i) => {
        const sgname = varName("".concat(name, "_").concat(p.field));
        const hasSignal = signals.filter(s => s.name === sgname);

        if (!hasSignal.length) {
          var _ref, _bind$p$field;

          signals.unshift({
            name: sgname,
            ...(init ? {
              init: assembleInit(init[i])
            } : {
              value: null
            }),
            on: selCmpt.events ? [{
              events: selCmpt.events,
              update: "datum && item().mark.marktype !== 'group' ? ".concat(datum, "[").concat(vega.stringValue(p.field), "] : null")
            }] : [],
            bind: (_ref = (_bind$p$field = bind[p.field]) !== null && _bind$p$field !== void 0 ? _bind$p$field : bind[p.channel]) !== null && _ref !== void 0 ? _ref : bind
          });
        }
      });
      return signals;
    },
    signals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const proj = selCmpt.project;
      const signal = signals.filter(s => s.name === name + TUPLE)[0];
      const fields = name + TUPLE_FIELDS;
      const values = proj.items.map(p => varName("".concat(name, "_").concat(p.field)));
      const valid = values.map(v => "".concat(v, " !== null")).join(' && ');

      if (values.length) {
        signal.update = "".concat(valid, " ? {fields: ").concat(fields, ", values: [").concat(values.join(', '), "]} : null");
      }

      delete signal.value;
      delete signal.on;
      return signals;
    }
  };

  const TOGGLE = '_toggle';
  const toggle = {
    defined: selCmpt => {
      return selCmpt.type === 'point' && !!selCmpt.toggle;
    },
    signals: (model, selCmpt, signals) => {
      return signals.concat({
        name: selCmpt.name + TOGGLE,
        value: false,
        on: [{
          events: selCmpt.events,
          update: selCmpt.toggle
        }]
      });
    },
    modifyExpr: (model, selCmpt) => {
      const tpl = selCmpt.name + TUPLE;
      const signal = selCmpt.name + TOGGLE;
      return "".concat(signal, " ? null : ").concat(tpl, ", ") + (selCmpt.resolve === 'global' ? "".concat(signal, " ? null : true, ") : "".concat(signal, " ? null : {unit: ").concat(unitName(model), "}, ")) + "".concat(signal, " ? ").concat(tpl, " : null");
    }
  };

  const clear = {
    defined: selCmpt => {
      return selCmpt.clear !== undefined && selCmpt.clear !== false;
    },
    parse: (model, selCmpt) => {
      if (selCmpt.clear) {
        selCmpt.clear = vega.isString(selCmpt.clear) ? vega.parseSelector(selCmpt.clear, 'view') : selCmpt.clear;
      }
    },
    topLevelSignals: (model, selCmpt, signals) => {
      if (inputBindings.defined(selCmpt)) {
        for (const proj of selCmpt.project.items) {
          const idx = signals.findIndex(n => n.name === varName("".concat(selCmpt.name, "_").concat(proj.field)));

          if (idx !== -1) {
            signals[idx].on.push({
              events: selCmpt.clear,
              update: 'null'
            });
          }
        }
      }

      return signals;
    },
    signals: (model, selCmpt, signals) => {
      function addClear(idx, update) {
        if (idx !== -1 && signals[idx].on) {
          signals[idx].on.push({
            events: selCmpt.clear,
            update
          });
        }
      } // Be as minimalist as possible when adding clear triggers to minimize dataflow execution.


      if (selCmpt.type === 'interval') {
        for (const proj of selCmpt.project.items) {
          const vIdx = signals.findIndex(n => n.name === proj.signals.visual);
          addClear(vIdx, '[0, 0]');

          if (vIdx === -1) {
            const dIdx = signals.findIndex(n => n.name === proj.signals.data);
            addClear(dIdx, 'null');
          }
        }
      } else {
        let tIdx = signals.findIndex(n => n.name === selCmpt.name + TUPLE);
        addClear(tIdx, 'null');

        if (toggle.defined(selCmpt)) {
          tIdx = signals.findIndex(n => n.name === selCmpt.name + TOGGLE);
          addClear(tIdx, 'false');
        }
      }

      return signals;
    }
  };

  const legendBindings = {
    defined: selCmpt => {
      const spec = selCmpt.resolve === 'global' && selCmpt.bind && isLegendBinding(selCmpt.bind);
      const projLen = selCmpt.project.items.length === 1 && selCmpt.project.items[0].field !== SELECTION_ID;

      if (spec && !projLen) {
        warn(LEGEND_BINDINGS_MUST_HAVE_PROJECTION);
      }

      return spec && projLen;
    },
    parse: (model, selCmpt, selDef) => {
      // Allow legend items to be toggleable by default even though direct manipulation is disabled.
      const selDef_ = duplicate(selDef);
      selDef_.select = vega.isString(selDef_.select) ? {
        type: selDef_.select,
        toggle: selCmpt.toggle
      } : { ...selDef_.select,
        toggle: selCmpt.toggle
      };
      disableDirectManipulation(selCmpt, selDef_);

      if (vega.isObject(selDef.select) && (selDef.select.on || selDef.select.clear)) {
        const legendFilter = 'event.item && indexof(event.item.mark.role, "legend") < 0';

        for (const evt of selCmpt.events) {
          var _evt$filter;

          evt.filter = vega.array((_evt$filter = evt.filter) !== null && _evt$filter !== void 0 ? _evt$filter : []);

          if (!evt.filter.includes(legendFilter)) {
            evt.filter.push(legendFilter);
          }
        }
      }

      const evt = isLegendStreamBinding(selCmpt.bind) ? selCmpt.bind.legend : 'click';
      const stream = vega.isString(evt) ? vega.parseSelector(evt, 'view') : vega.array(evt);
      selCmpt.bind = {
        legend: {
          merge: stream
        }
      };
    },
    topLevelSignals: (model, selCmpt, signals) => {
      const selName = selCmpt.name;
      const stream = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;

      const markName = name => s => {
        const ds = duplicate(s);
        ds.markname = name;
        return ds;
      };

      for (const proj of selCmpt.project.items) {
        if (!proj.hasLegend) continue;
        const prefix = "".concat(varName(proj.field), "_legend");
        const sgName = "".concat(selName, "_").concat(prefix);
        const hasSignal = signals.filter(s => s.name === sgName);

        if (hasSignal.length === 0) {
          const events = stream.merge.map(markName("".concat(prefix, "_symbols"))).concat(stream.merge.map(markName("".concat(prefix, "_labels")))).concat(stream.merge.map(markName("".concat(prefix, "_entries"))));
          signals.unshift({
            name: sgName,
            ...(!selCmpt.init ? {
              value: null
            } : {}),
            on: [// Legend entries do not store values, so we need to walk the scenegraph to the symbol datum.
            {
              events,
              update: 'datum.value || item().items[0].items[0].datum.value',
              force: true
            }, {
              events: stream.merge,
              update: "!event.item || !datum ? null : ".concat(sgName),
              force: true
            }]
          });
        }
      }

      return signals;
    },
    signals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const proj = selCmpt.project;
      const tuple = signals.find(s => s.name === name + TUPLE);
      const fields = name + TUPLE_FIELDS;
      const values = proj.items.filter(p => p.hasLegend).map(p => varName("".concat(name, "_").concat(varName(p.field), "_legend")));
      const valid = values.map(v => "".concat(v, " !== null")).join(' && ');
      const update = "".concat(valid, " ? {fields: ").concat(fields, ", values: [").concat(values.join(', '), "]} : null");

      if (selCmpt.events && values.length > 0) {
        tuple.on.push({
          events: values.map(signal => ({
            signal
          })),
          update
        });
      } else if (values.length > 0) {
        tuple.update = update;
        delete tuple.value;
        delete tuple.on;
      }

      const toggle = signals.find(s => s.name === name + TOGGLE);
      const events = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;

      if (toggle) {
        if (!selCmpt.events) toggle.on[0].events = events;else toggle.on.push({ ...toggle.on[0],
          events
        });
      }

      return signals;
    }
  };
  function parseInteractiveLegend(model, channel, legendCmpt) {
    var _model$fieldDef;

    const field = (_model$fieldDef = model.fieldDef(channel)) === null || _model$fieldDef === void 0 ? void 0 : _model$fieldDef.field;

    for (const selCmpt of vals((_model$component$sele = model.component.selection) !== null && _model$component$sele !== void 0 ? _model$component$sele : {})) {
      var _model$component$sele, _selCmpt$project$hasF;

      const proj = (_selCmpt$project$hasF = selCmpt.project.hasField[field]) !== null && _selCmpt$project$hasF !== void 0 ? _selCmpt$project$hasF : selCmpt.project.hasChannel[channel];

      if (proj && legendBindings.defined(selCmpt)) {
        var _legendCmpt$get;

        const legendSelections = (_legendCmpt$get = legendCmpt.get('selections')) !== null && _legendCmpt$get !== void 0 ? _legendCmpt$get : [];
        legendSelections.push(selCmpt.name);
        legendCmpt.set('selections', legendSelections, false);
        proj.hasLegend = true;
      }
    }
  }

  const ANCHOR$1 = '_translate_anchor';
  const DELTA$1 = '_translate_delta';
  const translate = {
    defined: selCmpt => {
      return selCmpt.type === 'interval' && selCmpt.translate;
    },
    signals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const hasScales = scaleBindings.defined(selCmpt);
      const anchor = name + ANCHOR$1;
      const {
        x,
        y
      } = selCmpt.project.hasChannel;
      let events = vega.parseSelector(selCmpt.translate, 'scope');

      if (!hasScales) {
        events = events.map(e => (e.between[0].markname = name + BRUSH, e));
      }

      signals.push({
        name: anchor,
        value: {},
        on: [{
          events: events.map(e => e.between[0]),
          update: '{x: x(unit), y: y(unit)' + (x !== undefined ? ", extent_x: ".concat(hasScales ? domain(model, X) : "slice(".concat(x.signals.visual, ")")) : '') + (y !== undefined ? ", extent_y: ".concat(hasScales ? domain(model, Y) : "slice(".concat(y.signals.visual, ")")) : '') + '}'
        }]
      }, {
        name: name + DELTA$1,
        value: {},
        on: [{
          events,
          update: "{x: ".concat(anchor, ".x - x(unit), y: ").concat(anchor, ".y - y(unit)}")
        }]
      });

      if (x !== undefined) {
        onDelta$1(model, selCmpt, x, 'width', signals);
      }

      if (y !== undefined) {
        onDelta$1(model, selCmpt, y, 'height', signals);
      }

      return signals;
    }
  };

  function onDelta$1(model, selCmpt, proj, size, signals) {
    var _scaleCmpt$get, _scaleCmpt$get2;

    const name = selCmpt.name;
    const anchor = name + ANCHOR$1;
    const delta = name + DELTA$1;
    const channel = proj.channel;
    const hasScales = scaleBindings.defined(selCmpt);
    const signal = signals.filter(s => s.name === proj.signals[hasScales ? 'data' : 'visual'])[0];
    const sizeSg = model.getSizeSignalRef(size).signal;
    const scaleCmpt = model.getScaleComponent(channel);
    const scaleType = scaleCmpt.get('type');
    const reversed = scaleCmpt.get('reverse'); // scale parsing sets this flag for fieldDef.sort

    const sign = !hasScales ? '' : channel === X ? reversed ? '' : '-' : reversed ? '-' : '';
    const extent = "".concat(anchor, ".extent_").concat(channel);
    const offset = "".concat(sign).concat(delta, ".").concat(channel, " / ").concat(hasScales ? "".concat(sizeSg) : "span(".concat(extent, ")"));
    const panFn = !hasScales ? 'panLinear' : scaleType === 'log' ? 'panLog' : scaleType === 'symlog' ? 'panSymlog' : scaleType === 'pow' ? 'panPow' : 'panLinear';
    const arg = !hasScales ? '' : scaleType === 'pow' ? ", ".concat((_scaleCmpt$get = scaleCmpt.get('exponent')) !== null && _scaleCmpt$get !== void 0 ? _scaleCmpt$get : 1) : scaleType === 'symlog' ? ", ".concat((_scaleCmpt$get2 = scaleCmpt.get('constant')) !== null && _scaleCmpt$get2 !== void 0 ? _scaleCmpt$get2 : 1) : '';
    const update = "".concat(panFn, "(").concat(extent, ", ").concat(offset).concat(arg, ")");
    signal.on.push({
      events: {
        signal: delta
      },
      update: hasScales ? update : "clampRange(".concat(update, ", 0, ").concat(sizeSg, ")")
    });
  }

  const ANCHOR = '_zoom_anchor';
  const DELTA = '_zoom_delta';
  const zoom = {
    defined: selCmpt => {
      return selCmpt.type === 'interval' && selCmpt.zoom;
    },
    signals: (model, selCmpt, signals) => {
      const name = selCmpt.name;
      const hasScales = scaleBindings.defined(selCmpt);
      const delta = name + DELTA;
      const {
        x,
        y
      } = selCmpt.project.hasChannel;
      const sx = vega.stringValue(model.scaleName(X));
      const sy = vega.stringValue(model.scaleName(Y));
      let events = vega.parseSelector(selCmpt.zoom, 'scope');

      if (!hasScales) {
        events = events.map(e => (e.markname = name + BRUSH, e));
      }

      signals.push({
        name: name + ANCHOR,
        on: [{
          events,
          update: !hasScales ? "{x: x(unit), y: y(unit)}" : '{' + [sx ? "x: invert(".concat(sx, ", x(unit))") : '', sy ? "y: invert(".concat(sy, ", y(unit))") : ''].filter(expr => !!expr).join(', ') + '}'
        }]
      }, {
        name: delta,
        on: [{
          events,
          force: true,
          update: 'pow(1.001, event.deltaY * pow(16, event.deltaMode))'
        }]
      });

      if (x !== undefined) {
        onDelta(model, selCmpt, x, 'width', signals);
      }

      if (y !== undefined) {
        onDelta(model, selCmpt, y, 'height', signals);
      }

      return signals;
    }
  };

  function onDelta(model, selCmpt, proj, size, signals) {
    var _scaleCmpt$get, _scaleCmpt$get2;

    const name = selCmpt.name;
    const channel = proj.channel;
    const hasScales = scaleBindings.defined(selCmpt);
    const signal = signals.filter(s => s.name === proj.signals[hasScales ? 'data' : 'visual'])[0];
    const sizeSg = model.getSizeSignalRef(size).signal;
    const scaleCmpt = model.getScaleComponent(channel);
    const scaleType = scaleCmpt.get('type');
    const base = hasScales ? domain(model, channel) : signal.name;
    const delta = name + DELTA;
    const anchor = "".concat(name).concat(ANCHOR, ".").concat(channel);
    const zoomFn = !hasScales ? 'zoomLinear' : scaleType === 'log' ? 'zoomLog' : scaleType === 'symlog' ? 'zoomSymlog' : scaleType === 'pow' ? 'zoomPow' : 'zoomLinear';
    const arg = !hasScales ? '' : scaleType === 'pow' ? ", ".concat((_scaleCmpt$get = scaleCmpt.get('exponent')) !== null && _scaleCmpt$get !== void 0 ? _scaleCmpt$get : 1) : scaleType === 'symlog' ? ", ".concat((_scaleCmpt$get2 = scaleCmpt.get('constant')) !== null && _scaleCmpt$get2 !== void 0 ? _scaleCmpt$get2 : 1) : '';
    const update = "".concat(zoomFn, "(").concat(base, ", ").concat(anchor, ", ").concat(delta).concat(arg, ")");
    signal.on.push({
      events: {
        signal: delta
      },
      update: hasScales ? update : "clampRange(".concat(update, ", 0, ").concat(sizeSg, ")")
    });
  }

  const STORE = '_store';
  const TUPLE = '_tuple';
  const MODIFY = '_modify';
  const VL_SELECTION_RESOLVE = 'vlSelectionResolve';
  // Order matters for parsing and assembly.
  const selectionCompilers = [point$1, interval, project, toggle, // Bindings may disable direct manipulation.
  inputBindings, scaleBindings, legendBindings, clear, translate, zoom, nearest];

  function getFacetModel(model) {
    let parent = model.parent;

    while (parent) {
      if (isFacetModel(parent)) break;
      parent = parent.parent;
    }

    return parent;
  }

  function unitName(model) {
    let {
      escape
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      escape: true
    };
    let name = escape ? vega.stringValue(model.name) : model.name;
    const facetModel = getFacetModel(model);

    if (facetModel) {
      const {
        facet
      } = facetModel;

      for (const channel of FACET_CHANNELS) {
        if (facet[channel]) {
          name += " + '__facet_".concat(channel, "_' + (facet[").concat(vega.stringValue(facetModel.vgField(channel)), "])");
        }
      }
    }

    return name;
  }
  function requiresSelectionId(model) {
    var _model$component$sele;

    return vals((_model$component$sele = model.component.selection) !== null && _model$component$sele !== void 0 ? _model$component$sele : {}).reduce((identifier, selCmpt) => {
      return identifier || selCmpt.project.items.some(proj => proj.field === SELECTION_ID);
    }, false);
  } // Binding a point selection to query widgets or legends disables default direct manipulation interaction.
  // A user can choose to re-enable it by explicitly specifying triggering input events.

  function disableDirectManipulation(selCmpt, selDef) {
    if (vega.isString(selDef.select) || !selDef.select.on) delete selCmpt.events;
    if (vega.isString(selDef.select) || !selDef.select.clear) delete selCmpt.clear;
    if (vega.isString(selDef.select) || !selDef.select.toggle) delete selCmpt.toggle;
  }

  function getName(node) {
    const name = [];

    if (node.type === 'Identifier') {
      return [node.name];
    }

    if (node.type === 'Literal') {
      return [node.value];
    }

    if (node.type === 'MemberExpression') {
      name.push(...getName(node.object));
      name.push(...getName(node.property));
    }

    return name;
  }

  function startsWithDatum(node) {
    if (node.object.type === 'MemberExpression') {
      return startsWithDatum(node.object);
    }

    return node.object.name === 'datum';
  }

  function getDependentFields(expression) {
    const ast = vega.parseExpression(expression);
    const dependents = new Set(); // visit is missing in types https://github.com/vega/vega/issues/3298

    ast.visit(node => {
      if (node.type === 'MemberExpression' && startsWithDatum(node)) {
        dependents.add(getName(node).slice(1).join('.'));
      }
    });
    return dependents;
  }

  class FilterNode extends DataFlowNode {
    clone() {
      return new FilterNode(null, this.model, duplicate(this.filter));
    }

    constructor(parent, model, filter) {
      super(parent); // TODO: refactor this to not take a node and
      // then add a static function makeFromOperand and make the constructor take only an expression

      this.model = model;
      this.filter = filter;

      _defineProperty(this, "expr", void 0);

      _defineProperty(this, "_dependentFields", void 0);

      this.expr = expression(this.model, this.filter, this);
      this._dependentFields = getDependentFields(this.expr);
    }

    dependentFields() {
      return this._dependentFields;
    }

    producedFields() {
      return new Set(); // filter does not produce any new fields
    }

    assemble() {
      return {
        type: 'filter',
        expr: this.expr
      };
    }

    hash() {
      return "Filter ".concat(this.expr);
    }

  }

  function parseUnitSelection(model, selDefs) {
    const selCmpts = {};
    const selectionConfig = model.config.selection;
    if (!selDefs || !selDefs.length) return selCmpts;

    for (const def of selDefs) {
      const name = varName(def.name);
      const selDef = def.select;
      const type = vega.isString(selDef) ? selDef : selDef.type;
      const defaults = vega.isObject(selDef) ? duplicate(selDef) : {
        type
      }; // Set default values from config if a property hasn't been specified,
      // or if it is true. E.g., "translate": true should use the default
      // event handlers for translate. However, true may be a valid value for
      // a property (e.g., "nearest": true).

      const cfg = selectionConfig[type];

      for (const key in cfg) {
        // Project transform applies its defaults.
        if (key === 'fields' || key === 'encodings') {
          continue;
        }

        if (key === 'mark') {
          defaults[key] = { ...cfg[key],
            ...defaults[key]
          };
        }

        if (defaults[key] === undefined || defaults[key] === true) {
          var _cfg$key;

          defaults[key] = (_cfg$key = cfg[key]) !== null && _cfg$key !== void 0 ? _cfg$key : defaults[key];
        }
      }

      const selCmpt = selCmpts[name] = { ...defaults,
        name,
        type,
        init: def.value,
        bind: def.bind,
        events: vega.isString(defaults.on) ? vega.parseSelector(defaults.on, 'scope') : vega.array(duplicate(defaults.on))
      };

      for (const c of selectionCompilers) {
        if (c.defined(selCmpt) && c.parse) {
          c.parse(model, selCmpt, def);
        }
      }
    }

    return selCmpts;
  }
  function parseSelectionPredicate(model, pred, dfnode) {
    let datum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'datum';
    const name = vega.isString(pred) ? pred : pred.param;
    const vname = varName(name);
    const store = vega.stringValue(vname + STORE);
    let selCmpt;

    try {
      selCmpt = model.getSelectionComponent(vname, name);
    } catch (e) {
      // If a selection isn't found, treat as a variable parameter and coerce to boolean.
      return "!!".concat(vname);
    }

    if (selCmpt.project.timeUnit) {
      const child = dfnode !== null && dfnode !== void 0 ? dfnode : model.component.data.raw;
      const tunode = selCmpt.project.timeUnit.clone();

      if (child.parent) {
        tunode.insertAsParentOf(child);
      } else {
        child.parent = tunode;
      }
    }

    const test = "vlSelectionTest(".concat(store, ", ").concat(datum).concat(selCmpt.resolve === 'global' ? ')' : ", ".concat(vega.stringValue(selCmpt.resolve), ")"));
    const length = "length(data(".concat(store, "))");
    return pred.empty === false ? "".concat(length, " && ").concat(test) : "!".concat(length, " || ").concat(test);
  }
  function parseSelectionExtent(model, name, extent) {
    const vname = varName(name);
    const encoding = extent['encoding'];
    let field = extent['field'];
    let selCmpt;

    try {
      selCmpt = model.getSelectionComponent(vname, name);
    } catch (e) {
      // If a selection isn't found, treat it as a variable parameter.
      return vname;
    }

    if (!encoding && !field) {
      field = selCmpt.project.items[0].field;

      if (selCmpt.project.items.length > 1) {
        warn('A "field" or "encoding" must be specified when using a selection as a scale domain. ' + "Using \"field\": ".concat(vega.stringValue(field), "."));
      }
    } else if (encoding && !field) {
      const encodings = selCmpt.project.items.filter(p => p.channel === encoding);

      if (!encodings.length || encodings.length > 1) {
        field = selCmpt.project.items[0].field;
        warn((!encodings.length ? 'No ' : 'Multiple ') + "matching ".concat(vega.stringValue(encoding), " encoding found for selection ").concat(vega.stringValue(extent.param), ". ") + "Using \"field\": ".concat(vega.stringValue(field), "."));
      } else {
        field = encodings[0].field;
      }
    }

    return "".concat(selCmpt.name, "[").concat(vega.stringValue(replacePathInField(field)), "]");
  }
  function materializeSelections(model, main) {
    for (const [selection, selCmpt] of entries$1((_model$component$sele = model.component.selection) !== null && _model$component$sele !== void 0 ? _model$component$sele : {})) {
      var _model$component$sele;

      const lookupName = model.getName("lookup_".concat(selection));
      model.component.data.outputNodes[lookupName] = selCmpt.materialized = new OutputNode(new FilterNode(main, model, {
        param: selection
      }), lookupName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
    }
  }

  /**
   * Converts a predicate into an expression.
   */
  // model is only used for selection filters.

  function expression(model, filterOp, node) {
    return logicalExpr(filterOp, predicate => {
      if (vega.isString(predicate)) {
        return predicate;
      } else if (isSelectionPredicate(predicate)) {
        return parseSelectionPredicate(model, predicate, node);
      } else {
        // Filter Object
        return fieldFilterExpression(predicate);
      }
    });
  }

  function assembleTitle(title, config) {
    if (!title) {
      return undefined;
    }

    if (vega.isArray(title) && !isText(title)) {
      return title.map(fieldDef => defaultTitle(fieldDef, config)).join(', ');
    }

    return title;
  }

  function setAxisEncode(axis, part, vgProp, vgRef) {
    var _axis$encode, _axis$encode2, _axis$encode2$part, _axis$encode$part, _axis$encode$part$upd;

    (_axis$encode = axis.encode) !== null && _axis$encode !== void 0 ? _axis$encode : axis.encode = {};
    (_axis$encode2$part = (_axis$encode2 = axis.encode)[part]) !== null && _axis$encode2$part !== void 0 ? _axis$encode2$part : _axis$encode2[part] = {};
    (_axis$encode$part$upd = (_axis$encode$part = axis.encode[part]).update) !== null && _axis$encode$part$upd !== void 0 ? _axis$encode$part$upd : _axis$encode$part.update = {}; // TODO: remove as any after https://github.com/prisma/nexus-prisma/issues/291

    axis.encode[part].update[vgProp] = vgRef;
  }

  function assembleAxis(axisCmpt, kind, config) {
    let opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      header: false
    };
    const {
      disable,
      orient,
      scale,
      labelExpr,
      title,
      zindex,
      ...axis
    } = axisCmpt.combine();

    if (disable) {
      return undefined;
    }

    for (const prop in axis) {
      const propType = AXIS_PROPERTY_TYPE[prop];
      const propValue = axis[prop];

      if (propType && propType !== kind && propType !== 'both') {
        // Remove properties that are not valid for this kind of axis
        delete axis[prop];
      } else if (isConditionalAxisValue(propValue)) {
        // deal with conditional axis value
        const {
          condition,
          ...valueOrSignalRef
        } = propValue;
        const conditions = vega.array(condition);
        const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];

        if (propIndex) {
          const {
            vgProp,
            part
          } = propIndex; // If there is a corresponding Vega property for the channel,
          // use Vega's custom axis encoding and delete the original axis property to avoid conflicts

          const vgRef = [...conditions.map(c => {
            const {
              test,
              ...valueOrSignalCRef
            } = c;
            return {
              test: expression(null, test),
              ...valueOrSignalCRef
            };
          }), valueOrSignalRef];
          setAxisEncode(axis, part, vgProp, vgRef);
          delete axis[prop];
        } else if (propIndex === null) {
          // If propIndex is null, this means we support conditional axis property by converting the condition to signal instead.
          const signalRef = {
            signal: conditions.map(c => {
              const {
                test,
                ...valueOrSignalCRef
              } = c;
              return "".concat(expression(null, test), " ? ").concat(exprFromValueRefOrSignalRef(valueOrSignalCRef), " : ");
            }).join('') + exprFromValueRefOrSignalRef(valueOrSignalRef)
          };
          axis[prop] = signalRef;
        }
      } else if (isSignalRef(propValue)) {
        const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];

        if (propIndex) {
          const {
            vgProp,
            part
          } = propIndex;
          setAxisEncode(axis, part, vgProp, propValue);
          delete axis[prop];
        } // else do nothing since the property already supports signal

      } // Do not pass labelAlign/Baseline = null to Vega since it won't pass the schema
      // Note that we need to use null so the default labelAlign is preserved.


      if (contains(['labelAlign', 'labelBaseline'], prop) && axis[prop] === null) {
        delete axis[prop];
      }
    }

    if (kind === 'grid') {
      if (!axis.grid) {
        return undefined;
      } // Remove unnecessary encode block


      if (axis.encode) {
        // Only need to keep encode block for grid
        const {
          grid
        } = axis.encode;
        axis.encode = { ...(grid ? {
            grid
          } : {})
        };

        if (isEmpty(axis.encode)) {
          delete axis.encode;
        }
      }

      return {
        scale,
        orient,
        ...axis,
        domain: false,
        labels: false,
        aria: false,
        // always hide grid axis
        // Always set min/maxExtent to 0 to ensure that `config.axis*.minExtent` and `config.axis*.maxExtent`
        // would not affect gridAxis
        maxExtent: 0,
        minExtent: 0,
        ticks: false,
        zindex: getFirstDefined(zindex, 0) // put grid behind marks by default

      };
    } else {
      // kind === 'main'
      if (!opt.header && axisCmpt.mainExtracted) {
        // if mainExtracted has been extracted to a separate facet
        return undefined;
      }

      if (labelExpr !== undefined) {
        var _axis$encode3, _axis$encode3$labels;

        let expr = labelExpr;

        if ((_axis$encode3 = axis.encode) !== null && _axis$encode3 !== void 0 && (_axis$encode3$labels = _axis$encode3.labels) !== null && _axis$encode3$labels !== void 0 && _axis$encode3$labels.update && isSignalRef(axis.encode.labels.update.text)) {
          expr = replaceAll(labelExpr, 'datum.label', axis.encode.labels.update.text.signal);
        }

        setAxisEncode(axis, 'labels', 'text', {
          signal: expr
        });
      }

      if (axis.labelAlign === null) {
        delete axis.labelAlign;
      } // Remove unnecessary encode block


      if (axis.encode) {
        for (const part of AXIS_PARTS) {
          if (!axisCmpt.hasAxisPart(part)) {
            delete axis.encode[part];
          }
        }

        if (isEmpty(axis.encode)) {
          delete axis.encode;
        }
      }

      const titleString = assembleTitle(title, config);
      return {
        scale,
        orient,
        grid: false,
        ...(titleString ? {
          title: titleString
        } : {}),
        ...axis,
        ...(config.aria === false ? {
          aria: false
        } : {}),
        zindex: getFirstDefined(zindex, 0) // put axis line above marks by default

      };
    }
  }
  /**
   * Add axis signals so grid line works correctly
   * (Fix https://github.com/vega/vega-lite/issues/4226)
   */

  function assembleAxisSignals(model) {
    const {
      axes
    } = model.component;
    const signals = [];

    for (const channel of POSITION_SCALE_CHANNELS) {
      if (axes[channel]) {
        for (const axis of axes[channel]) {
          if (!axis.get('disable') && !axis.get('gridScale')) {
            // If there is x-axis but no y-scale for gridScale, need to set height/width so x-axis can draw the grid with the right height. Same for y-axis and width.
            const sizeType = channel === 'x' ? 'height' : 'width';
            const update = model.getSizeSignalRef(sizeType).signal;

            if (sizeType !== update) {
              signals.push({
                name: sizeType,
                update
              });
            }
          }
        }
      }
    }

    return signals;
  }
  function assembleAxes(axisComponents, config) {
    const {
      x = [],
      y = []
    } = axisComponents;
    return [...x.map(a => assembleAxis(a, 'grid', config)), ...y.map(a => assembleAxis(a, 'grid', config)), ...x.map(a => assembleAxis(a, 'main', config)), ...y.map(a => assembleAxis(a, 'main', config))].filter(a => a); // filter undefined
  }

  function getAxisConfigFromConfigTypes(configTypes, config, channel, orient) {
    // TODO: add special casing to add conditional value based on orient signal
    return Object.assign.apply(null, [{}, ...configTypes.map(configType => {
      if (configType === 'axisOrient') {
        const orient1 = channel === 'x' ? 'bottom' : 'left';
        const orientConfig1 = config[channel === 'x' ? 'axisBottom' : 'axisLeft'] || {};
        const orientConfig2 = config[channel === 'x' ? 'axisTop' : 'axisRight'] || {};
        const props = new Set([...keys(orientConfig1), ...keys(orientConfig2)]);
        const conditionalOrientAxisConfig = {};

        for (const prop of props.values()) {
          conditionalOrientAxisConfig[prop] = {
            // orient is surely signal in this case
            signal: "".concat(orient['signal'], " === \"").concat(orient1, "\" ? ").concat(signalOrStringValue(orientConfig1[prop]), " : ").concat(signalOrStringValue(orientConfig2[prop]))
          };
        }

        return conditionalOrientAxisConfig;
      }

      return config[configType];
    })]);
  }

  function getAxisConfigs(channel, scaleType, orient, config) {
    const typeBasedConfigTypes = scaleType === 'band' ? ['axisDiscrete', 'axisBand'] : scaleType === 'point' ? ['axisDiscrete', 'axisPoint'] : isQuantitative(scaleType) ? ['axisQuantitative'] : scaleType === 'time' || scaleType === 'utc' ? ['axisTemporal'] : [];
    const axisChannel = channel === 'x' ? 'axisX' : 'axisY';
    const axisOrient = isSignalRef(orient) ? 'axisOrient' : "axis".concat(titleCase(orient)); // axisTop, axisBottom, ...

    const vlOnlyConfigTypes = [// technically Vega does have axisBand, but if we make another separation here,
    // it will further introduce complexity in the code
    ...typeBasedConfigTypes, ...typeBasedConfigTypes.map(c => axisChannel + c.substr(4))];
    const vgConfigTypes = ['axis', axisOrient, axisChannel];
    return {
      vlOnlyAxisConfig: getAxisConfigFromConfigTypes(vlOnlyConfigTypes, config, channel, orient),
      vgAxisConfig: getAxisConfigFromConfigTypes(vgConfigTypes, config, channel, orient),
      axisConfigStyle: getAxisConfigStyle([...vgConfigTypes, ...vlOnlyConfigTypes], config)
    };
  }
  function getAxisConfigStyle(axisConfigTypes, config) {
    const toMerge = [{}];

    for (const configType of axisConfigTypes) {
      var _config$configType;

      // TODO: add special casing to add conditional value based on orient signal
      let style = (_config$configType = config[configType]) === null || _config$configType === void 0 ? void 0 : _config$configType.style;

      if (style) {
        style = vega.array(style);

        for (const s of style) {
          toMerge.push(config.style[s]);
        }
      }
    }

    return Object.assign.apply(null, toMerge);
  }
  function getAxisConfig(property, styleConfigIndex, style) {
    let axisConfigs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const styleConfig = getStyleConfig(property, style, styleConfigIndex);

    if (styleConfig !== undefined) {
      return {
        configFrom: 'style',
        configValue: styleConfig
      };
    }

    for (const configFrom of ['vlOnlyAxisConfig', 'vgAxisConfig', 'axisConfigStyle']) {
      var _axisConfigs$configFr;

      if (((_axisConfigs$configFr = axisConfigs[configFrom]) === null || _axisConfigs$configFr === void 0 ? void 0 : _axisConfigs$configFr[property]) !== undefined) {
        return {
          configFrom,
          configValue: axisConfigs[configFrom][property]
        };
      }
    }

    return {};
  }

  const axisRules = {
    scale: _ref => {
      let {
        model,
        channel
      } = _ref;
      return model.scaleName(channel);
    },
    format: _ref2 => {
      let {
        fieldOrDatumDef,
        config,
        axis
      } = _ref2;
      const {
        format,
        formatType
      } = axis;
      return guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, format, formatType, config, true);
    },
    formatType: _ref3 => {
      let {
        axis,
        fieldOrDatumDef,
        scaleType
      } = _ref3;
      const {
        formatType
      } = axis;
      return guideFormatType(formatType, fieldOrDatumDef, scaleType);
    },
    grid: _ref4 => {
      var _axis$grid;

      let {
        fieldOrDatumDef,
        axis,
        scaleType
      } = _ref4;
      return (_axis$grid = axis.grid) !== null && _axis$grid !== void 0 ? _axis$grid : defaultGrid(scaleType, fieldOrDatumDef);
    },
    gridScale: _ref5 => {
      let {
        model,
        channel
      } = _ref5;
      return gridScale(model, channel);
    },
    labelAlign: _ref6 => {
      let {
        axis,
        labelAngle,
        orient,
        channel
      } = _ref6;
      return axis.labelAlign || defaultLabelAlign(labelAngle, orient, channel);
    },
    labelAngle: _ref7 => {
      let {
        labelAngle
      } = _ref7;
      return labelAngle;
    },
    // we already calculate this in parse
    labelBaseline: _ref8 => {
      let {
        axis,
        labelAngle,
        orient,
        channel
      } = _ref8;
      return axis.labelBaseline || defaultLabelBaseline(labelAngle, orient, channel);
    },
    labelFlush: _ref9 => {
      var _axis$labelFlush;

      let {
        axis,
        fieldOrDatumDef,
        channel
      } = _ref9;
      return (_axis$labelFlush = axis.labelFlush) !== null && _axis$labelFlush !== void 0 ? _axis$labelFlush : defaultLabelFlush(fieldOrDatumDef.type, channel);
    },
    labelOverlap: _ref10 => {
      var _axis$labelOverlap;

      let {
        axis,
        fieldOrDatumDef,
        scaleType
      } = _ref10;
      return (_axis$labelOverlap = axis.labelOverlap) !== null && _axis$labelOverlap !== void 0 ? _axis$labelOverlap : defaultLabelOverlap$1(fieldOrDatumDef.type, scaleType, isFieldDef(fieldOrDatumDef) && !!fieldOrDatumDef.timeUnit, isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : undefined);
    },
    // we already calculate orient in parse
    orient: _ref11 => {
      let {
        orient
      } = _ref11;
      return orient;
    },
    // Need to cast until Vega supports signal
    tickCount: _ref12 => {
      var _axis$tickCount;

      let {
        channel,
        model,
        axis,
        fieldOrDatumDef,
        scaleType
      } = _ref12;
      const sizeType = channel === 'x' ? 'width' : channel === 'y' ? 'height' : undefined;
      const size = sizeType ? model.getSizeSignalRef(sizeType) : undefined;
      return (_axis$tickCount = axis.tickCount) !== null && _axis$tickCount !== void 0 ? _axis$tickCount : defaultTickCount({
        fieldOrDatumDef,
        scaleType,
        size,
        values: axis.values
      });
    },
    title: _ref13 => {
      let {
        axis,
        model,
        channel
      } = _ref13;

      if (axis.title !== undefined) {
        return axis.title;
      }

      const fieldDefTitle = getFieldDefTitle(model, channel);

      if (fieldDefTitle !== undefined) {
        return fieldDefTitle;
      }

      const fieldDef = model.typedFieldDef(channel);
      const channel2 = channel === 'x' ? 'x2' : 'y2';
      const fieldDef2 = model.fieldDef(channel2); // If title not specified, store base parts of fieldDef (and fieldDef2 if exists)

      return mergeTitleFieldDefs(fieldDef ? [toFieldDefBase(fieldDef)] : [], isFieldDef(fieldDef2) ? [toFieldDefBase(fieldDef2)] : []);
    },
    values: _ref14 => {
      let {
        axis,
        fieldOrDatumDef
      } = _ref14;
      return values$1(axis, fieldOrDatumDef);
    },
    zindex: _ref15 => {
      var _axis$zindex;

      let {
        axis,
        fieldOrDatumDef,
        mark
      } = _ref15;
      return (_axis$zindex = axis.zindex) !== null && _axis$zindex !== void 0 ? _axis$zindex : defaultZindex(mark, fieldOrDatumDef);
    }
  }; // TODO: we need to refactor this method after we take care of config refactoring

  /**
   * Default rules for whether to show a grid should be shown for a channel.
   * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
   */

  function defaultGrid(scaleType, fieldDef) {
    return !hasDiscreteDomain(scaleType) && isFieldDef(fieldDef) && !isBinning(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.bin) && !isBinned(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.bin);
  }
  function gridScale(model, channel) {
    const gridChannel = channel === 'x' ? 'y' : 'x';

    if (model.getScaleComponent(gridChannel)) {
      return model.scaleName(gridChannel);
    }

    return undefined;
  }
  function getLabelAngle(fieldOrDatumDef, axis, channel, styleConfig, axisConfigs) {
    const labelAngle = axis === null || axis === void 0 ? void 0 : axis.labelAngle; // try axis value

    if (labelAngle !== undefined) {
      return isSignalRef(labelAngle) ? labelAngle : normalizeAngle(labelAngle);
    } else {
      // try axis config value
      const {
        configValue: angle
      } = getAxisConfig('labelAngle', styleConfig, axis === null || axis === void 0 ? void 0 : axis.style, axisConfigs);

      if (angle !== undefined) {
        return normalizeAngle(angle);
      } else {
        // get default value
        if (channel === X && contains([NOMINAL, ORDINAL], fieldOrDatumDef.type) && !(isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit)) {
          return 270;
        } // no default


        return undefined;
      }
    }
  }
  function normalizeAngleExpr(angle) {
    return "(((".concat(angle.signal, " % 360) + 360) % 360)");
  }
  function defaultLabelBaseline(angle, orient, channel, alwaysIncludeMiddle) {
    if (angle !== undefined) {
      if (channel === 'x') {
        if (isSignalRef(angle)) {
          const a = normalizeAngleExpr(angle);
          const orientIsTop = isSignalRef(orient) ? "(".concat(orient.signal, " === \"top\")") : orient === 'top';
          return {
            signal: "(45 < ".concat(a, " && ").concat(a, " < 135) || (225 < ").concat(a, " && ").concat(a, " < 315) ? \"middle\" :") + "(".concat(a, " <= 45 || 315 <= ").concat(a, ") === ").concat(orientIsTop, " ? \"bottom\" : \"top\"")
          };
        }

        if (45 < angle && angle < 135 || 225 < angle && angle < 315) {
          return 'middle';
        }

        if (isSignalRef(orient)) {
          const op = angle <= 45 || 315 <= angle ? '===' : '!==';
          return {
            signal: "".concat(orient.signal, " ").concat(op, " \"top\" ? \"bottom\" : \"top\"")
          };
        }

        return (angle <= 45 || 315 <= angle) === (orient === 'top') ? 'bottom' : 'top';
      } else {
        if (isSignalRef(angle)) {
          const a = normalizeAngleExpr(angle);
          const orientIsLeft = isSignalRef(orient) ? "(".concat(orient.signal, " === \"left\")") : orient === 'left';
          const middle = alwaysIncludeMiddle ? '"middle"' : 'null';
          return {
            signal: "".concat(a, " <= 45 || 315 <= ").concat(a, " || (135 <= ").concat(a, " && ").concat(a, " <= 225) ? ").concat(middle, " : (45 <= ").concat(a, " && ").concat(a, " <= 135) === ").concat(orientIsLeft, " ? \"top\" : \"bottom\"")
          };
        }

        if (angle <= 45 || 315 <= angle || 135 <= angle && angle <= 225) {
          return alwaysIncludeMiddle ? 'middle' : null;
        }

        if (isSignalRef(orient)) {
          const op = 45 <= angle && angle <= 135 ? '===' : '!==';
          return {
            signal: "".concat(orient.signal, " ").concat(op, " \"left\" ? \"top\" : \"bottom\"")
          };
        }

        return (45 <= angle && angle <= 135) === (orient === 'left') ? 'top' : 'bottom';
      }
    }

    return undefined;
  }
  function defaultLabelAlign(angle, orient, channel) {
    if (angle === undefined) {
      return undefined;
    }

    const isX = channel === 'x';
    const startAngle = isX ? 0 : 90;
    const mainOrient = isX ? 'bottom' : 'left';

    if (isSignalRef(angle)) {
      const a = normalizeAngleExpr(angle);
      const orientIsMain = isSignalRef(orient) ? "(".concat(orient.signal, " === \"").concat(mainOrient, "\")") : orient === mainOrient;
      return {
        signal: "(".concat(startAngle ? "(".concat(a, " + 90)") : a, " % 180 === 0) ? ").concat(isX ? null : '"center"', " :") + "(".concat(startAngle, " < ").concat(a, " && ").concat(a, " < ").concat(180 + startAngle, ") === ").concat(orientIsMain, " ? \"left\" : \"right\"")
      };
    }

    if ((angle + startAngle) % 180 === 0) {
      // For bottom, use default label align so label flush still works
      return isX ? null : 'center';
    }

    if (isSignalRef(orient)) {
      const op = startAngle < angle && angle < 180 + startAngle ? '===' : '!==';
      const orientIsMain = "".concat(orient.signal, " ").concat(op, " \"").concat(mainOrient, "\"");
      return {
        signal: "".concat(orientIsMain, " ? \"left\" : \"right\"")
      };
    }

    if ((startAngle < angle && angle < 180 + startAngle) === (orient === mainOrient)) {
      return 'left';
    }

    return 'right';
  }
  function defaultLabelFlush(type, channel) {
    if (channel === 'x' && contains(['quantitative', 'temporal'], type)) {
      return true;
    }

    return undefined;
  }
  function defaultLabelOverlap$1(type, scaleType, hasTimeUnit, sort) {
    // do not prevent overlap for nominal data because there is no way to infer what the missing labels are
    if (hasTimeUnit && !vega.isObject(sort) || type !== 'nominal' && type !== 'ordinal') {
      if (scaleType === 'log' || scaleType === 'symlog') {
        return 'greedy';
      }

      return true;
    }

    return undefined;
  }
  function defaultOrient(channel) {
    return channel === 'x' ? 'bottom' : 'left';
  }
  function defaultTickCount(_ref16) {
    let {
      fieldOrDatumDef,
      scaleType,
      size,
      values: vals
    } = _ref16;

    if (!vals && !hasDiscreteDomain(scaleType) && scaleType !== 'log') {
      if (isFieldDef(fieldOrDatumDef)) {
        var _normalizeTimeUnit;

        if (isBinning(fieldOrDatumDef.bin)) {
          // for binned data, we don't want more ticks than maxbins
          return {
            signal: "ceil(".concat(size.signal, "/10)")
          };
        }

        if (fieldOrDatumDef.timeUnit && contains(['month', 'hours', 'day', 'quarter'], (_normalizeTimeUnit = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit)) {
          return undefined;
        }
      }

      return {
        signal: "ceil(".concat(size.signal, "/40)")
      };
    }

    return undefined;
  }
  function getFieldDefTitle(model, channel) {
    const channel2 = channel === 'x' ? 'x2' : 'y2';
    const fieldDef = model.fieldDef(channel);
    const fieldDef2 = model.fieldDef(channel2);
    const title1 = fieldDef ? fieldDef.title : undefined;
    const title2 = fieldDef2 ? fieldDef2.title : undefined;

    if (title1 && title2) {
      return mergeTitle(title1, title2);
    } else if (title1) {
      return title1;
    } else if (title2) {
      return title2;
    } else if (title1 !== undefined) {
      // falsy value to disable config
      return title1;
    } else if (title2 !== undefined) {
      // falsy value to disable config
      return title2;
    }

    return undefined;
  }
  function values$1(axis, fieldOrDatumDef) {
    const vals = axis.values;

    if (vega.isArray(vals)) {
      return valueArray(fieldOrDatumDef, vals);
    } else if (isSignalRef(vals)) {
      return vals;
    }

    return undefined;
  }
  function defaultZindex(mark, fieldDef) {
    if (mark === 'rect' && isDiscrete(fieldDef)) {
      return 1;
    }

    return 0;
  }

  class CalculateNode extends DataFlowNode {
    clone() {
      return new CalculateNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;

      _defineProperty(this, "_dependentFields", void 0);

      this._dependentFields = getDependentFields(this.transform.calculate);
    }

    static parseAllForSortIndex(parent, model) {
      // get all the encoding with sort fields from model
      model.forEachFieldDef((fieldDef, channel) => {
        if (!isScaleFieldDef(fieldDef)) {
          return;
        }

        if (isSortArray(fieldDef.sort)) {
          const {
            field,
            timeUnit
          } = fieldDef;
          const sort = fieldDef.sort; // generate `datum["a"] === val0 ? 0 : datum["a"] === val1 ? 1 : ... : n` via FieldEqualPredicate

          const calculate = sort.map((sortValue, i) => {
            return "".concat(fieldFilterExpression({
              field,
              timeUnit,
              equal: sortValue
            }), " ? ").concat(i, " : ");
          }).join('') + sort.length;
          parent = new CalculateNode(parent, {
            calculate,
            as: sortArrayIndexField(fieldDef, channel, {
              forAs: true
            })
          });
        }
      });
      return parent;
    }

    producedFields() {
      return new Set([this.transform.as]);
    }

    dependentFields() {
      return this._dependentFields;
    }

    assemble() {
      return {
        type: 'formula',
        expr: this.transform.calculate,
        as: this.transform.as
      };
    }

    hash() {
      return "Calculate ".concat(hash(this.transform));
    }

  }
  function sortArrayIndexField(fieldDef, channel, opt) {
    return vgField(fieldDef, {
      prefix: channel,
      suffix: 'sort_index',
      ...(opt !== null && opt !== void 0 ? opt : {})
    });
  }

  /**
   * Get header channel, which can be different from facet channel when orient is specified or when the facet channel is facet.
   */
  function getHeaderChannel(channel, orient) {
    if (contains(['top', 'bottom'], orient)) {
      return 'column';
    } else if (contains(['left', 'right'], orient)) {
      return 'row';
    }

    return channel === 'row' ? 'row' : 'column';
  }
  function getHeaderProperty(prop, header, config, channel) {
    const headerSpecificConfig = channel === 'row' ? config.headerRow : channel === 'column' ? config.headerColumn : config.headerFacet;
    return getFirstDefined((header || {})[prop], headerSpecificConfig[prop], config.header[prop]);
  }
  function getHeaderProperties(properties, header, config, channel) {
    const props = {};

    for (const prop of properties) {
      const value = getHeaderProperty(prop, header || {}, config, channel);

      if (value !== undefined) {
        props[prop] = value;
      }
    }

    return props;
  }

  /**
   * Utility for generating row / column headers
   */
  const HEADER_CHANNELS = ['row', 'column'];
  const HEADER_TYPES = ['header', 'footer'];

  /**
   * Utility for generating row / column headers
   */

  function assembleTitleGroup(model, channel) {
    const title = model.component.layoutHeaders[channel].title;
    const config = model.config ? model.config : undefined;
    const facetFieldDef = model.component.layoutHeaders[channel].facetFieldDef ? model.component.layoutHeaders[channel].facetFieldDef : undefined;
    const {
      titleAnchor,
      titleAngle: ta,
      titleOrient
    } = getHeaderProperties(['titleAnchor', 'titleAngle', 'titleOrient'], facetFieldDef.header, config, channel);
    const headerChannel = getHeaderChannel(channel, titleOrient);
    const titleAngle = normalizeAngle(ta);
    return {
      name: "".concat(channel, "-title"),
      type: 'group',
      role: "".concat(headerChannel, "-title"),
      title: {
        text: title,
        ...(channel === 'row' ? {
          orient: 'left'
        } : {}),
        style: 'guide-title',
        ...defaultHeaderGuideBaseline(titleAngle, headerChannel),
        ...defaultHeaderGuideAlign(headerChannel, titleAngle, titleAnchor),
        ...assembleHeaderProperties(config, facetFieldDef, channel, HEADER_TITLE_PROPERTIES, HEADER_TITLE_PROPERTIES_MAP)
      }
    };
  }
  function defaultHeaderGuideAlign(headerChannel, angle) {
    let anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'middle';

    switch (anchor) {
      case 'start':
        return {
          align: 'left'
        };

      case 'end':
        return {
          align: 'right'
        };
    }

    const align = defaultLabelAlign(angle, headerChannel === 'row' ? 'left' : 'top', headerChannel === 'row' ? 'y' : 'x');
    return align ? {
      align
    } : {};
  }
  function defaultHeaderGuideBaseline(angle, channel) {
    const baseline = defaultLabelBaseline(angle, channel === 'row' ? 'left' : 'top', channel === 'row' ? 'y' : 'x', true);
    return baseline ? {
      baseline
    } : {};
  }
  function assembleHeaderGroups(model, channel) {
    const layoutHeader = model.component.layoutHeaders[channel];
    const groups = [];

    for (const headerType of HEADER_TYPES) {
      if (layoutHeader[headerType]) {
        for (const headerComponent of layoutHeader[headerType]) {
          const group = assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent);

          if (group != null) {
            groups.push(group);
          }
        }
      }
    }

    return groups;
  }

  function getSort$1(facetFieldDef, channel) {
    const {
      sort
    } = facetFieldDef;

    if (isSortField(sort)) {
      var _sort$order;

      return {
        field: vgField(sort, {
          expr: 'datum'
        }),
        order: (_sort$order = sort.order) !== null && _sort$order !== void 0 ? _sort$order : 'ascending'
      };
    } else if (vega.isArray(sort)) {
      return {
        field: sortArrayIndexField(facetFieldDef, channel, {
          expr: 'datum'
        }),
        order: 'ascending'
      };
    } else {
      return {
        field: vgField(facetFieldDef, {
          expr: 'datum'
        }),
        order: sort !== null && sort !== void 0 ? sort : 'ascending'
      };
    }
  }

  function assembleLabelTitle(facetFieldDef, channel, config) {
    const {
      format,
      formatType,
      labelAngle,
      labelAnchor,
      labelOrient,
      labelExpr
    } = getHeaderProperties(['format', 'formatType', 'labelAngle', 'labelAnchor', 'labelOrient', 'labelExpr'], facetFieldDef.header, config, channel);
    const titleTextExpr = formatSignalRef({
      fieldOrDatumDef: facetFieldDef,
      format,
      formatType,
      expr: 'parent',
      config
    }).signal;
    const headerChannel = getHeaderChannel(channel, labelOrient);
    return {
      text: {
        signal: labelExpr ? replaceAll(replaceAll(labelExpr, 'datum.label', titleTextExpr), 'datum.value', vgField(facetFieldDef, {
          expr: 'parent'
        })) : titleTextExpr
      },
      ...(channel === 'row' ? {
        orient: 'left'
      } : {}),
      style: 'guide-label',
      frame: 'group',
      ...defaultHeaderGuideBaseline(labelAngle, headerChannel),
      ...defaultHeaderGuideAlign(headerChannel, labelAngle, labelAnchor),
      ...assembleHeaderProperties(config, facetFieldDef, channel, HEADER_LABEL_PROPERTIES, HEADER_LABEL_PROPERTIES_MAP)
    };
  }
  function assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent) {
    if (headerComponent) {
      let title = null;
      const {
        facetFieldDef
      } = layoutHeader;
      const config = model.config ? model.config : undefined;

      if (facetFieldDef && headerComponent.labels) {
        const {
          labelOrient
        } = getHeaderProperties(['labelOrient'], facetFieldDef.header, config, channel); // Include label title in the header if orient aligns with the channel

        if (channel === 'row' && !contains(['top', 'bottom'], labelOrient) || channel === 'column' && !contains(['left', 'right'], labelOrient)) {
          title = assembleLabelTitle(facetFieldDef, channel, config);
        }
      }

      const isFacetWithoutRowCol = isFacetModel(model) && !isFacetMapping(model.facet);
      const axes = headerComponent.axes;
      const hasAxes = (axes === null || axes === void 0 ? void 0 : axes.length) > 0;

      if (title || hasAxes) {
        const sizeChannel = channel === 'row' ? 'height' : 'width';
        return {
          name: model.getName("".concat(channel, "_").concat(headerType)),
          type: 'group',
          role: "".concat(channel, "-").concat(headerType),
          ...(layoutHeader.facetFieldDef ? {
            from: {
              data: model.getName("".concat(channel, "_domain"))
            },
            sort: getSort$1(facetFieldDef, channel)
          } : {}),
          ...(hasAxes && isFacetWithoutRowCol ? {
            from: {
              data: model.getName("facet_domain_".concat(channel))
            }
          } : {}),
          ...(title ? {
            title
          } : {}),
          ...(headerComponent.sizeSignal ? {
            encode: {
              update: {
                [sizeChannel]: headerComponent.sizeSignal
              }
            }
          } : {}),
          ...(hasAxes ? {
            axes
          } : {})
        };
      }
    }

    return null;
  }
  const LAYOUT_TITLE_BAND = {
    column: {
      start: 0,
      end: 1
    },
    row: {
      start: 1,
      end: 0
    }
  };
  function getLayoutTitleBand(titleAnchor, headerChannel) {
    return LAYOUT_TITLE_BAND[headerChannel][titleAnchor];
  }
  function assembleLayoutTitleBand(headerComponentIndex, config) {
    const titleBand = {};

    for (const channel of FACET_CHANNELS) {
      const headerComponent = headerComponentIndex[channel];

      if (headerComponent !== null && headerComponent !== void 0 && headerComponent.facetFieldDef) {
        const {
          titleAnchor,
          titleOrient
        } = getHeaderProperties(['titleAnchor', 'titleOrient'], headerComponent.facetFieldDef.header, config, channel);
        const headerChannel = getHeaderChannel(channel, titleOrient);
        const band = getLayoutTitleBand(titleAnchor, headerChannel);

        if (band !== undefined) {
          titleBand[headerChannel] = band;
        }
      }
    }

    return isEmpty(titleBand) ? undefined : titleBand;
  }
  function assembleHeaderProperties(config, facetFieldDef, channel, properties, propertiesMap) {
    const props = {};

    for (const prop of properties) {
      if (!propertiesMap[prop]) {
        continue;
      }

      const value = getHeaderProperty(prop, facetFieldDef === null || facetFieldDef === void 0 ? void 0 : facetFieldDef.header, config, channel);

      if (value !== undefined) {
        props[propertiesMap[prop]] = value;
      }
    }

    return props;
  }

  function assembleLayoutSignals(model) {
    return [...sizeSignals(model, 'width'), ...sizeSignals(model, 'height'), ...sizeSignals(model, 'childWidth'), ...sizeSignals(model, 'childHeight')];
  }
  function sizeSignals(model, sizeType) {
    const channel = sizeType === 'width' ? 'x' : 'y';
    const size = model.component.layoutSize.get(sizeType);

    if (!size || size === 'merged') {
      return [];
    } // Read size signal name from name map, just in case it is the top-level size signal that got renamed.


    const name = model.getSizeSignalRef(sizeType).signal;

    if (size === 'step') {
      const scaleComponent = model.getScaleComponent(channel);

      if (scaleComponent) {
        const type = scaleComponent.get('type');
        const range = scaleComponent.get('range');

        if (hasDiscreteDomain(type) && isVgRangeStep(range)) {
          const scaleName = model.scaleName(channel);

          if (isFacetModel(model.parent)) {
            // If parent is facet and this is an independent scale, return only signal signal
            // as the width/height will be calculated using the cardinality from
            // facet's aggregate rather than reading from scale domain
            const parentResolve = model.parent.component.resolve;

            if (parentResolve.scale[channel] === 'independent') {
              return [stepSignal(scaleName, range)];
            }
          }

          return [stepSignal(scaleName, range), {
            name,
            update: sizeExpr(scaleName, scaleComponent, "domain('".concat(scaleName, "').length"))
          }];
        }
      }
      /* istanbul ignore next: Condition should not happen -- only for warning in development. */


      throw new Error('layout size is step although width/height is not step.');
    } else if (size == 'container') {
      const isWidth = name.endsWith('width');
      const expr = isWidth ? 'containerSize()[0]' : 'containerSize()[1]';
      const defaultValue = getViewConfigContinuousSize(model.config.view, isWidth ? 'width' : 'height');
      const safeExpr = "isFinite(".concat(expr, ") ? ").concat(expr, " : ").concat(defaultValue);
      return [{
        name,
        init: safeExpr,
        on: [{
          update: safeExpr,
          events: 'window:resize'
        }]
      }];
    } else {
      return [{
        name,
        value: size
      }];
    }
  }

  function stepSignal(scaleName, range) {
    const name = "".concat(scaleName, "_step");

    if (isSignalRef(range.step)) {
      return {
        name,
        update: range.step.signal
      };
    } else {
      return {
        name,
        value: range.step
      };
    }
  }

  function sizeExpr(scaleName, scaleComponent, cardinality) {
    const type = scaleComponent.get('type');
    const padding = scaleComponent.get('padding');
    const paddingOuter = getFirstDefined(scaleComponent.get('paddingOuter'), padding);
    let paddingInner = scaleComponent.get('paddingInner');
    paddingInner = type === 'band' ? // only band has real paddingInner
    paddingInner !== undefined ? paddingInner : padding : // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
    // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
    1;
    return "bandspace(".concat(cardinality, ", ").concat(signalOrStringValue(paddingInner), ", ").concat(signalOrStringValue(paddingOuter), ") * ").concat(scaleName, "_step");
  }

  function getSizeTypeFromLayoutSizeType(layoutSizeType) {
    return layoutSizeType === 'childWidth' ? 'width' : layoutSizeType === 'childHeight' ? 'height' : layoutSizeType;
  }

  function guideEncodeEntry(encoding, model) {
    return keys(encoding).reduce((encode, channel) => {
      const valueDef = encoding[channel];
      return { ...encode,
        ...wrapCondition(model, valueDef, channel, def => signalOrValueRef(def.value))
      };
    }, {});
  }

  function defaultScaleResolve(channel, model) {
    if (isFacetModel(model)) {
      return channel === 'theta' ? 'independent' : 'shared';
    } else if (isLayerModel(model)) {
      return 'shared';
    } else if (isConcatModel(model)) {
      return isXorY(channel) || channel === 'theta' || channel === 'radius' ? 'independent' : 'shared';
    }
    /* istanbul ignore next: should never reach here. */


    throw new Error('invalid model type for resolve');
  }
  function parseGuideResolve(resolve, channel) {
    const channelScaleResolve = resolve.scale[channel];
    const guide = isXorY(channel) ? 'axis' : 'legend';

    if (channelScaleResolve === 'independent') {
      if (resolve[guide][channel] === 'shared') {
        warn(independentScaleMeansIndependentGuide(channel));
      }

      return 'independent';
    }

    return resolve[guide][channel] || 'shared';
  }

  const LEGEND_COMPONENT_PROPERTY_INDEX = { ...COMMON_LEGEND_PROPERTY_INDEX,
    disable: 1,
    labelExpr: 1,
    selections: 1,
    // channel scales
    opacity: 1,
    shape: 1,
    stroke: 1,
    fill: 1,
    size: 1,
    strokeWidth: 1,
    strokeDash: 1,
    // encode
    encode: 1
  };
  const LEGEND_COMPONENT_PROPERTIES = keys(LEGEND_COMPONENT_PROPERTY_INDEX);
  class LegendComponent extends Split {}

  const legendEncodeRules = {
    symbols,
    gradient,
    labels: labels$1,
    entries
  };
  function symbols(symbolsSpec, _ref) {
    var _legendCmpt$get, _legendCmpt$get2, _legendCmpt$get3, _getMaxValue;

    let {
      fieldOrDatumDef,
      model,
      channel,
      legendCmpt,
      legendType
    } = _ref;

    if (legendType !== 'symbol') {
      return undefined;
    }

    const {
      markDef,
      encoding,
      config,
      mark
    } = model;
    const filled = markDef.filled && mark !== 'trail';
    let out = { ...applyMarkConfig({}, model, FILL_STROKE_CONFIG),
      ...color(model, {
        filled
      })
    }; // FIXME: remove this when VgEncodeEntry is compatible with SymbolEncodeEntry

    const symbolOpacity = (_legendCmpt$get = legendCmpt.get('symbolOpacity')) !== null && _legendCmpt$get !== void 0 ? _legendCmpt$get : config.legend.symbolOpacity;
    const symbolFillColor = (_legendCmpt$get2 = legendCmpt.get('symbolFillColor')) !== null && _legendCmpt$get2 !== void 0 ? _legendCmpt$get2 : config.legend.symbolFillColor;
    const symbolStrokeColor = (_legendCmpt$get3 = legendCmpt.get('symbolStrokeColor')) !== null && _legendCmpt$get3 !== void 0 ? _legendCmpt$get3 : config.legend.symbolStrokeColor;
    const opacity = symbolOpacity === undefined ? (_getMaxValue = getMaxValue(encoding.opacity)) !== null && _getMaxValue !== void 0 ? _getMaxValue : markDef.opacity : undefined;

    if (out.fill) {
      // for fill legend, we don't want any fill in symbol
      if (channel === 'fill' || filled && channel === COLOR) {
        delete out.fill;
      } else {
        if (out.fill['field']) {
          // For others, set fill to some opaque value (or nothing if a color is already set)
          if (symbolFillColor) {
            delete out.fill;
          } else {
            var _config$legend$symbol;

            out.fill = signalOrValueRef((_config$legend$symbol = config.legend.symbolBaseFillColor) !== null && _config$legend$symbol !== void 0 ? _config$legend$symbol : 'black');
            out.fillOpacity = signalOrValueRef(opacity !== null && opacity !== void 0 ? opacity : 1);
          }
        } else if (vega.isArray(out.fill)) {
          var _ref2, _getFirstConditionVal, _encoding$fill;

          const fill = (_ref2 = (_getFirstConditionVal = getFirstConditionValue((_encoding$fill = encoding.fill) !== null && _encoding$fill !== void 0 ? _encoding$fill : encoding.color)) !== null && _getFirstConditionVal !== void 0 ? _getFirstConditionVal : markDef.fill) !== null && _ref2 !== void 0 ? _ref2 : filled && markDef.color;

          if (fill) {
            out.fill = signalOrValueRef(fill);
          }
        }
      }
    }

    if (out.stroke) {
      if (channel === 'stroke' || !filled && channel === COLOR) {
        delete out.stroke;
      } else {
        if (out.stroke['field'] || symbolStrokeColor) {
          // For others, remove stroke field
          delete out.stroke;
        } else if (vega.isArray(out.stroke)) {
          const stroke = getFirstDefined(getFirstConditionValue(encoding.stroke || encoding.color), markDef.stroke, filled ? markDef.color : undefined);

          if (stroke) {
            out.stroke = {
              value: stroke
            };
          }
        }
      }
    }

    if (channel !== OPACITY) {
      const condition = isFieldDef(fieldOrDatumDef) && selectedCondition(model, legendCmpt, fieldOrDatumDef);

      if (condition) {
        out.opacity = [{
          test: condition,
          ...signalOrValueRef(opacity !== null && opacity !== void 0 ? opacity : 1)
        }, signalOrValueRef(config.legend.unselectedOpacity)];
      } else if (opacity) {
        out.opacity = signalOrValueRef(opacity);
      }
    }

    out = { ...out,
      ...symbolsSpec
    };
    return isEmpty(out) ? undefined : out;
  }
  function gradient(gradientSpec, _ref3) {
    var _legendCmpt$get4;

    let {
      model,
      legendType,
      legendCmpt
    } = _ref3;

    if (legendType !== 'gradient') {
      return undefined;
    }

    const {
      config,
      markDef,
      encoding
    } = model;
    let out = {};
    const gradientOpacity = (_legendCmpt$get4 = legendCmpt.get('gradientOpacity')) !== null && _legendCmpt$get4 !== void 0 ? _legendCmpt$get4 : config.legend.gradientOpacity;
    const opacity = gradientOpacity === undefined ? getMaxValue(encoding.opacity) || markDef.opacity : undefined;

    if (opacity) {
      // only apply opacity if it is neither zero or undefined
      out.opacity = signalOrValueRef(opacity);
    }

    out = { ...out,
      ...gradientSpec
    };
    return isEmpty(out) ? undefined : out;
  }
  function labels$1(specifiedlabelsSpec, _ref4) {
    let {
      fieldOrDatumDef,
      model,
      channel,
      legendCmpt
    } = _ref4;
    const legend = model.legend(channel) || {};
    const config = model.config;
    const condition = isFieldDef(fieldOrDatumDef) ? selectedCondition(model, legendCmpt, fieldOrDatumDef) : undefined;
    const opacity = condition ? [{
      test: condition,
      value: 1
    }, {
      value: config.legend.unselectedOpacity
    }] : undefined;
    const {
      format,
      formatType
    } = legend;
    const text = isCustomFormatType(formatType) ? formatCustomType({
      fieldOrDatumDef,
      field: 'datum.value',
      format,
      formatType,
      config
    }) : undefined;
    const labelsSpec = { ...(opacity ? {
        opacity
      } : {}),
      ...(text ? {
        text
      } : {}),
      ...specifiedlabelsSpec
    };
    return isEmpty(labelsSpec) ? undefined : labelsSpec;
  }
  function entries(entriesSpec, _ref5) {
    let {
      legendCmpt
    } = _ref5;
    const selections = legendCmpt.get('selections');
    return selections !== null && selections !== void 0 && selections.length ? { ...entriesSpec,
      fill: {
        value: 'transparent'
      }
    } : entriesSpec;
  }

  function getMaxValue(channelDef) {
    return getConditionValue(channelDef, (v, conditionalDef) => Math.max(v, conditionalDef.value));
  }

  function getFirstConditionValue(channelDef) {
    return getConditionValue(channelDef, (v, conditionalDef) => {
      return getFirstDefined(v, conditionalDef.value);
    });
  }

  function getConditionValue(channelDef, reducer) {
    if (hasConditionalValueDef(channelDef)) {
      return vega.array(channelDef.condition).reduce(reducer, channelDef.value);
    } else if (isValueDef(channelDef)) {
      return channelDef.value;
    }

    return undefined;
  }

  function selectedCondition(model, legendCmpt, fieldDef) {
    const selections = legendCmpt.get('selections');
    if (!(selections !== null && selections !== void 0 && selections.length)) return undefined;
    const field = vega.stringValue(fieldDef.field);
    return selections.map(name => {
      const store = vega.stringValue(varName(name) + STORE);
      return "(!length(data(".concat(store, ")) || (").concat(name, "[").concat(field, "] && indexof(").concat(name, "[").concat(field, "], datum.value) >= 0))");
    }).join(' || ');
  }

  const legendRules = {
    direction: _ref => {
      let {
        direction
      } = _ref;
      return direction;
    },
    format: _ref2 => {
      let {
        fieldOrDatumDef,
        legend,
        config
      } = _ref2;
      const {
        format,
        formatType
      } = legend;
      return guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, format, formatType, config, false);
    },
    formatType: _ref3 => {
      let {
        legend,
        fieldOrDatumDef,
        scaleType
      } = _ref3;
      const {
        formatType
      } = legend;
      return guideFormatType(formatType, fieldOrDatumDef, scaleType);
    },
    gradientLength: params => {
      var _ref4, _legend$gradientLengt;

      const {
        legend,
        legendConfig
      } = params;
      return (_ref4 = (_legend$gradientLengt = legend.gradientLength) !== null && _legend$gradientLengt !== void 0 ? _legend$gradientLengt : legendConfig.gradientLength) !== null && _ref4 !== void 0 ? _ref4 : defaultGradientLength(params);
    },
    labelOverlap: _ref5 => {
      var _ref6, _legend$labelOverlap;

      let {
        legend,
        legendConfig,
        scaleType
      } = _ref5;
      return (_ref6 = (_legend$labelOverlap = legend.labelOverlap) !== null && _legend$labelOverlap !== void 0 ? _legend$labelOverlap : legendConfig.labelOverlap) !== null && _ref6 !== void 0 ? _ref6 : defaultLabelOverlap(scaleType);
    },
    symbolType: _ref7 => {
      var _legend$symbolType;

      let {
        legend,
        markDef,
        channel,
        encoding
      } = _ref7;
      return (_legend$symbolType = legend.symbolType) !== null && _legend$symbolType !== void 0 ? _legend$symbolType : defaultSymbolType(markDef.type, channel, encoding.shape, markDef.shape);
    },
    title: _ref8 => {
      let {
        fieldOrDatumDef,
        config
      } = _ref8;
      return title(fieldOrDatumDef, config, {
        allowDisabling: true
      });
    },
    type: _ref9 => {
      let {
        legendType,
        scaleType,
        channel
      } = _ref9;

      if (isColorChannel(channel) && isContinuousToContinuous(scaleType)) {
        if (legendType === 'gradient') {
          return undefined;
        }
      } else if (legendType === 'symbol') {
        return undefined;
      }

      return legendType;
    },
    // depended by other property, let's define upfront
    values: _ref10 => {
      let {
        fieldOrDatumDef,
        legend
      } = _ref10;
      return values(legend, fieldOrDatumDef);
    }
  };
  function values(legend, fieldOrDatumDef) {
    const vals = legend.values;

    if (vega.isArray(vals)) {
      return valueArray(fieldOrDatumDef, vals);
    } else if (isSignalRef(vals)) {
      return vals;
    }

    return undefined;
  }
  function defaultSymbolType(mark, channel, shapeChannelDef, markShape) {
    if (channel !== 'shape') {
      var _getFirstConditionVal;

      // use the value from the shape encoding or the mark config if they exist
      const shape = (_getFirstConditionVal = getFirstConditionValue(shapeChannelDef)) !== null && _getFirstConditionVal !== void 0 ? _getFirstConditionVal : markShape;

      if (shape) {
        return shape;
      }
    }

    switch (mark) {
      case 'bar':
      case 'rect':
      case 'image':
      case 'square':
        return 'square';

      case 'line':
      case 'trail':
      case 'rule':
        return 'stroke';

      case 'arc':
      case 'point':
      case 'circle':
      case 'tick':
      case 'geoshape':
      case 'area':
      case 'text':
        return 'circle';
    }
  }
  function getLegendType(params) {
    const {
      legend
    } = params;
    return getFirstDefined(legend.type, defaultType$1(params));
  }
  function defaultType$1(_ref11) {
    let {
      channel,
      timeUnit,
      scaleType
    } = _ref11;

    // Following the logic in https://github.com/vega/vega-parser/blob/master/src/parsers/legend.js
    if (isColorChannel(channel)) {
      if (contains(['quarter', 'month', 'day'], timeUnit)) {
        return 'symbol';
      }

      if (isContinuousToContinuous(scaleType)) {
        return 'gradient';
      }
    }

    return 'symbol';
  }
  function getDirection(_ref12) {
    var _ref13, _legend$direction;

    let {
      legendConfig,
      legendType,
      orient,
      legend
    } = _ref12;
    return (_ref13 = (_legend$direction = legend.direction) !== null && _legend$direction !== void 0 ? _legend$direction : legendConfig[legendType ? 'gradientDirection' : 'symbolDirection']) !== null && _ref13 !== void 0 ? _ref13 : defaultDirection(orient, legendType);
  }
  function defaultDirection(orient, legendType) {
    switch (orient) {
      case 'top':
      case 'bottom':
        return 'horizontal';

      case 'left':
      case 'right':
      case 'none':
      case undefined:
        // undefined = "right" in Vega
        return undefined;
      // vertical is Vega's default

      default:
        // top-left / ...
        // For inner legend, uses compact layout like Tableau
        return legendType === 'gradient' ? 'horizontal' : undefined;
    }
  }
  function defaultGradientLength(_ref14) {
    let {
      legendConfig,
      model,
      direction,
      orient,
      scaleType
    } = _ref14;
    const {
      gradientHorizontalMaxLength,
      gradientHorizontalMinLength,
      gradientVerticalMaxLength,
      gradientVerticalMinLength
    } = legendConfig;

    if (isContinuousToContinuous(scaleType)) {
      if (direction === 'horizontal') {
        if (orient === 'top' || orient === 'bottom') {
          return gradientLengthSignal(model, 'width', gradientHorizontalMinLength, gradientHorizontalMaxLength);
        } else {
          return gradientHorizontalMinLength;
        }
      } else {
        // vertical / undefined (Vega uses vertical by default)
        return gradientLengthSignal(model, 'height', gradientVerticalMinLength, gradientVerticalMaxLength);
      }
    }

    return undefined;
  }

  function gradientLengthSignal(model, sizeType, min, max) {
    const sizeSignal = model.getSizeSignalRef(sizeType).signal;
    return {
      signal: "clamp(".concat(sizeSignal, ", ").concat(min, ", ").concat(max, ")")
    };
  }

  function defaultLabelOverlap(scaleType) {
    if (contains(['quantile', 'threshold', 'log', 'symlog'], scaleType)) {
      return 'greedy';
    }

    return undefined;
  }

  function parseLegend(model) {
    const legendComponent = isUnitModel(model) ? parseUnitLegend(model) : parseNonUnitLegend(model);
    model.component.legends = legendComponent;
    return legendComponent;
  }

  function parseUnitLegend(model) {
    const {
      encoding
    } = model;
    const legendComponent = {};

    for (const channel of [COLOR, ...LEGEND_SCALE_CHANNELS]) {
      const def = getFieldOrDatumDef(encoding[channel]);

      if (!def || !model.getScaleComponent(channel)) {
        continue;
      }

      if (channel === SHAPE && isFieldDef(def) && def.type === GEOJSON) {
        continue;
      }

      legendComponent[channel] = parseLegendForChannel(model, channel);
    }

    return legendComponent;
  }

  function getLegendDefWithScale(model, channel) {
    const scale = model.scaleName(channel);

    if (model.mark === 'trail') {
      if (channel === 'color') {
        // trail is a filled mark, but its default symbolType ("stroke") should use "stroke"
        return {
          stroke: scale
        };
      } else if (channel === 'size') {
        return {
          strokeWidth: scale
        };
      }
    }

    if (channel === 'color') {
      return model.markDef.filled ? {
        fill: scale
      } : {
        stroke: scale
      };
    }

    return {
      [channel]: scale
    };
  } // eslint-disable-next-line @typescript-eslint/ban-types


  function isExplicit$1(value, property, legend, fieldDef) {
    switch (property) {
      case 'disable':
        return legend !== undefined;
      // if axis is specified or null/false, then its enable/disable state is explicit

      case 'values':
        // specified legend.values is already respected, but may get transformed.
        return !!(legend !== null && legend !== void 0 && legend.values);

      case 'title':
        // title can be explicit if fieldDef.title is set
        if (property === 'title' && value === (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.title)) {
          return true;
        }

    } // Otherwise, things are explicit if the returned value matches the specified property


    return value === (legend || {})[property];
  }

  function parseLegendForChannel(model, channel) {
    var _normalizeTimeUnit, _legend$encoding, _legend;

    let legend = model.legend(channel);
    const {
      markDef,
      encoding,
      config
    } = model;
    const legendConfig = config.legend;
    const legendCmpt = new LegendComponent({}, getLegendDefWithScale(model, channel));
    parseInteractiveLegend(model, channel, legendCmpt);
    const disable = legend !== undefined ? !legend : legendConfig.disable;
    legendCmpt.set('disable', disable, legend !== undefined);

    if (disable) {
      return legendCmpt;
    }

    legend = legend || {};
    const scaleType = model.getScaleComponent(channel).get('type');
    const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
    const timeUnit = isFieldDef(fieldOrDatumDef) ? (_normalizeTimeUnit = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit : undefined;
    const orient = legend.orient || config.legend.orient || 'right';
    const legendType = getLegendType({
      legend,
      channel,
      timeUnit,
      scaleType
    });
    const direction = getDirection({
      legend,
      legendType,
      orient,
      legendConfig
    });
    const ruleParams = {
      legend,
      channel,
      model,
      markDef,
      encoding,
      fieldOrDatumDef,
      legendConfig,
      config,
      scaleType,
      orient,
      legendType,
      direction
    };

    for (const property of LEGEND_COMPONENT_PROPERTIES) {
      if (legendType === 'gradient' && property.startsWith('symbol') || legendType === 'symbol' && property.startsWith('gradient')) {
        continue;
      }

      const value = property in legendRules ? legendRules[property](ruleParams) : legend[property];

      if (value !== undefined) {
        const explicit = isExplicit$1(value, property, legend, model.fieldDef(channel));

        if (explicit || config.legend[property] === undefined) {
          legendCmpt.set(property, value, explicit);
        }
      }
    }

    const legendEncoding = (_legend$encoding = (_legend = legend) === null || _legend === void 0 ? void 0 : _legend.encoding) !== null && _legend$encoding !== void 0 ? _legend$encoding : {};
    const selections = legendCmpt.get('selections');
    const legendEncode = {};
    const legendEncodeParams = {
      fieldOrDatumDef,
      model,
      channel,
      legendCmpt,
      legendType
    };

    for (const part of ['labels', 'legend', 'title', 'symbols', 'gradient', 'entries']) {
      var _legendEncoding$part;

      const legendEncodingPart = guideEncodeEntry((_legendEncoding$part = legendEncoding[part]) !== null && _legendEncoding$part !== void 0 ? _legendEncoding$part : {}, model);
      const value = part in legendEncodeRules ? legendEncodeRules[part](legendEncodingPart, legendEncodeParams) // apply rule
      : legendEncodingPart; // no rule -- just default values

      if (value !== undefined && !isEmpty(value)) {
        legendEncode[part] = { ...(selections !== null && selections !== void 0 && selections.length && isFieldDef(fieldOrDatumDef) ? {
            name: "".concat(varName(fieldOrDatumDef.field), "_legend_").concat(part)
          } : {}),
          ...(selections !== null && selections !== void 0 && selections.length ? {
            interactive: !!selections
          } : {}),
          update: value
        };
      }
    }

    if (!isEmpty(legendEncode)) {
      var _legend2;

      legendCmpt.set('encode', legendEncode, !!((_legend2 = legend) !== null && _legend2 !== void 0 && _legend2.encoding));
    }

    return legendCmpt;
  }

  function parseNonUnitLegend(model) {
    const {
      legends,
      resolve
    } = model.component;

    for (const child of model.children) {
      parseLegend(child);

      for (const channel of keys(child.component.legends)) {
        resolve.legend[channel] = parseGuideResolve(model.component.resolve, channel);

        if (resolve.legend[channel] === 'shared') {
          // If the resolve says shared (and has not been overridden)
          // We will try to merge and see if there is a conflict
          legends[channel] = mergeLegendComponent(legends[channel], child.component.legends[channel]);

          if (!legends[channel]) {
            // If merge returns nothing, there is a conflict so we cannot make the legend shared.
            // Thus, mark legend as independent and remove the legend component.
            resolve.legend[channel] = 'independent';
            delete legends[channel];
          }
        }
      }
    }

    for (const channel of keys(legends)) {
      for (const child of model.children) {
        if (!child.component.legends[channel]) {
          // skip if the child does not have a particular legend
          continue;
        }

        if (resolve.legend[channel] === 'shared') {
          // After merging shared legend, make sure to remove legend from child
          delete child.component.legends[channel];
        }
      }
    }

    return legends;
  }

  function mergeLegendComponent(mergedLegend, childLegend) {
    if (!mergedLegend) {
      return childLegend.clone();
    }

    const mergedOrient = mergedLegend.getWithExplicit('orient');
    const childOrient = childLegend.getWithExplicit('orient');

    if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
      // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
      // Cannot merge due to inconsistent orient
      return undefined;
    }

    let typeMerged = false; // Otherwise, let's merge

    for (const prop of LEGEND_COMPONENT_PROPERTIES) {
      const mergedValueWithExplicit = mergeValuesWithExplicit(mergedLegend.getWithExplicit(prop), childLegend.getWithExplicit(prop), prop, 'legend', // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case 'symbolType':
            return mergeSymbolType(v1, v2);

          case 'title':
            return mergeTitleComponent(v1, v2);

          case 'type':
            // There are only two types. If we have different types, then prefer symbol over gradient.
            typeMerged = true;
            return makeImplicit('symbol');
        }

        return defaultTieBreaker(v1, v2, prop, 'legend');
      });
      mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
    }

    if (typeMerged) {
      var _mergedLegend$implici, _mergedLegend$implici2, _mergedLegend$explici, _mergedLegend$explici2;

      if ((_mergedLegend$implici = mergedLegend.implicit) !== null && _mergedLegend$implici !== void 0 && (_mergedLegend$implici2 = _mergedLegend$implici.encode) !== null && _mergedLegend$implici2 !== void 0 && _mergedLegend$implici2.gradient) {
        deleteNestedProperty(mergedLegend.implicit, ['encode', 'gradient']);
      }

      if ((_mergedLegend$explici = mergedLegend.explicit) !== null && _mergedLegend$explici !== void 0 && (_mergedLegend$explici2 = _mergedLegend$explici.encode) !== null && _mergedLegend$explici2 !== void 0 && _mergedLegend$explici2.gradient) {
        deleteNestedProperty(mergedLegend.explicit, ['encode', 'gradient']);
      }
    }

    return mergedLegend;
  }

  function mergeSymbolType(st1, st2) {
    if (st2.value === 'circle') {
      // prefer "circle" over "stroke"
      return st2;
    }

    return st1;
  }

  function setLegendEncode(legend, part, vgProp, vgRef) {
    var _legend$encode, _legend$encode2, _legend$encode2$part, _legend$encode$part, _legend$encode$part$u;

    (_legend$encode = legend.encode) !== null && _legend$encode !== void 0 ? _legend$encode : legend.encode = {};
    (_legend$encode2$part = (_legend$encode2 = legend.encode)[part]) !== null && _legend$encode2$part !== void 0 ? _legend$encode2$part : _legend$encode2[part] = {};
    (_legend$encode$part$u = (_legend$encode$part = legend.encode[part]).update) !== null && _legend$encode$part$u !== void 0 ? _legend$encode$part$u : _legend$encode$part.update = {}; // TODO: remove as any after https://github.com/prisma/nexus-prisma/issues/291

    legend.encode[part].update[vgProp] = vgRef;
  }

  function assembleLegends(model) {
    const legendComponentIndex = model.component.legends;
    const legendByDomain = {};

    for (const channel of keys(legendComponentIndex)) {
      const scaleComponent = model.getScaleComponent(channel);
      const domainHash = stringify(scaleComponent.get('domains'));

      if (legendByDomain[domainHash]) {
        for (const mergedLegendComponent of legendByDomain[domainHash]) {
          const merged = mergeLegendComponent(mergedLegendComponent, legendComponentIndex[channel]);

          if (!merged) {
            // If cannot merge, need to add this legend separately
            legendByDomain[domainHash].push(legendComponentIndex[channel]);
          }
        }
      } else {
        legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
      }
    }

    const legends = vals(legendByDomain).flat().map(l => assembleLegend(l, model.config)).filter(l => l !== undefined);
    return legends;
  }
  function assembleLegend(legendCmpt, config) {
    var _legend$encode3;

    const {
      disable,
      labelExpr,
      selections,
      ...legend
    } = legendCmpt.combine();

    if (disable) {
      return undefined;
    }

    if (config.aria === false && legend.aria == undefined) {
      legend.aria = false;
    }

    if ((_legend$encode3 = legend.encode) !== null && _legend$encode3 !== void 0 && _legend$encode3.symbols) {
      const out = legend.encode.symbols.update;

      if (out.fill && out.fill['value'] !== 'transparent' && !out.stroke && !legend.stroke) {
        // For non color channel's legend, we need to override symbol stroke config from Vega config if stroke channel is not used.
        out.stroke = {
          value: 'transparent'
        };
      } // Remove properties that the legend is encoding.


      for (const property of LEGEND_SCALE_CHANNELS) {
        if (legend[property]) {
          delete out[property];
        }
      }
    }

    if (!legend.title) {
      // title schema doesn't include null, ''
      delete legend.title;
    }

    if (labelExpr !== undefined) {
      var _legend$encode4, _legend$encode4$label;

      let expr = labelExpr;

      if ((_legend$encode4 = legend.encode) !== null && _legend$encode4 !== void 0 && (_legend$encode4$label = _legend$encode4.labels) !== null && _legend$encode4$label !== void 0 && _legend$encode4$label.update && isSignalRef(legend.encode.labels.update.text)) {
        expr = replaceAll(labelExpr, 'datum.label', legend.encode.labels.update.text.signal);
      }

      setLegendEncode(legend, 'labels', 'text', {
        signal: expr
      });
    }

    return legend;
  }

  function assembleProjections(model) {
    if (isLayerModel(model) || isConcatModel(model)) {
      return assembleProjectionsForModelAndChildren(model);
    } else {
      return assembleProjectionForModel(model);
    }
  }
  function assembleProjectionsForModelAndChildren(model) {
    return model.children.reduce((projections, child) => {
      return projections.concat(child.assembleProjections());
    }, assembleProjectionForModel(model));
  }
  function assembleProjectionForModel(model) {
    const component = model.component.projection;

    if (!component || component.merged) {
      return [];
    }

    const projection = component.combine();
    const {
      name
    } = projection; // we need to extract name so that it is always present in the output and pass TS type validation

    if (!component.data) {
      // generate custom projection, no automatic fitting
      return [{
        name,
        // translate to center by default
        ...{
          translate: {
            signal: '[width / 2, height / 2]'
          }
        },
        // parameters, overwrite default translate if specified
        ...projection
      }];
    } else {
      // generate projection that uses extent fitting
      const size = {
        signal: "[".concat(component.size.map(ref => ref.signal).join(', '), "]")
      };
      const fits = component.data.reduce((sources, data) => {
        const source = isSignalRef(data) ? data.signal : "data('".concat(model.lookupDataSource(data), "')");

        if (!contains(sources, source)) {
          // build a unique list of sources
          sources.push(source);
        }

        return sources;
      }, []);

      if (fits.length <= 0) {
        throw new Error("Projection's fit didn't find any data sources");
      }

      return [{
        name,
        size,
        fit: {
          signal: fits.length > 1 ? "[".concat(fits.join(', '), "]") : fits[0]
        },
        ...projection
      }];
    }
  }

  /**
   * Any property of Projection can be in config
   */
  const PROJECTION_PROPERTIES = ['type', 'clipAngle', 'clipExtent', 'center', 'rotate', 'precision', 'reflectX', 'reflectY', 'coefficient', 'distance', 'fraction', 'lobes', 'parallel', 'radius', 'ratio', 'spacing', 'tilt'];

  class ProjectionComponent extends Split {
    constructor(name, specifiedProjection, size, data) {
      super({ ...specifiedProjection
      }, // all explicit properties of projection
      {
        name
      } // name as initial implicit property
      );
      this.specifiedProjection = specifiedProjection;
      this.size = size;
      this.data = data;

      _defineProperty(this, "merged", false);
    }
    /**
     * Whether the projection parameters should fit provided data.
     */


    get isFit() {
      return !!this.data;
    }

  }

  function parseProjection(model) {
    model.component.projection = isUnitModel(model) ? parseUnitProjection(model) : parseNonUnitProjections(model);
  }

  function parseUnitProjection(model) {
    if (model.hasProjection) {
      var _replaceExprRef;

      const proj = replaceExprRef(model.specifiedProjection);
      const fit = !(proj && (proj.scale != null || proj.translate != null));
      const size = fit ? [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')] : undefined;
      const data = fit ? gatherFitData(model) : undefined;
      const projComp = new ProjectionComponent(model.projectionName(true), { ...((_replaceExprRef = replaceExprRef(model.config.projection)) !== null && _replaceExprRef !== void 0 ? _replaceExprRef : {}),
        ...(proj !== null && proj !== void 0 ? proj : {})
      }, size, data);

      if (!projComp.get('type')) {
        projComp.set('type', 'equalEarth', false);
      }

      return projComp;
    }

    return undefined;
  }

  function gatherFitData(model) {
    const data = [];
    const {
      encoding
    } = model;

    for (const posssiblePair of [[LONGITUDE, LATITUDE], [LONGITUDE2, LATITUDE2]]) {
      if (getFieldOrDatumDef(encoding[posssiblePair[0]]) || getFieldOrDatumDef(encoding[posssiblePair[1]])) {
        data.push({
          signal: model.getName("geojson_".concat(data.length))
        });
      }
    }

    if (model.channelHasField(SHAPE) && model.typedFieldDef(SHAPE).type === GEOJSON) {
      data.push({
        signal: model.getName("geojson_".concat(data.length))
      });
    }

    if (data.length === 0) {
      // main source is geojson, so we can just use that
      data.push(model.requestDataName(DataSourceType.Main));
    }

    return data;
  }

  function mergeIfNoConflict(first, second) {
    const allPropertiesShared = every(PROJECTION_PROPERTIES, prop => {
      // neither has the property
      if (!vega.hasOwnProperty(first.explicit, prop) && !vega.hasOwnProperty(second.explicit, prop)) {
        return true;
      } // both have property and an equal value for property


      if (vega.hasOwnProperty(first.explicit, prop) && vega.hasOwnProperty(second.explicit, prop) && // some properties might be signals or objects and require hashing for comparison
      deepEqual(first.get(prop), second.get(prop))) {
        return true;
      }

      return false;
    });
    const size = deepEqual(first.size, second.size);

    if (size) {
      if (allPropertiesShared) {
        return first;
      } else if (deepEqual(first.explicit, {})) {
        return second;
      } else if (deepEqual(second.explicit, {})) {
        return first;
      }
    } // if all properties don't match, let each unit spec have its own projection


    return null;
  }

  function parseNonUnitProjections(model) {
    if (model.children.length === 0) {
      return undefined;
    }

    let nonUnitProjection; // parse all children first

    for (const child of model.children) {
      parseProjection(child);
    } // analyze parsed projections, attempt to merge


    const mergable = every(model.children, child => {
      const projection = child.component.projection;

      if (!projection) {
        // child layer does not use a projection
        return true;
      } else if (!nonUnitProjection) {
        // cached 'projection' is null, cache this one
        nonUnitProjection = projection;
        return true;
      } else {
        const merge = mergeIfNoConflict(nonUnitProjection, projection);

        if (merge) {
          nonUnitProjection = merge;
        }

        return !!merge;
      }
    }); // if cached one and all other children share the same projection,

    if (nonUnitProjection && mergable) {
      // so we can elevate it to the layer level
      const name = model.projectionName(true);
      const modelProjection = new ProjectionComponent(name, nonUnitProjection.specifiedProjection, nonUnitProjection.size, duplicate(nonUnitProjection.data)); // rename and assign all others as merged

      for (const child of model.children) {
        const projection = child.component.projection;

        if (projection) {
          if (projection.isFit) {
            modelProjection.data.push(...child.component.projection.data);
          }

          child.renameProjection(projection.get('name'), name);
          projection.merged = true;
        }
      }

      return modelProjection;
    }

    return undefined;
  }

  function rangeFormula(model, fieldDef, channel, config) {
    if (binRequiresRange(fieldDef, channel)) {
      var _ref, _model$axis;

      // read format from axis or legend, if there is no format then use config.numberFormat
      const guide = isUnitModel(model) ? (_ref = (_model$axis = model.axis(channel)) !== null && _model$axis !== void 0 ? _model$axis : model.legend(channel)) !== null && _ref !== void 0 ? _ref : {} : {};
      const startField = vgField(fieldDef, {
        expr: 'datum'
      });
      const endField = vgField(fieldDef, {
        expr: 'datum',
        binSuffix: 'end'
      });
      return {
        formulaAs: vgField(fieldDef, {
          binSuffix: 'range',
          forAs: true
        }),
        formula: binFormatExpression(startField, endField, guide.format, guide.formatType, config)
      };
    }

    return {};
  }

  function binKey(bin, field) {
    return "".concat(binToString(bin), "_").concat(field);
  }

  function getSignalsFromModel(model, key) {
    return {
      signal: model.getName("".concat(key, "_bins")),
      extentSignal: model.getName("".concat(key, "_extent"))
    };
  }

  function getBinSignalName(model, field, bin) {
    var _normalizeBin;

    const normalizedBin = (_normalizeBin = normalizeBin(bin, undefined)) !== null && _normalizeBin !== void 0 ? _normalizeBin : {};
    const key = binKey(normalizedBin, field);
    return model.getName("".concat(key, "_bins"));
  }

  function isBinTransform(t) {
    return 'as' in t;
  }

  function createBinComponent(t, bin, model) {
    let as;
    let span;

    if (isBinTransform(t)) {
      as = vega.isString(t.as) ? [t.as, "".concat(t.as, "_end")] : [t.as[0], t.as[1]];
    } else {
      as = [vgField(t, {
        forAs: true
      }), vgField(t, {
        binSuffix: 'end',
        forAs: true
      })];
    }

    const normalizedBin = { ...normalizeBin(bin, undefined)
    };
    const key = binKey(normalizedBin, t.field);
    const {
      signal,
      extentSignal
    } = getSignalsFromModel(model, key);

    if (isParameterExtent(normalizedBin.extent)) {
      const ext = normalizedBin.extent;
      span = parseSelectionExtent(model, ext.param, ext);
      delete normalizedBin.extent; // Vega-Lite selection extent map to Vega's span property.
    }

    const binComponent = {
      bin: normalizedBin,
      field: t.field,
      as: [as],
      ...(signal ? {
        signal
      } : {}),
      ...(extentSignal ? {
        extentSignal
      } : {}),
      ...(span ? {
        span
      } : {})
    };
    return {
      key,
      binComponent
    };
  }

  class BinNode extends DataFlowNode {
    clone() {
      return new BinNode(null, duplicate(this.bins));
    }

    constructor(parent, bins) {
      super(parent);
      this.bins = bins;
    }

    static makeFromEncoding(parent, model) {
      const bins = model.reduceFieldDef((binComponentIndex, fieldDef, channel) => {
        if (isTypedFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
          const {
            key,
            binComponent
          } = createBinComponent(fieldDef, fieldDef.bin, model);
          binComponentIndex[key] = { ...binComponent,
            ...binComponentIndex[key],
            ...rangeFormula(model, fieldDef, channel, model.config)
          };
        }

        return binComponentIndex;
      }, {});

      if (isEmpty(bins)) {
        return null;
      }

      return new BinNode(parent, bins);
    }
    /**
     * Creates a bin node from BinTransform.
     * The optional parameter should provide
     */


    static makeFromTransform(parent, t, model) {
      const {
        key,
        binComponent
      } = createBinComponent(t, t.bin, model);
      return new BinNode(parent, {
        [key]: binComponent
      });
    }
    /**
     * Merge bin nodes. This method either integrates the bin config from the other node
     * or if this node already has a bin config, renames the corresponding signal in the model.
     */


    merge(other, renameSignal) {
      for (const key of keys(other.bins)) {
        if (key in this.bins) {
          renameSignal(other.bins[key].signal, this.bins[key].signal); // Ensure that we don't have duplicate names for signal pairs

          this.bins[key].as = unique([...this.bins[key].as, ...other.bins[key].as], hash);
        } else {
          this.bins[key] = other.bins[key];
        }
      }

      for (const child of other.children) {
        other.removeChild(child);
        child.parent = this;
      }

      other.remove();
    }

    producedFields() {
      return new Set(vals(this.bins).map(c => c.as).flat(2));
    }

    dependentFields() {
      return new Set(vals(this.bins).map(c => c.field));
    }

    hash() {
      return "Bin ".concat(hash(this.bins));
    }

    assemble() {
      return vals(this.bins).flatMap(bin => {
        const transform = [];
        const [binAs, ...remainingAs] = bin.as;
        const {
          extent,
          ...params
        } = bin.bin;
        const binTrans = {
          type: 'bin',
          field: replacePathInField(bin.field),
          as: binAs,
          signal: bin.signal,
          ...(!isParameterExtent(extent) ? {
            extent
          } : {
            extent: null
          }),
          ...(bin.span ? {
            span: {
              signal: "span(".concat(bin.span, ")")
            }
          } : {}),
          ...params
        };

        if (!extent && bin.extentSignal) {
          transform.push({
            type: 'extent',
            field: replacePathInField(bin.field),
            signal: bin.extentSignal
          });
          binTrans.extent = {
            signal: bin.extentSignal
          };
        }

        transform.push(binTrans);

        for (const as of remainingAs) {
          for (let i = 0; i < 2; i++) {
            transform.push({
              type: 'formula',
              expr: vgField({
                field: binAs[i]
              }, {
                expr: 'datum'
              }),
              as: as[i]
            });
          }
        }

        if (bin.formula) {
          transform.push({
            type: 'formula',
            expr: bin.formula,
            as: bin.formulaAs
          });
        }

        return transform;
      });
    }

  }

  function addDimension(dims, channel, fieldDef, model) {
    var _fieldDef$scale;

    const channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined;

    if (isTypedFieldDef(fieldDef) && isUnitModel(model) && hasBandEnd(fieldDef, channelDef2, model.markDef, model.config)) {
      dims.add(vgField(fieldDef, {}));
      dims.add(vgField(fieldDef, {
        suffix: 'end'
      }));

      if (fieldDef.bin && binRequiresRange(fieldDef, channel)) {
        dims.add(vgField(fieldDef, {
          binSuffix: 'range'
        }));
      }
    } else if (isGeoPositionChannel(channel)) {
      const posChannel = getPositionChannelFromLatLong(channel);
      dims.add(model.getName(posChannel));
    } else {
      dims.add(vgField(fieldDef));
    }

    if (isScaleFieldDef(fieldDef) && isFieldRange((_fieldDef$scale = fieldDef.scale) === null || _fieldDef$scale === void 0 ? void 0 : _fieldDef$scale.range)) {
      dims.add(fieldDef.scale.range.field);
    }

    return dims;
  }

  function mergeMeasures(parentMeasures, childMeasures) {
    for (const field of keys(childMeasures)) {
      // when we merge a measure, we either have to add an aggregation operator or even a new field
      const ops = childMeasures[field];

      for (const op of keys(ops)) {
        if (field in parentMeasures) {
          var _parentMeasures$field;

          // add operator to existing measure field
          parentMeasures[field][op] = new Set([...((_parentMeasures$field = parentMeasures[field][op]) !== null && _parentMeasures$field !== void 0 ? _parentMeasures$field : []), ...ops[op]]);
        } else {
          parentMeasures[field] = {
            [op]: ops[op]
          };
        }
      }
    }
  }

  class AggregateNode extends DataFlowNode {
    clone() {
      return new AggregateNode(null, new Set(this.dimensions), duplicate(this.measures));
    }
    /**
     * @param dimensions string set for dimensions
     * @param measures dictionary mapping field name => dict of aggregation functions and names to use
     */


    constructor(parent, dimensions, measures) {
      super(parent);
      this.dimensions = dimensions;
      this.measures = measures;
    }

    get groupBy() {
      return this.dimensions;
    }

    static makeFromEncoding(parent, model) {
      let isAggregate = false;
      model.forEachFieldDef(fd => {
        if (fd.aggregate) {
          isAggregate = true;
        }
      });
      const meas = {};
      const dims = new Set();

      if (!isAggregate) {
        // no need to create this node if the model has no aggregation
        return null;
      }

      model.forEachFieldDef((fieldDef, channel) => {
        const {
          aggregate,
          field
        } = fieldDef;

        if (aggregate) {
          if (aggregate === 'count') {
            var _, _meas$_;

            (_meas$_ = meas[_ = '*']) !== null && _meas$_ !== void 0 ? _meas$_ : meas[_] = {};
            meas['*']['count'] = new Set([vgField(fieldDef, {
              forAs: true
            })]);
          } else {
            if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
              var _meas$argField;

              const op = isArgminDef(aggregate) ? 'argmin' : 'argmax';
              const argField = aggregate[op];
              (_meas$argField = meas[argField]) !== null && _meas$argField !== void 0 ? _meas$argField : meas[argField] = {};
              meas[argField][op] = new Set([vgField({
                op,
                field: argField
              }, {
                forAs: true
              })]);
            } else {
              var _meas$field;

              (_meas$field = meas[field]) !== null && _meas$field !== void 0 ? _meas$field : meas[field] = {};
              meas[field][aggregate] = new Set([vgField(fieldDef, {
                forAs: true
              })]);
            } // For scale channel with domain === 'unaggregated', add min/max so we can use their union as unaggregated domain


            if (isScaleChannel(channel) && model.scaleDomain(channel) === 'unaggregated') {
              var _meas$field2;

              (_meas$field2 = meas[field]) !== null && _meas$field2 !== void 0 ? _meas$field2 : meas[field] = {};
              meas[field]['min'] = new Set([vgField({
                field,
                aggregate: 'min'
              }, {
                forAs: true
              })]);
              meas[field]['max'] = new Set([vgField({
                field,
                aggregate: 'max'
              }, {
                forAs: true
              })]);
            }
          }
        } else {
          addDimension(dims, channel, fieldDef, model);
        }
      });

      if (dims.size + keys(meas).length === 0) {
        return null;
      }

      return new AggregateNode(parent, dims, meas);
    }

    static makeFromTransform(parent, t) {
      const dims = new Set();
      const meas = {};

      for (const s of t.aggregate) {
        const {
          op,
          field,
          as
        } = s;

        if (op) {
          if (op === 'count') {
            var _2, _meas$_2;

            (_meas$_2 = meas[_2 = '*']) !== null && _meas$_2 !== void 0 ? _meas$_2 : meas[_2] = {};
            meas['*']['count'] = new Set([as ? as : vgField(s, {
              forAs: true
            })]);
          } else {
            var _meas$field3;

            (_meas$field3 = meas[field]) !== null && _meas$field3 !== void 0 ? _meas$field3 : meas[field] = {};
            meas[field][op] = new Set([as ? as : vgField(s, {
              forAs: true
            })]);
          }
        }
      }

      for (const s of (_t$groupby = t.groupby) !== null && _t$groupby !== void 0 ? _t$groupby : []) {
        var _t$groupby;

        dims.add(s);
      }

      if (dims.size + keys(meas).length === 0) {
        return null;
      }

      return new AggregateNode(parent, dims, meas);
    }

    merge(other) {
      if (setEqual(this.dimensions, other.dimensions)) {
        mergeMeasures(this.measures, other.measures);
        return true;
      }

      debug('different dimensions, cannot merge');
      return false;
    }

    addDimensions(fields) {
      fields.forEach(this.dimensions.add, this.dimensions);
    }

    dependentFields() {
      return new Set([...this.dimensions, ...keys(this.measures)]);
    }

    producedFields() {
      const out = new Set();

      for (const field of keys(this.measures)) {
        for (const op of keys(this.measures[field])) {
          const m = this.measures[field][op];

          if (m.size === 0) {
            out.add("".concat(op, "_").concat(field));
          } else {
            m.forEach(out.add, out);
          }
        }
      }

      return out;
    }

    hash() {
      return "Aggregate ".concat(hash({
        dimensions: this.dimensions,
        measures: this.measures
      }));
    }

    assemble() {
      const ops = [];
      const fields = [];
      const as = [];

      for (const field of keys(this.measures)) {
        for (const op of keys(this.measures[field])) {
          for (const alias of this.measures[field][op]) {
            as.push(alias);
            ops.push(op);
            fields.push(field === '*' ? null : replacePathInField(field));
          }
        }
      }

      const result = {
        type: 'aggregate',
        groupby: [...this.dimensions].map(replacePathInField),
        ops,
        fields,
        as
      };
      return result;
    }

  }

  /**
   * A node that helps us track what fields we are faceting by.
   */
  class FacetNode extends DataFlowNode {
    /**
     * @param model The facet model.
     * @param name The name that this facet source will have.
     * @param data The source data for this facet data.
     */
    constructor(parent, model, name, data) {
      super(parent);
      this.model = model;
      this.name = name;
      this.data = data;

      _defineProperty(this, "column", void 0);

      _defineProperty(this, "row", void 0);

      _defineProperty(this, "facet", void 0);

      _defineProperty(this, "childModel", void 0);

      for (const channel of FACET_CHANNELS) {
        const fieldDef = model.facet[channel];

        if (fieldDef) {
          const {
            bin,
            sort
          } = fieldDef;
          this[channel] = {
            name: model.getName("".concat(channel, "_domain")),
            fields: [vgField(fieldDef), ...(isBinning(bin) ? [vgField(fieldDef, {
              binSuffix: 'end'
            })] : [])],
            ...(isSortField(sort) ? {
              sortField: sort
            } : vega.isArray(sort) ? {
              sortIndexField: sortArrayIndexField(fieldDef, channel)
            } : {})
          };
        }
      }

      this.childModel = model.child;
    }

    hash() {
      let out = "Facet";

      for (const channel of FACET_CHANNELS) {
        if (this[channel]) {
          out += " ".concat(channel.charAt(0), ":").concat(hash(this[channel]));
        }
      }

      return out;
    }

    get fields() {
      const f = [];

      for (const channel of FACET_CHANNELS) {
        var _this$channel;

        if ((_this$channel = this[channel]) !== null && _this$channel !== void 0 && _this$channel.fields) {
          f.push(...this[channel].fields);
        }
      }

      return f;
    }

    dependentFields() {
      const depFields = new Set(this.fields);

      for (const channel of FACET_CHANNELS) {
        if (this[channel]) {
          if (this[channel].sortField) {
            depFields.add(this[channel].sortField.field);
          }

          if (this[channel].sortIndexField) {
            depFields.add(this[channel].sortIndexField);
          }
        }
      }

      return depFields;
    }

    producedFields() {
      return new Set(); // facet does not produce any new fields
    }
    /**
     * The name to reference this source is its name.
     */


    getSource() {
      return this.name;
    }

    getChildIndependentFieldsWithStep() {
      const childIndependentFieldsWithStep = {};

      for (const channel of POSITION_SCALE_CHANNELS) {
        const childScaleComponent = this.childModel.component.scales[channel];

        if (childScaleComponent && !childScaleComponent.merged) {
          // independent scale
          const type = childScaleComponent.get('type');
          const range = childScaleComponent.get('range');

          if (hasDiscreteDomain(type) && isVgRangeStep(range)) {
            const domain = assembleDomain(this.childModel, channel);
            const field = getFieldFromDomain(domain);

            if (field) {
              childIndependentFieldsWithStep[channel] = field;
            } else {
              warn(unknownField(channel));
            }
          }
        }
      }

      return childIndependentFieldsWithStep;
    }

    assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep) {
      const childChannel = {
        row: 'y',
        column: 'x',
        facet: undefined
      }[channel];
      const fields = [];
      const ops = [];
      const as = [];

      if (childChannel && childIndependentFieldsWithStep && childIndependentFieldsWithStep[childChannel]) {
        if (crossedDataName) {
          // If there is a crossed data, calculate max
          fields.push("distinct_".concat(childIndependentFieldsWithStep[childChannel]));
          ops.push('max');
        } else {
          // If there is no crossed data, just calculate distinct
          fields.push(childIndependentFieldsWithStep[childChannel]);
          ops.push('distinct');
        } // Although it is technically a max, just name it distinct so it's easier to refer to it


        as.push("distinct_".concat(childIndependentFieldsWithStep[childChannel]));
      }

      const {
        sortField,
        sortIndexField
      } = this[channel];

      if (sortField) {
        const {
          op = DEFAULT_SORT_OP,
          field
        } = sortField;
        fields.push(field);
        ops.push(op);
        as.push(vgField(sortField, {
          forAs: true
        }));
      } else if (sortIndexField) {
        fields.push(sortIndexField);
        ops.push('max');
        as.push(sortIndexField);
      }

      return {
        name: this[channel].name,
        // Use data from the crossed one if it exist
        source: crossedDataName !== null && crossedDataName !== void 0 ? crossedDataName : this.data,
        transform: [{
          type: 'aggregate',
          groupby: this[channel].fields,
          ...(fields.length ? {
            fields,
            ops,
            as
          } : {})
        }]
      };
    }

    assembleFacetHeaderData(childIndependentFieldsWithStep) {
      const {
        columns
      } = this.model.layout;
      const {
        layoutHeaders
      } = this.model.component;
      const data = [];
      const hasSharedAxis = {};

      for (const headerChannel of HEADER_CHANNELS) {
        for (const headerType of HEADER_TYPES) {
          var _ref;

          const headers = (_ref = layoutHeaders[headerChannel] && layoutHeaders[headerChannel][headerType]) !== null && _ref !== void 0 ? _ref : [];

          for (const header of headers) {
            var _header$axes;

            if (((_header$axes = header.axes) === null || _header$axes === void 0 ? void 0 : _header$axes.length) > 0) {
              hasSharedAxis[headerChannel] = true;
              break;
            }
          }
        }

        if (hasSharedAxis[headerChannel]) {
          const cardinality = "length(data(\"".concat(this.facet.name, "\"))");
          const stop = headerChannel === 'row' ? columns ? {
            signal: "ceil(".concat(cardinality, " / ").concat(columns, ")")
          } : 1 : columns ? {
            signal: "min(".concat(cardinality, ", ").concat(columns, ")")
          } : {
            signal: cardinality
          };
          data.push({
            name: "".concat(this.facet.name, "_").concat(headerChannel),
            transform: [{
              type: 'sequence',
              start: 0,
              stop
            }]
          });
        }
      }

      const {
        row,
        column
      } = hasSharedAxis;

      if (row || column) {
        data.unshift(this.assembleRowColumnHeaderData('facet', null, childIndependentFieldsWithStep));
      }

      return data;
    }

    assemble() {
      const data = [];
      let crossedDataName = null;
      const childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep();
      const {
        column,
        row,
        facet
      } = this;

      if (column && row && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
        var _childIndependentFiel, _childIndependentFiel2;

        // Need to create a cross dataset to correctly calculate cardinality
        crossedDataName = "cross_".concat(this.column.name, "_").concat(this.row.name);
        const fields = [].concat((_childIndependentFiel = childIndependentFieldsWithStep.x) !== null && _childIndependentFiel !== void 0 ? _childIndependentFiel : [], (_childIndependentFiel2 = childIndependentFieldsWithStep.y) !== null && _childIndependentFiel2 !== void 0 ? _childIndependentFiel2 : []);
        const ops = fields.map(() => 'distinct');
        data.push({
          name: crossedDataName,
          source: this.data,
          transform: [{
            type: 'aggregate',
            groupby: this.fields,
            fields,
            ops
          }]
        });
      }

      for (const channel of [COLUMN, ROW]) {
        if (this[channel]) {
          data.push(this.assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep));
        }
      }

      if (facet) {
        const facetData = this.assembleFacetHeaderData(childIndependentFieldsWithStep);

        if (facetData) {
          data.push(...facetData);
        }
      }

      return data;
    }

  }

  /**
   * Remove quotes from a string.
   */

  function unquote(pattern) {
    if (pattern.startsWith("'") && pattern.endsWith("'") || pattern.startsWith('"') && pattern.endsWith('"')) {
      return pattern.slice(1, -1);
    }

    return pattern;
  }
  /**
   * @param field The field.
   * @param parse What to parse the field as.
   */


  function parseExpression(field, parse) {
    const f = accessPathWithDatum(field);

    if (parse === 'number') {
      return "toNumber(".concat(f, ")");
    } else if (parse === 'boolean') {
      return "toBoolean(".concat(f, ")");
    } else if (parse === 'string') {
      return "toString(".concat(f, ")");
    } else if (parse === 'date') {
      return "toDate(".concat(f, ")");
    } else if (parse === 'flatten') {
      return f;
    } else if (parse.startsWith('date:')) {
      const specifier = unquote(parse.slice(5, parse.length));
      return "timeParse(".concat(f, ",'").concat(specifier, "')");
    } else if (parse.startsWith('utc:')) {
      const specifier = unquote(parse.slice(4, parse.length));
      return "utcParse(".concat(f, ",'").concat(specifier, "')");
    } else {
      warn(unrecognizedParse(parse));
      return null;
    }
  }

  function getImplicitFromFilterTransform(transform) {
    const implicit = {};
    forEachLeaf(transform.filter, filter => {
      if (isFieldPredicate(filter)) {
        // Automatically add a parse node for filters with filter objects
        let val = null; // For EqualFilter, just use the equal property.
        // For RangeFilter and OneOfFilter, all array members should have
        // the same type, so we only use the first one.

        if (isFieldEqualPredicate(filter)) {
          val = signalRefOrValue(filter.equal);
        } else if (isFieldLTEPredicate(filter)) {
          val = signalRefOrValue(filter.lte);
        } else if (isFieldLTPredicate(filter)) {
          val = signalRefOrValue(filter.lt);
        } else if (isFieldGTPredicate(filter)) {
          val = signalRefOrValue(filter.gt);
        } else if (isFieldGTEPredicate(filter)) {
          val = signalRefOrValue(filter.gte);
        } else if (isFieldRangePredicate(filter)) {
          val = filter.range[0];
        } else if (isFieldOneOfPredicate(filter)) {
          var _filter$oneOf;

          val = ((_filter$oneOf = filter.oneOf) !== null && _filter$oneOf !== void 0 ? _filter$oneOf : filter['in'])[0];
        } // else -- for filter expression, we can't infer anything


        if (val) {
          if (isDateTime(val)) {
            implicit[filter.field] = 'date';
          } else if (vega.isNumber(val)) {
            implicit[filter.field] = 'number';
          } else if (vega.isString(val)) {
            implicit[filter.field] = 'string';
          }
        }

        if (filter.timeUnit) {
          implicit[filter.field] = 'date';
        }
      }
    });
    return implicit;
  }
  /**
   * Creates a parse node for implicit parsing from a model and updates ancestorParse.
   */

  function getImplicitFromEncoding(model) {
    const implicit = {};

    function add(fieldDef) {
      if (isFieldOrDatumDefForTimeFormat(fieldDef)) {
        implicit[fieldDef.field] = 'date';
      } else if (fieldDef.type === 'quantitative' && isMinMaxOp(fieldDef.aggregate) // we need to parse numbers to support correct min and max
      ) {
        implicit[fieldDef.field] = 'number';
      } else if (accessPathDepth(fieldDef.field) > 1) {
        // For non-date/non-number (strings and booleans), derive a flattened field for a referenced nested field.
        // (Parsing numbers / dates already flattens numeric and temporal fields.)
        if (!(fieldDef.field in implicit)) {
          implicit[fieldDef.field] = 'flatten';
        }
      } else if (isScaleFieldDef(fieldDef) && isSortField(fieldDef.sort) && accessPathDepth(fieldDef.sort.field) > 1) {
        // Flatten fields that we sort by but that are not otherwise flattened.
        if (!(fieldDef.sort.field in implicit)) {
          implicit[fieldDef.sort.field] = 'flatten';
        }
      }
    }

    if (isUnitModel(model) || isFacetModel(model)) {
      // Parse encoded fields
      model.forEachFieldDef((fieldDef, channel) => {
        if (isTypedFieldDef(fieldDef)) {
          add(fieldDef);
        } else {
          const mainChannel = getMainRangeChannel(channel);
          const mainFieldDef = model.fieldDef(mainChannel);
          add({ ...fieldDef,
            type: mainFieldDef.type
          });
        }
      });
    } // Parse quantitative dimension fields of path marks as numbers so that we sort them correctly.


    if (isUnitModel(model)) {
      const {
        mark,
        markDef,
        encoding
      } = model;

      if (isPathMark(mark) && // No need to sort by dimension if we have a connected scatterplot (order channel is present)
      !model.encoding.order) {
        const dimensionChannel = markDef.orient === 'horizontal' ? 'y' : 'x';
        const dimensionChannelDef = encoding[dimensionChannel];

        if (isFieldDef(dimensionChannelDef) && dimensionChannelDef.type === 'quantitative' && !(dimensionChannelDef.field in implicit)) {
          implicit[dimensionChannelDef.field] = 'number';
        }
      }
    }

    return implicit;
  }
  /**
   * Creates a parse node for implicit parsing from a model and updates ancestorParse.
   */

  function getImplicitFromSelection(model) {
    const implicit = {};

    if (isUnitModel(model) && model.component.selection) {
      for (const name of keys(model.component.selection)) {
        const selCmpt = model.component.selection[name];

        for (const proj of selCmpt.project.items) {
          if (!proj.channel && accessPathDepth(proj.field) > 1) {
            implicit[proj.field] = 'flatten';
          }
        }
      }
    }

    return implicit;
  }
  class ParseNode extends DataFlowNode {
    clone() {
      return new ParseNode(null, duplicate(this._parse));
    }

    constructor(parent, parse) {
      super(parent);

      _defineProperty(this, "_parse", void 0);

      this._parse = parse;
    }

    hash() {
      return "Parse ".concat(hash(this._parse));
    }
    /**
     * Creates a parse node from a data.format.parse and updates ancestorParse.
     */


    static makeExplicit(parent, model, ancestorParse) {
      var _data$format;

      // Custom parse
      let explicit = {};
      const data = model.data;

      if (!isGenerator(data) && data !== null && data !== void 0 && (_data$format = data.format) !== null && _data$format !== void 0 && _data$format.parse) {
        explicit = data.format.parse;
      }

      return this.makeWithAncestors(parent, explicit, {}, ancestorParse);
    }
    /**
     * Creates a parse node from "explicit" parse and "implicit" parse and updates ancestorParse.
     */


    static makeWithAncestors(parent, explicit, implicit, ancestorParse) {
      // We should not parse what has already been parsed in a parent (explicitly or implicitly) or what has been derived (maked as "derived"). We also don't need to flatten a field that has already been parsed.
      for (const field of keys(implicit)) {
        const parsedAs = ancestorParse.getWithExplicit(field);

        if (parsedAs.value !== undefined) {
          // We always ignore derived fields even if they are implicitly defined because we expect users to create the right types.
          if (parsedAs.explicit || parsedAs.value === implicit[field] || parsedAs.value === 'derived' || implicit[field] === 'flatten') {
            delete implicit[field];
          } else {
            warn(differentParse(field, implicit[field], parsedAs.value));
          }
        }
      }

      for (const field of keys(explicit)) {
        const parsedAs = ancestorParse.get(field);

        if (parsedAs !== undefined) {
          // Don't parse a field again if it has been parsed with the same type already.
          if (parsedAs === explicit[field]) {
            delete explicit[field];
          } else {
            warn(differentParse(field, explicit[field], parsedAs));
          }
        }
      }

      const parse = new Split(explicit, implicit); // add the format parse from this model so that children don't parse the same field again

      ancestorParse.copyAll(parse); // copy only non-null parses

      const p = {};

      for (const key of keys(parse.combine())) {
        const val = parse.get(key);

        if (val !== null) {
          p[key] = val;
        }
      }

      if (keys(p).length === 0 || ancestorParse.parseNothing) {
        return null;
      }

      return new ParseNode(parent, p);
    }

    get parse() {
      return this._parse;
    }

    merge(other) {
      this._parse = { ...this._parse,
        ...other.parse
      };
      other.remove();
    }
    /**
     * Assemble an object for Vega's format.parse property.
     */


    assembleFormatParse() {
      const formatParse = {};

      for (const field of keys(this._parse)) {
        const p = this._parse[field];

        if (accessPathDepth(field) === 1) {
          formatParse[field] = p;
        }
      }

      return formatParse;
    } // format parse depends and produces all fields in its parse


    producedFields() {
      return new Set(keys(this._parse));
    }

    dependentFields() {
      return new Set(keys(this._parse));
    }

    assembleTransforms() {
      let onlyNested = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return keys(this._parse).filter(field => onlyNested ? accessPathDepth(field) > 1 : true).map(field => {
        const expr = parseExpression(field, this._parse[field]);

        if (!expr) {
          return null;
        }

        const formula = {
          type: 'formula',
          expr,
          as: removePathFromField(field) // Vega output is always flattened

        };
        return formula;
      }).filter(t => t !== null);
    }

  }

  class IdentifierNode extends DataFlowNode {
    clone() {
      return new IdentifierNode(null);
    }

    constructor(parent) {
      super(parent);
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      return new Set([SELECTION_ID]);
    }

    hash() {
      return 'Identifier';
    }

    assemble() {
      return {
        type: 'identifier',
        as: SELECTION_ID
      };
    }

  }

  class GraticuleNode extends DataFlowNode {
    clone() {
      return new GraticuleNode(null, this.params);
    }

    constructor(parent, params) {
      super(parent);
      this.params = params;
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      return undefined; // there should never be a node before graticule
    }

    hash() {
      return "Graticule ".concat(hash(this.params));
    }

    assemble() {
      return {
        type: 'graticule',
        ...(this.params === true ? {} : this.params)
      };
    }

  }

  class SequenceNode extends DataFlowNode {
    clone() {
      return new SequenceNode(null, this.params);
    }

    constructor(parent, params) {
      super(parent);
      this.params = params;
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      var _this$params$as;

      return new Set([(_this$params$as = this.params.as) !== null && _this$params$as !== void 0 ? _this$params$as : 'data']);
    }

    hash() {
      return "Hash ".concat(hash(this.params));
    }

    assemble() {
      return {
        type: 'sequence',
        ...this.params
      };
    }

  }

  class SourceNode extends DataFlowNode {
    constructor(data) {
      var _data;

      super(null); // source cannot have parent

      _defineProperty(this, "_data", void 0);

      _defineProperty(this, "_name", void 0);

      _defineProperty(this, "_generator", void 0);

      (_data = data) !== null && _data !== void 0 ? _data : data = {
        name: 'source'
      };
      let format;

      if (!isGenerator(data)) {
        format = data.format ? { ...omit(data.format, ['parse'])
        } : {};
      }

      if (isInlineData(data)) {
        this._data = {
          values: data.values
        };
      } else if (isUrlData(data)) {
        this._data = {
          url: data.url
        };

        if (!format.type) {
          // Extract extension from URL using snippet from
          // http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
          let defaultExtension = /(?:\.([^.]+))?$/.exec(data.url)[1];

          if (!contains(['json', 'csv', 'tsv', 'dsv', 'topojson'], defaultExtension)) {
            defaultExtension = 'json';
          } // defaultExtension has type string but we ensure that it is DataFormatType above


          format.type = defaultExtension;
        }
      } else if (isSphereGenerator(data)) {
        // hardwire GeoJSON sphere data into output specification
        this._data = {
          values: [{
            type: 'Sphere'
          }]
        };
      } else if (isNamedData(data) || isGenerator(data)) {
        this._data = {};
      } // set flag to check if generator


      this._generator = isGenerator(data); // any dataset can be named

      if (data.name) {
        this._name = data.name;
      }

      if (format && !isEmpty(format)) {
        this._data.format = format;
      }
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      return undefined; // we don't know what this source produces
    }

    get data() {
      return this._data;
    }

    hasName() {
      return !!this._name;
    }

    get isGenerator() {
      return this._generator;
    }

    get dataName() {
      return this._name;
    }

    set dataName(name) {
      this._name = name;
    }

    set parent(parent) {
      throw new Error('Source nodes have to be roots.');
    }

    remove() {
      throw new Error('Source nodes are roots and cannot be removed.');
    }

    hash() {
      throw new Error('Cannot hash sources');
    }

    assemble() {
      return {
        name: this._name,
        ...this._data,
        transform: []
      };
    }

  }

  /**
   * Whether this dataflow node is the source of the dataflow that produces data i.e. a source or a generator.
   */

  function isDataSourceNode(node) {
    return node instanceof SourceNode || node instanceof GraticuleNode || node instanceof SequenceNode;
  }
  /**
   * Abstract base class for Dataflow optimizers.
   * Contains only mutation handling logic. Subclasses need to implement iteration logic.
   */

  var _modified = /*#__PURE__*/new WeakMap();

  class Optimizer {
    constructor() {
      _classPrivateFieldInitSpec(this, _modified, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldSet(this, _modified, false);
    } // Once true, #modified is never set to false


    setModified() {
      _classPrivateFieldSet(this, _modified, true);
    }

    get modifiedFlag() {
      return _classPrivateFieldGet(this, _modified);
    }
    /**
     * Run the optimization for the tree with the provided root.
     */


  }
  /**
   * Starts from a node and runs the optimization function (the "run" method) upwards to the root,
   * depending on the continue and modified flag values returned by the optimization function.
   */

  class BottomUpOptimizer extends Optimizer {
    /**
     * Run the optimizer at the node. This method should not change the parent of the passed in node (it should only affect children).
     */

    /**
     * Compute a map of node depths that we can use to determine a topological sort order.
     */
    getNodeDepths(node, depth, depths) {
      depths.set(node, depth);

      for (const child of node.children) {
        this.getNodeDepths(child, depth + 1, depths);
      }

      return depths;
    }
    /**
     * Run the optimizer on all nodes starting from the leaves.
     */


    optimize(node) {
      const depths = this.getNodeDepths(node, 0, new Map());
      const topologicalSort = [...depths.entries()].sort((a, b) => b[1] - a[1]);

      for (const tuple of topologicalSort) {
        this.run(tuple[0]);
      }

      return this.modifiedFlag;
    }

  }
  /**
   * The optimizer function (the "run" method), is invoked on the given node and then continues recursively.
   */

  class TopDownOptimizer extends Optimizer {
    /**
     * Run the optimizer at the node.
     */

    /**
     * Run the optimizer depth first on all nodes starting from the roots.
     */
    optimize(node) {
      this.run(node);

      for (const child of node.children) {
        this.optimize(child);
      }

      return this.modifiedFlag;
    }

  }

  /**
   * Merge identical nodes at forks by comparing hashes.
   *
   * Does not need to iterate from leaves so we implement this with recursion as it's a bit simpler.
   */

  class MergeIdenticalNodes extends TopDownOptimizer {
    mergeNodes(parent, nodes) {
      const mergedNode = nodes.shift();

      for (const node of nodes) {
        parent.removeChild(node);
        node.parent = mergedNode;
        node.remove();
      }
    }

    run(node) {
      const hashes = node.children.map(x => x.hash());
      const buckets = {};

      for (let i = 0; i < hashes.length; i++) {
        if (buckets[hashes[i]] === undefined) {
          buckets[hashes[i]] = [node.children[i]];
        } else {
          buckets[hashes[i]].push(node.children[i]);
        }
      }

      for (const k of keys(buckets)) {
        if (buckets[k].length > 1) {
          this.setModified();
          this.mergeNodes(node, buckets[k]);
        }
      }
    }

  }
  /**
   * Optimizer that removes identifier nodes that are not needed for selections.
   */

  class RemoveUnnecessaryIdentifierNodes extends TopDownOptimizer {
    constructor(model) {
      super();

      _defineProperty(this, "requiresSelectionId", void 0);

      this.requiresSelectionId = model && requiresSelectionId(model);
    }

    run(node) {
      if (node instanceof IdentifierNode) {
        // Only preserve IdentifierNodes if we have default discrete selections
        // in our model tree, and if the nodes come after tuple producing nodes.
        if (!(this.requiresSelectionId && (isDataSourceNode(node.parent) || node.parent instanceof AggregateNode || node.parent instanceof ParseNode))) {
          this.setModified();
          node.remove();
        }
      }
    }

  }
  /**
   * Removes duplicate time unit nodes (as determined by the name of the output field) that may be generated due to
   * selections projected over time units. Only keeps the first time unit in any branch.
   *
   * This optimizer is a custom top down optimizer that keep track of produced fields in a branch.
   */

  class RemoveDuplicateTimeUnits extends Optimizer {
    optimize(node) {
      this.run(node, new Set());
      return this.modifiedFlag;
    }

    run(node, timeUnitFields) {
      let producedFields = new Set();

      if (node instanceof TimeUnitNode) {
        producedFields = node.producedFields();

        if (hasIntersection(producedFields, timeUnitFields)) {
          this.setModified();
          node.removeFormulas(timeUnitFields);

          if (node.producedFields.length === 0) {
            node.remove();
          }
        }
      }

      for (const child of node.children) {
        this.run(child, new Set([...timeUnitFields, ...producedFields]));
      }
    }

  }
  /**
   * Remove output nodes that are not required.
   */

  class RemoveUnnecessaryOutputNodes extends TopDownOptimizer {
    constructor() {
      super();
    }

    run(node) {
      if (node instanceof OutputNode && !node.isRequired()) {
        this.setModified();
        node.remove();
      }
    }

  }
  /**
   * Move parse nodes up to forks and merges them if possible.
   */

  class MoveParseUp extends BottomUpOptimizer {
    run(node) {
      if (isDataSourceNode(node)) {
        return;
      }

      if (node.numChildren() > 1) {
        // Don't move parse further up but continue with parent.
        return;
      }

      for (const child of node.children) {
        if (child instanceof ParseNode) {
          if (node instanceof ParseNode) {
            this.setModified();
            node.merge(child);
          } else {
            // Don't swap with nodes that produce something that the parse node depends on (e.g. lookup).
            if (fieldIntersection(node.producedFields(), child.dependentFields())) {
              continue;
            }

            this.setModified();
            child.swapWithParent();
          }
        }
      }

      return;
    }

  }
  /**
   * Inserts an intermediate ParseNode containing all non-conflicting parse fields and removes the empty ParseNodes.
   *
   * We assume that dependent paths that do not have a parse node can be just merged.
   */

  class MergeParse extends BottomUpOptimizer {
    run(node) {
      const originalChildren = [...node.children];
      const parseChildren = node.children.filter(child => child instanceof ParseNode);

      if (node.numChildren() > 1 && parseChildren.length >= 1) {
        const commonParse = {};
        const conflictingParse = new Set();

        for (const parseNode of parseChildren) {
          const parse = parseNode.parse;

          for (const k of keys(parse)) {
            if (!(k in commonParse)) {
              commonParse[k] = parse[k];
            } else if (commonParse[k] !== parse[k]) {
              conflictingParse.add(k);
            }
          }
        }

        for (const field of conflictingParse) {
          delete commonParse[field];
        }

        if (!isEmpty(commonParse)) {
          this.setModified();
          const mergedParseNode = new ParseNode(node, commonParse);

          for (const childNode of originalChildren) {
            if (childNode instanceof ParseNode) {
              for (const key of keys(commonParse)) {
                delete childNode.parse[key];
              }
            }

            node.removeChild(childNode);
            childNode.parent = mergedParseNode; // remove empty parse nodes

            if (childNode instanceof ParseNode && keys(childNode.parse).length === 0) {
              childNode.remove();
            }
          }
        }
      }
    }

  }
  /**
   * Repeatedly remove leaf nodes that are not output or facet nodes.
   * The reason is that we don't need subtrees that don't have any output nodes.
   * Facet nodes are needed for the row or column domains.
   */

  class RemoveUnusedSubtrees extends BottomUpOptimizer {
    run(node) {
      if (node instanceof OutputNode || node.numChildren() > 0 || node instanceof FacetNode) ; else if (node instanceof SourceNode) ; else {
        this.setModified();
        node.remove();
      }
    }

  }
  /**
   * Merge adjacent time unit nodes.
   */

  class MergeTimeUnits extends BottomUpOptimizer {
    run(node) {
      const timeUnitChildren = node.children.filter(x => x instanceof TimeUnitNode);
      const combination = timeUnitChildren.pop();

      for (const timeUnit of timeUnitChildren) {
        this.setModified();
        combination.merge(timeUnit);
      }
    }

  }
  class MergeAggregates extends BottomUpOptimizer {
    run(node) {
      const aggChildren = node.children.filter(child => child instanceof AggregateNode); // Object which we'll use to map the fields which an aggregate is grouped by to
      // the set of aggregates with that grouping. This is useful as only aggregates
      // with the same group by can be merged

      const groupedAggregates = {}; // Build groupedAggregates

      for (const agg of aggChildren) {
        const groupBys = hash(agg.groupBy);

        if (!(groupBys in groupedAggregates)) {
          groupedAggregates[groupBys] = [];
        }

        groupedAggregates[groupBys].push(agg);
      } // Merge aggregateNodes with same key in groupedAggregates


      for (const group of keys(groupedAggregates)) {
        const mergeableAggs = groupedAggregates[group];

        if (mergeableAggs.length > 1) {
          const mergedAggs = mergeableAggs.pop();

          for (const agg of mergeableAggs) {
            if (mergedAggs.merge(agg)) {
              node.removeChild(agg);
              agg.parent = mergedAggs;
              agg.remove();
              this.setModified();
            }
          }
        }
      }
    }

  }
  /**
   * Merge bin nodes and move them up through forks. Stop at filters, parse, identifier as we want them to stay before the bin node.
   */

  class MergeBins extends BottomUpOptimizer {
    constructor(model) {
      super();
      this.model = model;
    }

    run(node) {
      const moveBinsUp = !(isDataSourceNode(node) || node instanceof FilterNode || node instanceof ParseNode || node instanceof IdentifierNode);
      const promotableBins = [];
      const remainingBins = [];

      for (const child of node.children) {
        if (child instanceof BinNode) {
          if (moveBinsUp && !fieldIntersection(node.producedFields(), child.dependentFields())) {
            promotableBins.push(child);
          } else {
            remainingBins.push(child);
          }
        }
      }

      if (promotableBins.length > 0) {
        const promotedBin = promotableBins.pop();

        for (const bin of promotableBins) {
          promotedBin.merge(bin, this.model.renameSignal.bind(this.model));
        }

        this.setModified();

        if (node instanceof BinNode) {
          node.merge(promotedBin, this.model.renameSignal.bind(this.model));
        } else {
          promotedBin.swapWithParent();
        }
      }

      if (remainingBins.length > 1) {
        const remainingBin = remainingBins.pop();

        for (const bin of remainingBins) {
          remainingBin.merge(bin, this.model.renameSignal.bind(this.model));
        }

        this.setModified();
      }
    }

  }
  /**
   * This optimizer takes output nodes that are at a fork and moves them before the fork.
   *
   * The algorithm iterates over the children and tries to find the last output node in a chain of output nodes.
   * It then moves all output nodes before that main output node. All other children (and the children of the output nodes)
   * are inserted after the main output node.
   */

  class MergeOutputs extends BottomUpOptimizer {
    run(node) {
      const children = [...node.children];
      const hasOutputChild = some(children, child => child instanceof OutputNode);

      if (!hasOutputChild || node.numChildren() <= 1) {
        return;
      }

      const otherChildren = []; // The output node we will connect all other nodes to.
      // Output nodes will be added before the new node, other nodes after.

      let mainOutput;

      for (const child of children) {
        if (child instanceof OutputNode) {
          let lastOutput = child;

          while (lastOutput.numChildren() === 1) {
            const [theChild] = lastOutput.children;

            if (theChild instanceof OutputNode) {
              lastOutput = theChild;
            } else {
              break;
            }
          }

          otherChildren.push(...lastOutput.children);

          if (mainOutput) {
            // Move the output nodes before the mainOutput. We do this by setting
            // the parent of the first not to the parent of the main output and
            // the main output's parent to the last output.
            // note: the child is the first output
            node.removeChild(child);
            child.parent = mainOutput.parent;
            mainOutput.parent.removeChild(mainOutput);
            mainOutput.parent = lastOutput;
            this.setModified();
          } else {
            mainOutput = lastOutput;
          }
        } else {
          otherChildren.push(child);
        }
      }

      if (otherChildren.length) {
        this.setModified();

        for (const child of otherChildren) {
          child.parent.removeChild(child);
          child.parent = mainOutput;
        }
      }
    }

  }

  /**
   * A class for the join aggregate transform nodes.
   */

  class JoinAggregateTransformNode extends DataFlowNode {
    clone() {
      return new JoinAggregateTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
    }

    addDimensions(fields) {
      this.transform.groupby = unique(this.transform.groupby.concat(fields), d => d);
    }

    dependentFields() {
      const out = new Set();

      if (this.transform.groupby) {
        this.transform.groupby.forEach(out.add, out);
      }

      this.transform.joinaggregate.map(w => w.field).filter(f => f !== undefined).forEach(out.add, out);
      return out;
    }

    producedFields() {
      return new Set(this.transform.joinaggregate.map(this.getDefaultName));
    }

    getDefaultName(joinAggregateFieldDef) {
      var _joinAggregateFieldDe;

      return (_joinAggregateFieldDe = joinAggregateFieldDef.as) !== null && _joinAggregateFieldDe !== void 0 ? _joinAggregateFieldDe : vgField(joinAggregateFieldDef);
    }

    hash() {
      return "JoinAggregateTransform ".concat(hash(this.transform));
    }

    assemble() {
      const fields = [];
      const ops = [];
      const as = [];

      for (const joinaggregate of this.transform.joinaggregate) {
        ops.push(joinaggregate.op);
        as.push(this.getDefaultName(joinaggregate));
        fields.push(joinaggregate.field === undefined ? null : joinaggregate.field);
      }

      const groupby = this.transform.groupby;
      return {
        type: 'joinaggregate',
        as,
        ops,
        fields,
        ...(groupby !== undefined ? {
          groupby
        } : {})
      };
    }

  }

  function getStackByFields(model) {
    return model.stack.stackBy.reduce((fields, by) => {
      const fieldDef = by.fieldDef;

      const _field = vgField(fieldDef);

      if (_field) {
        fields.push(_field);
      }

      return fields;
    }, []);
  }

  function isValidAsArray(as) {
    return vega.isArray(as) && as.every(s => vega.isString(s)) && as.length > 1;
  }

  class StackNode extends DataFlowNode {
    clone() {
      return new StackNode(null, duplicate(this._stack));
    }

    constructor(parent, stack) {
      super(parent);

      _defineProperty(this, "_stack", void 0);

      this._stack = stack;
    }

    static makeFromTransform(parent, stackTransform) {
      const {
        stack,
        groupby,
        as,
        offset = 'zero'
      } = stackTransform;
      const sortFields = [];
      const sortOrder = [];

      if (stackTransform.sort !== undefined) {
        for (const sortField of stackTransform.sort) {
          sortFields.push(sortField.field);
          sortOrder.push(getFirstDefined(sortField.order, 'ascending'));
        }
      }

      const sort = {
        field: sortFields,
        order: sortOrder
      };
      let normalizedAs;

      if (isValidAsArray(as)) {
        normalizedAs = as;
      } else if (vega.isString(as)) {
        normalizedAs = [as, "".concat(as, "_end")];
      } else {
        normalizedAs = ["".concat(stackTransform.stack, "_start"), "".concat(stackTransform.stack, "_end")];
      }

      return new StackNode(parent, {
        dimensionFieldDefs: [],
        stackField: stack,
        groupby,
        offset,
        sort,
        facetby: [],
        as: normalizedAs
      });
    }

    static makeFromEncoding(parent, model) {
      const stackProperties = model.stack;
      const {
        encoding
      } = model;

      if (!stackProperties) {
        return null;
      }

      const {
        groupbyChannels,
        fieldChannel,
        offset,
        impute
      } = stackProperties;
      const dimensionFieldDefs = groupbyChannels.map(groupbyChannel => {
        const cDef = encoding[groupbyChannel];
        return getFieldDef(cDef);
      }).filter(def => !!def);
      const stackby = getStackByFields(model);
      const orderDef = model.encoding.order;
      let sort;

      if (vega.isArray(orderDef) || isFieldDef(orderDef)) {
        sort = sortParams(orderDef);
      } else {
        // default = descending by stackFields
        // FIXME is the default here correct for binned fields?
        sort = stackby.reduce((s, field) => {
          s.field.push(field);
          s.order.push(fieldChannel === 'y' ? 'descending' : 'ascending');
          return s;
        }, {
          field: [],
          order: []
        });
      }

      return new StackNode(parent, {
        dimensionFieldDefs,
        stackField: model.vgField(fieldChannel),
        facetby: [],
        stackby,
        sort,
        offset,
        impute,
        as: [model.vgField(fieldChannel, {
          suffix: 'start',
          forAs: true
        }), model.vgField(fieldChannel, {
          suffix: 'end',
          forAs: true
        })]
      });
    }

    get stack() {
      return this._stack;
    }

    addDimensions(fields) {
      this._stack.facetby.push(...fields);
    }

    dependentFields() {
      const out = new Set();
      out.add(this._stack.stackField);
      this.getGroupbyFields().forEach(out.add, out);

      this._stack.facetby.forEach(out.add, out);

      this._stack.sort.field.forEach(out.add, out);

      return out;
    }

    producedFields() {
      return new Set(this._stack.as);
    }

    hash() {
      return "Stack ".concat(hash(this._stack));
    }

    getGroupbyFields() {
      const {
        dimensionFieldDefs,
        impute,
        groupby
      } = this._stack;

      if (dimensionFieldDefs.length > 0) {
        return dimensionFieldDefs.map(dimensionFieldDef => {
          if (dimensionFieldDef.bin) {
            if (impute) {
              // For binned group by field with impute, we calculate bin_mid
              // as we cannot impute two fields simultaneously
              return [vgField(dimensionFieldDef, {
                binSuffix: 'mid'
              })];
            }

            return [// For binned group by field without impute, we need both bin (start) and bin_end
            vgField(dimensionFieldDef, {}), vgField(dimensionFieldDef, {
              binSuffix: 'end'
            })];
          }

          return [vgField(dimensionFieldDef)];
        }).flat();
      }

      return groupby !== null && groupby !== void 0 ? groupby : [];
    }

    assemble() {
      const transform = [];
      const {
        facetby,
        dimensionFieldDefs,
        stackField: field,
        stackby,
        sort,
        offset,
        impute,
        as
      } = this._stack; // Impute

      if (impute) {
        for (const dimensionFieldDef of dimensionFieldDefs) {
          const {
            bandPosition = 0.5,
            bin
          } = dimensionFieldDef;

          if (bin) {
            // As we can only impute one field at a time, we need to calculate
            // mid point for a binned field
            const binStart = vgField(dimensionFieldDef, {
              expr: 'datum'
            });
            const binEnd = vgField(dimensionFieldDef, {
              expr: 'datum',
              binSuffix: 'end'
            });
            transform.push({
              type: 'formula',
              expr: "".concat(bandPosition, "*").concat(binStart, "+").concat(1 - bandPosition, "*").concat(binEnd),
              as: vgField(dimensionFieldDef, {
                binSuffix: 'mid',
                forAs: true
              })
            });
          }

          transform.push({
            type: 'impute',
            field,
            groupby: [...stackby, ...facetby],
            key: vgField(dimensionFieldDef, {
              binSuffix: 'mid'
            }),
            method: 'value',
            value: 0
          });
        }
      } // Stack


      transform.push({
        type: 'stack',
        groupby: [...this.getGroupbyFields(), ...facetby],
        field,
        sort,
        as,
        offset
      });
      return transform;
    }

  }

  /**
   * A class for the window transform nodes
   */

  class WindowTransformNode extends DataFlowNode {
    clone() {
      return new WindowTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
    }

    addDimensions(fields) {
      this.transform.groupby = unique(this.transform.groupby.concat(fields), d => d);
    }

    dependentFields() {
      var _this$transform$group, _this$transform$sort;

      const out = new Set();
      ((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : []).forEach(out.add, out);
      ((_this$transform$sort = this.transform.sort) !== null && _this$transform$sort !== void 0 ? _this$transform$sort : []).forEach(m => out.add(m.field));
      this.transform.window.map(w => w.field).filter(f => f !== undefined).forEach(out.add, out);
      return out;
    }

    producedFields() {
      return new Set(this.transform.window.map(this.getDefaultName));
    }

    getDefaultName(windowFieldDef) {
      var _windowFieldDef$as;

      return (_windowFieldDef$as = windowFieldDef.as) !== null && _windowFieldDef$as !== void 0 ? _windowFieldDef$as : vgField(windowFieldDef);
    }

    hash() {
      return "WindowTransform ".concat(hash(this.transform));
    }

    assemble() {
      const fields = [];
      const ops = [];
      const as = [];
      const params = [];

      for (const window of this.transform.window) {
        ops.push(window.op);
        as.push(this.getDefaultName(window));
        params.push(window.param === undefined ? null : window.param);
        fields.push(window.field === undefined ? null : window.field);
      }

      const frame = this.transform.frame;
      const groupby = this.transform.groupby;

      if (frame && frame[0] === null && frame[1] === null && ops.every(o => isAggregateOp(o))) {
        // when the window does not rely on any particular window ops or frame, switch to a simpler and more efficient joinaggregate
        return {
          type: 'joinaggregate',
          as,
          ops: ops,
          fields,
          ...(groupby !== undefined ? {
            groupby
          } : {})
        };
      }

      const sortFields = [];
      const sortOrder = [];

      if (this.transform.sort !== undefined) {
        for (const sortField of this.transform.sort) {
          var _sortField$order;

          sortFields.push(sortField.field);
          sortOrder.push((_sortField$order = sortField.order) !== null && _sortField$order !== void 0 ? _sortField$order : 'ascending');
        }
      }

      const sort = {
        field: sortFields,
        order: sortOrder
      };
      const ignorePeers = this.transform.ignorePeers;
      return {
        type: 'window',
        params,
        as,
        ops,
        fields,
        sort,
        ...(ignorePeers !== undefined ? {
          ignorePeers
        } : {}),
        ...(groupby !== undefined ? {
          groupby
        } : {}),
        ...(frame !== undefined ? {
          frame
        } : {})
      };
    }

  }

  /**
   * Clones the subtree and ignores output nodes except for the leaves, which are renamed.
   */

  function cloneSubtree(facet) {
    function clone(node) {
      if (!(node instanceof FacetNode)) {
        const copy = node.clone();

        if (copy instanceof OutputNode) {
          const newName = FACET_SCALE_PREFIX + copy.getSource();
          copy.setSource(newName);
          facet.model.component.data.outputNodes[newName] = copy;
        } else if (copy instanceof AggregateNode || copy instanceof StackNode || copy instanceof WindowTransformNode || copy instanceof JoinAggregateTransformNode) {
          copy.addDimensions(facet.fields);
        }

        for (const n of node.children.flatMap(clone)) {
          n.parent = copy;
        }

        return [copy];
      }

      return node.children.flatMap(clone);
    }

    return clone;
  }
  /**
   * Move facet nodes down to the next fork or output node. Also pull the main output with the facet node.
   * After moving down the facet node, make a copy of the subtree and make it a child of the main output.
   */


  function moveFacetDown(node) {
    if (node instanceof FacetNode) {
      if (node.numChildren() === 1 && !(node.children[0] instanceof OutputNode)) {
        // move down until we hit a fork or output node
        const child = node.children[0];

        if (child instanceof AggregateNode || child instanceof StackNode || child instanceof WindowTransformNode || child instanceof JoinAggregateTransformNode) {
          child.addDimensions(node.fields);
        }

        child.swapWithParent();
        moveFacetDown(node);
      } else {
        // move main to facet
        const facetMain = node.model.component.data.main;
        moveMainDownToFacet(facetMain); // replicate the subtree and place it before the facet's main node

        const cloner = cloneSubtree(node);
        const copy = node.children.map(cloner).flat();

        for (const c of copy) {
          c.parent = facetMain;
        }
      }
    } else {
      node.children.map(moveFacetDown);
    }
  }

  function moveMainDownToFacet(node) {
    if (node instanceof OutputNode && node.type === DataSourceType.Main) {
      if (node.numChildren() === 1) {
        const child = node.children[0];

        if (!(child instanceof FacetNode)) {
          child.swapWithParent();
          moveMainDownToFacet(node);
        }
      }
    }
  }

  const FACET_SCALE_PREFIX = 'scale_';
  const MAX_OPTIMIZATION_RUNS = 5;
  /**
   * Iterates over a dataflow graph and checks whether all links are consistent.
   */

  function checkLinks(nodes) {
    for (const node of nodes) {
      for (const child of node.children) {
        if (child.parent !== node) {
          // log.error('Dataflow graph is inconsistent.', node, child);
          return false;
        }
      }

      if (!checkLinks(node.children)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Run the specified optimizer on the provided nodes.
   *
   * @param optimizer The optimizer instance to run.
   * @param nodes A set of nodes to optimize.
   */

  function runOptimizer(optimizer, nodes) {
    let modified = false;

    for (const node of nodes) {
      modified = optimizer.optimize(node) || modified;
    }

    return modified;
  }

  function optimizationDataflowHelper(dataComponent, model, firstPass) {
    let roots = dataComponent.sources;
    let modified = false;
    modified = runOptimizer(new RemoveUnnecessaryOutputNodes(), roots) || modified;
    modified = runOptimizer(new RemoveUnnecessaryIdentifierNodes(model), roots) || modified; // remove source nodes that don't have any children because they also don't have output nodes

    roots = roots.filter(r => r.numChildren() > 0);
    modified = runOptimizer(new RemoveUnusedSubtrees(), roots) || modified;
    roots = roots.filter(r => r.numChildren() > 0);

    if (!firstPass) {
      // Only run these optimizations after the optimizer has moved down the facet node.
      // With this change, we can be more aggressive in the optimizations.
      modified = runOptimizer(new MoveParseUp(), roots) || modified;
      modified = runOptimizer(new MergeBins(model), roots) || modified;
      modified = runOptimizer(new RemoveDuplicateTimeUnits(), roots) || modified;
      modified = runOptimizer(new MergeParse(), roots) || modified;
      modified = runOptimizer(new MergeAggregates(), roots) || modified;
      modified = runOptimizer(new MergeTimeUnits(), roots) || modified;
      modified = runOptimizer(new MergeIdenticalNodes(), roots) || modified;
      modified = runOptimizer(new MergeOutputs(), roots) || modified;
    }

    dataComponent.sources = roots;
    return modified;
  }
  /**
   * Optimizes the dataflow of the passed in data component.
   */


  function optimizeDataflow(data, model) {
    // check before optimizations
    checkLinks(data.sources);
    let firstPassCounter = 0;
    let secondPassCounter = 0;

    for (let i = 0; i < MAX_OPTIMIZATION_RUNS; i++) {
      if (!optimizationDataflowHelper(data, model, true)) {
        break;
      }

      firstPassCounter++;
    } // move facets down and make a copy of the subtree so that we can have scales at the top level


    data.sources.map(moveFacetDown);

    for (let i = 0; i < MAX_OPTIMIZATION_RUNS; i++) {
      if (!optimizationDataflowHelper(data, model, false)) {
        break;
      }

      secondPassCounter++;
    } // check after optimizations


    checkLinks(data.sources);

    if (Math.max(firstPassCounter, secondPassCounter) === MAX_OPTIMIZATION_RUNS) {
      warn("Maximum optimization runs(".concat(MAX_OPTIMIZATION_RUNS, ") reached."));
    }
  }

  /**
   * A class that behaves like a SignalRef but lazily generates the signal.
   * The provided generator function should use `Model.getSignalName` to use the correct signal name.
   */
  class SignalRefWrapper {
    constructor(exprGenerator) {
      _defineProperty(this, "signal", void 0);

      Object.defineProperty(this, 'signal', {
        enumerable: true,
        get: exprGenerator
      });
    }

    // for ts
    static fromName(rename, signalName) {
      return new SignalRefWrapper(() => rename(signalName));
    }

  }

  function parseScaleDomain(model) {
    if (isUnitModel(model)) {
      parseUnitScaleDomain(model);
    } else {
      parseNonUnitScaleDomain(model);
    }
  }

  function parseUnitScaleDomain(model) {
    const localScaleComponents = model.component.scales;

    for (const channel of keys(localScaleComponents)) {
      const domains = parseDomainForChannel(model, channel);
      const localScaleCmpt = localScaleComponents[channel];
      localScaleCmpt.setWithExplicit('domains', domains);
      parseSelectionDomain(model, channel);

      if (model.component.data.isFaceted) {
        // get resolve from closest facet parent as this decides whether we need to refer to cloned subtree or not
        let facetParent = model;

        while (!isFacetModel(facetParent) && facetParent.parent) {
          facetParent = facetParent.parent;
        }

        const resolve = facetParent.component.resolve.scale[channel];

        if (resolve === 'shared') {
          for (const domain of domains.value) {
            // Replace the scale domain with data output from a cloned subtree after the facet.
            if (isDataRefDomain(domain)) {
              // use data from cloned subtree (which is the same as data but with a prefix added once)
              domain.data = FACET_SCALE_PREFIX + domain.data.replace(FACET_SCALE_PREFIX, '');
            }
          }
        }
      }
    }
  }

  function parseNonUnitScaleDomain(model) {
    for (const child of model.children) {
      parseScaleDomain(child);
    }

    const localScaleComponents = model.component.scales;

    for (const channel of keys(localScaleComponents)) {
      let domains;
      let selectionExtent = null;

      for (const child of model.children) {
        const childComponent = child.component.scales[channel];

        if (childComponent) {
          if (domains === undefined) {
            domains = childComponent.getWithExplicit('domains');
          } else {
            domains = mergeValuesWithExplicit(domains, childComponent.getWithExplicit('domains'), 'domains', 'scale', domainsTieBreaker);
          }

          const se = childComponent.get('selectionExtent');

          if (selectionExtent && se && selectionExtent.param !== se.param) {
            warn(NEEDS_SAME_SELECTION);
          }

          selectionExtent = se;
        }
      }

      localScaleComponents[channel].setWithExplicit('domains', domains);

      if (selectionExtent) {
        localScaleComponents[channel].set('selectionExtent', selectionExtent, true);
      }
    }
  }
  /**
   * Remove unaggregated domain if it is not applicable
   * Add unaggregated domain if domain is not specified and config.scale.useUnaggregatedDomain is true.
   */


  function normalizeUnaggregatedDomain(domain, fieldDef, scaleType, scaleConfig) {
    if (domain === 'unaggregated') {
      const {
        valid,
        reason
      } = canUseUnaggregatedDomain(fieldDef, scaleType);

      if (!valid) {
        warn(reason);
        return undefined;
      }
    } else if (domain === undefined && scaleConfig.useUnaggregatedDomain) {
      // Apply config if domain is not specified.
      const {
        valid
      } = canUseUnaggregatedDomain(fieldDef, scaleType);

      if (valid) {
        return 'unaggregated';
      }
    }

    return domain;
  }

  function parseDomainForChannel(model, channel) {
    const scaleType = model.getScaleComponent(channel).get('type');
    const {
      encoding
    } = model;
    const domain = normalizeUnaggregatedDomain(model.scaleDomain(channel), model.typedFieldDef(channel), scaleType, model.config.scale);

    if (domain !== model.scaleDomain(channel)) {
      model.specifiedScales[channel] = { ...model.specifiedScales[channel],
        domain
      };
    } // If channel is either X or Y then union them with X2 & Y2 if they exist


    if (channel === 'x' && getFieldOrDatumDef(encoding.x2)) {
      if (getFieldOrDatumDef(encoding.x)) {
        return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType, domain, model, 'x'), parseSingleChannelDomain(scaleType, domain, model, 'x2'), 'domain', 'scale', domainsTieBreaker);
      } else {
        return parseSingleChannelDomain(scaleType, domain, model, 'x2');
      }
    } else if (channel === 'y' && getFieldOrDatumDef(encoding.y2)) {
      if (getFieldOrDatumDef(encoding.y)) {
        return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType, domain, model, 'y'), parseSingleChannelDomain(scaleType, domain, model, 'y2'), 'domain', 'scale', domainsTieBreaker);
      } else {
        return parseSingleChannelDomain(scaleType, domain, model, 'y2');
      }
    }

    return parseSingleChannelDomain(scaleType, domain, model, channel);
  }

  function mapDomainToDataSignal(domain, type, timeUnit) {
    return domain.map(v => {
      const data = valueExpr(v, {
        timeUnit,
        type
      });
      return {
        signal: "{data: ".concat(data, "}")
      };
    });
  }

  function convertDomainIfItIsDateTime(domain, type, timeUnit) {
    var _normalizeTimeUnit;

    // explicit value
    const normalizedTimeUnit = (_normalizeTimeUnit = normalizeTimeUnit(timeUnit)) === null || _normalizeTimeUnit === void 0 ? void 0 : _normalizeTimeUnit.unit;

    if (type === 'temporal' || normalizedTimeUnit) {
      return mapDomainToDataSignal(domain, type, normalizedTimeUnit);
    }

    return [domain]; // Date time won't make sense
  }

  function parseSingleChannelDomain(scaleType, domain, model, channel) {
    const {
      encoding
    } = model;
    const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
    const {
      type
    } = fieldOrDatumDef;
    const timeUnit = fieldOrDatumDef['timeUnit'];

    if (isDomainUnionWith(domain)) {
      const defaultDomain = parseSingleChannelDomain(scaleType, undefined, model, channel);
      const unionWith = convertDomainIfItIsDateTime(domain.unionWith, type, timeUnit);
      return makeExplicit([...defaultDomain.value, ...unionWith]);
    } else if (isSignalRef(domain)) {
      return makeExplicit([domain]);
    } else if (domain && domain !== 'unaggregated' && !isParameterDomain(domain)) {
      return makeExplicit(convertDomainIfItIsDateTime(domain, type, timeUnit));
    }

    const stack = model.stack;

    if (stack && channel === stack.fieldChannel) {
      if (stack.offset === 'normalize') {
        return makeImplicit([[0, 1]]);
      }

      const data = model.requestDataName(DataSourceType.Main);
      return makeImplicit([{
        data,
        field: model.vgField(channel, {
          suffix: 'start'
        })
      }, {
        data,
        field: model.vgField(channel, {
          suffix: 'end'
        })
      }]);
    }

    const sort = isScaleChannel(channel) && isFieldDef(fieldOrDatumDef) ? domainSort(model, channel, scaleType) : undefined;

    if (isDatumDef(fieldOrDatumDef)) {
      const d = convertDomainIfItIsDateTime([fieldOrDatumDef.datum], type, timeUnit);
      return makeImplicit(d);
    }

    const fieldDef = fieldOrDatumDef; // now we can be sure it's a fieldDef

    if (domain === 'unaggregated') {
      const data = model.requestDataName(DataSourceType.Main);
      const {
        field
      } = fieldOrDatumDef;
      return makeImplicit([{
        data,
        field: vgField({
          field,
          aggregate: 'min'
        })
      }, {
        data,
        field: vgField({
          field,
          aggregate: 'max'
        })
      }]);
    } else if (isBinning(fieldDef.bin)) {
      if (hasDiscreteDomain(scaleType)) {
        if (scaleType === 'bin-ordinal') {
          // we can omit the domain as it is inferred from the `bins` property
          return makeImplicit([]);
        } // ordinal bin scale takes domain from bin_range, ordered by bin start
        // This is useful for both axis-based scale (x/y) and legend-based scale (other channels).


        return makeImplicit([{
          // If sort by aggregation of a specified sort field, we need to use RAW table,
          // so we can aggregate values for the scale independently from the main aggregation.
          data: isBoolean(sort) ? model.requestDataName(DataSourceType.Main) : model.requestDataName(DataSourceType.Raw),
          // Use range if we added it and the scale does not support computing a range as a signal.
          field: model.vgField(channel, binRequiresRange(fieldDef, channel) ? {
            binSuffix: 'range'
          } : {}),
          // we have to use a sort object if sort = true to make the sort correct by bin start
          sort: sort === true || !vega.isObject(sort) ? {
            field: model.vgField(channel, {}),
            op: 'min' // min or max doesn't matter since we sort by the start of the bin range

          } : sort
        }]);
      } else {
        // continuous scales
        const {
          bin
        } = fieldDef;

        if (isBinning(bin)) {
          const binSignal = getBinSignalName(model, fieldDef.field, bin);
          return makeImplicit([new SignalRefWrapper(() => {
            const signal = model.getSignalName(binSignal);
            return "[".concat(signal, ".start, ").concat(signal, ".stop]");
          })]);
        } else {
          return makeImplicit([{
            data: model.requestDataName(DataSourceType.Main),
            field: model.vgField(channel, {})
          }]);
        }
      }
    } else if (fieldDef.timeUnit && contains(['time', 'utc'], scaleType) && hasBandEnd(fieldDef, isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined, model.markDef, model.config)) {
      const data = model.requestDataName(DataSourceType.Main);
      return makeImplicit([{
        data,
        field: model.vgField(channel)
      }, {
        data,
        field: model.vgField(channel, {
          suffix: 'end'
        })
      }]);
    } else if (sort) {
      return makeImplicit([{
        // If sort by aggregation of a specified sort field, we need to use RAW table,
        // so we can aggregate values for the scale independently from the main aggregation.
        data: isBoolean(sort) ? model.requestDataName(DataSourceType.Main) : model.requestDataName(DataSourceType.Raw),
        field: model.vgField(channel),
        sort
      }]);
    } else {
      return makeImplicit([{
        data: model.requestDataName(DataSourceType.Main),
        field: model.vgField(channel)
      }]);
    }
  }

  function normalizeSortField(sort, isStackedMeasure) {
    const {
      op,
      field,
      order
    } = sort;
    return {
      // Apply default op
      op: op !== null && op !== void 0 ? op : isStackedMeasure ? 'sum' : DEFAULT_SORT_OP,
      // flatten nested fields
      ...(field ? {
        field: replacePathInField(field)
      } : {}),
      ...(order ? {
        order
      } : {})
    };
  }

  function parseSelectionDomain(model, channel) {
    var _model$fieldDef;

    const scale = model.component.scales[channel];
    const spec = model.specifiedScales[channel].domain;
    const bin = (_model$fieldDef = model.fieldDef(channel)) === null || _model$fieldDef === void 0 ? void 0 : _model$fieldDef.bin;
    const domain = isParameterDomain(spec) && spec;
    const extent = isBinParams(bin) && isParameterExtent(bin.extent) && bin.extent;

    if (domain || extent) {
      // As scale parsing occurs before selection parsing, we cannot set
      // domainRaw directly. So instead, we store the selectionExtent on
      // the scale component, and then add domainRaw during scale assembly.
      scale.set('selectionExtent', domain !== null && domain !== void 0 ? domain : extent, true);
    }
  }

  function domainSort(model, channel, scaleType) {
    if (!hasDiscreteDomain(scaleType)) {
      return undefined;
    } // save to cast as the only exception is the geojson type for shape, which would not generate a scale


    const fieldDef = model.fieldDef(channel);
    const sort = fieldDef.sort; // if the sort is specified with array, use the derived sort index field

    if (isSortArray(sort)) {
      return {
        op: 'min',
        field: sortArrayIndexField(fieldDef, channel),
        order: 'ascending'
      };
    }

    const {
      stack
    } = model;
    const stackDimensions = stack ? new Set([...stack.groupbyFields, ...stack.stackBy.map(s => s.fieldDef.field)]) : undefined; // Sorted based on an aggregate calculation over a specified sort field (only for ordinal scale)

    if (isSortField(sort)) {
      const isStackedMeasure = stack && !stackDimensions.has(sort.field);
      return normalizeSortField(sort, isStackedMeasure);
    } else if (isSortByEncoding(sort)) {
      const {
        encoding,
        order
      } = sort;
      const fieldDefToSortBy = model.fieldDef(encoding);
      const {
        aggregate,
        field
      } = fieldDefToSortBy;
      const isStackedMeasure = stack && !stackDimensions.has(field);

      if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
        return normalizeSortField({
          field: vgField(fieldDefToSortBy),
          order
        }, isStackedMeasure);
      } else if (isAggregateOp(aggregate) || !aggregate) {
        return normalizeSortField({
          op: aggregate,
          // can't be argmin/argmax since we don't support them in encoding field def
          field,
          order
        }, isStackedMeasure);
      }
    } else if (sort === 'descending') {
      return {
        op: 'min',
        field: model.vgField(channel),
        order: 'descending'
      };
    } else if (contains(['ascending', undefined
    /* default =ascending*/
    ], sort)) {
      return true;
    } // sort == null


    return undefined;
  }
  /**
   * Determine if a scale can use unaggregated domain.
   * @return {Boolean} Returns true if all of the following conditions apply:
   * 1. `scale.domain` is `unaggregated`
   * 2. Aggregation function is not `count` or `sum`
   * 3. The scale is quantitative or time scale.
   */

  function canUseUnaggregatedDomain(fieldDef, scaleType) {
    const {
      aggregate,
      type
    } = fieldDef;

    if (!aggregate) {
      return {
        valid: false,
        reason: unaggregateDomainHasNoEffectForRawField(fieldDef)
      };
    }

    if (vega.isString(aggregate) && !SHARED_DOMAIN_OPS.has(aggregate)) {
      return {
        valid: false,
        reason: unaggregateDomainWithNonSharedDomainOp(aggregate)
      };
    }

    if (type === 'quantitative') {
      if (scaleType === 'log') {
        return {
          valid: false,
          reason: unaggregatedDomainWithLogScale(fieldDef)
        };
      }
    }

    return {
      valid: true
    };
  }
  /**
   * Tie breaker for mergeValuesWithExplicit for domains. We concat the specified values.
   */

  function domainsTieBreaker(v1, v2, property, propertyOf) {
    if (v1.explicit && v2.explicit) {
      warn(mergeConflictingDomainProperty(property, propertyOf, v1.value, v2.value));
    } // If equal score, concat the domains so that we union them later.


    return {
      explicit: v1.explicit,
      value: [...v1.value, ...v2.value]
    };
  }
  /**
   * Converts an array of domains to a single Vega scale domain.
   */


  function mergeDomains(domains) {
    const uniqueDomains = unique(domains.map(domain => {
      // ignore sort property when computing the unique domains
      if (isDataRefDomain(domain)) {
        const {
          sort: _s,
          ...domainWithoutSort
        } = domain;
        return domainWithoutSort;
      }

      return domain;
    }), hash);
    const sorts = unique(domains.map(d => {
      if (isDataRefDomain(d)) {
        const s = d.sort;

        if (s !== undefined && !isBoolean(s)) {
          if ('op' in s && s.op === 'count') {
            // let's make sure that if op is count, we don't use a field
            delete s.field;
          }

          if (s.order === 'ascending') {
            // drop order: ascending as it is the default
            delete s.order;
          }
        }

        return s;
      }

      return undefined;
    }).filter(s => s !== undefined), hash);

    if (uniqueDomains.length === 0) {
      return undefined;
    } else if (uniqueDomains.length === 1) {
      const domain = domains[0];

      if (isDataRefDomain(domain) && sorts.length > 0) {
        let sort = sorts[0];

        if (sorts.length > 1) {
          warn(MORE_THAN_ONE_SORT);
          sort = true;
        } else {
          // Simplify domain sort by removing field and op when the field is the same as the domain field.
          if (vega.isObject(sort) && 'field' in sort) {
            const sortField = sort.field;

            if (domain.field === sortField) {
              sort = sort.order ? {
                order: sort.order
              } : true;
            }
          }
        }

        return { ...domain,
          sort
        };
      }

      return domain;
    } // only keep sort properties that work with unioned domains


    const unionDomainSorts = unique(sorts.map(s => {
      if (isBoolean(s) || !('op' in s) || vega.isString(s.op) && s.op in MULTIDOMAIN_SORT_OP_INDEX) {
        return s;
      }

      warn(domainSortDropped(s));
      return true;
    }), hash);
    let sort;

    if (unionDomainSorts.length === 1) {
      sort = unionDomainSorts[0];
    } else if (unionDomainSorts.length > 1) {
      warn(MORE_THAN_ONE_SORT);
      sort = true;
    }

    const allData = unique(domains.map(d => {
      if (isDataRefDomain(d)) {
        return d.data;
      }

      return null;
    }), x => x);

    if (allData.length === 1 && allData[0] !== null) {
      // create a union domain of different fields with a single data source
      const domain = {
        data: allData[0],
        fields: uniqueDomains.map(d => d.field),
        ...(sort ? {
          sort
        } : {})
      };
      return domain;
    }

    return {
      fields: uniqueDomains,
      ...(sort ? {
        sort
      } : {})
    };
  }
  /**
   * Return a field if a scale uses a single field.
   * Return `undefined` otherwise.
   */

  function getFieldFromDomain(domain) {
    if (isDataRefDomain(domain) && vega.isString(domain.field)) {
      return domain.field;
    } else if (isDataRefUnionedDomain(domain)) {
      let field;

      for (const nonUnionDomain of domain.fields) {
        if (isDataRefDomain(nonUnionDomain) && vega.isString(nonUnionDomain.field)) {
          if (!field) {
            field = nonUnionDomain.field;
          } else if (field !== nonUnionDomain.field) {
            warn(FACETED_INDEPENDENT_DIFFERENT_SOURCES);
            return field;
          }
        }
      }

      warn(FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES);
      return field;
    } else if (isFieldRefUnionDomain(domain)) {
      warn(FACETED_INDEPENDENT_SAME_SOURCE);
      const field = domain.fields[0];
      return vega.isString(field) ? field : undefined;
    }

    return undefined;
  }
  function assembleDomain(model, channel) {
    const scaleComponent = model.component.scales[channel];
    const domains = scaleComponent.get('domains').map(domain => {
      // Correct references to data as the original domain's data was determined
      // in parseScale, which happens before parseData. Thus the original data
      // reference can be incorrect.
      if (isDataRefDomain(domain)) {
        domain.data = model.lookupDataSource(domain.data);
      }

      return domain;
    }); // domains is an array that has to be merged into a single vega domain

    return mergeDomains(domains);
  }

  function assembleScales(model) {
    if (isLayerModel(model) || isConcatModel(model)) {
      // For concat and layer, include scales of children too
      return model.children.reduce((scales, child) => {
        return scales.concat(assembleScales(child));
      }, assembleScalesForModel(model));
    } else {
      // For facet, child scales would not be included in the parent's scope.
      // For unit, there is no child.
      return assembleScalesForModel(model);
    }
  }
  function assembleScalesForModel(model) {
    return keys(model.component.scales).reduce((scales, channel) => {
      const scaleComponent = model.component.scales[channel];

      if (scaleComponent.merged) {
        // Skipped merged scales
        return scales;
      }

      const scale = scaleComponent.combine();
      const {
        name,
        type,
        selectionExtent,
        domains: _d,
        range: _r,
        reverse,
        ...otherScaleProps
      } = scale;
      const range = assembleScaleRange(scale.range, name, channel, model);
      const domain = assembleDomain(model, channel);
      const domainRaw = selectionExtent ? assembleSelectionScaleDomain(model, selectionExtent, scaleComponent, domain) : null;
      scales.push({
        name,
        type,
        ...(domain ? {
          domain
        } : {}),
        ...(domainRaw ? {
          domainRaw
        } : {}),
        range,
        ...(reverse !== undefined ? {
          reverse: reverse
        } : {}),
        ...otherScaleProps
      });
      return scales;
    }, []);
  }
  function assembleScaleRange(scaleRange, scaleName, channel, model) {
    // add signals to x/y range
    if (isXorY(channel)) {
      if (isVgRangeStep(scaleRange)) {
        // For width/height step, use a signal created in layout assemble instead of a constant step.
        return {
          step: {
            signal: "".concat(scaleName, "_step")
          }
        };
      }
    } else if (vega.isObject(scaleRange) && isDataRefDomain(scaleRange)) {
      return { ...scaleRange,
        data: model.lookupDataSource(scaleRange.data)
      };
    }

    return scaleRange;
  }

  /**
   * All VgDomain property except domain.
   * (We exclude domain as we have a special "domains" array that allow us merge them all at once in assemble.)
   */

  class ScaleComponent extends Split {
    constructor(name, typeWithExplicit) {
      super({}, // no initial explicit property
      {
        name
      } // name as initial implicit property
      );

      _defineProperty(this, "merged", false);

      this.setWithExplicit('type', typeWithExplicit);
    }
    /**
     * Whether the scale definitely includes zero in the domain
     */


    domainDefinitelyIncludesZero() {
      if (this.get('zero') !== false) {
        return true;
      }

      return some(this.get('domains'), d => vega.isArray(d) && d.length === 2 && d[0] <= 0 && d[1] >= 0);
    }

  }

  const RANGE_PROPERTIES = ['range', 'scheme'];
  function parseUnitScaleRange(model) {
    const localScaleComponents = model.component.scales; // use SCALE_CHANNELS instead of scales[channel] to ensure that x, y come first!

    for (const channel of SCALE_CHANNELS) {
      const localScaleCmpt = localScaleComponents[channel];

      if (!localScaleCmpt) {
        continue;
      }

      const rangeWithExplicit = parseRangeForChannel(channel, model);
      localScaleCmpt.setWithExplicit('range', rangeWithExplicit);
    }
  }

  function getBinStepSignal(model, channel) {
    const fieldDef = model.fieldDef(channel);

    if (fieldDef !== null && fieldDef !== void 0 && fieldDef.bin) {
      const {
        bin,
        field
      } = fieldDef;
      const sizeType = getSizeChannel(channel);
      const sizeSignal = model.getName(sizeType);

      if (vega.isObject(bin) && bin.binned && bin.step !== undefined) {
        return new SignalRefWrapper(() => {
          const scaleName = model.scaleName(channel);
          const binCount = "(domain(\"".concat(scaleName, "\")[1] - domain(\"").concat(scaleName, "\")[0]) / ").concat(bin.step);
          return "".concat(model.getSignalName(sizeSignal), " / (").concat(binCount, ")");
        });
      } else if (isBinning(bin)) {
        const binSignal = getBinSignalName(model, field, bin); // TODO: extract this to be range step signal

        return new SignalRefWrapper(() => {
          const updatedName = model.getSignalName(binSignal);
          const binCount = "(".concat(updatedName, ".stop - ").concat(updatedName, ".start) / ").concat(updatedName, ".step");
          return "".concat(model.getSignalName(sizeSignal), " / (").concat(binCount, ")");
        });
      }
    }

    return undefined;
  }
  /**
   * Return mixins that includes one of the Vega range types (explicit range, range.step, range.scheme).
   */


  function parseRangeForChannel(channel, model) {
    const specifiedScale = model.specifiedScales[channel];
    const {
      size
    } = model;
    const mergedScaleCmpt = model.getScaleComponent(channel);
    const scaleType = mergedScaleCmpt.get('type'); // Check if any of the range properties is specified.
    // If so, check if it is compatible and make sure that we only output one of the properties

    for (const property of RANGE_PROPERTIES) {
      if (specifiedScale[property] !== undefined) {
        const supportedByScaleType = scaleTypeSupportProperty(scaleType, property);
        const channelIncompatability = channelScalePropertyIncompatability(channel, property);

        if (!supportedByScaleType) {
          warn(scalePropertyNotWorkWithScaleType(scaleType, property, channel));
        } else if (channelIncompatability) {
          // channel
          warn(channelIncompatability);
        } else {
          switch (property) {
            case 'range':
              {
                const range = specifiedScale.range;

                if (vega.isArray(range)) {
                  if (isXorY(channel)) {
                    return makeExplicit(range.map(v => {
                      if (v === 'width' || v === 'height') {
                        // get signal for width/height
                        // Just like default range logic below, we use SignalRefWrapper to account for potential merges and renames.
                        const sizeSignal = model.getName(v);
                        const getSignalName = model.getSignalName.bind(model);
                        return SignalRefWrapper.fromName(getSignalName, sizeSignal);
                      }

                      return v;
                    }));
                  }
                } else if (vega.isObject(range)) {
                  return makeExplicit({
                    data: model.requestDataName(DataSourceType.Main),
                    field: range.field,
                    sort: {
                      op: 'min',
                      field: model.vgField(channel)
                    }
                  });
                }

                return makeExplicit(range);
              }

            case 'scheme':
              return makeExplicit(parseScheme(specifiedScale[property]));
          }
        }
      }
    }

    const sizeChannel = channel === X || channel === 'xOffset' ? 'width' : 'height';
    const sizeValue = size[sizeChannel];

    if (isStep(sizeValue)) {
      if (isXorY(channel)) {
        if (hasDiscreteDomain(scaleType)) {
          const step = getPositionStep(sizeValue, model, channel); // Need to be explicit so layer with step wins over layer without step

          if (step) {
            return makeExplicit({
              step
            });
          }
        } else {
          warn(stepDropped(sizeChannel));
        }
      } else if (isXorYOffset(channel)) {
        const positionChannel = channel === XOFFSET ? 'x' : 'y';
        const positionScaleCmpt = model.getScaleComponent(positionChannel);
        const positionScaleType = positionScaleCmpt.get('type');

        if (positionScaleType === 'band') {
          const step = getOffsetStep(sizeValue, scaleType);

          if (step) {
            return makeExplicit(step);
          }
        }
      }
    }

    const {
      rangeMin,
      rangeMax
    } = specifiedScale;
    const d = defaultRange(channel, model);

    if ((rangeMin !== undefined || rangeMax !== undefined) && // it's ok to check just rangeMin's compatibility since rangeMin/rangeMax are the same
    scaleTypeSupportProperty(scaleType, 'rangeMin') && vega.isArray(d) && d.length === 2) {
      return makeExplicit([rangeMin !== null && rangeMin !== void 0 ? rangeMin : d[0], rangeMax !== null && rangeMax !== void 0 ? rangeMax : d[1]]);
    }

    return makeImplicit(d);
  }

  function parseScheme(scheme) {
    if (isExtendedScheme(scheme)) {
      return {
        scheme: scheme.name,
        ...omit(scheme, ['name'])
      };
    }

    return {
      scheme
    };
  }

  function defaultRange(channel, model) {
    const {
      size,
      config,
      mark,
      encoding
    } = model;
    const getSignalName = model.getSignalName.bind(model);
    const {
      type
    } = getFieldOrDatumDef(encoding[channel]);
    const mergedScaleCmpt = model.getScaleComponent(channel);
    const scaleType = mergedScaleCmpt.get('type');
    const {
      domain,
      domainMid
    } = model.specifiedScales[channel];

    switch (channel) {
      case X:
      case Y:
        {
          // If there is no explicit width/height for discrete x/y scales
          if (contains(['point', 'band'], scaleType)) {
            const positionSize = getDiscretePositionSize(channel, size, config.view);

            if (isStep(positionSize)) {
              const step = getPositionStep(positionSize, model, channel);
              return {
                step
              };
            }
          } // If step is null, use zero to width or height.
          // Note that we use SignalRefWrapper to account for potential merges and renames.


          const sizeType = getSizeChannel(channel);
          const sizeSignal = model.getName(sizeType);

          if (channel === Y && hasContinuousDomain(scaleType)) {
            // For y continuous scale, we have to start from the height as the bottom part has the max value.
            return [SignalRefWrapper.fromName(getSignalName, sizeSignal), 0];
          } else {
            return [0, SignalRefWrapper.fromName(getSignalName, sizeSignal)];
          }
        }

      case XOFFSET:
      case YOFFSET:
        return getOffsetRange(channel, model, scaleType);

      case SIZE:
        {
          // TODO: support custom rangeMin, rangeMax
          const zero = model.component.scales[channel].get('zero');
          const rangeMin = sizeRangeMin(mark, zero, config);
          const rangeMax = sizeRangeMax(mark, size, model, config);

          if (isContinuousToDiscrete(scaleType)) {
            return interpolateRange(rangeMin, rangeMax, defaultContinuousToDiscreteCount(scaleType, config, domain, channel));
          } else {
            return [rangeMin, rangeMax];
          }
        }

      case THETA:
        return [0, Math.PI * 2];

      case ANGLE:
        // TODO: add config.scale.min/maxAngleDegree (for point and text) and config.scale.min/maxAngleRadian (for arc) once we add arc marks.
        // (It's weird to add just config.scale.min/maxAngleDegree for now)
        return [0, 360];

      case RADIUS:
        {
          // max radius = half od min(width,height)
          return [0, new SignalRefWrapper(() => {
            const w = model.getSignalName('width');
            const h = model.getSignalName('height');
            return "min(".concat(w, ",").concat(h, ")/2");
          })];
        }

      case STROKEWIDTH:
        // TODO: support custom rangeMin, rangeMax
        return [config.scale.minStrokeWidth, config.scale.maxStrokeWidth];

      case STROKEDASH:
        return [// TODO: add this to Vega's config.range?
        [1, 0], [4, 2], [2, 1], [1, 1], [1, 2, 4, 2]];

      case SHAPE:
        return 'symbol';

      case COLOR:
      case FILL:
      case STROKE:
        if (scaleType === 'ordinal') {
          // Only nominal data uses ordinal scale by default
          return type === 'nominal' ? 'category' : 'ordinal';
        } else {
          if (domainMid !== undefined) {
            return 'diverging';
          } else {
            return mark === 'rect' || mark === 'geoshape' ? 'heatmap' : 'ramp';
          }
        }

      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
        // TODO: support custom rangeMin, rangeMax
        return [config.scale.minOpacity, config.scale.maxOpacity];
    }
  }

  function getPositionStep(step, model, channel) {
    const {
      encoding
    } = model;
    const mergedScaleCmpt = model.getScaleComponent(channel);
    const offsetChannel = getOffsetScaleChannel(channel);
    const offsetDef = encoding[offsetChannel];
    const stepFor = getStepFor({
      step,
      offsetIsDiscrete: isFieldOrDatumDef(offsetDef) && isDiscrete$1(offsetDef.type)
    });

    if (stepFor === 'offset' && channelHasFieldOrDatum(encoding, offsetChannel)) {
      var _mergedScaleCmpt$get;

      const offsetScaleCmpt = model.getScaleComponent(offsetChannel);
      const offsetScaleName = model.scaleName(offsetChannel);
      let stepCount = "domain('".concat(offsetScaleName, "').length");

      if (offsetScaleCmpt.get('type') === 'band') {
        var _ref, _offsetScaleCmpt$get, _ref2, _offsetScaleCmpt$get2;

        const offsetPaddingInner = (_ref = (_offsetScaleCmpt$get = offsetScaleCmpt.get('paddingInner')) !== null && _offsetScaleCmpt$get !== void 0 ? _offsetScaleCmpt$get : offsetScaleCmpt.get('padding')) !== null && _ref !== void 0 ? _ref : 0;
        const offsetPaddingOuter = (_ref2 = (_offsetScaleCmpt$get2 = offsetScaleCmpt.get('paddingOuter')) !== null && _offsetScaleCmpt$get2 !== void 0 ? _offsetScaleCmpt$get2 : offsetScaleCmpt.get('padding')) !== null && _ref2 !== void 0 ? _ref2 : 0;
        stepCount = "bandspace(".concat(stepCount, ", ").concat(offsetPaddingInner, ", ").concat(offsetPaddingOuter, ")");
      }

      const paddingInner = (_mergedScaleCmpt$get = mergedScaleCmpt.get('paddingInner')) !== null && _mergedScaleCmpt$get !== void 0 ? _mergedScaleCmpt$get : mergedScaleCmpt.get('padding');
      return {
        signal: "".concat(step.step, " * ").concat(stepCount, " / (1-").concat(exprFromSignalRefOrValue(paddingInner), ")")
      };
    } else {
      return step.step;
    }
  }

  function getOffsetStep(step, offsetScaleType) {
    const stepFor = getStepFor({
      step,
      offsetIsDiscrete: hasDiscreteDomain(offsetScaleType)
    });

    if (stepFor === 'offset') {
      return {
        step: step.step
      };
    }

    return undefined;
  }

  function getOffsetRange(channel, model, offsetScaleType) {
    const positionChannel = channel === XOFFSET ? 'x' : 'y';
    const positionScaleCmpt = model.getScaleComponent(positionChannel);
    const positionScaleType = positionScaleCmpt.get('type');
    const positionScaleName = model.scaleName(positionChannel);

    if (positionScaleType === 'band') {
      const size = getDiscretePositionSize(positionChannel, model.size, model.config.view);

      if (isStep(size)) {
        // step is for offset
        const step = getOffsetStep(size, offsetScaleType);

        if (step) {
          return step;
        }
      } // otherwise use the position


      return [0, {
        signal: "bandwidth('".concat(positionScaleName, "')")
      }];
    } else {
      // continuous scale
      return never("Cannot use ".concat(channel, " scale if ").concat(positionChannel, " scale is not discrete."));
    }
  }

  function getDiscretePositionSize(channel, size, viewConfig) {
    const sizeChannel = channel === X ? 'width' : 'height';
    const sizeValue = size[sizeChannel];

    if (sizeValue) {
      return sizeValue;
    }

    return getViewConfigDiscreteSize(viewConfig, sizeChannel);
  }

  function defaultContinuousToDiscreteCount(scaleType, config, domain, channel) {
    switch (scaleType) {
      case 'quantile':
        return config.scale.quantileCount;

      case 'quantize':
        return config.scale.quantizeCount;

      case 'threshold':
        if (domain !== undefined && vega.isArray(domain)) {
          return domain.length + 1;
        } else {
          warn(domainRequiredForThresholdScale(channel)); // default threshold boundaries for threshold scale since domain has cardinality of 2

          return 3;
        }

    }
  }
  /**
   * Returns the linear interpolation of the range according to the cardinality
   *
   * @param rangeMin start of the range
   * @param rangeMax end of the range
   * @param cardinality number of values in the output range
   */

  function interpolateRange(rangeMin, rangeMax, cardinality) {
    // always return a signal since it's better to compute the sequence in Vega later
    const f = () => {
      const rMax = signalOrStringValue(rangeMax);
      const rMin = signalOrStringValue(rangeMin);
      const step = "(".concat(rMax, " - ").concat(rMin, ") / (").concat(cardinality, " - 1)");
      return "sequence(".concat(rMin, ", ").concat(rMax, " + ").concat(step, ", ").concat(step, ")");
    };

    if (isSignalRef(rangeMax)) {
      return new SignalRefWrapper(f);
    } else {
      return {
        signal: f()
      };
    }
  }

  function sizeRangeMin(mark, zero, config) {
    if (zero) {
      if (isSignalRef(zero)) {
        return {
          signal: "".concat(zero.signal, " ? 0 : ").concat(sizeRangeMin(mark, false, config))
        };
      } else {
        return 0;
      }
    }

    switch (mark) {
      case 'bar':
      case 'tick':
        return config.scale.minBandSize;

      case 'line':
      case 'trail':
      case 'rule':
        return config.scale.minStrokeWidth;

      case 'text':
        return config.scale.minFontSize;

      case 'point':
      case 'square':
      case 'circle':
        return config.scale.minSize;
    }
    /* istanbul ignore next: should never reach here */
    // sizeRangeMin not implemented for the mark


    throw new Error(incompatibleChannel('size', mark));
  }

  const MAX_SIZE_RANGE_STEP_RATIO = 0.95;

  function sizeRangeMax(mark, size, model, config) {
    const xyStepSignals = {
      x: getBinStepSignal(model, 'x'),
      y: getBinStepSignal(model, 'y')
    };

    switch (mark) {
      case 'bar':
      case 'tick':
        {
          if (config.scale.maxBandSize !== undefined) {
            return config.scale.maxBandSize;
          }

          const min = minXYStep(size, xyStepSignals, config.view);

          if (vega.isNumber(min)) {
            return min - 1;
          } else {
            return new SignalRefWrapper(() => "".concat(min.signal, " - 1"));
          }
        }

      case 'line':
      case 'trail':
      case 'rule':
        return config.scale.maxStrokeWidth;

      case 'text':
        return config.scale.maxFontSize;

      case 'point':
      case 'square':
      case 'circle':
        {
          if (config.scale.maxSize) {
            return config.scale.maxSize;
          }

          const pointStep = minXYStep(size, xyStepSignals, config.view);

          if (vega.isNumber(pointStep)) {
            return Math.pow(MAX_SIZE_RANGE_STEP_RATIO * pointStep, 2);
          } else {
            return new SignalRefWrapper(() => "pow(".concat(MAX_SIZE_RANGE_STEP_RATIO, " * ").concat(pointStep.signal, ", 2)"));
          }
        }
    }
    /* istanbul ignore next: should never reach here */
    // sizeRangeMax not implemented for the mark


    throw new Error(incompatibleChannel('size', mark));
  }
  /**
   * @returns {number} Range step of x or y or minimum between the two if both are ordinal scale.
   */


  function minXYStep(size, xyStepSignals, viewConfig) {
    const widthStep = isStep(size.width) ? size.width.step : getViewConfigDiscreteStep(viewConfig, 'width');
    const heightStep = isStep(size.height) ? size.height.step : getViewConfigDiscreteStep(viewConfig, 'height');

    if (xyStepSignals.x || xyStepSignals.y) {
      return new SignalRefWrapper(() => {
        const exprs = [xyStepSignals.x ? xyStepSignals.x.signal : widthStep, xyStepSignals.y ? xyStepSignals.y.signal : heightStep];
        return "min(".concat(exprs.join(', '), ")");
      });
    }

    return Math.min(widthStep, heightStep);
  }

  function parseScaleProperty(model, property) {
    if (isUnitModel(model)) {
      parseUnitScaleProperty(model, property);
    } else {
      parseNonUnitScaleProperty(model, property);
    }
  }

  function parseUnitScaleProperty(model, property) {
    const localScaleComponents = model.component.scales;
    const {
      config,
      encoding,
      markDef,
      specifiedScales
    } = model;

    for (const channel of keys(localScaleComponents)) {
      const specifiedScale = specifiedScales[channel];
      const localScaleCmpt = localScaleComponents[channel];
      const mergedScaleCmpt = model.getScaleComponent(channel);
      const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
      const specifiedValue = specifiedScale[property];
      const scaleType = mergedScaleCmpt.get('type');
      const scalePadding = mergedScaleCmpt.get('padding');
      const scalePaddingInner = mergedScaleCmpt.get('paddingInner');
      const supportedByScaleType = scaleTypeSupportProperty(scaleType, property);
      const channelIncompatability = channelScalePropertyIncompatability(channel, property);

      if (specifiedValue !== undefined) {
        // If there is a specified value, check if it is compatible with scale type and channel
        if (!supportedByScaleType) {
          warn(scalePropertyNotWorkWithScaleType(scaleType, property, channel));
        } else if (channelIncompatability) {
          // channel
          warn(channelIncompatability);
        }
      }

      if (supportedByScaleType && channelIncompatability === undefined) {
        if (specifiedValue !== undefined) {
          const timeUnit = fieldOrDatumDef['timeUnit'];
          const type = fieldOrDatumDef.type;

          switch (property) {
            // domainMax/Min to signal if the value is a datetime object
            case 'domainMax':
            case 'domainMin':
              if (isDateTime(specifiedScale[property]) || type === 'temporal' || timeUnit) {
                localScaleCmpt.set(property, {
                  signal: valueExpr(specifiedScale[property], {
                    type,
                    timeUnit
                  })
                }, true);
              } else {
                localScaleCmpt.set(property, specifiedScale[property], true);
              }

              break;

            default:
              localScaleCmpt.copyKeyFromObject(property, specifiedScale);
          }
        } else {
          const value = property in scaleRules ? scaleRules[property]({
            model,
            channel,
            fieldOrDatumDef,
            scaleType,
            scalePadding,
            scalePaddingInner,
            domain: specifiedScale.domain,
            domainMin: specifiedScale.domainMin,
            domainMax: specifiedScale.domainMax,
            markDef,
            config,
            hasNestedOffsetScale: channelHasNestedOffsetScale(encoding, channel)
          }) : config.scale[property];

          if (value !== undefined) {
            localScaleCmpt.set(property, value, false);
          }
        }
      }
    }
  }

  const scaleRules = {
    bins: _ref => {
      let {
        model,
        fieldOrDatumDef
      } = _ref;
      return isFieldDef(fieldOrDatumDef) ? bins(model, fieldOrDatumDef) : undefined;
    },
    interpolate: _ref2 => {
      let {
        channel,
        fieldOrDatumDef
      } = _ref2;
      return interpolate(channel, fieldOrDatumDef.type);
    },
    nice: _ref3 => {
      let {
        scaleType,
        channel,
        domain,
        domainMin,
        domainMax,
        fieldOrDatumDef
      } = _ref3;
      return nice(scaleType, channel, domain, domainMin, domainMax, fieldOrDatumDef);
    },
    padding: _ref4 => {
      let {
        channel,
        scaleType,
        fieldOrDatumDef,
        markDef,
        config
      } = _ref4;
      return padding(channel, scaleType, config.scale, fieldOrDatumDef, markDef, config.bar);
    },
    paddingInner: _ref5 => {
      let {
        scalePadding,
        channel,
        markDef,
        scaleType,
        config,
        hasNestedOffsetScale
      } = _ref5;
      return paddingInner(scalePadding, channel, markDef.type, scaleType, config.scale, hasNestedOffsetScale);
    },
    paddingOuter: _ref6 => {
      let {
        scalePadding,
        channel,
        scaleType,
        scalePaddingInner,
        config,
        hasNestedOffsetScale
      } = _ref6;
      return paddingOuter(scalePadding, channel, scaleType, scalePaddingInner, config.scale, hasNestedOffsetScale);
    },
    reverse: _ref7 => {
      let {
        fieldOrDatumDef,
        scaleType,
        channel,
        config
      } = _ref7;
      const sort = isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : undefined;
      return reverse(scaleType, sort, channel, config.scale);
    },
    zero: _ref8 => {
      let {
        channel,
        fieldOrDatumDef,
        domain,
        markDef,
        scaleType
      } = _ref8;
      return zero(channel, fieldOrDatumDef, domain, markDef, scaleType);
    }
  }; // This method is here rather than in range.ts to avoid circular dependency.

  function parseScaleRange(model) {
    if (isUnitModel(model)) {
      parseUnitScaleRange(model);
    } else {
      parseNonUnitScaleProperty(model, 'range');
    }
  }
  function parseNonUnitScaleProperty(model, property) {
    const localScaleComponents = model.component.scales;

    for (const child of model.children) {
      if (property === 'range') {
        parseScaleRange(child);
      } else {
        parseScaleProperty(child, property);
      }
    }

    for (const channel of keys(localScaleComponents)) {
      let valueWithExplicit;

      for (const child of model.children) {
        const childComponent = child.component.scales[channel];

        if (childComponent) {
          const childValueWithExplicit = childComponent.getWithExplicit(property);
          valueWithExplicit = mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property, 'scale', tieBreakByComparing((v1, v2) => {
            switch (property) {
              case 'range':
                // For step, prefer larger step
                if (v1.step && v2.step) {
                  return v1.step - v2.step;
                }

                return 0;
              // TODO: precedence rule for other properties
            }

            return 0;
          }));
        }
      }

      localScaleComponents[channel].setWithExplicit(property, valueWithExplicit);
    }
  }
  function bins(model, fieldDef) {
    const bin = fieldDef.bin;

    if (isBinning(bin)) {
      const binSignal = getBinSignalName(model, fieldDef.field, bin);
      return new SignalRefWrapper(() => {
        return model.getSignalName(binSignal);
      });
    } else if (isBinned(bin) && isBinParams(bin) && bin.step !== undefined) {
      // start and stop will be determined from the scale domain
      return {
        step: bin.step
      };
    }

    return undefined;
  }
  function interpolate(channel, type) {
    if (contains([COLOR, FILL, STROKE], channel) && type !== 'nominal') {
      return 'hcl';
    }

    return undefined;
  }
  function nice(scaleType, channel, specifiedDomain, domainMin, domainMax, fieldOrDatumDef) {
    var _getFieldDef;

    if ((_getFieldDef = getFieldDef(fieldOrDatumDef)) !== null && _getFieldDef !== void 0 && _getFieldDef.bin || vega.isArray(specifiedDomain) || domainMax != null || domainMin != null || contains([ScaleType.TIME, ScaleType.UTC], scaleType)) {
      return undefined;
    }

    return isXorY(channel) ? true : undefined;
  }
  function padding(channel, scaleType, scaleConfig, fieldOrDatumDef, markDef, barConfig) {
    if (isXorY(channel)) {
      if (isContinuousToContinuous(scaleType)) {
        if (scaleConfig.continuousPadding !== undefined) {
          return scaleConfig.continuousPadding;
        }

        const {
          type,
          orient
        } = markDef;

        if (type === 'bar' && !(isFieldDef(fieldOrDatumDef) && (fieldOrDatumDef.bin || fieldOrDatumDef.timeUnit))) {
          if (orient === 'vertical' && channel === 'x' || orient === 'horizontal' && channel === 'y') {
            return barConfig.continuousBandSize;
          }
        }
      }

      if (scaleType === ScaleType.POINT) {
        return scaleConfig.pointPadding;
      }
    }

    return undefined;
  }
  function paddingInner(paddingValue, channel, mark, scaleType, scaleConfig) {
    let hasNestedOffsetScale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    if (paddingValue !== undefined) {
      // If user has already manually specified "padding", no need to add default paddingInner.
      return undefined;
    }

    if (isXorY(channel)) {
      // Padding is only set for X and Y by default.
      // Basically it doesn't make sense to add padding for color and size.
      // paddingOuter would only be called if it's a band scale, just return the default for bandScale.
      const {
        bandPaddingInner,
        barBandPaddingInner,
        rectBandPaddingInner,
        bandWithNestedOffsetPaddingInner
      } = scaleConfig;

      if (hasNestedOffsetScale) {
        return bandWithNestedOffsetPaddingInner;
      }

      return getFirstDefined(bandPaddingInner, mark === 'bar' ? barBandPaddingInner : rectBandPaddingInner);
    } else if (isXorYOffset(channel)) {
      if (scaleType === ScaleType.BAND) {
        return scaleConfig.offsetBandPaddingInner;
      }
    }

    return undefined;
  }
  function paddingOuter(paddingValue, channel, scaleType, paddingInnerValue, scaleConfig) {
    let hasNestedOffsetScale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    if (paddingValue !== undefined) {
      // If user has already manually specified "padding", no need to add default paddingOuter.
      return undefined;
    }

    if (isXorY(channel)) {
      const {
        bandPaddingOuter,
        bandWithNestedOffsetPaddingOuter
      } = scaleConfig;

      if (hasNestedOffsetScale) {
        return bandWithNestedOffsetPaddingOuter;
      } // Padding is only set for X and Y by default.
      // Basically it doesn't make sense to add padding for color and size.


      if (scaleType === ScaleType.BAND) {
        return getFirstDefined(bandPaddingOuter,
        /* By default, paddingOuter is paddingInner / 2. The reason is that
          size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
          and we want the width/height to be integer by default.
          Note that step (by default) and cardinality are integers.) */
        isSignalRef(paddingInnerValue) ? {
          signal: "".concat(paddingInnerValue.signal, "/2")
        } : paddingInnerValue / 2);
      }
    } else if (isXorYOffset(channel)) {
      if (scaleType === ScaleType.POINT) {
        return 0.5; // so the point positions align with centers of band scales.
      } else if (scaleType === ScaleType.BAND) {
        return scaleConfig.offsetBandPaddingOuter;
      }
    }

    return undefined;
  }
  function reverse(scaleType, sort, channel, scaleConfig) {
    if (channel === 'x' && scaleConfig.xReverse !== undefined) {
      if (hasContinuousDomain(scaleType) && sort === 'descending') {
        if (isSignalRef(scaleConfig.xReverse)) {
          return {
            signal: "!".concat(scaleConfig.xReverse.signal)
          };
        } else {
          return !scaleConfig.xReverse;
        }
      }

      return scaleConfig.xReverse;
    }

    if (hasContinuousDomain(scaleType) && sort === 'descending') {
      // For continuous domain scales, Vega does not support domain sort.
      // Thus, we reverse range instead if sort is descending
      return true;
    }

    return undefined;
  }
  function zero(channel, fieldDef, specifiedDomain, markDef, scaleType) {
    // If users explicitly provide a domain, we should not augment zero as that will be unexpected.
    const hasCustomDomain = !!specifiedDomain && specifiedDomain !== 'unaggregated';

    if (hasCustomDomain) {
      if (hasContinuousDomain(scaleType)) {
        if (vega.isArray(specifiedDomain)) {
          const first = specifiedDomain[0];
          const last = specifiedDomain[specifiedDomain.length - 1];

          if (first <= 0 && last >= 0) {
            // if the domain includes zero, make zero remains true
            return true;
          }
        }

        return false;
      }
    } // If there is no custom domain, return true only for the following cases:
    // 1) using quantitative field with size
    // While this can be either ratio or interval fields, our assumption is that
    // ratio are more common. However, if the scaleType is discretizing scale, we want to return
    // false so that range doesn't start at zero


    if (channel === 'size' && fieldDef.type === 'quantitative' && !isContinuousToDiscrete(scaleType)) {
      return true;
    } // 2) non-binned, quantitative x-scale or y-scale
    // (For binning, we should not include zero by default because binning are calculated without zero.)


    if (!(isFieldDef(fieldDef) && fieldDef.bin) && contains([...POSITION_SCALE_CHANNELS, ...POLAR_POSITION_SCALE_CHANNELS], channel)) {
      const {
        orient,
        type
      } = markDef;

      if (contains(['bar', 'area', 'line', 'trail'], type)) {
        if (orient === 'horizontal' && channel === 'y' || orient === 'vertical' && channel === 'x') {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  /**
   * Determine if there is a specified scale type and if it is appropriate,
   * or determine default type if type is unspecified or inappropriate.
   */
  // NOTE: CompassQL uses this method.
  function scaleType(specifiedScale, channel, fieldDef, mark) {
    let hasNestedOffsetScale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    const defaultScaleType = defaultType(channel, fieldDef, mark, hasNestedOffsetScale);
    const {
      type
    } = specifiedScale;

    if (!isScaleChannel(channel)) {
      // There is no scale for these channels
      return null;
    }

    if (type !== undefined) {
      // Check if explicitly specified scale type is supported by the channel
      if (!channelSupportScaleType(channel, type)) {
        warn(scaleTypeNotWorkWithChannel(channel, type, defaultScaleType));
        return defaultScaleType;
      } // Check if explicitly specified scale type is supported by the data type


      if (isFieldDef(fieldDef) && !scaleTypeSupportDataType(type, fieldDef.type)) {
        warn(scaleTypeNotWorkWithFieldDef(type, defaultScaleType));
        return defaultScaleType;
      }

      return type;
    }

    return defaultScaleType;
  }
  /**
   * Determine appropriate default scale type.
   */
  // NOTE: Voyager uses this method.

  function defaultType(channel, fieldDef, mark, hasNestedOffsetScale) {
    switch (fieldDef.type) {
      case 'nominal':
      case 'ordinal':
        {
          var _fieldDef$axis;

          if (isColorChannel(channel) || rangeType(channel) === 'discrete') {
            if (channel === 'shape' && fieldDef.type === 'ordinal') {
              warn(discreteChannelCannotEncode(channel, 'ordinal'));
            }

            return 'ordinal';
          }

          if (isXorY(channel) || isXorYOffset(channel)) {
            if (contains(['rect', 'bar', 'image', 'rule'], mark.type)) {
              // The rect/bar mark should fit into a band.
              // For rule, using band scale to make rule align with axis ticks better https://github.com/vega/vega-lite/issues/3429
              return 'band';
            }

            if (hasNestedOffsetScale) {
              // If there is a nested offset scale, then there is a "band" for the span of the nested scale.
              return 'band';
            }
          } else if (mark.type === 'arc' && channel in POLAR_POSITION_SCALE_CHANNEL_INDEX) {
            return 'band';
          }

          const dimensionSize = mark[getSizeChannel(channel)];

          if (isRelativeBandSize(dimensionSize)) {
            return 'band';
          }

          if (isPositionFieldOrDatumDef(fieldDef) && (_fieldDef$axis = fieldDef.axis) !== null && _fieldDef$axis !== void 0 && _fieldDef$axis.tickBand) {
            return 'band';
          } // Otherwise, use ordinal point scale so we can easily get center positions of the marks.


          return 'point';
        }

      case 'temporal':
        if (isColorChannel(channel)) {
          return 'time';
        } else if (rangeType(channel) === 'discrete') {
          warn(discreteChannelCannotEncode(channel, 'temporal')); // TODO: consider using quantize (equivalent to binning) once we have it

          return 'ordinal';
        } else if (isFieldDef(fieldDef) && fieldDef.timeUnit && normalizeTimeUnit(fieldDef.timeUnit).utc) {
          return 'utc';
        }

        return 'time';

      case 'quantitative':
        if (isColorChannel(channel)) {
          if (isFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
            return 'bin-ordinal';
          }

          return 'linear';
        } else if (rangeType(channel) === 'discrete') {
          warn(discreteChannelCannotEncode(channel, 'quantitative')); // TODO: consider using quantize (equivalent to binning) once we have it

          return 'ordinal';
        }

        return 'linear';

      case 'geojson':
        return undefined;
    }
    /* istanbul ignore next: should never reach this */


    throw new Error(invalidFieldType(fieldDef.type));
  }

  function parseScales(model) {
    let {
      ignoreRange
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    parseScaleCore(model);
    parseScaleDomain(model);

    for (const prop of NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES) {
      parseScaleProperty(model, prop);
    }

    if (!ignoreRange) {
      // range depends on zero
      parseScaleRange(model);
    }
  }
  function parseScaleCore(model) {
    if (isUnitModel(model)) {
      model.component.scales = parseUnitScaleCore(model);
    } else {
      model.component.scales = parseNonUnitScaleCore(model);
    }
  }
  /**
   * Parse scales for all channels of a model.
   */

  function parseUnitScaleCore(model) {
    const {
      encoding,
      mark,
      markDef
    } = model;
    const scaleComponents = {};

    for (const channel of SCALE_CHANNELS) {
      const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]); // must be typed def to have scale
      // Don't generate scale for shape of geoshape

      if (fieldOrDatumDef && mark === GEOSHAPE && channel === SHAPE && fieldOrDatumDef.type === GEOJSON) {
        continue;
      }

      let specifiedScale = fieldOrDatumDef && fieldOrDatumDef['scale'];

      if (isXorYOffset(channel)) {
        const mainChannel = getMainChannelFromOffsetChannel(channel);

        if (!channelHasNestedOffsetScale(encoding, mainChannel)) {
          // Don't generate scale when the offset encoding shouldn't yield a nested scale
          if (specifiedScale) {
            warn(offsetEncodingScaleIgnored(channel));
          }

          continue;
        }
      }

      if (fieldOrDatumDef && specifiedScale !== null && specifiedScale !== false) {
        var _specifiedScale;

        (_specifiedScale = specifiedScale) !== null && _specifiedScale !== void 0 ? _specifiedScale : specifiedScale = {};
        const hasNestedOffsetScale = channelHasNestedOffsetScale(encoding, channel);
        const sType = scaleType(specifiedScale, channel, fieldOrDatumDef, markDef, hasNestedOffsetScale);
        scaleComponents[channel] = new ScaleComponent(model.scaleName("".concat(channel), true), {
          value: sType,
          explicit: specifiedScale.type === sType
        });
      }
    }

    return scaleComponents;
  }

  const scaleTypeTieBreaker = tieBreakByComparing((st1, st2) => scaleTypePrecedence(st1) - scaleTypePrecedence(st2));

  function parseNonUnitScaleCore(model) {
    const scaleComponents = model.component.scales = {};
    const scaleTypeWithExplicitIndex = {};
    const resolve = model.component.resolve; // Parse each child scale and determine if a particular channel can be merged.

    for (const child of model.children) {
      parseScaleCore(child); // Instead of always merging right away -- check if it is compatible to merge first!

      for (const channel of keys(child.component.scales)) {
        var _resolve$scale, _resolve$scale$channe;

        // if resolve is undefined, set default first
        (_resolve$scale$channe = (_resolve$scale = resolve.scale)[channel]) !== null && _resolve$scale$channe !== void 0 ? _resolve$scale$channe : _resolve$scale[channel] = defaultScaleResolve(channel, model);

        if (resolve.scale[channel] === 'shared') {
          const explicitScaleType = scaleTypeWithExplicitIndex[channel];
          const childScaleType = child.component.scales[channel].getWithExplicit('type');

          if (explicitScaleType) {
            if (scaleCompatible(explicitScaleType.value, childScaleType.value)) {
              // merge scale component if type are compatible
              scaleTypeWithExplicitIndex[channel] = mergeValuesWithExplicit(explicitScaleType, childScaleType, 'type', 'scale', scaleTypeTieBreaker);
            } else {
              // Otherwise, update conflicting channel to be independent
              resolve.scale[channel] = 'independent'; // Remove from the index so they don't get merged

              delete scaleTypeWithExplicitIndex[channel];
            }
          } else {
            scaleTypeWithExplicitIndex[channel] = childScaleType;
          }
        }
      }
    } // Merge each channel listed in the index


    for (const channel of keys(scaleTypeWithExplicitIndex)) {
      // Create new merged scale component
      const name = model.scaleName(channel, true);
      const typeWithExplicit = scaleTypeWithExplicitIndex[channel];
      scaleComponents[channel] = new ScaleComponent(name, typeWithExplicit); // rename each child and mark them as merged

      for (const child of model.children) {
        const childScale = child.component.scales[channel];

        if (childScale) {
          child.renameScale(childScale.get('name'), name);
          childScale.merged = true;
        }
      }
    }

    return scaleComponents;
  }

  class NameMap {
    constructor() {
      _defineProperty(this, "nameMap", void 0);

      this.nameMap = {};
    }

    rename(oldName, newName) {
      this.nameMap[oldName] = newName;
    }

    has(name) {
      return this.nameMap[name] !== undefined;
    }

    get(name) {
      // If the name appears in the _nameMap, we need to read its new name.
      // We have to loop over the dict just in case the new name also gets renamed.
      while (this.nameMap[name] && name !== this.nameMap[name]) {
        name = this.nameMap[name];
      }

      return name;
    }

  }
  /*
    We use type guards instead of `instanceof` as `instanceof` makes
    different parts of the compiler depend on the actual implementation of
    the model classes, which in turn depend on different parts of the compiler.
    Thus, `instanceof` leads to circular dependency problems.

    On the other hand, type guards only make different parts of the compiler
    depend on the type of the model classes, but not the actual implementation.
  */

  function isUnitModel(model) {
    return (model === null || model === void 0 ? void 0 : model.type) === 'unit';
  }
  function isFacetModel(model) {
    return (model === null || model === void 0 ? void 0 : model.type) === 'facet';
  }
  function isConcatModel(model) {
    return (model === null || model === void 0 ? void 0 : model.type) === 'concat';
  }
  function isLayerModel(model) {
    return (model === null || model === void 0 ? void 0 : model.type) === 'layer';
  }
  class Model {
    /** Name map for scales, which can be renamed by a model's parent. */

    /** Name map for projections, which can be renamed by a model's parent. */

    /** Name map for signals, which can be renamed by a model's parent. */
    constructor(spec, type, parent, parentGivenName, config, resolve, view) {
      var _spec$name, _spec$transform;

      this.type = type;
      this.parent = parent;
      this.config = config;

      _defineProperty(this, "name", void 0);

      _defineProperty(this, "size", void 0);

      _defineProperty(this, "title", void 0);

      _defineProperty(this, "description", void 0);

      _defineProperty(this, "data", void 0);

      _defineProperty(this, "transforms", void 0);

      _defineProperty(this, "layout", void 0);

      _defineProperty(this, "scaleNameMap", void 0);

      _defineProperty(this, "projectionNameMap", void 0);

      _defineProperty(this, "signalNameMap", void 0);

      _defineProperty(this, "component", void 0);

      _defineProperty(this, "view", void 0);

      _defineProperty(this, "children", void 0);

      _defineProperty(this, "correctDataNames", mark => {
        var _mark$from, _mark$from2, _mark$from2$facet;

        // TODO: make this correct
        // for normal data references
        if ((_mark$from = mark.from) !== null && _mark$from !== void 0 && _mark$from.data) {
          mark.from.data = this.lookupDataSource(mark.from.data);
        } // for access to facet data


        if ((_mark$from2 = mark.from) !== null && _mark$from2 !== void 0 && (_mark$from2$facet = _mark$from2.facet) !== null && _mark$from2$facet !== void 0 && _mark$from2$facet.data) {
          mark.from.facet.data = this.lookupDataSource(mark.from.facet.data);
        }

        return mark;
      });

      this.parent = parent;
      this.config = config;
      this.view = replaceExprRef(view); // If name is not provided, always use parent's givenName to avoid name conflicts.

      this.name = (_spec$name = spec.name) !== null && _spec$name !== void 0 ? _spec$name : parentGivenName;
      this.title = isText(spec.title) ? {
        text: spec.title
      } : spec.title ? replaceExprRef(spec.title) : undefined; // Shared name maps

      this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap();
      this.projectionNameMap = parent ? parent.projectionNameMap : new NameMap();
      this.signalNameMap = parent ? parent.signalNameMap : new NameMap();
      this.data = spec.data;
      this.description = spec.description;
      this.transforms = normalizeTransform((_spec$transform = spec.transform) !== null && _spec$transform !== void 0 ? _spec$transform : []);
      this.layout = type === 'layer' || type === 'unit' ? {} : extractCompositionLayout(spec, type, config);
      this.component = {
        data: {
          sources: parent ? parent.component.data.sources : [],
          outputNodes: parent ? parent.component.data.outputNodes : {},
          outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
          // data is faceted if the spec is a facet spec or the parent has faceted data and data is undefined
          isFaceted: isFacetSpec(spec) || (parent === null || parent === void 0 ? void 0 : parent.component.data.isFaceted) && spec.data === undefined
        },
        layoutSize: new Split(),
        layoutHeaders: {
          row: {},
          column: {},
          facet: {}
        },
        mark: null,
        resolve: {
          scale: {},
          axis: {},
          legend: {},
          ...(resolve ? duplicate(resolve) : {})
        },
        selection: null,
        scales: null,
        projection: null,
        axes: {},
        legends: {}
      };
    }

    get width() {
      return this.getSizeSignalRef('width');
    }

    get height() {
      return this.getSizeSignalRef('height');
    }

    parse() {
      this.parseScale();
      this.parseLayoutSize(); // depends on scale

      this.renameTopLevelLayoutSizeSignal();
      this.parseSelections();
      this.parseProjection();
      this.parseData(); // (pathorder) depends on markDef; selection filters depend on parsed selections; depends on projection because some transforms require the finalized projection name.

      this.parseAxesAndHeaders(); // depends on scale and layout size

      this.parseLegends(); // depends on scale, markDef

      this.parseMarkGroup(); // depends on data name, scale, layout size, axisGroup, and children's scale, axis, legend and mark.
    }

    parseScale() {
      parseScales(this);
    }

    parseProjection() {
      parseProjection(this);
    }

    /**
     * Rename top-level spec's size to be just width / height, ignoring model name.
     * This essentially merges the top-level spec's width/height signals with the width/height signals
     * to help us reduce redundant signals declaration.
     */
    renameTopLevelLayoutSizeSignal() {
      if (this.getName('width') !== 'width') {
        this.renameSignal(this.getName('width'), 'width');
      }

      if (this.getName('height') !== 'height') {
        this.renameSignal(this.getName('height'), 'height');
      }
    }

    parseLegends() {
      parseLegend(this);
    }

    assembleEncodeFromView(view) {
      // Exclude "style"
      const {
        style: _,
        ...baseView
      } = view;
      const e = {};

      for (const property of keys(baseView)) {
        const value = baseView[property];

        if (value !== undefined) {
          e[property] = signalOrValueRef(value);
        }
      }

      return e;
    }

    assembleGroupEncodeEntry(isTopLevel) {
      let encodeEntry = {};

      if (this.view) {
        encodeEntry = this.assembleEncodeFromView(this.view);
      }

      if (!isTopLevel) {
        // Descriptions are already added to the top-level description so we only need to add them to the inner views.
        if (this.description) {
          encodeEntry['description'] = signalOrValueRef(this.description);
        } // For top-level spec, we can set the global width and height signal to adjust the group size.
        // For other child specs, we have to manually set width and height in the encode entry.


        if (this.type === 'unit' || this.type === 'layer') {
          var _encodeEntry;

          return {
            width: this.getSizeSignalRef('width'),
            height: this.getSizeSignalRef('height'),
            ...((_encodeEntry = encodeEntry) !== null && _encodeEntry !== void 0 ? _encodeEntry : {})
          };
        }
      }

      return isEmpty(encodeEntry) ? undefined : encodeEntry;
    }

    assembleLayout() {
      if (!this.layout) {
        return undefined;
      }

      const {
        spacing,
        ...layout
      } = this.layout;
      const {
        component,
        config
      } = this;
      const titleBand = assembleLayoutTitleBand(component.layoutHeaders, config);
      return {
        padding: spacing,
        ...this.assembleDefaultLayout(),
        ...layout,
        ...(titleBand ? {
          titleBand
        } : {})
      };
    }

    assembleDefaultLayout() {
      return {};
    }

    assembleHeaderMarks() {
      const {
        layoutHeaders
      } = this.component;
      let headerMarks = [];

      for (const channel of FACET_CHANNELS) {
        if (layoutHeaders[channel].title) {
          headerMarks.push(assembleTitleGroup(this, channel));
        }
      }

      for (const channel of HEADER_CHANNELS) {
        headerMarks = headerMarks.concat(assembleHeaderGroups(this, channel));
      }

      return headerMarks;
    }

    assembleAxes() {
      return assembleAxes(this.component.axes, this.config);
    }

    assembleLegends() {
      return assembleLegends(this);
    }

    assembleProjections() {
      return assembleProjections(this);
    }

    assembleTitle() {
      var _this$title;

      const {
        encoding,
        ...titleNoEncoding
      } = (_this$title = this.title) !== null && _this$title !== void 0 ? _this$title : {};
      const title = { ...extractTitleConfig(this.config.title).nonMarkTitleProperties,
        ...titleNoEncoding,
        ...(encoding ? {
          encode: {
            update: encoding
          }
        } : {})
      };

      if (title.text) {
        if (contains(['unit', 'layer'], this.type)) {
          // Unit/Layer
          if (contains(['middle', undefined], title.anchor)) {
            var _title$frame;

            (_title$frame = title.frame) !== null && _title$frame !== void 0 ? _title$frame : title.frame = 'group';
          }
        } else {
          var _title$anchor;

          // composition with Vega layout
          // Set title = "start" by default for composition as "middle" does not look nice
          // https://github.com/vega/vega/issues/960#issuecomment-471360328
          (_title$anchor = title.anchor) !== null && _title$anchor !== void 0 ? _title$anchor : title.anchor = 'start';
        }

        return isEmpty(title) ? undefined : title;
      }

      return undefined;
    }
    /**
     * Assemble the mark group for this model. We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
     */


    assembleGroup() {
      let signals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      const group = {};
      signals = signals.concat(this.assembleSignals());

      if (signals.length > 0) {
        group.signals = signals;
      }

      const layout = this.assembleLayout();

      if (layout) {
        group.layout = layout;
      }

      group.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks()); // Only include scales if this spec is top-level or if parent is facet.
      // (Otherwise, it will be merged with upper-level's scope.)

      const scales = !this.parent || isFacetModel(this.parent) ? assembleScales(this) : [];

      if (scales.length > 0) {
        group.scales = scales;
      }

      const axes = this.assembleAxes();

      if (axes.length > 0) {
        group.axes = axes;
      }

      const legends = this.assembleLegends();

      if (legends.length > 0) {
        group.legends = legends;
      }

      return group;
    }

    getName(text) {
      return varName((this.name ? "".concat(this.name, "_") : '') + text);
    }

    getDataName(type) {
      return this.getName(DataSourceType[type].toLowerCase());
    }
    /**
     * Request a data source name for the given data source type and mark that data source as required.
     * This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
     * You can lookup the correct dataset name in assemble with `lookupDataSource`.
     */


    requestDataName(name) {
      const fullName = this.getDataName(name); // Increase ref count. This is critical because otherwise we won't create a data source.
      // We also increase the ref counts on OutputNode.getSource() calls.

      const refCounts = this.component.data.outputNodeRefCounts;
      refCounts[fullName] = (refCounts[fullName] || 0) + 1;
      return fullName;
    }

    getSizeSignalRef(layoutSizeType) {
      if (isFacetModel(this.parent)) {
        const sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType);
        const channel = getPositionScaleChannel(sizeType);
        const scaleComponent = this.component.scales[channel];

        if (scaleComponent && !scaleComponent.merged) {
          // independent scale
          const type = scaleComponent.get('type');
          const range = scaleComponent.get('range');

          if (hasDiscreteDomain(type) && isVgRangeStep(range)) {
            const scaleName = scaleComponent.get('name');
            const domain = assembleDomain(this, channel);
            const field = getFieldFromDomain(domain);

            if (field) {
              const fieldRef = vgField({
                aggregate: 'distinct',
                field
              }, {
                expr: 'datum'
              });
              return {
                signal: sizeExpr(scaleName, scaleComponent, fieldRef)
              };
            } else {
              warn(unknownField(channel));
              return null;
            }
          }
        }
      }

      return {
        signal: this.signalNameMap.get(this.getName(layoutSizeType))
      };
    }
    /**
     * Lookup the name of the datasource for an output node. You probably want to call this in assemble.
     */


    lookupDataSource(name) {
      const node = this.component.data.outputNodes[name];

      if (!node) {
        // Name not found in map so let's just return what we got.
        // This can happen if we already have the correct name.
        return name;
      }

      return node.getSource();
    }

    getSignalName(oldSignalName) {
      return this.signalNameMap.get(oldSignalName);
    }

    renameSignal(oldName, newName) {
      this.signalNameMap.rename(oldName, newName);
    }

    renameScale(oldName, newName) {
      this.scaleNameMap.rename(oldName, newName);
    }

    renameProjection(oldName, newName) {
      this.projectionNameMap.rename(oldName, newName);
    }
    /**
     * @return scale name for a given channel after the scale has been parsed and named.
     */


    scaleName(originalScaleName, parse) {
      if (parse) {
        // During the parse phase always return a value
        // No need to refer to rename map because a scale can't be renamed
        // before it has the original name.
        return this.getName(originalScaleName);
      } // If there is a scale for the channel, it should either
      // be in the scale component or exist in the name map


      if ( // If there is a scale for the channel, there should be a local scale component for it
      isChannel(originalScaleName) && isScaleChannel(originalScaleName) && this.component.scales[originalScaleName] || // in the scale name map (the scale get merged by its parent)
      this.scaleNameMap.has(this.getName(originalScaleName))) {
        return this.scaleNameMap.get(this.getName(originalScaleName));
      }

      return undefined;
    }
    /**
     * @return projection name after the projection has been parsed and named.
     */


    projectionName(parse) {
      if (parse) {
        // During the parse phase always return a value
        // No need to refer to rename map because a projection can't be renamed
        // before it has the original name.
        return this.getName('projection');
      }

      if (this.component.projection && !this.component.projection.merged || this.projectionNameMap.has(this.getName('projection'))) {
        return this.projectionNameMap.get(this.getName('projection'));
      }

      return undefined;
    }
    /**
     * Corrects the data references in marks after assemble.
     */


    /**
     * Traverse a model's hierarchy to get the scale component for a particular channel.
     */
    getScaleComponent(channel) {
      /* istanbul ignore next: This is warning for debugging test */
      if (!this.component.scales) {
        throw new Error('getScaleComponent cannot be called before parseScale(). Make sure you have called parseScale or use parseUnitModelWithScale().');
      }

      const localScaleComponent = this.component.scales[channel];

      if (localScaleComponent && !localScaleComponent.merged) {
        return localScaleComponent;
      }

      return this.parent ? this.parent.getScaleComponent(channel) : undefined;
    }
    /**
     * Traverse a model's hierarchy to get a particular selection component.
     */


    getSelectionComponent(variableName, origName) {
      let sel = this.component.selection[variableName];

      if (!sel && this.parent) {
        sel = this.parent.getSelectionComponent(variableName, origName);
      }

      if (!sel) {
        throw new Error(selectionNotFound(origName));
      }

      return sel;
    }
    /**
     * Returns true if the model has a signalRef for an axis orient.
     */


    hasAxisOrientSignalRef() {
      var _this$component$axes$, _this$component$axes$2;

      return ((_this$component$axes$ = this.component.axes.x) === null || _this$component$axes$ === void 0 ? void 0 : _this$component$axes$.some(a => a.hasOrientSignalRef())) || ((_this$component$axes$2 = this.component.axes.y) === null || _this$component$axes$2 === void 0 ? void 0 : _this$component$axes$2.some(a => a.hasOrientSignalRef()));
    }

  }
  /** Abstract class for UnitModel and FacetModel. Both of which can contain fieldDefs as a part of its own specification. */

  class ModelWithField extends Model {
    /** Get "field" reference for Vega */
    vgField(channel) {
      let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const fieldDef = this.fieldDef(channel);

      if (!fieldDef) {
        return undefined;
      }

      return vgField(fieldDef, opt);
    }

    reduceFieldDef(f, init) {
      return reduce(this.getMapping(), (acc, cd, c) => {
        const fieldDef = getFieldDef(cd);

        if (fieldDef) {
          return f(acc, fieldDef, c);
        }

        return acc;
      }, init);
    }

    forEachFieldDef(f, t) {
      forEach(this.getMapping(), (cd, c) => {
        const fieldDef = getFieldDef(cd);

        if (fieldDef) {
          f(fieldDef, c);
        }
      }, t);
    }

  }

  /**
   * A class for density transform nodes
   */

  class DensityTransformNode extends DataFlowNode {
    clone() {
      return new DensityTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      var _this$transform$as, _specifiedAs$, _specifiedAs$2;

      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const specifiedAs = (_this$transform$as = this.transform.as) !== null && _this$transform$as !== void 0 ? _this$transform$as : [undefined, undefined];
      this.transform.as = [(_specifiedAs$ = specifiedAs[0]) !== null && _specifiedAs$ !== void 0 ? _specifiedAs$ : 'value', (_specifiedAs$2 = specifiedAs[1]) !== null && _specifiedAs$2 !== void 0 ? _specifiedAs$2 : 'density'];
    }

    dependentFields() {
      var _this$transform$group;

      return new Set([this.transform.density, ...((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : [])]);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "DensityTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        density,
        ...rest
      } = this.transform;
      const result = {
        type: 'kde',
        field: density,
        ...rest
      };
      return result;
    }

  }

  class FilterInvalidNode extends DataFlowNode {
    clone() {
      return new FilterInvalidNode(null, { ...this.filter
      });
    }

    constructor(parent, filter) {
      super(parent);
      this.filter = filter;
    }

    static make(parent, model) {
      const {
        config,
        mark,
        markDef
      } = model;
      const invalid = getMarkPropOrConfig('invalid', markDef, config);

      if (invalid !== 'filter') {
        return null;
      }

      const filter = model.reduceFieldDef((aggregator, fieldDef, channel) => {
        const scaleComponent = isScaleChannel(channel) && model.getScaleComponent(channel);

        if (scaleComponent) {
          const scaleType = scaleComponent.get('type'); // While discrete domain scales can handle invalid values, continuous scales can't.
          // Thus, for non-path marks, we have to filter null for scales with continuous domains.
          // (For path marks, we will use "defined" property and skip these values instead.)

          if (hasContinuousDomain(scaleType) && fieldDef.aggregate !== 'count' && !isPathMark(mark)) {
            aggregator[fieldDef.field] = fieldDef; // we know that the fieldDef is a typed field def
          }
        }

        return aggregator;
      }, {});

      if (!keys(filter).length) {
        return null;
      }

      return new FilterInvalidNode(parent, filter);
    }

    dependentFields() {
      return new Set(keys(this.filter));
    }

    producedFields() {
      return new Set(); // filter does not produce any new fields
    }

    hash() {
      return "FilterInvalid ".concat(hash(this.filter));
    }
    /**
     * Create the VgTransforms for each of the filtered fields.
     */


    assemble() {
      const filters = keys(this.filter).reduce((vegaFilters, field) => {
        const fieldDef = this.filter[field];
        const ref = vgField(fieldDef, {
          expr: 'datum'
        });

        if (fieldDef !== null) {
          if (fieldDef.type === 'temporal') {
            vegaFilters.push("(isDate(".concat(ref, ") || (isValid(").concat(ref, ") && isFinite(+").concat(ref, ")))"));
          } else if (fieldDef.type === 'quantitative') {
            vegaFilters.push("isValid(".concat(ref, ")"));
            vegaFilters.push("isFinite(+".concat(ref, ")"));
          } else ;
        }

        return vegaFilters;
      }, []);
      return filters.length > 0 ? {
        type: 'filter',
        expr: filters.join(' && ')
      } : null;
    }

  }

  /**
   * A class for flatten transform nodes
   */

  class FlattenTransformNode extends DataFlowNode {
    clone() {
      return new FlattenTransformNode(this.parent, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const {
        flatten,
        as = []
      } = this.transform;
      this.transform.as = flatten.map((f, i) => {
        var _as$i;

        return (_as$i = as[i]) !== null && _as$i !== void 0 ? _as$i : f;
      });
    }

    dependentFields() {
      return new Set(this.transform.flatten);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "FlattenTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        flatten: fields,
        as
      } = this.transform;
      const result = {
        type: 'flatten',
        fields,
        as
      };
      return result;
    }

  }

  /**
   * A class for flatten transform nodes
   */

  class FoldTransformNode extends DataFlowNode {
    clone() {
      return new FoldTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      var _this$transform$as, _specifiedAs$, _specifiedAs$2;

      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const specifiedAs = (_this$transform$as = this.transform.as) !== null && _this$transform$as !== void 0 ? _this$transform$as : [undefined, undefined];
      this.transform.as = [(_specifiedAs$ = specifiedAs[0]) !== null && _specifiedAs$ !== void 0 ? _specifiedAs$ : 'key', (_specifiedAs$2 = specifiedAs[1]) !== null && _specifiedAs$2 !== void 0 ? _specifiedAs$2 : 'value'];
    }

    dependentFields() {
      return new Set(this.transform.fold);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "FoldTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        fold,
        as
      } = this.transform;
      const result = {
        type: 'fold',
        fields: fold,
        as
      };
      return result;
    }

  }

  class GeoJSONNode extends DataFlowNode {
    clone() {
      return new GeoJSONNode(null, duplicate(this.fields), this.geojson, this.signal);
    }

    static parseAll(parent, model) {
      if (model.component.projection && !model.component.projection.isFit) {
        return parent;
      }

      let geoJsonCounter = 0;

      for (const coordinates of [[LONGITUDE, LATITUDE], [LONGITUDE2, LATITUDE2]]) {
        const pair = coordinates.map(channel => {
          const def = getFieldOrDatumDef(model.encoding[channel]);
          return isFieldDef(def) ? def.field : isDatumDef(def) ? {
            expr: "".concat(def.datum)
          } : isValueDef(def) ? {
            expr: "".concat(def['value'])
          } : undefined;
        });

        if (pair[0] || pair[1]) {
          parent = new GeoJSONNode(parent, pair, null, model.getName("geojson_".concat(geoJsonCounter++)));
        }
      }

      if (model.channelHasField(SHAPE)) {
        const fieldDef = model.typedFieldDef(SHAPE);

        if (fieldDef.type === GEOJSON) {
          parent = new GeoJSONNode(parent, null, fieldDef.field, model.getName("geojson_".concat(geoJsonCounter++)));
        }
      }

      return parent;
    }

    constructor(parent, fields, geojson, signal) {
      super(parent);
      this.fields = fields;
      this.geojson = geojson;
      this.signal = signal;
    }

    dependentFields() {
      var _this$fields;

      const fields = ((_this$fields = this.fields) !== null && _this$fields !== void 0 ? _this$fields : []).filter(vega.isString);
      return new Set([...(this.geojson ? [this.geojson] : []), ...fields]);
    }

    producedFields() {
      return new Set();
    }

    hash() {
      return "GeoJSON ".concat(this.geojson, " ").concat(this.signal, " ").concat(hash(this.fields));
    }

    assemble() {
      return [...(this.geojson ? [{
        type: 'filter',
        expr: "isValid(datum[\"".concat(this.geojson, "\"])")
      }] : []), {
        type: 'geojson',
        ...(this.fields ? {
          fields: this.fields
        } : {}),
        ...(this.geojson ? {
          geojson: this.geojson
        } : {}),
        signal: this.signal
      }];
    }

  }

  class GeoPointNode extends DataFlowNode {
    clone() {
      return new GeoPointNode(null, this.projection, duplicate(this.fields), duplicate(this.as));
    }

    constructor(parent, projection, fields, as) {
      super(parent);
      this.projection = projection;
      this.fields = fields;
      this.as = as;
    }

    static parseAll(parent, model) {
      if (!model.projectionName()) {
        return parent;
      }

      for (const coordinates of [[LONGITUDE, LATITUDE], [LONGITUDE2, LATITUDE2]]) {
        const pair = coordinates.map(channel => {
          const def = getFieldOrDatumDef(model.encoding[channel]);
          return isFieldDef(def) ? def.field : isDatumDef(def) ? {
            expr: "".concat(def.datum)
          } : isValueDef(def) ? {
            expr: "".concat(def['value'])
          } : undefined;
        });
        const suffix = coordinates[0] === LONGITUDE2 ? '2' : '';

        if (pair[0] || pair[1]) {
          parent = new GeoPointNode(parent, model.projectionName(), pair, [model.getName("x".concat(suffix)), model.getName("y".concat(suffix))]);
        }
      }

      return parent;
    }

    dependentFields() {
      return new Set(this.fields.filter(vega.isString));
    }

    producedFields() {
      return new Set(this.as);
    }

    hash() {
      return "Geopoint ".concat(this.projection, " ").concat(hash(this.fields), " ").concat(hash(this.as));
    }

    assemble() {
      return {
        type: 'geopoint',
        projection: this.projection,
        fields: this.fields,
        as: this.as
      };
    }

  }

  class ImputeNode extends DataFlowNode {
    clone() {
      return new ImputeNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
    }

    dependentFields() {
      var _this$transform$group;

      return new Set([this.transform.impute, this.transform.key, ...((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : [])]);
    }

    producedFields() {
      return new Set([this.transform.impute]);
    }

    processSequence(keyvals) {
      const {
        start = 0,
        stop,
        step
      } = keyvals;
      const result = [start, stop, ...(step ? [step] : [])].join(',');
      return {
        signal: "sequence(".concat(result, ")")
      };
    }

    static makeFromTransform(parent, imputeTransform) {
      return new ImputeNode(parent, imputeTransform);
    }

    static makeFromEncoding(parent, model) {
      const encoding = model.encoding;
      const xDef = encoding.x;
      const yDef = encoding.y;

      if (isFieldDef(xDef) && isFieldDef(yDef)) {
        const imputedChannel = xDef.impute ? xDef : yDef.impute ? yDef : undefined;

        if (imputedChannel === undefined) {
          return undefined;
        }

        const keyChannel = xDef.impute ? yDef : yDef.impute ? xDef : undefined;
        const {
          method,
          value,
          frame,
          keyvals
        } = imputedChannel.impute;
        const groupbyFields = pathGroupingFields(model.mark, encoding);
        return new ImputeNode(parent, {
          impute: imputedChannel.field,
          key: keyChannel.field,
          ...(method ? {
            method
          } : {}),
          ...(value !== undefined ? {
            value
          } : {}),
          ...(frame ? {
            frame
          } : {}),
          ...(keyvals !== undefined ? {
            keyvals
          } : {}),
          ...(groupbyFields.length ? {
            groupby: groupbyFields
          } : {})
        });
      }

      return null;
    }

    hash() {
      return "Impute ".concat(hash(this.transform));
    }

    assemble() {
      const {
        impute,
        key,
        keyvals,
        method,
        groupby,
        value,
        frame = [null, null]
      } = this.transform;
      const imputeTransform = {
        type: 'impute',
        field: impute,
        key,
        ...(keyvals ? {
          keyvals: isImputeSequence(keyvals) ? this.processSequence(keyvals) : keyvals
        } : {}),
        method: 'value',
        ...(groupby ? {
          groupby
        } : {}),
        value: !method || method === 'value' ? value : null
      };

      if (method && method !== 'value') {
        const deriveNewField = {
          type: 'window',
          as: ["imputed_".concat(impute, "_value")],
          ops: [method],
          fields: [impute],
          frame,
          ignorePeers: false,
          ...(groupby ? {
            groupby
          } : {})
        };
        const replaceOriginal = {
          type: 'formula',
          expr: "datum.".concat(impute, " === null ? datum.imputed_").concat(impute, "_value : datum.").concat(impute),
          as: impute
        };
        return [imputeTransform, deriveNewField, replaceOriginal];
      } else {
        return [imputeTransform];
      }
    }

  }

  /**
   * A class for loess transform nodes
   */

  class LoessTransformNode extends DataFlowNode {
    clone() {
      return new LoessTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      var _this$transform$as, _specifiedAs$, _specifiedAs$2;

      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const specifiedAs = (_this$transform$as = this.transform.as) !== null && _this$transform$as !== void 0 ? _this$transform$as : [undefined, undefined];
      this.transform.as = [(_specifiedAs$ = specifiedAs[0]) !== null && _specifiedAs$ !== void 0 ? _specifiedAs$ : transform.on, (_specifiedAs$2 = specifiedAs[1]) !== null && _specifiedAs$2 !== void 0 ? _specifiedAs$2 : transform.loess];
    }

    dependentFields() {
      var _this$transform$group;

      return new Set([this.transform.loess, this.transform.on, ...((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : [])]);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "LoessTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        loess,
        on,
        ...rest
      } = this.transform;
      const result = {
        type: 'loess',
        x: on,
        y: loess,
        ...rest
      };
      return result;
    }

  }

  class LookupNode extends DataFlowNode {
    clone() {
      return new LookupNode(null, duplicate(this.transform), this.secondary);
    }

    constructor(parent, transform, secondary) {
      super(parent);
      this.transform = transform;
      this.secondary = secondary;
    }

    static make(parent, model, transform, counter) {
      const sources = model.component.data.sources;
      const {
        from
      } = transform;
      let fromOutputNode = null;

      if (isLookupData(from)) {
        let fromSource = findSource(from.data, sources);

        if (!fromSource) {
          fromSource = new SourceNode(from.data);
          sources.push(fromSource);
        }

        const fromOutputName = model.getName("lookup_".concat(counter));
        fromOutputNode = new OutputNode(fromSource, fromOutputName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
        model.component.data.outputNodes[fromOutputName] = fromOutputNode;
      } else if (isLookupSelection(from)) {
        const selName = from.param;
        transform = {
          as: selName,
          ...transform
        };
        let selCmpt;

        try {
          selCmpt = model.getSelectionComponent(varName(selName), selName);
        } catch (e) {
          throw new Error(cannotLookupVariableParameter(selName));
        }

        fromOutputNode = selCmpt.materialized;

        if (!fromOutputNode) {
          throw new Error(noSameUnitLookup(selName));
        }
      }

      return new LookupNode(parent, transform, fromOutputNode.getSource());
    }

    dependentFields() {
      return new Set([this.transform.lookup]);
    }

    producedFields() {
      return new Set(this.transform.as ? vega.array(this.transform.as) : this.transform.from.fields);
    }

    hash() {
      return "Lookup ".concat(hash({
        transform: this.transform,
        secondary: this.secondary
      }));
    }

    assemble() {
      let foreign;

      if (this.transform.from.fields) {
        // lookup a few fields and add create a flat output
        foreign = {
          values: this.transform.from.fields,
          ...(this.transform.as ? {
            as: vega.array(this.transform.as)
          } : {})
        };
      } else {
        // lookup full record and nest it
        let asName = this.transform.as;

        if (!vega.isString(asName)) {
          warn(NO_FIELDS_NEEDS_AS);
          asName = '_lookup';
        }

        foreign = {
          as: [asName]
        };
      }

      return {
        type: 'lookup',
        from: this.secondary,
        key: this.transform.from.key,
        fields: [this.transform.lookup],
        ...foreign,
        ...(this.transform.default ? {
          default: this.transform.default
        } : {})
      };
    }

  }

  /**
   * A class for quantile transform nodes
   */

  class QuantileTransformNode extends DataFlowNode {
    clone() {
      return new QuantileTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      var _this$transform$as, _specifiedAs$, _specifiedAs$2;

      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const specifiedAs = (_this$transform$as = this.transform.as) !== null && _this$transform$as !== void 0 ? _this$transform$as : [undefined, undefined];
      this.transform.as = [(_specifiedAs$ = specifiedAs[0]) !== null && _specifiedAs$ !== void 0 ? _specifiedAs$ : 'prob', (_specifiedAs$2 = specifiedAs[1]) !== null && _specifiedAs$2 !== void 0 ? _specifiedAs$2 : 'value'];
    }

    dependentFields() {
      var _this$transform$group;

      return new Set([this.transform.quantile, ...((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : [])]);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "QuantileTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        quantile,
        ...rest
      } = this.transform;
      const result = {
        type: 'quantile',
        field: quantile,
        ...rest
      };
      return result;
    }

  }

  /**
   * A class for regression transform nodes
   */

  class RegressionTransformNode extends DataFlowNode {
    clone() {
      return new RegressionTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      var _this$transform$as, _specifiedAs$, _specifiedAs$2;

      super(parent);
      this.transform = transform;
      this.transform = duplicate(transform); // duplicate to prevent side effects

      const specifiedAs = (_this$transform$as = this.transform.as) !== null && _this$transform$as !== void 0 ? _this$transform$as : [undefined, undefined];
      this.transform.as = [(_specifiedAs$ = specifiedAs[0]) !== null && _specifiedAs$ !== void 0 ? _specifiedAs$ : transform.on, (_specifiedAs$2 = specifiedAs[1]) !== null && _specifiedAs$2 !== void 0 ? _specifiedAs$2 : transform.regression];
    }

    dependentFields() {
      var _this$transform$group;

      return new Set([this.transform.regression, this.transform.on, ...((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : [])]);
    }

    producedFields() {
      return new Set(this.transform.as);
    }

    hash() {
      return "RegressionTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        regression,
        on,
        ...rest
      } = this.transform;
      const result = {
        type: 'regression',
        x: on,
        y: regression,
        ...rest
      };
      return result;
    }

  }

  /**
   * A class for pivot transform nodes.
   */

  class PivotTransformNode extends DataFlowNode {
    clone() {
      return new PivotTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
    }

    addDimensions(fields) {
      var _this$transform$group;

      this.transform.groupby = unique(((_this$transform$group = this.transform.groupby) !== null && _this$transform$group !== void 0 ? _this$transform$group : []).concat(fields), d => d);
    }

    producedFields() {
      return undefined; // return undefined so that potentially everything can depend on the pivot
    }

    dependentFields() {
      var _this$transform$group2;

      return new Set([this.transform.pivot, this.transform.value, ...((_this$transform$group2 = this.transform.groupby) !== null && _this$transform$group2 !== void 0 ? _this$transform$group2 : [])]);
    }

    hash() {
      return "PivotTransform ".concat(hash(this.transform));
    }

    assemble() {
      const {
        pivot,
        value,
        groupby,
        limit,
        op
      } = this.transform;
      return {
        type: 'pivot',
        field: pivot,
        value,
        ...(limit !== undefined ? {
          limit
        } : {}),
        ...(op !== undefined ? {
          op
        } : {}),
        ...(groupby !== undefined ? {
          groupby
        } : {})
      };
    }

  }

  /**
   * A class for the sample transform nodes
   */

  class SampleTransformNode extends DataFlowNode {
    clone() {
      return new SampleTransformNode(null, duplicate(this.transform));
    }

    constructor(parent, transform) {
      super(parent);
      this.transform = transform;
    }

    dependentFields() {
      return new Set();
    }

    producedFields() {
      return new Set();
    }

    hash() {
      return "SampleTransform ".concat(hash(this.transform));
    }

    assemble() {
      return {
        type: 'sample',
        size: this.transform.sample
      };
    }

  }

  function makeWalkTree(data) {
    // to name datasources
    let datasetIndex = 0;
    /**
     * Recursively walk down the tree.
     */

    function walkTree(node, dataSource) {
      if (node instanceof SourceNode) {
        // If the source is a named data source or a data source with values, we need
        // to put it in a different data source. Otherwise, Vega may override the data.
        if (!node.isGenerator && !isUrlData(node.data)) {
          data.push(dataSource);
          const newData = {
            name: null,
            source: dataSource.name,
            transform: []
          };
          dataSource = newData;
        }
      }

      if (node instanceof ParseNode) {
        if (node.parent instanceof SourceNode && !dataSource.source) {
          var _dataSource$format;

          // If node's parent is a root source and the data source does not refer to another data source, use normal format parse
          dataSource.format = { ...((_dataSource$format = dataSource.format) !== null && _dataSource$format !== void 0 ? _dataSource$format : {}),
            parse: node.assembleFormatParse()
          }; // add calculates for all nested fields

          dataSource.transform.push(...node.assembleTransforms(true));
        } else {
          // Otherwise use Vega expression to parse
          dataSource.transform.push(...node.assembleTransforms());
        }
      }

      if (node instanceof FacetNode) {
        if (!dataSource.name) {
          dataSource.name = "data_".concat(datasetIndex++);
        }

        if (!dataSource.source || dataSource.transform.length > 0) {
          data.push(dataSource);
          node.data = dataSource.name;
        } else {
          node.data = dataSource.source;
        }

        data.push(...node.assemble()); // break here because the rest of the tree has to be taken care of by the facet.

        return;
      }

      if (node instanceof GraticuleNode || node instanceof SequenceNode || node instanceof FilterInvalidNode || node instanceof FilterNode || node instanceof CalculateNode || node instanceof GeoPointNode || node instanceof AggregateNode || node instanceof LookupNode || node instanceof WindowTransformNode || node instanceof JoinAggregateTransformNode || node instanceof FoldTransformNode || node instanceof FlattenTransformNode || node instanceof DensityTransformNode || node instanceof LoessTransformNode || node instanceof QuantileTransformNode || node instanceof RegressionTransformNode || node instanceof IdentifierNode || node instanceof SampleTransformNode || node instanceof PivotTransformNode) {
        dataSource.transform.push(node.assemble());
      }

      if (node instanceof BinNode || node instanceof TimeUnitNode || node instanceof ImputeNode || node instanceof StackNode || node instanceof GeoJSONNode) {
        dataSource.transform.push(...node.assemble());
      }

      if (node instanceof OutputNode) {
        if (dataSource.source && dataSource.transform.length === 0) {
          node.setSource(dataSource.source);
        } else if (node.parent instanceof OutputNode) {
          // Note that an output node may be required but we still do not assemble a
          // separate data source for it.
          node.setSource(dataSource.name);
        } else {
          if (!dataSource.name) {
            dataSource.name = "data_".concat(datasetIndex++);
          } // Here we set the name of the datasource we generated. From now on
          // other assemblers can use it.


          node.setSource(dataSource.name); // if this node has more than one child, we will add a datasource automatically

          if (node.numChildren() === 1) {
            data.push(dataSource);
            const newData = {
              name: null,
              source: dataSource.name,
              transform: []
            };
            dataSource = newData;
          }
        }
      }

      switch (node.numChildren()) {
        case 0:
          // done
          if (node instanceof OutputNode && (!dataSource.source || dataSource.transform.length > 0)) {
            // do not push empty datasources that are simply references
            data.push(dataSource);
          }

          break;

        case 1:
          walkTree(node.children[0], dataSource);
          break;

        default:
          {
            if (!dataSource.name) {
              dataSource.name = "data_".concat(datasetIndex++);
            }

            let source = dataSource.name;

            if (!dataSource.source || dataSource.transform.length > 0) {
              data.push(dataSource);
            } else {
              source = dataSource.source;
            }

            for (const child of node.children) {
              const newData = {
                name: null,
                source,
                transform: []
              };
              walkTree(child, newData);
            }

            break;
          }
      }
    }

    return walkTree;
  }
  /**
   * Assemble data sources that are derived from faceted data.
   */


  function assembleFacetData(root) {
    const data = [];
    const walkTree = makeWalkTree(data);

    for (const child of root.children) {
      walkTree(child, {
        source: root.name,
        name: null,
        transform: []
      });
    }

    return data;
  }
  /**
   * Create Vega data array from a given compiled model and append all of them to the given array
   *
   * @param  model
   * @param  data array
   * @return modified data array
   */

  function assembleRootData(dataComponent, datasets) {
    const data = []; // dataComponent.sources.forEach(debug);
    // draw(dataComponent.sources);

    const walkTree = makeWalkTree(data);
    let sourceIndex = 0;

    for (const root of dataComponent.sources) {
      // assign a name if the source does not have a name yet
      if (!root.hasName()) {
        root.dataName = "source_".concat(sourceIndex++);
      }

      const newData = root.assemble();
      walkTree(root, newData);
    } // remove empty transform arrays for cleaner output


    for (const d of data) {
      if (d.transform.length === 0) {
        delete d.transform;
      }
    } // move sources without transforms (the ones that are potentially used in lookups) to the beginning


    let whereTo = 0;

    for (const [i, d] of data.entries()) {
      var _d$transform;

      if (((_d$transform = d.transform) !== null && _d$transform !== void 0 ? _d$transform : []).length === 0 && !d.source) {
        data.splice(whereTo++, 0, data.splice(i, 1)[0]);
      }
    } // now fix the from references in lookup transforms


    for (const d of data) {
      for (const t of (_d$transform2 = d.transform) !== null && _d$transform2 !== void 0 ? _d$transform2 : []) {
        var _d$transform2;

        if (t.type === 'lookup') {
          t.from = dataComponent.outputNodes[t.from].getSource();
        }
      }
    } // inline values for datasets that are in the datastore


    for (const d of data) {
      if (d.name in datasets) {
        d.values = datasets[d.name];
      }
    }

    return data;
  }

  function getHeaderType(orient) {
    if (orient === 'top' || orient === 'left' || isSignalRef(orient)) {
      // we always use header for orient signal since we can't dynamically make header becomes footer
      return 'header';
    }

    return 'footer';
  }
  function parseFacetHeaders(model) {
    for (const channel of FACET_CHANNELS) {
      parseFacetHeader(model, channel);
    }

    mergeChildAxis(model, 'x');
    mergeChildAxis(model, 'y');
  }

  function parseFacetHeader(model, channel) {
    const {
      facet,
      config,
      child,
      component
    } = model;

    if (model.channelHasField(channel)) {
      var _fieldDef$header;

      const fieldDef = facet[channel];
      const titleConfig = getHeaderProperty('title', null, config, channel);
      let title$1 = title(fieldDef, config, {
        allowDisabling: true,
        includeDefault: titleConfig === undefined || !!titleConfig
      });

      if (child.component.layoutHeaders[channel].title) {
        // TODO: better handle multiline titles
        title$1 = vega.isArray(title$1) ? title$1.join(', ') : title$1; // merge title with child to produce "Title / Subtitle / Sub-subtitle"

        title$1 += " / ".concat(child.component.layoutHeaders[channel].title);
        child.component.layoutHeaders[channel].title = null;
      }

      const labelOrient = getHeaderProperty('labelOrient', fieldDef.header, config, channel);
      const labels = fieldDef.header !== null ? getFirstDefined((_fieldDef$header = fieldDef.header) === null || _fieldDef$header === void 0 ? void 0 : _fieldDef$header.labels, config.header.labels, true) : false;
      const headerType = contains(['bottom', 'right'], labelOrient) ? 'footer' : 'header';
      component.layoutHeaders[channel] = {
        title: fieldDef.header !== null ? title$1 : null,
        facetFieldDef: fieldDef,
        [headerType]: channel === 'facet' ? [] : [makeHeaderComponent(model, channel, labels)]
      };
    }
  }

  function makeHeaderComponent(model, channel, labels) {
    const sizeType = channel === 'row' ? 'height' : 'width';
    return {
      labels,
      sizeSignal: model.child.component.layoutSize.get(sizeType) ? model.child.getSizeSignalRef(sizeType) : undefined,
      axes: []
    };
  }

  function mergeChildAxis(model, channel) {
    const {
      child
    } = model;

    if (child.component.axes[channel]) {
      const {
        layoutHeaders,
        resolve
      } = model.component;
      resolve.axis[channel] = parseGuideResolve(resolve, channel);

      if (resolve.axis[channel] === 'shared') {
        // For shared axis, move the axes to facet's header or footer
        const headerChannel = channel === 'x' ? 'column' : 'row';
        const layoutHeader = layoutHeaders[headerChannel];

        for (const axisComponent of child.component.axes[channel]) {
          var _layoutHeader$headerT;

          const headerType = getHeaderType(axisComponent.get('orient'));
          (_layoutHeader$headerT = layoutHeader[headerType]) !== null && _layoutHeader$headerT !== void 0 ? _layoutHeader$headerT : layoutHeader[headerType] = [makeHeaderComponent(model, headerChannel, false)]; // FIXME: assemble shouldn't be called here, but we do it this way so we only extract the main part of the axes

          const mainAxis = assembleAxis(axisComponent, 'main', model.config, {
            header: true
          });

          if (mainAxis) {
            // LayoutHeader no longer keep track of property precedence, thus let's combine.
            layoutHeader[headerType][0].axes.push(mainAxis);
          }

          axisComponent.mainExtracted = true;
        }
      }
    }
  }

  function parseLayerLayoutSize(model) {
    parseChildrenLayoutSize(model);
    parseNonUnitLayoutSizeForChannel(model, 'width');
    parseNonUnitLayoutSizeForChannel(model, 'height');
  }
  function parseConcatLayoutSize(model) {
    parseChildrenLayoutSize(model); // for columns === 1 (vconcat), we can completely merge width. Otherwise, we can treat merged width as childWidth.

    const widthType = model.layout.columns === 1 ? 'width' : 'childWidth'; // for columns === undefined (hconcat), we can completely merge height. Otherwise, we can treat merged height as childHeight.

    const heightType = model.layout.columns === undefined ? 'height' : 'childHeight';
    parseNonUnitLayoutSizeForChannel(model, widthType);
    parseNonUnitLayoutSizeForChannel(model, heightType);
  }
  function parseChildrenLayoutSize(model) {
    for (const child of model.children) {
      child.parseLayoutSize();
    }
  }
  /**
   * Merge child layout size (width or height).
   */

  function parseNonUnitLayoutSizeForChannel(model, layoutSizeType) {
    /*
     * For concat, the parent width or height might not be the same as the children's shared height.
     * For example, hconcat's subviews may share width, but the shared width is not the hconcat view's width.
     *
     * layoutSizeType represents the output of the view (could be childWidth/childHeight/width/height)
     * while the sizeType represents the properties of the child.
     */
    const sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType);
    const channel = getPositionScaleChannel(sizeType);
    const resolve = model.component.resolve;
    const layoutSizeCmpt = model.component.layoutSize;
    let mergedSize; // Try to merge layout size

    for (const child of model.children) {
      var _resolve$scale$channe;

      const childSize = child.component.layoutSize.getWithExplicit(sizeType);
      const scaleResolve = (_resolve$scale$channe = resolve.scale[channel]) !== null && _resolve$scale$channe !== void 0 ? _resolve$scale$channe : defaultScaleResolve(channel, model);

      if (scaleResolve === 'independent' && childSize.value === 'step') {
        // Do not merge independent scales with range-step as their size depends
        // on the scale domains, which can be different between scales.
        mergedSize = undefined;
        break;
      }

      if (mergedSize) {
        if (scaleResolve === 'independent' && mergedSize.value !== childSize.value) {
          // For independent scale, only merge if all the sizes are the same.
          // If the values are different, abandon the merge!
          mergedSize = undefined;
          break;
        }

        mergedSize = mergeValuesWithExplicit(mergedSize, childSize, sizeType, '');
      } else {
        mergedSize = childSize;
      }
    }

    if (mergedSize) {
      // If merged, rename size and set size of all children.
      for (const child of model.children) {
        model.renameSignal(child.getName(sizeType), model.getName(layoutSizeType));
        child.component.layoutSize.set(sizeType, 'merged', false);
      }

      layoutSizeCmpt.setWithExplicit(layoutSizeType, mergedSize);
    } else {
      layoutSizeCmpt.setWithExplicit(layoutSizeType, {
        explicit: false,
        value: undefined
      });
    }
  }

  function parseUnitLayoutSize(model) {
    const {
      size,
      component
    } = model;

    for (const channel of POSITION_SCALE_CHANNELS) {
      const sizeType = getSizeChannel(channel);

      if (size[sizeType]) {
        const specifiedSize = size[sizeType];
        component.layoutSize.set(sizeType, isStep(specifiedSize) ? 'step' : specifiedSize, true);
      } else {
        const defaultSize = defaultUnitSize(model, sizeType);
        component.layoutSize.set(sizeType, defaultSize, false);
      }
    }
  }

  function defaultUnitSize(model, sizeType) {
    const channel = sizeType === 'width' ? 'x' : 'y';
    const config = model.config;
    const scaleComponent = model.getScaleComponent(channel);

    if (scaleComponent) {
      const scaleType = scaleComponent.get('type');
      const range = scaleComponent.get('range');

      if (hasDiscreteDomain(scaleType)) {
        const size = getViewConfigDiscreteSize(config.view, sizeType);

        if (isVgRangeStep(range) || isStep(size)) {
          // For discrete domain with range.step, use dynamic width/height
          return 'step';
        } else {
          return size;
        }
      } else {
        return getViewConfigContinuousSize(config.view, sizeType);
      }
    } else if (model.hasProjection || model.mark === 'arc') {
      // arc should use continuous size by default otherwise the pie is extremely small
      return getViewConfigContinuousSize(config.view, sizeType);
    } else {
      const size = getViewConfigDiscreteSize(config.view, sizeType);
      return isStep(size) ? size.step : size;
    }
  }

  function facetSortFieldName(fieldDef, sort, opt) {
    return vgField(sort, {
      suffix: "by_".concat(vgField(fieldDef)),
      ...(opt !== null && opt !== void 0 ? opt : {})
    });
  }
  class FacetModel extends ModelWithField {
    constructor(spec, parent, parentGivenName, config) {
      super(spec, 'facet', parent, parentGivenName, config, spec.resolve);

      _defineProperty(this, "facet", void 0);

      _defineProperty(this, "child", void 0);

      _defineProperty(this, "children", void 0);

      this.child = buildModel(spec.spec, this, this.getName('child'), undefined, config);
      this.children = [this.child];
      this.facet = this.initFacet(spec.facet);
    }

    initFacet(facet) {
      // clone to prevent side effect to the original spec
      if (!isFacetMapping(facet)) {
        return {
          facet: this.initFacetFieldDef(facet, 'facet')
        };
      }

      const channels = keys(facet);
      const normalizedFacet = {};

      for (const channel of channels) {
        if (![ROW, COLUMN].includes(channel)) {
          // Drop unsupported channel
          warn(incompatibleChannel(channel, 'facet'));
          break;
        }

        const fieldDef = facet[channel];

        if (fieldDef.field === undefined) {
          warn(emptyFieldDef(fieldDef, channel));
          break;
        }

        normalizedFacet[channel] = this.initFacetFieldDef(fieldDef, channel);
      }

      return normalizedFacet;
    }

    initFacetFieldDef(fieldDef, channel) {
      // Cast because we call initFieldDef, which assumes general FieldDef.
      // However, FacetFieldDef is a bit more constrained than the general FieldDef
      const facetFieldDef = initFieldDef(fieldDef, channel);

      if (facetFieldDef.header) {
        facetFieldDef.header = replaceExprRef(facetFieldDef.header);
      } else if (facetFieldDef.header === null) {
        facetFieldDef.header = null;
      }

      return facetFieldDef;
    }

    channelHasField(channel) {
      return !!this.facet[channel];
    }

    fieldDef(channel) {
      return this.facet[channel];
    }

    parseData() {
      this.component.data = parseData(this);
      this.child.parseData();
    }

    parseLayoutSize() {
      parseChildrenLayoutSize(this);
    }

    parseSelections() {
      // As a facet has a single child, the selection components are the same.
      // The child maintains its selections to assemble signals, which remain
      // within its unit.
      this.child.parseSelections();
      this.component.selection = this.child.component.selection;
    }

    parseMarkGroup() {
      this.child.parseMarkGroup();
    }

    parseAxesAndHeaders() {
      this.child.parseAxesAndHeaders();
      parseFacetHeaders(this);
    }

    assembleSelectionTopLevelSignals(signals) {
      return this.child.assembleSelectionTopLevelSignals(signals);
    }

    assembleSignals() {
      this.child.assembleSignals();
      return [];
    }

    assembleSelectionData(data) {
      return this.child.assembleSelectionData(data);
    }

    getHeaderLayoutMixins() {
      const layoutMixins = {};

      for (const channel of FACET_CHANNELS) {
        for (const headerType of HEADER_TYPES) {
          const layoutHeaderComponent = this.component.layoutHeaders[channel];
          const headerComponent = layoutHeaderComponent[headerType];
          const {
            facetFieldDef
          } = layoutHeaderComponent;

          if (facetFieldDef) {
            const titleOrient = getHeaderProperty('titleOrient', facetFieldDef.header, this.config, channel);

            if (['right', 'bottom'].includes(titleOrient)) {
              var _layoutMixins$titleAn;

              const headerChannel = getHeaderChannel(channel, titleOrient);
              (_layoutMixins$titleAn = layoutMixins.titleAnchor) !== null && _layoutMixins$titleAn !== void 0 ? _layoutMixins$titleAn : layoutMixins.titleAnchor = {};
              layoutMixins.titleAnchor[headerChannel] = 'end';
            }
          }

          if (headerComponent !== null && headerComponent !== void 0 && headerComponent[0]) {
            // set header/footerBand
            const sizeType = channel === 'row' ? 'height' : 'width';
            const bandType = headerType === 'header' ? 'headerBand' : 'footerBand';

            if (channel !== 'facet' && !this.child.component.layoutSize.get(sizeType)) {
              var _layoutMixins$bandTyp;

              // If facet child does not have size signal, then apply headerBand
              (_layoutMixins$bandTyp = layoutMixins[bandType]) !== null && _layoutMixins$bandTyp !== void 0 ? _layoutMixins$bandTyp : layoutMixins[bandType] = {};
              layoutMixins[bandType][channel] = 0.5;
            }

            if (layoutHeaderComponent.title) {
              var _layoutMixins$offset;

              (_layoutMixins$offset = layoutMixins.offset) !== null && _layoutMixins$offset !== void 0 ? _layoutMixins$offset : layoutMixins.offset = {};
              layoutMixins.offset[channel === 'row' ? 'rowTitle' : 'columnTitle'] = 10;
            }
          }
        }
      }

      return layoutMixins;
    }

    assembleDefaultLayout() {
      const {
        column,
        row
      } = this.facet;
      const columns = column ? this.columnDistinctSignal() : row ? 1 : undefined;
      let align = 'all'; // Do not align the cells if the scale corresponding to the direction is indepent.
      // We always align when we facet into both row and column.

      if (!row && this.component.resolve.scale.x === 'independent') {
        align = 'none';
      } else if (!column && this.component.resolve.scale.y === 'independent') {
        align = 'none';
      }

      return { ...this.getHeaderLayoutMixins(),
        ...(columns ? {
          columns
        } : {}),
        bounds: 'full',
        align
      };
    }

    assembleLayoutSignals() {
      // FIXME(https://github.com/vega/vega-lite/issues/1193): this can be incorrect if we have independent scales.
      return this.child.assembleLayoutSignals();
    }

    columnDistinctSignal() {
      if (this.parent && this.parent instanceof FacetModel) {
        // For nested facet, we will add columns to group mark instead
        // See discussion in https://github.com/vega/vega/issues/952
        // and https://github.com/vega/vega-view/releases/tag/v1.2.6
        return undefined;
      } else {
        // In facetNode.assemble(), the name is always this.getName('column') + '_layout'.
        const facetLayoutDataName = this.getName('column_domain');
        return {
          signal: "length(data('".concat(facetLayoutDataName, "'))")
        };
      }
    }

    assembleGroupStyle() {
      return undefined;
    }

    assembleGroup(signals) {
      if (this.parent && this.parent instanceof FacetModel) {
        // Provide number of columns for layout.
        // See discussion in https://github.com/vega/vega/issues/952
        // and https://github.com/vega/vega-view/releases/tag/v1.2.6
        return { ...(this.channelHasField('column') ? {
            encode: {
              update: {
                // TODO(https://github.com/vega/vega-lite/issues/2759):
                // Correct the signal for facet of concat of facet_column
                columns: {
                  field: vgField(this.facet.column, {
                    prefix: 'distinct'
                  })
                }
              }
            }
          } : {}),
          ...super.assembleGroup(signals)
        };
      }

      return super.assembleGroup(signals);
    }
    /**
     * Aggregate cardinality for calculating size
     */


    getCardinalityAggregateForChild() {
      const fields = [];
      const ops = [];
      const as = [];

      if (this.child instanceof FacetModel) {
        if (this.child.channelHasField('column')) {
          const field = vgField(this.child.facet.column);
          fields.push(field);
          ops.push('distinct');
          as.push("distinct_".concat(field));
        }
      } else {
        for (const channel of POSITION_SCALE_CHANNELS) {
          const childScaleComponent = this.child.component.scales[channel];

          if (childScaleComponent && !childScaleComponent.merged) {
            const type = childScaleComponent.get('type');
            const range = childScaleComponent.get('range');

            if (hasDiscreteDomain(type) && isVgRangeStep(range)) {
              const domain = assembleDomain(this.child, channel);
              const field = getFieldFromDomain(domain);

              if (field) {
                fields.push(field);
                ops.push('distinct');
                as.push("distinct_".concat(field));
              } else {
                warn(unknownField(channel));
              }
            }
          }
        }
      }

      return {
        fields,
        ops,
        as
      };
    }

    assembleFacet() {
      const {
        name,
        data
      } = this.component.data.facetRoot;
      const {
        row,
        column
      } = this.facet;
      const {
        fields,
        ops,
        as
      } = this.getCardinalityAggregateForChild();
      const groupby = [];

      for (const channel of FACET_CHANNELS) {
        const fieldDef = this.facet[channel];

        if (fieldDef) {
          groupby.push(vgField(fieldDef));
          const {
            bin,
            sort
          } = fieldDef;

          if (isBinning(bin)) {
            groupby.push(vgField(fieldDef, {
              binSuffix: 'end'
            }));
          }

          if (isSortField(sort)) {
            const {
              field,
              op = DEFAULT_SORT_OP
            } = sort;
            const outputName = facetSortFieldName(fieldDef, sort);

            if (row && column) {
              // For crossed facet, use pre-calculate field as it requires a different groupby
              // For each calculated field, apply max and assign them to the same name as
              // all values of the same group should be the same anyway.
              fields.push(outputName);
              ops.push('max');
              as.push(outputName);
            } else {
              fields.push(field);
              ops.push(op);
              as.push(outputName);
            }
          } else if (vega.isArray(sort)) {
            const outputName = sortArrayIndexField(fieldDef, channel);
            fields.push(outputName);
            ops.push('max');
            as.push(outputName);
          }
        }
      }

      const cross = !!row && !!column;
      return {
        name,
        data,
        groupby,
        ...(cross || fields.length > 0 ? {
          aggregate: { ...(cross ? {
              cross
            } : {}),
            ...(fields.length ? {
              fields,
              ops,
              as
            } : {})
          }
        } : {})
      };
    }

    facetSortFields(channel) {
      const {
        facet
      } = this;
      const fieldDef = facet[channel];

      if (fieldDef) {
        if (isSortField(fieldDef.sort)) {
          return [facetSortFieldName(fieldDef, fieldDef.sort, {
            expr: 'datum'
          })];
        } else if (vega.isArray(fieldDef.sort)) {
          return [sortArrayIndexField(fieldDef, channel, {
            expr: 'datum'
          })];
        }

        return [vgField(fieldDef, {
          expr: 'datum'
        })];
      }

      return [];
    }

    facetSortOrder(channel) {
      const {
        facet
      } = this;
      const fieldDef = facet[channel];

      if (fieldDef) {
        const {
          sort
        } = fieldDef;
        const order = (isSortField(sort) ? sort.order : !vega.isArray(sort) && sort) || 'ascending';
        return [order];
      }

      return [];
    }

    assembleLabelTitle() {
      const {
        facet,
        config
      } = this;

      if (facet.facet) {
        // Facet always uses title to display labels
        return assembleLabelTitle(facet.facet, 'facet', config);
      }

      const ORTHOGONAL_ORIENT = {
        row: ['top', 'bottom'],
        column: ['left', 'right']
      };

      for (const channel of HEADER_CHANNELS) {
        if (facet[channel]) {
          var _facet$channel;

          const labelOrient = getHeaderProperty('labelOrient', (_facet$channel = facet[channel]) === null || _facet$channel === void 0 ? void 0 : _facet$channel.header, config, channel);

          if (ORTHOGONAL_ORIENT[channel].includes(labelOrient)) {
            // Row/Column with orthogonal labelOrient must use title to display labels
            return assembleLabelTitle(facet[channel], channel, config);
          }
        }
      }

      return undefined;
    }

    assembleMarks() {
      const {
        child
      } = this; // If we facet by two dimensions, we need to add a cross operator to the aggregation
      // so that we create all groups

      const facetRoot = this.component.data.facetRoot;
      const data = assembleFacetData(facetRoot);
      const encodeEntry = child.assembleGroupEncodeEntry(false);
      const title = this.assembleLabelTitle() || child.assembleTitle();
      const style = child.assembleGroupStyle();
      const markGroup = {
        name: this.getName('cell'),
        type: 'group',
        ...(title ? {
          title
        } : {}),
        ...(style ? {
          style
        } : {}),
        from: {
          facet: this.assembleFacet()
        },
        // TODO: move this to after data
        sort: {
          field: FACET_CHANNELS.map(c => this.facetSortFields(c)).flat(),
          order: FACET_CHANNELS.map(c => this.facetSortOrder(c)).flat()
        },
        ...(data.length > 0 ? {
          data
        } : {}),
        ...(encodeEntry ? {
          encode: {
            update: encodeEntry
          }
        } : {}),
        ...child.assembleGroup(assembleFacetSignals(this, []))
      };
      return [markGroup];
    }

    getMapping() {
      return this.facet;
    }

  }

  function makeJoinAggregateFromFacet(parent, facet) {
    const {
      row,
      column
    } = facet;

    if (row && column) {
      let newParent = null; // only need to make one for crossed facet

      for (const fieldDef of [row, column]) {
        if (isSortField(fieldDef.sort)) {
          const {
            field,
            op = DEFAULT_SORT_OP
          } = fieldDef.sort;
          parent = newParent = new JoinAggregateTransformNode(parent, {
            joinaggregate: [{
              op,
              field,
              as: facetSortFieldName(fieldDef, fieldDef.sort, {
                forAs: true
              })
            }],
            groupby: [vgField(fieldDef)]
          });
        }
      }

      return newParent;
    }

    return null;
  }

  function findSource(data, sources) {
    for (const other of sources) {
      var _data$format, _otherData$format, _data$format2, _otherData$format2;

      const otherData = other.data; // if both datasets have a name defined, we cannot merge

      if (data.name && other.hasName() && data.name !== other.dataName) {
        continue;
      }

      const formatMesh = (_data$format = data['format']) === null || _data$format === void 0 ? void 0 : _data$format.mesh;
      const otherFeature = (_otherData$format = otherData.format) === null || _otherData$format === void 0 ? void 0 : _otherData$format.feature; // feature and mesh are mutually exclusive

      if (formatMesh && otherFeature) {
        continue;
      } // we have to extract the same feature or mesh


      const formatFeature = (_data$format2 = data['format']) === null || _data$format2 === void 0 ? void 0 : _data$format2.feature;

      if ((formatFeature || otherFeature) && formatFeature !== otherFeature) {
        continue;
      }

      const otherMesh = (_otherData$format2 = otherData.format) === null || _otherData$format2 === void 0 ? void 0 : _otherData$format2.mesh;

      if ((formatMesh || otherMesh) && formatMesh !== otherMesh) {
        continue;
      }

      if (isInlineData(data) && isInlineData(otherData)) {
        if (deepEqual(data.values, otherData.values)) {
          return other;
        }
      } else if (isUrlData(data) && isUrlData(otherData)) {
        if (data.url === otherData.url) {
          return other;
        }
      } else if (isNamedData(data)) {
        if (data.name === other.dataName) {
          return other;
        }
      }
    }

    return null;
  }

  function parseRoot(model, sources) {
    if (model.data || !model.parent) {
      // if the model defines a data source or is the root, create a source node
      if (model.data === null) {
        // data: null means we should ignore the parent's data so we just create a new data source
        const source = new SourceNode({
          values: []
        });
        sources.push(source);
        return source;
      }

      const existingSource = findSource(model.data, sources);

      if (existingSource) {
        if (!isGenerator(model.data)) {
          existingSource.data.format = mergeDeep({}, model.data.format, existingSource.data.format);
        } // if the new source has a name but the existing one does not, we can set it


        if (!existingSource.hasName() && model.data.name) {
          existingSource.dataName = model.data.name;
        }

        return existingSource;
      } else {
        const source = new SourceNode(model.data);
        sources.push(source);
        return source;
      }
    } else {
      // If we don't have a source defined (overriding parent's data), use the parent's facet root or main.
      return model.parent.component.data.facetRoot ? model.parent.component.data.facetRoot : model.parent.component.data.main;
    }
  }
  /**
   * Parses a transform array into a chain of connected dataflow nodes.
   */


  function parseTransformArray(head, model, ancestorParse) {
    let lookupCounter = 0;

    for (const t of model.transforms) {
      let derivedType = undefined;
      let transformNode;

      if (isCalculate(t)) {
        transformNode = head = new CalculateNode(head, t);
        derivedType = 'derived';
      } else if (isFilter(t)) {
        var _ParseNode$makeWithAn;

        const implicit = getImplicitFromFilterTransform(t);
        transformNode = head = (_ParseNode$makeWithAn = ParseNode.makeWithAncestors(head, {}, implicit, ancestorParse)) !== null && _ParseNode$makeWithAn !== void 0 ? _ParseNode$makeWithAn : head;
        head = new FilterNode(head, model, t.filter);
      } else if (isBin(t)) {
        transformNode = head = BinNode.makeFromTransform(head, t, model);
        derivedType = 'number';
      } else if (isTimeUnit(t)) {
        derivedType = 'date';
        const parsedAs = ancestorParse.getWithExplicit(t.field); // Create parse node because the input to time unit is always date.

        if (parsedAs.value === undefined) {
          head = new ParseNode(head, {
            [t.field]: derivedType
          });
          ancestorParse.set(t.field, derivedType, false);
        }

        transformNode = head = TimeUnitNode.makeFromTransform(head, t);
      } else if (isAggregate(t)) {
        transformNode = head = AggregateNode.makeFromTransform(head, t);
        derivedType = 'number';

        if (requiresSelectionId(model)) {
          head = new IdentifierNode(head);
        }
      } else if (isLookup(t)) {
        transformNode = head = LookupNode.make(head, model, t, lookupCounter++);
        derivedType = 'derived';
      } else if (isWindow(t)) {
        transformNode = head = new WindowTransformNode(head, t);
        derivedType = 'number';
      } else if (isJoinAggregate(t)) {
        transformNode = head = new JoinAggregateTransformNode(head, t);
        derivedType = 'number';
      } else if (isStack(t)) {
        transformNode = head = StackNode.makeFromTransform(head, t);
        derivedType = 'derived';
      } else if (isFold(t)) {
        transformNode = head = new FoldTransformNode(head, t);
        derivedType = 'derived';
      } else if (isFlatten(t)) {
        transformNode = head = new FlattenTransformNode(head, t);
        derivedType = 'derived';
      } else if (isPivot(t)) {
        transformNode = head = new PivotTransformNode(head, t);
        derivedType = 'derived';
      } else if (isSample(t)) {
        head = new SampleTransformNode(head, t);
      } else if (isImpute(t)) {
        transformNode = head = ImputeNode.makeFromTransform(head, t);
        derivedType = 'derived';
      } else if (isDensity(t)) {
        transformNode = head = new DensityTransformNode(head, t);
        derivedType = 'derived';
      } else if (isQuantile(t)) {
        transformNode = head = new QuantileTransformNode(head, t);
        derivedType = 'derived';
      } else if (isRegression(t)) {
        transformNode = head = new RegressionTransformNode(head, t);
        derivedType = 'derived';
      } else if (isLoess(t)) {
        transformNode = head = new LoessTransformNode(head, t);
        derivedType = 'derived';
      } else {
        warn(invalidTransformIgnored(t));
        continue;
      }

      if (transformNode && derivedType !== undefined) {
        for (const field of (_transformNode$produc = transformNode.producedFields()) !== null && _transformNode$produc !== void 0 ? _transformNode$produc : []) {
          var _transformNode$produc;

          ancestorParse.set(field, derivedType, false);
        }
      }
    }

    return head;
  }
  /*
  Description of the dataflow (http://asciiflow.com/):
       +--------+
       | Source |
       +---+----+
           |
           v
       FormatParse
       (explicit)
           |
           v
       Transforms
  (Filter, Calculate, Binning, TimeUnit, Aggregate, Window, ...)
           |
           v
       FormatParse
       (implicit)
           |
           v
   Binning (in `encoding`)
           |
           v
   Timeunit (in `encoding`)
           |
           v
  Formula From Sort Array
           |
           v
        +--+--+
        | Raw |
        +-----+
           |
           v
    Aggregate (in `encoding`)
           |
           v
    Stack (in `encoding`)
           |
           v
    Invalid Filter
           |
           v
     +----------+
     |   Main   |
     +----------+
           |
           v
       +-------+
       | Facet |----> "column", "column-layout", and "row"
       +-------+
           |
           v
    ...Child data...
  */

  function parseData(model) {
    var _data$format3, _ParseNode$makeExplic, _ParseNode$makeWithAn2;

    let head = parseRoot(model, model.component.data.sources);
    const {
      outputNodes,
      outputNodeRefCounts
    } = model.component.data;
    const data = model.data;
    const newData = data && (isGenerator(data) || isUrlData(data) || isInlineData(data));
    const ancestorParse = !newData && model.parent ? model.parent.component.data.ancestorParse.clone() : new AncestorParse();

    if (isGenerator(data)) {
      // insert generator transform
      if (isSequenceGenerator(data)) {
        head = new SequenceNode(head, data.sequence);
      } else if (isGraticuleGenerator(data)) {
        head = new GraticuleNode(head, data.graticule);
      } // no parsing necessary for generator


      ancestorParse.parseNothing = true;
    } else if ((data === null || data === void 0 ? void 0 : (_data$format3 = data.format) === null || _data$format3 === void 0 ? void 0 : _data$format3.parse) === null) {
      // format.parse: null means disable parsing
      ancestorParse.parseNothing = true;
    }

    head = (_ParseNode$makeExplic = ParseNode.makeExplicit(head, model, ancestorParse)) !== null && _ParseNode$makeExplic !== void 0 ? _ParseNode$makeExplic : head; // Default discrete selections require an identifer transform to
    // uniquely identify data points. Add this transform at the head of
    // the pipeline such that the identifier field is available for all
    // subsequent datasets. During optimization, we will remove this
    // transform if it proves to be unnecessary. Additional identifier
    // transforms will be necessary when new tuples are constructed
    // (e.g., post-aggregation).

    head = new IdentifierNode(head); // HACK: This is equivalent for merging bin extent for union scale.
    // FIXME(https://github.com/vega/vega-lite/issues/2270): Correctly merge extent / bin node for shared bin scale

    const parentIsLayer = model.parent && isLayerModel(model.parent);

    if (isUnitModel(model) || isFacetModel(model)) {
      if (parentIsLayer) {
        var _BinNode$makeFromEnco;

        head = (_BinNode$makeFromEnco = BinNode.makeFromEncoding(head, model)) !== null && _BinNode$makeFromEnco !== void 0 ? _BinNode$makeFromEnco : head;
      }
    }

    if (model.transforms.length > 0) {
      head = parseTransformArray(head, model, ancestorParse);
    } // create parse nodes for fields that need to be parsed (or flattened) implicitly


    const implicitSelection = getImplicitFromSelection(model);
    const implicitEncoding = getImplicitFromEncoding(model);
    head = (_ParseNode$makeWithAn2 = ParseNode.makeWithAncestors(head, {}, { ...implicitSelection,
      ...implicitEncoding
    }, ancestorParse)) !== null && _ParseNode$makeWithAn2 !== void 0 ? _ParseNode$makeWithAn2 : head;

    if (isUnitModel(model)) {
      head = GeoJSONNode.parseAll(head, model);
      head = GeoPointNode.parseAll(head, model);
    }

    if (isUnitModel(model) || isFacetModel(model)) {
      var _TimeUnitNode$makeFro;

      if (!parentIsLayer) {
        var _BinNode$makeFromEnco2;

        head = (_BinNode$makeFromEnco2 = BinNode.makeFromEncoding(head, model)) !== null && _BinNode$makeFromEnco2 !== void 0 ? _BinNode$makeFromEnco2 : head;
      }

      head = (_TimeUnitNode$makeFro = TimeUnitNode.makeFromEncoding(head, model)) !== null && _TimeUnitNode$makeFro !== void 0 ? _TimeUnitNode$makeFro : head;
      head = CalculateNode.parseAllForSortIndex(head, model);
    } // add an output node pre aggregation


    const rawName = model.getDataName(DataSourceType.Raw);
    const raw = new OutputNode(head, rawName, DataSourceType.Raw, outputNodeRefCounts);
    outputNodes[rawName] = raw;
    head = raw;

    if (isUnitModel(model)) {
      var _ImputeNode$makeFromE, _StackNode$makeFromEn;

      const agg = AggregateNode.makeFromEncoding(head, model);

      if (agg) {
        head = agg;

        if (requiresSelectionId(model)) {
          head = new IdentifierNode(head);
        }
      }

      head = (_ImputeNode$makeFromE = ImputeNode.makeFromEncoding(head, model)) !== null && _ImputeNode$makeFromE !== void 0 ? _ImputeNode$makeFromE : head;
      head = (_StackNode$makeFromEn = StackNode.makeFromEncoding(head, model)) !== null && _StackNode$makeFromEn !== void 0 ? _StackNode$makeFromEn : head;
    }

    if (isUnitModel(model)) {
      var _FilterInvalidNode$ma;

      head = (_FilterInvalidNode$ma = FilterInvalidNode.make(head, model)) !== null && _FilterInvalidNode$ma !== void 0 ? _FilterInvalidNode$ma : head;
    } // output node for marks


    const mainName = model.getDataName(DataSourceType.Main);
    const main = new OutputNode(head, mainName, DataSourceType.Main, outputNodeRefCounts);
    outputNodes[mainName] = main;
    head = main;

    if (isUnitModel(model)) {
      materializeSelections(model, main);
    } // add facet marker


    let facetRoot = null;

    if (isFacetModel(model)) {
      var _makeJoinAggregateFro;

      const facetName = model.getName('facet'); // Derive new aggregate for facet's sort field
      // augment data source with new fields for crossed facet

      head = (_makeJoinAggregateFro = makeJoinAggregateFromFacet(head, model.facet)) !== null && _makeJoinAggregateFro !== void 0 ? _makeJoinAggregateFro : head;
      facetRoot = new FacetNode(head, model, facetName, main.getSource());
      outputNodes[facetName] = facetRoot;
    }

    return { ...model.component.data,
      outputNodes,
      outputNodeRefCounts,
      raw,
      main,
      facetRoot,
      ancestorParse
    };
  }

  class ConcatModel extends Model {
    constructor(spec, parent, parentGivenName, config) {
      var _spec$resolve, _spec$resolve$axis, _spec$resolve2, _spec$resolve2$axis;

      super(spec, 'concat', parent, parentGivenName, config, spec.resolve);

      _defineProperty(this, "children", void 0);

      if (((_spec$resolve = spec.resolve) === null || _spec$resolve === void 0 ? void 0 : (_spec$resolve$axis = _spec$resolve.axis) === null || _spec$resolve$axis === void 0 ? void 0 : _spec$resolve$axis.x) === 'shared' || ((_spec$resolve2 = spec.resolve) === null || _spec$resolve2 === void 0 ? void 0 : (_spec$resolve2$axis = _spec$resolve2.axis) === null || _spec$resolve2$axis === void 0 ? void 0 : _spec$resolve2$axis.y) === 'shared') {
        warn(CONCAT_CANNOT_SHARE_AXIS);
      }

      this.children = this.getChildren(spec).map((child, i) => {
        return buildModel(child, this, this.getName("concat_".concat(i)), undefined, config);
      });
    }

    parseData() {
      this.component.data = parseData(this);

      for (const child of this.children) {
        child.parseData();
      }
    }

    parseSelections() {
      // Merge selections up the hierarchy so that they may be referenced
      // across unit specs. Persist their definitions within each child
      // to assemble signals which remain within output Vega unit groups.
      this.component.selection = {};

      for (const child of this.children) {
        child.parseSelections();

        for (const key of keys(child.component.selection)) {
          this.component.selection[key] = child.component.selection[key];
        }
      }
    }

    parseMarkGroup() {
      for (const child of this.children) {
        child.parseMarkGroup();
      }
    }

    parseAxesAndHeaders() {
      for (const child of this.children) {
        child.parseAxesAndHeaders();
      } // TODO(#2415): support shared axes

    }

    getChildren(spec) {
      if (isVConcatSpec(spec)) {
        return spec.vconcat;
      } else if (isHConcatSpec(spec)) {
        return spec.hconcat;
      }

      return spec.concat;
    }

    parseLayoutSize() {
      parseConcatLayoutSize(this);
    }

    parseAxisGroup() {
      return null;
    }

    assembleSelectionTopLevelSignals(signals) {
      return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
    }

    assembleSignals() {
      this.children.forEach(child => child.assembleSignals());
      return [];
    }

    assembleLayoutSignals() {
      const layoutSignals = assembleLayoutSignals(this);

      for (const child of this.children) {
        layoutSignals.push(...child.assembleLayoutSignals());
      }

      return layoutSignals;
    }

    assembleSelectionData(data) {
      return this.children.reduce((db, child) => child.assembleSelectionData(db), data);
    }

    assembleMarks() {
      // only children have marks
      return this.children.map(child => {
        const title = child.assembleTitle();
        const style = child.assembleGroupStyle();
        const encodeEntry = child.assembleGroupEncodeEntry(false);
        return {
          type: 'group',
          name: child.getName('group'),
          ...(title ? {
            title
          } : {}),
          ...(style ? {
            style
          } : {}),
          ...(encodeEntry ? {
            encode: {
              update: encodeEntry
            }
          } : {}),
          ...child.assembleGroup()
        };
      });
    }

    assembleGroupStyle() {
      return undefined;
    }

    assembleDefaultLayout() {
      const columns = this.layout.columns;
      return { ...(columns != null ? {
          columns
        } : {}),
        bounds: 'full',
        // Use align each so it can work with multiple plots with different size
        align: 'each'
      };
    }

  }

  function isFalseOrNull(v) {
    return v === false || v === null;
  }

  const AXIS_COMPONENT_PROPERTIES_INDEX = {
    disable: 1,
    gridScale: 1,
    scale: 1,
    ...COMMON_AXIS_PROPERTIES_INDEX,
    labelExpr: 1,
    encode: 1
  };
  const AXIS_COMPONENT_PROPERTIES = keys(AXIS_COMPONENT_PROPERTIES_INDEX);
  class AxisComponent extends Split {
    constructor() {
      let explicit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let implicit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let mainExtracted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      super();
      this.explicit = explicit;
      this.implicit = implicit;
      this.mainExtracted = mainExtracted;
    }

    clone() {
      return new AxisComponent(duplicate(this.explicit), duplicate(this.implicit), this.mainExtracted);
    }

    hasAxisPart(part) {
      // FIXME(https://github.com/vega/vega-lite/issues/2552) this method can be wrong if users use a Vega theme.
      if (part === 'axis') {
        // always has the axis container part
        return true;
      }

      if (part === 'grid' || part === 'title') {
        return !!this.get(part);
      } // Other parts are enabled by default, so they should not be false or null.


      return !isFalseOrNull(this.get(part));
    }

    hasOrientSignalRef() {
      return isSignalRef(this.explicit.orient);
    }

  }

  function labels(model, channel, specifiedLabelsSpec) {
    var _getFieldOrDatumDef;

    const {
      encoding,
      config
    } = model;
    const fieldOrDatumDef = (_getFieldOrDatumDef = getFieldOrDatumDef(encoding[channel])) !== null && _getFieldOrDatumDef !== void 0 ? _getFieldOrDatumDef : getFieldOrDatumDef(encoding[getSecondaryRangeChannel(channel)]);
    const axis = model.axis(channel) || {};
    const {
      format,
      formatType
    } = axis;

    if (isCustomFormatType(formatType)) {
      return {
        text: formatCustomType({
          fieldOrDatumDef,
          field: 'datum.value',
          format,
          formatType,
          config
        }),
        ...specifiedLabelsSpec
      };
    }

    return specifiedLabelsSpec;
  }

  function parseUnitAxes(model) {
    return POSITION_SCALE_CHANNELS.reduce((axis, channel) => {
      if (model.component.scales[channel]) {
        axis[channel] = [parseAxis(channel, model)];
      }

      return axis;
    }, {});
  }
  const OPPOSITE_ORIENT = {
    bottom: 'top',
    top: 'bottom',
    left: 'right',
    right: 'left'
  };
  function parseLayerAxes(model) {
    const {
      axes,
      resolve
    } = model.component;
    const axisCount = {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    };

    for (const child of model.children) {
      child.parseAxesAndHeaders();

      for (const channel of keys(child.component.axes)) {
        resolve.axis[channel] = parseGuideResolve(model.component.resolve, channel);

        if (resolve.axis[channel] === 'shared') {
          // If the resolve says shared (and has not been overridden)
          // We will try to merge and see if there is a conflict
          axes[channel] = mergeAxisComponents(axes[channel], child.component.axes[channel]);

          if (!axes[channel]) {
            // If merge returns nothing, there is a conflict so we cannot make the axis shared.
            // Thus, mark axis as independent and remove the axis component.
            resolve.axis[channel] = 'independent';
            delete axes[channel];
          }
        }
      }
    } // Move axes to layer's axis component and merge shared axes


    for (const channel of POSITION_SCALE_CHANNELS) {
      for (const child of model.children) {
        if (!child.component.axes[channel]) {
          // skip if the child does not have a particular axis
          continue;
        }

        if (resolve.axis[channel] === 'independent') {
          var _axes$channel;

          // If axes are independent, concat the axisComponent array.
          axes[channel] = ((_axes$channel = axes[channel]) !== null && _axes$channel !== void 0 ? _axes$channel : []).concat(child.component.axes[channel]); // Automatically adjust orient

          for (const axisComponent of child.component.axes[channel]) {
            const {
              value: orient,
              explicit
            } = axisComponent.getWithExplicit('orient');

            if (isSignalRef(orient)) {
              continue;
            }

            if (axisCount[orient] > 0 && !explicit) {
              // Change axis orient if the number do not match
              const oppositeOrient = OPPOSITE_ORIENT[orient];

              if (axisCount[orient] > axisCount[oppositeOrient]) {
                axisComponent.set('orient', oppositeOrient, false);
              }
            }

            axisCount[orient]++; // TODO(https://github.com/vega/vega-lite/issues/2634): automatically add extra offset?
          }
        } // After merging, make sure to remove axes from child


        delete child.component.axes[channel];
      } // Suppress grid lines for dual axis charts (https://github.com/vega/vega-lite/issues/4676)


      if (resolve.axis[channel] === 'independent' && axes[channel] && axes[channel].length > 1) {
        for (const axisCmpt of axes[channel]) {
          if (!!axisCmpt.get('grid') && !axisCmpt.explicit.grid) {
            axisCmpt.implicit.grid = false;
          }
        }
      }
    }
  }

  function mergeAxisComponents(mergedAxisCmpts, childAxisCmpts) {
    if (mergedAxisCmpts) {
      // FIXME: this is a bit wrong once we support multiple axes
      if (mergedAxisCmpts.length !== childAxisCmpts.length) {
        return undefined; // Cannot merge axis component with different number of axes.
      }

      const length = mergedAxisCmpts.length;

      for (let i = 0; i < length; i++) {
        const merged = mergedAxisCmpts[i];
        const child = childAxisCmpts[i];

        if (!!merged !== !!child) {
          return undefined;
        } else if (merged && child) {
          const mergedOrient = merged.getWithExplicit('orient');
          const childOrient = child.getWithExplicit('orient');

          if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
            // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
            // Cannot merge due to inconsistent orient
            return undefined;
          } else {
            mergedAxisCmpts[i] = mergeAxisComponent(merged, child);
          }
        }
      }
    } else {
      // For first one, return a copy of the child
      return childAxisCmpts.map(axisComponent => axisComponent.clone());
    }

    return mergedAxisCmpts;
  }

  function mergeAxisComponent(merged, child) {
    for (const prop of AXIS_COMPONENT_PROPERTIES) {
      const mergedValueWithExplicit = mergeValuesWithExplicit(merged.getWithExplicit(prop), child.getWithExplicit(prop), prop, 'axis', // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case 'title':
            return mergeTitleComponent(v1, v2);

          case 'gridScale':
            return {
              explicit: v1.explicit,
              // keep the old explicit
              value: getFirstDefined(v1.value, v2.value)
            };
        }

        return defaultTieBreaker(v1, v2, prop, 'axis');
      });
      merged.setWithExplicit(prop, mergedValueWithExplicit);
    }

    return merged;
  }

  function isExplicit(value, property, axis, model, channel) {
    if (property === 'disable') {
      return axis !== undefined; // if axis is specified or null/false, then its enable/disable state is explicit
    }

    axis = axis || {};

    switch (property) {
      case 'titleAngle':
      case 'labelAngle':
        return value === (isSignalRef(axis.labelAngle) ? axis.labelAngle : normalizeAngle(axis.labelAngle));

      case 'values':
        return !!axis.values;
      // specified axis.values is already respected, but may get transformed.

      case 'encode':
        // both VL axis.encoding and axis.labelAngle affect VG axis.encode
        return !!axis.encoding || !!axis.labelAngle;

      case 'title':
        // title can be explicit if fieldDef.title is set
        if (value === getFieldDefTitle(model, channel)) {
          return true;
        }

    } // Otherwise, things are explicit if the returned value matches the specified property


    return value === axis[property];
  }
  /**
   * Properties to always include values from config
   */


  const propsToAlwaysIncludeConfig = new Set(['grid', // Grid is an exception because we need to set grid = true to generate another grid axis
  'translate', // translate has dependent logic for bar's bin position and it's 0.5 by default in Vega. If a config overrides this value, we need to know.
  // the rest are not axis configs in Vega, but are in VL, so we need to set too.
  'format', 'formatType', 'orient', 'labelExpr', 'tickCount', 'position', 'tickMinStep']);

  function parseAxis(channel, model) {
    var _axis, _config, _config$axis, _axis2, _axis$encoding;

    let axis = model.axis(channel);
    const axisComponent = new AxisComponent();
    const fieldOrDatumDef = getFieldOrDatumDef(model.encoding[channel]);
    const {
      mark,
      config
    } = model;
    const orient = ((_axis = axis) === null || _axis === void 0 ? void 0 : _axis.orient) || ((_config = config[channel === 'x' ? 'axisX' : 'axisY']) === null || _config === void 0 ? void 0 : _config.orient) || ((_config$axis = config.axis) === null || _config$axis === void 0 ? void 0 : _config$axis.orient) || defaultOrient(channel);
    const scaleType = model.getScaleComponent(channel).get('type');
    const axisConfigs = getAxisConfigs(channel, scaleType, orient, model.config);
    const disable = axis !== undefined ? !axis : getAxisConfig('disable', config.style, (_axis2 = axis) === null || _axis2 === void 0 ? void 0 : _axis2.style, axisConfigs).configValue;
    axisComponent.set('disable', disable, axis !== undefined);

    if (disable) {
      return axisComponent;
    }

    axis = axis || {};
    const labelAngle = getLabelAngle(fieldOrDatumDef, axis, channel, config.style, axisConfigs);
    const ruleParams = {
      fieldOrDatumDef,
      axis,
      channel,
      model,
      scaleType,
      orient,
      labelAngle,
      mark,
      config
    }; // 1.2. Add properties

    for (const property of AXIS_COMPONENT_PROPERTIES) {
      const value = property in axisRules ? axisRules[property](ruleParams) : isAxisProperty(property) ? axis[property] : undefined;
      const hasValue = value !== undefined;
      const explicit = isExplicit(value, property, axis, model, channel);

      if (hasValue && explicit) {
        axisComponent.set(property, value, explicit);
      } else {
        const {
          configValue = undefined,
          configFrom = undefined
        } = isAxisProperty(property) && property !== 'values' ? getAxisConfig(property, config.style, axis.style, axisConfigs) : {};
        const hasConfigValue = configValue !== undefined;

        if (hasValue && !hasConfigValue) {
          // only set property if it is explicitly set or has no config value (otherwise we will accidentally override config)
          axisComponent.set(property, value, explicit);
        } else if ( // Cases need implicit values
        // 1. Axis config that aren't available in Vega
        !(configFrom === 'vgAxisConfig') || // 2. Certain properties are always included (see `propsToAlwaysIncludeConfig`'s declaration for more details)
        propsToAlwaysIncludeConfig.has(property) && hasConfigValue || // 3. Conditional axis values and signals
        isConditionalAxisValue(configValue) || isSignalRef(configValue)) {
          // If a config is specified and is conditional, copy conditional value from axis config
          axisComponent.set(property, configValue, false);
        }
      }
    } // 2) Add guide encode definition groups


    const axisEncoding = (_axis$encoding = axis.encoding) !== null && _axis$encoding !== void 0 ? _axis$encoding : {};
    const axisEncode = AXIS_PARTS.reduce((e, part) => {
      var _axisEncoding$part;

      if (!axisComponent.hasAxisPart(part)) {
        // No need to create encode for a disabled part.
        return e;
      }

      const axisEncodingPart = guideEncodeEntry((_axisEncoding$part = axisEncoding[part]) !== null && _axisEncoding$part !== void 0 ? _axisEncoding$part : {}, model);
      const value = part === 'labels' ? labels(model, channel, axisEncodingPart) : axisEncodingPart;

      if (value !== undefined && !isEmpty(value)) {
        e[part] = {
          update: value
        };
      }

      return e;
    }, {}); // FIXME: By having encode as one property, we won't have fine grained encode merging.

    if (!isEmpty(axisEncode)) {
      axisComponent.set('encode', axisEncode, !!axis.encoding || axis.labelAngle !== undefined);
    }

    return axisComponent;
  }

  function initLayoutSize(_ref) {
    let {
      encoding,
      size
    } = _ref;

    for (const channel of POSITION_SCALE_CHANNELS) {
      const sizeType = getSizeChannel(channel);

      if (isStep(size[sizeType])) {
        if (isContinuousFieldOrDatumDef(encoding[channel])) {
          delete size[sizeType];
          warn(stepDropped(sizeType));
        }
      }
    }

    return size;
  }

  function initMarkdef(originalMarkDef, encoding, config) {
    // FIXME: markDef expects that exprRefs are replaced recursively but replaceExprRef only replaces the top level
    const markDef = replaceExprRef(originalMarkDef); // set orient, which can be overridden by rules as sometimes the specified orient is invalid.

    const specifiedOrient = getMarkPropOrConfig('orient', markDef, config);
    markDef.orient = orient(markDef.type, encoding, specifiedOrient);

    if (specifiedOrient !== undefined && specifiedOrient !== markDef.orient) {
      warn(orientOverridden(markDef.orient, specifiedOrient));
    }

    if (markDef.type === 'bar' && markDef.orient) {
      const cornerRadiusEnd = getMarkPropOrConfig('cornerRadiusEnd', markDef, config);

      if (cornerRadiusEnd !== undefined) {
        const newProps = markDef.orient === 'horizontal' && encoding.x2 || markDef.orient === 'vertical' && encoding.y2 ? ['cornerRadius'] : BAR_CORNER_RADIUS_INDEX[markDef.orient];

        for (const newProp of newProps) {
          markDef[newProp] = cornerRadiusEnd;
        }

        if (markDef.cornerRadiusEnd !== undefined) {
          delete markDef.cornerRadiusEnd; // no need to keep the original cap cornerRadius
        }
      }
    } // set opacity and filled if not specified in mark config


    const specifiedOpacity = getMarkPropOrConfig('opacity', markDef, config);

    if (specifiedOpacity === undefined) {
      markDef.opacity = opacity(markDef.type, encoding);
    } // set cursor, which should be pointer if href channel is present unless otherwise specified


    const specifiedCursor = getMarkPropOrConfig('cursor', markDef, config);

    if (specifiedCursor === undefined) {
      markDef.cursor = cursor(markDef, encoding, config);
    }

    return markDef;
  }

  function cursor(markDef, encoding, config) {
    if (encoding.href || markDef.href || getMarkPropOrConfig('href', markDef, config)) {
      return 'pointer';
    }

    return markDef.cursor;
  }

  function opacity(mark, encoding) {
    if (contains([POINT, TICK, CIRCLE, SQUARE], mark)) {
      // point-based marks
      if (!isAggregate$1(encoding)) {
        return 0.7;
      }
    }

    return undefined;
  }

  function defaultFilled(markDef, config, _ref) {
    let {
      graticule
    } = _ref;

    if (graticule) {
      return false;
    }

    const filledConfig = getMarkConfig('filled', markDef, config);
    const mark = markDef.type;
    return getFirstDefined(filledConfig, mark !== POINT && mark !== LINE && mark !== RULE);
  }

  function orient(mark, encoding, specifiedOrient) {
    switch (mark) {
      case POINT:
      case CIRCLE:
      case SQUARE:
      case TEXT:
      case RECT:
      case IMAGE:
        // orient is meaningless for these marks.
        return undefined;
    }

    const {
      x,
      y,
      x2,
      y2
    } = encoding;

    switch (mark) {
      case BAR:
        if (isFieldDef(x) && (isBinned(x.bin) || isFieldDef(y) && y.aggregate && !x.aggregate)) {
          return 'vertical';
        }

        if (isFieldDef(y) && (isBinned(y.bin) || isFieldDef(x) && x.aggregate && !y.aggregate)) {
          return 'horizontal';
        }

        if (y2 || x2) {
          // Ranged bar does not always have clear orientation, so we allow overriding
          if (specifiedOrient) {
            return specifiedOrient;
          } // If y is range and x is non-range, non-bin Q, y is likely a prebinned field


          if (!x2) {
            if (isFieldDef(x) && x.type === QUANTITATIVE && !isBinning(x.bin) || isNumericDataDef(x)) {
              return 'horizontal';
            }
          } // If x is range and y is non-range, non-bin Q, x is likely a prebinned field


          if (!y2) {
            if (isFieldDef(y) && y.type === QUANTITATIVE && !isBinning(y.bin) || isNumericDataDef(y)) {
              return 'vertical';
            }
          }
        }

      // falls through

      case RULE:
        // return undefined for line segment rule and bar with both axis ranged
        // we have to ignore the case that the data are already binned
        if (x2 && !(isFieldDef(x) && isBinned(x.bin)) && y2 && !(isFieldDef(y) && isBinned(y.bin))) {
          return undefined;
        }

      // falls through

      case AREA:
        // If there are range for both x and y, y (vertical) has higher precedence.
        if (y2) {
          if (isFieldDef(y) && isBinned(y.bin)) {
            return 'horizontal';
          } else {
            return 'vertical';
          }
        } else if (x2) {
          if (isFieldDef(x) && isBinned(x.bin)) {
            return 'vertical';
          } else {
            return 'horizontal';
          }
        } else if (mark === RULE) {
          if (x && !y) {
            return 'vertical';
          } else if (y && !x) {
            return 'horizontal';
          }
        }

      // falls through

      case LINE:
      case TICK:
        {
          // Tick is opposite to bar, line, area and never have ranged mark.
          const xIsContinuous = isContinuousFieldOrDatumDef(x);
          const yIsContinuous = isContinuousFieldOrDatumDef(y);

          if (specifiedOrient) {
            return specifiedOrient;
          } else if (xIsContinuous && !yIsContinuous) {
            return mark !== 'tick' ? 'horizontal' : 'vertical';
          } else if (!xIsContinuous && yIsContinuous) {
            return mark !== 'tick' ? 'vertical' : 'horizontal';
          } else if (xIsContinuous && yIsContinuous) {
            const xDef = x; // we can cast here since they are surely fieldDef

            const yDef = y;
            const xIsTemporal = xDef.type === TEMPORAL;
            const yIsTemporal = yDef.type === TEMPORAL; // temporal without timeUnit is considered continuous, but better serves as dimension

            if (xIsTemporal && !yIsTemporal) {
              return mark !== 'tick' ? 'vertical' : 'horizontal';
            } else if (!xIsTemporal && yIsTemporal) {
              return mark !== 'tick' ? 'horizontal' : 'vertical';
            }

            if (!xDef.aggregate && yDef.aggregate) {
              return mark !== 'tick' ? 'vertical' : 'horizontal';
            } else if (xDef.aggregate && !yDef.aggregate) {
              return mark !== 'tick' ? 'horizontal' : 'vertical';
            }

            return 'vertical';
          } else {
            return undefined;
          }
        }
    }

    return 'vertical';
  }

  const arc = {
    vgMark: 'arc',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          size: 'ignore',
          orient: 'ignore',
          theta: 'ignore'
        }),
        ...pointPosition('x', model, {
          defaultPos: 'mid'
        }),
        ...pointPosition('y', model, {
          defaultPos: 'mid'
        }),
        // arcs are rectangles in polar coordinates
        ...rectPosition(model, 'radius'),
        ...rectPosition(model, 'theta')
      };
    }
  };

  const area = {
    vgMark: 'area',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          orient: 'include',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...pointOrRangePosition('x', model, {
          defaultPos: 'zeroOrMin',
          defaultPos2: 'zeroOrMin',
          range: model.markDef.orient === 'horizontal'
        }),
        ...pointOrRangePosition('y', model, {
          defaultPos: 'zeroOrMin',
          defaultPos2: 'zeroOrMin',
          range: model.markDef.orient === 'vertical'
        }),
        ...defined(model)
      };
    }
  };

  const bar = {
    vgMark: 'rect',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          orient: 'ignore',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...rectPosition(model, 'x'),
        ...rectPosition(model, 'y')
      };
    }
  };

  const geoshape = {
    vgMark: 'shape',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          size: 'ignore',
          orient: 'ignore',
          theta: 'ignore'
        })
      };
    },
    postEncodingTransform: model => {
      const {
        encoding
      } = model;
      const shapeDef = encoding.shape;
      const transform = {
        type: 'geoshape',
        projection: model.projectionName(),
        // as: 'shape',
        ...(shapeDef && isFieldDef(shapeDef) && shapeDef.type === GEOJSON ? {
          field: vgField(shapeDef, {
            expr: 'datum'
          })
        } : {})
      };
      return [transform];
    }
  };

  const image = {
    vgMark: 'image',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'ignore',
          orient: 'ignore',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...rectPosition(model, 'x'),
        ...rectPosition(model, 'y'),
        ...text$1(model, 'url')
      };
    }
  };

  const line = {
    vgMark: 'line',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          size: 'ignore',
          orient: 'ignore',
          theta: 'ignore'
        }),
        ...pointPosition('x', model, {
          defaultPos: 'mid'
        }),
        ...pointPosition('y', model, {
          defaultPos: 'mid'
        }),
        ...nonPosition('size', model, {
          vgChannel: 'strokeWidth' // VL's line size is strokeWidth

        }),
        ...defined(model)
      };
    }
  };
  const trail = {
    vgMark: 'trail',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          size: 'include',
          orient: 'ignore',
          theta: 'ignore'
        }),
        ...pointPosition('x', model, {
          defaultPos: 'mid'
        }),
        ...pointPosition('y', model, {
          defaultPos: 'mid'
        }),
        ...nonPosition('size', model),
        ...defined(model)
      };
    }
  };

  function encodeEntry(model, fixedShape) {
    const {
      config
    } = model;
    return { ...baseEncodeEntry(model, {
        align: 'ignore',
        baseline: 'ignore',
        color: 'include',
        size: 'include',
        orient: 'ignore',
        theta: 'ignore'
      }),
      ...pointPosition('x', model, {
        defaultPos: 'mid'
      }),
      ...pointPosition('y', model, {
        defaultPos: 'mid'
      }),
      ...nonPosition('size', model),
      ...nonPosition('angle', model),
      ...shapeMixins(model, config, fixedShape)
    };
  }

  function shapeMixins(model, config, fixedShape) {
    if (fixedShape) {
      return {
        shape: {
          value: fixedShape
        }
      };
    }

    return nonPosition('shape', model);
  }
  const point = {
    vgMark: 'symbol',
    encodeEntry: model => {
      return encodeEntry(model);
    }
  };
  const circle = {
    vgMark: 'symbol',
    encodeEntry: model => {
      return encodeEntry(model, 'circle');
    }
  };
  const square = {
    vgMark: 'symbol',
    encodeEntry: model => {
      return encodeEntry(model, 'square');
    }
  };

  const rect = {
    vgMark: 'rect',
    encodeEntry: model => {
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          orient: 'ignore',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...rectPosition(model, 'x'),
        ...rectPosition(model, 'y')
      };
    }
  };

  const rule = {
    vgMark: 'rule',
    encodeEntry: model => {
      const {
        markDef
      } = model;
      const orient = markDef.orient;

      if (!model.encoding.x && !model.encoding.y && !model.encoding.latitude && !model.encoding.longitude) {
        // Show nothing if we have none of x, y, lat, and long.
        return {};
      }

      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          orient: 'ignore',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...pointOrRangePosition('x', model, {
          defaultPos: orient === 'horizontal' ? 'zeroOrMax' : 'mid',
          defaultPos2: 'zeroOrMin',
          range: orient !== 'vertical' // include x2 for horizontal or line segment rule

        }),
        ...pointOrRangePosition('y', model, {
          defaultPos: orient === 'vertical' ? 'zeroOrMax' : 'mid',
          defaultPos2: 'zeroOrMin',
          range: orient !== 'horizontal' // include y2 for vertical or line segment rule

        }),
        ...nonPosition('size', model, {
          vgChannel: 'strokeWidth' // VL's rule size is strokeWidth

        })
      };
    }
  };

  const text = {
    vgMark: 'text',
    encodeEntry: model => {
      const {
        config,
        encoding
      } = model;
      return { ...baseEncodeEntry(model, {
          align: 'include',
          baseline: 'include',
          color: 'include',
          size: 'ignore',
          orient: 'ignore',
          theta: 'include'
        }),
        ...pointPosition('x', model, {
          defaultPos: 'mid'
        }),
        ...pointPosition('y', model, {
          defaultPos: 'mid'
        }),
        ...text$1(model),
        ...nonPosition('size', model, {
          vgChannel: 'fontSize' // VL's text size is fontSize

        }),
        ...nonPosition('angle', model),
        ...valueIfDefined('align', align(model.markDef, encoding, config)),
        ...valueIfDefined('baseline', baseline(model.markDef, encoding, config)),
        ...pointPosition('radius', model, {
          defaultPos: null
        }),
        ...pointPosition('theta', model, {
          defaultPos: null
        })
      };
    }
  };

  function align(markDef, encoding, config) {
    const a = getMarkPropOrConfig('align', markDef, config);

    if (a === undefined) {
      return 'center';
    } // If there is a config, Vega-parser will process this already.


    return undefined;
  }

  function baseline(markDef, encoding, config) {
    const b = getMarkPropOrConfig('baseline', markDef, config);

    if (b === undefined) {
      return 'middle';
    } // If there is a config, Vega-parser will process this already.


    return undefined;
  }

  const tick = {
    vgMark: 'rect',
    encodeEntry: model => {
      const {
        config,
        markDef
      } = model;
      const orient = markDef.orient;
      const vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
      const vgThicknessChannel = orient === 'horizontal' ? 'height' : 'width';
      return { ...baseEncodeEntry(model, {
          align: 'ignore',
          baseline: 'ignore',
          color: 'include',
          orient: 'ignore',
          size: 'ignore',
          theta: 'ignore'
        }),
        ...pointPosition('x', model, {
          defaultPos: 'mid',
          vgChannel: 'xc'
        }),
        ...pointPosition('y', model, {
          defaultPos: 'mid',
          vgChannel: 'yc'
        }),
        // size / thickness => width / height
        ...nonPosition('size', model, {
          defaultValue: defaultSize(model),
          vgChannel: vgSizeChannel
        }),
        [vgThicknessChannel]: signalOrValueRef(getMarkPropOrConfig('thickness', markDef, config))
      };
    }
  };

  function defaultSize(model) {
    var _getMarkPropOrConfig;

    const {
      config,
      markDef
    } = model;
    const {
      orient
    } = markDef;
    const vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
    const scale = model.getScaleComponent(orient === 'horizontal' ? 'x' : 'y');
    const markPropOrConfig = (_getMarkPropOrConfig = getMarkPropOrConfig('size', markDef, config, {
      vgChannel: vgSizeChannel
    })) !== null && _getMarkPropOrConfig !== void 0 ? _getMarkPropOrConfig : config.tick.bandSize;

    if (markPropOrConfig !== undefined) {
      return markPropOrConfig;
    } else {
      const scaleRange = scale ? scale.get('range') : undefined;

      if (scaleRange && isVgRangeStep(scaleRange) && vega.isNumber(scaleRange.step)) {
        return scaleRange.step * 3 / 4;
      }

      const defaultViewStep = getViewConfigDiscreteStep(config.view, vgSizeChannel);
      return defaultViewStep * 3 / 4;
    }
  }

  const markCompiler = {
    arc,
    area,
    bar,
    circle,
    geoshape,
    image,
    line,
    point,
    rect,
    rule,
    square,
    text,
    tick,
    trail
  };
  function parseMarkGroups(model) {
    if (contains([LINE, AREA, TRAIL], model.mark)) {
      const details = pathGroupingFields(model.mark, model.encoding);

      if (details.length > 0) {
        return getPathGroups(model, details);
      } // otherwise use standard mark groups

    } else if (model.mark === BAR) {
      const hasCornerRadius = VG_CORNERRADIUS_CHANNELS.some(prop => getMarkPropOrConfig(prop, model.markDef, model.config));

      if (model.stack && !model.fieldDef('size') && hasCornerRadius) {
        return getGroupsForStackedBarWithCornerRadius(model);
      }
    }

    return getMarkGroup(model);
  }
  const FACETED_PATH_PREFIX = 'faceted_path_';

  function getPathGroups(model, details) {
    // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
    return [{
      name: model.getName('pathgroup'),
      type: 'group',
      from: {
        facet: {
          name: FACETED_PATH_PREFIX + model.requestDataName(DataSourceType.Main),
          data: model.requestDataName(DataSourceType.Main),
          groupby: details
        }
      },
      encode: {
        update: {
          width: {
            field: {
              group: 'width'
            }
          },
          height: {
            field: {
              group: 'height'
            }
          }
        }
      },
      // With subfacet for line/area group, need to use faceted data from above.
      marks: getMarkGroup(model, {
        fromPrefix: FACETED_PATH_PREFIX
      })
    }];
  }

  const STACK_GROUP_PREFIX = 'stack_group_';
  /**
   * We need to put stacked bars into groups in order to enable cornerRadius for stacks.
   * If stack is used and the model doesn't have size encoding, we put the mark into groups,
   * and apply cornerRadius properties at the group.
   */

  function getGroupsForStackedBarWithCornerRadius(model) {
    var _model$stack$groupbyC;

    // Generate the mark
    const [mark] = getMarkGroup(model, {
      fromPrefix: STACK_GROUP_PREFIX
    }); // Get the scale for the stacked field

    const fieldScale = model.scaleName(model.stack.fieldChannel);

    const stackField = function () {
      let opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return model.vgField(model.stack.fieldChannel, opt);
    }; // Find the min/max of the pixel value on the stacked direction


    const stackFieldGroup = (func, expr) => {
      const vgFieldMinMax = [stackField({
        prefix: 'min',
        suffix: 'start',
        expr
      }), stackField({
        prefix: 'max',
        suffix: 'start',
        expr
      }), stackField({
        prefix: 'min',
        suffix: 'end',
        expr
      }), stackField({
        prefix: 'max',
        suffix: 'end',
        expr
      })];
      return "".concat(func, "(").concat(vgFieldMinMax.map(field => "scale('".concat(fieldScale, "',").concat(field, ")")).join(','), ")");
    };

    let groupUpdate;
    let innerGroupUpdate; // Build the encoding for group and an inner group

    if (model.stack.fieldChannel === 'x') {
      // Move cornerRadius, y/yc/y2/height properties to group
      // Group x/x2 should be the min/max of the marks within
      groupUpdate = { ...pick(mark.encode.update, ['y', 'yc', 'y2', 'height', ...VG_CORNERRADIUS_CHANNELS]),
        x: {
          signal: stackFieldGroup('min', 'datum')
        },
        x2: {
          signal: stackFieldGroup('max', 'datum')
        },
        clip: {
          value: true
        }
      }; // Inner group should revert the x translation, and pass height through

      innerGroupUpdate = {
        x: {
          field: {
            group: 'x'
          },
          mult: -1
        },
        height: {
          field: {
            group: 'height'
          }
        }
      }; // The marks should use the same height as group, without y/yc/y2 properties (because it's already done by group)
      // This is why size encoding is not supported yet

      mark.encode.update = { ...omit(mark.encode.update, ['y', 'yc', 'y2']),
        height: {
          field: {
            group: 'height'
          }
        }
      };
    } else {
      groupUpdate = { ...pick(mark.encode.update, ['x', 'xc', 'x2', 'width']),
        y: {
          signal: stackFieldGroup('min', 'datum')
        },
        y2: {
          signal: stackFieldGroup('max', 'datum')
        },
        clip: {
          value: true
        }
      };
      innerGroupUpdate = {
        y: {
          field: {
            group: 'y'
          },
          mult: -1
        },
        width: {
          field: {
            group: 'width'
          }
        }
      };
      mark.encode.update = { ...omit(mark.encode.update, ['x', 'xc', 'x2']),
        width: {
          field: {
            group: 'width'
          }
        }
      };
    } // Deal with cornerRadius properties


    for (const key of VG_CORNERRADIUS_CHANNELS) {
      const configValue = getMarkConfig(key, model.markDef, model.config); // Move from mark to group

      if (mark.encode.update[key]) {
        groupUpdate[key] = mark.encode.update[key];
        delete mark.encode.update[key];
      } else if (configValue) {
        groupUpdate[key] = signalOrValueRef(configValue);
      } // Overwrite any cornerRadius on mark set by config --- they are already moved to the group


      if (configValue) {
        mark.encode.update[key] = {
          value: 0
        };
      }
    }

    const groupby = [];

    if (((_model$stack$groupbyC = model.stack.groupbyChannels) === null || _model$stack$groupbyC === void 0 ? void 0 : _model$stack$groupbyC.length) > 0) {
      for (const groupbyChannel of model.stack.groupbyChannels) {
        // For bin and time unit, we have to add bin/timeunit -end channels.
        const groupByField = model.fieldDef(groupbyChannel);
        const field = vgField(groupByField);

        if (field) {
          groupby.push(field);
        }

        if (groupByField !== null && groupByField !== void 0 && groupByField.bin || groupByField !== null && groupByField !== void 0 && groupByField.timeUnit) {
          groupby.push(vgField(groupByField, {
            binSuffix: 'end'
          }));
        }
      }
    }

    const strokeProperties = ['stroke', 'strokeWidth', 'strokeJoin', 'strokeCap', 'strokeDash', 'strokeDashOffset', 'strokeMiterLimit', 'strokeOpacity']; // Generate stroke properties for the group

    groupUpdate = strokeProperties.reduce((encode, prop) => {
      if (mark.encode.update[prop]) {
        return { ...encode,
          [prop]: mark.encode.update[prop]
        };
      } else {
        const configValue = getMarkConfig(prop, model.markDef, model.config);

        if (configValue !== undefined) {
          return { ...encode,
            [prop]: signalOrValueRef(configValue)
          };
        } else {
          return encode;
        }
      }
    }, groupUpdate); // Apply strokeForeground and strokeOffset if stroke is used

    if (groupUpdate.stroke) {
      groupUpdate.strokeForeground = {
        value: true
      };
      groupUpdate.strokeOffset = {
        value: 0
      };
    }

    return [{
      type: 'group',
      from: {
        facet: {
          data: model.requestDataName(DataSourceType.Main),
          name: STACK_GROUP_PREFIX + model.requestDataName(DataSourceType.Main),
          groupby,
          aggregate: {
            fields: [stackField({
              suffix: 'start'
            }), stackField({
              suffix: 'start'
            }), stackField({
              suffix: 'end'
            }), stackField({
              suffix: 'end'
            })],
            ops: ['min', 'max', 'min', 'max']
          }
        }
      },
      encode: {
        update: groupUpdate
      },
      marks: [{
        type: 'group',
        encode: {
          update: innerGroupUpdate
        },
        marks: [mark]
      }]
    }];
  }

  function getSort(model) {
    const {
      encoding,
      stack,
      mark,
      markDef,
      config
    } = model;
    const order = encoding.order;

    if (!vega.isArray(order) && isValueDef(order) && isNullOrFalse(order.value) || !order && isNullOrFalse(getMarkPropOrConfig('order', markDef, config))) {
      return undefined;
    } else if ((vega.isArray(order) || isFieldDef(order)) && !stack) {
      // Sort by the order field if it is specified and the field is not stacked. (For stacked field, order specify stack order.)
      return sortParams(order, {
        expr: 'datum'
      });
    } else if (isPathMark(mark)) {
      // For both line and area, we sort values based on dimension by default
      const dimensionChannel = markDef.orient === 'horizontal' ? 'y' : 'x';
      const dimensionChannelDef = encoding[dimensionChannel];

      if (isFieldDef(dimensionChannelDef)) {
        const s = dimensionChannelDef.sort;

        if (vega.isArray(s)) {
          return {
            field: vgField(dimensionChannelDef, {
              prefix: dimensionChannel,
              suffix: 'sort_index',
              expr: 'datum'
            })
          };
        } else if (isSortField(s)) {
          return {
            field: vgField({
              // FIXME: this op might not already exist?
              // FIXME: what if dimensionChannel (x or y) contains custom domain?
              aggregate: isAggregate$1(model.encoding) ? s.op : undefined,
              field: s.field
            }, {
              expr: 'datum'
            })
          };
        } else if (isSortByEncoding(s)) {
          const fieldDefToSort = model.fieldDef(s.encoding);
          return {
            field: vgField(fieldDefToSort, {
              expr: 'datum'
            }),
            order: s.order
          };
        } else if (s === null) {
          return undefined;
        } else {
          var _model$stack;

          return {
            field: vgField(dimensionChannelDef, {
              // For stack with imputation, we only have bin_mid
              binSuffix: (_model$stack = model.stack) !== null && _model$stack !== void 0 && _model$stack.impute ? 'mid' : undefined,
              expr: 'datum'
            })
          };
        }
      }

      return undefined;
    }

    return undefined;
  }

  function getMarkGroup(model) {
    let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fromPrefix: ''
    };
    const {
      mark,
      markDef,
      encoding,
      config
    } = model;
    const clip = getFirstDefined(markDef.clip, scaleClip(model), projectionClip(model));
    const style = getStyles(markDef);
    const key = encoding.key;
    const sort = getSort(model);
    const interactive = interactiveFlag(model);
    const aria = getMarkPropOrConfig('aria', markDef, config);
    const postEncodingTransform = markCompiler[mark].postEncodingTransform ? markCompiler[mark].postEncodingTransform(model) : null;
    return [{
      name: model.getName('marks'),
      type: markCompiler[mark].vgMark,
      ...(clip ? {
        clip: true
      } : {}),
      ...(style ? {
        style
      } : {}),
      ...(key ? {
        key: key.field
      } : {}),
      ...(sort ? {
        sort
      } : {}),
      ...(interactive ? interactive : {}),
      ...(aria === false ? {
        aria
      } : {}),
      from: {
        data: opt.fromPrefix + model.requestDataName(DataSourceType.Main)
      },
      encode: {
        update: markCompiler[mark].encodeEntry(model)
      },
      ...(postEncodingTransform ? {
        transform: postEncodingTransform
      } : {})
    }];
  }
  /**
   * If scales are bound to interval selections, we want to automatically clip
   * marks to account for panning/zooming interactions. We identify bound scales
   * by the selectionExtent property, which gets added during scale parsing.
   */


  function scaleClip(model) {
    const xScale = model.getScaleComponent('x');
    const yScale = model.getScaleComponent('y');
    return xScale !== null && xScale !== void 0 && xScale.get('selectionExtent') || yScale !== null && yScale !== void 0 && yScale.get('selectionExtent') ? true : undefined;
  }
  /**
   * If we use a custom projection with auto-fitting to the geodata extent,
   * we need to clip to ensure the chart size doesn't explode.
   */


  function projectionClip(model) {
    const projection = model.component.projection;
    return projection && !projection.isFit ? true : undefined;
  }
  /**
   * Only output interactive flags if we have selections defined somewhere in our model hierarchy.
   */


  function interactiveFlag(model) {
    if (!model.component.selection) return null;
    const unitCount = keys(model.component.selection).length;
    let parentCount = unitCount;
    let parent = model.parent;

    while (parent && parentCount === 0) {
      parentCount = keys(parent.component.selection).length;
      parent = parent.parent;
    }

    return parentCount ? {
      interactive: unitCount > 0 || !!model.encoding.tooltip
    } : null;
  }

  /**
   * Internal model of Vega-Lite specification for the compiler.
   */

  class UnitModel extends ModelWithField {
    constructor(spec, parent, parentGivenName) {
      var _spec$params;

      let parentGivenSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      let config = arguments.length > 4 ? arguments[4] : undefined;
      super(spec, 'unit', parent, parentGivenName, config, undefined, isFrameMixins(spec) ? spec.view : undefined);

      _defineProperty(this, "markDef", void 0);

      _defineProperty(this, "encoding", void 0);

      _defineProperty(this, "specifiedScales", {});

      _defineProperty(this, "stack", void 0);

      _defineProperty(this, "specifiedAxes", {});

      _defineProperty(this, "specifiedLegends", {});

      _defineProperty(this, "specifiedProjection", {});

      _defineProperty(this, "selection", []);

      _defineProperty(this, "children", []);

      const markDef = isMarkDef(spec.mark) ? { ...spec.mark
      } : {
        type: spec.mark
      };
      const mark = markDef.type; // Need to init filled before other mark properties because encoding depends on filled but other mark properties depend on types inside encoding

      if (markDef.filled === undefined) {
        markDef.filled = defaultFilled(markDef, config, {
          graticule: spec.data && isGraticuleGenerator(spec.data)
        });
      }

      const encoding = this.encoding = initEncoding(spec.encoding || {}, mark, markDef.filled, config);
      this.markDef = initMarkdef(markDef, encoding, config);
      this.size = initLayoutSize({
        encoding,
        size: isFrameMixins(spec) ? { ...parentGivenSize,
          ...(spec.width ? {
            width: spec.width
          } : {}),
          ...(spec.height ? {
            height: spec.height
          } : {})
        } : parentGivenSize
      }); // calculate stack properties

      this.stack = stack(mark, encoding);
      this.specifiedScales = this.initScales(mark, encoding);
      this.specifiedAxes = this.initAxes(encoding);
      this.specifiedLegends = this.initLegends(encoding);
      this.specifiedProjection = spec.projection; // Selections will be initialized upon parse.

      this.selection = ((_spec$params = spec.params) !== null && _spec$params !== void 0 ? _spec$params : []).filter(p => isSelectionParameter(p));
    }

    get hasProjection() {
      const {
        encoding
      } = this;
      const isGeoShapeMark = this.mark === GEOSHAPE;
      const hasGeoPosition = encoding && GEOPOSITION_CHANNELS.some(channel => isFieldOrDatumDef(encoding[channel]));
      return isGeoShapeMark || hasGeoPosition;
    }
    /**
     * Return specified Vega-Lite scale domain for a particular channel
     * @param channel
     */


    scaleDomain(channel) {
      const scale = this.specifiedScales[channel];
      return scale ? scale.domain : undefined;
    }

    axis(channel) {
      return this.specifiedAxes[channel];
    }

    legend(channel) {
      return this.specifiedLegends[channel];
    }

    initScales(mark, encoding) {
      return SCALE_CHANNELS.reduce((scales, channel) => {
        const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);

        if (fieldOrDatumDef) {
          var _fieldOrDatumDef$scal;

          scales[channel] = this.initScale((_fieldOrDatumDef$scal = fieldOrDatumDef.scale) !== null && _fieldOrDatumDef$scal !== void 0 ? _fieldOrDatumDef$scal : {});
        }

        return scales;
      }, {});
    }

    initScale(scale) {
      const {
        domain,
        range
      } = scale; // TODO: we could simplify this function if we had a recursive replace function

      const scaleInternal = replaceExprRef(scale);

      if (vega.isArray(domain)) {
        scaleInternal.domain = domain.map(signalRefOrValue);
      }

      if (vega.isArray(range)) {
        scaleInternal.range = range.map(signalRefOrValue);
      }

      return scaleInternal;
    }

    initAxes(encoding) {
      return POSITION_SCALE_CHANNELS.reduce((_axis, channel) => {
        // Position Axis
        // TODO: handle ConditionFieldDef
        const channelDef = encoding[channel];

        if (isFieldOrDatumDef(channelDef) || channel === X && isFieldOrDatumDef(encoding.x2) || channel === Y && isFieldOrDatumDef(encoding.y2)) {
          const axisSpec = isFieldOrDatumDef(channelDef) ? channelDef.axis : undefined;
          _axis[channel] = axisSpec ? this.initAxis({ ...axisSpec
          }) // convert truthy value to object
          : axisSpec;
        }

        return _axis;
      }, {});
    }

    initAxis(axis) {
      const props = keys(axis);
      const axisInternal = {};

      for (const prop of props) {
        const val = axis[prop];
        axisInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
      }

      return axisInternal;
    }

    initLegends(encoding) {
      return NONPOSITION_SCALE_CHANNELS.reduce((_legend, channel) => {
        const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);

        if (fieldOrDatumDef && supportLegend(channel)) {
          const legend = fieldOrDatumDef.legend;
          _legend[channel] = legend ? replaceExprRef(legend) // convert truthy value to object
          : legend;
        }

        return _legend;
      }, {});
    }

    parseData() {
      this.component.data = parseData(this);
    }

    parseLayoutSize() {
      parseUnitLayoutSize(this);
    }

    parseSelections() {
      this.component.selection = parseUnitSelection(this, this.selection);
    }

    parseMarkGroup() {
      this.component.mark = parseMarkGroups(this);
    }

    parseAxesAndHeaders() {
      this.component.axes = parseUnitAxes(this);
    }

    assembleSelectionTopLevelSignals(signals) {
      return assembleTopLevelSignals(this, signals);
    }

    assembleSignals() {
      return [...assembleAxisSignals(this), ...assembleUnitSelectionSignals(this, [])];
    }

    assembleSelectionData(data) {
      return assembleUnitSelectionData(this, data);
    }

    assembleLayout() {
      return null;
    }

    assembleLayoutSignals() {
      return assembleLayoutSignals(this);
    }

    assembleMarks() {
      var _this$component$mark;

      let marks = (_this$component$mark = this.component.mark) !== null && _this$component$mark !== void 0 ? _this$component$mark : []; // If this unit is part of a layer, selections should augment
      // all in concert rather than each unit individually. This
      // ensures correct interleaving of clipping and brushed marks.

      if (!this.parent || !isLayerModel(this.parent)) {
        marks = assembleUnitSelectionMarks(this, marks);
      }

      return marks.map(this.correctDataNames);
    }

    assembleGroupStyle() {
      const {
        style
      } = this.view || {};

      if (style !== undefined) {
        return style;
      }

      if (this.encoding.x || this.encoding.y) {
        return 'cell';
      } else {
        return undefined;
      }
    }

    getMapping() {
      return this.encoding;
    }

    get mark() {
      return this.markDef.type;
    }

    channelHasField(channel) {
      return channelHasField(this.encoding, channel);
    }

    fieldDef(channel) {
      const channelDef = this.encoding[channel];
      return getFieldDef(channelDef);
    }

    typedFieldDef(channel) {
      const fieldDef = this.fieldDef(channel);

      if (isTypedFieldDef(fieldDef)) {
        return fieldDef;
      }

      return null;
    }

  }

  class LayerModel extends Model {
    // HACK: This should be (LayerModel | UnitModel)[], but setting the correct type leads to weird error.
    // So I'm just putting generic Model for now
    constructor(spec, parent, parentGivenName, parentGivenSize, config) {
      super(spec, 'layer', parent, parentGivenName, config, spec.resolve, spec.view);

      _defineProperty(this, "children", void 0);

      const layoutSize = { ...parentGivenSize,
        ...(spec.width ? {
          width: spec.width
        } : {}),
        ...(spec.height ? {
          height: spec.height
        } : {})
      };
      this.children = spec.layer.map((layer, i) => {
        if (isLayerSpec(layer)) {
          return new LayerModel(layer, this, this.getName("layer_".concat(i)), layoutSize, config);
        } else if (isUnitSpec(layer)) {
          return new UnitModel(layer, this, this.getName("layer_".concat(i)), layoutSize, config);
        }

        throw new Error(invalidSpec(layer));
      });
    }

    parseData() {
      this.component.data = parseData(this);

      for (const child of this.children) {
        child.parseData();
      }
    }

    parseLayoutSize() {
      parseLayerLayoutSize(this);
    }

    parseSelections() {
      // Merge selections up the hierarchy so that they may be referenced
      // across unit specs. Persist their definitions within each child
      // to assemble signals which remain within output Vega unit groups.
      this.component.selection = {};

      for (const child of this.children) {
        child.parseSelections();

        for (const key of keys(child.component.selection)) {
          this.component.selection[key] = child.component.selection[key];
        }
      }
    }

    parseMarkGroup() {
      for (const child of this.children) {
        child.parseMarkGroup();
      }
    }

    parseAxesAndHeaders() {
      parseLayerAxes(this);
    }

    assembleSelectionTopLevelSignals(signals) {
      return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
    } // TODO: Support same named selections across children.


    assembleSignals() {
      return this.children.reduce((signals, child) => {
        return signals.concat(child.assembleSignals());
      }, assembleAxisSignals(this));
    }

    assembleLayoutSignals() {
      return this.children.reduce((signals, child) => {
        return signals.concat(child.assembleLayoutSignals());
      }, assembleLayoutSignals(this));
    }

    assembleSelectionData(data) {
      return this.children.reduce((db, child) => child.assembleSelectionData(db), data);
    }

    assembleGroupStyle() {
      const uniqueStyles = new Set();

      for (const child of this.children) {
        for (const style of vega.array(child.assembleGroupStyle())) {
          uniqueStyles.add(style);
        }
      }

      const styles = Array.from(uniqueStyles);
      return styles.length > 1 ? styles : styles.length === 1 ? styles[0] : undefined;
    }

    assembleTitle() {
      let title = super.assembleTitle();

      if (title) {
        return title;
      } // If title does not provide layer, look into children


      for (const child of this.children) {
        title = child.assembleTitle();

        if (title) {
          return title;
        }
      }

      return undefined;
    }

    assembleLayout() {
      return null;
    }

    assembleMarks() {
      return assembleLayerSelectionMarks(this, this.children.flatMap(child => {
        return child.assembleMarks();
      }));
    }

    assembleLegends() {
      return this.children.reduce((legends, child) => {
        return legends.concat(child.assembleLegends());
      }, assembleLegends(this));
    }

  }

  function buildModel(spec, parent, parentGivenName, unitSize, config) {
    if (isFacetSpec(spec)) {
      return new FacetModel(spec, parent, parentGivenName, config);
    } else if (isLayerSpec(spec)) {
      return new LayerModel(spec, parent, parentGivenName, unitSize, config);
    } else if (isUnitSpec(spec)) {
      return new UnitModel(spec, parent, parentGivenName, unitSize, config);
    } else if (isAnyConcatSpec(spec)) {
      return new ConcatModel(spec, parent, parentGivenName, config);
    }

    throw new Error(invalidSpec(spec));
  }

  /**
   * Vega-Lite's main function, for compiling Vega-Lite spec into Vega spec.
   *
   * At a high-level, we make the following transformations in different phases:
   *
   * Input spec
   *     |
   *     |  (Normalization)
   *     v
   * Normalized Spec (Row/Column channels in single-view specs becomes faceted specs, composite marks becomes layered specs.)
   *     |
   *     |  (Build Model)
   *     v
   * A model tree of the spec
   *     |
   *     |  (Parse)
   *     v
   * A model tree with parsed components (intermediate structure of visualization primitives in a format that can be easily merged)
   *     |
   *     | (Optimize)
   *     v
   * A model tree with parsed components with the data component optimized
   *     |
   *     | (Assemble)
   *     v
   * Vega spec
   *
   * @param inputSpec The Vega-Lite specification.
   * @param opt       Optional arguments passed to the Vega-Lite compiler.
   * @returns         An object containing the compiled Vega spec and normalized Vega-Lite spec.
   */
  function compile(inputSpec) {
    let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 0. Augment opt with default opts
    if (opt.logger) {
      // set the singleton logger to the provided logger
      set(opt.logger);
    }

    if (opt.fieldTitle) {
      // set the singleton field title formatter
      setTitleFormatter(opt.fieldTitle);
    }

    try {
      // 1. Initialize config by deep merging default config with the config provided via option and the input spec.
      const config = initConfig(vega.mergeConfig(opt.config, inputSpec.config)); // 2. Normalize: Convert input spec -> normalized spec
      // - Decompose all extended unit specs into composition of unit spec. For example, a box plot get expanded into multiple layers of bars, ticks, and rules. The shorthand row/column channel is also expanded to a facet spec.
      // - Normalize autosize and width or height spec

      const spec = normalize(inputSpec, config); // 3. Build Model: normalized spec -> Model (a tree structure)
      // This phases instantiates the models with default config by doing a top-down traversal. This allows us to pass properties that child models derive from their parents via their constructors.
      // See the abstract `Model` class and its children (UnitModel, LayerModel, FacetModel, ConcatModel) for different types of models.

      const model = buildModel(spec, null, '', undefined, config); // 4 Parse: Model --> Model with components
      // Note that components = intermediate representations that are equivalent to Vega specs.
      // We need these intermediate representation because we need to merge many visualization "components" like projections, scales, axes, and legends.
      // We will later convert these components into actual Vega specs in the assemble phase.
      // In this phase, we do a bottom-up traversal over the whole tree to
      // parse for each type of components once (e.g., data, layout, mark, scale).
      // By doing bottom-up traversal, we start parsing components of unit specs and
      // then merge child components of parent composite specs.
      //
      // Please see inside model.parse() for order of different components parsed.

      model.parse(); // drawDataflow(model.component.data.sources);
      // 5. Optimize the dataflow. This will modify the data component of the model.

      optimizeDataflow(model.component.data, model); // drawDataflow(model.component.data.sources);
      // 6. Assemble: convert model components --> Vega Spec.

      const vgSpec = assembleTopLevelModel(model, getTopLevelProperties(inputSpec, spec.autosize, config, model), inputSpec.datasets, inputSpec.usermeta);
      return {
        spec: vgSpec,
        normalized: spec
      };
    } finally {
      // Reset the singleton logger if a logger is provided
      if (opt.logger) {
        reset();
      } // Reset the singleton field title formatter if provided


      if (opt.fieldTitle) {
        resetTitleFormatter();
      }
    }
  }

  function getTopLevelProperties(inputSpec, autosize, config, model) {
    const width = model.component.layoutSize.get('width');
    const height = model.component.layoutSize.get('height');

    if (autosize === undefined) {
      autosize = {
        type: 'pad'
      };

      if (model.hasAxisOrientSignalRef()) {
        autosize.resize = true;
      }
    } else if (vega.isString(autosize)) {
      autosize = {
        type: autosize
      };
    }

    if (width && height && isFitType(autosize.type)) {
      if (width === 'step' && height === 'step') {
        warn(droppingFit());
        autosize.type = 'pad';
      } else if (width === 'step' || height === 'step') {
        // effectively XOR, because else if
        // get step dimension
        const sizeType = width === 'step' ? 'width' : 'height'; // log that we're dropping fit for respective channel

        warn(droppingFit(getPositionScaleChannel(sizeType))); // setting type to inverse fit (so if we dropped fit-x, type is now fit-y)

        const inverseSizeType = sizeType === 'width' ? 'height' : 'width';
        autosize.type = getFitType(inverseSizeType);
      }
    }

    return { ...(keys(autosize).length === 1 && autosize.type ? autosize.type === 'pad' ? {} : {
        autosize: autosize.type
      } : {
        autosize
      }),
      ...extractTopLevelProperties(config, false),
      ...extractTopLevelProperties(inputSpec, true)
    };
  }
  /*
   * Assemble the top-level model to a Vega spec.
   *
   * Note: this couldn't be `model.assemble()` since the top-level model
   * needs some special treatment to generate top-level properties.
   */


  function assembleTopLevelModel(model, topLevelProperties) {
    let datasets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let usermeta = arguments.length > 3 ? arguments[3] : undefined;
    // Config with Vega-Lite only config removed.
    const vgConfig = model.config ? stripAndRedirectConfig(model.config) : undefined;
    const data = [].concat(model.assembleSelectionData([]), // only assemble data in the root
    assembleRootData(model.component.data, datasets));
    const projections = model.assembleProjections();
    const title = model.assembleTitle();
    const style = model.assembleGroupStyle();
    const encodeEntry = model.assembleGroupEncodeEntry(true);
    let layoutSignals = model.assembleLayoutSignals(); // move width and height signals with values to top level

    layoutSignals = layoutSignals.filter(signal => {
      if ((signal.name === 'width' || signal.name === 'height') && signal.value !== undefined) {
        topLevelProperties[signal.name] = +signal.value;
        return false;
      }

      return true;
    });
    const {
      params,
      ...otherTopLevelProps
    } = topLevelProperties;
    return {
      $schema: 'https://vega.github.io/schema/vega/v5.json',
      ...(model.description ? {
        description: model.description
      } : {}),
      ...otherTopLevelProps,
      ...(title ? {
        title
      } : {}),
      ...(style ? {
        style
      } : {}),
      ...(encodeEntry ? {
        encode: {
          update: encodeEntry
        }
      } : {}),
      data,
      ...(projections.length > 0 ? {
        projections
      } : {}),
      ...model.assembleGroup([...layoutSignals, ...model.assembleSelectionTopLevelSignals([]), ...assembleParameterSignals(params)]),
      ...(vgConfig ? {
        config: vgConfig
      } : {}),
      ...(usermeta ? {
        usermeta
      } : {})
    };
  }

  const version = pkg.version;

  exports.accessPathDepth = accessPathDepth;
  exports.accessPathWithDatum = accessPathWithDatum;
  exports.compile = compile;
  exports.contains = contains;
  exports.deepEqual = deepEqual;
  exports.deleteNestedProperty = deleteNestedProperty;
  exports.duplicate = duplicate;
  exports.entries = entries$1;
  exports.every = every;
  exports.fieldIntersection = fieldIntersection;
  exports.flatAccessWithDatum = flatAccessWithDatum;
  exports.getFirstDefined = getFirstDefined;
  exports.hasIntersection = hasIntersection;
  exports.hash = hash;
  exports.internalField = internalField;
  exports.isBoolean = isBoolean;
  exports.isEmpty = isEmpty;
  exports.isEqual = isEqual;
  exports.isInternalField = isInternalField;
  exports.isNullOrFalse = isNullOrFalse;
  exports.isNumeric = isNumeric;
  exports.keys = keys;
  exports.logicalExpr = logicalExpr;
  exports.mergeDeep = mergeDeep;
  exports.never = never;
  exports.normalize = normalize;
  exports.normalizeAngle = normalizeAngle;
  exports.omit = omit;
  exports.pick = pick;
  exports.prefixGenerator = prefixGenerator;
  exports.removePathFromField = removePathFromField;
  exports.replaceAll = replaceAll;
  exports.replacePathInField = replacePathInField;
  exports.resetIdCounter = resetIdCounter;
  exports.setEqual = setEqual;
  exports.some = some;
  exports.stringify = stringify;
  exports.titleCase = titleCase;
  exports.unique = unique;
  exports.uniqueId = uniqueId;
  exports.vals = vals;
  exports.varName = varName;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vega-lite.js.map
